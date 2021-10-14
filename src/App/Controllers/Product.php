<?php

    namespace Framework\App\Controllers;

    use Framework\Core\Controller;
    use Framework\Core\View;

    /**
     * Short Product Description
     *
     * Long Product Description
     *
     * @package            Application\App
     * @subpackage         Controllers
     */
    class Product extends Controller
    {
        public function __construct()
        {
            parent::__construct();
        }

        public static function index(array $params = [])
        {
            $data = Page::getDetails(9);
            define("BREAD_CRUMBS", "
            <li class='breadcrumb-item'>
                <a href='/'>Home</a>
            </li>
            <li class='breadcrumb-item'>
                Products
            </li>"
            );
            // ----
            View::render_template("products/index", $data);
            exit(1);
        }

        public static function edit(array $params = [])
        {
            if (isset($params["product_id"])) {
                $product_id = (int)$params["product_id"];
                $data = Page::getDetails(6);
                $data["product_details"] = [];
                // ----
                define("BREAD_CRUMBS", "
                    <li class='breadcrumb-item'>
                        <a href='/'>Home</a>
                    </li>
                    <li class='breadcrumb-item'>
                        <a href='/products'>Products</a>
                    </li>
                    <li class='breadcrumb-item'>
                        $product_id
                    </li>"
                );
                // ----
                View::render_template("products/edit", $data);
                exit(1);
            }

            header("Location: /products");
            exit(1);
        }

        public static function new(array $params = [])
        {
            $data = Page::getDetails(9);
            define("BREAD_CRUMBS", "
            <li class='breadcrumb-item'>
                <a href='/'>Home</a>
            </li>
            <li class='breadcrumb-item'>
                <a href='/products'>Products</a>
            </li>
            <li class='breadcrumb-item'>
                New
            </li>"
            );
            // ----
            View::render_template("products/edit", $data);
            exit(1);
        }

    }
