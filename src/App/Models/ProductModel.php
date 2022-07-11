<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\App\Controllers\Airport;
	use Framework\App\Controllers\Location;
	use Framework\App\Controllers\Product;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short ProductModel Description
	 * Long ProductModel Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class ProductModel extends Model
	{
		
		protected static $dbTable = "product";
		protected static $dbFields = Array();
		protected static $sql = "
        	SELECT 				PRODUCT.id AS 'product_id',
								PRODUCT.category_id AS 'product_category_id',
								PRODUCT.pricing_strategy_types_id AS 'product_pricing_strategy_types_id',
								COALESCE(PRODUCT.status_types_id, 1) AS 'product_status_types_id',
								PRODUCT.currency_id AS 'product_currency_id',
								PRODUCT.location_id AS 'product_location_id',
								PRODUCT.provider_id AS 'product_provider_id',
								PRODUCT.city_id AS 'product_city_id',
								PRODUCT.vendor_id AS 'product_vendor_id',
								PRODUCT.rating_types_id AS 'product_rating_types_id',
								PRODUCT.name AS 'product_name',
								PRODUCT.description_short AS 'product_description_short',
								PRODUCT.description_long AS 'product_description_long',
								PRODUCT.sku AS 'product_sku',
								PRODUCT.depart_from AS 'product_depart_from',
								PRODUCT.arrive_to AS 'product_arrive_to',
								PRODUCT.depart_time AS 'product_depart_time',
								PRODUCT.arrive_time AS 'product_arrive_time',
								PRODUCT.provider_vendor_match AS 'product_provider_vendor_match',
								PRODUCT.day_span AS 'product_day_span',
								PRODUCT.cover_image AS 'product_cover_image',
								PRODUCT.api_id AS 'product_api_id',
								PRODUCT.from_api AS 'product_from_api',
								PRODUCT.hotel_code AS 'product_hotel_code',
								PRODUCT.sort_order AS 'product_sort_order',
								PRODUCT.enabled AS 'product_enabled',
								PRODUCT.date_created AS 'product_date_created',
								PRODUCT.created_by AS 'product_created_by',
								PRODUCT.date_modified AS 'product_date_modified',
								PRODUCT.modified_by AS 'product_modified_by',
								PRODUCT.note AS 'product_note',
								PRODUCT.keywords AS 'product_keywords',
								PRODUCT.amenities AS 'product_amenities',
								PRODUCT.street_1 AS 'product_street_1',
								PRODUCT.street_2 AS 'product_street_2',
								PRODUCT.postal_code AS 'product_postal_code',
								
								STATUS_TYPES.id AS 'status_types_id',
								STATUS_TYPES.name AS 'status_types_name',
								STATUS_TYPES.enabled AS 'status_types_enabled',
								STATUS_TYPES.date_created AS 'status_types_date_created',
								STATUS_TYPES.created_by AS 'status_types_created_by',
								STATUS_TYPES.date_modified AS 'status_types_date_modified',
								STATUS_TYPES.modified_by AS 'status_types_modified_by',
								STATUS_TYPES.note AS 'status_types_note',
								STATUS_TYPES.sort_order AS 'status_types_sort_order',
								
								CATEGORY.id AS 'category_id',
								CATEGORY.pricing_strategy_types_id AS 'category_pricing_strategy_types_id',
								CATEGORY.attribute_id AS 'category_attribute_id',
								CATEGORY.name AS 'category_name',
								CATEGORY.icon AS 'category_icon',
								CATEGORY.view_product_index AS 'category_view_product_index',
								CATEGORY.view_product_index_filter AS 'category_view_product_index_filter',
								CATEGORY.view_product_index_search AS 'category_view_product_index_search',
								CATEGORY.view_product_edit AS 'category_view_product_edit',
								CATEGORY.view_product_package_edit AS 'category_view_product_package_edit',
								CATEGORY.view_product_package_index AS 'category_view_product_package_index',
								CATEGORY.all_day AS 'category_all_day',
								CATEGORY.overlap AS 'category_overlap',
								CATEGORY.editable AS 'category_editable',
								CATEGORY.duration_editable AS 'category_duration_editable',
								CATEGORY.start_editable AS 'category_start_editable',
								CATEGORY.display AS 'category_display',
								CATEGORY.background_color AS 'category_background_color',
								CATEGORY.text_color AS 'category_text_color',
								CATEGORY.border_color AS 'category_border_color',
								CATEGORY.sort_order AS 'category_sort_order',
								CATEGORY.enabled AS 'category_enabled',
								CATEGORY.date_created AS 'category_date_created',
								CATEGORY.created_by AS 'category_created_by',
								CATEGORY.date_modified AS 'category_date_modified',
								CATEGORY.modified_by AS 'category_modified_by',
								CATEGORY.note AS 'category_note',
        	       				COUNTRY.id AS 'country_id',
								COUNTRY.currency_id AS 'country_currency_id',
								COUNTRY.sort_order AS 'country_sort_order',
								COUNTRY.name AS 'country_name',
								COUNTRY.iso2 AS 'country_iso2',
								COUNTRY.iso3 AS 'country_iso3',
								COUNTRY.blurb AS 'country_blurb',
								COUNTRY.enabled AS 'country_enabled',
								COUNTRY.date_created AS 'country_date_created',
								COUNTRY.created_by AS 'country_created_by',
								COUNTRY.date_modified AS 'country_date_modified',
								COUNTRY.modified_by AS 'country_modified_by',
								COUNTRY.note AS 'country_note',
        	       				PROVINCE.id AS 'province_id',
								PROVINCE.country_id AS 'province_country_id',
								PROVINCE.name AS 'province_name',
								PROVINCE.iso2 AS 'province_iso2',
								PROVINCE.iso3 AS 'province_iso3',
								PROVINCE.sort_order AS 'province_sort_order',
								PROVINCE.blurb AS 'province_blurb',
								PROVINCE.enabled AS 'province_enabled',
								PROVINCE.date_created AS 'province_date_created',
								PROVINCE.created_by AS 'province_created_by',
								PROVINCE.date_modified AS 'province_date_modified',
								PROVINCE.modified_by AS 'province_modified_by',
								PROVINCE.note AS 'province_note',
        	       				CITY.id AS 'city_id',
								CITY.province_id AS 'city_province_id',
								CITY.country_id AS 'city_country_id',
								CITY.sort_order AS 'city_sort_order',
								CITY.name AS 'city_name',
								CITY.blurb AS 'city_blurb',
								CITY.is_capital AS 'city_is_capital',
								CITY.enabled AS 'city_enabled',
								CITY.date_created AS 'city_date_created',
								CITY.created_by AS 'city_created_by',
								CITY.date_modified AS 'city_date_modified',
								CITY.modified_by AS 'city_modified_by',
								CITY.note AS 'city_note'
            FROM 				product PRODUCT
            JOIN 				category CATEGORY ON CATEGORY.id = PRODUCT.category_id
            JOIN 				status_types STATUS_TYPES ON STATUS_TYPES.id = COALESCE(PRODUCT.status_types_id, 1)
        	LEFT JOIN			city CITY ON CITY.id = PRODUCT.city_id
        	LEFT JOIN			province PROVINCE ON PROVINCE.id = CITY.province_id
        	LEFT JOIN			country COUNTRY ON COUNTRY.id = CITY.country_id
            WHERE   			PRODUCT.enabled = 1
        ";
		
		public static function get(int $id = null): array
		{
			$whereCondition = "";
			if (!is_null($id)) {
				$whereCondition = "AND   PRODUCT.id = $id";
			}
			
			try {
				$sql = self::$sql . $whereCondition;
				
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
		public static function getOne(int $id = null): array
		{
			try {
				if (!is_null($id)) {
					Model::$db->where("id", $id);
				}
				
				Model::$db->where("enabled", 1);
				
				return Model::$db->getOne(self::$dbTable);
			} catch (Exception $e) {
				return [];
			}
		}
		
		public static function updateProductRecord(array $product = []): array
		{
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			$id = Model::setInt((isset($product["id"])) ? $product["id"] : null);
			$category_id = Model::setInt((isset($product["category_id"])) ? $product["category_id"] : 9);
			$currency_id = Model::setInt((isset($product["currency_id"])) ? $product["currency_id"] : 5);
			$pricing_strategy_types_id = Model::setInt((isset($product["pricing_strategy_types_id"])) ? $product["pricing_strategy_types_id"] : null);
			$status_types_id = Model::setInt((isset($product["status_types_id"])) ? $product["status_types_id"] : 1);
			$city_id = Model::setInt((isset($product["city_id"])) ? $product["city_id"] : null);
			$location_id = Model::setInt((isset($product["location_id"])) ? $product["location_id"] : 1);
			$provider_id = Model::setInt((isset($product["provider_id"])) ? $product["provider_id"] : null);
			$vendor_id = Model::setInt((isset($product["vendor_id"])) ? $product["vendor_id"] : null);
			$rating_types_id = Model::setInt((isset($product["rating_types_id"])) ? $product["rating_types_id"] : 5);
			$day_span = Model::setInt((isset($product["day_span"])) ? $product["day_span"] : 1);
			$depart_from = Model::setInt((isset($product["depart_from"])) ? $product["depart_from"] : null);
			$arrive_to = Model::setInt((isset($product["arrive_to"])) ? $product["arrive_to"] : null);
			
			$name = Model::setString((isset($product["name"])) ? $product["name"] : null);
			$keywords = Model::setString((isset($product["keywords"])) ? $product["keywords"] : null);
			$sku = Model::setString((isset($product["sku"])) ? $product["sku"] : null);
			$depart_date = Model::setString((isset($product["depart_date"])) ? $product["depart_date"] : null);
			$depart_time = Model::setString((isset($product["depart_time"])) ? $product["depart_time"] : null);
			$arrive_date = Model::setString((isset($product["arrive_date"])) ? $product["arrive_date"] : null);
			$arrive_time = Model::setString((isset($product["arrive_time"])) ? $product["arrive_time"] : null);
			$hotel_code = Model::setString((isset($product["hotel_code"])) ? $product["hotel_code"] : null);
			$amenities = Model::setString((isset($product["amenities"])) ? $product["amenities"] : null);
			$street_1 = Model::setString((isset($product["street_1"])) ? $product["street_1"] : null);
			$street_2 = Model::setString((isset($product["street_2"])) ? $product["street_2"] : null);
			$postal_code = Model::setString((isset($product["postal_code"])) ? $product["postal_code"] : null);
			
			$provider_vendor_match = Model::setBool((isset($product["provider_vendor_match"])) ? $product["provider_vendor_match"] : 1);
			$use_provider_location_id = Model::setBool((isset($product["use_provider_location_id"])) ? $product["use_provider_location_id"] : 0);
			$from_api = Model::setBool((isset($product["from_api"])) ? $product["from_api"] : 0);
			
			$description_short = Model::setString((isset($product["description_short"])) ? $product["description_short"] : null);
			$enabled = Model::setBool((isset($product["enabled"])) ? $product["enabled"] : null);
			$note = Model::setLongText((isset($product["note"])) ? $product["note"] : null);
			$description_long = Model::setLongText((isset($product["description_long"])) ? $product["description_long"] : null);
			
			$api_id = Model::setInt((isset($product["api_id"])) ? $product["api_id"] : null);
			$sort_order = Model::setInt((isset($product["sort_order"])) ? $product["sort_order"] : null);
			
			$sql = "
				INSERT INTO product (
					id, category_id, pricing_strategy_types_id, status_types_id, city_id,
					currency_id, location_id, provider_id, vendor_id, rating_types_id,
					name, description_short, description_long, keywords, sku,
					depart_from, depart_date, depart_time, arrive_to, arrive_date,
					arrive_time, provider_vendor_match, use_provider_location_id, day_span, cover_image,
					api_id, from_api, hotel_code, sort_order, amenities,
					enabled, date_created, created_by, date_modified, modified_by,
					note, street_1, street_2, postal_code
				) VALUES (
					$id, $category_id, $pricing_strategy_types_id, $status_types_id, $city_id,
					$currency_id, $location_id, $provider_id, $vendor_id, $rating_types_id,
					$name, $description_short, $description_long, $keywords, $sku,
					$depart_from, $depart_date, $depart_time, $arrive_to, $arrive_date,
					$arrive_time, $provider_vendor_match, $use_provider_location_id, $day_span, '/public/img/placeholder.jpg',
					$api_id, $from_api, $hotel_code, $sort_order, $amenities,
					$enabled, CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP, $modified_by,
					$note, $street_1, $street_2, $postal_code
				)
				ON DUPLICATE KEY UPDATE
				    status_types_id = VALUES(status_types_id),
				    city_id = VALUES(city_id),
					currency_id = VALUES(currency_id),
				    location_id = VALUES(location_id),
				    provider_id = VALUES(provider_id),
				    vendor_id = VALUES(vendor_id),
				    rating_types_id = VALUES(rating_types_id),
					name = VALUES(name),
				    description_short = VALUES(description_short),
				    description_long = VALUES(description_long),
				    keywords = VALUES(keywords),
				    sku = VALUES(sku),
					depart_from = VALUES(depart_from),
				    depart_date = VALUES(depart_date),
				    depart_time = VALUES(depart_time),
				    arrive_to = VALUES(arrive_to),
				    arrive_date = VALUES(arrive_date),
					arrive_time = VALUES(arrive_time),
				    provider_vendor_match = VALUES(provider_vendor_match),
				    use_provider_location_id = VALUES(use_provider_location_id),
				    day_span = VALUES(day_span),
				    cover_image = VALUES(cover_image),
				    from_api = VALUES(from_api),
				    hotel_code = VALUES(hotel_code),
				    sort_order = VALUES(sort_order),
				    amenities = VALUES(amenities),
					enabled = VALUES(enabled),
				    date_modified = VALUES(date_modified),
				    modified_by = VALUES(modified_by),
					note = VALUES(note),
				    street_1 = VALUES(street_1),
				    street_2 = VALUES(street_2),
				    postal_code = VALUES(postal_code);
			";
			
			try {
				Model::$db->rawQuery($sql);
				$product_id = Model::$db->getInsertId();
				
				if ($product_id) {
					return self::get($product_id);
				} else {
					Log::$debug_log->error("missing product id");
					
					return [];
				}
				
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
		public static function updateAssignSeasons(array $product = []): array
		{
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			$product_id = Model::setInt((isset($product["product_id"])) ? $product["product_id"] : null);
			$season_id = Model::setInt((isset($product["season_id"])) ? $product["season_id"] : null);
			$days = (isset($product["days"])) ? $product["days"] : [];
			$note = Model::setLongText((isset($product["note"])) ? $product["note"] : null);
			$enabled = Model::setBool((isset($matrix["enabled"])) ? $matrix["enabled"] : 1);
			
			$dateFields = [];
			
			foreach ($days AS $k => $date) {
				array_push($dateFields, "('$date', $product_id, $season_id, $enabled, CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP, $modified_by, $note)");
			}
			
			$dateValues = implode(", ", $dateFields);
			
			try {
				$sql = "
					INSERT INTO product_calendar (
						date, product_id, season_id, enabled, date_created,
						created_by, date_modified, modified_by, note
					)
					VALUES
						$dateValues
					ON DUPLICATE KEY UPDATE
						season_id = VALUES(season_id),
						note = VALUES(note),
						enabled = VALUES(enabled),
						modified_by = VALUES(modified_by),
						date_modified = VALUES(date_modified);
				";
				Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
			
			return array(
				"product_id" => $product_id,
				"season_id" => $season_id,
				"days" => implode(", ", $dateFields),
			);
		}
		
		public static function updateAssignProfiles(array $product = []): array
		{
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			$product_id = Model::setInt((isset($product["product_id"])) ? $product["product_id"] : null);
			$unit_id = Model::setInt((isset($product["unit_id"])) ? $product["unit_id"] : null);
			$profile_id = Model::setInt((isset($product["profile_id"])) ? $product["profile_id"] : null);
			
			$quantity_used = Model::setInt((isset($product["quantity_used"])) ? $product["quantity_used"] : 0);
			$quantity_released = Model::setInt((isset($product["quantity_released"])) ? $product["quantity_released"] : 0);
			
			$days = (isset($product["days"])) ? $product["days"] : [];
			$note = Model::setLongText((isset($product["note"])) ? $product["note"] : null);
			$description = Model::setLongText((isset($product["description"])) ? $product["description"] : null);
			$enabled = Model::setBool((isset($matrix["enabled"])) ? $matrix["enabled"] : 1);
			
			$dateFields = [];
			
			foreach ($days AS $k => $date) {
				array_push($dateFields, "('$date', $product_id, $unit_id, $profile_id, $description,
					$quantity_used, $quantity_released, $enabled, CURRENT_TIMESTAMP, $created_by,
					CURRENT_TIMESTAMP, $modified_by, $note)"
				);
			}
			
			if (count($dateFields) > 0) {
				$dateValues = implode(", ", $dateFields);
				
				try {
					$sql = "
					INSERT INTO inventory (
						date, product_id, unit_id, profile_id, description,
						quantity_used, quantity_released, enabled, date_created, created_by,
						date_modified, modified_by, note
					)
					VALUES
						$dateValues
					ON DUPLICATE KEY UPDATE
						description = VALUES(description),
						quantity_released = VALUES(quantity_released),
					    quantity_used = VALUES(quantity_used),
						note = VALUES(note),
						enabled = VALUES(enabled),
						modified_by = VALUES(modified_by),
						date_modified = VALUES(date_modified);
				";
					
					Model::$db->rawQuery($sql);
					
					return $product;
				} catch (Exception $e) {
					Log::$debug_log->error($e->getMessage());
					
					return [];
				}
			} else {
				Log::$debug_log->error("No Date");
				Log::$debug_log->trace($product);
				
				return [];
			}
		}
		
		public static function product_ac(string $st = "", int $category_id = null): array
		{
			if (is_null($category_id)) {
				return [];
			}
			
			$searchTerm = addslashes($st);
			$sql = self::$sql . "
                    AND			PRODUCT.name LIKE '%$searchTerm%'
                    AND         PRODUCT.category_id = $category_id
                    ORDER BY    LENGTH(PRODUCT.name), CAST(PRODUCT.name AS UNSIGNED), PRODUCT.name ASC
                    LIMIT 20;";
			
			try {
				
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
		public static function addRecord(array $product = null): array
		{
			/*
			Log::$debug_log->info("ProductModel::addRecord(product)");
			Log::$debug_log->trace($product);
			//*/
			
			$location_detail = array();
			
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			
			$id = Model::setInt((isset($product["id"])) ? $product["id"] : null);
			$category_id = Model::setInt((isset($product["category_id"])) ? $product["category_id"] : null);
			$city_id = Model::setInt((isset($product["city_id"])) ? $product["city_id"] : null);
			
			$pricing_strategy_types_id = Model::setInt((isset($product["pricing_strategy_types_id"])) ? $product["pricing_strategy_types_id"] : null);
			$status_types_id = Model::setInt((isset($product["status_types_id"])) ? $product["status_types_id"] : 1);
			$currency_id = Model::setInt((isset($product["currency_id"])) ? $product["currency_id"] : 5);
			$provider_id = Model::setInt((isset($product["provider_id"])) ? $product["provider_id"] : null);
			$vendor_id = Model::setInt((isset($product["vendor_id"])) ? $product["vendor_id"] : null);
			$rating_types_id = Model::setInt((isset($product["rating_types_id"])) ? $product["rating_types_id"] : 5);
			$api_id = Model::setInt((isset($product["api_id"])) ? $product["api_id"] : null);
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			$day_span = Model::setInt((isset($product["day_span"])) ? $product["day_span"] : 1);
			
			$provider_vendor_match = Model::setBool((isset($product["provider_vendor_match"])) ? $product["provider_vendor_match"] : 0);
			$enabled = Model::setBool((isset($product["enabled"])) ? $product["enabled"] : 1);
			$use_provider_location_id = Model::setBool((isset($product["use_provider_location_id"])) ? $product["use_provider_location_id"] : 0);
			
			$sku = Model::setString((isset($product["sku"])) ? $product["sku"] : null);
			
			$street_1 = Model::setString((isset($product["street_1"])) ? $product["street_1"] : null);
			$street_2 = Model::setString((isset($product["street_2"])) ? $product["street_2"] : null);
			$postal_code = Model::setString((isset($product["postal_code"])) ? $product["postal_code"] : null);
			
			$name = Model::setString((isset($product["name"])) ? $product["name"] : null);
			
			$productName = Model::setString((isset($product["name"])) ? $product["name"] : null);
			
			$depart_from = Model::setInt((isset($product["depart_from"])) ? $product["depart_from"] : null);
			$arrive_to = Model::setInt((isset($product["arrive_to"])) ? $product["arrive_to"] : null);
			$depart_time = Model::setString((isset($product["depart_time"])) ? $product["depart_time"] : null);
			$arrive_time = Model::setString((isset($product["arrive_time"])) ? $product["arrive_time"] : null);
			$hotel_code = Model::setString((isset($product["hotel_code"])) ? $product["hotel_code"] : null);
			$depart_date = Model::setString((isset($product["depart_date"])) ? $product["depart_date"] : null);
			$arrive_date = Model::setString((isset($product["arrive_date"])) ? $product["arrive_date"] : null);
			
			$note = Model::setLongText((isset($product["note"])) ? $product["note"] : null);
			$description_long = Model::setLongText((isset($product["description_long"])) ? $product["description_long"] : null);
			$description_short = Model::setLongText((isset($product["description_short"])) ? $product["description_short"] : null);
			$keywords = Model::setLongText((isset($product["keywords"])) ? $product["keywords"] : null);
			$amenities = Model::setLongText((isset($product["amenities"])) ? $product["amenities"] : null);
			
			$location = [];
			$location["name"] = (string)"City Center";
			$location["city_id"] = (int)$city_id;
			$location["location_types_id"] = (isset($location_detail["street_1"])) ? $location_detail["street_1"] : (isset($product["street_1"])) ? $product["street_1"] : null;
			
			//Log::$debug_log->trace($location_detail);
			
			switch ($category_id) {
				case 1:
					$location_detail = Location::getByCityId($city_id, $name);
					$location["street_1"] = $street_1;
					$location["street_2"] = $street_2;
					$location["zipcode"] = $postal_code;
					$location["name"] = (isset($location_detail["name"])) ? $location_detail["name"] : (isset($product["name"])) ? $product["name"] : "City Center";
					$location["city_id"] = (int)$city_id;
					$location["location_types_id"] = (isset($location_detail["location_types_id"])) ? $location_detail["location_types_id"] : 2;
					
					if (count($location_detail) <= 0) {
						$location_detail = Location::update($location);
						
						if (count($location_detail) > 0) {
							$location_detail = $location_detail[0];
						}
					}
					
					break;
				case 2:
					$location_detail = Location::getByCityId($city_id, $name);
					
					$airport = Airport::get((int)$depart_from);
					
					if (count($airport) > 0) {
						$airport = $airport[0];
					} else {
					
					}
					
					$name = (isset($airport["name"])) ? $airport["name"] : "Airport";
					
					$location["street_1"] = $street_1;
					$location["street_2"] = $street_2;
					$location["zipcode"] = $postal_code;
					$location["name"] = $name;
					$location["city_id"] = (int)$city_id;
					$location["location_types_id"] = (isset($location_detail["location_types_id"])) ? $location_detail["location_types_id"] : 3;
					
					if (count($location_detail) <= 0) {
						$location_detail = Location::update($location);
						
						if (count($location_detail) > 0) {
							$location_detail = $location_detail[0];
						}
					}
					break;
				case 3:
					$location_detail = Location::getByCityId($city_id, $name);
					
					$location["location_types_id"] = (isset($location_detail["location_types_id"])) ? $location_detail["location_types_id"] : 6;
					if (count($location_detail) <= 0) {
						$location_detail = Location::update($location);
						
						if (count($location_detail) > 0) {
							$location_detail = $location_detail[0];
						}
					}
					break;
				case 5:
					$location_detail = Location::getByCityId($city_id, $name);
					
					$location["location_types_id"] = (isset($location_detail["location_types_id"])) ? $location_detail["location_types_id"] : 4;
					if (count($location_detail) <= 0) {
						$location_detail = Location::update($location);
						
						if (count($location_detail) > 0) {
							$location_detail = $location_detail[0];
						}
					}
					
					break;
				case 6:
					Log::$debug_log->trace($city_id);
					Log::$debug_log->trace($name);
					// ----
					
					$location_detail = Location::getByCityId($city_id, $name);
					
					$location["location_types_id"] = (isset($location_detail["location_types_id"])) ? $location_detail["location_types_id"] : 17;
					if (count($location_detail) <= 0) {
						$location_detail = Location::update($location);
						
						if (count($location_detail) > 0) {
							$location_detail = $location_detail[0];
						}
					}
					break;
				default:
					$location_detail = Location::getByCityId($location["city_id"], $location["name"]);
					
					if (count($location_detail) <= 0) {
						$location_detail = Location::update($location);
						if (count($location_detail) > 0) {
							$location_detail = $location_detail[0];
						}
					}
			}
			
			//Log::$debug_log->trace($location_detail);
			
			if (isset($location_detail["id"])) {
				$location_id = (int)$location_detail["id"];
				
				$sql = "
                	INSERT INTO product (
                    id, category_id, pricing_strategy_types_id, status_types_id, currency_id,
                    location_id, provider_id, vendor_id, rating_types_id, name, city_id,
                    description_short, description_long, keywords, sku, depart_from,
                    arrive_to, depart_time, arrive_time, provider_vendor_match, use_provider_location_id,
                    day_span, cover_image, api_id, from_api, hotel_code,
                    sort_order, amenities, enabled, date_created, created_by, date_modified,
                    modified_by, note, street_1, street_2, postal_code, depart_date, arrive_date
                ) VALUES (
                    $id, $category_id, $pricing_strategy_types_id, $status_types_id, $currency_id,
                    $location_id, $provider_id, $vendor_id, $rating_types_id, $productName, $city_id,
                    $description_short, $description_long, $keywords, $sku, $depart_from,
                    $arrive_to, $depart_time, $arrive_time, $provider_vendor_match, $use_provider_location_id,
                    $day_span, '/public/img/placeholder.jpg', $api_id, 0, $hotel_code,
                    999, $amenities, $enabled, CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP,
                    $modified_by, $note, $street_1, $street_2, $postal_code, $depart_date, $arrive_date
                )
                ON DUPLICATE KEY UPDATE
                    category_id = VALUES(category_id),
                    city_id = VALUES(city_id),
                    pricing_strategy_types_id = VALUES(pricing_strategy_types_id),
                    status_types_id = VALUES(status_types_id),
                    currency_id = VALUES(currency_id),
                    location_id = VALUES(location_id),
                    provider_id = VALUES(provider_id),
                    vendor_id = VALUES(vendor_id),
                    rating_types_id = VALUES(rating_types_id),
                    name = VALUES(name),
                    description_short = VALUES(description_short),
                    description_long = VALUES(description_long),
                    keywords = VALUES(keywords),
                    amenities = VALUES(amenities),
                    sku = VALUES(sku),
                    depart_date = VALUES(depart_date),
                    arrive_date = VALUES(arrive_date),
                    depart_from = VALUES(depart_from),
                    arrive_to = VALUES(arrive_to),
                    depart_time = VALUES(depart_time),
                    arrive_time = VALUES(arrive_time),
                    provider_vendor_match = VALUES(provider_vendor_match),
                    use_provider_location_id = VALUES(use_provider_location_id),
                    day_span = VALUES(day_span),
                    cover_image = VALUES(cover_image),
                    api_id = VALUES(api_id),
                    from_api = VALUES(from_api),
                    hotel_code = VALUES(hotel_code),
                    sort_order = VALUES(sort_order),
                    note = VALUES(note),
                    enabled = VALUES(enabled),
                    modified_by = VALUES(modified_by),
                    date_modified = VALUES(date_modified),
					street_1 = VALUES(street_1),
					street_2 = VALUES(street_2),
					postal_code = VALUES(postal_code);
            	";
				
				Log::$debug_log->trace($sql);
				
				try {
					//Log::$debug_log->trace($sql);
					
					Model::$db->rawQuery($sql);
					$product_id = Model::$db->getInsertId();
					
					if ($product_id) {
						return self::get($product_id);
					} else {
						Log::$debug_log->error("missing product id");
						
						return [];
					}
					
				} catch (Exception $e) {
					Log::$debug_log->error($e->getMessage());
					
					return [];
				}
			}
			
			return [];
		}
		
		public static function updateProductMetaData($product): array
		{
			/*
			Log::$debug_log->info("ProductModel::addRecord(product)");
			Log::$debug_log->trace($product);
			//*/
			if (!isset($product["id"])) {
				return [];
			}
			$location_detail = array();
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$id = Model::setInt((isset($product["id"])) ? $product["id"] : null);
			$category_id = Model::setInt((isset($product["category_id"])) ? $product["category_id"] : null);
			$city_id = Model::setInt((isset($product["city_id"])) ? $product["city_id"] : null);
			$pricing_strategy_types_id = Model::setInt((isset($product["pricing_strategy_types_id"])) ? $product["pricing_strategy_types_id"] : null);
			$status_types_id = Model::setInt((isset($product["status_types_id"])) ? $product["status_types_id"] : 1);
			$currency_id = Model::setInt((isset($product["currency_id"])) ? $product["currency_id"] : 5);
			$provider_id = Model::setInt((isset($product["provider_id"])) ? $product["provider_id"] : null);
			$vendor_id = Model::setInt((isset($product["vendor_id"])) ? $product["vendor_id"] : null);
			$rating_types_id = Model::setInt((isset($product["rating_types_id"])) ? $product["rating_types_id"] : 5);
			$api_id = Model::setInt((isset($product["api_id"])) ? $product["api_id"] : null);
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			$day_span = Model::setInt((isset($product["day_span"])) ? $product["day_span"] : 1);
			$provider_vendor_match = Model::setBool((isset($product["provider_vendor_match"])) ? $product["provider_vendor_match"] : 0);
			$enabled = Model::setBool((isset($product["enabled"])) ? $product["enabled"] : 1);
			
			$use_provider_location_id = Model::setBool((isset($product["use_provider_location_id"])) ? $product["use_provider_location_id"] : 0);
			$sku = Model::setString((isset($product["sku"])) ? $product["sku"] : null);
			$street_1 = Model::setString((isset($product["street_1"])) ? $product["street_1"] : null);
			$street_2 = Model::setString((isset($product["street_2"])) ? $product["street_2"] : null);
			$postal_code = Model::setString((isset($product["postal_code"])) ? $product["postal_code"] : null);
			$name = Model::setString((isset($product["name"])) ? $product["name"] : null);
			$productName = Model::setString((isset($product["name"])) ? $product["name"] : null);
			$depart_from = Model::setInt((isset($product["depart_from"])) ? $product["depart_from"] : null);
			$arrive_to = Model::setInt((isset($product["arrive_to"])) ? $product["arrive_to"] : null);
			$depart_time = Model::setString((isset($product["depart_time"])) ? $product["depart_time"] : null);
			$arrive_time = Model::setString((isset($product["arrive_time"])) ? $product["arrive_time"] : null);
			$hotel_code = Model::setString((isset($product["hotel_code"])) ? $product["hotel_code"] : null);
			$depart_date = Model::setString((isset($product["depart_date"])) ? $product["depart_date"] : null);
			$arrive_date = Model::setString((isset($product["arrive_date"])) ? $product["arrive_date"] : null);
			
			$cover_image = Model::setString((isset($product["cover_image"])) ? $product["cover_image"] : "/public/img/placeholder.jpg");
			$note = Model::setLongText((isset($product["note"])) ? $product["note"] : null);
			$description_long = Model::setLongText((isset($product["description_long"])) ? $product["description_long"] : null);
			$description_short = Model::setLongText((isset($product["description_short"])) ? $product["description_short"] : null);
			$keywords = Model::setLongText((isset($product["keywords"])) ? $product["keywords"] : null);
			$amenities = Model::setLongText((isset($product["amenities"])) ? $product["amenities"] : null);
			
			$sql = "
				UPDATE 		product
				SET
							description_short = $description_short,
							description_long = $description_long,
							keywords = $keywords,
							cover_image = $cover_image,
							amenities = $amenities,
							enabled = $enabled,
							date_modified = CURRENT_TIMESTAMP,
							modified_by = $modified_by,
							note = $note
				WHERE 		id = $id;
			";
			
			try {
				//Log::$debug_log->trace($sql);
				Model::$db->rawQuery($sql);
				
				if ($id) {
					return self::get($id);
				} else {
					Log::$debug_log->error("missing product id");
					
					return [];
				}
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
		public static function updateProductDetailData($product): array
		{
			//*
			Log::$debug_log->info("ProductModel::updateProductDetailData(product)");
			Log::$debug_log->trace($product);
			//*/
			if (!isset($product["id"])) {
				return [];
			}
			$location_detail = array();
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$id = Model::setInt((isset($product["id"])) ? $product["id"] : null);
			$category_id = Model::setInt((isset($product["category_id"])) ? $product["category_id"] : null);
			$city_id = Model::setInt((isset($product["city_id"])) ? $product["city_id"] : null);
			$pricing_strategy_types_id = Model::setInt((isset($product["pricing_strategy_types_id"])) ? $product["pricing_strategy_types_id"] : null);
			$status_types_id = Model::setInt((isset($product["status_types_id"])) ? $product["status_types_id"] : 1);
			$currency_id = Model::setInt((isset($product["currency_id"])) ? $product["currency_id"] : 5);
			$provider_id = Model::setInt((isset($product["provider_id"])) ? $product["provider_id"] : null);
			$vendor_id = Model::setInt((isset($product["vendor_id"])) ? $product["vendor_id"] : null);
			$rating_types_id = Model::setInt((isset($product["rating_types_id"])) ? $product["rating_types_id"] : 5);
			$api_id = Model::setInt((isset($product["api_id"])) ? $product["api_id"] : null);
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			$day_span = Model::setInt((isset($product["day_span"])) ? $product["day_span"] : 1);
			$provider_vendor_match = Model::setBool((isset($product["provider_vendor_match"])) ? $product["provider_vendor_match"] : 0);
			$enabled = Model::setBool((isset($product["enabled"])) ? $product["enabled"] : 1);
			
			$use_provider_location_id = Model::setBool((isset($product["use_provider_location_id"])) ? $product["use_provider_location_id"] : 0);
			$sku = Model::setString((isset($product["sku"])) ? $product["sku"] : null);
			$street_1 = Model::setString((isset($product["street_1"])) ? $product["street_1"] : null);
			$street_2 = Model::setString((isset($product["street_2"])) ? $product["street_2"] : null);
			$postal_code = Model::setString((isset($product["postal_code"])) ? $product["postal_code"] : null);
			$name = Model::setString((isset($product["name"])) ? $product["name"] : null);
			$productName = Model::setString((isset($product["name"])) ? $product["name"] : null);
			$depart_from = Model::setInt((isset($product["depart_from"])) ? $product["depart_from"] : null);
			$arrive_to = Model::setInt((isset($product["arrive_to"])) ? $product["arrive_to"] : null);
			$depart_time = Model::setString((isset($product["depart_time"])) ? $product["depart_time"] : null);
			$arrive_time = Model::setString((isset($product["arrive_time"])) ? $product["arrive_time"] : null);
			$hotel_code = Model::setString((isset($product["hotel_code"])) ? $product["hotel_code"] : null);
			$depart_date = Model::setString((isset($product["depart_date"])) ? $product["depart_date"] : null);
			$arrive_date = Model::setString((isset($product["arrive_date"])) ? $product["arrive_date"] : null);
			
			$cover_image = Model::setString((isset($product["cover_image"])) ? $product["cover_image"] : "/public/img/placeholder.jpg");
			$note = Model::setLongText((isset($product["note"])) ? $product["note"] : null);
			$description_long = Model::setLongText((isset($product["description_long"])) ? $product["description_long"] : null);
			$description_short = Model::setLongText((isset($product["description_short"])) ? $product["description_short"] : null);
			$keywords = Model::setLongText((isset($product["keywords"])) ? $product["keywords"] : null);
			$amenities = Model::setLongText((isset($product["amenities"])) ? $product["amenities"] : null);
			
			$sql = "
				UPDATE product
				
				SET
							currency_id = $currency_id,
							rating_types_id = $rating_types_id,
							name = $name,
							sku = $sku,
							enabled = $enabled,
							date_modified = CURRENT_TIMESTAMP,
							modified_by = $modified_by
				WHERE 		id = $id;
			";
			
			try {
				Log::$debug_log->trace($sql);
				Model::$db->rawQuery($sql);
				
				if ($id) {
					Log::$debug_log->trace(["id" => $id]);
					
					return self::get($id);
				} else {
					Log::$debug_log->error("missing product id");
					
					return [];
				}
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
		public static function fetchProducts(array $params = null): array
		{
			if (is_null($params)) {
				return [];
			}
			
			$categoryId = (isset($params) && isset($params["category_id"]) && (int)$params["category_id"] > 0) ? (int)$params["category_id"] : null;
			$productId = (isset($params) && isset($params["product_id"]) && (int)$params["product_id"] > 0) ? (int)$params["product_id"] : null;
			$countryId = (isset($params) && isset($params["country_id"]) && (int)$params["country_id"] > 0) ? (int)$params["country_id"] : null;
			$provinceId = (isset($params) && isset($params["province_id"]) && (int)$params["province_id"] > 0) ? (int)$params["province_id"] : null;
			$cityId = (isset($params) && isset($params["city_id"]) && (int)$params["city_id"] > 0) ? (int)$params["city_id"] : null;
			
			$where = "";
			$order = "";
			$whereCondition = [];
			$orderCondition = [
				"PRODUCT.name ASC",
				"LENGTH(PRODUCT.name)",
				"CAST(PRODUCT.name AS UNSIGNED)",
			];
			
			if (!is_null($categoryId)) {
				$whereCondition[] = "PRODUCT.category_id = $categoryId";
			}
			
			if (!is_null($productId)) {
				$whereCondition[] = "PRODUCT.product_id = $productId";
			}
			
			if (!is_null($countryId)) {
				$whereCondition[] = "PRODUCT.country_id = $countryId";
			}
			
			if (!is_null($provinceId)) {
				$whereCondition[] = "PRODUCT.province_id = $provinceId";
			}
			
			if (!is_null($cityId)) {
				$whereCondition[] = "PRODUCT.city_id = $cityId";
			}
			
			if (count($whereCondition) > 0) {
				$where = "WHERE   			" . implode(" AND ", $whereCondition);
			}
			
			if (count($orderCondition) > 0) {
				$order = "ORDER BY            " . implode(", ", $orderCondition);
			}
			
			$sql = "
			SELECT      		PRODUCT.id AS 'product_id',
					            PRODUCT.status_types_id AS 'product_status_types_id',
					            PRODUCT.currency_id AS 'product_currency_id',
					            PRODUCT.provider_id AS 'product_provider_id',
					            PRODUCT.vendor_id AS 'product_vendor_id',
					            PRODUCT.rating_types_id AS 'product_rating_types_id',
					            PRODUCT.name AS 'product_name',
					            PRODUCT.street_1 AS 'product_street_1',
					            PRODUCT.street_2 AS 'product_street_2',
					            PRODUCT.postal_code AS 'product_postal_code',
					            PRODUCT.description_short AS 'product_description_short',
					            PRODUCT.keywords AS 'product_keywords',
					            PRODUCT.sku AS 'product_sku',
					            PRODUCT.day_span AS 'product_day_span',
					            PRODUCT.cover_image AS 'product_cover_image',
					            PRODUCT.api_id AS 'product_api_id',
					            PRODUCT.from_api AS 'product_from_api',
					            PRODUCT.hotel_code AS 'product_hotel_code',
					            PRODUCT.sort_order AS 'product_sort_order',
					            PRODUCT.amenities AS 'product_amenities',
					            PRODUCT.note AS 'product_note',
					            COUNTRY.id AS 'country_id',
								COUNTRY.currency_id AS 'country_currency_id',
								COUNTRY.sort_order AS 'country_sort_order',
								COUNTRY.name AS 'country_name',
								COUNTRY.iso2 AS 'country_iso2',
								COUNTRY.iso3 AS 'country_iso3',
								COUNTRY.blurb AS 'country_blurb',
								COUNTRY.enabled AS 'country_enabled',
								COUNTRY.date_created AS 'country_date_created',
								COUNTRY.created_by AS 'country_created_by',
								COUNTRY.date_modified AS 'country_date_modified',
								COUNTRY.modified_by AS 'country_modified_by',
								COUNTRY.note AS 'country_note',
					            PROVINCE.id AS 'province_id',
								PROVINCE.country_id AS 'province_country_id',
								PROVINCE.name AS 'province_name',
								PROVINCE.iso2 AS 'province_iso2',
								PROVINCE.iso3 AS 'province_iso3',
								PROVINCE.sort_order AS 'province_sort_order',
								PROVINCE.blurb AS 'province_blurb',
								PROVINCE.enabled AS 'province_enabled',
								PROVINCE.date_created AS 'province_date_created',
								PROVINCE.created_by AS 'province_created_by',
								PROVINCE.date_modified AS 'province_date_modified',
								PROVINCE.modified_by AS 'province_modified_by',
								PROVINCE.note AS 'province_note',
					            CITY.id AS 'city_id',
								CITY.province_id AS 'city_province_id',
								CITY.country_id AS 'city_country_id',
								CITY.sort_order AS 'city_sort_order',
								CITY.name AS 'city_name',
								CITY.blurb AS 'city_blurb',
								CITY.is_capital AS 'city_is_capital',
								CITY.enabled AS 'city_enabled',
								CITY.date_created AS 'city_date_created',
								CITY.created_by AS 'city_created_by',
								CITY.date_modified AS 'city_date_modified',
								CITY.modified_by AS 'city_modified_by',
								CITY.note AS 'city_note',
			       				CATEGORY.id AS 'category_id',
								CATEGORY.pricing_strategy_types_id AS 'category_pricing_strategy_types_id',
								CATEGORY.attribute_id AS 'category_attribute_id',
								CATEGORY.name AS 'category_name',
								CATEGORY.icon AS 'category_icon',
								CATEGORY.view_product_index AS 'category_view_product_index',
								CATEGORY.view_product_index_filter AS 'category_view_product_index_filter',
								CATEGORY.view_product_index_search AS 'category_view_product_index_search',
								CATEGORY.view_product_edit AS 'category_view_product_edit',
								CATEGORY.view_product_package_edit AS 'category_view_product_package_edit',
								CATEGORY.view_product_package_index AS 'category_view_product_package_index',
								CATEGORY.all_day AS 'category_all_day',
								CATEGORY.overlap AS 'category_overlap',
								CATEGORY.editable AS 'category_editable',
								CATEGORY.duration_editable AS 'category_duration_editable',
								CATEGORY.start_editable AS 'category_start_editable',
								CATEGORY.display AS 'category_display',
								CATEGORY.background_color AS 'category_background_color',
								CATEGORY.text_color AS 'category_text_color',
								CATEGORY.border_color AS 'category_border_color',
								CATEGORY.sort_order AS 'category_sort_order',
								CATEGORY.enabled AS 'category_enabled',
								CATEGORY.date_created AS 'category_date_created',
								CATEGORY.created_by AS 'category_created_by',
								CATEGORY.date_modified AS 'category_date_modified',
								CATEGORY.modified_by AS 'category_modified_by',
								CATEGORY.note AS 'category_note'
			FROM        		product PRODUCT
			JOIN				category CATEGORY ON CATEGORY.id = PRODUCT.category_id
			LEFT JOIN   		city CITY ON CITY.id = PRODUCT.city_id
			LEFT JOIN   		province PROVINCE ON PROVINCE.id = CITY.province_id
			LEFT JOIN   		country COUNTRY ON COUNTRY.id = PROVINCE.country_id
			$where
			$order
			";
			
			try {
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
		}
		
	}
