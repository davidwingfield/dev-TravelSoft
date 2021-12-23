<?php
    
    namespace Framework\App\Models;
    
    use Exception;
    use Framework\Core\Model;
    use Framework\Logger\Log;
    
    /**
     * Short MatrixModel Description
     * Long MatrixModel Description
     *
     * @package            Framework\App
     * @subpackage         Models
     */
    class MatrixModel extends Model
    {
        
        protected static $dbTable = "matrix";
        protected static $dbFields = Array();
        protected static $selectQuery = "
            SELECT
					MATRIX.id AS 'matrix_id',
                    MATRIX.product_id AS 'matrix_product_id',
                    MATRIX.season_id AS 'matrix_season_id',
                    MATRIX.unit_id AS 'matrix_unit_id',
                    MATRIX.cost AS 'matrix_cost',
                    MATRIX.margin AS 'matrix_margin',
                    MATRIX.price AS 'matrix_price',
                    MATRIX.flat_cost AS 'matrix_flat_cost',
                    MATRIX.flat_margin AS 'matrix_flat_margin',
                    MATRIX.flat_price AS 'matrix_flat_price',
                    MATRIX.has_pricing AS 'matrix_has_pricing',
                    MATRIX.been_saved AS 'matrix_been_saved',
                    MATRIX.enabled AS 'matrix_enabled',
                    MATRIX.date_created AS 'matrix_date_created',
                    MATRIX.created_by AS 'matrix_created_by',
                    MATRIX.date_modified AS 'matrix_date_modified',
                    MATRIX.modified_by AS 'matrix_modified_by',
                    MATRIX.note AS 'matrix_note'
			FROM 	matrix MATRIX
   
			WHERE 	MATRIX.enabled = 1
            ";
        
        public static function get(int $matrix_id = null): array
        {
            $where = "";
            try {
                if (!is_null($matrix_id)) {
                    $where = "
                        AND       MATRIX.id = $matrix_id";
                }
                
                $sql = self::$selectQuery . $where;
                
                return Model::$db->rawQuery($sql);
                
            } catch (Exception $e) {
                Log::$debug_log->error($e);
                
                return [];
            }
        }
        
        public static function fetchByProductId(int $product_id = null): array
        {
            $where = "";
            try {
                if (!is_null($product_id)) {
                    $where = "
                        AND       MATRIX.product_id = $product_id";
                }
                
                $sql = self::$selectQuery . $where;
                
                return Model::$db->rawQuery($sql);
                
            } catch (Exception $e) {
                Log::$debug_log->error($e);
                
                return [];
            }
        }
        
    }
