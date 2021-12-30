<?php
    
    namespace Framework\App\Models;
    
    use Exception;
    use Framework\Core\Model;
    use Framework\Logger\Log;
    
    /**
     * Short CalendarModel Description
     * Long CalendarModel Description
     *
     * @package            Framework\App
     * @subpackage         Models
     */
    class CalendarModel extends Model
    {
        protected static $dbTable = "calendar";
        
        protected static $dbFields = Array();
        
        //
        public static function get(int $id = null): array
        {
            $calendar = [
                "20210101" => array(
                    "day" => 5,
                    "name" => "Friday",
                    "abr" => "Fri",
                    1 => array(
                        "season" => array(
                            "id" => 1,
                            "name" => "Test Season",
                        ),
                        "units" => array(),
                    ),
                
                ),
            ];
            
            try {
                $calendar = Model::$db->rawQuery("
                    SELECT
                        CALENDAR.date AS 'calendar_date',
                        CALENDAR.product_id AS 'calendar_product_id',
                        CALENDAR.season_id AS 'calendar_season_id',
                        CALENDAR.enabled AS 'calendar_enabled',
                        CALENDAR.date_created AS 'calendar_date_created',
                        CALENDAR.created_by AS 'calendar_created_by',
                        CALENDAR.date_modified AS 'calendar_date_modified',
                        CALENDAR.modified_by AS 'calendar_modified_by',
                        CALENDAR.note AS 'calendar_note',
                        SEASON.id AS 'season_id',
                        SEASON.color_scheme_id AS 'season_color_scheme_id',
                        SEASON.name AS 'season_name',
                        SEASON.view_product_index AS 'season_view_product_index',
                        SEASON.view_product_index_filter AS 'season_view_product_index_filter',
                        SEASON.view_product_index_search AS 'season_view_product_index_search',
                        SEASON.view_product_edit AS 'season_view_product_edit',
                        SEASON.view_product_package_edit AS 'season_view_product_package_edit',
                        SEASON.view_product_package_index AS 'season_view_product_package_index',
                        SEASON.enabled AS 'season_enabled',
                        SEASON.date_created AS 'season_date_created',
                        SEASON.created_by AS 'season_created_by',
                        SEASON.date_modified AS 'season_date_modified',
                        SEASON.modified_by AS 'season_modified_by',
                        SEASON.note AS 'season_note',
                        SEASON.category_id AS 'season_category_id'
                FROM 	calendar CALENDAR
                JOIN 	season SEASON ON SEASON.id = CALENDAR.season_id
                "
                );
            } catch (Exception $e) {
                Log::$debug_log->error($e);
            }
            
            return $calendar;
        }
        
        public static function getByProductId(int $product_id = null): array
        {
            
            if (is_null($product_id)) {
                return [];
            }
            
            $sql = "
                SELECT
                        PRODUCT_CALENDAR.date AS 'product_calendar_date',
                        SEASON.id AS 'season_id',
                        SEASON.name AS 'season_name',
                        COLOR_SCHEME.id AS 'color_scheme_id',
                        COLOR_SCHEME.name AS 'color_scheme_name',
                        COLOR_SCHEME.background_color AS 'color_scheme_background_color',
                        COLOR_SCHEME.border_color AS 'color_scheme_border_color',
                        COLOR_SCHEME.text_color AS 'color_scheme_text_color',
                        CATEGORY.id AS 'category_id',
                        CATEGORY.pricing_strategy_types_id AS 'category_pricing_strategy_types_id',
                        CATEGORY.attribute_id AS 'category_attribute_id',
                        CATEGORY.name AS 'category_name',
                        CATEGORY.icon AS 'category_icon',
                        CATEGORY.all_day AS 'category_all_day',
                        CATEGORY.overlap AS 'category_overlap',
                        CATEGORY.editable AS 'category_editable',
                        CATEGORY.duration_editable AS 'category_duration_editable',
                        CATEGORY.start_editable AS 'category_start_editable',
                        CATEGORY.display AS 'category_display',
                        CATEGORY.background_color AS 'category_background_color',
                        CATEGORY.text_color AS 'category_text_color',
                        CATEGORY.border_color AS 'category_border_color'
                FROM 	product_calendar PRODUCT_CALENDAR
                JOIN 	season SEASON ON SEASON.id = PRODUCT_CALENDAR.season_id
                JOIN 	color_scheme COLOR_SCHEME ON COLOR_SCHEME.id = SEASON.color_scheme_id
                JOIN 	category CATEGORY ON CATEGORY.id = SEASON.category_id
                WHERE	PRODUCT_CALENDAR.product_id = $product_id
            ";
            try {
                return Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                return [];
            }
            
        }
        
    }
