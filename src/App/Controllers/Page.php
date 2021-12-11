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
    use Framework\App\Models\SalesTypesModel;
    use Framework\App\Models\StatusTypesModel;
    use Framework\Core\Controller;
    
    /**
     * Short Page Description
     * Long Page Description
     *
     * @package            Framework\App
     * @subpackage         Controllers
     */
    class Page extends Controller
    {
        public function __construct()
        {
            parent::__construct();
        }
        
        /**
         * fetch all type lists for select boxes
         *
         * @return array
         */
        public static function getTypes(): array
        {
            $results = array(
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
                "location_types" => LocationTypesModel::get(),
                "message_types" => MessageTypesModel::get(),
                "pricing_strategy_types" => PricingStrategyTypesModel::get(),
                "rating_types" => RatingTypesModel::get(),
                "sales_types" => SalesTypesModel::get(),
                "status_types" => StatusTypesModel::get(),
            
            );
            
            return $results;
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
            $menus = PageModel::getMenus();
            
            return self::formatSideMenu($menus, $parent_id, $sub_id);
        }
        
        private static function formatSideMenu(array $menus = [], int $parent_id = 0, int $sub_id = 0): string
        {
            $menu = "<ul id='side-menu' class='collapsible collapsible-accordion'>";
            foreach ($menus AS $k => $parentMenu) {
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
        
    }
