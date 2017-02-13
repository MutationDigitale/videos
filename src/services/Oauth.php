<?php
/**
 * @link      https://dukt.net/craft/videos/
 * @copyright Copyright (c) 2017, Dukt
 * @license   https://dukt.net/craft/videos/docs/license
 */

namespace dukt\videos\services;

use Craft;
use yii\base\Component;

/**
 * Class Oauth service.
 *
 * An instance of the Oauth service is globally accessible via [[Plugin::oauth `Videos::$plugin->getOauth()`]].
 *
 * @author Dukt <support@dukt.net>
 * @since  2.0
 */
class Oauth extends Component
{
    // Properties
    // =========================================================================

	/**
	 * @var
	 */
	private $tokens;

    // Public Methods
    // =========================================================================

	/**
	 * Gets a token
	 *
	 * @param $handle
	 *
	 * @return mixed
	 */
	public function getToken($handle)
    {
        if(!empty($this->tokens[$handle]))
        {
            return $this->tokens[$handle];
        }
        else
        {
            // get plugin
            $plugin = Craft::$app->plugins->getPlugin('videos');

            // get settings
            $settings = $plugin->getSettings();

            // get tokens
            $tokens = $settings->tokens;

            if(!empty($settings->tokens[$handle]))
            {
                // get tokenId
                $tokenId = $tokens[$handle];

                // get token

/*                if(isset(\dukt\oauth\Plugin::getInstance()->oauth))
                {*/
                    $token = \dukt\oauth\Plugin::getInstance()->oauth->getTokenById($tokenId);

                    if($token)
                    {
                        $this->tokens[$handle] = $token;
                        return $this->tokens[$handle];
                    }
                /*}*/
            }
        }
    }

	/**
	 * Saves a token
	 *
	 * @param $handle
	 * @param $token
	 */
	public function saveToken($handle, $token)
    {
        $handle = strtolower($handle);

        // get plugin
        $plugin = Craft::$app->plugins->getPlugin('videos');

        // get settings
        $settings = $plugin->getSettings();

        // get tokens
        $tokens = $settings->tokens;

        // get token

        if(!empty($tokens[$handle]))
        {
            // get tokenId
            $tokenId = $tokens[$handle];

            // get token
            // $model = \dukt\oauth\Plugin::getInstance()->oauth->getTokenById($tokenId);
            // $token->id = $tokenId;
            $existingToken = \dukt\oauth\Plugin::getInstance()->oauth->getTokenById($tokenId);
        }


        if(!$token)
        {
            $token = new Oauth_TokenModel;
        }

        if(isset($existingToken))
        {
            $token->id = $existingToken->id;
        }

        $token->providerHandle = $handle;
        $token->pluginHandle = 'videos';


        // save token
        \dukt\oauth\Plugin::getInstance()->oauth->saveToken($token);

        // set token ID
        $tokens[$handle] = $token->id;

        // save plugin settings
        $settings->tokens = $tokens;
        Craft::$app->plugins->savePluginSettings($plugin, $settings->getAttributes());
    }

	/**
	 * Deletes a token
	 *
	 * @param $handle
	 */
	public function deleteToken($handle)
    {
        $handle = strtolower($handle);

        // get plugin
        $plugin = Craft::$app->plugins->getPlugin('videos');

        // get settings
        $settings = $plugin->getSettings();

        // get tokens
        $tokens = $settings->tokens;

        // get token

        if(!empty($tokens[$handle]))
        {
            // get tokenId
            $tokenId = $tokens[$handle];

            // get token
            $token = \dukt\oauth\Plugin::getInstance()->oauth->getTokenById($tokenId);

            if($token)
            {
                \dukt\oauth\Plugin::getInstance()->oauth->deleteToken($token);
            }

            unset($tokens[$handle]);

            // save plugin settings
            $settings->tokens = $tokens;
            Craft::$app->plugins->savePluginSettings($plugin, $settings->getAttributes());
        }
    }
}
