<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\CityModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short City Description
	 * Long City Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class City extends Controller
	{
		public function __construct()
		{
			parent::__construct();
		}
		
		public static function getByCountryId(int $countryId = null): array
		{
			Log::$debug_log->trace("City::getByCountryId()");
			
			$cities = [];
			
			if (!is_null($countryId)) {
				$results = CityModel::fetchCitiesByCountryId($countryId);
				
				foreach ($results AS $k => $city) {
					$cities[] = self::format($city);
				}
			}
			
			return $cities;
		}
		
		public static function get(array $args = []): array
		{
			$country_id = null;
			$province_id = null;
			$city_id = null;
			$cities = array();
			
			// ----
			
			if (isset($args["country_id"]) && intval($args["country_id"]) > 0) {
				$country_id = (int)$args["country_id"];
			}
			
			if (isset($args["province_id"]) && intval($args["province_id"]) > 0) {
				$province_id = (int)$args["province_id"];
			}
			
			if (isset($args["city_id"]) && intval($args["city_id"]) > 0) {
				$city_id = (int)$args["city_id"];
			}
			
			$result = CityModel::get($country_id, $province_id, $city_id);
			
			foreach ($result AS $k => $city) {
				$cities[] = self::format($city);
			}
			
			return $cities;
			
		}
		
		public static function serveGet(array $args = []): void
		{
			$country_id = null;
			$province_id = null;
			$city_id = null;
			$cities = array();
			
			// ----
			
			if (isset($args["country_id"]) && intval($args["country_id"]) > 0) {
				$country_id = (int)$args["country_id"];
			}
			
			if (isset($args["province_id"]) && intval($args["province_id"]) > 0) {
				$province_id = (int)$args["province_id"];
			}
			
			if (isset($args["city_id"]) && intval($args["city_id"]) > 0) {
				$city_id = (int)$args["city_id"];
			}
			
			$result = CityModel::get($country_id, $province_id, $city_id);
			
			foreach ($result AS $k => $city) {
				$cities[] = self::format($city);
			}
			View::render_json($cities);
			exit(0);
			
		}
		
		public static function serveUpdate(array $args = []): void
		{
			if (!isset($args["country_id"], $args["name"], $args["province_id"])) {
				View::render_invalid_json("Missing Fields");
				exit(0);
			}
			$cities = array();
			$result = CityModel::update($args);
			
			foreach ($result AS $k => $city) {
				$cities[] = self::format($city);
			}
			
			View::render_json($cities);
			exit(0);
		}
		
		private static function format(array $city = []): array
		{
			return array(
				"id" => $city["city_id"],
				"country_id" => $city["city_country_id"],
				"province_id" => $city["city_province_id"],
				"sort_order" => $city["city_sort_order"],
				"name" => $city["city_name"],
				"enabled" => $city["city_enabled"],
				"date_created" => $city["city_date_created"],
				"created_by" => $city["city_created_by"],
				"date_modified" => $city["city_date_modified"],
				"modified_by" => $city["city_modified_by"],
				"note" => $city["city_note"],
			);
		}
		
		public static function autocomplete(string $st = ""): array
		{
			return self::format_ac(CityModel::city_ac($st));
		}
		
		private static function formatACRecord(array $city = []): array
		{
			return array(
				"id" => $city["city_id"],
				"country_id" => $city["city_country_id"],
				"province_id" => $city["city_province_id"],
				"sort_order" => $city["city_sort_order"],
				"name" => $city["city_name"],
				"enabled" => $city["city_enabled"],
				"date_created" => $city["city_date_created"],
				"created_by" => $city["city_created_by"],
				"date_modified" => $city["city_date_modified"],
				"modified_by" => $city["city_modified_by"],
				"note" => $city["city_note"],
				"city" => array(
					"id" => $city["city_id"],
					"province_id" => $city["city_province_id"],
					"country_id" => $city["city_country_id"],
					"sort_order" => $city["city_sort_order"],
					"name" => $city["city_name"],
					"enabled" => $city["city_enabled"],
					"date_created" => $city["city_date_created"],
					"created_by" => $city["city_created_by"],
					"date_modified" => $city["city_date_modified"],
					"modified_by" => $city["city_modified_by"],
					"note" => $city["city_note"],
				),
				"province" => array(
					"id" => $city["province_id"],
					"country_id" => $city["province_country_id"],
					"name" => $city["province_name"],
					"iso2" => $city["province_iso2"],
					"iso3" => $city["province_iso3"],
					"sort_order" => $city["province_sort_order"],
					"enabled" => $city["province_enabled"],
					"date_created" => $city["province_date_created"],
					"created_by" => $city["province_created_by"],
					"date_modified" => $city["province_date_modified"],
					"modified_by" => $city["province_modified_by"],
					"note" => $city["province_note"],
				),
				"country" => array(
					"id" => $city["country_id"],
					"currency_id" => $city["country_currency_id"],
					"sort_order" => $city["country_sort_order"],
					"name" => $city["country_name"],
					"iso2" => $city["country_iso2"],
					"iso3" => $city["country_iso3"],
					"enabled" => $city["country_enabled"],
					"date_created" => $city["country_date_created"],
					"created_by" => $city["country_created_by"],
					"date_modified" => $city["country_date_modified"],
					"modified_by" => $city["country_modified_by"],
					"note" => $city["country_note"],
				),
			);
		}
		
		private static function format_ac(array $results = []): array
		{
			$data["suggestions"] = [];
			foreach ($results AS $k => $city) {
				$l = (object)$city;
				$value = utf8_encode($l->location);
				
				array_push($data["suggestions"], [
					"value" => utf8_encode($value),
					"data" => self::formatACRecord($city),
				]);
				
			}
			
			return $data;
		}
		
		public static function formatCity(array $city = []): array
		{
			//Log::$debug_log->trace("City::formatCity()");
			//Log::$debug_log->info($city);
			// ----
			
			$formattedCity = array();
			
			$cityId = (isset($city["city_id"]) && (int)$city["city_id"] > 0) ? (int)$city["city_id"] : null;
			$cityProvinceId = (isset($city["city_province_id"]) && (int)$city["city_province_id"] > 0) ? (int)$city["city_province_id"] : null;
			$cityCountryId = (isset($city["city_country_id"]) && (int)$city["city_country_id"] > 0) ? (int)$city["city_country_id"] : null;
			$citySortOrder = (isset($city["city_sort_order"]) && (int)$city["city_sort_order"] > 0) ? (int)$city["city_sort_order"] : null;
			$cityName = (isset($city["city_name"])) ? $city["city_name"] : null;
			$cityEnabled = (isset($city["city_enabled"])) ? $city["city_enabled"] : 1;
			$cityDateCreated = (isset($city["city_date_created"])) ? $city["city_date_created"] : null;
			$cityCreatedBy = (isset($city["city_created_by"]) && (int)$city["city_created_by"] > 0) ? (int)$city["city_created_by"] : null;
			$cityDateModified = (isset($city["city_date_modified"])) ? $city["city_date_modified"] : null;
			$cityModifiedBy = (isset($city["city_modified_by"]) && (int)$city["city_modified_by"] > 0) ? (int)$city["city_modified_by"] : null;
			$cityNote = (isset($city["city_note"])) ? $city["city_note"] : null;
			$cityBlurb = (isset($city["city_blurb"])) ? $city["city_blurb"] : null;
			
			$formattedCity["blurb"] = $cityBlurb;
			$formattedCity["country_id"] = $cityCountryId;
			$formattedCity["created_by"] = $cityCreatedBy;
			$formattedCity["date_created"] = $cityDateCreated;
			$formattedCity["date_modified"] = $cityDateModified;
			$formattedCity["enabled"] = $cityEnabled;
			$formattedCity["id"] = $cityId;
			$formattedCity["modified_by"] = $cityModifiedBy;
			$formattedCity["name"] = $cityName;
			$formattedCity["note"] = $cityNote;
			$formattedCity["province_id"] = $cityProvinceId;
			$formattedCity["sort_order"] = $citySortOrder;
			
			return $formattedCity;
			
		}
		
	}
