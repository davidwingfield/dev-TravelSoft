<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\StationModel;
	use Framework\App\Models\VariantModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short Station Description
	 * Long Station Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Station extends Controller
	{
		public function __construct()
		{
			parent::__construct();
		}
		
		public static function autocomplete(string $st = ""): array
		{
			$results = StationModel::fetchAutocomplete($st);
			
			if (isset($results["errors"])) {
				return [];
			} else {
				$stations = self::formatAutocomplete($results);
			}
			
			return $stations;
		}
		
		public static function validate(array $args = []): array
		{
			$stations = array();
			
			$name = (isset($args["name"])) ? (string)$args["name"] : null;
			
			$results = StationModel::fetchStationByStationName($name);
			
			if (isset($results["errors"])) {
				header("Content-type:application/json");
				View::render_invalid_json($results);
				exit(0);
			}
			
			foreach ($results AS $k => $station) {
				$stations[] = self::format($station);
			}
			
			/**
			 * render variant json
			 */
			header("Content-type:application/json");
			View::render_json($stations);
			exit(0);
		}
		
		public static function update(array $params = []): void
		{
			$stations = [];
			
			$results = StationModel::updateStationRecord($params);
			
			foreach ($results AS $station) {
				$stations[] = self::format($station);
			}
			
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			View::render_json($stations);
			exit(0);
		}
		
		//
		
		private static function format(array $station = null): array
		{
			if (is_null($station)) {
				return [];
			}
			
			return array(
				"id" => $station["station_id"],
				"display_short" => $station["display_short"],
				"display_medium" => $station["display_medium"],
				"display_long" => $station["display_long"],
				"name" => $station["station_name"],
				"iata_code" => $station["station_iata_code"],
				"keywords" => $station["station_keywords"],
				"enabled" => $station["station_enabled"],
				"date_created" => $station["station_date_created"],
				"created_by" => $station["station_created_by"],
				"date_modified" => $station["station_date_modified"],
				"modified_by" => $station["station_modified_by"],
				"note" => $station["station_note"],
				"country" => array(
					"id" => $station["country_id"],
					"currency_id" => $station["country_currency_id"],
					"sort_order" => $station["country_sort_order"],
					"name" => $station["country_name"],
					"iso2" => $station["country_iso2"],
					"iso3" => $station["country_iso3"],
					"blurb" => $station["country_blurb"],
					"enabled" => $station["country_enabled"],
					"date_created" => $station["country_date_created"],
					"created_by" => $station["country_created_by"],
					"date_modified" => $station["country_date_modified"],
					"modified_by" => $station["country_modified_by"],
					"note" => $station["country_note"],
				),
				"province" => array(
					"id" => $station["province_id"],
					"country_id" => $station["province_country_id"],
					"name" => $station["province_name"],
					"iso2" => $station["province_iso2"],
					"iso3" => $station["province_iso3"],
					"sort_order" => $station["province_sort_order"],
					"blurb" => $station["province_blurb"],
					"enabled" => $station["province_enabled"],
					"date_created" => $station["province_date_created"],
					"created_by" => $station["province_created_by"],
					"date_modified" => $station["province_date_modified"],
					"modified_by" => $station["province_modified_by"],
					"note" => $station["province_note"],
				),
				"city" => array(
					"id" => $station["city_id"],
					"province_id" => $station["city_province_id"],
					"country_id" => $station["city_country_id"],
					"sort_order" => $station["city_sort_order"],
					"name" => $station["city_name"],
					"blurb" => $station["city_blurb"],
					"enabled" => $station["city_enabled"],
					"date_created" => $station["city_date_created"],
					"created_by" => $station["city_created_by"],
					"date_modified" => $station["city_date_modified"],
					"modified_by" => $station["city_modified_by"],
					"note" => $station["city_note"],
				),
			);
		}
		
		private static function formatAutocomplete(array $stations = null): array
		{
			if (is_null($stations)) {
				return [];
			}
			
			$data["suggestions"] = [];
			foreach ($stations AS $k => $station) {
				$l = (object)$station;
				
				if (LOCATIONDISPLAY === "short") {
					$value = utf8_encode($l->display_short);
				} else if (LOCATIONDISPLAY === "medium") {
					$value = utf8_encode($l->display_medium);
				} else if (LOCATIONDISPLAY === "long") {
					$value = utf8_encode($l->display_long);
				} else {
					$value = utf8_encode($l->station_name);
				}
				
				array_push($data["suggestions"], [
					"value" => utf8_encode($value),
					"data" => self::format($station),
				]);
			}
			
			return $data;
			
		}
		
	}
