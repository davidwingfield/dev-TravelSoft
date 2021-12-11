<?php
    
    namespace Framework\App\Models;
    
    use Exception;
    use Framework\Core\Model;
    use Framework\Logger\Log;
    
    /**
     * Short Product Description
     * Long Product Description
     *
     * @package            Framework\App
     * @subpackage         Models
     */
    class ProductModel extends Model
    {
        
        protected static $dbTable = "product";
        protected static $dbFields = Array();
        protected static $sql = "
            SELECT
                    PRODUCT.id AS 'product_id',
                    PRODUCT.category_id AS 'product_category_id',
                    PRODUCT.pricing_strategy_types_id AS 'product_pricing_strategy_types_id',
                    PRODUCT.status_types_id AS 'product_status_types_id',
                    PRODUCT.currency_id AS 'product_currency_id',
                    PRODUCT.location_id AS 'product_location_id',
                    PRODUCT.provider_id AS 'product_provider_id',
                    PRODUCT.vendor_id AS 'product_vendor_id',
                    PRODUCT.rating_types_id AS 'product_rating_types_id',
                    PRODUCT.name AS 'product_name',
                    PRODUCT.description_short AS 'product_description_short',
                    PRODUCT.description_long AS 'product_description_long',
                    PRODUCT.sku AS 'product_sku',
                    PRODUCT.depart_from AS 'product_depart_from',
                    PRODUCT.arrive_to AS 'product_arrive_to',
                    PRODUCT.depart_time AS 'product_depart_time',
                    PRODUCT.arrive_time AS 'product_arrive_time',
                    PRODUCT.provider_vendor_match AS 'product_provider_vendor_match',
                    PRODUCT.day_span AS 'product_day_span',
                    PRODUCT.cover_image AS 'product_cover_image',
                    PRODUCT.api_id AS 'product_api_id',
                    PRODUCT.from_api AS 'product_from_api',
                    PRODUCT.hotel_code AS 'product_hotel_code',
                    PRODUCT.sort_order AS 'product_sort_order',
                    PRODUCT.enabled AS 'product_enabled',
                    PRODUCT.date_created AS 'product_date_created',
                    PRODUCT.created_by AS 'product_created_by',
                    PRODUCT.date_modified AS 'product_date_modified',
                    PRODUCT.modified_by AS 'product_modified_by',
                    PRODUCT.note AS 'product_note',
                    PRODUCT.keywords AS 'product_keywords',
                    CATEGORY.id AS 'category_id',
                    CATEGORY.pricing_strategy_types_id AS 'category_pricing_strategy_types_id',
                    CATEGORY.attribute_id AS 'category_attribute_id',
                    CATEGORY.name AS 'category_name',
                    CATEGORY.icon AS 'category_icon',
                    CATEGORY.view_product_index AS 'category_view_product_index',
                    CATEGORY.view_product_index_filter AS 'category_view_product_index_filter',
                    CATEGORY.view_product_index_search AS 'category_view_product_index_search',
                    CATEGORY.view_product_edit AS 'category_view_product_edit',
                    CATEGORY.view_product_package_edit AS 'category_view_product_package_edit',
                    CATEGORY.view_product_package_index AS 'category_view_product_package_index',
                    CATEGORY.all_day AS 'category_all_day',
                    CATEGORY.overlap AS 'category_overlap',
                    CATEGORY.editable AS 'category_editable',
                    CATEGORY.duration_editable AS 'category_duration_editable',
                    CATEGORY.start_editable AS 'category_start_editable',
                    CATEGORY.display AS 'category_display',
                    CATEGORY.background_color AS 'category_background_color',
                    CATEGORY.text_color AS 'category_text_color',
                    CATEGORY.border_color AS 'category_border_color',
                    CATEGORY.sort_order AS 'category_sort_order',
                    CATEGORY.enabled AS 'category_enabled',
                    CATEGORY.date_created AS 'category_date_created',
                    CATEGORY.created_by AS 'category_created_by',
                    CATEGORY.date_modified AS 'category_date_modified',
                    CATEGORY.modified_by AS 'category_modified_by',
                    CATEGORY.note AS 'category_note'

            FROM 	product PRODUCT
            JOIN 	category CATEGORY ON CATEGORY.id = PRODUCT.category_id

            ";
        
        public static function get(int $id = null): array
        {
            $where = "";
            if (!is_null($id)) {
                $where = "WHERE   PRODUCT.id = $id";
            }
            
            try {
                $sql = self::$sql . $where;
                
                return Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                Log::$debug_log->error($e);
                
                return [];
            }
        }
        
        public static function getOne(int $id = null): array
        {
            try {
                if (!is_null($id)) {
                    Model::$db->where("id", $id);
                }
                
                Model::$db->where("enabled", 1);
                
                return Model::$db->getOne(self::$dbTable);
            } catch (Exception $e) {
                return [];
            }
        }
        
        public static function update(array $params = []): array
        {
            $id = 1;
            
            return self::get($id);
        }
        
    }
