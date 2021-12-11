<?php
    
    namespace Framework\Core;
    
    use MysqliDb;
    use Framework\Init\Config;
    
    /**
     * Short Model Description
     * Long Model Description
     *
     * @package            Framework\Core
     */
    class Model
    {
        
        /**
         * @var MysqliDb $db
         */
        public static $db;
        
        public static function init()
        {
            
            if (self::$db === null) {
                self::$db = new MysqliDb(Config::getDBHost(), Config::getDBUser(), Config::getDBPass(), Config::getDBName());
            }
        }
        
        public static function setBool($bool = null): int
        {
            if (is_null($bool)) {
                return 1;
            }
            
            return intval($bool);
        }
        
        /**
         * sets value as int
         *
         * @param null $int
         *
         * @return int|string
         */
        public static function setInt($int = null)
        {
            if (is_null($int) || intval($int) === 0) {
                return "NULL";
            } else {
                return intval($int);
            }
        }
        
        public static function setLongText($string = null): string
        {
            if (is_null($string)) {
                return "NULL";
            } else {
                $htmlEntities = htmlentities($string);
                $withSlashes = addSlashes($string);
                
                return "'" . addslashes(html_entity_decode($string)) . "'";
            }
        }
        
        public static function setString($string = null): string
        {
            if (is_null($string)) {
                return "NULL";
            } else {
                $temp = $string;
                
                //$temp = htmlentities($_string);
                return "'" . addslashes(html_entity_decode($string)) . "'";
            }
        }
        
    }
