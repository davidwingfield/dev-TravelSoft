const Address = (function () {
    "use strict"
    const _button_add_address_table = document.getElementById("button_add_address_table")
    const _button_close_edit_address_form = document.getElementById("button_close_edit_address_form")
    const _button_clear_form_edit_address = document.getElementById("button_clear_form_edit_address")
    const _button_submit_form_edit_address = document.getElementById("button_submit_form_edit_address")
    const _form_edit_address = document.getElementById("form_edit_address")
    const _card_edit_address_form = document.getElementById("card_edit_address_form")
    const _table_address = document.getElementById("table_address")
    const _address_id = document.getElementById("address_id")
    const _company_id = document.getElementById("company_id")
    const _address_enabled = document.getElementById("address_enabled")
    const _address_street_1 = document.getElementById("address_street_1")
    const _address_street_2 = document.getElementById("address_street_2")
    const _address_street_3 = document.getElementById("address_street_3")
    const _address_country_id = document.getElementById("address_country_id")
    const _address_types_id = document.getElementById("address_types_id")
    const _address_province_id = document.getElementById("address_province_id")
    const _address_city_id = document.getElementById("address_city_id")
    const _address_postal_code = document.getElementById("address_postal_code")
    const _address_company_id = document.getElementById("address_company_id")
    const _clear_address_table = document.getElementById("clear_address_table")
    /**
     * Defaults
     */
    let default_display = default_address_view
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let $address_table = $(_table_address)
    let temp_address = {}
    let validator
    let form_rules = {
        groups: {
            cityGroup: "address_country_id address_province_id address_city_id",
        },
        rules: {
            
            address_types_id: {
                required: true,
            },
            address_company_id: {
                required: true,
            },
            address_country_id: {
                required: true,
            },
            address_province_id: {
                required: true,
            },
            address_city_id: {
                required: true,
            },
        },
        messages: {
            address_company_id: {
                required: "Field Required",
            },
            address_types_id: {
                required: "Field Required",
            },
            address_country_id: {
                required: "Field Required",
            },
            address_province_id: {
                required: "Field Required",
            },
            address_city_id: {
                required: "Field Required",
            },
        },
    }
    
    /**
     * add new address
     */
    $(_button_add_address_table)
      .on("click", function () {
          $address_table.clearSelectedRows()
          clear_form()
          load_form()
      })
    
    /**
     * clear address form button
     */
    $(_button_clear_form_edit_address)
      .on("click", function () {
          $address_table.clearSelectedRows()
          clear_form()
      })
    
    /**
     * submit button save address
     */
    $(_button_submit_form_edit_address)
      .on("click", function () {
          confirmDialog(`Would you like to update?`, (ans) => {
              if (ans) {
                  save()
              }
          })
      })
    
    /**
     * close address form
     */
    $(_button_close_edit_address_form)
      .on("click", function () {
          $address_table.clearSelectedRows()
          clear_form()
          unload_form()
      })
    
    /**
     * clear address table button
     */
    $(_clear_address_table)
      .on("click", function () {
          Address.clearTable()
      })
    
    /**
     * save address form data
     */
    const save = function () {
        let dataToSend = build()
        if (dataToSend) {
            update_address(dataToSend, function (data) {
                if (data) {
                    if (data[0]) {
                        let address = data[0]
                        let detail = set_detail(address)
                        
                        if (Address.all.get(detail.id)) {
                            $address_table.updateRow(detail)
                        } else {
                            $address_table.insertRow(detail)
                        }
                        
                        Address.all.set(detail.id, detail)
                        
                        toastr.success("Address Updated")
                    }
                }
            })
        }
    }
    
    /**
     * build address record to update
     *
     * @returns {{}|*}
     */
    const build = function () {
        /**
         * address_types_id: [1]
         * city_id: 428
         * company_id: 1
         * country_id: 219
         * enabled: 1
         * id: 1
         * postal_code: "12345"
         * province_id: 51
         * street_1: "STREET 1"
         * street_2: "STREET 2"
         * street_3: "STREET 3"
         */
        if (validate_form()) {
            let dataToSend = {
                company_id: (!isNaN(parseInt(_address_company_id.value))) ? parseInt(_address_company_id.value) : null,
                street_1: (_address_street_1.value !== "") ? _address_street_1.value : null,
                street_2: (_address_street_2.value !== "") ? _address_street_2.value : null,
                street_3: (_address_street_3.value !== "") ? _address_street_3.value : null,
                postal_code: (_address_postal_code.value !== "") ? _address_postal_code.value : null,
                country_id: (!isNaN(_address_country_id.value)) ? parseInt(_address_country_id.value) : null,
                province_id: (!isNaN(_address_province_id.value)) ? parseInt(_address_province_id.value) : null,
                city_id: (!isNaN(_address_city_id.value)) ? parseInt(_address_city_id.value) : null,
                address_types_id: toNumbers(getListOfIds($(_address_types_id).val())),
                enabled: (_address_enabled.checked === true) ? 1 : 0,
                id: (!isNaN(parseInt(_address_id.value))) ? parseInt(_address_id.value) : null,
            }
            return remove_nulls(dataToSend)
        }
    }
    
    /**
     * update address
     *
     * @param dataToSend
     * @param callback
     */
    const update_address = function (dataToSend, callback) {
        let url = "/api/v1.0/addresses/update"
        if (dataToSend) {
            sendPostRequest(url, dataToSend, function (data, status, xhr) {
                if (data) {
                    return callback(data)
                } else {
                    return handle_address_error("Oops: 1")
                }
            })
        }
    }
    
    /**
     * validate address form for submit
     *
     * @returns {*|jQuery}
     */
    const validate_form = function () {
        return $(_form_edit_address).valid()
    }
    
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
            company_id: null,
            street_1: null,
            street_2: null,
            street_3: null,
            postal_code: null,
            enabled: 1,
            address_types_id: [],
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
    
    /**
     * clears address form
     */
    const clear_form = function () {
        _address_id.value = ""
        _address_enabled.checked = true
        _address_street_1.value = ""
        _address_street_2.value = ""
        _address_street_3.value = ""
        _address_postal_code.value = ""
        $(_address_types_id).val([])
        $(_address_country_id).val("").trigger("change")
    }
    
    /**
     * populate address form
     *
     * @param address
     */
    const populate_form = function (address) {
        if (address) {
            _address_id.value = (address.id) ? address.id : null
            _address_company_id.value = (address.company_id) ? address.company_id : null
            $(_address_types_id).val((address.address_types_id) ? address.address_types_id : [])
            _address_enabled.checked = (address.enabled === 1)
            _address_street_1.value = (address.street_1) ? address.street_1 : null
            _address_street_2.value = (address.street_2) ? address.street_2 : null
            _address_street_3.value = (address.street_3) ? address.street_3 : null
            _address_postal_code.value = (address.postal_code) ? address.postal_code : null
            Province.id = address.province.id
            Country.id = address.country.id
            City.id = address.city.id
            
            $(_address_country_id).val((address.country.id) ? address.country.id : "").trigger("change")
        }
    }
    
    /**
     * reset address edit form
     */
    const reset_form = function () {
        _address_id.value = ""
        _address_company_id.value = _company_id.value
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
        if (_card_edit_address_form) {
            reset_form()
            populate_form(address)
            $(_card_edit_address_form).show()
        }
    }
    
    /**
     * build address table structure
     */
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
     *
     * @param addresses
     */
    const load_all = function (addresses) {
        Address.all = new Map()
        if (!addresses) {
            return
        }
        let loadAddress
        let count = 0
        $.each(addresses, function (i, address) {
            let detail = set_detail(address)
            if (count === 0) {
                loadAddress = detail
            }
            
            Address.all.set(detail.id, detail)
            $address_table.insertRow(detail)
            count++
        })
        
        if (_table_address) {
            if (loadAddress) {
                $address_table.loadRow(loadAddress)
            }
            
            $address_table.clearSelectedRows()
        }
        
        if (_card_edit_address_form) {
            clear_form()
            unload_form()
        }
    }
    
    /**
     * populate address table with addresses
     *
     * @param addresses
     */
    const populate_table = function (addresses) {
        if (_table_address) {
            Address.all = new Map()
            let loadAddress
            let count = 0
            $.each(addresses, function (i, address) {
                if (count === 0) {
                    loadAddress = address
                }
                address.address_types_id = getListOfIds(address.address_types_id)
                
                Address.all.set(address.id, address)
                $address_table.insertRow(address)
                count++
            })
            
            if (_table_address) {
                if (loadAddress) {
                    $address_table.loadRow(loadAddress)
                }
                
                $address_table.clearSelectedRows()
            }
        }
    }
    
    /**
     * initialize address form and table
     *
     * @param addresses
     */
    const init = function (addresses) {
        if (_table_address) {
            build_table()
        }
        
        if (addresses) {
            load_all(addresses)
        }
        
        if (_form_edit_address) {
            validator_init(form_rules)
            validator = $(_form_edit_address).validate()
            
            $(_address_country_id).BuildDropDown({
                data: Array.from(Country.all.values()),
                title: "Country",
                id_field: "id",
                text_field: "name",
                first_selectable: false,
            })
            $(_address_province_id).BuildDropDown({
                data: [],
                title: "Province",
                id_field: "id",
                text_field: "name",
                first_selectable: false,
            })
            $(_address_city_id).BuildDropDown({
                data: [],
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
    
    /**
     * set address object detail
     */
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
            detail.company_id = parseInt((address.company_id) ? address.company_id : null)
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
    
    /**
     * populate form with selected address
     *
     * @param address
     */
    const navigate = function (address) {
        if (address) {
            load_form(address)
        }
    }
    
    /**
     * clear and empty table
     */
    const clearTable = function () {
        let addresses = Array.from(Address.all.values())
        
        $.each(addresses, function (k, address) {
            $address_table.deleteRow(address)
        })
        
        Address.all = new Map()
    }
    
    /**
     * post request to fetch addresses by company id
     *
     * @param dataToSend
     * @param callback
     */
    const fetch_addresses_by_company_id = function (dataToSend, callback) {
        let url = "/api/v1.0/addresses"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handle_address_error("Oops: 1")
                    }
                })
            } catch (e) {
                console.log(e)
                return handle_address_error("Error Validating Company")
            }
        } else {
            return handle_address_error("Error Loading Company- Missing Data")
        }
    }
    
    /**
     * get all addresses by company id
     *
     * @param company_id
     */
    const get_by_company_id = function (company_id) {
        if (company_id) {
            fetch_addresses_by_company_id({ company_id: company_id }, function (data) {
                if (data) {
                    let addresses = data
                    clearTable()
                    populate_table(addresses)
                }
            })
        }
    }
    
    /**
     * globals
     */
    return {
        validator: null,
        detail: {},
        all: new Map(),
        get_by_company_id: function (company_id) {
            get_by_company_id(company_id)
        },
        get: function (address_id) {
        
        },
        navigate: function (address) {
            navigate(address)
        },
        load_all: function (params) {
            load_all(params)
        },
        save: function (params) {
            save(params)
        },
        clearTable: function () {
            clearTable()
        },
        init: function (addresses) {
            init(addresses)
        },
    }
    
})()
