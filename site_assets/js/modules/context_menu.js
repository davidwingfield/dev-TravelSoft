const ContextMenu = (function () {
    "use strict"
    
    let $contextMenu
    
    const assignSeasonToDays = function () {
        //console.log("ContextMenu:assignSeasonToDays()", ContextMenu)
    }
    
    const init = function (settings) {
        
        $contextMenu = $.contextMenu({
            selector: ".selected-day",
            callback: function (key, options) {
                switch (key.toLowerCase()) {
                    case "edit":
                        assignSeasonToDays()
                        break
                    default:
                        break
                }
            },
            items: {
                "edit": {
                    name: "Assign Season To Days",
                    icon: "edit",
                },
                "cut": {
                    name: "Cut",
                    icon: "cut",
                },
                "copy": {
                    name: "Copy",
                    icon: "copy",
                },
                "paste": {
                    name: "Paste",
                    icon: "paste",
                },
                "delete": {
                    name: "Delete",
                    icon: "delete",
                },
                "sep1": "---------",
                "quit": {
                    name: "Quit",
                    icon: function () {
                        return 'context-menu-icon context-menu-icon-quit'
                    },
                },
            },
        })
        
        $(".selected-day").on("click", function (e) {
            //console.log("clicked", this)
        })
    }
    
    return {
        init: function (settings) {
            init(settings)
        },
    }
})()
