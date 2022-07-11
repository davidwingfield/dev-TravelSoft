<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\PackageModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Package handles package methods.
	 * Long Package Description.
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Package extends Controller
	{
		protected static $buttons = array(
			"new" => array(
				"type" => "a",
				"href" => "javascript:void(0)",
				"classes" => "btn btn-primary btn-heading",
				"icon" => "fas fa-plus",
				"id" => "button_add_package_page_heading",
				"data" => array(
					"toggle" => "tooltip",
					"title" => "Create a New Package",
					"placement" => "top",
				),
			),
		);
		protected static $tabs = array();
		
		public function __construct()
		{
			parent::__construct();
		}
		
		public static function index(): void
		{
			$data = Page::getDetails(28);
			
			/**
			 * breadcrumbs
			 */
			define("BREAD_CRUMBS", "
                <li class='breadcrumb-item'>
                    <a href='/'>Home</a>
                </li>
                <li class='breadcrumb-item'>
                    Packages
                </li>"
			);
			
			/**
			 * buttons
			 */
			$data["buttons"] = array(
				self::$buttons["new"],
			);
			
			$data["packages"] = self::get();
			
			/**
			 * header
			 */
			if (!defined("PAGEHEADINGCLASS")) {
				define("PAGEHEADINGCLASS", " ");
			}
			
			/**
			 * render index view
			 */
			View::render_template("packages/index", $data);
			exit(0);
			
		}
		
		public static function edit(array $params = []): void
		{
			$data = Page::getDetails(29);
			$packageId = ($params && $params["package_id"]) ? (int)$params["package_id"] : null;
			$package = self::get($params);
			
			if (count($package) > 0 && isset($package[0])) {
				$package = $package[0];
			}
			
			/**
			 * breadcrumbs
			 */
			define("BREAD_CRUMBS", "
                <li class='breadcrumb-item'>
                    <a href='/'>Home</a>
                </li>
                <li class='breadcrumb-item'>
                    <a href='/packages'>Packages</a>
                </li>
                <li class='breadcrumb-item'>
                    $packageId
                </li>"
			);
			
			$data["package"] = $package;
			
			/**
			 * render index view
			 */
			View::render_template("packages/edit", $data);
			exit(0);
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
		
		public static function get(array $params = []): array
		{
			$id = (isset($params["package_id"]) && (int)$params["package_id"] > 0) ? (int)$params["package_id"] : null;
			
			return self::format(PackageModel::fetch($id));
		}
		
		public static function getPackageProduct(array $params = []): array
		{
			
			$packageId = (isset($params["package_id"]) && (int)$params["package_id"] > 0) ? (int)$params["package_id"] : null;
			$productId = (isset($params["product_id"]) && (int)$params["product_id"] > 0) ? (int)$params["product_id"] : null;
			$unitId = (isset($params["unit_id"]) && (int)$params["unit_id"] > 0) ? (int)$params["unit_id"] : null;
			
			return self::format(PackageModel::fetchPackageProducts($packageId, $productId, $unitId));
			
		}
		
		public static function update(array $params = []): array
		{
			return PackageModel::updatePackageRecord($params);
		}
		
		public static function serveGet(array $params = [])
		{
			View::render_json(self::get($params));
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
		
		public static function serveUpdatePackageProduct(array $params = []): void
		{
			$results = PackageModel::updatePackageProductRecord($params);
			
			// ----
			View::render_json($results);
			exit(0);
		}
		
		public static function serveGetPackageProduct(array $params = []): void
		{
			View::render_json(self::getPackageProduct($params));
			exit(0);
		}
		
		private static function formatAutocomplete($package): array
		{
			$country = array(
				"id" => $package["country_id"],
				"currency_id" => $package["country_currency_id"],
				"sort_order" => $package["country_sort_order"],
				"name" => $package["country_name"],
				"iso2" => $package["country_iso2"],
				"iso3" => $package["country_iso3"],
				"blurb" => $package["country_blurb"],
				"enabled" => $package["country_enabled"],
				"date_created" => $package["country_date_created"],
				"created_by" => $package["country_created_by"],
				"date_modified" => $package["country_date_modified"],
				"modified_by" => $package["country_modified_by"],
				"note" => $package["country_note"],
			);
			$province = array(
				"id" => $package["province_id"],
				"country_id" => $package["province_country_id"],
				"name" => $package["province_name"],
				"iso2" => $package["province_iso2"],
				"iso3" => $package["province_iso3"],
				"sort_order" => $package["province_sort_order"],
				"blurb" => $package["province_blurb"],
				"enabled" => $package["province_enabled"],
				"date_created" => $package["province_date_created"],
				"created_by" => $package["province_created_by"],
				"date_modified" => $package["province_date_modified"],
				"modified_by" => $package["province_modified_by"],
				"note" => $package["province_note"],
			);
			$city = array(
				"id" => $package["city_id"],
				"province_id" => $package["city_province_id"],
				"country_id" => $package["city_country_id"],
				"sort_order" => $package["city_sort_order"],
				"name" => $package["city_name"],
				"blurb" => $package["city_blurb"],
				"is_capital" => $package["city_is_capital"],
				"enabled" => $package["city_enabled"],
				"date_created" => $package["city_date_created"],
				"created_by" => $package["city_created_by"],
				"date_modified" => $package["city_date_modified"],
				"modified_by" => $package["city_modified_by"],
				"note" => $package["city_note"],
				"country" => $country,
				"province" => $province,
			);
			$currency = array(
				"id" => $package["currency_id"],
				"sort_order" => $package["currency_sort_order"],
				"name" => $package["currency_name"],
				"iso" => $package["currency_iso"],
				"minor_unit" => $package["currency_minor_unit"],
				"symbol" => $package["currency_symbol"],
				"enabled" => $package["currency_enabled"],
				"date_created" => $package["currency_date_created"],
				"created_by" => $package["currency_created_by"],
				"date_modified" => $package["currency_date_modified"],
				"modified_by" => $package["currency_modified_by"],
				"note" => $package["currency_note"],
			);
			
			return array(
				"id" => $package["package_id"],
				"name" => $package["package_name"],
				"day_span" => $package["package_day_span"],
				"city_id" => $package["package_city_id"],
				"min_pax" => $package["package_min_pax"],
				"max_pax" => $package["package_max_pax"],
				"description_long" => $package["package_description_long"],
				"description_short" => $package["package_description_short"],
				"available_start" => $package["package_available_start"],
				"available_end" => $package["package_available_end"],
				"cost" => $package["package_cost"],
				"price" => $package["package_price"],
				"margin" => $package["package_margin"],
				"enabled" => $package["package_enabled"],
				"date_created" => $package["package_date_created"],
				"created_by" => $package["package_created_by"],
				"date_modified" => $package["package_date_modified"],
				"modified_by" => $package["package_modified_by"],
				"note" => $package["package_note"],
				"city" => $city,
				"currency" => $currency,
			);
		}
		
		private static function format(array $results = null): array
		{
			if (is_null($results)) {
				Log::$debug_log->error("Missing Fields");
				
				return [];
			}
			
			$temp = array();
			foreach ($results AS $k => $package) {
				$packageId = (isset($package["package_id"]) && (int)$package["package_id"] > 0) ? (int)$package["package_id"] : null;
				$productId = (isset($package["package_product_product_id"]) && (int)$package["package_product_product_id"] > 0) ? (int)$package["package_product_product_id"] : null;
				$unitId = (isset($package["package_product_unit_id"]) && (int)$package["package_product_unit_id"] > 0) ? (int)$package["package_product_unit_id"] : null;
				
				$productLabel = (isset($package["package_product_product_label"])) ? $package["package_product_product_label"] : null;
				$unitLabel = (isset($package["package_product_unit_label"])) ? $package["package_product_unit_label"] : null;
				
				$allowSubstitution = (isset($package["package_product_allow_substitution"])) ? $package["package_product_allow_substitution"] : 1;
				$unitName = (isset($package["unit_name"])) ? $package["unit_name"] : null;
				$productName = (isset($package["product_name"])) ? $package["product_name"] : null;
				
				$country = array(
					"id" => $package["country_id"],
					"currency_id" => $package["country_currency_id"],
					"sort_order" => $package["country_sort_order"],
					"name" => $package["country_name"],
					"iso2" => $package["country_iso2"],
					"iso3" => $package["country_iso3"],
					"blurb" => $package["country_blurb"],
					"enabled" => $package["country_enabled"],
					"date_created" => $package["country_date_created"],
					"created_by" => $package["country_created_by"],
					"date_modified" => $package["country_date_modified"],
					"modified_by" => $package["country_modified_by"],
					"note" => $package["country_note"],
				);
				$province = array(
					"id" => $package["province_id"],
					"country_id" => $package["province_country_id"],
					"name" => $package["province_name"],
					"iso2" => $package["province_iso2"],
					"iso3" => $package["province_iso3"],
					"sort_order" => $package["province_sort_order"],
					"blurb" => $package["province_blurb"],
					"enabled" => $package["province_enabled"],
					"date_created" => $package["province_date_created"],
					"created_by" => $package["province_created_by"],
					"date_modified" => $package["province_date_modified"],
					"modified_by" => $package["province_modified_by"],
					"note" => $package["province_note"],
				);
				$city = array(
					"id" => $package["city_id"],
					"province_id" => $package["city_province_id"],
					"country_id" => $package["city_country_id"],
					"sort_order" => $package["city_sort_order"],
					"name" => $package["city_name"],
					"blurb" => $package["city_blurb"],
					"is_capital" => $package["city_is_capital"],
					"enabled" => $package["city_enabled"],
					"date_created" => $package["city_date_created"],
					"created_by" => $package["city_created_by"],
					"date_modified" => $package["city_date_modified"],
					"modified_by" => $package["city_modified_by"],
					"note" => $package["city_note"],
					"country" => $country,
					"province" => $province,
				);
				$currency = array(
					"id" => $package["currency_id"],
					"sort_order" => $package["currency_sort_order"],
					"name" => $package["currency_name"],
					"iso" => $package["currency_iso"],
					"minor_unit" => $package["currency_minor_unit"],
					"symbol" => $package["currency_symbol"],
					"enabled" => $package["currency_enabled"],
					"date_created" => $package["currency_date_created"],
					"created_by" => $package["currency_created_by"],
					"date_modified" => $package["currency_date_modified"],
					"modified_by" => $package["currency_modified_by"],
					"note" => $package["currency_note"],
				);
				
				if (!is_null($packageId)) {
					
					if (!isset($temp[$packageId])) {
						
						$temp[$packageId] = array(
							"id" => $packageId,
							"name" => $package["package_name"],
							"day_span" => $package["package_day_span"],
							"city_id" => $package["package_city_id"],
							"min_pax" => $package["package_min_pax"],
							"max_pax" => $package["package_max_pax"],
							"description_long" => $package["package_description_long"],
							"description_short" => $package["package_description_short"],
							"available_start" => $package["package_available_start"],
							"available_end" => $package["package_available_end"],
							"cost" => $package["package_cost"],
							"price" => $package["package_price"],
							"margin" => $package["package_margin"],
							"enabled" => $package["package_enabled"],
							"date_created" => $package["package_date_created"],
							"created_by" => $package["package_created_by"],
							"date_modified" => $package["package_date_modified"],
							"modified_by" => $package["package_modified_by"],
							"note" => $package["package_note"],
							"city" => $city,
							"currency" => $currency,
						);
						
					}
					
					if (!isset($temp[$packageId]["products"])) {
						
						$temp[$packageId]["products"] = array();
						
					}
					
					if (!is_null($productId)) {
						
						if (!isset($temp[$packageId]["products"][$productId])) {
							
							$category = array(
								"id" => (isset($package["category_id"]) && (int)$package["category_id"] > 0) ? (int)$package["category_id"] : null,
								"pricing_strategy_types_id" => (isset($package["category_pricing_strategy_types_id"]) && (int)$package["category_pricing_strategy_types_id"] > 0) ? (int)$package["category_pricing_strategy_types_id"] : null,
								"name" => (isset($package["category_name"])) ? $package["category_name"] : null,
								"icon" => (isset($package["category_icon"])) ? $package["category_icon"] : null,
								"view_product_index" => (isset($package["category_view_product_index"])) ? (int)$package["category_view_product_index"] : null,
								"view_product_index_filter" => (isset($package["category_view_product_index_filter"])) ? (int)$package["category_view_product_index_filter"] : null,
								"view_product_index_search" => (isset($package["category_view_product_index_search"])) ? (int)$package["category_view_product_index_search"] : null,
								"view_product_edit" => (isset($package["category_view_product_edit"])) ? (int)$package["category_view_product_edit"] : null,
								"view_product_package_edit" => (isset($package["category_view_product_package_edit"])) ? (int)$package["category_view_product_package_edit"] : null,
								"view_product_package_index" => (isset($package["category_view_product_package_index"])) ? (int)$package["category_view_product_package_index"] : null,
								"all_day" => (isset($package["category_all_day"])) ? (int)$package["category_all_day"] : null,
								"overlap" => (isset($package["category_overlap"])) ? (int)$package["category_overlap"] : null,
								"editable" => (isset($package["category_editable"])) ? (int)$package["category_editable"] : null,
								"duration_editable" => (isset($package["category_duration_editable"])) ? (int)$package["category_duration_editable"] : null,
								"start_editable" => (isset($package["category_start_editable"])) ? (int)$package["category_start_editable"] : null,
								"display" => (isset($package["category_display"])) ? $package["category_display"] : "block",
								"background_color" => (isset($package["category_background_color"])) ? $package["category_background_color"] : "white",
								"text_color" => (isset($package["category_text_color"])) ? $package["category_text_color"] : "black",
								"border_color" => (isset($package["category_border_color"])) ? $package["category_border_color"] : "black",
								//"sort_order" => (isset($package["category_pricing_strategy_types_id"]) && (int)$package["category_pricing_strategy_types_id"] > 0) ? (int)$package["category_pricing_strategy_types_id"] : null,
								"enabled" => (isset($package["category_enabled"])) ? (int)$package["category_enabled"] : null,
								//"date_created" => (isset($package["category_date_created"],
								//"created_by" => (isset($package["category_created_by"],
								//"date_modified" => (isset($package["category_date_modified"],
								//"modified_by" => (isset($package["category_modified_by"],
								//"note" => (isset($package["category_note"],
							);
							
							$temp[$packageId]["products"][$productId] = array(
								"category" => $category,
								"label" => $productLabel,
								"id" => $productId,
								"category_id" => $package["product_category_id"],
								"pricing_strategy_types_id" => $package["product_pricing_strategy_types_id"],
								"status_types_id" => $package["product_status_types_id"],
								"city_id" => $package["product_city_id"],
								"currency_id" => $package["product_currency_id"],
								"location_id" => $package["product_location_id"],
								"provider_id" => $package["product_provider_id"],
								"vendor_id" => $package["product_vendor_id"],
								"rating_types_id" => $package["product_rating_types_id"],
								"name" => $productName,
								"street_1" => $package["product_street_1"],
								"street_2" => $package["product_street_2"],
								"postal_code" => $package["product_postal_code"],
								"description_short" => $package["product_description_short"],
								"description_long" => $package["product_description_long"],
								"keywords" => $package["product_keywords"],
								"sku" => $package["product_sku"],
								"depart_from" => $package["product_depart_from"],
								"depart_date" => $package["product_depart_date"],
								"depart_time" => $package["product_depart_time"],
								"arrive_to" => $package["product_arrive_to"],
								"arrive_date" => $package["product_arrive_date"],
								"arrive_time" => $package["product_arrive_time"],
								"provider_vendor_match" => $package["product_provider_vendor_match"],
								"use_provider_location_id" => $package["product_use_provider_location_id"],
								"day_span" => $package["product_day_span"],
								"cover_image" => $package["product_cover_image"],
								"api_id" => $package["product_api_id"],
								"from_api" => $package["product_from_api"],
								"hotel_code" => $package["product_hotel_code"],
								"sort_order" => $package["product_sort_order"],
								"amenities" => $package["product_amenities"],
								"enabled" => $package["product_enabled"],
								"date_created" => $package["product_date_created"],
								"created_by" => $package["product_created_by"],
								"date_modified" => $package["product_date_modified"],
								"modified_by" => $package["product_modified_by"],
								"note" => $package["product_note"],
								"units" => array(),
							);
							
						}
						
						if (!is_null($productId)) {
							
							if (!isset($temp[$packageId]["products"][$productId]["units"])) {
								$temp[$packageId]["products"][$productId]["units"] = array();
							}
							
							if (!isset($temp[$packageId]["products"][$productId]["units"][$unitId])) {
								
								$temp[$packageId]["products"][$productId]["units"][$unitId] = array(
									"id" => $unitId,
									"label" => $unitLabel,
									"name" => $unitName,
									"allow_substitution" => $allowSubstitution,
									"min_pax" => $package["product_unit_min_pax"],
									"max_pax" => $package["product_unit_max_pax"],
									"min_nights" => $package["product_unit_min_nights"],
									"max_nights" => $package["product_unit_max_nights"],
									"description_long" => $package["product_unit_description_long"],
									"description_short" => $package["product_unit_description_short"],
									"blurb" => $package["product_unit_blurb"],
									"cover_image" => $package["product_unit_cover_image"],
									"meeting_point" => $package["product_unit_meeting_point"],
									"time_notes" => $package["product_unit_time_notes"],
									"start_time" => $package["product_unit_start_time"],
									"end_time" => $package["product_unit_end_time"],
									"enabled" => $package["product_unit_enabled"],
									"date_created" => $package["product_unit_date_created"],
									"created_by" => $package["product_unit_created_by"],
									"date_modified" => $package["product_unit_date_modified"],
									"modified_by" => $package["product_unit_modified_by"],
									"amenities" => $package["product_unit_amenities"],
									"note" => $package["product_unit_note"],
									"keywords" => $package["product_unit_keywords"],
								);
								
							}
							
						}
						
					}
					
				}
				
			}
			
			$packages = [];
			foreach ($temp AS $j => $package) {
				$packageId = (isset($package["id"])) ? (int)$package["id"] : null;
				$products = (isset($package["products"])) ? $package["products"] : [];
				
				$productList = [];
				foreach ($products AS $k => $product) {
					$productId = (isset($product["id"])) ? (int)$product["id"] : null;
					$units = (isset($product["units"])) ? $product["units"] : [];
					
					$unitList = [];
					foreach ($units AS $l => $unit) {
						$unitList[] = $unit;
					}
					
					$productList[] = array(
						"amenities" => $product["amenities"],
						"api_id" => $product["api_id"],
						"arrive_to" => $product["arrive_to"],
						"arrive_date" => $product["arrive_date"],
						"arrive_time" => $product["arrive_time"],
						"category" => $product["category"],
						"category_id" => $product["category_id"],
						"city_id" => $product["city_id"],
						"cover_image" => $product["cover_image"],
						"created_by" => $product["created_by"],
						"currency_id" => $product["currency_id"],
						"date_created" => $product["date_created"],
						"date_modified" => $product["date_modified"],
						"day_span" => $product["day_span"],
						"depart_from" => $product["depart_from"],
						"depart_date" => $product["depart_date"],
						"depart_time" => $product["depart_time"],
						"description_short" => $product["description_short"],
						"description_long" => $product["description_long"],
						"enabled" => $product["enabled"],
						"from_api" => $product["from_api"],
						"hotel_code" => $product["hotel_code"],
						"id" => $productId,
						"keywords" => $product["keywords"],
						"label" => $product["label"],
						"location_id" => $product["location_id"],
						"modified_by" => $product["modified_by"],
						"name" => $product["name"],
						"note" => $product["note"],
						"postal_code" => $product["postal_code"],
						"pricing_strategy_types_id" => $product["pricing_strategy_types_id"],
						"provider_vendor_match" => $product["provider_vendor_match"],
						"provider_id" => $product["provider_id"],
						"rating_types_id" => $product["rating_types_id"],
						"sku" => $product["sku"],
						"sort_order" => $product["sort_order"],
						"status_types_id" => $product["status_types_id"],
						"street_1" => $product["street_1"],
						"street_2" => $product["street_2"],
						"units" => $unitList,
						"use_provider_location_id" => $product["use_provider_location_id"],
						"vendor_id" => $product["vendor_id"],
					);
				}
				
				$packages[] = array(
					"available_end" => $package["available_end"],
					"available_start" => $package["available_start"],
					"city" => $package["city"],
					"city_id" => $package["city_id"],
					"cost" => $package["cost"],
					"created_by" => $package["created_by"],
					"currency" => $package["currency"],
					"date_created" => $package["date_created"],
					"date_modified" => $package["date_modified"],
					"day_span" => $package["day_span"],
					"description_long" => $package["description_long"],
					"description_short" => $package["description_short"],
					"enabled" => $package["enabled"],
					"id" => $packageId,
					"margin" => $package["margin"],
					"max_pax" => $package["max_pax"],
					"min_pax" => $package["min_pax"],
					"modified_by" => $package["modified_by"],
					"name" => $package["name"],
					"note" => $package["note"],
					"price" => $package["price"],
					"products" => $productList,
				);
			}
			
			return $packages;
		}
		
	}
