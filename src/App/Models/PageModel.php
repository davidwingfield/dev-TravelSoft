<?php

    namespace Framework\App\Models;

    use Exception;
    use Framework\Core\Model;

    /**
     * Short Page Description
     *
     * Long Page Description
     *
     * @package            Application\App
     * @subpackage         Controllers
     */
    class PageModel extends Model
    {

        protected static $dbTable = "page";
        protected static $dbFields = Array();

        public static function get(int $id = null): array
        {

            try {
                if (!is_null($id)) {
                    self::$db->where("id", $id);
                }

                self::$db->where("enabled", 1);

                return self::$db->get(self::$dbTable);
            } catch (Exception $e) {
                return [];
            }
        }

        public static function getOne(int $id = null): array
        {
            try {
                if (!is_null($id)) {
                    self::$db->where("id", $id);
                }

                self::$db->where("enabled", 1);

                return self::$db->getOne(self::$dbTable);
            } catch (Exception $e) {
                return [];
            }
        }

        public static function update(array $params = []): array
        {
            $id = 1;

            return self::get($id);
        }

        public static function getMenus(int $id = null): array
        {
            $parent_menu = array();
            $sub_menu = array();
            $role_id = 1;

            if (isset($_SESSION["role_id"])) {
                $role_id = intval($_SESSION["role_id"]);
            }

            if (!is_null($id)) {
                self::$db->where("id", $id);
                $items = self::$db->getOne("menu");

                return $items;
            } else {
                $sql = "
                SELECT              MENU.id, MENU.label, MENU.link_url, MENU.parent_id, 
                                    MENU.icon, MENU.roles_min, MENU.sort_order 
                FROM                menu MENU
                WHERE               MENU.roles_min <= $role_id
                    AND             MENU.enabled = 1
                ORDER BY            MENU.parent_id, MENU.sort_order, MENU.id;
                ";
                $items = self::$db->rawQuery($sql);
            }
            $role_id = 3;
            $temp = array();
            foreach ($items as $value) {
                $obj = (object)$value;
                $id = $obj->id;
                $label = $obj->label;
                $link_url = $obj->link_url;
                $parent_id = $obj->parent_id;
                $icon = $obj->icon;
                $roles_min = $obj->roles_min;
                $sort_order = $obj->sort_order;
                if ($roles_min <= $role_id) {

                    if ($parent_id === 0) {
                        if (!isset($temp[$obj->id])) {
                            $temp[$obj->id] = array(
                                "id" => $id,
                                "label" => $label,
                                "link_url" => $link_url,
                                "parent_id" => $parent_id,
                                "icon" => $icon,
                                "roles_min" => $roles_min,
                                "sort_order" => $sort_order,
                                "sub_menus" => array(),
                            );
                        }
                        $parent_menu[$obj->id]["id"] = $obj->id;
                        $parent_menu[$obj->id]["label"] = $obj->label;
                        $parent_menu[$obj->id]["link"] = $obj->link_url;
                        $parent_menu[$obj->id]["icon"] = $obj->icon;
                        $parent_menu[$obj->id]["roles_min"] = $obj->roles_min;

                    } else {
                        if (!isset($temp[$parent_id])) {
                            $temp[$parent_id] = array(
                                "sub_menus" => array(),
                            );
                        }
                        $temp[$parent_id]["sub_menus"][] = array(
                            "id" => $obj->id,
                            "parent" => $obj->parent_id,
                            "label" => $obj->label,
                            "link" => $obj->link_url,
                            "roles_min" => $obj->roles_min,
                        );
                        $sub_menu[$obj->id]["id"] = $obj->id;
                        $sub_menu[$obj->id]["parent"] = $obj->parent_id;
                        $sub_menu[$obj->id]["label"] = $obj->label;
                        $sub_menu[$obj->id]["link"] = $obj->link_url;
                        $sub_menu[$obj->id]["roles_min"] = $obj->roles_min;
                    }

                }
            }

            return $temp;
        }

        private static function dyn_menu(array $parent_array = [], array $sub_array = [], int $parent_id = 0, int $sub_id = 0): string
        {
            echo "<pre>" . var_export($parent_array, 1) . "</pre>";
            //echo "<pre>" . var_export($sub_array, 1) . "</pre>";

            $parentTemp = array();
            $menu = "<ul class = 'collapsible collapsible-accordion'>";
            foreach ($parent_array as $pkey => $pval) {
                $parentTemp[$pval["id"]] = true;
                $pActive = "";
                if ($pval["id"] === $parent_id) {
                    $pActive = "active";
                }
                $icon = "";
                if (!empty(["icon"])) {
                    $icon = "<i class='" . $pval["icon"] . "'></i>";
                }
                $parentLink = $pval['link'];
                $parentLabel = $pval['label'];

            }
            $menu .= "</ul>";

            return $menu;
        }

    }
