<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short City Description
	 * Long City Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class CityModel extends Model
	{
		
		protected static $dbTable = "city";
		protected static $baseSQL = "
			SELECT          CITY.id AS 'city_id',
	                        CITY.province_id AS 'city_province_id',
	                        CITY.country_id AS 'city_country_id',
	                        CITY.sort_order AS 'city_sort_order',
	                        CITY.name AS 'city_name',
	                        CITY.enabled AS 'city_enabled',
	                        CITY.date_created AS 'city_date_created',
	                        CITY.created_by AS 'city_created_by',
	                        CITY.date_modified AS 'city_date_modified',
	                        CITY.modified_by AS 'city_modified_by',
	                        CITY.note AS 'city_note'
			FROM 			city CITY
		";
		
		protected static $selectQuery = "
            SELECT 		CONCAT( CITY.name, ' (',  PROVINCE.name, ', ', COUNTRY.name, ')') AS 'location',
                        CITY.id AS 'city_id',
                        CITY.province_id AS 'city_province_id',
                        CITY.country_id AS 'city_country_id',
                        CITY.sort_order AS 'city_sort_order',
                        CITY.name AS 'city_name',
                        CITY.enabled AS 'city_enabled',
                        CITY.date_created AS 'city_date_created',
                        CITY.created_by AS 'city_created_by',
                        CITY.date_modified AS 'city_date_modified',
                        CITY.modified_by AS 'city_modified_by',
                        CITY.note AS 'city_note',
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
                        COUNTRY.id AS 'country_id',
                        COUNTRY.currency_id AS 'country_currency_id',
                        COUNTRY.sort_order AS 'country_sort_order',
                        COUNTRY.name AS 'country_name',
                        COUNTRY.iso2 AS 'country_iso2',
                        COUNTRY.iso3 AS 'country_iso3',
                        COUNTRY.enabled AS 'country_enabled',
                        COUNTRY.date_created AS 'country_date_created',
                        COUNTRY.created_by AS 'country_created_by',
                        COUNTRY.date_modified AS 'country_date_modified',
                        COUNTRY.modified_by AS 'country_modified_by',
                        COUNTRY.note AS 'country_note'
            FROM 		city CITY
            JOIN 		province PROVINCE ON PROVINCE.id = CITY.province_id
            JOIN 		country COUNTRY ON COUNTRY.id = PROVINCE.country_id
        ";
		
		/**
		 * City autocomplete method
		 *
		 * @param string $st
		 *
		 * @return array
		 */
		public static function city_ac(string $st = ""): array
		{
			$baseSQL = self::$selectQuery;
			$whereCondition = [];
			$orderCondition = [];
			$limitCondition = 20;
			$searchTerm = addslashes($st);
			
			//
			
			$orderCondition[] = "CONCAT( CITY.name, ' (',  PROVINCE.name, ', ', COUNTRY.name, ')') ASC";
			$orderCondition[] = "CAST(CONCAT( CITY.name, ' (',  PROVINCE.name, ', ', COUNTRY.name, ')') AS UNSIGNED) ASC";
			
			//
			
			$whereCondition[] = "CITY.enabled = 1";
			$whereCondition[] = "CONCAT( CITY.name, ' (',  PROVINCE.name, ', ', COUNTRY.name, ')') LIKE '%$searchTerm%'";
			
			//
			
			$limit = ((int)$limitCondition > 0) ? "LIMIT        $limitCondition" : "";
			$where = (count($whereCondition) > 0) ? "WHERE   			" . implode(" AND ", $whereCondition) : "";
			$order = (count($orderCondition) > 0) ? "ORDER BY   			" . implode(", ", $orderCondition) : "";
			
			$selectQuery = "
                $baseSQL
                $where
                $order
                $limit;";
			
			try {
				return Model::$db->rawQuery($selectQuery);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
		public static function get(int $country_id = null, int $province_id = null, int $city_id = null): array
		{
			$baseSQL = self::$baseSQL;
			$whereCondition = [];
			$orderCondition = [];
			$limitCondition = 0;
			// ----
			
			$orderCondition[] = "CITY.sort_order ASC";
			$orderCondition[] = "CITY.name ASC";
			$orderCondition[] = "CAST(CITY.name AS UNSIGNED)";
			// ----
			
			$whereCondition[] = "CITY.enabled = 1";
			if (!is_null($country_id)) {
				$whereCondition[] = "CITY.country_id = $country_id";
			}
			if (!is_null($province_id)) {
				$whereCondition[] = "CITY.province_id = $province_id";
			}
			if (!is_null($city_id)) {
				$whereCondition[] = "CITY.id = $city_id";
			}
			// ----
			
			$limit = ((int)$limitCondition > 0) ? "LIMIT        $limitCondition" : "";
			$where = (count($whereCondition) > 0) ? "WHERE   			" . implode(" AND ", $whereCondition) : "";
			$order = (count($orderCondition) > 0) ? "ORDER BY   			" . implode(", ", $orderCondition) : "";
			
			$selectQuery = "
                $baseSQL
                $where
                $order
                $limit;";
			// ----
			
			try {
				return Model::$db->rawQuery($selectQuery);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
			// ----
		}
		
		public static function getOne(int $id = null): array
		{
			try {
				if (!is_null($id)) {
					Model::$db->where("id", $id);
				}
				
				self::$db->where("enabled", 1);
				
				return self::$db->getOne(self::$dbTable);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
		public static function update(array $city = []): array
		{
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$id = Model::setInt((isset($city["id"])) ? $city["id"] : null);
			$country_id = Model::setInt((isset($city["country_id"])) ? $city["country_id"] : null);
			$province_id = Model::setInt((isset($city["province_id"])) ? $city["province_id"] : null);
			$sort_order = Model::setInt((isset($city["sort_order"])) ? $city["sort_order"] : 9999999);
			$name = Model::setString((isset($city["name"])) ? $city["name"] : null);
			$note = Model::setLongText((isset($city["note"])) ? $city["note"] : null);
			$enabled = Model::setBool((isset($city["enabled"])) ? $city["enabled"] : null);
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			$sql = "
                INSERT INTO city (
                    id, country_id, province_id, sort_order, name,
                    enabled, date_created, created_by,
                    date_modified, modified_by, note
                ) VALUES (
                    $id, $country_id, $province_id, $sort_order, $name,
                    $enabled, DEFAULT,
                    $created_by, DEFAULT, $modified_by, $note
                )
                ON DUPLICATE KEY UPDATE
                    sort_order = VALUES(sort_order),
                    name = VALUES(name),
                    note = VALUES(note),
                    modified_by = VALUES(modified_by),
                    date_modified = VALUES(date_modified),
                    enabled = VALUES(enabled);";
			
			try {
				Model::$db->rawQuery($sql);
				$id = Model::$db->getInsertId();
				
				return self::get($country_id, $province_id, $id);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
		public static function fetchCitiesByCountryId(int $countryId = null): array
		{
			if (!is_null($countryId)) {
				$sql = self::$selectQuery . "
                    WHERE		    CITY.enabled = 1
                        AND         CITY.country_id = $countryId
                    ORDER BY	    CONCAT( CITY.name, ' (',  PROVINCE.name, ', ', COUNTRY.name, ')')
                    LIMIT 20;";
				
				try {
					
					return Model::$db->rawQuery($sql);
				} catch (Exception $e) {
					Log::$debug_log->error($e->getMessage());
					
					return [];
				}
			}
			
			return [];
		}
		
	}
