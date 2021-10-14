<?php
    $path = __DIR__;
    $files = array_diff(scandir($path), array(
        '.',
        '..',
    ));

    echo "<script type='text/javascript' src = '/public/js/modules/settings.js' ></script >";
    echo "<script type='text/javascript' src = '/public/js/modules/global.js' ></script >";
    echo "<script type='text/javascript' src = '/public/js/modules/site.js' ></script >";

    foreach ($files AS $k => $file) {
        $path_parts = pathinfo($file);
        $fileDirectory = $path_parts["dirname"];
        $fileBasename = $path_parts["basename"];
        $fileExtension = $path_parts["extension"];
        $fileName = $path_parts["filename"];

        if ($fileExtension === "js" && $fileName !== "global" && $fileName !== "settings" && $fileName !== "site") {
            echo "<script type='text/javascript' src = '/public/js/modules/$fileBasename' ></script >";
        }
    }

