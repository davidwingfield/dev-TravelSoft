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
            // ----
            echo json_encode($results);
            exit(1);
        }
        
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
        
        public function companies(): void
        {
            $st = "";
            extract($_GET);
            $results = Company::autocomplete($st);
            header("Content-type:application/json");
            // ----
            echo json_encode($results);
            exit(1);
        }
        
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
        
        public function locations(): void
        {
            $st = "";
            $default_display = "medium";
            extract($_GET);
            $results = Location::autocomplete($st, $default_display);
            // ----
            header("Content-type:application/json");
            echo json_encode($results);
            exit;
        }
        
        public function seasons(): void
        {
            $st = "";
            $category_id = 1;
            extract($_GET);
            $results = Season::autocomplete($st, $category_id);
            // ----
            header("Content-type:application/json");
            echo json_encode($results);
            exit;
        }
        
        public function units(): void
        {
            $st = "";
            $category_id = 1;
            extract($_GET);
            $results = Unit::autocomplete($st, $category_id);
            // ----
            header("Content-type:application/json");
            echo json_encode($results);
            exit;
        }
        
        public function variants(): void
        {
            $st = "";
            $category_id = 1;
            extract($_GET);
            $results = Variant::autocomplete($st, $category_id);
            // ----
            header("Content-type:application/json");
            echo json_encode($results);
            exit;
        }
        
    }
