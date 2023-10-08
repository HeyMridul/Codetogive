<?php

declare(strict_types=1);

namespace Beyondwords\Wordpress\Core;

use Beyondwords\Wordpress\Core\Environment;
use Beyondwords\Wordpress\Core\Request;
use Beyondwords\Wordpress\Component\Post\PostContentUtils;
use Beyondwords\Wordpress\Component\Post\PostMetaUtils;
use Beyondwords\Wordpress\Component\Settings\SettingsUtils;

/**
 * @SuppressWarnings(PHPMD.ExcessiveClassComplexity)
 **/
class ApiClient
{
    public const ERROR_FORMAT = '#%s: %s';

    public $errors;

    /**
     * Constructor
     *
     * @since 3.0.0
     */
    public function __construct()
    {
        add_action('admin_notices', array($this, 'adminNotices'));

        $this->errors = [];
    }

    /**
     * POST /projects/:id/content.
     *
     * @since 3.0.0
     *
     * @param $postId WordPress Post ID
     *
     * @return Response|false Response, or false
     **/
    public function createAudio($postId)
    {
        $projectId = PostMetaUtils::getProjectId($postId);

        $url = sprintf('%s/projects/%d/content', Environment::getApiUrl(), $projectId);

        $body = PostContentUtils::getBodyJson($postId);

        $request = new Request('POST', $url, $body);

        return $this->callApi($postId, $request);
    }

    /**
     * PUT /projects/:id/content/:id.
     *
     * @since 3.0.0
     *
     * @param $postId WordPress Post ID
     *
     * @return Response|false Response, or false
     **/
    public function updateAudio($postId)
    {
        $projectId = PostMetaUtils::getProjectId($postId);
        $contentId = PostMetaUtils::getContentId($postId);

        $url = sprintf('%s/projects/%d/content/%s', Environment::getApiUrl(), $projectId, $contentId);

        $body = PostContentUtils::getBodyJson($postId);

        $request = new Request('PUT', $url, $body);

        return $this->callApi($postId, $request);
    }

    /**
     * DELETE /projects/:id/content/:id.
     *
     * @since 3.0.0
     *
     * @param int $postId WordPress Post ID
     *
     * @return Response|false Response, or false
     **/
    public function deleteAudio($postId)
    {
        $projectId = PostMetaUtils::getProjectId($postId);
        $contentId = PostMetaUtils::getContentId($postId);

        $url = sprintf('%s/projects/%d/content/%s', Environment::getApiUrl(), $projectId, $contentId);

        $request = new Request('DELETE', $url);

        return $this->callApi($postId, $request);
    }

    /**
     * DELETE /projects/:id/content/:id.
     *
     * @since 4.1.0
     *
     * @param int[] $postIds Array of WordPress Post IDs.
     *
     * @throws \Exception
     * @return int[] The Post IDs with deleted audio.
     **/
    public function batchDeleteAudio($postIds)
    {
        $contentIds = [];
        $updatedPostIds = [];

        foreach ($postIds as $postId) {
            $projectId = PostMetaUtils::getProjectId($postId);

            if (! $projectId) {
                continue;
            }

            $contentId = PostMetaUtils::getContentId($postId);

            if (! $contentId) {
                continue;
            }

            $contentIds[$projectId][] = $contentId;
            $updatedPostIds[] = $postId;
        }

        if (! count($contentIds)) {
            throw new \Exception(__('None of the selected posts had valid BeyondWords audio data.', 'speechkit'));
        }

        if (count($contentIds) > 1) {
            throw new \Exception(__('Batch delete can only be performed on audio belonging a single project.', 'speechkit')); // phpcs:ignore Generic.Files.LineLength.TooLong
        }

        $projectId = array_key_first($contentIds);

        $url = sprintf('%s/projects/%d/content/batch_delete', Environment::getApiUrl(), $projectId);

        $body = wp_json_encode(['ids' => $contentIds[$projectId]]);

        $request = new Request('POST', $url, $body);

        $args = array(
            'blocking'    => true,
            'body'        => $request->getBody(),
            'headers'     => $request->getHeaders(),
            'method'      => $request->getMethod(),
            'sslverify'   => true,
        );

        $response = wp_remote_request($request->getUrl(), $args);

        // WordPress error performing API call
        if (is_wp_error($response)) {
            throw new \Exception($response->get_error_message());
        }

        $responseCode = wp_remote_retrieve_response_code($response);

        if ($responseCode <= 299) {
            // An OK response means all content IDs in the request were deleted
            return $updatedPostIds;
        } else {
            // For non-OK responses we do not want to delete any custom fields,
            // so return an empty array
            return [];
        }
    }

    /**
     * GET /organization/languages
     *
     * @since 4.0.0 Introduced
     * @since 4.0.2 Prefix endpoint with /organization
     *
     * @return array|object Array of voices or API error object.
     **/
    public function getLanguages()
    {
        $url = sprintf('%s/organization/languages', Environment::getApiUrl());

        $request = new Request('GET', $url);

        $args = array(
            'blocking'    => true,
            'headers'     => $request->getHeaders(),
            'method'      => $request->getMethod(),
            'sslverify'   => true,
        );

        $response = wp_remote_request($request->getUrl(), $args);

        // WordPress error performing API call
        if (is_wp_error($response) && get_the_ID()) {
            return $this->error(
                get_the_ID(),
                $response->get_error_message(),
                $response->get_error_code()
            );
        }

        $responseBody = wp_remote_retrieve_body($response);

        return json_decode($responseBody, true);
    }

    /**
     * GET /organization/voices
     *
     * @since 4.0.0 Introduced
     * @since 4.0.2 Prefix endpoint with /organization
     *
     * @param $languageId BeyondWords Language ID
     *
     * @return array|object Array of voices or API error object.
     **/
    public function getVoices($languageId)
    {
        $url = sprintf('%s/organization/voices?filter[language.id]=%s', Environment::getApiUrl(), urlencode(strval($languageId))); // phpcs:ignore Generic.Files.LineLength.TooLong

        $request = new Request('GET', $url);

        $args = array(
            'blocking'    => true,
            'headers'     => $request->getHeaders(),
            'method'      => $request->getMethod(),
            'sslverify'   => true,
        );

        $response = wp_remote_request($request->getUrl(), $args);

        // WordPress error performing API call
        if (is_wp_error($response) && get_the_ID()) {
            return $this->error(
                get_the_ID(),
                $response->get_error_message(),
                $response->get_error_code()
            );
        }

        $responseBody = wp_remote_retrieve_body($response);

        return json_decode($responseBody, true);
    }

    /**
     * GET /projects/:id.
     *
     * @since 4.0.0
     *
     * @return Response|false Response, or false
     **/
    public function getProject()
    {
        $projectId = get_option('beyondwords_project_id');

        if (! $projectId) {
            return false;
        }

        $url = sprintf('%s/projects/%d', Environment::getApiUrl(), $projectId);

        $request = new Request('GET', $url);

        $args = array(
            'blocking'    => true,
            'headers'     => $request->getHeaders(),
            'method'      => $request->getMethod(),
            'sslverify'   => true,
        );

        $response = wp_remote_request($request->getUrl(), $args);

        // WordPress error performing API call
        if (is_wp_error($response) && get_the_ID()) {
            return $this->error(
                get_the_ID(),
                $response->get_error_message(),
                $response->get_error_code()
            );
        }

        $responseBody = wp_remote_retrieve_body($response);

        return json_decode($responseBody, true);
    }

    /**
     * GET /projects/:id/player_settings.
     *
     * @since 4.0.0
     *
     * @param array $settings Associative array of player settings.
     *
     * @return Response|false Response, or false
     **/
    public function getPlayerSettings()
    {
        $projectId = get_option('beyondwords_project_id');

        if (! $projectId) {
            return false;
        }

        $url = sprintf('%s/projects/%d/player_settings', Environment::getApiUrl(), $projectId);

        $request = new Request('GET', $url);

        $args = array(
            'blocking'    => true,
            'headers'     => $request->getHeaders(),
            'method'      => $request->getMethod(),
            'sslverify'   => true,
        );

        $response = wp_remote_request($request->getUrl(), $args);

        // WordPress error performing API call
        if (is_wp_error($response) && get_the_ID()) {
            return $this->error(
                get_the_ID(),
                $response->get_error_message(),
                $response->get_error_code()
            );
        }

        $responseBody = wp_remote_retrieve_body($response);

        return json_decode($responseBody, true);
    }

    /**
     * PUT /projects/:id/player_settings.
     *
     * @since 4.0.0
     *
     * @param array $settings Associative array of player settings.
     *
     * @return Response|false Response, or false
     **/
    public function updatePlayerSettings($settings)
    {
        $projectId = get_option('beyondwords_project_id');

        if (! $projectId) {
            return false;
        }

        $url = sprintf('%s/projects/%d/player_settings', Environment::getApiUrl(), $projectId);

        $request = new Request('PUT', $url, $settings);

        $args = array(
            'blocking'    => true,
            'body'        => wp_json_encode($settings),
            'headers'     => $request->getHeaders(),
            'method'      => $request->getMethod(),
            'sslverify'   => true,
        );

        $response = wp_remote_request($request->getUrl(), $args);

        // WordPress error performing API call
        if (is_wp_error($response) && get_the_ID()) {
            return $this->error(
                get_the_ID(),
                $response->get_error_message(),
                $response->get_error_code()
            );
        }

        $responseBody = wp_remote_retrieve_body($response);

        return json_decode($responseBody, true);
    }

    /**
     * GET /projects/:id/video_settings.
     *
     * @since 4.1.0
     *
     * @param int $projectId BeyondWords Project ID.
     *
     * @return Response|false Response, or false
     **/
    public function getVideoSettings($projectId = null)
    {
        if (! $projectId) {
            $projectId = get_option('beyondwords_project_id');
        }

        $url = sprintf('%s/projects/%d/video_settings', Environment::getApiUrl(), $projectId);

        $request = new Request('GET', $url);

        $args = array(
            'blocking'    => true,
            'headers'     => $request->getHeaders(),
            'method'      => $request->getMethod(),
            'sslverify'   => true,
        );

        $response = wp_remote_request($request->getUrl(), $args);

        // WordPress error performing API call
        if (is_wp_error($response) && get_the_ID()) {
            return $this->error(
                get_the_ID(),
                $response->get_error_message(),
                $response->get_error_code()
            );
        }

        $responseBody = wp_remote_retrieve_body($response);

        return json_decode($responseBody, true);
    }

    /**
     * Call the BeyondWords API backend.
     *
     * @since 3.0.0
     * @since 3.9.0 Stop saving the speechkit_status post meta - downgrades to plugin v2.x are no longer expected.
     * @since 4.0.0 Removed hash comparison.
     *
     * @param int     $postId  Post ID.
     * @param Request $request Request.
     *
     * @return array|false JSON-decoded response body, or false on failure
     **/
    public function callApi($postId, $request)
    {
        $args = array(
            'blocking'    => true,
            'body'        => $request->getBody(),
            'headers'     => $request->getHeaders(),
            'method'      => $request->getMethod(),
            'sslverify'   => true,
        );

        // Reset any existing errors before making this API call
        delete_post_meta($postId, 'speechkit_error_message');
        delete_post_meta($postId, 'beyondwords_error_message');

        $response = wp_remote_request($request->getUrl(), $args);

        $errorMessage = '';

        // WordPress error performing API call
        if (is_wp_error($response)) {
            $errorMessage = $response->get_error_message();

            return $this->error($postId, $errorMessage, $response->get_error_code());
        }

        $responseCode = wp_remote_retrieve_response_code($response);

        $responseBody = wp_remote_retrieve_body($response);
        $responseBody = json_decode($responseBody, true);

        // Response had a HTTP error code (3XX, 4XX, 5XX)
        if ($responseCode > 299) {
            $errorMessage = $this->errorMessageFromResponse($response);

            if (! $errorMessage) {
                $errorMessage = sprintf(
                    /* translators: %s is replaced with the support email link */
                    esc_html__('API request error. Please contact %s.', 'speechkit'),
                    '<a href="mailto:support@beyondwords.io">support@beyondwords.io</a>'
                );
            }

            return $this->error($postId, $errorMessage, $responseCode);
        }

        // Response was invalid JSON
        if (json_last_error() !== JSON_ERROR_NONE) {
            $errorMessage = sprintf(
                /* translators: %s is replaced with the reason that JSON parsing failed */
                __('Unable to parse JSON in BeyondWords API response. Reason: %s.', 'speechkit'),
                // Don't allow any tags
                wp_kses(json_last_error_msg(), [])
            );

            return $this->error($postId, $errorMessage, 500);
        }

        return $responseBody;
    }

    /**
     * Handle API Error.
     *
     * @since 3.0.0
     * @since 4.0.0 Removed hash comparison and display 403 errors.
     *
     * @param int    $postId  Post ID.
     * @param string $message Error Message.
     * @param int    $code    Error Code.
     *
     * @throws \Exception
     */
    public function error($postId, $message, $code = 0)
    {
        $error = sprintf(self::ERROR_FORMAT, $code, $message);

        // Log the error message for this Post in the db
        update_post_meta($postId, 'beyondwords_error_message', $error);

        return false;
    }

    /**
     * Error message from BeyondWords REST API response.
     *
     * @since 4.1.0
     *
     * @param mixed[] $response BeyondWords REST API response.
     *
     * @return string Error message.
     */
    public function errorMessageFromResponse($response)
    {
        $body = wp_remote_retrieve_body($response);
        $body = json_decode($body, true);

        if (is_array($body) && array_key_exists('errors', $body)) {
            $messages = [];

            foreach ($body['errors'] as $error) {
                $messages[] = implode(" ", array_values($error));
            }

            $message = implode(", ", $messages);
        } elseif (is_array($body) && array_key_exists('message', $body)) {
            $message = $body['message'];
        } else {
            $message = wp_remote_retrieve_response_message($response);
        }

        return $message;
    }

    /**
     * Get error message.
     *
     * @since 3.0.0
     *
     * @param error
     *
     * @return string
     */
    public function getErrorMessage($error)
    {
        return $error['message'];
    }

    /**
     * Print admin notices.
     *
     * @since 3.0.0
     *
     * @return void
     */
    public function adminNotices()
    {
        $screen = get_current_screen();

        // Only add for enabled Posts screen
        $postTypes = SettingsUtils::getSupportedPostTypes();

        if (! in_array($screen->id, $postTypes)) {
            return;
        }

        $errorMessage = PostMetaUtils::getErrorMessage(get_the_ID());

        if (!$errorMessage) {
            return;
        }

        ?>
        <div class="notice notice-error">
            <p>
                <span class="dashicons dashicons-controls-volumeon"></span>
                <?php echo esc_html($errorMessage); ?>
            </p>
        </div>
        <?php
    }
}
