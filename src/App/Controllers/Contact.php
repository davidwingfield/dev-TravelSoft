<?php

    namespace Framework\App\Controllers;

    use Framework\Core\Controller;
    use Framework\Logger\Log;

    /**
     * Short Contact Description
     *
     * Long Contact Description
     *
     * @package            Application\App
     * @subpackage         Controllers
     */
    class Contact extends Controller
    {
        public function __construct()
        {
            parent::__construct();
        }

        private static function format_contact_table(array $contact = []): array
        {
            return [];
        }

        public static function format(array $contacts = []): array
        {
            $temp = array();
            $results = array();
            foreach ($contacts AS $contact) {
                $contact_id = $contact["contact_id"];
                if (!isset($temp[$contact_id])) {
                    $temp[$contact_id] = array(
                        "id" => $contact["contact_id"],
                        "contact_types_id" => $contact["contact_contact_types_id"],
                        "name_first" => $contact["contact_name_first"],
                        "name_last" => $contact["contact_name_last"],
                        "phone" => $contact["contact_phone"],
                        "email" => $contact["contact_email"],
                        "enabled" => $contact["contact_enabled"],
                        "date_created" => $contact["contact_date_created"],
                        "date_modified" => $contact["contact_date_modified"],
                        "created_by" => $contact["contact_created_by"],
                        "modified_by" => $contact["contact_modified_by"],
                        "note" => $contact["contact_note"],
                    );
                }
            }

            foreach ($temp AS $p) {
                $results[] = $p;
            }

            return $results;
        }

    }
