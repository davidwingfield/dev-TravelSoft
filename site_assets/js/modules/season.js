const Season = (function () {
    "use strict"
    const _edit_product_season = document.getElementById("edit_product_season")
    const _product_edit_season_form_edit_season_link = document.getElementById("product_edit_season_form_edit_season_link")
    const _product_season = document.getElementById("product_season")
    const _product_edit_season_form_season_name_filter = document.getElementById("product_edit_season_form_season_name_filter")
    const _category_id = document.getElementById("category_id")
    const _product_edit_season_form_season_color_scheme_id = document.getElementById("product_edit_season_form_season_color_scheme_id")
    const _product_edit_season_form_season_id = document.getElementById("product_edit_season_form_season_id")
    const _product_edit_season_form_season_name = document.getElementById("product_edit_season_form_season_name")
    const _product_edit_season_id_name_display = document.getElementById("product_edit_season_id_name_display")
    const _product_edit_season_form_season_enabled = document.getElementById("product_edit_season_form_season_enabled")
    const _edit_season_button = document.getElementById("edit_season_button")
    const _table_season_product_edit = document.getElementById("table_season_product_edit")
    const _button_clear_form_edit_season = document.getElementById("button_clear_form_edit_season")
    const _display_product_season_name = document.getElementById("display_product_season_name")
    const _button_submit_form_edit_season = document.getElementById("button_submit_form_edit_season")
    const _product_id = document.getElementById("product_id")
    const _panel_tab_season = document.getElementById("panel_tab_season")
    const _button_remove_season_from_product = document.getElementById("button_remove_season_from_product")
    const _calendar_loader = document.getElementById("calendar_loader")
    const _table_season_product_edit_add_new_button = document.getElementById("table_season_product_edit_add_new_button")
    const _product_edit_season_section = document.getElementById("product_edit_season_section")
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let categories = new Map()
    let $table_season_product_edit, disabledDays
    let globalSelectedSeason = false
    
    $(_table_season_product_edit_add_new_button)
        .on("click", function () {
            loadProductSeasonForm()
            _product_edit_season_form_season_name.disabled = false
            _product_edit_season_form_season_name.readonly = false
            
            ColorScheme.enable()
        })
    
    $(_button_remove_season_from_product)
        .on("click", function () {
            
            let dataToSend = {
                product_id: parseInt(_product_id.value),
                season_id: parseInt(_product_edit_season_form_season_id.value),
            }
            
            confirmDialog(`Would you like to update? This change may affect your Pricing Worksheets.`, (ans) => {
                if (ans) {
                    removeProductSeason(dataToSend)
                }
            })
        })
    
    $(_product_edit_season_form_edit_season_link)
        .on("click", function () {
            loadEditSeasonForm()
        })
    
    $(_edit_season_button)
        .on("click", function () {
            ColorScheme.enable()
        })
    
    $(_button_clear_form_edit_season)
        .on("click", function () {
            _product_edit_season_form_season_name_filter.value = ""
            resetForm()
            clearProductSeasonForm()
            $table_season_product_edit.clearSelectedRows()
        })
    
    $(_button_submit_form_edit_season)
        .on("click", function () {
            let dataToSend = buildUpdateRecord()
            
            confirmDialog(`Would you like to update? This change may affect your Pricing Worksheets.`, (ans) => {
                if (ans) {
                    saveProductSeason(dataToSend)
                }
            })
        })
    
    $(_panel_tab_season)
        .on("hide.bs.tab", function () {
            _product_edit_season_form_season_name_filter.value = ""
            resetForm()
            clearProductSeasonForm()
            $table_season_product_edit.clearSelectedRows()
        })
    
    const updateProgress = function () {
        let seasons = Array.from(Season.all.values())
        if (seasons.length === 0) {
            $(_panel_tab_season).html(`Season <span id="seasonNeedsAttention" class="badge rounded-pill badge-notification bg-danger">!</span>`)
        } else {
            $(_panel_tab_season).html(`Season`)
        }
        Product.updateProgress()
    }
    
    const saveProductSeason = function (dataToSend) {
        if (dataToSend) {
            $(_calendar_loader).fadeIn("fast", function () {
                updateProductSeason(dataToSend, function (data) {
                    if (data) {
                        let season = (data[0]) ? data[0] : data
                        addProductSeasonTableRow(season)
                    } else {
                        YearCalendar.endLoading()
                    }
                })
            })
        }
    }
    
    const updateProductSeason = function (dataToSend, callback) {
        let url = "/api/v1.0/seasons/update"
        
        if (dataToSend) {
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleSeasonError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
            }
        }
    }
    
    const deleteProductSeason = function (dataToSend, callback) {
        let url = "/api/v1.0/seasons/remove"
        
        if (dataToSend) {
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleSeasonError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
            }
        }
    }
    
    const removeProductSeason = function (dataToSend) {
        if (dataToSend) {
            $(_calendar_loader).fadeIn("fast", function () {
                deleteProductSeason(dataToSend, function (data) {
                    if (data) {
                        deleteProductSeasonTableRow(dataToSend.season_id)
                    } else {
                        YearCalendar.endLoading()
                    }
                })
            })
        }
    }
    
    const handleSeasonError = function (msg) {
        toastr.error(msg)
    }
    
    const buildUpdateRecord = function () {
        return remove_nulls({
            product_id: (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null,
            season_id: (!isNaN(parseInt(_product_edit_season_form_season_id.value))) ? parseInt(_product_edit_season_form_season_id.value) : null,
            disabled_dow: formatListOfIds(disabledDays.disabled_dows),
        })
    }
    
    const defaultDetail = function () {
        return {
            id: null,
            color_scheme_id: null,
            name: null,
            view_product_index: 1,
            view_product_index_filter: 1,
            view_product_index_search: 1,
            view_product_edit: 1,
            view_product_package_edit: 1,
            view_product_package_index: 1,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            note: null,
            category_id: null,
            color_scheme: {
                id: null,
                name: null,
                background_color: null,
                border_color: null,
                text_color: null,
                sort_order: 999,
                enabled: 1,
                date_created: formatDateMySQL(),
                created_by: user_id,
                date_modified: formatDateMySQL(),
                modified_by: user_id,
                note: null,
            },
            product_season_detail: {
                created_by: user_id,
                date_created: formatDateMySQL(),
                date_modified: formatDateMySQL(),
                disabled_dow: null,
                enabled: 1,
                id: null,
                modified_by: user_id,
                note: null,
                product_id: null,
                season_id: null,
                seasons_background: null,
                seasons_border: null,
                seasons_text: null,
            },
        }
    }
    
    const formatSeasonType = function (season) {
        
        let detail = defaultDetail()
        
        // -----
        
        let category_id = (!isNaN(parseInt(season.category_id))) ? parseInt(season.category_id) : null
        
        //
        detail.id = (!isNaN(parseInt(season.id))) ? parseInt(season.id) : null
        detail.color_scheme_id = (!isNaN(parseInt(season.color_scheme_id))) ? parseInt(season.color_scheme_id) : null
        detail.name = (season.name) ? season.name : null
        detail.view_product_index = (season.view_product_index) ? season.view_product_index : 1
        detail.view_product_index_filter = (season.view_product_index_filter) ? season.view_product_index_filter : 1
        detail.view_product_index_search = (season.view_product_index_search) ? season.view_product_index_search : 1
        detail.view_product_edit = (season.view_product_edit) ? season.view_product_edit : 1
        detail.view_product_package_edit = (season.view_product_package_edit) ? season.view_product_package_edit : 1
        detail.view_product_package_index = (season.view_product_package_index) ? season.view_product_package_index : 1
        detail.enabled = (season.enabled) ? season.enabled : 1
        detail.date_created = (season.date_created) ? season.date_created : formatDateMySQL()
        detail.created_by = (!isNaN(parseInt(season.created_by))) ? parseInt(season.created_by) : user_id
        detail.date_modified = (season.date_modified) ? season.date_modified : formatDateMySQL()
        detail.modified_by = (!isNaN(parseInt(season.modified_by))) ? parseInt(season.modified_by) : user_id
        detail.note = (season.note) ? season.note : null
        detail.category_id = (!isNaN(parseInt(season.category_id))) ? parseInt(season.category_id) : null
        detail.color_scheme.id = (!isNaN(parseInt(season.color_scheme.id))) ? parseInt(season.color_scheme.id) : null
        detail.color_scheme.name = season.color_scheme.name
        detail.color_scheme.background_color = season.color_scheme.background_color
        detail.color_scheme.border_color = season.color_scheme.border_color
        detail.color_scheme.text_color = season.color_scheme.text_color
        detail.color_scheme.sort_order = (!isNaN(parseInt(season.color_scheme.sort_order))) ? parseInt(season.color_scheme.sort_order) : 999
        detail.color_scheme.enabled = season.color_scheme.enabled
        detail.color_scheme.date_created = (season.color_scheme.date_created) ? season.color_scheme.date_created : formatDateMySQL()
        detail.color_scheme.created_by = (!isNaN(parseInt(season.color_scheme.created_by))) ? parseInt(season.color_scheme.created_by) : user_id
        detail.color_scheme.date_modified = (season.color_scheme.date_modified) ? season.color_scheme.date_modified : formatDateMySQL()
        detail.color_scheme.modified_by = (!isNaN(parseInt(season.color_scheme.modified_by))) ? parseInt(season.color_scheme.modified_by) : user_id
        detail.color_scheme.note = season.color_scheme.note
        
        if (!categories.get(category_id)) {
            categories.set(category_id, {
                seasons: [],
            })
        }
        
        let category = categories.get(category_id)
        let category_seasons = (category.seasons) ? category.seasons : []
        //console.log(categories.get(category_id).seasons)
        //console.log("category", category)
        //console.log(detail)
        return detail
    }
    
    const loadTypes = function (seasons) {
        categories = new Map()
        if (seasons) {
            
            $.each(seasons, function (i, season) {
                Season.types.set(season.id, formatSeasonType(season))
            })
        }
    }
    
    const loadAll = function (seasons) {
        Season.all = new Map()
        if (_table_season_product_edit) {
            buildProductEditTable()
        }
        
        if (!seasons) {
            seasons = []
        }
        
        $.each(seasons, function (k, season) {
            let detail = set(season)
            
            if (!isNaN(parseInt(detail.id))) {
                $table_season_product_edit.insertRow(detail)
                Season.all.set(parseInt(detail.id), detail)
            }
        })
        
        updateProgress()
    }
    
    const set = function (season) {
        let detail = defaultDetail()
        if (season) {
            detail = season
        }
        return detail
    }
    
    const edit = function (season) {
        if (season) {
            if (season.id) {
                let seasonId = season.id
                console.log("seasonId", seasonId)
                let loadedSeasonId = (!_product_edit_season_form_season_id) ? null : (!isNaN(parseInt(_product_edit_season_form_season_id.value))) ? parseInt(_product_edit_season_form_season_id.value) : null
                console.log("loadedSeasonId", loadedSeasonId)
            }
        }
        
        clearProductSeasonForm()
        loadProductSeasonForm(season)
    }
    
    const buildProductEditTable = function () {
        $table_season_product_edit = $(_table_season_product_edit).table({
            table_type: "display_list",
            data: Season.all,
            columnDefs: [
                {
                    title: "Id",
                    targets: 0,
                    data: "id",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                }, {
                    title: "Name",
                    targets: 1,
                    data: "name",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                }, {
                    title: "Color Scheme",
                    targets: 2,
                    data: "color_scheme",
                    render: function (data, type, row, meta) {
                        let background_color = data.background_color
                        let text_color = data.text_color
                        let border_color = data.border_color
                        let name = data.name
                        return `
                            <div style="font-size:14px; line-height:1.25;padding-left:.5rem;background:${background_color};color:${text_color}; border:solid 1px ${border_color}">${name}</div>
                        `
                    },
                }, {
                    title: "Disabled DOW",
                    targets: 3,
                    data: "product_season_detail",
                    render: function (data, type, row, meta) {
                        //console.log("product_season_detail", data)
                        let disabled_days = (data.disabled_dow) ? getListOfIds(data.disabled_dow) : []
                        let d = []
                        for (let n = 0; n < disabled_days.length; n++) {
                            d.push(dow_short[disabled_days[n]])
                        }
                        
                        data = d.join(', ')
                        return `
                            <span>${data}</span>
                        `
                    },
                },
            ],
            rowClick: Season.edit,
        })
    }
    
    const deleteProductSeasonTableRow = function (season_id) {
        if (season_id) {
            let hasSeason = Season.all.get(season_id)
            
            if (hasSeason) {
                Season.all.delete(season_id)
                
                $table_season_product_edit.deleteRow(hasSeason)
                $table_season_product_edit.clearSelectedRows()
                
                _product_edit_season_form_season_name_filter.value = ""
                
                PricingWorksheet.pricingWorksheet()
                Pricing.resetForm()
                YearCalendar.refresh()
                
                updateProgress()
                resetForm()
                clearProductSeasonForm()
                
                toastr.success(`Season: ${hasSeason.name} - has been deleted`)
                YearCalendar.endLoading()
            }
        }
        
    }
    
    const addProductSeasonTableRow = function (season) {
        if (season) {
            let detail = set(season)
            let hasSeason = Season.all.get(detail.id)
            
            if (hasSeason) {
                $table_season_product_edit.updateRow(detail)
            } else {
                $table_season_product_edit.insertRow(detail)
            }
            
            Season.all.set(detail.id, detail)
            
            $table_season_product_edit.loadRow(detail)
            $table_season_product_edit.jumpToRow(detail)
            $table_season_product_edit.clearSelectedRows()
            
            _product_edit_season_form_season_name_filter.value = ""
            
            PricingWorksheet.pricingWorksheet()
            Pricing.resetForm()
            YearCalendar.refresh()
            
            updateProgress()
            resetForm()
            clearProductSeasonForm()
            
            toastr.success(`Season: ${detail.name} - has been updated`)
            YearCalendar.endLoading()
        }
    }
    
    const resetForm = function () {
        _product_edit_season_form_season_id.value = ""
        _product_edit_season_form_season_name.value = ""
        _product_edit_season_id_name_display.value = ""
        _product_edit_season_form_season_enabled.checked = true
        updateProgress()
        ColorScheme.load()
    }
    
    const loadEditSeasonForm = function () {
        //$(_edit_season).show()
    }
    
    const unLoadEditSeasonForm = function () {
        //$(_edit_season).hide()
    }
    
    const clearProductSeasonForm = function () {
        disabledDays.init([])
        unloadProductSeasonForm()
    }
    
    const loadProductSeasonForm = function (season) {
        let disabled_dow = []
        let name = "Details"
        if (season) {
            let color_scheme = (season.color_scheme) ? season.color_scheme : {}
            name = (season.name) ? season.name : "Detail"
            if (season.product_season_detail && season.product_season_detail.disabled_dow) {
                disabled_dow = getListOfIds(season.product_season_detail.disabled_dow)
            }
            
            ColorScheme.load(color_scheme)
            ColorScheme.disable()
            
            _product_edit_season_form_season_id.value = season.id
            _product_edit_season_form_season_name.value = season.name
            _product_edit_season_form_season_color_scheme_id.value = season.color_scheme_id
            _product_edit_season_form_season_enabled.checked = (season.enabled === 1)
            _product_edit_season_form_season_enabled.disabled = true
            _product_edit_season_form_season_name_filter.disabled = true
        }
        _product_edit_season_form_season_name_filter.disabled = true
        _display_product_season_name.innerText = name
        disabledDays.init(disabled_dow)
        $(_edit_product_season).show()
    }
    
    const unloadProductSeasonForm = function () {
        console.log("unloadProductSeasonForm()")
        _product_edit_season_form_season_name_filter.disabled = false
        _product_edit_season_form_season_name.disabled = true
        $(_edit_product_season).hide()
    }
    
    const seasonExists = function (name) {
        let category_id = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
        if (name && name !== "" && category_id) {
            let dataToSend = {
                name: name,
                category_id: category_id,
            }
            
            fetchByName(dataToSend, function (data) {
                let season = null
                
                if (data) {
                    season = data
                    if (data[0]) {
                        season = data[0]
                    }
                }
                
                if (season && season.id) {
                    globalSelectedSeason = true
                    let color_scheme = (season.color_scheme) ? season.color_scheme : {}
                    let product_season = Season.all.get(season.id)
                    
                    $table_season_product_edit.clearSelectedRows()
                    
                    _product_edit_season_form_season_id.value = season.id
                    _product_edit_season_form_season_name.value = season.name
                    _product_edit_season_form_season_color_scheme_id.value = season.color_scheme_id
                    _product_edit_season_form_season_enabled.checked = (season.enabled === 1)
                    
                    _product_edit_season_form_season_enabled.disabled = true
                    
                    ColorScheme.load(color_scheme)
                    ColorScheme.disable()
                    
                    if (product_season) {
                        loadProductSeasonForm(product_season)
                        $table_season_product_edit.loadRow(product_season)
                    } else {
                        loadProductSeasonForm(season)
                    }
                } else {
                    confirmDialog(`The season: ${name} does not exist exists. Would you like to create it?`, (ans) => {
                        if (ans) {
                            addSeason(dataToSend, function (data) {
                                let season = null
                                
                                if (data) {
                                    season = data
                                    if (data[0]) {
                                        season = data[0]
                                    }
                                }
                                
                                if (season && season.id) {
                                    let color_scheme = (season.color_scheme) ? season.color_scheme : {}
                                    let product_season = Season.all.get(season.id)
                                    
                                    $table_season_product_edit.clearSelectedRows()
                                    
                                    _product_edit_season_form_season_id.value = season.id
                                    _product_edit_season_form_season_name.value = season.name
                                    _product_edit_season_form_season_color_scheme_id.value = season.color_scheme_id
                                    _product_edit_season_form_season_enabled.checked = (season.enabled === 1)
                                    
                                    _product_edit_season_form_season_enabled.disabled = true
                                    
                                    ColorScheme.load(color_scheme)
                                    ColorScheme.disable()
                                    
                                    if (product_season) {
                                        loadProductSeasonForm(product_season)
                                        $table_season_product_edit.loadRow(product_season)
                                    } else {
                                        loadProductSeasonForm(season)
                                    }
                                }
                            })
                        } else {
                            $table_season_product_edit.clearSelectedRows()
                            resetForm()
                        }
                    })
                }
            })
        }
    }
    
    const addSeason = function (dataToSend, callback) {
        let url = "/api/v1.0/seasons/add"
        
        if (dataToSend) {
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        handleSeasonError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
                handleSeasonError("Error Validating Airport")
            }
        } else {
            handleSeasonError("Error Loading Airport - Missing Data")
        }
    }
    
    const fetchByName = function (dataToSend, callback) {
        let url = "/api/v1.0/seasons/validate"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        handleSeasonError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
                handleSeasonError("Error Validating Airport")
            }
        } else {
            handleSeasonError("Error Loading Airport - Missing Data")
        }
    }
    
    const initAutoComplete = function () {
        let category_id = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
        
        $(_product_edit_season_form_season_name_filter)
            .on("click", function () {
                if ($(this).attr("readonly") === "readonly") {
                    e.preventDefault()
                } else {
                    $(this).select()
                }
            })
            .on("search", function () {
                $table_season_product_edit.clearSelectedRows()
                resetForm()
            })
            .on("change", function () {
                setTimeout(function () {
                    if (_product_edit_season_form_season_name_filter.value === "") {
                        $table_season_product_edit.clearSelectedRows()
                        resetForm()
                    } else {
                        seasonExists(_product_edit_season_form_season_name_filter.value)
                    }
                }, 200)
            })
            .autocomplete({
                serviceUrl: "/api/v1.0/autocomplete/seasons",
                minChars: 2,
                cache: false,
                dataType: "json",
                triggerSelectOnValidInput: false,
                paramName: "st",
                params: { "category_id": category_id },
                onSelect: function (suggestion) {
                    if (!suggestion.data) {
                        return
                    }
                    let season = suggestion.data
                    let color_scheme = (season.color_scheme) ? season.color_scheme : {}
                    let product_season = Season.all.get(season.id)
                    
                    $table_season_product_edit.clearSelectedRows()
                    
                    _product_edit_season_form_season_id.value = season.id
                    _product_edit_season_form_season_name.value = season.name
                    _product_edit_season_form_season_color_scheme_id.value = season.color_scheme_id
                    _product_edit_season_form_season_enabled.checked = (season.enabled === 1)
                    
                    _product_edit_season_form_season_enabled.disabled = true
                    
                    ColorScheme.load(color_scheme)
                    ColorScheme.disable()
                    
                    if (product_season) {
                        loadProductSeasonForm(product_season)
                        $table_season_product_edit.loadRow(product_season)
                    } else {
                        loadProductSeasonForm(season)
                    }
                },
            })
    }
    
    const init = function (settings) {
        let seasons = []
        if (settings) {
            seasons = settings
            if (settings.seasons) {
                seasons = settings.seasons
            }
        }
        
        loadTypes(seasons)
        
        if (_product_edit_season_form_season_name_filter) {
            initAutoComplete()
            resetForm()
        }
        
        if (document.getElementById("season_disabled_dow")) {
            disabledDays = $("#season_disabled_dow").DisabledDOW({
                name: "season_disabled_dow",
                label: "Disabled DOW",
            })
            
        }
        
        if (_edit_product_season) {
            unloadProductSeasonForm()
        }
        
    }
    
    return {
        types: new Map(),
        all: new Map(),
        edit: function (seasons) {
            edit(seasons)
        },
        loadTypes: function (seasons) {
            loadTypes(seasons)
        },
        init: function (settings) {
            init(settings)
        },
        loadAll: function (seasons) {
            loadAll(seasons)
        },
    }
})()
