<?php

    use Framework\Init\AppIni;

    /**
     * Used for logging all php notices,warings and etc in a file when error reporting
     * is set and display_errors is off
     *
     * @author Aditya Mehrotra<aditycse@gmail.com>
     * @uses   used in prod env for logging all type of error of php code in a file for further debugging
     *         and code performance
     */

    define("ROOT_PATH", $_SERVER["DOCUMENT_ROOT"]);

    const ROUTES_PATH = ROOT_PATH . "/src/App/Routes";
    const VIEWS_PATH = ROOT_PATH . "/src/App/Views";
    const EMAILS_PATH = ROOT_PATH . "/src/App/Emails";
    const INI_PATH = ROOT_PATH . "/app.ini";
    const SECURE = false;

    require_once(__DIR__ . "/public/index.php");
