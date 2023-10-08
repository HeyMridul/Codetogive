<?php

declare(strict_types=1);

/**
 * BeyondWords support for Gutenberg blocks.
 *
 * @package Beyondwords\Wordpress
 * @author  Stuart McAlpine <stu@beyondwords.io>
 * @since   3.7.0
 * @since   4.0.0 Renamed from BlockAudioAttribute.php to BlockAttributes.php to support multiple attributes
 */

namespace Beyondwords\Wordpress\Component\Post\BlockAttributes;

use Beyondwords\Wordpress\Component\Post\PostMetaUtils;
use Beyondwords\Wordpress\Component\Settings\PlayerUI\PlayerUI;
use Beyondwords\Wordpress\Core\CoreUtils;

/**
 * BlockAttributes setup
 *
 * @since 3.7.0
 * @since 4.0.0 Renamed from BlockAudioAttribute to BlockAttributes to support multiple attributes
 */
class BlockAttributes
{
    /**
     * Constructor
     */
    public function __construct()
    {
        add_filter('register_block_type_args', array($this, 'registerAudioAttribute'));
        add_filter('register_block_type_args', array($this, 'registerMarkerAttribute'));
        add_filter('render_block', array($this, 'addMarkerAttributeToBlocks'), 10, 2);
    }

    /**
     * Register "Audio" attribute for Gutenberg blocks.
     */
    public function registerAudioAttribute($args)
    {
        // Setup attributes if needed.
        if (! isset($args['attributes'])) {
            $args['attributes'] = array();
        }

        if (! array_key_exists('beyondwordsAudio', $args['attributes'])) {
            $args['attributes']['beyondwordsAudio'] = array(
                'type' => 'boolean',
                'default' => true,
            );
        }

        return $args;
    }

    /**
     * Register "Segment marker" attribute for Gutenberg blocks.
     */
    public function registerMarkerAttribute($args)
    {
        // Setup attributes if needed.
        if (! isset($args['attributes'])) {
            $args['attributes'] = array();
        }

        if (! array_key_exists('beyondwordsMarker', $args['attributes'])) {
            $args['attributes']['beyondwordsMarker'] = array(
                'type' => 'string',
                'default' => '',
            );
        }

        return $args;
    }

    /**
     * Add data-beyondwords-marker attribute to root element of Gutenberg blocks.
     *
     * @since 4.0.0
     *
     * @param string  $blockContent Block Content (HTML).
     * @param string  $block        Block object.
     *
     * @return string Block Content (HTML).
     */
    public function addMarkerAttributeToBlocks($blockContent, $block)
    {
        // Is Player UI enabled?
        if (get_option('beyondwords_player_ui', PlayerUI::ENABLED) === PlayerUI::DISABLED) {
            return $blockContent;
        }

        // Does parent post have audio?
        if (! PostMetaUtils::getContentId(get_the_ID())) {
            return $blockContent;
        }

        // Does this block have a beyondwordsMarker attribute?
        if (empty($block['attrs']) || empty($block['attrs']['beyondwordsMarker'])) {
            return $blockContent;
        }

        // Prefer WP_HTML_Tag_Processor, introduced in WordPress 6.2
        if (class_exists('WP_HTML_Tag_Processor')) {
            $blockContent = $this->addMarkerAttributeWithHTMLTagProcessor(
                $blockContent,
                $block['attrs']['beyondwordsMarker']
            );
        } else {
            $blockContent = $this->addMarkerAttributeWithDOMDocument(
                $blockContent,
                $block['attrs']['beyondwordsMarker']
            );
        }

        return $blockContent;
    }

    /**
     * Add data-beyondwords-marker attribute to the root elements in a HTML
     * string using WP_HTML_Tag_Processor.
     *
     * @since 4.0.0
     *
     * @param string  $html   HTML.
     * @param string  $marker Marker UUID.
     *
     * @return string HTML.
     */
    public function addMarkerAttributeWithHTMLTagProcessor($html, $marker)
    {
        // https://github.com/WordPress/gutenberg/pull/42485
        $tags = new \WP_HTML_Tag_Processor($html);

        if ($tags->next_tag()) {
            $tags->set_attribute('data-beyondwords-marker', $marker);
        }

        return strval($tags);
    }

    /**
     * Add data-beyondwords-marker attribute to the root elements in a HTML
     * string using DOMDocument.
     *
     * This is a fallback, since WP_HTML_Tag_Processor was only shipped with
     * WordPress 6.2 on 19 April 2023.
     *
     * https://make.wordpress.org/core/2022/10/13/whats-new-in-gutenberg-14-3-12-october/
     *
     * Note: It is not ideal to do all the $bodyElement/$fullHtml processing
     * in this method, but without it DOMDocument does not work as expected if
     * there is more than 1 root element. The approach here has been taken from
     * some historic Gutenberg code before they implemented WP_HTML_Tag_Processor:
     *
     * https://github.com/WordPress/gutenberg/blob/6671cef1179412a2bbd4969cbbc82705c7f69bac/lib/block-supports/index.php
     *
     * @since 4.0.0
     *
     * @param string  $html   HTML.
     * @param string  $marker Marker UUID.
     *
     * @return string HTML.
     */
    public function addMarkerAttributeWithDOMDocument($html, $marker)
    {
        $dom = new \DOMDocument('1.0', 'utf-8');

        $wrappedHtml =
            '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head><body>'
            . $html
            . '</body></html>';

        $success = $dom->loadHTML($wrappedHtml, LIBXML_HTML_NODEFDTD | LIBXML_COMPACT);

        if (! $success) {
            return $html;
        }

        // Structure is like `<html><head/><body/></html>`, so body is the `lastChild` of our document.
        $bodyElement = $dom->documentElement->lastChild;

        $xpath     = new \DOMXPath($dom);
        $blockRoot = $xpath->query('./*', $bodyElement)[0];

        if (empty($blockRoot)) {
            return $html;
        }

        $blockRoot->setAttribute('data-beyondwords-marker', $marker);

        // Avoid using `$dom->saveHtml( $node )` because the node results may not produce consistent
        // whitespace. Saving the root HTML `$dom->saveHtml()` prevents this behavior.
        $fullHtml = $dom->saveHtml();

        // Find the <body> open/close tags. The open tag needs to be adjusted so we get inside the tag
        // and not the tag itself.
        $start = strpos($fullHtml, '<body>', 0) + strlen('<body>');
        $end   = strpos($fullHtml, '</body>', $start);

        return trim(substr($fullHtml, $start, $end - $start));
    }
}
