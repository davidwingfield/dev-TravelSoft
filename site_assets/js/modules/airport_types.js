const AirportTypes = (function () {
    "use strict"
    
    const base_url = "/airport_types"
    const _input_airport_types_id = document.getElementById("input_airport_types_id")
    const _input_airport_types_name = document.getElementById("input_airport_types_name")
    const _input_airport_types_sort_order = document.getElementById("input_airport_types_sort_order")
    const _input_airport_types_enabled = document.getElementById("input_airport_types_enabled")
    const _input_airport_types_date_created = document.getElementById("input_airport_types_date_created")
    const _input_airport_types_created_by = document.getElementById("input_airport_types_created_by")
    const _input_airport_types_date_modified = document.getElementById("input_airport_types_date_modified")
    const _input_airport_types_modified_by = document.getElementById("input_airport_types_modified_by")
    const _input_airport_types_note = document.getElementById("input_airport_types_note")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const handle_airport_types_error = function (msg) {
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
        //console.log(" -- AirportTypes -- ", {})
    }
    
    const set = function (airport_types) {
        let detail = _default_detail()
        if (airport_types) {
            detail.id = (airport_types.id) ? airport_types.id : null
            detail.name = (airport_types.name) ? airport_types.name : null
            detail.sort_order = (airport_types.sort_order) ? airport_types.sort_order : null
            detail.enabled = (airport_types.enabled) ? airport_types.enabled : 1
            detail.date_created = (airport_types.date_created) ? airport_types.date_created : formatDateMySQL()
            detail.created_by = (airport_types.created_by) ? airport_types.created_by : created_by
            detail.date_modified = (airport_types.date_modified) ? airport_types.date_modified : formatDateMySQL()
            detail.modified_by = (airport_types.modified_by) ? airport_types.modified_by : modified_by
            detail.note = (airport_types.note) ? airport_types.note : null
        }
        
        AirportTypes.detail = detail
        return detail
    }
    
    const load_all = function (airport_types) {
        AirportTypes.all = new Map()
        
        if (!airport_types) {
            return
        }
        $.each(airport_types, function (i, airport_types) {
            let detail = set(airport_types)
            AirportTypes.all.set("id", detail)
        })
        
        //console.log(" AirportTypes.all", AirportTypes.all)
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

//AirportTypes.init()
//end object
