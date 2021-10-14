<?php

    namespace Framework\App\Controllers;

    use Exception;
    use Framework\App\Controllers\StaticPages;
    use Framework\App\Models\AddressModel;
    use Framework\App\Models\CompanyModel;
    use Framework\App\Models\ContactModel;
    use Framework\App\Models\ProviderModel;
    use Framework\Core\Controller;
    use Framework\Core\View;
    use Framework\Logger\Log;

    /**
     * Short Provider Description
     *
     * Long Provider Description
     *
     * @package            Application\App
     * @subpackage         Controllers
     */
    class Provider extends Controller
    {
        protected static $data = [];

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
            $data["providers"] = self::format(ProviderModel::get());
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
            $data = Page::getDetails(6);
            // ----
            if (isset($params["provider_id"])) {
                $provider_id = (int)$params["provider_id"];
            }

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
            // ----
            $provider_id = null;
            $providers = [];
            $address_detail = [];
            $company_detail = [];
            $provider_detail = ProviderModel::getOne($provider_id);

            $company_id = null;
            if (isset($provider_detail["company_id"])) {
                $company_id = (int)$provider_detail["company_id"];
                if (isset($company_id) && intval($company_id) > 0) {
                    $company_detail = CompanyModel::getOne($company_id);

                }

            }

            $data["provider_detail"] = $provider_detail;
            $data["company_detail"] = $provider_detail;
            $data["address_detail"] = $provider_detail;

            $providers[] = array(
                "provider_detail" => ProviderModel::getOne($provider_id),
                "company_detail" => $company_detail,
                "address_detail" => $address_detail,
            );

            View::render_template("providers/edit", $data);
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

        public static function autocomplete()
        {
            var_dump("tert", 1);
        }

        private static function format(array $providers = []): array
        {
            $temp = array();
            $results = array();
            foreach ($providers AS $provider) {
                $provider_id = $provider["provider_id"];
                $company_id = $provider["company_id"];
                if (!isset($temp[$provider_id])) {
                    $temp[$provider_id] = array(
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
                            "id" => $provider["vendor_id"],
                            "sku" => $provider["vendor_sku"],
                            "is_provider" => $provider["vendor_is_provider"],
                            "show_online" => $provider["vendor_show_online"],
                            "show_sales" => $provider["vendor_show_sales"],
                            "show_ops" => $provider["vendor_show_ops"],
                            "note" => $provider["vendor_note"],
                            "enabled" => $provider["vendor_enabled"],
                            "date_created" => $provider["vendor_date_created"],
                            "date_modified" => $provider["vendor_date_modified"],
                            "created_by" => $provider["vendor_created_by"],
                            "modified_by" => $provider["vendor_modified_by"],
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
                            "location" => $provider["location"],
                            "long" => $provider["location_long"],
                            "short" => $provider["location_short"],
                            "medium" => $provider["location_medium"],
                            "id" => $provider["location_id"],
                            "name" => $provider["location_name"],
                            "street" => $provider["location_street"],
                            "street2" => $provider["location_street2"],
                            "city_id" => $provider["location_city_id"],
                            "province_id" => $provider["location_province_id"],
                            "country_id" => $provider["location_country_id"],
                            "zipcode" => $provider["location_zipcode"],
                            "date_created" => $provider["location_date_created"],
                            "created_by" => $provider["location_created_by"],
                            "date_modified" => $provider["location_date_modified"],
                            "modified_by" => $provider["location_modified_by"],
                            "enabled" => $provider["location_enabled"],
                            "note" => $provider["location_note"],

                            "location_type" => array(
                                "id" => $provider["location_types_id"],
                                "name" => $provider["location_types_name"],
                                "icon" => $provider["location_types_icon"],
                                "date_created" => $provider["location_types_date_created"],
                                "created_by" => $provider["location_types_created_by"],
                                "date_modified" => $provider["location_types_date_modified"],
                                "modified_by" => $provider["location_types_modified_by"],
                                "enabled" => $provider["location_types_enabled"],
                            ),
                        ),
                    );
                }
            }

            foreach ($temp AS $p) {
                $results[] = $p;
            }

            return $results;
        }

    }
