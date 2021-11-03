const Company = (function () {
    "use strict"
    
    const _form_edit_company = document.getElementById("form_edit_company")
    const _company_enabled = document.getElementById("company_enabled")
    const _company_phone_1 = document.getElementById("company_phone_1")
    const _company_phone_2 = document.getElementById("company_phone_2")
    const _company_fax = document.getElementById("company_fax")
    const _company_email = document.getElementById("company_email")
    const _company_website = document.getElementById("company_website")
    const _provider_company_id = document.getElementById("provider_company_id")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let globalSelectedCompany = false
    let phoneIT = false
    let phoneUS = false
    let validator
    let validated = false
    let suggestionsTempCompany = []
    let form_rules = {
        rules: {
            provider_name: {
                required: true,
            },
            company_phone_1: {
                required: true,
            },
            company_phone_2: {
                phoneUS: phoneUS,
                phoneIT: phoneIT,
            },
            company_fax: {
                phoneUS: phoneUS,
                phoneIT: phoneIT,
            },
            company_email: {
                email: true,
            },
            company_website: {
                url: true,
            },
        },
        messages: {
            provider_name: {
                required: "Field Required",
            },
            company_phone_1: {
                required: "Field Required",
                phoneUS: "Field Invalid",
                phoneIT: "Field Invalid",
            },
            company_phone_2: {
                phoneUS: "Field Invalid",
                phoneIT: "Field Invalid",
            },
            company_fax: {
                phoneUS: phoneUS,
                phoneIT: phoneIT,
            },
            company_email: {
                email: "Field Invalid",
            },
            company_website: {
                url: "Field Invalid",
            },
        },
    }
    
    const add_to_company_list = function (obj) {
        if (globalSelectedCompany === false) {
            if ((obj.value.length > 0 && suggestionsTempCompany.length === 0 && globalSelectedCompany === false) ||
              (obj.value.length > 0 && suggestionsTempCompany.length > 0 && !globalSelectedCompany)
            ) {
            
            }
        }
    }
    
    const handle_company_error = function (msg) {
        toastr.error(msg)
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
    
    //--
    const validate_form = function () {
        return $(_form_edit_company).valid()
    }
    //--
    
    //
    const company_exists = function (name) {
        if (name && name !== "") {
            let dataToSend = {
                name: name,
            }
            
            fetch_company_by_name(dataToSend, function (data) {
                if (data) {
                    log(data)
                }
            })
        }
    }
    
    const _default_detail = function () {
        return {
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
        }
    }
    
    const set_detail = function (company) {
        let detail = _default_detail()
        
        if (company) {
            detail.created_by = (company.created_by) ? company.created_by : user_id
            detail.date_created = (company.date_created) ? company.date_created : formatDateMySQL()
            detail.date_modified = (company.date_modified) ? company.date_modified : formatDateMySQL()
            detail.email = (company.email) ? company.email : null
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
    
    const populate_form = function () {
        //_company_enabled.checked = (Company.detail.email)?Company.detail.email:""
        _company_phone_1.value = (Company.detail.phone_1) ? Company.detail.phone_1 : ""
        _company_phone_2.value = (Company.detail.phone_2) ? Company.detail.phone_2 : ""
        _company_fax.value = (Company.detail.fax) ? Company.detail.fax : ""
        _company_email.value = (Company.detail.email) ? Company.detail.email : ""
        _company_website.value = (Company.detail.website) ? Company.detail.website : ""
    }
    
    const init = function (company) {
        if (company) {
            set_detail(company)
        }
        
        if (_form_edit_company) {
            validator_init(form_rules)
            validator = $(_form_edit_company).validate()
            populate_form()
            
        }
    }
    
    const build = function () {
        if (validate_form()) {
            return {
                email: Company.detail.email,
                enabled: Company.detail.enabled,
                fax: _company_fax.value,
                id: (!isNaN(_provider_company_id.value)) ? parseInt(_provider_company_id.value) : null,
                modified_by: Company.detail.modified_by,
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
        init: function (company) {
            init(company)
        },
    }
})()
