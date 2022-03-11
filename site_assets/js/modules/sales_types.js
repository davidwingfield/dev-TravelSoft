const SalesTypes = (function () {
    "use strict"
    
    const base_url = "/sales_types"
    const _input_sales_types_id = document.getElementById("input_sales_types_id")
    const _input_sales_types_name = document.getElementById("input_sales_types_name")
    const _input_sales_types_class = document.getElementById("input_sales_types_class")
    const _input_sales_types_sort_order = document.getElementById("input_sales_types_sort_order")
    const _input_sales_types_enabled = document.getElementById("input_sales_types_enabled")
    const _input_sales_types_date_created = document.getElementById("input_sales_types_date_created")
    const _input_sales_types_created_by = document.getElementById("input_sales_types_created_by")
    const _input_sales_types_date_modified = document.getElementById("input_sales_types_date_modified")
    const _input_sales_types_modified_by = document.getElementById("input_sales_types_modified_by")
    const _input_sales_types_note = document.getElementById("input_sales_types_note")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const handle_sales_types_error = function (msg) {
        toastr.error(msg)
    }
    
    const _default_detail = function () {
        return {
            id: null,
            name: null,
            class: null,
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
        //console.log(" -- SalesTypes -- ", {})
    }
    
    const set = function (sales_types) {
        let detail = _default_detail()
        if (sales_types) {
            detail.id = (sales_types.id) ? sales_types.id : null
            detail.name = (sales_types.name) ? sales_types.name : null
            detail.class = (sales_types.class) ? sales_types.class : null
            detail.sort_order = (sales_types.sort_order) ? sales_types.sort_order : null
            detail.enabled = (sales_types.enabled) ? sales_types.enabled : 1
            detail.date_created = (sales_types.date_created) ? sales_types.date_created : formatDateMySQL()
            detail.created_by = (sales_types.created_by) ? sales_types.created_by : created_by
            detail.date_modified = (sales_types.date_modified) ? sales_types.date_modified : formatDateMySQL()
            detail.modified_by = (sales_types.modified_by) ? sales_types.modified_by : modified_by
            detail.note = (sales_types.note) ? sales_types.note : null
        }
        
        SalesTypes.detail = detail
        return detail
    }
    
    const load_all = function (sales_types) {
        SalesTypes.all = new Map()
        
        if (!sales_types) {
            return
        }
        $.each(sales_types, function (i, sales_types) {
            let detail = set(sales_types)
            SalesTypes.all.set("id", detail)
        })
        
        //console.log(" SalesTypes.all", SalesTypes.all)
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

//SalesTypes.init()
//end object
