const MessageTypes = (function () {
    "use strict"
    
    const base_url = "/message_types"
    const _input_message_types_id = document.getElementById("input_message_types_id")
    const _input_message_types_name = document.getElementById("input_message_types_name")
    const _input_message_types_icon = document.getElementById("input_message_types_icon")
    const _input_message_types_sort_order = document.getElementById("input_message_types_sort_order")
    const _input_message_types_enabled = document.getElementById("input_message_types_enabled")
    const _input_message_types_date_created = document.getElementById("input_message_types_date_created")
    const _input_message_types_created_by = document.getElementById("input_message_types_created_by")
    const _input_message_types_date_modified = document.getElementById("input_message_types_date_modified")
    const _input_message_types_modified_by = document.getElementById("input_message_types_modified_by")
    const _input_message_types_note = document.getElementById("input_message_types_note")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const handle_message_types_error = function (msg) {
        toastr.error(msg)
    }
    
    const _default_detail = function () {
        return {
            id: null,
            name: null,
            icon: null,
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
        //console.log(" -- MessageTypes -- ", {})
    }
    
    const set = function (message_types) {
        let detail = _default_detail()
        if (message_types) {
            detail.id = (message_types.id) ? message_types.id : null
            detail.name = (message_types.name) ? message_types.name : null
            detail.icon = (message_types.icon) ? message_types.icon : null
            detail.sort_order = (message_types.sort_order) ? message_types.sort_order : null
            detail.enabled = (message_types.enabled) ? message_types.enabled : 1
            detail.date_created = (message_types.date_created) ? message_types.date_created : formatDateMySQL()
            detail.created_by = (message_types.created_by) ? message_types.created_by : created_by
            detail.date_modified = (message_types.date_modified) ? message_types.date_modified : formatDateMySQL()
            detail.modified_by = (message_types.modified_by) ? message_types.modified_by : modified_by
            detail.note = (message_types.note) ? message_types.note : null
        }
        
        MessageTypes.detail = detail
        return detail
    }
    
    const load_all = function (message_types) {
        MessageTypes.all = new Map()
        
        if (!message_types) {
            return
        }
        $.each(message_types, function (i, message_types) {
            let detail = set(message_types)
            MessageTypes.all.set("id", detail)
        })
        
        //console.log(" MessageTypes.all", MessageTypes.all)
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

//MessageTypes.init()
//end object
