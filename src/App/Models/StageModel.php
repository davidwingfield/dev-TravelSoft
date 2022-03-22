<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short Stage Description
	 * Long Stage Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class StageModel extends Model
	{
		
		protected static $dbTable = "stage";
		protected static $dbFields = Array();
		protected static $sql = "
            SELECT
                    STAGE.id AS 'stage_id',
                    STAGE.name AS 'stage_name',
                    STAGE.class AS 'stage_class',
                    STAGE.enabled AS 'stage_enabled',
                    STAGE.date_created AS 'stage_date_created',
                    STAGE.created_by AS 'stage_created_by',
                    STAGE.date_modified AS 'stage_date_modified',
                    STAGE.modified_by AS 'stage_modified_by',
                    STAGE.note AS 'stage_note'
            FROM 	stage STAGE
        ";
		
		public static function fetchAll(): array
		{
			Log::$debug_log->trace("StageModel::fetchAll()");
			
			$whereConditions = "
			
			";
			$orderByConditions = "
			";
			
			$sql = self::$sql . $whereConditions . $orderByConditions;
			
			try {
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
			
		}
		
		public static function fetchByStageId(int $stageId): array
		{
			Log::$debug_log->trace("StageModel::fetchByStageId()");
			Log::$debug_log->info("stageId: $stageId");
			// ----
			
			$whereConditions = "
			WHERE STAGE.id = $stageId
			";
			$orderByConditions = "
			";
			
			$sql = self::$sql . $whereConditions . $orderByConditions;
			
			try {
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
			
		}
		
		public static function fetchByUserId(int $userId): array
		{
			Log::$debug_log->trace("StageModel::fetchByUserId()");
			Log::$debug_log->info("userId: $userId");
			// ----
			
			$whereConditions = "
			WHERE STAGE.created_by = $userId
			";
			$orderByConditions = "
			";
			
			$sql = self::$sql . $whereConditions . $orderByConditions;
			
			try {
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
			
		}
		
		public static function get(int $id = null): array
		{
			
			try {
				if (!is_null($id)) {
					self::$db->where("id", $id);
				}
				
				self::$db->where("enabled", 1);
				
				return self::$db->get(self::$dbTable);
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
