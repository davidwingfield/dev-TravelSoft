<?php

    namespace Framework\App\Models;

    use Exception;
    use Framework\Core\Model;
    use Framework\Logger\Log;

    /**
     * Short PackageModel Description
     *
     * Long PackageModel Description
     *
     * @package            Framework\App
     * @subpackage         Models
     */
    class PackageModel extends Model
    {
        protected static $dbTable = "package";

        protected static $id;

        protected static $name;

        protected static $day_span;

        protected static $city_id;

        protected static $min_pax;

        protected static $max_pax;

        protected static $description_long;

        protected static $description_short;

        protected static $available_start;

        protected static $available_end;

        protected static $cost;

        protected static $price;

        protected static $margin;

        protected static $enabled;

        protected static $date_created;

        protected static $created_by;

        protected static $date_modified;

        protected static $modified_by;

        protected static $note;

        public static function get_id()
        {
            return self::$id;
        }

        public static function get_name()
        {
            return self::$name;
        }

        public static function get_day_span()
        {
            return self::$day_span;
        }

        public static function get_city_id()
        {
            return self::$city_id;
        }

        public static function get_min_pax()
        {
            return self::$min_pax;
        }

        public static function get_max_pax()
        {
            return self::$max_pax;
        }

        public static function get_description_long()
        {
            return self::$description_long;
        }

        public static function get_description_short()
        {
            return self::$description_short;
        }

        public static function get_available_start()
        {
            return self::$available_start;
        }

        public static function get_available_end()
        {
            return self::$available_end;
        }

        public static function get_cost()
        {
            return self::$cost;
        }

        public static function get_price()
        {
            return self::$price;
        }

        public static function get_margin()
        {
            return self::$margin;
        }

        public static function get_enabled()
        {
            return self::$enabled;
        }

        public static function get_date_created()
        {
            return self::$date_created;
        }

        public static function get_created_by()
        {
            return self::$created_by;
        }

        public static function get_date_modified()
        {
            return self::$date_modified;
        }

        public static function get_modified_by()
        {
            return self::$modified_by;
        }

        public static function get_note()
        {
            return self::$note;
        }

        protected static function set_id($val)
        {
            self::$id = $val;
        }

        protected static function set_name($val)
        {
            self::$name = $val;
        }

        protected static function set_day_span($val)
        {
            self::$day_span = $val;
        }

        protected static function set_city_id($val)
        {
            self::$city_id = $val;
        }

        protected static function set_min_pax($val)
        {
            self::$min_pax = $val;
        }

        protected static function set_max_pax($val)
        {
            self::$max_pax = $val;
        }

        protected static function set_description_long($val)
        {
            self::$description_long = $val;
        }

        protected static function set_description_short($val)
        {
            self::$description_short = $val;
        }

        protected static function set_available_start($val)
        {
            self::$available_start = $val;
        }

        protected static function set_available_end($val)
        {
            self::$available_end = $val;
        }

        protected static function set_cost($val)
        {
            self::$cost = $val;
        }

        protected static function set_price($val)
        {
            self::$price = $val;
        }

        protected static function set_margin($val)
        {
            self::$margin = $val;
        }

        protected static function set_enabled($val)
        {
            self::$enabled = $val;
        }

        protected static function set_date_created($val)
        {
            self::$date_created = $val;
        }

        protected static function set_created_by($val)
        {
            self::$created_by = $val;
        }

        protected static function set_date_modified($val)
        {
            self::$date_modified = $val;
        }

        protected static function set_modified_by($val)
        {
            self::$modified_by = $val;
        }

        protected static function set_note($val)
        {
            self::$note = $val;
        }

        /**
         * fetch object values
         */
        public static function get(int $id = null): array
        {
            $packages = array();
            try {
                $sql = "SELECT
					PACKAGE.id AS 'package_id',
					PACKAGE.name AS 'package_name',
					PACKAGE.day_span AS 'package_day_span',
					PACKAGE.city_id AS 'package_city_id',
					PACKAGE.min_pax AS 'package_min_pax',
					PACKAGE.max_pax AS 'package_max_pax',
					PACKAGE.description_long AS 'package_description_long',
					PACKAGE.description_short AS 'package_description_short',
					PACKAGE.available_start AS 'package_available_start',
					PACKAGE.available_end AS 'package_available_end',
					PACKAGE.cost AS 'package_cost',
					PACKAGE.price AS 'package_price',
					PACKAGE.margin AS 'package_margin',
					PACKAGE.enabled AS 'package_enabled',
					PACKAGE.date_created AS 'package_date_created',
					PACKAGE.created_by AS 'package_created_by',
					PACKAGE.date_modified AS 'package_date_modified',
					PACKAGE.modified_by AS 'package_modified_by',
					PACKAGE.note AS 'package_note' 
        FROM		package AS PACKAGE;";
                Log::$debug_log->trace($sql);
                $packages = Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                Log::$debug_log->error($e);
            }

            return $packages;
        }

    }
