const Unit = (function () {
    "use strict"
    
    const _panel_tab_unit = document.getElementById("panel_tab_unit")
    const _button_remove_unit_from_product = document.getElementById("button_remove_unit_from_product")
    const _category_id = document.getElementById("category_id")
    const _product_id = document.getElementById("product_id")
    const _product_edit_unit_form = document.getElementById("product_edit_unit_form")
    const _product_edit_unit_form_submit_button = document.getElementById("product_edit_unit_form_submit_button")
    const _edit_product_unit = document.getElementById("edit_product_unit")
    const _product_edit_unit_form_unit_name_filter = document.getElementById("product_edit_unit_form_unit_name_filter")
    const _table_unit_product_edit = document.getElementById("table_unit_product_edit")
    const _product_edit_unit_form_unit_id = document.getElementById("product_edit_unit_form_unit_id")
    const _product_edit_unit_form_unit_name = document.getElementById("product_edit_unit_form_unit_name")
    const _product_edit_unit_form_unit_room_code = document.getElementById("product_edit_unit_form_unit_room_code")
    const _product_edit_unit_form_unit_min_nights = document.getElementById("product_edit_unit_form_unit_min_nights")
    const _product_edit_unit_form_unit_max_nights = document.getElementById("product_edit_unit_form_unit_max_nights")
    const _product_edit_unit_form_unit_min_pax = document.getElementById("product_edit_unit_form_unit_min_pax")
    const _product_edit_unit_form_unit_max_pax = document.getElementById("product_edit_unit_form_unit_max_pax")
    const _product_edit_unit_form_unit_description_short = document.getElementById("product_edit_unit_form_unit_description_short")
    const _product_edit_unit_form_unit_description_long = document.getElementById("product_edit_unit_form_unit_description_long")
    const _product_edit_unit_form_unit_enabled = document.getElementById("product_edit_unit_form_unit_enabled")
    const _display_product_unit_name = document.getElementById("display_product_unit_name")
    const _product_edit_unit_form_clear_button = document.getElementById("product_edit_unit_form_clear_button")
    const _product_edit_unit_form_close_button = document.getElementById("product_edit_unit_form_close_button")
    const _table_unit_product_edit_add_new_button = document.getElementById("table_unit_product_edit_add_new_button")
    const _unit_keywords = document.getElementById("unit_keywords")
    const _unit_amenities = document.getElementById("unit_amenities")
    const _product_edit_unit_display = document.getElementById("product_edit_unit_display")
    const _product_edit_unit_images = document.getElementById("unit_images")
    
    let counter = 1
    let $unit_keywords, $unit_amenities
    let tabLabel = "Unit"
    let nightsLabel = "Nights"
    let paxLabel = "Pax"
    let maxNightDefaultValue = null
    let minNightDefaultValue = 1
    let maxPaxDefaultValue = null
    let minPaxDefaultValue = 1
    let currentUnit = null
    let userId = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let $table_unit_product_edit = $(_table_unit_product_edit)
    let category_id
    let globalSelectedUnit = false
    let form_rules = {
        rules: {
            file_manager_unit_form_alt: { required: false },
            product_edit_unit_form_unit_min_nights: {
                required: true,
                number: true,
                min: 1,
            },
            product_edit_unit_form_unit_max_nights: {
                required: true,
                number: true,
                min: 1,
            },
            product_edit_unit_form_unit_min_pax: {
                required: true,
                number: true,
                min: 1,
            },
            product_edit_unit_form_unit_max_pax: {
                required: true,
                number: true,
                min: 1,
            },
        },
        messages: {
            product_edit_unit_form_unit_min_nights: {
                required: "Field Required",
                number: "Field Invalid",
                min: "Field Invalid",
            },
            product_edit_unit_form_unit_min_pax: {
                required: "Field Required",
                number: "Field Invalid",
                min: "Field Invalid",
            },
            product_edit_unit_form_unit_max_pax: {
                required: "Field Required",
                number: "Field Invalid",
                min: "Field Invalid",
            },
            product_edit_unit_form_unit_max_nights: {
                required: "Field Required",
                number: "Field Invalid",
                min: "Field Invalid",
            },
        },
    }
    
    $(_button_remove_unit_from_product)
        .on("click", function () {
            remove()
        })
    
    $(_product_edit_unit_form_submit_button)
        .on("click", function () {
            save()
        })
    
    $(_product_edit_unit_form_clear_button)
        .on("click", function () {
            console.log("Unit.product_edit_unit_form_clear_button:click()")
            // ----
            
            resetForm()
            
            $table_unit_product_edit.clearSelectedRows()
            
            _product_edit_unit_form_unit_name_filter.value = ""
            
            _product_edit_unit_form_unit_name_filter.disabled = false
            _product_edit_unit_form_unit_name.disabled = true
        })
    
    $(_product_edit_unit_form_close_button)
        .on("click", function () {
            console.log("Unit.product_edit_unit_form_close_button:click()")
            // ----
            
            resetForm()
            
            $table_unit_product_edit.clearSelectedRows()
            
            _product_edit_unit_form_unit_name_filter.value = ""
            
            _product_edit_unit_form_unit_name_filter.disabled = false
            _product_edit_unit_form_unit_name.disabled = true
        })
    
    $(_table_unit_product_edit_add_new_button)
        .on("click", function () {
            resetForm()
            $table_unit_product_edit.clearSelectedRows()
            disableFormFields()
            enableFormFields()
            loadForm()
            _product_edit_unit_form_unit_name_filter.value = ""
            _product_edit_unit_form_unit_name.value = ""
            _product_edit_unit_form_unit_name.disabled = false
            _product_edit_unit_form_unit_name_filter.disabled = true
        })
    
    $(_panel_tab_unit)
        .on("hide.bs.tab", function () {
            resetForm()
            $table_unit_product_edit.clearSelectedRows()
            _product_edit_unit_form_unit_name_filter.value = ""
            _product_edit_unit_form_unit_name_filter.disabled = false
            _product_edit_unit_form_unit_name.disabled = true
        })
    
    const removeProductUnit = function (dataToSend, callback) {
        console.groupCollapsed("Unit.removeProductUnit")
        // ----
        
        if (dataToSend) {
            let url = "/api/v1.0/units/remove"
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        handleUnitError("Oops: 1")
                    }
                })
            } catch (e) {
                //console.log("error", e)
            }
        }
        
        // ----
        console.groupEnd()
    }
    const remove = function () {
        console.groupCollapsed("Unit.remove")
        // ----
        
        confirmDialog(`Would you like to update? This change may affect your Pricing Worksheets.`, (ans) => {
            if (ans) {
                let dataToSend = {
                    unit_id: parseInt(_product_edit_unit_form_unit_id.value),
                    product_id: parseInt(_product_id.value),
                }
                
                removeProductUnit(dataToSend, function (data) {
                    let unitId = dataToSend.unit_id
                    if (data) {
                        
                        let unit = Unit.all.get(unitId)
                        
                        if (unit) {
                            $table_unit_product_edit.deleteRow(unit)
                        }
                        
                        Unit.all.delete(unitId)
                        
                        $table_unit_product_edit.clearSelectedRows()
                        
                        _product_edit_unit_form_unit_name_filter.value = ""
                        _product_edit_unit_form_unit_name_filter.disabled = false
                        
                        PricingWorksheet.pricingWorksheet()
                        Pricing.resetForm()
                        YearCalendar.refresh()
                        
                        updateProgress()
                        clearForm()
                        hideForm()
                        clearProductOverview(unit)
                        
                        YearCalendar.endLoading()
                        
                        toastr["warning"](`Unit: ${unit.name} - has been removed`, "Unit")
                    }
                })
            }
        })
        
        // ----
        console.groupEnd()
    }
    const updateProgress = function () {
        console.groupCollapsed("Unit.updateProgress")
        // ----
        
        let units = Array.from(Unit.all.values())
        
        if (units.length === 0) {
            $(_panel_tab_unit).html(`<span id="tab_span_unit">${tabLabel}</span> <span id="unitNeedsAttention" class="badge rounded-pill badge-notification bg-danger">!</span>`)
        } else {
            $(_panel_tab_unit).html(`<span id="tab_span_unit">${tabLabel}</span>`)
        }
        
        Product.updateProgress()
        
        // ----
        console.groupEnd()
    }
    const initAutoComplete = function () {
        console.groupCollapsed("Unit.initAutoComplete")
        // ----
        
        category_id = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
        
        $(_product_edit_unit_form_unit_name_filter)
            .on("click", function () {
                $(this).select()
            })
            .on("search", function () {
                globalSelectedUnit = false
                clearForm()
                hideForm()
            })
            .on("change", function () {
                setTimeout(function () {
                    //*
                    let unit_name = _product_edit_unit_form_unit_name_filter.value
                    
                    if (globalSelectedUnit === false) {
                        if (unit_name === "") {
                            globalSelectedUnit = false
                            clearForm()
                            hideForm()
                        } else {
                            nameExists(unit_name)
                        }
                    }
                    //*/
                }, 200)
            })
            .autocomplete({
                serviceUrl: "/api/v1.0/autocomplete/units",
                minChars: 2,
                cache: false,
                dataType: "json",
                triggerSelectOnValidInput: false,
                paramName: "st",
                params: { "category_id": category_id },
                onSelect: function (suggestion) {
                    $table_unit_product_edit.clearSelectedRows()
                    
                    if (!suggestion || !suggestion.data) {
                        return
                    }
                    
                    let detail
                    let unit = suggestion.data
                    let hasUnit = Unit.all.get(parseInt(unit.id))
                    
                    if (hasUnit) {
                        detail = set(hasUnit)
                        $table_unit_product_edit.loadRow(detail)
                        populateForm(detail)
                        _product_edit_unit_form_unit_name_filter.disabled = true
                        _button_remove_unit_from_product.disabled = false
                        $(_button_remove_unit_from_product).removeClass("disabled")
                        _product_edit_unit_form_unit_name.disabled = true
                    } else {
                        detail = set(unit)
                        populateForm(detail)
                        _product_edit_unit_form_unit_name_filter.disabled = true
                        _button_remove_unit_from_product.disabled = true
                        $(_button_remove_unit_from_product).addClass("disabled")
                        _product_edit_unit_form_unit_name.disabled = true
                    }
                    
                },
            })
        
        // ----
        console.groupEnd()
    }
    const nameExists = function (name) {
        console.groupCollapsed("Unit.nameExists")
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
                let unit = null
                
                if (data && data[0]) {
                    unit = data
                    if (data[0]) {
                        unit = data[0]
                    }
                }
                
                if (unit) {
                    let hasUnit = Unit.all.get(parseInt(unit.id))
                    let detail
                    //console.log("_product_edit_unit_form_unit_name_filter:autocomplete() - unit", unit)
                    
                    if (hasUnit) {
                        detail = set(hasUnit)
                        $table_unit_product_edit.loadRow(detail)
                    } else {
                        detail = set(unit)
                    }
                    
                    populateForm(detail)
                } else {
                    confirmDialog(`The unit: ${name} does not exist exists. Would you like to create it?`, (ans) => {
                        if (ans) {
                            let category_id = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
                            let unitName = (name) ? name : null
                            
                            let newUnit = removeNulls({
                                category_id: category_id,
                                name: unitName,
                            })
                            
                            try {
                                sendPostRequest("/api/v1.0/units/new", newUnit, function (data, status, xhr) {
                                    
                                    if (data) {
                                        let unit = data
                                        if (data[0]) {
                                            unit = data[0]
                                        }
                                        
                                        let detail = set(unit)
                                        
                                        //console.log("detail", detail)
                                        
                                        $table_unit_product_edit.clearSelectedRows()
                                        globalSelectedUnit = false
                                        
                                        clearForm()
                                        
                                        //_product_edit_unit_form_unit_name.value = name
                                        populateForm(detail)
                                        enableFormFields()
                                    } else {
                                    
                                    }
                                })
                            } catch (e) {
                                //console.log("error", e)
                            }
                            
                        } else {
                            resetForm()
                            $table_unit_product_edit.clearSelectedRows()
                            _product_edit_unit_form_unit_name_filter.value = ""
                            _product_edit_unit_form_unit_name_filter.disabled = false
                            _product_edit_unit_form_unit_name.disabled = true
                        }
                    })
                }
            })
        }
        
        // ----
        console.groupEnd()
    }
    const handleUnitError = function (msg, title, level) {
        console.groupCollapsed("Unit.handleUnitError")
        // ----
        
        if (!msg) {
            msg = "Unit Error"
        }
        
        if (!title) {
            title = "Unit"
        }
        
        if (!level) {
            level = "error"
        }
        
        toastr[level](`${msg}`, title)
        
        // ----
        console.groupEnd()
    }
    const fetchByName = function (dataToSend, callback) {
        console.groupCollapsed("Unit.fetchByName")
        // ----
        
        let url = "/api/v1.0/units/validate"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        handleUnitError("Oops: 1")
                    }
                })
            } catch (e) {
                //console.log("error", e)
                handleUnitError("Error Validating Unit")
            }
        } else {
            handleUnitError("Error Loading Unit - Missing Data")
        }
        
        // ----
        console.groupEnd()
    }
    const defaultDetail = function () {
        console.groupCollapsed("Unit.defaultDetail")
        // ----
        
        return {
            api_id: null,
            blurb: null,
            category_id: 1,
            cover_image: "/public/img/unit_cover_placeholder.jpg",
            created_by: userId,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
            description_long: null,
            description_short: null,
            enabled: 1,
            end_time: null,
            id: null,
            max_nights: null,
            max_pax: null,
            meeting_point: null,
            min_nights: 1,
            min_pax: 1,
            modified_by: userId,
            name: null,
            note: null,
            room_code: null,
            start_time: null,
            time_notes: null,
            keywords: [],
            amenities: [],
            images: [],
        }
        
        // ----
        console.groupEnd()
    }
    const set = function (unit) {
        console.groupCollapsed("Unit.set")
        // ----
        
        let detail = defaultDetail()
        
        if (unit) {
            detail.api_id = (unit.api_id) ? unit.api_id : null
            detail.blurb = (unit.blurb) ? unit.blurb : null
            detail.category_id = (unit.category_id) ? unit.category_id : null
            detail.cover_image = (unit.cover_image) ? unit.cover_image : "/public/img/unit_cover_placeholder.jpg"
            detail.created_by = (unit.created_by) ? unit.created_by : userId
            detail.date_created = (unit.date_created) ? unit.date_created : formatDateMySQL()
            detail.date_modified = (unit.date_modified) ? unit.date_modified : formatDateMySQL()
            detail.description_long = (unit.description_long) ? unit.description_long : null
            detail.description_short = (unit.description_short) ? unit.description_short : null
            detail.enabled = (unit.enabled) ? unit.enabled : 1
            detail.end_time = (unit.end_time) ? unit.end_time : null
            detail.id = (unit.id) ? unit.id : null
            detail.max_nights = (unit.max_nights) ? unit.max_nights : null
            detail.max_pax = (unit.max_pax) ? unit.max_pax : null
            detail.meeting_point = (unit.meeting_point) ? unit.meeting_point : null
            detail.min_nights = (unit.min_nights) ? unit.min_nights : 1
            detail.min_pax = (unit.min_pax) ? unit.min_pax : 1
            detail.modified_by = (unit.modified_by) ? unit.modified_by : userId
            detail.name = (unit.name) ? unit.name : null
            detail.note = (unit.note) ? unit.note : null
            detail.room_code = (unit.room_code) ? unit.room_code : null
            detail.start_time = (unit.start_time) ? unit.start_time : null
            detail.time_notes = (unit.time_notes) ? unit.time_notes : null
            detail.amenities = (unit.amenities) ? unit.amenities : null
            detail.keywords = (unit.keywords) ? unit.keywords : null
            detail.images = (unit.images) ? unit.images : []
        }
        
        // ----
        console.groupEnd()
        return detail
    }
    const clearProductOverview = function (unit) {
        console.groupCollapsed("Unit.clearProductOverview")
        // ----
        
        let color_scheme, product_unit_detail
        
        if (!unit) {
            //console.log("No Unit", unit)
            return
        }
        
        let unitId = (!isNaN(parseInt(unit.id))) ? parseInt(unit.id) : null
        
        if (unitId) {
            $(`#product_edit_unit_display_${unitId}`).remove()
        }
        
        // ----
        console.groupEnd()
    }
    const buildProductOverview = function (unit) {
        console.groupCollapsed("Unit.buildProductOverview")
        // ----
        
        let color_scheme, product_unit_detail
        
        if (!unit) {
            //console.log("unit", unit)
            //console.log("color_scheme", season.color_scheme)
            //console.log("product_season_detail", season.product_season_detail)
            return
        }
        
        let unitAmenities = (unit.ammenities) ? getListOfIds(unit.ammenities) : []
        let unitApiId = null
        let unitBlurb = null
        let unitCategoryId = (!isNaN(parseInt(unit.category_id))) ? parseInt(unit.category_id) : null
        let unitCoverImage = "/public/img/unit_cover_placeholder.jpg"
        let unitDescriptionLong = null
        let unitDescriptionShort = null
        let unitEnabled = 1
        let unitEndTime = null
        let unitId = (!isNaN(parseInt(unit.id))) ? parseInt(unit.id) : null
        let unitKeywords = (unit.keywords) ? getListOfIds(unit.keywords) : []
        let unitMaxNights = (!isNaN(parseInt(unit.max_nights))) ? parseInt(unit.max_nights) : null
        let unitMaxPax = (!isNaN(parseInt(unit.max_pax))) ? parseInt(unit.max_pax) : null
        let unitMeeting_point = null
        let unitMinNights = (!isNaN(parseInt(unit.min_nights))) ? parseInt(unit.min_nights) : null
        let unitMinPax = (!isNaN(parseInt(unit.min_pax))) ? parseInt(unit.min_pax) : null
        let unitName = (unit.name) ? unit.name : null
        let unitRoomCode = (unit.room_code) ? unit.room_code : null
        let unitStartTime = (unit.start_time) ? unit.start_time : null
        let unitTimeNotes = (unit.time_notes) ? unit.time_notes : null
        let colorSchemeId = counter
        let colorSchemeSelected = colorScheme.get(colorSchemeId)
        if (counter >= 16) {
            counter = 0
        }
        counter++
        
        let backgroundColor = (colorSchemeSelected && colorSchemeSelected.backGround) ? colorSchemeSelected.backGround : "#fff"
        let textColor = (colorSchemeSelected && colorSchemeSelected.textColor) ? colorSchemeSelected.textColor : "#0a070d"
        let borderColor = (colorSchemeSelected && colorSchemeSelected.borderColor) ? colorSchemeSelected.borderColor : "#0a070d"
        
        backgroundColor = shadeColor(backgroundColor, 30)
        borderColor = shadeColor(borderColor, -30)
        
        let _unit = Unit.all.get(unitId)
        
        if (_unit) {
            clearProductOverview(_unit)
        }
        
        $(_product_edit_unit_display).append(`
            <div id="product_edit_unit_display_${unitId}" class="col-12 col-sm-12 col-md-4 px-1">
                <div class="card card-body mb-2" style="background-color:${backgroundColor}; color:${textColor};border:solid 1px ${borderColor};">
                    <h5 class="card-title w-100 text-truncate" style="color:${textColor};border-color:${borderColor}">${unitName}</h5>
                    <h6 class="card-subtitle my-2 text-muted" style="color:${textColor}">${unitRoomCode}</h6>
                    <table class="table table-sm" style="color:${textColor};border-color:${borderColor}">
                        <thead>
                            <tr style="font-size:.85rem;font-weight:400;color:#0a070d;">
                                <th style="font-size:.85rem;font-weight:400;color:#0a070d;">&nbsp;</th>
                                <th style="font-size:.85rem;font-weight:400;color:#0a070d;">Min</th>
                                <th style="font-size:.85rem;font-weight:400;color:#0a070d;">Max</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-top-color: ${borderColor} !important;">
                                <th style="border-top-color: ${borderColor} !important;">Pax:</th>
                                <td>${unitMinPax}</td>
                                <td>${unitMaxPax}</td>
                            </tr>
                            <tr>
                                <th>Nights:</th>
                                <td>${unitMinNights}</td>
                                <td>${unitMaxNights}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `)
        
        // ----
        console.groupEnd()
    }
    const validUnitRecord = function () {
        console.groupCollapsed("Unit.validUnitRecord")
        // ----
        
        //let valid = $(_product_edit_unit_form).valid()
        let valid = true
        let min_pax = (!isNaN(parseInt(_product_edit_unit_form_unit_min_pax.value))) ? parseInt(_product_edit_unit_form_unit_min_pax.value) : null
        let max_pax = (!isNaN(parseInt(_product_edit_unit_form_unit_max_pax.value))) ? parseInt(_product_edit_unit_form_unit_max_pax.value) : null
        let min_nights = (!isNaN(parseInt(_product_edit_unit_form_unit_min_nights.value))) ? parseInt(_product_edit_unit_form_unit_min_nights.value) : null
        let max_nights = (!isNaN(parseInt(_product_edit_unit_form_unit_max_nights.value))) ? parseInt(_product_edit_unit_form_unit_max_nights.value) : null
        
        if (min_pax !== null && max_pax !== null) {
            if (parseInt(max_pax) < parseInt(min_pax)) {
                setError(_product_edit_unit_form_unit_max_pax, "Pax is greater than minimum")
                valid = false
            } else {
                console.log("clearError")
                clearError(_product_edit_unit_form_unit_max_pax)
            }
        }
        
        if (min_nights !== null && max_nights !== null) {
            if (parseInt(max_nights) < parseInt(min_nights)) {
                setError(_product_edit_unit_form_unit_max_nights, "Nights is greater than minimum")
                valid = false
            } else {
                console.log("clearError")
                clearError(_product_edit_unit_form_unit_max_nights)
            }
        }
        
        console.log("valid", fetchFormErrors($(_product_edit_unit_form), form_rules))
        
        // ----
        console.groupEnd()
        return valid
    }
    const buildUnitRecord = function () {
        console.groupCollapsed("Unit.buildUnitRecord")
        // ----
        
        let dataToSend = {
            id: (!isNaN(parseInt(_product_edit_unit_form_unit_id.value))) ? parseInt(_product_edit_unit_form_unit_id.value) : null,
            product_id: (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null,
            category_id: (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null,
            min_pax: parseInt(_product_edit_unit_form_unit_min_pax.value) ? parseInt(_product_edit_unit_form_unit_min_pax.value) : null,
            max_pax: parseInt(_product_edit_unit_form_unit_max_pax.value) ? parseInt(_product_edit_unit_form_unit_max_pax.value) : null,
            min_nights: parseInt(_product_edit_unit_form_unit_min_nights.value) ? parseInt(_product_edit_unit_form_unit_min_nights.value) : null,
            max_nights: parseInt(_product_edit_unit_form_unit_max_nights.value) ? parseInt(_product_edit_unit_form_unit_max_nights.value) : null,
            api_id: null,
            name: (_product_edit_unit_form_unit_name.value) ? _product_edit_unit_form_unit_name.value : null,
            room_code: (_product_edit_unit_form_unit_room_code.value) ? _product_edit_unit_form_unit_room_code.value : null,
            blurb: null,
            cover_image: "",
            meeting_point: null,
            time_notes: null,
            start_time: null,
            end_time: null,
            description_short: (_product_edit_unit_form_unit_description_short.value) ? _product_edit_unit_form_unit_description_short.value : null,
            description_long: (_product_edit_unit_form_unit_description_long.value) ? _product_edit_unit_form_unit_description_long.value : null,
            enabled: (_product_edit_unit_form_unit_enabled.checked === true) ? 1 : 0,
            keywords: $unit_keywords.build(),
            amenities: $unit_amenities.build(),
        }
        
        // ----
        console.groupEnd()
        return remove_nulls(dataToSend)
    }
    const save = function () {
        console.groupCollapsed("Unit.save")
        // ----
        
        if (validUnitRecord()) {
            confirmDialog(`Would you like to update? This change may affect your Pricing Worksheets.`, (ans) => {
                if (ans) {
                    let dataToSend = buildUnitRecord()
                    saveProductUnit(dataToSend, function (data) {
                        if (data) {
                            let detail = set((data[0]) ? data[0] : data)
                            let hasUnit = Unit.all.get(detail.id)
                            
                            if (hasUnit) {
                                $table_unit_product_edit.updateRow(detail)
                            } else {
                                $table_unit_product_edit.insertRow(detail)
                            }
                            
                            buildProductOverview(detail)
                            
                            Unit.all.set(detail.id, detail)
                            
                            PricingWorksheet.pricingWorksheet()
                            Pricing.resetForm()
                            YearCalendar.refresh()
                            
                            resetForm()
                            updateProgress()
                            
                            $table_unit_product_edit.clearSelectedRows()
                            _product_edit_unit_form_unit_name_filter.value = ""
                            _product_edit_unit_form_unit_name_filter.disabled = false
                            _product_edit_unit_form_unit_name.disabled = true
                            
                            toastr["success"](`Unit: ${detail.name} - has been updated`, "Unit")
                            YearCalendar.endLoading()
                        }
                    })
                }
            })
        }
        
        // ----
        console.groupEnd()
    }
    const saveProductUnit = function (dataToSend, callback) {
        console.groupCollapsed("Unit.saveProductUnit")
        // ----
        
        if (dataToSend) {
            let url = "/api/v1.0/units/update"
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    }
                })
            } catch (e) {
                //console.log("error", e)
                return handleUnitError("Error")
            }
        }
        
        // ----
        console.groupEnd()
    }
    const disableFormFields = function () {
        console.groupCollapsed("Unit.disableFormFields")
        // ----
        
        _product_edit_unit_form_unit_id.disabled = true
        _product_edit_unit_form_unit_room_code.disabled = true
        _product_edit_unit_form_unit_min_nights.disabled = true
        _product_edit_unit_form_unit_min_pax.disabled = true
        
        _product_edit_unit_form_unit_name.disabled = false
        _product_edit_unit_form_unit_max_nights.disabled = false
        _product_edit_unit_form_unit_max_pax.disabled = false
        _product_edit_unit_form_unit_description_short.disabled = false
        _product_edit_unit_form_unit_description_long.disabled = false
        _product_edit_unit_form_unit_enabled.disabled = false
        
        // ----
        console.groupEnd()
    }
    const initForm = function () {
        console.groupCollapsed("Unit.initForm")
        // ----
        
        let categoryId = (document.getElementById("category_id") && !isNaN(parseInt(document.getElementById("category_id").value))) ? parseInt(document.getElementById("category_id").value) : null
        
        if (categoryId) {
            //console.log("categoryId", categoryId)
            switch (categoryId) {
                case 1:
                    maxNightDefaultValue = null
                    minNightDefaultValue = 1
                    maxPaxDefaultValue = null
                    minPaxDefaultValue = 1
                    
                    paxLabel = "Pax"
                    nightsLabel = "Nights"
                    tabLabel = "Units"
                    break
                case 2:
                    maxNightDefaultValue = 1
                    minNightDefaultValue = 1
                    maxPaxDefaultValue = 1
                    minPaxDefaultValue = 1
                    
                    paxLabel = "Pax"
                    nightsLabel = "Days"
                    tabLabel = "Seat"
                    break
                case 3:
                    maxNightDefaultValue = null
                    minNightDefaultValue = 1
                    maxPaxDefaultValue = null
                    minPaxDefaultValue = 1
                    
                    paxLabel = "Pax"
                    nightsLabel = "Days"
                    tabLabel = "Units"
                    break
                case 4:
                    maxNightDefaultValue = null
                    minNightDefaultValue = 1
                    maxPaxDefaultValue = null
                    minPaxDefaultValue = 1
                    
                    paxLabel = "Pax"
                    nightsLabel = "Nights"
                    tabLabel = "Units"
                    break
                case 5:
                    maxNightDefaultValue = null
                    minNightDefaultValue = 1
                    maxPaxDefaultValue = null
                    minPaxDefaultValue = 1
                    
                    paxLabel = "Pax"
                    nightsLabel = "Nights"
                    tabLabel = "Units"
                    break
                default:
                    maxNightDefaultValue = null
                    minNightDefaultValue = 1
                    maxPaxDefaultValue = null
                    minPaxDefaultValue = 1
                    
                    paxLabel = "Pax"
                    nightsLabel = "Nights"
                    tabLabel = "Units"
            }
            
            $unit_keywords = $(_unit_keywords).BuildKeyword([])
            $unit_amenities = $(_unit_amenities).BuildKeyword([])
        }
        
        // ----
        console.groupEnd()
    }
    const loadAll = function (units) {
        console.groupCollapsed("Unit.loadAll")
        // ----
        
        Unit.all = new Map()
        
        if (!units) {
            units = []
        }
        
        $.each(units, function (k, unit) {
            console.log("unit", unit)
            let detail = set(unit)
            
            $table_unit_product_edit.insertRow(detail)
            buildProductOverview(detail)
            Unit.all.set(detail.id, detail)
        })
        
        updateProgress()
        
        // ----
        console.groupEnd()
    }
    const buildProductEditTable = function () {
        console.groupCollapsed("Unit.buildProductEditTable")
        // ----
        
        category_id = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
        
        if (category_id === 1) {
            Unit.byValue = "Night"
            Unit.paxValue = "Pax"
        } else {
            Unit.byValue = "Day"
            Unit.paxValue = "Pax"
        }
        
        $table_unit_product_edit = $(_table_unit_product_edit).table({
            table_type: "display_list",
            data: [],
            columnDefs: [
                {
                    title: "Room Code",
                    targets: 0,
                    data: "room_code",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "Name",
                    targets: 1,
                    data: "name",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "Min " + Unit.byValue + "(s)",
                    targets: 2,
                    data: "min_nights",
                    render: function (data, type, row, meta) {
                        let nights = 1
                        if (data === null) {
                            nights = "null"
                        } else {
                            nights = data
                        }
                        return "<span style='white-space: nowrap;'>" + nights + "</span>"
                    },
                },
                {
                    title: "Max " + Unit.byValue + "(s)",
                    targets: 3,
                    data: "max_nights",
                    render: function (data, type, row, meta) {
                        let nights = 1
                        if (data === null) {
                            nights = "&infin;"
                        } else {
                            nights = data
                        }
                        return "<span style='white-space: nowrap;'>" + nights + "</span>"
                    },
                },
                {
                    title: "Min " + Unit.paxValue + "",
                    targets: 4,
                    data: "min_pax",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "Max " + Unit.paxValue + "",
                    targets: 5,
                    data: "max_pax",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
            ],
            rowClick: Unit.edit,
        })
        
        // ----
        console.groupEnd()
    }
    const init = function (settings) {
        console.groupCollapsed("Unit.init")
        // ----
        
        let units = []
        
        if (settings) {
            console.log("settings", settings)
            units = (settings.units) ? settings.units : []
            
        }
        
        if (_product_edit_unit_form) {
            initAutoComplete()
            validator_init(form_rules)
            Unit.validator = $(_product_edit_unit_form).validate()
            initForm()
        }
        
        if (_product_edit_unit_images) {
            Unit.unitImages = $("#unit_images").fileManager({
                height: 400,
                source: "unit",
                //sourceId: 204,
                images: [],
            })
        }
        
        if (_product_edit_unit_form_unit_name_filter) {
            buildProductEditTable()
            loadAll(units)
        }
        
        if (_edit_product_unit) {
            resetForm()
            updateProgress()
        }
        
        // ----
        console.groupEnd()
    }
    const edit = function (unit) {
        console.groupCollapsed("Unit.edit")
        // ----
        
        let currentUnitId = (currentUnit && currentUnit.id && (!isNaN(parseInt(currentUnit.id)))) ? parseInt(currentUnit.id) : null
        let editUnitId = (unit && unit.id && (!isNaN(parseInt(unit.id)))) ? parseInt(unit.id) : null
        
        if (currentUnitId && editUnitId) {
            if (currentUnitId === editUnitId) {
                return
            }
        }
        
        currentUnit = unit
        
        populateForm(unit)
        Unit.unitImages.load({
            height: 400,
            source: "unit",
            sourceId: unit.id,
            images: unit.images,
        })
        enableFormFields()
        
        // ----
        console.groupEnd()
    }
    const clearForm = function () {
        console.groupCollapsed("Unit.clearForm")
        // ----
        
        _product_edit_unit_form_unit_id.value = ""
        _product_edit_unit_form_unit_name.value = ""
        _product_edit_unit_form_unit_room_code.value = ""
        _product_edit_unit_form_unit_min_nights.value = 1
        _product_edit_unit_form_unit_max_nights.value = ""
        _product_edit_unit_form_unit_min_pax.value = 1
        _product_edit_unit_form_unit_max_pax.value = ""
        _product_edit_unit_form_unit_description_short.value = ""
        _product_edit_unit_form_unit_description_long.value = ""
        _product_edit_unit_form_unit_enabled.checked = true
        
        // ----
        console.groupEnd()
    }
    const hideForm = function () {
        console.groupCollapsed("Unit.hideForm")
        // ----
        
        if (_edit_product_unit) {
            $(_edit_product_unit).hide()
            _product_edit_unit_form_unit_name_filter.disabled = false
            updateProgress()
        }
        
        // ----
        console.groupEnd()
    }
    const resetForm = function () {
        console.groupCollapsed("Unit.resetForm")
        // ----
        
        let categoryId = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
        
        clearForm()
        hideForm()
        
        let labelMinPax, labelMaxPax, labelMinNights, labelMaxNights,
            disabledMinPax, disabledMaxPax, disabledMinNights, disabledMaxNights,
            valueMinPax, valueMaxPax, valueMinNights, valueMaxNights,
            labelRoomCode, disabledRoomCode
        
        switch (categoryId) {
            case 1:
                labelMinPax = "Minimum Pax:"
                labelMaxPax = "Maximum Pax:"
                labelMinNights = "Minimum Nights:"
                labelMaxNights = "Maximum Nights:"
                
                labelRoomCode = "Room Code:"
                
                disabledMinPax = false
                disabledMaxPax = false
                disabledMinNights = false
                disabledMaxNights = false
                disabledRoomCode = false
                
                valueMinPax = 1
                valueMaxPax = ""
                valueMinNights = 1
                valueMaxNights = ""
                break
            case 2:
                labelMinPax = "Minimum Pax:"
                labelMaxPax = "Maximum Pax:"
                labelMinNights = "Minimum Days:"
                labelMaxNights = "Maximum Days:"
                
                labelRoomCode = "Seat Code:"
                
                valueMinPax = 1
                valueMaxPax = 1
                valueMinNights = 1
                valueMaxNights = 1
                
                break
            case 3:
                labelMinPax = "Minimum Pax:"
                labelMaxPax = "Maximum Pax:"
                labelMinNights = "Minimum Days:"
                labelMaxNights = "Maximum Days:"
                
                labelRoomCode = "Unit Code:"
                
                valueMinPax = 1
                valueMaxPax = 1
                valueMinNights = 1
                valueMaxNights = 1
                
                break
            case 4:
                labelMinPax = "Minimum Pax:"
                labelMaxPax = "Maximum Pax:"
                labelMinNights = "Minimum Days:"
                labelMaxNights = "Maximum Days:"
                
                labelRoomCode = "Seat Code:"
                
                valueMinPax = 1
                valueMaxPax = 1
                valueMinNights = 1
                valueMaxNights = 1
                
                break
            default:
                labelMinPax = "Minimum Pax:"
                labelMaxPax = "Maximum Pax:"
                labelMinNights = "Minimum Nights:"
                labelMaxNights = "Maximum Nights:"
                
                disabledMinPax = false
                disabledMaxPax = false
                disabledMinNights = false
                disabledMaxNights = false
                
                valueMinPax = 1
                valueMaxPax = ""
                valueMinNights = 1
                valueMaxNights = ""
        }
        
        let labels = document.getElementsByTagName("LABEL")
        
        for (let i = 0; i < labels.length; i++) {
            if (labels[i].htmlFor !== '') {
                let elem = document.getElementById(labels[i].htmlFor)
                if (elem) {
                    elem.label = labels[i]
                }
            }
        }
        
        _product_edit_unit_form_unit_min_nights.value = valueMinNights
        _product_edit_unit_form_unit_max_nights.value = valueMaxNights
        _product_edit_unit_form_unit_min_pax.value = valueMinPax
        _product_edit_unit_form_unit_max_pax.value = valueMaxPax
        
        _product_edit_unit_form_unit_min_nights.label.innerHTML = labelMinNights
        _product_edit_unit_form_unit_max_nights.label.innerHTML = labelMaxNights
        _product_edit_unit_form_unit_min_pax.label.innerHTML = labelMinPax
        _product_edit_unit_form_unit_max_pax.label.innerHTML = labelMaxPax
        _product_edit_unit_form_unit_room_code.label.innerHTML = labelRoomCode
        
        _product_edit_unit_form_unit_min_nights.disabled = disabledMinNights
        _product_edit_unit_form_unit_max_nights.disabled = disabledMaxNights
        _product_edit_unit_form_unit_min_pax.disabled = disabledMinPax
        _product_edit_unit_form_unit_max_pax.disabled = disabledMaxPax
        
        $unit_amenities.clear()
        $unit_keywords.clear()
        
        // ----
        console.groupEnd()
    }
    const loadForm = function () {
        console.groupCollapsed("Unit.loadForm")
        // ----
        
        if (_edit_product_unit) {
            $('label[for="product_edit_unit_form_unit_min_nights"]').html(`Minimum ${nightsLabel}`)
            $('label[for="product_edit_unit_form_unit_max_nights"]').html(`Maximum ${nightsLabel}`)
            $('label[for="product_edit_unit_form_unit_min_pax"]').html(`Minimum ${paxLabel}`)
            $('label[for="product_edit_unit_form_unit_max_pax"]').html(`Maximum ${paxLabel}`)
            
            $(_edit_product_unit).show()
            _product_edit_unit_form_unit_name_filter.disabled = true
        }
        
        // ----
        console.groupEnd()
    }
    const populateForm = function (unit) {
        console.groupCollapsed("Unit.populateForm")
        // ----
        
        resetForm()
        
        if (unit) {
            let categoryId = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
            let unit_keywords = (unit.keywords) ? unit.keywords : []
            let unit_amenities = (unit.amenities) ? unit.amenities : []
            
            if (categoryId === 2 || categoryId === 4) {
                _product_edit_unit_form_unit_min_nights.value = (unit.min_nights) ? unit.min_nights : 1
                _product_edit_unit_form_unit_max_nights.value = (unit.max_nights) ? unit.max_nights : 1
                _product_edit_unit_form_unit_min_pax.value = (unit.min_pax) ? unit.min_pax : 1
                _product_edit_unit_form_unit_max_pax.value = (unit.max_pax) ? unit.max_pax : 1
                
                _product_edit_unit_form_unit_min_nights.disabled = true
                _product_edit_unit_form_unit_max_nights.disabled = true
                _product_edit_unit_form_unit_min_pax.disabled = true
                _product_edit_unit_form_unit_max_pax.disabled = true
                _product_edit_unit_form_unit_room_code.disabled = true
                
            } else {
                _product_edit_unit_form_unit_min_nights.value = (unit.min_nights) ? unit.min_nights : 1
                _product_edit_unit_form_unit_max_nights.value = (unit.max_nights) ? unit.max_nights : null
                _product_edit_unit_form_unit_min_pax.value = (unit.min_pax) ? unit.min_pax : 1
                _product_edit_unit_form_unit_max_pax.value = (unit.max_pax) ? unit.max_pax : null
                
                _product_edit_unit_form_unit_min_nights.disabled = false
                _product_edit_unit_form_unit_max_nights.disabled = false
                _product_edit_unit_form_unit_min_pax.disabled = false
                _product_edit_unit_form_unit_max_pax.disabled = false
                _product_edit_unit_form_unit_room_code.disabled = false
                
            }
            
            _product_edit_unit_form_unit_name_filter.value = (unit.name) ? unit.name : ""
            _product_edit_unit_form_unit_id.value = (unit.id) ? unit.id : ""
            _product_edit_unit_form_unit_name.value = (unit.name) ? unit.name : ""
            _product_edit_unit_form_unit_room_code.value = (unit.room_code) ? unit.room_code : ""
            _product_edit_unit_form_unit_description_short.value = (unit.description_short) ? unit.description_short : ""
            _product_edit_unit_form_unit_description_long.value = (unit.description_long) ? unit.description_long : ""
            _product_edit_unit_form_unit_enabled.checked = true
            _display_product_unit_name.innerText = (unit.name) ? unit.name : ""
            
            $unit_keywords.set(unit_keywords)
            $unit_amenities.set(unit_amenities)
            
        }
        
        loadForm()
        
        // ----
        console.groupEnd()
    }
    const enableFormFields = function () {
        console.groupCollapsed("Unit.enableFormFields")
        // ----
        
        disableFormFields()
        
        _product_edit_unit_form_unit_id.disabled = true
        _product_edit_unit_form_unit_name.disabled = true
        _product_edit_unit_form_unit_room_code.disabled = true
        _product_edit_unit_form_unit_enabled.disabled = true
        
        _product_edit_unit_form_unit_description_short.disabled = false
        _product_edit_unit_form_unit_description_long.disabled = false
        
        // ----
        console.groupEnd()
    }
    
    return {
        unitImages: null,
        all: new Map(),
        byValue: "Night",
        paxValue: "Pax",
        validator: null,
        edit: function (unit) {
            edit(unit)
        },
        init: function (settings) {
            init(settings)
        },
    }
})()
