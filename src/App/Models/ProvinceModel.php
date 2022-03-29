<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short Province Description
	 * Long Province Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class ProvinceModel extends Model
	{
		
		protected static $dbTable = "province";
		protected static $dbFields = Array();
		
		public static function get(int $country_id = null, int $province_id = null): array
		{
			$where = "WHERE			PROVINCE.enabled = 1";
			if (!is_null($country_id)) {
				$where .= " AND         PROVINCE.country_id = $country_id";
			}
			
			if (!is_null($province_id)) {
				$where .= " AND         PROVINCE.id = $province_id";
			}
			
			try {
				
				$sql = "
                SELECT
                                PROVINCE.id AS 'province_id',
                                PROVINCE.country_id AS 'province_country_id',
                                PROVINCE.name AS 'province_name',
                                PROVINCE.iso2 AS 'province_iso2',
                                PROVINCE.iso3 AS 'province_iso3',
                                PROVINCE.sort_order AS 'province_sort_order',
                                PROVINCE.enabled AS 'province_enabled',
                                PROVINCE.date_created AS 'province_date_created',
                                PROVINCE.created_by AS 'province_created_by',
                                PROVINCE.date_modified AS 'province_date_modified',
                                PROVINCE.modified_by AS 'province_modified_by',
                                PROVINCE.note AS 'province_note',
					            IF((PROVINCE.iso3 IS NOT NULL) AND (PROVINCE.iso3 != '') AND (PROVINCE.name IS NOT NULL), CONCAT(PROVINCE.iso3, ' - ', PROVINCE.name), PROVINCE.name ) AS 'province_display_long',
					            PROVINCE.name AS 'province_display_medium',
					            IF((PROVINCE.iso3 IS NOT NULL) AND (PROVINCE.iso3 != ''), PROVINCE.iso3, PROVINCE.name ) AS 'province_display_short'
                FROM 			province PROVINCE
                $where
                ORDER BY 		PROVINCE.sort_order, PROVINCE.name ASC;";
				
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->trace("test");
				
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
		
		public static function update(array $province = []): array
		{
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$id = Model::setInt((isset($province["id"])) ? $province["id"] : null);
			$country_id = Model::setInt((isset($province["country_id"])) ? $province["country_id"] : null);
			$sort_order = Model::setInt((isset($province["sort_order"])) ? $province["sort_order"] : 9999999);
			$name = Model::setString((isset($province["name"])) ? $province["name"] : null);
			$iso2 = Model::setString((isset($province["iso2"])) ? $province["iso2"] : null);
			$iso3 = Model::setString((isset($province["iso3"])) ? $province["iso3"] : null);
			$note = Model::setLongText((isset($province["note"])) ? $province["note"] : null);
			$enabled = Model::setBool((isset($province["enabled"])) ? $province["enabled"] : null);
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			$sql = "
		INSERT INTO province (
			id, country_id, sort_order, name, iso2,
			iso3, enabled, date_created, created_by,
			date_modified, modified_by, note
		) VALUES (
			$id, $country_id, $sort_order, $name,
			$iso2, $iso3, $enabled, DEFAULT,
			$created_by, DEFAULT, $modified_by, $note
		)
		ON DUPLICATE KEY UPDATE
			sort_order = VALUES(sort_order),
			name = VALUES(name),
			iso2 = VALUES(iso2),
			iso3 = VALUES(iso3),
			note = VALUES(note),
			modified_by = VALUES(modified_by),
			date_modified = VALUES(date_modified),
			enabled = VALUES(enabled);";
			
			try {
				Model::$db->rawQuery($sql);
				$id = Model::$db->getInsertId();
				
				return self::get($country_id, $id);
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		// ----
		
	}
