<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\AddressTypesModel;
	use Framework\App\Models\AirportTypesModel;
	use Framework\App\Models\CategoriesRatingsTypesModel;
	use Framework\App\Models\CategoryModel;
	use Framework\App\Models\ColorSchemeModel;
	use Framework\App\Models\ContactTypesModel;
	use Framework\App\Models\CountryModel;
	use Framework\App\Models\CurrencyModel;
	use Framework\App\Models\LocationTypesModel;
	use Framework\App\Models\MessageTypesModel;
	use Framework\App\Models\RoleModel;
	use Framework\App\Models\PricingStrategyTypesModel;
	use Framework\App\Models\RatingTypesModel;
	use Framework\App\Models\SalesTypesModel;
	use Framework\App\Models\StatusTypesModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short StatusType Description
	 * Long StatusType Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class StatusType extends Controller
	{
		protected static $buttons = array();
		
		public function __construct()
		{
			parent::__construct();
		}
		
		public static function get(int $status_type_id = null): array
		{
			$statusTypes = [];
			
			$results = StatusTypesModel::fetchStatusTypesByStatusTypesId($status_type_id);
			foreach ($results as $statusType) {
				$statusTypes[] = self::format($statusType);
			}
			
			return $statusTypes;
		}
		
		public static function serveGet(array $params = []): void
		{
			$status_type_id = (isset($params["status_type_id"])) ? (int)$params["status_type_id"] : null;
			$status_types = self::get($status_type_id);
			
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			View::render_json($status_types);
			exit(0);
		}
		
		private static function format(array $status_type = null): array
		{
			if (is_null($status_type)) {
				return [];
			}
			
			return array(
				'id' => $status_type['status_types_id'],
				'name' => $status_type['status_types_name'],
				'enabled' => $status_type['status_types_enabled'],
				'date_created' => $status_type['status_types_date_created'],
				'created_by' => $status_type['status_types_created_by'],
				'date_modified' => $status_type['status_types_date_modified'],
				'modified_by' => $status_type['status_types_modified_by'],
				'note' => $status_type['status_types_note'],
				'sort_order' => $status_type['status_types_sort_order'],
			);
		}
		
	}
