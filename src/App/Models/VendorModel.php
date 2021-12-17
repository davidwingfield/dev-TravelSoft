<?php
    
    namespace Framework\App\Models;
    
    use Exception;
    use Framework\App\Controllers\Vendor;
    use Framework\Core\Model;
    use Framework\Logger\Log;
    
    /**
     * Short Vendor Description
     * Long Vendor Description
     *
     * @package            Framework\App
     * @subpackage         Models
     */
    class VendorModel extends Model
    {
        /**
         * @var string $selectQuery Select Query Template
         */
        protected static $selectQuery = "
            SELECT
                            COMPANY.id AS 'company_id',
                            COMPANY.name AS 'company_name',
                            COMPANY.phone_1 AS 'company_phone_1',
                            COMPANY.phone_2 AS 'company_phone_2',
                            COMPANY.fax AS 'company_fax',
                            COMPANY.website AS 'company_website',
                            COMPANY.email AS 'company_email',
                            COMPANY.enabled AS 'company_enabled',
                            COMPANY.created_by AS 'company_created_by',
                            COMPANY.date_created AS 'company_date_created',
                            COMPANY.modified_by AS 'company_modified_by',
                            COMPANY.date_modified AS 'company_date_modified',
                            COMPANY.status_id AS 'company_status_id',
                            COMPANY.note AS 'company_note',
                            COMPANY.logo AS 'company_logo',
                            COMPANY.description_short AS 'company_description_short',
                            COMPANY.description_long AS 'company_description_long',
                            COMPANY.keywords AS 'company_keywords',
                            VENDOR.id AS 'vendor_id',
                            VENDOR.company_id AS 'vendor_company_id',
                            VENDOR.status_id AS 'vendor_status_id',
                            VENDOR.sku AS 'vendor_sku',
                            VENDOR.show_online AS 'vendor_show_online',
                            VENDOR.show_sales AS 'vendor_show_sales',
                            VENDOR.show_ops AS 'vendor_show_ops',
                            VENDOR.is_provider AS 'vendor_is_provider',
                            VENDOR.date_created AS 'vendor_date_created',
                            VENDOR.created_by  AS 'vendor_created_by',
                            VENDOR.date_modified AS 'vendor_date_modified',
                            VENDOR.modified_by  AS 'vendor_modified_by',
                            VENDOR.enabled AS 'vendor_enabled',
                            VENDOR.note  AS 'vendor_note',
                            VENDOR.description_short AS 'vendor_description_short',
                            VENDOR.description_long AS 'vendor_description_long'
            FROM 			vendor VENDOR
            JOIN			company COMPANY ON COMPANY.id = VENDOR.company_id
           WHERE			COMPANY.enabled = 1
                
                ";
        
        protected static $dbTable = "vendor";
        
        protected static $dbFields = Array();
        
        /**
         * Gets vendor(s) by id
         * If id is passed then we search by it otherwise get all enabled
         *
         * @param int|null $id Provider Id
         *
         * @return array
         */
        public static function get(int $id = null): array
        {
            $where = "";
            $order = "ORDER BY VENDOR.id DESC";
            try {
                if (!is_null($id)) {
                    $where = " AND		VENDOR.id = $id
                   ";
                }
                $sql = self::$selectQuery . $where . " " . $order;
                
                return Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                Log::$debug_log->error($e->getMessage());
                
                return [];
            }
        }
        
        /**
         * Gets vendor(s) by id
         * If id is passed then we search by it otherwise get all enabled
         *
         * @param int|null $id Provider Id
         *
         * @return array
         */
        public static function getByName(string $name = null): array
        {
            $searchTerm = addslashes($name);
            
            try {
                $where = "
                    AND			COMPANY.name LIKE '$searchTerm'
                    ORDER BY    COMPANY.name ASC
                    ";
                $sql = self::$selectQuery . " " . $where;
                
                return Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                Log::$debug_log->trace($e);
                
                return [];
            }
        }
        
        public static function getOne(int $id = null): array
        {
            try {
                if (!is_null($id)) {
                    Model::$db->where("id", $id);
                }
                
                self::$db->where("enabled", 1);
                
                return self::$db->getOne(self::$dbTable);
            } catch (Exception $e) {
                return [];
            }
        }
        
        public static function updateRecord(array $vendor = []): array
        {
            if (!isset($vendor)) {
                return [];
            }
            
            try {
                $user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
                $vendor_id = Model::setInt((isset($vendor["id"])) ? $vendor["id"] : null);
                $company_id = Model::setInt((isset($vendor["company_id"])) ? $vendor["company_id"] : null);
                $status_id = Model::setInt((isset($vendor["status_id"])) ? $vendor["status_id"] : null);
                $show_online = Model::setBool((isset($vendor["show_online"])) ? $vendor["show_online"] : null);
                $show_sales = Model::setBool((isset($vendor["show_sales"])) ? $vendor["show_sales"] : null);
                $show_ops = Model::setBool((isset($vendor["show_ops"])) ? $vendor["show_ops"] : null);
                $is_provider = Model::setBool((isset($vendor["is_provider"])) ? $vendor["is_provider"] : null);
                $sku = Model::setString((isset($vendor["sku"])) ? $vendor["sku"] : null);
                $enabled = Model::setBool((isset($vendor["enabled"])) ? $vendor["enabled"] : null);
                $note = Model::setLongText((isset($vendor["note"])) ? $vendor["note"] : null);
                $created_by = Model::setInt($user_id);
                $modified_by = Model::setInt($user_id);
                $sql = "
                    INSERT INTO vendor (
                        id, company_id, status_id, show_online,
                        show_sales, show_ops, is_provider, sku,
                        enabled, date_created, created_by, date_modified,
                        modified_by, note
                    )
                    VALUES
                    (
                        $vendor_id, $company_id, $status_id, $show_online,
                        $show_sales, $show_ops, $is_provider, $sku,
                        $enabled, CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP,
                        $modified_by, $note
                    )
                    ON DUPLICATE KEY UPDATE
                        status_id = VALUES(status_id),
                        show_online = VALUES(show_online),
                        show_sales = VALUES(show_sales),
                        show_ops = VALUES(show_ops),
                        is_provider = VALUES(is_provider),
                        sku = VALUES(sku),
                        note = VALUES(note),
                        modified_by = VALUES(modified_by),
                        date_modified = VALUES(date_modified),
                        enabled = VALUES(enabled)
                    ";
//                Log::$debug_log->trace($sql);
                Model::$db->rawQuery($sql);
                $vendor_id = Model::$db->getInsertId();
//                Log::$debug_log->trace(Model::$db->getInsertId());
                if ($vendor_id) {
                    $sku = Vendor::generateSKU(array(
                        "company_name" => $vendor["name"],
                        "vendor_id" => $vendor_id,
                    ));
                    
                    $update = "
                            UPDATE      vendor
                            SET         sku = '$sku'
                            WHERE       id = $vendor_id;
                        ";
                    
                    try {
                        Model::$db->rawQuery($update);
                        
                        return self::get((int)$vendor_id);
                    } catch (Exception $ex) {
                        Log::$debug_log->error($ex);
                        
                        return [];
                    }
                } else {
                    Log::$debug_log->info("Vendor Id Missing");
                    
                    return [];
                }
            } catch (Exception $e) {
                Log::$debug_log->error($e);
                
                return [];
            }
            
        }
        
        public static function vendor_ac(string $st = ""): array
        {
            try {
                $searchTerm = addslashes($st);
                $sql = self::$selectQuery . "
                    AND			COMPANY.name LIKE '%$searchTerm%'
                    ORDER BY    LENGTH(COMPANY.name), CAST(COMPANY.name AS UNSIGNED), COMPANY.name ASC
                    LIMIT 20;";
                
                //  Log::$debug_log->trace($sql);
                
                return Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                Log::$debug_log->error($e);
                
                return [];
            }
        }
        
    }
