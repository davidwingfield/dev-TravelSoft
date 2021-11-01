<?php
    /**
     * Short Api Routes Description
     *
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
    Router::get($routeLead . "/provinces", "Province@serveGet");
    Router::get($routeLead . "/cities", "City@serveGet");
    Router::get($routeLead . '/providers/${provider_id}', "Provider@serveGet");
    Router::get($routeLead . "/vendors", "Vendor@serveGet");
    Router::get($routeLead . "/contacts", "Contact@serveGet");

    /**
     * autocomplete validate
     */
    Router::get($routeLead . "/companies/validate", "Company@validateName");
    Router::get($routeLead . "/providers/validate", "Provider@validateName");

    /**
     * autocomplete requests
     */
    Router::get($routeLead . "/autocomplete/providers", "Autocomplete@providers");
    Router::get($routeLead . "/autocomplete/vendors", "Autocomplete@vendors");
    Router::get($routeLead . "/autocomplete/seasons", "Autocomplete@seasons");
    Router::get($routeLead . "/autocomplete/variants", "Autocomplete@variants");
    Router::get($routeLead . "/autocomplete/units", "Autocomplete@units");
    Router::get($routeLead . "/autocomplete/locations", "Autocomplete@locations");

    /**
     * login requests
     */
    Router::post($routeLead . "/users/login", "User@login");

    /**
     * update requests
     */
    Router::post($routeLead . "/providers/update", "Country@serveUpdate");
    Router::post($routeLead . "/vendors/update", "Province@serveUpdate");
    Router::post($routeLead . "/products/update", "City@serveUpdate");
    Router::post($routeLead . "/packages/update", "Country@serveUpdate");
    Router::post($routeLead . "/seasons/update", "Province@serveUpdate");
    Router::post($routeLead . "/variants/update", "City@serveUpdate");
    Router::post($routeLead . "/profiles/update", "Province@serveUpdate");
    Router::post($routeLead . "/units/update", "City@serveUpdate");
    Router::post($routeLead . "/countries/update", "Country@serveUpdate");
    Router::post($routeLead . "/provinces/update", "Province@serveUpdate");
    Router::post($routeLead . "/cities/update", "City@serveUpdate");
