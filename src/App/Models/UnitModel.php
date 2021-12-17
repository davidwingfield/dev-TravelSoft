<?php
    
    namespace Framework\App\Models;
    
    use Exception;
    use Framework\Core\Model;
    use Framework\Logger\Log;
    
    /**
     * Short Unit Description
     * Long Unit Description
     *
     * @package            Framework\App
     * @subpackage         Models
     */
    class UnitModel extends Model
    {
        
        protected static $dbTable = "unit";
        protected static $dbFields = Array();
        
        public static function get(int $id = null): array
        {
            
            try {
                if (!is_null($id)) {
                    Model::$db->where("id", $id);
                }
                
                self::$db->where("enabled", 1);
                
                return self::$db->get(self::$dbTable);
            } catch (Exception $e) {
                return [];
            }
        }
        
        public static function getOne(int $id = null): array
        {
            try {
                if (!is_null($id)) {
                    Model::$db->where("id", $id);
                }
                
                self::$db->where("enabled", 1);
                
                return self::$db->getOne(self::$dbTable);
            } catch (Exception $e) {
                return [];
            }
        }
        
        public static function update(array $params = []): array
        {
            $id = 1;
            
            return Model::get($id);
        }
        
        public static function getByProductId(int $product_id = null): array
        {
            if (is_null($product_id)) {
                return [];
            }
            
            $sql = "
                SELECT
                        UNIT.id AS 'unit_id',
                        UNIT.category_id AS 'unit_category_id',
                        UNIT.api_id AS 'unit_api_id',
                        UNIT.name AS 'unit_name',
                        UNIT.room_code AS 'unit_room_code',
                        UNIT.enabled AS 'unit_enabled',
                        UNIT.date_created AS 'unit_date_created',
                        UNIT.created_by AS 'unit_created_by',
                        UNIT.date_modified AS 'unit_date_modified',
                        UNIT.modified_by AS 'unit_modified_by',
                        UNIT.note AS 'unit_note',
                        PRODUCT_UNIT.product_id AS 'product_unit_product_id',
                        PRODUCT_UNIT.unit_id AS 'product_unit_unit_id',
                        UNIT.min_pax AS 'unit_min_pax',
                        UNIT.max_pax AS 'unit_max_pax',
                        UNIT.min_nights AS 'unit_min_nights',
                        UNIT.max_nights AS 'unit_max_nights',
                        UNIT.description_long AS 'unit_description_long',
                        UNIT.description_short AS 'unit_description_short',
                        UNIT.blurb AS 'unit_blurb',
                        UNIT.cover_image AS 'unit_cover_image',
                        UNIT.meeting_point AS 'unit_meeting_point',
                        UNIT.time_notes AS 'unit_time_notes',
                        UNIT.start_time AS 'unit_start_time',
                        UNIT.end_time AS 'unit_end_time',
                        PRODUCT_UNIT.enabled AS 'product_unit_enabled',
                        PRODUCT_UNIT.date_created AS 'product_unit_date_created',
                        PRODUCT_UNIT.created_by AS 'product_unit_created_by',
                        PRODUCT_UNIT.date_modified AS 'product_unit_date_modified',
                        PRODUCT_UNIT.modified_by AS 'product_unit_modified_by',
                        PRODUCT_UNIT.note AS 'product_unit_note'
                FROM 	unit UNIT
                JOIN 	product_unit PRODUCT_UNIT ON PRODUCT_UNIT.unit_id = UNIT.id
                WHERE   PRODUCT_UNIT.product_id = $product_id
            ";
            try {
                return Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                Log::$debug_log->error($e);
                
                return [];
            }
        }
        
    }
