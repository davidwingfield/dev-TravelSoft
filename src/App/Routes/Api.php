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
	
	/**
	 * @see Profile::getByProductId()
	 */
	Router::get($routeLead . '/profiles/${product_id}', "Profile@getByProductId");
	
	/**
	 * @see Location::getByLocationName()
	 */
	Router::get($routeLead . '/locations/getByName', "Location@getByLocationName");
	
	/**
	 * @see Season::getSeasonByProductSeasonId()
	 */
	Router::get($routeLead . '/seasons/${product_id}/${season_id}', "Season@getSeasonByProductSeasonId");
	
	/**
	 * @see Calendar::getByProductId()
	 */
	Router::get($routeLead . '/calendars/${product_id}', "Calendar@getByProductId");
	
	/**
	 * @see Calendar::serveGet()
	 */
	Router::get($routeLead . '/calendars', "Calendar@serveGet");
	
	/**
	 * @see Matrix::serveGet()
	 */
	Router::get($routeLead . '/matrices', "Matrix@serveGet");
	
	/**
	 * @see Profile::serveGet()
	 */
	Router::get($routeLead . '/profiles', "Profile@serveGet");
	
	/**
	 * @see Country::serveGet()
	 */
	Router::get($routeLead . "/countries", "Country@serveGet");
	
	/**
	 * @see Package::serveGet()
	 */
	Router::get($routeLead . "/packages", "Package@serveGet");
	
	/**
	 * @see Product::serveGet()
	 */
	Router::get($routeLead . "/products", "Product@serveGet");
	
	/**
	 * @see Province::serveGet()
	 */
	Router::get($routeLead . "/provinces", "Province@serveGet");
	
	/**
	 * @see City::serveGet()
	 */
	Router::get($routeLead . "/cities", "City@serveGet");
	
	/**
	 * @see Provider::serveGet()
	 */
	Router::get($routeLead . '/providers/${provider_id}', "Provider@serveGet");
	
	/**
	 * @see Address::serveGet()
	 */
	Router::get($routeLead . '/addresses/${company_id}', "Address@serveGet");
	
	/**
	 * @see Address::serveGet()
	 */
	Router::get($routeLead . '/addresses', "Address@serveGet");
	
	/**
	 * @see Contact::serveGet()
	 */
	Router::get($routeLead . '/contacts/${company_id}', "Contact@serveGet");
	
	/**
	 * @see Contact::serveGet()
	 */
	Router::get($routeLead . '/contacts', "Contact@serveGet");
	
	/**
	 * @see Vendor::serveGet()
	 */
	Router::get($routeLead . "/vendors", "Vendor@serveGet");
	
	/**
	 * @see Vendor::serveGet()
	 */
	Router::get($routeLead . '/vendors/${vendor_id}', "Vendor@serveGet");
	
	/**
	 * @see Contact::serveGet()
	 */
	Router::get($routeLead . "/contacts", "Contact@serveGet");
	
	/**
	 * @see Location::serveGet()
	 */
	Router::get($routeLead . "/locations", "Location@serveGet");
	
	/**
	 * @see User::test()
	 */
	Router::get($routeLead . "/users/test", "User@test");
	
	/**
	 * @see Station::validate()
	 */
	Router::get($routeLead . "/stations/validate", "Station@validate");
	
	/**
	 * @see Airport::validateName()
	 */
	Router::get($routeLead . "/airports/validate", "Airport@validateName");
	
	/**
	 * @see Location::validateName()
	 */
	Router::get($routeLead . "/locations/validate", "Location@validateName");
	
	/**
	 * @see Profile::validateName()
	 */
	Router::get($routeLead . "/profiles/validate", "Profile@validateName");
	
	/**
	 * @see Variant::validateName()
	 */
	Router::get($routeLead . "/variants/validate", "Variant@validateName");
	
	/**
	 * @see Unit::validateName()
	 */
	Router::get($routeLead . "/units/validate", "Unit@validateName");
	
	/**
	 * @see Company::validateName()
	 */
	Router::get($routeLead . "/companies/validate", "Company@validateName");
	
	/**
	 * @see Provider::validateName()
	 */
	Router::get($routeLead . "/providers/validate", "Provider@validateName");
	
	/**
	 * @see Vendor::validateName()
	 */
	Router::get($routeLead . "/vendors/validate", "Vendor@validateName");
	
	/**
	 * @see Season::validateName()
	 */
	Router::get($routeLead . "/seasons/validate", "Season@validateName");
	
	/**
	 * @see Country::validateName()
	 */
	Router::get($routeLead . "/countries/validate", "Country@validateName");
	
	/**
	 * @see Autocomplete::itineraries()
	 */
	Router::get($routeLead . "/autocomplete/itineraries", "Autocomplete@itineraries");
	
	/**
	 * @see Autocomplete::airports()
	 */
	Router::get($routeLead . "/autocomplete/airports", "Autocomplete@airports");
	
	/**
	 * @see Autocomplete::stations()
	 */
	Router::get($routeLead . "/autocomplete/stations", "Autocomplete@stations");
	
	/**
	 * @see Autocomplete::countries()
	 */
	Router::get($routeLead . "/autocomplete/countries", "Autocomplete@countries");
	
	/**
	 * @see Autocomplete::providers()
	 */
	Router::get($routeLead . "/autocomplete/providers", "Autocomplete@providers");
	
	/**
	 * @see Autocomplete::seasons()
	 */
	Router::get($routeLead . "/autocomplete/seasons", "Autocomplete@seasons");
	
	/**
	 * @see Autocomplete::units()
	 */
	Router::get($routeLead . "/autocomplete/units", "Autocomplete@units");
	
	/**
	 * @see Autocomplete::variants()
	 */
	Router::get($routeLead . "/autocomplete/variants", "Autocomplete@variants");
	
	/**
	 * @see Autocomplete::cities()
	 */
	Router::get($routeLead . "/autocomplete/cities", "Autocomplete@cities");
	
	/**
	 * @see Autocomplete::products()
	 */
	Router::get($routeLead . "/autocomplete/products", "Autocomplete@products");
	
	/**
	 * @see Autocomplete::vendors()
	 */
	Router::get($routeLead . "/autocomplete/vendors", "Autocomplete@vendors");
	
	/**
	 * @see Autocomplete::profiles()
	 */
	Router::get($routeLead . "/autocomplete/profiles", "Autocomplete@profiles");
	
	/**
	 * @see Autocomplete::locations()
	 */
	Router::get($routeLead . "/autocomplete/locations", "Autocomplete@locations");
	
	/**
	 * @see Autocomplete::locationSearch()
	 */
	Router::get($routeLead . "/autocomplete/location_search", "Autocomplete@locationSearch");
	
	/**
	 * @see Autocomplete::companies()
	 */
	Router::get($routeLead . "/autocomplete/companies", "Autocomplete@companies");
	/**
	 * @see StatusType::serveGet()
	 */
	Router::get($routeLead . '/status_types/${status_type_id}', "StatusType@serveGet");
	
	/**
	 * @see StatusType::serveGet()
	 */
	Router::get($routeLead . '/status_types', "StatusType@serveGet");
	
	/**
	 * @see Station::serveGet()
	 */
	Router::get($routeLead . '/stations/${station_id}', "Station@serveGet");
	
	/**
	 * @see Airport::serveGet()
	 */
	Router::get($routeLead . '/airports/${airport_id}', "Airport@serveGet");
	
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
	
	/**
	 * @see Page::serveUpdate()
	 */
	Router::post($routeLead . "/pages/save", "Page@serveUpdate");
	
	/**
	 * @see Variant::serveDelete()
	 */
	Router::post($routeLead . "/variants/remove", "Variant@serveDelete");
	
	/**
	 * @see Profile::serveDelete()
	 */
	Router::post($routeLead . "/profiles/remove", "Profile@serveDelete");
	
	/**
	 * @see Unit::serveDelete()
	 */
	Router::post($routeLead . "/units/remove", "Unit@serveDelete");
	
	/**
	 * @see Product::serveAdd()
	 */
	Router::post($routeLead . "/products/add", "Product@serveAdd");
	
	/**
	 * @see Product::serveUpdateMeta()
	 */
	Router::post($routeLead . "/products/update_meta", "Product@serveUpdateMeta");
	
	/**
	 * @see Product::serveUpdateDetail()
	 */
	Router::post($routeLead . "/products/update_detail", "Product@serveUpdateDetail");
	
	/**
	 * @see User::serveResetPassword()
	 */
	Router::post($routeLead . "/users/reset_password", "User@serveResetPassword");
	
	/**
	 * @see Contact::serveUpdate()
	 */
	Router::post($routeLead . "/contacts/update", "Contact@serveUpdate");
	
	/**
	 * @see Provider::serveUpdate()
	 */
	Router::post($routeLead . "/providers/update", "Provider@serveUpdate");
	
	/**
	 * @see Vendor::serveUpdate()
	 */
	Router::post($routeLead . "/vendors/update", "Vendor@serveUpdate");
	
	/**
	 * @see Vendor::serveAdd()
	 */
	Router::post($routeLead . "/vendors/add", "Vendor@serveAdd");
	
	/**
	 * @see Company::serveUpdate()
	 */
	Router::post($routeLead . "/companies/update", "Company@serveUpdate");
	
	/**
	 * @see Address::serveUpdate()
	 */
	Router::post($routeLead . "/addresses/update", "Address@serveUpdate");
	
	/**
	 * @see Location:serveUpdate()
	 */
	Router::post($routeLead . "/locations/update", "Location@serveUpdate");
	
	/**
	 * @see Province:serveUpdate()
	 */
	Router::post($routeLead . "/provinces/update", "Province@serveUpdate");
	
	/**
	 * @see Variant:serveUpdate()
	 */
	Router::post($routeLead . "/variants/update", "Variant@serveUpdate");
	
	/**
	 * @see Province:serveUpdate()
	 */
	Router::post($routeLead . "/profiles/update", "Province@serveUpdate");
	
	/**
	 * @see Unit:serveUpdate()
	 */
	Router::post($routeLead . "/units/update", "Unit@serveUpdate");
	
	/**
	 * @see Country:serveUpdate()
	 */
	Router::post($routeLead . "/countries/update", "Country@serveUpdate");
	
	/**
	 * @see Profile:serveUpdate()
	 */
	Router::post($routeLead . "/profiles/update", "Profile@serveUpdate");
	
	/**
	 * @see City:serveUpdate()
	 */
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
	
	/**
	 * @see Product::serveTableUpdate()
	 */
	Router::post($routeLead . "/products/table_update", "Product@serveTableUpdate");
	
	/**
	 * @see Upload::uploadProductImage()
	 */
	Router::post($routeLead . "/upload/product", "Upload@uploadProductImage");
	
	/**
	 * @see Upload::uploadProductImage()
	 */
	Router::post($routeLead . "/upload/unit", "Upload@uploadProductImage");
	
	/**
	 * @see Upload::uploadProductImage()
	 */
	Router::post($routeLead . "/upload/company", "Upload@uploadProductImage");
	
	/**
	 * @see Upload::updateProductImage()
	 */
	Router::post($routeLead . '/update/product/image', "Upload@updateProductImage");
	
	/**
	 * @see Image::serveGet()
	 */
	Router::get($routeLead . '/images', "Image@serveGet");
	
	/**
	 * @see Image:serveDelete()
	 */
	Router::post($routeLead . "/images/remove", "Image@serveDelete");
	
	/**
	 * @see Image::serveUpdate()
	 */
	Router::post($routeLead . "/images/update", "Image@serveUpdate");
	
	/**
	 * @see Image::serveGet()
	 */
	Router::get($routeLead . '/images/${image_id}', "Image@serveGet");
	
	/**
	 * @see Image::serveGetImagesFromProductDirectory()
	 */
	Router::get($routeLead . '/images/src/product/${image_id}', "Image@serveGetImagesFromProductDirectory");
	
	/**
	 * @see Image::serveGetByCompanyId()
	 */
	Router::get($routeLead . '/images/src/company/${company_id}', "Image@serveGetByCompanyId");
	
	/**
	 * @see Image::serveGetByProductId()
	 */
	Router::get($routeLead . '/images/product/${product_id}', "Image@serveGetByProductId");
	
	/**
	 * @see Image::serveGetByUnitId()
	 */
	Router::get($routeLead . '/images/unit/${unit_id}', "Image@serveGetByUnitId");
