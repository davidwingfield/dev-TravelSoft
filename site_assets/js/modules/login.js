const Login = (function () {
    "use strict"
    const _user_email = document.getElementById("dataToSend")
    const _email = document.getElementById("email")
    const _password = document.getElementById("password")
    const _button_login_submit = document.getElementById("button_login_submit")
    const _button_login_register = document.getElementById("button_login_register")
    const _form_login = document.getElementById("form_login")
    const _register_form_submit_button = document.getElementById("register_form_submit_button")
    const _register_page_form = document.getElementById("register_page_form")
    const _register_page = document.getElementById("register_page")
    
    const validate_form = function (_form, _rules) {
        Login.validator = validator_init(_rules)
        return $(_form).valid()
    }
    
    const route = function (settings) {
        if (_form_login) {
            Login.login(settings)
        }
        
        if (_register_page) {
            Login.register(settings)
        }
    }
    
    const login = function (settings) {
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
        
        Login.validator = validator_init(form_rules)
        
        $(_button_login_register)
          .on("click", function () {
          
          })
        
        $(_button_login_submit)
          .on("click", function () {
              submit_login()
          })
        
        const handle_login_error = function (msg) {
            toastr.error(msg)
        }
        
        const send_login = function (dataToSend) {
            if (dataToSend) {
                try {
                    sendPostRequest("/api/v1.0/users/login", dataToSend, function (data, status, xhr) {
                        console.log("data", data.id)
                        if (data && data.id) {
                            if (data.id) {
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
        
        const submit_login = function () {
            if (validate_form(_form_login, form_rules)) {
                let dataToSend = {
                    email: _email.value,
                    password: _password.value,
                }
                send_login(remove_nulls(dataToSend))
            }
        }
    }
    
    const register = function (settings) {
        let form_rules_register = {
            rules: {
                user_name_first: {
                    required: true,
                },
                user_name_last: {
                    required: true,
                },
                user_email: {
                    required: true,
                    email: true,
                },
                user_password: {
                    required: true,
                    minlength: 5,
                },
                user_password_confirm: {
                    required: true,
                    minlength: 5,
                    equalTo: "#user_password",
                },
            },
            messages: {
                user_name_first: {
                    required: "Field Required",
                },
                user_name_last: {
                    required: "Field Required",
                },
                user_email: {
                    required: "Field Required",
                    email: "Field invalid",
                },
                user_password: {
                    required: "Field Required",
                },
            },
        }
        
        const _user_name_first = document.getElementById("user_name_first")
        const _user_name_last = document.getElementById("user_name_last")
        const _user_email = document.getElementById("user_email")
        const _user_password = document.getElementById("user_password")
        
        Login.validator = validator_init(form_rules_register)
        
        $(_register_form_submit_button)
          .on("click", function () {
              submit_register()
          })
        
        const submit_register = function () {
            if (validate_form(_register_page_form, form_rules_register)) {
                let dataToSend = {
                    name_first: _user_name_first.value,
                    name_last: _user_name_last.value,
                    email: _user_email.value,
                    password: _user_password.value,
                }
                
                send_register(remove_nulls(dataToSend))
            }
        }
        
        const send_register = function (dataToSend) {
            console.log("Login.register->send_register", dataToSend)
            if (dataToSend) {
                try {
                    sendPostRequest("/api/v1.0/users/register", dataToSend, function (data, status, xhr) {
                        console.log("data", data.id)
                        if (data && data.id) {
                            if (data.id) {
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
    }
    
    return {
        detail: {},
        all: new Map(),
        validator: null,
        init: function (settings) {
            route(settings)
        },
        login: function (settings) {
            login(settings)
        },
        register: function (settings) {
            register(settings)
        },
    }
})()
Login.init()
