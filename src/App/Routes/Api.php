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

    Router::get($routeLead . '/providers', 'Provider@serveGet');
    Router::get($routeLead . '/providers/${provider_id}', "Provider@serveGet");
    Router::get($routeLead . '/providers/autocomplete', "Provider@autocomplete");

    Router::post($routeLead . '/users/login', 'User@login');
    //Router::get('login', 'StaticPagesController@serveLogin');
    //Router::get('home', 'StaticPagesController@serveHome');
