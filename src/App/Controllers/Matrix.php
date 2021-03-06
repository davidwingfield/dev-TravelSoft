<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\CompanyModel;
	use Framework\App\Models\MatrixModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short Matrix Description
	 * Long Matrix Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Matrix extends Controller
	{
		public function __construct()
		{
			parent::__construct();
		}
		
		public static function serveGet(array $params = []): void
		{
			$matrix_id = null;
			$matrices = [];
			
			if (isset($_GET["matrix_id"])) {
				$matrix_id = (int)$_GET["matrix_id"];
			}
			
			$results = MatrixModel::get($matrix_id);
			foreach ($results AS $matrix) {
				$matrices[] = self::format($matrix);
			}
			
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			echo json_encode($matrices);
			exit(0);
		}
		
		public static function getMatricesByProductId(int $product_id = null): array
		{
			if (is_null($product_id) && !isset($_GET["product_id"])) {
				return [];
			} else if (!is_null($product_id) && !isset($_GET["product_id"])) {
				$product_id = (int)$product_id;
			} else {
				$product_id = (int)$_GET["product_id"];
			}
			
			$matrices = [];
			
			$results = MatrixModel::fetchByProductId($product_id);
			foreach ($results AS $matrix) {
				$matrices[] = self::format($matrix);
			}
			
			return $matrices;
		}
		
		public static function serveUpdate(array $params = [])
		{
			$matrices = [];
			//Log::$debug_log->trace($params);
			$results = MatrixModel::updateRecord($params);
			
			foreach ($results AS $matrix) {
				$matrices[] = self::format($matrix);
			}
			
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			View::render_json($matrices);
			exit(0);
		}
		
		private static function format(array $matrix = null): array
		{
			if (is_null($matrix)) {
				return [];
			}
			
			$pricings = Pricing::getPricingsByMatrixId((int)$matrix["matrix_id"]);
			
			return array(
				"id" => (int)$matrix["matrix_id"],
				"code" => $matrix["matrix_code"],
				"name" => $matrix["matrix_name"],
				"product_id" => (int)$matrix["matrix_product_id"],
				"season_id" => (int)$matrix["matrix_season_id"],
				"unit_id" => (int)$matrix["matrix_unit_id"],
				"cost" => (int)$matrix["matrix_cost"],
				"margin" => (int)$matrix["matrix_margin"],
				"price" => (int)$matrix["matrix_price"],
				"has_pricing" => (int)$matrix["matrix_has_pricing"],
				"been_saved" => (int)$matrix["matrix_been_saved"],
				"enabled" => (int)$matrix["matrix_enabled"],
				"date_created" => $matrix["matrix_date_created"],
				"created_by" => (int)$matrix["matrix_created_by"],
				"date_modified" => $matrix["matrix_date_modified"],
				"modified_by" => (int)$matrix["matrix_modified_by"],
				"note" => $matrix["matrix_note"],
				"pricings" => $pricings,
			);
			
		}
		
	}
