jQuery(($) => {
    $.fn.dateSelect = function (opt) {
        const regex = /(((19|20)\d\d)\-(0[1-9]|1[0-2])\-((0|1)[0-9]|2[0-9]|3[0-1]))$/
        
        let element = $(this)
        let elementId = element.attr("id")
        let separatorDate = "-"
        let currentYear = new Date().getFullYear() - 1
        let endYear = currentYear + 5
        let startDate = moment(currentYear + "-01-01").format("YYYY-MM-DD")
        let endDate = moment(endYear + "-12-31").format("YYYY-MM-DD")
        let $element, $elementWrapper, $elementGroupWrapper, $elementGroupAppend, $buttonGroupAppend,
            $input, $inputLabel, $errorElement, $buttonGroupAppendClear, input, picker
        
        let isShift = false
        
        /*
        console.log("|__ currentYear", currentYear)
        console.log("|__ endYear", endYear)
        console.log("|__ startDate", startDate)
        console.log("|__ endDate", endDate)
        //*/
        
        element.attr("id", "date-selector-" + elementId)
        
        let defaults = {
            
            // Strings and translations
            monthsFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            weekdaysFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            showMonthsShort: false,
            showWeekdaysFull: false,
            
            // Buttons
            today: "Today",
            clear: "Clear",
            close: "Close",
            
            // Accessibility labels
            labelMonthNext: "Next month",
            labelMonthPrev: "Previous month",
            labelMonthSelect: "Select a month",
            labelYearSelect: "Select a year",
            
            // Formats
            format: "yyyy-mm-dd",
            formatSubmit: "yyyy-mm-dd",
            //hiddenPrefix: "date-selector-" + elementId,
            hiddenSuffix: "_submit",
            hiddenName: undefined,
            
            // Editable input
            editable: undefined,
            
            // Dropdown selectors
            selectYears: 5,
            selectMonths: true,
            
            // First day of the week
            firstDay: 1,
            
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
            onSet: function (context) {
                $input.val(moment(context.select).format("YYYY-MM-DD"))
                toggleClearButton()
            },
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
                    console.log("event", event.keyCode)
                    
                    if ($(this).val() === "") {
                        DateSelect.clear()
                        unSetDateError($input[0])
                    } else {
                        validateDateFormat(this, event.keyCode)
                    }
                    
                    toggleClearButton()
                })
                .on("change", function (e) {
                    console.log("DateSelect.input:change(e)")
                    //e.preventDefault()
                    
                    if ($(this).val() === "") {
                        //unSetDateError($input[0])
                    }
                    
                    toggleClearButton()
                })
                .on("focus", function (e) {
                    /*
                    console.log("DateSelect.input:focus(e)")
                    console.log("|__ input.val()", $input.val())
                    console.log("|__ buttonGroupAppend.val()", $buttonGroupAppend.val())
                    console.log("|__ input.val()", $input.val())
                    //*/
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
            
            // ----
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
                unSetDateError($input[0])
            }
            
            $input.val("")
            $buttonGroupAppend.val("")
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
            fooListener: function (val) {
            
            },
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
                    if ($buttonGroupAppend.val() === "") {
                        $input.val("")
                    } else {
                        $input.val($(this).val())
                    }
                })
            
            picker = $buttonGroupAppend.pickadate("picker")
            DateSelect.picker = $buttonGroupAppend.pickadate("picker")
            
            toggleClearButton()
        }
        
        init(element, opt)
        return DateSelect
    }
})
