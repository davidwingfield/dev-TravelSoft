const Location = (function () {
    "use strict"
    
    const _form_edit_location = document.getElementById("form_edit_location")
    const _form_location_details = document.getElementById("form_location_details")
    const _location_types_id = document.getElementById("location_types_id")
    const _location_name_filter = document.getElementById("location_name_filter")
    const _location_city_id = document.getElementById("location_city_id")
    const _location_country_id = document.getElementById("location_country_id")
    const _location_province_id = document.getElementById("location_province_id")
    const _location_id = document.getElementById("location_id")
    const _location_street = document.getElementById("location_street")
    const _location_street2 = document.getElementById("location_street2")
    const _location_zipcode = document.getElementById("location_zipcode")
    const _location_name = document.getElementById("location_name")
    const _temp_location_id = document.getElementById("temp_location_id")
    // -- Buttons
    const _button_close_location_edit = document.getElementById("button_close_location_edit")
    const _button_submit_form_edit_location = document.getElementById("button_submit_form_edit_location")
    const _button_edit_location = document.getElementById("button_edit_location")
    const _button_add_location_edit = document.getElementById("button_add_location_edit")
    
    const form_rules = {
        rules: {
            location_types_id: {
                required: true,
                digits: true,
            },
            location_city_id: {
                required: true,
                digits: true,
            },
            location_country_id: {
                required: true,
                digits: true,
            },
            location_province_id: {
                required: true,
                digits: true,
            },
            location_name: { required: true },
        },
        messages: {
            location_types_id: {
                required: "field required",
                digits: "invalid",
            },
            location_city_id: {
                required: "field required",
                digits: "invalid",
            },
            location_country_id: {
                required: "field required",
                digits: "invalid",
            },
            location_province_id: {
                required: "field required",
                digits: "invalid",
            },
            location_id: {
                required: "field required",
                digits: "invalid",
            },
            location_name: { required: "field required" },
        },
    }
    
    let validator
    let validated = false
    let default_display = default_address_view
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    //
    $(_location_name_filter)
      .on("click", function () {
      
      })
    const handle_location_error = function (msg) {
        toastr.error(msg)
    }
    
    const _default_detail = function () {
        return {
            id: null,
            city_id: null,
            province_id: null,
            country_id: null,
            location_types_id: null,
            name: null,
            street: null,
            street2: null,
            zipcode: null,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            note: null,
        }
    }
    
    const save = function (params) {
    
    }
    
    const get = function (id) {
        let data_to_send = {}
        if (id) {
            data_to_send.id = id
        }
        
    }
    
    const init = function (settings) {
        validator_init(form_rules)
        validator = $(_form_edit_location).validate()
        
        if (settings) {
            if (settings.types.location_types) {
                Location.types = buildMap(settings.types.location_types, "location_types_id")
            }
        }
        
        if (_form_edit_location) {
            
            $(_location_types_id).BuildDropDown({
                data: Array.from(Location.types.values()),
                title: "Location Types",
                id_field: "location_types_id",
                text_field: "location_types_name",
                first_selectable: false,
            })
            
            $(_location_country_id).BuildDropDown({
                data: Array.from(Country.all.values()),
                title: "Country",
                id_field: "country_id",
                text_field: "country_name",
                first_selectable: false,
            })
            
            $(_location_province_id).BuildDropDown({
                data: Array.from(Province.all.values()),
                title: "Province",
                id_field: "province_id",
                text_field: "province_name",
                first_selectable: false,
            })
            
            $(_location_city_id).BuildDropDown({
                data: Array.from(Province.all.values()),
                title: "City",
                id_field: "city_id",
                text_field: "city_name",
                first_selectable: false,
            })
            
            Country.init({
                dropdowns: [
                    "location_country_id",
                ],
            })
            Province.init({
                dropdowns: [
                    "location_province_id",
                ],
            })
            City.init({
                dropdowns: [
                    "location_city_id",
                ],
            })
            
        }
        
        init_autocomplete()
        hide_form()
    }
    
    const disable = function () {
        let location_displays = document.getElementsByName("location_display")
        $.each(location_displays, function (i, elem) {
            elem.disabled = true
        })
        _location_name_filter.disabled = true
        _button_edit_location.disabled = true
    }
    
    const enable = function () {
        let location_displays = document.getElementsByName("location_display")
        $.each(location_displays, function (i, elem) {
            elem.disabled = false
        })
        _location_name_filter.disabled = false
        _button_edit_location.disabled = false
    }
    
    const show_form = function () {
        disable()
        $(_form_location_details).show()
    }
    
    const hide_form = function () {
        enable()
        $(_form_location_details).hide()
    }
    
    const set = function (location) {
        let detail = _default_detail()
        if (location) {
            detail.id = (location.id) ? location.id : null
            detail.city_id = (location.city_id) ? location.city_id : null
            detail.province_id = (location.province_id) ? location.province_id : null
            detail.country_id = (location.country_id) ? location.country_id : null
            detail.location_types_id = (location.location_types_id) ? location.location_types_id : null
            detail.name = (location.name) ? location.name : null
            detail.street = (location.street) ? location.street : null
            detail.street2 = (location.street2) ? location.street2 : null
            detail.zipcode = (location.zipcode) ? location.zipcode : null
            detail.enabled = (location.enabled) ? location.enabled : 1
            detail.date_created = (location.date_created) ? location.date_created : formatDateMySQL()
            detail.created_by = (location.created_by) ? location.created_by : created_by
            detail.date_modified = (location.date_modified) ? location.date_modified : formatDateMySQL()
            detail.modified_by = (location.modified_by) ? location.modified_by : modified_by
            detail.note = (location.note) ? location.note : null
        }
        
        Location.detail = detail
        return detail
    }
    
    const load_all = function (locations) {
        Location.all = new Map()
        
        if (!locations) {
            return
        }
        $.each(locations, function (i, location) {
            let detail = set(location)
            Location.all.set("id", detail)
        })
        
        console.log(" Location.all", Location.all)
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        get: function (params) {
            get(params)
        },
        load_all: function (params) {
            load_all(params)
        },
        save: function (params) {
            save(params)
        },
        init: function (settings) {
            init(settings)
        },
    }
    
})()
