<?php

    namespace Framework\App\Controllers;

    use Framework\App\Models\CountryModel;
    use Framework\Core\Controller;
    use Framework\Core\View;

    /**
     * Short Country Description
     *
     * Long Country Description
     *
     * @package            Application\App
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
            if (isset($args["id"])) {
                $id = (int)$args["id"];
            }
            $countries = CountryModel::get($id);
            View::render_json($countries);
            exit(1);
        }

    }
