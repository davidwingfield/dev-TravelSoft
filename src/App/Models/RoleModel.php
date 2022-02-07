<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short Role Description
	 * Long Role Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class RoleModel extends Model
	{
		
		protected static $dbTable = "role";
		protected static $dbFields = Array();
		protected static $selectQuery = "
            SELECT
                        ROLE.id AS 'role_id',
                        ROLE.name AS 'role_name',
                        ROLE.level AS 'role_level',
                        ROLE.sort_order AS 'role_sort_order',
                        ROLE.enabled AS 'role_enabled',
                        ROLE.date_created AS 'role_date_created',
                        ROLE.created_by AS 'role_created_by',
                        ROLE.date_modified AS 'role_date_modified',
                        ROLE.modified_by AS 'role_modified_by',
                        ROLE.note AS 'role_note'
            FROM 	    role ROLE
        ";
		
		public static function get(int $id = null): array
		{
			$whereCondition = "
                WHERE       ROLE.enabled = 1
            ";
			if (!is_null($id)) {
				$whereCondition = "
                    AND     ROLE.id = $id
                ";
			}
			
			try {
				$sql = self::$selectQuery . $whereCondition;
				
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
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
