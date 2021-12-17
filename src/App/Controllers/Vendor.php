<?php
    
    namespace Framework\App\Controllers;
    
    use Framework\App\Models\AddressModel;
    use Framework\App\Models\ContactModel;
    use Framework\App\Models\VendorModel;
    use Framework\Core\Controller;
    use Framework\Core\View;
    use Framework\Logger\Log;
    
    /**
     * Short Vendor Description
     * Long Vendor Description
     *
     * @package            Framework\App
     * @subpackage         Controllers
     */
    class Vendor extends Controller
    {
        protected $primaryKey = "id";
        
        protected $sku = null;
        
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
                "id" => "button_save_vendor",
                "text" => "save vendor",
                "data" => array(
                    "toggle" => "tooltip",
                    "title" => "Save Vendor",
                    "placement" => "top",
                ),
            ),
            
            "new" => array(
                "type" => "a",
                "href" => "javascript:void(0)",
                "classes" => "btn btn-outline-primary btn-sm btn-icon btn-round",
                "icon" => "fas fa-plus",
                "id" => "button_add_vendor_page_heading",
                "text" => "",
                "data" => array(
                    "toggle" => "tooltip",
                    "title" => "Creat a New Vendor",
                    "placement" => "top",
                
                ),
            ),
        );
        
        /**
         * vendor tabs
         *
         * @var array
         */
        protected static $tabs = array(
            "id" => "vendor_edit_tabs",
            "role" => "tablist",
            "class" => "nav nav-tabs nav-tabs-line",
            "tabs" => array(
                "Overview" => array(
                    "controls" => "panel_tab_vendor_overview",
                    "href" => "panel_tab_vendor_overview",
                    "id" => "panel_tab_overview",
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
        
        public function __construct()
        {
            parent::__construct();
        }
        
        public static function edit(array $params = [])
        {
            
            $contact_detail = [];
            $address_detail = [];
            $company_detail = [];
            $company_images = [];
            //----
            if (isset($params["vendor_id"])) {
                $vendor_id = (int)$params["vendor_id"];
                $data = Page::getDetails(8);
                
                /** breadcrumbs */
                define("BREAD_CRUMBS", "
                    <li class='breadcrumb-item'>
                        <a href='/'>Home</a>
                    </li>
                    <li class='breadcrumb-item'>
                        <a href='/vendors'>Vendors</a>
                    </li>
                    <li class='breadcrumb-item'>
                        $vendor_id
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
                $vendor_detail = self::format_get(VendorModel::get($vendor_id));
                
                if (count($vendor_detail) === 1) {
                    $vendor_detail = $vendor_detail[0];
                }
                $company_detail = [];
                if (isset($vendor_detail["company"])) {
                    $company_detail = $vendor_detail["company"];
                }
                
                if (isset($company_detail["contacts"])) {
                    foreach ($company_detail["contacts"] AS $k => $contact) {
                        $contact_detail[] = Contact::format($contact);
                    }
                }
                
                if (isset($company_detail["addresses"])) {
                    $address_detail = Address::format($company_detail["addresses"]);
                }
                
                $data["buttons"] = array(
                    self::$buttons["save"],
                    self::$buttons["new"],
                );
                $data["tabs"] = $tabs;
                
                $data["vendor_detail"] = $vendor_detail;
                $data["company_detail"] = $company_detail;
                $data["contact_detail"] = $contact_detail;
                $data["address_detail"] = $address_detail;
                /**
                 * render view
                 */
                View::render_template("vendors/edit", $data);
                exit(1);
            }
        }
        
        public static function index()
        {
            $data = Page::getDetails(7);
            /** breadcrumbs */
            define("BREAD_CRUMBS", "
                    <li class='breadcrumb-item'>
                        <a href='/'>Home</a>
                    </li>
                    <li class='breadcrumb-item'>
                        Vendors
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
                define("PAGEHEADINGCLASS", " ");
            }
            
            /**
             * render view
             */
            $vendors = VendorModel::get();
            $data["vendors"] = self::format_get($vendors);
            
            View::render_template("vendors/index", $data);
            exit(1);
        }
        
        // --
        
        /**
         * get vendor by Id
         *
         * @param int|null $vendor_id
         *
         * @return array
         */
        public static function getByVendorId(int $vendor_id = null): array
        {
            $vendors = [];
            
            if (!isset($vendor_id)) {
                $vendor_id = null;
            }
            
            $results = VendorModel::get($vendor_id);
            
            if ($results) {
                foreach ($results AS $vendor) {
                    $vendors[] = self::format($vendor);
                }
            }
            
            return $vendors;
        }
        
        /**
         * api get request
         *
         * @param array $params
         */
        public function serveGet(array $params = [])
        {
            $vendor_id = null;
            if (isset($params["vendor_id"])) {
                $vendor_id = (int)$params["vendor_id"];
            }
            $results = VendorModel::get($vendor_id);
            if ($results) {
                foreach ($results AS $vendor) {
                    $vendors[] = self::format($vendor);
                }
            }
            // ----
            View::render_json($vendors);
            exit(1);
        }
        
        /**
         * handle server request add
         *
         * @param array|null $params
         */
        public static function serveAdd(array $params = null)
        {
            
            $vendors = [];
            if ($params) {
                $params["status_id"] = (isset($params["status_id"])) ? $params["status_id"] : 1;
                $company_name = null;
                if (isset($params["name"])) {
                    $company_name = $params["name"];
                }
                
                $company = Company::add($params);
                
                if (isset($company["id"])) {
                    $company_id = (int)$company["id"];
                    $status_id = 1;
                    
                    $vendor_params = array(
                        "name" => $company_name,
                        "company_id" => $company_id,
                        "status_id" => $status_id,
                        "show_online" => (isset($params["show_online"])) ? $params["show_online"] : 1,
                        "show_sales" => (isset($params["show_sales"])) ? $params["show_sales"] : 1,
                        "show_ops" => (isset($params["show_ops"])) ? $params["show_ops"] : 1,
                        "is_provider" => (isset($params["is_provider"])) ? $params["is_provider"] : 0,
                        "enabled" => (isset($params["enabled"])) ? $params["enabled"] : 1,
                    );
                    // ----
//                    Log::$debug_log->trace($vendor_params);
                    $results = VendorModel::updateRecord($vendor_params);
                    
                    foreach ($results AS $k => $vendor) {
                        $vendors[] = self::format_vendor($vendor);
                    }
                    
                }
            }
            
            // ----
//            Log::$debug_log->trace($vendors);
            View::render_json($vendors);
            exit(1);
        }
        
        /**
         * handle add process
         *
         * @param array|null $params
         */
        public static function add(array $params = null)
        {
            $vendors = [];
            if ($params) {
                $results = VendorModel::updateRecord($params);
            }
            foreach ($results AS $k => $vendor) {
                $vendors[] = self::format_vendor($vendor);
            }
            
            // ----
            View::render_json($vendors);
            exit(1);
        }
        
        /**
         * @param array|null $params
         */
        public static function serveUpdate(array $params = null)
        {
            $results = [];
            $company = [];
            $vendors = array();
            if ($params) {
                if (isset($params["company_detail"])) {
                    $company = Company::update($params["company_detail"]);
                    Log::$debug_log->trace($company);
                }
                
                $results = VendorModel::updateRecord($params);
                
            }
            
            foreach ($results AS $k => $vendor) {
                $vendors[] = self::format_vendor($vendor);
            }
            if (count($vendors) === 1 && isset($vendors[0])) {
                $vendors = $vendors[0];
            }
            Log::$debug_log->trace($vendors);
            // ----
            View::render_json($vendors);
            exit(1);
        }
        
        /**
         * update that return string
         *
         * @param array $vendor
         *
         * @return array
         */
        public static function callUpdate(array $vendor = []): array
        {
            $results = [];
            
            if ($vendor) {
                $results = VendorModel::updateRecord($vendor);
            }
            
            return $results;
        }
        
        /**
         * autocomplete
         * Autocomplete json
         */
        public static function autocomplete(string $st = ""): array
        {
            return self::format_ac(VendorModel::vendor_ac($st));
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
            
            $vendors = array();
            if (isset($args["name"])) {
                $name = $args["name"];
                $results = VendorModel::getByName($name);
                
                foreach ($results AS $k => $vendor) {
                    $vendors[] = self::format($vendor);
                }
            }
            // ----
            
            View::render_json($vendors);
            exit(1);
        }
        
        /**
         * format autocomplete result set
         *
         * @param array $vendors
         *
         * @return array
         */
        private static function format_ac(array $vendors = []): array
        {
            
            $data["suggestions"] = [];
            
            foreach ($vendors AS $k => $vendor) {
                $value = utf8_encode($vendor["company_name"]);
                array_push($data["suggestions"], [
                    "value" => utf8_encode($value),
                    "data" => self::format($vendor),
                ]);
            }
            
            return $data;
        }
        
        /**
         * system generated SKU
         *
         * @param array $vendor
         *
         * @return string
         */
        public static function generateSKU(array $vendor): string
        {
            $name = $vendor["company_name"];
            $id = $vendor["vendor_id"];
            
            $words = preg_split("/\s+/", $name);
            $count = count($words);
            $sku = str_pad($id, 11, "0", STR_PAD_LEFT);
            
            $t = "";
            if ($count >= 3) {
                for ($n = 0; $n < 3; $n++) {
                    $t .= strtoupper(substr($words[$n], 0, 1));
                }
            } else if ($count == 2) {
                for ($n = 0; $n < 2; $n++) {
                    $t .= strtoupper(substr($words[$n], 0, 1));
                }
                $t .= "X";
            } else if ($count == 1) {
                for ($n = 0; $n < 1; $n++) {
                    $t .= strtoupper(substr($words[$n], 0, 1));
                }
                $t .= "XX";
            } else {
                $t = "XXX";
            }
            
            return $t . $sku;
        }
        
        /**
         * format result set
         *
         * @param array $vendor
         *
         * @return array
         */
        private static function format(array $vendor = []): array
        {
            $company_id = (int)$vendor["company_id"];
            $vendor_id = (int)$vendor["vendor_id"];
            $cover_image = "";
            $images = Image::getByCompanyId($company_id);
            
            //
            
            for ($n = 0; $n < count($images); $n++) {
                if ($images[$n]["is_cover_image"] === 1) {
                    $cover_image = $images[$n]["path"] . "/" . $images[$n]["name"] . "." . $images[$n]["extension"];
                }
            }
            
            return array(
                "id" => $vendor_id,
                "company_id" => $company_id,
                "sku" => $vendor["vendor_sku"],
                "name" => $vendor["company_name"],
                "is_provider" => $vendor["vendor_is_provider"],
                "show_online" => $vendor["vendor_show_online"],
                "show_sales" => $vendor["vendor_show_sales"],
                "show_ops" => $vendor["vendor_show_ops"],
                "status_id" => $vendor["vendor_status_id"],
                "note" => $vendor["vendor_note"],
                "enabled" => $vendor["vendor_enabled"],
                "date_created" => $vendor["vendor_date_created"],
                "date_modified" => $vendor["vendor_date_modified"],
                "created_by" => $vendor["vendor_created_by"],
                "modified_by" => $vendor["vendor_modified_by"],
                "description_short" => $vendor["vendor_description_short"],
                "description_long" => $vendor["vendor_description_long"],
                "company" => array(
                    "images" => $images,
                    "id" => $vendor["company_id"],
                    "name" => $vendor["company_name"],
                    "phone_1" => $vendor["company_phone_1"],
                    "phone_2" => $vendor["company_phone_2"],
                    "fax" => $vendor["company_fax"],
                    "website" => $vendor["company_website"],
                    "email" => $vendor["company_email"],
                    "enabled" => $vendor["company_enabled"],
                    "created_by" => $vendor["company_created_by"],
                    "date_created" => $vendor["company_date_created"],
                    "modified_by" => $vendor["company_modified_by"],
                    "date_modified" => $vendor["company_date_modified"],
                    "status_id" => $vendor["company_status_id"],
                    "cover_image" => $cover_image,
                    "note" => $vendor["company_note"],
                    "keywords" => $vendor["company_keywords"],
                    "description_short" => $vendor["company_description_short"],
                    "description_long" => $vendor["company_description_long"],
                    "logo" => $vendor["company_logo"],
                    "addresses" => AddressModel::getByCompanyId((int)$company_id),
                    "contacts" => ContactModel::getByCompanyId((int)$company_id),
                ),
            );
            
        }
        
        /**
         * format just the vendor results
         *
         * @param array $vendor
         *
         * @return array
         */
        private static function format_vendor(array $vendor = []): array
        {
            //Log::$debug_log->trace($vendor);
            
            return array(
                "id" => $vendor["vendor_id"],
                "company_id" => $vendor["company_id"],
                "sku" => $vendor["vendor_sku"],
                "is_provider" => $vendor["vendor_is_provider"],
                "show_online" => $vendor["vendor_show_online"],
                "show_sales" => $vendor["vendor_show_sales"],
                "show_ops" => $vendor["vendor_show_ops"],
                "status_id" => $vendor["vendor_status_id"],
                "note" => addslashes($vendor["vendor_note"]),
                "enabled" => $vendor["vendor_enabled"],
                "keywords" => addslashes($vendor["company_keywords"]),
                "description_short" => addslashes($vendor["company_description_short"]),
                "description_long" => addslashes($vendor["company_description_long"]),
                "logo" => addslashes($vendor["company_logo"]),
                "date_created" => $vendor["vendor_date_created"],
                "date_modified" => $vendor["vendor_date_modified"],
                "created_by" => $vendor["vendor_created_by"],
                "modified_by" => $vendor["vendor_modified_by"],
            );
            
        }
        
        /**
         * format_get
         */
        private static function format_get(array $vendors = []): array
        {
            $data = [];
            foreach ($vendors AS $k => $vendor) {
                array_push($data, self::format($vendor));
            }
            
            return $data;
        }
        
    }
