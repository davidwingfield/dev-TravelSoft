<?php

    namespace Framework\App\Models;

    use Exception;
    use Framework\Core\Model;
    use Framework\Logger\Log;

    /**
     * Short User Description
     *
     * Long User Description
     *
     * @package            Framework\App
     * @subpackage         Models
     */
    class UserModel extends Model
    {

        protected static $dbTable = "user";
        protected static $dbFields = Array();

        public static function getRoleByRoleId(int $roleId = null): array
        {
            $results = [];
            try {
                if (!is_null($roleId)) {
                    self::$db->where("id", $roleId);
                }

                $results = self::$db->get("role");
            } catch (Exception $e) {
                Log::$debug_log->error($e->getMessage());
            }

            return $results;
        }

        public static function get(int $id = null): array
        {
            $results = [];
            try {
                if (!is_null($id)) {
                    self::$db->where("id", $id);
                }

                self::$db->where("enabled", 1);

                $results = self::$db->get(self::$dbTable);
            } catch (Exception $e) {
                Log::$debug_log->error($e->getMessage());
            }

            return $results;
        }

        public static function getOne(int $id = null): array
        {
            try {
                if (!is_null($id)) {
                    self::$db->where("id", $id);
                }

                self::$db->where("enabled", 1);

                return self::$db->getOne(self::$dbTable);
            } catch (Exception $e) {
                return [];
            }
        }

        public static function getOneByEmail(string $email = null)
        {
            try {
                if (!is_null($email)) {
                    self::$db->where("email", $email);
                }
                self::$db->where("enabled", 1);

                return self::$db->getOne(self::$dbTable);
            } catch (Exception $e) {
                Log::$debug_log->error($e);

                return [];

            }
        }

        public static function countByUsername(string $username)
        {
            $count = 0;
            if (!isset($username)) {
                Log::$debug_log->error("Missing Username");

                return $count;
            }
            $sql = "
                SELECT COUNT(id) AS 'user_count' FROM travelsoft.user WHERE username='$username';
            ";
            try {
                $count = Model::$db->rawQueryOne($sql);

                return $count["user_count"];

            } catch (Exception $e) {
                Log::$debug_log->error($e);
            }

            return $count;
        }

        public static function countByEmail(string $email)
        {
            $count = 0;
            if (!isset($email)) {
                Log::$debug_log->error("Missing Email");

                return $count;
            }
            $sql = "
                SELECT COUNT(id) AS 'user_count' FROM travelsoft.user WHERE email='$email';
            ";
            try {
                $count = Model::$db->rawQueryOne($sql);

                return $count["user_count"];

            } catch (Exception $e) {
                Log::$debug_log->error($e);
            }

            return $count;
        }

        public static function getLoginAttemptsById(int $id): int
        {
            $now = time();
            $valid_attempts = $now - (2 * 60 * 60);

            try {
                $cols = Array("time");
                self::$db->where("user_id", $id);
                self::$db->where("time > '$valid_attempts'");
                $login_attempts = self::$db->get("login_attempts", null, $cols);
                if ($login_attempts) {
                    return count($login_attempts);
                }
            } catch (Exception $e) {
                Log::$debug_log->error($e->getMessage());
            }

            return 0;
        }

        public static function insertLoginAttempt(int $id): bool
        {
            $now = time();
            $data = array(
                "user_id" => $id,
                "time" => $now,
            );

            try {
                $id = self::$db->insert("login_attempts", $data);
                if ($id) {
                    return true;
                } else {
                    Log::$debug_log->error("insert failed: " . self::$db->getLastError());
                }
            } catch (Exception $e) {
                Log::$debug_log->error($e->getMessage());
            }

            return false;
        }

        public static function getPasswordById(int $id = null): array
        {
            if (!is_null($id)) {
                Model::$db->where("id", $id);
                self::$db->where("enabled", 1);

                return self::$db->getOne("user");
            }

            return [];

        }

        public static function update(array $user): array
        {
            if (!isset($user)) {
                Log::$debug_log->error("User Object Missing");

                return [];
            }

            $id = Model::setInt((isset($user["id"])) ? $user["id"] : null);
            $role_id = Model::setInt((isset($user["role_id"])) ? $user["role_id"] : null);
            $email = Model::setString((isset($user["email"])) ? $user["email"] : null);
            $name_first = Model::setString((isset($user["name_first"])) ? $user["name_first"] : null);
            $name_last = Model::setString((isset($user["name_last"])) ? $user["name_last"] : null);
            $username = Model::setString((isset($user["username"])) ? $user["username"] : null);
            $role = Model::setString((isset($user["role"])) ? $user["role"] : "");
            $pass = Model::setString((isset($user["pass"])) ? $user["pass"] : null);
            $salt = Model::setString((isset($user["salt"])) ? $user["salt"] : null);
            $note = Model::setLongText((isset($user["note"])) ? $user["note"] : null);
            $user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
            $enabled = Model::setBool((isset($user["enabled"])) ? $user["enabled"] : null);
            $created_by = Model::setInt($user_id);
            $modified_by = Model::setInt($user_id);
            $sql = "
                INSERT INTO user (
                    id, role_id, email, name_first, name_last,
                    username, role, pass, salt, enabled,
                    date_created, created_by, date_modified, modified_by,
                    note
                ) VALUES (
                    $id, $role_id, $email, $name_first, $name_last,
                    $username, $role, $pass, $salt, $enabled,
                    CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP, $modified_by,
                    $note
                )
                ON DUPLICATE KEY UPDATE
                    role_id = VALUES(role_id),
                    email = VALUES(email),
                    name_first = VALUES(name_first),
                    name_last = VALUES(name_last),
                    username = VALUES(username), 
                    role = VALUES(role), 
                    pass = VALUES(pass), 
                    salt = VALUES(salt), 
                    enabled = VALUES(enabled),
                    date_modified = VALUES(date_modified);
            ";

            Log::$debug_log->trace($sql);

            try {
                Model::$db->rawQuery($sql);
                $id = Model::$db->getInsertId();
                if ($id) {
                    return self::get($id);
                }
            } catch (Exception $e) {
                Log::$debug_log->error($e);

            }

            return [];
        }

        public static function updateCredentials(array $user): array
        {
            if (!isset($user)) {
                Log::$debug_log->error("User Object Missing");

                return [];
            }

            $id = Model::setInt((isset($user["id"])) ? $user["id"] : null);
            $role_id = Model::setInt((isset($user["role_id"])) ? $user["role_id"] : null);
            $email = Model::setString((isset($user["email"])) ? $user["email"] : null);
            $name_first = Model::setString((isset($user["name_first"])) ? $user["name_first"] : null);
            $name_last = Model::setString((isset($user["name_last"])) ? $user["name_last"] : null);
            $username = Model::setString((isset($user["username"])) ? $user["username"] : null);
            $role = Model::setString((isset($user["role"])) ? $user["role"] : "");
            $pass = Model::setString((isset($user["pass"])) ? $user["pass"] : null);
            $salt = Model::setString((isset($user["salt"])) ? $user["salt"] : null);
            $note = Model::setLongText((isset($user["note"])) ? $user["note"] : null);
            $user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
            $enabled = Model::setBool((isset($user["enabled"])) ? $user["enabled"] : null);
            $created_by = Model::setInt($user_id);
            $modified_by = Model::setInt($user_id);
            $sql = "
                INSERT INTO user (
                    id, role_id, email, name_first, name_last,
                    username, role, pass, salt, enabled,
                    date_created, created_by, date_modified, modified_by,
                    note
                ) VALUES (
                    $id, $role_id, $email, $name_first, $name_last,
                    $username, $role, $pass, $salt, $enabled,
                    CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP, $modified_by,
                    $note
                )
                ON DUPLICATE KEY UPDATE
                    role_id = VALUES(role_id),
                    email = VALUES(email),
                    name_first = VALUES(name_first),
                    name_last = VALUES(name_last),
                    username = VALUES(username), 
                    role = VALUES(role), 
                    pass = VALUES(pass), 
                    salt = VALUES(salt), 
                    enabled = VALUES(enabled),
                    date_modified = VALUES(date_modified);
            ";

            Log::$debug_log->trace($sql);

            try {
                Model::$db->rawQuery($sql);
                $id = Model::$db->getInsertId();
                if ($id) {
                    return self::get($id);
                }
            } catch (Exception $e) {
                Log::$debug_log->error($e);

            }

            return [];
        }

    }
