const Provider = (function () {
    "use strict"
    
    const base_url = "/providers"
    
    const _provider_name = document.getElementById("provider_name")
    const _button_add_provider_page_heading = document.getElementById("button_add_provider_page_heading")
    const _table_provider_index = document.getElementById("table_provider_index")
    const _provider_id = document.getElementById("provider_id")
    const _provider_company_id = document.getElementById("provider_company_id")
    const _provider_enabled = document.getElementById("provider_enabled")
    // ----
    let globalSelectedProvider = false
    let $index_table = $(_table_provider_index)
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    // ----
    $(_button_add_provider_page_heading)
      .on("click", function () {
          //console.log("test")
      })
    
    const handle_provider_error = function (msg) {
        toastr.error(msg)
    }
    
    const _default_detail = function () {
        return {
            addresses: [],
            contacts: [],
            location: {},
            company: {},
            vendor: {},
            id: null,
            company_id: null,
            name: null,
            code_direct_id: null,
            provider_vendor: 1,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            note: null,
        }
    }
    
    const populate_form = function (provider) {
        
        if (provider) {
            _provider_id.value = (provider.id) ? provider.id : null
            _provider_name.value = (provider.id) ? provider.id : null
            _provider_enabled.checked = (provider.enabled === 1)
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
    
    const navigate = function (provider) {
        if (provider && provider.id) {
            window.location.replace(base_url + "/" + provider.id)
        }
    }
    
    const init = function (settings) {
    
    }
    
    const set = function (provider) {
        let detail = _default_detail()
        //log("Provider.set", provider)
        if (provider) {
            detail.id = (provider.id) ? provider.id : null
            detail.name = (provider.name) ? provider.name : null
            detail.location_id = (provider.location_id) ? provider.location_id : null
            detail.code_direct_id = (provider.code_direct_id) ? provider.code_direct_id : null
            detail.provider_vendor = (provider.provider_vendor) ? provider.provider_vendor : 1
            detail.enabled = (provider.enabled) ? provider.enabled : 1
            detail.date_created = (provider.date_created) ? provider.date_created : formatDateMySQL()
            detail.created_by = (provider.created_by) ? provider.created_by : user_id
            detail.date_modified = (provider.date_modified) ? provider.date_modified : formatDateMySQL()
            detail.modified_by = (provider.modified_by) ? provider.modified_by : user_id
            detail.note = (provider.note) ? provider.note : null
            detail.vendor = (provider.vendor) ? provider.vendor : {}
            detail.addresses = (provider.addresses) ? provider.addresses : []
            detail.contacts = (provider.contacts) ? provider.contacts : []
            detail.location = (provider.location) ? provider.location : {}
            detail.company = (provider.company) ? provider.company : {}
        }
        
        Provider.detail = detail
        return detail
    }
    
    const load_all = function (providers) {
        Provider.all = new Map()
        if (providers) {
            $.each(providers, function (i, provider) {
                let detail = set(provider)
                $index_table.insertRow(detail)
                Provider.all.set(detail.id, detail)
            })
        }
    }
    
    const index = function (settings) {
        build_index_table()
        
        if (settings) {
            if (settings.providers) {
                load_all(settings.providers)
            }
        }
        
    }
    
    const build_index_table = function () {
        //log("build_index_table")
        $index_table = $(_table_provider_index).table({
            table_type: "display_list",
            data: Provider.all,
            columnDefs: [
                {
                    title: "Name",
                    targets: 0,
                    data: "name",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "Code Direct ID",
                    targets: 1,
                    data: "code_direct_id",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "SKU",
                    targets: 2,
                    data: "vendor",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data.sku + "</span>"
                    },
                },
                {
                    title: "Location",
                    targets: 3,
                    data: "location",
                    render: function (data, type, row, meta) {
                        let displayLocation = ""
                        if (defaultLocationDisplayFormat === "short") {
                            displayLocation = data.display_short
                        } else if (defaultLocationDisplayFormat === "long") {
                            displayLocation = data.display_long
                        } else {
                            displayLocation = data.display_medium
                        }
                        
                        return "<span style='white-space: nowrap;'>" + displayLocation + "</span>"
                    },
                },
            ],
            rowClick: Provider.navigate,
        })
    }
    
    const edit = function (settings) {
        let provider_detail = {}
        let location = {}
        let addresses = []
        let contacts = []
        let company = {}
        if (settings.provider_detail) {
            provider_detail = settings.provider_detail
            if (provider_detail.location) {
                location = provider_detail.location
            }
        }
        
        if (settings.address_detail) {
            addresses = settings.address_detail
        }
        
        if (settings.contact_detail) {
            contacts = settings.contact_detail
        }
        
        console.log("settings.provider_detail", settings.provider_detail.vendor)
        
        let provider = set(provider_detail)
        if (settings.provider_detail.vendor) {
            Vendor.init(settings.provider_detail.vendor)
        }
        Contact.init(contacts)
        Address.init(addresses)
        Address.load_all(addresses)
        Location.init(location)
        init_autocomplete()
        populate_form(provider_detail)
    }
    
    const init_autocomplete = function () {
        
        $(_provider_name)
          .on("change", function () {
          
          })
          .on("click", function () {
              $(this).select()
          })
          .autocomplete({
              serviceUrl: "/api/v1.0/autocomplete/providers",
              minChars: 2,
              cache: false,
              dataType: "json",
              triggerSelectOnValidInput: false,
              paramName: "st",
              onSelect: function (suggestion) {
                  if (suggestion.data) {
                      let provider = suggestion.data
                      let provider_id = provider.id
                      let provider_company_id = provider.company.id
                      _provider_id.value = provider_id
                      _provider_company_id.value = provider_company_id
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
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        navigate: function (provider) {
            navigate(provider)
        },
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
        index: function (providers) {
            index(providers)
        },
        edit: function (settings) {
            edit(settings)
        },
    }
    
})()
