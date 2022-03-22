<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short CustomerModel Description
	 * Long CustomerModel Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class CustomerModel extends Model
	{
		protected static $dbTable = "customer";
		protected static $dbFields = Array();
		protected static $sql = "
		SELECT
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
						ADDRESS.id AS 'address_id',
						ADDRESS.city_id AS 'address_city_id',
						ADDRESS.province_id AS 'address_province_id',
						ADDRESS.country_id AS 'address_country_id',
						ADDRESS.street_1 AS 'address_street_1',
						ADDRESS.street_2 AS 'address_street_2',
						ADDRESS.street_3 AS 'address_street_3',
						ADDRESS.postal_code AS 'address_postal_code',
						ADDRESS.enabled AS 'address_enabled',
						ADDRESS.date_created AS 'address_date_created',
						ADDRESS.created_by AS 'address_created_by',
						ADDRESS.date_modified AS 'address_date_modified',
						ADDRESS.modified_by AS 'address_modified_by',
						ADDRESS.note AS 'address_note',
						CITY.id AS 'city_id',
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
						COUNTRY.name AS 'country_name',
						COUNTRY.iso2 AS 'country_iso2',
						COUNTRY.iso3 AS 'country_iso3',
						COUNTRY.currency_id AS 'country_currency_id',
						COUNTRY.sort_order AS 'country_sort_order',
						COUNTRY.enabled AS 'country_enabled',
						COUNTRY.date_created AS 'country_date_created',
						COUNTRY.created_by AS 'country_created_by',
						COUNTRY.date_modified AS 'country_date_modified',
						COUNTRY.modified_by AS 'country_modified_by',
						COUNTRY.note AS 'country_note'
		FROM 			customer CUSTOMER
		JOIN 			address ADDRESS ON ADDRESS.id = CUSTOMER.address_id
		JOIN			city CITY ON CITY.id = ADDRESS.city_id
		JOIN			province PROVINCE ON PROVINCE.id = CITY.province_id
		JOIN			country COUNTRY ON COUNTRY.id = PROVINCE.country_id
		";
		
		public static function fetchAll(): array
		{
			Log::$debug_log->trace("CustomerModel::fetchAll()");
			
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
		
		public static function fetchByCustomerId(int $customerId): array
		{
			Log::$debug_log->trace("CustomerModel::fetchByCustomerId()");
			Log::$debug_log->info("customerId: $customerId");
			
			$whereConditions = "
			WHERE 	CUSTOMER.id = $customerId
			";
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
		
		public static function fetchByUserId(int $userId = null): array
		{
			Log::$debug_log->trace("ItineraryModel::fetchByUserId()");
			Log::$debug_log->info("userId: $userId");
			
			if (!is_null($userId)) {
				$userId = (int)$userId;
			} else if (is_null($userId) && isset($_SESSION["user_id"])) {
				$userId = intval($_SESSION["user_id"]);
			} else {
				return [];
			}
			
			$whereConditions = "
			WHERE	CUSTOMER.created_by = $userId
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
		
	}
