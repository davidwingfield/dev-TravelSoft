<?php

    namespace Framework\Core;

    use Exception;

    /**
     * Short Router Description
     *
     * Long Router Description
     *
     * @package            Application\Core
     * @uses               used in prod env for logging all type of error of php code in a file for further debugging
     *                     and code performance
     */
    class Router
    {
        /**
         * @var string $controllerNamespace Namespace for the route's controller
         */
        private static $controllerNamespace = "Framework\\App\\Controllers\\";

        public static $params = [];

        /**
         * @var array[] $routes
         */
        public static $routes = [
            "GET" => [],
            "POST" => [],
            "DELETE" => [],
            "PATCH" => [],
            "OPTIONS" => [],
            "PUT" => [],
        ];

        /**
         * @param $uri
         * @param $controller
         *
         * @return mixed
         */
        public static function get($uri, $controller)
        {
            return self::$routes["GET"][trim($uri, '/')] = $controller;
        }

        public static function post($uri, $controller)
        {

            return self::$routes["POST"][trim($uri, '/')] = $controller;
        }

        public static function delete($uri, $controller)
        {

            return self::$routes["DELETE"][trim($uri, '/')] = $controller;
        }

        public static function patch($uri, $controller)
        {

            return self::$routes["PATCH"][trim($uri, '/')] = $controller;
        }

        /**
         * @param array $files
         *
         * @return Router
         */
        public static function load(array $files = [])
        {
            $instance = new static();

            foreach ($files as $file) {
                require_once $file;
            }

            return $instance;
        }

        public static function direct($uri, $requestType)
        {

            if (!isset(self::$routes[$requestType])) {
                http_response_code(503);
                header("Content-type:application/json");
                $data = array(
                    "status" => "error",
                    "message" => "Bad Request. Unknown request method $requestType",
                    "code" => 503,
                );

                View::render_invalid_json($data, 503);
                exit();
            }

            $routeFound = null;

            foreach (self::$routes[$requestType] as $key => $route) {
                $regex = self::parseRoute(trim($key, "/"));
                if (preg_match($regex, trim($uri, "/"))) {
                    self::setParams($key);
                    $routeFound = $route;
                    break;
                }
            }

            if ($routeFound) {
                return static::mapController(...explode("@", $routeFound));
            }

            try {
                http_response_code(404);
                header("HTTP/1.1 404 Not Found");
                View::render("errors/404");
                exit;
            } catch (Exception $e) {
                //display($e->getMessage());
                exit();
            }
        }

        /**
         * @param $controller
         * @param $action
         *
         * @return mixed
         */
        public static function mapController($controller, $action)
        {
            $controller = (self::$controllerNamespace . $controller);

            if (class_exists($controller)) {
                /**  renew the controller class */
                $controller = new $controller;
                /**  check if routes method exists */
                if (method_exists($controller, $action)) {
                    return array(
                        "controller" => $controller,
                        "action" => $action,
                        "params" => self::$params,
                    );
                }
            }
            /**
             * @todo Add Page direction
             */

            try {
                View::render("errors/404");
                exit;
            } catch (Exception $e) {
                //$error = array();
                //display($e->getMessage());
                exit();
            }

        }

        private static function setParams(string $key)
        {
            self::$params = [];
            $uri = Request::uri();

            foreach ($_GET as $paramName => $paramValue) {
                if ($paramName !== "url") {
                    self::$params[$paramName] = $paramValue;
                }
            }

            foreach ($_POST as $paramName => $paramValue) {
                if ($paramName !== "url") {
                    self::$params[$paramName] = $paramValue;
                }
            }

            $path = str_replace('${', '[', str_replace('}', ']', $key
                )
            );

            preg_match_all("/\[([^\]]*)\]/", $path, $matches
            );

            foreach ($matches[1] as $match) {
                self::$params[$match] = null;
            }

            $path = str_replace('[', '', str_replace(']', '', $path));
            $parts = explode("/", $path);
            $explodedURI = explode("/", $uri);
            $n = 0;

            foreach ($parts as $part) {
                if (array_key_exists($part, self::$params)) {
                    self::$params[$part] = $explodedURI[$n];
                }
                $n++;
            }
        }

        private static function parseRoute(string $route = ""): string
        {
            $path = explode("/", $route);
            $regex = [];

            foreach ($path AS $el) {
                if ($el !== "") {
                    $temp = preg_replace('/^(\/)$/', "(\/)", $el);
                    $temp = preg_replace('/^(\$\{)([a-z_]*)(\})$/', "(\d+)", $temp);
                    $temp = preg_replace('/^[a-z_]*$/', "($el)", $temp);
                    $regex[] = $temp;
                }
            }

            return '/^' . implode("\/", $regex) . '$/';
        }

    }
