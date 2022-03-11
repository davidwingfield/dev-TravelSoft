const Airport = (function () {
    "use strict"
    
    const _product_edit_location_section = document.getElementById("product_edit_location_section")
    const _category_id = document.getElementById("category_id")
    
    const _modal_product_depart_from_airport_cancel_button = document.getElementById("modal_product_depart_from_airport_cancel_button")
    const _modal_product_depart_from_airport_submit_button = document.getElementById("modal_product_depart_from_airport_submit_button")
    const _modal_product_depart_from_airport_iata_code = document.getElementById("modal_product_depart_from_airport_iata_code")
    const _modal_product_depart_from_airport_country_id = document.getElementById("modal_product_depart_from_airport_country_id")
    const _modal_product_depart_from_airport_province_id = document.getElementById("modal_product_depart_from_airport_province_id")
    const _modal_product_depart_from_airport_city_id = document.getElementById("modal_product_depart_from_airport_city_id")
    const _modal_product_depart_from_airport_city = document.getElementById("modal_product_depart_from_airport_city")
    const _modal_product_depart_from_airport = document.getElementById("modal_product_depart_from_airport")
    const _modal_product_depart_from_airport_id = document.getElementById("modal_product_depart_from_airport_id")
    const _modal_product_depart_from_airport_add_block = document.getElementById("modal_product_depart_from_airport_add_block")
    const _modal_product_depart_from_airport_types_id = document.getElementById("modal_product_depart_from_airport_types_id")
    const _modal_product_depart_from_new_airport_id = document.getElementById("modal_product_depart_from_new_airport_id")
    
    const _modal_product_arrive_to_airport_cancel_button = document.getElementById("modal_product_arrive_to_airport_cancel_button")
    const _modal_product_arrive_to_new_airport_id = document.getElementById("modal_product_arrive_to_new_airport_id")
    const _modal_product_arrive_to_airport_submit_button = document.getElementById("modal_product_arrive_to_airport_submit_button")
    const _modal_product_arrive_to_airport_iata_code = document.getElementById("modal_product_arrive_to_airport_iata_code")
    const _modal_product_arrive_to_airport_country_id = document.getElementById("modal_product_arrive_to_airport_country_id")
    const _modal_product_arrive_to_airport_province_id = document.getElementById("modal_product_arrive_to_airport_province_id")
    const _modal_product_arrive_to_airport_city_id = document.getElementById("modal_product_arrive_to_airport_city_id")
    const _modal_product_arrive_to_airport_city = document.getElementById("modal_product_arrive_to_airport_city")
    const _modal_product_arrive_to_airport = document.getElementById("modal_product_arrive_to_airport")
    const _modal_product_arrive_to_airport_id = document.getElementById("modal_product_arrive_to_airport_id")
    const _modal_product_arrive_to_airport_add_block = document.getElementById("modal_product_arrive_to_airport_add_block")
    const _modal_product_arrive_to_airport_types_id = document.getElementById("modal_product_arrive_to_airport_types_id")
    const _modal_product_location_id = document.getElementById("modal_product_location_id")
    const _modal_product_street_1 = document.getElementById("modal_product_street_1")
    const _modal_product_street_2 = document.getElementById("modal_product_street_2")
    const _modal_product_postal_code = document.getElementById("modal_product_postal_code")
    const _modal_product_province_id = document.getElementById("modal_product_province_id")
    const _modal_product_country_id = document.getElementById("modal_product_country_id")
    const _modal_product_city_id = document.getElementById("modal_product_city_id")
    
    const _product_edit_location_city_id = document.getElementById("product_edit_location_city_id")
    const _product_location_departing_airport_form = document.getElementById("product_location_departing_airport_form")
    const _product_location_departing_airport_search = document.getElementById("product_location_departing_airport_search")
    const _product_location_departing_airport_id = document.getElementById("product_location_departing_airport_id")
    const _product_location_departing_airport_airport_types_id = document.getElementById("product_location_departing_airport_airport_types_id")
    const _product_location_departing_airport_city_id = document.getElementById("product_location_departing_airport_city_id")
    const _product_location_departing_airport_name = document.getElementById("product_location_departing_airport_name")
    const _product_location_departing_airport_iata_code = document.getElementById("product_location_departing_airport_iata_code")
    const _product_location_departing_airport_edit_button = document.getElementById("product_location_departing_airport_edit_button")
    const _product_location_departing_airport_gps_code = document.getElementById("product_location_departing_airport_gps_code")
    const _product_location_departing_airport_local_code = document.getElementById("product_location_departing_airport_local_code")
    const _product_location_departing_airport_home_link = document.getElementById("product_location_departing_airport_home_link")
    const _product_location_departing_airport_wikipedia_link = document.getElementById("product_location_departing_airport_wikipedia_link")
    const _product_location_departing_airport_scheduled_service = document.getElementById("product_location_departing_airport_scheduled_service")
    const _product_location_departing_airport_keywords = document.getElementById("product_location_departing_airport_keywords")
    const _product_location_departing_airport_enabled = document.getElementById("product_location_departing_airport_enabled")
    const _product_location_departing_airport_date_created = document.getElementById("product_location_departing_airport_date_created")
    const _product_location_departing_airport_created_by = document.getElementById("product_location_departing_airport_created_by")
    const _product_location_departing_airport_date_modified = document.getElementById("product_location_departing_airport_date_modified")
    const _product_location_departing_airport_modified_by = document.getElementById("product_location_departing_airport_modified_by")
    const _product_location_departing_airport_note = document.getElementById("product_location_departing_airport_note")
    const _product_location_departing_airport_city_search = document.getElementById("product_location_departing_airport_city_search")
    const _product_location_departing_airport_remove_button = document.getElementById("product_location_departing_airport_remove_button")
    const _product_location_departing_airport_clear_button = document.getElementById("product_location_departing_airport_clear_button")
    const _product_location_departing_airport_save_button = document.getElementById("product_location_departing_airport_save_button")
    
    const _product_location_arriving_airport_edit_button = document.getElementById("product_location_arriving_airport_edit_button")
    const _product_location_arriving_airport_form = document.getElementById("product_location_arriving_airport_form")
    const _product_location_arriving_airport_search = document.getElementById("product_location_arriving_airport_search")
    const _product_location_arriving_airport_id = document.getElementById("product_location_arriving_airport_id")
    const _product_location_arriving_airport_airport_types_id = document.getElementById("product_location_arriving_airport_airport_types_id")
    const _product_location_arriving_airport_city_id = document.getElementById("product_location_arriving_airport_city_id")
    const _product_location_arriving_airport_name = document.getElementById("product_location_arriving_airport_name")
    const _product_location_arriving_airport_iata_code = document.getElementById("product_location_arriving_airport_iata_code")
    const _product_location_arriving_airport_gps_code = document.getElementById("product_location_arriving_airport_gps_code")
    const _product_location_arriving_airport_local_code = document.getElementById("product_location_arriving_airport_local_code")
    const _product_location_arriving_airport_home_link = document.getElementById("product_location_arriving_airport_home_link")
    const _product_location_arriving_airport_wikipedia_link = document.getElementById("product_location_arriving_airport_wikipedia_link")
    const _product_location_arriving_airport_scheduled_service = document.getElementById("product_location_arriving_airport_scheduled_service")
    const _product_location_arriving_airport_keywords = document.getElementById("product_location_arriving_airport_keywords")
    const _product_location_arriving_airport_enabled = document.getElementById("product_location_arriving_airport_enabled")
    const _product_location_arriving_airport_date_created = document.getElementById("product_location_arriving_airport_date_created")
    const _product_location_arriving_airport_created_by = document.getElementById("product_location_arriving_airport_created_by")
    const _product_location_arriving_airport_date_modified = document.getElementById("product_location_arriving_airport_date_modified")
    const _product_location_arriving_airport_modified_by = document.getElementById("product_location_arriving_airport_modified_by")
    const _product_location_arriving_airport_note = document.getElementById("product_location_arriving_airport_note")
    const _product_location_arriving_airport_city_search = document.getElementById("product_location_arriving_airport_city_search")
    const _product_location_arriving_airport_remove_button = document.getElementById("product_location_arriving_airport_remove_button")
    const _product_location_arriving_airport_clear_button = document.getElementById("product_location_arriving_airport_clear_button")
    const _product_location_arriving_airport_save_button = document.getElementById("product_location_arriving_airport_save_button")
    
    const _modal_product_arrive_to_airport_postal_code = document.getElementById("modal_product_arrive_to_airport_postal_code")
    const _modal_product_arrive_to_airport_street_1 = document.getElementById("modal_product_arrive_to_airport_street_1")
    const _modal_product_arrive_to_airport_street_2 = document.getElementById("modal_product_arrive_to_airport_street_2")
    
    const _modal_product_depart_from_airport_postal_code = document.getElementById("modal_product_depart_from_airport_postal_code")
    const _modal_product_depart_from_airport_street_1 = document.getElementById("modal_product_depart_from_airport_street_1")
    const _modal_product_depart_from_airport_street_2 = document.getElementById("modal_product_depart_from_airport_street_2")
    
    let userId = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let airportDepartFromRules = {
        groups: {
            locationGroup: "product_location_departing_airport_city_search product_location_departing_airport_city_id",
        },
        rules: {
            product_location_departing_airport_name: {
                required: true,
            },
            product_location_departing_airport_iata_code: {
                required: true,
            },
            product_location_departing_airport_airport_types_id: {
                required: true,
            },
            product_location_departing_airport_city_search: {
                required: true,
            },
            product_location_departing_airport_city_id: {
                required: true,
            },
            product_location_departing_airport_home_link: {
                url: true,
            },
            product_location_departing_airport_wikipedia_link: {
                url: true,
            },
            
        },
        messages: {
            product_location_departing_airport_name: {
                required: "Field Required",
            },
            product_location_departing_airport_iata_code: {
                required: "Field Required",
            },
            product_location_departing_airport_airport_types_id: {
                required: "Field Required",
            },
            product_location_departing_airport_city_search: {
                required: "Field Required",
            },
            product_location_departing_airport_city_id: {
                required: "Field Required",
            },
            product_location_departing_airport_home_link: {
                url: "Field Invalid",
            },
            product_location_departing_airport_wikipedia_link: {
                url: "Field Invalid",
            },
        },
    }
    let airportArriveToRules = {
        groups: {
            locationGroup: "product_location_arriving_airport_city_search product_location_arriving_airport_city_id",
        },
        rules: {
            product_location_arriving_airport_name: {
                required: true,
            },
            product_location_arriving_airport_iata_code: {
                required: true,
            },
            product_location_arriving_airport_airport_types_id: {
                required: true,
            },
            product_location_arriving_airport_city_search: {
                required: true,
            },
            product_location_arriving_airport_city_id: {
                required: true,
            },
            product_location_arriving_airport_home_link: {
                url: true,
            },
            product_location_arriving_airport_wikipedia_link: {
                url: true,
            },
            
        },
        messages: {
            product_location_arriving_airport_name: {
                required: "Field Required",
            },
            product_location_arriving_airport_iata_code: {
                required: "Field Required",
            },
            product_location_arriving_airport_airport_types_id: {
                required: "Field Required",
            },
            product_location_arriving_airport_city_search: {
                required: "Field Required",
            },
            product_location_arriving_airport_city_id: {
                required: "Field Required",
            },
            product_location_arriving_airport_home_link: {
                url: "Field Invalid",
            },
            product_location_arriving_airport_wikipedia_link: {
                url: "Field Invalid",
            },
        },
    }
    let globalSelectedAirportDepartFrom = false
    let globalSelectedAirportArriveTo = false
    
    $(_product_location_departing_airport_edit_button)
        .on("click", function () {
            //console.log("Airport.product_location_departing_airport_edit_button.click()")
            
            _product_location_departing_airport_search.disabled = true
            
            showAirportForm("depart_from")
            hideAirportForm("arrive_to")
        })
    
    $(_product_location_arriving_airport_edit_button)
        .on("click", function () {
            //console.log("Airport.product_location_arriving_airport_edit_button.click()")
            
            _product_location_arriving_airport_search.disabled = true
            
            showAirportForm("arrive_to")
            hideAirportForm("depart_from")
        })
    
    $(_product_location_departing_airport_remove_button)
        .on("click", function () {
            //console.log("ProductLocation.product_location_departing_airport_remove_button.click()")
            let departing_location = Airport.departingAirport
            
            setLocationAirportForm(departing_location, "depart_from")
            hideAirportForm("depart_from")
            clearValidation(_product_location_departing_airport_form)
        })
    
    $(_product_location_arriving_airport_remove_button)
        .on("click", function () {
            //console.log("ProductLocation.product_location_arriving_airport_remove_button.click()")
            let arriving_location = Airport.arrivingAirport
            
            setLocationAirportForm(arriving_location, "arrive_to")
            hideAirportForm("arrive_to")
            clearValidation(_product_location_arriving_airport_form)
        })
    
    $(_product_location_departing_airport_clear_button)
        .on("click", function () {
            //console.log("ProductLocation.product_location_departing_airport_clear_button.click()")
            clearLocationAirportForm("depart_from")
        })
    
    $(_product_location_arriving_airport_clear_button)
        .on("click", function () {
            //console.log("ProductLocation.product_location_arriving_airport_clear_button.click()")
            clearLocationAirportForm("arrive_to")
        })
    
    $(_product_location_departing_airport_save_button)
        .on("click", function () {
            //console.log("ProductLocation.product_location_departing_airport_save_button.click()")
            update("depart_from")
        })
    
    $(_product_location_arriving_airport_save_button)
        .on("click", function () {
            //console.log("ProductLocation.product_location_arriving_airport_save_button.click()")
            update("arrive_to")
        })
    
    $(_modal_product_depart_from_airport_add_block)
        .on("change", function () {
            validDepartFromRecord()
        })
        .on("keyup", function () {
            validDepartFromRecord()
        })
    
    $(_modal_product_depart_from_airport_cancel_button)
        .on("click", function () {
            cancelAddAirportRecord("depart_from")
        })
    
    $(_modal_product_arrive_to_airport_cancel_button)
        .on("click", function () {
            cancelAddAirportRecord("arrive_to")
        })
    
    $(_modal_product_depart_from_airport_submit_button)
        .on("click", function () {
            save("depart_from")
        })
    
    $(_modal_product_arrive_to_airport_submit_button)
        .on("click", function () {
            save("arrive_to")
        })
    
    const validAirport = function (type) {
        //console.log("Airport.validAirport(type)", type)
        if (type) {
            if (type === "depart_from") {
                return $(_product_location_departing_airport_form).valid()
            } else if (type === "arrive_to") {
                return $(_product_location_arriving_airport_form).valid()
            }
        }
    }
    
    const buildAirportUpdateRecord = function (type) {
        console.log("Airport.buildAirportUpdateRecord(type)", type)
        // ----
        
        let returnObject = {}
        if (type) {
            if (type === "depart_from") {
                let street1 = (_modal_product_depart_from_airport_street_1 && _modal_product_depart_from_airport_street_1.value !== "") ? _modal_product_depart_from_airport_street_1.value : null
                let street2 = (_modal_product_depart_from_airport_street_2 && _modal_product_depart_from_airport_street_2.value !== "") ? _modal_product_depart_from_airport_street_2.value : null
                let postalCode = (_modal_product_depart_from_airport_postal_code && _modal_product_depart_from_airport_postal_code.value !== "") ? _modal_product_depart_from_airport_postal_code.value : null
                
                returnObject.id = (!isNaN(parseInt(_product_location_departing_airport_id.value))) ? parseInt(_product_location_departing_airport_id.value) : null
                returnObject.airport_types_id = (!isNaN(parseInt(_product_location_departing_airport_airport_types_id.value))) ? parseInt(_product_location_departing_airport_airport_types_id.value) : null
                returnObject.city_id = (!isNaN(parseInt(_product_location_departing_airport_city_id.value))) ? parseInt(_product_location_departing_airport_city_id.value) : null
                returnObject.name = (_product_location_departing_airport_name.value === "") ? null : _product_location_departing_airport_name.value
                returnObject.iata_code = (_product_location_departing_airport_iata_code.value === "") ? null : _product_location_departing_airport_iata_code.value
                returnObject.home_link = (_product_location_departing_airport_home_link.value === "") ? null : _product_location_departing_airport_home_link.value
                returnObject.wikipedia_link = (_product_location_departing_airport_wikipedia_link.value === "") ? null : _product_location_departing_airport_wikipedia_link.value
                returnObject.enabled = (_product_location_departing_airport_enabled.checked === true) ? 1 : 0
                returnObject.street_1 = street1
                returnObject.street_2 = street2
                returnObject.postal_code = postalCode
                
            } else if (type === "arrive_to") {
                let street1 = (_modal_product_arrive_to_airport_street_1 && _modal_product_arrive_to_airport_street_1.value !== "") ? _modal_product_arrive_to_airport_street_1.value : null
                let street2 = (_modal_product_arrive_to_airport_street_2 && _modal_product_arrive_to_airport_street_2.value !== "") ? _modal_product_arrive_to_airport_street_2.value : null
                let postalCode = (_modal_product_arrive_to_airport_postal_code && _modal_product_arrive_to_airport_postal_code.value !== "") ? _modal_product_arrive_to_airport_postal_code.value : null
                
                returnObject.id = (!isNaN(parseInt(_product_location_arriving_airport_id.value))) ? parseInt(_product_location_arriving_airport_id.value) : null
                returnObject.airport_types_id = (!isNaN(parseInt(_product_location_arriving_airport_airport_types_id.value))) ? parseInt(_product_location_arriving_airport_airport_types_id.value) : null
                returnObject.city_id = (!isNaN(parseInt(_product_location_arriving_airport_city_id.value))) ? parseInt(_product_location_arriving_airport_city_id.value) : null
                returnObject.name = (_product_location_arriving_airport_name.value === "") ? null : _product_location_arriving_airport_name.value
                returnObject.iata_code = (_product_location_arriving_airport_iata_code.value === "") ? null : _product_location_arriving_airport_iata_code.value
                returnObject.home_link = (_product_location_arriving_airport_home_link.value === "") ? null : _product_location_arriving_airport_home_link.value
                returnObject.wikipedia_link = (_product_location_arriving_airport_wikipedia_link.value === "") ? null : _product_location_arriving_airport_wikipedia_link.value
                returnObject.enabled = (_product_location_arriving_airport_enabled.checked === true) ? 1 : 0
                returnObject.street_1 = street1
                returnObject.street_2 = street2
                returnObject.postal_code = postalCode
            }
        }
        
        return returnObject
    }
    
    const sendUpdateRequest = function (dataToSend, callback) {
        console.log("Airport.sendUpdateRequest(dataToSend)", dataToSend)
        // ----
        
        if (dataToSend) {
            let url = "/api/v1.0/airports/update"
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    }
                })
            } catch (e) {
                //console.log("error", e)
            }
        }
    }
    
    const sendSaveRequest = function (dataToSend, callback) {
        if (dataToSend) {
            let url = "/api/v1.0/airports/update"
            try {
                sendPostRequest(url, dataToSend, function (data) {
                    if (data) {
                        return callback(data)
                    } else {
                        handleAirportError("Oops: 1")
                    }
                })
            } catch (e) {
                
                console.log("error", e)
            }
        }
    }
    
    const validDepartFromRecord = function () {
        let isValid = true
        
        if (_modal_product_depart_from_airport_iata_code.value === "") {
            $(_modal_product_depart_from_airport_iata_code).showError("Field Required")
            isValid = false
        } else {
            $(_modal_product_depart_from_airport_iata_code).hideError()
        }
        
        if (_modal_product_depart_from_airport_types_id.value === "") {
            $(_modal_product_depart_from_airport_types_id).showError("Field Required")
            isValid = false
        } else {
            $(_modal_product_depart_from_airport_types_id).hideError()
        }
        
        if (isNaN(parseInt(_modal_product_depart_from_airport_city_id.value))) {
            $(_modal_product_depart_from_airport_city).showError("Field Required")
            isValid = false
        } else {
            $(_modal_product_depart_from_airport_city).hideError()
        }
        
        return isValid
    }
    
    const validArriveToRecord = function () {
        let isValid = true
        
        if (_modal_product_arrive_to_airport_iata_code.value === "") {
            $(_modal_product_arrive_to_airport_iata_code).showError("Field Required")
            isValid = false
        } else {
            $(_modal_product_arrive_to_airport_iata_code).hideError()
        }
        
        if (_modal_product_arrive_to_airport_types_id.value === "") {
            $(_modal_product_arrive_to_airport_types_id).showError("Field Required")
            isValid = false
        } else {
            $(_modal_product_arrive_to_airport_types_id).hideError()
        }
        
        if (isNaN(parseInt(_modal_product_arrive_to_airport_city_id.value))) {
            $(_modal_product_arrive_to_airport_city).showError("Field Required")
            isValid = false
        } else {
            $(_modal_product_arrive_to_airport_city).hideError()
        }
        
        return isValid
    }
    
    const buildAddAirportRecord = function (type) {
        if (_modal_product_depart_from_airport_add_block && _modal_product_arrive_to_airport_add_block) {
            if (type) {
                if (type === "depart_from") {
                    if (validDepartFromRecord()) {
                        let street1 = (_modal_product_depart_from_airport_street_1 && _modal_product_depart_from_airport_street_1.value !== "") ? _modal_product_depart_from_airport_street_1.value : null
                        let street2 = (_modal_product_depart_from_airport_street_2 && _modal_product_depart_from_airport_street_2.value !== "") ? _modal_product_depart_from_airport_street_2.value : null
                        let postalCode = (_modal_product_depart_from_airport_postal_code && _modal_product_depart_from_airport_postal_code.value !== "") ? _modal_product_depart_from_airport_postal_code.value : null
                        
                        let dataToSend = {
                            airport_types_id: (!isNaN(parseInt(_modal_product_depart_from_airport_types_id.value))) ? parseInt(_modal_product_depart_from_airport_types_id.value) : null,
                            city_id: (!isNaN(parseInt(_modal_product_depart_from_airport_city_id.value))) ? parseInt(_modal_product_depart_from_airport_city_id.value) : null,
                            name: (_modal_product_depart_from_airport.value !== "") ? _modal_product_depart_from_airport.value : null,
                            street_1: street1,
                            street_2: street2,
                            postal_code: postalCode,
                            iata_code: (_modal_product_depart_from_airport_iata_code.value !== "") ? _modal_product_depart_from_airport_iata_code.value : null,
                        }
                        
                        return removeNulls(dataToSend)
                    }
                } else if (type === "arrive_to") {
                    if (validArriveToRecord()) {
                        let street1 = (_modal_product_arrive_to_airport_street_1 && _modal_product_arrive_to_airport_street_1.value !== "") ? _modal_product_arrive_to_airport_street_1.value : null
                        let street2 = (_modal_product_arrive_to_airport_street_2 && _modal_product_arrive_to_airport_street_2.value !== "") ? _modal_product_arrive_to_airport_street_2.value : null
                        let postalCode = (_modal_product_arrive_to_airport_postal_code && _modal_product_arrive_to_airport_postal_code.value !== "") ? _modal_product_arrive_to_airport_postal_code.value : null
                        
                        let dataToSend = {
                            airport_types_id: (!isNaN(parseInt(_modal_product_arrive_to_airport_types_id.value))) ? parseInt(_modal_product_arrive_to_airport_types_id.value) : null,
                            city_id: (!isNaN(parseInt(_modal_product_arrive_to_airport_city_id.value))) ? parseInt(_modal_product_arrive_to_airport_city_id.value) : null,
                            name: (_modal_product_arrive_to_airport.value !== "") ? _modal_product_arrive_to_airport.value : null,
                            street_1: street1,
                            street_2: street2,
                            postal_code: postalCode,
                            iata_code: (_modal_product_arrive_to_airport_iata_code.value !== "") ? _modal_product_arrive_to_airport_iata_code.value : null,
                        }
                        
                        return removeNulls(dataToSend)
                    }
                }
            }
        }
    }
    
    const cancelAddAirportRecord = function (type) {
        if (_modal_product_depart_from_airport_add_block && _modal_product_arrive_to_airport_add_block) {
            clearAirportForm(type)
            hideAirportForm(type)
            
            if (type) {
                if (type === "depart_from") {
                
                } else if (type === "arrive_to") {
                
                }
            }
        }
    }
    
    const populateAirportForm = function (airport, type) {
        if (_modal_product_depart_from_airport_add_block && _modal_product_arrive_to_airport_add_block) {
            clearAirportForm(type)
            
            showAirportForm(type)
        }
    }
    
    const clearAirportForm = function (type) {
        if (_modal_product_depart_from_airport_add_block && _modal_product_arrive_to_airport_add_block) {
            if (type) {
                if (type === "depart_from") {
                    _modal_product_depart_from_airport_iata_code.value = ""
                    _modal_product_depart_from_airport_city.value = ""
                    _modal_product_depart_from_airport_city_id.value = ""
                    _modal_product_depart_from_airport_country_id.value = ""
                    _modal_product_depart_from_airport_province_id.value = ""
                    _modal_product_depart_from_airport_city_id.value = ""
                    _modal_product_depart_from_airport_types_id.value = ""
                    _modal_product_depart_from_airport_postal_code.value = ""
                    _modal_product_depart_from_airport_street_1.value = ""
                    _modal_product_depart_from_airport_street_2.value = ""
                    _modal_product_depart_from_airport.disabled = false
                    clearAllValidation()
                } else if (type === "arrive_to") {
                    _modal_product_arrive_to_airport_iata_code.value = ""
                    _modal_product_arrive_to_airport_city.value = ""
                    _modal_product_arrive_to_airport_city_id.value = ""
                    _modal_product_arrive_to_airport_country_id.value = ""
                    _modal_product_arrive_to_airport_province_id.value = ""
                    _modal_product_arrive_to_airport_city_id.value = ""
                    _modal_product_arrive_to_airport_types_id.value = ""
                    _modal_product_arrive_to_airport_postal_code.value = ""
                    _modal_product_arrive_to_airport_street_1.value = ""
                    _modal_product_arrive_to_airport_street_2.value = ""
                    _modal_product_arrive_to_airport.disabled = false
                    clearAllValidation()
                }
            }
        }
    }
    
    const resetAirportForm = function (type) {
        if (_modal_product_depart_from_airport_add_block && _modal_product_arrive_to_airport_add_block) {
            if (type) {
                _modal_product_arrive_to_airport.disabled = false
                _modal_product_depart_from_airport.disabled = false
                
                clearAirportForm(type)
                
                hideAirportForm("depart_from")
                hideAirportForm("arrive_to")
            }
        }
    }
    
    const hideAirportForm = function (type) {
        //console.log("ProductLocation.hideAirportForm(type)", type)
        if (_modal_product_depart_from_airport_add_block && _modal_product_arrive_to_airport_add_block) {
            if (type) {
                if (type === "depart_from") {
                    $(_modal_product_depart_from_airport_add_block).hide()
                } else if (type === "arrive_to") {
                    $(_modal_product_arrive_to_airport_add_block).hide()
                }
            }
        }
        
        if (_product_edit_location_section) {
            if (type) {
                if (type === "depart_from") {
                    if (_product_location_departing_airport_form) {
                        $(_product_location_departing_airport_form).hide()
                        _product_location_departing_airport_search.disabled = false
                    }
                }
                
                if (type === "arrive_to") {
                    if (_product_location_arriving_airport_form) {
                        $(_product_location_arriving_airport_form).hide()
                        _product_location_arriving_airport_search.disabled = false
                    }
                }
            }
        }
    }
    
    const showAirportForm = function (type) {
        //console.log("ProductLocation.showAirportForm(type)", type)
        if (_modal_product_depart_from_airport_add_block && _modal_product_arrive_to_airport_add_block) {
            if (type) {
                if (type === "depart_from") {
                    _modal_product_depart_from_airport.disabled = true
                    $(_modal_product_depart_from_airport_add_block).show()
                    $(_modal_product_arrive_to_airport_add_block).hide()
                } else if (type === "arrive_to") {
                    _modal_product_arrive_to_airport.disabled = true
                    $(_modal_product_arrive_to_airport_add_block).show()
                    $(_modal_product_depart_from_airport_add_block).hide()
                }
            }
        }
        
        if (_product_edit_location_section) {
            if (type) {
                if (type === "depart_from") {
                    if (_product_location_departing_airport_form) {
                        $(_product_location_departing_airport_form).show()
                        _product_location_departing_airport_search.disabled = true
                    }
                }
                
                if (type === "arrive_to") {
                    if (_product_location_arriving_airport_form) {
                        $(_product_location_arriving_airport_form).show()
                        _product_location_arriving_airport_search.disabled = true
                    }
                }
                
            }
        }
    }
    
    const initAutocomplete = function () {
        
        if (_product_location_departing_airport_search) {
            
            $(_product_location_departing_airport_search)
                .on("click", function () {
                    if ($(this).attr("readonly") === "readonly") {
                        e.preventDefault()
                    } else {
                        $(this).select()
                    }
                })
                .on("search", function () {
                    if (_product_location_departing_airport_id) {
                        _product_location_departing_airport_id.value = ""
                    }
                    
                    if (_product_location_departing_airport_search) {
                        _product_location_departing_airport_search.value = ""
                    }
                    
                    clearLocationAirportForm("depart_from")
                    
                })
                .on("keyup", function () {
                    globalSelectedAirportDepartFrom = false
                })
                .on("change", function () {
                    setTimeout(function () {
                        let airport_name = _product_location_departing_airport_search.value
                        
                        if (globalSelectedAirportDepartFrom === false) {
                            if (airport_name === "") {
                                _product_location_departing_airport_search.value = ""
                                _product_location_departing_airport_id.value = ""
                                globalSelectedAirportDepartFrom = false
                            } else {
                                airportExists(airport_name, "depart_from")
                            }
                        }
                    }, 200)
                })
                .autocomplete({
                    serviceUrl: "/api/v1.0/autocomplete/airports",
                    minChars: 2,
                    cache: false,
                    dataType: "json",
                    triggerSelectOnValidInput: false,
                    paramName: "st",
                    onSelect: function (suggestion) {
                        if (!suggestion || !suggestion.data) {
                            return
                        }
                        
                        globalSelectedAirportDepartFrom = true
                        
                        let airport = suggestion.data
                        
                        if (airport) {
                            setLocationAirportForm(airport, "depart_from")
                            if (_product_location_departing_airport_id) {
                                _product_location_departing_airport_id.value = airport.id
                            }
                            
                            if (_product_location_departing_airport_city_id) {
                                _product_location_departing_airport_city_id.value = airport.city.id
                                _product_edit_location_city_id.value = airport.city.id
                            }
                            
                            if (_product_location_departing_airport_search) {
                                _product_location_departing_airport_search.value = suggestion.value
                            }
                        }
                    },
                })
        }
        
        if (_product_location_arriving_airport_search) {
            
            $(_product_location_arriving_airport_search)
                .on("click", function () {
                    if ($(this).attr("readonly") === "readonly") {
                        e.preventDefault()
                    } else {
                        $(this).select()
                    }
                })
                .on("search", function () {
                    if (_product_location_departing_airport_id) {
                        _product_location_departing_airport_id.value = ""
                    }
                    if (_product_location_departing_airport_search) {
                        _product_location_departing_airport_search.value = ""
                    }
                    clearLocationAirportForm("arrive_to")
                })
                .on("keyup", function () {
                    globalSelectedAirportDepartFrom = false
                })
                .on("change", function () {
                
                })
                .autocomplete({
                    serviceUrl: "/api/v1.0/autocomplete/airports",
                    minChars: 2,
                    cache: false,
                    dataType: "json",
                    triggerSelectOnValidInput: false,
                    paramName: "st",
                    onSelect: function (suggestion) {
                        if (!suggestion || !suggestion.data) {
                            return
                        }
                        
                        globalSelectedAirportDepartFrom = true
                        
                        let airport = suggestion.data
                        
                        if (airport) {
                            setLocationAirportForm(airport, "arrive_to")
                            if (_product_location_arriving_airport_id) {
                                _product_location_arriving_airport_id.value = airport.id
                            }
                            
                            if (_product_location_arriving_airport_city_id) {
                                _product_location_arriving_airport_city_id.value = airport.city.id
                            }
                            
                            if (_product_location_arriving_airport_search) {
                                _product_location_arriving_airport_search.value = suggestion.value
                            }
                        }
                    },
                })
        }
        
        if (_modal_product_depart_from_airport) {
            
            $(_modal_product_depart_from_airport)
                .on("click", function (e) {
                    if ($(this).attr("readonly") === "readonly") {
                        e.preventDefault()
                    } else {
                        $(this).select()
                    }
                })
                .on("search", function () {
                    if (_modal_product_depart_from_airport_id) {
                        _modal_product_depart_from_airport_id.value = ""
                    }
                    
                    if (_modal_product_depart_from_airport) {
                        _modal_product_depart_from_airport.value = ""
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
                })
                .on("keyup", function () {
                    globalSelectedAirportDepartFrom = false
                })
                .on("change", function () {
                    setTimeout(function () {
                        let airport_name = _modal_product_depart_from_airport.value
                        
                        if (globalSelectedAirportDepartFrom === false) {
                            if (airport_name === "") {
                                _modal_product_depart_from_airport.value = ""
                                _modal_product_depart_from_airport_id.value = ""
                                if (_modal_product_country_id) {
                                    _modal_product_country_id.value = ""
                                }
                                
                                if (_modal_product_province_id) {
                                    _modal_product_province_id.value = ""
                                }
                                
                                if (_modal_product_city_id) {
                                    _modal_product_city_id.value = ""
                                }
                                globalSelectedAirportDepartFrom = false
                            } else {
                                airportExists(airport_name, "depart_from")
                            }
                        }
                    }, 200)
                })
                .autocomplete({
                    serviceUrl: "/api/v1.0/autocomplete/airports",
                    minChars: 2,
                    cache: false,
                    dataType: "json",
                    triggerSelectOnValidInput: false,
                    paramName: "st",
                    onSelect: function (suggestion) {
                        if (!suggestion || !suggestion.data) {
                            return
                        }
                        
                        globalSelectedAirportDepartFrom = true
                        
                        let airport = suggestion.data
                        console.log("|__ airport", airport)
                        if (airport) {
                            let countryId = (!isNaN(parseInt(airport.country.id))) ? parseInt(airport.country.id) : null
                            let provinceId = (!isNaN(parseInt(airport.province.id))) ? parseInt(airport.province.id) : null
                            let cityId = (!isNaN(parseInt(airport.city.id))) ? parseInt(airport.city.id) : null
                            
                            if (_modal_product_depart_from_airport) {
                                _modal_product_depart_from_airport.value = (airport.name) ? airport.name : ""
                            }
                            
                            if (_modal_product_depart_from_airport_id) {
                                _modal_product_depart_from_airport_id.value = (!isNaN(parseInt(airport.id))) ? parseInt(airport.id) : ""
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
                            
                        } else {
                            resetAirportForm("depart_from")
                            showAirportForm("depart_from")
                        }
                    },
                })
        }
        
        if (_modal_product_arrive_to_airport) {
            
            $(_modal_product_arrive_to_airport)
                .on("click", function () {
                    if ($(this).attr("readonly") === "readonly") {
                        e.preventDefault()
                    } else {
                        $(this).select()
                    }
                })
                .on("keyup", function () {
                    globalSelectedAirportArriveTo = false
                })
                .on("search", function () {
                    if (_modal_product_arrive_to_airport_id) {
                        _modal_product_arrive_to_airport_id.value = ""
                    }
                    if (_modal_product_arrive_to_airport) {
                        _modal_product_arrive_to_airport.value = ""
                    }
                })
                .on("change", function () {
                    setTimeout(function () {
                        let airport_name = _modal_product_arrive_to_airport.value
                        
                        if (globalSelectedAirportArriveTo === false) {
                            if (airport_name === "") {
                                _modal_product_arrive_to_airport.value = ""
                                _modal_product_arrive_to_airport_id.value = ""
                                globalSelectedAirportArriveTo = false
                            } else {
                                airportExists(airport_name, "arrive_to")
                            }
                        }
                    }, 200)
                })
                .autocomplete({
                    serviceUrl: "/api/v1.0/autocomplete/airports",
                    minChars: 2,
                    cache: false,
                    dataType: "json",
                    triggerSelectOnValidInput: false,
                    paramName: "st",
                    onSelect: function (suggestion) {
                        if (!suggestion || !suggestion.data) {
                            return
                        }
                        
                        globalSelectedAirportArriveTo = true
                        
                        let airport = suggestion.data
                        
                        if (airport) {
                            if (_modal_product_arrive_to_airport) {
                                _modal_product_arrive_to_airport.value = (airport.name) ? airport.name : ""
                            }
                            
                            if (_modal_product_arrive_to_airport_id) {
                                _modal_product_arrive_to_airport_id.value = (!isNaN(parseInt(airport.id))) ? parseInt(airport.id) : ""
                            }
                            
                        } else {
                            resetAirportForm("arrive_to")
                            showAirportForm("arrive_to")
                        }
                    },
                })
        }
        
    }
    
    const clearLocationAirportForm = function (type) {
        //console.log("ProductLocation.clearLocationAirportForm(type)", type)
        if (type) {
            if (type === "depart_from") {
                _product_location_departing_airport_airport_types_id.value = ""
                _product_location_departing_airport_name.value = ""
                _product_location_departing_airport_city_id.value = ""
                _product_location_departing_airport_search.value = ""
                _product_location_departing_airport_id.value = ""
                _product_location_departing_airport_home_link.value = ""
                _product_location_departing_airport_wikipedia_link.value = ""
                _product_location_departing_airport_city_search.value = ""
                _product_location_departing_airport_enabled.checked = true
                _product_location_departing_airport_iata_code.value = ""
                _product_location_departing_airport_remove_button.disabled = true
                _product_location_departing_airport_save_button.disabled = true
                _product_location_departing_airport_clear_button.disabled = true
                _product_edit_location_city_id.value = ""
            }
            
            if (type === "arrive_to") {
                _product_location_arriving_airport_airport_types_id.value = ""
                _product_location_arriving_airport_name.value = ""
                _product_location_arriving_airport_city_id.value = ""
                _product_location_arriving_airport_search.value = ""
                _product_location_arriving_airport_id.value = ""
                _product_location_arriving_airport_home_link.value = ""
                _product_location_arriving_airport_wikipedia_link.value = ""
                _product_location_arriving_airport_city_search.value = ""
                _product_location_arriving_airport_enabled.checked = true
                _product_location_arriving_airport_iata_code.value = ""
                _product_location_arriving_airport_remove_button.disabled = true
                _product_location_arriving_airport_save_button.disabled = true
                _product_location_arriving_airport_clear_button.disabled = true
            }
            
        }
        
    }
    
    const setLocationAirportForm = function (airport, type) {
        //console.log("ProductLocation.setLocationAirportForm(type)", type)
        if (type) {
            clearLocationAirportForm(type)
            if (airport) {
                if (airport.city) {
                    let displayShort = `${airport.city.name} (${airport.province.name}, ${airport.country.name})`
                    let displayMedium = `${airport.city.name} (${airport.province.name}, ${airport.country.name})`
                    let displayLong = `${airport.city.name} (${airport.province.name}, ${airport.country.name})`
                    let searchDisplayText = ""
                    
                    if (airport.name && airport.iata_code) {
                        searchDisplayText = `${airport.iata_code} - ${airport.name}`
                    } else if (airport.name && !airport.iata_code) {
                        searchDisplayText = `${airport.name}`
                    } else if (!airport.name && airport.iata_code) {
                        searchDisplayText = `${airport.iata_code}`
                    } else {
                        searchDisplayText = `Airport Name`
                    }
                    
                    if (type === "depart_from") {
                        let cityId = (!isNaN(parseInt(airport.city.id))) ? parseInt(airport.city.id) : null
                        _product_location_departing_airport_airport_types_id.value = (airport.airport_types_id) ? airport.airport_types_id : ""
                        _product_location_departing_airport_name.value = (airport.name) ? airport.name : null
                        _product_location_departing_airport_city_id.value = (!isNaN(parseInt(airport.city.id))) ? parseInt(airport.city.id) : null
                        _product_location_departing_airport_search.value = searchDisplayText
                        _product_location_departing_airport_id.value = (!isNaN(parseInt(airport.id))) ? parseInt(airport.id) : null
                        _product_location_departing_airport_home_link.value = (airport.home_link) ? airport.home_link : null
                        _product_location_departing_airport_wikipedia_link.value = (airport.wikipedia_link) ? airport.wikipedia_link : null
                        _product_location_departing_airport_enabled.checked = (airport.enabled && airport.enabled === 1)
                        _product_location_departing_airport_iata_code.value = (airport.iata_code) ? airport.iata_code : null
                        
                        _product_location_departing_airport_remove_button.disabled = false
                        _product_location_departing_airport_save_button.disabled = false
                        _product_location_departing_airport_clear_button.disabled = false
                        
                        _product_edit_location_city_id.value = cityId
                        
                        if (defaultAddressView === "medium") {
                            _product_location_departing_airport_city_search.value = displayMedium
                        }
                        
                        if (defaultAddressView === "long") {
                            _product_location_departing_airport_city_search.value = displayLong
                        }
                        
                        if (defaultAddressView === "short") {
                            _product_location_departing_airport_city_search.value = displayShort
                        }
                    }
                    
                    if (type === "arrive_to") {
                        _product_location_arriving_airport_airport_types_id.value = (airport.airport_types_id) ? airport.airport_types_id : ""
                        _product_location_arriving_airport_name.value = (airport.name) ? airport.name : null
                        _product_location_arriving_airport_city_id.value = (!isNaN(parseInt(airport.city.id))) ? parseInt(airport.city.id) : null
                        _product_location_arriving_airport_search.value = searchDisplayText
                        _product_location_arriving_airport_id.value = (!isNaN(parseInt(airport.id))) ? parseInt(airport.id) : null
                        _product_location_arriving_airport_home_link.value = (airport.home_link) ? airport.home_link : null
                        _product_location_arriving_airport_wikipedia_link.value = (airport.wikipedia_link) ? airport.wikipedia_link : null
                        _product_location_arriving_airport_enabled.checked = (airport.enabled && airport.enabled === 1)
                        _product_location_arriving_airport_iata_code.value = (airport.iata_code) ? airport.iata_code : null
                        
                        _product_location_arriving_airport_remove_button.disabled = false
                        _product_location_arriving_airport_save_button.disabled = false
                        _product_location_arriving_airport_clear_button.disabled = false
                        
                        if (defaultAddressView === "medium") {
                            _product_location_arriving_airport_city_search.value = displayMedium
                        }
                        
                        if (defaultAddressView === "long") {
                            _product_location_arriving_airport_city_search.value = displayLong
                        }
                        
                        if (defaultAddressView === "short") {
                            _product_location_arriving_airport_city_search.value = displayShort
                        }
                        
                    }
                }
                
            }
        }
    }
    
    const airportExists = function (name, type) {
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
                let airport = null
                
                if (data) {
                    airport = data
                    if (data[0]) {
                        airport = data[0]
                    }
                }
                
                if (airport && airport.id) {
                    console.log("|__ airport", airport)
                    
                    if (type === "depart_from") {
                        let airportName = (airport.name) ? airport.name : null
                        let airportId = (!isNaN(parseInt(airport.id))) ? parseInt(airport.id) : null
                        let countryId = (!isNaN(parseInt(airport.country.id))) ? parseInt(airport.country.id) : null
                        let provinceId = (!isNaN(parseInt(airport.province.id))) ? parseInt(airport.province.id) : null
                        let cityId = (!isNaN(parseInt(airport.city.id))) ? parseInt(airport.city.id) : null
                        
                        globalSelectedAirportDepartFrom = true
                        
                        if (_modal_product_depart_from_airport) {
                            _modal_product_depart_from_airport.value = airportName
                        }
                        
                        if (_modal_product_depart_from_airport_id) {
                            _modal_product_depart_from_airport_id.value = airportId
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
                        
                    } else {
                        globalSelectedAirportArriveTo = true
                        _modal_product_arrive_to_airport.value = airport.name
                        _modal_product_arrive_to_airport_id.value = airport.id
                    }
                } else {
                    confirmDialog(`The airport: ${name} does not exist exists. Would you like to create it?`, (ans) => {
                        if (ans) {
                            if (type === "depart_from") {
                                globalSelectedAirportDepartFrom = false
                            } else {
                                globalSelectedAirportArriveTo = false
                            }
                            
                            populateAirportForm({
                                name: name,
                            }, type)
                            
                        } else {
                            if (type === "depart_from") {
                                if (_modal_product_country_id) {
                                    _modal_product_country_id.value = ""
                                }
                                
                                if (_modal_product_province_id) {
                                    _modal_product_province_id.value = ""
                                }
                                
                                if (_modal_product_city_id) {
                                    _modal_product_city_id.value = ""
                                }
                                
                                if (_modal_product_depart_from_airport_id) {
                                    _modal_product_depart_from_airport_id.value = ""
                                }
                                if (_modal_product_depart_from_airport) {
                                    _modal_product_depart_from_airport.value = ""
                                }
                            } else {
                                if (_modal_product_arrive_to_airport_id) {
                                    _modal_product_arrive_to_airport_id.value = ""
                                }
                                if (_modal_product_arrive_to_airport) {
                                    _modal_product_arrive_to_airport.value = ""
                                }
                            }
                            
                        }
                    })
                }
            })
        }
    }
    
    const fetchByName = function (dataToSend, callback) {
        let url = "/api/v1.0/airports/validate"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        handleAirportError("Oops: 1")
                    }
                })
            } catch (e) {
                //console.log("error", e)
                handleAirportError("Error Validating Airport")
            }
        } else {
            handleAirportError("Error Loading Airport - Missing Data")
        }
    }
    
    const handleAirportError = function (msg) {
        toastr.error(msg)
    }
    
    const update = function (type) {
        //console.log("Airport.update(type)", type)
        if (validAirport(type)) {
            confirmDialog(`Would you like to update?`, (ans) => {
                if (ans) {
                    sendUpdateRequest(buildAirportUpdateRecord(type), function (data) {
                        let airport
                        if (data) {
                            airport = data
                            if (data[0]) {
                                airport = data[0]
                            }
                            //console.log("airport", airport)
                            let name = (airport.name) ? airport.name : null
                            toastr["success"](`Airport ${name} has been updated`, "Airport Updated")
                        }
                    })
                }
            })
        }
    }
    
    const save = function (type) {
        if (type) {
            let dataToSend = buildAddAirportRecord(type)
            
            if (dataToSend) {
                confirmDialog(`Would you like to update?`, (ans) => {
                    if (ans) {
                        sendSaveRequest(dataToSend, function (data) {
                            let airport
                            if (data) {
                                airport = data
                                if (data[0]) {
                                    airport = data[0]
                                }
                            }
                            
                            if (airport) {
                                
                                if (type === "depart_from") {
                                    if (_modal_product_depart_from_airport) {
                                        _modal_product_depart_from_airport.value = (airport.name) ? airport.name : ""
                                    }
                                    
                                    if (_modal_product_depart_from_new_airport_id) {
                                        _modal_product_depart_from_new_airport_id.value = (!isNaN(parseInt(airport.id))) ? parseInt(airport.id) : ""
                                    }
                                    
                                    if (_modal_product_depart_from_airport_id) {
                                        _modal_product_depart_from_airport_id.value = (!isNaN(parseInt(airport.id))) ? parseInt(airport.id) : ""
                                    }
                                    
                                    if (_modal_product_country_id) {
                                        _modal_product_country_id.value = (!isNaN(parseInt(airport.country.id))) ? parseInt(airport.country.id) : ""
                                    }
                                    
                                    if (_modal_product_province_id) {
                                        _modal_product_province_id.value = (!isNaN(parseInt(airport.province.id))) ? parseInt(airport.province.id) : ""
                                    }
                                    
                                    if (_modal_product_city_id) {
                                        _modal_product_city_id.value = (!isNaN(parseInt(airport.city.id))) ? parseInt(airport.city.id) : ""
                                    }
                                    
                                }
                                
                                if (type === "arrive_to") {
                                    
                                    if (_modal_product_arrive_to_airport) {
                                        _modal_product_arrive_to_airport.value = (airport.name) ? airport.name : ""
                                    }
                                    
                                    if (_modal_product_arrive_to_new_airport_id) {
                                        _modal_product_arrive_to_new_airport_id.value = (!isNaN(parseInt(airport.id))) ? parseInt(airport.id) : ""
                                    }
                                    
                                    if (_modal_product_arrive_to_airport_id) {
                                        _modal_product_arrive_to_airport_id.value = (!isNaN(parseInt(airport.id))) ? parseInt(airport.id) : ""
                                    }
                                }
                                
                                resetAirportForm(type)
                                initAutocomplete()
                            }
                        })
                    }
                })
            }
        }
    }
    
    const init = function (settings) {
        $(document).ready(function () {
            if (_modal_product_depart_from_airport || _modal_product_arrive_to_airport) {
                initAutocomplete()
                resetAirportForm("depart_from")
                resetAirportForm("arrive_to")
            }
            
            if (settings) {
                console.log("|__ settings", settings)
                let categoryId = (_category_id && !isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
                
                if (_product_edit_location_section) {
                    if (categoryId === 2) {
                        initAutocomplete()
                        clearLocationAirportForm("depart_from")
                        clearLocationAirportForm("arrive_to")
                        
                        if (settings.product) {
                            let product = settings.product
                            if (product.arriving_location) {
                                Airport.arrivingAirport = product.arriving_location
                                let arriving_location = product.arriving_location
                                setLocationAirportForm(arriving_location, "arrive_to")
                            } else {
                                Airport.arrivingAirport = null
                            }
                            
                            if (product.departing_location) {
                                let departing_location = product.departing_location
                                Airport.departingAirport = product.departing_location
                                setLocationAirportForm(departing_location, "depart_from")
                            } else {
                                Airport.departingAirport = null
                            }
                        }
                        
                        initializeValidator(airportDepartFromRules)
                        Airport.airportDepartValidator = $(_product_location_departing_airport_form).validate()
                        
                        initializeValidator(airportArriveToRules)
                        Airport.airportArriveValidator = $(_product_location_arriving_airport_form).validate()
                    }
                }
            }
            
            hideAirportForm("depart_from")
            hideAirportForm("arrive_to")
        })
    }
    
    return {
        airportDepartValidator: null,
        airportArriveValidator: null,
        arrivingAirport: null,
        departingAirport: null,
        resetAirportForm: function (type) {
            resetAirportForm(type)
        },
        init: function (settings) {
            init(settings)
        },
    }
})()
