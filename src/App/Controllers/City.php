<?php

    namespace Framework\App\Controllers;

    use Framework\App\Models\CityModel;
    use Framework\Core\Controller;
    use Framework\Core\View;

    /**
     * Short City Description
     *
     * Long City Description
     *
     * @package            Framework\App
     * @subpackage         Controllers
     */
    class City extends Controller
    {
        public function __construct()
        {
            parent::__construct();
        }

        public static function get(array $args = []): array
        {
            $country_id = null;
            $province_id = null;
            $city_id = null;
            $cities = array();

            // ----

            if (isset($args["country_id"]) && intval($args["country_id"]) > 0) {
                $country_id = (int)$args["country_id"];
            }

            if (isset($args["province_id"]) && intval($args["province_id"]) > 0) {
                $province_id = (int)$args["province_id"];
            }

            if (isset($args["city_id"]) && intval($args["city_id"]) > 0) {
                $city_id = (int)$args["city_id"];
            }

            $result = CityModel::get($country_id, $province_id, $city_id);

            foreach ($result AS $k => $city) {
                $cities[] = self::format($city);
            }

            return $cities;

        }

        /**
         * API get request
         *
         * @param array $args
         */
        public static function serveGet(array $args = []): void
        {
            $country_id = null;
            $province_id = null;
            $city_id = null;
            $cities = array();

            // ----

            if (isset($args["country_id"]) && intval($args["country_id"]) > 0) {
                $country_id = (int)$args["country_id"];
            }

            if (isset($args["province_id"]) && intval($args["province_id"]) > 0) {
                $province_id = (int)$args["province_id"];
            }

            if (isset($args["city_id"]) && intval($args["city_id"]) > 0) {
                $city_id = (int)$args["city_id"];
            }

            $result = CityModel::get($country_id, $province_id, $city_id);

            foreach ($result AS $k => $city) {
                $cities[] = self::format($city);
            }
            View::render_json($cities);
            exit(1);

        }

        public static function serveUpdate(array $args = []): void
        {
            if (!isset($args["country_id"], $args["name"], $args["province_id"])) {
                View::render_invalid_json("Missing Fields");
                exit(1);
            }
            $cities = array();
            $result = CityModel::update($args);

            foreach ($result AS $k => $city) {
                $cities[] = self::format($city);
            }

            View::render_json($cities);
            exit(1);
        }

        private static function format(array $city = []): array
        {
            return array(
                "id" => $city["city_id"],
                "country_id" => $city["city_country_id"],
                "province_id" => $city["city_province_id"],
                "sort_order" => $city["city_sort_order"],
                "name" => $city["city_name"],
                "enabled" => $city["city_enabled"],
                "date_created" => $city["city_date_created"],
                "created_by" => $city["city_created_by"],
                "date_modified" => $city["city_date_modified"],
                "modified_by" => $city["city_modified_by"],
                "note" => $city["city_note"],
            );
        }

    }
