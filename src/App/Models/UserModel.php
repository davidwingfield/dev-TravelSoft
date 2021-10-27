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

        public static function update(array $params = []): array
        {
            $id = 1;

            return self::get($id);
        }

        public static function getOneByEmail(string $email = null): array
        {
            $results = [];

            try {
                if (!is_null($email)) {
                    self::$db->where("email", $email);
                }
                self::$db->where("enabled", 1);
                $results = self::$db->getOne(self::$dbTable);
            } catch (Exception $e) {
                Log::$debug_log->error($e->getMessage());
            }

            return $results;
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

        public static function getPasswordById(int $id): array
        {
            if (!is_null($id)) {
                //Model::$db->where("id", 8);
            }

            // self::$db->where("enabled", 1);

            return self::$db->getOne("user");
        }

    }
