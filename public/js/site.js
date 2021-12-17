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
    //Console.log("Submit Errors", submitErrorsList)
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
                //Console.log("getError:2")
                return handleError("failed")
            } else if (status === "success" && typeof data.error !== "undefined") {
                Console.log(data.error)
                //Console.log("getError:3")
                return handleError(data.error)
            } else {
                //Console.log("getError:4")
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
            //*
            Console.log("data", data)
            Console.log("status", status)
            Console.log("xhr", xhr)
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
    Console.log("jqXHR", jqXHR.responseText)
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
            //Console.log("ggg")
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
    let fu = paddy(14, 11)
    let codeDirectId = "D" + fu
    
    return codeDirectId
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
            Console.log("jqXHR", jqXHR)
            Console.log("jqXHR", jqXHR.responseText)
            Console.log("_display_ajax_error", _display_ajax_error(jqXHR, textStatus, url))
            Console.log("textStatus", textStatus)
            Console.log("msg", msg)
            Console.log('http://dev.travelsoft.com/error')
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
                Console.log(err)
            } else {
                let err = _display_ajax_error(jqXHR, textStatus, url)
                handleError(err.message)
                Console.log(err)
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
                Console.log("Request failed")
                Console.log(_display_ajax_error(jqXHR, textStatus, url))
            } else {
                Console.log("Request failed")
                Console.log(_display_ajax_error(jqXHR, textStatus, url))
            }
            if ($.isFunction(callback)) {
                callback(msg, "failed")
            }
        })
    },
})
const logger = {
    
    log: function () {
        Console.log(args)
    },
}

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
        
                    <!--Body-->
                    <div class="modal-body">
                        <i class="fas fa-check fa-4x mb-3 animated rotateIn"></i>
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
                    console.dir(cardBlock)
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
                "/public/css/variant.css",
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
$(function () {
    tinyEditor.init()
})


const Season = (function () {
    "use strict"
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let categories = new Map()
    
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
        //Console.log(categories.get(category_id).seasons)
        //Console.log("category", category)
        //Console.log(detail)
        return detail
    }
    
    const load_types = function (seasons) {
        categories = new Map()
        if (seasons) {
            
            $.each(seasons, function (i, season) {
                Season.types.set(season.id, formatSeasonType(season))
            })
        }
    }
    
    const init = function (settings) {
        let seasons = []
        if (settings) {
            if (settings.seasons) {
                seasons = settings.seasons
            }
        }
        
        load_types(seasons)
    }
    
    return {
        types: new Map(),
        loadTypes: function (seasons) {
            load_types(seasons)
        },
        init: function (settings) {
            init(settings)
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
                Console.log("dataToggle", dataToggle)
                switch (dataToggle) {
                    case "panel-refresh":
                        
                        break
                    case "panel-collapse":
                        Console.log("collapse")
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
                        Console.log("fullscreen")
                        break
                    case "panel-close":
                        Console.log("close")
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
                Console.log(e)
            }
        }
    }
    
    const updateRow = function (row_data) {
        if (row_data) {
            try {
                let rowId = "#" + table_id + "_tr_" + row_data.id
                let rowData = row_data
                $dTable.row(rowId).data(rowData).draw()
                loadRow(row_data.id)
            } catch (e) {
                Console.log(e)
            }
        }
        
        formatTable()
    }
    
    const loadRow = function (row_data) {
        if (row_data) {
            try {
                let rowId = row_data.id
                $dTable.page.jumpToData(rowId, 0)
            } catch (e) {
                Console.log(e)
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
                Console.log(e)
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
            Console.log(e)
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
    }
    
}

$.fn.BuildKeyword = function (keywords) {
    
    if (!$(this).hasClass("keyword")) {
        return
    }
    
    const chip_id = $(this).attr("id")
    const _chips = document.getElementById(chip_id)
    
    let tags = new Map()
    let $chipsEl = $(_chips)
    let $submitButton = $(`#${chip_id} > div > div > button`)
    let $input = $(`#${chip_id} > div > input.user-release-input`)
    let counter = 0
    let $container = $(`#${chip_id} > div > div.chips_container`)
    
    //--
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
      .on("keypress", function (e) {
          if (e.which === 13) {
              add()
              editMode = null
          }
      })
    
    $submitButton
      .on("click", function () {
          add()
          editMode = null
      })
    
    let editMode = null
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
                Console.log(e)
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
        
        Console.log(" AddressTypes.all", AddressTypes.all)
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
              Console.log("city", suggestion)
              if (!suggestion.data) {
                  return
              }
              
              Console.log("city", suggestion)
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
        Console.log(msg)
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
                Console.log(e)
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
                Console.log(e)
                handle_city_error("Error: Validating City")
            }
        } else {
            Console.log("Error: Missing Data")
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
                    //Console.log($(el).attr("id"))
                    //Console.log("city_id", city_id)
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
                Console.log(e)
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
                Console.log(e)
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
        Console.log(msg)
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
                    //Console.log(data)
                    
                    if (data) {
                        // Country.all = data.result
                        return callback(data)
                    } else {
                        return handle_country_error("Oops: 1")
                    }
                })
                //*/
            } catch (e) {
                Console.log(e)
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
                Console.log(e)
                handle_country_error("Error: Validating Country")
            }
            
        } else {
            Console.log("Error: Missing Data")
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
    let default_display = default_address_view
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    // ----
    
    $("a[data-toggle=\"tab\"]").on("hide.bs.tab", function (e) {
        //e.target // newly activated tab
        //e.relatedTarget // previous active tab
        hide_form()
    })
    
    const clear_product_location_form = function () {
        Console.log("Location.clear_product_location_form()")
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
        Console.log("Location.populate_product_location_form(location)", location)
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
        Console.log("Location.load_product_location_form(location)", location)
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
              let location_name = _location_name_filter.value
              Console.log("location_name", location_name)
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
                  Console.log("suggestion", suggestion)
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
    
    /**
     * input[name='location_display']
     */
    $("input[name='location_display']")
      .on("change", function () {
          
          let selected_value = $("input[name='location_display']:checked").val()
          Console.log("selected_value", selected_value)
          default_display = selected_value
          init_autocomplete()
          if (Location.detail["display_" + selected_value] !== null) {
              _location_name_filter.value = Location.detail["display_" + selected_value]
          }
      })
    
    /**
     * _location_name
     */
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
    
    /**
     * validate location form
     *
     * @returns {*|jQuery}
     */
    const validate_form = function () {
        return $(_form_edit_location).valid()
    }
    
    /**
     * initialize autocomplete functions
     */
    const init_autocomplete = function () {
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
                      clear_validation(_form_edit_location)
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
                Console.log(e)
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
            init_autocomplete()
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
            Console.log("location", location)
            set_detail(location)
        },
        build: function () {
            if (validate_edit_location_filter_form()) {
                return build()
            }
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
    let default_display = default_address_view
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
            //Console.log("address", address)
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
                Console.log(e)
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

$.fn.ColorScheme = function (settings) {
    Console.log("Test", Types.color_scheme)
    
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
        Console.log(" -- AirportTypes -- ", {})
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
        
        Console.log(" AirportTypes.all", AirportTypes.all)
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
    
    const handle_product_change = function (category_id) {
        if (!category_id) {
            return
        }
        
        category_id = parseInt(category_id)
        
        Product.reset_new_product_details()
        Product.init_new_product_autocomplete(category_id)
        let category = Types.category.get(category_id)
        if (!category) {
            return
        }
        Product.attr1 = category.attribute_id
        Product.attr2 = null
        Product.attr3 = null
        Product.update_product_sku()
        if (category_id && !isNaN(parseInt(category_id))) {
            
            switch (parseInt(category_id)) {
                case 1:
                    /**
                     * Hotels
                     */
                    _modal_product_provider_name.disabled = false
                    _modal_product_vendor_name.disabled = false
                    _modal_product_pricing_strategies_types_id.value = ""
                    _modal_product_rating_types_id.disabled = false
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    Console.log("Hotels")
                    break
                case 2:
                    /**
                     * Flight
                     */
                    _modal_product_pricing_strategies_types_id.value = "2"
                    _modal_product_rating_types_id.value = ""
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_rating_types_id.disabled = true
                    Console.log("Flight")
                    break
                case 3:
                    /**
                     * Cars
                     */
                    _modal_product_pricing_strategies_types_id.value = "3"
                    _modal_product_rating_types_id.value = ""
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_rating_types_id.disabled = true
                    Console.log("Cars")
                    break
                case 4:
                    /**
                     * Rail
                     */
                    _modal_product_pricing_strategies_types_id.value = "2"
                    _modal_product_rating_types_id.value = ""
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_rating_types_id.disabled = true
                    Console.log("Rail")
                    break
                case 5:
                    /**
                     * Transport
                     */
                    _modal_product_pricing_strategies_types_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_rating_types_id.disabled = false
                    Console.log("Transport")
                    break
                case 6:
                    /**
                     * Tours
                     */
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.value = "2"
                    _modal_product_rating_types_id.value = ""
                    _modal_product_rating_types_id.disabled = true
                    Console.log("Tours")
                    break
                case 7:
                    /**
                     * Cruises
                     */
                    _modal_product_name.disabled = false
                    
                    _modal_product_pricing_strategies_types_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_rating_types_id.disabled = false
                    _modal_product_currency_id.disabled = false
                    Console.log("Cruises")
                    break
                case 8:
                    /**
                     * Packages
                     */
                    _modal_product_pricing_strategies_types_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_rating_types_id.disabled = false
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    Console.log("Packages")
                    break
                case 9:
                    /**
                     * Other
                     */
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_rating_types_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_pricing_strategies_types_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    Console.log("Other")
                    break
                default:
                    /**
                     * default
                     */
                    _modal_product_name.disabled = true
                    _modal_product_sku.disabled = true
                    _modal_product_rating_types_id.disabled = true
                    _modal_product_currency_id.disabled = true
                    _modal_product_pricing_strategies_types_id.disabled = true
                    Console.log("Default")
                    break
            }
        }
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
        //Console.log("Category.init()", settings)
        let categories = []
        if (settings) {
            if (settings.categories) {
                categories = settings.categories
            }
        }
        
        load_all(categories)
    }
    
    const set = function (category) {
        //Console.log("Category.set()", category)
        let detail = _default_detail()
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
        //Console.log("Category.load_all()", categories)
        Category.all = new Map()
        
        if (!categories) {
            return
        }
        
        $.each(categories, function (i, category) {
            let detail = set(category)
            //Console.log("detail", detail)
            //Console.log("detail.id", detail.id)
            Category.all.set(detail.id, detail)
        })
        
        //Console.log(" Category.all", Category.all)
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
        Console.log(" -- ContactTypes -- ", {})
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
        
        Console.log(" ContactTypes.all", ContactTypes.all)
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
    const _company_keywords = document.getElementById("company_keywords")
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
                                  init_autocomplete()
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
    
    // ----
    
    /**
     * set object default values
     *
     * @returns {{phone_2: null, note: null, phone_1: null, website: null, keywords: null, date_created: *, description_long: null, created_by: (number|number), enabled: number, description_short: null, status_id: number, date_modified: *, modified_by: (number|number), name: null, logo: null, cover_image: string, id: null, fax: null, email: null}}
     * @private
     */
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
            description_short: null,
            description_long: null,
            keywords: null,
            logo: null,
        }
    }
    
    /**
     * fill in form data
     *
     * @param company
     */
    const populate_form = function (company) {
        let company_logo_image = $("#company_logo").dropify()
        $(_company_id).val((company.id) ? company.id : "").trigger("change")
        _company_name.value = (company.name) ? company.name : ""
        _company_phone_1.value = (company.phone_1) ? company.phone_1 : ""
        _company_phone_2.value = (company.phone_2) ? company.phone_2 : ""
        _company_fax.value = (company.fax) ? company.fax : ""
        _company_email.value = (company.email) ? company.email : ""
        _company_website.value = (company.website) ? company.website : ""
        _company_description_long.value = (company.description_long) ? company.description_long : ""
        _company_description_short.value = (company.description_short) ? company.description_short : ""
        let company_keywords = (company.keywords) ? company.keywords : ""
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
    
    /**
     * handle company object errors
     *
     * @param msg
     */
    const handle_company_error = function (msg) {
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
                        return handle_company_error("Oops: 1")
                    }
                })
            } catch (e) {
                Console.log(e)
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
            init_autocomplete()
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
    
    let reset_company = {}
    
    /**
     * set detail from data
     *
     * @param company
     * @returns {{phone_2: null, note: null, phone_1: null, website: null, keywords: null, date_created: *, description_long: null, created_by: number, enabled: number, description_short: null, status_id: number, date_modified: *, modified_by: number, name: null, logo: null, cover_image: string, id: null, fax: null, email: null}}
     */
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
            init_autocomplete()
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
                Console.log(data)
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
            Console.log("contact", contact)
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
        
        //Console.log(" Contact.all", Contact.all)
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
                Console.log(e)
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
        //Console.log(' -- Currency -- ', {})
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
        
        //Console.log(' Currency.all',  Currency.all);
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
                  Product.update_product_sku()
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
          Product.update_product_sku()
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
                  Product.update_product_sku()
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
    
    const init_autocomplete = function () {
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
                    Product.update_product_sku()
                    
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
                        Product.update_product_sku()
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
                                Product.update_product_sku()
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
                Console.log(e)
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
                Console.log(e)
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
                Console.log(e)
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
                init_autocomplete()
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
        
        if (settings.countries) {
            Country.load_all(settings.countries)
        }
        
    }
    
    return {
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
          Console.log("company_detail", company_detail)
          Console.log("provider_detail", provider_detail)
          Console.log("location_detail", location_detail)
          Console.log("vendor_detail", vendor_detail)
          Console.log("addresses", addresses)
          Console.log("contacts", contacts)
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
          //Console.log("test")
      })
    
    $(_button_edit_provider_name)
      .on("click", function () {
          enable_form_fields()
      })
    
    $(_company_id)
      .on("change", function () {
          $(_provider_company_id).val(_company_id.value)
      })
    
    //
    const add = function (provider) {
        Console.log("add", provider)
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
                    Console.log("Provider Upodating Vendor: vendor_detail", vendor_detail)
                    
                    provider.location_id = (provider.location_id) ? provider.location_id : 1
                    provider.vendor_id = vendor_detail.id
                    provider_detail = {
                        provider_detail: provider,
                    }
                    
                    Console.log("Provider : provider_detail", provider_detail)
                    updateProvider(provider_detail, function (data) {
                        if (data) {
                            Console.log("data", data)
                            if (data[0]) {
                                //Console.log("data[0]", data[0])
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
                                
                                init_autocomplete()
                                
                                Product.attr2 = (provider.code_direct_id) ? provider.code_direct_id : null
                                Product.attr3 = (vendor.sku) ? vendor.sku : null
                                Product.update_product_sku()
                                
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
    const init_autocomplete = function () {
        
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
                  Console.log("suggestion.data", suggestion.data)
                  let provider = suggestion.data
                  let company = (provider.company) ? provider.company : {}
                  let addresses = (provider.addresses) ? provider.addresses : {}
                  let contacts = (provider.contacts) ? provider.contacts : {}
                  let location = (provider.location) ? provider.location : {}
                  let vendor = (provider.vendor) ? provider.vendor : {}
                  
                  //
                  
                  let provider_id = provider.id
                  let company_name = provider.company.name
                  let provider_company_id = provider.company.id
                  //
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
        
        $(_modal_product_provider_name)
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
                          Product.update_product_sku()
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
              Product.update_product_sku()
              _modal_product_vendor_name.disabled = true
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
                  if (!suggestion || !suggestion.data) {
                      return
                  }
                  Console.log("suggestion.data", suggestion.data)
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
                  Product.update_product_sku()
                  
                  //$(_modal_product_vendor_name).trigger("change")
              },
          })
        
    }
    
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
                        
                        Console.log("provider", provider)
                        
                        let vendor = provider.vendor
                        let code_direct = (provider.code_direct_id) ? provider.code_direct_id : null
                        let sku = (vendor.sku) ? vendor.sku : null
                        Console.log("code_direct", code_direct)
                        Console.log("sku", sku)
                        
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
                        Product.update_product_sku()
                        
                        /*
                        
                        
    
                        
                        
    
                        Product.attr2 = code_direct
                        Product.attr3 = sku
                        Product.update_product_sku()
                        //*/
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
                    Console.log("provider", provider)
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
        Console.log("save", provider)
        if (provider) {
            updateProvider(provider, function (data) {
                if (data) {
                    Console.log("data 1", data)
                    if (data[0]) {
                        Console.log("data[0] 1", data[0])
                        let details = data[0]
                        if (details.id) {
                            if (_provider_id.value === "" || isNaN(parseInt(_provider_id.value))) {
                                window.location.replace(base_url + "/" + details.id)
                            } else {
                                let name = _company_name.value
                                toastr.success(`Provider ${name} has been updated.`)
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
                Console.log(e)
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
        Console.log("set_progress()")
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
                Console.log(e)
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
            init_autocomplete()
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
        init_autocomplete()
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



const Product = (function () {
    "use strict"
    const _form_product_add = document.getElementById("form_product_add")
    const _product_edit_page = document.getElementById("product_edit_page")
    const _button_add_product_page_heading = document.getElementById("button_add_product_page_heading")
    const _modal_button_cancel_add_product = document.getElementById("modal_button_cancel_add_product")
    const _modal_button_submit_add_product = document.getElementById("modal_button_submit_add_product")
    const _modal_product_provider_name = document.getElementById("modal_product_provider_name")
    const _modal_product_vendor_name = document.getElementById("modal_product_vendor_name")
    const _modal_product_provider_id = document.getElementById("modal_product_provider_id")
    const _modal_product_vendor_id = document.getElementById("modal_product_vendor_id")
    const _modal_new_product = document.getElementById("modal_new_product")
    const _modal_product_name = document.getElementById("modal_product_name")
    const _modal_product_category_id = document.getElementById("modal_product_category_id")
    const _modal_product_sku = document.getElementById("modal_product_sku")
    const _modal_product_rating_types_id = document.getElementById("modal_product_rating_types_id")
    const _modal_product_currency_id = document.getElementById("modal_product_currency_id")
    const _modal_product_pricing_strategies_types_id = document.getElementById("modal_product_pricing_strategies_types_id")
    const _modal_product_provider_company_id = document.getElementById("modal_product_provider_company_id")
    const _modal_product_vendor_company_id = document.getElementById("modal_product_vendor_company_id")
    const _modal_product_provider_vendor_match = document.getElementById("modal_product_provider_vendor_match")
    const _modal_product_provider_location_id = document.getElementById("modal_product_provider_location_id")
    const _modal_product_location_id = document.getElementById("modal_product_location_id")
    /**
     * product search: panels - hotels
     * @type {HTMLElement}
     * @private
     */
    const _panel_hotels = document.getElementById("panel_hotels")
    const _panel_flights = document.getElementById("panel_flights")
    const _panel_cars = document.getElementById("panel_cars")
    const _panel_rails = document.getElementById("panel_rails")
    const _panel_transport = document.getElementById("panel_transport")
    const _panel_tours = document.getElementById("panel_tours")
    const _panel_cruises = document.getElementById("panel_cruises")
    const _panel_packages = document.getElementById("panel_packages")
    const _panel_other = document.getElementById("panel_other")
    const _form_product_search_panel_hotels = document.getElementById("form_product_search_panel_hotels")
    const _form_product_search_panel_flights = document.getElementById("form_product_search_panel_flights")
    const _form_product_search_panel_cars = document.getElementById("form_product_search_panel_cars")
    const _form_product_search_panel_rails = document.getElementById("form_product_search_panel_rails")
    const _form_product_search_panel_transport = document.getElementById("form_product_search_panel_transport")
    const _form_product_search_panel_tours = document.getElementById("form_product_search_panel_tours")
    const _form_product_search_panel_cruises = document.getElementById("form_product_search_panel_cruises")
    const _form_product_search_panel_packages = document.getElementById("form_product_search_panel_packages")
    const _form_product_search_panel_other = document.getElementById("form_product_search_panel_other")
    /**
     * product search: panels - hotels product_name
     *
     * @type {HTMLElement}
     * @private
     */
    const _form_product_search_hotel_product_name = document.getElementById("form_product_search_hotel_product_name")
    const _button_product_search_panel_hotels_clear = document.getElementById("button_product_search_panel_hotels_clear")
    const _button_product_search_panel_hotels_submit = document.getElementById("button_product_search_panel_hotels_submit")
    const base_url = "/products"
    const _product_index_page = document.getElementById("product_index_page")
    const _product_index_table = document.getElementById("product_index_table")
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let $index_table, new_product_validator
    let add_modal_form_rules = {
        /*
        groups: {
            providerNameGroup: "modal_product_provider_id modal_product_provider_name modal_product_provider_company_id",
            vendorNameGroup: "modal_product_vendor_id modal_product_vendor_name modal_product_vendor_company_id",
        },
        //*/
        rules: {
            modal_product_sku: {
                required: true,
            },
            modal_product_rating_types_id: {
                required: true,
            },
            modal_product_currency_id: {
                required: true,
            },
            modal_product_pricing_strategies_types_id: {
                required: true,
            },
            modal_product_name: {
                required: true,
            },
            modal_product_category_id: {
                required: true,
            },
            modal_product_provider_name: {
                required: true,
            },
            modal_product_provider_id: {
                required: true,
            },
            modal_product_provider_company_id: {
                required: true,
            },
            modal_product_vendor_name: {
                required: true,
            },
            modal_product_vendor_id: {
                required: true,
            },
            modal_product_vendor_company_id: {
                required: true,
            },
        },
        messages: {
            modal_product_sku: {
                required: "Field Required",
            },
            modal_product_rating_types_id: {
                required: "Field Required",
            },
            modal_product_currency_id: {
                required: "Field Required",
            },
            modal_product_pricing_strategies_types_id: {
                required: "Field Required",
            },
            modal_product_name: {
                required: "Field Required",
            },
            modal_product_provider_id: {
                required: "Field Required",
            },
            modal_product_category_id: {
                required: "Field Required",
            },
            modal_product_provider_name: {
                required: "Field Required",
            },
            modal_product_vendor_name: {
                required: "Field Required",
            },
            modal_product_provider_company_id: {
                required: "Field Required",
            },
            modal_product_vendor_id: {
                required: "Field Required",
            },
            modal_product_vendor_company_id: {
                required: "Field Required",
            },
        },
    }
    
    $(_button_add_product_page_heading)
      .on("click", function () {
          set_new_product_modal()
      })
    
    $(_modal_new_product)
      .on("hide.bs.modal", function () {
          clear_validation(_form_product_add)
      })
    
    $(_modal_button_cancel_add_product)
      .on("click", function () {
          clear_validation(_form_product_add)
          $(_modal_new_product).modal("hide")
      })
    
    $(_modal_button_submit_add_product)
      .on("click", function () {
          if (validate_new_form()) {
              confirmDialog(`Would you like to update?`, (ans) => {
                  if (ans) {
                      save_new()
                  }
              })
          }
      })
    
    $(_modal_product_provider_vendor_match)
      .on("change", function () {
          let provider_company_id = (isNaN(parseInt(_modal_product_provider_company_id.value))) ? null : parseInt(_modal_product_provider_company_id.value)
          
          if (provider_company_id !== null) {
              
              if (_modal_product_provider_vendor_match.checked) {
                  _modal_product_vendor_company_id.value = _modal_product_provider_company_id.value
                  
                  if (Provider.detail !== null) {
                      _modal_product_vendor_company_id.value = Provider.detail.vendor.company_id
                      _modal_product_vendor_id.value = Provider.detail.vendor.id
                      _modal_product_vendor_name.value = Provider.detail.vendor.name
                  } else {
                      _modal_product_vendor_company_id.value = ""
                      _modal_product_vendor_id.value = ""
                      _modal_product_vendor_name.value = ""
                  }
                  
              } else {
                  _modal_product_vendor_company_id.value = ""
                  _modal_product_vendor_id.value = ""
                  _modal_product_vendor_name.value = ""
              }
          }
      })
    
    const buildInsertData = function () {
        let dataToSend = {
            category_id: (!isNaN(parseInt(_modal_product_category_id.value))) ? parseInt(_modal_product_category_id.value) : null,
            pricing_strategy_types_id: (!isNaN(parseInt(_modal_product_pricing_strategies_types_id.value))) ? parseInt(_modal_product_pricing_strategies_types_id.value) : null,
            status_types_id: 1,
            currency_id: (!isNaN(parseInt(_modal_product_currency_id.value))) ? parseInt(_modal_product_currency_id.value) : null,
            location_id: (!isNaN(parseInt(_modal_product_location_id.value))) ? parseInt(_modal_product_location_id.value) : null,
            rating_types_id: (!isNaN(parseInt(_modal_product_rating_types_id.value))) ? parseInt(_modal_product_rating_types_id.value) : null,
            provider_id: (!isNaN(parseInt(_modal_product_provider_id.value))) ? parseInt(_modal_product_provider_id.value) : null,
            vendor_id: (!isNaN(parseInt(_modal_product_vendor_id.value))) ? parseInt(_modal_product_vendor_id.value) : null,
            provider_vendor_match: (((!isNaN(parseInt(_modal_product_provider_company_id.value))) ? parseInt(_modal_product_provider_company_id.value) : null) === ((!isNaN(parseInt(_modal_product_vendor_company_id.value))) ? parseInt(_modal_product_vendor_company_id.value) : null)) ? 1 : 0,
            name: _modal_product_name.value,
            sku: _modal_product_sku.value,
            use_provider_location_id: 1,
            //provider_company_id: (!isNaN(parseInt(_modal_product_provider_company_id.value))) ? parseInt(_modal_product_provider_company_id.value) : null,
            //vendor_company_id: (!isNaN(parseInt(_modal_product_vendor_company_id.value))) ? parseInt(_modal_product_vendor_company_id.value) : null,
            //vendor_name: _modal_product_vendor_name.value,
            //provider_name: _modal_product_provider_name.value,
            //provider_location_id: (!isNaN(parseInt(_modal_product_provider_location_id.value))) ? parseInt(_modal_product_provider_location_id.value) : null,
        }
        return remove_nulls(dataToSend)
    }
    
    const save_new = function () {
        Console.log("save_new()")
        let dataToSend = buildInsertData()
        
        Console.log("dataToSend", remove_nulls(dataToSend))
        
        new_product(dataToSend, function (data) {
            let product
            
            if (data) {
                Console.log("data", data)
                product = data
                if (data.length === 1) {
                    product = data[0]
                }
            }
            
            if (product.id) {
                window.location.replace("/products/" + product.id)
            }
        })
        
    }
    
    const new_product = function (dataToSend, callback) {
        let url = "/api/v1.0/products/add"
        
        if (dataToSend) {
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handle_product_error("Oops: 1")
                    }
                })
            } catch (e) {
                Console.log(e)
            }
        }
    }
    
    const init_new_product_autocomplete = function () {
        let category_id = (!isNaN(parseInt(_modal_product_category_id.value))) ? parseInt(_modal_product_category_id.value) : null
        
        if (category_id !== null) {
            $(_modal_product_name)
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
              
              })
              .on("click", function () {
                  $(this).select()
              })
              .autocomplete({
                  serviceUrl: "/api/v1.0/autocomplete/products",
                  minChars: 2,
                  params: { "category_id": category_id },
                  cache: false,
                  dataType: "json",
                  triggerSelectOnValidInput: false,
                  paramName: "st",
                  onSelect: function (suggestion) {
                      if (!suggestion || !suggestion.data) {
                          return
                      }
                      //Console.log("suggestion.data", suggestion.data)
                      let product = suggestion.data
                      Console.log("product", product)
                  },
              })
        }
        Console.log("init_new_product_autocomplete()", category_id)
    }
    
    const validate_new_form = function () {
        Console.log("validate_new_form", "")
        if (_form_product_add) {
            return $(_form_product_add).valid()
        }
        return false
    }
    
    const clear_modal_form = function () {
        _modal_product_name.value = ""
        _modal_product_category_id.value = ""
        _modal_product_sku.value = ""
        _modal_product_rating_types_id.value = ""
        _modal_product_currency_id.value = ""
        _modal_product_provider_company_id.value = ""
        _modal_product_vendor_company_id.value = ""
        _modal_product_vendor_name.disabled = true
        _modal_product_provider_name.disabled = true
        _modal_product_pricing_strategies_types_id.value = ""
        _modal_product_provider_location_id.value = ""
        _modal_product_location_id.value = ""
        Product.attr1 = null
        Product.attr2 = null
        Product.attr3 = null
        Product.update_product_sku()
        Product.reset_new_product_details()
        clear_validation(_form_product_add)
    }
    
    const reset_new_product_details = function () {
        _modal_product_provider_id.value = ""
        _modal_product_vendor_id.value = ""
        _modal_product_provider_name.value = ""
        _modal_product_vendor_name.value = ""
        //_modal_product_provider_name.disabled = true
        //_modal_product_vendor_name.disabled = true
        _modal_product_name.value = ""
        _modal_product_sku.value = ""
        _modal_product_rating_types_id.value = ""
        _modal_product_currency_id.value = ""
        _modal_product_pricing_strategies_types_id.value = ""
        _modal_product_name.disabled = true
        _modal_product_sku.disabled = true
        _modal_product_rating_types_id.disabled = true
        _modal_product_currency_id.disabled = true
        _modal_product_pricing_strategies_types_id.disabled = true
    }
    
    const set_new_product_modal = function () {
        clear_modal_form()
        $(_modal_new_product).modal("show")
    }
    
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
            keywords: [],
            seasons: [],
            units: [],
            use_provider_location: 0,
            variants: [],
            category: {},
            location: {},
            vendor: {},
            profiles: [],
            provider: {},
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
            detail.created_by = (product.created_by) ? product.created_by : user_id
            detail.date_modified = (product.date_modified) ? product.date_modified : formatDateMySQL()
            detail.modified_by = (product.modified_by) ? product.modified_by : user_id
            detail.note = (product.note) ? product.note : null
            detail.category = (product.category) ? product.category : {}
            detail.keywords = (product.keywords) ? product.keywords : []
            detail.seasons = (product.seasons) ? product.seasons : []
            detail.units = (product.units) ? product.units : []
            detail.use_provider_location = (product.use_provider_location) ? product.use_provider_location : 0
            detail.variants = (product.variants) ? product.variants : []
            detail.location = (product.location) ? product.location : {}
            detail.vendor = (product.vendor) ? product.vendor : {}
            detail.provider = (product.provider) ? product.provider : {}
        }
        
        Product.detail = detail
        return detail
    }
    
    const load_all = function (products) {
        Product.all = new Map()
        
        if (!products) {
            return
        }
        
        $.each(products, function (i, product) {
            let detail = set(product)
            $index_table.insertRow(detail)
            Product.all.set("id", detail)
        })
    }
    
    const build_index_table = function () {
        
        $index_table = $(_product_index_table).table({
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
                    title: "SKU",
                    targets: 1,
                    data: "sku",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "Provider",
                    targets: 2,
                    data: "provider",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data.name + "</span>"
                    },
                },
                {
                    title: "Vendor",
                    targets: 3,
                    data: "vendor",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data.name + "</span>"
                    },
                },
                {
                    title: "Location",
                    targets: 4,
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
                {
                    title: "Category",
                    targets: 5,
                    data: "category",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data.name + "</span>"
                    },
                },
            ],
            rowClick: Product.navigate,
        })
    }
    
    const navigate = function (product) {
        if (product && product.id) {
            window.location.replace(base_url + "/" + product.id)
        }
    }
    
    let provider_initial_location, product_initial_location = {}
    let radios = document.querySelectorAll('input[type=radio][name="location_to_use"]')
    const _use_provider_location = document.getElementById("use_provider_location")
    const _use_product_location = document.getElementById("use_product_location")
    
    const changeHandler = function (event) {
        Console.log("value", this.value)
        if (this.value === "use_provider_location") {
            Console.log("use_provider_location", provider_initial_location)
            Location.init(provider_initial_location)
        } else if (this.value === "use_product_location") {
            Console.log("use_product_location", product_initial_location)
            Location.init(product_initial_location)
        }
    }
    
    const init_autocomplete = function () {
        if (_modal_product_name) {
        
        }
    }
    
    const set_default_product_details = function () {
        return {
            location: {},
            provider: {},
            vendor: {},
            seasons: [],
            units: [],
            variants: [],
            profiles: [],
            matrix: [],
        }
    }
    
    const set_edit_form_values = function (product) {
        Console.log("Product.set_edit_form_values(product)", product)
        let provider, vendor, product_location,
          seasons, units, variants, profiles, provider_location
        
        if (product.location) {
            product_location = product.location
            Product.product_initial_location = product_location
        }
        Console.log("Product.init(): product_location", product_location)
        
        if (product.provider) {
            provider = product.provider
        }
        Console.log("Product.init(): provider", provider)
        
        if (provider.location) {
            provider_location = provider.location
            Product.provider_initial_location = provider_location
        }
        Console.log("Product.init(): provider_location", provider_location)
        
        if (product.vendor) {
            vendor = product.vendor
        }
        Console.log("Product.init(): vendor", vendor)
        
        if (product.seasons) {
            seasons = product.seasons
        }
        Console.log("Product.init(): seasons", seasons)
        
        if (product.units) {
            units = product.units
        }
        Console.log("Product.init(): units", units)
        
        if (product.variants) {
            variants = product.variants
        }
        Console.log("Product.init(): variants", variants)
        
        if (product.profiles) {
            profiles = product.profiles
        }
        Console.log("Product.init(): profiles", profiles)
        
        if (product.use_provider_location) {
            $(_use_provider_location).attr("checked", "true")
            Location.init(provider_location)
        } else {
            $(_use_product_location).attr("checked", "true")
            Location.init(product_location)
        }
        
        load_product_location(product_location)
        load_provider_location(provider_location)
    }
    
    const load_product_location = function (product_location) {
        Console.log("Product.load_product_location(product_location)", product_location)
        product_initial_location = product_location
        let $frame = $("#map-container-product-location").find("iframe")
        Console.log("$frame", $frame.attr("src"))
        let url = buildMapsURL(product_location)
        Console.log("url", url)
        $frame.attr("src", url)
    }
    
    const load_provider_location = function (provider_location) {
        Console.log("Product.load_provider_location(provider_location)", provider_location)
        provider_initial_location = provider_location
        let $frame = $("#map-container-provider-location").find("iframe")
        Console.log("$frame", $frame.attr("src"))
        let url = buildMapsURL(provider_location)
        Console.log("url", url)
        $frame.attr("src", url)
    }
    
    const init_edit_form = function (settings) {
        Console.log("Product.init_edit_form(settings)", settings)
        let product = set_default_product_details()
        
        if (settings) {
            product = settings
        }
        Console.log("Product.init_edit_form(): product", product)
        
        Array.prototype.forEach.call(radios, function (radio) {
            radio.addEventListener("change", changeHandler)
        })
        
        set_edit_form_values(product)
    }
    
    const init = function (settings) {
        Console.log("Product.init()", settings)
        let product_details
        
        if (_modal_new_product) {
            Category.init()
        }
        
        if (_product_edit_page) {
            if (settings) {
                if (settings.product_details) {
                    product_details = settings.product_details
                }
                
                //
                $(document).ready(function () {
                    init_edit_form(product_details)
                })
                
            }
            
            return true
        }
        
        if (_product_index_page) {
            Provider.init()
            Product.index(settings)
            if (_form_product_add) {
                validator_init(add_modal_form_rules)
                new_product_validator = $(_form_product_add).validate()
            }
            return true
        }
    }
    
    const index = function (settings) {
        
        if (_product_index_table) {
            build_index_table()
            
            if (settings) {
                load_all(settings)
            }
        }
    }
    
    const setNewFormDetails = function (category_id) {
        Console.log("setNewFormDetails()", category_id)
        
    }
    
    const update_product_sku = function () {
        let att1 = Product.attr1
        let att2 = Product.attr2
        let att3 = Product.attr3
        let sku = ""
        if (!is_null(att1) && !is_null(att2) && !is_null(att3)) {
            sku = att1.replace(/-/g, "") + "-" + att2.replace(/-/g, "") + "-" + att3.replace(/-/g, "")
            _modal_product_sku.value = sku
        } else {
            _modal_product_sku.value = ""
            if (is_null(att1)) {
                Console.log("att1 is null", att1)
            }
            
            if (is_null(att2)) {
                Console.log("att2 is null", att2)
            }
            
            if (is_null(att3)) {
                Console.log("att3 is null", att3)
            }
        }
        
    }
    
    return {
        validator: null,
        product_initial_location: null,
        provider_initial_location: null,
        detail: {},
        all: new Map(),
        attr1: null,
        attr2: null,
        attr3: null,
        update_product_sku: function () {
            update_product_sku()
        },
        setNewFormDetails: function (category_id) {
            Console.log("Product.setNewFormDetails()", category_id)
            setNewFormDetails(category_id)
        },
        get: function (params) {
            get(params)
        },
        init_autocomplete: function () {
            init_autocomplete()
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
        index: function (settings) {
            index(settings)
        },
        navigate: function (product) {
            navigate(product)
        },
        reset_new_product_details: function () {
            reset_new_product_details()
        },
        init_new_product_autocomplete: function () {
            init_new_product_autocomplete()
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
    
    window.addEventListener("resize", debounce(function (e) {
        resize_elements("end of resizing")
    }))
    
    if (mdbPreloader) {
        //$("#mdb-preloader").fadeOut(500)
    } else {
        Console.log("no preloader")
    }
    
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
    $(function () {
        $("[data-toggle=\"tooltip\"]").tooltip()
    })
    //toastr.info('I do not think that word means what you think it means.', 'Info!')
    //toastr.success('I do not think that word means what you think it means.', 'Success!')
    //toastr.warning('I do not think that word means what you think it means.', 'Warning!')
    //toastr.error('I do not think that word means what you think it means.', 'Error!')
})
