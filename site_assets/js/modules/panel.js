document.addEventListener("DOMContentLoaded", function () {
    let panelData = document.querySelectorAll("div.panel")
    
    panelData.forEach(el => {
        const $el = $(el)
        const $panelHeading = $el.find("div.panel-heading")
        const $panelActions = $panelHeading.find("div.panel-actions.panel-actions-keep")
        const $panelLinks = $panelActions.find("a.panel-action")
        
        $.each($panelLinks, function (k, elem) {
            let dataToggle = $(elem).attr("data-toggle")
            if (dataToggle) {
                console.log("dataToggle", dataToggle)
                switch (dataToggle) {
                    case "panel-refresh":
                        
                        break
                    case "panel-collapse":
                        console.log("collapse")
                        break
                    case"panel-fullscreen":
                        elem.addEventListener("click", function () {
                            
                            if ($(elem).hasClass("fa-expand")) {
                                $(elem).removeClass("fa-expand")
                                $(elem).addClass("fa-compress")
                                $el.addClass("is-fullscreen")
                            } else if ($(elem).hasClass("fa-compress")) {
                                $(elem).removeClass("fa-compress")
                                $(elem).addClass("fa-expand")
                                $el.removeClass("is-fullscreen")
                            }
                        })
                        console.log("fullscreen")
                        break
                    case "panel-close":
                        console.log("close")
                        break
                    default:
                        break
                }
            }
            
        })
    })
})
