const Provider = (function () {
    "use strict"
    
    const base_url = "/providers"
    const _input_provider_id = document.getElementById("input_provider_id")
    const _input_provider_company_id = document.getElementById("input_provider_company_id")
    const _input_provider_location_id = document.getElementById("input_provider_location_id")
    const _input_provider_code_direct_id = document.getElementById("input_provider_code_direct_id")
    const _input_provider_provider_vendor = document.getElementById("input_provider_provider_vendor")
    const _input_provider_enabled = document.getElementById("input_provider_enabled")
    const _input_provider_date_created = document.getElementById("input_provider_date_created")
    const _input_provider_created_by = document.getElementById("input_provider_created_by")
    const _input_provider_date_modified = document.getElementById("input_provider_date_modified")
    const _input_provider_modified_by = document.getElementById("input_provider_modified_by")
    const _button_add_provider_page_heading = document.getElementById("button_add_provider_page_heading")
    const _table_provider_index = document.getElementById("table_provider_index")
    // ----
    let $index_table = $(_table_provider_index)
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    // ----
    $(_button_add_provider_page_heading)
      .on("click", function () {
          console.log("test")
      })
    // ----
    const handle_provider_error = function (msg) {
        toastr.error(msg)
    }
    
    const _default_detail = function () {
        return {
            addresses: [],
            contacts: [],
            location: [],
            company: [],
            vendor: [],
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
        console.log(" -- Provider -- ", {})
    }
    
    const set = function (provider) {
        let detail = _default_detail()
        if (provider) {
            detail.id = (provider.id) ? provider.id : null
            detail.name = (provider.name) ? provider.name : null
            detail.company_id = (provider.company_id) ? provider.company_id : null
            detail.location_id = (provider.location_id) ? provider.location_id : null
            detail.code_direct_id = (provider.code_direct_id) ? provider.code_direct_id : null
            detail.provider_vendor = (provider.provider_vendor) ? provider.provider_vendor : 1
            detail.enabled = (provider.enabled) ? provider.enabled : 1
            detail.date_created = (provider.date_created) ? provider.date_created : formatDateMySQL()
            detail.created_by = (provider.created_by) ? provider.created_by : created_by
            detail.date_modified = (provider.date_modified) ? provider.date_modified : formatDateMySQL()
            detail.modified_by = (provider.modified_by) ? provider.modified_by : modified_by
            detail.note = (provider.note) ? provider.note : null
            detail.vendor = (provider.vendor) ? provider.vendor : []
            detail.addresses = (provider.addresses) ? provider.addresses : []
            detail.contacts = (provider.contacts) ? provider.contacts : []
            detail.location = (provider.location) ? provider.location : []
            detail.company = (provider.company) ? provider.company : []
        }
        
        Provider.detail = detail
        return detail
    }
    
    const set_autocomplete = function () {
    
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
        $index_table = $(_table_provider_index).table({
            table_type: "display_list",
            data: Provider.all,
            columnDefs: [
                {
                    title: "Name",
                    targets: 0,
                    data: "name",
                    render: function (data, type, row, meta) {
                        return data
                    },
                },
                {
                    title: "Code Direct ID",
                    targets: 1,
                    data: "code_direct_id",
                    render: function (data, type, row, meta) {
                        return data
                    },
                },
                {
                    title: "SKU",
                    targets: 2,
                    data: "vendor",
                    render: function (data, type, row, meta) {
                        return data.sku
                    },
                },
                {
                    title: "Location",
                    targets: 3,
                    data: "location",
                    render: function (data, type, row, meta) {
                        console.log("data.location", data)
                        console.log("defaultLocationDisplayFormat", defaultLocationDisplayFormat)
                        let displayLocation = ""
                        if (defaultLocationDisplayFormat === "short") {
                            displayLocation = data.short
                        } else if (defaultLocationDisplayFormat === "long") {
                            displayLocation = data.long
                        } else {
                            displayLocation = data.medium
                        }
                        return displayLocation
                    },
                },
            ],
            rowClick: Provider.navigate,
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
    }
    
})()
