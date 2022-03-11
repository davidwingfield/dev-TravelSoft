jQuery(($) => {
    $.fn.timeSelect = function (opt) {
        let element = $(this)
        let filterMax = ""
        let elementId = element.attr("id")
        let separatorTime = ":"
        
        element.attr("id", "time-selector-" + elementId)
        
        let $element, $elementWrapper, $elementGroupWrapper, $elementGroupAppend, $buttonGroupAppend,
            $input, $inputLabel, $errorElement, $buttonGroupAppendClear, input, picker
        
        let defaults = {
            // Translations and clear button
            clear: 'Clear',
            
            // Formats
            format: 'h:i A',
            formatLabel: undefined,
            formatSubmit: undefined,
            hiddenPrefix: undefined,
            hiddenSuffix: '_submit',
            
            // Editable input
            editable: undefined,
            
            // Time intervals
            interval: 30,
            
            // Time limits
            min: undefined,
            max: undefined,
            
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
            label: "Time",
            placeholder: "Select Time",
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
                    if ((input.value.length === 2) && keyCode !== 8) {
                        input.value += separatorTime
                    }
                    
                    return true
                }
                
            }
            
            return false
        }
        
        const loadError = function (input) {
            let $errorElement = $(input).parents("div.form-element").find("div.error")
            
            $errorElement.html("Invalid Time. Only HH-MM format allowed.").show()
        }
        
        const unSetTimeError = function (input) {
            let $errorElement = $(input).parents("div.form-element").find("div.error")
            
            $errorElement.html("").hide()
        }
        
        function validate_time (time) {
            var a = true
            var time_arr = time.split(":")
            
            if (time_arr.length !== 2) {
                a = false
            } else {
                if (isNaN(time_arr[0]) || isNaN(time_arr[1])) {
                    a = false
                }
                if (time_arr[0] < 24 && time_arr[1] < 60) {
                    if (time_arr[0] && time_arr[1] && !isNaN(parseInt(time_arr[0])) && !isNaN(parseInt(time_arr[1]))) {
                        if (parseInt(time_arr[0]) <= 9) {
                            time_arr[0] = "0" + time_arr[0]
                        }
                        if (parseInt(time_arr[1]) <= 9) {
                            time_arr[0] = "0" + time_arr[0]
                        }
                        $(input).val(time_arr[0] + ":" + time_arr[1])
                    } else {
                        return false
                    }
                } else {
                    a = false
                }
            }
            return a
        }
        
        const validateTimeFormat = function (input, keyCode) {
            let timeString = input.value
            //let regex = /^\d{2,}:(?:[0-5]\d):(?:[0-5]\d)$/
            
            if (validate_time(timeString)) {
                //if (regex.test(timeString) || timeString.length === 0) {
                unSetTimeError(input)
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
                    TimeSelect.clear()
                    $input.val("").trigger("change")
                    unSetTimeError($input[0])
                })
            
            $input = $("<input>")
                .addClass("form-control time-format")
                .attr("id", elementId)
                .attr("type", "text")
                .attr("placeholder", settings.placeholder)
                .attr("maxlength", "5")
                .on("keydown", function (event) {
                    return isNumeric(this, event.keyCode)
                })
                .on("keyup", function (event) {
                    validateTimeFormat(this, event.keyCode)
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
            picker = $buttonGroupAppend.pickatime("picker")
        }
        
        const assignOptions = function (newOptions) {
            if (newOptions) {
                $.each(newOptions, function (k, v) {
                    defaults[k] = v
                })
            }
            
        }
        
        const clear = function () {
            
            if (TimeSelect.picker.clear()) {
                TimeSelect.picker.clear()
                TimeSelect.picker.set("select", moment().format("YYYY-MM-DD"), { format: "HH-i" })
                TimeSelect.picker.render()
                unSetTimeError($input[0])
            }
        }
        
        const set = function (opts) {
            if (!opts) {
                opts = {}
            }
            
            TimeSelect.picker.set(opts, { muted: true })
            
        }
        
        const value = function (date) {
            
            if (date) {
                TimeSelect.picker.set("select", date, { format: "HH-i" })
                TimeSelect.picker.render()
                return null
            } else {
                return ($input.val() === "") ? null : $input.val()
            }
            
        }
        
        const TimeSelect = {
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
                .pickatime(defaults)
                .on("change", function () {
                    if ($(this).val() === "") {
                        $input.val(filterMax)
                    } else {
                        $input.val($(this).val())
                    }
                    
                    $input.trigger("change")
                })
            
            picker = $buttonGroupAppend.pickatime("picker")
            toggleClearButton()
            TimeSelect.picker = $buttonGroupAppend.pickatime("picker")
        }
        
        init(element, opt)
        return TimeSelect
    }
})
