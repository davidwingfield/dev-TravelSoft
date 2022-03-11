<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short Page Description
	 * Long Page Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
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
		
		public static function fetchPages(int $page_id = null): array
		{
			$whereCondition = (!is_null($page_id)) ? " WHERE PAGE.id = $page_id" : "";
			$selectQuery = "
				SELECT
						PAGE.id AS 'page_id',
						PAGE.menu_id AS 'page_menu_id',
						PAGE.path AS 'page_path',
						PAGE.title AS 'page_title',
						PAGE.sub_title AS 'page_sub_title',
						PAGE.heading AS 'page_heading',
						PAGE.sub_heading AS 'page_sub_heading',
						PAGE.description AS 'page_description',
						PAGE.keywords AS 'page_keywords',
						PAGE.enabled AS 'page_enabled',
						PAGE.date_created AS 'page_date_created',
						PAGE.created_by AS 'page_created_by',
						PAGE.date_modified AS 'page_date_modified',
						PAGE.modified_by AS 'page_modified_by',
						PAGE.note AS 'page_note'
				FROM    page PAGE
				$whereCondition
			";
			
			try {
				return Model::$db->rawQuery($selectQuery);
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
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
		
		public static function fetchMenuRecords()
		{
			try {
				$sql = "
					SELECT              MENU.id AS 'menu_id',
										MENU.label AS 'menu_label',
										MENU.link_url AS 'menu_link_url',
										MENU.parent_id AS 'menu_parent_id',
										MENU.roles_min AS 'menu_roles_min',
										MENU.icon AS 'menu_icon',
										MENU.sort_order AS 'menu_sort_order',
										MENU.enabled AS 'menu_enabled',
										MENU.date_created AS 'menu_date_created',
										MENU.created_by AS 'menu_created_by',
										MENU.date_modified AS 'menu_date_modified',
										MENU.modified_by AS 'menu_modified_by',
										MENU.note AS 'menu_note'
					FROM                menu MENU
					ORDER BY            MENU.parent_id, MENU.sort_order, MENU.id;
				";
				
				return Model::$db->rawQuery($sql);
			} catch (\mysql_xdevapi\Exception $e) {
				return ["error" => $e];
			}
		}
		
		public static function getMenus(int $id = null): array
		{
			$items = [];
			$parent_menu = array();
			$sub_menu = array();
			$role_id = 1;
			
			if (isset($_SESSION["role_id"])) {
				$role_id = intval($_SESSION["role_id"]);
			}
			
			if (!is_null($id)) {
				self::$db->where("id", $id);
				
				return self::$db->getOne("menu");
			} else {
				$sql = "
                SELECT              MENU.id, MENU.label, MENU.link_url, MENU.parent_id,
                                    MENU.icon, MENU.roles_min, MENU.sort_order
                FROM                menu MENU
                WHERE               COALESCE(MENU.roles_min, 1) <= $role_id
                    AND             MENU.enabled = 1
                ORDER BY            COALESCE(MENU.parent_id, 0), COALESCE(MENU.sort_order, 0), MENU.id;
                ";
				try {
					$items = Model::$db->rawQuery($sql);
				} catch (Exception $e) {
					Log::$debug_log->error($e);
					
					return [];
				}
				
			}
			
			$temp = array();
			
			foreach ($items as $value) {
				
				$obj = (object)$value;
				$id = $obj->id;
				$label = (isset($obj->label)) ? $obj->label : 'ggg';
				$link_url = $obj->link_url;
				$parent_id = (isset($obj->parent_id)) ? $obj->parent_id : 0;
				$icon = $obj->icon;
				$roles_min = (isset($obj->roles_min)) ? $obj->roles_min : 1;
				$sort_order = (isset($obj->sort_order)) ? $obj->sort_order : 0;
				
				if ((int)$roles_min <= (int)$role_id) {
					
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
						$parent_menu[$obj->id]["label"] = $label;
						$parent_menu[$obj->id]["link"] = $obj->link_url;
						$parent_menu[$obj->id]["icon"] = $obj->icon;
						$parent_menu[$obj->id]["roles_min"] = $roles_min;
					} else {
						if (!isset($temp[$parent_id])) {
							$temp[$parent_id] = array(
								"sub_menus" => array(),
							);
						}
						$temp[$parent_id]["sub_menus"][] = array(
							"id" => $obj->id,
							"parent" => $parent_id,
							"label" => $label,
							"link" => $obj->link_url,
							"roles_min" => $roles_min,
						);
						$sub_menu[$obj->id]["id"] = $obj->id;
						$sub_menu[$obj->id]["parent"] = $parent_id;
						$sub_menu[$obj->id]["label"] = $label;
						$sub_menu[$obj->id]["link"] = $obj->link_url;
						$sub_menu[$obj->id]["roles_min"] = $roles_min;
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
		
		public static function updateMenuRecord(array $menu = null): array
		{
			if (is_null($menu)) {
				Log::$debug_log->error("Missing Menu");
				
				return [];
			}
			
			Log::$debug_log->trace($menu);
			
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			$id = Model::setInt((isset($menu["id"])) ? $menu["id"] : null);
			$parent_id = Model::setInt((isset($menu["parent_id"])) ? $menu["parent_id"] : 0);
			$roles_min = Model::setInt((isset($menu["roles_min"])) ? $menu["roles_min"] : 1);
			$sort_order = Model::setInt((isset($menu["sort_order"])) ? $menu["sort_order"] : 0);
			$label = Model::setString((isset($menu["label"])) ? $menu["label"] : null);
			$link_url = Model::setString((isset($menu["link_url"])) ? $menu["link_url"] : null);
			$icon = Model::setString((isset($menu["icon"])) ? $menu["icon"] : null);
			$enabled = Model::setBool((isset($menu["enabled"])) ? $menu["enabled"] : 1);
			$note = Model::setLongText((isset($menu["note"])) ? $menu["note"] : null);
			
			$sql = "
				INSERT INTO menu (
					id, label, link_url, parent_id, roles_min,
					icon, sort_order, enabled, date_created, created_by,
					date_modified, modified_by, note
				) VALUES (
					$id, $label, $link_url, $parent_id, $roles_min,
					$icon, $sort_order, $enabled, CURRENT_TIMESTAMP, $created_by,
					CURRENT_TIMESTAMP, $modified_by, $note
				)
				ON DUPLICATE KEY UPDATE
					label = VALUES(label),
					link_url = VALUES(link_url),
					parent_id = VALUES(parent_id),
					roles_min = VALUES(roles_min),
					icon = VALUES(icon),
					sort_order = VALUES(sort_order),
					enabled = VALUES(enabled),
					date_modified = VALUES(date_modified),
					modified_by = VALUES(modified_by),
					note = VALUES(note)
			";
			
			try {
				Model::$db->rawQuery($sql);
				$menu_id = Model::$db->getInsertId();
				if ($menu_id) {
					return array("id" => $menu_id);
				} else {
					return [];
				}
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function updatePageRecord(array $page = null): array
		{
			if (is_null($page)) {
				Log::$debug_log->error("Missing Page");
				
				return [];
			}
			
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			$id = Model::setInt((isset($page["id"])) ? $page["id"] : null);
			$menu_id = Model::setInt((isset($page["menu_id"])) ? $page["menu_id"] : null);
			$path = Model::setString((isset($page["path"])) ? $page["path"] : null);
			$title = Model::setString((isset($page["title"])) ? $page["title"] : null);
			$sub_title = Model::setString((isset($page["sub_title"])) ? $page["sub_title"] : null);
			$heading = Model::setString((isset($page["heading"])) ? $page["heading"] : null);
			$sub_heading = Model::setString((isset($page["sub_heading"])) ? $page["sub_heading"] : null);
			$description = Model::setString((isset($page["description"])) ? $page["description"] : null);
			$keywords = Model::setString((isset($page["keywords"])) ? $page["keywords"] : null);
			$enabled = Model::setBool((isset($page["enabled"])) ? $page["enabled"] : 1);
			$note = Model::setLongText((isset($page["note"])) ? $page["note"] : null);
			
			$sql = "
				INSERT INTO page (
					id, menu_id, path, title, sub_title,
					heading, sub_heading, description, keywords, enabled,
					date_created, created_by, date_modified, modified_by, note
				) VALUES (
					$id, $menu_id, $path, $title, $sub_title,
					$heading, $sub_heading, $description, $keywords, $enabled,
					CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP, $modified_by, $note
				)
				ON DUPLICATE KEY UPDATE
					id = VALUES(id),
				    menu_id = VALUES(menu_id),
				    path = VALUES(path),
				    title = VALUES(title),
				    sub_title = VALUES(sub_title),
					heading = VALUES(heading),
				    sub_heading = VALUES(sub_heading),
				    description = VALUES(description),
				    keywords = VALUES(keywords),
				    enabled = VALUES(enabled),
				    date_modified = VALUES(date_modified),
				    modified_by = VALUES(modified_by),
				    note = VALUES(note)
			";
			
			try {
				Model::$db->rawQuery($sql);
				$page_id = Model::$db->getInsertId();
				if ($page_id) {
					return self::fetchPages($page_id);
				} else {
					return [];
				}
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
	}
