<?php

    namespace Framework\Exception;

    use Exception;
    use Framework\Init\Config;
    use Framework\Logger\Log;

    /**
     * Short ErrorHandler Description
     *
     * Long ErrorHandler Description
     *
     * @package         Framework\Exception
     * @uses            used in prod env for logging all type of error of php code in a file for further debugging
     *                  and code performance
     */
    class ErrorHandler
    {
        /** @var int Short docblock, should contain a description. */
        public static $errno;
        /** @var string Short docblock, should contain a description. */
        public static $errstr;
        /** @var string Short docblock, should contain a description. */
        public static $errfile;
        /** @var int Short docblock, should contain a description. */
        public static $errline;
        /** @var array|null Short docblock, should contain a description. */
        public static $errcontext;
        /** @var array Short docblock, should contain a description. */
        public static $errorType = array(
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

        /**
         * Directs Error
         *
         * @param int         $code
         * @param string      $description
         * @param string|null $file
         * @param int|null    $line
         * @param array|null  $context
         *
         * @return bool
         */
        public function handleError(int $code, string $description, string $file = null, int $line = null, array $context = null): bool
        {
            $displayErrors = ini_get("display_errors");
            $displayErrors = strtolower($displayErrors);
            $date = date("Y-m-d H:i:s");
            $eCode = self::$errorType[$code];
            $description = htmlspecialchars($description);
            ////
            if (error_reporting() === 0 || $displayErrors === "on") {
                return false;
            }
            ////
            list($error, $log, $logger) = self::mapErrorCode($code);
            ////
            $data = array(
                'date' => $date,
                'eCode' => $eCode,
                'level' => $log,
                'code' => $code,
                'error' => $error,
                'description' => $description,
                'file' => $file,
                'line' => $line,
                //'context' => $context,
                'logger' => $logger,
                'path' => $file,
                'message' => $error . ' (' . $code . '): ' . $description . ' in [' . $file . ', line ' . $line . ']',
            );

            Log::$logger($description);

            return true;
        }

        /**
         * Map an error code into an Error word, and log location.
         *
         * @param int $code Error code to map
         *
         * @return array Array of error word, and log location.
         */
        private static function mapErrorCode(int $code): array
        {
            $error = $log = null;
            $logger = 'trace';
            switch ($code) {
                case E_PARSE:
                case E_ERROR:
                case E_CORE_ERROR:
                case E_COMPILE_ERROR:
                case E_USER_ERROR:
                    $logger = 'error';
                    $error = 'Fatal Error';
                    $log = LOG_ERR;
                    break;
                case E_WARNING:
                case E_USER_WARNING:
                case E_COMPILE_WARNING:
                case E_RECOVERABLE_ERROR:
                    $logger = 'warn';
                    $error = 'Warning';
                    $log = LOG_WARNING;
                    break;
                case E_NOTICE:
                case E_USER_NOTICE:
                    $logger = 'trace';
                    $error = 'Notice';
                    $log = LOG_NOTICE;
                    break;
                case E_STRICT:
                    $logger = 'warn';
                    $error = 'Strict';
                    $log = LOG_NOTICE;
                    break;
                case E_DEPRECATED:
                case E_USER_DEPRECATED:
                    $logger = 'info';
                    $error = 'Deprecated';
                    $log = LOG_NOTICE;
                    break;
                default :
                    break;
            }

            return array(
                $error,
                $log,
                $logger,
            );
        }

        /**
         * Custom Error Handle
         *
         * @param int        $num
         * @param string     $str
         * @param string     $file
         * @param string     $line
         * @param array|null $context
         */
        private static function log_error(int $num, string $str, string $file, string $line, array $context = null): void
        {
            if (Config::getDevelopmentMode()) {

            }
            //self::log_exception(new ErrorException($str, 0, $num, $file, $line));
        }

        /**
         * Logs custom exceptions
         *
         * @param \Exception $e
         */
        private static function log_exception(Exception $e)
        {
            //log_exception(new ErrorException($str, 0, $num, $file, $line));
        }

    }
