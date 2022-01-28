<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\CalendarModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short Calendar Description
	 * Long Calendar Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Calendar extends Controller
	{
		
		public function __construct()
		{
			parent::__construct();
		}
		
		public static function getCalendarByProductId(int $product_id = null): array
		{
			$seasons = [];
			$results = CalendarModel::getByProductId((int)$product_id);
			Log::$debug_log->trace($results);
			foreach ($results AS $k => $date) {
				$seasons[] = self::format($date);
			}
			
			return $seasons;
		}
		
		public static function serveGet(array $params = []): void
		{
			
			$calendar = [];
			$product_id = (isset($_GET["product_id"])) ? (int)$_GET["product_id"] : null;
			$season_results = CalendarModel::getByProductId($product_id);
			$profile_results = CalendarModel::getInventoryByProductId($product_id);
			foreach ($profile_results AS $day) {
				$calendar[] = self::formatProfileResults($day);
			}
			
			foreach ($season_results AS $day) {
				$calendar[] = self::formatSeasonResults($day);
			}
			
			/**
			 * render calendar json
			 */
			View::render_json($calendar);
			exit(0);
		}
		
		private static function formatProfileResults(array $inventory = null): array
		{
			if (is_null($inventory)) {
				return [];
			}
			$start = $inventory["inventory_date"];
			$end = $inventory["inventory_date"];
			$id = (int)$inventory["inventory_profile_id"];
			$allDay = true;
			$title = $inventory["unit_name"];
			$editable = true;
			$startEditable = false;
			$durationEditable = false;
			$overlap = true;
			
			switch ($inventory["profile_sales_types_id"]) {
				case 1:
					//Allotment
					$textColor = "#000000";
					$borderColor = "#2d895b";
					$backgroundColor = "#49de94";
					$className = "allotment";
					break;
				case 2:
					//Free Sale
					$textColor = "#000000";
					$borderColor = "#357f8e";
					$backgroundColor = "#54cbe3";
					$className = "freesale";
					break;
				case 3:
					//On Request
					$textColor = "#000000";
					$borderColor = "#aa890f";
					$backgroundColor = "#ffcd17";
					$className = "onrequest";
					break;
				case 4:
					//Not Available
					$textColor = "#000000";
					$borderColor = "#686868";
					$backgroundColor = "#8c9ba1";
					$className = "notavailable";
					break;
				case 5:
					//Blackout
					$textColor = "#ffffff";
					$borderColor = "#30353a";
					$backgroundColor = "#76838f";
					$className = "blackout";
					break;
				default:
					//Other
					$textColor = "#000000";
					$borderColor = "#636ca5";
					$backgroundColor = "#96a3fa";
					$className = "";
			}
			
			return array(
				"id" => $id,
				"title" => $title,
				"allDay" => $allDay,
				"start" => $start,
				"end" => $end,
				"editable" => $editable,
				"startEditable" => $startEditable,
				"durationEditable" => $durationEditable,
				"overlap" => $overlap,
				"backgroundColor" => $backgroundColor,
				"borderColor" => $borderColor,
				"textColor" => $textColor,
				"className" => $className,
			);
		}
		
		private static function formatSeasonResults(array $day = null): array
		{
			if (is_null($day)) {
				return [];
			}
			$start = $day["product_calendar_date"];
			$id = "s-" . $day["season_id"];
			$title = $day["season_name"];
			$textColor = $day["color_scheme_text_color"];
			$borderColor = $day["color_scheme_border_color"];
			$backgroundColor = $day["color_scheme_background_color"];
			
			return array(
				"id" => "s-" . $day["season_id"],
				"title" => $day["season_name"],
				"allDay" => true,
				"start" => $day["product_calendar_date"],
				"editable" => true,
				"startEditable" => false,
				"durationEditable" => false,
				"rendering" => "background",
				"overlap" => true,
				"backgroundColor" => $day["color_scheme_background_color"],
				"borderColor" => $day["color_scheme_border_color"],
				"textColor" => $day["color_scheme_text_color"],
			);
		}
		
	}
