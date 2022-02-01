<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\AirportModel;
	use Framework\App\Models\VariantModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short Airport Description
	 * Long Airport Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Airport extends Controller
	{
		/**
		 * controller method
		 */
		public function __construct()
		{
			parent::__construct();
		}
		
		public static function autocomplete(string $st = ""): array
		{
			$results = AirportModel::airport_ac($st);
			
			if (isset($results["errors"])) {
				return [];
			} else {
				$airports = self::format_ac($results);
			}
			
			return $airports;
		}
		
		public static function validateName(array $args = []): array
		{
			$airports = array();
			
			$name = (isset($args["name"])) ? (string)$args["name"] : null;
			
			$results = AirportModel::getByName($name);
			
			if (isset($results["errors"])) {
				header("Content-type:application/json");
				View::render_invalid_json($results);
				exit(0);
			}
			
			foreach ($results AS $k => $airport) {
				$airports[] = self::format($airport);
			}
			
			/**
			 * render variant json
			 */
			header("Content-type:application/json");
			View::render_json($airports);
			exit(0);
		}
		
		public static function serveUpdate(array $params = []): void
		{
			$airports = [];
			
			$results = AirportModel::updateAirportRecord($params);
			
			foreach ($results AS $airport) {
				$airports[] = self::format($airport);
			}
			
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			View::render_json($airports);
			exit(0);
		}
		
		/**
		 * Format Autocomplete DataSet
		 *
		 * @param array|null $airports
		 *
		 * @return array
		 */
		private static function format_ac(array $airports = null): array
		{
			if (is_null($airports)) {
				return [];
			}
			
			$data["suggestions"] = [];
			foreach ($airports AS $k => $airport) {
				$l = (object)$airport;
				
				if (LOCATIONDISPLAY === "short") {
					$value = utf8_encode($l->display_short);
				} else if (LOCATIONDISPLAY === "medium") {
					$value = utf8_encode($l->display_medium);
				} else if (LOCATIONDISPLAY === "long") {
					$value = utf8_encode($l->display_long);
				} else {
					$value = utf8_encode($l->airport_name);
				}
				
				array_push($data["suggestions"], [
					"value" => utf8_encode($value),
					"data" => self::format($airport),
				]);
			}
			
			return $data;
			
		}
		
		/**
		 * format result set
		 *
		 * @param array|null $airport
		 *
		 * @return array
		 */
		private static function format(array $airport = null): array
		{
			if (is_null($airport)) {
				return [];
			}
			
			return array(
				"id" => $airport["airport_id"],
				"display_short" => $airport["display_short"],
				"display_medium" => $airport["display_medium"],
				"display_long" => $airport["display_long"],
				"airport_types_id" => $airport["airport_types_id"],
				"name" => $airport["airport_name"],
				"iata_code" => $airport["airport_iata_code"],
				"gps_code" => $airport["airport_gps_code"],
				"local_code" => $airport["airport_local_code"],
				"home_link" => $airport["airport_home_link"],
				"wikipedia_link" => $airport["airport_wikipedia_link"],
				"scheduled_service" => $airport["airport_scheduled_service"],
				"keywords" => $airport["airport_keywords"],
				"enabled" => $airport["airport_enabled"],
				"date_created" => $airport["airport_date_created"],
				"created_by" => $airport["airport_created_by"],
				"date_modified" => $airport["airport_date_modified"],
				"modified_by" => $airport["airport_modified_by"],
				"note" => $airport["airport_note"],
				"type" => array(
					"id" => $airport["airport_types_id"],
					"name" => $airport["airport_types_name"],
					"sort_order" => $airport["airport_types_sort_order"],
					"enabled" => $airport["airport_types_enabled"],
					"date_created" => $airport["airport_types_date_created"],
					"created_by" => $airport["airport_types_created_by"],
					"date_modified" => $airport["airport_types_date_modified"],
					"modified_by" => $airport["airport_types_modified_by"],
					"note" => $airport["airport_types_note"],
				),
				"country" => array(
					"id" => $airport["country_id"],
					"currency_id" => $airport["country_currency_id"],
					"sort_order" => $airport["country_sort_order"],
					"name" => $airport["country_name"],
					"iso2" => $airport["country_iso2"],
					"iso3" => $airport["country_iso3"],
					"blurb" => $airport["country_blurb"],
					"enabled" => $airport["country_enabled"],
					"date_created" => $airport["country_date_created"],
					"created_by" => $airport["country_created_by"],
					"date_modified" => $airport["country_date_modified"],
					"modified_by" => $airport["country_modified_by"],
					"note" => $airport["country_note"],
				),
				"province" => array(
					"id" => $airport["province_id"],
					"country_id" => $airport["province_country_id"],
					"name" => $airport["province_name"],
					"iso2" => $airport["province_iso2"],
					"iso3" => $airport["province_iso3"],
					"sort_order" => $airport["province_sort_order"],
					"blurb" => $airport["province_blurb"],
					"enabled" => $airport["province_enabled"],
					"date_created" => $airport["province_date_created"],
					"created_by" => $airport["province_created_by"],
					"date_modified" => $airport["province_date_modified"],
					"modified_by" => $airport["province_modified_by"],
					"note" => $airport["province_note"],
				),
				"city" => array(
					"id" => $airport["city_id"],
					"province_id" => $airport["city_province_id"],
					"country_id" => $airport["city_country_id"],
					"sort_order" => $airport["city_sort_order"],
					"name" => $airport["city_name"],
					"blurb" => $airport["city_blurb"],
					"enabled" => $airport["city_enabled"],
					"date_created" => $airport["city_date_created"],
					"created_by" => $airport["city_created_by"],
					"date_modified" => $airport["city_date_modified"],
					"modified_by" => $airport["city_modified_by"],
					"note" => $airport["city_note"],
				),
			);
		}
		
	}
