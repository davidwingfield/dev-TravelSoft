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
				"classes" => "btn btn-sm btn-primary btn-round",
				"icon" => "fas fa-save",
				"id" => "button_save_product",
				"text" => "save product",
				"data" => array(
					"toggle" => "tooltip",
					"title" => "Save Product",
					"placement" => "top",
				),
			),
			
			"new" => array(
				"type" => "a",
				"href" => "javascript:void(0)",
				"classes" => "btn btn-sm btn-primary btn-round",
				"icon" => "fas fa-plus mr-2",
				"id" => "button_add_product_page_heading",
				"text" => "New Product",
				"data" => array(
					"toggle" => "tooltip",
					"title" => "Creat a New Product",
					"placement" => "top",
				),
			),
			
			"calendar" => array(
				"type" => "button",
				"href" => "button",
				"classes" => "btn btn-sm btn-primary btn-round flex-fill waves-effect waves-light",
				"text" => "Calendar",
				"icon" => "fas fa-calendar mr-2",
				"data" => array(
					"toggle" => "modal",
					"target" => "#seasonCalendarModal",
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
				
				"Provider" => array(
					"controls" => "panel_tab_product_provider",
					"href" => "panel_tab_product_provider",
					"id" => "panel_tab_provider",
					"active" => false,
					"aria" => array(
						"expanded" => "false",
					),
					"data" => array(),
				),
				"Vendor" => array(
					"controls" => "panel_tab_product_vendor",
					"href" => "panel_tab_product_vendor",
					"id" => "panel_tab_vendor",
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
			foreach ($results AS $k => $product) {
				$products[] = self::format($product);
			}
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
				$data = Page::getDetails(10);
				$results = [];
				$products = ProductModel::get($product_id);
				if (count($products) === 0) {
					header('Location: /products');
					exit(0);
				}
				foreach (ProductModel::get($product_id) AS $k => $product) {
					$results[] = self::format($product);
				}
				if (isset($results[0])) {
					$results = $results[0];
				}
				$data["product_details"] = $results;
				
				/** breadcrumbs */
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
				
				/**
				 * tabs
				 */
				$tabs = self::$tabs;
				
				$data["buttons"] = array(
					self::$buttons["calendar"],
					self::$buttons["save"],
					self::$buttons["new"],
				);
				$data["tabs"] = $tabs;
				
				/**
				 * render product edit page
				 */
				View::render_template("products/edit", $data);
				exit(0);
			}
			
			/**
			 * render product index page
			 */
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
		
		// ----
		
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
			
			//$results[] = ProductModel::updateAssignProfiles($params);
			
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			
			View::render_json($results);
			exit(0);
		}
		
		public static function serveTableUpdate(array $params = []): void
		{
			$input = filter_input_array(INPUT_POST);
			//Log::$debug_log->trace($input);
			
			// ----
			
			View::render_json($input);
		}
		
		public static function serveGet(array $params = []): void
		{
			$product_id = null;
			$products = [];
			if ($params["product_id"]) {
				$product_id = (int)$params["product_id"];
			}
			$results = ProductModel::get($product_id);
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
		
		private static function format(array $product = null): array
		{
			if (is_null($product)) {
				return [];
			}
			$rooms = array();
			
			$matrices = Matrix::getMatricesByProductId((int)$product['product_id']);
			$profiles = Profile::getByProductId((int)$product['product_id']);
			$seasons = Season::getSeasonsByProductId((int)$product['product_id']);
			$units = Unit::getUnitsByProductId((int)$product['product_id']);
			$variants = Variant::getVariantsByProductId((int)$product['product_id']);
			$pricings = Pricing::getPricingsByProductId((int)$product['product_id']);
			
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
			
			$provider = Provider::getByProviderId((int)$product['product_provider_id']);
			$provider = (isset($provider[0])) ? $provider[0] : [];
			
			$vendor = Vendor::getByVendorId((int)$product['product_vendor_id']);
			$vendor = (isset($vendor[0])) ? $vendor[0] : [];
			
			$use_provider_location = false;
			$location = Location::getByLocationId((int)$product['product_location_id']);
			$location_id = (int)$product['product_location_id'];
			
			return array(
				'id' => $product['product_id'],
				'use_provider_location' => $use_provider_location,
				'category_id' => $product['product_category_id'],
				'pricing_strategy_types_id' => $product['product_pricing_strategy_types_id'],
				'status_types_id' => $product['product_status_types_id'],
				'amenities' => $product['product_amenities'],
				'city_id' => $product["product_city_id"],
				'currency_id' => $product['product_currency_id'],
				'location_id' => $location_id,
				'provider_id' => $product['product_provider_id'],
				'vendor_id' => $product['product_vendor_id'],
				'rating_types_id' => $product['product_rating_types_id'],
				'name' => $product['product_name'],
				'description_short' => $product['product_description_short'],
				'description_long' => $product['product_description_long'],
				'sku' => $product['product_sku'],
				'depart_from' => $product['product_depart_from'],
				'arrive_to' => $product['product_arrive_to'],
				'depart_time' => $product['product_depart_time'],
				'arrive_time' => $product['product_arrive_time'],
				'provider_vendor_match' => $product['product_provider_vendor_match'],
				'day_span' => $product['product_day_span'],
				'cover_image' => $product['product_cover_image'],
				'api_id' => $product['product_api_id'],
				'from_api' => $product['product_from_api'],
				'hotel_code' => $product['product_hotel_code'],
				'sort_order' => $product['product_sort_order'],
				'keywords' => $product['product_keywords'],
				'enabled' => $product['product_enabled'],
				'date_created' => $product['product_date_created'],
				'created_by' => $product['product_created_by'],
				'date_modified' => $product['product_date_modified'],
				'modified_by' => $product['product_modified_by'],
				'note' => $product['product_note'],
				'street_1' => ($product['product_street_1']) ? $product['product_street_1'] : null,
				'street_2' => ($product['product_street_2']) ? $product['product_street_2'] : null,
				'postal_code' => ($product['product_postal_code']) ? $product['product_postal_code'] : null,
				
				'status_type_detail' => array(
					'id' => $product['status_types_id'],
					'name' => $product['status_types_name'],
					'enabled' => $product['status_types_enabled'],
					'date_created' => $product['status_types_date_created'],
					'created_by' => $product['status_types_created_by'],
					'date_modified' => $product['status_types_date_modified'],
					'modified_by' => $product['status_types_modified_by'],
					'note' => $product['status_types_note'],
					'sort_order' => $product['status_types_sort_order'],
				),
				'category' => array(
					'id' => $product['category_id'],
					'pricing_strategy_types_id' => $product['category_pricing_strategy_types_id'],
					'attribute_id' => $product['category_attribute_id'],
					'name' => $product['category_name'],
					'icon' => $product['category_icon'],
					'view_product_index' => $product['category_view_product_index'],
					'view_product_index_filter' => $product['category_view_product_index_filter'],
					'view_product_index_search' => $product['category_view_product_index_search'],
					'view_product_edit' => $product['category_view_product_edit'],
					'view_product_package_edit' => $product['category_view_product_package_edit'],
					'view_product_package_index' => $product['category_view_product_package_index'],
					'all_day' => $product['category_all_day'],
					'overlap' => $product['category_overlap'],
					'editable' => $product['category_editable'],
					'duration_editable' => $product['category_duration_editable'],
					'start_editable' => $product['category_start_editable'],
					'display' => $product['category_display'],
					'background_color' => $product['category_background_color'],
					'text_color' => $product['category_text_color'],
					'border_color' => $product['category_border_color'],
					'sort_order' => $product['category_sort_order'],
					'enabled' => $product['category_enabled'],
					'date_created' => $product['category_date_created'],
					'created_by' => $product['category_created_by'],
					'date_modified' => $product['category_date_modified'],
					'modified_by' => $product['category_modified_by'],
					'note' => $product['category_note'],
				),
				'location' => $location,
				'provider' => $provider,
				'vendor' => $vendor,
				'seasons' => $seasons,
				'units' => $units,
				'variants' => $variants,
				'profiles' => $profiles,
				'matrices' => $matrices,
				'pricings' => $pricings,
			);
		}
		
		public static function autocomplete(array $params = []): array
		{
			//Log::$debug_log->trace($params);
			if (!isset($params["category_id"])) {
				return [];
			}
			$st = (isset($params["st"])) ? $params["st"] : "";
			$category_id = (isset($params["category_id"])) ? (int)$params["category_id"] : null;
			
			return self::format_ac(ProductModel::product_ac($st, (int)$category_id));
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
		
		public static function serveAdd(array $params = []): void
		{
			/**
			 * render product json
			 */
			header("Content-type:application/json");
			View::render_json(ProductModel::addRecord($params));
			exit(0);
		}
		
	}
