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
		
		protected static $dbTable = "unit";
		protected static $dbFields = Array();
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
            WHERE   UNIT.enabled = 1
        ";
		
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
		
		public static function update(array $params = []): array
		{
			$id = 1;
			
			return Model::get($id);
		}
		
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
				//Log::$debug_log->trace($sql);
				
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
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
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function deleteProductUnit(array $params = []): array
		{
			$unit_id = Model::setInt((isset($params["unit_id"])) ? $params["unit_id"] : null);
			$product_id = Model::setInt((isset($params["product_id"])) ? $params["product_id"] : null);
			
			if (!is_null($unit_id) && !is_null($product_id)) {
				$sql = "
		            DELETE FROM product_unit
					WHERE 		product_id = $product_id
						AND		unit_id = $unit_id;";
				try {
					Model::$db->rawQuery($sql);
					
					return array("unit_id" => $unit_id);
				} catch (Exception $e) {
					Log::$debug_log->error($e);
					
					return [];
				}
			} else {
				Log::$debug_log->error("Missing Fields");
				Log::$debug_log->trace("Season ID $unit_id");
				Log::$debug_log->trace("Product ID $product_id");
				
				return [];
			}
		}
		
		public static function getByName(string $name = null): array
		{
			if (is_null($name)) {
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
                        UNIT.min_pax AS 'unit_min_pax',
                        UNIT.max_pax AS 'unit_max_pax',
                        UNIT.min_nights AS 'unit_min_nights',
                        UNIT.max_nights AS 'unit_max_nights',
                        UNIT.description_long AS 'unit_description_long',
                        UNIT.description_short AS 'unit_description_short',
                        UNIT.blurb AS 'unit_blurb',
                        UNIT.cover_image AS 'unit_cover_image',
                        UNIT.meeting_point AS 'unit_meeting_point',
                        UNIT.time_notes AS 'unit_time_notes',
                        UNIT.start_time AS 'unit_start_time',
                        UNIT.end_time AS 'unit_end_time'
                FROM 	unit UNIT
                WHERE   UNIT.name = '$name'
            ";
			try {
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function unit_ac(string $st = "", int $category_id = null): array
		{
			if (is_null($category_id)) {
				return [];
			}
			
			try {
				$searchTerm = addslashes($st);
				
				$sql = self::$selectQuery . "
                    AND			UNIT.name LIKE '%$searchTerm%'
                    AND         UNIT.category_id = $category_id
                    ORDER BY    LENGTH(UNIT.name), CAST(UNIT.name AS UNSIGNED), UNIT.name ASC
                    LIMIT 20;";
				
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
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
				//Log::$debug_log->trace($sql);
				Model::$db->rawQuery($sql);
				$unit_id = Model::$db->getInsertId();
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
                                    date_created, created_by, date_modified, modified_by, note
                                ) VALUES (
                                    $product_id, $unit_id, $min_pax, $max_pax, $min_nights,
                                    $max_nights, $description_long, $description_short, $blurb, $cover_image,
                                    $meeting_point, $time_notes, $start_time, $end_time, $enabled,
                                    CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP, $modified_by, $note
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
				Log::$debug_log->error($e);
				
				return [];
			}
			
		}
		
	}
