<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short AirportModel Description
	 * Long AirportModel Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class AirportModel extends Model
	{
		protected static $dbTable = "airport";
		protected static $dbFields = Array();
		protected static $selectQuery = "
                SELECT
						AIRPORT.id AS 'airport_id',
						CONCAT(AIRPORT.name, ' (', CITY.name, ', ', COUNTRY.iso3, ')') AS 'display_short',
						CONCAT(AIRPORT.name, ' (', CITY.name, ', ', PROVINCE.iso2, ', ', COUNTRY.iso3, ')') AS 'display_medium',
						CONCAT(AIRPORT.name, ' (', CITY.name, ', ', PROVINCE.name, ', ', COUNTRY.name, ')') AS 'display_long',
						AIRPORT.name AS 'airport_name',
						AIRPORT.iata_code AS 'airport_iata_code',
						AIRPORT.gps_code AS 'airport_gps_code',
						AIRPORT.local_code AS 'airport_local_code',
						AIRPORT.home_link AS 'airport_home_link',
						AIRPORT.wikipedia_link AS 'airport_wikipedia_link',
						AIRPORT.scheduled_service AS 'airport_scheduled_service',
						AIRPORT.keywords AS 'airport_keywords',
						AIRPORT.enabled AS 'airport_enabled',
						AIRPORT.date_created AS 'airport_date_created',
						AIRPORT.created_by AS 'airport_created_by',
						AIRPORT.date_modified AS 'airport_date_modified',
						AIRPORT.modified_by AS 'airport_modified_by',
						AIRPORT.note AS 'airport_note',
						AIRPORT_TYPES.id AS 'airport_types_id',
						AIRPORT_TYPES.name AS 'airport_types_name',
						AIRPORT_TYPES.sort_order AS 'airport_types_sort_order',
						AIRPORT_TYPES.enabled AS 'airport_types_enabled',
						AIRPORT_TYPES.date_created AS 'airport_types_date_created',
						AIRPORT_TYPES.created_by AS 'airport_types_created_by',
						AIRPORT_TYPES.date_modified AS 'airport_types_date_modified',
						AIRPORT_TYPES.modified_by AS 'airport_types_modified_by',
						AIRPORT_TYPES.note AS 'airport_types_note',
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
				FROM 	airport AIRPORT
				JOIN 	airport_types AIRPORT_TYPES ON AIRPORT_TYPES.id = AIRPORT.airport_types_id
				JOIN 	city CITY ON CITY.id = AIRPORT.city_id
				JOIN 	province PROVINCE ON PROVINCE.id = CITY.province_id
				JOIN 	country COUNTRY ON COUNTRY.id = PROVINCE.country_id
				WHERE   AIRPORT.enabled = 1
        ";
		
		public static function getByName(string $name = null): array
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
                    AND			AIRPORT.name = '$searchTerm'
                    
                    ORDER BY    LENGTH(AIRPORT.name), CAST(AIRPORT.name AS UNSIGNED), AIRPORT.name ASC
                    LIMIT 20;";
			
			try {
				
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function fetchByAirportId(int $id = null): array
		{
			if (is_null($id)) {
				Log::$debug_log->error("No Airport Id");
				
				return [];
			}
			
			$sql = self::$selectQuery . "
                    AND			AIRPORT.id = $id
                    ";
			try {
				Log::$debug_log->trace($sql);
				
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function airport_ac(string $st = ""): array
		{
			
			try {
				$searchTerm = addslashes($st);
				
				$searchDisplayShort = "CONCAT(AIRPORT.name, ' (', CITY.name, ', ', COUNTRY.iso3, ')')";
				$searchDisplayMedium = "CONCAT(AIRPORT.name, ' (', CITY.name, ', ', PROVINCE.iso2, ', ', COUNTRY.iso3, ')')";
				$searchDisplayLong = "CONCAT(AIRPORT.name, ' (', CITY.name, ', ', PROVINCE.name, ', ', COUNTRY.name, ')')";
				
				$and = "AIRPORT.name";
				
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
					$order = "LENGTH(AIRPORT.name), CAST(AIRPORT.name AS UNSIGNED), AIRPORT.name ASC";
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
		
		public static function updateAirportRecord(array $airport = null): array
		{
			if (is_null($airport)) {
				return [];
			}
			
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			$id = Model::setInt((isset($airport["id"])) ? $airport["id"] : null);
			$airport_types_id = Model::setInt((isset($airport["airport_types_id"])) ? $airport["airport_types_id"] : 1);
			$city_id = Model::setInt((isset($airport["city_id"])) ? $airport["city_id"] : null);
			$name = Model::setString((isset($airport["name"])) ? $airport["name"] : null);
			$iata_code = Model::setString((isset($airport["iata_code"])) ? $airport["iata_code"] : null);
			$gps_code = Model::setString((isset($airport["gps_code"])) ? $airport["gps_code"] : null);
			$local_code = Model::setString((isset($airport["local_code"])) ? $airport["local_code"] : null);
			$home_link = Model::setString((isset($airport["home_link"])) ? $airport["home_link"] : null);
			$wikipedia_link = Model::setString((isset($airport["wikipedia_link"])) ? $airport["wikipedia_link"] : null);
			$scheduled_service = Model::setInt((isset($airport["scheduled_service"])) ? $airport["scheduled_service"] : 1);
			$enabled = Model::setBool((isset($airport["enabled"])) ? $airport["enabled"] : 1);
			$keywords = Model::setLongText((isset($airport["keywords"])) ? $airport["keywords"] : null);
			$note = Model::setLongText((isset($airport["note"])) ? $airport["note"] : null);
			
			try {
				
				$sql = "
                    INSERT INTO airport (
						id, airport_types_id, city_id, name, iata_code,
						gps_code, local_code, home_link, wikipedia_link, scheduled_service,
						keywords, enabled, date_created, created_by, date_modified,
						modified_by, note
					) VALUES (
						$id, $airport_types_id, $city_id, $name, $iata_code,
						$gps_code, $local_code, $home_link, $wikipedia_link, $scheduled_service,
						$keywords, $enabled, CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP,
						$modified_by, $note
					)
					ON DUPLICATE KEY UPDATE
						airport_types_id = VALUES(airport_types_id),
					    city_id = VALUES(city_id),
						name = VALUES(name),
					    iata_code = VALUES(iata_code),
						gps_code = VALUES(gps_code),
						local_code = VALUES(local_code),
						home_link = VALUES(home_link),
						wikipedia_link = VALUES(wikipedia_link),
						scheduled_service = VALUES(scheduled_service),
					    keywords = VALUES(keywords),
						note = VALUES(note),
						modified_by = VALUES(modified_by),
						date_modified = VALUES(date_modified),
						enabled = VALUES(enabled)
                ";
				Log::$debug_log->trace($sql);
				Model::$db->rawQuery($sql);
				
				$airport_id = Model::$db->getInsertId();
				Log::$debug_log->trace($airport_id);
				
				return self::fetchByAirportId($airport_id);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
	}
