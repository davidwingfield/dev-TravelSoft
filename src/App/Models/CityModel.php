<?php

    namespace Framework\App\Models;

    use Exception;
    use Framework\Core\Model;

    /**
     * Short City Description
     *
     * Long City Description
     *
     * @package            Application\App
     * @subpackage         Controllers
     */
    class CityModel extends Model
    {

        protected static $dbTable = "city";
        protected static $dbFields = Array();

        public static function get(int $country_id = null, int $province_id = null, int $city_id = null): array
        {
            $where = "WHERE			CITY.enabled = 1";
            if (!is_null($country_id)) {
                $where .= " AND         CITY.country_id = $country_id";
            }

            if (!is_null($province_id)) {
                $where .= " AND         CITY.province_id = $province_id";
            }

            if (!is_null($city_id)) {
                $where .= " AND         CITY.id = $city_id";
            }

            try {
                $sql = "
                SELECT 
                                CITY.id AS 'city_id',
                                CITY.country_id AS 'city_country_id',
                                CITY.province_id AS 'city_province_',
                                CITY.name AS 'city_name',
                                CITY.sort_order AS 'city_sort_order',
                                CITY.enabled AS 'city_enabled',
                                CITY.date_created AS 'city_date_created',
                                CITY.created_by AS 'city_created_by',
                                CITY.date_modified AS 'city_date_modified',
                                CITY.modified_by AS 'city_modified_by',
                                CITY.note AS 'city_note'
                FROM 			city CITY
                $where
                ORDER BY 		CITY.sort_order ASC, CITY.name ASC;";

                return Model::$db->rawQuery($sql);
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

    }
