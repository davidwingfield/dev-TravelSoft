const mySQLDate = ""
const defaultLocationDisplayFormat = "medium" //long medium short
const sideNavOptions = {
    edge: "left", // Choose the horizontal origin
    closeOnClick: false, // Closes side-nav on &lt;a&gt; clicks, useful for Angular/Meteor
    breakpoint: 1200, // Breakpoint for button collapse
    menuWidth: 240, // Width for sidenav
    timeDurationOpen: 500, // Time duration open menu
    timeDurationClose: 500, // Time duration open menu
    timeDurationOverlayOpen: 200, // Time duration open overlay
    timeDurationOverlayClose: 200, // Time duration close overlay
    easingOpen: "easeInOutQuad", // Open animation
    easingClose: "easeInOutQuad", // Close animation
    showOverlay: true, // Display overflay
    showCloseButton: false, // Append close button into siednav
    slim: false, // turn on slime mode
    onOpen: null, // callback function
    onClose: null, // callback function
    mode: "over", // change sidenav mode
}
const toastrOptions = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "md-toast-top-center",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": 301,
    "hideDuration": 1000,
    "timeOut": 5000,
    "extendedTimeOut": 1000,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut",
}
const days = [
    {
        0: {
            name: "Sunday",
            short: "Sun",
        },
    }, {
        1: {
            name: "Monday",
            short: "Mon",
        },
    }, {
        1: {
            name: "Tuesday",
            short: "Tue",
        },
    },
    {
        1: {
            name: "Wednesday",
            short: "Wed",
        },
    },
    {
        1: {
            name: "Thursday",
            short: "Thu",
        },
    },
    {
        1: {
            name: "Friday",
            short: "Fri",
        },
    },
    {
        1: {
            name: "Saturday",
            short: "Sat",
        },
    },
]
const dowStart = 1
const colorScheme = new Map()
colorScheme.set(1, {
    name: "Color - 1",
    backGround: "#bdbdbd",
    borderColor: "#686868",
    textColor: "#000",
})
colorScheme.set(2, {
    name: "Color - 2",
    backGround: "#54cbe3",
    borderColor: "#357f8e",
    textColor: "#000",
})
colorScheme.set(3, {
    name: "Color - 3",
    backGround: "#49de94",
    borderColor: "#2d895b",
    textColor: "#000",
})
colorScheme.set(4, {
    name: "Color - 4",
    backGround: "#ab8c82",
    borderColor: "#564641",
    textColor: "#000",
})
colorScheme.set(5, {
    name: "Color - 5",
    backGround: "#ffcd17",
    borderColor: "#aa890f",
    textColor: "#000",
})
colorScheme.set(6, {
    name: "Color - 6",
    backGround: "#96a3fa",
    borderColor: "#636ca5",
    textColor: "#000",
})
colorScheme.set(7, {
    name: "Color - 7",
    backGround: "#fa983c",
    borderColor: "#a56428",
    textColor: "#000",
})
colorScheme.set(8, {
    name: "Color - 8",
    backGround: "#17b3a3",
    borderColor: "#0c5e56",
    textColor: "#000",
})
colorScheme.set(9, {
    name: "Color - 9",
    backGround: "#76838f",
    borderColor: "#30353a",
    textColor: "#fff",
})
colorScheme.set(10, {
    name: "Color - 10",
    backGround: "#910112",
    borderColor: "#3c0007",
    textColor: "#fff",
})
colorScheme.set(11, {
    name: "Color - 11",
    backGround: "#ff666b",
    borderColor: "#aa4447",
    textColor: "#000",
})
colorScheme.set(12, {
    name: "Color - 12",
    backGround: "#3e8ef7",
    borderColor: "#295da2",
    textColor: "#000",
})
colorScheme.set(13, {
    name: "Color - 13",
    backGround: "#f74584",
    borderColor: "#a22d57",
    textColor: "#000",
})
colorScheme.set(14, {
    name: "Color - 14",
    backGround: "#5a9101",
    borderColor: "#253c00",
    textColor: "#fff",
})
colorScheme.set(15, {
    name: "Color - 15",
    backGround: "#9463f7",
    borderColor: "#6141a2",
    textColor: "#ffffff",
})

let mdbPreloader = document.getElementById("mdb-preloader")

$.fn.BuildDropDown = function (settings) {
    if (!settings || !settings.text_field || !settings.id_field) {
        return
    }
    //
    let _this = document.getElementById($(this).attr("id"))
    let data = (settings.data) ? settings.data : []
    let class_list = (settings.class_list) ? settings.class_list : ["form-control"]
    let id_field = (settings.id_field) ? settings.id_field : ""
    let text_field = (settings.text_field) ? settings.text_field : ""
    let title = (settings.title) ? settings.title : "Select Option"
    let first_selectable = (settings.first_selectable) ? settings.firstSelectable : false
    let select2 = (settings.select2) ? settings.select2 : false
    let multiple = (settings.type) ? settings.type : ""
    let val = ""
    //
    $(_this).empty()
    //
    if (multiple === "multiple") {
        _this.setAttribute("multiple", "multiple")
    }
    
    if (first_selectable === false) {
        let option = $(document.createElement("option")).prop({
            value: "",
            text: "-- " + title.charAt(0).toUpperCase() + title.slice(1) + " --",
            //readonly: true,
            disabled: true,
        }).attr("readonly", "readonly")
        
        $(_this).append(option)
    }
    
    $.each(data, function (i, v) {
        let id = v[id_field]
        let text = v[text_field]
        
        $(_this).append($(document.createElement("option")).prop({
            value: id,
            text: text.charAt(0).toUpperCase() + text.slice(1),
        }))
        
    })
    
    $(_this).val(val)
    
    if (select2) {
        $(_this).select2()
    }
    
    //if ($(_this).hasClass("select2-hidden-accessible")) {
    //    $(_this).select2("destroy");
    //}
    
}

const clear_validation = function (formElement) {
    $(".autocomplete-suggestions").hide()
    
    var validator = $(formElement).validate()
    $("[name]", formElement).each(function () {
        validator.successList.push(this)
        validator.showErrors()
    })
    validator.resetForm()
    validator.reset()
}

const get_errors = function (validator) {
    var submitErrorsList = {}
    //console.dir(validator)
    //for (var i = 0; i < validator.errorList.length; i++) {
    //    submitErrorsList[validator.errorList[i].element.name] = validator.errorList[i].message
    //}
    //console.log("Submit Errors", submitErrorsList)
}

const validator_init = function (settings) {
    let rules = {}
    let messages = {}
    let groups = {}
    if (settings) {
        
        if (settings.rules) {
            rules = settings.rules
        }
        
        if (settings.messages) {
            messages = settings.messages
        }
        
        if (settings.groups) {
            groups = settings.groups
        }
    }
    
    jQuery.validator.setDefaults({
        rules: rules,
        messages: messages,
        groups: groups,
        ignore: "",
        success: "valid",
        invalidHandler: function (event, validator) {
            let errorEl = validator.findLastActive() || validator.errorList.length && validator.errorList[0].element
            if (errorEl) {
                $(errorEl).closest(".accordion-body").collapse("show")
            }
        },
        errorElement: "span",
        highlight: function (element) {
            let id = $(element).attr("id")
            let el = $("#" + id + "")
            let error_el = $("#" + id + "-error")
            
            if (error_el.attr("data-ref")) {
                $("#" + error_el.attr("data-ref")).addClass("is-invalid")
            } else {
                el.parent().find("span.select2").addClass("is-invalid")
                el.addClass("is-invalid")
            }
            
            if (error_el) {
                error_el.css({ "display": "block" })
            }
        },
        unhighlight: function (element) {
            let id = $(element).attr("id")
            let el = $("#" + id + "")
            let error_el = $("#" + id + "-error")
            el.parents("div.form-element").find("span.select2").removeClass("is-invalid")
            el.removeClass("is-invalid")
            if (error_el) {
                error_el.css({ "display": "none" })
            }
        },
        errorPlacement: function (error, element) {
            let id = element.attr("id")
            let el = $("#" + id + "-error")
            
            el.html(error)
            
        },
        submitHandler: function (form) {
            return true
        },
        
    })
    
    jQuery.validator.addMethod("postalCode", function (value) {
        return /^((\d{5}-\d{4})|(\d{5})|([A-Z]\d[A-Z]\s\d[A-Z]\d))$/.test(value)
    }, "Please enter a valid postal code.")
    
    jQuery.validator.addMethod("phoneUS", function (phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "")
        return this.optional(element) || phone_number.length > 9 &&
          phone_number.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/)
    }, "Please specify a valid phone number")
    
    jQuery.validator.addMethod("phoneIT", function (phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "")
        return this.optional(element) || phone_number.length > 9 &&
          phone_number.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/)
    }, "Please specify a valid phone number")
    
    return jQuery.validator
}

const remove_nulls = function (obj) {
    let cleanedObject = {}
    $.each(obj, function (i, v) {
        if (v === null) {
        
        } else {
            cleanedObject[i] = v
        }
    })
    
    return cleanedObject
}

const buildMap = function (arr, key) {
    let temp = new Map()
    $.each(arr, function (index, value) {
        temp.set(value[key], value)
    })
    return temp
}

const getListOfIds = function (list) {
    if (list) {
        
        if (typeof list === "string") {
            let str = list.replace(/\s/g, "")
            return Array.from(str.split(","), Number)
        } else if (typeof list === "object") {
            return list
        }
        
    }
    
    return []
}

const sendGetRequest = function (url, data_to_send, callback) {
    
    let result = []
    if (url && data_to_send) {
        
        $.getJSONRequest(url, data_to_send, function (data, status, xhr) {
            
            if (status === "success" && typeof data.result !== "undefined") {
                result = data.result
                return callback(result)
            } else if (status === "failed" && typeof data.error === "undefined") {
                //console.log("getError:2")
                return handleError("failed")
            } else if (status === "success" && typeof data.error !== "undefined") {
                console.log(data.error)
                //console.log("getError:3")
                return handleError(data.error)
            } else {
                //console.log("getError:4")
            }
        })
    } else {
        let msg = []
        if (!url) {
            msg.push("url")
        }
        if (!data_to_send) {
            msg.push("data_to_send")
        }
        
        return handleError("Missing Data: " + msg.join(", "))
    }
}

const sendPostRequest = function (url, data_to_send, callback) {
    let msg, result = []
    if (url && data_to_send) {
        
        $.postJSON(url, data_to_send, function (data, status, xhr) {
            ///////////////////////////////////////////////
            console.log("data", data)
            console.log("status", status)
            console.log("xhr", xhr)
            ///////////////////////////////////////////////
            if (status === "success" && typeof data.result !== "undefined") {
                
                if (data.result) {
                    result = data.result
                    return callback(result)
                } else {
                    return handleError("Error Posting Data 1")
                }
            } else if (status === "failed" && typeof data.result === "undefined") {
                if (data.error) {
                    return handleError(data.error)
                }
                return handleError("Error Posting Data")
            } else {
                
                return handleError("Error Posting Data 2")
            }
        })
    } else {
        if (!url) {
            msg.push("url")
        }
        if (!data_to_send) {
            msg.push("data_to_send")
        }
        
        return handleError("Missing Data: " + msg.join(", "))
    }
}

const _display_ajax_error = function (jqXHR, exception, uri) {
    let msg = ""
    let error = {
        message: "",
        status: "",
        uri: uri,
    }
    
    if (jqXHR.status === 0) {
        msg = "Not connected, verify Network."
    } else if (jqXHR.status === 404) {
        msg = "Requested page( " + uri + " ) not found. [404]"
    } else if (jqXHR.status === 500) {
        if (jqXHR.responseJSON) {
            msg = jqXHR.responseJSON
        } else {
            msg = "Internal Server Error [500]."
        }
        
    } else if (exception === "parsererror") {
        msg = "Requested JSON parse failed."
    } else if (exception === "timeout") {
        msg = "Time out error."
    } else if (exception === "abort") {
        msg = "Ajax request aborted."
    } else {
        msg = "Uncaught Error." + jqXHR.responseText
    }
    
    error.message = msg
    error.status = jqXHR.status
    error.uri = uri
    
    return error
}

const handleError = function (msg) {
    if (!msg) {
        msg = "Error processing request"
    }
    toastr.error(msg)
}

const validInt = function (val) {
    if (val) {
        if (!isNaN(parseInt(val))) {
            return parseInt(val)
        }
    }
    
    return null
}

const formatDateMySQL = function (date) {
    if (!date) {
        let date = new Date()
    }
    
    return moment(date).format("YYYY-MM-DD HH:mm:ss")
}

const resize_elements = function () {
    const _page = document.getElementById("page")
    const _main = document.getElementById("main")
    const _nav = document.getElementsByClassName("double-nav")
    const _screen_width = document.getElementById("screen_width")
    const _screen_height = document.getElementById("screen_height")
    const _footer = document.getElementsByClassName("page-footer")
    const _slide_out = document.getElementById("slide-out")
    const _page_header = document.getElementById("page_header")
    ////
    let window_height = 0
    let window_width = 0
    let page_height = 0
    let page_width = 0
    let nav_height = 0
    let side_nav_width = 0
    let side_nav_height = 0
    let footer_height = 0
    ///////////////////////////////////////////////
    window_height = window.innerHeight
    window_width = window.innerWidth
    ///////////////////////////////////////////////
    $.each(_nav, function (i, elem) {
        let temp_height = (!isNaN(parseInt($(elem).outerHeight()))) ? parseInt($(elem).outerHeight()) : 0
        nav_height = nav_height + temp_height
    })
    
    $.each(_footer, function (i, elem) {
        let temp_height = (!isNaN(parseInt($(elem).outerHeight()))) ? parseInt($(elem).outerHeight()) : 0
        footer_height = footer_height + temp_height
    })
    ///////////////////////////////////////////////
    let page_ht = (window_height - footer_height - nav_height - 1) + "px"
    ///////////////////////////////////////////////
    if (_slide_out) {
        side_nav_height = (!isNaN(parseInt($(_slide_out).outerHeight()))) ? parseInt($(_slide_out).outerHeight()) : 0
        side_nav_width = (!isNaN(parseInt($(_slide_out).width()))) ? parseInt($(_slide_out).width()) : 0
    }
    
    if (_page && _screen_height && _screen_width) {
        if (_main) {
            $(_main).css({
                "padding-left": side_nav_width + "px",
                "min-height": window_height - footer_height - nav_height + "px!important",
            })
        }
        
        if (_page) {
            _page.setAttribute("style", "min-height:" + page_ht + "!important")
            //_page.setAttribute("style", "min-height:" + page_ht + "!important")
        }
        
        if (_page_header) {
            _page_header.setAttribute("style", "margin-top:" + nav_height + "px;")
        }
        
        //For debugging
        _screen_height.innerText = window_height + ""
        _screen_width.innerText = window_width + ""
    }
    
}

const debounce = function (func) {
    var timer
    return function (event) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(func, 100, event)
    }
}

const populateMultiSelect = function (arr, elem) {
    for (var i = 0, l = elem.options.length, o; i < l; i++) {
        o = elem.options[i]
        
        if (arr.indexOf(o.value) !== -1) {
            //console.log("ggg")
            o.selected = true
        }
        
    }
}

const addTinyMCE = function (el) {
    
    tinymce.init({
        selector: "#" + el,
        menubar: false,
        height: "400",
        plugins: "print visualblocks visualchars charmap hr pagebreak advlist lists",
        content_css: [
            "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
            "/assets/css/bootstrap.min.css",
            "/assets/css/style.css",
        ],
        body_class: "p-2",
        font_formats: "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Open Sans=Open Sans; Roboto=Roboto;Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
        toolbar1: "undo redo | styleselect | fontselect fontsizeselect | removeformat | numlist bullist checklist | outdent indent ",
        toolbar2: "cut copy | bold italic underline strikethrough | forecolor | alignleft aligncenter alignright alignjustify | backcolor",
        content_style: "body { font-family:\"Roboto\",sans-serif\", sans-serif; font-size:14px; font-weight: 400 }",
        style_formats: [
            {
                title: "Headers",
                items: [
                    {
                        title: "h1",
                        block: "h1",
                    },
                    {
                        title: "h2",
                        block: "h2",
                    },
                    {
                        title: "h3",
                        block: "h3",
                    },
                    {
                        title: "h4",
                        block: "h4",
                    },
                    {
                        title: "h5",
                        block: "h5",
                    },
                    {
                        title: "h6",
                        block: "h6",
                    },
                ],
            }, {
                title: "Blocks",
                items: [
                    {
                        title: "p",
                        block: "p",
                    },
                    {
                        title: "div",
                        block: "div",
                    },
                    {
                        title: "pre",
                        block: "pre",
                    },
                ],
            }, {
                title: "Containers",
                items: [
                    {
                        title: "section",
                        block: "section",
                        wrapper: true,
                        merge_siblings: false,
                    },
                    {
                        title: "article",
                        block: "article",
                        wrapper: true,
                        merge_siblings: false,
                    },
                    {
                        title: "blockquote",
                        block: "blockquote",
                        wrapper: true,
                    },
                    {
                        title: "hgroup",
                        block: "hgroup",
                        wrapper: true,
                    },
                    {
                        title: "aside",
                        block: "aside",
                        wrapper: true,
                    },
                    {
                        title: "figure",
                        block: "figure",
                        wrapper: true,
                    },
                ],
            },
        ],
        branding: false,
        resize: false,
        setup: function (editor) {
            editor.on("change", function () {
                editor.save()
            })
        },
    })
}

const htmlDecode = function (value) {
    return $("<textarea/>").html(value).text()
}

const htmlEncode = function (value) {
    return $("<textarea/>").text(value).html()
}

jQuery.extend({
    postJSON: function (url, data, callback) {
        let request = $.ajax({
            url: url,
            type: "POST",
            data: data,
            dataType: "json",
        })
        request.done(function (msg) {
            if ($.isFunction(callback)) {
                callback(msg, "success")
                return true
            }
        })
        request.fail(function (jqXHR, textStatus, msg) {
            ///////////////////////////////////////////////
            //console.log("jqXHR", jqXHR.responseJSON)
            //console.log("_display_ajax_error", _display_ajax_error(jqXHR, textStatus, url))
            //console.log("textStatus", textStatus)
            //console.log("msg", msg)
            ///////////////////////////////////////////////
            if (typeof textStatus !== "undefined") {
                console.error("Request failed", _display_ajax_error(jqXHR, textStatus, url))
            } else {
                console.error("Request failed", _display_ajax_error(jqXHR, textStatus, url))
            }
            if ($.isFunction(callback)) {
                if (jqXHR.responseJSON) {
                    callback(jqXHR.responseJSON, "failed")
                } else {
                    callback(jqXHR, "failed")
                }
                
            }
            return false
        })
        return request
    },
    getJSONRequest: function (url, data, callback) {
        let getRequest = $.ajax({
            url: url,
            type: "GET",
            data: data,
            dataType: "json",
            async: true,
        })
        getRequest.done(function (msg) {
            if ($.isFunction(callback)) {
                callback(msg, "success")
            }
        })
        getRequest.fail(function (jqXHR, textStatus, msg) {
            if (typeof textStatus !== "undefined") {
                let err = _display_ajax_error(jqXHR, textStatus, url)
                handleError(err.message)
                console.log(err)
            } else {
                let err = _display_ajax_error(jqXHR, textStatus, url)
                handleError(err.message)
                console.log(err)
            }
            if ($.isFunction(callback)) {
                callback(msg, "failed")
            }
        })
    },
    getJSON: function (url, data, callback) {
        let getRequest = $.ajax({
            url: url,
            type: "GET",
            data: data,
            dataType: "json",
            async: false,
        })
        getRequest.done(function (msg) {
            if ($.isFunction(callback)) {
                callback(msg, "success")
            }
        })
        getRequest.fail(function (jqXHR, textStatus, msg) {
            if (typeof textStatus !== "undefined") {
                console.log("Request failed")
                console.log(_display_ajax_error(jqXHR, textStatus, url))
            } else {
                console.log("Request failed")
                console.log(_display_ajax_error(jqXHR, textStatus, url))
            }
            if ($.isFunction(callback)) {
                callback(msg, "failed")
            }
        })
    },
})

$.fn.table = function (settings) {
    "use strict"
    ///////////////////////////////////////////////
    let columnDefs, data = []
    let $dTable
    let table_type = "display_list"
    let table_id = $(this).attr("id")
    // ----
    const _table = document.getElementById(table_id)
    // ----
    DataTable.render.ellipsis = function (cutoff) {
        return function (data, type, row) {
            if (type === "display") {
                var str = data.toString() // cast numbers
                
                return str.length < cutoff ?
                  str :
                  str.substr(0, cutoff - 1) + "&#8230;"
            }
            
            // Search, order and type can use the original data
            return data
        }
    }
    
    if (settings) {
        if (settings.columnDefs) {
            columnDefs = settings.columnDefs
        }
        if (settings.table_type) {
            table_type = settings.table_type
        }
        if (settings.data) {
            data = settings.data
        }
    }
    // ----
    const formatTable = function () {
        let _filter = $("#" + table_id + "_wrapper .dataTables_filter")
        let _length = $("#" + table_id + "_wrapper .dataTables_length")
        let _info = $("#" + table_id + "_wrapper .dataTables_info")
        let _paginate = $("#" + table_id + "_wrapper .dataTables_paginate")
        let _wrapper = $("#" + table_id + "_wrapper")
        let _wrapper_select = $("#" + table_id + "_wrapper select")
        let _wrapper_table = $("#" + table_id).parent("div")
        // ----
        _wrapper_table
          .removeClass("col-sm-12")
          .addClass("p-0 m-0 w-100 h-100")
        _wrapper
          .find("label").each(function () {
            $(this).parent().append($(this).children())
        })
        
        _wrapper
          .find("div.row")
          .removeClass("row")
          .addClass("d-flex justify-content-between")
        
        _filter
          .find("input").each(function () {
            const $this = $(this)
            $this.attr("placeholder", "Search")
            $this.removeClass("form-control-sm")
        })
        
        _filter
          .find("label").remove()
        
        _filter
          .parent("div")
          .removeClass("col-sm-12 col-md-6")
          .addClass("w-50")
        
        _info
          .parent("div")
          .removeClass("col-sm-12 col-md-5")
          .addClass("w-50 d-flex align-content-center flex-wrap px-0")
        
        _info
          .addClass("py-0")
        
        _paginate
          .parent("div")
          .removeClass("col-sm-12 col-md-7")
          .addClass("w-50 px-0")
        
        _paginate
          .addClass("py-0")
        
        _paginate
          .find("ul.pagination")
          .addClass("mb-0")
        
        _length
          .parent("div")
          .removeClass("col-sm-12 col-md-6")
          .addClass("w-50")
        
        _length
          .find("label").each(function () {
            const $this = $(this)
            $this.addClass("mb-0 pb-0 mr-3 d-inline-block")
        })
        
        _wrapper_select
          .removeClass("custom-select custom-select-sm form-control form-control-sm")
        
        _wrapper_select
          .addClass("form-control d-inline-block")
        
        if (table_type === "display_list") {
            $("#" + table_id + ">tbody>tr").css({
                "cursor": "pointer",
            })
        }
        
    }
    ///////////////////////////////////////////////
    const insertRow = function (row_data) {
        if (row_data) {
            try {
                $dTable.row.add(row_data).node().id = table_id + "_tr_" + row_data.id
                $dTable.draw(false)
                formatTable()
            } catch (e) {
                console.log(e)
            }
        }
    }
    const update_row = function (row_data) {
        if (row_data) {
            
            try {
                $dTable.row(table_id + "_tr_" + row_data.id).data(row_data).draw(false)
            } catch (e) {
                console.log(e)
            }
        }
        
        formatTable()
    }
    const clear_selected_rows = function () {
        try {
            let table = $("#" + table_id + "> tbody  > tr")
            $.each(table, function (i, row) {
                $(row).removeClass("selected")
            })
        } catch (e) {
            console.log("clear_selected_rows", e)
        }
    }
    ///////////////////////////////////////////////
    if (_table) {
        try {
            $dTable = $(this).DataTable({
                pageLength: 5,
                lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                data: data,
                columnDefs: columnDefs,
            })
        } catch (e) {
            console.log(e)
        }
        
        if (settings.rowClick) {
            $dTable.on("click", "tr", function () {
                if ($(this).find("td").hasClass("dataTables_empty")) {
                
                } else {
                    clear_selected_rows()
                    $(this).addClass("selected")
                    let rowData = $dTable.row(this).data()
                    settings.rowClick(rowData)
                }
                
            })
        }
        
        formatTable()
        
    }
    ///////////////////////////////////////////////
    return {
        insertRow: function (row_data) {
            insertRow(row_data)
        },
        clearSelectedRows: function () {
            clear_selected_rows()
        },
        update_row (row_data) {
            update_row(row_data)
        },
    }
    
}

/**
 *
 * @type {{all: Map<any, any>, init: AddressTypes.init, get: AddressTypes.get, validator: null, save: AddressTypes.save, detail: {}, load_all: AddressTypes.load_all}}
 */
const AddressTypes = (function () {
    "use strict"
    const base_url = "/address_types"
    const _input_address_types_id = document.getElementById("input_address_types_id")
    const _input_address_types_name = document.getElementById("input_address_types_name")
    const _input_address_types_sort_order = document.getElementById("input_address_types_sort_order")
    const _input_address_types_enabled = document.getElementById("input_address_types_enabled")
    const _input_address_types_date_created = document.getElementById("input_address_types_date_created")
    const _input_address_types_created_by = document.getElementById("input_address_types_created_by")
    const _input_address_types_date_modified = document.getElementById("input_address_types_date_modified")
    const _input_address_types_modified_by = document.getElementById("input_address_types_modified_by")
    const _input_address_types_note = document.getElementById("input_address_types_note")
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const handle_address_types_error = function (msg) {
        toastr.error(msg)
    }
    
    const _default_detail = function () {
        return {
            id: null,
            name: null,
            sort_order: null,
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
    
    const init = function (settings) {
    
    }
    
    const set = function (address_types) {
        let detail = _default_detail()
        if (address_types) {
            detail.id = (address_types.id) ? address_types.id : null
            detail.name = (address_types.name) ? address_types.name : null
            detail.sort_order = (address_types.sort_order) ? address_types.sort_order : null
            detail.enabled = (address_types.enabled) ? address_types.enabled : 1
            detail.date_created = (address_types.date_created) ? address_types.date_created : formatDateMySQL()
            detail.created_by = (address_types.created_by) ? address_types.created_by : created_by
            detail.date_modified = (address_types.date_modified) ? address_types.date_modified : formatDateMySQL()
            detail.modified_by = (address_types.modified_by) ? address_types.modified_by : modified_by
            detail.note = (address_types.note) ? address_types.note : null
        }
        
        AddressTypes.detail = detail
        return detail
    }
    
    const load_all = function (address_types) {
        AddressTypes.all = new Map()
        
        if (!address_types) {
            return
        }
        $.each(address_types, function (i, address_types) {
            let detail = set(address_types)
            AddressTypes.all.set("id", detail)
        })
        
        console.log(" AddressTypes.all", AddressTypes.all)
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
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
    }
    
})()

//end object

const Address = (function () {
    "use strict"
    
    const base_url = "/address"
    const _input_address_address_id = document.getElementById("input_address_address_id")
    const _input_address_address = document.getElementById("input_address_address")
    const _input_address_address2 = document.getElementById("input_address_address2")
    const _input_address_district = document.getElementById("input_address_district")
    const _input_address_city_id = document.getElementById("input_address_city_id")
    const _input_address_postal_code = document.getElementById("input_address_postal_code")
    const _input_address_phone = document.getElementById("input_address_phone")
    const _input_address_last_update = document.getElementById("input_address_last_update")
    const _input_address_id = document.getElementById("input_address_id")
    const _input_address_province_id = document.getElementById("input_address_province_id")
    const _input_address_country_id = document.getElementById("input_address_country_id")
    const _input_address_street_1 = document.getElementById("input_address_street_1")
    const _input_address_street_2 = document.getElementById("input_address_street_2")
    const _input_address_street_3 = document.getElementById("input_address_street_3")
    const _input_address_enabled = document.getElementById("input_address_enabled")
    const _input_address_date_created = document.getElementById("input_address_date_created")
    const _input_address_created_by = document.getElementById("input_address_created_by")
    const _input_address_date_modified = document.getElementById("input_address_date_modified")
    const _input_address_modified_by = document.getElementById("input_address_modified_by")
    const _input_address_note = document.getElementById("input_address_note")
    const _table_address = document.getElementById("table_address")
    // ----
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let $address_table = $(_table_address)
    // ----
    const handle_address_error = function (msg) {
        toastr.error(msg)
    }
    
    const _default_detail = function () {
        return {
            address_id: null,
            address: null,
            address2: null,
            district: null,
            city_id: null,
            postal_code: null,
            phone: null,
            last_update: null,
            id: null,
            province_id: null,
            country_id: null,
            street_1: null,
            street_2: null,
            street_3: null,
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
    
    const get = function () {
        let data_to_send = {}
        
    }
    
    const init = function (settings) {
        console.log(" -- Address -- ", {})
        if (_table_address) {
            build_table()
        }
    }
    
    const navigate = function (address) {
        console.log("Address.navigate", address)
    }
    
    const build_table = function () {
        if (!$.fn.DataTable.isDataTable(_table_address)) {
            $address_table = $(_table_address).table({
                table_type: "display_list",
                data: Address.all,
                columnDefs: [
                    {
                        title: "ID",
                        targets: 0,
                        data: "id",
                        render: function (data, type, row, meta) {
                            return data
                        },
                    },
                    {
                        title: "Address",
                        targets: 1,
                        data: "street_1",
                        render: function (data, type, row, meta) {
                            return data
                        },
                    },
                ],
                rowClick: Address.navigate,
            })
        }
    }
    
    const set = function (address) {
        let detail = _default_detail()
        if (address) {
            detail.address_id = (address.address_id) ? address.address_id : null
            detail.address = (address.address) ? address.address : null
            detail.address2 = (address.address2) ? address.address2 : null
            detail.district = (address.district) ? address.district : null
            detail.city_id = (address.city_id) ? address.city_id : null
            detail.postal_code = (address.postal_code) ? address.postal_code : null
            detail.phone = (address.phone) ? address.phone : null
            detail.last_update = (address.last_update) ? address.last_update : null
            detail.id = (address.id) ? address.id : null
            detail.city_id = (address.city_id) ? address.city_id : null
            detail.province_id = (address.province_id) ? address.province_id : null
            detail.country_id = (address.country_id) ? address.country_id : null
            detail.street_1 = (address.street_1) ? address.street_1 : null
            detail.street_2 = (address.street_2) ? address.street_2 : null
            detail.street_3 = (address.street_3) ? address.street_3 : null
            detail.postal_code = (address.postal_code) ? address.postal_code : null
            detail.enabled = (address.enabled) ? address.enabled : 1
            detail.date_created = (address.date_created) ? address.date_created : formatDateMySQL()
            detail.created_by = (address.created_by) ? address.created_by : created_by
            detail.date_modified = (address.date_modified) ? address.date_modified : formatDateMySQL()
            detail.modified_by = (address.modified_by) ? address.modified_by : modified_by
            detail.note = (address.note) ? address.note : null
        }
        
        Address.detail = detail
        return detail
    }
    
    const load_all = function (addresses) {
        Address.all = new Map()
        
        if (!addresses) {
            return
        }
        $.each(addresses, function (i, address) {
            let detail = set(address)
            Address.all.set(detail)
        })
        
        console.log(" Address.all", Address.all)
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        navigate: function (address) {
            navigate(address)
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
    }
    
})()
Address.init()

    
const AirportTypes = (function () {
    'use strict'
    
    const base_url = '/airport_types'
    const _input_airport_types_id = document.getElementById('input_airport_types_id')
	const _input_airport_types_name = document.getElementById('input_airport_types_name')
	const _input_airport_types_sort_order = document.getElementById('input_airport_types_sort_order')
	const _input_airport_types_enabled = document.getElementById('input_airport_types_enabled')
	const _input_airport_types_date_created = document.getElementById('input_airport_types_date_created')
	const _input_airport_types_created_by = document.getElementById('input_airport_types_created_by')
	const _input_airport_types_date_modified = document.getElementById('input_airport_types_date_modified')
	const _input_airport_types_modified_by = document.getElementById('input_airport_types_modified_by')
	const _input_airport_types_note = document.getElementById('input_airport_types_note')
    let user_id = (document.getElementById('user_id')) ? (!isNaN(parseInt(document.getElementById('user_id').value))) ? parseInt(document.getElementById('user_id').value) : 4 : 4
    
    
    const handle_airport_types_error = function (msg) {
            toastr.error(msg)
        }
        
    const _default_detail = function () {
        return {
            id: null,
			name: null,
			sort_order: null,
			enabled: 1,
			date_created: formatDateMySQL(),
			created_by: user_id,
			date_modified: formatDateMySQL(),
			modified_by: user_id,
			note: null
        }
    }
    
    const save = function(params){
    
    }
    
    
            const get = function(id){
                let data_to_send = {}
                if(id){
                    data_to_send.id = id
                }
                
            }  
            
    
    const init = function(settings){
        console.log(' -- AirportTypes -- ', {})
    }
    
    const set = function (airport_types) {
        let detail = _default_detail()
        if (airport_types) {
            detail.id = (airport_types.id)?airport_types.id:null
			detail.name = (airport_types.name)?airport_types.name:null
			detail.sort_order = (airport_types.sort_order)?airport_types.sort_order:null
			detail.enabled = (airport_types.enabled)?airport_types.enabled:1
			detail.date_created = (airport_types.date_created)?airport_types.date_created:formatDateMySQL()
			detail.created_by = (airport_types.created_by)?airport_types.created_by:created_by
			detail.date_modified = (airport_types.date_modified)?airport_types.date_modified:formatDateMySQL()
			detail.modified_by = (airport_types.modified_by)?airport_types.modified_by:modified_by
			detail.note = (airport_types.note)?airport_types.note:null
        }
        
        AirportTypes.detail = detail
        return detail
    }
    
    const load_all = function (airport_types) {
        AirportTypes.all = new Map()
    
        if (!airport_types) {
            return
        }
        $.each(airport_types, function (i, airport_types) {
            let detail = set(airport_types)
            AirportTypes.all.set('id', detail)
        })
        
        console.log(' AirportTypes.all',  AirportTypes.all);
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        get:function(params){
            get(params)
        },
        load_all: function(params){
            load_all(params);
        },
        save:function(params){
           save(params); 
        },
        init: function () {
            init()
        },
    }

})()

AirportTypes.init()
//end object

const Category = (function () {
    "use strict"
    
    const base_url = "/category"
    const _input_category_category_id = document.getElementById("input_category_category_id")
    const _input_category_name = document.getElementById("input_category_name")
    const _input_category_last_update = document.getElementById("input_category_last_update")
    const _input_category_id = document.getElementById("input_category_id")
    const _input_category_pricing_strategy_types_id = document.getElementById("input_category_pricing_strategy_types_id")
    const _input_category_color_scheme_id = document.getElementById("input_category_color_scheme_id")
    const _input_category_icon = document.getElementById("input_category_icon")
    const _input_category_view_product_index = document.getElementById("input_category_view_product_index")
    const _input_category_view_product_index_filter = document.getElementById("input_category_view_product_index_filter")
    const _input_category_view_product_index_search = document.getElementById("input_category_view_product_index_search")
    const _input_category_view_product_edit = document.getElementById("input_category_view_product_edit")
    const _input_category_view_product_package_edit = document.getElementById("input_category_view_product_package_edit")
    const _input_category_view_product_package_index = document.getElementById("input_category_view_product_package_index")
    const _input_category_all_day = document.getElementById("input_category_all_day")
    const _input_category_overlap = document.getElementById("input_category_overlap")
    const _input_category_editable = document.getElementById("input_category_editable")
    const _input_category_duration_editable = document.getElementById("input_category_duration_editable")
    const _input_category_start_editable = document.getElementById("input_category_start_editable")
    const _input_category_display = document.getElementById("input_category_display")
    const _input_category_sort_order = document.getElementById("input_category_sort_order")
    const _input_category_enabled = document.getElementById("input_category_enabled")
    const _input_category_date_created = document.getElementById("input_category_date_created")
    const _input_category_created_by = document.getElementById("input_category_created_by")
    const _input_category_date_modified = document.getElementById("input_category_date_modified")
    const _input_category_modified_by = document.getElementById("input_category_modified_by")
    const _input_category_note = document.getElementById("input_category_note")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const handle_category_error = function (msg) {
        toastr.error(msg)
    }
    
    const _default_detail = function () {
        return {
            category_id: 1,
            name: null,
            last_update: null,
            id: null,
            pricing_strategy_types_id: null,
            color_scheme_id: null,
            icon: null,
            view_product_index: 1,
            view_product_index_filter: 1,
            view_product_index_search: 1,
            view_product_edit: 1,
            view_product_package_edit: 1,
            view_product_package_index: 1,
            all_day: 1,
            overlap: 1,
            editable: 1,
            duration_editable: 1,
            start_editable: 1,
            display: null,
            sort_order: null,
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
    
    const get = function () {
        let data_to_send = {}
        
    }
    
    const init = function (settings) {
        console.log(" -- Category -- ", {})
    }
    
    const set = function (category) {
        let detail = _default_detail()
        if (category) {
            detail.category_id = (category.category_id) ? category.category_id : 1
            detail.name = (category.name) ? category.name : null
            detail.last_update = (category.last_update) ? category.last_update : null
            detail.id = (category.id) ? category.id : null
            detail.pricing_strategy_types_id = (category.pricing_strategy_types_id) ? category.pricing_strategy_types_id : null
            detail.color_scheme_id = (category.color_scheme_id) ? category.color_scheme_id : null
            detail.name = (category.name) ? category.name : null
            detail.icon = (category.icon) ? category.icon : null
            detail.view_product_index = (category.view_product_index) ? category.view_product_index : 1
            detail.view_product_index_filter = (category.view_product_index_filter) ? category.view_product_index_filter : 1
            detail.view_product_index_search = (category.view_product_index_search) ? category.view_product_index_search : 1
            detail.view_product_edit = (category.view_product_edit) ? category.view_product_edit : 1
            detail.view_product_package_edit = (category.view_product_package_edit) ? category.view_product_package_edit : 1
            detail.view_product_package_index = (category.view_product_package_index) ? category.view_product_package_index : 1
            detail.all_day = (category.all_day) ? category.all_day : 1
            detail.overlap = (category.overlap) ? category.overlap : 1
            detail.editable = (category.editable) ? category.editable : 1
            detail.duration_editable = (category.duration_editable) ? category.duration_editable : 1
            detail.start_editable = (category.start_editable) ? category.start_editable : 1
            detail.display = (category.display) ? category.display : null
            detail.sort_order = (category.sort_order) ? category.sort_order : null
            detail.enabled = (category.enabled) ? category.enabled : 1
            detail.date_created = (category.date_created) ? category.date_created : formatDateMySQL()
            detail.created_by = (category.created_by) ? category.created_by : created_by
            detail.date_modified = (category.date_modified) ? category.date_modified : formatDateMySQL()
            detail.modified_by = (category.modified_by) ? category.modified_by : modified_by
            detail.note = (category.note) ? category.note : null
        }
        
        Category.detail = detail
        return detail
    }
    
    const load_all = function (categories) {
        Category.all = new Map()
        
        if (!categories) {
            return
        }
        $.each(categories, function (i, category) {
            let detail = set(category)
            Category.all.set(detail)
        })
        
        console.log(" Category.all", Category.all)
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
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
    }
    
})()

Category.init()
//end object

    
const ColorScheme = (function () {
    'use strict'
    
    const base_url = '/color_scheme'
    const _input_color_scheme_id = document.getElementById('input_color_scheme_id')
	const _input_color_scheme_name = document.getElementById('input_color_scheme_name')
	const _input_color_scheme_background_color = document.getElementById('input_color_scheme_background_color')
	const _input_color_scheme_border_color = document.getElementById('input_color_scheme_border_color')
	const _input_color_scheme_text_color = document.getElementById('input_color_scheme_text_color')
	const _input_color_scheme_sort_order = document.getElementById('input_color_scheme_sort_order')
	const _input_color_scheme_enabled = document.getElementById('input_color_scheme_enabled')
	const _input_color_scheme_date_created = document.getElementById('input_color_scheme_date_created')
	const _input_color_scheme_created_by = document.getElementById('input_color_scheme_created_by')
	const _input_color_scheme_date_modified = document.getElementById('input_color_scheme_date_modified')
	const _input_color_scheme_modified_by = document.getElementById('input_color_scheme_modified_by')
	const _input_color_scheme_note = document.getElementById('input_color_scheme_note')
    let user_id = (document.getElementById('user_id')) ? (!isNaN(parseInt(document.getElementById('user_id').value))) ? parseInt(document.getElementById('user_id').value) : 4 : 4
    
    
    const handle_color_scheme_error = function (msg) {
            toastr.error(msg)
        }
        
    const _default_detail = function () {
        return {
            id: null,
			name: null,
			background_color: null,
			border_color: null,
			text_color: null,
			sort_order: null,
			enabled: 1,
			date_created: formatDateMySQL(),
			created_by: user_id,
			date_modified: formatDateMySQL(),
			modified_by: user_id,
			note: null
        }
    }
    
    const save = function(params){
    
    }
    
    
            const get = function(id){
                let data_to_send = {}
                if(id){
                    data_to_send.id = id
                }
                
            }  
            
    
    const init = function(settings){
        console.log(' -- ColorScheme -- ', {})
    }
    
    const set = function (color_scheme) {
        let detail = _default_detail()
        if (color_scheme) {
            detail.id = (color_scheme.id)?color_scheme.id:null
			detail.name = (color_scheme.name)?color_scheme.name:null
			detail.background_color = (color_scheme.background_color)?color_scheme.background_color:null
			detail.border_color = (color_scheme.border_color)?color_scheme.border_color:null
			detail.text_color = (color_scheme.text_color)?color_scheme.text_color:null
			detail.sort_order = (color_scheme.sort_order)?color_scheme.sort_order:null
			detail.enabled = (color_scheme.enabled)?color_scheme.enabled:1
			detail.date_created = (color_scheme.date_created)?color_scheme.date_created:formatDateMySQL()
			detail.created_by = (color_scheme.created_by)?color_scheme.created_by:created_by
			detail.date_modified = (color_scheme.date_modified)?color_scheme.date_modified:formatDateMySQL()
			detail.modified_by = (color_scheme.modified_by)?color_scheme.modified_by:modified_by
			detail.note = (color_scheme.note)?color_scheme.note:null
        }
        
        ColorScheme.detail = detail
        return detail
    }
    
    const load_all = function (color_schemes) {
        ColorScheme.all = new Map()
    
        if (!color_schemes) {
            return
        }
        $.each(color_schemes, function (i, color_scheme) {
            let detail = set(color_scheme)
            ColorScheme.all.set('id', detail)
        })
        
        console.log(' ColorScheme.all',  ColorScheme.all);
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        get:function(params){
            get(params)
        },
        load_all: function(params){
            load_all(params);
        },
        save:function(params){
           save(params); 
        },
        init: function () {
            init()
        },
    }

})()

ColorScheme.init()
//end object

    
const ContactTypes = (function () {
    'use strict'
    
    const base_url = '/contact_types'
    const _input_contact_types_id = document.getElementById('input_contact_types_id')
	const _input_contact_types_name = document.getElementById('input_contact_types_name')
	const _input_contact_types_sort_order = document.getElementById('input_contact_types_sort_order')
	const _input_contact_types_enabled = document.getElementById('input_contact_types_enabled')
	const _input_contact_types_date_created = document.getElementById('input_contact_types_date_created')
	const _input_contact_types_created_by = document.getElementById('input_contact_types_created_by')
	const _input_contact_types_date_modified = document.getElementById('input_contact_types_date_modified')
	const _input_contact_types_modified_by = document.getElementById('input_contact_types_modified_by')
	const _input_contact_types_note = document.getElementById('input_contact_types_note')
    let user_id = (document.getElementById('user_id')) ? (!isNaN(parseInt(document.getElementById('user_id').value))) ? parseInt(document.getElementById('user_id').value) : 4 : 4
    
    
    const handle_contact_types_error = function (msg) {
            toastr.error(msg)
        }
        
    const _default_detail = function () {
        return {
            id: null,
			name: null,
			sort_order: null,
			enabled: 1,
			date_created: formatDateMySQL(),
			created_by: user_id,
			date_modified: formatDateMySQL(),
			modified_by: user_id,
			note: null
        }
    }
    
    const save = function(params){
    
    }
    
    
            const get = function(id){
                let data_to_send = {}
                if(id){
                    data_to_send.id = id
                }
                
            }  
            
    
    const init = function(settings){
        console.log(' -- ContactTypes -- ', {})
    }
    
    const set = function (contact_types) {
        let detail = _default_detail()
        if (contact_types) {
            detail.id = (contact_types.id)?contact_types.id:null
			detail.name = (contact_types.name)?contact_types.name:null
			detail.sort_order = (contact_types.sort_order)?contact_types.sort_order:null
			detail.enabled = (contact_types.enabled)?contact_types.enabled:1
			detail.date_created = (contact_types.date_created)?contact_types.date_created:formatDateMySQL()
			detail.created_by = (contact_types.created_by)?contact_types.created_by:created_by
			detail.date_modified = (contact_types.date_modified)?contact_types.date_modified:formatDateMySQL()
			detail.modified_by = (contact_types.modified_by)?contact_types.modified_by:modified_by
			detail.note = (contact_types.note)?contact_types.note:null
        }
        
        ContactTypes.detail = detail
        return detail
    }
    
    const load_all = function (contact_types) {
        ContactTypes.all = new Map()
    
        if (!contact_types) {
            return
        }
        $.each(contact_types, function (i, contact_types) {
            let detail = set(contact_types)
            ContactTypes.all.set('id', detail)
        })
        
        console.log(' ContactTypes.all',  ContactTypes.all);
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        get:function(params){
            get(params)
        },
        load_all: function(params){
            load_all(params);
        },
        save:function(params){
           save(params); 
        },
        init: function () {
            init()
        },
    }

})()

ContactTypes.init()
//end object

const Contact = (function () {
    "use strict"
    
    const base_url = "/contact"
    const _input_contact_id = document.getElementById("input_contact_id")
    const _input_contact_name_first = document.getElementById("input_contact_name_first")
    const _input_contact_name_last = document.getElementById("input_contact_name_last")
    const _input_contact_phone = document.getElementById("input_contact_phone")
    const _input_contact_email = document.getElementById("input_contact_email")
    const _input_contact_enabled = document.getElementById("input_contact_enabled")
    const _input_contact_date_created = document.getElementById("input_contact_date_created")
    const _input_contact_created_by = document.getElementById("input_contact_created_by")
    const _input_contact_date_modified = document.getElementById("input_contact_date_modified")
    const _input_contact_modified_by = document.getElementById("input_contact_modified_by")
    const _input_contact_note = document.getElementById("input_contact_note")
    const _table_contact = document.getElementById("table_contact")
    // ----
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let $contact_table = $(_table_contact)
    // ----
    const build_table = function () {
        if (!$.fn.DataTable.isDataTable(_table_contact)) {
            $contact_table = $(_table_contact).table({
                table_type: "display_list",
                data: Contact.all,
                columnDefs: [
                    {
                        title: "ID",
                        targets: 0,
                        data: "id",
                        render: function (data, type, row, meta) {
                            return data
                        },
                    },
                    {
                        title: "First Name",
                        targets: 1,
                        data: "name_first",
                        render: function (data, type, row, meta) {
                            return data
                        },
                    },
                    {
                        title: "Last Name",
                        targets: 2,
                        data: "name_last",
                        render: function (data, type, row, meta) {
                            return data
                        },
                    },
                ],
                rowClick: Contact.navigate,
            })
        }
    }
    
    const handle_contact_error = function (msg) {
        toastr.error(msg)
    }
    
    const _default_detail = function () {
        return {
            id: null,
            name_first: null,
            name_last: null,
            phone: null,
            email: null,
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
    
    const init = function (settings) {
        console.log(" -- Contact -- ", {})
        if (_table_contact) {
            build_table()
        }
    }
    
    const set = function (contact) {
        let detail = _default_detail()
        if (contact) {
            detail.id = (contact.id) ? contact.id : null
            detail.name_first = (contact.name_first) ? contact.name_first : null
            detail.name_last = (contact.name_last) ? contact.name_last : null
            detail.phone = (contact.phone) ? contact.phone : null
            detail.email = (contact.email) ? contact.email : null
            detail.enabled = (contact.enabled) ? contact.enabled : 1
            detail.date_created = (contact.date_created) ? contact.date_created : formatDateMySQL()
            detail.created_by = (contact.created_by) ? contact.created_by : created_by
            detail.date_modified = (contact.date_modified) ? contact.date_modified : formatDateMySQL()
            detail.modified_by = (contact.modified_by) ? contact.modified_by : modified_by
            detail.note = (contact.note) ? contact.note : null
        }
        
        Contact.detail = detail
        return detail
    }
    
    const load_all = function (contacts) {
        Contact.all = new Map()
        
        if (!contacts) {
            return
        }
        
        $.each(contacts, function (i, contact) {
            let detail = set(contact)
            
            Contact.all.set("id", detail)
        })
        
        console.log(" Contact.all", Contact.all)
    }
    
    const navigate = function (contact) {
        console.log("Contact.navigate", contact)
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        navigate: function (contact) {
            navigate(contact)
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
        init: function (settings) {
            init(settings)
        },
    }
    
})()

Contact.init()
//end object

    
const Currency = (function () {
    'use strict'
    
    const base_url = '/currency'
    const _input_currency_id = document.getElementById('input_currency_id')
	const _input_currency_sort_order = document.getElementById('input_currency_sort_order')
	const _input_currency_name = document.getElementById('input_currency_name')
	const _input_currency_iso = document.getElementById('input_currency_iso')
	const _input_currency_minor_unit = document.getElementById('input_currency_minor_unit')
	const _input_currency_symbol = document.getElementById('input_currency_symbol')
	const _input_currency_enabled = document.getElementById('input_currency_enabled')
	const _input_currency_date_created = document.getElementById('input_currency_date_created')
	const _input_currency_created_by = document.getElementById('input_currency_created_by')
	const _input_currency_date_modified = document.getElementById('input_currency_date_modified')
	const _input_currency_modified_by = document.getElementById('input_currency_modified_by')
	const _input_currency_note = document.getElementById('input_currency_note')
    let user_id = (document.getElementById('user_id')) ? (!isNaN(parseInt(document.getElementById('user_id').value))) ? parseInt(document.getElementById('user_id').value) : 4 : 4
    
    
    const handle_currency_error = function (msg) {
            toastr.error(msg)
        }
        
    const _default_detail = function () {
        return {
            id: null,
			sort_order: null,
			name: null,
			iso: null,
			minor_unit: null,
			symbol: null,
			enabled: 1,
			date_created: formatDateMySQL(),
			created_by: user_id,
			date_modified: formatDateMySQL(),
			modified_by: user_id,
			note: null
        }
    }
    
    const save = function(params){
    
    }
    
    
            const get = function(id){
                let data_to_send = {}
                if(id){
                    data_to_send.id = id
                }
                
            }  
            
    
    const init = function(settings){
        console.log(' -- Currency -- ', {})
    }
    
    const set = function (currency) {
        let detail = _default_detail()
        if (currency) {
            detail.id = (currency.id)?currency.id:null
			detail.sort_order = (currency.sort_order)?currency.sort_order:null
			detail.name = (currency.name)?currency.name:null
			detail.iso = (currency.iso)?currency.iso:null
			detail.minor_unit = (currency.minor_unit)?currency.minor_unit:null
			detail.symbol = (currency.symbol)?currency.symbol:null
			detail.enabled = (currency.enabled)?currency.enabled:1
			detail.date_created = (currency.date_created)?currency.date_created:formatDateMySQL()
			detail.created_by = (currency.created_by)?currency.created_by:created_by
			detail.date_modified = (currency.date_modified)?currency.date_modified:formatDateMySQL()
			detail.modified_by = (currency.modified_by)?currency.modified_by:modified_by
			detail.note = (currency.note)?currency.note:null
        }
        
        Currency.detail = detail
        return detail
    }
    
    const load_all = function (currencies) {
        Currency.all = new Map()
    
        if (!currencies) {
            return
        }
        $.each(currencies, function (i, currency) {
            let detail = set(currency)
            Currency.all.set('id', detail)
        })
        
        console.log(' Currency.all',  Currency.all);
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        get:function(params){
            get(params)
        },
        load_all: function(params){
            load_all(params);
        },
        save:function(params){
           save(params); 
        },
        init: function () {
            init()
        },
    }

})()

Currency.init()
//end object

    
const LocationTypes = (function () {
    'use strict'
    
    const base_url = '/location_types'
    const _input_location_types_id = document.getElementById('input_location_types_id')
	const _input_location_types_name = document.getElementById('input_location_types_name')
	const _input_location_types_icon = document.getElementById('input_location_types_icon')
	const _input_location_types_sort_order = document.getElementById('input_location_types_sort_order')
	const _input_location_types_enabled = document.getElementById('input_location_types_enabled')
	const _input_location_types_date_created = document.getElementById('input_location_types_date_created')
	const _input_location_types_created_by = document.getElementById('input_location_types_created_by')
	const _input_location_types_date_modified = document.getElementById('input_location_types_date_modified')
	const _input_location_types_modified_by = document.getElementById('input_location_types_modified_by')
	const _input_location_types_note = document.getElementById('input_location_types_note')
    let user_id = (document.getElementById('user_id')) ? (!isNaN(parseInt(document.getElementById('user_id').value))) ? parseInt(document.getElementById('user_id').value) : 4 : 4
    
    
    const handle_location_types_error = function (msg) {
            toastr.error(msg)
        }
        
    const _default_detail = function () {
        return {
            id: null,
			name: null,
			icon: null,
			sort_order: null,
			enabled: 1,
			date_created: formatDateMySQL(),
			created_by: user_id,
			date_modified: formatDateMySQL(),
			modified_by: user_id,
			note: null
        }
    }
    
    const save = function(params){
    
    }
    
    
            const get = function(id){
                let data_to_send = {}
                if(id){
                    data_to_send.id = id
                }
                
            }  
            
    
    const init = function(settings){
        console.log(' -- LocationTypes -- ', {})
    }
    
    const set = function (location_types) {
        let detail = _default_detail()
        if (location_types) {
            detail.id = (location_types.id)?location_types.id:null
			detail.name = (location_types.name)?location_types.name:null
			detail.icon = (location_types.icon)?location_types.icon:null
			detail.sort_order = (location_types.sort_order)?location_types.sort_order:null
			detail.enabled = (location_types.enabled)?location_types.enabled:1
			detail.date_created = (location_types.date_created)?location_types.date_created:formatDateMySQL()
			detail.created_by = (location_types.created_by)?location_types.created_by:created_by
			detail.date_modified = (location_types.date_modified)?location_types.date_modified:formatDateMySQL()
			detail.modified_by = (location_types.modified_by)?location_types.modified_by:modified_by
			detail.note = (location_types.note)?location_types.note:null
        }
        
        LocationTypes.detail = detail
        return detail
    }
    
    const load_all = function (location_types) {
        LocationTypes.all = new Map()
    
        if (!location_types) {
            return
        }
        $.each(location_types, function (i, location_types) {
            let detail = set(location_types)
            LocationTypes.all.set('id', detail)
        })
        
        console.log(' LocationTypes.all',  LocationTypes.all);
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        get:function(params){
            get(params)
        },
        load_all: function(params){
            load_all(params);
        },
        save:function(params){
           save(params); 
        },
        init: function () {
            init()
        },
    }

})()

LocationTypes.init()
//end object

    
const MessageTypes = (function () {
    'use strict'
    
    const base_url = '/message_types'
    const _input_message_types_id = document.getElementById('input_message_types_id')
	const _input_message_types_name = document.getElementById('input_message_types_name')
	const _input_message_types_icon = document.getElementById('input_message_types_icon')
	const _input_message_types_sort_order = document.getElementById('input_message_types_sort_order')
	const _input_message_types_enabled = document.getElementById('input_message_types_enabled')
	const _input_message_types_date_created = document.getElementById('input_message_types_date_created')
	const _input_message_types_created_by = document.getElementById('input_message_types_created_by')
	const _input_message_types_date_modified = document.getElementById('input_message_types_date_modified')
	const _input_message_types_modified_by = document.getElementById('input_message_types_modified_by')
	const _input_message_types_note = document.getElementById('input_message_types_note')
    let user_id = (document.getElementById('user_id')) ? (!isNaN(parseInt(document.getElementById('user_id').value))) ? parseInt(document.getElementById('user_id').value) : 4 : 4
    
    
    const handle_message_types_error = function (msg) {
            toastr.error(msg)
        }
        
    const _default_detail = function () {
        return {
            id: null,
			name: null,
			icon: null,
			sort_order: null,
			enabled: 1,
			date_created: formatDateMySQL(),
			created_by: user_id,
			date_modified: formatDateMySQL(),
			modified_by: user_id,
			note: null
        }
    }
    
    const save = function(params){
    
    }
    
    
            const get = function(id){
                let data_to_send = {}
                if(id){
                    data_to_send.id = id
                }
                
            }  
            
    
    const init = function(settings){
        console.log(' -- MessageTypes -- ', {})
    }
    
    const set = function (message_types) {
        let detail = _default_detail()
        if (message_types) {
            detail.id = (message_types.id)?message_types.id:null
			detail.name = (message_types.name)?message_types.name:null
			detail.icon = (message_types.icon)?message_types.icon:null
			detail.sort_order = (message_types.sort_order)?message_types.sort_order:null
			detail.enabled = (message_types.enabled)?message_types.enabled:1
			detail.date_created = (message_types.date_created)?message_types.date_created:formatDateMySQL()
			detail.created_by = (message_types.created_by)?message_types.created_by:created_by
			detail.date_modified = (message_types.date_modified)?message_types.date_modified:formatDateMySQL()
			detail.modified_by = (message_types.modified_by)?message_types.modified_by:modified_by
			detail.note = (message_types.note)?message_types.note:null
        }
        
        MessageTypes.detail = detail
        return detail
    }
    
    const load_all = function (message_types) {
        MessageTypes.all = new Map()
    
        if (!message_types) {
            return
        }
        $.each(message_types, function (i, message_types) {
            let detail = set(message_types)
            MessageTypes.all.set('id', detail)
        })
        
        console.log(' MessageTypes.all',  MessageTypes.all);
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        get:function(params){
            get(params)
        },
        load_all: function(params){
            load_all(params);
        },
        save:function(params){
           save(params); 
        },
        init: function () {
            init()
        },
    }

})()

MessageTypes.init()
//end object

    
const PricingStrategyTypes = (function () {
    'use strict'
    
    const base_url = '/pricing_strategy_types'
    const _input_pricing_strategy_types_id = document.getElementById('input_pricing_strategy_types_id')
	const _input_pricing_strategy_types_name = document.getElementById('input_pricing_strategy_types_name')
	const _input_pricing_strategy_types_enabled = document.getElementById('input_pricing_strategy_types_enabled')
	const _input_pricing_strategy_types_date_created = document.getElementById('input_pricing_strategy_types_date_created')
	const _input_pricing_strategy_types_created_by = document.getElementById('input_pricing_strategy_types_created_by')
	const _input_pricing_strategy_types_date_modified = document.getElementById('input_pricing_strategy_types_date_modified')
	const _input_pricing_strategy_types_modified_by = document.getElementById('input_pricing_strategy_types_modified_by')
	const _input_pricing_strategy_types_note = document.getElementById('input_pricing_strategy_types_note')
    let user_id = (document.getElementById('user_id')) ? (!isNaN(parseInt(document.getElementById('user_id').value))) ? parseInt(document.getElementById('user_id').value) : 4 : 4
    
    
    const handle_pricing_strategy_types_error = function (msg) {
            toastr.error(msg)
        }
        
    const _default_detail = function () {
        return {
            id: null,
			name: null,
			enabled: 1,
			date_created: formatDateMySQL(),
			created_by: user_id,
			date_modified: formatDateMySQL(),
			modified_by: user_id,
			note: null
        }
    }
    
    const save = function(params){
    
    }
    
    
            const get = function(id){
                let data_to_send = {}
                if(id){
                    data_to_send.id = id
                }
                
            }  
            
    
    const init = function(settings){
        console.log(' -- PricingStrategyTypes -- ', {})
    }
    
    const set = function (pricing_strategy_types) {
        let detail = _default_detail()
        if (pricing_strategy_types) {
            detail.id = (pricing_strategy_types.id)?pricing_strategy_types.id:null
			detail.name = (pricing_strategy_types.name)?pricing_strategy_types.name:null
			detail.enabled = (pricing_strategy_types.enabled)?pricing_strategy_types.enabled:1
			detail.date_created = (pricing_strategy_types.date_created)?pricing_strategy_types.date_created:formatDateMySQL()
			detail.created_by = (pricing_strategy_types.created_by)?pricing_strategy_types.created_by:created_by
			detail.date_modified = (pricing_strategy_types.date_modified)?pricing_strategy_types.date_modified:formatDateMySQL()
			detail.modified_by = (pricing_strategy_types.modified_by)?pricing_strategy_types.modified_by:modified_by
			detail.note = (pricing_strategy_types.note)?pricing_strategy_types.note:null
        }
        
        PricingStrategyTypes.detail = detail
        return detail
    }
    
    const load_all = function (pricing_strategy_types) {
        PricingStrategyTypes.all = new Map()
    
        if (!pricing_strategy_types) {
            return
        }
        $.each(pricing_strategy_types, function (i, pricing_strategy_types) {
            let detail = set(pricing_strategy_types)
            PricingStrategyTypes.all.set('id', detail)
        })
        
        console.log(' PricingStrategyTypes.all',  PricingStrategyTypes.all);
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        get:function(params){
            get(params)
        },
        load_all: function(params){
            load_all(params);
        },
        save:function(params){
           save(params); 
        },
        init: function () {
            init()
        },
    }

})()

PricingStrategyTypes.init()
//end object

    
const RatingTypes = (function () {
    'use strict'
    
    const base_url = '/rating_types'
    const _input_rating_types_id = document.getElementById('input_rating_types_id')
	const _input_rating_types_name = document.getElementById('input_rating_types_name')
	const _input_rating_types_enabled = document.getElementById('input_rating_types_enabled')
	const _input_rating_types_date_created = document.getElementById('input_rating_types_date_created')
	const _input_rating_types_created_by = document.getElementById('input_rating_types_created_by')
	const _input_rating_types_date_modified = document.getElementById('input_rating_types_date_modified')
	const _input_rating_types_modified_by = document.getElementById('input_rating_types_modified_by')
	const _input_rating_types_note = document.getElementById('input_rating_types_note')
    let user_id = (document.getElementById('user_id')) ? (!isNaN(parseInt(document.getElementById('user_id').value))) ? parseInt(document.getElementById('user_id').value) : 4 : 4
    
    
    const handle_rating_types_error = function (msg) {
            toastr.error(msg)
        }
        
    const _default_detail = function () {
        return {
            id: null,
			name: null,
			enabled: 1,
			date_created: formatDateMySQL(),
			created_by: user_id,
			date_modified: formatDateMySQL(),
			modified_by: user_id,
			note: null
        }
    }
    
    const save = function(params){
    
    }
    
    
            const get = function(id){
                let data_to_send = {}
                if(id){
                    data_to_send.id = id
                }
                
            }  
            
    
    const init = function(settings){
        console.log(' -- RatingTypes -- ', {})
    }
    
    const set = function (rating_types) {
        let detail = _default_detail()
        if (rating_types) {
            detail.id = (rating_types.id)?rating_types.id:null
			detail.name = (rating_types.name)?rating_types.name:null
			detail.enabled = (rating_types.enabled)?rating_types.enabled:1
			detail.date_created = (rating_types.date_created)?rating_types.date_created:formatDateMySQL()
			detail.created_by = (rating_types.created_by)?rating_types.created_by:created_by
			detail.date_modified = (rating_types.date_modified)?rating_types.date_modified:formatDateMySQL()
			detail.modified_by = (rating_types.modified_by)?rating_types.modified_by:modified_by
			detail.note = (rating_types.note)?rating_types.note:null
        }
        
        RatingTypes.detail = detail
        return detail
    }
    
    const load_all = function (rating_types) {
        RatingTypes.all = new Map()
    
        if (!rating_types) {
            return
        }
        $.each(rating_types, function (i, rating_types) {
            let detail = set(rating_types)
            RatingTypes.all.set('id', detail)
        })
        
        console.log(' RatingTypes.all',  RatingTypes.all);
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        get:function(params){
            get(params)
        },
        load_all: function(params){
            load_all(params);
        },
        save:function(params){
           save(params); 
        },
        init: function () {
            init()
        },
    }

})()

RatingTypes.init()
//end object

    
const SalesTypes = (function () {
    'use strict'
    
    const base_url = '/sales_types'
    const _input_sales_types_id = document.getElementById('input_sales_types_id')
	const _input_sales_types_name = document.getElementById('input_sales_types_name')
	const _input_sales_types_class = document.getElementById('input_sales_types_class')
	const _input_sales_types_sort_order = document.getElementById('input_sales_types_sort_order')
	const _input_sales_types_enabled = document.getElementById('input_sales_types_enabled')
	const _input_sales_types_date_created = document.getElementById('input_sales_types_date_created')
	const _input_sales_types_created_by = document.getElementById('input_sales_types_created_by')
	const _input_sales_types_date_modified = document.getElementById('input_sales_types_date_modified')
	const _input_sales_types_modified_by = document.getElementById('input_sales_types_modified_by')
	const _input_sales_types_note = document.getElementById('input_sales_types_note')
    let user_id = (document.getElementById('user_id')) ? (!isNaN(parseInt(document.getElementById('user_id').value))) ? parseInt(document.getElementById('user_id').value) : 4 : 4
    
    
    const handle_sales_types_error = function (msg) {
            toastr.error(msg)
        }
        
    const _default_detail = function () {
        return {
            id: null,
			name: null,
			class: null,
			sort_order: null,
			enabled: 1,
			date_created: formatDateMySQL(),
			created_by: user_id,
			date_modified: formatDateMySQL(),
			modified_by: user_id,
			note: null
        }
    }
    
    const save = function(params){
    
    }
    
    
            const get = function(id){
                let data_to_send = {}
                if(id){
                    data_to_send.id = id
                }
                
            }  
            
    
    const init = function(settings){
        console.log(' -- SalesTypes -- ', {})
    }
    
    const set = function (sales_types) {
        let detail = _default_detail()
        if (sales_types) {
            detail.id = (sales_types.id)?sales_types.id:null
			detail.name = (sales_types.name)?sales_types.name:null
			detail.class = (sales_types.class)?sales_types.class:null
			detail.sort_order = (sales_types.sort_order)?sales_types.sort_order:null
			detail.enabled = (sales_types.enabled)?sales_types.enabled:1
			detail.date_created = (sales_types.date_created)?sales_types.date_created:formatDateMySQL()
			detail.created_by = (sales_types.created_by)?sales_types.created_by:created_by
			detail.date_modified = (sales_types.date_modified)?sales_types.date_modified:formatDateMySQL()
			detail.modified_by = (sales_types.modified_by)?sales_types.modified_by:modified_by
			detail.note = (sales_types.note)?sales_types.note:null
        }
        
        SalesTypes.detail = detail
        return detail
    }
    
    const load_all = function (sales_types) {
        SalesTypes.all = new Map()
    
        if (!sales_types) {
            return
        }
        $.each(sales_types, function (i, sales_types) {
            let detail = set(sales_types)
            SalesTypes.all.set('id', detail)
        })
        
        console.log(' SalesTypes.all',  SalesTypes.all);
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        get:function(params){
            get(params)
        },
        load_all: function(params){
            load_all(params);
        },
        save:function(params){
           save(params); 
        },
        init: function () {
            init()
        },
    }

})()

SalesTypes.init()
//end object

    
const StatusTypes = (function () {
    'use strict'
    
    const base_url = '/status_types'
    const _input_status_types_id = document.getElementById('input_status_types_id')
	const _input_status_types_name = document.getElementById('input_status_types_name')
	const _input_status_types_enabled = document.getElementById('input_status_types_enabled')
	const _input_status_types_date_created = document.getElementById('input_status_types_date_created')
	const _input_status_types_created_by = document.getElementById('input_status_types_created_by')
	const _input_status_types_date_modified = document.getElementById('input_status_types_date_modified')
	const _input_status_types_modified_by = document.getElementById('input_status_types_modified_by')
	const _input_status_types_note = document.getElementById('input_status_types_note')
	const _input_status_types_sort_order = document.getElementById('input_status_types_sort_order')
    let user_id = (document.getElementById('user_id')) ? (!isNaN(parseInt(document.getElementById('user_id').value))) ? parseInt(document.getElementById('user_id').value) : 4 : 4
    
    
    const handle_status_types_error = function (msg) {
            toastr.error(msg)
        }
        
    const _default_detail = function () {
        return {
            id: null,
			name: null,
			enabled: 1,
			date_created: formatDateMySQL(),
			created_by: user_id,
			date_modified: formatDateMySQL(),
			modified_by: user_id,
			note: null,
			sort_order: null
        }
    }
    
    const save = function(params){
    
    }
    
    
            const get = function(id){
                let data_to_send = {}
                if(id){
                    data_to_send.id = id
                }
                
            }  
            
    
    const init = function(settings){
        console.log(' -- StatusTypes -- ', {})
    }
    
    const set = function (status_types) {
        let detail = _default_detail()
        if (status_types) {
            detail.id = (status_types.id)?status_types.id:null
			detail.name = (status_types.name)?status_types.name:null
			detail.enabled = (status_types.enabled)?status_types.enabled:1
			detail.date_created = (status_types.date_created)?status_types.date_created:formatDateMySQL()
			detail.created_by = (status_types.created_by)?status_types.created_by:created_by
			detail.date_modified = (status_types.date_modified)?status_types.date_modified:formatDateMySQL()
			detail.modified_by = (status_types.modified_by)?status_types.modified_by:modified_by
			detail.note = (status_types.note)?status_types.note:null
			detail.sort_order = (status_types.sort_order)?status_types.sort_order:null
        }
        
        StatusTypes.detail = detail
        return detail
    }
    
    const load_all = function (status_types) {
        StatusTypes.all = new Map()
    
        if (!status_types) {
            return
        }
        $.each(status_types, function (i, status_types) {
            let detail = set(status_types)
            StatusTypes.all.set('id', detail)
        })
        
        console.log(' StatusTypes.all',  StatusTypes.all);
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        get:function(params){
            get(params)
        },
        load_all: function(params){
            load_all(params);
        },
        save:function(params){
           save(params); 
        },
        init: function () {
            init()
        },
    }

})()

StatusTypes.init()
//end object

const Types = (function () {
    "use strict"
    const base_url = "/types"
    // ----
    
    const handle_types_error = function (msg) {
        toastr.error(msg)
    }
    
    const setType = function (types, types_name) {
        $.each(types, function (k, type) {
            Types[types_name].set(type.id, type)
        })
        
        console.log(types_name, Types[types_name])
    }
    
    const init = function (settings) {
        Provider.init()
        Address.init()
        Contact.init()
        Types.address_types = new Map()
        Types.airport_types = new Map()
        Types.categories_ratings_types = new Map()
        Types.category = new Map()
        Types.color_scheme = new Map()
        Types.contact_types = new Map()
        Types.currency = new Map()
        Types.location_types = new Map()
        Types.message_types = new Map()
        Types.pricing_strategy_types = new Map()
        Types.rating_types = new Map()
        Types.sales_types = new Map()
        Types.status_types = new Map()
        
        if (settings.address_types) {
            setType(settings.address_types, "address_types")
        }
        
        if (settings.airport_types) {
            setType(settings.airport_types, "airport_types")
        }
        
        if (settings.category) {
            setType(settings.category, "category")
        }
        
        if (settings.color_scheme) {
            setType(settings.color_scheme, "color_scheme")
        }
        
        if (settings.contact_types) {
            setType(settings.contact_types, "contact_types")
        }
        
        if (settings.currency) {
            setType(settings.currency, "currency")
        }
        
        if (settings.location_types) {
            setType(settings.location_types, "location_types")
        }
        
        if (settings.message_types) {
            setType(settings.message_types, "message_types")
        }
        
        if (settings.pricing_strategy_types) {
            setType(settings.pricing_strategy_types, "pricing_strategy_types")
        }
        
        if (settings.rating_types) {
            setType(settings.rating_types, "rating_types")
        }
        
        if (settings.sales_types) {
            setType(settings.sales_types, "sales_types")
        }
        
        if (settings.status_types) {
            setType(settings.status_types, "status_types")
        }
        
    }
    
    return {
        address_types: new Map(),
        airport_types: new Map(),
        categories_ratings_types: new Map(),
        category: new Map(),
        color_scheme: new Map(),
        contact_types: new Map(),
        currency: new Map(),
        location_types: new Map(),
        message_types: new Map(),
        pricing_strategy_types: new Map(),
        rating_types: new Map(),
        sales_types: new Map(),
        status_types: new Map(),
        
        init: function (settings) {
            init(settings)
        },
    }
    
})()

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
        console.log("login", {})
        if (_email && _password) {
            Login.validator = validator_init(form_rules)
        }
        
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

const Product = (function () {
    "use strict"
    ///////////////////////////////////////////////
    const base_url = "/product"
    const _input_product_id = document.getElementById("input_product_id")
    const _input_product_category_id = document.getElementById("input_product_category_id")
    const _input_product_pricing_strategy_types_id = document.getElementById("input_product_pricing_strategy_types_id")
    const _input_product_status_types_id = document.getElementById("input_product_status_types_id")
    const _input_product_product_status_types_id = document.getElementById("input_product_product_status_types_id")
    const _input_product_currency_id = document.getElementById("input_product_currency_id")
    const _input_product_location_id = document.getElementById("input_product_location_id")
    const _input_product_city_id = document.getElementById("input_product_city_id")
    const _input_product_vendor_id = document.getElementById("input_product_vendor_id")
    const _input_product_provider_id = document.getElementById("input_product_provider_id")
    const _input_product_name = document.getElementById("input_product_name")
    const _input_product_provider_vendor_match = document.getElementById("input_product_provider_vendor_match")
    const _input_product_description_short = document.getElementById("input_product_description_short")
    const _input_product_description_long = document.getElementById("input_product_description_long")
    const _input_product_rating = document.getElementById("input_product_rating")
    const _input_product_sku = document.getElementById("input_product_sku")
    const _input_product_phone = document.getElementById("input_product_phone")
    const _input_product_infant = document.getElementById("input_product_infant")
    const _input_product_child = document.getElementById("input_product_child")
    const _input_product_teen = document.getElementById("input_product_teen")
    const _input_product_depart_from = document.getElementById("input_product_depart_from")
    const _input_product_arrive_to = document.getElementById("input_product_arrive_to")
    const _input_product_depart_time = document.getElementById("input_product_depart_time")
    const _input_product_arrive_time = document.getElementById("input_product_arrive_time")
    const _input_product_day_span = document.getElementById("input_product_day_span")
    const _input_product_cover_image = document.getElementById("input_product_cover_image")
    const _input_product_api_id = document.getElementById("input_product_api_id")
    const _input_product_from_api = document.getElementById("input_product_from_api")
    const _input_product_hotel_code = document.getElementById("input_product_hotel_code")
    const _input_product_enabled = document.getElementById("input_product_enabled")
    const _input_product_date_created = document.getElementById("input_product_date_created")
    const _input_product_created_by = document.getElementById("input_product_created_by")
    const _input_product_date_modified = document.getElementById("input_product_date_modified")
    const _input_product_modified_by = document.getElementById("input_product_modified_by")
    const _input_product_note = document.getElementById("input_product_note")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    ///////////////////////////////////////////////
    const handle_product_error = function (msg) {
        toastr.error(msg)
    }
    
    const _default_detail = function () {
        return {
            id: null,
            category_id: null,
            pricing_strategy_types_id: null,
            status_types_id: null,
            product_status_types_id: null,
            currency_id: null,
            location_id: null,
            city_id: null,
            vendor_id: null,
            provider_id: null,
            name: null,
            provider_vendor_match: 1,
            description_short: null,
            description_long: null,
            rating: null,
            sku: null,
            phone: null,
            infant: null,
            child: null,
            teen: null,
            depart_from: null,
            arrive_to: null,
            depart_time: null,
            arrive_time: null,
            day_span: null,
            cover_image: null,
            api_id: null,
            from_api: 1,
            hotel_code: null,
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
    
    const set = function (product) {
        let detail = _default_detail()
        if (product) {
            detail.id = (product.id) ? product.id : null
            detail.category_id = (product.category_id) ? product.category_id : null
            detail.pricing_strategy_types_id = (product.pricing_strategy_types_id) ? product.pricing_strategy_types_id : null
            detail.status_types_id = (product.status_types_id) ? product.status_types_id : null
            detail.product_status_types_id = (product.product_status_types_id) ? product.product_status_types_id : null
            detail.currency_id = (product.currency_id) ? product.currency_id : null
            detail.location_id = (product.location_id) ? product.location_id : null
            detail.city_id = (product.city_id) ? product.city_id : null
            detail.vendor_id = (product.vendor_id) ? product.vendor_id : null
            detail.provider_id = (product.provider_id) ? product.provider_id : null
            detail.name = (product.name) ? product.name : null
            detail.provider_vendor_match = (product.provider_vendor_match) ? product.provider_vendor_match : 1
            detail.description_short = (product.description_short) ? product.description_short : null
            detail.description_long = (product.description_long) ? product.description_long : null
            detail.rating = (product.rating) ? product.rating : null
            detail.sku = (product.sku) ? product.sku : null
            detail.phone = (product.phone) ? product.phone : null
            detail.infant = (product.infant) ? product.infant : null
            detail.child = (product.child) ? product.child : null
            detail.teen = (product.teen) ? product.teen : null
            detail.depart_from = (product.depart_from) ? product.depart_from : null
            detail.arrive_to = (product.arrive_to) ? product.arrive_to : null
            detail.depart_time = (product.depart_time) ? product.depart_time : null
            detail.arrive_time = (product.arrive_time) ? product.arrive_time : null
            detail.day_span = (product.day_span) ? product.day_span : null
            detail.cover_image = (product.cover_image) ? product.cover_image : null
            detail.api_id = (product.api_id) ? product.api_id : null
            detail.from_api = (product.from_api) ? product.from_api : 1
            detail.hotel_code = (product.hotel_code) ? product.hotel_code : null
            detail.enabled = (product.enabled) ? product.enabled : 1
            detail.date_created = (product.date_created) ? product.date_created : formatDateMySQL()
            detail.created_by = (product.created_by) ? product.created_by : created_by
            detail.date_modified = (product.date_modified) ? product.date_modified : formatDateMySQL()
            detail.modified_by = (product.modified_by) ? product.modified_by : modified_by
            detail.note = (product.note) ? product.note : null
        }
        
        Product.detail = detail
        return detail
    }
    
    const init = function (settings) {
        console.log("-- Product --", {})
    }
    
    const load_all = function (products) {
        Product.all = new Map()
        
        if (!products) {
            return
        }
        $.each(products, function (i, product) {
            let detail = set(product)
            Product.all.set("id", detail)
        })
        
        console.log(" Product.all", Product.all)
    }
    ///////////////////////////////////////////////
    return {
        validator: null,
        detail: {},
        all: new Map(),
        get: function (params) {
            get(params)
        },
        load_all: function (params) {
            load_all(params)
        },
        save: function (params) {
            save(params)
        },
        init: function (settings) {
            init(settings)
        },
    }
    
})()

Product.init()
//end object

$(document).ready(function () {
    const but_toggle = document.querySelectorAll(".but_toggle")
    
    window.addEventListener("resize", debounce(function (e) {
        resize_elements("end of resizing")
    }))
    but_toggle.forEach(el => el.addEventListener("click", event => {
        if (el.dataset.texted) {
            let editorId = el.dataset.texted
            let editor = $("#" + editorId)
            if (tinyMCE.get(editorId)) {
                editor.val(htmlDecode(editor.val()))
                tinymce.remove("#" + editorId)
            } else {
                editor.val(htmlDecode(editor.val()))
                addTinyMCE(editorId)
            }
        }
    }))
    
    if (mdbPreloader) {
        $("#mdb-preloader").fadeOut(500)
    }
    
    $("#alert_box").hide()
    
    new WOW().init()
    
    $(this).scrollTop(0)
    
    toastr.options = toastrOptions
    
    $("body").scrollTop()
    
    $.fn.dataTableExt.afnFiltering.push(
      function (oSettings, aData, iDataIndex) {
          if (oSettings.nTable.id === "dates_table") {
              var iFini = document.getElementById("min").value
              var iFfin = document.getElementById("max").value
              var iStartDateCol = 1
              var iEndDateCol = 1
              
              iFini = iFini.substring(6, 10) + iFini.substring(3, 5) + iFini.substring(0, 2)
              iFfin = iFfin.substring(6, 10) + iFfin.substring(3, 5) + iFfin.substring(0, 2)
              
              var datofini = aData[iStartDateCol].substring(6, 10) + aData[iStartDateCol].substring(3, 5) + aData[iStartDateCol].substring(0, 2)
              var datoffin = aData[iEndDateCol].substring(6, 10) + aData[iEndDateCol].substring(3, 5) + aData[iEndDateCol].substring(0, 2)
              
              if (iFini === "" && iFfin === "") {
                  return true
              } else if (iFini <= datofini && iFfin === "") {
                  return true
              } else if (iFfin >= datoffin && iFini === "") {
                  return true
              } else if (iFini <= datofini && iFfin >= datoffin) {
                  return true
              }
              return false
          } else {
              return true
          }
      },
    )
    
    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual"
    }
    
    $(".button-collapse").sideNav(sideNavOptions)
    
    window.scrollTo(0, 0)
    
    resize_elements()
    
})
