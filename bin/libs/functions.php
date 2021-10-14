<?php
    /**
     * functions.php
     *
     * @return ${TYPE_HINT}
     * ${THROWS_DOC}
     */
    function exe(string $table_name = null)
    {
        $modules = [];
        $results = getTables($table_name);
        /*
        echo "<div style='margin-left:.5rem;'>";
        //echo "<h5 style='margin-left:.5rem;'>$name</h5>";
        echo "<pre style='margin-left:.5rem;'>".var_export($objects, 1)."</pre>";
        echo "</div>";
        //*/
        foreach ($results AS $type => $tables) {
            /*
            echo "<div style='margin-left:.5rem;'>";
            echo "<h5 style='margin-left:.5rem;'>$type</h5>";
            echo "<pre style='margin-left:.5rem;'>".var_export($tables, 1)."</pre>";
            echo "</div>";
            //*/
            switch ($type) {
                case "tables":
                    foreach ($tables AS $table_name => $table_fields) {
                        /*
                        echo "<div style='margin-left:.5rem;'>";
                        echo "<h5 style='margin-left:.5rem;'>$table_name</h5>";
                        echo "<pre style='margin-left:.5rem;'>".var_export($table_fields, 1)."</pre>";
                        echo "</div>";
                        //*/
                        $modules[] = $table_name;
                        createObjects($table_fields);
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

        exit("<br>end<br>");
    }

    function parse_ini_file_multi($file, $process_sections = false, $scanner_mode = INI_SCANNER_NORMAL)
    {
        $explode_str = '.';
        $escape_char = "'";
        // load ini file the normal way
        $data = parse_ini_file($file, $process_sections, $scanner_mode);
        if (!$process_sections) {
            $data = array($data);
        }
        foreach ($data as $section_key => $section) {
            // loop inside the section
            foreach ($section as $key => $value) {
                if (strpos($key, $explode_str)) {
                    if (substr($key, 0, 1) !== $escape_char) {
                        // key has a dot. Explode on it, then parse each subkeys
                        // and set value at the right place thanks to references
                        $sub_keys = explode($explode_str, $key);
                        $subs =& $data[$section_key];
                        foreach ($sub_keys as $sub_key) {
                            if (!isset($subs[$sub_key])) {
                                $subs[$sub_key] = [];
                            }
                            $subs =& $subs[$sub_key];
                        }
                        // set the value at the right place
                        $subs = $value;
                        // unset the dotted key, we don't need it anymore
                        unset($data[$section_key][$key]);
                    } // we have escaped the key, so we keep dots as they are
                    else {
                        $new_key = trim($key, $escape_char);
                        $data[$section_key][$new_key] = $value;
                        unset($data[$section_key][$key]);
                    }
                }
            }
        }
        if (!$process_sections) {
            $data = $data[0];
        }

        return $data;
    }

    /**
     * @param null $table_name
     *
     * @throws \Exception
     * @return array
     */
    function getTables($table_name = null): array
    {

        //*
        global $db;
        $where = "";
        if (!is_null($table_name)) {
            $where = " AND table_name LIKE '$table_name'";
        }
        $sql = "SELECT * FROM information_schema.tables WHERE table_schema = '" . DBNAME . "'$where";
        $results = $db->rawQuery($sql);
        var_dump($results, 1);
        $tables = [];
        //*/
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
