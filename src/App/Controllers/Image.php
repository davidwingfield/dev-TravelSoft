<?php
	
	namespace Framework\App\Controllers;
	
	use Framework\App\Models\ImageModel;
	use Framework\Core\Controller;
	use Framework\Core\View;
	use Framework\Logger\Log;
	use Imagick;
	
	/**
	 * Short Image Description
	 * Long Image Description
	 *
	 * @package            Framework\App
	 * @subpackage         Controllers
	 */
	class Image extends Controller
	{
		private static $types = array(
			"image/jpeg" => "jpg",
			"image/png" => "png",
		);
		
		public static function getByCompanyId(int $company_id = null, int $image_id = null): array
		{
			$images = [];
			
			$results = ImageModel::fetchImagesByCompanyId($company_id, $image_id);
			
			foreach ($results AS $k => $image) {
				$images[] = self::format($image);
			}
			
			return $images;
		}
		
		public static function getByUnitId(int $unit_id = null, int $image_id = null): array
		{
			$images = [];
			
			$results = ImageModel::fetchImagesByUnitId($unit_id, $image_id);
			
			foreach ($results AS $k => $image) {
				$images[] = self::format($image);
			}
			
			return $images;
		}
		
		public static function getByProductId(int $product_id = null, int $image_id = null): array
		{
			$images = [];
			
			$results = ImageModel::getByProductId($product_id, $image_id);
			
			foreach ($results AS $k => $image) {
				$images[] = self::format($image);
			}
			
			return $images;
		}
		
		public static function getImageById(int $image_id = null): array
		{
			$images = [];
			
			$results = ImageModel::getByImageId($image_id);
			$has_cover = false;
			foreach ($results AS $k => $image) {
				if ($image["image_is_cover"] === 1) {
					$has_cover = 1;
				}
				$images[] = self::format($image);
			}
			
			if (count($images) > 0 && $has_cover === false) {
				$images[0]["is_cover"] = 1;
			}
			
			return $images;
		}
		
		public static function serveUpdate(array $params = null): void
		{
			$images = array();
			if (is_null($params) || !isset($_POST)) {
				View::render_invalid_json("Missing Data");
				exit(0);
			}
			
			$results = ImageModel::updateImageRecord($params);
			foreach ($results AS $k => $image) {
				$images[] = self::format($image);
			}
			
			View::render_json($images);
			exit(0);
			
		}
		
		public static function serveGetByUnitId(array $params = [])
		{
			
			if (!isset($params["unit_id"])) {
				View::render_invalid_json("Missing Data: Unit ID");
				exit(0);
			}
			
			$results = self::getByUnitId((int)$params["unit_id"]);
			
			/**
			 * render location json
			 */
			header("Content-type:application/json");
			View::render_json($results);
			exit(0);
		}
		
		public static function serveGetByProductId(array $params = [])
		{
			$images = array();
			if (!isset($params["product_id"])) {
				View::render_invalid_json("Missing Data: Product ID");
				exit(0);
			}
			
			$results = ImageModel::getByProductId((int)$params["product_id"]);
			
			foreach ($results AS $k => $image) {
				$images[] = self::format($image);
			}
			
			/**
			 * render location json
			 */
			header("Content-type:application/json");
			View::render_json($images);
			exit(0);
		}
		
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
			
			/**
			 * render location json
			 */
			header("Content-type:application/json");
			View::render_json($images);
			exit(0);
		}
		
		public static function serveGet(array $params = [])
		{
			$images = array();
			$image_id = (isset($params["image_id"])) ? (int)$params["image_id"] : null;
			
			$results = ImageModel::get($image_id);
			
			$has_cover = false;
			foreach ($results AS $k => $image) {
				if ($image["image_is_cover"] === 1) {
					$has_cover = true;
				}
				$images[] = self::format($image);
			}
			
			if (count($images) > 0 && $has_cover === false) {
				$images[0]["is_cover"] = 1;
			}
			
			/**
			 * render location json
			 */
			header("Content-type:application/json");
			View::render_json($images);
			exit(0);
		}
		
		public static function serveDelete(array $params = null): void
		{
			$images = ImageModel::delete($params);
			
			/**
			 * render location json
			 */
			header("Content-type:application/json");
			View::render_json(["deleted" => $images]);
			exit(0);
		}
		
		public static function serveGetImagesFromProductDirectory(array $params = null): void
		{
			$images = [];
			
			if (!is_null($params)) {
				if (isset($params["image_id"])) {
					$id = (int)$params["image_id"];
					$directoryPath = "/public/img/product";
					$imageDirectory = $_SERVER["DOCUMENT_ROOT"] . "$directoryPath/$id";
					if (!is_dir($imageDirectory)) {
						mkdir($imageDirectory, 0777, true);
					} else {
						$productFiles = array_diff(scandir($imageDirectory), array(
							".",
							"..",
						));
						
						foreach ($productFiles AS $file) {
							$img = "$directoryPath/$id/$file";
							$image_info = getimagesize("$imageDirectory/$file");
							$height = (isset($image_info[1])) ? (int)$image_info[1] : null;
							$width = (isset($image_info[0])) ? (int)$image_info[0] : null;
							$mime = (isset($image_info["mime"])) ? (string)$image_info["mime"] : null;
							$file_info = explode(".", trim($file));
							$extension = array_pop($file_info);
							$file_info = implode(".", $file_info);
							
							$images[] = array(
								"img" => $img,
								"file" => $file,
								"height" => $height,
								"width" => $width,
								"mime" => $mime,
								"name" => $file_info,
								"extension" => $extension,
							);
						}
					}
				}
			}
			
			/**
			 * render location json
			 */
			header("Content-type:application/json");
			View::render_json($images);
			exit(0);
		}
		
		public static function getAspectRatio(int $width, int $height): string
		{
			// search for greatest common divisor
			$greatestCommonDivisor = static function ($width, $height) use (&$greatestCommonDivisor) {
				return ($width % $height) ? $greatestCommonDivisor($height, $width % $height) : $height;
			};
			
			$divisor = $greatestCommonDivisor($width, $height);
			
			return $width / $divisor . ':' . $height / $divisor;
		}
		
		private static function format(array $image = []): array
		{
			$path = (isset($image["image_path"])) ? $image["image_path"] : null;
			$thumbs_path = (isset($image["image_thumbs_path"])) ? $image["image_thumbs_path"] : null;
			$ratio = (isset($image["image_ratio"])) ? $image["image_ratio"] : null;
			$type = (isset($image["image_type"])) ? $image["image_type"] : null;
			
			if (!is_null($path)) {
				$thumbs_path = str_replace("img", "thumbs", $path);
			}
			
			return array(
				"id" => (isset($image["image_id"])) ? (int)$image["image_id"] : null,
				"name" => (isset($image["image_name"])) ? $image["image_name"] : null,
				"thumbs_path" => $thumbs_path,
				"path" => $path,
				"ratio" => $ratio,
				"type" => $type,
				"extension" => (isset($image["image_extension"])) ? $image["image_extension"] : null,
				"dimensions" => (isset($image["image_dimensions"])) ? $image["image_dimensions"] : null,
				"caption" => (isset($image["image_caption"])) ? $image["image_caption"] : null,
				"is_cover" => (isset($image["image_is_cover"]) && (int)$image["image_is_cover"] === 1) ? 1 : 0,
				"title" => (isset($image["image_title"])) ? $image["image_title"] : null,
				"alt" => (isset($image["image_alt"])) ? $image["image_alt"] : null,
				"size" => (isset($image["image_size"])) ? $image["image_size"] : null,
				"date_created" => (isset($image["image_date_created"])) ? $image["image_date_created"] : null,
				"created_by" => (isset($image["image_created_by"])) ? $image["image_created_by"] : null,
				"date_modified" => (isset($image["image_date_modified"])) ? $image["image_date_modified"] : null,
				"modified_by" => (isset($image["image_modified_by"])) ? $image["image_modified_by"] : null,
				"note" => (isset($image["image_note"])) ? $image["image_note"] : null,
				"enabled" => (isset($image["image_enabled"])) ? (int)$image["image_enabled"] : null,
				"is_shown" => (isset($image["image_is_shown"])) ? (int)$image["image_is_shown"] : null,
				"height" => (isset($image["image_height"])) ? (int)$image["image_height"] : null,
				"width" => (isset($image["image_width"])) ? (int)$image["image_width"] : null,
			);
		}
		
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
		
		private static function makeThumbnail($file, $params): array
		{
			$images = [];
			$imagename = self::seoUrl(substr($file["file"]["name"], 0, (strrpos($file['file']['name'], "."))));
			$alt = $params["alt"];
			$title = $params["title"];
			$caption = $params["caption"];
			$is_cover = $params["is_cover"];
			$directory = $params["directory"];
			$directory_id = (int)$params["directory_id"];
			$source = $file["file"]["tmp_name"];
			$fn = $file["file"]["tmp_name"];
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
				"is_cover" => $is_cover,
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
		
		private static function moveImage(string $source = "", string $target = ""): bool
		{
			
			move_uploaded_file($source, $target);
			
			return true;
		}
		
		private static function buildDirectory(string $path = ""): bool
		{
			if (!file_exists($path)) {
				mkdir($path, 0777);
			}
			
			return true;
		}
		
	}
