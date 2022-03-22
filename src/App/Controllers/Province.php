<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\ProvinceModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short Province Description
	 * Long Province Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Province extends Controller
	{
		public function __construct()
		{
			parent::__construct();
		}
		
		/**
		 * API get request
		 *
		 * @param array $args
		 */
		public static function serveGet(array $args = []): void
		{
			$country_id = null;
			$province_id = null;
			$provinces = [];
			
			if (isset($args["country_id"]) && intval($args["country_id"]) > 0) {
				$country_id = (int)$args["country_id"];
			}
			
			if (isset($args["province_id"]) && intval($args["province_id"]) > 0) {
				$province_id = (int)$args["province_id"];
			}
			
			$result = ProvinceModel::get($country_id, $province_id);
			foreach ($result AS $k => $province) {
				$provinces[] = self::format($province);
			}
			View::render_json($provinces);
			exit(0);
		}
		
		public static function get(array $args = []): array
		{
			$country_id = null;
			$province_id = null;
			$provinces = [];
			
			if (isset($args["country_id"]) && intval($args["country_id"]) > 0) {
				$country_id = (int)$args["country_id"];
			}
			
			if (isset($args["province_id"]) && intval($args["province_id"]) > 0) {
				$province_id = (int)$args["province_id"];
			}
			
			$result = ProvinceModel::get($country_id, $province_id);
			foreach ($result AS $k => $province) {
				$provinces[] = self::format($province);
			}
			
			return $provinces;
		}
		
		public static function serveUpdate(array $args = []): void
		{
			if (!isset($args["country_id"], $args["name"], $args["iso2"], $args["iso3"])) {
				View::render_invalid_json("Missing Fields");
				exit(0);
			}
			
			$result = ProvinceModel::update($args);
			$provinces = array();
			foreach ($result AS $k => $province) {
				$provinces[] = self::format($province);
			}
			
			View::render_json($provinces);
			exit(0);
		}
		
		private static function format(array $province = []): array
		{
			return array(
				"id" => $province["province_id"],
				"country_id" => $province["province_country_id"],
				"sort_order" => $province["province_sort_order"],
				"name" => $province["province_name"],
				"ios2" => $province["province_iso2"],
				"ios3" => $province["province_iso3"],
				"enabled" => $province["province_enabled"],
				"date_created" => $province["province_date_created"],
				"created_by" => $province["province_created_by"],
				"date_modified" => $province["province_date_modified"],
				"modified_by" => $province["province_modified_by"],
				"note" => $province["province_note"],
			);
		}
		
		public static function formatProvince(array $province = []): array
		{
			Log::$debug_log->trace("Province::formatProvince()");
			Log::$debug_log->info($province);
			// ----
			
			$formattedProvince = array();
			
			$provinceId = (isset($province["province_id"]) && (int)$province["province_id"] > 0) ? (int)$province["province_id"] : null;
			$provinceCountryId = (isset($province["province_country_id"]) && (int)$province["province_country_id"] > 0) ? (int)$province["province_country_id"] : null;
			$provinceSortOrder = (isset($province["province_sort_order"]) && (int)$province["province_sort_order"] > 0) ? (int)$province["province_sort_order"] : null;
			$provinceName = (isset($province["province_name"])) ? $province["province_name"] : null;
			$provinceISO2 = (isset($province["province_iso2"])) ? $province["province_iso2"] : null;
			$provinceISO3 = (isset($province["province_iso3"])) ? $province["province_iso3"] : null;
			$provinceEnabled = (isset($province["province_enabled"])) ? $province["province_enabled"] : 1;
			$provinceDateCreated = (isset($province["province_date_created"])) ? $province["province_date_created"] : null;
			$provinceCreatedBy = (isset($province["province_created_by"]) && (int)$province["province_created_by"] > 0) ? (int)$province["province_created_by"] : null;
			$provinceDateModified = (isset($province["province_date_modified"])) ? $province["province_date_modified"] : null;
			$provinceModifiedBy = (isset($province["province_modified_by"]) && (int)$province["province_modified_by"] > 0) ? (int)$province["province_modified_by"] : null;
			$provinceNote = (isset($province["province_note"])) ? $province["province_note"] : null;
			$provinceDisplayShort = (isset($province["province_display_short"])) ? $province["province_display_short"] : null;
			$provinceDisplayMedium = (isset($province["province_display_medium"])) ? $province["province_display_medium"] : null;
			$provinceLong = (isset($province["province_display_long"])) ? $province["province_display_long"] : null;
			$provinceBlurb = (isset($province["province_blurb"])) ? $province["province_blurb"] : null;
			
			$formattedProvince["blurb"] = $provinceBlurb;
			$formattedProvince["id"] = $provinceId;
			$formattedProvince["country_id"] = $provinceCountryId;
			$formattedProvince["sort_order"] = $provinceSortOrder;
			$formattedProvince["name"] = $provinceName;
			$formattedProvince["display_short"] = $provinceDisplayShort;
			$formattedProvince["display_medium"] = $provinceDisplayMedium;
			$formattedProvince["display_long"] = $provinceLong;
			$formattedProvince["ios2"] = $provinceISO2;
			$formattedProvince["ios3"] = $provinceISO3;
			$formattedProvince["enabled"] = $provinceEnabled;
			$formattedProvince["date_created"] = $provinceDateCreated;
			$formattedProvince["created_by"] = $provinceCreatedBy;
			$formattedProvince["date_modified"] = $provinceDateModified;
			$formattedProvince["modified_by"] = $provinceModifiedBy;
			$formattedProvince["note"] = $provinceNote;
			
			return $formattedProvince;
			
		}
		
	}
