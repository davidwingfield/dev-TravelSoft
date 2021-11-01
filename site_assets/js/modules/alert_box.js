const AlertBox = (function () {
    "use strict"
    const _alert_box = document.getElementById("alert_box")
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
                            level = arguments[2]
                            break
                        default:
                            level = "warning"
                    }
                }
                
                $(_alert_box).show()
            }
            
        },
        hide: function () {
            $(_alert_box).alert("close")
        },
    }
})()
