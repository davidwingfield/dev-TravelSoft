<?php
    
    namespace Framework\App\Controllers;
    
    use Framework\App\Models\UnitModel;
    use Framework\App\Models\VariantModel;
    use Framework\Core\Controller;
    use Framework\Core\View;
    use Framework\Logger\Log;
    
    /**
     * Short Variant Description
     * Long Variant Description
     *
     * @package            Framework\App
     * @subpackage         Controllers
     */
    class Variant extends Controller
    {
        /**
         * controller method
         */
        public function __construct()
        {
            parent::__construct();
        }
        
        /**
         * validate name exists
         *
         * @param array $args
         *
         * @return array
         */
        public static function validateName(array $args = []): array
        {
            $variants = array();
            $category_id = (isset($args["category_id"])) ? (int)$args["category_id"] : null;
            $name = (isset($args["name"])) ? (string)$args["name"] : null;
            
            $results = VariantModel::getByName($name, $category_id);
            
            foreach ($results AS $k => $variant) {
                $variants[] = self::format($variant);
            }
            
            /**
             * render variant json
             */
            header("Content-type:application/json");
            View::render_json($variants);
            exit(1);
        }
        
        /**
         * get variants by product id
         *
         * @param int|null $product_id
         *
         * @return array
         */
        public static function getVariantsByProductId(int $product_id = null): array
        {
            $variants = [];
            $results = VariantModel::getByProductId((int)$product_id);
            //Log::$debug_log->trace($results);
            foreach ($results AS $k => $variant) {
                $variants[] = self::format($variant);
            }
            
            //Log::$debug_log->trace($variants);
            
            return $variants;
        }
        
        /**
         * autocomplete method
         *
         * @param string   $st
         * @param int|null $category_id
         *
         * @return array
         */
        public static function autocomplete(string $st = "", int $category_id = null): array
        {
            return self::format_ac(VariantModel::variant_ac($st, $category_id));
        }
        
        public static function serveUpdate(array $params = []): void
        {
            $variants = [];
            $results = VariantModel::updateRecord($params);
            foreach ($results AS $variant) {
                $variants[] = self::format($variant);
            }
            
            /**
             * render results json page
             */
            header("Content-type:application/json");
            View::render_json($variants);
            exit(0);
        }
        
        /**
         * format autocomplete results
         *
         * @param array|null $variants
         *
         * @return array
         */
        private static function format_ac(array $variants = null): array
        {
            $data["suggestions"] = [];
            foreach ($variants AS $k => $variant) {
                $l = (object)$variant;
                $value = utf8_encode($l->variant_name);
                array_push($data["suggestions"], [
                    "value" => utf8_encode($value),
                    "data" => self::format($variant),
                ]);
            }
            
            return $data;
        }
        
        /**
         * format object results
         *
         * @param array|null $variant
         *
         * @return array
         */
        private static function format(array $variant = null): array
        {
            if (is_null($variant)) {
                return [];
            }
            //Log::$debug_log->trace($variant);
            $product_variant = array(
                'id' => $variant['variant_id'],
                'category_id' => $variant['variant_category_id'],
                'code' => ($variant['variant_code']) ? $variant['variant_code'] : buildCode((int)$variant['variant_id'], $variant['variant_name'], "variant"),
                'name' => $variant['variant_name'],
                'enabled' => $variant['variant_enabled'],
                'date_created' => $variant['variant_date_created'],
                'created_by' => $variant['variant_created_by'],
                'date_modified' => $variant['variant_date_modified'],
                'modified_by' => $variant['variant_modified_by'],
                'note' => $variant['variant_note'],
            );
            
            if (isset($variant["product_variant_product_id"])) {
                $product_variant["product_id"] = $variant["product_variant_product_id"];
            }
            
            if (isset($variant["product_variant_variant_id"])) {
                $product_variant["variant_id"] = $variant['product_variant_variant_id'];
            }
            
            if (isset($variant["product_variant_min_age"])) {
                $product_variant["min_age"] = $variant['product_variant_min_age'];
            }
            
            if (isset($variant["product_variant_max_age"])) {
                $product_variant["max_age"] = (isset($variant['product_variant_max_age'])) ? $variant['product_variant_max_age'] : '<i class="fas fa-edit"></i>';
            }
            
            if (isset($variant["product_variant_used_in_pricing"])) {
                $product_variant["used_in_pricing"] = $variant['product_variant_used_in_pricing'];
            }

//            Log::$debug_log->trace($product_variant);
            
            return $product_variant;
        }
        
    }
