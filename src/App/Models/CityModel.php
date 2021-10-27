<?php

    namespace Framework\App\Models;

    use Exception;
    use Framework\Core\Model;
    use Framework\Logger\Log;

    /**
     * Short City Description
     *
     * Long City Description
     *
     * @package            Framework\App
     * @subpackage         Models
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
                                CITY.province_id AS 'city_province_id',
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

        public static function update(array $city = []): array
        {
            $user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
            $id = Model::setInt((isset($city["id"])) ? $city["id"] : null);
            $country_id = Model::setInt((isset($city["country_id"])) ? $city["country_id"] : null);
            $province_id = Model::setInt((isset($city["province_id"])) ? $city["province_id"] : null);
            $sort_order = Model::setInt((isset($city["sort_order"])) ? $city["sort_order"] : 9999999);
            $name = Model::setString((isset($city["name"])) ? $city["name"] : null);
            $note = Model::setLongText((isset($city["note"])) ? $city["note"] : null);
            $enabled = Model::setBool((isset($city["enabled"])) ? $city["enabled"] : null);
            $created_by = Model::setInt($user_id);
            $modified_by = Model::setInt($user_id);

            $sql = "
                INSERT INTO city (
                    id, country_id, province_id, sort_order, name,
                    enabled, date_created, created_by,
                    date_modified, modified_by, note
                ) VALUES (
                    $id, $country_id, $province_id, $sort_order, $name,
                    $enabled, DEFAULT,
                    $created_by, DEFAULT, $modified_by, $note
                )
                ON DUPLICATE KEY UPDATE
                    sort_order = VALUES(sort_order),
                    name = VALUES(name),
                    note = VALUES(note),
                    modified_by = VALUES(modified_by),
                    date_modified = VALUES(date_modified),
                    enabled = VALUES(enabled);";

            try {
                Model::$db->rawQuery($sql);
                $id = Model::$db->getInsertId();

                return self::get($country_id, $province_id, $id);
            } catch (Exception $e) {
                Log::$debug_log->error($e);

                return [];
            }
        }

    }
