<?php
    
    namespace Framework\App\Models;
    
    use Exception;
    use Framework\Core\Model;
    use Framework\Logger\Log;
    
    /**
     * Short ProfileModel Description
     * Long ProfileModel Description
     *
     * @package            Framework\App
     * @subpackage         Models
     */
    class ProfileModel extends Model
    {
        protected static $dbTable = "profile";
        protected static $dbFields = Array();
        protected static $sql = "
		SELECT
				PROFILE.id AS 'profile_id',
				PROFILE.allot_by_id AS 'profile_allot_by_id',
		       PROFILE.product_id AS 'profile_product_id',
				PROFILE.sales_types_id AS 'profile_sales_types_id',
				PROFILE.name AS 'profile_name',
				PROFILE.quantity AS 'profile_quantity',
				PROFILE.expires AS 'profile_expires',
				PROFILE.transfer_sales_types_id AS 'profile_transfer_sales_types_id',
				PROFILE.release_amt AS 'profile_release_amt',
				PROFILE.min_length_days AS 'profile_min_length_days',
				PROFILE.checkin_dow AS 'profile_checkin_dow',
				PROFILE.checkout_dow AS 'profile_checkout_dow',
				PROFILE.departure_dow AS 'profile_departure_dow',
				PROFILE.return_dow AS 'profile_return_dow',
				PROFILE.inc_days_dow AS 'profile_inc_days_dow',
				PROFILE.min_duration AS 'profile_min_duration',
				PROFILE.max_duration AS 'profile_max_duration',
				PROFILE.equal_duration AS 'profile_equal_duration',
				PROFILE.advanced_booking_min AS 'profile_advanced_booking_min',
				PROFILE.advanced_booking_max AS 'profile_advanced_booking_max',
				PROFILE.advanced_booking_date AS 'profile_advanced_booking_date',
				PROFILE.weekday_dow AS 'profile_weekday_dow',
				PROFILE.days_out AS 'profile_days_out',
				PROFILE.enabled AS 'profile_enabled',
				PROFILE.date_created AS 'profile_date_created',
				PROFILE.created_by AS 'profile_created_by',
				PROFILE.date_modified AS 'profile_date_modified',
				PROFILE.modified_by AS 'profile_modified_by',
				PROFILE.note AS 'profile_note',
				ALLOT_BY.id AS 'allot_by_id',
				ALLOT_BY.name AS 'allot_by_name',
				ALLOT_BY.sort_order AS 'allot_by_sort_order',
				ALLOT_BY.enabled AS 'allot_by_enabled',
				ALLOT_BY.date_created AS 'allot_by_date_created',
				ALLOT_BY.created_by AS 'allot_by_created_by',
				ALLOT_BY.date_modified AS 'allot_by_date_modified',
				ALLOT_BY.modified_by AS 'allot_by_modified_by',
				ALLOT_BY.note AS 'allot_by_note',
				SALES_TYPES.id AS 'sales_types_id',
				SALES_TYPES.name AS 'sales_types_name',
				SALES_TYPES.class AS 'sales_types_class',
				SALES_TYPES.sort_order AS 'sales_types_sort_order',
				SALES_TYPES.enabled AS 'sales_types_enabled',
				SALES_TYPES.date_created AS 'sales_types_date_created',
				SALES_TYPES.created_by AS 'sales_types_created_by',
				SALES_TYPES.date_modified AS 'sales_types_date_modified',
				SALES_TYPES.modified_by AS 'sales_types_modified_by',
				SALES_TYPES.note AS 'sales_types_note',
				SALES_TYPES_TRANSFER.id AS 'sales_types_transfer_id',
				SALES_TYPES_TRANSFER.name AS 'sales_types_transfer_name',
				SALES_TYPES_TRANSFER.class AS 'sales_types_transfer_class',
				SALES_TYPES_TRANSFER.sort_order AS 'sales_types_transfer_sort_order',
				SALES_TYPES_TRANSFER.enabled AS 'sales_types_transfer_enabled',
				SALES_TYPES_TRANSFER.date_created AS 'sales_types_transfer_date_created',
				SALES_TYPES_TRANSFER.created_by AS 'sales_types_transfer_created_by',
				SALES_TYPES_TRANSFER.date_modified AS 'sales_types_transfer_date_modified',
				SALES_TYPES_TRANSFER.modified_by AS 'sales_types_transfer_modified_by',
				SALES_TYPES_TRANSFER.note AS 'sales_types_transfer_note'
		FROM 	profile PROFILE
		LEFT JOIN 	allot_by ALLOT_BY ON ALLOT_BY.id = PROFILE.allot_by_id
		LEFT JOIN 	sales_types SALES_TYPES ON SALES_TYPES.id = PROFILE.sales_types_id
		LEFT JOIN 	sales_types SALES_TYPES_TRANSFER ON SALES_TYPES_TRANSFER.id = PROFILE.transfer_sales_types_id
		";
        
        protected static $base_sql = "
		SELECT
				PROFILE.id AS 'profile_id',
				PROFILE.allot_by_id AS 'profile_allot_by_id',
				PROFILE.sales_types_id AS 'profile_sales_types_id',
				PROFILE.name AS 'profile_name',
				PROFILE.quantity AS 'profile_quantity',
				PROFILE.expires AS 'profile_expires',
				PROFILE.transfer_sales_types_id AS 'profile_transfer_sales_types_id',
				PROFILE.release_amt AS 'profile_release_amt',
				PROFILE.min_length_days AS 'profile_min_length_days',
				PROFILE.checkin_dow AS 'profile_checkin_dow',
				PROFILE.checkout_dow AS 'profile_checkout_dow',
				PROFILE.departure_dow AS 'profile_departure_dow',
				PROFILE.return_dow AS 'profile_return_dow',
				PROFILE.inc_days_dow AS 'profile_inc_days_dow',
				PROFILE.min_duration AS 'profile_min_duration',
				PROFILE.max_duration AS 'profile_max_duration',
				PROFILE.equal_duration AS 'profile_equal_duration',
				PROFILE.advanced_booking_min AS 'profile_advanced_booking_min',
				PROFILE.advanced_booking_max AS 'profile_advanced_booking_max',
				PROFILE.advanced_booking_date AS 'profile_advanced_booking_date',
				PROFILE.weekday_dow AS 'profile_weekday_dow',
				PROFILE.days_out AS 'profile_days_out',
				PROFILE.enabled AS 'profile_enabled',
				PROFILE.date_created AS 'profile_date_created',
				PROFILE.created_by AS 'profile_created_by',
				PROFILE.date_modified AS 'profile_date_modified',
				PROFILE.modified_by AS 'profile_modified_by',
				PROFILE.note AS 'profile_note',
		  
				ALLOT_BY.id AS 'allot_by_id',
				ALLOT_BY.name AS 'allot_by_name',
				ALLOT_BY.sort_order AS 'allot_by_sort_order',
				ALLOT_BY.enabled AS 'allot_by_enabled',
				ALLOT_BY.date_created AS 'allot_by_date_created',
				ALLOT_BY.created_by AS 'allot_by_created_by',
				ALLOT_BY.date_modified AS 'allot_by_date_modified',
				ALLOT_BY.modified_by AS 'allot_by_modified_by',
				ALLOT_BY.note AS 'allot_by_note',
		  
				SALES_TYPES.id AS 'sales_types_id',
				SALES_TYPES.name AS 'sales_types_name',
				SALES_TYPES.class AS 'sales_types_class',
				SALES_TYPES.sort_order AS 'sales_types_sort_order',
				SALES_TYPES.enabled AS 'sales_types_enabled',
				SALES_TYPES.date_created AS 'sales_types_date_created',
				SALES_TYPES.created_by AS 'sales_types_created_by',
				SALES_TYPES.date_modified AS 'sales_types_date_modified',
				SALES_TYPES.modified_by AS 'sales_types_modified_by',
				SALES_TYPES.note AS 'sales_types_note',
		  
				SALES_TYPES_TRANSFER.id AS 'sales_types_transfer_id',
				SALES_TYPES_TRANSFER.name AS 'sales_types_transfer_name',
				SALES_TYPES_TRANSFER.class AS 'sales_types_transfer_class',
				SALES_TYPES_TRANSFER.sort_order AS 'sales_types_transfer_sort_order',
				SALES_TYPES_TRANSFER.enabled AS 'sales_types_transfer_enabled',
				SALES_TYPES_TRANSFER.date_created AS 'sales_types_transfer_date_created',
				SALES_TYPES_TRANSFER.created_by AS 'sales_types_transfer_created_by',
				SALES_TYPES_TRANSFER.date_modified AS 'sales_types_transfer_date_modified',
				SALES_TYPES_TRANSFER.modified_by AS 'sales_types_transfer_modified_by',
				SALES_TYPES_TRANSFER.note AS 'sales_types_transfer_note'
		FROM 	profile PROFILE
		LEFT JOIN 	allot_by ALLOT_BY ON ALLOT_BY.id = PROFILE.allot_by_id
		LEFT JOIN 	sales_types SALES_TYPES ON SALES_TYPES.id = PROFILE.sales_types_id
		LEFT JOIN 	sales_types SALES_TYPES_TRANSFER ON SALES_TYPES_TRANSFER.id = PROFILE.transfer_sales_types_id
		";
        
        public static function get(int $id = null): array
        {
            
            $where = "";
            if (!is_null($id)) {
                $where = "WHERE PROFILE.id = $id";
            }
            
            try {
                $sql = self::$base_sql . $where;
                
                return Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                Log::$debug_log->error($e);
                
                return [];
            }
        }
        
        public static function fetchProfilesByProductId(int $product_id = null): array
        {
            $where = "";
            if (!is_null($product_id)) {
                $where = "WHERE	PROFILE.product_id = $product_id";
            }
            
            try {
                
                $sql = self::$sql . $where;
                
                return Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                Log::$debug_log->error($e);
                
                return [];
            }
        }
        
        public static function fetchProfileByProfileId(int $profile_id = null): array
        {
            $where = "";
            if (!is_null($profile_id)) {
                $where = "WHERE	PROFILE.id = $profile_id";
            } else {
                return [];
            }
            
            try {
                
                $sql = self::$sql . $where;
                
                return Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                Log::$debug_log->error($e);
                
                return [];
            }
        }
        
        public static function fetchProfilesByByNameAndProductId(string $name = null, int $product_id = null): array
        {
            $where = [];
            if (!is_null($name)) {
                $where[] = "PROFILE.name = '$name'";
            }
            if (!is_null($product_id)) {
                $where[] = "PROFILE.product_id = $product_id";
            }
            $whereExpr = "";
            if (count($where) > 0) {
                $whereExpr = "WHERE " . implode(" AND ", $where);
            }
            
            try {
                
                $sql = self::$sql . $whereExpr;
                
                return Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                Log::$debug_log->error($e);
                
                return [];
            }
        }
        
        public static function profile_ac(string $st = "", int $product_id = null): array
        {
            try {
                $searchTerm = addslashes($st);
                $and = "";
                if ($product_id !== null) {
                    $and = "	AND			PROFILE.product_id = $product_id";
                }
                
                $sql = self::$sql . "
                    WHERE			PROFILE.name LIKE '%$searchTerm%'
                    $and
                    ORDER BY    LENGTH(PROFILE.name), CAST(PROFILE.name AS UNSIGNED), PROFILE.name ASC
                    LIMIT 20;";
                Log::$debug_log->trace($sql);
                
                return Model::$db->rawQuery($sql);
                
            } catch (Exception $e) {
                Log::$debug_log->error($e);
                
                return [];
            }
        }
        
        public static function updateRecord(array $profile = null): array
        {
            $user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
            $created_by = Model::setInt($user_id);
            $modified_by = Model::setInt($user_id);
            
            $id = Model::setInt((isset($profile["id"])) ? $profile["id"] : null);
            $allot_by_id = Model::setInt((isset($profile["allot_by_id"])) ? $profile["allot_by_id"] : 3);
            $sales_types_id = Model::setInt((isset($profile["sales_types_id"])) ? $profile["sales_types_id"] : null);
            $transfer_sales_types_id = Model::setInt((isset($profile["transfer_sales_types_id"])) ? $profile["transfer_sales_types_id"] : null);
            $product_id = Model::setInt((isset($profile["product_id"])) ? $profile["product_id"] : null);
            
            $quantity = Model::setInt((isset($profile["quantity"])) ? $profile["quantity"] : null);
            $days_out = Model::setInt((isset($profile["days_out"])) ? $profile["days_out"] : null);
            $release_amt = Model::setInt((isset($profile["release_amt"])) ? $profile["release_amt"] : null);
            $min_length_days = Model::setInt((isset($profile["min_length_days"])) ? $profile["min_length_days"] : 1);
            $min_duration = Model::setInt((isset($profile["min_duration"])) ? $profile["min_duration"] : 1);
            $max_duration = Model::setInt((isset($profile["max_duration"])) ? $profile["max_duration"] : null);
            $equal_duration = Model::setInt((isset($profile["equal_duration"])) ? $profile["equal_duration"] : null);
            $advanced_booking_min = Model::setInt((isset($profile["advanced_booking_min"])) ? $profile["advanced_booking_min"] : null);
            $advanced_booking_max = Model::setInt((isset($profile["advanced_booking_max"])) ? $profile["advanced_booking_max"] : null);
            
            $advanced_booking_date = Model::setString((isset($profile["advanced_booking_date"])) ? $profile["advanced_booking_date"] : null);
            $name = Model::setString((isset($profile["name"])) ? $profile["name"] : null);
            $expires = Model::setString((isset($profile["expires"])) ? str_replace(" ", "", str_replace("-", "-", trim($profile["expires"]))) : null);
            $checkin_dow = Model::setString((isset($profile["checkin_dow"])) ? $profile["checkin_dow"] : "0,1,2,3,4,5,6");
            $checkout_dow = Model::setString((isset($profile["checkout_dow"])) ? $profile["checkout_dow"] : "0,1,2,3,4,5,6");
            $departure_dow = Model::setString((isset($profile["departure_dow"])) ? $profile["departure_dow"] : "0,1,2,3,4,5,6");
            $weekday_dow = Model::setString((isset($profile["weekday_dow"])) ? $profile["weekday_dow"] : "0,1,2,3,4,5,6");
            $return_dow = Model::setString((isset($profile["return_dow"])) ? $profile["return_dow"] : "0,1,2,3,4,5,6");
            $inc_days_dow = Model::setString((isset($profile["inc_days_dow"])) ? $profile["inc_days_dow"] : "0,1,2,3,4,5,6");
            
            $description_short = Model::setString((isset($profile["description_short"])) ? $profile["description_short"] : null);
            $enabled = Model::setBool((isset($profile["enabled"])) ? $profile["enabled"] : null);
            $note = Model::setLongText((isset($profile["note"])) ? $profile["note"] : null);
            $description_long = Model::setLongText((isset($profile["description_long"])) ? $profile["description_long"] : null);
            
            $sql = "
            INSERT INTO profile (
                id, allot_by_id, sales_types_id, product_id, name, quantity,
                expires, days_out, transfer_sales_types_id, release_amt, min_length_days, checkin_dow,
                checkout_dow, departure_dow, return_dow, inc_days_dow, min_duration, max_duration,
                equal_duration, advanced_booking_min, advanced_booking_max, advanced_booking_date, weekday_dow, enabled,
                date_created, created_by, date_modified, modified_by, note
            ) VALUES (
                $id, $allot_by_id, $sales_types_id, $product_id, $name, $quantity,
                $expires, $days_out, $transfer_sales_types_id, $release_amt, $min_length_days, $checkin_dow,
                $checkout_dow, $departure_dow, $return_dow, $inc_days_dow, $min_duration, $max_duration,
                $equal_duration, $advanced_booking_min, $advanced_booking_max, $advanced_booking_date, $weekday_dow, $enabled,
                CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP, $modified_by, $note
            )
            ON DUPLICATE KEY UPDATE
                quantity = VALUES(quantity),
                name = VALUES(name),
                expires = VALUES(expires),
                days_out = VALUES(days_out),
                transfer_sales_types_id = VALUES(transfer_sales_types_id),
                release_amt = VALUES(release_amt),
                min_length_days = VALUES(min_length_days),
                checkin_dow = VALUES(checkin_dow),
                checkout_dow = VALUES(checkout_dow),
                departure_dow = VALUES(departure_dow),
                return_dow = VALUES(return_dow),
                inc_days_dow = VALUES(inc_days_dow),
                min_duration = VALUES(min_duration),
                max_duration = VALUES(max_duration),
                equal_duration = VALUES(equal_duration),
                advanced_booking_min = VALUES(advanced_booking_min),
                advanced_booking_max = VALUES(advanced_booking_max),
                advanced_booking_date = VALUES(advanced_booking_date),
                weekday_dow = VALUES(weekday_dow),
                note = VALUES(note),
                modified_by = VALUES(modified_by),
                date_modified = VALUES(date_modified),
                enabled = VALUES(enabled)
            ";
            
            try {
                //Log::$debug_log->trace($sql);
                Model::$db->rawQuery($sql);
                $profile_id = Model::$db->getInsertId();
                if ($profile_id) {
                    $profile_id = (int)$profile_id;
                    
                    return self::fetchProfileByProfileId($profile_id);
                } else {
                    Log::$debug_log->error("Profile Id Not Generated");
                    
                    return [];
                }
            } catch (Exception $e) {
                Log::$debug_log->error($e);
                
                return [];
            }
            
        }
        
    }
