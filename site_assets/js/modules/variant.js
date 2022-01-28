const Variant = (function () {
    "use strict"
    
    const _calendar_loader = document.getElementById("calendar_loader")
    const _button_remove_variant_from_product = document.getElementById("button_remove_variant_from_product")
    const _product_edit_variant_section = document.getElementById("product_edit_variant_section")
    const _panel_tab_variant = document.getElementById("panel_tab_variant")
    const _category_id = document.getElementById("category_id")
    const _product_id = document.getElementById("product_id")
    const _product_edit_variant_form_variant_name_filter = document.getElementById("product_edit_variant_form_variant_name_filter")
    const _table_variant_product_edit = document.getElementById("table_variant_product_edit")
    const _product_edit_variant_form = document.getElementById("product_edit_variant_form")
    const _edit_product_variant = document.getElementById("edit_product_variant")
    const _display_product_variant_name = document.getElementById("display_product_variant_name")
    const _product_edit_variant_form_variant_id = document.getElementById("product_edit_variant_form_variant_id")
    const _product_edit_variant_form_variant_name = document.getElementById("product_edit_variant_form_variant_name")
    const _product_edit_variant_form_variant_enabled = document.getElementById("product_edit_variant_form_variant_enabled")
    const _product_edit_variant_form_variant_code = document.getElementById("product_edit_variant_form_variant_code")
    const _product_edit_variant_form_variant_min_age = document.getElementById("product_edit_variant_form_variant_min_age")
    const _product_edit_variant_form_variant_max_age = document.getElementById("product_edit_variant_form_variant_max_age")
    const _product_edit_variant_form_submit_button = document.getElementById("product_edit_variant_form_submit_button")
    const _product_edit_variant_form_clear_button = document.getElementById("product_edit_variant_form_clear_button")
    const _product_edit_variant_form_close_button = document.getElementById("product_edit_variant_form_close_button")
    const _product_edit_variant_form_variant_used_in_pricing = document.getElementById("product_edit_variant_form_variant_used_in_pricing")
    const _table_variant_product_edit_add_new_button = document.getElementById("table_variant_product_edit_add_new_button")
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let $table_variant_product_edit = $(_table_variant_product_edit)
    let globalSelectedVariant = false
    let form_rules = {
        rules: {
            product_edit_variant_form_variant_name: {
                required: true,
            },
            product_edit_variant_form_variant_min_age: {
                number: true,
                min: 0,
            },
            product_edit_variant_form_variant_max_age: {
                number: true,
                min: 1,
            },
        },
        messages: {
            product_edit_variant_form_variant_name: {
                required: "Field Required",
            },
            product_edit_variant_form_variant_min_age: {
                number: "Field Invalid",
                min: "Field Invalid",
            },
            product_edit_variant_form_variant_max_age: {
                number: "Field Invalid",
                min: "Field Invalid",
            },
        },
    }
    
    $(_button_remove_variant_from_product)
        .on("click", function () {
            remove()
        })
    
    $(_product_edit_variant_section)
        .on("change", function () {
            updateProgress()
        })
    
    $(_table_variant_product_edit_add_new_button)
        .on("click", function () {
            //console.log("Variant.table_variant_product_edit_add_new_button:click()", this)
            // ----
            
            $table_variant_product_edit.clearSelectedRows()
            populateForm()
        })
    
    $(_product_edit_variant_form_clear_button)
        .on("click", function () {
            //console.log("Variant.product_edit_variant_form_clear_button:click()", this)
            // ----
            resetForm()
            $table_variant_product_edit.clearSelectedRows()
        })
    
    $(_product_edit_variant_form_close_button)
        .on("click", function () {
            resetForm()
            $table_variant_product_edit.clearSelectedRows()
        })
    
    $(_product_edit_variant_form_submit_button)
        .on("click", function () {
            //console.log("Variant.product_edit_variant_form_submit_button:click()", this)
            // ----
            save()
        })
    
    $(_panel_tab_variant)
        .on("hide.bs.tab", function () {
            resetForm()
            $table_variant_product_edit.clearSelectedRows()
            _product_edit_variant_form_variant_name_filter.value = ""
            _product_edit_variant_form_variant_name_filter.disabled = false
        })
    
    const remove = function () {
        confirmDialog(`Would you like to update? This change may affect your Pricing Worksheets.`, (ans) => {
            if (ans) {
                let dataToSend = {
                    variant_id: parseInt(_product_edit_variant_form_variant_id.value),
                    product_id: parseInt(_product_id.value),
                }
                
                removeProductVariant(dataToSend, function (data) {
                    if (data) {
                        let detail = set(Variant.all.get(dataToSend.variant_id))
                        
                        Variant.all.delete(dataToSend.variant_id)
                        
                        $table_variant_product_edit.deleteRow(detail)
                        $table_variant_product_edit.clearSelectedRows()
                        
                        _product_edit_variant_form_variant_name_filter.value = ""
                        
                        PricingWorksheet.pricingWorksheet()
                        Pricing.resetForm()
                        YearCalendar.refresh()
                        
                        updateProgress()
                        resetForm()
                        
                        toastr.success(`Variant: ${detail.name} - has been updated`)
                        YearCalendar.endLoading()
                    }
                })
            } else {
                resetForm()
                $table_variant_product_edit.clearSelectedRows()
                _product_edit_variant_form_variant_name_filter.value = ""
                _product_edit_variant_form_variant_name_filter.disabled = false
            }
        })
    }
    
    const removeProductVariant = function (dataToSend, callback) {
        if (dataToSend) {
            let url = "/api/v1.0/variants/remove"
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleVariantError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
            }
        }
    }
    
    const updateProgress = function () {
        let variants = Array.from(Variant.all.values())
        
        if (variants.length === 0) {
            let warningNotice = $("<span/>", {
                "class": "badge badge-danger  ml-2",
                "text": "!",
                "id": "variantNeedsAttention",
            })
            
            $(_panel_tab_variant).html(`Variant<span id="variantNeedsAttention" class="badge rounded-pill badge-notification bg-danger">!</span>`)
        } else {
            $(_panel_tab_variant).html(`Variant`)
        }
        
        Product.updateProgress()
    }
    
    const initAutoComplete = function () {
        //console.log("Variant.initAutoComplete()", Variant)
        // ----
        let category_id = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
        
        $(_product_edit_variant_form_variant_name_filter)
            .on("click", function () {
                $(this).select()
            })
            .on("search", function () {
                //*
                //console.log("Variant._product_edit_variant_form_variant_name_filter:search()", Variant)
                // ----
                globalSelectedVariant = false
                resetForm()
                $table_variant_product_edit.clearSelectedRows()
                //*/
            })
            .on("change", function () {
                //*
                setTimeout(function () {
                    //console.log("Variant._product_edit_variant_form_variant_name_filter:change()", _product_edit_variant_form_variant_name_filter.value)
                    // ----
                    let variant_name = _product_edit_variant_form_variant_name_filter.value
                    
                    $table_variant_product_edit.clearSelectedRows()
                    
                    if (globalSelectedVariant === false) {
                        if (variant_name === "") {
                            _product_edit_variant_form_variant_name_filter.value = ""
                            globalSelectedVariant = false
                            resetForm()
                        } else {
                            nameExists(variant_name)
                        }
                    }
                }, 200)
                //*/
            })
            .autocomplete({
                serviceUrl: "/api/v1.0/autocomplete/variants",
                minChars: 2,
                cache: false,
                dataType: "json",
                triggerSelectOnValidInput: false,
                paramName: "st",
                params: { "category_id": category_id },
                onSelect: function (suggestion) {
                    //console.log("_product_edit_variant_form_variant_name_filter:autocomplete() - suggestion", suggestion)
                    // ----
                    $table_variant_product_edit.clearSelectedRows()
                    
                    if (!suggestion || !suggestion.data) {
                        return
                    }
                    let detail
                    let variant = suggestion.data
                    let hasVariant = Variant.all.get(parseInt(variant.id))
                    
                    if (hasVariant) {
                        detail = set(hasVariant)
                        $table_variant_product_edit.loadRow(detail)
                    } else {
                        detail = set(variant)
                        detail.used_in_pricing = 1
                    }
                    
                    populateForm(detail)
                    
                },
            })
    }
    
    const handleVariantError = function (msg) {
        //console.log("Variant.handleVariantError(msg)", msg)
        // ----
        toastr.error(msg)
    }
    
    const fetchByName = function (dataToSend, callback) {
        //console.log("Variant.fetchByName(dataToSend)", dataToSend)
        // ----
        let url = "/api/v1.0/variants/validate"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleVariantError("Oops: 1")
                    }
                })
            } catch (e) {
                //console.log("error", e)
                return handleVariantError("Error Validating Variant")
            }
        } else {
            return handleVariantError("Error Loading Variant - Missing Data")
        }
    }
    
    const nameExists = function (name) {
        //console.log("Variant.nameExists(name)", name)
        // ----
        if (name && name !== "") {
            /**
             * data to send to the server
             *
             * @type {{name}}
             */
            let dataToSend = remove_nulls({
                name: name,
                category_id: (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null,
            })
            /*
            fetchByName(dataToSend, function (data) {
                let variant = null
                
                if (data) {
                    variant = data
                    if (data[0]) {
                        variant = data[0]
                    }
                    //console.log("Variant.nameExists() - variant:", variant)
                    // ----
                    let detail
                    $table_variant_product_edit.clearSelectedRows()
                    globalSelectedVariant = true
                    let hasVariant = Variant.all.get(parseInt(variant.id))
                    if (hasVariant) {
                        detail = set(hasVariant)
                        $table_variant_product_edit.loadRow(detail)
                    } else {
                        detail = set(variant)
                    }
                    populateForm(detail)
                } else {
                    confirmDialog(`The variant: ${name} does not exist exists. Would you like to create it?`, (ans) => {
                        if (ans) {
                            $table_variant_product_edit.clearSelectedRows()
                            globalSelectedVariant = false
                            
                            populateForm()
                            _product_edit_variant_form_variant_name_filter.value = name
                            //loadForm()
                            //enableFormFields()
                        }
                    })
                }
            })
            //*/
            fetchByName(dataToSend, function (data) {
                let variant = null
                
                if (data && data[0]) {
                    variant = data
                    if (data[0]) {
                        variant = data[0]
                    }
                }
                
                if (variant) {
                    let hasVariant = Variant.all.get(parseInt(variant.id))
                    let detail
                    //console.log("_product_edit_variant_form_variant_name_filter:autocomplete() - variant", variant)
                    
                    if (hasVariant) {
                        detail = set(hasVariant)
                        $table_variant_product_edit.loadRow(detail)
                    } else {
                        detail = set(variant)
                    }
                    
                    populateForm(detail)
                } else {
                    confirmDialog(`The variant: ${name} does not exist exists. Would you like to create it?`, (ans) => {
                        if (ans) {
                            $table_variant_product_edit.clearSelectedRows()
                            globalSelectedVariant = false
                            clearForm()
                            _product_edit_variant_form_variant_name.value = name
                            _display_product_variant_name.innerText = name
                            loadForm()
                            enableFormFields()
                        }
                    })
                }
            })
            
        }
    }
    
    const buildProductEditTable = function () {
        //console.log("Variant.buildProductEditTable()", Variant)
        // ----
        $table_variant_product_edit = $(_table_variant_product_edit).table({
            table_type: "display_list",
            data: Variant.all,
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
                    title: "Code",
                    targets: 1,
                    data: "code",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "Min Age",
                    targets: 2,
                    data: "min_age",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "Max Age",
                    targets: 3,
                    data: "max_age",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
            
            ],
            rowClick: Variant.edit,
        })
    }
    
    const defaultDetail = function () {
        //console.log("Variant.defaultDetail()", Variant)
        // ----
        return {
            id: null,
            category_id: null,
            name: null,
            min_age: null,
            max_age: null,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            used_in_pricing: 1,
            note: null,
        }
    }
    
    const resetForm = function () {
        clearForm()
        disableFormFields()
        hideForm()
    }
    
    const validVariantRecord = function () {
        //console.log("Variant.validVariantRecord()", Variant.all)
        // ----
        let valid = $(_product_edit_variant_form).valid()
        let min_age = (!isNaN(parseInt(_product_edit_variant_form_variant_min_age.value))) ? parseInt(_product_edit_variant_form_variant_min_age.value) : null
        let max_age = (!isNaN(parseInt(_product_edit_variant_form_variant_max_age.value))) ? parseInt(_product_edit_variant_form_variant_max_age.value) : null
        if (min_age !== null && max_age !== null) {
            if (parseInt(max_age) < parseInt(min_age)) {
                setError(_product_edit_variant_form_variant_max_age, "Age is greater than minimum")
                valid = false
            }
        }
        
        return valid
    }
    
    const clearForm = function () {
        //console.log("Variant.clearForm()", Variant.all)
        // ----
        clear_validation(_product_edit_variant_form)
        _display_product_variant_name.innerText = "&nbsp;"
        _product_edit_variant_form_variant_id.value = ""
        _product_edit_variant_form_variant_name.value = ""
        _product_edit_variant_form_variant_enabled.checked = true
        _product_edit_variant_form_variant_code.value = ""
        _product_edit_variant_form_variant_min_age.value = 0
        _product_edit_variant_form_variant_max_age.value = ""
        _product_edit_variant_form_variant_used_in_pricing.checked = true
    }
    
    const populateForm = function (variant) {
        //console.log("Variant.populateForm()", variant)
        // ----
        clearForm()
        if (variant) {
            _product_edit_variant_form_variant_used_in_pricing.checked = (variant.used_in_pricing === 1)
            _display_product_variant_name.innerText = (variant.name) ? variant.name : "&nbsp;"
            _product_edit_variant_form_variant_id.value = (!isNaN(parseInt(variant.id))) ? parseInt(variant.id) : ""
            _product_edit_variant_form_variant_name.value = (variant.name) ? variant.name : "&nbsp;"
            _product_edit_variant_form_variant_enabled.checked = (!(variant.enabled && variant.enabled === 0))
            _product_edit_variant_form_variant_code.value = (variant.name) ? variant.name : "&nbsp;"
            _product_edit_variant_form_variant_min_age.value = (!isNaN(parseInt(variant.min_age))) ? parseInt(variant.min_age) : ""
            _product_edit_variant_form_variant_max_age.value = (!isNaN(parseInt(variant.max_age))) ? parseInt(variant.max_age) : ""
        }
        
        enableFormFields()
        loadForm()
    }
    
    const hideForm = function () {
        updateProgress()
        _product_edit_variant_form_variant_name_filter.disabled = false
        $(_edit_product_variant).hide()
    }
    
    const loadForm = function () {
        //console.log("Variant.loadForm()", Variant)
        // ----
        _product_edit_variant_form_variant_name_filter.disabled = true
        $(_edit_product_variant).show()
    }
    
    const enableFormFields = function () {
        //console.log("Variant.enableFormFields()", Variant)
        // ----
        _product_edit_variant_form_variant_used_in_pricing.disabled = false
        _product_edit_variant_form_variant_id.disabled = true
        _product_edit_variant_form_variant_name.disabled = true
        _product_edit_variant_form_variant_enabled.disabled = true
        _product_edit_variant_form_variant_code.disabled = true
        _product_edit_variant_form_variant_min_age.disabled = false
        _product_edit_variant_form_variant_max_age.disabled = false
        _product_edit_variant_form_submit_button.disabled = false
    }
    
    const disableFormFields = function () {
        //console.log("Variant.enableFormFields()", Variant)
        // ----
        _product_edit_variant_form_variant_used_in_pricing.disabled = true
        _product_edit_variant_form_variant_id.disabled = true
        _product_edit_variant_form_variant_name.disabled = true
        _product_edit_variant_form_variant_enabled.disabled = true
        _product_edit_variant_form_variant_code.disabled = true
        _product_edit_variant_form_variant_min_age.disabled = true
        _product_edit_variant_form_variant_max_age.disabled = true
        _product_edit_variant_form_submit_button.disabled = true
    }
    
    const buildVariantRecord = function () {
        //console.log("Variant.buildVariantRecord()", Variant)
        // ----
        
        let dataToSend = {
            id: (!isNaN(parseInt(_product_edit_variant_form_variant_id.value))) ? parseInt(_product_edit_variant_form_variant_id.value) : null,
            category_id: (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null,
            product_id: (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null,
            name: (_product_edit_variant_form_variant_name && _product_edit_variant_form_variant_name.value !== "") ? _product_edit_variant_form_variant_name.value : null,
            code: (_product_edit_variant_form_variant_code && _product_edit_variant_form_variant_code.value !== "") ? _product_edit_variant_form_variant_code.value : null,
            min_age: (!isNaN(parseInt(_product_edit_variant_form_variant_min_age.value))) ? parseInt(_product_edit_variant_form_variant_min_age.value) : null,
            max_age: (!isNaN(parseInt(_product_edit_variant_form_variant_max_age.value))) ? parseInt(_product_edit_variant_form_variant_max_age.value) : null,
            used_in_pricing: (_product_edit_variant_form_variant_used_in_pricing.checked === true) ? 1 : 0,
        }
        return remove_nulls(dataToSend)
    }
    
    const saveProductVariant = function (dataToSend, callback) {
        if (dataToSend) {
            let url = "/api/v1.0/variants/update"
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleVariantError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
            }
        }
    }
    
    const save = function () {
        if (validVariantRecord()) {
            confirmDialog(`Would you like to update? This change may affect your Pricing Worksheets.`, (ans) => {
                if (ans) {
                    let dataToSend = buildVariantRecord()
                    saveProductVariant(dataToSend, function (data) {
                        if (data) {
                            let detail = set((data[0]) ? data[0] : data)
                            let hasVariant = Variant.all.get(detail.id)
                            
                            if (hasVariant) {
                                $table_variant_product_edit.updateRow(detail)
                            } else {
                                $table_variant_product_edit.insertRow(detail)
                            }
                            
                            Variant.all.set(detail.id, detail)
                            
                            $table_variant_product_edit.loadRow(detail)
                            $table_variant_product_edit.jumpToRow(detail)
                            $table_variant_product_edit.clearSelectedRows()
                            
                            _product_edit_variant_form_variant_name_filter.disabled = false
                            _product_edit_variant_form_variant_name_filter.value = ""
                            
                            PricingWorksheet.pricingWorksheet()
                            Pricing.resetForm()
                            YearCalendar.refresh()
                            
                            updateProgress()
                            resetForm()
                            
                            toastr.success(`Variant: ${detail.name} - has been updated`)
                            YearCalendar.endLoading()
                        }
                    })
                } else {
                    resetForm()
                    $table_variant_product_edit.clearSelectedRows()
                    _product_edit_variant_form_variant_name_filter.value = ""
                    _product_edit_variant_form_variant_name_filter.disabled = false
                }
            })
        }
    }
    
    const loadAll = function (variants) {
        //console.log("Variant.loadAll(variants)", variants)
        // ----
        Variant.all = new Map()
        
        if (variants) {
            $.each(variants, function (k, variant) {
                let detail = set(variant)
                Variant.all.set(detail.id, detail)
                $table_variant_product_edit.insertRow(detail)
                //console.log("Variant - detail", detail)
            })
        }
    }
    
    const init = function (settings) {
        //console.log("Variant.init(settings)", Variant)
        // ----
        let variants = []
        if (settings) {
            if (settings) {
                variants = settings
            }
        }
        
        if (_table_variant_product_edit) {
            buildProductEditTable()
        }
        
        loadAll(variants)
        
        if (_product_edit_variant_form_variant_name_filter) {
            initAutoComplete()
        }
        
        if (_product_edit_variant_form) {
            validator_init(form_rules)
            Variant.validator = $(_product_edit_variant_form).validate()
            resetForm()
            updateProgress()
        }
    }
    
    const edit = function (variant) {
        //console.log("Variant.edit(variant)", variant)
        // ----
        if (variant) {
            let detail = set(variant)
            populateForm(detail)
        }
        
    }
    
    const set = function (variant) {
        let detail = defaultDetail()
        if (variant) {
            detail.id = (variant.id) ? variant.id : null
            detail.category_id = (variant.category_id) ? variant.category_id : null
            detail.name = (variant.name) ? variant.name : null
            detail.code = (variant.code) ? variant.code : null
            detail.min_age = (variant.min_age) ? variant.min_age.toString() : null
            detail.max_age = (variant.max_age) ? variant.max_age : null
            detail.enabled = (variant.enabled) ? variant.enabled : 1
            detail.date_created = (variant.date_created) ? variant.date_created : formatDateMySQL()
            detail.created_by = (variant.created_by) ? variant.created_by : user_id
            detail.date_modified = (variant.date_modified) ? variant.date_modified : formatDateMySQL()
            detail.modified_by = (variant.modified_by) ? variant.modified_by : user_id
            detail.used_in_pricing = (variant.used_in_pricing === 1) ? 1 : 0
            detail.note = (variant.note) ? variant.note : null
        }
        
        Product.detail = detail
        return detail
    }
    
    return {
        validator: null,
        all: new Map(),
        set: function (variant) {
            return set(variant)
        },
        edit: function (variant) {
            edit(variant)
        },
        init: function (settings) {
            init(settings)
        },
    }
})()
