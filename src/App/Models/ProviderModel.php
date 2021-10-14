<?php

    namespace Framework\App\Models;

    use Framework\Core\Model;

    /**
     * Short ProviderModel Description
     *
     * Long ProviderModel Description
     *
     * @package            Application\App
     * @subpackage         Models
     */
    class ProviderModel extends Model
    {
        /**
         * @var array[] $data Table Data
         */
        protected static $data = [
            "id" => array(),
            "company_id" => array(),
            "location_id" => array(),
            "code_direct_id" => array(),
            "provider_vendor" => array(),
            "email" => array(),
            "website" => array(),
            "enabled" => array(),
            "created_by" => array(),
            "date_created" => array(),
            "modified_by" => array(),
            "date_modified" => array(),
            "note" => array(),
        ];

        /**
         * Gets provider(s) by id
         *
         * If id is passed then we search by it otherwise get all enabled
         *
         * @param int|null $id Provider Id
         *
         * @return array
         */
        public static function get(int $id = null): array
        {
            if (!is_null($id)) {
                self::$db->where("id", $id);
            }

            self::$db->where('enabled', 1);

            return self::$db->get('provider');
        }

        public static function getOne(int $id = null): array
        {
            if (!is_null($id)) {
                self::$db->where("id", $id);
            }
            self::$db->where("enabled", 1);

            return self::$db->getOne("provider");
        }

    }
