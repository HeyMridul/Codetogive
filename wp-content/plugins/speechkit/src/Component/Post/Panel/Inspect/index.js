/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Button,
	PanelBody,
	TextareaControl,
	TextControl,
} from '@wordpress/components';
import { compose, useCopyToClipboard } from '@wordpress/compose';
import { useEntityProp } from '@wordpress/core-data';
import { useDispatch, withDispatch, withSelect } from '@wordpress/data';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { store as noticesStore } from '@wordpress/notices';

export function PostInspectPanel( {
	beyondwordsDisabled,
	beyondwordsGenerateAudio,
	beyondwordsContentId,
	beyondwordsPlayerStyle,
	beyondwordsLanguageId,
	beyondwordsBodyVoiceId,
	beyondwordsTitleVoiceId,
	beyondwordsSummaryVoiceId,
	beyondwordsProjectId,
	beyondwordsErrorMessage,
	// Deprecated
	beyondwordsPodcastId,
	publishPostToSpeechkit,
	speechkitAccessKey,
	speechkitGenerateAudio,
	speechkitPodcastId,
	speechkitProjectId,
	speechkitDisabled,
	speechkitError,
	speechkitErrorMessage,
	speechkitInfo,
	speechkitResponse,
	speechkitLink,
	speechkitText,
	speechkitRetries,
	speechkitStatus,
	wordpressPostId,
	currentPostType,
	createWarningNotice,
	removeWarningNotice,
	createErrorNotice,
	removeErrorNotice,
	didPostSaveRequestSucceed,
	isSavingPost,
	isAutosavingPost,
} ) {
	useEffect( () => {
		if ( isSavingPost && ! isAutosavingPost && didPostSaveRequestSucceed ) {
			setRemoved( false );
			removeWarningNotice();
			removeErrorNotice();
		}
	}, [ isSavingPost, isAutosavingPost, didPostSaveRequestSucceed ] );

	const memoizedMeta = useMemo(
		() => ( {
			beyondwords_generate_audio: beyondwordsGenerateAudio,
			beyondwords_project_id: beyondwordsProjectId,
			beyondwords_content_id: beyondwordsContentId,
			beyondwords_player_style: beyondwordsPlayerStyle,
			beyondwords_language_id: beyondwordsLanguageId,
			beyondwords_body_voice_id: beyondwordsBodyVoiceId,
			beyondwords_title_voice_id: beyondwordsTitleVoiceId,
			beyondwords_summary_voice_id: beyondwordsSummaryVoiceId,
			beyondwords_error_message: beyondwordsErrorMessage,
			beyondwords_disabled: beyondwordsDisabled,
			// Deprecated
			beyondwords_podcast_id: beyondwordsPodcastId,
			publish_post_to_speechkit: publishPostToSpeechkit,
			speechkit_generate_audio: speechkitGenerateAudio,
			speechkit_project_id: speechkitProjectId,
			speechkit_podcast_id: speechkitPodcastId,
			speechkit_error_message: speechkitErrorMessage,
			speechkit_disabled: speechkitDisabled,
			speechkit_access_key: speechkitAccessKey,
			speechkit_error: speechkitError,
			speechkit_info: speechkitInfo,
			speechkit_response: speechkitResponse,
			speechkit_retries: speechkitRetries,
			speechkit_status: speechkitStatus,
			_speechkit_link: speechkitLink,
			_speechkit_text: speechkitText,
		} ),
		[]
	);

	const hasBeyondwordsData = Object.values( memoizedMeta ).some(
		( x ) => x !== null && x.length !== ''
	);

	const [ meta, setMeta ] = useEntityProp(
		'postType',
		currentPostType,
		'meta'
	);

	const [ removed, setRemoved ] = useState( false );

	function ClipboardToolbarButton( { text, disabled } ) {
		const { createNotice } = useDispatch( noticesStore );
		const ref = useCopyToClipboard( text, () => {
			createNotice( 'info', __( 'Copied data to clipboard.' ), {
				isDismissible: true,
				type: 'snackbar',
			} );
		} );

		return (
			<Button
				isSecondary
				id="beyondwords-inspect-copy"
				ref={ ref }
				disabled={ disabled }
				>
				{ __( 'Copy', 'speechkit' ) }
			</Button>
		);
	}

	const handleRemoveButtonClick = ( e ) => {
		e.stopPropagation();

		if ( removed ) {
			restorePluginMeta()
				.then( () => {
					setRemoved( false );
					removeWarningNotice();
					removeErrorNotice();
				} )
				.catch( () => {
					createErrorNotice();
				} );
		} else {
			removePluginMeta()
				.then( () => {
					setRemoved( true );
					createWarningNotice();
					removeErrorNotice();
				} )
				.catch( () => createErrorNotice() );
		}
	};

	const restorePluginMeta = async () => {
		return setMeta( memoizedMeta );
	};

	const removePluginMeta = async () => {
		// tinyurl.com/2p9xev6n
		const emptiedMeta = {
			...meta,
			...Object.fromEntries(
				Object.entries( memoizedMeta ).map( ( [ k ] ) => [ k, '' ] )
			),
		};

		return setMeta( emptiedMeta );
	};

	const textToCopy =
		[
			'```',
			`beyondwords_generate_audio\r\n${ beyondwordsGenerateAudio }`,
			`beyondwords_project_id\r\n${ beyondwordsProjectId }`,
			`beyondwords_content_id\r\n${ beyondwordsContentId }`,
			`beyondwords_player_style\r\n${ beyondwordsPlayerStyle }`,
			`beyondwords_language_id\r\n${ beyondwordsLanguageId }`,
			`beyondwords_body_voice_id\r\n${ beyondwordsBodyVoiceId }`,
			`beyondwords_title_voice_id\r\n${ beyondwordsTitleVoiceId }`,
			`beyondwords_summary_voice_id\r\n${ beyondwordsSummaryVoiceId }`,
			`beyondwords_error_message\r\n${ beyondwordsErrorMessage }`,
			`beyondwords_disabled\r\n${ beyondwordsDisabled }`,
			`=== ${ __( 'Deprecated', 'speechkit' ) } ===`,
			`beyondwords_podcast_id\r\n${ beyondwordsPodcastId }`,
			`publish_post_to_speechkit\r\n${ publishPostToSpeechkit }`,
			`speechkit_generate_audio\r\n${ speechkitGenerateAudio }`,
			`speechkit_project_id\r\n${ speechkitProjectId }`,
			`speechkit_podcast_id\r\n${ speechkitPodcastId }`,
			`speechkit_error_message\r\n${ speechkitErrorMessage }`,
			`speechkit_disabled\r\n${ speechkitDisabled }`,
			`speechkit_access_key\r\n${ speechkitAccessKey }`,
			`speechkit_error\r\n${ speechkitError }`,
			`speechkit_info\r\n${ speechkitInfo }`,
			`speechkit_response\r\n${ speechkitResponse }`,
			`speechkit_retries\r\n${ speechkitRetries }`,
			`speechkit_status\r\n${ speechkitStatus }`,
			`_speechkit_link\r\n${ speechkitLink }`,
			`_speechkit_text\r\n${ speechkitText }`,
			`=== ${ __( 'System', 'speechkit' ) } ===`,
			`wordpress_post_id\r\n${ wordpressPostId }`,
			`=== ${ __( 'Copied using the Block Editor', 'speechkit' ) } ===`,
			'```',
		].join( '\r\n\r\n' ) + '\r\n\r\n';

	return (
		<PanelBody
			title={ __( 'Inspect', 'speechkit' ) }
			initialOpen={ false }
			className={ 'beyondwords beyondwords-sidebar__inspect' }
		>
			<TextControl
				label="beyondwords_generate_audio"
				readOnly
				value={ beyondwordsGenerateAudio }
			/>

			<TextControl
				label="beyondwords_project_id"
				readOnly
				value={ beyondwordsProjectId }
			/>

			<TextControl
				label="beyondwords_content_id"
				readOnly
				value={ beyondwordsContentId }
			/>

			<TextControl
				label="beyondwords_player_style"
				readOnly
				value={ beyondwordsPlayerStyle }
			/>

			<TextControl
				label="beyondwords_language_id"
				readOnly
				value={ beyondwordsLanguageId }
			/>

			<TextControl
				label="beyondwords_body_voice_id"
				readOnly
				value={ beyondwordsBodyVoiceId }
			/>

			<TextControl
				label="beyondwords_title_voice_id"
				readOnly
				value={ beyondwordsTitleVoiceId }
			/>

			<TextControl
				label="beyondwords_summary_voice_id"
				readOnly
				value={ beyondwordsSummaryVoiceId }
			/>

			{ /* eslint-disable-next-line prettier/prettier */ }
			<TextareaControl
				label="beyondwords_error_message"
				readOnly
				rows="3"
				value={ beyondwordsErrorMessage }
			/>

			<TextControl
				label="beyondwords_disabled"
				readOnly
				value={ beyondwordsDisabled }
			/>

			<hr />

			<ClipboardToolbarButton
				text={ textToCopy }
				disabled={ removed }
			/>

			<Button
				isDestructive
				style={ { float: 'right' } }
				id="beyondwords-inspect-remove"
				onClick={ handleRemoveButtonClick }
				disabled={ ! hasBeyondwordsData }
			>
				{ removed
					? __( 'Restore', 'speechkit' )
					: __( 'Remove', 'speechkit' ) }
			</Button>
		</PanelBody>
	);
}

export default compose( [
	withSelect( ( select ) => {
		const {
			didPostSaveRequestSucceed,
			getCurrentPostId,
			getCurrentPostType,
			getEditedPostAttribute,
			isSavingPost,
			isAutosavingPost,
		} = select( 'core/editor' );

		return {
			beyondwordsDisabled:
				getEditedPostAttribute( 'meta' ).beyondwords_disabled,
			beyondwordsGenerateAudio:
				getEditedPostAttribute( 'meta' ).beyondwords_generate_audio,
			beyondwordsContentId:
				getEditedPostAttribute( 'meta' ).beyondwords_content_id,
			beyondwordsPlayerStyle:
				getEditedPostAttribute( 'meta' ).beyondwords_player_style,
			beyondwordsLanguageId:
				getEditedPostAttribute( 'meta' ).beyondwords_language_id,
			beyondwordsBodyVoiceId:
				getEditedPostAttribute( 'meta' ).beyondwords_body_voice_id,
			beyondwordsTitleVoiceId:
				getEditedPostAttribute( 'meta' ).beyondwords_title_voice_id,
			beyondwordsSummaryVoiceId:
				getEditedPostAttribute( 'meta' ).beyondwords_summary_voice_id,
			beyondwordsProjectId:
				getEditedPostAttribute( 'meta' ).beyondwords_project_id,
			beyondwordsErrorMessage:
				getEditedPostAttribute( 'meta' ).beyondwords_error_message,
			// Deprecated
			beyondwordsPodcastId:
				getEditedPostAttribute( 'meta' ).beyondwords_podcast_id,
			publishPostToSpeechkit:
				getEditedPostAttribute( 'meta' ).publish_post_to_speechkit,
			speechkitAccessKey:
				getEditedPostAttribute( 'meta' ).speechkit_access_key,
			speechkitGenerateAudio:
				getEditedPostAttribute( 'meta' ).speechkit_generate_audio,
			speechkitPodcastId:
				getEditedPostAttribute( 'meta' ).speechkit_podcast_id,
			speechkitProjectId:
				getEditedPostAttribute( 'meta' ).speechkit_project_id,
			speechkitDisabled:
				getEditedPostAttribute( 'meta' ).speechkit_disabled,
			speechkitError: getEditedPostAttribute( 'meta' ).speechkit_error,
			speechkitErrorMessage:
				getEditedPostAttribute( 'meta' ).speechkit_error_message,
			speechkitInfo: getEditedPostAttribute( 'meta' ).speechkit_info,
			speechkitResponse:
				getEditedPostAttribute( 'meta' ).speechkit_response,
			speechkitLink: getEditedPostAttribute( 'meta' )._speechkit_link,
			speechkitText: getEditedPostAttribute( 'meta' )._speechkit_text,
			speechkitRetries:
				getEditedPostAttribute( 'meta' ).speechkit_retries,
			speechkitStatus: getEditedPostAttribute( 'meta' ).speechkit_status,
			wordpressPostId: getCurrentPostId(),
			currentPostType: getCurrentPostType(),
			didPostSaveRequestSucceed: didPostSaveRequestSucceed(),
			isSavingPost: isSavingPost(),
			isAutosavingPost: isAutosavingPost(),
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { createNotice, removeNotice } = dispatch( 'core/notices' );

		return {
			createWarningNotice: () =>
				createNotice(
					'warning',
					__(
						// eslint-disable-next-line max-len
						'The BeyondWords data for this post will be removed when the post is saved.',
						'speechkit'
					),
					{
						id: 'beyondwords-remove-post-data--warning',
						isDismissible: false,
						speak: true,
					}
				),
			removeWarningNotice: () =>
				removeNotice( 'beyondwords-remove-post-data--warning' ),
			createErrorNotice: () =>
				createNotice(
					'error',
					__(
						'Unable to remove the BeyondWords data. Please email our support team.',
						'speechkit'
					),
					{
						id: 'beyondwords-remove-post-data--error',
						isDismissible: true,
						speak: true,
					}
				),
			removeErrorNotice: () =>
				removeNotice( 'beyondwords-remove-post-data--error' ),
		};
	} ),
] )( PostInspectPanel );
