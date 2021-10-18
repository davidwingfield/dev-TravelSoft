<?php
namespace Framework\App\Models;
    
    use Exception;
    use Src\Core\Model;
    
    /**
     * Short Variant Description
     *
     * Long Variant Description
     *
     * @package            Application\App
     * @subpackage         Controllers
     */
    class VariantModel extends Model
    {
    
    
        
        protected static $dbTable = "variant";
        protected static $dbFields = Array (
            
        );
        
        public static function get(int $id = null): array
        {
            
            try{
            if (!is_null($id)) {
                Model::$db->where("id", $id);
            }
    
            self::$db->where("enabled", 1);
                return self::$db->get(self::$dbTable);
                } catch(Exception $e){
                    return [];
                }
        }
        
        public static function getOne(int $id = null): array
        {
            try{
            if (!is_null($id)) {
                Model::$db->where("id", $id);
            }
    
            self::$db->where("enabled", 1);
                return self::$db->getOne(self::$dbTable);
                } catch(Exception $e){
                    return [];
                }
        }
        
        public static function update(array $params = []): array
        {
            $id = 1;
            return Model::get($id);
        }
    }