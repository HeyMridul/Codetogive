<?php

declare(strict_types=1);

namespace Beyondwords\Wordpress;

use Beyondwords\Wordpress\Compatibility\Elementor\Elementor;
use Beyondwords\Wordpress\Core\ApiClient;
use Beyondwords\Wordpress\Core\Core;
use Beyondwords\Wordpress\Core\LegacyPlayer;
use Beyondwords\Wordpress\Core\Player;
use Beyondwords\Wordpress\Core\Updater;
use Beyondwords\Wordpress\Component\Post\AddPlayer\AddPlayer;
use Beyondwords\Wordpress\Component\Post\BlockAttributes\BlockAttributes;
use Beyondwords\Wordpress\Component\Post\DisplayPlayer\DisplayPlayer;
use Beyondwords\Wordpress\Component\Post\ErrorNotice\ErrorNotice;
use Beyondwords\Wordpress\Component\Post\GenerateAudio\GenerateAudio;
use Beyondwords\Wordpress\Component\Post\Metabox\Metabox;
use Beyondwords\Wordpress\Component\Post\Panel\Inspect\Inspect;
use Beyondwords\Wordpress\Component\Post\PlayerStyle\PlayerStyle;
use Beyondwords\Wordpress\Component\Post\SelectVoice\SelectVoice;
use Beyondwords\Wordpress\Component\Posts\Column\Column;
use Beyondwords\Wordpress\Component\Posts\BulkEdit\BulkEdit;
use Beyondwords\Wordpress\Component\Settings\ApiKey\ApiKey;
use Beyondwords\Wordpress\Component\Settings\Languages\Languages;
use Beyondwords\Wordpress\Component\Settings\Preselect\Preselect;
use Beyondwords\Wordpress\Component\Settings\PrependExcerpt\PrependExcerpt;
use Beyondwords\Wordpress\Component\Settings\PlayerUI\PlayerUI;
use Beyondwords\Wordpress\Component\Settings\PlayerStyle\PlayerStyle as PlayerStyleSetting;
use Beyondwords\Wordpress\Component\Settings\PlayerVersion\PlayerVersion;
use Beyondwords\Wordpress\Component\Settings\ProjectId\ProjectId;
use Beyondwords\Wordpress\Component\Settings\SettingsUpdated\SettingsUpdated;
use Beyondwords\Wordpress\Component\Settings\Settings;
use Beyondwords\Wordpress\Component\Settings\SettingsUtils;
use Beyondwords\Wordpress\Component\SiteHealth\SiteHealth;

/**
 * Temprarily suppress some PHPMD warnings, these are fixed in the post-v4
 * refactor branch anyway.
 *
 * @SuppressWarnings(PHPMD.TooManyFields)
 * @SuppressWarnings(PHPMD.LongVariable)
 */
class Plugin
{
    public $updater;

    public $elementor;

    public $core;

    public $player;

    public $settings;

    public $settingsApiKey;

    public $settingsProjectId;

    public $settingsPreselect;

    public $settingsPrependExcerpt;

    public $settingsPlayerVersion;

    public $settingsPlayerUI;

    public $settingsPlayerStyle;

    public $settingsLanguages;

    public $settingsSettingsUpdated;

    public $column;

    public $bulkEdit;

    public $addPlayer;

    public $blockAttributes;

    public $errorNotice;

    public $inspect;

    public $metabox;

    public $selectVoice;

    public $siteHealth;

    /**
     * Constructor.
     *
     * @todo Replace properties like $this->updater with (new Updater())->init().
     *       Check PHP version support for this first.
     */
    public function __construct()
    {
        // First, run plugin update checks
        $this->updater = new Updater();

        // Elementor
        $this->elementor = new Elementor();

        // 1. Core
        $apiClient = new ApiClient();
        $this->core = new Core($apiClient);

        // 2. Player
        if (SettingsUtils::useLegacyPlayer()) {
            $this->player = new LegacyPlayer();
        } else {
            $this->player = new Player();
        }

        // 3. Settings
        $this->settings                = new Settings($apiClient);
        $this->settingsApiKey          = new ApiKey();
        $this->settingsProjectId       = new ProjectId();
        $this->settingsSettingsUpdated = new SettingsUpdated();
        $this->settingsPreselect       = new Preselect();
        $this->settingsPrependExcerpt  = new PrependExcerpt();
        $this->settingsPlayerVersion   = new PlayerVersion($apiClient);
        $this->settingsPlayerUI        = new PlayerUI();
        $this->settingsPlayerStyle     = new PlayerStyleSetting($apiClient);
        $this->settingsLanguages       = new Languages($apiClient);

        // 4. Posts screen
        $this->column = new Column();
        $this->bulkEdit = new BulkEdit();

        // 5. Post screen
        $this->addPlayer = new AddPlayer();
        $this->blockAttributes = new BlockAttributes();
        $this->errorNotice = new ErrorNotice();
        $this->inspect = new Inspect();

        // 6. Post screen Metabox
        $generateAudio = new GenerateAudio();
        $displayPlayer = new DisplayPlayer();
        $selectVoice = new SelectVoice($apiClient);
        $playerStyle = new PlayerStyle();
        $this->metabox = new Metabox($generateAudio, $displayPlayer, $selectVoice, $playerStyle);

        // 7. Site Health
        $this->siteHealth = new SiteHealth();
    }
}
