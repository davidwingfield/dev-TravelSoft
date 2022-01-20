<?php
	
	namespace Framework\App\Controllers;
	
	use Exception;
	use Framework\App\Controllers\StaticPages;
	use Framework\App\Models\AddressModel;
	use Framework\App\Models\CompanyModel;
	use Framework\App\Models\ContactModel;
	use Framework\App\Models\CountryModel;
	use Framework\App\Models\ProviderModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short Provider Description
	 * Long Provider Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Provider extends Controller
	{
		/**
		 * buttons
		 *
		 * @var array
		 */
		protected static $buttons = array(
			"save" => array(
				"type" => "a",
				"href" => "javascript:void(0)",
				"classes" => "btn btn-sm btn-primary btn-round",
				"icon" => "fas fa-save",
				"id" => "button_save_provider",
				"text" => "save provider",
				"data" => array(
					"toggle" => "tooltip",
					"title" => "Save Provider",
					"placement" => "top",
				),
			),
			
			"new" => array(
				"type" => "a",
				"href" => "/providers/new",
				"classes" => "btn btn-outline-primary btn-sm btn-icon btn-round",
				"icon" => "fas fa-plus",
				"id" => "button_add_provider_page_heading",
				"text" => "",
				"data" => array(
					"toggle" => "tooltip",
					"title" => "Creat a New Provider",
					"placement" => "top",
				
				),
			),
		);
		
		/**
		 * provider tabs
		 *
		 * @var array
		 */
		protected static $tabs = array(
			"id" => "provider_edit_tabs",
			"role" => "tablist",
			"class" => "nav nav-tabs nav-tabs-line",
			"tabs" => array(
				"Overview" => array(
					"controls" => "panel_tab_provider_overview",
					"href" => "panel_tab_provider_overview",
					"id" => "panel_tab_provider_o",
					"active" => false,
					"aria" => array(
						"expanded" => "false",
					),
					"data" => array(),
				),
				"Company" => array(
					"controls" => "panel_tab_company_detail",
					"href" => "panel_tab_company_detail",
					"id" => "panel_tab_company",
					"active" => true,
					"aria" => array(
						"expanded" => "true",
					),
					"data" => array(),
				),
				"Provider" => array(
					"controls" => "panel_tab_provider_detail",
					"href" => "panel_tab_provider_detail",
					"id" => "panel_tab_provider",
					"active" => false,
					"aria" => array(
						"expanded" => "false",
					),
					"data" => array(),
				
				),
				"Location" => array(
					"controls" => "panel_tab_location_detail",
					"href" => "panel_tab_location_detail",
					"id" => "panel_tab_location",
					"active" => false,
					"aria" => array(
						"expanded" => "false",
					),
					"data" => array(),
				),
				"Vendor" => array(
					"controls" => "panel_tab_vendor_detail",
					"href" => "panel_tab_vendor_detail",
					"id" => "panel_tab_vendor",
					"active" => false,
					"aria" => array(
						"expanded" => "false",
					),
					"data" => array(),
				),
				"Addresses" => array(
					"controls" => "panel_tab_address_detail",
					"href" => "panel_tab_address_detail",
					"id" => "panel_tab_address",
					"active" => false,
					"aria" => array(
						"expanded" => "false",
					),
					"data" => array(),
				),
				"Contacts" => array(
					"controls" => "panel_tab_contact_detail",
					"href" => "panel_tab_contact_detail",
					"id" => "panel_tab_contact",
					"active" => false,
					"aria" => array(
						"expanded" => "false",
					),
					"data" => array(),
				),
				"Meta" => array(
					"controls" => "panel_tab_meta_detail",
					"href" => "panel_tab_meta_detail",
					"id" => "panel_tab_meta",
					"active" => false,
					"aria" => array(
						"expanded" => "false",
					),
					"data" => array(),
				),
			),
		);
		
		/**
		 * result values
		 *
		 * @var array
		 */
		protected static $data = [];
		
		/**
		 * __construct
		 * Loads Controller Elements
		 */
		public function __construct()
		{
			parent::__construct();
		}
		
		/**
		 * index
		 * Loads Provider Index
		 */
		public static function index(array $params = []): void
		{
			$data = Page::getDetails(5);
			
			/** breadcrumbs */
			define("BREAD_CRUMBS", "
                    <li class='breadcrumb-item'>
                        <a href='/'>Home</a>
                    </li>
                    <li class='breadcrumb-item'>
                        Providers
                    </li>"
			);
			
			/**
			 * buttons
			 */
			$data["buttons"] = array(
				self::$buttons["new"],
			);
			
			/**
			 * header
			 */
			if (!defined("PAGEHEADINGCLASS")) {
				define("PAGEHEADINGCLASS", "");
			}
			
			/**
			 * render view
			 */
			$data["providers"] = self::format_get(ProviderModel::get());
			View::render_template("providers/index", $data);
			exit(0);
		}
		
		/**
		 * load edit provider page
		 * Loads Provider Edit
		 */
		public static function edit(array $params = [])
		{
			$provider_id = (int)$params["provider_id"];
			$contact_detail = [];
			$address_detail = [];
			$company_detail = [];
			$vendor_detail = [];
			$company_images = [];
			$location_detail = [];
			//----
			if (isset($params["provider_id"])) {
				$data = Page::getDetails(6);
				
				/** breadcrumbs */
				define("BREAD_CRUMBS", "
                    <li class='breadcrumb-item'>
                        <a href='/'>Home</a>
                    </li>
                    <li class='breadcrumb-item'>
                        <a href='/providers'>Providers</a>
                    </li>
                    <li class='breadcrumb-item'>
                        $provider_id
                    </li>"
				);
				
				/**
				 * header
				 */
				if (!defined("PAGEHEADINGCLASS")) {
					define("PAGEHEADINGCLASS", " page-header page-header-bordered page-header-tabs");
				}
				
				/**
				 * tabs
				 */
				$tabs = self::$tabs;
				
				/** get provider details */
				$provider_detail = self::format_get(ProviderModel::get($provider_id));
				
				/** get only one */
				if (count($provider_detail) >= 1) {
					$provider_detail = $provider_detail[0];
				}
				
				if (isset($provider_detail["contacts"])) {
					foreach ($provider_detail["contacts"] AS $k => $contact) {
						$contact_detail[] = Contact::format($contact);
					}
				}
				
				if (isset($provider_detail["company"])) {
					$company_detail = $provider_detail["company"];
					$company_detail["images"] = array();
				}
				
				if (isset($provider_detail["addresses"])) {
					$address_detail = Address::format($provider_detail["addresses"]);
					$provider_detail["addresses"] = $address_detail;
				}
				
				if (isset($provider_detail["location"])) {
					$location_detail = $provider_detail["location"];
				}
				
				if (isset($provider_detail["vendor"])) {
					$vendor_detail = $provider_detail["vendor"];
				}
				
				/**
				 * set data params
				 */
				$data["provider_detail"] = $provider_detail;
				$data["company_detail"] = $company_detail;
				$data["company_detail"]["images"] = $company_images;
				$data["contact_detail"] = $contact_detail;
				$data["vendor_detail"] = $vendor_detail;
				$data["location_detail"] = $location_detail;
				$data["address_detail"] = $address_detail;
				$data["buttons"] = array(
					self::$buttons["save"],
					self::$buttons["new"],
				);
				$data["tabs"] = self::$tabs;
				
				/**
				 * render view
				 */
				View::render_template("providers/edit", $data);
				exit(0);
			}
			/** Provider not found Logging and redirecting to new */
			Log::$debug_log->trace("Provider Id Not Found");
			header("Location: /providers/new");
			exit(0);
		}
		
		/**
		 * get by provider id
		 *
		 * @param int|null $provider_id
		 *
		 * @return array
		 */
		public static function getByProviderId(int $provider_id = null): array
		{
			return self::format_get(ProviderModel::get($provider_id));
		}
		
		/**
		 * new
		 * Loads New Provider
		 */
		public static function new(array $params = [])
		{
			$data = Page::getDetails(14);
			$data["is_new"] = true;
			
			/** breadcrumbs */
			define("BREAD_CRUMBS", "
                    <li class='breadcrumb-item'>
                        <a href='/'>Home</a>
                    </li>
                    <li class='breadcrumb-item'>
                        <a href='/providers'>Providers</a>
                    </li>
                    <li class='breadcrumb-item'>
                        New
                    </li>"
			);
			
			/**
			 * header
			 */
			if (!defined("PAGEHEADINGCLASS")) {
				define("PAGEHEADINGCLASS", " page-header-bordered page-header-tabs");
			}
			
			/**
			 * buttons
			 */
			$data["buttons"] = array(
				self::$buttons["save"],
			);
			$data["tabs"] = self::$tabs;
			View::render_template("providers/edit", $data);
			exit(0);
		}
		
		/**
		 * handle post update request
		 *
		 * @param array $params
		 */
		public static function serveUpdate(array $params = [])
		{
			$provider = [];
			
			if (isset($params["company_detail"])) {
				Log::$debug_log->trace($params["company_detail"]);
				$company = Company::update($params["company_detail"]);
			}
			
			if (isset($params["vendor_detail"])) {
				Log::$debug_log->trace($params["vendor_detail"]);
				$vendor = Vendor::callUpdate($params["vendor_detail"]);
			}
			
			if (isset($params["provider_detail"])) {
//                Log::$debug_log->trace($params["provider_detail"]);
				if (!isset($params["provider_detail"]["sku"])) {
					//$params["provider_detail"]["sku"]
				}
				
				$provider = ProviderModel::update($params["provider_detail"]);
			}
			if (count($provider) === 1) {
				$provider = $provider[0];
			}
			$provider_id = $provider["provider_id"];
			$provider_detail = self::format_get(ProviderModel::get($provider_id));
			Log::$debug_log->trace($provider_detail);
			//
			
			/**
			 * render json response
			 */
			View::render_json($provider_detail);
			exit(0);
		}
		
		/**
		 * autocomplete
		 * Autocomplete json
		 */
		public static function autocomplete(string $st = ""): array
		{
			return self::format_ac(ProviderModel::provider_ac($st));
		}
		
		/**
		 * validate if name already exists
		 *
		 * @param array $args
		 *
		 * @return array
		 */
		public static function validateName(array $args = []): array
		{
			$providers = array();
			if (isset($args["name"])) {
				$name = $args["name"];
				$results = ProviderModel::getByName($name);
				
				foreach ($results AS $k => $provider) {
					$providers[] = self::format($provider);
				}
			}
			// ----
			View::render_json($providers);
			exit(0);
		}
		
		/**
		 * format
		 *
		 * @param array $providers
		 *
		 * @return array
		 */
		private static function format(array $provider = []): array
		{
			$company_id = $provider["company_id"];
			$vendor_id = (isset($provider["vendor_id"])) ? (int)$provider["vendor_id"] : null;
			$vendor_company_id = (isset($provider["vendor_id"])) ? (int)$provider["vendor_company_id"] : null;
			$vendor_company_name = (isset($provider["vendor_company_name"])) ? $provider["vendor_company_name"] : null;
			$vendor_company_phone_1 = (isset($provider["vendor_company_phone_1"])) ? $provider["vendor_company_phone_1"] : null;
			$vendor_company_phone_2 = (isset($provider["vendor_company_phone_2"])) ? $provider["vendor_company_phone_2"] : null;
			$vendor_company_fax = (isset($provider["vendor_company_fax"])) ? $provider["vendor_company_fax"] : null;
			$vendor_company_website = (isset($provider["vendor_company_website"])) ? $provider["vendor_company_website"] : null;
			$vendor_company_email = (isset($provider["vendor_company_email"])) ? $provider["vendor_company_email"] : null;
			$vendor_company_enabled = (isset($provider["vendor_company_enabled"])) ? (int)$provider["vendor_company_enabled"] : null;
			$vendor_company_created_by = (isset($provider["vendor_company_created_by"])) ? (int)$provider["vendor_company_created_by"] : null;
			$vendor_company_date_created = (isset($provider["vendor_company_date_created"])) ? $provider["vendor_company_date_created"] : null;
			$vendor_company_modified_by = (isset($provider["vendor_company_modified_by"])) ? (int)$provider["vendor_company_modified_by"] : null;
			$vendor_company_date_modified = (isset($provider["vendor_company_date_modified"])) ? $provider["vendor_company_date_modified"] : null;
			$vendor_company_status = (isset($provider["vendor_company_status"])) ? (int)$provider["vendor_company_status"] : null;
			$vendor_company_note = (isset($provider["vendor_company_note"])) ? $provider["vendor_company_note"] : null;
			$addresses = AddressModel::getByCompanyId((int)$company_id);
			$address_list_formatted = [];
			foreach ($addresses AS $k => $address) {
				$address_list_formatted[] = $address;
			}
			$contacts = ContactModel::getByCompanyId((int)$company_id);
			$contact_list_formatted = [];
			foreach ($contacts AS $k => $contact) {
				$contact_list_formatted[] = Contact::format($contact);
			}
			
			$cover_image = "";
			$images = Image::getByCompanyId((int)$provider["company_id"]);
			for ($n = 0; $n < count($images); $n++) {
				if ($images[$n]["is_cover_image"] === 1) {
					$cover_image = $images[$n]["path"] . "/" . $images[$n]["name"] . "." . $images[$n]["extension"];
				}
			}
			
			$temp = array(
				"id" => (int)$provider["provider_id"],
				"name" => $provider["company_name"],
				"code_direct_id" => $provider["provider_code_direct_id"],
				"description_long" => $provider["provider_description_long"],
				"description_short" => $provider["provider_description_short"],
				"keywords" => $provider["provider_keywords"],
				"location_id" => $provider["provider_location_id"],
				"note" => $provider["provider_note"],
				"enabled" => $provider["provider_enabled"],
				"company_id" => $provider["provider_company_id"],
				"date_created" => $provider["provider_date_created"],
				"date_modified" => $provider["provider_date_modified"],
				"created_by" => $provider["provider_created_by"],
				"modified_by" => $provider["provider_modified_by"],
				"vendor" => array(
					"id" => (isset($provider["vendor_id"])) ? $provider["vendor_id"] : null,
					"company_id" => (isset($provider["vendor_company_id"])) ? $provider["vendor_company_id"] : null,
					"name" => $vendor_company_name,
					"sku" => (isset($provider["vendor_sku"])) ? $provider["vendor_sku"] : null,
					"show_online" => (isset($provider["vendor_show_online"])) ? $provider["vendor_show_online"] : null,
					"is_provider" => (isset($provider["vendor_is_provider"])) ? $provider["vendor_is_provider"] : null,
					"show_sales" => (isset($provider["vendor_show_sales"])) ? $provider["vendor_show_sales"] : null,
					"show_ops" => (isset($provider["vendor_show_ops"])) ? $provider["vendor_show_ops"] : null,
					"enabled" => (isset($provider["vendor_enabled"])) ? $provider["vendor_enabled"] : null,
					"created_by" => (isset($provider["vendor_created_by"])) ? $provider["vendor_created_by"] : null,
					"date_created" => (isset($provider["vendor_date_created"])) ? $provider["vendor_date_created"] : null,
					"modified_by" => (isset($provider["vendor_modified_by"])) ? $provider["vendor_modified_by"] : null,
					"date_modified" => (isset($provider["vendor_date_modified"])) ? $provider["vendor_date_modified"] : null,
					"note" => (isset($provider["vendor_note"])) ? $provider["vendor_note"] : null,
					"company" => array(
						"images" => Image::getByCompanyId((int)$vendor_company_id),
						"id" => $vendor_company_id,
						"name" => $vendor_company_name,
						"phone_1" => $vendor_company_phone_1,
						"phone_2" => $vendor_company_phone_2,
						"fax" => $vendor_company_fax,
						"website" => $vendor_company_website,
						"email" => $vendor_company_email,
						"enabled" => $vendor_company_enabled,
						"created_by" => $vendor_company_created_by,
						"date_created" => $vendor_company_date_created,
						"modified_by" => $vendor_company_modified_by,
						"date_modified" => $vendor_company_date_modified,
						"status" => $vendor_company_status,
						"note" => $vendor_company_note,
					),
				),
				"company" => array(
					"images" => $images,
					"keywords" => $provider["company_keywords"],
					"description_short" => $provider["company_description_short"],
					"description_long" => $provider["company_description_long"],
					"logo" => $provider["company_logo"],
					"id" => $provider["company_id"],
					"cover_image" => $cover_image,
					"name" => $provider["company_name"],
					"phone_1" => $provider["company_phone_1"],
					"phone_2" => $provider["company_phone_2"],
					"fax" => $provider["company_fax"],
					"website" => $provider["company_website"],
					"email" => $provider["company_email"],
					"enabled" => $provider["company_enabled"],
					"created_by" => $provider["company_created_by"],
					"date_created" => $provider["company_date_created"],
					"modified_by" => $provider["company_modified_by"],
					"date_modified" => $provider["company_date_modified"],
					"status_id" => $provider["company_status_id"],
					"note" => $provider["company_note"],
				),
				"addresses" => $address_list_formatted,
				"contacts" => $contact_list_formatted,
				"location" => array(
					"display_short" => $provider["location_short"],
					"display_medium" => $provider["location"],
					"display_long" => $provider["location_long"],
					"name" => $provider["location_name"],
					"id" => $provider["location_id"],
					"street_1" => $provider["location_street_1"],
					"street_2" => $provider["location_street_2"],
					"zipcode" => $provider["location_zipcode"],
					"enabled" => $provider["location_enabled"],
					"date_created" => $provider["location_date_created"],
					"created_by" => $provider["location_created_by"],
					"date_modified" => $provider["location_date_modified"],
					"modified_by" => $provider["location_modified_by"],
					"note" => $provider["location_note"],
					"type" => array(
						"id" => $provider["location_types_id"],
						"name" => $provider["location_types_name"],
						"icon" => $provider["location_types_icon"],
						"sort_order" => $provider["location_types_sort_order"],
						"enabled" => $provider["location_types_enabled"],
						"date_created" => $provider["location_types_date_created"],
						"created_by" => $provider["location_types_created_by"],
						"date_modified" => $provider["location_types_date_modified"],
						"modified_by" => $provider["location_types_modified_by"],
						"note" => $provider["location_types_note"],
					),
					"country" => array(
						"id" => $provider["country_id"],
						"name" => $provider["country_name"],
						"name_long" => $provider["country_name_long"],
						"iso2" => $provider["country_iso2"],
						"iso3" => $provider["country_iso3"],
						"sort_order" => $provider["country_sort_order"],
						"enabled" => $provider["country_enabled"],
						"date_created" => $provider["country_date_created"],
						"created_by" => $provider["country_created_by"],
						"date_modified" => $provider["country_date_modified"],
						"modified_by" => $provider["country_modified_by"],
						"note" => $provider["country_note"],
					),
					"province" => array(
						"id" => $provider["province_id"],
						"name" => $provider["province_name"],
						"name_long" => $provider["province_name_long"],
						"iso2" => $provider["province_iso2"],
						"iso3" => $provider["province_iso3"],
						"sort_order" => $provider["province_sort_order"],
						"enabled" => $provider["province_enabled"],
						"date_created" => $provider["province_date_created"],
						"created_by" => $provider["province_created_by"],
						"date_modified" => $provider["province_date_modified"],
						"modified_by" => $provider["province_modified_by"],
						"note" => $provider["province_note"],
					),
					"city" => array(
						"id" => $provider["city_id"],
						"name" => $provider["city_name"],
						"sort_order" => $provider["city_sort_order"],
						"enabled" => $provider["city_enabled"],
						"date_created" => $provider["city_date_created"],
						"created_by" => $provider["city_created_by"],
						"date_modified" => $provider["city_date_modified"],
						"modified_by" => $provider["city_modified_by"],
						"note" => $provider["city_note"],
					),
				),
			);
			
			return $temp;
		}
		
		/**
		 * format_get
		 */
		private static function format_get(array $providers = []): array
		{
			$data = [];
			foreach ($providers AS $k => $provider) {
				array_push($data, self::format($provider));
			}
			
			return $data;
		}
		
		/**
		 * format autocomplete results
		 *
		 * @param array $providers
		 *
		 * @return array
		 */
		private static function format_ac(array $providers = []): array
		{
			$data["suggestions"] = [];
			foreach ($providers AS $k => $provider) {
				$l = (object)$provider;
				$value = utf8_encode($l->company_name);
				array_push($data["suggestions"], [
					"value" => utf8_encode($value),
					"data" => self::format($provider),
				]);
			}
			
			return $data;
		}
		
		/**
		 * system generated Code Direct Id
		 *
		 * @param array $provider
		 *
		 * @return string
		 */
		public static function generateCodeDirectId(array $provider): string
		{
			Log::$debug_log->trace("-------- generateCodeDirectId --------");
			Log::$debug_log->trace($provider);
			Log::$debug_log->trace("-------------------------");
			$name = $provider["company_name"];
			$id = $provider["provider_id"];
			
			$words = preg_split("/\s+/", $name);
			$count = count($words);
			$codeDirectId = str_pad($id, 1, "0", STR_PAD_LEFT);
			
			$t = "P-";
			
			return $t . $codeDirectId;
		}
		
	}
