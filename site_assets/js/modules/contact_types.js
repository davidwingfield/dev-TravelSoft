const ContactTypes = (function () {
    "use strict"
    
    const base_url = "/contact_types"
    const _input_contact_types_id = document.getElementById("input_contact_types_id")
    const _input_contact_types_name = document.getElementById("input_contact_types_name")
    const _input_contact_types_sort_order = document.getElementById("input_contact_types_sort_order")
    const _input_contact_types_enabled = document.getElementById("input_contact_types_enabled")
    const _input_contact_types_date_created = document.getElementById("input_contact_types_date_created")
    const _input_contact_types_created_by = document.getElementById("input_contact_types_created_by")
    const _input_contact_types_date_modified = document.getElementById("input_contact_types_date_modified")
    const _input_contact_types_modified_by = document.getElementById("input_contact_types_modified_by")
    const _input_contact_types_note = document.getElementById("input_contact_types_note")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const handle_contact_types_error = function (msg) {
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
        Console.log(" -- ContactTypes -- ", {})
    }
    
    const set = function (contact_types) {
        let detail = _default_detail()
        if (contact_types) {
            detail.id = (contact_types.id) ? contact_types.id : null
            detail.name = (contact_types.name) ? contact_types.name : null
            detail.sort_order = (contact_types.sort_order) ? contact_types.sort_order : null
            detail.enabled = (contact_types.enabled) ? contact_types.enabled : 1
            detail.date_created = (contact_types.date_created) ? contact_types.date_created : formatDateMySQL()
            detail.created_by = (contact_types.created_by) ? contact_types.created_by : created_by
            detail.date_modified = (contact_types.date_modified) ? contact_types.date_modified : formatDateMySQL()
            detail.modified_by = (contact_types.modified_by) ? contact_types.modified_by : modified_by
            detail.note = (contact_types.note) ? contact_types.note : null
        }
        
        ContactTypes.detail = detail
        return detail
    }
    
    const load_all = function (contact_types) {
        ContactTypes.all = new Map()
        
        if (!contact_types) {
            return
        }
        $.each(contact_types, function (i, contact_types) {
            let detail = set(contact_types)
            ContactTypes.all.set("id", detail)
        })
        
        Console.log(" ContactTypes.all", ContactTypes.all)
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

//ContactTypes.init()
//end object
