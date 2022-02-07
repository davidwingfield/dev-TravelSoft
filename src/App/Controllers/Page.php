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
	use Framework\App\Models\PageModel;
	use Framework\App\Models\PricingStrategyTypesModel;
	use Framework\App\Models\RatingTypesModel;
	use Framework\App\Models\RoleModel;
	use Framework\App\Models\SalesTypesModel;
	use Framework\App\Models\StatusTypesModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short Page Description
	 * Long Page Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Page extends Controller
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
			return array(
				"allot_by" => StatusTypesModel::getAllotBy(),
				"season_types" => Season::getSeasonTypes(),
				"address_types" => AddressTypesModel::get(),
				"airport_types" => AirportTypesModel::get(),
				"categories_ratings_types" => CategoriesRatingsTypesModel::get(),
				"category" => Category::getTypes(array(
					"category_id" => null,
					"color_scheme_id" => null,
					"season_id" => null,
				)),
				"color_scheme" => ColorSchemeModel::get(),
				"contact_types" => ContactTypesModel::get(),
				"currency" => CurrencyModel::get(),
				"countries" => Country::get(),
				"icons" => self::getIcons(),
				"location_types" => LocationTypesModel::get(),
				"message_types" => MessageTypesModel::get(),
				"pricing_strategy_types" => PricingStrategyTypesModel::get(),
				"rating_types" => RatingTypesModel::get(),
				"roles" => Role::getTypes(),
				"sales_types" => SalesTypesModel::get(),
				"status_types" => StatusTypesModel::get(),
			
			);
		}
		
		public static function getDetails(int $page_id): array
		{
			$details = array(
				"parent_menu" => 0,
				"submenu_id" => 0,
				"title" => "",
				"heading" => "",
				"sub_heading" => "",
			);
			
			$page = PageModel::getOne($page_id);
			
			if ($page) {
				if (isset($page["menu_id"])) {
					$menu = PageModel::getMenus($page["menu_id"]);
					$parent_id = (!is_null($menu["parent_id"])) ? (int)$menu["parent_id"] : 1;
					$sub_menu = (!is_null($menu["id"])) ? (int)$menu["id"] : 1;
					define("PARENT_MENU", $parent_id);
					define("SUB_MENU", $sub_menu);
				}
				
				$details["types"] = self::getTypes();
				$details["parent_menu"] = $parent_id;
				$details["submenu_id"] = $sub_menu;
				$details["title"] = (!is_null($page["title"])) ? $page["title"] : "generic title";
				$details["heading"] = (!is_null($page["heading"])) ? $page["heading"] : "generic heading";
				$details["sub_heading"] = (!is_null($page["sub_heading"])) ? $page["sub_heading"] : "generic subheading";
				$details["keywords"] = (!is_null($page["keywords"])) ? $page["keywords"] : "generic keywords";
				$details["description"] = (!is_null($page["description"])) ? $page["description"] : "generic description";
				
				// ----
				define("PAGE_AUTHOR", "David Wingfield");
				define("PAGE_TITLE", $details["title"]);
				define("PAGE_DESCRIPTION", $details["description"]);
				define("PAGE_KEYWORDS", $details["keywords"]);
				
				define("PAGE_HEADING", $details["heading"]);
				define("PAGE_SUBHEADING", $details["sub_heading"]);
				
			}
			
			return $details;
		}
		
		public static function buildSideMenu(int $parent_id = 0, int $sub_id = 0): string
		{
			$temp = PageModel::getMenus();
			
			return self::formatSideMenu($temp, $parent_id, $sub_id);
		}
		
		private static function formatSideMenu(array $temp = [], int $parent_id = 0, int $sub_id = 0): string
		{
			$menu = "<ul id='side-menu' class='collapsible collapsible-accordion'>";
			foreach ($temp AS $k => $parentMenu) {
				$id = $parentMenu["id"];
				
				$parentLink = "javascript:void(0);";
				if (isset($parentMenu["link_url"])) {
					$parentLink = $parentMenu["link_url"];
				}
				$parentIcon = "fas  fa-edit";
				if (isset($parentMenu["icon"]) && !is_null($parentMenu["icon"])) {
					$parentIcon = $parentMenu["icon"];
				}
				$parentLabel = $parentMenu["label"];
				$sub_menus = $parentMenu["sub_menus"];
				
				if (count($sub_menus)) {
					$parentIsActive = "";
					if ($parentMenu["id"] === $parent_id) {
						$parentIsActive = "active";
					}
					$menu .= "<li id='menu-item-$id' class='menu-item $parentIsActive'>";
					$menu .= "<a class='collapsible-header waves-effect arrow-r $parentIsActive'>";
					$menu .= "<i class='$parentIcon'></i>";
					$menu .= "$parentLabel";
					$menu .= "<i class='fas fa-angle-down rotate-icon'></i>";
					$menu .= "</a>";
					$menu .= "<div class='collapsible-body'>";
					$menu .= "<ul class='sub-menu'>";
					
					foreach ($sub_menus AS $subMenu) {
						$subIsActive = "";
						$subLabel = $subMenu["label"];
						$subId = $subMenu["id"];
						if ((int)$subId === (int)$sub_id) {
							$subIsActive = "active";
						}
						$subLink = "javascript:void(0);";
						if (isset($subMenu["link"])) {
							$subLink = $subMenu["link"];
						}
						
						$menu .= "<li id='menu-item-$subId' class='$subIsActive'>";
						$menu .= "<a href='$subLink' class='waves-effect $subIsActive'>$subLabel</a>";
						$menu .= "</li>";
					}
					
					$menu .= "</ul>";
					$menu .= "</div>";
					$menu .= "</li>";
				} else {
					$menu .= "<li>";
					$menu .= "<a href='$parentLink' class='waves-effect'>";
					$menu .= "<i class='$parentIcon'></i>";
					$menu .= $parentLabel;
					$menu .= "</a>";
					$menu .= "</li>";
				}
				
			}
			
			$menu .= "</ul>";
			
			return $menu;
		}
		
		public static function profile()
		{
		
		}
		
		public static function getMenus(): array
		{
			$results = PageModel::fetchMenuRecords();
			$menus = [];
			$temp = [];
			$parent_menu = array();
			$sub_menu = array();
			
			foreach ($results AS $menu) {
				$item = self::formatMenuObject($menu);
				$id = (int)$item["id"];
				$parent_id = (int)$item["parent_id"];
				$state = array(
					"disabled" => false,
					"selected" => false,
					"opened" => false,
				);
				
				if ($id === 1) {
					$state["disabled"] = true;
				}
				
				if ($parent_id === 0) {
					if (!isset($temp[$id])) {
						$temp[$id] = array(
							"id" => (int)$item["id"],
							"text" => $item["label"],
							"state" => $state,
							"label" => $item["label"],
							"link_url" => $item["link_url"],
							"parent_id" => (int)$item["parent_id"],
							"roles_min" => (int)$item["roles_min"],
							"icon" => $item["icon"],
							"sort_order" => (int)$item["sort_order"],
							"enabled" => (int)$item["enabled"],
							"date_created" => $item["date_created"],
							"created_by" => (int)$item["created_by"],
							"date_modified" => $item["date_modified"],
							"modified_by" => (int)$item["modified_by"],
							"note" => $item["note"],
							"sub_menus" => array(),
						);
					}
					$parent_menu[$id]["id"] = (int)$item["id"];
					$parent_menu[$id]["text"] = $item["label"];
					$parent_menu[$id]["state"] = $state;
					$parent_menu[$id]["label"] = $item["label"];
					$parent_menu[$id]["link_url"] = $item["link_url"];
					$parent_menu[$id]["parent_id"] = (int)$item["parent_id"];
					$parent_menu[$id]["roles_min"] = (int)$item["roles_min"];
					$parent_menu[$id]["icon"] = $item["icon"];
					$parent_menu[$id]["sort_order"] = (int)$item["sort_order"];
					$parent_menu[$id]["enabled"] = (int)$item["enabled"];
					$parent_menu[$id]["date_created"] = $item["date_created"];
					$parent_menu[$id]["created_by"] = (int)$item["created_by"];
					$parent_menu[$id]["date_modified"] = $item["date_modified"];
					$parent_menu[$id]["modified_by"] = (int)$item["modified_by"];
					$parent_menu[$id]["note"] = $item["note"];
				} else {
					if (!isset($temp[$parent_id])) {
						$temp[$parent_id] = array(
							"sub_menus" => array(),
						);
					}
					$temp[$parent_id]["sub_menus"][] = array(
						"id" => $item["id"],
						"text" => $item["label"],
						"state" => $state,
						"label" => $item["label"],
						"link_url" => $item["link_url"],
						"parent_id" => (int)$item["parent_id"],
						"roles_min" => (int)$item["roles_min"],
						"icon" => $item["icon"],
						"sort_order" => (int)$item["sort_order"],
						"enabled" => (int)$item["enabled"],
						"date_created" => $item["date_created"],
						"created_by" => (int)$item["created_by"],
						"date_modified" => $item["date_modified"],
						"modified_by" => (int)$item["modified_by"],
						"note" => $item["note"],
					);
					
					$sub_menu[$id]["id"] = (int)$item["id"];
					$sub_menu[$id]["text"] = $item["label"];
					$sub_menu[$id]["state"] = $state;
					$sub_menu[$id]["label"] = $item["label"];
					$sub_menu[$id]["link_url"] = $item["link_url"];
					$sub_menu[$id]["parent_id"] = (int)$item["parent_id"];
					$sub_menu[$id]["roles_min"] = (int)$item["roles_min"];
					$sub_menu[$id]["icon"] = "fas fa-file-alt";
					$sub_menu[$id]["sort_order"] = (int)$item["sort_order"];
					$sub_menu[$id]["enabled"] = (int)$item["enabled"];
					$sub_menu[$id]["date_created"] = $item["date_created"];
					$sub_menu[$id]["created_by"] = (int)$item["created_by"];
					$sub_menu[$id]["date_modified"] = $item["date_modified"];
					$sub_menu[$id]["modified_by"] = (int)$item["modified_by"];
					$sub_menu[$id]["note"] = $item["note"];
				}
			}
			
			foreach ($temp AS $k => $m) {
				$menus[] = $m;
			}
			
			return $menus;
		}
		
		public static function serveGetMenus(): void
		{
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			View::render_json(self::getMenus());
			exit(0);
		}
		
		public static function serveGetByPageId(array $params = []): void
		{
			$page_id = isset($params["page_id"]) ? (int)$params["page_id"] : null;
			
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			View::render_json(self::get($page_id));
			exit(0);
		}
		
		public static function get(int $page_id = null): array
		{
			$pages = [];
			$results = PageModel::fetchPages($page_id);
			foreach ($results AS $page) {
				$pages[] = self::format($page);
			}
			
			return $pages;
		}
		
		public static function getIcons(): array
		{
			$string = file_get_contents(__DIR__ . "/icons.json");
			$icons = [];
			
			if (!$string === false) {
				$json_a = json_decode($string, true);
				if ($json_a !== null) {
					$id = 0;
					foreach ($json_a AS $key => $icon) {
						$id++;
						$styles = (isset($icon["styles"])) ? $icon["styles"] : [];
						$name = $key;
						$class = strtolower("fa-$name");
						$terms = $icon["search"]["terms"];
						
						foreach ($styles AS $k => $style) {
							$iconType = null;
							
							if ($style === "brands") {
								$iconType = "fab";
							} else if ($style === "solid") {
								$iconType = "fas";
							} else {
								$iconType = null;
							}
							if (!is_null($iconType)) {
								$icons[] = array(
									"id" => $id,
									"style" => $iconType,
									"name" => $icon["label"],
									"terms" => $terms,
									"label" => $icon["label"],
									"class" => "$iconType $class",
									"icon" => "<i class='$iconType fa-$name'></i>",
								);
							}
						}
						
					}
				}
				
			}
			
			return $icons;
		}
		
		public static function index()
		{
			
			$data = Page::getDetails(23);
			
			$menus = self::getMenus();
			
			$data["settings"] = array();
			$data["settings"]["pages"] = self::get();
			$data["settings"]["menus"] = $menus;
			
			$data["types"]["menus"] = $menus;
			/** breadcrumbs */
			define("BREAD_CRUMBS", "
                    <li class='breadcrumb-item'>
                        <a href='/'>Home</a>
                    </li>
                    <li class='breadcrumb-item'>
                        <a>Pages</a>
                    </li>"
			);
			
			$data["buttons"] = array(
				self::$buttons["new"],
			);
			
			/**
			 * render product edit page
			 */
			View::render_template("pages/index", $data);
			exit(0);
		}
		
		public static function edit(array $params = [])
		{
			if (isset($params["page_id"])) {
				$page_id = (int)$params["page_id"];
				$data = Page::getDetails(24);
				
				/** breadcrumbs */
				define("BREAD_CRUMBS", "
                    <li class='breadcrumb-item'>
                        <a href='/'>Home</a>
                    </li>
                    <li class='breadcrumb-item'>
                        <a href='/admin/pages'>Pages</a>
                    </li>
                    <li class='breadcrumb-item'>
                    
                    </li>"
				);
				
				/**
				 * render product edit page
				 */
				View::render_template("pages/edit", $data);
				exit(0);
			}
		}
		
		private static function formatMenuObject(array $menu = []): array
		{
			return array(
				"id" => $menu["menu_id"],
				"label" => $menu["menu_label"],
				"link_url" => $menu["menu_link_url"],
				"parent_id" => $menu["menu_parent_id"],
				"roles_min" => $menu["menu_roles_min"],
				"icon" => $menu["menu_icon"],
				"sort_order" => $menu["menu_sort_order"],
				"enabled" => $menu["menu_enabled"],
				"date_created" => $menu["menu_date_created"],
				"created_by" => $menu["menu_created_by"],
				"date_modified" => $menu["menu_date_modified"],
				"modified_by" => $menu["menu_modified_by"],
				"note" => $menu["menu_note"],
			);
		}
		
		private static function format(array $page = null): array
		{
			return array(
				"id" => $page["page_id"],
				"menu_id" => $page["page_menu_id"],
				"path" => $page["page_path"],
				"title" => $page["page_title"],
				"sub_title" => $page["page_sub_title"],
				"heading" => $page["page_heading"],
				"sub_heading" => $page["page_sub_heading"],
				"description" => $page["page_description"],
				"keywords" => $page["page_keywords"],
				"enabled" => $page["page_enabled"],
				"date_created" => $page["page_date_created"],
				"created_by" => $page["page_created_by"],
				"date_modified" => $page["page_date_modified"],
				"modified_by" => $page["page_modified_by"],
				"note" => $page["page_note"],
			);
		}
		
		private static function update(array $params = null): void
		{
		
		}
		
		public static function updateMenus(): void
		{
			$menus = [];
			$menusUpdated = [];
			//Log::$debug_log->trace($_POST["menus"]);
			
			if (isset($_POST["menus"])) {
				$recordCount = count($_POST["menus"]);
				//Log::$debug_log->trace($recordCount);
				foreach ($_POST["menus"] AS $k => $menu) {
					$menusUpdated[] = PageModel::updateMenuRecord($menu);
				}
				
				//Log::$debug_log->trace($menusUpdated);
				
				if (count($menusUpdated) === $recordCount) {
					$menus = self::getMenus();
				}
				
			}
			
			//Log::$debug_log->trace($menus);
			
			/**
			 * render calendar json
			 */
			View::render_json($menus);
			exit(0);
		}
		
	}
