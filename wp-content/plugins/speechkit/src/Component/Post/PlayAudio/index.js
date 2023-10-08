/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { useDispatch, withSelect } from '@wordpress/data';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { store as noticesStore } from '@wordpress/notices';

/**
 * External dependencies
 */
import ScriptTag from 'react-script-tag';

/**
 * Internal dependencies
 */
import PlayAudioCheck from './check';

function PlayAudio( {
	apiKey,
	debug,
	projectId,
	contentId,
	wrapper = Fragment,
} ) {
	const Wrapper = wrapper;

	const [ player, setPlayer] = useState(null);
	const [ contentStatusChangedListener, setContentStatusChangedListener ] = useState( null );
	const [ noContentAvailableListener, setNoContentAvailableListener ] = useState( null );
	const [ playbackErroredListener, setPlaybackErroredListener ] = useState( null );
	const [ mediaLoadedListener, setMediaLoadedListener ] = useState( null );
	const [ playbackPlayingListener, setPlaybackPlayingListener ] = useState( null );

	const noticeId = 'beyondwords-player-notice';

	const {
		createInfoNotice,
		createErrorNotice,
		removeNotice,
	} = useDispatch( noticesStore );

	useEffect(() => {
		return () => {
			if ( ! player ) {
				return;
			}
			if ( contentStatusChangedListener ) {
				player.removeEventListener('ContentStatusChanged', contentStatusChangedListener);
			}
			if ( noContentAvailableListener ) {
				player.removeEventListener('NoContentAvailable', noContentAvailableListener);
			}
			if ( playbackErroredListener ) {
				player.removeEventListener('PlaybackErrored', playbackErroredListener);
			}
			if ( mediaLoadedListener ) {
				player.removeEventListener('MediaLoaded', mediaLoadedListener);
			}
			if ( playbackPlayingListener ) {
				player.removeEventListener('PlaybackPlaying', playbackPlayingListener);
			}
		}
	}, [] );

	function initPlayer() {
		if ( ! window.BeyondWords ) {
			return;
		}

		new window.BeyondWords.Player( {
			adverts: [],
			contentId,
			introsOutros: [],
			playerStyle: 'small',
			projectId,
			target: document.querySelector(
				'div[data-beyondwords-admin-player]'
			),
			widgetStyle: 'none',
			writeToken: apiKey,
		} );

		const playerInstance = window.BeyondWords.Player.instances()[0];

		// playerInstance.addEventListener('<any>', console.log );

		setContentStatusChangedListener(playerInstance.addEventListener('ContentStatusChanged', ( payload ) => {
			// console.log('ContentStatusChanged', 'payload', payload);

			const { contentStatus } = payload;

			if ( contentStatus === 'processed' ) {
				removeNotice( noticeId );
				initPlayer(); // Not ideal but it works for now
			} else if ( contentStatus ) {
				createInfoNotice( __( `🔊 Status: ${contentStatus}`, 'speechkit' ), {
					id: noticeId,
					isDismissible: true,
				} );
			}
		} ) );

		// TODO we are unable to use this event to detect invalid/deleted content because it also fires for valid content
		// https://linear.app/beyondwords/issue/S-3473/player-event-to-handle-invaliddeleted-content-ids
		// setNoContentAvailableListener(playerInstance.addEventListener('NoContentAvailable', () => {
		// 	console.log('NoContentAvailable');
		// 	createErrorNotice( __( '🔊 Unable to locate the audio with the currernt Project ID Content ID.', 'speechkit' ), {
		// 		id: noticeId,
		// 		isDismissible: false,
		// 	} );
		// } ) );

		setPlaybackErroredListener(playerInstance.addEventListener('PlaybackErrored', () => {
			// console.log('PlaybackErrored');
			createErrorNotice( __( '🔊 There was an error playing the audio. Please try again.', 'speechkit' ), {
				id: noticeId,
				isDismissible: true,
			} );
		} ) );

		setMediaLoadedListener(playerInstance.addEventListener('MediaLoaded', () => {
			// console.log('MediaLoaded');
			removeNotice( noticeId );
		} ) );

		setPlaybackPlayingListener(playerInstance.addEventListener('PlaybackPlaying', () => {
			// console.log('PlaybackPlaying');
			removeNotice( noticeId );
		} ) );

		setPlayer( playerInstance );

		if ( debug ) {
			// eslint-disable-next-line no-console
			console.log( `🔊 player`, player );
		}
	}

	const umdSrc =
		'https://proxy.beyondwords.io/npm/@beyondwords/player@latest/dist/umd.js';

	return (
		<PlayAudioCheck>
			<Wrapper>
				<div>
					<div className="beyondwords-player-box-wrapper">
						<div data-beyondwords-admin-player={ true } />
						<ScriptTag
							isHydrating={ false }
							async
							defer
							src={ umdSrc }
							onLoad={ initPlayer }
						/>
					</div>
				</div>
			</Wrapper>
		</PlayAudioCheck>
	);
}

export default compose( [
	withSelect( ( select ) => {
		const { getEditedPostAttribute } = select( 'core/editor' );
		const { getSettings } = select( 'beyondwords/settings' );

		const { apiKey, debug } = getSettings();

		const beyondwordsProjectId =
			getEditedPostAttribute( 'meta' ).beyondwords_project_id;
		const speechkitProjectId =
			getEditedPostAttribute( 'meta' ).speechkit_project_id;

		const beyondwordsContentId =
			getEditedPostAttribute( 'meta' ).beyondwords_content_id;
		const beyondwordsPodcastId =
			getEditedPostAttribute( 'meta' ).beyondwords_podcast_id;
		const speechkitPodcastId =
			getEditedPostAttribute( 'meta' ).speechkit_podcast_id;

		return {
			apiKey,
			debug,
			projectId: beyondwordsProjectId || speechkitProjectId,
			contentId:
				beyondwordsContentId ||
				beyondwordsPodcastId ||
				speechkitPodcastId,
		};
	} ),
] )( PlayAudio );
