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
            WHERE   PRODUCT.enabled = 1
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
        
        public static function product_ac(string $st = "", int $category_id = null): array
        {
            if (is_null($category_id)) {
                return [];
            }
            
            try {
                $searchTerm = addslashes($st);
                $sql = self::$sql . "
                    AND			PRODUCT.name LIKE '%$searchTerm%'
                    AND         PRODUCT.category_id = $category_id
                    ORDER BY    LENGTH(PRODUCT.name), CAST(PRODUCT.name AS UNSIGNED), PRODUCT.name ASC
                    LIMIT 20;";
                
                //Log::$debug_log->trace($sql);
                
                return Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                Log::$debug_log->error($e);
                
                return [];
            }
        }
        
        public static function addRecord(array $product = null): array
        {
            $user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
            
            $id = Model::setInt((isset($product["id"])) ? $product["id"] : null);
            $category_id = Model::setInt((isset($product["category_id"])) ? $product["category_id"] : null);
            $location_id = Model::setInt((isset($product["location_id"])) ? $product["location_id"] : 1);
            $pricing_strategy_types_id = Model::setInt((isset($product["pricing_strategy_types_id"])) ? $product["pricing_strategy_types_id"] : null);
            $status_types_id = Model::setInt((isset($product["status_types_id"])) ? $product["status_types_id"] : 1);
            $currency_id = Model::setInt((isset($product["currency_id"])) ? $product["currency_id"] : 5);
            $provider_id = Model::setInt((isset($product["provider_id"])) ? $product["provider_id"] : null);
            $vendor_id = Model::setInt((isset($product["vendor_id"])) ? $product["vendor_id"] : null);
            $rating_types_id = Model::setInt((isset($product["rating_types_id"])) ? $product["rating_types_id"] : 5);
            $api_id = Model::setInt((isset($product["api_id"])) ? $product["api_id"] : null);
            $created_by = Model::setInt($user_id);
            $modified_by = Model::setInt($user_id);
            $day_span = Model::setInt((isset($product["day_span"])) ? $product["day_span"] : 1);
            
            $provider_vendor_match = Model::setBool((isset($product["provider_vendor_match"])) ? $product["provider_vendor_match"] : 0);
            $enabled = Model::setBool((isset($product["enabled"])) ? $product["enabled"] : 1);
            $use_provider_id = Model::setBool((isset($product["use_provider_id"])) ? $product["use_provider_id"] : 0);
            
            $sku = Model::setString((isset($product["sku"])) ? $product["sku"] : null);
            $name = Model::setString((isset($product["name"])) ? $product["name"] : null);
            $depart_from = Model::setString((isset($product["depart_from"])) ? $product["depart_from"] : null);
            $arrive_to = Model::setString((isset($product["arrive_to"])) ? $product["arrive_to"] : null);
            $depart_time = Model::setString((isset($product["depart_time"])) ? $product["depart_time"] : null);
            $arrive_time = Model::setString((isset($product["arrive_time"])) ? $product["arrive_time"] : null);
            $hotel_code = Model::setString((isset($product["hotel_code"])) ? $product["hotel_code"] : null);
            
            $note = Model::setLongText((isset($product["note"])) ? $product["note"] : null);
            $description_long = Model::setLongText((isset($product["description_long"])) ? $product["description_long"] : null);
            $description_short = Model::setLongText((isset($product["description_short"])) ? $product["description_short"] : null);
            $keywords = Model::setLongText((isset($product["keywords"])) ? $product["keywords"] : null);
            
            $sql = "
                INSERT INTO product (
                    id, category_id, pricing_strategy_types_id, status_types_id, currency_id,
                    location_id, provider_id, vendor_id, rating_types_id, name,
                    description_short, description_long, keywords, sku, depart_from,
                    arrive_to, depart_time, arrive_time, provider_vendor_match, use_provider_id,
                    day_span, cover_image, api_id, from_api, hotel_code,
                    sort_order, enabled, date_created, created_by, date_modified,
                    modified_by, note
                ) VALUES (
                    $id, $category_id, $pricing_strategy_types_id, $status_types_id, $currency_id,
                    $location_id, $provider_id, $vendor_id, $rating_types_id, $name,
                    $description_short, $description_long, $keywords, $sku, $depart_from,
                    $arrive_to, $depart_time, $arrive_time, $provider_vendor_match, $use_provider_id,
                    $day_span, '/public/img/placeholder.jpg', $api_id, 0, $hotel_code,
                    999, $enabled, CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP,
                    $modified_by, $note
                )
                ON DUPLICATE KEY UPDATE
                    category_id = VALUES(category_id),
                    pricing_strategy_types_id = VALUES(pricing_strategy_types_id),
                    status_types_id = VALUES(status_types_id),
                    currency_id = VALUES(currency_id),
                    location_id = VALUES(location_id),
                    provider_id = VALUES(provider_id),
                    vendor_id = VALUES(vendor_id),
                    rating_types_id = VALUES(rating_types_id),
                    name = VALUES(name),
                    
                    description_short = VALUES(description_short),
                    description_long = VALUES(description_long),
                    keywords = VALUES(keywords),
                    
                    sku = VALUES(sku),
                    
                    depart_from = VALUES(depart_from),
                    arrive_to = VALUES(arrive_to),
                    depart_time = VALUES(depart_time),
                    arrive_time = VALUES(arrive_time),
                    provider_vendor_match = VALUES(provider_vendor_match),
                    use_provider_id = VALUES(use_provider_id),
                    day_span = VALUES(day_span),
                    cover_image = VALUES(cover_image),
                    api_id = VALUES(api_id),
                    from_api = VALUES(from_api),
                    hotel_code = VALUES(hotel_code),
                    sort_order = VALUES(sort_order),
                    note = VALUES(note),
                    enabled = VALUES(enabled),
                    modified_by = VALUES(modified_by),
                    date_modified = VALUES(date_modified);
            ";
            
            Log::$debug_log->trace($sql);
            
            return $product;
        }
        
    }
