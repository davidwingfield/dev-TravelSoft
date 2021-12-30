<?php
    
    namespace Framework\App\Controllers;
    
    use Framework\App\Models\CalendarModel;
    use Framework\Core\Controller;
    use Framework\Core\View;
    use Framework\Logger\Log;
    
    /**
     * Short Calendar Description
     * Long Calendar Description
     *
     * @package            Framework\App
     * @subpackage         Controllers
     */
    class Calendar extends Controller
    {
        
        public function __construct()
        {
            parent::__construct();
        }
        
        public static function getCalendarByProductId(int $product_id = null): array
        {
            $seasons = [];
            $results = CalendarModel::getByProductId((int)$product_id);
            Log::$debug_log->trace($results);
            foreach ($results AS $k => $date) {
                $seasons[] = self::format($date);
            }
            
            return $seasons;
        }
        
        public static function serveGet(array $params = []): void
        {
            
            $calendar = [];
            $product_id = (isset($_GET["product_id"])) ? (int)$_GET["product_id"] : null;
            $season_results = CalendarModel::getByProductId($product_id);
            foreach ($season_results AS $day) {
                $calendar[] = self::formatSeasonResults($day);
            }
            
            /**
             * render calendar json
             */
            View::render_json($calendar);
            exit(0);
        }
        
        private static function formatSeasonResults(array $day = null): array
        {
            if (is_null($day)) {
                return [];
            }
            $start = $day["product_calendar_date"];
            $end = $day["product_calendar_date"];
            $id = (int)$day["season_id"];
            $allDay = $day["category_all_day"] === 1;
            $title = $day["season_name"];
            $textColor = $day["color_scheme_text_color"];
            $borderColor = $day["color_scheme_border_color"];
            $backgroundColor = $day["color_scheme_background_color"];
            $editable = $day["category_editable"] === 1;
            $startEditable = $day["category_start_editable"] === 1;
            $durationEditable = $day["category_duration_editable"] === 1;
            $rendering = "background";
            $overlap = $day["category_overlap"] === 1;
            
            return array(
                "id" => $id,
                "title" => $title,
                "allDay" => $allDay,
                "start" => $start,
                "end" => $end,
                "editable" => $editable,
                "startEditable" => $startEditable,
                "durationEditable" => $durationEditable,
                "rendering" => $rendering,
                "overlap" => $overlap,
                "backgroundColor" => $backgroundColor,
                "borderColor" => $borderColor,
                "textColor" => $textColor,
            );
        }
        
    }
