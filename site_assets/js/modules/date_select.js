jQuery(($) => {
    
    $.fn.dateSelect = function (opt) {
        let element = $(this)
        let filterMax = ""
        let elementId = element.attr("id")
        
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
        
        const buildElements = function (element, opt) {
            $element = element
            $elementWrapper = $("<div>")
              .addClass(`form-element`)
            
            $elementGroupWrapper = $("<div>")
              .addClass(`input-group mb-3`)
            
            $elementGroupAppend = $("<div>")
              .addClass(`input-group-append`)
            
            $buttonGroupAppend = $("<button type='button'>")
              .attr("id", "button-" + elementId)
              .attr("type", "button")
              .addClass(`btn btn-md btn-default m-0 px-3 py-2 z-depth-0 waves-effect waves-light`)
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
              })
            
            $input = $("<input>")
              .attr("id", elementId)
              .attr("type", "text")
              .attr("placeholder", settings.placeholder)
              .addClass("form-control date-format")
              .on("keydown", function (event) {
                  //return IsNumeric(document.getElementById(elementId), event.keyCode)
              })
              .on("keyup", function (event) {
                  //ValidateDateFormat(document.getElementById(elementId), event.keyCode)
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
              .attr("id", elementId + "-error")
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
        
        const getDate = function (date) {
            let today = new Date()
            let year = moment().year()
            let month = "01"
            let day = "01"
            
            if (date) {
                if (typeof date == "string") {
                    return moment(date, 'YYYY-MM-DD')
                }
                
            } else {
                let dd = today.getDate()
                let mm = today.getMonth() + 1
                let yyyy = today.getFullYear()
                return moment((yyyy) ? yyyy : moment().year() + "-" + mm + "-" + (dd > 9) ? "0" + dd : dd, 'YYYY-MM-DD')
            }
            
            return year + "-" + month + "-" + day
        }
        
        const clear = function () {
            
            if (DateSelect.picker.clear()) {
                DateSelect.picker.clear()
                DateSelect.picker.set("select", moment().format("YYYY-MM-DD"), { format: "yyyy-mm-dd" })
                DateSelect.picker.render()
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
                      $input.val(filterMax)
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
