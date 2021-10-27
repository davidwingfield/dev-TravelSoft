<?php

    namespace Framework\App\Controllers;

    use Framework\App\Models\CountryModel;
    use Framework\Core\Controller;
    use Framework\Core\View;
    use Framework\Logger\Log;

    /**
     * CLASSNAME:        Country
     * CLASS FILE:       C:\wamp64\www\mockups/generated_classes/Package.php
     *
     *
     * Short Country Description
     *
     * Long Country Description
     *
     * @package            Framework\App
     * @subpackage         Controllers
     */
    class Country extends Controller
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
            $id = null;
            $countries = [];
            if (isset($args["id"])) {
                $id = (int)$args["id"];
            }
            $result = CountryModel::get($id);
            foreach ($result AS $k => $country) {
                $countries[] = self::format($country);
            }
            View::render_json($countries);
            exit(1);
        }

        public static function get(array $args = []): array
        {
            $id = null;
            $countries = [];
            if (isset($args["id"])) {
                $id = (int)$args["id"];
            }
            $result = CountryModel::get($id);
            foreach ($result AS $k => $country) {
                $countries[] = self::format($country);
            }

            return $countries;
        }

        public static function serveUpdate(array $args = []): void
        {
            if (!isset($args["name"], $args["iso2"], $args["iso3"])) {
                View::render_invalid_json("Missing Fields");
                exit(1);
            }

            $result = CountryModel::update($args);

            $countries = array();
            foreach ($result AS $k => $country) {
                $countries[] = self::format($country);
            }

            View::render_json($result);
            exit(1);
        }

        private static function format(array $country = []): array
        {
            //Log::$debug_log->trace($country);

            return array(
                "id" => $country["country_id"],
                "currency_id" => $country["country_currency_id"],
                "sort_order" => $country["country_sort_order"],
                "name" => $country["country_name"],
                "ios2" => $country["country_iso2"],
                "ios3" => $country["country_iso3"],
                "enabled" => $country["country_enabled"],
                "date_created" => $country["country_date_created"],
                "created_by" => $country["country_created_by"],
                "date_modified" => $country["country_date_modified"],
                "modified_by" => $country["country_modified_by"],
                "note" => $country["country_note"],
            );
        }

    }
