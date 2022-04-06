<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short PackageModel Description
	 * Long PackageModel Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class PackageModel extends Model
	{
		protected static $dbTable = "package";
		
		protected static $sql = "
			SELECT      PACKAGE.id AS 'package_id',
			            PACKAGE.name AS 'package_name',
			            PACKAGE.day_span AS 'package_day_span',
			            PACKAGE.city_id AS 'package_city_id',
			            PACKAGE.min_pax AS 'package_min_pax',
			            PACKAGE.max_pax AS 'package_max_pax',
			            PACKAGE.description_long AS 'package_description_long',
			            PACKAGE.description_short AS 'package_description_short',
			            PACKAGE.available_start AS 'package_available_start',
			            PACKAGE.available_end AS 'package_available_end',
			            PACKAGE.cost AS 'package_cost',
			            PACKAGE.price AS 'package_price',
			            PACKAGE.margin AS 'package_margin',
			            PACKAGE.enabled AS 'package_enabled',
			            PACKAGE.date_created AS 'package_date_created',
			            PACKAGE.created_by AS 'package_created_by',
			            PACKAGE.date_modified AS 'package_date_modified',
			            PACKAGE.modified_by AS 'package_modified_by',
			            PACKAGE.note AS 'package_note',
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
			            CURRENCY.note AS 'currency_note',
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
			            CITY.note AS 'city_note'
			FROM 	    package PACKAGE
			JOIN 	    city CITY ON CITY.id = PACKAGE.city_id
			JOIN 	    province PROVINCE ON PROVINCE.id = CITY.province_id
			JOIN 	    country COUNTRY ON COUNTRY.id = PROVINCE.country_id
			JOIN 	    currency CURRENCY ON CURRENCY.id = COUNTRY.currency_id
		";
		
		protected static $id;
		
		protected static $name;
		
		protected static $day_span;
		
		protected static $city_id;
		
		protected static $min_pax;
		
		protected static $max_pax;
		
		protected static $description_long;
		
		protected static $description_short;
		
		protected static $available_start;
		
		protected static $available_end;
		
		protected static $cost;
		
		protected static $price;
		
		protected static $margin;
		
		protected static $enabled;
		
		protected static $date_created;
		
		protected static $created_by;
		
		protected static $date_modified;
		
		protected static $modified_by;
		
		protected static $note;
		
		public static function get_id()
		{
			return self::$id;
		}
		
		public static function get_name()
		{
			return self::$name;
		}
		
		public static function get_day_span()
		{
			return self::$day_span;
		}
		
		public static function get_city_id()
		{
			return self::$city_id;
		}
		
		public static function get_min_pax()
		{
			return self::$min_pax;
		}
		
		public static function get_max_pax()
		{
			return self::$max_pax;
		}
		
		public static function get_description_long()
		{
			return self::$description_long;
		}
		
		public static function get_description_short()
		{
			return self::$description_short;
		}
		
		public static function get_available_start()
		{
			return self::$available_start;
		}
		
		public static function get_available_end()
		{
			return self::$available_end;
		}
		
		public static function get_cost()
		{
			return self::$cost;
		}
		
		public static function get_price()
		{
			return self::$price;
		}
		
		public static function get_margin()
		{
			return self::$margin;
		}
		
		public static function get_enabled()
		{
			return self::$enabled;
		}
		
		public static function get_date_created()
		{
			return self::$date_created;
		}
		
		public static function get_created_by()
		{
			return self::$created_by;
		}
		
		public static function get_date_modified()
		{
			return self::$date_modified;
		}
		
		public static function get_modified_by()
		{
			return self::$modified_by;
		}
		
		public static function get_note()
		{
			return self::$note;
		}
		
		protected static function set_id($val)
		{
			self::$id = $val;
		}
		
		protected static function set_name($val)
		{
			self::$name = $val;
		}
		
		protected static function set_day_span($val)
		{
			self::$day_span = $val;
		}
		
		protected static function set_city_id($val)
		{
			self::$city_id = $val;
		}
		
		protected static function set_min_pax($val)
		{
			self::$min_pax = $val;
		}
		
		protected static function set_max_pax($val)
		{
			self::$max_pax = $val;
		}
		
		protected static function set_description_long($val)
		{
			self::$description_long = $val;
		}
		
		protected static function set_description_short($val)
		{
			self::$description_short = $val;
		}
		
		protected static function set_available_start($val)
		{
			self::$available_start = $val;
		}
		
		protected static function set_available_end($val)
		{
			self::$available_end = $val;
		}
		
		protected static function set_cost($val)
		{
			self::$cost = $val;
		}
		
		protected static function set_price($val)
		{
			self::$price = $val;
		}
		
		protected static function set_margin($val)
		{
			self::$margin = $val;
		}
		
		protected static function set_enabled($val)
		{
			self::$enabled = $val;
		}
		
		protected static function set_date_created($val)
		{
			self::$date_created = $val;
		}
		
		protected static function set_created_by($val)
		{
			self::$created_by = $val;
		}
		
		protected static function set_date_modified($val)
		{
			self::$date_modified = $val;
		}
		
		protected static function set_modified_by($val)
		{
			self::$modified_by = $val;
		}
		
		protected static function set_note($val)
		{
			self::$note = $val;
		}
		
		public static function updatePackageRecord(array $package = null): array
		{
			if (is_null($package)) {
				Log::$debug_log->error("Missing Package");
				
				return [];
			}
			
			$id = Model::setInt((isset($package["id"])) ? $package["id"] : null);
			$city_id = Model::setInt((isset($package["city_id"])) ? $package["city_id"] : null);
			$day_span = Model::setInt((isset($package["day_span"])) ? $package["day_span"] : 1);
			$min_pax = Model::setInt((isset($package["min_pax"])) ? $package["min_pax"] : 1);
			$max_pax = Model::setInt((isset($package["max_pax"])) ? $package["max_pax"] : null);
			$cost = Model::setInt((isset($package["cost"])) ? $package["cost"] : 0);
			$price = Model::setInt((isset($package["price"])) ? $package["price"] : 0);
			$margin = Model::setInt((isset($package["margin"])) ? $package["margin"] : 0);
			
			$name = Model::setString((isset($package["name"])) ? $package["name"] : null);
			$available_start = Model::setString((isset($package["available_start"])) ? $package["available_start"] : null);
			$available_end = Model::setString((isset($package["available_end"])) ? $package["available_end"] : null);
			$description_long = Model::setLongText((isset($package["description_long"])) ? $package["description_long"] : null);
			$description_short = Model::setLongText((isset($package["description_short"])) ? $package["description_short"] : null);
			$userId = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$enabled = Model::setBool((isset($package["enabled"])) ? $package["enabled"] : 1);
			$note = Model::setLongText((isset($package["note"])) ? $package["note"] : null);
			$created_by = Model::setInt($userId);
			$modified_by = Model::setInt($userId);
			
			$sql = "
			INSERT INTO package (
			    id, name, day_span, city_id, min_pax,
			    max_pax, description_long, description_short, available_start, available_end,
			    cost, price, margin, enabled, date_created,
			    created_by, date_modified, modified_by, note
			) VALUES (
			    $id, $name, $day_span, $city_id, $min_pax,
			    $max_pax, $description_long, $description_short, $available_start, $available_end,
			    $cost, $price, $margin, $enabled, CURRENT_TIMESTAMP,
			    $created_by, CURRENT_TIMESTAMP, $modified_by, $note
			)
			ON DUPLICATE KEY UPDATE
			    name = VALUES(name),
			    day_span = VALUES(day_span),
			    city_id = VALUES(city_id),
			    min_pax = VALUES(min_pax),
			    max_pax = VALUES(max_pax),
			    description_long = VALUES(description_long),
			    description_short = VALUES(description_short),
			    available_start = VALUES(available_start),
			    available_end = VALUES(available_end),
			    cost = VALUES(cost),
			    price = VALUES(price),
			    margin = VALUES(margin),
			    enabled = VALUES(enabled),
			    modified_by = VALUES(modified_by),
			    date_modified = VALUES(date_modified)
            ";
			
			try {
				Model::$db->rawQuery($sql);
				$package_id = Model::$db->getInsertId();
				
				return self::get($package_id);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
		public static function get(int $id = null): array
		{
			$sqlStatement = self::$sql;
			$whereCondition = (!is_null($id) && (int)$id > 0) ? "
			WHERE       PACKAGE.id = $id
			" : "";
			$orderCondition = "
			ORDER BY    LENGTH(PACKAGE.name), CAST(PACKAGE.name AS UNSIGNED), PACKAGE.name,
			            LENGTH(COUNTRY.name), CAST(COUNTRY.name AS UNSIGNED), COUNTRY.name,
			            LENGTH(PROVINCE.name), CAST(PROVINCE.name AS UNSIGNED), PROVINCE.name,
			            LENGTH(CITY.name), CAST(CITY.name AS UNSIGNED), CITY.name
			";
			
			$query = "
			$sqlStatement
			$whereCondition
			$orderCondition
			";
			
			try {
				return Model::$db->rawQuery($query);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
			
		}
		
		public static function fetchByPackageName(string $name = ""): array
		{
			$sqlStatement = self::$sql;
			$searchTerm = addslashes($name);
			$whereCondition = "
			WHERE       PACKAGE.name LIKE '%$searchTerm%'
			";
			$orderCondition = "
			ORDER BY    LENGTH(PACKAGE.name), CAST(PACKAGE.name AS UNSIGNED), PACKAGE.name,
			            LENGTH(COUNTRY.name), CAST(COUNTRY.name AS UNSIGNED), COUNTRY.name,
			            LENGTH(PROVINCE.name), CAST(PROVINCE.name AS UNSIGNED), PROVINCE.name,
			            LENGTH(CITY.name), CAST(CITY.name AS UNSIGNED), CITY.name
			";
			
			$query = "
			$sqlStatement
			$whereCondition
			$orderCondition
			";
			
			try {
				return Model::$db->rawQuery($query);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
			
		}
		
	}
