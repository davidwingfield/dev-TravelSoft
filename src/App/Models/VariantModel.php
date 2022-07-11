<?php
	
	namespace Framework\App\Models;
	
	use Exception;
	use Framework\Core\Model;
	use Framework\Logger\Log;
	
	/**
	 * Short VariantModel Description
	 * Long VariantModel Description
	 *
	 * @package            Framework\App
	 * @subpackage         Models
	 */
	class VariantModel extends Model
	{
		
		protected static $dbTable = "variant";
		protected static $dbFields = Array();
		protected static $selectQuery = "
                SELECT
                        VARIANT.id AS 'variant_id',
                        VARIANT.category_id AS 'variant_category_id',
                        VARIANT.code AS 'variant_code',
                        VARIANT.name AS 'variant_name',
                        VARIANT.enabled AS 'variant_enabled',
                        VARIANT.date_created AS 'variant_date_created',
                        VARIANT.created_by AS 'variant_created_by',
                        VARIANT.date_modified AS 'variant_date_modified',
                        VARIANT.modified_by AS 'variant_modified_by',
                        VARIANT.note AS 'variant_note'
                FROM 	variant VARIANT
                WHERE   VARIANT.enabled = 1
        ";
		protected static $orderByCondition = "
			ORDER BY    LENGTH(VARIANT.name), CAST(VARIANT.name AS UNSIGNED), VARIANT.name ASC
		";
		protected static $limitCondition = "
			LIMIT 20
		";
		
		public static function get(int $id = null): array
		{
			
			try {
				if (!is_null($id)) {
					Model::$db->where("id", $id);
				}
				
				self::$db->where("enabled", 1);
				
				return self::$db->get(self::$dbTable);
			} catch (Exception $e) {
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
		
		public static function update(array $params = []): array
		{
			$id = 1;
			
			return self::get($id);
		}
		
		public static function getByName(string $name = null, int $category_id = null): array
		{
			if (is_null($name)) {
				Log::$debug_log->error("Missing Name");
				
				return [];
			}
			
			if (is_null($category_id)) {
				Log::$debug_log->error("Missing Category Id");
				
				return [];
			}
			
			$sql = self::$selectQuery . "
                    AND			VARIANT.name = '$name'
                    AND         VARIANT.category_id = $category_id
                    ORDER BY    LENGTH(VARIANT.name), CAST(VARIANT.name AS UNSIGNED), VARIANT.name ASC
                    LIMIT 20;";
			try {
				
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
		}
		
		public static function fetchByVariantId(int $variant_id = null, int $category_id = null): array
		{
			if (is_null($variant_id)) {
				Log::$debug_log->error("Missing Variant Id");
				
				return [];
			}
			
			if (is_null($category_id)) {
				Log::$debug_log->error("Missing Category Id");
				
				return [];
			}
			
			$sql = self::$selectQuery . "
                    AND			VARIANT.id = $variant_id
                    AND         VARIANT.category_id = $category_id
                    ORDER BY    LENGTH(VARIANT.name), CAST(VARIANT.name AS UNSIGNED), VARIANT.name ASC
                    " . self::$limitCondition;
			try {
				
				return Model::$db->rawQuery($sql);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
		}
		
		public static function getByProductId(int $product_id = null): array
		{
			if (is_null($product_id)) {
				return [];
			}
			
			$sql = "
                SELECT
                        VARIANT.id AS 'variant_id',
                        VARIANT.category_id AS 'variant_category_id',
                        VARIANT.code AS 'variant_code',
                        VARIANT.name AS 'variant_name',
                        VARIANT.enabled AS 'variant_enabled',
                        VARIANT.date_created AS 'variant_date_created',
                        VARIANT.created_by AS 'variant_created_by',
                        VARIANT.date_modified AS 'variant_date_modified',
                        VARIANT.modified_by AS 'variant_modified_by',
                        VARIANT.note AS 'variant_note',
                        PRODUCT_VARIANT.used_in_pricing AS 'product_variant_used_in_pricing',
                        PRODUCT_VARIANT.product_id AS 'product_variant_product_id',
                        PRODUCT_VARIANT.variant_id AS 'product_variant_variant_id',
                        COALESCE(PRODUCT_VARIANT.min_age, '0') AS 'product_variant_min_age',
                        COALESCE(PRODUCT_VARIANT.max_age, '&#8734;') AS 'product_variant_max_age',
                        PRODUCT_VARIANT.enabled AS 'product_variant_enabled',
                        PRODUCT_VARIANT.date_created AS 'product_variant_date_created',
                        PRODUCT_VARIANT.created_by AS 'product_variant_created_by',
                        PRODUCT_VARIANT.date_modified AS 'product_variant_date_modified',
                        PRODUCT_VARIANT.modified_by AS 'product_variant_modified_by',
                        PRODUCT_VARIANT.note AS 'product_variant_note'
                FROM 	variant VARIANT
                JOIN 	product_variant PRODUCT_VARIANT ON PRODUCT_VARIANT.variant_id = VARIANT.id
                WHERE   PRODUCT_VARIANT.product_id = $product_id
            ";
			try {
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
		}
		
		public static function variant_ac(string $st = "", int $category_id = null): array
		{
			if (is_null($category_id)) {
				return [];
			}
			$sql = self::$selectQuery . "
                    AND			VARIANT.name LIKE '%$searchTerm%'
                    AND         VARIANT.category_id = $category_id
                    ORDER BY    LENGTH(VARIANT.name), CAST(VARIANT.name AS UNSIGNED), VARIANT.name ASC
                    LIMIT 20;";
			try {
				$searchTerm = addslashes($st);
				
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
		}
		
		public static function getByVariantIdAndProductId(int $variant_id = null, int $product_id = null): array
		{
			if (is_null($product_id) || is_null($variant_id)) {
				return [];
			}
			
			$sql = "
                SELECT
                        VARIANT.id AS 'variant_id',
                        VARIANT.category_id AS 'variant_category_id',
                        VARIANT.code AS 'variant_code',
                        VARIANT.name AS 'variant_name',
                        VARIANT.enabled AS 'variant_enabled',
                        VARIANT.date_created AS 'variant_date_created',
                        VARIANT.created_by AS 'variant_created_by',
                        VARIANT.date_modified AS 'variant_date_modified',
                        VARIANT.modified_by AS 'variant_modified_by',
                        VARIANT.note AS 'variant_note',
                        PRODUCT_VARIANT.used_in_pricing AS 'product_variant_used_in_pricing',
                        PRODUCT_VARIANT.product_id AS 'product_variant_product_id',
                        PRODUCT_VARIANT.variant_id AS 'product_variant_variant_id',
                        COALESCE(PRODUCT_VARIANT.min_age, '0') AS 'product_variant_min_age',
                        COALESCE(PRODUCT_VARIANT.max_age, '&#8734;') AS 'product_variant_max_age',
                        PRODUCT_VARIANT.enabled AS 'product_variant_enabled',
                        PRODUCT_VARIANT.used_in_pricing AS 'product_variant_used_in_pricing',
                        PRODUCT_VARIANT.date_created AS 'product_variant_date_created',
                        PRODUCT_VARIANT.created_by AS 'product_variant_created_by',
                        PRODUCT_VARIANT.date_modified AS 'product_variant_date_modified',
                        PRODUCT_VARIANT.modified_by AS 'product_variant_modified_by',
                        PRODUCT_VARIANT.note AS 'product_variant_note'
                FROM 	variant VARIANT
                JOIN 	product_variant PRODUCT_VARIANT ON PRODUCT_VARIANT.variant_id = VARIANT.id
                WHERE   PRODUCT_VARIANT.product_id = $product_id
                    AND PRODUCT_VARIANT.variant_id = $variant_id";
			try {
				
				return Model::$db->rawQuery($sql);
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
		}
		
		public static function insertVariant(array $variant = null): array
		{
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			$id = Model::setInt((isset($variant["id"])) ? $variant["id"] : null);
			$category_id = Model::setInt((isset($variant["category_id"])) ? $variant["category_id"] : null);
			$product_id = Model::setInt((isset($variant["product_id"])) ? $variant["product_id"] : null);
			
			$min_age = Model::setInt((isset($variant["min_age"])) ? $variant["min_age"] : null);
			$max_age = Model::setInt((isset($variant["max_age"])) ? $variant["max_age"] : null);
			
			$name = Model::setString((isset($variant["name"])) ? $variant["name"] : null);
			$code = Model::setString((isset($variant["code"])) ? $variant["code"] : null);
			
			$enabled = Model::setBool((isset($variant["enabled"])) ? $variant["enabled"] : null);
			$used_in_pricing = Model::setBool((isset($variant["used_in_pricing"])) ? $variant["used_in_pricing"] : 1);
			
			$note = Model::setLongText((isset($variant["note"])) ? $variant["note"] : null);
			
			$sql = "
                INSERT INTO variant (
                    id, category_id, code, name,
                    enabled, date_created, created_by, date_modified,
                    modified_by, note
                ) VALUES (
                    $id, $category_id, $code, $name,
                    $enabled, CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP,
                    $modified_by, $note
                )
                ON DUPLICATE KEY UPDATE
                    code = VALUES(code),
                    name = VALUES(name),
                    note = VALUES(note),
                    modified_by = VALUES(modified_by),
                    date_modified = VALUES(date_modified),
                    enabled = VALUES(enabled)
            ";
			
			try {
				
				Model::$db->rawQuery($sql);
				$variant_id = Model::$db->getInsertId();
				
				return self::fetchByVariantId($variant_id, $category_id);
				
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				Log::$debug_log->info($sql);
				
				return [];
			}
		}
		
		public static function updateRecord(array $variant = null): array
		{
			$user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
			$created_by = Model::setInt($user_id);
			$modified_by = Model::setInt($user_id);
			
			$id = Model::setInt((isset($variant["id"])) ? $variant["id"] : null);
			$category_id = Model::setInt((isset($variant["category_id"])) ? $variant["category_id"] : null);
			$product_id = Model::setInt((isset($variant["product_id"])) ? $variant["product_id"] : null);
			
			$min_age = Model::setInt((isset($variant["min_age"])) ? $variant["min_age"] : null);
			$max_age = Model::setInt((isset($variant["max_age"])) ? $variant["max_age"] : null);
			
			$name = Model::setString((isset($variant["name"])) ? $variant["name"] : null);
			$code = Model::setString((isset($variant["code"])) ? $variant["code"] : null);
			
			$enabled = Model::setBool((isset($variant["enabled"])) ? $variant["enabled"] : null);
			$used_in_pricing = Model::setBool((isset($variant["used_in_pricing"])) ? $variant["used_in_pricing"] : 1);
			
			$note = Model::setLongText((isset($variant["note"])) ? $variant["note"] : null);
			
			$sql = "
                INSERT INTO variant (
                    id, category_id, code, name,
                    enabled, date_created, created_by, date_modified,
                    modified_by, note
                ) VALUES (
                    $id, $category_id, $code, $name,
                    $enabled, CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP,
                    $modified_by, $note
                )
                ON DUPLICATE KEY UPDATE
                    code = VALUES(code),
                    name = VALUES(name),
                    note = VALUES(note),
                    modified_by = VALUES(modified_by),
                    date_modified = VALUES(date_modified),
                    enabled = VALUES(enabled)
            ";
			
			try {
				//Log::$debug_log->trace($sql);
				Model::$db->rawQuery($sql);
				$variant_id = Model::$db->getInsertId();
				if ($variant_id) {
					$variant_id = (int)$variant_id;
					$variantCode = addslashes(buildCode($variant_id, $name, "variant"));
					
					$update = "
                        UPDATE      variant
                        SET         code = '$variantCode'
                        WHERE       id = $variant_id;";
					try {
						Model::$db->rawQuery($update);
						
						try {
							$product_variant_sql = "
                                INSERT INTO product_variant (
                                    product_id, variant_id, min_age, max_age, used_in_pricing,
                                    enabled, date_created, created_by, date_modified,
                                    modified_by, note
                                ) VALUES (
                                    $product_id, $variant_id, $min_age, $max_age, $used_in_pricing,
                                    $enabled, CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP,
                                    $modified_by, $note
                                )
                                ON DUPLICATE KEY UPDATE
                                    min_age = VALUES(min_age),
                                    max_age = VALUES(max_age),
                                    used_in_pricing = VALUES(used_in_pricing),
                                    note = VALUES(note),
                                    modified_by = VALUES(modified_by),
                                    date_modified = VALUES(date_modified),
                                    enabled = VALUES(enabled)
                                ";
							
							Model::$db->rawQuery($product_variant_sql);
							
							return self::getByVariantIdAndProductId($variant_id, $product_id);
						} catch (Exception $ex) {
							Log::$debug_log->error($ex);
							
							return [];
							
						}
						
					} catch (Exception $ex) {
						Log::$debug_log->error($ex->getMessage());
						
						return [];
					}
					
				} else {
					Log::$debug_log->error("Variant Id Not Generated");
					
					return [];
				}
			} catch (Exception $e) {
				Log::$debug_log->error($e->getMessage());
				
				return [];
			}
			
		}
		
		public static function deleteProductVariant(array $params = []): array
		{
			$product_id = Model::setInt((isset($params["product_id"])) ? $params["product_id"] : null);
			$variant_id = Model::setInt((isset($params["variant_id"])) ? $params["variant_id"] : null);
			
			if (!is_null($variant_id) && !is_null($product_id)) {
				$sql = "DELETE FROM product_variant WHERE product_id = $product_id AND variant_id = $variant_id;";
				try {
					$matrixList = Model::$db->rawQuery("SELECT matrix_id FROM pricing WHERE variant_id=$variant_id AND variant_id != 36 AND matrix_id IN (SELECT id FROM matrix WHERE product_id = $product_id)");
					$list = [];
					foreach ($matrixList AS $k => $v) {
						$list[] = (int)$v["matrix_id"];
					}
					$matrixList = implode(",", $list);
					Model::$db->rawQuery("DELETE FROM pricing WHERE matrix_id IN ($matrixList);");
					Model::$db->rawQuery("DELETE FROM matrix WHERE product_id = $product_id AND id  IN ($matrixList);");
					Model::$db->rawQuery("DELETE FROM product_variant WHERE product_id = $product_id AND variant_id = $variant_id;");
					
					return array(
						"matrix_list" => "(" . implode(",", $list) . ")",
						"variant_id" => $variant_id,
					);
				} catch (Exception $e) {
					Log::$debug_log->error($e->getMessage());
					
					return [];
				}
			} else {
				Log::$debug_log->error("Missing Fields");
				Log::$debug_log->trace("VAriant ID $variant_id");
				Log::$debug_log->trace("Product ID $product_id");
				
				return [];
			}
		}
		
	}
