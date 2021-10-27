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

        public static function update(array $params = []): array
        {
            $id = 1;

            return Model::get($id);
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
            $where = "WHERE			COMPANY_CONTACT.company_id = $contact_id";
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
                    WHERE		COMPANY_CONTACT.company_id = $contact_id
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
