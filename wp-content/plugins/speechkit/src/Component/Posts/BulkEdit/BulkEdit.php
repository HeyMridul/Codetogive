<?php

declare(strict_types=1);

/**
 * BeyondWords Bulk Edit.
 *
 * Text Domain: beyondwords
 *
 * @package Beyondwords\Wordpress
 * @author  Stuart McAlpine <stu@beyondwords.io>
 * @since   3.0.0
 */

namespace Beyondwords\Wordpress\Component\Posts\BulkEdit;

use Beyondwords\Wordpress\Core\Core;
use Beyondwords\Wordpress\Core\CoreUtils;
use Beyondwords\Wordpress\Component\Settings\SettingsUtils;
use Beyondwords\Wordpress\Plugin;

/**
 * BulkEdit setup
 *
 * @since 3.0.0
 */
class BulkEdit
{
    /**
     * Constructor
     */
    public function __construct()
    {
        add_action('bulk_edit_custom_box', array($this, 'bulkEditCustomBox'), 10, 2);
        add_action('wp_ajax_save_bulk_edit_beyondwords', array($this, 'saveBulkEdit'));

        add_action('admin_notices', array($this, 'deletedNotice'));
        add_action('admin_notices', array($this, 'generatedNotice'));
        add_action('admin_notices', array($this, 'failedNotice'));
        add_action('admin_notices', array($this, 'errorNotice'));

        add_action('wp_loaded', function () {
            $postTypes = SettingsUtils::getSupportedPostTypes();

            if (is_array($postTypes)) {
                foreach ($postTypes as $postType) {
                    add_filter("bulk_actions-edit-{$postType}", array($this, 'bulkActionsEdit'), 10, 1);
                    add_filter("handle_bulk_actions-edit-{$postType}", array($this, 'handleBulkDeleteAction'), 10, 3);
                    add_filter("handle_bulk_actions-edit-{$postType}", array($this, 'handleBulkGenerateAction'), 10, 3);
                }
            }
        });
    }

    /**
     * Adds the meta box container.
     */
    public function bulkEditCustomBox($columnName, $postType)
    {
        if ($columnName !== 'beyondwords') {
            return;
        }

        $postTypes = SettingsUtils::getSupportedPostTypes();

        if (! in_array($postType, $postTypes)) {
            return;
        }

        wp_nonce_field('beyondwords_bulk_edit_nonce', 'beyondwords_bulk_edit');

        ?>
        <fieldset class="inline-edit-col-right">
            <div class="inline-edit-col">
                <div class="inline-edit-group wp-clearfix">
                    <label class="alignleft">
                        <span class="title"><?php _e('BeyondWords', 'speechkit'); ?></span>
                        <select name="beyondwords_generate_audio">
                            <option value="-1"><?php _e('— No change —', 'speechkit'); ?></option>
                            <option value="generate"><?php _e('Generate audio', 'speechkit'); ?></option>
                            <option value="delete"><?php _e('Delete audio', 'speechkit'); ?></option>
                        </select>
                    </label>
                </div>
            </div>
        </fieldset>
        <?php
    }

    /**
     * Save Bulk Edit updates.
     *
     * @link https://rudrastyh.com/wordpress/bulk-edit.html
     */
    public function saveBulkEdit()
    {
        /*
         * We need to verify this came from the our screen and with proper authorization,
         * because save_post can be triggered at other times.
         */
        if (
            ! isset($_POST['beyondwords_bulk_edit_nonce']) ||
            ! wp_verify_nonce(sanitize_text_field($_POST['beyondwords_bulk_edit_nonce']), 'beyondwords_bulk_edit')
        ) {
            wp_nonce_ays('');
        }

        $action  = filter_input(INPUT_POST, 'beyondwords_bulk_edit', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        $postIds = filter_input(INPUT_POST, 'post_ids', FILTER_VALIDATE_INT, FILTER_REQUIRE_ARRAY);

        switch ($action) {
            case 'generate':
                return $this->generateAudioForPosts($postIds);
                break;
            case 'delete':
                return $this->deleteAudioForPosts($postIds);
                break;
        }

        return [];
    }

    public function generateAudioForPosts($postIds)
    {
        if (! is_array($postIds)) {
            return false;
        }

        $updatedPostIds = [];

        foreach ($postIds as $postId) {
            if (! get_post_meta($postId, 'beyondwords_content_id', true)) {
                update_post_meta($postId, 'beyondwords_generate_audio', '1');
            }
            $updatedPostIds[] = $postId;
        }

        return $updatedPostIds;
    }

    /**
     * @SuppressWarnings(PHPMD.LongVariable)
     */
    public function deleteAudioForPosts($postIds)
    {
        global $beyondwords_wordpress_plugin;

        if (! is_array($postIds)) {
            return false;
        }

        $updatedPostIds = [];

        $response = $beyondwords_wordpress_plugin->core->batchDeleteAudioForPosts($postIds);

        if (! $response) {
            throw new \Exception('Error while bulk deleting audio. Please contact support with reference BULK-NO-RESPONSE.'); // phpcs:ignore
        }

        // Now process all posts
        $keys = CoreUtils::getPostMetaKeys('all');

        foreach ($response as $postId) {
            foreach ($keys as $key) {
                delete_post_meta($postId, $key);
            }
            $updatedPostIds[] = $postId;
        }

        return $updatedPostIds;
    }

    /**
     *
     */
    public function bulkActionsEdit($bulk_array)
    {
        $bulk_array['beyondwords_generate_audio'] = __('Generate audio', 'speechkit');
        $bulk_array['beyondwords_delete_audio']   = __('Delete audio', 'speechkit');

        return $bulk_array;
    }

    /**
     * @SuppressWarnings(PHPMD.LongVariable)
     */
    public function handleBulkGenerateAction($redirect, $doaction, $objectIds)
    {
        if ($doaction !== 'beyondwords_generate_audio') {
            return $redirect;
        }

        global $beyondwords_wordpress_plugin;

        // Remove query args
        $args = [
            'beyondwords_bulk_generated',
            'beyondwords_bulk_deleted',
            'beyondwords_bulk_failed',
            'beyondwords_bulk_error',
        ];

        $redirect = remove_query_arg($args, $redirect);

        // Order batch by Post ID asc
        sort($objectIds);

        $generated = 0;
        $failed    = 0;

        try {
            // Update all custom fields before attempting any processing
            foreach ($objectIds as $postId) {
                update_post_meta($postId, 'beyondwords_generate_audio', '1');
            }

            // Now process all posts
            foreach ($objectIds as $postId) {
                if (
                    $beyondwords_wordpress_plugin instanceof Plugin
                    && $beyondwords_wordpress_plugin->core instanceof Core
                ) {
                    $response = $beyondwords_wordpress_plugin->core->generateAudioForPost($postId);

                    if ($response) {
                        $generated++;
                    } else {
                        $failed++;
                    }
                } else {
                    throw new \Exception('Error while bulk generating audio. Please contact support with reference BULK-NO-PLUGIN.'); // phpcs:ignore
                }
            }
        } catch (\Exception $e) {
            $redirect = add_query_arg('beyondwords_bulk_error', $e->getMessage(), $redirect);
        }

        // Add $generated & $failed query args into redirect
        $redirect = add_query_arg('beyondwords_bulk_generated', $generated, $redirect);
        $redirect = add_query_arg('beyondwords_bulk_failed', $failed, $redirect);

        // Add $nonce query arg into redirect
        $nonce = wp_create_nonce('beyondwords_bulk_edit');
        $redirect = add_query_arg('beyondwords_bulk_edit_nonce', $nonce, $redirect);

        return $redirect;
    }

    /**
     *
     */
    public function handleBulkDeleteAction($redirect, $doaction, $objectIds)
    {
        if ($doaction !== 'beyondwords_delete_audio') {
            return $redirect;
        }

        // Remove query args
        $args = [
            'beyondwords_bulk_generated',
            'beyondwords_bulk_deleted',
            'beyondwords_bulk_failed',
            'beyondwords_bulk_error',
        ];

        $redirect = remove_query_arg($args, $redirect);

        // Order batch by Post ID asc
        sort($objectIds);

        $deleted = 0;

        // Handle "Delete audio" bulk action
        try {
            $result = $this->deleteAudioForPosts($objectIds);

            $deleted = count($result);

            // Add $deleted query arg into redirect
            $redirect = add_query_arg('beyondwords_bulk_deleted', $deleted, $redirect);
        } catch (\Exception $e) {
            $redirect = add_query_arg('beyondwords_bulk_error', $e->getMessage(), $redirect);
        }

        // Add $nonce query arg into redirect
        $nonce = wp_create_nonce('beyondwords_bulk_edit');
        $redirect = add_query_arg('beyondwords_bulk_edit_nonce', $nonce, $redirect);

        return $redirect;
    }

    /**
     * @since 4.1.0
     */
    public function generatedNotice()
    {
        if (! isset($_REQUEST['beyondwords_bulk_edit_nonce'])) {
            return;
        }

        if (! wp_verify_nonce(sanitize_text_field($_REQUEST['beyondwords_bulk_edit_nonce']), 'beyondwords_bulk_edit')) {
            wp_nonce_ays('');
        }

        $count = filter_input(INPUT_GET, 'beyondwords_bulk_generated', FILTER_SANITIZE_NUMBER_INT);

        if ($count) {
            $message = sprintf(
                /* translators: %d is replaced with the number of posts processed */
                _n(
                    'Audio was requested for %d post.',
                    'Audio was requested for %d posts.',
                    $count,
                    'speechkit'
                ),
                $count
            );
            ?>
            <div class="notice notice-info is-dismissible">
                <p>
                    <?php echo esc_html($message); ?>
                </p>
            </div>
            <?php
        }
    }

    /**
     *
     */
    public function deletedNotice()
    {
        if (! isset($_REQUEST['beyondwords_bulk_edit_nonce'])) {
            return;
        }

        if (! wp_verify_nonce(sanitize_text_field($_REQUEST['beyondwords_bulk_edit_nonce']), 'beyondwords_bulk_edit')) {
            wp_nonce_ays('');
        }

        $count = filter_input(INPUT_GET, 'beyondwords_bulk_deleted', FILTER_SANITIZE_NUMBER_INT);

        if ($count) {
            $message = sprintf(
                /* translators: %d is replaced with the number of posts processed */
                _n(
                    'Audio was deleted for %d post.',
                    'Audio was deleted for %d posts.',
                    $count,
                    'speechkit'
                ),
                $count
            );
            ?>
            <div class="notice notice-info is-dismissible">
                <p>
                    <?php echo esc_html($message); ?>
                </p>
            </div>
            <?php
        }
    }

    /**
     *
     */
    public function failedNotice()
    {
        if (! isset($_REQUEST['beyondwords_bulk_edit_nonce'])) {
            return;
        }

        if (! wp_verify_nonce(sanitize_text_field($_REQUEST['beyondwords_bulk_edit_nonce']), 'beyondwords_bulk_edit')) {
            wp_nonce_ays('');
        }

        $count = filter_input(INPUT_GET, 'beyondwords_bulk_failed', FILTER_SANITIZE_NUMBER_INT);

        if ($count) {
            $message = sprintf(
                /* translators: %d is replaced with the number of posts that were skipped */
                _n(
                    '%d post failed, check for errors in the BeyondWords column below.',
                    '%d posts failed, check for errors in the BeyondWords column below.',
                    $count,
                    'speechkit'
                ),
                $count
            );
            ?>
            <div class="notice notice-error">
                <p>
                    <?php echo esc_html($message); ?>
                </p>
            </div>
            <?php
        }
    }

    /**
     *
     */
    public function errorNotice()
    {
        if (! isset($_REQUEST['beyondwords_bulk_edit_nonce'])) {
            return;
        }

        if (! wp_verify_nonce(sanitize_text_field($_REQUEST['beyondwords_bulk_edit_nonce']), 'beyondwords_bulk_edit')) {
            wp_nonce_ays('');
        }

        $message = filter_input(INPUT_GET, 'beyondwords_bulk_error', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

        if ($message) {
            ?>
            <div class="notice notice-error">
                <p>
                    <?php echo esc_html($message); ?>
                </p>
            </div>
            <?php
        }
    }
}
