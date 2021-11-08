const Company = (function () {
    "use strict"
    
    const _form_edit_company = document.getElementById("form_edit_company")
    const _company_enabled = document.getElementById("company_enabled")
    const _company_name = document.getElementById("company_name")
    const _company_phone_1 = document.getElementById("company_phone_1")
    const _company_phone_2 = document.getElementById("company_phone_2")
    const _company_fax = document.getElementById("company_fax")
    const _company_email = document.getElementById("company_email")
    const _company_website = document.getElementById("company_website")
    const _button_submit_form_edit_company = document.getElementById("button_submit_form_edit_company")
    const _company_cover_image = document.getElementById("company_cover_image")
    const _address_company_id = document.getElementById("address_company_id")
    const _company_id = document.getElementById("company_id")
    const _contact_company_id = document.getElementById("contact_company_id")
    // ----
    const _vendor_name = document.getElementById("vendor_name")
    const _vendor_company_id = document.getElementsByClassName("vendor_company_id")
    const _provider_name = document.getElementById("provider_name")
    const _provider_company_id = document.getElementById("provider_company_id")
    const _button_clear_form_edit_company = document.getElementById("button_clear_form_edit_company")
    const _company_edit_table_filters = document.getElementById("company_edit_table_filters")
    
    //
    const form_rules = {
        groups: {
            nameGroup: "company_name company_id",
        },
        rules: {
            company_name: {
                required: true,
            },
            company_phone_1: {},
            company_phone_2: {},
            company_fax: {},
            company_email: {
                email: true,
            },
            company_website: {
                url: true,
            },
        },
        messages: {
            company_name: {
                required: "Field Required1",
            },
            company_phone_1: {},
            company_phone_2: {},
            company_fax: {},
            company_email: {
                email: "Field Invalid",
            },
            company_website: {
                url: "Field Invalid",
            },
        },
        
    }
    
    //----
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let validator
    let globalSelectedCompany = false
    let suggestionsTempCompany = []
    
    $(_button_clear_form_edit_company)
      .on("click", function () {
          reset_form()
      })
    
    $(_button_submit_form_edit_company)
      .on("click", function () {
          let company = Company.build()
      })
    
    $(_company_id)
      .on("change", function () {
          _address_company_id.value = _company_id.value
      })
    $(_company_name)
      .on("change", function () {
          if (_provider_name) {
              //$(_provider_name).val($(_company_name).val())
          }
          
          if (_vendor_name) {
              //$(_vendor_name).val($(_company_name).val())
          }
      })
    
    /**
     * initialize provider autocomplete
     */
    const init_autocomplete = function () {
        $(_company_name)
          .on("change", function () {
              setTimeout(function () {
                  let company_name = _company_name.value
                  
                  if (globalSelectedCompany === false) {
                      if (company_name === "") {
                          _company_name.value = ""
                          _company_id.value = ""
                          globalSelectedCompany = false
                      } else {
                          company_exists(company_name)
                      }
                  }
              }, 200)
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
              serviceUrl: "/api/v1.0/autocomplete/companies",
              minChars: 2,
              cache: false,
              dataType: "json",
              triggerSelectOnValidInput: false,
              paramName: "st",
              onSelect: function (suggestion) {
                  if (!suggestion.data) {
                      return
                  }
                  
                  /**
                   * created_by: 4
                   * date_created: "2021-11-08 08:48:45"
                   * date_modified: "2021-11-08 08:48:45"
                   * email: "testcompany@email.com"
                   * enabled: 1
                   * fax: "+39-055-646465465"
                   * id: 1
                   * modified_by: 4
                   * name: "Test Company 1"
                   * note: null
                   * phone_1: "1112223333"
                   * phone_2: "+39-055-646465465"
                   * status_id: 10
                   * website: "https://www.google.com"
                   */
                  let company = suggestion.data
                  globalSelectedCompany = true
                  populate_form(company)
                  if (_provider_name) {
                      $(_provider_name).val(company.name).trigger("change")
                  }
                  if (_provider_company_id) {
                      $(_provider_company_id).val(company.id)
                  }
                  /*
                  let provider = suggestion.data
                  let company = (provider.company) ? provider.company : {}
                  let addresses = (provider.addresses) ? provider.addresses : {}
                  let contacts = (provider.contacts) ? provider.contacts : {}
                  let location = (provider.location) ? provider.location : {}
                  let vendor = (provider.vendor) ? provider.vendor : {}
                  let provider_id = provider.id
                  let company_name = provider.company.name
                  let provider_company_id = provider.company.id
                 
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
    
                  //*/
              },
          })
    }
    
    /**
     * handle company object errors
     *
     * @param msg
     */
    const handle_company_error = function (msg) {
        toastr.error(msg)
    }
    
    const _default_detail = function () {
        return {
            created_by: user_id,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
            email: null,
            cover_image: "/public/img/placeholder.jpg",
            enabled: 1,
            fax: null,
            id: null,
            modified_by: user_id,
            name: null,
            note: null,
            phone_1: null,
            phone_2: null,
            status_id: 10,
            website: null,
        }
    }
    
    const set_detail = function (company) {
        let detail = _default_detail()
        
        if (company) {
            detail.created_by = (company.created_by) ? company.created_by : user_id
            detail.date_created = (company.date_created) ? company.date_created : formatDateMySQL()
            detail.date_modified = (company.date_modified) ? company.date_modified : formatDateMySQL()
            detail.email = (company.email) ? company.email : null
            detail.cover_image = (company.cover_image) ? company.cover_image : null
            detail.enabled = (company.enabled) ? company.enabled : 1
            detail.fax = (company.fax) ? company.fax : null
            detail.id = (company.id) ? company.id : null
            detail.modified_by = (company.modified_by) ? company.modified_by : user_id
            detail.name = (company.name) ? company.name : null
            detail.note = (company.note) ? company.note : null
            detail.phone_1 = (company.phone_1) ? company.phone_1 : null
            detail.phone_2 = (company.phone_2) ? company.phone_2 : null
            detail.status_id = (company.status_id) ? company.status_id : 10
            detail.website = (company.website) ? company.website : null
        }
        
        Company.detail = detail
        return detail
    }
    
    const company_exists = function (name) {
        if (name && name !== "") {
            let dataToSend = {
                name: name,
            }
            
            fetch_company_by_name(dataToSend, function (data) {
                
                let company = null
                
                if (data && data[0]) {
                    if (data[0]) {
                        company = data[0]
                    }
                }
                
                if (company) {
                    reset_form()
                    populate_form(company)
                } else {
                    confirmDialog(`The company: ${name} does not exist exists. Would you like to create it?`, (ans) => {
                        if (ans) {
                            add_to_company_list({
                                name: _company_name.value,
                                status_id: 10,
                                enabled: 1,
                            }, function (data) {
                                if (data) {
                                    if (data[0]) {
                                        company = data[0]
                                        reset_form()
                                        populate_form(company)
                                    }
                                }
                            })
                        } else {
                        
                        }
                    })
                }
                
            })
        }
    }
    
    const fetch_company_by_name = function (dataToSend, callback) {
        let url = "/api/v1.0/companies/validate"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handle_company_error("Oops: 1")
                    }
                })
            } catch (e) {
                console.log(e)
                return handle_company_error("Error Validating Company")
            }
        } else {
            return handle_company_error("Error Loading Company- Missing Data")
        }
    }
    
    const add_to_company_list = function (dataToSend, callback) {
        let url = "/api/v1.0/companies/update"
        if (dataToSend) {
            sendPostRequest(url, dataToSend, function (data, status, xhr) {
                if (data) {
                    return callback(data)
                } else {
                    return handle_company_error("Oops: 1")
                }
            })
        }
    }
    
    const populate_form = function (company) {
        $(_company_id).val((company.id) ? company.id : "").trigger("change")
        _company_name.value = (company.name) ? company.name : ""
        _company_phone_1.value = (company.phone_1) ? company.phone_1 : ""
        _company_phone_2.value = (company.phone_2) ? company.phone_2 : ""
        _company_fax.value = (company.fax) ? company.fax : ""
        _company_email.value = (company.email) ? company.email : ""
        _company_website.value = (company.website) ? company.website : ""
        
        if (_provider_name) {
            $(_provider_name).val((company.name) ? company.name : "").trigger("change")
        }
        
        if (_vendor_name) {
            _vendor_name.value = (company.name) ? company.name : null
        }
        
        if (_provider_company_id) {
            _provider_company_id.value = (company.id) ? company.id : null
        }
        
        if (_vendor_company_id) {
            _vendor_company_id.value = (company.id) ? company.id : null
        }
        
        if (_contact_company_id) {
            _contact_company_id.value = (company.id) ? company.id : null
        }
        
        if (_address_company_id) {
            _address_company_id.value = (company.id) ? company.id : null
        }
        
    }
    
    const validate_form = function () {
        return $(_form_edit_company).valid()
    }
    
    const reset_form = function () {
        _company_phone_1.value = ""
        _company_phone_2.value = ""
        _company_fax.value = ""
        _company_email.value = ""
        _company_website.value = ""
        if (_provider_name) {
            $(_provider_name).val("").trigger("change")
        }
        if (_vendor_name) {
            $(_vendor_name).val("").trigger("change")
        }
        $(_company_id).val("").trigger("change")
        _company_name.value = ""
    }
    
    const init = function (company) {
        if (company) {
            let detail = set_detail(company)
            populate_form(detail)
        }
        
        if (_form_edit_company) {
            validator_init(form_rules)
            validator = $(_form_edit_company).validate()
            init_autocomplete()
        }
    }
    
    const build = function () {
        if (validate_form()) {
            return {
                email: $(_company_email).val(),
                //enabled: (_company_enabled.checked === true) ? 1 : 0,
                enabled: 1,
                fax: $(_company_fax).val(),
                id: (!isNaN(_provider_company_id.value)) ? parseInt(_provider_company_id.value) : null,
                modified_by: user_id,
                name: Company.detail.name,
                note: Company.detail.note,
                phone_1: Company.detail.phone_1,
                phone_2: Company.detail.phone_2,
                status_id: Company.detail.status_id,
                website: Company.detail.website,
            }
        }
    }
    
    return {
        all: new Map(),
        build: function () {
            return build()
        },
        validator: null,
        detail: {
            created_by: user_id,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
            email: null,
            enabled: 1,
            fax: null,
            id: null,
            modified_by: user_id,
            name: null,
            note: null,
            phone_1: null,
            phone_2: null,
            status_id: 10,
            website: null,
        },
        company_exists: function (name) {
            company_exists(name)
        },
        populate_form: function (company) {
            populate_form(company)
        },
        reset_form: function () {
            reset_form()
        },
        init: function (company) {
            init(company)
        },
    }
})()
