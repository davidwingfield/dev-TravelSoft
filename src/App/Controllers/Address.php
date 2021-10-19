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

        private static function format_address_table(array $address = []): array
        {
            $formattedAddress = array();
            $short_address_formatted = "<address>";
            $medium_address_formatted = "<address>";
            $long_address_formatted = "<address>";
            $streets = [];
            $long_region = [];
            $medium_region = [];
            $short_region = [];
            // ----
            $country_name = ($address["country_name"]) ? strtoupper($address["country_name"]) : null;
            $country_iso2 = ($address["country_iso2"]) ? strtoupper($address["country_iso2"]) : null;
            $country_iso3 = ($address["country_iso3"]) ? strtoupper($address["country_iso3"]) : null;

            $province_name = ($address["province_name"]) ? strtoupper($address["province_name"]) : null;
            $province_iso2 = ($address["province_iso2"]) ? strtoupper($address["province_iso2"]) : null;

            $city_name = ($address["city_name"]) ? strtoupper($address["city_name"]) : null;

            $street_1 = ($address["address_street_1"]) ? strtoupper($address["address_street_1"]) : null;
            $street_2 = ($address["address_street_2"]) ? strtoupper($address["address_street_2"]) : null;
            $street_3 = ($address["address_street_3"]) ? strtoupper($address["address_street_3"]) : null;

            $postal = ($address["address_postal_code"]) ? strtoupper($address["address_postal_code"]) : null;

            $id = ($address["address_id"]) ? strtoupper($address["address_id"]) : null;
            $enabled = ($address["address_enabled"]) ? strtoupper($address["address_enabled"]) : null;
            $date_created = ($address["address_date_created"]) ? strtoupper($address["address_date_created"]) : null;
            $created_by = ($address["address_created_by"]) ? strtoupper($address["address_created_by"]) : null;
            $date_modified = ($address["address_date_modified"]) ? strtoupper($address["address_date_modified"]) : null;
            $modified_by = ($address["address_modified_by"]) ? strtoupper($address["address_modified_by"]) : null;
            $note = ($address["address_note"]) ? strtoupper($address["address_note"]) : null;

            if (!is_null($street_1)) {
                $streets[] = $street_1;
            }

            if (!is_null($street_2)) {
                $streets[] = $street_2;
            }

            if (!is_null($street_3)) {
                $streets[] = $street_3;
            }

            foreach ($streets AS $street) {
                $short_address_formatted .= "<span class='' style='white-space: nowrap'>$street</span><br>";
                $medium_address_formatted .= "<span class='' style='white-space: nowrap'>$street</span><br>";
                $long_address_formatted .= "<span class='' style='white-space: nowrap'>$street</span><br>";
            }

            if (!is_null($postal)) {
                $long_region[] = $postal;
                $medium_region[] = $postal;
                $short_region[] = $postal;
            }

            if (!is_null($city_name)) {
                $long_region[] = $city_name;
                $medium_region[] = $city_name;
                $short_region[] = $city_name;
            }

            if (!is_null($province_name)) {
                $long_region[] = $province_name;
            }

            if (!is_null($province_iso2)) {
                $medium_region[] = $province_iso2;
                $short_region[] = $province_iso2;
            }

            $region_short_line = implode(" ", $short_region);
            $region_medium_line = implode(" ", $medium_region);
            $region_long_line = implode(" ", $long_region);

            $short_address_formatted .= "<span class='' style='white-space: nowrap'>" . $region_short_line . "</span><br>";
            $medium_address_formatted .= "<span class='' style='white-space: nowrap'>" . $region_medium_line . "</span><br>";
            $long_address_formatted .= "<span class='' style='white-space: nowrap'>" . $region_long_line . "</span><br>";

            if (!is_null($country_name)) {
                $long_address_formatted .= "<span class='' style='white-space: nowrap'>" . $country_name . "</span>";
            }

            if (!is_null($country_iso2)) {
                $short_address_formatted .= "<span class='' style='white-space: nowrap'>" . $country_iso2 . "</span>";
            }

            if (!is_null($country_iso3)) {
                $medium_address_formatted .= "<span class='' style='white-space: nowrap'>" . $country_iso3 . "</span>";
            }

            $short_address_formatted .= "</address>";
            $medium_address_formatted .= "</address>";
            $long_address_formatted .= "</address>";

            $formattedAddress["short_address_formatted"] = $short_address_formatted;
            $formattedAddress["medium_address_formatted"] = $medium_address_formatted;
            $formattedAddress["long_address_formatted"] = $long_address_formatted;

            $country = array(
                "id" => $address["country_id"],
                "name" => $address["country_name"],
                "currency_id" => $address["country_currency_id"],
                "iso2" => $address["country_iso2"],
                "iso3" => $address["country_iso3"],
                "sort_order" => $address["country_sort_order"],
                "enabled" => $address["country_enabled"],
                "date_created" => $address["country_date_created"],
                "created_by" => $address["country_created_by"],
                "date_modified" => $address["country_date_modified"],
                "modified_by" => $address["country_modified_by"],
                "note" => $address["country_note"],
            );
            $formattedAddress["country"] = $country;

            $province = array(
                "id" => $address["province_id"],
                "name" => $address["province_name"],
                "iso2" => $address["province_iso2"],
                "iso3" => $address["province_iso3"],
                "sort_order" => $address["province_sort_order"],
                "enabled" => $address["province_enabled"],
                "date_created" => $address["province_date_created"],
                "created_by" => $address["province_created_by"],
                "date_modified" => $address["province_date_modified"],
                "modified_by" => $address["province_modified_by"],
                "note" => $address["province_note"],
            );
            $formattedAddress["province"] = $province;

            $city = array(
                "id" => $address["city_id"],
                "name" => $address["city_name"],
                "sort_order" => $address["city_sort_order"],
                "enabled" => $address["city_enabled"],
                "date_created" => $address["city_date_created"],
                "created_by" => $address["city_created_by"],
                "date_modified" => $address["city_date_modified"],
                "modified_by" => $address["city_modified_by"],
                "note" => $address["city_note"],
            );
            $formattedAddress["city"] = $city;

            $formattedAddress["street_1"] = $street_1;
            $formattedAddress["street_2"] = $street_2;
            $formattedAddress["street_3"] = $street_3;
            $formattedAddress["postal_code"] = $postal;

            $formattedAddress["id"] = $id;
            $formattedAddress["address_types_id"] = $address["address_types_id"];
            $formattedAddress["enabled"] = $enabled;
            $formattedAddress["date_created"] = $date_created;
            $formattedAddress["created_by"] = $created_by;
            $formattedAddress["date_modified"] = $date_modified;
            $formattedAddress["modified_by"] = $modified_by;
            $formattedAddress["note"] = $note;

            Log::$debug_log->trace($formattedAddress);

            return $formattedAddress;
        }

        public static function format(array $addresses = []): array
        {
            $formattedAddress = array();
            foreach ($addresses AS $address) {
                $formattedAddress[] = self::format_address_table($address);
            }

            return $formattedAddress;
        }

    }
