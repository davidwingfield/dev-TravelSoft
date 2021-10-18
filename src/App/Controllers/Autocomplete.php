<?php

    namespace Framework\App\Controllers;

    use Framework\Core\Controller;

    class Autocomplete extends Controller
    {

        public function __construct()
        {
            parent::__construct();
        }

        public function providers(): void
        {
            $st = "";
            extract($_GET);
            $results = Provider::autocomplete($st);
            header("Content-type:application/json");
            echo json_encode($results);
            exit;
        }

        public function locations(): void
        {
            $st = "";
            $default_display = "medium";
            // ------
            extract($_GET);
            // ------
            $results = Location::autocomplete($st, $default_display);

            header("Content-type:application/json");
            echo json_encode($results);
            exit;
        }

    }
