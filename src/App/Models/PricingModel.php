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
				$where = "WHERE 	PRICING.matrix_id = $matrix_id";
			}
			try {
				
				$sql = self::$selectQuery . $where;
				
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
				$where = "WHERE PRODUCT.id = $product_id";
			}
			try {
				
				$sql = self::$selectQuery . $where;

//				Log::$debug_log->trace($sql);
				
				return self::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->trace($e);
				
				return [];
			}
		}
		
	}
