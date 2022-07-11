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
				Log::$debug_log->error($e->getMessage());
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
		
		public static function getInventoryByProductId(int $product_id = null): array
		{
			
			if (is_null($product_id)) {
				return [];
			}
			
			$sql = "
                SELECT
						INVENTORY.date AS 'inventory_date',
						INVENTORY.product_id AS 'inventory_product_id',
						INVENTORY.unit_id AS 'inventory_unit_id',
						INVENTORY.profile_id AS 'inventory_profile_id',
						INVENTORY.description AS 'inventory_description',
						INVENTORY.quantity_used AS 'inventory_quantity_used',
						INVENTORY.quantity_released AS 'inventory_quantity_released',
						INVENTORY.enabled AS 'inventory_enabled',
						INVENTORY.date_created AS 'inventory_date_created',
						INVENTORY.created_by AS 'inventory_created_by',
						INVENTORY.date_modified AS 'inventory_date_modified',
						INVENTORY.modified_by AS 'inventory_modified_by',
						INVENTORY.note AS 'inventory_note',
						UNIT.id AS 'unit_id',
						UNIT.category_id AS 'unit_category_id',
						UNIT.min_pax AS 'unit_min_pax',
						UNIT.max_pax AS 'unit_max_pax',
						UNIT.min_nights AS 'unit_min_nights',
						UNIT.max_nights AS 'unit_max_nights',
						UNIT.api_id AS 'unit_api_id',
						UNIT.name AS 'unit_name',
						UNIT.room_code AS 'unit_room_code',
						UNIT.blurb AS 'unit_blurb',
						UNIT.cover_image AS 'unit_cover_image',
						UNIT.meeting_point AS 'unit_meeting_point',
						UNIT.time_notes AS 'unit_time_notes',
						UNIT.start_time AS 'unit_start_time',
						UNIT.end_time AS 'unit_end_time',
						UNIT.description_short AS 'unit_description_short',
						UNIT.description_long AS 'unit_description_long',
						UNIT.enabled AS 'unit_enabled',
						UNIT.date_created AS 'unit_date_created',
						UNIT.created_by AS 'unit_created_by',
						UNIT.date_modified AS 'unit_date_modified',
						UNIT.modified_by AS 'unit_modified_by',
						UNIT.note AS 'unit_note',
						PROFILE.id AS 'profile_id',
						PROFILE.allot_by_id AS 'profile_allot_by_id',
						PROFILE.sales_types_id AS 'profile_sales_types_id',
						PROFILE.product_id AS 'profile_product_id',
						PROFILE.name AS 'profile_name',
						PROFILE.quantity AS 'profile_quantity',
						PROFILE.expires AS 'profile_expires',
						PROFILE.days_out AS 'profile_days_out',
						PROFILE.transfer_sales_types_id AS 'profile_transfer_sales_types_id',
						PROFILE.release_amt AS 'profile_release_amt',
						PROFILE.min_length_days AS 'profile_min_length_days',
						PROFILE.checkin_dow AS 'profile_checkin_dow',
						PROFILE.checkout_dow AS 'profile_checkout_dow',
						PROFILE.departure_dow AS 'profile_departure_dow',
						PROFILE.return_dow AS 'profile_return_dow',
						PROFILE.inc_days_dow AS 'profile_inc_days_dow',
						PROFILE.min_duration AS 'profile_min_duration',
						PROFILE.max_duration AS 'profile_max_duration',
						PROFILE.equal_duration AS 'profile_equal_duration',
						PROFILE.advanced_booking_min AS 'profile_advanced_booking_min',
						PROFILE.advanced_booking_max AS 'profile_advanced_booking_max',
						PROFILE.advanced_booking_date AS 'profile_advanced_booking_date',
						PROFILE.weekday_dow AS 'profile_weekday_dow',
						PROFILE.enabled AS 'profile_enabled',
						PROFILE.date_created AS 'profile_date_created',
						PROFILE.created_by AS 'profile_created_by',
						PROFILE.date_modified AS 'profile_date_modified',
						PROFILE.modified_by AS 'profile_modified_by',
						PROFILE.note AS 'profile_note'
				FROM 	inventory INVENTORY
                JOIN 	profile PROFILE ON PROFILE.id = INVENTORY.profile_id
                JOIN 	unit UNIT ON UNIT.id = INVENTORY.unit_id
                WHERE	INVENTORY.product_id = $product_id
				
            ";
			try {
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				return [];
			}
			
		}
		
	}
