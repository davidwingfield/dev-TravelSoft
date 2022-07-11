<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short Unit Description
	 * Long Unit Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class UnitModel extends Model
	{
		/**
		 * @var string
		 */
		protected static $dbTable = "unit";
		/**
		 * @var array
		 */
		protected static $dbFields = Array();
		/**
		 * @var string
		 */
		protected static $selectQuery = "
            SELECT
                    UNIT.id AS 'unit_id',
                    UNIT.category_id AS 'unit_category_id',
                    UNIT.api_id AS 'unit_api_id',
                    UNIT.name AS 'unit_name',
                    UNIT.room_code AS 'unit_room_code',
                    UNIT.enabled AS 'unit_enabled',
                    UNIT.date_created AS 'unit_date_created',
                    UNIT.created_by AS 'unit_created_by',
                    UNIT.date_modified AS 'unit_date_modified',
                    UNIT.modified_by AS 'unit_modified_by',
                    UNIT.note AS 'unit_note'
            FROM 	unit UNIT
        ";
		
		/**
		 * @param int|null $id
		 *
		 * @return array
		 */
		public static function get(int $id = null): array
		{
			
			try {
				if (!is_null($id)) {
					Model::$db->where("id", $id);
				}
				
				self::$db->where("enabled", 1);
				
				return self::$db->get(self::$dbTable);
			} catch (Exception $e) {
				return [];
			}
		}
		
		/**
		 * @param int|null $id
		 *
		 * @return array
		 */
		public static function getOne(int $id = null): array
		{
			try {
				if (!is_null($id)) {
					Model::$db->where("id", $id);
				}
				
				self::$db->where("enabled", 1);
				
				return self::$db->getOne(self::$dbTable);
			} catch (Exception $e) {
				return [];
			}
		}
		
		/**
		 * @param array $unit
		 *
		 * @return array
		 */
		public static function insertUnit(array $unit = []): array
		{
			if (!isset($unit) || !isset($unit["category_id"]) || !isset($unit["name"])) {
				return [];
			}
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			$id = Model::setInt((isset($unit["id"])) ? $unit["id"] : null);
			$category_id = Model::setInt((isset($unit["category_id"])) ? $unit["category_id"] : null);
			
			$min_pax = Model::setInt((isset($unit["min_pax"])) ? $unit["min_pax"] : 1);
			$max_pax = Model::setInt((isset($unit["max_pax"])) ? $unit["max_pax"] : 1);
			$min_nights = Model::setInt((isset($unit["min_nights"])) ? $unit["min_nights"] : 1);
			$max_nights = Model::setInt((isset($unit["max_nights"])) ? $unit["max_nights"] : null);
			
			$api_id = Model::setInt((isset($unit["api_id"])) ? $unit["api_id"] : null);
			
			$name = Model::setString((isset($unit["name"])) ? $unit["name"] : null);
			$room_code = Model::setString((isset($unit["room_code"])) ? $unit["room_code"] : null);
			$blurb = Model::setString((isset($unit["blurb"])) ? $unit["blurb"] : null);
			$cover_image = Model::setString((isset($unit["cover_image"])) ? $unit["cover_image"] : "/public/img/unit_cover_placeholder.jpg");
			$meeting_point = Model::setString((isset($unit["meeting_point"])) ? $unit["meeting_point"] : null);
			$description_short = Model::setString((isset($unit["description_short"])) ? $unit["description_short"] : null);
			$time_notes = Model::setString((isset($unit["time_notes"])) ? $unit["time_notes"] : null);
			$start_time = Model::setString((isset($unit["start_time"])) ? $unit["start_time"] : null);
			$end_time = Model::setString((isset($unit["end_time"])) ? $unit["end_time"] : null);
			
			$enabled = Model::setBool((isset($unit["enabled"])) ? $unit["enabled"] : null);
			
			$note = Model::setLongText((isset($unit["note"])) ? $unit["note"] : null);
			$description_long = Model::setLongText((isset($unit["description_long"])) ? $unit["description_long"] : null);
			
			$sql = "
				INSERT INTO unit (
					id, category_id, min_pax, max_pax, min_nights,
					max_nights, api_id, name, room_code, blurb,
					cover_image, meeting_point, time_notes, start_time, end_time,
					description_short, description_long, enabled, date_created, created_by,
					date_modified, modified_by, note
				) VALUES (
					$id, $category_id, $min_pax, $max_pax, $min_nights,
					$max_nights, $api_id, $name, $room_code, $blurb,
					$cover_image, $meeting_point, $time_notes, $start_time, $end_time,
					$description_short, $description_long, $enabled,  CURRENT_TIMESTAMP, $created_by,
					CURRENT_TIMESTAMP, $modified_by, $note
				)
			";
			
			try {
				Model::$db->rawQuery($sql);
				$unit_id = Model::$db->getInsertId();
				
				if ($unit_id) {
					$roomCode = addslashes(buildCode($unit_id, $name, "unit"));
					
					$update = "
                        UPDATE      unit
                        SET         room_code = '$roomCode'
                        WHERE       id = $unit_id;";
					try {
						Model::$db->rawQuery($update);
						
						return self::getByUnitIdAndCategoryId($unit_id, $category_id);
					} catch (Exception $e) {
						Log::$debug_log->error($e->getMessage());
						
						return [];
					}
				} else {
					Log::$debug_log->error("Missing Id");
					
					return [];
				}
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
		/**
		 * @param int|null $unit_id
		 * @param int|null $product_id
		 *
		 * @return array
		 */
		public static function getByUnitIdAndProductId(int $unit_id = null, int $product_id = null): array
		{
			if (is_null($product_id) || is_null($unit_id)) {
				return [];
			}
			
			$sql = "
                SELECT
                        UNIT.id AS 'unit_id',
                        UNIT.category_id AS 'unit_category_id',
                        UNIT.api_id AS 'unit_api_id',
                        UNIT.name AS 'unit_name',
                        UNIT.room_code AS 'unit_room_code',
                        UNIT.enabled AS 'unit_enabled',
                        UNIT.date_created AS 'unit_date_created',
                        UNIT.created_by AS 'unit_created_by',
                        UNIT.date_modified AS 'unit_date_modified',
                        UNIT.modified_by AS 'unit_modified_by',
                        UNIT.note AS 'unit_note',
                        PRODUCT_UNIT.product_id AS 'product_unit_product_id',
                        PRODUCT_UNIT.unit_id AS 'product_unit_id',
                       	COALESCE(PRODUCT_UNIT.keywords, '') AS 'product_unit_keywords',
                        COALESCE(PRODUCT_UNIT.amenities, '') AS 'product_unit_amenities',
                        COALESCE(PRODUCT_UNIT.min_pax, 1) AS 'product_unit_min_pax',
                        COALESCE(PRODUCT_UNIT.max_pax, '&#8734;') AS 'product_unit_max_pax',
                        COALESCE(PRODUCT_UNIT.min_nights, 1) AS 'product_unit_min_nights',
                        COALESCE(PRODUCT_UNIT.max_nights, '&#8734;') AS 'product_unit_max_nights',
                        COALESCE(PRODUCT_UNIT.description_long, '') AS 'product_unit_description_long',
                        COALESCE(PRODUCT_UNIT.description_short, '') AS 'product_unit_description_short',
                        COALESCE(PRODUCT_UNIT.blurb, '') AS 'product_unit_blurb',
                        COALESCE(PRODUCT_UNIT.cover_image, '/public/img/unit_cover_placeholder.jpg') AS 'product_unit_cover_image',
                        COALESCE(PRODUCT_UNIT.meeting_point, '') AS 'product_unit_meeting_point',
                        COALESCE(PRODUCT_UNIT.time_notes, '') AS 'product_unit_time_notes',
                        COALESCE(PRODUCT_UNIT.start_time, '') AS 'product_unit_start_time',
                        COALESCE(PRODUCT_UNIT.end_time, '') AS 'product_unit_end_time',
                        PRODUCT_UNIT.enabled AS 'product_unit_enabled',
                        PRODUCT_UNIT.date_created AS 'product_unit_date_created',
                        PRODUCT_UNIT.created_by AS 'product_unit_created_by',
                        PRODUCT_UNIT.date_modified AS 'product_unit_date_modified',
                        PRODUCT_UNIT.modified_by AS 'product_unit_modified_by',
                        PRODUCT_UNIT.note AS 'product_unit_note'
                FROM 	unit UNIT
                JOIN 	product_unit PRODUCT_UNIT ON PRODUCT_UNIT.unit_id = UNIT.id
                WHERE   PRODUCT_UNIT.product_id = $product_id
                    AND PRODUCT_UNIT.unit_id = $unit_id";
			try {
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
		/**
		 * @param int|null $product_id
		 *
		 * @return array
		 */
		public static function getByProductId(int $product_id = null): array
		{
			if (is_null($product_id)) {
				return [];
			}
			
			$sql = "
                SELECT
                        UNIT.id AS 'unit_id',
                        UNIT.category_id AS 'unit_category_id',
                        UNIT.api_id AS 'unit_api_id',
                        UNIT.name AS 'unit_name',
                        UNIT.room_code AS 'unit_room_code',
                        UNIT.enabled AS 'unit_enabled',
                        UNIT.date_created AS 'unit_date_created',
                        UNIT.created_by AS 'unit_created_by',
                        UNIT.date_modified AS 'unit_date_modified',
                        UNIT.modified_by AS 'unit_modified_by',
                        UNIT.note AS 'unit_note',
                        PRODUCT_UNIT.product_id AS 'product_unit_product_id',
                        PRODUCT_UNIT.unit_id AS 'product_unit_id',
                       	COALESCE(PRODUCT_UNIT.keywords, '') AS 'product_unit_keywords',
                        COALESCE(PRODUCT_UNIT.amenities, '') AS 'product_unit_amenities',
                        COALESCE(PRODUCT_UNIT.min_pax, 1) AS 'product_unit_min_pax',
                        COALESCE(PRODUCT_UNIT.max_pax, '') AS 'product_unit_max_pax',
                        COALESCE(PRODUCT_UNIT.min_nights, 1) AS 'product_unit_min_nights',
                        COALESCE(PRODUCT_UNIT.max_nights, '') AS 'product_unit_max_nights',
                        COALESCE(PRODUCT_UNIT.description_long, '') AS 'product_unit_description_long',
                        COALESCE(PRODUCT_UNIT.description_short, '') AS 'product_unit_description_short',
                        COALESCE(PRODUCT_UNIT.blurb, '') AS 'product_unit_blurb',
                        COALESCE(PRODUCT_UNIT.cover_image, '/public/img/unit_cover_placeholder.jpg') AS 'product_unit_cover_image',
                        COALESCE(PRODUCT_UNIT.meeting_point, '') AS 'product_unit_meeting_point',
                        COALESCE(PRODUCT_UNIT.time_notes, '') AS 'product_unit_time_notes',
                        COALESCE(PRODUCT_UNIT.start_time, '') AS 'product_unit_start_time',
                        COALESCE(PRODUCT_UNIT.end_time, '') AS 'product_unit_end_time',
                        PRODUCT_UNIT.enabled AS 'product_unit_enabled',
                        PRODUCT_UNIT.date_created AS 'product_unit_date_created',
                        PRODUCT_UNIT.created_by AS 'product_unit_created_by',
                        PRODUCT_UNIT.date_modified AS 'product_unit_date_modified',
                        PRODUCT_UNIT.modified_by AS 'product_unit_modified_by',
                        PRODUCT_UNIT.note AS 'product_unit_note'
                FROM 	unit UNIT
                JOIN 	product_unit PRODUCT_UNIT ON PRODUCT_UNIT.unit_id = UNIT.id
                WHERE   PRODUCT_UNIT.product_id = $product_id
            ";
			try {
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
		/**
		 * @param int|null $unit_id
		 * @param int|null $category_id
		 *
		 * @return array
		 */
		public static function getByUnitIdAndCategoryId(int $unit_id = null, int $category_id = null): array
		{
			if (is_null($unit_id)) {
				return [];
			}
			
			if (is_null($category_id)) {
				return [];
			}
			
			$sql = "
                SELECT
                        UNIT.id AS 'unit_id',
                        UNIT.category_id AS 'unit_category_id',
                        UNIT.api_id AS 'unit_api_id',
                        UNIT.name AS 'unit_name',
                        UNIT.room_code AS 'unit_room_code',
                        UNIT.enabled AS 'unit_enabled',
                        UNIT.date_created AS 'unit_date_created',
                        UNIT.created_by AS 'unit_created_by',
                        UNIT.date_modified AS 'unit_date_modified',
                        UNIT.modified_by AS 'unit_modified_by',
                        UNIT.note AS 'unit_note'
                FROM 	unit UNIT
                WHERE   UNIT.id = $unit_id AND UNIT.category_id = $category_id
            ";
			try {
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
		/**
		 * @param array $params
		 *
		 * @return array
		 */
		public static function deleteProductUnit(array $params = []): array
		{
			$unit_id = Model::setInt((isset($params["unit_id"])) ? $params["unit_id"] : null);
			$product_id = Model::setInt((isset($params["product_id"])) ? $params["product_id"] : null);
			
			if (!is_null($unit_id) && !is_null($product_id)) {
				$sql = "DELETE FROM product_unit WHERE product_id = $product_id AND unit_id = $unit_id;";
				try {
					Model::$db->rawQuery("DELETE FROM pricing WHERE matrix_id IN (SELECT id FROM matrix WHERE product_id = $product_id AND unit_id = $unit_id);");
					Model::$db->rawQuery("DELETE FROM matrix WHERE product_id = $product_id AND unit_id = $unit_id;");
					Model::$db->rawQuery("DELETE FROM inventory WHERE product_id = $product_id AND unit_id = $unit_id;");
					Model::$db->rawQuery("DELETE FROM product_unit WHERE product_id = $product_id AND unit_id = $unit_id;");
					Model::$db->rawQuery($sql);
					
					return array("unit_id" => $unit_id);
				} catch (Exception $e) {
					Log::$debug_log->error($e->getMessage());
					
					return [];
				}
			} else {
				Log::$debug_log->error("Missing Fields");
				Log::$debug_log->trace("Season ID $unit_id");
				Log::$debug_log->trace("Product ID $product_id");
				
				return [];
			}
		}
		
		/**
		 * @param string|null $name
		 *
		 * @return array
		 */
		public static function getByName(string $name = null): array
		{
			if (is_null($name)) {
				return [];
			}
			
			$searchTerm = addslashes($name);
			$where = "";
			$order = "";
			$limit = "LIMIT     20";
			
			$whereConditions = array(
				"UNIT.enabled = 1",
				"UNIT.name = '$searchTerm'",
			);
			
			$orderConditions = array(
				"LENGTH(UNIT.name)",
				"CAST(UNIT.name AS UNSIGNED)",
				"UNIT.name",
			);
			
			if (count($whereConditions) > 0) {
				$where = "WHERE     " . implode(" AND ", $whereConditions);
			}
			
			if (count($orderConditions) > 0) {
				$order = "ORDER BY    " . implode(", ", $orderConditions);
			}
			
			$sql = self::$selectQuery . "
                    $where
                    $order
                    $limit;";
			
			try {
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
		}
		
		/**
		 * @param string   $st
		 * @param int|null $category_id
		 *
		 * @return array
		 */
		public static function unit_ac(string $st = "", int $category_id = null): array
		{
			if (is_null($category_id)) {
				return [];
			}
			
			$searchTerm = addslashes($st);
			
			$where = "";
			$order = "";
			$limit = "LIMIT     20";
			
			$whereConditions = array(
				"UNIT.enabled = 1",
				"UNIT.category_id = $category_id",
				"UNIT.name Like '%$searchTerm%'",
			);
			
			$orderConditions = array(
				"LENGTH(UNIT.name)",
				"CAST(UNIT.name AS UNSIGNED)",
				"UNIT.name",
			);
			
			if (count($whereConditions) > 0) {
				$where = "WHERE     " . implode(" AND ", $whereConditions);
			}
			
			if (count($orderConditions) > 0) {
				$order = "ORDER BY    " . implode(", ", $orderConditions);
			}
			
			$sql = self::$selectQuery . "
                    $where
                    $order
                    $limit;";
			
			try {
				
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
		}
		
		/**
		 * Update unit record
		 * Update unit record insert if not exist
		 *
		 * @param array|null $unit
		 *
		 * @return array unit record
		 * @access public
		 */
		public static function updateRecord(array $unit = null): array
		{
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			$id = Model::setInt((isset($unit["id"])) ? $unit["id"] : null);
			$category_id = Model::setInt((isset($unit["category_id"])) ? $unit["category_id"] : null);
			$product_id = Model::setInt((isset($unit["product_id"])) ? $unit["product_id"] : null);
			
			$min_pax = Model::setInt((isset($unit["min_pax"])) ? $unit["min_pax"] : 1);
			$max_pax = Model::setInt((isset($unit["max_pax"])) ? $unit["max_pax"] : 1);
			$min_nights = Model::setInt((isset($unit["min_nights"])) ? $unit["min_nights"] : 1);
			$max_nights = Model::setInt((isset($unit["max_nights"])) ? $unit["max_nights"] : null);
			
			$api_id = Model::setInt((isset($unit["api_id"])) ? $unit["api_id"] : null);
			
			$name = Model::setString((isset($unit["name"])) ? $unit["name"] : null);
			$room_code = Model::setString((isset($unit["room_code"])) ? $unit["room_code"] : null);
			$blurb = Model::setString((isset($unit["blurb"])) ? $unit["blurb"] : null);
			$cover_image = Model::setString((isset($unit["cover_image"])) ? $unit["cover_image"] : "/public/img/unit_cover_placeholder.jpg");
			$meeting_point = Model::setString((isset($unit["meeting_point"])) ? $unit["meeting_point"] : null);
			$description_short = Model::setString((isset($unit["description_short"])) ? $unit["description_short"] : null);
			$time_notes = Model::setString((isset($unit["time_notes"])) ? $unit["time_notes"] : null);
			$start_time = Model::setString((isset($unit["start_time"])) ? $unit["start_time"] : null);
			$end_time = Model::setString((isset($unit["end_time"])) ? $unit["end_time"] : null);
			
			$enabled = Model::setBool((isset($unit["enabled"])) ? $unit["enabled"] : null);
			
			$keywords = Model::setLongText((isset($unit["keywords"])) ? $unit["keywords"] : null);
			$amenities = Model::setLongText((isset($unit["amenities"])) ? $unit["amenities"] : null);
			$note = Model::setLongText((isset($unit["note"])) ? $unit["note"] : null);
			$description_long = Model::setLongText((isset($unit["description_long"])) ? $unit["description_long"] : null);
			
			$sql = "
            INSERT INTO unit (
                id, category_id,
                api_id, name, room_code,
                enabled, date_created, created_by,
                date_modified, modified_by, note
            ) VALUES (
                $id, $category_id,
                $api_id, $name, $room_code,
                $enabled, CURRENT_TIMESTAMP, $created_by,
                CURRENT_TIMESTAMP, $modified_by, $note
            )
            ON DUPLICATE KEY UPDATE
                
                api_id = VALUES(api_id),
                name = VALUES(name),
                room_code = VALUES(room_code),
                note = VALUES(note),
                modified_by = VALUES(modified_by),
                date_modified = VALUES(date_modified),
                enabled = VALUES(enabled)
            ";
			
			try {
				Model::$db->rawQuery($sql);
				if ((!$id)) {
					$unit_id = Model::$db->getInsertId();
				} else {
					$unit_id = $id;
				}
				
				if ($unit_id) {
					$unit_id = (int)$unit_id;
					$roomCode = addslashes(buildCode($unit_id, $name, "unit"));
					
					$update = "
                        UPDATE      unit
                        SET         room_code = '$roomCode'
                        WHERE       id = $unit_id;";
					try {
						Model::$db->rawQuery($update);
						
						try {
							$product_unit_sql = "
                                INSERT INTO product_unit (
                                    product_id, unit_id, min_pax, max_pax, min_nights,
                                    max_nights, description_long, description_short, blurb, cover_image,
                                    meeting_point, time_notes, start_time, end_time, enabled,
                                    date_created, created_by, date_modified, modified_by, note,
                                    keywords, amenities
                                ) VALUES (
                                    $product_id, $unit_id, $min_pax, $max_pax, $min_nights,
                                    $max_nights, $description_long, $description_short, $blurb, $cover_image,
                                    $meeting_point, $time_notes, $start_time, $end_time, $enabled,
                                    CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP, $modified_by, $note,
                                    $keywords, $amenities
                                )
                                ON DUPLICATE KEY UPDATE
                                    min_pax = VALUES(min_pax),
                                    max_pax = VALUES(max_pax),
                                    min_nights = VALUES(min_nights),
                                    max_nights = VALUES(max_nights),
                                    blurb = VALUES(blurb),
                                    cover_image = VALUES(cover_image),
                                    meeting_point = VALUES(meeting_point),
                                    time_notes = VALUES(time_notes),
                                    start_time = VALUES(start_time),
                                    end_time = VALUES(end_time),
                                    description_short = VALUES(description_short),
                                    description_long = VALUES(description_long),
                                    note = VALUES(note),
									keywords = VALUES(keywords),
                                	amenities = VALUES(amenities),
                                    modified_by = VALUES(modified_by),
                                    date_modified = VALUES(date_modified),
                                    enabled = VALUES(enabled)
                                ";
							
							Model::$db->rawQuery($product_unit_sql);
							
							return self::getByUnitIdAndProductId($unit_id, $product_id);
						} catch (Exception $ex) {
							Log::$debug_log->error($ex);
							
							return [];
							
						}
						
					} catch (Exception $ex) {
						Log::$debug_log->error($ex);
						
						return [];
					}
					
				} else {
					Log::$debug_log->error("Unit Id Not Generated");
					
					return [];
				}
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
			
		}
		
	}
