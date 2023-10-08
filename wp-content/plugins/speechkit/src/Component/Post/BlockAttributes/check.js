/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';

export function BlockAttributesCheck( { hasAudioAction, children } ) {
	if ( ! hasAudioAction ) {
		return null;
	}

	return children;
}

export default compose( [
	withSelect( ( select ) => {
		const { getEditedPostAttribute } = select( 'core/editor' );

		// TODO simplify checks for whether audio exists, this is copied across the codebase
		const beyondwordsGenerateAudio =
			getEditedPostAttribute( 'meta' ).beyondwords_generate_audio === '1';
		const beyondwordsContentId =
			getEditedPostAttribute( 'meta' ).beyondwords_content_id;
		const beyondwordsPodcastId =
			getEditedPostAttribute( 'meta' ).beyondwords_podcast_id;
		const speechkitPodcastId =
			getEditedPostAttribute( 'meta' ).speechkit_podcast_id;

		return {
			hasAudioAction:
				!! beyondwordsGenerateAudio ||
				!! beyondwordsContentId ||
				!! beyondwordsPodcastId ||
				!! speechkitPodcastId,
		};
	} ),
] )( BlockAttributesCheck );
