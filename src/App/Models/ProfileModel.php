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
				PRODUCT_PROFILE.product_id AS 'product_profile_product_id',
				PRODUCT_PROFILE.profile_id AS 'product_profile_profile_id',
				PRODUCT_PROFILE.enabled AS 'product_profile_enabled',
				PRODUCT_PROFILE.date_created AS 'product_profile_date_created',
				PRODUCT_PROFILE.created_by AS 'product_profile_created_by',
				PRODUCT_PROFILE.date_modified AS 'product_profile_date_modified',
				PRODUCT_PROFILE.modified_by AS 'product_profile_modified_by',
				PRODUCT_PROFILE.note AS 'product_profile_note',
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
		FROM 	product_profile PRODUCT_PROFILE
		LEFT JOIN 	profile PROFILE ON PROFILE.id = PRODUCT_PROFILE.profile_id
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
                $where = "WHERE	PRODUCT_PROFILE.product_id = $product_id";
            }
            
            try {
                $sql = self::$sql . $where;
                Log::$debug_log->trace($sql);
                
                return Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                Log::$debug_log->error($e);
                
                return [];
            }
        }
        
    }
