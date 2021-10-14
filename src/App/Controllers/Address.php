<?php

    namespace Framework\App\Controllers;

    use Framework\Core\Controller;
    use Framework\Logger\Log;

    /**
     * Short Address Description
     *
     * Long Address Description
     *
     * @package            Application\App
     * @subpackage         Controllers
     */
    class Address extends Controller
    {
        public function __construct()
        {
            parent::__construct();
        }

        public static function format(array $addresses = []): array
        {
            $temp = array();
            $results = array();
            foreach ($addresses AS $address) {
                Log::trace($address);
                $address_id = $address["address_id"];
                if (!isset($temp[$address_id])) {
                    $temp[$address_id] = array(
                        "id" => $address["address_id"],
                        "address_types_id" => $address["address_types_id"],
                        "city_id" => $address["address_city_id"],
                        "country_id" => $address["address_country_id"],
                        "postal_code" => $address["address_postal_code"],
                        "province_id" => $address["address_province_id"],
                        "street_1" => $address["address_street_1"],
                        "street_2" => $address["address_street_2"],
                        "street_3" => $address["address_street_3"],
                        "city_name" => $address["city_name"],
                        "country_iso2" => $address["country_iso2"],
                        "country_iso3" => $address["country_iso3"],
                        "country_name" => $address["country_name"],
                        "province_iso2" => $address["province_iso2"],
                        "province_iso3" => $address["province_iso3"],
                        "province_name" => $address["province_name"],
                        "enabled" => $address["address_enabled"],
                        "date_created" => $address["address_date_created"],
                        "date_modified" => $address["address_date_modified"],
                        "created_by" => $address["address_created_by"],
                        "modified_by" => $address["address_modified_by"],
                        "note" => $address["address_note"],
                    );
                }
            }

            foreach ($temp AS $p) {
                $results[] = $p;
            }

            return $results;
        }

    }
