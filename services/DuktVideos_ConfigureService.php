<?php


/**
 * Dukt Videos
 *
 * @package		Dukt Videos
 * @version		Version 1.0
 * @author		Benjamin David
 * @copyright	Copyright (c) 2013 - DUKT
 * @link		http://dukt.net/add-ons/expressionengine/dukt-videos/
 *
 */

namespace Craft;

class DuktVideos_ConfigureService extends BaseApplicationComponent
{	
	/**
	 * Set Option
	 */
	function set_option($k, $v)
	{
		$data = array(
			'option_name' => $k,
			'option_value' => $v
		);
		
		
		// get the option
		
		$option = DuktVideos_OptionRecord::model()->find('option_name=:option_name', array(':option_name' => $k));
		
		if(!$option)
		{
    		// insert
    		
    		craft()->db->createCommand()->insert('duktvideos_options', $data);
		}
		else
		{
    		// update
    		
    		$where = array('option_name' => $k);

    		craft()->db->createCommand()->update('duktvideos_options', $data, $where);
		}
	}
	
	// --------------------------------------------------------------------

	function get_option($k)
	{
		$option =  DuktVideos_OptionRecord::model()->find('option_name=:option_name', array(':option_name' => $k));

		if(is_object($option))
		{
			return $option->option_value;
		}
		
		return false;
	}

	// --------------------------------------------------------------------
	
	/**
	 * Reset Service
	 */
	function reset_service($service_key)
	{		
		$condition = "option_name LIKE :match";
		
		$params = array(':match' => $service_key."%token%%");
		
	    DuktVideos_OptionRecord::model()->deleteAll($condition, $params);
	}
}

