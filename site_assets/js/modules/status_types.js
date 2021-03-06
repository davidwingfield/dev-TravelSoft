const StatusTypes = (function () {
    "use strict"
    
    const base_url = "/status_types"
    const _input_status_types_id = document.getElementById("input_status_types_id")
    const _input_status_types_name = document.getElementById("input_status_types_name")
    const _input_status_types_enabled = document.getElementById("input_status_types_enabled")
    const _input_status_types_date_created = document.getElementById("input_status_types_date_created")
    const _input_status_types_created_by = document.getElementById("input_status_types_created_by")
    const _input_status_types_date_modified = document.getElementById("input_status_types_date_modified")
    const _input_status_types_modified_by = document.getElementById("input_status_types_modified_by")
    const _input_status_types_note = document.getElementById("input_status_types_note")
    const _input_status_types_sort_order = document.getElementById("input_status_types_sort_order")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const handleStatusTypesError = function (msg) {
        toastr.error(msg)
    }
    
    const defaultDetail = function () {
        return {
            id: null,
            name: null,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            note: null,
            sort_order: null,
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
        //console.log("StatusTypes.init(settings)", settings)
        if (settings) {
            if (settings.status_types) {
                loadAll(settings.status_types)
                buildDropdown()
            }
        }
    }
    
    const loadAll = function (statusTypes) {
        //console.log("StatusTypes.loadAll(settings)", statusTypes)
        StatusTypes.all = new Map()
        
        if (statusTypes) {
            $.each(statusTypes, function (k, statusType) {
                let detail = set(statusType)
                //console.log("detail", detail)
                if (detail.id) {
                    StatusTypes.all.set(detail.id, detail)
                }
            })
        }
    }
    
    const buildDropdown = function (statusTypeId) {
        //console.log("StatusTypes.buildDropdown(statusTypeId)", statusTypeId)
        let selected = ""
        if (statusTypeId) {
            selected = statusTypeId
        }
        
        let statusTypes = Array.from(StatusTypes.all.values())
        //console.log("|__ statusTypes", statusTypes)
    }
    
    const set = function (status_types) {
        //console.log("StatusTypes.set(status_types)", status_types)
        let detail = defaultDetail()
        if (status_types) {
            detail.id = (status_types.id) ? status_types.id : null
            detail.name = (status_types.name) ? status_types.name : null
            detail.enabled = (status_types.enabled) ? status_types.enabled : 1
            detail.date_created = (status_types.date_created) ? status_types.date_created : formatDateMySQL()
            detail.created_by = (status_types.created_by) ? status_types.created_by : created_by
            detail.date_modified = (status_types.date_modified) ? status_types.date_modified : formatDateMySQL()
            detail.modified_by = (status_types.modified_by) ? status_types.modified_by : modified_by
            detail.note = (status_types.note) ? status_types.note : null
            detail.sort_order = (status_types.sort_order) ? status_types.sort_order : null
        }
        
        StatusTypes.detail = detail
        return detail
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        get: function (params) {
            get(params)
        },
        load_all: function (params) {
            loadAll(params)
        },
        save: function (params) {
            save(params)
        },
        init: function (settings) {
            init(settings)
        },
    }
    
})()

//StatusTypes.init()
//end object
