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
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    /**
     * handel errors
     *
     * @param msg
     */
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
                      if (!suggestion.data) {
                          return
                      }
                      let vendor = (suggestion.data.vendor_detail) ? suggestion.data.vendor_detail : {}
                      let company = (suggestion.data.company_detail) ? suggestion.data.company_detail : {}
                      let contacts = []
                      let addresses = []
                      log("vendor", vendor)
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
            _vendor_name.value = settings.name
            init_autocomplete()
        }
        if (_vendor_id) {
            _vendor_id.value = settings.id
        }
        if (_vendor_company_id) {
            _vendor_company_id.value = settings.company.id
        }
        if (_vendor_sku) {
            _vendor_sku.value = settings.sku
        }
        if (_vendor_enabled) {
            _vendor_enabled.checked = (settings.enabled === 1)
        }
        if (_vendor_is_provider) {
            _vendor_is_provider.checked = (settings.is_provider === 1)
        }
        if (_vendor_show_online) {
            _vendor_show_online.checked = (settings.show_online === 1)
        }
        if (_vendor_show_ops) {
            _vendor_show_ops.checked = (settings.show_ops === 1)
        }
        if (_vendor_show_sales) {
            _vendor_show_sales.checked = (settings.show_sales === 1)
        }
    }
    
    const reset_form = function () {
        _vendor_name.value = ""
        _vendor_id.value = ""
        _vendor_company_id.value = ""
        _vendor_show_online.checked = true
        _vendor_show_sales.checked = true
        _vendor_show_ops.checked = true
        _vendor_is_provider.checked = true
        _vendor_sku.value = ""
        _vendor_enabled.checked = true
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        setProvider: function () {
            _vendor_is_provider.checked = true
            _vendor_is_provider.disabled = true
            $(_vendor_is_provider).attr("readonly", true)
        },
        get: function (params) {
            get(params)
        },
        load_all: function (params) {
            load_all(params)
        },
        reset_form: function () {
            reset_form()
        },
        save: function (params) {
            save(params)
        },
        init: function (settings) {
            init(settings)
        },
    }
    
})()
