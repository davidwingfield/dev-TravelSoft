const Login = (function () {
    "use strict"
    ///////////////////////////////////////////////
    const _email = document.getElementById("email")
    const _password = document.getElementById("password")
    const _button_login_submit = document.getElementById("button_login_submit")
    const _button_login_register = document.getElementById("button_login_register")
    const _form_login = document.getElementById("form_login")
    ///////////////////////////////////////////////
    let form_rules = {
        rules: {
            email: {
                required: true,
                email: true,
            },
            password: {
                required: true,
            },
        },
        messages: {
            email: {
                required: "Field Required",
                email: "Field invalid",
            },
            password: {
                required: "Field Required",
            },
        },
    }
    ///////////////////////////////////////////////
    $(_button_login_submit)
      .on("click", function () {
          submit_login()
      })
    $(_button_login_register)
      .on("click", function () {
      
      })
    ///////////////////////////////////////////////
    const init = function (settings) {
        if (_email && _password) {
            Login.validator = validator_init(form_rules)
        }
        console.log("login", {})
    }
    
    const submit_login = function () {
        if (validate_form()) {
            let dataToSend = {
                email: _email.value,
                password: _password.value,
            }
            send_login(remove_nulls(dataToSend))
        }
    }
    
    const handle_login_error = function (msg) {
        toastr.error(msg)
    }
    
    const send_login = function (dataToSend) {
        if (dataToSend) {
            try {
                sendPostRequest("/api/v1.0/users/login", dataToSend, function (data, status, xhr) {
                    console.log("data", data.id)
                    if (data && data.id) {
                        let result = data
                        if (result.id) {
                            window.location.replace("/")
                        }
                    } else {
                        return handle_login_error("Error Logging In: 1")
                    }
                })
            } catch (e) {
                console.error("Error", e)
                return handle_login_error("Error: 2")
            }
        } else {
            return handle_login_error("Error: 3")
        }
    }
    
    const validate_form = function () {
        Login.validator = validator_init(form_rules)
        let is_valid = $(_form_login).valid()
        if (!is_valid) {
            /*
            $.each(panels, function (index, item) {
                
                if ($(this).find(".invalid").length > 0) {
                    let nav_tab = $("body").find("[aria-controls='" + $(this).attr("id") + "']")
                    tabs.removeClass("active")
                    panels.removeClass("active")
                    $(this).addClass("active")
                    nav_tab.addClass("active")
                    return false
                }
            })
            //*/
            
        }
        
        return is_valid
    }
    ///////////////////////////////////////////////
    return {
        detail: {},
        all: new Map(),
        validator: null,
        init: function (settings) {
            init(settings)
        },
    }
    ///////////////////////////////////////////////
})()
Login.init()
