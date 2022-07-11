<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\ProductModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short Product Description
	 * Long Product Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Product extends Controller
	{
		protected static $buttons = array(
			"save" => array(
				"type" => "a",
				"href" => "javascript:void(0)",
				"classes" => "btn btn-primary btn-heading",
				"icon" => "fas fa-save",
				"id" => "button_save_product",
				"data" => array(
					"toggle" => "tooltip",
					"title" => "Save Product",
					"placement" => "top",
				),
			),
			
			"new" => array(
				"type" => "a",
				"href" => "javascript:void(0)",
				"classes" => "btn btn-primary btn-heading",
				"icon" => "fas fa-plus",
				"id" => "button_add_product_page_heading",
				"data" => array(
					"toggle" => "tooltip",
					"title" => "Create a New Product",
					"placement" => "top",
				),
			),
			
			"calendar" => array(
				"type" => "a",
				"href" => "javascript:void(0)",
				"classes" => "btn btn-primary btn-heading",
				"icon" => "fas fa-calendar",
				"id" => "button_view_calendar",
				"data" => array(
					"toggle" => "tooltip",
					"title" => "View Calendar",
					"placement" => "top",
				),
			),
		);
		
		protected static $tabs = array(
			"id" => "product_edit_tabs",
			"role" => "tablist",
			"class" => "nav nav-tabs nav-tabs-line",
			"tabs" => array(
				"Overview" => array(
					"controls" => "panel_tab_product_overview",
					"href" => "panel_tab_product_overview",
					"id" => "panel_tab_product_o",
					"active" => true,
					"aria" => array(
						"expanded" => "true",
					),
					"data" => array(),
				),
				"Product" => array(
					"controls" => "panel_tab_product_detail",
					"href" => "panel_tab_product_detail",
					"id" => "panel_tab_product",
					"active" => false,
					"aria" => array(
						"expanded" => "false",
					),
					"data" => array(),
				),
				"Location" => array(
					"controls" => "panel_tab_product_location",
					"href" => "panel_tab_product_location",
					"id" => "panel_tab_location",
					"active" => false,
					"aria" => array(
						"expanded" => "false",
					),
					"data" => array(),
				),
				"Season" => array(
					"controls" => "panel_tab_product_season",
					"href" => "panel_tab_product_season",
					"id" => "panel_tab_season",
					"active" => false,
					"aria" => array(
						"expanded" => "false",
					),
					"data" => array(),
				),
				"Unit" => array(
					"controls" => "panel_tab_product_unit",
					"href" => "panel_tab_product_unit",
					"id" => "panel_tab_unit",
					"active" => false,
					"aria" => array(
						"expanded" => "false",
					),
					"data" => array(),
				),
				"Variant" => array(
					"controls" => "panel_tab_product_variant",
					"href" => "panel_tab_product_variant",
					"id" => "panel_tab_variant",
					"active" => false,
					"aria" => array(
						"expanded" => "false",
					),
					"data" => array(),
				),
				"Inventory" => array(
					"controls" => "panel_tab_product_inventory",
					"href" => "panel_tab_product_inventory",
					"id" => "panel_tab_inventory",
					"active" => false,
					"aria" => array(
						"expanded" => "false",
					),
					"data" => array(),
				),
				"Pricing" => array(
					"controls" => "panel_tab_product_pricing",
					"href" => "panel_tab_product_pricing",
					"id" => "panel_tab_pricing",
					"active" => false,
					"aria" => array(
						"expanded" => "false",
					),
					"data" => array(),
				),
				"Meta" => array(
					"controls" => "panel_tab_product_meta",
					"href" => "panel_tab_product_meta",
					"id" => "panel_tab_meta",
					"active" => false,
					"aria" => array(
						"expanded" => "false",
					),
					"data" => array(),
				),
			),
		);
		
		public function __construct()
		{
			parent::__construct();
		}
		
		public static function index(array $params = [])
		{
			$data = Page::getDetails(9);
			$products = [];
			
			/** breadcrumbs */
			define("BREAD_CRUMBS", "
                <li class='breadcrumb-item'>
                    <a href='/'>Home</a>
                </li>
                <li class='breadcrumb-item'>
                    Products
                </li>"
			);
			
			/**
			 * buttons
			 */
			$data["buttons"] = array(
				self::$buttons["new"],
			);
			
			$results = ProductModel::get();
			$airports = Airport::get();
			$stations = Station::get();
			
			foreach ($results AS $k => $product) {
				$products[] = self::format($product);
			}
			
			$data["airports"] = $airports;
			$data["stations"] = $stations;
			$data["products"] = $products;
			
			/**
			 * header
			 */
			if (!defined("PAGEHEADINGCLASS")) {
				//define("PAGEHEADINGCLASS", " page-header-bordered page-header-tabs");
				define("PAGEHEADINGCLASS", " ");
			}
			
			/**
			 * render index view
			 */
			View::render_template("products/index", $data);
			exit(0);
		}
		
		public static function edit(array $params = [])
		{
			if (isset($params["product_id"])) {
				$product_id = (int)$params["product_id"];
				$results = [];
				
				$data = Page::getDetails(10);
				$products = ProductModel::get($product_id);
				
				/**
				 * Redirect if product not found.
				 */
				if (count($products) === 0) {
					header("Location: /products");
					exit(0);
				}
				
				/**
				 * loop and format product object
				 */
				foreach ($products AS $k => $product) {
					$results[] = self::format($product);
				}
				
				if (isset($results[0])) {
					$results = $results[0];
				}
				
				$data["product_details"] = $results;
				
				/** Breadcrumbs */
				define("BREAD_CRUMBS", "
                    <li class='breadcrumb-item'>
                        <a href='/'>Home</a>
                    </li>
                    <li class='breadcrumb-item'>
                        <a href='/products'>Products</a>
                    </li>
                    <li class='breadcrumb-item'>
                        $product_id
                    </li>"
				);
				
				$data["buttons"] = array(
					self::$buttons["calendar"],
					self::$buttons["save"],
					self::$buttons["new"],
				);
				$data["tabs"] = self::$tabs;
				
				/**
				 * render product edit page
				 */
				View::render_template("products/edit", $data);
				exit(0);
			}
			
			/**
			 * render product index page
			 */
			header("Content-type:application/json");
			header("Location: /products");
			exit(0);
		}
		
		public static function new(array $params = [])
		{
			$data = Page::getDetails(9);
			define("BREAD_CRUMBS", "
            <li class='breadcrumb-item'>
                <a href='/'>Home</a>
            </li>
            <li class='breadcrumb-item'>
                <a href='/products'>Products</a>
            </li>
            <li class='breadcrumb-item'>
                New
            </li>"
			);
			
			/**
			 * render product new page
			 */
			View::render_template("products/edit", $data);
			exit(0);
		}
		
		public static function autocomplete(array $params = []): array
		{
			if (!isset($params["category_id"])) {
				return [];
			}
			$st = (isset($params["st"])) ? $params["st"] : "";
			$category_id = (isset($params["category_id"])) ? (int)$params["category_id"] : null;
			
			return self::format_ac(ProductModel::product_ac($st, (int)$category_id));
		}
		
		public static function serveGet(array $params = []): void
		{
			$product_id = null;
			
			if ($params["product_id"]) {
				$product_id = (int)$params["product_id"];
			}
			
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			View::render_json(self::getProductByProductId($product_id));
			exit(0);
		}
		
		public static function serveAdd(array $params = []): void
		{
			Log::$debug_log->trace("Product::serveAdd()");
			Log::$debug_log->info($params);
			// ----
			
			if (!isset($params["name"]) || !isset($params["category_id"]) || !isset($params["pricing_strategy_types_id"])) {
				header("Content-type:application/json");
				View::render_invalid_json("Missing Fields", 500);
				exit(0);
			}
			
			$statusTypesId = 1;
			$productId = (isset($params["id"])) ? (int)$params["id"] : null;
			
			$countryId = (isset($params["country_id"])) ? (int)$params["country_id"] : null;
			$provinceId = (isset($params["province_id"])) ? (int)$params["province_id"] : null;
			$cityId = (isset($params["city_id"])) ? (int)$params["city_id"] : null;
			
			$ratingsTypesId = (isset($params["rating_types_id"])) ? (int)$params["rating_types_id"] : 3;
			$categoryId = (isset($params["category_id"])) ? (int)$params["category_id"] : null;
			$currencyId = (isset($params["currency_id"])) ? (int)$params["currency_id"] : 5;
			$pricingStrategyTypesId = (isset($params["pricing_strategy_types_id"])) ? (int)$params["pricing_strategy_types_id"] : null;
			$providerId = (isset($params["provider_id"])) ? (int)$params["provider_id"] : null;
			$vendorId = (isset($params["vendor_id"])) ? (int)$params["vendor_id"] : null;
			$locationTypesId = self::getLocationType($categoryId);
			$productName = (isset($params["name"])) ? $params["name"] : null;
			$sku = (isset($params["sku"])) ? $params["sku"] : null;
			$productStreet1 = (isset($params["street_1"])) ? $params["street_1"] : null;
			$productStreet2 = (isset($params["street_2"])) ? $params["street_2"] : null;
			$productPostalCode = (isset($params["postal_code"])) ? $params["postal_code"] : null;
			$providerVendorMatch = (isset($params["provider_vendor_match"])) ? (int)$params["provider_vendor_match"] : 1;
			$productDaySpan = (isset($params["depart_from"])) ? (int)$params["depart_from"] : 1;
			$productDepartFrom = (isset($params["depart_from"])) ? (int)$params["depart_from"] : null;
			$productDepartFromDate = (isset($params["depart_date"])) ? $params["depart_date"] : null;
			$productDepartFromTime = (isset($params["depart_time"])) ? $params["depart_time"] : null;
			$productArriveTo = (isset($params["arrive_to"])) ? (int)$params["arrive_to"] : null;
			$productArriveToDate = (isset($params["arrive_date"])) ? $params["arrive_date"] : null;
			$productArriveToTime = (isset($params["arrive_time"])) ? $params["arrive_time"] : null;
			$productFromApi = (isset($params["from_api"])) ? (int)$params["from_api"] : 0;
			$productUseProviderLocationId = (isset($params["use_provider_location_id"])) ? $params["use_provider_location_id"] : 0;
			$productDescriptionShort = (isset($params["description_short"])) ? $params["description_short"] : null;
			$productDescriptionLong = (isset($params["description_long"])) ? $params["description_long"] : null;
			$keywords = (isset($params["keywords"])) ? $params["keywords"] : "";
			
			$productApiId = (isset($params["api_id"])) ? (int)$params["api_id"] : null;
			$productEnabled = (isset($params["enabled"])) ? (int)$params["enabled"] : 1;
			$locationData = array(
				"category_id" => $categoryId,
				"name" => $productName,
				"city_id" => $cityId,
				"province_id" => $provinceId,
				"country_id" => $countryId,
				"location_types_id" => $locationTypesId,
				"street_1" => $productStreet1,
				"street_2" => $productStreet2,
				"zipcode" => $productPostalCode,
				"enabled" => 1,
			);
			$productKeywords = [];
			
			switch ($categoryId) {
				case 3:
					$cityList = City::getByCountryId($countryId);
					
					if (isset($cityList) && isset($cityList[0])) {
						$city = $cityList[0];
						$countryId = (isset($city["country_id"])) ? (int)$city["country_id"] : null;
						$provinceId = (isset($city["province_id"])) ? (int)$city["province_id"] : null;
						$cityId = (isset($city["id"])) ? (int)$city["id"] : null;
						
						$locationData = Location::get($params["name"], (int)$cityId, "medium");
						
						if (!$locationData) {
							
							$locationData = Location::update(array(
								"category_id" => $categoryId,
								"name" => $productName,
								"city_id" => $cityId,
								"province_id" => $provinceId,
								"country_id" => $countryId,
								"location_types_id" => $locationTypesId,
								"street_1" => $productStreet1,
								"street_2" => $productStreet2,
								"zipcode" => $productPostalCode,
								"enabled" => 1,
							));
							
						}
						
					}
					
					break;
				case 1:
				case 5:
				case 6:
					// HOTELS TRANSPORT
					if (!isset($params["name"]) || !isset($params["city_id"])) {
						$name = (isset($params["name"])) ? $params["name"] : "MISSING";
						$cityId = (isset($params["city_id"])) ? $params["city_id"] : "MISSING";
						Log::$debug_log->info("Missing Fields: name - $name");
						Log::$debug_log->info("Missing Fields: city_id - $cityId");
						Log::$debug_log->error("Missing Fields");
						
						/**
						 * render product json
						 */
						header("Content-type:application/json");
						View::render_invalid_json("Missing Fields", 500);
						exit(0);
					}
					
					$locationData = Location::get($params["name"], (int)$params["city_id"], "medium");
					
					if (!$locationData) {
						$locationData = Location::update(array(
							"category_id" => $categoryId,
							"name" => $productName,
							"city_id" => $cityId,
							"location_types_id" => $locationTypesId,
							"street_1" => $productStreet1,
							"street_2" => $productStreet2,
							"zipcode" => $productPostalCode,
							"enabled" => 1,
						));
					}
					break;
				case 2:
					// FLIGHTS
					if (!isset($params["depart_from"])) {
						Log::$debug_log->error("Missing Airport: depart_from");
						Log::$debug_log->info($params);
						/**
						 * render product json
						 */
						header("Content-type:application/json");
						View::render_invalid_json("Missing Airport", 500);
						exit(0);
					}
					
					$departFrom = (isset($params["depart_from"])) ? (int)$params["depart_from"] : null;
					$airport = Airport::get($departFrom);
					if (isset($airport[0])) {
						$airport = $airport[0];
					}
					
					if ($airport) {
						$airportName = (isset($airport["name"])) ? $airport["name"] : null;
						$airportCountryId = (isset($airport["country"]) && isset($airport["country"]["id"])) ? (int)$airport["country"]["id"] : null;
						$airportProvinceId = (isset($airport["province"]) && isset($airport["province"]["id"])) ? (int)$airport["province"]["id"] : null;
						$airportCityId = (isset($airport["city"]) && isset($airport["city"]["id"])) ? (int)$airport["city"]["id"] : null;
						$airportStreet1 = (isset($airport["street_1"])) ? $airport["street_1"] : null;
						$airportStreet2 = (isset($airport["street_2"])) ? $airport["street_2"] : null;
						$airportPostalCode = (isset($airport["postal_code"])) ? $airport["postal_code"] : null;
						
						$locationData = Location::get($airportName, $airportCityId, "medium");
						
						if (!$locationData) {
							$locationData = Location::update(array(
								"category_id" => $categoryId,
								"name" => $airportName,
								"city_id" => $airportCityId,
								"location_types_id" => $locationTypesId,
								"street_1" => $airportStreet1,
								"street_2" => $airportStreet2,
								"zipcode" => $airportPostalCode,
								"enabled" => 1,
							));
						}
					}
					
					break;
				case 4:
					// RAIL
					if (!isset($params["depart_from"])) {
						Log::$debug_log->error("Missing Station: depart_from");
						Log::$debug_log->info($params);
						/**
						 * render product json
						 */
						header("Content-type:application/json");
						View::render_invalid_json("Missing Station", 500);
						exit(0);
					}
					
					$departFrom = (isset($params["depart_from"])) ? (int)$params["depart_from"] : null;
					$station = Station::get($departFrom);
					
					if (isset($station[0])) {
						$station = $station[0];
					}
					
					if ($station) {
						$stationName = (isset($station["name"])) ? $station["name"] : null;
						$stationCountryId = (isset($station["country"]) && isset($station["country"]["id"])) ? (int)$station["country"]["id"] : null;
						$stationProvinceId = (isset($station["province"]) && isset($station["province"]["id"])) ? (int)$station["province"]["id"] : null;
						$stationCityId = (isset($station["city"]) && isset($station["city"]["id"])) ? (int)$station["city"]["id"] : null;
						$stationStreet1 = (isset($station["street_1"])) ? $station["street_1"] : null;
						$stationStreet2 = (isset($station["street_2"])) ? $station["street_2"] : null;
						$stationPostalCode = (isset($station["postal_code"])) ? $station["postal_code"] : null;
						
						$locationData = Location::get($stationName, $stationCityId);
						
						if (!$locationData) {
							$locationData = Location::update(array(
								"category_id" => $categoryId,
								"name" => $stationName,
								"city_id" => $stationCityId,
								"location_types_id" => $locationTypesId,
								"street_1" => $stationStreet1,
								"street_2" => $stationStreet2,
								"zipcode" => $stationPostalCode,
								"enabled" => 1,
							));
						}
					}
					
					break;
				default:
					$locationData = array(
						"name" => $productName,
						"category_id" => $categoryId,
						"city_id" => $productName,
						"location_types_id" => $locationTypesId,
						"street_1" => $productStreet1,
						"street_2" => $productStreet2,
						"zipcode" => $productPostalCode,
						"enabled" => 1,
					);
			}
			
			if (isset($locationData) && isset($locationData[0])) {
				$locationData = $locationData[0];
			}
			
			$locationId = (isset($locationData["id"])) ? (int)$locationData["id"] : 1;
			
			if (gettype($keywords) == "string") {
				$temp = explode(",", $keywords);
				
				foreach ($temp AS $k => $keyWord) {
					if ($keyWord !== "") {
						$productKeywords[] = $keyWord;
					}
				}
			} else if (gettype($keywords) == "array") {
				$productKeywords = $keywords;
			} else {
				$productKeywords = [];
			}
			
			$keywords = buildKeywordsList($productName, $locationData, $productKeywords);
			
			//Log::$debug_log->trace($keywords);
			//Log::$debug_log->trace($productKeywords);
			
			$params = array(
				"category_id" => $categoryId,
				"pricing_strategy_types_id" => $pricingStrategyTypesId,
				"status_types_id" => $statusTypesId,
				
				"currency_id" => $currencyId,
				"location_id" => $locationId,
				"provider_id" => $providerId,
				"vendor_id" => $vendorId,
				"rating_types_id" => $ratingsTypesId,
				"api_id" => $productApiId,
				"name" => $productName,
				"sku" => $sku,
				
				"street_1" => $productStreet1,
				"street_2" => $productStreet2,
				"country_id" => $countryId,
				"province_id" => $provinceId,
				"city_id" => $cityId,
				"postal_code" => $productPostalCode,
				
				"day_span" => $productDaySpan,
				"depart_from" => $productDepartFrom,
				"depart_date" => $productDepartFromDate,
				"depart_time" => $productDepartFromTime,
				"arrive_to" => $productArriveTo,
				"arrive_date" => $productArriveToDate,
				"arrive_time" => $productArriveToTime,
				"from_api" => $productFromApi,
				"provider_vendor_match" => $providerVendorMatch,
				"use_provider_location_id" => $productUseProviderLocationId,
				"enabled" => $productEnabled,
				
				"description_short" => $productDescriptionShort,
				"description_long" => $productDescriptionLong,
				"keywords" => $keywords,
				"location" => $locationData,
			);
			
			if (!is_null($productId)) {
				$params["id"] = $productId;
			}
			
			$products = array();
			
			$results = ProductModel::addRecord($params);
			
			foreach ($results AS $k => $product) {
				$products[] = self::format($product);
			}
			
			/**
			 * render product json
			 */
			header("Content-type:application/json");
			View::render_json($products);
			exit(0);
			
		}
		
		public static function serveUpdateDetail(array $params = []): void
		{
			//Log::$debug_log->info("Product::serveUpdateMeta(params)");
			//Log::$debug_log->trace($params);
			$products = self::updateDetail($params);
			//Log::$debug_log->trace($products);
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			View::render_json($products);
			exit(0);
		}
		
		public static function serveUpdateMeta(array $params = []): void
		{
			//Log::$debug_log->info("serveUpdateMeta(params)");
			//Log::$debug_log->trace($params);
			$products = self::updateMeta($params);
			//Log::$debug_log->trace($products);
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			View::render_json($products);
			exit(0);
		}
		
		public static function serveTableUpdate(array $params = []): void
		{
			$input = filter_input_array(INPUT_POST);
			
			/**
			 * render results page
			 */
			header("Content-type:application/json");
			View::render_json($input);
			exit(0);
		}
		
		public static function serveUpdate(array $params = []): void
		{
			$products = [];
			
			$results = ProductModel::updateProductRecord($params);
			
			foreach ($results AS $k => $product) {
				$products[] = self::format($product);
			}
			
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			View::render_json($products);
			exit(0);
		}
		
		public static function assignSeason(array $params = []): void
		{
			$results = ProductModel::updateAssignSeasons($params);
			
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			View::render_json($results);
			exit(0);
		}
		
		public static function assignProfile(array $params = []): void
		{
			$results = [];
			
			if (isset($params["params"])) {
				$params = $params["params"];
			}
			
			foreach ($params AS $key => $profile) {
				
				$data = array(
					"product_id" => (int)$profile["product_id"],
					"profile_id" => (int)$profile["profile_id"],
					"unit_id" => (int)$profile["unit_id"],
					"description" => (isset($profile["description"])) ? (string)$profile["description"] : null,
					"note" => (isset($profile["note"])) ? (string)$profile["note"] : null,
					"enabled" => (isset($profile["enabled"])) ? (int)$profile["enabled"] : 1,
					"quantity_released" => (isset($profile["quantity_released"])) ? (int)$profile["quantity_released"] : 0,
					"quantity_used" => (isset($profile["quantity_used"])) ? (int)$profile["quantity_used"] : 0,
					"days" => $profile["days"],
				);
				
				$results[] = ProductModel::updateAssignProfiles($data);
			}
			
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			View::render_json($results);
			exit(0);
		}
		
		public static function get(int $product_id = null): array
		{
			$products = [];
			
			$results = self::getProductByProductId($product_id);
			
			foreach ($results AS $k => $product) {
				$products[] = self::format($product);
			}
			
			return $products;
		}
		
		public static function getLocationType(int $id = null): int
		{
			switch ($id) {
				case 1:
					return 2;
				case 2:
					return 3;
				case 3:
					return 18;
				case 4:
					return 4;
				case 5:
					return 6;
				case 6:
					return 17;
				case 7:
					return 19;
				case 8:
					return 20;
				default:
					return 1;
			}
		}
		
		public static function getProductByProductId(int $product_id = null): array
		{
			if (is_null($product_id)) {
				return [];
			}
			
			$results = ProductModel::get($product_id);
			
			$products = [];
			foreach ($results AS $k => $product) {
				$products[] = self::format($product);
			}
			
			return $products;
		}
		
		public static function search(array $params = null): void
		{
			$products = [];
			
			foreach (ProductModel::fetchProducts($params) AS $k => $product) {
				$products[] = self::formatSearchResults($product);
			}
			
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			View::render_json($products);
			exit(0);
		}
		
		private static function updateMeta(array $params = []): array
		{
			$products = [];
			$results = ProductModel::updateProductMetaData($params);
			
			foreach ($results AS $k => $product) {
				$products[] = self::format($product);
			}
			
			return $products;
		}
		
		private static function updateDetail(array $params = []): array
		{
			//Log::$debug_log->info("Product::updateDetail(params)");
			//Log::$debug_log->trace($params);
			$products = [];
			$results = ProductModel::updateProductDetailData($params);
			//Log::$debug_log->trace($results);
			foreach ($results AS $k => $product) {
				$products[] = self::format($product);
			}
			
			return $products;
		}
		
		private static function format(array $product = null): array
		{
			if (is_null($product) || !isset($product["category_id"]) || !isset($product["category_id"])) {
				return [];
			}
			
			$category_id = (int)$product["category_id"];
			$productId = (int)$product["product_id"];
			$rooms = [];
			$arrivingLocation = [];
			$departingLocation = [];
			$images = Image::getByProductId($productId);
			$matrices = Matrix::getMatricesByProductId((int)$product["product_id"]);
			$profiles = Profile::getByProductId((int)$product["product_id"]);
			$seasons = Season::getSeasonsByProductId((int)$product["product_id"]);
			$units = Unit::getUnitsByProductId((int)$product["product_id"]);
			$variants = Variant::getVariantsByProductId((int)$product["product_id"]);
			$pricings = Pricing::getPricingsByProductId((int)$product["product_id"]);
			$location = Location::getByLocationId((int)$product["product_location_id"]);
			$provider = Provider::getByProviderId((int)$product["product_provider_id"]);
			$provider = (isset($provider[0])) ? $provider[0] : [];
			$vendor = Vendor::getByVendorId((int)$product["product_vendor_id"]);
			$vendor = (isset($vendor[0])) ? $vendor[0] : [];
			$use_provider_location = false;
			$street_1 = (isset($product["product_street_1"])) ? $product["product_street_1"] : null;
			$street_2 = (isset($product["product_street_2"])) ? $product["product_street_2"] : null;
			$zipcode = (isset($product["product_postal_code"])) ? $product["product_postal_code"] : null;
			$departingFromId = (isset($product["product_depart_from"])) ? $product["product_depart_from"] : null;
			$arrivingToId = (isset($product["product_arrive_to"])) ? $product["product_arrive_to"] : null;
			
			$country = array(
				"id" => ($product && $product["country_id"]) ? (int)$product["country_id"] : null,
				"currency_id" => ($product && $product["country_currency_id"]) ? (int)$product["country_currency_id"] : null,
				"sort_order" => ($product && $product["country_sort_order"]) ? (int)$product["country_sort_order"] : null,
				"name" => ($product && $product["country_name"]) ? $product["country_name"] : null,
				"iso2" => ($product && $product["country_iso2"]) ? $product["country_iso2"] : null,
				"iso3" => ($product && $product["country_iso3"]) ? $product["country_iso3"] : null,
				"blurb" => ($product && $product["country_blurb"]) ? $product["country_blurb"] : null,
				"enabled" => ($product && $product["country_enabled"]) ? $product["country_enabled"] : null,
				"date_created" => ($product && $product["country_date_created"]) ? $product["country_date_created"] : null,
				"created_by" => ($product && $product["country_created_by"]) ? (int)$product["country_created_by"] : null,
				"date_modified" => ($product && $product["country_date_modified"]) ? $product["country_date_modified"] : null,
				"modified_by" => ($product && $product["country_modified_by"]) ? (int)$product["country_modified_by"] : null,
				"note" => ($product && $product["country_note"]) ? $product["country_note"] : null,
			);
			
			$province = array(
				"id" => ($product && $product["province_id"]) ? (int)$product["province_id"] : null,
				"country_id" => ($product && $product["province_country_id"]) ? (int)$product["province_country_id"] : null,
				"name" => ($product && $product["province_name"]) ? $product["province_name"] : null,
				"iso2" => ($product && $product["province_iso2"]) ? $product["province_iso2"] : null,
				"iso3" => ($product && $product["province_iso3"]) ? $product["province_iso3"] : null,
				"sort_order" => ($product && $product["province_sort_order"]) ? (int)$product["province_sort_order"] : null,
				"blurb" => ($product && $product["province_blurb"]) ? $product["province_blurb"] : null,
				"enabled" => ($product && $product["province_enabled"]) ? $product["province_enabled"] : null,
				"date_created" => ($product && $product["province_date_created"]) ? $product["province_date_created"] : null,
				"created_by" => ($product && $product["province_created_by"]) ? (int)$product["province_created_by"] : null,
				"date_modified" => ($product && $product["province_date_modified"]) ? $product["province_date_modified"] : null,
				"modified_by" => ($product && $product["province_modified_by"]) ? (int)$product["province_modified_by"] : null,
				"note" => ($product && $product["province_note"]) ? $product["province_note"] : null,
			);
			
			$city = array(
				"id" => ($product && $product["city_id"]) ? (int)$product["city_id"] : null,
				"province_id" => ($product && $product["city_province_id"]) ? (int)$product["city_province_id"] : null,
				"country_id" => ($product && $product["city_country_id"]) ? (int)$product["city_country_id"] : null,
				"sort_order" => ($product && $product["city_sort_order"]) ? (int)$product["city_sort_order"] : null,
				"name" => ($product && $product["city_name"]) ? $product["city_name"] : null,
				"blurb" => ($product && $product["city_blurb"]) ? $product["city_blurb"] : null,
				"is_capital" => ($product && $product["city_is_capital"]) ? $product["city_is_capital"] : null,
				"enabled" => ($product && $product["city_enabled"]) ? $product["city_enabled"] : null,
				"date_created" => ($product && $product["city_date_created"]) ? $product["city_date_created"] : null,
				"created_by" => ($product && $product["city_created_by"]) ? (int)$product["city_created_by"] : null,
				"date_modified" => ($product && $product["city_date_modified"]) ? $product["city_date_modified"] : null,
				"modified_by" => ($product && $product["city_modified_by"]) ? (int)$product["city_modified_by"] : null,
				"note" => ($product && $product["city_note"]) ? $product["city_note"] : null,
			);
			
			foreach ($seasons AS $season) {
				$season_name = $season["name"];
				
				if (!isset($rooms[$season_name])) {
					$rooms[$season_name] = $season;
					$rooms[$season_name]["units"] = array();
					
					foreach ($units AS $unit) {
						$unit_name = $unit["name"];
						$rooms[$season_name]["units"][$unit_name] = $unit;
						$rooms[$season_name]["units"][$unit_name]["variants"] = $variants;
					}
				}
			}
			
			if ($category_id === 1) {
				$location["street_1"] = $street_1;
				$location["street_2"] = $street_2;
				$location["postal_code"] = $zipcode;
			} else if ($category_id === 2) {
				$departingLocation = Airport::get($departingFromId);
				$arrivingLocation = Airport::get($arrivingToId);
				
			} else if ($category_id === 4) {
				$departingLocation = Station::get($departingFromId);
				$arrivingLocation = Station::get($arrivingToId);
			} else {
				$departingLocation = [];
				$arrivingLocation = [];
			}
			
			if (count($departingLocation) === 1 && isset($departingLocation[0])) {
				$departingLocation = $departingLocation[0];
			}
			
			if (count($arrivingLocation) === 1 && isset($arrivingLocation[0])) {
				$arrivingLocation = $arrivingLocation[0];
			}
			
			$location_id = (int)$product["product_location_id"];
			
			$results = array(
				"id" => $product["product_id"],
				"use_provider_location" => $use_provider_location,
				"category_id" => $category_id,
				"pricing_strategy_types_id" => $product["product_pricing_strategy_types_id"],
				"status_types_id" => $product["product_status_types_id"],
				"amenities" => $product["product_amenities"],
				"city_id" => $product["product_city_id"],
				"currency_id" => $product["product_currency_id"],
				"location_id" => $location_id,
				"provider_id" => $product["product_provider_id"],
				"vendor_id" => $product["product_vendor_id"],
				"rating_types_id" => $product["product_rating_types_id"],
				"name" => $product["product_name"],
				"description_short" => $product["product_description_short"],
				"description_long" => $product["product_description_long"],
				"sku" => $product["product_sku"],
				"depart_from" => $departingFromId,
				"arrive_to" => $arrivingToId,
				"arriving_location" => $arrivingLocation,
				"departing_location" => $departingLocation,
				"depart_time" => $product["product_depart_time"],
				"arrive_time" => $product["product_arrive_time"],
				"provider_vendor_match" => $product["product_provider_vendor_match"],
				"day_span" => $product["product_day_span"],
				"cover_image" => $product["product_cover_image"],
				"api_id" => $product["product_api_id"],
				"from_api" => $product["product_from_api"],
				"hotel_code" => $product["product_hotel_code"],
				"sort_order" => $product["product_sort_order"],
				"keywords" => $product["product_keywords"],
				"enabled" => $product["product_enabled"],
				"date_created" => $product["product_date_created"],
				"created_by" => $product["product_created_by"],
				"date_modified" => $product["product_date_modified"],
				"modified_by" => $product["product_modified_by"],
				"note" => $product["product_note"],
				"street_1" => $street_1,
				"street_2" => $street_2,
				"postal_code" => $zipcode,
				"status_type_detail" => array(
					"id" => $product["status_types_id"],
					"name" => $product["status_types_name"],
					"enabled" => $product["status_types_enabled"],
					"date_created" => $product["status_types_date_created"],
					"created_by" => $product["status_types_created_by"],
					"date_modified" => $product["status_types_date_modified"],
					"modified_by" => $product["status_types_modified_by"],
					"note" => $product["status_types_note"],
					"sort_order" => $product["status_types_sort_order"],
				),
				"category" => array(
					"id" => $product["category_id"],
					"pricing_strategy_types_id" => $product["category_pricing_strategy_types_id"],
					"attribute_id" => $product["category_attribute_id"],
					"name" => $product["category_name"],
					"icon" => $product["category_icon"],
					"view_product_index" => $product["category_view_product_index"],
					"view_product_index_filter" => $product["category_view_product_index_filter"],
					"view_product_index_search" => $product["category_view_product_index_search"],
					"view_product_edit" => $product["category_view_product_edit"],
					"view_product_package_edit" => $product["category_view_product_package_edit"],
					"view_product_package_index" => $product["category_view_product_package_index"],
					"all_day" => $product["category_all_day"],
					"overlap" => $product["category_overlap"],
					"editable" => $product["category_editable"],
					"duration_editable" => $product["category_duration_editable"],
					"start_editable" => $product["category_start_editable"],
					"display" => $product["category_display"],
					"background_color" => $product["category_background_color"],
					"text_color" => $product["category_text_color"],
					"border_color" => $product["category_border_color"],
					"sort_order" => $product["category_sort_order"],
					"enabled" => $product["category_enabled"],
					"date_created" => $product["category_date_created"],
					"created_by" => $product["category_created_by"],
					"date_modified" => $product["category_date_modified"],
					"modified_by" => $product["category_modified_by"],
					"note" => $product["category_note"],
				),
				"images" => $images,
				"location" => $location,
				"provider" => $provider,
				"vendor" => $vendor,
				"seasons" => $seasons,
				"units" => $units,
				"variants" => $variants,
				"profiles" => $profiles,
				"matrices" => $matrices,
				"pricings" => $pricings,
				"country" => $country,
				"province" => $province,
				"city" => $city,
			);
			
			Log::$debug_log->trace($results);
			
			return $results;
		}
		
		private static function format_ac(array $products = []): array
		{
			$data["suggestions"] = [];
			foreach ($products AS $k => $product) {
				$l = (object)$product;
				$value = utf8_encode($l->product_name);
				array_push($data["suggestions"], [
					"value" => utf8_encode($value),
					"data" => self::format($product),
				]);
			}
			
			return $data;
		}
		
		private static function formatSearchResults(array $product = null): array
		{
			if (is_null($product)) {
				return [];
			}
			
			$productName = (isset($product["product_name"])) ? $product["product_name"] : null;
			$productId = (isset($product["product_id"]) && (int)$product["product_id"] > 0) ? (int)$product["product_id"] : null;
			$rating = (isset($product["product_rating_types_id"]) && (int)$product["product_rating_types_id"] > 0) ? (int)$product["product_rating_types_id"] : 0;
			$country = array(
				"id" => ($product && $product["country_id"]) ? (int)$product["country_id"] : null,
				"currency_id" => ($product && $product["country_currency_id"]) ? (int)$product["country_currency_id"] : null,
				"sort_order" => ($product && $product["country_sort_order"]) ? (int)$product["country_sort_order"] : null,
				"name" => ($product && $product["country_name"]) ? $product["country_name"] : null,
				"iso2" => ($product && $product["country_iso2"]) ? $product["country_iso2"] : null,
				"iso3" => ($product && $product["country_iso3"]) ? $product["country_iso3"] : null,
				"blurb" => ($product && $product["country_blurb"]) ? $product["country_blurb"] : null,
				"enabled" => ($product && $product["country_enabled"]) ? $product["country_enabled"] : null,
				"date_created" => ($product && $product["country_date_created"]) ? $product["country_date_created"] : null,
				"created_by" => ($product && $product["country_created_by"]) ? (int)$product["country_created_by"] : null,
				"date_modified" => ($product && $product["country_date_modified"]) ? $product["country_date_modified"] : null,
				"modified_by" => ($product && $product["country_modified_by"]) ? (int)$product["country_modified_by"] : null,
				"note" => ($product && $product["country_note"]) ? $product["country_note"] : null,
			);
			$province = array(
				"id" => ($product && $product["province_id"]) ? (int)$product["province_id"] : null,
				"country_id" => ($product && $product["province_country_id"]) ? (int)$product["province_country_id"] : null,
				"name" => ($product && $product["province_name"]) ? $product["province_name"] : null,
				"iso2" => ($product && $product["province_iso2"]) ? $product["province_iso2"] : null,
				"iso3" => ($product && $product["province_iso3"]) ? $product["province_iso3"] : null,
				"sort_order" => ($product && $product["province_sort_order"]) ? (int)$product["province_sort_order"] : null,
				"blurb" => ($product && $product["province_blurb"]) ? $product["province_blurb"] : null,
				"enabled" => ($product && $product["province_enabled"]) ? $product["province_enabled"] : null,
				"date_created" => ($product && $product["province_date_created"]) ? $product["province_date_created"] : null,
				"created_by" => ($product && $product["province_created_by"]) ? (int)$product["province_created_by"] : null,
				"date_modified" => ($product && $product["province_date_modified"]) ? $product["province_date_modified"] : null,
				"modified_by" => ($product && $product["province_modified_by"]) ? (int)$product["province_modified_by"] : null,
				"note" => ($product && $product["province_note"]) ? $product["province_note"] : null,
			);
			$city = array(
				"id" => ($product && $product["city_id"]) ? (int)$product["city_id"] : null,
				"province_id" => ($product && $product["city_province_id"]) ? (int)$product["city_province_id"] : null,
				"country_id" => ($product && $product["city_country_id"]) ? (int)$product["city_country_id"] : null,
				"sort_order" => ($product && $product["city_sort_order"]) ? (int)$product["city_sort_order"] : null,
				"name" => ($product && $product["city_name"]) ? $product["city_name"] : null,
				"blurb" => ($product && $product["city_blurb"]) ? $product["city_blurb"] : null,
				"is_capital" => ($product && $product["city_is_capital"]) ? $product["city_is_capital"] : null,
				"enabled" => ($product && $product["city_enabled"]) ? $product["city_enabled"] : null,
				"date_created" => ($product && $product["city_date_created"]) ? $product["city_date_created"] : null,
				"created_by" => ($product && $product["city_created_by"]) ? (int)$product["city_created_by"] : null,
				"date_modified" => ($product && $product["city_date_modified"]) ? $product["city_date_modified"] : null,
				"modified_by" => ($product && $product["city_modified_by"]) ? (int)$product["city_modified_by"] : null,
				"note" => ($product && $product["city_note"]) ? $product["city_note"] : null,
			);
			$category = array(
				"id" => $product["category_id"],
				"pricing_strategy_types_id" => $product["category_pricing_strategy_types_id"],
				"attribute_id" => $product["category_attribute_id"],
				"name" => $product["category_name"],
				"icon" => $product["category_icon"],
				"view_product_index" => $product["category_view_product_index"],
				"view_product_index_filter" => $product["category_view_product_index_filter"],
				"view_product_index_search" => $product["category_view_product_index_search"],
				"view_product_edit" => $product["category_view_product_edit"],
				"view_product_package_edit" => $product["category_view_product_package_edit"],
				"view_product_package_index" => $product["category_view_product_package_index"],
				"all_day" => $product["category_all_day"],
				"overlap" => $product["category_overlap"],
				"editable" => $product["category_editable"],
				"duration_editable" => $product["category_duration_editable"],
				"start_editable" => $product["category_start_editable"],
				"display" => $product["category_display"],
				"background_color" => $product["category_background_color"],
				"text_color" => $product["category_text_color"],
				"border_color" => $product["category_border_color"],
				"sort_order" => $product["category_sort_order"],
				"enabled" => $product["category_enabled"],
				"date_created" => $product["category_date_created"],
				"created_by" => $product["category_created_by"],
				"date_modified" => $product["category_date_modified"],
				"modified_by" => $product["category_modified_by"],
				"note" => $product["category_note"],
			);
			
			$ratingText = str_repeat("<li class=''><i class='fas fa-star'></i></li>", $rating);
			$productStreet1 = (isset($product["product_street_1"])) ? $product["product_street_1"] : null;
			$productStreet2 = (isset($product["product_street_2"])) ? $product["product_street_2"] : null;
			$productPostalCode = (isset($product["product_postal_code"])) ? $product["product_postal_code"] : null;
			$productDescriptionShort = (isset($product["product_description_short"])) ? $product["product_description_short"] : null;
			$locationNames = generateLocationNames($country, $province, $city);
			
			return array(
				"street_1" => $productStreet1,
				"street_2" => $productStreet2,
				"postal_code" => $productPostalCode,
				"description_short" => $productDescriptionShort,
				"display_short" => (isset($locationNames) && isset($locationNames["short"])) ? $locationNames["short"] : null,
				"display_medium" => (isset($locationNames) && isset($locationNames["medium"])) ? $locationNames["medium"] : null,
				"display_long" => (isset($locationNames) && isset($locationNames["long"])) ? $locationNames["long"] : null,
				"id" => $productId,
				"name" => $productName,
				"rating_id" => $rating,
				"rating_text" => $ratingText,
				"category" => $category,
				"country" => $country,
				"province" => $province,
				"city" => $city,
			);
		}
		
	}
