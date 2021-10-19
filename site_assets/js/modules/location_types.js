const LocationTypes = (function () {
    "use strict"
    
    const base_url = "/location_types"
    const _input_location_types_id = document.getElementById("input_location_types_id")
    const _input_location_types_name = document.getElementById("input_location_types_name")
    const _input_location_types_icon = document.getElementById("input_location_types_icon")
    const _input_location_types_sort_order = document.getElementById("input_location_types_sort_order")
    const _input_location_types_enabled = document.getElementById("input_location_types_enabled")
    const _input_location_types_date_created = document.getElementById("input_location_types_date_created")
    const _input_location_types_created_by = document.getElementById("input_location_types_created_by")
    const _input_location_types_date_modified = document.getElementById("input_location_types_date_modified")
    const _input_location_types_modified_by = document.getElementById("input_location_types_modified_by")
    const _input_location_types_note = document.getElementById("input_location_types_note")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const handle_location_types_error = function (msg) {
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
        console.log(" -- LocationTypes -- ", {})
    }
    
    const set = function (location_types) {
        let detail = _default_detail()
        if (location_types) {
            detail.id = (location_types.id) ? location_types.id : null
            detail.name = (location_types.name) ? location_types.name : null
            detail.icon = (location_types.icon) ? location_types.icon : null
            detail.sort_order = (location_types.sort_order) ? location_types.sort_order : null
            detail.enabled = (location_types.enabled) ? location_types.enabled : 1
            detail.date_created = (location_types.date_created) ? location_types.date_created : formatDateMySQL()
            detail.created_by = (location_types.created_by) ? location_types.created_by : created_by
            detail.date_modified = (location_types.date_modified) ? location_types.date_modified : formatDateMySQL()
            detail.modified_by = (location_types.modified_by) ? location_types.modified_by : modified_by
            detail.note = (location_types.note) ? location_types.note : null
        }
        
        LocationTypes.detail = detail
        return detail
    }
    
    const load_all = function (location_types) {
        LocationTypes.all = new Map()
        
        if (!location_types) {
            return
        }
        $.each(location_types, function (i, location_types) {
            let detail = set(location_types)
            LocationTypes.all.set("id", detail)
        })
        
        //console.log(" LocationTypes.all", LocationTypes.all)
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

LocationTypes.init()
//end object
