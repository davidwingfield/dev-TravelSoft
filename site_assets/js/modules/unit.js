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
    const _calendar_loader = document.getElementById("calendar_loader")
    const _display_product_unit_name = document.getElementById("display_product_unit_name")
    const _product_edit_unit_form_clear_button = document.getElementById("product_edit_unit_form_clear_button")
    const _product_edit_unit_form_close_button = document.getElementById("product_edit_unit_form_close_button")
    const _table_unit_product_edit_add_new_button = document.getElementById("table_unit_product_edit_add_new_button")
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let $table_unit_product_edit = $(_table_unit_product_edit)
    let category_id
    let globalSelectedUnit = false
    let form_rules = {
        rules: {
            product_edit_unit_form_unit_min_nights: {
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
            resetForm()
            $table_unit_product_edit.clearSelectedRows()
            _product_edit_unit_form_unit_name_filter.value = ""
            _product_edit_unit_form_unit_name_filter.disabled = false
            _product_edit_unit_form_unit_name.disabled = true
        })
    
    $(_product_edit_unit_form_close_button)
        .on("click", function () {
            resetForm()
            $table_unit_product_edit.clearSelectedRows()
            _product_edit_unit_form_unit_name_filter.value = ""
            _product_edit_unit_form_unit_name_filter.disabled = false
            _product_edit_unit_form_unit_name.disabled = true
            hideForm()
        })
    
    $(_table_unit_product_edit_add_new_button)
        .on("click", function () {
            clearForm()
            $table_unit_product_edit.clearSelectedRows()
            disableFormFields()
            _product_edit_unit_form_unit_name_filter.value = ""
            _product_edit_unit_form_unit_name.value = ""
            _product_edit_unit_form_unit_name_filter.disabled = true
            _product_edit_unit_form_unit_name.disabled = false
            enableFormFields()
            loadForm()
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
        if (dataToSend) {
            let url = "/api/v1.0/units/remove"
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleUnitError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
            }
        }
    }
    
    const remove = function () {
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
                        
                        toastr.success(`Unit: ${unit.name} - has been removed`)
                        YearCalendar.endLoading()
                    }
                })
            }
        })
    }
    
    const updateProgress = function () {
        let units = Array.from(Unit.all.values())
        if (units.length === 0) {
            $(_panel_tab_unit).html(`Unit <span id="unitNeedsAttention" class="badge rounded-pill badge-notification bg-danger">!</span>`)
        } else {
            $(_panel_tab_unit).html(`Unit`)
        }
        
        Product.updateProgress()
    }
    
    const initAutoComplete = function () {
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
                    
                    //console.log("_product_edit_unit_form_unit_name_filter:autocomplete() - unit", unit)
                    
                    if (hasUnit) {
                        detail = set(hasUnit)
                        $table_unit_product_edit.loadRow(detail)
                    } else {
                        detail = set(unit)
                    }
                    
                    populateForm(detail)
                },
            })
    }
    
    const nameExists = function (name) {
        //console.log("Unit.nameExists(unit_name)", name)
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
                            $table_unit_product_edit.clearSelectedRows()
                            globalSelectedUnit = false
                            
                            clearForm()
                            
                            _product_edit_unit_form_unit_name.value = name
                            loadForm()
                            enableFormFields()
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
    }
    
    const handleUnitError = function (msg) {
        toastr.error(msg)
    }
    
    const fetchByName = function (dataToSend, callback) {
        let url = "/api/v1.0/units/validate"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleUnitError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
                return handleUnitError("Error Validating Unit")
            }
        } else {
            return handleUnitError("Error Loading Unit - Missing Data")
        }
    }
    
    const defaultDetail = function () {
        return {
            api_id: null,
            blurb: null,
            category_id: 1,
            cover_image: "/public/img/unit_cover_placeholder.jpg",
            created_by: user_id,
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
            modified_by: user_id,
            name: null,
            note: null,
            room_code: null,
            start_time: null,
            time_notes: null,
        }
    }
    
    const set = function (unit) {
        let detail = defaultDetail()
        
        if (unit) {
            detail.api_id = (unit.api_id) ? unit.api_id : null
            detail.blurb = (unit.blurb) ? unit.blurb : null
            detail.category_id = (unit.category_id) ? unit.category_id : null
            detail.cover_image = (unit.cover_image) ? unit.cover_image : "/public/img/unit_cover_placeholder.jpg"
            detail.created_by = (unit.created_by) ? unit.created_by : user_id
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
            detail.modified_by = (unit.modified_by) ? unit.modified_by : user_id
            detail.name = (unit.name) ? unit.name : null
            detail.note = (unit.note) ? unit.note : null
            detail.room_code = (unit.room_code) ? unit.room_code : null
            detail.start_time = (unit.start_time) ? unit.start_time : null
            detail.time_notes = (unit.time_notes) ? unit.time_notes : null
        }
        
        return detail
    }
    
    const save = function () {
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
                            
                            Unit.all.set(detail.id, detail)
                            
                            $table_unit_product_edit.loadRow(detail)
                            $table_unit_product_edit.jumpToRow(detail)
                            $table_unit_product_edit.clearSelectedRows()
                            
                            _product_edit_unit_form_unit_name_filter.value = ""
                            
                            PricingWorksheet.pricingWorksheet()
                            Pricing.resetForm()
                            YearCalendar.refresh()
                            
                            updateProgress()
                            clearForm()
                            hideForm()
                            
                            toastr.success(`Unit: ${detail.name} - has been updated`)
                            YearCalendar.endLoading()
                        }
                    })
                }
            })
        }
    }
    
    const validUnitRecord = function () {
        //console.log("Unit.validUnitRecord()", Unit)
        // ----
        let valid = $(_product_edit_unit_form).valid()
        let min_pax = (!isNaN(parseInt(_product_edit_unit_form_unit_min_pax.value))) ? parseInt(_product_edit_unit_form_unit_min_pax.value) : null
        let max_pax = (!isNaN(parseInt(_product_edit_unit_form_unit_max_pax.value))) ? parseInt(_product_edit_unit_form_unit_max_pax.value) : null
        let min_nights = (!isNaN(parseInt(_product_edit_unit_form_unit_min_nights.value))) ? parseInt(_product_edit_unit_form_unit_min_nights.value) : null
        let max_nights = (!isNaN(parseInt(_product_edit_unit_form_unit_max_nights.value))) ? parseInt(_product_edit_unit_form_unit_max_nights.value) : null
        
        if (min_pax !== null && max_pax !== null) {
            if (parseInt(max_pax) < parseInt(min_pax)) {
                setError(_product_edit_unit_form_unit_max_pax, "Pax is greater than minimum")
                valid = false
            } else {
                clearError(_product_edit_unit_form_unit_max_pax)
            }
        }
        
        if (min_nights !== null && max_nights !== null) {
            if (parseInt(max_nights) < parseInt(min_nights)) {
                setError(_product_edit_unit_form_unit_max_nights, "Pax is greater than minimum")
                valid = false
            } else {
                clearError(_product_edit_unit_form_unit_max_nights)
            }
        }
        
        return valid
    }
    
    const buildUnitRecord = function () {
        //console.log("Unit.buildUnitRecord()", Unit)
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
        }
        
        return remove_nulls(dataToSend)
    }
    
    const saveProductUnit = function (dataToSend, callback) {
        if (dataToSend) {
            let url = "/api/v1.0/units/update"
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    }
                })
            } catch (e) {
                console.log("error", e)
            }
        }
    }
    
    const clearForm = function () {
        //console.log("Unit:clearForm()", Unit)
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
    }
    
    const loadForm = function () {
        if (_edit_product_unit) {
            $(_edit_product_unit).show()
            _product_edit_unit_form_unit_name_filter.disabled = true
        }
    }
    
    const disableFormFields = function () {
        _product_edit_unit_form_unit_id.disabled = true
        _product_edit_unit_form_unit_name.disabled = true
        _product_edit_unit_form_unit_room_code.disabled = true
        _product_edit_unit_form_unit_min_nights.disabled = true
        _product_edit_unit_form_unit_max_nights.disabled = true
        _product_edit_unit_form_unit_min_pax.disabled = true
        _product_edit_unit_form_unit_max_pax.disabled = true
        _product_edit_unit_form_unit_description_short.disabled = true
        _product_edit_unit_form_unit_description_long.disabled = true
        _product_edit_unit_form_unit_enabled.disabled = true
    }
    
    const enableFormFields = function () {
        disableFormFields()
        _product_edit_unit_form_unit_id.disabled = true
        _product_edit_unit_form_unit_name.disabled = true
        _product_edit_unit_form_unit_room_code.disabled = true
        _product_edit_unit_form_unit_enabled.disabled = true
        // ----
        _product_edit_unit_form_unit_min_nights.disabled = false
        _product_edit_unit_form_unit_max_nights.disabled = false
        _product_edit_unit_form_unit_min_pax.disabled = false
        _product_edit_unit_form_unit_max_pax.disabled = false
        _product_edit_unit_form_unit_description_short.disabled = false
        _product_edit_unit_form_unit_description_long.disabled = false
        
    }
    
    const hideForm = function () {
        if (_edit_product_unit) {
            $(_edit_product_unit).hide()
            _product_edit_unit_form_unit_name_filter.disabled = false
            updateProgress()
        }
    }
    
    const resetForm = function () {
        clearForm()
        hideForm()
    }
    
    const populateForm = function (unit) {
        clearForm()
        if (unit) {
            _product_edit_unit_form_unit_name_filter.value = (unit.name) ? unit.name : ""
            _product_edit_unit_form_unit_id.value = (unit.id) ? unit.id : ""
            _product_edit_unit_form_unit_name.value = (unit.name) ? unit.name : ""
            _product_edit_unit_form_unit_room_code.value = (unit.room_code) ? unit.room_code : ""
            _product_edit_unit_form_unit_min_nights.value = (unit.min_nights) ? unit.min_nights : 1
            _product_edit_unit_form_unit_max_nights.value = (unit.max_nights) ? unit.max_nights : null
            _product_edit_unit_form_unit_min_pax.value = (unit.min_pax) ? unit.min_pax : 1
            _product_edit_unit_form_unit_max_pax.value = (unit.max_pax) ? unit.max_pax : null
            _product_edit_unit_form_unit_description_short.value = (unit.description_short) ? unit.description_short : ""
            _product_edit_unit_form_unit_description_long.value = (unit.description_long) ? unit.description_long : ""
            _product_edit_unit_form_unit_enabled.checked = true
            _display_product_unit_name.innerText = (unit.name) ? unit.name : ""
        }
        
        loadForm()
    }
    
    const loadAll = function (units) {
        Unit.all = new Map()
        
        if (!units) {
            units = []
        }
        
        $.each(units, function (k, unit) {
            let detail = set(unit)
            //console.log("detail", detail)
            Unit.all.set(detail.id, detail)
            $table_unit_product_edit.insertRow(detail)
        })
        
        updateProgress()
    }
    
    const buildProductEditTable = function () {
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
    }
    
    const init = function (settings) {
        let units = []
        
        if (settings) {
            units = settings
            if (settings.units) {
                units = settings.units
            }
        }
        
        if (_product_edit_unit_form) {
            initAutoComplete()
            validator_init(form_rules)
            Unit.validator = $(_product_edit_unit_form).validate()
        }
        
        if (_product_edit_unit_form_unit_name_filter) {
            buildProductEditTable()
            loadAll(units)
        }
        
        if (_edit_product_unit) {
            hideForm()
            updateProgress()
        }
        
    }
    
    const edit = function (unit) {
        populateForm(unit)
        enableFormFields()
        //console.log("Unit.edit(unit)", unit)
    }
    
    return {
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
