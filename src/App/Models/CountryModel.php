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
     * @package            Application\App
     * @subpackage         Controllers
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
                                COUNTRY.iso2 AS 'country_ios2',
                                COUNTRY.iso3 AS 'country_ios3',
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
                self::$db->orderBy("sort_order", "ASC");
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
