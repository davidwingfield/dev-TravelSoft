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
    const _button_clear_form_edit_location = document.getElementById("button_clear_form_edit_location")
    const _button_close_location_edit = document.getElementById("button_close_location_edit")
    const _button_submit_form_edit_location = document.getElementById("button_submit_form_edit_location")
    const _button_edit_location = document.getElementById("button_edit_location")
    const _button_add_location_edit = document.getElementById("button_add_location_edit")
    const _button_close_edit_location_form = document.getElementById("button_close_edit_location_form")
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
    let temp_location = {}
    let new_filter = false
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
    $(_button_close_edit_location_form)
      .on("click", function () {
          populate_form(temp_location)
          
          switch (defaultLocationDisplayFormat) {
              case "short":
                  _location_name_filter.value = temp_location.display_short
                  break
              case "medium":
                  _location_name_filter.value = temp_location.display_medium
                  break
              default:
                  _location_name_filter.value = temp_location.display_long
          }
          _location_id.value = temp_location.id
          
          hide_form()
      })
    
    $(_button_clear_form_edit_location)
      .on("click", function () {
      
      })
    
    $(_button_submit_form_edit_location)
      .on("click", function () {
          save()
      })
    
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
          new_filter = true
          set_detail()
          reset_form()
          populate_form()
      })
    
    $(_button_edit_location)
      .on("click", function () {
          if (_location_id.value === "") {
              //set_detail()
              //reset_form()
              //populate_form()
          } else {
          
          }
          
          show_form()
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
    
    const save = function (params) {
        validated = true
        
        let dataToSend = {
            id: (!isNaN(parseInt(_location_id.value))) ? parseInt(_location_id.value) : null,
            city_id: (!isNaN(parseInt(_location_city_id.value))) ? parseInt(_location_city_id.value) : null,
            province_id: (!isNaN(parseInt(_location_province_id.value))) ? parseInt(_location_province_id.value) : null,
            country_id: (!isNaN(parseInt(_location_province_id.value))) ? parseInt(_location_country_id.value) : null,
            location_types_id: (!isNaN(parseInt(_location_types_id.value))) ? parseInt(_location_types_id.value) : null,
            
            name: (_location_name && _location_name.value !== "") ? _location_name.value : null,
            street: (_location_street && _location_street.value !== "") ? _location_street.value : null,
            street2: (_location_street2 && _location_street2.value !== "") ? _location_street2.value : null,
            zipcode: (_location_zipcode && _location_zipcode.value !== "") ? _location_zipcode.value : null,
            
            created_by: (isNaN(parseInt(_location_id.value))) ? user_id : null,
            modified_by: user_id,
            enabled: 1,
            date_created: (!isNaN(parseInt(_location_id.value))) ? null : formatDateMySQL(),
            date_modified: (!isNaN(parseInt(_location_id.value))) ? formatDateMySQL() : null,
            note: null,
        }
        
        console.log("save", dataToSend)
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
        _location_name.value = ""
        _location_name_filter.value = ""
        _location_id.value = ""
        _location_types_id.value = ""
        _location_street_1.value = ""
        _location_street_2.value = ""
        _location_zipcode.value = ""
        
        $(_location_country_id).val("").trigger("change")
        
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
        
    }
    
    /**
     * populate form fields
     *
     * @param location
     */
    const populate_form = function (location) {
        let country = {}
        let province = {}
        let city = {}
        let type = {}
        if (location) {
            
            switch (defaultLocationDisplayFormat) {
                case "short":
                    _location_name_filter.value = (location.display_short) ? location.display_short : ""
                    break
                case "medium":
                    _location_name_filter.value = (location.display_medium) ? location.display_medium : ""
                    break
                default:
                    _location_name_filter.value = (location.display_long) ? location.display_long : ""
            }
            
            _location_enabled.checked = (location.enabled === 1)
            _location_name.value = location.name
            _location_id.value = location.id
            _location_street_1.value = location.street_1
            _location_street_2.value = location.street_2
            _location_zipcode.value = location.zipcode
            
            if (location.type) {
                type = location.type
                _location_types_id.value = type.id
            }
            
            if (location.country) {
                country = location.country
                Country.id = (country.id) ? country.id.toString() : null
            }
            
            if (location.province) {
                province = location.province
                Province.id = (province.id) ? province.id.toString() : null
            }
            
            if (location.city) {
                city = location.city
                City.id = (city.id) ? city.id.toString() : null
            }
            
            $(_location_country_id).val((country.id) ? country.id : "").trigger("change")
            
        }
        
    }
    
    const set = function (location) {
        
        return set_detail(location)
        
    }
    
    /**
     * set object param values
     *
     * @param location
     * @returns {{note: null, country: {note: null, date_created: *, created_by: (number|number), enabled: number, date_modified: *, name_long: null, modified_by: (number|number), name: null, id: null, iso2: null, sort_order: number, currency_id: null, iso3: null}, city: {note: null, date_modified: *, date_created: *, name: null, modified_by: (number|number), id: null, sort_order: number, created_by: (number|number), enabled: number}, date_created: *, location_types_id: null, type: {note: null, date_modified: *, date_created: *, icon: null, modified_by: (number|number), name: null, id: null, created_by: (number|number), sort_order: number, enabled: number}, created_by: (number|number), enabled: number, display_medium: null, zipcode: null, display_short: null, street_1: null, date_modified: *, province: {note: null, date_modified: *, date_created: *, name_long: null, modified_by: (number|number), name: null, id: null, iso2: null, created_by: (number|number), sort_order: number, enabled: number, iso3: null}, street_2: null, name: null, modified_by: (number|number), display_long: null, id: null}}
     */
    const set_detail = function (location) {
        let detail = _default_detail()
        temp_location = detail
        let country = {}
        let province = {}
        let city = {}
        let type = {}
        if (location) {
            
            if (location.country) {
                country = location.country
            }
            if (location.province) {
                province = location.province
            }
            if (location.city) {
                city = location.city
            }
            if (location.type) {
                type = location.type
            }
        } else {
            location = {}
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
        
        detail.country = {
            created_by: (country.created_by) ? country.created_by : user_id,
            date_created: (country.date_created) ? country.date_created : formatDateMySQL(),
            date_modified: (country.date_modified) ? country.date_modified : formatDateMySQL(),
            currency_id: (country.currency_id) ? country.currency_id : null,
            enabled: (country.enabled) ? country.enabled : 1,
            id: (country.id) ? country.id : null,
            iso2: (country.iso2) ? country.iso2 : null,
            iso3: (country.iso3) ? country.iso3 : null,
            modified_by: (country.modified_by) ? country.modified_by : user_id,
            name: (country.name) ? country.name : null,
            name_long: (country.name_long) ? country.name_long : null,
            note: (country.note) ? country.note : null,
            sort_order: (country.sort_order) ? country.sort_order : 999,
        }
        
        detail.province = {
            created_by: (province.created_by) ? province.created_by : user_id,
            date_created: (province.date_created) ? province.date_created : formatDateMySQL(),
            date_modified: (province.date_modified) ? province.date_modified : formatDateMySQL(),
            enabled: (province.enabled) ? province.enabled : 1,
            id: (province.id) ? province.id : null,
            iso2: (province.iso2) ? province.iso2 : null,
            iso3: (province.iso3) ? province.iso3 : null,
            modified_by: (province.modified_by) ? province.modified_by : user_id,
            name: (province.name) ? province.name : null,
            name_long: (province.name_long) ? province.name_long : null,
            note: (province.note) ? province.note : null,
            sort_order: (province.sort_order) ? province.sort_order : 999,
        }
        
        detail.city = {
            created_by: (city.created_by) ? city.created_by : user_id,
            date_created: (city.date_created) ? city.date_created : formatDateMySQL(),
            date_modified: (city.date_modified) ? city.date_modified : formatDateMySQL(),
            enabled: (city.enabled) ? city.enabled : 1,
            id: (city.id) ? city.id : null,
            modified_by: (city.modified_by) ? city.modified_by : user_id,
            name: (city.name) ? city.name : null,
            note: (city.note) ? city.note : null,
            sort_order: (city.sort_order) ? city.sort_order : 999,
        }
        
        detail.type = {
            created_by: (type.created_by) ? type.created_by : user_id,
            date_created: (type.date_created) ? type.date_created : formatDateMySQL(),
            date_modified: (type.date_modified) ? type.date_modified : formatDateMySQL(),
            enabled: (type.enabled) ? type.enabled : 1,
            icon: (type.icon) ? type.icon : null,
            id: (type.id) ? type.id : null,
            modified_by: (type.modified_by) ? type.modified_by : user_id,
            name: (type.name) ? type.name : null,
            note: (type.note) ? type.note : null,
            sort_order: (type.sort_order) ? type.sort_order : 999,
        }
        
        Province.set_detail(detail.province)
        Country.set_detail(detail.country)
        City.set_detail(detail.city)
        
        Location.detail = detail
        return detail
    }
    
    const init = function (location) {
        validator_init(form_rules)
        let detail = {}
        if (location) {
            detail = set(location)
        }
        
        if (_form_edit_location) {
            //validator = $(_form_edit_location).validate()
            
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
                data: Array.from(City.all.values()),
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
        reset_form()
        populate_form(detail)
        
        init_autocomplete()
        hide_form()
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
        init: function (location) {
            init(location)
        },
        populate_form: function (location) {
            populate_form(location)
        },
    }
    
})()

