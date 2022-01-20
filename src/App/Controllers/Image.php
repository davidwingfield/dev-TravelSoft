<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\ImageModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	/**
	 * Short Image Description
	 * Long Image Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Image extends Controller
	{
		
		/**
		 * @var string[]
		 */
		private static $types = array(
			"image/jpeg" => "jpg",
			"image/png" => "png",
		);
		
		/**
		 * get images by company id
		 *
		 * @param int|null $company_id
		 *
		 * @return array
		 */
		public static function getByCompanyId(int $company_id = null): array
		{
			$images = [];
			
			$results = ImageModel::getByCompanyId($company_id);
			$has_cover = false;
			foreach ($results AS $k => $image) {
				if ($image["image_is_cover_image"] === 1) {
					$has_cover = true;
				}
				$images[] = self::format($image);
			}
			if (count($images) > 0 && $has_cover === false) {
				$images[0]["is_cover_image"] = 1;
			}
			
			return $images;
		}
		
		/**
		 * api update request
		 *
		 * @param array|null $params
		 */
		public static function serveUpdate(array $params = null)
		{
			$images = array();
			if (is_null($params) || !isset($_POST)) {
				View::render_invalid_json("Missing Data");
				exit(0);
			}
			
			if (!isset($_FILES["file"])) {
				$result = ImageModel::update($_POST);
				
				foreach ($result AS $k => $image) {
					$images[] = self::format($image);
				}
				Log::$debug_log->trace($_POST);
				View::render_json($images);
				exit(0);
				
			} else {
				
				if (!isset($_FILES["file"], $_POST["alt"], $_POST["title"], $_POST["caption"], $_POST["is_cover_image"])) {
					View::render_invalid_json("Missing Data");
					exit(0);
				}
				$type = $_FILES["file"]["type"];
				
				if (!isset(self::$types[$type])) {
					View::render_invalid_json("Unsupported File Type");
					exit(0);
				}
				
				$results = self::makeThumbnail($_FILES, $_POST);
				View::render_json($results);
				exit(0);
			}
			
		}
		
		/**
		 * get image aspect ratio
		 *
		 * @param int $width
		 * @param int $height
		 *
		 * @return string
		 */
		public static function getAspectRatio(int $width, int $height): string
		{
			// search for greatest common divisor
			$greatestCommonDivisor = static function ($width, $height) use (&$greatestCommonDivisor) {
				return ($width % $height) ? $greatestCommonDivisor($height, $width % $height) : $height;
			};
			
			$divisor = $greatestCommonDivisor($width, $height);
			
			return $width / $divisor . ':' . $height / $divisor;
		}
		
		/**
		 * generate image and thumbnail
		 *
		 * @param $file
		 * @param $params
		 *
		 * @return array
		 */
		private static function makeThumbnail($file, $params): array
		{
			$images = [];
			$imagename = self::seoUrl(substr($file['file']['name'], 0, (strrpos($file['file']['name'], "."))));
			$alt = $params["alt"];
			$title = $params["title"];
			$caption = $params["caption"];
			$is_cover_image = $params["is_cover_image"];
			$directory = $params["directory"];
			$directory_id = (int)$params["directory_id"];
			$source = $file['file']['tmp_name'];
			$fn = $file['file']['tmp_name'];
			$size = getimagesize($fn);
			$target = $_SERVER["DOCUMENT_ROOT"] . "/public/img/$directory/$directory_id";
			$thumbs_target = $_SERVER["DOCUMENT_ROOT"] . "/public/img/thumbs/$directory/$directory_id";
			$imageType = self::$types[$file['file']['type']];
			$demensions = self::getAspectRatio((int)$size[0], (int)$size[1]);
			$filesize = filesize($source);
			$filesize = round($filesize / 1024 / 1024, 1);
			$record = array(
				"name" => $imagename,
				"path" => "/public/img/$directory/$directory_id",
				"extension" => self::$types[$file['file']['type']],
				"dimensions" => $demensions,
				"caption" => addslashes($caption),
				"is_cover_image" => $is_cover_image,
				"title" => addslashes($title),
				"alt" => $alt,
				"size" => $filesize . " MB",
				"enabled" => 1,
			);
			
			if (isset($params["id"])) {
				$record["id"] = (int)$params["id"];
			}
			
			// ----
			
			if (self::buildDirectory($target) && self::buildDirectory($thumbs_target)) {
				$mod_width = 1200;
				$mod_height = 900;
				$saveTo = "$target/$imagename.$imageType";
				// ----
				if (self::moveImage($source, $saveTo)) {
					$fn = $saveTo;
					list($width, $height) = getimagesize($saveTo);
					list($width_orig, $height_orig) = getimagesize($saveTo);
					
					$ratio_orig = $width_orig / $height_orig;
					
					if ($width / $height > $ratio_orig) {
						$width = $height * $ratio_orig;
					} else {
						$height = $width / $ratio_orig;
					}
					
					if ($width > $mod_width) {
						$width = $mod_width;
						if ($width > $height) {
							$height = $height / $ratio_orig;
						}
					}
					
					if ($height > $mod_height) {
						$height = $mod_height;
						if ($width > $height) {
							$width = $width / $ratio_orig;
						}
					}
					
					$record["height"] = (int)$height;
					$record["width"] = (int)$width;
					
					if ($record["extension"] === "jpg") {
						/** Resample */
						$image_p = imagecreatetruecolor($width, $height);
						$image = imagecreatefromjpeg("$target/$imagename.$imageType");
						imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);
						
						/** Output */
						imagejpeg($image_p, $saveTo, 100);
					}
					
					if ($record["extension"] === "png") {
						/** Resample */
						$image_p = imagecreatetruecolor($width, $height);
						$image = imagecreatefrompng("$target/$imagename.$imageType");
						imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);
						
						/** Output */
						imagepng($image_p, $saveTo, 9);
					}
					
					if ($record["extension"] === "gif") {
						/** Resample */
						$image_p = imagecreatetruecolor($width, $height);
						$image = imagecreatefromgif($saveTo);
						imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);
						
						/** Output */
						imagegif($image_p, $saveTo, 100);
					}
					
					// ----
					
					$mod_width = 90;
					$mod_height = 60;
					$save = "$thumbs_target/$imagename.$imageType";
					$fn = "$target/$imagename.$imageType";
					list($width, $height) = getimagesize($fn);
					if ($width > $mod_width) {
						$width = $mod_width;
						if ($width > $height) {
							$height = $height / $ratio_orig;
						}
					}
					
					if ($height > $mod_height) {
						$height = $mod_height;
						if ($width > $height) {
							$width = $width / $ratio_orig;
						}
					}
					
					if ($record["extension"] === "jpg") {
						$tn = imagecreatetruecolor($width, $height);
						$image = imagecreatefromjpeg("$target/$imagename.$imageType");
						imagecopyresampled($tn, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);
						imagejpeg($tn, $save, 100);
					}
					
					if ($record["extension"] === "png") {
						/** Resample */
						$tn = imagecreatetruecolor($width, $height);
						$image = imagecreatefrompng("$target/$imagename.$imageType");
						
						imagecopyresampled($tn, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);
						
						/** Output */
						imagepng($tn, $saveTo, 9);
					}
					
					if ($record["extension"] === "gif") {
						$tn = imagecreatetruecolor($width, $height);
						$image = imagecreatefromgif("$target/$imagename.$imageType");
						imagecopyresampled($tn, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);
						imagegif($tn, $save, 100);
					}
					
					$record["directory"] = $directory;
					$record["directory_id"] = $directory_id;
					
					$result = ImageModel::update($record);
					
					foreach ($result AS $k => $image) {
						$images[] = self::format($image);
					}
				}
			}
			
			return $images;
		}
		
		/**
		 * move images to directories
		 *
		 * @param string $source
		 * @param string $target
		 *
		 * @return bool
		 */
		private static function moveImage(string $source = "", string $target = ""): bool
		{
			
			move_uploaded_file($source, $target);
			
			return true;
		}
		
		/**
		 * create directory folder
		 *
		 * @param string $path
		 *
		 * @return bool
		 */
		private static function buildDirectory(string $path = ""): bool
		{
			if (!file_exists($path)) {
				mkdir($path, 0777);
			}
			
			return true;
		}
		
		/**
		 * api get request by company id
		 *
		 * @param array $params
		 */
		public static function serveGetByCompanyId(array $params = [])
		{
			$images = array();
			if (!isset($params["company_id"])) {
				View::render_invalid_json("Missing Data: Company ID");
				exit(0);
			}
			
			$results = ImageModel::getByCompanyId((int)$params["company_id"]);
			
			foreach ($results AS $k => $image) {
				$images[] = self::format($image);
			}
			
			// ----
			View::render_json($images);
			exit(0);
		}
		
		/**
		 * api get request
		 *
		 * @param array $params
		 */
		public static function serveGet(array $params = [])
		{
			$images = array();
			$image_id = (isset($params["image_id"])) ? (int)$params["image_id"] : null;
			
			$results = ImageModel::get($image_id);
			
			$has_cover = false;
			foreach ($results AS $k => $image) {
				if ($image["image_is_cover_image"] === 1) {
					$has_cover = true;
				}
				$images[] = self::format($image);
			}
			
			if (count($images) > 0 && $has_cover === false) {
				$images[0]["is_cover_image"] = 1;
			}
			
			// ----
			View::render_json($images);
			exit(0);
		}
		
		/**
		 * format image object
		 *
		 * @param array $image
		 *
		 * @return array
		 */
		private static function format(array $image = []): array
		{
			return array(
				"id" => (isset($image["image_id"])) ? (int)$image["image_id"] : null,
				"name" => (isset($image["image_name"])) ? $image["image_name"] : null,
				"path" => (isset($image["image_path"])) ? $image["image_path"] : null,
				"extension" => (isset($image["image_extension"])) ? $image["image_extension"] : null,
				"dimensions" => (isset($image["image_dimensions"])) ? $image["image_dimensions"] : null,
				"caption" => (isset($image["image_caption"])) ? $image["image_caption"] : null,
				"is_cover_image" => (isset($image["image_is_cover_image"])) ? (int)$image["image_is_cover_image"] : 0,
				"title" => (isset($image["image_title"])) ? $image["image_title"] : null,
				"alt" => (isset($image["image_alt"])) ? $image["image_alt"] : null,
				"size" => (isset($image["image_size"])) ? $image["image_size"] : null,
				"date_created" => (isset($image["image_date_created"])) ? $image["image_date_created"] : null,
				"created_by" => (isset($image["image_created_by"])) ? $image["image_created_by"] : null,
				"date_modified" => (isset($image["image_date_modified"])) ? $image["image_date_modified"] : null,
				"modified_by" => (isset($image["image_modified_by"])) ? $image["image_modified_by"] : null,
				"note" => (isset($image["image_note"])) ? $image["image_note"] : null,
				"enabled" => (isset($image["image_enabled"])) ? (int)$image["image_enabled"] : null,
				"height" => (isset($image["image_height"])) ? (int)$image["image_width"] : null,
				"width" => (isset($image["image_height"])) ? (int)$image["image_width"] : null,
			);
		}
		
		/**
		 * convert name into html entity
		 *
		 * @param $string
		 *
		 * @return string|string[]|null
		 */
		private static function seoUrl($string)
		{
			//Lower case everything
			$string = strtolower($string);
			//Make alphanumeric (removes all other characters)
			$string = preg_replace("/[^a-z0-9_\s-]/", "", $string);
			//Clean up multiple dashes or whitespaces
			$string = preg_replace("/[\s-]+/", " ", $string);
			//Convert whitespaces and underscore to dash
			$string = preg_replace("/[\s_]/", "-", $string);
			
			return $string;
		}
		
	}
