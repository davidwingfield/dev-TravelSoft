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
     * @package            Application\App
     * @subpackage         Controllers
     */
    class City extends Controller
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
            $city_id = null;

            if (isset($args["country_id"]) && intval($args["country_id"]) > 0) {
                $country_id = (int)$args["country_id"];
            }

            if (isset($args["province_id"]) && intval($args["province_id"]) > 0) {
                $province_id = (int)$args["province_id"];
            }

            if (isset($args["city_id"]) && intval($args["city_id"]) > 0) {
                $city_id = (int)$args["city_id"];
            }

            View::render_json(CityModel::get($country_id, $province_id, $city_id));
            exit(1);

        }

    }
