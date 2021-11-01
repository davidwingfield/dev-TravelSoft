<?php

    namespace Framework\App\Models;

    use Exception;
    use Framework\Core\Model;
    use Framework\Logger\Log;

    /**
     * Short Company Description
     *
     * Long Company Description
     *
     * @package            Framework\App
     * @subpackage         Models
     */
    class CompanyModel extends Model
    {

        protected static $dbTable = "company";

        protected static $dbFields = Array();

        protected static $selectQuery = "
        SELECT
                        COMPANY.id AS 'company_id',
                        COMPANY.name AS 'company_name',
                        COMPANY.phone_1 AS 'company_phone_1',
                        COMPANY.phone_2 AS 'company_phone_2',
                        COMPANY.fax AS 'company_fax',
                        COMPANY.website AS 'company_website',
                        COMPANY.email AS 'company_email',
                        COMPANY.status AS 'company_status',
                        COMPANY.enabled AS 'company_enabled',
                        COMPANY.date_created AS 'company_date_created',
                        COMPANY.created_by AS 'company_created_by',
                        COMPANY.date_modified AS 'company_date_modified',
                        COMPANY.modified_by AS 'company_modified_by',
                        COMPANY.note AS 'company_note'
        FROM 			company COMPANY
        ";

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

        /**
         * fetch company data by name
         *
         * @param string $name
         *
         * @return array
         */
        public static function getByName(string $name): array
        {
            $searchTerm = addslashes($name);
            try {
                try {
                    $where = "WHERE			COMPANY.name LIKE '$searchTerm'";
                    $sql = self::$selectQuery . " " . $where;

                    return Model::$db->rawQuery($sql);
                } catch (Exception $e) {
                    Log::$debug_log->trace($e);

                    return [];
                }
            } catch (Exception $e) {
                return [];
            }
        }

    }
