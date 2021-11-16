<?php

    namespace Framework\App\Models;

    use Exception;
    use Framework\App\Controllers\Address;
    use Framework\Core\Model;
    use Framework\Logger\Log;

    /**
     * Short Image Description
     *
     * Long Image Description
     *
     * @package            Framework\App
     * @subpackage         Models
     */
    class ImageModel extends Model
    {

        protected static $sql = "
            SELECT 
                            IMAGE.id AS 'image_id',
                            IMAGE.name AS 'image_name',
                            IMAGE.alt AS 'image_alt',
                            IMAGE.title AS 'image_title',
                            IMAGE.caption AS 'image_caption',
                            IMAGE.is_cover_image AS 'image_is_cover_image',
                            IMAGE.path AS 'image_path',
                            IMAGE.extension AS 'image_extension',
                            IMAGE.dimensions AS 'image_dimensions',
                            IMAGE.size AS 'image_size',
                            IMAGE.height AS 'image_height',
                            IMAGE.width AS 'image_width',
                            IMAGE.enabled AS 'image_enabled',
                            IMAGE.date_created AS 'image_date_created',
                            IMAGE.created_by AS 'image_created_by',
                            IMAGE.date_modified AS 'image_date_modified',
                            IMAGE.modified_by AS 'image_modified_by',
                            IMAGE.note AS 'image_note'
            FROM 			image IMAGE              
        ";

        public static function update(array $image = []): array
        {
            if (!isset($image)) {
                return [];
            }

            $user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
            $id = Model::setInt((isset($image["id"])) ? $image["id"] : null);
            $name = Model::setString((isset($image["name"])) ? $image["name"] : null);
            $directory = (isset($image["directory"])) ? $image["directory"] : null;
            $directory_id = (isset($image["directory_id"])) ? $image["directory_id"] : null;
            $path = Model::setString((isset($image["path"])) ? $image["path"] : null);
            $size = Model::setString((isset($image["size"])) ? $image["size"] : null);
            $extension = Model::setString((isset($image["extension"])) ? $image["extension"] : null);
            $dimensions = Model::setString((isset($image["dimensions"])) ? $image["dimensions"] : null);
            $title = Model::setLongText((isset($image["title"])) ? $image["title"] : null);
            $caption = Model::setLongText((isset($image["caption"])) ? $image["caption"] : null);
            $alt = Model::setLongText((isset($image["alt"])) ? $image["alt"] : null);
            $is_cover_image = Model::setBool((isset($image["is_cover_image"])) ? $image["is_cover_image"] : null);
            $width = Model::setInt((isset($image["width"])) ? $image["width"] : null);
            $height = Model::setInt((isset($image["height"])) ? $image["height"] : null);
            $enabled = Model::setBool((isset($image["enabled"])) ? $image["enabled"] : null);
            $note = Model::setLongText((isset($image["note"])) ? $image["note"] : null);
            $created_by = Model::setInt($user_id);
            $modified_by = Model::setInt($user_id);

            try {
                if ($is_cover_image) {
                    $updateSql = "
                        UPDATE      image
                        SET         is_cover_image = 0
                        WHERE       image.id IN (SELECT image_id AS 'id' FROM company_image WHERE ${directory}_image.company_id = $directory_id)
                    ";
                    Model::$db->rawQuery($updateSql);
                }

                try {
                    $sql = "
                INSERT INTO image (
                    id, name, title, caption, alt,
                    is_cover_image, path, extension, dimensions,
                    size, height, width, enabled,
                    date_created, created_by, date_modified, modified_by,
                    note
                ) VALUES (
                    $id, $name, $title, $caption, $alt,
                    $is_cover_image, $path, $extension, $dimensions,
                    $size, $height, $width, $enabled,
                    CURRENT_TIMESTAMP, $created_by, CURRENT_TIMESTAMP, $modified_by,
                    $note
                )
                ON DUPLICATE KEY UPDATE
                    name = VALUES(name),
                    alt = VALUES(alt),                                        
                    title = VALUES(title),
                    caption = VALUES(caption),
                    is_cover_image = VALUES(is_cover_image),
                    path = VALUES(path),
                    extension = VALUES(extension),
                    dimensions = VALUES(dimensions),
                    size = VALUES(size),
                    height = VALUES(height),
                    width = VALUES(width),
                    modified_by = VALUES(modified_by),
                    enabled = VALUES(enabled),
                    date_modified = VALUES(date_modified);
            ";
                    Model::$db->rawQuery($sql);
                    $image_id = Model::$db->getInsertId();
                    switch ($directory) {
                        case "company":
                            return self::updateCompanyImage($directory_id, $image_id);
                            break;
                        case "product":
                            return [];
                            //return self::updateProductImage($directory_id, $image_id);
                            break;
                        default:
                            return [];
                    }
                } catch (Exception $e) {
                    Log::$debug_log->error($e);

                    return [];
                }
            } catch (Exception $e) {
                Log::$debug_log->error($e);

                return [];
            }
        }

        /**
         * fetch records by image id or all
         *
         * @param int|null $image_id
         *
         * @return array
         */
        public static function get(int $image_id = null): array
        {
            $where = "";
            if (!is_null($image_id)) {
                $where = "
                WHERE       IMAGE.id = $image_id
                ";
            }

            $sql = self::$sql . $where;

            try {
                return Model::$db->rawQuery($sql);
            } catch (Exception $e) {
                Log::$debug_log->error($e);

                return [];
            }
        }

        public static function updateCompanyImage(int $company_id = null, int $image_id = null): array
        {
            $user_id = (isset($_SESSION["user_id"])) ? intval($_SESSION["user_id"]) : 4;
            $enabled = Model::setBool((isset($company["enabled"])) ? $company["enabled"] : null);
            $note = Model::setLongText((isset($company["note"])) ? $company["note"] : null);
            $created_by = Model::setInt($user_id);
            $modified_by = Model::setInt($user_id);

            $sql = "
                INSERT INTO company_image (
                    company_id, image_id, enabled, created_by,
                    date_created, modified_by, date_modified, note
                ) VALUES (
                    $company_id, $image_id, $enabled, $created_by,
                    CURRENT_TIMESTAMP, $modified_by, CURRENT_TIMESTAMP, $note
                )
                ON DUPLICATE KEY UPDATE
                    modified_by = VALUES(modified_by),
                    enabled = VALUES(enabled),
                    date_modified = VALUES(date_modified);
            ";

            try {
                Model::$db->rawQuery($sql);

                return self::get($image_id);
            } catch (Exception $e) {
                Log::$debug_log->error($e);

                return [];
            }

        }

        /**
         * get images by product id
         *
         * @param int|null $product_id
         *
         * @return array
         */
        public static function getByProductId(int $product_id = null): array
        {
            if (is_null($product_id)) {

                return [];
            }

            $sql = "
                SELECT
                                PRODUCT_IMAGE.product_id AS 'product_image_product_id',
                                PRODUCT_IMAGE.image_id AS 'product_image_image_id',
                                PRODUCT_IMAGE.enabled AS 'product_image_enabled',
                                PRODUCT_IMAGE.created_by AS 'product_image_created_by',
                                PRODUCT_IMAGE.date_created AS 'product_image_date_created',
                                PRODUCT_IMAGE.modified_by AS 'product_image_modified_by',
                                PRODUCT_IMAGE.date_modified AS 'product_image_date_modified',
                                PRODUCT_IMAGE.note AS 'product_image_note',
                                IMAGE.id AS 'image_id',
                                IMAGE.alt AS 'image_alt',
                                IMAGE.name AS 'image_name',
                                IMAGE.title AS 'image_title',
                                IMAGE.caption AS 'image_caption',
                                IMAGE.is_cover_image AS 'image_is_cover_image',
                                IMAGE.path AS 'image_path',
                                IMAGE.extension AS 'image_extension',
                                IMAGE.dimensions AS 'image_dimensions',
                                IMAGE.size AS 'image_size',
                                IMAGE.height AS 'image_height',
                                IMAGE.width AS 'image_width',
                                IMAGE.enabled AS 'image_enabled',
                                IMAGE.date_created AS 'image_date_created',
                                IMAGE.created_by AS 'image_created_by',
                                IMAGE.date_modified AS 'image_date_modified',
                                IMAGE.modified_by AS 'image_modified_by',
                                IMAGE.note AS 'image_note'
                FROM 			product_image PRODUCT_IMAGE
                JOIN			image IMAGE ON IMAGE.id = PRODUCT_IMAGE.image_id
                WHERE			PRODUCT_IMAGE.product_id = $product_id;
            ";
            try {
                return Model::$db->rawQuery($sql);

            } catch (Exception $e) {
                Log::$debug_log->error($e);

                return [];
            }
        }

        /**
         * get images by company id
         *
         * @param int|null $company_id
         *
         * @return array
         */
        public static function getByCompanyId(int $company_id = null): array
        {
            if (is_null($company_id)) {

                return [];
            }

            $sql = "
                SELECT
                                COMPANY_IMAGE.company_id AS 'company_image_company_id',
                                COMPANY_IMAGE.image_id AS 'company_image_image_id',
                                COMPANY_IMAGE.enabled AS 'company_image_enabled',
                                COMPANY_IMAGE.created_by AS 'company_image_created_by',
                                COMPANY_IMAGE.date_created AS 'company_image_date_created',
                                COMPANY_IMAGE.modified_by AS 'company_image_modified_by',
                                COMPANY_IMAGE.date_modified AS 'company_image_date_modified',
                                COMPANY_IMAGE.note AS 'company_image_note',
                                IMAGE.id AS 'image_id',
                                IMAGE.alt AS 'image_alt',
                                IMAGE.name AS 'image_name',
                                IMAGE.title AS 'image_title',
                                IMAGE.caption AS 'image_caption',
                                IMAGE.is_cover_image AS 'image_is_cover_image',
                                IMAGE.path AS 'image_path',
                                IMAGE.extension AS 'image_extension',
                                IMAGE.dimensions AS 'image_dimensions',
                                IMAGE.size AS 'image_size',
                                IMAGE.height AS 'image_height',
                                IMAGE.width AS 'image_width',
                                IMAGE.enabled AS 'image_enabled',
                                IMAGE.date_created AS 'image_date_created',
                                IMAGE.created_by AS 'image_created_by',
                                IMAGE.date_modified AS 'image_date_modified',
                                IMAGE.modified_by AS 'image_modified_by',
                                IMAGE.note AS 'image_note'
                FROM 			company_image COMPANY_IMAGE
                JOIN			image IMAGE ON IMAGE.id = COMPANY_IMAGE.image_id
                WHERE			COMPANY_IMAGE.company_id = $company_id;
            ";
            try {
                return Model::$db->rawQuery($sql);

            } catch (Exception $e) {
                Log::$debug_log->error($e);

                return [];
            }
        }

    }
