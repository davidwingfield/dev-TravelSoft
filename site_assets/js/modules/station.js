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
    const _modal_product_depart_from_station_postal_code = document.getElementById("modal_product_depart_from_station_postal_code")
    const _modal_product_depart_from_station_street_1 = document.getElementById("modal_product_depart_from_station_street_1")
    const _modal_product_depart_from_station_street_2 = document.getElementById("modal_product_depart_from_station_street_2")
    const _modal_product_depart_from_station_edit_link = document.getElementById("modal_product_depart_from_station_edit_link")
    const _modal_product_depart_from_new_station_id = document.getElementById("modal_product_depart_from_new_station_id")
    const _modal_product_depart_from_station_gps_code = document.getElementById("modal_product_depart_from_station_gps_code")
    const _modal_product_depart_from_station_local_code = document.getElementById("modal_product_depart_from_station_local_code")
    const _modal_product_depart_from_station_home_link = document.getElementById("modal_product_depart_from_station_home_link")
    const _modal_product_depart_from_station_wikipedia_link = document.getElementById("modal_product_depart_from_station_wikipedia_link")
    const _modal_product_depart_from_station_scheduled_service = document.getElementById("modal_product_depart_from_station_scheduled_service")
    const _modal_product_depart_from_station_keywords = document.getElementById("modal_product_depart_from_station_keywords")
    
    const _modal_product_arrive_to_station_add_block = document.getElementById("modal_product_arrive_to_station_add_block")
    const _modal_product_arrive_to_station_cancel_button = document.getElementById("modal_product_arrive_to_station_cancel_button")
    const _modal_product_arrive_to_station_submit_button = document.getElementById("modal_product_arrive_to_station_submit_button")
    const _modal_product_arrive_to_station_edit_link = document.getElementById("modal_product_arrive_to_station_edit_link")
    const _modal_product_arrive_to_station = document.getElementById("modal_product_arrive_to_station")
    const _modal_product_arrive_to_station_city = document.getElementById("modal_product_arrive_to_station_city")
    const _modal_product_arrive_to_station_id = document.getElementById("modal_product_arrive_to_station_id")
    const _modal_product_arrive_to_new_station_id = document.getElementById("modal_product_arrive_to_new_station_id")
    const _modal_product_arrive_to_station_street_1 = document.getElementById("modal_product_arrive_to_station_street_1")
    const _modal_product_arrive_to_station_street_2 = document.getElementById("modal_product_arrive_to_station_street_2")
    const _modal_product_arrive_to_station_postal_code = document.getElementById("modal_product_arrive_to_station_postal_code")
    const _modal_product_arrive_to_station_iata_code = document.getElementById("modal_product_arrive_to_station_iata_code")
    const _modal_product_arrive_to_station_country_id = document.getElementById("modal_product_arrive_to_station_country_id")
    const _modal_product_arrive_to_station_province_id = document.getElementById("modal_product_arrive_to_station_province_id")
    const _modal_product_arrive_to_station_city_id = document.getElementById("modal_product_arrive_to_station_city_id")
    const _modal_product_arrive_to_station_gps_code = document.getElementById("modal_product_arrive_to_station_gps_code")
    const _modal_product_arrive_to_station_local_code = document.getElementById("modal_product_arrive_to_station_local_code")
    const _modal_product_arrive_to_station_home_link = document.getElementById("modal_product_arrive_to_station_home_link")
    const _modal_product_arrive_to_station_wikipedia_link = document.getElementById("modal_product_arrive_to_station_wikipedia_link")
    const _modal_product_arrive_to_station_scheduled_service = document.getElementById("modal_product_arrive_to_station_scheduled_service")
    const _modal_product_arrive_to_station_keywords = document.getElementById("modal_product_arrive_to_station_keywords")
    
    const _modal_product_day_span = document.getElementById("modal_product_day_span")
    const _modal_product_station_day_span = document.getElementById("modal_product_station_day_span")
    const _modal_product_country_id = document.getElementById("modal_product_country_id")
    const _modal_product_province_id = document.getElementById("modal_product_province_id")
    const _modal_product_city_id = document.getElementById("modal_product_city_id")
    
    let userId = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let globalSelectedStationDepartFrom = false
    let globalSelectedStationArriveTo = false
    
    $(_modal_product_station_day_span)
        .on("change", function (e) {
            //console.log("Station.modal_product_station_day_span:change()")
            // ----
            
            let daySpan
            
            if (_modal_product_day_span) {
                daySpan = ((!isNaN(parseInt(_modal_product_station_day_span.value))) && parseInt(_modal_product_station_day_span.value) > 0) ? parseInt(_modal_product_station_day_span.value) : 1
                
                //console.log("|__ daySpan", daySpan)
                
                _modal_product_day_span.value = daySpan
                
            }
        })
    
    $(_modal_product_depart_from_station_edit_link)
        .on("click", function () {
            //console.log("Station.modal_product_depart_from_station_edit_link:click()")
            // ----
            
            let type = "depart_from"
            
            if ($("#modal_product_depart_from_station_add_block").is(":visible")) {
                
                clearStationForm(type)
                
            } else {
                
                edit(this, type)
                _modal_product_depart_from_station_edit_link.innerText = "Clear"
                
            }
            
        })
    
    $(_modal_product_arrive_to_station_edit_link)
        .on("click", function () {
            //console.log("Station.modal_product_arrive_to_station_edit_link:click()")
            // ----
            
            let type = "arrive_to"
            
            if ($("#modal_product_arrive_to_station_add_block").is(":visible")) {
                
                clearStationForm(type)
                
            } else {
                
                edit(this, type)
                _modal_product_arrive_to_station_edit_link.innerText = "Clear"
                
            }
            
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
            _modal_product_depart_from_station_edit_link.innerText = "Edit"
        })
    
    $(_modal_product_arrive_to_station_cancel_button)
        .on("click", function () {
            cancelAddStationRecord("arrive_to")
            _modal_product_arrive_to_station_edit_link.innerText = "Edit"
        })
    
    $(_modal_product_depart_from_station_submit_button)
        .on("click", function () {
            save("depart_from")
        })
    
    $(_modal_product_arrive_to_station_submit_button)
        .on("click", function () {
            save("arrive_to")
        })
    
    // ----
    
    const edit = function (el, type) {
        //console.log("Station.edit()")
        // ----
        
        let stationId = (el.dataset.stationId && !isNaN(parseInt(el.dataset.stationId))) ? parseInt(el.dataset.stationId) : null
        let station = Station.all.get(stationId)
        
        //*
        //console.log("|__ stationId", stationId)
        //console.log("|__ station", station)
        //*/
        
        //*
        if (station) {
            
            clearStationForm(type)
            populateStationForm(station, type)
            showStationForm(type)
            
        }
        //*/
        
    }
    
    const clearDepartFromFields = function () {
        //console.log("Station.clearDepartFromFields()")
        // ----
        
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
        
        if (_modal_product_country_id) {
            _modal_product_country_id.value = ""
        }
        
        if (_modal_product_province_id) {
            _modal_product_province_id.value = ""
        }
        
        if (_modal_product_city_id) {
            _modal_product_city_id.value = ""
        }
        
        if (_modal_product_depart_from_station_edit_link) {
            _modal_product_depart_from_station_edit_link.dataset.stationId = ""
        }
        
        if (_modal_product_depart_from_station) {
            
            hideStationForm("depart_from")
            toggleEditFormLink("depart_from")
            
            $(_modal_product_depart_from_station).trigger("change")
        }
        
    }
    
    const clearArriveToFields = function () {
        //console.log("Station.clearArriveToFields()")
        // ----
        
        Station.arriveToKeywords.clear()
        
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
        
        if (_modal_product_country_id) {
            _modal_product_country_id.value = ""
        }
        
        if (_modal_product_province_id) {
            _modal_product_province_id.value = ""
        }
        
        if (_modal_product_city_id) {
            _modal_product_city_id.value = ""
        }
        
        if (_modal_product_depart_from_station_edit_link) {
            _modal_product_depart_from_station_edit_link.dataset.stationId = ""
        }
        
        if (_modal_product_depart_from_station) {
            
            hideStationForm("depart_from")
            toggleEditFormLink("depart_from")
            
            $(_modal_product_depart_from_station).trigger("change")
        }
        
    }
    
    const initAutocomplete = function () {
        //console.log("Station.initAutocomplete()")
        // ----
        
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
                    /*
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
                    
                    if (_modal_product_country_id) {
                        _modal_product_country_id.value = ""
                    }
                    
                    if (_modal_product_province_id) {
                        _modal_product_province_id.value = ""
                    }
                    
                    if (_modal_product_city_id) {
                        _modal_product_city_id.value = ""
                    }
                    
                    if (_modal_product_depart_from_station_edit_link) {
                        _modal_product_depart_from_station_edit_link.dataset.stationId = ""
                    }
                    
                    hideStationForm("depart_from")
                    toggleEditFormLink("depart_from")
                    //*/
                    
                    clearDepartFromFields()
                    
                    //$(_modal_product_depart_from_station).val("").trigger("change")
                    
                })
                .on("keyup", function () {
                    globalSelectedStationDepartFrom = false
                })
                .on("change", function () {
                    setTimeout(function () {
                        let station_name = _modal_product_depart_from_station.value
                        
                        if (globalSelectedStationDepartFrom === false) {
                            
                            if (station_name === "") {
                                
                                globalSelectedStationDepartFrom = false
                                
                                _modal_product_depart_from_station.value = ""
                                _modal_product_depart_from_station_id.value = ""
                                _modal_product_depart_from_station_province_id.value = ""
                                _modal_product_depart_from_station_city_id.value = ""
                                _modal_product_depart_from_station_edit_link.dataset.stationId = ""
                                
                                hideStationForm("depart_from")
                                toggleEditFormLink("depart_from")
                                
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
                        
                        if (station) {
                            
                            populateStationForm(station, "depart_from")
                            toggleEditFormLink("depart_from")
                            
                        } else {
                            
                            resetStationForm("depart_from")
                            showStationForm("depart_from")
                            toggleEditFormLink("depart_from")
                            
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
                            toggleEditFormLink("arrive_to")
                        } else {
                            _modal_product_arrive_to_station_edit_link.dataset.stationId = ""
                            $(_modal_product_arrive_to_station_edit_link).hide()
                            resetStationForm("arrive_to")
                            showStationForm("arrive_to")
                            toggleEditFormLink("arrive_to")
                        }
                    },
                })
        }
        
    }
    
    const save = function (type) {
        //console.log("Station.save()")
        // ----
        
        if (type) {
            let dataToSend = buildAddStationRecord(type)
            
            if (!dataToSend) {
                return
            }
            
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
                            //console.log("|__ station", station)
                            
                            let stationId = (!isNaN(parseInt(station.id))) ? parseInt(station.id) : null
                            
                            if (stationId !== null) {
                                //console.log("|__ stationId", stationId)
                                
                                Station.all.set(stationId, station)
                                
                                if (type) {
                                    resetStationForm(type)
                                    populateStationForm(station, type)
                                    
                                    toggleEditFormLink(type)
                                }
                                
                                initAutocomplete()
                            }
                            
                            /*
                            if (type === "depart_from") {
                                //console.log("|__ stationId", stationId)
                                
                                populateStationForm(station, type)
                                
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
                            //*/
                            
                        }
                        
                    })
                }
            })
            
        }
        
    }
    
    const sendSaveRequest = function (dataToSend, callback) {
        //console.log("Station.sendSaveRequest()")
        // ----
        
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
        //console.log("Station.validDepartFromRecord()")
        // ----
        
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
        //console.log("Station.validArriveToRecord()")
        // ----
        
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
        //console.log("Station.buildAddStationRecord()")
        // ----
        
        if (_modal_product_depart_from_station_add_block && _modal_product_arrive_to_station_add_block) {
            
            if (type) {
                //console.log("|__ type", type)
                
                if (type === "depart_from") {
                    if (validDepartFromRecord()) {
                        let dataToSend = {
                            id: (_modal_product_depart_from_new_station_id && !isNaN(parseInt(_modal_product_depart_from_new_station_id.value))) ? parseInt(_modal_product_depart_from_new_station_id.value) : null,
                            postal_code: (_modal_product_depart_from_station_postal_code.value !== "") ? _modal_product_depart_from_station_postal_code.value : null,
                            street_1: (_modal_product_depart_from_station_street_1.value !== "") ? _modal_product_depart_from_station_street_1.value : null,
                            street_2: (_modal_product_depart_from_station_street_2.value !== "") ? _modal_product_depart_from_station_street_2.value : null,
                            city_id: (!isNaN(parseInt(_modal_product_depart_from_station_city_id.value))) ? parseInt(_modal_product_depart_from_station_city_id.value) : null,
                            name: (_modal_product_depart_from_station.value !== "") ? _modal_product_depart_from_station.value : null,
                            iata_code: (_modal_product_depart_from_station_iata_code.value !== "") ? _modal_product_depart_from_station_iata_code.value : null,
                            //home_link: (_modal_product_depart_from_station_home_link.value !== "") ? _modal_product_depart_from_station_home_link.value : null,
                            //wikipedia_link: (_modal_product_depart_from_station_wikipedia_link.value !== "") ? _modal_product_depart_from_station_wikipedia_link.value : null,
                            //gps_code: (_modal_product_depart_from_station_gps_code.value !== "") ? _modal_product_depart_from_station_gps_code.value : null,
                            //local_code: (_modal_product_depart_from_station_local_code.value !== "") ? _modal_product_depart_from_station_local_code.value : null,
                            //scheduled_service: (_modal_product_depart_from_station_scheduled_service && !isNaN(parseInt(_modal_product_depart_from_station_scheduled_service.value))) ? parseInt(_modal_product_depart_from_station_scheduled_service.value) : null,
                            //keywords: (_modal_product_depart_from_station_keywords.value !== "") ? _modal_product_depart_from_station_keywords.value : null,
                            //enabled: (_modal_product_depart_from_station_enabled.value !== "") ? _modal_product_depart_from_station_enabled.value : null,
                        }
                        
                        return removeNulls(dataToSend)
                    }
                } else if (type === "arrive_to") {
                    if (validArriveToRecord()) {
                        let dataToSend = {
                            id: (_modal_product_arrive_to_new_station_id && !isNaN(parseInt(_modal_product_arrive_to_new_station_id.value))) ? parseInt(_modal_product_arrive_to_new_station_id.value) : null,
                            postal_code: (_modal_product_arrive_to_station_postal_code.value !== "") ? _modal_product_arrive_to_station_postal_code.value : null,
                            street_1: (_modal_product_arrive_to_station_street_1.value !== "") ? _modal_product_arrive_to_station_street_1.value : null,
                            street_2: (_modal_product_arrive_to_station_street_2.value !== "") ? _modal_product_arrive_to_station_street_2.value : null,
                            city_id: (!isNaN(parseInt(_modal_product_arrive_to_station_city_id.value))) ? parseInt(_modal_product_arrive_to_station_city_id.value) : null,
                            name: (_modal_product_arrive_to_station.value !== "") ? _modal_product_arrive_to_station.value : null,
                            iata_code: (_modal_product_arrive_to_station_iata_code.value !== "") ? _modal_product_arrive_to_station_iata_code.value : null,
                            //home_link: (_modal_product_arrive_to_station_home_link.value !== "") ? _modal_product_depart_from_station_home_link.value : null,
                            //wikipedia_link: (_modal_product_arrive_to_station_wikipedia_link.value !== "") ? _modal_product_depart_from_station_wikipedia_link.value : null,
                            //gps_code: (_modal_product_arrive_to_station_gps_code.value !== "") ? _modal_product_depart_from_station_gps_code.value : null,
                            //local_code: (_modal_product_arrive_to_station_local_code.value !== "") ? _modal_product_depart_from_station_local_code.value : null,
                            //scheduled_service: (_modal_product_arrive_to_station_scheduled_service && !isNaN(parseInt(_modal_product_depart_from_station_scheduled_service.value))) ? parseInt(_modal_product_depart_from_station_scheduled_service.value) : null,
                            //keywords: (_modal_product_arrive_to_station_keywords.value !== "") ? _modal_product_depart_from_station_keywords.value : null,
                            //enabled: (_modal_product_arrive_to_station_enabled.value !== "") ? _modal_product_depart_from_station_enabled.value : null,
                        }
                        
                        return removeNulls(dataToSend)
                    }
                }
            }
        }
    }
    
    const cancelAddStationRecord = function (type) {
        //console.log("Station.cancelAddStationRecord()")
        // ----
        
        if (!type) {
            return
        }
        
        hideStationForm(type)
        
    }
    
    const clearStationForm = function (type) {
        //console.log("Station.clearStationForm()")
        // ----
        
        if (!type) {
            return
        }
        
        if (type === "depart_from") {
            if (!_modal_product_depart_from_station_add_block) {return}
            
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
            
            _modal_product_depart_from_station.value = ""
            _modal_product_depart_from_station.disabled = false
            
            _modal_product_depart_from_station_edit_link.dataset.stationId = ""
            
            clearAllValidation()
            
        } else if (type === "arrive_to") {
            if (!_modal_product_arrive_to_station_add_block) {return}
            
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
            
            _modal_product_arrive_to_station.value = ""
            _modal_product_arrive_to_station.disabled = false
            
            _modal_product_arrive_to_station_edit_link.dataset.stationId = ""
            
            clearAllValidation()
        } else {
            return
        }
        
        _modal_product_country_id.value = ""
        _modal_product_province_id.value = ""
        _modal_product_city_id.value = ""
        $(_modal_product_station_day_span).val("1").trigger("change")
        
    }
    
    const resetStationForm = function (type) {
        //console.log("Station.resetStationForm()")
        // ----
        
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
        //console.log("Station.hideStationForm()")
        // ----
        
        if (!type || !_modal_product_depart_from_station_add_block || !_modal_product_arrive_to_station_add_block) {
            return
        }
        
        if (type === "depart_from") {
            $(_modal_product_depart_from_station_add_block).hide()
            
            _modal_product_depart_from_station.disabled = false
            
            toggleEditFormLink(type)
        } else if (type === "arrive_to") {
            $(_modal_product_arrive_to_station_add_block).hide()
            
            _modal_product_arrive_to_station.disabled = false
            
            toggleEditFormLink(type)
        } else {
            //console.log("|__ type", type)
        }
        
        _modal_product_depart_from_station.disabled = false
        _modal_product_arrive_to_station.disabled = false
    }
    
    const showStationForm = function (type) {
        //console.log("Station.showStationForm()")
        // ----
        
        if (!type || !_modal_product_depart_from_station_add_block || !_modal_product_arrive_to_station_add_block) {
            
            //console.log("|__ _modal_product_depart_from_station_add_block", _modal_product_depart_from_station_add_block)
            //console.log("|__ _modal_product_arrive_to_station_add_block", _modal_product_arrive_to_station_add_block)
            //console.log("|__ type", type)
            
            return
        }
        
        _modal_product_depart_from_station.disabled = false
        _modal_product_arrive_to_station.disabled = false
        
        if (type === "depart_from") {
            _modal_product_depart_from_station.disabled = true
            
            $(_modal_product_depart_from_station_add_block).show()
            $(_modal_product_arrive_to_station_add_block).hide()
            
            toggleEditFormLink(type)
            
        } else if (type === "arrive_to") {
            _modal_product_arrive_to_station.disabled = true
            
            $(_modal_product_arrive_to_station_add_block).show()
            $(_modal_product_depart_from_station_add_block).hide()
            
            toggleEditFormLink(type)
        } else {
            //console.log("|__ type", type)
        }
        
    }
    
    const stationExists = function (name, type) {
        //console.log("Station.stationExists()")
        // ----
        
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
                        
                    } else if (type === "arrive_to") {
                        globalSelectedStationArriveTo = true
                        
                        _modal_product_arrive_to_station.value = station.name
                        _modal_product_arrive_to_station_id.value = station.id
                        
                        _modal_product_arrive_to_station_edit_link.dataset.stationId = station.id
                    } else {
                        return
                    }
                    
                    populateStationForm(station, type)
                    hideStationForm(type)
                    toggleEditFormLink(type)
                } else {
                    // Station Does Not Exist
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
                            
                            showStationForm(type)
                            
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
        //console.log("Station.fetchByName()")
        // ----
        
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
        //console.log("Station.handleStationError()")
        // ----
        
        toastr.error(msg)
    }
    
    const defaultDetail = function () {
        //console.log("Station.defaultDetail()")
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
        //console.log("Station.setDetail()")
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
        //console.log("Station.loadAll()")
        // ----
        
        Station.all = new Map()
        
        $.each(stations, function (k, station) {
            let detail = setDetail(station)
            let stationId = (detail && !isNaN(parseInt(detail.id))) ? parseInt(detail.id) : null
            
            Station.all.set(stationId, detail)
        })
        
    }
    
    const populateStationForm = function (station, type) {
        //console.log("Station.populateStationForm()")
        // ----
        
        if (!type || !_modal_product_depart_from_station_add_block || !_modal_product_arrive_to_station_add_block) {
            return
        }
        
        clearStationForm(type)
        
        if (station) {
            let countryId = (station.country && station.country.id && !isNaN(parseInt(station.country.id))) ? parseInt(station.country.id) : null
            let provinceId = (station.province && station.province.id && !isNaN(parseInt(station.province.id))) ? parseInt(station.province.id) : null
            let cityId = (station.city && station.city.id && !isNaN(parseInt(station.city.id))) ? parseInt(station.city.id) : null
            let stationId = (station.id && !isNaN(parseInt(station.id))) ? parseInt(station.id) : null
            let stationName = (station.name) ? station.name : null
            let stationIATACode = (station.iata_code) ? station.iata_code : null
            let stationStreet1 = (station.street_1) ? station.street_1 : null
            let stationStreet2 = (station.street_2) ? station.street_2 : null
            let stationPostalCode = (station.postal_code) ? station.postal_code : null
            let displayShort, displayMedium, displayLong = ""
            let displayCity, displayShortCity, displayMediumCity, displayLongCity,
                displayShortProvince, displayMediumProvince, displayLongProvince,
                displayShortCountry, displayMediumCountry, displayLongCountry = null
            let defaultDisplay = (defaultLocationDisplayFormat) ? defaultLocationDisplayFormat.toLowerCase() : "short"
            
            if (station.city && station.province && station.country) {
                if (station.city) {
                    displayShortCity = null
                    displayMediumCity = null
                    displayLongCity = null
                    
                    if (station.city.name) {
                        displayShortCity = station.city.name
                        displayMediumCity = station.city.name
                        displayLongCity = station.city.name
                    }
                }
                
                if (station.province) {
                    displayShortProvince = null
                    displayMediumProvince = null
                    displayLongProvince = null
                    
                    if (station.province.iso3) {
                        displayShortProvince = (station.province.iso2) ? station.province.iso2 : null
                        displayMediumProvince = (station.province.iso2) ? station.province.iso2 : null
                        displayLongProvince = (station.province.iso2) ? station.province.iso2 : null
                    }
                    
                    if (station.province.iso2) {
                        displayShortProvince = (station.province.iso2) ? station.province.iso2 : null
                        displayMediumProvince = (station.province.iso2) ? station.province.iso2 : null
                        displayLongProvince = (station.province.iso2) ? station.province.iso2 : null
                    }
                    
                    if (station.province.name) {
                        
                        if (displayShortProvince === null) {
                            displayShortProvince = station.province.name
                        }
                        
                        if (displayLongProvince === null) {
                            displayLongProvince = station.province.name
                        } else {
                            displayLongProvince = displayLongProvince + " - " + station.province.name
                        }
                        
                        displayMediumProvince = station.province.name
                    }
                    
                }
                
                if (station.country) {
                    displayShortCountry = null
                    displayMediumCountry = null
                    displayLongCountry = null
                    
                    if (station.country.iso2) {
                        displayShortCountry = station.country.iso2
                        //displayMediumCountry = station.country.iso2
                        displayLongCountry = station.country.iso2
                    }
                    
                    if (station.country.iso3) {
                        displayShortCountry = station.country.iso3
                        displayMediumCountry = station.country.iso3
                        displayLongCountry = station.country.iso3
                    }
                    
                    if (station.country.name) {
                        
                        if (displayShortCountry === null) {
                            displayShortCountry = station.country.name
                        }
                        
                        if (displayLongCountry === null) {
                            displayLongCountry = station.country.name
                        } else {
                            displayLongCountry = displayLongCountry + " - " + station.country.name
                        }
                        
                        displayMediumCountry = station.country.name
                    }
                    
                }
                
                /*
                //console.log("|__ displayShortCity", displayShortCity)
                //console.log("|__ displayShortProvince", displayShortProvince)
                //console.log("|__ displayShortCountry", displayShortCountry)
                
                //console.log("|__ displayMediumCity", displayMediumCity)
                //console.log("|__ displayMediumProvince", displayMediumProvince)
                //console.log("|__ displayMediumCountry", displayMediumCountry)
                
                //console.log("|__ displayLongCity", displayLongCity)
                //console.log("|__ displayLongProvince", displayLongProvince)
                //console.log("|__ displayLongCountry", displayLongCountry)
                //*/
                
                displayShort = displayShortCity + "( " + displayShortProvince + ", " + displayShortCountry + " )"
                displayMedium = displayMediumCity + "( " + displayMediumProvince + ", " + displayMediumCountry + " )"
                displayLong = displayLongCity + "( " + displayLongProvince + ", " + displayLongCountry + " )"
                
            }
            
            if (!displayShort) {
                displayShort = ""
            }
            
            if (!displayMedium) {
                displayMedium = ""
            }
            
            if (!displayLong) {
                displayLong = ""
            }
            
            switch (defaultDisplay) {
                case "short":
                    displayCity = displayShort
                    break
                case "medium":
                    displayCity = displayMedium
                    break
                case "long":
                    displayCity = displayLong
                    break
                default:
                    displayCity = ""
            }
            
            /*
            //console.log("|__ defaultLocationDisplayFormat", defaultLocationDisplayFormat)
            //console.log("|__ displayCity", displayCity)
            //console.log("|__ displayShort", displayShort)
            //console.log("|__ displayMedium", displayMedium)
            //console.log("|__ displayLong", displayLong)
            //*/
            
            if (type === "depart_from") {
                _modal_product_depart_from_station.value = stationName
                _modal_product_depart_from_station_iata_code.value = stationIATACode
                _modal_product_depart_from_station_city.value = ""
                _modal_product_depart_from_station_postal_code.value = stationPostalCode
                _modal_product_depart_from_station_street_1.value = stationStreet1
                _modal_product_depart_from_station_street_2.value = stationStreet2
                
                if (countryId !== null) {
                    _modal_product_depart_from_station_country_id.value = countryId.toString()
                    _modal_product_country_id.value = countryId.toString()
                }
                
                if (provinceId !== null) {
                    _modal_product_depart_from_station_province_id.value = provinceId.toString()
                    _modal_product_province_id.value = provinceId.toString()
                }
                
                if (cityId !== null) {
                    _modal_product_depart_from_station_city_id.value = cityId.toString()
                    _modal_product_city_id.value = cityId.toString()
                }
                
                if (stationId !== null) {
                    _modal_product_depart_from_station_id.value = stationId.toString()
                    _modal_product_depart_from_new_station_id.value = stationId.toString()
                    _modal_product_depart_from_station_edit_link.dataset.stationId = stationId.toString()
                }
                
                _modal_product_depart_from_station_city.value = displayCity
                
            } else if (type === "arrive_to") {
                
                _modal_product_arrive_to_station.value = stationName
                _modal_product_arrive_to_station_iata_code.value = stationIATACode
                _modal_product_arrive_to_station_city.value = ""
                _modal_product_arrive_to_station_postal_code.value = stationPostalCode
                _modal_product_arrive_to_station_street_1.value = stationStreet1
                _modal_product_arrive_to_station_street_2.value = stationStreet2
                
                if (countryId !== null) {
                    _modal_product_arrive_to_station_country_id.value = countryId.toString()
                }
                
                if (provinceId !== null) {
                    _modal_product_arrive_to_station_province_id.value = provinceId.toString()
                }
                
                if (cityId !== null) {
                    _modal_product_arrive_to_station_city_id.value = cityId.toString()
                }
                
                if (stationId !== null) {
                    _modal_product_arrive_to_station_id.value = stationId.toString()
                    _modal_product_arrive_to_new_station_id.value = stationId.toString()
                    _modal_product_arrive_to_station_edit_link.dataset.stationId = stationId.toString()
                }
                
                _modal_product_arrive_to_station_city.value = displayCity
                
            } else {
                return
            }
            
            showStationForm(type)
            
        }
        
    }
    
    const toggleEditFormLink = function (type) {
        //console.log("Station.toggleEditFormLink()")
        // ----
        
        if (type) {
            //console.log("|__ type", type)
            
            if (type === "depart_from") {
                
                if (_modal_product_depart_from_station_edit_link) {
                    
                    if (_modal_product_depart_from_new_station_id && _modal_product_depart_from_station && _modal_product_depart_from_station_city_id
                        && _modal_product_depart_from_new_station_id.value !== "" && _modal_product_depart_from_station.value !== ""
                        && _modal_product_depart_from_station_city_id.value !== "") {
                        
                        $(_modal_product_depart_from_station_edit_link).show()
                        
                    } else {
                        
                        $(_modal_product_depart_from_station_edit_link).hide()
                        
                    }
                    
                }
                
            } else if (type === "arrive_to") {
                if (_modal_product_arrive_to_station_edit_link) {
                    
                    if (_modal_product_arrive_to_new_station_id && _modal_product_arrive_to_station && _modal_product_arrive_to_station_city_id
                        && _modal_product_arrive_to_new_station_id.value !== "" && _modal_product_arrive_to_station.value !== ""
                        && _modal_product_arrive_to_station_city_id.value !== "") {
                        
                        $(_modal_product_arrive_to_station_edit_link).show()
                        
                    } else {
                        
                        $(_modal_product_arrive_to_station_edit_link).hide()
                        
                    }
                    
                }
            }
        }
    }
    
    const init = function (settings) {
        //console.log("Station.init()")
        // ----
        
        let stations = []
        
        if (settings) {
            if (settings.stations) {
                stations = settings.stations
            }
        }
        
        if (_modal_product_depart_from_station || _modal_product_arrive_to_station) {
            
            resetStationForm("depart_from")
            resetStationForm("arrive_to")
            
            hideStationForm("depart_from")
            hideStationForm("arrive_to")
            
            loadAll(settings)
            initAutocomplete()
        }
        
    }
    
    return {
        departFromKeywords: null,
        arriveToKeywords: null,
        resetStationForm: function (type) {
            resetStationForm(type)
        },
        init: function (settings) {
            init(settings)
        },
    }
    
})()
