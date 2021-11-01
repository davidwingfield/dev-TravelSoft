const Company = (function () {
    "use strict"
    
    let globalSelectedCompany = false
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let suggestionsTempCompany = []
    
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
    
    return {
        company_exists: function (name) {
            company_exists(name)
        },
    }
})()
