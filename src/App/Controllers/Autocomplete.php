<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\Core\Controller;
	use Framework\Logger\Log;
	
	/**
	 * Autocomplete
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Autocomplete extends Controller
	{
		/**
		 * get constructor methods
		 */
		public function __construct()
		{
			parent::__construct();
		}
		
		/**
		 * autocomplete  providers
		 */
		public function providers(): void
		{
			$st = "";
			extract($_GET);
			$results = Provider::autocomplete($st);
			header("Content-type:application/json");
			// ----
			echo json_encode($results);
			exit(0);
		}
		
		/**
		 * autocomplete cities
		 */
		public function cities(): void
		{
			$st = "";
			extract($_GET);
			$results = City::autocomplete($st);
			
			// ----
			header("Content-type:application/json");
			echo json_encode($results);
			exit(0);
		}
		
		/**
		 * autocomplete countries
		 */
		public function countries(): void
		{
			$st = "";
			extract($_GET);
			$results = Country::autocomplete($st);
			//Log::$debug_log->trace($results);
			
			// ----
			header("Content-type:application/json");
			echo json_encode($results);
			exit(0);
		}
		
		/**
		 * autocomplete products
		 */
		public function products(): void
		{
			$results = [];
			$category_id = null;
			$st = "";
			if (isset($_GET["category_id"])) {
				extract($_GET);
				
				$results = Product::autocomplete(array(
					"st" => $st,
					"category_id" => (int)$category_id,
				));
			}
			
			header("Content-type:application/json");
			// ----
			echo json_encode($results);
			exit(0);
		}
		
		/**
		 * autocomplete companies
		 */
		public function companies(): void
		{
			$st = "";
			extract($_GET);
			$results = Company::autocomplete($st);
			
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			echo json_encode($results);
			exit(0);
		}
		
		/**
		 * autocomplete vendors
		 */
		public function vendors(): void
		{
			$st = "";
			extract($_GET);
			$results = Vendor::autocomplete($st);
			
			// ----
			header("Content-type:application/json");
			echo json_encode($results);
			exit(0);
		}
		
		public function itineraries(): void
		{
			// Itinerary
			// itinerary
			// Itineraries
			// itineraries
			
			$st = "";
			extract($_GET);
			
			$results = Itinerary::autocomplete(array("st" => $st));
			
			// ----
			header("Content-type:application/json");
			echo json_encode($results);
			exit(0);
		}
		
		/**
		 * autocomplete locations
		 */
		public function locations(): void
		{
			$st = "";
			$default_display = "medium";
			extract($_GET);
			$results = Location::autocomplete($st, $default_display);
			
			//Log::$debug_log->trace($results);
			
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			echo json_encode($results);
			exit(0);
		}
		
		/**
		 * autocomplete seasons
		 */
		public function seasons(): void
		{
			$st = "";
			$category_id = 1;
			extract($_GET);
			$results = Season::autocomplete($st, $category_id);
			
			//Log::$debug_log->trace($results);
			
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			echo json_encode($results);
			exit(0);
		}
		
		/**
		 * autocomplete profiles
		 */
		public function profiles(): void
		{
			$st = "";
			$product_id = null;
			extract($_GET);
			$results = Profile::autocomplete($st, $product_id);
			
			//Log::$debug_log->trace($results);
			
			/**
			 * render profile json
			 */
			header("Content-type:application/json");
			echo json_encode($results);
			exit(0);
		}
		
		/**
		 * autocomplete units
		 */
		public function units(): void
		{
			$st = "";
			$category_id = 1;
			extract($_GET);
			$results = Unit::autocomplete($st, $category_id);
			
			//Log::$debug_log->trace($results);
			
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			echo json_encode($results);
			exit(0);
		}
		
		/**
		 * autocomplete variants
		 */
		public function variants(): void
		{
			$st = "";
			$category_id = 1;
			extract($_GET);
			$results = Variant::autocomplete($st, $category_id);
			
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			echo json_encode($results);
			exit(0);
		}
		
		/**
		 * autocomplete airports
		 */
		public function airports(): void
		{
			$st = "";
			
			extract($_GET);
			$results = Airport::autocomplete($st);
			
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			echo json_encode($results);
			exit(0);
		}
		
		/**
		 * autocomplete airports
		 */
		public function stations(): void
		{
			$st = "";
			
			extract($_GET);
			$results = Station::autocomplete($st);
			
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			echo json_encode($results);
			exit(0);
		}
		
		/**
		 * autocomplete locationSearch
		 */
		public function locationSearch(): void
		{
			$st = "";
			
			extract($_GET);
			$results = Location::autocompleteSearch($st);
			Log::$debug_log->trace($results);
			/**
			 * render results json page
			 */
			header("Content-type:application/json");
			echo json_encode($results);
			exit(0);
		}
		
	}
