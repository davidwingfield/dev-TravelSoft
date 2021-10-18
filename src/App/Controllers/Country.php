<?php

    namespace Framework\App\Controllers;

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

        public static function serveGet()
        {
            View::render_json(array(
                1,
                2,
                3,
                4,
                5,
            ));
            exit(1);
        }

    }
