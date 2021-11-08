<?php

    namespace Framework\App\Models;

    use Exception;
    use Framework\App\Controllers\Contact;
    use Framework\Core\Model;
    use Framework\Logger\Log;

    /**
     * Short Contact Description
     *
     * Long Contact Description
     *
     * @package            Framework\App
     * @subpackage         Models
     */
    class ContactModel extends Model
    {

        protected static $dbTable = "contact";
        protected static $dbFields = Array();
        protected static $sql = "
        SELECT
                        GROUP_CONCAT(COMPANY_CONTACT.contact_types_id ORDER BY COMPANY_CONTACT.contact_types_id ASC SEPARATOR ',') AS 'contact_types_id',
                        CONTACT.id AS 'contact_id',
                        CONTACT.name_first AS 'contact_name_first',
                        CONTACT.name_last AS 'contact_name_last',
                        CONTACT.phone AS 'contact_phone',
                        CONTACT.email AS 'contact_email',
                        CONTACT.enabled AS 'contact_enabled',
                        CONTACT.date_created AS 'contact_date_created',
                        CONTACT.created_by AS 'contact_created_by',
                        CONTACT.date_modified AS 'contact_date_modified',
                        CONTACT.modified_by AS 'contact_modified_by',
                        CONTACT.note AS 'contact_note'
        FROM 			company_contact COMPANY_CONTACT
        JOIN			contact CONTACT ON CONTACT.id = COMPANY_CONTACT.contact_id
";

        public static function get(int $contact_id = null): array
        {
            $where = "
            
            ";

            try {
                if (!is_null($contact_id)) {
                    $where = "WHERE			COMPANY_CONTACT.contact_id = $contact_id";
                }

                $sql = self::$sql . "
                $where
                GROUP BY 		COMPANY_CONTACT.contact_id
                ";

                return Model::$db->rawQuery($sql);
            } catch (Exception $e) {
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

        public static function update(array $contact = []): array
        {
            if (!isset($contact["company_id"])) {
                Log::$debug_log->error("Missing Company Id");

                return [];
            }
            // ----
            $user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
            $id = Model::setInt((isset($contact["id"])) ? $contact["id"] : null);
            $name_first = Model::setString((isset($contact["name_first"])) ? $contact["name_first"] : null);
            $name_last = Model::setString((isset($contact["name_last"])) ? $contact["name_last"] : null);
            $phone = Model::setString((isset($contact["phone"])) ? $contact["phone"] : null);
            $email = Model::setString((isset($contact["email"])) ? $contact["email"] : null);
            $company_id = Model::setInt((isset($contact["company_id"])) ? $contact["company_id"] : null);
            $status_id = Model::setInt((isset($contact["status_id"])) ? $contact["status_id"] : null);
            $note = Model::setLongText((isset($contact["note"])) ? $contact["note"] : null);
            $enabled = Model::setBool((isset($contact["enabled"])) ? $contact["enabled"] : null);
            $created_by = Model::setInt($user_id);
            $modified_by = Model::setInt($user_id);
            $contact_types_id = [];

            if (isset($contact["contact_types_id"])) {
                foreach ($contact["contact_types_id"] AS $contact_type) {
                    $contact_types_id[] = $contact_type;
                }
            }

            $sql = "
                INSERT INTO contact (
                    id, name_first, name_last, phone, 
                    email, enabled, date_created, created_by,
                    date_modified, modified_by, note 
                ) VALUES (
                    $id, $name_first, $name_last, $phone,
                    $email, $enabled, CURRENT_TIMESTAMP, $created_by,
                    CURRENT_TIMESTAMP, $modified_by, $note
                )
                ON DUPLICATE KEY UPDATE
                    name_first = VALUES(name_first),
                    name_last = VALUES(name_last),
                    phone = VALUES(phone),
                    email = VALUES(email),
                    enabled = VALUES(enabled),
                    date_modified = VALUES(date_modified);";

            try {
                Model::$db->rawQuery($sql);
                $contact_id = Model::$db->getInsertId();
                if (isset($company_id, $contact_id, $contact_types_id)) {
                    $del = self::deleteCompanyContactByCompanyId((int)$company_id, (int)$contact_id);
                    $company_contact = self::updateCompanyContact((int)$contact_id, (int)$company_id, $contact_types_id);
                }

                return self::getByContactId((int)$contact_id);
            } catch (Exception $e) {
                Log::$debug_log->error($e);

                return [];
            }
        }

        public static function updateCompanyContact(int $contact_id, int $company_id, array $contact_types = []): array
        {
            if (!isset($company_id, $company_id, $contact_types)) {
                Log::$debug_log->error("Missing Fields");

                return [];
            }

            //
            $user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
            $enabled = 1;
            $note = Model::setLongText((isset($contact["note"])) ? $contact["note"] : null);
            $created_by = Model::setInt($user_id);
            $modified_by = Model::setInt($user_id);

            foreach ($contact_types AS $contact_types_id) {
                try {
                    $sql = "
                    INSERT INTO company_contact (
                        company_id,contact_id, contact_types_id, enabled,
                        date_created, created_by, date_modified, modified_by,
                        note
                    ) VALUES (
                        $company_id, $contact_id, $contact_types_id, $enabled,
                        CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP, $modified_by,
                        $note
                    )
                    ON DUPLICATE KEY UPDATE
                        enabled = VALUES(enabled),
                        date_modified = VALUES(date_modified);
                    ";
                    Model::$db->rawQuery($sql);
                } catch (Exception $e) {
                    Log::$debug_log->error($e);

                    return [];
                }
            }

            return self::getByCompanyId($company_id);
        }

        public static function deleteCompanyContactByCompanyId(int $company_id, int $contact_id): bool
        {
            $sql = "
                DELETE FROM company_contact
                WHERE company_id = $company_id AND contact_id = $contact_id;
                ";

            try {
                Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                Log::$debug_log->error($e);

                return false;
            }

            return true;
        }

        public static function getContactTypeById(int $contact_types_id = null): array
        {
            $contact_types = array();
            Model::$db->where("enabled", 1);
            if (!is_null($contact_types_id)) {
                Model::$db->where("id", (int)$contact_types_id);
            }
            try {
                $contact_types = self::$db->get("contact_types");
            } catch (Exception $e) {
                Log::$debug_log->error($e->getMessage());
            }

            return $contact_types;
        }

        public static function getByCompanyId(int $company_id = null): array
        {
            $where = "WHERE			COMPANY_CONTACT.company_id = $company_id";
            $contacts = array();

            if (!is_null($company_id)) {

                try {
                    $sql = "
                    SELECT
                                COMPANY_CONTACT.contact_id AS 'contact_id',
                                GROUP_CONCAT(COMPANY_CONTACT.contact_types_id ORDER BY COMPANY_CONTACT.contact_types_id ASC SEPARATOR ',') AS 'contact_contact_types_id',
                                CONTACT.name_first AS 'contact_name_first',
                                CONTACT.name_last AS 'contact_name_last',
                                CONTACT.phone AS 'contact_phone',
                                CONTACT.email AS 'contact_email',
                                CONTACT.enabled AS 'contact_enabled',
                                CONTACT.date_created AS 'contact_date_created',
                                CONTACT.date_modified AS 'contact_date_modified',
                                CONTACT.created_by AS 'contact_created_by',
                                CONTACT.modified_by AS 'contact_modified_by',
                                CONTACT.note AS 'contact_note'
                    FROM 		company_contact COMPANY_CONTACT
                    JOIN		contact CONTACT ON CONTACT.id = COMPANY_CONTACT.contact_id
                    WHERE		COMPANY_CONTACT.company_id = $company_id
                    GROUP BY 	COMPANY_CONTACT.contact_id;";
                    $contacts = Model::$db->rawQuery($sql);
                } catch (Exception $e) {
                    Log::$debug_log->error($e->getMessage());
                }
            }

            return $contacts;
        }

        public static function getByContactId(int $contact_id = null): array
        {
            $where = "WHERE			COMPANY_CONTACT.contact_id = $contact_id";
            $contacts = array();
            $results = [];
            try {
                $sql = "
                    SELECT
                                COMPANY_CONTACT.contact_id AS 'contact_id',
                                GROUP_CONCAT(COMPANY_CONTACT.contact_types_id ORDER BY COMPANY_CONTACT.contact_types_id ASC SEPARATOR ',') AS 'contact_contact_types_id',
                                CONTACT.name_first AS 'contact_name_first',
                                CONTACT.name_last AS 'contact_name_last',
                                CONTACT.phone AS 'contact_phone',
                                CONTACT.email AS 'contact_email',
                                CONTACT.enabled AS 'contact_enabled',
                                CONTACT.date_created AS 'contact_date_created',
                                CONTACT.date_modified AS 'contact_date_modified',
                                CONTACT.created_by AS 'contact_created_by',
                                CONTACT.modified_by AS 'contact_modified_by',
                                CONTACT.note AS 'contact_note'
                    FROM 		company_contact COMPANY_CONTACT
                    JOIN		contact CONTACT ON CONTACT.id = COMPANY_CONTACT.contact_id
                    WHERE		COMPANY_CONTACT.contact_id = $contact_id
                    GROUP BY 	COMPANY_CONTACT.contact_id;";
                $contacts = Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                Log::$debug_log->error($e->getMessage());
            }

            foreach ($results as $contact) {
                if (isset($contact["id"])) {
                    // $contacts[] = array(

                    //);
                }
            }

            return $contacts;
        }

    }
