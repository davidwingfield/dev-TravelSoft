<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\ProductModel;
	use Framework\App\Models\SearchModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short Search Description
	 * Long Search Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Search extends Controller
	{
		public function __construct()
		{
			parent::__construct();
		}
		
		public static function product(array $params = []): void
		{
			$results = [];
			
			$resultSet = SearchModel::fetchProductSearch($params);
			
			if (isset($resultSet["errors"])) {
				/**
				 * render invalid results json page
				 */
				header("Content-type:application/json");
				View::render_invalid_json($resultSet["errors"]);
				exit(1);
			}
			
			$counter = 0;
			foreach ($resultSet AS $k => $result) {
				if ($counter <= 0) {
					Log::$debug_log->trace($result);
				}
				$counter++;
			}
			//Log::$debug_log->trace($resultSet);
			
			//$results = self::formatHotelSearch($resultSet);
			
			/**
			 * render valid results json page
			 */
			header("Content-type:application/json");
			View::render_json($results);
			exit(0);
		}
		
		public static function hotels(array $params = []): void
		{
			$longDOW = array(
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
			);
			$shortDOW = array(
				"Sun",
				"Mon",
				"Tue",
				"Wed",
				"Thu",
				"Fri",
				"Sat",
			);
			$results = [];
			$resultSet = SearchModel::fetchProductSearch($params);
			//$results = self::formatHotelSearch($resultSet);
			//Log::$debug_log->trace($resultSet);
			
			foreach ($resultSet AS $result) {
				$address = "";
				$addressTemp = [];
				$country = Country::formatCountry($result);
				$province = Province::formatProvince($result);
				$city = City::formatCity($result);
				
				$date = (isset($result["inventory_date"])) ? $result["inventory_date"] : null;
				$dow = (isset($result["inventory_dow"])) ? (int)$result["inventory_dow"] : null;
				$dowShort = $shortDOW[$dow];
				$dowLong = $longDOW[$dow];
				$available = (isset($result["inventory_availability"])) ? $result["inventory_availability"] : null;
				
				$unitId = (isset($result["unit_id"])) ? (int)$result["unit_id"] : null;
				$unitname = (isset($result["unit_name"])) ? $result["unit_name"] : null;
				
				$productId = (isset($result["product_id"])) ? (int)$result["product_id"] : null;
				$productName = (isset($result["product_name"])) ? $result["product_name"] : null;
				$productStreet1 = (isset($result["product_street_1"])) ? $result["product_street_1"] : null;
				$productStreet2 = (isset($result["product_street_2"])) ? $result["product_street_2"] : null;
				$productPostalCode = (isset($result["product_postal_code"])) ? $result["product_postal_code"] : null;
				$productSKU = (isset($result["product_sku"])) ? $result["product_sku"] : null;
				
				$ratingId = (isset($result["product_rating_types_id"])) ? (int)$result["product_rating_types_id"] : null;
				
				$cityName = (isset($city["name"])) ? $city["name"] : null;
				$provinceName = (isset($province["name"])) ? $province["name"] : null;
				$provinceISO2 = (isset($province["iso2"])) ? $province["iso2"] : null;
				$provinceISO3 = (isset($province["iso3"])) ? $province["iso3"] : null;
				$countryName = (isset($country["name"])) ? $country["name"] : null;
				
				$cost = (isset($result["cost"])) ? (int)$result["cost"] : 1;
				$margin = (isset($result["margin"])) ? (int)$result["margin"] : 0;
				$price = (($margin / 100) * $cost) + $cost;
				
				if (!is_null($productStreet1) && $productStreet1 !== "") {
					$addressTemp[] = "<p class='m-0 p-0 text-uppercase text-truncate'>$productStreet1</p>";
				}
				
				if (!is_null($productStreet2) && $productStreet2 !== "") {
					$addressTemp[] = "<p class='m-0 p-0 text-uppercase text-truncate'>$productStreet2</p>";
				}
				
				if (count($addressTemp) > 0) {
					$address = $address . implode(", ", $addressTemp);
				}
				
				$addressTemp = [];
				if (!is_null($productPostalCode) && $productPostalCode !== "") {
					$addressTemp[] = $productPostalCode;
				}
				
				if (!is_null($cityName) && $cityName !== "") {
					$addressTemp[] = $cityName;
				}
				
				if (!is_null($provinceISO2) && $provinceISO2 !== "") {
					$addressTemp[] = $provinceISO2;
				} else if (!is_null($provinceISO3) && $provinceISO3 !== "") {
					$addressTemp[] = $provinceISO3;
				} else if (!is_null($provinceName) && $provinceName !== "") {
					$addressTemp[] = $provinceName;
				} else {
					Log::$debug_log->trace("Here");
					exit(0);
				}
				
				if (count($addressTemp) > 0) {
					$address = $address . "<p class='m-0 p-0 text-uppercase text-truncate'>" . implode(" ", $addressTemp) . "</p>";
				}
				
				$addressTemp = [];
				if (!is_null($countryName) && $countryName !== "") {
					$addressTemp[] = $countryName;
				}
				
				if (count($addressTemp) > 0) {
					$address = $address . "<p class='m-0 p-0 text-uppercase text-truncate'>" . implode("", $addressTemp) . "</p>";
				}
				
				if (!isset($results[$productId])) {
					$results[$productId] = array(
						"id" => $productId,
						"name" => $productName,
						"rating_id" => $ratingId,
						"sku" => $productSKU,
						"units" => array(),
					);
				}
				
				if (!isset($results[$productId]["units"][$unitId])) {
					
					$results[$productId]["units"][$unitId] = array(
						"id" => $unitId,
						"category_id" => $result["unit_category_id"],
						"min_pax" => $result["unit_min_pax"],
						"max_pax" => $result["unit_max_pax"],
						"min_nights" => $result["unit_min_nights"],
						"max_nights" => $result["unit_max_nights"],
						"api_id" => $result["unit_api_id"],
						"name" => $unitname,
						"room_code" => $result["unit_room_code"],
						"blurb" => $result["unit_blurb"],
						"cover_image" => $result["unit_cover_image"],
						"meeting_point" => $result["unit_meeting_point"],
						"time_notes" => $result["unit_time_notes"],
						"start_time" => $result["unit_start_time"],
						"end_time" => $result["unit_end_time"],
						"description_short" => $result["unit_description_short"],
						"description_long" => $result["unit_description_long"],
						"dates" => array(),
					);
				}
				
				if (!isset($results[$productId]["units"][$unitId]["dates"][$date])) {
					$results[$productId]["units"][$unitId]["dates"][$date] = array(
						"date" => $date,
						"dow" => $date,
						"dowShort" => $dowShort,
						"dowLong" => $dowLong,
						"available" => $available,
						"cost" => $cost,
						"margin" => $margin,
						"price" => $price,
					);
				}
			}
			
			$productDetail = [];
			foreach ($results AS $h => $product) {
				$units = (isset($product["units"])) ? $product["units"] : [];
				
				$unitDetail = [];
				foreach ($units AS $i => $unit) {
					$dates = (isset($unit["dates"])) ? $unit["dates"] : [];
					
					$dateDetail = [];
					foreach ($dates AS $j => $date) {
						$dateDetail[] = $date;
					}
					
					$unitDetail[] = array(
						"id" => $unit["id"],
						"category_id" => $unit["category_id"],
						"min_pax" => $unit["min_pax"],
						"max_pax" => $unit["max_pax"],
						"min_nights" => $unit["min_nights"],
						"max_nights" => $unit["max_nights"],
						"api_id" => $unit["api_id"],
						"name" => $unit["name"],
						"room_code" => $unit["room_code"],
						"blurb" => $unit["blurb"],
						"cover_image" => $unit["cover_image"],
						"meeting_point" => $unit["meeting_point"],
						"time_notes" => $unit["time_notes"],
						"start_time" => $unit["start_time"],
						"end_time" => $unit["end_time"],
						"description_short" => $unit["description_short"],
						"description_long" => $unit["description_long"],
						"dates" => $dateDetail,
					);
				}
				
				$productDetail[] = array(
					"id" => $product["id"],
					"address" => $address,
					"name" => $product["name"],
					"rating_id" => $product["rating_id"],
					"sku" => $product["sku"],
					"units" => $unitDetail,
				);
			}
			
			/**
			 * render valid results json page
			 */
			header("Content-type:application/json");
			View::render_json($productDetail);
			exit(0);
		}
		
		private static function formatHotelSearch(array $resultSet = []): array
		{
			if (is_null($resultSet)) {
				return [];
			}
			
			$temp = array(
				"products" => [],
			);
			
			$results = array();
			
			foreach ($resultSet AS $k => $result) {
				$address_short = [];
				$address_med = [];
				$address_long = [];
				$city = [];
				$province = [];
				$country = [];
				$product_id = (int)$result["product_id"];
				$unit_id = (int)$result["unit_id"];
				$day = $result["inventory_date"];
				$cost = (int)$result["cost"];
				$margin = (int)$result["margin"];
				$price = ($margin === 0) ? $cost : (($margin / 100) * $cost) + $cost;
				
				if (isset($result['product_street_1'])) {
					$street_1 = $result['product_street_1'];
					$address_short[] = $street_1;
					$address_med[] = $street_1;
					$address_long[] = $street_1;
				}
				
				if (isset($result['product_street_2'])) {
					$street_2 = $result['product_street_2'];
					$address_med[] = $street_2;
					$address_long[] = $street_2;
				}
				
				if (isset($result['city_name'])) {
					$city_name = $result['city_name'];
					$address_short[] = $city_name;
					$address_med[] = $city_name;
					$address_long[] = $city_name;
				}
				
				if (isset($result['product_postal_code'])) {
					$postal_code = $result['product_postal_code'];
					$address_short[] = $postal_code;
					$address_med[] = $postal_code;
					$address_long[] = $postal_code;
				}
				
				if (isset($result['province_name'])) {
					$province_name = $result['province_name'];
					$address_med[] = $province_name;
					$address_long[] = $province_name;
				}
				
				if (isset($result['province_iso2'])) {
					$province_iso2 = $result['province_iso2'];
					$address_short[] = $province_iso2;
				}
				
				if (isset($result['province_iso3'])) {
					$province_iso3 = $result['province_iso3'];
				}
				
				if (isset($result['country_name'])) {
					$country_name = $result['country_name'];
					$address_long[] = $country_name;
				}
				
				if (isset($result['country_iso2'])) {
					$country_iso2 = $result['country_iso2'];
					$address_short[] = $country_iso2;
				}
				
				if (isset($result['country_iso3'])) {
					$country_iso3 = $result['country_iso3'];
					$address_med[] = $country_iso3;
				}
				
				$addressShort = implode(", ", $address_short);
				$addressMedium = implode(", ", $address_med);
				$addressLong = implode(", ", $address_long);
				
				if (!isset($temp["products"][$product_id])) {
					$temp["products"][$product_id] = array(
						'id' => $result['product_id'],
						'currency_id' => $result['product_currency_id'],
						'provider_id' => $result['product_provider_id'],
						'vendor_id' => $result['product_vendor_id'],
						'rating_types_id' => $result['product_rating_types_id'],
						'name' => $result['product_name'],
						'description_short' => $result['product_description_short'],
						'description_long' => $result['product_description_long'],
						'keywords' => $result['product_keywords'],
						'sku' => $result['product_sku'],
						'depart_from' => $result['product_depart_from'],
						'arrive_to' => $result['product_arrive_to'],
						'depart_time' => $result['product_depart_time'],
						'arrive_time' => $result['product_arrive_time'],
						'provider_vendor_match' => $result['product_provider_vendor_match'],
						'use_provider_location_id' => $result['product_use_provider_location_id'],
						'day_span' => $result['product_day_span'],
						'cover_image' => $result['product_cover_image'],
						'api_id' => $result['product_api_id'],
						'from_api' => $result['product_from_api'],
						'hotel_code' => $result['product_hotel_code'],
						'amenities' => $result['product_amenities'],
						'address' => array(
							'short' => $addressShort,
							'medium' => $addressMedium,
							'long' => $addressLong,
							'street_1' => $result['product_street_1'],
							'street_2' => $result['product_street_2'],
							'postal_code' => $result['product_postal_code'],
							'country' => array(
								'id' => $result['country_id'],
								'currency_id' => $result['country_currency_id'],
								'sort_order' => $result['country_sort_order'],
								'name' => $result['country_name'],
								'iso2' => $result['country_iso2'],
								'iso3' => $result['country_iso3'],
								'blurb' => $result['country_blurb'],
								'enabled' => $result['country_enabled'],
								'date_created' => $result['country_date_created'],
								'created_by' => $result['country_created_by'],
								'date_modified' => $result['country_date_modified'],
								'modified_by' => $result['country_modified_by'],
								'note' => $result['country_note'],
							),
							'province' => array(
								'id' => $result['province_id'],
								'country_id' => $result['province_country_id'],
								'name' => $result['province_name'],
								'iso2' => $result['province_iso2'],
								'iso3' => $result['province_iso3'],
								'sort_order' => $result['province_sort_order'],
								'blurb' => $result['province_blurb'],
								'enabled' => $result['province_enabled'],
								'date_created' => $result['province_date_created'],
								'created_by' => $result['province_created_by'],
								'date_modified' => $result['province_date_modified'],
								'modified_by' => $result['province_modified_by'],
								'note' => $result['province_note'],
							),
							'city' => array(
								'id' => $result['city_id'],
								'province_id' => $result['city_province_id'],
								'country_id' => $result['city_country_id'],
								'sort_order' => $result['city_sort_order'],
								'name' => $result['city_name'],
								'blurb' => $result['city_blurb'],
								'enabled' => $result['city_enabled'],
								'date_created' => $result['city_date_created'],
								'created_by' => $result['city_created_by'],
								'date_modified' => $result['city_date_modified'],
								'modified_by' => $result['city_modified_by'],
								'note' => $result['city_note'],
							),
						
						),
						
						"units" => [],
					);
				}
				
				if (!isset($temp["products"][$product_id]["units"][$unit_id])) {
					$temp["products"][$product_id]["units"][$unit_id] = array(
						'id' => $result['unit_id'],
						'category_id' => $result['unit_category_id'],
						'min_pax' => $result['unit_min_pax'],
						'max_pax' => $result['unit_max_pax'],
						'min_nights' => $result['unit_min_nights'],
						'max_nights' => $result['unit_max_nights'],
						'api_id' => $result['unit_api_id'],
						'name' => $result['unit_name'],
						'room_code' => $result['unit_room_code'],
						'blurb' => $result['unit_blurb'],
						'cover_image' => $result['unit_cover_image'],
						'meeting_point' => $result['unit_meeting_point'],
						'time_notes' => $result['unit_time_notes'],
						'start_time' => $result['unit_start_time'],
						'end_time' => $result['unit_end_time'],
						'description_short' => $result['unit_description_short'],
						'description_long' => $result['unit_description_long'],
						"days" => [],
					);
				}
				
				if (!isset($temp["products"][$product_id]["units"][$unit_id]["days"][$day])) {
					$temp["products"][$product_id]["units"][$unit_id]["days"][$day] = array(
						"cost" => $cost,
						"margin" => $margin,
						"price" => (int)$price,
					);
				}
				
			}
			
			$productSearchResults = [];
			foreach ($temp AS $k => $productSearchResult) {
				$productSearchResults[] = $productSearchResult;
			}
			
			return $productSearchResults;
		}
		
	}
