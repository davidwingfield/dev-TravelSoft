<?php

    namespace Framework\App\Models;

    use Exception;
    use Framework\App\Controllers\Address;
    use Framework\Core\Model;
    use Framework\Logger\Log;

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

        public static function getByCompanyId(int $company_id = null): array
        {
            $addresses = array();
            if (!is_null($company_id)) {

                try {
                    $sql = "
                    SELECT
                                COMPANY_ADDRESS.company_id,
                                COMPANY_ADDRESS.address_id,
                                GROUP_CONCAT(COMPANY_ADDRESS.address_types_id ORDER BY COMPANY_ADDRESS.address_types_id ASC SEPARATOR ',') AS 'address_types_id',
                                ADDRESS.id AS 'address_id',
                                ADDRESS.street_1 AS 'address_street_1',
                                ADDRESS.street_2 AS 'address_street_2',
                                ADDRESS.street_3 AS 'address_street_3',
                                ADDRESS.city_id AS 'address_city_id',
                                ADDRESS.country_id AS 'address_country_id',
                                ADDRESS.province_id AS 'address_province_id',
                                ADDRESS.postal_code AS 'address_postal_code',
                                (SELECT IFNULL(name, '') FROM city WHERE id = ADDRESS.city_id LIMIT 1) AS 'city_name',
                                (SELECT IFNULL(name, '') FROM province WHERE id = ADDRESS.province_id LIMIT 1) AS 'province_name',
                                (SELECT IFNULL(iso2, '') FROM province WHERE id = ADDRESS.province_id LIMIT 1) AS 'province_iso2',
                                (SELECT IFNULL(iso3, '') FROM province WHERE id = ADDRESS.province_id LIMIT 1) AS 'province_iso3',
                                (SELECT IFNULL(name, '') FROM country WHERE id = ADDRESS.country_id LIMIT 1) AS 'country_name',
                                (SELECT IFNULL(iso2, '') FROM country WHERE id = ADDRESS.country_id LIMIT 1) AS 'country_iso2',
                                (SELECT IFNULL(iso3, '') FROM country WHERE id = ADDRESS.country_id LIMIT 1) AS 'country_iso3',
                                ADDRESS.date_created AS 'address_date_created',
                                ADDRESS.created_by AS 'address_created_by',
                                ADDRESS.date_modified AS 'address_date_modified',
                                ADDRESS.modified_by AS 'address_modified_by',
                                ADDRESS.enabled AS 'address_enabled',
                                ADDRESS.note AS 'address_note'
                    FROM 		company_address COMPANY_ADDRESS
                    JOIN		address ADDRESS ON ADDRESS.id = COMPANY_ADDRESS.address_id
                    WHERE		COMPANY_ADDRESS.company_id = $company_id
                    GROUP BY 	COMPANY_ADDRESS.address_id;";
                    $addresses = Model::$db->rawQuery($sql);
                } catch (Exception $e) {
                    Log::$debug_log->error($e->getMessage());
                }
            }

            return Address::format($addresses);
        }

    }
