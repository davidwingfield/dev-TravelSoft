const RatingTypes = (function () {
    "use strict"
    
    const base_url = "/rating_types"
    const _input_rating_types_id = document.getElementById("input_rating_types_id")
    const _input_rating_types_name = document.getElementById("input_rating_types_name")
    const _input_rating_types_enabled = document.getElementById("input_rating_types_enabled")
    const _input_rating_types_date_created = document.getElementById("input_rating_types_date_created")
    const _input_rating_types_created_by = document.getElementById("input_rating_types_created_by")
    const _input_rating_types_date_modified = document.getElementById("input_rating_types_date_modified")
    const _input_rating_types_modified_by = document.getElementById("input_rating_types_modified_by")
    const _input_rating_types_note = document.getElementById("input_rating_types_note")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const handle_rating_types_error = function (msg) {
        toastr.error(msg)
    }
    
    const _default_detail = function () {
        return {
            id: null,
            name: null,
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
        //console.log(" -- RatingTypes -- ", {})
    }
    
    const set = function (rating_types) {
        let detail = _default_detail()
        if (rating_types) {
            detail.id = (rating_types.id) ? rating_types.id : null
            detail.name = (rating_types.name) ? rating_types.name : null
            detail.enabled = (rating_types.enabled) ? rating_types.enabled : 1
            detail.date_created = (rating_types.date_created) ? rating_types.date_created : formatDateMySQL()
            detail.created_by = (rating_types.created_by) ? rating_types.created_by : created_by
            detail.date_modified = (rating_types.date_modified) ? rating_types.date_modified : formatDateMySQL()
            detail.modified_by = (rating_types.modified_by) ? rating_types.modified_by : modified_by
            detail.note = (rating_types.note) ? rating_types.note : null
        }
        
        RatingTypes.detail = detail
        return detail
    }
    
    const load_all = function (rating_types) {
        RatingTypes.all = new Map()
        
        if (!rating_types) {
            return
        }
        $.each(rating_types, function (i, rating_types) {
            let detail = set(rating_types)
            RatingTypes.all.set("id", detail)
        })
        
        //console.log(" RatingTypes.all", RatingTypes.all)
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

//RatingTypes.init()
//end object
