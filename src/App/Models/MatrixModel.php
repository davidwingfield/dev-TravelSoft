<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\App\Controllers\Pricing;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short MatrixModel Description
	 * Long MatrixModel Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class MatrixModel extends Model
	{
		
		protected static $dbTable = "matrix";
		protected static $dbFields = Array();
		protected static $selectQuery = "
            SELECT
					MATRIX.id AS 'matrix_id',
                    MATRIX.product_id AS 'matrix_product_id',
                    MATRIX.season_id AS 'matrix_season_id',
                    MATRIX.unit_id AS 'matrix_unit_id',
                   	MATRIX.code AS 'matrix_code',
                   	MATRIX.name AS 'matrix_name',
                    MATRIX.cost AS 'matrix_cost',
                    MATRIX.margin AS 'matrix_margin',
                    MATRIX.price AS 'matrix_price',
                    MATRIX.has_pricing AS 'matrix_has_pricing',
                    MATRIX.been_saved AS 'matrix_been_saved',
                    MATRIX.enabled AS 'matrix_enabled',
                    MATRIX.date_created AS 'matrix_date_created',
                    MATRIX.created_by AS 'matrix_created_by',
                    MATRIX.date_modified AS 'matrix_date_modified',
                    MATRIX.modified_by AS 'matrix_modified_by',
                    MATRIX.note AS 'matrix_note'
			FROM 	matrix MATRIX
   
			WHERE 	MATRIX.enabled = 1
            ";
		
		public static function get(int $matrix_id = null): array
		{
			$where = "";
			try {
				if (!is_null($matrix_id)) {
					$where = "
                        AND       MATRIX.id = $matrix_id";
				}
				
				$sql = self::$selectQuery . $where;
				
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function fetchByProductId(int $product_id = null): array
		{
			$where = "";
			try {
				if (!is_null($product_id)) {
					$where = "
                        AND       MATRIX.product_id = $product_id";
				}
				
				$sql = self::$selectQuery . $where;
				
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function fetchByMatrixId(int $matrix_id = null): array
		{
			$where = "";
			try {
				if (!is_null($matrix_id)) {
					$where = "
                        AND       MATRIX.id = $matrix_id
                    ";
				}
				
				$sql = self::$selectQuery . $where;
				
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function updateRecord(array $matrix = null): array
		{
			if (is_null($matrix)) {
				Log::$debug_log->error("Missing Matrix");
				
				return [];
			}
			
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			$id = Model::setInt((isset($matrix["id"])) ? $matrix["id"] : null);
			$unit_id = Model::setInt((isset($matrix["unit_id"])) ? $matrix["unit_id"] : null);
			$product_id = Model::setInt((isset($matrix["product_id"])) ? $matrix["product_id"] : null);
			$season_id = Model::setInt((isset($matrix["season_id"])) ? $matrix["season_id"] : null);
			
			$cost = Model::setInt((isset($matrix["cost"])) ? $matrix["cost"] : null);
			$margin = Model::setInt((isset($matrix["margin"])) ? $matrix["margin"] : null);
			
			$name = Model::setString((isset($matrix["name"])) ? $matrix["name"] : null);
			$code = Model::setString((isset($matrix["code"])) ? $matrix["code"] : null);
			
			$has_pricing = Model::setBool((isset($matrix["has_pricing"])) ? $matrix["enabled"] : 1);
			$been_saved = Model::setBool((isset($matrix["been_saved"])) ? $matrix["enabled"] : 1);
			$enabled = Model::setBool((isset($matrix["enabled"])) ? $matrix["enabled"] : 1);
			
			$note = Model::setLongText((isset($matrix["note"])) ? $matrix["note"] : null);
			
			if (!is_null($cost) && !is_null($margin) && $margin > 0) {
				$price = (($margin / 100) * $cost) + $cost;
			} else {
				$price = 0;
			}
			
			$price = (int)$price;
			$cost = (int)$cost;
			$margin = (int)$margin;
			
			$sql = "
				INSERT INTO matrix (
					id, code, product_id, season_id, unit_id,
					name, cost, margin, price, has_pricing,
					been_saved, enabled, date_created, created_by, date_modified,
					modified_by, note
				) VALUES (
					$id, $code, $product_id, $season_id, $unit_id,
					$name, $cost, $margin, $price, $has_pricing,
					$been_saved, $enabled, CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP,
					$modified_by, $note
				)
				ON DUPLICATE KEY UPDATE
					cost = VALUES(cost),
				    margin = VALUES(margin),
				    price = VALUES(price),
				    has_pricing = VALUES(has_pricing),
					been_saved = VALUES(been_saved),
					note = VALUES(note),
					enabled = VALUES(enabled),
					modified_by = VALUES(modified_by),
					date_modified = VALUES(date_modified);
				";
			
			try {
				Model::$db->rawQuery($sql);
				$matrix_id = Model::$db->getInsertId();
				Log::$debug_log->trace(["matrix_id" => $matrix_id]);
				//if (!is_null($id)) {
				//	$matrix_id = $id;
				//}
				
				$pricings = (isset($matrix["pricings"])) ? $matrix["pricings"] : [];
				
				foreach ($pricings AS $k => $pricing) {
					$params = $pricing;
					$params["matrix_id"] = $matrix_id;
					Log::$debug_log->trace($params);
					Pricing::update($params);
				}
				
				return self::fetchByMatrixId((int)$matrix_id);
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
	}
