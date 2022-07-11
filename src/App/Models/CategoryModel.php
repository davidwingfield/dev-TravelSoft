<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short Category Description
	 * Long Category Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class CategoryModel extends Model
	{
		
		protected static $dbTable = "category";
		protected static $dbFields = Array();
		protected static $getTypesSQL = "
		SELECT
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
                        SEASON.category_id AS 'season_category_id',
                        COLOR_SCHEME.id AS 'color_scheme_id',
                        COLOR_SCHEME.name AS 'color_scheme_name',
                        COLOR_SCHEME.background_color AS 'color_scheme_background_color',
                        COLOR_SCHEME.border_color AS 'color_scheme_border_color',
                        COLOR_SCHEME.text_color AS 'color_scheme_text_color',
                        COLOR_SCHEME.sort_order AS 'color_scheme_sort_order',
                        COLOR_SCHEME.enabled AS 'color_scheme_enabled',
                        COLOR_SCHEME.date_created AS 'color_scheme_date_created',
                        COLOR_SCHEME.created_by AS 'color_scheme_created_by',
                        COLOR_SCHEME.date_modified AS 'color_scheme_date_modified',
                        COLOR_SCHEME.modified_by AS 'color_scheme_modified_by',
                        COLOR_SCHEME.note AS 'color_scheme_note',
                        CATEGORY.id AS 'category_id',
                        CATEGORY.pricing_strategy_types_id AS 'category_pricing_strategy_types_id',
                        CATEGORY.attribute_id AS 'category_attribute_id',
                        CATEGORY.name AS 'category_name',
                        CATEGORY.icon AS 'category_icon',
                        CATEGORY.view_product_index AS 'category_view_product_index',
                        CATEGORY.view_product_index_filter AS 'category_view_product_index_filter',
                        CATEGORY.view_product_index_search AS 'category_view_product_index_search',
                        CATEGORY.view_product_edit AS 'category_view_product_edit',
                        CATEGORY.view_product_package_edit AS 'category_view_product_package_edit',
                        CATEGORY.view_product_package_index AS 'category_view_product_package_index',
                        CATEGORY.all_day AS 'category_all_day',
                        CATEGORY.overlap AS 'category_overlap',
                        CATEGORY.editable AS 'category_editable',
                        CATEGORY.duration_editable AS 'category_duration_editable',
                        CATEGORY.start_editable AS 'category_start_editable',
                        CATEGORY.display AS 'category_display',
                        CATEGORY.background_color AS 'category_background_color',
                        CATEGORY.text_color AS 'category_text_color',
                        CATEGORY.border_color AS 'category_border_color',
                        CATEGORY.sort_order AS 'category_sort_order',
                        CATEGORY.enabled AS 'category_enabled',
                        CATEGORY.date_created AS 'category_date_created',
                        CATEGORY.created_by AS 'category_created_by',
                        CATEGORY.date_modified AS 'category_date_modified',
                        CATEGORY.modified_by AS 'category_modified_by',
                        CATEGORY.note AS 'category_note',
                        COLOR_SCHEME.id AS 'color_scheme_id',
                        COLOR_SCHEME.name AS 'color_scheme_name',
                        COLOR_SCHEME.background_color AS 'color_scheme_background_color',
                        COLOR_SCHEME.border_color AS 'color_scheme_border_color',
                        COLOR_SCHEME.text_color AS 'color_scheme_text_color',
                        COLOR_SCHEME.sort_order AS 'color_scheme_sort_order',
                        COLOR_SCHEME.enabled AS 'color_scheme_enabled',
                        COLOR_SCHEME.date_created AS 'color_scheme_date_created',
                        COLOR_SCHEME.created_by AS 'color_scheme_created_by',
                        COLOR_SCHEME.date_modified AS 'color_scheme_date_modified',
                        COLOR_SCHEME.modified_by AS 'color_scheme_modified_by',
                        COLOR_SCHEME.note AS 'color_scheme_note'
        FROM 			category CATEGORY
        LEFT JOIN 			season SEASON ON CATEGORY.id = SEASON.category_id
        LEFT JOIN 			color_scheme COLOR_SCHEME ON COLOR_SCHEME.id = SEASON.color_scheme_id
		";
		
		public static function get(int $id = null): array
		{
			
			try {
				if (!is_null($id)) {
					self::$db->where("id", $id);
				}
				
				self::$db->where("enabled", 1);
				
				return self::$db->get(self::$dbTable);
			} catch (Exception $e) {
				return [];
			}
		}
		
		public static function getAllTypes(array $params = []): array
		{
			$where = [];
			$whereLine = "";
			$category_id = null;
			$color_scheme_id = null;
			$season_id = null;
			extract($params);
			if (isset($params["category_id"])) {
				$where[] = "CATEGORY.id = $category_id";
			}
			
			if (isset($params["season_id"])) {
				$where[] = "SEASON.id = $season_id";
			}
			
			if (isset($params["color_scheme_id"])) {
				$where[] = "COLOR_SCHEME.id = $color_scheme_id";
			}
			
			if (count($where) > 0) {
				$whereLine = "WHERE \t\t\t" . implode(" AND \n", $where);
			}

//            Log::$debug_log->trace($where);
			try {
				
				return Model::$db->rawQuery(self::$getTypesSQL);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
			
		}
		
		public static function getOne(int $id = null): array
		{
			try {
				if (!is_null($id)) {
					self::$db->where("id", $id);
				}
				self::$db->orderBy("sort_order", "ASC");
				self::$db->where("enabled", 1);
				
				return self::$db->getOne(self::$dbTable);
			} catch (Exception $e) {
				return [];
			}
		}
		
		public static function update(array $params = []): array
		{
			$id = 1;
			
			return self::get($id);
		}
		
	}
