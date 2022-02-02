<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short SearchModel Description
	 * Long SearchModel Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class SearchModel extends Model
	{
		public static function fetchProductSearch(array $params = []): array
		{
			$errors = [];
			
			if (!isset($params["category_id"])) {
				$errors[] = array("message" => "Missing Category Details");
			} else {
				if ((int)$params["category_id"] !== 1) {
					$errors[] = array("message" => "Category Id Invalid: found - " . $params["category_id"] . " looking for - 1");
				} else {
					$category_id = Model::setInt((isset($params["category_id"])) ? $params["category_id"] : null);
				}
			}
			
			if (!isset($params["city_id"])) {
				$errors[] = array("message" => "Missing City Details");
			} else {
				if ((int)$params["city_id"] <= 0) {
					$errors[] = array("message" => "City Details Invalid: found - " . $params["city_id"] . " looking for - NUMBER GREATER THAN 0");
				} else {
					$city_id = Model::setInt((isset($params["city_id"])) ? $params["city_id"] : null);
				}
			}
			
			$pax = Model::setInt((isset($params["pax"])) ? $params["pax"] : 1);
			
			if (!isset($params["from_date"])) {
				$errors[] = array("message" => "Missing Arrival Details");
			} else {
				$pieces = explode('-', $params["from_date"]);
				$month = (isset($pieces[1]) && (int)$pieces[1] > 0) ? $pieces[1] : null;
				$day = (isset($pieces[2]) && (int)$pieces[2] > 0) ? $pieces[2] : null;
				$year = $pieces[0];
				
				if ($month < 10) {
					$month = "0" . (int)$month;
				}
				
				if ($day < 10) {
					$day = "0" . (int)$day;
				}
				
				if (checkdate($month, $day, $year)) {
					$from_date = "$year-$month-$day";
					$from_date = date("Y-m-d", strtotime($from_date));
				} else {
					$errors[] = array("message" => "Arrival Details Invalid: found " . $params["from_date"] . " - looking for - DATE OBJECT");
				}
			}
			
			if (!isset($params["to_date"])) {
				$errors[] = array("message" => "Missing Departure Details");
			} else {
				$pieces = explode('-', $params["to_date"]);
				$month = (isset($pieces[1]) && (int)$pieces[1] > 0) ? $pieces[1] : null;
				$day = (isset($pieces[2]) && (int)$pieces[2] > 0) ? $pieces[2] : null;
				$year = $pieces[0];
				
				if ($month < 10) {
					$month = "0" . (int)$month;
				}
				
				if ($day < 10) {
					$day = "0" . (int)$day;
				}
				
				if (checkdate($month, $day, $year)) {
					$to_date = "$year-$month-$day";
					$to_date = date("Y-m-d", strtotime($to_date));
				} else {
					$errors[] = array("message" => "Departure Details Invalid: found " . $params["to_date"] . " - looking for - DATE OBJECT");
				}
			}
			
			if (isset($from_date) && isset($to_date) && ($from_date > $to_date)) {
				$errors[] = array("message" => "Arrival Date is After Departure Date: from_date - $from_date to_date - $to_date");
			}
			
			if (count($errors) > 0) {
				Log::$debug_log->error("Search Error");
				foreach ($errors AS $error) {
					Log::$debug_log->warn($error["message"]);
				}
				
				return array();
			} else {
				if (isset($category_id) && isset($city_id)) {
					try {
						$sql = "CALL getRatesAndAvailability($category_id, $city_id, '$from_date', '$to_date', $pax);";
						
						$results = Model::$db->rawQuery($sql);
						
						if ($results) {
							return $results;
						}
						
						return array();
					} catch (Exception $e) {
						Log::$debug_log->error($e);
						
						return array();
					}
				} else {
					return array();
				}
				
			}
			
		}
		
	}
