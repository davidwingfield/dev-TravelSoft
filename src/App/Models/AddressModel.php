<?php

    namespace Framework\App\Models;

    use Exception;
    use Framework\Core\Model;

    /**
     * Short Address Description
     *
     * Long Address Description
     *
     * @package            Application\App
     * @subpackage         Controllers
     */
    class AddressModel extends Model
    {

        protected static $dbTable = "address";
        protected static $dbFields = Array();

        /**
         * get
         *
         * @param int|null $id
         *
         * @return array
         */
        public static function get(int $id = null): array
        {

            try {
                if (!is_null($id)) {
                    self::$db->where("id", $id);
                }

                self::$db->where("enabled", 1);

                return self::$db->get(self::$dbTable);
            } catch (Exception $e) {
                return [];
            }
        }

        /**
         * getByCompanyId
         *
         * @param int|null $company_id
         *
         * @return array
         */
        public static function getByCompanyId(int $company_id = null): array
        {
            $addresses = [];
            if (!is_null($company_id)) {
                try {

                    self::$db->join("address ADDRESS", "COMPANYADDRESS.company_id=ADDRESS.company_id", "LEFT");
                    self::$db->where("COMPANYADDRESS.company_id", $company_id);
                    $addresses = self::$db->get("company_address COMPANYADDRESS", null, "u.name, COMPANYADDRESS.company_id");
                } catch (Exception $e) {
                    return [];
                }
            }

            return $addresses;
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
