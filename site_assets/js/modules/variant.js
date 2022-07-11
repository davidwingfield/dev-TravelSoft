const Variant = (function () {
    "use strict"
    
    const _button_remove_variant_from_product = document.getElementById("button_remove_variant_from_product")
    const _product_edit_variant_section = document.getElementById("product_edit_variant_section")
    const _panel_tab_variant = document.getElementById("panel_tab_variant")
    const _category_id = document.getElementById("category_id")
    const _product_id = document.getElementById("product_id")
    const _product_edit_variant_form_variant_name_filter = document.getElementById("product_edit_variant_form_variant_name_filter")
    const _table_variant_product_edit = document.getElementById("table_variant_product_edit")
    const _product_edit_variant_form = document.getElementById("product_edit_variant_form")
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
    const _product_edit_variant_display = document.getElementById("product_edit_variant_display")
    
    let userId = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
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
            console.groupCollapsed("table_variant_product_edit_add_new_button:click")
            // ----
            
            $table_variant_product_edit.clearSelectedRows()
            populateForm()
            
            _product_edit_variant_form_variant_name.disabled = false
            
            // ----
            console.groupEnd()
        })
    
    $(_product_edit_variant_form_clear_button)
        .on("click", function () {
            console.groupCollapsed("product_edit_variant_form_clear_button:click")
            // ----
            
            resetForm()
            $table_variant_product_edit.clearSelectedRows()
            
            // ----
            console.groupEnd()
        })
    
    $(_product_edit_variant_form_close_button)
        .on("click", function () {
            console.groupCollapsed("product_edit_variant_form_close_button:click")
            // ----
            
            resetForm()
            $table_variant_product_edit.clearSelectedRows()
            
            // ----
            console.groupEnd()
        })
    
    $(_product_edit_variant_form_submit_button)
        .on("click", function () {
            console.groupCollapsed("Variant.product_edit_variant_form_submit_button:click()", this)
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
    
    const clearProductOverview = function (variant) {
        console.groupCollapsed("Variant.clearProductOverview")
        // ----
        
        let color_scheme, product_unit_detail
        
        if (!variant) {
            //console.log("No Variant", variant)
            return
        }
        
        let variantId = (!isNaN(parseInt(variant.id))) ? parseInt(variant.id) : null
        
        if (variantId) {
            $(`#product_edit_variant_display_${variantId}`).remove()
        }
        
        // ----
        console.groupEnd()
    }
    const buildProductOverview = function (variant) {
        console.groupCollapsed("Variant.buildProductOverview")
        // ----
        
        if (!variant) {
            //console.log("variant", variant)
            return
        }
        
        let variantId = (!isNaN(parseInt(variant.id))) ? parseInt(variant.id) : null
        let variantMaxAge = (!isNaN(parseInt(variant.max_age))) ? parseInt(variant.max_age) : null
        let variantMinAge = (!isNaN(parseInt(variant.min_age))) ? parseInt(variant.min_age) : null
        let variantName = (variant.name) ? variant.name : null
        let variantCode = (variant.code) ? variant.code : null
        
        if (Variant.all.get(variantId)) {
            clearProductOverview(Variant.all.get(variantId))
        }
        
        $(_product_edit_variant_display).append(`
            <div id="product_edit_variant_display_${variantId}" class="col-12 col-sm-12 col-md-4 px-1">
                <div class="card">
                    <div class="card-body">
                    
                        <h5 class="card-title">${variantName}</h5>
                        <h6 class="card-subtitle my-2 text-muted">${variantCode}</h6>
                        <p class="card-text"></p>
       
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th>&nbsp;</th>
                                    <th>Min</th>
                                    <th>Max</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Age</td>
                                    <td>${variantMinAge}</td>
                                    <td>${variantMaxAge}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `)
        
        // ----
        console.groupEnd()
    }
    const remove = function () {
        console.groupCollapsed("Variant.remove")
        // ----
        
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
                        YearCalendar.endLoading()
                        clearProductOverview(detail)
                        
                        toastr["warning"](`Variant: ${detail.name} - has been removed`, "Variant")
                    }
                })
            } else {
                resetForm()
                $table_variant_product_edit.clearSelectedRows()
                _product_edit_variant_form_variant_name_filter.value = ""
                _product_edit_variant_form_variant_name_filter.disabled = false
            }
        })
        
        // ----
        console.groupEnd()
    }
    const removeProductVariant = function (dataToSend, callback) {
        console.groupCollapsed("Variant.removeProductVariant")
        // ----
        
        if (dataToSend) {
            let url = "/api/v1.0/variants/remove"
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        handleVariantError("Oops: 1")
                    }
                })
            } catch (e) {
                //console.log("error", e)
            }
        }
        
        // ----
        console.groupEnd()
    }
    const updateProgress = function () {
        console.groupCollapsed("Variant.updateProgress")
        // ----
        
        let variants = Array.from(Variant.all.values())
        
        if (variants.length === 0) {
            let warningNotice = $("<span/>", {
                "class": "badge badge-danger  ml-2",
                "text": "!",
                "id": "variantNeedsAttention",
            })
            
            $(_panel_tab_variant).html(`<span id="tab_span_variant">Variant</span> <span id="variantNeedsAttention" class="badge rounded-pill badge-notification bg-danger">!</span>`)
        } else {
            $(_panel_tab_variant).html(`<span id="tab_span_variant">Variant</span>`)
        }
        
        Product.updateProgress()
        
        // ----
        console.groupEnd()
    }
    const initAutoComplete = function () {
        console.groupCollapsed("Variant.initAutoComplete")
        // ----
        
        let category_id = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
        
        $(_product_edit_variant_form_variant_name_filter)
            .on("click", function () {
                $(this).select()
            })
            .on("search", function () {
                globalSelectedVariant = false
                resetForm()
                $table_variant_product_edit.clearSelectedRows()
            })
            .on("change", function () {
                setTimeout(function () {
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
                    
                    _product_edit_variant_form_variant_name.disabled = true
                },
            })
        
        // ----
        console.groupEnd()
    }
    const handleVariantError = function (msg, title, level) {
        console.groupCollapsed("Variant.handleVariantError")
        // ----
        
        if (!msg) {
            msg = "Variant Error"
        }
        
        if (!title) {
            title = "Variant"
        }
        
        if (!level) {
            level = "error"
        }
        
        toastr[level](`${msg}`, title)
        
        // ----
        console.groupEnd()
    }
    const fetchByName = function (dataToSend, callback) {
        console.groupCollapsed("Variant.fetchByName")
        // ----
        
        let url = "/api/v1.0/variants/validate"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        handleVariantError("Oops: 1")
                    }
                })
            } catch (e) {
                //console.log("error", e)
                handleVariantError("Error Validating Variant")
            }
        } else {
            handleVariantError("Error Loading Variant - Missing Data")
        }
        
        // ----
        console.groupEnd()
    }
    const nameExists = function (name) {
        console.groupCollapsed("Variant.nameExists")
        // ----
        
        if (name && name !== "") {
            
            let dataToSend = remove_nulls({
                name: name,
                category_id: (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null,
            })
            
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
                    
                    if (hasVariant) {
                        detail = set(hasVariant)
                        $table_variant_product_edit.loadRow(detail)
                    } else {
                        detail = set(variant)
                    }
                    
                    populateForm(detail)
                    
                    _product_edit_variant_form_variant_name.disabled = true
                    
                } else {
                    confirmDialog(`The variant: ${name} does not exist exists. Would you like to create it?`, (ans) => {
                        if (ans) {
                            let url = "/api/v1.0/variants/new"
                            try {
                                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                                    if (data) {
                                        let variant = data
                                        if (data[0]) {
                                            variant = data[0]
                                        }
                                        let detail = set(variant)
                                        
                                        clearForm()
                                        
                                        $table_variant_product_edit.clearSelectedRows()
                                        globalSelectedVariant = false
                                        
                                        _product_edit_variant_form_variant_name.value = name
                                        _display_product_variant_name.innerText = name
                                        
                                        populateForm(detail)
                                        enableFormFields()
                                    } else {
                                        return handleVariantError("Oops: 1")
                                    }
                                })
                            } catch (e) {
                                //console.log("error", e)
                            }
                        }
                    })
                }
            })
        }
        
        // ----
        console.groupEnd()
    }
    const buildProductEditTable = function () {
        console.groupCollapsed("Variant.buildProductEditTable")
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
        
        // ----
        console.groupEnd()
    }
    const defaultDetail = function () {
        console.groupCollapsed("Variant.defaultDetail")
        // ----
        
        let details = {
            id: null,
            category_id: null,
            name: null,
            min_age: null,
            max_age: null,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: userId,
            date_modified: formatDateMySQL(),
            modified_by: userId,
            used_in_pricing: 1,
            note: null,
        }
        
        // ----
        console.groupEnd()
        return details
    }
    const resetForm = function () {
        console.groupCollapsed("Variant.resetForm")
        // ----
        
        clearForm()
        disableFormFields()
        hideForm()
        
        // ----
        console.groupEnd()
    }
    const validVariantRecord = function () {
        console.groupCollapsed("Variant.validVariantRecord")
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
        
        // ----
        console.groupEnd()
        return valid
    }
    const clearForm = function () {
        console.groupCollapsed("Variant.clearForm")
        // ----
        
        clearValidation(_product_edit_variant_form)
        
        _display_product_variant_name.innerText = "&nbsp;"
        _product_edit_variant_form_variant_id.value = ""
        _product_edit_variant_form_variant_name.value = ""
        _product_edit_variant_form_variant_enabled.checked = true
        _product_edit_variant_form_variant_code.value = ""
        _product_edit_variant_form_variant_min_age.value = 0
        _product_edit_variant_form_variant_max_age.value = ""
        _product_edit_variant_form_variant_used_in_pricing.checked = true
        
        // ----
        console.groupEnd()
    }
    const populateForm = function (variant) {
        console.groupCollapsed("Variant.populateForm")
        // ----
        
        clearForm()
        
        if (variant) {
            _product_edit_variant_form_variant_used_in_pricing.checked = (variant.used_in_pricing === 1)
            _display_product_variant_name.innerText = (variant.name) ? variant.name : "&nbsp;"
            _product_edit_variant_form_variant_id.value = (!isNaN(parseInt(variant.id))) ? parseInt(variant.id) : ""
            _product_edit_variant_form_variant_name.value = (variant.name) ? variant.name : "&nbsp;"
            _product_edit_variant_form_variant_enabled.checked = (!(variant.enabled && variant.enabled === 0))
            _product_edit_variant_form_variant_code.value = (variant.name) ? variant.name : "&nbsp;"
            _product_edit_variant_form_variant_min_age.value = (!isNaN(parseInt(variant.min_age))) ? parseInt(variant.min_age) : 1
            _product_edit_variant_form_variant_max_age.value = (!isNaN(parseInt(variant.max_age))) ? parseInt(variant.max_age) : ""
        }
        
        enableFormFields()
        loadForm()
        
        // ----
        console.groupEnd()
    }
    const hideForm = function () {
        console.groupCollapsed("Variant.hideForm")
        // ----
        
        updateProgress()
        _product_edit_variant_form_variant_name_filter.disabled = false
        _product_edit_variant_form_variant_name_filter.value = ""
        
        $(_product_edit_variant_form).hide()
        
        // ----
        console.groupEnd()
    }
    const loadForm = function () {
        console.groupCollapsed("Variant.loadForm")
        // ----
        
        _product_edit_variant_form_variant_name_filter.disabled = true
        
        $(_product_edit_variant_form).show()
        
        // ----
        console.groupEnd()
    }
    const enableFormFields = function () {
        console.groupCollapsed("Variant.enableFormFields")
        // ----
        
        _product_edit_variant_form_variant_used_in_pricing.disabled = false
        _product_edit_variant_form_variant_id.disabled = true
        _product_edit_variant_form_variant_name.disabled = true
        _product_edit_variant_form_variant_enabled.disabled = true
        _product_edit_variant_form_variant_code.disabled = true
        _product_edit_variant_form_variant_min_age.disabled = false
        _product_edit_variant_form_variant_max_age.disabled = false
        _product_edit_variant_form_submit_button.disabled = false
        
        // ----
        console.groupEnd()
    }
    const disableFormFields = function () {
        console.groupCollapsed("Variant.disableFormFields")
        // ----
        
        _product_edit_variant_form_variant_used_in_pricing.disabled = true
        _product_edit_variant_form_variant_id.disabled = true
        _product_edit_variant_form_variant_name.disabled = true
        _product_edit_variant_form_variant_enabled.disabled = true
        _product_edit_variant_form_variant_code.disabled = true
        _product_edit_variant_form_variant_min_age.disabled = true
        _product_edit_variant_form_variant_max_age.disabled = true
        _product_edit_variant_form_submit_button.disabled = true
        
        // ----
        console.groupEnd()
    }
    const buildVariantRecord = function () {
        console.groupCollapsed("Variant.buildVariantRecord")
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
        
        // ----
        console.groupEnd()
        return remove_nulls(dataToSend)
    }
    const saveProductVariant = function (dataToSend, callback) {
        console.groupCollapsed("Variant.saveProductVariant")
        // ----
        
        if (dataToSend) {
            let url = "/api/v1.0/variants/update"
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        handleVariantError("Oops: 1")
                    }
                })
            } catch (e) {
                //console.log("error", e)
            }
        }
        
        // ----
        console.groupEnd()
    }
    const save = function () {
        console.groupCollapsed("Variant.save")
        // ----
        
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
                            buildProductOverview(detail)
                            
                            YearCalendar.endLoading()
                            toastr["success"](`Variant: ${detail.name} - has been updated`, "Variant")
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
        
        // ----
        console.groupEnd()
    }
    const loadAll = function (variants) {
        console.groupCollapsed("Variant.loadAll")
        // ----
        
        Variant.all = new Map()
        
        if (variants) {
            $.each(variants, function (k, variant) {
                let detail = set(variant)
                
                Variant.all.set(detail.id, detail)
                
                $table_variant_product_edit.insertRow(detail)
                
                buildProductOverview(detail)
            })
        }
        
        // ----
        console.groupEnd()
    }
    const init = function (settings) {
        console.groupCollapsed("Variant.init")
        // ----
        
        let variants = []
        if (settings) {
            console.log("settings", settings)
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
        
        // ----
        console.groupEnd()
    }
    const edit = function (variant) {
        console.groupCollapsed("Variant.edit")
        // ----
        
        if (variant) {
            let detail = set(variant)
            populateForm(detail)
        }
        
        // ----
        console.groupEnd()
    }
    const set = function (variant) {
        console.groupCollapsed("Variant.set")
        // ----
        
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
            detail.created_by = (variant.created_by) ? variant.created_by : userId
            detail.date_modified = (variant.date_modified) ? variant.date_modified : formatDateMySQL()
            detail.modified_by = (variant.modified_by) ? variant.modified_by : userId
            detail.used_in_pricing = (variant.used_in_pricing === 1) ? 1 : 0
            detail.note = (variant.note) ? variant.note : null
        }
        
        Product.detail = detail
        
        // ----
        console.groupEnd()
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
