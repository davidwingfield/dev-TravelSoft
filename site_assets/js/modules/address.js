const Address = (function () {
    "use strict"
    
    const base_url = "/address"
    const _button_clear_form_edit_address = document.getElementById("button_clear_form_edit_address")
    const _button_submit_form_edit_address = document.getElementById("button_submit_form_edit_address")
    const _form_edit_address = document.getElementById("form_edit_address")
    const _address_id = document.getElementById("address_id")
    const _address_enabled = document.getElementById("address_enabled")
    const _address_street_1 = document.getElementById("address_street_1")
    const _address_street_2 = document.getElementById("address_street_2")
    const _address_street_3 = document.getElementById("address_street_3")
    const _address_country_id = document.getElementById("address_country_id")
    const _address_types_id = document.getElementById("address_types_id")
    const _address_province_id = document.getElementById("address_province_id")
    const _address_city_id = document.getElementById("address_city_id")
    const _address_postal_code = document.getElementById("address_postal_code")
    const _card_edit_address_form = document.getElementById("card_edit_address_form")
    const _table_address = document.getElementById("table_address")
    const _button_add_address_table = document.getElementById("button_add_address_table")
    const _button_close_edit_address_form = document.getElementById("button_close_edit_address_form")
    // ----
    let default_display = default_address_view
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let $address_table = $(_table_address)
    let temp_address = {}
    // ----
    $(_button_add_address_table)
      .on("click", function () {
          $address_table.clearSelectedRows()
          clear_form()
          load_form()
      })
    $(_button_clear_form_edit_address)
      .on("click", function () {
          $address_table.clearSelectedRows()
          clear_form()
      })
    $(_button_submit_form_edit_address)
      .on("click", function () {
          alert()
      })
    $(_button_close_edit_address_form)
      .on("click", function () {
          $address_table.clearSelectedRows()
          clear_form()
          unload_form()
      })
    
    /**
     * handle_address_error
     *
     * @param msg
     */
    const handle_address_error = function (msg) {
        toastr.error(msg)
    }
    
    /**
     * sets objects default values
     *
     * @returns {{note: null, country: {note: null, date_modified: *, date_created: *, name: null, modified_by: number, id: null, iso2: null, sort_order: number, created_by: number, currency_id: null, enabled: number, iso3: null}, medium_address_formatted: null, city: {note: null, date_modified: *, province_id: null, date_created: *, name: null, modified_by: number, id: null, sort_order: number, created_by: number, enabled: number}, date_created: *, created_by: number, enabled: number, short_address_formatted: null, long_address_formatted: null, street_1: null, date_modified: *, province: {note: null, date_modified: *, date_created: *, name: null, modified_by: number, id: null, iso2: null, sort_order: number, created_by: number, country_id: null, enabled: number, iso3: null}, street_3: null, street_2: null, modified_by: number, id: null, postal_code: null}}
     * @private
     */
    const _default_detail = function () {
        return {
            id: null,
            street_1: null,
            street_2: null,
            street_3: null,
            postal_code: null,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: parseInt(user_id),
            date_modified: formatDateMySQL(),
            modified_by: parseInt(user_id),
            note: null,
            short_address_formatted: null,
            medium_address_formatted: null,
            long_address_formatted: null,
            country: {
                id: null,
                name: null,
                iso2: null,
                iso3: null,
                currency_id: null,
                sort_order: 999,
                enabled: 1,
                date_created: formatDateMySQL(),
                created_by: parseInt(user_id),
                date_modified: formatDateMySQL(),
                modified_by: parseInt(user_id),
                note: null,
            },
            province: {
                id: null,
                country_id: null,
                name: null,
                iso2: null,
                iso3: null,
                sort_order: 999,
                enabled: 1,
                date_created: formatDateMySQL(),
                created_by: parseInt(user_id),
                date_modified: formatDateMySQL(),
                modified_by: parseInt(user_id),
                note: null,
            },
            city: {
                id: null,
                province_id: null,
                name: null,
                sort_order: 999,
                enabled: 1,
                date_created: formatDateMySQL(),
                created_by: parseInt(user_id),
                date_modified: formatDateMySQL(),
                modified_by: parseInt(user_id),
                note: null,
            },
        }
    }
    
    const save = function (params) {
    
    }
    
    const get = function () {
        let data_to_send = {}
        
    }
    
    const clear_form = function () {
        log("Address.clear_form")
        _address_id.value = ""
        _address_enabled.checked = true
        _address_street_1.value = ""
        _address_street_2.value = ""
        _address_street_3.value = ""
        _address_postal_code.value = ""
        $(_address_types_id).val([])
        $(_address_country_id).val("").trigger("change")
    }
    
    const populate_form = function (address) {
        if (address) {
            _address_id.value = (address.id) ? address.id : null
            $(_address_types_id).val((address.address_types_id) ? address.address_types_id : [])
            _address_enabled.checked = (address.enabled === 1)
            _address_street_1.value = (address.street_1) ? address.street_1 : null
            _address_street_2.value = (address.street_2) ? address.street_2 : null
            _address_street_3.value = (address.street_3) ? address.street_3 : null
            _address_postal_code.value = (Address.detail.postal_code) ? Address.detail.postal_code : null
            Province.id = address.province.id
            Country.id = address.country.id
            City.id = Address.detail.city.id
            
            $(_address_country_id).val((Address.detail.country.id) ? Address.detail.country.id : "").trigger("change")
        }
    }
    
    /**
     * reset address edit form
     */
    const reset_form = function () {
        _address_id.value = ""
        $(_address_types_id).val([])
        _address_enabled.checked = true
        _address_street_1.value = ""
        _address_street_2.value = ""
        _address_street_3.value = ""
        _address_country_id.value = ""
        _address_province_id.value = ""
        _address_city_id.value = ""
        _address_postal_code.value = ""
    }
    
    /**
     * shows address edit form
     */
    const unload_form = function () {
        if (_card_edit_address_form) {
            $(_card_edit_address_form).hide()
        }
    }
    
    /**
     * hides address edit form
     */
    const load_form = function (address) {
        if (address) {
            populate_form(address)
            if (_card_edit_address_form) {
                $(_card_edit_address_form).show()
            }
        }
        
    }
    
    const build_table = function () {
        let table_address_render_value = default_display + "_address_formatted"
        if (!$.fn.DataTable.isDataTable(_table_address)) {
            $address_table = $(_table_address).table({
                table_type: "display_list",
                data: Array.from(Address.all.values()),
                columnDefs: [
                    {
                        title: "ID",
                        targets: 0,
                        data: "id",
                        render: function (data, type, row, meta) {
                            return data
                        },
                    },
                    {
                        title: "Address",
                        targets: 1,
                        data: table_address_render_value,
                        render: function (data, type, row, meta) {
                            return data
                        },
                    },
                ],
                rowClick: Address.navigate,
            })
        }
    }
    
    /**
     * load address into object
     * @param addresses
     */
    const load_all = function (addresses) {
        Address.all = new Map()
        if (addresses) {
            $.each(addresses, function (i, address) {
                let detail = set_detail(address)
                Address.all.set(detail.id, detail)
                $address_table.insertRow(detail)
            })
        }
    }
    
    const init = function (addresses) {
        if (_table_address) {
            build_table()
        }
        if (_form_edit_address) {
            
            $(_address_country_id).BuildDropDown({
                data: Array.from(Country.all.values()),
                title: "Country",
                id_field: "id",
                text_field: "name",
                first_selectable: false,
            })
            
            $(_address_province_id).BuildDropDown({
                data: Array.from(Province.all.values()),
                title: "Province",
                id_field: "id",
                text_field: "name",
                first_selectable: false,
            })
            
            $(_address_city_id).BuildDropDown({
                data: Array.from(Province.all.values()),
                title: "City",
                id_field: "id",
                text_field: "name",
                first_selectable: false,
            })
            
            Country.init({
                dropdowns: [
                    "address_country_id",
                ],
            })
            Province.init({
                dropdowns: [
                    "address_province_id",
                ],
            })
            City.init({
                dropdowns: [
                    "address_city_id",
                ],
            })
            
        }
    }
    
    const set_detail = function (address) {
        let detail = _default_detail()
        if (address) {
            detail.country = {
                id: parseInt((address.country.id) ? address.country.id : null),
                name: (address.country.name) ? address.country.name : null,
                name_long: (address.country.name_long) ? address.country.name_long : null,
                currency_id: parseInt((address.country.currency_id) ? address.country.currency_id : null),
                iso2: (address.country.iso2) ? address.country.iso2 : null,
                iso3: (address.country.iso3) ? address.country.iso3 : null,
                sort_order: parseInt((address.country.sort_order) ? address.country.sort_order : 999),
                enabled: parseInt((address.country.enabled) ? address.country.enabled : 1),
                date_created: (address.country.date_created) ? address.country.date_created : formatDateMySQL(),
                created_by: parseInt((address.country.created_by) ? address.country.created_by : user_id),
                date_modified: (address.country.date_modified) ? address.country.date_modified : formatDateMySQL(),
                modified_by: parseInt((address.country.modified_by) ? address.country.modified_by : user_id),
                note: (address.country.note) ? address.country.note : null,
                
            }
            detail.province = {
                id: parseInt((address.province.id) ? address.province.id : null),
                country_id: parseInt((address.country.id) ? address.country.id : null),
                name: (address.province.name) ? address.province.name : null,
                iso2: (address.province.iso2) ? address.province.iso2 : null,
                iso3: (address.province.iso3) ? address.province.iso3 : null,
                sort_order: parseInt((address.province.sort_order) ? address.province.sort_order : 999),
                enabled: parseInt((address.province.enabled) ? address.province.enabled : 1),
                date_created: (address.province.date_created) ? address.province.date_created : formatDateMySQL(),
                created_by: parseInt((address.province.created_by) ? address.province.created_by : user_id),
                date_modified: (address.province.date_modified) ? address.province.date_modified : formatDateMySQL(),
                modified_by: parseInt((address.province.modified_by) ? address.province.modified_by : user_id),
                note: (address.province.note) ? address.province.note : null,
            }
            detail.city = {
                id: parseInt((address.city.id) ? address.city.id : null),
                province_id: parseInt((address.province.id) ? address.province.id : null),
                name: (address.city.name) ? address.city.name : null,
                sort_order: parseInt((address.city.sort_order) ? address.city.sort_order : 999),
                enabled: parseInt((address.city.enabled) ? address.city.enabled : 1),
                date_created: (address.city.date_created) ? address.city.date_created : formatDateMySQL(),
                created_by: parseInt((address.city.created_by) ? address.city.created_by : user_id),
                date_modified: (address.city.date_modified) ? address.city.date_modified : formatDateMySQL(),
                modified_by: parseInt((address.city.modified_by) ? address.city.modified_by : user_id),
                note: (address.city.note) ? address.city.note : null,
            }
            detail.id = parseInt((address.id) ? address.id : null)
            detail.address_types_id = getListOfIds(address.address_types_id)
            detail.short_address_formatted = (address.short_address_formatted) ? address.short_address_formatted : null
            detail.medium_address_formatted = (address.medium_address_formatted) ? address.medium_address_formatted : null
            detail.long_address_formatted = (address.long_address_formatted) ? address.long_address_formatted : null
            detail.street_1 = (address.street_1) ? address.street_1 : null
            detail.street_2 = (address.street_2) ? address.street_2 : null
            detail.street_3 = (address.street_3) ? address.street_3 : null
            detail.postal_code = (address.postal_code) ? address.postal_code : null
            detail.enabled = parseInt((address.enabled) ? address.enabled : 1)
            detail.date_created = (address.date_created) ? address.date_created : formatDateMySQL()
            detail.created_by = parseInt((address.created_by) ? address.created_by : user_id)
            detail.date_modified = (address.date_modified) ? address.date_modified : formatDateMySQL()
            detail.modified_by = parseInt((address.modified_by) ? address.modified_by : user_id)
            detail.note = (address.note) ? address.note : null
        }
        temp_address = detail
        Address.detail = detail
        return detail
    }
    
    const set = function (address) {
        log("Address.set")
        let detail = set_detail(address)
        clear_form()
        populate_form(detail)
    }
    
    const navigate = function (address) {
        if (address) {
            reset_form()
            populate_form(address)
        }
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        navigate: function (address) {
            navigate(address)
        },
        get: function (params) {
            get(params)
        },
        load_all: function (params) {
            load_all(params)
        },
        save: function (params) {
            save(params)
        },
        init: function (addresses) {
            init(addresses)
        },
    }
    
})()
