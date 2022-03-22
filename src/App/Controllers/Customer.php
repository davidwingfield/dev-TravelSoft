<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\CustomerModel;
	use Framework\Core\Controller;
	use Framework\Logger\Log;
	
	/**
	 * Short Customer Description
	 * Long Customer Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Customer extends Controller
	{
		public function __construct()
		{
			parent::__construct();
		}
		
		public function index()
		{
			$customers = [
				[
					'name' => 'Tester',
					'balance' => 120.00,
				],
				[
					'name' => 'Another Tester',
					'balance' => 100.00,
				],
			];
			
			//echo "" . var_export($customers, 1) . "</pre>";
		}
		
		public static function get(array $params = []): array
		{
			Log::$debug_log->trace("Customer::get()");
			Log::$debug_log->info($params);
			
			$customers = [];
			
			if (isset($params)) {
				if (isset($params["customer_id"]) && (int)$params["customer_id"] > 0) {
					$results = CustomerModel::fetchByCustomerId((int)$params["customer_id"]);
				} else if (isset($params["user_id"]) && (int)$params["user_id"] > 0) {
					$results = CustomerModel::fetchByUserId((int)$params["user_id"]);
				} else {
					$results = CustomerModel::fetchAll();
				}
			} else {
				$results = CustomerModel::fetchAll();
			}
			
			foreach ($results AS $key => $customer) {
				$customers[] = self::format($customer);
			}
			
			return $customers;
		}
		
		public static function format(array $customer = null): array
		{
			Log::$debug_log->trace("Itinerary::edit()");
			Log::$debug_log->info($customer);
			// ----
			
			if (is_null($customer)) {
				return [];
			}
			
			$address = Address::formatAddress($customer);
			
			return array(
				"id" => $customer["customer_id"],
				"address_id" => $customer["customer_address_id"],
				"name_prefix" => $customer["customer_name_prefix"],
				"name_first" => $customer["customer_name_first"],
				"name_last" => $customer["customer_name_last"],
				"name_suffix" => $customer["customer_name_suffix"],
				"date_birth" => $customer["customer_date_birth"],
				"email" => $customer["customer_email"],
				"phone_1" => $customer["customer_phone_1"],
				"phone_2" => $customer["customer_phone_2"],
				"sort_order" => $customer["customer_sort_order"],
				"enabled" => $customer["customer_enabled"],
				"date_created" => $customer["customer_date_created"],
				"created_by" => $customer["customer_created_by"],
				"date_modified" => $customer["customer_date_modified"],
				"modified_by" => $customer["customer_modified_by"],
				"note" => $customer["customer_note"],
				"address" => $address,
			);
		}
		
	}
