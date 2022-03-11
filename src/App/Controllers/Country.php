<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\CityModel;
	use Framework\App\Models\CountryModel;
	use Framework\App\Models\SeasonModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short Country Description
	 * Long Country Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Country extends Controller
	{
		public function __construct()
		{
			parent::__construct();
		}
		
		public static function autocomplete(string $st = ""): array
		{
			return self::format_ac(CountryModel::country_ac($st));
		}
		
		public static function serveGet(array $args = []): void
		{
			$id = null;
			$countries = [];
			if (isset($args["id"])) {
				$id = (int)$args["id"];
			}
			$result = CountryModel::get($id);
			foreach ($result AS $k => $country) {
				$countries[] = self::format($country);
			}
			View::render_json($countries);
			exit(0);
		}
		
		public static function get(array $args = []): array
		{
			$id = null;
			$countries = [];
			if (isset($args["id"])) {
				$id = (int)$args["id"];
			}
			$result = CountryModel::get($id);
			foreach ($result AS $k => $country) {
				$countries[] = self::format($country);
			}
			
			return $countries;
		}
		
		public static function serveUpdate(array $args = []): void
		{
			if (!isset($args["name"], $args["iso2"], $args["iso3"])) {
				View::render_invalid_json("Missing Fields");
				exit(0);
			}
			
			$result = CountryModel::update($args);
			
			$countries = array();
			foreach ($result AS $k => $country) {
				$countries[] = self::format($country);
			}
			
			View::render_json($countries);
			exit(0);
		}
		
		public static function validateName(array $args = []): array
		{
			$countries = array();
			$name = (isset($args["name"])) ? (string)$args["name"] : null;
			//Log::$debug_log->trace($name);
			
			$results = CountryModel::fetchByCountryName($name);
			
			foreach ($results AS $k => $country) {
				$countries[] = self::format($country);
			}
			
			/**
			 * render variant json
			 */
			header("Content-type:application/json");
			View::render_json($countries);
			exit(0);
		}
		
		private static function format(array $country = []): array
		{
			//Log::$debug_log->trace($country);
			
			$name = (isset($country["country_name"])) ? $country["country_name"] : null;
			$sort_order = (isset($country["country_sort_order"])) ? $country["country_sort_order"] : 9999999999;
			$iso3 = (isset($country["country_iso3"])) ? $country["country_iso3"] : null;
			$iso2 = (isset($country["country_iso2"])) ? $country["country_iso2"] : null;
			
			$displayLong = "";
			$displayMedium = "";
			$displayShort = "";
			
			if (!is_null($name)) {
				$displayShort = $name;
				$displayMedium = $name;
				if (!is_null($iso3)) {
					$displayLong = "$iso3 - $name";
				} else {
					if (!is_null($iso2)) {
						$displayLong = "$iso2 - $name";
					} else {
						$displayLong = "$name";
					}
				}
			}
			
			if (!is_null($iso3)) {
				$displayShort = "$iso3";
			} else {
				if (!is_null($iso2)) {
					$displayShort = "$iso2";
				} else {
					$displayShort = "$name";
				}
			}
			
			return array(
				"id" => $country["country_id"],
				"currency_id" => $country["country_currency_id"],
				"sort_order" => $sort_order,
				"name" => $country["country_name"],
				"iso2" => $country["country_iso2"],
				"iso3" => $country["country_iso3"],
				"enabled" => $country["country_enabled"],
				"date_created" => $country["country_date_created"],
				"created_by" => $country["country_created_by"],
				"date_modified" => $country["country_date_modified"],
				"modified_by" => $country["country_modified_by"],
				"note" => $country["country_note"],
				"display_short" => $displayShort,
				"display_medium" => $displayMedium,
				"display_long" => $displayLong,
			);
		}
		
		private static function formatACRecord(array $country = []): array
		{
			//Log::$debug_log->trace($country);
			$name = (isset($country["country_name"])) ? $country["country_name"] : null;
			$sort_order = (isset($country["country_sort_order"])) ? $country["country_sort_order"] : 9999999999;
			$iso3 = (isset($country["country_iso3"])) ? $country["country_iso3"] : null;
			$iso2 = (isset($country["country_iso2"])) ? $country["country_iso2"] : null;
			
			$displayLong = "";
			$displayMedium = "";
			$displayShort = "";
			
			if (!is_null($name)) {
				$displayShort = $name;
				$displayMedium = $name;
				if (!is_null($iso3)) {
					$displayLong = "$iso3 - $name";
				} else {
					if (!is_null($iso2)) {
						$displayLong = "$iso2 - $name";
					} else {
						$displayLong = "$name";
					}
				}
			}
			
			if (!is_null($iso3)) {
				$displayShort = "$iso3";
			} else {
				if (!is_null($iso2)) {
					$displayShort = "$iso2";
				} else {
					$displayShort = "$name";
				}
			}
			
			return array(
				"id" => $country["country_id"],
				"currency_id" => $country["country_currency_id"],
				"sort_order" => $sort_order,
				"name" => $name,
				"iso2" => $iso2,
				"iso3" => $iso3,
				"enabled" => $country["country_enabled"],
				"date_created" => $country["country_date_created"],
				"created_by" => $country["country_created_by"],
				"date_modified" => $country["country_date_modified"],
				"modified_by" => $country["country_modified_by"],
				"note" => $country["country_note"],
				"display_short" => $displayShort,
				"display_medium" => $displayMedium,
				"display_long" => $displayLong,
			);
		}
		
		private static function format_ac(array $results = []): array
		{
			$data["suggestions"] = [];
			foreach ($results AS $k => $country) {
				
				$l = (object)$country;
				$location = "country_display_" . LOCATIONDISPLAY;
				
				$value = utf8_encode($country[$location]);
				
				array_push($data["suggestions"], [
					"value" => utf8_encode($value),
					"data" => self::formatACRecord($country),
				]);
				
			}
			
			return $data;
		}
		
	}
