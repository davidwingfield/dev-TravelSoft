$.fn.BuildKeyword = function (keywords) {
    let chip_input_id, chip_container_id, chip_id,
        _chips, _input, _container,
        $input, $container
    let counter = 0
    let editMode = null
    let tags = new Map()
    
    if (!$(this).hasClass("keyword") || !$(this).attr("id")) {
        return
    }
    
    chip_id = $(this).attr("id")
    chip_input_id = chip_id + "_search"
    chip_container_id = chip_id + "_container"
    
    _chips = document.getElementById(chip_id)
    _input = document.getElementById(chip_input_id)
    _container = document.getElementById(chip_container_id)
    
    if (!_container || !_input || !_chips) {
        return
    }
    
    $input = $(_input)
    $container = $(_container)
    
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
            if (e.keyCode === 9) {
                e.preventDefault()
            }
            
            if (e.which === 13 || e.keyCode === 9) {
                add()
                editMode = null
            }
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
                    console.log("tag", tag)
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
