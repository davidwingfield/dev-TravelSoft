<?php
	include_once(__DIR__ . "/libs/MysqliDb.php");
    include_once(__DIR__ . "/sqlGenerator/functions.php");

    define("ROOT_PATH", $_SERVER["DOCUMENT_ROOT"] . "/bin");
    define("DBPASS", "Swindon4!");
    define("DBHOST", "localhost");
    define("DBNAME", "travelsoft");
    define("DBUSER", "root");
    define("DBPORT", "3306");
    define("DBPERSISTENT", false);
    

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
	
	