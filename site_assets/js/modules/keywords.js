$.fn.BuildKeyword = function (keywords) {
    if (!$(this).hasClass("keyword")) {
        return
    }
    
    const chip_id = $(this).attr("id")
    const _chips = document.getElementById(chip_id)
    
    let editMode = null
    let tags = new Map()
    let $chipsEl = $(_chips)
    let $submitButton = $(`#${chip_id} > div > div > button`)
    let $input = $(`#${chip_id} > div > input.user-release-input`)
    let counter = 0
    let $container = $(`#${chip_id} > div > div.chips_container`)
    
    if (!keywords) {
        keywords = []
    }
    
    if (typeof keywords === "string") {
        keywords = keywords.split(",").map(function (value) {
            return value.trim()
        })
    }
    
    (function ($) {
        $.event.special.destroyed = {
            remove: function (o) {
                if (o.handler) {
                    o.handler()
                }
            },
        }
    })(jQuery)
    
    $input
        .on("keydown", function (e) {
            console.log(e.keyCode)
            
            if (e.which === 13 || e.keyCode === 9) {
                add()
                editMode = null
            }
        })
    
    $submitButton
        .on("click", function () {
            add()
            editMode = null
        })
    
    const formatTag = function (data) {
        counter += 1
        if (data) {
            let $chip = $("<div>")
            let $closeIcon = $("<i>")
            
            $closeIcon
                .addClass("close fas fa-times")
                .on("click", function (e) {
                    e.stopPropagation()
                    let $chip = $(this).parents("div.chip")
                    deleteDialog(`Would you like to delete?`, (ans) => {
                        if (ans) {
                            $id = $chip.attr("id")
                            chipDelete($chip)
                        }
                    })
                })
            
            $chip
                .addClass("chip blue lighten-4 waves-effect")
                .text(data)
                .append($closeIcon)
                .attr("id", chip_id + "_" + counter)
                .on("click", function (e) {
                    let $chip = $(this)
                    editMode = tags.get($chip.text())
                    let id = $chip.attr("id")
                    chipSelect(id)
                })
            
            // --
            
            return $chip
        }
    }
    
    const chipDelete = function (chip) {
        if (chip) {
            let $chip = chip
            let data = $chip.text()
            
            if (tags.get(data)) {
                $chip.remove()
                tags.delete(data)
            }
        }
    }
    
    const chipSelect = function (id) {
        /*
        if (id) {
            let $chip = $("#" + id)
            let data = $chip.text()
            let tag = tags.get(data)
            if (tag) {
                if (tag) {
                    Console.log("tag", tag)
                    $input.val(data)
                }
                
            }
        }
        //*/
    }
    
    const chipAdd = function (data) {
        let tag = tags.get(data)
        if (tag) {
            toastr.error(`A tag for ${data} already exists`)
            tags.set(data, tag)
        } else {
            if (editMode) {
            
            } else {
            
            }
            let tag = formatTag(data)
            if (tag) {
                tags.set(data, tag)
                if ($container) {
                    $container.append(tag)
                }
            }
        }
    }
    
    const init = function (keywords) {
        $.each(keywords, function (k, data) {
            if (data) {
                add(data)
            }
        })
    }
    
    const add = function (data) {
        Console.log("add(data)", data)
        if (!data) {
            data = $input.val()
        }
        
        if (data !== "") {
            chipAdd(data)
            $input.val("")
        }
    }
    
    init(keywords)
    
    return {
        add: function (data) {
            chipAdd(data)
        },
        delete: function (data) {
            chipDelete(data)
        },
        build: function () {
            let results = []
            let t = Array.from(tags.values())
            for (let n = 0; n < t.length; n++) {
                let tag_element = t[n]
                let data = tag_element.text()
                results.push(data)
            }
            return results.join(",")
        },
        init: function () {
            init()
        },
    }
}
