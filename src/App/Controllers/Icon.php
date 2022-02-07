<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\CountryModel;
	use Framework\App\Models\IconModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short Icon Description
	 * Long Icon Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Icon extends Controller
	{
		public function __construct()
		{
			parent::__construct();
		}
		
		public static function serveGet(array $params = null): void
		{
			$icon_id = null;
			
			if (isset($params["icon_id"])) {
				$icon_id = (int)$params["icon_id"];
			}
			
			$icons = self::get($icon_id);
			
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			View::render_json($icons);
			exit(0);
		}
		
		public static function get(int $icon_id = null): array
		{
			$icons = [];
			$results = IconModel::getIcons($icon_id);
			
			foreach ($results AS $key => $icon) {
				$icons[] = self::format($icon);
			}
			
			return $icons;
		}
		
		private static function format(array $icon = null)
		{
			return array(
				"id" => $icon["icon_id"],
				"name" => $icon["icon_name"],
				"class" => $icon["icon_class"],
				"keywords" => $icon["icon_keywords"],
				"enabled" => $icon["icon_enabled"],
				"date_created" => $icon["icon_date_created"],
				"created_by" => $icon["icon_created_by"],
				"date_modified" => $icon["icon_date_modified"],
				"modified_by" => $icon["icon_modified_by"],
				"note" => $icon["icon_note"],
			);
		}
		
	}
