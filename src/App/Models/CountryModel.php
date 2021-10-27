<?php

    namespace Framework\App\Models;

    use Exception;
    use Framework\Core\Model;
    use Framework\Logger\Log;

    /**
     * Short Country Description
     *
     * Long Country Description
     *
     * @package            Framework\App
     * @subpackage         Models
     */
    class CountryModel extends Model
    {

        protected static $dbTable = "country";
        protected static $dbFields = Array();

        /**
         * @param int|null $id
         *
         * @return array
         */
        public static function get(int $id = null): array
        {
            $where = "";

            try {
                if (!is_null($id)) {
                    $where = "AND         COUNTRY.id = $id";
                }
                $sql = "
                SELECT 
                                COUNTRY.id AS 'country_id',
                                COUNTRY.currency_id AS 'country_currency_id',
                                COUNTRY.sort_order AS 'country_sort_order',
                                COUNTRY.name AS 'country_name',
                                COUNTRY.iso2 AS 'country_iso2',
                                COUNTRY.iso3 AS 'country_iso3',
                                COUNTRY.enabled AS 'country_enabled',
                                COUNTRY.date_created AS 'country_date_created',
                                COUNTRY.created_by AS 'country_created_by',
                                COUNTRY.date_modified AS 'country_date_modified',
                                COUNTRY.modified_by AS 'country_modified_by',
                                COUNTRY.note AS 'country_note'
                FROM 			country COUNTRY
                WHERE			COUNTRY.enabled = 1
                    $where
                ORDER BY		COUNTRY.sort_order ASC, COUNTRY.name ASC;";

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
                    self::$db->where("id", $id);
                }
                self::$db->orderBy("sort_order", "ASC");
                self::$db->where("enabled", 1);

                return self::$db->getOne(self::$dbTable);
            } catch (Exception $e) {
                return [];
            }
        }

        public static function update(array $country = []): array
        {
            $user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
            $id = Model::setInt((isset($country["id"])) ? $country["id"] : null);
            $sort_order = Model::setInt((isset($country["sort_order"])) ? $country["sort_order"] : 9999999);
            $currency_id = Model::setInt((isset($country["currency_id"])) ? $country["currency_id"] : 5);
            $name = Model::setString((isset($country["name"])) ? $country["name"] : null);
            $iso2 = Model::setString((isset($country["iso2"])) ? $country["iso2"] : null);
            $iso3 = Model::setString((isset($country["iso3"])) ? $country["iso3"] : null);
            $note = Model::setLongText((isset($country["note"])) ? $country["note"] : null);
            $enabled = Model::setBool((isset($country["enabled"])) ? $country["enabled"] : null);
            $created_by = Model::setInt($user_id);
            $modified_by = Model::setInt($user_id);

            $sql = "
                INSERT INTO country (
                    id, currency_id, sort_order, name, iso2,
                    iso3, enabled, date_created, created_by,
                    date_modified, modified_by, note
                ) VALUES (
                    $id, $currency_id, $sort_order, $name,
                    $iso2, $iso3, $enabled, DEFAULT,
                    $created_by, DEFAULT, $modified_by, $note
                )
                ON DUPLICATE KEY UPDATE
                    currency_id = VALUES(currency_id),
                    sort_order = VALUES(sort_order),
                    name = VALUES(name),
                    iso2 = VALUES(iso2),
                    iso3 = VALUES(iso3),
                    note = VALUES(note),
                    modified_by = VALUES(modified_by),
                    date_modified = VALUES(date_modified),
                    enabled = VALUES(enabled);";

            try {
                Model::$db->rawQuery($sql);
                $id = Model::$db->getInsertId();

                return self::get($id);
            } catch (Exception $e) {
                Log::$debug_log->error($e);

                return [];
            }

        }

    }
