<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short ItineraryModel Description
	 * Long ItineraryModel Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class ItineraryModel extends Model
	{
		protected static $dbTable = "itinerary";
		protected static $dbFields = Array();
		
		protected static $sql = "
		SELECT
						ITINERARY.id AS 'itinerary_id',
						ITINERARY.customer_id AS 'itinerary_customer_id',
						ITINERARY.stage_id AS 'itinerary_stage_id',
						ITINERARY.name AS 'itinerary_name',
						ITINERARY.start_date AS 'itinerary_start_date',
						ITINERARY.end_date AS 'itinerary_end_date',
						ITINERARY.budget AS 'itinerary_budget',
						ITINERARY.currency_id AS 'itinerary_currency_id',
						ITINERARY.json AS 'itinerary_json',
						ITINERARY.enabled AS 'itinerary_enabled',
						ITINERARY.date_created AS 'itinerary_date_created',
						ITINERARY.created_by AS 'itinerary_created_by',
						ITINERARY.date_modified AS 'itinerary_date_modified',
						ITINERARY.modified_by AS 'itinerary_modified_by',
						ITINERARY.note AS 'itinerary_note',
				  
						CUSTOMER.id AS 'customer_id',
						CUSTOMER.address_id AS 'customer_address_id',
						CUSTOMER.name_prefix AS 'customer_name_prefix',
						CUSTOMER.name_first AS 'customer_name_first',
						CUSTOMER.name_last AS 'customer_name_last',
						CUSTOMER.name_suffix AS 'customer_name_suffix',
						CUSTOMER.date_birth AS 'customer_date_birth',
						CUSTOMER.email AS 'customer_email',
						CUSTOMER.phone_1 AS 'customer_phone_1',
						CUSTOMER.phone_2 AS 'customer_phone_2',
						CUSTOMER.sort_order AS 'customer_sort_order',
						CUSTOMER.enabled AS 'customer_enabled',
						CUSTOMER.date_created AS 'customer_date_created',
						CUSTOMER.created_by AS 'customer_created_by',
						CUSTOMER.date_modified AS 'customer_date_modified',
						CUSTOMER.modified_by AS 'customer_modified_by',
						CUSTOMER.note AS 'customer_note',

						STAGE.class AS 'stage_class',
						STAGE.created_by AS 'stage_created_by',
						STAGE.date_created AS 'stage_date_created',
						STAGE.date_modified AS 'stage_date_modified',
						STAGE.enabled AS 'stage_enabled',
						STAGE.id AS 'stage_id',
						STAGE.modified_by AS 'stage_modified_by',
						STAGE.name AS 'stage_name',
						STAGE.note AS 'stage_note',

						ADDRESS.city_id AS 'address_city_id',
						ADDRESS.country_id AS 'address_country_id',
						ADDRESS.created_by AS 'address_created_by',
						ADDRESS.date_created AS 'address_date_created',
						ADDRESS.date_modified AS 'address_date_modified',
						ADDRESS.enabled AS 'address_enabled',
						ADDRESS.id AS 'address_id',
						ADDRESS.modified_by AS 'address_modified_by',
						ADDRESS.note AS 'address_note',
						ADDRESS.postal_code AS 'address_postal_code',
						ADDRESS.province_id AS 'address_province_id',
						ADDRESS.street_1 AS 'address_street_1',
						ADDRESS.street_2 AS 'address_street_2',
						ADDRESS.street_3 AS 'address_street_3',
			   
						CITY.blurb AS 'city_blurb',
						CITY.country_id AS 'city_country_id',
						CITY.created_by AS 'city_created_by',
						CITY.date_created AS 'city_date_created',
						CITY.date_modified AS 'city_date_modified',
						CITY.enabled AS 'city_enabled',
						CITY.id AS 'city_id',
						CITY.modified_by AS 'city_modified_by',
						CITY.name AS 'city_name',
						CITY.note AS 'city_note',
						CITY.province_id AS 'city_province_id',
						CITY.sort_order AS 'city_sort_order',
				  
						PROVINCE.blurb AS 'province_blurb',
						PROVINCE.country_id AS 'province_country_id',
						PROVINCE.created_by AS 'province_created_by',
						PROVINCE.date_created AS 'province_date_created',
						PROVINCE.date_modified AS 'province_date_modified',
						PROVINCE.enabled AS 'province_enabled',
						PROVINCE.id AS 'province_id',
						PROVINCE.iso2 AS 'province_iso2',
						PROVINCE.iso3 AS 'province_iso3',
						PROVINCE.modified_by AS 'province_modified_by',
						PROVINCE.name AS 'province_name',
						PROVINCE.note AS 'province_note',
						PROVINCE.sort_order AS 'province_sort_order',
						IF((PROVINCE.iso2 IS NOT NULL) AND (PROVINCE.iso2 != '') AND (PROVINCE.name IS NOT NULL), CONCAT(PROVINCE.iso2, ' - ', PROVINCE.name), PROVINCE.name ) AS 'province_display_long',
						PROVINCE.name AS 'province_display_medium',
						IF((PROVINCE.iso2 IS NOT NULL) AND (PROVINCE.iso2 != ''), PROVINCE.iso2, PROVINCE.name ) AS 'province_display_short',

						COUNTRY.blurb AS 'country_blurb',
						COUNTRY.created_by AS 'country_created_by',
						COUNTRY.currency_id AS 'country_currency_id',
						COUNTRY.date_created AS 'country_date_created',
						COUNTRY.date_modified AS 'country_date_modified',
						COUNTRY.enabled AS 'country_enabled',
						COUNTRY.id AS 'country_id',
						COUNTRY.iso2 AS 'country_iso2',
						COUNTRY.iso3 AS 'country_iso3',
						COUNTRY.modified_by AS 'country_modified_by',
						COUNTRY.name AS 'country_name',
						COUNTRY.note AS 'country_note',
						COUNTRY.sort_order AS 'country_sort_order',
						IF((COUNTRY.iso3 IS NOT NULL) AND (COUNTRY.iso3 != '') AND (COUNTRY.name IS NOT NULL), CONCAT(COUNTRY.iso3, ' - ', COUNTRY.name), COUNTRY.name ) AS 'country_display_long',
						COUNTRY.name AS 'country_display_medium',
						IF((COUNTRY.iso3 IS NOT NULL) AND (COUNTRY.iso3 != ''), COUNTRY.iso3, COUNTRY.name ) AS 'country_display_short',

						CURRENCY.created_by AS 'currency_created_by',
						CURRENCY.date_created AS 'currency_date_created',
						CURRENCY.date_modified AS 'currency_date_modified',
						CURRENCY.enabled AS 'currency_enabled',
						CURRENCY.id AS 'currency_id',
						CURRENCY.iso AS 'currency_iso',
						CURRENCY.minor_unit AS 'currency_minor_unit',
						CURRENCY.modified_by AS 'currency_modified_by',
						CURRENCY.name AS 'currency_name',
						CURRENCY.note AS 'currency_note',
						CURRENCY.sort_order AS 'currency_sort_order',
						CURRENCY.symbol AS 'currency_symbol'
		
		FROM 			itinerary ITINERARY
		JOIN 			customer CUSTOMER ON CUSTOMER.id = ITINERARY.customer_id
		JOIN			address ADDRESS ON ADDRESS.id = CUSTOMER.address_id
		JOIN			city CITY ON CITY.id = ADDRESS.city_id
		JOIN			province PROVINCE ON PROVINCE.id = CITY.province_id
		JOIN			country COUNTRY ON COUNTRY.id = PROVINCE.country_id
		LEFT JOIN		currency CURRENCY ON CURRENCY.id = COUNTRY.currency_id
		JOIN 			stage STAGE ON STAGE.id = ITINERARY.stage_id
		";
		
		public static function fetchAll(): array
		{
			Log::$debug_log->trace("ItineraryModel::fetchAll()");
			// ----
			
			$whereConditions = "";
			
			$orderByConditions = Model::buildOrderCondition(array(
				"LENGTH(ITINERARY.name)",
				"CAST(ITINERARY.name AS UNSIGNED)",
				"ITINERARY.name ASC",
			));
			
			$sql = self::$sql . $whereConditions . $orderByConditions;
			
			try {
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
			
		}
		
		public static function fetchByItineraryId(int $itineraryId): array
		{
			Log::$debug_log->trace("ItineraryModel::fetchByItineraryId()");
			Log::$debug_log->info("itineraryId: $itineraryId");
			// ----
			
			$itineraries = [];
			$whereConditions = "";
			$orderByConditions = "";
			
			return $itineraries;
		}
		
		public static function fetchByUserId(int $userId = null): array
		{
			Log::$debug_log->trace("ItineraryModel::fetchByUserId()");
			Log::$debug_log->trace("userId: $userId");
			
			if (!is_null($userId)) {
				$userId = (int)$userId;
			} else if (is_null($userId) && isset($_SESSION["user_id"])) {
				$userId = intval($_SESSION["user_id"]);
			} else {
				return [];
			}
			
			$whereConditions = "
			WHERE	ITINERARY.created_by = $userId
			";
			$orderByConditions = "";
			
			$sql = self::$sql . $whereConditions . $orderByConditions;
			
			//Log::$debug_log->trace($sql);
			
			try {
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
		}
		
		public static function fetchByCustomerId(int $customerId): array
		{
			Log::$debug_log->trace("ItineraryModel::fetchByCustomerId()");
			
			$itineraries = [];
			$whereConditions = "";
			$orderByConditions = "";
			
			$sql = self::$sql . $whereConditions . $orderByConditions;
			
			try {
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
		}
		
		public static function fetchByCustomerName(string $customerName): array
		{
			Log::$debug_log->trace("ItineraryModel::fetchByCustomerName()");
			
			$itineraries = [];
			$whereConditions = "";
			$orderByConditions = "";
			
			return $itineraries;
		}
		
		public static function fetchByItineraryName(string $itineraryName): array
		{
			Log::$debug_log->trace("ItineraryModel::fetchByItineraryName()");
			
			$itineraries = [];
			$whereConditions = "";
			$orderByConditions = "";
			
			$sql = self::$sql . $whereConditions . $orderByConditions;
			
			try {
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
		}
		
		public static function updateItineraryRecord(array $itinerary): array
		{
			Log::$debug_log->trace("ItineraryModel::updateItineraryRecord()");
			
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			
			return [];
		}
		
		public static function fetchItinerariesAutoComplete(string $st = ""): array
		{
			Log::$debug_log->trace("ItineraryModel::fetchItinerariesAutoComplete()");
			Log::$debug_log->info("st: $st");
			// ----
			
			$searchTerm = addslashes($st);
			
			$whereConditions = Model::buildWhereCondition(array(
				"ITINERARY.name LIKE '%$searchTerm%'",
			
			));
			
			$orderByConditions = Model::buildOrderCondition(array(
				"LENGTH(ITINERARY.name)",
				"CAST(ITINERARY.name AS UNSIGNED)",
				"ITINERARY.name ASC",
			));
			
			$limitByConditions = "LIMIT 20";
			
			$sql = self::$sql . "
                    $whereConditions
                    $orderByConditions
                    $limitByConditions;";
			
			//Log::$debug_log->trace($sql);
			
			try {
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
		}
		
	}
