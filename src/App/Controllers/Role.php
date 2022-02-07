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
	 * Short Role Description
	 * Long Role Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Role extends Controller
	{
		protected static $buttons = array(
			"new" => array(
				"type" => "a",
				"href" => "javascript:void(0)",
				"classes" => "btn btn-primary btn-heading",
				"icon" => "fas fa-plus",
				"id" => "button_add_page_heading",
				"data" => array(
					"toggle" => "modal",
					"target" => "#modal_new_page",
				),
			),
		);
		
		public function __construct()
		{
			parent::__construct();
		}
		
		public static function getTypes(): array
		{
			$results = RoleModel::get();
			$menus = [];
			
			foreach ($results AS $k => $menu) {
				$menus[] = self::format($menu);
			}
			
			return $menus;
		}
		
		private static function format(array $role = null): array
		{
			if (is_null($role)) {
				return [];
			}
			
			return array(
				"id" => $role["role_id"],
				"name" => $role["role_name"],
				"level" => $role["role_level"],
				"sort_order" => $role["role_sort_order"],
				"enabled" => $role["role_enabled"],
				"date_created" => $role["role_date_created"],
				"created_by" => $role["role_created_by"],
				"date_modified" => $role["role_date_modified"],
				"modified_by" => $role["role_modified_by"],
				"note" => $role["role_note"],
			);
		}
		
	}
