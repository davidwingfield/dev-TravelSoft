<?php
	
	/**
	 * Short Web Routes Description
	 * Long Web Routes Description
	 *
	 * @package            Framework\App
	 * @subpackage         Routes
	 */
	
	namespace Framework\App\Routes;
	
	use Framework\Core\Router;
	
	/**
	 * Static Page Routes
	 */
	Router::get("", "StaticPages@index");
	Router::get("register", "StaticPages@register");
	Router::get("login", "StaticPages@login");
	Router::get("logout", "StaticPages@logout");
	Router::get("profile", "StaticPages@profile");
	Router::get("documents/framework", "StaticPages@framework");
	Router::get("documents/database", "StaticPages@database");
	Router::get("utilities/filemanager", "StaticPages@filemanager");
	Router::get("reset_password", "StaticPages@reset_password");
	Router::get("forgot_password", "StaticPages@forgot_password");
	
	Router::get("admin/pages", "Page@index");
	Router::get('admin/pages/${page_id}', "Page@edit");
	/**
	 * Provider Page Routes
	 */
	Router::get("providers", "Provider@index");
	Router::get("providers/new", "Provider@new");
	Router::get('providers/${provider_id}', "Provider@edit");
	
	/**
	 * Vendor Page Routes
	 */
	Router::get("vendors", "Vendor@index");
	Router::get("vendors/new", "Vendor@new");
	Router::get('vendors/${vendor_id}', "Vendor@edit");
	
	/**
	 * Product Page Routes
	 */
	Router::get("products", "Product@index");
	Router::get('products/new', "Product@new");
	Router::get('products/${product_id}', "Product@edit");
	
	/**
	 * Package Page Routes
	 */
	Router::get("packages", "Package@index");
	Router::get('packages/new', "Package@new");
	Router::get('packages/${package_id}', "Package@edit");
	Router::get('packages/${package_id}/products/${product_id}', "Package@editPackageProduct");
	
	/**
	 * User Page Routes
	 */
	Router::get('users/${user_id}/products/${product_id}', "User@get_products_by_user");
	Router::get("admin/users", "User@index");
	
