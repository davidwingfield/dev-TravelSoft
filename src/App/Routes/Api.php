<?php
    /**
     * Short Api Routes Description
     *
     * Long Api Routes Description
     *
     * @package            Application\App
     * @subpackage         Routes
     */

    namespace Framework\App\Routes;

    use Framework\Core\Router;

    $routeLead = APIPATH . "/v" . VERSION;

    Router::get($routeLead . '/countries', 'Country@serveGet');
    Router::get($routeLead . '/provinces', 'Province@serveGet');
    Router::get($routeLead . '/cities', 'City@serveGet');
    Router::get($routeLead . '/providers/${provider_id}', "Provider@serveGet");

    Router::get($routeLead . '/autocomplete/providers', "Autocomplete@providers");

    Router::get($routeLead . '/autocomplete/seasons', "Autocomplete@seasons");
    Router::get($routeLead . '/autocomplete/variants', "Autocomplete@variants");
    Router::get($routeLead . '/autocomplete/units', "Autocomplete@units");
    Router::get($routeLead . '/autocomplete/locations', "Autocomplete@locations");
    // ----
    Router::post($routeLead . '/users/login', 'User@login');
    // ----
    Router::post($routeLead . '/countries/update', 'Country@serveUpdate');
    Router::post($routeLead . '/provinces/update', 'Province@serveUpdate');
    Router::post($routeLead . '/cities/update', 'City@serveUpdate');
