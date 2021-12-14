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
     * get requests
     */
    Router::get($routeLead . "/countries", "Country@serveGet");
    Router::get($routeLead . "/packages", "Package@serveGet");
    Router::get($routeLead . '/products/${product_id}', "Product@serveGet");
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
     * autocomplete validate
     */
    Router::get($routeLead . "/locations/validate", "Location@validateName");
    Router::get($routeLead . "/companies/validate", "Company@validateName");
    Router::get($routeLead . "/providers/validate", "Provider@validateName");
    Router::get($routeLead . "/vendors/validate", "Vendor@validateName");
    
    /**
     * autocomplete requests
     */
    Router::get($routeLead . "/autocomplete/providers", "Autocomplete@providers");
    Router::get($routeLead . "/autocomplete/products", "Autocomplete@products");
    Router::get($routeLead . "/autocomplete/vendors", "Autocomplete@vendors");
    Router::get($routeLead . "/autocomplete/seasons", "Autocomplete@seasons");
    Router::get($routeLead . "/autocomplete/variants", "Autocomplete@variants");
    Router::get($routeLead . "/autocomplete/units", "Autocomplete@units");
    Router::get($routeLead . "/autocomplete/locations", "Autocomplete@locations");
    Router::get($routeLead . "/autocomplete/companies", "Autocomplete@companies");
    
    /**
     * login requests
     */
    Router::post($routeLead . "/users/login", "User@login");
    Router::post($routeLead . "/users/register", "User@serveUpdateUser");
    Router::post($routeLead . "/users/update", "User@serveUpdateUser");
    
    /**
     * image requests
     */
    Router::post($routeLead . "/images/update", "Image@serveUpdate");
    /**
     * update requests
     */
    
    Router::post($routeLead . "/users/reset_password", "User@serveResetPassword");
    Router::post($routeLead . "/contacts/update", "Contact@serveUpdate");
    Router::post($routeLead . "/providers/update", "Provider@serveUpdate");
    Router::post($routeLead . "/vendors/update", "Vendor@serveUpdate");
    Router::post($routeLead . "/vendors/add", "Vendor@serveAdd");
    Router::post($routeLead . "/companies/update", "Company@serveUpdate");
    Router::post($routeLead . "/addresses/update", "Address@serveUpdate");
    Router::post($routeLead . "/locations/update", "Location@serveUpdate");
    
    Router::post($routeLead . "/seasons/update", "Province@serveUpdate");
    Router::post($routeLead . "/variants/update", "City@serveUpdate");
    Router::post($routeLead . "/profiles/update", "Province@serveUpdate");
    Router::post($routeLead . "/units/update", "City@serveUpdate");
    Router::post($routeLead . "/countries/update", "Country@serveUpdate");
    Router::post($routeLead . "/provinces/update", "Province@serveUpdate");
    Router::post($routeLead . "/cities/update", "City@serveUpdate");
    Router::post($routeLead . "/products/table_update", "Product@serveTableUpdate");
