const Provider = (function () {
      "use strict"
      
      const base_url = "/providers"
      //Buttons
      const _button_add_provider_page_heading = document.getElementById("button_add_provider_page_heading")
      const _button_edit_provider_name = document.getElementById("button_edit_provider_name")
      //Tables
      const _table_provider_index = document.getElementById("table_provider_index")
      //Fields
      const _provider_id = document.getElementById("provider_id")
      const _provider_name = document.getElementById("provider_name")
      const _provider_company_id = document.getElementById("provider_company_id")
      const _provider_enabled = document.getElementById("provider_enabled")
      const _provider_code_direct_id = document.getElementById("provider_code_direct_id")
      //Defaults
      let globalSelectedProvider = false
      let $index_table = $(_table_provider_index)
      let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
      
      $(_button_add_provider_page_heading)
        .on("click", function () {
            //console.log("test")
        })
      
      $(_button_edit_provider_name)
        .on("click", function () {
            enable_form_fields()
        })
      
      // ----
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
      
      // ----
      
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
      
      // ----
      
      const save = function (params) {
      
      }
      
      const get = function (id) {
          let data_to_send = {}
          if (id) {
              data_to_send.id = id
          }
          
      }
      
      const init = function (settings) {
      
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
      
      // ----
      
      const enable_form_fields = function () {
          if (_provider_id.value !== "" && _provider_company_id.value !== "") {
              _provider_name.disabled = false
          }
      }
      
      const disable_form_fields = function () {
          if (_provider_id.value !== "" && _provider_company_id.value !== "") {
              _provider_name.disabled = true
          }
      }
      
      // ----
      
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
      
      // ----
      const provider_exists = function (name) {
          if (name && name !== "") {
              let dataToSend = {
                  name: name,
              }
              
              fetch_provider_by_name(dataToSend, function (data) {
                  if (data) {
                      if (data.length > 0) {
                          $(".alert").alert()
                      } else {
                      
                      }
                  }
              })
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
              _provider_name.value = (provider.name) ? provider.name : null
              _provider_company_id.value = (provider.company_id) ? provider.company_id : null
              _provider_code_direct_id.value = (provider.code_direct_id) ? provider.code_direct_id : null
              _provider_enabled.checked = (provider.enabled === 1)
          }
      }
      
      /**
       * initialize provider autocomplete
       */
      const init_autocomplete = function () {
          $(_provider_name)
            .on("change", function () {
                setTimeout(function () {
                    let provider_name = _provider_name.value
                    if (globalSelectedProvider === false) {
                        if (provider_name === "") {
                            _provider_name.value = ""
                            _provider_company_id.value = ""
                            globalSelectedProvider = false
                        } else {
                            provider_exists(provider_name, function (data) {
                                log("data", data)
                                if (data) {
                                
                                }
                            })
                        }
                    }
                }, 200)
            })
            .on("search", function () {
                _provider_id.value = ""
                _provider_company_id.value = ""
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
                    let provider = suggestion.data
                    let provider_id = provider.id
                    let provider_company_id = provider.company.id
                    
                    _provider_id.value = provider_id
                    _provider_company_id.value = provider_company_id
                },
            })
      }
      
      /**
       * initialize provider edit page
       *
       * @param settings
       */
      const edit = function (settings) {
          if (!settings || !settings.provider_detail) {
              return
          }
          
          let provider = set(settings.provider_detail)
          let addresses = (provider.addresses) ? provider.addresses : []
          let contacts = (provider.contacts) ? provider.contacts : []
          let location = (provider.location) ? provider.location : {}
          let company = (provider.company) ? provider.company : {}
          let vendor = (provider.vendor) ? provider.vendor : {}
          
          populate_form(provider)
          init_autocomplete()
          
          // ----
          Vendor.init(vendor)
          Location.init(location)
          Address.init(addresses)
          Contact.init(contacts)
          
          Vendor.setProvider()
          disable_form_fields()
      }
      
      // ----
      
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
      
  }
)
()
