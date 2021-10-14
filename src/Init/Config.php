<?php

    namespace Framework\Init;

    /**
     * Short Config Description
     *
     * Long Config Description
     *
     * @package            Application\Init
     */
    class Config
    {

        protected static $DBNAME;
        protected static $DBHOST;
        protected static $DBUSER;
        protected static $DBPORT;
        protected static $SHOW_ERRORS;
        protected static $DBPASS;
        protected static $EXPIRETIME;
        protected static $DEVELOPMENT_MODE;
        protected static $VERSION;
        protected static $LOGIN_ATTEMPTS;

        /**
         * @var boolean Show or hide error messages on screen
         */
        //protected static $SHOW_ERRORS = TRUE;

        //protected static $EXPIRE_TIME = EXPIRETIME;

        public static function init()
        {
            self::setDBName(DBNAME);
            self::setDBHost(DBHOST);
            self::setDBUser(DBUSER);
            self::setDBPassword(DBPASS);
            self::setDevelopmentMode(DEVMODE);
            self::setVersion(VERSION);
            self::setMaxLoginAttemptsPerHour(LOGINATTEMPTS);
        }

        public static function getVersion()
        {
            return self::$VERSION;
        }

        public static function getDBName()
        {
            return self::$DBNAME;
        }

        public static function getDBHost()
        {
            return self::$DBHOST;
        }

        public static function getDBUser()
        {
            return self::$DBUSER;
        }

        public static function getMaxLoginAttemptsPerHour()
        {
            return self::$LOGIN_ATTEMPTS;
        }

        public static function getDBPass()
        {
            return self::$DBPASS;
        }

        public static function getDevelopmentMode()
        {
            return self::$DEVELOPMENT_MODE;
        }

        private static function setDBName($DBNAME = null)
        {
            if (!is_null($DBNAME)) {
                self::$DBNAME = $DBNAME;

            }
        }

        private static function setDBHost($DBHOST = null)
        {
            if (!is_null($DBHOST)) {
                self::$DBHOST = $DBHOST;
            }
        }

        private static function setDBUser($DBUSER = null)
        {
            if (!is_null($DBUSER)) {
                self::$DBUSER = $DBUSER;
            }
        }

        private static function setDBPassword($DBPASS = null)
        {
            if (!is_null($DBPASS)) {
                self::$DBPASS = $DBPASS;
            }
        }

        private static function setDBPort($DBPORT = null)
        {
            if (!is_null($DBPORT)) {
                self::$DBPORT = $DBPORT;
            }
        }

        private static function setDevelopmentMode($development_mode = null)
        {
            if (!is_null($development_mode)) {
                self::$DEVELOPMENT_MODE = $development_mode;
            }
        }

        private static function setVersion($version = null)
        {
            if (!is_null($version)) {
                self::$VERSION = $version;
            }
        }

        private static function setMaxLoginAttemptsPerHour($attempts = null)
        {
            if (!is_null($attempts)) {
                self::$LOGIN_ATTEMPTS = $attempts;
            }
        }

    }
