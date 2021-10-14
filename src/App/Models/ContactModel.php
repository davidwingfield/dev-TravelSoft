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
     * @package            Application\App
     * @subpackage         Controllers
     */
    class ContactModel extends Model
    {
        protected static $dbTable = "contact";
        protected static $dbFields = Array();

        public static function get(int $id = null): array
        {

            try {
                if (!is_null($id)) {
                    Model::$db->where("id", $id);
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

        public static function getByCompanyId(int $company_id = null): array
        {
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

            return Contact::format($contacts);
        }

    }
