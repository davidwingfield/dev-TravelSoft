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
     * @package            Framework\App
     * @subpackage         Models
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
                                    ADDRESS.date_created AS 'address_date_created',
                                    ADDRESS.created_by AS 'address_created_by',
                                    ADDRESS.date_modified AS 'address_date_modified',
                                    ADDRESS.modified_by AS 'address_modified_by',
                                    ADDRESS.enabled AS 'address_enabled',
                                    ADDRESS.note AS 'address_note',
                                    CITY.id AS 'city_id',
                                    CITY.sort_order AS 'city_sort_order',
                                    CITY.name AS 'city_name',
                                    CITY.enabled AS 'city_enabled',
                                    CITY.date_created AS 'city_date_created',
                                    CITY.created_by AS 'city_created_by',
                                    CITY.date_modified AS 'city_date_modified',
                                    CITY.modified_by AS 'city_modified_by',
                                    CITY.note AS 'city_note',
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
                                    PROVINCE.note AS 'province_note',
                                    COUNTRY.id AS 'country_id',
                                    COUNTRY.name AS 'country_name',
                                    COUNTRY.iso2 AS 'country_iso2',
                                    COUNTRY.iso3 AS 'country_iso3',
                                    COUNTRY.currency_id AS 'country_currency_id',
                                    COUNTRY.sort_order AS 'country_sort_order',
                                    COUNTRY.enabled AS 'country_enabled',
                                    COUNTRY.date_created AS 'country_date_created',
                                    COUNTRY.created_by AS 'country_created_by',
                                    COUNTRY.date_modified AS 'country_date_modified',
                                    COUNTRY.modified_by AS 'country_modified_by',
                                    COUNTRY.note AS 'country_note'
                    FROM 			company_address COMPANY_ADDRESS
                    JOIN			address ADDRESS ON ADDRESS.id = COMPANY_ADDRESS.address_id
                    JOIN			city CITY ON CITY.id = ADDRESS.city_id
                    JOIN			province PROVINCE ON PROVINCE.id = CITY.province_id
                    JOIN			country COUNTRY ON COUNTRY.id = PROVINCE.country_id
                    WHERE			COMPANY_ADDRESS.company_id = $company_id
                        AND			ADDRESS.enabled = 1
                        AND			COUNTRY.enabled = 1
                        AND			PROVINCE.enabled = 1
                        AND			CITY.enabled = 1
                    GROUP BY 		COMPANY_ADDRESS.address_id;";

                    $addresses = Model::$db->rawQuery($sql);
                } catch (Exception $e) {
                    Log::$debug_log->error($e->getMessage());
                }
            }

            return Address::format($addresses);
        }

    }
