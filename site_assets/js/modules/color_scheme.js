const ColorScheme = (function () {
    "use strict"
    const _product_edit_season_id = document.getElementById("product_edit_season_id")
    const _season_id = document.getElementById("season_id")
    const _edit_scheme = document.getElementById("edit_scheme")
    const _form_edit_scheme = document.getElementById("form_edit_scheme")
    const _product_edit_season_id_name_display = document.getElementById("product_edit_season_id_name_display")
    const _button_close_edit_scheme = document.getElementById("button_close_edit_scheme")
    let season_toggle_items
    
    $(_button_close_edit_scheme)
        .on("click", function () {
            $(_edit_scheme).hide()
        })
    
    $(_season_id)
        .on("click", function () {
            $(_edit_scheme).show()
        })
    
    const reset_form = function () {
    
    }
    
    const load_form = function (scheme) {
        if (scheme) {
        
        }
    }
    
    const edit = function (el) {
        $(".color_scheme_block").removeClass("active")
        $(el).addClass("active")
    }
    
    const load_all = function (swatches) {
        ColorScheme.all = new Map()
        if (swatches) {
            $.each(swatches, function (k, swatch) {
                ColorScheme.all.set(parseInt(swatch.id), swatch)
            })
        }
    }
    
    const init = function (settings) {
        if (settings) {
            if (settings.swatches) {
                load_all(settings.swatches)
            }
        }
        
        season_toggle_items = document.querySelectorAll(".season_toggle_item")
        season_toggle_items.forEach(el => el.addEventListener("click", event => {
            let color_scheme_id = parseInt(el.dataset.colorschemeid)
            let scheme = ColorScheme.all.get(color_scheme_id)
            if (scheme) {
                load(scheme)
            }
        }))
    }
    
    const load = function (scheme) {
        if (scheme) {
            let background_color = (scheme.background_color) ? scheme.background_color : null
            let border_color = (scheme.border_color) ? scheme.border_color : null
            let color_scheme_id = parseInt(scheme.id)
            let text_color = (scheme.text_color) ? scheme.text_color : null
            let scheme_name = (scheme.name) ? scheme.name : null
            let elem = document.querySelector("#product_edit_season_id")
            
            $(_product_edit_season_id_name_display).text(`
                    ${scheme_name}
                `)
            
            $("a.dropdown-item.season_toggle_item").removeClass("active")
            $(`a#${color_scheme_id}`).addClass("active")
            elem.style.setProperty("color", text_color, 'important')
            elem.style.setProperty("background-color", background_color, 'important')
            elem.style.setProperty("border-color", border_color, 'important')
        }
    }
    
    const disable = function () {
        let elem = document.querySelector("#product_edit_season_id")
        $(elem).addClass("disabled")
    }
    
    const enable = function () {
        let elem = document.querySelector("#product_edit_season_id")
        $(elem).removeClass("disabled")
    }
    
    const change = function (el) {
        //console.log("ColorScheme:change(el)", el)
    }
    
    return {
        all: new Map(),
        disable: function () {
            disable()
        },
        enable: function () {
            enable()
        },
        load: function (scheme) {
            load(scheme)
        },
        edit: function (el) {
            edit(el)
        },
        change: function (el) {
            change(el)
        },
        init: function (settings) {
            init(settings)
            disable()
        },
    }
})()

$.fn.ColorScheme = function (settings) {
    //console.log("Test", Types.color_scheme)
    
}
