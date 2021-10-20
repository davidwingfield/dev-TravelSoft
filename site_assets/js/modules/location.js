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
    const _location_street_1 = document.getElementById("location_street_1")
    const _location_street_2 = document.getElementById("location_street_2")
    const _location_zipcode = document.getElementById("location_zipcode")
    const _location_name = document.getElementById("location_name")
    const _location_enabled = document.getElementById("location_enabled")
    const _temp_location_id = document.getElementById("temp_location_id")
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
    // ----
    let validator
    let validated = false
    let default_display = default_address_view
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    // ----
    const _default_detail = function () {
        return {
            id: null,
            display_long: null,
            display_medium: null,
            display_short: null,
            location_types_id: null,
            name: null,
            street_1: null,
            street_2: null,
            zipcode: null,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            note: null,
            city: {
                id: null,
                name: null,
                sort_order: 999,
                enabled: 1,
                date_created: formatDateMySQL(),
                created_by: user_id,
                date_modified: formatDateMySQL(),
                modified_by: user_id,
                note: null,
            },
            province: {
                created_by: user_id,
                date_created: formatDateMySQL(),
                date_modified: formatDateMySQL(),
                enabled: 1,
                id: null,
                iso2: null,
                iso3: null,
                modified_by: user_id,
                name: null,
                name_long: null,
                note: null,
                sort_order: 999,
            },
            country: {
                created_by: user_id,
                date_created: formatDateMySQL(),
                date_modified: formatDateMySQL(),
                currency_id: null,
                enabled: 1,
                id: null,
                iso2: null,
                iso3: null,
                modified_by: user_id,
                name: null,
                name_long: null,
                note: null,
                sort_order: 999,
            },
            type: {
                created_by: user_id,
                date_created: formatDateMySQL(),
                date_modified: formatDateMySQL(),
                enabled: 1,
                icon: null,
                id: null,
                modified_by: user_id,
                name: null,
                note: null,
                sort_order: 999,
            },
        }
    }
    
    const handle_location_error = function (msg) {
        toastr.error(msg)
    }
    // ----
    
    $(_location_name_filter)
      .on("click", function () {
          $(this).select()
      })
      .on("change", function () {
          if ($(this).val() === "") {
              //set_detail()
              //reset_form()
              //populate_form()
          }
      })
      .on("search", function () {
          //set_detail()
          //reset_form()
          //populate_form()
      })
    
    $("input[name='location_display']")
      .on("change", function () {
          let selected_value = $("input[name='location_display']:checked").val()
          default_display = selected_value
          init_autocomplete()
          if (Location.detail["display_" + selected_value] !== null) {
              _location_name_filter.value = Location.detail["display_" + selected_value]
          }
      })
    
    const init_autocomplete = function () {
        $(_location_name_filter)
          .autocomplete({
              serviceUrl: "/api/v1.0/autocomplete/locations",
              minChars: 2,
              cache: false,
              dataType: "json",
              triggerSelectOnValidInput: false,
              paramName: "st",
              params: { "default_display": default_display },
              onSelect: function (suggestion) {
                  //Province.set_detail(suggestion.data)
                  //Country.set_detail(suggestion.data)
                  //City.set_detail(suggestion.data)
                  //Location.set_detail(suggestion.data)
                  //populate_form(suggestion.data)
                  if (_form_edit_location) {
                      clear_validation(_form_edit_location)
                  }
              },
              onSearchComplete: function (query, suggestions) {
              },
          })
    }
    
    const init = function (location) {
        validator_init(form_rules)
        reset_form()
        if (location) {
            set(location)
        }
        
        if (_form_edit_location) {
            validator = $(_form_edit_location).validate()
            
            $(_location_country_id).BuildDropDown({
                data: Array.from(Country.all.values()),
                title: "Country",
                id_field: "id",
                text_field: "name",
                first_selectable: false,
            })
            
            $(_location_province_id).BuildDropDown({
                data: Array.from(Province.all.values()),
                title: "Province",
                id_field: "id",
                text_field: "name",
                first_selectable: false,
            })
            
            $(_location_city_id).BuildDropDown({
                data: Array.from(Province.all.values()),
                title: "City",
                id_field: "id",
                text_field: "name",
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
        populate_form(location)
        //hide_form()
    }
    
    const set = function (location) {
        let detail = _default_detail()
        
        if (location) {
            
            detail.city = {
                created_by: (location.city.created_by) ? location.city.created_by : user_id,
                date_created: (location.city.date_created) ? location.city.date_created : formatDateMySQL(),
                date_modified: (location.city.date_modified) ? location.city.date_modified : formatDateMySQL(),
                enabled: (location.city.enabled) ? location.city.enabled : 1,
                id: (location.city.id) ? location.city.id : null,
                modified_by: (location.city.modified_by) ? location.city.modified_by : user_id,
                name: (location.city.name) ? location.city.name : null,
                note: (location.city.note) ? location.city.note : null,
                sort_order: (location.city.sort_order) ? location.city.sort_order : 999,
            }
            
            detail.province = {
                created_by: (location.province.created_by) ? location.province.created_by : user_id,
                date_created: (location.province.date_created) ? location.province.date_created : formatDateMySQL(),
                date_modified: (location.province.date_modified) ? location.province.date_modified : formatDateMySQL(),
                enabled: (location.province.enabled) ? location.province.enabled : 1,
                id: (location.province.id) ? location.province.id : null,
                iso2: (location.province.iso2) ? location.province.iso2 : null,
                iso3: (location.province.iso3) ? location.province.iso3 : null,
                modified_by: (location.province.modified_by) ? location.province.modified_by : user_id,
                name: (location.province.name) ? location.province.name : null,
                name_long: (location.province.name_long) ? location.province.name_long : null,
                note: (location.province.note) ? location.province.note : null,
                sort_order: (location.province.sort_order) ? location.province.sort_order : 999,
            }
            
            detail.country = {
                created_by: (location.country.created_by) ? location.country.created_by : user_id,
                date_created: (location.country.date_created) ? location.country.date_created : formatDateMySQL(),
                date_modified: (location.country.date_modified) ? location.country.date_modified : formatDateMySQL(),
                currency_id: (location.country.currency_id) ? location.country.currency_id : null,
                enabled: (location.country.enabled) ? location.country.enabled : 1,
                id: (location.country.id) ? location.country.id : null,
                iso2: (location.country.iso2) ? location.country.iso2 : null,
                iso3: (location.country.iso3) ? location.country.iso3 : null,
                modified_by: (location.country.modified_by) ? location.country.modified_by : user_id,
                name: (location.country.name) ? location.country.name : null,
                name_long: (location.country.name_long) ? location.country.name_long : null,
                note: (location.country.note) ? location.country.note : null,
                sort_order: (location.country.sort_order) ? location.country.sort_order : 999,
            }
            
            detail.type = {
                created_by: (location.type.created_by) ? location.type.created_by : user_id,
                date_created: (location.type.date_created) ? location.type.date_created : formatDateMySQL(),
                date_modified: (location.type.date_modified) ? location.type.date_modified : formatDateMySQL(),
                enabled: (location.type.enabled) ? location.type.enabled : 1,
                icon: (location.type.icon) ? location.type.icon : null,
                id: (location.type.id) ? location.type.id : null,
                modified_by: (location.type.modified_by) ? location.type.modified_by : user_id,
                name: (location.type.name) ? location.type.name : null,
                note: (location.type.note) ? location.type.note : null,
                sort_order: (location.type.sort_order) ? location.type.sort_order : 999,
            }
            
            detail.id = (location.id) ? location.id : null
            detail.name = (location.name) ? location.name : null
            detail.street_1 = (location.street_1) ? location.street_1 : null
            detail.street_2 = (location.street_2) ? location.street_2 : null
            detail.zipcode = (location.zipcode) ? location.zipcode : null
            detail.display_long = (location.display_long) ? location.display_long : null
            detail.display_medium = (location.display_medium) ? location.display_medium : null
            detail.display_short = (location.display_short) ? location.display_short : null
            detail.enabled = (location.enabled) ? location.enabled : 1
            detail.date_created = (location.date_created) ? location.date_created : formatDateMySQL()
            detail.created_by = (location.created_by) ? location.created_by : user_id
            detail.date_modified = (location.date_modified) ? location.date_modified : formatDateMySQL()
            detail.modified_by = (location.modified_by) ? location.modified_by : user_id
            detail.note = (location.note) ? location.note : null
            
        }
        
        Location.detail = detail
        return detail
    }
    
    const save = function (params) {
    
    }
    
    const get = function (id) {
        let data_to_send = {}
        if (id) {
            data_to_send.id = id
        }
        
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
    
    const reset_form = function () {
        //validated = false
        //validator.resetForm()
        _location_name.value = ""
        _location_name_filter.value = ""
        _location_id.value = ""
        _location_types_id.value = ""
        _location_street_1.value = ""
        _location_street_2.value = ""
        _location_zipcode.value = ""
        _location_country_id.value = ""
        _location_province_id.value = ""
        _location_city_id.value = ""
        
        Province.set_detail()
        Country.set_detail()
        City.set_detail()
        Province.id = null
        City.id = null
        
        switch (defaultLocationDisplayFormat) {
            case "short":
                document.getElementById("location_display_short").checked = true
                break
            case "medium":
                document.getElementById("location_display_medium").checked = true
                break
            default:
                document.getElementById("location_display_long").checked = true
        }
        
        $(_location_country_id).val("").trigger("change")
    }
    
    const populate_form = function (location) {
        
        if (location) {
            console.log("location", location)
            Country.set_detail(location.country)
            Province.set_detail(location.province)
            City.set_detail(location.city)
            
            City.id = location.city.id
            Province.id = location.province.id
            
            switch (defaultLocationDisplayFormat) {
                case "short":
                    _location_name_filter.value = location.display_short
                    break
                case "medium":
                    _location_name_filter.value = location.display_medium
                    break
                default:
                    _location_name_filter.value = location.display_long
            }
            
            $(_location_country_id).val(location.country.id).trigger("change")
            
            _location_enabled.checked = (location.enabled === 1)
            _location_name.value = location.name
            _location_id.value = location.id
            _location_street_1.value = location.street_1
            _location_street_2.value = location.street_2
            _location_zipcode.value = location.zipcode
            _location_types_id.value = location.type.id
            
        }
        
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        types: new Map(),
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
        populate_form: function (location) {
            populate_form(location)
        },
    }
    
})()

