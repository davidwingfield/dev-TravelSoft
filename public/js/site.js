const Util = (($) => {
    return {
        test: function () {},
    }
    
})(jQuery)

const Site = (function () {
    "use strict"
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    return {
        run: function () {
        
        },
    }
    ///////////////////////////////////////////////
})()

const tableCellMaxChars = 10
const default_address_view = "medium"
let DEBUGMODE = true

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
    console.log("resize_elements")
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

window.onload = function () {
    
    if (mdbPreloader) {
        $("#mdb-preloader").fadeOut(500)
    }
    $("#alert_box").hide()
    
    const but_toggle = document.querySelectorAll(".but_toggle")
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
    
    new WOW().init()
    
    $(this).scrollTop(0)
    
    toastr.options = {
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
    ////
    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual"
    }
    
    window.scrollTo(0, 0)
}
$(document).ready(function () {
    window.addEventListener("resize", debounce(function (e) {
        resize_elements("end of resizing")
    }))
    resize_elements("end of resizing")
    
    $(".button-collapse").sideNav({
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
        let _wrapper = $("#" + table_id + "_wrapper")
        let _wrapper_select = $("#" + table_id + "_wrapper select")
        let _wrapper_table = $("#" + table_id).parent("div")
        _wrapper_table
          .removeClass("col-sm-12")
          .addClass("p-0 m-0 w-100 h-100")
        _wrapper.find("label").each(function () {
            $(this).parent().append($(this).children())
        })
        
        _wrapper.find("div.row")
          .removeClass("row")
          .addClass("d-flex justify-content-between")
        
        _filter.find("input").each(function () {
            const $this = $(this)
            $this.attr("placeholder", "Search")
            $this.removeClass("form-control-sm")
        })
        
        _filter.find("label").remove()
        
        _filter.parent("div")
          .removeClass("col-sm-12 col-md-6")
          .addClass("w-50")
        
        //_length.addClass("d-flex justify-content-start")
        
        _length.parent("div")
          .removeClass("col-sm-12 col-md-6")
          .addClass("w-50")
        
        _length.find("label").each(function () {
            const $this = $(this)
            $this.addClass("mb-0 pb-0 mr-3 d-inline-block")
        })
        
        _wrapper_select.removeClass("custom-select custom-select-sm form-control form-control-sm")
        _wrapper_select.addClass("form-control d-inline-block")
        
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


Object.defineProperty(window, "__stack", {
    get: function () {
        var orig = Error.prepareStackTrace
        Error.prepareStackTrace = function (_, stack) {
            return stack
        }
        var err = new Error
        Error.captureStackTrace(err, arguments.callee)
        var stack = err.stack
        Error.prepareStackTrace = orig
        return stack
    },
})

Object.defineProperty(window, "__line", {
    get: function () {
        return __stack[1].getLineNumber()
    },
})

Object.defineProperty(window, "__function", {
    get: function () {
        return __stack[1].getFunctionName()
    },
})

Object.defineProperty(window, "__file", {
    get: function () {
        return __stack[1].getFileName()
    },
})

Object.defineProperty(window, "__logLineDetails", {
    get: function () {
        return {
            "columnNumber": __stack[1].getColumnNumber(),
            "functionName": __stack[1].getFunctionName(),
            "lineNumber": __stack[1].getLineNumber(),
            "fileName": __stack[1].getFileName(),
            "typeName": __stack[1].getTypeName(),
            "isEval": __stack[1].isEval(),
            "this": __stack[1].getThis(),
        }
    },
})

const Logger = (function () {
    "use strict"
    const log_scheme = {
        "trace": {
            color: "white",
            background: "transparent",
        },
        "debug": {
            color: "blue",
            background: "transparent",
        },
        "info": {
            color: "cyan",
            background: "transparent",
        },
        "warn": {
            color: "yellow",
            background: "transparent",
        },
        "error": {
            color: "red",
            background: "transparent",
        },
        "fatal": {
            color: "white",
            background: "red",
        },
    }
    let version = "1.00"
    let containerDiv = null
    let tabDiv = null
    let logDiv = null
    let visible = true     // flag for visibility
    let opened = false     // flag for toggle on/off
    let enabled = true     // does not accept log messages any more if it is false
    let logHeight = 215    // 204 + 2*padding + border-top
    let tabHeight = 20
    // for animation
    let animTime = 0
    let animDuration = 200 // ms
    let animFrameTime = 16  // ms
    
    let getTime = function () {
        let now = new Date()
        let hour = "0" + now.getHours()
        hour = hour.substring(hour.length - 2)
        let minute = "0" + now.getMinutes()
        minute = minute.substring(minute.length - 2)
        let second = "0" + now.getSeconds()
        second = second.substring(second.length - 2)
        return hour + ":" + minute + ":" + second
    }
    let getDate = function () {
        let now = new Date()
        let year = "" + now.getFullYear()
        let month = "0" + (now.getMonth() + 1)
        month = month.substring(month.length - 2)
        let date = "0" + now.getDate()
        date = date.substring(date.length - 2)
        return year + "-" + month + "-" + date
    }
    let getRequestAnimationFrameFunction = function () {
        let requestAnimationFrame = window.requestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.webkitRequestAnimationFrame
        if (requestAnimationFrame) {
            return function (callback) { return requestAnimationFrame(callback) }
        } else {
            return function (callback) { return setTimeout(callback, 16) }
        }
    }
    
    return {
        init: function () {
            // avoid redundant call
            if (containerDiv) {
                return true
            }
            
            // check if DOM is ready
            if (!document || !document.createElement || !document.body || !document.body.appendChild) {
                return false
            }
            
            // constants
            let CONTAINER_DIV = "loggerContainer"
            let TAB_DIV = "loggerTab"
            let LOG_DIV = "logger"
            let Z_INDEX = 9999
            
            // create logger DOM element
            containerDiv = document.getElementById(CONTAINER_DIV)
            if (!containerDiv) {
                // container
                containerDiv = document.createElement("div")
                containerDiv.id = CONTAINER_DIV
                containerDiv.setAttribute("style", "width:100%;" +
                  "margin:0;" +
                  "padding:0;" +
                  "text-align:left;" +
                  "box-sizing:border-box;" +
                  "position:fixed;" +
                  "left:0;" +
                  "z-index:" + Z_INDEX + ";" +
                  "bottom:" + (-logHeight) + "px;")  /* hide it initially */
                
                // tab
                tabDiv = document.createElement("div")
                tabDiv.id = TAB_DIV
                tabDiv.appendChild(document.createTextNode("LOG"))
                tabDiv.setAttribute("style", "width:40px;" +
                  "box-sizing:border-box;" +
                  "overflow:hidden;" +
                  "font:bold 10px verdana,helvetica,sans-serif;" +
                  "line-height:" + (tabHeight - 1) + "px;" +  /* subtract top-border */
                  "color:#fff;" +
                  "position:absolute;" +
                  "left:20px;" +
                  "top:" + -tabHeight + "px;" +
                  "margin:0; padding:0;" +
                  "text-align:center;" +
                  "border:1px solid #aaa;" +
                  "border-bottom:none;" +
                  /*"background:#333;" + */
                  "background:rgba(0,0,0,0.8);" +
                  "border-top-right-radius:8px;" +
                  "border-top-left-radius:8px;")
                // add mouse event handlers
                tabDiv.onmouseover = function () {
                    this.style.cursor = "pointer"
                    this.style.textShadow = "0 0 1px #fff, 0 0 2px #0f0, 0 0 6px #0f0"
                }
                tabDiv.onmouseout = function () {
                    this.style.cursor = "auto"
                    this.style.textShadow = "none"
                }
                tabDiv.onclick = function () {
                    Logger.toggle()
                    this.style.textShadow = "none"
                }
                
                // log message
                logDiv = document.createElement("div")
                logDiv.id = LOG_DIV
                logDiv.setAttribute("style", "font:12px monospace;" +
                  "height: " + logHeight + "px;" +
                  "box-sizing:border-box;" +
                  "color:#fff;" +
                  "overflow-x:hidden;" +
                  "overflow-y:scroll;" +
                  "visibility:hidden;" +
                  "position:relative;" +
                  "bottom:0px;" +
                  "margin:0px;" +
                  "padding:5px;" +
                  /*"background:#333;" + */
                  "background:rgba(0,0,0,0.8);" +
                  "border-top:1px solid #aaa;")
                
                // style for log message
                let span = document.createElement("span")  // for coloring text
                span.style.color = "#afa"
                span.style.fontWeight = "bold"
                
                // the first message in log
                let msg = "===== Log Started at " +
                  getDate() + ", " + getTime() + ", " +
                  "(Logger version " + version + ") " +
                  "====="
                
                span.appendChild(document.createTextNode(msg))
                logDiv.appendChild(span)
                logDiv.appendChild(document.createElement("br"))   // blank line
                logDiv.appendChild(document.createElement("br"))   // blank line
                
                // add divs to document
                containerDiv.appendChild(tabDiv)
                containerDiv.appendChild(logDiv)
                document.body.appendChild(containerDiv)
            }
            
            return true
        },
        
        print: function (title, msg, loginline, level) {
            
            if (!level) {
                level = "debug"
            }
            let type = typeof msg
            
            if (!enabled) {
                return
            }
            
            if (!title) {
                title = ""
            }
            
            if (!containerDiv) {
                let ready = this.init()
                if (!ready) {
                    return
                }
            }
            
            if (!msg) {
                msg = ""
            }
            
            let level_text = `[${loginline.lineNumber}] `
            
            let msgDefined = true
            
            // convert non-string type to string
            if (type === "object") {
                msg = JSON.stringify(msg, null, 4)
            } else if (type === "undefined") {
                msg = "undefined"
                msgDefined = false
            } else if (type === "function") {
                msg = "function"
                msgDefined = false
            } else if (msg === null) {
                msg = "null"
                msgDefined = false
            }
            
            if (msg instanceof Array) {
                msg = this.arrayToString(msg)
            } else if (type === "object") {
                msg = `[${loginline.functionName}:${loginline.lineNumber}] [${level.toUpperCase()}] [${loginline.fileName}] "${title}" (object)\n ${msg}`
            } else if (type === "number") {
                msg = `[${level.toUpperCase()}] "${title}" (number)\n ${msg}`
            } else if (type === "string") {
                msg = `'${title}' (string) ${msg}`
            } else if (type === "boolean") {
                msg = `'${title}' (bool) ${msg}`
            } else {
                msg += ""
            }
            
            let lines = msg.split(/\r\n|\r|\n/)
            
            for (let i = 0, c = lines.length; i < c; ++i) {
                // format time and put the text node to inline element
                let timeDiv = document.createElement("div")            // color for time
                timeDiv.setAttribute("style", "color:#999;" +
                  "float:left;")
                let mLeft = "0"
                if (i === 0) {
                    let timeNode = document.createTextNode(getDate() + " " + getTime() + "\u00a0")
                    timeDiv.appendChild(timeNode)
                    mLeft = "6.0em"
                }
                
                // create message span
                let msgDiv = document.createElement("div")
                msgDiv.setAttribute("style", "word-wrap:break-word;" +  // wrap msg
                  "margin-left:" + mLeft + ";")
                if (!msgDefined) {
                    msgDiv.style.color = "#afa"
                }
                
                // put message into a text node
                let line = lines[i].replace(/ /g, "\u00a0")
                let msgNode = document.createTextNode(line)
                msgDiv.appendChild(msgNode)
                
                // new line div with clearing css float property
                let newLineDiv = document.createElement("div")
                newLineDiv.setAttribute("style", "clear:both;")
                
                logDiv.appendChild(timeDiv)
                logDiv.appendChild(msgDiv)
                logDiv.appendChild(newLineDiv)
                
                logDiv.scrollTop = logDiv.scrollHeight
            }
        },
        trace: function (title, msg, loginline) {
            if (arguments.length === 0) {
                Logger.print("")
            }// print a blank line
            else {
                Logger.print(title, msg, loginline, "trace")
            }
        },
        debug: function (title, msg, loginline) {
            if (arguments.length === 0) {
                Logger.print("")
            }// print a blank line
            else {
                Logger.print(title, msg, loginline, "debug")
            }
        },
        info: function (title, msg, loginline) {
            if (arguments.length === 0) {
                Logger.print("")
            }// print a blank line
            else {
                Logger.print(title, msg, loginline, "info")
            }
        },
        warn: function (title, msg, loginline) {
            if (arguments.length === 0) {
                Logger.print("")
            }// print a blank line
            else {
                Logger.print(title, msg, loginline, "info")
            }
        },
        error: function (title, msg, loginline) {
            if (arguments.length === 0) {
                Logger.print("")
            }// print a blank line
            else {
                Logger.print(title, msg, loginline, "info")
            }
        },
        toggle: function () {
            if (opened)  // if opened, close the window
            {
                this.close()
            } else        // if closed, open the window
            {
                this.open()
            }
        },
        open: function () {
            if (!this.init()) {
                return
            }
            if (!visible) {
                return
            }
            if (opened) {
                return
            }
            
            logDiv.style.visibility = "visible"
            animTime = Date.now()
            let requestAnimationFrame = getRequestAnimationFrameFunction()
            requestAnimationFrame(slideUp)
            
            
            function slideUp () {
                let duration = Date.now() - animTime
                if (duration >= animDuration) {
                    containerDiv.style.bottom = 0
                    opened = true
                    return
                }
                let y = Math.round(-logHeight * (1 - 0.5 * (1 - Math.cos(Math.PI * duration / animDuration))))
                containerDiv.style.bottom = "" + y + "px"
                requestAnimationFrame(slideUp)
            }
        },
        close: function () {
            if (!this.init()) {
                return
            }
            if (!visible) {
                return
            }
            if (!opened) {
                return
            }
            
            animTime = Date.now()
            let requestAnimationFrame = getRequestAnimationFrameFunction()
            requestAnimationFrame(slideDown)
            
            
            function slideDown () {
                let duration = Date.now() - animTime
                if (duration >= animDuration) {
                    containerDiv.style.bottom = "" + -logHeight + "px"
                    logDiv.style.visibility = "hidden"
                    opened = false
                    return
                }
                let y = Math.round(-logHeight * 0.5 * (1 - Math.cos(Math.PI * duration / animDuration)))
                containerDiv.style.bottom = "" + y + "px"
                requestAnimationFrame(slideDown)
            }
        },
        show: function () {
            if (!this.init()) {
                return
            }
            
            containerDiv.style.display = "block"
            visible = true
        },
        hide: function () {
            if (!this.init()) {
                return
            }
            
            containerDiv.style.display = "none"
            visible = false
        },
        enable: function () {
            if (!this.init()) {
                return
            }
            
            enabled = true
            tabDiv.style.color = "#fff"
            logDiv.style.color = "#fff"
        },
        disable: function () {
            if (!this.init()) {
                return
            }
            
            enabled = false
            tabDiv.style.color = "#666"
            logDiv.style.color = "#666"
        },
        clear: function () {
            if (!this.init()) {
                return
            }
            
            logDiv.innerHTML = ""
        },
        arrayToString: function (array) {
            let str = "["
            for (let i = 0, c = array.length; i < c; ++i) {
                if (array[i] instanceof Array) {
                    str += this.arrayToString(array[i])
                } else {
                    str += array[i]
                }
                
                if (i < c - 1) {
                    str += ", "
                }
            }
            str += "]"
            return str
        },
    }
    
})()

const Location = (function () {
    "use strict"
    
    //------------------------------------------------------------------
    
    const _form_edit_location = document.getElementById("form_edit_location")
    const _form_location_details = document.getElementById("form_location_details")
    const _location_types_id = document.getElementById("location_types_id")
    const _location_name_filter = document.getElementById("location_name_filter")
    const _location_city_id = document.getElementById("location_city_id")
    const _location_country_id = document.getElementById("location_country_id")
    const _location_province_id = document.getElementById("location_province_id")
    const _location_id = document.getElementById("location_id")
    const _location_street = document.getElementById("location_street")
    const _location_street2 = document.getElementById("location_street2")
    const _location_zipcode = document.getElementById("location_zipcode")
    const _location_name = document.getElementById("location_name")
    const _temp_location_id = document.getElementById("temp_location_id")
    // -- Buttons
    const _button_close_location_edit = document.getElementById("button_close_location_edit")
    const _button_submit_form_edit_location = document.getElementById("button_submit_form_edit_location")
    const _button_edit_location = document.getElementById("button_edit_location")
    const _button_add_location_edit = document.getElementById("button_add_location_edit")
    
    //------------------------------------------------------------------
    
    let validator
    let validated = false
    let default_display = default_address_view
    
    //------------------------------------------------------------------
    
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
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    //------------------------------------------------------------------
    
    $(_button_close_location_edit)
      .on("click", function () {
          hide_form()
      })
    
    $(_button_add_location_edit)
      .on("click", function () {
          set_detail()
          reset_form()
          populate_form()
      })
    
    $(_location_name_filter)
      .on("click", function () {
          $(this).select()
      })
      .on("change", function () {
          if ($(this).val() === "") {
              set_detail()
              reset_form()
              populate_form()
          }
      })
      .on("search", function () {
          set_detail()
          reset_form()
          populate_form()
      })
    
    $("input[name='location_display']")
      .on("change", function () {
          let selected_value = $("input[name='location_display']:checked").val()
          default_display = selected_value
          init_autocomplete()
          if (Location.detail["location_" + selected_value] !== null) {
              _location_name_filter.value = Location.detail["location_" + selected_value]
          }
      })
    
    $(_button_edit_location)
      .on("click", function () {
          if (_location_id.value === "") {
              set_detail()
              reset_form()
              populate_form()
          } else {
          
          }
          
          show_form()
          
      })
    
    $(_button_submit_form_edit_location)
      .on("click", function () {
          Location.save()
      })
    
    $(_location_country_id)
      .on("change", function () {
          if (validated) {
              validate_form()
          }
      })
    
    $(_location_province_id)
      .on("change", function () {
          if (validated) {
              validate_form()
          }
      })
    
    $(_location_types_id)
      .on("change", function () {
          if (validated) {
              validate_form()
          }
      })
    
    $(_location_city_id)
      .on("change", function () {
          if (validated) {
              validate_form()
          }
      })
    
    //------------------------------------------------------------------
    
    const init_autocomplete = function () {
        $(_location_name_filter)
          .autocomplete({
              serviceUrl: "/autocomplete/locations",
              minChars: 2,
              cache: false,
              dataType: "json",
              triggerSelectOnValidInput: false,
              paramName: "st",
              params: { "default_display": default_display },
              onSelect: function (suggestion) {
                  Province.set_detail(suggestion.data)
                  Country.set_detail(suggestion.data)
                  City.set_detail(suggestion.data)
                  Location.set_detail(suggestion.data)
                  populate_form(suggestion.data)
                  clear_validation(_form_edit_location)
                  /*
                  console.log("----")
                  console.log(Country.detail)
                  console.log(Province.detail)
                  console.log(City.detail)
                  //console.log(suggestion.data)
                  //console.log(Location.detail)
                  console.log("----")
                  //*/
              },
              onSearchComplete: function (query, suggestions) {
              },
          })
    }
    
    //------------------------------------------------------------------
    
    const handle_location_error = function (msg) {
        toastr.error(msg)
    }
    
    const update_location_record = function (dataToSend) {
        if (dataToSend) {
            try {
                
                sendPostRequest("/locations/update", dataToSend, function (data, status, xhr) {
                    //console.log(data)
                    if (data) {
                        if (data.location_id) {
                            _location_id.value = data.location_id
                            validated = false
                            Province.set_detail(data)
                            Country.set_detail(data)
                            City.set_detail(data)
                            Location.set_detail(data)
                            populate_form(data)
                            hide_form()
                            toastr.success("Location: " + data.location_id + " created")
                        }
                        
                    } else {
                        return handle_location_error("Error: 1")
                    }
                })
                
            } catch (e) {
                console.log(e)
                return handle_location_error("Error: Validating Location")
            }
        } else {
            return handle_location_error("Error: Loading Location - Missing Data")
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
    
    //------------------------------------------------------------------
    
    const show_form = function () {
        disable()
        $(_form_location_details).show()
    }
    
    const hide_form = function () {
        enable()
        $(_form_location_details).hide()
    }
    
    const reset_form = function () {
        validated = false
        validator.resetForm()
        _location_name.value = ""
        _location_name_filter.value = ""
        _location_id.value = ""
        _location_types_id.value = ""
        _location_street.value = ""
        _location_street2.value = ""
        _location_zipcode.value = ""
        _location_country_id.value = ""
        _location_province_id.value = ""
        _location_city_id.value = ""
        Province.set_detail()
        Country.set_detail()
        City.id = null
        $(_location_country_id).val("").trigger("change")
        
        document.getElementById("location_display_medium").checked = true
        
    }
    
    const populate_form = function (location) {
        
        if (location) {
            Province.set_detail(location)
            Country.set_detail(location)
            City.set_detail(location)
        }
        
        _location_name_filter.value = Location.detail.location
        _location_name.value = Location.detail.name
        _location_id.value = Location.detail.id
        $(_location_types_id).val(Location.detail.location_types_id).trigger("change")
        _location_street.value = Location.detail.street
        _location_street2.value = Location.detail.street2
        _location_zipcode.value = Location.detail.zipcode
        $(_location_country_id).val((Location.detail.country_id) ? Location.detail.country_id : "").trigger("change")
        $(_temp_location_id).val(Location.detail.id).trigger("change")
    }
    
    const validate_form = function () {
        return $(_form_edit_location).valid()
    }
    
    //------------------------------------------------------------------
    
    const clear_detail = function () {
        return {
            id: null,
            location_long: null,
            location_short: null,
            location_medium: null,
            location: null,
            city_id: null,
            province_id: null,
            country_id: null,
            location_types_id: null,
            created_by: null,
            modified_by: null,
            name: null,
            street: null,
            street2: null,
            zipcode: null,
            enabled: null,
            date_created: null,
            date_modified: null,
            note: null,
        }
    }
    
    const set_detail = function (location) {
        let details = clear_detail()
        
        if (location) {
            details.location_long = (location.location_long) ? location.location_long : null
            details.location_medium = (location.location_medium) ? location.location_medium : null
            details.location_short = (location.location_short) ? location.location_short : null
            details.location = (location.location) ? location.location : null
            details.id = (location.location_id) ? location.location_id : null
            details.city_id = (location.location_city_id) ? location.location_city_id : null
            details.province_id = (location.location_province_id) ? location.location_province_id : null
            details.country_id = (location.location_country_id) ? location.location_country_id : null
            details.location_types_id = (location.location_types_id) ? location.location_types_id : null
            details.created_by = (location.location_created_by) ? location.location_created_by : null
            details.modified_by = (location.location_modified_by) ? location.location_modified_by : null
            details.name = (location.location_name) ? location.location_name : null
            details.street = (location.location_street) ? location.location_street : null
            details.street2 = (location.location_street2) ? location.location_street2 : null
            details.zipcode = (location.location_zipcode) ? location.location_zipcode : null
            details.enabled = (location.location_enabled) ? location.location_enabled : null
            details.date_created = (location.location_date_created) ? location.location_date_created : null
            details.date_modified = (location.location_date_modified) ? location.location_date_modified : null
            details.note = (location.location_note) ? location.location_note : null
            Province.set_detail(location)
            Country.set_detail(location)
            City.set_detail(location)
        }
        
        Location.detail = details
    }
    
    //------------------------------------------------------------------
    
    const set = function (settings) {
        set_detail(settings)
        reset_form()
        populate_form(settings)
    }
    
    const save = function () {
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
        
        if (validate_form()) {
            let r = confirm("Are you sure you want to edit this record?")
            if (r === true) {
                update_location_record(remove_nulls(dataToSend))
            }
        }
        
    }
    
    //------------------------------------------------------------------
    
    const init = function (settings) {
        validator_init(form_rules)
        validator = $(_form_edit_location).validate()
        
        if (settings) {
            if (settings.types.location_types) {
                Location.types = buildMap(settings.types.location_types, "location_types_id")
            }
        }
        
        if (_form_edit_location) {
            
            $(_location_types_id).BuildDropDown({
                data: Array.from(Location.types.values()),
                title: "Location Types",
                id_field: "location_types_id",
                text_field: "location_types_name",
                first_selectable: false,
            })
            
            $(_location_country_id).BuildDropDown({
                data: Array.from(Country.all.values()),
                title: "Country",
                id_field: "country_id",
                text_field: "country_name",
                first_selectable: false,
            })
            
            $(_location_province_id).BuildDropDown({
                data: Array.from(Province.all.values()),
                title: "Province",
                id_field: "province_id",
                text_field: "province_name",
                first_selectable: false,
            })
            
            $(_location_city_id).BuildDropDown({
                data: Array.from(Province.all.values()),
                title: "City",
                id_field: "city_id",
                text_field: "city_name",
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
        hide_form()
        
    }
    
    //------------------------------------------------------------------
    
    return {
        detail: {
            id: null,
            city_id: null,
            province_id: null,
            country_id: null,
            location_types_id: null,
            created_by: null,
            modified_by: null,
            name: null,
            street: null,
            street2: null,
            zipcode: null,
            enabled: null,
            date_created: null,
            date_modified: null,
            note: null,
        },
        all: [],
        types: [],
        types_detail: {
            id: null,
            created_by: null,
            modified_by: null,
            name: null,
            icon: null,
            enabled: null,
            date_created: null,
            date_modified: null,
            note: null,
        },
        save: function () {
            save()
        },
        set: function (settings) {
            set(settings)
        },
        set_detail (location) {
            set_detail(location)
        },
        init: function (settings) {
            init(settings)
        },
    }
    
})()

const Product = (function ($) {
    "use strict"
    ///////////////////////////////////////////////
    const _category_id = document.getElementById("category_id")
    const _product_id = document.getElementById("product_id")
    const _product_name = document.getElementById("product_name")
    const _product_sku = document.getElementById("product_sku")
    const _product_rating_id = document.getElementById("product_rating_id")
    const _pricing_strategy_id = document.getElementById("pricing_strategy_id")
    const _currency_id = document.getElementById("currency_id")
    const _product_description_short = document.getElementById("product_description_short")
    const _product_description_long = document.getElementById("product_description_long")
    const _view_all = document.getElementById("view_all")
    const _view_sales = document.getElementById("view_sales")
    const _view_ops = document.getElementById("view_ops")
    const _view_management = document.getElementById("view_management")
    const _table_product_index = document.getElementById("table_product_index")
    const _product_edit_form = document.getElementById("product_edit_form")
    const _product_edit = document.getElementById("product_edit")
    const _product_unit_edit_form = document.getElementById("product_unit_edit_form")
    const _product_vendor_edit_form = document.getElementById("product_vendor_edit_form")
    const _product_type_sort = document.getElementById("product_type_sort")
    const _button_product_edit_save_detail = document.getElementById("button_product_edit_save_detail")
    const _product_enabled = document.getElementById("product_enabled")
    
    ///////////////////////////////////////////////
    const _tab_product_edit_meta = document.getElementById("tab_product_edit_meta")
    const _tab_product_edit_season = document.getElementById("tab_product_edit_season")
    const _tab_product_edit_unit = document.getElementById("tab_product_edit_unit")
    const _tab_product_edit_variant = document.getElementById("tab_product_edit_variant")
    const _tab_product_edit_inventory = document.getElementById("tab_product_edit_inventory")
    const _tab_product_edit_pricing = document.getElementById("tab_product_edit_pricing")
    ///////////////////////////////////////////////
    let is_new = true
    let $index_table = $(_table_product_index)
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    ///////////////////////////////////////////////
    $(_button_product_edit_save_detail)
      .on("click", function () {
          alert("Product Save")
      })
    $(_product_type_sort)
      .on("change", function () {
          alert("Product Filter by Category")
      })
    $(_view_all)
      .on("change", function () {
          set_all_viewable_options(this.checked)
      })
    $(_view_management)
      .on("change", function () {
          if (this.checked === true) {
              if (_view_ops.checked === true && _view_sales.checked === true) {
                  _view_all.checked = true
              }
          } else if (this.checked === false) {
              if (_view_ops.checked === false && _view_sales.checked === false) {
                  _view_all.checked = false
              }
          } else {
              _view_all.checked = false
          }
      })
    $(_view_ops)
      .on("change", function () {
          if (this.checked === true) {
              if (_view_management.checked === true && _view_sales.checked === true) {
                  _view_all.checked = true
              }
          } else if (this.checked === false) {
              if (_view_management.checked === false && _view_sales.checked === false) {
                  _view_all.checked = false
              }
          } else {
              _view_all.checked = false
          }
      })
    $(_view_sales)
      .on("change", function () {
          if (this.checked === true) {
              if (_view_management.checked === true && _view_ops.checked === true) {
                  _view_all.checked = true
              }
          } else if (this.checked === false) {
              if (_view_management.checked === false && _view_ops.checked === false) {
                  _view_all.checked = false
              }
          } else {
              _view_all.checked = false
          }
      })
    ///////////////////////////////////////////////
    const set_all_viewable_options = function (option) {
        _view_sales.checked = option
        _view_ops.checked = option
        _view_management.checked = option
    }
    const validate_form = function () {
        Provider.validator = validator_init(form_rules)
        let tabs = $("#provider_edit_tabs>div.panel-heading.panel-heading-tab>ul.nav.nav-tabs>li.nav-item>a.nav-link")
        let panels = $("#provider_edit_tabs > div.panel-body > div.tab-content > div.tab-pane")
        let is_valid = $(_form_edit_product).valid()
        
        if (!is_valid) {
            
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
            
        }
        
        return is_valid
    }
    const validate = function () {
        if (_product_id) {
            if (_product_id.value === "") {
                $(_tab_product_edit_season).addClass("disabled")
                $(_tab_product_edit_unit).addClass("disabled")
                $(_tab_product_edit_variant).addClass("disabled")
                $(_tab_product_edit_inventory).addClass("disabled")
                $(_tab_product_edit_pricing).addClass("disabled")
                $(_tab_product_edit_meta).addClass("disabled")
            } else {
                $(_tab_product_edit_season).removeClass("disabled")
                $(_tab_product_edit_unit).removeClass("disabled")
                $(_tab_product_edit_variant).removeClass("disabled")
            }
        }
        
    }
    
    const trim_obj_name = function (obj) {
        let temp = {}
        if (obj) {
            $.each(obj, function (ind, val) {
                let str = ind.replace("product_product_", "")
                str = str.replace("product_", "")
                temp[str] = val
            })
        }
        
        return temp
    }
    
    const populate_form = function () {
        clear()
        $(_category_id).val(Product.detail.category_id).trigger("change")
        $(_product_id).val(Product.detail.id).trigger("change")
        _product_name.value = Product.detail.name
        _product_enabled.checked = (Product.detail.enabled === 1)
        $(_product_sku).val(Product.detail.sku).trigger("change")
        $(_product_rating_id).val(Product.detail.rating).trigger("change")
        $(_pricing_strategy_id).val(Product.detail.pricing_strategy_types_id).trigger("change")
        $(_currency_id).val(Product.detail.currency_id).trigger("change")
        $(_product_description_short).val(Product.detail.description_short).trigger("change")
        $(_product_description_long).val(Product.detail.description_long).trigger("change")
        _view_all.checked = (Product.detail.view_all === 1)
        _view_sales.checked = (Product.detail.view_sales === 1)
        _view_ops.checked = (Product.detail.view_ops === 1)
        _view_management.checked = (Product.detail.view_management === 1)
    }
    
    const clear = function () {
        _category_id.value = ""
        _product_id.value = ""
        _product_name.value = ""
        _product_sku.value = ""
        _product_rating_id.value = ""
        _pricing_strategy_id.value = ""
        _currency_id.value = ""
        _product_description_short.value = ""
        _product_description_long.value = ""
        _view_all.checked = true
        _view_sales.checked = true
        _view_ops.checked = true
        _view_management.checked = true
    }
    
    const set = function (product) {
        if (!product) {
            product = {}
        }
        product = trim_obj_name(product)
        
        Product.detail = {
            api_id: (product.api_id) ? product.api_id : null,
            arrive_time: (product.arrive_time) ? product.arrive_time : null,
            arrive_to: (product.arrive_to) ? product.arrive_to : null,
            category_id: (product.category_id) ? product.category_id : null,
            child: (product.child) ? product.child : null,
            city_id: (product.city_id) ? product.city_id : null,
            cover_image: (product.cover_image) ? product.cover_image : "/assets/img/placeholder.jpg",
            created_by: (product.created_by) ? product.created_by : user_id,
            currency_id: (product.currency_id) ? product.currency_id : null,
            date_created: (product.date_created) ? product.date_created : formatDateMySQL(),
            date_modified: (product.date_modified) ? product.date_modified : formatDateMySQL(),
            day_span: (product.day_span) ? product.day_span : null,
            depart_from: (product.depart_from) ? product.depart_from : null,
            depart_time: (product.depart_time) ? product.depart_time : null,
            description_long: (product.description_long) ? product.description_long : null,
            description_short: (product.description_short) ? product.description_short : null,
            enabled: (product.enabled) ? product.enabled : 1,
            from_api: (product.from_api) ? product.from_api : null,
            hotel_code: (product.hotel_code) ? product.hotel_code : null,
            id: (product.id) ? product.id : null,
            infant: (product.infant) ? product.infant : null,
            location_id: (product.location_id) ? product.location_id : null,
            modified_by: (product.modified_by) ? product.modified_by : user_id,
            name: (product.name) ? product.name : null,
            phone: (product.phone) ? product.phone : null,
            pricing_strategy_types_id: (product.pricing_strategy_types_id) ? product.pricing_strategy_types_id : null,
            provider_id: (product.provider_id) ? product.provider_id : null,
            provider_vendor_match: (product.provider_vendor_match) ? product.provider_vendor_match : 1,
            rating: (product.rating) ? product.rating : null,
            sku: (product.sku) ? product.sku : null,
            status_types_id: (product.status_types_id) ? product.status_types_id : 4,
            teen: (product.teen) ? product.teen : null,
        }
        populate_form()
        /*
        console.log("Product.detail", Product.detail)
        //*/
    }
    
    const build_index_table = function () {
        if (_table_product_index) {
            $index_table = $(_table_product_index).table({
                table_type: "display_list",
                data: Array.from(Product.all.values()),
                columnDefs: [
                    {
                        title: "Id",
                        targets: 0,
                        data: "product_id",
                    },
                    {
                        title: "Category",
                        targets: 1,
                        data: "category_name",
                        render: function (data, type, row, meta) {
                            return `<span class='' style='white-space: nowrap'>${data}</span>`
                        },
                    },
                    {
                        title: "Name",
                        targets: 2,
                        data: "product_table_display",
                        render: function (data, type, row, meta) {
                            return `<span class='' style='white-space: nowrap'>${data}</span>`
                        },
                    },
                    {
                        title: "Provider",
                        targets: 3,
                        data: "provider_name",
                        render: function (data, type, row, meta) {
                            return `<span class='' style='white-space: nowrap'>${data}</span>`
                        },
                    },
                    {
                        title: "Enabled",
                        targets: 4,
                        data: "product_enabled",
                        render: function (data, type, row, meta) {
                            let text = `<span class='text-primary' style='white-space: nowrap'>Enabled</span>`
                            if (data === 0 || data === false) {
                                text = `<span class='text-danger' style='white-space: nowrap'>Disabled</span>`
                            }
                            return text
                        },
                    },
                ],
                rowClick: Product.navigate,
            })
        }
    }
    
    const navigate = function (product_id) {
        if (!product_id) {
            return
        }
        window.location.href = `/products/${product_id}`
    }
    
    const load_products = function (products) {
        $.each(products, function (i, product) {
            Product.all.set(product.product_id, product)
            /*
            console.log("product: ", product)
            //*/
        })
        /*
        console.log("Product.all", Product.all)
        //*/
    }
    
    const handle_product_error = function (error) {
        console.log("-- handle_product_error() --", error)
        toastr.error(error)
    }
    
    const set_autocomplete = function (category_id) {
        console.log("category_id", category_id)
        $(_product_name)
          .autocomplete({
              serviceUrl: "/autocomplete/products",
              minChars: 2,
              noCache: true,
              triggerSelectOnValidInput: false,
              dataType: "json",
              paramName: "st",
              params: { "categoryId": parseInt(category_id) },
              onSelect: function (suggestion) {
                  //console.log("-- productName:autocomplete - suggestion --")
                  //$("#productName").val(suggestion.data.product_name)
                  console.log("suggestion", suggestion.data)
              },
          })
    }
    ///////////////////////////////////////////////
    const init_index = function (settings) {
        console.log("settings", settings)
        Product.all = new Map()
        if (settings) {
            if (settings.products_list) {
                load_products(settings.products_list)
            }
        }
        build_index_table()
        
    }
    
    const init_edit = function (settings) {
        //*
        console.log("Product.init_edit", settings)
        //*/
        if (settings) {
            clear()
            if (settings.product) {
                set(settings.product)
                Provider.load_product_edit(settings)
                if (settings.product_seasons) {
                    Season.init_product_edit(settings.product_seasons)
                    $(_tab_product_edit_season).removeClass("disabled")
                }
                
            }
            
            if (settings.categories) {
                Category.load(settings.categories)
            }
            validate()
        }
        
    }
    ///////////////////////////////////////////////
    return {
        detail: {
            api_id: null,
            arrive_time: null,
            arrive_to: null,
            category_id: null,
            child: null,
            city_id: null,
            cover_image: "/assets/img/placeholder.jpg",
            created_by: user_id,
            currency_id: null,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
            day_span: null,
            depart_from: null,
            depart_time: null,
            description_long: null,
            description_short: null,
            enabled: null,
            from_api: null,
            hotel_code: null,
            id: null,
            infant: null,
            location_id: null,
            modified_by: user_id,
            name: null,
            phone: null,
            pricing_strategy_types_id: null,
            provider_id: null,
            provider_vendor_match: 1,
            rating: null,
            sku: null,
            status_types_id: 4,
            teen: null,
            
        },
        types: new Map(),
        all: new Map(),
        navigate: function (product) {
            if (product.product_id) {
                if (product.product_id) {
                    navigate(product.product_id)
                }
            }
            
        },
        init_edit: function (settings) {
            init_edit(settings)
        },
        init_index: function (settings) {
            init_index(settings)
        },
        set_autocomplete: function (category_id) {
            set_autocomplete(category_id)
        },
        init: function () {
            validate()
        },
    }
    ///////////////////////////////////////////////
})(jQuery)

const Unit = (function () {
    "use strict"
    
    const init = function (settings) {
    
    }
    
    return {
        detail: {},
        all: new Map(),
        init: function (settings) {
            init(settings)
        },
    }
    
})()

const Pricing = (function () {
    "use strict"
    ///////////////////////////////////////////////
    const _pricing_strategy_id = document.getElementById("pricing_strategy_id")
    ///////////////////////////////////////////////
    const init = function (settings) {
    
    }
    
    const load = function (settings) {
    
    }
    ///////////////////////////////////////////////
    return {
        detail: {},
        all: new Map(),
        init: function (settings) {
            init(settings)
        },
    }
    
})()

const Variant = (function () {
    "use strict"
    
    const init = function (settings) {
    
    }
    
    return {
        detail: {},
        all: new Map(),
        init: function (settings) {
            init()
        },
    }
    
})()
Variant.init()

const Season = (function () {
    "use strict"
    ///////////////////////////////////////////////
    const _table_product_seasons = document.getElementById("table_product_seasons")
    const _select_season_assign_type = document.getElementById("select_season_assign_type")
    const _block_edit = document.getElementById("block_edit")
    const _show_titles = document.getElementById("show_titles")
    const _background_color = document.getElementById("background_color")
    const _background_color_display = document.getElementById("background_color_display")
    const _border_color = document.getElementById("border_color")
    const _border_color_display = document.getElementById("border_color_display")
    const _text_color = document.getElementById("text_color")
    const _text_color_display = document.getElementById("text_color_display")
    const _season_name = document.getElementById("season_name")
    const _season_id = document.getElementById("season_id")
    const _button_edit_product_delete_selected = document.getElementById("button_edit_product_delete_selected")
    const _button_edit_product_new_season_toggle = document.getElementById("button_edit_product_new_season_toggle")
    const _enable_all_seasons = document.getElementById("enable_all_seasons")
    const _enable_season_sunday = document.getElementById("enable_season_sunday")
    const _enable_season_monday = document.getElementById("enable_season_monday")
    const _enable_season_tuesday = document.getElementById("enable_season_tuesday")
    const _enable_season_wednesday = document.getElementById("enable_season_wednesday")
    const _enable_season_thursday = document.getElementById("enable_season_thursday")
    const _enable_season_friday = document.getElementById("enable_season_friday")
    const _enable_season_saturday = document.getElementById("enable_season_saturday")
    const _season_enabled = document.getElementById("season_enabled")
    const _product_season_edit_form = document.getElementById("product_season_edit_form")
    const _calendar_season = document.getElementById("calendar_season")
    const _category_id = document.getElementById("category_id")
    const _button_product_edit_add_dates_to_season = document.getElementById("button_product_edit_add_dates_to_season")
    const _button_edit_product_save_season = document.getElementById("button_edit_product_save_season")
    const _button_edit_product_clear_season = document.getElementById("button_edit_product_clear_season")
    const days = [
        "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday",
    ]
    const colors = [
        {
            id: 5,
            title: "Low",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgb(54, 162, 235)",
        },
        {
            id: 1,
            title: "High",
            backgroundColor: "rgba(255, 99, 132, .2)",
            borderColor: "rgb(255, 99, 132)",
        },
        {
            id: 4,
            title: "Low",
            backgroundColor: "rgba(132, 202, 133, 0.3)",
            borderColor: "rgb(132, 202, 133)",
        },
        {
            id: 3,
            title: "Medium",
            backgroundColor: "rgba(255, 216, 2, 0.4)",
            borderColor: "rgb(255, 216, 2)",
        },
        {
            id: 6,
            title: "Other",
            backgroundColor: "rgba(165, 117, 210, 0.3)",
            borderColor: "rgb(165, 117, 210)",
        },
        {
            id: 2,
            title: "Medium High",
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderColor: "rgb(255, 159, 64)",
        },
        {
            id: 7,
            title: "None",
            backgroundColor: "rgba(181, 126, 80, 0.4)",
            borderColor: "rgb(181, 126, 80)",
        },
        {
            id: 10,
            title: "None",
            backgroundColor: "rgba(254, 187, 209, 0.4)",
            borderColor: "rgb(254, 187, 209)",
        },
    
    ]
    
    ///////////////////////////////////////////////
    let $product_edit_table = $(_table_product_seasons)
    let months_shown = 6
    let disabled_dow = []
    let event_limit = 3
    let start = moment(moment().year() + "-01-01").format("YYYY-MM-DD")
    let block_edit_mode = false
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let calendars = [
        $("#season_calendar_0"), $("#season_calendar_1"), $("#season_calendar_2"), $("#season_calendar_3"), $("#season_calendar_4"), $("#season_calendar_5"),
        $("#season_calendar_6"), $("#season_calendar_7"), $("#season_calendar_8"), $("#season_calendar_9"), $("#season_calendar_10"), $("#season_calendar_11"),
        $("#season_calendar_12"), $("#season_calendar_13"), $("#season_calendar_14"), $("#season_calendar_15"), $("#season_calendar_16"), $("#season_calendar_17"),
        $("#season_calendar_18"), $("#season_calendar_19"), $("#season_calendar_20"), $("#season_calendar_21"), $("#season_calendar_22"), $("#season_calendar_23"),
        $("#season_calendar_24"), $("#season_calendar_25"), $("#season_calendar_26"), $("#season_calendar_27"), $("#season_calendar_28"), $("#season_calendar_29"),
        $("#season_calendar_30"), $("#season_calendar_31"), $("#season_calendar_32"), $("#season_calendar_33"), $("#season_calendar_34"), $("#season_calendar_35"),
    ]
    let active_calendars = []
    ///////////////////////////////////////////////
    $(_button_edit_product_save_season)
      .on("click", function () {
          alert("Save Season")
      })
    $(_button_edit_product_clear_season)
      .on("click", function () {
          clear()
          $product_edit_table.clearSelectedRows()
      })
    $(_button_edit_product_new_season_toggle)
      .on("click", function () {
          clear()
          $product_edit_table.clearSelectedRows()
      })
    
    $(_background_color)
      .colorpicker({
          format: "hex",
          fallbackColor: "#fff",
          color: "#fff",
          colorSelectors: {
              "grey": "#777",
              "blue": "#337ab7",
              "success": "#5cb85c",
              "info": "#5bc0de",
              "warning": "#f0ad4e",
              "red": "#d9534f",
          },
      })
      .change(function () {
          let newColor = $(this).val()
          $(_background_color_display).css("background", newColor)
      })
    
    $(_border_color)
      .colorpicker({
          format: "hex",
          fallbackColor: "#999",
          color: "#999",
          
      })
      .change(function () {
          let newColor = $(this).val()
          $(_border_color_display).css("background", newColor)
      })
    
    $(_text_color)
      .colorpicker({
          format: "hex",
          fallbackColor: "#000",
          color: "#000",
          
      })
      .change(function () {
          let newColor = $(this).val()
          $(_text_color_display).css("background", newColor)
      })
    
    $(_enable_all_seasons)
      .on("click", function () {
          //alert("click")
      })
    ///////////////////////////////////////////////
    const trim_obj_name = function (obj) {
        let temp = {}
        if (obj) {
            $.each(obj, function (ind, val) {
                let str = ind.replace("product_season_", "")
                str = str.replace("season_", "")
                temp[str] = val
                
            })
        }
        
        return temp
    }
    ///////////////////////////////////////////////
    const clear = function () {
        if (_background_color, _text_color, _border_color) {
            $(_background_color).val("#fff").trigger("change")
            $(_text_color).val("#000").trigger("change")
            $(_border_color).val("#999").trigger("change")
        }
        if (disabled_dow, _season_enabled, _enable_season_sunday) {
            disabled_dow = []
            _season_enabled.checked = true
            _enable_season_sunday.checked = true
            _enable_season_monday.checked = true
            _enable_season_tuesday.checked = true
            _enable_season_wednesday.checked = true
            _enable_season_thursday.checked = true
            _enable_season_friday.checked = true
            _enable_season_saturday.checked = true
            _enable_all_seasons.checked = true
            _season_id.value = ""
            _season_name.value = ""
        }
        
    }
    ///////////////////////////////////////////////
    const unset_active_calendars = function () {
        $.each(calendars, function (index, cal) {
            if (cal.fullCalendar) {
                cal.fullCalendar("destroy")
            }
            cal.hide()
        })
        return true
    }
    
    const set_active_calendars = function () {
        active_calendars = []
        for (let n = 0; n < calendars.length; n++) {
            if (n < months_shown) {
                active_calendars.push(calendars[n])
                calendars[n].show()
            }
        }
        return active_calendars
    }
    
    const set_calendar_display = function () {
        return moment(start).year() + " - " + moment(start).add(months_shown, "months").year()
    }
    
    const set_block_edit_mode = function () {
        
        if (block_edit_mode) {
            //$("#seasonsCalendarBlock div.fc-toolbar.fc-header-toolbar").addClass("block_edit_mode")
        } else {
            //$("div.fc-toolbar.fc-header-toolbar").removeClass("block_edit_mode")
        }
    }
    ///////////////////////////////////////////////
    const set = function (season) {
        if (!season) {
            season = {}
        }
        season = trim_obj_name(season)
        Season.detail = {
            id: (season.id) ? season.id : null,
            name: (season.name) ? season.name : null,
            class: (season.class) ? season.class : null,
            category_id: (season.category_id) ? season.category_id : null,
            background_color: (season.background_color) ? season.background_color : "#fff",
            text_color: (season.text_color) ? season.text_color : "#000",
            border_color: (season.border_color) ? season.border_color : "#999",
            view_product_index: (season.view_product_index) ? season.view_product_index : 1,
            view_product_index_filter: (season.view_product_index_filter) ? season.view_product_index_filter : 1,
            view_product_index_search: (season.view_product_index_search) ? season.view_product_index_search : 1,
            view_product_edit: (season.view_product_edit) ? season.view_product_edit : 1,
            view_product_package_edit: (season.view_product_package_edit) ? season.view_product_package_edit : 1,
            view_product_package_index: (season.view_product_package_index) ? season.view_product_package_index : 1,
            enabled: (season.enabled) ? season.enabled : 1,
            date_created: (season.date_created) ? season.date_created : formatDateMySQL(),
            disabled_dow: (season.disabled_dow) ? season.disabled_dow.replace(/\s+/g, "").split(",") : [],
            created_by: (season.created_by) ? season.created_by : user_id,
            date_modified: (season.date_modified) ? season.date_modified : formatDateMySQL(),
            modified_by: (season.modified_by) ? season.modified_by : user_id,
        }
    }
    
    const set_autocomplete = function () {
        $(_season_name)
          .on("click", function () {
              $(this).select()
          })
    }
    
    const set_enabled_dow = function (disabled_dow) {
        if (!disabled_dow) {
            disabled_dow = []
        }
        if (disabled_dow.length === 0) {
            $(_enable_all_seasons).trigger("click")
        }
        $.each(disabled_dow, function (i, dow) {
            console.log(days[dow])
        })
    }
    
    const edit = function (season) {
        if (season) {
            console.log("season", season)
            clear()
            let disabled_dow = season.disabled_dow.map(function (x) {
                return parseInt(x, 10)
            })
            set_enabled_dow(disabled_dow)
            console.log("disabled", disabled_dow)
            $(_background_color).val(season.background_color).trigger("change")
            $(_border_color).val(season.border_color).trigger("change")
            $(_text_color).val(season.text_color).trigger("change")
            _season_name.value = season.name
            _season_id.value = season.id
            /*
                background_color: "#ffebee"
                border_color: "#000"
                category_id: 1
                class: "default-color white-text"
                created_by: 8
                date_created: "2020-10-20 11:17:35"
                date_modified: "2020-10-20 11:17:35"
                enabled: 1
                id: 1
                modified_by: 8
                name: "Year-Round"
                text_color: "#000"
                view_product_edit: 1
                view_product_index: 1
                view_product_index_filter: 1
                view_product_index_search: 1
                view_product_package_edit: 1
                view_product_package_index: 1
             */
        } else {
            //alert("add")
        }
        
    }
    
    ///////////////////////////////////////////////
    const build_product_edit_table = function () {
        if (_table_product_seasons) {
            $product_edit_table = $(_table_product_seasons).table({
                table_type: "display_list",
                data: Array.from(Season.all.values()),
                columnDefs: [
                    {
                        title: "Id",
                        targets: 0,
                        data: "id",
                    },
                    {
                        title: "Name",
                        targets: 1,
                        data: "name",
                        render: function (data, type, row, meta) {
                            return `<span class='' style='white-space: nowrap'>${data}</span>`
                        },
                    },
                ],
                rowClick: Season.edit,
            })
        }
    }
    
    const build_calendar = function () {
        let active_calendars = set_active_calendars()
        let display_range = set_calendar_display()
        /*
        console.log("active_calendars", active_calendars)
        console.log("display_range", display_range)
        //*/
        let counter = 0
        $.each(active_calendars, function (index, cal) {
            
            cal.fullCalendar({
                header: {
                    left: "title",
                    center: "",
                    right: "",
                },
            })
        })
        
    }
    ///////////////////////////////////////////////
    const init = function (settings) {
        if (_product_season_edit_form) {
            clear()
            set_block_edit_mode()
            if (_border_color) {
                $(_border_color).val("#eee").trigger("change")
            }
            
            if (_background_color) {
                $(_background_color).val("#fff").trigger("change")
            }
            
            if (_text_color) {
                $(_text_color).val("#000").trigger("change")
            }
            
            if (_button_product_edit_add_dates_to_season) {
                _button_product_edit_add_dates_to_season.disabled = true
            }
            
            if (_button_edit_product_delete_selected) {
                $(_button_edit_product_delete_selected).hide()
            }
            
            if (_button_edit_product_delete_selected) {
                $(_button_edit_product_delete_selected).hide()
            }
            
            if (_table_product_seasons) {
                build_product_edit_table()
            }
            
            if (_season_name && _category_id) {
                set_autocomplete()
            }
            
            if (_calendar_season) {
                build_calendar()
            }
        }
        
    }
    
    const load = function (seasons) {
        Season.all = new Map()
        if (seasons) {
            $.each(seasons, function (ind, season) {
                //console.log("season", season)
                set(season)
                Season.all.set(Season.detail.id, Season.detail)
                $product_edit_table.insertRow(Season.detail)
            })
        }
        /*
        console.log("Season.all", Season.all)
        console.log("Season.detail", Season.detail)
        //*/
    }
    ///////////////////////////////////////////////
    const init_product_edit = function (seasons) {
        if (seasons) {
            load(seasons)
        }
        
    }
    ///////////////////////////////////////////////
    return {
        all: new Map(),
        types: new Map(),
        types_detail: {},
        detail: {
            disabled_dow: [],
            id: null,
            name: null,
            class: null,
            category_id: null,
            background_color: null,
            text_color: null,
            border_color: null,
            view_product_index: 1,
            view_product_index_filter: 1,
            view_product_index_search: 1,
            view_product_edit: 1,
            view_product_package_edit: 1,
            view_product_package_index: 1,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: null,
            date_modified: formatDateMySQL(),
            modified_by: null,
        },
        edit: function (season) {
            edit(season)
        },
        set_autocomplete: function () {
            set_autocomplete()
        },
        init_product_edit: function (seasons) {
            init_product_edit(seasons)
        },
        init: function (settings) {
            init(settings)
        },
    }
    
})()

Season.init()

const SeasonCalendar = (function () {
    "use strict"
    
    const _calendar_season = document.getElementById("calendar_season")
    const _calendar_season_title = document.getElementById("calendar_season_title")
    const _calendar_season_prev_year = document.getElementById("calendar_season_prev_year")
    const _calendar_season_next_year = document.getElementById("calendar_season_next_year")
    const _button_calendar_season_clear_selected_dates = document.getElementById("button_calendar_season_clear_selected_dates")
    const _collapse_calendar_season_filter = document.getElementById("collapse_calendar_season_filter")
    const _calendar_season_view_count = document.getElementById("calendar_season_view_count")
    const _calendar_season_block = document.getElementById("calendar_season_block")
    const _season_calendar_0 = document.getElementById("season_calendar_0")
    return {
        init: function () {
        
        },
    }
})()

const Category = (function () {
    "use strict"
    ///////////////////////////////////////////////
    const _category_id = document.getElementById("category_id")
    const _product_id = document.getElementById("product_id")
    const _product_edit_form = document.getElementById("product_edit_form")
    const _product_rating_id = document.getElementById("product_rating_id")
    const _pricing_strategy_id = document.getElementById("pricing_strategy_id")
    const _product_name = document.getElementById("product_name")
    const _depart_time = document.getElementById("depart_time")
    const _arrive_time = document.getElementById("arrive_time")
    const _day_span = document.getElementById("day_span")
    ///////////////////////////////////////////////
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    ///////////////////////////////////////////////
    $(_category_id)
      .on("change", function () {
          if (_product_edit_form) {
              if (!isNaN(parseInt($(this).val()))) {
                  validate()
                  Season.set_autocomplete(parseInt($(this).val()))
                  Product.set_autocomplete(parseInt($(this).val()))
              }
          }
          
      })
    ///////////////////////////////////////////////
    const showNone = function () {
        //Rail.showRails(false);
        //Flight.showFlights(false);
        //Car.showCars(false)
        //Tour.showTours(false)
        //showTransport(false)
    }
    
    const set_product_edit_defaults = function () {
        if (_product_id) {
            let new_product = (!isNaN(_product_id.value))
            /*
            console.log("new_product", new_product)
            //*/
            switch (_category_id.value) {
              // Hotel
                case "1" || 1:
                    if (new_product) {
                        _product_name.disabled = false
                        _pricing_strategy_id.value = ""
                        _product_rating_id.value = ""
                        //_day_span.value = ""
                        //_arrive_time.value = ""
                        //_depart_time.value = ""
                    } else {
                        _product_name.disabled = true
                    }
                    _product_rating_id.disabled = false
                    showNone()
                    break
              // Flight
                case "2" || 2:
                    showNone()
                    //Flight.init(details)
                    
                    if (new_product) {
                        _product_name.disabled = false
                        _pricing_strategy_id.value = "2"
                        _product_rating_id.value = ""
                        //_day_span_flight.value = "0"
                        //_day_span.value = "0"
                        //_arrive_time.value = "00:00"
                        //_depart_time.value = "00:00"
                    } else {
                        _product_name.disabled = true
                    }
                    _product_rating_id.disabled = true
                    break
              // Cars
                case "3" || 3:
                    showNone()
                    //Car.init(details)
                    //_min_age.labels[0].innerHTML = "Min Days:"
                    //_max_age.labels[0].innerHTML = "Max Days:"
                    if (new_product) {
                        _product_name.disabled = false
                        _pricing_strategy_id.value = "3"
                        _product_rating_id.value = ""
                        //_day_span_car.value = "0"
                        //_day_span.value = "0"
                        //_arrive_time.value = "00:00"
                        //_depart_time.value = "00:00"
                    } else {
                        _product_name.disabled = true
                    }
                    _product_rating_id.disabled = true
                    break
              // Rail
                case "4" || 4:
                    if (new_product) {
                        _product_name.disabled = false
                        _pricing_strategy_id.value = "2"
                        _product_rating_id.value = ""
                        //_day_span_rail.value = "0"
                        //_day_span.value = "0"
                        //_arrive_time.value = "00:00"
                        //_depart_time.value = "00:00"
                    } else {
                        _product_name.disabled = true
                    }
                    _product_rating_id.disabled = true
                    showNone()
                    //Rail.init(details)
                    break
              // Transport
                case "5" || 5:
                    if (new_product) {
                        _product_name.disabled = false
                        _pricing_strategy_id.value = ""
                        _product_rating_id.value = ""
                        //_day_span.value = ""
                        //_arrive_time.value = ""
                        //_depart_time.value = ""
                    } else {
                        _product_name.disabled = true
                    }
                    _product_rating_id.disabled = false
                    showNone()
                    //Car.init(details)
                    break
              // Tours
                case "6" || 6:
                    if (new_product) {
                        _product_name.disabled = false
                        _pricing_strategy_id.value = "2"
                        _product_rating_id.value = ""
                        //_day_span_tour.value = "0"
                        //_day_span.value = "0"
                        //_arrive_time.value = "00:00"
                        //_depart_time.value = "00:00"
                    } else {
                        _product_name.disabled = true
                    }
                    _product_rating_id.disabled = true
                    showNone()
                    //Tour.init(details)
                    break
              // Cruises
                case "7" || 7:
                    if (new_product) {
                        _product_name.disabled = false
                        _pricing_strategy_id.value = ""
                        _product_rating_id.value = ""
                        //_day_span.value = "0"
                        //_arrive_time.value = "00:00"
                        //_depart_time.value = "00:00"
                    } else {
                        _product_name.disabled = true
                    }
                    _product_rating_id.disabled = false
                    showNone()
                    break
              // Packages
                case "8" || 8:
                    if (new_product) {
                        _product_name.disabled = false
                        _pricing_strategy_id.value = ""
                        _product_rating_id.value = ""
                        //_day_span.value = ""
                        //_arrive_time.value = ""
                        //_depart_time.value = ""
                    } else {
                        _product_name.disabled = true
                    }
                    _product_rating_id.disabled = false
                    showNone()
                    break
              // Other
                case "9" || 9:
                    console.log("other")
                    if (new_product) {
                        _product_name.disabled = false
                        _pricing_strategy_id.value = ""
                        _product_rating_id.value = ""
                        //_day_span.value = ""
                        //_arrive_time.value = ""
                        //_depart_time.value = ""
                    } else {
                        _product_name.disabled = true
                    }
                    _product_rating_id.disabled = false
                    showNone()
                    break
                default:
                    _product_name.disabled = true
                    if (new_product) {
                        _pricing_strategy_id.value = ""
                        _product_rating_id.value = ""
                        //_day_span.value = ""
                        //_arrive_time.value = ""
                        //_depart_time.value = ""
                    }
                    _product_rating_id.disabled = false
                    showNone()
                    break
            }
        }
        
    }
    
    const init = function () {
        validate()
    }
    
    const validate = function () {
        set_product_edit_defaults()
        if (_category_id) {
            if (isNaN(parseInt(_category_id.value))) {
                //$(_tab_product_edit_season).addClass("disabled")
            } else {
                //$(_tab_product_edit_season).removeClass("disabled")
            }
        }
        
    }
    
    const reset = function () {
        
        Category.detail = {
            id: null,
            pricing_strategy_types_id: null,
            name: null,
            icon: null,
            view_product_index: 1,
            view_product_index_filter: 1,
            view_product_index_search: 1,
            view_product_edit: 1,
            view_product_package_edit: 1,
            view_product_package_index: 1,
            all_day: 1,
            display: 1,
            overlap: 1,
            editable: 1,
            duration_editable: 1,
            start_editable: 1,
            background_color: "#fff",
            text_color: "#000",
            border_color: "#eee",
            enabled: null,
            date_created: formatDateMySQL(),
            created_by: null,
            date_modified: formatDateMySQL(),
            modified_by: null,
            note: null,
        }
    }
    
    const trim_obj_name = function (obj, tr) {
        let temp = {}
        if (obj) {
            $.each(obj, function (ind, val) {
                let str = ind.replace("category_", "")
                temp[str] = val
                
            })
        }
        
        return temp
    }
    
    const handle_category_error = function (msg) {
        toastr.error(msg)
    }
    
    const insert_row = function (category) {
        if (category) {
        
        }
    }
    
    const set = function (category) {
        
        if (!category) {
            category = {}
        }
        category = trim_obj_name(category)
        Category.detail = {
            all_day: (category.all_day) ? category.all_day : 1,
            background_color: (category.background_color) ? category.background_color : "#fff",
            border_color: (category.border_color) ? category.border_color : "#999",
            created_by: (category.created_by) ? category.created_by : user_id,
            date_created: (category.date_created) ? category.date_created : formatDateMySQL(),
            date_modified: (category.date_modified) ? category.date_modified : formatDateMySQL(),
            display: (category.display) ? category.display : "",
            duration_editable: (category.duration_editable) ? category.duration_editable : 1,
            editable: (category.editable) ? category.editable : 1,
            enabled: (category.enabled) ? category.enabled : 1,
            icon: (category.icon) ? category.icon : "",
            id: (category.id) ? category.id : null,
            modified_by: (category.modified_by) ? category.modified_by : user_id,
            name: (category.name) ? category.name : "",
            overlap: (category.overlap) ? category.overlap : 1,
            pricing_strategy_types_id: (category.pricing_strategy_types_id) ? category.pricing_strategy_types_id : null,
            start_editable: (category.start_editable) ? category.start_editable : 1,
            text_color: (category.text_color) ? category.text_color : "#000",
            view_product_edit: (category.view_product_edit) ? category.view_product_edit : 1,
            view_product_index: (category.view_product_index) ? category.view_product_index : 1,
            view_product_index_filter: (category.view_product_index_filter) ? category.view_product_index_filter : 1,
            view_product_index_search: (category.view_product_index_search) ? category.view_product_index_search : 1,
            view_product_package_edit: (category.view_product_package_edit) ? category.view_product_package_edit : 1,
        }
    }
    
    const load = function (categories) {
        Category.all = new Map()
        
        if (categories) {
            $.each(categories, function (ind, category) {
                set(category)
                Category.all.set(Category.detail.id, Category.detail)
            })
        }
        
        console.log("Category.all", Category.all)
    }
    ///////////////////////////////////////////////
    return {
        detail: {},
        all: new Map(),
        init: function () {
            init()
        },
        load: function (categories) {
            load(categories)
        },
    }
    
})()

Category.init()

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
    
    //------------------------------------------------------------------
    
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
                              let city_element = document.getElementById(id)
                              
                              if (!isNaN(parseInt($(this).val()))) {
                                  City.id = $(this).val()
                                  if (city_element) {
                                      //City.get(parseInt($(this).val()), city_element)
                                  }
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
                sendGetRequest("/cities/get", dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handle_city_error("Oops: 1")
                    }
                })
            } catch (e) {
                console.log(e)
                return handle_city_error("Error Validating Province")
            }
        } else {
            return handle_city_error("Error Loading Province- Missing Data")
        }
    }
    
    const update_city_record = function ($this, dataToSend) {
        if (dataToSend) {
            try {
                sendPostRequest("/cities/update", dataToSend, function (data, status, xhr) {
                    if (data && data[0]) {
                        City.all.set(data[0].city_id, data[0])
                        let city_elements = $("select[data-type='city']")
                        console.log(city_elements.length)
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
    
    //------------------------------------------------------------------
    
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
        
        let new_city_form = document.createElement("form")
        
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
    
    //------------------------------------------------------------------
    
    const clear_detail = function () {
        
        return {
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
        }
        
    }
    
    const set_detail = function (city) {
        let details = clear_detail()
        let id = null
        if (city) {
            id = validInt(city.city_id)
            details = {
                id: id,
                province_id: validInt(city.city_province_id),
                country_id: validInt(city.city_country_id),
                created_by: (city.city_created_by) ? city.city_created_by : user_id,
                modified_by: (city.city_created_by) ? city.city_created_by : user_id,
                sort_order: (city.city_sort_order) ? city.city_sort_order : null,
                name: (city.city_name) ? city.city_name : null,
                enabled: (city.city_enabled) ? city.city_enabled : 1,
                date_created: (city.city_date_created) ? city.city_date_created : formatDateMySQL(),
                date_modified: (city.city_date_modified) ? city.city_date_modified : formatDateMySQL(),
                note: (city.city_note) ? city.city_note : null,
            }
            
        }
        
        City.id = id
        City.detail = details
        
    }
    
    //------------------------------------------------------------------
    
    const get = function (country_id, province_id, el) {
        City.all = new Map()
        let city_id = ""
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
                id_field: "city_id",
                text_field: "city_name",
                first_selectable: false,
            })
            
        } else {
            let dataToSend = {
                country_id: parseInt(country_id),
                province_id: parseInt(province_id),
            }
            
            fetch_city_list(dataToSend, function (data) {
                if (data) {
                    
                    City.all = buildMap(data, "city_id")
                    $(el).BuildDropDown({
                        data: Array.from(City.all.values()),
                        title: "City",
                        id_field: "city_id",
                        text_field: "city_name",
                        first_selectable: false,
                    })
                    
                    $(el).val(city_id).trigger("change")
                }
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
    
    //------------------------------------------------------------------
    
    const init = function (settings) {
        build_drop_downs(settings)
    }
    
    //------------------------------------------------------------------
    
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
    
    //------------------------------------------------------------------
    
    const handle_country_error = function (msg) {
        toastr.error(msg)
        console.log(msg)
    }
    
    const on_click_outside = (e) => {
        let tar = $(e.target).parents("form." + class_name)
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
                          .on("change", function () {
                              
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
                                      City.get(null, null, city_element)
                                  }
                              } else {
                                  Province.get(null, province_element)
                              }
                              
                          })
                    }
                    
                })
            }
            
        }
        
    }
    
    const fetch_country_list = function (dataToSend, callback) {
        if (dataToSend) {
            try {
                sendGetRequest("/countries/get", dataToSend, function (data, status, xhr) {
                    console.log(data)
                    
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
                sendPostRequest("/countries/update", dataToSend, function (data, status, xhr) {
                    if (data) {
                        Country.all.push(data)
                        let country_elements = $("select[data-type='country']")
                        
                        country_elements.each(function (index, element) {
                            var newOption = new Option(data.country_name, data.country_id, false, false)
                            $(element).append(newOption).trigger("change")
                        })
                        $($this).val(data.country_id).trigger("change")
                        Country.close()
                        toastr.success("Country: " + data.country_id + " updated")
                    } else {
                        return handle_country_error("Error: 1")
                    }
                })
            } catch (e) {
                console.log(e)
                handle_country_error("Error: Validating Province")
            }
        } else {
            console.log("Error: Missing Data")
            handle_country_error("Error: Missing Data")
        }
    }
    
    //------------------------------------------------------------------
    
    const set_detail = function (country) {
        let details = clear_detail()
        let id = null
        if (country) {
            id = validInt(country.country_id)
            details = {
                id: validInt(country.country_id),
                name: (country.country_name) ? country.country_name : null,
                sort_order: (country.country_sort_order) ? country.country_sort_order : null,
                iso2: (country.country_iso2) ? country.country_iso2 : null,
                iso3: (country.country_iso3) ? country.country_iso3 : null,
                currency_id: validInt(country.country_currency_id),
                enabled: (country.country_enabled) ? country.country_enabled : 1,
                date_created: (country.country_date_created) ? country.country_date_created : formatDateMySQL(),
                created_by: (country.country_created_by) ? country.country_created_by : user_id,
                date_modified: (country.country_date_modified) ? country.country_date_modified : formatDateMySQL(),
                modified_by: (country.country_modified_by) ? country.country_modified_by : user_id,
                note: (country.country_note) ? country.country_note : null,
            }
        }
        Country.id = id
        Country.detail = details
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
    
    //------------------------------------------------------------------
    
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
        
        let new_country_form = document.createElement("form")
        
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
        // -- Fields
        let _name = document.getElementById("country_name")
        let _country_iso2 = document.getElementById("country_iso2")
        let _country_iso3 = document.getElementById("country_iso3")
        // --
        
        if (!_name || !_country_iso2 || !_country_iso3) {
            return false
        }
        
        validator_init(form_rules)
        $("#" + form_id).validate()
        return $("#" + form_id).valid()
    }
    
    //------------------------------------------------------------------
    
    const set = function (settings) {
        console.log("-- set --")
        
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
            } else {
                toastr.error("Error: 1")
            }
        } else {
            toastr.error("Error: 2")
        }
        
    }
    
    //------------------------------------------------------------------
    
    const init = function (settings) {
        build_drop_downs(settings)
    }
    
    //------------------------------------------------------------------
    
    return {
        detail: {},
        all: [],
        close: function () {
            destroy_form()
        },
        add: function (elem, val) {
            add(elem, val)
        },
        save: function ($this) {
            save($this)
        },
        set: function (settings) {
            set(settings)
        },
        set_detail: function (country) {
            set_detail(country)
        },
        get: function (settings) {
            get(settings)
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
    
    //------------------------------------------------------------------
    
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
                                      if (!isNaN(parseInt(country_element.value))) {
                                          let country_id = parseInt(country_element.value)
                                          if (!isNaN(parseInt($(this).val()))) {
                                              City.get(country_id, parseInt($(this).val()), city_element)
                                          } else {
                                              City.id = null
                                              City.get(country_id, null, city_element)
                                          }
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
                sendGetRequest("/provinces/get", dataToSend, function (data, status, xhr) {
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
    
    const update_province_record = function ($this, dataToSend) {
        if (dataToSend) {
            try {
                sendPostRequest("/provinces/update", dataToSend, function (data, status, xhr) {
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
    
    //------------------------------------------------------------------
    
    const set_detail = function (province) {
        let details = clear_detail()
        let id = null
        if (province) {
            id = validInt(province.province_id)
            details = {
                id: validInt(province.province_id),
                name: (province.province_name) ? province.province_name : null,
                sort_order: (province.province_sort_order) ? province.province_sort_order : null,
                country_id: validInt(province.province_country_id),
                iso2: (province.province_iso2) ? province.province_iso2 : null,
                iso3: (province.province_iso3) ? province.province_iso3 : null,
                enabled: (province.province_enabled) ? province.province_enabled : 1,
                date_created: (province.province_date_created) ? province.province_date_created : formatDateMySQL(),
                created_by: (province.province_created_by) ? province.province_created_by : user_id,
                date_modified: (province.province_date_modified) ? province.province_date_modified : formatDateMySQL(),
                modified_by: (province.province_modified_by) ? province.province_modified_by : user_id,
                note: (province.province_note) ? province.province_note : null,
            }
        }
        Province.id = id
        Province.detail = details
    }
    
    const clear_detail = function () {
        return {
            id: null,
            name: null,
            sort_order: null,
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
    
    //------------------------------------------------------------------
    
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
        
        let newProvinceForm = document.createElement("form")
        
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
    
    //------------------------------------------------------------------
    
    const set = function (settings) {
    
    }
    
    const get = function (country_id, el) {
        Province.all = new Map()
        let province_id = ""
        if (Province.id !== null) {
            province_id = Province.id
        }
        if (!el || !country_id) {
            $(el).BuildDropDown({
                data: Array.from(Province.all.values()),
                title: "Province",
                id_field: "province_id",
                text_field: "province_name",
                first_selectable: false,
            })
            $(el).val("").trigger("change")
            return
        }
        
        let dataToSend = {
            country_id: country_id,
        }
        
        fetch_province_list(dataToSend, function (data) {
            if (data) {
                Province.all = buildMap(data, "province_id")
                $(el).BuildDropDown({
                    data: Array.from(Province.all.values()),
                    title: "Province",
                    id_field: "province_id",
                    text_field: "province_name",
                    first_selectable: false,
                })
                $(el).val(province_id).trigger("change")
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
    
    const update_select = function (country_id, elem) {
    
    }
    
    //------------------------------------------------------------------
    
    const init = function (settings) {
        build_drop_downs(settings)
    }
    
    //------------------------------------------------------------------
    
    return {
        detail: {},
        all: [],
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

$("a.panel-action")
  .on("click", function () {
      let $this = $(this)
      if ($(this).data("toggle")) {
          
          let data_toggle = $(this).data("toggle")
          
          switch (data_toggle) {
              case "panel-button":
                  break
              case "panel-filter":
                  let $target = $(this).data("target")
                  let filter_box = $("#" + $target)
                  console.log("this", $target)
                  let display = "hidden"
                  if (filter_box) {
                      if (filter_box.data("display")) {
                          display = filter_box.data("display")
                      }
                      console.log("display", display)
                      if (display === "hidden") {
                          filter_box.data("display", "shown")
                          filter_box.show("fast", function () {
                              $this.addClass("active")
                          })
                      } else if (display === "shown") {
                          filter_box.data("display", "hidden")
                          filter_box.hide("fast", function () {
                              $this.removeClass("active")
                          })
                      }
                  } else {
                      console.log("filter_box", filter_box)
                  }
                  
                  break
              case "panel-fullscreen":
                  Panel.go_fullscreen($(this))
                  break
              default:
                  break
          }
      } else {
          Panel.compress_all()
      }
      
  })

const Panel = (function () {
    "use strict"
    
    const init = function () {
    
    }
    
    const compress_all = function () {
        $(".is-fullscreen").each(function () {
            $(this).removeClass("is-fullscreen")
        })
        $("a.panel-action.fas.fa-compress").each(function () {
            $(this)
              .removeClass("fa-compress")
              .addClass("fa-expand")
        })
    }
    
    const expand = function ($this) {
        $this.removeClass("fa-expand")
        $this.addClass("fa-compress")
        $this.closest("section.panel").addClass("is-fullscreen")
    }
    
    const compress = function ($this) {
        $this.removeClass("fa-compress")
        $this.addClass("fa-expand")
        $this.closest("section.panel").removeClass("is-fullscreen")
    }
    
    const go_fullscreen = function ($this) {
        if ($this) {
            if ($this.hasClass("fa-expand")) {
                expand($this)
            } else if ($this.hasClass("fa-compress")) {
                compress($this)
            }
        }
    }
    
    return {
        go_fullscreen: function ($this) {
            go_fullscreen($this)
        },
        compress_all: function () {
            compress_all()
        },
        init: function (settings) {
            init(settings)
        },
    }
    
})()

const Provider = (function () {
    "use strict"
    ///////////////////////////////////////////////
    const base_url = "/providers"
    ///////////////////////////////////////////////
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    const _button_product_edit_save_provider = document.getElementById("button_product_edit_save_provider")
    const _provider_index = document.getElementById("provider_index")
    const _provider_edit = document.getElementById("provider_edit")
    const _provider_name = document.getElementById("provider_name")
    const _provider_id = document.getElementById("provider_id")
    const _provider_company_id = document.getElementById("provider_company_id")
    const _provider_enabled = document.getElementById("provider_enabled")
    const _table_provider_index = document.getElementById("table_provider_index")
    ///////////////////////////////////////////////
    let providerIndexPage, providerEditPage
    let globalSelectedProvider = false
    let $index_table = $(_table_provider_index)
    ///////////////////////////////////////////////
    $(_button_product_edit_save_provider)
      .on("click", function () {
          alert("Save Provider")
      })
    ///////////////////////////////////////////////
    const set_autocomplete = function () {
        
        $(_provider_name)
          .on("change", function () {
          
          })
          .autocomplete({
              serviceUrl: "/autocomplete/provider",
              minChars: 2,
              cache: false,
              dataType: "json",
              triggerSelectOnValidInput: false,
              paramName: "st",
              onSelect: function (suggestion) {
                  console.log("suggestion", suggestion.data)
                  globalSelectedProvider = true
                  _provider_company_id.value = suggestion.data.company_id
                  _provider_id.value = suggestion.data.provider_id
                  _provider_name.value = suggestion.data.company_name
              },
          })
    }
    
    const navigate = function (provider) {
        if (provider && provider.provider_id) {
            window.location.replace(base_url + "/" + provider.provider_id)
        }
    }
    
    const load_product_edit = function (settings) {
        if (settings) {
            let provider = {
                provider_id: (settings.provider_id),
                provider_company_id: (settings.provider_company_id),
                provider_location_id: (settings.provider_location_id),
                provider_code_direct_id: (settings.provider_code_direct_id),
                provider_provider_vender: (settings.provider_provider_vender),
                provider_enabled: (settings.provider_enabled),
                provider_note: (settings.provider_note),
                provider_created_by: (settings.provider_created_by) ? settings.provider_created_by : user_id,
                provider_modified_by: (settings.provider_modified_by) ? settings.provider_modified_by : user_id,
                provider_date_created: (settings.provider_date_created) ? settings.provider_date_created : formatDateMySQL(),
                provider_date_modified: (settings.provider_date_modified) ? settings.provider_date_modified : formatDateMySQL(),
                provider_addresses: [],
                provider_contacts: [],
            }
            set(provider)
        }
    }
    
    const set = function (provider) {
        let details = clear_detail()
        if (provider) {
            details = {
                id: validInt(provider.provider_id),
                company_id: validInt(provider.provider_company_id),
                location_id: validInt(provider.provider_location_id),
                code_direct_id: (provider.provider_code_direct_id) ? provider.provider_code_direct_id : null,
                provider_vendor: (provider.provider_provider_vendor) ? provider.provider_provider_vendor : 1,
                enabled: (provider.provider_enabled) ? provider.provider_enabled : null,
                note: (provider.provider_note) ? provider.provider_note : null,
                created_by: (provider.provider_created_by) ? parseInt(provider.provider_created_by) : user_id,
                modified_by: (provider.provider_modified_by) ? parseInt(provider.provider_modified_by) : user_id,
                date_created: (provider.provider_date_created) ? provider.provider_date_created : formatDateMySQL(),
                date_modified: (provider.provider_date_modified) ? provider.provider_date_modified : formatDateMySQL(),
                addresses: (provider.provider_addresses) ? provider.provider_addresses : [],
                contacts: (provider.provider_contacts) ? provider.provider_contacts : [],
            }
            Provider.detail = details
        }
    }
    
    const load_product_edit_form = function (settings) {
        console.log("load_product_edit_form", settings)
    }
    
    const clear_detail = function () {
        return {
            id: null,
            company_id: null,
            location_id: null,
            code_direct_id: null,
            provider_vendor: 1,
            enabled: 1,
            note: null,
            addresses: new Map(),
            contacts: new Map(),
            created_by: user_id,
            modified_by: user_id,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
        }
    }
    
    const build_index_table = function () {
        $index_table = $(_table_provider_index).table({
            table_type: "display_list",
            data: Provider.all,
            columnDefs: [
                {
                    title: "Id",
                    targets: 0,
                    data: "provider_id",
                },
                {
                    title: "Name",
                    targets: 1,
                    data: "company_name",
                    render: function (data, type, row, meta) {
                        let name = ""
                        if (data) {
                            name = data
                        } else {
                            return ""
                        }
                        
                        return type === "display" && data.length > tableCellMaxChars ?
                          "<span style='white-space: nowrap'>" + name.substr(0, (tableCellMaxChars - 3)) + "</span></span>" :
                          "<span style='white-space: nowrap'>" + name + "</span></span>"
                    },
                },
                {
                    title: "Location",
                    targets: 2,
                    data: "location",
                    render: function (data, type, row, meta) {
                        return data
                    },
                },
            ],
            rowClick: Provider.navigate,
        })
    }
    
    const set_defaults = function () {
        return {
            provider_list: [],
        }
    }
    
    const load_index_providers = function (providers) {
        Provider.all = new Map()
        console.log("populate_index_table", providers)
        $.each(providers, function (i, provider) {
            //console.log("provider", provider)
            let detail = {
                id: (provider.provider_id) ? provider.provider_id : null,
                company_id: (provider.provider_company_id) ? provider.provider_company_id : null,
                location_id: (provider.provider_id) ? provider.provider_id : null,
                code_direct_id: (provider.provider_id) ? provider.provider_id : null,
                provider_vendor: (provider.provider_id) ? provider.provider_id : null,
                enabled: (provider.provider_id) ? provider.provider_id : null,
                created_by: (provider.provider_id) ? provider.provider_id : null,
                date_created: (provider.provider_id) ? provider.provider_id : null,
                modified_by: (provider.provider_modified_by) ? provider.provider_id : null,
                date_modified: (provider.provider_date_modified) ? provider.provider_id : null,
                note: (provider.provider_note) ? provider.provider_id : null,
            }
            console.log("detail", detail)
            Provider.all.set(provider.provider_id, provider)
        })
        //console.log("Provider.all", Provider.all)
    }
    ///////////////////////////////////////////////
    const provider_index = function (settings) {
        console.log("provider_index", settings)
        if (!settings) {
            settings = set_defaults()
        }
        if (settings.provider_list) {
            load_index_providers(settings.provider_list)
        }
        
        console.log("Provider.all", Provider.all)
    }
    
    $.fn.providerEdit = function (settings) {
        const _provider_vender_details = document.getElementById("provider_vender_details")
        const _form_edit_provider = document.getElementById("form_edit_provider")
        const _provider_id = document.getElementById("provider_id")
        const _provider_code_direct_id = document.getElementById("provider_code_direct_id")
        const _provider_enabled = document.getElementById("provider_enabled")
        const _company_name = document.getElementById("company_name")
        const _company_id = document.getElementById("company_id")
        const _provider_location_id = document.getElementById("provider_location_id")
        const _button_submit_form_edit_provider = document.getElementById("button_submit_form_edit_provider")
        const _button_add_provider_address = document.getElementById("button_add_provider_address")
        const _button_add_provider_contact = document.getElementById("button_add_provider_contact")
        const _button_provider_add_contact = document.getElementById("button_provider_add_contact")
        const _button_provider_add_address = document.getElementById("button_provider_add_address")
        const _provider_vendor = document.getElementById("provider_vendor")
        const _temp_location_id = document.getElementById("temp_location_id")
        const $nav_tab_contacts = $("[aria-controls='panel_tab_contacts']")
        const $nav_tab_addresses = $("[aria-controls='panel_tab_addresses']")
        const $panel_tab_vendor_detail = $("[aria-controls='panel_tab_vendor_detail']")
        ////
        let form_rules = {
            rules: {
                provider_location_id: {
                    required: true,
                },
                provider_code_direct_id: {
                    required: true,
                },
            },
            messages: {
                provider_location_id: {
                    required: "Field Required",
                },
                provider_code_direct_id: {
                    required: "Field Required",
                },
            },
        }
        ////
        $(_button_submit_form_edit_provider)
          .on("click", function () {
              /*
              console.log("-- _button_submit_form_edit_provider: click() --")
              //*/
              
              Provider.save()
              
          })
        $(_button_provider_add_address)
          .on("click", function () {
              if (provider_id.value === "") {
                  return
              }
              Address.load_modal()
          })
        $(_button_add_provider_address)
          .on("click", function () {
              if (provider_id.value === "") {
                  return
              }
              Address.load_modal()
          })
        $(_button_provider_add_contact)
          .on("click", function () {
              if (_provider_id && _provider_id.value === "") {
                  return
              }
              
              Contact.edit()
          })
        $(_button_add_provider_contact)
          .on("click", function () {
              if (_provider_id && _provider_id.value === "") {
                  
                  return
              }
              
              Contact.edit()
          })
        $(_temp_location_id)
          .on("change", function () {
              _provider_location_id.value = _temp_location_id.value
          })
        $(_provider_vendor)
          .on("change", function () {
              if (_provider_vendor.checked === true) {
                  show_vendor_details_form()
              } else {
                  close_vendor_details_form()
              }
          })
        
        //------------------------------------------------------------------
        
        const close_vendor_details_form = function () {
            clear_vender_details()
            $(_provider_vender_details).hide()
            $panel_tab_vendor_detail.addClass("disabled")
        }
        
        const show_vendor_details_form = function () {
            clear_vender_details()
            $panel_tab_vendor_detail.removeClass("disabled")
            $(_provider_vender_details).show()
            
        }
        
        const clear_vender_details = function () {
            //_vendor_sku.value = ""
            //_vendor_id.value = ""
        }
        
        const handle_provider_error = function (msg) {
            toastr.error(msg)
        }
        
        const update_provider_record = function (dataToSend) {
            if (dataToSend) {
                /*
                console.log("provider:dataToSend", dataToSend)
                //*/
                try {
                    sendPostRequest("/providers/update", dataToSend, function (data, status, xhr) {
                        if (data) {
                            console.log("data", data)
                            if (_provider_id && _provider_id.value === "") {
                                history.replaceState({}, "", data.provider_detail.provider_id)
                            }
                            
                            if (_provider_vendor.checked) {
                                Vendor.save_provider_vendor(data.provider_detail)
                            }
                            
                            Provider.load(data)
                            
                        } else {
                            return handle_provider_error("Error: 1")
                        }
                    })
                } catch (e) {
                    console.log(e)
                    return handle_provider_error("Error: 2")
                }
            } else {
                return handle_provider_error("Error: 3")
            }
        }
        
        //------------------------------------------------------------------
        
        const validate_form = function () {
            Provider.validator = validator_init(form_rules)
            let tabs = $("#provider_edit_tabs>div.panel-heading.panel-heading-tab>ul.nav.nav-tabs>li.nav-item>a.nav-link")
            let panels = $("#provider_edit_tabs > div.panel-body > div.tab-content > div.tab-pane")
            let is_valid = $(_form_edit_provider).valid()
            
            if (!is_valid) {
                
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
                
            }
            
            return is_valid
        }
        
        const clear_form = function () {
            _provider_id.value = ""
            _provider_code_direct_id.value = ""
            _provider_enabled.value = ""
            _provider_enabled.checked = true
            _provider_location_id.value = ""
            $(_company_name).attr("readonly", false)
            
        }
        
        const load_form = function (settings) {
            _provider_id.value = Provider.detail.id
            _provider_vendor.checked = (Provider.detail.provider_vendor === 1)
            _provider_enabled.checked = (Provider.detail.enabled) ? (Provider.detail.enabled === 1) : false
            _provider_code_direct_id.value = Provider.detail.code_direct_id
            _company_id.value = Company.detail.id
            _company_name.value = Company.detail.name
            $(_provider_vendor).trigger("change")
        }
        
        //------------------------------------------------------------------
        
        const load = function (settings) {
            if (settings) {
                
                Vendor.clear_provider_vendor_form()
                
                if (settings.provider_detail) {
                    set(settings.provider_detail)
                    Vendor.init(settings.provider_detail)
                    Company.init(settings.provider_detail)
                    if (Provider.detail.contacts) {
                        Contact.load(Provider.detail.contacts)
                    }
                    if (Provider.detail.addresses) {
                        Address.load(Provider.detail.addresses)
                    }
                    Location.set(settings.provider_detail)
                    Vendor.populate_provider_vendor_form()
                } else {
                    _provider_vendor.checked = true
                    _provider_vendor.disabled = false
                    $(_provider_vender_details).show()
                    Company.init()
                    Vendor.init()
                    Vendor.clear_provider_vendor_form()
                }
                
                load_form()
                
            }
            
            $(".autocomplete-suggestions").hide()
        }
        
        const save = function () {
            
            let company_addresses = Array.from(Address.all.values())
            let company_contacts = Array.from(Contact.all.values())
            let company_data = Company.validate_form()
            let provider_data = Provider.validate_form()
            let vendor_data = Vendor.validate_form()
            
            $.each(company_addresses, function (i, address) {
                let address_id = address.id
                $.each(address.address_types_id, function (ind, address_type) {
                    console.log({
                        address_id: address_id,
                        address_types_id: address_type,
                    })
                })
            })
            
            $.each(company_contacts, function (i, contact) {
                let contact_id = contact.id
                $.each(contact.contact_types_id, function (ind, contact_type) {
                    console.log({
                        contact_id: contact_id,
                        contact_types_id: contact_type,
                    })
                })
            })
            
            let dataToSend = {
                id: (!isNaN(parseInt(_provider_id.value))) ? parseInt(_provider_id.value) : null,
                company_id: (!isNaN(parseInt(Company.detail.id))) ? parseInt(Company.detail.id) : null,
                location_id: (!isNaN(parseInt(Location.detail.id))) ? parseInt(Location.detail.id) : null,
                provider_vendor: (_provider_vendor.checked === true) ? 1 : 0,
                code_direct_id: (_provider_code_direct_id.value !== "") ? (_provider_code_direct_id.value) : null,
                enabled: (_provider_enabled.checked === true) ? 1 : 0,
                created_by: (isNaN(parseInt(_provider_id.value))) ? user_id : null,
                date_created: (isNaN(parseInt(_provider_id.value))) ? formatDateMySQL() : null,
                modified_by: user_id,
                date_modified: formatDateMySQL(),
                note: null,
                company_contacts: company_contacts,
                company_addresses: company_addresses,
            }
            if (!company_data) {
                console.log("provider: company_data", "Missing")
                return
            }
            
            if (!provider_data) {
                console.log("provider: provider_data", "Missing")
                return
            }
            if (_provider_vendor.checked === true) {
                if (!vendor_data) {
                    console.log("provider: vendor_data", "Missing")
                    return
                }
            }
            
            let r = confirm("Are you sure you want to edit this record?")
            if (r === true) {
                update_provider_record(remove_nulls(dataToSend))
            }
            
        }
        
        //------------------------------------------------------------------
        
        const init = function (settings) {
            
            if (_provider_vender_details) {
                $(_provider_vender_details).hide()
            }
            
            Contact.build_company_contact_table()
            Address.build_company_address_table()
            
            clear_form()
            set()
            
            if (settings.types) {
                
                if (settings.countries) {
                    Country.all = settings.countries
                }
                
                Address.init(settings)
                Location.init(settings)
                Contact.init(settings)
                
            }
            
            load(settings)
            
            Provider.validator = validator_init(form_rules)
            
            if (!settings.provider_detail) {
                $nav_tab_contacts.addClass("disabled")
                $nav_tab_addresses.addClass("disabled")
            } else {
                $nav_tab_contacts.removeClass("disabled")
                $nav_tab_addresses.removeClass("disabled")
            }
            
        }
        
        //------------------------------------------------------------------
        
        return {
            address_view: function (address) {
            },
            contact_view: function (contact) {
            },
            save: function () {
                save()
            },
            validate_form: function () {
                return validate_form()
            },
            set: function (provider) {
                set(provider)
            },
            load: function (settings) {
                load(settings)
            },
            init: function (settings) {
                init(settings)
            },
        }
        
        //------------------------------------------------------------------
        
    }
    
    const init = function () {
        Provider.all = new Map()
        if (_provider_name) {
            set_autocomplete()
        }
        if (_table_provider_index) {
            build_index_table()
        }
    }
    ///////////////////////////////////////////////
    return {
        validator: null,
        detail: {
            id: null,
            company_id: null,
            location_id: null,
            code_direct_id: null,
            provider_vender: 1,
            enabled: null,
            note: null,
            created_by: user_id,
            modified_by: user_id,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
            addresses: [],
            contacts: [],
        },
        all: new Map(),
        index_table: null,
        save: function () {
            if (_provider_edit) {
                console.log("-- _provider_edit --")
                providerEditPage.save()
            }
        },
        load: function (settings) {
            providerEditPage.load(settings)
        },
        contact_view: function (contact) {
            providerEditPage.contact_view(contact)
        },
        address_view: function (address) {
            providerEditPage.address_view(address)
        },
        validate_form: function () {
            return providerEditPage.validate_form()
        },
        navigate: function (provider) {
            navigate(provider)
        },
        load_product_edit: function (settings) {
            load_product_edit(settings)
        },
        index: function (settings) {
            if (_provider_index) {
                provider_index(settings)
            }
        },
        edit: function (settings) {
            if (_provider_edit) {
                providerEditPage = $(_provider_edit).providerEdit()
                providerEditPage.init(settings)
            }
            
        },
        init: function () {
            init()
        },
    }
    
})()
///////////////////////////////////////////////
Provider.init()

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
                    console.log("data", data.result)
                    if (data && data.result) {
                        let result = data.result
                        if (result.id) {
                            alert()
                            window.location.replace("/")
                        }
                    } else {
                        return handle_login_error("Error: 1")
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

const Address = (function () {
    "use strict"
    
    //------------------------------------------------------------------
    
    const _table_provider_addresses = document.getElementById("table_provider_addresses")
    const _table_company_addresses = document.getElementById("table_company_addresses")
    const _modal_address = document.getElementById("modal_address")
    const _modal_button_submit_edit_address = document.getElementById("modal_button_submit_edit_address")
    const _modal_button_cancel_edit_address = document.getElementById("modal_button_cancel_edit_address")
    const _address_types_list = document.getElementById("address_types_list")
    const _form_address_edit = document.getElementById("form_address_edit")
    const _address_id = document.getElementById("address_id")
    const _address_street = document.getElementById("address_street")
    const _address_street2 = document.getElementById("address_street2")
    const _address_street3 = document.getElementById("address_street3")
    const _address_city_id = document.getElementById("address_city_id")
    const _address_postal_code = document.getElementById("address_postal_code")
    const _address_province_id = document.getElementById("address_province_id")
    const _address_country_id = document.getElementById("address_country_id")
    const _address_enabled = document.getElementById("address_enabled")
    
    const form_rules = {
        rules: {
            address_types_list: "required",
            address_country_id: "required",
            address_province_id: "required",
            address_city_id: "required",
        },
        messages: {
            address_types_list: "Address type is required",
            address_country_id: "Country type is required",
            address_province_id: "Province is required",
            address_city_id: "City type is required",
        },
    }
    
    let validator
    
    //------------------------------------------------------------------
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let $address_table
    
    //------------------------------------------------------------------
    
    $(_modal_button_submit_edit_address).on("click", function () {
        save()
    })
    
    $(_modal_button_cancel_edit_address)
      .on("click", function () {
          close_modal()
      })
    
    $(_modal_address).on("shown.bs.modal", function () {
        let dropdownParent = $(_modal_address)
        $(_address_country_id).select2({
            dropdownParent: dropdownParent,
        })
        $(_address_province_id).select2({
            dropdownParent: dropdownParent,
        })
        $(_address_city_id).select2({
            dropdownParent: dropdownParent,
        })
    })
    
    //-------------------------------------------------------------------
    
    const format_types = function (types_list) {
        let formatted_type_list = "<p>"
        let name = "<p>"
        let counter = 0
        if (typeof types_list === "string" || types_list instanceof String) {
            types_list = types_list.split(",")
        }
        
        $.each(types_list, function (i, id) {
            let type = Address.types.get(id)
            let br = ""
            if ((counter + 1) % 2 === 0) {
                br = "</br>"
            }
            let spacer = ""
            if (counter > 0) {
                spacer = ", "
            }
            if (type) {
                name += "<span class='m-1' style='white-space: nowrap'>" + type.address_types_name + spacer + "</span>" + br
                formatted_type_list += spacer + type.address_types_name + ""
            }
            
            counter++
            
        })
        formatted_type_list += "</p>"
        name += "</p>"
        
        return name
    }
    
    const format_address = function (address, format) {
        
        let postal = (address.postal_code) ? address.postal_code : ""
        let street_1 = (address.street_1) ? address.street_1 : ""
        let street_2 = (address.street_2) ? address.street_2 : ""
        let street_3 = (address.street_3) ? address.street_3 : ""
        let city_name = (address.city_name) ? address.city_name : ""
        let country_iso2 = (address.country_iso2) ? address.country_iso2 : ""
        let country_iso3 = (address.country_iso3) ? address.country_iso3 : ""
        let country_name = (address.country_name) ? address.country_name : ""
        let province_iso2 = (address.province_iso2) ? address.province_iso2 : ""
        let province_iso3 = (address.province_iso3) ? address.province_iso3 : ""
        let province_name = (address.province_name) ? address.province_name : ""
        
        let long_format = "<address class=\"mb-0\">"
        let medium_format = "<address class=\"mb-0\">"
        let short_format = "<address class=\"mb-0\">"
        
        let street = []
        
        if (street_1 !== "") {
            street.push(street_1)
        }
        if (street_2 !== "") {
            //street.push(street_2)
        }
        if (street_3 !== "") {
            //street.push(street_3)
        }
        
        long_format += street.join("</br>")
        medium_format += street.join("</br>")
        short_format += street.join("</br>")
        
        let line_2_short = []
        let line_2_medium = []
        let line_2_long = []
        
        if (city_name !== "") {
            line_2_medium.push("<span class=''>" + city_name.toUpperCase() + "</span>")
        }
        
        if (province_iso2 !== "") {
            line_2_medium.push("<span class=''>" + province_iso2.toUpperCase() + "</span>")
        }
        
        if (postal !== "") {
            line_2_medium.push("<span class=''>" + postal + "</span>")
        }
        
        let line_2 = line_2_medium.join(" ")
        medium_format += "</br>" + line_2
        if (country_name !== "") {
            long_format += "</br>" + country_name.toUpperCase()
            medium_format += "</br>" + country_name.toUpperCase()
            short_format += "</br>" + country_name.toUpperCase()
        }
        
        long_format += "</address>"
        medium_format += "</address>"
        short_format += "</address>"
        
        /*
        if (format) {
            if (format === 'short') {
                return short_format
            } else if (format === 'long') {
                return long_format
            }
        }
        //*/
        
        return medium_format
    }
    
    //------------------------------------------------------------------
    
    const build_provider_address_table = function () {
        if (_table_provider_addresses) {
            $address_table = $(_table_provider_addresses).table({
                table_type: "display_list",
                columnDefs: [
                    {
                        title: "Address",
                        targets: 0,
                        data: "street_1",
                        render: function (data, type, row, meta) {
                            return format_address(row)
                        },
                    },
                    {
                        title: "Types",
                        targets: 1,
                        data: "address_types_id",
                        render: function (data, type, row, meta) {
                            return format_types(data)
                        },
                    },
                ],
                rowClick: Address.edit,
            })
        }
    }
    
    const build_company_address_table = function () {
        if (_table_company_addresses) {
            $address_table = $(_table_company_addresses).table({
                table_type: "display_list",
                columnDefs: [
                    {
                        title: "Address",
                        targets: 0,
                        data: "street_1",
                        render: function (data, type, row, meta) {
                            return format_address(row)
                        },
                    },
                    {
                        title: "Types",
                        targets: 1,
                        data: "address_types_id",
                        render: function (data, type, row, meta) {
                            return format_types(data)
                        },
                    },
                ],
                rowClick: Address.edit,
            })
        }
    }
    
    const update_row = function (row_data) {
        //console.log("row_data", row_data)
        if (row_data.id) {
            let id = row_data.id
        }
        if (row_data.address_id) {
            let id = row_data.address_id
        }
        
        $(_table_company_addresses).DataTable().row("#table_company_addresses_tr_" + row_data.id).data(row_data).draw(false)
    }
    
    //------------------------------------------------------------------
    
    const handle_address_error = function (msg) {
        toastr.error(msg)
    }
    
    const update_address_record = function (dataToSend) {
        if (dataToSend) {
            try {
                sendPostRequest("/addresses/update", dataToSend, function (data, status, xhr) {
                    if (data && data[0]) {
                        let address = data[0]
                        
                        let detail = set_detail(data[0])
                        if (dataToSend.id) {
                            update_row(detail)
                        } else {
                            $address_table.insertRow(detail)
                        }
                        
                        Address.all.set(Address.detail.id, Address.detail)
                        toastr.success("Contact: " + address.address_id + " updated")
                        close_modal()
                    } else {
                        console.log("Error: 1")
                        return handle_address_error("Error: 1")
                    }
                })
            } catch (e) {
                console.log(e)
                return handle_address_error("Error: 2")
            }
        } else {
            console.log("Error: 3")
            return handle_address_error("Error: 3")
        }
    }
    
    const set_detail = function (address) {
        let details = clear_detail()
        
        if (address) {
            details = {
                formatted_types: format_types(getListOfIds(address.address_types_id)),
                formatted_address: format_address(address, "short"),
                city_id: validInt(address.address_city_id),
                country_id: validInt(address.address_country_id),
                id: validInt(address.address_id),
                postal_code: (address.address_postal_code) ? address.address_postal_code : null,
                province_id: validInt(address.address_province_id),
                street_1: (address.address_street_1) ? address.address_street_1 : null,
                street_2: (address.address_street_2) ? address.address_street_2 : null,
                street_3: (address.address_street_3) ? address.address_street_3 : null,
                address_types_id: (address.address_types_id) ? getListOfIds(address.address_types_id) : [],
                city_name: (address.city_name) ? address.city_name : null,
                country_iso2: (address.country_iso2) ? address.country_iso2 : null,
                country_iso3: (address.country_iso3) ? address.country_iso3 : null,
                country_name: (address.country_name) ? address.country_name : null,
                province_iso2: (address.province_iso2) ? address.province_iso2 : null,
                province_iso3: (address.province_iso3) ? address.province_iso3 : null,
                province_name: (address.province_name) ? address.province_name : null,
                enabled: (address.address_enabled) ? address.address_enabled : 1,
                created_by: (address.address_created_by) ? address.address_created_by : user_id,
                modified_by: (address.address_modified_by) ? address.address_modified_by : user_id,
                date_created: (address.address_date_created) ? address.address_date_created : formatDateMySQL(),
                date_modified: (address.address_date_modified) ? address.address_date_modified : formatDateMySQL(),
                note: (address.address_note) ? address.address_note : null,
            }
        }
        
        Address.detail = details
        return details
    }
    
    const clear_detail = function () {
        return {
            formatted_address: "",
            formatted_types: "",
            city_id: null,
            country_id: null,
            id: null,
            postal_code: null,
            province_id: null,
            street_1: null,
            street_2: null,
            street_3: null,
            address_types_id: [],
            city_name: null,
            country_iso2: null,
            country_iso3: null,
            country_name: null,
            provider_id: null,
            province_iso2: null,
            province_iso3: null,
            province_name: null,
            enabled: 1,
            note: null,
            created_by: user_id,
            modified_by: user_id,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
        }
    }
    
    //------------------------------------------------------------------
    
    const load = function (addresses) {
        Address.all = new Map()
        
        $.each(addresses, function (i, address) {
            let detail = set_detail(address)
            /*
            console.log("address", address)
            console.log("Address.detail")
            console.log("Address.detail", Address.detail)
            //*/
            Address.all.set(Address.detail.id, Address.detail)
            $address_table.insertRow(detail)
        })
        
        //console.log("address", Address.all)
    }
    
    const edit = function (address) {
        if (address) {
            //console.log("address", address)
            load_modal(address)
        }
    }
    
    const save = function () {
        if (!validate_form()) {
            return
        }
        let address_detail = Address.all.get(parseInt(_address_id.value))
        if (!address_detail) {
            address_detail = {
                note: null,
                date_created: formatDateMySQL(),
                created_by: user_id,
            }
        } else {
            address_detail.id = (!isNaN(parseInt(_address_id.value))) ? parseInt(_address_id.value) : null
        }
        address_detail.modified_by = user_id
        if (document.getElementById("company_id") && document.getElementById("company_id").value !== "" && !isNaN(parseInt(document.getElementById("company_id").value))) {
            address_detail.company_id = parseInt(document.getElementById("company_id").value)
        }
        address_detail.date_modified = formatDateMySQL()
        address_detail.address_types_id = getListOfIds($(_address_types_list).val().join(","))
        address_detail.enabled = (_address_enabled.checked) ? 1 : 0
        address_detail.street_1 = (_address_street.value !== "") ? _address_street.value : null
        address_detail.street_2 = (_address_street2.value !== "") ? _address_street2.value : null
        address_detail.street_3 = (_address_street3.value !== "") ? _address_street3.value : null
        address_detail.postal_code = (_address_postal_code.value !== "") ? _address_postal_code.value : null
        address_detail.city_id = validInt(_address_city_id.value)
        address_detail.province_id = validInt(_address_province_id.value)
        address_detail.country_id = validInt(_address_country_id.value)
        
        let r = confirm("Are you sure you want to edit this record?")
        if (r === true) {
            update_address_record(remove_nulls(address_detail))
        }
        
    }
    
    //------------------------------------------------------------------
    
    const load_modal = function (address) {
        reset_form()
        populate_form(address)
        if (_modal_address) {
            $(_modal_address).modal("show")
        }
        
    }
    
    const reset_form = function () {
        _address_id.value = ""
        $(_address_types_list).val([])
        _address_enabled.checked = true
        _address_street.value = ""
        _address_street2.value = ""
        _address_street3.value = ""
        _address_country_id.value = ""
        _address_province_id.value = ""
        _address_city_id.value = ""
        _address_postal_code.value = ""
    }
    
    const populate_form = function (detail) {
        /*
        console.log("detail", detail)
        console.log("Address.detail", Address.detail)
        //*/
        if (!detail) {
            Province.get(null, _address_province_id)
            Country.id = null
            City.id = null
        } else {
            _address_id.value = (detail.id) ? detail.id : null
            $(_address_types_list).val((detail.address_types_id) ? detail.address_types_id : [])
            _address_enabled.checked = (detail.enabled === 1)
            _address_street.value = (detail.street_1) ? detail.street_1 : null
            _address_street2.value = (detail.street_2) ? detail.street_2 : null
            _address_street3.value = (detail.street_3) ? detail.street_3 : null
            Province.id = (detail.province_id) ? detail.province_id : null
            Country.id = (detail.country_id) ? detail.country_id : null
            City.id = (detail.city_id) ? detail.city_id : null
            
            $(_address_country_id).val((Address.detail.country_id) ? Address.detail.country_id : "").trigger("change")
            
            _address_postal_code.value = (Address.detail.postal_code) ? Address.detail.postal_code : null
        }
        
    }
    
    const validate_form = function () {
        validator_init(form_rules)
        validator = $(_form_address_edit).validate()
        return $(_form_address_edit).valid()
    }
    
    const close_modal = function () {
        clear_detail()
        if (_modal_address) {
            $(_modal_address).modal("hide")
        }
        
    }
    
    //------------------------------------------------------------------
    
    const init = function (settings) {
        Address.types = new Map()
        if (settings && settings.types && settings.types.address_types) {
            Address.types = buildMap(settings.types.address_types, "address_types_id")
        }
        
        $(_address_types_list).BuildDropDown({
            data: Array.from(Address.types.values()),
            id_field: "address_types_id",
            text_field: "address_types_name",
            type: "multiple",
            first_selectable: true,
        })
        $(_address_country_id).BuildDropDown({
            data: Array.from(Country.all.values()),
            title: "Country",
            id_field: "country_id",
            text_field: "country_name",
            first_selectable: false,
        })
        $(_address_province_id).BuildDropDown({
            data: Array.from(Province.all.values()),
            title: "Province",
            id_field: "province_id",
            text_field: "province_name",
            first_selectable: false,
        })
        $(_address_city_id).BuildDropDown({
            data: Array.from(City.all.values()),
            title: "City",
            id_field: "city_id",
            text_field: "city_name",
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
    
    //------------------------------------------------------------------
    
    return {
        detail: {
            formatted_types: "",
            formatted_address: "",
            city_id: null,
            country_id: null,
            id: null,
            postal_code: null,
            province_id: null,
            street_1: null,
            street_2: null,
            street_3: null,
            address_types_id: [],
            city_name: null,
            country_iso2: null,
            country_iso3: null,
            country_name: null,
            province_iso2: null,
            province_iso3: null,
            province_name: null,
            enabled: null,
            note: null,
            created_by: null,
            modified_by: null,
            date_created: null,
            date_modified: null,
            
        },
        types: new Map(),
        all: new Map(),
        load_modal: function (address) {
            load_modal(address)
        },
        format_address: function (address) {
            return format_address(address)
        },
        load: function (addresses) {
            load(addresses)
        },
        edit: function (address) {
            edit(address)
        },
        build_provider_address_table: function () {
            build_provider_address_table()
        },
        build_company_address_table: function () {
            build_company_address_table()
        },
        init: function (settings) {
            init(settings)
        },
    }
    
})()

const Contact = (function () {
    "use strict"
    const base_url = "/contacts"
    const _form_contact_edit = document.getElementById("form_contact_edit")
    const _table_provider_contacts = document.getElementById("table_provider_contacts")
    const _table_company_contacts = document.getElementById("table_company_contacts")
    const _modalContact = document.getElementById("modalEditContactForm")
    const _button_add_provider_contact = document.getElementById("button_add_provider_contact")
    const _button_modal_cancel = document.getElementById("buttonCancelSaveContactModal")
    const _button_modal_save = document.getElementById("buttonSaveContactModal")
    const _modal_contact_name_first = document.getElementById("contact_name_first")
    const _modal_contact_phone = document.getElementById("contact_phone")
    const _modal_contact_email = document.getElementById("contact_email")
    const _modal_contact_name_last = document.getElementById("contact_name_last")
    const _modal_contact_enabled = document.getElementById("contact_enabled")
    const _modal_contact_id = document.getElementById("contact_id")
    const _modal_contact_types_list = document.getElementById("contact_types_list")
    
    let $contact_table, validator
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    //------------------------------------------------------------------
    
    const form_rules = {
        rules: {
            contact_types_list: {
                required: true,
            },
            contact_name_first: {
                required: true,
            },
            contact_name_last: {
                required: true,
            },
            contact_email: {
                email: true,
            },
        },
        messages: {
            contact_types_list: {
                required: "required",
            },
            contact_name_first: {
                required: "required",
            },
            contact_name_last: {
                required: "required",
            },
            contact_email: {
                email: "invalid",
            },
        },
    }
    
    //------------------------------------------------------------------
    
    $(_button_modal_save)
      .on("click", function () {
          save()
      })
    
    $(_button_modal_cancel)
      .on("click", function () {
          close_modal()
      })
    
    //------------------------------------------------------------------
    
    const clear_detail = function () {
        return {
            email: null,
            id: null,
            name_first: null,
            name_last: null,
            phone: null,
            contact_types_id: null,
            enabled: 1,
            created_by: user_id,
            modified_by: user_id,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
            note: null,
        }
    }
    
    const set_detail = function (contact) {
        
        let details = clear_detail()
        
        if (contact) {
            details = {
                email: (contact.email) ? contact.email : null,
                id: validInt(contact.id),
                name_first: (contact.name_first) ? contact.name_first : null,
                name_last: (contact.name_last) ? contact.name_last : null,
                phone: (contact.phone) ? contact.phone : null,
                contact_types_id: getListOfIds(contact.contact_types_id),
                enabled: (typeof contact.enabled !== "undefined") ? contact.enabled : 1,
                created_by: (contact.created_by) ? contact.created_by : user_id,
                modified_by: (contact.modified_by) ? contact.modified_by : user_id,
                date_created: (contact.date_created) ? contact.date_created : formatDateMySQL(),
                date_modified: (contact.date_modified) ? contact.date_modified : formatDateMySQL(),
                note: (contact.note) ? contact.note : null,
            }
        }
        
        Contact.detail = details
    }
    
    //------------------------------------------------------------------
    
    const handle_contact_error = function (msg) {
        toastr.error(msg)
        console.log(msg)
    }
    
    const update_contact_record = function (dataToSend) {
        if (dataToSend) {
            try {
                sendPostRequest("/contacts/update", dataToSend, function (data, status, xhr) {
                    if (data && data[0]) {
                        set_detail({
                            contact_types_id: data[0].contact_contact_types_id,
                            created_by: data[0].contact_created_by,
                            date_created: data[0].contact_date_created,
                            date_modified: data[0].contact_date_modified,
                            email: data[0].contact_email,
                            enabled: data[0].contact_enabled,
                            id: data[0].contact_id,
                            modified_by: data[0].contact_modified_by,
                            name_first: data[0].contact_name_first,
                            name_last: data[0].contact_name_last,
                            note: data[0].contact_note,
                            phone: data[0].contact_phone,
                        })
                        
                        if (dataToSend.id) {
                            update_row(dataToSend)
                        } else {
                            $contact_table.insertRow(Contact.detail)
                        }
                        
                        Contact.all.set(data[0].contact_id, Contact.detail)
                        toastr.success("Contact: " + data[0].contact_id + " updated")
                        close_modal()
                    }
                })
            } catch (e) {
                console.log(e)
                handle_contact_error("Error: Validating Contact")
            }
        } else {
            console.log("Error: Missing Data")
            handle_contact_error("Error: Missing Data")
        }
    }
    
    //------------------------------------------------------------------
    
    const build_provider_contact_table = function () {
        if (_table_provider_contacts) {
            
            $contact_table = $(_table_provider_contacts).table({
                table_type: "display_list",
                columnDefs: [
                    {
                        title: "First Name",
                        targets: 0,
                        data: "name_first",
                        render: function (data, type, row, meta) {
                            return data
                        },
                    },
                    {
                        title: "Last Name",
                        targets: 1,
                        data: "name_last",
                        render: function (data, type, row, meta) {
                            return data
                        },
                    },
                    {
                        title: "Types",
                        targets: 2,
                        data: "contact_types_id",
                        render: function (data, type, row, meta) {
                            let name = ""
                            let myArr
                            
                            if (typeof data === "string" || data instanceof String) {
                                myArr = data.split(",")
                            } else {
                                myArr = data
                            }
                            
                            $.each(myArr, function (i, contact_type_id) {
                                if (!isNaN(parseInt(contact_type_id))) {
                                    let contact_type = Contact.types.get(parseInt(contact_type_id))
                                    if (contact_type) {
                                        name += "<p class='m-0 mb-1' style='white-space: nowrap'>" + contact_type.contact_types_name.substr(0, (tableCellMaxChars - 3)) + "</p>"
                                    }
                                }
                            })
                            
                            return name
                        },
                    },
                ],
                rowClick: Contact.edit,
            })
            
        }
    }
    
    const build_company_contact_table = function () {
        if (_table_company_contacts) {
            
            $contact_table = $(_table_company_contacts).table({
                table_type: "display_list",
                columnDefs: [
                    {
                        title: "First Name",
                        targets: 0,
                        data: "name_first",
                        render: function (data, type, row, meta) {
                            return data
                        },
                    },
                    {
                        title: "Last Name",
                        targets: 1,
                        data: "name_last",
                        render: function (data, type, row, meta) {
                            return data
                        },
                    },
                    {
                        title: "Types",
                        targets: 2,
                        data: "contact_types_id",
                        render: function (data, type, row, meta) {
                            let name = ""
                            let myArr
                            
                            if (typeof data === "string" || data instanceof String) {
                                myArr = data.split(",")
                            } else {
                                myArr = data
                            }
                            
                            $.each(myArr, function (i, contact_type_id) {
                                if (!isNaN(parseInt(contact_type_id))) {
                                    let contact_type = Contact.types.get(parseInt(contact_type_id))
                                    if (contact_type) {
                                        name += "<p class='m-0 mb-1' style='white-space: nowrap'>" + contact_type.contact_types_name.substr(0, (tableCellMaxChars - 3)) + "</p>"
                                    }
                                }
                            })
                            
                            return name
                        },
                    },
                ],
                rowClick: Contact.edit,
            })
            
        }
    }
    
    const update_row = function (row_data) {
        $(_table_provider_contacts).DataTable().row("#table_provider_contacts_tr_" + row_data.id).data(row_data).draw(false)
    }
    
    //------------------------------------------------------------------
    
    const reset_form = function () {
        _modal_contact_name_first.value = ""
        _modal_contact_phone.value = ""
        _modal_contact_email.value = ""
        _modal_contact_name_last.value = ""
        _modal_contact_enabled.checked = true
        _modal_contact_id.value = ""
        $(_modal_contact_types_list).val([])
    }
    
    const validate_form = function () {
        validator_init(form_rules)
        validator = validator_init(form_rules)
        return $(_form_contact_edit).valid()
    }
    
    const populate_form = function () {
        _modal_contact_name_first.value = Contact.detail.name_first
        _modal_contact_phone.value = Contact.detail.phone
        _modal_contact_email.value = Contact.detail.email
        _modal_contact_name_last.value = Contact.detail.name_last
        _modal_contact_enabled.checked = (Contact.detail.enabled === 1)
        _modal_contact_id.value = Contact.detail.id
        $(_modal_contact_types_list).val(Contact.detail.contact_types_id)
    }
    
    //------------------------------------------------------------------
    
    const load_modal = function (contact) {
        if (_modalContact) {
            $(_modalContact).modal("show")
        }
    }
    
    const close_modal = function () {
        clear_detail()
        if (_modalContact) {
            $(_modalContact).modal("hide")
        }
        
    }
    
    //------------------------------------------------------------------
    
    const save = function () {
        if (!validate_form()) {
            return
        }
        let contact_detail = Contact.all.get(parseInt(_modal_contact_id.value))
        if (!contact_detail) {
            contact_detail = {
                note: null,
                date_created: formatDateMySQL(),
                created_by: user_id,
            }
        } else {
            contact_detail.id = (!isNaN(parseInt(_modal_contact_id.value))) ? parseInt(_modal_contact_id.value) : null
        }
        contact_detail.modified_by = user_id
        if (document.getElementById("company_id") && document.getElementById("company_id").value !== "" && !isNaN(parseInt(document.getElementById("company_id").value))) {
            contact_detail.company_id = parseInt(document.getElementById("company_id").value)
        }
        contact_detail.date_modified = formatDateMySQL()
        contact_detail.contact_types_id = getListOfIds($(_modal_contact_types_list).val().join(","))
        contact_detail.enabled = (_modal_contact_enabled.checked) ? 1 : 0
        contact_detail.name_first = (_modal_contact_name_first.value !== "") ? _modal_contact_name_first.value : null
        contact_detail.name_last = (_modal_contact_name_last.value !== "") ? _modal_contact_name_last.value : null
        contact_detail.phone = (_modal_contact_phone.value !== "") ? _modal_contact_phone.value : null
        contact_detail.email = (_modal_contact_email.value !== "") ? _modal_contact_email.value : null
        let r = confirm("Are you sure you want to edit this record?")
        if (r === true) {
            update_contact_record(remove_nulls(contact_detail))
        }
        
    }
    
    const edit = function (contact) {
        reset_form()
        set_detail(contact)
        populate_form(contact)
        load_modal(contact)
    }
    
    const load = function (contacts) {
        Contact.all = new Map()
        
        $.each(contacts, function (i, contact) {
            set_detail({
                contact_types_id: contact.contact_contact_types_id,
                created_by: contact.contact_created_by,
                date_created: contact.contact_date_created,
                date_modified: contact.contact_date_modified,
                email: contact.contact_email,
                enabled: contact.contact_enabled,
                id: contact.contact_id,
                modified_by: contact.contact_modified_by,
                name_first: contact.contact_name_first,
                name_last: contact.contact_name_last,
                note: contact.contact_note,
                phone: contact.contact_phone,
            })
            Contact.all.set(parseInt(Contact.detail.id), Contact.detail)
            $contact_table.insertRow(Contact.detail)
        })
        
    }
    
    //------------------------------------------------------------------
    
    const init = function (settings) {
        Contact.types = new Map()
        if (settings && settings.types && settings.types.contact_types) {
            Contact.types = buildMap(settings.types.contact_types, "contact_types_id")
        }
        
        $(_modal_contact_types_list).BuildDropDown({
            data: Array.from(Contact.types.values()),
            first_selectable: true,
            id_field: "contact_types_id",
            text_field: "contact_types_name",
            type: "multiple",
        })
    }
    
    //------------------------------------------------------------------
    
    return {
        detail: {
            email: null,
            id: null,
            name_first: null,
            name_last: null,
            phone: null,
            contact_types_id: null,
            enabled: null,
        },
        types: new Map(),
        types_detail: {
            id: null,
            name: null,
            date_created: null,
            created_by: null,
            date_modified: null,
            modified_by: null,
            enabled: null,
        },
        all: new Map(),
        save: function () {
            save()
        },
        build_provider_contact_table: function () {
            build_provider_contact_table()
        },
        build_company_contact_table: function () {
            build_company_contact_table()
        },
        edit: function (contact) {
            edit(contact)
        },
        load: function (contacts) {
            load(contacts)
        },
        init: function (settings) {
            init(settings)
        },
        
    }
    
})()

const Company = (function () {
    "use strict"
    
    //-----------------------------------------------------------------
    let version = "1.0.0"
    let obj = "Company"
    
    const _button_save_company_name = document.getElementById("button_save_company_name")
    const _button_edit_company_name = document.getElementById("button_edit_company_name")
    const _button_cancel_company_name = document.getElementById("button_cancel_company_name")
    const _button_submit_form_edit_company = document.getElementById("button_submit_form_edit_company")
    const _company_email = document.getElementById("company_email")
    const _company_website = document.getElementById("company_website")
    const _company_fax = document.getElementById("company_fax")
    const _company_phone_2 = document.getElementById("company_phone_2")
    const _company_phone_1 = document.getElementById("company_phone_1")
    const _company_enabled = document.getElementById("company_enabled")
    const _company_name = document.getElementById("company_name")
    const _company_id = document.getElementById("company_id")
    const _form_edit_company = document.getElementById("form_edit_company")
    ///////////////////////////////////////////////
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let temp_company_name = ""
    let temp_company_id = ""
    let validated = false
    let globalSelectedCompany = false
    let suggestionsTempCompany = []
    let phoneIT = false
    let phoneUS = false
    let form_rules = {
        rules: {
            
            company_phone_1: {
                phoneUS: phoneUS,
                phoneIT: phoneIT,
            },
            company_name: {
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
            
            company_name: {
                required: "Field Required",
            },
            company_phone_1: {
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
    ///////////////////////////////////////////////
    $(_company_id)
      .on("change", function () {
      
      })
    $(_company_name)
      .on("click", function () {
          $(this).select()
      })
      .on("keyup", function () {
          globalSelectedCompany = false
          if (validate_name_form()) {
              reset_name_edit()
          }
      })
      .on("change", function () {
          setTimeout(function () {
              let company_name = _company_name.value
              if (globalSelectedCompany === false) {
                  if (company_name === "") {
                      _company_name.value = ""
                      _company_id.value = ""
                      globalSelectedCompany = false
                  } else {
                      Company.company_exists(company_name, function (data) {
                          console.log("data", data)
                          if (data) {
                              _company_name.value = data.company_name
                              _company_id.value = data.company_id
                              globalSelectedCompany = true
                          } else {
                              globalSelectedCompany = false
                              add_to_company_list(_company_name)
                          }
                      })
                  }
              }
              
          }, 250)
      })
      .autocomplete({
          serviceUrl: "/autocomplete/companies",
          minChars: 2,
          cache: false,
          dataType: "json",
          triggerSelectOnValidInput: false,
          paramName: "st",
          onSelect: function (suggestion) {
              globalSelectedCompany = true
              Company.set_detail(suggestion.data)
              _company_id.value = Company.detail.id
              _company_name.value = Company.detail.name
          },
      })
    $(_button_save_company_name)
      .on("click", function () {
          save()
      })
    
    $(_button_cancel_company_name)
      .on("click", function () {
          _company_name.value = temp_company_name
          _company_id.value = temp_company_id
          temp_company_name = ""
          temp_company_id = ""
          unload_name_edit()
      })
    
    $(_button_edit_company_name)
      .on("click", function () {
          temp_company_name = _company_name.value
          temp_company_id = _company_id.value
          load_name_edit()
      })
    
    $(_button_submit_form_edit_company)
      .on("click", function () {
          save()
          
      })
    ///////////////////////////////////////////////
    const clear_form = function () {
        console.log("-- clear_form() --")
        _company_email.value = ""
        _company_website.value = ""
        _company_fax.value = ""
        _company_phone_2.value = ""
        _company_phone_1.value = ""
        _company_enabled.checked = true
    }
    
    const load_form = function () {
        console.log("-- load_form() --")
        clear_form()
        _company_id.value = Company.detail.id
        _company_email.value = Company.detail.email
        _company_website.value = Company.detail.website
        _company_fax.value = Company.detail.fax
        _company_phone_2.value = Company.detail.phone_2
        _company_phone_1.value = Company.detail.phone_1
        _company_enabled.checked = (!(Company.detail.enabled && Company.detail.enabled === 0))
    }
    
    const disable_form = function () {
        if (_form_edit_company) {
            unload_name_edit()
            _company_name.disabled = true
            $(_company_name).attr("readonly", true)
            _company_enabled.disabled = true
            _company_phone_1.disabled = true
            _company_phone_2.disabled = true
            _company_fax.disabled = true
            _company_email.disabled = true
            _company_website.disabled = true
            _button_submit_form_edit_company.disabled = true
        }
    }
    
    const enable_form = function () {
        if (_form_edit_company) {
            _company_name.disabled = false
            _company_enabled.disabled = false
            _company_phone_1.disabled = false
            _company_phone_2.disabled = false
            _company_fax.disabled = false
            _company_email.disabled = false
            _company_website.disabled = false
            _button_submit_form_edit_company.disabled = false
            $(_company_name).attr("readonly", false)
        }
    }
    
    const on_click_outside = (e) => {
        let tar = $(e.target).parents("div.edit_company_name")
        let auto = $("div.autocomplete-suggestion")
        if (!tar[0] && !auto) {
            _company_name.value = temp_company_name
            _company_id.value = temp_company_id
            temp_company_name = ""
            temp_company_id = ""
            unload_name_edit()
        }
    }
    
    const add_to_company_list = function (obj) {
        if (globalSelectedCompany === false) {
            if ((obj.value.length > 0 && suggestionsTempCompany.length === 0 && globalSelectedCompany === false) ||
              (obj.value.length > 0 && suggestionsTempCompany.length > 0 && !globalSelectedCompany)
            ) {
                if (confirm(obj.value + " is not on the list. Would you like to add it to the list?.")) {
                    let params = {
                        "name": obj.value,
                    }
                    try {
                        sendPostRequest("/companies/update", params, function (data, status, xhr) {
                            console.log(data)
                            if (data) {
                                _company_id.value = data[0].company_id
                                _company_name.value = data[0].company_name
                                set_detail(data[0])
                                Company.load_name_edit()
                                Company.unload_name_edit()
                                toastr.success("Record Added.")
                            } else {
                                _company_name.value = ""
                                _company_id.value = ""
                                toastr.error("Unable to add record.")
                            }
                        })
                    } catch (e) {
                        toastr.error("Unable to add record.")
                        console.log(e)
                    }
                    
                } else {
                    obj.value = ""
                    if (_company_id) {
                        _company_id.value = ""
                    }
                    suggestionsTempCompany = []
                }
            }
        }
    }
    
    const company_exists = function (name, callback) {
        console.log("globalSelectedCompany", globalSelectedCompany)
        if (globalSelectedCompany === true) {
            return
        }
        
        if (name && name !== "") {
            
            try {
                let url = "/autocomplete/validate/company"
                let dataToSend = {
                    name: name,
                }
                
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    console.dir("data", data)
                    if (data && data[0]) {
                        globalSelectedCompany = true
                        return callback(data[0])
                    } else {
                        return callback()
                    }
                })
                
            } catch (e) {
                console.log(e)
                return handle_company_error("Error Validating Company")
            }
        } else {
            //console.log("Missing: Company Name")
            //return handle_company_error("Missing: Company Name")
        }
    }
    
    const handle_company_error = function (msg) {
        toastr.error(msg)
        console.log(msg)
    }
    
    const update_company_record = function (dataToSend, callback) {
        if (dataToSend) {
            try {
                sendPostRequest("/companies/update", dataToSend, function (data, status, xhr) {
                    console.log("update_company_record(): data", data)
                    if (data && data[0]) {
                        unload_name_edit()
                        toastr.success("Company: " + data[0].company_id + " updated")
                    } else {
                        return handle_company_error("Error: 1")
                    }
                })
            } catch (e) {
                console.log(e)
                handle_company_error("Error: Validating Company")
            }
        } else {
            console.log("Error: Missing Data")
            handle_company_error("Error: Missing Data")
        }
    }
    
    const validate_name_form = function () {
        return (_company_name.value !== "" && !isNaN(parseInt(_company_id.value)))
    }
    
    const validate_form = function () {
        Company.validator = validator_init(form_rules)
        let is_valid = $(_form_edit_company).valid()
        
        //console.log("Submit Errors", Company.validator)
        
        if (!is_valid) {
            console.log(get_errors(Company.validator))
        }
        
        return is_valid
    }
    
    //------------------------------------------------------------------
    
    const reset_name_edit = function () {
        $(_company_name).removeClass("is-invalid")
        $("#company_name-error").html("")
    }
    
    const load_name_edit = function () {
        reset_name_edit()
        $(_button_save_company_name).show()
        $(_button_cancel_company_name).show()
        $(_button_edit_company_name).hide()
        $(_company_name).attr("readonly", false)
        _company_name.disabled = false
        $(_company_name).select()
        window.addEventListener("click", on_click_outside)
    }
    
    const unload_name_edit = function () {
        reset_name_edit()
        $(_button_save_company_name).hide()
        $(_button_cancel_company_name).hide()
        $(_button_edit_company_name).show()
        $(_company_name).attr("readonly", true)
        _company_name.disabled = true
        //$(_button_edit_company_name).focus()
        window.removeEventListener("click", on_click_outside)
    }
    
    //
    //------------------------------------------------------------------
    
    const clear_detail = function () {
        return {
            id: null,
            name: null,
            phone_1: null,
            phone_2: null,
            fax: null,
            website: null,
            email: null,
            enabled: 1,
            created_by: user_id,
            date_created: formatDateMySQL(),
            modified_by: user_id,
            date_modified: formatDateMySQL(),
            status: 6,
            note: null,
        }
    }
    
    const set_detail = function (company) {
        let details = clear_detail()
        if (company) {
            details = {
                
                id: validInt(company.company_id),
                name: (company.company_name) ? company.company_name : "",
                phone_1: (company.company_phone_1) ? company.company_phone_1 : "",
                phone_2: (company.company_phone_2) ? company.company_phone_2 : "",
                fax: (company.company_fax) ? company.company_fax : "",
                website: (company.company_website) ? company.company_website : "",
                email: (company.company_email) ? company.company_email : "",
                enabled: (company.company_enabled) ? company.company_enabled : 0,
                created_by: user_id,
                date_created: (company.company_date_created) ? company.company_date_created : formatDateMySQL(),
                modified_by: user_id,
                date_modified: (company.company_date_modified) ? company.company_date_modified : formatDateMySQL(),
                status: (company.company_status) ? company.company_status : 6,
                note: null,
            }
        }
        
        Company.detail = details
        
    }
    
    //------------------------------------------------------------------
    
    const save = function () {
        validated = true
        
        let dataToSend = {
            id: (!isNaN(parseInt(_company_id.value))) ? parseInt(_company_id.value) : null,
            name: (_company_name.value !== "") ? (_company_name.value) : null,
            phone_1: (_company_phone_1.value !== "") ? (_company_phone_1.value) : null,
            phone_2: (_company_phone_2.value !== "") ? (_company_phone_2.value) : null,
            fax: (_company_fax.value !== "") ? (_company_fax.value) : null,
            email: (_company_email.value !== "") ? (_company_email.value) : null,
            website: (_company_website.value !== "") ? (_company_website.value) : null,
            created_by: (isNaN(parseInt(_company_id.value))) ? user_id : null,
            modified_by: user_id,
            enabled: 1,
            date_created: (isNaN(parseInt(_company_id.value))) ? formatDateMySQL() : null,
            date_modified: formatDateMySQL(),
            note: null,
        }
        
        if (validate_name_form()) {
            reset_name_edit()
            let r = confirm("Are you sure you want to edit this record?")
            if (r === true) {
                update_company_record(remove_nulls(dataToSend))
            }
        } else {
            $(_company_name).addClass("is-invalid")
            $("#company_name-error").html("<span id=\"location_name-error\" class=\"error\">ssfield required</span>")
        }
    }
    
    //------------------------------------------------------------------
    
    const init = function (settings) {
        set_detail(settings)
        load_form()
        load_name_edit()
        if (settings) {
            unload_name_edit()
        } else {
            $(_button_save_company_name).hide()
            $(_button_cancel_company_name).hide()
        }
        
    }
    
    //------------------------------------------------------------------
    
    return {
        validator: null,
        detail: {
            id: null,
            created_by: null,
            modified_by: null,
            name: null,
            contact_name: null,
            contact_phone: null,
            users_id: null,
            status: null,
            enabled: null,
            date_created: null,
            date_modified: null,
            note: null,
        },
        
        all: new Map(),
        save: function () {
            save()
        },
        set_detail: function (company) {
            set_detail(company)
        },
        unload_name_edit: function () {
            unload_name_edit()
        },
        load_name_edit: function () {
            load_name_edit()
        },
        company_exists: function (name, callback) {
            company_exists(name, callback)
        },
        disable_form: function () {
            disable_form()
        },
        validate_form: function () {
            return validate_form()
        },
        enable_form: function () {
            enable_form()
        },
        init: function (settings) {
            //console.log("-- Company.init() --")
            Company.validator = validator_init(form_rules)
            init(settings)
        },
    }
    
})()

const Vendor = (function () {
    "use strict"
    const base_url = "/vendors"
    //
    const _provider_vendor_edit_form = document.getElementById("provider_vendor_edit_form")
    const _vendor_id = document.getElementById("vendor_id")
    const _vendor_enabled = document.getElementById("vendor_enabled")
    const _show_online = document.getElementById("show_online")
    const _show_sales = document.getElementById("show_sales")
    const _show_ops = document.getElementById("show_ops")
    const _vendor_sku = document.getElementById("vendor_sku")
    const _button_submit_form_edit_vendor = document.getElementById("button_submit_form_edit_vendor")
    const _table_vendor_index = document.getElementById("table_vendor_index")
    const _button_product_edit_save_vendor = document.getElementById("button_product_edit_save_vendor")
    const _product_vendor_edit_form = document.getElementById("product_vendor_edit_form")
    let $index_table = $(_table_vendor_index)
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const provider_vendor_form_rules = {
        rules: {
            vendor_sku: {
                required: true,
            },
        },
        messages: {
            vendor_sku: {
                required: "Field Required",
            },
        },
    }
    
    const form_rules = {
        rules: {
            vendor_sku: {
                required: true,
            },
        },
        messages: {
            vendor_sku: {
                required: "Field Required",
            },
        },
    }
    
    //------------------------------------------------------------------
    $(_button_product_edit_save_vendor)
      .on("click", function () {
          alert("Save Vendor")
      })
    $(_button_submit_form_edit_vendor)
      .on("click", function () {
          Vendor.save()
      })
    
    const clear_detail = function () {
        return {
            id: null,
            company_id: null,
            status_id: 9,
            sku: null,
            show_online: null,
            show_sales: null,
            show_ops: null,
            is_provider: null,
            phone_1: null,
            phone_2: null,
            fax: null,
            website: null,
            email: null,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
            enabled: 1,
            created_by: user_id,
            note: null,
            modified_by: user_id,
        }
    }
    
    const set_detail = function (vendor) {
        let details = clear_detail()
        if (vendor) {
            details.id = (vendor.vendor_id) ? vendor.vendor_id : null
            details.company_id = (vendor.vendor_company_id) ? vendor.vendor_company_id : null
            details.status_id = (vendor.vendor_status_id) ? vendor.vendor_status_id : 9
            details.sku = (vendor.vendor_sku) ? vendor.vendor_sku : null
            details.show_online = (vendor.vendor_show_online) ? (vendor.vendor_show_online === 1) ? 1 : 0 : null
            details.show_sales = (vendor.vendor_show_sales) ? (vendor.vendor_show_sales === 1) ? 1 : 0 : null
            details.show_ops = (vendor.vendor_show_ops) ? (vendor.vendor_show_ops === 1) ? 1 : 0 : null
            details.is_provider = (vendor.vendor_is_provider) ? vendor.vendor_is_provider : null
            details.phone_1 = (vendor.vendor_phone_1) ? vendor.vendor_phone_1 : null
            details.phone_2 = (vendor.vendor_phone_2) ? vendor.vendor_phone_2 : null
            details.fax = (vendor.vendor_fax) ? vendor.vendor_fax : null
            details.website = (vendor.vendor_website) ? vendor.vendor_website : null
            details.email = (vendor.vendor_email) ? vendor.vendor_email : null
            details.date_created = (vendor.vendor_date_created) ? vendor.vendor_date_created : formatDateMySQL()
            details.created_by = (vendor.vendor_created_by) ? vendor.vendor_created_by : user_id
            details.date_modified = (vendor.vendor_date_modified) ? vendor.vendor_date_modified : formatDateMySQL()
            details.modified_by = (vendor.vendor_modified_by) ? vendor.vendor_modified_by : user_id
            details.enabled = (vendor.vendor_enabled) ? vendor.vendor_enabled : 1
            details.note = (vendor.vendor_note) ? vendor.vendor_note : null
        }
        
        Vendor.detail = details
    }
    
    //------------------------------------------------------------------
    
    const handle_vendor_error = function (msg) {
        toastr.error(msg)
        console.log(msg)
    }
    
    const update_vendor_record = function (dataToSend) {
        console.log("-- update_vendor_record(): dataToSend:", dataToSend)
        if (dataToSend) {
            try {
                sendPostRequest("/vendors/update", dataToSend, function (data, status, xhr) {
                    if (data) {
                        console.log("-- update_vendor_record(): data:", data)
                        load(data)
                        populate_provider_vendor_form()
                        clear_validation(_provider_vendor_edit_form)
                        toastr.success("Vendor: " + data.vendor_id + " updated")
                    }
                })
            } catch (e) {
                console.log(e)
                handle_vendor_error("Error: Validating Contact")
            }
        } else {
            console.log("Error: Missing Data")
            handle_vendor_error("Error: Missing Data")
        }
    }
    
    //------------------------------------------------------------------
    
    const validate_provider_vendor = function () {
        Vendor.validator = validator_init(provider_vendor_form_rules)
        return $(_provider_vendor_edit_form).valid()
    }
    
    const reset_form = function () {
    
    }
    
    const validate_form = function () {
        Vendor.validator = validator_init(form_rules)
        return $(_provider_vendor_edit_form).valid()
    }
    
    const clear_provider_vendor_form = function () {
        _vendor_id.value = ""
        _vendor_sku.value = ""
        _vendor_enabled.checked = true
        _show_online.checked = true
        _show_sales.checked = true
        _show_ops.checked = true
    }
    
    const populate_provider_vendor_form = function () {
        clear_provider_vendor_form()
        _vendor_id.value = Vendor.detail.id
        _vendor_sku.value = Vendor.detail.sku
        _vendor_enabled.checked = (Vendor.detail.enabled === 1)
        _show_online.checked = (Vendor.detail.show_online === 1)
        _show_sales.checked = (Vendor.detail.show_sales === 1)
        _show_ops.checked = (Vendor.detail.show_ops === 1)
    }
    
    const populate_form = function () {
    
    }
    
    //------------------------------------------------------------------
    
    const save_provider_vendor = function (provider_details) {
        console.log("-- save_provider_vendor(): provider_details:", provider_details)
        
        const _provider_vendor = document.getElementById("provider_vendor")
        const _company_id = document.getElementById("company_id")
        
        let dataToSend = {
            id: (!isNaN(parseInt(_vendor_id.value))) ? parseInt(_vendor_id.value) : null,
            company_id: (!isNaN(parseInt(_company_id.value))) ? parseInt(_company_id.value) : null,
            status_id: null,
            sku: (_vendor_sku) ? _vendor_sku.value : null,
            show_online: (_show_online) ? (_show_online.checked) ? 1 : 0 : 0,
            show_sales: (_show_sales) ? (_show_sales.checked) ? 1 : 0 : 0,
            show_ops: (_show_ops) ? (_show_ops.checked) ? 1 : 0 : 0,
            is_provider: (_provider_vendor) ? (_provider_vendor.checked) ? 1 : 0 : 0,
            date_created: (Vendor.detail.date_created) ? Vendor.detail.date_created : formatDateMySQL(),
            created_by: (Vendor.detail.created_by) ? Vendor.detail.created_by : user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            enabled: (_vendor_enabled.checked) ? 1 : 0,
            note: (Vendor.detail.note) ? Vendor.detail.note : null,
        }
        /*
        console.log("-- dataToSend --")
        console.log(dataToSend)
        return
        //*/
        update_vendor_record(remove_nulls(dataToSend))
        
    }
    
    const save = function () {
        if (!validate_form()) {
            return
        }
        let contact_detail = Contact.all.get(parseInt(_modal_contact_id.value))
        if (!contact_detail) {
            contact_detail = {
                note: null,
                date_created: formatDateMySQL(),
                created_by: user_id,
            }
        } else {
            contact_detail.id = (!isNaN(parseInt(_modal_contact_id.value))) ? parseInt(_modal_contact_id.value) : null
        }
        contact_detail.modified_by = user_id
        if (document.getElementById("provider_id") && document.getElementById("provider_id").value !== "" && !isNaN(parseInt(document.getElementById("provider_id").value))) {
            contact_detail.provider_id = parseInt(document.getElementById("provider_id").value)
        }
        
        if (document.getElementById("vendor_id") && document.getElementById("vendor_id").value !== "" && !isNaN(parseInt(document.getElementById("vendor_id").value))) {
            contact_detail.vendor_id = parseInt(document.getElementById("vendor_id").value)
        }
        contact_detail.date_modified = formatDateMySQL()
        contact_detail.contact_types_id = getListOfIds($(_modal_contact_types_list).val().join(","))
        contact_detail.enabled = (_modal_contact_enabled.checked) ? 1 : 0
        contact_detail.name_first = (_modal_contact_name_first.value !== "") ? _modal_contact_name_first.value : null
        contact_detail.name_last = (_modal_contact_name_last.value !== "") ? _modal_contact_name_last.value : null
        contact_detail.phone = (_modal_contact_phone.value !== "") ? _modal_contact_phone.value : null
        contact_detail.email = (_modal_contact_email.value !== "") ? _modal_contact_email.value : null
        
        let r = confirm("Are you sure you want to edit this record?")
        if (r === true) {
            //update_contact_record(remove_nulls(contact_detail))
        }
        
    }
    
    const edit = function (vendor) {
    
    }
    
    const load = function (settings) {
        if (settings) {
            set_detail(settings)
        }
        /*
        console.log("-- Vendor.detail --")
        console.log(Vendor.detail)
        //*/
    }
    
    //------------------------------------------------------------------
    
    const init = function (settings) {
        
        load(settings)
        
    }
    
    //------------------------------------------------------------------
    
    const index = function (settings) {
        Vendor.all = new Map()
        
        if (settings) {
            if (settings.vendor_list) {
                $.each(settings.vendor_list, function (i, vendor) {
                    set_detail(vendor)
                    Vendor.all.set(Vendor.detail.id, Vendor.detail)
                    console.log(Vendor.detail)
                })
            }
        }
        
        if (_table_vendor_index) {
            
            $index_table = $(_table_vendor_index).table({
                table_type: "display_list",
                data: Array.from(Vendor.all.values()),
                columnDefs: [
                    {
                        title: "Id",
                        targets: 0,
                        data: "id",
                    },
                    {
                        title: "Name",
                        targets: 1,
                        data: "company_id",
                        render: function (data, type, row, meta) {
                            return data
                        },
                    },
                    {
                        title: "Is Provider",
                        targets: 2,
                        data: "is_provider",
                        render: function (data, type, row, meta) {
                            if (data && data === 1) {
                                return "<span class='text-success'>Yes</span>"
                            }
                            return "<span class='text-warning'>No</span>"
                        },
                    },
                ],
                rowClick: Vendor.navigate,
            })
        }
    }
    
    const init_provider_vendor = function (vendor) {
    
    }
    
    const navigate = function (vendor) {
        if (vendor) {
            console.log(vendor)
        }
        
    }
    
    return {
        detail: {
            id: null,
            company_id: null,
            status_id: null,
            sku: null,
            show_online: null,
            show_sales: null,
            show_ops: null,
            is_provider: null,
            phone_1: null,
            phone_2: null,
            fax: null,
            website: null,
            email: null,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            enabled: 1,
            note: null,
        },
        all: new Map(),
        validator: null,
        save: function () {
            save()
        },
        save_provider_vendor: function (provider_details) {
            save_provider_vendor(provider_details)
        },
        edit: function (contact) {
            edit(contact)
        },
        load: function (contacts) {
            load(contacts)
        },
        init: function (settings) {
            init(settings)
        },
        init_provider_vendor: function (vendor) {
            init_provider_vendor(vendor)
        },
        populate_provider_vendor_form: function () {
            populate_provider_vendor_form()
        },
        validate_provider_vendor: function () {
            return validate_provider_vendor()
        },
        validate_form: function () {
            return validate_form()
        },
        clear_provider_vendor_form: function () {
            clear_provider_vendor_form()
        },
        navigate: function (vendor) {
            navigate(vendor)
        },
        index: function (settings) {
            index(settings)
        },
    }
    
})()
