<?php

    namespace Framework\App\Controllers;

    use Exception;
    use Framework\App\Controllers\StaticPages;
    use Framework\App\Models\CompanyModel;
    use Framework\App\Models\ProviderModel;
    use Framework\Core\Controller;
    use Framework\Core\View;

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
            define("BREAD_CRUMBS", "
                    <li class='breadcrumb-item'>
                        <a href='/'>Home</a>
                    </li>
                    <li class='breadcrumb-item'>
                        Providers
                    </li>"
            );

            $data["providers"] = ProviderModel::get();

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

        private static function format($providers = [])
        {

        }

    }
