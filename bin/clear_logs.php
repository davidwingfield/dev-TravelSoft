<?php
    /**
     * clear_debug_log.php
     *
     * @return ${TYPE_HINT}
     * ${THROWS_DOC}
     */

    $logs = array(
        "debug",
        "event",
        "accesoos",
        "mysql",
        "batch",
        "file",
    );

    function emptyLog($log)
    {
        global $logs;
        $logFile = "../var/logs/$log.log";

        if (!file_exists($logFile)) {
            echo "\t** $logFile Was not found. Create? (yes / no): ";
            $handle = fopen("php://stdin", "r");
            $line = fgets($handle);
            $continue = trim($line);

            if (strtoupper($continue) === "YES" || strtoupper($continue) === "Y") {
                $my_file = fopen($logFile, "w");
                fclose($my_file);

                echo "\t** $logFile Was created.\n";

            }
        }

        if (is_file($logFile)) {
            $myRequest = fopen($logFile, "w") or die("Unable to open file!");
            $status = fwrite($myRequest, "");
            fclose($myRequest);
        }

        return true;
    }

    function clear(string $log = "all")
    {
        global $logs;
        if ($log === "all") {
            foreach ($logs AS $log) {
                if (emptyLog($log)) {
                    echo "\t - $log was cleared.\n";
                } else {
                    echo "\t ** $log was not cleared. **\n";
                }
            }
        } else {
            emptyLog($log);
        }
    }

    echo "Which Log to Clear (empty for all): ";
    $handle = fopen("php://stdin", "r");
    $line = fgets($handle);
    $table = trim($line);

    if ($table === "") {
        $table = "all";
    }

    clear($table);
    exit(1);
