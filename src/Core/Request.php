<?php

    namespace Framework\Core;

    use Framework\Init\Config;

    /**
     * Short Request Description
     *
     * Long Request Description
     *
     * @package            Framework\Core
     */
    class Request
    {
        /**
         * returns the request uri.
         */
        public static function uri(): string
        {
            return trim(parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH), "/");

        }

        private static function contains($needle, $haystack)
        {
            return strpos($haystack, $needle) !== false;
        }

        public static function src(): bool
        {
            if (preg_match('/\b\/api\/\b/', self::uri())) {
                echo 'true';
            }

            $needle = APIPATH . '/v' . VERSION;

            return self::contains($needle, self::uri());

        }

        public static function params(): array
        {
            $params = [];

            $uri = filter_var(self::uri(), FILTER_SANITIZE_URL);

            $url = explode("/", $uri);

            foreach ($url AS $val) {
                if ($val !== "api" && $val !== "v" . Config::getVersion()) {
                    $params[] = $val;
                }

            }

            return $params;

        }

        public static function method()
        {
            return $_SERVER["REQUEST_METHOD"];
        }

    }
