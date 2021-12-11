<?php
    
    namespace Framework\App\Controllers;
    
    use Framework\App\Models\CategoryModel;
    use Framework\Core\Controller;
    use Framework\Logger\Log;
    
    /**
     * Short Category Description
     * Long Category Description
     *
     * @package            Framework\App
     * @subpackage         Controllers
     */
    class Category extends Controller
    {
        
        public function __construct()
        {
            parent::__construct();
        }
        
        public static function getTypes(array $params = []): array
        {
            $detail = self::formatTypes(CategoryModel::getAllTypes($params));
            
            //Log::$debug_log->trace($detail);
            
            return $detail;
        }
        
        private static function formatTypes(array $categoryTypes = []): array
        {
            $temp = array();
            foreach ($categoryTypes AS $k => $category) {
                $category_id = (int)$category["category_id"];
                $season_id = (int)$category["season_id"];
                $color_scheme_id = (int)$category["color_scheme_id"];
                if (!isset($temp[$category_id])) {
                    $temp[$category_id] = array(
                        "strategy_types_id" => ($category["category_pricing_strategy_types_id"]) ? (int)$category["category_pricing_strategy_types_id"] : 1,
                        "attribute_id" => $category["category_attribute_id"],
                        "id" => $category["category_id"],
                        "name" => $category["category_name"],
                        "icon" => $category["category_icon"],
                        "view_product_index" => ($category["category_view_product_index"]) ? (int)$category["category_view_product_index"] : 1,
                        "view_product_index_filter" => ($category["category_view_product_index_filter"]) ? (int)$category["category_view_product_index"] : 1,
                        "view_product_index_search" => ($category["category_view_product_index_search"]) ? (int)$category["category_view_product_index"] : 1,
                        "view_product_edit" => ($category["category_view_product_edit"]) ? (int)$category["category_view_product_index"] : 1,
                        "view_product_package_edit" => ($category["category_view_product_package_edit"]) ? (int)$category["category_view_product_index"] : 1,
                        "view_product_package_index" => ($category["category_view_product_package_index"]) ? (int)$category["category_view_product_index"] : 1,
                        "all_day" => ($category["category_all_day"]) ? (int)$category["category_all_day"] : 1,
                        "overlap" => ($category["category_overlap"]) ? (int)$category["category_overlap"] : 1,
                        "editable" => ($category["category_editable"]) ? (int)$category["category_editable"] : 1,
                        "duration_editable" => ($category["category_duration_editable"]) ? (int)$category["category_duration_editable"] : 1,
                        "start_editable" => ($category["category_start_editable"]) ? (int)$category["category_start_editable"] : 1,
                        "display" => $category["category_display"],
                        "background_color" => $category["category_background_color"],
                        "text_color" => $category["category_text_color"],
                        "border_color" => $category["category_border_color"],
                        "sort_order" => ($category["category_sort_order"]) ? (int)$category["category_sort_order"] : 999,
                        "enabled" => ($category["category_enabled"]) ? (int)$category["category_enabled"] : 1,
                        "date_created" => $category["category_date_created"],
                        "created_by" => ($category["category_created_by"]) ? (int)$category["category_created_by"] : 4,
                        "date_modified" => $category["category_date_modified"],
                        "modified_by" => ($category["category_modified_by"]) ? (int)$category["category_modified_by"] : 4,
                        "note" => $category["category_note"],
                        "seasons" => array(),
                    );
                }
                
                if (!isset($temp[$category_id]["seasons"][$season_id])) {
                    $temp[$category_id]["seasons"][$season_id] = array(
                        "id" => ($category["season_id"]) ? (int)$category["category_all_day"] : null,
                        "color_scheme_id" => ($category["season_color_scheme_id"]) ? (int)$category["category_all_day"] : 1,
                        "name" => $category["season_name"],
                        "view_product_index" => ($category["season_view_product_index"]) ? (int)$category["season_view_product_index"] : 1,
                        "view_product_index_filter" => ($category["season_view_product_index_filter"]) ? (int)$category["season_view_product_index_filter"] : 1,
                        "view_product_index_search" => ($category["season_view_product_index_search"]) ? (int)$category["season_view_product_index_search"] : 1,
                        "view_product_edit" => ($category["season_view_product_edit"]) ? (int)$category["season_view_product_edit"] : 1,
                        "view_product_package_edit" => ($category["season_view_product_package_edit"]) ? (int)$category["season_view_product_package_edit"] : 1,
                        "view_product_package_index" => ($category["season_view_product_package_index"]) ? (int)$category["season_view_product_package_index"] : 1,
                        "enabled" => ($category["season_enabled"]) ? (int)$category["season_enabled"] : 1,
                        "date_created" => $category["season_date_created"],
                        "created_by" => ($category["season_created_by"]) ? (int)$category["season_created_by"] : 4,
                        "date_modified" => $category["season_date_modified"],
                        "modified_by" => ($category["season_modified_by"]) ? (int)$category["season_modified_by"] : 4,
                        "note" => $category["season_note"],
                        "category_id" => ($category["season_category_id"]) ? (int)$category["season_category_id"] : null,
                        "color_scheme" => array(),
                    );
                }
                
                if (!isset($temp[$category_id]["seasons"][$season_id]["color_scheme"][$color_scheme_id])) {
                    $temp[$category_id]["seasons"][$season_id]["color_scheme"][$color_scheme_id] = array(
                        "id" => $category["color_scheme_id"],
                        "name" => $category["color_scheme_name"],
                        "background_color" => $category["color_scheme_background_color"],
                        "border_color" => $category["color_scheme_border_color"],
                        "text_color" => $category["color_scheme_text_color"],
                        "sort_order" => $category["color_scheme_sort_order"],
                        "enabled" => $category["color_scheme_enabled"],
                        "date_created" => $category["color_scheme_date_created"],
                        "created_by" => $category["color_scheme_created_by"],
                        "date_modified" => $category["color_scheme_date_modified"],
                        "modified_by" => $category["color_scheme_modified_by"],
                        "note" => $category["color_scheme_note"],
                    );
                }
            }
            
            $categories = array();
            foreach ($temp AS $category) {
                $seasons = $category["seasons"];
                $seasonList = array();
                foreach ($seasons AS $season) {
                    $color_schemes = $season["color_scheme"];
                    $colorSchemeList = [];
                    foreach ($color_schemes AS $scheme) {
                        $colorSchemeList[] = $scheme;
                    }
                    $seasonList[] = array(
                        "id" => $season["id"],
                        "color_scheme_id" => $season["color_scheme_id"],
                        "name" => $season["name"],
                        "view_product_index" => $season["view_product_index"],
                        "view_product_index_filter" => $season["view_product_index_filter"],
                        "view_product_index_search" => $season["view_product_index_search"],
                        "view_product_edit" => $season["view_product_edit"],
                        "view_product_package_edit" => $season["view_product_package_edit"],
                        "view_product_package_index" => $season["view_product_package_index"],
                        "enabled" => $season["enabled"],
                        "date_created" => $season["date_created"],
                        "created_by" => $season["created_by"],
                        "date_modified" => $season["date_modified"],
                        "modified_by" => $season["modified_by"],
                        "note" => $season["note"],
                        "category_id" => $season["category_id"],
                        "color_scheme" => (count($colorSchemeList) === 1) ? $colorSchemeList[0] : $colorSchemeList,
                    );
                }
                
                $categories[] = array(
                    "id" => $category["id"],
                    "strategy_types_id" => $category["strategy_types_id"],
                    "attribute_id" => $category["attribute_id"],
                    "name" => $category["name"],
                    "icon" => $category["icon"],
                    "view_product_index" => $category["view_product_index"],
                    "view_product_index_filter" => $category["view_product_index_filter"],
                    "view_product_index_search" => $category["view_product_index_search"],
                    "view_product_edit" => $category["view_product_edit"],
                    "view_product_package_edit" => $category["view_product_package_edit"],
                    "view_product_package_index" => $category["view_product_package_index"],
                    "all_day" => $category["all_day"],
                    "overlap" => $category["overlap"],
                    "editable" => $category["editable"],
                    "duration_editable" => $category["duration_editable"],
                    "start_editable" => $category["start_editable"],
                    "display" => $category["display"],
                    "background_color" => $category["background_color"],
                    "text_color" => $category["text_color"],
                    "border_color" => $category["border_color"],
                    "sort_order" => $category["sort_order"],
                    "enabled" => $category["enabled"],
                    "date_created" => $category["date_created"],
                    "created_by" => $category["created_by"],
                    "date_modified" => $category["date_modified"],
                    "modified_by" => $category["modified_by"],
                    "note" => $category["note"],
                    "seasons" => $seasonList,
                );
                
            }
            
            return $categories;
        }
        
    }
