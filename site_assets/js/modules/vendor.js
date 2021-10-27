const Vendor = (function () {
    "use strict"
    
    const base_url = "/vendors"
    //Fields
    const _vendor_company_id = document.getElementById("vendor_company_id")
    const _vendor_name = document.getElementById("vendor_name")
    const _vendor_id = document.getElementById("vendor_id")
    const _vendor_show_online = document.getElementById("vendor_show_online")
    const _vendor_show_sales = document.getElementById("vendor_show_sales")
    const _vendor_show_ops = document.getElementById("vendor_show_ops")
    const _vendor_is_provider = document.getElementById("vendor_is_provider")
    const _vendor_sku = document.getElementById("vendor_sku")
    const _vendor_enabled = document.getElementById("vendor_enabled")
    //Unused
    const _vendor_date_created = document.getElementById("vendor_date_created")
    const _vendor_created_by = document.getElementById("vendor_created_by")
    const _vendor_date_modified = document.getElementById("vendor_date_modified")
    const _vendor_modified_by = document.getElementById("vendor_modified_by")
    const _vendor_note = document.getElementById("vendor_note")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    // ----
    
    const handle_vendor_error = function (msg) {
        toastr.error(msg)
    }
    
    const init_autocomplete = function () {
        if (_vendor_name) {
            $(_vendor_name)
              .on("change", function () {
              
              })
              .on("click", function () {
                  $(this).select()
              })
              .autocomplete({
                  serviceUrl: "/api/v1.0/autocomplete/vendors",
                  minChars: 2,
                  cache: false,
                  dataType: "json",
                  triggerSelectOnValidInput: false,
                  paramName: "st",
                  onSelect: function (suggestion) {
                      if (suggestion.data) {
                          let vendor = suggestion.data
                          let vendor_id = vendor.id
                          let vendor_company_id = vendor.company.id
                          _vendor_id.value = vendor_id
                          _vendor_company_id.value = vendor_company_id
                      }
                      
                      // --
                      //log("Provider.suggestion", suggestion.data)
                      //globalSelectedProvider = true
                      //_provider_company_id.value = suggestion.data.company_id
                      //_provider_id.value = suggestion.data.provider_id
                      //_provider_name.value = suggestion.data.company_name
                  },
              })
        }
        
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
        
        /**
         * created_by: 4
         * date_created: "10/25/2021"
         * date_modified: "10/25/2021"
         * enabled: 1
         * id: 1
         * is_provider: 1
         * modified_by: 4
         * note: null
         * show_online: 1
         * show_ops: 1
         * show_sales: 1
         * sku: "SKU0000001"
         */
        if (_vendor_sku) {
            _vendor_sku.value = settings.sku
            _vendor_id.value = settings.id
            _vendor_enabled.checked = (settings.enabled === 1)
            _vendor_is_provider.checked = (settings.is_provider === 1)
            _vendor_show_online.checked = (settings.show_online === 1)
            _vendor_show_ops.checked = (settings.show_ops === 1)
            _vendor_show_sales.checked = (settings.show_sales === 1)
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
        init: function (settings) {
            //init(settings)
        },
    }
    
})()
