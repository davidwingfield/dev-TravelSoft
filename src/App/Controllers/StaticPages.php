<?php

    namespace Framework\App\Controllers;

    use Framework\App\Models\PageModel;
    use Framework\App\Models\UserModel;
    use Framework\Core\Controller;
    use Framework\Core\View;
    use Framework\Logger\Log;

    /**
     * Short StaticPages Description
     *
     * Long StaticPages Description
     *
     * @package            Framework\App
     * @subpackage         Controllers
     */
    class StaticPages extends Controller
    {

        public function __construct()
        {
            parent::__construct();

        }

        public static function profile()
        {
            $data = Page::getDetails(13);
            $results = UserModel::get((int)$_SESSION["user_id"]);
            if (isset($results[0])) {
                $results = $results[0];
            }
            $data["user_details"] = $results;
            define("BREADCRUMBS", "
            <li class='breadcrumb-item'>
                <a href='/'>
                    Home
                </a>
            </li>
            <li>
                Profile
            </li>
            "
            );

            View::render_template("pages/profile", $data);
            exit(1);
        }

        public static function index()
        {
            $data = Page::getDetails(1);
            define("BREAD_CRUMBS", "
            <li class='breadcrumb-item'>
                Home
            </li>"
            );
            // ----
            View::render_template("pages/dashboard", $data);
            exit(1);
        }

        public static function login()
        {
            $data = Page::getDetails(2);
            View::render_template("pages/login", $data);
            exit(1);
        }

        public static function register()
        {
            $data = Page::getDetails(18);
            View::render_template("pages/register", $data);
            exit(1);
        }

        public static function framework()
        {
            $data = Page::getDetails(15);
            define("BREAD_CRUMBS", "
            <li class='breadcrumb-item'>
                <a href='/'>Home</a>
            </li>
            <li class='breadcrumb-item'>
                Framework
            </li>"
            );
            View::render_template("documents/framework", $data);
            exit(1);
        }

        public static function database()
        {
            $data = Page::getDetails(16);
            define("BREAD_CRUMBS", "
            <li class='breadcrumb-item'>
                <a href='/'>Home</a>
            </li>
            <li class='breadcrumb-item'>
                Database
            </li>"
            );
            View::render_template("documents/database", $data);
            exit(1);
        }

        public static function filemanager()
        {
            $data = Page::getDetails(17);
            define("BREAD_CRUMBS", "
            <li class='breadcrumb-item'>
                <a href='/'>Home</a>
            </li>
            <li class='breadcrumb-item'>
                File Manager
            </li>"
            );
            View::render_template("utilities/filemanager", $data);
            exit(1);
        }

        public static function logout()
        {
            $data = Page::getDetails(3);
            define("BREAD_CRUMBS", "
            <li class='breadcrumb-item'>
                Home
            </li>"
            );
            // ----
            $user_id = "{no user_id}";
            if (isset($_SESSION["user_id"])) {
                $user_id = $_SESSION["user_id"];
            }
            Log::$access_log->info("$user_id: Logged Out");
            $_SESSION = array();
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
            session_destroy();
            // ----
            header("Location: /");
            exit(1);
        }

        public static function reset_password()
        {
            $data = Page::getDetails(18);
            View::render_template("pages/reset_password", $data);
            exit(1);
        }

        public static function forgot_password()
        {
            $data = Page::getDetails(19);
            View::render_template("pages/forgot_password", $data);
            exit(1);
        }

    }
