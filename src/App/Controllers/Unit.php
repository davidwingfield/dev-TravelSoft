<?php
    
    namespace Framework\App\Controllers;
    
    use Framework\App\Models\UnitModel;
    use Framework\Core\Controller;
    use Framework\Logger\Log;
    
    /**
     * Short Unit Description
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
        
        public static function autocomplete(string $st = "", int $category_id = null): array
        {
            $test = UnitModel::unit_ac($st, $category_id);
            Log::$debug_log->trace($test);
            
            return self::format_ac($test);
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
                'room_code' => buildCode($unit['unit_id'], $unit['unit_name'], "unit"),
                'min_pax' => $unit['unit_min_pax'],
                'max_pax' => $unit['unit_max_pax'],
                'min_nights' => $unit['unit_min_nights'],
                'max_nights' => $unit['unit_max_nights'],
                'description_long' => $unit['unit_description_long'],
                'description_short' => $unit['unit_description_short'],
                'blurb' => $unit['unit_blurb'],
                'cover_image' => $unit['unit_cover_image'],
                'meeting_point' => $unit['unit_meeting_point'],
                'time_notes' => $unit['unit_time_notes'],
                'start_time' => $unit['unit_start_time'],
                'end_time' => $unit['unit_end_time'],
                'enabled' => $unit['unit_enabled'],
                'date_created' => $unit['unit_date_created'],
                'created_by' => $unit['unit_created_by'],
                'date_modified' => $unit['unit_date_modified'],
                'modified_by' => $unit['unit_modified_by'],
                'note' => $unit['unit_note'],
            );
        }
        
        private static function format_ac(array $units = null): array
        {
            $data["suggestions"] = [];
            foreach ($units AS $k => $unit) {
                $l = (object)$unit;
                $value = utf8_encode($l->unit_name);
                array_push($data["suggestions"], [
                    "value" => utf8_encode($value),
                    "data" => self::format($unit),
                ]);
            }
            
            return $data;
        }
        
    }
