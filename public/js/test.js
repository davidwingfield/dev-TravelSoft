const Package = (function () {
    "use strict"
    
    const _package_id = document.getElementById("package_id")
    const _package_name = document.getElementById("package_name")
    const _package_day_span = document.getElementById("package_day_span")
    const _package_city_id = document.getElementById("package_city_id")
    const _package_min_pax = document.getElementById("package_min_pax")
    const _package_max_pax = document.getElementById("package_max_pax")
    const _package_description_long = document.getElementById("package_description_long")
    const _package_description_short = document.getElementById("package_description_short")
    const _package_available_start_input = document.getElementById("package_available_start_input")
    const _package_available_start_button = document.getElementById("package_available_start_button")
    const _package_available_end_input = document.getElementById("package_available_end_input")
    const _package_available_end_button = document.getElementById("package_available_end_button")
    const _package_cost = document.getElementById("package_cost")
    const _package_price = document.getElementById("package_price")
    const _package_margin = document.getElementById("package_margin")
    const _package_enabled = document.getElementById("package_enabled")
    const _package_note = document.getElementById("package_note")
    const _package_add_modal_form = document.getElementById("package_add_modal_form")
    const _package_add_modal = document.getElementById("package_add_modal")
    const _package_test_button = document.getElementById("package_test_button")
    const _package_day_span_inc = document.getElementById("package_day_span_inc")
    const _package_day_span_dec = document.getElementById("package_day_span_dec")
    const _package_min_pax_inc = document.getElementById("package_min_pax_inc")
    const _package_min_pax_dec = document.getElementById("package_min_pax_dec")
    const _package_max_pax_inc = document.getElementById("package_max_pax_inc")
    const _package_max_pax_dec = document.getElementById("package_max_pax_dec")
    const _package_city_name_filter = document.getElementById("package_city_name_filter")
    const _package_name_filter = document.getElementById("package_name_filter")
    const _package_add_modal_form_cancel = document.getElementById("package_add_modal_form_cancel")
    const _package_add_modal_form_clear = document.getElementById("package_add_modal_form_clear")
    const _package_add_modal_form_save = document.getElementById("package_add_modal_form_save")
    const _package_cost_icon = document.getElementById("package_cost_icon")
    const _package_margin_icon = document.getElementById("package_margin_icon")
    const _package_price_icon = document.getElementById("package_price_icon")
    // ----
    let userId = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let globalSelectCity = false
    let globalSelectPackage = false
    let $availableStart, $availableEnd, availableStartPicker, availableEndPicker
    let startDate = null
    let endDate = null
    let packageRules = {
        groups: {
            packageGroup: "package_name_filter package_name",
            packageCityGroup: "package_city_name_filter package_city_id",
            
        },
        rules: {
            package_name: {
                required: true,
            },
            package_name_filter: {
                required: true,
            },
            package_city_id: {
                required: true,
            },
            package_city_name_filter: {
                required: true,
            },
            package_available_start_input: {
                required: true,
            },
            package_available_end_input: {
                required: true,
            },
            package_available_start_button: {
                required: true,
            },
            package_available_end_button: {
                required: true,
            },
        },
        messages: {
            package_name: {
                required: "Field Required",
            },
            package_name_filter: {
                required: "Field Required",
            },
            package_city_id: {
                required: "Field Required",
            },
            package_city_name_filter: {
                required: "Field Required",
            },
            package_available_start_input: {
                required: "Field Required",
            },
            package_available_end_input: {
                required: "Field Required",
            },
            package_available_start_button: {
                required: "Field Required",
            },
            package_available_end_button: {
                required: "Field Required",
            },
        },
    }
    // ----
    $(_package_add_modal_form_cancel)
        .on("click", function () {
            console.group("package_add_modal_form_cancel:click()")
            // ----
            resetForm()
            // ----
            console.groupEnd()
        })
    
    $(_package_add_modal_form_clear)
        .on("click", function () {
            console.group("package_add_modal_form_clear:click()")
            // ----
            clearForm()
            // ----
            console.groupEnd()
        })
    
    $(_package_add_modal_form_save)
        .on("click", function () {
            console.group("package_add_modal_form_save:click()")
            // ----
            
            save()
            
            // ----
            console.groupEnd()
        })
    $(_package_city_name_filter)
        .on("click", function (e) {
            console.group("package_city_name_filter:click()")
            // ----
            if ($(this).attr("readonly") === "readonly") {
                e.preventDefault()
            } else {
                $(this).select()
            }
            // ----
            console.groupEnd()
        })
        .on("keyup", function () {
            console.group("package_city_name_filter:keyup()")
            // ----
            globalSelectCity = false
            // ----
            console.groupEnd()
        })
        .on("search", function () {
            console.group("package_city_name_filter:search()")
            // ----
            // ----
            console.groupEnd()
        })
        .autocomplete({
            serviceUrl: "/api/v1.0/autocomplete/cities",
            minChars: 2,
            cache: false,
            dataType: "json",
            triggerSelectOnValidInput: false,
            paramName: "st",
            onSelect: function (suggestion) {
                console.group("package_city_name_filter:autocomplete - select")
                // ----
                if (!suggestion || !suggestion.data) {
                    return
                }
                
                globalSelectCity = true
                
                let city = (suggestion.data[0]) ? suggestion.data[0] : suggestion.data
                
                formatCityName(city)
                
                // ----
                console.groupEnd()
            },
        })
    
    $(_package_name_filter)
        .on("click", function (e) {
            console.group("package_name_filter:click()")
            // ----
            
            if ($(this).attr("readonly") === "readonly") {
                e.preventDefault()
            } else {
                $(this).select()
            }
            
            // ----
            console.groupEnd()
        })
        .on("keyup", function () {
            console.group("package_name_filter:keyup()")
            // ----
            
            globalSelectPackage = false
            
            // ----
            console.groupEnd()
        })
        .on("search", function () {
            console.group("package_name_filter:search()")
            // ----
            
            globalSelectPackage = false
            
            // ----
            console.groupEnd()
        })
        .autocomplete({
            serviceUrl: "/api/v1.0/autocomplete/packages",
            minChars: 2,
            cache: false,
            dataType: "json",
            triggerSelectOnValidInput: false,
            paramName: "st",
            onSelect: function (suggestion) {
                console.group("package_name_filter:autocomplete - select")
                // ----
                if (!suggestion || !suggestion.data) {
                    return
                }
                
                globalSelectPackage = true
                
                let _package = (suggestion.data[0]) ? suggestion.data[0] : suggestion.data
                console.log("package", _package)
                
                populateForm(_package)
                
                // ----
                console.groupEnd()
            },
        })
    
    $(_package_day_span_inc)
        .on("click", function () {
            console.group("package_day_span_inc:click()")
            // ----
            
            let input = this.parentNode.querySelector('input[type=number]')
            input.stepUp()
            
            // ----
            console.groupEnd()
        })
    
    $(_package_day_span_dec)
        .on("click", function () {
            console.group("package_day_span_dec:click()")
            // ----
            
            let input = this.parentNode.querySelector('input[type=number]')
            input.stepDown()
            
            // ----
            console.groupEnd()
        })
    
    $(_package_min_pax_inc)
        .on("click", function (e) {
            console.group("package_min_pax_inc:click()")
            // ----
            
            let input = this.parentNode.querySelector('input[type=number]')
            input.stepUp()
            
            // ----
            console.groupEnd()
        })
    
    $(_package_min_pax_dec)
        .on("click", function (e) {
            console.group("package_min_pax_dec:click()")
            // ----
            
            let input = this.parentNode.querySelector('input[type=number]')
            input.stepDown()
            
            // ----
            console.groupEnd()
        })
    
    $(_package_max_pax_inc)
        .on("click", function (e) {
            console.group("package_max_pax_inc:click()")
            // ----
            
            let input = this.parentNode.querySelector('input[type=number]')
            input.stepUp()
            
            // ----
            console.groupEnd()
        })
    
    $(_package_max_pax_dec)
        .on("click", function (e) {
            console.group("package_max_pax_dec:click()")
            // ----
            
            let input = this.parentNode.querySelector('input[type=number]')
            input.stepDown()
            
            // ----
            console.groupEnd()
        })
    
    $(_package_test_button)
        .on("click", function () {
            console.group("package_test_button:click()")
            // ----
            
            showPackageModal()
            
            // ----
            console.groupEnd()
        })
    // ----
    const showPackageModal = function () {
        console.group("showPackageModal")
        // ----
        
        $(_package_add_modal).modal("show")
        
        // ----
        console.groupEnd()
    }
    const hidePackageModal = function () {
        console.group("hidePackageModal")
        // ----
        
        $(_package_add_modal).modal("hide")
        
        // ----
        console.groupEnd()
    }
    const formatCityName = function (city) {
        console.group("formatCityName")
        // ----
        
        let country = (city && city.country) ? city.country : {}
        let province = (city && city.province) ? city.province : {}
        let formattedName = ""
        let countryNameFormatted, provinceNameFormatted, cityNameFormatted = ""
        let countryName = (country && country.name) ? country.name : null
        let countryISO2 = (country && country.iso2) ? country.iso2 : null
        let countryISO3 = (country && country.iso3) ? country.iso3 : null
        let provinceName = (province && province.name) ? province.name : null
        let provinceISO2 = (province && province.iso2) ? province.iso2 : null
        let provinceISO3 = (province && province.iso3) ? province.iso3 : null
        let cityName = (city && city.name) ? city.name : null
        
        switch (defaultLocationDisplayFormat.toLowerCase()) {
            case "short":
                countryNameFormatted = (countryISO2 !== null) ? countryISO2 : (countryISO3 !== null) ? countryISO3 : (countryName !== null) ? countryName : null
                provinceNameFormatted = (provinceISO2 !== null) ? provinceISO2 : (provinceISO3 !== null) ? provinceISO3 : (provinceName !== null) ? provinceName : null
                cityNameFormatted = (cityName !== null) ? cityName : null
                
                if (countryNameFormatted !== null && provinceNameFormatted !== null && cityNameFormatted !== null) {
                    formattedName = `${cityNameFormatted} (${provinceNameFormatted}, ${countryNameFormatted})`
                } else if (countryNameFormatted !== null && provinceNameFormatted !== null && cityNameFormatted === null) {
                    formattedName = `(${provinceNameFormatted}, ${countryNameFormatted})`
                } else if (countryNameFormatted !== null && provinceNameFormatted === null && cityNameFormatted === null) {
                    formattedName = `(${countryNameFormatted})`
                } else {
                    formattedName = ``
                }
                
                break
            case "medium":
                countryNameFormatted = (countryName !== null) ? countryName : (countryISO3 !== null) ? countryISO3 : (countryISO2 !== null) ? countryISO2 : null
                provinceNameFormatted = (provinceName !== null) ? provinceName : (provinceISO3 !== null) ? provinceISO3 : (provinceISO2 !== null) ? provinceISO2 : null
                cityNameFormatted = (cityName !== null) ? cityName : null
                
                if (countryNameFormatted !== null && provinceNameFormatted !== null && cityNameFormatted !== null) {
                    formattedName = `${cityNameFormatted} (${provinceNameFormatted}, ${countryNameFormatted})`
                } else if (countryNameFormatted !== null && provinceNameFormatted !== null && cityNameFormatted === null) {
                    formattedName = `(${provinceNameFormatted}, ${countryNameFormatted})`
                } else if (countryNameFormatted !== null && provinceNameFormatted === null && cityNameFormatted === null) {
                    formattedName = `(${countryNameFormatted})`
                } else {
                    formattedName = ``
                }
                
                break
            case "long":
                
                if (countryName !== null && countryISO3 !== null && countryISO2 !== null) {
                    countryNameFormatted = `${countryISO3}-${countryName}`
                } else if (countryName !== null && countryISO3 !== null && countryISO2 === null) {
                    countryNameFormatted = `${countryISO3}-${countryName}`
                } else if (countryName !== null && countryISO3 === null && countryISO2 === null) {
                    countryNameFormatted = `${countryName}`
                } else if (countryName === null && countryISO3 !== null && countryISO2 === null) {
                    countryNameFormatted = `${countryISO3}`
                } else if (countryName === null && countryISO3 === null && countryISO2 !== null) {
                    countryNameFormatted = `${countryISO2}`
                } else if (countryName !== null && countryISO3 === null && countryISO2 !== null) {
                    countryNameFormatted = `${countryISO2}-${countryName}`
                } else {
                    countryNameFormatted = null
                }
                
                if (provinceName !== null && provinceISO3 !== null && provinceISO2 !== null) {
                    provinceNameFormatted = `${provinceISO3}-${provinceName}`
                } else if (provinceName !== null && provinceISO3 !== null && provinceISO2 === null) {
                    provinceNameFormatted = `${provinceISO3}-${provinceName}`
                } else if (provinceName !== null && provinceISO3 === null && provinceISO2 === null) {
                    provinceNameFormatted = `${provinceName}`
                } else if (provinceName === null && provinceISO3 !== null && provinceISO2 === null) {
                    provinceNameFormatted = `${provinceISO3}`
                } else if (provinceName === null && provinceISO3 === null && provinceISO2 !== null) {
                    provinceNameFormatted = `${provinceISO2}`
                } else if (provinceName !== null && provinceISO3 === null && provinceISO2 !== null) {
                    provinceNameFormatted = `${provinceISO2}-${provinceName}`
                } else {
                    provinceNameFormatted = null
                }
                
                if (cityName !== null) {
                    cityNameFormatted = `${cityName}`
                } else {
                    cityNameFormatted = null
                }
                
                if (countryNameFormatted !== null && provinceNameFormatted !== null && cityNameFormatted !== null) {
                    formattedName = `${cityNameFormatted} (${provinceNameFormatted}, ${countryNameFormatted})`
                } else if (countryNameFormatted !== null && provinceNameFormatted !== null && cityNameFormatted === null) {
                    formattedName = `(${provinceNameFormatted}, ${countryNameFormatted})`
                } else if (countryNameFormatted !== null && provinceNameFormatted === null && cityNameFormatted === null) {
                    formattedName = `(${countryNameFormatted})`
                } else if (countryNameFormatted !== null && provinceNameFormatted === null && cityNameFormatted !== null) {
                    formattedName = `${cityNameFormatted} (${countryNameFormatted})`
                } else if (countryNameFormatted === null && provinceNameFormatted !== null && cityNameFormatted !== null) {
                    formattedName = `(${provinceNameFormatted}, ${countryNameFormatted})`
                } else {
                    formattedName = ``
                }
                
                break
            default:
                formattedName = ``
        }
        
        /*
        console.log("city", city)
        console.log("defaultLocationDisplayFormat", defaultLocationDisplayFormat)
        console.log("formattedName", formattedName)
        //*/
        
        // ----
        console.groupEnd()
        return formattedName
    }
    const resetForm = function () {
        console.group("resetForm")
        // ----
        
        clearForm()
        hidePackageModal()
        
        // ----
        console.groupEnd()
    }
    const clearForm = function () {
        console.group("clearForm")
        // ----
        
        _package_id.value = ""
        _package_name.value = ""
        _package_day_span.value = 1
        _package_city_id.value = ""
        _package_min_pax.value = 1
        _package_max_pax.value = 1
        _package_description_long.value = ""
        _package_description_short.value = ""
        
        _package_city_name_filter.value = ""
        _package_name_filter.value = ""
        
        availableStartPicker.set("clear")
        availableEndPicker.set("clear")
        
        _package_cost.value = 0
        _package_price.value = 0
        _package_margin.value = 0
        _package_enabled.checked = true
        
        availableStartPicker.set("select", false)
        availableEndPicker.set("select", false)
        
        _package_cost_icon.innerHTML = `&dollar;`
        _package_margin_icon.innerHTML = `&dollar;`
        _package_price_icon.innerHTML = `&dollar;`
        
        clearValidation(_package_add_modal_form)
        
        // ----
        console.groupEnd()
    }
    const populateForm = function (_package) {
        console.group("populateForm")
        // ----
        
        clearForm()
        
        let currency = (_package && _package.currency) ? _package.currency : {}
        let city = (_package && _package.city) ? _package.city : {}
        let symbol = (currency.symbol) ? currency.symbol : "&dollar;"
        let startDate = (_package && _package.available_start) ? _package.available_start : false
        let endDate = (_package && _package.available_end) ? _package.available_end : false
        let cityNameFilter = formatCityName(city)
        
        _package_id.value = (_package && !isNaN(parseInt(_package.id))) ? parseInt(_package.id) : null
        _package_day_span.value = (_package && !isNaN(parseInt(_package.day_span))) ? parseInt(_package.day_span) : 1
        _package_city_id.value = (_package && !isNaN(parseInt(_package.city_id))) ? parseInt(_package.city_id) : null
        _package_min_pax.value = (_package && !isNaN(parseInt(_package.min_pax))) ? parseInt(_package.min_pax) : 1
        _package_max_pax.value = (_package && !isNaN(parseInt(_package.max_pax))) ? parseInt(_package.max_pax) : 1
        
        _package_city_name_filter.value = cityNameFilter
        _package_description_long.value = (_package && _package.description_long) ? _package.description_long : null
        _package_description_short.value = (_package && _package.description_short) ? _package.description_short : null
        
        _package_cost.value = (_package && !isNaN(parseInt(_package.cost))) ? parseInt(_package.cost) : 0
        _package_price.value = (_package && !isNaN(parseInt(_package.price))) ? parseInt(_package.price) : 0
        _package_margin.value = (_package && !isNaN(parseInt(_package.margin))) ? parseInt(_package.margin) : 0
        
        _package_name_filter.value = (_package && _package.name) ? _package.name : null
        _package_name.value = (_package && _package.name) ? _package.name : null
        
        availableStartPicker.set("select", startDate)
        availableEndPicker.set("select", endDate)
        
        _package_cost_icon.innerHTML = symbol
        _package_margin_icon.innerHTML = symbol
        _package_price_icon.innerHTML = symbol
        
        // ----
        console.groupEnd()
    }
    const handleNumberClick = function (_this) {
        console.group("Package.handleNumberClick")
        // ----
        
        let el = _this
        let $el = $(el)
        let $parent = $(el).parent("div.number-button")
        
        console.log("el", el)
        console.log("el.dataset", el.dataset)
        
        // ----
        console.groupEnd()
    }
    const handlePackageError = function (msg, title, level) {
        console.group("Package.handlePackageError")
        // ----
        
        if (!title) {
            title = "Product"
        }
        
        if (!level) {
            level = "error"
        }
        
        if (!msg) {
            msg = "Error"
        }
        
        toastr[level](`${msg}`, title)
        
        // ----
        console.groupEnd()
    }
    const initModalFields = function () {
        console.group("initModalFields")
        // ----
        
        $(function () {
            
            initializeValidator(packageRules)
            Package.validator = $(_package_add_modal_form).validate()
            
            $availableStart = $(_package_available_start_button)
                .on("click", function (e) {
                    e.preventDefault()
                    e.stopPropagation()
                })
                .pickadate({
                    format: "yyyy-mm-dd",
                    formatSubmit: "yyyy-mm-dd",
                    editable: false,
                    selectYears: true,
                    selectMonths: true,
                    container: "#main",
                })
            
            availableStartPicker = $availableStart.pickadate("picker")
            
            $availableEnd = $(_package_available_end_button)
                .on("click", function (e) {
                    e.preventDefault()
                    e.stopPropagation()
                })
                .pickadate({
                    format: "yyyy-mm-dd",
                    formatSubmit: "yyyy-mm-dd",
                    editable: false,
                    selectYears: true,
                    selectMonths: true,
                    container: "#main",
                })
            
            availableEndPicker = $availableEnd.pickadate("picker")
            
            $(_package_available_start_input)
                .on("search", function () {
                    availableStartPicker.set("clear")
                })
            
            $(_package_available_end_input)
                .on("search", function () {
                    availableEndPicker.set("clear")
                })
            
            availableStartPicker
                .on({
                    open: function (event) {
                        console.group("availableStartPicker.on - open")
                        // ----
                        
                        if ($(_package_available_start_button).val()) {
                            //console.log("Note: ", "User is making a change to js-date-from")
                        }
                        
                        // ----
                        console.groupEnd()
                    },
                    close: function (event) {
                        console.group("availableStartPicker.on - close")
                        // ----
                        
                        $(document.activeElement).blur()
                        
                        // ----
                        console.groupEnd()
                    },
                    set: function (event) {
                        console.group("availableStartPicker.on - set")
                        // ----
                        
                        let fromSelect = availableStartPicker.get("select")
                        let toSelect = availableEndPicker.get("select")
                        
                        /*
                        console.log("fromSelect", fromSelect)
                        console.log("toSelect", toSelect)
                        //*/
                        
                        if (event.update) {
                            console.group("update")
                            // ----
                            
                            let fromDate = $(_package_available_end_input).val()
                            console.log("fromDate", fromDate)
                            
                            formatDateRange(startDate, endDate)
                            
                            // ----
                            console.groupEnd()
                        } else if (event.select) {
                            console.group("select")
                            // ----
                            
                            if (fromSelect) {
                                let fromYear = fromSelect.year
                                let fromMonth = fromSelect.month
                                let fromDay = fromSelect.date
                                let date = new Date(fromYear, fromMonth, fromDay)
                                let fromDate = moment(date, defaultDateFormat).format(defaultDateFormat)
                                let fromDatePlus1 = moment(date, defaultDateFormat).add(1, "days").format(defaultDateFormat)
                                let fromDateSubtract1 = moment(date, defaultDateFormat).subtract(1, "days").format(defaultDateFormat)
                                startDate = fromDate
                                if (fromDay && !isNaN(parseInt(fromDay))) {
                                    if (parseInt(fromDay) < 10) {
                                        fromDay = "0" + fromDay
                                    }
                                }
                                
                                if (fromMonth && !isNaN(parseInt(fromMonth))) {
                                    fromMonth = fromMonth + 1
                                    
                                    if (parseInt(fromMonth) < 10) {
                                        fromMonth = "0" + fromMonth
                                    }
                                }
                                
                                /*
                                console.log("moment(fromSelect).add(1, 'day')", moment(fromSelect).add(1, "day"))
                                console.log("fromYear", fromYear)
                                console.log("fromMonth", fromMonth)
                                console.log("fromDay", fromDay)
                                console.log("date", date)
                                console.log("fromDate", fromDate)
                                console.log("fromDatePlus1", fromDatePlus1)
                                console.log("fromDateSubtract1", fromDateSubtract1)
                                //*/
                                
                                if (fromDate) {
                                    _package_available_start_input.value = fromDate
                                    availableStartPicker.set("min", false)
                                    availableStartPicker.set("max", false)
                                    availableEndPicker.set("min", fromDatePlus1)
                                    availableEndPicker.set("max", false)
                                }
                                
                            }
                            
                            formatDateRange(startDate, endDate)
                            
                            // ----
                            console.groupEnd()
                        } else if ("clear" in event) {
                            console.group("clear")
                            // ----
                            
                            startDate = null
                            _package_available_start_input.value = ""
                            
                            if (toSelect) {
                                availableStartPicker.set("min", false)
                                availableStartPicker.set("max", moment(toSelect).subtract(1, "day"))
                            } else {
                                availableStartPicker.set("min", false)
                                availableStartPicker.set("max", false)
                                availableEndPicker.set("min", false)
                                availableEndPicker.set("max", false)
                            }
                            
                            formatDateRange(startDate, endDate)
                            
                            // ----
                            console.groupEnd()
                        } else {
                        
                        }
                        
                        // ----
                        console.groupEnd()
                    },
                })
            
            availableEndPicker
                .on({
                    open: function (event) {
                        console.group("availableEndPicker.on - open")
                        // ----
                        
                        if ($(_package_available_end_button).val()) {
                            //console.log("Note: ", "User is making a change to js-date-from")
                        }
                        
                        // ----
                        console.groupEnd()
                    },
                    close: function (event) {
                        console.group("availableEndPicker.on - close")
                        // ----
                        
                        $(document.activeElement).blur()
                        
                        // ----
                        console.groupEnd()
                    },
                    set: function (event) {
                        console.group("availableEndPicker.on - set")
                        // ----
                        
                        let fromSelect = availableStartPicker.get("select")
                        let toSelect = availableEndPicker.get("select")
                        
                        //*
                        //console.log("fromSelect", fromSelect)
                        //console.log("toSelect", toSelect)
                        //*/
                        
                        if (event.update) {
                            console.group("update")
                            // ----
                            
                            formatDateRange(startDate, endDate)
                            
                            // ----
                            console.groupEnd()
                        } else if (event.select) {
                            console.group("select")
                            // ----
                            
                            if (toSelect) {
                                //*
                                let toYear = toSelect.year
                                let toMonth = toSelect.month
                                let toDay = toSelect.date
                                let date = new Date(toYear, toMonth, toDay)
                                let toDate = moment(date, defaultDateFormat).format(defaultDateFormat)
                                let toDatePlus1 = moment(date, defaultDateFormat).add(1, "days").format(defaultDateFormat)
                                let toDateSubtract1 = moment(date, defaultDateFormat).subtract(1, "days").format(defaultDateFormat)
                                endDate = toDate
                                
                                if (toDay && !isNaN(parseInt(toDay))) {
                                    if (parseInt(toDay) < 10) {
                                        toDay = "0" + toDay
                                    }
                                }
                                
                                if (toMonth && !isNaN(parseInt(toMonth))) {
                                    toMonth = toMonth + 1
                                    
                                    if (parseInt(toMonth) < 10) {
                                        toMonth = "0" + toMonth
                                    }
                                }
                                //*/
                                /*
                                console.log("toYear", toYear)
                                console.log("toMonth", toMonth)
                                console.log("toDay", toDay)
                                console.log("date", date)
                                console.log("toDate", toDate)
                                console.log("toDatePlus1", toDatePlus1)
                                console.log("toDateSubtract1", toDateSubtract1)
                                //*/
                                //*
                                if (toDate) {
                                    
                                    _package_available_end_input.value = toDate
                                } else {
                                    
                                    _package_available_end_input.value = ""
                                    
                                }
                                //*/
                                
                                formatDateRange(startDate, endDate)
                                
                            }
                            
                            // ----
                            console.groupEnd()
                        } else if ("clear" in event) {
                            console.group("clear")
                            // ----
                            
                            endDate = null
                            _package_available_end_input.value = ""
                            formatDateRange(startDate, endDate)
                            
                            // ----
                            console.groupEnd()
                        }
                        
                        // ----
                        console.groupEnd()
                    },
                })
            
            clearForm()
            
        })
        
        // ----
        console.groupEnd()
    }
    const init = function (options) {
        console.group("Package.init")
        // ----
        
        initModalFields()
        
        // ----
        console.groupEnd()
    }
    const defaultDetail = function () {
        console.group("defaultDetail")
        // ----
        
        let detail = {
            id: null,
            name: null,
            day_span: 1,
            city_id: null,
            min_pax: 1,
            max_pax: null,
            description_long: null,
            description_short: null,
            available_start: null,
            available_end: null,
            cost: null,
            price: null,
            margin: null,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: userId,
            date_modified: formatDateMySQL(),
            modified_by: userId,
            note: null,
        }
        
        // ----
        console.groupEnd()
        return detail
    }
    const set = function (_package) {
        console.group("set")
        // ----
        
        let detail = defaultDetail()
        
        detail.id = (_package && !isNaN(parseInt(_package.id))) ? parseInt(_package.id) : null
        detail.day_span = (_package && !isNaN(parseInt(_package.day_span))) ? parseInt(_package.day_span) : 1
        detail.city_id = (_package && !isNaN(parseInt(_package.city_id))) ? parseInt(_package.city_id) : null
        detail.min_pax = (_package && !isNaN(parseInt(_package.min_pax))) ? parseInt(_package.min_pax) : 1
        detail.max_pax = (_package && !isNaN(parseInt(_package.max_pax))) ? parseInt(_package.max_pax) : null
        detail.cost = (_package && !isNaN(parseInt(_package.cost))) ? parseInt(_package.cost) : 0
        detail.price = (_package && !isNaN(parseInt(_package.price))) ? parseInt(_package.price) : 0
        detail.margin = (_package && !isNaN(parseInt(_package.margin))) ? parseInt(_package.margin) : 0
        detail.created_by = (_package && !isNaN(parseInt(_package.created_by))) ? parseInt(_package.created_by) : userId
        detail.modified_by = (_package && !isNaN(parseInt(_package.modified_by))) ? parseInt(_package.modified_by) : userId
        
        detail.name = (_package && _package.name) ? _package.name : null
        detail.description_short = (_package && _package.description_short) ? _package.description_short : null
        detail.description_long = (_package && _package.description_long) ? _package.description_long : null
        detail.available_start = (_package && _package.available_start) ? _package.available_start : null
        detail.available_end = (_package && _package.available_end) ? _package.available_end : null
        detail.note = (_package && _package.note) ? _package.note : null
        
        detail.date_created = (_package && _package.date_created) ? _package.date_created : formatDateMySQL()
        detail.date_modified = (_package && _package.date_modified) ? _package.date_modified : formatDateMySQL()
        
        // ----
        console.groupEnd()
    }
    const buildRecord = function () {
        console.group("buildRecord")
        // ----
        
        let data = {
            id: (_package_id && !isNaN(parseInt(_package_id.value))) ? parseInt(_package_id.value) : null,
            name: (_package_name_filter) ? _package_name_filter.value : null,
            day_span: (_package_day_span && !isNaN(parseInt(_package_day_span.value))) ? parseInt(_package_day_span.value) : null,
            city_id: (_package_city_id && !isNaN(parseInt(_package_city_id.value))) ? parseInt(_package_city_id.value) : null,
            min_pax: (_package_min_pax && !isNaN(parseInt(_package_min_pax.value))) ? parseInt(_package_min_pax.value) : null,
            max_pax: (_package_max_pax && !isNaN(parseInt(_package_max_pax.value))) ? parseInt(_package_max_pax.value) : null,
            description_long: (_package_description_long) ? _package_description_long.value : null,
            description_short: (_package_description_short) ? _package_description_short.value : null,
            available_start: (_package_available_start_input) ? _package_available_start_input.value : null,
            available_end: (_package_available_end_input) ? _package_available_end_input.value : null,
            cost: (_package_cost && !isNaN(parseInt(_package_cost.value))) ? parseInt(_package_cost.value) : null,
            price: (_package_price && !isNaN(parseInt(_package_price.value))) ? parseInt(_package_price.value) : null,
            margin: (_package_margin && !isNaN(parseInt(_package_margin.value))) ? parseInt(_package_margin.value) : null,
            enabled: (_package_enabled.checked === false) ? 0 : 1,
            note: (_package_note) ? _package_note.value : null,
        }
        
        // ----
        console.groupEnd()
        return removeNulls(data)
    }
    const save = function () {
        console.group("save")
        // ----
        
        let dataToSend
        
        if ($(_package_add_modal_form).valid()) {
            dataToSend = buildRecord()
            console.log("dataToSend", dataToSend)
        }
        
        // ----
        console.groupEnd()
    }
    return {
        all: new Map(),
        detail: {},
        validator: null,
        init: function (settings) {
            init(settings)
        },
    }
})()

$(function () {
    Package.init({})
})
