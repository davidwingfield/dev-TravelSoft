<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\App\Controllers\Image;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short Unit Description
	 * Long Unit Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class UploadModel extends Model
	{
		public static function clearCoverImages(int $directory_id = null, string $directory = null): bool
		{
			if (!isset($directory_id) || !isset($directory)) {
				Log::$debug_log->error("Missing Values");
				Log::$debug_log->info("directory: $directory");
				Log::$debug_log->error("directory_id: $directory_id");
				
				return false;
			}
			
			$tableName = $directory . "_image";
			$tableIdField = $directory . "_id";
			
			$sql = "
				UPDATE 	$tableName
				SET
						is_cover = 0,
						date_modified = CURRENT_TIMESTAMP,
						modified_by = 8
				WHERE 	$tableIdField = $directory_id;
			";
			
			try {
				Model::$db->rawQuery($sql);
				
				return true;
			} catch (Exception $e) {
				Log::$debug_log->error($e);
				
				return false;
			}
		}
		
		public static function updateProductImage(array $image = null): array
		{
			if (!isset($image)) {
				return [];
			}
			
			//Log::$debug_log->trace($image);
			
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$image_id = Model::setInt((isset($image["image_id"])) ? $image["image_id"] : null);
			$product_id = Model::setInt((isset($image["directory_id"])) ? $image["directory_id"] : null);
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
			
			if (!isset($product_id) || !isset($image_id)) {
				Log::$debug_log->error("Missing Values");
				Log::$debug_log->info("product_id: $product_id");
				Log::$debug_log->error("id: $image_id");
				
				return [];
			}
			
			if ($is_cover === 1) {
				if (!self::clearCoverImages($product_id, $directory)) {
					Log::$debug_log->error("Error Clearing Cover Image Values");
					Log::$debug_log->info("product_id: $product_id");
					Log::$debug_log->error("image_id: $image_id");
					
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
			
			try {
				//Log::$debug_log->trace($updateProductImageSQL);
				
				Model::$db->rawQuery($updateProductImageSQL);
				
				//Log::$debug_log->trace($product_id);
				//Log::$debug_log->trace($image_id);
				//Log::$debug_log->trace($image["id"]);
				
				return Image::getByProductId((int)$product_id, (int)$image_id);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
		public static function updateUnitImage(array $image = null): array
		{
			if (!isset($image)) {
				return [];
			}
			
			//Log::$debug_log->trace($image);
			
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$image_id = Model::setInt((isset($image["image_id"])) ? $image["image_id"] : null);
			$unit_id = Model::setInt((isset($image["directory_id"])) ? $image["directory_id"] : null);
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
			
			if (!isset($unit_id) || !isset($image_id)) {
				Log::$debug_log->error("Missing Values");
				Log::$debug_log->info("unit_id: $unit_id");
				Log::$debug_log->error("id: $image_id");
				
				return [];
			}
			
			if ($is_cover === 1) {
				if (!self::clearCoverImages($unit_id, $directory)) {
					Log::$debug_log->error("Error Clearing Cover Image Values");
					Log::$debug_log->info("unit_id: $unit_id");
					Log::$debug_log->error("image_id: $image_id");
					
					return [];
				}
			}
			
			$updateUnitImageSQL = "
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
			
			try {
				//Log::$debug_log->trace($updateProductImageSQL);
				
				Model::$db->rawQuery($updateUnitImageSQL);
				
				//Log::$debug_log->trace($product_id);
				//Log::$debug_log->trace($image_id);
				//Log::$debug_log->trace($image["id"]);
				
				return Image::getByUnitId($unit_id, $image_id);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
		public static function updateCompanyImage(array $image = null): array
		{
			if (!isset($image)) {
				return [];
			}
			
			//Log::$debug_log->trace($image);
			
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$image_id = Model::setInt((isset($image["image_id"])) ? $image["image_id"] : null);
			$company_id = Model::setInt((isset($image["directory_id"])) ? $image["directory_id"] : null);
			$directory = (isset($image["directory"])) ? $image["directory"] : "company";
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
			
			if (!isset($company_id) || !isset($image_id)) {
				Log::$debug_log->error("Missing Values");
				Log::$debug_log->info("company_id: $company_id");
				Log::$debug_log->error("id: $image_id");
				
				return [];
			}
			
			if ($is_cover === 1) {
				if (!self::clearCoverImages($company_id, $directory)) {
					Log::$debug_log->error("Error Clearing Cover Image Values");
					Log::$debug_log->info("company_id: $company_id");
					Log::$debug_log->error("image_id: $image_id");
					
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
			
			try {
				//Log::$debug_log->trace($updateProductImageSQL);
				
				Model::$db->rawQuery($updateCompanyImageSQL);
				
				//Log::$debug_log->trace($product_id);
				//Log::$debug_log->trace($image_id);
				//Log::$debug_log->trace($image["id"]);
				
				return Image::getByCompanyId($company_id, $image_id);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
		public static function productUpdate(array $image = null): array
		{
			if (!isset($image)) {
				return [];
			}
			
			//Log::$debug_log->trace($image);
			
			$results = [];
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$id = Model::setInt((isset($image["id"])) ? $image["id"] : null);
			$type = Model::setString((isset($image["type"])) ? $image["type"] : null);
			$ratio = Model::setString((isset($image["ratio"])) ? $image["ratio"] : null);
			$name = Model::setString((isset($image["name"])) ? $image["name"] : null);
			$size = Model::setString((isset($image["size"])) ? $image["size"] : null);
			$extension = Model::setString((isset($image["extension"])) ? $image["extension"] : null);
			$dimensions = Model::setString((isset($image["dimensions"])) ? $image["dimensions"] : null);
			$width = Model::setInt((isset($image["width"])) ? $image["width"] : null);
			$height = Model::setInt((isset($image["height"])) ? $image["height"] : null);
			$enabled = Model::setBool((isset($image["enabled"])) ? $image["enabled"] : null);
			$note = Model::setLongText((isset($image["note"])) ? $image["note"] : null);
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			$directory_id = (isset($image["directory_id"])) ? $image["directory_id"] : null;
			$directory = (isset($image["directory"])) ? $image["directory"] : null;
			
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
				
				Model::$db->rawQuery($sql);
				$image_id = Model::$db->getInsertId();
				
				if ($image_id) {
					switch ($directory) {
						case "product":
							$image["image_id"] = (int)$image_id;
							$image["product_id"] = (int)$directory_id;
							$image["directory"] = "product";
							
							$results = self::updateProductImage($image);
							break;
						case "unit":
							$image["image_id"] = (int)$image_id;
							$image["unit_id"] = (int)$directory_id;
							$image["directory"] = "unit";
							
							$results = self::updateUnitImage($image);
							break;
						case "company":
							$image["image_id"] = (int)$image_id;
							$image["company_id"] = (int)$directory_id;
							$image["directory"] = "company";
							
							$results = self::updateCompanyImage($image);
							break;
					}
				}
				
				return $results;
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
		public static function imageUpdate(array $image = null): array
		{
			if (!isset($image)) {
				return [];
			}
			
			//Log::$debug_log->trace($image);
			
			$results = [];
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$id = Model::setInt((isset($image["id"])) ? $image["id"] : null);
			$type = Model::setString((isset($image["type"])) ? $image["type"] : null);
			$ratio = Model::setString((isset($image["ratio"])) ? $image["ratio"] : null);
			$name = Model::setString((isset($image["name"])) ? $image["name"] : null);
			$size = Model::setString((isset($image["size"])) ? $image["size"] : null);
			$extension = Model::setString((isset($image["extension"])) ? $image["extension"] : null);
			$dimensions = Model::setString((isset($image["dimensions"])) ? $image["dimensions"] : null);
			$width = Model::setInt((isset($image["width"])) ? $image["width"] : null);
			$height = Model::setInt((isset($image["height"])) ? $image["height"] : null);
			$enabled = Model::setBool((isset($image["enabled"])) ? $image["enabled"] : null);
			$note = Model::setLongText((isset($image["note"])) ? $image["note"] : null);
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			$directory_id = (isset($image["directory_id"])) ? $image["directory_id"] : null;
			$directory = (isset($image["directory"])) ? $image["directory"] : null;
			
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
				
				Model::$db->rawQuery($sql);
				$image_id = Model::$db->getInsertId();
				
				if ($image_id) {
					switch ($directory) {
						case "product":
							$image["image_id"] = (int)$image_id;
							$image["product_id"] = (int)$directory_id;
							$image["directory"] = "product";
							
							$results = self::updateProductImage($image);
							break;
						case "unit":
							$image["image_id"] = (int)$image_id;
							$image["unit_id"] = (int)$directory_id;
							$image["directory"] = "unit";
							
							$results = self::updateUnitImage($image);
							break;
					}
				}
				
				return $results;
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
		}
		
	}
