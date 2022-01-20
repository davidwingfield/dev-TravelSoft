<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\LocationModel;
	use Framework\App\Models\ProfileModel;
	use Framework\App\Models\UnitModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short Profile Description
	 * Long Profile Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Profile extends Controller
	{
		
		public function __construct()
		{
			parent::__construct();
		}
		
		public static function serveGet(array $params = []): void
		{
			$profiles = [];
			
			if (isset($params["product_id"])) {
				$profiles = self::getByProductId((int)$params["product_id"]);
			} else if (isset($params["profile_id"])) {
				$results = ProfileModel::get((int)$params["profile_id"]);
			} else {
				//Log::$debug_log->trace("else");
				$results = ProfileModel::get();
			}
			
			if (count($profiles) === 0) {
				foreach ($results AS $k => $result) {
					$formatted_results = self::format($result);
					$profiles[] = $formatted_results;
				}
			}
			
			/**
			 * render json response
			 */
			View::render_json($profiles);
			exit(0);
		}
		
		public static function validateName(array $args = []): array
		{
			$profiles = array();
			$name = null;
			$product_id = null;
			if (isset($args["product_id"])) {
				$product_id = (int)$args["product_id"];
			}
			
			if (isset($args["name"])) {
				$name = (string)$args["name"];
			}
			
			if (!is_null($product_id) && !is_null($name)) {
				
				$results = ProfileModel::fetchProfilesByByNameAndProductId($name, $product_id);
				
				foreach ($results AS $k => $unit) {
					$profiles[] = self::format($unit);
				}
			}
			
			/**
			 * render unit json
			 */
			View::render_json($profiles);
			exit(0);
		}
		
		public static function serveUpdate(array $params = [])
		{
			$profiles = array();
			$results = ProfileModel::updateRecord($params);
			foreach ($results AS $location) {
				$profiles[] = self::format($location);
			}
			
			/**
			 * render location json
			 */
			header("Content-type:application/json");
			View::render_json($profiles);
			exit(0);
		}
		
		public static function autocomplete(string $st = "", int $product_id = null): array
		{
			$id = null;
			if (!is_null($product_id)) {
				$id = (int)$product_id;
			}
			$results = ProfileModel::profile_ac($st, $id);
			
			return self::format_ac($results);
		}
		
		public static function getByProductId(int $product_id = null): array
		{
			$id = null;
			$profiles = [];
			if (!is_null($product_id)) {
				$id = (int)$product_id;
			}
			
			$results = ProfileModel::fetchProfilesByProductId($id);
			
			foreach ($results AS $k => $result) {
				$profiles[] = self::format($result);
			}
			
			return $profiles;
		}
		
		private static function format(array $profile = null): array
		{
			if (is_null($profile)) {
				return [];
			}
			
			$product_profile = null;
			$allot_by = null;
			if (isset($profile['allot_by_id']) && (int)$profile['allot_by_id'] > 0) {
				$allot_by = array(
					'id' => $profile['allot_by_id'],
					'name' => $profile['allot_by_name'],
					'sort_order' => $profile['allot_by_sort_order'],
					'enabled' => $profile['allot_by_enabled'],
					'date_created' => $profile['allot_by_date_created'],
					'created_by' => $profile['allot_by_created_by'],
					'date_modified' => $profile['allot_by_date_modified'],
					'modified_by' => $profile['allot_by_modified_by'],
					'note' => $profile['allot_by_note'],
				);
			}
			
			if (isset($profile['product_profile_product_id'], $profile['product_profile_profile_id'])) {
				$product_profile = array(
					'product_id' => $profile['product_profile_product_id'],
					'profile_id' => $profile['product_profile_profile_id'],
					'enabled' => $profile['product_profile_enabled'],
					'date_created' => $profile['product_profile_date_created'],
					'created_by' => $profile['product_profile_created_by'],
					'date_modified' => $profile['product_profile_date_modified'],
					'modified_by' => $profile['product_profile_modified_by'],
					'note' => $profile['product_profile_note'],
				);
			}
			
			$formatted_profile = array(
				'id' => $profile['profile_id'],
				'allot_by_id' => $profile['profile_allot_by_id'],
				'sales_types_id' => $profile['profile_sales_types_id'],
				'product_id' => $profile['profile_product_id'],
				'name' => $profile['profile_name'],
				'quantity' => $profile['profile_quantity'],
				'expires' => $profile['profile_expires'],
				'days_out' => $profile['profile_days_out'],
				'transfer_sales_types_id' => $profile['profile_transfer_sales_types_id'],
				'release_amt' => $profile['profile_release_amt'],
				'min_length_days' => $profile['profile_min_length_days'],
				'checkin_dow' => $profile['profile_checkin_dow'],
				'checkout_dow' => $profile['profile_checkout_dow'],
				'departure_dow' => $profile['profile_departure_dow'],
				'return_dow' => $profile['profile_return_dow'],
				'inc_days_dow' => $profile['profile_inc_days_dow'],
				'min_duration' => $profile['profile_min_duration'],
				'max_duration' => $profile['profile_max_duration'],
				'equal_duration' => $profile['profile_equal_duration'],
				'advanced_booking_min' => $profile['profile_advanced_booking_min'],
				'advanced_booking_max' => $profile['profile_advanced_booking_max'],
				'advanced_booking_date' => $profile['profile_advanced_booking_date'],
				'weekday_dow' => $profile['profile_weekday_dow'],
				'enabled' => $profile['profile_enabled'],
				'date_created' => $profile['profile_date_created'],
				'created_by' => $profile['profile_created_by'],
				'date_modified' => $profile['profile_date_modified'],
				'modified_by' => $profile['profile_modified_by'],
				'note' => $profile['profile_note'],
				'sales_types_details' => array(
					'id' => $profile['sales_types_id'],
					'name' => $profile['sales_types_name'],
					'class' => $profile['sales_types_class'],
					'sort_order' => $profile['sales_types_sort_order'],
					'enabled' => $profile['sales_types_enabled'],
					'date_created' => $profile['sales_types_date_created'],
					'created_by' => $profile['sales_types_created_by'],
					'date_modified' => $profile['sales_types_date_modified'],
					'modified_by' => $profile['sales_types_modified_by'],
					'note' => $profile['sales_types_note'],
				),
				'transfer_sales_types_details' => array(
					'id' => $profile['sales_types_transfer_id'],
					'name' => $profile['sales_types_transfer_name'],
					'class' => $profile['sales_types_transfer_class'],
					'sort_order' => $profile['sales_types_transfer_sort_order'],
					'enabled' => $profile['sales_types_transfer_enabled'],
					'date_created' => $profile['sales_types_transfer_date_created'],
					'created_by' => $profile['sales_types_transfer_created_by'],
					'date_modified' => $profile['sales_types_transfer_date_modified'],
					'modified_by' => $profile['sales_types_transfer_modified_by'],
					'note' => $profile['sales_types_transfer_note'],
				),
			);
			
			if (!is_null($allot_by)) {
				$formatted_profile["allot_by_details"] = $allot_by;
			}
			
			if (!is_null($product_profile)) {
				//$formatted_profile["product_profile_details"] = $product_profile;
			}
			
			return $formatted_profile;
		}
		
		private static function format_ac(array $profiles = null): array
		{
			$data["suggestions"] = [];
			foreach ($profiles AS $k => $profile) {
				$l = (object)$profile;
				$value = utf8_encode($l->profile_name);
				array_push($data["suggestions"], [
					"value" => utf8_encode($value),
					"data" => self::format($profile),
				]);
			}
			
			return $data;
		}
		
		public static function serveDelete(array $params = []): void
		{
			View::render_json(ProfileModel::deleteProductProfile($params));
			exit(0);
		}
		
	}
