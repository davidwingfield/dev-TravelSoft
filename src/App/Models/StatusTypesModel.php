<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\Core\Model;
	
	/**
	 * Short StatusTypes Description
	 * Long StatusTypes Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class StatusTypesModel extends Model
	{
		
		protected static $dbTable = "status_types";
		protected static $dbFields = Array();
		protected static $selectQuery = "
			SELECT 		STATUS_TYPES.id AS 'status_types_id',
						STATUS_TYPES.name AS 'status_types_name',
						STATUS_TYPES.enabled AS 'status_types_enabled',
						STATUS_TYPES.date_created AS 'status_types_date_created',
						STATUS_TYPES.created_by AS 'status_types_created_by',
						STATUS_TYPES.date_modified AS 'status_types_date_modified',
						STATUS_TYPES.modified_by AS 'status_types_modified_by',
						STATUS_TYPES.note AS 'status_types_note',
						STATUS_TYPES.sort_order AS 'status_types_sort_order'
			FROM 		status_types STATUS_TYPES
		";
		
		public static function fetchStatusTypesByStatusTypesId(int $status_types_id = null): array
		{
			$whereCondition = "
	        ";
			
			if (!is_null($status_types_id)) {
				$whereCondition = "
                WHERE		STATUS_TYPES.id = $status_types_id
            ";
			}
			
			$sql = self::$selectQuery . $whereCondition;
			
			try {
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				return [];
			}
		}
		
		public static function get(int $status_types_id = null): array
		{
			$whereCondition = "
	        ";
			
			if (!is_null($status_types_id)) {
				$whereCondition = "
                WHERE		STATUS_TYPES.id = $status_types_id
            ";
			}
			
			$sql = self::$selectQuery . $whereCondition;
			
			try {
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				return [];
			}
		}
		
		public static function getAllotBy(int $id = null): array
		{
			
			try {
				if (!is_null($id)) {
					self::$db->where("id", $id);
				}
				
				self::$db->where("enabled", 1);
				
				return self::$db->get("allot_by");
			} catch (Exception $e) {
				return [];
			}
		}
		
		public static function getOne(int $id = null): array
		{
			try {
				if (!is_null($id)) {
					self::$db->where("id", $id);
				}
				self::$db->orderBy("sort_order", "ASC");
				self::$db->where("enabled", 1);
				
				return self::$db->getOne(self::$dbTable);
			} catch (Exception $e) {
				return [];
			}
		}
		
		public static function update(array $params = []): array
		{
			$id = 1;
			
			return self::get($id);
		}
		
	}
