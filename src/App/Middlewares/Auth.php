<?php

    namespace Framework\App\Middlewares;

    use \Firebase\JWT\JWT;
    use \Firebase\JWT\JWK;
    use Framework\App\Models\UserModel;
    use Framework\Init\Config;
    use Framework\Logger\Log;

    /**
     * Short Auth Description
     *
     * Long Auth Description
     *
     * @package            Framework\App
     * @subpackage         Middlewares
     */
    class Auth
    {

        /**
         * @return bool
         */
        public static function logged_in(): bool
        {
            if (isset($_SESSION["user_id"], $_SESSION["username"], $_SESSION["login_string"])) {
                $user_id = (int)$_SESSION["user_id"];
                $login_string = $_SESSION["login_string"];
                $user_browser = $_SERVER["HTTP_USER_AGENT"];
                $user = UserModel::getPasswordById((int)$user_id);
                if ($user) {
                    $password = $user["pass"];
                    $login_check = hash("sha512", $password . $user_browser);
                    if ($login_check == $login_string) {
                        /** Logged In */
                        if (!defined("FNAME")) {
                            define("FNAME", $_SESSION["name_first"]);
                        }

                        if (!defined("LNAME")) {
                            define("LNAME", $_SESSION["name_last"]);
                        }

                        return true;
                    } else {
                        /** Not Logged In */
                        return false;
                    }
                }

            }

            /** Not Logged In */
            return false;
        }

        public static function authenticate($methodName): bool
        {
            return true;
            $tokenParts = [];
            // extract the token from the headers
            if (!isset($_SERVER['HTTP_AUTHORIZATION'])) {
                return false;
            }

            $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
            preg_match('/Bearer\s(\S+)/', $authHeader, $matches);

            if (!isset($matches[1])) {
                return false;
            }

            $token = $matches[1];

            // validate the token
            if ($methodName == 'charge') {
                return self::authenticateRemotely($token);
            } else {
                return self::authenticateLocally($token, $tokenParts);
            }
        }

        public static function authenticateRemotely($token): bool
        {
            $metadataUrl = getenv('OKTA_ISSUER') . '/.well-known/oauth-authorization-server';
            $metadata = self::http($metadataUrl);
            $introspectionUrl = $metadata['introspection_endpoint'];

            $params = [
                'token' => $token,
                'client_id' => getenv('OKTA_SERVICE_APP_ID'),
                'client_secret' => getenv('OKTA_SERVICE_APP_SECRET'),
            ];

            $result = self::http($introspectionUrl, $params);

            if (!$result['active']) {
                return false;
            }

            return true;
        }

        public static function authenticateLocally($token, $tokenParts): bool
        {
            $tokenParts = explode('.', $token);
            $decodedToken['header'] = json_decode(self::base64UrlDecode($tokenParts[0]), true);
            $decodedToken['payload'] = json_decode(self::base64UrlDecode($tokenParts[1]), true);
            $decodedToken['signatureProvided'] = self::base64UrlDecode($tokenParts[2]);

            // Get the JSON Web Keys from the server that signed the token
            // (ideally they should be cached to avoid
            // calls to Okta on each API request)...
            $metadataUrl = getenv('OKTA_ISSUER') . '/.well-known/oauth-authorization-server';
            $metadata = self::http($metadataUrl);
            $jwksUri = $metadata['jwks_uri'];
            $keys = self::http($jwksUri);

            // Find the public key matching the kid from the input token
            $publicKey = false;
            foreach ($keys['keys'] as $key) {
                if ($key['kid'] == $decodedToken['header']['kid']) {
                    $publicKey = JWK::parseKey($key);
                    break;
                }
            }
            if (!$publicKey) {
                echo "Couldn't find public key\n";

                return false;
            }

            // Check the signing algorithm
            if ($decodedToken['header']['alg'] != 'RS256') {
                echo "Bad algorithm\n";

                return false;
            }

            $result = JWT::decode($token, $publicKey, array('RS256'));

            if (!$result) {
                echo "Error decoding JWT\n";

                return false;
            }

            // Basic JWT validation passed, now check the claims

            // Verify the Issuer matches Okta's issuer
            if ($decodedToken['payload']['iss'] != getenv('OKTA_ISSUER')) {
                echo "Issuer did not match\n";

                return false;
            }

            // Verify the audience matches the expected audience for this API
            if ($decodedToken['payload']['aud'] != getenv('OKTA_AUDIENCE')) {
                echo "Audience did not match\n";

                return false;
            }

            // Verify this token was issued to the expected client_id
            if ($decodedToken['payload']['cid'] != getenv('OKTA_CLIENT_ID')) {
                echo "Client ID did not match\n";

                return false;
            }

            return true;
        }

        public static function http($url, $params = null): string
        {
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            if ($params) {
                curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
            }

            return json_decode(curl_exec($ch), true);
        }

        public static function base64UrlDecode($input): string
        {
            $remainder = strlen($input) % 4;
            if ($remainder) {
                $padlen = 4 - $remainder;
                $input .= str_repeat('=', $padlen);
            }

            return base64_decode(strtr($input, '-_', '+/'));
        }

        public static function encodeLength($length): string
        {
            if ($length <= 0x7F) {
                return chr($length);
            }
            $temp = ltrim(pack('N', $length), chr(0));

            return pack('Ca*', 0x80 | strlen($temp), $temp);
        }

        public static function base64UrlEncode($text): string
        {
            return str_replace([
                '+',
                '/',
                '=',
            ], [
                '-',
                '_',
                '',
            ], base64_encode($text)
            );
        }

        public static function checkBrute(int $id): bool
        {
            if ($id && intval($id) > 0) {
                $attempts = UserModel::getLoginAttemptsById($id);
                if (intval($attempts) > Config::getMaxLoginAttemptsPerHour()) {
                    return true;
                }
            }

            return false;
        }

        public static function insertBrute(int $id)
        {
            if ($id && intval($id) > 0) {
                return UserModel::insertLoginAttempt($id);
            }

            return null;
        }

    }
