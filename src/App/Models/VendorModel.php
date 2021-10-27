<?php

    namespace Framework\App\Models;

    use Exception;
    use Framework\Core\Model;
    use Framework\Logger\Log;

    /**
     * Short Vendor Description
     *
     * Long Vendor Description
     *
     * @package            Framework\App
     * @subpackage         Models
     */
    class VendorModel extends Model
    {
        protected static $selectQuery = "
            SELECT 
                            COMPANY.id AS 'company_id',
                            COMPANY.name AS 'company_name',
                            COALESCE(COMPANY.phone_1, '') AS 'company_phone_1',
                            COALESCE(COMPANY.phone_2, '') AS 'company_phone_2',
                            COALESCE(COMPANY.fax, '') AS 'company_fax',
                            COALESCE(COMPANY.website, '') AS 'company_website',
                            COALESCE(COMPANY.email, '') AS 'company_email',
                            COMPANY.enabled AS 'company_enabled',
                            COMPANY.created_by AS 'company_created_by',
                            DATE_FORMAT(COMPANY.date_created, '%m/%d/%Y') AS 'company_date_created',
                            COMPANY.modified_by AS 'company_modified_by',
                            DATE_FORMAT(COMPANY.date_modified, '%m/%d/%Y') AS 'company_date_modified',
                            COALESCE(COMPANY.status, 10) AS 'company_status',
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
                            VENDOR.note  AS 'vendor_note'
            FROM 			vendor VENDOR
            JOIN			company COMPANY ON COMPANY.id = VENDOR.company_id
           WHERE			COMPANY.enabled = 1
                AND			COMPANY.enabled = 1
                AND			VENDOR.enabled = 1
                AND			COALESCE(COMPANY.status, 10) = 10
                ";

        protected static $dbTable = "vendor";

        protected static $dbFields = Array();

        /**
         * Gets vendor(s) by id
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
            try {
                if (!is_null($id)) {
                    $where = "AND		VENDOR.id = $id";
                }
                $sql = self::$selectQuery . $where;

                return Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                Log::$debug_log->error($e->getMessage());

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

        public static function vendor_ac(string $st = ""): array
        {
            try {
                $searchTerm = addslashes($st);
                $sql = self::$selectQuery . "
                    AND			COMPANY.name LIKE '%$searchTerm%'
                    ORDER BY    COMPANY.name ASC
                    LIMIT 20;";
                Log::$debug_log->trace($sql);

                return Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                Log::$debug_log->error($e);

                return [];
            }
        }

    }
