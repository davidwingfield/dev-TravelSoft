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
		
		public static function update(array $params = null): array
		{
			$pricings = [];
			
			$results = PricingModel::updateRecord($params);
			foreach ($results AS $k => $pricing) {
				$pricings[] = self::formatPricing($pricing);
			}
			
			return $pricings;
		}
		
		public static function serveUpdate(array $params = null): void
		{
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			View::render_json(self::update($params));
			exit(0);
		}
		
		private static function formatPricing(array $pricing = null): array
		{
			if (is_null($pricing)) {
				return [];
			}
			
			return array(
				'id' => (int)$pricing['pricing_id'],
				'name' => $pricing['pricing_name'],
				'matrix_id' => (!is_null($pricing['pricing_matrix_id'])) ? (int)$pricing['pricing_matrix_id'] : null,
				'variant_id' => $pricing['pricing_variant_id'],
				'code' => (!is_null($pricing['pricing_code'])) ? $pricing['pricing_code'] : null,
				'count' => (!is_null($pricing['pricing_count'])) ? (int)$pricing['pricing_count'] : 1,
				'mon' => (!is_null($pricing['pricing_mon'])) ? (int)$pricing['pricing_mon'] : null,
				'tue' => (!is_null($pricing['pricing_tue'])) ? (int)$pricing['pricing_tue'] : null,
				'wed' => (!is_null($pricing['pricing_wed'])) ? (int)$pricing['pricing_wed'] : null,
				'thu' => (!is_null($pricing['pricing_thu'])) ? (int)$pricing['pricing_thu'] : null,
				'fri' => (!is_null($pricing['pricing_fri'])) ? (int)$pricing['pricing_fri'] : null,
				'sat' => (!is_null($pricing['pricing_sat'])) ? (int)$pricing['pricing_sat'] : null,
				'sun' => (!is_null($pricing['pricing_sun'])) ? (int)$pricing['pricing_sun'] : null,
				'monMargin' => (!is_null($pricing['pricing_monMargin'])) ? (int)$pricing['pricing_monMargin'] : null,
				'tueMargin' => (!is_null($pricing['pricing_tueMargin'])) ? (int)$pricing['pricing_tueMargin'] : null,
				'wedMargin' => (!is_null($pricing['pricing_wedMargin'])) ? (int)$pricing['pricing_wedMargin'] : null,
				'thuMargin' => (!is_null($pricing['pricing_thuMargin'])) ? (int)$pricing['pricing_thuMargin'] : null,
				'friMargin' => (!is_null($pricing['pricing_friMargin'])) ? (int)$pricing['pricing_friMargin'] : null,
				'satMargin' => (!is_null($pricing['pricing_satMargin'])) ? (int)$pricing['pricing_satMargin'] : null,
				'sunMargin' => (!is_null($pricing['pricing_sunMargin'])) ? (int)$pricing['pricing_sunMargin'] : null,
				'enabled' => $pricing['pricing_enabled'],
				'date_created' => $pricing['pricing_date_created'],
				'created_by' => $pricing['pricing_created_by'],
				'date_modified' => $pricing['pricing_date_modified'],
				'modified_by' => $pricing['pricing_modified_by'],
				'note' => $pricing['pricing_note'],
			);
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
