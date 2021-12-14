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
            //*
            console.log("data", data)
            console.log("status", status)
            console.log("xhr", xhr)
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
