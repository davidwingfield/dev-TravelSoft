<?php

    namespace Framework\App\Controllers;

    use Exception;
    use Framework\App\Models\CompanyModel;
    use Framework\Core\Controller;
    use Framework\Core\View;
    use Framework\Logger\Log;

    /**
     * Short Company Description
     *
     * Long Company Description
     *
     * @package            Framework\App
     * @subpackage         Controllers
     */
    class Company extends Controller
    {

        /**
         * construct object from Controller
         */
        public function __construct()
        {
            parent::__construct();
        }

        public static function validateName(array $args = []): array
        {
            $companies = array();
            if (isset($args["name"])) {
                $name = $args["name"];
                $results = CompanyModel::getByName($name);

                foreach ($results AS $k => $company) {
                    $companies[] = self::format($company);
                }
            }

            // ----

            View::render_json($companies);
            exit(1);
        }

        public static function serveUpdate(array $params = [])
        {
            $company = CompanyModel::updateRecord($params);
            // ----
            View::render_json($company);
            exit(1);
        }

        private static function format(array $company): array
        {
            return array(
                "id" => $company["company_id"],
                "name" => $company["company_name"],
                "phone_1" => $company["company_phone_1"],
                "phone_2" => $company["company_phone_2"],
                "fax" => $company["company_fax"],
                "website" => $company["company_website"],
                "email" => $company["company_email"],
                "status_id" => $company["company_status_id"],
                "enabled" => $company["company_enabled"],
                "date_created" => $company["company_date_created"],
                "created_by" => $company["company_created_by"],
                "date_modified" => $company["company_date_modified"],
                "modified_by" => $company["company_modified_by"],
                "note" => $company["company_note"],
            );
        }

    }
