<?php
	
	namespace Framework\Core;
	
	use Exception;
	
	/**
	 * Short View Description
	 * Long View Description
	 *
	 * @package            Framework\Core
	 * @uses               used in prod env for logging all type of error of php code in a file for further debugging
	 *                     and code performance
	 */
	class View
	{
		/** An array of Response Status Types. */
		protected static $status = array(
			200 => "200 OK",
			400 => "400 Bad Request",
			401 => "401 Unauthorized",
			402 => "402 Payment Required",
			403 => "403 Forbidden",
			404 => "404 Not Found",
			405 => "405 Method Not Allowed",
			422 => "Unprocessable Entity",
			500 => "500 Internal Server Error",
			502 => "502 Bad Gateway",
			503 => "503 Service Unavailable",
			504 => "504 Gateway Timeout",
		);
		
		protected static $base_view;
		
		public static function init()
		{
			self::$base_view = VIEWS_PATH . "/base.phtml";
		}
		
		public static function render(string $view, array $data = []): void
		{
			extract($data, EXTR_SKIP);
			$file = VIEWS_PATH . "/$view" . ".phtml";
			if (is_readable($file)) {
				require $file;
			} else {
				throw new Exception("$file not found");
			}
		}
		
		public static function render_json(array $data = [], int $code = 200): void
		{
			header_remove();
			http_response_code($code);
			header("Cache-Control: no-transform,public,max-age=300,s-maxage=900");
			header("Content-Type: application/json");
			header("Content-type:application/json");
			header("Status: " . self::$status[$code]);
			
			$return = array(
				"status" => "success",
				"result" => $data,
				"errors" => array(),
			);
			
			echo json_encode($return, 1);
			exit();
		}
		
		public static function render_invalid_json($message = null, int $code = 200): void
		{
			header_remove();
			http_response_code($code);
			header("Cache-Control: no-transform,public,max-age=300,s-maxage=900");
			header("Content-Type: application/json");
			header("Content-type:application/json");
			header("Status: " . self::$status[$code]);
			
			$return = array(
				"code" => $code,
				"status" => "error",
				"error" => $message,
			);
			
			echo json_encode($return, 1);
			exit();
		}
		
		public static function render_invalid_page(int $code = 200, array $data = []): void
		{
			header_remove();
			http_response_code($code);
			header("Cache-Control: no-transform,public,max-age=300,s-maxage=900");
			header("Content-Type: application/json");
			header("Content-type:application/json");
			header("Status: " . self::$status[$code]);
			//
			$view = "errors/500.phtml";
			extract($data, EXTR_SKIP);
			$file = VIEWS_PATH . "/$view";
			////
			if (is_readable($file)) {
				require $file;
			} else {
				throw new Exception("$file not found");
			}
			////
		}
		
		public static function render_template(string $view = "", array $data = [], bool $print = true): string
		{
			header_remove();
			http_response_code(200);
			header("Cache-Control: no-transform,public,max-age=300,s-maxage=900");
			header("Status: " . self::$status[200]);
			
			extract($data);
			$filePath = VIEWS_PATH . "/$view" . ".phtml";
			$page_heading_buttons = "";
			////
			if (!file_exists(self::$base_view)) {
				//throw new \Exception(self::$base_view . " file not found");
			}
			if (!file_exists($filePath)) {
				//throw new \Exception("$filePath file not found");
			}
			////
			if (isset($buttons)) {
				$page_heading_buttons = self::build_page_heading_buttons($buttons);
			}
			////
			$main = $filePath;
			define("MAIN", $main);
			ob_start();
			include self::$base_view;
			$output = ob_get_clean();
			
			if ($print) {
				print $output;
				exit;
			} else {
				return $output;
			}
			
		}
		
		private static function build_page_heading_buttons(array $buttons = []): string
		{
			$page_heading_buttons = "";
			foreach ($buttons AS $i => $button) {
				if (isset($button["type"])) {
					$button_type = $button["type"];
					$button_text = (isset($button["text"]) && $button["text"] !== "") ? "<span class='ml-2 d-none d-md-inline'>" . $button["text"] . "</span>" : "";
					$button_icon = "";
					$button_classes = "";
					$button_attributes = "";
					$button_data = "";
					
					if (isset($button["icon"])) {
						$i = $button["icon"];
						$button_icon = "<i class='$i' aria-hidden='true'></i>";
					}
					
					if (isset($button["id"])) {
						$button_id = $button["id"];
						$button_attributes = "id='$button_id' name='$button_id' ";
					}
					
					if (isset($button["classes"])) {
						$button_classes = $button["classes"];
					}
					
					if (isset($button["data"])) {
						foreach ($button["data"] AS $attr => $data) {
							$data_attr = "data-" . $attr;
							$data_value = "'$data'";
							$button_data .= "$data_attr=$data_value ";
						}
					}
					
					if ($button_type === "a") {
						$el = "a";
						$href = "javascript:void(0);";
						if (isset($button["href"])) {
							$href = $button["href"];
						}
						$ref = "href='$href'";
					} else {
						$el = "button";
						$ref = "type='$button_type'";
					}
					
					$page_heading_buttons .= "
	                    <$el $ref class='$button_classes waves-effect waves-light' $button_attributes $button_data>
	                        $button_icon
	                        $button_text
	                    </$el>
                    ";
				}
			}
			
			return $page_heading_buttons;
		}
		
	}
