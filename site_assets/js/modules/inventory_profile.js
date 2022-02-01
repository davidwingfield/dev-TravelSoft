const InventoryProfile = (function () {
    "use strict"
    const _calendar_loader = document.getElementById("calendar_loader")
    const _panel_tab_inventory = document.getElementById("panel_tab_inventory")
    const _table_profile_product_edit_add_new_button = document.getElementById("table_profile_product_edit_add_new_button")
    const _edit_product_profile = document.getElementById("edit_product_profile")
    const _product_edit_profile_form_profile_transfer_sales_types_id_block = document.getElementById("product_edit_profile_form_profile_transfer_sales_types_id_block")
    const _product_edit_profile_form_profile_allot_by_id_block = document.getElementById("product_edit_profile_form_profile_allot_by_id_block")
    const _product_edit_profile_form_profile_name_filter = document.getElementById("product_edit_profile_form_profile_name_filter")
    const _table_profile_product_edit = document.getElementById("table_profile_product_edit")
    const _product_edit_profile_form_profile_days_out_block = document.getElementById("product_edit_profile_form_profile_days_out_block")
    const _product_edit_profile_form_profile_expires_block = document.getElementById("product_edit_profile_form_profile_expires_block")
    const _product_edit_profile_form_profile_quantity_block = document.getElementById("product_edit_profile_form_profile_quantity_block")
    const _product_edit_profile_form_profile_release_amt_block = document.getElementById("product_edit_profile_form_profile_release_amt_block")
    const _product_edit_profile_form = document.getElementById("product_edit_profile_form")
    const _product_edit_profile_form_profile_id = document.getElementById('product_edit_profile_form_profile_id')
    const _product_edit_profile_form_profile_name = document.getElementById('product_edit_profile_form_profile_name')
    const _product_edit_profile_form_profile_enabled = document.getElementById('product_edit_profile_form_profile_enabled')
    const _product_edit_profile_form_profile_sales_types_id = document.getElementById('product_edit_profile_form_profile_sales_types_id')
    const _product_edit_profile_form_profile_allot_by_id = document.getElementById('product_edit_profile_form_profile_allot_by_id')
    const _product_edit_profile_form_profile_transfer_sales_types_id = document.getElementById('product_edit_profile_form_profile_transfer_sales_types_id')
    const _product_edit_profile_form_profile_days_out = document.getElementById('product_edit_profile_form_profile_days_out')
    const _product_edit_profile_form_profile_quantity = document.getElementById('product_edit_profile_form_profile_quantity')
    const _product_edit_profile_form_profile_release_amt = document.getElementById('product_edit_profile_form_profile_release_amt')
    const _product_edit_profile_form_profile_min_length_days = document.getElementById('product_edit_profile_form_profile_min_length_days')
    const _product_edit_profile_form_profile_min_duration = document.getElementById('product_edit_profile_form_profile_min_duration')
    const _product_edit_profile_form_profile_max_duration = document.getElementById('product_edit_profile_form_profile_max_duration')
    const _product_edit_profile_form_profile_equal_duration = document.getElementById('product_edit_profile_form_profile_equal_duration')
    const _product_edit_profile_form_profile_advanced_booking_min = document.getElementById('product_edit_profile_form_profile_advanced_booking_min')
    const _product_edit_profile_form_profile_advanced_booking_max = document.getElementById('product_edit_profile_form_profile_advanced_booking_max')
    const _product_edit_profile_form_profile_checkin_dow = document.getElementById('product_edit_profile_form_profile_checkin_dow')
    const _product_edit_profile_form_profile_checkout_dow = document.getElementById('product_edit_profile_form_profile_checkout_dow')
    const _product_edit_profile_form_profile_departure_dow = document.getElementById('product_edit_profile_form_profile_departure_dow')
    const _product_edit_profile_form_profile_return_dow = document.getElementById('product_edit_profile_form_profile_return_dow')
    const _product_edit_profile_form_profile_inc_days_dow = document.getElementById('product_edit_profile_form_profile_inc_days_dow')
    const _product_edit_profile_form_profile_weekday_dow = document.getElementById('product_edit_profile_form_profile_weekday_dow')
    const _product_edit_profile_form_close_button = document.getElementById('product_edit_profile_form_close_button')
    const _button_add_product_profile = document.getElementById("button_add_product_profile")
    const _product_edit_profile_form_clear_button = document.getElementById('product_edit_profile_form_clear_button')
    const _product_edit_profile_form_submit_button = document.getElementById('product_edit_profile_form_submit_button')
    const _product_id = document.getElementById("product_id")
    const _button_remove_profile_from_product = document.getElementById("button_remove_profile_from_product")
    
    let $table_profile_product_edit = $(_table_profile_product_edit)
    let user_id = (document.getElementById('user_id')) ? (!isNaN(parseInt(document.getElementById('user_id').value))) ? parseInt(document.getElementById('user_id').value) : 4 : 4
    let form_rules = {
        rules: {
            product_edit_profile_form_profile_sales_types_id: {
                required: true,
            },
            product_edit_profile_form_profile_allot_by_id: {
                required: function (element) {
                    return ($(_product_edit_profile_form_profile_sales_types_id).val() !== "" && $(_product_edit_profile_form_profile_sales_types_id).val() === 1 || $(_product_edit_profile_form_profile_sales_types_id).val() === "1")
                },
            },
            profile_expires: {
                required: function (element) {
                    return ($(_product_edit_profile_form_profile_allot_by_id).val() !== "" && $(_product_edit_profile_form_profile_allot_by_id).val() === 1 || $(_product_edit_profile_form_profile_allot_by_id).val() === "1")
                },
            },
            product_edit_profile_form_profile_days_out: {
                required: function (element) {
                    return ($(_product_edit_profile_form_profile_allot_by_id).val() !== "" && $(_product_edit_profile_form_profile_allot_by_id).val() === 2 || $(_product_edit_profile_form_profile_allot_by_id).val() === "2")
                },
                number: true,
                min: 1,
            },
            product_edit_profile_form_profile_name: {
                required: true,
            },
        },
        messages: {
            product_edit_profile_form_profile_sales_types_id: {
                required: 'Field Required',
            },
            product_edit_profile_form_profile_allot_by_id: {
                required: 'Field Required',
            },
            profile_expires: {
                required: 'Field Required',
            },
            product_edit_profile_form_profile_days_out: {
                required: 'Field Required',
            },
            product_edit_profile_form_profile_name: {
                required: 'Field Required',
            },
        },
    }
    let globalSelectedProfile = false
    let checkin_dow, checkout_dow, departure_dow, return_dow, weekday_dow, inc_days_dow
    
    $(_button_add_product_profile)
        .on("click", function () {
            //console.log("InventoryProfile.button_add_product_profile: click()", {})
            populateInventoryProfileForm()
        })
    
    $(_table_profile_product_edit_add_new_button)
        .on("click", function () {
            //console.log("InventoryProfile.table_profile_product_edit_add_new_button: click()", {})
            _product_edit_profile_form_profile_name_filter.value = ""
            $table_profile_product_edit.clearSelectedRows()
            populateInventoryProfileForm()
        })
    
    $(_product_edit_profile_form_clear_button)
        .on("click", function () {
            //console.log("InventoryProfile.product_edit_profile_form_clear_button: click()", {})
            $table_profile_product_edit.clearSelectedRows()
            clearInventoryProfileForm()
            _product_edit_profile_form_profile_name_filter.value = ""
        })
    
    $(_product_edit_profile_form_submit_button)
        .on("click", function () {
            //console.log("InventoryProfile.product_edit_profile_form_submit_button: click()", {})
            save()
        })
    
    $(_product_edit_profile_form_close_button)
        .on("click", function () {
            $table_profile_product_edit.clearSelectedRows()
            clearInventoryProfileForm()
            setFormElementDisplay()
            hideForm()
            _product_edit_profile_form_profile_name_filter.value = ""
        })
    
    $(_product_edit_profile_form_profile_sales_types_id)
        .on("change", function () {
            //console.log("InventoryProfile.product_edit_profile_form_profile_sales_types_id: change()", {})
            setFormElementDisplay()
            InventoryProfile.expiration_date.value("")
            _product_edit_profile_form_profile_days_out.value = ""
            _product_edit_profile_form_profile_allot_by_id.value = ""
        })
    
    $(_product_edit_profile_form_profile_allot_by_id)
        .on("change", function () {
            //console.log("InventoryProfile.product_edit_profile_form_profile_allot_by_id: change()", {})
            setFormElementDisplay()
            InventoryProfile.expiration_date.value("")
            _product_edit_profile_form_profile_days_out.value = ""
        })
    
    $(_product_edit_profile_form_profile_transfer_sales_types_id)
        .on("change", function () {
            //console.log("InventoryProfile.product_edit_profile_form_profile_transfer_sales_types_id: change()", {})
        })
    
    $(_button_remove_profile_from_product)
        .on("click", function () {
            remove()
        })
    
    $(_panel_tab_inventory)
        .on("hide.bs.tab", function () {
            $table_profile_product_edit.clearSelectedRows()
            clearInventoryProfileForm()
            setFormElementDisplay()
            hideForm()
            _product_edit_profile_form_profile_name_filter.value = ""
        })
    
    const updateProgress = function () {
        let profiles = Array.from(InventoryProfile.all.values())
        
        if (profiles.length === 0) {
            $(_panel_tab_inventory).html(`Inventory <span id="profileNeedsAttention" class="badge rounded-pill badge-notification bg-danger">!</span>`)
        } else {
            $(_panel_tab_inventory).html(`Inventory`)
        }
        
        Product.updateProgress()
    }
    
    const removeProductProfile = function (dataToSend, callback) {
        if (dataToSend) {
            let url = "/api/v1.0/profiles/remove"
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleProfileError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
            }
        }
    }
    
    const remove = function () {
        let dataToSend = {
            product_id: parseInt(_product_id.value),
            profile_id: parseInt(_product_edit_profile_form_profile_id.value),
        }
        if (dataToSend) {
            confirmDialog(`Would you like to update? This change may affect your Pricing Worksheets.`, (ans) => {
                if (ans) {
                    removeProductProfile(dataToSend, function (data) {
                        if (data) {
                            let detail = set(InventoryProfile.all.get(dataToSend.profile_id))
                            
                            InventoryProfile.all.delete(detail.id)
                            
                            $table_profile_product_edit.deleteRow(detail)
                            $table_profile_product_edit.clearSelectedRows()
                            
                            _product_edit_profile_form_profile_name_filter.value = ""
                            
                            PricingWorksheet.pricingWorksheet()
                            Pricing.resetForm()
                            YearCalendar.resetForm()
                            PricingWorksheet.status()
                            //YearCalendar.refresh()
                            
                            updateProgress()
                            populateInventoryProfileForm()
                            hideForm()
                            
                            toastr.success(`InventoryProfile: ${detail.name} - has been removed`)
                            YearCalendar.endLoading()
                        }
                    })
                }
            })
        }
    }
    
    const defaultDetail = function () {
        return {
            id: null,
            allot_by_id: null,
            sales_types_id: null,
            name: null,
            quantity: null,
            expires: null,
            transfer_sales_types_id: null,
            release_amt: null,
            min_length_days: null,
            checkin_dow: [0, 1, 2, 3, 4, 5, 6],
            checkout_dow: [0, 1, 2, 3, 4, 5, 6],
            departure_dow: [0, 1, 2, 3, 4, 5, 6],
            return_dow: [0, 1, 2, 3, 4, 5, 6],
            inc_days_dow: [0, 1, 2, 3, 4, 5, 6],
            weekday_dow: [0, 1, 2, 3, 4, 5, 6],
            min_duration: null,
            max_duration: null,
            equal_duration: null,
            advanced_booking_min: null,
            advanced_booking_max: null,
            advanced_booking_date: null,
            
            days_out: null,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            note: null,
            sales_types_details: {},
            allot_by_details: {},
            tranfer_sales_type_details: {},
        }
    }
    
    const initAutoComplete = function () {
        //console.log('InventoryProfile.initAutoComplete()', InventoryProfile)
        let product_id = (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null
        
        $(_product_edit_profile_form_profile_name_filter)
            .on("click", function () {
                $(this).select()
            })
            .on("search", function () {
                $table_profile_product_edit.clearSelectedRows()
                resetInventoryProfileForm()
            })
            .on("change", function () {
                setTimeout(function () {
                    //*
                    let profile_name = _product_edit_profile_form_profile_name_filter.value
                    
                    if (globalSelectedProfile === false) {
                        if (profile_name === "") {
                            globalSelectedProfile = false
                            $table_profile_product_edit.clearSelectedRows()
                            resetInventoryProfileForm()
                        } else {
                            nameExists(profile_name)
                        }
                    }
                    //*/
                }, 200)
                if (_product_edit_profile_form_profile_name_filter.value === "") {
                    $table_profile_product_edit.clearSelectedRows()
                    resetInventoryProfileForm()
                }
            })
            .autocomplete({
                serviceUrl: "/api/v1.0/autocomplete/profiles",
                minChars: 2,
                cache: false,
                dataType: "json",
                triggerSelectOnValidInput: false,
                params: { "product_id": product_id },
                paramName: "st",
                onSelect: function (suggestion) {
                    if (!suggestion.data) {
                        return
                    }
                    $table_profile_product_edit.clearSelectedRows()
                    let id = (!isNaN(parseInt(suggestion.data.id))) ? parseInt(suggestion.data.id) : null
                    let inventory_profile = InventoryProfile.all.get(id)
                    
                    if (inventory_profile) {
                        $table_profile_product_edit.loadRow(inventory_profile)
                        populateInventoryProfileForm(inventory_profile)
                        return
                    }
                    
                    populateInventoryProfileForm()
                    _product_edit_profile_form_profile_name.value = _product_edit_profile_form_profile_name_filter.value
                },
            })
    }
    
    const nameExists = function (name) {
        //console.log("InventoryProfile.nameExists(profile_name)", name)
        if (name && name !== "") {
            /**
             * data to send to the server
             *
             * @type {{name}}
             */
            let dataToSend = {
                name: name,
                product_id: (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null,
            }
            
            fetchByName(dataToSend, function (data) {
                let profile = null
                
                if (data && data[0]) {
                    profile = data
                    if (data[0]) {
                        profile = data[0]
                    }
                }
                
                if (profile) {
                    let hasProfile = InventoryProfile.all.get(parseInt(profile.id))
                    let detail
                    
                    if (hasProfile) {
                        detail = set(hasProfile)
                        $table_profile_product_edit.loadRow(detail)
                        populateInventoryProfileForm(detail)
                        return
                    }
                    
                    populateInventoryProfileForm()
                    _product_edit_profile_form_profile_name.value = name
                }
            })
        }
    }
    
    const fetchByName = function (dataToSend, callback) {
        let url = "/api/v1.0/profiles/validate"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleProfileError("Oops: 1")
                    }
                })
            } catch (e) {
                //console.log("error", e)
                return handleProfileError("Error Validating InventoryProfile")
            }
        } else {
            return handleProfileError("Error Loading InventoryProfile - Missing Data")
        }
    }
    
    const buildInventoryProfileTable = function () {
        //console.log("InventoryProfile.buildInventoryProfileTable()", InventoryProfile)
        $table_profile_product_edit = $(_table_profile_product_edit).table({
            table_type: "display_list",
            data: [],
            columnDefs: [
                {
                    title: "Name",
                    targets: 0,
                    data: "name",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "Sales Types",
                    targets: 1,
                    data: "sales_types_details",
                    render: function (data, type, row, meta) {
                        //console.log("sales_types_details", data)
                        let name = (data.name) ? data.name : "N/A"
                        
                        return "<span style='white-space: nowrap;'>" + name + "</span>"
                    },
                },
                {
                    title: "Allot By",
                    targets: 2,
                    data: "allot_by_id",
                    render: function (data, type, row, meta) {
                        let nights = "N/A"
                        if (data === null) {
                            nights = "N/A"
                        } else {
                            nights = Types.allot_by.get(data)
                            if (nights) {
                                nights = nights.name
                            } else {
                                nights = "N/A"
                            }
                        }
                        return "<span style='white-space: nowrap;'>" + nights + "</span>"
                    },
                },
                {
                    title: "Expires",
                    targets: 3,
                    data: "expires",
                    render: function (data, type, row, meta) {
                        let expires
                        if (data === null) {
                            expires = "N/A"
                        } else {
                            let new_string = data.replace(/-|\s/g, "")
                            expires = moment(new_string).format('YYYY-MM-DD')
                        }
                        return "<span style='white-space: nowrap;'>" + expires + "</span>"
                    },
                },
                {
                    title: "Release",
                    targets: 4,
                    data: "release_amt",
                    render: function (data, type, row, meta) {
                        let expires = "N/A"
                        if (data) {
                            expires = data
                        }
                        return "<span style='white-space: nowrap;'>" + expires + "</span>"
                    },
                },
            ],
            rowClick: InventoryProfile.edit,
        })
    }
    
    const buildInventoryProfileRecord = function () {
        let isValid = validateInventoryProfileForm()
        if (isValid) {
            return remove_nulls({
                id: (!isNaN(parseInt(_product_edit_profile_form_profile_id.value))) ? parseInt(_product_edit_profile_form_profile_id.value) : null,
                name: (_product_edit_profile_form_profile_name.value !== "") ? _product_edit_profile_form_profile_name.value : null,
                product_id: (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null,
                sales_types_id: (!isNaN(parseInt(_product_edit_profile_form_profile_sales_types_id.value))) ? parseInt(_product_edit_profile_form_profile_sales_types_id.value) : null,
                transfer_sales_types_id: (!isNaN(parseInt(_product_edit_profile_form_profile_transfer_sales_types_id.value))) ? parseInt(_product_edit_profile_form_profile_transfer_sales_types_id.value) : null,
                allot_by_id: (!isNaN(parseInt(_product_edit_profile_form_profile_allot_by_id.value))) ? parseInt(_product_edit_profile_form_profile_allot_by_id.value) : 3,
                enabled: (_product_edit_profile_form_profile_enabled.checked === true) ? 1 : 0,
                expires: InventoryProfile.expiration_date.value(),
                advanced_booking_date: InventoryProfile.advanced_booking_date.value(),
                checkin_dow: (formatListOfIds(InventoryProfile.checkin_dow.disabled_dows) === null) ? "" : formatListOfIds(InventoryProfile.checkin_dow.disabled_dows),
                checkout_dow: (formatListOfIds(InventoryProfile.checkout_dow.disabled_dows) === "") ? "" : formatListOfIds(InventoryProfile.checkout_dow.disabled_dows),
                departure_dow: (formatListOfIds(InventoryProfile.departure_dow.disabled_dows) === "") ? "" : formatListOfIds(InventoryProfile.departure_dow.disabled_dows),
                return_dow: (formatListOfIds(InventoryProfile.return_dow.disabled_dows) === "") ? "" : formatListOfIds(InventoryProfile.return_dow.disabled_dows),
                weekday_dow: (formatListOfIds(InventoryProfile.weekday_dow.disabled_dows) === "") ? "" : formatListOfIds(InventoryProfile.weekday_dow.disabled_dows),
                inc_days_dow: (formatListOfIds(InventoryProfile.inc_days_dow.disabled_dows) === "") ? "" : formatListOfIds(InventoryProfile.inc_days_dow.disabled_dows),
                days_out: (!isNaN(parseInt(_product_edit_profile_form_profile_days_out.value))) ? parseInt(_product_edit_profile_form_profile_days_out.value) : null,
                release_amt: (!isNaN(parseInt(_product_edit_profile_form_profile_release_amt.value))) ? parseInt(_product_edit_profile_form_profile_release_amt.value) : null,
                min_length_days: (!isNaN(parseInt(_product_edit_profile_form_profile_min_length_days.value))) ? parseInt(_product_edit_profile_form_profile_min_length_days.value) : "",
                min_duration: (!isNaN(parseInt(_product_edit_profile_form_profile_min_duration.value))) ? parseInt(_product_edit_profile_form_profile_min_duration.value) : null,
                max_duration: (!isNaN(parseInt(_product_edit_profile_form_profile_max_duration.value))) ? parseInt(_product_edit_profile_form_profile_max_duration.value) : null,
                equal_duration: (!isNaN(parseInt(_product_edit_profile_form_profile_equal_duration.value))) ? parseInt(_product_edit_profile_form_profile_equal_duration.value) : null,
                advanced_booking_min: (!isNaN(parseInt(_product_edit_profile_form_profile_advanced_booking_min.value))) ? parseInt(_product_edit_profile_form_profile_advanced_booking_min.value) : null,
                advanced_booking_max: (!isNaN(parseInt(_product_edit_profile_form_profile_advanced_booking_max.value))) ? parseInt(_product_edit_profile_form_profile_advanced_booking_max.value) : null,
            })
            
        }
        
        return false
    }
    
    const loadAll = function (inventory_profiles) {
        InventoryProfile.all = new Map()
        if (!inventory_profiles) { inventory_profiles = [] }
        
        $.each(inventory_profiles, function (k, inventory_profile) {
            //console.log("InventoryProfile.loadAll - inventory_profile", inventory_profile)
            //console.log("InventoryProfile.loadAll - inventory_profile", inventory_profile, checkin_dow)
            let detail = set(inventory_profile)
            //console.log('detail', detail)
            if (!isNaN(parseInt(detail.id))) {
                if (_table_profile_product_edit) {
                    $table_profile_product_edit.insertRow(detail)
                }
                InventoryProfile.all.set(parseInt(detail.id), detail)
            }
        })
        
        Pricing.loadProfileDropdown()
        updateProgress()
    }
    
    const setFormElementDisplay = function () {
        let sales_types_id = (!isNaN(parseInt(_product_edit_profile_form_profile_sales_types_id.value))) ? parseInt(_product_edit_profile_form_profile_sales_types_id.value) : null
        
        hideAllotmentFields()
        if (sales_types_id) {
            switch (sales_types_id) {
                case 1:
                    showAllotmentFields()
                    break
                case 2:
                    break
                case 3:
                    break
                case 4:
                    break
                case 5:
                    break
                default:
                    break
            }
        }
    }
    
    const showAllotmentFields = function () {
        let allot_by_id = (!isNaN(parseInt(_product_edit_profile_form_profile_allot_by_id.value))) ? parseInt(_product_edit_profile_form_profile_allot_by_id.value) : null
        if (allot_by_id) {
            switch (allot_by_id) {
                case 1:
                    $(_product_edit_profile_form_profile_days_out_block).hide()
                    $(_product_edit_profile_form_profile_expires_block).show()
                    break
                case 2:
                    
                    $(_product_edit_profile_form_profile_days_out_block).show()
                    $(_product_edit_profile_form_profile_expires_block).hide()
                    break
                case 3:
                    
                    $(_product_edit_profile_form_profile_days_out_block).hide()
                    $(_product_edit_profile_form_profile_expires_block).hide()
                    break
                default:
                    $(_product_edit_profile_form_profile_days_out_block).hide()
                    $(_product_edit_profile_form_profile_expires_block).hide()
                    break
            }
        }
        
        $(_product_edit_profile_form_profile_transfer_sales_types_id_block).show()
        $(_product_edit_profile_form_profile_quantity_block).show()
        $(_product_edit_profile_form_profile_release_amt_block).show()
        $(_product_edit_profile_form_profile_allot_by_id_block).show()
    }
    
    const hideAllotmentFields = function () {
        $(_product_edit_profile_form_profile_days_out_block).hide()
        $(_product_edit_profile_form_profile_expires_block).hide()
        $(_product_edit_profile_form_profile_allot_by_id_block).hide()
        $(_product_edit_profile_form_profile_transfer_sales_types_id_block).hide()
        $(_product_edit_profile_form_profile_quantity_block).hide()
        $(_product_edit_profile_form_profile_release_amt_block).hide()
        $("#accordionEx").collapse("hide")
    }
    
    const hideForm = function () {
        if (_edit_product_profile) {
            hideAllotmentFields()
            $(_edit_product_profile).hide()
            _product_edit_profile_form_profile_name_filter.disabled = false
            
            $("#accordionEx").collapse("hide")
            updateProgress()
        }
    }
    
    const showForm = function () {
        //console.log("InventoryProfile.showForm()", showForm)
        if (_edit_product_profile) {
            _product_edit_profile_form_profile_name_filter.disabled = true
            $(_edit_product_profile).show()
        }
    }
    
    const resetInventoryProfileForm = function () {
        //console.log("InventoryProfile.resetInventoryProfileForm()", {})
        clearInventoryProfileForm()
        disableInventoryProfileFormFields()
    }
    
    const clearInventoryProfileForm = function () {
        //console.log("InventoryProfile.clearInventoryProfileForm()", clearInventoryProfileForm)
        
        disableInventoryProfileFormFields()
        _product_edit_profile_form_profile_id.value = ""
        _product_edit_profile_form_profile_name.value = ""
        _product_edit_profile_form_profile_enabled.checked = true
        _product_edit_profile_form_profile_sales_types_id.value = ""
        _product_edit_profile_form_profile_allot_by_id.value = ""
        _product_edit_profile_form_profile_transfer_sales_types_id.value = ""
        _product_edit_profile_form_profile_days_out.value = ""
        _product_edit_profile_form_profile_quantity.value = ""
        _product_edit_profile_form_profile_release_amt.value = ""
        _product_edit_profile_form_profile_min_length_days.value = ""
        _product_edit_profile_form_profile_min_duration.value = ""
        _product_edit_profile_form_profile_max_duration.value = ""
        _product_edit_profile_form_profile_equal_duration.value = ""
        _product_edit_profile_form_profile_advanced_booking_min.value = ""
        _product_edit_profile_form_profile_advanced_booking_max.value = ""
        
        InventoryProfile.checkin_dow.init([0, 1, 2, 3, 4, 5, 6])
        InventoryProfile.checkout_dow.init([0, 1, 2, 3, 4, 5, 6])
        InventoryProfile.departure_dow.init([0, 1, 2, 3, 4, 5, 6])
        InventoryProfile.return_dow.init([0, 1, 2, 3, 4, 5, 6])
        InventoryProfile.weekday_dow.init([0, 1, 2, 3, 4, 5, 6])
        InventoryProfile.inc_days_dow.init([0, 1, 2, 3, 4, 5, 6])
        
        InventoryProfile.expiration_date.value("")
        InventoryProfile.advanced_booking_date.value("")
        
        setFormElementDisplay()
    }
    
    const validateInventoryProfileForm = function () {
        let isValid = $(_product_edit_profile_form).valid()
        if (isValid) {
            let allotById = (!isNaN(parseInt(_product_edit_profile_form_profile_allot_by_id.value))) ? parseInt(_product_edit_profile_form_profile_allot_by_id.value) : 3
            if (allotById === 1) {
                let expiration_date = InventoryProfile.expiration_date.value()
                
                if (expiration_date === null || expiration_date === "") {
                    setError(document.getElementById("profile_expires"), "Field Required")
                    isValid = false
                } else {
                    clearError(document.getElementById("profile_expires"))
                }
            }
        }
        
        return isValid
    }
    
    const disableInventoryProfileFormFields = function () {
        //console.log('InventoryProfile.disableInventoryProfileFormFields()', this)
        _product_edit_profile_form_profile_name.disabled = false
    }
    
    const populateInventoryProfileForm = function (inventory_profile) {
        //console.log("InventoryProfile.populateInventoryProfileForm(inventory_profile)", inventory_profile)
        clearInventoryProfileForm()
        if (inventory_profile) {
            _product_edit_profile_form_profile_id.value = (inventory_profile.id) ? inventory_profile.id : ""
            _product_edit_profile_form_profile_name.value = (inventory_profile.name) ? inventory_profile.name : ""
            _product_edit_profile_form_profile_enabled.checked = (inventory_profile.enabled !== 0)
            _product_edit_profile_form_profile_sales_types_id.value = (inventory_profile.sales_types_id) ? inventory_profile.sales_types_id : ""
            _product_edit_profile_form_profile_allot_by_id.value = (inventory_profile.allot_by_id) ? inventory_profile.allot_by_id : ""
            _product_edit_profile_form_profile_transfer_sales_types_id.value = (inventory_profile.transfer_sales_types_id) ? inventory_profile.transfer_sales_types_id : ""
            _product_edit_profile_form_profile_days_out.value = (inventory_profile.days_out) ? inventory_profile.days_out : ""
            _product_edit_profile_form_profile_quantity.value = (inventory_profile.quantity) ? inventory_profile.quantity : ""
            _product_edit_profile_form_profile_release_amt.value = (inventory_profile.release_amt) ? inventory_profile.release_amt : ""
            _product_edit_profile_form_profile_min_length_days.value = (inventory_profile.min_length_days) ? inventory_profile.min_length_days : ""
            _product_edit_profile_form_profile_min_duration.value = (inventory_profile.min_duration) ? inventory_profile.min_duration : ""
            _product_edit_profile_form_profile_max_duration.value = (inventory_profile.max_duration) ? inventory_profile.max_duration : ""
            _product_edit_profile_form_profile_equal_duration.value = (inventory_profile.equal_duration) ? inventory_profile.equal_duration : ""
            _product_edit_profile_form_profile_advanced_booking_min.value = (inventory_profile.advanced_booking_min) ? inventory_profile.advanced_booking_min : ""
            _product_edit_profile_form_profile_advanced_booking_max.value = (inventory_profile.advanced_booking_max) ? inventory_profile.advanced_booking_max : ""
            
            InventoryProfile.checkin_dow.init((inventory_profile.checkin_dow) ? inventory_profile.checkin_dow : [0, 1, 2, 3, 4, 5, 6])
            InventoryProfile.checkout_dow.init((inventory_profile.checkout_dow) ? inventory_profile.checkout_dow : [0, 1, 2, 3, 4, 5, 6])
            InventoryProfile.departure_dow.init((inventory_profile.departure_dow) ? inventory_profile.departure_dow : [0, 1, 2, 3, 4, 5, 6])
            InventoryProfile.return_dow.init((inventory_profile.return_dow) ? inventory_profile.return_dow : [0, 1, 2, 3, 4, 5, 6])
            InventoryProfile.weekday_dow.init((inventory_profile.weekday_dow) ? inventory_profile.weekday_dow : [0, 1, 2, 3, 4, 5, 6])
            InventoryProfile.inc_days_dow.init((inventory_profile.inc_days_dow) ? inventory_profile.inc_days_dow : [0, 1, 2, 3, 4, 5, 6])
            
            InventoryProfile.expiration_date.value((inventory_profile.expires) ? inventory_profile.expires : "")
            InventoryProfile.advanced_booking_date.value((inventory_profile.advanced_booking_date) ? inventory_profile.advanced_booking_date : "")
            
        }
        
        setFormElementDisplay()
        showForm()
    }
    
    const set = function (inventory_profile) {
        //console.log("InventoryProfile.set(inventory_profile)", inventory_profile)
        
        let detail = defaultDetail()
        let sales_types_details, allot_by_details, tranfer_sales_type_details
        if (inventory_profile) {
            let checkinDOW = getListOfIds(inventory_profile.checkin_dow)
            let checkoutDOW = getListOfIds(inventory_profile.checkout_dow)
            let departureDOW = getListOfIds(inventory_profile.departure_dow)
            let returnDOW = getListOfIds(inventory_profile.return_dow)
            let inc_daysDOW = getListOfIds(inventory_profile.inc_days_dow)
            let weekdayDOW = getListOfIds(inventory_profile.weekday_dow)
            
            sales_types_details = Types.sales_types.get((!isNaN(parseInt(inventory_profile.sales_types_id))) ? parseInt(inventory_profile.sales_types_id) : null)
            allot_by_details = Types.allot_by.get((!isNaN(parseInt(inventory_profile.allot_by_id))) ? parseInt(inventory_profile.allot_by_id) : null)
            tranfer_sales_type_details = Types.sales_types.get((!isNaN(parseInt(inventory_profile.transfer_sales_types_id))) ? parseInt(inventory_profile.transfer_sales_types_id) : null)
            detail.id = (!isNaN(parseInt(inventory_profile.id))) ? parseInt(inventory_profile.id) : null
            detail.allot_by_id = (!isNaN(parseInt(inventory_profile.allot_by_id))) ? parseInt(inventory_profile.allot_by_id) : null
            detail.sales_types_id = (!isNaN(parseInt(inventory_profile.sales_types_id))) ? parseInt(inventory_profile.sales_types_id) : null
            detail.name = (inventory_profile.name) ? inventory_profile.name : null
            detail.quantity = (!isNaN(parseInt(inventory_profile.quantity))) ? parseInt(inventory_profile.quantity) : null
            detail.expires = (inventory_profile.expires) ? inventory_profile.expires : null
            detail.transfer_sales_types_id = (!isNaN(parseInt(inventory_profile.transfer_sales_types_id))) ? parseInt(inventory_profile.transfer_sales_types_id) : null
            detail.release_amt = (inventory_profile.release_amt) ? inventory_profile.release_amt : null
            detail.min_length_days = (inventory_profile.min_length_days) ? inventory_profile.min_length_days : null
            detail.min_duration = (inventory_profile.min_duration) ? inventory_profile.min_duration : null
            detail.max_duration = (inventory_profile.max_duration) ? inventory_profile.max_duration : null
            detail.equal_duration = (inventory_profile.equal_duration) ? inventory_profile.equal_duration : null
            detail.advanced_booking_min = (inventory_profile.advanced_booking_min) ? inventory_profile.advanced_booking_min : null
            detail.advanced_booking_max = (inventory_profile.advanced_booking_max) ? inventory_profile.advanced_booking_max : null
            detail.advanced_booking_date = (inventory_profile.advanced_booking_date) ? inventory_profile.advanced_booking_date : null
            
            detail.checkin_dow = checkinDOW
            detail.checkout_dow = checkoutDOW
            detail.departure_dow = departureDOW
            detail.return_dow = returnDOW
            detail.inc_days_dow = inc_daysDOW
            detail.weekday_dow = weekdayDOW
            
            detail.days_out = (inventory_profile.days_out) ? inventory_profile.days_out : null
            detail.enabled = (inventory_profile.enabled) ? inventory_profile.enabled : 1
            detail.date_created = (inventory_profile.date_created) ? inventory_profile.date_created : formatDateMySQL()
            detail.created_by = (!isNaN(parseInt(inventory_profile.created_by))) ? parseInt(inventory_profile.created_by) : user_id
            detail.date_modified = (inventory_profile.date_modified) ? inventory_profile.date_modified : formatDateMySQL()
            detail.modified_by = (!isNaN(parseInt(inventory_profile.modified_by))) ? parseInt(inventory_profile.modified_by) : user_id
            detail.note = (inventory_profile.note) ? inventory_profile.note : null
            detail.sales_types_details = sales_types_details
            detail.allot_by_details = allot_by_details
            detail.tranfer_sales_type_details = tranfer_sales_type_details
        }
        
        InventoryProfile.detail = detail
        return detail
    }
    
    const edit = function (inventory_profile) {
        if (inventory_profile) {
            $table_profile_product_edit.clearSelectedRows()
            let detail = set(inventory_profile)
            
            showForm()
            _product_edit_profile_form_profile_name_filter.value = detail.name
            _product_edit_profile_form_profile_name_filter.disabled = true
            $table_profile_product_edit.loadRow(detail)
            populateInventoryProfileForm(detail)
        }
    }
    
    const save = function () {
        let dataToSend = buildInventoryProfileRecord()
        if (dataToSend) {
            confirmDialog(`Would you like to update? This change may affect your Pricing Worksheets.`, (ans) => {
                if (ans) {
                    saveProductProfile(dataToSend, function (data) {
                        if (data) {
                            
                            let detail = set((data[0]) ? data[0] : data)
                            let hasProfile = InventoryProfile.all.get(detail.id)
                            
                            if (hasProfile) {
                                $table_profile_product_edit.updateRow(detail)
                            } else {
                                $table_profile_product_edit.insertRow(detail)
                            }
                            
                            InventoryProfile.all.set(detail.id, detail)
                            
                            $table_profile_product_edit.loadRow(detail)
                            $table_profile_product_edit.jumpToRow(detail)
                            $table_profile_product_edit.clearSelectedRows()
                            
                            _product_edit_profile_form_profile_name_filter.value = ""
                            
                            PricingWorksheet.pricingWorksheet()
                            Pricing.resetForm()
                            YearCalendar.refresh()
                            
                            updateProgress()
                            populateInventoryProfileForm()
                            hideForm()
                            
                            toastr.success(`InventoryProfile: ${detail.name} - has been updated`)
                            YearCalendar.endLoading()
                        }
                    })
                }
            })
        }
    }
    
    const handleProfileError = function (msg) {
        toastr.error(msg)
    }
    
    const saveProductProfile = function (dataToSend, callback) {
        if (dataToSend) {
            let url = "/api/v1.0/profiles/update"
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleProfileError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
            }
        }
    }
    
    const init = function (settings) {
        let inventory_profiles = []
        
        if (settings) {
            if (settings.profiles) {
                inventory_profiles = settings.profiles
            }
        }
        
        checkin_dow = $(_product_edit_profile_form_profile_checkin_dow).DisabledDOW({
            name: "checkin_dow",
            label: "Checkin DOW",
        })
        
        checkout_dow = $(_product_edit_profile_form_profile_checkout_dow).DisabledDOW({
            name: "checkout_dow",
            label: "Checkout DOW",
        })
        
        departure_dow = $(_product_edit_profile_form_profile_departure_dow).DisabledDOW({
            name: "departure_dow",
            label: "Departure DOW",
        })
        
        return_dow = $(_product_edit_profile_form_profile_return_dow).DisabledDOW({
            name: "return_dow",
            label: "Return DOW",
        })
        
        inc_days_dow = $(_product_edit_profile_form_profile_inc_days_dow).DisabledDOW({
            name: "inc_days_dow",
            label: "Included Days",
        })
        
        weekday_dow = $(_product_edit_profile_form_profile_weekday_dow).DisabledDOW({
            name: "weekday_dow",
            label: "Weekdays",
        })
        
        InventoryProfile.checkin_dow = checkin_dow
        InventoryProfile.checkout_dow = checkout_dow
        InventoryProfile.departure_dow = departure_dow
        InventoryProfile.return_dow = return_dow
        InventoryProfile.weekday_dow = weekday_dow
        InventoryProfile.inc_days_dow = inc_days_dow
        
        $(document).ready(function () {
            if (_table_profile_product_edit) {
                buildInventoryProfileTable()
            }
            
            if (_product_edit_profile_form_profile_name_filter) {
                initAutoComplete()
            }
            
            if (_product_edit_profile_form) {
                validator_init(form_rules)
                
                InventoryProfile.expiration_date = $("#profile_expires").dateSelect({
                    onStart: function () {},
                })
                
                InventoryProfile.advanced_booking_date = $("#profile_advanced_booking_date").dateSelect({
                    onStart: function () {},
                })
                
                InventoryProfile.validator = $(_product_edit_profile_form).validate()
                resetInventoryProfileForm()
                hideForm()
            }
            
            loadAll(inventory_profiles)
        })
    }
    
    return {
        validator: null,
        all: new Map(),
        detail: {},
        expiration_date: null,
        advanced_booking_date: null,
        checkin_dow: null,
        checkout_dow: null,
        departure_dow: null,
        return_dow: null,
        weekday_dow: null,
        inc_days_dow: null,
        init: function (settings) { init(settings) },
        initAutoComplete: function () { initAutoComplete() },
        edit: function (inventory_profile) {
            edit(inventory_profile)
        },
    }
})()
