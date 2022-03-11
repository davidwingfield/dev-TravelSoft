<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\UnitModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short Unit Description
	 * Long Unit Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Unit extends Controller
	{
		/**
		 * constructor
		 */
		public function __construct()
		{
			parent::__construct();
		}
		
		/**
		 * get units by product id
		 *
		 * @param int|null $product_id
		 *
		 * @return array
		 */
		public static function getUnitsByProductId(int $product_id = null): array
		{
			$units = [];
			$results = UnitModel::getByProductId((int)$product_id);
			foreach ($results AS $k => $unit) {
				$units[] = self::format($unit);
			}
			
			return $units;
		}
		
		/**
		 * autocomplete
		 *
		 * @param string   $st
		 * @param int|null $category_id
		 *
		 * @return array
		 */
		public static function autocomplete(string $st = "", int $category_id = null): array
		{
			$results = UnitModel::unit_ac($st, $category_id);
			
			return self::format_ac($results);
		}
		
		/**
		 * validate name exists
		 *
		 * @param array $args
		 *
		 * @return array
		 */
		public static function validateName(array $args = []): array
		{
			$units = array();
			if (isset($args["name"])) {
				$name = $args["name"];
				$results = UnitModel::getByName($name);
				
				foreach ($results AS $k => $unit) {
					$units[] = self::format($unit);
				}
			}
			
			/**
			 * render unit json
			 */
			View::render_json($units);
			exit(0);
		}
		
		/**
		 * @param array $params
		 */
		public static function serveUpdate(array $params = []): void
		{
			$units = [];
			$results = UnitModel::updateRecord($params);
			foreach ($results AS $unit) {
				$units[] = self::format($unit);
			}
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			View::render_json($units);
			exit(0);
		}
		
		/**
		 * format unit results
		 *
		 * @param array|null $unit
		 *
		 * @return array
		 */
		private static function format(array $unit = null): array
		{
			if (is_null($unit)) {
				return [];
			}
			
			//Log::$debug_log->trace($unit);
			
			$temp = array(
				"id" => $unit["unit_id"],
				"category_id" => $unit["unit_category_id"],
				"api_id" => $unit["unit_api_id"],
				"name" => $unit["unit_name"],
				"room_code" => (!isset($unit["room_code"])) ? buildCode($unit["unit_id"], $unit["unit_name"], "unit") : $unit["room_code"],
				"enabled" => $unit["unit_enabled"],
				"date_created" => $unit["unit_date_created"],
				"created_by" => $unit["unit_created_by"],
				"date_modified" => $unit["unit_date_modified"],
				"modified_by" => $unit["unit_modified_by"],
				"note" => $unit["unit_note"],
			);
			$temp["cover_image"] = "/public/img/unit_cover_placeholder.jpg";
			$images = Image::getByUnitId((int)$unit["unit_id"]);
			foreach ($images AS $k => $image) {
				if ($image["is_cover"] === 1) {
					$source = "unit";
					$sourceId = (isset($unit["unit_id"])) ? (int)$unit["unit_id"] : null;
					$fileName = (isset($image["name"])) ? $image["name"] : null;
					$fileExtension = (isset($image["extension"])) ? $image["extension"] : null;
					$filePath = (isset($image["name"])) ? $image["name"] : null;
					
					if (!is_null($sourceId) && !is_null($fileName) && !is_null($fileExtension) && !is_null($filePath)) {
						$temp["cover_image"] = "/public/img/$source/$sourceId/$fileName.$fileExtension";
					}
				}
			}
			$temp["images"] = (isset($images)) ? $images : [];
			
			if (isset($unit["product_unit_keywords"])) {
				$temp["keywords"] = $unit["product_unit_keywords"];
			}
			
			if (isset($unit["product_unit_amenities"])) {
				$temp["amenities"] = $unit["product_unit_amenities"];
			}
			
			if (isset($unit["product_unit_min_pax"])) {
				$temp["min_pax"] = (int)$unit["product_unit_min_pax"];
			}
			
			if (isset($unit["product_unit_max_pax"])) {
				$temp["max_pax"] = ($unit["product_unit_max_pax"] === "") ? null : (int)$unit["product_unit_max_pax"];
			}
			
			if (isset($unit["product_unit_min_nights"])) {
				$temp["min_nights"] = (int)$unit["product_unit_min_nights"];
			}
			
			if (isset($unit["product_unit_max_nights"])) {
				$temp["max_nights"] = ($unit["product_unit_max_nights"] === "") ? null : (int)$unit["product_unit_max_nights"];
			}
			
			if (isset($unit["product_unit_blurb"])) {
				$temp["blurb"] = (string)$unit["product_unit_blurb"];
			}
			
			if (isset($unit["product_unit_description_long"])) {
				$temp["description_long"] = (string)$unit["product_unit_description_long"];
			}
			
			if (isset($unit["product_unit_description_short"])) {
				$temp["description_short"] = (string)$unit["product_unit_description_short"];
			}
			
			if (isset($unit["product_unit_note"])) {
				$temp["product_unit_note"] = (string)$unit["product_unit_note"];
			}
			
			if (isset($unit["product_unit_meeting_point"])) {
				$temp["meeting_point"] = $unit["product_unit_meeting_point"];
			}
			
			if (isset($unit["product_unit_time_notes"])) {
				$temp["time_notes"] = $unit["product_unit_time_notes"];
			}
			
			if (isset($unit["product_unit_start_time"])) {
				$temp["start_time"] = $unit["product_unit_start_time"];
			}
			
			if (isset($unit["product_unit_end_time"])) {
				$temp["end_time"] = (string)$unit["product_unit_end_time"];
			}
			
			//Log::$debug_log->trace($temp);
			
			return $temp;
		}
		
		/**
		 * format unit autocomplete
		 *
		 * @param array|null $units
		 *
		 * @return array
		 */
		private static function format_ac(array $units = null): array
		{
			
			$data["suggestions"] = [];
			foreach ($units AS $k => $unit) {
				$l = (object)$unit;
				$value = utf8_encode($l->unit_name);
				array_push($data["suggestions"], [
					"value" => utf8_encode($value),
					"data" => self::format($unit),
				]);
			}
			
			return $data;
		}
		
		/**
		 * delete unit from product
		 *
		 * @param array $params
		 */
		public static function serveDelete(array $params = []): void
		{
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			View::render_json(UnitModel::deleteProductUnit($params));
			exit(0);
		}
		
		/**
		 * post request to add new unit record
		 *
		 * @param array $params
		 */
		public static function serveNew(array $params = [])
		{
			$results = UnitModel::insertUnit($params);
			$units = [];
			
			foreach ($results AS $k => $unit) {
				$units[] = self::format($unit);
			}
			
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			View::render_json($units);
			exit(0);
		}
		
	}
