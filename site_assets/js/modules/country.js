const Country = (function () {
    "use strict"
    
    const class_name = "form-new-country"
    const form_id = "form_new_country"
    const _country_iso3 = document.getElementById("country_iso3")
    const _country_iso2 = document.getElementById("country_iso2")
    const _country_name = document.getElementById("country_name")
    const _form_new_country = document.getElementById("form_new_country")
    const _new_country_submit_button = document.getElementById("new_country_submit_button")
    const _new_country_cancel_button = document.getElementById("new_country_cancel_button")
    const _modal_product_country_cars = document.getElementById("modal_product_country_cars")
    const _modal_product_country_id = document.getElementById("modal_product_country_id")
    const _modal_product_province_id = document.getElementById("modal_product_province_id")
    const _modal_product_city_id = document.getElementById("modal_product_city_id")
    const _modal_product_location_id = document.getElementById("modal_product_location_id")
    const _modal_new_product = document.getElementById("modal_new_product")
    const formRules = {
        rules: {
            country_name: {
                required: true,
                minlength: 3,
            },
            country_iso2: {
                required: true,
                minlength: 2,
            },
            country_iso3: {
                required: true,
                minlength: 3,
            },
        },
        messages: {
            country_name: {
                required: "Field Required",
                minlength: "too short",
            },
            country_iso2: {
                required: "Field Required",
                minlength: "too short",
            },
            country_iso3: {
                required: "Field Required",
                minlength: "too short",
            },
        },
    }
    
    let userId = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let globalSelectedCountry = false
    
    $(_new_country_submit_button)
        .on("click", function () {
            //console.log("Country.new_country_submit_button:click()")
            // ----
            
            save(this)
            
        })
    
    $(_new_country_cancel_button)
        .on("click", function () {
            //console.log("Country.new_country_cancel_button:click()")
            // ----
            
            clearNewCountryForm()
        })
    
    // ----
    
    const initAutocomplete = function () {
        //console.log("Country.initAutocomplete()")
        // ----
        
        if (_form_new_country) {
            if (_modal_product_country_cars) {
                _modal_product_country_cars.value = ""
            }
            clearNewCountryForm()
            hideNewCountryForm()
            $(_form_new_country)
                .on("change", function () {
                    console.log("Country.form_new_country:change()")
                    // ----
                    validateNewCountryForm()
                })
        }
        
        if (_modal_product_country_cars) {
            $(_modal_product_country_cars)
                .on("search", function () {
                    //console.log("Country.modal_product_country_cars:search()")
                    // ----
                    
                    clearNewCountryForm()
                    populateNewCountryForm()
                    //hideNewCountryForm()
                    if (_modal_product_country_cars) {
                        _modal_product_country_cars.value = ""
                    }
                })
                .on("click", function (e) {
                    if ($(this).attr("readonly") === "readonly") {
                        e.preventDefault()
                    } else {
                        $(this).select()
                    }
                })
                .on("keyup", function () {
                    //console.log("Country.modal_product_country_cars:keyup()")
                    // ----
                    
                    let countryName = _modal_product_country_cars.value
                    //console.log("|__ countryName", countryName)
                    
                    globalSelectedCountry = false
                    
                    if (countryName === "") {
                        clearNewProductModalForm()
                    }
                    
                })
                .on("change", function () {
                    //console.log("Country.modal_product_country_cars:change()")
                    // ----
                    
                    let countryName = $(this).val()
                    //console.log("|__ countryName", countryName)
                    
                    globalSelectedCountry = false
                    
                    setTimeout(function () {
                        
                        if (countryName === "") {
                            clearNewProductModalForm()
                        } else {
                            countryExists(countryName)
                        }
                        
                    }, 200)
                })
                .autocomplete({
                    serviceUrl: "/api/v1.0/autocomplete/countries",
                    minChars: 2,
                    cache: false,
                    dataType: "json",
                    triggerSelectOnValidInput: false,
                    paramName: "st",
                    onSelect: function (suggestion) {
                        if (!suggestion.data) {
                            return
                        }
                        
                        let country = setDetail(suggestion.data)
                        let countryId = (country && !isNaN(parseInt(country.id))) ? parseInt(country.id) : null
                        let detail = Country.all.get(countryId)
                        
                        globalSelectedCountry = true
                        populateNewCountryForm(country)
                    },
                })
        }
    }
    
    const clearNewProductValidation = function () {
        //console.log("Country.clearNewProductValidation()")
        // ----
        
        $(_country_name).hideError()
        $(_country_iso2).hideError()
        $(_country_iso3).hideError()
    }
    
    const validateNewCountryForm = function () {
        //console.log("Country.validateNewCountryForm()")
        // ----
        
        let valid = true
        let countryName = (_country_name && _country_name.value !== "") ? _country_name.value : null
        let countryISO3 = (_country_iso3 && _country_iso3.value !== "") ? _country_iso3.value : null
        let countryISO2 = (_country_iso2 && _country_iso2.value !== "") ? _country_iso2.value : null
        
        if (is_null(countryName)) {
            valid = false
            $(_country_name).showError("oops")
        } else {
            $(_country_name).hideError()
        }
        
        if (is_null(countryISO3)) {
            valid = false
            $(_country_iso3).showError("oops")
        } else {
            $(_country_iso3).hideError()
        }
        
        if (is_null(countryISO2)) {
            valid = false
            $(_country_iso2).showError("oops")
        } else {
            $(_country_iso2).hideError()
        }
        
        if (valid) {
            return {
                name: countryName,
                iso2: countryISO2,
                iso3: countryISO3,
                sort_order: null,
                enabled: 1,
                currency_id: 5,
            }
        }
    }
    
    const hideNewCountryForm = function () {
        //console.log("Country.hideNewCountryForm()")
        // ----
        
        if (_form_new_country) {
            if (_country_name) {
                _country_name.disabled = true
            }
            
            if (_country_iso2) {
                _country_iso2.disabled = true
            }
            
            if (_country_iso3) {
                _country_iso3.disabled = true
            }
            
            $(_form_new_country).hide()
            
        }
        
    }
    
    const showNewCountryForm = function () {
        //console.log("Country.showNewCountryForm()")
        // ----
        
        if (_form_new_country) {
            
            if (_country_iso2) {
                _country_iso2.disabled = false
            }
            
            if (_country_iso3) {
                _country_iso3.disabled = false
            }
            
            $(_form_new_country).show()
            
        }
        
    }
    
    const clearNewCountryForm = function () {
        //console.log("Country.clearNewCountryForm()")
        // ----
        
        if (_modal_product_country_id) {
            _modal_product_country_id.value = ""
        }
        if (_modal_product_province_id) {
            _modal_product_province_id.value = ""
        }
        if (_modal_product_city_id) {
            _modal_product_city_id.value = ""
        }
        if (_country_iso3) {
            _country_iso3.value = ""
        }
        if (_country_iso2) {
            _country_iso2.value = ""
        }
        if (_country_name) {
            _country_name.value = ""
        }
        
        globalSelectedCountry = false
        clearNewProductValidation()
    }
    
    const populateNewCountryForm = function (country) {
        //console.log("Country.populateNewCountryForm(country)", country)
        // ----
        
        let name, iso2, iso3, id = ""
        
        if (country) {
            id = (!isNaN(parseInt(country.id))) ? parseInt(country.id) : ""
            name = (country.name) ? country.name : ""
            iso2 = (country.iso2) ? country.iso2 : ""
            iso3 = (country.iso3) ? country.iso3 : ""
            
        } else {
            if (_modal_product_country_cars) {
                name = _modal_product_country_cars.value
                iso2 = ""
                iso3 = ""
                id = ""
            }
        }
        
        if (_modal_product_location_id) {
            _modal_product_location_id.value = id
        }
        
        if (_modal_product_country_id) {
            _modal_product_country_id.value = id
        }
        if (_modal_product_province_id) {
            _modal_product_province_id.value = ""
        }
        if (_modal_product_city_id) {
            _modal_product_city_id.value = ""
        }
        if (_country_iso3) {
            _country_iso3.value = iso3
        }
        if (_country_iso2) {
            _country_iso2.value = iso2
        }
        if (_country_name) {
            _country_name.value = name
        }
        if (_modal_product_country_cars) {
            _modal_product_country_cars.value = name
        }
    }
    
    const fetchByName = function (dataToSend, callback) {
        let url = "/api/v1.0/countries/validate"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data) {
                    console.log("|__ data", data)
                    
                    if (data) {
                        return callback(data)
                    } else {
                        handleCountryError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
                return handleCountryError("Error Validating Country")
            }
        } else {
            return handleCountryError("Error Loading Country - Missing Data")
        }
    }
    
    const clearNewProductModalForm = function () {
        //console.log("Country.clearNewProductModalForm()")
        // ----
        
        if (_country_name) {
            _country_name.value = ""
        }
        if (_country_iso2) {
            _country_iso2.value = ""
        }
        if (_country_iso3) {
            _country_iso3.value = ""
        }
        if (_modal_product_country_id) {
            _modal_product_country_id.value = ""
        }
        if (_modal_product_province_id) {
            _modal_product_province_id.value = ""
        }
        if (_modal_product_city_id) {
            _modal_product_city_id.value = ""
        }
        if (_modal_product_location_id) {
            _modal_product_location_id.value = ""
        }
        
        globalSelectedCountry = false
        clearNewProductValidation()
        
    }
    
    const countryExists = function (name) {
        //console.log("Country.countryExists(name)", name)
        // ----
        
        if (globalSelectedCountry === false) {
            if (name && name !== "") {
                let dataToSend = { name: name }
                //console.log("|__ dataToSend", dataToSend)
                
                fetchByName(dataToSend, function (data) {
                    //console.log("|__ |__ data", data)
                    let country
                    
                    if (data && data.length) {
                        country = data
                        if (data[0]) {
                            country = data[0]
                        }
                        
                    }
                    
                    if (country && country.length) {
                        
                        globalSelectedCountry = true
                        clearNewCountryForm()
                        populateNewCountryForm(country)
                    } else {
                        globalSelectedCountry = false
                        
                        confirmDialog(`The country: ${name} does not exist exists. Would you like to create it?`, (ans) => {
                            if (ans) {
                                clearNewCountryForm()
                                populateNewCountryForm()
                                showNewCountryForm()
                            } else {
                                clearNewProductModalForm()
                                if (_modal_product_country_cars) {
                                    _modal_product_country_cars.value = ""
                                }
                            }
                        })
                    }
                })
            } else {
                handleCountryError("here")
            }
        }
    }
    
    const handleCountryError = function (msg, title, type) {
        //console.log("Country.handleCountryError(msg)", msg)
        // ----
        
        let messageTitle = (title) ? title : "Country"
        let messageType = (type) ? type : "error"
        
        toastr[messageType](msg, messageTitle)
    }
    
    const save = function ($this) {
        //console.log("Country.initAutocomplete()")
        // ----
        
        if (_country_name && _form_new_country && _country_iso2 && _country_iso3) {
            
            if (validateNewCountryForm()) {
                let country_detail = {}
                
                country_detail.name = (_country_name && _country_name.value !== "") ? _country_name.value : null
                country_detail.iso2 = (_country_iso2 && _country_iso2.value !== "") ? _country_iso2.value : null
                country_detail.iso3 = (_country_iso3 && _country_iso3.value !== "") ? _country_iso3.value : null
                country_detail.enabled = 1
                country_detail.sort_order = null
                
                confirmDialog(`Would you like to update?`, (ans) => {
                    if (ans) {
                        updateCountryRecord($this, remove_nulls(country_detail))
                    }
                })
                
            }
        } else {
            toastr.error("Error: 2")
        }
        
    }
    
    const updateCountryRecord = function ($this, dataToSend) {
        //console.log("Country.updateCountryRecord(dataToSend)", dataToSend)
        // ----
        
        if (dataToSend) {
            try {
                sendPostRequest("/api/v1.0/countries/update", dataToSend, function (data) {
                    let country, countryId, countryName
                    let country_elements = $("select[data-type='country']")
                    
                    if (data) {
                        country = setDetail((data[0]) ? data[0] : data)
                        
                        if (country) {
                            
                            countryName = (country.name) ? country.name : null
                            countryId = (country.id) ? country.id : null
                            
                            if (countryId !== null && countryName !== null) {
                                Country.all.set(countryId, country)
                                
                                country_elements.each(function (index, element) {
                                    let newOption = new Option(countryName, countryId, false, false)
                                    
                                    if (countryName !== null && countryId !== null) {
                                        $(element).append(newOption).trigger("change")
                                    }
                                })
                                
                                $($this).val(countryId).trigger("change")
                                
                                if (_modal_new_product && _form_new_country) {
                                    
                                    initAutocomplete()
                                    populateNewCountryForm(country)
                                    //hideNewCountryForm()
                                    if (_modal_product_country_cars) {
                                        _modal_product_country_cars.value = countryName
                                    }
                                } else {
                                    Country.close()
                                }
                                
                                handleCountryError(countryName + " was updated", "Country", "success")
                            }
                        }
                    } else {
                        return handleCountryError("Error: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
                return handleCountryError("Error: Validating Country")
            }
            
        } else {
            console.log("Error: Missing Data")
            return handleCountryError("Error: Missing Data")
        }
    }
    
    const setDetail = function (country) {
        //console.log("Country.setDetail(country)", country)
        // ----
        
        let detail = clearDetail()
        let id = null
        
        if (country) {
            /*
            console.log("|__ country", country)
            console.log("|__ country.id", country.id)
            console.log("|__ country.ios2", country.iso2)
            console.log("|__ country.sort_order", country.sort_order)
            //*/
            id = validInt(country.id)
            detail["id"] = validInt(country.id)
            detail["name"] = (country.name) ? country.name : null
            detail["sort_order"] = (country.sort_order) ? country.sort_order : null
            detail["iso2"] = (country.iso2) ? country.iso2 : null
            detail["iso3"] = (country.iso3) ? country.iso3 : null
            detail["currency_id"] = validInt(country.currency_id)
            detail["enabled"] = (country.enabled) ? country.enabled : 1
            detail["date_created"] = (country.date_created) ? country.date_created : formatDateMySQL()
            detail["created_by"] = (country.created_by) ? country.created_by : userId
            detail["date_modified"] = (country.date_modified) ? country.date_modified : formatDateMySQL()
            detail["modified_by"] = (country.modified_by) ? country.modified_by : userId
            detail["note"] = (country.note) ? country.note : null
            detail["display_long"] = (country.display_long) ? country.display_long : null
            detail["display_medium"] = (country.display_medium) ? country.display_medium : null
            detail["display_short"] = (country.display_short) ? country.display_short : null
        }
        
        Country.id = id
        Country.detail = detail
        return detail
    }
    
    const clearDetail = function () {
        //console.log("Country.clearDetail()")
        // ----
        
        return {
            id: null,
            name: null,
            sort_order: null,
            iso2: null,
            iso3: null,
            currency_id: null,
            enabled: 1,
            note: null,
            created_by: userId,
            modified_by: userId,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
            display_long: null,
            display_medium: null,
            display_short: null,
        }
    }
    
    const onClickOutside = (e) => {
        //console.log("Country.onClickOutside(e)", e)
        // ----
        
        let tar = $(e.target).parents("div." + class_name)
        
        if (!tar[0] && !e.target.className.includes("select-add-option")) {
            Country.close()
        }
    }
    
    // ----
    
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
        //console.log("Country.fetch_country_list(dataToSend, callback)", dataToSend)
        // ----
        
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
                        return handleCountryError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
                return handleCountryError("Error Validating Country")
            }
        } else {
            return handleCountryError("Error Loading Country- Missing Data")
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
        
        window.addEventListener("click", onClickOutside)
    }
    
    const destroy_form = function () {
        let elem = document.getElementById(form_id)
        if (elem) {
            elem.parentNode.removeChild(elem)
            window.removeEventListener("click", onClickOutside)
        }
    }
    
    const validate_form = function () {
        let _name = document.getElementById("country_name")
        let _country_iso2 = document.getElementById("country_iso2")
        let _country_iso3 = document.getElementById("country_iso3")
        let valid = true
        // ----
        if (!_name || !_country_iso2 || !_country_iso3) {
            handleCountryError("Error Processing Data")
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
    
    const init = function (settings) {
        build_drop_downs(settings)
    }
    
    const loadAll = function (countries) {
        //console.log("Country.loadAll(countries)", countries)
        // ----
        
        Country.all = new Map()
        
        if (countries) {
            $.each(countries, function (k, country) {
                //console.log("|__ country", country)
                
                let detail = setDetail(country)
                //console.log("|__ detail", detail)
                Country.all.set(detail.id, detail)
            })
        }
    }
    
    return {
        detail: {},
        all: new Map(),
        buildCountryDropDown: function () {
        
        },
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
            setDetail(country)
        },
        load_all: function (countries) {
            loadAll(countries)
        },
        get: function (settings) {
            get(settings)
        },
        init: function (settings) {
            init(settings)
        },
        initAutocomplete: function () {
            initAutocomplete()
        },
    }
})()
