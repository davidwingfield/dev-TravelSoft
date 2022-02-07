<?php
	/**
	 * Short Api Routes Description
	 * Long Api Routes Description
	 *
	 * @package            Framework\App
	 * @subpackage         Routes
	 */
	
	namespace Framework\App\Routes;
	
	use Framework\Core\Router;
	
	$routeLead = APIPATH . "/v" . VERSION;
	
	/**
	 * @see Search::product()
	 */
	Router::get($routeLead . '/search/products', "Search@product");
	/**
	 * @see Search::hotels()
	 */
	Router::get($routeLead . '/search/hotels', "Search@hotels");
	/**
	 * @see Pricing::serveGetByMatrixId()
	 */
	Router::get($routeLead . '/pricings/${matrix_id}', "Pricing@serveGetByMatrixId");
	/**
	 * @see Pricing::serveGetByProductId()
	 */
	Router::get($routeLead . '/pricings/product', "Pricing@serveGetByProductId");
	/**
	 * @see Product::serveGet()
	 */
	Router::get($routeLead . '/products/${product_id}', "Product@serveGet");
	/**
	 * @see Page::serveGetByPageId()
	 */
	Router::get($routeLead . '/pages', "Page@serveGetByPageId");
	/**
	 * @see Page::serveGetMenus()
	 */
	Router::get($routeLead . '/pages/menus', "Page@serveGetMenus");
	/**
	 * @see Icon::serveGet()
	 */
	Router::get($routeLead . "/pages/icons", "Icon@serveGet");
	Router::get($routeLead . '/profiles/${product_id}', "Profile@getByProductId");
	Router::get($routeLead . '/locations/getByName', "Location@getByLocationName");
	Router::get($routeLead . '/seasons/${product_id}/${season_id}', "Season@getSeasonByProductSeasonId");
	Router::get($routeLead . '/calendars/${product_id}', "Calendar@getByProductId");
	Router::get($routeLead . '/calendars', "Calendar@serveGet");
	Router::get($routeLead . '/matrices', "Matrix@serveGet");
	Router::get($routeLead . '/profiles', "Profile@serveGet");
	Router::get($routeLead . "/countries", "Country@serveGet");
	Router::get($routeLead . "/packages", "Package@serveGet");
	Router::get($routeLead . "/products", "Product@serveGet");
	Router::get($routeLead . "/provinces", "Province@serveGet");
	Router::get($routeLead . "/cities", "City@serveGet");
	Router::get($routeLead . '/providers/${provider_id}', "Provider@serveGet");
	Router::get($routeLead . '/addresses/${company_id}', "Address@serveGet");
	Router::get($routeLead . '/addresses', "Address@serveGet");
	Router::get($routeLead . '/contacts/${company_id}', "Contact@serveGet");
	Router::get($routeLead . '/contacts', "Contact@serveGet");
	Router::get($routeLead . "/vendors", "Vendor@serveGet");
	Router::get($routeLead . '/vendors/${vendor_id}', "Vendor@serveGet");
	Router::get($routeLead . "/contacts", "Contact@serveGet");
	Router::get($routeLead . "/locations", "Location@serveGet");
	Router::get($routeLead . "/users/test", "User@test");
	Router::get($routeLead . '/images', "Image@serveGet");
	Router::get($routeLead . '/images/${image_id}', "Image@serveGet");
	Router::get($routeLead . '/images/company/${company_id}', "Image@serveGetByCompanyId");
	/**
	 * @see Station::validate()
	 */
	Router::get($routeLead . "/stations/validate", "Station@validate");
	/**
	 * @see Airport::validateName()
	 */
	Router::get($routeLead . "/airports/validate", "Airport@validateName");
	Router::get($routeLead . "/locations/validate", "Location@validateName");
	Router::get($routeLead . "/profiles/validate", "Profile@validateName");
	Router::get($routeLead . "/variants/validate", "Variant@validateName");
	Router::get($routeLead . "/units/validate", "Unit@validateName");
	Router::get($routeLead . "/companies/validate", "Company@validateName");
	Router::get($routeLead . "/providers/validate", "Provider@validateName");
	Router::get($routeLead . "/vendors/validate", "Vendor@validateName");
	/**
	 * @see Season::validateName()
	 */
	Router::get($routeLead . "/seasons/validate", "Season@validateName");
	/**
	 * @see Autocomplete::airports()
	 */
	Router::get($routeLead . "/autocomplete/airports", "Autocomplete@airports");
	/**
	 * @see Autocomplete::stations()
	 */
	Router::get($routeLead . "/autocomplete/stations", "Autocomplete@stations");
	
	Router::get($routeLead . "/autocomplete/providers", "Autocomplete@providers");
	
	Router::get($routeLead . "/autocomplete/seasons", "Autocomplete@seasons");
	
	Router::get($routeLead . "/autocomplete/units", "Autocomplete@units");
	
	Router::get($routeLead . "/autocomplete/variants", "Autocomplete@variants");
	
	Router::get($routeLead . "/autocomplete/cities", "Autocomplete@cities");
	
	Router::get($routeLead . "/autocomplete/products", "Autocomplete@products");
	
	Router::get($routeLead . "/autocomplete/vendors", "Autocomplete@vendors");
	
	Router::get($routeLead . "/autocomplete/profiles", "Autocomplete@profiles");
	
	Router::get($routeLead . "/autocomplete/locations", "Autocomplete@locations");
	
	Router::get($routeLead . "/autocomplete/companies", "Autocomplete@companies");
	
	/**
	 * @see User::login()
	 */
	Router::post($routeLead . "/users/login", "User@login");
	/**
	 * @see User::serveUpdateUser()
	 */
	Router::post($routeLead . "/users/register", "User@serveUpdateUser");
	/**
	 * @see User::serveUpdateUser()
	 */
	Router::post($routeLead . "/users/update", "User@serveUpdateUser");
	/**
	 * @see Image::serveUpdate()
	 */
	Router::post($routeLead . "/images/update", "Image@serveUpdate");
	/**
	 * @see Product::assignSeason()
	 */
	Router::post($routeLead . "/products/assign_seasons", "Product@assignSeason");
	/**
	 * @see Product::assignProfile()
	 */
	Router::post($routeLead . "/products/assign_profiles", "Product@assignProfile");
	/**
	 * @see Matrix::serveUpdate()
	 */
	Router::post($routeLead . "/matrices/update", "Matrix@serveUpdate");
	/**
	 * @see Pricing::serveUpdate()
	 */
	Router::post($routeLead . "/pricings/update", "Pricing@serveUpdate");
	/**
	 * @see Season::serveUpdate()
	 */
	Router::post($routeLead . "/seasons/update", "Season@serveUpdate");
	/**
	 * @see Product::serveUpdate()
	 */
	Router::post($routeLead . "/products/update", "Product@serveUpdate");
	/**
	 * @see Season:addSeason()
	 */
	Router::post($routeLead . "/seasons/add", "Season@addSeason");
	/**
	 * @see Season:serveDelete()
	 */
	Router::post($routeLead . "/seasons/remove", "Season@serveDelete");
	/**
	 * @see Page::updateMenus()
	 */
	Router::post($routeLead . "/pages/menus/update", "Page@updateMenus");
	Router::post($routeLead . "/variants/remove", "Variant@serveDelete");
	Router::post($routeLead . "/profiles/remove", "Profile@serveDelete");
	Router::post($routeLead . "/units/remove", "Unit@serveDelete");
	/**
	 * @see Product::serveAdd()
	 */
	Router::post($routeLead . "/products/add", "Product@serveAdd");
	Router::post($routeLead . "/users/reset_password", "User@serveResetPassword");
	Router::post($routeLead . "/contacts/update", "Contact@serveUpdate");
	Router::post($routeLead . "/providers/update", "Provider@serveUpdate");
	Router::post($routeLead . "/vendors/update", "Vendor@serveUpdate");
	Router::post($routeLead . "/vendors/add", "Vendor@serveAdd");
	Router::post($routeLead . "/companies/update", "Company@serveUpdate");
	Router::post($routeLead . "/addresses/update", "Address@serveUpdate");
	/**
	 * @see Location:serveUpdate()
	 */
	Router::post($routeLead . "/locations/update", "Location@serveUpdate");
	Router::post($routeLead . "/provinces/update", "Province@serveUpdate");
	Router::post($routeLead . "/variants/update", "Variant@serveUpdate");
	Router::post($routeLead . "/profiles/update", "Province@serveUpdate");
	Router::post($routeLead . "/units/update", "Unit@serveUpdate");
	Router::post($routeLead . "/countries/update", "Country@serveUpdate");
	Router::post($routeLead . "/profiles/update", "Profile@serveUpdate");
	Router::post($routeLead . "/cities/update", "City@serveUpdate");
	/**
	 * @see Variant:serveNew()
	 */
	Router::post($routeLead . "/variants/new", "Variant@serveNew");
	/**
	 * @see Unit:serveNew()
	 */
	Router::post($routeLead . "/units/new", "Unit@serveNew");
	/**
	 * @see Airport::serveUpdate()
	 */
	Router::post($routeLead . "/airports/update", "Airport@serveUpdate");
	
	/**
	 * @see Station::update()
	 */
	Router::post($routeLead . "/stations/update", "Station@update");
	
	Router::post($routeLead . "/products/table_update", "Product@serveTableUpdate");
