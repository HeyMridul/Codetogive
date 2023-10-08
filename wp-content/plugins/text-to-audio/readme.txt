=== Text To Speech TTS ===
Contributors: atlasaidev, hasanazizul, 
Donate link: http://atlasaidev.com/
Tags: google text to speech, speech, tts, text to speech, text to audio, record, voice comment, voice to text-comment,
Requires at least: 4.0
Tested up to: 6.3.1
Requires PHP: 7.4
Stable tag: 1.4.7
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Add functionality to WordPress site to read blogs out loud in more than 20 languages.

== Description ==

Add functionality to WordPress site to read blogs out loud in more than 20 languages.

There is no need to create an account it’s completely free. Just install the plugin and enjoy the whole features of the plugin.

== Free text to speech (TTS) plugin for WordPress - Video Tutorial ==
[youtube https://www.youtube.com/watch?v=P_dw_YjnVxc&t=21s&ab_channel=AtlasAiDev]

### Useful Links:
> * [Live Demo](http://atlasaidev.com/text-to-speech/)
> * [Request A Feature](http://atlasaidev.com/contact-us/)
> * [Pro Version](http://atlasaidev.com/)
> * [Video Tutorial](https://www.youtube.com/@atlasaidev)


**Important Note:**

Text To Speech TTS plugin is built on browser speechSynthesis API. No external API is used. Here is the API used [speechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis).
That is why Text To Speech TTS doesn’t support all android phones, aslo all languages. Here you can check which android phone and which device support [speechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis#browser_compatibility) API.

Another issue speechSynthesis API is differ browser to browser also device to device . So it changes the voices and languages based on browser. one language may available on desktop
It can be not available on mobile phone. One voice may available on desktop, it may be not available on android.

Here you can see some languages which are supported by the browsers based on device.

**Supported Languages:**

* Chrome Desktop: UK English, US English, Spanish ( Spain ), Spanish ( United States ), French, Deutsch, Italian, Russian, Dutch, Japanese, Korean, Chinese (China), Chinese (Hong Kong), Chinese (Taiwan) Hindi, Indonesian, Polish, Brazilian Portuguese.
* Chrome Mobile: English USA, English UK, German, Italian, Russian, French, Spanish, 

* Microsoft Edge Desktop : All Languages.
* Microsoft Edge Mobile : All Languages.

* FireFox Desktop: English.
* FireFox Mobile: English USA, English UK, German, Italian, Russian, French, Spanish.


**Listening is a better way to read:**
Boost your understanding and focus with listening by Text To Audio TTS. Remember more of what you read. Maximize your time,
Breeze through your content 2-3x faster than it takes to read it. Do more at once, Take your reading wherever you go – to the gym, the park, or the couch, or the journy.


**Pro Features:**

* Save time by listening while you’re doing other tasks.
* Engage with your customers more interactively.
* Improved UI of the button.
* Integrate with Google Cloud Text To Speech.
* Get more than 600 voices when you’re using Google Cloud Text To Speech.
* Remove special characters from content during reading.
* Remove URL from content during reading.
* Responsive speaking button.


**Features:**

* Add a play button to any post or page.
* Unlimited text to speech.
* Add more functionality to the website for a range of users including the visually impaired and the old people.
* Customization of button color, width and button text based on site language through [filter](https://wordpress.org/plugins/text-to-audio/#:~:text=How%20to%20change%20button%20text%3F).
* Live preview of play button during customization.
* Add custom CSS and custom class to the button.
* Change listening language to any language.
* Choose a voice from more than 20 voices.
* Customization of button in block editor.
* Play button can be added by shortcode “[tta_listen_btn]”.



== Installation ==
1. Download and unzip the plugin
2. Upload the entire "text-to-audio" directory to the `/wp-content/plugins/` directory
3. Activate the plugin through the 'Plugins' menu in WordPress
4. Go to "Text To Audio" menu and configure your settings


== Frequently Asked Questions ==

= Browser support issue on android phone on desktop =
This plugin is built on browser API. No external API is used. Here is the API used [speechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)
That is why it doesn’t support all android phones aslo all languages. Here you can check which android phone and which device support this [speechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis#browser_compatibility) API

Another issue speechSynthesis API is differ browser to browser also device to device . So it changes the voices and languages based on browser. one language may available on desktop
It can be not available on mobile phone. One voice may available on desktop, it may be not available on android.

If you still facing problems regarding browser issues please on a ticket.

= Another voice language on mobile =
speechSynthesis API is differ browser to browser also device to device . So it changes the voices and languages based on browser. one language may available on desktop
It can be not available on mobile phone. One voice may available on desktop, it may be not available on android.

= How to enable ``speechSynthesis`` on FireFox? =
Notice: This solution only for FireFox Desktop.
Open FireFox browser,  search ```about:config``` on a new tab. Now search with this string and enable as true.
    a. ```media.webspeech.synth.enabled```
= How to enable ``SpeechRecognition`` on FireFox? =
Notice: This solution only for FireFox Desktop.
Open FireFox browser, search ```about:config``` on a new tab. Now search with this string and enable as true.
    a. ```media.webspeech.recognition.enable```
    b. ```media.webspeech.recognition.force_enable```
= Can I add button in Gutenburg block? =
Yes, you can add listening button from block editor. Open you block editor and search ```Customize Button``` then add it.
Now you can change ```color```, ```backgroundColor```, ```width```. And also add ```custom_css```.
= How to change button text? =
You can change button text 2 ways one is by shortcode attribute. Another way is adding filter. But filter always overrides the shortcode attributes. Here is short code Example :
	`
	[tta_listen_btn listen_text="Listen" pause_text="Pause"  resume_text="Resume" replay_text="Replay" start_text="Start" stop_text="Stop"]
	`
    Filter Example :
	Install the plugin [Code Snippets](https://wordpress.org/plugins/code-snippets/) Then Select Snippet > Add New Create a new snippet with this block of code

    add_filter( 'tta__button_text_arr', 'tta__button_text_arr_callback' );
    function tta__button_text_arr_callback ( $button_text_arr ) {

		// Listen button
		$text_arr['listen_text'] = 'Listen'; // paste custem text
		$text_arr['pause_text'] = 'Pause'; // paste custem text
		$text_arr['resume_text'] = 'Resume'; // paste custem text
		$text_arr['replay_text'] = 'Replay'; // paste custem text

		// Record button text
		$text_arr['start_text'] = 'Start'; // paste custem text
		$text_arr['stop_text'] = 'Stop'; // paste custem text
		
		return $text_arr;
    }
              
= How to add custom css class to button? =
Add class on shortcode as an attribute. Example : `[tta_listen_btn class="custom_class"]`
= How can I change button background and text color? =
Yes, you can change buttons background and text color from plugins dashboard's customization menu. also from block editor by applying the ```customization button``` block.



== Screenshots ==
1. Add play button to any post.
2. Write post by voice.
3. Customization of button.
4. Choose listening voice.
5. Choose recording language.
6. Documentation.
7. Gutenburg Support.
8. Customize the button in block editor, Block Name ( Customize Button ).

== Changelog ==

💎 TRANSLATION REQUEST 💎
We are looking for people to help translate this plugin. If you can help we would love here from you.
Help us & the WordPress community to translate the plugin. You can [contact](http://atlasaidev.com/contact-us/) with us. We'll guide you how to translate.


= 1.4.7 ( 5 Oct 2023 ) =
* Fixed: [Shortcode stop working](https://wordpress.org/support/topic/shortcode-stop-working-2/)
* Fixed: Button hide issue fixed.
* Fixed: Listeing language change issue solved.
* Fixed: [change the button text](https://wordpress.org/support/topic/change-the-button-text-7/)
* compatibility added for twentytwentythree theme

= 1.4.6 ( Sep 30 , 2023) =
* Fixed: [Error using quotes in customized CSS](https://wordpress.org/support/topic/error-using-quotes-in-customized-css/)
* Fixed: [The custom labels for translating strings in button text issue](https://wordpress.org/support/topic/error-using-quotes-in-customized-css/)
* Fixed: [Javascript errors](https://wordpress.org/support/topic/javascript-errors-61/)


= 1.4.5 ( Sep 21 , 2023) =
* Theme support: Divi, Enfold, Astra, Kadance, OceanWP, Hello Elementor, GeneratePress, Dynamic News, Kadance, Darknews theme supported.
* Plugin support: Elementor builder supported.

= 1.4.4 ( Sep 14 , 2023) =
* Fixed: JS error fixed.
* Tested: WordPress 6.3.1.
* Improved: JS loading improved on front.

= 1.4.3 ( Sep 10 , 2023) =
* Fixed: CSS loaded properly.
* Fixed: Short code text not displaying issue solved.
* Added: Integrate with [Text To Speech Pro](https://atlasaidev.com/text-to-speech-pro/) version.
* Added: Plugin URI added.


= 1.4.2 ( Sep 07 , 2023) =
* Fixed: Fixed: button showing issue is solved.

= 1.4.1 ( Sep 6 , 2023) =
* Fixed: Custom css adding issue solved.

= 1.4.0 ( Sep 2 , 2023) =
* Tested : WordPress 6.3
* Updated: Documentation updated. Pro Features added.

= 1.3.25 ( August 24 , 2023) =
* Added : After switching tab stop speeching, if paused by intention.

= 1.3.24 ( August 24 , 2023) =
* Added : After switching tab stop speeching, if paused by intention.

= 1.3.23 ( August 9 , 2023) =
* Tested : WordPress 6.3
* PHP version: PHP version 7.4 is recomended as WordPress 6.3 [recomendation](https://wordpress.org/download/#:~:text=Recommend%20PHP%207.4%20or%20greater%20and%20MySQL%20version%205.7%20or%20MariaDB%20version%2010.4%20or%20greater.)
* Updated: Documentation updated.

= 1.3.22 ( JULY 27 , 2023) =
* Added : Invitation to translate plugin notice added to dashboard.
* Added : Review notice added to dashboard.


= 1.3.21 ( JULY 21 , 2023) =
* Added : `tta__content` filter added. Arguments are `$content, $post`.


= 1.3.20 ( JULY 15 , 2023) =
* Removed : Invitation to translate plugin notice added to dashboard.
* Removed : Review notice added to dashboard.

= 1.3.19 ( JULY 15 , 2023) =
* Added : Invitation to translate plugin notice added to dashboard.
* Added : Review notice added to dashboard.
* Updated : Pluign documentation updated.


= 1.3.18 ( JULY 09 , 2023) =
* Fixed : Error during plugin update issue fixed.
* Added : By default play button showing to page added.
* Renamed : Menu name "Docs" to "FAQ" renamed.


= 1.3.17 (JUNE 28, 2023) =
* Fixed : [Text2Speech Stopped Working](https://wordpress.org/support/topic/text2speech-stopped-working/) issue fixed.


= 1.3.16 (JUNE 25, 2023) =
* Moved : Button id number, content, and listening settings moved to footer.


= 1.3.15 (June 11, 2023) =
* Improved : On button hover cursor is now pointer.

= 1.3.14 (May 31, 2023) =
* Fixed : Allow Listening For Post Type not working issue resolved.


= 1.3.13 (May 29, 2023) =
* Rename: Allow Recoding For Post Type to Allow Listeing For Post Type.
* Fixed : Allow Listeing For Post Type not working issue.
* Removed: Allow Button On Single Page option.
* Moved: Allow Button On Single Page to Allow Listeing For Post Type


= 1.3.12 (May 23, 2023) =
* Updated: Documentation updated.
* Updated: Dashboard documentation menu change to "Support Docs".
* Added: More Questions added to "Support Docs" menu
* Fixed: Copy to clipboard is not working.

= 1.3.11 (May 17, 2023) =
* Fixed : Multiple button are showing on archive, category, tag page.

= 1.3.10 (May 12, 2023) =
* Added : inline css moved to text-to-audio-css file.
* Fixed : customize button block not found on the block editor.

= 1.3.9 (May 07, 2023) =
* Fixed : 10 seconds after puase the resume button not working on mobile and desktop.
* Fixed : after puase the resume button not working on mobile.

= 1.3.8 (Apr 30, 2023) =
* Improved : Don't stop reading text even tab switches functionality improved.

= 1.3.7 (Apr 30, 2023) =
* Fixed : Don't stop reading text even tab switches.

= 1.3.6 (Apr 19, 2023) =
* Fixed : Stop reading after first paragragh in android issue solved.

= 1.3.5 (Apr 18, 2023) =
* Fixed : [Stops reading after around 700 words.](https://wordpress.org/support/topic/stops-reading-after-around-700-words/)

= 1.3.4 (Apr 12, 2023) =
* Fixed : [Page don't show the button](https://wordpress.org/support/topic/pages-dont-show-the-button/) issue solved.

= 1.3.3 (2023-04-05) =
* Tested: WP version 6.2 tested.
* Changed: Plugin name changed to "Text To Speech TTS"

= 1.3.2 (2023-03-30) =
* Improved: Dashboard Notice UI Improved.
* Fixed: Selection of listening language to any language.


= 1.3.1 (2023-03-24) =
* Added: Browser supported languages are added to documentation.
* Fixed: Documentation Improveed.


= 1.3.0 (2023-03-11) =
* Fixed: Chrome android play button issue fixed.
* Fixed: FireFox android play button issue fixed.
* Fixed: Microsoft edge android play button issue fixed.
* Fixed: IPhone Chrome android play button issue fixed.
* Fixed: Dashboard UI improved.
* Fixed: Listening voices are now based on browser API.


= 1.2.5 (2023-03-06) =
* Added: Play button display only single single page.
* Fixed: Database value delete after update plugin.

= 1.2.4 (2023-03-01) =
* Fixed: Button text position issue fixed.
* Fixed: Button icon position issue fixed.

= 1.2.3 (2023-02-27) =
* Fixed: Post title ASCII issue resolved.
* Fixed: Error on incognito mode issue solved.
* Fixed: Dashicons load in incognito mode or for non logged in users.
* Fixed: Dashicon related css issue fixed.
* Fixed: enable/disable button in single page.

= 1.2.2 (2023-02-04) =
* Updated: URL change.

= 1.2.1 (2023-01-28) =
* Improved: Documentation improved.
* Added: .pot file added for translation.
* Updated: Plugin name from Text To Audio to Text To Speech Ninja.

= 1.2.0 (2023-01-04) =
* Fixed: speechSynthesis pause after 10 - 15 seconds issue fixed.
* Tested: WordPress verison 6.1.1 tested.

= 1.1.6 (2022-10-22) =
* Tested: WordPress verison 6.1 tested .
* Improved: Button UI improved.

= 1.1.5 (2022-10-22) =
* Added:  enable/disable option for adding button to every post.
* Improved:  Settings UI improved.
* Improved:  Documentation improved.


= 1.1.4 (2022-10-09) =
* Button Icon : Button Icon display hide/show option added.
* Tabs: Settings tab rearranged.


= 1.1.3 (2022-09-24) =
* Button text : Listeing  and Recoding button text change option added throw filter and attribute.
* Action Links: Plugin action Links added.
* Documentation: Documentation Improved.
* Filter added: ```tta__button_text_arr```, ```tta__content_title```, ```tta__content_description``` filter added.

= 1.1.2 (2022-09-14)  =
* Bugfixed: is_plugin_active error fixed.
* Improved: FireFox api missing notice update.

= 1.1.1 (2022-07-23)  =
* Bugfixed: FireFox api missing alert bug fixed.
* Improved: Documentation Improved.

= 1.1.0 (2022-07-23)  =
* Feature: Customization of listening button from block editor. Block Name ( Customize Button )
* Added : Documentation added for how to enable ```SpeechRecognition``` and ```speechSynthesis``` on FireFox.
* Solved: FireFox ```SpeechRecognition``` and ```speechSynthesis``` issue solved.


= 1.0.4 (2022-07-12)  =
* Changed: shortcode from  ```[wps_listen_btn]``` to ```[tta_listen_btn]```
* Changed: Files name changed.
* Fixed: Customization UI issue fixed.

= 1.0.3 (2022-06-17)  =
* Fixed: Button CSS issue fixed.
* Fixed: Button alignment issue fixed.
* Added: Support ticket button added.
* Added: Review button added.

= 1.0.2 (2022-05-26)  =
* Make dashboard responsive.
* Ask for a feature button added.
* Browser support documentation added.
* Bugfixed.

= 1.0.1 (2022-05-23)  =
* Gutenburg support added.

= 1.0.0 (2022-05-18)  =
* Initial release.

== Upgrade Notice ==

= 0.1 =
This version fixes a security related bug. Upgrade immediately.