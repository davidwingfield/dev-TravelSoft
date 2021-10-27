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
    textColor: "#fff",
})
const tableCellMaxChars = 10
const default_address_view = "medium"
let DEBUGMODE = true

let mdbPreloader = document.getElementById("mdb-preloader")

$.fn.BuildDropDown = function (settings) {
    if (!settings || !settings.text_field || !settings.id_field) {
        return
    }
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
    ///////////////////////////////////////////////
    const _table = document.getElementById(table_id)
    if ($.fn.DataTable.isDataTable("#" + table_id)) {
        return
    }
    ///////////////////////////////////////////////
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
    
    ///////////////////////////////////////////////
    
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
            
        } catch (e) {
            console.log(e)
        }
        
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

const LocationTypes = (function () {
    "use strict"
    
    const base_url = "/location_types"
    const _input_location_types_id = document.getElementById("input_location_types_id")
    const _input_location_types_name = document.getElementById("input_location_types_name")
    const _input_location_types_icon = document.getElementById("input_location_types_icon")
    const _input_location_types_sort_order = document.getElementById("input_location_types_sort_order")
    const _input_location_types_enabled = document.getElementById("input_location_types_enabled")
    const _input_location_types_date_created = document.getElementById("input_location_types_date_created")
    const _input_location_types_created_by = document.getElementById("input_location_types_created_by")
    const _input_location_types_date_modified = document.getElementById("input_location_types_date_modified")
    const _input_location_types_modified_by = document.getElementById("input_location_types_modified_by")
    const _input_location_types_note = document.getElementById("input_location_types_note")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
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
        console.log(" -- LocationTypes -- ", {})
    }
    
    const set = function (location_types) {
        let detail = _default_detail()
        if (location_types) {
            detail.id = (location_types.id) ? location_types.id : null
            detail.name = (location_types.name) ? location_types.name : null
            detail.icon = (location_types.icon) ? location_types.icon : null
            detail.sort_order = (location_types.sort_order) ? location_types.sort_order : null
            detail.enabled = (location_types.enabled) ? location_types.enabled : 1
            detail.date_created = (location_types.date_created) ? location_types.date_created : formatDateMySQL()
            detail.created_by = (location_types.created_by) ? location_types.created_by : created_by
            detail.date_modified = (location_types.date_modified) ? location_types.date_modified : formatDateMySQL()
            detail.modified_by = (location_types.modified_by) ? location_types.modified_by : modified_by
            detail.note = (location_types.note) ? location_types.note : null
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
            LocationTypes.all.set("id", detail)
        })
        
        //console.log(" LocationTypes.all", LocationTypes.all)
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

LocationTypes.init()
//end object

const Location = (function () {
    "use strict"
    
    const _form_edit_location = document.getElementById("form_edit_location")
    const _form_location_details = document.getElementById("form_location_details")
    const _location_types_id = document.getElementById("location_types_id")
    const _location_name_filter = document.getElementById("location_name_filter")
    const _location_city_id = document.getElementById("location_city_id")
    const _location_country_id = document.getElementById("location_country_id")
    const _location_province_id = document.getElementById("location_province_id")
    const _location_id = document.getElementById("location_id")
    const _location_street_1 = document.getElementById("location_street_1")
    const _location_street_2 = document.getElementById("location_street_2")
    const _location_zipcode = document.getElementById("location_zipcode")
    const _location_name = document.getElementById("location_name")
    const _location_enabled = document.getElementById("location_enabled")
    const _temp_location_id = document.getElementById("temp_location_id")
    const _button_clear_form_edit_location = document.getElementById("button_clear_form_edit_location")
    const _button_close_location_edit = document.getElementById("button_close_location_edit")
    const _button_submit_form_edit_location = document.getElementById("button_submit_form_edit_location")
    const _button_edit_location = document.getElementById("button_edit_location")
    const _button_add_location_edit = document.getElementById("button_add_location_edit")
    const _button_close_edit_location_form = document.getElementById("button_close_edit_location_form")
    const form_rules = {
        rules: {
            location_types_id: {
                required: true,
                digits: true,
            },
            location_city_id: {
                required: true,
                digits: true,
            },
            location_country_id: {
                required: true,
                digits: true,
            },
            location_province_id: {
                required: true,
                digits: true,
            },
            location_name: { required: true },
        },
        messages: {
            location_types_id: {
                required: "field required",
                digits: "invalid",
            },
            location_city_id: {
                required: "field required",
                digits: "invalid",
            },
            location_country_id: {
                required: "field required",
                digits: "invalid",
            },
            location_province_id: {
                required: "field required",
                digits: "invalid",
            },
            location_id: {
                required: "field required",
                digits: "invalid",
            },
            location_name: { required: "field required" },
        },
    }
    // ----
    let temp_location = {}
    let new_filter = false
    let validator
    let validated = false
    let default_display = default_address_view
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    // ----
    const _default_detail = function () {
        return {
            id: null,
            display_long: null,
            display_medium: null,
            display_short: null,
            location_types_id: null,
            name: null,
            street_1: null,
            street_2: null,
            zipcode: null,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            note: null,
            city: {
                id: null,
                name: null,
                sort_order: 999,
                enabled: 1,
                date_created: formatDateMySQL(),
                created_by: user_id,
                date_modified: formatDateMySQL(),
                modified_by: user_id,
                note: null,
            },
            province: {
                created_by: user_id,
                date_created: formatDateMySQL(),
                date_modified: formatDateMySQL(),
                enabled: 1,
                id: null,
                iso2: null,
                iso3: null,
                modified_by: user_id,
                name: null,
                name_long: null,
                note: null,
                sort_order: 999,
            },
            country: {
                created_by: user_id,
                date_created: formatDateMySQL(),
                date_modified: formatDateMySQL(),
                currency_id: null,
                enabled: 1,
                id: null,
                iso2: null,
                iso3: null,
                modified_by: user_id,
                name: null,
                name_long: null,
                note: null,
                sort_order: 999,
            },
            type: {
                created_by: user_id,
                date_created: formatDateMySQL(),
                date_modified: formatDateMySQL(),
                enabled: 1,
                icon: null,
                id: null,
                modified_by: user_id,
                name: null,
                note: null,
                sort_order: 999,
            },
        }
    }
    
    const handle_location_error = function (msg) {
        toastr.error(msg)
    }
    // ----
    $(_button_close_edit_location_form)
      .on("click", function () {
          populate_form(temp_location)
          
          switch (defaultLocationDisplayFormat) {
              case "short":
                  _location_name_filter.value = temp_location.display_short
                  break
              case "medium":
                  _location_name_filter.value = temp_location.display_medium
                  break
              default:
                  _location_name_filter.value = temp_location.display_long
          }
          _location_id.value = temp_location.id
          
          hide_form()
      })
    
    $(_button_clear_form_edit_location)
      .on("click", function () {
      
      })
    
    $(_button_submit_form_edit_location)
      .on("click", function () {
          save()
      })
    
    $(_location_name_filter)
      .on("click", function () {
          $(this).select()
      })
      .on("change", function () {
          if ($(this).val() === "") {
              //set_detail()
              //reset_form()
              //populate_form()
          }
      })
      .on("search", function () {
          new_filter = true
          set_detail()
          reset_form()
          populate_form()
      })
    $(_button_edit_location)
      .on("click", function () {
          if (_location_id.value === "") {
              //set_detail()
              //reset_form()
              //populate_form()
          } else {
          
          }
          
          show_form()
      })
    $("input[name='location_display']")
      .on("change", function () {
          let selected_value = $("input[name='location_display']:checked").val()
          default_display = selected_value
          init_autocomplete()
          if (Location.detail["display_" + selected_value] !== null) {
              _location_name_filter.value = Location.detail["display_" + selected_value]
          }
      })
    
    const init_autocomplete = function () {
        $(_location_name_filter)
          .autocomplete({
              serviceUrl: "/api/v1.0/autocomplete/locations",
              minChars: 2,
              cache: false,
              dataType: "json",
              triggerSelectOnValidInput: false,
              paramName: "st",
              params: { "default_display": default_display },
              onSelect: function (suggestion) {
                  //Province.set_detail(suggestion.data)
                  //Country.set_detail(suggestion.data)
                  //City.set_detail(suggestion.data)
                  //Location.set_detail(suggestion.data)
                  //populate_form(suggestion.data)
                  if (_form_edit_location) {
                      clear_validation(_form_edit_location)
                  }
              },
              onSearchComplete: function (query, suggestions) {
              },
          })
    }
    
    const init = function (location) {
        validator_init(form_rules)
        
        if (location) {
            set_detail(location)
        }
        
        if (_form_edit_location) {
            
            validator = $(_form_edit_location).validate()
            
            $(_location_types_id).BuildDropDown({
                data: Array.from(Types.location_types.values()),
                title: "Location Types",
                id_field: "id",
                text_field: "name",
                first_selectable: false,
            })
            
            $(_location_country_id).BuildDropDown({
                data: Array.from(Country.all.values()),
                title: "Country",
                id_field: "id",
                text_field: "name",
                first_selectable: false,
            })
            
            $(_location_province_id).BuildDropDown({
                data: Array.from(Province.all.values()),
                title: "Province",
                id_field: "id",
                text_field: "name",
                first_selectable: false,
            })
            
            $(_location_city_id).BuildDropDown({
                data: Array.from(Province.all.values()),
                title: "City",
                id_field: "id",
                text_field: "name",
                first_selectable: false,
            })
            
            Country.init({
                dropdowns: [
                    "location_country_id",
                ],
            })
            Province.init({
                dropdowns: [
                    "location_province_id",
                ],
            })
            City.init({
                dropdowns: [
                    "location_city_id",
                ],
            })
            
        }
        
        init_autocomplete()
        //set(location)
        hide_form()
    }
    
    const set_detail = function (location) {
        log("location", location)
        let detail = _default_detail()
        temp_location = detail
        
        if (location) {
            
            detail.city = {
                created_by: (location.city.created_by) ? location.city.created_by : user_id,
                date_created: (location.city.date_created) ? location.city.date_created : formatDateMySQL(),
                date_modified: (location.city.date_modified) ? location.city.date_modified : formatDateMySQL(),
                enabled: (location.city.enabled) ? location.city.enabled : 1,
                id: (location.city.id) ? location.city.id : null,
                modified_by: (location.city.modified_by) ? location.city.modified_by : user_id,
                name: (location.city.name) ? location.city.name : null,
                note: (location.city.note) ? location.city.note : null,
                sort_order: (location.city.sort_order) ? location.city.sort_order : 999,
            }
            
            detail.province = {
                created_by: (location.province.created_by) ? location.province.created_by : user_id,
                date_created: (location.province.date_created) ? location.province.date_created : formatDateMySQL(),
                date_modified: (location.province.date_modified) ? location.province.date_modified : formatDateMySQL(),
                enabled: (location.province.enabled) ? location.province.enabled : 1,
                id: (location.province.id) ? location.province.id : null,
                iso2: (location.province.iso2) ? location.province.iso2 : null,
                iso3: (location.province.iso3) ? location.province.iso3 : null,
                modified_by: (location.province.modified_by) ? location.province.modified_by : user_id,
                name: (location.province.name) ? location.province.name : null,
                name_long: (location.province.name_long) ? location.province.name_long : null,
                note: (location.province.note) ? location.province.note : null,
                sort_order: (location.province.sort_order) ? location.province.sort_order : 999,
            }
            
            detail.country = {
                created_by: (location.country.created_by) ? location.country.created_by : user_id,
                date_created: (location.country.date_created) ? location.country.date_created : formatDateMySQL(),
                date_modified: (location.country.date_modified) ? location.country.date_modified : formatDateMySQL(),
                currency_id: (location.country.currency_id) ? location.country.currency_id : null,
                enabled: (location.country.enabled) ? location.country.enabled : 1,
                id: (location.country.id) ? location.country.id : null,
                iso2: (location.country.iso2) ? location.country.iso2 : null,
                iso3: (location.country.iso3) ? location.country.iso3 : null,
                modified_by: (location.country.modified_by) ? location.country.modified_by : user_id,
                name: (location.country.name) ? location.country.name : null,
                name_long: (location.country.name_long) ? location.country.name_long : null,
                note: (location.country.note) ? location.country.note : null,
                sort_order: (location.country.sort_order) ? location.country.sort_order : 999,
            }
            
            detail.type = {
                created_by: (location.type.created_by) ? location.type.created_by : user_id,
                date_created: (location.type.date_created) ? location.type.date_created : formatDateMySQL(),
                date_modified: (location.type.date_modified) ? location.type.date_modified : formatDateMySQL(),
                enabled: (location.type.enabled) ? location.type.enabled : 1,
                icon: (location.type.icon) ? location.type.icon : null,
                id: (location.type.id) ? location.type.id : null,
                modified_by: (location.type.modified_by) ? location.type.modified_by : user_id,
                name: (location.type.name) ? location.type.name : null,
                note: (location.type.note) ? location.type.note : null,
                sort_order: (location.type.sort_order) ? location.type.sort_order : 999,
            }
            
            detail.id = (location.id) ? location.id : null
            detail.name = (location.name) ? location.name : null
            detail.street_1 = (location.street_1) ? location.street_1 : null
            detail.street_2 = (location.street_2) ? location.street_2 : null
            detail.zipcode = (location.zipcode) ? location.zipcode : null
            detail.display_long = (location.display_long) ? location.display_long : null
            detail.display_medium = (location.display_medium) ? location.display_medium : null
            detail.display_short = (location.display_short) ? location.display_short : null
            detail.enabled = (location.enabled) ? location.enabled : 1
            detail.date_created = (location.date_created) ? location.date_created : formatDateMySQL()
            detail.created_by = (location.created_by) ? location.created_by : user_id
            detail.date_modified = (location.date_modified) ? location.date_modified : formatDateMySQL()
            detail.modified_by = (location.modified_by) ? location.modified_by : user_id
            detail.note = (location.note) ? location.note : null
            
            Province.set_detail(detail.province)
            Country.set_detail(detail.country)
            City.set_detail(detail.city)
        }
        
        Location.detail = detail
        return detail
    }
    
    const set = function (location) {
        let detail = set_detail(location)
        reset_form()
        populate_form(detail)
    }
    
    const save = function (params) {
        validated = true
        
        let dataToSend = {
            id: (!isNaN(parseInt(_location_id.value))) ? parseInt(_location_id.value) : null,
            city_id: (!isNaN(parseInt(_location_city_id.value))) ? parseInt(_location_city_id.value) : null,
            province_id: (!isNaN(parseInt(_location_province_id.value))) ? parseInt(_location_province_id.value) : null,
            country_id: (!isNaN(parseInt(_location_province_id.value))) ? parseInt(_location_country_id.value) : null,
            location_types_id: (!isNaN(parseInt(_location_types_id.value))) ? parseInt(_location_types_id.value) : null,
            
            name: (_location_name && _location_name.value !== "") ? _location_name.value : null,
            street: (_location_street && _location_street.value !== "") ? _location_street.value : null,
            street2: (_location_street2 && _location_street2.value !== "") ? _location_street2.value : null,
            zipcode: (_location_zipcode && _location_zipcode.value !== "") ? _location_zipcode.value : null,
            
            created_by: (isNaN(parseInt(_location_id.value))) ? user_id : null,
            modified_by: user_id,
            enabled: 1,
            date_created: (!isNaN(parseInt(_location_id.value))) ? null : formatDateMySQL(),
            date_modified: (!isNaN(parseInt(_location_id.value))) ? formatDateMySQL() : null,
            note: null,
        }
        
        console.log("save", dataToSend)
    }
    
    const get = function (id) {
        let data_to_send = {}
        if (id) {
            data_to_send.id = id
        }
        
    }
    
    const disable = function () {
        let location_displays = document.getElementsByName("location_display")
        $.each(location_displays, function (i, elem) {
            elem.disabled = true
        })
        _location_name_filter.disabled = true
        _button_edit_location.disabled = true
    }
    
    const enable = function () {
        let location_displays = document.getElementsByName("location_display")
        $.each(location_displays, function (i, elem) {
            elem.disabled = false
        })
        _location_name_filter.disabled = false
        _button_edit_location.disabled = false
    }
    
    const show_form = function () {
        disable()
        $(_form_location_details).show()
    }
    
    const hide_form = function () {
        enable()
        $(_form_location_details).hide()
    }
    
    const reset_form = function () {
        //validated = false
        //validator.resetForm()
        _location_name.value = ""
        _location_name_filter.value = ""
        _location_id.value = ""
        _location_types_id.value = ""
        _location_street_1.value = ""
        _location_street_2.value = ""
        _location_zipcode.value = ""
        _location_country_id.value = ""
        _location_province_id.value = ""
        _location_city_id.value = ""
        
        Province.set_detail()
        Country.set_detail()
        City.set_detail()
        Province.id = null
        City.id = null
        
        switch (defaultLocationDisplayFormat) {
            case "short":
                document.getElementById("location_display_short").checked = true
                break
            case "medium":
                document.getElementById("location_display_medium").checked = true
                break
            default:
                document.getElementById("location_display_long").checked = true
        }
        
        $(_location_country_id).val("").trigger("change")
    }
    
    const populate_form = function (location) {
        if (location) {
            //console.log("Location.country", location.country)
            //console.log("Location.province", location.province)
            //console.log("Location.city", location.city)
            ///////////////////////////////////////////////////
            Country.set_detail(location.country)
            Province.set_detail(location.province)
            City.set_detail(location.city)
            
            Country.id = location.country.id
            City.id = location.city.id
            Province.id = location.province.id
            
            switch (defaultLocationDisplayFormat) {
                case "short":
                    _location_name_filter.value = location.display_short
                    break
                case "medium":
                    _location_name_filter.value = location.display_medium
                    break
                default:
                    _location_name_filter.value = location.display_long
            }
            
            $(_location_country_id).val(location.country.id).trigger("change")
            
            _location_enabled.checked = (location.enabled === 1)
            _location_name.value = location.name
            _location_id.value = location.id
            _location_street_1.value = location.street_1
            _location_street_2.value = location.street_2
            _location_zipcode.value = location.zipcode
            _location_types_id.value = location.type.id
            
        }
        
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        types: new Map(),
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
        populate_form: function (location) {
            populate_form(location)
        },
    }
    
})()


const City = (function () {
    "use strict"
    
    const class_name = "form-new-city"
    const form_id = "form_new_city"
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const form_rules = {
        rules: {
            city_name: "required",
        },
        messages: {
            address_types_list: "City Name is Required",
        },
    }
    
    const handle_city_error = function (msg) {
        toastr.error(msg)
        console.log(msg)
    }
    
    const on_click_outside = (e) => {
        let tar = $(e.target).parents("form." + class_name)
        if (!tar[0] && !e.target.className.includes("select-add-option")) {
            City.close()
        }
    }
    
    const build_drop_downs = function (settings) {
        if (settings) {
            if (settings.dropdowns) {
                
                $.each(settings.dropdowns, function (i, dropdown_id) {
                    
                    let element = document.getElementById(dropdown_id)
                    
                    if (element) {
                        
                        $(element)
                          .select2({
                              
                              "language": {
                                  "searching": function () {
                                  },
                              },
                              "escapeMarkup": function (markup) {
                                  return markup
                              },
                              
                          })
                          .on("select2:open", function (e) {
                              let x = document.querySelectorAll("[aria-controls='select2-" + dropdown_id + "-results']")
                              if (x[0]) {
                                  let _filterCitySearch = x[0]
                                  $(_filterCitySearch).attr("id", "" + dropdown_id + "_search")
                                  if (!document.getElementById("filter_city_add_icon")) {
                                      let i = document.createElement("i")
                                      i.classList = "select-add-option fas fa-plus filter_city_add"
                                      i.id = "filter_city_add_icon"
                                      i.addEventListener("click", event => {
                                          let val = _filterCitySearch.value
                                          $(element).select2("close")
                                          City.add(this, val, dropdown_id)
                                      })
                                      _filterCitySearch.after(i)
                                  }
                                  $(".filter_city_add").hide()
                                  if (_filterCitySearch) {
                                      
                                      _filterCitySearch.addEventListener("keyup", event => {
                                          if (_filterCitySearch.value !== "") {
                                              $(".filter_city_add").show()
                                          } else {
                                              $(".filter_city_add").hide()
                                          }
                                          
                                      })
                                      
                                  }
                              }
                              
                          })
                          .on("change", function () {
                              let id = $(this)
                                .attr("id")
                                .replace("city", "city")
                              
                              //let city_element = document.getElementById(id)
                              
                              if (!isNaN(parseInt($(this).val()))) {
                                  //City.id = $(this).val()
                                  //if (city_element) {
                                  //City.get(parseInt($(this).val()), city_element)
                                  //}
                              }
                              
                          })
                        
                    }
                    
                })
                
            }
        }
    }
    
    const fetch_city_list = function (dataToSend, callback) {
        if (dataToSend) {
            try {
                sendGetRequest("/api/v1.0/cities", dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handle_city_error("Oops: 1")
                    }
                })
            } catch (e) {
                console.log(e)
                return handle_city_error("Error Validating City")
            }
        } else {
            return handle_city_error("Error Loading Province- Missing Data")
        }
    }
    
    const update_city_record = function ($this, dataToSend) {
        if (dataToSend) {
            try {
                sendPostRequest("/api/v1.0/cities/update", dataToSend, function (data, status, xhr) {
                    if (data && data[0]) {
                        City.all.set(data[0].city_id, data[0])
                        let city_elements = $("select[data-type='city']")
                        //console.log(city_elements.length)
                        City.id = data[0].city_id
                        city_elements.each(function (index, element) {
                            var newOption = new Option(data[0].city_name, data[0].city_id, false, false)
                            $(element).append(newOption).trigger("change")
                            
                        })
                        $($this).val(data[0].city_id).trigger("change")
                        City.close()
                        toastr.success("City: " + data[0].city_id + " updated")
                        
                    } else {
                        return handle_city_error("Error: 1")
                    }
                })
            } catch (e) {
                console.log(e)
                handle_city_error("Error: Validating City")
            }
        } else {
            console.log("Error: Missing Data")
            handle_city_error("Error: Missing Data")
        }
    }
    
    const destroy_form = function () {
        let elem = document.getElementById(form_id)
        if (elem) {
            elem.parentNode.removeChild(elem)
            window.removeEventListener("click", on_click_outside)
        }
    }
    
    const build_form = function (elem, val, dropdown_id) {
        let id = $(elem).attr("id")
        let parent = $(elem).parents("div.row")
        let value = ""
        
        if (val) {
            value = val
        }
        
        if (!id || !parent[0]) {
            return
        }
        
        if (document.getElementById(form_id)) {
            return
        }
        
        let new_city_form = document.createElement("div")
        
        let heading1 = document.createElement("h5")
        
        let row1 = document.createElement("div")
        let row2 = document.createElement("div")
        
        let col1 = document.createElement("div")
        let col2 = document.createElement("div")
        let col3 = document.createElement("div")
        let col4 = document.createElement("div")
        
        let col5 = document.createElement("div")
        
        let form_element1 = document.createElement("div")
        let form_element2 = document.createElement("div")
        let form_element3 = document.createElement("div")
        let form_element4 = document.createElement("div")
        
        let error_element1 = document.createElement("div")
        
        let name_text_element = document.createElement("input")
        let name_label_element = document.createElement("label")
        
        let save_button = document.createElement("button")
        let cancel_button = document.createElement("button")
        
        heading1.classList = "card-title"
        heading1.innerText = "City Details"
        
        new_city_form.id = form_id
        new_city_form.classList = ["card card-body m-3 " + class_name]
        
        name_text_element.id = "city_name"
        name_text_element.name = "city_name"
        name_text_element.type = "text"
        name_text_element.classList = ["form-control "]
        name_label_element.htmlFor = "city_name"
        name_label_element.innerHTML = "Name:"
        error_element1.id = "city_name-error"
        
        save_button.classList = ["btn btn-primary btn-sm waves-effect waves-light"]
        save_button.innerText = "save"
        save_button.type = "button"
        
        save_button.addEventListener("click", event => {
            City.save(elem, dropdown_id)
        })
        
        cancel_button.classList = ["btn btn-outline-danger btn-sm waves-effect waves-light"]
        cancel_button.innerText = "cancel"
        cancel_button.type = "button"
        
        cancel_button.addEventListener("click", event => {
            City.close()
        })
        
        row1.classList = ["row"]
        row2.classList = ["row"]
        
        col1.classList = ["col-lg-3 mb-1"]
        col2.classList = ["col-lg-3 mb-1"]
        col3.classList = ["col-lg-3 mb-1"]
        col4.classList = ["col-lg-3 mb-1"]
        
        col5.classList = ["col-12 mb-1 text-right"]
        
        form_element1.classList = ["form-element"]
        form_element2.classList = ["form-element"]
        form_element3.classList = ["form-element"]
        form_element4.classList = ["form-element"]
        
        error_element1.classList = ["error w-100 text-center"]
        
        form_element1.appendChild(name_label_element)
        form_element1.appendChild(name_text_element)
        form_element1.appendChild(error_element1)
        
        col1.appendChild(form_element1)
        
        row1.appendChild(col1)
        row1.appendChild(col2)
        row1.appendChild(col3)
        row1.appendChild(col4)
        
        col5.append(cancel_button)
        col5.appendChild(save_button)
        
        row2.appendChild(col5)
        
        new_city_form.appendChild(heading1)
        new_city_form.appendChild(row1)
        new_city_form.appendChild(row2)
        
        parent[0].appendChild(new_city_form)
        
        name_text_element.value = value
        name_text_element.focus({ preventScroll: false })
        
        window.addEventListener("click", on_click_outside)
    }
    
    const clear_detail = function () {
        
        return {
            id: null,
            province_id: null,
            country_id: null,
            created_by: null,
            modified_by: null,
            sort_order: null,
            name: null,
            enabled: 1,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
            note: null,
        }
        
    }
    
    const set_detail = function (city) {
        let detail = clear_detail()
        let id = null
        if (city) {
            id = validInt(city.id)
            detail = {
                id: validInt(city.id),
                province_id: validInt(city.province_id),
                created_by: (city.created_by) ? city.created_by : user_id,
                modified_by: (city.created_by) ? city.created_by : user_id,
                sort_order: (city.sort_order) ? city.sort_order : null,
                name: (city.name) ? city.name : null,
                enabled: (city.enabled) ? city.enabled : 1,
                date_created: (city.date_created) ? city.date_created : formatDateMySQL(),
                date_modified: (city.date_modified) ? city.date_modified : formatDateMySQL(),
                note: (city.note) ? city.note : null,
            }
            
        }
        
        //City.id = id
        City.detail = detail
        return detail
    }
    
    const get = function (country_id, province_id, el) {
        City.all = new Map()
        let city_id = null
        if (City.id !== null) {
            city_id = City.id
        }
        if (!el) {
            return
        }
        
        if (!country_id || !province_id || !el) {
            
            $(el).BuildDropDown({
                data: Array.from(City.all.values()),
                title: "City",
                id_field: "id",
                text_field: "name",
                first_selectable: false,
            })
            
            $(el).val("").trigger("change")
            return
        }
        
        let dataToSend = {
            country_id: parseInt(country_id),
            province_id: parseInt(province_id),
        }
        
        fetch_city_list(dataToSend, function (cities) {
            if (cities) {
                load_all(cities)
                
                $(el).BuildDropDown({
                    data: Array.from(City.all.values()),
                    title: "City",
                    id_field: "id",
                    text_field: "name",
                    first_selectable: false,
                })
                
                if (city_id !== "" && city_id !== null) {
                    //console.log($(el).attr("id"))
                    //console.log("city_id", city_id)
                    $(el).val(city_id).trigger("change")
                }
            }
        })
        
    }
    
    const add = function (elem, val, dropdown_id) {
        if (!elem) {
            return
        }
        
        build_form(elem, val, dropdown_id)
    }
    
    const save = function ($this, dropdown_id) {
        let city_detail = {}
        let _name = document.getElementById("city_name")
        let _province_id = document.getElementById(dropdown_id.replace(/city_id/g, "") + "province_id")
        let _country_id = document.getElementById(dropdown_id.replace(/city_id/g, "") + "country_id")
        if (!isNaN(parseInt(_country_id.value)) && !isNaN(parseInt(_province_id.value))) {
            if (_name, _province_id, _country_id) {
                city_detail.name = _name.value
                city_detail.country_id = parseInt(_country_id.value)
                city_detail.province_id = parseInt(_province_id.value)
                
                let r = confirm("Are you sure you want to edit this record?")
                if (r === true) {
                    update_city_record($this, remove_nulls(city_detail))
                }
            }
        }
    }
    
    const load_all = function (cities) {
        City.all = new Map()
        
        if (cities) {
            $.each(cities, function (k, city) {
                let detail = set_detail(city)
                City.all.set(detail.id, detail)
            })
        }
    }
    
    const init = function (settings) {
        build_drop_downs(settings)
    }
    
    return {
        id: null,
        detail: {
            id: null,
            province_id: null,
            country_id: null,
            created_by: null,
            modified_by: null,
            sort_order: null,
            name: null,
            enabled: null,
            date_created: null,
            date_modified: null,
            note: null,
        },
        all: [],
        close: function () {
            destroy_form()
        },
        save: function ($this, dropdown_id) {
            save($this, dropdown_id)
        },
        get: function (country_id, province_id, el) {
            get(country_id, province_id, el)
        },
        add: function (elem, val, dropdown_id) {
            add(elem, val, dropdown_id)
        },
        set_detail: function (city) {
            set_detail(city)
        },
        init: function (settings) {
            init(settings)
        },
    }
    
})()

const Province = (function () {
    "use strict"
    
    const class_name = "form-new-province"
    const form_id = "form_new_province"
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const form_rules = {
        rules: {
            province_name: {
                required: true,
                //minlength: 3,
            },
            province_iso2: {
                //required: true,
                minlength: 2,
                maxlength: 2,
            },
            province_iso3: {
                //required: true,
                minlength: 1,
                maxlength: 2,
            },
        },
        messages: {
            province_name: {
                required: "required",
                //minlength: "too short",
            },
            province_iso2: {
                //required: "required",
                minlength: "too short",
                maxlength: "too long",
            },
            province_iso3: {
                //required: "required",
                minlength: "too short",
                maxlength: "too long",
            },
        },
    }
    
    const validate_form = function () {
        let _name = document.getElementById("province_name")
        let _province_iso2 = document.getElementById("province_iso2")
        let _province_iso3 = document.getElementById("province_iso3")
        let valid = true
        // ----
        if (!_name || !_province_iso2 || !_province_iso3) {
            handle_province_error("Error Processing Data")
            return false
        }
        
        if (_name.value === "") {
            $(_name).addClass("is-invalid")
            $("#province_name-error")
              .text("Required: Field is required")
              .show()
            valid = false
        } else {
            $(_name).removeClass("is-invalid")
            $("#province_name-error")
              .text("")
              .hide()
        }
        
        if (_province_iso2.value === "") {
            $(_province_iso2).addClass("is-invalid")
            $("#province_iso2-error")
              .text("Required: Field is required")
              .show()
            valid = false
        } else {
            $(_province_iso2).removeClass("is-invalid")
            $("#province_iso2-error")
              .text("")
              .hide()
        }
        
        if (_province_iso3.value === "") {
            $(_province_iso3).addClass("is-invalid")
            $("#province_iso3-error")
              .text("Required: Field is required")
              .show()
            valid = false
        } else {
            $(_province_iso3).removeClass("is-invalid")
            $("#province_iso3-error")
              .text("")
              .hide()
        }
        
        return valid
    }
    
    const handle_province_error = function (msg) {
        toastr.error(msg)
        console.log(msg)
    }
    
    const on_click_outside = (e) => {
        let tar = $(e.target).parents("form." + class_name)
        if (!tar[0] && !e.target.className.includes("select-add-option")) {
            Province.close()
        }
    }
    
    const build_drop_downs = function (settings) {
        if (settings) {
            if (settings.dropdowns) {
                
                $.each(settings.dropdowns, function (i, dropdown_id) {
                    let country_id = Country.id
                    let province_id = Province.id
                    let element = document.getElementById(dropdown_id)
                    if (element) {
                        
                        $(element)
                          .select2({
                              "language": {
                                  "searching": function () {
                                  },
                              },
                              "escapeMarkup": function (markup) {
                                  return markup
                              },
                          })
                          .on("select2:open", function (e) {
                              let x = document.querySelectorAll("[aria-controls='select2-" + dropdown_id + "-results']")
                              if (x[0]) {
                                  let _filterProvinceSearch = x[0]
                                  $(_filterProvinceSearch).attr("id", "" + dropdown_id + "_search")
                                  if (!document.getElementById("filter_province_add_icon")) {
                                      let i = document.createElement("i")
                                      i.classList = "select-add-option fas fa-plus filter_province_add"
                                      i.id = "filter_province_add_icon"
                                      i.addEventListener("click", event => {
                                          let val = _filterProvinceSearch.value
                                          $(element).select2("close")
                                          Province.add(this, val, dropdown_id)
                                      })
                                      _filterProvinceSearch.after(i)
                                  }
                                  $(".filter_province_add").hide()
                                  if (_filterProvinceSearch) {
                                      _filterProvinceSearch.addEventListener("keyup", event => {
                                          if (_filterProvinceSearch.value !== "") {
                                              $(".filter_province_add").show()
                                          } else {
                                              $(".filter_province_add").hide()
                                          }
                                      })
                                  }
                              }
                              
                          })
                          .on("change", function () {
                              console.log(" -- Province.change -- ", Province.id)
                              let city_el_id = $(this)
                                .attr("id")
                                .replace("province", "city")
                              
                              let country_el_id = $(this)
                                .attr("id")
                                .replace("province", "country")
                              
                              let city_element = document.getElementById(city_el_id)
                              let country_element = document.getElementById(country_el_id)
                              
                              if (city_element) {
                                  if (country_element) {
                                      country_id = parseInt(country_element.value)
                                      if (!isNaN(parseInt(country_element.value))) {
                                          
                                          //
                                          
                                          if (!isNaN(parseInt($(this).val()))) {
                                              City.get(country_id, parseInt($(this).val()), city_element)
                                          } else {
                                              City.id = null
                                              City.get(country_id, null, city_element)
                                              if (City.id) {
                                              
                                              }
                                          }
                                          //
                                          
                                      } else {
                                          City.id = null
                                          City.get(null, null, city_element)
                                      }
                                  }
                              }
                              City.id = null
                              Province.id = null
                          })
                        
                    }
                })
                
            }
        }
    }
    
    const fetch_province_list = function (dataToSend, callback) {
        if (dataToSend) {
            try {
                sendGetRequest("/api/v1.0/provinces", dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handle_province_error("Oops: 1")
                    }
                })
            } catch (e) {
                console.log(e)
                return handle_province_error("Error Validating Province")
            }
        } else {
            return handle_province_error("Error Loading Province- Missing Data")
        }
    }
    
    const set_detail = function (province) {
        let detail = clear_detail()
        let id = null
        if (province) {
            id = validInt(province.id)
            
            detail = {
                id: validInt(province.id),
                name: (province.name) ? province.name : null,
                sort_order: (province.sort_order) ? province.sort_order : 9999999,
                country_id: validInt(province.country_id),
                iso2: (province.iso2) ? province.iso2 : null,
                iso3: (province.iso3) ? province.iso3 : null,
                enabled: (province.enabled) ? province.enabled : 1,
                date_created: (province.date_created) ? province.date_created : formatDateMySQL(),
                created_by: (province.created_by) ? province.created_by : user_id,
                date_modified: (province.date_modified) ? province.date_modified : formatDateMySQL(),
                modified_by: (province.modified_by) ? province.modified_by : user_id,
                note: (province.note) ? province.note : null,
            }
        }
        Province.id = id
        Province.detail = detail
        return detail
    }
    
    const clear_detail = function () {
        return {
            id: null,
            name: null,
            sort_order: 9999999,
            iso2: null,
            iso3: null,
            enabled: 1,
            note: null,
            created_by: user_id,
            modified_by: user_id,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
        }
    }
    
    const build_form = function (elem, val, dropdown_id) {
        let id = $(elem).attr("id")
        let parent = $(elem).parents("div.row")
        let value = ""
        
        if (val) {
            value = val
        }
        
        if (!id || !parent[0]) {
            return
        }
        
        if (document.getElementById(form_id)) {
            return
        }
        
        let newProvinceForm = document.createElement("div")
        
        let heading1 = document.createElement("h5")
        
        let row1 = document.createElement("div")
        let row2 = document.createElement("div")
        let col1 = document.createElement("div")
        let col2 = document.createElement("div")
        let col3 = document.createElement("div")
        let col4 = document.createElement("div")
        let col5 = document.createElement("div")
        
        let form_element1 = document.createElement("div")
        let form_element2 = document.createElement("div")
        let form_element3 = document.createElement("div")
        let form_element4 = document.createElement("div")
        
        let error_element1 = document.createElement("div")
        let error_element2 = document.createElement("div")
        let error_element3 = document.createElement("div")
        
        let name_text_element = document.createElement("input")
        let name_label_element = document.createElement("label")
        let iso2_text_element = document.createElement("input")
        let iso2_label_element = document.createElement("label")
        let iso3_text_element = document.createElement("input")
        let iso3_label_element = document.createElement("label")
        
        let save_button = document.createElement("button")
        let cancel_button = document.createElement("button")
        
        newProvinceForm.id = form_id
        newProvinceForm.classList = ["card card-body m-3 " + class_name]
        
        heading1.classList = "card-title"
        heading1.innerText = "Province Details"
        
        name_text_element.id = "province_name"
        name_text_element.name = "province_name"
        name_text_element.type = "text"
        name_text_element.classList = ["form-control"]
        name_label_element.htmlFor = "province_name"
        name_label_element.innerHTML = "Name:"
        error_element1.id = "province_name-error"
        
        iso2_text_element.id = "province_iso2"
        iso2_text_element.name = "province_iso2"
        iso2_text_element.type = "text"
        iso2_text_element.maxLength = 2
        iso2_text_element.classList = ["form-control"]
        iso2_label_element.htmlFor = "province_iso2"
        iso2_label_element.innerHTML = "ISO2:"
        error_element2.id = "province_iso2-error"
        
        iso3_text_element.id = "province_iso3"
        iso3_text_element.name = "province_iso3"
        iso3_text_element.type = "text"
        iso3_text_element.maxLength = 3
        iso3_text_element.classList = ["form-control"]
        iso3_label_element.htmlFor = "province_iso3"
        iso3_label_element.innerHTML = "ISO3:"
        error_element3.id = "province_iso3-error"
        
        save_button.classList = ["btn btn-primary btn-sm waves-effect waves-light"]
        save_button.innerText = "save"
        save_button.type = "button"
        
        save_button.addEventListener("click", event => {
            Province.save(elem, dropdown_id)
        })
        
        cancel_button.classList = ["btn btn-outline-danger btn-sm waves-effect waves-light"]
        cancel_button.innerText = "cancel"
        cancel_button.type = "button"
        
        cancel_button.addEventListener("click", event => {
            destroy_form()
        })
        
        row1.classList = ["row"]
        row2.classList = ["row"]
        
        col1.classList = ["col-lg-3 mb-1"]
        col2.classList = ["col-lg-3 mb-1"]
        col3.classList = ["col-lg-3 mb-1"]
        col4.classList = ["col-lg-3 mb-1"]
        
        col5.classList = ["col-12 mb-1 text-right"]
        
        form_element1.classList = ["form-element"]
        form_element2.classList = ["form-element"]
        form_element3.classList = ["form-element"]
        form_element4.classList = ["form-element"]
        
        error_element1.classList = ["error w-100 text-center"]
        error_element2.classList = ["error w-100 text-center"]
        error_element3.classList = ["error w-100 text-center"]
        
        form_element1.appendChild(name_label_element)
        form_element1.appendChild(name_text_element)
        form_element1.appendChild(error_element1)
        
        col1.appendChild(form_element1)
        
        form_element2.appendChild(iso2_label_element)
        form_element2.appendChild(iso2_text_element)
        form_element2.appendChild(error_element2)
        
        col2.appendChild(form_element2)
        
        form_element3.appendChild(iso3_label_element)
        form_element3.appendChild(iso3_text_element)
        form_element3.appendChild(error_element3)
        
        col3.appendChild(form_element3)
        
        row1.appendChild(col1)
        row1.appendChild(col2)
        row1.appendChild(col3)
        row1.appendChild(col4)
        
        col5.append(cancel_button)
        col5.appendChild(save_button)
        
        row2.appendChild(col5)
        
        newProvinceForm.appendChild(heading1)
        newProvinceForm.appendChild(row1)
        newProvinceForm.appendChild(row2)
        
        parent[0].appendChild(newProvinceForm)
        
        name_text_element.value = value
        name_text_element.focus({ preventScroll: false })
        
        window.addEventListener("click", on_click_outside)
    }
    
    const destroy_form = function () {
        let elem = document.getElementById(form_id)
        if (elem) {
            elem.parentNode.removeChild(elem)
            window.removeEventListener("click", on_click_outside)
        }
    }
    
    const set = function (settings) {
    
    }
    
    const get = function (country_id, el) {
        Province.all = new Map()
        if (!el) {
            return
        }
        let province_id = ""
        if (Province.id !== null) {
            province_id = Province.id
        }
        
        if (!country_id) {
            $(el).BuildDropDown({
                data: Array.from(Province.all.values()),
                title: "Province",
                id_field: "id",
                text_field: "name",
                first_selectable: false,
            })
            $(el).val("").trigger("change")
            return
        }
        
        let dataToSend = {
            country_id: country_id,
        }
        
        fetch_province_list(dataToSend, function (provinces) {
            if (provinces) {
                load_all(provinces)
                $(el).BuildDropDown({
                    data: Array.from(Province.all.values()),
                    title: "Province",
                    id_field: "id",
                    text_field: "name",
                    first_selectable: false,
                })
                $(el).val(province_id).trigger("change")
                
            }
        })
        
    }
    
    /**
     * load provinces into object
     *
     * @param provinces
     */
    const load_all = function (provinces) {
        Province.all = new Map()
        
        if (provinces) {
            
            $.each(provinces, function (k, province) {
                let detail = set_detail(province)
                Province.all.set(detail.id, detail)
            })
        }
    }
    
    const add = function (elem, val, dropdown_id) {
        if (!elem) {
            return
        }
        
        build_form(elem, val, dropdown_id)
    }
    
    const save = function ($this, dropdown_id) {
        let province_detail = {}
        let _name = document.getElementById("province_name")
        let _province_iso2 = document.getElementById("province_iso2")
        let _province_iso3 = document.getElementById("province_iso3")
        let _country_id = document.getElementById(dropdown_id.replace(/province_id/g, "") + "country_id")
        if (!isNaN(parseInt(_country_id.value))) {
            if (_name, _province_iso2, _province_iso3, _country_id) {
                province_detail.name = _name.value
                province_detail.iso2 = _province_iso2.value
                province_detail.iso3 = _province_iso3.value
                province_detail.country_id = parseInt(_country_id.value)
                let r = confirm("Are you sure you want to edit this record?")
                if (r === true) {
                    update_province_record($this, remove_nulls(province_detail))
                }
            }
        }
        
    }
    
    const update_province_record = function ($this, dataToSend) {
        if (dataToSend) {
            try {
                sendPostRequest("/api/v1.0/provinces/update", dataToSend, function (data, status, xhr) {
                    if (data && data[0]) {
                        Province.all.set(data[0].province_id, data[0])
                        let province_elements = $("select[data-type='province']")
                        Province.id = data[0].province_id
                        City.id = null
                        province_elements.each(function (index, element) {
                            var newOption = new Option(data[0].province_name, data[0].province_id, false, false)
                            $(element).append(newOption).trigger("change")
                        })
                        
                        $($this).val(data[0].province_id).trigger("change")
                        
                        Province.close()
                        toastr.success("Province: " + data[0].province_id + " updated")
                        
                    } else {
                        return handle_province_error("Error: 1")
                    }
                })
            } catch (e) {
                console.log(e)
                handle_province_error("Error: Validating Province")
            }
        } else {
            console.log("Error: Missing Data")
            handle_province_error("Error: Missing Data")
        }
    }
    
    const update_select = function (country_id, elem) {
    
    }
    
    const init = function (settings) {
        build_drop_downs(settings)
    }
    
    return {
        detail: {},
        all: new Map(),
        id: null,
        set_detail: function (province) {
            set_detail(province)
        },
        update_select: function (country_id, elem) {
            update_select(country_id, elem)
        },
        close: function () {
            destroy_form()
        },
        save: function (country_id, dropdown_id) {
            save(country_id, dropdown_id)
        },
        get: function (country_id, el) {
            get(country_id, el)
        },
        add: function (elem, val, dropdown_id) {
            add(elem, val, dropdown_id)
        },
        init: function (settings) {
            init(settings)
        },
    }
    
})()

const Country = (function () {
    "use strict"
    
    const class_name = "form-new-country"
    const form_id = "form_new_country"
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const form_rules = {
        rules: {
            country_name: {
                required: true,
                //minlength: 3,
            },
            country_iso2: {
                //required: true,
                minlength: 2,
            },
            country_iso3: {
                //required: true,
                minlength: 3,
            },
        },
        messages: {
            country_name: {
                required: "required",
                //minlength: "too short",
            },
            country_iso2: {
                //required: "required",
                minlength: "too short",
            },
            country_iso3: {
                //required: "required",
                minlength: "too short",
            },
        },
    }
    
    const handle_country_error = function (msg) {
        toastr.error(msg)
        console.log(msg)
    }
    
    const on_click_outside = (e) => {
        let tar = $(e.target).parents("div." + class_name)
        
        if (!tar[0] && !e.target.className.includes("select-add-option")) {
            Country.close()
        }
    }
    
    const build_drop_downs = function (settings) {
        
        if (settings) {
            
            if (settings.dropdowns) {
                $.each(settings.dropdowns, function (i, dropdown_id) {
                    let element = document.getElementById(dropdown_id)
                    if (element) {
                        $(element)
                          .select2({
                              "language": {
                                  "searching": function () {
                                  },
                              },
                              "escapeMarkup": function (markup) {
                                  return markup
                              },
                          })
                          .on("select2:open", function (e) {
                              let x = document.querySelectorAll("[aria-controls='select2-" + dropdown_id + "-results']")
                              if (x[0]) {
                                  let _filterCountrySearch = x[0]
                                  
                                  $(_filterCountrySearch).attr("id", "" + dropdown_id + "_search")
                                  
                                  if (!document.getElementById("filter_country_add_icon")) {
                                      let i = document.createElement("i")
                                      i.classList = "select-add-option fas fa-plus filter_country_add"
                                      i.id = "filter_country_add_icon"
                                      i.addEventListener("click", event => {
                                          let val = _filterCountrySearch.value
                                          $(element).select2("close")
                                          Country.add(this, val)
                                          
                                      })
                                      _filterCountrySearch.after(i)
                                  }
                                  
                                  $(".filter_country_add").hide()
                                  
                                  if (_filterCountrySearch) {
                                      _filterCountrySearch.addEventListener("keyup", event => {
                                          
                                          if (_filterCountrySearch.value !== "") {
                                              $(".filter_country_add").show()
                                          } else {
                                              $(".filter_country_add").hide()
                                          }
                                          
                                      })
                                  }
                              }
                              
                          })
                          .on("update", function () {
                              console.log("ss")
                          })
                          // ----
                          .on("change", function () {
                              // console.log("Country.id", Country.id)
                              //console.log("Province.id", Province.id)
                              //console.log("City.id", City.id)
                              let country_id = (!isNaN(parseInt($(this).val()))) ? parseInt($(this).val()) : null
                              
                              let province_el_id = $(this)
                                .attr("id")
                                .replace("country", "province")
                              
                              let city_el_id = $(this)
                                .attr("id")
                                .replace("country", "city")
                              
                              let province_element = document.getElementById(province_el_id)
                              let city_element = document.getElementById(city_el_id)
                              
                              if (!isNaN(parseInt($(this).val()))) {
                                  if (province_element) {
                                      Province.get(parseInt($(this).val()), province_element)
                                      //City.get(null, null, city_element)
                                  }
                              } else {
                                  Province.get(null, province_element)
                              }
                          })
                        // ----
                    }
                    
                })
            }
            
        }
        
    }
    
    const fetch_country_list = function (dataToSend, callback) {
        if (dataToSend) {
            try {
                sendGetRequest("/api/v1.0/countries", dataToSend, function (data, status, xhr) {
                    //console.log(data)
                    
                    if (data) {
                        // Country.all = data.result
                        return callback(data)
                    } else {
                        return handle_country_error("Oops: 1")
                    }
                })
            } catch (e) {
                console.log(e)
                return handle_country_error("Error Validating Country")
            }
        } else {
            return handle_country_error("Error Loading Country- Missing Data")
        }
    }
    
    const update_country_record = function ($this, dataToSend) {
        if (dataToSend) {
            
            try {
                sendPostRequest("/api/v1.0/countries/update", dataToSend, function (data, status, xhr) {
                    if (data && data[0]) {
                        let new_country = data[0]
                        
                        return
                        Country.all.set(new_country.id, new_country)
                        let country_elements = $("select[data-type='country']")
                        
                        country_elements.each(function (index, element) {
                            var newOption = new Option(new_country.name, new_country.id, false, false)
                            $(element).append(newOption).trigger("change")
                        })
                        $($this).val(new_country.id).trigger("change")
                        Country.close()
                        toastr.success("Country: " + new_country.id + " updated")
                    } else {
                        return handle_country_error("Error: 1")
                    }
                })
            } catch (e) {
                console.log(e)
                handle_country_error("Error: Validating Country")
            }
            
        } else {
            console.log("Error: Missing Data")
            handle_country_error("Error: Missing Data")
        }
    }
    
    const set_detail = function (country) {
        let detail = clear_detail()
        let id = null
        if (country) {
            id = validInt(country.id)
            detail = {
                id: validInt(country.id),
                name: (country.name) ? country.name : null,
                sort_order: (country.sort_order) ? country.sort_order : null,
                iso2: (country.iso2) ? country.iso2 : null,
                iso3: (country.iso3) ? country.iso3 : null,
                currency_id: validInt(country.currency_id),
                enabled: (country.enabled) ? country.enabled : 1,
                date_created: (country.date_created) ? country.date_created : formatDateMySQL(),
                created_by: (country.created_by) ? country.created_by : user_id,
                date_modified: (country.date_modified) ? country.date_modified : formatDateMySQL(),
                modified_by: (country.modified_by) ? country.modified_by : user_id,
                note: (country.note) ? country.note : null,
            }
        }
        Country.id = id
        Country.detail = detail
        return detail
    }
    
    const clear_detail = function () {
        return {
            id: null,
            name: null,
            sort_order: null,
            iso2: null,
            iso3: null,
            currency_id: null,
            enabled: 1,
            note: null,
            created_by: user_id,
            modified_by: user_id,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
        }
    }
    
    const build_form = function (elem, val) {
        let id = $(elem).attr("id")
        let parent = $(elem).parents("div.row")
        let value = ""
        
        if (val) {
            value = val
        }
        
        if (!id || !parent[0]) {
            return
        }
        
        if (document.getElementById(form_id)) {
            return
        }
        
        let new_country_form = document.createElement("div")
        
        let heading1 = document.createElement("h5")
        
        let row1 = document.createElement("div")
        let row2 = document.createElement("div")
        let col1 = document.createElement("div")
        let col2 = document.createElement("div")
        let col3 = document.createElement("div")
        let col4 = document.createElement("div")
        let col5 = document.createElement("div")
        
        let form_element1 = document.createElement("div")
        let form_element2 = document.createElement("div")
        let form_element3 = document.createElement("div")
        let form_element4 = document.createElement("div")
        
        let error_element1 = document.createElement("div")
        let error_element2 = document.createElement("div")
        let error_element3 = document.createElement("div")
        
        let name_text_element = document.createElement("input")
        let name_label_element = document.createElement("label")
        let iso2_text_element = document.createElement("input")
        let iso2_label_element = document.createElement("label")
        let iso3_text_element = document.createElement("input")
        let iso3_label_element = document.createElement("label")
        
        let save_button = document.createElement("button")
        let cancel_button = document.createElement("button")
        
        heading1.classList = "card-title"
        heading1.innerText = "Country Details"
        
        new_country_form.id = form_id
        new_country_form.classList = ["card card-body m-3 " + class_name]
        
        name_text_element.id = "country_name"
        name_text_element.name = "country_name"
        name_text_element.type = "text"
        name_text_element.classList = ["form-control "]
        name_label_element.htmlFor = "country_name"
        name_label_element.innerHTML = "Name:"
        error_element1.id = "country_name-error"
        
        iso2_text_element.id = "country_iso2"
        iso2_text_element.name = "country_iso2"
        iso2_text_element.type = "text"
        iso2_text_element.maxLength = 2
        iso2_text_element.classList = ["form-control "]
        iso2_label_element.htmlFor = "country_iso2"
        iso2_label_element.innerHTML = "ISO2:"
        error_element2.id = "country_iso2-error"
        
        iso3_text_element.id = "country_iso3"
        iso3_text_element.name = "country_iso3"
        iso3_text_element.type = "text"
        iso3_text_element.maxLength = 3
        iso3_text_element.classList = ["form-control "]
        iso3_label_element.htmlFor = "country_iso3"
        iso3_label_element.innerHTML = "ISO3:"
        error_element3.id = "country_iso3-error"
        
        save_button.classList = ["btn btn-primary btn-sm waves-effect waves-light"]
        save_button.innerText = "save"
        save_button.type = "button"
        
        save_button.addEventListener("click", event => {
            Country.save(elem)
        })
        
        cancel_button.classList = ["btn btn-outline-danger btn-sm waves-effect waves-light"]
        cancel_button.innerText = "cancel"
        cancel_button.type = "button"
        
        cancel_button.addEventListener("click", event => {
            Country.close()
        })
        
        row1.classList = ["row"]
        row2.classList = ["row"]
        
        col1.classList = ["col-lg-3 mb-1"]
        col2.classList = ["col-lg-3 mb-1"]
        col3.classList = ["col-lg-3 mb-1"]
        col4.classList = ["col-lg-3 mb-1"]
        
        col5.classList = ["col-12 mb-1 text-right"]
        
        form_element1.classList = ["form-element"]
        form_element2.classList = ["form-element"]
        form_element3.classList = ["form-element"]
        form_element4.classList = ["form-element"]
        
        error_element1.classList = ["error w-100 text-center"]
        error_element2.classList = ["error w-100 text-center"]
        error_element3.classList = ["error w-100 text-center"]
        
        form_element1.appendChild(name_label_element)
        form_element1.appendChild(name_text_element)
        form_element1.appendChild(error_element1)
        
        col1.appendChild(form_element1)
        
        form_element2.appendChild(iso2_label_element)
        form_element2.appendChild(iso2_text_element)
        form_element2.appendChild(error_element2)
        
        col2.appendChild(form_element2)
        
        form_element3.appendChild(iso3_label_element)
        form_element3.appendChild(iso3_text_element)
        form_element3.appendChild(error_element3)
        
        col3.appendChild(form_element3)
        
        row1.appendChild(col1)
        row1.appendChild(col2)
        row1.appendChild(col3)
        row1.appendChild(col4)
        
        col5.append(cancel_button)
        col5.appendChild(save_button)
        
        row2.appendChild(col5)
        
        new_country_form.appendChild(heading1)
        new_country_form.appendChild(row1)
        new_country_form.appendChild(row2)
        
        parent[0].appendChild(new_country_form)
        
        name_text_element.value = value
        name_text_element.focus({ preventScroll: false })
        
        window.addEventListener("click", on_click_outside)
    }
    
    const destroy_form = function () {
        let elem = document.getElementById(form_id)
        if (elem) {
            elem.parentNode.removeChild(elem)
            window.removeEventListener("click", on_click_outside)
        }
    }
    
    const validate_form = function () {
        let _name = document.getElementById("country_name")
        let _country_iso2 = document.getElementById("country_iso2")
        let _country_iso3 = document.getElementById("country_iso3")
        let valid = true
        // ----
        if (!_name || !_country_iso2 || !_country_iso3) {
            handle_country_error("Error Processing Data")
            return false
        }
        
        if (_name.value === "") {
            $(_name).addClass("is-invalid")
            $("#country_name-error")
              .text("Required: Field is required")
              .show()
            valid = false
        } else {
            $(_name).removeClass("is-invalid")
            $("#country_name-error")
              .text("")
              .hide()
        }
        
        if (_country_iso2.value === "") {
            $(_country_iso2).addClass("is-invalid")
            $("#country_iso2-error")
              .text("Required: Field is required")
              .show()
            valid = false
        } else {
            $(_country_iso2).removeClass("is-invalid")
            $("#country_iso2-error")
              .text("")
              .hide()
        }
        
        if (_country_iso3.value === "") {
            $(_country_iso3).addClass("is-invalid")
            $("#country_iso3-error")
              .text("Required: Field is required")
              .show()
            valid = false
        } else {
            $(_country_iso3).removeClass("is-invalid")
            $("#country_iso3-error")
              .text("")
              .hide()
        }
        
        return valid
    }
    
    const get = function (settings) {
        fetch_country_list({}, function (data) {
            if (data) {
                Country.all = data
                build_drop_downs(settings)
            }
        })
    }
    
    const add = function (elem, val) {
        if (!elem) {
            return
        }
        
        build_form(elem, val)
    }
    
    const save = function ($this) {
        let _name = document.getElementById("country_name")
        let _country_iso2 = document.getElementById("country_iso2")
        let _country_iso3 = document.getElementById("country_iso3")
        if (_name && _country_iso2 && _country_iso3) {
            
            if (validate_form()) {
                let country_detail = {}
                
                country_detail.name = (_name.value !== "") ? _name.value : null
                country_detail.iso2 = (_country_iso2.value !== "") ? _country_iso2.value : null
                country_detail.iso3 = (_country_iso3.value !== "") ? _country_iso3.value : null
                
                let r = confirm("Are you sure you want to edit this record?")
                if (r === true) {
                    update_country_record($this, remove_nulls(country_detail))
                }
            }
        } else {
            toastr.error("Error: 2")
        }
        
    }
    
    const init = function (settings) {
        build_drop_downs(settings)
    }
    
    const load_all = function (countries) {
        Country.all = new Map()
        
        if (countries) {
            $.each(countries, function (k, country) {
                let detail = set_detail(country)
                Country.all.set(detail.id, detail)
            })
        }
    }
    
    return {
        detail: {},
        all: new Map(),
        close: function () {
            destroy_form()
        },
        add: function (elem, val) {
            add(elem, val)
        },
        save: function ($this) {
            save($this)
        },
        set: function (country_id) {
            set(country_id)
        },
        set_detail: function (country) {
            set_detail(country)
        },
        load_all: function (countries) {
            load_all(countries)
        },
        get: function (settings) {
            get(settings)
        },
        init: function (settings) {
            init(settings)
        },
    }
})()

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

const Address = (function () {
    "use strict"
    //Path
    const base_url = "/addresses"
    //Buttons
    const _button_add_address_table = document.getElementById("button_add_address_table")
    const _button_close_edit_address_form = document.getElementById("button_close_edit_address_form")
    const _button_clear_form_edit_address = document.getElementById("button_clear_form_edit_address")
    const _button_submit_form_edit_address = document.getElementById("button_submit_form_edit_address")
    //Blocks
    const _form_edit_address = document.getElementById("form_edit_address")
    const _card_edit_address_form = document.getElementById("card_edit_address_form")
    //Tables
    const _table_address = document.getElementById("table_address")
    //Fields
    const _address_id = document.getElementById("address_id")
    const _address_enabled = document.getElementById("address_enabled")
    const _address_street_1 = document.getElementById("address_street_1")
    const _address_street_2 = document.getElementById("address_street_2")
    const _address_street_3 = document.getElementById("address_street_3")
    const _address_country_id = document.getElementById("address_country_id")
    const _address_types_id = document.getElementById("address_types_id")
    const _address_province_id = document.getElementById("address_province_id")
    const _address_city_id = document.getElementById("address_city_id")
    const _address_postal_code = document.getElementById("address_postal_code")
    //Defaults
    let default_display = default_address_view
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let $address_table = $(_table_address)
    let temp_address = {}
    
    /**
     * add new address
     */
    $(_button_add_address_table)
      .on("click", function () {
          $address_table.clearSelectedRows()
          clear_form()
          load_form()
      })
    
    /**
     * clear address form button
     */
    $(_button_clear_form_edit_address)
      .on("click", function () {
          $address_table.clearSelectedRows()
          clear_form()
      })
    
    /**
     * submit button save address
     */
    $(_button_submit_form_edit_address)
      .on("click", function () {
          alert()
      })
    
    /**
     * close address form
     */
    $(_button_close_edit_address_form)
      .on("click", function () {
          $address_table.clearSelectedRows()
          clear_form()
          unload_form()
      })
    
    /**
     * handle_address_error
     *
     * @param msg
     */
    const handle_address_error = function (msg) {
        toastr.error(msg)
    }
    
    /**
     * sets objects default values
     *
     * @returns {{note: null, country: {note: null, date_modified: *, date_created: *, name: null, modified_by: number, id: null, iso2: null, sort_order: number, created_by: number, currency_id: null, enabled: number, iso3: null}, medium_address_formatted: null, city: {note: null, date_modified: *, province_id: null, date_created: *, name: null, modified_by: number, id: null, sort_order: number, created_by: number, enabled: number}, date_created: *, created_by: number, enabled: number, short_address_formatted: null, long_address_formatted: null, street_1: null, date_modified: *, province: {note: null, date_modified: *, date_created: *, name: null, modified_by: number, id: null, iso2: null, sort_order: number, created_by: number, country_id: null, enabled: number, iso3: null}, street_3: null, street_2: null, modified_by: number, id: null, postal_code: null}}
     * @private
     */
    const _default_detail = function () {
        return {
            id: null,
            street_1: null,
            street_2: null,
            street_3: null,
            postal_code: null,
            enabled: 1,
            address_types_id: [],
            date_created: formatDateMySQL(),
            created_by: parseInt(user_id),
            date_modified: formatDateMySQL(),
            modified_by: parseInt(user_id),
            note: null,
            short_address_formatted: null,
            medium_address_formatted: null,
            long_address_formatted: null,
            country: {
                id: null,
                name: null,
                iso2: null,
                iso3: null,
                currency_id: null,
                sort_order: 999,
                enabled: 1,
                date_created: formatDateMySQL(),
                created_by: parseInt(user_id),
                date_modified: formatDateMySQL(),
                modified_by: parseInt(user_id),
                note: null,
            },
            province: {
                id: null,
                country_id: null,
                name: null,
                iso2: null,
                iso3: null,
                sort_order: 999,
                enabled: 1,
                date_created: formatDateMySQL(),
                created_by: parseInt(user_id),
                date_modified: formatDateMySQL(),
                modified_by: parseInt(user_id),
                note: null,
            },
            city: {
                id: null,
                province_id: null,
                name: null,
                sort_order: 999,
                enabled: 1,
                date_created: formatDateMySQL(),
                created_by: parseInt(user_id),
                date_modified: formatDateMySQL(),
                modified_by: parseInt(user_id),
                note: null,
            },
        }
    }
    
    /**
     * save address form data
     *
     * @param params
     */
    const save = function (params) {
    
    }
    
    /**
     * clears address form
     */
    const clear_form = function () {
        _address_id.value = ""
        _address_enabled.checked = true
        _address_street_1.value = ""
        _address_street_2.value = ""
        _address_street_3.value = ""
        _address_postal_code.value = ""
        $(_address_types_id).val([])
        $(_address_country_id).val("").trigger("change")
    }
    
    /**
     * populate address form
     *
     * @param address
     */
    const populate_form = function (address) {
        if (address) {
            _address_id.value = (address.id) ? address.id : null
            $(_address_types_id).val((address.address_types_id) ? address.address_types_id : [])
            _address_enabled.checked = (address.enabled === 1)
            _address_street_1.value = (address.street_1) ? address.street_1 : null
            _address_street_2.value = (address.street_2) ? address.street_2 : null
            _address_street_3.value = (address.street_3) ? address.street_3 : null
            _address_postal_code.value = (Address.detail.postal_code) ? Address.detail.postal_code : null
            Province.id = address.province.id
            Country.id = address.country.id
            City.id = Address.detail.city.id
            
            $(_address_country_id).val((Address.detail.country.id) ? Address.detail.country.id : "").trigger("change")
        }
    }
    
    /**
     * reset address edit form
     */
    const reset_form = function () {
        _address_id.value = ""
        $(_address_types_id).val([])
        _address_enabled.checked = true
        _address_street_1.value = ""
        _address_street_2.value = ""
        _address_street_3.value = ""
        _address_country_id.value = ""
        _address_province_id.value = ""
        _address_city_id.value = ""
        _address_postal_code.value = ""
    }
    
    /**
     * shows address edit form
     */
    const unload_form = function () {
        if (_card_edit_address_form) {
            $(_card_edit_address_form).hide()
        }
    }
    
    /**
     * hides address edit form
     */
    const load_form = function (address) {
        if (address) {
            populate_form(address)
            if (_card_edit_address_form) {
                $(_card_edit_address_form).show()
            }
        }
        
    }
    
    /**
     * build address table structure
     */
    const build_table = function () {
        let table_address_render_value = default_display + "_address_formatted"
        if (!$.fn.DataTable.isDataTable(_table_address)) {
            $address_table = $(_table_address).table({
                table_type: "display_list",
                data: Array.from(Address.all.values()),
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
                        data: table_address_render_value,
                        render: function (data, type, row, meta) {
                            return data
                        },
                    },
                ],
                rowClick: Address.navigate,
            })
        }
    }
    
    /**
     * load address into object
     *
     * @param addresses
     */
    const load_all = function (addresses) {
        Address.all = new Map()
        
        if (addresses) {
            $.each(addresses, function (i, address) {
                let detail = set_detail(address)
                Address.all.set(detail.id, detail)
                $address_table.insertRow(detail)
            })
        }
        
        if (_table_address) {
            $address_table.clearSelectedRows()
        }
        if (_card_edit_address_form) {
            clear_form()
            unload_form()
        }
    }
    
    /**
     * initialize address form and table
     *
     * @param addresses
     */
    const init = function (addresses) {
        if (_table_address) {
            build_table()
        }
        if (_form_edit_address) {
            
            $(_address_country_id).BuildDropDown({
                data: Array.from(Country.all.values()),
                title: "Country",
                id_field: "id",
                text_field: "name",
                first_selectable: false,
            })
            
            $(_address_province_id).BuildDropDown({
                data: Array.from(Province.all.values()),
                title: "Province",
                id_field: "id",
                text_field: "name",
                first_selectable: false,
            })
            
            $(_address_city_id).BuildDropDown({
                data: Array.from(Province.all.values()),
                title: "City",
                id_field: "id",
                text_field: "name",
                first_selectable: false,
            })
            
            Country.init({
                dropdowns: [
                    "address_country_id",
                ],
            })
            Province.init({
                dropdowns: [
                    "address_province_id",
                ],
            })
            City.init({
                dropdowns: [
                    "address_city_id",
                ],
            })
            
        }
    }
    
    /**
     * set address object detail
     */
    const set_detail = function (address) {
        let detail = _default_detail()
        if (address) {
            detail.country = {
                id: parseInt((address.country.id) ? address.country.id : null),
                name: (address.country.name) ? address.country.name : null,
                name_long: (address.country.name_long) ? address.country.name_long : null,
                currency_id: parseInt((address.country.currency_id) ? address.country.currency_id : null),
                iso2: (address.country.iso2) ? address.country.iso2 : null,
                iso3: (address.country.iso3) ? address.country.iso3 : null,
                sort_order: parseInt((address.country.sort_order) ? address.country.sort_order : 999),
                enabled: parseInt((address.country.enabled) ? address.country.enabled : 1),
                date_created: (address.country.date_created) ? address.country.date_created : formatDateMySQL(),
                created_by: parseInt((address.country.created_by) ? address.country.created_by : user_id),
                date_modified: (address.country.date_modified) ? address.country.date_modified : formatDateMySQL(),
                modified_by: parseInt((address.country.modified_by) ? address.country.modified_by : user_id),
                note: (address.country.note) ? address.country.note : null,
                
            }
            detail.province = {
                id: parseInt((address.province.id) ? address.province.id : null),
                country_id: parseInt((address.country.id) ? address.country.id : null),
                name: (address.province.name) ? address.province.name : null,
                iso2: (address.province.iso2) ? address.province.iso2 : null,
                iso3: (address.province.iso3) ? address.province.iso3 : null,
                sort_order: parseInt((address.province.sort_order) ? address.province.sort_order : 999),
                enabled: parseInt((address.province.enabled) ? address.province.enabled : 1),
                date_created: (address.province.date_created) ? address.province.date_created : formatDateMySQL(),
                created_by: parseInt((address.province.created_by) ? address.province.created_by : user_id),
                date_modified: (address.province.date_modified) ? address.province.date_modified : formatDateMySQL(),
                modified_by: parseInt((address.province.modified_by) ? address.province.modified_by : user_id),
                note: (address.province.note) ? address.province.note : null,
            }
            detail.city = {
                id: parseInt((address.city.id) ? address.city.id : null),
                province_id: parseInt((address.province.id) ? address.province.id : null),
                name: (address.city.name) ? address.city.name : null,
                sort_order: parseInt((address.city.sort_order) ? address.city.sort_order : 999),
                enabled: parseInt((address.city.enabled) ? address.city.enabled : 1),
                date_created: (address.city.date_created) ? address.city.date_created : formatDateMySQL(),
                created_by: parseInt((address.city.created_by) ? address.city.created_by : user_id),
                date_modified: (address.city.date_modified) ? address.city.date_modified : formatDateMySQL(),
                modified_by: parseInt((address.city.modified_by) ? address.city.modified_by : user_id),
                note: (address.city.note) ? address.city.note : null,
            }
            detail.id = parseInt((address.id) ? address.id : null)
            detail.address_types_id = getListOfIds(address.address_types_id)
            detail.short_address_formatted = (address.short_address_formatted) ? address.short_address_formatted : null
            detail.medium_address_formatted = (address.medium_address_formatted) ? address.medium_address_formatted : null
            detail.long_address_formatted = (address.long_address_formatted) ? address.long_address_formatted : null
            detail.street_1 = (address.street_1) ? address.street_1 : null
            detail.street_2 = (address.street_2) ? address.street_2 : null
            detail.street_3 = (address.street_3) ? address.street_3 : null
            detail.postal_code = (address.postal_code) ? address.postal_code : null
            detail.enabled = parseInt((address.enabled) ? address.enabled : 1)
            detail.date_created = (address.date_created) ? address.date_created : formatDateMySQL()
            detail.created_by = parseInt((address.created_by) ? address.created_by : user_id)
            detail.date_modified = (address.date_modified) ? address.date_modified : formatDateMySQL()
            detail.modified_by = parseInt((address.modified_by) ? address.modified_by : user_id)
            detail.note = (address.note) ? address.note : null
        }
        temp_address = detail
        Address.detail = detail
        return detail
    }
    
    /**
     * populate form with selected address
     *
     * @param address
     */
    const navigate = function (address) {
        if (address) {
            reset_form()
            populate_form(address)
            load_form()
        }
    }
    
    /**
     * globals
     */
    return {
        validator: null,
        detail: {},
        all: new Map(),
        navigate: function (address) {
            navigate(address)
        },
        load_all: function (params) {
            load_all(params)
        },
        save: function (params) {
            save(params)
        },
        init: function (addresses) {
            init(addresses)
        },
    }
    
})()

const Register = (function () {
    "use strict"
    const base_url = "/register"
    
    const init = function (settings) {
    
    }
    
    return {
        init: function (settings) {
            init(settings)
        },
    }
    
})()

$.fn.ColorScheme = function (settings) {
    console.log("Test", Types.color_scheme)
    
}

    
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
    //Path
    const base_url = "/contacts"
    //Buttons
    const _button_add_contact_table = document.getElementById("button_add_contact_table")
    const _button_clear_form_edit_contact = document.getElementById("button_clear_form_edit_contact")
    const _button_close_edit_contact_form = document.getElementById("button_close_edit_contact_form")
    const _button_submit_form_edit_contact = document.getElementById("button_submit_form_edit_contact")
    //Fields
    const _contact_id = document.getElementById("contact_id")
    const _contact_name_first = document.getElementById("contact_name_first")
    const _contact_name_last = document.getElementById("contact_name_last")
    const _contact_phone = document.getElementById("contact_phone")
    const _contact_email = document.getElementById("contact_email")
    const _contact_enabled = document.getElementById("contact_enabled")
    const _contact_types_id = document.getElementById("contact_types_id")
    //Blocks
    const _card_edit_contact_form = document.getElementById("card_edit_contact_form")
    
    //Tables
    const _table_contact = document.getElementById("table_contact")
    //Unused
    const _contact_date_created = document.getElementById("contact_date_created")
    const _contact_created_by = document.getElementById("contact_created_by")
    const _contact_date_modified = document.getElementById("contact_date_modified")
    const _contact_modified_by = document.getElementById("contact_modified_by")
    const _contact_note = document.getElementById("contact_note")
    //Defaults
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let $contact_table = $(_table_contact)
    // ----
    
    /**
     * submit contact form button
     */
    $(_button_submit_form_edit_contact)
      .on("click", function () {
          save()
      })
    
    $(_button_add_contact_table)
      .on("click", function () {
          $contact_table.clearSelectedRows()
          clear_form()
          show_form()
      })
    
    $(_button_clear_form_edit_contact)
      .on("click", function () {
          $contact_table.clearSelectedRows()
          clear_form()
      })
    
    $(_button_close_edit_contact_form)
      .on("click", function () {
          $contact_table.clearSelectedRows()
          clear_form()
          hide_form()
      })
    
    /**
     * build contact table structure
     */
    const build_table = function () {
        if (_table_contact) {
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
                            title: "Name",
                            targets: 1,
                            data: "formatted_names",
                            render: function (data, type, row, meta) {
                                return data
                            },
                        },
                        {
                            title: "Types",
                            targets: 2,
                            data: "formatted_types",
                            render: function (data, type, row, meta) {
                                return data
                            },
                        },
                    ],
                    rowClick: Contact.navigate,
                })
            }
        }
    }
    
    /**
     * sets objects default values
     *
     * @returns {{note: null, country: {note: null, date_modified: *, date_created: *, name: null, modified_by: number, id: null, iso2: null, sort_order: number, created_by: number, currency_id: null, enabled: number, iso3: null}, medium_address_formatted: null, city: {note: null, date_modified: *, province_id: null, date_created: *, name: null, modified_by: number, id: null, sort_order: number, created_by: number, enabled: number}, date_created: *, created_by: number, enabled: number, short_address_formatted: null, long_address_formatted: null, street_1: null, date_modified: *, province: {note: null, date_modified: *, date_created: *, name: null, modified_by: number, id: null, iso2: null, sort_order: number, created_by: number, country_id: null, enabled: number, iso3: null}, street_3: null, street_2: null, modified_by: number, id: null, postal_code: null}}
     * @private
     */
    const _default_detail = function () {
        return {
            id: null,
            name_first: null,
            name_last: null,
            formatted_types: "",
            formatted_names: "",
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
    
    /**
     * handels contact errors
     *
     * @param msg
     */
    const handle_contact_error = function (msg) {
        toastr.error(msg)
    }
    
    /**
     * reset form fields
     */
    const clear_form = function () {
        
        if (_card_edit_contact_form) {
            _contact_id.value = ""
            _contact_name_first.value = ""
            _contact_name_last.value = ""
            _contact_phone.value = ""
            _contact_email.value = ""
            _contact_enabled.checked = true
            $(_contact_types_id).val([])
        }
    }
    
    /**
     * populate form fields
     *
     * @param contact
     */
    const populate_form = function (contact) {
        log("Contact-PopulateForm.contact", contact)
        if (_card_edit_contact_form) {
            _contact_id.value = validInt(contact.id)
            _contact_name_first.value = (contact.name_first) ? contact.name_first : null
            _contact_name_last.value = (contact.name_last) ? contact.name_last : null
            _contact_phone.value = (contact.phone) ? contact.phone : null
            _contact_email.value = (contact.email) ? contact.email : null
            _contact_enabled.checked = (contact.enabled) ? (contact.enabled === 1) : true
            $(_contact_types_id).val((contact.contact_types_id) ? contact.contact_types_id : [])
        }
    }
    
    /**
     * show form
     */
    const show_form = function () {
        if (_card_edit_contact_form) {
            $(_card_edit_contact_form).show()
        }
    }
    
    /**
     * hide form
     */
    const hide_form = function () {
        if (_card_edit_contact_form) {
            $(_card_edit_contact_form).hide()
        }
    }
    
    /**
     * save contact
     */
    const save = function () {
        if (validate()) {
            let dataToSend = {
                id: null,
                name_first: (_contact_name_first.value !== "") ? _contact_name_first.value : null,
                name_last: (_contact_name_last.value !== "") ? _contact_name_last.value : null,
                email: (_contact_email.value !== "") ? _contact_email.value : null,
                phone: (_contact_phone.value !== "") ? _contact_phone.value : null,
                enabled: (_contact_enabled) ? 1 : 0,
                note: null,
            }
            log(dataToSend)
        }
    }
    
    /**
     * validate contact form
     *
     * @returns {boolean}
     */
    const validate = function () {
        
        return false
    }
    
    /**
     * initialize contact form and table
     *
     * @param contacts
     */
    const init = function (contacts) {
        if (_table_contact) {
            build_table()
        }
        if (contacts) {
            load_all(contacts)
        }
        hide_form()
    }
    
    /**
     * sets detail for contact object
     *
     * @param contact
     * @returns {{note: null, country: {note: null, date_modified: *, date_created: *, name: null, modified_by: number, id: null, iso2: null, sort_order: number, created_by: number, currency_id: null, enabled: number, iso3: null}, medium_address_formatted: null, city: {note: null, date_modified: *, province_id: null, date_created: *, name: null, modified_by: number, id: null, sort_order: number, created_by: number, enabled: number}, date_created: *, created_by: number, enabled: number, short_address_formatted: null, long_address_formatted: null, street_1: null, date_modified: *, province: {note: null, date_modified: *, date_created: *, name: null, modified_by: number, id: null, iso2: null, sort_order: number, created_by: number, country_id: null, enabled: number, iso3: null}, street_3: null, street_2: null, modified_by: number, id: null, postal_code: null}}
     */
    const set_detail = function (contact) {
        let detail = _default_detail()
        if (contact) {
            detail.id = (contact.id) ? contact.id : null
            detail.name_first = (contact.name_first) ? contact.name_first : null
            detail.name_last = (contact.name_last) ? contact.name_last : null
            detail.formatted_types = (contact.formatted_types) ? contact.formatted_types : ""
            detail.formatted_names = (contact.formatted_names) ? contact.formatted_names : ""
            detail.contact_types_id = getListOfIds(contact.contact_types_id)
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
    
    /**
     * loads all contacts into object
     *
     * @param contacts
     */
    const load_all = function (contacts) {
        Contact.all = new Map()
        
        if (!contacts) {
            return
        }
        
        $.each(contacts, function (i, contact) {
            let detail = set_detail(contact)
            Contact.all.set(detail.id, detail)
            $contact_table.insertRow(detail)
        })
        
        //console.log(" Contact.all", Contact.all)
    }
    
    /**
     * load selected contact
     *
     * @param contact
     */
    const navigate = function (contact) {
        clear_form()
        populate_form(contact)
        show_form()
    }
    
    /**
     * globals
     */
    return {
        validator: null,
        detail: {},
        all: new Map(),
        navigate: function (contact) {
            navigate(contact)
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

const Currency = (function () {
    "use strict"
    
    const base_url = "/currency"
    const _input_currency_id = document.getElementById("input_currency_id")
    const _input_currency_sort_order = document.getElementById("input_currency_sort_order")
    const _input_currency_name = document.getElementById("input_currency_name")
    const _input_currency_iso = document.getElementById("input_currency_iso")
    const _input_currency_minor_unit = document.getElementById("input_currency_minor_unit")
    const _input_currency_symbol = document.getElementById("input_currency_symbol")
    const _input_currency_enabled = document.getElementById("input_currency_enabled")
    const _input_currency_date_created = document.getElementById("input_currency_date_created")
    const _input_currency_created_by = document.getElementById("input_currency_created_by")
    const _input_currency_date_modified = document.getElementById("input_currency_date_modified")
    const _input_currency_modified_by = document.getElementById("input_currency_modified_by")
    const _input_currency_note = document.getElementById("input_currency_note")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
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
        //console.log(' -- Currency -- ', {})
    }
    
    const set = function (currency) {
        let detail = _default_detail()
        if (currency) {
            detail.id = (currency.id) ? currency.id : null
            detail.sort_order = (currency.sort_order) ? currency.sort_order : null
            detail.name = (currency.name) ? currency.name : null
            detail.iso = (currency.iso) ? currency.iso : null
            detail.minor_unit = (currency.minor_unit) ? currency.minor_unit : null
            detail.symbol = (currency.symbol) ? currency.symbol : null
            detail.enabled = (currency.enabled) ? currency.enabled : 1
            detail.date_created = (currency.date_created) ? currency.date_created : formatDateMySQL()
            detail.created_by = (currency.created_by) ? currency.created_by : created_by
            detail.date_modified = (currency.date_modified) ? currency.date_modified : formatDateMySQL()
            detail.modified_by = (currency.modified_by) ? currency.modified_by : modified_by
            detail.note = (currency.note) ? currency.note : null
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
            Currency.all.set("id", detail)
        })
        
        //console.log(' Currency.all',  Currency.all);
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

Currency.init()
//end object

const Vendor = (function () {
    "use strict"
    
    const base_url = "/vendors"
    //Fields
    const _vendor_company_id = document.getElementById("vendor_company_id")
    const _vendor_name = document.getElementById("vendor_name")
    const _vendor_id = document.getElementById("vendor_id")
    const _vendor_show_online = document.getElementById("vendor_show_online")
    const _vendor_show_sales = document.getElementById("vendor_show_sales")
    const _vendor_show_ops = document.getElementById("vendor_show_ops")
    const _vendor_is_provider = document.getElementById("vendor_is_provider")
    const _vendor_sku = document.getElementById("vendor_sku")
    const _vendor_enabled = document.getElementById("vendor_enabled")
    //Unused
    const _vendor_date_created = document.getElementById("vendor_date_created")
    const _vendor_created_by = document.getElementById("vendor_created_by")
    const _vendor_date_modified = document.getElementById("vendor_date_modified")
    const _vendor_modified_by = document.getElementById("vendor_modified_by")
    const _vendor_note = document.getElementById("vendor_note")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    // ----
    
    const handle_vendor_error = function (msg) {
        toastr.error(msg)
    }
    
    const init_autocomplete = function () {
        if (_vendor_name) {
            $(_vendor_name)
              .on("change", function () {
              
              })
              .on("click", function () {
                  $(this).select()
              })
              .autocomplete({
                  serviceUrl: "/api/v1.0/autocomplete/vendors",
                  minChars: 2,
                  cache: false,
                  dataType: "json",
                  triggerSelectOnValidInput: false,
                  paramName: "st",
                  onSelect: function (suggestion) {
                      if (suggestion.data) {
                          let vendor = suggestion.data
                          let vendor_id = vendor.id
                          let vendor_company_id = vendor.company.id
                          _vendor_id.value = vendor_id
                          _vendor_company_id.value = vendor_company_id
                      }
                      
                      // --
                      //log("Provider.suggestion", suggestion.data)
                      //globalSelectedProvider = true
                      //_provider_company_id.value = suggestion.data.company_id
                      //_provider_id.value = suggestion.data.provider_id
                      //_provider_name.value = suggestion.data.company_name
                  },
              })
        }
        
    }
    
    const _default_detail = function () {
        return {
            id: null,
            company_id: null,
            status_id: null,
            show_online: 1,
            show_sales: 1,
            show_ops: 1,
            is_provider: 1,
            sku: null,
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
    
    const set = function (vendor) {
        let detail = _default_detail()
        if (vendor) {
            detail.id = (vendor.id) ? vendor.id : null
            detail.company_id = (vendor.company_id) ? vendor.company_id : null
            detail.status_id = (vendor.status_id) ? vendor.status_id : null
            detail.show_online = (vendor.show_online) ? vendor.show_online : 1
            detail.show_sales = (vendor.show_sales) ? vendor.show_sales : 1
            detail.show_ops = (vendor.show_ops) ? vendor.show_ops : 1
            detail.is_provider = (vendor.is_provider) ? vendor.is_provider : 1
            detail.sku = (vendor.sku) ? vendor.sku : null
            detail.enabled = (vendor.enabled) ? vendor.enabled : 1
            detail.date_created = (vendor.date_created) ? vendor.date_created : formatDateMySQL()
            detail.created_by = (vendor.created_by) ? vendor.created_by : created_by
            detail.date_modified = (vendor.date_modified) ? vendor.date_modified : formatDateMySQL()
            detail.modified_by = (vendor.modified_by) ? vendor.modified_by : modified_by
            detail.note = (vendor.note) ? vendor.note : null
        }
        
        Vendor.detail = detail
        return detail
    }
    
    const load_all = function (vendors) {
        Vendor.all = new Map()
        
        if (!vendors) {
            return
        }
        $.each(vendors, function (i, vendor) {
            let detail = set(vendor)
            Vendor.all.set("id", detail)
        })
        
        console.log(" Vendor.all", Vendor.all)
    }
    
    const init = function (settings) {
        if (_vendor_name) {
            init_autocomplete()
        }
        
        /**
         * created_by: 4
         * date_created: "10/25/2021"
         * date_modified: "10/25/2021"
         * enabled: 1
         * id: 1
         * is_provider: 1
         * modified_by: 4
         * note: null
         * show_online: 1
         * show_ops: 1
         * show_sales: 1
         * sku: "SKU0000001"
         */
        if (_vendor_sku) {
            _vendor_sku.value = settings.sku
            _vendor_id.value = settings.id
            _vendor_enabled.checked = (settings.enabled === 1)
            _vendor_is_provider.checked = (settings.is_provider === 1)
            _vendor_show_online.checked = (settings.show_online === 1)
            _vendor_show_ops.checked = (settings.show_ops === 1)
            _vendor_show_sales.checked = (settings.show_sales === 1)
        }
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
        init: function (settings) {
            //init(settings)
        },
    }
    
})()

    
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
    "use strict"
    
    const base_url = "/pricing_strategy_types"
    const _input_pricing_strategy_types_id = document.getElementById("input_pricing_strategy_types_id")
    const _input_pricing_strategy_types_name = document.getElementById("input_pricing_strategy_types_name")
    const _input_pricing_strategy_types_enabled = document.getElementById("input_pricing_strategy_types_enabled")
    const _input_pricing_strategy_types_date_created = document.getElementById("input_pricing_strategy_types_date_created")
    const _input_pricing_strategy_types_created_by = document.getElementById("input_pricing_strategy_types_created_by")
    const _input_pricing_strategy_types_date_modified = document.getElementById("input_pricing_strategy_types_date_modified")
    const _input_pricing_strategy_types_modified_by = document.getElementById("input_pricing_strategy_types_modified_by")
    const _input_pricing_strategy_types_note = document.getElementById("input_pricing_strategy_types_note")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
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
        //console.log(' -- PricingStrategyTypes -- ', {})
    }
    
    const set = function (pricing_strategy_types) {
        let detail = _default_detail()
        if (pricing_strategy_types) {
            detail.id = (pricing_strategy_types.id) ? pricing_strategy_types.id : null
            detail.name = (pricing_strategy_types.name) ? pricing_strategy_types.name : null
            detail.enabled = (pricing_strategy_types.enabled) ? pricing_strategy_types.enabled : 1
            detail.date_created = (pricing_strategy_types.date_created) ? pricing_strategy_types.date_created : formatDateMySQL()
            detail.created_by = (pricing_strategy_types.created_by) ? pricing_strategy_types.created_by : created_by
            detail.date_modified = (pricing_strategy_types.date_modified) ? pricing_strategy_types.date_modified : formatDateMySQL()
            detail.modified_by = (pricing_strategy_types.modified_by) ? pricing_strategy_types.modified_by : modified_by
            detail.note = (pricing_strategy_types.note) ? pricing_strategy_types.note : null
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
            PricingStrategyTypes.all.set("id", detail)
        })
        
        console.log(" PricingStrategyTypes.all", PricingStrategyTypes.all)
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
    "use strict"
    
    const base_url = "/status_types"
    const _input_status_types_id = document.getElementById("input_status_types_id")
    const _input_status_types_name = document.getElementById("input_status_types_name")
    const _input_status_types_enabled = document.getElementById("input_status_types_enabled")
    const _input_status_types_date_created = document.getElementById("input_status_types_date_created")
    const _input_status_types_created_by = document.getElementById("input_status_types_created_by")
    const _input_status_types_date_modified = document.getElementById("input_status_types_date_modified")
    const _input_status_types_modified_by = document.getElementById("input_status_types_modified_by")
    const _input_status_types_note = document.getElementById("input_status_types_note")
    const _input_status_types_sort_order = document.getElementById("input_status_types_sort_order")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
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
            sort_order: null,
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
        console.log(" -- StatusTypes -- ", {})
    }
    
    const set = function (status_types) {
        let detail = _default_detail()
        if (status_types) {
            detail.id = (status_types.id) ? status_types.id : null
            detail.name = (status_types.name) ? status_types.name : null
            detail.enabled = (status_types.enabled) ? status_types.enabled : 1
            detail.date_created = (status_types.date_created) ? status_types.date_created : formatDateMySQL()
            detail.created_by = (status_types.created_by) ? status_types.created_by : created_by
            detail.date_modified = (status_types.date_modified) ? status_types.date_modified : formatDateMySQL()
            detail.modified_by = (status_types.modified_by) ? status_types.modified_by : modified_by
            detail.note = (status_types.note) ? status_types.note : null
            detail.sort_order = (status_types.sort_order) ? status_types.sort_order : null
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
            StatusTypes.all.set("id", detail)
        })
        
        //console.log(' StatusTypes.all',  StatusTypes.all);
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
        
        //console.log(types_name, Types[types_name])
    }
    
    const init = function (settings) {
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
        
        console.log("settings", settings)
        
        if (settings.countries) {
            Country.load_all(settings.countries)
            console.log(Country.all)
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
    // ----
    const init = function (settings) {
        //console.log("login", {})
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
    //Buttons
    const _button_add_provider_page_heading = document.getElementById("button_add_provider_page_heading")
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
    
    const handle_provider_error = function (msg) {
        toastr.error(msg)
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
     * pupulate provider form
     *
     * @param provider
     */
    const populate_form = function (provider) {
        if (provider) {
            log("provider", provider)
            _provider_id.value = (provider.id) ? provider.id : null
            _provider_name.value = (provider.name) ? provider.name : null
            _provider_code_direct_id.value = (provider.code_direct_id) ? provider.code_direct_id : null
            _provider_enabled.checked = (provider.enabled === 1)
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
    
    }
    
    const set = function (provider) {
        let detail = _default_detail()
        //log("Provider.set", provider)
        if (provider) {
            detail.id = (provider.id) ? provider.id : null
            detail.name = (provider.name) ? provider.name : null
            detail.location_id = (provider.location_id) ? provider.location_id : null
            detail.code_direct_id = (provider.code_direct_id) ? provider.code_direct_id : null
            detail.provider_vendor = (provider.provider_vendor) ? provider.provider_vendor : 1
            detail.enabled = (provider.enabled) ? provider.enabled : 1
            detail.date_created = (provider.date_created) ? provider.date_created : formatDateMySQL()
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
    
    const index = function (settings) {
        build_index_table()
        
        if (settings) {
            if (settings.providers) {
                load_all(settings.providers)
            }
        }
        
    }
    
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
    
    const edit = function (settings) {
        let addresses = []
        let contacts = []
        let provider_detail = {}
        let location = {}
        let company = {}
        let vendor = {}
        
        if (settings.provider_detail) {
            provider_detail = settings.provider_detail
            if (provider_detail.location) {
                location = provider_detail.location
            }
        }
        
        if (settings.address_detail) {
            addresses = settings.address_detail
        }
        
        if (settings.contact_detail) {
            contacts = settings.contact_detail
        }
        
        //if (settings.vendor_detail) {
        //vendor = settings.vendor_detail
        //}
        
        //log("settings", settings)
        
        let provider = set(provider_detail)
        
        //if (settings.provider_detail.vendor) {
        //Vendor.init(settings.provider_detail.vendor)
        //}
        
        Contact.init(contacts)
        Address.init(addresses)
        Address.load_all(addresses)
        Location.init(location)
        init_autocomplete()
        populate_form(provider_detail)
    }
    
    const init_autocomplete = function () {
        
        $(_provider_name)
          .on("change", function () {
          
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
                  if (suggestion.data) {
                      let provider = suggestion.data
                      let provider_id = provider.id
                      let provider_company_id = provider.company.id
                      _provider_id.value = provider_id
                      _provider_company_id.value = provider_company_id
                  }
                  // --
                  //log("Provider.suggestion", suggestion.data)
                  //globalSelectedProvider = true
                  //_provider_company_id.value = suggestion.data.company_id
                  //_provider_id.value = suggestion.data.provider_id
                  //_provider_name.value = suggestion.data.company_name
              },
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
        edit: function (settings) {
            edit(settings)
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
