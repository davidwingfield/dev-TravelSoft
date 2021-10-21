<?php

    namespace Framework\App\Controllers;

    use Framework\App\Models\AddressModel;
    use Framework\App\Models\ContactModel;
    use Framework\App\Models\VendorModel;
    use Framework\Core\Controller;

    /**
     * Short Vendor Description
     *
     * Long Vendor Description
     *
     * @package            Application\App
     * @subpackage         Controllers
     */
    class Vendor extends Controller
    {
        public function __construct()
        {
            parent::__construct();
        }

        /**
         * autocomplete
         *
         * Autocomplete json
         */
        public static function autocomplete(string $st = ""): array
        {
            return self::format_ac(VendorModel::vendor_ac($st));
        }

        private static function format_ac(array $vendors = []): array
        {
            $data["suggestions"] = [];
            foreach ($vendors AS $k => $vendor) {
                $l = (object)$vendor;
                $value = utf8_encode($l->company_name);
                array_push($data["suggestions"], [
                    "value" => utf8_encode($value),
                    "data" => self::format($vendor),
                ]);
            }

            return $data;
        }

        /**
         * format
         *
         * @param array $vendor
         *
         * @return array
         */
        private static function format(array $vendor = []): array
        {
            $temp = array();
            $results = array();
            //Log::$debug_log->trace($provider);
            //foreach ($providers AS $provider) {
            $vendor_id = $vendor["vendor_id"];
            $company_id = $vendor["company_id"];

            $temp = array(
                "id" => $vendor["vendor_id"],
                "sku" => $vendor["vendor_sku"],
                "is_provider" => $vendor["vendor_is_provider"],
                "show_online" => $vendor["vendor_show_online"],
                "show_sales" => $vendor["vendor_show_sales"],
                "show_ops" => $vendor["vendor_show_ops"],
                "note" => $vendor["vendor_note"],
                "enabled" => $vendor["vendor_enabled"],
                "date_created" => $vendor["vendor_date_created"],
                "date_modified" => $vendor["vendor_date_modified"],
                "created_by" => $vendor["vendor_created_by"],
                "modified_by" => $vendor["vendor_modified_by"],
                "company" => array(
                    "id" => $vendor["company_id"],
                    "name" => $vendor["company_name"],
                    "phone_1" => $vendor["company_phone_1"],
                    "phone_2" => $vendor["company_phone_2"],
                    "fax" => $vendor["company_fax"],
                    "website" => $vendor["company_website"],
                    "email" => $vendor["company_email"],
                    "enabled" => $vendor["company_enabled"],
                    "created_by" => $vendor["company_created_by"],
                    "date_created" => $vendor["company_date_created"],
                    "modified_by" => $vendor["company_modified_by"],
                    "date_modified" => $vendor["company_date_modified"],
                    "status" => $vendor["company_status"],
                    "note" => $vendor["company_note"],
                ),
                "addresses" => AddressModel::getByCompanyId((int)$company_id),
                "contacts" => ContactModel::getByCompanyId((int)$company_id),
            );

            return $temp;
        }

    }
