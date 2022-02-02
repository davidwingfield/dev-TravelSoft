const mySQLDate = ""
const defaultLocationDisplayFormat = "medium" //long medium short
const sideNavOptions = {
    edge: "left", // Choose the horizontal origin
    closeOnClick: false, // Closes side-nav on &lt;a&gt; clicks, useful for Angular/Meteor
    breakpoint: 1199, // Breakpoint for button collapse
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
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "md-toast-bottom-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": 300, //300,
    "hideDuration": 1000,
    "timeOut": 5000,
    "extendedTimeOut": 1000,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut",
}
let dow_short = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
]
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
const short_dexcription_max = 250
const colorScheme = new Map()
const toggleAJAXResponse = false
const debugMode = true

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
const defaultAddressView = "medium"
let DEBUGMODE = true

const initialCalenderViewCount = 12


let mdbPreloader = document.getElementById("mdb-preloader")
/*
let showElements
let isShiftTime
let separator = "-"
let separatorTime = ":"

const IsNumericTime = function (input, keyCode) {
    if (!isNaN(parseInt(keyCode))) {
        keyCode = parseInt(keyCode)
    }
    
    if (keyCode === 16) {
        isShiftTime = true
    }
    
    if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || (keyCode === 8) || (keyCode === 46)) {
        if (keyCode !== 16) {
            if ((input.value.length === 2) && keyCode !== 8) {
                input.value += separatorTime
            }
            
            return true
        }
    }
    
    return false
}

const validateTimeFormat = function (input, keyCode) {
    let timeString = input.value
    let regex = /^\d{2,}:(?:[0-5]\d):(?:[0-5]\d)$/i
    
    if (keyCode === 16) {
        isShift = false
    }
    
    if (regex.test(timeString) || timeString.length === 0) {
        $(input).unSetError()
    } else {
        $(input).setError("Invalid Time. Only HH-MM format allowed.")
    }
}

$.fn.unSetError = function () {
    let errorElm = this.parents("div.form-element").find("div.error")
    
    if (this.hasClass("time-format")) {
    
    }
    
    if (this.hasClass("date-format")) {
    
    }
    
    errorElm.html("&nbsp;").hide()
    return this
}

$.fn.setError = function (msg) {
    let errorElm = this.parents("div.form-element").find("div.error")
    
    if (this.hasClass("time-format")) {
        errorElm = this.parent("div.input-group").parent().find("div.error")
    }
    
    if (this.hasClass("date-format")) {
        errorElm = this.parents("div.form-element").find("div.error")
    }
    
    errorElm.html(msg).show()
    return this
}
//*/
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

const clearAllValidation = function () {
    $("div.error").html(`&nbsp;`).hide()
    $(".is-invalid").removeClass("is-invalid")
}

$.fn.showError = function (msg) {
    let $element = this
    let $errorElement = $element.parents("div.form-element").find("div.error")
    
    $element.addClass("is-invalid")
    $errorElement.html(msg).show()
    return this
}

$.fn.hideError = function () {
    let $element = this
    let $errorElement = $element.parents("div.form-element").find("div.error")
    
    $element.removeClass("is-invalid")
    $errorElement.html(`&nbsp;`).hide()
    return this
}

const hexToRgb = hex =>
    hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
            , (m, r, g, b) => "#" + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16))

jQuery.fn.dataTable.Api.register("page.jumpToData()", function (data, column) {
    var pos = this.column(column, {
        order: "current",
    }).data().indexOf(data)
    
    if (pos >= 0) {
        var page = Math.floor(pos / this.page.info().length)
        this.page(page).draw(false)
    }
    
    return this
})

const isOdd = function (num) {
    return num % 2
}

const clearValidation = function (formElement) {
    $(".autocomplete-suggestions").hide()
    var validator = $(formElement).validate()
    
    $("[name]", formElement).each(function () {
        validator.successList.push(this)
        validator.showErrors()
    })
    
    $(".is-invalid").each(function () {
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
            var errors = validator.numberOfInvalids()
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

const jsonPrettify = (json) => {
    if (typeof json === "object" && json !== null) {
        return JSON.stringify(json, undefined, '\t')
    }
    
    try {
        const obj = JSON.parse(json)
        return jsonPrettify(obj)
    } catch (e) {
        return json
    }
}

const setError = function (element, msg) {
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
    
    $(error_el).append(`<span id="#${id}-error" class="invalid">${msg}</span>`)
}

const clearError = function (element) {
    let id = $(element).attr("id")
    let el = $("#" + id + "")
    let error_el = $("#" + id + "-error")
    
    if (error_el.attr("data-ref")) {
        $("#" + error_el.attr("data-ref")).removeClass("is-invalid")
    } else {
        el.parent().find("span.select2").removeClass("is-invalid")
        el.removeClass("is-invalid")
    }
    
    if (error_el) {
        $(error_el).empty()
        error_el.css({ "display": "none" })
        
    }
    
}

const toNumbers = arr => arr.map(Number)

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

const removeNulls = function (obj) {
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

const formatListOfIds = function (list) {
    let vals = ""
    if (list && typeof list === "object") {
        vals = list.join(',')
    }
    return vals
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
                console.log("data.error", data.error)
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
            /*
            console.log("data", data)
            console.log("status", status)
            console.log("xhr", xhr)
            console.log("typeof data.result", typeof data.result)
            //*/
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
    console.log("jqXHR", jqXHR.responseText)
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
    error.jqXHR = jqXHR
    return error
}

const handleError = function (msg) {
    if (!msg) {
        msg = "3Error processing request"
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

const findObjectByKey = function (array, key, value) {
    let results = []
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            results.push(array[i])
        }
    }
    
    return results
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

/**
 * converts HTML entities in the string to their corresponding characters.
 *
 * @param value
 * @returns {*|jQuery}
 */
const htmlDecode = function (value) {
    return $("<textarea/>").html(value).text()
}

const is_null = function (val) {
    return val === null || val === undefined
}

/**
 * converts HTML entities in the string to their corresponding characters.
 *
 * @param str
 * @returns {*}
 */
function decodeHtml (str) {
    if (!str) {
        str = ""
    }
    var map =
        {
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            "&quot;": "\"",
            "&#039;": "'",
        }
    return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function (m) {return map[m]})
}

/**
 * escape html chars
 *
 * @param text
 * @returns {string}
 */
function escapeHtml (text) {
    if (!text) {
        text = ""
    }
    var map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#039;",
    }
    
    return text.replace(/[&<>"']/g, function (m) { return map[m] })
}

const setInt = function (val) {
    let returnVal = null
    if (val) {
        if (!isNaN(parseInt(val))) {
            returnVal = val
        }
    }
    return returnVal
}

const htmlEncode = function (value) {
    return $("<textarea/>").text(value).html()
}

const paddy = function (num, padlen, padchar) {
    var pad_char = typeof padchar !== "undefined" ? padchar : "0"
    var pad = new Array(1 + padlen).join(pad_char)
    return (pad + num).slice(-pad.length)
}

const generateCodeDirectId = function (provider) {
    if (!provider) {
        return ""
    }
    
    return "D" + paddy(14, 11)
}

const getDate = function (element) {
    return element.pickadate("picker").get()
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
            /*
            if (toggleAJAXResponse) {
                const link = document.createElement("a")
                link.id = 'someLink' //give it an ID!
                link.href = "javascript:void(0);"
                link.addEventListener("click", function () {
                    var file = new Blob([jqXHR.responseText], { type: "text/html" })
                    var fileURL = URL.createObjectURL(file)
                    var win = window.open()
                    win.document.write('<iframe src="' + fileURL + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>')
                })
                let pageFrame = document.getElementById("page")
                pageFrame.appendChild(link)
                document.getElementById("someLink").click()
                link.removeEventListener("click")
                pageFrame.parentNode.removeChild(link)
            }
            //*/
            /*
            console.log("jqXHR", jqXHR)
            console.log("jqXHR", jqXHR.responseText)
            console.log("_display_ajax_error", _display_ajax_error(jqXHR, textStatus, url))
            console.log("textStatus", textStatus)
            console.log("msg", msg)
            console.log('http://dev.travelsoft.com/error')
            //*/
            if (typeof textStatus !== "undefined") {
                console.error("Request failed", _display_ajax_error(jqXHR, textStatus, url))
            } else {
                console.error("Request failed", _display_ajax_error(jqXHR, textStatus, url))
            }
            
            if ($.isFunction(callback)) {
                if (jqXHR.responseJSON) {
                    callback(jqXHR, "failed")
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

const infoDialog = function (message, handler) {
    $(`
        <!--Modal: modalConfirm-->
        <div class="modal fade" id="modalConfirm" tabindex="-1" role="dialog" aria-labelledby="modalConfirmationLabel" aria-hidden="true">
	<div class="modal-dialog modal-sm modal-notify modal-info" role="document">
		<!--Content-->
		<div class="modal-content text-center">
			<!--Header-->
			<div class="modal-header d-flex justify-content-center">
				<p class="heading">${message}</p>
			</div>

			<!--Body-->
			<div class="modal-body">
				<i class="fas fa-info fa-4x animated rotateIn"></i>
			</div>

			<!--Footer-->
			<div class="modal-footer flex-center">
				<a class="btn btn-outline-info btn-yes">yes</a>
				<a type="button" class="btn btn-info waves-effect btn-no">no</a>
			</div>
		</div>
		<!--/.Content-->
	</div>
</div>
        <!--Modal: modalConfirm-->
    `).appendTo("body")
    
    const modal = document.getElementById("modalConfirm")
    
    if (modal) {
        const $modal = $(modal)
        //Trigger the modal
        $modal
            .modal({
                backdrop: "static",
                keyboard: false,
            })
        
        //Pass true to a callback function
        $(".btn-yes")
            .click(function () {
                handler(true)
                $modal
                    .modal("hide")
            })
        
        //Pass false to callback function
        $(".btn-no")
            .click(function () {
                handler(false)
                $modal
                    .modal("hide")
            })
        
        //Remove the modal once it is closed.
        $modal
            .on("hidden.bs.modal", function () {
                $modal
                    .remove()
            })
    }
    
}

const confirmDialog = function (message, handler) {
    $(`
        <!--Modal: modalConfirm-->
        <div class="modal fade" id="modalConfirm" tabindex="-1" role="dialog" aria-labelledby="modalConfirmationLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm modal-notify modal-info" role="document">
                <!--Content-->
                <div class="modal-content text-center">
                    <!--Header-->
                    <div class="modal-header d-flex justify-content-center">
                        <p class="heading">${message}</p>
                    </div>
                    <!--/.Header-->
                    
                    <!--Body-->
                    <div class="modal-body">
                        <i class="fas fa-check fa-4x mb-3 animated rotateIn"></i>
                    </div>
                    <!--/.Body-->
                   
        
                    <!--Footer-->
                    <div class="modal-footer flex-center">
                        <a type="button" class="btn btn-outline-info btn-sm waves-effect btn-no">no</a>
                        <a class="btn btn-info btn-sm btn-yes">yes</a>
                    </div>
                    <!--/.Footer-->
                    
                </div>
                
                <!--/.Content-->
	        </div>
        </div>
        <!--Modal: modalConfirm-->
    `)
        .appendTo("body")
    
    const modal = document.getElementById("modalConfirm")
    
    if (modal) {
        
        const $modal = $(modal)
        
        $modal
            .modal({
                backdrop: "static",
                keyboard: false,
            })
        
        //Pass true to a callback function
        $(".btn-yes")
            .on("click", function () {
                handler(true)
                $modal
                    .modal("hide")
            })
        
        //Pass false to callback function
        $(".btn-no")
            .click(function () {
                handler(false)
                $("#modalConfirm")
                    .modal("hide")
            })
            .on("click", function () {
                handler(false)
                $modal
                    .modal("hide")
            })
        
        //Remove the modal once it is closed.
        $modal
            .on("hidden.bs.modal", function () {
                $("#modalConfirm")
                    .remove()
            })
    }
    
}

const deleteDialog = function (message, handler) {
    
    $(`
        <!--Modal: modalConfirm-->
        <div class="modal fade" id="modalConfirm" tabindex="-1" role="dialog" aria-labelledby="modalConfirmationLabel" aria-hidden="true">
	<div class="modal-dialog modal-sm modal-notify modal-danger" role="document">
		<!--Content-->
		<div class="modal-content text-center">
			<!--Header-->
			<div class="modal-header d-flex justify-content-center">
				<p class="heading">${message}</p>
			</div>

			<!--Body-->
			<div class="modal-body">
				<i class="fas fa-times fa-4x animated rotateIn"></i>
			</div>

			<!--Footer-->
			<div class="modal-footer flex-center">
				<a class="btn btn-outline-danger btn-yes">yes</a>
				<a type="button" class="btn btn-danger waves-effect btn-no">no</a>
			</div>
		</div>
		<!--/.Content-->
	</div>
</div>
        <!--Modal: modalConfirm-->
    `)
        .appendTo("body")
    //Trigger the modal
    $("#modalConfirm")
        .modal({
            backdrop: "static",
            keyboard: false,
        })
    
    //Pass true to a callback function
    $(".btn-yes")
        .click(function () {
            handler(true)
            $("#modalConfirm")
                .modal("hide")
        })
    
    //Pass false to callback function
    $(".btn-no")
        .click(function () {
            handler(false)
            $("#modalConfirm")
                .modal("hide")
        })
    
    //Remove the modal once it is closed.
    $("#modalConfirm")
        .on("hidden.bs.modal", function () {
            $("#modalConfirm")
                .remove()
        })
    
}

const formatURL = function (param) {
    console.log("formatURL()", param)
    return encodeURIComponent(param.trim())
}

const buildMapsURL = function (location) {
    console.log("buildMapsURL(location)", location)
    let street_1, street_2, zipcode, city_name, province_name, country_name
    
    street_1 = (location.street_1) ? location.street_1 : null
    street_2 = (location.street_2) ? location.street_2 : null
    zipcode = (location.zipcode) ? location.zipcode : null
    city_name = (location.city.name) ? location.city.name : null
    province_name = (location.province.iso2) ? location.province.iso2 : (location.province.iso3) ? location.province.iso3 : (location.province.name) ? location.province.name : null
    country_name = (location.province.name) ? location.country.name : (location.country.iso2) ? location.country.iso2 : (location.country.iso3) ? location.country.iso3 : null
    
    street_1 = (street_1 !== null) ? street_1 : null
    street_2 = (street_2 !== null) ? street_2 : null
    zipcode = (zipcode !== null) ? zipcode : null
    city_name = (city_name !== null) ? city_name : null
    province_name = (province_name !== null) ? province_name : null
    country_name = (country_name !== null) ? country_name : null
    
    /*
    
    // Viale Rinascimento, 141, 63074 San Benedetto del Tronto AP, Italy
    // +39 0735 615400
    // https://www.smeraldosuitehotel.com/
    // CITY - San Benedetto Del Tronto: 844
    // PROVINCE - Ascoli Piceno: 186
    // COUNTRY - Italy: 102
    
    console.log("street_1", street_1)
    console.log("street_2", street_2)
    console.log("city_name", city_name)
    console.log("province_name", province_name)
    console.log("country_name", country_name)
    console.log("zipcode", zipcode)
    //*/
    
    let tempURL = []
    
    if (!is_null(street_1)) {
        tempURL.push(street_1)
    }
    
    if (!is_null(street_2)) {
        tempURL.push(street_2)
    }
    
    if (!is_null(city_name)) {
        //tempURL.push(city_name)
    }
    
    let provinceLine = ""
    
    if (!is_null(city_name) && !is_null(province_name) && !is_null(zipcode)) {
        provinceLine = zipcode + " " + city_name + " " + province_name
    } else if (is_null(city_name) && !is_null(province_name) && !is_null(zipcode)) {
        provinceLine = zipcode + " " + province_name
    } else if (is_null(city_name) && is_null(province_name) && !is_null(zipcode)) {
        provinceLine = zipcode
    } else if (!is_null(city_name) && is_null(province_name) && !is_null(zipcode)) {
        provinceLine = zipcode + " " + city_name
    } else if (!is_null(city_name) && !is_null(province_name) && is_null(zipcode)) {
        provinceLine = city_name + " " + province_name
    } else {
    
    }
    if (provinceLine !== "") {
        tempURL.push(provinceLine)
    }
    
    if (!is_null(country_name)) {
        tempURL.push(country_name)
    }
    
    let location_formatted = tempURL.join(", ")
    location_formatted = formatURL(location_formatted)
    return `https://maps.google.com/maps?q=${location_formatted}&t=&z=7&ie=UTF8&iwloc=&output=embed`
}

const weatherUpdate = function (city) {
    const xhr = new XMLHttpRequest()
    const apiKey = "2ad550b2d7e352b38c3ca9da8396aade"
    let cityName = city
    xhr.open(
        "GET",
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
    
    xhr.send()
    xhr.onload = () => {
        if (xhr.status === 404) {
            //console.log(`${cityName} not found`)
        } else {
            let data = JSON.parse(xhr.response)
            let mainWeatherCityName = data.name
            let mainWeatherTemperature = `${Math.round(data.main.temp - 273.15)}°C`
            let mainWeather = data.weather[0].main
            let mainWeatherDescription = data.weather[0].description
            let mainWeatherImage = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            //console.log("mainWeatherCityName", mainWeatherCityName)
            //console.log("mainWeatherTemperature", mainWeatherTemperature)
            //console.log("mainWeather", mainWeather)
            //console.log("mainWeatherDescription", mainWeatherDescription)
            //console.log("mainWeatherImage", mainWeatherImage)//100x100
            //console.log("data", data)
        }
    }
}

const ucwords = function (str) {
    str = str.toLowerCase()
    return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
        function (s) {
            return s.toUpperCase()
        })
}

String.prototype.ucwords = function () {
    str = this.toLowerCase()
    return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
        function (s) {
            return s.toUpperCase()
        })
}

//

/**
 * DEBUG
 */
$(function () {
    $(".debug")
        .on("click", function () {
            showElements = true
            if (!$(this).attr("data-shown")) {
                $(this).attr("data-shown", "true")
                showElements = true
            }
            
            if ($(this).attr("data-shown") === "false") {
                $(this).attr("data-shown", "true")
                showElements = true
            } else {
                showElements = false
                $(this).attr("data-shown", "false")
            }
            
            let els = document.getElementsByClassName("dev-element")
            
            for (let i = 0; i < els.length; i++) {
                
                let element = els[i]
                let tagName = element.tagName
                
                if (tagName.toLowerCase() === "input") {
                    
                    if (showElements === false) {
                        element.hidden = false
                        element.type = "text"
                    } else {
                        element.hidden = true
                        element.type = "hidden"
                    }
                } else if (tagName.toLowerCase() === "label") {
                    if (showElements === false) {
                        $(element).removeClass("d-none")
                    } else {
                        $(element).addClass("d-none")
                    }
                }
            }
        })
    
    $(".debug_demo")
        .on("click", function () {
            showElements = true
            if (!$(this).attr("data-shown")) {
                $(this).attr("data-shown", "true")
                showElements = true
            }
            
            if ($(this).attr("data-shown") === "false") {
                $(this).attr("data-shown", "true")
                showElements = true
            } else {
                showElements = false
                $(this).attr("data-shown", "false")
            }
            
            let els = document.getElementsByClassName("dev-element")
            
            for (let i = 0; i < els.length; i++) {
                
                let element = els[i]
                let tagName = element.tagName
                
                if (tagName.toLowerCase() === "input") {
                    
                    if (showElements === false) {
                        element.hidden = false
                        element.type = "text"
                    } else {
                        element.hidden = true
                        element.type = "hidden"
                    }
                } else if (tagName.toLowerCase() === "label") {
                    if (showElements === false) {
                        $(element).removeClass("d-none")
                    } else {
                        $(element).addClass("d-none")
                    }
                }
            }
        })
})

const Console = (function () {
    
    return {
        error: function () {
        
        },
        log: function () {
            let title, type, vals
            
            if (DEBUGMODE) {
                if (arguments.length > 0) {
                    if (arguments.length === 1) {
                        title = "Log Object"
                        vals = arguments[0]
                    }
                    
                    if (arguments.length === 2) {
                        
                        if (typeof arguments[0] === "string") {
                            title = arguments[0]
                        } else {
                            title = "Log Object"
                            vals = arguments[0]
                        }
                        
                        if (typeof arguments[1] === "object") {
                            type = " [object] "
                            vals = arguments[1]
                        } else if (typeof arguments[1] === "boolean") {
                            type = " [boolean] "
                            vals = arguments[1]
                        } else if (typeof arguments[1] === "number") {
                            type = " [number] "
                            vals = arguments[1]
                        } else if (typeof arguments[1] === "bigint") {
                            type = " [bigint] "
                            vals = arguments[1]
                        } else if (typeof arguments[1] === "string") {
                            type = " [string] "
                            vals = arguments[1]
                        } else if (typeof arguments[1] === "symbol") {
                            type = " [symbol] "
                            vals = arguments[1]
                        } else if (typeof arguments[1] === "function") {
                            type = " [function] "
                            vals = arguments[1]
                        } else {
                            type = " [other] "
                            vals = arguments[1]
                        }
                        
                        console.log(title + type, vals)
                    }
                }
            }
        },
    }
})()

$.fn.formFields = function (settings) {
    "use strict"
    let id = $(this).attr("id")
    let form = document.getElementById(id)
    let elements = form.elements
    let pre = document.createElement("pre")
    let code = document.createElement("code")
    let data = ""
    let vals = ""
    
    code.id = "constantFields"
    code.classList = [`language-javascript`]
    
    pre.appendChild(code)
    form.appendChild(pre)
    
    for (var n = 0; n < elements.length; n++) {
        let el = elements[n]
        if (el.id) {
            let id = el.id
            let constantField = `const _${id} = document.getElementById('${id}')\n`
            let constantValue = `_${id}.value = ""\n`
            data += constantField
            vals += constantValue
        }
        
    }
    
    $(code).attr("data-prismjs-copy", 'Copy the JavaScript snipp')
    code.innerHTML = data + "\n" + vals
    Prism.highlightElement(code)
}

jQuery(($) => {
    $.fn.dateSelect = function (opt) {
        let element = $(this)
        let elementId = element.attr("id")
        let separatorDate = "-"
        
        element.attr("id", "date-selector-" + elementId)
        
        let $element, $elementWrapper, $elementGroupWrapper, $elementGroupAppend, $buttonGroupAppend,
            $input, $inputLabel, $errorElement, $buttonGroupAppendClear, input, picker
        
        let defaults = {
            
            // Strings and translations
            monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            weekdaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            showMonthsShort: undefined,
            showWeekdaysFull: undefined,
            
            // Buttons
            today: 'Today',
            clear: 'Clear',
            close: 'Close',
            
            // Accessibility labels
            labelMonthNext: 'Next month',
            labelMonthPrev: 'Previous month',
            labelMonthSelect: 'Select a month',
            labelYearSelect: 'Select a year',
            
            // Formats
            format: "yyyy-mm-dd",
            formatSubmit: "yyyy-mm-dd",
            hiddenPrefix: undefined,
            hiddenSuffix: '_submit',
            hiddenName: undefined,
            
            // Editable input
            editable: undefined,
            
            // Dropdown selectors
            selectYears: undefined,
            selectMonths: undefined,
            
            // First day of the week
            firstDay: undefined,
            
            // Date limits
            min: undefined,
            max: undefined,
            
            // Disable dates
            disable: undefined,
            
            // Root picker container
            container: undefined,
            
            // Hidden input container
            containerHidden: undefined,
            
            // Close on a user action
            closeOnSelect: true,
            closeOnClear: true,
            
            // Events
            onStart: undefined,
            onRender: undefined,
            onOpen: undefined,
            onClose: undefined,
            onSet: undefined,
            onStop: undefined,
        }
        
        let settings = {
            label: "Date",
            placeholder: "Select Date",
        }
        
        const isNumeric = function (input, keyCode) {
            if (!isNaN(parseInt(keyCode))) {
                keyCode = parseInt(keyCode)
            }
            
            if (keyCode === 16) {
                isShift = true
            }
            
            if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || (keyCode === 8) || (keyCode === 46)) {
                
                if (keyCode !== 16) {
                    if ((input.value.length === 4 || input.value.length === 7) && keyCode !== 8) {
                        input.value += separatorDate
                    }
                    
                    return true
                }
                
            }
            
            return false
        }
        
        const loadError = function (input) {
            let $errorElement = $(input).parents("div.form-element").find("div.error")
            
            $errorElement.html("Invalid Date. Only YYYY-MM-DD format allowed.").show()
        }
        
        const unSetDateError = function (input) {
            let $errorElement = $(input).parents("div.form-element").find("div.error")
            
            $errorElement.html("").hide()
        }
        
        const validateDateFormat = function (input, keyCode) {
            let dateString = input.value
            let regex = /(((19|20)\d\d)\-(0[1-9]|1[0-2])\-((0|1)[0-9]|2[0-9]|3[0-1]))$/
            
            if (keyCode === 16) {
                isShift = true
            }
            
            if (regex.test(dateString) || dateString.length === 0) {
                unSetDateError(input)
                DateSelect.picker.set("select", dateString, { format: "yyyy-mm-dd" })
                DateSelect.picker.render()
            } else {
                loadError(input)
            }
        }
        
        const buildElements = function (element, opt) {
            $element = element
            $elementWrapper = $("<div>")
                .addClass(`form-element`)
            
            $elementGroupWrapper = $("<div>")
                .addClass(`input-group`)
            
            $elementGroupAppend = $("<div>")
                .addClass(`input-group-append`)
            
            $buttonGroupAppend = $("<button type='button'>")
                .attr("id", "button-" + elementId)
                .attr("type", "button")
                .addClass(`btn btn-md btn-secondary m-0 px-3 py-2 z-depth-0 waves-effect waves-light`)
                .html('<i class="fas fa-calendar-alt"></i>')
                .on("click", function (e) {
                    e.preventDefault()
                })
            
            $buttonGroupAppendClear = $("<button type='button'>")
                .attr("id", "button-clear-" + elementId)
                .addClass(`btn btn-md btn-outline-danger m-0 px-3 py-2 z-depth-0 waves-effect waves-light`)
                .html('<i class="fas fa-ban"></i>')
                .on("click", function () {
                    DateSelect.clear()
                    $input.val("").trigger("change")
                    unSetDateError($input[0])
                })
            
            $input = $("<input>")
                .addClass("form-control date-format")
                .attr("id", elementId)
                .attr("type", "text")
                .attr("placeholder", settings.placeholder)
                .attr("maxlength", "10")
                .on("keydown", function (event) {
                    return isNumeric(this, event.keyCode)
                })
                .on("keyup", function (event) {
                    validateDateFormat(this, event.keyCode)
                    toggleClearButton()
                })
                .on("change", function () {
                    toggleClearButton()
                })
            
            $inputLabel = $("<label>")
                .attr("for", elementId)
                .html(settings.label)
            
            $errorElement = $("<div>")
                .addClass("error w-100 text-center")
        }
        
        const toggleClearButton = function () {
            if ($input.val() !== "") {
                $buttonGroupAppendClear.show()
                let id = $input.attr("id")
                clearError(document.getElementById(id))
            } else {
                $buttonGroupAppendClear.hide()
            }
        }
        
        const setWrapper = function (element, opt) {
            buildElements(element, opt)
            $elementGroupAppend.append($buttonGroupAppendClear, $buttonGroupAppend)
            $elementGroupWrapper.append($input, $elementGroupAppend)
            $elementWrapper.append($inputLabel, $elementGroupWrapper, $errorElement)
            $element.append($elementWrapper)
            picker = $buttonGroupAppend.pickadate("picker")
        }
        
        const assignOptions = function (newOptions) {
            if (newOptions) {
                $.each(newOptions, function (k, v) {
                    defaults[k] = v
                })
            }
            
        }
        
        const clear = function () {
            
            if (DateSelect.picker.clear()) {
                DateSelect.picker.clear()
                DateSelect.picker.set("select", moment().format("YYYY-MM-DD"), { format: "yyyy-mm-dd" })
                DateSelect.picker.render()
                unSetDateError($input[0])
            }
        }
        
        const set = function (opts) {
            if (!opts) {
                opts = {}
            }
            
            DateSelect.picker.set(opts, { muted: true })
            
        }
        
        const value = function (date) {
            
            if (date) {
                DateSelect.picker.set("select", date, { format: "yyyy-mm-dd" })
                DateSelect.picker.render()
                return null
            } else {
                return ($input.val() === "") ? null : $input.val()
            }
            
        }
        
        const DateSelect = {
            picker: null,
            val: null,
            fooListener: function (val) {},
            registerNewListener: function (externalListenerFunction) {
                this.fooListener = externalListenerFunction
            },
            set: function () {
                set()
            },
            value: function (dataValue) {
                if (!dataValue) {
                    dataValue = null
                }
                return value(dataValue)
            },
            clear: function () {
                clear()
            },
            init: function (element, opt) {
                init(element, opt)
            },
        }
        
        const init = function (element, opt) {
            assignOptions(opt)
            
            settings.label = ($(element).attr("data-label")) ? $(element).attr("data-label") : "Date"
            settings.placeholder = ($(element).attr("data-placeholder")) ? $(element).attr("data-placeholder") : "Select Date"
            
            setWrapper(element, opt)
            
            $buttonGroupAppend
                .pickadate(defaults)
                .on("change", function () {
                    if ($(this).val() === "") {
                        $input.val("")
                    } else {
                        $input.val($(this).val())
                    }
                    
                    $input.trigger("change")
                })
            
            picker = $buttonGroupAppend.pickadate("picker")
            toggleClearButton()
            DateSelect.picker = $buttonGroupAppend.pickadate("picker")
        }
        
        init(element, opt)
        return DateSelect
    }
})


const tinyEditor = (function () {
    "use strict"
    let but_toggle
    
    const init = function (settings) {
        but_toggle = document.querySelectorAll(".but_toggle")
        but_toggle.forEach(el => el.addEventListener("click", event => {
            if (el.dataset.texted) {
                let editorId = el.dataset.texted
                let editor = $("#" + editorId)
                let cardBlock = editor.parents("div.card")
                if (tinyMCE.get(editorId)) {
                    editor.val(htmlEncode(editor.val()))
                    tinymce.remove("#" + editorId)
                    cardBlock.removeClass("is-fullscreen")
                } else {
                    editor.val(decodeHtml(editor.val()))
                    cardBlock.addClass("is-fullscreen")
                    addTinyMCE(editorId)
                }
            }
        }))
    }
    
    const addTinyMCE = function (el) {
        tinymce.init({
            selector: "#" + el,
            menubar: false,
            height: "400",
            plugins: "print visualblocks visualchars charmap hr pagebreak advlist lists",
            content_css: [
                "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
                "/public/css/bootstrap.min.css",
                "/public/css/style.css",
                "/public/css/variant.min.css",
            ],
            body_class: "p-2",
            font_formats: "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Open Sans=Open Sans;Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
            toolbar1: "undo redo | styleselect | fontselect fontsizeselect | removeformat | numlist bullist checklist | outdent indent ",
            toolbar2: "cut copy | bold italic underline strikethrough | forecolor | alignleft aligncenter alignright alignjustify | backcolor",
            content_style: "body { font-family:\"Open Sans\", sans-serif; font-size:14px; font-weight: 400 }",
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
                },
                
                {
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
    
    return {
        addTinyMCE: function (el) {
            addTinyMCE(el)
        },
        init: function () {
            init()
        },
    }
})()

$(document).ready(function () {
    $(function () {
        tinyEditor.init()
    })
})



const ContextMenu = (function () {
    "use strict"
    
    let $contextMenu
    
    const assignSeasonToDays = function () {
        console.log("ContextMenu:assignSeasonToDays()", ContextMenu)
    }
    
    const init = function (settings) {
        
        $contextMenu = $.contextMenu({
            selector: ".selected-day",
            callback: function (key, options) {
                switch (key.toLowerCase()) {
                    case "edit":
                        assignSeasonToDays()
                        break
                    default:
                        break
                }
            },
            items: {
                "edit": {
                    name: "Assign Season To Days",
                    icon: "edit",
                },
                "cut": {
                    name: "Cut",
                    icon: "cut",
                },
                "copy": {
                    name: "Copy",
                    icon: "copy",
                },
                "paste": {
                    name: "Paste",
                    icon: "paste",
                },
                "delete": {
                    name: "Delete",
                    icon: "delete",
                },
                "sep1": "---------",
                "quit": {
                    name: "Quit",
                    icon: function () {
                        return 'context-menu-icon context-menu-icon-quit'
                    },
                },
            },
        })
        
        $(".selected-day").on("click", function (e) {
            //console.log("clicked", this)
        })
    }
    
    return {
        init: function (settings) {
            init(settings)
        },
    }
})()

const Season = (function () {
    "use strict"
    const _edit_product_season = document.getElementById("edit_product_season")
    const _product_edit_season_form_edit_season_link = document.getElementById("product_edit_season_form_edit_season_link")
    const _product_season = document.getElementById("product_season")
    const _product_edit_season_form_season_name_filter = document.getElementById("product_edit_season_form_season_name_filter")
    const _category_id = document.getElementById("category_id")
    const _product_edit_season_form_season_color_scheme_id = document.getElementById("product_edit_season_form_season_color_scheme_id")
    const _product_edit_season_form_season_id = document.getElementById("product_edit_season_form_season_id")
    const _product_edit_season_form_season_name = document.getElementById("product_edit_season_form_season_name")
    const _product_edit_season_id_name_display = document.getElementById("product_edit_season_id_name_display")
    const _product_edit_season_form_season_enabled = document.getElementById("product_edit_season_form_season_enabled")
    const _edit_season_button = document.getElementById("edit_season_button")
    const _table_season_product_edit = document.getElementById("table_season_product_edit")
    const _button_clear_form_edit_season = document.getElementById("button_clear_form_edit_season")
    const _display_product_season_name = document.getElementById("display_product_season_name")
    const _button_submit_form_edit_season = document.getElementById("button_submit_form_edit_season")
    const _product_id = document.getElementById("product_id")
    const _panel_tab_season = document.getElementById("panel_tab_season")
    const _button_remove_season_from_product = document.getElementById("button_remove_season_from_product")
    const _calendar_loader = document.getElementById("calendar_loader")
    const _table_season_product_edit_add_new_button = document.getElementById("table_season_product_edit_add_new_button")
    const _product_edit_season_section = document.getElementById("product_edit_season_section")
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let categories = new Map()
    let $table_season_product_edit, disabledDays
    let globalSelectedSeason = false
    
    $(_table_season_product_edit_add_new_button)
        .on("click", function () {
            loadProductSeasonForm()
            _product_edit_season_form_season_name.disabled = false
            _product_edit_season_form_season_name.readonly = false
            
            ColorScheme.enable()
        })
    
    $(_button_remove_season_from_product)
        .on("click", function () {
            
            let dataToSend = {
                product_id: parseInt(_product_id.value),
                season_id: parseInt(_product_edit_season_form_season_id.value),
            }
            
            confirmDialog(`Would you like to update? This change may affect your Pricing Worksheets.`, (ans) => {
                if (ans) {
                    removeProductSeason(dataToSend)
                }
            })
        })
    
    $(_product_edit_season_form_edit_season_link)
        .on("click", function () {
            loadEditSeasonForm()
        })
    
    $(_edit_season_button)
        .on("click", function () {
            ColorScheme.enable()
        })
    
    $(_button_clear_form_edit_season)
        .on("click", function () {
            _product_edit_season_form_season_name_filter.value = ""
            resetForm()
            clearProductSeasonForm()
            $table_season_product_edit.clearSelectedRows()
        })
    
    $(_button_submit_form_edit_season)
        .on("click", function () {
            let dataToSend = buildUpdateRecord()
            
            confirmDialog(`Would you like to update? This change may affect your Pricing Worksheets.`, (ans) => {
                if (ans) {
                    saveProductSeason(dataToSend)
                }
            })
        })
    
    $(_panel_tab_season)
        .on("hide.bs.tab", function () {
            _product_edit_season_form_season_name_filter.value = ""
            resetForm()
            clearProductSeasonForm()
            $table_season_product_edit.clearSelectedRows()
        })
    
    const updateProgress = function () {
        let seasons = Array.from(Season.all.values())
        if (seasons.length === 0) {
            $(_panel_tab_season).html(`Season <span id="seasonNeedsAttention" class="badge rounded-pill badge-notification bg-danger">!</span>`)
        } else {
            $(_panel_tab_season).html(`Season`)
        }
        Product.updateProgress()
    }
    
    const saveProductSeason = function (dataToSend) {
        if (dataToSend) {
            $(_calendar_loader).fadeIn("fast", function () {
                updateProductSeason(dataToSend, function (data) {
                    if (data) {
                        let season = (data[0]) ? data[0] : data
                        addProductSeasonTableRow(season)
                    } else {
                        YearCalendar.endLoading()
                    }
                })
            })
        }
    }
    
    const updateProductSeason = function (dataToSend, callback) {
        let url = "/api/v1.0/seasons/update"
        
        if (dataToSend) {
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleSeasonError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
            }
        }
    }
    
    const deleteProductSeason = function (dataToSend, callback) {
        let url = "/api/v1.0/seasons/remove"
        
        if (dataToSend) {
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleSeasonError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
            }
        }
    }
    
    const removeProductSeason = function (dataToSend) {
        if (dataToSend) {
            $(_calendar_loader).fadeIn("fast", function () {
                deleteProductSeason(dataToSend, function (data) {
                    if (data) {
                        deleteProductSeasonTableRow(dataToSend.season_id)
                    } else {
                        YearCalendar.endLoading()
                    }
                })
            })
        }
    }
    
    const handleSeasonError = function (msg) {
        toastr.error(msg)
    }
    
    const buildUpdateRecord = function () {
        return remove_nulls({
            product_id: (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null,
            season_id: (!isNaN(parseInt(_product_edit_season_form_season_id.value))) ? parseInt(_product_edit_season_form_season_id.value) : null,
            disabled_dow: formatListOfIds(disabledDays.disabled_dows),
        })
    }
    
    const defaultDetail = function () {
        return {
            id: null,
            color_scheme_id: null,
            name: null,
            view_product_index: 1,
            view_product_index_filter: 1,
            view_product_index_search: 1,
            view_product_edit: 1,
            view_product_package_edit: 1,
            view_product_package_index: 1,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            note: null,
            category_id: null,
            color_scheme: {
                id: null,
                name: null,
                background_color: null,
                border_color: null,
                text_color: null,
                sort_order: 999,
                enabled: 1,
                date_created: formatDateMySQL(),
                created_by: user_id,
                date_modified: formatDateMySQL(),
                modified_by: user_id,
                note: null,
            },
            product_season_detail: {
                created_by: user_id,
                date_created: formatDateMySQL(),
                date_modified: formatDateMySQL(),
                disabled_dow: null,
                enabled: 1,
                id: null,
                modified_by: user_id,
                note: null,
                product_id: null,
                season_id: null,
                seasons_background: null,
                seasons_border: null,
                seasons_text: null,
            },
        }
    }
    
    const formatSeasonType = function (season) {
        
        let detail = defaultDetail()
        
        // -----
        
        let category_id = (!isNaN(parseInt(season.category_id))) ? parseInt(season.category_id) : null
        
        //
        detail.id = (!isNaN(parseInt(season.id))) ? parseInt(season.id) : null
        detail.color_scheme_id = (!isNaN(parseInt(season.color_scheme_id))) ? parseInt(season.color_scheme_id) : null
        detail.name = (season.name) ? season.name : null
        detail.view_product_index = (season.view_product_index) ? season.view_product_index : 1
        detail.view_product_index_filter = (season.view_product_index_filter) ? season.view_product_index_filter : 1
        detail.view_product_index_search = (season.view_product_index_search) ? season.view_product_index_search : 1
        detail.view_product_edit = (season.view_product_edit) ? season.view_product_edit : 1
        detail.view_product_package_edit = (season.view_product_package_edit) ? season.view_product_package_edit : 1
        detail.view_product_package_index = (season.view_product_package_index) ? season.view_product_package_index : 1
        detail.enabled = (season.enabled) ? season.enabled : 1
        detail.date_created = (season.date_created) ? season.date_created : formatDateMySQL()
        detail.created_by = (!isNaN(parseInt(season.created_by))) ? parseInt(season.created_by) : user_id
        detail.date_modified = (season.date_modified) ? season.date_modified : formatDateMySQL()
        detail.modified_by = (!isNaN(parseInt(season.modified_by))) ? parseInt(season.modified_by) : user_id
        detail.note = (season.note) ? season.note : null
        detail.category_id = (!isNaN(parseInt(season.category_id))) ? parseInt(season.category_id) : null
        detail.color_scheme.id = (!isNaN(parseInt(season.color_scheme.id))) ? parseInt(season.color_scheme.id) : null
        detail.color_scheme.name = season.color_scheme.name
        detail.color_scheme.background_color = season.color_scheme.background_color
        detail.color_scheme.border_color = season.color_scheme.border_color
        detail.color_scheme.text_color = season.color_scheme.text_color
        detail.color_scheme.sort_order = (!isNaN(parseInt(season.color_scheme.sort_order))) ? parseInt(season.color_scheme.sort_order) : 999
        detail.color_scheme.enabled = season.color_scheme.enabled
        detail.color_scheme.date_created = (season.color_scheme.date_created) ? season.color_scheme.date_created : formatDateMySQL()
        detail.color_scheme.created_by = (!isNaN(parseInt(season.color_scheme.created_by))) ? parseInt(season.color_scheme.created_by) : user_id
        detail.color_scheme.date_modified = (season.color_scheme.date_modified) ? season.color_scheme.date_modified : formatDateMySQL()
        detail.color_scheme.modified_by = (!isNaN(parseInt(season.color_scheme.modified_by))) ? parseInt(season.color_scheme.modified_by) : user_id
        detail.color_scheme.note = season.color_scheme.note
        
        if (!categories.get(category_id)) {
            categories.set(category_id, {
                seasons: [],
            })
        }
        
        let category = categories.get(category_id)
        let category_seasons = (category.seasons) ? category.seasons : []
        //console.log(categories.get(category_id).seasons)
        //console.log("category", category)
        //console.log(detail)
        return detail
    }
    
    const loadTypes = function (seasons) {
        categories = new Map()
        if (seasons) {
            
            $.each(seasons, function (i, season) {
                Season.types.set(season.id, formatSeasonType(season))
            })
        }
    }
    
    const loadAll = function (seasons) {
        Season.all = new Map()
        if (_table_season_product_edit) {
            buildProductEditTable()
        }
        
        if (!seasons) {
            seasons = []
        }
        
        $.each(seasons, function (k, season) {
            let detail = set(season)
            
            if (!isNaN(parseInt(detail.id))) {
                $table_season_product_edit.insertRow(detail)
                Season.all.set(parseInt(detail.id), detail)
            }
        })
        
        updateProgress()
    }
    
    const set = function (season) {
        let detail = defaultDetail()
        if (season) {
            detail = season
        }
        return detail
    }
    
    const edit = function (season) {
        if (season) {
            if (season.id) {
                let seasonId = season.id
                console.log("seasonId", seasonId)
                let loadedSeasonId = (!_product_edit_season_form_season_id) ? null : (!isNaN(parseInt(_product_edit_season_form_season_id.value))) ? parseInt(_product_edit_season_form_season_id.value) : null
                console.log("loadedSeasonId", loadedSeasonId)
            }
        }
        
        clearProductSeasonForm()
        loadProductSeasonForm(season)
    }
    
    const buildProductEditTable = function () {
        $table_season_product_edit = $(_table_season_product_edit).table({
            table_type: "display_list",
            data: Season.all,
            columnDefs: [
                {
                    title: "Id",
                    targets: 0,
                    data: "id",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                }, {
                    title: "Name",
                    targets: 1,
                    data: "name",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                }, {
                    title: "Color Scheme",
                    targets: 2,
                    data: "color_scheme",
                    render: function (data, type, row, meta) {
                        let background_color = data.background_color
                        let text_color = data.text_color
                        let border_color = data.border_color
                        let name = data.name
                        return `
                            <div style="font-size:14px; line-height:1.25;padding-left:.5rem;background:${background_color};color:${text_color}; border:solid 1px ${border_color}">${name}</div>
                        `
                    },
                }, {
                    title: "Disabled DOW",
                    targets: 3,
                    data: "product_season_detail",
                    render: function (data, type, row, meta) {
                        //console.log("product_season_detail", data)
                        let disabled_days = (data.disabled_dow) ? getListOfIds(data.disabled_dow) : []
                        let d = []
                        for (let n = 0; n < disabled_days.length; n++) {
                            d.push(dow_short[disabled_days[n]])
                        }
                        
                        data = d.join(', ')
                        return `
                            <span>${data}</span>
                        `
                    },
                },
            ],
            rowClick: Season.edit,
        })
    }
    
    const deleteProductSeasonTableRow = function (season_id) {
        if (season_id) {
            let hasSeason = Season.all.get(season_id)
            
            if (hasSeason) {
                Season.all.delete(season_id)
                
                $table_season_product_edit.deleteRow(hasSeason)
                $table_season_product_edit.clearSelectedRows()
                
                _product_edit_season_form_season_name_filter.value = ""
                
                PricingWorksheet.pricingWorksheet()
                Pricing.resetForm()
                YearCalendar.refresh()
                
                updateProgress()
                resetForm()
                clearProductSeasonForm()
                
                toastr.success(`Season: ${hasSeason.name} - has been deleted`)
                YearCalendar.endLoading()
            }
        }
        
    }
    
    const addProductSeasonTableRow = function (season) {
        if (season) {
            let detail = set(season)
            let hasSeason = Season.all.get(detail.id)
            
            if (hasSeason) {
                $table_season_product_edit.updateRow(detail)
            } else {
                $table_season_product_edit.insertRow(detail)
            }
            
            Season.all.set(detail.id, detail)
            
            $table_season_product_edit.loadRow(detail)
            $table_season_product_edit.jumpToRow(detail)
            $table_season_product_edit.clearSelectedRows()
            
            _product_edit_season_form_season_name_filter.value = ""
            
            PricingWorksheet.pricingWorksheet()
            Pricing.resetForm()
            YearCalendar.refresh()
            
            updateProgress()
            resetForm()
            clearProductSeasonForm()
            
            toastr.success(`Season: ${detail.name} - has been updated`)
            YearCalendar.endLoading()
        }
    }
    
    const resetForm = function () {
        _product_edit_season_form_season_id.value = ""
        _product_edit_season_form_season_name.value = ""
        _product_edit_season_id_name_display.value = ""
        _product_edit_season_form_season_enabled.checked = true
        updateProgress()
        ColorScheme.load()
    }
    
    const loadEditSeasonForm = function () {
        //$(_edit_season).show()
    }
    
    const unLoadEditSeasonForm = function () {
        //$(_edit_season).hide()
    }
    
    const clearProductSeasonForm = function () {
        disabledDays.init([])
        unloadProductSeasonForm()
    }
    
    const loadProductSeasonForm = function (season) {
        let disabled_dow = []
        let name = "Details"
        if (season) {
            let color_scheme = (season.color_scheme) ? season.color_scheme : {}
            name = (season.name) ? season.name : "Detail"
            if (season.product_season_detail && season.product_season_detail.disabled_dow) {
                disabled_dow = getListOfIds(season.product_season_detail.disabled_dow)
            }
            
            ColorScheme.load(color_scheme)
            ColorScheme.disable()
            
            _product_edit_season_form_season_id.value = season.id
            _product_edit_season_form_season_name.value = season.name
            _product_edit_season_form_season_color_scheme_id.value = season.color_scheme_id
            _product_edit_season_form_season_enabled.checked = (season.enabled === 1)
            _product_edit_season_form_season_enabled.disabled = true
            _product_edit_season_form_season_name_filter.disabled = true
        }
        _product_edit_season_form_season_name_filter.disabled = true
        _display_product_season_name.innerText = name
        disabledDays.init(disabled_dow)
        $(_edit_product_season).show()
    }
    
    const unloadProductSeasonForm = function () {
        console.log("unloadProductSeasonForm()")
        _product_edit_season_form_season_name_filter.disabled = false
        _product_edit_season_form_season_name.disabled = true
        $(_edit_product_season).hide()
    }
    
    const seasonExists = function (name) {
        let category_id = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
        if (name && name !== "" && category_id) {
            let dataToSend = {
                name: name,
                category_id: category_id,
            }
            
            fetchByName(dataToSend, function (data) {
                let season = null
                
                if (data) {
                    season = data
                    if (data[0]) {
                        season = data[0]
                    }
                }
                
                if (season && season.id) {
                    globalSelectedSeason = true
                    let color_scheme = (season.color_scheme) ? season.color_scheme : {}
                    let product_season = Season.all.get(season.id)
                    
                    $table_season_product_edit.clearSelectedRows()
                    
                    _product_edit_season_form_season_id.value = season.id
                    _product_edit_season_form_season_name.value = season.name
                    _product_edit_season_form_season_color_scheme_id.value = season.color_scheme_id
                    _product_edit_season_form_season_enabled.checked = (season.enabled === 1)
                    
                    _product_edit_season_form_season_enabled.disabled = true
                    
                    ColorScheme.load(color_scheme)
                    ColorScheme.disable()
                    
                    if (product_season) {
                        loadProductSeasonForm(product_season)
                        $table_season_product_edit.loadRow(product_season)
                    } else {
                        loadProductSeasonForm(season)
                    }
                } else {
                    confirmDialog(`The season: ${name} does not exist exists. Would you like to create it?`, (ans) => {
                        if (ans) {
                            addSeason(dataToSend, function (data) {
                                let season = null
                                
                                if (data) {
                                    season = data
                                    if (data[0]) {
                                        season = data[0]
                                    }
                                }
                                
                                if (season && season.id) {
                                    let color_scheme = (season.color_scheme) ? season.color_scheme : {}
                                    let product_season = Season.all.get(season.id)
                                    
                                    $table_season_product_edit.clearSelectedRows()
                                    
                                    _product_edit_season_form_season_id.value = season.id
                                    _product_edit_season_form_season_name.value = season.name
                                    _product_edit_season_form_season_color_scheme_id.value = season.color_scheme_id
                                    _product_edit_season_form_season_enabled.checked = (season.enabled === 1)
                                    
                                    _product_edit_season_form_season_enabled.disabled = true
                                    
                                    ColorScheme.load(color_scheme)
                                    ColorScheme.disable()
                                    
                                    if (product_season) {
                                        loadProductSeasonForm(product_season)
                                        $table_season_product_edit.loadRow(product_season)
                                    } else {
                                        loadProductSeasonForm(season)
                                    }
                                }
                            })
                        } else {
                            $table_season_product_edit.clearSelectedRows()
                            resetForm()
                        }
                    })
                }
            })
        }
    }
    
    const addSeason = function (dataToSend, callback) {
        let url = "/api/v1.0/seasons/add"
        
        if (dataToSend) {
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        handleSeasonError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
                handleSeasonError("Error Validating Airport")
            }
        } else {
            handleSeasonError("Error Loading Airport - Missing Data")
        }
    }
    
    const fetchByName = function (dataToSend, callback) {
        let url = "/api/v1.0/seasons/validate"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        handleSeasonError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
                handleSeasonError("Error Validating Airport")
            }
        } else {
            handleSeasonError("Error Loading Airport - Missing Data")
        }
    }
    
    const initAutoComplete = function () {
        let category_id = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
        
        $(_product_edit_season_form_season_name_filter)
            .on("click", function () {
                if ($(this).attr("readonly") === "readonly") {
                    e.preventDefault()
                } else {
                    $(this).select()
                }
            })
            .on("search", function () {
                $table_season_product_edit.clearSelectedRows()
                resetForm()
            })
            .on("change", function () {
                setTimeout(function () {
                    if (_product_edit_season_form_season_name_filter.value === "") {
                        $table_season_product_edit.clearSelectedRows()
                        resetForm()
                    } else {
                        seasonExists(_product_edit_season_form_season_name_filter.value)
                    }
                }, 200)
            })
            .autocomplete({
                serviceUrl: "/api/v1.0/autocomplete/seasons",
                minChars: 2,
                cache: false,
                dataType: "json",
                triggerSelectOnValidInput: false,
                paramName: "st",
                params: { "category_id": category_id },
                onSelect: function (suggestion) {
                    if (!suggestion.data) {
                        return
                    }
                    let season = suggestion.data
                    let color_scheme = (season.color_scheme) ? season.color_scheme : {}
                    let product_season = Season.all.get(season.id)
                    
                    $table_season_product_edit.clearSelectedRows()
                    
                    _product_edit_season_form_season_id.value = season.id
                    _product_edit_season_form_season_name.value = season.name
                    _product_edit_season_form_season_color_scheme_id.value = season.color_scheme_id
                    _product_edit_season_form_season_enabled.checked = (season.enabled === 1)
                    
                    _product_edit_season_form_season_enabled.disabled = true
                    
                    ColorScheme.load(color_scheme)
                    ColorScheme.disable()
                    
                    if (product_season) {
                        loadProductSeasonForm(product_season)
                        $table_season_product_edit.loadRow(product_season)
                    } else {
                        loadProductSeasonForm(season)
                    }
                },
            })
    }
    
    const init = function (settings) {
        let seasons = []
        if (settings) {
            seasons = settings
            if (settings.seasons) {
                seasons = settings.seasons
            }
        }
        
        loadTypes(seasons)
        
        if (_product_edit_season_form_season_name_filter) {
            initAutoComplete()
            resetForm()
        }
        
        if (document.getElementById("season_disabled_dow")) {
            disabledDays = $("#season_disabled_dow").DisabledDOW({
                name: "season_disabled_dow",
                label: "Disabled DOW",
            })
            
        }
        
        if (_edit_product_season) {
            unloadProductSeasonForm()
        }
        
    }
    
    return {
        types: new Map(),
        all: new Map(),
        edit: function (seasons) {
            edit(seasons)
        },
        loadTypes: function (seasons) {
            loadTypes(seasons)
        },
        init: function (settings) {
            init(settings)
        },
        loadAll: function (seasons) {
            loadAll(seasons)
        },
    }
})()

document.addEventListener("DOMContentLoaded", function () {
    let panelData = document.querySelectorAll("div.panel")
    
    panelData.forEach(el => {
        const $el = $(el)
        const $panelHeading = $el.find("div.panel-heading")
        const $panelActions = $panelHeading.find("div.panel-actions.panel-actions-keep")
        const $panelLinks = $panelActions.find("a.panel-action")
        
        $.each($panelLinks, function (k, elem) {
            let dataToggle = $(elem).attr("data-toggle")
            if (dataToggle) {
                
                switch (dataToggle) {
                    case "panel-refresh":
                        //Console.log("refresh")
                        break
                    case "panel-hide":
                        elem.addEventListener("click", function () {
                            let dataToOpen = $(elem).attr("data-loadonhide")
                            $(dataToOpen).show()
                            $(elem).parents("div.pre_display").find("div.pre_display_el").hide()
                        })
                        break
                    case "panel-collapse":
                        //Console.log("collapse")
                        break
                    case"panel-fullscreen":
                        elem.addEventListener("click", function () {
                            if ($(elem).hasClass("fa-expand")) {
                                $(elem).removeClass("fa-expand")
                                $(elem).addClass("fa-compress")
                                $el.addClass("is-fullscreen")
                            } else if ($(elem).hasClass("fa-compress")) {
                                $(elem).removeClass("fa-compress")
                                $(elem).addClass("fa-expand")
                                $el.removeClass("is-fullscreen")
                            }
                        })
                        //Console.log("fullscreen")
                        break
                    case "panel-close":
                        //Console.log("close")
                        break
                    default:
                        break
                }
            }
            
        })
    })
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
                $dTable.page.jumpToData(row_data.id, 0)
                formatTable()
            } catch (e) {
                Console.log("error", e)
            }
        }
    }
    
    const updateRow = function (row_data) {
        if (row_data) {
            try {
                let rowId = "#" + table_id + "_tr_" + row_data.id
                $dTable.row(rowId).data(row_data).draw()
                loadRow(row_data.id)
            } catch (e) {
                Console.log("error", e)
            }
        }
        
        formatTable()
    }
    
    const loadRow = function (row_data) {
        
        if (row_data) {
            try {
                $("#" + table_id + "_tr_" + row_data.id).addClass("selected")
                $dTable.page.jumpToData(row_data.id, 0)
            } catch (e) {
                Console.log("error", e)
            }
            
        }
    }
    
    const jumpToRow = function (row_data) {
        Console.log("table:jumpToRow(row_data)", row_data)
        if (row_data) {
            try {
                $dTable.page.jumpToData(row_data.id, 0)
            } catch (e) {
                Console.log("error", e)
            }
            
        }
    }
    
    const deleteRow = function (row_data) {
        if (row_data) {
            try {
                let rowId = "#" + table_id + "_tr_" + row_data.id
                let rowData = row_data
                $dTable
                  .row(rowId)
                  .remove()
                  .draw()
            } catch (e) {
                Console.log("error", e)
            }
        }
    }
    
    const clear_selected_rows = function () {
        try {
            let table = $("#" + table_id + "> tbody  > tr")
            $.each(table, function (i, row) {
                $(row).removeClass("selected")
            })
        } catch (e) {
            Console.log("clear_selected_rows", e)
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
            Console.log("error", e)
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
        deleteRow: function (row_data) {
            deleteRow(row_data)
        },
        loadRow: function (id) {
            loadRow(id)
        },
        updateRow (row_data) {
            updateRow(row_data)
        },
        jumpToRow: function (detail) {
            jumpToRow(detail)
        },
    }
    
}

$.fn.BuildKeyword = function (keywords) {
    if (!$(this).hasClass("keyword")) {
        return
    }
    
    const chip_id = $(this).attr("id")
    const _chips = document.getElementById(chip_id)
    
    let editMode = null
    let tags = new Map()
    let $chipsEl = $(_chips)
    let $submitButton = $(`#${chip_id} > div > div > button`)
    let $input = $(`#${chip_id} > div > input.user-release-input`)
    let counter = 0
    let $container = $(`#${chip_id} > div > div.chips_container`)
    
    if (!keywords) {
        keywords = []
    }
    
    if (typeof keywords === "string") {
        keywords = keywords.split(",").map(function (value) {
            return value.trim()
        })
    }
    
    (function ($) {
        $.event.special.destroyed = {
            remove: function (o) {
                if (o.handler) {
                    o.handler()
                }
            },
        }
    })(jQuery)
    
    $input
        .on("keydown", function (e) {
            console.log(e.keyCode)
            
            if (e.which === 13 || e.keyCode === 9) {
                add()
                editMode = null
            }
        })
    
    $submitButton
        .on("click", function () {
            add()
            editMode = null
        })
    
    const formatTag = function (data) {
        counter += 1
        if (data) {
            let $chip = $("<div>")
            let $closeIcon = $("<i>")
            
            $closeIcon
                .addClass("close fas fa-times")
                .on("click", function (e) {
                    e.stopPropagation()
                    let $chip = $(this).parents("div.chip")
                    deleteDialog(`Would you like to delete?`, (ans) => {
                        if (ans) {
                            $id = $chip.attr("id")
                            chipDelete($chip)
                        }
                    })
                })
            
            $chip
                .addClass("chip blue lighten-4 waves-effect")
                .text(data)
                .append($closeIcon)
                .attr("id", chip_id + "_" + counter)
                .on("click", function (e) {
                    let $chip = $(this)
                    editMode = tags.get($chip.text())
                    let id = $chip.attr("id")
                    chipSelect(id)
                })
            
            // --
            
            return $chip
        }
    }
    
    const chipDelete = function (chip) {
        if (chip) {
            let $chip = chip
            let data = $chip.text()
            
            if (tags.get(data)) {
                $chip.remove()
                tags.delete(data)
            }
        }
    }
    
    const chipSelect = function (id) {
        /*
        if (id) {
            let $chip = $("#" + id)
            let data = $chip.text()
            let tag = tags.get(data)
            if (tag) {
                if (tag) {
                    Console.log("tag", tag)
                    $input.val(data)
                }
                
            }
        }
        //*/
    }
    
    const chipAdd = function (data) {
        let tag = tags.get(data)
        if (tag) {
            toastr.error(`A tag for ${data} already exists`)
            tags.set(data, tag)
        } else {
            if (editMode) {
            
            } else {
            
            }
            let tag = formatTag(data)
            if (tag) {
                tags.set(data, tag)
                if ($container) {
                    $container.append(tag)
                }
            }
        }
    }
    
    const init = function (keywords) {
        $.each(keywords, function (k, data) {
            if (data) {
                add(data)
            }
        })
    }
    
    const add = function (data) {
        Console.log("add(data)", data)
        if (!data) {
            data = $input.val()
        }
        
        if (data !== "") {
            chipAdd(data)
            $input.val("")
        }
    }
    
    init(keywords)
    
    return {
        add: function (data) {
            chipAdd(data)
        },
        delete: function (data) {
            chipDelete(data)
        },
        build: function () {
            let results = []
            let t = Array.from(tags.values())
            for (let n = 0; n < t.length; n++) {
                let tag_element = t[n]
                let data = tag_element.text()
                results.push(data)
            }
            return results.join(",")
        },
        init: function () {
            init()
        },
    }
}

const InventoryProfile = (function () {
    "use strict"
    const _calendar_loader = document.getElementById("calendar_loader")
    const _panel_tab_inventory = document.getElementById("panel_tab_inventory")
    const _table_profile_product_edit_add_new_button = document.getElementById("table_profile_product_edit_add_new_button")
    const _edit_product_profile = document.getElementById("edit_product_profile")
    const _product_edit_profile_form_profile_transfer_sales_types_id_block = document.getElementById("product_edit_profile_form_profile_transfer_sales_types_id_block")
    const _product_edit_profile_form_profile_allot_by_id_block = document.getElementById("product_edit_profile_form_profile_allot_by_id_block")
    const _product_edit_profile_form_profile_name_filter = document.getElementById("product_edit_profile_form_profile_name_filter")
    const _table_profile_product_edit = document.getElementById("table_profile_product_edit")
    const _product_edit_profile_form_profile_days_out_block = document.getElementById("product_edit_profile_form_profile_days_out_block")
    const _product_edit_profile_form_profile_expires_block = document.getElementById("product_edit_profile_form_profile_expires_block")
    const _product_edit_profile_form_profile_quantity_block = document.getElementById("product_edit_profile_form_profile_quantity_block")
    const _product_edit_profile_form_profile_release_amt_block = document.getElementById("product_edit_profile_form_profile_release_amt_block")
    const _product_edit_profile_form = document.getElementById("product_edit_profile_form")
    const _product_edit_profile_form_profile_id = document.getElementById('product_edit_profile_form_profile_id')
    const _product_edit_profile_form_profile_name = document.getElementById('product_edit_profile_form_profile_name')
    const _product_edit_profile_form_profile_enabled = document.getElementById('product_edit_profile_form_profile_enabled')
    const _product_edit_profile_form_profile_sales_types_id = document.getElementById('product_edit_profile_form_profile_sales_types_id')
    const _product_edit_profile_form_profile_allot_by_id = document.getElementById('product_edit_profile_form_profile_allot_by_id')
    const _product_edit_profile_form_profile_transfer_sales_types_id = document.getElementById('product_edit_profile_form_profile_transfer_sales_types_id')
    const _product_edit_profile_form_profile_days_out = document.getElementById('product_edit_profile_form_profile_days_out')
    const _product_edit_profile_form_profile_quantity = document.getElementById('product_edit_profile_form_profile_quantity')
    const _product_edit_profile_form_profile_release_amt = document.getElementById('product_edit_profile_form_profile_release_amt')
    const _product_edit_profile_form_profile_min_length_days = document.getElementById('product_edit_profile_form_profile_min_length_days')
    const _product_edit_profile_form_profile_min_duration = document.getElementById('product_edit_profile_form_profile_min_duration')
    const _product_edit_profile_form_profile_max_duration = document.getElementById('product_edit_profile_form_profile_max_duration')
    const _product_edit_profile_form_profile_equal_duration = document.getElementById('product_edit_profile_form_profile_equal_duration')
    const _product_edit_profile_form_profile_advanced_booking_min = document.getElementById('product_edit_profile_form_profile_advanced_booking_min')
    const _product_edit_profile_form_profile_advanced_booking_max = document.getElementById('product_edit_profile_form_profile_advanced_booking_max')
    const _product_edit_profile_form_profile_checkin_dow = document.getElementById('product_edit_profile_form_profile_checkin_dow')
    const _product_edit_profile_form_profile_checkout_dow = document.getElementById('product_edit_profile_form_profile_checkout_dow')
    const _product_edit_profile_form_profile_departure_dow = document.getElementById('product_edit_profile_form_profile_departure_dow')
    const _product_edit_profile_form_profile_return_dow = document.getElementById('product_edit_profile_form_profile_return_dow')
    const _product_edit_profile_form_profile_inc_days_dow = document.getElementById('product_edit_profile_form_profile_inc_days_dow')
    const _product_edit_profile_form_profile_weekday_dow = document.getElementById('product_edit_profile_form_profile_weekday_dow')
    const _product_edit_profile_form_close_button = document.getElementById('product_edit_profile_form_close_button')
    const _button_add_product_profile = document.getElementById("button_add_product_profile")
    const _product_edit_profile_form_clear_button = document.getElementById('product_edit_profile_form_clear_button')
    const _product_edit_profile_form_submit_button = document.getElementById('product_edit_profile_form_submit_button')
    const _product_id = document.getElementById("product_id")
    const _button_remove_profile_from_product = document.getElementById("button_remove_profile_from_product")
    
    let $table_profile_product_edit = $(_table_profile_product_edit)
    let user_id = (document.getElementById('user_id')) ? (!isNaN(parseInt(document.getElementById('user_id').value))) ? parseInt(document.getElementById('user_id').value) : 4 : 4
    let form_rules = {
        rules: {
            product_edit_profile_form_profile_sales_types_id: {
                required: true,
            },
            product_edit_profile_form_profile_allot_by_id: {
                required: function (element) {
                    return ($(_product_edit_profile_form_profile_sales_types_id).val() !== "" && $(_product_edit_profile_form_profile_sales_types_id).val() === 1 || $(_product_edit_profile_form_profile_sales_types_id).val() === "1")
                },
            },
            profile_expires: {
                required: function (element) {
                    return ($(_product_edit_profile_form_profile_allot_by_id).val() !== "" && $(_product_edit_profile_form_profile_allot_by_id).val() === 1 || $(_product_edit_profile_form_profile_allot_by_id).val() === "1")
                },
            },
            product_edit_profile_form_profile_days_out: {
                required: function (element) {
                    return ($(_product_edit_profile_form_profile_allot_by_id).val() !== "" && $(_product_edit_profile_form_profile_allot_by_id).val() === 2 || $(_product_edit_profile_form_profile_allot_by_id).val() === "2")
                },
                number: true,
                min: 1,
            },
            product_edit_profile_form_profile_name: {
                required: true,
            },
        },
        messages: {
            product_edit_profile_form_profile_sales_types_id: {
                required: 'Field Required',
            },
            product_edit_profile_form_profile_allot_by_id: {
                required: 'Field Required',
            },
            profile_expires: {
                required: 'Field Required',
            },
            product_edit_profile_form_profile_days_out: {
                required: 'Field Required',
            },
            product_edit_profile_form_profile_name: {
                required: 'Field Required',
            },
        },
    }
    let globalSelectedProfile = false
    let checkin_dow, checkout_dow, departure_dow, return_dow, weekday_dow, inc_days_dow
    
    $(_button_add_product_profile)
        .on("click", function () {
            //console.log("InventoryProfile.button_add_product_profile: click()", {})
            populateInventoryProfileForm()
        })
    
    $(_table_profile_product_edit_add_new_button)
        .on("click", function () {
            //console.log("InventoryProfile.table_profile_product_edit_add_new_button: click()", {})
            _product_edit_profile_form_profile_name_filter.value = ""
            $table_profile_product_edit.clearSelectedRows()
            populateInventoryProfileForm()
        })
    
    $(_product_edit_profile_form_clear_button)
        .on("click", function () {
            //console.log("InventoryProfile.product_edit_profile_form_clear_button: click()", {})
            $table_profile_product_edit.clearSelectedRows()
            clearInventoryProfileForm()
            _product_edit_profile_form_profile_name_filter.value = ""
        })
    
    $(_product_edit_profile_form_submit_button)
        .on("click", function () {
            //console.log("InventoryProfile.product_edit_profile_form_submit_button: click()", {})
            save()
        })
    
    $(_product_edit_profile_form_close_button)
        .on("click", function () {
            $table_profile_product_edit.clearSelectedRows()
            clearInventoryProfileForm()
            setFormElementDisplay()
            hideForm()
            _product_edit_profile_form_profile_name_filter.value = ""
        })
    
    $(_product_edit_profile_form_profile_sales_types_id)
        .on("change", function () {
            //console.log("InventoryProfile.product_edit_profile_form_profile_sales_types_id: change()", {})
            setFormElementDisplay()
            InventoryProfile.expiration_date.value("")
            _product_edit_profile_form_profile_days_out.value = ""
            _product_edit_profile_form_profile_allot_by_id.value = ""
        })
    
    $(_product_edit_profile_form_profile_allot_by_id)
        .on("change", function () {
            //console.log("InventoryProfile.product_edit_profile_form_profile_allot_by_id: change()", {})
            setFormElementDisplay()
            InventoryProfile.expiration_date.value("")
            _product_edit_profile_form_profile_days_out.value = ""
        })
    
    $(_product_edit_profile_form_profile_transfer_sales_types_id)
        .on("change", function () {
            //console.log("InventoryProfile.product_edit_profile_form_profile_transfer_sales_types_id: change()", {})
        })
    
    $(_button_remove_profile_from_product)
        .on("click", function () {
            remove()
        })
    
    $(_panel_tab_inventory)
        .on("hide.bs.tab", function () {
            $table_profile_product_edit.clearSelectedRows()
            clearInventoryProfileForm()
            setFormElementDisplay()
            hideForm()
            _product_edit_profile_form_profile_name_filter.value = ""
        })
    
    const updateProgress = function () {
        let profiles = Array.from(InventoryProfile.all.values())
        
        if (profiles.length === 0) {
            $(_panel_tab_inventory).html(`Inventory <span id="profileNeedsAttention" class="badge rounded-pill badge-notification bg-danger">!</span>`)
        } else {
            $(_panel_tab_inventory).html(`Inventory`)
        }
        
        Product.updateProgress()
    }
    
    const removeProductProfile = function (dataToSend, callback) {
        if (dataToSend) {
            let url = "/api/v1.0/profiles/remove"
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleProfileError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
            }
        }
    }
    
    const remove = function () {
        let dataToSend = {
            product_id: parseInt(_product_id.value),
            profile_id: parseInt(_product_edit_profile_form_profile_id.value),
        }
        if (dataToSend) {
            confirmDialog(`Would you like to update? This change may affect your Pricing Worksheets.`, (ans) => {
                if (ans) {
                    removeProductProfile(dataToSend, function (data) {
                        if (data) {
                            let detail = set(InventoryProfile.all.get(dataToSend.profile_id))
                            
                            InventoryProfile.all.delete(detail.id)
                            
                            $table_profile_product_edit.deleteRow(detail)
                            $table_profile_product_edit.clearSelectedRows()
                            
                            _product_edit_profile_form_profile_name_filter.value = ""
                            
                            PricingWorksheet.pricingWorksheet()
                            Pricing.resetForm()
                            YearCalendar.resetForm()
                            PricingWorksheet.status()
                            //YearCalendar.refresh()
                            
                            updateProgress()
                            populateInventoryProfileForm()
                            hideForm()
                            
                            toastr.success(`InventoryProfile: ${detail.name} - has been removed`)
                            YearCalendar.endLoading()
                        }
                    })
                }
            })
        }
    }
    
    const defaultDetail = function () {
        return {
            id: null,
            allot_by_id: null,
            sales_types_id: null,
            name: null,
            quantity: null,
            expires: null,
            transfer_sales_types_id: null,
            release_amt: null,
            min_length_days: null,
            checkin_dow: [0, 1, 2, 3, 4, 5, 6],
            checkout_dow: [0, 1, 2, 3, 4, 5, 6],
            departure_dow: [0, 1, 2, 3, 4, 5, 6],
            return_dow: [0, 1, 2, 3, 4, 5, 6],
            inc_days_dow: [0, 1, 2, 3, 4, 5, 6],
            weekday_dow: [0, 1, 2, 3, 4, 5, 6],
            min_duration: null,
            max_duration: null,
            equal_duration: null,
            advanced_booking_min: null,
            advanced_booking_max: null,
            advanced_booking_date: null,
            
            days_out: null,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            note: null,
            sales_types_details: {},
            allot_by_details: {},
            tranfer_sales_type_details: {},
        }
    }
    
    const initAutoComplete = function () {
        //console.log('InventoryProfile.initAutoComplete()', InventoryProfile)
        let product_id = (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null
        
        $(_product_edit_profile_form_profile_name_filter)
            .on("click", function () {
                $(this).select()
            })
            .on("search", function () {
                $table_profile_product_edit.clearSelectedRows()
                resetInventoryProfileForm()
            })
            .on("change", function () {
                setTimeout(function () {
                    //*
                    let profile_name = _product_edit_profile_form_profile_name_filter.value
                    
                    if (globalSelectedProfile === false) {
                        if (profile_name === "") {
                            globalSelectedProfile = false
                            $table_profile_product_edit.clearSelectedRows()
                            resetInventoryProfileForm()
                        } else {
                            nameExists(profile_name)
                        }
                    }
                    //*/
                }, 200)
                if (_product_edit_profile_form_profile_name_filter.value === "") {
                    $table_profile_product_edit.clearSelectedRows()
                    resetInventoryProfileForm()
                }
            })
            .autocomplete({
                serviceUrl: "/api/v1.0/autocomplete/profiles",
                minChars: 2,
                cache: false,
                dataType: "json",
                triggerSelectOnValidInput: false,
                params: { "product_id": product_id },
                paramName: "st",
                onSelect: function (suggestion) {
                    if (!suggestion.data) {
                        return
                    }
                    $table_profile_product_edit.clearSelectedRows()
                    let id = (!isNaN(parseInt(suggestion.data.id))) ? parseInt(suggestion.data.id) : null
                    let inventory_profile = InventoryProfile.all.get(id)
                    
                    if (inventory_profile) {
                        $table_profile_product_edit.loadRow(inventory_profile)
                        populateInventoryProfileForm(inventory_profile)
                        return
                    }
                    
                    populateInventoryProfileForm()
                    _product_edit_profile_form_profile_name.value = _product_edit_profile_form_profile_name_filter.value
                },
            })
    }
    
    const nameExists = function (name) {
        //console.log("InventoryProfile.nameExists(profile_name)", name)
        if (name && name !== "") {
            /**
             * data to send to the server
             *
             * @type {{name}}
             */
            let dataToSend = {
                name: name,
                product_id: (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null,
            }
            
            fetchByName(dataToSend, function (data) {
                let profile = null
                
                if (data && data[0]) {
                    profile = data
                    if (data[0]) {
                        profile = data[0]
                    }
                }
                
                if (profile) {
                    let hasProfile = InventoryProfile.all.get(parseInt(profile.id))
                    let detail
                    
                    if (hasProfile) {
                        detail = set(hasProfile)
                        $table_profile_product_edit.loadRow(detail)
                        populateInventoryProfileForm(detail)
                        return
                    }
                    
                    populateInventoryProfileForm()
                    _product_edit_profile_form_profile_name.value = name
                }
            })
        }
    }
    
    const fetchByName = function (dataToSend, callback) {
        let url = "/api/v1.0/profiles/validate"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleProfileError("Oops: 1")
                    }
                })
            } catch (e) {
                //console.log("error", e)
                return handleProfileError("Error Validating InventoryProfile")
            }
        } else {
            return handleProfileError("Error Loading InventoryProfile - Missing Data")
        }
    }
    
    const buildInventoryProfileTable = function () {
        //console.log("InventoryProfile.buildInventoryProfileTable()", InventoryProfile)
        $table_profile_product_edit = $(_table_profile_product_edit).table({
            table_type: "display_list",
            data: [],
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
                    title: "Sales Types",
                    targets: 1,
                    data: "sales_types_details",
                    render: function (data, type, row, meta) {
                        //console.log("sales_types_details", data)
                        let name = (data.name) ? data.name : "N/A"
                        
                        return "<span style='white-space: nowrap;'>" + name + "</span>"
                    },
                },
                {
                    title: "Allot By",
                    targets: 2,
                    data: "allot_by_id",
                    render: function (data, type, row, meta) {
                        let nights = "N/A"
                        if (data === null) {
                            nights = "N/A"
                        } else {
                            nights = Types.allot_by.get(data)
                            if (nights) {
                                nights = nights.name
                            } else {
                                nights = "N/A"
                            }
                        }
                        return "<span style='white-space: nowrap;'>" + nights + "</span>"
                    },
                },
                {
                    title: "Expires",
                    targets: 3,
                    data: "expires",
                    render: function (data, type, row, meta) {
                        let expires
                        if (data === null) {
                            expires = "N/A"
                        } else {
                            let new_string = data.replace(/-|\s/g, "")
                            expires = moment(new_string).format('YYYY-MM-DD')
                        }
                        return "<span style='white-space: nowrap;'>" + expires + "</span>"
                    },
                },
                {
                    title: "Release",
                    targets: 4,
                    data: "release_amt",
                    render: function (data, type, row, meta) {
                        let expires = "N/A"
                        if (data) {
                            expires = data
                        }
                        return "<span style='white-space: nowrap;'>" + expires + "</span>"
                    },
                },
            ],
            rowClick: InventoryProfile.edit,
        })
    }
    
    const buildInventoryProfileRecord = function () {
        let isValid = validateInventoryProfileForm()
        if (isValid) {
            return remove_nulls({
                id: (!isNaN(parseInt(_product_edit_profile_form_profile_id.value))) ? parseInt(_product_edit_profile_form_profile_id.value) : null,
                name: (_product_edit_profile_form_profile_name.value !== "") ? _product_edit_profile_form_profile_name.value : null,
                product_id: (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null,
                sales_types_id: (!isNaN(parseInt(_product_edit_profile_form_profile_sales_types_id.value))) ? parseInt(_product_edit_profile_form_profile_sales_types_id.value) : null,
                transfer_sales_types_id: (!isNaN(parseInt(_product_edit_profile_form_profile_transfer_sales_types_id.value))) ? parseInt(_product_edit_profile_form_profile_transfer_sales_types_id.value) : null,
                allot_by_id: (!isNaN(parseInt(_product_edit_profile_form_profile_allot_by_id.value))) ? parseInt(_product_edit_profile_form_profile_allot_by_id.value) : 3,
                enabled: (_product_edit_profile_form_profile_enabled.checked === true) ? 1 : 0,
                expires: InventoryProfile.expiration_date.value(),
                advanced_booking_date: InventoryProfile.advanced_booking_date.value(),
                checkin_dow: (formatListOfIds(InventoryProfile.checkin_dow.disabled_dows) === null) ? "" : formatListOfIds(InventoryProfile.checkin_dow.disabled_dows),
                checkout_dow: (formatListOfIds(InventoryProfile.checkout_dow.disabled_dows) === "") ? "" : formatListOfIds(InventoryProfile.checkout_dow.disabled_dows),
                departure_dow: (formatListOfIds(InventoryProfile.departure_dow.disabled_dows) === "") ? "" : formatListOfIds(InventoryProfile.departure_dow.disabled_dows),
                return_dow: (formatListOfIds(InventoryProfile.return_dow.disabled_dows) === "") ? "" : formatListOfIds(InventoryProfile.return_dow.disabled_dows),
                weekday_dow: (formatListOfIds(InventoryProfile.weekday_dow.disabled_dows) === "") ? "" : formatListOfIds(InventoryProfile.weekday_dow.disabled_dows),
                inc_days_dow: (formatListOfIds(InventoryProfile.inc_days_dow.disabled_dows) === "") ? "" : formatListOfIds(InventoryProfile.inc_days_dow.disabled_dows),
                days_out: (!isNaN(parseInt(_product_edit_profile_form_profile_days_out.value))) ? parseInt(_product_edit_profile_form_profile_days_out.value) : null,
                release_amt: (!isNaN(parseInt(_product_edit_profile_form_profile_release_amt.value))) ? parseInt(_product_edit_profile_form_profile_release_amt.value) : null,
                min_length_days: (!isNaN(parseInt(_product_edit_profile_form_profile_min_length_days.value))) ? parseInt(_product_edit_profile_form_profile_min_length_days.value) : "",
                min_duration: (!isNaN(parseInt(_product_edit_profile_form_profile_min_duration.value))) ? parseInt(_product_edit_profile_form_profile_min_duration.value) : null,
                max_duration: (!isNaN(parseInt(_product_edit_profile_form_profile_max_duration.value))) ? parseInt(_product_edit_profile_form_profile_max_duration.value) : null,
                equal_duration: (!isNaN(parseInt(_product_edit_profile_form_profile_equal_duration.value))) ? parseInt(_product_edit_profile_form_profile_equal_duration.value) : null,
                advanced_booking_min: (!isNaN(parseInt(_product_edit_profile_form_profile_advanced_booking_min.value))) ? parseInt(_product_edit_profile_form_profile_advanced_booking_min.value) : null,
                advanced_booking_max: (!isNaN(parseInt(_product_edit_profile_form_profile_advanced_booking_max.value))) ? parseInt(_product_edit_profile_form_profile_advanced_booking_max.value) : null,
            })
            
        }
        
        return false
    }
    
    const loadAll = function (inventory_profiles) {
        InventoryProfile.all = new Map()
        if (!inventory_profiles) { inventory_profiles = [] }
        
        $.each(inventory_profiles, function (k, inventory_profile) {
            //console.log("InventoryProfile.loadAll - inventory_profile", inventory_profile)
            //console.log("InventoryProfile.loadAll - inventory_profile", inventory_profile, checkin_dow)
            let detail = set(inventory_profile)
            //console.log('detail', detail)
            if (!isNaN(parseInt(detail.id))) {
                if (_table_profile_product_edit) {
                    $table_profile_product_edit.insertRow(detail)
                }
                InventoryProfile.all.set(parseInt(detail.id), detail)
            }
        })
        
        Pricing.loadProfileDropdown()
        updateProgress()
    }
    
    const setFormElementDisplay = function () {
        let sales_types_id = (!isNaN(parseInt(_product_edit_profile_form_profile_sales_types_id.value))) ? parseInt(_product_edit_profile_form_profile_sales_types_id.value) : null
        
        hideAllotmentFields()
        if (sales_types_id) {
            switch (sales_types_id) {
                case 1:
                    showAllotmentFields()
                    break
                case 2:
                    break
                case 3:
                    break
                case 4:
                    break
                case 5:
                    break
                default:
                    break
            }
        }
    }
    
    const showAllotmentFields = function () {
        let allot_by_id = (!isNaN(parseInt(_product_edit_profile_form_profile_allot_by_id.value))) ? parseInt(_product_edit_profile_form_profile_allot_by_id.value) : null
        if (allot_by_id) {
            switch (allot_by_id) {
                case 1:
                    $(_product_edit_profile_form_profile_days_out_block).hide()
                    $(_product_edit_profile_form_profile_expires_block).show()
                    break
                case 2:
                    
                    $(_product_edit_profile_form_profile_days_out_block).show()
                    $(_product_edit_profile_form_profile_expires_block).hide()
                    break
                case 3:
                    
                    $(_product_edit_profile_form_profile_days_out_block).hide()
                    $(_product_edit_profile_form_profile_expires_block).hide()
                    break
                default:
                    $(_product_edit_profile_form_profile_days_out_block).hide()
                    $(_product_edit_profile_form_profile_expires_block).hide()
                    break
            }
        }
        
        $(_product_edit_profile_form_profile_transfer_sales_types_id_block).show()
        $(_product_edit_profile_form_profile_quantity_block).show()
        $(_product_edit_profile_form_profile_release_amt_block).show()
        $(_product_edit_profile_form_profile_allot_by_id_block).show()
    }
    
    const hideAllotmentFields = function () {
        $(_product_edit_profile_form_profile_days_out_block).hide()
        $(_product_edit_profile_form_profile_expires_block).hide()
        $(_product_edit_profile_form_profile_allot_by_id_block).hide()
        $(_product_edit_profile_form_profile_transfer_sales_types_id_block).hide()
        $(_product_edit_profile_form_profile_quantity_block).hide()
        $(_product_edit_profile_form_profile_release_amt_block).hide()
        $("#accordionEx").collapse("hide")
    }
    
    const hideForm = function () {
        if (_edit_product_profile) {
            hideAllotmentFields()
            $(_edit_product_profile).hide()
            _product_edit_profile_form_profile_name_filter.disabled = false
            
            $("#accordionEx").collapse("hide")
            updateProgress()
        }
    }
    
    const showForm = function () {
        //console.log("InventoryProfile.showForm()", showForm)
        if (_edit_product_profile) {
            _product_edit_profile_form_profile_name_filter.disabled = true
            $(_edit_product_profile).show()
        }
    }
    
    const resetInventoryProfileForm = function () {
        //console.log("InventoryProfile.resetInventoryProfileForm()", {})
        clearInventoryProfileForm()
        disableInventoryProfileFormFields()
    }
    
    const clearInventoryProfileForm = function () {
        //console.log("InventoryProfile.clearInventoryProfileForm()", clearInventoryProfileForm)
        
        disableInventoryProfileFormFields()
        _product_edit_profile_form_profile_id.value = ""
        _product_edit_profile_form_profile_name.value = ""
        _product_edit_profile_form_profile_enabled.checked = true
        _product_edit_profile_form_profile_sales_types_id.value = ""
        _product_edit_profile_form_profile_allot_by_id.value = ""
        _product_edit_profile_form_profile_transfer_sales_types_id.value = ""
        _product_edit_profile_form_profile_days_out.value = ""
        _product_edit_profile_form_profile_quantity.value = ""
        _product_edit_profile_form_profile_release_amt.value = ""
        _product_edit_profile_form_profile_min_length_days.value = ""
        _product_edit_profile_form_profile_min_duration.value = ""
        _product_edit_profile_form_profile_max_duration.value = ""
        _product_edit_profile_form_profile_equal_duration.value = ""
        _product_edit_profile_form_profile_advanced_booking_min.value = ""
        _product_edit_profile_form_profile_advanced_booking_max.value = ""
        
        InventoryProfile.checkin_dow.init([0, 1, 2, 3, 4, 5, 6])
        InventoryProfile.checkout_dow.init([0, 1, 2, 3, 4, 5, 6])
        InventoryProfile.departure_dow.init([0, 1, 2, 3, 4, 5, 6])
        InventoryProfile.return_dow.init([0, 1, 2, 3, 4, 5, 6])
        InventoryProfile.weekday_dow.init([0, 1, 2, 3, 4, 5, 6])
        InventoryProfile.inc_days_dow.init([0, 1, 2, 3, 4, 5, 6])
        
        InventoryProfile.expiration_date.value("")
        InventoryProfile.advanced_booking_date.value("")
        
        setFormElementDisplay()
    }
    
    const validateInventoryProfileForm = function () {
        let isValid = $(_product_edit_profile_form).valid()
        if (isValid) {
            let allotById = (!isNaN(parseInt(_product_edit_profile_form_profile_allot_by_id.value))) ? parseInt(_product_edit_profile_form_profile_allot_by_id.value) : 3
            if (allotById === 1) {
                let expiration_date = InventoryProfile.expiration_date.value()
                
                if (expiration_date === null || expiration_date === "") {
                    setError(document.getElementById("profile_expires"), "Field Required")
                    isValid = false
                } else {
                    clearError(document.getElementById("profile_expires"))
                }
            }
        }
        
        return isValid
    }
    
    const disableInventoryProfileFormFields = function () {
        //console.log('InventoryProfile.disableInventoryProfileFormFields()', this)
        _product_edit_profile_form_profile_name.disabled = false
    }
    
    const populateInventoryProfileForm = function (inventory_profile) {
        //console.log("InventoryProfile.populateInventoryProfileForm(inventory_profile)", inventory_profile)
        clearInventoryProfileForm()
        if (inventory_profile) {
            _product_edit_profile_form_profile_id.value = (inventory_profile.id) ? inventory_profile.id : ""
            _product_edit_profile_form_profile_name.value = (inventory_profile.name) ? inventory_profile.name : ""
            _product_edit_profile_form_profile_enabled.checked = (inventory_profile.enabled !== 0)
            _product_edit_profile_form_profile_sales_types_id.value = (inventory_profile.sales_types_id) ? inventory_profile.sales_types_id : ""
            _product_edit_profile_form_profile_allot_by_id.value = (inventory_profile.allot_by_id) ? inventory_profile.allot_by_id : ""
            _product_edit_profile_form_profile_transfer_sales_types_id.value = (inventory_profile.transfer_sales_types_id) ? inventory_profile.transfer_sales_types_id : ""
            _product_edit_profile_form_profile_days_out.value = (inventory_profile.days_out) ? inventory_profile.days_out : ""
            _product_edit_profile_form_profile_quantity.value = (inventory_profile.quantity) ? inventory_profile.quantity : ""
            _product_edit_profile_form_profile_release_amt.value = (inventory_profile.release_amt) ? inventory_profile.release_amt : ""
            _product_edit_profile_form_profile_min_length_days.value = (inventory_profile.min_length_days) ? inventory_profile.min_length_days : ""
            _product_edit_profile_form_profile_min_duration.value = (inventory_profile.min_duration) ? inventory_profile.min_duration : ""
            _product_edit_profile_form_profile_max_duration.value = (inventory_profile.max_duration) ? inventory_profile.max_duration : ""
            _product_edit_profile_form_profile_equal_duration.value = (inventory_profile.equal_duration) ? inventory_profile.equal_duration : ""
            _product_edit_profile_form_profile_advanced_booking_min.value = (inventory_profile.advanced_booking_min) ? inventory_profile.advanced_booking_min : ""
            _product_edit_profile_form_profile_advanced_booking_max.value = (inventory_profile.advanced_booking_max) ? inventory_profile.advanced_booking_max : ""
            
            InventoryProfile.checkin_dow.init((inventory_profile.checkin_dow) ? inventory_profile.checkin_dow : [0, 1, 2, 3, 4, 5, 6])
            InventoryProfile.checkout_dow.init((inventory_profile.checkout_dow) ? inventory_profile.checkout_dow : [0, 1, 2, 3, 4, 5, 6])
            InventoryProfile.departure_dow.init((inventory_profile.departure_dow) ? inventory_profile.departure_dow : [0, 1, 2, 3, 4, 5, 6])
            InventoryProfile.return_dow.init((inventory_profile.return_dow) ? inventory_profile.return_dow : [0, 1, 2, 3, 4, 5, 6])
            InventoryProfile.weekday_dow.init((inventory_profile.weekday_dow) ? inventory_profile.weekday_dow : [0, 1, 2, 3, 4, 5, 6])
            InventoryProfile.inc_days_dow.init((inventory_profile.inc_days_dow) ? inventory_profile.inc_days_dow : [0, 1, 2, 3, 4, 5, 6])
            
            InventoryProfile.expiration_date.value((inventory_profile.expires) ? inventory_profile.expires : "")
            InventoryProfile.advanced_booking_date.value((inventory_profile.advanced_booking_date) ? inventory_profile.advanced_booking_date : "")
            
        }
        
        setFormElementDisplay()
        showForm()
    }
    
    const set = function (inventory_profile) {
        //console.log("InventoryProfile.set(inventory_profile)", inventory_profile)
        
        let detail = defaultDetail()
        let sales_types_details, allot_by_details, tranfer_sales_type_details
        if (inventory_profile) {
            let checkinDOW = getListOfIds(inventory_profile.checkin_dow)
            let checkoutDOW = getListOfIds(inventory_profile.checkout_dow)
            let departureDOW = getListOfIds(inventory_profile.departure_dow)
            let returnDOW = getListOfIds(inventory_profile.return_dow)
            let inc_daysDOW = getListOfIds(inventory_profile.inc_days_dow)
            let weekdayDOW = getListOfIds(inventory_profile.weekday_dow)
            
            sales_types_details = Types.sales_types.get((!isNaN(parseInt(inventory_profile.sales_types_id))) ? parseInt(inventory_profile.sales_types_id) : null)
            allot_by_details = Types.allot_by.get((!isNaN(parseInt(inventory_profile.allot_by_id))) ? parseInt(inventory_profile.allot_by_id) : null)
            tranfer_sales_type_details = Types.sales_types.get((!isNaN(parseInt(inventory_profile.transfer_sales_types_id))) ? parseInt(inventory_profile.transfer_sales_types_id) : null)
            detail.id = (!isNaN(parseInt(inventory_profile.id))) ? parseInt(inventory_profile.id) : null
            detail.allot_by_id = (!isNaN(parseInt(inventory_profile.allot_by_id))) ? parseInt(inventory_profile.allot_by_id) : null
            detail.sales_types_id = (!isNaN(parseInt(inventory_profile.sales_types_id))) ? parseInt(inventory_profile.sales_types_id) : null
            detail.name = (inventory_profile.name) ? inventory_profile.name : null
            detail.quantity = (!isNaN(parseInt(inventory_profile.quantity))) ? parseInt(inventory_profile.quantity) : null
            detail.expires = (inventory_profile.expires) ? inventory_profile.expires : null
            detail.transfer_sales_types_id = (!isNaN(parseInt(inventory_profile.transfer_sales_types_id))) ? parseInt(inventory_profile.transfer_sales_types_id) : null
            detail.release_amt = (inventory_profile.release_amt) ? inventory_profile.release_amt : null
            detail.min_length_days = (inventory_profile.min_length_days) ? inventory_profile.min_length_days : null
            detail.min_duration = (inventory_profile.min_duration) ? inventory_profile.min_duration : null
            detail.max_duration = (inventory_profile.max_duration) ? inventory_profile.max_duration : null
            detail.equal_duration = (inventory_profile.equal_duration) ? inventory_profile.equal_duration : null
            detail.advanced_booking_min = (inventory_profile.advanced_booking_min) ? inventory_profile.advanced_booking_min : null
            detail.advanced_booking_max = (inventory_profile.advanced_booking_max) ? inventory_profile.advanced_booking_max : null
            detail.advanced_booking_date = (inventory_profile.advanced_booking_date) ? inventory_profile.advanced_booking_date : null
            
            detail.checkin_dow = checkinDOW
            detail.checkout_dow = checkoutDOW
            detail.departure_dow = departureDOW
            detail.return_dow = returnDOW
            detail.inc_days_dow = inc_daysDOW
            detail.weekday_dow = weekdayDOW
            
            detail.days_out = (inventory_profile.days_out) ? inventory_profile.days_out : null
            detail.enabled = (inventory_profile.enabled) ? inventory_profile.enabled : 1
            detail.date_created = (inventory_profile.date_created) ? inventory_profile.date_created : formatDateMySQL()
            detail.created_by = (!isNaN(parseInt(inventory_profile.created_by))) ? parseInt(inventory_profile.created_by) : user_id
            detail.date_modified = (inventory_profile.date_modified) ? inventory_profile.date_modified : formatDateMySQL()
            detail.modified_by = (!isNaN(parseInt(inventory_profile.modified_by))) ? parseInt(inventory_profile.modified_by) : user_id
            detail.note = (inventory_profile.note) ? inventory_profile.note : null
            detail.sales_types_details = sales_types_details
            detail.allot_by_details = allot_by_details
            detail.tranfer_sales_type_details = tranfer_sales_type_details
        }
        
        InventoryProfile.detail = detail
        return detail
    }
    
    const edit = function (inventory_profile) {
        if (inventory_profile) {
            $table_profile_product_edit.clearSelectedRows()
            let detail = set(inventory_profile)
            
            showForm()
            _product_edit_profile_form_profile_name_filter.value = detail.name
            _product_edit_profile_form_profile_name_filter.disabled = true
            $table_profile_product_edit.loadRow(detail)
            populateInventoryProfileForm(detail)
        }
    }
    
    const save = function () {
        let dataToSend = buildInventoryProfileRecord()
        if (dataToSend) {
            confirmDialog(`Would you like to update? This change may affect your Pricing Worksheets.`, (ans) => {
                if (ans) {
                    saveProductProfile(dataToSend, function (data) {
                        if (data) {
                            
                            let detail = set((data[0]) ? data[0] : data)
                            let hasProfile = InventoryProfile.all.get(detail.id)
                            
                            if (hasProfile) {
                                $table_profile_product_edit.updateRow(detail)
                            } else {
                                $table_profile_product_edit.insertRow(detail)
                            }
                            
                            InventoryProfile.all.set(detail.id, detail)
                            
                            $table_profile_product_edit.loadRow(detail)
                            $table_profile_product_edit.jumpToRow(detail)
                            $table_profile_product_edit.clearSelectedRows()
                            
                            _product_edit_profile_form_profile_name_filter.value = ""
                            
                            PricingWorksheet.pricingWorksheet()
                            Pricing.resetForm()
                            YearCalendar.refresh()
                            
                            updateProgress()
                            populateInventoryProfileForm()
                            hideForm()
                            
                            toastr.success(`InventoryProfile: ${detail.name} - has been updated`)
                            YearCalendar.endLoading()
                        }
                    })
                }
            })
        }
    }
    
    const handleProfileError = function (msg) {
        toastr.error(msg)
    }
    
    const saveProductProfile = function (dataToSend, callback) {
        if (dataToSend) {
            let url = "/api/v1.0/profiles/update"
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleProfileError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
            }
        }
    }
    
    const init = function (settings) {
        let inventory_profiles = []
        
        if (settings) {
            if (settings.profiles) {
                inventory_profiles = settings.profiles
            }
        }
        
        checkin_dow = $(_product_edit_profile_form_profile_checkin_dow).DisabledDOW({
            name: "checkin_dow",
            label: "Checkin DOW",
        })
        
        checkout_dow = $(_product_edit_profile_form_profile_checkout_dow).DisabledDOW({
            name: "checkout_dow",
            label: "Checkout DOW",
        })
        
        departure_dow = $(_product_edit_profile_form_profile_departure_dow).DisabledDOW({
            name: "departure_dow",
            label: "Departure DOW",
        })
        
        return_dow = $(_product_edit_profile_form_profile_return_dow).DisabledDOW({
            name: "return_dow",
            label: "Return DOW",
        })
        
        inc_days_dow = $(_product_edit_profile_form_profile_inc_days_dow).DisabledDOW({
            name: "inc_days_dow",
            label: "Included Days",
        })
        
        weekday_dow = $(_product_edit_profile_form_profile_weekday_dow).DisabledDOW({
            name: "weekday_dow",
            label: "Weekdays",
        })
        
        InventoryProfile.checkin_dow = checkin_dow
        InventoryProfile.checkout_dow = checkout_dow
        InventoryProfile.departure_dow = departure_dow
        InventoryProfile.return_dow = return_dow
        InventoryProfile.weekday_dow = weekday_dow
        InventoryProfile.inc_days_dow = inc_days_dow
        
        $(document).ready(function () {
            if (_table_profile_product_edit) {
                buildInventoryProfileTable()
            }
            
            if (_product_edit_profile_form_profile_name_filter) {
                initAutoComplete()
            }
            
            if (_product_edit_profile_form) {
                validator_init(form_rules)
                
                InventoryProfile.expiration_date = $("#profile_expires").dateSelect({
                    onStart: function () {},
                })
                
                InventoryProfile.advanced_booking_date = $("#profile_advanced_booking_date").dateSelect({
                    onStart: function () {},
                })
                
                InventoryProfile.validator = $(_product_edit_profile_form).validate()
                resetInventoryProfileForm()
                hideForm()
            }
            
            loadAll(inventory_profiles)
        })
    }
    
    return {
        validator: null,
        all: new Map(),
        detail: {},
        expiration_date: null,
        advanced_booking_date: null,
        checkin_dow: null,
        checkout_dow: null,
        departure_dow: null,
        return_dow: null,
        weekday_dow: null,
        inc_days_dow: null,
        init: function (settings) { init(settings) },
        initAutoComplete: function () { initAutoComplete() },
        edit: function (inventory_profile) {
            edit(inventory_profile)
        },
    }
})()

const PricingWorksheet = (function () {
    "use strict"
    
    const _product_edit_matrix_form = document.getElementById("product_edit_matrix_form")
    const daysOfTheWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    const _product_edit_pricing_section_reset_filters = document.getElementById("product_edit_pricing_section_reset_filters")
    const _pricing_strategy_types_id = document.getElementById("pricing_strategy_types_id")
    const _product_id = document.getElementById("product_id")
    const _pricing_strategy_unit_id = document.getElementById("pricing_strategy_unit_id")
    const _pricing_strategy_season_id = document.getElementById("pricing_strategy_season_id")
    const _button_collapse_seasons = document.getElementById("button_collapse_seasons")
    const _button_collapse_units = document.getElementById("button_collapse_units")
    const _button_toggle_completed_pricings = document.getElementById("button_toggle_completed_pricings")
    const _button_toggle_completed_matrices = document.getElementById("button_toggle_completed_matrices")
    const _product_edit_pricing_section_reload_worksheet = document.getElementById("product_edit_pricing_section_reload_worksheet")
    
    let pricingsHidden, matricesHidden, unitsCollapsed, seasonsCollapsed = false
    let completed = '<span class="badge badge-pill badge-success">Completed</span>'
    let incomplete = '<span class="badge badge-pill badge-danger">Incomplete</span>'
    let seasonList, unitList, variantList = []
    let variantCombinations = []
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    $(_product_edit_pricing_section_reload_worksheet)
        .on("click", function () {
            $(_pricing_strategy_types_id).val(PricingWorksheet.pricingStrategyId).trigger("change")
        })
    
    $(_product_edit_pricing_section_reset_filters)
        .on("click", function () {
            resetFilters()
        })
    
    $(_pricing_strategy_types_id)
        .on("change", function () {
            //pricingWorksheet()
        })
    
    $(_pricing_strategy_unit_id)
        .on("change", function () {
            filterUnits()
        })
    
    $(_pricing_strategy_season_id)
        .on("change", function () {
            filterSeasons()
        })
    
    $(_product_edit_pricing_section_reset_filters)
        .on("click", function () {
            resetFilters()
        })
    
    $(_button_toggle_completed_pricings)
        .on("click", function () {
            toggleCompletedPricings()
        })
    
    $(_button_toggle_completed_matrices)
        .on("click", function () {
            toggleCompletedMatrices()
        })
    
    $(_button_collapse_seasons)
        .on("click", function () {
            toggleSeasonFilter()
        })
    
    $(_button_collapse_units)
        .on("click", function () {
            toggleUnitFilter()
        })
    
    const status = function () {
        let hasIssues = false
        let status = "complete"
        let incompletePricings = Array.from(PricingWorksheet.incompletePricings.values())
        let incompleteMatrices = Array.from(PricingWorksheet.incompleteMatrices.values())
        
        if (incompletePricings.length > 0 || incompleteMatrices.length > 0) {
            hasIssues = true
        }
        
        $("<span>", {
            class: "badge rounded-pill badge-notification bg-danger tab-badge",
            alt: "Notification",
            css: { "color": "rgb(255, 255, 255) !important" },
            text: '!',
        })
        if (hasIssues === true) {
            status = "incomplete"
            $("#panel_tab_pricing")
                .html("Pricing<span class='badge rounded-pill badge-notification bg-danger tab-badge' style='color:#fff!important'>!</span>")
        } else {
            status = "complete"
            $("#panel_tab_pricing")
                .html("Pricing")
        }
        
        return status
    }
    
    const isDisabled = function (day, season_id) {
        let season, dow
        let dowIndex = -1
        let disabled_dow = []
        let product_season_detail = {}
        
        if (season_id && day) {
            season = Season.all.get(season_id)
            if (season) {
                product_season_detail = (season.product_season_detail) ? season.product_season_detail : {}
                disabled_dow = getListOfIds(product_season_detail.disabled_dow.trim())
                dow = daysOfTheWeek.indexOf(day)
                dowIndex = disabled_dow.indexOf(dow)
            }
        }
        
        return dowIndex >= 0
    }
    
    const tableDOW = function (pricing) {
        let DOWHEADINGROW = $("<tr/>")
        let DOWHEADINGACTIONCOLUMN = $("<th/>", {
            html: "&nbsp;",
        })
        
        let DOWHEADINGTITLECOLUMN = $("<th/>", {
            css: { "width": "120px" },
        })
        DOWHEADINGROW.attr("data-dowrow", "true")
        DOWHEADINGROW.append(DOWHEADINGTITLECOLUMN)
        
        if (pricing) {
            let beenSaved = false
            let matrix = Matrix.all.get(pricing.pricing_code)
            if (matrix) {
                beenSaved = !!(matrix.been_saved && matrix.been_saved === 1)
            }
            
            for (let n = 0; n < daysOfTheWeek.length; n++) {
                let disabled = ""
                let headingText = ucwords(daysOfTheWeek[n])
                let disabledDay = isDisabled(n, pricing.season_id)
                if (disabledDay) {
                    disabled = "disabled"
                    headingText = ucwords(daysOfTheWeek[n]) + " (disabled)"
                }
                
                let tableHeadRowColumn = $("<th/>", {
                    class: "" + disabled,
                    text: headingText,
                })
                
                DOWHEADINGROW.append(tableHeadRowColumn)
            }
            DOWHEADINGROW.append(DOWHEADINGACTIONCOLUMN)
        }
        
        return DOWHEADINGROW
    }
    
    const buildSeasonWrapper = function (season, matrixId, count) {
        return $("<div/>", {
            class: "accordion md-accordion",
            id: "accordionEx" + matrixId + "-" + count,
            role: "tablist",
            "aria-multiselectable": "true",
        })
            .attr("data-sectiontype", "season-" + season.season_id)
    }
    
    const buildUnitWrapper = function (unit, count) {
        let id = unit.id + "-" + count
        return $("<div/>", {
            class: "accordion md-accordion card card-body p-1 mb-2",
            id: "accordionUnit-" + id,
            role: "tablist",
            "aria-multiselectable": "true",
            
        })
            .attr("data-sectiontype", "unit-" + unit.id)
    }
    
    const buildPricingButtonRow = function (pricing) {
        let matrixCode = pricing.matrix_code
        
        let ROW = $("<div/>", {
            class: "row",
            //css: { "border-top": "solid 1px #dee2e6" },
        })
        
        let COL_6_1 = $("<div/>", {
            class: "col-12 col-md-6 mb-2 text-left",
        })
        
        let COL_6_2 = $("<div/>", {
            class: "col-12 col-md-6 mb-2 text-right",
        })
        
        let UPDATEBUTTON = $("<button/>", {
            class: "btn btn-primary btn-sm submit-pricing-matrix-form waves-effect waves-light",
            text: "Update",
            type: "button",
            id: "submitPricingMatrixForm-" + matrixCode,
            attr: { "data-targetform": "pricingMatrixForm-" + matrixCode },
        })
            .on("click", function () {
                updateMatrix(this)
            })
        
        COL_6_2.append(UPDATEBUTTON)
        
        return ROW.append(COL_6_1, COL_6_2)
    }
    
    const toggleCompletedMatrices = function (toggle) {
        let showElements = true
        if (toggle) {
            showElements = toggle
        }
        
        if (!$(_button_toggle_completed_matrices).attr("data-shown")) {
            $(_button_toggle_completed_matrices).attr("data-shown", (showElements === true) ? "true" : "false")
        }
        
        if ($(_button_toggle_completed_matrices).attr("data-shown") === "false") {
            $(_button_toggle_completed_matrices).attr("data-shown", "true")
            $(_button_toggle_completed_matrices).text("Hide Completed Matrices")
            showElements = true
        } else {
            $(_button_toggle_completed_matrices).attr("data-shown", "false")
            $(_button_toggle_completed_matrices).text("Show Completed Matrices")
            showElements = false
        }
        
        if (showElements) {
            $("[data-matrixcomplete='true']").show()
            matricesHidden = false
        } else {
            matricesHidden = true
            $("[data-matrixcomplete='true']").hide()
        }
        
    }
    
    const toggleCompletedPricings = function () {
        let showElements = true
        
        if (!$(_button_toggle_completed_pricings).attr("data-shown")) {
            $(_button_toggle_completed_pricings).attr("data-shown", (showElements === true) ? "true" : "false")
        }
        
        if ($(_button_toggle_completed_pricings).attr("data-shown") === "false") {
            $(_button_toggle_completed_pricings).attr("data-shown", "true")
            $(_button_toggle_completed_pricings).text("Hide Completed Pricings")
            showElements = true
        } else {
            $(_button_toggle_completed_pricings).attr("data-shown", "false")
            $(_button_toggle_completed_pricings).text("Show Completed Pricings")
            showElements = false
        }
        
        if (showElements) {
            $("[data-pricingcomplete='true']").show()
            pricingsHidden = false
        } else {
            $("[data-pricingcomplete='true']").hide()
            pricingsHidden = true
        }
        
    }
    
    const toggleUnitFilter = function () {
        let elements = document.querySelectorAll(`[data-type='unit']`)
        let showElements
        
        if (!$(_button_collapse_units).attr("data-shown")) {
            $(_button_collapse_units).attr("data-shown", "true")
            showElements = true
        }
        
        if ($(_button_collapse_units).attr("data-shown") === "false") {
            $(_button_collapse_units).attr("data-shown", "true")
            $(_button_collapse_units).text("Collapse Units")
            showElements = true
        } else {
            $(_button_collapse_units).attr("data-shown", "false")
            $(_button_collapse_units).text("Expand Units")
            showElements = false
        }
        
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i]
            let id = $(element).attr("id")
            $("#" + id).collapse((showElements === true) ? "show" : "hide")
            unitsCollapsed = (showElements === true)
            //pricingsHidden, matricesHidden, unitsCollapsed, seasonsCollapsed = false
        }
    }
    
    const toggleSeasonFilter = function () {
        let elements = document.querySelectorAll(`[data-type='season']`)
        let showElements = true
        
        if (!$(_button_collapse_seasons).attr("data-shown")) {
            $(_button_collapse_seasons).attr("data-shown", "true")
        }
        
        if ($(_button_collapse_seasons).attr("data-shown") === "false") {
            $(_button_collapse_seasons).attr("data-shown", "true")
            $(_button_collapse_seasons).text("Collapse Seasons")
            showElements = true
        } else {
            $(_button_collapse_seasons).attr("data-shown", "false")
            $(_button_collapse_seasons).text("Expand Seasons")
            showElements = false
        }
        
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i]
            let id = $(element).attr("id")
            $("#" + id).collapse((showElements === true) ? "show" : "hide")
            seasonsCollapsed = (showElements === true)
        }
    }
    
    const filtersReset = function (callback) {
        $("[data-matrixcomplete='true']").show()
        $(_button_toggle_completed_matrices).attr("data-shown", "true")
        $(_button_toggle_completed_matrices).text("Hide Completed Matrices")
        
        $("[data-pricingcomplete='true']").show()
        $(_button_toggle_completed_pricings).attr("data-shown", "true")
        $(_button_toggle_completed_pricings).text("Hide Completed Pricings")
        
        $(_pricing_strategy_season_id).val([]).trigger("change")
        $(_pricing_strategy_unit_id).val([]).trigger("change")
        
        $(_button_collapse_units).attr("data-shown", "false")
        $(_button_collapse_units).text("Expand Units")
        toggleUnitFilter()
        
        $(_button_collapse_seasons).attr("data-shown", "false")
        $(_button_collapse_seasons).text("Expand Seasons")
        toggleSeasonFilter()
        
        return callback(1)
    }
    
    const resetFilters = function () {
        $(_product_edit_pricing_section_reset_filters)
            .html("<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Loading...")
        filtersReset(function (data) {
            if (data) {
                $(_product_edit_pricing_section_reset_filters).html("Reset Filters")
            }
        })
    }
    
    const showAllFilterUnits = function () {
        let units = Array.from(Unit.all.values())
        $.each(units, function (i, unit) {
            let unitId = unit.id
            let dataVal = "unit-" + unitId
            let elements = document.querySelectorAll(`[data-sectiontype='${dataVal}']`)
            $.each(elements, function (i, el) {
                $(el).show()
            })
        })
    }
    
    const hideAllFilterUnits = function () {
        let units = Array.from(Unit.all.values())
        $.each(units, function (i, unit) {
            let unitId = unit.id
            let dataVal = "unit-" + unitId
            let elements = document.querySelectorAll(`[data-sectiontype='${dataVal}']`)
            $.each(elements, function (i, el) {
                $(el).hide()
            })
        })
    }
    
    const showAllFilterSeasons = function () {
        let seasons = Array.from(Season.all.values())
        $.each(seasons, function (i, season) {
            let seasonId = season.id
            let dataVal = "season-" + seasonId
            let elements = document.querySelectorAll(`[data-sectiontype='${dataVal}']`)
            $.each(elements, function (i, el) {
                $(el).show()
            })
        })
    }
    
    const hideAllFilterSeasons = function () {
        let seasons = Array.from(Season.all.values())
        $.each(seasons, function (i, season) {
            let seasonId = season.id
            let dataVal = "season-" + seasonId
            let elements = document.querySelectorAll(`[data-sectiontype='${dataVal}']`)
            $.each(elements, function (i, el) {
                $(el).hide()
            })
        })
    }
    
    const filterUnits = function () {
        hideAllFilterUnits()
        let unitIds = getListOfIds($(_pricing_strategy_unit_id).val())
        if (unitIds.length) {
            $.each(unitIds, function (i, unitId) {
                let dataVal = "unit-" + unitId
                let units = document.querySelectorAll(`[data-sectiontype='${dataVal}']`)
                $.each(units, function (i, el) {
                    $(el).show()
                })
            })
        } else {
            showAllFilterUnits()
        }
        
    }
    
    const filterSeasons = function () {
        hideAllFilterSeasons()
        let seasonIds = getListOfIds($(_pricing_strategy_season_id).val())
        if (seasonIds.length) {
            $.each(seasonIds, function (i, seasonId) {
                let dataVal = "season-" + seasonId
                let units = document.querySelectorAll(`[data-sectiontype='${dataVal}']`)
                $.each(units, function (i, el) {
                    $(el).show()
                })
            })
        } else {
            showAllFilterSeasons()
        }
        
    }
    
    const emptyPricingMatrix = function () {
        PricingWorksheet.incompletePricings = new Map()
        PricingWorksheet.incompleteMatrices = new Map()
        $(_product_edit_matrix_form).empty()
        $(_product_edit_matrix_form).html(`
                <div style="top:0;left:0;width:100%;height:500px;background:rgba(0,0,0,.25);" class="flex-center">
                    <div class="preloader-wrapper active">
                        <div class="spinner-layer spinner-blue-only">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div>
                            <div class="gap-patch">
                                <div class="circle"></div>
                            </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `)
    }
    
    const buildTableVariantHeadingBaseInputs = function (pricing) {
        let CONTAINER = $("<div/>", {
            class: "p-2",
        })
        let ROW = $("<div/>", {
            class: "row",
        })
        
        if (pricing) {
            let matrixCode = pricing.matrix_code
            let matrix = Matrix.all.get(matrixCode)
            let matrixId = ""
            let matrixName = (pricing.name) ? pricing.name : ""
            let beenSaved = false
            let cost, margin = null
            
            if (matrix) {
                matrixId = (matrix.id) ? matrix.id : null
                margin = (matrix.margin) ? matrix.margin : null
                cost = (matrix.cost) ? matrix.cost : null
                beenSaved = (pricing.been_saved === 1)
            }
            
            let COL_3_1 = $("<div/>", {
                class: "col-12 col-md-3 mb-2 px-4",
            })
            
            let COL_3_2 = $("<div/>", {
                class: "col-12 col-md-3 mb-2 px-4",
            })
            
            let COL_3_3 = $("<div/>", {
                class: "col-12 col-md-3 mb-2 px-4",
            })
            
            let COL_3_4 = $("<div/>", {
                class: "col-12 col-md-3 mb-2 px-4",
            })
            
            let LABELCOST = $("<label/>", {
                class: "",
                for: "base_cost_" + matrixCode,
                text: "Cost",
            })
            
            let LABELMARGIN = $("<label/>", {
                class: "",
                for: "base_margin_" + matrixCode,
                text: "Margin",
            })
            
            let LABELMATRIXID = $("<label/>", {
                class: "dev-element d-none",
                for: "base_matrix_id_" + matrixCode,
                text: "Matrix Id:",
            })
            
            let WRAPPERMATRIXNAME = $("<div/>", {
                class: "form-element",
            })
            
            let LABELMATRIXNAME = $("<label/>", {
                class: "dev-element d-none",
                for: "base_matrix_name_" + matrixCode,
                text: "Matrix Name:",
            })
            
            let INPUTMATRIXNAME = $("<input/>", {
                class: "form-control dev-element",
                type: "hidden",
                name: "baseMatrixName",
                readonly: "readonly",
                disabled: "disabled",
                id: "base_matrix_name_" + matrixCode,
            })
                .val(matrixName)
            
            let INPUTMATRIXID = $("<input/>", {
                class: "form-control dev-element",
                type: "hidden",
                name: "baseMatrixId",
                readonly: "readonly",
                disabled: "disabled",
                id: "base_matrix_id_" + matrixCode,
            })
                .val(matrixId)
            
            let INPUTCOST = $("<input/>", {
                class: "form-control",
                id: "base_cost_" + matrixCode,
                name: "baseCost",
                attr: {
                    "data-targetform": "pricingMatrixForm-" + matrixCode,
                },
            })
                .on("keyup", function () {
                    let form = document.getElementById($(this).attr("data-targetform"))
                    let val = this.value
                    let costInputs = form.querySelectorAll(".cost")
                    costInputs.forEach(el => {
                        if (!el.disabled) {
                            $(el).val(this.value)
                            if (this.value !== "") {
                                $(el).parent("div").find("label").addClass("active")
                            } else {
                                $(el).parent("div").find("label").removeClass("active")
                            }
                        }
                    })
                })
                .on("click", function () {
                    $(this).select()
                })
                .val(cost)
            
            let INPUTMARGIN = $("<input/>", {
                class: "form-control",
                id: "base_margin_" + matrixCode,
                name: "baseMargin",
                attr: {
                    "data-targetform": "pricingMatrixForm-" + matrixCode,
                },
            })
                .on("keyup", function () {
                    let form = document.getElementById($(this).attr("data-targetform"))
                    let costInputs = form.querySelectorAll(".margin")
                    costInputs.forEach(el => {
                        if (!el.disabled) {
                            $(el).val(this.value)
                            if (this.value !== "") {
                                $(el).parent("div").find("label").addClass("active")
                            } else {
                                $(el).parent("div").find("label").removeClass("active")
                            }
                        }
                    })
                })
                .on("click", function () {
                    $(this).select()
                })
                .val(margin)
            
            let WRAPPERCOST = $("<div/>", {
                class: "form-element",
            })
            
            let WRAPPERMATRIXID = $("<div/>", {
                class: "form-element",
            })
            
            let WRAPPERMATRIXCODE = $("<div/>", {
                class: "form-element",
            })
            
            let LABELMATRIXCODE = $("<label/>", {
                class: "dev-element d-none",
                for: "base_matrix_code_" + matrixCode,
                text: "Matrix Code:",
            })
            
            let INPUTMATRIXCODE = $("<input/>", {
                class: "form-control dev-element",
                type: "hidden",
                name: "baseMatrixCode",
                readonly: "readonly",
                disabled: "disabled",
                id: "base_matrix_code_" + matrixCode,
            })
                .val(matrixCode)
            
            let WRAPPERMARGIN = $("<div/>", {
                class: "form-element",
            })
            
            let ERRORCOST = $("<div/>", {
                class: "error w-100 text-center",
            })
            
            let ERRORMARGIN = $("<div/>", {
                class: "error w-100 text-center",
            })
            
            WRAPPERMATRIXID.append(LABELMATRIXID, INPUTMATRIXID)
            WRAPPERCOST.append(LABELCOST, INPUTCOST, ERRORCOST)
            WRAPPERMARGIN.append(LABELMARGIN, INPUTMARGIN, ERRORMARGIN)
            WRAPPERMATRIXCODE.append(LABELMATRIXCODE, INPUTMATRIXCODE)
            WRAPPERMATRIXNAME.append(LABELMATRIXNAME, INPUTMATRIXNAME)
            
            COL_3_1.append(WRAPPERCOST)
            COL_3_2.append(WRAPPERMARGIN)
            COL_3_3.append(WRAPPERMATRIXID)
            COL_3_4.append(WRAPPERMATRIXCODE, WRAPPERMATRIXNAME)
            ROW.append(COL_3_1, COL_3_2, COL_3_3, COL_3_4)
            CONTAINER.append(ROW)
        }
        
        return CONTAINER
    }
    
    const getRowValues = function (row) {
        let pricingId, variantId, pricingCode, matrixId, pricingCount = null, inputs = [],
            vals = {
                monCost: null,
                tueCost: null,
                wedCost: null,
                thuCost: null,
                friCost: null,
                satCost: null,
                sunCost: null,
                monMargin: null,
                tueMargin: null,
                wedMargin: null,
                thuMargin: null,
                friMargin: null,
                satMargin: null,
                sunMargin: null,
            }
        
        if ($(row).attr("data-dowrow") !== "true") {
            matrixId = ($(row).attr("data-matrixid")) ? (!isNaN(parseInt($(row).attr("data-matrixid")))) ? parseInt($(row).attr("data-matrixid")) : null : null
            pricingId = ($(row).attr("data-pricingid")) ? (!isNaN(parseInt($(row).attr("data-pricingid")))) ? parseInt($(row).attr("data-pricingid")) : null : null
            variantId = ($(row).attr("data-variantid")) ? (!isNaN(parseInt($(row).attr("data-variantid")))) ? parseInt($(row).attr("data-variantid")) : null : null
            pricingCode = ($(row).attr("data-pricingcode")) ? $(row).attr("data-pricingcode") : null
            pricingCount = ($(row).attr("data-pricingcount")) ? (!isNaN(parseInt($(row).attr("data-pricingcount")))) ? parseInt($(row).attr("data-pricingcount")) : null : null
            inputs = row.getElementsByTagName("input")
            
            $.each(inputs, function (k, el) {
                let name = (el.name) ? el.name : null
                let disabled = (el.disabled) ? el.disabled : false
                let value = (el.value) ? el.value : null
                if (!is_null(name) && !is_null(disabled) && !disabled) {
                    vals[name] = (!isNaN(parseInt(value))) ? parseInt(value) : null
                }
            })
            
            return remove_nulls(
                {
                    id: pricingId,
                    matrix_id: matrixId,
                    variant_id: variantId,
                    code: pricingCode,
                    count: pricingCount,
                    mon: vals.monCost,
                    tue: vals.tueCost,
                    wed: vals.wedCost,
                    thu: vals.thuCost,
                    fri: vals.friCost,
                    sat: vals.satCost,
                    sun: vals.sunCost,
                    monMargin: vals.monMargin,
                    tueMargin: vals.tueMargin,
                    wedMargin: vals.wedMargin,
                    thuMargin: vals.thuMargin,
                    friMargin: vals.friMargin,
                    satMargin: vals.satMargin,
                    sunMargin: vals.sunMargin,
                    enabled: 1,
                    note: null,
                },
            )
        }
    }
    
    const buildPricingData = function (table, matrix) {
        let pricings = []
        let productId = $(table).attr("data-productid")
        let seasonId = $(table).attr("data-seasonid")
        let unitId = $(table).attr("data-unitid")
        let matrixCode = ($(table).attr("data-matrixid"))
        
        for (let row of table.rows) {
            let rowVals = getRowValues(row)
            let pricingId, variantId, pricingCode, pricingCount = null, inputs = [],
                vals = {
                    monCost: null,
                    tueCost: null,
                    wedCost: null,
                    thuCost: null,
                    friCost: null,
                    satCost: null,
                    sunCost: null,
                    monMargin: null,
                    tueMargin: null,
                    wedMargin: null,
                    thuMargin: null,
                    friMargin: null,
                    satMargin: null,
                    sunMargin: null,
                }
            if ($(row).attr("data-dowrow") !== "true") {
                pricingId = ($(row).attr("data-pricingid")) ? (!isNaN(parseInt($(row).attr("data-pricingid")))) ? parseInt($(row).attr("data-pricingid")) : null : null
                variantId = ($(row).attr("data-variantid")) ? (!isNaN(parseInt($(row).attr("data-variantid")))) ? parseInt($(row).attr("data-variantid")) : null : null
                pricingCode = ($(row).attr("data-pricingcode")) ? $(row).attr("data-pricingcode") : null
                pricingCount = ($(row).attr("data-pricingcount")) ? (!isNaN(parseInt($(row).attr("data-pricingcount")))) ? parseInt($(row).attr("data-pricingcount")) : null : null
                inputs = row.getElementsByTagName("input")
                
                $.each(inputs, function (k, el) {
                    let name = (el.name) ? el.name : null
                    let disabled = (el.disabled) ? el.disabled : false
                    let value = (el.value) ? el.value : null
                    if (!is_null(name) && !is_null(disabled) && !disabled) {
                        vals[name] = (!isNaN(parseInt(value))) ? parseInt(value) : null
                    }
                })
                
                pricings.push(remove_nulls(
                    {
                        id: pricingId,
                        matrix_id: matrix.id,
                        variant_id: variantId,
                        code: pricingCode,
                        count: pricingCount,
                        mon: vals.monCost,
                        tue: vals.tueCost,
                        wed: vals.wedCost,
                        thu: vals.thuCost,
                        fri: vals.friCost,
                        sat: vals.satCost,
                        sun: vals.sunCost,
                        monMargin: vals.monMargin,
                        tueMargin: vals.tueMargin,
                        wedMargin: vals.wedMargin,
                        thuMargin: vals.thuMargin,
                        friMargin: vals.friMargin,
                        satMargin: vals.satMargin,
                        sunMargin: vals.sunMargin,
                        enabled: 1,
                        note: null,
                    },
                ))
            }
        }
        
        return pricings
    }
    
    const getFormValues = function (form) {
        if (!form) {
            return
        }
        let id = form.id
        let table = document.getElementById(id + "-table")
        let productId = $(table).attr("data-productid")
        let seasonId = $(table).attr("data-seasonid")
        let unitId = $(table).attr("data-unitid")
        let matrixCode = ($(table).attr("data-matrixid"))
        
        let matrix = {
            id: null,
            code: (form.elements["baseMatrixCode"].value !== "") ? form.elements["baseMatrixCode"].value : "",
            product_id: (!isNaN(parseInt(productId))) ? parseInt(productId) : null,
            season_id: (!isNaN(parseInt(seasonId))) ? parseInt(seasonId) : null,
            unit_id: (!isNaN(parseInt(unitId))) ? parseInt(unitId) : null,
            name: (form.elements["baseMatrixName"].value !== "") ? form.elements["baseMatrixName"].value : "",
            cost: (form.elements["baseCost"].value !== "") ? parseInt(form.elements["baseCost"].value) : null,
            margin: (form.elements["baseMargin"].value !== "") ? parseInt(form.elements["baseMargin"].value) : null,
            has_pricing: 1,
            been_saved: 1,
            enabled: 1,
            pricings: [],
        }
        matrix.price = null
        matrix.id = ($(table).attr("data-matrixid")) ? parseInt(($(table).attr("data-matrixid"))) : null
        matrix.pricings = buildPricingData(table, matrix)
        
        return remove_nulls(matrix)
    }
    
    const handlePricingWorksheetError = function (msg) {
        toastr.error(msg)
    }
    
    const update = function (dataToSend) {
        if (dataToSend) {
            sendUpdateRequest(dataToSend, function (data) {
                let matrix
                if (data) {
                    matrix = data
                    if (data[0]) {
                        matrix = data[0]
                    }
                    let pricings = (matrix.pricings) ? matrix.pricings : []
                    let pricingHold = new Map()
                    //console.log("matrix", matrix)
                    //console.log("pricings", pricings)
                    
                    Matrix.all.set(matrix.code, matrix)
                    
                    $.each(pricings, function (k, pricing) {
                        Pricing.all.set(pricing.code, pricing)
                    })
                    
                    PricingWorksheet.pricingWorksheet()
                    toastr.success(`Matrix: ${matrix.name} - has been updated`)
                }
            })
        }
    }
    
    const pricingUpdate = function (dataToSend) {
        if (dataToSend) {
            sendUpdateRequestPricing(dataToSend, function (data) {
                let pricing
                if (data) {
                    pricing = data
                    if (data[0]) {
                        pricing = data[0]
                    }
                    Pricing.all.set(pricing.code, pricing)
                    
                    PricingWorksheet.pricingWorksheet()
                    
                    console.log("pricingsHidden", pricingsHidden)
                    console.log("matricesHidden", matricesHidden)
                    console.log("unitsCollapsed", unitsCollapsed)
                    console.log("seasonsCollapsed", seasonsCollapsed)
                    
                    if (seasonsCollapsed) {
                        $(_button_collapse_seasons).attr("data-shown", "false")
                        $(_button_collapse_seasons).text("Expand Seasons")
                        toggleSeasonFilter()
                    }
                    
                    if (unitsCollapsed) {
                        $(_button_collapse_units).attr("data-shown", "false")
                        $(_button_collapse_units).text("Expand Units")
                        toggleUnitFilter()
                    }
                    
                    if (matricesHidden) {
                        $("[data-matrixcomplete='true']").show()
                        $(_button_toggle_completed_matrices).attr("data-shown", "true")
                        $(_button_toggle_completed_matrices).text("Hide Completed Matrices")
                    }
                    
                    if (pricingsHidden) {
                        $("[data-pricingcomplete='true']").show()
                        $(_button_toggle_completed_pricings).attr("data-shown", "true")
                        $(_button_toggle_completed_pricings).text("Hide Completed Pricings")
                    }
                    
                    toastr.success(`Pricing: ${pricing.name} - has been updated`)
                }
            })
        }
    }
    
    const sendUpdateRequest = function (dataToSend, callback) {
        let url = "/api/v1.0/matrices/update"
        
        if (dataToSend) {
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handlePricingWorksheetError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
            }
        }
    }
    
    const sendUpdateRequestPricing = function (dataToSend, callback) {
        let url = "/api/v1.0/pricings/update"
        
        if (dataToSend) {
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handlePricingWorksheetError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
            }
        }
    }
    
    const updateMatrix = function (_this) {
        let dataToSend = getFormValues(document.getElementById($(_this).attr("data-targetform")))
        
        confirmDialog(`Would you like to update?`, (ans) => {
            if (ans) {
                update(dataToSend)
            }
        })
    }
    
    const updatePricing = function (_this, row) {
        let dataToSend = getRowValues(row)
        
        confirmDialog(`Would you like to update?`, (ans) => {
            if (ans) {
                pricingUpdate(dataToSend)
            }
        })
    }
    
    const buildMatrixWrapper = function () {
        return $("<div/>", {})
    }
    
    const tableVariantHeading = function (pricing) {
        let matrix
        let H5 = $("<h5/>", {
            class: "card-title d-flex justify-content-between m-2",
        })
        
        if (pricing) {
            matrix = Matrix.all.get(pricing.pricing_code)
            if (!matrix) {
                matrix = Matrix.set()
            }
        }
        
        let name = (pricing.name) ? pricing.name : "Pricing"
        
        if (parseInt(_pricing_strategy_types_id.value) === 1) {
            name = "Unit Pricing"
        } else if (parseInt(_pricing_strategy_types_id.value) === 3) {
            name = "Daily Pricing"
        }
        
        let SPAN = $("<span/>", {
            class: "",
            text: (name) ? name : "Pricing Variant",
        })
        
        if (pricing && pricing.been_saved && pricing.been_saved === 1) {
            H5.append(SPAN, completed)
        } else {
            H5.append(SPAN, incomplete)
        }
        
        return H5
    }
    
    const buildPricingRow = function (pricing) {
        let productId = (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null
        let matrixCode = pricing.matrix_code
        
        let FORM = $("<form/>", {
            id: "pricingMatrixForm-" + matrixCode,
            class: "card card-body border border-dark rounded-lg mb-2 mt-2 p-0 ",
            attr: { "novalidate": "novalidate" },
        })
        
        if (pricing && pricing.been_saved && pricing.been_saved === 1) {
            FORM.attr("data-matrixcomplete", "true")
            
            if (PricingWorksheet.incompleteMatrices.get(matrixCode)) {
                PricingWorksheet.incompleteMatrices.delete(matrixCode)
            }
            
        } else {
            PricingWorksheet.incompleteMatrices.set(matrixCode, pricing)
            FORM.attr("data-matrixcomplete", "false")
        }
        
        let TABLECONTAINER = $("<div/>", {
            class: "pl-1 pr-1",
        })
        
        let TABLECONTAINERROW = $("<div/>", {
            class: "row",
        })
        
        let TABLECONTAINERCELL = $("<div/>", {
            class: "col-12",
        })
        
        let BASEELEMENTS = buildTableVariantHeadingBaseInputs(pricing)
        
        let BUTTONROW = buildPricingButtonRow(pricing)
        
        let TABLE = $("<table/>", {
            class: "table table-bordered table-sm",
            id: "pricingMatrixForm-" + matrixCode + "-table",
            attr: {
                "data-matrixcode": matrixCode,
                "data-productid": productId,
                "data-unitid": pricing.unit_id,
                "data-seasonid": pricing.season_id,
                "data-name": pricing.name,
            },
        })
        
        if (pricing.id) {
            TABLE.attr("data-matrixid", pricing.id)
        }
        
        let TBODY = $("<tbody/>", {})
        let THEAD = $("<thead/>", {})
            .append(tableDOW(pricing))
        
        for (let n = 0; n < pricing.variants.length; n++) {
            let variantPricing = pricing.variants[n]
            let BADGE = incomplete
            
            variantPricing.matrix_code = matrixCode
            
            let TR = $("<tr/>")
            let I = $("<i/>", {
                class: "far fa-edit",
            })
            
            TR.attr({
                "id": "tr-" + variantPricing.code,
                "data-variantid": (variantPricing.variant_id) ? variantPricing.variant_id : null,
                "data-pricingid": (variantPricing.id) ? variantPricing.id : null,
                "data-pricingcode": (variantPricing.code) ? variantPricing.code : null,
                "data-matrixcode": (variantPricing.matrix_code) ? variantPricing.matrix_code : null,
                "data-pricingcount": (variantPricing.count) ? variantPricing.count : null,
                "data-productid": productId,
                "data-targetform": "pricingMatrixForm-" + variantPricing.matrix_code,
                "data-seasonid": (variantPricing.season_id) ? variantPricing.season_id : null,
                "data-name": (variantPricing.name) ? variantPricing.name : null,
            })
            if (variantPricing.been_saved === 1) {
                TR.attr("data-pricingcomplete", "true")
                BADGE = completed
            } else {
                TR.attr("data-pricingcomplete", "false")
                PricingWorksheet.incompletePricings.set(variantPricing.pricing_code, variantPricing)
            }
            
            let HEADINGSPANCOLUMN = $(`
                        <td style="padding:0;">
                            <div class="d-flex flex-column">
                                <div class="p-1">
                                    ${BADGE}
                                </div>
                                <div class="p-1">
                                    <span class="table-variant-title">${pricing.name}</span>
                                </div>
                               
                            </div>
                        </td>
                    `)
            
            TR.append(HEADINGSPANCOLUMN)
            
            let UPDATEBUTTON = $("<button/>", {
                class: "btn btn-sm editRow btn-sm btn-teal waves-effect waves-light",
                type: "button",
                attr: {
                    "data-variantid": (variantPricing.variant_id) ? variantPricing.variant_id : null,
                    "data-pricingid": (variantPricing.id) ? variantPricing.id : null,
                    "data-pricingcode": (variantPricing.code) ? variantPricing.code : null,
                    "data-matrixcode": (variantPricing.matrix_code) ? variantPricing.matrix_code : null,
                    "data-pricingcount": (variantPricing.count) ? variantPricing.count : null,
                    "data-productid": productId,
                    "data-targetform": "pricingMatrixForm-" + variantPricing.matrix_code,
                    "data-seasonid": (variantPricing.season_id) ? variantPricing.season_id : null,
                    "data-name": (variantPricing.name) ? variantPricing.name : null,
                },
            })
                .append(I)
            
            if (variantPricing.matrix_id) {
                UPDATEBUTTON.attr("data-matrixid", variantPricing.matrix_id)
            }
            
            UPDATEBUTTON.on("click", function () {
                let row = document.getElementById("tr-" + variantPricing.code)
                
                if (row) {
                    updatePricing(this, row)
                }
            })
            
            for (let n = 0; n < daysOfTheWeek.length; n++) {
                let TD = $("<td/>")
                TD.append(buildCostElement(variantPricing, daysOfTheWeek[n]), buildMarginElement(variantPricing, daysOfTheWeek[n]))
                TR.append(TD)
            }
            
            let BUTTONCOLUMN = $("<td/>", {
                class: "text-center td-editor",
            })
                .append(UPDATEBUTTON)
            
            TR.append(BUTTONCOLUMN)
            
            TBODY.append(TR)
            
        }
        
        TABLE.append(THEAD, TBODY)
        TABLECONTAINER.append(TABLE)
        TABLECONTAINERCELL.append(TABLECONTAINER)
        TABLECONTAINERROW.append(TABLECONTAINERCELL)
        
        let HEADING = tableVariantHeading(pricing)
        let HR = $("<hr/>", {
            class: "ml-3 mr-3 mt-1 mb-3 color-dark",
        })
        return FORM.append(HEADING, HR, BASEELEMENTS, TABLECONTAINERROW, BUTTONROW)
    }
    
    const buildMarginElement = function (variantPricing, day) {
        let matrixCode = variantPricing.matrix_code
        let pricingCode = matrixCode + "-" + variantPricing.variant_id + "-" + variantPricing.count
        let pricing = Pricing.all.get(pricingCode)
        
        if (!pricing) {
            pricing = Pricing.set()
            pricing.note = "generated form"
        }
        
        pricing.product_id = variantPricing.product_id
        pricing.season_id = variantPricing.product_id
        pricing.unit_id = variantPricing.product_id
        pricing.variant_id = variantPricing.variant_id
        pricing.matrix_code = matrixCode
        pricing.pricing_code = pricingCode
        pricing.name = variantPricing.name
        pricing.code = pricingCode
        
        if (day) {
            let dayDisabled = isDisabled(day, variantPricing.season_id)
            let marginDay = day + "Margin"
            let margin = (pricing[marginDay]) ? pricing[marginDay] : null
            
            let INPUT = $("<input/>", {
                type: "text",
                id: "cm-" + pricingCode + "-" + day,
                name: marginDay,
                class: "form-control margin m-0",
            })
                .attr("data-element", "margin")
            
            let FORMELEMENT = $("<div/>", {
                class: "md-form md-outline form-sm input-with-post-icon mb-2 mt-3",
            })
            
            let LABEL = $("<label/>", {
                text: "Margin",
                for: "cm-" + pricingCode + "-" + day,
            })
            
            let I = $("<i/>", {
                class: "fas fa-percentage input-prefix",
            })
            
            if (isDisabled(day, variantPricing.season_id)) {
                INPUT.attr("disabled", "disabled")
                INPUT.val("")
                LABEL.removeClass("active")
                FORMELEMENT.addClass("disabled")
            } else {
                FORMELEMENT.removeClass("disabled")
                if (margin > 0) {
                    INPUT.val(margin)
                    LABEL.addClass("active")
                }
            }
            
            FORMELEMENT.append(I, INPUT, LABEL)
            
            return FORMELEMENT
        }
    }
    
    const buildCostElement = function (variantPricing, day) {
        let matrixCode = variantPricing.matrix_code
        let pricingCode = matrixCode + "-" + variantPricing.variant_id + "-" + variantPricing.count
        let pricing = Pricing.all.get(pricingCode)
        
        if (!pricing) {
            pricing = Pricing.set()
            pricing.note = "generated form"
        }
        
        pricing.product_id = variantPricing.product_id
        pricing.season_id = variantPricing.product_id
        pricing.unit_id = variantPricing.product_id
        pricing.variant_id = variantPricing.variant_id
        pricing.matrix_code = matrixCode
        pricing.pricing_code = pricingCode
        pricing.name = variantPricing.name
        pricing.code = pricingCode
        
        if (day) {
            let costDayName = day + "Cost"
            let cost = (pricing[day]) ? pricing[day] : 0
            let INPUT = $("<input/>", {
                type: "text",
                name: costDayName,
                id: "ce-" + pricingCode + "-" + day,
                class: "form-control cost m-0",
            })
                .attr("data-element", "cost")
            
            let FORMELEMENT = $("<div/>", {
                class: "md-form md-outline form-sm input-with-pre-icon mt-2 mb-3",
            })
            
            let LABEL = $("<label/>", {
                text: "Cost",
                for: "ce-" + pricingCode + "-" + day,
            })
            
            let I = $("<i/>", {
                class: "fas fa-dollar-sign input-prefix",
            })
            
            if (isDisabled(day, variantPricing.season_id)) {
                INPUT.attr("disabled", "disabled")
                INPUT.val("")
                LABEL.removeClass("active")
                FORMELEMENT.addClass("disabled")
            } else {
                FORMELEMENT.removeClass("disabled")
                if (cost > 0) {
                    INPUT.val(cost)
                    LABEL.addClass("active")
                }
            }
            
            FORMELEMENT.append(I, INPUT, LABEL)
            
            return FORMELEMENT
        }
    }
    
    const buildSeasonHeading = function (season, matrixId, count) {
        let seasonBackgroundColor, seasonTextColor, seasonBorderColor
        if (season) {
            let seasonName = (season.season_name) ? season.season_name : null
            let seasonId = (season.season_id) ? season.season_id : null
            let hasSeason = Season.all.get(seasonId)
            
            if (hasSeason) {
                seasonBackgroundColor = (hasSeason.color_scheme.background_color) ? hasSeason.color_scheme.background_color : null
                seasonTextColor = (hasSeason.color_scheme.text_color) ? hasSeason.color_scheme.text_color : null
                seasonBorderColor = (hasSeason.color_scheme.border_color) ? hasSeason.color_scheme.border_color : null
            }
            
            let SEASONHEADINGWRAPPER = $("<div/>", {
                class: "card-header p-0",
                role: "tab",
                id: "seasonHeading" + matrixId + "-" + count,
            })
            
            let I = $("<i/>", {
                class: "fas fa-angle-down rotate-icon",
            })
            
            let A = $("<a/>", {
                href: "#collapse" + matrixId + "-" + count,
                "aria-controls": "collapse" + matrixId + "-" + count,
                "data-toggle": "collapse",
                "aria-expanded": "true",
            })
            
            let SPAN = $("<span/>", {
                text: seasonName,
            })
            
            let HEADING = $("<h5/>", {
                class: "mb-0 w-100 d-flex align-items-center justify-content-between p-1",
                css: {
                    "background-color": `${seasonBackgroundColor}`,
                    "border": `solid 1px ${seasonBorderColor}`,
                    "color": `${seasonTextColor}`,
                },
            })
            
            SEASONHEADINGWRAPPER.append(A.append(HEADING.append(SPAN, I)))
            
            return SEASONHEADINGWRAPPER
        }
    }
    
    const buildUnitHeading = function (unit, count) {
        let id = unit.id + "-" + count
        let unitName = (unit.name) ? unit.name : null
        let unitId = (!isNaN(parseInt(unit.id))) ? parseInt(unit.id) : null
        let hasUnit = Unit.all.get(unitId)
        if (hasUnit) {
            let UNITHEADINGWRAPPER = $("<div/>", {
                class: "card-header p-0",
                role: "tab",
                id: "unitHeading-" + id,
            })
            
            let I = $("<i/>", {
                class: "fas fa-angle-down rotate-icon",
            })
            
            let A = $("<a/>", {
                href: "#unitCollapse-" + id,
                "aria-controls": "unitCollapse-" + id,
                "data-toggle": "collapse",
                "aria-expanded": "true",
            })
            
            let SPAN = $("<span/>", {
                text: unitName,
            })
            
            let HEADING = $("<h5/>", {
                class: "mb-0 w-100 d-flex align-items-center justify-content-between p-1",
            })
            
            UNITHEADINGWRAPPER.append(A.append(HEADING.append(SPAN, I)))
            
            return UNITHEADINGWRAPPER
        }
    }
    
    const buildPricingTables = function (matrices) {
        
        let $ACCORDIONWRAPPER = buildMatrixWrapper()
        
        if (matrices) {
            if (matrices.units) {
                let unitCount = 0
                $.each(matrices.units, function (index, unit) {
                    let seasons = unit.seasons
                    let UNITWRAPPER = buildUnitWrapper(unit, unitCount)
                    let UNITHEADING = buildUnitHeading(unit, unitCount)
                    let UNITCONTAINER = $("<div/>", {
                        class: "card border border-0",
                    })
                    let UNITCOLLAPSE = $("<div/>", {
                        class: "collapse show",
                        role: "tabpanel",
                        "data-parent": "#accordionUnit-" + unit.id + "-" + unitCount,
                        id: "unitCollapse-" + unit.id + "-" + unitCount,
                        "aria-labelledby": "unitHeading-" + unit.id + "-" + unitCount,
                    })
                        .attr("data-type", "unit")
                    
                    let UNITCARDBODY = $("<div/>", {
                        class: "card-body px-1",
                    })
                    
                    let count = 0
                    $.each(seasons, function (i, season) {
                        let seasonBackgroundColor, seasonTextColor, seasonBorderColor
                        let matrixId = _product_id.value + "-" + unit.id + "-" + season.season_id
                        let pricings = season.pricings
                        let seasonId = (season.season_id) ? season.season_id : null
                        let hasSeason = Season.all.get(seasonId)
                        
                        let SEASONWRAPPER = buildSeasonWrapper(season, matrixId, count)
                        let SEASONHEADING = buildSeasonHeading(season, matrixId, count)
                        let SEASONCONTAINER = $("<div/>", {
                            class: "card",
                        })
                        let SEASONCOLLAPSE = $("<div/>", {
                            class: "collapse show",
                            role: "tabpanel",
                            "data-parent": "#accordionEx" + matrixId + "-" + count,
                            id: "collapse" + matrixId + "-" + count,
                            "aria-labelledby": "seasonHeading" + matrixId + "-" + count,
                        })
                            .attr("data-type", "season")
                        
                        if (hasSeason) {
                            seasonBackgroundColor = hexToRgb(hasSeason.color_scheme.background_color)
                            seasonTextColor = hasSeason.color_scheme.text_color
                            seasonBorderColor = hasSeason.color_scheme.border_color
                        }
                        
                        let SEASONCARDBODY = $("<div/>", {
                            class: "card-body p-1",
                            css: {
                                "background": `rgba(${seasonBackgroundColor.join(",")}, .15)`,
                                "color": seasonTextColor,
                            },
                        })
                        
                        $.each(pricings, function (ind, pricing) {
                            
                            SEASONCARDBODY.append(buildPricingRow(pricing))
                            SEASONCOLLAPSE.append(SEASONCARDBODY)
                        })
                        
                        SEASONCONTAINER.append(SEASONHEADING, SEASONCOLLAPSE)
                        SEASONWRAPPER.append(SEASONCONTAINER)
                        UNITCARDBODY.append(SEASONWRAPPER)
                        UNITCOLLAPSE.append(UNITCARDBODY)
                        count = count + 1
                    })
                    
                    UNITCONTAINER.append(UNITHEADING, UNITCOLLAPSE)
                    UNITWRAPPER.append(UNITCONTAINER)
                    $ACCORDIONWRAPPER.append(UNITWRAPPER)
                    unitCount += 1
                })
            }
        }
        
        return $ACCORDIONWRAPPER
    }
    
    const getVariants = function () {
        let variantsUsed = []
        let pricingStrategyType = (!isNaN(parseInt(_pricing_strategy_types_id.value))) ? parseInt(_pricing_strategy_types_id.value) : null
        switch (pricingStrategyType) {
            case 1:
                variantsUsed = [36]
                break
            case 2:
                let variantList = Array.from(Variant.all.values())
                for (let n = 0; n < variantList.length; n++) {
                    if (variantList[n].used_in_pricing) {
                        variantsUsed.push(variantList[n].id)
                    }
                }
                break
            default:
                variantsUsed = [36]
                break
        }
        
        return variantsUsed
    }
    
    const getSeasons = function () {
        var seasonsUsed = []
        var seasonList = Array.from(Season.all.values())
        for (let n = 0; n < seasonList.length; n++) {
            seasonsUsed.push(seasonList[n])
        }
        
        return seasonsUsed
    }
    
    const getUnits = function () {
        var unitsUsed = []
        var unitList = Array.from(Unit.all.values())
        for (let n = 0; n < unitList.length; n++) {
            unitsUsed.push(unitList[n])
        }
        
        return unitsUsed
    }
    
    const getVariantDetails = function (variantId) {
        let name = ""
        if (parseInt(_pricing_strategy_types_id.value) === 1) {
            name = "Unit Pricing"
        } else if (parseInt(_pricing_strategy_types_id.value) === 3) {
            name = "Daily Pricing"
        }
        
        let details = {
            category_id: 1,
            code: "VA-00000000036-OTHR",
            created_by: user_id,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
            enabled: 1,
            id: 36,
            max_age: null,
            min_age: null,
            modified_by: user_id,
            name: name,
            note: null,
            used_in_pricing: 1,
        }
        let variant = Variant.all.get(variantId)
        if (variant) {
            details = Variant.set(variant)
        }
        
        return details
    }
    
    const addVariantList = function (unit, season, matrixCode, variantComboId) {
        let variants = variantComboId.trim().split("-").map(Number)
        let seasonId = parseInt(season.id)
        let unitId = parseInt(unit.id)
        let productId = (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null
        
        let tempHold = new Map()
        
        $.each(variants, function (key, variantId) {
            //let variant = Variant.all.get(variantId)
            let variant = getVariantDetails(variantId)
            
            if (variant) {
                
                let hasTempHold = tempHold.get(variantId)
                
                if (hasTempHold) {
                    let count = hasTempHold.count
                    count = count + 1
                    hasTempHold.count = count
                    hasTempHold.name = count + " " + pluralize(variant.name)
                    let pricingCode = matrixCode.toString() + "-" + variantId + "-" + count
                    let pricing = Pricing.all.get(pricingCode)
                    
                    if (!pricing) {
                        pricing = {
                            aaa: "ok here 2",
                            been_saved: 0,
                            has_pricing: 0,
                            code: matrixCode.toString() + "-" + variantId.toString() + "-" + count.toString(),
                            count: count,
                            created_by: user_id,
                            date_created: formatDateMySQL(),
                            date_modified: formatDateMySQL(),
                            enabled: 1,
                            fri: null,
                            friMargin: null,
                            id: null,
                            matrix_code: matrixCode.toString(),
                            matrix_id: null,
                            modified_by: user_id,
                            mon: null,
                            monMargin: null,
                            name: variant.name + " " + count,
                            note: "generated form",
                            pricing_code: pricingCode,
                            product_id: productId,
                            sat: null,
                            satMargin: null,
                            season_id: seasonId,
                            sun: null,
                            sunMargin: null,
                            thu: null,
                            thuMargin: null,
                            tue: null,
                            tueMargin: null,
                            unit_id: unitId,
                            variant_id: variantId,
                            wed: null,
                            wedMargin: null,
                        }
                    } else {
                        pricing.aaa = 1
                        pricing.has_pricing = 1
                        pricing.been_saved = 1
                    }
                    
                    hasTempHold.variants.push({
                        aaa: "ok here",
                        matrix_code: matrixCode.toString(),
                        been_saved: 5,
                        has_pricing: (pricing.has_pricing) ? pricing.has_pricing : 0,
                        code: matrixCode.toString() + "-" + variantId.toString() + "-" + count.toString(),
                        count: count,
                        created_by: (pricing.created_by) ? pricing.created_by : user_id,
                        date_created: formatDateMySQL(),
                        date_modified: formatDateMySQL(),
                        enabled: (pricing.enabled) ? pricing.enabled : 1,
                        fri: (pricing.fri) ? pricing.fri : null,
                        friMargin: (pricing.friMargin) ? pricing.friMargin : null,
                        id: (pricing.id) ? pricing.id : null,
                        matrix_id: (pricing.matrix_id) ? pricing.matrix_id : null,
                        modified_by: (pricing.modified_by) ? pricing.matrix_id : user_id,
                        mon: (pricing.mon) ? pricing.mon : null,
                        monMargin: (pricing.monMargin) ? pricing.monMargin : null,
                        name: variant.name + " " + count,
                        note: "generated form",
                        pricing_code: matrixCode.toString() + "-" + variantId.toString() + "-" + count.toString(),
                        product_id: (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null,
                        sat: (pricing.sat) ? pricing.sat : null,
                        satMargin: (pricing.satMargin) ? pricing.satMargin : null,
                        season_id: parseInt(season.id),
                        sun: (pricing.sun) ? pricing.sun : null,
                        sunMargin: (pricing.sunMargin) ? pricing.sunMargin : null,
                        thu: (pricing.thu) ? pricing.thu : null,
                        thuMargin: (pricing.thuMargin) ? pricing.thuMargin : null,
                        tue: (pricing.tue) ? pricing.tue : null,
                        tueMargin: (pricing.tueMargin) ? pricing.tueMargin : null,
                        unit_id: unit.id,
                        variant_id: variantId,
                        wed: (pricing.wed) ? pricing.wed : null,
                        wedMargin: (pricing.wedMargin) ? pricing.wedMargin : null,
                    })
                    
                } else {
                    let count = 1
                    let pricingCode = matrixCode.toString() + "-" + variantId + "-" + count
                    let pricing = Pricing.all.get(pricingCode)
                    
                    if (!pricing) {
                        
                        pricing = {
                            aaa: "ok here 1",
                            has_pricing: 0,
                            been_saved: 0,
                            code: pricingCode,
                            count: count,
                            created_by: user_id,
                            date_created: formatDateMySQL(),
                            date_modified: formatDateMySQL(),
                            enabled: 1,
                            fri: null,
                            friMargin: null,
                            id: null,
                            matrix_code: matrixCode,
                            pricing_code: pricingCode,
                            matrix_id: null,
                            modified_by: user_id,
                            mon: null,
                            monMargin: null,
                            name: variant.name + " " + count,
                            note: "generated form",
                            product_id: productId,
                            sat: null,
                            satMargin: null,
                            season_id: seasonId,
                            sun: null,
                            sunMargin: null,
                            thu: null,
                            thuMargin: null,
                            tue: null,
                            tueMargin: null,
                            unit_id: unitId,
                            variant_id: variant.id,
                            wed: null,
                            wedMargin: null,
                        }
                    } else {
                        pricing.aaa = "hasPricing"
                        pricing.been_saved = 1
                        pricing.has_pricing = 1
                    }
                    
                    hasTempHold = {
                        name: count + " " + variant.name,
                        variant_combo_id: variantComboId.trim(),
                        count: count,
                        variants: [
                            {
                                aaa: (pricing.aaa) ? pricing.aaa : "ghg",
                                code: pricingCode,
                                has_pricing: (pricing.has_pricing) ? pricing.has_pricing : 0,
                                variant_id: variantId,
                                name: variant.name + " " + count,
                                count: count,
                                created_by: pricing.created_by,
                                date_created: (pricing.date_created) ? pricing.date_created : formatDateMySQL(),
                                date_modified: (pricing.date_modified) ? pricing.date_modified : formatDateMySQL(),
                                enabled: (pricing.enabled) ? pricing.enabled : 1,
                                fri: null,
                                friMargin: null,
                                id: (pricing.id) ? pricing.id : null,
                                matrix_code: matrixCode,
                                matrix_id: (pricing.matrix_id) ? parseInt((pricing.matrix_id)) : null,
                                modified_by: (pricing.modified_by) ? parseInt((pricing.modified_by)) : user_id,
                                mon: (pricing.mon) ? parseInt((pricing.mon)) : null,
                                monMargin: null,
                                note: "fff",
                                pricing_code: matrixCode + "-" + variantId + "-" + count,
                                product_id: null,
                                sat: null,
                                satMargin: null,
                                season_id: null,
                                sun: null,
                                sunMargin: null,
                                thu: null,
                                thuMargin: null,
                                tue: null,
                                tueMargin: null,
                                unit_id: unit.id,
                                wed: null,
                                wedMargin: null,
                            },
                        ],
                    }
                }
                
                tempHold.set(variantId, hasTempHold)
                
            } else {
                if (parseInt(variantId) === 36) {
                    variant = {
                        category_id: 1,
                        code: "VA-00000000036-OTHR",
                        created_by: 4,
                        date_created: "2022-01-18 08:08:22",
                        date_modified: "2022-01-18 12:02:26",
                        enabled: 1,
                        id: 36,
                        max_age: null,
                        min_age: null,
                        modified_by: 4,
                        name: "Other",
                        note: null,
                        used_in_pricing: 1,
                    }
                }
            }
            
        })
        
        let beenSaved, pricingBeenSaved = 0
        let myVariants = []
        let name = []
        let pricingCode, mCode
        let matrixId, pricingId = null
        
        $.each(Array.from(tempHold.values()), function (key, variantValues) {
            name.push(variantValues.name)
            
            if (variantValues.variants) {
                $.each(variantValues.variants, function (k, v) {
                    pricingCode = matrixCode + "-" + v.variant_id + "-" + v.count
                    mCode = matrixCode
                    //let variant = Variant.all.get(v.variant_id)
                    let variant = getVariantDetails(v.variant_id)
                    let matrix = Matrix.all.get(mCode)
                    let pricing = Pricing.all.get(pricingCode)
                    let season = Season.all.get(seasonId)
                    let matrix_code = mCode
                    let sun = null
                    let mon = null
                    let tue = null
                    let wed = null
                    let thu = null
                    let fri = null
                    let sat = null
                    let sunMargin = null
                    let monMargin = null
                    let tueMargin = null
                    let wedMargin = null
                    let thuMargin = null
                    let friMargin = null
                    let satMargin = null
                    let enabled = 1
                    let note = null
                    let date_created = formatDateMySQL()
                    let date_modified = formatDateMySQL()
                    let created_by = user_id
                    let modified_by = user_id
                    
                    if (matrix) {
                        matrixId = matrix.id
                        beenSaved = 1
                    }
                    
                    if (pricing) {
                        pricingId = pricing.id
                        pricingBeenSaved = 1
                        sun = pricing.sun
                        mon = pricing.mon
                        tue = pricing.tue
                        wed = pricing.wed
                        thu = pricing.thu
                        fri = pricing.fri
                        sat = pricing.sat
                        sunMargin = pricing.sunMargin
                        monMargin = pricing.monMargin
                        tueMargin = pricing.tueMargin
                        wedMargin = pricing.wedMargin
                        thuMargin = pricing.thuMargin
                        friMargin = pricing.friMargin
                        satMargin = pricing.satMargin
                        enabled = pricing.enabled
                        note = pricing.note
                        date_created = pricing.date_created
                        date_modified = pricing.date_modified
                        created_by = pricing.created_by
                        modified_by = pricing.modified_by
                    }
                    
                    let tempV = {
                        count: v.count,
                        been_saved: pricingBeenSaved,
                        code: pricingCode,
                        pricing_code: pricingCode,
                        product_id: productId,
                        unit_id: unitId,
                        season_id: seasonId,
                        variant_id: v.variant_id,
                        matrix_id: matrixId,
                        name: variant.name + " " + v.count,
                        id: pricingId,
                        sun: sun,
                        mon: mon,
                        tue: tue,
                        wed: wed,
                        thu: thu,
                        fri: fri,
                        sat: sat,
                        sunMargin: sunMargin,
                        monMargin: monMargin,
                        tueMargin: tueMargin,
                        wedMargin: wedMargin,
                        thuMargin: thuMargin,
                        friMargin: friMargin,
                        satMargin: satMargin,
                        enable: enabled,
                        note: note,
                        date_created: date_created,
                        date_modified: date_modified,
                        created_by: created_by,
                        modified_by: modified_by,
                    }
                    
                    tempV["matrix_code"] = "H"
                    myVariants.push(tempV)
                })
            }
            
        })
        
        name = name.join(" - ")
        let been_saved = 0
        let cost = null
        let margin = null
        let m = Matrix.all.get(matrixCode)
        
        if (m) {
            been_saved = 1
            cost = m.cost
            margin = m.margin
        }
        
        return {
            name: name,
            cost: cost,
            margin: margin,
            season_id: seasonId,
            unit_id: unitId,
            product_id: productId,
            been_saved: been_saved,
            matrix_code: matrixCode,
            id: (matrixId) ? matrixId : null,
            variants: myVariants,
        }
    }
    
    const getVariantCombinations = function (depth, baseString, arrLetters) {
        for (let i = 0; i < arrLetters.length; i++) {
            if (depth === 1) {
                let variantComboId = baseString + arrLetters[i]
                
                let combos = variantComboId.split('-').map(function (item) {
                    return parseInt(item, 10)
                })
                
                combos = combos.sort().join("-")
                
                let hasVariantComboIndex = variantCombinations.indexOf(variantComboId)
                if (hasVariantComboIndex < 0) {
                    variantCombinations.push(combos)
                }
                
            } else {
                let id = arrLetters[i]
                getVariantCombinations(depth - 1, baseString + arrLetters[i] + "-", arrLetters)
            }
        }
    }
    
    const buildPricingWorksheet = function () {
        let productId = (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null
        let worksheet = {
            id: null,
            units: [],
        }
        
        variantList = getVariants()
        seasonList = getSeasons()
        unitList = getUnits()
        
        //loop through units
        for (let m = 0; m < unitList.length; m++) {
            variantCombinations = []
            let unit = unitList[m]
            let unitId = parseInt(unit.id)
            let max_pax = (unit.max_pax) ? parseInt(unit.max_pax) : 5
            let min_pax = (unit.min_pax) ? parseInt(unit.min_pax) : 1
            
            let pricingStrategyType = (!isNaN(parseInt(_pricing_strategy_types_id.value))) ? parseInt(_pricing_strategy_types_id.value) : null
            switch (pricingStrategyType) {
                case 1:
                    min_pax = 1
                    max_pax = 1
                    break
                case 2:
                    if (min_pax > max_pax) {
                        let temp = max_pax
                        max_pax = min_pax
                        min_pax = temp
                    }
                    break
                default:
                    min_pax = 1
                    max_pax = 1
                    break
            }
            
            for (let n = min_pax; n <= max_pax; n++) {
                getVariantCombinations(n, "", getVariants())
            }
            
            let variantCombinationList = variantCombinations
            
            let unitSection = {
                id: unit.id,
                name: unit.name,
                seasons: [],
            }
            
            //loop through seasons
            for (let n = 0; n < seasonList.length; n++) {
                let season = seasonList[n]
                let seasonId = (!isNaN(parseInt(season.id))) ? parseInt(season.id) : null
                let matrixCode = productId + "-" + unitId + "-" + seasonId
                let matrix = Matrix.all.get(matrixCode)
                
                if (matrix) {
                    matrix.pricings = []
                } else {
                    matrix = {
                        been_saved: 0,
                        code: matrixCode,
                        cost: 0,
                        created_by: 4,
                        date_created: "2022-01-14 09:00:39",
                        date_modified: "2022-01-14 09:00:39",
                        enabled: 1,
                        has_pricing: 1,
                        id: null,
                        margin: 0,
                        modified_by: 4,
                        note: null,
                        price: 201,
                        pricings: [],
                    }
                }
                
                let seasonSection = {
                    been_saved: matrix.been_saved,
                    code: matrix.code,
                    cost: matrix.cost,
                    created_by: matrix.created_by,
                    date_created: matrix.date_created,
                    date_modified: matrix.date_modified,
                    enabled: matrix.enabled,
                    has_pricing: matrix.has_pricing,
                    id: matrix.id,
                    margin: matrix.margin,
                    modified_by: matrix.modified_by,
                    note: matrix.note,
                    price: matrix.price,
                    season_id: season.id,
                    season_name: season.name,
                    matrix_code: matrixCode,
                    pricings: [],
                }
                
                //loop through variants
                $.each(variantCombinationList, function (key, variantComboId) {
                    seasonSection.matrix_code = matrixCode + "-" + variantComboId
                    seasonSection.pricings.push(addVariantList(unit, season, matrixCode + "-" + variantComboId, variantComboId))
                })
                
                unitSection.seasons.push(seasonSection)
            }
            
            worksheet.units.push(unitSection)
        }
        
        return worksheet
    }
    
    const pricingWorksheet = function () {
        resetFilters()
        emptyPricingMatrix()
        variantCombinations = []
        $(_product_edit_matrix_form).empty().append(buildPricingTables(PricingWorksheet.buildPricingWorksheet()))
        status()
    }
    
    const init = function (settings) {
        let pricingStrategyTypesId = null
        if (settings) {
            if (settings.pricing_strategy) {
                if (settings.pricing_strategy.pricing_strategy_types_id) {
                    pricingStrategyTypesId = (!isNaN(parseInt(settings.pricing_strategy.pricing_strategy_types_id))) ? parseInt(settings.pricing_strategy.pricing_strategy_types_id) : null
                }
            }
            
        }
        
        $(document).ready(function () {
            PricingWorksheet.pricingStrategyId = pricingStrategyTypesId
            if (_pricing_strategy_types_id) {
                $(_pricing_strategy_types_id)
                    .val(PricingWorksheet.pricingStrategyId)
                    .trigger("change")
            }
        })
    }
    
    return {
        pricingStrategyId: null,
        incompleteMatrices: new Map(),
        incompletePricings: new Map(),
        init: function (settings) {
            init(settings)
        },
        pricingWorksheet: function () {
            pricingWorksheet()
        },
        buildPricingWorksheet: function () {
            return buildPricingWorksheet()
        },
        status: function () {
            return status()
        },
    }
})()

const Upload = function (file) {
    this.file = file
}

const _image_manager_is_cover_image = document.getElementById("image_manager_is_cover_image")
const _image_manager_title = document.getElementById("image_manager_title")
const _image_manager_caption = document.getElementById("image_manager_caption")
const _image_manager_upload = document.getElementById("image_manager_upload")
const _image_manager_alt_text = document.getElementById("image_manager_alt_text")
const _image_manager_form_data = document.getElementById("image_manager_form_data")
const _image_manager_image_id = document.getElementById("image_manager_id")
const _provider_edit = document.getElementById("provider_edit")
const _vendor_edit = document.getElementById("vendor_edit")
const _provider_company_id = document.getElementById("provider_company_id")
const _vendor_company_id = document.getElementById("vendor_company_id")
Upload.prototype.getType = function () {
    return this.file.type
}

Upload.prototype.getSize = function () {
    return this.file.size
}

Upload.prototype.getName = function () {
    return this.file.name
}

Upload.prototype.doUpload = function () {
    let that = this
    let formData = new FormData()
    
    /**
     * add assoc key values, this will be posts values
     */
    formData.append("file", this.file, this.getName())
    formData.append("upload_file", true)
    formData.append("title", (_image_manager_title.value !== "") ? _image_manager_title.value : null)
    formData.append("caption", (_image_manager_caption.value !== "") ? _image_manager_caption.value : null)
    formData.append("is_cover_image", (_image_manager_is_cover_image.checked !== true) ? parseInt(0) : parseInt(1))
    formData.append("alt", (_image_manager_alt_text.value !== "") ? _image_manager_alt_text.value : null)
    
    /**
     * check if provider, user, unit, or product
     */
    if (_provider_edit) {
        formData.append("directory_id", parseInt(_provider_company_id.value))
        formData.append("directory", "company")
    }
    
    if (_vendor_edit) {
        formData.append("directory_id", parseInt(_vendor_company_id.value))
        formData.append("directory", "company")
    }
    
    $.ajax({
        type: "POST",
        url: "/api/v1.0/images/update",
        xhr: function () {
            var myXhr = $.ajaxSettings.xhr()
            if (myXhr.upload) {
                myXhr.upload.addEventListener("progress", that.progressHandling, false)
            }
            return myXhr
        },
        success: function (data) {
            Console.log("data", data)
            let image, result = null
            if (data) {
                if (data.result) {
                    result = data.result
                    if (result[0]) {
                        image = result[0]
                    }
                }
            }
            
            if (image) {
                let imageManager
                if (_provider_edit) {
                    imageManager = $("#companyImages").imageManager()
                }
                
                if (_vendor_edit) {
                    imageManager = $("#companyImages").imageManager()
                }
                
                imageManager.addImage(image)
                toastr.success("Image Uploaded")
                Upload.prototype.resetForm()
                $("button.dropify-clear").click()
            }
            
        },
        error: function (error) {
            toastr.error("Error")
            Console.log("error", error)
        },
        async: true,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        timeout: 60000,
    })
}

Upload.prototype.progressHandling = function (event) {
    var percent = 0
    var position = event.loaded || event.position
    var total = event.total
    var progress_bar_id = "#progress-wrp"
    if (event.lengthComputable) {
        percent = Math.ceil(position / total * 100)
    }
    // update progressbars classes so it fits your code
    $(progress_bar_id + " .progress-bar").css("width", +percent + "%")
    $(progress_bar_id + " .status").text(percent + "%")
}

Upload.prototype.progressReset = function () {
    let percent = 0
    let progress_bar_id = "#progress-wrp"
    $(progress_bar_id + " .progress-bar").css("width", +percent + "%")
    $(progress_bar_id + " .status").text(percent + "%")
}

Upload.prototype.resetForm = function () {
    Upload.prototype.progressReset()
    _image_manager_is_cover_image.checked = false
    _image_manager_image_id.value = ""
    _image_manager_title.value = ""
    _image_manager_upload.value = ""
    _image_manager_caption.value = ""
    _image_manager_alt_text.value = ""
    _image_manager_upload.disabled = false
    $(_image_manager_form_data).hide()
}

Upload.prototype.populateForm = function (image) {
    Upload.prototype.progressReset()
    let img = image.path + "/" + image.name + "." + image.extension
    _image_manager_is_cover_image.checked = (image.is_cover_image === 1)
    _image_manager_image_id.value = image.id
    _image_manager_title.value = image.title
    _image_manager_caption.value = image.caption
    _image_manager_alt_text.value = image.alt
    $("button.dropify-clear").click()
    _image_manager_upload.disabled = true
    $(_image_manager_form_data).show()
    
}

$("#image_manager_upload")
  .on("change", function () {
      _image_manager_is_cover_image.checked = false
      _image_manager_image_id.value = ""
      _image_manager_title.value = ""
      _image_manager_caption.value = ""
      _image_manager_alt_text.value = ""
      $(_image_manager_form_data).show()
  })

$("#image_manager_clear_button")
  .on("click", function () {
      Upload.prototype.resetForm()
  })

$.fn.YearCalendar = function (settings) {
    "use strict"
    
    const _calendar_filter_ranges = document.getElementById("calendar_filter_ranges")
    const _product_id = document.getElementById("product_id")
    const _calendar_display_select_all_days = document.getElementById("calendar_display_select_all_days")
    const _calendar_display_clear_selected_days = document.getElementById("calendar_display_clear_selected_days")
    
    let calendarType = "season"
    let selectedStart, selectedEnd = null
    let calendar_id = $(this).attr("id")
    let calContainer = document.getElementById(calendar_id)
    let calendars = []
    let seasonEvents = new Map()
    let product_id = parseInt(_product_id.value)
    
    $(_calendar_display_select_all_days)
        .on("click", function () {
            selectAllDays()
        })
    
    $(_calendar_display_clear_selected_days)
        .on("click", function () {
            clearSelectedDates()
        })
    
    const selectAllDays = function () {
        clearSelectedDates()
        const start = new Date(new Date().getFullYear(), 0, 1)
        const end = new Date(new Date().getFullYear(), 11, 31)
        
        let startDate = moment(start).format("YYYY-MM-DD")
        let endDate = moment(end).format("YYYY-MM-DD")
        
        selectDates(this, startDate, endDate)
        
    }
    
    const pad = function (d) {
        return (d < 10) ? '0' + d.toString() : d.toString()
    }
    
    const buildCalendarRow = function (calendar_id) {
        let calendarRow = document.createElement("div")
        calendarRow.classList = "row gx-1"
        return calendarRow
    }
    
    const buildCalendarColumn = function (calendar_id) {
        let calendarRow = document.createElement("div")
        calendarRow.classList = "flex-fill col-6 p-1"
        return calendarRow
    }
    
    const buildCalendarElementPanel = function (calendar_id) {
        let calendarBlock = document.createElement("div")
        calendarBlock.classList = ["card card-block p-1 z-depth-0"]
        
        return calendarBlock
    }
    
    const buildCalendarElement = function (calendar_id) {
        let calendarPanel = buildCalendarElementPanel(calendar_id)
        let calendarColumn = buildCalendarColumn(calendar_id)
        let calendarBlock = document.createElement("div")
        let calendarBlockId = "calendar_block_" + calendar_id
        
        calendarBlock.classList = "my_calendar"
        calendarBlock.id = calendarBlockId
        
        calendarColumn.appendChild(calendarPanel)
        calendarPanel.appendChild(calendarBlock)
        
        calendars.push(calendarBlock)
        return calendarColumn
    }
    
    const buildCalendarContainer = function () {
        let calendarBlockContainer = document.createElement("div")
        let calendarBlockContainerId = "calendar_block_container"
        let row = buildCalendarRow()
        
        calendarBlockContainer.classList = ["calendarContainer container-fluid"]
        calendarBlockContainer.id = calendarBlockContainerId
        
        for (let n = 0; n < initialCalenderViewCount; n++) {
            let id = (n + 1)
            if (n % 2 === 0 && n > 0) {
                calendarBlockContainer.appendChild(row)
                row = buildCalendarRow(id)
            }
            
            row.appendChild(buildCalendarElement(id))
        }
        
        calendarBlockContainer.appendChild(row)
        
        return calendarBlockContainer
    }
    
    const clearSelectedDates = function () {
        let days = $("td[season='true']")
        days.each(function (index, element) {
            $(this).removeClass("selected-day")
            $(this).attr("data-selected", "false")
        })
        YearCalendar.selectedDates = new Map()
    }
    
    const fetchCalendarEvents = function (dataToSend, callback) {
        if (dataToSend) {
            try {
                sendGetRequest("/api/v1.0/calendars", dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return callback([])
                    }
                })
            } catch (e) {
                console.log("error", e)
                return callback([])
            }
        } else {
            return callback([])
        }
    }
    
    const getDate = function (startYear, monthsOut) {
        let startMonth = (0 + monthsOut) + 1
        let startDay = 1
        return moment(startYear + "-" + pad(startMonth) + "-" + pad(startDay)).format("YYYY-MM-DD")
    }
    
    const selectDay = function (_this, dateClicked) {
        if ($(_this).hasClass("selected-day")) {
            $(_this).removeClass("selected-day")
            $("td.fc-day-top[data-date='" + moment(dateClicked).format("YYYY-MM-DD") + "']")
                .removeClass("selected-day")
            YearCalendar.selectedDates.delete(dateClicked)
        } else {
            $(_this).addClass("selected-day")
            $("td.fc-day-top[data-date='" + moment(dateClicked).format("YYYY-MM-DD") + "']").addClass("selected-day")
            YearCalendar.selectedDates.set(dateClicked, dateClicked)
            selectedStart = dateClicked
            selectedEnd = null
        }
    }
    
    const selectDates = function (_this, startDate, endDate) {
        let start = new Date(moment(startDate).format("MM/DD/YYYY"))
        let end = new Date(moment(endDate).format("MM/DD/YYYY"))
        let loop = new Date(start)
        
        $("td.fc-day[data-date='" + moment(endDate).format("YYYY-MM-DD") + "']").removeClass("selected-day")
        $("td.fc-day[data-date='" + moment(startDate).format("YYYY-MM-DD") + "']").removeClass("selected-day")
        $("td.fc-day-top[data-date='" + moment(endDate).format("YYYY-MM-DD") + "']").removeClass("selected-day")
        
        while (loop <= end) {
            selectDay($("td.fc-day[data-date='" + moment(loop).format("YYYY-MM-DD") + "']"), moment(loop).format("YYYY-MM-DD"))
            let newDate = loop.setDate(loop.getDate() + 1)
            loop = new Date(newDate)
        }
    }
    
    const buildCalendar = function (settings) {
        YearCalendar.season_events = new Map()
        let dateToday = new Date()
        calContainer.appendChild(buildCalendarContainer())
        
        YearCalendar.start = (settings && settings.start) ? settings.start : dateToday.getFullYear()
        YearCalendar.events = (settings && settings.events) ? settings.events : []
        YearCalendar.getTitle()
        
        $.each(calendars, function (index, cal) {
            let displayMonth = getDate(YearCalendar.start, index)
            
            let activeCal = $(cal).fullCalendar({
                selectable: false,
                showNonCurrentDates: false,
                defaultDate: displayMonth,
                initialView: "dayGridMonth",
                displayEventTime: false,
                eventLimit: 3,
                header: {
                    left: "",
                    center: "title",
                    right: "",
                },
                views: {
                    month: {
                        titleFormat: "MMMM",
                    },
                },
                dayRender: function (date, el) {
                    let day = moment(date).format("YYYYMMDD")
                    let selectedDay = moment(date).format("YYYY-MM-DD")
                    let id = "s" + day
                    let month = moment(date).month()
                    let year = moment(date).year()
                    let dow = moment(date).day()
                    let top = $(`td.fc-day-top[data-date='${selectedDay}']`)
                    
                    let topSpan = $(`td.fc-day-top[data-date='${selectedDay}'] > span.fc-day-number`)
                    
                    /*
                    if (topSpan.length) {
                        $(top).empty()
                        let day = topSpan.text()
                        if (!isNaN(day)) {
                            let e = "<div class='w-100 d-flex align-items-center justify-content-between' style=''>"
                              + "<span>&nbsp;</span>"
                              + "<span class='fc-day-number'>" + day + "</span>"
                              + "</div>"
                            
                            let titleContainer = document.createElement("div")
                            top.append(e)
                        }
                    }
                    //*/
                    
                    if (!$(el).hasClass("fc-disabled-day")) {
                        $(top).attr("season", "true")
                        $(top).attr("data-date", selectedDay)
                        $(top).attr("id", id)
                        $(top).attr("day", day)
                        $(top).attr("month", month)
                        $(top).attr("year", year)
                        $(top).attr("dow", dow)
                        
                        $(el).attr("season", "true")
                        $(el).attr("data-date", selectedDay)
                        $(el).attr("id", id)
                        $(el).attr("day", day)
                        $(el).attr("month", month)
                        $(el).attr("year", year)
                        $(el).attr("dow", dow)
                        $(el).attr("data-selected", "false")
                    }
                },
                dayClick: function (event, jsEvent, view) {
                    let dateClicked = moment(event).format("YYYY-MM-DD")
                    
                    if (jsEvent.originalEvent.shiftKey) {
                        if (selectedStart !== null) {
                            selectedEnd = dateClicked
                            
                            if (moment(selectedEnd) < moment(selectedStart)) {
                                let tempEnd = moment(selectedStart).format("YYYY-MM-DD")
                                let tempStart = moment(selectedEnd).format("YYYY-MM-DD")
                                let startElement = $("td.fc-day[data-date='" + tempStart + "'][season='true']")
                                let endElement = $("td.fc-day[data-date='" + tempEnd + "'][season='true']")
                                $(startElement).removeClass("is-selected")
                                endElement.removeClass("is-selected")
                                
                                selectDates(this, tempStart, tempEnd)
                                selectedStart = tempEnd
                                selectedEnd = tempStart
                            } else {
                                selectDates(this, selectedStart, selectedEnd)
                            }
                            
                            selectedStart = null
                            selectedEnd = null
                        }
                    } else if (jsEvent.originalEvent.ctrlKey) {
                        if (this.hasClass("selected-day")) {
                            this.removeClass("selected-day")
                            YearCalendar.selectedDates.delete(dateClicked)
                            selectedStart = null
                            selectedEnd = null
                        } else {
                            YearCalendar.selectedDates.set(dateClicked, dateClicked)
                            selectedStart = dateClicked
                            selectedEnd = null
                            this.addClass("selected-day")
                        }
                    } else {
                        let datesSelected = Array.from(YearCalendar.selectedDates.values())
                        
                        clearSelectedDates()
                        selectDay(this, dateClicked)
                        selectedStart = dateClicked
                        selectedEnd = dateClicked
                        this.addClass("selected-day")
                        
                    }
                },
                eventRender: function (event, element, view) {
                    $(element).attr("season", "true")
                    let day = moment(event.start).format("YYYY-MM-DD")
                    let top = $("td.fc-day-top[data-date='" + day + "']")
                    
                    let el = $("td.fc-day[data-date='" + day + "'][season='true']")
                    let myEvent = seasonEvents.get(day)
                    let textColor = event.textColor
                    let backgroundColor = event.backgroundColor
                    let borderColor = event.borderColor
                    let bgRGBA = hexToRgb(event.backgroundColor)
                    bgRGBA.push(.6)
                    let bgColor = "rgba(" + bgRGBA.join(', ') + ")"
                    
                    if (event.rendering === "background") {
                        if ($(element).hasClass("fc-disabled-day")) {
                            return
                        }
                        
                        YearCalendar.season_events.set(day, "true")
                        
                        top
                            .addClass("background_event")
                            .attr("data", event)
                        
                        let e = ""
                        let dayCell = document.querySelectorAll(`td.fc-day[season='true'][data-date='${day}']`)
                        
                        if (myEvent) {
                            $(el).addClass("has-event")
                            $(el).attr("seasons_types_id", event.id)
                            $(el).data("season", "true")
                            $(el).attr("data-seasonid", event.id)
                        }
                        
                        $(dayCell)
                            .addClass("background_event")
                            .attr("data", event)
                            .css({
                                "background": bgColor,
                                "color": textColor,
                            })
                        
                        $(element).attr("data-sid", event.id)
                        $(element).attr("data-date", day)
                        $(element).attr("season", "true")
                        $(element).attr("seasonid", event.id)
                        $(element).addClass("background_event")
                        $(element).attr("data", event)
                        $(element).css({
                            "background": bgColor,
                            "color": textColor,
                        })
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    console.log('Event: ', calEvent)
                    //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY)
                    //alert('View: ' + view.name)
                    
                    // change the border color just for fun
                    //$(this).css('border-color', 'red')
                },
                events: YearCalendar.events,
            })
            
            YearCalendar.activeCalendars.push(activeCal)
            
            let calendarWidth = (!isNaN(parseInt($(document.getElementById("calendar_block_1")).actual("width")))) ? parseInt($(document.getElementById("calendar_block_1")).actual("width")) : 600
            
            $.each(YearCalendar.activeCalendars, function (index, cal) {
                $(cal).fullCalendar("option", "contentHeight", calendarWidth)
            })
            
        })
        
    }
    
    const init = function (settings) {
        calendars = []
        
        if (settings) {
            if (settings.calendarType) {
                calendarType = settings.calendarType
            }
        }
        
        let dataToSend = {
            product_id: product_id,
        }
        
        fetchCalendarEvents(dataToSend, function (events) {
            if (!events) {
                events = []
            }
            
            YearCalendar.start = new Date().getFullYear()
            YearCalendar.loadSeasonDropdown()
            YearCalendar.loadProfileDropdown()
            YearCalendar.loadUnitDropdown()
            
            buildCalendar({
                events: events,
                start: YearCalendar.start,
            })
            
            YearCalendar.endLoading()
        })
        
        $(function () {
            YearCalendar.init(settings)
        })
        
    }
    
    init(settings)
    
    return {
        calendars: [],
    }
}

const YearCalendar = (function () {
    "use strict"
    const _calendar_display_remove = document.getElementById("calendar_display_remove")
    const _calendar_loader = document.getElementById("calendar_loader")
    const _seasonCalendarModal = document.getElementById("seasonCalendarModal")
    const _calendar_display_year = document.getElementById("calendar_display_year")
    const _calendar_display_next_year = document.getElementById("calendar_display_next_year")
    const _calendar_display_prev_year = document.getElementById("calendar_display_prev_year")
    const _calendar_filter_season_id = document.getElementById("calendar_filter_season_id")
    const _product_id = document.getElementById("product_id")
    const _calendar_filter_profile_id = document.getElementById("calendar_filter_profile_id")
    const _calendar_filter_unit_id = document.getElementById("calendar_filter_unit_id")
    const _calendar_filter_profile_id_assign = document.getElementById("calendar_filter_profile_id_assign")
    const _calendar_filter_profile_id_clear = document.getElementById("calendar_filter_profile_id_clear")
    const _calendar_filter_unit_id_assign = document.getElementById("calendar_filter_unit_id_assign")
    const _calendar_filter_unit_id_clear = document.getElementById("calendar_filter_unit_id_clear")
    const _calendar_filter_season_id_assign = document.getElementById("calendar_filter_season_id_assign")
    const _calendar_filter_season_id_clear = document.getElementById("calendar_filter_season_id_clear")
    const _calendar_display_refresh = document.getElementById("calendar_display_refresh")
    
    $(_calendar_display_remove)
        .on("click", function () {
            $(_calendar_loader).fadeIn("slow", function () {
                YearCalendar.remove()
                setCalendarFilters()
            })
        })
    
    $(_calendar_display_refresh)
        .on("click", function () {
            $(_calendar_loader).fadeIn("slow", function () {
                YearCalendar.refresh()
                setCalendarFilters()
            })
        })
    
    $(_calendar_display_next_year)
        .on("click", function () {
            $(_calendar_loader).fadeIn("slow", function () {
                YearCalendar.start = (parseInt(YearCalendar.start) + 1).toString()
                $.each(YearCalendar.activeCalendars, function (index, cal) {
                    $(cal).fullCalendar("nextYear")
                })
                getTitle()
                YearCalendar.endLoading()
            })
        })
    
    $(_calendar_display_prev_year)
        .on("click", function () {
            $(_calendar_loader).fadeIn("slow", function () {
                YearCalendar.start = (parseInt(YearCalendar.start) - 1).toString()
                $.each(YearCalendar.activeCalendars, function (index, cal) {
                    $(cal).fullCalendar("prevYear")
                })
                YearCalendar.getTitle()
                YearCalendar.endLoading()
            })
        })
    
    $(_calendar_filter_season_id)
        .on("change", function () {
            let season_id = (!isNaN(parseInt(_calendar_filter_season_id.value))) ? parseInt(_calendar_filter_season_id.value) : null
            if (!is_null(season_id)) {
            
            }
            let product_season_detail, season, disabled_dow
            if (!is_null(season_id)) {
                season = Season.all.get(season_id)
                if (season) {
                    if (season.product_season_detail) {
                        product_season_detail = season.product_season_detail
                    }
                }
                
                if (product_season_detail.disabled_dow) {
                    disabled_dow = getListOfIds(product_season_detail.disabled_dow)
                }
                _calendar_filter_profile_id.value = ""
                _calendar_filter_profile_id.disabled = true
                _calendar_filter_unit_id_assign.disabled = true
                _calendar_filter_season_id_assign.disabled = false
                _calendar_filter_profile_id.value = ""
                $(_calendar_filter_unit_id).val([])
            } else {
                _calendar_filter_season_id_assign.disabled = true
                _calendar_filter_profile_id.disabled = false
                _calendar_filter_unit_id_assign.disabled = true
            }
            setDisabledDOW(disabled_dow)
        })
    
    $(_calendar_filter_unit_id)
        .on("change", function () {
            let units = $(_calendar_filter_unit_id).val()
            _calendar_filter_unit_id_assign.disabled = units.length <= 0
        })
        .on("click", function () {
            let units = $(_calendar_filter_unit_id).val()
            _calendar_filter_unit_id_assign.disabled = units.length <= 0
        })
    
    $(_calendar_filter_profile_id)
        .on("change", function () {
            let profile_id = (!isNaN(parseInt(_calendar_filter_profile_id.value))) ? parseInt(_calendar_filter_profile_id.value) : null
            if (profile_id !== null) {
                _calendar_filter_unit_id.disabled = false
                _calendar_filter_season_id.disabled = true
            } else {
                $(_calendar_filter_unit_id).val([])
                _calendar_filter_unit_id.disabled = true
                _calendar_filter_season_id.disabled = false
            }
            
        })
    
    $(_calendar_filter_season_id_assign)
        .on("click", function () {
            buildAssignDatesRecord()
        })
    
    $(_calendar_filter_unit_id_assign)
        .on("click", function () {
            assignProfileToProduct()
        })
    
    $(_calendar_filter_season_id_clear)
        .on("click", function () {
            $(_calendar_filter_season_id).val("").trigger("change")
            setCalendarFilters()
        })
    
    $(_calendar_filter_unit_id_clear)
        .on("click", function () {
            $(_calendar_filter_unit_id).val([]).trigger("change")
            setCalendarFilters()
        })
    
    $(_calendar_filter_profile_id_clear)
        .on("click", function () {
            $(_calendar_filter_profile_id).val("").trigger("change")
            setCalendarFilters()
        })
    
    $(_seasonCalendarModal)
        .on("shown.bs.modal", function () {
            setCalendarFilters()
            $("html").css({ overflow: "hidden" })
        })
        .on("hidden.bs.modal", function () {
            resetForm()
            $("html").css({ overflow: "auto" })
        })
        .on("click", function () {
            YearCalendar.checkProgress()
        })
    
    const loadSeasonDropdown = function () {
        let seasons = (Season && Season.all) ? Array.from(Season.all.values()) : []
        let options = "<option value='' disabled readonly selected>-- Seasons --</option>"
        let options2 = ""
        
        $.each(seasons, function (k, season) {
            let name = season.name
            let id = season.id
            options += `<option value="${id}">${name}</option>`
            options2 += `<option value="${id}">${name}</option>`
        })
        
        $(_calendar_filter_season_id).empty()
        $(_calendar_filter_season_id).html(options)
        $(_calendar_filter_season_id).val("").trigger("change")
    }
    
    const loadProfileDropdown = function () {
        let profiles = (InventoryProfile && InventoryProfile.all) ? Array.from(InventoryProfile.all.values()) : []
        let options = "<option value='' disabled readonly selected>-- Profiles --</option>"
        
        $.each(profiles, function (k, profile) {
            let name = profile.name
            let id = profile.id
            options += `<option value="${id}">${name}</option>`
        })
        
        $(_calendar_filter_profile_id).empty()
        $(_calendar_filter_profile_id).html(options)
        $(_calendar_filter_profile_id).val("").trigger("change")
    }
    
    const loadUnitDropdown = function () {
        let units = (Unit && Unit.all) ? Array.from(Unit.all.values()) : []
        let options = ""
        
        $.each(units, function (k, unit) {
            let name = unit.name
            let id = unit.id
            options += `<option value="${id}">${name}</option>`
        })
        
        $(_calendar_filter_unit_id).empty()
        $(_calendar_filter_unit_id).html(options)
        $(_calendar_filter_unit_id).val([]).trigger("change")
        
    }
    
    const setCalendarFilters = function () {
        clearSelectedDOW()
    }
    
    const buildAssignDatesRecord = function () {
        let product_id = parseInt(_product_id.value)
        let season_id = parseInt(_calendar_filter_season_id.value)
        let season = Season.all.get(season_id)
        let disabledDOW = []
        let dataToSend = {
            season_id: season_id,
            product_id: product_id,
            days: [],
        }
        let days = Array.from(YearCalendar.selectedDates.values())
        
        if (season) {
            if (season.product_season_detail) {
                disabledDOW = getListOfIds(season.product_season_detail.disabled_dow)
            }
        }
        
        $.each(days, function (i, day) {
            const date = moment(day)
            const dow = date.day()
            
            let index = disabledDOW.indexOf(dow)
            
            if (index < 0) {
                dataToSend.days.push(day)
            }
        })
        
        confirmDialog(`Would you like to assign? This change may affect your Pricing Worksheets.`, (ans) => {
            if (ans) {
                $(_calendar_loader).fadeIn("slow", function () {
                    assignSeasonToProduct(dataToSend, function (data) {
                        if (data) {
                            clearSelected()
                            clearSelectedDOW()
                            refresh()
                            toastr.success(`Dates Assigned.`)
                        }
                        
                        endLoading()
                    })
                })
            }
        })
        
    }
    
    const handleCalendarError = function (msg) {
        toastr.error(msg)
    }
    
    const buildAssignProfilesRecord = function () {
        let profile_id = (_calendar_filter_profile_id && !is_null(parseInt(_calendar_filter_profile_id.value))) ? parseInt(_calendar_filter_profile_id.value) : null
        let product_id = (_product_id && !isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null
        let units = (_calendar_filter_unit_id) ? $(_calendar_filter_unit_id).val().map(Number) : []
        let profile
        let dataToSend = []
        let days = Array.from(YearCalendar.selectedDates.values())
        
        if (product_id && profile_id) {
            profile = InventoryProfile.all.get(profile_id)
            
            if (profile) {
                $.each(units, function (index, unit) {
                    
                    let unitData = {
                        product_id: product_id,
                        profile_id: profile_id,
                        unit_id: unit,
                        quantity_released: 0,
                        quantity_used: 0,
                        days: [],
                    }
                    
                    $.each(days, function (i, day) {
                        let hasSeason = YearCalendar.season_events.get(day)
                        if (hasSeason) {
                            unitData.days.push(day)
                        }
                    })
                    
                    if (unitData.days.length > 0) {
                        dataToSend.push(unitData)
                    }
                    
                })
            }
        }
        
        if (dataToSend.length > 0) {
            return dataToSend
        }
        
    }
    
    const assignProfileToProduct = function () {
        let dataToSend = buildAssignProfilesRecord()
        
        if (dataToSend) {
            
            confirmDialog(`Would you like to assign? This change may affect your Pricing Worksheets.`, (ans) => {
                if (ans) {
                    $(_calendar_loader).fadeIn("slow", function () {
                        updateProductProfileCalendar(dataToSend, function (data) {
                            if (data) {
                                clearSelected()
                                clearSelectedDOW()
                                refresh()
                                toastr["success"](`Dates Assigned.`, `Inventory Profile`)
                            }
                            
                            endLoading()
                        })
                    })
                }
            })
            
        } else {
            toastr["warning"](`No Profiles to update.`, `Inventory Profile`)
            endLoading()
        }
        
    }
    
    const updateProductProfileCalendar = function (dataToSend, callback) {
        let url = "/api/v1.0/products/assign_profiles"
        if (dataToSend) {
            try {
                sendPostRequest(url, { params: dataToSend }, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        handleCalendarError("Oops: 1")
                        endLoading()
                    }
                })
            } catch (e) {
                console.log("error", e)
                handleCalendarError("Oops: 2")
                endLoading()
            }
        }
    }
    
    const assignSeasonToProduct = function (dataToSend, callback) {
        let url = "/api/v1.0/products/assign_seasons"
        
        if (dataToSend) {
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleCalendarError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
                return handleCalendarError("Oops: 1")
            }
        }
    }
    
    const resetForm = function () {
        clearSelected()
        clearSelectedDOW()
        loadSeasonDropdown()
        loadUnitDropdown()
        loadProfileDropdown()
    }
    
    const setDisabledDOW = function (disabled_dow) {
        if (!disabled_dow) {
            disabled_dow = []
        }
        
        clearSelectedDOW()
        
        $.each(disabled_dow, function (k, dow) {
            let dataDOW = dow.toString()
            let days = $(`td[season='true'][dow='${dataDOW}']`)
            
            days.each(function (index, element) {
                let day = $(element).attr("data-date")
                $("td[data-date='" + day + "']").addClass("disabled-dow")
                $(element).addClass("disabled-dow")
            })
            
        })
        
    }
    
    const clearSelectedDOW = function () {
        let days = $("td[season='true']")
        
        days.each(function (index, element) {
            $(this).removeClass("disabled-dow")
        })
    }
    
    const clearSelected = function () {
        let days = $("td[season='true']")
        
        days.each(function (index, element) {
            $(this).removeClass("selected-day")
            $(this).attr("selected", "false")
        })
        
        YearCalendar.selectedDates = new Map()
    }
    
    const endLoading = function () {
        setCalendarFilters()
        $(_calendar_loader).hide()
    }
    
    const getTitle = function () {
        _calendar_display_year.innerText = YearCalendar.start
    }
    
    const init = function (settings) {
        _calendar_filter_unit_id.disabled = true
        _calendar_filter_season_id_assign.disabled = true
        _calendar_filter_unit_id_assign.disabled = true
        loadUnitDropdown()
        loadProfileDropdown()
        loadSeasonDropdown()
        
        //ContextMenu.init(settings)
    }
    
    const checkProgress = function () {
        //ContextMenu.init(settings)
    }
    
    const reFetchCalendarEvents = function (dataToSend, callback) {
        if (dataToSend) {
            try {
                sendGetRequest("/api/v1.0/calendars", dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return callback([])
                    }
                })
            } catch (e) {
                console.log("error", e)
            }
        }
    }
    
    const removeAllEvents = function () {
        YearCalendar.events = []
        
        let bgEvents = document.querySelectorAll("td[season='true']")
        
        bgEvents.forEach(el => {
            $(el)
                .css({
                    "background": "initial",
                    "background-color": "initial",
                    "color": "initial",
                    "border-color": "#ddd",
                })
        })
        
        $.each(YearCalendar.activeCalendars, function (index, cal) {
            
            $(cal).fullCalendar("removeEvents")
        })
        
        YearCalendar.endLoading()
    }
    
    const refreshCalendar = function () {
        $(_calendar_loader).fadeIn("slow", function () {
            let product_id = (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null
            clearSelected()
            clearSelectedDOW()
            removeAllEvents()
            reFetchCalendarEvents({ product_id: product_id }, function (data) {
                YearCalendar.events = data
                
                $.each(YearCalendar.activeCalendars, function (index, cal) {
                    $(cal).fullCalendar("removeEvents")
                    $(cal).fullCalendar("addEventSource", YearCalendar.events)
                    $(cal).fullCalendar("rerenderEvents")
                })
                
                YearCalendar.endLoading()
            })
        })
        
    }
    
    const refresh = function () {
        resetForm()
        refreshCalendar()
    }
    
    return {
        calendarContextMenu: null,
        calendars: new Map(),
        events: [],
        start: new Date().getFullYear(),
        selectedDates: new Map(),
        activeCalendars: [],
        season_events: [],
        refresh: function () {
            refresh()
        },
        remove: function () {
            clearSelected()
            clearSelectedDOW()
            removeAllEvents()
        },
        checkProgress: function () {
            checkProgress()
        },
        endLoading: function () {
            endLoading()
        },
        loadSeasonDropdown: function () {
            loadSeasonDropdown()
        },
        loadProfileDropdown: function () {
            loadProfileDropdown()
        },
        loadUnitDropdown: function () {
            loadUnitDropdown()
        },
        getTitle: function () {
            getTitle()
        },
        clearSelected: function () {
            clearSelected()
        },
        init: function (settings) {
            init(settings)
        },
        resetForm: function () {
            resetForm()
        },
    }
})()


$.fn.imageManager = function (options) {
    const $carouselWrapper = $(this).find("div.carousel")
    const $carouselIndicators = $(this).find("ol.carousel-indicators")
    const $carouselInner = $(this).find("div.carousel-inner")
    const _form_edit_company_images = document.getElementById("companyImageManager")
    const _image_manager_is_cover_image = document.getElementById("image_manager_is_cover_image")
    const _image_manager_title = document.getElementById("image_manager_title")
    const _image_manager_caption = document.getElementById("image_manager_caption")
    const _image_manager_upload = document.getElementById("image_manager_upload")
    const _image_manager_alt_text = document.getElementById("image_manager_alt_text")
    const _image_manager_form_data = document.getElementById("image_manager_form_data")
    const _image_manager_image_id = document.getElementById("image_manager_id")
    const $imageForm = $("#image_manager_form_data")
    const _vendor_edit = document.getElementById("vendor_edit")
    const _image_manager_cancel_upload = document.getElementById("image_manager_cancel_upload")
    let drEvent, validator
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let counter = 0
    let carouselId = ""
    
    const form_rules = {
        rules: {
            image_manager_title: {
                required: true,
            },
            image_manager_alt_text: {
                required: true,
            },
            image_manager_caption: {
                required: true,
            },
        },
        messages: {
            image_manager_title: {
                required: "Field Required",
            },
            image_manager_alt_text: {
                required: "Field Required",
            },
            image_manager_caption: {
                required: "Field Required",
            },
        },
    }
    
    $("#image_manager_upload_button")
      .on("click", function () {
          if (_form_edit_company_images) {
              if (validate_form()) {
                  confirmDialog(`Would you like to update?`, (ans) => {
                      if (ans) {
                          save()
                      }
                  })
              }
          }
      })
    
    $("button.dropify-clear")
      .on("click", function () {
          $("input.dropify").trigger("change")
      })
    
    $(_image_manager_cancel_upload)
      .on("click", function () {
          Upload.prototype.resetForm()
          $("button.dropify-clear").trigger("click")
      })
    
    const handle_image_error = function (msg) {
        toastr.error(msg)
    }
    
    const updateImage = function (dataToSend, callback) {
        let url = "/api/v1.0/images/update"
        
        if (dataToSend) {
            Console.log("data", dataToSend)
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handle_image_error("Oops: 1")
                    }
                })
            } catch (e) {
                Console.log("error", e)
            }
        }
    }
    
    const validate_form = function () {
        return $(_form_edit_company_images).valid()
    }
    
    const init = function (options) {
        drEvent = $("#image_manager_upload").dropify({})
        if (options) {
            if (options.images) {
                loadAll(options.images)
            }
            if (options.id) {
                carouselId = "carousel-" + options.id
            }
        }
        if (_form_edit_company_images) {
            validator_init(form_rules)
            validator = $(_form_edit_company_images).validate()
            
        }
        
        $carouselWrapper.carousel()
    }
    
    const save = function () {
        let file = null
        if (_image_manager_image_id) {
            if (!isNaN(parseInt(_image_manager_image_id.value))) {
                let dataToSend = this.all.get(parseInt(_image_manager_image_id.value))
                
                dataToSend.alt = (_image_manager_alt_text.value !== "") ? _image_manager_alt_text.value : null
                dataToSend.caption = (_image_manager_caption.value !== "") ? _image_manager_caption.value : null
                dataToSend.is_cover_image = (_image_manager_is_cover_image.checked === true) ? 1 : 0
                dataToSend.title = (_image_manager_title.value !== "") ? _image_manager_title.value : null
                
                if (_provider_edit) {
                    dataToSend.directory_id = (parseInt(_provider_company_id.value))
                    dataToSend.directory = "company"
                }
                
                if (_vendor_edit) {
                    dataToSend.directory_id = (parseInt(_provider_company_id.value))
                    dataToSend.directory = "company"
                }
                
                updateImage(dataToSend, function (data) {
                    Console.log("data", data)
                    let image
                    
                    if (data) {
                        if (data[0]) {
                            image = data[0]
                            set(image)
                        }
                    }
                })
                
            } else {
                let $input = $(_image_manager_upload)
                
                if ($input) {
                    if ($input[0]) {
                        if ($input[0].files) {
                            if ($input[0].files[0]) {
                                file = $input[0].files[0]
                                let upload = new Upload(file)
                                upload.doUpload()
                            } else {
                                //Console.log("Missing $input[0].files[0]")
                            }
                        } else {
                            //Console.log("Missing $input[0].files")
                        }
                    } else {
                        //Console.log("Missing $input[0]")
                    }
                } else {
                    //Console.log("Missing $input")
                }
            }
        }
    }
    
    const default_detail = function () {
        return {
            id: null,
            path: null,
            type: null,
            caption: null,
            alt: null,
            is_cover_image: 0,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            note: null,
        }
    }
    
    const set_detail = function (image) {
        let detail = default_detail()
        detail.alt = (image.alt) ? image.alt : ""
        detail._caption = (image.caption) ? image.caption : "This is a Test Caption 3"
        detail.id = (image.id) ? image.id : 3
        detail.is_cover_image = (image.is_cover_image) ? image.is_cover_image : 0
        detail.path = (image.path) ? image.path : "/company/1/image_3"
        detail.title = (image.title) ? image.title : "Image 3"
        detail.type = (image.type) ? image.type : "jpg"
        
        return detail
    }
    
    const formatImage = function (image, count) {
        let detail = set_detail(image)
        let image_alt = (image.alt) ? image.alt : ""
        let image_name = (image.name) ? image.name : ""
        let image_caption = (image.caption) ? image.caption : ""
        let image_id = (image.id) ? image.id : 3
        let image_is_cover_image = (image.is_cover_image) ? image.is_cover_image : 0
        let image_path = (image.path) ? image.path : ""
        let image_title = (image.title) ? image.title : ""
        let image_type = (image.extension) ? image.extension : "jpg"
        let active = (count === 0) ? "active " : ""
        let $heading = $("<H3>")
        let $image = $("<img>")
        let $carouselItem = $("<div>")
        let $carouselCaption = $("<div>")
        let $view = $("<div>")
        let $mask = $("<div>")
        let $caption = $("<p>")
        let is_cover = (image.is_cover_image === 1) ? " is_cover " : ""
        
        $carouselItem
          .addClass("carousel-item " + active + is_cover)
        
        $view
          .addClass("view")
          .appendTo($carouselItem)
        
        $image
          .addClass("d-block w-100 imageManager_edit")
          .attr("src", `${image_path}/${image_name}.${image_type}`)
          .data("imgid", image_id)
          .data("is_cover", image_is_cover_image)
          .attr("alt", image_alt)
          .appendTo($view)
        
        $mask
          .addClass("mask rgba-blue-light")
          .data("key", image)
          .css({ "cursor": "pointer" })
          .on("click", function () {
              populate_form($(this).data("key"))
          })
          .appendTo($view)
        
        $heading
          .addClass("")
          .text(image_title)
          .appendTo($carouselCaption)
          .css({ "cursor": "pointer" })
          .data("key", image)
          .on("click", function () {
              populate_form($(this).data("key"))
          })
        
        $caption
          .addClass("")
          .text(image_caption)
          .appendTo($carouselCaption)
          .data("key", image)
          .css({ "cursor": "pointer" })
          .on("click", function () {
              populate_form($(this).data("key"))
          })
        
        $carouselCaption
          .addClass("carousel-caption")
          .appendTo($carouselItem)
        
        return $carouselItem
        
    }
    
    const populate_form = function (image) {
        Upload.prototype.populateForm(image)
    }
    
    const formatIndicator = function (image, count) {
        let active = (count === 0) ? "active" : ""
        let is_cover = (image.is_cover_image === 1) ? " is_cover " : ""
        let $li = $("<li>")
        $li
          .addClass(active + " " + is_cover)
          .attr("data-slide-to", count)
          .attr("data-target", "#carousel-companyImageManager")
        return $li
    }
    
    const format_image_lightbox = function (image) {
        Console.log(image)
        
        if (image) {
            let image_alt = (image.alt) ? image.alt : ""
            let image_name = (image.name) ? image.name : ""
            let image_caption = (image.caption) ? image.caption : ""
            let image_id = (image.id) ? image.id : 3
            let image_is_cover_image = (image.is_cover_image) ? image.is_cover_image : 0
            let image_path = (image.path) ? image.path : ""
            let image_title = (image.title) ? image.title : ""
            let image_type = (image.extension) ? image.extension : "jpg"
            let data_size = image.width + "x" + image.height
            let thumbs_path = image.path.replace("public/img", "public/img/thumbs")
            let $img = $(`<img src="${thumbs_path}/${image_name}.${image_type}"  alt="${image_alt}" class="img-fluid" >`)
            $img.data("key", image)
            
            let $figure = $("<figure class='col-md-4'>")
            let $a = $(`<a href="${image_path}/${image_name}.${image_type}" data-size="${data_size}">`)
            $img.appendTo($a)
            
            let $figcaption = $("<figcaption itemprop='caption description'>")
            $figcaption.text = image_caption
            
            $a.appendTo($figure)
            $figcaption.appendTo($figure)
            return $figure
        }
        
    }
    
    const loadAll = function (images) {
        counter = 0
        $carouselIndicators.empty()
        $carouselInner.empty()
        this.all = new Map()
        
        for (let n = 0; n < images.length; n++) {
            let im = images[n]
            this.all.set(im.id, im)
            $carouselIndicators.append(formatIndicator(im, counter))
            $carouselInner.append(formatImage(im, counter))
            counter += 1
        }
        
    }
    
    const set = function (image) {
        if (image) {
            this.all.set(image.id, image)
            loadAll(Array.from(this.all.values()))
        }
    }
    
    const addImage = function (image) {
        if (image) {
            this.all.set(image.id, image)
            loadAll(Array.from(this.all.values()))
        }
    }
    
    init(options)
    
    return {
        addImage: function (image) {
            addImage(image)
        },
        reset: function () {
        
        },
        all: new Map(),
        init: function (settings) {
            init(settings)
        },
        loadAll: function (images) {
            loadAll(images)
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
        //Console.log(" -- LocationTypes -- ", {})
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
        
        //Console.log(" LocationTypes.all", LocationTypes.all)
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

//LocationTypes.init()
//end object



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

const City = (function () {
    "use strict"
    
    const class_name = "form-new-city"
    const form_id = "form_new_city"
    
    const _modal_product_city_id = document.getElementById("modal_product_city_id")
    const _modal_product_provider_name = document.getElementById("modal_product_provider_name")
    const _modal_product_vendor_name = document.getElementById("modal_product_vendor_name")
    
    const _modal_product_arrive_to_airport_city = document.getElementById("modal_product_arrive_to_airport_city")
    const _modal_product_arrive_to_airport_country_id = document.getElementById("modal_product_arrive_to_airport_country_id")
    const _modal_product_arrive_to_airport_province_id = document.getElementById("modal_product_arrive_to_airport_province_id")
    const _modal_product_arrive_to_airport_city_id = document.getElementById("modal_product_arrive_to_airport_city_id")
    
    const _modal_product_depart_from_airport_city = document.getElementById("modal_product_depart_from_airport_city")
    const _modal_product_depart_from_airport_country_id = document.getElementById("modal_product_depart_from_airport_country_id")
    const _modal_product_depart_from_airport_province_id = document.getElementById("modal_product_depart_from_airport_province_id")
    const _modal_product_depart_from_airport_city_id = document.getElementById("modal_product_depart_from_airport_city_id")
    
    const _modal_product_arrive_to_station_city = document.getElementById("modal_product_arrive_to_station_city")
    const _modal_product_arrive_to_station_country_id = document.getElementById("modal_product_arrive_to_station_country_id")
    const _modal_product_arrive_to_station_province_id = document.getElementById("modal_product_arrive_to_station_province_id")
    const _modal_product_arrive_to_station_city_id = document.getElementById("modal_product_arrive_to_station_city_id")
    
    const _modal_product_depart_from_station_city = document.getElementById("modal_product_depart_from_station_city")
    const _modal_product_depart_from_station_country_id = document.getElementById("modal_product_depart_from_station_country_id")
    const _modal_product_depart_from_station_province_id = document.getElementById("modal_product_depart_from_station_province_id")
    const _modal_product_depart_from_station_city_id = document.getElementById("modal_product_depart_from_station_city_id")
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    $("#form_product_search_hotel_product_location")
        .on("change", function () {
            setTimeout(function () {
            
            }, 200)
        })
        .on("search", function () {
        
        })
        .on("click", function (e) {
            if ($(this).attr("readonly") === "readonly") {
                e.preventDefault()
            } else {
                $(this).select()
            }
            
        })
        .autocomplete({
            serviceUrl: "/api/v1.0/autocomplete/cities",
            minChars: 2,
            cache: false,
            dataType: "json",
            triggerSelectOnValidInput: false,
            paramName: "st",
            onSelect: function (suggestion) {
                console.log("city", suggestion)
                if (!suggestion.data) {
                    return
                }
                
                console.log("city", suggestion)
                /*
                    "value": "Abano Terme (Padova, Italy)",
                    "data": {
                        "id": 1,
                        "country_id": 102,
                        "province_id": 250,
                        "sort_order": 999,
                        "name": "Abano Terme",
                        "enabled": 1,
                        "date_created": "2021-08-03 14:40:07",
                        "created_by": 4,
                        "date_modified": "2021-08-03 14:40:07",
                        "modified_by": 4,
                        "note": "",
                        "province": {
                            "id": 250,
                            "country_id": 102,
                            "name": "Padova",
                            "iso2": "PD",
                            "iso3": "",
                            "sort_order": 999,
                            "enabled": 1,
                            "date_created": "2021-12-15 10:58:47",
                            "created_by": 4,
                            "date_modified": "2021-12-15 10:58:47",
                            "modified_by": 4,
                            "note": null
                        },
                        "country": {
                            "id": 102,
                            "currency_id": 2,
                            "sort_order": 0,
                            "name": "Italy",
                            "iso2": "IT",
                            "iso3": "ITA",
                            "enabled": 1,
                            "date_created": "2021-08-03 13:04:10",
                            "created_by": 4,
                            "date_modified": "2021-08-03 15:13:45",
                            "modified_by": 4,
                            "note": ""
                        }
                    }
                //*/
                
            },
        })
    
    $(_modal_product_city_id)
        .on("change", function () {
            if (_modal_product_city_id.value === "") {
                _modal_product_provider_name.disabled = true
                _modal_product_vendor_name.disabled = true
            } else {
                _modal_product_provider_name.disabled = false
                _modal_product_vendor_name.disabled = false
            }
        })
    
    $("#modal_product_depart_from_airport_city")
        .on("change", function () {
            setTimeout(function () {
            
            }, 200)
        })
        .on("search", function () {
            $(_modal_product_depart_from_airport_city).val("").trigger("change")
        })
        .on("click", function (e) {
            if ($(this).attr("readonly") === "readonly") {
                e.preventDefault()
            } else {
                $(this).select()
            }
        })
        .autocomplete({
            serviceUrl: "/api/v1.0/autocomplete/cities",
            minChars: 2,
            cache: false,
            dataType: "json",
            triggerSelectOnValidInput: false,
            paramName: "st",
            onSelect: function (suggestion) {
                if (!suggestion.data) {
                    return
                }
                let city = suggestion.data
                _modal_product_city_id.value = city.id
                $(_modal_product_city_id).val((city.id) ? city.id : "").trigger("change")
                
                _modal_product_depart_from_airport_country_id.value = (!isNaN(parseInt(city.country.id))) ? parseInt(city.country.id) : null
                _modal_product_depart_from_airport_province_id.value = (!isNaN(parseInt(city.province.id))) ? parseInt(city.province.id) : null
                _modal_product_depart_from_airport_city_id.value = (!isNaN(parseInt(city.id))) ? parseInt(city.id) : null
            },
        })
    
    $("#modal_product_arrive_to_airport_city")
        .on("change", function () {
            setTimeout(function () {
            
            }, 200)
        })
        .on("search", function () {
            $(_modal_product_arrive_to_airport_city).val("").trigger("change")
        })
        .on("click", function (e) {
            if ($(this).attr("readonly") === "readonly") {
                e.preventDefault()
            } else {
                $(this).select()
            }
        })
        .autocomplete({
            serviceUrl: "/api/v1.0/autocomplete/cities",
            minChars: 2,
            cache: false,
            dataType: "json",
            triggerSelectOnValidInput: false,
            paramName: "st",
            onSelect: function (suggestion) {
                if (!suggestion.data) {
                    return
                }
                let city = suggestion.data
                //_modal_product_city_id.value = city.id
                //$(_modal_product_city_id).val((city.id) ? city.id : "").trigger("change")
                _modal_product_arrive_to_airport_country_id.value = (city.country.id) ? city.country.id : null
                _modal_product_arrive_to_airport_province_id.value = (city.province.id) ? city.province.id : null
                _modal_product_arrive_to_airport_city_id.value = (city.id) ? city.id : null
                /*
                    "value": "Abano Terme (Padova, Italy)",
                    "data": {
                        "id": 1,
                        "country_id": 102,
                        "province_id": 250,
                        "sort_order": 999,
                        "name": "Abano Terme",
                        "enabled": 1,
                        "date_created": "2021-08-03 14:40:07",
                        "created_by": 4,
                        "date_modified": "2021-08-03 14:40:07",
                        "modified_by": 4,
                        "note": "",
                        "province": {
                            "id": 250,
                            "country_id": 102,
                            "name": "Padova",
                            "iso2": "PD",
                            "iso3": "",
                            "sort_order": 999,
                            "enabled": 1,
                            "date_created": "2021-12-15 10:58:47",
                            "created_by": 4,
                            "date_modified": "2021-12-15 10:58:47",
                            "modified_by": 4,
                            "note": null
                        },
                        "country": {
                            "id": 102,
                            "currency_id": 2,
                            "sort_order": 0,
                            "name": "Italy",
                            "iso2": "IT",
                            "iso3": "ITA",
                            "enabled": 1,
                            "date_created": "2021-08-03 13:04:10",
                            "created_by": 4,
                            "date_modified": "2021-08-03 15:13:45",
                            "modified_by": 4,
                            "note": ""
                        }
                    }
                //*/
            },
        })
    
    $("#modal_product_depart_from_station_city")
        .on("change", function () {
            setTimeout(function () {
            
            }, 200)
        })
        .on("search", function () {
            $(_modal_product_city_id).val("").trigger("change")
        })
        .on("click", function (e) {
            if ($(this).attr("readonly") === "readonly") {
                e.preventDefault()
            } else {
                $(this).select()
            }
        })
        .autocomplete({
            serviceUrl: "/api/v1.0/autocomplete/cities",
            minChars: 2,
            cache: false,
            dataType: "json",
            triggerSelectOnValidInput: false,
            paramName: "st",
            onSelect: function (suggestion) {
                if (!suggestion.data) {
                    return
                }
                let city = suggestion.data
                _modal_product_city_id.value = city.id
                $(_modal_product_city_id).val((city.id) ? city.id : "").trigger("change")
                
                _modal_product_depart_from_station_country_id.value = (!isNaN(parseInt(city.country.id))) ? parseInt(city.country.id) : null
                _modal_product_depart_from_station_province_id.value = (!isNaN(parseInt(city.province.id))) ? parseInt(city.province.id) : null
                _modal_product_depart_from_station_city_id.value = (!isNaN(parseInt(city.id))) ? parseInt(city.id) : null
            },
        })
    
    $("#modal_product_arrive_to_station_city")
        .on("change", function () {
            setTimeout(function () {
            
            }, 200)
        })
        .on("search", function () {
            $(_modal_product_city_id).val("").trigger("change")
        })
        .on("click", function (e) {
            if ($(this).attr("readonly") === "readonly") {
                e.preventDefault()
            } else {
                $(this).select()
            }
        })
        .autocomplete({
            serviceUrl: "/api/v1.0/autocomplete/cities",
            minChars: 2,
            cache: false,
            dataType: "json",
            triggerSelectOnValidInput: false,
            paramName: "st",
            onSelect: function (suggestion) {
                if (!suggestion.data) {
                    return
                }
                let city = suggestion.data
                
                _modal_product_arrive_to_station_country_id.value = (!isNaN(parseInt(city.country.id))) ? parseInt(city.country.id) : null
                _modal_product_arrive_to_station_province_id.value = (!isNaN(parseInt(city.province.id))) ? parseInt(city.province.id) : null
                _modal_product_arrive_to_station_city_id.value = (!isNaN(parseInt(city.id))) ? parseInt(city.id) : null
            },
        })
    
    $("#modal_product_city")
        .on("change", function () {
            setTimeout(function () {
            
            }, 200)
        })
        .on("search", function () {
            $(_modal_product_city_id).val("").trigger("change")
        })
        .on("click", function (e) {
            if ($(this).attr("readonly") === "readonly") {
                e.preventDefault()
            } else {
                $(this).select()
            }
            
        })
        .autocomplete({
            serviceUrl: "/api/v1.0/autocomplete/cities",
            minChars: 2,
            cache: false,
            dataType: "json",
            triggerSelectOnValidInput: false,
            paramName: "st",
            onSelect: function (suggestion) {
                console.log("city", suggestion)
                if (!suggestion.data) {
                    return
                }
                let city = suggestion.data
                _modal_product_city_id.value = city.id
                $(_modal_product_city_id).val((city.id) ? city.id : "").trigger("change")
                /*
                    "value": "Abano Terme (Padova, Italy)",
                    "data": {
                        "id": 1,
                        "country_id": 102,
                        "province_id": 250,
                        "sort_order": 999,
                        "name": "Abano Terme",
                        "enabled": 1,
                        "date_created": "2021-08-03 14:40:07",
                        "created_by": 4,
                        "date_modified": "2021-08-03 14:40:07",
                        "modified_by": 4,
                        "note": "",
                        "province": {
                            "id": 250,
                            "country_id": 102,
                            "name": "Padova",
                            "iso2": "PD",
                            "iso3": "",
                            "sort_order": 999,
                            "enabled": 1,
                            "date_created": "2021-12-15 10:58:47",
                            "created_by": 4,
                            "date_modified": "2021-12-15 10:58:47",
                            "modified_by": 4,
                            "note": null
                        },
                        "country": {
                            "id": 102,
                            "currency_id": 2,
                            "sort_order": 0,
                            "name": "Italy",
                            "iso2": "IT",
                            "iso3": "ITA",
                            "enabled": 1,
                            "date_created": "2021-08-03 13:04:10",
                            "created_by": 4,
                            "date_modified": "2021-08-03 15:13:45",
                            "modified_by": 4,
                            "note": ""
                        }
                    }
                //*/
                
            },
        })
    
    $("#modal_product_city_cars")
        .on("change", function () {
            setTimeout(function () {
            
            }, 200)
        })
        .on("search", function () {
            $(_modal_product_city_id).val("").trigger("change")
        })
        .on("click", function (e) {
            if ($(this).attr("readonly") === "readonly") {
                e.preventDefault()
            } else {
                $(this).select()
            }
            
        })
        .autocomplete({
            serviceUrl: "/api/v1.0/autocomplete/cities",
            minChars: 2,
            cache: false,
            dataType: "json",
            triggerSelectOnValidInput: false,
            paramName: "st",
            onSelect: function (suggestion) {
                if (!suggestion.data) {
                    return
                }
                let city = suggestion.data
                _modal_product_city_id.value = city.id
                $(_modal_product_city_id).val((city.id) ? city.id : "").trigger("change")
                
            },
        })
    
    $("#modal_product_city_transports")
        .on("change", function () {
            setTimeout(function () {
            
            }, 200)
        })
        .on("search", function () {
            $(_modal_product_city_id).val("").trigger("change")
        })
        .on("click", function (e) {
            if ($(this).attr("readonly") === "readonly") {
                e.preventDefault()
            } else {
                $(this).select()
            }
            
        })
        .autocomplete({
            serviceUrl: "/api/v1.0/autocomplete/cities",
            minChars: 2,
            cache: false,
            dataType: "json",
            triggerSelectOnValidInput: false,
            paramName: "st",
            onSelect: function (suggestion) {
                if (!suggestion.data) {
                    return
                }
                let city = suggestion.data
                _modal_product_city_id.value = city.id
                $(_modal_product_city_id).val((city.id) ? city.id : "").trigger("change")
                
            },
        })
    
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
        console.log("msg", msg)
    }
    
    const on_click_outside = (e) => {
        let tar = $(e.target).parents("div." + class_name)
        
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
                console.log("error", e)
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
                        let new_city = data[0]
                        City.all.set(new_city.id, new_city)
                        let city_elements = $("select[data-type='city']")
                        
                        City.id = new_city.id
                        city_elements.each(function (index, element) {
                            var newOption = new Option(new_city.name, new_city.id, false, false)
                            $(element).append(newOption).trigger("change")
                            
                        })
                        $($this).val(new_city.id).trigger("change")
                        City.close()
                        toastr.success("City: " + new_city.id + " updated")
                        
                    } else {
                        return handle_city_error("Error: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
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
            handle_country_error("Error Processing Data")
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
        Console.log(msg)
    }
    
    const on_click_outside = (e) => {
        let tar = $(e.target).parents("div." + class_name)
        
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
                
                //*
                sendGetRequest("/api/v1.0/provinces", dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handle_province_error("Oops: 1")
                    }
                })
                //*/
            } catch (e) {
                Console.log("error", e)
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
        name_text_element.classList = ["form-control " + class_name]
        name_label_element.htmlFor = "province_name"
        name_label_element.innerHTML = "Name:"
        error_element1.id = "province_name-error"
        
        iso2_text_element.id = "province_iso2"
        iso2_text_element.name = "province_iso2"
        iso2_text_element.type = "text"
        iso2_text_element.maxLength = 2
        iso2_text_element.classList = ["form-control " + class_name]
        iso2_label_element.htmlFor = "province_iso2"
        iso2_label_element.innerHTML = "ISO2:"
        error_element2.id = "province_iso2-error"
        
        iso3_text_element.id = "province_iso3"
        iso3_text_element.name = "province_iso3"
        iso3_text_element.type = "text"
        iso3_text_element.maxLength = 3
        iso3_text_element.classList = ["form-control " + class_name]
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
                if (validate_form()) {
                    province_detail.name = _name.value
                    province_detail.iso2 = _province_iso2.value
                    province_detail.iso3 = _province_iso3.value
                    province_detail.country_id = parseInt(_country_id.value)
                    
                    confirmDialog(`Would you like to update?`, (ans) => {
                        if (ans) {
                            update_province_record($this, remove_nulls(province_detail))
                        }
                    })
                }
            }
            
        }
        
    }
    
    const update_province_record = function ($this, dataToSend) {
        if (dataToSend) {
            try {
                sendPostRequest("/api/v1.0/provinces/update", dataToSend, function (data, status, xhr) {
                    if (data && data[0]) {
                        let new_province = data[0]
                        Console.log("new_province", new_province)
                        Province.all.set(new_province.id, new_province)
                        let province_elements = $("select[data-type='province']")
                        Province.id = new_province.id
                        City.id = null
                        province_elements.each(function (index, element) {
                            var newOption = new Option(new_province.name, new_province.id, false, false)
                            $(element).append(newOption).trigger("change")
                        })
                        
                        $($this).val(new_province.id).trigger("change")
                        
                        Province.close()
                        toastr.success("Province: " + new_province.id + " updated")
                        
                    } else {
                        return handle_province_error("Error: 1")
                    }
                })
            } catch (e) {
                Console.log("error", e)
                handle_province_error("Error: Validating Province")
            }
        } else {
            Console.log("Error: Missing Data")
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
                            .on("change", function () {
                                let country_id = (!isNaN(parseInt($(this).val()))) ? parseInt($(this).val()) : null
                                let province_el_id = $(this)
                                    .attr("id")
                                    .replace("country", "province")
                                let province_element = document.getElementById(province_el_id)
                                let city_el_id = $(this)
                                    .attr("id")
                                    .replace("country", "city")
                                let city_element = document.getElementById(city_el_id)
                                // ----
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
                $.ajax({
                    type: "GET",
                    url: "/api/v1.0/countries",
                    data: dataToSend,
                    async: false,
                    
                }).done(function (data) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handle_country_error("Oops: 1")
                    }
                })
                /*
                sendGetRequest("/api/v1.0/countries", dataToSend, function (data, status, xhr) {
                    //console.log(data)
                    
                    if (data) {
                        // Country.all = data.result
                        return callback(data)
                    } else {
                        return handle_country_error("Oops: 1")
                    }
                })
                //*/
            } catch (e) {
                console.log("error", e)
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
                console.log("error", e)
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
                
                confirmDialog(`Would you like to update?`, (ans) => {
                    if (ans) {
                        update_country_record($this, remove_nulls(country_detail))
                    }
                })
                
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

const Location = (function () {
    "use strict"
    /**
     * Page Elements
     */
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
    const _form_edit_location_filter = document.getElementById("form_edit_location_filter")
    const _location_name_filter_id = document.getElementById("location_name_filter_id")
    //
    
    const edit_location_filter_form_rules = {
        groups: {
            locationGroup: "location_name_filter location_name_filter_id",
        },
        rules: {
            location_name_filter: {
                required: true,
            },
            location_name_filter_id: {
                required: true,
                digits: true,
            },
        },
        messages: {
            location_name_filter: {
                required: "Field Required",
            },
            location_name_filter_id: {
                required: "Field Required",
                digits: "invalid",
            },
        },
    }
    const form_rules = {
        rules: {
            location_types_id: {
                required: true,
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
                required: "Field Required",
            },
            location_city_id: {
                required: "Field Required",
                digits: "invalid",
            },
            location_country_id: {
                required: "Field Required",
                digits: "invalid",
            },
            location_province_id: {
                required: "Field Required",
                digits: "invalid",
            },
            location_id: {
                required: "Field Required",
                digits: "invalid",
            },
            location_name: { required: "Field Required" },
        },
    }
    
    /**
     * Product Variables
     */
    const _form_product_edit_location = document.getElementById("form_product_edit_location")
    const _button_edit_product_location = document.getElementById("button_edit_product_location")
    const _button_clear_form_edit_product_location = document.getElementById("button_clear_form_edit_product_location")
    const _button_submit_form_edit_product_location = document.getElementById("button_submit_form_edit_product_location")
    const _button_close_edit_product_location_form = document.getElementById("button_close_edit_product_location_form")
    const _product_location_search = document.getElementById("product_location_search")
    const _card_product_edit_location = document.getElementById("card_product_edit_location")
    //
    
    /**
     * Global Variables
     */
    let temp_location = {}
    let new_filter = false
    let validator, validator_name_filter
    let validated = false
    let globalSelectedLocation = false
    let suggestionsTempLocation = []
    let default_display = defaultAddressView
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    // ----
    
    $("a[data-toggle=\"tab\"]").on("hide.bs.tab", function (e) {
        //e.target // newly activated tab
        //e.relatedTarget // previous active tab
        hide_form()
    })
    
    const clear_product_location_form = function () {
        //Console.log("Location.clear_product_location_form()")
        _location_id.value = ""
        _location_types_id.value = ""
        _location_name.value = ""
        _location_street_1.value = ""
        _location_street_2.value = ""
        _location_zipcode.value = ""
        $(_location_country_id).val("").trigger("change")
        /*
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
        //*/
        
    }
    
    const populate_product_location_form = function (location) {
        clear_product_location_form()
        let country = {}
        let province = {}
        let city = {}
        let type = {}
        if (location) {
            switch (defaultLocationDisplayFormat) {
                case "short":
                    _product_location_search.value = (location.display_short) ? location.display_short : ""
                    break
                case "medium":
                    _product_location_search.value = (location.display_medium) ? location.display_medium : ""
                    break
                default:
                    _product_location_search.value = (location.display_long) ? location.display_long : ""
            }
            
            _location_name.value = location.name
            $(_location_id).val(location.id).trigger("change")
            _location_street_1.value = location.street_1
            _location_street_2.value = location.street_2
            _location_zipcode.value = location.zipcode
            
            let location_type_id = ""
            if (location.type) {
                type = location.type
                location_type_id = type.id
            }
            $(_location_types_id).val(location_type_id)
            
            if (location.country) {
                country = location.country
                Country.id = (country.id) ? country.id.toString() : null
            }
            
            if (location.province) {
                province = location.province
                Province.id = (province.id) ? province.id.toString() : null
            }
            
            if (location.city) {
                city = location.city
                City.id = (city.id) ? city.id : null
            }
            
            $(_location_country_id).val((country.id) ? country.id : "").trigger("change")
        }
    }
    
    const unload_product_location_form = function (location) {
        clear_product_location_form()
        $(_card_product_edit_location).hide()
    }
    
    const load_product_location_form = function (location) {
        //Console.log("Location.load_product_location_form(location)", location)
        clear_product_location_form()
        populate_product_location_form(location)
        $(_card_product_edit_location).show()
    }
    
    $(_button_submit_form_edit_product_location)
        .on("click", function () {
            load_product_location_form()
        })
    
    $(_button_edit_product_location)
        .on("click", function () {
            if (Location.detail) {
                load_product_location_form(Location.detail)
            }
        })
    
    $(_button_submit_form_edit_product_location)
        .on("click", function () {
        
        })
    
    $(_button_clear_form_edit_product_location)
        .on("click", function () {
            unload_product_location_form()
        })
    
    $(_button_close_edit_product_location_form)
        .on("click", function () {
            unload_product_location_form()
        })
    
    $(_product_location_search)
        .on("click", function () {
            $(this).select()
        })
        .on("change", function () {
            globalSelectedLocation = false
            setTimeout(function () {
                let location_name = _product_location_search.value
                
            }, 200)
        })
        .on("search", function () {
            globalSelectedLocation = false
            
        })
        .autocomplete({
            serviceUrl: "/api/v1.0/autocomplete/locations",
            minChars: 2,
            cache: false,
            dataType: "json",
            triggerSelectOnValidInput: false,
            paramName: "st",
            params: { "default_display": default_display },
            onSelect: function (suggestion) {
                if (suggestion && suggestion.data) {
                    globalSelectedLocation = true
                    //Console.log("suggestion", suggestion)
                }
            },
            onSearchComplete: function (query, suggestions) {
            },
        })
    
    /**
     * _button_close_edit_location_form
     */
    $(_button_close_edit_location_form)
        .on("click", function () {
            reset_form()
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
            $(_location_id).val(temp_location.id).trigger("change")
            
            hide_form()
        })
    
    /**
     * _button_clear_form_edit_location
     */
    $(_button_clear_form_edit_location)
        .on("click", function () {
            reset_form()
            populate_form()
        })
    
    /**
     * _button_submit_form_edit_location
     */
    $(_button_submit_form_edit_location)
        .on("click", function () {
            save()
        })
    
    /**
     * _button_edit_location
     */
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
            //Console.log("selected_value", selected_value)
            default_display = selected_value
            initAutoComplete()
            if (Location.detail["display_" + selected_value] !== null) {
                _location_name_filter.value = Location.detail["display_" + selected_value]
            }
        })
    
    $(_location_name)
        .on("change", function () {
            setTimeout(function () {
                let location_name = _location_name.value
                location_name_exists(location_name)
            }, 200)
        })
    
    $(_location_id)
        .on("change", function () {
            $(_location_name_filter_id)
                .val($(_location_id).val())
        })
    
    const validate_form = function () {
        return $(_form_edit_location).valid()
    }
    
    const initAutoComplete = function () {
        $(_location_name_filter)
            .on("click", function () {
                $(this).select()
            })
            .on("change", function () {
                setTimeout(function () {
                    let location_name = _location_name_filter.value
                    if (globalSelectedLocation === false) {
                        if (_location_name_filter.value === "") {
                            _location_name_filter.value = ""
                            $(_location_id).val("").trigger("change")
                            reset_form()
                        } else {
                            location_exists(location_name)
                        }
                    }
                }, 200)
            })
            .on("search", function () {
                globalSelectedLocation = false
                $(_location_id).val("").trigger("change")
                _location_name_filter.value = ""
                new_filter = true
                set_detail()
                reset_form()
                populate_form()
            })
            .autocomplete({
                serviceUrl: "/api/v1.0/autocomplete/locations",
                minChars: 2,
                cache: false,
                dataType: "json",
                triggerSelectOnValidInput: false,
                paramName: "st",
                params: { "default_display": default_display },
                onSelect: function (suggestion) {
                    if (suggestion && suggestion.data && suggestion.data.country && suggestion.data.province && suggestion.data.city) {
                        globalSelectedLocation = true
                        reset_form()
                        let location = suggestion.data
                        Location.detail = location
                        temp_location = location
                        populate_form(location)
                    }
                    
                    if (_form_edit_location) {
                        clearValidation(_form_edit_location)
                    }
                },
                onSearchComplete: function (query, suggestions) {
                },
            })
    }
    
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
    
    const location_name_exists = function (name) {
        if (name && name !== "") {
            let dataToSend = {
                name: name,
                default_display: default_display,
            }
            
            fetch_location_by_name(dataToSend, function (data) {
                if (data && data[0]) {
                    if (confirm(`Location: ${name} all ready exists. Would you like to use it?`)) {
                        let location = data[0]
                        reset_form()
                        populate_form(location)
                    } else {
                        reset_form()
                        populate_form()
                    }
                }
            })
        }
    }
    
    const location_exists = function (name) {
        if (name && name !== "") {
            let dataToSend = {
                name: name,
                default_display: default_display,
            }
            
            fetch_location_by_name(dataToSend, function (data) {
                if (data && data[0]) {
                    let location = data[0]
                    globalSelectedLocation = true
                    reset_form()
                    populate_form(location)
                } else {
                    globalSelectedLocation = false
                    confirmDialog(`Location: ${name} does not exist. Would you like to create it?`, (ans) => {
                        if (ans) {
                            add_to_location_list(name)
                        } else {
                            reset_form()
                            populate_form(temp_location)
                            hide_form()
                        }
                    })
                }
            })
        }
    }
    
    const add_to_location_list = function (name) {
        if (globalSelectedLocation === false) {
            if (name) {
                reset_form()
                populate_form()
                show_form()
                _location_name.value = name
                _location_name.disabled = true
                
            }
        }
    }
    
    /**
     * fetch locations by name
     *
     * @param dataToSend
     * @param callback
     */
    const fetch_location_by_name = function (dataToSend, callback) {
        let url = "/api/v1.0/locations/validate"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handle_location_error("Oops: 1")
                    }
                })
            } catch (e) {
                //Console.log("error", e)
                return handle_location_error("Error Validating Location")
            }
        } else {
            return handle_location_error("Error Loading Location- Missing Data")
        }
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
        if (!_form_location_details) {
            return
        }
        let detail = set_detail(temp_location)
        populate_form(detail)
        enable()
        $(_form_location_details).hide()
    }
    
    const validate_edit_location_filter_form = function () {
        return $(_form_edit_location_filter).valid()
    }
    
    /**
     * resets location form
     */
    const reset_form = function () {
        _location_name.disabled = false
        _location_name.value = ""
        _location_name_filter.value = ""
        $(_location_id).val("").trigger("change")
        _location_types_id.value = ""
        _location_street_1.value = ""
        _location_street_2.value = ""
        _location_zipcode.value = ""
        
        $(_location_country_id).val("").trigger("change")
        
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
        
    }
    
    /**
     * populate form fields
     *
     * @param location
     */
    const populate_form = function (location) {
        let country = {}
        let province = {}
        let city = {}
        let type = {}
        if (location) {
            switch (defaultLocationDisplayFormat) {
                case "short":
                    _location_name_filter.value = (location.display_short) ? location.display_short : ""
                    break
                case "medium":
                    _location_name_filter.value = (location.display_medium) ? location.display_medium : ""
                    break
                default:
                    _location_name_filter.value = (location.display_long) ? location.display_long : ""
            }
            
            _location_enabled.checked = (location.enabled === 1)
            _location_name.value = location.name
            $(_location_id).val(location.id).trigger("change")
            _location_street_1.value = location.street_1
            _location_street_2.value = location.street_2
            _location_zipcode.value = location.zipcode
            
            let location_type_id = ""
            if (location.type) {
                type = location.type
                location_type_id = type.id
            }
            $(_location_types_id).val(location_type_id)
            
            if (location.country) {
                country = location.country
                Country.id = (country.id) ? country.id.toString() : null
            }
            
            if (location.province) {
                province = location.province
                Province.id = (province.id) ? province.id.toString() : null
            }
            
            if (location.city) {
                city = location.city
                City.id = (city.id) ? city.id.toString() : null
            }
            
            $(_location_country_id).val((country.id) ? country.id : "").trigger("change")
            
        }
        
    }
    
    const set = function (location) {
        return set_detail(location)
    }
    
    /**
     * set object param values
     *
     * @param location
     * @returns {{note: null, country: {note: null, date_created: *, created_by: (number|number), enabled: number, date_modified: *, name_long: null, modified_by: (number|number), name: null, id: null, iso2: null, sort_order: number, currency_id: null, iso3: null}, city: {note: null, date_modified: *, date_created: *, name: null, modified_by: (number|number), id: null, sort_order: number, created_by: (number|number), enabled: number}, date_created: *, location_types_id: null, type: {note: null, date_modified: *, date_created: *, icon: null, modified_by: (number|number), name: null, id: null, created_by: (number|number), sort_order: number, enabled: number}, created_by: (number|number), enabled: number, display_medium: null, zipcode: null, display_short: null, street_1: null, date_modified: *, province: {note: null, date_modified: *, date_created: *, name_long: null, modified_by: (number|number), name: null, id: null, iso2: null, created_by: (number|number), sort_order: number, enabled: number, iso3: null}, street_2: null, name: null, modified_by: (number|number), display_long: null, id: null}}
     */
    const set_detail = function (location) {
        let detail = _default_detail()
        temp_location = detail
        let country = {}
        let province = {}
        let city = {}
        let type = {}
        if (location) {
            
            if (location.country) {
                country = location.country
            }
            if (location.province) {
                province = location.province
            }
            if (location.city) {
                city = location.city
            }
            if (location.type) {
                type = location.type
            }
        } else {
            location = {}
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
        
        detail.country = {
            created_by: (country.created_by) ? country.created_by : user_id,
            date_created: (country.date_created) ? country.date_created : formatDateMySQL(),
            date_modified: (country.date_modified) ? country.date_modified : formatDateMySQL(),
            currency_id: (country.currency_id) ? country.currency_id : null,
            enabled: (country.enabled) ? country.enabled : 1,
            id: (country.id) ? country.id : null,
            iso2: (country.iso2) ? country.iso2 : null,
            iso3: (country.iso3) ? country.iso3 : null,
            modified_by: (country.modified_by) ? country.modified_by : user_id,
            name: (country.name) ? country.name : null,
            name_long: (country.name_long) ? country.name_long : null,
            note: (country.note) ? country.note : null,
            sort_order: (country.sort_order) ? country.sort_order : 999,
        }
        
        detail.province = {
            created_by: (province.created_by) ? province.created_by : user_id,
            date_created: (province.date_created) ? province.date_created : formatDateMySQL(),
            date_modified: (province.date_modified) ? province.date_modified : formatDateMySQL(),
            enabled: (province.enabled) ? province.enabled : 1,
            id: (province.id) ? province.id : null,
            iso2: (province.iso2) ? province.iso2 : null,
            iso3: (province.iso3) ? province.iso3 : null,
            modified_by: (province.modified_by) ? province.modified_by : user_id,
            name: (province.name) ? province.name : null,
            name_long: (province.name_long) ? province.name_long : null,
            note: (province.note) ? province.note : null,
            sort_order: (province.sort_order) ? province.sort_order : 999,
        }
        
        detail.city = {
            created_by: (city.created_by) ? city.created_by : user_id,
            date_created: (city.date_created) ? city.date_created : formatDateMySQL(),
            date_modified: (city.date_modified) ? city.date_modified : formatDateMySQL(),
            enabled: (city.enabled) ? city.enabled : 1,
            id: (city.id) ? city.id : null,
            modified_by: (city.modified_by) ? city.modified_by : user_id,
            name: (city.name) ? city.name : null,
            note: (city.note) ? city.note : null,
            sort_order: (city.sort_order) ? city.sort_order : 999,
        }
        
        detail.type = {
            created_by: (type.created_by) ? type.created_by : user_id,
            date_created: (type.date_created) ? type.date_created : formatDateMySQL(),
            date_modified: (type.date_modified) ? type.date_modified : formatDateMySQL(),
            enabled: (type.enabled) ? type.enabled : 1,
            icon: (type.icon) ? type.icon : null,
            id: (type.id) ? type.id : null,
            modified_by: (type.modified_by) ? type.modified_by : user_id,
            name: (type.name) ? type.name : null,
            note: (type.note) ? type.note : null,
            sort_order: (type.sort_order) ? type.sort_order : 999,
        }
        
        Province.set_detail(detail.province)
        Country.set_detail(detail.country)
        City.set_detail(detail.city)
        
        Location.detail = detail
        return detail
    }
    
    /**
     * initialize location object
     *
     * @param location
     */
    const init = function (location) {
        
        let detail = {}
        if (location) {
            detail = set(location)
            temp_location = detail
        }
        
        if (_form_edit_location) {
            validator_init(form_rules)
            validator = $(_form_edit_location).validate()
            validator_init(edit_location_filter_form_rules)
            validator_name_filter = $(_form_edit_location_filter).validate()
            
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
                data: Array.from(City.all.values()),
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
            
            reset_form()
            populate_form(detail)
            hide_form()
        }
        
        if (_form_product_edit_location) {
            
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
                data: Array.from(City.all.values()),
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
            
            Location.detail = detail
            
            populate_product_location_form(detail)
        }
        
        if (_location_name_filter) {
            initAutoComplete()
        }
        
    }
    
    /**
     * update location
     *
     * @param dataToSend
     * @param callback
     */
    const update_location = function (dataToSend, callback) {
        let url = "/api/v1.0/locations/update"
        if (dataToSend) {
            sendPostRequest(url, dataToSend, function (data, status, xhr) {
                if (data) {
                    return callback(data)
                } else {
                    return handle_location_error("Oops: 1")
                }
            })
        }
    }
    
    /**
     * save object
     */
    const save = function () {
        if (validate_form()) {
            confirmDialog(`Would you like to update?`, (ans) => {
                if (ans) {
                    update_location(build(), function (data) {
                        let location
                        if (data) {
                            if (data[0]) {
                                let displayView = "medium"
                                location = data[0]
                                temp_location = location
                                
                                let el = document.getElementsByName("location_display")
                                for (let i = 0; i < el.length; i++) {
                                    if (el[i].checked) {
                                        displayView = el[i].value
                                    }
                                }
                                _location_id.value = location.id
                                _location_name_filter.value = location["display_" + displayView]
                                
                                hide_form()
                            }
                        }
                    })
                }
            })
        }
    }
    
    /**
     * build location object
     *
     * @returns {{}|*}
     */
    const build = function () {
        return remove_nulls({
            id: (!isNaN(parseInt(_location_id.value))) ? parseInt(_location_id.value) : null,
            city_id: (!isNaN(parseInt(_location_city_id.value))) ? parseInt(_location_city_id.value) : null,
            province_id: (!isNaN(parseInt(_location_province_id.value))) ? parseInt(_location_province_id.value) : null,
            country_id: (!isNaN(parseInt(_location_province_id.value))) ? parseInt(_location_country_id.value) : null,
            location_types_id: (!isNaN(parseInt(_location_types_id.value))) ? parseInt(_location_types_id.value) : null,
            name: (_location_name && _location_name.value !== "") ? _location_name.value : null,
            street_1: (_location_street_1 && _location_street_1.value !== "") ? _location_street_1.value : null,
            street_2: (_location_street_2 && _location_street_2.value !== "") ? _location_street_2.value : null,
            zipcode: (_location_zipcode && _location_zipcode.value !== "") ? _location_zipcode.value : null,
            enabled: 1,
            note: null,
        })
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
        init: function (location) {
            init(location)
        },
        populate_form: function (location) {
            populate_form(location)
        },
        set_detail: function (location) {
            //Console.log("location", location)
            set_detail(location)
        },
        build: function () {
            if (validate_edit_location_filter_form()) {
                return build()
            }
        },
    }
    
})()


const Variant = (function () {
    "use strict"
    
    const _calendar_loader = document.getElementById("calendar_loader")
    const _button_remove_variant_from_product = document.getElementById("button_remove_variant_from_product")
    const _product_edit_variant_section = document.getElementById("product_edit_variant_section")
    const _panel_tab_variant = document.getElementById("panel_tab_variant")
    const _category_id = document.getElementById("category_id")
    const _product_id = document.getElementById("product_id")
    const _product_edit_variant_form_variant_name_filter = document.getElementById("product_edit_variant_form_variant_name_filter")
    const _table_variant_product_edit = document.getElementById("table_variant_product_edit")
    const _product_edit_variant_form = document.getElementById("product_edit_variant_form")
    const _edit_product_variant = document.getElementById("edit_product_variant")
    const _display_product_variant_name = document.getElementById("display_product_variant_name")
    const _product_edit_variant_form_variant_id = document.getElementById("product_edit_variant_form_variant_id")
    const _product_edit_variant_form_variant_name = document.getElementById("product_edit_variant_form_variant_name")
    const _product_edit_variant_form_variant_enabled = document.getElementById("product_edit_variant_form_variant_enabled")
    const _product_edit_variant_form_variant_code = document.getElementById("product_edit_variant_form_variant_code")
    const _product_edit_variant_form_variant_min_age = document.getElementById("product_edit_variant_form_variant_min_age")
    const _product_edit_variant_form_variant_max_age = document.getElementById("product_edit_variant_form_variant_max_age")
    const _product_edit_variant_form_submit_button = document.getElementById("product_edit_variant_form_submit_button")
    const _product_edit_variant_form_clear_button = document.getElementById("product_edit_variant_form_clear_button")
    const _product_edit_variant_form_close_button = document.getElementById("product_edit_variant_form_close_button")
    const _product_edit_variant_form_variant_used_in_pricing = document.getElementById("product_edit_variant_form_variant_used_in_pricing")
    const _table_variant_product_edit_add_new_button = document.getElementById("table_variant_product_edit_add_new_button")
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let $table_variant_product_edit = $(_table_variant_product_edit)
    let globalSelectedVariant = false
    let form_rules = {
        rules: {
            product_edit_variant_form_variant_name: {
                required: true,
            },
            product_edit_variant_form_variant_min_age: {
                number: true,
                min: 0,
            },
            product_edit_variant_form_variant_max_age: {
                number: true,
                min: 1,
            },
        },
        messages: {
            product_edit_variant_form_variant_name: {
                required: "Field Required",
            },
            product_edit_variant_form_variant_min_age: {
                number: "Field Invalid",
                min: "Field Invalid",
            },
            product_edit_variant_form_variant_max_age: {
                number: "Field Invalid",
                min: "Field Invalid",
            },
        },
    }
    
    $(_button_remove_variant_from_product)
        .on("click", function () {
            remove()
        })
    
    $(_product_edit_variant_section)
        .on("change", function () {
            updateProgress()
        })
    
    $(_table_variant_product_edit_add_new_button)
        .on("click", function () {
            //console.log("Variant.table_variant_product_edit_add_new_button:click()", this)
            // ----
            
            $table_variant_product_edit.clearSelectedRows()
            populateForm()
        })
    
    $(_product_edit_variant_form_clear_button)
        .on("click", function () {
            //console.log("Variant.product_edit_variant_form_clear_button:click()", this)
            // ----
            resetForm()
            $table_variant_product_edit.clearSelectedRows()
        })
    
    $(_product_edit_variant_form_close_button)
        .on("click", function () {
            resetForm()
            $table_variant_product_edit.clearSelectedRows()
        })
    
    $(_product_edit_variant_form_submit_button)
        .on("click", function () {
            //console.log("Variant.product_edit_variant_form_submit_button:click()", this)
            // ----
            save()
        })
    
    $(_panel_tab_variant)
        .on("hide.bs.tab", function () {
            resetForm()
            $table_variant_product_edit.clearSelectedRows()
            _product_edit_variant_form_variant_name_filter.value = ""
            _product_edit_variant_form_variant_name_filter.disabled = false
        })
    
    const remove = function () {
        confirmDialog(`Would you like to update? This change may affect your Pricing Worksheets.`, (ans) => {
            if (ans) {
                let dataToSend = {
                    variant_id: parseInt(_product_edit_variant_form_variant_id.value),
                    product_id: parseInt(_product_id.value),
                }
                
                removeProductVariant(dataToSend, function (data) {
                    if (data) {
                        let detail = set(Variant.all.get(dataToSend.variant_id))
                        
                        Variant.all.delete(dataToSend.variant_id)
                        
                        $table_variant_product_edit.deleteRow(detail)
                        $table_variant_product_edit.clearSelectedRows()
                        
                        _product_edit_variant_form_variant_name_filter.value = ""
                        
                        PricingWorksheet.pricingWorksheet()
                        Pricing.resetForm()
                        YearCalendar.refresh()
                        
                        updateProgress()
                        resetForm()
                        
                        toastr.success(`Variant: ${detail.name} - has been updated`)
                        YearCalendar.endLoading()
                    }
                })
            } else {
                resetForm()
                $table_variant_product_edit.clearSelectedRows()
                _product_edit_variant_form_variant_name_filter.value = ""
                _product_edit_variant_form_variant_name_filter.disabled = false
            }
        })
    }
    
    const removeProductVariant = function (dataToSend, callback) {
        if (dataToSend) {
            let url = "/api/v1.0/variants/remove"
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleVariantError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
            }
        }
    }
    
    const updateProgress = function () {
        let variants = Array.from(Variant.all.values())
        
        if (variants.length === 0) {
            let warningNotice = $("<span/>", {
                "class": "badge badge-danger  ml-2",
                "text": "!",
                "id": "variantNeedsAttention",
            })
            
            $(_panel_tab_variant).html(`Variant<span id="variantNeedsAttention" class="badge rounded-pill badge-notification bg-danger">!</span>`)
        } else {
            $(_panel_tab_variant).html(`Variant`)
        }
        
        Product.updateProgress()
    }
    
    const initAutoComplete = function () {
        //console.log("Variant.initAutoComplete()", Variant)
        // ----
        let category_id = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
        
        $(_product_edit_variant_form_variant_name_filter)
            .on("click", function () {
                $(this).select()
            })
            .on("search", function () {
                globalSelectedVariant = false
                resetForm()
                $table_variant_product_edit.clearSelectedRows()
            })
            .on("change", function () {
                //*
                setTimeout(function () {
                    //console.log("Variant._product_edit_variant_form_variant_name_filter:change()", _product_edit_variant_form_variant_name_filter.value)
                    // ----
                    let variant_name = _product_edit_variant_form_variant_name_filter.value
                    
                    $table_variant_product_edit.clearSelectedRows()
                    
                    if (globalSelectedVariant === false) {
                        if (variant_name === "") {
                            _product_edit_variant_form_variant_name_filter.value = ""
                            globalSelectedVariant = false
                            resetForm()
                        } else {
                            nameExists(variant_name)
                        }
                    }
                }, 200)
                //*/
            })
            .autocomplete({
                serviceUrl: "/api/v1.0/autocomplete/variants",
                minChars: 2,
                cache: false,
                dataType: "json",
                triggerSelectOnValidInput: false,
                paramName: "st",
                params: { "category_id": category_id },
                onSelect: function (suggestion) {
                    $table_variant_product_edit.clearSelectedRows()
                    
                    if (!suggestion || !suggestion.data) {
                        return
                    }
                    let detail
                    let variant = suggestion.data
                    let hasVariant = Variant.all.get(parseInt(variant.id))
                    
                    if (hasVariant) {
                        detail = set(hasVariant)
                        $table_variant_product_edit.loadRow(detail)
                    } else {
                        detail = set(variant)
                        detail.used_in_pricing = 1
                    }
                    
                    populateForm(detail)
                    
                },
            })
    }
    
    const handleVariantError = function (msg) {
        //console.log("Variant.handleVariantError(msg)", msg)
        // ----
        toastr.error(msg)
    }
    
    const fetchByName = function (dataToSend, callback) {
        //console.log("Variant.fetchByName(dataToSend)", dataToSend)
        // ----
        let url = "/api/v1.0/variants/validate"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleVariantError("Oops: 1")
                    }
                })
            } catch (e) {
                //console.log("error", e)
                return handleVariantError("Error Validating Variant")
            }
        } else {
            return handleVariantError("Error Loading Variant - Missing Data")
        }
    }
    
    const nameExists = function (name) {
        //console.log("Variant.nameExists(name)", name)
        // ----
        if (name && name !== "") {
            /**
             * data to send to the server
             *
             * @type {{name}}
             */
            let dataToSend = remove_nulls({
                name: name,
                category_id: (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null,
            })
            /*
            fetchByName(dataToSend, function (data) {
                let variant = null
                
                if (data) {
                    variant = data
                    if (data[0]) {
                        variant = data[0]
                    }
                    //console.log("Variant.nameExists() - variant:", variant)
                    // ----
                    let detail
                    $table_variant_product_edit.clearSelectedRows()
                    globalSelectedVariant = true
                    let hasVariant = Variant.all.get(parseInt(variant.id))
                    if (hasVariant) {
                        detail = set(hasVariant)
                        $table_variant_product_edit.loadRow(detail)
                    } else {
                        detail = set(variant)
                    }
                    populateForm(detail)
                } else {
                    confirmDialog(`The variant: ${name} does not exist exists. Would you like to create it?`, (ans) => {
                        if (ans) {
                            $table_variant_product_edit.clearSelectedRows()
                            globalSelectedVariant = false
                            
                            populateForm()
                            _product_edit_variant_form_variant_name_filter.value = name
                            //loadForm()
                            //enableFormFields()
                        }
                    })
                }
            })
            //*/
            fetchByName(dataToSend, function (data) {
                let variant = null
                
                if (data && data[0]) {
                    variant = data
                    if (data[0]) {
                        variant = data[0]
                    }
                }
                
                if (variant) {
                    let hasVariant = Variant.all.get(parseInt(variant.id))
                    let detail
                    //console.log("_product_edit_variant_form_variant_name_filter:autocomplete() - variant", variant)
                    
                    if (hasVariant) {
                        detail = set(hasVariant)
                        $table_variant_product_edit.loadRow(detail)
                    } else {
                        detail = set(variant)
                    }
                    
                    populateForm(detail)
                } else {
                    confirmDialog(`The variant: ${name} does not exist exists. Would you like to create it?`, (ans) => {
                        if (ans) {
                            $table_variant_product_edit.clearSelectedRows()
                            globalSelectedVariant = false
                            clearForm()
                            _product_edit_variant_form_variant_name.value = name
                            _display_product_variant_name.innerText = name
                            loadForm()
                            enableFormFields()
                        }
                    })
                }
            })
            
        }
    }
    
    const buildProductEditTable = function () {
        //console.log("Variant.buildProductEditTable()", Variant)
        // ----
        $table_variant_product_edit = $(_table_variant_product_edit).table({
            table_type: "display_list",
            data: Variant.all,
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
                    title: "Code",
                    targets: 1,
                    data: "code",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "Min Age",
                    targets: 2,
                    data: "min_age",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "Max Age",
                    targets: 3,
                    data: "max_age",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
            
            ],
            rowClick: Variant.edit,
        })
    }
    
    const defaultDetail = function () {
        //console.log("Variant.defaultDetail()", Variant)
        // ----
        return {
            id: null,
            category_id: null,
            name: null,
            min_age: null,
            max_age: null,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            used_in_pricing: 1,
            note: null,
        }
    }
    
    const resetForm = function () {
        clearForm()
        disableFormFields()
        hideForm()
    }
    
    const validVariantRecord = function () {
        //console.log("Variant.validVariantRecord()", Variant.all)
        // ----
        let valid = $(_product_edit_variant_form).valid()
        let min_age = (!isNaN(parseInt(_product_edit_variant_form_variant_min_age.value))) ? parseInt(_product_edit_variant_form_variant_min_age.value) : null
        let max_age = (!isNaN(parseInt(_product_edit_variant_form_variant_max_age.value))) ? parseInt(_product_edit_variant_form_variant_max_age.value) : null
        if (min_age !== null && max_age !== null) {
            if (parseInt(max_age) < parseInt(min_age)) {
                setError(_product_edit_variant_form_variant_max_age, "Age is greater than minimum")
                valid = false
            }
        }
        
        return valid
    }
    
    const clearForm = function () {
        //console.log("Variant.clearForm()", Variant.all)
        // ----
        clearValidation(_product_edit_variant_form)
        _display_product_variant_name.innerText = "&nbsp;"
        _product_edit_variant_form_variant_id.value = ""
        _product_edit_variant_form_variant_name.value = ""
        _product_edit_variant_form_variant_enabled.checked = true
        _product_edit_variant_form_variant_code.value = ""
        _product_edit_variant_form_variant_min_age.value = 0
        _product_edit_variant_form_variant_max_age.value = ""
        _product_edit_variant_form_variant_used_in_pricing.checked = true
    }
    
    const populateForm = function (variant) {
        //console.log("Variant.populateForm()", variant)
        // ----
        clearForm()
        if (variant) {
            _product_edit_variant_form_variant_used_in_pricing.checked = (variant.used_in_pricing === 1)
            _display_product_variant_name.innerText = (variant.name) ? variant.name : "&nbsp;"
            _product_edit_variant_form_variant_id.value = (!isNaN(parseInt(variant.id))) ? parseInt(variant.id) : ""
            _product_edit_variant_form_variant_name.value = (variant.name) ? variant.name : "&nbsp;"
            _product_edit_variant_form_variant_enabled.checked = (!(variant.enabled && variant.enabled === 0))
            _product_edit_variant_form_variant_code.value = (variant.name) ? variant.name : "&nbsp;"
            _product_edit_variant_form_variant_min_age.value = (!isNaN(parseInt(variant.min_age))) ? parseInt(variant.min_age) : ""
            _product_edit_variant_form_variant_max_age.value = (!isNaN(parseInt(variant.max_age))) ? parseInt(variant.max_age) : ""
        }
        
        enableFormFields()
        loadForm()
    }
    
    const hideForm = function () {
        updateProgress()
        _product_edit_variant_form_variant_name_filter.disabled = false
        $(_edit_product_variant).hide()
    }
    
    const loadForm = function () {
        //console.log("Variant.loadForm()", Variant)
        // ----
        _product_edit_variant_form_variant_name_filter.disabled = true
        $(_edit_product_variant).show()
    }
    
    const enableFormFields = function () {
        //console.log("Variant.enableFormFields()", Variant)
        // ----
        _product_edit_variant_form_variant_used_in_pricing.disabled = false
        _product_edit_variant_form_variant_id.disabled = true
        _product_edit_variant_form_variant_name.disabled = true
        _product_edit_variant_form_variant_enabled.disabled = true
        _product_edit_variant_form_variant_code.disabled = true
        _product_edit_variant_form_variant_min_age.disabled = false
        _product_edit_variant_form_variant_max_age.disabled = false
        _product_edit_variant_form_submit_button.disabled = false
    }
    
    const disableFormFields = function () {
        //console.log("Variant.enableFormFields()", Variant)
        // ----
        _product_edit_variant_form_variant_used_in_pricing.disabled = true
        _product_edit_variant_form_variant_id.disabled = true
        _product_edit_variant_form_variant_name.disabled = true
        _product_edit_variant_form_variant_enabled.disabled = true
        _product_edit_variant_form_variant_code.disabled = true
        _product_edit_variant_form_variant_min_age.disabled = true
        _product_edit_variant_form_variant_max_age.disabled = true
        _product_edit_variant_form_submit_button.disabled = true
    }
    
    const buildVariantRecord = function () {
        //console.log("Variant.buildVariantRecord()", Variant)
        // ----
        
        let dataToSend = {
            id: (!isNaN(parseInt(_product_edit_variant_form_variant_id.value))) ? parseInt(_product_edit_variant_form_variant_id.value) : null,
            category_id: (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null,
            product_id: (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null,
            name: (_product_edit_variant_form_variant_name && _product_edit_variant_form_variant_name.value !== "") ? _product_edit_variant_form_variant_name.value : null,
            code: (_product_edit_variant_form_variant_code && _product_edit_variant_form_variant_code.value !== "") ? _product_edit_variant_form_variant_code.value : null,
            min_age: (!isNaN(parseInt(_product_edit_variant_form_variant_min_age.value))) ? parseInt(_product_edit_variant_form_variant_min_age.value) : null,
            max_age: (!isNaN(parseInt(_product_edit_variant_form_variant_max_age.value))) ? parseInt(_product_edit_variant_form_variant_max_age.value) : null,
            used_in_pricing: (_product_edit_variant_form_variant_used_in_pricing.checked === true) ? 1 : 0,
        }
        return remove_nulls(dataToSend)
    }
    
    const saveProductVariant = function (dataToSend, callback) {
        if (dataToSend) {
            let url = "/api/v1.0/variants/update"
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleVariantError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
            }
        }
    }
    
    const save = function () {
        if (validVariantRecord()) {
            confirmDialog(`Would you like to update? This change may affect your Pricing Worksheets.`, (ans) => {
                if (ans) {
                    let dataToSend = buildVariantRecord()
                    saveProductVariant(dataToSend, function (data) {
                        if (data) {
                            let detail = set((data[0]) ? data[0] : data)
                            let hasVariant = Variant.all.get(detail.id)
                            
                            if (hasVariant) {
                                $table_variant_product_edit.updateRow(detail)
                            } else {
                                $table_variant_product_edit.insertRow(detail)
                            }
                            
                            Variant.all.set(detail.id, detail)
                            
                            $table_variant_product_edit.loadRow(detail)
                            $table_variant_product_edit.jumpToRow(detail)
                            $table_variant_product_edit.clearSelectedRows()
                            
                            _product_edit_variant_form_variant_name_filter.disabled = false
                            _product_edit_variant_form_variant_name_filter.value = ""
                            
                            PricingWorksheet.pricingWorksheet()
                            Pricing.resetForm()
                            YearCalendar.refresh()
                            
                            updateProgress()
                            resetForm()
                            
                            toastr.success(`Variant: ${detail.name} - has been updated`)
                            YearCalendar.endLoading()
                        }
                    })
                } else {
                    resetForm()
                    $table_variant_product_edit.clearSelectedRows()
                    _product_edit_variant_form_variant_name_filter.value = ""
                    _product_edit_variant_form_variant_name_filter.disabled = false
                }
            })
        }
    }
    
    const loadAll = function (variants) {
        //console.log("Variant.loadAll(variants)", variants)
        // ----
        Variant.all = new Map()
        
        if (variants) {
            $.each(variants, function (k, variant) {
                let detail = set(variant)
                Variant.all.set(detail.id, detail)
                $table_variant_product_edit.insertRow(detail)
                //console.log("Variant - detail", detail)
            })
        }
    }
    
    const init = function (settings) {
        //console.log("Variant.init(settings)", Variant)
        // ----
        let variants = []
        if (settings) {
            if (settings) {
                variants = settings
            }
        }
        
        if (_table_variant_product_edit) {
            buildProductEditTable()
        }
        
        loadAll(variants)
        
        if (_product_edit_variant_form_variant_name_filter) {
            initAutoComplete()
        }
        
        if (_product_edit_variant_form) {
            validator_init(form_rules)
            Variant.validator = $(_product_edit_variant_form).validate()
            resetForm()
            updateProgress()
        }
    }
    
    const edit = function (variant) {
        //console.log("Variant.edit(variant)", variant)
        // ----
        if (variant) {
            let detail = set(variant)
            populateForm(detail)
        }
        
    }
    
    const set = function (variant) {
        let detail = defaultDetail()
        if (variant) {
            detail.id = (variant.id) ? variant.id : null
            detail.category_id = (variant.category_id) ? variant.category_id : null
            detail.name = (variant.name) ? variant.name : null
            detail.code = (variant.code) ? variant.code : null
            detail.min_age = (variant.min_age) ? variant.min_age.toString() : null
            detail.max_age = (variant.max_age) ? variant.max_age : null
            detail.enabled = (variant.enabled) ? variant.enabled : 1
            detail.date_created = (variant.date_created) ? variant.date_created : formatDateMySQL()
            detail.created_by = (variant.created_by) ? variant.created_by : user_id
            detail.date_modified = (variant.date_modified) ? variant.date_modified : formatDateMySQL()
            detail.modified_by = (variant.modified_by) ? variant.modified_by : user_id
            detail.used_in_pricing = (variant.used_in_pricing === 1) ? 1 : 0
            detail.note = (variant.note) ? variant.note : null
        }
        
        Product.detail = detail
        return detail
    }
    
    return {
        validator: null,
        all: new Map(),
        set: function (variant) {
            return set(variant)
        },
        edit: function (variant) {
            edit(variant)
        },
        init: function (settings) {
            init(settings)
        },
    }
})()

const Unit = (function () {
    "use strict"
    const _panel_tab_unit = document.getElementById("panel_tab_unit")
    const _button_remove_unit_from_product = document.getElementById("button_remove_unit_from_product")
    const _category_id = document.getElementById("category_id")
    const _product_id = document.getElementById("product_id")
    const _product_edit_unit_form = document.getElementById("product_edit_unit_form")
    const _product_edit_unit_form_submit_button = document.getElementById("product_edit_unit_form_submit_button")
    const _edit_product_unit = document.getElementById("edit_product_unit")
    const _product_edit_unit_form_unit_name_filter = document.getElementById("product_edit_unit_form_unit_name_filter")
    const _table_unit_product_edit = document.getElementById("table_unit_product_edit")
    const _product_edit_unit_form_unit_id = document.getElementById("product_edit_unit_form_unit_id")
    const _product_edit_unit_form_unit_name = document.getElementById("product_edit_unit_form_unit_name")
    const _product_edit_unit_form_unit_room_code = document.getElementById("product_edit_unit_form_unit_room_code")
    const _product_edit_unit_form_unit_min_nights = document.getElementById("product_edit_unit_form_unit_min_nights")
    const _product_edit_unit_form_unit_max_nights = document.getElementById("product_edit_unit_form_unit_max_nights")
    const _product_edit_unit_form_unit_min_pax = document.getElementById("product_edit_unit_form_unit_min_pax")
    const _product_edit_unit_form_unit_max_pax = document.getElementById("product_edit_unit_form_unit_max_pax")
    const _product_edit_unit_form_unit_description_short = document.getElementById("product_edit_unit_form_unit_description_short")
    const _product_edit_unit_form_unit_description_long = document.getElementById("product_edit_unit_form_unit_description_long")
    const _product_edit_unit_form_unit_enabled = document.getElementById("product_edit_unit_form_unit_enabled")
    const _calendar_loader = document.getElementById("calendar_loader")
    const _display_product_unit_name = document.getElementById("display_product_unit_name")
    const _product_edit_unit_form_clear_button = document.getElementById("product_edit_unit_form_clear_button")
    const _product_edit_unit_form_close_button = document.getElementById("product_edit_unit_form_close_button")
    const _table_unit_product_edit_add_new_button = document.getElementById("table_unit_product_edit_add_new_button")
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let $table_unit_product_edit = $(_table_unit_product_edit)
    let category_id
    let globalSelectedUnit = false
    let form_rules = {
        rules: {
            product_edit_unit_form_unit_min_nights: {
                required: true,
                number: true,
                min: 1,
            },
            product_edit_unit_form_unit_min_pax: {
                required: true,
                number: true,
                min: 1,
            },
            product_edit_unit_form_unit_max_pax: {
                required: true,
                number: true,
                min: 1,
            },
        },
        messages: {
            product_edit_unit_form_unit_min_nights: {
                required: "Field Required",
                number: "Field Invalid",
                min: "Field Invalid",
            },
            product_edit_unit_form_unit_min_pax: {
                required: "Field Required",
                number: "Field Invalid",
                min: "Field Invalid",
            },
            product_edit_unit_form_unit_max_pax: {
                required: "Field Required",
                number: "Field Invalid",
                min: "Field Invalid",
            },
        },
    }
    
    $(_button_remove_unit_from_product)
        .on("click", function () {
            remove()
        })
    
    $(_product_edit_unit_form_submit_button)
        .on("click", function () {
            save()
        })
    
    $(_product_edit_unit_form_clear_button)
        .on("click", function () {
            resetForm()
            $table_unit_product_edit.clearSelectedRows()
            _product_edit_unit_form_unit_name_filter.value = ""
            _product_edit_unit_form_unit_name_filter.disabled = false
            _product_edit_unit_form_unit_name.disabled = true
        })
    
    $(_product_edit_unit_form_close_button)
        .on("click", function () {
            resetForm()
            $table_unit_product_edit.clearSelectedRows()
            _product_edit_unit_form_unit_name_filter.value = ""
            _product_edit_unit_form_unit_name_filter.disabled = false
            _product_edit_unit_form_unit_name.disabled = true
        })
    
    $(_table_unit_product_edit_add_new_button)
        .on("click", function () {
            resetForm()
            $table_unit_product_edit.clearSelectedRows()
            disableFormFields()
            _product_edit_unit_form_unit_name_filter.value = ""
            _product_edit_unit_form_unit_name.value = ""
            _product_edit_unit_form_unit_name_filter.disabled = true
            _product_edit_unit_form_unit_name.disabled = false
            enableFormFields()
            loadForm()
        })
    
    $(_panel_tab_unit)
        .on("hide.bs.tab", function () {
            resetForm()
            $table_unit_product_edit.clearSelectedRows()
            _product_edit_unit_form_unit_name_filter.value = ""
            _product_edit_unit_form_unit_name_filter.disabled = false
            _product_edit_unit_form_unit_name.disabled = true
        })
    
    const removeProductUnit = function (dataToSend, callback) {
        if (dataToSend) {
            let url = "/api/v1.0/units/remove"
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleUnitError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
            }
        }
    }
    
    const remove = function () {
        confirmDialog(`Would you like to update? This change may affect your Pricing Worksheets.`, (ans) => {
            if (ans) {
                let dataToSend = {
                    unit_id: parseInt(_product_edit_unit_form_unit_id.value),
                    product_id: parseInt(_product_id.value),
                }
                
                removeProductUnit(dataToSend, function (data) {
                    let unitId = dataToSend.unit_id
                    if (data) {
                        
                        let unit = Unit.all.get(unitId)
                        
                        if (unit) {
                            $table_unit_product_edit.deleteRow(unit)
                        }
                        
                        Unit.all.delete(unitId)
                        
                        $table_unit_product_edit.clearSelectedRows()
                        
                        _product_edit_unit_form_unit_name_filter.value = ""
                        _product_edit_unit_form_unit_name_filter.disabled = false
                        
                        PricingWorksheet.pricingWorksheet()
                        Pricing.resetForm()
                        YearCalendar.refresh()
                        
                        updateProgress()
                        clearForm()
                        hideForm()
                        
                        toastr.success(`Unit: ${unit.name} - has been removed`)
                        YearCalendar.endLoading()
                    }
                })
            }
        })
    }
    
    const updateProgress = function () {
        let units = Array.from(Unit.all.values())
        if (units.length === 0) {
            $(_panel_tab_unit).html(`Unit <span id="unitNeedsAttention" class="badge rounded-pill badge-notification bg-danger">!</span>`)
        } else {
            $(_panel_tab_unit).html(`Unit`)
        }
        
        Product.updateProgress()
    }
    
    const initAutoComplete = function () {
        category_id = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
        
        $(_product_edit_unit_form_unit_name_filter)
            .on("click", function () {
                $(this).select()
            })
            .on("search", function () {
                globalSelectedUnit = false
                clearForm()
                hideForm()
            })
            .on("change", function () {
                setTimeout(function () {
                    //*
                    let unit_name = _product_edit_unit_form_unit_name_filter.value
                    
                    if (globalSelectedUnit === false) {
                        if (unit_name === "") {
                            globalSelectedUnit = false
                            clearForm()
                            hideForm()
                        } else {
                            nameExists(unit_name)
                        }
                    }
                    //*/
                }, 200)
            })
            .autocomplete({
                serviceUrl: "/api/v1.0/autocomplete/units",
                minChars: 2,
                cache: false,
                dataType: "json",
                triggerSelectOnValidInput: false,
                paramName: "st",
                params: { "category_id": category_id },
                onSelect: function (suggestion) {
                    $table_unit_product_edit.clearSelectedRows()
                    
                    if (!suggestion || !suggestion.data) {
                        return
                    }
                    let detail
                    let unit = suggestion.data
                    let hasUnit = Unit.all.get(parseInt(unit.id))
                    
                    //console.log("_product_edit_unit_form_unit_name_filter:autocomplete() - unit", unit)
                    
                    if (hasUnit) {
                        detail = set(hasUnit)
                        $table_unit_product_edit.loadRow(detail)
                    } else {
                        detail = set(unit)
                    }
                    
                    populateForm(detail)
                },
            })
    }
    
    const nameExists = function (name) {
        //console.log("Unit.nameExists(unit_name)", name)
        if (name && name !== "") {
            /**
             * data to send to the server
             *
             * @type {{name}}
             */
            let dataToSend = {
                name: name,
            }
            
            fetchByName(dataToSend, function (data) {
                let unit = null
                
                if (data && data[0]) {
                    unit = data
                    if (data[0]) {
                        unit = data[0]
                    }
                }
                
                if (unit) {
                    let hasUnit = Unit.all.get(parseInt(unit.id))
                    let detail
                    //console.log("_product_edit_unit_form_unit_name_filter:autocomplete() - unit", unit)
                    
                    if (hasUnit) {
                        detail = set(hasUnit)
                        $table_unit_product_edit.loadRow(detail)
                    } else {
                        detail = set(unit)
                    }
                    
                    populateForm(detail)
                } else {
                    confirmDialog(`The unit: ${name} does not exist exists. Would you like to create it?`, (ans) => {
                        if (ans) {
                            $table_unit_product_edit.clearSelectedRows()
                            globalSelectedUnit = false
                            
                            clearForm()
                            
                            _product_edit_unit_form_unit_name.value = name
                            loadForm()
                            enableFormFields()
                        } else {
                            resetForm()
                            $table_unit_product_edit.clearSelectedRows()
                            _product_edit_unit_form_unit_name_filter.value = ""
                            _product_edit_unit_form_unit_name_filter.disabled = false
                            _product_edit_unit_form_unit_name.disabled = true
                        }
                    })
                }
            })
        }
    }
    
    const handleUnitError = function (msg) {
        toastr.error(msg)
    }
    
    const fetchByName = function (dataToSend, callback) {
        let url = "/api/v1.0/units/validate"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleUnitError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
                return handleUnitError("Error Validating Unit")
            }
        } else {
            return handleUnitError("Error Loading Unit - Missing Data")
        }
    }
    
    const defaultDetail = function () {
        return {
            api_id: null,
            blurb: null,
            category_id: 1,
            cover_image: "/public/img/unit_cover_placeholder.jpg",
            created_by: user_id,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
            description_long: null,
            description_short: null,
            enabled: 1,
            end_time: null,
            id: null,
            max_nights: null,
            max_pax: null,
            meeting_point: null,
            min_nights: 1,
            min_pax: 1,
            modified_by: user_id,
            name: null,
            note: null,
            room_code: null,
            start_time: null,
            time_notes: null,
        }
    }
    
    const set = function (unit) {
        let detail = defaultDetail()
        
        if (unit) {
            detail.api_id = (unit.api_id) ? unit.api_id : null
            detail.blurb = (unit.blurb) ? unit.blurb : null
            detail.category_id = (unit.category_id) ? unit.category_id : null
            detail.cover_image = (unit.cover_image) ? unit.cover_image : "/public/img/unit_cover_placeholder.jpg"
            detail.created_by = (unit.created_by) ? unit.created_by : user_id
            detail.date_created = (unit.date_created) ? unit.date_created : formatDateMySQL()
            detail.date_modified = (unit.date_modified) ? unit.date_modified : formatDateMySQL()
            detail.description_long = (unit.description_long) ? unit.description_long : null
            detail.description_short = (unit.description_short) ? unit.description_short : null
            detail.enabled = (unit.enabled) ? unit.enabled : 1
            detail.end_time = (unit.end_time) ? unit.end_time : null
            detail.id = (unit.id) ? unit.id : null
            detail.max_nights = (unit.max_nights) ? unit.max_nights : null
            detail.max_pax = (unit.max_pax) ? unit.max_pax : null
            detail.meeting_point = (unit.meeting_point) ? unit.meeting_point : null
            detail.min_nights = (unit.min_nights) ? unit.min_nights : 1
            detail.min_pax = (unit.min_pax) ? unit.min_pax : 1
            detail.modified_by = (unit.modified_by) ? unit.modified_by : user_id
            detail.name = (unit.name) ? unit.name : null
            detail.note = (unit.note) ? unit.note : null
            detail.room_code = (unit.room_code) ? unit.room_code : null
            detail.start_time = (unit.start_time) ? unit.start_time : null
            detail.time_notes = (unit.time_notes) ? unit.time_notes : null
        }
        
        return detail
    }
    
    const save = function () {
        if (validUnitRecord()) {
            confirmDialog(`Would you like to update? This change may affect your Pricing Worksheets.`, (ans) => {
                if (ans) {
                    let dataToSend = buildUnitRecord()
                    
                    saveProductUnit(dataToSend, function (data) {
                        if (data) {
                            let detail = set((data[0]) ? data[0] : data)
                            let hasUnit = Unit.all.get(detail.id)
                            
                            if (hasUnit) {
                                $table_unit_product_edit.updateRow(detail)
                            } else {
                                $table_unit_product_edit.insertRow(detail)
                            }
                            
                            Unit.all.set(detail.id, detail)
                            
                            $table_unit_product_edit.loadRow(detail)
                            $table_unit_product_edit.jumpToRow(detail)
                            $table_unit_product_edit.clearSelectedRows()
                            
                            _product_edit_unit_form_unit_name_filter.value = ""
                            
                            PricingWorksheet.pricingWorksheet()
                            Pricing.resetForm()
                            YearCalendar.refresh()
                            
                            updateProgress()
                            clearForm()
                            hideForm()
                            
                            toastr.success(`Unit: ${detail.name} - has been updated`)
                            YearCalendar.endLoading()
                        }
                    })
                }
            })
        }
    }
    
    const validUnitRecord = function () {
        //console.log("Unit.validUnitRecord()", Unit)
        // ----
        let valid = $(_product_edit_unit_form).valid()
        let min_pax = (!isNaN(parseInt(_product_edit_unit_form_unit_min_pax.value))) ? parseInt(_product_edit_unit_form_unit_min_pax.value) : null
        let max_pax = (!isNaN(parseInt(_product_edit_unit_form_unit_max_pax.value))) ? parseInt(_product_edit_unit_form_unit_max_pax.value) : null
        let min_nights = (!isNaN(parseInt(_product_edit_unit_form_unit_min_nights.value))) ? parseInt(_product_edit_unit_form_unit_min_nights.value) : null
        let max_nights = (!isNaN(parseInt(_product_edit_unit_form_unit_max_nights.value))) ? parseInt(_product_edit_unit_form_unit_max_nights.value) : null
        
        if (min_pax !== null && max_pax !== null) {
            if (parseInt(max_pax) < parseInt(min_pax)) {
                setError(_product_edit_unit_form_unit_max_pax, "Pax is greater than minimum")
                valid = false
            } else {
                clearError(_product_edit_unit_form_unit_max_pax)
            }
        }
        
        if (min_nights !== null && max_nights !== null) {
            if (parseInt(max_nights) < parseInt(min_nights)) {
                setError(_product_edit_unit_form_unit_max_nights, "Pax is greater than minimum")
                valid = false
            } else {
                clearError(_product_edit_unit_form_unit_max_nights)
            }
        }
        
        return valid
    }
    
    const buildUnitRecord = function () {
        //console.log("Unit.buildUnitRecord()", Unit)
        let dataToSend = {
            id: (!isNaN(parseInt(_product_edit_unit_form_unit_id.value))) ? parseInt(_product_edit_unit_form_unit_id.value) : null,
            product_id: (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null,
            category_id: (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null,
            min_pax: parseInt(_product_edit_unit_form_unit_min_pax.value) ? parseInt(_product_edit_unit_form_unit_min_pax.value) : null,
            max_pax: parseInt(_product_edit_unit_form_unit_max_pax.value) ? parseInt(_product_edit_unit_form_unit_max_pax.value) : null,
            min_nights: parseInt(_product_edit_unit_form_unit_min_nights.value) ? parseInt(_product_edit_unit_form_unit_min_nights.value) : null,
            max_nights: parseInt(_product_edit_unit_form_unit_max_nights.value) ? parseInt(_product_edit_unit_form_unit_max_nights.value) : null,
            api_id: null,
            name: (_product_edit_unit_form_unit_name.value) ? _product_edit_unit_form_unit_name.value : null,
            room_code: (_product_edit_unit_form_unit_room_code.value) ? _product_edit_unit_form_unit_room_code.value : null,
            blurb: null,
            cover_image: "",
            meeting_point: null,
            time_notes: null,
            start_time: null,
            end_time: null,
            description_short: (_product_edit_unit_form_unit_description_short.value) ? _product_edit_unit_form_unit_description_short.value : null,
            description_long: (_product_edit_unit_form_unit_description_long.value) ? _product_edit_unit_form_unit_description_long.value : null,
            enabled: (_product_edit_unit_form_unit_enabled.checked === true) ? 1 : 0,
        }
        
        return remove_nulls(dataToSend)
    }
    
    const saveProductUnit = function (dataToSend, callback) {
        if (dataToSend) {
            let url = "/api/v1.0/units/update"
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    }
                })
            } catch (e) {
                console.log("error", e)
            }
        }
    }
    
    const clearForm = function () {
        //console.log("Unit:clearForm()", Unit)
        _product_edit_unit_form_unit_id.value = ""
        _product_edit_unit_form_unit_name.value = ""
        _product_edit_unit_form_unit_room_code.value = ""
        _product_edit_unit_form_unit_min_nights.value = 1
        _product_edit_unit_form_unit_max_nights.value = ""
        _product_edit_unit_form_unit_min_pax.value = 1
        _product_edit_unit_form_unit_max_pax.value = ""
        _product_edit_unit_form_unit_description_short.value = ""
        _product_edit_unit_form_unit_description_long.value = ""
        _product_edit_unit_form_unit_enabled.checked = true
    }
    
    const loadForm = function () {
        if (_edit_product_unit) {
            $(_edit_product_unit).show()
            _product_edit_unit_form_unit_name_filter.disabled = true
        }
    }
    
    const disableFormFields = function () {
        _product_edit_unit_form_unit_id.disabled = true
        _product_edit_unit_form_unit_name.disabled = true
        _product_edit_unit_form_unit_room_code.disabled = true
        _product_edit_unit_form_unit_min_nights.disabled = true
        _product_edit_unit_form_unit_max_nights.disabled = true
        _product_edit_unit_form_unit_min_pax.disabled = true
        _product_edit_unit_form_unit_max_pax.disabled = true
        _product_edit_unit_form_unit_description_short.disabled = true
        _product_edit_unit_form_unit_description_long.disabled = true
        _product_edit_unit_form_unit_enabled.disabled = true
    }
    
    const enableFormFields = function () {
        
        disableFormFields()
        
        _product_edit_unit_form_unit_id.disabled = true
        _product_edit_unit_form_unit_name.disabled = true
        _product_edit_unit_form_unit_room_code.disabled = true
        _product_edit_unit_form_unit_enabled.disabled = true
        
        _product_edit_unit_form_unit_description_short.disabled = false
        _product_edit_unit_form_unit_description_long.disabled = false
        
    }
    
    const hideForm = function () {
        if (_edit_product_unit) {
            $(_edit_product_unit).hide()
            _product_edit_unit_form_unit_name_filter.disabled = false
            updateProgress()
        }
    }
    
    const resetForm = function () {
        let categoryId = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
        
        clearForm()
        hideForm()
        
        let labelMinPax, labelMaxPax, labelMinNights, labelMaxNights,
            disabledMinPax, disabledMaxPax, disabledMinNights, disabledMaxNights,
            valueMinPax, valueMaxPax, valueMinNights, valueMaxNights,
            labelRoomCode, disabledRoomCode
        
        switch (categoryId) {
            case 1:
                labelMinPax = "Minimum Pax:"
                labelMaxPax = "Maximum Pax:"
                labelMinNights = "Minimum Nights:"
                labelMaxNights = "Maximum Nights:"
                
                labelRoomCode = "Room Code:"
                
                disabledMinPax = false
                disabledMaxPax = false
                disabledMinNights = false
                disabledMaxNights = false
                disabledRoomCode = false
                
                valueMinPax = 1
                valueMaxPax = ""
                valueMinNights = 1
                valueMaxNights = ""
                break
            case 2:
                labelMinPax = "Minimum Pax:"
                labelMaxPax = "Maximum Pax:"
                labelMinNights = "Minimum Days:"
                labelMaxNights = "Maximum Days:"
                
                labelRoomCode = "Seat Code:"
                
                valueMinPax = 1
                valueMaxPax = 1
                valueMinNights = 1
                valueMaxNights = 1
                
                break
            case 4:
                labelMinPax = "Minimum Pax:"
                labelMaxPax = "Maximum Pax:"
                labelMinNights = "Minimum Days:"
                labelMaxNights = "Maximum Days:"
                
                labelRoomCode = "Seat Code:"
                
                valueMinPax = 1
                valueMaxPax = 1
                valueMinNights = 1
                valueMaxNights = 1
                
                break
            default:
                labelMinPax = "Minimum Pax:"
                labelMaxPax = "Maximum Pax:"
                labelMinNights = "Minimum Nights:"
                labelMaxNights = "Maximum Nights:"
                
                disabledMinPax = false
                disabledMaxPax = false
                disabledMinNights = false
                disabledMaxNights = false
                
                valueMinPax = 1
                valueMaxPax = ""
                valueMinNights = 1
                valueMaxNights = ""
        }
        
        let labels = document.getElementsByTagName('LABEL')
        for (let i = 0; i < labels.length; i++) {
            if (labels[i].htmlFor !== '') {
                let elem = document.getElementById(labels[i].htmlFor)
                if (elem) {
                    elem.label = labels[i]
                }
            }
        }
        
        _product_edit_unit_form_unit_min_nights.value = valueMinNights
        _product_edit_unit_form_unit_max_nights.value = valueMaxNights
        _product_edit_unit_form_unit_min_pax.value = valueMinPax
        _product_edit_unit_form_unit_max_pax.value = valueMaxPax
        
        _product_edit_unit_form_unit_min_nights.label.innerHTML = labelMinNights
        _product_edit_unit_form_unit_max_nights.label.innerHTML = labelMaxNights
        _product_edit_unit_form_unit_min_pax.label.innerHTML = labelMinPax
        _product_edit_unit_form_unit_max_pax.label.innerHTML = labelMaxPax
        _product_edit_unit_form_unit_room_code.label.innerHTML = labelRoomCode
        
        _product_edit_unit_form_unit_min_nights.disabled = disabledMinNights
        _product_edit_unit_form_unit_max_nights.disabled = disabledMaxNights
        _product_edit_unit_form_unit_min_pax.disabled = disabledMinPax
        _product_edit_unit_form_unit_max_pax.disabled = disabledMaxPax
        
    }
    
    const initForm = function () {
    
    }
    
    const populateForm = function (unit) {
        resetForm()
        
        if (unit) {
            let categoryId = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
            
            if (categoryId === 2 || categoryId === 4) {
                _product_edit_unit_form_unit_min_nights.value = (unit.min_nights) ? unit.min_nights : 1
                _product_edit_unit_form_unit_max_nights.value = (unit.max_nights) ? unit.max_nights : 1
                _product_edit_unit_form_unit_min_pax.value = (unit.min_pax) ? unit.min_pax : 1
                _product_edit_unit_form_unit_max_pax.value = (unit.max_pax) ? unit.max_pax : 1
                
                _product_edit_unit_form_unit_min_nights.disabled = true
                _product_edit_unit_form_unit_max_nights.disabled = true
                _product_edit_unit_form_unit_min_pax.disabled = true
                _product_edit_unit_form_unit_max_pax.disabled = true
                _product_edit_unit_form_unit_room_code.disabled = true
                
            } else {
                _product_edit_unit_form_unit_min_nights.value = (unit.min_nights) ? unit.min_nights : 1
                _product_edit_unit_form_unit_max_nights.value = (unit.max_nights) ? unit.max_nights : null
                _product_edit_unit_form_unit_min_pax.value = (unit.min_pax) ? unit.min_pax : 1
                _product_edit_unit_form_unit_max_pax.value = (unit.max_pax) ? unit.max_pax : null
                
                _product_edit_unit_form_unit_min_nights.disabled = false
                _product_edit_unit_form_unit_max_nights.disabled = false
                _product_edit_unit_form_unit_min_pax.disabled = false
                _product_edit_unit_form_unit_max_pax.disabled = false
                _product_edit_unit_form_unit_room_code.disabled = false
                
            }
            
            _product_edit_unit_form_unit_name_filter.value = (unit.name) ? unit.name : ""
            _product_edit_unit_form_unit_id.value = (unit.id) ? unit.id : ""
            _product_edit_unit_form_unit_name.value = (unit.name) ? unit.name : ""
            _product_edit_unit_form_unit_room_code.value = (unit.room_code) ? unit.room_code : ""
            
            _product_edit_unit_form_unit_description_short.value = (unit.description_short) ? unit.description_short : ""
            _product_edit_unit_form_unit_description_long.value = (unit.description_long) ? unit.description_long : ""
            _product_edit_unit_form_unit_enabled.checked = true
            _display_product_unit_name.innerText = (unit.name) ? unit.name : ""
        }
        
        loadForm()
    }
    
    const loadAll = function (units) {
        Unit.all = new Map()
        
        if (!units) {
            units = []
        }
        
        $.each(units, function (k, unit) {
            let detail = set(unit)
            //console.log("detail", detail)
            Unit.all.set(detail.id, detail)
            $table_unit_product_edit.insertRow(detail)
        })
        
        updateProgress()
    }
    
    const buildProductEditTable = function () {
        category_id = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
        
        if (category_id === 1) {
            Unit.byValue = "Night"
            Unit.paxValue = "Pax"
        } else {
            Unit.byValue = "Day"
            Unit.paxValue = "Pax"
        }
        
        $table_unit_product_edit = $(_table_unit_product_edit).table({
            table_type: "display_list",
            data: [],
            columnDefs: [
                {
                    title: "Room Code",
                    targets: 0,
                    data: "room_code",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "Name",
                    targets: 1,
                    data: "name",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "Min " + Unit.byValue + "(s)",
                    targets: 2,
                    data: "min_nights",
                    render: function (data, type, row, meta) {
                        let nights = 1
                        if (data === null) {
                            nights = "null"
                        } else {
                            nights = data
                        }
                        return "<span style='white-space: nowrap;'>" + nights + "</span>"
                    },
                },
                {
                    title: "Max " + Unit.byValue + "(s)",
                    targets: 3,
                    data: "max_nights",
                    render: function (data, type, row, meta) {
                        let nights = 1
                        if (data === null) {
                            nights = "&infin;"
                        } else {
                            nights = data
                        }
                        return "<span style='white-space: nowrap;'>" + nights + "</span>"
                    },
                },
                {
                    title: "Min " + Unit.paxValue + "",
                    targets: 4,
                    data: "min_pax",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "Max " + Unit.paxValue + "",
                    targets: 5,
                    data: "max_pax",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
            ],
            rowClick: Unit.edit,
        })
    }
    
    const init = function (settings) {
        let units = []
        
        if (settings) {
            units = settings
            if (settings.units) {
                units = settings.units
            }
        }
        
        if (_product_edit_unit_form) {
            initAutoComplete()
            validator_init(form_rules)
            Unit.validator = $(_product_edit_unit_form).validate()
            initForm()
        }
        
        if (_product_edit_unit_form_unit_name_filter) {
            buildProductEditTable()
            loadAll(units)
        }
        
        if (_edit_product_unit) {
            resetForm()
            updateProgress()
        }
        
    }
    
    const edit = function (unit) {
        populateForm(unit)
        enableFormFields()
        //console.log("Unit.edit(unit)", unit)
    }
    
    return {
        all: new Map(),
        byValue: "Night",
        paxValue: "Pax",
        validator: null,
        edit: function (unit) {
            edit(unit)
        },
        init: function (settings) {
            init(settings)
        },
    }
})()

const Address = (function () {
    "use strict"
    const _button_add_address_table = document.getElementById("button_add_address_table")
    const _button_close_edit_address_form = document.getElementById("button_close_edit_address_form")
    const _button_clear_form_edit_address = document.getElementById("button_clear_form_edit_address")
    const _button_submit_form_edit_address = document.getElementById("button_submit_form_edit_address")
    const _form_edit_address = document.getElementById("form_edit_address")
    const _card_edit_address_form = document.getElementById("card_edit_address_form")
    const _table_address = document.getElementById("table_address")
    const _address_id = document.getElementById("address_id")
    const _company_id = document.getElementById("company_id")
    const _address_enabled = document.getElementById("address_enabled")
    const _address_street_1 = document.getElementById("address_street_1")
    const _address_street_2 = document.getElementById("address_street_2")
    const _address_street_3 = document.getElementById("address_street_3")
    const _address_country_id = document.getElementById("address_country_id")
    const _address_types_id = document.getElementById("address_types_id")
    const _address_province_id = document.getElementById("address_province_id")
    const _address_city_id = document.getElementById("address_city_id")
    const _address_postal_code = document.getElementById("address_postal_code")
    const _address_company_id = document.getElementById("address_company_id")
    const _clear_address_table = document.getElementById("clear_address_table")
    /**
     * Defaults
     */
    let default_display = defaultAddressView
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let $address_table = $(_table_address)
    let temp_address = {}
    let validator
    let form_rules = {
        groups: {
            cityGroup: "address_country_id address_province_id address_city_id",
        },
        rules: {
            
            address_types_id: {
                required: true,
            },
            address_company_id: {
                required: true,
            },
            address_country_id: {
                required: true,
            },
            address_province_id: {
                required: true,
            },
            address_city_id: {
                required: true,
            },
        },
        messages: {
            address_company_id: {
                required: "Field Required",
            },
            address_types_id: {
                required: "Field Required",
            },
            address_country_id: {
                required: "Field Required",
            },
            address_province_id: {
                required: "Field Required",
            },
            address_city_id: {
                required: "Field Required",
            },
        },
    }
    
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
            let dataToSend = build()
            if (!dataToSend) {
                return
            }
            confirmDialog(`Would you like to update?`, (ans) => {
                if (ans) {
                    save(dataToSend)
                }
            })
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
     * clear address table button
     */
    $(_clear_address_table)
        .on("click", function () {
            Address.clearTable()
        })
    
    /**
     * save address form data
     */
    const save = function (dataToSend) {
        
        if (dataToSend) {
            update_address(dataToSend, function (data) {
                if (data) {
                    if (data[0]) {
                        let address = data[0]
                        let detail = set_detail(address)
                        if (Address.all.get(detail.id)) {
                            $address_table.updateRow(detail)
                        } else {
                            $address_table.insertRow(detail)
                        }
                        
                        Address.all.set(detail.id, detail)
                        
                        $address_table.clearSelectedRows()
                        clear_form()
                        unload_form()
                        
                        toastr.success("Address Updated")
                        
                    }
                }
            })
        }
    }
    
    /**
     * build address record to update
     *
     * @returns {{}|*}
     */
    const build = function () {
        /**
         * address_types_id: [1]
         * city_id: 428
         * company_id: 1
         * country_id: 219
         * enabled: 1
         * id: 1
         * postal_code: "12345"
         * province_id: 51
         * street_1: "STREET 1"
         * street_2: "STREET 2"
         * street_3: "STREET 3"
         */
        if (validate_form()) {
            let dataToSend = {
                company_id: (!isNaN(parseInt(_address_company_id.value))) ? parseInt(_address_company_id.value) : null,
                street_1: (_address_street_1.value !== "") ? _address_street_1.value : null,
                street_2: (_address_street_2.value !== "") ? _address_street_2.value : null,
                street_3: (_address_street_3.value !== "") ? _address_street_3.value : null,
                postal_code: (_address_postal_code.value !== "") ? _address_postal_code.value : null,
                country_id: (!isNaN(_address_country_id.value)) ? parseInt(_address_country_id.value) : null,
                province_id: (!isNaN(_address_province_id.value)) ? parseInt(_address_province_id.value) : null,
                city_id: (!isNaN(_address_city_id.value)) ? parseInt(_address_city_id.value) : null,
                address_types_id: toNumbers(getListOfIds($(_address_types_id).val())),
                enabled: (_address_enabled.checked === true) ? 1 : 0,
                id: (!isNaN(parseInt(_address_id.value))) ? parseInt(_address_id.value) : null,
            }
            return remove_nulls(dataToSend)
        }
    }
    
    /**
     * update address
     *
     * @param dataToSend
     * @param callback
     */
    const update_address = function (dataToSend, callback) {
        let url = "/api/v1.0/addresses/update"
        if (dataToSend) {
            sendPostRequest(url, dataToSend, function (data, status, xhr) {
                if (data) {
                    return callback(data)
                } else {
                    return handle_address_error("Oops: 1")
                }
            })
        }
    }
    
    /**
     * validate address form for submit
     *
     * @returns {*|jQuery}
     */
    const validate_form = function () {
        return $(_form_edit_address).valid()
    }
    
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
            company_id: null,
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
            formatted_types: "",
        }
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
            _address_company_id.value = (address.company_id) ? address.company_id : null
            $(_address_types_id).val((address.address_types_id) ? address.address_types_id : [])
            _address_enabled.checked = (address.enabled === 1)
            _address_street_1.value = (address.street_1) ? address.street_1 : null
            _address_street_2.value = (address.street_2) ? address.street_2 : null
            _address_street_3.value = (address.street_3) ? address.street_3 : null
            _address_postal_code.value = (address.postal_code) ? address.postal_code : null
            Province.id = address.province.id
            Country.id = address.country.id
            City.id = address.city.id
            
            $(_address_country_id).val((address.country.id) ? address.country.id : "").trigger("change")
        }
    }
    
    /**
     * reset address edit form
     */
    const reset_form = function () {
        _address_id.value = ""
        _address_company_id.value = _company_id.value
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
        if (_card_edit_address_form) {
            reset_form()
            populate_form(address)
            $(_card_edit_address_form).show()
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
                    {
                        title: "Types",
                        targets: 2,
                        data: "formatted_types",
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
        if (!addresses) {
            return
        }
        let loadAddress
        let count = 0
        $.each(addresses, function (i, address) {
            let detail = set_detail(address)
            if (count === 0) {
                loadAddress = detail
            }
            
            Address.all.set(detail.id, detail)
            $address_table.insertRow(detail)
            count++
        })
        
        if (_table_address) {
            if (loadAddress) {
                $address_table.loadRow(loadAddress)
            }
            
            $address_table.clearSelectedRows()
        }
        
        if (_card_edit_address_form) {
            clear_form()
            unload_form()
        }
    }
    
    /**
     * populate address table with addresses
     *
     * @param addresses
     */
    const populate_table = function (addresses) {
        if (_table_address) {
            Address.all = new Map()
            let loadAddress
            let count = 0
            $.each(addresses, function (i, address) {
                
                if (count === 0) {
                    loadAddress = address
                }
                
                address.address_types_id = getListOfIds(address.address_types_id)
                
                Address.all.set(address.id, address)
                
                $address_table.insertRow(address)
                count++
            })
            
            if (_table_address) {
                if (loadAddress) {
                    $address_table.loadRow(loadAddress)
                }
                
                $address_table.clearSelectedRows()
            }
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
        
        if (addresses) {
            load_all(addresses)
        }
        
        if (_form_edit_address) {
            validator_init(form_rules)
            validator = $(_form_edit_address).validate()
            
            $(_address_country_id).BuildDropDown({
                data: Array.from(Country.all.values()),
                title: "Country",
                id_field: "id",
                text_field: "name",
                first_selectable: false,
            })
            $(_address_province_id).BuildDropDown({
                data: [],
                title: "Province",
                id_field: "id",
                text_field: "name",
                first_selectable: false,
            })
            $(_address_city_id).BuildDropDown({
                data: [],
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
            //console.log("address", address)
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
            detail.company_id = parseInt((address.company_id) ? address.company_id : null)
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
            detail.formatted_types = (address.formatted_types) ? address.formatted_types : ""
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
            load_form(address)
        }
    }
    
    /**
     * clear and empty table
     */
    const clearTable = function () {
        let addresses = Array.from(Address.all.values())
        
        $.each(addresses, function (k, address) {
            $address_table.deleteRow(address)
        })
        
        Address.all = new Map()
    }
    
    /**
     * post request to fetch addresses by company id
     *
     * @param dataToSend
     * @param callback
     */
    const fetch_addresses_by_company_id = function (dataToSend, callback) {
        let url = "/api/v1.0/addresses"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handle_address_error("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
                return handle_address_error("Error Validating Company")
            }
        } else {
            return handle_address_error("Error Loading Company- Missing Data")
        }
    }
    
    /**
     * get all addresses by company id
     *
     * @param company_id
     */
    const get_by_company_id = function (company_id) {
        if (company_id) {
            fetch_addresses_by_company_id({ company_id: company_id }, function (data) {
                if (data) {
                    let addresses = data
                    clearTable()
                    populate_table(addresses)
                }
            })
        }
    }
    
    /**
     * globals
     */
    return {
        validator: null,
        detail: {},
        all: new Map(),
        get_by_company_id: function (company_id) {
            get_by_company_id(company_id)
        },
        get: function (address_id) {
        
        },
        navigate: function (address) {
            navigate(address)
        },
        load_all: function (params) {
            load_all(params)
        },
        save: function (params) {
            save(params)
        },
        clearTable: function () {
            clearTable()
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

$.fn.DisabledDOW = function (settings) {
    "use strict"
    let id = this.attr("id")
    let label_text = "Disabled DOW"
    let name_prefix = id + "_"
    if (settings) {
        if (settings.name && settings.name !== "") {
            name_prefix = settings.name
        }
        
        if (settings && settings.label && settings.label !== "") {
            label_text = settings.label
        }
    }
    const _this = document.getElementById(id)
    const $this = $(_this)
    
    $this.on("change", function () {
        //console.log("change")
    })
    
    /**
     * buildCheckBox
     *
     * @param day
     * @returns {HTMLInputElement}
     */
    const buildCheckBox = function (day) {
        let input = document.createElement("input")
        input.type = "checkbox"
        input.classList = day.class
        input.id = day.for
        input.name = day.for
        input.value = day.value
        
        input.addEventListener("click", event => {
            let id = (input.id) ? input.id : ""
            set(input, id)
        })
        
        return input
    }
    
    const buildCheckBoxWrapper = function () {
        let div = document.createElement("div")
        div.classList = "custom-control custom-checkbox custom-control-inline"
        return div
    }
    
    const buildCheckBoxLabel = function (day) {
        let label = document.createElement("label")
        label.classList = "custom-control-label"
        label.htmlFor = day.for
        label.innerText = day.label
        return label
    }
    
    const buildCheckBoxColumn = function () {
        let days = Array.from(DisabledDOW.days_of_week.values())
        let div = document.createElement("div")
        
        div.classList = "col-12 col-md-10 col-xl-9"
        
        $.each(days, function (k, day) {
            let wrapper = buildCheckBoxWrapper()
            let label = buildCheckBoxLabel(day)
            let input = buildCheckBox(day)
            wrapper.appendChild(input)
            wrapper.appendChild(label)
            div.appendChild(wrapper)
        })
        
        return div
    }
    
    const buildCheckBoxColumnLabel = function () {
        let div = document.createElement("div")
        let label = document.createElement("label")
        label.innerText = label_text + ":"
        
        div.classList = "col-12 col-md-2 col-xl-3"
        
        div.appendChild(label)
        return div
    }
    
    const buildCheckBoxRow = function () {
        let div = document.createElement("div")
        div.classList = "row"
        return div
    }
    
    const buildForm = function () {
        $this.empty()
        DisabledDOW.days_of_week = new Map()
        
        DisabledDOW.days_of_week.set(
            "*", {
                label: "All",
                for: name_prefix + "dow_select_all",
                value: "*",
                class: "custom-control-input dow_select",
            })
        DisabledDOW.days_of_week.set(
            "0", {
                label: "Sun",
                for: name_prefix + "dow_select_sun",
                value: 0,
                class: "custom-control-input dow_select",
            })
        DisabledDOW.days_of_week.set(
            "1", {
                label: "Mon",
                for: name_prefix + "dow_select_mon",
                value: 1,
                class: "custom-control-input dow_select",
            })
        DisabledDOW.days_of_week.set(
            "2", {
                label: "Tue",
                for: name_prefix + "dow_select_tue",
                value: 2,
                class: "custom-control-input dow_select",
            })
        DisabledDOW.days_of_week.set(
            "3", {
                label: "Wed",
                for: name_prefix + "dow_select_wed",
                value: 3,
                class: "custom-control-input dow_select",
            })
        DisabledDOW.days_of_week.set(
            "4", {
                label: "Thu",
                for: name_prefix + "dow_select_thu",
                value: 4,
                class: "custom-control-input dow_select",
            })
        DisabledDOW.days_of_week.set(
            "5", {
                label: "Fri",
                for: name_prefix + "dow_select_fri",
                value: 5,
                class: "custom-control-input dow_select",
            })
        DisabledDOW.days_of_week.set(
            "6", {
                label: "Sat",
                for: name_prefix + "dow_select_sat",
                value: 6,
                class: "custom-control-input dow_select",
            })
        
        let row = buildCheckBoxRow()
        let leadColumn = buildCheckBoxColumnLabel()
        let column = buildCheckBoxColumn()
        row.appendChild(leadColumn)
        row.appendChild(column)
        _this.appendChild(row)
    }
    
    const clear_selected = function () {
        $.each(Array.from(DisabledDOW.days_of_week.values()), function (k, day) {
            document.getElementById(day.for).checked = false
        })
    }
    
    const updateCheckBoxes = function () {
        clear_selected()
        $.each(DisabledDOW.disabled_dows, function (k, v) {
            
            let id = (typeof v === "number") ? v.toString() : v
            let day = DisabledDOW.days_of_week.get(id)
            
            //console.log("DisabledDOW.days_of_week", DisabledDOW.days_of_week)
            if (day) {
                if (day.for) {
                    document.getElementById(day.for).checked = true
                }
            }
            
        })
        
        if (DisabledDOW.disabled_dows.length === 7) {
            document.getElementById(name_prefix + "dow_select_all").checked = true
        }
    }
    
    const set = function (el, val) {
        let indexId, index
        switch (val) {
            case name_prefix + "dow_select_all":
                
                if (el.checked === true) {
                    DisabledDOW.disabled_dows = [0, 1, 2, 3, 4, 5, 6]
                } else {
                    DisabledDOW.disabled_dows = []
                }
                DisabledDOW.disabled_dows.sort()
                break
            case name_prefix + "dow_select_sun":
                indexId = 0
                index = DisabledDOW.disabled_dows.indexOf(indexId)
                if (el.checked === true) {
                    if (!index > -1) {
                        DisabledDOW.disabled_dows.push(indexId)
                    }
                } else {
                    if (index > -1) {
                        DisabledDOW.disabled_dows.splice(index, 1)
                    }
                }
                DisabledDOW.disabled_dows.sort()
                break
            case name_prefix + "dow_select_mon":
                indexId = 1
                index = DisabledDOW.disabled_dows.indexOf(indexId)
                if (el.checked === true) {
                    if (!index > -1) {
                        DisabledDOW.disabled_dows.push(indexId)
                    }
                } else {
                    if (index > -1) {
                        DisabledDOW.disabled_dows.splice(index, 1)
                    }
                }
                DisabledDOW.disabled_dows.sort()
                
                break
            case name_prefix + "dow_select_tue":
                indexId = 2
                index = DisabledDOW.disabled_dows.indexOf(indexId)
                if (el.checked === true) {
                    if (!index > -1) {
                        DisabledDOW.disabled_dows.push(indexId)
                    }
                } else {
                    if (index > -1) {
                        DisabledDOW.disabled_dows.splice(index, 1)
                    }
                }
                DisabledDOW.disabled_dows.sort()
                //console.log("dow_select_tue", DisabledDOW.disabled_dows)
                break
            case name_prefix + "dow_select_wed":
                indexId = 3
                index = DisabledDOW.disabled_dows.indexOf(indexId)
                if (el.checked === true) {
                    if (!index > -1) {
                        DisabledDOW.disabled_dows.push(indexId)
                    }
                } else {
                    if (index > -1) {
                        DisabledDOW.disabled_dows.splice(index, 1)
                    }
                }
                DisabledDOW.disabled_dows.sort()
                //console.log("dow_select_wed", DisabledDOW.disabled_dows)
                break
            case name_prefix + "dow_select_thu":
                indexId = 4
                index = DisabledDOW.disabled_dows.indexOf(indexId)
                if (el.checked === true) {
                    if (!index > -1) {
                        DisabledDOW.disabled_dows.push(indexId)
                    }
                } else {
                    if (index > -1) {
                        DisabledDOW.disabled_dows.splice(index, 1)
                    }
                }
                DisabledDOW.disabled_dows.sort()
                //console.log("dow_select_thu", DisabledDOW.disabled_dows)
                break
            case name_prefix + "dow_select_fri":
                indexId = 5
                index = DisabledDOW.disabled_dows.indexOf(indexId)
                if (el.checked === true) {
                    if (!index > -1) {
                        DisabledDOW.disabled_dows.push(indexId)
                    }
                } else {
                    if (index > -1) {
                        DisabledDOW.disabled_dows.splice(index, 1)
                    }
                }
                DisabledDOW.disabled_dows.sort()
                break
            case name_prefix + "dow_select_sat":
                indexId = 6
                index = DisabledDOW.disabled_dows.indexOf(indexId)
                if (el.checked === true) {
                    if (!index > -1) {
                        DisabledDOW.disabled_dows.push(indexId)
                    }
                } else {
                    if (index > -1) {
                        DisabledDOW.disabled_dows.splice(index, 1)
                    }
                }
                DisabledDOW.disabled_dows.sort()
                break
            default:
                break
        }
        
        updateCheckBoxes()
    }
    
    const value = function (val) {
        if (val) {
            //console.log("val", val)
        } else {
        
        }
    }
    
    const init = function (disabled_dow) {
        let disabled_days = []
        
        if (disabled_dow) {
            if (disabled_dow === [] || disabled_dow === null || disabled_dow === "") {
                DisabledDOW.disabled_dows = []
                return []
            }
            
            if (typeof disabled_dow === "string") {
                disabled_days = getListOfIds(disabled_dow.replace(/\s/g, ''))
            } else if (typeof disabled_dow === "object") {
                disabled_days = disabled_dow
            } else {
                disabled_days = disabled_dow
            }
            
        }
        
        DisabledDOW.disabled_dows = disabled_days
        updateCheckBoxes()
    }
    
    const DisabledDOW = {
        days_of_week: [],
        disabled_dows: [],
        el: null,
        value: function (val) {
            return value(val)
        },
        els: [],
        init: function (disabled_dow) {
            init(disabled_dow)
        },
    }
    
    buildForm()
    return DisabledDOW
}

const ColorScheme = (function () {
    "use strict"
    const _product_edit_season_id = document.getElementById("product_edit_season_id")
    const _season_id = document.getElementById("season_id")
    const _edit_scheme = document.getElementById("edit_scheme")
    const _form_edit_scheme = document.getElementById("form_edit_scheme")
    const _product_edit_season_id_name_display = document.getElementById("product_edit_season_id_name_display")
    const _button_close_edit_scheme = document.getElementById("button_close_edit_scheme")
    let season_toggle_items
    
    //
    $(_button_close_edit_scheme)
        .on("click", function () {
            $(_edit_scheme).hide()
        })
    
    $(_season_id)
        .on("click", function () {
            $(_edit_scheme).show()
        })
    
    //
    const reset_form = function () {
    
    }
    
    const load_form = function (scheme) {
        if (scheme) {
        
        }
    }
    
    const edit = function (el) {
        $(".color_scheme_block").removeClass("active")
        $(el).addClass("active")
    }
    
    const load_all = function (swatches) {
        ColorScheme.all = new Map()
        if (swatches) {
            $.each(swatches, function (k, swatch) {
                ColorScheme.all.set(parseInt(swatch.id), swatch)
            })
        }
    }
    
    const init = function (settings) {
        if (settings) {
            if (settings.swatches) {
                load_all(settings.swatches)
            }
        }
        
        season_toggle_items = document.querySelectorAll(".season_toggle_item")
        season_toggle_items.forEach(el => el.addEventListener("click", event => {
            let color_scheme_id = parseInt(el.dataset.colorschemeid)
            let scheme = ColorScheme.all.get(color_scheme_id)
            if (scheme) {
                load(scheme)
            }
        }))
    }
    
    const load = function (scheme) {
        if (scheme) {
            let background_color = (scheme.background_color) ? scheme.background_color : null
            let border_color = (scheme.border_color) ? scheme.border_color : null
            let color_scheme_id = parseInt(scheme.id)
            let text_color = (scheme.text_color) ? scheme.text_color : null
            let scheme_name = (scheme.name) ? scheme.name : null
            let elem = document.querySelector("#product_edit_season_id")
            
            $(_product_edit_season_id_name_display).text(`
                    ${scheme_name}
                `)
            
            $("a.dropdown-item.season_toggle_item").removeClass("active")
            $(`a#${color_scheme_id}`).addClass("active")
            elem.style.setProperty("color", text_color, 'important')
            elem.style.setProperty("background-color", background_color, 'important')
            elem.style.setProperty("border-color", border_color, 'important')
        }
    }
    
    const disable = function () {
        let elem = document.querySelector("#product_edit_season_id")
        $(elem).addClass("disabled")
    }
    
    const enable = function () {
        let elem = document.querySelector("#product_edit_season_id")
        $(elem).removeClass("disabled")
    }
    
    const change = function (el) {
        console.log("ColorScheme:change(el)", el)
    }
    
    return {
        all: new Map(),
        disable: function () {
            disable()
        },
        enable: function () {
            enable()
        },
        load: function (scheme) {
            load(scheme)
        },
        edit: function (el) {
            edit(el)
        },
        change: function (el) {
            change(el)
        },
        init: function (settings) {
            init(settings)
            disable()
        },
    }
})()

$.fn.ColorScheme = function (settings) {
    console.log("Test", Types.color_scheme)
    
}

const AirportTypes = (function () {
    "use strict"
    
    const base_url = "/airport_types"
    const _input_airport_types_id = document.getElementById("input_airport_types_id")
    const _input_airport_types_name = document.getElementById("input_airport_types_name")
    const _input_airport_types_sort_order = document.getElementById("input_airport_types_sort_order")
    const _input_airport_types_enabled = document.getElementById("input_airport_types_enabled")
    const _input_airport_types_date_created = document.getElementById("input_airport_types_date_created")
    const _input_airport_types_created_by = document.getElementById("input_airport_types_created_by")
    const _input_airport_types_date_modified = document.getElementById("input_airport_types_date_modified")
    const _input_airport_types_modified_by = document.getElementById("input_airport_types_modified_by")
    const _input_airport_types_note = document.getElementById("input_airport_types_note")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
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
        console.log(" -- AirportTypes -- ", {})
    }
    
    const set = function (airport_types) {
        let detail = _default_detail()
        if (airport_types) {
            detail.id = (airport_types.id) ? airport_types.id : null
            detail.name = (airport_types.name) ? airport_types.name : null
            detail.sort_order = (airport_types.sort_order) ? airport_types.sort_order : null
            detail.enabled = (airport_types.enabled) ? airport_types.enabled : 1
            detail.date_created = (airport_types.date_created) ? airport_types.date_created : formatDateMySQL()
            detail.created_by = (airport_types.created_by) ? airport_types.created_by : created_by
            detail.date_modified = (airport_types.date_modified) ? airport_types.date_modified : formatDateMySQL()
            detail.modified_by = (airport_types.modified_by) ? airport_types.modified_by : modified_by
            detail.note = (airport_types.note) ? airport_types.note : null
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
            AirportTypes.all.set("id", detail)
        })
        
        console.log(" AirportTypes.all", AirportTypes.all)
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

//AirportTypes.init()
//end object

const Category = (function () {
    "use strict"
    
    const base_url = "/category"
    const _modal_product_category_id = document.getElementById("modal_product_category_id")
    const _modal_new_product = document.getElementById("modal_new_product")
    const _modal_product_provider_company_id = document.getElementById("modal_product_provider_company_id")
    const _modal_product_provider_location_id = document.getElementById("modal_product_provider_location_id")
    const _modal_product_location_id = document.getElementById("modal_product_location_id")
    const _modal_product_vendor_company_id = document.getElementById("modal_product_vendor_company_id")
    const _modal_product_city = document.getElementById("modal_product_city")
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    $(_modal_product_category_id)
        .on("change", function () {
            let category_id = $(this).val()
            handle_product_change(category_id)
        })
    
    const _modal_product_name = document.getElementById("modal_product_name")
    const _modal_product_sku = document.getElementById("modal_product_sku")
    const _modal_product_provider_name = document.getElementById("modal_product_provider_name")
    const _modal_product_vendor_name = document.getElementById("modal_product_vendor_name")
    const _modal_product_provider_id = document.getElementById("modal_product_provider_id")
    const _modal_product_vendor_id = document.getElementById("modal_product_vendor_id")
    const _modal_product_rating_types_id = document.getElementById("modal_product_rating_types_id")
    const _modal_product_currency_id = document.getElementById("modal_product_currency_id")
    const _modal_product_pricing_strategies_types_id = document.getElementById("modal_product_pricing_strategies_types_id")
    const _modal_product_city_id = document.getElementById("modal_product_city_id")
    
    const handleCategoryError = function (msg) {
        toastr.error(msg)
    }
    
    const handle_product_change = function (category_id) {
        $("div[data-categoryid]").hide()
        if (!category_id) {
            return
        }
        
        category_id = parseInt(category_id)
        
        Product.resetNewProductDetails()
        Product.initAutoComplete(category_id)
        
        let category = Types.category.get(category_id)
        if (!category) {
            return
        }
        
        Product.attr1 = category.attribute_id
        Product.attr2 = null
        Product.attr3 = null
        Product.updateProductSKU()
        
        if (category_id && !isNaN(parseInt(category_id))) {
            
            switch (parseInt(category_id)) {
                case 1:
                    /**
                     * Hotels
                     */
                    _modal_product_pricing_strategies_types_id.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_city_id.value = ""
                    _modal_product_provider_id.value = ""
                    _modal_product_provider_company_id.value = ""
                    _modal_product_provider_location_id.value = ""
                    _modal_product_location_id.value = ""
                    _modal_product_vendor_id.value = ""
                    _modal_product_vendor_company_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_sku.value = ""
                    _modal_product_currency_id.value = ""
                    
                    //.disabled = true
                    //_modal_product_vendor_name.disabled = true
                    
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = false
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_sku.disabled = true
                    
                    $("div[data-categoryid='1']").show()
                    break
                case 2:
                    /**
                     * Flight
                     */
                    _modal_product_pricing_strategies_types_id.value = "2"
                    _modal_product_vendor_name.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_city_id.value = ""
                    _modal_product_provider_id.value = ""
                    _modal_product_provider_company_id.value = ""
                    _modal_product_provider_location_id.value = ""
                    _modal_product_location_id.value = ""
                    _modal_product_vendor_id.value = ""
                    _modal_product_vendor_company_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_sku.value = ""
                    _modal_product_currency_id.value = ""
                    
                    //_modal_product_provider_name.disabled = true
                    //_modal_product_vendor_name.disabled = true
                    
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = true
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = true
                    _modal_product_sku.disabled = true
                    
                    $("div[data-categoryid='2']").show()
                    break
                case 3:
                    /**
                     * Cars
                     */
                    _modal_product_pricing_strategies_types_id.value = "3"
                    _modal_product_vendor_name.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_city_id.value = ""
                    _modal_product_provider_id.value = ""
                    _modal_product_provider_company_id.value = ""
                    _modal_product_provider_location_id.value = ""
                    _modal_product_location_id.value = ""
                    _modal_product_vendor_id.value = ""
                    _modal_product_vendor_company_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_sku.value = ""
                    _modal_product_currency_id.value = ""
                    
                    //_modal_product_provider_name.disabled = true
                    //_modal_product_vendor_name.disabled = true
                    
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = true
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_sku.disabled = true
                    
                    $("div[data-categoryid='3']").show()
                    break
                case 4:
                    /**
                     * Rail
                     */
                    _modal_product_pricing_strategies_types_id.value = "2"
                    _modal_product_vendor_name.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_city_id.value = ""
                    _modal_product_provider_id.value = ""
                    _modal_product_provider_company_id.value = ""
                    _modal_product_provider_location_id.value = ""
                    _modal_product_location_id.value = ""
                    _modal_product_vendor_id.value = ""
                    _modal_product_vendor_company_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_sku.value = ""
                    _modal_product_currency_id.value = ""
                    
                    //_modal_product_provider_name.disabled = true
                    //_modal_product_vendor_name.disabled = true
                    
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = true
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_sku.disabled = true
                    
                    $("div[data-categoryid='4']").show()
                    break
                case 5:
                    /**
                     * Transport
                     */
                    _modal_product_pricing_strategies_types_id.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_city_id.value = ""
                    _modal_product_provider_id.value = ""
                    _modal_product_provider_company_id.value = ""
                    _modal_product_provider_location_id.value = ""
                    _modal_product_location_id.value = ""
                    _modal_product_vendor_id.value = ""
                    _modal_product_vendor_company_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_sku.value = ""
                    _modal_product_currency_id.value = ""
                    
                    //_modal_product_provider_name.disabled = true
                    //_modal_product_vendor_name.disabled = true
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = false
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_sku.disabled = true
                    
                    $("div[data-categoryid='5']").show()
                    break
                case 6:
                    /**
                     * Tours
                     */
                    _modal_product_vendor_name.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_city_id.value = ""
                    _modal_product_provider_id.value = ""
                    _modal_product_provider_company_id.value = ""
                    _modal_product_provider_location_id.value = ""
                    _modal_product_location_id.value = ""
                    _modal_product_vendor_id.value = ""
                    _modal_product_vendor_company_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_sku.value = ""
                    _modal_product_currency_id.value = ""
                    
                    //_modal_product_provider_name.disabled = true
                    //_modal_product_vendor_name.disabled = true
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = true
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_sku.disabled = true
                    
                    $("div[data-categoryid='6']").show()
                    break
                case 7:
                    /**
                     * Cruises
                     */
                    _modal_product_vendor_name.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_city_id.value = ""
                    _modal_product_provider_id.value = ""
                    _modal_product_provider_company_id.value = ""
                    _modal_product_provider_location_id.value = ""
                    _modal_product_location_id.value = ""
                    _modal_product_vendor_id.value = ""
                    _modal_product_vendor_company_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_sku.value = ""
                    _modal_product_currency_id.value = ""
                    
                    //_modal_product_provider_name.disabled = true
                    //_modal_product_vendor_name.disabled = true
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = false
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_sku.disabled = true
                    
                    $("div[data-categoryid='7']").show()
                    break
                case 8:
                    /**
                     * Packages
                     */
                    _modal_product_vendor_name.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_city_id.value = ""
                    _modal_product_provider_id.value = ""
                    _modal_product_provider_company_id.value = ""
                    _modal_product_provider_location_id.value = ""
                    _modal_product_location_id.value = ""
                    _modal_product_vendor_id.value = ""
                    _modal_product_vendor_company_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_sku.value = ""
                    _modal_product_currency_id.value = ""
                    
                    //_modal_product_provider_name.disabled = true
                    //_modal_product_vendor_name.disabled = true
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = false
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_sku.disabled = true
                    
                    $("div[data-categoryid='8']").show()
                    break
                case 9:
                    /**
                     * Other
                     */
                    _modal_product_vendor_name.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_city_id.value = ""
                    _modal_product_provider_id.value = ""
                    _modal_product_provider_company_id.value = ""
                    _modal_product_provider_location_id.value = ""
                    _modal_product_location_id.value = ""
                    _modal_product_vendor_id.value = ""
                    _modal_product_vendor_company_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_sku.value = ""
                    _modal_product_currency_id.value = ""
                    
                    //_modal_product_provider_name.disabled = true
                    //_modal_product_vendor_name.disabled = true
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = false
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_sku.disabled = true
                    $("div[data-categoryid='9']").show()
                    break
                default:
                    /**
                     * default
                     */
                    _modal_product_vendor_name.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_city_id.value = ""
                    _modal_product_provider_id.value = ""
                    _modal_product_provider_company_id.value = ""
                    _modal_product_provider_location_id.value = ""
                    _modal_product_location_id.value = ""
                    _modal_product_vendor_id.value = ""
                    _modal_product_vendor_company_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_sku.value = ""
                    
                    //_modal_product_provider_name.disabled = true
                    //_modal_product_vendor_name.disabled = true
                    _modal_product_city.disabled = true
                    _modal_product_rating_types_id.disabled = true
                    _modal_product_name.disabled = true
                    _modal_product_currency_id.disabled = true
                    _modal_product_pricing_strategies_types_id.disabled = true
                    _modal_product_sku.disabled = true
                    
                    _modal_product_sku.disabled = true
                    _modal_product_city.disabled = true
                    _modal_product_rating_types_id.disabled = true
                    
                    _modal_product_pricing_strategies_types_id.disabled = true
                    
                    break
            }
        }
    }
    
    const defaultDetail = function () {
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
        //console.log("Category.init()", settings)
        let categories = []
        if (settings) {
            if (settings.categories) {
                categories = settings.categories
            }
        }
        
        load_all(categories)
    }
    
    const set = function (category) {
        //console.log("Category.set()", category)
        let detail = defaultDetail()
        if (category) {
            detail.id = (category.id) ? category.id : null
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
            detail.seasons = (category.seasons) ? category.seasons : []
        }
        
        Category.detail = detail
        return detail
    }
    
    const load_all = function (categories) {
        //console.log("Category.load_all()", categories)
        Category.all = new Map()
        
        if (!categories) {
            return
        }
        
        $.each(categories, function (i, category) {
            let detail = set(category)
            //console.log("detail", detail)
            //console.log("detail.id", detail.id)
            Category.all.set(detail.id, detail)
        })
        
        //console.log(" Category.all", Category.all)
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
            init(settings)
        },
    }
    
})()

const ContactTypes = (function () {
    "use strict"
    
    const base_url = "/contact_types"
    const _input_contact_types_id = document.getElementById("input_contact_types_id")
    const _input_contact_types_name = document.getElementById("input_contact_types_name")
    const _input_contact_types_sort_order = document.getElementById("input_contact_types_sort_order")
    const _input_contact_types_enabled = document.getElementById("input_contact_types_enabled")
    const _input_contact_types_date_created = document.getElementById("input_contact_types_date_created")
    const _input_contact_types_created_by = document.getElementById("input_contact_types_created_by")
    const _input_contact_types_date_modified = document.getElementById("input_contact_types_date_modified")
    const _input_contact_types_modified_by = document.getElementById("input_contact_types_modified_by")
    const _input_contact_types_note = document.getElementById("input_contact_types_note")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
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
        console.log(" -- ContactTypes -- ", {})
    }
    
    const set = function (contact_types) {
        let detail = _default_detail()
        if (contact_types) {
            detail.id = (contact_types.id) ? contact_types.id : null
            detail.name = (contact_types.name) ? contact_types.name : null
            detail.sort_order = (contact_types.sort_order) ? contact_types.sort_order : null
            detail.enabled = (contact_types.enabled) ? contact_types.enabled : 1
            detail.date_created = (contact_types.date_created) ? contact_types.date_created : formatDateMySQL()
            detail.created_by = (contact_types.created_by) ? contact_types.created_by : created_by
            detail.date_modified = (contact_types.date_modified) ? contact_types.date_modified : formatDateMySQL()
            detail.modified_by = (contact_types.modified_by) ? contact_types.modified_by : modified_by
            detail.note = (contact_types.note) ? contact_types.note : null
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
            ContactTypes.all.set("id", detail)
        })
        
        console.log(" ContactTypes.all", ContactTypes.all)
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

//ContactTypes.init()
//end object

const Company = (function () {
    "use strict"
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
    const _company_edit_table_filters = document.getElementById("company_edit_table_filters")
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
            let detail = set_detail(tempCompany)
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
            reset_form()
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
                        add_to_company_list(company, function (data) {
                            if (data) {
                                if (data[0]) {
                                    let company = data[0]
                                    let detail = set_detail(company)
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
                Company.reset_form(true)
                if (_form_edit_provider) {
                    Provider.reset_form()
                }
                if (_form_edit_vendor) {
                    Vendor.reset_form()
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
                                Provider.reset_form()
                                Vendor.reset_form()
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
        }
    }
    
    const populate_form = function (company) {
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
    
    const handleCompanyError = function (msg) {
        toastr.error(msg)
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
                    reset_form(true)
                    populate_form(company)
                    Address.get_by_company_id(company.id)
                    Contact.getByCompanyId(company.id)
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
                                        tempCompany = company
                                        reset_form(true)
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
                console.log("error", e)
                handleCompanyError("Error Validating Company")
            }
        } else {
            handleCompanyError("Error Loading Company- Missing Data")
        }
    }
    
    const add_to_company_list = function (dataToSend, callback) {
        console.log("add_to_company_list()")
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
    
    const init = function (company) {
        let images = []
        if (company) {
            let detail = set_detail(company)
            images = (company.images) ? company.images : []
            populate_form(detail)
        }
        
        if (_form_edit_company) {
            validator_init(form_rules)
            validator = $(_form_edit_company).validate()
            initAutoComplete()
            if (_form_edit_company_block) {
                hide_form()
            }
        }
        
        $("#companyImages").imageManager({
            id: "company_image_manager",
            images: images,
        })
    }
    
    const validate_form = function () {
        return $(_form_edit_company).valid()
    }
    
    const reset_form = function (toggleFullClear) {
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
    
    const set_detail = function (company) {
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
            let detail = set_detail(reset_company)
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
    
    return {
        all: new Map(),
        build: function () {
            if (validate_form()) {
                return build()
            }
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
        add_to_company_list: function (dataToSend, callback) {
            return add_to_company_list(dataToSend, callback)
        },
        company_exists: function (name) {
            company_exists(name)
        },
        populate_form: function (company) {
            populate_form(company)
        },
        reset_form: function (toggleFullClear) {
            reset_form(toggleFullClear)
        },
        init: function (company) {
            init(company)
        },
    }
})()

const Contact = (function () {
    "use strict"
    //Path
    const base_url = "/contacts"
    //Buttons
    const _clear_contact_table = document.getElementById("clear_contact_table")
    const _button_add_contact_table = document.getElementById("button_add_contact_table")
    const _button_clear_form_edit_contact = document.getElementById("button_clear_form_edit_contact")
    const _button_close_edit_contact_form = document.getElementById("button_close_edit_contact_form")
    const _button_submit_form_edit_contact = document.getElementById("button_submit_form_edit_contact")
    //Fields
    const _company_id = document.getElementById("company_id")
    const _contact_company_id = document.getElementById("contact_company_id")
    const _contact_id = document.getElementById("contact_id")
    const _contact_name_first = document.getElementById("contact_name_first")
    const _contact_name_last = document.getElementById("contact_name_last")
    const _contact_phone = document.getElementById("contact_phone")
    const _contact_email = document.getElementById("contact_email")
    const _contact_enabled = document.getElementById("contact_enabled")
    const _contact_types_id = document.getElementById("contact_types_id")
    //Blocks
    const _card_edit_contact_form = document.getElementById("card_edit_contact_form")
    const _form_edit_contact = document.getElementById("form_edit_contact")
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
    let form_rules = {
        rules: {
            contact_name_first: {
                required: true,
            },
            contact_name_last: {
                required: true,
            },
            contact_phone: {
                required: true,
            },
            contact_email: {
                required: true,
            },
            contact_types_id: {
                required: true,
            },
        },
        messages: {
            contact_name_first: {
                required: "Field Required",
            },
            contact_name_last: {
                required: "Field Required",
            },
            contact_phone: {
                required: "Field Required",
            },
            contact_email: {
                required: "Field Required",
            },
            contact_types_id: {
                required: "Field Required",
            },
        },
    }
    let validator
    // ----
    
    /**
     * submit contact form button
     */
    $(_button_submit_form_edit_contact)
        .on("click", function () {
            if (validate_form()) {
                confirmDialog(`Would you like to update?`, (ans) => {
                    if (ans) {
                        save()
                    }
                })
            }
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
    
    $(_clear_contact_table)
        .on("click", function () {
            Contact.clearTable()
        })
    
    /**
     * validate contact form
     *
     * @returns {boolean}
     */
    const validate_form = function () {
        return $(_form_edit_contact).valid()
    }
    
    /**
     * build contact record
     *
     * @returns {{}|*}
     */
    const build = function () {
        
        let dataToSend = {
            name_first: _contact_name_first.value,
            name_last: _contact_name_last.value,
            email: _contact_email.value,
            phone: _contact_phone.value,
            contact_types_id: toNumbers(getListOfIds($(_contact_types_id).val())),
            enabled: (_contact_enabled.checked === true) ? 1 : 0,
            company_id: (!isNaN(_contact_company_id.value)) ? parseInt(_contact_company_id.value) : null,
            id: (!isNaN(_contact_id.value)) ? parseInt(_contact_id.value) : null,
        }
        return remove_nulls(dataToSend)
        
    }
    
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
     * save contact
     */
    const save = function () {
        let dataToSend = build()
        if (dataToSend) {
            update_contact(dataToSend, function (data) {
                console.log(data)
                if (data) {
                    if (data[0]) {
                        let contact = data[0]
                        let detail = set_detail(contact)
                        
                        if (Contact.all.get(detail.id)) {
                            $contact_table.updateRow(detail)
                        } else {
                            $contact_table.insertRow(detail)
                        }
                        
                        Contact.all.set(detail.id, detail)
                        
                        toastr.success("Contact Updated")
                    }
                    
                }
            })
        }
        
    }
    
    /**
     * update contact
     *
     * @param dataToSend
     * @param callback
     */
    const update_contact = function (dataToSend, callback) {
        let url = "/api/v1.0/contacts/update"
        if (dataToSend) {
            sendPostRequest(url, dataToSend, function (data, status, xhr) {
                if (data) {
                    return callback(data)
                } else {
                    return handleContactError("Oops: 1")
                }
            })
        }
    }
    
    /**
     * sets objects default values
     *
     * @returns {{note: null, country: {note: null, date_modified: *, date_created: *, name: null, modified_by: number, id: null, iso2: null, sort_order: number, created_by: number, currency_id: null, enabled: number, iso3: null}, medium_contact_formatted: null, city: {note: null, date_modified: *, province_id: null, date_created: *, name: null, modified_by: number, id: null, sort_order: number, created_by: number, enabled: number}, date_created: *, created_by: number, enabled: number, short_contact_formatted: null, long_contact_formatted: null, street_1: null, date_modified: *, province: {note: null, date_modified: *, date_created: *, name: null, modified_by: number, id: null, iso2: null, sort_order: number, created_by: number, country_id: null, enabled: number, iso3: null}, street_3: null, street_2: null, modified_by: number, id: null, postal_code: null}}
     * @private
     */
    const _default_detail = function () {
        return {
            id: null,
            company_id: null,
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
    const handleContactError = function (msg) {
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
        clear_form()
        _contact_company_id.value = _company_id.value
        if (contact) {
            console.log("contact", contact)
            _contact_id.value = validInt(contact.id)
            _contact_name_first.value = (contact.name_first) ? contact.name_first : null
            _contact_name_last.value = (contact.name_last) ? contact.name_last : null
            _contact_phone.value = (contact.phone) ? contact.phone : null
            _contact_email.value = (contact.email) ? contact.email : null
            _contact_enabled.checked = (contact.enabled) ? (contact.enabled === 1) : true
            $(_contact_types_id).val((contact.contact_types_id) ? contact.contact_types_id : [])
        }
        show_form()
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
     * sets detail for contact object
     *
     * @param contact
     * @returns {{note: null, country: {note: null, date_modified: *, date_created: *, name: null, modified_by: number, id: null, iso2: null, sort_order: number, created_by: number, currency_id: null, enabled: number, iso3: null}, medium_contact_formatted: null, city: {note: null, date_modified: *, province_id: null, date_created: *, name: null, modified_by: number, id: null, sort_order: number, created_by: number, enabled: number}, date_created: *, created_by: number, enabled: number, short_contact_formatted: null, long_contact_formatted: null, street_1: null, date_modified: *, province: {note: null, date_modified: *, date_created: *, name: null, modified_by: number, id: null, iso2: null, sort_order: number, created_by: number, country_id: null, enabled: number, iso3: null}, street_3: null, street_2: null, modified_by: number, id: null, postal_code: null}}
     */
    const set_detail = function (contact) {
        let detail = _default_detail()
        if (contact) {
            detail.id = (contact.id) ? contact.id : null
            detail.company_id = (contact.company_id) ? contact.company_id : null
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
        
        if (contacts[0]) {
            $contact_table.loadRow(contacts[0])
        }
        
        //console.log(" Contact.all", Contact.all)
    }
    
    /**
     * load selected contact
     *
     * @param contact
     */
    const navigate = function (contact) {
        if (contact) {
            populate_form(contact)
        }
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
        if (_form_edit_contact) {
            validator_init(form_rules)
            validator = $(_form_edit_contact).validate()
        }
        hide_form()
    }
    
    /**
     * clear and empty table
     */
    const clearTable = function () {
        let contacts = Array.from(Contact.all.values())
        $.each(contacts, function (k, contact) {
            $contact_table.deleteRow(contact)
        })
        Contact.all = new Map()
    }
    
    const fetchContactsByCompanyId = function (dataToSend, callback) {
        let url = "/api/v1.0/contacts"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleContactError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
                return handleContactError("Error Validating Company")
            }
        } else {
            return handleContactError("Error Loading Company- Missing Data")
        }
    }
    
    const populateTable = function (contacts) {
        if (_table_contact) {
            Contact.all = new Map()
            let loadContact
            let count = 0
            $.each(contacts, function (i, contact) {
                if (count === 0) {
                    loadContact = contact
                }
                contact.contact_types_id = getListOfIds(contact.contact_types_id)
                Contact.all.set(contact.id, contact)
                $contact_table.insertRow(contact)
                count++
            })
            
            if (_table_contact) {
                if (loadContact) {
                    $contact_table.loadRow(loadContact)
                }
                
                $contact_table.clearSelectedRows()
            }
        }
    }
    
    const getByCompanyId = function (company_id) {
        if (company_id) {
            fetchContactsByCompanyId({ company_id: company_id }, function (data) {
                if (data) {
                    let contacts = data
                    clearTable()
                    populateTable(contacts)
                }
            })
        }
    }
    
    /**
     * globals
     */
    return {
        validator: null,
        detail: {},
        all: new Map(),
        getByCompanyId: function (company_id) {
            getByCompanyId(company_id)
        },
        clearTable: function () {
            clearTable()
        },
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
    /** Tabs */
    const _panel_tab_contact = document.getElementById("panel_tab_contact")
    const _button_add_vendor_page_heading = document.getElementById("button_add_vendor_page_heading")
    const _vendor_index_table_add_button = document.getElementById("vendor_index_table_add_button")
    const _vendor_company_id = document.getElementById("vendor_company_id")
    const _form_edit_vendor = document.getElementById("form_edit_vendor")
    const _vendor_name = document.getElementById("vendor_name")
    const _vendor_id = document.getElementById("vendor_id")
    const _vendor_show_online = document.getElementById("vendor_show_online")
    const _vendor_show_sales = document.getElementById("vendor_show_sales")
    const _vendor_show_ops = document.getElementById("vendor_show_ops")
    const _vendor_is_provider = document.getElementById("vendor_is_provider")
    const _vendor_sku = document.getElementById("vendor_sku")
    const _vendor_enabled = document.getElementById("vendor_enabled")
    const _provider_edit = document.getElementById("provider_edit")
    const _provider_name = document.getElementById("provider_name")
    const _provider_company_id = document.getElementById("provider_company_id")
    const _company_id = document.getElementById("company_id")
    const _button_submit_form_edit_vendor = document.getElementById("button_submit_form_edit_vendor")
    const _table_vendor_index = document.getElementById("table_vendor_index")
    const _form_vendor_add = document.getElementById("form_vendor_add")
    const _modal_button_submit_add_vendor = document.getElementById("modal_button_submit_add_vendor")
    const _modal_button_cancel_add_vendor = document.getElementById("modal_button_cancel_add_vendor")
    const _modal_new_vendor = document.getElementById("modal_new_vendor")
    const _vendor_modal_vendor_name = document.getElementById("vendor_modal_vendor_name")
    const _button_save_vendor = document.getElementById("button_save_vendor")
    const _company_name = document.getElementById("company_name")
    const _form_product_add = document.getElementById("form_product_add")
    const _modal_product_vendor_id = document.getElementById("modal_product_vendor_id")
    const _modal_product_vendor_name = document.getElementById("modal_product_vendor_name")
    const _modal_product_provider_vendor_match = document.getElementById("modal_product_provider_vendor_match")
    const _modal_product_provider_company_id = document.getElementById("modal_product_provider_company_id")
    const _modal_product_vendor_company_id = document.getElementById("modal_product_vendor_company_id")
    //
    let new_vendor_validator, validator
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let globalSelectedVendor = false
    let form_rules = {
        rules: {
            vendor_name: {
                required: true,
            },
        },
        messages: {
            vendor_name: {
                required: "Field Required",
            },
        },
    }
    let add_modal_form_rules = {
        rules: {
            vendor_modal_vendor_name: {
                required: true,
            },
        },
        messages: {
            vendor_modal_vendor_name: {
                required: "Field Required",
            },
        },
    }
    let $index_table = $(_table_vendor_index)
    
    // ----
    
    $(_button_save_vendor)
        .on("click", function () {
            let company = Company.build()
            Console.log("_button_save_vendor", company)
            update()
        })
    
    $(_button_add_vendor_page_heading)
        .on("click", function () {
            load_new_modal()
        })
    
    $(_vendor_index_table_add_button)
        .on("click", function () {
            load_new_modal()
        })
    
    $(_modal_button_cancel_add_vendor)
        .on("click", function () {
            hide_new_modal()
        })
    
    $(_modal_button_submit_add_vendor)
        .on("click", function () {
            if (validate_new_modal_form()) {
                let dataToSend = {
                    name: _vendor_modal_vendor_name.value,
                }
                confirmDialog(`Vendor: ${name} will be added`, (ans) => {
                    if (ans) {
                        add(dataToSend)
                    }
                })
            }
        })
    
    $(_vendor_modal_vendor_name)
        .on("change", function () {
            setTimeout(function () {
                let vendor_name = _vendor_modal_vendor_name.value
                
                if (globalSelectedVendor === false) {
                    if (vendor_name === "") {
                        _vendor_modal_vendor_name.value = ""
                        globalSelectedVendor = false
                    } else {
                        vendor_exists(vendor_name)
                    }
                }
            }, 200)
        })
        .on("search", function () {
        
        })
        .on("click", function (e) {
            if ($(this).attr("readonly") === "readonly") {
                e.preventDefault()
            } else {
                $(this).select()
            }
        })
        .autocomplete({
            serviceUrl: "/api/v1.0/autocomplete/vendors",
            minChars: 2,
            cache: false,
            dataType: "json",
            triggerSelectOnValidInput: false,
            paramName: "st",
            onSelect: function (suggestion) {
                if (!suggestion.data) {
                    return
                }
                let vendor = suggestion.data
                confirmDialog(`Vendor ${vendor.name} ALREADY exists. Would you like to load this record to edit?`, (ans) => {
                    if (ans) {
                        window.location.replace(base_url + "/" + vendor.id)
                    } else {
                        reset_modal()
                    }
                })
            },
        })
    
    $(_modal_product_vendor_name)
        .on("change", function () {
            setTimeout(function () {
                let vendor_name = _modal_product_vendor_name.value
                globalSelectedVendor = false
                
                if (vendor_name === "") {
                    _modal_product_vendor_id.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_vendor_company_id.value = ""
                    Product.attr3 = null
                    Product.updateProductSKU()
                    globalSelectedVendor = false
                } else {
                    vendor_exists(vendor_name)
                }
                
            }, 200)
        })
        .on("search", function () {
            _modal_product_vendor_id.value = ""
            _modal_product_vendor_name.value = ""
            _modal_product_vendor_company_id.value = ""
            _modal_product_provider_vendor_match.checked = false
            Product.attr3 = null
            Product.updateProductSKU()
            globalSelectedVendor = false
        })
        .on("click", function (e) {
            if ($(this).attr("readonly") === "readonly") {
                e.preventDefault()
            } else {
                $(this).select()
            }
        })
        .autocomplete({
            serviceUrl: "/api/v1.0/autocomplete/vendors",
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
                let vendor = suggestion.data
                if (_form_product_add) {
                    let provider_company_id = (isNaN(parseInt(_modal_product_provider_company_id.value))) ? null : parseInt(_modal_product_provider_company_id.value)
                    _modal_product_vendor_id.value = suggestion.data.id
                    _modal_product_vendor_name.value = suggestion.data.name
                    _modal_product_vendor_company_id.value = suggestion.data.company_id
                    Product.attr3 = suggestion.data.sku
                    Product.updateProductSKU()
                    _modal_product_provider_vendor_match.checked = parseInt(suggestion.data.company_id) === provider_company_id
                }
                globalSelectedVendor = true
                
            },
        })
    
    $(_company_id)
        .on("change", function () {
            $(_vendor_company_id).val(_company_id.value)
        })
    
    $(_button_submit_form_edit_vendor)
        .on("click", function () {
            update()
        })
    
    const initAutoComplete = function () {
        if (_vendor_name) {
            $(_vendor_name)
                .on("change", function () {
                    setTimeout(function () {
                        let vendor_name = _vendor_name.value
                        globalSelectedVendor = false
                        if (vendor_name === "") {
                            _vendor_name.value = ""
                            _vendor_company_id.value = ""
                            
                        } else {
                            vendor_exists(vendor_name)
                        }
                        
                    }, 200)
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
                        if (!suggestion.data) {
                            return
                        }
                        //let vendor = (suggestion.data.vendor_detail) ? suggestion.data.vendor_detail : {}
                        //let company = (suggestion.data.company_detail) ? suggestion.data.company_detail : {}
                        //let contacts = []
                        //let addresses = []
                        //log("vendor", vendor)
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
    
    const vendor_exists = function (name) {
        Console.log("vendor_exists()", name)
        
        if (name && name !== "") {
            let dataToSend = {
                name: name,
            }
            
            Console.log("dataToSend", dataToSend)
            
            fetch_vendor_by_name(dataToSend, function (data) {
                Console.log("fetch_vendor_by_name()", data)
                let vendor, company
                
                if (data && data.length > 0) {
                    vendor = data
                    if (data.length > 0) {
                        if (data[0]) {
                            vendor = data[0]
                        }
                    }
                    
                } else {
                    Console.log("Vendor Does Not Exist")
                    
                    _modal_product_vendor_id.value = ""
                    _modal_product_vendor_company_id.value = ""
                    
                    Product.attr3 = null
                    Product.updateProductSKU()
                    
                    let name = _modal_product_vendor_name.value
                    if (name !== "") {
                        confirmDialog(`Vendor ${name} does not exists. Would you like to create this`, (ans) => {
                            if (ans) {
                                let dataToSend = {
                                    name: _modal_product_vendor_name.value,
                                }
                                add(dataToSend)
                            } else {
                                _modal_product_vendor_name.value = ""
                            }
                        })
                    }
                }
                
                if (vendor) {
                    Console.log("Vendor Exists", vendor)
                    
                    if (_vendor_modal_vendor_name) {
                        confirmDialog(`Vendor ${vendor.name} ALREADY exists. Would you like to load this record to edit?`, (ans) => {
                            if (ans) {
                                window.location.replace(base_url + "/" + vendor.id)
                            }
                        })
                    }
                    
                    if (_form_product_add) {
                        _modal_product_vendor_id.value = (vendor.id) ? vendor.id : ""
                        _modal_product_vendor_company_id.value = (vendor.company_id) ? vendor.company_id : ""
                        Product.attr3 = (vendor.sku) ? vendor.sku : null
                        Product.updateProductSKU()
                    }
                    
                }
                
            })
            
        }
        
    }
    
    const hide_new_modal = function () {
        $(_modal_new_vendor).modal("hide")
    }
    
    const load_new_modal = function () {
        $(_vendor_modal_vendor_name).val("")
        $(_modal_new_vendor).modal("show")
    }
    
    const validate_new_modal_form = function () {
        if (_form_vendor_add) {
            return $(_form_vendor_add).valid()
        }
        return false
    }
    
    const add = function (vendor) {
        if (vendor) {
            newVendor(vendor, function (data) {
                if (data) {
                    Console.log("data 1", data)
                    if (data[0]) {
                        Console.log("data[0] 1", data[0])
                        let details = data[0]
                        
                        if (details.id) {
                            if (_form_product_add) {
                                Console.log("_form_product_add: details", details)
                                _modal_product_vendor_company_id.value = (details.company_id) ? details.company_id : ""
                                _modal_product_vendor_id.value = (details.id) ? details.id : ""
                                _modal_product_provider_vendor_match.checked = (_modal_product_vendor_company_id.value === _modal_product_provider_company_id.value)
                                Product.attr3 = (details.sku) ? details.sku : null
                                Product.updateProductSKU()
                            }
                            
                            if (_form_vendor_add) {
                                window.location.replace("/vendors/" + details.id)
                            }
                        } else {
                            Console.log("details 1", details)
                        }
                    } else {
                        Console.log("details 2", data)
                    }
                } else {
                    Console.log("details 3", vendor)
                }
            })
        }
    }
    
    /**
     * update vendor record
     *
     * @param dataToSend
     * @param callback
     */
    const newVendor = function (dataToSend, callback) {
        let url = "/api/v1.0/vendors/add"
        
        if (dataToSend) {
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handle_vendor_error("Oops: 1")
                    }
                })
            } catch (e) {
                Console.log("error", e)
            }
        }
    }
    
    const reset_modal = function () {
        _vendor_modal_vendor_name.value = ""
    }
    
    /**
     * build vendor index table
     */
    const build_index_table = function () {
        $index_table = $(_table_vendor_index).table({
            table_type: "display_list",
            data: Vendor.all,
            columnDefs: [
                {
                    title: "Id",
                    targets: 0,
                    data: "id",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "Name",
                    targets: 1,
                    data: "name",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "SKU",
                    targets: 2,
                    data: "sku",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
            ],
            rowClick: Vendor.navigate,
        })
    }
    
    /**
     * handel errors
     *
     * @param msg
     */
    const handle_vendor_error = function (msg) {
        toastr.error(msg)
    }
    
    const build = function () {
        return remove_nulls({
            id: (!isNaN(parseInt(_vendor_id.value))) ? parseInt(_vendor_id.value) : null,
            company_id: (!isNaN(parseInt(_vendor_company_id.value))) ? parseInt(_vendor_company_id.value) : null,
            name: (_vendor_name.value !== "") ? _vendor_name.value : null,
            status_id: 10,
            enabled: (_vendor_enabled.checked) ? 1 : 0,
            show_online: (_vendor_show_online.checked === true) ? 1 : 0,
            show_sales: (_vendor_show_sales.checked === true) ? 1 : 0,
            show_ops: (_vendor_show_ops.checked === true) ? 1 : 0,
            is_provider: (_vendor_is_provider.checked === true) ? 1 : 0,
            sku: _vendor_sku.value,
        })
    }
    
    /**
     * fetch vendor by name
     *
     * @param dataToSend
     * @param callback
     */
    const fetch_vendor_by_name = function (dataToSend, callback) {
        let url = "/api/v1.0/vendors/validate"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handle_vendor_error("Oops: 1")
                    }
                })
            } catch (e) {
                Console.log("error", e)
                return handle_vendor_error("Error Validating Company")
            }
        } else {
            return handle_vendor_error("Error Loading Company- Missing Data")
        }
    }
    
    const _default_detail = function () {
        return {
            id: null,
            name: null,
            company_id: null,
            status_id: 1,
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
            company: {},
            addresses: [],
            contacts: [],
        }
    }
    
    const set_detail = function (vendor) {
        
        let detail = _default_detail()
        let vendor_detail, company_detail = {}
        let contacts, addresses = []
        
        if (vendor) {
            
            if (vendor.vendor_detail) {
                vendor_detail = vendor.vendor_detail
                detail.id = (vendor_detail.id) ? vendor_detail.id : null
                detail.status_id = (vendor_detail.status_id) ? vendor_detail.status_id : null
                detail.show_online = vendor_detail.show_online
                detail.show_sales = vendor_detail.show_sales
                detail.show_ops = vendor_detail.show_ops
                detail.is_provider = vendor_detail.is_provider
                detail.sku = (vendor_detail.sku) ? vendor_detail.sku : null
                detail.enabled = vendor_detail.enabled
                detail.date_created = (vendor_detail.date_created) ? vendor_detail.date_created : formatDateMySQL()
                detail.created_by = (vendor_detail.created_by) ? vendor_detail.created_by : created_by
                detail.date_modified = (vendor_detail.date_modified) ? vendor_detail.date_modified : formatDateMySQL()
                detail.modified_by = (vendor_detail.modified_by) ? vendor_detail.modified_by : modified_by
                detail.note = (vendor_detail.note) ? vendor_detail.note : null
            }
            
            if (vendor.company_detail) {
                company_detail = vendor.company_detail
                detail.company_id = (company_detail.id) ? company_detail.id : null
            }
            
            if (vendor.contacts) {
                contacts = vendor.contacts
            }
            
            if (vendor.addresses) {
                addresses = vendor.addresses
            }
        }
        
        Vendor.detail = detail
        return detail
    }
    
    const set = function (vendor) {
        
        let detail = _default_detail()
        detail.id = (vendor.id) ? vendor.id : null
        detail.name = (vendor.name) ? vendor.name : null
        detail.status_id = (vendor.status_id) ? vendor.status_id : null
        detail.show_online = vendor.show_online
        detail.show_sales = vendor.show_sales
        detail.show_ops = vendor.show_ops
        detail.is_provider = vendor.is_provider
        detail.sku = (vendor.sku) ? vendor.sku : null
        detail.enabled = vendor.enabled
        detail.date_created = (vendor.date_created) ? vendor.date_created : formatDateMySQL()
        detail.created_by = (vendor.created_by) ? vendor.created_by : created_by
        detail.date_modified = (vendor.date_modified) ? vendor.date_modified : formatDateMySQL()
        detail.modified_by = (vendor.modified_by) ? vendor.modified_by : modified_by
        detail.note = (vendor.note) ? vendor.note : null
        detail.addresses = (vendor.company.addresses) ? vendor.company.addresses : []
        detail.contacts = (vendor.company.contacts) ? vendor.company.contacts : []
        detail.company = (vendor.company) ? vendor.company : {}
        
        Vendor.detail = detail
        return detail
    }
    
    /**
     * update provider record
     *
     * @param dataToSend
     * @param callback
     */
    const updateVendor = function (dataToSend, callback) {
        Console.log("updateVendor()", dataToSend)
        let url = "/api/v1.0/vendors/update"
        
        if (dataToSend) {
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    Console.log("data", data)
                    if (data) {
                        return callback(data)
                    } else {
                        return handle_vendor_error("Oops: 1")
                    }
                })
            } catch (e) {
                Console.log("error", e)
            }
        }
    }
    
    const update = function () {
        let vendor_detail = Vendor.build()
        
        vendor_detail.company_detail = Company.build()
        if (vendor_detail) {
            confirmDialog(`Would you like to update?`, (ans) => {
                if (ans) {
                    Console.log("vendor_detail", vendor_detail)
                    
                    updateVendor(vendor_detail, function (data) {
                        Console.log("data", data)
                        if (data) {
                            Console.log("data 1", data)
                            if (data[0]) {
                                Console.log("data[0] 1", data[0])
                                let details = data[0]
                                if (details.id) {
                                    if (_vendor_id.value === "" || isNaN(parseInt(_vendor_id.value))) {
                                        window.location.replace(base_url + "/" + details.id)
                                    } else {
                                        let name = _company_name.value
                                        toastr.success(`Vendor ${name} has been updated.`)
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
                
            })
        }
    }
    
    /**
     * save provider object
     *
     * @param vendor
     */
    const save = function (vendor) {
        
        if (vendor) {
            updateVendor(vendor, function (data) {
                if (data) {
                    Console.log("data", data)
                    Console.log(data.length)
                    if (data[0]) {
                        Console.log("data[0]", data[0])
                        let details = data[0]
                        if (details.id) {
                            Console.log("details.id", details.id)
                            Console.log("_vendor_id.value", _vendor_id.value)
                            if (_vendor_id.value === "" || isNaN(parseInt(_vendor_id.value))) {
                                window.location.replace(base_url + "/" + details.id)
                            } else {
                                let name = _company_name.value
                                toastr.success(`Vendor ${name} has been updated.`)
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
    
    const validate_all = function (params) {
        let tabs = $("#vendor_edit_tabs > li.nav-item > a.nav-link")
        let panels = $("div.tab-pane")
        let company_detail = Company.build()
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
        if (!company_detail || !vendor_detail || !addresses || !contacts) {
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
        
        confirmDialog(`Would you like to update?`, (ans) => {
            if (ans) {
                
                save({
                    "company_detail": company_detail,
                    "vendor_detail": vendor_detail,
                    "addresses": addresses,
                    "contacts": contacts,
                })
            }
            
        })
    }
    
    const get = function (id) {
        let data_to_send = {}
        if (id) {
            data_to_send.id = id
        }
        
    }
    
    const reset_form = function () {
        _vendor_name.value = ""
        _vendor_id.value = ""
        _vendor_company_id.value = ""
        _vendor_show_online.checked = true
        _vendor_show_sales.checked = true
        _vendor_show_ops.checked = true
        _vendor_is_provider.checked = true
        _vendor_sku.value = ""
        _vendor_enabled.checked = true
    }
    
    const populate_form = function (vendor) {
        let detail = set_detail(vendor)
        _vendor_name.value = (detail.company.name) ? detail.company.name : ""
        _vendor_company_id.value = (detail.company.id) ? detail.company.id : ""
        
        if (_provider_edit) {
            if (_provider_name) {
                _vendor_name.value = _provider_name.value
            }
            
            if (_provider_company_id) {
                _vendor_company_id.value = _provider_company_id.value
            }
        }
        
        _vendor_id.value = (detail.id) ? detail.id : ""
        _vendor_sku.value = (detail.sku) ? detail.sku : ""
        _vendor_show_online.checked = (detail.show_online === 1)
        _vendor_show_sales.checked = (detail.show_sales === 1)
        _vendor_show_ops.checked = (detail.show_ops === 1)
        _vendor_is_provider.checked = (detail.is_provider === 1)
        _vendor_enabled.checked = (detail.enabled === 1)
    }
    
    const load_all = function (vendors) {
        Vendor.all = new Map()
        if (vendors) {
            $.each(vendors, function (i, vendor) {
                let detail = set(vendor)
                $index_table.insertRow(detail)
                Vendor.all.set(detail.id, detail)
            })
        }
        
        Console.log(" Vendor.all", Vendor.all)
    }
    
    const validate_form = function () {
        return $(_form_edit_vendor).valid()
    }
    
    const init = function (settings) {
        let company = {}
        if (settings) {
            if (settings.company) {
                company = settings.company
            }
        }
        
        if (_form_edit_vendor) {
            if (_vendor_name) {
                _vendor_name.value = (settings.name) ? settings.name : ""
                initAutoComplete()
            }
            if (_vendor_id) {
                _vendor_id.value = (settings.id) ? settings.id : ""
            }
            if (_vendor_company_id) {
                _vendor_company_id.value = (company.id) ? company.id : ""
            }
            if (_vendor_sku) {
                _vendor_sku.value = (settings.sku) ? settings.sku : ""
            }
            if (_vendor_enabled) {
                _vendor_enabled.checked = (settings.enabled) ? (settings.enabled === 1) : true
            }
            if (_vendor_is_provider) {
                _vendor_is_provider.checked = (settings.is_provider === 1)
            }
            if (_vendor_show_online) {
                _vendor_show_online.checked = (settings.show_online === 1)
            }
            if (_vendor_show_ops) {
                _vendor_show_ops.checked = (settings.show_ops === 1)
            }
            if (_vendor_show_sales) {
                _vendor_show_sales.checked = (settings.show_sales === 1)
            }
            validator_init(form_rules)
            validator = $(_form_edit_vendor).validate()
        }
    }
    
    const navigate = function (vendor) {
        if (vendor && vendor.id) {
            window.location.replace(base_url + "/" + vendor.id)
        }
    }
    
    /**
     * disables fields unused from provider edit
     */
    const setProvider = function () {
        Console.log("Set Provider")
        if (_provider_edit) {
            _vendor_is_provider.checked = true
            $(_vendor_is_provider).attr("readonly", "true")
            _vendor_is_provider.disabled = true
            $(_vendor_name).attr("readonly", "true")
            $(_vendor_id).attr("readonly", "true")
            $(_vendor_sku).attr("readonly", "true")
            $(_vendor_is_provider).attr("readonly", "true")
        }
    }
    
    /**
     * initialize vendor index page
     *
     * @param settings
     */
    const index = function (settings) {
        if (_form_vendor_add) {
            validator_init(add_modal_form_rules)
            new_vendor_validator = $(_form_vendor_add).validate()
        }
        
        build_index_table()
        
        if (settings) {
            if (settings.vendors) {
                load_all(settings.vendors)
            }
        }
        
    }
    
    const setVendor = function () {
        if (_vendor_name) {
            $(_vendor_is_provider).attr("readonly", true)
            _vendor_is_provider.disabled = true
            $(_vendor_name).attr("readonly", true)
            $(_vendor_id).attr("readonly", true)
            $(_vendor_sku).attr("readonly", true)
            $(_vendor_is_provider).attr("readonly", true)
        }
    }
    
    const edit = function (settings) {
        let addresses = []
        let contacts = []
        let company = {}
        let vendor = {}
        if (settings) {
            if (settings.vendor_detail) {
                vendor = set(settings.vendor_detail)
                addresses = (settings.address_detail) ? settings.address_detail : []
                contacts = (settings.contact_detail) ? settings.contact_detail : []
                company = (settings.company_detail) ? settings.company_detail : {}
            }
        }
        
        $(_panel_tab_contact).removeClass("disabled")
        
        Vendor.init(vendor)
        Address.init(addresses)
        Contact.init(contacts)
        Company.init(company)
        setVendor()
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        newVendor: function (dataToSend, callback) {
            return newVendor(dataToSend, callback)
        },
        index: function (settings) {
            index(settings)
        },
        setProvider: function () {
            setProvider()
        },
        get: function (params) {
            get(params)
        },
        load_all: function (params) {
            load_all(params)
        },
        reset_form: function () {
            reset_form()
        },
        save: function (params) {
            save(params)
        },
        init: function (settings) {
            init(settings)
        },
        build: function () {
            if (validate_form()) {
                return build()
            }
        },
        navigate: function (vendor) {
            navigate(vendor)
        },
        edit: function (settings) {
            edit(settings)
        },
        setVendor: function () {
            setVendor()
        },
    }
    
})()

const MessageTypes = (function () {
    "use strict"
    
    const base_url = "/message_types"
    const _input_message_types_id = document.getElementById("input_message_types_id")
    const _input_message_types_name = document.getElementById("input_message_types_name")
    const _input_message_types_icon = document.getElementById("input_message_types_icon")
    const _input_message_types_sort_order = document.getElementById("input_message_types_sort_order")
    const _input_message_types_enabled = document.getElementById("input_message_types_enabled")
    const _input_message_types_date_created = document.getElementById("input_message_types_date_created")
    const _input_message_types_created_by = document.getElementById("input_message_types_created_by")
    const _input_message_types_date_modified = document.getElementById("input_message_types_date_modified")
    const _input_message_types_modified_by = document.getElementById("input_message_types_modified_by")
    const _input_message_types_note = document.getElementById("input_message_types_note")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
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
        Console.log(" -- MessageTypes -- ", {})
    }
    
    const set = function (message_types) {
        let detail = _default_detail()
        if (message_types) {
            detail.id = (message_types.id) ? message_types.id : null
            detail.name = (message_types.name) ? message_types.name : null
            detail.icon = (message_types.icon) ? message_types.icon : null
            detail.sort_order = (message_types.sort_order) ? message_types.sort_order : null
            detail.enabled = (message_types.enabled) ? message_types.enabled : 1
            detail.date_created = (message_types.date_created) ? message_types.date_created : formatDateMySQL()
            detail.created_by = (message_types.created_by) ? message_types.created_by : created_by
            detail.date_modified = (message_types.date_modified) ? message_types.date_modified : formatDateMySQL()
            detail.modified_by = (message_types.modified_by) ? message_types.modified_by : modified_by
            detail.note = (message_types.note) ? message_types.note : null
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
            MessageTypes.all.set("id", detail)
        })
        
        Console.log(" MessageTypes.all", MessageTypes.all)
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

//MessageTypes.init()
//end object

const Pricing = (function () {
    "use strict"
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    const _pricing_strategy_unit_id = document.getElementById("pricing_strategy_unit_id")
    const _pricing_strategy_season_id = document.getElementById("pricing_strategy_season_id")
    const _pricing_strategy_profile_id = document.getElementById("pricing_strategy_profile_id")
    const _pricing_strategy_types_id = document.getElementById("pricing_strategy_types_id")
    const _calendar_filter_profile_id = document.getElementById("calendar_filter_profile_id")
    
    /**
     * pricing strategy types id
     */
    $(_pricing_strategy_types_id)
        .on("change", function () {
            PricingWorksheet.pricingWorksheet()
            //console.log("Pricing.pricing_strategy_types_id:change()", _pricing_strategy_types_id.value)
        })
    
    /**
     * initialize pricing object
     *
     * @param settings
     */
    const init = function (settings) {
        resetForm()
        let pricings = []
        let pricing_detail
        if (settings) {
            pricing_detail = settings
            if (settings.pricings) {
                pricings = settings.pricings
            }
        }
        
        if (pricing_detail.pricing_strategy_types_id) {
            _pricing_strategy_types_id.value = pricing_detail.pricing_strategy_types_id
            PricingWorksheet.pricingStrategyId = parseInt(pricing_detail.pricing_strategy_types_id)
        }
        loadAll(pricings)
    }
    
    /**
     * load all pricing templates
     *
     * @param pricing_details
     */
    const loadAll = function (pricing_details) {
        //console.log("Pricing.loadAll()", pricing_details)
        Pricing.all = new Map()
        if (!pricing_details) {
            pricing_details = []
        }
        
        $.each(pricing_details, function (k, matrix) {
            //console.log("matrix", matrix)
            // ----
            let pricings = matrix.pricings
            let pricingCode = matrix.pricing_code
            let matrixCode = matrix.matrix_code
            let matrixDetails = Matrix.all.get(matrixCode)
            let detail = set(matrix)
            Pricing.all.set(pricingCode, detail)
            /*
            $.each(pricings, function (k, pricing) {
                //console.log("pricing", pricing)
                // ----
                
                let pricing_code = (pricing.code) ? pricing.code : null
                
                if (pricing_code) {
                    Pricing.all.set(pricing_code, pricing)
                    let details = set(pricing)
                    //console.log("details", details)
                    if (matrixDetails) {
                        if (!matrixDetails["pricings"]) {
                            matrixDetails["pricings"] = new Map()
                        }
                        
                        matrixDetails["pricings"].set(pricing_code, pricing)
                    }
                }
                
            })
            //*/
        })
        
        //console.log("Pricings.all", Pricing.all)
    }
    
    /**
     * load Season Dropdown
     */
    const loadSeasonDropdown = function () {
        let seasons = (Season && Season.all) ? Array.from(Season.all.values()) : []
        let options = ""
        
        $.each(seasons, function (k, season) {
            let name = season.name
            let id = season.id
            options += `<option value="${id}">${name}</option>`
        })
        
        $(_pricing_strategy_season_id).empty()
        $(_pricing_strategy_season_id).html(options)
    }
    
    /**
     * load Profile Dropdown
     */
    const loadProfileDropdown = function () {
        let profiles = (InventoryProfile && InventoryProfile.all) ? Array.from(InventoryProfile.all.values()) : []
        let options = "<option value='' disabled readonly selected>-- Profiles --</option>"
        
        $.each(profiles, function (k, profile) {
            let name = profile.name
            let id = profile.id
            options += `<option value="${id}">${name}</option>`
        })
        
        $(_calendar_filter_profile_id).empty()
        $(_calendar_filter_profile_id).html(options)
    }
    
    /**
     * load unit dropdown
     */
    const loadUnitDropdown = function () {
        let units = (Unit && Unit.all) ? Array.from(Unit.all.values()) : []
        let options = ""
        
        $.each(units, function (k, unit) {
            let name = unit.name
            let id = unit.id
            options += `<option value="${id}">${name}</option>`
        })
        
        $(_pricing_strategy_unit_id).empty()
        $(_pricing_strategy_unit_id).html(options)
    }
    
    const resetForm = function () {
        //*
        loadSeasonDropdown()
        loadUnitDropdown()
        loadProfileDropdown()
        //*/
    }
    
    const defaultDetail = function () {
        //console.log("Pricing.defaultDetail()", Pricing)
        
        return {
            pricing_code: null,
            matrix_code: null,
            code: null,
            id: null,
            product_id: null,
            season_id: null,
            unit_id: null,
            matrix_id: null,
            variant_id: 0,
            name: null,
            mon: null,
            tue: null,
            wed: null,
            thu: null,
            fri: null,
            sat: null,
            sun: null,
            monMargin: null,
            tueMargin: null,
            wedMargin: null,
            thuMargin: null,
            friMargin: null,
            satMargin: null,
            sunMargin: null,
            count: 1,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            note: null,
        }
    }
    
    const set = function (pricing) {
        let detail = defaultDetail()
        if (pricing) {
            //console.log(pricing)
            detail.pricing_code = (pricing.pricing_code) ? pricing.pricing_code : null
            detail.matrix_code = (pricing.matrix_code) ? pricing.matrix_code : null
            detail.code = (pricing.code) ? pricing.code : null
            detail.id = (pricing.id) ? pricing.id : null
            detail.product_id = (pricing.product_id) ? pricing.id : null
            detail.season_id = (pricing.season_id) ? pricing.id : null
            detail.unit_id = (pricing.unit_id) ? pricing.id : null
            detail.matrix_id = (pricing.matrix_id) ? pricing.matrix_id : null
            detail.variant_id = (pricing.variant_id) ? pricing.variant_id : null
            detail.name = (pricing.name) ? pricing.name : null
            detail.mon = (pricing.mon) ? pricing.mon : null
            detail.tue = (pricing.tue) ? pricing.tue : null
            detail.wed = (pricing.wed) ? pricing.wed : null
            detail.thu = (pricing.thu) ? pricing.thu : null
            detail.fri = (pricing.fri) ? pricing.fri : null
            detail.sat = (pricing.sat) ? pricing.sat : null
            detail.sun = (pricing.sun) ? pricing.sun : null
            detail.monMargin = (pricing.monMargin) ? pricing.monMargin : null
            detail.tueMargin = (pricing.tueMargin) ? pricing.tueMargin : null
            detail.wedMargin = (pricing.wedMargin) ? pricing.wedMargin : null
            detail.thuMargin = (pricing.thuMargin) ? pricing.thuMargin : null
            detail.friMargin = (pricing.friMargin) ? pricing.friMargin : null
            detail.satMargin = (pricing.satMargin) ? pricing.satMargin : null
            detail.sunMargin = (pricing.sunMargin) ? pricing.sunMargin : null
            detail.count = (pricing.count) ? pricing.count : null
            detail.enabled = (pricing.enabled) ? pricing.enabled : 1
            detail.date_created = (pricing.date_created) ? pricing.date_created : formatDateMySQL()
            detail.created_by = (pricing.created_by) ? pricing.created_by : user_id
            detail.date_modified = (pricing.date_modified) ? pricing.date_modified : formatDateMySQL()
            detail.modified_by = (pricing.modified_by) ? pricing.modified_by : user_id
            detail.note = (pricing.note) ? pricing.note : null
        }
        //console.log("   detail", detail)
        Pricing.detail = detail
        return detail
    }
    
    return {
        all: new Map(),
        init: function (settings) {
            init(settings)
        },
        set: function (pricing) {
            return set(pricing)
        },
        resetForm: function () {
            resetForm()
        },
        loadProfileDropdown: function () {
            loadProfileDropdown()
        },
    }
    
})()

const Matrix = (function () {
    "use strict"
    
    let matrix_cost, matrix_margin, matrix_price
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const defaultDetail = function () {
        return {
            been_saved: 0,
            cost: 0,
            created_by: user_id,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
            enabled: 1,
            has_pricing: 0,
            id: null,
            margin: 0,
            code: null,
            modified_by: user_id,
            note: null,
            price: 0,
            pricings: new Map(),
            product_id: null,
            season_id: null,
            unit_id: null,
        }
    }
    
    const set = function (matrix) {
        
        let matrixPricings
        let detail = defaultDetail()
        if (matrix) {
            detail.been_saved = (matrix.been_saved) ? matrix.been_saved : 0
            detail.cost = (matrix.cost) ? matrix.cost : null
            detail.created_by = (matrix.created_by) ? matrix.created_by : user_id
            detail.date_created = (matrix.date_created) ? matrix.date_created : formatDateMySQL()
            detail.date_modified = (matrix.date_modified) ? matrix.date_modified : formatDateMySQL()
            detail.enabled = (matrix.enabled) ? matrix.enabled : 1
            detail.has_pricing = (matrix.has_pricing) ? matrix.has_pricing : null
            detail.id = (matrix.id) ? matrix.id : null
            detail.margin = (matrix.margin) ? matrix.margin : null
            detail.code = (matrix.code) ? matrix.code : null
            detail.modified_by = (matrix.modified_by) ? matrix.modified_by : user_id
            detail.note = (matrix.note) ? matrix.note : null
            detail.price = (matrix.price) ? matrix.price : null
            detail.product_id = (matrix.product_id) ? matrix.product_id : null
            detail.season_id = (matrix.season_id) ? matrix.season_id : null
            detail.unit_id = (matrix.unit_id) ? matrix.unit_id : null
            /*
            //Console.log("matrix.pricings", matrix.pricings)
            if (matrix.pricings && typeof matrix.pricings == "object") {
                let pricings = (matrix.pricings && typeof matrix.pricings == "object") ? matrix.pricings : []
                //Console.log("pricings", pricings)
                matrixPricings = new Map()
                $.each(pricings, function (k, pricing) {
                    //Console.log("pricing", pricing)
                    let formattedPricing = {
                        code: pricing.pricing_code,
                        pricing_code: pricing.pricing_code,
                        matrix_code: pricing.matrix_code,
                        product_id: pricing.product_id,
                        season_id: pricing.season_id,
                        unit_id: pricing.unit_id,
                        matrix_id: pricing.matrix_id,
                        variant_id: pricing.variant_id,
                        name: pricing.name,
                        mon: pricing.mon,
                        tue: pricing.tue,
                        wed: pricing.wed,
                        thu: pricing.thu,
                        fri: pricing.fri,
                        sat: pricing.sat,
                        sun: pricing.sun,
                        monMargin: pricing.monMargin,
                        tueMargin: pricing.tueMargin,
                        wedMargin: pricing.wedMargin,
                        thuMargin: pricing.thuMargin,
                        friMargin: pricing.friMargin,
                        satMargin: pricing.satMargin,
                        sunMargin: pricing.sunMargin,
                        count: pricing.count,
                        enabled: pricing.enabled,
                        date_created: pricing.date_created,
                        created_by: pricing.created_by,
                        date_modified: pricing.date_modified,
                        modified_by: pricing.modified_by,
                        note: pricing.note,
                    }
                    
                    let pricingDetail = Pricing.set(formattedPricing)
                    
                    matrixPricings.set(pricingDetail.pricing_code, pricingDetail)
                })
                
                detail.pricings = matrixPricings
            }
            //*/
        }
        Matrix.detail = detail
        return detail
    }
    
    const loadAll = function (matrices) {
        //Console.log("Matrix.loadAll(matrices)", matrices)
        // ----
        
        Matrix.all = new Map()
        if (!matrices) {
            matrices = []
        }
        
        //Pricing.all = new Map()
        $.each(matrices, function (k, matrix) {
            //Console.log("matrix", matrix)
            let detail = set(matrix)
            let id = matrix.code
            
            /*
            let pricingsMap = new Map()
            if (matrix.pricings) {
                let pricings = matrix.pricings
                $.each(pricings, function (k, pricing) {
                    let pricingDetail = Pricing.set(pricing)
                    let pricingCode = (pricing.pricing_code) ? pricing.pricing_code : null
                    pricingsMap.set(pricingCode, pricingDetail)
                    Pricing.all.set(pricingCode, pricingDetail)
                })
            }
            detail.pricings = pricingsMap
            //*/
            Matrix.all.set(id, detail)
        })
        
    }
    
    const init = function (settings) {
        let matrices = []
        if (settings) {
            if (settings.matrices) {
                matrices = settings.matrices
            }
        }
        loadAll(matrices)
        buildMatrixForm()
    }
    
    const buildMatrixForm = function () {
        
        matrix_cost = document.getElementsByName("matrix_cost")
        matrix_price = document.getElementsByName("matrix_price")
        matrix_margin = document.getElementsByName("matrix_margin")
        matrix_cost.forEach(el => el.addEventListener("keyup", event => {
            let matrix_id = el.dataset.matrixid
            //Console.log("matrix_cost", el.value)
            //Console.log("matrix_cost", matrix_id)
        }))
        
        matrix_price.forEach(el => el.addEventListener("keyup", event => {
            let matrix_id = el.dataset.matrixid
            //Console.log("matrix_price", el.value)
            //Console.log("matrix_price", matrix_id)
        }))
        
        matrix_margin.forEach(el => el.addEventListener("keyup", event => {
            let matrix_id = el.dataset.matrixid
            //Console.log("matrix_margin", el.value)
            //Console.log("matrix_margin", matrix_id)
        }))
        
    }
    
    const loadPerUnitForm = function () {
        //Console.log("Matrix.loadPerUnitForm()", Matrix)
        // ----
        
    }
    
    const loadPerPersonForm = function () {
        //Console.log("Matrix.loadPerPersonForm()", Matrix)
        // ----
        
    }
    
    const loadPerDayForm = function () {
        //Console.log("Matrix.loadPerDayForm()", Matrix)
        // ----
        
    }
    
    return {
        detail: {},
        all: new Map(),
        set: function (matrix) {
            return set(matrix)
        },
        init: function (settings) {
            init(settings)
        },
        buildMatrixForm: function () {
            buildMatrixForm()
        },
        loadPerUnitForm: function () {
            loadPerUnitForm()
        },
        loadPerPersonForm: function () {
            loadPerPersonForm()
        },
        loadPerDayForm: function () {
            loadPerDayForm()
        },
    }
    
})()

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
        //Console.log(' -- PricingStrategyTypes -- ', {})
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
        
        Console.log(" PricingStrategyTypes.all", PricingStrategyTypes.all)
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
    "use strict"
    
    const base_url = "/rating_types"
    const _input_rating_types_id = document.getElementById("input_rating_types_id")
    const _input_rating_types_name = document.getElementById("input_rating_types_name")
    const _input_rating_types_enabled = document.getElementById("input_rating_types_enabled")
    const _input_rating_types_date_created = document.getElementById("input_rating_types_date_created")
    const _input_rating_types_created_by = document.getElementById("input_rating_types_created_by")
    const _input_rating_types_date_modified = document.getElementById("input_rating_types_date_modified")
    const _input_rating_types_modified_by = document.getElementById("input_rating_types_modified_by")
    const _input_rating_types_note = document.getElementById("input_rating_types_note")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
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
        Console.log(" -- RatingTypes -- ", {})
    }
    
    const set = function (rating_types) {
        let detail = _default_detail()
        if (rating_types) {
            detail.id = (rating_types.id) ? rating_types.id : null
            detail.name = (rating_types.name) ? rating_types.name : null
            detail.enabled = (rating_types.enabled) ? rating_types.enabled : 1
            detail.date_created = (rating_types.date_created) ? rating_types.date_created : formatDateMySQL()
            detail.created_by = (rating_types.created_by) ? rating_types.created_by : created_by
            detail.date_modified = (rating_types.date_modified) ? rating_types.date_modified : formatDateMySQL()
            detail.modified_by = (rating_types.modified_by) ? rating_types.modified_by : modified_by
            detail.note = (rating_types.note) ? rating_types.note : null
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
            RatingTypes.all.set("id", detail)
        })
        
        Console.log(" RatingTypes.all", RatingTypes.all)
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

//RatingTypes.init()
//end object

const SalesTypes = (function () {
    "use strict"
    
    const base_url = "/sales_types"
    const _input_sales_types_id = document.getElementById("input_sales_types_id")
    const _input_sales_types_name = document.getElementById("input_sales_types_name")
    const _input_sales_types_class = document.getElementById("input_sales_types_class")
    const _input_sales_types_sort_order = document.getElementById("input_sales_types_sort_order")
    const _input_sales_types_enabled = document.getElementById("input_sales_types_enabled")
    const _input_sales_types_date_created = document.getElementById("input_sales_types_date_created")
    const _input_sales_types_created_by = document.getElementById("input_sales_types_created_by")
    const _input_sales_types_date_modified = document.getElementById("input_sales_types_date_modified")
    const _input_sales_types_modified_by = document.getElementById("input_sales_types_modified_by")
    const _input_sales_types_note = document.getElementById("input_sales_types_note")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
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
        Console.log(" -- SalesTypes -- ", {})
    }
    
    const set = function (sales_types) {
        let detail = _default_detail()
        if (sales_types) {
            detail.id = (sales_types.id) ? sales_types.id : null
            detail.name = (sales_types.name) ? sales_types.name : null
            detail.class = (sales_types.class) ? sales_types.class : null
            detail.sort_order = (sales_types.sort_order) ? sales_types.sort_order : null
            detail.enabled = (sales_types.enabled) ? sales_types.enabled : 1
            detail.date_created = (sales_types.date_created) ? sales_types.date_created : formatDateMySQL()
            detail.created_by = (sales_types.created_by) ? sales_types.created_by : created_by
            detail.date_modified = (sales_types.date_modified) ? sales_types.date_modified : formatDateMySQL()
            detail.modified_by = (sales_types.modified_by) ? sales_types.modified_by : modified_by
            detail.note = (sales_types.note) ? sales_types.note : null
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
            SalesTypes.all.set("id", detail)
        })
        
        Console.log(" SalesTypes.all", SalesTypes.all)
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

//SalesTypes.init()
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
        Console.log(" -- StatusTypes -- ", {})
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
        
        //Console.log(' StatusTypes.all',  StatusTypes.all);
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

//StatusTypes.init()
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
        
        //Console.log(types_name, Types[types_name])
    }
    
    const init = function (settings) {
        Types.address_types = new Map()
        Types.allot_by = new Map()
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
        Country.all = new Map()
        // ----
        if (settings.address_types) {
            setType(settings.address_types, "address_types")
        }
        
        if (settings.season_types) {
            setType(settings.season_types, "season_types")
            Season.init({
                seasons: settings.season_types,
            })
        }
        
        if (settings.airport_types) {
            setType(settings.airport_types, "airport_types")
        }
        
        if (settings.category) {
            setType(settings.category, "category")
            Category.init({
                categories: settings.category,
            })
            
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
        
        if (settings.allot_by) {
            setType(settings.allot_by, "allot_by")
        }
        
        if (settings.countries) {
            Country.load_all(settings.countries)
        }
        
        if (settings.countries) {
            Country.load_all(settings.countries)
        }
        
    }
    
    return {
        allot_by: new Map(),
        address_types: new Map(),
        season_types: new Map(),
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
            if (settings) {
                init(settings)
            }
        },
    }
    
})()

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
                        Console.log("data", data.id)
                        if (data && data.id) {
                            if (data.id) {
                                window.location.replace("/")
                            }
                        } else {
                            return handle_login_error("Error Logging In: 1")
                        }
                    })
                } catch (e) {
                    Console.error("Error", e)
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
            Console.log("Login.register->send_register", dataToSend)
            if (dataToSend) {
                try {
                    sendPostRequest("/api/v1.0/users/register", dataToSend, function (data, status, xhr) {
                        Console.log("data", data.id)
                        if (data && data.id) {
                            if (data.id) {
                                window.location.replace("/")
                            }
                        } else {
                            return handle_login_error("Error Logging In: 1")
                        }
                    })
                } catch (e) {
                    Console.error("Error", e)
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
            console.log("company_detail", company_detail)
            console.log("provider_detail", provider_detail)
            console.log("location_detail", location_detail)
            console.log("vendor_detail", vendor_detail)
            console.log("addresses", addresses)
            console.log("contacts", contacts)
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
            //console.log("test")
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
        console.log("Provider.add(provider)", provider)
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
                    console.log("Provider Upodating Vendor: vendor_detail", vendor_detail)
                    
                    provider.location_id = (provider.location_id) ? provider.location_id : 1
                    provider.vendor_id = vendor_detail.id
                    provider_detail = {
                        provider_detail: provider,
                    }
                    
                    console.log("Provider : provider_detail", provider_detail)
                    updateProvider(provider_detail, function (data) {
                        if (data) {
                            console.log("data", data)
                            if (data[0]) {
                                //console.log("data[0]", data[0])
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
                                Product.updateProductSKU()
                                
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
        if (_provider_name) {
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
                    if ($(this).attr("readonly") === "readonly") {
                        e.preventDefault()
                    } else {
                        $(this).select()
                    }
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
                    },
                })
        }
        
    }
    
    $("#modal_product_provider_name")
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
                        Product.updateProductSKU()
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
            Product.updateProductSKU()
            _modal_product_vendor_name.disabled = true
        })
        .on("click", function () {
            if ($(this).attr("readonly") === "readonly") {
                e.preventDefault()
            } else {
                $(this).select()
            }
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
                Product.updateProductSKU()
            },
        })
    
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
                        
                        let vendor = provider.vendor
                        let code_direct = (provider.code_direct_id) ? provider.code_direct_id : null
                        let sku = (vendor.sku) ? vendor.sku : null
                        
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
                        Product.updateProductSKU()
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
                    console.log("provider", provider)
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
                    console.log("data 1", data)
                    if (data[0]) {
                        console.log("data[0] 1", data[0])
                        let details = data[0]
                        if (details.id) {
                            if (_provider_id.value === "" || isNaN(parseInt(_provider_id.value))) {
                                window.location.replace(base_url + "/" + details.id)
                            } else {
                                let name = _company_name.value
                                toastr.success(`Provider ${name} has been updated.`)
                            }
                        } else {
                            console.log("details 1", details)
                        }
                    } else {
                        console.log("details 2", data)
                    }
                } else {
                    console.log("details 3", provider)
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
                console.log("error", e)
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
        console.log("set_progress()")
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
                console.log("error", e)
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

const Profile = (function () {
    "use strict"
    const _table_profile_product_edit = document.getElementById("table_profile_product_edit")
    const _product_edit_profile_form_profile_name_filter = document.getElementById("product_edit_profile_form_profile_name_filter")
    const _product_edit_profile_form = document.getElementById("product_edit_profile_form")
    
    // ----
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let $table_profile_product_edit = $(_table_profile_product_edit)
    let form_rules = {
        rules: {
            product_edit_unit_form_unit_min_nights: {
                required: true,
                number: true,
                min: 1,
            },
            product_edit_unit_form_unit_max_nights: {
                required: true,
                number: true,
                min: 1,
            },
            product_edit_unit_form_unit_min_pax: {
                required: true,
                number: true,
                min: 1,
            },
            product_edit_unit_form_unit_max_pax: {
                required: true,
                number: true,
                min: 1,
            },
        },
        messages: {
            product_edit_unit_form_unit_min_nights: {
                required: "Field Required",
                number: "Field Invalid",
                min: "Field Invalid",
            },
            product_edit_unit_form_unit_max_nights: {
                required: "Field Required",
                number: "Field Invalid",
                min: "Field Invalid",
            },
            product_edit_unit_form_unit_min_pax: {
                required: "Field Required",
                number: "Field Invalid",
                min: "Field Invalid",
            },
            product_edit_unit_form_unit_max_pax: {
                required: "Field Required",
                number: "Field Invalid",
                min: "Field Invalid",
            },
        },
    }
    
    /**
     * build product edit profile table
     */
    const buildEditTable = function () {
        /*
        Console.log("Profile.buildEditTable()", Profile)
        $table_profile_product_edit = $(_table_profile_product_edit).table({
            table_type: "display_list",
            data: [],
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
                    title: "sales_types_details",
                    targets: 1,
                    data: "sales_types_details",
                    render: function (data, type, row, meta) {
                        Console.log("sales_types_details", data)
                        let nights = 1
                        if (data === null) {
                            nights = "null"
                        } else {
                            nights = data
                        }
                        
                        return "<span style='white-space: nowrap;'>" + nights + "</span>"
                    },
                },
                {
                    title: "allot_by_id",
                    targets: 2,
                    data: "allot_by_id",
                    render: function (data, type, row, meta) {
                        let nights = 1
                        if (data === null) {
                            nights = "null"
                        } else {
                            nights = data
                        }
                        return "<span style='white-space: nowrap;'>" + nights + "</span>"
                    },
                },
                {
                    title: "expires",
                    targets: 3,
                    data: "expires",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "release_amt",
                    targets: 4,
                    data: "release_amt",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
            ],
            rowClick: Profile.edit,
        })
                 */
    }
    
    const initAutoComplete = function () {
        /*
        Console.log("Profile.initAutoComplete()", Profile)
        $(_product_edit_profile_form_profile_name_filter)
          .on("click", function () {
          
          })
          .on("search", function () {
              $table_season_product_edit.clearSelectedRows()
              resetForm()
          })
          .on("change", function () {
              if (_product_edit_season_form_season_name_filter.value === "") {
                  $table_season_product_edit.clearSelectedRows()
                  resetForm()
              }
          })
          .autocomplete({
              serviceUrl: "/api/v1.0/autocomplete/profiles",
              minChars: 2,
              cache: false,
              dataType: "json",
              triggerSelectOnValidInput: false,
              paramName: "st",
              onSelect: function (suggestion) {
                  if (!suggestion.data) {
                      return
                  }
                  $table_profile_product_edit.clearSelectedRows()
                  let profile = suggestion.data
                  Console.log("profile", profile)
              },
          })
          
         */
    }
    
    /**
     * set default profile record detail
     *
     * @returns {{allot_by_details: {note: null, date_modified: *, date_created: *, modified_by: (number|number), name: null, id: null, created_by: (number|number), sort_order: number, enabled: number}, note: null, expires: null, weekday_dow: string, return_dow: string, advanced_booking_min: null, checkin_dow: string, min_duration: number, days_out: null, transfer_sales_types_details: {note: null, date_modified: *, date_created: *, modified_by: (number|number), name: null, id: null, class: null, created_by: (number|number), sort_order: number, enabled: number}, enabled: number, advanced_booking_date: null, id: null, checkout_dow: string, sales_types_details: {note: null, date_modified: *, date_created: *, modified_by: (number|number), name: null, id: null, class: null, created_by: (number|number), sort_order: number, enabled: number}, sales_types_id: null, transfer_sales_types_id: null, quantity: null, min_length_days: number, product_profile_details: {note: null, date_modified: *, date_created: *, profile_id: null, product_id: null, modified_by: (number|number), created_by: (number|number), enabled: number}, date_created: *, departure_dow: string, advanced_booking_max: null, equal_duration: null, release_amt: null, created_by: (number|number), max_duration: null, date_modified: *, modified_by: (number|number), name: null, allot_by_id: null, inc_days_dow: string}}
     */
    const defaultDetail = function () {
        return {
            advanced_booking_date: null,
            advanced_booking_max: null,
            advanced_booking_min: null,
            allot_by_details: {
                created_by: user_id,
                date_created: formatDateMySQL(),
                date_modified: formatDateMySQL(),
                enabled: 1,
                id: null,
                modified_by: user_id,
                name: null,
                note: null,
                sort_order: 999,
            },
            allot_by_id: null,
            checkin_dow: "",
            checkout_dow: "",
            created_by: user_id,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
            days_out: null,
            departure_dow: "",
            enabled: 1,
            equal_duration: null,
            expires: null,
            id: null,
            inc_days_dow: "",
            max_duration: null,
            min_duration: 1,
            min_length_days: 1,
            modified_by: user_id,
            name: null,
            note: null,
            product_profile_details: {
                created_by: user_id,
                date_created: formatDateMySQL(),
                date_modified: formatDateMySQL(),
                enabled: 1,
                modified_by: user_id,
                note: null,
                product_id: null,
                profile_id: null,
            },
            quantity: null,
            release_amt: null,
            return_dow: "",
            sales_types_details: {
                class: null,
                created_by: user_id,
                date_created: formatDateMySQL(),
                date_modified: formatDateMySQL(),
                enabled: 1,
                id: null,
                modified_by: user_id,
                name: null,
                note: null,
                sort_order: 999,
            },
            sales_types_id: null,
            transfer_sales_types_details: {
                class: null,
                created_by: user_id,
                date_created: formatDateMySQL(),
                date_modified: formatDateMySQL(),
                enabled: 1,
                id: null,
                modified_by: user_id,
                name: null,
                note: null,
                sort_order: 999,
            },
            transfer_sales_types_id: null,
            weekday_dow: "",
        }
    }
    
    /**
     * load all product profiles
     *
     * @param profiles
     */
    const loadAll = function (profiles) {
        Profile.all = new Map()
        if (!profiles) {
            profiles = []
        }
        
        $.each(profiles, function (k, profile) {
            let detail = set(profile)
            Console.log("detail", detail)
        })
        
        Console.log("Profile.all", Profile.all)
    }
    
    const set = function (profile) {
        let detail = defaultDetail()
        Console.log("Profile.set(profile)", profile)
        if (profile) {
            detail.advanced_booking_date = (profile.advanced_booking_date) ? profile.advanced_booking_date : null
            detail.advanced_booking_max = (profile.advanced_booking_max) ? profile.advanced_booking_max : null
            detail.advanced_booking_min = (profile.advanced_booking_min) ? profile.advanced_booking_min : null
            detail.allot_by_details.created_by = (profile.created_by) ? profile.created_by : null
            detail.allot_by_details.date_created = (profile.date_created) ? profile.date_created : formatDateMySQL()
            detail.allot_by_details.date_modified = (profile.date_modified) ? profile.date_modified : formatDateMySQL()
            detail.allot_by_details.enabled = (profile.enabled) ? profile.enabled : 1
            detail.allot_by_details.id = (profile.id) ? profile.id : null
            detail.allot_by_details.modified_by = (profile.modified_by) ? profile.modified_by : user_id
            detail.allot_by_details.name = (profile.name) ? profile.name : null
            detail.allot_by_details.note = (profile.note) ? profile.note : null
            detail.allot_by_details.sort_order = (profile.sort_order) ? profile.sort_order : 999
        }
        return detail
    }
    
    const init = function (settings) {
        //Console.log("Profile.init(settings)", settings)
        let profiles = []
        if (settings) {
            if (settings.profiles) {
                profiles = settings.profiles
            }
        }
        loadAll(profiles)
        /*
        if (settings) {
            if (settings.profiles) {
                profiles = settings.profiles
            }
        }
        //*/
        /*
        if (_table_profile_product_edit) {
            buildEditTable()
        }
         */
        
        /*
        if (_product_edit_profile_form_profile_name_filter) {
            initAutoComplete()
        }
        
        if (_product_edit_profile_form) {
            initAutoComplete()
            validator_init(form_rules)
            Unit.validator = $(_product_edit_profile_form).validate()
        }
        
        
        
        
        //*/
    }
    
    const edit = function (profile) {
        Console.log("Profile.edit(profile)", profile)
    }
    
    return {
        all: new Map(),
        init: function (settings) {
            init(settings)
        },
        edit: function (profile) {
            edit(profile)
        },
    }
    
})()


$(function () {
    const _profile_card = document.getElementById("profile_card")
    const _cover_image = document.getElementById("profile_card_cover_image")
    const _profile_edit_name = document.getElementById("profile_edit_name")
    
    $(_profile_edit_name)
      .on("click", function () {
          Console.log("_profile_edit_name:click")
      })
    
    let tempName = {
        first: "",
        last: "",
    }
    const enableNameEdit = function () {
    
    }
    
    const disableNameEdit = function () {}
    
    const build = function () {
        let ht = parseInt($(_profile_card).outerHeight())
        let wd = parseInt($(_profile_card).outerWidth())
        let imageHeight, imageWidth = 0
        
        let r = ht / wd
        imageHeight = (wd / 2) + "px"
        imageWidth = wd + "px"
        
        $(_cover_image)
          .css({
              "width": "100%",
              "height": "100%",
              "max-height": imageHeight + "px",
          })
    }
    
    window.addEventListener("resize", debounce(function (e) {
        if (_profile_card) {
            build()
        }
    }))
    
    build()
})

$(document).ready(function () {
    
    window.addEventListener("load", function () {
        const inputs = document.getElementsByTagName("input")
        
        if (mdbPreloader) {
            $(mdbPreloader).delay(1000).fadeOut(300)
        }
        
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].type === "text") {
                
                if (inputs[i].classList.contains("date-format")) {
                    //inputs[i].setAttribute("maxlength", "10")
                    //inputs[i].onkeydown = function (event) {
                    //return IsNumeric(this, event.keyCode)
                    //}
                    //inputs[i].onkeyup = function (event) {
                    //validateDateFormat(this, event.keyCode)
                    //}
                    
                }
                
                if (inputs[i].classList.contains("time-format")) {
                    
                    //inputs[i].setAttribute("maxlength", "5")
                    //inputs[i].onkeydown = function (event) {
                    //return IsNumeric(this, event.keyCode)
                    //}
                    //inputs[i].onkeyup = function (event) {
                    //validateTimeFormat(this, event.keyCode)
                    //}
                    
                }
            }
        }
    }, false)
    
    window.addEventListener("resize", debounce(function (e) {
        resize_elements("end of resizing")
    }))
    
    new WOW().init()
    
    $(this).scrollTop(0)
    
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
    
    $(function () {
        $("[data-toggle=\"tooltip\"]").tooltip()
    })
    
    //toastr.info('I do not think that word means what you think it means.', 'Info!')
    //toastr.success('I do not think that word means what you think it means.', 'Success!')
    //toastr.warning('I do not think that word means what you think it means.', 'Warning!')
    //toastr.error('I do not think that word means what you think it means.', 'Error!')
    
    let codeData = document.querySelectorAll(".panel-code")
    codeData.forEach(el => {
        let html = $(el).html()
        let formattedCode = ""
        let classValue = ""
        $(el).empty()
        
        if (el.dataset.datatype === "json") {
            formattedCode = jsonPrettify(html)
            classValue = "json"
        } else if (el.dataset.datatype === "jsonp") {
            formattedCode = jsonPrettify(html)
            classValue = "jsonp"
        } else if (el.dataset.datatype === "json5") {
            formattedCode = jsonPrettify(html)
            classValue = "json5"
        }
        
        let pre = document.createElement("pre")
        let code = document.createElement("code")
        
        code.classList = [`language-${classValue}`]
        code.innerHTML = formattedCode
        
        pre.appendChild(code)
        el.appendChild(pre)
        Prism.highlightElement(code)
    })
    
    $("button.pre_display_button").show()
    $("div.pre_display_el").hide()
    
    $(function () {
        $("textarea.short-description").maxlength({
            alwaysShow: true,
            threshold: 10,
            warningClass: "badge badge-warning",
            limitReachedClass: "badge badge-danger",
            //placement: 'top',
            //preText: 'used ',
            //separator: ' of ',
            //postText: ' chars.',
        })
    })
    
    $(function () {
        toastr.options = {
            "closeButton": true,
            "debug": true,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "md-toast-bottom-right",
            "preventDuplicates": true,
            "showDuration": 300,
            "hideDuration": 1000,
            "timeOut": 5000,
            "extendedTimeOut": 1000,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut",
        }
        
        //toastr["warning"]("asd", "asd")
    })
})

