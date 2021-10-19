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
     * @package            Application\App
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

            if (isset($args["country_id"]) && intval($args["country_id"]) > 0) {
                $country_id = (int)$args["country_id"];
            }

            if (isset($args["province_id"]) && intval($args["province_id"]) > 0) {
                $province_id = (int)$args["province_id"];
            }

            View::render_json(ProvinceModel::get($country_id, $province_id));
            exit(1);
        }

    }
