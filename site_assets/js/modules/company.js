const Company = (function () {
    "use strict"
    
    const _product_edit_page = document.getElementById("product_edit_page")
    const _button_save_provider = document.getElementById("button_save_provider")
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
    const _form_edit_company_block = document.getElementById("form_edit_company_block")
    const _button_edit_company_name = document.getElementById("button_edit_company_name")
    const _button_cancel_edit_company_name = document.getElementById("button_cancel_edit_company_name")
    const _button_close_edit_company_form = document.getElementById("button_close_edit_company_form")
    const _form_edit_vendor = document.getElementById("form_edit_vendor")
    const _form_edit_provider = document.getElementById("form_edit_provider")
    const _vendor_name = document.getElementById("vendor_name")
    const _vendor_company_id = document.getElementsByClassName("vendor_company_id")
    const _provider_name = document.getElementById("provider_name")
    const _provider_company_id = document.getElementById("provider_company_id")
    const _company_key = document.getElementById("company_keywords")
    const _company_logo = document.getElementById("company_logo")
    const _company_description_long = document.getElementById("company_description_long")
    const _company_description_short = document.getElementById("company_description_short")
    const _button_clear_form_edit_company = document.getElementById("button_clear_form_edit_company")
    const _company_images = document.getElementById("company_images")
    const _modal_product_category_id = document.getElementById("modal_product_category_id")
    const form_rules = {
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
            company_email: {
                email: "Field Invalid",
            },
            company_website: {
                url: "Field Invalid",
            },
        },
        
    }
    
    let reset_company = {}
    let $company_key
    let temp_company = {}
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let validator
    let globalSelectedCompany = false
    let tempCompany = {}
    
    $("a[data-toggle=\"tab\"]").on("hide.bs.tab", function (e) {
        //e.target // newly activated tab
        //e.relatedTarget // previous active tab
        hide_form()
    })
    
    $(_button_cancel_edit_company_name)
        .on("click", function () {
            let detail = setDetail(tempCompany)
            populate_form(detail)
            hide_form()
        })
    
    $(_button_edit_company_name)
        .on("click", function () {
            tempCompany = build()
            show_form()
        })
    
    $(_button_clear_form_edit_company)
        .on("click", function () {
            resetForm()
        })
    
    $(_button_close_edit_company_form)
        .on("click", function () {
            hide_form()
        })
    
    $(_button_submit_form_edit_company)
        .on("click", function () {
            let company = Company.build()
            if (company) {
                confirmDialog(`Would you like to update?`, (ans) => {
                    if (ans) {
                        addCompany(company, function (data) {
                            if (data) {
                                if (data[0]) {
                                    let company = data[0]
                                    let detail = setDetail(company)
                                    reset_company = detail
                                    populate_form(detail)
                                    initAutoComplete()
                                    hide_form()
                                }
                            }
                        })
                    }
                })
            }
        })
    
    $(_company_id)
        .on("change", function () {
            _address_company_id.value = _company_id.value
        })
    
    $(_form_edit_company)
        .on("change", function () {
            set_progress()
        })
    
    const initAutoComplete = function () {
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
                /*
                temp_company = Company.detail
                window.addEventListener("click", on_click_outside)
                hide_form()
                //*/
                Company.resetForm(true)
                if (_form_edit_provider) {
                    Provider.resetForm()
                }
                if (_form_edit_vendor) {
                    Vendor.resetForm()
                }
                
            })
            .on("click", function (e) {
                if ($(this).attr("readonly") === "readonly") {
                    e.preventDefault()
                } else {
                    $(this).select()
                }
                
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
                    } else {
                        $(_vendor_name).val(company.name)
                    }
                    
                    if (_provider_company_id) {
                        $(_provider_company_id).val(company.id)
                    }
                    
                    Address.get_by_company_id(company.id)
                    Contact.getByCompanyId(company.id)
                    
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
                                Provider.resetForm()
                                Vendor.resetForm()
                            }
                        })
                    }
      
                    //*/
                },
            })
    }
    
    const defaultDetail = function () {
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
            description_short: null,
            description_long: null,
            keywords: null,
            logo: null,
            images: [],
        }
    }
    
    const handleCompanyError = function (msg, title, level) {
        //console.log("Company.handleCompanyError(msg)")
        // ----
        
        if (!msg) {
            msg = "There was an Error"
        }
        
        if (!title) {
            title = "Company"
        }
        
        if (!level) {
            level = "error"
        }
        
        toastr[level](`${msg}`, title)
    }
    
    const populate_form = function (company) {
        //console.log("Company.populate_form(company)", company)
        // ----
        
        let company_logo_image = $("#company_logo").dropify()
        let company_keywords = (company.keywords) ? company.keywords : ""
        
        $(_company_id).val((company.id) ? company.id : "").trigger("change")
        _company_name.value = (company.name) ? company.name : ""
        _company_phone_1.value = (company.phone_1) ? company.phone_1 : ""
        _company_phone_2.value = (company.phone_2) ? company.phone_2 : ""
        _company_fax.value = (company.fax) ? company.fax : ""
        _company_email.value = (company.email) ? company.email : ""
        _company_website.value = (company.website) ? company.website : ""
        _company_description_long.value = (company.description_long) ? company.description_long : ""
        _company_description_short.value = (company.description_short) ? company.description_short : ""
        
        $company_key = $(_company_key).BuildKeyword(company_keywords)
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
    
    const on_click_outside = (e) => {
        let tar = $(e.target).parents("div.form_element")
        if (!tar[0] && !e.target.className.includes("company_name")) {
            if (_company_name.value === "") {
                populate_form(temp_company)
            }
            
            temp_company = {}
            destroy_click()
        }
    }
    
    const destroy_click = function () {
        window.removeEventListener("click", on_click_outside)
    }
    
    const build = function () {
        return remove_nulls({
            email: $(_company_email).val(),
            enabled: 1,
            fax: $(_company_fax).val(),
            id: (!isNaN(_company_id.value)) ? parseInt(_company_id.value) : null,
            modified_by: user_id,
            cover_image: "/public/img/placeholder.jpg",
            description_short: _company_description_short.value,
            description_long: _company_description_long.value,
            keywords: $company_key.build(),
            name: $(_company_name).val(),
            note: null,
            phone_1: $(_company_phone_1).val(),
            phone_2: $(_company_phone_2).val(),
            status_id: 10,
            website: $(_company_website).val(),
        })
    }
    
    const company_exists = function (name) {
        if (name && name !== "") {
            /**
             * data to send to the server
             *
             * @type {{name}}
             */
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
                    resetForm(true)
                    populate_form(company)
                    Address.get_by_company_id(company.id)
                    Contact.getByCompanyId(company.id)
                } else {
                    confirmDialog(`The company: ${name} does not exist exists. Would you like to create it?`, (ans) => {
                        if (ans) {
                            addCompany({
                                name: _company_name.value,
                                status_id: 10,
                                enabled: 1,
                            }, function (data) {
                                if (data) {
                                    if (data[0]) {
                                        company = data[0]
                                        tempCompany = company
                                        resetForm(true)
                                        populate_form(company)
                                        show_form()
                                    }
                                }
                            })
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
                        handleCompanyError("Oops: 1")
                    }
                })
            } catch (e) {
                //console.log("error", e)
                handleCompanyError("Error Validating Company")
            }
        } else {
            handleCompanyError("Error Loading Company- Missing Data")
        }
    }
    
    const fetchCompanyByName = function (dataToSend, callback) {
        let url = "/api/v1.0/companies/validate"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleCompanyError("Oops: 1")
                    }
                })
            } catch (e) {
                return handleCompanyError("Error Validating Company")
            }
        } else {
            return handleCompanyError("Error Loading Company- Missing Data")
        }
    }
    
    const init = function (company) {
        //console.log("Company.init(company)", company)
        // ----
        
        let images = []
        
        if (company) {
            let detail = setDetail(company)
            images = (company.images) ? company.images : []
            
            if (_company_images) {
                Company.fileManager = $("#company_images").fileManager({
                    height: 400,
                    source: "company",
                    sourceId: detail.id,
                    images: images,
                })
            }
            if (_form_edit_company) {
                populate_form(detail)
                validator_init(form_rules)
                validator = $(_form_edit_company).validate()
                initAutoComplete()
                if (_form_edit_company_block) {
                    hide_form()
                }
            }
        }
        
    }
    
    const validate_form = function () {
        return $(_form_edit_company).valid()
    }
    
    const resetForm = function (toggleFullClear) {
        _company_phone_1.value = ""
        _company_phone_2.value = ""
        _company_fax.value = ""
        _company_email.value = ""
        _company_website.value = ""
        if (toggleFullClear && toggleFullClear === true) {
            if (_provider_name) {
                $(_provider_name).val("").trigger("change")
            }
            if (_vendor_name) {
                $(_vendor_name).val("").trigger("change")
            }
            $(_company_id).val("").trigger("change")
            _company_name.value = ""
            Address.clearTable()
            Contact.clearTable()
        }
    }
    
    const setDetail = function (company) {
        let detail = defaultDetail()
        
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
            detail.logo = (company.logo) ? company.logo : ""
            detail.keywords = (company.keywords) ? company.keywords : ""
            detail.description_long = (company.description_long) ? company.description_long : ""
            detail.description_short = (company.description_short) ? company.description_short : ""
            detail.images = (company.images) ? company.images : []
        }
        
        Company.detail = detail
        return detail
    }
    
    const show_form = function () {
        reset_company = Company.build()
        
        if (_form_edit_company_block) {
            $(_form_edit_company_block).show()
            $(_button_cancel_edit_company_name).show()
            $(_button_edit_company_name).hide()
            $(_company_name).attr("readonly", true)
        }
        
        if (_button_save_provider) {
            $(_button_save_provider).attr("readonly", true)
            _button_save_provider.disabled = true
        }
    }
    
    const hide_form = function () {
        if (_form_edit_company_block) {
            let detail = setDetail(reset_company)
            //populate_form(detail)
            $(_company_name).attr("readonly", false)
            $(_form_edit_company_block).hide()
            $(_button_cancel_edit_company_name).hide()
            $(_button_edit_company_name).show()
            initAutoComplete()
        }
        
        if (_button_save_provider) {
            $(_button_save_provider).attr("readonly", false)
            _button_save_provider.disabled = false
        }
        
    }
    
    const set_progress = function () {
        if (!isNaN(parseInt(_company_id.value))) {
            $(_company_phone_1).attr("readonly", false)
            $(_company_phone_2).attr("readonly", false)
            $(_company_fax).attr("readonly", false)
            $(_company_email).attr("readonly", false)
            $(_company_cover_image).attr("readonly", false)
            _button_edit_company_name.disabled = false
        } else {
            _button_edit_company_name.disabled = true
            $(_company_cover_image).attr("readonly", true)
            $(_company_phone_1).attr("readonly", true)
            $(_company_phone_2).attr("readonly", true)
            $(_company_fax).attr("readonly", true)
            $(_company_email).attr("readonly", true)
        }
    }
    
    const addCompany = function (dataToSend, callback) {
        //console.log("addCompany()")
        // ----
        
        let url = "/api/v1.0/companies/update"
        if (dataToSend) {
            sendPostRequest(url, dataToSend, function (data, status, xhr) {
                if (data) {
                    return callback(data)
                } else {
                    handleCompanyError("Oops: 1")
                }
            })
        }
    }
    
    return {
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
        all: new Map(),
        validator: null,
        fileManager: null,
        
        build: function () {
            if (validate_form()) {
                return build()
            }
        },
        setDetail: function (settings) {
            return setDetail(settings)
        },
        add: function (dataToSend, callback) {
            return addCompany(dataToSend, callback)
        },
        company_exists: function (name) {
            return company_exists(name)
        },
        populate_form: function (company) {
            populate_form(company)
        },
        resetForm: function (toggleFullClear) {
            resetForm(toggleFullClear)
        },
        init: function (company) {
            init(company)
        },
        
    }
})()
