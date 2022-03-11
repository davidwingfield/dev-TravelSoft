<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\App\Controllers\Address;
	use Framework\App\Controllers\Image;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short Image Description
	 * Long Image Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class ImageModel extends Model
	{
		
		protected static $sql = "
            SELECT  		IMAGE.id AS 'image_id',
                            IMAGE.name AS 'image_name',
                            IMAGE.extension AS 'image_extension',
                            IMAGE.dimensions AS 'image_dimensions',
                            IMAGE.size AS 'image_size',
                            IMAGE.height AS 'image_height',
                            IMAGE.width AS 'image_width',
                            IMAGE.enabled AS 'image_enabled',
                            IMAGE.date_created AS 'image_date_created',
                            IMAGE.created_by AS 'image_created_by',
                            IMAGE.date_modified AS 'image_date_modified',
                            IMAGE.modified_by AS 'image_modified_by',
                            IMAGE.note AS 'image_note'
            FROM 			image IMAGE
        ";
		
		public static function update(array $image = []): array
		{
			if (!isset($image)) {
				return [];
			}
			
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$id = Model::setInt((isset($image["id"])) ? $image["id"] : null);
			$name = Model::setString((isset($image["name"])) ? $image["name"] : null);
			$directory = (isset($image["directory"])) ? $image["directory"] : null;
			$directory_id = (isset($image["directory_id"])) ? $image["directory_id"] : null;
			$path = Model::setString((isset($image["path"])) ? $image["path"] : null);
			$size = Model::setString((isset($image["size"])) ? $image["size"] : null);
			$extension = Model::setString((isset($image["extension"])) ? $image["extension"] : null);
			$dimensions = Model::setString((isset($image["dimensions"])) ? $image["dimensions"] : null);
			$title = Model::setLongText((isset($image["title"])) ? $image["title"] : null);
			$caption = Model::setLongText((isset($image["caption"])) ? $image["caption"] : null);
			$alt = Model::setLongText((isset($image["alt"])) ? $image["alt"] : null);
			$is_cover = Model::setBool((isset($image["is_cover"])) ? $image["is_cover"] : null);
			$width = Model::setInt((isset($image["width"])) ? $image["width"] : null);
			$height = Model::setInt((isset($image["height"])) ? $image["height"] : null);
			$enabled = Model::setBool((isset($image["enabled"])) ? $image["enabled"] : null);
			$note = Model::setLongText((isset($image["note"])) ? $image["note"] : null);
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			try {
				if ($is_cover) {
					$updateSql = "
                        UPDATE      image
                        SET         is_cover = 0
                        WHERE       image.id IN (SELECT image_id AS 'id' FROM company_image WHERE ${directory}_image.company_id = $directory_id)
                    ";
					Model::$db->rawQuery($updateSql);
				}
				
				try {
					$sql = "
                		INSERT INTO image (
                    id, name, title, caption, alt,
                    is_cover, path, extension, dimensions,
                    size, height, width, enabled,
                    date_created, created_by, date_modified, modified_by,
                    note
                ) VALUES (
                    $id, $name, $title, $caption, $alt,
                    $is_cover, $path, $extension, $dimensions,
                    $size, $height, $width, $enabled,
                    CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP, $modified_by,
                    $note
                )
                ON DUPLICATE KEY UPDATE
                    name = VALUES(name),
                    alt = VALUES(alt),
                    title = VALUES(title),
                    caption = VALUES(caption),
                    is_cover = VALUES(is_cover),
                    path = VALUES(path),
                    extension = VALUES(extension),
                    dimensions = VALUES(dimensions),
                    size = VALUES(size),
                    height = VALUES(height),
                    width = VALUES(width),
                    modified_by = VALUES(modified_by),
                    enabled = VALUES(enabled),
                    date_modified = VALUES(date_modified);
            		";
					Model::$db->rawQuery($sql);
					$image_id = Model::$db->getInsertId();
					switch ($directory) {
						case "company":
							return self::updateCompanyImage($directory_id, $image_id);
							break;
						case "product":
							return [];
							//return self::updateProductImage($directory_id, $image_id);
							break;
						default:
							return [];
					}
				} catch (Exception $e) {
					Log::$debug_log->error($e);
					
					return [];
				}
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function get(int $image_id = null): array
		{
			$where = "";
			if (!is_null($image_id)) {
				$where = "
                WHERE       IMAGE.id = $image_id
                ";
			}
			
			$sql = self::$sql . $where;
			
			try {
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function updateCompanyImage(int $company_id = null, int $image_id = null): array
		{
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$enabled = Model::setBool((isset($company["enabled"])) ? $company["enabled"] : null);
			$note = Model::setLongText((isset($company["note"])) ? $company["note"] : null);
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			$sql = "
                INSERT INTO company_image (
                    company_id, image_id, enabled, created_by,
                    date_created, modified_by, date_modified, note
                ) VALUES (
                    $company_id, $image_id, $enabled, $created_by,
                    CURRENT_TIMESTAMP, $modified_by, CURRENT_TIMESTAMP, $note
                )
                ON DUPLICATE KEY UPDATE
                    modified_by = VALUES(modified_by),
                    enabled = VALUES(enabled),
                    date_modified = VALUES(date_modified);
            ";
			
			try {
				Model::$db->rawQuery($sql);
				
				return self::get($image_id);
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
			
		}
		
		public static function getByProductId(int $product_id = null, int $image_id = null): array
		{
			if (is_null($product_id)) {
				
				return [];
			}
			
			$whereCondition = "WHERE			PRODUCT_IMAGE.product_id = $product_id";
			
			if (!is_null($image_id)) {
				
				$whereCondition = $whereCondition . "
					AND		PRODUCT_IMAGE.image_id = $image_id
				";
			}
			
			$sql = "
                SELECT
                                PRODUCT_IMAGE.product_id AS 'product_image_product_id',
                                PRODUCT_IMAGE.image_id AS 'product_image_image_id',
                       			PRODUCT_IMAGE.title AS 'image_title',
                       			PRODUCT_IMAGE.alt AS 'image_alt',
                                PRODUCT_IMAGE.caption AS 'image_caption',
                                PRODUCT_IMAGE.path AS 'image_path',
                       			PRODUCT_IMAGE.thumbs_path AS 'image_thumbs_path',
                       			PRODUCT_IMAGE.is_cover AS 'image_is_cover',
                       			PRODUCT_IMAGE.is_shown AS 'image_is_shown',
                                PRODUCT_IMAGE.enabled AS 'product_image_enabled',
                                PRODUCT_IMAGE.date_created AS 'product_image_date_created',
                       			PRODUCT_IMAGE.created_by AS 'product_image_created_by',
                                PRODUCT_IMAGE.date_modified AS 'product_image_date_modified',
                       			PRODUCT_IMAGE.modified_by AS 'product_image_modified_by',
                                PRODUCT_IMAGE.note AS 'product_image_note',
                                IMAGE.id AS 'image_id',
                                IMAGE.name AS 'image_name',
                                IMAGE.extension AS 'image_extension',
                       			IMAGE.type AS 'image_type',
                       			IMAGE.ratio AS 'image_ratio',
                                IMAGE.dimensions AS 'image_dimensions',
                                IMAGE.size AS 'image_size',
                                IMAGE.height AS 'image_height',
                                IMAGE.width AS 'image_width',
                                IMAGE.enabled AS 'image_enabled',
                                IMAGE.date_created AS 'image_date_created',
                                IMAGE.created_by AS 'image_created_by',
                                IMAGE.date_modified AS 'image_date_modified',
                                IMAGE.modified_by AS 'image_modified_by',
                                IMAGE.note AS 'image_note'
                FROM 			product_image PRODUCT_IMAGE
                JOIN			image IMAGE ON IMAGE.id = PRODUCT_IMAGE.image_id
                $whereCondition
            ";
			
			try {
				//Log::$debug_log->trace($sql);
				
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function getByUnitId(int $unit_id = null, int $image_id = null): array
		{
			if (is_null($unit_id)) {
				
				return [];
			}
			
			$whereCondition = "WHERE			UNIT_IMAGE.unit_id = $unit_id";
			
			if (!is_null($image_id)) {
				
				$whereCondition = $whereCondition . "
					AND		UNIT_IMAGE.image_id = $image_id
				";
			}
			
			$sql = "
                SELECT
                                UNIT_IMAGE.unit_id AS 'product_image_product_id',
                                UNIT_IMAGE.image_id AS 'product_image_image_id',
                       			UNIT_IMAGE.title AS 'image_title',
                       			UNIT_IMAGE.alt AS 'image_alt',
                                UNIT_IMAGE.caption AS 'image_caption',
                                UNIT_IMAGE.path AS 'image_path',
                       			UNIT_IMAGE.thumbs_path AS 'image_thumbs_path',
                       			UNIT_IMAGE.is_cover AS 'image_is_cover',
                       			UNIT_IMAGE.is_shown AS 'image_is_shown',
                                UNIT_IMAGE.enabled AS 'product_image_enabled',
                                UNIT_IMAGE.date_created AS 'product_image_date_created',
                       			UNIT_IMAGE.created_by AS 'product_image_created_by',
                                UNIT_IMAGE.date_modified AS 'product_image_date_modified',
                       			UNIT_IMAGE.modified_by AS 'product_image_modified_by',
                                UNIT_IMAGE.note AS 'product_image_note',
                                IMAGE.id AS 'image_id',
                                IMAGE.name AS 'image_name',
                                IMAGE.extension AS 'image_extension',
                       			IMAGE.type AS 'image_type',
                       			IMAGE.ratio AS 'image_ratio',
                                IMAGE.dimensions AS 'image_dimensions',
                                IMAGE.size AS 'image_size',
                                IMAGE.height AS 'image_height',
                                IMAGE.width AS 'image_width',
                                IMAGE.enabled AS 'image_enabled',
                                IMAGE.date_created AS 'image_date_created',
                                IMAGE.created_by AS 'image_created_by',
                                IMAGE.date_modified AS 'image_date_modified',
                                IMAGE.modified_by AS 'image_modified_by',
                                IMAGE.note AS 'image_note'
                FROM 			unit_image UNIT_IMAGE
                JOIN			image IMAGE ON IMAGE.id = UNIT_IMAGE.image_id
                $whereCondition
            ";
			
			try {
				Log::$debug_log->trace($sql);
				
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function fetchImagesByUnitId(int $unit_id = null, int $image_id = null): array
		{
			if (is_null($unit_id)) {
				
				return [];
			}
			
			$whereCondition = "WHERE			UNIT_IMAGE.unit_id = $unit_id";
			
			if (!is_null($image_id)) {
				
				$whereCondition = $whereCondition . "
					AND		UNIT_IMAGE.image_id = $image_id
				";
			}
			
			$sql = "
                SELECT
                       			UNIT_IMAGE.title AS 'image_title',
                       			UNIT_IMAGE.alt AS 'image_alt',
                                UNIT_IMAGE.caption AS 'image_caption',
                                UNIT_IMAGE.path AS 'image_path',
                       			UNIT_IMAGE.thumbs_path AS 'image_thumbs_path',
                       			UNIT_IMAGE.is_cover AS 'image_is_cover',
                       			UNIT_IMAGE.is_shown AS 'image_is_shown',
                                UNIT_IMAGE.enabled AS 'product_image_enabled',
                                UNIT_IMAGE.date_created AS 'product_image_date_created',
                       			UNIT_IMAGE.created_by AS 'product_image_created_by',
                                UNIT_IMAGE.date_modified AS 'product_image_date_modified',
                       			UNIT_IMAGE.modified_by AS 'product_image_modified_by',
                                UNIT_IMAGE.note AS 'product_image_note',
                                IMAGE.id AS 'image_id',
                                IMAGE.name AS 'image_name',
                                IMAGE.extension AS 'image_extension',
                       			IMAGE.type AS 'image_type',
                       			IMAGE.ratio AS 'image_ratio',
                                IMAGE.dimensions AS 'image_dimensions',
                                IMAGE.size AS 'image_size',
                                IMAGE.height AS 'image_height',
                                IMAGE.width AS 'image_width',
                                IMAGE.enabled AS 'image_enabled',
                                IMAGE.date_created AS 'image_date_created',
                                IMAGE.created_by AS 'image_created_by',
                                IMAGE.date_modified AS 'image_date_modified',
                                IMAGE.modified_by AS 'image_modified_by',
                                IMAGE.note AS 'image_note'
                FROM 			unit_image UNIT_IMAGE
                JOIN			image IMAGE ON IMAGE.id = UNIT_IMAGE.image_id
                $whereCondition
            ";
			
			try {
				//Log::$debug_log->trace($sql);
				
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function fetchImagesByCompanyId(int $company_id = null, int $image_id = null): array
		{
			if (is_null($company_id)) {
				
				return [];
			}
			
			$whereCondition = "WHERE			COMPANY_IMAGE.company_id = $company_id";
			
			if (!is_null($image_id)) {
				
				$whereCondition = $whereCondition . "
					AND		COMPANY_IMAGE.image_id = $image_id
				";
			}
			
			$sql = "
                SELECT
                       			COMPANY_IMAGE.title AS 'image_title',
                       			COMPANY_IMAGE.alt AS 'image_alt',
                                COMPANY_IMAGE.caption AS 'image_caption',
                                COMPANY_IMAGE.path AS 'image_path',
                       			COMPANY_IMAGE.thumbs_path AS 'image_thumbs_path',
                       			COMPANY_IMAGE.is_cover AS 'image_is_cover',
                       			COMPANY_IMAGE.is_shown AS 'image_is_shown',
                                COMPANY_IMAGE.enabled AS 'product_image_enabled',
                                COMPANY_IMAGE.date_created AS 'product_image_date_created',
                       			COMPANY_IMAGE.created_by AS 'product_image_created_by',
                                COMPANY_IMAGE.date_modified AS 'product_image_date_modified',
                       			COMPANY_IMAGE.modified_by AS 'product_image_modified_by',
                                COMPANY_IMAGE.note AS 'product_image_note',
                                IMAGE.id AS 'image_id',
                                IMAGE.name AS 'image_name',
                                IMAGE.extension AS 'image_extension',
                       			IMAGE.type AS 'image_type',
                       			IMAGE.ratio AS 'image_ratio',
                                IMAGE.dimensions AS 'image_dimensions',
                                IMAGE.size AS 'image_size',
                                IMAGE.height AS 'image_height',
                                IMAGE.width AS 'image_width',
                                IMAGE.enabled AS 'image_enabled',
                                IMAGE.date_created AS 'image_date_created',
                                IMAGE.created_by AS 'image_created_by',
                                IMAGE.date_modified AS 'image_date_modified',
                                IMAGE.modified_by AS 'image_modified_by',
                                IMAGE.note AS 'image_note'
                FROM 			company_image COMPANY_IMAGE
                JOIN			image IMAGE ON IMAGE.id = COMPANY_IMAGE.image_id
                $whereCondition
            ";
			
			try {
				//Log::$debug_log->trace($sql);
				
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function fetchImagesByProductId(int $product_id = null, int $image_id = null): array
		{
			if (is_null($product_id)) {
				
				return [];
			}
			
			$whereCondition = "WHERE			PRODUCT_IMAGE.product_id = $product_id";
			
			if (!is_null($image_id)) {
				
				$whereCondition = $whereCondition . "
					AND		PRODUCT_IMAGE.image_id = $image_id
				";
			}
			
			$sql = "
                SELECT
                       			PRODUCT_IMAGE.title AS 'image_title',
                       			PRODUCT_IMAGE.alt AS 'image_alt',
                                PRODUCT_IMAGE.caption AS 'image_caption',
                                PRODUCT_IMAGE.path AS 'image_path',
                       			PRODUCT_IMAGE.thumbs_path AS 'image_thumbs_path',
                       			PRODUCT_IMAGE.is_cover AS 'image_is_cover',
                       			PRODUCT_IMAGE.is_shown AS 'image_is_shown',
                                PRODUCT_IMAGE.enabled AS 'product_image_enabled',
                                PRODUCT_IMAGE.date_created AS 'product_image_date_created',
                       			PRODUCT_IMAGE.created_by AS 'product_image_created_by',
                                PRODUCT_IMAGE.date_modified AS 'product_image_date_modified',
                       			PRODUCT_IMAGE.modified_by AS 'product_image_modified_by',
                                PRODUCT_IMAGE.note AS 'product_image_note',
                                IMAGE.id AS 'image_id',
                                IMAGE.name AS 'image_name',
                                IMAGE.extension AS 'image_extension',
                       			IMAGE.type AS 'image_type',
                       			IMAGE.ratio AS 'image_ratio',
                                IMAGE.dimensions AS 'image_dimensions',
                                IMAGE.size AS 'image_size',
                                IMAGE.height AS 'image_height',
                                IMAGE.width AS 'image_width',
                                IMAGE.enabled AS 'image_enabled',
                                IMAGE.date_created AS 'image_date_created',
                                IMAGE.created_by AS 'image_created_by',
                                IMAGE.date_modified AS 'image_date_modified',
                                IMAGE.modified_by AS 'image_modified_by',
                                IMAGE.note AS 'image_note'
                FROM 			product_image PRODUCT_IMAGE
                JOIN			image IMAGE ON IMAGE.id = PRODUCT_IMAGE.image_id
                $whereCondition
            ";
			
			try {
				//Log::$debug_log->trace($sql);
				
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function getByCompanyId(int $company_id = null): array
		{
			if (is_null($company_id)) {
				
				return [];
			}
			
			$sql = "
                SELECT
                                COMPANY_IMAGE.company_id AS 'company_image_company_id',
                                COMPANY_IMAGE.image_id AS 'product_image_image_id',
                       			COMPANY_IMAGE.title AS 'image_title',
                       			COMPANY_IMAGE.alt AS 'image_alt',
                                COMPANY_IMAGE.caption AS 'image_caption',
                                COMPANY_IMAGE.path AS 'image_path',
                       			COMPANY_IMAGE.thumbs_path AS 'image_thumbs_path',
                       			COMPANY_IMAGE.is_cover AS 'image_is_cover',
                       			COMPANY_IMAGE.is_shown AS 'image_is_shown',
                                COMPANY_IMAGE.enabled AS 'product_image_enabled',
                                COMPANY_IMAGE.date_created AS 'product_image_date_created',
                       			COMPANY_IMAGE.created_by AS 'product_image_created_by',
                                COMPANY_IMAGE.date_modified AS 'product_image_date_modified',
                       			COMPANY_IMAGE.modified_by AS 'product_image_modified_by',
                                COMPANY_IMAGE.note AS 'product_image_note',
                                IMAGE.id AS 'image_id',
                                IMAGE.type AS 'image_type',
                                IMAGE.name AS 'image_name',
                                IMAGE.ratio AS 'image_ratio',
                                IMAGE.extension AS 'image_extension',
                                IMAGE.dimensions AS 'image_dimensions',
                                IMAGE.size AS 'image_size',
                                IMAGE.height AS 'image_height',
                                IMAGE.width AS 'image_width',
                                IMAGE.enabled AS 'image_enabled',
                                IMAGE.date_created AS 'image_date_created',
                                IMAGE.created_by AS 'image_created_by',
                                IMAGE.date_modified AS 'image_date_modified',
                                IMAGE.modified_by AS 'image_modified_by',
                                IMAGE.note AS 'image_note'
                FROM 			company_image COMPANY_IMAGE
                JOIN			image IMAGE ON IMAGE.id = COMPANY_IMAGE.image_id
                WHERE			COMPANY_IMAGE.company_id = $company_id;
            ";
			try {
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function getByImageId(int $image_id = null): array
		{
			if (is_null($image_id)) {
				Log::$debug_log->error("Missing Image Id");
				
				return [];
			}
			
			$sql = "
                SELECT
                                IMAGE.id AS 'image_id',
                                IMAGE.alt AS 'image_alt',
                                IMAGE.name AS 'image_name',
                                IMAGE.title AS 'image_title',
                                IMAGE.caption AS 'image_caption',
                                IMAGE.is_cover AS 'image_is_cover',
                                IMAGE.path AS 'image_path',
                                IMAGE.extension AS 'image_extension',
                                IMAGE.dimensions AS 'image_dimensions',
                                IMAGE.size AS 'image_size',
                                IMAGE.height AS 'image_height',
                                IMAGE.width AS 'image_width',
                                IMAGE.enabled AS 'image_enabled',
                                IMAGE.date_created AS 'image_date_created',
                                IMAGE.created_by AS 'image_created_by',
                                IMAGE.date_modified AS 'image_date_modified',
                                IMAGE.modified_by AS 'image_modified_by',
                                IMAGE.note AS 'image_note'
                FROM 			image IMAGE
                
                WHERE			IMAGE.id = $image_id;
            ";
			try {
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function delete(array $image = null): bool
		{
			if (is_null($image)) {
				Log::$debug_log->error("Missing Image");
				
				return false;
			}
			$imageId = (isset($image["image_id"])) ? (int)$image["image_id"] : null;
			$source = (isset($image["source"])) ? $image["source"] : null;
			$sourceId = (isset($image["source_id"])) ? (int)$image["source_id"] : null;
			
			/*
			Log::$debug_log->trace($image);
			Log::$debug_log->trace("imageId:    $imageId");
			Log::$debug_log->trace("source:    $source");
			Log::$debug_log->trace("sourceId:    $sourceId");
			//*/
			if (!is_null($imageId) && !is_null($source) && !is_null($sourceId)) {
				$imageDeleteProductSQL = "
					DELETE FROM product_image
					WHERE image_id = $imageId;
				";
				
				$imageDeleteCompanySQL = "
					DELETE FROM company_image
					WHERE image_id = $imageId;
				";
				
				$imageDeleteUnitSQL = "
					DELETE FROM unit_image
					WHERE image_id = $imageId;
				";
				
				$imageDeleteUserSQL = "
					DELETE FROM user_image
					WHERE image_id = $imageId;
				";
				
				$imageDeleteImageSQL = "
					DELETE FROM image
					WHERE id = $imageId;
            	";
				
				try {
					
					Model::$db->rawQuery($imageDeleteProductSQL);
					
					try {
						
						Model::$db->rawQuery($imageDeleteCompanySQL);
						
						try {
							
							Model::$db->rawQuery($imageDeleteUnitSQL);
							
							try {
								
								Model::$db->rawQuery($imageDeleteUserSQL);
								
								try {
									
									Model::$db->rawQuery($imageDeleteImageSQL);
									
									return true;
								} catch (Exception $e) {
									Log::$debug_log->error($e);
									
									return false;
								}
							} catch (Exception $e) {
								Log::$debug_log->error($e);
								
								return false;
							}
						} catch (Exception $e) {
							Log::$debug_log->error($e);
							
							return false;
						}
					} catch (Exception $e) {
						Log::$debug_log->error($e);
						
						return false;
					}
				} catch (Exception $e) {
					Log::$debug_log->error($e);
					
					return false;
				}
			} else {
				Log::$debug_log->error("Missing Fields");
				Log::$debug_log->info("imageId:    $imageId");
				Log::$debug_log->info("source:     $source");
				Log::$debug_log->info("sourceId:   $sourceId");
				
				return false;
			}
		}
		
		public static function clearCoverImages(array $image = null): bool
		{
			if (is_null($image)) {
				Log::$debug_log->error("Missing Image Fields");
				
				return false;
			}
			
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$image_id = Model::setInt((isset($image["image_id"])) ? $image["image_id"] : null);
			$directory_id = (isset($image["directory_id"])) ? $image["directory_id"] : null;
			$directory = (isset($image["directory"])) ? $image["directory"] : null;
			$path = Model::setString((isset($image["path"])) ? $image["path"] : null);
			$thumbs_path = Model::setString((isset($image["thumbs_path"])) ? $image["thumbs_path"] : null);
			$title = Model::setLongText((isset($image["title"])) ? $image["title"] : null);
			$caption = Model::setLongText((isset($image["caption"])) ? $image["caption"] : null);
			$alt = Model::setLongText((isset($image["alt"])) ? $image["alt"] : null);
			$is_cover = Model::setBool((isset($image["is_cover"])) ? $image["is_cover"] : null);
			$is_shown = Model::setBool((isset($image["is_shown"])) ? $image["is_shown"] : null);
			$enabled = Model::setBool((isset($image["enabled"])) ? $image["enabled"] : null);
			$note = Model::setLongText((isset($image["note"])) ? $image["note"] : null);
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			$tableName = "UPDATE 	" . $directory . "_image";
			$tableIdField = "WHERE 	" . $directory . "_id = $directory_id";
			
			$updateCoverImageSQL = "
				$tableName
				SET     is_cover = 0,
						date_modified = CURRENT_TIMESTAMP,
						modified_by = $modified_by
				$tableIdField;
			";
			
			try {
				Model::$db->rawQuery($updateCoverImageSQL);
				
				return true;
			} catch (Exception $e) {
				$error = $e->getMessage();
				Log::$debug_log->error($error);
				
				return false;
			}
		}
		
		public static function updateImageRecord(array $image = null): array
		{
			if (!isset($image)) {
				return [];
			}
			
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$id = Model::setInt((isset($image["id"])) ? $image["id"] : null);
			$name = Model::setString((isset($image["name"])) ? $image["name"] : null);
			$type = Model::setString((isset($image["type"])) ? $image["type"] : null);
			$ratio = Model::setString((isset($image["ratio"])) ? $image["ratio"] : null);
			$directory = (isset($image["directory"])) ? $image["directory"] : null;
			$directory_id = (isset($image["directory_id"])) ? $image["directory_id"] : null;
			$size = Model::setString((isset($image["size"])) ? $image["size"] : null);
			$extension = Model::setString((isset($image["extension"])) ? $image["extension"] : null);
			$dimensions = Model::setString((isset($image["dimensions"])) ? $image["dimensions"] : null);
			$width = Model::setInt((isset($image["width"])) ? $image["width"] : null);
			$height = Model::setInt((isset($image["height"])) ? $image["height"] : null);
			$enabled = Model::setBool((isset($image["enabled"])) ? $image["enabled"] : null);
			$note = Model::setLongText((isset($image["note"])) ? $image["note"] : null);
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			try {
				$sql = "
                    INSERT INTO image (
	                    id, name, extension, dimensions, type, ratio,
	                    size, height, width, enabled,
	                    date_created, created_by, date_modified, modified_by,
	                    note
	                ) VALUES (
	                    $id, $name, $extension, $dimensions, $type, $ratio,
	                    $size, $height, $width, $enabled,
	                    CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP, $modified_by,
	                    $note
	                )
	                ON DUPLICATE KEY UPDATE
	                    name = VALUES(name),
	                    extension = VALUES(extension),
	                    dimensions = VALUES(dimensions),
	                	type = VALUES(type),
						ratio = VALUES(ratio),
	                    size = VALUES(size),
	                    height = VALUES(height),
	                    width = VALUES(width),
	                    modified_by = VALUES(modified_by),
	                    enabled = VALUES(enabled),
	                    date_modified = VALUES(date_modified);
                ";
				
				Log::$debug_log->trace($sql);
				
				Model::$db->rawQuery($sql);
				$imageId = Model::$db->getInsertId();
				
				if ($imageId) {
					
					switch ($directory) {
						case "product":
							$image["image_id"] = (int)$imageId;
							$image["product_id"] = (int)$directory_id;
							
							return self::updateProductImageRecord($image);
						case "unit":
							$image["image_id"] = (int)$imageId;
							$image["unit_id"] = (int)$directory_id;
							
							return self::updateUnitImageRecord($image);
						case "company":
							$image["image_id"] = (int)$imageId;
							$image["company_id"] = (int)$directory_id;
							
							return self::updateCompanyImageRecord($image);
						default:
							return [];
					}
				}
				
				return [];
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return [];
			}
		}
		
		public static function updateProductImageRecord(array $image = null): array
		{
			if (is_null($image)) {
				Log::$debug_log->error("Missing Image Fields");
				
				return [];
			}
			
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$image_id = Model::setInt((isset($image["image_id"])) ? $image["image_id"] : null);
			$product_id = Model::setInt((isset($image["product_id"])) ? $image["product_id"] : null);
			$path = Model::setString((isset($image["path"])) ? $image["path"] : null);
			$thumbs_path = Model::setString((isset($image["thumbs_path"])) ? $image["thumbs_path"] : null);
			$title = Model::setLongText((isset($image["title"])) ? $image["title"] : null);
			$caption = Model::setLongText((isset($image["caption"])) ? $image["caption"] : null);
			$alt = Model::setLongText((isset($image["alt"])) ? $image["alt"] : null);
			$is_cover = Model::setBool((isset($image["is_cover"])) ? $image["is_cover"] : null);
			$is_shown = Model::setBool((isset($image["is_shown"])) ? $image["is_shown"] : null);
			$enabled = Model::setBool((isset($image["enabled"])) ? $image["enabled"] : null);
			$note = Model::setLongText((isset($image["note"])) ? $image["note"] : null);
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			if ($is_cover === 1) {
				if (!self::clearCoverImages($image)) {
					Log::$debug_log->error("Error Clearing Cover");
					
					return [];
				}
			}
			
			$updateProductImageSQL = "
				INSERT INTO product_image (
					product_id, image_id, is_shown, is_cover, enabled,
					title, caption, alt, path, thumbs_path,
					date_created, created_by, date_modified, modified_by, note
				) VALUES (
					$product_id, $image_id, $is_shown, $is_cover, $enabled,
					$title, $caption, $alt, $path, $thumbs_path,
					CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP, $modified_by, $note
				)
				ON DUPLICATE KEY UPDATE
					is_shown = VALUES(is_shown),
					is_cover = VALUES(is_cover),
				    alt = VALUES(alt),
					title = VALUES(title),
					caption = VALUES(caption),
					path = VALUES(path),
					thumbs_path = VALUES(thumbs_path),
					modified_by = VALUES(modified_by),
					enabled = VALUES(enabled),
					date_modified = VALUES(date_modified);
			";
			
			//Log::$debug_log->trace($updateProductImageSQL);
			
			try {
				Model::$db->rawQuery($updateProductImageSQL);
				
				return self::fetchImagesByProductId($product_id, $image_id);
			} catch (Exception $e) {
				$error = $e->getMessage();
				Log::$debug_log->error($error);
				
				return [];
			}
		}
		
		public static function updateUnitImageRecord(array $image = null): array
		{
			if (is_null($image)) {
				Log::$debug_log->error("Missing Image Fields");
				
				return [];
			}
			
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$image_id = Model::setInt((isset($image["image_id"])) ? $image["image_id"] : null);
			$unit_id = Model::setInt((isset($image["unit_id"])) ? $image["unit_id"] : null);
			$path = Model::setString((isset($image["path"])) ? $image["path"] : null);
			$thumbs_path = Model::setString((isset($image["thumbs_path"])) ? $image["thumbs_path"] : null);
			$title = Model::setLongText((isset($image["title"])) ? $image["title"] : null);
			$caption = Model::setLongText((isset($image["caption"])) ? $image["caption"] : null);
			$alt = Model::setLongText((isset($image["alt"])) ? $image["alt"] : null);
			$is_cover = Model::setBool((isset($image["is_cover"])) ? $image["is_cover"] : null);
			$is_shown = Model::setBool((isset($image["is_shown"])) ? $image["is_shown"] : null);
			$enabled = Model::setBool((isset($image["enabled"])) ? $image["enabled"] : null);
			$note = Model::setLongText((isset($image["note"])) ? $image["note"] : null);
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			if ($is_cover === 1) {
				if (!self::clearCoverImages($image)) {
					Log::$debug_log->error("Error Clearing Cover");
					
					return [];
				}
			}
			
			$updateProductImageSQL = "
				INSERT INTO unit_image (
					unit_id, image_id, is_shown, is_cover, enabled,
					title, caption, alt, path, thumbs_path,
					date_created, created_by, date_modified, modified_by, note
				) VALUES (
					$unit_id, $image_id, $is_shown, $is_cover, $enabled,
					$title, $caption, $alt, $path, $thumbs_path,
					CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP, $modified_by, $note
				)
				ON DUPLICATE KEY UPDATE
					is_shown = VALUES(is_shown),
					is_cover = VALUES(is_cover),
				    alt = VALUES(alt),
					title = VALUES(title),
					caption = VALUES(caption),
					path = VALUES(path),
					thumbs_path = VALUES(thumbs_path),
					modified_by = VALUES(modified_by),
					enabled = VALUES(enabled),
					date_modified = VALUES(date_modified);
			";
			
			//Log::$debug_log->trace($updateProductImageSQL);
			
			try {
				Model::$db->rawQuery($updateProductImageSQL);
				
				return self::fetchImagesByUnitId($unit_id, $image_id);
			} catch (Exception $e) {
				$error = $e->getMessage();
				Log::$debug_log->error($error);
				
				return [];
			}
		}
		
		public static function updateCompanyImageRecord(array $image = null): array
		{
			if (is_null($image)) {
				Log::$debug_log->error("Missing Image Fields");
				
				return [];
			}
			
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$image_id = Model::setInt((isset($image["image_id"])) ? $image["image_id"] : null);
			$company_id = Model::setInt((isset($image["company_id"])) ? $image["company_id"] : null);
			$path = Model::setString((isset($image["path"])) ? $image["path"] : null);
			$thumbs_path = Model::setString((isset($image["thumbs_path"])) ? $image["thumbs_path"] : null);
			$title = Model::setLongText((isset($image["title"])) ? $image["title"] : null);
			$caption = Model::setLongText((isset($image["caption"])) ? $image["caption"] : null);
			$alt = Model::setLongText((isset($image["alt"])) ? $image["alt"] : null);
			$is_cover = Model::setBool((isset($image["is_cover"])) ? $image["is_cover"] : null);
			$is_shown = Model::setBool((isset($image["is_shown"])) ? $image["is_shown"] : null);
			$enabled = Model::setBool((isset($image["enabled"])) ? $image["enabled"] : null);
			$note = Model::setLongText((isset($image["note"])) ? $image["note"] : null);
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			if ($is_cover === 1) {
				if (!self::clearCoverImages($image)) {
					Log::$debug_log->error("Error Clearing Cover");
					
					return [];
				}
			}
			
			$updateCompanyImageSQL = "
				INSERT INTO company_image (
					company_id, image_id, is_shown, is_cover, enabled,
					title, caption, alt, path, thumbs_path,
					date_created, created_by, date_modified, modified_by, note
				) VALUES (
					$company_id, $image_id, $is_shown, $is_cover, $enabled,
					$title, $caption, $alt, $path, $thumbs_path,
					CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP, $modified_by, $note
				)
				ON DUPLICATE KEY UPDATE
					is_shown = VALUES(is_shown),
					is_cover = VALUES(is_cover),
				    alt = VALUES(alt),
					title = VALUES(title),
					caption = VALUES(caption),
					path = VALUES(path),
					thumbs_path = VALUES(thumbs_path),
					modified_by = VALUES(modified_by),
					enabled = VALUES(enabled),
					date_modified = VALUES(date_modified);
			";
			
			//Log::$debug_log->trace($updateCompanyImageSQL);
			
			try {
				Model::$db->rawQuery($updateCompanyImageSQL);
				
				return self::fetchImagesByCompanyId($company_id, (int)$image_id);
			} catch (Exception $e) {
				$error = $e->getMessage();
				Log::$debug_log->error($error);
				
				return [];
			}
		}
		
	}
