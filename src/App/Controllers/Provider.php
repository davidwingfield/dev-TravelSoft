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
     *
     * Long Provider Description
     *
     * @package            Framework\App
     * @subpackage         Controllers
     */
    class Provider extends Controller
    {
        protected static $data = [];

        /**
         * __construct
         *
         * Loads Controller Elements
         */
        public function __construct()
        {
            parent::__construct();
        }

        /**
         * index
         *
         * Loads Provider Index
         */
        public static function index(array $params = []): void
        {
            $data = Page::getDetails(5);
            $buttons = array();
            // ----
            define("BREAD_CRUMBS", "
                    <li class='breadcrumb-item'>
                        <a href='/'>Home</a>
                    </li>
                    <li class='breadcrumb-item'>
                        Providers
                    </li>"
            );
            // ----
            $buttons["new"] = array(
                "type" => "a",
                "href" => "/providers/new",
                "classes" => "btn btn-primary waves-light",
                "icon" => "fas fa-plus",
                "id" => "button_add_provider_page_heading",
                "text" => "new provider",
                "data" => array(
                    "toggle" => "tooltip",
                    "original-title" => "tooltip",
                ),

            );
            $data["buttons"] = $buttons;
            // ----
            $data["providers"] = self::format_get(ProviderModel::get());
            View::render_template("providers/index", $data);
            exit(1);
        }

        /**
         * edit
         *
         * Loads Provider Edit
         */
        public static function edit(array $params = [])
        {
            $provider_id = (int)$params["provider_id"];
            $contact_detail = [];
            $address_detail = [];
            $company_detail = [];
            $vendor_detail = [];

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

                $provider_detail = self::format_get(ProviderModel::get($provider_id));
                Log::$debug_log->trace($provider_detail);
                View::render_template("providers/edit", $data);
                exit(1);
                /** get only one */
                if (count($provider_detail) >= 1) {
                    $provider_detail = $provider_detail[0];
                }

                if (isset($provider_detail["company_id"])) {
                    $company_id = (int)$provider_detail["company_id"];

                    if (isset($company_id) && intval($company_id) > 0) {
                        $company_detail = CompanyModel::getOne($company_id);
                        $address_detail = AddressModel::getByCompanyId($company_id);
                        $contact_detail = Contact::get(array("company_id" => $company_id));
                    }

                } else {
                    /** company not found redirecting to new */
                    header("Location: /providers/new");
                    exit;
                }

                $data["provider_detail"] = $provider_detail;
                $data["company_detail"] = $company_detail;
                $data["address_detail"] = $address_detail;
                $data["contact_detail"] = $contact_detail;
                $data["vendor_detail"] = $vendor_detail;

                View::render_template("providers/edit", $data);
                exit(1);
            }
            /** Provider not found Logging and redirecting to new */
            Log::$debug_log->trace("Provider Id Not Fuond");
            header("Location: /providers/new");
            exit(1);
        }

        /**
         * new
         *
         * Loads New Provider
         */
        public static function new(array $params = [])
        {
            $data = Page::getDetails(14);
            // ----
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

            View::render_template("providers/edit", $data);
            exit(1);
        }

        /**
         * autocomplete
         *
         * Autocomplete json
         */
        public static function autocomplete(string $st = ""): array
        {
            return self::format_ac(ProviderModel::provider_ac($st));
        }

        /**
         * format_get
         *
         */
        private static function format_get(array $providers = []): array
        {
            $data = [];
            foreach ($providers AS $k => $provider) {
                array_push($data, self::format($provider));
            }

            return $data;
        }

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

            $temp = array(
                "id" => $provider["provider_id"],
                "name" => $provider["company_name"],
                "code_direct_id" => $provider["provider_code_direct_id"],
                "provider_vendor" => $provider["provider_provider_vendor"],
                "note" => $provider["provider_note"],
                "enabled" => $provider["provider_enabled"],
                "company_id" => $provider["provider_company_id"],
                "date_created" => $provider["provider_date_created"],
                "date_modified" => $provider["provider_date_modified"],
                "created_by" => $provider["provider_created_by"],
                "modified_by" => $provider["provider_modified_by"],
                "vendor" => array(
                    "id" => $vendor_id,
                    "company_id" => $vendor_company_id,
                    "company_name" => $vendor_company_name,
                    "company_phone_1" => $vendor_company_phone_1,
                    "company_phone_2" => $vendor_company_phone_2,
                    "company_fax" => $vendor_company_fax,
                    "company_website" => $vendor_company_website,
                    "company_email" => $vendor_company_email,
                    "company_enabled" => $vendor_company_enabled,
                    "company_created_by" => $vendor_company_created_by,
                    "company_date_created" => $vendor_company_date_created,
                    "company_modified_by" => $vendor_company_modified_by,
                    "company_date_modified" => $vendor_company_date_modified,
                    "company_status" => $vendor_company_status,
                    "company_note" => $vendor_company_note,
                ),
                "company" => array(
                    "id" => $provider["company_id"],
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
                    "status" => $provider["company_status"],
                    "note" => $provider["company_note"],
                ),
                "addresses" => AddressModel::getByCompanyId((int)$company_id),
                "contacts" => ContactModel::getByCompanyId((int)$company_id),
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

    }
