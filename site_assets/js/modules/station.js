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
    const _modal_product_depart_from_station_add_block_close_button = document.getElementById("modal_product_depart_from_station_add_block_close_button")
    const _modal_product_arrive_to_station_add_block_close_button = document.getElementById("modal_product_arrive_to_station_add_block_close_button")
    const _modal_product_day_span = document.getElementById("modal_product_day_span")
    const _modal_product_station_day_span = document.getElementById("modal_product_station_day_span")
    const _modal_product_country_id = document.getElementById("modal_product_country_id")
    const _modal_product_province_id = document.getElementById("modal_product_province_id")
    const _modal_product_city_id = document.getElementById("modal_product_city_id")
    
    let userId = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let globalSelectedStationDepartFrom = false
    let globalSelectedStationArriveTo = false
    let editText = "Edit"
    let cancelText = "Cancel"
    
    $(_modal_product_depart_from_station_add_block_close_button)
        .on("click", function () {
            //console.log("Station.modal_product_depart_from_station_add_block_close_button:click()")
            // ----
            
            cancelAddStationRecord("depart_from")
            hideStationForm("arrive_to")
            hideStationForm("depart_from")
            
            _modal_product_depart_from_station_edit_link.innerText = editText
            _modal_product_arrive_to_station_edit_link.innerText = editText
            
            _modal_product_arrive_to_station.disabled = false
            _modal_product_depart_from_station.disabled = false
            
        })
    
    $(_modal_product_arrive_to_station_add_block_close_button)
        .on("click", function () {
            //console.log("Station.modal_product_arrive_to_station_add_block_close_button:click()")
            // ----
            
            cancelAddStationRecord("arrive_to")
            hideStationForm("arrive_to")
            hideStationForm("depart_from")
            
            _modal_product_depart_from_station_edit_link.innerText = editText
            _modal_product_arrive_to_station_edit_link.innerText = editText
            
            _modal_product_arrive_to_station.disabled = false
            _modal_product_depart_from_station.disabled = false
            
        })
    
    $(_modal_product_station_day_span)
        .on("change", function (e) {
            //console.log("Station.modal_product_station_day_span:change()")
            // ----
            
            let daySpan = $(this).val()
            
            if (daySpan === "" || isNaN(parseInt(daySpan))) {
                daySpan = 1
            } else if (daySpan < 1) {
                daySpan = 1
            }
            _modal_product_station_day_span.value = daySpan
            _modal_product_day_span.value = daySpan
        })
    
    $(_modal_product_depart_from_station_edit_link)
        .on("click", function () {
            //console.log("Station.modal_product_depart_from_station_edit_link:click()")
            // ----
            
            let toggleData = _modal_product_depart_from_station_edit_link.innerText
            
            if (toggleData === editText) {
                
                showStationForm("depart_from")
                hideStationForm("arrive_to")
                
                _modal_product_depart_from_station_edit_link.innerText = cancelText
                _modal_product_arrive_to_station_edit_link.innerText = editText
                
                _modal_product_depart_from_station.disabled = true
                _modal_product_arrive_to_station.disabled = false
                
            } else {
                
                cancelAddStationRecord("depart_from")
                hideStationForm("arrive_to")
                hideStationForm("depart_from")
                
                _modal_product_depart_from_station_edit_link.innerText = editText
                _modal_product_arrive_to_station_edit_link.innerText = editText
                
                _modal_product_arrive_to_station.disabled = false
                _modal_product_depart_from_station.disabled = false
                
            }
            
        })
    
    $(_modal_product_arrive_to_station_edit_link)
        .on("click", function () {
            //console.log("Station.modal_product_arrive_to_station_edit_link:click()")
            // ----
            
            let toggleData = _modal_product_arrive_to_station_edit_link.innerText
            
            if (toggleData === editText) {
                
                showStationForm("arrive_to")
                hideStationForm("depart_from")
                
                _modal_product_depart_from_station_edit_link.innerText = editText
                _modal_product_arrive_to_station_edit_link.innerText = cancelText
                
                _modal_product_arrive_to_station.disabled = true
                _modal_product_depart_from_station.disabled = false
                
            } else {
                cancelAddStationRecord("arrive_to")
                hideStationForm("arrive_to")
                hideStationForm("depart_from")
                
                _modal_product_depart_from_station_edit_link.innerText = editText
                _modal_product_arrive_to_station_edit_link.innerText = editText
                
                _modal_product_arrive_to_station.disabled = false
                _modal_product_depart_from_station.disabled = false
                
            }
            
        })
    
    $(_modal_product_depart_from_station_add_block)
        .on("change", function () {
            //console.log("Station.modal_product_depart_from_station_add_block:change()")
            // ----
            
            validDepartFromRecord()
        })
        .on("keyup", function () {
            //console.log("Station.modal_product_depart_from_station_add_block:keyup()")
            // ----
            
            validDepartFromRecord()
        })
    
    $(_modal_product_depart_from_station_cancel_button)
        .on("click", function () {
            //console.log("Station.modal_product_depart_from_station_cancel_button:click()")
            // ----
            
            cancelAddStationRecord("depart_from")
            _modal_product_depart_from_station_edit_link.innerText = "Edit"
        })
    
    $(_modal_product_arrive_to_station_cancel_button)
        .on("click", function () {
            //console.log("Station.modal_product_arrive_to_station_cancel_button:click()")
            // ----
            
            cancelAddStationRecord("arrive_to")
            _modal_product_arrive_to_station_edit_link.innerText = "Edit"
        })
    
    $(_modal_product_depart_from_station_submit_button)
        .on("click", function () {
            //console.log("Station.modal_product_depart_from_station_submit_button:click()")
            // ----
            
            save("depart_from")
        })
    
    $(_modal_product_arrive_to_station_submit_button)
        .on("click", function () {
            //console.log("Station.modal_product_arrive_to_station_submit_button:click()")
            // ----
            
            save("arrive_to")
        })
    
    const clearDepartFromFields = function () {
        console.groupCollapsed("Station.clearDepartFromFields")
        // ----
        
        if (_modal_product_depart_from_station_add_block) {
            
            if (Station.departFromKeywords) {
                Station.departFromKeywords.clear()
            }
            
            _modal_product_depart_from_station_gps_code.value = ""
            _modal_product_depart_from_station_local_code.value = ""
            _modal_product_depart_from_station_home_link.value = ""
            _modal_product_depart_from_station_wikipedia_link.value = ""
            _modal_product_depart_from_station_id.value = ""
            _modal_product_depart_from_station_country_id.value = ""
            _modal_product_depart_from_station_province_id.value = ""
            _modal_product_depart_from_station_city_id.value = ""
            _modal_product_depart_from_station.value = ""
            _modal_product_country_id.value = ""
            _modal_product_province_id.value = ""
            _modal_product_city_id.value = ""
            _modal_product_depart_from_station_edit_link.dataset.stationId = ""
            
            hideStationForm("depart_from")
            toggleEditFormLink("depart_from")
            $(_modal_product_depart_from_station).trigger("change")
        }
        
        // ----
        console.groupEnd()
    }
    const clearArriveToFields = function () {
        console.groupCollapsed("Station.clearArriveToFields")
        // ----
        
        let type = "arrive_to"
        
        if (Station.arriveToKeywords) {
            Station.arriveToKeywords.clear()
        }
        
        _modal_product_arrive_to_station_gps_code.value = ""
        _modal_product_arrive_to_station_local_code.value = ""
        _modal_product_arrive_to_station_home_link.value = ""
        _modal_product_arrive_to_station_wikipedia_link.value = ""
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
        
        clearAllValidation()
        hideStationForm(type)
        toggleEditFormLink(type)
        $(_modal_product_arrive_to_station).trigger("change")
        
        // ----
        console.groupEnd()
    }
    const save = function (type) {
        console.groupCollapsed("Station.save")
        // ----
        
        if (type) {
            let dataToSend = buildAddStationRecord(type)
            
            if (!dataToSend) {
                return
            }
            
            confirmDialog(`Would you like to update?`, (ans) => {
                
                if (ans) {
                    
                    console.log("dataToSend", dataToSend)
                    
                    sendSaveRequest(dataToSend, function (data) {
                        console.log("data", data)
                        let station
                        if (data) {
                            station = data
                            if (data[0]) {
                                station = data[0]
                            }
                        }
                        
                        if (station) {
                            //console.log("station", station)
                            
                            let stationId = (!isNaN(parseInt(station.id))) ? parseInt(station.id) : null
                            
                            if (stationId !== null) {
                                Station.all.set(stationId, station)
                                
                                if (type) {
                                    if (type === "depart_from") {
                                        Station.departingStation = station
                                    } else {
                                        Station.arrivingStation = station
                                    }
                                    cancelAddStationRecord(type)
                                    hideStationForm(type)
                                    initAutocomplete()
                                    handleStationError(`Station ${stationId} has been updated.`, "Station", "success")
                                    
                                    _modal_product_depart_from_station_edit_link.innerText = editText
                                    _modal_product_arrive_to_station_edit_link.innerText = editText
                                    _modal_product_arrive_to_station.disabled = false
                                    _modal_product_depart_from_station.disabled = false
                                    
                                } else {
                                    handleStationError(`Station ${stationId} missing type.`, "Station", "warning")
                                }
                                
                            } else {
                                
                                handleStationError("Missing Fields", "Station", "error")
                                
                            }
                            
                            /*
                            if (type === "depart_from") {
                                //console.log("stationId", stationId)
                                
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
        
        // ----
        console.groupEnd()
    }
    const sendSaveRequest = function (dataToSend, callback) {
        console.groupCollapsed("Station.sendSaveRequest")
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
        
        // ----
        console.groupEnd()
    }
    const validDepartFromRecord = function () {
        console.groupCollapsed("Station.validDepartFromRecord")
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
        
        // ----
        console.groupEnd()
        return isValid
    }
    const validArriveToRecord = function () {
        console.groupCollapsed("Station.validArriveToRecord")
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
        
        // ----
        console.groupEnd()
        return isValid
    }
    const buildAddStationRecord = function (type) {
        console.groupCollapsed("Station.buildAddStationRecord")
        // ----
        
        let detail
        
        if (_modal_product_depart_from_station_add_block && _modal_product_arrive_to_station_add_block) {
            
            if (type) {
                //console.log("type", type)
                
                if (type === "depart_from") {
                    
                    if (validDepartFromRecord()) {
                        let dataToSend = {
                            gps_code: (_modal_product_depart_from_station_gps_code.value !== "") ? _modal_product_depart_from_station_gps_code.value : null,
                            local_code: (_modal_product_depart_from_station_local_code.value !== "") ? _modal_product_depart_from_station_local_code.value : null,
                            home_link: (_modal_product_depart_from_station_home_link.value !== "") ? _modal_product_depart_from_station_home_link.value : null,
                            wikipedia_link: (_modal_product_depart_from_station_wikipedia_link.value !== "") ? _modal_product_depart_from_station_wikipedia_link.value : null,
                            scheduled_service: 1,
                            keywords: Station.departFromKeywords.build(),
                            id: (_modal_product_depart_from_new_station_id && !isNaN(parseInt(_modal_product_depart_from_new_station_id.value))) ? parseInt(_modal_product_depart_from_new_station_id.value) : null,
                            postal_code: (_modal_product_depart_from_station_postal_code.value !== "") ? _modal_product_depart_from_station_postal_code.value : null,
                            street_1: (_modal_product_depart_from_station_street_1.value !== "") ? _modal_product_depart_from_station_street_1.value : null,
                            street_2: (_modal_product_depart_from_station_street_2.value !== "") ? _modal_product_depart_from_station_street_2.value : null,
                            city_id: (!isNaN(parseInt(_modal_product_depart_from_station_city_id.value))) ? parseInt(_modal_product_depart_from_station_city_id.value) : null,
                            name: (_modal_product_depart_from_station.value !== "") ? _modal_product_depart_from_station.value : null,
                            iata_code: (_modal_product_depart_from_station_iata_code.value !== "") ? _modal_product_depart_from_station_iata_code.value : null,
                            enabled: 1,
                        }
                        
                        detail = removeNulls(dataToSend)
                    }
                } else if (type === "arrive_to") {
                    
                    if (validArriveToRecord()) {
                        let dataToSend = {
                            gps_code: (_modal_product_arrive_to_station_gps_code.value !== "") ? _modal_product_arrive_to_station_gps_code.value : null,
                            local_code: (_modal_product_arrive_to_station_local_code.value !== "") ? _modal_product_arrive_to_station_local_code.value : null,
                            home_link: (_modal_product_arrive_to_station_home_link.value !== "") ? _modal_product_arrive_to_station_home_link.value : null,
                            wikipedia_link: (_modal_product_arrive_to_station_wikipedia_link.value !== "") ? _modal_product_arrive_to_station_wikipedia_link.value : null,
                            scheduled_service: 1,
                            keywords: Station.arriveToKeywords.build(),
                            id: (_modal_product_arrive_to_new_station_id && !isNaN(parseInt(_modal_product_arrive_to_new_station_id.value))) ? parseInt(_modal_product_arrive_to_new_station_id.value) : null,
                            postal_code: (_modal_product_arrive_to_station_postal_code.value !== "") ? _modal_product_arrive_to_station_postal_code.value : null,
                            street_1: (_modal_product_arrive_to_station_street_1.value !== "") ? _modal_product_arrive_to_station_street_1.value : null,
                            street_2: (_modal_product_arrive_to_station_street_2.value !== "") ? _modal_product_arrive_to_station_street_2.value : null,
                            city_id: (!isNaN(parseInt(_modal_product_arrive_to_station_city_id.value))) ? parseInt(_modal_product_arrive_to_station_city_id.value) : null,
                            name: (_modal_product_arrive_to_station.value !== "") ? _modal_product_arrive_to_station.value : null,
                            iata_code: (_modal_product_arrive_to_station_iata_code.value !== "") ? _modal_product_arrive_to_station_iata_code.value : null,
                            enabled: 1,
                        }
                        
                        detail = removeNulls(dataToSend)
                    }
                }
                
            }
            
        }
        
        // ----
        console.groupEnd()
        return detail
    }
    const cancelAddStationRecord = function (type) {
        console.groupCollapsed("Station.cancelAddStationRecord")
        // ----
        
        if (!type) {
            return
        }
        
        switch (type) {
            case "depart_from":
                clearStationForm(type)
                populateStationForm(Station.departingStation, type)
                break
            case "arrive_to":
                clearStationForm(type)
                populateStationForm(Station.arrivingStation, type)
                break
        }
        
        hideStationForm(type)
        
        // ----
        console.groupEnd()
    }
    const showStationForm = function (type) {
        console.groupCollapsed("Station.showStationForm")
        // ----
        
        if (!type || !_modal_product_depart_from_station_add_block || !_modal_product_arrive_to_station_add_block) {
            
            //console.log("_modal_product_depart_from_station_add_block", _modal_product_depart_from_station_add_block)
            //console.log("_modal_product_arrive_to_station_add_block", _modal_product_arrive_to_station_add_block)
            //console.log("type", type)
            
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
            //console.log("type", type)
        }
        
        // ----
        console.groupEnd()
    }
    const stationExists = function (name, type) {
        console.groupCollapsed("Station.stationExists")
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
                    
                    let country = (station.country) ? station.country : {}
                    let province = (station.province) ? station.province : {}
                    let city = (station.city) ? station.city : {}
                    let stationId = (station && !isNaN(parseInt(station.id))) ? parseInt(station.id) : null
                    let countryId = (country && !isNaN(parseInt(country.id))) ? parseInt(country.id) : null
                    let provinceId = (province && !isNaN(parseInt(province.id))) ? parseInt(province.id) : null
                    let cityId = (city && !isNaN(parseInt(city.id))) ? parseInt(city.id) : null
                    
                    clearStationForm(type)
                    populateStationForm(station, type)
                    hideStationForm(type)
                    toggleEditFormLink(type)
                    
                    if (type === "depart_from") {
                        globalSelectedStationDepartFrom = true
                        
                        _modal_product_country_id.value = countryId
                        _modal_product_province_id.value = provinceId
                        _modal_product_city_id.value = cityId
                        
                        _modal_product_depart_from_station_edit_link.dataset.stationId = stationId
                        
                    } else if (type === "arrive_to") {
                        globalSelectedStationArriveTo = true
                        
                        _modal_product_arrive_to_station.value = station.name
                        _modal_product_arrive_to_station_id.value = station.id
                        
                        _modal_product_arrive_to_station_edit_link.dataset.stationId = station.id
                    }
                    
                } else {
                    // Station Does Not Exist
                    confirmDialog(`The station: ${name} does not exist exists. Would you like to create it?`, (ans) => {
                        if (ans) {
                            if (type === "depart_from") {
                                globalSelectedStationDepartFrom = false
                            } else {
                                globalSelectedStationArriveTo = false
                            }
                            
                            clearStationForm(type)
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
        
        // ----
        console.groupEnd()
    }
    const fetchByName = function (dataToSend, callback) {
        console.groupCollapsed("Station.fetchByName")
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
        
        // ----
        console.groupEnd()
    }
    const handleStationError = function (msg, title, type) {
        console.groupCollapsed("Station.handleStationError")
        // ----
        
        if (!msg) {
            msg = "There was an error."
        }
        
        if (!title) {
            title = "Station"
        }
        
        if (!type) {
            type = "error"
        }
        
        toastr[type](msg, title)
        
        // ----
        console.groupEnd()
    }
    const defaultDetail = function () {
        console.groupCollapsed("Station.defaultDetail")
        // ----
        
        let details = {
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
            gps_code: null,
            wikipedia_link: null,
            home_link: null,
            local_code: null,
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
        
        // ----
        console.groupEnd()
        return details
    }
    const setDetail = function (station) {
        console.groupCollapsed("Station.setDetail")
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
            detail.local_code = (station.local_code) ? station.local_code : null
            detail.gps_code = (station.gps_code) ? station.gps_code : null
            detail.home_link = (station.home_link) ? station.home_link : null
            detail.wikipedia_link = (station.wikipedia_link) ? station.wikipedia_link : null
        }
        
        // ----
        console.groupEnd()
        return detail
    }
    const init = function (settings) {
        console.groupCollapsed("Station.init")
        // ----
        
        let stations = (settings && settings.stations) ? settings.stations : []
        
        if (_modal_product_depart_from_station || _modal_product_arrive_to_station) {
            
            resetStationForm("depart_from")
            resetStationForm("arrive_to")
            
            hideStationForm("depart_from")
            hideStationForm("arrive_to")
            
            loadAll(stations)
            initAutocomplete()
        }
        
        // ----
        console.groupEnd()
    }
    const resetStationForm = function (type) {
        console.groupCollapsed("Station.resetStationForm")
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
        
        // ----
        console.groupEnd()
    }
    const hideStationForm = function (type) {
        console.groupCollapsed("Station.hideStationForm")
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
            //console.log("type", type)
        }
        
        _modal_product_depart_from_station.disabled = false
        _modal_product_arrive_to_station.disabled = false
        
        // ----
        console.groupEnd()
    }
    const loadAll = function (stations) {
        console.groupCollapsed("Station.loadAll")
        // ----
        
        Station.all = new Map()
        
        $.each(stations, function (k, station) {
            let detail = setDetail(station)
            let stationId = (detail && !isNaN(parseInt(detail.id))) ? parseInt(detail.id) : null
            
            Station.all.set(stationId, detail)
        })
        
        // ----
        console.groupEnd()
    }
    const initAutocomplete = function () {
        console.groupCollapsed("Station.initAutocomplete")
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
                    clearDepartFromFields()
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
                                
                                clearDepartFromFields()
                                
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
                        let type = "depart_from"
                        
                        if (station[0]) {
                            station = station[0]
                        }
                        
                        globalSelectedStationDepartFrom = true
                        
                        if (station) {
                            console.log("station", station)
                            
                            populateStationForm(station, type)
                            toggleEditFormLink(type)
                            
                        } else {
                            
                            resetStationForm(type)
                            showStationForm(type)
                            toggleEditFormLink(type)
                            
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
                    
                    clearArriveToFields()
                    
                    /*
                    if (_modal_product_arrive_to_station_id) {
                        _modal_product_arrive_to_station_id.value = ""
                    }
                    if (_modal_product_arrive_to_station) {
                        _modal_product_arrive_to_station.value = ""
                    }
                    //*/
                })
                .on("change", function () {
                    setTimeout(function () {
                        
                        let station_name = _modal_product_arrive_to_station.value
                        
                        if (globalSelectedStationArriveTo === false) {
                            if (station_name === "") {
                                clearArriveToFields()
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
                        
                        let station = suggestion.data
                        let type = "arrive_to"
                        
                        if (station[0]) {
                            station = station[0]
                        }
                        
                        globalSelectedStationDepartFrom = true
                        
                        if (station) {
                            console.log("station", station)
                            
                            populateStationForm(station, type)
                            toggleEditFormLink(type)
                            
                        } else {
                            
                            resetStationForm(type)
                            showStationForm(type)
                            toggleEditFormLink(type)
                            
                        }
                    },
                })
        }
        
        // ----
        console.groupEnd()
    }
    const populateStationForm = function (station, type) {
        console.groupCollapsed("Station.populateStationForm")
        // ----
        
        if (!type || !_modal_product_depart_from_station_add_block || !_modal_product_arrive_to_station_add_block) {
            return
        }
        
        let displayType = "display_" + defaultLocationDisplayFormat
        let countryId = (station && station.country && station.country.id && !isNaN(parseInt(station.country.id))) ? parseInt(station.country.id) : null
        let provinceId = (station && station.province && station.province.id && !isNaN(parseInt(station.province.id))) ? parseInt(station.province.id) : null
        let provinceName = (station && station.province) ? station.province.name : null
        let countryName = (station && station.country) ? station.country.name : null
        let cityId = (station && station.city && station.city.id && !isNaN(parseInt(station.city.id))) ? parseInt(station.city.id) : null
        let cityName = (station && station.city && station.city.name) ? station.city.name : null
        let stationId = (station && station.id && !isNaN(parseInt(station.id))) ? parseInt(station.id) : null
        let stationName = (station && station.name) ? station.name : null
        let stationIATACode = (station && station.iata_code) ? station.iata_code : null
        let stationStreet1 = (station && station.street_1) ? station.street_1 : null
        let stationStreet2 = (station && station.street_2) ? station.street_2 : null
        let stationPostalCode = (station && station.postal_code) ? station.postal_code : null
        let gpsCode = (station && station.gps_code) ? station.gps_code : null
        let homeLink = (station && station.home_link) ? station.home_link : null
        let wikipediaLink = (station && station.wikipedia_link) ? station.wikipedia_link : null
        let stationKeywords = (station && station.keywords) ? station.keywords : []
        let cityDisplay = ""
        let localCode = (station && station.local_code) ? station.local_code : null
        if (cityName !== null && provinceName !== null && countryName !== null) {
            cityDisplay = `${cityName} (${provinceName}, ${countryName})`
        }
        
        if (type === "depart_from") {
            Station.departingStation = station
            
            _modal_product_country_id.value = countryId
            _modal_product_province_id.value = provinceId
            _modal_product_city_id.value = cityId
            
            _modal_product_depart_from_station.value = stationName
            _modal_product_depart_from_station_iata_code.value = stationIATACode
            _modal_product_depart_from_station_postal_code.value = stationPostalCode
            _modal_product_depart_from_station_street_1.value = stationStreet1
            _modal_product_depart_from_station_street_2.value = stationStreet2
            _modal_product_depart_from_station_gps_code.value = gpsCode
            _modal_product_depart_from_station_home_link.value = homeLink
            _modal_product_depart_from_station_wikipedia_link.value = wikipediaLink
            _modal_product_depart_from_station_city.value = cityDisplay
            _modal_product_depart_from_station_id.value = stationId
            _modal_product_depart_from_station_city_id.value = cityId
            _modal_product_depart_from_new_station_id.value = stationId
            _modal_product_depart_from_station_edit_link.dataset.stationId = stationId
            _modal_product_depart_from_station_local_code.value = localCode
            
            Station.departFromKeywords.set(stationKeywords)
            
        } else if (type === "arrive_to") {
            Station.arrivingStation = station
            
            _modal_product_arrive_to_station.value = stationName
            _modal_product_arrive_to_station_iata_code.value = stationIATACode
            _modal_product_arrive_to_station_postal_code.value = stationPostalCode
            _modal_product_arrive_to_station_street_1.value = stationStreet1
            _modal_product_arrive_to_station_street_2.value = stationStreet2
            _modal_product_arrive_to_station_gps_code.value = gpsCode
            _modal_product_arrive_to_station_home_link.value = homeLink
            _modal_product_arrive_to_station_wikipedia_link.value = wikipediaLink
            _modal_product_arrive_to_station_city.value = cityDisplay
            _modal_product_arrive_to_station_id.value = stationId
            _modal_product_arrive_to_station_city_id.value = cityId
            _modal_product_arrive_to_new_station_id.value = stationId
            _modal_product_arrive_to_station_edit_link.dataset.stationId = stationId
            _modal_product_arrive_to_station_local_code.value = localCode
            
            Station.arriveToKeywords.set(stationKeywords)
            
        }
        
        // ----
        console.groupEnd()
    }
    const clearStationForm = function (type) {
        console.groupCollapsed("Station.clearStationForm")
        // ----
        
        if (!type) {
            return
        }
        
        $(_modal_product_station_day_span).val("1").trigger("change")
        
        if (type === "depart_from") {
            
            if (!_modal_product_depart_from_station_add_block) {return}
            
            if (Station.departFromKeywords) {
                Station.departFromKeywords.clear()
            }
            
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
            
            clearAllValidation()
        } else if (type === "arrive_to") {
            
            if (!_modal_product_arrive_to_station_add_block) {return}
            
            if (Station.arriveToKeywords) {
                Station.arriveToKeywords.clear()
            }
            
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
            
            clearAllValidation()
            
        } else {
            
            _modal_product_depart_from_station_edit_link.dataset.toggle = "hidden"
            _modal_product_arrive_to_station_edit_link.dataset.toggle = "hidden"
            
            $(_modal_product_depart_from_station_edit_link).hide()
            $(_modal_product_arrive_to_station_edit_link).hide()
            
        }
        
        // ----
        console.groupEnd()
    }
    const toggleEditFormLink = function (type) {
        console.groupCollapsed("Station.toggleEditFormLink")
        // ----
        
        if (type) {
            /*
            console.log("_modal_product_depart_from_station_edit_link", _modal_product_depart_from_station_edit_link)
            console.log("_modal_product_arrive_to_station_edit_link", _modal_product_arrive_to_station_edit_link)
            //*/
            
            if (type === "depart_from" && _modal_product_depart_from_station_edit_link) {
                let toggleStatus = (_modal_product_depart_from_station_edit_link.dataset.toggle) ? _modal_product_depart_from_station_edit_link.dataset.toggle : "hidden"
                
                /*
                console.log("toggleStatus", toggleStatus)
                console.log("_modal_product_depart_from_new_station_id", _modal_product_depart_from_new_station_id)
                console.log("_modal_product_depart_from_station", _modal_product_depart_from_station)
                console.log("_modal_product_depart_from_station_city_id", _modal_product_depart_from_station_city_id)
                console.log("_modal_product_depart_from_new_station_id.value", _modal_product_depart_from_new_station_id.value)
                console.log("_modal_product_depart_from_new_station_id.value", _modal_product_depart_from_new_station_id.value)
                console.log("_modal_product_depart_from_station_city_id.value", _modal_product_depart_from_station_city_id.value)
                //*/
                
                if (_modal_product_depart_from_new_station_id && _modal_product_depart_from_station && _modal_product_depart_from_station_city_id
                    && _modal_product_depart_from_new_station_id.value !== "" && _modal_product_depart_from_station.value !== ""
                    && _modal_product_depart_from_station_city_id.value !== "") {
                    // ----------------------------------------------------------------------------------------------------
                    
                    _modal_product_depart_from_station_edit_link.dataset.toggle = "shown"
                    
                    $(_modal_product_depart_from_station_edit_link).show()
                } else {
                    _modal_product_depart_from_station_edit_link.dataset.toggle = "hidden"
                    
                    $(_modal_product_depart_from_station_edit_link).hide()
                }
            } else if (type === "arrive_to" && _modal_product_arrive_to_station_edit_link) {
                let toggleStatus = (_modal_product_arrive_to_station_edit_link.dataset.toggle) ? _modal_product_arrive_to_station_edit_link.dataset.toggle : "hidden"
                
                if (
                    _modal_product_arrive_to_new_station_id &&
                    _modal_product_arrive_to_station &&
                    _modal_product_arrive_to_station_city_id &&
                    _modal_product_arrive_to_new_station_id.value !== "" &&
                    _modal_product_arrive_to_station.value !== "" &&
                    _modal_product_arrive_to_station_city_id.value !== ""
                ) {
                    _modal_product_arrive_to_station_edit_link.dataset.toggle = "shown"
                    
                    $(_modal_product_arrive_to_station_edit_link).show()
                    
                } else {
                    
                    _modal_product_arrive_to_station_edit_link.dataset.toggle = "hidden"
                    
                    $(_modal_product_arrive_to_station_edit_link).hide()
                }
                
            } else {
                
                _modal_product_depart_from_station_edit_link.dataset.toggle = "hidden"
                _modal_product_arrive_to_station_edit_link.dataset.toggle = "hidden"
                
                $(_modal_product_depart_from_station_edit_link).hide()
                $(_modal_product_arrive_to_station_edit_link).hide()
                
            }
            
        }
        
        // ----
        console.groupEnd()
    }
    
    return {
        departingStation: null,
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
