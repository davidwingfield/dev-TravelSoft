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
			$resultSet = SearchModel::fetchProductSearch($params);
			
			if (isset($resultSet["errors"])) {
				/**
				 * render invalid results json page
				 */
				header("Content-type:application/json");
				View::render_invalid_json($resultSet["errors"]);
				exit(1);
			}
			
			$results = self::formatHotelSearch($resultSet);
			
			/**
			 * render valid results json page
			 */
			header("Content-type:application/json");
			View::render_json($results);
			exit(0);
		}
		
		public static function hotels(array $params = []): void
		{
			$resultSet = SearchModel::fetchProductSearch($params);
			
			if (isset($resultSet["errors"])) {
				/**
				 * render invalid results json page
				 */
				header("Content-type:application/json");
				View::render_invalid_json($resultSet["errors"]);
				exit(1);
			}
			
			$results = self::formatHotelSearch($resultSet);
			
			/**
			 * render valid results json page
			 */
			header("Content-type:application/json");
			View::render_json($results);
			exit(0);
		}
		
		private static function formatHotelSearch(array $resultSet = []): array
		{
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
			
			return $temp;
		}
		
	}
