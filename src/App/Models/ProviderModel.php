<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\App\Controllers\Provider;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	use PhpParser\Node\Expr\AssignOp\Mod;
	
	/**
	 * ProviderModel
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class ProviderModel extends Model
	{
		/**
		 * @var array[] $data Table Data
		 */
		protected static $data = [
			"id" => array(),
			"company_id" => array(),
			"location_id" => array(),
			"code_direct_id" => array(),
			"provider_vendor" => array(),
			"enabled" => array(),
			"created_by" => array(),
			"date_created" => array(),
			"modified_by" => array(),
			"date_modified" => array(),
			"note" => array(),
			"keywords" => [],
		];
		
		/**
		 * base select query
		 *
		 * @var string
		 */
		protected static $selectQuery = "
            SELECT          PROVIDER.id AS 'provider_id',
                            PROVIDER.company_id AS 'provider_company_id',
                            PROVIDER.location_id AS 'provider_location_id',
                            PROVIDER.code_direct_id AS 'provider_code_direct_id',
                            PROVIDER.provider_vendor AS 'provider_provider_vendor',
                            PROVIDER.enabled AS 'provider_enabled',
                            PROVIDER.date_created AS 'provider_date_created',
                            PROVIDER.created_by AS 'provider_created_by',
                            PROVIDER.date_modified AS 'provider_date_modified',
                            PROVIDER.modified_by AS 'provider_modified_by',
                            PROVIDER.note AS 'provider_note',
                            COMPANY.logo AS 'company_logo',
                            COMPANY.description_short AS 'company_description_short',
                            COMPANY.description_long AS 'company_description_long',
                            COMPANY.keywords AS 'company_keywords',
                            COMPANY.id AS 'company_id',
                            COMPANY.name AS 'company_name',
                            COMPANY.phone_1 AS 'company_phone_1',
                            COMPANY.phone_2 AS 'company_phone_2',
                            COMPANY.fax AS 'company_fax',
                            COMPANY.website AS 'company_website',
                            COMPANY.email AS 'company_email',
                            COMPANY.enabled AS 'company_enabled',
                            COMPANY.created_by AS 'company_created_by',
                            COMPANY.date_created AS 'company_date_created',
                            COMPANY.modified_by AS 'company_modified_by',
                            COMPANY.date_modified AS 'company_date_modified',
                            COMPANY.status_id AS 'company_status_id',
                            COMPANY.note AS 'company_note',
                            COMPANY.cover_image AS 'company_cover_image',
                            CONCAT(	LOCATION.name, ' ',	'(' ,CITY.name,	', ',	PROVINCE.name,')') AS 'location',
                            CONCAT(LOCATION.name, ' ',	'(' ,CITY.name, ' ', CONCAT(PROVINCE.iso2, ' - ', PROVINCE.name), ', ', CONCAT(COUNTRY.iso2, ' - ', COUNTRY.name),')') AS 'location_long',
                            CONCAT(LOCATION.name, ' ',	'(' ,CITY.name, ' ', PROVINCE.iso2, ', ', COUNTRY.iso2,')') AS 'location_short',
                            LOCATION.name AS 'location_name',
                            LOCATION.id AS 'location_id',
                            LOCATION.city_id AS 'location_city_id',
                            LOCATION.location_types_id AS 'location_location_types_id',
                            LOCATION.name AS 'location_name',
                            LOCATION.street_1 AS 'location_street_1',
                            LOCATION.street_2 AS 'location_street_2',
                            LOCATION.zipcode AS 'location_zipcode',
                            LOCATION.enabled AS 'location_enabled',
                            LOCATION.date_created AS 'location_date_created',
                            LOCATION.created_by AS 'location_created_by',
                            LOCATION.date_modified AS 'location_date_modified',
                            LOCATION.modified_by AS 'location_modified_by',
                            LOCATION.note AS 'location_note',
                            LOCATION_TYPES.id AS 'location_types_id',
                            LOCATION_TYPES.name AS 'location_types_name',
                            LOCATION_TYPES.icon AS 'location_types_icon',
                            LOCATION_TYPES.sort_order AS 'location_types_sort_order',
                            LOCATION_TYPES.enabled AS 'location_types_enabled',
                            LOCATION_TYPES.date_created AS 'location_types_date_created',
                            LOCATION_TYPES.created_by AS 'location_types_created_by',
                            LOCATION_TYPES.date_modified AS 'location_types_date_modified',
                            LOCATION_TYPES.modified_by AS 'location_types_modified_by',
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
                            VENDOR_COMPANY.id AS 'vendor_company_id',
                            VENDOR_COMPANY.name AS 'vendor_company_name',
                            VENDOR_COMPANY.phone_1 AS 'vendor_company_phone_1',
                            VENDOR_COMPANY.phone_2 AS 'vendor_company_phone_2',
                            VENDOR_COMPANY.fax AS 'vendor_company_fax',
                            VENDOR_COMPANY.website AS 'vendor_company_website',
                            VENDOR_COMPANY.email AS 'vendor_company_email',
                            VENDOR_COMPANY.enabled AS 'vendor_company_enabled',
                            VENDOR_COMPANY.created_by AS 'vendor_company_created_by',
                            VENDOR_COMPANY.date_created AS 'vendor_company_date_created',
                            VENDOR_COMPANY.modified_by AS 'vendor_company_modified_by',
                            VENDOR_COMPANY.date_modified AS 'vendor_company_date_modified',
                            VENDOR_COMPANY.status_id AS 'vendor_company_status',
                            VENDOR_COMPANY.note AS 'vendor_company_note',
                            VENDOR.id AS 'vendor_id',
                            VENDOR.company_id AS 'vendor_company_id',
                            VENDOR.status_id AS 'vendor_status_id',
                            VENDOR.sku AS 'vendor_sku',
                            VENDOR.show_online AS 'vendor_show_online',
                            VENDOR.show_sales AS 'vendor_show_sales',
                            VENDOR.show_ops AS 'vendor_show_ops',
                            VENDOR.is_provider AS 'vendor_is_provider',
                            VENDOR.date_created AS 'vendor_date_created',
                            VENDOR.created_by  AS 'vendor_created_by',
                            VENDOR.date_modified AS 'vendor_date_modified',
                            VENDOR.modified_by  AS 'vendor_modified_by',
                            VENDOR.enabled AS 'vendor_enabled',
                            VENDOR.note  AS 'vendor_note'
            FROM 			provider PROVIDER
            LEFT JOIN		company COMPANY ON COMPANY.id = PROVIDER.company_id
            LEFT JOIN		location LOCATION ON LOCATION.id = PROVIDER.location_id
            LEFT JOIN		location_types LOCATION_TYPES ON LOCATION_TYPES.id = LOCATION.location_types_id
            LEFT JOIN		city CITY ON CITY.id = LOCATION.city_id
            LEFT JOIN		province PROVINCE ON CITY.province_id = PROVINCE.id
            LEFT JOIN		country COUNTRY ON PROVINCE.country_id = COUNTRY.id
            LEFT JOIN		vendor VENDOR ON VENDOR.company_id = COMPANY.id AND VENDOR.is_provider = 1
            LEFT JOIN		company VENDOR_COMPANY ON VENDOR_COMPANY.id = VENDOR.company_id
            ";
		
		public static function fetchAllProviders()
		{
			try {
				
				return Model::$db->rawQuery(self::$selectQuery);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
		public static function get(int $id = null): array
		{
			$whereCondition = "";
			
			if (!is_null($id)) {
				$whereCondition = "
					WHERE			PROVIDER.enabled = 1
						AND		    PROVIDER.id = $id
						LIMIT 1
					";
			}
			
			$sql = self::$selectQuery . $whereCondition . "";
			
			try {
				
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
		public static function getByName(string $name): array
		{
			$searchTerm = addslashes($name);
			
			try {
				$where = "
                    WHERE		COMPANY.name = '$searchTerm'
                    ORDER BY    COMPANY.name ASC
                    ";
				$sql = self::$selectQuery . " " . $where;
				
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->trace($e);
				
				return [];
			}
			
		}
		
		public static function getOne(int $id = null): array
		{
			try {
				if (!is_null($id)) {
					Model::$db->where("id", $id);
				}
				Model::$db->where("enabled", 1);
				
				return Model::$db->get("provider");
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
		public static function provider_ac(string $st = ""): array
		{
			$searchTerm = addslashes($st);
			
			$where = "";
			$order = "";
			$limit = "";
			
			$limitConditions = 20;
			$whereConditions = array(
				"COMPANY.enabled = 1",
				"COMPANY.name LIKE '%$searchTerm%'",
			);
			$orderConditions = array(
				"LENGTH(COMPANY.name)",
				"CAST(COMPANY.name AS UNSIGNED)",
				"COMPANY.name",
			);
			
			if ((int)$limitConditions > 0) {
				$limit = "LIMIT     " . $limitConditions;
			}
			
			if (count($whereConditions) > 0) {
				$where = "WHERE     " . implode(" AND ", $whereConditions);
			}
			
			if (count($orderConditions) > 0) {
				$order = "ORDER BY    " . implode(", ", $orderConditions);
			}
			
			$sql = self::$selectQuery . "
                    $where
                    $order
                    $limit;";
			
			try {
				
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
		}
		
		public static function updateRecord(array $provider): array
		{
			if (!isset($provider) || !isset($provider["location_id"])) {
				return [];
			}
			
			$company = array();
			$vendor = array();
			$location = array();
			
			if (isset($provider["company_detail"])) {
				$company = CompanyModel::updateRecord($provider["company_detail"]);
				Log::$debug_log->trace($provider["company_detail"]);
			}
			
			if (isset($provider["vendor_detail"])) {
				$vendor = VendorModel::updateRecord($provider["vendor_detail"]);
				//Log::$debug_log->trace($company);
			}
			
			if (isset($provider["location_detail"])) {
				//$location = $provider["location_detail"];
			}
			$name = Model::setInt((isset($provider["name"])) ? $provider["name"] : null);
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$id = Model::setInt((isset($provider["id"])) ? $provider["id"] : null);
			$company_id = Model::setInt((isset($provider["company_id"])) ? $provider["company_id"] : null);
			$location_id = Model::setInt((isset($provider["location_id"])) ? $provider["location_id"] : null);
			$code_direct_id = Model::setString((isset($provider["code_direct_id"])) ? $provider["code_direct_id"] : null);
			$provider_vendor = Model::setBool((isset($provider["provider_vendor"])) ? $provider["provider_vendor"] : null);
			$enabled = Model::setBool((isset($provider["enabled"])) ? $provider["enabled"] : null);
			$note = Model::setLongText((isset($provider["note"])) ? $provider["note"] : null);
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			$sql = "
                INSERT INTO provider (
                    id, company_id, location_id, code_direct_id,
                    provider_vendor, enabled, date_created, created_by,
                    date_modified, modified_by, note
                ) VALUES (
                    $id, $company_id, $location_id, $code_direct_id,
                    $provider_vendor, $enabled, CURRENT_TIMESTAMP, $created_by,
                    CURRENT_TIMESTAMP, $modified_by, $note
                )
                ON DUPLICATE KEY UPDATE
                    location_id = VALUES(location_id),
                    code_direct_id = VALUES(code_direct_id),
                    enabled = VALUES(enabled),
                    modified_by = VALUES(modified_by),
                    date_modified = VALUES(date_modified),
                    note = VALUES(note)
            ";
			
			try {
				Model::$db->rawQuery($sql);
				$provider_id = Model::$db->getInsertId();
				if ($provider_id) {
					if (is_null($id)) {
						$code_direct_id = Provider::generateCodeDirectId(array(
							"company_name" => $name,
							"provider_id" => $provider_id,
						));
						Log::$debug_log->trace("-------------------------");
						Log::$debug_log->trace($code_direct_id);
						Log::$debug_log->trace("-------------------------");
					}
					
					return self::get($provider_id);
				}
				
				Log::$debug_log->error("No Company Id");
				
				return [];
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
		public static function updateLocation(int $provider_id = null, array $location = []): array
		{
			if (!is_null($provider_id) || !is_null($location)) {
				return [];
			}
			
			return [];
		}
		
		public static function update($provider = null): array
		{
			if (!isset($provider["company_id"])) {
				//Log::$debug_log->error("Missing Data");
				//Log::$debug_log->trace($provider);
				
				return [];
			}
			
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$enabled = Model::setBool((isset($provider["enabled"])) ? $provider["enabled"] : null);
			$note = Model::setLongText((isset($provider["note"])) ? $provider["note"] : null);
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			$id = Model::setInt((isset($provider["id"])) ? $provider["id"] : null);
			$company_id = Model::setInt((isset($provider["company_id"])) ? $provider["company_id"] : null);
			$location_id = Model::setInt((isset($provider["location_id"])) ? $provider["location_id"] : null);
			$provider_vendor = Model::setBool((isset($provider["provider_vendor"])) ? $provider["provider_vendor"] : null);
			$code_direct_id = Model::setString((isset($provider["code_direct_id"])) ? $provider["code_direct_id"] : null);
			$description_long = Model::setLongText((isset($provider["description_long"])) ? $provider["description_long"] : null);
			$description_short = Model::setLongText((isset($provider["description_short"])) ? $provider["description_short"] : null);
			$keywords = Model::setLongText((isset($provider["keywords"])) ? $provider["keywords"] : null);
			
			$sql = "
                INSERT INTO provider (
                    id, company_id, location_id, code_direct_id,
                    provider_vendor, enabled, date_created, created_by,
                    date_modified, modified_by, note, description_long, description_short, keywords
                ) VALUES (
                    $id, $company_id, $location_id, $code_direct_id,
                    $provider_vendor, $enabled, CURRENT_TIMESTAMP, $created_by,
                    CURRENT_TIMESTAMP, $modified_by, $note, $description_long, $description_short, $keywords
                )
                ON DUPLICATE KEY UPDATE
                    location_id = VALUES(location_id),
                    company_id = VALUES(company_id),
                    code_direct_id = VALUES(code_direct_id),
                    description_long = VALUES(description_long),
                    description_short = VALUES(description_short),
                    keywords = VALUES(keywords),
                    provider_vendor = VALUES(provider_vendor),
                    enabled = VALUES(enabled),
                    modified_by = VALUES(modified_by),
                    date_modified = VALUES(date_modified);
            ";
			
			try {
				Model::$db->rawQuery($sql);
				$provider_id = Model::$db->getInsertId();
				
				if ($provider_id) {
					
					$update = "
                        UPDATE      provider
                        SET         code_direct_id = generateCodeDirectId($provider_id)
                        WHERE       id = $provider_id;";
					try {
						Model::$db->rawQuery($update);
						
						return self::get((int)$provider_id);
						
					} catch (Exception $ex) {
						Log::$debug_log->error($ex->getMessage());
						
						return [];
					}
				} else {
					Log::$debug_log->info("hh");
				}
				
				return [];
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
			
		}
		
	}
