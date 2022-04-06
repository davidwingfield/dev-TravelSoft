<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\PackageModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short Package Description
	 * Long Package Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Package extends Controller
	{
		public function __construct()
		{
			parent::__construct();
		}
		
		/**
		 * autocompleteSearch method
		 *
		 * @param string $st
		 *
		 * @return array
		 */
		public static function autocompleteSearch(string $st = ""): array
		{
			$packages = [];
			$packages["suggestions"] = [];
			
			foreach (PackageModel::fetchByPackageName($st) AS $k => $package) {
				$formattedPackage = self::formatAutocomplete($package);
				$l = (object)$formattedPackage;
				$value = utf8_encode($l->name);
				
				$packages["suggestions"][] = [
					"value" => utf8_encode($value),
					"data" => $formattedPackage,
				];
			}
			
			return $packages;
			
		}
		
		public static function serveGet(array $params = [])
		{
			$packages = array();
			$id = (isset($params["package_id"]) && (int)$params["package_id"] > 0) ? (int)$params["package_id"] : null;
			$results = PackageModel::get($id);
			
			foreach ($results AS $k => $package) {
				$packages[] = self::formatAutocomplete($package);
			}
			// ----
			View::render_json($packages);
			exit(0);
		}
		
		public static function serveUpdate(array $params = []): void
		{
			$packages = array();
			$results = self::update($params);
			foreach ($results AS $k => $package) {
				$packages[] = self::formatAutocomplete($package);
			}
			// ----
			View::render_json($packages);
			exit(0);
		}
		
		public static function update(array $params = []): array
		{
			
			return PackageModel::updatePackageRecord($params);
		}
		
		private static function formatAutocomplete($package)
		{
			$country = array(
				'id' => $package['country_id'],
				'currency_id' => $package['country_currency_id'],
				'sort_order' => $package['country_sort_order'],
				'name' => $package['country_name'],
				'iso2' => $package['country_iso2'],
				'iso3' => $package['country_iso3'],
				'blurb' => $package['country_blurb'],
				'enabled' => $package['country_enabled'],
				'date_created' => $package['country_date_created'],
				'created_by' => $package['country_created_by'],
				'date_modified' => $package['country_date_modified'],
				'modified_by' => $package['country_modified_by'],
				'note' => $package['country_note'],
			);
			$province = array(
				'id' => $package['province_id'],
				'country_id' => $package['province_country_id'],
				'name' => $package['province_name'],
				'iso2' => $package['province_iso2'],
				'iso3' => $package['province_iso3'],
				'sort_order' => $package['province_sort_order'],
				'blurb' => $package['province_blurb'],
				'enabled' => $package['province_enabled'],
				'date_created' => $package['province_date_created'],
				'created_by' => $package['province_created_by'],
				'date_modified' => $package['province_date_modified'],
				'modified_by' => $package['province_modified_by'],
				'note' => $package['province_note'],
			);
			$city = array(
				'id' => $package['city_id'],
				'province_id' => $package['city_province_id'],
				'country_id' => $package['city_country_id'],
				'sort_order' => $package['city_sort_order'],
				'name' => $package['city_name'],
				'blurb' => $package['city_blurb'],
				'is_capital' => $package['city_is_capital'],
				'enabled' => $package['city_enabled'],
				'date_created' => $package['city_date_created'],
				'created_by' => $package['city_created_by'],
				'date_modified' => $package['city_date_modified'],
				'modified_by' => $package['city_modified_by'],
				'note' => $package['city_note'],
				"country" => $country,
				"province" => $province,
			);
			$currency = array(
				'id' => $package['currency_id'],
				'sort_order' => $package['currency_sort_order'],
				'name' => $package['currency_name'],
				'iso' => $package['currency_iso'],
				'minor_unit' => $package['currency_minor_unit'],
				'symbol' => $package['currency_symbol'],
				'enabled' => $package['currency_enabled'],
				'date_created' => $package['currency_date_created'],
				'created_by' => $package['currency_created_by'],
				'date_modified' => $package['currency_date_modified'],
				'modified_by' => $package['currency_modified_by'],
				'note' => $package['currency_note'],
			);
			
			return array(
				'id' => $package['package_id'],
				'name' => $package['package_name'],
				'day_span' => $package['package_day_span'],
				'city_id' => $package['package_city_id'],
				'min_pax' => $package['package_min_pax'],
				'max_pax' => $package['package_max_pax'],
				'description_long' => $package['package_description_long'],
				'description_short' => $package['package_description_short'],
				'available_start' => $package['package_available_start'],
				'available_end' => $package['package_available_end'],
				'cost' => $package['package_cost'],
				'price' => $package['package_price'],
				'margin' => $package['package_margin'],
				'enabled' => $package['package_enabled'],
				'date_created' => $package['package_date_created'],
				'created_by' => $package['package_created_by'],
				'date_modified' => $package['package_date_modified'],
				'modified_by' => $package['package_modified_by'],
				'note' => $package['package_note'],
				"city" => $city,
				"currency" => $currency,
			);
		}
		
		private static function format($package)
		{
			return $package;
		}
		
	}
