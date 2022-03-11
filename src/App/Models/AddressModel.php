<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short AddressModel Description
	 * Long AddressModel Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class AddressModel extends Model
	{
		
		protected static $dbTable = "address";
		protected static $dbFields = Array();
		protected static $sql = "
            SELECT 					COMPANY_ADDRESS.company_id,
                                    COMPANY_ADDRESS.address_id,
                                    GROUP_CONCAT(COMPANY_ADDRESS.address_types_id ORDER BY COMPANY_ADDRESS.address_types_id ASC SEPARATOR ',') AS 'address_types_id',
                                    ADDRESS.id AS 'address_id',
                                    ADDRESS.street_1 AS 'address_street_1',
                                    ADDRESS.street_2 AS 'address_street_2',
                                    ADDRESS.street_3 AS 'address_street_3',
                                    ADDRESS.city_id AS 'address_city_id',
                                    ADDRESS.country_id AS 'address_country_id',
                                    ADDRESS.province_id AS 'address_province_id',
                                    ADDRESS.postal_code AS 'address_postal_code',
                                    ADDRESS.date_created AS 'address_date_created',
                                    ADDRESS.created_by AS 'address_created_by',
                                    ADDRESS.date_modified AS 'address_date_modified',
                                    ADDRESS.modified_by AS 'address_modified_by',
                                    ADDRESS.enabled AS 'address_enabled',
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
                    FROM 			company_address COMPANY_ADDRESS
                    JOIN			address ADDRESS ON ADDRESS.id = COMPANY_ADDRESS.address_id
                    JOIN			city CITY ON CITY.id = ADDRESS.city_id
                    JOIN			province PROVINCE ON PROVINCE.id = CITY.province_id
                    JOIN			country COUNTRY ON COUNTRY.id = PROVINCE.country_id
                    WHERE			ADDRESS.enabled = 1
                        AND			ADDRESS.enabled = 1
                        AND			COUNTRY.enabled = 1
                        AND			PROVINCE.enabled = 1
                        AND			CITY.enabled = 1";
		
		/**
		 * get
		 *
		 * @param int|null $id
		 *
		 * @return array
		 */
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
		
		public static function deleteCompanyAddressByCompanyId(int $company_id, int $address_id): bool
		{
			$sql = "
                DELETE FROM company_address
                WHERE company_id = $company_id AND address_id = $address_id;
                ";
			
			try {
				Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return false;
			}
			
			return true;
		}
		
		public static function updateCompanyAddress(int $address_id, int $company_id, array $address_types = []): array
		{
			if (!isset($address_id, $company_id, $address_types)) {
				Log::$debug_log->error("Missing Fields");
				
				return [];
			}
			
			//
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$enabled = 1;
			$note = Model::setLongText((isset($address["note"])) ? $address["note"] : null);
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			//
			foreach ($address_types AS $address_types_id) {
				$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
				
				try {
					$sql = "
                    INSERT INTO company_address (
                        company_id, address_id, address_types_id, enabled,
                        date_created, created_by, date_modified, modified_by,
                        note
                    ) VALUES (
                        $company_id, $address_id, $address_types_id, $enabled,
                        CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP, $modified_by,
                        $note
                    )
                    ON DUPLICATE KEY UPDATE
                        enabled = VALUES(enabled),
                        date_modified = VALUES(date_modified);
                    ";
					Model::$db->rawQuery($sql);
				} catch (Exception $e) {
					Log::$debug_log->error($e);
					
					return [];
				}
			}
			
			return self::getByCompanyId($company_id);
		}
		
		public static function getByCompanyId(int $company_id = null): array
		{
			$where = "";
			if (!is_null($company_id)) {
				$where = "AND			COMPANY_ADDRESS.company_id = $company_id";
			}
			
			$groupBy = "
                    $where
                    GROUP BY 		COMPANY_ADDRESS.address_id;";
			
			try {
				$sql = self::$sql . $groupBy;
				
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function getByAddressId(int $address_id = null): array
		{
			$where = "";
			if (!is_null($address_id)) {
				$where = "AND			COMPANY_ADDRESS.address_id = $address_id";
			}
			
			$groupBy = "
                    $where
                    GROUP BY 		COMPANY_ADDRESS.address_id;";
			
			try {
				$sql = self::$sql . $groupBy;
				
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function update(array $address = []): array
		{
			if (!isset($address["company_id"])) {
				Log::$debug_log->error("Missing Company Id");
				
				return [];
			}
			// ----
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$address_id = Model::setInt((isset($address["id"])) ? $address["id"] : null);
			$street_1 = Model::setString((isset($address["street_1"])) ? $address["street_1"] : null);
			$street_2 = Model::setString((isset($address["street_2"])) ? $address["street_2"] : null);
			$street_3 = Model::setString((isset($address["street_3"])) ? $address["street_3"] : null);
			$postal_code = Model::setString((isset($address["postal_code"])) ? $address["postal_code"] : null);
			$company_id = Model::setInt((isset($address["company_id"])) ? $address["company_id"] : null);
			$country_id = Model::setInt((isset($address["country_id"])) ? $address["country_id"] : null);
			$province_id = Model::setInt((isset($address["province_id"])) ? $address["province_id"] : null);
			$city_id = Model::setInt((isset($address["city_id"])) ? $address["city_id"] : null);
			$status_id = Model::setInt((isset($address["status_id"])) ? $address["status_id"] : null);
			$enabled = Model::setBool((isset($address["enabled"])) ? $address["enabled"] : null);
			$note = Model::setLongText((isset($address["note"])) ? $address["note"] : null);
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			$address_types_id = [];
			
			if (isset($address["address_types_id"])) {
				foreach ($address["address_types_id"] AS $address_type) {
					$address_types_id[] = $address_type;
				}
			}
			
			$sql = "
                INSERT INTO address
                (
                    id, city_id, province_id, country_id, street_1,
                    street_2, street_3, postal_code, enabled, date_created,
                    created_by, date_modified, modified_by, note
                ) VALUES (
                    $address_id, $city_id, $province_id, $country_id, $street_1,
                    $street_2, $street_3, $postal_code, $enabled, CURRENT_TIMESTAMP,
                    $created_by, CURRENT_TIMESTAMP, $modified_by, $note
                )
                ON DUPLICATE KEY UPDATE
                    country_id = VALUES(country_id),
                    province_id = VALUES(province_id),
                    city_id = VALUES(city_id),
                    street_1 = VALUES(street_1),
                    street_2 = VALUES(street_2),
                    street_3 = VALUES(street_3),
                    postal_code = VALUES(postal_code),
                    enabled = VALUES(enabled),
                    date_modified = VALUES(date_modified);";
			try {
				Model::$db->rawQuery($sql);
				$address_id = Model::$db->getInsertId();
				if (isset($company_id, $address_id, $address_types_id)) {
					$del = self::deleteCompanyAddressByCompanyId((int)$company_id, (int)$address_id);
					$company_addresses = self::updateCompanyAddress((int)$address_id, (int)$company_id, $address_types_id);
				}
				
				return self::getByAddressId((int)$address_id);
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function getAddressTypeById(int $address_types_id)
		{
			$address_types = array();
			Model::$db->where("enabled", 1);
			if (!is_null($address_types_id)) {
				Model::$db->where("id", (int)$address_types_id);
			}
			try {
				$address_types = self::$db->get("address_types");
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
			}
			
			return $address_types;
		}
		
	}
