<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short Season Description
	 * Long Season Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class SeasonModel extends Model
	{
		
		protected static $dbTable = "season";
		protected static $dbFields = Array();
		protected static $seasonTypesSQL = "
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
	                COLOR_SCHEME.note AS 'color_scheme_note'
	        FROM 	season SEASON
	        JOIN 	color_scheme COLOR_SCHEME ON COLOR_SCHEME.id = SEASON.color_scheme_id";
		
		protected static $selectQuery = "
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
	                COLOR_SCHEME.note AS 'color_scheme_note'
	        FROM 	season SEASON
	        JOIN 	color_scheme COLOR_SCHEME ON COLOR_SCHEME.id = SEASON.color_scheme_id";
		
		public static function get(int $id = null): array
		{
			
			try {
				if (!is_null($id)) {
					Model::$db->where("id", $id);
				}
				
				self::$db->where("enabled", 1);
				
				return self::$db->get(self::$dbTable);
			} catch (Exception $e) {
				return [];
			}
		}
		
		public static function getTypes(int $id = null, int $category_id = null): array
		{
			$where = [];
			$whereLine = "";
			if (!is_null($id)) {
				$where[] = "
                SEASON.id = $id";
			}
			
			if (!is_null($category_id)) {
				$where[] = "
                SEASON.category_id = $category_id";
			}
			
			if (count($where) > 0) {
				$whereLine = implode("  AND ", $where);
				$whereLine = "
                WHERE   $whereLine";
			}
			$sql = self::$seasonTypesSQL . $whereLine;
			//Log::$debug_log->trace($sql);
			
			try {
				
				return self::$db->rawQuery($sql);
			} catch (Exception $e) {
				return [];
			}
		}
		
		public static function getOne(int $id = null): array
		{
			try {
				if (!is_null($id)) {
					Model::$db->where("id", $id);
				}
				
				self::$db->where("enabled", 1);
				
				return self::$db->getOne(self::$dbTable);
			} catch (Exception $e) {
				return [];
			}
		}
		
		public static function update(array $season = []): array
		{
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			$season_id = Model::setInt((isset($season["season_id"])) ? $season["season_id"] : null);
			$product_id = Model::setInt((isset($season["product_id"])) ? $season["product_id"] : null);
			$id = Model::setInt((isset($season["id"])) ? $season["id"] : null);
			$enabled = Model::setBool((isset($season["enabled"])) ? $season["enabled"] : 1);
			
			$disabled_dow = Model::setString((isset($season["disabled_dow"])) ? $season["disabled_dow"] : null);
			
			$seasons_text = Model::setString((isset($season["seasons_text"])) ? $season["seasons_text"] : null);
			$seasons_background = Model::setString((isset($season["seasons_background"])) ? $season["seasons_background"] : null);
			$seasons_border = Model::setString((isset($season["seasons_border"])) ? $season["seasons_border"] : null);
			
			$note = Model::setLongText((isset($season["note"])) ? $season["note"] : null);
			
			$sql = "
            INSERT INTO product_season (
                product_id, season_id, disabled_dow, seasons_border,
                seasons_text, seasons_background, id, enabled,
                date_created, created_by, date_modified, modified_by,
                note
            ) VALUES (
                $product_id, $season_id, $disabled_dow, $seasons_border,
                $seasons_text, $seasons_background, $id, $enabled,
                CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP, $modified_by,
                $note
            )
            ON DUPLICATE KEY UPDATE
                disabled_dow = VALUES(disabled_dow),
                note = VALUES(note),
                enabled = VALUES(enabled),
                modified_by = VALUES(modified_by),
                date_modified = VALUES(date_modified)
            ";
			try {
				Model::$db->rawQuery($sql);
				
				return self::getByProductIdSeasonId($product_id, $season_id);
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function deleteProductSeason(array $params = []): array
		{
			$season_id = Model::setInt((isset($params["season_id"])) ? $params["season_id"] : null);
			$product_id = Model::setInt((isset($params["product_id"])) ? $params["product_id"] : null);
			
			if (!is_null($season_id) && !is_null($season_id)) {
				$sql = "
		            DELETE FROM product_season
					WHERE 		product_id = $product_id
						AND		season_id = $season_id;";
				try {
					Model::$db->rawQuery($sql);
					
					return [];
				} catch (Exception $e) {
					Log::$debug_log->error($e);
					
					return [];
				}
			} else {
				Log::$debug_log->error("Missing Fields");
				Log::$debug_log->trace("Season ID $season_id");
				Log::$debug_log->trace("Product ID $product_id");
				
				return [];
			}
		}
		
		public static function getByProductId(int $product_id = null): array
		{
			if (is_null($product_id)) {
				return [];
			}
			$sql = "
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
                        PRODUCT_SEASON.product_id AS 'product_season_product_id',
                        PRODUCT_SEASON.season_id AS 'product_season_season_id',
                        COALESCE(PRODUCT_SEASON.disabled_dow, '') AS 'product_season_disabled_dow',
                        PRODUCT_SEASON.enabled AS 'product_season_enabled',
                        PRODUCT_SEASON.date_created AS 'product_season_date_created',
                        PRODUCT_SEASON.created_by AS 'product_season_created_by',
                        PRODUCT_SEASON.date_modified AS 'product_season_date_modified',
                        PRODUCT_SEASON.modified_by AS 'product_season_modified_by',
                        PRODUCT_SEASON.note AS 'product_season_note',
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
                FROM 	season SEASON
                JOIN 	product_season PRODUCT_SEASON ON PRODUCT_SEASON.season_id = SEASON.id
                JOIN 	color_scheme COLOR_SCHEME ON COLOR_SCHEME.id = SEASON.color_scheme_id
                WHERE   PRODUCT_SEASON.product_id = $product_id
            ";
			try {
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function getByProductIdSeasonId(int $product_id = null, int $season_id = null): array
		{
			if (is_null($product_id)) {
				return [];
			}
			if (is_null($season_id)) {
				return [];
			}
			$sql = "
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
                        PRODUCT_SEASON.product_id AS 'product_season_product_id',
                        PRODUCT_SEASON.season_id AS 'product_season_season_id',
                        COALESCE(PRODUCT_SEASON.disabled_dow, '') AS 'product_season_disabled_dow',
                        PRODUCT_SEASON.seasons_border AS 'product_season_seasons_border',
                        PRODUCT_SEASON.seasons_text AS 'product_season_seasons_text',
                        PRODUCT_SEASON.seasons_background AS 'product_season_seasons_background',
                        PRODUCT_SEASON.id AS 'product_season_id',
                        PRODUCT_SEASON.enabled AS 'product_season_enabled',
                        PRODUCT_SEASON.date_created AS 'product_season_date_created',
                        PRODUCT_SEASON.created_by AS 'product_season_created_by',
                        PRODUCT_SEASON.date_modified AS 'product_season_date_modified',
                        PRODUCT_SEASON.modified_by AS 'product_season_modified_by',
                        PRODUCT_SEASON.note AS 'product_season_note',
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
                FROM 	season SEASON
                JOIN 	product_season PRODUCT_SEASON ON PRODUCT_SEASON.season_id = SEASON.id
                JOIN 	color_scheme COLOR_SCHEME ON COLOR_SCHEME.id = SEASON.color_scheme_id
                WHERE   PRODUCT_SEASON.product_id = $product_id
                    AND PRODUCT_SEASON.season_id = $season_id
            ";
			try {
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function season_ac(string $st = "", int $category_id = null): array
		{
			if (is_null($category_id)) {
				return [];
			}
			
			try {
				$searchTerm = addslashes($st);
				
				$sql = self::$selectQuery . "
                    AND			SEASON.name LIKE '%$searchTerm%'
                    AND         SEASON.category_id = $category_id
                    ORDER BY    LENGTH(SEASON.name), CAST(SEASON.name AS UNSIGNED), SEASON.name ASC
                    LIMIT 20;";
				
				//Log::$debug_log->trace($sql);
				
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
	}
