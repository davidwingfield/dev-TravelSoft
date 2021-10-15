const Address = (function () {
    "use strict"
    
    const base_url = "/address"
    const _input_address_address_id = document.getElementById("input_address_address_id")
    const _input_address_address = document.getElementById("input_address_address")
    const _input_address_address2 = document.getElementById("input_address_address2")
    const _input_address_district = document.getElementById("input_address_district")
    const _input_address_city_id = document.getElementById("input_address_city_id")
    const _input_address_postal_code = document.getElementById("input_address_postal_code")
    const _input_address_phone = document.getElementById("input_address_phone")
    const _input_address_last_update = document.getElementById("input_address_last_update")
    const _input_address_id = document.getElementById("input_address_id")
    const _input_address_province_id = document.getElementById("input_address_province_id")
    const _input_address_country_id = document.getElementById("input_address_country_id")
    const _input_address_street_1 = document.getElementById("input_address_street_1")
    const _input_address_street_2 = document.getElementById("input_address_street_2")
    const _input_address_street_3 = document.getElementById("input_address_street_3")
    const _input_address_enabled = document.getElementById("input_address_enabled")
    const _input_address_date_created = document.getElementById("input_address_date_created")
    const _input_address_created_by = document.getElementById("input_address_created_by")
    const _input_address_date_modified = document.getElementById("input_address_date_modified")
    const _input_address_modified_by = document.getElementById("input_address_modified_by")
    const _input_address_note = document.getElementById("input_address_note")
    const _table_address = document.getElementById("table_address")
    // ----
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let $address_table = $(_table_address)
    // ----
    const handle_address_error = function (msg) {
        toastr.error(msg)
    }
    
    const _default_detail = function () {
        return {
            address_id: null,
            address: null,
            address2: null,
            district: null,
            city_id: null,
            postal_code: null,
            phone: null,
            last_update: null,
            id: null,
            province_id: null,
            country_id: null,
            street_1: null,
            street_2: null,
            street_3: null,
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
    
    const get = function () {
        let data_to_send = {}
        
    }
    
    const init = function (settings) {
        console.log(" -- Address -- ", {})
        if (_table_address) {
            build_table()
        }
    }
    
    const navigate = function (address) {
        console.log("Address.navigate", address)
    }
    
    const build_table = function () {
        if (!$.fn.DataTable.isDataTable(_table_address)) {
            $address_table = $(_table_address).table({
                table_type: "display_list",
                data: Address.all,
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
                        data: "street_1",
                        render: function (data, type, row, meta) {
                            return data
                        },
                    },
                ],
                rowClick: Address.navigate,
            })
        }
    }
    
    const set = function (address) {
        let detail = _default_detail()
        if (address) {
            detail.address_id = (address.address_id) ? address.address_id : null
            detail.address = (address.address) ? address.address : null
            detail.address2 = (address.address2) ? address.address2 : null
            detail.district = (address.district) ? address.district : null
            detail.city_id = (address.city_id) ? address.city_id : null
            detail.postal_code = (address.postal_code) ? address.postal_code : null
            detail.phone = (address.phone) ? address.phone : null
            detail.last_update = (address.last_update) ? address.last_update : null
            detail.id = (address.id) ? address.id : null
            detail.city_id = (address.city_id) ? address.city_id : null
            detail.province_id = (address.province_id) ? address.province_id : null
            detail.country_id = (address.country_id) ? address.country_id : null
            detail.street_1 = (address.street_1) ? address.street_1 : null
            detail.street_2 = (address.street_2) ? address.street_2 : null
            detail.street_3 = (address.street_3) ? address.street_3 : null
            detail.postal_code = (address.postal_code) ? address.postal_code : null
            detail.enabled = (address.enabled) ? address.enabled : 1
            detail.date_created = (address.date_created) ? address.date_created : formatDateMySQL()
            detail.created_by = (address.created_by) ? address.created_by : created_by
            detail.date_modified = (address.date_modified) ? address.date_modified : formatDateMySQL()
            detail.modified_by = (address.modified_by) ? address.modified_by : modified_by
            detail.note = (address.note) ? address.note : null
        }
        
        Address.detail = detail
        return detail
    }
    
    const load_all = function (addresses) {
        Address.all = new Map()
        
        if (!addresses) {
            return
        }
        $.each(addresses, function (i, address) {
            let detail = set(address)
            Address.all.set(detail)
        })
        
        console.log(" Address.all", Address.all)
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
        init: function () {
            init()
        },
    }
    
})()
Address.init()
