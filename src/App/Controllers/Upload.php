<?php
	
	namespace Framework\App\Controllers;
	
	use Exception;
	use Framework\App\Models\LocationModel;
	use Framework\App\Models\UploadModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	use Imagick;
	
	/**
	 * Short Upload Description
	 * Long Upload Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Upload extends Controller
	{
		protected static $record = [];
		
		/**
		 * constructor from Controller
		 */
		public function __construct()
		{
			parent::__construct();
		}
		
		private static function moveImage(string $source = null, string $targetFile = null): bool
		{
			$errors = [];
			$hasErrors = false;
			
			if (file_exists($targetFile)) {
				$errors[] = "Sorry, file already exists.";
				$hasErrors = true;
			}
			
			if (!is_null($source) && !is_null($targetFile)) {
				try {
					move_uploaded_file($source, $targetFile);
				} catch (Exception $e) {
					$error = $e->getMessage();
					Log::$debug_log->error($error);
					Log::$debug_log->warn($source);
					Log::$debug_log->warn($targetFile);
					$errors[] = $error;
					$hasErrors = true;
				}
				
			} else {
				$error = "Fields Missing";
				Log::$debug_log->error($error);
				Log::$debug_log->warn($source);
				Log::$debug_log->warn($targetFile);
				$errors[] = $error;
				$hasErrors = true;
			}
			
			if (!$hasErrors) {
				return true;
			} else {
				Log::$debug_log->error($errors);
				
				return false;
			}
		}
		
		private static function resizeThumbnail(string $source = null): array
		{
			$maxWidth = 200;
			$maxHeight = 150;
			$errors = [];
			$hasErrors = false;
			
			$extension = self::$record["extension"];
			
			if (!isset($source)) {
				$error = "Fields Missing";
				Log::$debug_log->error($error);
				Log::$debug_log->warn("source: $source");
				$errors[] = $error;
				$hasErrors = true;
			}
			
			list($width, $height) = getimagesize($source);
			
			if ($height > $width) {
				$ratio = $maxHeight / $height;
				$new_height = $maxHeight;
				$new_width = $width * $ratio;
			} else if ($height < $width) {
				$ratio = $maxWidth / $width;
				$new_width = $maxWidth;
				$new_height = $height * $ratio;
			} else {
				
				if ($width > $maxWidth) {
					$new_width = $maxWidth;
					$new_height = $maxWidth;
				}
				
				if ($height > $maxHeight) {
					$new_width = $maxHeight;
					$new_height = $maxHeight;
				}
				
			}
			
			if ($hasErrors === true) {
				Log::$debug_log->error("Error Moving Files");
				Log::$debug_log->warn($errors);
				
				return [];
			} else {
				return array(
					"ratio_orig" => (isset($ratio)) ? $ratio : null,
					"width" => (isset($width)) ? (int)$width : null,
					"height" => (isset($height)) ? (int)$height : null,
					"new_width" => (isset($new_width)) ? (int)$new_width : null,
					"new_height" => (isset($new_height)) ? (int)$new_height : null,
				);
			}
		}
		
		private static function moveThumbnail(string $source = null, string $targetFile = null): bool
		{
			$errors = [];
			$hasErrors = false;
			$record = self::$record;
			$extension = $record["extension"];
			
			if (is_null($source)) {
				$error = "File - $source Missing";
				Log::$debug_log->error($error);
				Log::$debug_log->warn($source);
				$errors[] = $error;
				$hasErrors = true;
			}
			
			$thumbnailSize = self::resizeThumbnail($source);
			self::$record["thumbnail_size"] = ($thumbnailSize) ? $thumbnailSize : null;
			
			if (file_exists($targetFile)) {
				$errors[] = "Sorry, file already exists.";
				$hasErrors = true;
			}
			
			$width = (int)$thumbnailSize["new_width"];
			$height = (int)$thumbnailSize["new_height"];
			$width_orig = (int)self::$record["width"];
			$height_orig = (int)self::$record["height"];
			
			switch ($extension) {
				case "jpg":
				case "jpeg":
					$finfo = finfo_open(FILEINFO_MIME_TYPE);
					$type = finfo_file($finfo, $source);
					if (isset($type) && in_array($type, array(
							"image/png",
							"image/jpeg",
							"image/gif",
						))) {
						$image_p = imagecreatetruecolor($width, $height);
						$image = imagecreatefromjpeg($source);
						imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);
						
						/** Output */
						imagejpeg($image_p, $targetFile, 100);
					} else {
						$error = "Image is not a valid jpg";
						Log::$debug_log->error($error);
						Log::$debug_log->warn("extension: $extension");
						$errors[] = $error;
						$hasErrors = true;
					}
					
					break;
				case "png":
					$finfo = finfo_open(FILEINFO_MIME_TYPE);
					$type = finfo_file($finfo, $source);
					if (isset($type) && in_array($type, array(
							"image/png",
							"image/jpeg",
							"image/gif",
						))) {
						$image_p = imagecreatetruecolor($width, $height);
						$image = imagecreatefrompng("$source");
						imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);
						
						/** Output */
						imagepng($image_p, $targetFile, 9);
					} else {
						$error = "Image is not a valid png";
						Log::$debug_log->error($error);
						Log::$debug_log->warn("extension: $extension");
						$errors[] = $error;
						$hasErrors = true;
					}
					break;
				case "gif":
					$finfo = finfo_open(FILEINFO_MIME_TYPE);
					$type = finfo_file($finfo, $source);
					if (isset($type) && in_array($type, array(
							"image/png",
							"image/jpeg",
							"image/gif",
						))) {
						$image_p = imagecreatetruecolor($width, $height);
						$image = imagecreatefrompng("$source");
						imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);
						
						/** Output */
						imagegif($image_p, $targetFile, 100);
					} else {
						$error = "Image is not a valid gif";
						Log::$debug_log->error($error);
						Log::$debug_log->warn("extension: $extension");
						$errors[] = $error;
						$hasErrors = true;
					}
					break;
				default:
					$error = "Unsupported file type";
					Log::$debug_log->error($error);
					Log::$debug_log->warn("extension: $extension");
					$errors[] = $error;
					$hasErrors = true;
			}
			
			if ($hasErrors === true) {
				Log::$debug_log->error("Error Moving Files");
				Log::$debug_log->warn($errors);
				
				return false;
			} else {
				return true;
			}
		}
		
		private static function createPath($path): bool
		{
			//Log::$debug_log->trace($path);
			
			$thumbsPath = str_replace("/public/img/", "/public/thumbs/", $path);
			//Log::$debug_log->trace($thumbsPath);
			
			if (is_dir($path) || mkdir($path, 0777, true)) {
				return is_dir($thumbsPath) || mkdir($thumbsPath, 0777, true);
			}
			
			return false;
		}
		
		public static function uploadProductImage(array $params = []): void
		{
			$errors = [];
			$hasErrors = false;
			$file = (isset($_FILES)) ? $_FILES : null;
			$post = (isset($_POST)) ? $_POST : null;
			
			if (!is_null($file) && !is_null($post)) {
				Log::$debug_log->trace($post);
				
				$imageId = (isset($post["id"])) ? (int)$post["id"] : null;
				$isShown = (isset($post["is_shown"])) ? $post["is_shown"] : 1;
				$check = getimagesize($file["file"]["tmp_name"]);
				$filePath = (isset($post["path"])) ? $post["path"] : null;
				$fileHeight = (isset($post["height"])) ? (int)$post["height"] : null;
				$fileWidth = (isset($post["width"])) ? (int)$post["width"] : null;
				$fileName = (isset($post["name"])) ? $post["name"] : null;
				$fileExtension = (isset($post["extension"])) ? $post["extension"] : null;
				$fileSize = (isset($post["size"])) ? $post["size"] : null;
				$fileRatio = (isset($post["ratio"])) ? $post["ratio"] : null;
				$fileDimensions = (isset($post["dimensions"])) ? $post["dimensions"] : null;
				$fileType = (isset($post["type"])) ? $post["type"] : null;
				$fileThumbsPath = (isset($post["thumbs_path"])) ? $post["thumbs_path"] : null;
				$target_dir = $filePath;
				$targetFile = $target_dir . "/" . basename($_FILES["file"]["name"]);
				$targetThumbsFile = $fileThumbsPath . "/" . basename($_FILES["file"]["name"]);
				$imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
				$directory = (isset($post["directory"])) ? $post["directory"] : null;
				$directoryId = (isset($post["directory_id"])) ? (int)$post["directory_id"] : null;
				$fileEnabled = (isset($post["enabled"])) ? $post["enabled"] : 1;
				$fileAltText = (isset($post["alt"])) ? $post["alt"] : null;
				$fileTitle = (isset($post["title"])) ? $post["title"] : null;
				$fileIsCoverImage = (isset($post["is_cover"])) ? $post["is_cover"] : 0;
				$fileCaption = (isset($post["caption"])) ? $post["caption"] : null;
				
				//Log::$debug_log->trace("post");
				//Log::$debug_log->info($post);
				
				if ($check === false) {
					$errors[] = "File is not an image.";
					$hasErrors = true;
				}
				
				/**
				 * Check file size
				 */
				if ($file["file"]["size"] > 500000) {
					$errors[] = "Sorry, your file is too large.";
					$hasErrors = true;
				}
				
				self::$record["file"] = $file;
				self::$record["post"] = $post;
				self::$record["id"] = $imageId;
				self::$record["enabled"] = $fileEnabled;
				self::$record["alt"] = $fileAltText;
				self::$record["title"] = $fileTitle;
				self::$record["caption"] = $fileCaption;
				self::$record["is_cover"] = $fileIsCoverImage;
				self::$record["directory"] = $directory;
				self::$record["directory_id"] = $directoryId;
				self::$record["height"] = $fileHeight;
				self::$record["path"] = $filePath;
				self::$record["height"] = $fileHeight;
				self::$record["width"] = $fileWidth;
				self::$record["name"] = $fileName;
				self::$record["extension"] = $fileExtension;
				self::$record["size"] = $fileSize;
				self::$record["ratio"] = $fileRatio;
				self::$record["type"] = $fileType;
				self::$record["thumbs_path"] = $fileThumbsPath;
				self::$record["target_file"] = $targetFile;
				self::$record["target_thumbs_file"] = $targetThumbsFile;
				self::$record["src"] = $file["file"]["tmp_name"];
				self::$record["image_file_type"] = $imageFileType;
				self::$record["is_shown"] = $isShown;
				self::$record["dimensions"] = $fileDimensions;
				
				if (self::createPath($_SERVER["DOCUMENT_ROOT"] . $filePath)) {
					//Log::$debug_log->trace($file["file"]["tmp_name"]);
					//Log::$debug_log->trace($_SERVER["DOCUMENT_ROOT"] . $targetFile);
					
					if (self::moveImage($file["file"]["tmp_name"], $_SERVER["DOCUMENT_ROOT"] . $targetFile)) {
						
						if (self::moveThumbnail($_SERVER["DOCUMENT_ROOT"] . $targetFile, $_SERVER["DOCUMENT_ROOT"] . $targetThumbsFile)) {
							//Log::$debug_log->trace("Record");
							//Log::$debug_log->trace(self::$record);
							
						} else {
							$error = "Thumbnail Not Created.";
							Log::$debug_log->error($error);
							$errors[] = $error;
							$hasErrors = true;
						}
					} else {
						$error = "Image Not Moved.";
						Log::$debug_log->error($error);
						$errors[] = $error;
						$hasErrors = true;
					}
				} else {
					$error = "Error Creating Path";
					
				}
				
			} else {
				$errors[] = "Sorry, missing data.";
				$hasErrors = true;
			}
			
			$params = array();
			$params["name"] = self::$record["name"];
			$params["alt"] = self::$record["alt"];
			$params["title"] = self::$record["title"];
			$params["caption"] = self::$record["caption"];
			$params["is_cover"] = self::$record["is_cover"];
			$params["path"] = self::$record["path"];
			$params["extension"] = self::$record["extension"];
			$params["ratio"] = self::$record["ratio"];
			$params["size"] = self::$record["size"];
			$params["height"] = self::$record["height"];
			$params["width"] = self::$record["width"];
			$params["enabled"] = self::$record["enabled"];
			$params["directory"] = self::$record["directory"];
			$params["directory_id"] = self::$record["directory_id"];
			$params["is_shown"] = self::$record["is_shown"];
			
			//Log::$debug_log->trace("Params");
			//Log::$debug_log->trace($params);
			
			$results = self::update(self::$record);
			
			if ($hasErrors === true) {
				/**
				 * render invalid upload json
				 */
				header("Content-type:application/json");
				View::render_invalid_json($errors);
				exit(0);
			} else {
				/**
				 * render upload json
				 */
				header("Content-type:application/json");
				View::render_json($results);
				exit(0);
				
			}
			
		}
		
		private static function update(): array
		{
			return UploadModel::productUpdate(self::$record);
		}
		
		public static function updateProductImage(array $params = null): void
		{
			$results = UploadModel::productUpdate($params);
			
			/**
			 * render product image json
			 */
			header("Content-type:application/json");
			View::render_json($results);
			exit(0);
		}
		
	}
