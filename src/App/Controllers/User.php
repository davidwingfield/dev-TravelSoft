<?php

    namespace Framework\App\Controllers;

    use Framework\App\Middlewares\Auth;
    use Framework\App\Models\UserModel;
    use Framework\Core\Controller;
    use Framework\Core\Email;
    use Framework\Core\View;
    use Framework\Logger\Log;
    use PHPMailer\PHPMailer\PHPMailer;

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
        /**
         * inherit parent construct
         */
        public function __construct()
        {
            parent::__construct();
        }

        public function index()
        {
            $data = Page::getDetails(20);

            View::render_template("users/index", $data);
            exit(1);

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
                        exit(1);
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
            /** Render Invalid View. */
            View::render_invalid_json("User Not Found: email - $email");
            exit(1);
        }

        public static function serveResetPassword(array $params = [])
        {
            if (isset($params, $params["email"])) {
                $user = UserModel::getOneByEmail($params["email"]);
                if (count($user)) {
                    $tempPassword = self::generateRandomPassword();
                    $tempSalt = self::generateRandomSalt();
                    $tempPasswordHash = self::generatePasswordHash($tempPassword, $tempSalt);
                    $user["pass"] = $tempPasswordHash;
                    $user["salt"] = $tempSalt;
                    if (self::sendPasswordResetEmail($user, $tempPassword)) {
                        /** Render View. */
                        View::render_json($user);
                        exit(1);
                    }

                }
            }
        }

        private static function sendPasswordResetEmail(array $user, string $tempPassword): bool
        {
            if (!$user || !$tempPassword) {
                return false;
            }
            $recipients = array();
            $name_first = $user["name_first"];
            $name_last = $user["name_last"];
            $email = $user["email"];
            $name = "$name_first $name_last";
            $recipients[] = array(
                "type" => "to",
                // - to, cc, bcc
                "email" => $email,
                "name" => $name,
            );

            $recipients[] = array(
                "type" => "cc",
                // - to, cc, bcc
                "email" => "davidwingfield@outlook.com",
                "name" => "David Wingfield",
            );

            $subject = "TravelSoft Password Reset";
            $template = "emailPasswordResetConfirmation";

            return Email::send($recipients, $subject, $template, [], $user);
        }

        public static function test()
        {
            $testSalt = "e00cd82d22dd26f2b14f96261367cb069f3bf991d61b8fddbf2784e68f79557695da43293397e9d62fa3b0b0782a9269261adbecd05a61ee8547dde6a0817b6d";
            $testPassword = "Swindon4";
            //echo self::generateRandomPassword();
            //echo self::generateRandomSalt();

            echo self::generatePasswordHash($testPassword, $testSalt);
        }

        /**
         * getnerates random password
         *
         * @return string
         */
        public static function generateRandomPassword(): string
        {
            $comb = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
            $pass = array();
            $combLen = strlen($comb) - 1;
            for ($i = 0; $i < 10; $i++) {
                $n = rand(0, $combLen);
                $pass[] = $comb[$n];
            }

            return implode($pass);
        }

        /**
         * generates random salt
         *
         * @return string
         */
        public static function generateRandomSalt(): string
        {
            return hash("sha512", uniqid(openssl_random_pseudo_bytes(16), true));
        }

        /**
         * generate random password hash
         *
         * @param string $password
         * @param string $salt
         *
         * @return string
         */
        public static function generatePasswordHash(string $password, string $salt): string
        {
            $_password = hash("sha512", "Swindon4");

            return hash("sha512", $_password . $salt);
        }

    }
