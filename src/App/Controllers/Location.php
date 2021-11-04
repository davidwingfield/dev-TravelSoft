<?php

    namespace Framework\App\Controllers;

    use Framework\App\Models\LocationModel;
    use Framework\Core\Controller;
    use Framework\Core\View;

    /**
     * Short Location Description
     *
     * Long Location Description
     *
     * @package            Framework\App
     * @subpackage         Controllers
     */
    class Location extends Controller
    {
        public function __construct()
        {
            parent::__construct();
        }

        public static function validateName(array $args = []): array
        {
            $locations = array();
            $default_display = (!isset($args["default_display"])) ? $args["default_display"] : "medium";
            if (isset($args["name"])) {
                $name = $args["name"];
                $results = LocationModel::getByName($name, $default_display);

                foreach ($results AS $k => $company) {
                    $locations[] = self::format($company);
                }
            }

            // ----

            View::render_json($locations);
            exit(1);
        }

        public static function autocomplete(string $st = "", string $default_display = "medium"): array
        {
            return self::format_ac(LocationModel::location_ac($st, $default_display), $default_display);
        }

        private static function format_ac(array $locations = [], string $default_display = "medium"): array
        {
            $data["suggestions"] = [];

            foreach ($locations AS $k => $location) {
                $l = (object)$location;
                // ----
                if ($default_display === "short") {
                    $value = utf8_encode($l->location_short);
                } else {
                    if ($default_display === "long") {
                        $value = utf8_encode($l->location_long);
                    } else {
                        $value = utf8_encode($l->location);
                    }
                }

                array_push($data["suggestions"], [
                    "value" => utf8_encode($value),
                    "data" => self::format($location),
                ]);
            }

            return $data;
        }

        private static function format($location): array
        {
            return array(
                "display_short" => $location->location_short,
                "display_medium" => $location->location,
                "display_long" => $location->location_long,
                "id" => $location->location_id,
                "name" => $location->location_name,
                "street_1" => $location->location_street_1,
                "street_2" => $location->location_street_2,
                "zipcode" => $location->location_zipcode,
                "type" => array(
                    "id" => $location->location_types_id,
                    "name" => $location->location_types_name,
                    "icon" => $location->location_types_icon,
                    "sort_order" => $location->location_types_sort_order,
                    "enabled" => $location->location_types_enabled,
                    "date_created" => $location->location_types_date_created,
                    "created_by" => $location->location_types_created_by,
                    "date_modified" => $location->location_types_date_modified,
                    "modified_by" => $location->location_types_modified_by,
                    "note" => $location->location_types_note,
                ),
                "country" => array(
                    "id" => $location->country_id,
                    "name" => $location->country_name,
                    "name_long" => $location->country_name_long,
                    "iso2" => $location->country_iso2,
                    "iso3" => $location->country_iso3,
                    "sort_order" => $location->country_sort_order,
                    "enabled" => $location->country_enabled,
                    "date_created" => $location->country_date_created,
                    "created_by" => $location->country_created_by,
                    "date_modified" => $location->country_date_modified,
                    "modified_by" => $location->country_modified_by,
                    "note" => $location->country_note,
                ),
                "province" => array(
                    "id" => $location->province_id,
                    "name" => $location->province_name,
                    "name_long" => $location->province_name_long,
                    "iso2" => $location->province_iso2,
                    "iso3" => $location->province_iso3,
                    "sort_order" => $location->province_sort_order,
                    "enabled" => $location->province_enabled,
                    "date_created" => $location->province_date_created,
                    "created_by" => $location->province_created_by,
                    "date_modified" => $location->province_date_modified,
                    "modified_by" => $location->province_modified_by,
                    "note" => $location->province_note,
                ),
                "city" => array(
                    "id" => $location->city_id,
                    "name" => $location->city_name,
                    "sort_order" => $location->city_sort_order,
                    "enabled" => $location->city_enabled,
                    "date_created" => $location->city_date_created,
                    "created_by" => $location->city_created_by,
                    "date_modified" => $location->city_date_modified,
                    "modified_by" => $location->city_modified_by,
                    "note" => $location->city_note,
                ),
            );
        }

    }
