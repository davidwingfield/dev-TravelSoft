const Console = (function () {
    
    return {
        error: function () {
        
        },
        log: function () {
            let title, type, vals
            
            if (DEBUGMODE) {
                if (arguments.length > 0) {
                    if (arguments.length === 1) {
                        title = "Log Object"
                        vals = arguments[0]
                    }
                    
                    if (arguments.length === 2) {
                        
                        if (typeof arguments[0] === "string") {
                            title = arguments[0]
                        } else {
                            title = "Log Object"
                            vals = arguments[0]
                        }
                        
                        if (typeof arguments[1] === "object") {
                            type = " [object] "
                            vals = arguments[1]
                        } else if (typeof arguments[1] === "boolean") {
                            type = " [boolean] "
                            vals = arguments[1]
                        } else if (typeof arguments[1] === "number") {
                            type = " [number] "
                            vals = arguments[1]
                        } else if (typeof arguments[1] === "bigint") {
                            type = " [bigint] "
                            vals = arguments[1]
                        } else if (typeof arguments[1] === "string") {
                            type = " [string] "
                            vals = arguments[1]
                        } else if (typeof arguments[1] === "symbol") {
                            type = " [symbol] "
                            vals = arguments[1]
                        } else if (typeof arguments[1] === "function") {
                            type = " [function] "
                            vals = arguments[1]
                        } else {
                            type = " [other] "
                            vals = arguments[1]
                        }
                        
                        //console.log(title + type, vals)
                    }
                }
            }
        },
    }
})()
