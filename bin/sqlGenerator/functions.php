<?php
function getCamelCase($name)
    {
        $temp = str_replace('_', ' ', $name);
        $upperCase = ucwords($temp);

        return str_replace(' ', '', $upperCase);
    }
	
	
function createScripts($table=null){
	$TABLE_CATALOG = $table["TABLE_CATALOG"];
	$TABLE_SCHEMA = $table["TABLE_SCHEMA"];
	$TABLE_NAME = $table["TABLE_NAME"];
	$TABLE_TYPE = $table["TABLE_TYPE"];
	$ENGINE = $table["ENGINE"];
	$VERSION = $table["VERSION"];
	$ROW_FORMAT = $table["ROW_FORMAT"];
	$TABLE_ROWS = $table["TABLE_ROWS"];
	$AVG_ROW_LENGTH = $table["AVG_ROW_LENGTH"];
	$DATA_LENGTH = $table["DATA_LENGTH"];
	$MAX_DATA_LENGTH = $table["MAX_DATA_LENGTH"];
	$INDEX_LENGTH = $table["INDEX_LENGTH"];
	$DATA_FREE = $table["DATA_FREE"];
	$AUTO_INCREMENT = $table["AUTO_INCREMENT"];
	$CREATE_TIME = $table["CREATE_TIME"];
	$UPDATE_TIME = $table["UPDATE_TIME"];
	$CHECK_TIME = $table["CHECK_TIME"];
	$TABLE_COLLATION = $table["TABLE_COLLATION"];
	$CHECKSUM = $table["CHECKSUM"];
	$CREATE_OPTIONS = $table["CREATE_OPTIONS"];
	$TABLE_COMMENT = $table["TABLE_COMMENT"];

	$cCase = getCamelCase($TABLE_NAME);
	$uCase = strtoupper($TABLE_NAME);
	$fileName = $cCase . ".txt";
	$table_fields = getTableFields($TABLE_NAME);
	
	$selectDirectory = __DIR__ . "/scripts/Select/";
	$updateDirectory = __DIR__ . "/scripts/Update/";
	$insertDirectory = __DIR__ . "/scripts/Insert/";
	
	$base_select_view = __DIR__ . "/select.php";
	if (!file_exists($base_select_view)) {
		echo "\n\nError 1\n\n";
		die(0);
	}
	
	ob_start();
	include $base_select_view;
	$select_template = ob_get_clean();
	//$select_template = "test";
	
	$selectFile = fopen("$selectDirectory$fileName", "w") or die("Unable to open file!");
	fwrite($selectFile, $select_template);
	fclose($selectFile);
}

function getTableFields($table)
    {
        global $db;
        $sql = "
			SELECT 	*
			FROM 	INFORMATION_SCHEMA.COLUMNS
			WHERE 	table_name = '$table'  AND TABLE_SCHEMA='travelsoft';
		";

        $fields = $db->rawQuery($sql);
        return $fields;
    }
	
	
function display($msg) {
	if(is_array($msg)){
	
		foreach($msg AS $k=>$v){
			echo "$k\n";
			var_dump($v, 1);
		}
		
	}    
}
	
function exe(string $table_name = null) {
        $modules = [];
        $results = getTables($table_name);

        foreach ($results AS $type => $tables) {
            switch ($type) {
                case "tables":
                    foreach ($tables AS $table_name => $table_fields) {
                        $modules[] = $table_name;
                        createScripts($table_fields);
                    }
                    break;
                case "views":
                    foreach ($tables AS $view_name => $view_fields) {
                        echo "";
                    }
                    break;
                default:
                    echo "";
                    break;
            }
        }
    }
	
	function getTables($table_name = null): array
    {
        global $db;
		
        $where = "";
        if (!is_null($table_name)) {
            $where = " AND table_name LIKE '$table_name'";
        }
        $sql = "SELECT * FROM information_schema.tables WHERE table_schema = 'travelsoft'$where";
        $results = $db->rawQuery($sql);
        $tables = [];

        foreach ($results AS $result) {
            if (isset($result["TABLE_TYPE"])) {
                $table_type = $result["TABLE_TYPE"];
                if (isset($result["TABLE_NAME"])) {
                    $table_name = $result["TABLE_NAME"];
                    switch ($table_type) {
                        case "BASE TABLE":
                            $tables["tables"][$table_name] = $result;
                            break;
                        case "VIEW":
                            $tables["views"][$table_name] = $result;
                            break;
                        default:
                            $tables["other"][$table_name] = $result;
                            break;
                    }
                }
            }
        }

        return $tables;
    }