/**
 *
 * @type {{all: Map<any, any>, init: AddressTypes.init, get: AddressTypes.get, validator: null, save: AddressTypes.save, detail: {}, load_all: AddressTypes.load_all}}
 */
const AddressTypes = (function () {
    "use strict"
    const base_url = "/address_types"
    const _input_address_types_id = document.getElementById("input_address_types_id")
    const _input_address_types_name = document.getElementById("input_address_types_name")
    const _input_address_types_sort_order = document.getElementById("input_address_types_sort_order")
    const _input_address_types_enabled = document.getElementById("input_address_types_enabled")
    const _input_address_types_date_created = document.getElementById("input_address_types_date_created")
    const _input_address_types_created_by = document.getElementById("input_address_types_created_by")
    const _input_address_types_date_modified = document.getElementById("input_address_types_date_modified")
    const _input_address_types_modified_by = document.getElementById("input_address_types_modified_by")
    const _input_address_types_note = document.getElementById("input_address_types_note")
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const handle_address_types_error = function (msg) {
        toastr.error(msg)
    }
    
    const _default_detail = function () {
        return {
            id: null,
            name: null,
            sort_order: null,
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
    
    }
    
    const set = function (address_types) {
        let detail = _default_detail()
        if (address_types) {
            detail.id = (address_types.id) ? address_types.id : null
            detail.name = (address_types.name) ? address_types.name : null
            detail.sort_order = (address_types.sort_order) ? address_types.sort_order : null
            detail.enabled = (address_types.enabled) ? address_types.enabled : 1
            detail.date_created = (address_types.date_created) ? address_types.date_created : formatDateMySQL()
            detail.created_by = (address_types.created_by) ? address_types.created_by : created_by
            detail.date_modified = (address_types.date_modified) ? address_types.date_modified : formatDateMySQL()
            detail.modified_by = (address_types.modified_by) ? address_types.modified_by : modified_by
            detail.note = (address_types.note) ? address_types.note : null
        }
        
        AddressTypes.detail = detail
        return detail
    }
    
    const load_all = function (address_types) {
        AddressTypes.all = new Map()
        
        if (!address_types) {
            return
        }
        $.each(address_types, function (i, address_types) {
            let detail = set(address_types)
            AddressTypes.all.set("id", detail)
        })
        
        Console.log(" AddressTypes.all", AddressTypes.all)
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
        init: function () {
            init()
        },
    }
    
})()
