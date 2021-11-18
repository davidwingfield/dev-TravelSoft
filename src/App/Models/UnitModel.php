<?php

    namespace Framework\App\Models;

    use Exception;
    use Framework\Core\Model;
    use Framework\Logger\Log;

    /**
     * Short Unit Description
     *
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
                        PRODUCT_UNIT.min_pax AS 'product_unit_min_pax',
                        PRODUCT_UNIT.max_pax AS 'product_unit_max_pax',
                        PRODUCT_UNIT.min_nights AS 'product_unit_min_nights',
                        PRODUCT_UNIT.max_nights AS 'product_unit_max_nights',
                        PRODUCT_UNIT.description_long AS 'product_unit_description_long',
                        PRODUCT_UNIT.description_short AS 'product_unit_description_short',
                        PRODUCT_UNIT.blurb AS 'product_unit_blurb',
                        PRODUCT_UNIT.cover_image AS 'product_unit_cover_image',
                        PRODUCT_UNIT.meeting_point AS 'product_unit_meeting_point',
                        PRODUCT_UNIT.time_notes AS 'product_unit_time_notes',
                        PRODUCT_UNIT.start_time AS 'product_unit_start_time',
                        PRODUCT_UNIT.end_time AS 'product_unit_end_time',
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
