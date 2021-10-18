const Vendor = (function () {
    "use strict"
    
    const base_url = "/vendors"
    const _vendor_company_id = document.getElementById("vendor_company_id")
    const _vendor_name = document.getElementById("vendor_company_id")
    const _input_vendor_status_id = document.getElementById("input_vendor_status_id")
    const _input_vendor_show_online = document.getElementById("input_vendor_show_online")
    const _input_vendor_show_sales = document.getElementById("input_vendor_show_sales")
    const _input_vendor_show_ops = document.getElementById("input_vendor_show_ops")
    const _input_vendor_is_provider = document.getElementById("input_vendor_is_provider")
    const _input_vendor_sku = document.getElementById("input_vendor_sku")
    const _input_vendor_enabled = document.getElementById("input_vendor_enabled")
    const _input_vendor_date_created = document.getElementById("input_vendor_date_created")
    const _input_vendor_created_by = document.getElementById("input_vendor_created_by")
    const _input_vendor_date_modified = document.getElementById("input_vendor_date_modified")
    const _input_vendor_modified_by = document.getElementById("input_vendor_modified_by")
    const _input_vendor_note = document.getElementById("input_vendor_note")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const handle_vendor_error = function (msg) {
        toastr.error(msg)
    }
    
    const init_autocomplete = function () {
        console.log("Vendor", "init_autocomplete")
    }
    
    const _default_detail = function () {
        return {
            id: null,
            company_id: null,
            status_id: null,
            show_online: 1,
            show_sales: 1,
            show_ops: 1,
            is_provider: 1,
            sku: null,
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
    
    const set = function (vendor) {
        let detail = _default_detail()
        if (vendor) {
            detail.id = (vendor.id) ? vendor.id : null
            detail.company_id = (vendor.company_id) ? vendor.company_id : null
            detail.status_id = (vendor.status_id) ? vendor.status_id : null
            detail.show_online = (vendor.show_online) ? vendor.show_online : 1
            detail.show_sales = (vendor.show_sales) ? vendor.show_sales : 1
            detail.show_ops = (vendor.show_ops) ? vendor.show_ops : 1
            detail.is_provider = (vendor.is_provider) ? vendor.is_provider : 1
            detail.sku = (vendor.sku) ? vendor.sku : null
            detail.enabled = (vendor.enabled) ? vendor.enabled : 1
            detail.date_created = (vendor.date_created) ? vendor.date_created : formatDateMySQL()
            detail.created_by = (vendor.created_by) ? vendor.created_by : created_by
            detail.date_modified = (vendor.date_modified) ? vendor.date_modified : formatDateMySQL()
            detail.modified_by = (vendor.modified_by) ? vendor.modified_by : modified_by
            detail.note = (vendor.note) ? vendor.note : null
        }
        
        Vendor.detail = detail
        return detail
    }
    
    const load_all = function (vendors) {
        Vendor.all = new Map()
        
        if (!vendors) {
            return
        }
        $.each(vendors, function (i, vendor) {
            let detail = set(vendor)
            Vendor.all.set("id", detail)
        })
        
        console.log(" Vendor.all", Vendor.all)
    }
    
    const init = function (settings) {
        
        if (_vendor_name) {
            init_autocomplete()
        }
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
Vendor.init()
