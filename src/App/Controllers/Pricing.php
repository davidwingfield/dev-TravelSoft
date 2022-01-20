<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\PricingModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Pricing
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Pricing extends Controller
	{
		
		public function __construct()
		{
			parent::__construct();
		}
		
		public static function serveGetByMatrixId(array $params = null): array
		{
			$matrix_id = null;
			if (isset($params["matrix_id"])) {
				$matrix_id = (int)$params["matrix_id"];
			}
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			View::render_json(self::getPricingsByMatrixId($matrix_id));
			exit(0);
		}
		
		public static function serveGetByProductId(array $params = null): array
		{
			$product_id = null;
			if (isset($params["matrix_id"])) {
				$product_id = (int)$params["product_id"];
			}
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			View::render_json(self::getPricingsByProductId($product_id));
			exit(0);
		}
		
		public static function getPricingsByMatrixId(int $matrix_id = null): array
		{
			if (is_null($matrix_id) && !isset($_GET["matrix_id"])) {
				return [];
			} else if (!is_null($matrix_id) && !isset($_GET["matrix_id"])) {
				$matrix_id = (int)$matrix_id;
			} else {
				$matrix_id = (int)$_GET["matrix_id"];
			}
			
			$pricings = [];
			
			$results = PricingModel::fetchByMatrixId($matrix_id);
			foreach ($results AS $matrix) {
				$pricings[] = self::format($matrix);
			}
			
			return $pricings;
		}
		
		public static function getPricingsByProductId(int $product_id = null): array
		{
			if (is_null($product_id) && !isset($_GET["product_id"])) {
				return [];
			} else if (!is_null($product_id) && !isset($_GET["matrix_id"])) {
				$product_id = (int)$product_id;
			} else {
				$product_id = (int)$_GET["product_id"];
			}
			
			$pricings = [];
			
			$results = PricingModel::fetchByProductId($product_id);
			foreach ($results AS $matrix) {
				$pricings[] = self::format($matrix);
			}
			
			return $pricings;
		}
		
		private static function formatPricing(array $pricing = null): array
		{
			if (is_null($pricing)) {
				return [];
			}
			
			$formatted_result = array(
				'id' => $pricing['pricing_id'],
				'code' => $pricing['pricing_code'],
				'matrix_code' => $pricing['matrix_code'],
				'matrix_id' => (int)$pricing['matrix_id'],
				'variant_id' => (int)$pricing['variant_id'],
				'product_id' => (int)$pricing['product_id'],
				'season_id' => (int)$pricing['season_id'],
				'unit_id' => (int)$pricing['unit_id'],
				'name' => trim($pricing['name']),
				'mon' => (int)$pricing['mon'],
				'tue' => (int)$pricing['tue'],
				'wed' => (int)$pricing['wed'],
				'thu' => (int)$pricing['thu'],
				'fri' => (int)$pricing['fri'],
				'sat' => (int)$pricing['sat'],
				'sun' => (int)$pricing['sun'],
				'monMargin' => (int)$pricing['monMargin'],
				'tueMargin' => (int)$pricing['tueMargin'],
				'wedMargin' => (int)$pricing['wedMargin'],
				'thuMargin' => (int)$pricing['thuMargin'],
				'friMargin' => (int)$pricing['friMargin'],
				'satMargin' => (int)$pricing['satMargin'],
				'sunMargin' => (int)$pricing['sunMargin'],
				'count' => (int)$pricing['count'],
				'enabled' => (int)$pricing['enabled'],
				'date_created' => $pricing['date_created'],
				'created_by' => (int)$pricing['created_by'],
				'date_modified' => $pricing['date_modified'],
				'modified_by' => (int)$pricing['modified_by'],
				'note' => $pricing['note'],
			);
			
			return $formatted_result;
		}
		
		private static function format(array $pricing = null): array
		{
			if (is_null($pricing)) {
				return [];
			}
			
			$formatted_result = array(
				'pricing_code' => $pricing['pricing_code'],
				'code' => $pricing['pricing_code'],
				'matrix_code' => $pricing['matrix_code'],
				'matrix_id' => (int)$pricing['pricing_matrix_id'],
				'variant_id' => (int)$pricing['pricing_variant_id'],
				'product_id' => (int)$pricing['matrix_product_id'],
				'season_id' => (int)$pricing['matrix_season_id'],
				'unit_id' => (int)$pricing['matrix_unit_id'],
				'name' => $pricing['pricing_name'],
				'mon' => (int)$pricing['pricing_mon'],
				'tue' => (int)$pricing['pricing_tue'],
				'wed' => (int)$pricing['pricing_wed'],
				'thu' => (int)$pricing['pricing_thu'],
				'fri' => (int)$pricing['pricing_fri'],
				'sat' => (int)$pricing['pricing_sat'],
				'sun' => (int)$pricing['pricing_sun'],
				'monMargin' => (int)$pricing['pricing_monMargin'],
				'tueMargin' => (int)$pricing['pricing_tueMargin'],
				'wedMargin' => (int)$pricing['pricing_wedMargin'],
				'thuMargin' => (int)$pricing['pricing_thuMargin'],
				'friMargin' => (int)$pricing['pricing_friMargin'],
				'satMargin' => (int)$pricing['pricing_satMargin'],
				'sunMargin' => (int)$pricing['pricing_sunMargin'],
				'count' => (int)$pricing['pricing_count'],
				'id' => (int)$pricing['pricing_id'],
				'enabled' => (int)$pricing['pricing_enabled'],
				'date_created' => $pricing['pricing_date_created'],
				'created_by' => (int)$pricing['pricing_created_by'],
				'date_modified' => $pricing['pricing_date_modified'],
				'modified_by' => (int)$pricing['pricing_modified_by'],
				'note' => $pricing['pricing_note'],
			);
			
			return $formatted_result;
		}
		
	}
