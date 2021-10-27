<?php

    namespace Framework\App\Controllers;

    use Framework\Core\Controller;

    /**
     * Short Season Description
     *
     * Long Season Description
     *
     * @package            Framework\App
     * @subpackage         Controllers
     */
    class Season extends Controller
    {
        public function __construct()
        {
            parent::__construct();
        }

        public static function serveGet(int $season_id = null): array
        {
            $seasons = [];

            return $seasons;
        }

    }
