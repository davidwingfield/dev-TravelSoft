<?php

    namespace Framework\App\Controllers;

    use Framework\App\Models\VariantModel;
    use Framework\Core\Controller;

    /**
     * Short Variant Description
     *
     * Long Variant Description
     *
     * @package            Framework\App
     * @subpackage         Controllers
     */
    class Variant extends Controller
    {
        public function __construct()
        {
            parent::__construct();
        }

        public static function getVariantsByProductId(int $product_id = null): array
        {
            $variants = [];
            $results = VariantModel::getByProductId((int)$product_id);
            foreach ($results AS $k => $variant) {
                $variants[] = self::format($variant);
            }

            return $variants;
        }

        private static function format(array $variant = null): array
        {
            if (is_null($variant)) {
                return [];
            }

            return array(
                'id' => $variant['variant_id'],
                'category_id' => $variant['variant_category_id'],
                'name' => $variant['variant_name'],
                'enabled' => $variant['variant_enabled'],
                'date_created' => $variant['variant_date_created'],
                'created_by' => $variant['variant_created_by'],
                'date_modified' => $variant['variant_date_modified'],
                'modified_by' => $variant['variant_modified_by'],
                'note' => $variant['variant_note'],
                'product_id' => $variant['product_variant_product_id'],
                'variant_id' => $variant['product_variant_variant_id'],
                'min_age' => $variant['product_variant_min_age'],
                'max_age' => $variant['product_variant_max_age'],
            );
        }

    }
