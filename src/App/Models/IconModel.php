<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\Core\Controller;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short Location Description
	 * Long Location Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class IconModel extends Model
	{
		
		/**
		 * @var string
		 */
		protected static $dbTable = "location";
		
		/**
		 * @var array
		 */
		protected static $dbFields = Array();
		
		/**
		 * @var string
		 */
		protected static $selectQuery = "
			SELECT 		ICON.id AS 'icon_id',
						ICON.name AS 'icon_name',
						ICON.class AS 'icon_class',
						ICON.keywords AS 'icon_keywords',
						ICON.enabled AS 'icon_enabled',
						ICON.date_created AS 'icon_date_created',
						ICON.created_by AS 'icon_created_by',
						ICON.date_modified AS 'icon_date_modified',
						ICON.modified_by AS 'icon_modified_by',
						ICON.note AS 'icon_note'
			FROM 		icon ICON
			";
		
		public static function getIcons(int $icon_id = null): array
		{
			$whereCondition = "";
			$orderCondition = "";
			$limitCondition = "";
			
			if (!is_null($icon_id)) {
				$whereCondition = "WHERE		ICON.id = $icon_id";
			}
			
			try {
				$sql = self::$selectQuery . $whereCondition . $orderCondition;
				
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
	}
