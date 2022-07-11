<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\App\Controllers\Location;
	use Framework\App\Controllers\Product;
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
                   	
                   	STATION.street_1 AS 'station_street_1',
                   	STATION.street_2 AS 'station_street_2',
                   	STATION.postal_code AS 'station_postal_code',
                   	STATION.local_code AS 'station_local_code',
                   	STATION.wikipedia_link AS 'station_wikipedia_link',
                   	STATION.home_link AS 'station_home_link',
                   	STATION.gps_code AS 'station_gps_code',
                   
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
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
		}
		
		public static function fetchStationByStationId(int $id = null): array
		{
			$errors = [];
			$whereQuery = "";
			
			if (is_null($id)) {
				$whereQuery = "";
			} else {
				$whereQuery = "
                    AND			STATION.id = $id
                ";
			}
			
			if (count($errors) > 0) {
				Log::$debug_log->error(array("errors" => $errors));
				
				return array();
			}
			
			$sql = self::$selectQuery . $whereQuery;
			try {
				
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
		}
		
		public static function fetchAutocomplete(string $st = ""): array
		{
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
			
			try {
				
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
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
			$street_1 = Model::setString((isset($station["street_1"])) ? $station["street_1"] : null);
			$street_2 = Model::setString((isset($station["street_2"])) ? $station["street_2"] : null);
			$postal_code = Model::setString((isset($station["postal_code"])) ? $station["postal_code"] : null);
			$iata_code = Model::setString((isset($station["iata_code"])) ? $station["iata_code"] : null);
			$enabled = Model::setBool((isset($station["enabled"])) ? $station["enabled"] : 1);
			$local_code = Model::setString((isset($station["local_code"])) ? $station["local_code"] : null);
			$home_link = Model::setString((isset($station["home_link"])) ? $station["home_link"] : null);
			$gps_code = Model::setString((isset($station["gps_code"])) ? $station["gps_code"] : null);
			$wikipedia_link = Model::setString((isset($station["wikipedia_link"])) ? $station["wikipedia_link"] : null);
			$note = Model::setLongText((isset($station["note"])) ? $station["note"] : null);
			$location = Location::get($name, $city_id);
			
			if (!$location) {
				$stationName = (isset($station["name"])) ? $station["name"] : null;
				$stationCityId = (isset($station["city_id"])) ? (int)$station["city_id"] : null;
				$stationStreet1 = (isset($station["street_1"])) ? $station["street_1"] : null;
				$stationStreet2 = (isset($station["street_2"])) ? $station["street_2"] : null;
				$stationPostalCode = (isset($station["postal_code"])) ? $station["postal_code"] : null;
				$locationTypesId = Product::getLocationType(4);
				
				$location = Location::update(array(
					"category_id" => 4,
					"name" => $stationName,
					"city_id" => $stationCityId,
					"location_types_id" => $locationTypesId,
					"street_1" => $stationStreet1,
					"street_2" => $stationStreet2,
					"zipcode" => $stationPostalCode,
					"enabled" => 1,
				));
				
				if (isset($location[0])) {
					$location = $location[0];
				}
			}
			
			$keywordList = explode(",", (isset($station["keywords"])) ? $station["keywords"] : "");
			
			$keywordValues = buildKeywordsList($name, $location, $keywordList);
			
			/*
			Log::$debug_log->trace($keywords);
			Log::$debug_log->trace($station["keywords"]);
			Log::$debug_log->trace($keywordList);
			Log::$debug_log->trace($keywordValues);
			//*/
			
			$sql = "
					INSERT INTO station (
						id, name, iata_code, city_id, enabled, keywords, gps_code, local_code,
						street_1, street_2, postal_code, scheduled_service, home_link, wikipedia_link,
						date_created, created_by, date_modified, modified_by, note
					) VALUES (
						$id, $name, $iata_code, $city_id, $enabled, '$keywordValues', $gps_code, $local_code,
						$street_1, $street_2, $postal_code, 1, $home_link, $wikipedia_link,
						CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP, $modified_by, $note
					)
					ON DUPLICATE KEY UPDATE
					    local_code = VALUES(local_code),
						gps_code = VALUES(gps_code),
						scheduled_service = VALUES(scheduled_service),
					    home_link = VALUES(home_link),
					    wikipedia_link = VALUES(wikipedia_link),
						city_id = VALUES(city_id),
						street_1 = VALUES(street_1),
						street_2 = VALUES(street_2),
					    keywords = VALUES(keywords),
						postal_code = VALUES(postal_code),
						name = VALUES(name),
						iata_code = VALUES(iata_code),
						note = VALUES(note),
						modified_by = VALUES(modified_by),
						date_modified = VALUES(date_modified),
						enabled = VALUES(enabled)
				";
			
			try {
				
				Model::$db->rawQuery($sql);
				
				$station_id = Model::$db->getInsertId();
				
				return self::fetchStationByStationId($station_id);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
		}
		
	}
