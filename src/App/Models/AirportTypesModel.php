<?php

    namespace Framework\App\Models;

    use Exception;
    use Framework\Core\Model;

    /**
     * Short AirportTypes Description
     *
     * Long AirportTypes Description
     *
     * @package            Application\App
     * @subpackage         Controllers
     */
    class AirportTypesModel extends Model
    {

        protected static $dbTable = "airport_types";
        protected static $dbFields = Array();

        public static function get(int $id = null): array
        {

            try {
                if (!is_null($id)) {
                    self::$db->where("id", $id);
                }
                self::$db->orderBy("sort_order", "ASC");
                self::$db->where("enabled", 1);

                return Model::$db->get(self::$dbTable);
            } catch (Exception $e) {
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
