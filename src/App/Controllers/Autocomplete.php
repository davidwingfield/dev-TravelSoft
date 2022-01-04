<?php
    
    namespace Framework\App\Controllers;
    
    use Framework\Core\Controller;
    use Framework\Logger\Log;
    
    /**
     * Autocomplete
     *
     * @package            Framework\App
     * @subpackage         Controllers
     */
    class Autocomplete extends Controller
    {
        /**
         * get constructor methods
         */
        public function __construct()
        {
            parent::__construct();
        }
        
        /**
         * autocomplete  providers
         */
        public function providers(): void
        {
            $st = "";
            extract($_GET);
            $results = Provider::autocomplete($st);
            header("Content-type:application/json");
            // ----
            echo json_encode($results);
            exit(1);
        }
        
        /**
         * autocomplete cities
         */
        public function cities(): void
        {
            $st = "";
            extract($_GET);
            $results = City::autocomplete($st);
            
            // ----
            header("Content-type:application/json");
            echo json_encode($results);
            exit(1);
        }
        
        /**
         * autocomplete products
         */
        public function products(): void
        {
            $results = [];
            $category_id = null;
            $st = "";
            if (isset($_GET["category_id"])) {
                extract($_GET);
                
                $results = Product::autocomplete(array(
                    "st" => $st,
                    "category_id" => (int)$category_id,
                ));
            }
            
            header("Content-type:application/json");
            // ----
            echo json_encode($results);
            exit(1);
        }
        
        /**
         * autocomplete companies
         */
        public function companies(): void
        {
            $st = "";
            extract($_GET);
            $results = Company::autocomplete($st);
            
            /**
             * render results json page
             */
            header("Content-type:application/json");
            echo json_encode($results);
            exit(1);
        }
        
        /**
         * autocomplete vendors
         */
        public function vendors(): void
        {
            $st = "";
            extract($_GET);
            $results = Vendor::autocomplete($st);
            // ----
            header("Content-type:application/json");
            echo json_encode($results);
            exit(1);
        }
        
        /**
         * autocomplete locations
         */
        public function locations(): void
        {
            $st = "";
            $default_display = "medium";
            extract($_GET);
            $results = Location::autocomplete($st, $default_display);
            
            /**
             * render results json page
             */
            header("Content-type:application/json");
            echo json_encode($results);
            exit(1);
        }
        
        /**
         * autocomplete seasons
         */
        public function seasons(): void
        {
            $st = "";
            $category_id = 1;
            extract($_GET);
            $results = Season::autocomplete($st, $category_id);
            
            /**
             * render results json page
             */
            header("Content-type:application/json");
            echo json_encode($results);
            exit(1);
        }
        
        /**
         * autocomplete profiles
         */
        public function profiles(): void
        {
            $st = "";
            extract($_GET);
            $results = Profile::autocomplete($st);
            
            /**
             * render profile json
             */
            header("Content-type:application/json");
            echo json_encode($results);
            exit(1);
        }
        
        /**
         * autocomplete units
         */
        public function units(): void
        {
            $st = "";
            $category_id = 1;
            extract($_GET);
            $results = Unit::autocomplete($st, $category_id);
            
            Log::$debug_log->trace($results);
            /**
             * render results json page
             */
            header("Content-type:application/json");
            echo json_encode($results);
            exit(1);
        }
        
        /**
         * autocomplete variants
         */
        public function variants(): void
        {
            $st = "";
            $category_id = 1;
            extract($_GET);
            $results = Variant::autocomplete($st, $category_id);
            
            /**
             * render results json page
             */
            header("Content-type:application/json");
            echo json_encode($results);
            exit(1);
        }
        
    }
