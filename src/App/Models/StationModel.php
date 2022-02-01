<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short StationModel Description
	 * Long StationModel Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class StationModel extends Model
	{
		protected static $dbTable = "station";
		protected static $dbFields = Array();
		protected static $selectQuery = "
            SELECT
					STATION.id AS 'station_id',
					CONCAT(STATION.name, ' (', CITY.name, ', ', COUNTRY.iso3, ')') AS 'display_short',
					CONCAT(STATION.name, ' (', CITY.name, ', ', PROVINCE.iso2, ', ', COUNTRY.iso3, ')') AS 'display_medium',
					CONCAT(STATION.name, ' (', CITY.name, ', ', PROVINCE.name, ', ', COUNTRY.name, ')') AS 'display_long',
					STATION.id AS 'station_id',
					STATION.name AS 'station_name',
					STATION.iata_code AS 'station_iata_code',
					STATION.city_id AS 'station_city_id',
					STATION.keywords AS 'station_keywords',
					STATION.enabled AS 'station_enabled',
					STATION.date_created AS 'station_date_created',
					STATION.created_by AS 'station_created_by',
					STATION.date_modified AS 'station_date_modified',
					STATION.modified_by AS 'station_modified_by',
					STATION.note AS 'station_note',
					CITY.id AS 'city_id',
					CITY.province_id AS 'city_province_id',
					CITY.country_id AS 'city_country_id',
					CITY.sort_order AS 'city_sort_order',
					CITY.name AS 'city_name',
					CITY.blurb AS 'city_blurb',
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
					PROVINCE.blurb AS 'province_blurb',
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
					COUNTRY.blurb AS 'country_blurb',
					COUNTRY.enabled AS 'country_enabled',
					COUNTRY.date_created AS 'country_date_created',
					COUNTRY.created_by AS 'country_created_by',
					COUNTRY.date_modified AS 'country_date_modified',
					COUNTRY.modified_by AS 'country_modified_by',
					COUNTRY.note AS 'country_note'
			FROM 	station STATION
			JOIN 	city CITY ON CITY.id = STATION.city_id
			JOIN 	province PROVINCE ON PROVINCE.id = CITY.province_id
			JOIN 	country COUNTRY ON COUNTRY.id = PROVINCE.country_id
			WHERE   STATION.enabled = 1
        ";
		
		public static function fetchStationByStationName(string $name = null): array
		{
			$errors = [];
			
			if (is_null($name)) {
				Log::$debug_log->error("Missing Name");
				$errors[] = array(
					"msg" => "Missing Name",
				);
			}
			
			if (count($errors) > 0) {
				return array("errors" => $errors);
			}
			
			$searchTerm = addslashes($name);
			
			$sql = self::$selectQuery . "
                    AND			STATION.name = '$searchTerm'
                    
                    ORDER BY    LENGTH(STATION.name), CAST(STATION.name AS UNSIGNED), STATION.name ASC
                    LIMIT 20;";
			try {
				
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function fetchStationByStationId(int $id = null): array
		{
			$errors = [];
			
			if (is_null($id)) {
				$errors[] = array(
					"msg" => "Missing Id",
				);
			}
			
			if (count($errors) > 0) {
				Log::$debug_log->error(array("errors" => $errors));
				
				return array();
			}
			
			$sql = self::$selectQuery . "
                    AND			STATION.id = $id
                    ";
			try {
				
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function fetchAutocomplete(string $st = ""): array
		{
			
			try {
				$searchTerm = addslashes($st);
				
				$searchDisplayShort = "CONCAT(STATION.name, ' (', CITY.name, ', ', COUNTRY.iso3, ')')";
				$searchDisplayMedium = "CONCAT(STATION.name, ' (', CITY.name, ', ', PROVINCE.iso2, ', ', COUNTRY.iso3, ')')";
				$searchDisplayLong = "CONCAT(STATION.name, ' (', CITY.name, ', ', PROVINCE.name, ', ', COUNTRY.name, ')')";
				
				$and = "STATION.name";
				
				if (LOCATIONDISPLAY === "short") {
					$order = "LENGTH($searchDisplayShort), CAST($searchDisplayShort AS UNSIGNED), $searchDisplayShort ASC";
					$and = $searchDisplayShort;
				} else if (LOCATIONDISPLAY === "medium") {
					$order = "LENGTH($searchDisplayMedium), CAST($searchDisplayMedium AS UNSIGNED), $searchDisplayMedium ASC";
					$and = $searchDisplayMedium;
				} else if (LOCATIONDISPLAY === "long") {
					$order = "LENGTH($searchDisplayLong), CAST($searchDisplayLong AS UNSIGNED), $searchDisplayLong ASC";
					$and = $searchDisplayLong;
				} else {
					$order = "LENGTH(STATION.name), CAST(STATION.name AS UNSIGNED), STATION.name ASC";
				}
				
				$sql = self::$selectQuery . "
                    AND			$and LIKE '%$searchTerm%'
                    
                    ORDER BY    $order
                    LIMIT 20;";
				
				$dataSet = Model::$db->rawQuery($sql);
				
				return $dataSet;
				
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function updateStationRecord(array $station = null): array
		{
			if (is_null($station)) {
				return [];
			}
			
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			$id = Model::setInt((isset($station["id"])) ? $station["id"] : null);
			$city_id = Model::setInt((isset($station["city_id"])) ? $station["city_id"] : null);
			$name = Model::setString((isset($station["name"])) ? $station["name"] : null);
			$iata_code = Model::setString((isset($station["iata_code"])) ? $station["iata_code"] : null);
			$enabled = Model::setBool((isset($station["enabled"])) ? $station["enabled"] : 1);
			$keywords = Model::setLongText((isset($station["keywords"])) ? $station["keywords"] : null);
			$note = Model::setLongText((isset($station["note"])) ? $station["note"] : null);
			
			try {
				
				$sql = "
                    INSERT INTO station (
						id, name, iata_code, city_id, enabled, keywords,
						date_created, created_by, date_modified, modified_by, note
					) VALUES (
						$id, $name, $iata_code, $city_id, $enabled, $keywords,
						CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP, $modified_by, $note
					)
					ON DUPLICATE KEY UPDATE
						city_id = VALUES(city_id),
						name = VALUES(name),
						iata_code = VALUES(iata_code),
						note = VALUES(note),
						modified_by = VALUES(modified_by),
						date_modified = VALUES(date_modified),
						enabled = VALUES(enabled)
                ";
				
				Model::$db->rawQuery($sql);
				
				$station_id = Model::$db->getInsertId();
				
				return self::fetchStationByStationId($station_id);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
	}
