<?php
	
	namespace Framework\App\Controllers;
	
	use Exception;
	use Framework\App\Models\AddressModel;
	use Framework\App\Models\CompanyModel;
	use Framework\App\Models\ContactModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short Company Description
	 * Long Company Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Company extends Controller
	{
		
		public function __construct()
		{
			parent::__construct();
		}
		
		public static function autocomplete(string $st = ""): array
		{
			return self::format_ac(CompanyModel::company_ac($st));
		}
		
		public static function validateName(array $args = []): array
		{
			$companies = array();
			if (isset($args["name"])) {
				$name = $args["name"];
				$results = CompanyModel::getByName($name);
				
				foreach ($results AS $k => $company) {
					$companies[] = self::format($company);
				}
			}
			
			// ----
			
			View::render_json($companies);
			exit(0);
		}
		
		public static function update(array $params = []): array
		{
			$companies = [];
			
			$results = CompanyModel::updateRecord($params);
			foreach ($results AS $company) {
				$companies[] = self::format($company);
			}
			
			return $companies;
		}
		
		public static function serveUpdate(array $params = [])
		{
			$companies = [];
			
			$results = CompanyModel::updateRecord($params);
			
			foreach ($results AS $company) {
				$companies[] = self::format($company);
			}
			// ----
			View::render_json($companies);
			exit(0);
		}
		
		public static function add(array $params): array
		{
			$companies = [];
			if (isset($params["name"])) {
				$results = CompanyModel::updateRecord($params);
				foreach ($results AS $company) {
					$companies[] = self::format($company);
				}
			}
			if (count($companies) === 1) {
				$companies = $companies[0];
			}
			
			return $companies;
		}
		
		private static function format_ac(array $companies = []): array
		{
			$data["suggestions"] = [];
			foreach ($companies AS $k => $company) {
				$l = (object)$company;
				$value = utf8_encode($l->company_name);
				array_push($data["suggestions"], [
					"value" => utf8_encode($value),
					"data" => self::format($company),
				]);
			}
			
			return $data;
		}
		
		public static function format(array $company): array
		{
			$address_list_formatted = [];
			$contact_list_formatted = [];
			
			$id = (int)$company["company_id"];
			
			// Addresses
			$addresses = AddressModel::getByCompanyId($id);
			//Log::$debug_log->trace($addresses);
			foreach ($addresses AS $k => $address) {
				$address_list_formatted[] = $address;
			}
			
			//Contacts
			$contacts = ContactModel::getByCompanyId($id);
			
			foreach ($contacts AS $k => $contact) {
				$contact_list_formatted[] = Contact::format($contact);
			}
			
			// Images
			$images = Image::getByCompanyId($id);
			$cover_image = "/public/img/unit_cover_placeholder.jpg";
			
			foreach ($images AS $k => $image) {
				if ($image["is_cover"] === 1) {
					$source = "unit";
					$sourceId = (isset($unit["unit_id"])) ? (int)$unit["unit_id"] : null;
					$fileName = (isset($image["name"])) ? $image["name"] : null;
					$fileExtension = (isset($image["extension"])) ? $image["extension"] : null;
					$filePath = (isset($image["name"])) ? $image["name"] : null;
					
					if (!is_null($sourceId) && !is_null($fileName) && !is_null($fileExtension) && !is_null($filePath)) {
						$cover_image = "/public/img/$source/$sourceId/$fileName.$fileExtension";
					}
				}
			}
			
			// Return
			return array(
				"id" => $company["company_id"],
				"name" => $company["company_name"],
				"phone_1" => $company["company_phone_1"],
				"phone_2" => $company["company_phone_2"],
				"fax" => $company["company_fax"],
				"website" => $company["company_website"],
				"cover_image" => $cover_image,
				"email" => $company["company_email"],
				"status_id" => $company["company_status_id"],
				"enabled" => $company["company_enabled"],
				"date_created" => $company["company_date_created"],
				"created_by" => $company["company_created_by"],
				"date_modified" => $company["company_date_modified"],
				"modified_by" => $company["company_modified_by"],
				"note" => $company["company_note"],
				"keywords" => (isset($company["company_keywords"])) ? $company["company_keywords"] : "",
				"description_long" => (isset($company["company_description_long"])) ? $company["company_description_long"] : "",
				"description_short" => (isset($company["company_description_short"])) ? $company["company_description_short"] : "",
				"logo" => (isset($company["company_logo"])) ? $company["company_logo"] : "/public/img/logo_placeholder.jpg",
				"images" => $images,
				"contacts" => $contact_list_formatted,
				"addresses" => $addresses,
			);
			
		}
		
	}
