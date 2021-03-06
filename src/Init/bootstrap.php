<?php
	/**
	 * Short Description
	 * Long AppIni Description
	 *
	 * @package            Framework\Init
	 */
	
	namespace Framework\Init;
	
	require_once("vendor/autoload.php");
	
	session_start();
	
	use Framework\App\Middlewares\Auth;
	use Framework\Core\Email;
	use Framework\Core\Request;
	use Framework\Core\Router;
	use Framework\Exception\ErrorHandler;
	use Framework\Core\Controller;
	use Framework\Core\Model;
	use Framework\Core\View;
	use Framework\Logger\Log;
	
	include_once(__DIR__ . "/logger_config.php");
	
	$ini = [];
	if (file_exists(ROOT_PATH . "/app.ini")) {
		$ini = AppIni::parse_ini_file_multi(ROOT_PATH . "/app.ini", true);
	}
	
	define("DBPASS", $ini["database"]["db_pass"]);
	define("DBHOST", $ini["database"]["db_host"]);
	define("DBNAME", $ini["database"]["db_name"]);
	define("DBUSER", $ini["database"]["db_user"]);
	define("DBPORT", $ini["database"]["db_port"]);
	define("DBPERSISTENT", $ini["database"]["db_persistent"]);
	define("DBLOGINATTEMPTS", $ini["database"]["db_loginattempts"]);
	define("EXPIRETIME", $ini["database"]["expire_time"]);
	define("VERSION", $ini["application"]["version"]);
	define("PATH", $ini["application"]["path"]);
	define("APIPATH", $ini["application"]["api_path"]);
	define("DEVMODE", $ini["application"]["development_mode"]);
	define("MAILUSER", $ini["email"]["user"]);
	define("MAILPASS", $ini["email"]["pass"]);
	define("MAILHOST", $ini["email"]["host"]);
	define("MAILSMTP", $ini["email"]["smtp_auth"]);
	define("MAILSMTPSECURE", $ini["email"]["smtp_secure"]);
	define("MAILPORT", $ini["email"]["port"]);
	define("MAILFROMADDRESS", $ini["email"]["from"]);
	define("MAILFROMNAME", $ini["email"]["name"]);
	define("LOCATIONDISPLAY", "medium");
	
	define("LOGINATTEMPTS", $ini["database"]["db_loginattempts"]);
	
	const DEV = 0;
	const PRODUCTION = 1;
	
	#development_mode : DEV / PRODUCTION
	const ENVIRONMENT = DEV;
	
	define("POPULATEDATA", true);
	
	include_once(__DIR__ . "/functions.php");
	
	//sec_session_start();
	
	Config::init();
	Controller::init();
	Email::init();
	AppIni::init($ini);
	Model::init();
	View::init();
	// ----
	//Log::clear();
	
	/*
	ini_set("display_errors", 0);
	ini_set("error_reporting", E_ALL);
	//*/
	
	$route_params = Router::load([
		ROUTES_PATH . "/Web.php",
		ROUTES_PATH . "/Api.php",
	])::direct(Request::uri(), Request::method());
	
	if (isset($route_params["controller"], $route_params["action"])) {
		$controller = $route_params["controller"];
		$action = $route_params["action"];
		
		if (Request::src()) {//api call
			
			if (!Auth::authenticate($route_params["action"])) {
				header("HTTP/1.1 401 Unauthorized");
				exit("Unauthorized");
			}
			
		} else {
			
			if (!Auth::logged_in() && Request::uri() !== "login" && Request::uri() !== "forgot_password" && Request::uri() !== "logout" && Request::uri() !== "register" && Request::uri() !== "reset_password") {
				header("Location: /login");
				exit;
			}
			
		}
		
		$controller->$action($route_params["params"]);
	}


 
