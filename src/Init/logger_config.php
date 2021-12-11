<?php
    
    namespace Framework\Init;
    
    use Logger;
    use LoggerMDC;
    
    /**
     * Short Description
     * Long Description
     *
     * @package            Framework\Init
     */
    function initLogger()
    {
        
        return array(
            //////
            "rootLogger" => array(
                "appenders" => array("default"),
            ),
            //////
            "loggers" => array(
                //////
                "MAIN" => array(
                    "level" => "trace",
                    "appenders" => array("default"),
                ),
                //////
                "ACCESS" => array(
                    "level" => "trace",
                    "appenders" => array("access"),
                ),
                //////
                "MYSQL" => array(
                    "level" => "trace",
                    "appenders" => array("mysql"),
                ),
                //////
                "DEBUG" => array(
                    "level" => "trace",
                    "appenders" => array("debug"),
                ),
                //////
                "IMAGE" => array(
                    "level" => "warn",
                    "appenders" => array("image"),
                ),
                //////
                "BATCH" => array(
                    "level" => "warn",
                    "appenders" => array("batch"),
                ),
                //////
            ),
            //////
            "appenders" => array(
                //////
                "debug" => array(
                    "class" => "LoggerAppenderRollingFile",
                    "layout" => array(
                        "class" => "LoggerLayoutPattern",
                        "params" => array(
                            "conversionPattern" => "%d{m/d/Y H:i:s.u} [%method:%pid] [%p] [IP:%X{ip}] [%F:%L] %m%n",
                        ),
                    ),
                    "params" => array(
                        "file" => $_SERVER["DOCUMENT_ROOT"] . "/var/logs/debug.log",
                        "maxBackupIndex" => 3,
                        "maxFileSize" => "2MB",
                        "compress" => true,
                    ),
                ),
                //////
                "mysql" => array(
                    "class" => "LoggerAppenderRollingFile",
                    "layout" => array(
                        "class" => "LoggerLayoutPattern",
                        "params" => array(
                            "conversionPattern" => "%d{m/d/Y H:i:s.u} [%method:%pid] [%p] [IP:%X{ip}] [%F:%L] %m%n",
                        ),
                    ),
                    "params" => array(
                        "file" => $_SERVER["DOCUMENT_ROOT"] . "/var/logs/mysql.log",
                        "maxBackupIndex" => 3,
                        "maxFileSize" => "2MB",
                        "compress" => true,
                    ),
                ),
                //////
                "access" => array(
                    "class" => "LoggerAppenderRollingFile",
                    "layout" => array(
                        "class" => "LoggerLayoutPattern",
                        "params" => array(
                            "conversionPattern" => "%d{m/d/Y H:i:s.u} [%method:%pid] [%p] [IP:%X{ip}] [%F:%L] %m%n",
                        ),
                    ),
                    "params" => array(
                        "file" => $_SERVER["DOCUMENT_ROOT"] . "/var/logs/access.log",
                        "maxBackupIndex" => 3,
                        "maxFileSize" => "2MB",
                        "compress" => true,
                    ),
                ),
                //////
                "image" => array(
                    "class" => 'LoggerAppenderFile',
                    "layout" => array(
                        "class" => "LoggerLayoutPattern",
                        "params" => array(
                            "conversionPattern" => "%d{m/d/Y H:i:s.u} [%method:%pid] [%p] [IP:%X{ip}] [%F:%L] %m%n",
                        ),
                    ),
                    "params" => array(
                        "file" => $_SERVER["DOCUMENT_ROOT"] . "/var/logs/image.log",
                        "append" => true,
                    ),
                ),
                //////
                "batch" => array(
                    "class" => "LoggerAppenderFile",
                    "layout" => array(
                        "class" => "LoggerLayoutPattern",
                        "params" => array(
                            "conversionPattern" => "%d{m/d/Y H:i:s.u} [%method:%pid] [%p] [IP:%X{ip}] [%F:%L] %m%n",
                        ),
                    ),
                    "params" => array(
                        "file" => $_SERVER["DOCUMENT_ROOT"] . "/var/logs/batch.log",
                        "append" => true,
                    ),
                ),
                //////
                "default" => array(
                    "class" => "LoggerAppenderRollingFile",
                    "layout" => array(
                        "class" => "LoggerLayoutPattern",
                        "params" => array(
                            "conversionPattern" => "%d{m/d/Y H:i:s.u} [%method:%pid] [%p] [IP:%X{ip}] [%F:%L] %m%n"
                            //"conversionPattern" => "%d{m/d/Y H:i:s} [%c] [IP:%X{ip}] [%F:%L] [%method:%pid] %m%n",
                        ),
                    ),
                    "params" => array(
                        "file" => $_SERVER["DOCUMENT_ROOT"] . "/var/logs/event.log",
                        "maxBackupIndex" => 3,
                        "maxFileSize" => "2MB",
                        "compress" => true,
                    ),
                ),
                //////
            ),
        );
        
    }
    
    if (isset($_SERVER["REMOTE_ADDR"])) {
        LoggerMDC::put("ip", $_SERVER["REMOTE_ADDR"]);
    }
    
    Logger::configure(initLogger());
    // ----
    $EVENT_LOGGER = Logger::getLogger("MAIN");
    $ACCESS_LOGGER = Logger::getLogger("ACCESS");
    $DEBUG_LOGGER = Logger::getLogger("DEBUG");
    $IMAGE_LOGGER = Logger::getLogger("IMAGE");
    $BATCH_LOGGER = Logger::getLogger("BATCH");
    $MYSQL_LOGGER = Logger::getLogger("BATCH");
    // ----
    /*
    $EVENT_LOGGER->warn("Access");
    $DEBUG_LOGGER->warn("DEBUG_LOGGER");
    $IMAGE_LOGGER->warn("IMAGE_LOGGER");
    $BATCH_LOGGER->warn("BATCH_LOGGER");
    $ACCESS_LOGGER->warn("ACCESS_LOGGER");
    $MYSQL_LOGGER->warn("MYSQL_LOGGER");
    //*/


