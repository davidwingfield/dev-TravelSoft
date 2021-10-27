<?php

    namespace Framework\Logger;

    use Framework\Core\Controller;

    /**
     * Short Config Description
     *
     * Long Config Description
     *
     * @package            Framework\Logger
     */
    class Log
    {
        protected static $logs = array(
            "debug",
            "event",
            "access",
            "mysql",
            "batch",
            "file",
            "mysql",
        );

        protected static $errorType = array(
            E_ERROR => "ERROR",
            E_WARNING => "WARNING",
            E_PARSE => "PARSING ERROR",
            E_NOTICE => "NOTICE",
            E_CORE_ERROR => "CORE ERROR",
            E_CORE_WARNING => "CORE WARNING",
            E_COMPILE_ERROR => "COMPILE ERROR",
            E_COMPILE_WARNING => "COMPILE WARNING",
            E_USER_ERROR => "USER ERROR",
            E_USER_WARNING => "USER WARNING",
            E_USER_NOTICE => "USER NOTICE",
            E_STRICT => "STRICT NOTICE",
            E_RECOVERABLE_ERROR => "RECOVERABLE ERROR",
            E_DEPRECATED => "DEPRECATED",
            E_USER_DEPRECATED => "USER DEPRECATED",
        );

        public static $debug_log;
        public static $event_log;
        public static $access_log;
        public static $image_log;
        public static $batch_log;
        public static $mysql_log;

        public function __construct()
        {
            self::init();
        }

        public static function init(): void
        {
            global $MAIN_API_FILE_LOGGER;
            global $DEBUG_LOGGER;
            global $ACCESS_LOGGER;
            global $BATCH_LOGGER;
            global $IMAGE_LOGGER;

            if (!is_null($DEBUG_LOGGER)) {
                self::$debug_log = $DEBUG_LOGGER;
            }

            self::$access_log = $ACCESS_LOGGER;
            self::$image_log = $IMAGE_LOGGER;
            self::$batch_log = $BATCH_LOGGER;
            self::$event_log = $MAIN_API_FILE_LOGGER;
        }

        public static function access($message, $level = "trace"): void
        {
            if (self::$access_log) {

                switch ($level) {

                    case "debug":
                        self::$access_log->debug($message);
                        break;
                    case "warn":
                        self::$access_log->warn($message);
                        break;
                    case "error":
                        self::$access_log->error($message);
                        break;
                    case "info":
                        self::$access_log->info($message);
                        break;
                    default:
                        self::$access_log->trace($message);
                }

            }

        }

        public static function trace($message): void
        {
            if (self::$debug_log) {
                self::$debug_log->trace($message);
            }

        }

        public static function warn($message): void
        {
            if (self::$debug_log) {
                self::$debug_log->warn($message);
            }
        }

        public static function error($message): void
        {
            self::$debug_log->error($message);
            self::$event_log->error($message);
        }

        public static function info($message): void
        {
            self::$debug_log->trace($message);
            self::$event_log->info($message);
        }

        public static function debug($message): void
        {
            self::$debug_log->trace($message);
        }

        private static function emptyLog($log)
        {
            $logFile = $_SERVER["DOCUMENT_ROOT"] . "/var/logs/$log.log";

            if (!file_exists($logFile)) {
                $my_file = fopen($logFile, "w");
                fclose($my_file);
            }
            ////
            if (!is_file($logFile)) {
                file_put_contents($logFile, "");
            } else {
                $myRequest = fopen($logFile, "w") or die("Unable to open file!");
                $status = fwrite($myRequest, "");
                fclose($myRequest);
            }

            ////
        }

        public static function clear(string $log = "all")
        {
            if ($log === "all") {
                foreach (self::$logs AS $log) {
                    self::emptyLog($log);
                }
            } else {
                self::emptyLog($log);
            }
        }

        public static function display($var, $title = "")
        {
            echo "<div style='padding:.5rem; margin:.5rem;border:solid 1px #000;'><h4>$title:</h4><pre>" . var_export($var, 1) . "</pre></div>";
        }

        public static function display_end($var, $title = "")
        {
            if ($var) {
                echo "<div style='padding:.5rem; margin:.5rem;border:solid 1px #000;'><h4>$title:</h4><pre>" . var_export($var, 1) . "</pre></div>";
            }

            exit("<p style='margin:.5rem; color:red;width:100%;text-align:center;line-height:1.4;'>Application Ended</p>");
        }

    }
