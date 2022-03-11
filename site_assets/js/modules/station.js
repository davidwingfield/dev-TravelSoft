const Station = (function () {
    "use strict"
    const _modal_product_depart_from_station_cancel_button = document.getElementById("modal_product_depart_from_station_cancel_button")
    const _modal_product_depart_from_station_submit_button = document.getElementById("modal_product_depart_from_station_submit_button")
    const _modal_product_depart_from_station_iata_code = document.getElementById("modal_product_depart_from_station_iata_code")
    const _modal_product_depart_from_station_country_id = document.getElementById("modal_product_depart_from_station_country_id")
    const _modal_product_depart_from_station_province_id = document.getElementById("modal_product_depart_from_station_province_id")
    const _modal_product_depart_from_station_city_id = document.getElementById("modal_product_depart_from_station_city_id")
    const _modal_product_depart_from_station_city = document.getElementById("modal_product_depart_from_station_city")
    const _modal_product_depart_from_station = document.getElementById("modal_product_depart_from_station")
    const _modal_product_depart_from_station_id = document.getElementById("modal_product_depart_from_station_id")
    const _modal_product_depart_from_station_add_block = document.getElementById("modal_product_depart_from_station_add_block")
    
    const _modal_product_arrive_to_station_postal_code = document.getElementById("modal_product_arrive_to_station_postal_code")
    const _modal_product_arrive_to_station_street_1 = document.getElementById("modal_product_arrive_to_station_street_1")
    const _modal_product_arrive_to_station_street_2 = document.getElementById("modal_product_arrive_to_station_street_2")
    
    const _modal_product_depart_from_station_postal_code = document.getElementById("modal_product_depart_from_station_postal_code")
    const _modal_product_depart_from_station_street_1 = document.getElementById("modal_product_depart_from_station_street_1")
    const _modal_product_depart_from_station_street_2 = document.getElementById("modal_product_depart_from_station_street_2")
    
    const _modal_product_country_id = document.getElementById("modal_product_country_id")
    const _modal_product_province_id = document.getElementById("modal_product_province_id")
    const _modal_product_city_id = document.getElementById("modal_product_city_id")
    const _modal_product_depart_from_station_edit_link = document.getElementById("modal_product_depart_from_station_edit_link")
    const _modal_product_arrive_to_station_edit_link = document.getElementById("modal_product_arrive_to_station_edit_link")
    const _modal_product_depart_from_new_station_id = document.getElementById("modal_product_depart_from_new_station_id")
    const _modal_product_arrive_to_station_cancel_button = document.getElementById("modal_product_arrive_to_station_cancel_button")
    const _modal_product_arrive_to_new_station_id = document.getElementById("modal_product_arrive_to_new_station_id")
    const _modal_product_arrive_to_station_submit_button = document.getElementById("modal_product_arrive_to_station_submit_button")
    const _modal_product_arrive_to_station_iata_code = document.getElementById("modal_product_arrive_to_station_iata_code")
    const _modal_product_arrive_to_station_country_id = document.getElementById("modal_product_arrive_to_station_country_id")
    const _modal_product_arrive_to_station_province_id = document.getElementById("modal_product_arrive_to_station_province_id")
    const _modal_product_arrive_to_station_city_id = document.getElementById("modal_product_arrive_to_station_city_id")
    const _modal_product_arrive_to_station_city = document.getElementById("modal_product_arrive_to_station_city")
    const _modal_product_arrive_to_station = document.getElementById("modal_product_arrive_to_station")
    const _modal_product_arrive_to_station_id = document.getElementById("modal_product_arrive_to_station_id")
    const _modal_product_arrive_to_station_add_block = document.getElementById("modal_product_arrive_to_station_add_block")
    
    let userId = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let globalSelectedStationDepartFrom = false
    let globalSelectedStationArriveTo = false
    
    $(_modal_product_depart_from_station_edit_link)
        .on("click", function () {
            console.log("Station.modal_product_depart_from_station_edit_link:click()")
            // ----
            
            let stationId = (_modal_product_depart_from_station_edit_link.dataset.stationId && !isNaN(parseInt(_modal_product_depart_from_station_edit_link.dataset.stationId))) ? parseInt(_modal_product_depart_from_station_edit_link.dataset.stationId) : null
            let station = Station.all.get(stationId)
            
            /*
            console.log("|__ stationId", stationId)
            console.log("|__ station", station)
            //*/
            
            if (station) {
                clearStationForm("depart_from")
                populateStationForm(station, "depart_from")
                showStationForm("depart_from")
            }
        })
    
    $(_modal_product_arrive_to_station_edit_link)
        .on("click", function () {
            console.log("Station.modal_product_arrive_to_station_edit_link:click()")
        })
    
    $(_modal_product_depart_from_station_add_block)
        .on("change", function () {
            validDepartFromRecord()
        })
        .on("keyup", function () {
            validDepartFromRecord()
        })
    
    $(_modal_product_depart_from_station_cancel_button)
        .on("click", function () {
            cancelAddStationRecord("depart_from")
        })
    
    $(_modal_product_arrive_to_station_cancel_button)
        .on("click", function () {
            cancelAddStationRecord("arrive_to")
        })
    
    $(_modal_product_depart_from_station_submit_button)
        .on("click", function () {
            save("depart_from")
        })
    
    $(_modal_product_arrive_to_station_submit_button)
        .on("click", function () {
            save("arrive_to")
        })
    
    const save = function (type) {
        if (type) {
            let dataToSend = buildAddStationRecord(type)
            
            if (dataToSend) {
                confirmDialog(`Would you like to update?`, (ans) => {
                    if (ans) {
                        sendSaveRequest(dataToSend, function (data) {
                            let station
                            if (data) {
                                station = data
                                if (data[0]) {
                                    station = data[0]
                                }
                            }
                            
                            if (station) {
                                console.log("|__ station", station)
                                
                                let countryId = (station.country && !isNaN(parseInt(station.country.id))) ? parseInt(station.country.id) : null
                                let provinceId = (station.province && !isNaN(parseInt(station.province.id))) ? parseInt(station.province.id) : null
                                let cityId = (station.city && !isNaN(parseInt(station.city.id))) ? parseInt(station.city.id) : null
                                let stationId = (!isNaN(parseInt(station.id))) ? parseInt(station.id) : null
                                let stationName = (station.name) ? station.name : null
                                
                                if (type === "depart_from") {
                                    
                                    if (_modal_product_depart_from_station) {
                                        _modal_product_depart_from_station.value = stationName
                                    }
                                    
                                    if (_modal_product_depart_from_new_station_id) {
                                        _modal_product_depart_from_new_station_id.value = stationId
                                    }
                                    
                                    if (_modal_product_depart_from_station_id) {
                                        _modal_product_depart_from_station_id.value = stationId
                                    }
                                    
                                    if (_modal_product_country_id) {
                                        _modal_product_country_id.value = countryId
                                    }
                                    
                                    if (_modal_product_province_id) {
                                        _modal_product_province_id.value = provinceId
                                    }
                                    
                                    if (_modal_product_city_id) {
                                        _modal_product_city_id.value = cityId
                                    }
                                    
                                    _modal_product_depart_from_station_edit_link.dataset.stationId = stationId
                                    $(_modal_product_depart_from_station_edit_link).show()
                                    
                                } else if (type === "arrive_to") {
                                    if (_modal_product_arrive_to_station) {
                                        _modal_product_arrive_to_station.value = stationName
                                    }
                                    
                                    if (_modal_product_arrive_to_new_station_id) {
                                        _modal_product_arrive_to_new_station_id.value = stationId
                                    }
                                    
                                    if (_modal_product_arrive_to_station_id) {
                                        _modal_product_arrive_to_station_id.value = stationId
                                    }
                                    
                                    if (_modal_product_country_id) {
                                        _modal_product_country_id.value = countryId
                                    }
                                    
                                    if (_modal_product_province_id) {
                                        _modal_product_province_id.value = provinceId
                                    }
                                    
                                    if (_modal_product_city_id) {
                                        _modal_product_city_id.value = cityId
                                    }
                                    
                                    _modal_product_arrive_to_station_edit_link.dataset.stationId = stationId
                                    $(_modal_product_arrive_to_station_edit_link).show()
                                }
                                
                                resetStationForm(type)
                                initAutocomplete()
                            }
                        })
                    }
                })
            }
        }
    }
    
    const sendSaveRequest = function (dataToSend, callback) {
        if (dataToSend) {
            let url = "/api/v1.0/stations/update"
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        handleStationError("Oops: 1")
                    }
                })
            } catch (e) {
                //console.log("error", e)
            }
        }
    }
    
    const validDepartFromRecord = function () {
        let isValid = true
        
        if (_modal_product_depart_from_station_iata_code.value === "") {
            $(_modal_product_depart_from_station_iata_code).showError("Field Required")
            isValid = false
        } else {
            $(_modal_product_depart_from_station_iata_code).hideError()
        }
        
        if (isNaN(parseInt(_modal_product_depart_from_station_city_id.value))) {
            $(_modal_product_depart_from_station_city).showError("Field Required")
            isValid = false
        } else {
            $(_modal_product_depart_from_station_city).hideError()
        }
        
        return isValid
    }
    
    const validArriveToRecord = function () {
        let isValid = true
        
        if (_modal_product_arrive_to_station_iata_code.value === "") {
            $(_modal_product_arrive_to_station_iata_code).showError("Field Required")
            isValid = false
        } else {
            $(_modal_product_arrive_to_station_iata_code).hideError()
        }
        
        if (isNaN(parseInt(_modal_product_arrive_to_station_city_id.value))) {
            $(_modal_product_arrive_to_station_city).showError("Field Required")
            isValid = false
        } else {
            $(_modal_product_arrive_to_station_city).hideError()
        }
        
        return isValid
    }
    
    const buildAddStationRecord = function (type) {
        if (_modal_product_depart_from_station_add_block && _modal_product_arrive_to_station_add_block) {
            if (type) {
                if (type === "depart_from") {
                    if (validDepartFromRecord()) {
                        let dataToSend = {
                            postal_code: (_modal_product_depart_from_station_postal_code.value !== "") ? _modal_product_depart_from_station_postal_code.value : null,
                            street_1: (_modal_product_depart_from_station_street_1.value !== "") ? _modal_product_depart_from_station_street_1.value : null,
                            street_2: (_modal_product_depart_from_station_street_2.value !== "") ? _modal_product_depart_from_station_street_2.value : null,
                            city_id: (!isNaN(parseInt(_modal_product_depart_from_station_city_id.value))) ? parseInt(_modal_product_depart_from_station_city_id.value) : null,
                            name: (_modal_product_depart_from_station.value !== "") ? _modal_product_depart_from_station.value : null,
                            iata_code: (_modal_product_depart_from_station_iata_code.value !== "") ? _modal_product_depart_from_station_iata_code.value : null,
                        }
                        
                        return removeNulls(dataToSend)
                    }
                } else if (type === "arrive_to") {
                    if (validArriveToRecord()) {
                        let dataToSend = {
                            postal_code: (_modal_product_arrive_to_station_postal_code.value !== "") ? _modal_product_arrive_to_station_postal_code.value : null,
                            street_1: (_modal_product_arrive_to_station_street_1.value !== "") ? _modal_product_arrive_to_station_street_1.value : null,
                            street_2: (_modal_product_arrive_to_station_street_2.value !== "") ? _modal_product_arrive_to_station_street_2.value : null,
                            city_id: (!isNaN(parseInt(_modal_product_arrive_to_station_city_id.value))) ? parseInt(_modal_product_arrive_to_station_city_id.value) : null,
                            name: (_modal_product_arrive_to_station.value !== "") ? _modal_product_arrive_to_station.value : null,
                            iata_code: (_modal_product_arrive_to_station_iata_code.value !== "") ? _modal_product_arrive_to_station_iata_code.value : null,
                        }
                        
                        return removeNulls(dataToSend)
                    }
                }
            }
        }
    }
    
    const cancelAddStationRecord = function (type) {
        if (_modal_product_depart_from_station_add_block && _modal_product_arrive_to_station_add_block) {
            clearStationForm(type)
            hideStationForm(type)
            
            if (type) {
                if (type === "depart_from") {
                    _modal_product_depart_from_station.value = ""
                } else if (type === "arrive_to") {
                    _modal_product_arrive_to_station.value = ""
                }
            }
        }
    }
    
    const populateStationForm = function (station, type) {
        if (_modal_product_depart_from_station_add_block && _modal_product_arrive_to_station_add_block) {
            clearStationForm(type)
            if (station) {
                console.log("|__ station", station)
                
                let countryId = (station.country && station.country.id && !isNaN(parseInt(station.country.id))) ? parseInt(station.country.id) : null
                let provinceId = (station.province && station.province.id && !isNaN(parseInt(station.province.id))) ? parseInt(station.province.id) : null
                let cityId = (station.city && station.city.id && !isNaN(parseInt(station.city.id))) ? parseInt(station.city.id) : null
                let stationId = (station.id && !isNaN(parseInt(station.id))) ? parseInt(station.id) : null
                let stationName = (station.name) ? station.name : null
                let stationIATACode = (station.iata_code) ? station.iata_code : null
                let stationStreet1 = (station.street_1) ? station.street_1 : null
                let stationStreet2 = (station.street_2) ? station.street_2 : null
                let stationPostalCode = (station.postal_code) ? station.postal_code : null
                
                if (type) {
                    if (type === "depart_from") {
                        _modal_product_depart_from_new_station_id.value = stationId
                        _modal_product_depart_from_station_iata_code.value = stationIATACode
                        _modal_product_depart_from_station_city.value = ""
                        _modal_product_depart_from_station_city_id.value = cityId
                        _modal_product_depart_from_station_country_id.value = countryId
                        _modal_product_depart_from_station_province_id.value = provinceId
                        _modal_product_depart_from_station_postal_code.value = stationPostalCode
                        _modal_product_depart_from_station_street_1.value = stationStreet1
                        _modal_product_depart_from_station_street_2.value = stationStreet2
                        _modal_product_depart_from_station_id.value = stationId
                        _modal_product_country_id.value = countryId
                        _modal_product_province_id.value = provinceId
                        _modal_product_city_id.value = cityId
                        
                    } else if (type === "arrive_to") {
                    
                    }
                }
                showStationForm(type)
            }
        }
    }
    
    const clearStationForm = function (type) {
        if (_modal_product_depart_from_station_add_block && _modal_product_arrive_to_station_add_block) {
            if (type) {
                if (type === "depart_from") {
                    _modal_product_depart_from_new_station_id.value = ""
                    _modal_product_depart_from_station_iata_code.value = ""
                    _modal_product_depart_from_station_city.value = ""
                    _modal_product_depart_from_station_city_id.value = ""
                    _modal_product_depart_from_station_country_id.value = ""
                    _modal_product_depart_from_station_province_id.value = ""
                    _modal_product_depart_from_station_postal_code.value = ""
                    _modal_product_depart_from_station_street_1.value = ""
                    _modal_product_depart_from_station_street_2.value = ""
                    _modal_product_depart_from_station_id.value = ""
                    _modal_product_country_id.value = ""
                    _modal_product_province_id.value = ""
                    _modal_product_city_id.value = ""
                    
                    _modal_product_depart_from_station.disabled = false
                    
                    _modal_product_depart_from_station_edit_link.dataset.stationId = ""
                    $(_modal_product_depart_from_station_edit_link).hide()
                    
                    clearAllValidation()
                    
                } else if (type === "arrive_to") {
                    _modal_product_arrive_to_new_station_id.value = ""
                    _modal_product_arrive_to_station_iata_code.value = ""
                    _modal_product_arrive_to_station_city.value = ""
                    _modal_product_arrive_to_station_city_id.value = ""
                    _modal_product_arrive_to_station_country_id.value = ""
                    _modal_product_arrive_to_station_province_id.value = ""
                    _modal_product_arrive_to_station_postal_code.value = ""
                    _modal_product_arrive_to_station_street_1.value = ""
                    _modal_product_arrive_to_station_street_2.value = ""
                    _modal_product_arrive_to_station_id.value = ""
                    
                    _modal_product_arrive_to_station.disabled = false
                    
                    _modal_product_arrive_to_station_edit_link.dataset.stationId = ""
                    $(_modal_product_arrive_to_station_edit_link).hide()
                    
                    clearAllValidation()
                }
            }
            
            _modal_product_country_id.value = ""
            _modal_product_province_id.value = ""
            _modal_product_city_id.value = ""
        }
    }
    
    const resetStationForm = function (type) {
        if (_modal_product_depart_from_station_add_block && _modal_product_arrive_to_station_add_block) {
            if (type) {
                _modal_product_arrive_to_station.disabled = false
                _modal_product_depart_from_station.disabled = false
                
                clearStationForm(type)
                
                hideStationForm("depart_from")
                hideStationForm("arrive_to")
            }
        }
    }
    
    const hideStationForm = function (type) {
        if (_modal_product_depart_from_station_add_block && _modal_product_arrive_to_station_add_block) {
            if (type) {
                if (type === "depart_from") {
                    $(_modal_product_depart_from_station_add_block).hide()
                } else if (type === "arrive_to") {
                    $(_modal_product_arrive_to_station_add_block).hide()
                }
            }
        }
    }
    
    const showStationForm = function (type) {
        if (_modal_product_depart_from_station_add_block && _modal_product_arrive_to_station_add_block) {
            if (type) {
                if (type === "depart_from") {
                    _modal_product_depart_from_station.disabled = true
                    $(_modal_product_depart_from_station_add_block).show()
                    $(_modal_product_arrive_to_station_add_block).hide()
                } else if (type === "arrive_to") {
                    _modal_product_arrive_to_station.disabled = true
                    $(_modal_product_arrive_to_station_add_block).show()
                    $(_modal_product_depart_from_station_add_block).hide()
                }
            }
        }
    }
    
    const initAutocomplete = function () {
        
        if (_modal_product_depart_from_station) {
            
            $(_modal_product_depart_from_station)
                .on("click", function (e) {
                    if ($(this).attr("readonly") === "readonly") {
                        e.preventDefault()
                    } else {
                        $(this).select()
                    }
                })
                .on("search", function () {
                    
                    if (_modal_product_depart_from_station_id) {
                        _modal_product_depart_from_station_id.value = ""
                    }
                    
                    if (_modal_product_depart_from_station_country_id) {
                        _modal_product_depart_from_station_country_id.value = ""
                    }
                    
                    if (_modal_product_depart_from_station_province_id) {
                        _modal_product_depart_from_station_province_id.value = ""
                    }
                    
                    if (_modal_product_depart_from_station_city_id) {
                        _modal_product_depart_from_station_city_id.value = ""
                    }
                    
                    if (_modal_product_depart_from_station) {
                        _modal_product_depart_from_station.value = ""
                    }
                    
                    _modal_product_depart_from_station_edit_link.dataset.stationId = ""
                    $(_modal_product_depart_from_station_edit_link).hide()
                    
                })
                .on("keyup", function () {
                    globalSelectedStationDepartFrom = false
                })
                .on("change", function () {
                    setTimeout(function () {
                        let station_name = _modal_product_depart_from_station.value
                        
                        if (globalSelectedStationDepartFrom === false) {
                            if (station_name === "") {
                                _modal_product_depart_from_station.value = ""
                                _modal_product_depart_from_station_id.value = ""
                                _modal_product_depart_from_station_province_id.value = ""
                                _modal_product_depart_from_station_city_id.value = ""
                                
                                _modal_product_depart_from_station_edit_link.dataset.stationId = ""
                                $(_modal_product_depart_from_station_edit_link).hide()
                                
                                globalSelectedStationDepartFrom = false
                            } else {
                                stationExists(station_name, "depart_from")
                            }
                        }
                    }, 200)
                })
                .autocomplete({
                    serviceUrl: "/api/v1.0/autocomplete/stations",
                    minChars: 2,
                    cache: false,
                    dataType: "json",
                    triggerSelectOnValidInput: false,
                    paramName: "st",
                    onSelect: function (suggestion) {
                        if (!suggestion || !suggestion.data) {
                            return
                        }
                        
                        let station = suggestion.data
                        if (station[0]) {
                            station = station[0]
                        }
                        
                        globalSelectedStationDepartFrom = true
                        
                        console.log("|__ station", station)
                        
                        if (station) {
                            
                            let countryId = (station.country && !isNaN(parseInt(station.country.id))) ? parseInt(station.country.id) : null
                            let provinceId = (station.province && !isNaN(parseInt(station.province.id))) ? parseInt(station.province.id) : null
                            let cityId = (station.city && !isNaN(parseInt(station.city.id))) ? parseInt(station.city.id) : null
                            let stationId = (!isNaN(parseInt(station.id))) ? parseInt(station.id) : null
                            let stationName = (station.name) ? station.name : null
                            
                            if (_modal_product_depart_from_station) {
                                _modal_product_depart_from_station.value = stationName
                            }
                            
                            if (_modal_product_depart_from_station_id) {
                                _modal_product_depart_from_station_id.value = stationId
                            }
                            
                            if (_modal_product_depart_from_station_country_id) {
                                _modal_product_depart_from_station_country_id.value = countryId
                            }
                            
                            if (_modal_product_depart_from_station_province_id) {
                                _modal_product_depart_from_station_province_id.value = provinceId
                            }
                            
                            if (_modal_product_depart_from_station_city_id) {
                                _modal_product_depart_from_station_city_id.value = cityId
                            }
                            
                            _modal_product_depart_from_station_edit_link.dataset.stationId = stationId
                            $(_modal_product_depart_from_station_edit_link).show()
                            
                        } else {
                            _modal_product_depart_from_station_edit_link.dataset.stationId = ""
                            $(_modal_product_depart_from_station_edit_link).hide()
                            resetStationForm("depart_from")
                            showStationForm("depart_from")
                        }
                    },
                })
        }
        
        if (_modal_product_arrive_to_station) {
            
            $(_modal_product_arrive_to_station)
                .on("click", function () {
                    if ($(this).attr("readonly") === "readonly") {
                        e.preventDefault()
                    } else {
                        $(this).select()
                    }
                })
                .on("keyup", function () {
                    globalSelectedStationArriveTo = false
                })
                .on("search", function () {
                    if (_modal_product_arrive_to_station_id) {
                        _modal_product_arrive_to_station_id.value = ""
                    }
                    if (_modal_product_arrive_to_station) {
                        _modal_product_arrive_to_station.value = ""
                    }
                })
                .on("change", function () {
                    setTimeout(function () {
                        let station_name = _modal_product_arrive_to_station.value
                        
                        if (globalSelectedStationArriveTo === false) {
                            if (station_name === "") {
                                _modal_product_arrive_to_station.value = ""
                                _modal_product_arrive_to_station_id.value = ""
                                globalSelectedStationArriveTo = false
                            } else {
                                stationExists(station_name, "arrive_to")
                            }
                        }
                    }, 200)
                })
                .autocomplete({
                    serviceUrl: "/api/v1.0/autocomplete/stations",
                    minChars: 2,
                    cache: false,
                    dataType: "json",
                    triggerSelectOnValidInput: false,
                    paramName: "st",
                    onSelect: function (suggestion) {
                        if (!suggestion || !suggestion.data) {
                            return
                        }
                        
                        globalSelectedStationArriveTo = true
                        
                        let station = suggestion.data
                        
                        if (station) {
                            if (_modal_product_arrive_to_station) {
                                _modal_product_arrive_to_station.value = (station.name) ? station.name : ""
                            }
                            
                            if (_modal_product_arrive_to_station_id) {
                                _modal_product_arrive_to_station_id.value = (!isNaN(parseInt(station.id))) ? parseInt(station.id) : ""
                            }
                            
                            _modal_product_arrive_to_station_edit_link.dataset.stationId = (!isNaN(parseInt(station.id))) ? parseInt(station.id) : ""
                            $(_modal_product_arrive_to_station_edit_link).show()
                            
                        } else {
                            _modal_product_arrive_to_station_edit_link.dataset.stationId = ""
                            $(_modal_product_arrive_to_station_edit_link).hide()
                            resetStationForm("arrive_to")
                            showStationForm("arrive_to")
                        }
                    },
                })
        }
        
    }
    
    const stationExists = function (name, type) {
        if (name && name !== "") {
            /**
             * data to send to the server
             *
             * @type {{name}}
             */
            let dataToSend = {
                name: name,
            }
            
            fetchByName(dataToSend, function (data) {
                let station = null
                
                if (data) {
                    station = data
                    if (data[0]) {
                        station = data[0]
                    }
                }
                
                if (station && station.id) {
                    if (type === "depart_from") {
                        globalSelectedStationDepartFrom = true
                        
                        _modal_product_depart_from_station.value = station.name
                        _modal_product_depart_from_station_id.value = station.id
                        _modal_product_city_id.value = station.city.id
                        
                        _modal_product_depart_from_station_edit_link.dataset.stationId = station.id
                        $(_modal_product_depart_from_station_edit_link).show()
                    } else {
                        globalSelectedStationArriveTo = true
                        _modal_product_arrive_to_station.value = station.name
                        _modal_product_arrive_to_station_id.value = station.id
                        
                        _modal_product_arrive_to_station_edit_link.dataset.stationId = station.id
                        $(_modal_product_arrive_to_station_edit_link).show()
                    }
                } else {
                    confirmDialog(`The station: ${name} does not exist exists. Would you like to create it?`, (ans) => {
                        if (ans) {
                            if (type === "depart_from") {
                                globalSelectedStationDepartFrom = false
                            } else {
                                globalSelectedStationArriveTo = false
                            }
                            
                            populateStationForm({
                                name: name,
                            }, type)
                            
                        } else {
                            if (type === "depart_from") {
                                if (_modal_product_city_id) {
                                    _modal_product_city_id.value = ""
                                }
                                
                                if (_modal_product_depart_from_station_id) {
                                    _modal_product_depart_from_station_id.value = ""
                                }
                                if (_modal_product_depart_from_station) {
                                    _modal_product_depart_from_station.value = ""
                                }
                            } else {
                                if (_modal_product_arrive_to_station_id) {
                                    _modal_product_arrive_to_station_id.value = ""
                                }
                                if (_modal_product_arrive_to_station) {
                                    _modal_product_arrive_to_station.value = ""
                                }
                            }
                            
                        }
                    })
                }
            })
        }
    }
    
    const fetchByName = function (dataToSend, callback) {
        let url = "/api/v1.0/stations/validate"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        handleStationError("Oops: 1")
                    }
                })
            } catch (e) {
                //console.log("error", e)
                handleStationError("Error Validating Station")
            }
        } else {
            handleStationError("Error Loading Station - Missing Data")
        }
    }
    
    const handleStationError = function (msg) {
        toastr.error(msg)
    }
    
    const defaultDetail = function () {
        console.log("Station.defaultDetail()")
        // ----
        
        return {
            city: {
                id: null,
                country_id: null,
                province_id: null,
                name: null,
                sort_order: null,
                enabled: 1,
                date_created: formatDateMySQL(),
                created_by: userId,
                date_modified: formatDateMySQL(),
                modified_by: userId,
                note: null,
            },
            country: {
                id: null,
                name: null,
                sort_order: null,
                iso2: null,
                iso3: null,
                enabled: 1,
                date_created: formatDateMySQL(),
                created_by: userId,
                date_modified: formatDateMySQL(),
                modified_by: userId,
                note: null,
            },
            created_by: userId,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
            display_long: null,
            display_medium: null,
            display_short: null,
            enabled: 1,
            iata_code: null,
            id: null,
            keywords: null,
            modified_by: userId,
            name: null,
            note: null,
            postal_code: null,
            province: {
                id: null,
                name: null,
                sort_order: null,
                country_id: null,
                iso2: null,
                iso3: null,
                enabled: 1,
                date_created: formatDateMySQL(),
                created_by: userId,
                date_modified: formatDateMySQL(),
                modified_by: userId,
                note: null,
            },
            street_1: null,
            street_2: null,
        }
    }
    
    const setDetail = function (station) {
        console.log("Station.setDetail(station)", station)
        // ----
        
        let detail = defaultDetail()
        
        if (station) {
            detail.city = (station.city) ? station.city : {
                id: null,
                country_id: null,
                province_id: null,
                name: null,
                sort_order: null,
                enabled: 1,
                date_created: formatDateMySQL(),
                created_by: userId,
                date_modified: formatDateMySQL(),
                modified_by: userId,
                note: null,
            }
            detail.country = (station.country) ? station.country : {
                id: null,
                name: null,
                sort_order: null,
                iso2: null,
                iso3: null,
                enabled: 1,
                date_created: formatDateMySQL(),
                created_by: userId,
                date_modified: formatDateMySQL(),
                modified_by: userId,
                note: null,
            }
            detail.province = (station.province) ? station.province : {
                id: null,
                name: null,
                sort_order: null,
                country_id: null,
                iso2: null,
                iso3: null,
                enabled: 1,
                date_created: formatDateMySQL(),
                created_by: userId,
                date_modified: formatDateMySQL(),
                modified_by: userId,
                note: null,
            }
            detail.created_by = (station.created_by) ? station.created_by : userId
            detail.date_created = (station.date_created) ? station.date_created : formatDateMySQL()
            detail.date_modified = (station.date_modified) ? station.date_modified : formatDateMySQL()
            detail.display_long = (station.display_long) ? station.display_long : null
            detail.display_medium = (station.display_medium) ? station.display_medium : null
            detail.display_short = (station.display_short) ? station.display_short : null
            detail.enabled = (station.enabled) ? station.enabled : 1
            detail.iata_code = (station.iata_code) ? station.iata_code : null
            detail.id = (station.id && !isNaN(parseInt(station.id))) ? parseInt(station.id) : null
            detail.keywords = (station.keywords) ? station.keywords : []
            detail.modified_by = (station.modified_by) ? station.modified_by : userId
            detail.name = (station.name) ? station.name : null
            detail.note = (station.note) ? station.note : null
            detail.postal_code = (station.postal_code) ? station.postal_code : null
            detail.street_1 = (station.street_1) ? station.street_1 : null
            detail.street_2 = (station.street_2) ? station.street_2 : null
        }
        
        return detail
    }
    
    const loadAll = function (stations) {
        console.log("Station.loadAll(stations)", stations)
        // ----
        
        Station.all = new Map()
        
        $.each(stations, function (k, station) {
            let detail = setDetail(station)
            let stationId = (detail && !isNaN(parseInt(detail.id))) ? parseInt(detail.id) : null
            
            Station.all.set(stationId, detail)
        })
        
    }
    
    const init = function (settings) {
        console.log("Station.init(settings)", settings)
        // ----
        
        if (_modal_product_depart_from_station || _modal_product_arrive_to_station) {
            initAutocomplete()
            resetStationForm("depart_from")
            resetStationForm("arrive_to")
            
            loadAll(settings)
            
            //console.log("|__ Station.all", Station.all)
        }
    }
    
    return {
        resetStationForm: function (type) {
            resetStationForm(type)
        },
        init: function (settings) {
            init(settings)
        },
    }
})
()
