<?php

    namespace Framework\App\Models;

    use Exception;
    use Framework\Core\Model;
    use Framework\Logger\Log;

    /**
     * Short Province Description
     *
     * Long Province Description
     *
     * @package            Application\App
     * @subpackage         Controllers
     */
    class ProvinceModel extends Model
    {

        protected static $dbTable = "province";
        protected static $dbFields = Array();

        public static function get(int $country_id = null, int $province_id = null): array
        {
            $where = "WHERE			PROVINCE.enabled = 1";
            if (!is_null($country_id)) {
                $where .= " AND         PROVINCE.country_id = $country_id";
            }

            if (!is_null($province_id)) {
                $where .= " AND         PROVINCE.id = $province_id";
            }

            try {

                $sql = "
                SELECT 
                                PROVINCE.id AS 'province_id',
                                PROVINCE.country_id AS 'province_country_id',
                                PROVINCE.name AS 'province_name',
                                PROVINCE.iso2 AS 'province_iso2',
                                PROVINCE.iso3 AS 'province_iso3',
                                PROVINCE.sort_order AS 'province_sort_order',
                                PROVINCE.enabled AS 'province_enabled',
                                PROVINCE.date_created AS 'province_date_created',
                                PROVINCE.created_by AS 'province_created_by',
                                PROVINCE.date_modified AS 'province_date_modified',
                                PROVINCE.modified_by AS 'province_modified_by',
                                PROVINCE.note AS 'province_note'
                FROM 			province PROVINCE
                $where
                ORDER BY 		PROVINCE.sort_order, PROVINCE.name ASC;";

                return Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                Log::$debug_log->trace("test");

                return [];
            }
        }

        public static function getOne(int $id = null): array
        {
            try {
                if (!is_null($id)) {
                    self::$db->where("id", $id);
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

            return self::get($id);
        }

    }
