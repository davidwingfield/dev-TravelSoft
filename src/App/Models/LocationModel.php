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
	class LocationModel extends Model
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
		protected static $sql = "
			SELECT      CONCAT(	LOCATION.name, ' ',	'(' ,CITY.name,	', ',	PROVINCE.name,')') AS 'location',
                        CONCAT(LOCATION.name, ' ',	'(' ,CITY.name, ' ', CONCAT(PROVINCE.iso2, ' - ', PROVINCE.name), ', ', CONCAT(COUNTRY.iso2, ' - ', COUNTRY.name),')') AS 'location_long',
                        CONCAT(LOCATION.name, ' ',	'(' ,CITY.name, ' ', PROVINCE.iso2, ', ', COUNTRY.iso2,')') AS 'location_short',
                        LOCATION.id AS 'location_id',
                        LOCATION.name AS 'location_name',
                        LOCATION.location_types_id AS 'location_location_types_id',
                        LOCATION.street_1 AS 'location_street_1',
                        LOCATION.street_2 AS 'location_street_2',
                        LOCATION.city_id AS 'location_city_id',
                        LOCATION.zipcode AS 'location_zipcode',
                        LOCATION.date_created AS 'location_date_created',
                        LOCATION.created_by AS 'location_created_by',
                        LOCATION.date_modified AS 'location_date_modified',
                        LOCATION.modified_by AS 'location_modified_by',
                        LOCATION.enabled AS 'location_enabled',
                        LOCATION.note AS 'location_note',
                        LOCATION_TYPES.id AS 'location_types_id',
                        LOCATION_TYPES.name AS 'location_types_name',
                        LOCATION_TYPES.icon AS 'location_types_icon',
                        LOCATION_TYPES.sort_order AS 'location_types_sort_order',
                        LOCATION_TYPES.date_created AS 'location_types_date_created',
                        LOCATION_TYPES.created_by AS 'location_types_created_by',
                        LOCATION_TYPES.date_modified AS 'location_types_date_modified',
                        LOCATION_TYPES.modified_by AS 'location_types_modified_by',
                        LOCATION_TYPES.enabled AS 'location_types_enabled',
                        LOCATION_TYPES.note AS 'location_types_note',
                        CITY.id AS 'city_id',
                        CITY.sort_order AS 'city_sort_order',
                        CITY.province_id AS 'city_province_id',
                        CITY.name AS 'city_name',
                        CITY.note AS 'city_note',
                        CITY.enabled AS 'city_enabled',
                        CITY.date_created AS 'city_date_created',
                        CITY.created_by AS 'city_created_by',
                        CITY.date_modified AS 'city_date_modified',
                        CITY.modified_by AS 'city_modified_by',
                        PROVINCE.id AS 'province_id',
                        PROVINCE.name AS 'province_name',
                        CONCAT(PROVINCE.iso2, ' - ', PROVINCE.name) AS 'province_name_long',
                        PROVINCE.sort_order AS 'province_sort_order',
                        PROVINCE.iso2 AS 'province_iso2',
                        PROVINCE.iso3 AS 'province_iso3',
                        PROVINCE.note AS 'province_note',
                        PROVINCE.enabled AS 'province_enabled',
                        PROVINCE.date_created AS 'province_date_created',
                        PROVINCE.created_by AS 'province_created_by',
                        PROVINCE.date_modified AS 'province_date_modified',
                        PROVINCE.modified_by AS 'province_modified_by',
                        COUNTRY.id AS 'country_id',
                        COUNTRY.name AS 'country_name',
                        CONCAT(COUNTRY.iso2, ' - ', COUNTRY.name) AS 'country_name_long',
                        COUNTRY.sort_order AS 'country_sort_order',
                        COUNTRY.iso2 AS 'country_iso2',
                        COUNTRY.iso3 AS 'country_iso3',
                        COUNTRY.currency_id AS 'country_currency_id',
                        COUNTRY.note AS 'country_note',
                        COUNTRY.enabled AS 'country_enabled',
                        COUNTRY.date_created AS 'country_date_created',
                        COUNTRY.created_by AS 'country_created_by',
                        COUNTRY.date_modified AS 'country_date_modified',
                        COUNTRY.modified_by AS 'country_modified_by',
                        BIN(CONCAT(LOCATION.name, ' ',	'(' ,CITY.name, ' ', PROVINCE.iso2, ', ', COUNTRY.iso2,')')) AS binray_not_needed_column_location_short,
                        BIN(CONCAT(	LOCATION.name, ' ',	'(' ,CITY.name,	', ',	PROVINCE.name,')')) AS binray_not_needed_column_location,
                        BIN(CONCAT(LOCATION.name, ' ',	'(' ,CITY.name, ' ', CONCAT(PROVINCE.iso2, ' - ', PROVINCE.name), ', ', CONCAT(COUNTRY.iso2, ' - ', COUNTRY.name),')')) AS binray_not_needed_column_location_long
            FROM 		location LOCATION
            JOIN	    location_types LOCATION_TYPES ON LOCATION_TYPES.id = LOCATION.location_types_id
            JOIN		city CITY ON CITY.id = LOCATION.city_id
            JOIN		province PROVINCE ON PROVINCE.id = CITY.province_id
            JOIN		country COUNTRY ON COUNTRY.id = PROVINCE.country_id";
		
		/**
		 * get location by name
		 *
		 * @param string   $name
		 * @param int|null $city_id
		 * @param string   $default_display
		 *
		 * @return array
		 */
		public static function getByName(string $name, int $city_id = null, string $default_display = "medium"): array
		{
			if (is_null($name) || is_null($city_id)) {
				return [];
			}
			
			$searchTerm = addslashes($name);
			
			if ($default_display === "short") {
				$displayWhere = "CONCAT(	LOCATION.name, ' ',	'(' , CITY.name, ' ', PROVINCE.iso2, ', ', COUNTRY.iso2, ')') = '$searchTerm'";
			} else {
				if ($default_display === "long") {
					$displayWhere = "CONCAT(	LOCATION.name, ' ',	'(' , CITY.name, ' ', CONCAT(PROVINCE.iso2, ' - ', PROVINCE.name), ', ', CONCAT(COUNTRY.iso2, ' - ', COUNTRY.name), ')') = '$searchTerm'";
				} else {
					$displayWhere = "CONCAT(	LOCATION.name,	' ',	'(' ,CITY.name,	', ',	PROVINCE.name,')') = '$searchTerm'";
				}
			}
			
			$where = "
                    WHERE		LOCATION.name = '$searchTerm' AND LOCATION.city_id = $city_id";
			
			$sql = self::$sql . "
                    $where;
                ";
			
			try {
				
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Controller::$debug_log->error($e);
				
				return [];
			}
			
		}
		
		/**
		 * @param string $st
		 * @param string $default_display
		 *
		 * @return array
		 */
		public static function location_ac(string $st = "", string $default_display = "medium"): array
		{
			$searchTerm = addslashes($st);
			$orderBy = "";
			
			$where = "
            WHERE		CITY.enabled = 1
                 AND		NOT ISNULL(CITY.name)
                 AND		NOT ISNULL(PROVINCE.name)
                 AND		NOT ISNULL(COUNTRY.name)";
			
			if ($default_display === "short") {
				$orderBy = "ORDER BY            CONCAT(	LOCATION.name, ' ',	'(' , CITY.name, ' ', PROVINCE.iso2, ', ', COUNTRY.iso2, ')') ASC";
				$where .= "         AND 		CONCAT(	LOCATION.name, ' ',	'(' , CITY.name, ' ', PROVINCE.iso2, ', ', COUNTRY.iso2, ')') LIKE '%$searchTerm%'";
			} else {
				if ($default_display === "long") {
					$orderBy = "ORDER BY           CONCAT(	LOCATION.name, ' ',	'(' , CITY.name, ' ', CONCAT(PROVINCE.iso2, ' - ', PROVINCE.name), ', ', CONCAT(COUNTRY.iso2, ' - ', COUNTRY.name), ')') ASC";
					$where .= "         AND 		CONCAT(	LOCATION.name, ' ',	'(' , CITY.name, ' ', CONCAT(PROVINCE.iso2, ' - ', PROVINCE.name), ', ', CONCAT(COUNTRY.iso2, ' - ', COUNTRY.name), ')') LIKE '%$searchTerm%'";
				} else {
					$orderBy = "ORDER BY           LENGTH(CONCAT(	LOCATION.name,	' ',	'(' ,CITY.name,	', ',	PROVINCE.name,')')), CAST(CONCAT(	LOCATION.name,	' ',	'(' ,CITY.name,	', ',	PROVINCE.name,')') AS UNSIGNED), CONCAT(	LOCATION.name,	' ',	'(' ,CITY.name,	', ',	PROVINCE.name,')') ASC";
					$where .= "         AND 		CONCAT(	LOCATION.name,	' ',	'(' ,CITY.name,	', ',	PROVINCE.name,')') LIKE '%$searchTerm%'";
				}
			}
			
			$sql = self::$sql . "
            $where
            $orderBy
            LIMIT 20;";
			
			try {
				$results["dataset"] = Model::$db->ObjectBuilder()->rawQuery($sql);
				
				return $results["dataset"];
			} catch (Exception $e) {
				Controller::$debug_log->error($e);
				
				return [];
			}
			
		}
		
		/**
		 * @param string $st
		 * @param string $default_display
		 *
		 * @return array
		 */
		public static function location_search_ac(string $st = "", string $default_display = "medium"): array
		{
			$searchTerm = addslashes($st);
			
			$sql = "
				(
					SELECT
				        CONCAT( CITY.name, ' (',  PROVINCE.name, ', ', COUNTRY.name, ')') AS 'location',
						CITY.id AS 'city_id',
						CITY.province_id AS 'city_province_id',
						CITY.country_id AS 'city_country_id',
						CITY.sort_order AS 'city_sort_order',
						CITY.name AS 'city_name',
						CITY.blurb AS 'city_blurb',
						CITY.is_capital AS 'city_is_capital',
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
				FROM 	city CITY
				JOIN 	province PROVINCE ON PROVINCE.id = CITY.province_id
				JOIN 	country COUNTRY ON COUNTRY.id = CITY.country_id
				WHERE   CONCAT( CITY.name, ' (',  PROVINCE.name, ', ', COUNTRY.name, ')') LIKE '%$searchTerm%'
				LIMIT 10
			) UNION (
				SELECT
				        CONCAT( PROVINCE.name, ', ', COUNTRY.name) AS 'location',
						null AS 'city_id',
						null AS 'city_province_id',
						null AS 'city_country_id',
						null AS 'city_sort_order',
						null AS 'city_name',
						null AS 'city_blurb',
						null AS 'city_is_capital',
						null AS 'city_enabled',
						null AS 'city_date_created',
						null AS 'city_created_by',
						null AS 'city_date_modified',
						null AS 'city_modified_by',
						null AS 'city_note',
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
				FROM 	province PROVINCE
				JOIN 	country COUNTRY ON COUNTRY.id = PROVINCE.country_id
				WHERE   CONCAT( PROVINCE.name, ', ', COUNTRY.name) LIKE '%$searchTerm%'
				LIMIT 10
			) UNION (
				SELECT
			        CONCAT( COUNTRY.name, ', ', COUNTRY.iso3) AS 'location',
					null AS 'city_id',
					null AS 'city_province_id',
					null AS 'city_country_id',
					null AS 'city_sort_order',
					null AS 'city_name',
					null AS 'city_blurb',
					null AS 'city_is_capital',
					null AS 'city_enabled',
					null AS 'city_date_created',
					null AS 'city_created_by',
					null AS 'city_date_modified',
					null AS 'city_modified_by',
					null AS 'city_note',
			        null AS 'province_id',
					null AS 'province_country_id',
					null AS 'province_name',
					null AS 'province_iso2',
					null AS 'province_iso3',
					null AS 'province_sort_order',
					null AS 'province_blurb',
					null AS 'province_enabled',
					null AS 'province_date_created',
					null AS 'province_created_by',
					null AS 'province_date_modified',
					null AS 'province_modified_by',
					null AS 'province_note',
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
			FROM 	country COUNTRY
			WHERE   CONCAT( COUNTRY.name, ', ', COUNTRY.iso3) LIKE '%$searchTerm%'
			LIMIT 10
		);";
			
			try {
				return Model::$db->ObjectBuilder()->rawQuery($sql);
				
			} catch (Exception $e) {
				Controller::$debug_log->error($e);
				
				return [];
			}
			
		}
		
		/**
		 * @param int|null $id
		 * @param string   $default_display
		 *
		 * @return array
		 */
		public static function get(int $id = null, string $default_display = "medium"): array
		{
			$orderBy = "";
			$where = "
            WHERE		CITY.enabled = 1
                 AND		NOT ISNULL(CITY.name)
                 AND		NOT ISNULL(PROVINCE.name)
                 AND		NOT ISNULL(COUNTRY.name)";
			try {
				if (!is_null($id)) {
					$where .= "
                             AND 		LOCATION.id = $id";
				}
				
				if ($default_display === "short") {
					$orderBy = "ORDER BY    LENGTH(CONCAT(	LOCATION.name, ' ',	'(' , CITY.name, ' ', PROVINCE.iso2, ', ', COUNTRY.iso2, ')')), CAST(CONCAT(	LOCATION.name, ' ',	'(' , CITY.name, ' ', PROVINCE.iso2, ', ', COUNTRY.iso2, ')') AS UNSIGNED), CONCAT(	LOCATION.name, ' ',	'(' , CITY.name, ' ', PROVINCE.iso2, ', ', COUNTRY.iso2, ')') ASC";
				} else {
					if ($default_display === "long") {
						$orderBy = " ORDER BY    LENGTH(CONCAT(	LOCATION.name, ' ',	'(' , CITY.name, ' ', CONCAT(PROVINCE.iso2, ' - ', PROVINCE.name), ', ', CONCAT(COUNTRY.iso2, ' - ', COUNTRY.name), ')')), CAST(CONCAT(	LOCATION.name, ' ',	'(' , CITY.name, ' ', CONCAT(PROVINCE.iso2, ' - ', PROVINCE.name), ', ', CONCAT(COUNTRY.iso2, ' - ', COUNTRY.name), ')') AS UNSIGNED), CONCAT(	LOCATION.name, ' ',	'(' , CITY.name, ' ', CONCAT(PROVINCE.iso2, ' - ', PROVINCE.name), ', ', CONCAT(COUNTRY.iso2, ' - ', COUNTRY.name), ')') ASC";
					} else {
						$orderBy = "ORDER BY           LENGTH(CONCAT(	LOCATION.name,	' ',	'(' ,CITY.name,	', ',	PROVINCE.name,')')), CAST(CONCAT(	LOCATION.name,	' ',	'(' ,CITY.name,	', ',	PROVINCE.name,')') AS UNSIGNED), CONCAT(	LOCATION.name,	' ',	'(' ,CITY.name,	', ',	PROVINCE.name,')') ASC";
					}
				}
				$sql = self::$sql . "
            $where
            $orderBy;";
				
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				return [];
			}
		}
		
		/**
		 * @param int|null $id
		 * @param string   $default_display
		 *
		 * @return array
		 */
		public static function fetchLocationByCityIdAndName(int $city_id = null, string $name = null): array
		{
			
			$where = "
            WHERE		CITY.enabled = 1
                 AND		NOT ISNULL(CITY.name)
                 AND		NOT ISNULL(PROVINCE.name)
                 AND		NOT ISNULL(COUNTRY.name)";
			try {
				if (!is_null($city_id)) {
					$where .= "
                             AND 		LOCATION.city_id = $city_id
                             AND 		LOCATION.name = '$name'
                     ";
				}
				
				$sql = self::$sql . "
                    $where;
                ";
				
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				return [];
			}
		}
		
		public static function fetchLocationByCountryIdAndName(int $country_id = null, string $name = null): array
		{
			
			$where = "
            WHERE		COUNTRY.enabled = 1
                 AND		NOT ISNULL(COUNTRY.name)
                 AND		NOT ISNULL(COUNTRY.name)";
			try {
				if (!is_null($country_id)) {
					$where .= "
                             AND 		LOCATION.country_id = $country_id
                             AND 		LOCATION.name = '$name'
                     ";
				}
				
				$sql = self::$sql . "
                    $where;
                ";
				
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				return [];
			}
		}
		
		/**
		 * @param int|null $id
		 *
		 * @return array
		 */
		public static function getOne(int $id = null): array
		{
			try {
				if (!is_null($id)) {
					Model::$db->where("id", $id);
				}
				
				self::$db->where("enabled", 1);
				
				return self::$db->getOne(self::$dbTable);
			} catch (Exception $e) {
				return [];
			}
		}
		
		/**
		 * @param array $location
		 *
		 * @return array
		 */
		public static function update(array $location = []): array
		{
			//Log::$debug_log->trace("LocationModel::update");
			//Log::$debug_log->info($location);
			
			$category_id = Model::setInt((isset($location["category_id"])) ? $location["category_id"] : null);
			//Log::$debug_log->trace($category_id);
			
			if ((int)$category_id === 3) {
				if (!isset($location["country_id"]) || is_null($location["country_id"])) {
					return [];
				}
			} else {
				if (!isset($location["city_id"]) || is_null($location["city_id"])) {
					return [];
				}
			}
			
			if (!isset($location["name"]) || is_null($location["name"])) {
				return [];
			}
			
			$product_id = Model::setInt((isset($location["product_id"])) ? $location["product_id"] : null);
			
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$id = Model::setInt((isset($location["id"])) ? $location["id"] : null);
			$street_1 = Model::setString((isset($location["street_1"])) ? $location["street_1"] : null);
			$street_2 = Model::setString((isset($location["street_2"])) ? $location["street_2"] : null);
			$zipcode = Model::setString((isset($location["zipcode"])) ? $location["zipcode"] : null);
			$name = Model::setString((isset($location["name"])) ? $location["name"] : null);
			$location_types_id = Model::setInt((isset($location["location_types_id"])) ? $location["location_types_id"] : 1);
			
			$country_id = Model::setInt((isset($location["country_id"])) ? $location["country_id"] : null);
			$province_id = Model::setInt((isset($location["province_id"])) ? $location["province_id"] : null);
			$city_id = Model::setInt((isset($location["city_id"])) ? $location["city_id"] : null);
			
			$enabled = Model::setBool((isset($location["enabled"])) ? $location["enabled"] : 1);
			$note = Model::setLongText((isset($location["note"])) ? $location["note"] : null);
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			$sql = "
                INSERT INTO location (
                    id, city_id, location_types_id, name,
                    street_1, street_2, zipcode, enabled,
                    date_created, created_by, date_modified, modified_by,
                    note, country_id, province_id
                ) VALUES (
                    $id, $city_id, $location_types_id, $name,
                    $street_1, $street_2, $zipcode, $enabled,
                    CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP, $modified_by,
                    $note, $country_id, $province_id
                )
                ON DUPLICATE KEY UPDATE
                    country_id = VALUES(country_id),
                    province_id = VALUES(province_id),
                    city_id = VALUES(city_id),
                    location_types_id = VALUES(location_types_id),
                    name = VALUES(name),
                    street_1 = VALUES(street_1),
                    street_2 = VALUES(street_2),
                    zipcode = VALUES(zipcode),
                    enabled = VALUES(enabled),
                    modified_by = VALUES(modified_by),
                    date_modified = VALUES(date_modified);
                ";
			
			//Log::$debug_log->trace($sql);
			
			try {
				Model::$db->rawQuery($sql);
				$location_id = Model::$db->getInsertId();
				
				//Log::$debug_log->trace("location id: $location_id");
				
				if ($location_id) {
					
					if ($product_id) {
						
						if ($category_id !== 3) {
							$updateProductSQL = "
							UPDATE 			product
							SET 			city_id = $city_id,
											location_id = $location_id,
											use_provider_location_id = 0,
											street_1 = $street_1,
											street_2 = $street_2,
											postal_code = $zipcode
							WHERE 			id = $product_id;
						";
						} else {
							$updateProductSQL = "
							UPDATE 			product
							SET 			city_id = $country_id,
											location_id = $location_id,
											use_provider_location_id = 0,
											street_1 = $street_1,
											street_2 = $street_2,
											postal_code = $zipcode
							WHERE 			id = $product_id;
						";
						}
						
						if ($category_id === 1 || $category_id === 2 || $category_id === 4) {
							try {
								Model::$db->rawQuery($updateProductSQL);
							} catch (Exception $e) {
								Log::$debug_log->error($e);
								
								return [];
							}
						}
					}
					
					return self::get($location_id);
				}
				
				return [];
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
	}
