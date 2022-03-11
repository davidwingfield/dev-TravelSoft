<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short ItineraryModel Description
	 * Long ItineraryModel Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class ItineraryModel extends Model
	{
		protected static $dbTable = "itinerary";
		protected static $dbFields = Array();
		protected static $sql = "";
		
		public static function fetch(int $id = null): array
		{
		
		}
		
	}
