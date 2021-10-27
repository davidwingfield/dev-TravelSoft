<?php

    namespace Framework\App\Controllers;

    use Framework\App\Models\ProvinceModel;
    use Framework\Core\Controller;
    use Framework\Core\View;

    /**
     * Short Province Description
     *
     * Long Province Description
     *
     * @package            Framework\App
     * @subpackage         Controllers
     */
    class Province extends Controller
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
            $country_id = null;
            $province_id = null;
            $provinces = [];

            if (isset($args["country_id"]) && intval($args["country_id"]) > 0) {
                $country_id = (int)$args["country_id"];
            }

            if (isset($args["province_id"]) && intval($args["province_id"]) > 0) {
                $province_id = (int)$args["province_id"];
            }

            $result = ProvinceModel::get($country_id, $province_id);
            foreach ($result AS $k => $province) {
                $provinces[] = self::format($province);
            }
            View::render_json($provinces);
            exit(1);
        }

        public static function get(array $args = []): array
        {
            $country_id = null;
            $province_id = null;
            $provinces = [];

            if (isset($args["country_id"]) && intval($args["country_id"]) > 0) {
                $country_id = (int)$args["country_id"];
            }

            if (isset($args["province_id"]) && intval($args["province_id"]) > 0) {
                $province_id = (int)$args["province_id"];
            }

            $result = ProvinceModel::get($country_id, $province_id);
            foreach ($result AS $k => $province) {
                $provinces[] = self::format($province);
            }

            return $provinces;
        }

        public static function serveUpdate(array $args = []): void
        {
            if (!isset($args["country_id"], $args["name"], $args["iso2"], $args["iso3"])) {
                View::render_invalid_json("Missing Fields");
                exit(1);
            }

            $result = ProvinceModel::update($args);
            $provinces = array();
            foreach ($result AS $k => $province) {
                $provinces[] = self::format($province);
            }

            View::render_json($provinces);
            exit(1);
        }

        private static function format(array $province = []): array
        {
            return array(
                "id" => $province["province_id"],
                "country_id" => $province["province_country_id"],
                "sort_order" => $province["province_sort_order"],
                "name" => $province["province_name"],
                "ios2" => $province["province_iso2"],
                "ios3" => $province["province_iso3"],
                "enabled" => $province["province_enabled"],
                "date_created" => $province["province_date_created"],
                "created_by" => $province["province_created_by"],
                "date_modified" => $province["province_date_modified"],
                "modified_by" => $province["province_modified_by"],
                "note" => $province["province_note"],
            );
        }

    }
