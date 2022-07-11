<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short PackageModel Description
	 * Long PackageModel Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class PackageModel extends Model
	{
		protected static $dbTable = "package";
		
		protected static $sql = "SELECT
							PACKAGE.id                      AS 'package_id',
				            PACKAGE.name                    AS 'package_name',
				            PACKAGE.day_span                AS 'package_day_span',
				            PACKAGE.city_id                 AS 'package_city_id',
				            PACKAGE.min_pax                 AS 'package_min_pax',
				            PACKAGE.max_pax                 AS 'package_max_pax',
				            PACKAGE.description_long        AS 'package_description_long',
				            PACKAGE.description_short       AS 'package_description_short',
				            PACKAGE.available_start         AS 'package_available_start',
				            PACKAGE.available_end           AS 'package_available_end',
				            PACKAGE.cost                    AS 'package_cost',
				            PACKAGE.price                   AS 'package_price',
				            PACKAGE.margin                  AS 'package_margin',
				            PACKAGE.enabled                 AS 'package_enabled',
				            PACKAGE.date_created            AS 'package_date_created',
				            PACKAGE.created_by              AS 'package_created_by',
				            PACKAGE.date_modified           AS 'package_date_modified',
				            PACKAGE.modified_by             AS 'package_modified_by',
				            PACKAGE.note                    AS 'package_note',
				            COUNTRY.id                      AS 'country_id',
				            COUNTRY.currency_id             AS 'country_currency_id',
				            COUNTRY.sort_order              AS 'country_sort_order',
				            COUNTRY.name                    AS 'country_name',
				            COUNTRY.iso2                    AS 'country_iso2',
				            COUNTRY.iso3                    AS 'country_iso3',
				            COUNTRY.blurb                   AS 'country_blurb',
				            COUNTRY.enabled                 AS 'country_enabled',
				            COUNTRY.date_created            AS 'country_date_created',
				            COUNTRY.created_by              AS 'country_created_by',
				            COUNTRY.date_modified           AS 'country_date_modified',
				            COUNTRY.modified_by             AS 'country_modified_by',
				            COUNTRY.note                    AS 'country_note',
				            CURRENCY.id                     AS 'currency_id',
				            CURRENCY.sort_order             AS 'currency_sort_order',
				            CURRENCY.name                   AS 'currency_name',
				            CURRENCY.iso                    AS 'currency_iso',
				            CURRENCY.minor_unit             AS 'currency_minor_unit',
				            CURRENCY.symbol                 AS 'currency_symbol',
				            CURRENCY.enabled                AS 'currency_enabled',
				            CURRENCY.date_created           AS 'currency_date_created',
				            CURRENCY.created_by             AS 'currency_created_by',
				            CURRENCY.date_modified          AS 'currency_date_modified',
				            CURRENCY.modified_by            AS 'currency_modified_by',
				            CURRENCY.note                   AS 'currency_note',
				            PROVINCE.id                     AS 'province_id',
				            PROVINCE.country_id             AS 'province_country_id',
				            PROVINCE.name                   AS 'province_name',
				            PROVINCE.iso2                   AS 'province_iso2',
				            PROVINCE.iso3                   AS 'province_iso3',
				            PROVINCE.sort_order             AS 'province_sort_order',
				            PROVINCE.blurb                  AS 'province_blurb',
				            PROVINCE.enabled                AS 'province_enabled',
				            PROVINCE.date_created           AS 'province_date_created',
				            PROVINCE.created_by 		    AS 'province_created_by',
				            PROVINCE.date_modified 		    AS 'province_date_modified',
				            PROVINCE.modified_by 		    AS 'province_modified_by',
				            PROVINCE.note 				    AS 'province_note',
				            CITY.id 					    AS 'city_id',
				            CITY.province_id 			    AS 'city_province_id',
				            CITY.country_id                 AS 'city_country_id',
				            CITY.sort_order                 AS 'city_sort_order',
				            CITY.name                       AS 'city_name',
				            CITY.blurb                      AS 'city_blurb',
				            CITY.is_capital                 AS 'city_is_capital',
				            CITY.enabled AS 'city_enabled',
				            CITY.date_created AS 'city_date_created',
				            CITY.created_by AS 'city_created_by',
				            CITY.date_modified AS 'city_date_modified',
				            CITY.modified_by                AS 'city_modified_by',
				            CITY.note                       AS 'city_note',
							PACKAGE_PRODUCT.package_id      AS 'package_product_package_id',
							PACKAGE_PRODUCT.product_id      AS 'package_product_product_id',
							PACKAGE_PRODUCT.unit_id         AS 'package_product_unit_id',
							PACKAGE_PRODUCT.product_label AS 'package_product_product_label',
							PACKAGE_PRODUCT.unit_label AS 'package_product_unit_label',
							PACKAGE_PRODUCT.day_span AS 'package_product_day_span',
							PACKAGE_PRODUCT.sort_order AS 'package_product_sort_order',
							PACKAGE_PRODUCT.allow_substitution AS 'package_product_allow_substitution',
							PACKAGE_PRODUCT.enabled AS 'package_product_enabled',
							PACKAGE_PRODUCT.date_created    AS 'package_product_date_created',
							PACKAGE_PRODUCT.created_by AS 'package_product_created_by',
							PACKAGE_PRODUCT.date_modified AS 'package_product_date_modified',
							PACKAGE_PRODUCT.modified_by AS 'package_product_modified_by',
							PACKAGE_PRODUCT.note AS 'package_product_note',
							PRODUCT_UNIT.product_id AS 'product_unit_product_id',
							PRODUCT_UNIT.unit_id AS 'product_unit_unit_id',
							PRODUCT_UNIT.min_pax AS 'product_unit_min_pax',
							PRODUCT_UNIT.max_pax AS 'product_unit_max_pax',
							PRODUCT_UNIT.min_nights         AS 'product_unit_min_nights',
							PRODUCT_UNIT.max_nights AS 'product_unit_max_nights',
							PRODUCT_UNIT.description_long AS 'product_unit_description_long',
							PRODUCT_UNIT.description_short AS 'product_unit_description_short',
							PRODUCT_UNIT.blurb AS 'product_unit_blurb',
							PRODUCT_UNIT.cover_image AS 'product_unit_cover_image',
							PRODUCT_UNIT.meeting_point AS 'product_unit_meeting_point',
							PRODUCT_UNIT.time_notes AS 'product_unit_time_notes',
							PRODUCT_UNIT.start_time         AS 'product_unit_start_time',
							PRODUCT_UNIT.end_time AS 'product_unit_end_time',
							PRODUCT_UNIT.enabled AS 'product_unit_enabled',
							PRODUCT_UNIT.date_created AS 'product_unit_date_created',
							PRODUCT_UNIT.created_by AS 'product_unit_created_by',
							PRODUCT_UNIT.date_modified AS 'product_unit_date_modified',
							PRODUCT_UNIT.modified_by AS 'product_unit_modified_by',
							PRODUCT_UNIT.amenities AS 'product_unit_amenities',
							PRODUCT_UNIT.note               AS 'product_unit_note',
							PRODUCT_UNIT.keywords AS 'product_unit_keywords',
							PRODUCT.id AS 'product_id',
							PRODUCT.category_id AS 'product_category_id',
							PRODUCT.pricing_strategy_types_id AS 'product_pricing_strategy_types_id',
							PRODUCT.status_types_id AS 'product_status_types_id',
							PRODUCT.city_id AS 'product_city_id',
							PRODUCT.currency_id AS 'product_currency_id',
							PRODUCT.location_id             AS 'product_location_id',
							PRODUCT.provider_id AS 'product_provider_id',
							PRODUCT.vendor_id AS 'product_vendor_id',
							PRODUCT.rating_types_id AS 'product_rating_types_id',
							PRODUCT.name AS 'product_name',
							PRODUCT.street_1 AS 'product_street_1',
							PRODUCT.street_2 AS 'product_street_2',
							PRODUCT.postal_code AS 'product_postal_code',
							PRODUCT.description_short AS 'product_description_short',
							PRODUCT.description_long AS 'product_description_long',
							PRODUCT.keywords AS 'product_keywords',
							PRODUCT.sku AS 'product_sku',
							PRODUCT.depart_from AS 'product_depart_from',
							PRODUCT.depart_date             AS 'product_depart_date',
							PRODUCT.depart_time AS 'product_depart_time',
							PRODUCT.arrive_to AS 'product_arrive_to',
							PRODUCT.arrive_date AS 'product_arrive_date',
							PRODUCT.arrive_time AS 'product_arrive_time',
							PRODUCT.provider_vendor_match AS 'product_provider_vendor_match',
							PRODUCT.use_provider_location_id AS 'product_use_provider_location_id',
							PRODUCT.day_span                AS 'product_day_span',
							PRODUCT.cover_image AS 'product_cover_image',
							PRODUCT.api_id AS 'product_api_id',
							PRODUCT.from_api AS 'product_from_api',
							PRODUCT.hotel_code AS 'product_hotel_code',
							PRODUCT.sort_order AS 'product_sort_order',
							PRODUCT.amenities AS 'product_amenities',
							PRODUCT.enabled AS 'product_enabled',
							PRODUCT.date_created                    AS 'product_date_created',
							PRODUCT.created_by AS 'product_created_by',
							PRODUCT.date_modified                   AS 'product_date_modified',
							PRODUCT.modified_by AS 'product_modified_by',
							PRODUCT.note AS 'product_note',
							CATEGORY.id AS 'category_id',
							CATEGORY.pricing_strategy_types_id AS 'category_pricing_strategy_types_id',
							CATEGORY.attribute_id AS 'category_attribute_id',
							CATEGORY.name                           AS 'category_name',
							CATEGORY.icon                           AS 'category_icon',
							CATEGORY.view_product_index             AS 'category_view_product_index',
							CATEGORY.view_product_index_filter      AS 'category_view_product_index_filter',
							CATEGORY.view_product_index_search      AS 'category_view_product_index_search',
							CATEGORY.view_product_edit              AS 'category_view_product_edit',
							CATEGORY.view_product_package_edit      AS 'category_view_product_package_edit',
							CATEGORY.view_product_package_index     AS 'category_view_product_package_index',
							CATEGORY.all_day AS 'category_all_day',
							CATEGORY.overlap AS 'category_overlap',
							CATEGORY.editable                       AS 'category_editable',
							CATEGORY.duration_editable              AS 'category_duration_editable',
							CATEGORY.start_editable AS 'category_start_editable',
							CATEGORY.display AS 'category_display',
							CATEGORY.background_color AS 'category_background_color',
							CATEGORY.text_color AS 'category_text_color',
							CATEGORY.border_color                   AS 'category_border_color',
							CATEGORY.sort_order                     AS 'category_sort_order',
							CATEGORY.enabled AS 'category_enabled',
							CATEGORY.date_created AS 'category_date_created',
							CATEGORY.created_by                     AS 'category_created_by',
							CATEGORY.date_modified                  AS 'category_date_modified',
							CATEGORY.modified_by                    AS 'category_modified_by',
							CATEGORY.note                           AS 'category_note',
							UNIT.id                                 AS 'unit_id',
							UNIT.category_id                        AS 'unit_category_id',
							UNIT.api_id                             AS 'unit_api_id',
							UNIT.name AS 'unit_name',
							UNIT.room_code AS 'unit_room_code',
							UNIT.enabled AS 'unit_enabled',
							UNIT.date_created AS 'unit_date_created',
							UNIT.created_by AS 'unit_created_by',
							UNIT.date_modified AS 'unit_date_modified',
							UNIT.modified_by AS 'unit_modified_by',
							UNIT.note AS 'unit_note'
							
			FROM 	    	package 	        PACKAGE
			JOIN 	    	city 		        CITY 		        ON CITY.id 		                = PACKAGE.city_id
			JOIN 	    	province 	        PROVINCE 	        ON PROVINCE.id 	                = CITY.province_id
			JOIN 	    	country 	        COUNTRY 	        ON COUNTRY.id 	                = PROVINCE.country_id
			JOIN 	    	currency 	        CURRENCY 	        ON CURRENCY.id 	                = COUNTRY.currency_id
			LEFT JOIN 		package_product     PACKAGE_PRODUCT     ON PACKAGE_PRODUCT.package_id   = PACKAGE.id
			LEFT JOIN 		product_unit        PRODUCT_UNIT        ON (PRODUCT_UNIT.product_id     = PACKAGE_PRODUCT.product_id AND PRODUCT_UNIT.unit_id = PACKAGE_PRODUCT.unit_id)
			LEFT JOIN 		product             PRODUCT             ON PRODUCT.id                   = PACKAGE_PRODUCT.product_id
			LEFT JOIN 		unit                UNIT                ON UNIT.id                      = PRODUCT_UNIT.unit_id
			LEFT JOIN 		category            CATEGORY            ON CATEGORY.id                  = PRODUCT.category_id
			";
		
		public static function updatePackageRecord(array $package = null): array
		{
			if (is_null($package)) {
				Log::$debug_log->error("Missing Package");
				
				return [];
			}
			
			$id = Model::setInt((isset($package["id"])) ? $package["id"] : null);
			$city_id = Model::setInt((isset($package["city_id"])) ? $package["city_id"] : null);
			$day_span = Model::setInt((isset($package["day_span"])) ? $package["day_span"] : 1);
			$min_pax = Model::setInt((isset($package["min_pax"])) ? $package["min_pax"] : 1);
			$max_pax = Model::setInt((isset($package["max_pax"])) ? $package["max_pax"] : null);
			$cost = Model::setInt((isset($package["cost"])) ? $package["cost"] : 0);
			$price = Model::setInt((isset($package["price"])) ? $package["price"] : 0);
			$margin = Model::setInt((isset($package["margin"])) ? $package["margin"] : 0);
			$name = Model::setString((isset($package["name"])) ? $package["name"] : null);
			$available_start = Model::setString((isset($package["available_start"])) ? $package["available_start"] : null);
			$available_end = Model::setString((isset($package["available_end"])) ? $package["available_end"] : null);
			$description_long = Model::setLongText((isset($package["description_long"])) ? $package["description_long"] : null);
			$description_short = Model::setLongText((isset($package["description_short"])) ? $package["description_short"] : null);
			$userId = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$enabled = Model::setBool((isset($package["enabled"])) ? $package["enabled"] : 1);
			$note = Model::setLongText((isset($package["note"])) ? $package["note"] : null);
			$created_by = Model::setInt($userId);
			$modified_by = Model::setInt($userId);
			
			$sql = "
			INSERT INTO package (
			    id, name, day_span, city_id, min_pax,
			    max_pax, description_long, description_short, available_start, available_end,
			    cost, price, margin, enabled, date_created,
			    created_by, date_modified, modified_by, note
			) VALUES (
			    $id, $name, $day_span, $city_id, $min_pax,
			    $max_pax, $description_long, $description_short, $available_start, $available_end,
			    $cost, $price, $margin, $enabled, CURRENT_TIMESTAMP,
			    $created_by, CURRENT_TIMESTAMP, $modified_by, $note
			)
			ON DUPLICATE KEY UPDATE
			    name = VALUES(name),
			    day_span = VALUES(day_span),
			    city_id = VALUES(city_id),
			    min_pax = VALUES(min_pax),
			    max_pax = VALUES(max_pax),
			    description_long = VALUES(description_long),
			    description_short = VALUES(description_short),
			    available_start = VALUES(available_start),
			    available_end = VALUES(available_end),
			    cost = VALUES(cost),
			    price = VALUES(price),
			    margin = VALUES(margin),
			    enabled = VALUES(enabled),
			    modified_by = VALUES(modified_by),
			    date_modified = VALUES(date_modified)
            ";
			
			try {
				Model::$db->rawQuery($sql);
				$package_id = Model::$db->getInsertId();
				
				return self::get($package_id);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
		}
		
		public static function fetch(int $id = null): array
		{
			$sqlStatement = self::$sql;
			$whereCondition = (!is_null($id) && (int)$id > 0) ? "
			WHERE       PACKAGE.id = $id
			" : "";
			$orderCondition = "
			ORDER BY    LENGTH(PACKAGE.name), CAST(PACKAGE.name AS UNSIGNED), PACKAGE.name,
			            LENGTH(COUNTRY.name), CAST(COUNTRY.name AS UNSIGNED), COUNTRY.name,
			            LENGTH(PROVINCE.name), CAST(PROVINCE.name AS UNSIGNED), PROVINCE.name,
			            LENGTH(CITY.name), CAST(CITY.name AS UNSIGNED), CITY.name
			";
			
			$query = "
			$sqlStatement
			$whereCondition
			$orderCondition
			";
			
			try {
				return Model::$db->rawQuery($query);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($query);
				
				return [];
			}
			
		}
		
		public static function fetchPackageProducts(int $package_id = null, int $product_id = null, int $unit_id = null): array
		{
			$baseSQL = "
			SELECT 			PACKAGE_PRODUCT.package_id 				AS 'package_product_package_id',
							PACKAGE_PRODUCT.product_id 				AS 'package_product_product_id',
							PACKAGE_PRODUCT.unit_id 				AS 'package_product_unit_id',
							PACKAGE_PRODUCT.product_label 			AS 'package_product_product_label',
							PACKAGE_PRODUCT.unit_label 				AS 'package_product_unit_label',
							PACKAGE_PRODUCT.day_span 				AS 'package_product_day_span',
							PACKAGE_PRODUCT.sort_order 				AS 'package_product_sort_order',
							PACKAGE_PRODUCT.allow_substitution 		AS 'package_product_allow_substitution',
							PACKAGE_PRODUCT.enabled 				AS 'package_product_enabled',
							PACKAGE_PRODUCT.date_created 			AS 'package_product_date_created',
							PACKAGE_PRODUCT.created_by 				AS 'package_product_created_by',
							PACKAGE_PRODUCT.date_modified 			AS 'package_product_date_modified',
							PACKAGE_PRODUCT.modified_by 			AS 'package_product_modified_by',
							PACKAGE_PRODUCT.note 					AS 'package_product_note',

							COUNTRY.id                      		AS 'country_id',
							COUNTRY.currency_id             		AS 'country_currency_id',
							COUNTRY.sort_order              		AS 'country_sort_order',
							COUNTRY.name                    		AS 'country_name',
							COUNTRY.iso2                    		AS 'country_iso2',
							COUNTRY.iso3                    		AS 'country_iso3',
							COUNTRY.blurb                   		AS 'country_blurb',
							COUNTRY.enabled                 		AS 'country_enabled',
							COUNTRY.date_created            		AS 'country_date_created',
							COUNTRY.created_by              		AS 'country_created_by',
							COUNTRY.date_modified           		AS 'country_date_modified',
							COUNTRY.modified_by             		AS 'country_modified_by',
							COUNTRY.note                    		AS 'country_note',
							
							CURRENCY.id                     		AS 'currency_id',
							CURRENCY.sort_order             		AS 'currency_sort_order',
							CURRENCY.name                   		AS 'currency_name',
							CURRENCY.iso                    		AS 'currency_iso',
							CURRENCY.minor_unit             		AS 'currency_minor_unit',
							CURRENCY.symbol                 		AS 'currency_symbol',
							CURRENCY.enabled                		AS 'currency_enabled',
							CURRENCY.date_created           		AS 'currency_date_created',
							CURRENCY.created_by             		AS 'currency_created_by',
							CURRENCY.date_modified          		AS 'currency_date_modified',
							CURRENCY.modified_by            		AS 'currency_modified_by',
							CURRENCY.note                   		AS 'currency_note',
							
							PROVINCE.id                     		AS 'province_id',
							PROVINCE.country_id             		AS 'province_country_id',
							PROVINCE.name                   		AS 'province_name',
							PROVINCE.iso2                   		AS 'province_iso2',
							PROVINCE.iso3                   		AS 'province_iso3',
							PROVINCE.sort_order             		AS 'province_sort_order',
							PROVINCE.blurb                  		AS 'province_blurb',
							PROVINCE.enabled                		AS 'province_enabled',
							PROVINCE.date_created           		AS 'province_date_created',
							PROVINCE.created_by 		    		AS 'province_created_by',
							PROVINCE.date_modified 		    		AS 'province_date_modified',
							PROVINCE.modified_by 		    		AS 'province_modified_by',
							PROVINCE.note 				    		AS 'province_note',
							
							CITY.id 					    		AS 'city_id',
							CITY.province_id 			    		AS 'city_province_id',
							CITY.country_id                 		AS 'city_country_id',
							CITY.sort_order                 		AS 'city_sort_order',
							CITY.name                       		AS 'city_name',
							CITY.blurb                      		AS 'city_blurb',
							CITY.is_capital                 		AS 'city_is_capital',
							CITY.enabled 							AS 'city_enabled',
							CITY.date_created 						AS 'city_date_created',
							CITY.created_by 						AS 'city_created_by',
							CITY.date_modified 						AS 'city_date_modified',
							CITY.modified_by                		AS 'city_modified_by',
							CITY.note                       		AS 'city_note',

							PACKAGE.id                      		AS 'package_id',
							PACKAGE.name                    		AS 'package_name',
							PACKAGE.day_span                		AS 'package_day_span',
							PACKAGE.city_id                 		AS 'package_city_id',
							PACKAGE.min_pax                 		AS 'package_min_pax',
							PACKAGE.max_pax                 		AS 'package_max_pax',
							PACKAGE.description_long        		AS 'package_description_long',
							PACKAGE.description_short       		AS 'package_description_short',
							PACKAGE.available_start         		AS 'package_available_start',
							PACKAGE.available_end           		AS 'package_available_end',
							PACKAGE.cost                    		AS 'package_cost',
							PACKAGE.price                   		AS 'package_price',
							PACKAGE.margin                  		AS 'package_margin',
							PACKAGE.enabled                 		AS 'package_enabled',
							PACKAGE.date_created            		AS 'package_date_created',
							PACKAGE.created_by              		AS 'package_created_by',
							PACKAGE.date_modified           		AS 'package_date_modified',
							PACKAGE.modified_by             		AS 'package_modified_by',
							PACKAGE.note                    		AS 'package_note',

							PRODUCT.id 								AS 'product_id',
							PRODUCT.category_id 					AS 'product_category_id',
							PRODUCT.pricing_strategy_types_id 		AS 'product_pricing_strategy_types_id',
							PRODUCT.status_types_id 				AS 'product_status_types_id',
							PRODUCT.city_id 						AS 'product_city_id',
							PRODUCT.currency_id 					AS 'product_currency_id',
							PRODUCT.location_id 					AS 'product_location_id',
							PRODUCT.provider_id 					AS 'product_provider_id',
							PRODUCT.vendor_id 						AS 'product_vendor_id',
							PRODUCT.rating_types_id 				AS 'product_rating_types_id',
							PRODUCT.name 							AS 'product_name',
							PRODUCT.street_1 						AS 'product_street_1',
							PRODUCT.street_2 						AS 'product_street_2',
							PRODUCT.postal_code 					AS 'product_postal_code',
							PRODUCT.description_short 				AS 'product_description_short',
							PRODUCT.description_long 				AS 'product_description_long',
							PRODUCT.keywords 						AS 'product_keywords',
							PRODUCT.sku 							AS 'product_sku',
							PRODUCT.depart_from 					AS 'product_depart_from',
							PRODUCT.depart_date 					AS 'product_depart_date',
							PRODUCT.depart_time 					AS 'product_depart_time',
							PRODUCT.arrive_to 						AS 'product_arrive_to',
							PRODUCT.arrive_date 					AS 'product_arrive_date',
							PRODUCT.arrive_time 					AS 'product_arrive_time',
							PRODUCT.provider_vendor_match 			AS 'product_provider_vendor_match',
							PRODUCT.use_provider_location_id 		AS 'product_use_provider_location_id',
							PRODUCT.day_span 						AS 'product_day_span',
							PRODUCT.cover_image 					AS 'product_cover_image',
							PRODUCT.api_id 							AS 'product_api_id',
							PRODUCT.from_api 						AS 'product_from_api',
							PRODUCT.hotel_code 						AS 'product_hotel_code',
							PRODUCT.sort_order 						AS 'product_sort_order',
							PRODUCT.amenities 						AS 'product_amenities',
							PRODUCT.enabled 						AS 'product_enabled',
							PRODUCT.date_created 					AS 'product_date_created',
							PRODUCT.created_by 						AS 'product_created_by',
							PRODUCT.date_modified 					AS 'product_date_modified',
							PRODUCT.modified_by 					AS 'product_modified_by',
							PRODUCT.note 							AS 'product_note',

			       			PRODUCT_UNIT.product_id 				AS 'product_unit_product_id',
							PRODUCT_UNIT.unit_id 					AS 'product_unit_unit_id',
							PRODUCT_UNIT.min_pax 					AS 'product_unit_min_pax',
							PRODUCT_UNIT.max_pax 					AS 'product_unit_max_pax',
							PRODUCT_UNIT.min_nights         		AS 'product_unit_min_nights',
							PRODUCT_UNIT.max_nights 				AS 'product_unit_max_nights',
							PRODUCT_UNIT.description_long 			AS 'product_unit_description_long',
							PRODUCT_UNIT.description_short 			AS 'product_unit_description_short',
							PRODUCT_UNIT.blurb 						AS 'product_unit_blurb',
							PRODUCT_UNIT.cover_image 				AS 'product_unit_cover_image',
							PRODUCT_UNIT.meeting_point 				AS 'product_unit_meeting_point',
							PRODUCT_UNIT.time_notes 				AS 'product_unit_time_notes',
							PRODUCT_UNIT.start_time         		AS 'product_unit_start_time',
							PRODUCT_UNIT.end_time 					AS 'product_unit_end_time',
							PRODUCT_UNIT.enabled 					AS 'product_unit_enabled',
							PRODUCT_UNIT.date_created 				AS 'product_unit_date_created',
							PRODUCT_UNIT.created_by 				AS 'product_unit_created_by',
							PRODUCT_UNIT.date_modified 				AS 'product_unit_date_modified',
							PRODUCT_UNIT.modified_by 				AS 'product_unit_modified_by',
							PRODUCT_UNIT.amenities 					AS 'product_unit_amenities',
							PRODUCT_UNIT.note               		AS 'product_unit_note',
							PRODUCT_UNIT.keywords 					AS 'product_unit_keywords',
							
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
							
       						UNIT.id                                 AS 'unit_id',
							UNIT.category_id                        AS 'unit_category_id',
							UNIT.api_id                             AS 'unit_api_id',
							UNIT.name 								AS 'unit_name',
							UNIT.room_code 							AS 'unit_room_code',
							UNIT.enabled 							AS 'unit_enabled',
							UNIT.date_created 						AS 'unit_date_created',
							UNIT.created_by 						AS 'unit_created_by',
							UNIT.date_modified 						AS 'unit_date_modified',
							UNIT.modified_by 						AS 'unit_modified_by',
							UNIT.note 								AS 'unit_note'
			
			FROM 			package_product 	PACKAGE_PRODUCT
			JOIN 			package        		PACKAGE        		ON PACKAGE.id     				= PACKAGE_PRODUCT.package_id
			LEFT JOIN 		product_unit        PRODUCT_UNIT        ON (PRODUCT_UNIT.product_id     = PACKAGE_PRODUCT.product_id AND PRODUCT_UNIT.unit_id = PACKAGE_PRODUCT.unit_id)
			LEFT JOIN 		product             PRODUCT             ON PRODUCT.id                   = PACKAGE_PRODUCT.product_id
			JOIN 	    	city 		        CITY 		        ON CITY.id 		                = PACKAGE.city_id
			JOIN 	    	category 		    CATEGORY 		    ON CATEGORY.id 		            = PRODUCT.category_id
			JOIN 	    	province 	        PROVINCE 	        ON PROVINCE.id 	                = CITY.province_id
			JOIN 	    	country 	        COUNTRY 	        ON COUNTRY.id 	                = PROVINCE.country_id
			JOIN 	    	currency 	        CURRENCY 	        ON CURRENCY.id 	                = COUNTRY.currency_id
			LEFT JOIN 		unit				UNIT				ON UNIT.id 						= PACKAGE_PRODUCT.unit_id";
			$whereCondition = [];
			$orderCondition = [];
			$limitCondition = 20;
			
			if (!is_null($package_id)) {
				$whereCondition[] = "PACKAGE_PRODUCT.package_id = $package_id";
			} else {
				return [];
			}
			
			if (!is_null($product_id)) {
				$whereCondition[] = "PACKAGE_PRODUCT.product_id = $product_id";
			}
			
			if (!is_null($unit_id)) {
				$whereCondition[] = "PACKAGE_PRODUCT.unit_id = $unit_id";
			}
			
			$limit = ((int)$limitCondition > 0) ? "LIMIT        $limitCondition" : "";
			$where = (count($whereCondition) > 0) ? "WHERE   			" . implode(" AND ", $whereCondition) : "";
			$order = (count($orderCondition) > 0) ? "ORDER BY   			" . implode(", ", $orderCondition) : "";
			
			$query = "
                $baseSQL
                $where
                $order
                $limit;";
			
			try {
				return Model::$db->rawQuery($query);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
		public static function fetchByPackageName(string $name = ""): array
		{
			$sqlStatement = self::$sql;
			$searchTerm = addslashes($name);
			$whereCondition = "
			WHERE       PACKAGE.name LIKE '%$searchTerm%'
			";
			$orderCondition = "
			ORDER BY    LENGTH(PACKAGE.name), CAST(PACKAGE.name AS UNSIGNED), PACKAGE.name,
			            LENGTH(COUNTRY.name), CAST(COUNTRY.name AS UNSIGNED), COUNTRY.name,
			            LENGTH(PROVINCE.name), CAST(PROVINCE.name AS UNSIGNED), PROVINCE.name,
			            LENGTH(CITY.name), CAST(CITY.name AS UNSIGNED), CITY.name
			";
			
			$query = "
			$sqlStatement
			$whereCondition
			$orderCondition
			";
			
			try {
				return Model::$db->rawQuery($query);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($query);
				
				return [];
			}
			
		}
		
		public static function updatePackageProductRecord(array $params = null): array
		{
			if (is_null($params)) {
				Log::$debug_log->error("Missing params");
			}
			
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			$id = Model::setInt((isset($params["id"])) ? $params["id"] : null);
			$package_id = Model::setInt((isset($params["package_id"])) ? $params["package_id"] : null);
			$product_id = Model::setInt((isset($params["product_id"])) ? $params["product_id"] : null);
			$unit_id = Model::setInt((isset($params["unit_id"])) ? $params["unit_id"] : null);
			$day_span = Model::setInt((isset($params["day_span"])) ? $params["day_span"] : null);
			$sort_order = Model::setInt((isset($params["sort_order"])) ? $params["sort_order"] : null);
			
			$product_label = Model::setString((isset($params["product_label"])) ? $params["product_label"] : null);
			$unit_label = Model::setString((isset($params["unit_label"])) ? $params["unit_label"] : null);
			
			$enabled = Model::setBool((isset($params["enabled"])) ? $params["enabled"] : null);
			$allow_substitution = Model::setBool((isset($params["allow_substitution"])) ? $params["allow_substitution"] : null);
			
			$query = "
				INSERT INTO package_product (
				    id, package_id, product_id, unit_id, product_label,
				    unit_label, day_span, sort_order, allow_substitution, enabled,
				    date_created, created_by, date_modified, modified_by, note
				) VALUES (
				    $id, $package_id, $product_id, $unit_id, $product_label,
				    $unit_label, $day_span, $sort_order, $allow_substitution, $enabled,
				    CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP, $modified_by, $note
				)
				ON DUPLICATE KEY UPDATE
				    product_label = VALUES(product_label),
				    unit_label = VALUES(unit_label),
				    day_span = VALUES(day_span),
				    sort_order = VALUES(sort_order),
				    allow_substitution = VALUES(allow_substitution),
				    enabled = VALUES(enabled),
				    date_modified = VALUES(date_modified),
				    modified_by = VALUES(modified_by),
				    note = VALUES(note)
			";
			
			Log::$debug_log->trace($query);
			
			return [];
		}
		
	}
