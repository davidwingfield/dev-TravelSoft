<?php
    include_once(__DIR__ . "/libs/MysqliDb.php");
    include_once(__DIR__ . "/libs/dbObject.php");
    include_once(__DIR__ . "/libs/Inflect.php");
    include_once(__DIR__ . "/objectGenerator/functions.php");

    define("ROOT_PATH", $_SERVER["DOCUMENT_ROOT"] . "/bin");

    $ini = [];
    $iniFile = "../app.ini";
    if (file_exists($iniFile)) {
        $ini = parse_ini_file($iniFile, 1);
    }

    define("DBPASS", $ini["database"]["db_pass"]);
    define("DBHOST", $ini["database"]["db_host"]);
    define("DBNAME", $ini["database"]["db_name"]);
    define("DBUSER", $ini["database"]["db_user"]);
    define("DBPORT", $ini["database"]["db_port"]);
    define("DBPERSISTENT", $ini["database"]["db_persistent"]);
    define("DBLOGINATTEMPTS", $ini["database"]["db_loginattempts"]);
    define("EXPIRETIME", $ini["database"]["expire_time"]);
    define("VERSION", $ini["application"]["version"]);
    define("PATH", $ini["application"]["path"]);
    define("APIPATH", $ini["application"]["api_path"]);
    define("DEVMODE", $ini["application"]["development_mode"]);
    define("MAILADDRESS", $ini["application"]["email"]);

    $host = DBHOST;
    $username = DBUSER;
    $password = DBPASS;
    $port = DBPORT;
    $database = DBNAME;

    $db = new MysqliDb(DBHOST, DBUSER, DBPASS, DBNAME);

    echo "Enter Table Name:";
    $handle = fopen("php://stdin", "r");
    $line = fgets($handle);
    $table = trim($line);

    if ($table == "") {
        $table = null;
    }
    echo "Processing...\n";

    exe($table);
    exit(1);

