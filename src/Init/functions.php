<?php
    
    function esc_url($url)
    {
        
        if ('' == $url) {
            return $url;
        }
        
        $url = preg_replace('|[^a-z0-9-~+_.?#=!&;,/:%@$\|*\'()\\x80-\\xff]|i', '', $url);
        
        $strip = array(
            '%0d',
            '%0a',
            '%0D',
            '%0A',
        );
        $url = (string)$url;
        
        $count = 1;
        while ($count) {
            $url = str_replace($strip, '', $url, $count);
        }
        
        $url = str_replace(';//', '://', $url);
        
        $url = htmlentities($url);
        
        $url = str_replace('&amp;', '&#038;', $url);
        $url = str_replace("'", '&#039;', $url);
        
        if ($url[0] !== '/') {
            // We're only interested in relative links from $_SERVER['PHP_SELF']
            return '';
        } else {
            return $url;
        }
    }
    
    function adjustBrightness($hex, $steps): string
    {
        // Steps should be between -255 and 255. Negative = darker, positive = lighter
        $steps = max(-255, min(255, $steps));
        
        // Normalize into a six character long hex string
        $hex = str_replace('#', '', $hex);
        if (strlen($hex) == 3) {
            $hex = str_repeat(substr($hex, 0, 1), 2) . str_repeat(substr($hex, 1, 1), 2) . str_repeat(substr($hex, 2, 1), 2);
        }
        
        // Split into three parts: R, G and B
        $color_parts = str_split($hex, 2);
        $return = '#';
        
        foreach ($color_parts as $color) {
            $color = hexdec($color);                                  // Convert to decimal
            $color = max(0, min(255, $color + $steps));               // Adjust color
            $return .= str_pad(dechex($color), 2, '0', STR_PAD_LEFT); // Make two char hex code
        }
        
        return $return;
    }
    
    function displayJsonOnPage(array $values = [], string $name = "Test Value")
    {
        $json = json_encode($values, 1);
        $title = $name;
        echo "
            <div class='panel'>
                <div class='panel-heading'>
                    <h3 class='panel-title'>$title</h3>
                    <div class='panel-actions panel-actions-keep'>
                        <a class='panel-action fas fa-expand' data-toggle='panel-fullscreen' aria-hidden='true'></a>
                    </div>
                </div>
                <div class='panel-body p-2 panel-code' data-datatype='jsonp'>
                    $json
                </div>
            </div>
    ";
    }
    
    function getLetterCombo(string $name = null): string
    {
        if (!isset($name) || is_null($name)) {
            return "ERR";
        }
        
        $except = array(
            strtoupper('and'),
            strtoupper('the'),
            strtoupper('at'),
            strtoupper('in'),
        );
        $letterCombo = "";
        $name = trim($name);
        $input = 'Lorem Ipsum is simply dummy text of the printing industry.';
        $words = [];
        
        preg_match_all('/(?<match>\w{3,}+)/', strtoupper($name), $matches, PREG_PATTERN_ORDER);
        
        $temp = array_diff($matches['match'], $except);
        
        foreach ($temp AS $word) {
            $words[] = $word;
        }
        
        if (count($words) === 1) {
            
            $word1 = strtoupper($words[0]);
            
            if (strlen($word1) >= 4) {
                $letterCombo = substr(strtoupper($word1), 0, 4);
            } else if (strlen($word1) === 3) {
                $letterCombo = "X" . substr(strtoupper($word1), 0, 3);
            } else if (strlen($word1) === 2) {
                $letterCombo = "XX" . substr(strtoupper($word1), 0, 2);
            } else if (strlen($word1) === 1) {
                $letterCombo = "XXX" . substr(strtoupper($word1), 0, 1);
            } else {
                $letterCombo = "XXXX";
            }
            
        } else if (count($words) === 2) {
            
            $word1 = strtoupper($words[0]);
            $word2 = strtoupper($words[1]);
            
            if (strlen($word1) >= 2) {
                $letterCombo1 = substr(strtoupper($word1), 0, 2);
            } else if (strlen($word1) === 1) {
                $letterCombo1 = "X" . substr(strtoupper($word1), 0, 1);
            } else {
                $letterCombo1 = "XX";
            }
            
            if (strlen($word2) >= 2) {
                $letterCombo2 = substr(strtoupper($word2), 0, 2);
            } else if (strlen($word2) === 1) {
                $letterCombo2 = "X" . substr(strtoupper($word2), 0, 1);
            } else {
                $letterCombo2 = "XX";
            }
            
            $letterCombo = $letterCombo1 . $letterCombo2;
            
        } else if (count($words) === 3) {
            
            $word1 = strtoupper($words[0]);
            $word2 = strtoupper($words[1]);
            $word3 = strtoupper($words[2]);
            
            if (strlen($word1) >= 2) {
                $letterCombo1 = substr(strtoupper($word1), 0, 2);
            } else if (strlen($word1) === 1) {
                $letterCombo1 = "X" . substr(strtoupper($word1), 0, 1);
            } else {
                $letterCombo1 = "XX";
            }
            
            if (strlen($word2) >= 1) {
                $letterCombo2 = substr(strtoupper($word2), 0, 1);
            } else {
                $letterCombo2 = "X";
            }
            
            if (strlen($word3) >= 1) {
                $letterCombo3 = substr(strtoupper($word3), 0, 1);
            } else {
                $letterCombo3 = "X";
            }
            
            $letterCombo = $letterCombo1 . $letterCombo2 . $letterCombo3;
            
        } else if (count($words) >= 4) {
            
            $word1 = strtoupper($words[0]);
            $word2 = strtoupper($words[1]);
            $word3 = strtoupper($words[2]);
            $word4 = strtoupper($words[3]);
            
            if (strlen($word1) >= 1) {
                $letterCombo1 = substr(strtoupper($word1), 0, 1);
            } else {
                $letterCombo1 = "X";
            }
            
            if (strlen($word2) >= 1) {
                $letterCombo2 = substr(strtoupper($word2), 0, 1);
            } else {
                $letterCombo2 = "X";
            }
            
            if (strlen($word3) >= 1) {
                $letterCombo3 = substr(strtoupper($word3), 0, 1);
            } else {
                $letterCombo3 = "X";
            }
            
            if (strlen($word4) >= 1) {
                $letterCombo4 = substr(strtoupper($word4), 0, 1);
            } else {
                $letterCombo4 = "X";
            }
            
            $letterCombo = $letterCombo1 . $letterCombo2 . $letterCombo3 . $letterCombo4;
            
        } else {
            
            $letterCombo = "XXXX";
            
        }
        
        return $letterCombo;
    }
    
    function buildCode(int $id = null, string $name = null, string $type = null): string
    {
        $errors = [];
        $code = "";
        $lead = "X";
        if (!isset($type) || is_null($id)) {
            $errors[] = "<div class=''>empty value: id</div>";
        }
        
        if (!isset($type) || is_null($name)) {
            $errors[] = "<div class=''>empty value: name</div>";
        }
        
        if (!isset($type) || is_null($type)) {
            $errors[] = "<div class=''>empty value: type</div>";
        }
        
        if (count($errors) > 0) {
            $errors = implode("", $errors);
            exit(0);
        } else {
            $letters = getLetterCombo($name);
            $decString = "$id";
            $length = 11 - strlen($decString);
            $numbers = "";
            for ($n = 0; $n < $length; $n++) {
                $numbers .= "0";
            }
            $numbers .= $id;
            
            $code = $numbers . "-" . $letters;
        }
        
        switch (strtolower($type)) {
            case "unit":
                $code = "UN-" . $code;
                break;
            case "season":
                $code = "SE-" . $code;
                break;
            case "variant":
                $code = "VA-" . $code;
                break;
            case "provider":
                $code = "PR-" . $code;
                break;
            case "vendor":
                $code = "VE-" . $code;
                break;
            default:
                $code = "XX-" . $code;
            
        }
        
        return $code;
    }
