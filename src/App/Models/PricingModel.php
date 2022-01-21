<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short PricingModel Description
	 * Long PricingModel Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class PricingModel extends Model
	{
		
		protected static $dbTable = "pricing";
		protected static $dbFields = Array();
		protected static $selectQuery = "
                SELECT
						PRICING.id AS 'pricing_id',
						PRICING.matrix_id AS 'pricing_matrix_id',
						COALESCE(PRICING.variant_id, 36) AS 'pricing_variant_id',
						IF(PRICING.variant_id IS NULL, CONCAT(VARIANT.name, ' ', COALESCE(PRICING.count, '')), CONCAT(VARIANT.name, ' ', COALESCE(PRICING.count, ''))) AS 'pricing_name',
						COALESCE(PRICING.mon, 0) AS 'pricing_mon',
						COALESCE(PRICING.tue, 0) AS 'pricing_tue',
						COALESCE(PRICING.wed, 0) AS 'pricing_wed',
						COALESCE(PRICING.thu, 0) AS 'pricing_thu',
						COALESCE(PRICING.fri, 0) AS 'pricing_fri',
						COALESCE(PRICING.sat, 0) AS 'pricing_sat',
						COALESCE(PRICING.sun, 0) AS 'pricing_sun',
                       	PRICING.code AS 'pricing_code',
						COALESCE(PRICING.monMargin, 0) AS 'pricing_monMargin',
						COALESCE(PRICING.tueMargin, 0) AS 'pricing_tueMargin',
						COALESCE(PRICING.wedMargin, 0) AS 'pricing_wedMargin',
						COALESCE(PRICING.thuMargin, 0) AS 'pricing_thuMargin',
						COALESCE(PRICING.friMargin, 0) AS 'pricing_friMargin',
						COALESCE(PRICING.satMargin, 0) AS 'pricing_satMargin',
						COALESCE(PRICING.sunMargin, 0) AS 'pricing_sunMargin',
						COALESCE(PRICING.count, 1) AS 'pricing_count',
                       	PRICING.enabled AS 'pricing_enabled',
						PRICING.date_created AS 'pricing_date_created',
						PRICING.created_by AS 'pricing_created_by',
						PRICING.date_modified AS 'pricing_date_modified',
						PRICING.modified_by AS 'pricing_modified_by',
						COALESCE(PRICING.note, 'pulled from database') AS 'pricing_note',
                        MATRIX.id AS 'matrix_id',
                       	MATRIX.name AS 'matrix_name',
                       	MATRIX.code AS 'matrix_code',
                        MATRIX.product_id AS 'matrix_product_id',
                        MATRIX.season_id AS 'matrix_season_id',
                        MATRIX.unit_id AS 'matrix_unit_id',
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
				FROM 	pricing PRICING
				JOIN 	variant VARIANT ON IF(PRICING.variant_id IS NULL, VARIANT.id = 36, VARIANT.id = PRICING.variant_id)
                JOIN 	matrix MATRIX ON MATRIX.id = PRICING.matrix_id
                JOIN 	product PRODUCT ON MATRIX.product_id = PRODUCT.id
            ";
		
		public static function fetchByMatrixId(int $matrix_id = null): array
		{
			$where = "";
			if (!is_null($matrix_id)) {
				$where = "
					WHERE 	PRICING.matrix_id = $matrix_id
				";
			}
			try {
				
				$sql = self::$selectQuery . $where;
				
				return self::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->trace($e);
				
				return [];
			}
		}
		
		public static function fetchByPricingId(int $pricing_id = null): array
		{
			try {
				$sql = "
					SELECT		PRICING.id AS 'pricing_id',
					       		IF(PRICING.variant_id IS NULL, CONCAT(VARIANT.name, ' ', COALESCE(PRICING.count, '')), CONCAT(VARIANT.name, ' ', COALESCE(PRICING.count, ''))) AS 'pricing_name',
								PRICING.matrix_id AS 'pricing_matrix_id',
								PRICING.variant_id AS 'pricing_variant_id',
								PRICING.code AS 'pricing_code',
								PRICING.count AS 'pricing_count',
								PRICING.mon AS 'pricing_mon',
								PRICING.tue AS 'pricing_tue',
								PRICING.wed AS 'pricing_wed',
								PRICING.thu AS 'pricing_thu',
								PRICING.fri AS 'pricing_fri',
								PRICING.sat AS 'pricing_sat',
								PRICING.sun AS 'pricing_sun',
								PRICING.monMargin AS 'pricing_monMargin',
								PRICING.tueMargin AS 'pricing_tueMargin',
								PRICING.wedMargin AS 'pricing_wedMargin',
								PRICING.thuMargin AS 'pricing_thuMargin',
								PRICING.friMargin AS 'pricing_friMargin',
								PRICING.satMargin AS 'pricing_satMargin',
								PRICING.sunMargin AS 'pricing_sunMargin',
								PRICING.enabled AS 'pricing_enabled',
								PRICING.date_created AS 'pricing_date_created',
								PRICING.created_by AS 'pricing_created_by',
								PRICING.date_modified AS 'pricing_date_modified',
								PRICING.modified_by AS 'pricing_modified_by',
								PRICING.note AS 'pricing_note'
					FROM 		pricing PRICING
					JOIN 		variant VARIANT ON IF(PRICING.variant_id IS NULL, VARIANT.id = 36, VARIANT.id = PRICING.variant_id)
					WHERE		PRICING.id = $pricing_id;
				";
				
				return self::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->trace($e);
				
				return [];
			}
		}
		
		public static function fetchByProductId(int $product_id = null): array
		{
			$where = "";
			if (!is_null($product_id)) {
				$where = "
					WHERE PRODUCT.id = $product_id
				";
			}
			try {
				
				return self::$db->rawQuery(self::$selectQuery . $where);
			} catch (Exception $e) {
				Log::$debug_log->trace($e);
				
				return [];
			}
		}
		
		private static function buildUpdateQuery(array $pricing = null): ?string
		{
			if (is_null($pricing)) {
				Log::$debug_log->error("Missing Pricing");
				
				return null;
			}
			
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			$enabled = Model::setBool((isset($pricing["enabled"])) ? $pricing["enabled"] : 1);
			$note = Model::setLongText((isset($pricing["note"])) ? $pricing["note"] : null);
			$id = Model::setInt((isset($pricing["id"])) ? $pricing["id"] : null);
			$variant_id = Model::setInt((isset($pricing["variant_id"])) ? $pricing["variant_id"] : null);
			$matrix_id = Model::setInt((isset($pricing["matrix_id"])) ? $pricing["matrix_id"] : null);
			$sun = Model::setInt((isset($pricing["sun"])) ? $pricing["sun"] : null);
			$mon = Model::setInt((isset($pricing["mon"])) ? $pricing["mon"] : null);
			$tue = Model::setInt((isset($pricing["tue"])) ? $pricing["tue"] : null);
			$wed = Model::setInt((isset($pricing["wed"])) ? $pricing["wed"] : null);
			$thu = Model::setInt((isset($pricing["thu"])) ? $pricing["thu"] : null);
			$fri = Model::setInt((isset($pricing["fri"])) ? $pricing["fri"] : null);
			$sat = Model::setInt((isset($pricing["sat"])) ? $pricing["sat"] : null);
			$sunMargin = Model::setInt((isset($pricing["sunMargin"])) ? $pricing["sunMargin"] : null);
			$monMargin = Model::setInt((isset($pricing["monMargin"])) ? $pricing["monMargin"] : null);
			$tueMargin = Model::setInt((isset($pricing["tueMargin"])) ? $pricing["tueMargin"] : null);
			$wedMargin = Model::setInt((isset($pricing["wedMargin"])) ? $pricing["wedMargin"] : null);
			$thuMargin = Model::setInt((isset($pricing["thuMargin"])) ? $pricing["thuMargin"] : null);
			$friMargin = Model::setInt((isset($pricing["friMargin"])) ? $pricing["friMargin"] : null);
			$satMargin = Model::setInt((isset($pricing["satMargin"])) ? $pricing["satMargin"] : null);
			$count = Model::setInt((isset($pricing["count"])) ? $pricing["count"] : null);
			$code = Model::setString((isset($pricing["code"])) ? $pricing["code"] : null);
			
			$sql = "
				INSERT INTO pricing (
					id, matrix_id, variant_id, code, count,
					mon, tue, wed, thu, fri,
					sat, sun, monMargin, tueMargin, wedMargin,
					thuMargin, friMargin, satMargin, sunMargin, enabled,
					date_created, created_by, date_modified, modified_by, note
				) VALUES (
					$id, $matrix_id, $variant_id, $code, $count,
					$mon, $tue, $wed, $thu, $fri,
					$sat, $sun, $monMargin, $tueMargin, $wedMargin,
					$thuMargin, $friMargin, $satMargin, $sunMargin, $enabled,
					CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP, $modified_by, $note
				)
				ON DUPLICATE KEY UPDATE
					mon = VALUES(mon),
				    tue = VALUES(tue),
				    wed = VALUES(wed),
				    thu = VALUES(thu),
				    fri = VALUES(fri),
					sat = VALUES(sat),
				    sun = VALUES(sun),
				    monMargin = VALUES(monMargin),
				    tueMargin = VALUES(tueMargin),
				    wedMargin = VALUES(wedMargin),
					thuMargin = VALUES(thuMargin),
				    friMargin = VALUES(friMargin),
				    satMargin = VALUES(satMargin),
				    sunMargin = VALUES(sunMargin),
					note = VALUES(note),
					enabled = VALUES(enabled),
					modified_by = VALUES(modified_by),
					date_modified = VALUES(date_modified);
			";
			
			return $sql;
		}
		
		public static function updateRecord(array $pricing = null): array
		{
			if (is_null($pricing)) {
				Log::$debug_log->error("Missing Pricing");
				
				return [];
			}
			$id = Model::setInt((isset($pricing["id"])) ? $pricing["id"] : null);
			$sql = self::buildUpdateQuery($pricing);
			
			try {
				Model::$db->rawQuery($sql);
				$pricing_id = Model::$db->getInsertId();
				
				Log::$debug_log->trace(["pricing_id" => $pricing_id]);
				
				return self::fetchByPricingId($pricing_id);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
			
		}
		
	}
