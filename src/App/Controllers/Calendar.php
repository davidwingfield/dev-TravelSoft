<?php
    
    namespace Framework\App\Controllers;
    
    use Framework\App\Models\CalendarModel;
    use Framework\Core\Controller;
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
        
        public static function serveGet(array $params = []): array
        {
            $seasons = [];
            $results = CalendarModel::get();
            Log::$debug_log->trace($results);
            foreach ($results AS $k => $date) {
                $seasons[] = self::format($date);
            }
            
            return $seasons;
        }
        
        private static function format(array $date = null): array
        {
            if (is_null($date)) {
                return [];
            }
            
            return array();
        }
        
    }
