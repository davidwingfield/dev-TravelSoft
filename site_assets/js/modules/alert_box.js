const AlertBox = (function () {
    "use strict"
    const _alert_box = document.getElementById("alert_box")
    const _alert_message = document.getElementById("alert_message")
    const _alert_title = document.getElementById("alert_title")
    return {
        show: function (msg) {
            /**
             * "0": "Message",
             * "1": "Title",
             * "2": "danger"
             */
            let title = ""
            let level = ""
            let message = ""
            if (arguments) {
                if (arguments[0]) {
                    message = arguments[0]
                }
                
                if (arguments[1]) {
                    if (typeof arguments[1] == "string" || typeof arguments[1] == "number") {
                        title = arguments[1]
                    }
                }
                
                if (arguments[2]) {
                    switch (arguments[2]) {
                        case "danger":
                        case "warning":
                        case "info":
                        case "success":
                        case "secondary":
                        case "light":
                        case "dark":
                            level = arguments[2]
                            break
                        default:
                            level = "warning"
                    }
                }
                if (_alert_box) {
                    $(_alert_box)[0].className = ""
                    $(_alert_message).text(htmlDecode(message))
                    $(_alert_title).text(htmlDecode(title))
                    $(_alert_box)[0].className = `alert alert-${level} alert-dismissible mx-2 fade show`
                    $(_alert_box).show()
                }
                
            }
            
        },
        hide: function () {
            $(_alert_box).hide()
        },
        init: function () {
            
            if (_alert_box) {
                $(_alert_box)[0].className = "alert alert-warning alert-dismissible fade"
            }
            
            AlertBox.hide()
        },
    }
})()

AlertBox.init()
