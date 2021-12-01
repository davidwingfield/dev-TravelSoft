const Vendor = (function () {
    "use strict"
    
    const base_url = "/vendors"
    //Fields
    const _vendor_company_id = document.getElementById("vendor_company_id")
    const _form_edit_vendor = document.getElementById("form_edit_vendor")
    const _vendor_name = document.getElementById("vendor_name")
    const _vendor_id = document.getElementById("vendor_id")
    const _vendor_show_online = document.getElementById("vendor_show_online")
    const _vendor_show_sales = document.getElementById("vendor_show_sales")
    const _vendor_show_ops = document.getElementById("vendor_show_ops")
    const _vendor_is_provider = document.getElementById("vendor_is_provider")
    const _vendor_sku = document.getElementById("vendor_sku")
    const _vendor_enabled = document.getElementById("vendor_enabled")
    const _provider_edit = document.getElementById("provider_edit")
    const _provider_name = document.getElementById("provider_name")
    const _provider_company_id = document.getElementById("provider_company_id")
    const _company_id = document.getElementById("company_id")
    const _button_submit_form_edit_vendor = document.getElementById("button_submit_form_edit_vendor")
    const _table_vendor_index = document.getElementById("table_vendor_index")
    let validator
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let globalSelectedVendor = false
    let form_rules = {
        rules: {
            vendor_name: {
                required: true,
            },
        },
        messages: {
            vendor_name: {
                required: "Field Required",
            },
        },
    }
    let $index_table = $(_table_vendor_index)
    
    $(_company_id)
      .on("change", function () {
          $(_vendor_company_id).val(_company_id.value)
      })
    
    $(_button_submit_form_edit_vendor)
      .on("click", function () {
          let dataToSend = Vendor.build()
      })
    
    const init_autocomplete = function () {
        if (_vendor_name) {
            $(_vendor_name)
              .on("change", function () {
                  setTimeout(function () {
                      let vendor_name = _vendor_name.value
                      
                      if (globalSelectedVendor === false) {
                          if (vendor_name === "") {
                              _vendor_name.value = ""
                              _vendor_company_id.value = ""
                              globalSelectedVendor = false
                          } else {
                              vendor_exists(vendor_name)
                          }
                      }
                  }, 200)
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
                      //let vendor = (suggestion.data.vendor_detail) ? suggestion.data.vendor_detail : {}
                      //let company = (suggestion.data.company_detail) ? suggestion.data.company_detail : {}
                      //let contacts = []
                      //let addresses = []
                      //log("vendor", vendor)
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
    
    /**
     * build vendor index table
     */
    const build_index_table = function () {
        
        $index_table = $(_table_vendor_index).table({
            table_type: "display_list",
            data: Vendor.all,
            columnDefs: [
                {
                    title: "Id",
                    targets: 0,
                    data: "id",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "Name",
                    targets: 1,
                    data: "name",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "SKU",
                    targets: 2,
                    data: "sku",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
            ],
            rowClick: Vendor.navigate,
        })
    }
    
    /**
     * handel errors
     *
     * @param msg
     */
    const handle_vendor_error = function (msg) {
        toastr.error(msg)
    }
    
    const build = function () {
        return remove_nulls({
            id: (!isNaN(parseInt(_vendor_id.value))) ? parseInt(_vendor_id.value) : null,
            company_id: (!isNaN(parseInt(_vendor_company_id.value))) ? parseInt(_vendor_company_id.value) : null,
            status_id: 10,
            enabled: (_vendor_enabled.checked) ? 1 : 0,
            show_online: (_vendor_show_online.checked === true) ? 1 : 0,
            show_sales: (_vendor_show_sales.checked === true) ? 1 : 0,
            show_ops: (_vendor_show_ops.checked === true) ? 1 : 0,
            is_provider: (_vendor_is_provider.checked === true) ? 1 : 0,
            sku: _vendor_sku.value,
        })
    }
    
    const vendor_exists = function (name) {
        
        if (name && name !== "") {
            let dataToSend = {
                name: name,
            }
            
            fetch_vendor_by_name(dataToSend, function (data) {
                
                let vendor_detail = {}
                if (data) {
                    if (data.length > 0) {
                        if (data[0]) {
                            vendor_detail = data[0]
                        }
                    }
                }
                
                populate_form(vendor_detail)
                
            })
        }
    }
    
    /**
     * fetch provider by name
     *
     * @param dataToSend
     * @param callback
     */
    const fetch_vendor_by_name = function (dataToSend, callback) {
        let url = "/api/v1.0/vendors/validate"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handle_vendor_error("Oops: 1")
                    }
                })
            } catch (e) {
                console.log(e)
                return handle_vendor_error("Error Validating Company")
            }
        } else {
            return handle_vendor_error("Error Loading Company- Missing Data")
        }
    }
    
    const _default_detail = function () {
        return {
            id: null,
            name: null,
            company_id: null,
            status_id: 1,
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
            company: {},
            addresses: [],
            contacts: [],
        }
    }
    
    const set_detail = function (vendor) {
        
        let detail = _default_detail()
        let vendor_detail, company_detail = {}
        let contacts, addresses = []
        
        if (vendor) {
            
            if (vendor.vendor_detail) {
                vendor_detail = vendor.vendor_detail
                detail.id = (vendor_detail.id) ? vendor_detail.id : null
                detail.status_id = (vendor_detail.status_id) ? vendor_detail.status_id : null
                detail.show_online = vendor_detail.show_online
                detail.show_sales = vendor_detail.show_sales
                detail.show_ops = vendor_detail.show_ops
                detail.is_provider = vendor_detail.is_provider
                detail.sku = (vendor_detail.sku) ? vendor_detail.sku : null
                detail.enabled = vendor_detail.enabled
                detail.date_created = (vendor_detail.date_created) ? vendor_detail.date_created : formatDateMySQL()
                detail.created_by = (vendor_detail.created_by) ? vendor_detail.created_by : created_by
                detail.date_modified = (vendor_detail.date_modified) ? vendor_detail.date_modified : formatDateMySQL()
                detail.modified_by = (vendor_detail.modified_by) ? vendor_detail.modified_by : modified_by
                detail.note = (vendor_detail.note) ? vendor_detail.note : null
            }
            
            if (vendor.company_detail) {
                company_detail = vendor.company_detail
                detail.company_id = (company_detail.id) ? company_detail.id : null
            }
            
            if (vendor.contacts) {
                contacts = vendor.contacts
            }
            
            if (vendor.addresses) {
                addresses = vendor.addresses
            }
        }
        
        Vendor.detail = detail
        return detail
    }
    
    const set = function (vendor) {
        
        let detail = _default_detail()
        detail.id = (vendor.id) ? vendor.id : null
        detail.name = (vendor.name) ? vendor.name : null
        detail.status_id = (vendor.status_id) ? vendor.status_id : null
        detail.show_online = vendor.show_online
        detail.show_sales = vendor.show_sales
        detail.show_ops = vendor.show_ops
        detail.is_provider = vendor.is_provider
        detail.sku = (vendor.sku) ? vendor.sku : null
        detail.enabled = vendor.enabled
        detail.date_created = (vendor.date_created) ? vendor.date_created : formatDateMySQL()
        detail.created_by = (vendor.created_by) ? vendor.created_by : created_by
        detail.date_modified = (vendor.date_modified) ? vendor.date_modified : formatDateMySQL()
        detail.modified_by = (vendor.modified_by) ? vendor.modified_by : modified_by
        detail.note = (vendor.note) ? vendor.note : null
        detail.addresses = (vendor.company.addresses) ? vendor.company.addresses : []
        detail.contacts = (vendor.company.contacts) ? vendor.company.contacts : []
        detail.company = (vendor.company) ? vendor.company : {}
        
        Vendor.detail = detail
        return detail
    }
    
    const save = function (params) {
    
    }
    
    const get = function (id) {
        let data_to_send = {}
        if (id) {
            data_to_send.id = id
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
    
    const populate_form = function (vendor) {
        let detail = set_detail(vendor)
        _vendor_name.value = (detail.company.name) ? detail.company.name : ""
        _vendor_company_id.value = (detail.company.id) ? detail.company.id : ""
        
        if (_provider_edit) {
            if (_provider_name) {
                _vendor_name.value = _provider_name.value
            }
            
            if (_provider_company_id) {
                _vendor_company_id.value = _provider_company_id.value
            }
        }
        
        _vendor_id.value = (detail.id) ? detail.id : ""
        _vendor_sku.value = (detail.sku) ? detail.sku : ""
        _vendor_show_online.checked = (detail.show_online === 1)
        _vendor_show_sales.checked = (detail.show_sales === 1)
        _vendor_show_ops.checked = (detail.show_ops === 1)
        _vendor_is_provider.checked = (detail.is_provider === 1)
        _vendor_enabled.checked = (detail.enabled === 1)
    }
    
    const load_all = function (vendors) {
        Vendor.all = new Map()
        if (vendors) {
            $.each(vendors, function (i, vendor) {
                let detail = set(vendor)
                $index_table.insertRow(detail)
                Vendor.all.set(detail.id, detail)
            })
        }
        
        console.log(" Vendor.all", Vendor.all)
    }
    
    const validate_form = function () {
        return $(_form_edit_vendor).valid()
    }
    
    const init = function (settings) {
        let company = {}
        if (settings) {
            if (settings.company) {
                company = settings.company
            }
        }
        
        if (_vendor_name) {
            _vendor_name.value = (settings.name) ? settings.name : ""
            init_autocomplete()
        }
        
        if (_vendor_id) {
            _vendor_id.value = (settings.id) ? settings.id : ""
        }
        
        if (_vendor_company_id) {
            _vendor_company_id.value = (company.id) ? company.id : ""
        }
        if (_vendor_sku) {
            _vendor_sku.value = (settings.sku) ? settings.sku : ""
        }
        if (_vendor_enabled) {
            _vendor_enabled.checked = (settings.enabled) ? (settings.enabled === 1) : true
        }
        if (_vendor_is_provider) {
            _vendor_is_provider.checked = (settings.is_provider) ? (settings.is_provider === 1) : true
        }
        if (_vendor_show_online) {
            _vendor_show_online.checked = (settings.show_online) ? (settings.show_online === 1) : true
        }
        if (_vendor_show_ops) {
            _vendor_show_ops.checked = (settings.show_ops) ? (settings.show_ops === 1) : true
        }
        if (_vendor_show_sales) {
            _vendor_show_sales.checked = (settings.show_sales) ? (settings.show_sales === 1) : true
        }
        
        if (_form_edit_vendor) {
            validator_init(form_rules)
            validator = $(_form_edit_vendor).validate()
        }
    }
    
    const navigate = function (vendor) {
        if (vendor && vendor.id) {
            window.location.replace(base_url + "/" + vendor.id)
        }
    }
    
    /**
     * disables fields unused from provider edit
     */
    const setProvider = function () {
        if (_provider_edit) {
            _vendor_is_provider.checked = true
            $(_vendor_is_provider).attr("readonly", true)
            _vendor_is_provider.disabled = true
            $(_vendor_name).attr("readonly", true)
            $(_vendor_id).attr("readonly", true)
            $(_vendor_sku).attr("readonly", true)
            $(_vendor_is_provider).attr("readonly", true)
        }
    }
    
    /**
     * initialize vendor index page
     *
     * @param settings
     */
    const index = function (settings) {
        build_index_table()
        
        if (settings) {
            if (settings.vendors) {
                load_all(settings.vendors)
            }
        }
        
    }
    return {
        validator: null,
        detail: {},
        all: new Map(),
        index: function (settings) {
            index(settings)
        },
        setProvider: function () {
            setProvider()
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
        build: function () {
            if (validate_form()) {
                return build()
            }
        },
        navigate: function (vendor) {
            navigate(vendor)
        },
    }
    
})()
