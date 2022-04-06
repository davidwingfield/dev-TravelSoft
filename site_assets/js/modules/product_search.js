function ProductSearch (element, options) {
    console.group("ProductSearch")
    // ----
    
    if (!(options && element)) {
        console.error("ProductSearch - Missing options.")
        return
    }
    
    let categories = (options && options.categories) ? options.categories : new Map()
    let userId = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let baseId = (element.id) ? element.id : "product_search"
    let defaults = {
        regex: /(((19|20)\d\d)\-(0[1-9]|1[0-2])\-((0|1)[0-9]|2[0-9]|3[0-1]))$/,
        separator_date: "-",
        pickadate_settings: {
            format: "yyyy-mm-dd",
            formatSubmit: "yyyy-mm-dd",
            editable: false,
            selectYears: true,
            selectMonths: true,
            container: "#main",
        },
        list_settings: {},
        hidden_elements: {
            product_name: {
                id: "product_name",
                label: "Product Name:",
            },
            product_id: {
                id: "product_id",
                label: "Product Id:",
            },
            category_id: {
                id: "category_id",
                label: "Category Id:",
            },
            country_id: {
                id: "country_id",
                label: "Country Id:",
            },
            province_id: {
                id: "province_id",
                label: "Province Id:",
            },
            city_id: {
                id: "city_id",
                label: "City Id:",
            },
            from_date: {
                id: "from_date",
                label: "From Date:",
            },
            to_date: {
                id: "to_date",
                label: "To Date:",
            },
            adult_count: {
                id: "adult_count",
                label: "Adult Count:",
            },
            child_count: {
                id: "child_count",
                label: "Child Count:",
            },
            room_count: {
                id: "room_count",
                label: "Room Count:",
            },
        },
        urls: {},
        messages: {},
        error: {},
        tpl: {
            toggle: "<a><i class='fas fa-sliders-h'></i></a>",
            heading: "<div class='d-flex justify-content-between'><h5 class=''><span class=''>Tour Route</span></h5></div>",
            container: "<ul class='list-group route-manager-wrapper'></ul>",
        },
    }
    
    this.categories = categories
    this.userId = userId
    this.element = element
    this.baseId = baseId
    this.isInit = false
    this.errorsEvent = $.Event("productsearch.errors")
    this.errorsEvent.errors = []
    this.isDisabled = false
    this.tabs = []
    this.tab_content = []
    this.search_results = []
    
    // Location
    this.global_location_select = false
    this.location_search = null
    this.location_button = null
    this.location_button_content = null
    this.popup_location_title = null
    this.popup_location_content = null
    this.popup_location_input = null
    this.popup_location_close_button = null
    this.popup_location_update_button = null
    this.location_popup = null
    this.popup_location_heading_text = null
    // ./Location
    
    // From Date
    this.from_date_button = null
    this.from_date_button_content = null
    this.from_date_search = null
    this.popup_from_date_close_button = null
    this.popup_from_date_update_button = null
    this.popup_from_date_wrapper = null
    this.popup_from_date_button_label = null
    this.popup_from_date_button = null
    this.popup_from_date_input_label = null
    this.popup_from_date_input = null
    this.popup_from_date_error = null
    this.popup_from_date_title = null
    this.from_date_button_label = null
    this.popup_from_date_content = null
    this.popup_from_date_heading_text = null
    this.from_popup = null
    this.from_picker = null
    this.popup_from_date_button = null
    // ./From Date
    
    // To Date
    this.to_date_button = null
    this.to_date_button_content = null
    this.to_date_search = null
    this.popup_to_date_close_button = null
    this.popup_to_date_update_button = null
    this.popup_to_date_wrapper = null
    this.popup_to_date_button_label = null
    this.popup_to_date_button = null
    this.popup_to_date_input_label = null
    this.popup_to_date_input = null
    this.popup_to_date_error = null
    this.popup_to_date_title = null
    this.to_date_button_label = null
    this.popup_to_date_content = null
    this.popup_to_date_heading_text = null
    this.to_popup = null
    this.to_picker = null
    this.popup_to_date_button = null
    // ./To Date
    
    // Name
    this.global_name_select = false
    this.name_search = null
    this.name_button = null
    this.name_button_content = null
    this.popup_name_title = null
    this.popup_name_content = null
    this.popup_name_form = null
    this.popup_name_input = null
    this.popup_name_close_button = null
    this.popup_name_update_button = null
    this.name_popup = null
    this.popup_name_heading_text = null
    // ./Name
    
    // Travelers
    this.global_travelers_select = false
    this.travelers_search = null
    this.travelers_button = null
    this.travelers_button_content = null
    this.popup_travelers_title = null
    this.popup_travelers_content = null
    this.popup_travelers_room_inc = document.createElement("div")
    this.popup_travelers_room_dec = document.createElement("div")
    this.popup_travelers_room_input = document.createElement("input")
    this.popup_travelers_adult_inc = document.createElement("div")
    this.popup_travelers_adult_dec = document.createElement("div")
    this.popup_travelers_adult_input = document.createElement("input")
    this.popup_travelers_child_inc = document.createElement("div")
    this.popup_travelers_child_dec = document.createElement("div")
    this.popup_travelers_child_input = document.createElement("input")
    this.popup_travelers_input = null
    this.popup_travelers_close_button = null
    this.popup_travelers_update_button = null
    this.travelers_popup = null
    // ./Travelers
    
    // Tabs
    this.base_tab_row = null
    // ./Tabs
    
    // Error Elements
    this.name_button_error = buildRow({ classes: ["text-danger", "text-center", "w-100"] })
    this.location_button_error = buildRow({ classes: ["text-danger", "text-center", "w-100"] })
    this.travelers_button_error = buildRow({ classes: ["text-danger", "text-center", "w-100"] })
    this.from_date_button_error = buildRow({ classes: ["text-danger", "text-center", "w-100"] })
    this.to_date_button_error = buildRow({ classes: ["text-danger", "text-center", "w-100"] })
    // ./Error Elements
    
    // Containers
    let hiddenFieldsContainer = buildRow({ classes: ["card", "card-body", "transparent", "z-depth-0", "p-1", "m-0", "mt-2"] })
    this.hidden_fields_container = $(hiddenFieldsContainer)
    this.base_search_container = buildRow({ classes: ["card", "card-body", "transparent", "z-depth-0", "p-0", "mb-2"] })
    
    this.container = $(element)
    // ./Containers
    
    this.product_search_button_content = null
    this.product_search = null
    this.product_search_button = null
    
    this.product_search_reset_button_content = null
    this.product_search_reset = null
    this.product_search_reset_button = null
    
    this.product_search_results_element = document.createElement("ul")
    this.product_search_results_filter_element = document.createElement("div")
    
    // Hidden Fields
    this.product_name = null
    this.product_id = null
    this.country_id = null
    this.province_id = null
    this.city_id = null
    this.from_date = null
    this.to_date = null
    this.category_id = null
    this.adult_count = null
    this.child_count = null
    this.room_count = null
    // ./Hidden Fields
    
    this.settings = $.extend(true, defaults, options)
    
    //
    this.init(options)
    this.setDateTitle()
    
    //
    this.init = this.init.bind(this)
    //
    
    this.sort_by_name = null
    this.sort_by_price = null
    this.sort_by_rating = null
    this.filter_by_name = null
    
    this.listCallback = this.listCallback.bind(this)
    this.closeLocationSearch = this.closeLocationSearch.bind(this)
    this.closeFromDateSearch = this.closeFromDateSearch.bind(this)
    this.closeToDateSearch = this.closeToDateSearch.bind(this)
    this.closeNameSearch = this.closeNameSearch.bind(this)
    this.closeTravelersSearch = this.closeTravelersSearch.bind(this)
    this.updateTravelersSearch = this.updateTravelersSearch.bind(this)
    this.updateLocationSearch = this.updateLocationSearch.bind(this)
    this.clickOutsideLocationSearch = this.clickOutsideLocationSearch.bind(this)
    this.clickOutsideFromDateSearch = this.clickOutsideFromDateSearch.bind(this)
    this.clickOutsideToDateSearch = this.clickOutsideToDateSearch.bind(this)
    this.clickOutsideNameSearch = this.clickOutsideNameSearch.bind(this)
    this.clickOutsideTravelersSearch = this.clickOutsideTravelersSearch.bind(this)
    this.handleDateBlur = this.handleDateBlur.bind(this)
    this.handleDateKeyDown = this.handleDateKeyDown.bind(this)
    this.handleDateSelect = this.handleDateSelect.bind(this)
    this.handleDateKeyUp = this.handleDateKeyUp.bind(this)
    this.handleDateClear = this.handleDateClear.bind(this)
    this.executeSearch = this.executeSearch.bind(this)
    this.updateNameSearch = this.updateNameSearch.bind(this)
    this.handleError = this.handleError.bind(this)
    this.resetSearch = this.resetSearch.bind(this)
    this.generateTravelersSearchContent = this.generateTravelersSearchContent.bind(this)
    
    // ----
    
    this.popup_travelers_update_button.on("click", this.generateTravelersSearchContent)
    this.popup_name_update_button.on("click", this.updateNameSearch)
    this.popup_name_close_button.on("click", this.closeNameSearch)
    this.popup_location_close_button.on("click", this.closeLocationSearch)
    this.popup_from_date_close_button.on("click", this.closeFromDateSearch)
    this.popup_to_date_close_button.on("click", this.closeToDateSearch)
    this.popup_location_update_button.on("click", this.updateLocationSearch)
    this.popup_to_date_input.on("keydown", this.handleDateKeyDown)
    this.popup_to_date_input.on("keyup", this.handleDateKeyUp)
    this.popup_to_date_input.on("click", this.handleDateSelect)
    this.popup_to_date_input.on("search", this.handleDateClear)
    this.popup_to_date_input.on("blur", this.handleDateBlur)
    this.popup_from_date_input.on("keydown", this.handleDateKeyDown)
    this.popup_from_date_input.on("keyup", this.handleDateKeyUp)
    this.popup_from_date_input.on("click", this.handleDateSelect)
    this.popup_from_date_input.on("search", this.handleDateClear)
    this.popup_travelers_close_button.on("click", this.updateTravelersSearch)
    this.popup_travelers_update_button.on("click", this.updateTravelersSearch)
    this.product_search.on("click", this.executeSearch)
    this.product_search_reset.on("click", this.resetSearch)
    
    //
    
    this.resetSearch()
    
    // ----
    console.groupEnd()
}

ProductSearch.prototype.listCallback = function () {
    console.group("listCallback")
    // ----
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.init = function (options) {
    console.group("init")
    // ----
    
    let categories = (this.categories) ? Array.from(this.categories.values()) : []
    let _this = this
    
    this.isInit = true
    
    $.each(categories, function (k, category) {
        let categoryName = (category.name) ? category.name : null
        let categoryNameSnakeCase = categoryName.toSnakeCase()
        let categoryNameCamelCase = categoryName.toCamelCase()
        let categoryNameUCase = categoryName.toUCWords()
        
        _this.tabs[categoryNameSnakeCase] = null
        _this.tab_content[categoryNameSnakeCase] = null
        
    })
    
    this.createElements(options)
    
    // ----
    console.groupEnd()
}

ProductSearch.prototype.assignEvents = function () {
    console.group("assignEvents")
    // ----
    
    let _this = this
    let categoryId = (this.category_id && !isNaN(parseInt(this.category_id.value))) ? parseInt(this.category_id.value) : null
    
    this.popup_travelers_adult_input.addEventListener("change", function (e) {
        _this.handleNumberChange(this)
    })
    this.popup_travelers_adult_input.addEventListener("click", function (e) {
        _this.popup_travelers_adult_input.select()
    })
    this.popup_travelers_child_input.addEventListener("change", function (e) {
        _this.handleNumberChange(this)
    })
    this.popup_travelers_child_input.addEventListener("click", function (e) {
        this.select()
    })
    this.popup_travelers_room_input.addEventListener("change", function (e) {
        _this.handleNumberChange(this)
    })
    this.popup_travelers_room_input.addEventListener("click", function (e) {
        this.select()
    })
    this.popup_travelers_adult_inc.addEventListener("click", function (e) {
        _this.numberIncrease(this)
    })
    this.popup_travelers_adult_dec.addEventListener("click", function (e) {
        _this.numberDecrease(this)
    })
    this.popup_travelers_child_inc.addEventListener("click", function (e) {
        _this.numberIncrease(this)
    })
    this.popup_travelers_child_dec.addEventListener("click", function (e) {
        _this.numberDecrease(this)
    })
    this.popup_travelers_room_inc.addEventListener("click", function (e) {
        _this.numberIncrease(this)
    })
    this.popup_travelers_room_dec.addEventListener("click", function (e) {
        _this.numberDecrease(this)
    })
    
    this.popup_name_input
        .on("search", function () {
            console.group("this.popup_name_input: search")
            // ----
            
            _this.resetNameSearch()
            _this.global_name_select = false
            
            // ----
            console.groupEnd()
        })
        .on("click", function (e) {
            if ($(this).attr("readonly") === "readonly") {
                e.preventDefault()
            } else {
                $(this).select()
            }
        })
        .on("keyup", function () {
            console.group("this.popup_name_input: keyup")
            // ----
            
            _this.global_name_select = false
            _this.product_name.value = _this.popup_name_input.val()
            
            //*
            console.log("this.global_name_select", _this.global_name_select)
            console.log("this.product_name.value", _this.product_name.value)
            //*/
            
            // ----
            console.groupEnd()
        })
        .autocomplete({
            serviceUrl: "/api/v1.0/autocomplete/products",
            minChars: 2,
            cache: false,
            dataType: "json",
            triggerSelectOnValidInput: false,
            params: { "category_id": categoryId },
            paramName: "st",
            onSelect: function (suggestion) {
                if (!suggestion.data) {
                    return
                }
                
                _this.handleProductNameSelect((suggestion.data[0]) ? suggestion.data[0] : suggestion.data)
                
            },
        })
    this.name_button.popover({
        html: true,
        placement: function (context, src) {
            $(context).addClass("popover-name")
            return 'auto'
        },
        title: _this.popup_name_title,
        content: _this.popup_name_content,
        container: "body",
    })
    this.name_button.on("show.bs.popover", function () {
        window.addEventListener("click", _this.clickOutsideNameSearch)
    })
    this.name_button.on("shown.bs.popover", function () {
        _this.popup_name_input.focus()
    })
    this.name_button.on("hide.bs.popover", function () {
        if (_this.to_date.value === "") {
            _this.resetToDateSearch()
            _this.unSetDateError(_this.popup_to_date_input)
        }
        window.removeEventListener("click", _this.clickOutsideNameSearch)
    })
    
    this.location_button.popover({
        container: "body",
        html: true,
        placement: function (context, src) {
            $(context).addClass("popover-location")
            return 'auto'
        },
        title: () => this.popup_location_title,
        content: () => this.popup_location_content,
    })
    this.location_button.on("show.bs.popover", function () {
        window.addEventListener("click", _this.clickOutsideLocationSearch)
    })
    this.location_button.on("shown.bs.popover", function () {
        _this.popup_location_input.focus()
    })
    this.location_button.on("hide.bs.popover", function () {
        window.removeEventListener("click", _this.clickOutsideLocationSearch)
    })
    
    this.travelers_button.popover({
        container: "body",
        html: true,
        placement: function (context, src) {
            $(context).addClass("popover-travelers")
            return "auto"
        },
        title: () => this.popup_travelers_title,
        content: () => this.popup_travelers_content,
    })
    this.travelers_button.on("show.bs.popover", function () {
        window.addEventListener("click", _this.clickOutsideTravelersSearch)
    })
    this.travelers_button.on("hide.bs.popover", function () {
        window.removeEventListener("click", _this.clickOutsideTravelersSearch)
    })
    
    this.from_date_button.popover({
        container: "body",
        html: true,
        placement: function (context, src) {
            $(context).addClass("popover-from-date")
            return 'auto'
        },
        content: () => this.popup_from_date_content,
        title: () => this.popup_from_date_title,
    })
    this.from_date_button.on("show.bs.popover", function () {
        window.addEventListener("click", _this.clickOutsideFromDateSearch)
    })
    this.from_date_button.on("shown.bs.popover", function () {
        _this.popup_from_date_input.focus()
    })
    this.from_date_button.on("hide.bs.popover", function () {
        if (_this.from_date.value === "") {
            _this.resetFromDateSearch()
            _this.unSetDateError(_this.popup_from_date_input)
        }
        window.removeEventListener("click", _this.clickOutsideFromDateSearch)
    })
    
    this.to_date_button.popover({
        container: "body",
        html: true,
        placement: function (context, src) {
            $(context).addClass("popover-to-date")
            return 'auto'
        },
        title: () => this.popup_to_date_title,
        content: () => this.popup_to_date_content,
    })
    this.to_date_button.on("show.bs.popover", function () {
        window.addEventListener("click", _this.clickOutsideToDateSearch)
    })
    this.to_date_button.on("shown.bs.popover", function () {
        _this.popup_to_date_input.focus()
    })
    this.to_date_button.on("hide.bs.popover", function () {
        if (_this.to_date.value === "") {
            _this.resetToDateSearch()
            _this.unSetDateError(_this.popup_to_date_input)
        }
        window.removeEventListener("click", _this.clickOutsideToDateSearch)
    })
    
    this.popup_location_input
        .on("search", function () {
            _this.resetLocationSearch()
        })
        .on("click", function (e) {
            if ($(this).attr("readonly") === "readonly") {
                e.preventDefault()
            } else {
                $(this).select()
            }
        })
        .on("keypress", function () {
            _this.resetLocationSearch()
        })
        .autocomplete({
            serviceUrl: "/api/v1.0/autocomplete/location_search",
            minChars: 2,
            cache: false,
            dataType: "json",
            triggerSelectOnValidInput: false,
            paramName: "st",
            onSelect: function (suggestion) {
                if (!suggestion.data) {
                    return
                }
                
                let displayShort = ""
                let displayMedium = ""
                let displayLong = ""
                let data = (suggestion.data[0]) ? suggestion.data[0] : suggestion.data
                let country = (data && data.country) ? data.country : null
                let province = (data && data.province) ? data.province : null
                let city = (data && data.city) ? data.city : null
                
                let countryId = (country && country.id && !isNaN(parseInt(country.id))) ? parseInt(country.id) : null
                let provinceId = (province && province.id && !isNaN(parseInt(province.id))) ? parseInt(province.id) : null
                let cityId = (city && city.id && !isNaN(parseInt(city.id))) ? parseInt(city.id) : null
                
                let countryName = (country && country.name) ? country.name : null
                let provinceName = (province && province.name) ? province.name : null
                let cityName = (city && city.name) ? city.name : null
                
                let countryISO2 = (country && country.iso2) ? country.iso2 : null
                let provinceISO2 = (province && province.iso2) ? province.iso2 : null
                
                let countryISO3 = (country && country.iso3) ? country.iso3 : null
                let provinceISO3 = (province && province.iso3) ? province.iso3 : null
                
                let shortCountry, mediumCountry, longCountry,
                    shortProvince, mediumProvince, longProvince,
                    shortCity, mediumCity, longCity = null
                
                shortCity = (cityName) ? cityName : null
                mediumCity = (cityName) ? cityName : null
                longCity = (cityName) ? cityName : null
                
                shortProvince = (provinceISO2) ? provinceISO2 : (provinceISO3) ? provinceISO3 : (provinceName) ? provinceName : null
                mediumProvince = (provinceName) ? provinceName : (provinceISO2) ? provinceISO2 : (provinceISO3) ? provinceISO3 : null
                longProvince = (provinceName) ? provinceName : (provinceISO3) ? provinceISO3 : (provinceISO2) ? provinceISO2 : null
                
                shortCountry = (countryISO3 !== null) ? countryISO3 : (countryName !== null) ? countryName : (countryISO2 !== null) ? countryISO2 : null
                mediumCountry = (countryName) ? countryName : null
                longCountry = (countryName !== null) ? countryName : (countryISO3 !== null) ? countryISO3 : (countryISO2 !== null) ? countryISO2 : null
                
                if (shortCity !== null && shortProvince !== null && shortCountry !== null) {
                    displayShort = `${shortCity} (${shortProvince} - ${shortCountry})`
                } else if (shortCity === null && shortProvince !== null && shortCountry !== null) {
                    displayShort = `${shortProvince} - ${shortCountry}`
                } else {
                    displayShort = `${shortCountry}`
                }
                
                displayMedium = `${mediumCity} (${mediumProvince} - ${mediumCountry})`
                displayLong = `${longCity} (${longProvince} - ${longCountry})`
                
                _this.global_location_select = true
                _this.country_id.value = (countryId !== null) ? countryId : ""
                _this.province_id.value = (provinceId !== null) ? provinceId : ""
                _this.city_id.value = (cityId !== null) ? cityId : ""
                _this.location_button_content.html(displayShort)
                _this.location_button.addClass("active")
            },
        })
    
    this.popup_from_date_button = $(".input_from").pickadate(this.settings.pickadate_settings)
    this.popup_to_date_button = $(".input_to").pickadate(this.settings.pickadate_settings)
    this.from_picker = this.popup_from_date_button.pickadate("picker")
    this.to_picker = this.popup_to_date_button.pickadate("picker")
    
    this.to_picker.on({
        open: function (event) {},
        close: function (event) {
            //console.log("to_picker: close")
            // ----
            
            $(document.activeElement).blur()
        },
        set: function (event) {
            let fromDate, toDate, fromDatePlus1, fromDateSubtract1,
                toDatePlus1, toDateSubtract1, fromYear, fromMonth, fromDay,
                toYear, toMonth, toDay
            
            let fromSelect = _this.from_picker.get("select")
            let toSelect = _this.to_picker.get("select")
            
            if (event.update) {
                
                let toDate = _this.popup_to_date_input.val()
                
                if (toDate === "") {
                    _this.to_picker.clear()
                } else {
                    _this.to_picker.clear()
                    _this.to_picker.set("select", toDate)
                }
                
            } else if (event.select) {
                
                if (toSelect) {
                    let date = new Date(toSelect.year, toSelect.month, toSelect.date)
                    
                    toYear = toSelect.year
                    toMonth = toSelect.month
                    toDay = toSelect.date
                    
                    if (toMonth && !isNaN(parseInt(toMonth))) {
                        toMonth = toMonth + 1
                        
                        if (parseInt(toMonth) < 10) {
                            toMonth = "0" + toMonth
                        }
                    }
                    if (toDay && !isNaN(parseInt(toDay))) {
                        if (parseInt(toDay) < 10) {
                            toDay = "0" + toDay
                        }
                    }
                    
                    toDate = moment(date, "YYYY-MM-DD").format("YYYY-MM-DD")
                    
                    if (fromSelect) {
                        _this.from_picker.set("min", _this.from_picker.get("select"))
                        _this.from_picker.set("max", _this.to_picker.get("select"))
                        
                        _this.to_picker.set("min", _this.from_picker.get("select"))
                        _this.to_picker.set("max", _this.to_picker.get("select"))
                    } else {
                        _this.from_picker.set("min", false)
                        _this.from_picker.set("max", _this.to_picker.get("select"))
                        
                        _this.to_picker.set("min", _this.to_picker.get("select"))
                        _this.to_picker.set("max", _this.to_picker.get("select"))
                    }
                    
                    _this.updateToDateSearch(toDate)
                }
            } else if ("clear" in event) {
                
                _this.updateToDateSearch()
            }
        },
    })
    
    this.from_picker.on({
        open: function (event) {
            if (_this.popup_from_date_button.val()) {
                //console.log("Note: ", "User is making a change to js-date-from")
            }
        },
        close: function (event) {
            $(document.activeElement).blur()
        },
        set: function (event) {
            if (event.update) {
                
                let fromDate = _this.popup_from_date_input.val()
                
                if (fromDate === "") {
                    _this.from_picker.clear()
                } else {
                    if (_this.to_picker.get("select")) {
                        //$("input[name='input_from_submit']").val(event.update.date)
                        _this.from_picker.set("select", fromDate)
                    }
                }
                if (_this.to_picker.get("select")) {
                    _this.from_picker.clear()
                    _this.from_picker.set("select", fromDate)
                } else {
                    _this.from_picker.clear()
                    _this.from_picker.set("select", fromDate)
                }
                
            } else if (event.select) {
                
                let fromDate, toDate, fromDatePlus1, fromDateSubtract1,
                    toDatePlus1, toDateSubtract1, fromYear, fromMonth, fromDay,
                    toYear, toMonth, toDay
                
                let fromSelect = _this.from_picker.get("select")
                let toSelect = _this.to_picker.get("select")
                
                if (fromSelect) {
                    let date = new Date(fromSelect.year, fromSelect.month, fromSelect.date)
                    
                    fromDate = moment(date, "YYYY-MM-DD").format("YYYY-MM-DD")
                    fromDatePlus1 = moment(date, "YYYY-MM-DD").add(1, "days").format("YYYY-MM-DD")
                    fromDateSubtract1 = moment(date, "YYYY-MM-DD").subtract(1, "days").format("YYYY-MM-DD")
                    
                    fromYear = fromSelect.year
                    fromMonth = fromSelect.month
                    fromDay = fromSelect.date
                    
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
                    
                    _this.updateFromDateSearch(fromDate)
                }
                if (toSelect) {
                    toYear = toSelect.year
                    toMonth = toSelect.month
                    toDay = toSelect.date
                    
                    if (toDay && !isNaN(parseInt(toDay))) {
                        if (parseInt(toDay) < 10) {
                            toDay = "0" + toDay
                        }
                    }
                    
                    if (toMonth && !isNaN(parseInt(toMonth))) {
                        toMonth = toMonth + 1
                        
                        if (parseInt(fromMonth) < 10) {
                            toMonth = "0" + toMonth
                        }
                    }
                    
                    toDate = moment(toYear + "-" + toMonth + "-" + toDay, "YYYY-MM-DD").format("YYYY-MM-DD")
                    toDatePlus1 = moment(toYear + "-" + toMonth + "-" + toDay, "YYYY-MM-DD").add(1, "days").format("YYYY-MM-DD")
                    toDateSubtract1 = moment(toYear + "-" + toMonth + "-" + toDay, "YYYY-MM-DD").subtract(1, "days").format("YYYY-MM-DD")
                    
                } else {
                    let new_date = moment(fromSelect).add(1, "day")
                    _this.to_picker.set("min", new_date)
                    _this.to_picker.set("max", false)
                }
                
                if (fromDatePlus1) {
                    _this.from_picker.set("max", fromDatePlus1)
                    _this.to_picker.set("min", fromDatePlus1)
                }
                
            } else if ("clear" in event) {
                
                _this.to_picker.clear()
                
                //
                
                _this.from_picker.set("min", false)
                _this.from_picker.set("max", false)
                _this.to_picker.set("min", false)
                _this.to_picker.set("max", false)
                
                _this.resetToDateSearch()
                _this.resetFromDateSearch()
                
            }
        },
    })
    
    if (this.from_picker.get("value")) {
        _this.to_picker.set("min", _this.from_picker.get("select"))
    }
    
    $('a[data-toggle="tab"]')
        .on("shown.bs.tab", function (e) {
            let categoryId = (e.target.dataset.categoryId && !isNaN(parseInt(e.target.dataset.categoryId))) ? parseInt(e.target.dataset.categoryId) : null
            _this.handleTabChange(categoryId)
        })
    
    let listItem = document.createElement("li")
    let listItemRating = document.createElement("ul")
    
    listItem.classList.add("product-search-list-item")
    listItem.classList.add("list-group-item")
    listItem.classList.add("border-0")
    
    listItemRating.classList.add("product-search-list-item")
    
    listItem.appendChild(listItemRating)
    
    this.sort_by_name.addEventListener("click", function (e) {
        console.group("sortByName:click(e)")
        // ----
        
        let el = e.target
        
        //*
        console.log("e", e)
        console.log("e.target", e.target)
        console.log("e.target.classList", e.target.classList)
        console.log("e", e)
        //*/
        
        $(_this.sort_by_name).removeClass("asc")
        $(_this.sort_by_name).removeClass("desc")
        $(_this.sort_by_price).removeClass("asc")
        $(_this.sort_by_price).removeClass("desc")
        
        // ----
        console.groupEnd()
    })
    
    this.sort_by_price.addEventListener("click", function (e) {
        console.group("sortByPrice:click(e)")
        // ----
        
        //*
        console.log("$(_this.sort_by_name)", $(_this.sort_by_name))
        console.log("$(_this.sort_by_rating)", $(_this.sort_by_rating))
        console.log("$(_this.sort_by_price)", $(_this.sort_by_price))
        //*/
        
        $(_this.sort_by_name).removeClass("asc")
        $(_this.sort_by_name).removeClass("desc")
        $(_this.sort_by_rating).removeClass("asc")
        $(_this.sort_by_rating).removeClass("desc")
        
        // ----
        console.groupEnd()
    })
    
    this.sort_by_rating.addEventListener("click", function (e) {
        $(_this.sort_by_name).removeClass("asc")
        $(_this.sort_by_name).removeClass("desc")
        $(_this.sort_by_price).removeClass("asc")
        $(_this.sort_by_price).removeClass("desc")
    })
    
    // ----
    
    this.search_results = new List("product-search-list", {
        valueNames: [
            "name",
            "address",
            "rating",
            "pricing",
            { data: ["id"] },
            {
                name: "image",
                attr: "src",
            },
            {
                name: "viewLink",
                data: ["id"],
            },
        ],
        item: `
			<li class="list-group-item border-0" data-id="">

				<div class="card p-0 m-0 mb-1">

					<div class="row">
	
						<div class="col-12 col-md-3 col-xl-3">
							<img src="" alt="thumbnail" class="img-thumbnail m-1 image" />
							<ul class="rating mb-1 w-100" ></ul>
						</div>
		
						<div class="col-12 col-md-5 col-xl-7">
							<h5 class="font-weight-bold dark-grey-text mb-2 name"></h5>
							<address class="m-0 p-0 address"></address>
							<p class="averageprice"></p>
						</div>
	
						<div class="col-12 col-md-4 col-xl-2">

							<div class="text-right h-100 w-100">
								<a type="button" class="btn-floating deep-purple m-1" data-method="view" onclick="listCallBack(this)"><i class="fas fa-eye" aria-hidden="true"></i></a>
								<a type="button" class="btn-floating indigo m-1" data-method="edit" onclick="listCallBack(this)"><i class="fas fa-edit" aria-hidden="true"></i></a>
								<a type="button" class="btn-floating cyan m-1" data-method="add" onclick="listCallBack(this)"><i class="fas fa-plus" aria-hidden="true"></i></a>
							</div>

						</div>
	
					</div>

					<hr class="ml-3 mr-3 mt-2 mb-2 color-dark">

					<div class="w-100 mb-2 pricing" ></div>

				</div>

			</li>
			`,
    })
    
    // ----
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.handleSortClick = function (e) {
    console.group("handleSortClick")
    // ----
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.handleError = function (msg, title, level) {
    console.group("handleError")
    console.log("msg", msg)
    console.log("title", title)
    console.log("level", level)
    // ----
    
    if (!msg) {
        msg = "Product Search Error"
    }
    
    if (!title) {
        title = "Product Search"
    }
    
    if (!level) {
        level = "error"
    }
    
    toastr[level](`${msg}`, title)
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.handleNumberChange = function (el) {
    console.group("handleNumberChange")
    console.log("el", el)
    // ----
    
    let _this = this
    let direction = (el && el.dataset && el.dataset.direction) ? el.dataset.direction : null
    let type = (el && el.dataset && el.dataset.type) ? el.dataset.type : null
    let input = el
    let min, numberValue = 0
    
    numberValue = (!isNaN(parseInt(input.value))) ? parseInt(input.value) : 0
    
    switch (type) {
        case "adult":
            min = (input.min) ? parseInt(input.min) : 1
            numberValue = (!isNaN(parseInt(input.value))) ? (parseInt(input.value) < min) ? parseInt(min) : parseInt(input.value) : min
            _this.adult_count.value = numberValue
            break
        case "child":
            min = (input.min) ? parseInt(input.min) : 0
            numberValue = (!isNaN(parseInt(input.value))) ? (parseInt(input.value) < min) ? parseInt(min) : parseInt(input.value) : min
            _this.child_count.value = numberValue
            break
        case "room":
            min = (input.min) ? parseInt(input.min) : 1
            numberValue = (!isNaN(parseInt(input.value))) ? (parseInt(input.value) < min) ? parseInt(min) : parseInt(input.value) : min
            _this.room_count.value = numberValue
            break
        default:
            console.log("default")
            console.log("el", el)
            console.log("el.dataset", el.dataset)
            console.log("input", input)
            console.log("direction", direction)
            console.log("type", type)
    }
    
    this.generateTravelersSearchContent()
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.handleTabChange = function (categoryId) {
    console.group("handleTabChange")
    // ----
    
    if (!categoryId || isNaN(parseInt(categoryId))) {
        categoryId = null
    }
    
    this.category_id.value = categoryId
    
    this.clearBaseSearchFields()
    
    switch (categoryId) {
        case 1:
            $("[data-hotel-search='true']").show()
            break
        case 2:
            $("[data-flight-search='true']").show()
            break
        case 3:
            $("[data-car-search='true']").show()
            break
        case 4:
            $("[data-rail-search='true']").show()
            break
        case 5:
            $("[data-transport-search='true']").show()
            break
        case 6:
            $("[data-tour-search='true']").show()
            break
        case 7:
            $("[data-cruise-search='true']").show()
            break
        case 8:
            $("[data-package-search='true']").show()
            break
        case 9:
            $("[data-other-search='true']").show()
            break
    }
    
    this.setDateTitle()
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.handleDateClear = function (event) {
    console.group("handleDateClear")
    // ----
    
    let dateType = (event && event.target && event.target.dataset && event.target.dataset.type) ? event.target.dataset.type : null
    let dateEl, picker
    
    if (dateType === "from_date") {
        this.updateFromDateSearch()
    } else if (dateType === "to_date") {
        this.updateToDateSearch()
    }
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.handleDateBlur = function (event) {
    console.group("handleDateBlur")
    // ----
    
    let dateType = (event && event.target && event.target.dataset && event.target.dataset.type) ? event.target.dataset.type : null
    let dateEl, picker
    
    if (dateType === "from_date") {
    
    } else if (dateType === "to_date") {
    
    }
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.handleDateChange = function (event) {
    console.group("handleDateChange")
    // ----
    
    let dateType = (event && event.target && event.target.dataset && event.target.dataset.type) ? event.target.dataset.type : null
    let dateEl, picker
    
    if (dateType === "from_date") {
        
        this.updateFromDateSearch()
    } else if (dateType === "to_date") {
        this.updateToDateSearch()
    }
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.handleDateKeyUp = function (event) {
    console.group("handleDateKeyUp")
    // ----
    
    let dateType = (event && event.target && event.target.dataset && event.target.dataset.type) ? event.target.dataset.type : null
    let dateEl, dateVal
    
    if (dateType === "from_date") {
        dateEl = this.popup_from_date_input[0]
    } else if (dateType === "to_date") {
        dateEl = this.popup_to_date_input[0]
    }
    
    dateVal = dateEl.value
    
    //console.log("dateEl", dateEl)
    //console.log("dateVal", dateVal)
    //console.log("$(dateEl)", $(dateEl))
    
    if (dateVal === "") {
        this.unSetDateError($(dateEl))
    } else {
        this.validateDateFormat(dateEl, event.keyCode)
    }
    
    //*
    //console.log("dateType", dateType)
    //console.log("dateEl", dateEl)
    //console.log("dateVal", dateVal)
    //*/
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.handleDateSelect = function (event) {
    console.group("handleDateSelect")
    // ----
    
    const starts = event.target.selectionStart
    
    let textSelected
    
    if (starts < 5) {
        event.target.setSelectionRange(0, 4)
    } else if (starts >= 5 && starts < 8) {
        event.target.setSelectionRange(5, 7)
    } else if (starts >= 8 && starts < 11) {
        event.target.setSelectionRange(8, 10)
    } else {
        event.target.setSelectionRange(0, event.target.value.length)
    }
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.handleProductNameSelect = function (product) {
    console.group("handleProductNameSelect")
    // ----
    
    this.global_name_select = true
    this.name_button_content.html((product && product.name) ? product.name : "")
    this.product_name.value = (product && product.name) ? product.name : ""
    this.product_id.value = (product && !isNaN(parseInt(product.id))) ? parseInt(product.id) : ""
    this.name_button.addClass("active")
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.handleDateKeyDown = function (event) {
    console.group("handleDateKeyDown")
    // ----
    
    let dateType = (event && event.target && event.target.dataset && event.target.dataset.type) ? event.target.dataset.type : null
    let dateEl
    
    if (dateType === "from_date") {
        dateEl = this.popup_from_date_input[0]
    } else if (dateType === "to_date") {
        dateEl = this.popup_to_date_input[0]
    }
    
    if (event.keyCode === 9) {
        
        if (dateType === "from_date") {
            //$("#to_date").focus()
            
        } else if (dateType === "to_date") {
        
        }
    }
    
    event.stopPropagation()
    
    // ----
    console.groupEnd()
    return isNumeric(dateEl, event.keyCode)
    
}
ProductSearch.prototype.numberIncrease = function (el) {
    console.group("numberIncrease")
    console.log("el", el)
    // ----
    
    let _this = this
    let direction = (el && el.dataset && el.dataset.direction) ? el.dataset.direction : null
    let type = (el && el.dataset && el.dataset.type) ? el.dataset.type : null
    let input = el.parentNode.querySelector('input[type=number]')
    let min, numberValue = 0
    
    if (!input || !type || !direction) {
        console.error("Missing Input")
        console.log("input", input)
        console.log("direction", direction)
        console.log("type", type)
        return
    }
    
    input.stepUp()
    numberValue = input.value
    
    switch (type) {
        case "adult":
            min = (input.min) ? parseInt(input.min) : 1
            numberValue = (!isNaN(parseInt(input.value))) ? (parseInt(input.value) < min) ? parseInt(min) : parseInt(input.value) : min
            _this.adult_count.value = numberValue
            break
        case "child":
            min = (input.min) ? parseInt(input.min) : 0
            numberValue = (!isNaN(parseInt(input.value))) ? (parseInt(input.value) < min) ? parseInt(min) : parseInt(input.value) : min
            _this.child_count.value = numberValue
            break
        case "room":
            min = (input.min) ? parseInt(input.min) : 1
            numberValue = (!isNaN(parseInt(input.value))) ? (parseInt(input.value) < min) ? parseInt(min) : parseInt(input.value) : min
            _this.room_count.value = numberValue
            break
        default:
            console.log("default")
            console.log("el", el)
            console.log("el.dataset", el.dataset)
            console.log("input", input)
            console.log("direction", direction)
            console.log("type", type)
    }
    
    this.generateTravelersSearchContent()
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.numberDecrease = function (el) {
    console.group("numberDecrease")
    console.log("el", el)
    // ----
    
    let _this = this
    let direction = (el && el.dataset && el.dataset.direction) ? el.dataset.direction : null
    let type = (el && el.dataset && el.dataset.type) ? el.dataset.type : null
    let input = el.parentNode.querySelector('input[type=number]')
    let min, numberValue = 0
    
    if (!input || !type || !direction) {
        console.error("Missing Input")
        console.log("input", input)
        console.log("direction", direction)
        console.log("type", type)
        return
    }
    
    input.stepDown()
    numberValue = (!isNaN(parseInt(input.value))) ? parseInt(input.value) : 0
    
    switch (type) {
        case "adult":
            min = (input.min) ? parseInt(input.min) : 1
            numberValue = (!isNaN(parseInt(input.value))) ? (parseInt(input.value) < min) ? parseInt(min) : parseInt(input.value) : min
            _this.adult_count.value = numberValue
            break
        case "child":
            min = (input.min) ? parseInt(input.min) : 0
            numberValue = (!isNaN(parseInt(input.value))) ? (parseInt(input.value) < min) ? parseInt(min) : parseInt(input.value) : min
            _this.child_count.value = numberValue
            break
        case "room":
            min = (input.min) ? parseInt(input.min) : 1
            numberValue = (!isNaN(parseInt(input.value))) ? (parseInt(input.value) < min) ? parseInt(min) : parseInt(input.value) : min
            _this.room_count.value = numberValue
            break
        default:
            console.log("default")
            console.log("el", el)
            console.log("el.dataset", el.dataset)
            console.log("input", input)
            console.log("direction", direction)
            console.log("type", type)
    }
    
    this.generateTravelersSearchContent()
    
    // ----
    console.groupEnd()
}

ProductSearch.prototype.createElements = function (options) {
    console.group("createElements")
    // ----
    
    this.createHiddenFields(options)
    
    this.hidden_fields_container = $(this.hidden_fields_container)
    this.room_count.value = 1
    this.adult_count.value = 1
    this.child_count.value = 0
    
    this.createTabRow(options)
    this.createSearchElements(options)
    this.renderSearchElements(options)
    this.createSearchResultsBlock()
    this.renderSearchResultsBlock()
    
    this.popup_name_input = $(this.popup_name_input)
    this.popup_name_close_button = $(this.popup_name_close_button)
    this.popup_name_update_button = $(this.popup_name_update_button)
    
    this.popup_location_input = $(this.popup_location_input)
    this.popup_location_close_button = $(this.popup_location_close_button)
    this.popup_location_update_button = $(this.popup_location_update_button)
    
    this.popup_from_date_input = $(this.popup_from_date_input)
    this.popup_from_date_close_button = $(this.popup_from_date_close_button)
    
    this.popup_to_date_close_button = $(this.popup_to_date_close_button)
    this.popup_to_date_input = $(this.popup_to_date_input)
    
    this.product_search = $(this.product_search)
    this.product_search_reset = $(this.product_search_reset)
    
    this.travelers_search = $(this.travelers_search)
    this.popup_travelers_input = $(this.popup_travelers_input)
    this.popup_travelers_close_button = $(this.popup_travelers_close_button)
    this.popup_travelers_update_button = $(this.popup_travelers_update_button)
    
    //
    
    this.assignEvents(options)
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.createHiddenFields = function () {
    console.group("createHiddenFields")
    // ----
    
    let _this = this
    let hiddenElements = (this && this.settings && this.settings.hidden_elements) ? this.settings.hidden_elements : []
    let hidden_row_1 = buildRow({ classes: ["row"] })
    
    console.group("hiddenElements")
    $.each(hiddenElements, function (k, el) {
        hidden_row_1.appendChild(_this.buildHiddenField(el))
    })
    console.groupEnd()
    
    this.hidden_fields_container.append(hidden_row_1)
    
    //this.base_search_container.append(this.hidden_fields_container)
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.createTabRow = function (options) {
    console.group("createTabRow", options)
    // ----
    
    const buildTab = function (category) {
        console.group("buildTab")
        //console.log("category", category)
        // ----
        
        if (!category || !category.id || !category.name) {
            console.error("Missing category")
            return
        }
        
        let categoryId = (category.id) ? category.id : null
        let categoryName = (category.name) ? category.name : ""
        let categoryIcon = (category.icon) ? category.icon : ""
        let categoryNameSnakeCase = categoryName.toSnakeCase()
        let categoryNameCamelCase = categoryName.toCamelCase()
        let categoryNameUCase = categoryName.toUCWords()
        let panelId = _this.baseId + "_panel_" + categoryNameSnakeCase
        let tabId = _this.baseId + "_tab_" + categoryNameSnakeCase
        let linkId = _this.baseId + "_link_" + categoryNameSnakeCase
        let isActive = (categoryCount === 0) ? "active show" : ""
        let isSelected = (categoryCount === 0) ? "true" : "false"
        let tabElement = $(`<li id="${tabId}" class="nav-item"/>`)
        let tabElementLink = `<a class="nav-link ${isActive}" id="${linkId}" data-toggle="tab" data-category-id="${categoryId}" href="#${panelId}" role="tab" aria-controls="${panelId}" aria-selected="${isSelected}"><i class="${categoryIcon}"></i><br/>${categoryNameUCase}</a>`
        
        _this.tabs[categoryNameSnakeCase] = tabElement
        
        tabElement.append(tabElementLink)
        
        // ----
        console.groupEnd()
        return tabElement
    }
    const buildContainer = function (category) {
        console.group("buildContainer")
        //console.log("category", category)
        // ----
        
        if (!category || !category.id || !category.name) {
            console.error("Missing category")
            return
        }
        
        let categoryId = (category.id) ? category.id : null
        let categoryName = (category.name) ? category.name : ""
        let categoryIcon = (category.icon) ? category.icon : "fas fa-home"
        let categoryNameSnakeCase = categoryName.toSnakeCase()
        let categoryNameCamelCase = categoryName.toCamelCase()
        let categoryNameUCase = categoryName.toUCWords()
        let panelId = _this.baseId + "_panel_" + categoryNameSnakeCase
        let linkId = _this.baseId + "_link_" + categoryNameSnakeCase
        let isActive = (categoryCount === 0) ? "active show" : ""
        let containerElement = $(`<div class="tab-pane fade ${isActive}" id="${panelId}" role="tabpanel" aria-labelledby="${linkId}"/>`)
        let containerElementContentWrapper = $(`<div class="card-body p-0 m-0" data-category-id="${categoryId}" />`)
        let containerElementContentHeading = $(`<h5 class="card-title"><span>${categoryNameUCase}</span></h5>`)
        let containerElementContentContainer = $(`<div class="p-1"/>`)
        
        containerElementContentWrapper.append(containerElementContentHeading)
        containerElementContentWrapper.append(containerElementContentContainer)
        containerElement.append(containerElementContentWrapper)
        
        _this.tab_content[categoryNameSnakeCase] = containerElementContentContainer[0]
        
        // ----
        console.groupEnd()
        return containerElement
    }
    
    let _this = this
    let categoryCount = 0
    let categories = (this.categories) ? Array.from(this.categories.values()) : []
    let tabRow = $(`<ul class="nav nav-justified tabs-primary" role="tablist"/>`)
    let tabContent = $(`<div class="card"/>`)
    let tabWrapper = $("<div class='classic-tabs mx-0'/>")
    let tabContentWrapper = $("<div class='tab-content card p-1'/>")
    
    console.group("categories")
    $.each(categories, function (k, category) {
        if (categoryCount === 0) {
            _this.category_id.value = category.id
        }
        tabRow.append(buildTab(category))
        tabContentWrapper.append(buildContainer(category))
        
        categoryCount++
    })
    console.groupEnd()
    
    //tabContentWrapper.append(tabContent)
    
    tabWrapper.append(tabRow)
    tabWrapper.append(this.base_search_container)
    tabWrapper.append(tabContentWrapper)
    
    this.base_tab_row = tabRow
    
    this.container.append(tabWrapper)
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.createSearchElements = function (options) {
    console.group("createSearchElements")
    // ----
    
    let fromDateTitle = "Check In"
    let toDateTitle = "Check Out"
    
    this.createSearchElementsName(options)
    this.createSearchElementsLocation(options)
    this.createSearchElementsTravelers(options)
    this.createSearchElementsFromDate(options)
    this.createSearchElementsToDate(options)
    
    this.buildPopoverForm({
        type: "name",
        form_title: "Name",
        classes: "name-popover d-none",
        popover_content: this.popup_name_content,
        popover_title: this.popup_name_title,
    })
    this.buildPopoverForm({
        id: "popover_location_form",
        type: "location",
        classes: "d-none location-popover",
        form_title: "Going To",
        popover_content: this.popup_location_content,
        popover_title: this.popup_location_title,
    })
    this.buildPopoverForm({
        type: "from_date",
        form_title: fromDateTitle,
        classes: "from-date-popover d-none",
        popover_content: this.popup_from_date_content,
        popover_title: this.popup_from_date_title,
    })
    this.buildPopoverForm({
        type: "to_date",
        form_title: toDateTitle,
        classes: "to-date-popover d-none",
        popover_content: this.popup_to_date_content,
        popover_title: this.popup_to_date_title,
    })
    this.buildPopoverForm({
        type: "travelers",
        form_title: "Travelers",
        classes: "travelers-popover d-none",// d-none
        popover_content: this.popup_travelers_content,
        popover_title: this.popup_travelers_title,
    })
    
    this.location_search = this.buildLocationSearchButton(options)
    this.name_search = this.buildNameSearchButton(options)
    this.from_date_search = this.buildFromDateSearchButton(options)
    this.to_date_search = this.buildToDateSearchButton(options)
    this.travelers_search = this.buildTravelersSearchButton(options)
    this.product_search = this.buildProductSearchButton(options)
    this.product_search_reset = this.buildProductSearchResetButton(options)
    
    // ----
    console.groupEnd()
}

// ----

// ----

// ----
ProductSearch.prototype.executeSearch = function () {
    console.group("executeSearch")
    // ----
    
    this.search_results.clear()
    this.buildSearchCriteria()
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.resetSearch = function () {
    console.group("resetSearch")
    // ----
    
    this.resetNameSearch()
    this.resetLocationSearch()
    this.resetFromDateSearch()
    this.resetToDateSearch()
    this.resetTravelersSearch()
    this.clearAllErrors()
    this.resetSearchResultsBlock()
    
    this.search_results.clear()
    
    this.popup_name_input.val("")
    this.popup_location_input.val("")
    
    this.global_location_select = false
    this.global_name_select = false
    
    // ----
    console.groupEnd()
}
// ----
ProductSearch.prototype.populateSearchResultsBlock = function (results) {
    console.group("populateSearchResultsBlock")
    console.log("results", results)
    // ----
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.resetSearchResultsBlock = function () {
    console.group("resetSearchResultsBlock")
    // ----
    
    this.clearSearchResultsBlock()
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.clearSearchResultsBlock = function () {
    console.group("clearSearchResultsBlock")
    // ----
    
    //this.product_search_results_element.empty()
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.createSearchResultsBlock = function () {
    console.group("createSearchResultsBlock")
    // ----
    
    let _this = this
    let wrapper = buildRow({ classes: "card card-body" })
    let sortRow1 = buildRow({ classes: ["row", "mx-1"] })
    let sortRow1Col1 = buildColumn({ classes: ["col-12", "col-sm-3", "px-1"] })
    let sortRow1Col2 = buildColumn({ classes: ["col-12", "col-sm-3", "px-1"] })
    let sortRow1Col3 = buildColumn({ classes: ["col-12", "col-sm-3", "px-1"] })
    let sortRow1Col4 = buildColumn({ classes: ["col-12", "col-sm-3", "px-1"] })
    let div = document.createElement("div")
    let row_1 = buildRow({ classes: ["row", "mx-1"] })
    let row_1_col_1 = buildColumn({ classes: ["col-12", "col-md-4", "col-lg-3", "col-xl-2", "px-1"] })
    let row_1_col_2 = buildColumn({ classes: ["col-12", "col-md-8", "col-lg-9", "col-xl-10", "px-1"] })
    
    this.sort_by_name = document.createElement("button")
    this.sort_by_price = document.createElement("button")
    this.sort_by_rating = document.createElement("button")
    this.filter_by_name = document.createElement("input")
    
    this.product_search_results_element = document.createElement("ul")
    this.product_search_results_element.classList.add("list")
    this.product_search_results_element.setAttribute("id", "product_search_form-container")
    
    this.sort_by_name.classList.add("btn")
    this.sort_by_name.classList.add("btn-outline-primary")
    this.sort_by_name.classList.add("btn-sm")
    this.sort_by_name.classList.add("waves-effect")
    this.sort_by_name.classList.add("waves-light")
    this.sort_by_name.classList.add("sort")
    this.sort_by_name.setAttribute("data-sort", "name")
    this.sort_by_name.innerText = "Sort by Name"
    
    this.sort_by_price.classList.add("btn")
    this.sort_by_price.classList.add("btn-outline-primary")
    this.sort_by_price.classList.add("btn-sm")
    this.sort_by_price.classList.add("waves-effect")
    this.sort_by_price.classList.add("waves-light")
    this.sort_by_name.setAttribute("data-sort", "averageprice")
    this.sort_by_price.innerText = "Sort by Price"
    
    this.sort_by_rating.classList.add("btn")
    this.sort_by_rating.classList.add("btn-outline-primary")
    this.sort_by_rating.classList.add("btn-sm")
    this.sort_by_rating.classList.add("waves-effect")
    this.sort_by_rating.classList.add("waves-light")
    this.sort_by_name.setAttribute("data-sort", "rating")
    this.sort_by_rating.innerText = "Sort by Rating"
    
    this.filter_by_name.setAttribute("type", "search")
    this.filter_by_name.setAttribute("placeholder", "search")
    this.filter_by_name.classList.add("form-control")
    this.filter_by_name.classList.add("fuzzy-search")
    
    sortRow1Col1.appendChild(this.filter_by_name)
    sortRow1Col2.appendChild(this.sort_by_name)
    sortRow1Col3.appendChild(this.sort_by_price)
    sortRow1Col4.appendChild(this.sort_by_rating)
    
    sortRow1.appendChild(sortRow1Col1)
    sortRow1.appendChild(sortRow1Col2)
    sortRow1.appendChild(sortRow1Col3)
    sortRow1.appendChild(sortRow1Col4)
    
    div.setAttribute("id", "product-search-list")
    
    div.appendChild(sortRow1)
    div.appendChild(this.product_search_results_element)
    
    row_1_col_2.appendChild(div)
    
    row_1.appendChild(row_1_col_1)
    row_1.appendChild(row_1_col_2)
    
    wrapper.appendChild(row_1)
    
    this.search_results_wrapper = wrapper
    
    this.product_search_results_element = $(this.product_search_results_element)
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.renderSearchResultsBlock = function () {
    console.group("renderSearchResultsBlock")
    // ----
    
    this.container.append(this.search_results_wrapper)
    
    // ----
    console.groupEnd()
}
// ----

ProductSearch.prototype.buildHiddenField = function (options) {
    console.group("buildHiddenField")
    // ----
    
    if (!options) {
        return
    }
    
    let elementId = (options && options.id) ? this.baseId + options.id : null
    let elementLabelText = (options && options.label) ? options.label : "Element:"
    let COL = buildColumn({ classes: ["col-sm-3"] })
    let INPUT = document.createElement("input")
    let LABEL = document.createElement("label")
    
    INPUT.setAttribute("type", "hidden")
    INPUT.setAttribute("readonly", "readonly")
    INPUT.setAttribute("id", elementId)
    INPUT.setAttribute("name", elementId)
    INPUT.classList.add("form-control")
    INPUT.classList.add("dev-element")
    this[options.id] = INPUT
    
    LABEL.setAttribute("for", this.baseId + "-city-id")
    LABEL.classList.add("dev-element")
    LABEL.classList.add("d-none")
    LABEL.innerText = elementLabelText
    
    COL.appendChild(LABEL)
    COL.appendChild(INPUT)
    
    // ----
    console.groupEnd()
    return COL
}
ProductSearch.prototype.buildPopoverForm = function (options) {
    console.group("buildPopoverForm")
    console.log("options", options)
    // ----
    
    let popoverType = (options && options.type) ? options.type : null
    let popoverBodyClass = (options && options.type) ? "popover-" + options.type + "-body" : null
    let popoverTitle = (options && options.popover_title) ? options.popover_title : document.createElement("h3")
    
    let popoverForm = document.createElement("div")
    let popoverFormBody = document.createElement("div")
    let classes = (options && options.classes) ? options.classes : ["d-none"]
    let id = (options && options.id) ? options.id : "popover-" + popoverType + "-form"
    
    if (!Array.isArray(classes)) {
        classes = classes.split(" ")
    }
    
    console.log("popoverForm", popoverForm)
    
    console.group("classes")
    console.log("classes", classes)
    $.each(classes, function (i, className) {
        if (className !== null && className !== "") {
            console.log("className", className)
            popoverForm.classList.add(className)
        }
        
    })
    console.groupEnd()
    
    popoverForm.setAttribute("id", id)
    
    popoverFormBody.classList.add("popover-body")
    popoverFormBody.classList.add(popoverBodyClass)
    //popoverFormHead.appendChild((options && options.popover_title) ? options.popover_title : document.createElement("div"))
    popoverFormBody.appendChild((options && options.popover_content) ? options.popover_content : document.createElement("div"))
    
    popoverForm.appendChild(popoverTitle)
    popoverForm.appendChild(popoverFormBody)
    
    if (this[options.name]) {
        this[options.name] = popoverForm
    }
    document.body.appendChild(popoverForm)
    
    this.popup_name_form = $(popoverForm)
    // ----
    console.groupEnd()
}

ProductSearch.prototype.validateDateFormat = function (input, keyCode) {
    console.group("validateDateFormat")
    // ----
    
    let dateType = (input.dataset && input.dataset.type) ? input.dataset.type : null
    let dateString = (input && input.value !== null) ? input.value : ""
    let picker
    let _this = this
    let isShift = false
    let dateStringYear, dateStringMonth, dateStringDay
    let regex = this.settings.regex
    
    if (keyCode === 16) {
        isShift = true
    }
    
    if (regex.test(dateString) || dateString.length === 0) {
        this.unSetDateError(input)
        
        if (input && $(input).attr("id")) {
            if (dateType === "from_date") {
                picker = this.from_picker
            } else if (dateType === "to_date") {
                picker = this.to_picker
            } else {
                this.loadError(input, "Oops")
            }
            
            dateStringYear = (!isNaN(parseInt(dateString.substring(0, 4)))) ? parseInt(dateString.substring(0, 4)) : null
            dateStringMonth = (!isNaN(parseInt(dateString.substring(5, 7)))) ? parseInt(dateString.substring(5, 7)) - 1 : null
            dateStringDay = (!isNaN(parseInt(dateString.substring(8, 10)))) ? parseInt(dateString.substring(8, 10)) : null
            
            if ((dateStringYear !== null) && (dateStringMonth !== null) && (dateStringDay !== null)) {
                let theDate = new Date(dateStringYear, dateStringMonth, dateStringDay, 0, 0, 0)
                
                picker.set("update", {
                    date: moment(theDate, "YYYY-MM-DD").format("YYYY-MM-DD"),
                })
            }
            
        }
    } else {
        
        this.loadError(input)
        
        if (dateType === "from_date") {
            this.from_date.value = ""
            this.from_date_button_content.html("")
            this.from_date_button.removeClass("active")
        } else if (dateType === "to_date") {
            this.to_date.value = ""
            this.to_date_button_content.html("")
            this.to_date_button.removeClass("active")
        } else {
            //this.loadError(input, "Oops")
        }
        
    }
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.unSetDateError = function (input) {
    console.group("unSetDateError")
    // ----
    
    let $errorElement = $(input).parents("div.form-element").find("div.error")
    
    $errorElement.html("").hide()
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.loadError = function (input, msg) {
    console.group("unSetDateError(input)", input)
    // ----
    
    let $errorElement = $(input).parents("div.form-element").find("div.error")
    let errorMessage = (msg) ? msg : "Invalid Date. Only YYYY-MM-DD format allowed."
    $errorElement.html(errorMessage).show()
    
    // ----
    console.groupEnd()
}

ProductSearch.prototype.setDateTitle = function () {
    console.group("setDateTitle")
    // ----
    
    let categoryId = (this.category_id && !isNaN(parseInt(this.category_id.value))) ? parseInt(this.category_id.value) : null
    let titleFrom, titleTo, titleLocation, titleName, titleTravelers
    
    if (categoryId === 1) { // Hotels
        titleFrom = "Check In"
        titleTo = "Check Out"
        titleLocation = "City"
        titleName = "Name"
        titleTravelers = "Travelers"
    } else if (categoryId === 2) { // Flights
        titleFrom = "Date Departing"
        titleTo = "Date Arriving"
        titleLocation = "City"
        titleName = "Name"
        titleTravelers = "Travelers"
    } else if (categoryId === 3) { // Cars
        titleFrom = "From Date"
        titleTo = "To Date"
        titleLocation = "City"
        titleName = "Name"
        titleTravelers = "Travelers"
    } else if (categoryId === 4) { // Rail
        titleFrom = "Date Departing"
        titleTo = "Date Arriving"
        titleLocation = "City"
        titleName = "Name"
        titleTravelers = "Travelers"
    } else if (categoryId === 5) { // Transport
        titleFrom = "From Date"
        titleTo = "To Date"
        titleLocation = "City"
        titleName = "Name"
        titleTravelers = "Travelers"
    } else if (categoryId === 6) { // Tour
        titleFrom = "From Date"
        titleTo = "To Date"
        titleLocation = "City"
        titleName = "Name"
        titleTravelers = "Travelers"
    } else if (categoryId === 7) { // Cruise
        titleFrom = "Date Departing"
        titleTo = "Date Arriving"
        titleLocation = "City"
        titleName = "Name"
        titleTravelers = "Travelers"
    } else if (categoryId === 8) { // Package
        titleFrom = "From Date"
        titleTo = "To Date"
        titleLocation = "City"
        titleName = "Name"
        titleTravelers = "Travelers"
    } else if (categoryId === 9) { // Other
        titleFrom = "From Date"
        titleTo = "To Date"
        titleLocation = "City"
        titleName = "Name"
        titleTravelers = "Travelers"
    } else {
        titleFrom = "Else From"
        titleTo = "Else To"
        titleLocation = "City"
        titleName = "Name"
        titleTravelers = "Travelers"
    }
    
    this.popup_to_date_heading_text.innerHTML = titleTo
    this.to_date_button_label.innerHTML = titleTo
    this.popup_from_date_heading_text.innerHTML = titleFrom
    this.from_date_button_label.innerHTML = titleFrom
    
    this.popup_location_heading_text.innerText = titleLocation
    //this.popup_name_heading_text.innerText = titleName
    //this.popup_travelers_heading_text.innerText = titleTravelers
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.clearBaseSearchFields = function () {
    console.group("clearBaseSearchFields")
    // ----
    
    $("[data-hotel-search='true']").hide()
    $("[data-flight-search='true']").hide()
    $("[data-car-search='true']").hide()
    $("[data-rail-search='true']").hide()
    $("[data-transport-search='true']").hide()
    $("[data-tour-search='true']").hide()
    $("[data-cruise-search='true']").hide()
    $("[data-package-search='true']").hide()
    $("[data-other-search='true']").hide()
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.unSelectDateError = function (input) {
    console.group("unSelectDateError")
    // ----
    
    let $errorElement = $(input).parents("div.form-element").find("div.error")
    $errorElement.html("").hide()
    
    // ----
    console.groupEnd()
}

ProductSearch.prototype.renderSearchElements = function () {
    console.group("renderSearchElements")
    // ----
    
    let baseSearchWrapper = buildRow({ classes: "searchbar" })
    
    // Search Buttons
    baseSearchWrapper.appendChild(this.name_search)
    baseSearchWrapper.appendChild(this.location_search)
    baseSearchWrapper.appendChild(this.travelers_search)
    baseSearchWrapper.appendChild(this.from_date_search)
    baseSearchWrapper.appendChild(this.to_date_search)
    baseSearchWrapper.appendChild(this.product_search)
    baseSearchWrapper.appendChild(this.product_search_reset)
    
    this.base_search_container.appendChild(baseSearchWrapper)
    
    this.container.append(this.hidden_fields_container)
    
    // ----
    console.groupEnd()
}

// Search & Reset Button
ProductSearch.prototype.buildProductSearchButton = function () {
    console.group("buildProductSearchButton")
    // ----
    
    let icon = document.createElement("i")
    let label = document.createElement("span")
    let content = document.createElement("div")
    let el = document.createElement("button")
    let wrapper = document.createElement("div")
    
    let hotelSearch = "true"
    let flightSearch = "true"
    let carSearch = "true"
    let railSearch = "true"
    let transportSearch = "true"
    let tourSearch = "true"
    let cruiseSearch = "true"
    let packageSearch = "true"
    let otherSearch = "true"
    
    wrapper.classList.add("col-12")
    wrapper.classList.add("col-md-2")
    wrapper.classList.add("col-lg-2")
    wrapper.classList.add("col-xl-2")
    wrapper.classList.add("px-1")
    wrapper.classList.add("mx-0")
    wrapper.classList.add("mb-2")
    
    wrapper.dataset.hotelSearch = hotelSearch
    wrapper.dataset.flightSearch = flightSearch
    wrapper.dataset.carSearch = carSearch
    wrapper.dataset.railSearch = railSearch
    wrapper.dataset.transportSearch = transportSearch
    wrapper.dataset.tourSearch = tourSearch
    wrapper.dataset.cruiseSearch = cruiseSearch
    wrapper.dataset.packageSearch = packageSearch
    wrapper.dataset.otherSearch = otherSearch
    
    el.classList.add("btn")
    el.classList.add("btn-outline-primary")
    el.classList.add("btn-rounded")
    el.classList.add("btn-block")
    el.classList.add("m-0")
    el.classList.add("px-2")
    el.classList.add("d-fleox")
    el.classList.add("justify-content-around")
    el.classList.add("align-items-center")
    el.classList.add("white")
    el.classList.add("waves-effect")
    el.classList.add("z-depth-0")
    el.setAttribute("type", "button")
    el.dataset.hotelSearch = hotelSearch
    el.dataset.flightSearch = flightSearch
    el.dataset.carSearch = carSearch
    el.dataset.railSearch = railSearch
    el.dataset.transportSearch = transportSearch
    el.dataset.tourSearch = tourSearch
    el.dataset.cruiseSearch = cruiseSearch
    el.dataset.packageSearch = packageSearch
    el.dataset.otherSearch = otherSearch
    
    this.product_search_button = $(el)
    
    icon.classList.add("fas")
    icon.classList.add("fa-search")
    icon.classList.add("mr-2")
    icon.classList.add("btn-product-search-picker-icon")
    
    label.classList.add("btn-product-search-picker-label")
    label.innerHTML = `Search`
    
    content.classList.add("btn-product-search-content")
    
    el.appendChild(icon)
    el.appendChild(label)
    
    wrapper.appendChild(el)
    
    this.product_search_button_content = $(content)
    
    // ----
    console.groupEnd()
    return wrapper
}
ProductSearch.prototype.buildProductSearchResetButton = function () {
    console.group("buildProductSearchResetButton")
    // ----
    
    let icon = document.createElement("i")
    let label = document.createElement("span")
    let content = document.createElement("div")
    let el = document.createElement("button")
    let wrapper = document.createElement("div")
    
    let hotelSearch = "true"
    let flightSearch = "true"
    let carSearch = "true"
    let railSearch = "true"
    let transportSearch = "true"
    let tourSearch = "true"
    let cruiseSearch = "true"
    let packageSearch = "true"
    let otherSearch = "true"
    
    wrapper.classList.add("col-12")
    wrapper.classList.add("col-md-2")
    wrapper.classList.add("col-lg-2")
    wrapper.classList.add("col-xl-2")
    wrapper.classList.add("px-1")
    wrapper.classList.add("mx-0")
    wrapper.classList.add("mb-2")
    
    wrapper.dataset.hotelSearch = hotelSearch
    wrapper.dataset.flightSearch = flightSearch
    wrapper.dataset.carSearch = carSearch
    wrapper.dataset.railSearch = railSearch
    wrapper.dataset.transportSearch = transportSearch
    wrapper.dataset.tourSearch = tourSearch
    wrapper.dataset.cruiseSearch = cruiseSearch
    wrapper.dataset.packageSearch = packageSearch
    wrapper.dataset.otherSearch = otherSearch
    
    el.classList.add("btn")
    el.classList.add("btn-outline-secondary")
    el.classList.add("btn-rounded")
    el.classList.add("btn-block")
    el.classList.add("m-0")
    el.classList.add("px-2")
    
    el.classList.add("d-fleox")
    el.classList.add("justify-content-around")
    el.classList.add("align-items-center")
    
    el.classList.add("white")
    el.classList.add("waves-effect")
    el.classList.add("z-depth-0")
    el.setAttribute("type", "button")
    el.dataset.hotelSearch = hotelSearch
    el.dataset.flightSearch = flightSearch
    el.dataset.carSearch = carSearch
    el.dataset.railSearch = railSearch
    el.dataset.transportSearch = transportSearch
    el.dataset.tourSearch = tourSearch
    el.dataset.cruiseSearch = cruiseSearch
    el.dataset.packageSearch = packageSearch
    el.dataset.otherSearch = otherSearch
    
    icon.classList.add("fas")
    icon.classList.add("fa-eraser")
    icon.classList.add("mr-2")
    icon.classList.add("btn-product-search-reset-picker-icon")
    
    label.classList.add("btn-product-search-reset-picker-label")
    label.innerHTML = `Reset`
    
    content.classList.add("btn-product-search-content")
    
    el.appendChild(icon)
    el.appendChild(label)
    
    wrapper.appendChild(el)
    
    this.product_search_reset_button = $(el)
    
    // ----
    console.groupEnd()
    return wrapper
}
// Search & Reset Button

// ----
ProductSearch.prototype.clearAllErrors = function () {
    console.group("clearAllErrors")
    // ----
    
    this.unLoadError("name")
    this.unLoadError("location")
    this.unLoadError("travelers")
    this.unLoadError("from-date")
    this.unLoadError("to-date")
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.loadError = function (el, message) {
    console.group("loadError")
    // ----
    
    let msg = (message && message !== "") ? message : "Field Invalid"
    
    if (el) {
        
        switch (el) {
            case "name": // - name
                //console.log("name")
                this.name_button.addClass("is-invalid")
                this.name_button_error.html(msg)
                break
            case "location": // - location
                //console.log("location")
                this.location_button.addClass("is-invalid")
                this.location_button_error.html(msg)
                break
            case "travelers": // - travelers
                //console.log("travelers")
                this.travelers_button.addClass("is-invalid")
                this.travelers_button_error.html(msg)
                break
            case "from-date": // - from-date
                //console.log("from-date")
                this.from_date_button.addClass("is-invalid")
                this.from_date_button_error.html(msg)
                break
            case "to-date": // - to-date
                //console.log("to-date")
                this.to_date_button.addClass("is-invalid")
                this.to_date_button_error.html(msg)
                break
            default: // - Default
                console.log("Default")
            
        }
        
    }
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.unLoadError = function (el) {
    console.group("unLoadError")
    // ----
    
    if (el) {
        
        switch (el) {
            
            case "name": // - name
                //console.log("name")
                this.name_button.removeClass("is-invalid")
                this.name_button_error.html(`&nbsp;`)
                break
            
            case "location": // - location
                //console.log("location")
                this.location_button.removeClass("is-invalid")
                this.location_button_error.html(`&nbsp;`)
                break
            
            case "travelers": // - travelers
                //console.log("travelers")
                this.travelers_button.removeClass("is-invalid")
                this.travelers_button_error.html(`&nbsp;`)
                break
            
            case "from-date": // - from-date
                //console.log("from-date")
                this.from_date_button.removeClass("is-invalid")
                this.from_date_button_error.html(`&nbsp;`)
                break
            
            case "to-date": // - to-date
                //console.log("to-date")
                this.to_date_button.removeClass("is-invalid")
                this.to_date_button_error.html(`&nbsp;`)
                break
            
            default: // - Default
            //console.log("Default")
            
        }
        
    }
    
    // ----
    console.groupEnd()
}
// ----

// ----
ProductSearch.prototype.buildSearchCriteria = function () {
    console.group("buildSearchCriteria")
    // ----
    
    let errors = []
    let _this = this
    let productName = (this.product_name && this.product_name.value) ? this.product_name.value : null
    let fromDate = (this.from_date && this.from_date.value) ? this.from_date.value : null
    let toDate = (this.to_date && this.to_date.value) ? this.to_date.value : null
    let productId = (this.product_id && !isNaN(parseInt(this.product_id.value))) ? parseInt(this.product_id.value) : null
    let categoryId = (this.category_id && !isNaN(parseInt(this.category_id.value))) ? parseInt(this.category_id.value) : null
    let countryId = (this.country_id && !isNaN(parseInt(this.country_id.value))) ? parseInt(this.country_id.value) : null
    let provinceId = (this.province_id && !isNaN(parseInt(this.province_id.value))) ? parseInt(this.province_id.value) : null
    let cityId = (this.city_id && !isNaN(parseInt(this.city_id.value))) ? parseInt(this.city_id.value) : null
    let adultCount = (this.adult_count && !isNaN(parseInt(this.adult_count.value))) ? parseInt(this.adult_count.value) : null
    let childCount = (this.child_count && !isNaN(parseInt(this.child_count.value))) ? parseInt(this.child_count.value) : null
    let roomCount = (this.room_count && !isNaN(parseInt(this.room_count.value))) ? parseInt(this.room_count.value) : null
    
    this.clearAllErrors()
    
    switch (categoryId) {
        case 1: // - Hotels
            //console.log("Hotels")
            /*
				if (fromDate === null) {
					let error = "Missing From Date"
					errors.push({
						el: "from-date",
						message: error,
					})
				}
				
				if (toDate === null) {
					let error = "Missing To Date"
					errors.push({
						el: "to-date",
						message: error,
					})
				}
				
				if (cityId === null) {
					let error = "Missing Location"
					errors.push({
						el: "location",
						message: error,
					})
				}
				//*/
            break
        case 2: // - Flights
            console.log("Flights")
            
            break
        case 3: // - Cars
            console.log("Cars")
            
            break
        case 4: // - Rails
            console.log("Rails")
            
            break
        case 5: // - Transports
            console.log("Transports")
            
            break
        case 6: // - Tours
            console.log("Tours")
            
            break
        case 7: // - Cruises
            console.log("Cruises")
            
            break
        case 8: // - Packages
            console.log("Packages")
            
            break
        case 9: // - Other
            console.log("Other")
            
            break
        default: // - Default
            console.log("Default")
        
    }
    
    if (errors.length > 0) {
        $.each(errors, function (k, err) {
            let el = err.el
            let message = err.message
            _this.loadError(el, message)
        })
    } else {
        
        this.sendSearchRequest(removeNulls({
            product_name: productName,
            product_id: productId,
            from_date: fromDate,
            to_date: toDate,
            category_id: categoryId,
            country_id: countryId,
            province_id: provinceId,
            city_id: cityId,
            adult_count: adultCount,
            child_count: childCount,
            room_count: roomCount,
        }), function (data) {
            if (data && data.length > 0) {
                $.each(data, function (k, product) {
                    _this.renderSearchRequestResults(product)
                })
            }
        })
        
    }
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.sendSearchRequest = function (dataToSend, callback) {
    console.group("sendSearchRequest")
    // ----
    
    let _this = this
    let url = `/api/v1.0/search`
    let categoryId = (this.category_id && !isNaN(parseInt(this.category_id.value))) ? parseInt(this.category_id.value) : null
    
    switch (categoryId) {
        case 1: // - Hotels
            console.log("Hotels")
            url += "/hotels"
            break
        case 2: // - Flights
            console.log("Flights")
            url += "/flights"
            break
        case 3: // - Cars
            console.log("Cars")
            url += "/cars"
            break
        case 4: // - Rails
            console.log("Rails")
            url += "/rails"
            break
        case 5: // - Transports
            console.log("Transports")
            url += "/transports"
            break
        case 6: // - Tours
            console.log("Tours")
            url += "/tours"
            break
        case 7: // - Cruises
            console.log("Cruises")
            url += "/cruises"
            break
        case 8: // - Packages
            console.log("Packages")
            url += "/packages"
            break
        case 9: // - Other
            console.log("Other")
            url += "/other"
            break
        default: // - Default
            console.log("Default")
            url += ""
    }
    
    if (dataToSend) {
        
        try {
            
            sendGetRequest(url, dataToSend, function (data) {
                
                if (data && data.length > 0) {
                    return callback(data)
                    
                } else {
                    data = testData
                    return callback(data)
                }
                
            })
            
        } catch (e) {
            console.log("error", e)
            return _this.handleError("Error Retrieving Images.", "Image Manager", "error")
        }
        
    }
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.renderSearchRequestResultFilters = function (product) {
    console.group("renderSearchRequestResultFilters")
    // ----
    
    let categoryId = (this.category_id && !isNaN(parseInt(this.category_id.value))) ? parseInt(this.category_id.value) : null
    
    //*
    console.log("categoryId", categoryId)
    console.log("product", product)
    //*/
    
    let sortByName
    let sortByCountry
    let sortByProvince
    let sortByCity
    let sortByRating
    let sortByPrice
    
    switch (categoryId) {
        case 1:// Hotels
            break
        case 2:// Flights
            break
        case 3:// Cars
            break
        case 4:// Rails
            break
        case 5:// Transports
            break
        case 6:// Tours
            break
        case 7:// Cruises
            break
        case 8:// Packages
            break
        case 9:// Other
            break
        default: // Default
            break
        
    }
    
    //return null
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.renderSearchRequestResults = function (product) {
    console.group("renderSearchRequestResults")
    // ----
    
    let productAddress, productName, productSKU = ""
    let productUnits, productRating, productId = null
    let returnHTML = ""
    let rollingPrice, rollingCost, avgPrice, count = 0
    
    const buildRating = function (rating) {
        console.group("buildRating")
        console.log("rating", rating)
        // ----
        
        let star = "<li><i class='fas fa-star yellow-text'></i></li>"
        let results = ""
        
        if (rating && !isNaN(parseInt(rating))) {
            rating = parseInt(rating)
        } else {
            rating = 1
        }
        
        for (let n = 0; n < rating; n++) {
            results += star
        }
        
        // ----
        console.groupEnd()
        return results
    }
    const buildUnitRow = function (unit) {
        let dates = (unit && unit.dates) ? unit.dates : []
        let rowHTML
        count = 0
        rollingPrice = 0
        rollingCost = 0
        
        rowHTML = `
				<div class="table-responsive text-nowrap">
					<div class="d-flex flex-nowrap">
			`
        $.each(dates, function (k, day) {
            let date = (day.date) ? moment(day.date).format("MM/DD/YYYY") : null
            let price = (day.price && !isNaN(parseInt(day.price))) ? parseInt(day.price) : 0
            let cost = (day.cost && !isNaN(parseInt(day.cost))) ? parseInt(day.cost) : 0
            let margin = (day.margin && !isNaN(parseInt(day.margin))) ? parseInt(day.margin) : 0
            
            rollingPrice = rollingPrice + price
            rollingCost = rollingCost + cost
            avgPrice = rollingPrice
            
            let dayHTML = `
						<div class="col-pricing">
							<div class="price">${price}</div>
							<div class="date">${date}</div>
						</div>
				`
            
            rowHTML += dayHTML
            count++
        })
        
        rowHTML += `
					</div>
				</div>
			`
        // ----
        console.groupEnd()
        return rowHTML
    }
    
    let filters = this.renderSearchRequestResultFilters(product)
    
    if (product) {
        productAddress = (product.address) ? product.address : null
        productName = (product.name) ? product.name : null
        productId = (product.id && !isNaN(parseInt(product.id))) ? parseInt(product.id) : null
        productRating = (product.rating && !isNaN(parseInt(product.rating))) ? parseInt(product.rating) : 5
        productSKU = (product.sku) ? product.sku : null
        productUnits = (product.units) ? product.units : []
    }
    
    $.each(productUnits, function (k, unit) {
        let unitName = (unit && unit.name) ? unit.name : null
        let unitId = (unit && !isNaN(parseInt(unit.id))) ? parseInt(unit.id) : 0
        let unitRow = buildUnitRow(unit)
        let unitHeadingId = "collapseUnit" + productId + "-" + unitId
        
        /*
			console.log("unitName", unitName)
			console.log("unitId", unitId)
			console.log("productSKU", productSKU)
			console.log("pricing", unitRow)
			console.log("unitHeadingId", unitHeadingId)
			//*/
        
        returnHTML += `
					
					<div class="p-2" role="tab" id="headingOne1">
					
						<a data-toggle="collapse" href="#${unitHeadingId}" class="unit_collapse_header" aria-expanded="false" aria-controls="${unitHeadingId}">
					
							<div class="row">
					
								<div class="col-12 col-md-9">
									<h5 class="mb-0">
									  ${unitName}
									</h5>
								</div>
					
								<div class="col-12 col-md-2">
									<h5 class="mb-0">
									    ${rollingPrice}
									</h5>
								</div>
					
								<div class="col-12 col-md-1">
									<i class="fas fa-angle-down rotate-icon"></i>
								</div>
					
							</div>
						
						</a>
					
					</div>
					
					<div id="${unitHeadingId}" class="collapse" >
						${unitRow}
					</div>
					
					<hr class="ml-3 mr-3 mt-2 mb-2 color-dark"/>

			`
        // ----
        count++
    })
    
    this.search_results.add({
        id: productId,
        name: productName,
        address: productAddress,
        rating: buildRating(productRating),
        pricing: returnHTML,
        averageprice: "43.54",
        image: "/public/thumbs/placeholder.jpg",
    })
    
    // ----
    console.groupEnd()
}
//

// Location Search Fields
ProductSearch.prototype.createSearchElementsLocation = function (options) {
    console.group("createSearchElementsLocation")
    // ----
    
    let formId = this.baseId + "_location_form"
    let formTitle = (options && options.form_title) ? options.form_title : "Going To"
    let locationFilterId = "formProductSearchLocation"
    let locationFilterTitle = formTitle
    
    this.popup_location_title = document.createElement("h5")
    let popoverFormHeadHeadingText = document.createElement("span")
    this.popup_location_close_button = document.createElement("a")
    this.popup_location_update_button = document.createElement("button")
    this.popup_location_heading_text = document.createElement("span")
    let locationFilterLabel = document.createElement("label")
    let locationFilterIcon = document.createElement("i")
    let locationFilterWrapper = document.createElement("div")
    this.popup_location_input = document.createElement("input")
    let locationFilterError = document.createElement("div")
    let row_1 = buildRow({ classes: ["row", "mb-2"] })
    let row_2 = buildRow({ classes: ["row", "mb-2"] })
    let row_1_col_1 = buildColumn({ classes: ["col-3"] })
    let row_1_col_2 = buildColumn({ classes: ["col-9"] })
    let row_2_col_1 = buildColumn({ classes: ["col-12"] })
    let locationFieldsWrapper = document.createElement("form")
    this.popup_location_content = document.createElement("div")
    
    this.popup_location_title.classList.add("popover-location-heading")
    this.popup_location_title.classList.add("w-100")
    this.popup_location_title.innerHTML = `${formTitle}`
    
    popoverFormHeadHeadingText.classList.add("cPZwQ")
    popoverFormHeadHeadingText.innerHTML = `${formTitle}`
    
    this.popup_location_close_button.setAttribute("href", "javascript:void(0);")
    this.popup_location_close_button.setAttribute("aria-hidden", "true")
    this.popup_location_close_button.classList.add("popup-window-button-close")
    this.popup_location_close_button.classList.add("fas")
    this.popup_location_close_button.classList.add("fa-times")
    
    this.popup_location_content.classList.add("w-100")
    this.popup_location_content.classList.add("popover-location-body")
    
    locationFieldsWrapper.setAttribute("id", formId)
    locationFieldsWrapper.setAttribute("novalidate", "novalidate")
    locationFieldsWrapper.classList.add("form-inline")
    
    this.popup_location_update_button.setAttribute("id", locationFilterId + "Submit")
    this.popup_location_update_button.setAttribute("name", locationFilterId + "Submit")
    this.popup_location_update_button.innerText = "update"
    this.popup_location_update_button.classList.add("btn")
    this.popup_location_update_button.classList.add("popover-location-submit")
    this.popup_location_update_button.classList.add("btn-sm")
    this.popup_location_update_button.classList.add("btn-block")
    
    this.popup_location_heading_text.innerText = locationFilterTitle
    
    locationFilterLabel.setAttribute("id", locationFilterId + "-label")
    locationFilterLabel.classList.add("form-label-popover")
    locationFilterLabel.classList.add("d-flex")
    locationFilterLabel.classList.add("justify-content-start")
    locationFilterLabel.classList.add("align-items-center")
    locationFilterLabel.setAttribute("for", locationFilterId)
    
    locationFilterError.setAttribute("type", "search")
    locationFilterError.setAttribute("id", locationFilterId + "-error")
    locationFilterError.classList.add("error")
    locationFilterError.classList.add("w-100")
    locationFilterError.classList.add("text-center")
    
    this.popup_location_input.setAttribute("type", "search")
    this.popup_location_input.setAttribute("id", locationFilterId)
    this.popup_location_input.setAttribute("name", locationFilterId)
    this.popup_location_input.classList.add("form-control")
    this.popup_location_input.classList.add("w-100")
    
    locationFilterIcon.classList.add("fas")
    locationFilterIcon.classList.add("fa-map-marker-alt")
    locationFilterIcon.classList.add("mr-3")
    
    locationFilterWrapper.setAttribute("id", locationFilterId + "-wrap")
    locationFilterWrapper.classList.add("form-element")
    
    locationFilterLabel.appendChild(locationFilterIcon)
    locationFilterLabel.appendChild(this.popup_location_heading_text)
    
    locationFilterWrapper.appendChild(this.popup_location_input)
    locationFilterWrapper.appendChild(locationFilterError)
    
    row_1_col_1.appendChild(locationFilterLabel)
    row_1_col_2.appendChild(locationFilterWrapper)
    
    row_1.appendChild(row_1_col_1)
    row_1.appendChild(row_1_col_2)
    
    row_2_col_1.appendChild(this.popup_location_update_button)
    row_2.appendChild(row_2_col_1)
    
    this.popup_location_content.appendChild(row_1)
    this.popup_location_content.appendChild(row_2)
    
    locationFieldsWrapper.appendChild(this.popup_location_content)
    
    this.popup_location_title.appendChild(this.popup_location_close_button)
    
    //this.popup_location_input = locationFilterInput
    //this.popup_location_update_button = locationFilterUpdate
    //this.popup_location_close_button = popoverFormHeadHeadingClose
    //this.popup_location_title = popoverFormHeadHeading
    //this.popup_location_content = popoverFormBody
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.buildLocationSearchButton = function () {
    console.group("buildLocationSearchButton")
    // ----
    
    let icon = document.createElement("i")
    let label = document.createElement("div")
    let content = document.createElement("div")
    let el = document.createElement("button")
    let wrapper = document.createElement("div")
    
    let hotelSearch = "true"
    let flightSearch = "false"
    let carSearch = "true"
    let railSearch = "false"
    let transportSearch = "true"
    let tourSearch = "true"
    let cruiseSearch = "true"
    let packageSearch = "false"
    let otherSearch = "true"
    
    wrapper.classList.add("col-12")
    wrapper.classList.add("col-md-6")
    wrapper.classList.add("col-lg-4")
    wrapper.classList.add("px-1")
    wrapper.classList.add("mx-0")
    wrapper.classList.add("mb-2")
    
    wrapper.dataset.hotelSearch = hotelSearch
    wrapper.dataset.flightSearch = flightSearch
    wrapper.dataset.carSearch = carSearch
    wrapper.dataset.railSearch = railSearch
    wrapper.dataset.transportSearch = transportSearch
    wrapper.dataset.tourSearch = tourSearch
    wrapper.dataset.cruiseSearch = cruiseSearch
    wrapper.dataset.packageSearch = packageSearch
    wrapper.dataset.otherSearch = otherSearch
    
    el.classList.add("btn")
    el.classList.add("btn-search-bar")
    el.classList.add("btn-location-picker")
    el.setAttribute("type", "button")
    el.dataset.hotelSearch = hotelSearch
    el.dataset.flightSearch = flightSearch
    el.dataset.carSearch = carSearch
    el.dataset.railSearch = railSearch
    el.dataset.transportSearch = transportSearch
    el.dataset.tourSearch = tourSearch
    el.dataset.cruiseSearch = cruiseSearch
    el.dataset.packageSearch = packageSearch
    el.dataset.otherSearch = otherSearch
    
    icon.classList.add("fas")
    icon.classList.add("fa-map-marker-alt")
    icon.classList.add("btn-location-picker-icon")
    
    label.classList.add("picker-label")
    label.classList.add("btn-location-picker-label")
    label.innerHTML = `Going To`
    
    content.classList.add("picker-content")
    content.classList.add("btn-location-picker-content")
    
    el.appendChild(icon)
    el.appendChild(label)
    el.appendChild(content)
    
    wrapper.appendChild(el)
    wrapper.appendChild(this.location_button_error)
    
    this.location_button = $(el)
    this.location_button_error = $(this.location_button_error)
    this.location_button_content = $(content)
    
    // ----
    console.groupEnd()
    return wrapper
}
ProductSearch.prototype.clickOutsideLocationSearch = function (e) {
    console.group("clickOutsideLocationSearch")
    // ----
    
    let class_name = "btn-location-picker"
    let tar = $(e.target).parents("div.popover")
    
    if (!tar[0] && !e.target.className.includes(class_name)) {
        
        this.updateLocationSearch()
        this.closeLocationSearch()
        
    }
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.closeLocationSearch = function () {
    console.group("closeLocationSearch")
    // ----
    
    if (this.location_button) {
        this.location_button.popover("hide")
    }
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.resetLocationSearch = function () {
    console.group("resetLocationSearch")
    // ----
    
    this.country_id.value = ""
    this.province_id.value = ""
    this.city_id.value = ""
    
    this.location_button_content.html("")
    this.location_button.removeClass("active")
    this.global_location_select = false
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.updateLocationSearch = function () {
    console.group("updateLocationSearch")
    // ----
    
    this.closeLocationSearch()
    
    // ----
    console.groupEnd()
}
// Location Search Fields

// From Date Search Fields
ProductSearch.prototype.createSearchElementsFromDate = function (options) {
    console.group("createSearchElementsFromDate", options)
    // ----
    
    let formId = this.baseId + "_from_date_form"
    let categoryId = (this.category_id && !isNaN(parseInt(this.category_id.value))) ? parseInt(this.category_id.value) : null
    this.popup_from_date_title = document.createElement("h5")
    this.popup_from_date_heading_text = document.createElement("span")
    this.popup_from_date_close_button = document.createElement("a")
    let formDateFieldsWrapper = document.createElement("form")
    this.popup_from_date_content = document.createElement("div")
    let formDateWrapperId = this.baseId + "_input_from-wrapper"
    let formDateButtonId = this.baseId + "_input_from"
    let formDateButtonLabelId = this.baseId + "_input_from-label"
    let formDateInputId = this.baseId + "_from_date"
    let formDateInputLabelId = this.baseId + "_from_date-label"
    let formDateInputErrorId = this.baseId + "_from_date-error"
    let inputAppend = document.createElement("div")
    let title
    
    if (categoryId === 1) {
        title = "Check In"
    } else if (categoryId === 2) {
        title = "Date Departing"
    } else if (categoryId === 3) {
        title = "From Date"
    } else if (categoryId === 4) {
        title = "Date Departing"
    } else if (categoryId === 5) {
        title = "From Date"
    } else if (categoryId === 6) {
        title = "From Date"
    } else if (categoryId === 7) {
        title = "Check In"
    } else if (categoryId === 8) {
        title = "Date Departing"
    } else if (categoryId === 9) {
        title = "From Date"
    } else {
        title = "Else"
    }
    
    inputAppend.classList.add("input-group-append")
    
    this.popup_from_date_wrapper = document.createElement("div")
    this.popup_from_date_button_label = document.createElement("label")
    this.popup_from_date_button = document.createElement("button")
    this.popup_from_date_input_label = document.createElement("label")
    this.popup_from_date_input = document.createElement("input")
    this.popup_from_date_error = document.createElement("div")
    
    // Wrapper
    this.popup_from_date_wrapper.setAttribute("id", formDateWrapperId)
    this.popup_from_date_wrapper.classList.add("form-element")
    this.popup_from_date_wrapper.classList.add("input-group")
    
    // Button Label
    this.popup_from_date_button_label.setAttribute("id", formDateButtonLabelId)
    this.popup_from_date_button_label.classList.add("d-none")
    this.popup_from_date_button_label.innerText = "From:"
    
    // Button
    this.popup_from_date_button.setAttribute("type", "button")
    this.popup_from_date_button.setAttribute("id", formDateButtonId)
    this.popup_from_date_button.setAttribute("name", formDateButtonId)
    this.popup_from_date_button.classList.add('input_from')
    this.popup_from_date_button.classList.add('btn')
    this.popup_from_date_button.classList.add('btn-md')
    this.popup_from_date_button.classList.add('btn-outline-input-from')
    this.popup_from_date_button.classList.add('m-0')
    this.popup_from_date_button.classList.add('px-3')
    this.popup_from_date_button.classList.add('py-2')
    this.popup_from_date_button.classList.add('z-depth-0')
    this.popup_from_date_button.classList.add('waves-effect')
    this.popup_from_date_button.classList.add('waves-light')
    this.popup_from_date_button.setAttribute("tab-index", "-1")
    this.popup_from_date_button.innerHTML = `<i class="fas fa-calendar-day"></i>`
    inputAppend.appendChild(this.popup_from_date_button)
    
    // Input Label
    this.popup_from_date_input_label.setAttribute("id", formDateInputLabelId)
    this.popup_from_date_input_label.classList.add("d-none")
    this.popup_from_date_input_label.innerText = "From:"
    
    // Input
    this.popup_from_date_input.setAttribute("type", "search")
    this.popup_from_date_input.setAttribute("id", formDateInputId)
    this.popup_from_date_input.setAttribute("name", formDateInputId)
    this.popup_from_date_input.classList.add("form-control")
    this.popup_from_date_input.classList.add("w-100")
    this.popup_from_date_input.setAttribute("maxlength", "10")
    this.popup_from_date_input.setAttribute("placeholder", "From Date")
    this.popup_from_date_input.dataset.type = "from_date"
    
    // Error
    this.popup_from_date_error.setAttribute("id", formDateInputErrorId)
    this.popup_from_date_error.classList.add("error")
    this.popup_from_date_error.classList.add("w-100")
    this.popup_from_date_error.classList.add("text-center")
    
    this.popup_from_date_wrapper.appendChild(this.popup_from_date_button_label)
    
    this.popup_from_date_wrapper.appendChild(this.popup_from_date_input_label)
    this.popup_from_date_wrapper.appendChild(this.popup_from_date_input)
    this.popup_from_date_wrapper.appendChild(inputAppend)
    this.popup_from_date_wrapper.appendChild(this.popup_from_date_error)
    
    this.popup_from_date_title.classList.add("popover-from-date-heading")
    this.popup_from_date_title.classList.add("w-100")
    this.popup_from_date_title.innerHTML = `${title}`
    
    this.popup_from_date_heading_text.classList.add("cPZwQ")
    this.popup_from_date_heading_text.innerHTML = title
    
    this.popup_from_date_close_button.setAttribute("href", "javascript:void(0);")
    this.popup_from_date_close_button.setAttribute("aria-hidden", "true")
    this.popup_from_date_close_button.classList.add("popup-window-button-close")
    this.popup_from_date_close_button.classList.add("fas")
    this.popup_from_date_close_button.classList.add("fa-times")
    
    this.popup_from_date_content.classList.add("w-100")
    this.popup_from_date_content.classList.add("popover-from-date-body")
    this.popup_from_date_content.appendChild(this.popup_from_date_wrapper)
    formDateFieldsWrapper.setAttribute("id", formId)
    formDateFieldsWrapper.setAttribute("novalidate", "novalidate")
    formDateFieldsWrapper.classList.add("form-inline")
    
    formDateFieldsWrapper.appendChild(this.popup_from_date_content)
    
    this.popup_from_date_title.appendChild(this.popup_from_date_close_button)
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.buildFromDateSearchButton = function (options) {
    console.group("buildFromDateSearchButton", options)
    // ----
    
    let categoryId = (this.category_id && !isNaN(parseInt(this.category_id.value))) ? parseInt(this.category_id.value) : null
    let wrapper = document.createElement("div")
    let title
    let el = document.createElement("button")
    let icon = document.createElement("i")
    let content = document.createElement("div")
    let hotelSearch = "true"
    let flightSearch = "true"
    let carSearch = "true"
    let railSearch = "true"
    let transportSearch = "true"
    let tourSearch = "true"
    let cruiseSearch = "true"
    let packageSearch = "true"
    let otherSearch = "false"
    
    if (categoryId === 1) {
        title = "Check In"
    } else if (categoryId === 2) {
        title = "Date Departing"
    } else if (categoryId === 3) {
        title = "From Date"
    } else if (categoryId === 4) {
        title = "Date Departing"
    } else if (categoryId === 5) {
        title = "From Date"
    } else if (categoryId === 6) {
        title = "From Date"
    } else if (categoryId === 7) {
        title = "Check In"
    } else if (categoryId === 8) {
        title = "Date Departing"
    } else if (categoryId === 9) {
        title = "From Date"
    } else {
        title = "Else"
    }
    
    wrapper.classList.add("col-6")
    wrapper.classList.add("col-md-3")
    wrapper.classList.add("col-lg-2")
    wrapper.classList.add("col-xl-2")
    wrapper.classList.add("px-1")
    wrapper.classList.add("mx-0")
    wrapper.classList.add("mb-2")
    
    wrapper.dataset.hotelSearch = hotelSearch
    wrapper.dataset.flightSearch = flightSearch
    wrapper.dataset.carSearch = carSearch
    wrapper.dataset.railSearch = railSearch
    wrapper.dataset.transportSearch = transportSearch
    wrapper.dataset.tourSearch = tourSearch
    wrapper.dataset.cruiseSearch = cruiseSearch
    wrapper.dataset.packageSearch = packageSearch
    wrapper.dataset.otherSearch = otherSearch
    
    el.classList.add("btn")
    el.classList.add("btn-search-bar")
    el.classList.add("btn-from-date-picker")
    el.setAttribute("type", "button")
    el.dataset.hotelSearch = hotelSearch
    el.dataset.flightSearch = flightSearch
    el.dataset.carSearch = carSearch
    el.dataset.railSearch = railSearch
    el.dataset.transportSearch = transportSearch
    el.dataset.tourSearch = tourSearch
    el.dataset.cruiseSearch = cruiseSearch
    el.dataset.packageSearch = packageSearch
    el.dataset.otherSearch = otherSearch
    
    icon.classList.add("fas")
    icon.classList.add("fa-calendar-day")
    icon.classList.add("btn-from-date-picker-icon")
    
    this.from_date_button_label = document.createElement("div")
    this.from_date_button_label.classList.add("picker-label")
    this.from_date_button_label.classList.add("btn-from-date-picker-label")
    this.from_date_button_label.innerHTML = `${title}`
    
    content.classList.add("picker-content")
    content.classList.add("btn-from-date-picker-content")
    
    el.appendChild(icon)
    el.appendChild(this.from_date_button_label)
    el.appendChild(content)
    
    wrapper.appendChild(el)
    wrapper.appendChild(this.from_date_button_error)
    
    this.from_date_button = $(el)
    this.from_date_button_error = $(this.from_date_button_error)
    this.from_date_button_content = $(content)
    
    // ----
    console.groupEnd()
    return wrapper
}
ProductSearch.prototype.handleFromPickerOpen = function (e) {
    console.group("handleFromPickerOpen")
    // ----
    
    //console.log("From Picker", "Open")
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.handleFromPickerClose = function (e) {
    console.group("handleFromPickerClose")
    // ----
    
    let formDateVal = this.popup_from_date_button.val()
    
    /*
		if (this.popup_from_date_button.val() && !this.to_$input.val()) {
			//console.log("Open js-date-to via js-date-from")
			//to_picker.open()
		} else if (!from_$input.val()) {
			//console.log("From Picker", "User left js-date-from empty. Not popping js-date-to")
		}
		//*/
    
    //*
    //console.log("From Picker", "Close")
    //console.log("formDateVal", formDateVal)
    //*/
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.handleFromPickerSet = function (e) {
    console.group("handleFromPickerSet")
    // ----
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.clickOutsideFromDateSearch = function (e) {
    console.group("clickOutsideFromDateSearch")
    // ----
    
    let class_name = "btn-from-date-picker"
    let tar = $(e.target).parents("div.popover")
    
    if (!tar[0] && !e.target.className.includes(class_name)) {
        
        this.closeFromDateSearch()
        
    }
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.closeFromDateSearch = function () {
    console.group("closeFromDateSearch")
    // ----
    
    if (this.from_date_button) {
        this.from_date_button.popover("hide")
    }
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.resetFromDateSearch = function () {
    console.group("resetFromDateSearch")
    // ----
    
    this.popup_from_date_input.val("")
    this.from_date.value = ""
    this.from_date_button_content.html("")
    this.from_date_button.removeClass("active")
    
    this.from_picker.set("min", false)
    this.from_picker.set("max", (this.to_picker.get("select")) ? this.to_picker.get("select") : false)
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.updateFromDateSearch = function (fromDate) {
    console.group("updateFromDateSearch")
    // ----
    
    if (!fromDate) {
        this.resetFromDateSearch()
    } else {
        this.from_date.value = fromDate
        this.popup_from_date_input.val(fromDate)
        this.from_date_button_content.html(fromDate)
        this.from_date_button.addClass("active")
    }
    
    //this.closeFromDateSearch()
    
    // ----
    console.groupEnd()
}
// From Date Search Fields

// To Date Search Fields
ProductSearch.prototype.createSearchElementsToDate = function (options) {
    console.group("createSearchElementsToDate")
    // ----
    
    let formId = this.baseId + "_to_date_form"
    let categoryId = (this.category_id && !isNaN(parseInt(this.category_id.value))) ? parseInt(this.category_id.value) : null
    this.popup_to_date_title = document.createElement("h5")
    this.popup_to_date_heading_text = document.createElement("span")
    this.popup_to_date_close_button = document.createElement("a")
    let formDateFieldsWrapper = document.createElement("form")
    this.popup_to_date_content = document.createElement("div")
    let formDateWrapperId = this.baseId + "_input_to-wrapper"
    let formDateButtonId = this.baseId + "_input_to"
    let formDateButtonLabelId = this.baseId + "_input_to-label"
    let formDateInputId = this.baseId + "_to_date"
    let formDateInputLabelId = this.baseId + "_to_date-label"
    let formDateInputErrorId = this.baseId + "_to_date-error"
    let inputAppend = document.createElement("div")
    
    let title
    
    if (categoryId === 1) {
        title = "Check Out"
    } else if (categoryId === 2) {
        title = "Date Arriving"
    } else if (categoryId === 3) {
        title = "To Date"
    } else if (categoryId === 4) {
        title = "Date Arriving"
    } else if (categoryId === 5) {
        title = "To Date"
    } else if (categoryId === 6) {
        title = "To Date"
    } else if (categoryId === 7) {
        title = "Check Out"
    } else if (categoryId === 8) {
        title = "Date Arriving"
    } else if (categoryId === 9) {
        title = "To Date"
    } else {
        title = "Else"
    }
    
    inputAppend.classList.add("input-group-append")
    
    this.popup_to_date_wrapper = document.createElement("div")
    this.popup_to_date_button_label = document.createElement("label")
    this.popup_to_date_button = document.createElement("button")
    this.popup_to_date_input_label = document.createElement("label")
    this.popup_to_date_input = document.createElement("input")
    this.popup_to_date_error = document.createElement("div")
    
    // Wrapper
    this.popup_to_date_wrapper.setAttribute("id", formDateWrapperId)
    this.popup_to_date_wrapper.classList.add("form-element")
    this.popup_to_date_wrapper.classList.add("input-group")
    
    // Button Label
    this.popup_to_date_button_label.setAttribute("id", formDateButtonLabelId)
    this.popup_to_date_button_label.classList.add("d-none")
    this.popup_to_date_button_label.innerText = "To:"
    
    // Button
    this.popup_to_date_button.setAttribute("type", "button")
    this.popup_to_date_button.setAttribute("id", formDateButtonId)
    this.popup_to_date_button.setAttribute("name", formDateButtonId)
    this.popup_to_date_button.classList.add('input_to')
    this.popup_to_date_button.classList.add('btn')
    this.popup_to_date_button.classList.add('btn-md')
    this.popup_to_date_button.classList.add('btn-outline-input-to')
    this.popup_to_date_button.classList.add('m-0')
    this.popup_to_date_button.classList.add('px-3')
    this.popup_to_date_button.classList.add('py-2')
    this.popup_to_date_button.classList.add('z-depth-0')
    this.popup_to_date_button.classList.add('waves-effect')
    this.popup_to_date_button.classList.add('waves-light')
    this.popup_to_date_button.setAttribute("tab-index", "-1")
    this.popup_to_date_button.innerHTML = `<i class="fas fa-calendar-day"></i>`
    inputAppend.appendChild(this.popup_to_date_button)
    
    // Input Label
    this.popup_to_date_input_label.setAttribute("id", formDateInputLabelId)
    this.popup_to_date_input_label.classList.add("d-none")
    this.popup_to_date_input_label.innerText = "To:"
    
    // Input
    this.popup_to_date_input.setAttribute("type", "search")
    this.popup_to_date_input.setAttribute("id", formDateInputId)
    this.popup_to_date_input.setAttribute("name", formDateInputId)
    this.popup_to_date_input.classList.add("form-control")
    this.popup_to_date_input.classList.add("w-100")
    this.popup_to_date_input.setAttribute("maxlength", "10")
    this.popup_to_date_input.setAttribute("placeholder", "To Date")
    this.popup_to_date_input.dataset.type = "to_date"
    
    // Error
    this.popup_to_date_error.setAttribute("id", formDateInputErrorId)
    this.popup_to_date_error.classList.add("error")
    this.popup_to_date_error.classList.add("w-100")
    this.popup_to_date_error.classList.add("text-center")
    
    this.popup_to_date_wrapper.appendChild(this.popup_to_date_button_label)
    
    this.popup_to_date_wrapper.appendChild(this.popup_to_date_input_label)
    this.popup_to_date_wrapper.appendChild(this.popup_to_date_input)
    this.popup_to_date_wrapper.appendChild(inputAppend)
    this.popup_to_date_wrapper.appendChild(this.popup_to_date_error)
    
    this.popup_to_date_title.classList.add("popover-to-date-heading")
    this.popup_to_date_title.classList.add("w-100")
    this.popup_to_date_title.innerHTML = `${title}`
    
    this.popup_to_date_heading_text.classList.add("cPZwQ")
    this.popup_to_date_heading_text.innerHTML = title
    
    this.popup_to_date_close_button.setAttribute("href", "javascript:void(0);")
    this.popup_to_date_close_button.setAttribute("aria-hidden", "true")
    this.popup_to_date_close_button.classList.add("popup-window-button-close")
    this.popup_to_date_close_button.classList.add("fas")
    this.popup_to_date_close_button.classList.add("fa-times")
    
    this.popup_to_date_content.classList.add("w-100")
    this.popup_to_date_content.classList.add("popover-to-date-body")
    this.popup_to_date_content.appendChild(this.popup_to_date_wrapper)
    
    formDateFieldsWrapper.setAttribute("id", formId)
    formDateFieldsWrapper.setAttribute("novalidate", "novalidate")
    formDateFieldsWrapper.classList.add("form-inline")
    
    formDateFieldsWrapper.appendChild(this.popup_to_date_content)
    
    this.popup_to_date_title.appendChild(this.popup_to_date_close_button)
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.buildToDateSearchButton = function (options) {
    console.group("buildToDateSearchButton", options)
    // ----
    
    let categoryId = (this.category_id && !isNaN(parseInt(this.category_id.value))) ? parseInt(this.category_id.value) : null
    let wrapper = document.createElement("div")
    let title
    let el = document.createElement("button")
    let icon = document.createElement("i")
    let content = document.createElement("div")
    let hotelSearch = "true"
    let flightSearch = "true"
    let carSearch = "true"
    let railSearch = "true"
    let transportSearch = "true"
    let tourSearch = "false"
    let cruiseSearch = "true"
    let packageSearch = "true"
    let otherSearch = "false"
    
    if (categoryId === 1) {
        title = "Check Out"
    } else if (categoryId === 2) {
        title = "Date Arriving"
    } else if (categoryId === 3) {
        title = "To Date"
    } else if (categoryId === 4) {
        title = "Date Arriving"
    } else if (categoryId === 5) {
        title = "To Date"
    } else if (categoryId === 6) {
        title = "To Date"
    } else if (categoryId === 7) {
        title = "Check In"
    } else if (categoryId === 8) {
        title = "Date Arriving"
    } else if (categoryId === 9) {
        title = "To Date"
    } else {
        title = "Else"
    }
    
    wrapper.classList.add("col-6")
    wrapper.classList.add("col-md-3")
    wrapper.classList.add("col-lg-2")
    wrapper.classList.add("col-xl-2")
    wrapper.classList.add("px-1")
    wrapper.classList.add("mx-0")
    wrapper.classList.add("mb-2")
    
    wrapper.dataset.hotelSearch = hotelSearch
    wrapper.dataset.flightSearch = flightSearch
    wrapper.dataset.carSearch = carSearch
    wrapper.dataset.railSearch = railSearch
    wrapper.dataset.transportSearch = transportSearch
    wrapper.dataset.tourSearch = tourSearch
    wrapper.dataset.cruiseSearch = cruiseSearch
    wrapper.dataset.packageSearch = packageSearch
    wrapper.dataset.otherSearch = otherSearch
    
    el.classList.add("btn")
    el.classList.add("btn-search-bar")
    el.classList.add("btn-to-date-picker")
    el.setAttribute("type", "button")
    el.dataset.hotelSearch = hotelSearch
    el.dataset.flightSearch = flightSearch
    el.dataset.carSearch = carSearch
    el.dataset.railSearch = railSearch
    el.dataset.transportSearch = transportSearch
    el.dataset.tourSearch = tourSearch
    el.dataset.cruiseSearch = cruiseSearch
    el.dataset.packageSearch = packageSearch
    el.dataset.otherSearch = otherSearch
    
    icon.classList.add("fas")
    icon.classList.add("fa-calendar-day")
    icon.classList.add("btn-to-date-picker-icon")
    
    this.to_date_button_label = document.createElement("div")
    this.to_date_button_label.classList.add("picker-label")
    this.to_date_button_label.classList.add("btn-to-date-picker-label")
    this.to_date_button_label.innerHTML = `${title}`
    
    content.classList.add("picker-content")
    content.classList.add("btn-to-date-picker-content")
    
    el.appendChild(icon)
    el.appendChild(this.to_date_button_label)
    el.appendChild(content)
    
    wrapper.appendChild(el)
    wrapper.appendChild(this.to_date_button_error)
    
    this.to_date_button = $(el)
    this.to_date_button_error = $(this.to_date_button_error)
    this.to_date_button_content = $(content)
    
    // ----
    console.groupEnd()
    return wrapper
}
ProductSearch.prototype.handleToPickerOpen = function (e) {
    console.group("handleToPickerOpen")
    // ----
    
    //console.log("To Picker", "Open")
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.handleToPickerClose = function (e) {
    console.group("handleToPickerClose")
    // ----
    
    let formDateVal = this.popup_to_date_button.val()
    
    /*
		if (this.popup_to_date_button.val() && !this.to_$input.val()) {
			//console.log("Open js-date-to via js-date-to")
			//to_picker.open()
		} else if (!to_$input.val()) {
			//console.log("To Picker", "User left js-date-to empty. Not popping js-date-to")
		}
		//*/
    
    //*
    //console.log("To Picker", "Close")
    //console.log("formDateVal", formDateVal)
    //*/
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.handleToPickerSet = function (e) {
    console.group("handleToPickerSet")
    // ----
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.clickOutsideToDateSearch = function (e) {
    console.group("clickOutsideToDateSearch")
    // ----
    
    let class_name = "btn-to-date-picker"
    let tar = $(e.target).parents("div.popover")
    
    if (!tar[0] && !e.target.className.includes(class_name)) {
        
        this.closeToDateSearch()
        
    }
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.closeToDateSearch = function () {
    console.group("closeToDateSearch")
    // ----
    
    if (this.to_date_button) {
        this.to_date_button.popover("hide")
    }
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.resetToDateSearch = function () {
    console.group("resetToDateSearch")
    // ----
    
    this.popup_to_date_input.val("")
    this.to_date.value = ""
    this.to_date_button_content.html("")
    this.to_date_button.removeClass("active")
    
    this.from_picker.set("max", false)
    
    this.to_picker.set("max", false)
    this.to_picker.set("min", (this.from_picker.get("select")) ? this.from_picker.get("select") : false)
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.updateToDateSearch = function (toDate) {
    console.group("updateToDateSearch")
    // ----
    
    if (!toDate) {
        this.resetToDateSearch()
    } else {
        this.to_date.value = toDate
        this.popup_to_date_input.val(toDate)
        this.to_date_button_content.html(toDate)
        this.to_date_button.addClass("active")
    }
    
    // ----
    console.groupEnd()
}
// To Date Search Fields

// Name Search Fields
ProductSearch.prototype.createSearchElementsName = function (options) {
    console.group("createSearchElementsName")
    // ----
    
    let formId = this.baseId + "_name_form"
    let formTitle = (options && options.form_title) ? options.form_title : "Name"
    let nameFilterId = "formProductSearchName"
    let nameFilterTitle = formTitle
    
    this.popup_name_title = document.createElement("h5")
    this.popup_name_close_button = document.createElement("a")
    this.popup_name_update_button = document.createElement("button")
    this.popup_name_heading_text = document.createElement("span")
    let nameFilterLabel = document.createElement("label")
    let nameFilterIcon = document.createElement("i")
    let nameFilterWrapper = document.createElement("div")
    this.popup_name_input = document.createElement("input")
    let nameFilterError = document.createElement("div")
    let row_1 = buildRow({ classes: ["row", "mb-2"] })
    let row_2 = buildRow({ classes: ["row", "mb-2"] })
    let row_1_col_1 = buildColumn({ classes: ["col-3"] })
    let row_1_col_2 = buildColumn({ classes: ["col-9"] })
    let row_2_col_1 = buildColumn({ classes: ["col-12"] })
    let nameFieldsWrapper = document.createElement("form")
    this.popup_name_content = document.createElement("div")
    
    this.popup_name_title.classList.add("popover-name-heading")
    this.popup_name_title.classList.add("w-100")
    this.popup_name_title.innerHTML = `${formTitle}`
    
    this.popup_name_close_button.setAttribute("href", "javascript:void(0);")
    this.popup_name_close_button.setAttribute("aria-hidden", "true")
    this.popup_name_close_button.classList.add("popup-window-button-close")
    this.popup_name_close_button.classList.add("fas")
    this.popup_name_close_button.classList.add("fa-times")
    
    this.popup_name_content.classList.add("popover-name-body")
    this.popup_name_content.classList.add("w-100")
    
    nameFieldsWrapper.setAttribute("id", formId)
    nameFieldsWrapper.setAttribute("novalidate", "novalidate")
    nameFieldsWrapper.classList.add("form-inline")
    
    this.popup_name_update_button.setAttribute("id", nameFilterId + "Submit")
    this.popup_name_update_button.setAttribute("name", nameFilterId + "Submit")
    this.popup_name_update_button.innerText = "update"
    this.popup_name_update_button.classList.add("btn")
    this.popup_name_update_button.classList.add("popover-name-submit")
    this.popup_name_update_button.classList.add("btn-sm")
    this.popup_name_update_button.classList.add("btn-block")
    
    this.popup_name_heading_text.innerText = nameFilterTitle
    
    nameFilterLabel.setAttribute("id", nameFilterId + "-label")
    nameFilterLabel.classList.add("form-label-popover")
    nameFilterLabel.classList.add("d-flex")
    nameFilterLabel.classList.add("justify-content-start")
    nameFilterLabel.classList.add("align-items-center")
    nameFilterLabel.setAttribute("for", nameFilterId)
    
    nameFilterError.setAttribute("id", nameFilterId + "-error")
    nameFilterError.classList.add("error")
    nameFilterError.classList.add("w-100")
    nameFilterError.classList.add("text-center")
    
    this.popup_name_input.setAttribute("type", "search")
    this.popup_name_input.setAttribute("id", nameFilterId)
    this.popup_name_input.setAttribute("name", nameFilterId)
    this.popup_name_input.classList.add("form-control")
    this.popup_name_input.classList.add("w-100")
    
    nameFilterIcon.classList.add("fas")
    nameFilterIcon.classList.add("fa-map-marker-alt")
    nameFilterIcon.classList.add("mr-3")
    
    nameFilterWrapper.setAttribute("id", nameFilterId + "-wrap")
    nameFilterWrapper.classList.add("form-element")
    
    nameFilterLabel.appendChild(nameFilterIcon)
    nameFilterLabel.appendChild(this.popup_name_heading_text)
    
    nameFilterWrapper.appendChild(this.popup_name_input)
    nameFilterWrapper.appendChild(nameFilterError)
    
    row_1_col_1.appendChild(nameFilterLabel)
    row_1_col_2.appendChild(nameFilterWrapper)
    
    row_1.appendChild(row_1_col_1)
    row_1.appendChild(row_1_col_2)
    
    row_2_col_1.appendChild(this.popup_name_update_button)
    row_2.appendChild(row_2_col_1)
    
    this.popup_name_content.appendChild(row_1)
    this.popup_name_content.appendChild(row_2)
    
    nameFieldsWrapper.appendChild(this.popup_name_content)
    
    this.popup_name_title.appendChild(this.popup_name_close_button)
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.buildNameSearchButton = function () {
    console.group("buildNameSearchButton")
    // ----
    
    let icon = document.createElement("i")
    let label = document.createElement("div")
    let content = document.createElement("div")
    let el = document.createElement("button")
    let wrapper = document.createElement("div")
    
    let hotelSearch = "true"
    let flightSearch = "true"
    let carSearch = "true"
    let railSearch = "true"
    let transportSearch = "true"
    let tourSearch = "true"
    let cruiseSearch = "true"
    let packageSearch = "true"
    let otherSearch = "false"
    
    wrapper.classList.add("col-12")
    wrapper.classList.add("col-md-6")
    wrapper.classList.add("col-lg-4")
    wrapper.classList.add("px-1")
    wrapper.classList.add("mx-0")
    wrapper.classList.add("mb-2")
    el.setAttribute("type", "button")
    wrapper.dataset.hotelSearch = hotelSearch
    wrapper.dataset.flightSearch = flightSearch
    wrapper.dataset.carSearch = carSearch
    wrapper.dataset.railSearch = railSearch
    wrapper.dataset.transportSearch = transportSearch
    wrapper.dataset.tourSearch = tourSearch
    wrapper.dataset.cruiseSearch = cruiseSearch
    wrapper.dataset.packageSearch = packageSearch
    wrapper.dataset.otherSearch = otherSearch
    
    el.classList.add("btn")
    el.classList.add("btn-search-bar")
    el.classList.add("btn-name-picker")
    el.dataset.hotelSearch = hotelSearch
    el.dataset.flightSearch = flightSearch
    el.dataset.carSearch = carSearch
    el.dataset.railSearch = railSearch
    el.dataset.transportSearch = transportSearch
    el.dataset.tourSearch = tourSearch
    el.dataset.cruiseSearch = cruiseSearch
    el.dataset.packageSearch = packageSearch
    el.dataset.otherSearch = otherSearch
    
    icon.classList.add("fas")
    icon.classList.add("fa-atlas")
    icon.classList.add("btn-name-picker-icon")
    
    label.classList.add("picker-label")
    label.classList.add("btn-name-picker-label")
    label.innerHTML = `Name`
    
    content.classList.add("picker-content")
    content.classList.add("btn-name-picker-content")
    
    el.appendChild(icon)
    el.appendChild(label)
    el.appendChild(content)
    
    wrapper.appendChild(el)
    wrapper.appendChild(this.name_button_error)
    
    this.name_button = $(el)
    this.name_button_error = $(this.name_button_error)
    this.name_button_content = $(content)
    
    // ----
    console.groupEnd()
    return wrapper
}
ProductSearch.prototype.clickOutsideNameSearch = function (e) {
    console.group("clickOutsideNameSearch")
    // ----
    
    let class_name = "btn-name-picker"
    let tar = $(e.target).parents("div.popover")
    
    if (!tar[0] && !e.target.className.includes(class_name)) {
        this.updateNameSearch()
        this.closeNameSearch()
    }
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.closeNameSearch = function () {
    console.group("closeNameSearch")
    // ----
    
    if (this.name_button) {
        this.name_button.popover("hide")
    }
    
    this.generateNameSearchContent()
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.resetNameSearch = function () {
    console.group("resetNameSearch")
    // ----
    
    if (this.product_name) {
        this.product_name.value = ""
    }
    if (this.product_id) {
        this.product_id.value = ""
    }
    
    this.generateNameSearchContent()
    
    this.global_name_select = false
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.updateNameSearch = function () {
    console.group("updateNameSearch")
    // ----
    
    this.generateNameSearchContent()
    this.closeNameSearch()
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.generateNameSearchContent = function () {
    console.group("generateNameSearchContent")
    // ----
    
    let productName = (this.product_name && this.product_name.value) ? this.product_name.value : ""
    let productId = (this.product_id && !isNaN(parseInt(this.product_id.value))) ? parseInt(this.product_id.value) : null
    
    let displayText = `${productName}`
    
    if (productName !== "") {
        this.name_button.addClass("active")
        this.name_button_content.html(displayText)
    } else {
        this.name_button.removeClass("active")
        this.name_button_content.html("")
    }
    
    //*
    console.log("productName", productName)
    console.log("productId", productId)
    //*/
    
    // ----
    console.groupEnd()
}
// Name Search Fields

// Travelers Search Fields
ProductSearch.prototype.createSearchElementsTravelers = function (options) {
    console.group("createSearchElementsTravelers")
    // ----
    
    const renderElements = function () {
        
        travelersFilterLabel.appendChild(travelersFilterIcon)
        travelersFilterLabel.appendChild(_this.popup_travelers_heading_text)
        
        travelersFilterWrapper.appendChild(_this.popup_travelers_input)
        travelersFilterWrapper.appendChild(travelersFilterError)
        
        travelersAdultDecSpan.appendChild(travelersAdultDecIcon)
        _this.popup_travelers_adult_dec.appendChild(travelersAdultDecSpan)
        travelersAdultIncSpan.appendChild(travelersAdultIncIcon)
        _this.popup_travelers_adult_inc.appendChild(travelersAdultIncSpan)
        travelersAdultGroup.appendChild(_this.popup_travelers_adult_input)
        travelersAdultWrapper.appendChild(_this.popup_travelers_adult_dec)
        travelersAdultWrapper.appendChild(travelersAdultGroup)
        travelersAdultWrapper.appendChild(_this.popup_travelers_adult_inc)
        
        travelersChildDecSpan.appendChild(travelersChildDecIcon)
        _this.popup_travelers_child_dec.appendChild(travelersChildDecSpan)
        travelersChildIncSpan.appendChild(travelersChildIncIcon)
        _this.popup_travelers_child_inc.appendChild(travelersChildIncSpan)
        travelersChildGroup.appendChild(_this.popup_travelers_child_input)
        travelersChildWrapper.appendChild(_this.popup_travelers_child_dec)
        travelersChildWrapper.appendChild(travelersChildGroup)
        travelersChildWrapper.appendChild(_this.popup_travelers_child_inc)
        
        travelersRoomDecSpan.appendChild(travelersRoomDecIcon)
        _this.popup_travelers_room_dec.appendChild(travelersRoomDecSpan)
        travelersRoomIncSpan.appendChild(travelersRoomIncIcon)
        _this.popup_travelers_room_inc.appendChild(travelersRoomIncSpan)
        travelersRoomGroup.appendChild(_this.popup_travelers_room_input)
        travelersRoomWrapper.appendChild(_this.popup_travelers_room_dec)
        travelersRoomWrapper.appendChild(travelersRoomGroup)
        travelersRoomWrapper.appendChild(_this.popup_travelers_room_inc)
        
        row_1_col_1.appendChild(travelersAdultLabel)
        row_1_col_2.appendChild(travelersAdultWrapper)
        
        row_2_col_1.appendChild(travelersChildLabel)
        row_2_col_2.appendChild(travelersChildWrapper)
        
        row_3_col_1.appendChild(travelersRoomLabel)
        row_3_col_2.appendChild(travelersRoomWrapper)
        
        row_1.appendChild(row_1_col_1)
        row_1.appendChild(row_1_col_2)
        
        row_2.appendChild(row_2_col_1)
        row_2.appendChild(row_2_col_2)
        
        row_3.appendChild(row_3_col_1)
        row_3.appendChild(row_3_col_2)
        
        row_4_col_1.appendChild(_this.popup_travelers_update_button)
        row_4.appendChild(row_4_col_1)
        
        _this.popup_travelers_content.appendChild(row_1)
        _this.popup_travelers_content.appendChild(row_2)
        _this.popup_travelers_content.appendChild(row_3)
        _this.popup_travelers_content.appendChild(row_4)
        
        travelersFieldsWrapper.appendChild(_this.popup_travelers_content)
        
        _this.popup_travelers_title.appendChild(_this.popup_travelers_close_button)
    }
    
    let _this = this
    let formId = this.baseId + "_travelers_form"
    let formTitle = (options && options.form_title) ? options.form_title : "Travelers"
    let travelersFilterId = "formProductSearchTravelers"
    let travelersFilterTitle = formTitle
    let row_1 = buildRow({ classes: ["row", "mb-2"] })
    let row_2 = buildRow({ classes: ["row", "mb-2"] })
    let row_3 = buildRow({ classes: ["row", "mb-2"] })
    let row_4 = buildRow({ classes: ["row", "mb-2"] })
    let row_1_col_1 = buildColumn({ classes: ["col-3"] })
    let row_1_col_2 = buildColumn({ classes: ["col-9"] })
    let row_2_col_1 = buildColumn({ classes: ["col-3"] })
    let row_2_col_2 = buildColumn({ classes: ["col-9"] })
    let row_3_col_1 = buildColumn({ classes: ["col-3"] })
    let row_3_col_2 = buildColumn({ classes: ["col-9"] })
    let row_4_col_1 = buildColumn({ classes: ["col-12"] })
    let travelersAdultLabel = document.createElement("label")
    let travelersChildLabel = document.createElement("label")
    let travelersRoomLabel = document.createElement("label")
    
    let travelersAdultWrapper = document.createElement("div")
    let travelersChildWrapper = document.createElement("div")
    let travelersRoomWrapper = document.createElement("div")
    let travelersAdultGroup = document.createElement("div")
    let travelersChildGroup = document.createElement("div")
    let travelersRoomGroup = document.createElement("div")
    let travelersAdultIncSpan = document.createElement("span")
    let travelersChildIncSpan = document.createElement("span")
    let travelersRoomIncSpan = document.createElement("span")
    let travelersAdultDecSpan = document.createElement("span")
    let travelersChildDecSpan = document.createElement("span")
    let travelersRoomDecSpan = document.createElement("span")
    let travelersAdultDecIcon = document.createElement("i")
    let travelersChildDecIcon = document.createElement("i")
    let travelersRoomDecIcon = document.createElement("i")
    let travelersAdultIncIcon = document.createElement("i")
    let travelersChildIncIcon = document.createElement("i")
    let travelersRoomIncIcon = document.createElement("i")
    let travelersFilterLabel = document.createElement("label")
    let travelersFilterIcon = document.createElement("i")
    let travelersFilterWrapper = document.createElement("div")
    let travelersFilterError = document.createElement("div")
    let travelersFieldsWrapper = document.createElement("form")
    
    travelersAdultLabel.classList.add("form-label-popover")
    travelersAdultLabel.classList.add("d-flex")
    travelersAdultLabel.classList.add("justify-content-start")
    travelersAdultLabel.classList.add("align-items-center")
    travelersAdultLabel.innerHTML = `<i class="fas fa-user-friends mr-3"></i> <span>Adults</span>`
    
    travelersChildLabel.classList.add("form-label-popover")
    travelersChildLabel.classList.add("d-flex")
    travelersChildLabel.classList.add("justify-content-start")
    travelersChildLabel.classList.add("align-items-center")
    travelersChildLabel.innerHTML = `<i class="fas fa-user-friends mr-3"></i> <span>Children</span>`
    
    travelersRoomLabel.classList.add("form-label-popover")
    travelersRoomLabel.classList.add("d-flex")
    travelersRoomLabel.classList.add("justify-content-start")
    travelersRoomLabel.classList.add("align-items-center")
    travelersRoomLabel.innerHTML = `<i class="fas fa-user-friends mr-3"></i> <span>Rooms</span>`
    
    travelersAdultGroup.classList.add("form-element")
    travelersAdultGroup.classList.add("mb-0")
    
    travelersChildGroup.classList.add("form-element")
    travelersChildGroup.classList.add("mb-0")
    
    travelersRoomGroup.classList.add("form-element")
    travelersRoomGroup.classList.add("mb-0")
    
    travelersAdultDecIcon.classList.add("fas")
    travelersChildDecIcon.classList.add("fas")
    travelersRoomDecIcon.classList.add("fas")
    travelersChildIncIcon.classList.add("fas")
    travelersAdultIncIcon.classList.add("fas")
    travelersRoomIncIcon.classList.add("fas")
    
    travelersChildDecIcon.classList.add("fa-minus")
    travelersAdultDecIcon.classList.add("fa-minus")
    travelersRoomDecIcon.classList.add("fa-minus")
    travelersChildIncIcon.classList.add("fa-plus")
    travelersAdultIncIcon.classList.add("fa-plus")
    travelersRoomIncIcon.classList.add("fa-plus")
    
    travelersAdultDecSpan.classList.add("input-group-text")
    travelersChildDecSpan.classList.add("input-group-text")
    travelersRoomDecSpan.classList.add("input-group-text")
    travelersAdultIncSpan.classList.add("input-group-text")
    travelersChildIncSpan.classList.add("input-group-text")
    travelersRoomIncSpan.classList.add("input-group-text")
    
    travelersAdultDecSpan.dataset.direction = "dec"
    travelersChildDecSpan.dataset.direction = "dec"
    travelersRoomDecSpan.dataset.direction = "dec"
    travelersAdultIncSpan.dataset.direction = "inc"
    travelersChildIncSpan.dataset.direction = "inc"
    travelersRoomIncSpan.dataset.direction = "inc"
    
    travelersAdultDecSpan.dataset.type = "adult"
    travelersChildDecSpan.dataset.type = "child"
    travelersRoomDecSpan.dataset.type = "room"
    travelersAdultIncSpan.dataset.type = "adult"
    travelersChildIncSpan.dataset.type = "child"
    travelersRoomIncSpan.dataset.type = "room"
    
    travelersAdultWrapper.classList.add("input-group")
    travelersAdultWrapper.classList.add("d-flex")
    travelersAdultWrapper.classList.add("justify-content-end")
    travelersAdultWrapper.classList.add("number-input")
    
    travelersChildWrapper.classList.add("input-group")
    travelersChildWrapper.classList.add("d-flex")
    travelersChildWrapper.classList.add("justify-content-end")
    travelersChildWrapper.classList.add("number-input")
    
    travelersRoomWrapper.classList.add("input-group")
    travelersRoomWrapper.classList.add("d-flex")
    travelersRoomWrapper.classList.add("justify-content-end")
    travelersRoomWrapper.classList.add("number-input")
    
    this.popup_travelers_adult_dec.classList.add("input-group-prepend")
    this.popup_travelers_adult_dec.dataset.direction = "dec"
    this.popup_travelers_adult_dec.dataset.type = "adult"
    
    this.popup_travelers_adult_inc.classList.add("input-group-append")
    this.popup_travelers_adult_inc.dataset.direction = "inc"
    this.popup_travelers_adult_inc.dataset.type = "adult"
    
    this.popup_travelers_child_dec.classList.add("input-group-prepend")
    this.popup_travelers_child_dec.dataset.direction = "dec"
    this.popup_travelers_child_dec.dataset.type = "child"
    
    this.popup_travelers_child_inc.classList.add("input-group-append")
    this.popup_travelers_child_inc.dataset.direction = "inc"
    this.popup_travelers_child_inc.dataset.type = "child"
    
    this.popup_travelers_room_dec.classList.add("input-group-prepend")
    this.popup_travelers_room_dec.dataset.direction = "dec"
    this.popup_travelers_room_dec.dataset.type = "room"
    
    this.popup_travelers_room_inc.classList.add("input-group-append")
    this.popup_travelers_room_inc.dataset.direction = "inc"
    this.popup_travelers_room_inc.dataset.type = "room"
    
    this.popup_travelers_adult_input.setAttribute("type", "number")
    this.popup_travelers_adult_input.setAttribute("min", "1")
    this.popup_travelers_adult_input.dataset.type = "adult"
    this.popup_travelers_adult_input.value = 1
    this.popup_travelers_adult_input.classList.add("form-control")
    this.popup_travelers_adult_input.classList.add("rounded-0")
    this.popup_travelers_adult_input.classList.add("m-0")
    this.popup_travelers_adult_input.classList.add("quantity")
    
    this.popup_travelers_child_input.setAttribute("type", "number")
    this.popup_travelers_child_input.setAttribute("min", "0")
    this.popup_travelers_child_input.dataset.type = "child"
    this.popup_travelers_child_input.value = 0
    this.popup_travelers_child_input.classList.add("form-control")
    this.popup_travelers_child_input.classList.add("rounded-0")
    this.popup_travelers_child_input.classList.add("m-0")
    this.popup_travelers_child_input.classList.add("quantity")
    
    this.popup_travelers_room_input.setAttribute("type", "number")
    this.popup_travelers_room_input.setAttribute("min", "1")
    this.popup_travelers_room_input.dataset.type = "room"
    this.popup_travelers_room_input.value = 1
    this.popup_travelers_room_input.classList.add("form-control")
    this.popup_travelers_room_input.classList.add("rounded-0")
    this.popup_travelers_room_input.classList.add("m-0")
    this.popup_travelers_room_input.classList.add("quantity")
    
    this.popup_travelers_title = document.createElement("h5")
    this.popup_travelers_close_button = document.createElement("a")
    this.popup_travelers_update_button = document.createElement("button")
    this.popup_travelers_heading_text = document.createElement("span")
    
    this.popup_travelers_input = document.createElement("input")
    
    this.popup_travelers_content = document.createElement("div")
    
    this.popup_travelers_title.classList.add("popover-travelers-heading")
    this.popup_travelers_title.classList.add("w-100")
    this.popup_travelers_title.innerHTML = `${formTitle}`
    
    this.popup_travelers_close_button.setAttribute("href", "javascript:void(0);")
    this.popup_travelers_close_button.setAttribute("aria-hidden", "true")
    this.popup_travelers_close_button.classList.add("popup-window-button-close")
    this.popup_travelers_close_button.classList.add("fas")
    this.popup_travelers_close_button.classList.add("fa-times")
    
    this.popup_travelers_content.classList.add("popover-travelers-body")
    this.popup_travelers_content.classList.add("w-100")
    
    travelersFieldsWrapper.setAttribute("id", formId)
    travelersFieldsWrapper.setAttribute("novalidate", "novalidate")
    travelersFieldsWrapper.classList.add("form-inline")
    
    this.popup_travelers_update_button.setAttribute("id", travelersFilterId + "Submit")
    this.popup_travelers_update_button.setAttribute("name", travelersFilterId + "Submit")
    this.popup_travelers_update_button.innerText = "update"
    this.popup_travelers_update_button.classList.add("btn")
    this.popup_travelers_update_button.classList.add("popover-travelers-submit")
    this.popup_travelers_update_button.classList.add("btn-sm")
    this.popup_travelers_update_button.classList.add("btn-block")
    
    this.popup_travelers_heading_text.innerText = travelersFilterTitle
    
    travelersFilterLabel.setAttribute("id", travelersFilterId + "-label")
    travelersFilterLabel.classList.add("form-label-popover")
    travelersFilterLabel.classList.add("d-flex")
    travelersFilterLabel.classList.add("justify-content-start")
    travelersFilterLabel.classList.add("align-items-center")
    travelersFilterLabel.setAttribute("for", travelersFilterId)
    
    travelersFilterError.setAttribute("id", travelersFilterId + "-error")
    travelersFilterError.classList.add("error")
    travelersFilterError.classList.add("w-100")
    travelersFilterError.classList.add("text-center")
    
    this.popup_travelers_input.setAttribute("type", "search")
    this.popup_travelers_input.setAttribute("id", travelersFilterId)
    this.popup_travelers_input.setAttribute("name", travelersFilterId)
    this.popup_travelers_input.classList.add("form-control")
    this.popup_travelers_input.classList.add("w-100")
    
    travelersFilterIcon.classList.add("fas")
    travelersFilterIcon.classList.add("fa-map-marker-alt")
    travelersFilterIcon.classList.add("mr-3")
    
    travelersFilterWrapper.setAttribute("id", travelersFilterId + "-wrap")
    travelersFilterWrapper.classList.add("form-element")
    
    renderElements()
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.buildTravelersSearchButton = function () {
    console.group("buildTravelersSearchButton")
    // ----
    
    let icon = document.createElement("i")
    let label = document.createElement("div")
    let content = document.createElement("div")
    let el = document.createElement("button")
    let wrapper = document.createElement("div")
    
    let hotelSearch = "true"
    let flightSearch = "true"
    let carSearch = "true"
    let railSearch = "true"
    let transportSearch = "true"
    let tourSearch = "true"
    let cruiseSearch = "true"
    let packageSearch = "true"
    let otherSearch = "true"
    
    wrapper.classList.add("col-12")
    wrapper.classList.add("col-md-6")
    wrapper.classList.add("col-lg-4")
    wrapper.classList.add("px-1")
    wrapper.classList.add("mx-0")
    wrapper.classList.add("mb-2")
    
    wrapper.dataset.hotelSearch = hotelSearch
    wrapper.dataset.flightSearch = flightSearch
    wrapper.dataset.carSearch = carSearch
    wrapper.dataset.railSearch = railSearch
    wrapper.dataset.transportSearch = transportSearch
    wrapper.dataset.tourSearch = tourSearch
    wrapper.dataset.cruiseSearch = cruiseSearch
    wrapper.dataset.packageSearch = packageSearch
    wrapper.dataset.otherSearch = otherSearch
    
    el.classList.add("btn")
    el.classList.add("btn-search-bar")
    el.classList.add("btn-travelers-picker")
    el.setAttribute("type", "button")
    el.dataset.hotelSearch = hotelSearch
    el.dataset.flightSearch = flightSearch
    el.dataset.carSearch = carSearch
    el.dataset.railSearch = railSearch
    el.dataset.transportSearch = transportSearch
    el.dataset.tourSearch = tourSearch
    el.dataset.cruiseSearch = cruiseSearch
    el.dataset.packageSearch = packageSearch
    el.dataset.otherSearch = otherSearch
    
    icon.classList.add("fas")
    icon.classList.add("fa-users")
    icon.classList.add("btn-travelers-picker-icon")
    
    label.classList.add("picker-label")
    label.classList.add("btn-travelers-picker-label")
    label.innerHTML = `Travelers`
    
    content.classList.add("picker-content")
    content.classList.add("btn-travelers-picker-content")
    
    el.appendChild(icon)
    el.appendChild(label)
    el.appendChild(content)
    
    wrapper.appendChild(el)
    wrapper.appendChild(this.travelers_button_error)
    
    this.travelers_button = $(el)
    this.travelers_button_error = $(this.travelers_button_error)
    this.travelers_button_content = $(content)
    
    // ----
    console.groupEnd()
    return wrapper
}
ProductSearch.prototype.clickOutsideTravelersSearch = function (e) {
    console.group("clickOutsideTravelersSearch")
    // ----
    
    let class_name = "btn-travelers-picker"
    let tar = $(e.target).parents("div.popover")
    
    if (!tar[0] && !e.target.className.includes(class_name)) {
        this.updateTravelersSearch()
        this.closeTravelersSearch()
    }
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.closeTravelersSearch = function () {
    console.group("closeTravelersSearch")
    // ----
    
    if (this.travelers_button) {
        this.travelers_button.popover("hide")
    }
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.generateTravelersSearchContent = function () {
    console.group("generateTravelersSearchContent")
    // ----
    
    let adultCount = (this.adult_count && this.adult_count.value) ? parseInt(this.adult_count.value) : 1
    let childCount = (this.child_count && this.child_count.value) ? parseInt(this.child_count.value) : 0
    let roomCount = (this.room_count && this.room_count.value) ? parseInt(this.room_count.value) : 1
    
    let displayText = `Rooms: ${roomCount}, Adults: ${adultCount}, Children: ${childCount}`
    
    this.travelers_button.addClass("active")
    this.travelers_button_content.html(displayText)
    
    //*
    console.log("roomCount", roomCount)
    console.log("adultCount", adultCount)
    console.log("childCount", childCount)
    //*/
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.resetTravelersSearch = function () {
    console.group("resetTravelersSearch")
    // ----
    
    this.popup_travelers_adult_input.value = 1
    this.popup_travelers_child_input.value = 0
    this.popup_travelers_room_input.value = 1
    this.adult_count.value = 1
    this.child_count.value = 0
    this.room_count.value = 1
    
    this.generateTravelersSearchContent()
    
    this.global_travelers_select = false
    
    // ----
    console.groupEnd()
}
ProductSearch.prototype.updateTravelersSearch = function () {
    console.group("updateTravelersSearch")
    // ----
    
    this.generateTravelersSearchContent()
    this.closeTravelersSearch()
    
    // ----
    console.groupEnd()
}
// Travelers Search Fields

$.fn.productSearch = function (options) {
    return new ProductSearch(document.getElementById($(this).attr("id")), options)
}
