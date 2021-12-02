const Provider = (function () {
    "use strict"
    
    const base_url = "/providers"
    
    /** Buttons */
    const _button_add_provider_page_heading_table = document.getElementById("button_add_provider_page_heading_table")
    
    const _button_add_provider_page_heading = document.getElementById("button_add_provider_page_heading")
    const _button_edit_provider_name = document.getElementById("button_edit_provider_name")
    const _button_save_provider = document.getElementById("button_save_provider")
    /** Tabs */
    const _panel_tab_contact = document.getElementById("panel_tab_contact")
    const _panel_tab_company = document.getElementById("panel_tab_company")
    const _panel_tab_vendor = document.getElementById("panel_tab_vendor")
    const _panel_tab_location = document.getElementById("panel_tab_location")
    const _panel_tab_address = document.getElementById("panel_tab_address")
    const _panel_tab_provider = document.getElementById("panel_tab_provider")
    /** Tables */
    const _table_provider_index = document.getElementById("table_provider_index")
    /** Fields */
    const _location_id = document.getElementById("location_id")
    const _company_name = document.getElementById("company_name")
    const _company_cover_image = document.getElementById("company_cover_image")
    
    const _provider_description_long = document.getElementById("provider_description_long")
    const _provider_description_short = document.getElementById("provider_description_short")
    const _provider_keywords = document.getElementById("provider_keywords")
    
    const _provider_id = document.getElementById("provider_id")
    const _provider_name = document.getElementById("provider_name")
    const _provider_company_id = document.getElementById("provider_company_id")
    const _provider_enabled = document.getElementById("provider_enabled")
    const _provider_code_direct_id = document.getElementById("provider_code_direct_id")
    const _vendor_name = document.getElementById("vendor_name")
    const _vendor_company_id = document.getElementById("vendor_company_id")
    const _company_id = document.getElementById("company_id")
    const _location_name_filter_id = document.getElementById("location_name_filter_id")
    const _provider_key = document.getElementById("provider_keyword")
    let $provider_key
    //Forms
    const _form_edit_provider = document.getElementById("form_edit_provider")
    let globalSelectedProvider = false
    let isNew = false
    let validator
    let $index_table = $(_table_provider_index)
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let form_rules = {
        rules: {
            provider_name: {
                required: true,
            },
            provider_company_id: {
                required: true,
            },
        },
        messages: {
            provider_company_id: {
                required: "Field Required",
            },
            provider_name: {
                required: "Field Required",
            },
        },
    }
    
    $(_button_save_provider)
      .on("click", function () {
          let tabs = $("#provider_edit_tabs > li.nav-item > a.nav-link")
          let panels = $("div.tab-pane")
          let company_detail = Company.build()
          let provider_detail = Provider.build()
          let location_detail = Location.build()
          let vendor_detail = Vendor.build()
          let addresses = Array.from(Address.all.values())
          let contacts = Array.from(Contact.all.values())
          /*
          console.log("company_detail", company_detail)
          console.log("provider_detail", provider_detail)
          console.log("location_detail", location_detail)
          console.log("vendor_detail", vendor_detail)
          console.log("addresses", addresses)
          console.log("contacts", contacts)
          //*/
          if (!company_detail || !provider_detail || !location_detail || !vendor_detail || !addresses || !contacts) {
              $.each(panels, function (index, item) {
                  if ($(this).find(".is-invalid").length > 0) {
                      let nav_tab = $("body").find("[aria-controls='" + $(this).attr("id") + "']")
                      tabs.removeClass("active")
                      panels.removeClass("active")
                      $(this).addClass("active")
                      nav_tab.addClass("active")
                      return false
                  }
              })
              return
          }
          
          provider_detail.location_id = (location_detail.id) ? location_detail.id : null
          vendor_detail.is_provider = (_form_edit_provider) ? 1 : 0
          
          // ----
          
          confirmDialog(`Would you like to update?`, (ans) => {
              if (ans) {
                  
                  save({
                      "company_detail": company_detail,
                      "provider_detail": provider_detail,
                      "location_detail": location_detail,
                      "vendor_detail": vendor_detail,
                      "addresses": addresses,
                      "contacts": contacts,
                  })
              }
              
          })
      })
    
    $("#provider_edit")
      .on("change", function () {
          set_progress()
      })
    
    $(_provider_company_id)
      .on("change", function () {
          $(_vendor_company_id).val($(this).val())
      })
    
    $(_button_add_provider_page_heading)
      .on("click", function () {
          //console.log("test")
      })
    
    $(_button_edit_provider_name)
      .on("click", function () {
          enable_form_fields()
      })
    
    $(_company_id)
      .on("change", function () {
          $(_provider_company_id).val(_company_id.value)
      })
    
    /**
     * initialize provider autocomplete
     */
    const init_autocomplete = function () {
        $(_provider_name)
          .on("change", function () {
              /*
              setTimeout(function () {
                  let provider_name = _provider_name.value
                  
                  if (globalSelectedProvider === false) {
                      if (provider_name === "") {
                          _provider_name.value = ""
                          _provider_company_id.value = ""
                          globalSelectedProvider = false
                          $(_vendor_name).val("").trigger("change")
                          $(_provider_company_id).val("").trigger("change")
                      } else {
                          provider_exists(provider_name)
                      }
                  }
              }, 200)
              //*/
          })
          .on("search", function () {
              //_provider_id.value = ""
              //_provider_company_id.value = ""
              
              //$(_vendor_name).val("").trigger("change")
              //$(_provider_company_id).val("").trigger("change")
              Provider.reset_form()
              Vendor.reset_form()
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
                  if (!suggestion.data) {
                      return
                  }
                  console.log("sugges", suggestion)
                  let provider = suggestion.data
                  let company = (provider.company) ? provider.company : {}
                  let addresses = (provider.addresses) ? provider.addresses : {}
                  let contacts = (provider.contacts) ? provider.contacts : {}
                  let location = (provider.location) ? provider.location : {}
                  let vendor = (provider.vendor) ? provider.vendor : {}
                  //
                  let provider_id = provider.id
                  let company_name = provider.company.name
                  let provider_company_id = provider.company.id
                  //
                  if (_form_edit_provider) {
                      $(_provider_company_id).val(provider_company_id)
                      $(_provider_id).val(provider_id)
                      confirmDialog("This provider exists. Would you like to edit it?", (ans) => {
                          if (ans) {
                              window.location.replace("/providers/" + provider_id)
                              populate_form(provider)
                              Company.populate_form(company)
                              Location.populate_form(location)
                              $(_vendor_company_id).val(provider_company_id)
                              $(_vendor_name).val(company_name).trigger("change")
                          } else {
                              Provider.reset_form()
                              Vendor.reset_form()
                          }
                      })
                  }
              },
          })
    }
    
    /**
     * check if provider with same name exists
     *
     * @param name
     */
    const provider_exists = function (name) {
        
        if (name && name !== "") {
            let dataToSend = {
                name: name,
            }
            
            fetch_provider_by_name(dataToSend, function (data) {
                if (data) {
                    if (data.length > 0) {
                        let provider = data[0]
                        
                        confirmDialog("This provider exists. Would you like to edit it?", (ans) => {
                            if (ans) {
                                window.location.href = "/providers/" + provider.id
                            } else {
                                Company.reset_form()
                                Provider.reset_form()
                                Vendor.reset_form()
                                
                            }
                        })
                    }
                }
                $(_vendor_name).val($(_provider_name).val()).trigger("change")
            })
        }
    }
    
    /**
     * initialize provider index page
     *
     * @param settings
     */
    const index = function (settings) {
        build_index_table()
        
        if (settings) {
            if (settings.providers) {
                load_all(settings.providers)
            }
        }
        
    }
    
    /**
     * build provider index table
     */
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
    
    /**
     * when provider index table row clicked handle event
     *
     * @param provider
     */
    const navigate = function (provider) {
        if (provider && provider.id) {
            window.location.replace(base_url + "/" + provider.id)
        }
    }
    
    /**
     * handle provider form errors
     *
     * @param msg
     */
    const handle_provider_error = function (msg) {
        toastr.error(msg)
    }
    
    /**
     * set default provider object values
     *
     * @returns {{note: null, addresses: *[], company_id: null, date_created: *, code_direct_id: null, created_by: (number|number), enabled: number, provider_vendor: number, date_modified: *, vendor: {}, name: null, modified_by: (number|number), location: {}, company: {}, id: null, contacts: *[]}}
     * @private
     */
    const _default_detail = function () {
        return {
            addresses: [],
            contacts: [],
            location: {},
            company: {},
            vendor: {},
            id: null,
            description_long: null,
            description_short: null,
            keywords: null,
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
    
    /**
     * load all providers into object
     *
     * @param providers
     */
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
    
    /**
     * save provider object
     *
     * @param provider
     */
    const save = function (provider) {
        if (provider) {
            updateProvider(provider, function (data) {
                if (data) {
                    console.log("data 1", data)
                    if (data[0]) {
                        console.log("data[0] 1", data[0])
                        let details = data[0]
                        if (details.id) {
                            if (_provider_id.value === "" || isNaN(parseInt(_provider_id.value))) {
                                window.location.replace(base_url + "/" + details.id)
                            } else {
                                let name = _company_name.value
                                toastr.success(`Provider ${name} has been updated.`)
                            }
                        } else {
                            console.log("details 1", details)
                        }
                    } else {
                        console.log("details 2", data)
                    }
                } else {
                    console.log("details 3", provider)
                }
            })
        }
    }
    
    /**
     * update provider record
     *
     * @param dataToSend
     * @param callback
     */
    const updateProvider = function (dataToSend, callback) {
        let url = "/api/v1.0/providers/update"
        
        if (dataToSend) {
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    console.log(data)
                    if (data) {
                        return callback(data)
                    } else {
                        return handle_provider_error("Oops: 1")
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }
    }
    
    /**
     * build provider object
     *
     * @returns {*}
     */
    const build = function () {
        return remove_nulls({
            location_id: (!isNaN(parseInt(_location_id.value))) ? parseInt(_location_id.value) : null,
            company_id: (!isNaN(parseInt(_provider_company_id.value))) ? parseInt(_provider_company_id.value) : null,
            code_direct_id: (_provider_code_direct_id.value === "") ? null : _provider_code_direct_id.value,
            id: (!isNaN(parseInt(_provider_id.value))) ? parseInt(_provider_id.value) : null,
            provider_vendor: (_form_edit_provider) ? 1 : 0,
            enabled: 1,
            description_long: (_provider_description_long.value === "") ? null : _provider_description_long.value,
            description_short: (_provider_description_short.value === "") ? null : _provider_description_short.value,
            keywords: $provider_key.build(),
        })
    }
    
    /**
     * validate for values
     *
     * @returns {*|jQuery}
     */
    const validate_form = function () {
        return $(_form_edit_provider).valid()
    }
    
    /**
     * set provider object values
     *
     * @param provider
     * @returns {{note: null, addresses: *[], company_id: null, date_created: *, code_direct_id: null, created_by: (number|number), enabled: number, provider_vendor: number, date_modified: *, vendor: {}, name: null, modified_by: (number|number), location: {}, company: {}, id: null, contacts: *[]}}
     */
    const set = function (provider) {
        let detail = _default_detail()
        
        if (provider) {
            detail.id = (provider.id) ? provider.id : null
            detail.name = (provider.name) ? provider.name : null
            detail.location_id = (provider.location_id) ? provider.location_id : null
            detail.code_direct_id = (provider.code_direct_id) ? provider.code_direct_id : null
            detail.description_long = (provider.description_long) ? provider.description_long : null
            detail.description_short = (provider.description_short) ? provider.description_short : null
            detail.keywords = (provider.keywords) ? provider.keywords : null
            detail.provider_vendor = (provider.provider_vendor) ? provider.provider_vendor : 1
            detail.enabled = (provider.enabled) ? provider.enabled : 1
            detail.date_created = (provider.date_created) ? provider.date_created : formatDateMySQL()
            detail.company_id = (provider.company_id) ? provider.company_id : null
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
    
    /**
     * enable form fields
     */
    const enable_form_fields = function () {
        if (_provider_id.value !== "" && _provider_company_id.value !== "") {
        
        }
    }
    
    /**
     * regulate tab access
     */
    const set_progress = function () {
        let provider_id = (!isNaN(_provider_id.value)) ? _provider_id.value : null
        let company_id = (!isNaN(_provider_company_id.value)) ? _provider_company_id.value : null
        
        if (company_id === null || company_id === "") {
            $(_panel_tab_contact).addClass("disabled")
            $(_panel_tab_address).addClass("disabled")
            $(_panel_tab_provider).addClass("disabled")
            $(_panel_tab_vendor).addClass("disabled")
        } else {
            $(_panel_tab_contact).removeClass("disabled")
            $(_panel_tab_address).removeClass("disabled")
            $(_panel_tab_provider).removeClass("disabled")
            $(_panel_tab_vendor).removeClass("disabled")
        }
        
        _button_save_provider.disabled = !(_company_id.value !== "" && _location_name_filter_id.value !== "")
        
    }
    
    /**
     * disable form fields
     */
    const disable_form_fields = function () {
        $(_provider_name).attr("readonly", true)
        
        if (_form_edit_provider) {
            if (isNew) {
                //$(_provider_name).attr("readonly", false)
                //_company_cover_image.disabled = true
                //_button_edit_provider_name.disabled = true
                //$(_panel_tab_contact).addClass("disabled")
                //$(_panel_tab_address).addClass("disabled")
            } else {
                //_company_cover_image.disabled = false
                //$(_provider_name).attr("readonly", true)
                //_button_edit_provider_name.disabled = false
                //$(_panel_tab_contact).removeClass("disabled")
                //$(_panel_tab_address).removeClass("disabled")
            }
        }
        
    }
    
    /**
     * pupulate provider form
     *
     * @param provider
     */
    const populate_form = function (provider) {
        if (provider) {
            _provider_id.value = (provider.id) ? provider.id : null
            $(_provider_name).val((provider.name) ? provider.name : null)
            $(_company_name).val($(_provider_name).val())
            _provider_company_id.value = (provider.company_id) ? provider.company_id : null
            _provider_code_direct_id.value = (provider.code_direct_id) ? provider.code_direct_id : null
            let provider_keywords = (provider.keywords) ? provider.keywords : ""
            $provider_key = $(_provider_key).BuildKeyword(provider_keywords)
            $(_provider_description_long).val(provider.description_long)
            $(_provider_description_short).val(provider.description_short)
            _provider_enabled.checked = (provider.enabled) ? (provider.enabled === 1) : true
        }
        
    }
    
    /**
     * reset provider form
     */
    const reset_form = function () {
        _provider_id.value = ""
        $(_provider_name).val("").trigger("change")
        _provider_company_id.value = ""
        _provider_code_direct_id.value = ""
        _provider_enabled.checked = true
    }
    
    /**
     * fetch provider by name
     *
     * @param dataToSend
     * @param callback
     */
    const fetch_provider_by_name = function (dataToSend, callback) {
        let url = "/api/v1.0/providers/validate"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handle_provider_error("Oops: 1")
                    }
                })
            } catch (e) {
                console.log(e)
                return handle_provider_error("Error Validating Company")
            }
        } else {
            return handle_provider_error("Error Loading Company- Missing Data")
        }
    }
    
    /**
     * initialize provider edit page
     *
     * @param settings
     */
    const edit = function (settings) {
        let provider = {}
        let addresses = []
        let contacts = []
        let location = {}
        let company = {}
        let vendor = {}
        //
        if (_form_edit_provider) {
            init_autocomplete()
            validator_init(form_rules)
            validator = $(_form_edit_provider).validate()
        }
        
        if (settings) {
            
            if (settings.is_new) {
                isNew = settings.is_new
                _button_save_provider.disabled = true
                $(_panel_tab_provider).addClass("disabled")
                $(_panel_tab_vendor).addClass("disabled")
                //$(_panel_tab_location).addClass("disabled")
                
                $(_panel_tab_address).addClass("disabled")
            }
            
            if (settings.provider_detail) {
                provider = set(settings.provider_detail)
                addresses = (provider.addresses) ? provider.addresses : []
                contacts = (provider.contacts) ? provider.contacts : []
                location = (provider.location) ? provider.location : {}
                company = (provider.company) ? provider.company : {}
                vendor = (provider.vendor) ? provider.vendor : {}
            }
            
        }
        
        populate_form(provider)
        // ----
        Vendor.init(vendor)
        Location.init(location)
        Address.init(addresses)
        Contact.init(contacts)
        Company.init(company)
        // ----
        Vendor.setProvider()
        disable_form_fields()
        set_progress()
    }
    
    /**
     * initialize provider object
     *
     * @param settings
     */
    const init = function (settings) {
    
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
        build: function () {
            if (validate_form()) {
                return build()
            }
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
        reset_form: function () {
            reset_form()
        },
        provider_exists: function (name) {
            provider_exists(name)
        },
        enable_form_fields: function () {
            enable_form_fields()
        },
        disable_form_fields: function () {
            disable_form_fields()
        },
        index: function (providers) {
            index(providers)
        },
        edit: function (settings) {
            edit(settings)
        },
    }
    
})()
