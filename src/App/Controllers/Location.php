<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\LocationModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short Location Description
	 * Long Location Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Location extends Controller
	{
		/**
		 * constructor from Controller
		 */
		public function __construct()
		{
			parent::__construct();
		}
		
		// ----
		
		/**
		 * validate if named record exists
		 *
		 * @param array $args
		 *
		 * @return array
		 */
		public static function validateName(array $args = []): array
		{
			$locations = array();
			$default_display = (!isset($args["default_display"])) ? $args["default_display"] : "medium";
			if (isset($args["name"])) {
				$name = $args["name"];
				$results = LocationModel::getByName($name, $default_display);
				
				foreach ($results AS $k => $company) {
					$locations[] = self::format($company);
				}
			}
			
			/**
			 * render location json
			 */
			header("Content-type:application/json");
			View::render_json($locations);
			exit(0);
		}
		
		/**
		 * autocomplete method
		 *
		 * @param string $st
		 * @param string $default_display
		 *
		 * @return array
		 */
		public static function autocomplete(string $st = "", string $default_display = "medium"): array
		{
			return self::format_ac(LocationModel::location_ac($st, $default_display), $default_display);
		}
		
		// ----
		
		/**
		 * update request
		 *
		 * @param array $params
		 */
		public static function serveUpdate(array $params = [])
		{
			$locations = array();
			$results = LocationModel::update($params);
			foreach ($results AS $location) {
				$locations[] = self::formatObject($location);
			}
			
			/**
			 * render location json
			 */
			header("Content-type:application/json");
			View::render_json($locations);
			exit(0);
		}
		
		public static function update(array $params = []): array
		{
			$locations = array();
			$location_types_id = (isset($params["location_types_id"])) ? (int)$params["location_types_id"] : null;
			$location_city_id = (isset($params["city_id"])) ? (int)$params["city_id"] : null;
			$location_id = (isset($params["id"])) ? (int)$params["id"] : null;
			$location_name = ($params["name"]) ? (string)$params["name"] : null;
			$args = array(
				"location_types_id" => $location_types_id,
				"city_id" => $location_city_id,
				"id" => $location_id,
				"name" => $location_name,
			);
			//Log::$debug_log->trace($args);
			$results = LocationModel::update($args);
			//Log::$debug_log->trace($results);
			foreach ($results AS $location) {
				$locations[] = self::formatObject($location);
			}
			
			//Log::$debug_log->trace($locations);
			
			return $locations;
		}
		
		// ----
		
		/**
		 * get location by location id
		 *
		 * @param int|null $location_id
		 *
		 * @return array
		 */
		public static function getByLocationId(int $location_id = null): array
		{
			$locations = [];
			$results = LocationModel::get((int)$location_id);
			foreach ($results AS $k => $location) {
				$locations[] = self::format_location($location);
			}
			
			if (count($locations) === 1) {
				return $locations[0];
			}
			
			return $locations;
		}
		
		public static function getByCityId(int $city_id = null, string $name = null): array
		{
			$locations = [];
			$results = LocationModel::fetchLocationByCityIdAndName($city_id, $name);
			foreach ($results AS $k => $location) {
				$locations[] = self::format_location($location);
			}
			
			if (count($locations) === 1) {
				return $locations[0];
			}
			
			return $locations;
		}
		
		/**
		 * get location by name
		 *
		 * @param array $params
		 */
		public static function getByLocationName(array $params = []): void
		{
			$name = $_GET["name"] ?? "";
			$city_id = $_GET["city_id"] ?? "";
			$display = $_GET["display"] ?? "medium";
			
			/**
			 * render location json
			 */
			header("Content-type:application/json");
			View::render_json(self::get((string)$name, (int)$city_id, (string)$display));
			exit(0);
		}
		
		/**
		 * serve get request
		 *
		 * @param string|null $location_name
		 * @param int|null    $city_id
		 * @param string      $default_display
		 *
		 * @return array
		 */
		public static function get(string $location_name = null, int $city_id = null, string $default_display = "medium"): array
		{
			$locations = [];
			$results = LocationModel::getByName((string)$location_name, (int)$city_id, (string)$default_display);
			foreach ($results AS $k => $location) {
				$locations[] = self::format_location($location);
			}
			
			if (count($locations) === 1) {
				return $locations[0];
			}
			
			return $locations;
		}
		
		/**
		 * serve get request
		 *
		 * @param array $params
		 */
		public function serveGet(array $params = []): void
		{
			$locations = array();
			if (isset($params["location_id"])) {
				$location_id = (int)$params["location_id"];
				$results = LocationModel::get($location_id);
				foreach ($results AS $location) {
					$locations[] = self::formatObject($location);
				}
			}
			
			/**
			 * render location json
			 */
			header("Content-type:application/json");
			View::render_json($locations);
			exit(0);
		}
		
		// ----
		
		/**
		 * format autocorrect results
		 *
		 * @param array  $locations
		 * @param string $default_display
		 *
		 * @return array
		 */
		private static function format_ac(array $locations = [], string $default_display = "medium"): array
		{
			$data["suggestions"] = [];
			
			foreach ($locations AS $k => $location) {
				$l = (object)$location;
				if ($default_display === "short") {
					$value = utf8_encode($l->location_short);
				} else {
					if ($default_display === "long") {
						$value = utf8_encode($l->location_long);
					} else {
						$value = utf8_encode($l->location);
					}
				}
				
				array_push($data["suggestions"], [
					"value" => utf8_encode($value),
					"data" => self::format($location),
				]);
			}
			
			return $data;
		}
		
		/**
		 * format location record
		 *
		 * @param array|null $location
		 *
		 * @return array
		 */
		private static function format_location(array $location = null): array
		{
			if (is_null($location)) {
				return [];
			}
			
			return array(
				"display_short" => $location["location_short"],
				"display_medium" => $location["location"],
				"display_long" => $location["location_long"],
				"id" => $location["location_id"],
				"enabled" => $location["location_enabled"],
				"name" => $location["location_name"],
				"street_1" => $location["location_street_1"],
				"street_2" => $location["location_street_2"],
				"zipcode" => $location["location_zipcode"],
				"type" => array(
					"id" => $location["location_types_id"],
					"name" => $location["location_types_name"],
					"icon" => $location["location_types_icon"],
					"sort_order" => $location["location_types_sort_order"],
					"enabled" => $location["location_types_enabled"],
					"date_created" => $location["location_types_date_created"],
					"created_by" => $location["location_types_created_by"],
					"date_modified" => $location["location_types_date_modified"],
					"modified_by" => $location["location_types_modified_by"],
					"note" => $location["location_types_note"],
				),
				"country" => array(
					"id" => $location["country_id"],
					"name" => $location["country_name"],
					"name_long" => $location["country_name_long"],
					"iso2" => $location["country_iso2"],
					"iso3" => $location["country_iso3"],
					"sort_order" => $location["country_sort_order"],
					"enabled" => $location["country_enabled"],
					"date_created" => $location["country_date_created"],
					"created_by" => $location["country_created_by"],
					"date_modified" => $location["country_date_modified"],
					"modified_by" => $location["country_modified_by"],
					"note" => $location["country_note"],
				),
				"province" => array(
					"id" => $location["province_id"],
					"name" => $location["province_name"],
					"name_long" => $location["province_name_long"],
					"iso2" => $location["province_iso2"],
					"iso3" => $location["province_iso3"],
					"sort_order" => $location["province_sort_order"],
					"enabled" => $location["province_enabled"],
					"date_created" => $location["province_date_created"],
					"created_by" => $location["province_created_by"],
					"date_modified" => $location["province_date_modified"],
					"modified_by" => $location["province_modified_by"],
					"note" => $location["province_note"],
				),
				"city" => array(
					"id" => $location["city_id"],
					"name" => $location["city_name"],
					"sort_order" => $location["city_sort_order"],
					"enabled" => $location["city_enabled"],
					"date_created" => $location["city_date_created"],
					"created_by" => $location["city_created_by"],
					"date_modified" => $location["city_date_modified"],
					"modified_by" => $location["city_modified_by"],
					"note" => $location["city_note"],
				),
			);
		}
		
		/**
		 * format results
		 *
		 * @param null $location
		 *
		 * @return array
		 */
		private static function format($location = null): array
		{
			if (is_null($location)) {
				return [];
			}
			
			return array(
				"display_short" => $location->location_short,
				"display_medium" => $location->location,
				"display_long" => $location->location_long,
				"id" => $location->location_id,
				"enabled" => $location->location_enabled,
				"name" => $location->location_name,
				"street_1" => $location->location_street_1,
				"street_2" => $location->location_street_2,
				"zipcode" => $location->location_zipcode,
				"type" => array(
					"id" => $location->location_types_id,
					"name" => $location->location_types_name,
					"icon" => $location->location_types_icon,
					"sort_order" => $location->location_types_sort_order,
					"enabled" => $location->location_types_enabled,
					"date_created" => $location->location_types_date_created,
					"created_by" => $location->location_types_created_by,
					"date_modified" => $location->location_types_date_modified,
					"modified_by" => $location->location_types_modified_by,
					"note" => $location->location_types_note,
				),
				"country" => array(
					"id" => $location->country_id,
					"name" => $location->country_name,
					"name_long" => $location->country_name_long,
					"iso2" => $location->country_iso2,
					"iso3" => $location->country_iso3,
					"sort_order" => $location->country_sort_order,
					"enabled" => $location->country_enabled,
					"date_created" => $location->country_date_created,
					"created_by" => $location->country_created_by,
					"date_modified" => $location->country_date_modified,
					"modified_by" => $location->country_modified_by,
					"note" => $location->country_note,
				),
				"province" => array(
					"id" => $location->province_id,
					"name" => $location->province_name,
					"name_long" => $location->province_name_long,
					"iso2" => $location->province_iso2,
					"iso3" => $location->province_iso3,
					"sort_order" => $location->province_sort_order,
					"enabled" => $location->province_enabled,
					"date_created" => $location->province_date_created,
					"created_by" => $location->province_created_by,
					"date_modified" => $location->province_date_modified,
					"modified_by" => $location->province_modified_by,
					"note" => $location->province_note,
				),
				"city" => array(
					"id" => $location->city_id,
					"name" => $location->city_name,
					"sort_order" => $location->city_sort_order,
					"enabled" => $location->city_enabled,
					"date_created" => $location->city_date_created,
					"created_by" => $location->city_created_by,
					"date_modified" => $location->city_date_modified,
					"modified_by" => $location->city_modified_by,
					"note" => $location->city_note,
				),
			);
		}
		
		/**
		 * formatObject
		 *
		 * @param array|null $location
		 *
		 * @return array
		 */
		private static function formatObject(array $location = null): array
		{
			return array(
				"display_short" => (isset($location["location_short"])) ? $location["location_short"] : null,
				"display_medium" => $location["location"],
				"display_long" => $location["location_long"],
				"id" => $location["location_id"],
				"enabled" => $location["location_enabled"],
				"name" => $location["location_name"],
				"street_1" => $location["location_street_1"],
				"street_2" => $location["location_street_2"],
				"zipcode" => $location["location_zipcode"],
				"type" => array(
					"id" => $location["location_types_id"],
					"name" => $location["location_types_name"],
					"icon" => $location["location_types_icon"],
					"sort_order" => $location["location_types_sort_order"],
					"enabled" => $location["location_types_enabled"],
					"date_created" => $location["location_types_date_created"],
					"created_by" => $location["location_types_created_by"],
					"date_modified" => $location["location_types_date_modified"],
					"modified_by" => $location["location_types_modified_by"],
					"note" => $location["location_types_note"],
				),
				"country" => array(
					"id" => $location["country_id"],
					"name" => $location["country_name"],
					"name_long" => $location["country_name_long"],
					"iso2" => $location["country_iso2"],
					"iso3" => $location["country_iso3"],
					"sort_order" => $location["country_sort_order"],
					"enabled" => $location["country_enabled"],
					"date_created" => $location["country_date_created"],
					"created_by" => $location["country_created_by"],
					"date_modified" => $location["country_date_modified"],
					"modified_by" => $location["country_modified_by"],
					"note" => $location["country_note"],
				),
				"province" => array(
					"id" => $location["province_id"],
					"name" => $location["province_name"],
					"name_long" => $location["province_name_long"],
					"iso2" => $location["province_iso2"],
					"iso3" => $location["province_iso3"],
					"sort_order" => $location["province_sort_order"],
					"enabled" => $location["province_enabled"],
					"date_created" => $location["province_date_created"],
					"created_by" => $location["province_created_by"],
					"date_modified" => $location["province_date_modified"],
					"modified_by" => $location["province_modified_by"],
					"note" => $location["province_note"],
				),
				"city" => array(
					"id" => $location["city_id"],
					"name" => $location["city_name"],
					"sort_order" => $location["city_sort_order"],
					"enabled" => $location["city_enabled"],
					"date_created" => $location["city_date_created"],
					"created_by" => $location["city_created_by"],
					"date_modified" => $location["city_date_modified"],
					"modified_by" => $location["city_modified_by"],
					"note" => $location["city_note"],
				),
			);
		}
		
	}
