<?php

    namespace Framework\App\Controllers;

    use Framework\App\Models\SeasonModel;
    use Framework\Core\Controller;

    /**
     * Short Season Description
     *
     * Long Season Description
     *
     * @package            Framework\App
     * @subpackage         Controllers
     */
    class Season extends Controller
    {
        public function __construct()
        {
            parent::__construct();
        }

        public static function serveGet(int $season_id = null): array
        {
            $seasons = [];

            return $seasons;
        }

        public static function getSeasonsByProductId(int $product_id = null): array
        {
            $seasons = [];
            $results = SeasonModel::getByProductId((int)$product_id);
            foreach ($results AS $k => $season) {
                $seasons[] = self::format($season);
            }

            return $seasons;
        }

        private static function format(array $season = null): array
        {
            if (is_null($season)) {
                return [];
            }

            return array(
                'id' => $season['season_id'],
                'color_scheme_id' => $season['season_color_scheme_id'],
                'name' => $season['season_name'],
                'view_product_index' => $season['season_view_product_index'],
                'view_product_index_filter' => $season['season_view_product_index_filter'],
                'view_product_index_search' => $season['season_view_product_index_search'],
                'view_product_edit' => $season['season_view_product_edit'],
                'view_product_package_edit' => $season['season_view_product_package_edit'],
                'view_product_package_index' => $season['season_view_product_package_index'],
                'enabled' => $season['season_enabled'],
                'date_created' => $season['season_date_created'],
                'created_by' => $season['season_created_by'],
                'date_modified' => $season['season_date_modified'],
                'modified_by' => $season['season_modified_by'],
                'note' => $season['season_note'],
                'category_id' => $season['season_category_id'],
                'color_scheme' => array(
                    'id' => $season['color_scheme_id'],
                    'name' => $season['color_scheme_name'],
                    'background_color' => $season['color_scheme_background_color'],
                    'border_color' => $season['color_scheme_border_color'],
                    'text_color' => $season['color_scheme_text_color'],
                    'sort_order' => $season['color_scheme_sort_order'],
                    'enabled' => $season['color_scheme_enabled'],
                    'date_created' => $season['color_scheme_date_created'],
                    'created_by' => $season['color_scheme_created_by'],
                    'date_modified' => $season['color_scheme_date_modified'],
                    'modified_by' => $season['color_scheme_modified_by'],
                    'note' => $season['color_scheme_note'],

                ),
            );
        }

    }
