<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short Country Description
	 * Long Country Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class CountryModel extends Model
	{
		
		protected static $dbTable = "country";
		protected static $dbFields = Array(
			"id" => array(
				"dataType" => "INT",
				"length" => 11,
				"PK" => true,
				"NN" => true,
				"UQ" => true,
				"UN" => true,
				"AI" => true,
				"value" => null,
			),
			"currency_id" => null,
			"sort_order" => null,
			"name" => null,
			"iso2" => null,
			"iso3" => null,
			"blurb" => null,
			"enabled" => 1,
			"date_created" => null,
			"created_by" => null,
			"date_modified" => null,
			"modified_by" => null,
			"note" => null,
			"display_short" => null,
			"display_medium" => null,
			"display_long" => null,
		);
		protected static $selectQuery = "
			SELECT 		COUNTRY.iso3 AS 'country_display_long',
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
						COUNTRY.note AS 'country_note',
			            IF((COUNTRY.iso3 IS NOT NULL) AND (COUNTRY.iso3 != '') AND (COUNTRY.name IS NOT NULL), CONCAT(COUNTRY.iso3, ' - ', COUNTRY.name), COUNTRY.name ) AS 'country_display_long',
			            COUNTRY.name AS 'country_display_medium',
			            IF((COUNTRY.iso3 IS NOT NULL) AND (COUNTRY.iso3 != ''), COUNTRY.iso3, COUNTRY.name ) AS 'country_display_short',
						CURRENCY.id AS 'currency_id',
						CURRENCY.sort_order AS 'currency_sort_order',
						CURRENCY.name AS 'currency_name',
						CURRENCY.iso AS 'currency_iso',
						CURRENCY.minor_unit AS 'currency_minor_unit',
						CURRENCY.symbol AS 'currency_symbol',
						CURRENCY.enabled AS 'currency_enabled',
						CURRENCY.date_created AS 'currency_date_created',
						CURRENCY.created_by AS 'currency_created_by',
						CURRENCY.date_modified AS 'currency_date_modified',
						CURRENCY.modified_by AS 'currency_modified_by',
						CURRENCY.note AS 'currency_note'
			FROM 		country COUNTRY
			LEFT JOIN	currency CURRENCY ON CURRENCY.id = COUNTRY.currency_id
		";
		protected static $searchTerm = "";
		protected static $shortWhereCondition = "
			WHERE       COUNTRY.iso3 LIKE ''
		";
		protected static $mediumWhereCondition = "
			WHERE       COUNTRY.name LIKE ''
		";
		protected static $longWhereCondition = "
			WHERE       CONCAT(COUNTRY.iso3, ' - ', COUNTRY.name) LIKE ''
		";
		protected static $longOrderCondition = "
		
		";
		
		public static function get(int $id = null): array
		{
			$where = "";
			
			try {
				if (!is_null($id)) {
					$where = "AND         COUNTRY.id = $id";
				}
				$sql = "
                SELECT
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
                FROM 			country COUNTRY
                WHERE			COUNTRY.enabled = 1
                    $where
                ORDER BY		COUNTRY.sort_order ASC, COUNTRY.name ASC;";
				
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function fetchByCountryName(string $name = ""): array
		{
			$searchTerm = addslashes($name);
			
			try {
				
				$sqlCondition = "
					WHERE		COUNTRY.name = '$searchTerm'
				";
				
				$sql = self::$selectQuery . $sqlCondition . "
                    ORDER BY	CONCAT( COUNTRY.iso3, ' - ', COUNTRY.name )
                    LIMIT 20;
                ";
				Log::$debug_log->trace($sql);
				
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function country_ac(string $st = ""): array
		{
			try {
				$searchTerm = addslashes($st);
				$sqlCondition = "
					WHERE		IF(COUNTRY.iso3 IS NULL, COUNTRY.name, CONCAT(COUNTRY.iso3, ' - ', COUNTRY.name)) LIKE '%$searchTerm%'
				";
				$sql = self::$selectQuery . $sqlCondition . "
                    ORDER BY	CONCAT( COUNTRY.iso3, ' - ', COUNTRY.name )
                    LIMIT 20;";
				
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function getOne(int $id = null): array
		{
			try {
				if (!is_null($id)) {
					self::$db->where("id", $id);
				}
				self::$db->orderBy("sort_order", "ASC");
				self::$db->where("enabled", 1);
				
				return self::$db->getOne(self::$dbTable);
			} catch (Exception $e) {
				return [];
			}
		}
		
		public static function update(array $country = []): array
		{
			$id = Model::setInt((isset($country["id"])) ? $country["id"] : null);
			$sort_order = Model::setInt((isset($country["sort_order"])) ? $country["sort_order"] : 9999999);
			$currency_id = Model::setInt((isset($country["currency_id"])) ? $country["currency_id"] : 5);
			$name = Model::setString((isset($country["name"])) ? $country["name"] : null);
			$iso2 = Model::setString((isset($country["iso2"])) ? $country["iso2"] : null);
			$iso3 = Model::setString((isset($country["iso3"])) ? $country["iso3"] : null);
			$note = Model::setLongText((isset($country["note"])) ? $country["note"] : null);
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$enabled = Model::setBool((isset($country["enabled"])) ? $country["enabled"] : null);
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			$sql = "
                INSERT INTO country (
                    id, currency_id, sort_order, name, iso2,
                    iso3, enabled, date_created, created_by,
                    date_modified, modified_by, note
                ) VALUES (
                    $id, $currency_id, $sort_order, $name,
                    $iso2, $iso3, $enabled, DEFAULT,
                    $created_by, DEFAULT, $modified_by, $note
                )
                ON DUPLICATE KEY UPDATE
                    currency_id = VALUES(currency_id),
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
				
				return self::get($id);
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
			
		}
		
	}
