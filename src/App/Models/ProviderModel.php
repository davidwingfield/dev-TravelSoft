<?php

    namespace Framework\App\Models;

    use Exception;
    use Framework\Core\Model;
    use Framework\Logger\Log;

    /**
     * Short ProviderModel Description
     *
     * Long ProviderModel Description
     *
     * @package            Application\App
     * @subpackage         Models
     */
    class ProviderModel extends Model
    {
        /**
         * @var array[] $data Table Data
         */
        protected static $data = [
            "id" => array(),
            "company_id" => array(),
            "location_id" => array(),
            "code_direct_id" => array(),
            "provider_vendor" => array(),
            "enabled" => array(),
            "created_by" => array(),
            "date_created" => array(),
            "modified_by" => array(),
            "date_modified" => array(),
            "note" => array(),
        ];

        /**
         * Gets provider(s) by id
         *
         * If id is passed then we search by it otherwise get all enabled
         *
         * @param int|null $id Provider Id
         *
         * @return array
         */
        public static function get(int $id = null): array
        {
            $where = "";

            if (!is_null($id)) {
                $where = "WHERE		PROVIDER.id = $id";
            }

            $sql = "SELECT
                        PROVIDER.id AS 'provider_id',
                        COALESCE(PROVIDER.code_direct_id, '') AS 'provider_code_direct_id',
                        PROVIDER.provider_vendor AS 'provider_provider_vendor',
                        PROVIDER.location_id AS 'provider_location_id',
                        COALESCE(PROVIDER.note, '') AS 'provider_note',
                        PROVIDER.enabled AS 'provider_enabled',
                        PROVIDER.company_id AS 'provider_company_id',
                        PROVIDER.date_created AS 'provider_date_created',
                        PROVIDER.date_modified AS 'provider_date_modified',
                        PROVIDER.created_by AS 'provider_created_by',
                        PROVIDER.modified_by AS 'provider_modified_by',
                        COMPANY.id AS 'company_id',
                        COMPANY.name AS 'company_name',
                        COALESCE(COMPANY.phone_1, '') AS 'company_phone_1',
                        COALESCE(COMPANY.phone_2, '') AS 'company_phone_2',
                        COALESCE(COMPANY.fax, '') AS 'company_fax',
                        COALESCE(COMPANY.website, '') AS 'company_website',
                        COALESCE(COMPANY.email, '') AS 'company_email',
                        COALESCE(COMPANY.enabled, 1) AS 'company_enabled',
                        COALESCE(COMPANY.created_by, 4) AS 'company_created_by',
                        DATE_FORMAT(COMPANY.date_created, '%m/%d/%Y') AS 'company_date_created',
                        COALESCE(COMPANY.modified_by, 4) AS 'company_modified_by',
                        DATE_FORMAT(COMPANY.date_modified, '%m/%d/%Y') AS 'company_date_modified',
                        COALESCE(COMPANY.status, 6) AS 'company_status',
                        COMPANY.note AS 'company_note',
                        VENDOR.id AS 'vendor_id',
                        VENDOR.company_id AS 'vendor_company_id',
                        VENDOR.status_id AS 'vendor_status_id',
                        VENDOR.sku AS 'vendor_sku',
                        VENDOR.show_online AS 'vendor_show_online',
                        VENDOR.show_sales AS 'vendor_show_sales',
                        VENDOR.show_ops AS 'vendor_show_ops',
                        VENDOR.is_provider AS 'vendor_is_provider',
                        DATE_FORMAT(VENDOR.date_created, '%m/%d/%Y') AS 'vendor_date_created',
                        VENDOR.created_by  AS 'vendor_created_by',
                        DATE_FORMAT(VENDOR.date_modified, '%m/%d/%Y') AS 'vendor_date_modified',
                        VENDOR.modified_by  AS 'vendor_modified_by',
                        VENDOR.enabled AS 'vendor_enabled',
                        VENDOR.note  AS 'vendor_note',
                        CONCAT(	LOCATION.name, ' ', '(', CITY.name,	', ',	PROVINCE.name, ')' ) AS 'location',
                        CONCAT( LOCATION.name, ' ', '(', CITY.name, ' ', CONCAT(PROVINCE.iso2, ' - ', PROVINCE.name), ', ', CONCAT(COUNTRY.iso2, ' - ', COUNTRY.name), ')' ) AS 'location_long',
                        CONCAT( LOCATION.name, ' ', '(', CITY.name, ' ', PROVINCE.iso2, ', ', COUNTRY.iso2, ')' ) AS 'location_short',
                        CONCAT(	LOCATION.name,	' ',	'(' ,CITY.name,	', ',	PROVINCE.name,')') AS 'location_medium',
                        LOCATION.id AS 'location_id',
                        LOCATION.name AS 'location_name',
                        LOCATION.location_types_id AS 'location_location_types_id',
                        LOCATION.street_1 AS 'location_street_1',
                        LOCATION.street_2 AS 'location_street_2',
                        LOCATION.city_id AS 'location_city_id',
                        LOCATION.province_id AS 'location_province_id',
                        LOCATION.country_id AS 'location_country_id',
                        LOCATION.zipcode AS 'location_zipcode',
                        LOCATION.date_created AS 'location_date_created',
                        LOCATION.created_by AS 'location_created_by',
                        LOCATION.date_modified AS 'location_date_modified',
                        LOCATION.modified_by AS 'location_modified_by',
                        LOCATION.enabled AS 'location_enabled',
                        LOCATION.note AS 'location_note',
                        LOCATION_TYPES.id AS 'location_types_id',
                        LOCATION_TYPES.name AS 'location_types_name',
                        LOCATION_TYPES.icon AS 'location_types_icon',
                        LOCATION_TYPES.date_created AS 'location_types_date_created',
                        LOCATION_TYPES.created_by AS 'location_types_created_by',
                        LOCATION_TYPES.date_modified AS 'location_types_date_modified',
                        LOCATION_TYPES.modified_by AS 'location_types_modified_by',
                        LOCATION_TYPES.enabled AS 'location_types_enabled',
                        COUNTRY.id AS 'country_id',
                        COUNTRY.name AS 'country_name',
                        COUNTRY.iso2 AS 'country_iso2',
                        COUNTRY.iso3 AS 'country_iso3',
                        PROVINCE.id AS 'province_id',
                        PROVINCE.country_id AS 'province_country_id',
                        PROVINCE.name AS 'province_name',
                        CONCAT(PROVINCE.iso2, ' - ', PROVINCE.name) AS 'province_name_long',
                        PROVINCE.sort_order AS 'province_sort_order',
                        PROVINCE.iso2 AS 'province_iso2',
                        PROVINCE.iso3 AS 'province_iso3',
                        PROVINCE.note AS 'province_note',
                        PROVINCE.enabled AS 'province_enabled',
                        PROVINCE.date_created AS 'province_date_created',
                        PROVINCE.created_by AS 'province_created_by',
                        PROVINCE.date_modified AS 'province_date_modified',
                        PROVINCE.modified_by AS 'province_modified_by',
                        CITY.id AS 'city_id',
                        CITY.sort_order AS 'city_sort_order',
                        CITY.province_id AS 'city_province_id',
                        CITY.country_id AS 'city_country_id',
                        CITY.name AS 'city_name',
                        CITY.note AS 'city_note',
                        CITY.enabled AS 'city_enabled',
                        CITY.date_created AS 'city_date_created',
                        CITY.created_by AS 'city_created_by',
                        CITY.date_modified AS 'city_date_modified',
                        CITY.modified_by AS 'city_modified_by'
            FROM 		provider PROVIDER
            JOIN		company COMPANY ON COMPANY.id = PROVIDER.company_id
            LEFT JOIN	vendor VENDOR ON VENDOR.company_id = PROVIDER.company_id
            JOIN		location LOCATION ON LOCATION.id = PROVIDER.location_id
            JOIN		city CITY ON CITY.id = LOCATION.city_id
            JOIN       	country COUNTRY ON COUNTRY.id = CITY.country_id
            JOIN       	province PROVINCE ON PROVINCE.id = CITY.province_id
            JOIN		location_types LOCATION_TYPES ON LOCATION_TYPES.id = LOCATION.location_types_id
            $where;";

            try {
                return Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                Log::$debug_log->error($e->getMessage());

                return [];
            }
        }

        public static function getOne(int $id = null): array
        {
            if (!is_null($id)) {
                self::$db->where("id", $id);
            }
            self::$db->where("enabled", 1);

            return self::$db->getOne("provider");
        }

    }
