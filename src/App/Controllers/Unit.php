<?php

    namespace Framework\App\Controllers;

    use Framework\App\Models\UnitModel;
    use Framework\Core\Controller;

    /**
     * Short Unit Description
     *
     * Long Unit Description
     *
     * @package            Framework\App
     * @subpackage         Controllers
     */
    class Unit extends Controller
    {
        public function __construct()
        {
            parent::__construct();
        }

        public static function getUnitsByProductId(int $product_id = null): array
        {
            $units = [];
            $results = UnitModel::getByProductId((int)$product_id);
            foreach ($results AS $k => $season) {
                $units[] = self::format($season);
            }

            return $units;
        }

        private static function format(array $unit = null): array
        {
            if (is_null($unit)) {
                return [];
            }

            return array(
                'id' => $unit['unit_id'],
                'category_id' => $unit['unit_category_id'],
                'api_id' => $unit['unit_api_id'],
                'name' => $unit['unit_name'],
                'room_code' => $unit['unit_room_code'],
                'enabled' => $unit['unit_enabled'],
                'date_created' => $unit['unit_date_created'],
                'created_by' => $unit['unit_created_by'],
                'date_modified' => $unit['unit_date_modified'],
                'modified_by' => $unit['unit_modified_by'],
                'note' => $unit['unit_note'],
                'min_pax' => $unit['product_unit_min_pax'],
                'max_pax' => $unit['product_unit_max_pax'],
                'min_nights' => $unit['product_unit_min_nights'],
                'max_nights' => $unit['product_unit_max_nights'],
                'description_long' => $unit['product_unit_description_long'],
                'description_short' => $unit['product_unit_description_short'],
                'blurb' => $unit['product_unit_blurb'],
                'cover_image' => $unit['product_unit_cover_image'],
                'meeting_point' => $unit['product_unit_meeting_point'],
                'time_notes' => $unit['product_unit_time_notes'],
                'start_time' => $unit['product_unit_start_time'],
                'end_time' => $unit['product_unit_end_time'],
            );
        }

    }
