<?php

    namespace Framework\App\Models;

    use Exception;
    use Framework\App\Controllers\Image;
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

        /**
         * selectQuery
         *
         * @var string
         */
        protected static $selectQuery = "
        SELECT
                COMPANY.id AS 'company_id',
                COMPANY.name AS 'company_name',
                COMPANY.phone_1 AS 'company_phone_1',
                COMPANY.phone_2 AS 'company_phone_2',
                COMPANY.fax AS 'company_fax',
                COMPANY.website AS 'company_website',
                COMPANY.email AS 'company_email',
                COMPANY.cover_image AS 'company_cover_image',
                COMPANY.status_id AS 'company_status_id',
                COMPANY.enabled AS 'company_enabled',
                COMPANY.date_created AS 'company_date_created',
                COMPANY.created_by AS 'company_created_by',
                COMPANY.date_modified AS 'company_date_modified',
                COMPANY.modified_by AS 'company_modified_by',
                COMPANY.note AS 'company_note',
                BIN(name) AS binray_not_needed_column
        FROM 			company COMPANY
        ";

        /**
         * fetch company
         *
         * @param int|null $id
         *
         * @return array
         */
        public static function get(int $id = null): array
        {
            $company_images = [];
            $where = "";
            try {
                if (!is_null($id)) {
                    $where = "
                    WHERE           COMPANY.id = $id";

                    $company_images = Image::getByCompanyId((int)$id);
                    Log::$debug_log->trace($company_images);
                }

                $sql = self::$selectQuery . $where;

                $companies = Model::$db->rawQuery($sql);
                foreach ($companies as $company) {
                    Log::$debug_log->trace($company);
                }

                return Model::$db->rawQuery($sql);

            } catch (Exception $e) {
                return [];
            }
        }

        /**
         * fetch single company record
         *
         * @param int|null $id
         *
         * @return array
         */
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
                $where = "WHERE			COMPANY.name LIKE '$searchTerm'";
                $sql = self::$selectQuery . " " . $where;

                return Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                Log::$debug_log->error($e);

                return [];
            }
        }

        /**
         * update company record
         *
         * @param array $company
         *
         * @return array
         */
        public static function updateRecord(array $company): array
        {
            if (!isset($company)) {
                return [];
            }

            $user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
            $id = Model::setInt((isset($company["id"])) ? $company["id"] : null);
            $name = Model::setString((isset($company["name"])) ? $company["name"] : null);
            $phone_1 = Model::setString((isset($company["phone_1"])) ? $company["phone_1"] : null);
            $phone_2 = Model::setString((isset($company["phone_2"])) ? $company["phone_2"] : null);
            $fax = Model::setString((isset($company["fax"])) ? $company["fax"] : null);
            $website = Model::setString((isset($company["website"])) ? $company["website"] : null);
            $email = Model::setString((isset($company["email"])) ? $company["email"] : null);
            $cover_image = Model::setString((isset($company["cover_image"])) ? $company["cover_image"] : null);
            $status_id = Model::setInt((isset($company["status_id"])) ? $company["status_id"] : null);

            $enabled = Model::setBool((isset($company["enabled"])) ? $company["enabled"] : null);
            $note = Model::setLongText((isset($company["note"])) ? $company["note"] : null);
            $created_by = Model::setInt($user_id);
            $modified_by = Model::setInt($user_id);

            $sql = "
                INSERT INTO company (
                id, name, phone_1, phone_2, cover_image, 
                fax, website, email, status_id,
                enabled, date_created, created_by, date_modified,
                modified_by, note
            ) VALUES (
                $id, $name, $phone_1, $phone_2, $cover_image, 
                $fax, $website, $email, $status_id,
                $enabled, CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP,
                $modified_by, $note
            )
            ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                cover_image = VALUES(cover_image),
                phone_1 = VALUES(phone_1),
                phone_2 = VALUES(phone_2),
                fax = VALUES(fax),
                website = VALUES(website),
                email = VALUES(email),
                status_id = VALUES(status_id),
                note = VALUES(note),
                modified_by = VALUES(modified_by),
                date_modified = VALUES(date_modified),
                enabled = VALUES(enabled)";

//            Log::$debug_log->trace($sql);
            try {
                Model::$db->rawQuery($sql);
                $company_id = Model::$db->getInsertId();
                if ($company_id) {
                    return self::get($company_id);
                }
                Log::$debug_log->error("No Company Id");

                return [];
            } catch (Exception $e) {
                Log::$debug_log->error($e);

                return [];
            }
        }

        /**
         * autocomplete query
         *
         * @param string $st
         *
         * @return array
         */
        public static function company_ac(string $st = ""): array
        {
            try {
                $searchTerm = addslashes($st);
                $sql = self::$selectQuery . "
                    WHERE		COMPANY.name LIKE '%$searchTerm%'
                    ORDER BY    LENGTH(Company.name), CAST(Company.name AS UNSIGNED), Company.name ASC
                    LIMIT 20;";

                return Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                Log::$debug_log->error($e);

                return [];
            }
        }

    }
