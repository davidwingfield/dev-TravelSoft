<?php

    namespace Framework\App\Controllers;

    use Framework\App\Models\AddressModel;
    use Framework\App\Models\ContactModel;
    use Framework\App\Models\VendorModel;
    use Framework\Core\Controller;
    use Framework\Core\View;
    use Framework\Logger\Log;

    /**
     * Short Vendor Description
     *
     * Long Vendor Description
     *
     * @package            Framework\App
     * @subpackage         Controllers
     */
    class Vendor extends Controller
    {
        protected $primaryKey = "id";
        protected $sku = null;

        public function __construct()
        {
            parent::__construct();
        }

        /**
         * serveGet
         *
         * @param array $params
         */
        public static function getByVendorId(int $vendor_id = null): array
        {
            $vendors = [];

            if (!isset($vendor_id)) {
                $vendor_id = null;
            }

            $results = VendorModel::get($vendor_id);

            if ($results) {
                foreach ($results AS $vendor) {
                    $vendors[] = self::format($vendor);
                }
            }

            return $vendors;
        }

        /**
         * serveGet
         *
         * @param array $params
         */
        public function serveGet(array $params = [])
        {
            $vendor_id = null;
            if (isset($params["vendor_id"])) {
                $vendor_id = (int)$params["vendor_id"];
            }
            $results = VendorModel::get($vendor_id);
            if ($results) {
                foreach ($results AS $vendor) {
                    $vendors[] = self::format($vendor);
                }
            }
            // ----
            View::render_json($vendors);
            exit(1);
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

        /**
         * format_ac
         *
         * @param array $vendors
         *
         * @return array
         */
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

        private static function generateSKU(array $vendor): string
        {
            $name = $vendor["company_name"];
            $id = $vendor["vendor_id"];

            $words = preg_split("/\s+/", $name);
            $count = count($words);
            $sku = str_pad($id, 11, "0", STR_PAD_LEFT);

            $t = "";
            if ($count >= 3) {
                for ($n = 0; $n < 3; $n++) {
                    $t .= strtoupper(substr($words[$n], 0, 1));
                }
            } else if ($count == 2) {
                for ($n = 0; $n < 2; $n++) {
                    $t .= strtoupper(substr($words[$n], 0, 1));
                }
                $t .= "X";
            } else if ($count == 1) {
                for ($n = 0; $n < 1; $n++) {
                    $t .= strtoupper(substr($words[$n], 0, 1));
                }
                $t .= "XX";
            } else {
                $t = "XXX";
            }

            return $t . $sku;
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
            $company_id = (int)$vendor["company_id"];
            $vendor_id = (int)$vendor["vendor_id"];
            $sku = self::generateSKU($vendor);

            /*
            Log::$debug_log->trace($sku);
            //*/

            return array(
                "vendor_detail" => array(
                    "id" => $vendor["vendor_id"],
                    "sku" => $sku,
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
                ),
                "company_detail" => array(
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

        }

    }
