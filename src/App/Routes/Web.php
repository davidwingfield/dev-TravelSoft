<?php

    /**
     * Short Web Routes Description
     *
     * Long Web Routes Description
     *
     * @package            Application\App
     * @subpackage         Routes
     */

    namespace Framework\App\Routes;

    use Framework\Core\Router;

    /** STATIC PAGE ROUTES */
    Router::get("", "StaticPages@index");
    Router::get("register", "StaticPages@register");
    Router::get("login", "StaticPages@login");
    Router::get("logout", "StaticPages@logout");
    Router::get("profile", "StaticPages@profile");
    Router::get("documents/framework", "StaticPages@framework");
    Router::get("documents/database", "StaticPages@database");
    Router::get("utilities/filemanager", "StaticPages@filemanager");

    /** PROVIDER PAGE ROUTES */
    Router::get("providers", "Provider@index");
    Router::get("providers/new", "Provider@new");
    Router::get('providers/${provider_id}', "Provider@edit");

    /** VENDOR PAGE ROUTES */
    Router::get("vendors", "Vendor@index");
    Router::get("vendors/new", "Vendor@new");
    Router::get('vendors/${vendor_id}', "Vendor@edit");

    /** PRODUCT PAGE ROUTES */
    Router::get("products", "Product@index");
    Router::get('products/new', "Product@new");
    Router::get('products/${product_id}', "Product@edit");
    Router::get("products/packages", "Product@productPackageIndex");
    Router::get('products/packages/new', "Product@productPackageNew");
    Router::get('products/packages/${package_id}', "Product@productPackageEdit");
    Router::get('products/${product_id}/packages/${package_id}', "Product@productPackageEdit");
    /** TESTPOST */

    Router::get('users/${user_id}/products/${product_id}', "User@get_products_by_user");

