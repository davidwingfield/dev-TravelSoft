<?php

    namespace Framework\App\Controllers;

    use Framework\App\Middlewares\Auth;
    use Framework\App\Models\UserModel;
    use Framework\Core\Controller;
    use Framework\Core\View;
    use Framework\Logger\Log;

    /**
     * Short User Description
     *
     * Long User Description
     *
     * @package            Framework\App
     * @subpackage         Controllers
     */
    class User extends Controller
    {
        public function __construct()
        {
            parent::__construct();
        }

        public function index()
        {

        }

        public static function get_products_by_user(array $params = [])
        {
            if (isset($params["user_id"])) {
                $params["user_id"] = (int)$params["user_id"];
            }
            if (isset($params["user_id"])) {
                $params["product_id"] = (int)$params["product_id"];
            }
            View::render_json($params);
            exit;
        }

        public static function login(array $params = []): void
        {
            if (!isset($params["email"])) {
                View::render_invalid_json("Field Missing: email");
                exit;
            }

            if (!isset($params["password"])) {
                View::render_invalid_json("Field Missing: password");
                exit;
            }

            $email = $params["email"];
            $password = hash("sha512", $params["password"]);
            $users = UserModel::getOneByEmail($email);

            if (isset($users) && count($users) > 0) {
                $db_password = $users["pass"];
                $salt = $users["salt"];
                // ----
                $username = $users["username"];
                $role_id = intval($users["role_id"]);
                $name_last = $users["name_last"];
                $name_first = $users["name_first"];
                $id = intval($users["id"]);

                /** Brute Check. */
                if (Auth::checkBrute($id) === true) {
                    View::render_invalid_json("Account is Locked: user_id - $id");
                    exit;
                } else {
                    $password = hash("sha512", $password . $salt);
                    /** Check if passwords match. */
                    if ($db_password === $password) {
                        /** Get the user-agent string of the user. */
                        $user_browser = $_SERVER["HTTP_USER_AGENT"];
                        $user_id = preg_replace("/[^0-9]+/", "", $id);
                        $username = preg_replace("/[^a-zA-Z0-9_\-]+/", "", $username);
                        /** Set Session Values. */
                        $_SESSION["user_id"] = $user_id;
                        $_SESSION["username"] = $username;
                        $_SESSION["email"] = $email;
                        $_SESSION["role_id"] = $role_id;
                        $_SESSION["name_last"] = $name_last;
                        $_SESSION["name_first"] = $name_first;
                        $_SESSION["login_string"] = hash("sha512", $db_password . $user_browser);

                        /** Render View. */
                        View::render_json($users);
                        exit;
                    } else {
                        /** Password Incorrect. */
                        $attempt = Auth::insertBrute($id);
                        Log::$debug_log->trace("passedin: $password");
                        Log::$debug_log->trace("passedot: $db_password");
                        View::render_invalid_json("Password is Incorrect: user_id - $id");
                        exit;
                    }
                }
            }
            View::render_invalid_json("User Not Found: email - $email");
            exit;
        }

    }
