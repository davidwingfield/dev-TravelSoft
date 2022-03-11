const ProductLocation = (function () {
    "use strict"
    
    const _product_location_transport_city_search = document.getElementById("product_location_transport_city_search")
    const _product_edit_location_id = document.getElementById("product_edit_location_id")
    const _product_location_search = document.getElementById("product_location_search")
    const _product_edit_location_city_id = document.getElementById("product_edit_location_city_id")
    const _product_edit_location_city = document.getElementById("product_edit_location_city")
    const _product_edit_location_street_1 = document.getElementById("product_edit_location_street_1")
    const _product_edit_location_street_2 = document.getElementById("product_edit_location_street_2")
    const _product_edit_location_zipcode = document.getElementById("product_edit_location_zipcode")
    const _product_edit_location_location_types_id = document.getElementById("product_edit_location_location_types_id")
    const _product_edit_location_name = document.getElementById("product_edit_location_name")
    const _button_submit_form_product_edit_location = document.getElementById("button_submit_form_product_edit_location")
    const _button_clear_form_product_edit_location = document.getElementById("button_clear_form_product_edit_location")
    const _product_edit_location_city_edit = document.getElementById("product_edit_location_city_edit")
    const _location_country_id = document.getElementById("location_country_id")
    const _location_province_id = document.getElementById("location_province_id")
    const _location_city_id = document.getElementById("location_city_id")
    const _product_edit_location_form = document.getElementById("product_edit_location_form")
    const _product_location = document.getElementById("product_location")
    
    const _product_id = document.getElementById("product_id")
    const _category_id = document.getElementById("category_id")
    
    let form_rules = {
        group: {
            product_edit_location_city: "edit_location_country_id location_province_id location_city_id",
        },
        rules: {
            product_edit_location_city: {
                required: true,
            },
            product_edit_location_name: {
                required: true,
            },
            product_edit_location_location_types_id: {
                required: true,
            },
        },
        messages: {
            product_edit_location_city: {
                required: "Field Required",
            },
            product_edit_location_name: {
                required: "Field Required",
            },
            product_edit_location_location_types_id: {
                required: "Field Required",
            },
        },
    }
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    $(_button_submit_form_product_edit_location)
        .on("click", function () {
            save()
        })
    
    $(_button_clear_form_product_edit_location)
        .on("click", function () {
            resetForm()
        })
    
    $(_product_edit_location_zipcode)
        .on("change", function () {
            ProductLocation.detail.zipcode = (_product_edit_location_zipcode.value !== "") ? _product_edit_location_zipcode.value : null
            renderMap()
        })
    
    $(_product_edit_location_name)
        .on("click", function () {
            ProductLocation.detail.name = (_product_edit_location_name.value !== "") ? _product_edit_location_name.value : null
            renderMap()
        })
    
    $(_location_country_id)
        .on("change", function () {
            let country_id = (!isNaN(parseInt(_location_country_id.value))) ? parseInt(_location_country_id.value) : null
            
            if (country_id !== null) {
                let country = Country.all.get(country_id)
                ProductLocation.detail.country_id = country_id
                ProductLocation.detail.country = country
            }
        })
    
    $(_location_province_id)
        .on("change", function () {
            let province_id = (!isNaN(parseInt(_location_province_id.value))) ? parseInt(_location_province_id.value) : null
            
            if (province_id !== null) {
                let province = Province.all.get(province_id)
                ProductLocation.detail.province_id = province_id
                ProductLocation.detail.province = province
            }
        })
    
    $(_location_city_id)
        .on("change", function () {
            let city_id = (!isNaN(parseInt(_location_city_id.value))) ? parseInt(_location_city_id.value) : null
            
            if (city_id !== null) {
                let city = City.all.get(city_id)
                ProductLocation.detail.city_id = city_id
                ProductLocation.detail.city = city
                renderMap()
            }
        })
    
    $(_product_edit_location_name)
        .on("change", function () {
            ProductLocation.detail.name = (_product_edit_location_name.value !== "") ? _product_edit_location_name.value : null
            renderMap()
        })
    
    $(_product_edit_location_street_1)
        .on("change", function () {
            ProductLocation.detail.street_1 = (_product_edit_location_street_1.value !== "") ? _product_edit_location_street_1.value : null
            renderMap()
        })
    
    $(_product_edit_location_street_2)
        .on("change", function () {
            ProductLocation.detail.street_2 = (_product_edit_location_street_2.value !== "") ? _product_edit_location_street_2.value : null
            renderMap()
        })
    
    $(_location_city_id)
        .on("change", function () {
            let cityLine = ""
            let country_id = (!isNaN(parseInt(_location_country_id.value))) ? parseInt(_location_country_id.value) : null
            let province_id = (!isNaN(parseInt(_location_province_id.value))) ? parseInt(_location_province_id.value) : null
            let city_id = (!isNaN(parseInt(_location_city_id.value))) ? parseInt(_location_city_id.value) : null
            let country = Country.all.get(country_id)
            let province = Province.all.get(province_id)
            let city = City.all.get(city_id)
            
            ProductLocation.detail.country = country
            ProductLocation.detail.country_id = country_id
            
            ProductLocation.detail.province = province
            ProductLocation.detail.province_id = province_id
            
            ProductLocation.detail.city = city
            ProductLocation.detail.city_id = city_id
            
            if (country && province && city) {
                let cityName = city.name
                let provinceName = province.name
                let countryName = country.name
                _product_edit_location_city_id.value = city.id
                cityLine = `${cityName} (${provinceName}, ${countryName})`
            } else {
                cityLine = ``
                _product_edit_location_city_id.value = ``
            }
            
            _product_edit_location_city.value = cityLine
        })
    
    const initAutoComplete = function () {
        
        $(_product_edit_location_city)
            .on("change", function () {
                setTimeout(function () {
                    let cityName = _product_edit_location_city.value
                    if (cityName === "") {
                        resetCityForm()
                    }
                }, 200)
            })
            .on("search", function () {
                resetCityForm()
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
                    let country, province, city, city_name, country_name, province_name = null
                    
                    let product_location = suggestion.data
                    
                    let detail = set(product_location)
                    
                    if (product_location.country) {
                        country = product_location.country
                        Country.set_detail(country)
                        Country.id = (country.id) ? country.id.toString() : null
                    }
                    
                    if (product_location.province) {
                        province = product_location.province
                        Province.set_detail(province)
                        province_name = province.name
                        Province.id = (province.id) ? province.id.toString() : null
                    }
                    
                    if (product_location.city) {
                        city = product_location.city
                        city_name = city.name
                        City.set_detail(city)
                        City.id = (city.id) ? city.id.toString() : null
                    }
                    
                    $(_location_country_id).val((product_location.city.country_id) ? product_location.city.country_id : "").trigger("change")
                    
                    _product_location_search.value = `City Center (${city_name}, ${province_name})`
                    
                    let name = (_product_edit_location_name && _product_edit_location_name.value !== "") ? _product_edit_location_name.value : null
                    let zipcode = (_product_edit_location_zipcode && _product_edit_location_zipcode.value !== "") ? _product_edit_location_zipcode.value : null
                    let street_1 = (_product_edit_location_street_1 && _product_edit_location_street_1.value !== "") ? _product_edit_location_street_1.value : null
                    let street_2 = (_product_edit_location_street_2 && _product_edit_location_street_2.value !== "") ? _product_edit_location_street_2.value : null
                    
                    product_location.name = name
                    product_location.street_1 = street_1
                    product_location.street_2 = street_2
                    product_location.zipcode = zipcode
                    
                    //renderMap()
                },
            })
    }
    
    const showCityForm = function () {
        if (_product_edit_location_city_edit) {
            $(_product_edit_location_city_edit).show()
        }
    }
    
    const hideCityForm = function () {
        if (_product_edit_location_city_edit) {
            //$(_product_edit_location_city_edit).hide()
        }
    }
    
    const resetCityForm = function () {
        _product_edit_location_zipcode.value = ""
        _product_edit_location_city_id.value = ""
        
        $(_location_country_id)
            .val("")
            .trigger("change")
        
        hideCityForm()
    }
    
    const resetForm = function () {
        _product_edit_location_street_1.value = ""
        _product_edit_location_street_2.value = ""
        _product_edit_location_zipcode.value = ""
        _product_edit_location_city.value = ""
        _product_edit_location_name.value = ""
        _product_edit_location_location_types_id.value = ""
        
        resetCityForm()
    }
    
    const renderMap = function () {
        //console.log("ProductLocation.detail", ProductLocation.detail)
        
        let url = buildMapsURL(ProductLocation.detail)
        let elementWidth, elementHeight = null
        let _locationMap = document.getElementById("locationMap")
        
        if (_locationMap) {
            $(_locationMap)
                .empty()
                .append(
                    $("<iframe/>", {
                        id: "locationMapContainer",
                        allowfullscreen: "allowfullscreen",
                        frameborder: "0",
                        src: url,
                    }),
                )
            
            elementWidth = (!isNaN(parseInt($(_locationMap).actual("width")))) ? parseInt($(_locationMap).actual("width")) : null
            
            if (elementWidth) {
                elementHeight = elementWidth / 2
                
                $("#locationMapContainer")
                    .css({
                        "height": elementHeight + "px",
                        "width": elementWidth + "px",
                    })
            }
        }
        
    }
    
    const defaultDetail = function () {
        return {
            id: null,
            city_id: null,
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
            display_long: null,
            display_medium: null,
            display_short: null,
            country: {},
            province: {},
            city: {},
            type: [],
        }
    }
    
    const set = function (productLocation) {
        /*
        //console.log("ProductLocation.set(productLocation) - productLocation ", productLocation)
        let detail = defaultDetail()
        
        if (productLocation) {
            let locationTypesId = (!isNaN(parseInt(productLocation.location_types_id))) ? parseInt(productLocation.location_types_id) : null
            
            detail["zipcode"] = (productLocation.zipcode) ? productLocation.zipcode : null
            detail["street_1"] = (productLocation.street_1) ? productLocation.street_1 : null
            detail["street_2"] = (productLocation.street_2) ? productLocation.street_2 : null
            detail["country"] = (productLocation.country) ? productLocation.country : null
            detail["province"] = (productLocation.province) ? productLocation.province : null
            detail["city"] = (productLocation.city) ? productLocation.city : null
            detail["display_long"] = (productLocation.display_long) ? productLocation.display_long : null
            detail["display_medium"] = (productLocation.display_medium) ? productLocation.display_medium : null
            detail["display_short"] = (productLocation.display_short) ? productLocation.display_short : null
            detail["postal_code"] = (productLocation.postal_code) ? productLocation.postal_code : null
            
            detail["enabled"] = (productLocation.enabled) ? productLocation.enabled : 1
            detail["id"] = (productLocation.id) ? productLocation.id : null
            detail["name"] = (productLocation.name) ? productLocation.name : null
            
            detail["type"] = (productLocation.type) ? productLocation.type : []
            
            detail["location_types_id"] = locationTypesId
            detail["type"] = (productLocation.type) ? productLocation.type : {}
            detail["city_id"] = (productLocation.city.id) ? productLocation.city.id : null
            detail["province"].id = (productLocation.province.id) ? productLocation.province.id : null
            detail["country"].id = (productLocation.country.id) ? productLocation.country.id : null
        }
        
        ProductLocation.detail = detail
        
        return detail
        //*/
    }
    
    const populateForm = function (product_location) {
        if (!_product_edit_location_form) {
            return
        }
        
        resetForm()
        
        if (product_location) {
            let detail = product_location
            let country, province, city = {}
            
            ProductLocation.detail = product_location
            ProductLocation.display_long = product_location.display_long //"City Center (Houston TX - Texas, US - United States)"
            ProductLocation.display_medium = product_location.display_medium // "City Center (Houston, Texas)"
            ProductLocation.display_short = product_location.display_short //"City Center (Houston TX, US)"
            
            let citySearchDisplay = ""
            let location_name = (product_location.name) ? product_location.name : null
            let location_id = (!isNaN(parseInt(product_location.id))) ? parseInt(product_location.id) : null
            let postal_code = (product_location.postal_code) ? product_location.postal_code : ""
            let street_1 = (product_location.street_1) ? product_location.street_1 : ""
            let street_2 = (product_location.street_2) ? product_location.street_2 : ""
            
            _product_edit_location_id.value = location_id
            _product_edit_location_street_1.value = street_1
            _product_edit_location_street_2.value = street_2
            _product_edit_location_zipcode.value = postal_code
            _product_edit_location_city.value = ""
            _product_edit_location_name.value = location_name
            
            $(_product_edit_location_location_types_id).val(product_location.type.id.toString())
            
            if (product_location.country) {
                country = product_location.country
                Country.set_detail(country)
                Country.id = (country.id) ? country.id.toString() : null
            }
            
            if (product_location.province) {
                province = product_location.province
                Province.set_detail(province)
                Province.id = (province.id) ? province.id.toString() : null
            }
            
            if (product_location.city) {
                city = product_location.city
                City.set_detail(city)
                City.id = (city.id) ? city.id.toString() : null
            }
            
            ProductLocation.detail.name = (product_location.name) ? product_location.name : null
            
            citySearchDisplay = city.name + " (" + province.name + ", " + country.name + ")"
            _product_edit_location_city.value = citySearchDisplay
            
            $(_location_country_id)
                .val((country.id) ? country.id : "")
                .trigger("change")
            
            renderMap()
        }
        
    }
    
    const valid = function () {
        return $(_product_edit_location_form).valid()
    }
    
    const buildLocationObject = function () {
        //console.log("ProductLocation.buildLocationObject()")
        if (valid()) {
            let id, city_id, location_types_id, name, street_1, street_2,
                zipcode, enabled, note
            
            name = (_product_edit_location_name.value !== "") ? _product_edit_location_name.value : null
            street_1 = (_product_edit_location_street_1.value !== "") ? _product_edit_location_street_1.value : null
            street_2 = (_product_edit_location_street_2.value !== "") ? _product_edit_location_street_2.value : null
            city_id = (!isNaN(parseInt(_location_city_id.value))) ? parseInt(_location_city_id.value) : null
            zipcode = (_product_edit_location_zipcode.value !== "") ? _product_edit_location_zipcode.value : null
            id = (!isNaN(parseInt(_product_edit_location_id.value))) ? parseInt(_product_edit_location_id.value) : null
            location_types_id = (!isNaN(parseInt(_product_edit_location_location_types_id.value))) ? parseInt(_product_edit_location_location_types_id.value) : null
            
            let productLocation = {
                product_id: (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null,
                category_id: (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null,
                id: id,
                city_id: city_id,
                location_types_id: location_types_id,
                name: name,
                street_1: street_1,
                street_2: street_2,
                zipcode: zipcode,
                enabled: 1,
                note: null,
            }
            
            return removeNulls(productLocation)
        }
    }
    
    const sendUpdateRequest = function (dataToSend, callback) {
        let url = "/api/v1.0/locations/update"
        
        try {
            sendPostRequest(url, dataToSend, function (data, status, xhr) {
                if (data) {
                    return callback(data)
                }
            })
        } catch (e) {
            //console.log("error", e)
            handleProductLocationError("Error Updating Location")
        }
    }
    
    const handleProductLocationError = function (msg) {
    
    }
    
    const save = function () {
        let productLocation = buildLocationObject()
        
        if (productLocation) {
            confirmDialog(`Would you like to update?`, (ans) => {
                if (ans) {
                    sendUpdateRequest(productLocation, function (data) {
                        let location
                        if (data) {
                            location = data
                            if (data[0]) {
                                location = data[0]
                            }
                        }
                        
                        if (location) {
                            Product.detail.location = location
                            
                            //console.log("location", location)
                            //console.log("Product.detail.location", Product.detail.location)
                            Product.updateDisplay()
                            toastr["success"](`Location ${location.id} has been updated`, "Location Updated")
                        }
                    })
                }
            })
        }
    }
    
    const init = function (settings) {
        //console.log("init(settings)", settings)
        
        $(document).ready(function () {
            let categoryId = (_category_id && (!isNaN(parseInt(_category_id.value)))) ? parseInt(_category_id.value) : null
            let location
            
            if (settings) {
                
                _product_edit_location_city_id.value = (settings.product.city_id) ? settings.product.city_id : null
                
                if (categoryId === 1) {
                    if (_product_edit_location_form) {
                        _product_edit_location_city_id.value = (settings.product.city_id) ? settings.product.city_id : null
                        location = (settings.product_location) ? settings.product_location : null
                        if (location) {
                            validator_init(form_rules)
                            ProductLocation.validator = $(_product_edit_location_form).validate()
                            
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
                            
                            initAutoComplete()
                            
                            populateForm(location)
                        }
                    }
                }
                
                if (categoryId === 2) {
                    //console.log("settings - 2", settings)
                    let cityId = (settings.product.city_id) ? settings.product.city_id : null
                    //console.log("cityId - 3", cityId)
                    _product_edit_location_city_id.value = cityId
                    if (settings.arriving_location && settings.departing_location) {
                        Airport.init(settings)
                    }
                }
                
                if (categoryId === 3) {
                    //console.log("settings - 3", settings)
                    let cityId = (settings.product.city_id) ? settings.product.city_id : null
                    //console.log("cityId - 3", cityId)
                    _product_edit_location_city_id.value = (settings.product.city_id) ? settings.product.city_id : null
                    Car.init(settings)
                }
                
                if (categoryId === 4) {
                
                }
                
                if (categoryId === 5) {
                
                }
                
                if (categoryId === 6) {
                    if (_product_edit_location_form) {
                        _product_edit_location_city_id.value = (settings.product.city_id) ? settings.product.city_id : null
                        location = (settings.product_location) ? settings.product_location : null
                        if (location) {
                            validator_init(form_rules)
                            ProductLocation.validator = $(_product_edit_location_form).validate()
                            
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
                            
                            initAutoComplete()
                            
                            populateForm(location)
                        }
                    }
                }
                
                if (categoryId === 7) {
                
                }
                
                if (categoryId === 8) {
                
                }
                
                if (categoryId === 9) {
                
                }
                
            }
        })
    }
    
    return {
        validator: null,
        detail: {
            id: null,
            city_id: null,
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
            display_long: null,
            display_medium: null,
            display_short: null,
            country: [],
            province: [],
            city: [],
            type: [],
        },
        display_long: null,
        display_medium: null,
        display_short: null,
        init: function (settings) {
            $(document).ready(function () {
                init(settings)
            })
        },
    }
})()
