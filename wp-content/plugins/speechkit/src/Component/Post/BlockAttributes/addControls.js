/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	TextControl,
	ToggleControl,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

/**
 * External dependencies
 */
import getBlockMarkerAttribute from './helpers/getBlockMarkerAttribute';

/**
 * Internal dependencies
 */
import BlockAttributesCheck from './check';

/**
 * Add BeyondWords controls to Gutenberg Blocks.
 *
 * @param {Function} BlockEdit Block edit component.
 *
 * @return {Function} BlockEdit Modified block edit component.
 */
const withBeyondwordsBlockControls = createHigherOrderComponent(
	( BlockEdit ) => {
		return ( props ) => {
			const { attributes, setAttributes, isSelected } = props;

			const { beyondwordsAudio, beyondwordsMarker } = attributes;

			const icon = !! beyondwordsAudio
				? 'controls-volumeon'
				: 'controls-volumeoff';
			const buttonLabel = !! beyondwordsAudio
				? __( 'Disable audio processing', 'speechkit' )
				: __( 'Enable audio processing', 'speechkit' );
			const toggleLabel = !! beyondwordsAudio
				? __( 'Audio processing enabled', 'speechkit' )
				: __( 'Audio processing disabled', 'speechkit' );

			const toggleBeyondwordsAudio = () =>
				setAttributes( { beyondwordsAudio: ! beyondwordsAudio } );

			const assignMarkerOnLoad = () => {
				const marker = getBlockMarkerAttribute( attributes );

				setAttributes( { beyondwordsMarker: marker } );
			};

			return (
				<>
					{ /* Onload hack fires when block is rendered */ }
					{ /* https://wordpress.stackexchange.com/a/333125 */ }
					<img
						alt=""
						className="beyondwords-block-onload-hack"
						height="0"
						width="0"
						style={ { display: "none" } }
						onLoad={ assignMarkerOnLoad }
						src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1' %3E%3Cpath d=''/%3E%3C/svg%3E"
					/>

					<BlockEdit { ...props } />

					{ isSelected && (
						<BlockAttributesCheck>
							<InspectorControls>
								<PanelBody
									icon="controls-volumeon"
									title={ __( 'BeyondWords', 'speechkit' ) }
									initialOpen={ true }
								>
									<PanelRow>
										<ToggleControl
											label={ toggleLabel }
											checked={ !! beyondwordsAudio }
											onChange={ toggleBeyondwordsAudio }
										/>
									</PanelRow>
									{ !! beyondwordsAudio && (
										<PanelRow>
											<TextControl
												label={ __(
													'Segment marker',
													'speechkit'
												) }
												value={ beyondwordsMarker }
												disabled
												readOnly
											/>
										</PanelRow>
									) }
								</PanelBody>
							</InspectorControls>

							<BlockControls>
								<ToolbarGroup>
									<ToolbarButton
										icon={ icon }
										label={ buttonLabel }
										className="components-toolbar__control"
										onClick={ toggleBeyondwordsAudio }
									/>
								</ToolbarGroup>
							</BlockControls>
						</BlockAttributesCheck>
					) }
				</>
			);
		};
	},
	'withBeyondwordsBlockControls'
);

addFilter(
	'editor.BlockEdit',
	'beyondwords/block-controls',
	withBeyondwordsBlockControls
);
