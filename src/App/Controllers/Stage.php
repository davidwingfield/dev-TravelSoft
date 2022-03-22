<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\StageModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short Stage Description
	 * Long Stage Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Stage extends Controller
	{
		public function __construct()
		{
			parent::__construct();
		}
		
		public static function get(array $params = []): array
		{
			Log::$debug_log->trace("Itinerary::get()");
			Log::$debug_log->info($params);
			// ----
			
			$stages = [];
			
			if (isset($params)) {
				if (isset($params["user_id"]) && (int)$params["user_id"] > 0) {
					$results = StageModel::fetchByUserId((int)$params["user_id"]);
				} else if (isset($params["stage_id"]) && (int)$params["stage_id"] > 0) {
					$results = StageModel::fetchByStageId((int)$params["stage_id"]);
				} else {
					$results = StageModel::fetchAll();
				}
			} else {
				$results = StageModel::fetchAll();
			}
			
			foreach ($results AS $key => $itinerary) {
				$stages[] = self::format($itinerary);
			}
			
			return $stages;
		}
		
		public static function format(array $stage = null): array
		{
			Log::$debug_log->trace("Stage::format()");
			Log::$debug_log->info($stage);
			
			if (is_null($stage)) {
				return [];
			}
			
			return array(
				"id" => $stage["stage_id"],
				"name" => $stage["stage_name"],
				"class" => $stage["stage_class"],
				"enabled" => $stage["stage_enabled"],
				"date_created" => $stage["stage_date_created"],
				"created_by" => $stage["stage_created_by"],
				"date_modified" => $stage["stage_date_modified"],
				"modified_by" => $stage["stage_modified_by"],
				"note" => $stage["stage_note"],
			);
		}
		
	}
