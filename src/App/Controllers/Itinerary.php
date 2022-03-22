<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\ItineraryModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short Itinerary Description
	 * Long Itinerary Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Itinerary extends Controller
	{
		protected static $buttons = array(
			"new" => array(
				"type" => "a",
				"href" => "javascript:void(0)",
				"classes" => "btn btn-primary btn-heading",
				"icon" => "fas fa-plus",
				"id" => "button_add_itinerary_page_heading",
				"data" => array(
					"toggle" => "tooltip",
					"title" => "Create a New Itinerary",
					"placement" => "top",
				),
			),
		);
		
		public function __construct()
		{
			parent::__construct();
		}
		
		public static function index(array $params = []): void
		{
			Log::$debug_log->trace("Itinerary::index()");
			Log::$debug_log->info($params);
			
			$userId = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			
			$userQueryParams = [];
			$userQueryParams["user_id"] = $userId;
			
			$data = Page::getDetails(25);
			$itinerariesAll = self::get();
			$itinerariesUser = self::get($userQueryParams);
			$customersAll = Customer::get();
			$customersUser = Customer::get($userQueryParams);
			
			/** breadcrumbs */
			define("BREAD_CRUMBS", "
                <li class='breadcrumb-item'>
                    <a href='/'>Home</a>
                </li>
                <li class='breadcrumb-item'>
                    Itineraries
                </li>"
			);
			
			/**
			 * buttons
			 */
			$data["buttons"] = array(
				self::$buttons["new"],
			);
			
			$data["itineraries_all"] = $itinerariesAll;
			$data["itineraries_user"] = $itinerariesUser;
			$data["customers_all"] = $customersAll;
			$data["customers_user"] = $customersUser;
			
			/**
			 * header
			 */
			if (!defined("PAGEHEADINGCLASS")) {
				//define("PAGEHEADINGCLASS", " page-header-bordered page-header-tabs");
				define("PAGEHEADINGCLASS", " ");
			}
			
			/**
			 * render index view
			 */
			View::render_template("itineraries/index", $data);
			exit(0);
		}
		
		public static function edit(array $params = []): void
		{
			Log::$debug_log->trace("Itinerary::edit()");
			Log::$debug_log->info($params);
			
			$data = Page::getDetails(26);
			
			/**
			 * render index view
			 */
			View::render_template("itineraries/edit", $data);
			exit(0);
		}
		
		public static function view(array $params = []): void
		{
			Log::$debug_log->trace("Itinerary::view()");
			Log::$debug_log->info($params);
			
			$data = Page::getDetails(27);
			
			/**
			 * render index view
			 */
			View::render_template("itineraries/view", $data);
			exit(0);
		}
		
		public static function autocomplete(array $params = []): array
		{
			Log::$debug_log->trace("Itinerary::autocomplete()");
			Log::$debug_log->info($params);
			// ----
			
			$st = (isset($params["st"])) ? $params["st"] : "";
			$category_id = (isset($params["category_id"])) ? (int)$params["category_id"] : null;
			
			return self::formatAutocomplete(ItineraryModel::fetchItinerariesAutoComplete($st));
		}
		
		public static function get(array $params = []): array
		{
			Log::$debug_log->trace("Itinerary::get()");
			Log::$debug_log->info($params);
			
			$itineraries = [];
			
			if (isset($params)) {
				if (isset($params["user_id"]) && (int)$params["user_id"] > 0) {
					$results = ItineraryModel::fetchByUserId((int)$params["user_id"]);
				} else if (isset($params["customer_id"]) && (int)$params["customer_id"] > 0) {
					$results = ItineraryModel::fetchByCustomerId((int)$params["customer_id"]);
				} else {
					$results = ItineraryModel::fetchAll();
				}
			} else {
				$results = ItineraryModel::fetchAll();
			}
			
			foreach ($results AS $key => $itinerary) {
				$itineraries[] = self::formatItinerary($itinerary);
			}
			
			return $itineraries;
		}
		
		private static function formatAutocomplete(array $itineraries = []): array
		{
			Log::$debug_log->trace("Itinerary::edit()");
			Log::$debug_log->info($itineraries);
			// ----
			
			$data = [];
			$data["suggestions"] = [];
			
			foreach ($itineraries AS $k => $itinerary) {
				$l = (object)$itinerary;
				$value = utf8_encode($l->itinerary_name);
				
				array_push($data["suggestions"], [
					"value" => utf8_encode($value),
					"data" => self::formatItinerary($itinerary),
				]);
			}
			
			return $data;
		}
		
		private static function formatItinerary(array $itinerary = null): array
		{
			Log::$debug_log->trace("Itinerary::formatItinerary()");
			Log::$debug_log->info($itinerary);
			// ----
			
			if (is_null($itinerary)) {
				return [];
			}
			
			$customer = Customer::format($itinerary);
			$stage = Stage::format($itinerary);
			
			$itineraryId = (isset($itinerary["itinerary_id"])) ? (int)$itinerary["itinerary_id"] : null;
			$stageId = (isset($itinerary["itinerary_stage_id"])) ? (int)$itinerary["itinerary_stage_id"] : null;
			$customerId = (isset($itinerary["itinerary_customer_id"])) ? (int)$itinerary["itinerary_customer_id"] : null;
			$currencyId = (isset($itinerary["itinerary_currency_id"])) ? (int)$itinerary["itinerary_currency_id"] : null;
			$itineraryName = (isset($itinerary["itinerary_name"])) ? (string)$itinerary["itinerary_name"] : null;
			$itineraryStartDate = (isset($itinerary["itinerary_start_date"])) ? (string)$itinerary["itinerary_start_date"] : null;
			$itineraryEndDate = (isset($itinerary["itinerary_end_date"])) ? (string)$itinerary["itinerary_end_date"] : null;
			$itineraryBudget = (isset($itinerary["itinerary_budget"])) ? (string)$itinerary["itinerary_budget"] : null;
			$itineraryDateCreated = (isset($itinerary["itinerary_date_created"])) ? (string)$itinerary["itinerary_date_created"] : null;
			$itineraryDateModified = (isset($itinerary["itinerary_date_modified"])) ? (string)$itinerary["itinerary_date_modified"] : null;
			$itineraryNote = (isset($itinerary["itinerary_note"])) ? (string)$itinerary["itinerary_note"] : null;
			$itineraryJson = (isset($itinerary["itinerary_json"])) ? (string)$itinerary["itinerary_json"] : null;
			
			$formattedItinerary = array(
				"budget" => $itineraryBudget,
				"created_by" => $itineraryDateCreated,
				"customer" => $customer,
				"customer_id" => $customerId,
				"date_created" => $itinerary["itinerary_date_created"],
				"date_modified" => $itineraryDateModified,
				"enabled" => $itinerary["itinerary_enabled"],
				"end_date" => $itineraryEndDate,
				"id" => $itineraryId,
				"json" => $itineraryJson,
				"stage" => $stage,
				"stage_id" => $stageId,
				"start_date" => $itineraryStartDate,
				"modified_by" => $itinerary["itinerary_modified_by"],
				"name" => $itineraryName,
				"note" => $itineraryNote,
			);
			
			return $formattedItinerary;
		}
		
	}
