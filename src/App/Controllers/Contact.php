<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\ContactModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short Contact Description
	 * Long Contact Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Contact extends Controller
	{
		public function __construct()
		{
			parent::__construct();
		}
		
		public static function serveUpdate(array $params = [])
		{
			$contacts = [];
			$results = ContactModel::update($params);
			foreach ($results AS $contact) {
				$contacts[] = self::format($contact);
			}
			// ----
			View::render_json($contacts);
			exit(0);
		}
		
		public static function get(array $params = null): array
		{
			$temp = array();
			
			if (isset($params["company_id"])) {
				$company_id = (int)$params["company_id"];
				$results = ContactModel::getByCompanyId($company_id);
			} else if (isset($params["contact_id"])) {
				$contact_id = (int)$params["contact_id"];
				$results = ContactModel::getByContactId($contact_id);
			} else {
				$results = ContactModel::getByContactId();
			}
			
			foreach ($results AS $contact) {
				$temp[] = self::format($contact);
			}
			//Log::$debug_log->trace($temp);
			
			// ----
			return $temp;
		}
		
		public static function serveGet(array $params = null): array
		{
			$temp = array();
			
			if (isset($params["company_id"])) {
				$company_id = (int)$params["company_id"];
				$results = ContactModel::getByCompanyId($company_id);
			} else if (isset($params["contact_id"])) {
				$contact_id = (int)$params["contact_id"];
				$results = ContactModel::get($contact_id);
			} else {
				$results = ContactModel::get();
			}
			
			foreach ($results AS $contact) {
				$temp[] = self::format($contact);
//                Log::$debug_log->trace($contact);
			}
			// ----
			View::render_json($temp);
			exit(0);
		}
		
		public static function format(array $contact = []): array
		{
			$formatted_contact_types = "";
			if (isset($contact["contact_id"])) {
				$contact_id = $contact["contact_id"];
				if (isset($contact["contact_contact_types_id"])) {
					$pieces = explode(",", trim($contact["contact_contact_types_id"]));
					if (count($pieces) > 0) {
						for ($n = 0; $n < count($pieces); $n++) {
							$contact_type_id = (int)$pieces[$n];
							$contact_type = ContactModel::getContactTypeById($contact_type_id);
							$name = "";
							
							if (isset($contact_type[0]["name"])) {
								$name = "" . $contact_type[0]["name"];
							} else if (isset($contact_type["name"])) {
								$name = "" . $contact_type["name"];
							}
							if ($name !== "") {
								$formatted_contact_types .= "$name<br>";
							}
						}
					}
				}
			}
			
			return array(
				"id" => (isset($contact["contact_id"])) ? (int)$contact["contact_id"] : null,
				"contact_types_id" => (isset($contact["contact_contact_types_id"])) ? $contact["contact_contact_types_id"] : null,
				"formatted_types" => ($formatted_contact_types !== "") ? $formatted_contact_types : "",
				"formatted_names" => (isset($contact["contact_name_first"]) && isset($contact["contact_name_last"])) ? "<span class='' style='white-space: nowrap;'>" . $contact["contact_name_first"] . " " . $contact["contact_name_last"] . "</span>" : "",
				"name_first" => (isset($contact["contact_name_first"])) ? $contact["contact_name_first"] : null,
				"name_last" => (isset($contact["contact_name_last"])) ? $contact["contact_name_last"] : null,
				"phone" => (isset($contact["contact_phone"])) ? $contact["contact_phone"] : null,
				"email" => (isset($contact["contact_email"])) ? $contact["contact_email"] : null,
				"enabled" => (isset($contact["contact_enabled"])) ? $contact["contact_enabled"] : 1,
				"date_created" => (isset($contact["contact_contact_types_id"])) ? $contact["contact_date_created"] : null,
				"date_modified" => (isset($contact["contact_contact_types_id"])) ? $contact["contact_date_modified"] : null,
				"created_by" => (isset($contact["contact_contact_types_id"])) ? $contact["contact_created_by"] : null,
				"modified_by" => (isset($contact["contact_contact_types_id"])) ? $contact["contact_modified_by"] : null,
				"note" => (isset($contact["contact_contact_types_id"])) ? $contact["contact_note"] : null,
			);
		}
		
		private static function format_contact_table(array $contact = []): array
		{
			return [];
		}
		
	}
