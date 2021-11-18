<?php

    namespace Framework\App\Models;

    use Exception;
    use Framework\Core\Model;
    use Framework\Logger\Log;

    /**
     * Short Variant Description
     *
     * Long Variant Description
     *
     * @package            Framework\App
     * @subpackage         Models
     */
    class VariantModel extends Model
    {

        protected static $dbTable = "variant";
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
                        VARIANT.id AS 'variant_id',
                        VARIANT.category_id AS 'variant_category_id',
                        VARIANT.name AS 'variant_name',
                        VARIANT.enabled AS 'variant_enabled',
                        VARIANT.date_created AS 'variant_date_created',
                        VARIANT.created_by AS 'variant_created_by',
                        VARIANT.date_modified AS 'variant_date_modified',
                        VARIANT.modified_by AS 'variant_modified_by',
                        VARIANT.note AS 'variant_note',
                        PRODUCT_VARIANT.product_id AS 'product_variant_product_id',
                        PRODUCT_VARIANT.variant_id AS 'product_variant_variant_id',
                        PRODUCT_VARIANT.min_age AS 'product_variant_min_age',
                        PRODUCT_VARIANT.max_age AS 'product_variant_max_age',
                        PRODUCT_VARIANT.enabled AS 'product_variant_enabled',
                        PRODUCT_VARIANT.date_created AS 'product_variant_date_created',
                        PRODUCT_VARIANT.created_by AS 'product_variant_created_by',
                        PRODUCT_VARIANT.date_modified AS 'product_variant_date_modified',
                        PRODUCT_VARIANT.modified_by AS 'product_variant_modified_by',
                        PRODUCT_VARIANT.note AS 'product_variant_note'
                FROM 	variant VARIANT
                JOIN 	product_variant PRODUCT_VARIANT ON PRODUCT_VARIANT.variant_id = VARIANT.id
                WHERE   PRODUCT_VARIANT.product_id = $product_id
            ";
            try {
                return Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                Log::$debug_log->error($e);

                return [];
            }
        }

    }
