const City = (function () {
    "use strict"
    
    const class_name = "form-new-city"
    const form_id = "form_new_city"
    
    const _product_location_departing_airport_city_search = document.getElementById("product_location_departing_airport_city_search")
    const _product_location_departing_airport_city_id = document.getElementById("product_location_departing_airport_city_id")
    const _product_location_arriving_airport_city_id = document.getElementById("product_location_arriving_airport_city_id")
    const _product_edit_location_city_id = document.getElementById("product_edit_location_city_id")
    const _product_location_arriving_airport_city_search = document.getElementById("product_location_arriving_airport_city_search")
    const _modal_product_city_id = document.getElementById("modal_product_city_id")
    const _modal_product_provider_name = document.getElementById("modal_product_provider_name")
    const _modal_product_vendor_name = document.getElementById("modal_product_vendor_name")
    const _modal_product_province_id = document.getElementById("modal_product_province_id")
    const _modal_product_country_id = document.getElementById("modal_product_country_id")
    
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
    
    $("#product_location_transport_city_search")
        .on("change", function () {
            setTimeout(function () {
            
            }, 200)
        })
        .on("search", function () {
            _product_edit_location_city_id.value = ""
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
                //console.log("city", city)
                _product_edit_location_city_id.value = city.id
                
            },
        })
    
    $("#product_location_cars_city_search")
        .on("change", function () {
            setTimeout(function () {
            
            }, 200)
        })
        .on("search", function () {
            _product_edit_location_city_id.value = ""
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
                
                _product_edit_location_city_id.value = city.id
                
            },
        })
    
    $("#product_location_arriving_airport_city_search")
        .on("change", function () {
            setTimeout(function () {
                let city = $("#product_location_arriving_airport_city_search").val()
                if (city === "") {
                    _product_location_arriving_airport_city_id.value = ""
                }
            }, 200)
        })
        .on("search", function () {
            _product_location_arriving_airport_city_id.value = ""
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
                
                _product_location_arriving_airport_city_search.value = suggestion.value
                _product_location_arriving_airport_city_id.value = city.id
                
            },
        })
    
    $("#product_location_departing_airport_city_search")
        
        .on("change", function () {
            setTimeout(function () {
                let city = $("#product_location_departing_airport_city_search").val()
                if (city === "") {
                    _product_edit_location_city_id.value = ""
                    _product_location_departing_airport_city_id.value = ""
                }
            }, 200)
        })
        .on("search", function () {
            _product_edit_location_city_id.value = ""
            _product_location_departing_airport_city_id.value = ""
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
                
                //console.log("city", city)
                
                _product_location_departing_airport_city_search.value = suggestion.value
                _product_location_departing_airport_city_id.value = city.id
                _product_edit_location_city_id.value = city.id
                
                /*
                `${city.name} (${city.province.name}, ${city.country.name})`
                
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
                //console.log("city", suggestion)
                if (!suggestion.data) {
                    return
                }
                
                //console.log("city", suggestion)
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
                //_modal_product_provider_name.disabled = true
                //_modal_product_vendor_name.disabled = true
            } else {
                //_modal_product_provider_name.disabled = false
                //_modal_product_vendor_name.disabled = false
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
            $(_modal_product_country_id)
                .val("")
            $(_modal_product_province_id)
                .val("")
            $(_modal_product_city_id)
                .val("")
                .trigger("change")
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
                _modal_product_country_id.value = city.id
                _modal_product_province_id.value = city.province.id
                _modal_product_city_id.value = city.country.id
                _modal_product_depart_from_station_country_id.value = (!isNaN(parseInt(city.country.id))) ? parseInt(city.country.id) : null
                _modal_product_depart_from_station_province_id.value = (!isNaN(parseInt(city.province.id))) ? parseInt(city.province.id) : null
                _modal_product_depart_from_station_city_id.value = (!isNaN(parseInt(city.id))) ? parseInt(city.id) : null
                
                $(_modal_product_city_id).val((city.id) ? city.id : "").trigger("change")
                
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
                let name = $("#modal_product_city").val()
                if (name === "") {
                    $(_modal_product_city_id)
                        .val("")
                        .trigger("change")
                }
            }, 200)
        })
        .on("search", function () {
            
            if (_modal_product_city_id) {
                $(_modal_product_city_id)
                    .val("")
                    .trigger("change")
            }
            
            if (_modal_product_province_id) {
                _modal_product_province_id.value = ""
            }
            
            if (_modal_product_country_id) {
                _modal_product_country_id.value = ""
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
                let cityId = (!isNaN(parseInt(city.id))) ? parseInt(city.id) : null
                let provinceId = (!isNaN(parseInt(city.province.id))) ? parseInt(city.province.id) : null
                let countryId = (!isNaN(parseInt(city.country.id))) ? parseInt(city.country.id) : null
                
                if (_modal_product_city_id && cityId) {
                    _modal_product_city_id.value = cityId
                }
                
                if (_modal_product_province_id && provinceId) {
                    _modal_product_province_id.value = provinceId
                }
                
                if (_modal_product_country_id && countryId) {
                    _modal_product_country_id.value = countryId
                }
                
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
                let province = (city.province) ? city.province : {}
                let country = (city.country) ? city.country : {}
                let countryId = (country.id && !isNaN(parseInt(country.id))) ? parseInt(country.id) : null
                let provinceId = (province.id && !isNaN(parseInt(province.id))) ? parseInt(province.id) : null
                let cityId = (city.id && !isNaN(parseInt(city.id))) ? parseInt(city.id) : null
                
                //*
                console.log("|__ country", country)
                console.log("|__ province", province)
                console.log("|__ city", city)
                //*/
                
                //*
                console.log("|__ countryId", countryId)
                console.log("|__ provinceId", provinceId)
                console.log("|__ cityId", cityId)
                //*/
                
                _modal_product_country_id.value = countryId
                _modal_product_province_id.value = provinceId
                $(_modal_product_city_id).val(cityId).trigger("change")
                
            },
        })
    
    $("#modal_product_city_tours")
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
        //console.log("msg", msg)
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
                //console.log("error", e)
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
                //console.log("error", e)
                handle_city_error("Error: Validating City")
            }
        } else {
            //console.log("Error: Missing Data")
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
