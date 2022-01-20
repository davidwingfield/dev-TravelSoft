const Provider = (function () {
    "use strict"
    const base_url = "/providers"
    const _button_add_provider_page_heading = document.getElementById("button_add_provider_page_heading")
    const _button_edit_provider_name = document.getElementById("button_edit_provider_name")
    const _button_save_provider = document.getElementById("button_save_provider")
    const _panel_tab_contact = document.getElementById("panel_tab_contact")
    const _panel_tab_vendor = document.getElementById("panel_tab_vendor")
    const _panel_tab_address = document.getElementById("panel_tab_address")
    const _panel_tab_provider = document.getElementById("panel_tab_provider")
    const _table_provider_index = document.getElementById("table_provider_index")
    const _location_id = document.getElementById("location_id")
    const _company_name = document.getElementById("company_name")
    const _provider_id = document.getElementById("provider_id")
    const _provider_name = document.getElementById("provider_name")
    const _provider_company_id = document.getElementById("provider_company_id")
    const _provider_enabled = document.getElementById("provider_enabled")
    const _provider_code_direct_id = document.getElementById("provider_code_direct_id")
    const _vendor_name = document.getElementById("vendor_name")
    const _vendor_company_id = document.getElementById("vendor_company_id")
    const _company_id = document.getElementById("company_id")
    const _location_name_filter_id = document.getElementById("location_name_filter_id")
    const _form_edit_provider = document.getElementById("form_edit_provider")
    const _form_product_add = document.getElementById("form_product_add")
    const _modal_product_provider_name = document.getElementById("modal_product_provider_name")
    const _modal_product_provider_id = document.getElementById("modal_product_provider_id")
    const _modal_product_vendor_id = document.getElementById("modal_product_vendor_id")
    const _modal_product_vendor_name = document.getElementById("modal_product_vendor_name")
    const _modal_product_vendor_company_id = document.getElementById("modal_product_vendor_company_id")
    const _modal_product_provider_company_id = document.getElementById("modal_product_provider_company_id")
    const _modal_product_provider_vendor_match = document.getElementById("modal_product_provider_vendor_match")
    const _modal_product_provider_location_id = document.getElementById("modal_product_provider_location_id")
    const _modal_product_location_id = document.getElementById("modal_product_location_id")
    // --
    
    // --
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
          Console.log("company_detail", company_detail)
          Console.log("provider_detail", provider_detail)
          Console.log("location_detail", location_detail)
          Console.log("vendor_detail", vendor_detail)
          Console.log("addresses", addresses)
          Console.log("contacts", contacts)
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
          //Console.log("test")
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
     * add provider
     *
     * @param provider
     */
    const add = function (provider) {
        Console.log("add", provider)
        if (provider) {
            
            let dataToSend = {
                name: _modal_product_provider_name.value,
                status_id: 1,
                show_online: 1,
                show_sales: 1,
                show_ops: 1,
                is_provider: 1,
                enabled: 1,
            }
            
            Vendor.newVendor(dataToSend, function (data) {
                let vendor_detail, provider_detail = {}
                
                if (data) {
                    vendor_detail = data
                    if (data[0]) {
                        vendor_detail = data[0]
                    }
                    Console.log("Provider Upodating Vendor: vendor_detail", vendor_detail)
                    
                    provider.location_id = (provider.location_id) ? provider.location_id : 1
                    provider.vendor_id = vendor_detail.id
                    provider_detail = {
                        provider_detail: provider,
                    }
                    
                    Console.log("Provider : provider_detail", provider_detail)
                    updateProvider(provider_detail, function (data) {
                        if (data) {
                            Console.log("data", data)
                            if (data[0]) {
                                //Console.log("data[0]", data[0])
                                let provider = data[0]
                                let vendor = provider.vendor
                                let company = provider.company
                                let provider_detail = set(provider)
                                _modal_product_provider_name.value = provider.name
                                _modal_product_provider_id.value = provider.id
                                _modal_product_provider_company_id.value = company.id
                                _modal_product_vendor_name.value = provider.name
                                _modal_product_vendor_id.value = vendor.id
                                _modal_product_vendor_company_id.value = company.id
                                
                                initAutoComplete()
                                
                                Product.attr2 = (provider.code_direct_id) ? provider.code_direct_id : null
                                Product.attr3 = (vendor.sku) ? vendor.sku : null
                                Product.update_product_sku()
                                
                            }
                        }
                    })
                }
            })
            
        }
    }
    
    /**
     * initialize provider autocomplete
     */
    const initAutoComplete = function () {
        
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
              $(this).select(function () {
                  //$( "div" ).text( "Something was selected" ).show().fadeOut( 1000 );
              })
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
                  Console.log("suggestion.data", suggestion.data)
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
        
        $(_modal_product_provider_name)
          .on("change", function () {
              setTimeout(function () {
                  let provider_name = _modal_product_provider_name.value
                  
                  if (globalSelectedProvider === false) {
                      if (provider_name === "") {
                          _modal_product_vendor_id.value = ""
                          _modal_product_provider_id.value = ""
                          _modal_product_vendor_name.value = ""
                          _modal_product_provider_name.value = ""
                          _modal_product_vendor_company_id.value = ""
                          _modal_product_provider_company_id.value = ""
                          _modal_product_provider_location_id.value = ""
                          _modal_product_vendor_name.disabled = true
                          Product.attr2 = null
                          Product.attr3 = null
                          Product.update_product_sku()
                          globalSelectedProvider = false
                      } else {
                          provider_exists(provider_name)
                      }
                  }
              }, 200)
          })
          .on("search", function () {
              _modal_product_vendor_id.value = ""
              _modal_product_provider_id.value = ""
              _modal_product_vendor_name.value = ""
              _modal_product_provider_name.value = ""
              _modal_product_vendor_company_id.value = ""
              _modal_product_provider_company_id.value = ""
              _modal_product_provider_location_id.value = ""
              Product.attr2 = null
              Product.attr3 = null
              Product.update_product_sku()
              _modal_product_vendor_name.disabled = true
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
                  if (!suggestion || !suggestion.data) {
                      return
                  }
                  Console.log("suggestion.data", suggestion.data)
                  let provider = set(suggestion.data)
                  let vendor = provider.vendor
                  let code_direct = (provider.code_direct_id) ? provider.code_direct_id : null
                  let sku = (vendor.sku) ? vendor.sku : null
                  
                  _modal_product_vendor_id.value = parseInt(suggestion.data.vendor.id)
                  _modal_product_provider_id.value = suggestion.data.id
                  _modal_product_vendor_name.value = suggestion.data.name
                  _modal_product_vendor_company_id.value = (!isNaN(parseInt(suggestion.data.company_id))) ? parseInt(suggestion.data.company_id) : null
                  _modal_product_provider_company_id.value = (!isNaN(parseInt(suggestion.data.company_id))) ? parseInt(suggestion.data.company_id) : null
                  _modal_product_provider_vendor_match.checked = true
                  _modal_product_vendor_name.disabled = false
                  _modal_product_provider_location_id.value = (!isNaN(parseInt(provider.location.id))) ? parseInt(provider.location.id) : null
                  
                  Product.attr2 = code_direct
                  Product.attr3 = sku
                  Product.update_product_sku()
                  
                  //$(_modal_product_vendor_name).trigger("change")
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
                let provider
                
                if (_form_product_add) {
                    
                    if (!data || data.length === 0) {
                        confirmDialog("This provider does not exist. Would you like to create it?", (ans) => {
                            if (ans) {
                                Company.add_to_company_list({
                                    name: _modal_product_provider_name.value,
                                    status_id: 10,
                                    enabled: 1,
                                }, function (data) {
                                    if (data) {
                                        if (data[0]) {
                                            let company = data[0]
                                            _modal_product_provider_company_id.value = company.id
                                            _modal_product_vendor_company_id.value = company.id
                                            _modal_product_provider_name.value = company.name
                                            _modal_product_vendor_name.value = company.name
                                            _modal_product_provider_vendor_match.checked = true
                                            add(remove_nulls({
                                                location_id: null,
                                                company_id: company.id,
                                                code_direct_id: null,
                                                id: null,
                                                provider_vendor: 1,
                                                enabled: 1,
                                            }))
                                        }
                                    }
                                })
                            } else {
                                _modal_product_vendor_id.value = ""
                                _modal_product_provider_id.value = ""
                                _modal_product_vendor_name.value = ""
                                _modal_product_provider_name.value = ""
                                globalSelectedProvider = false
                            }
                        })
                    } else {
                        if (data) {
                            provider = data
                            if (data.length > 0) {
                                provider = data[0]
                            }
                        }
                        
                        Console.log("provider", provider)
                        
                        let vendor = provider.vendor
                        let code_direct = (provider.code_direct_id) ? provider.code_direct_id : null
                        let sku = (vendor.sku) ? vendor.sku : null
                        Console.log("code_direct", code_direct)
                        Console.log("sku", sku)
                        
                        _modal_product_vendor_id.value = parseInt(vendor.id)
                        _modal_product_provider_id.value = provider.id
                        _modal_product_vendor_name.value = provider.name
                        _modal_product_vendor_company_id.value = (!isNaN(parseInt(provider.company_id))) ? parseInt(provider.company_id) : null
                        _modal_product_provider_company_id.value = (!isNaN(parseInt(provider.company_id))) ? parseInt(provider.company_id) : null
                        _modal_product_provider_vendor_match.checked = true
                        _modal_product_vendor_name.disabled = false
                        _modal_product_provider_location_id.value = (!isNaN(parseInt(provider.location.id))) ? parseInt(provider.location.id) : null
                        _modal_product_location_id.value = (!isNaN(parseInt(provider.location.id))) ? parseInt(provider.location.id) : null
                        Product.attr2 = code_direct
                        Product.attr3 = sku
                        Product.update_product_sku()
                        
                        /*
                        
                        
    
                        
                        
    
                        Product.attr2 = code_direct
                        Product.attr3 = sku
                        Product.update_product_sku()
                        //*/
                    }
                }
                
                if (_form_edit_provider) {
                    if (data) {
                        if (data.length > 0) {
                            
                            provider = data[0]
                            
                            if (_form_product_add) {
                            
                            }
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
                    Console.log("provider", provider)
                    $(_vendor_name).val($(_provider_name).val()).trigger("change")
                }
                
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
                    Console.log("data 1", data)
                    if (data[0]) {
                        Console.log("data[0] 1", data[0])
                        let details = data[0]
                        if (details.id) {
                            if (_provider_id.value === "" || isNaN(parseInt(_provider_id.value))) {
                                window.location.replace(base_url + "/" + details.id)
                            } else {
                                let name = _company_name.value
                                toastr.success(`Provider ${name} has been updated.`)
                            }
                        } else {
                            Console.log("details 1", details)
                        }
                    } else {
                        Console.log("details 2", data)
                    }
                } else {
                    Console.log("details 3", provider)
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
                    if (data) {
                        return callback(data)
                    } else {
                        return handle_provider_error("Oops: 1")
                    }
                })
            } catch (e) {
                Console.log("error", e)
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
        Console.log("set_progress()")
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
                $(_company_name).attr("readonly", true)
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
                Console.log("error", e)
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
            initAutoComplete()
            validator_init(form_rules)
            validator = $(_form_edit_provider).validate()
        }
        
        if (settings) {
            
            if (settings.is_new) {
                isNew = settings.is_new
                _button_save_provider.disabled = true
                $(_panel_tab_provider).addClass("disabled")
                $(_panel_tab_vendor).addClass("disabled")
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
        initAutoComplete()
    }
    
    /**
     * return public params
     */
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
