const PricingWorksheet = (function () {
    "use strict"
    
    const _product_edit_matrix_form = document.getElementById("product_edit_matrix_form")
    const daysOfTheWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    const _product_edit_pricing_section_reset_filters = document.getElementById("product_edit_pricing_section_reset_filters")
    const _pricing_strategy_types_id = document.getElementById("pricing_strategy_types_id")
    const _product_id = document.getElementById("product_id")
    const _pricing_strategy_unit_id = document.getElementById("pricing_strategy_unit_id")
    const _pricing_strategy_season_id = document.getElementById("pricing_strategy_season_id")
    const _button_collapse_seasons = document.getElementById("button_collapse_seasons")
    const _button_collapse_units = document.getElementById("button_collapse_units")
    const _button_toggle_completed_pricings = document.getElementById("button_toggle_completed_pricings")
    const _button_toggle_completed_matrices = document.getElementById("button_toggle_completed_matrices")
    const _product_edit_pricing_section_reload_worksheet = document.getElementById("product_edit_pricing_section_reload_worksheet")
    
    let pricingsHidden, matricesHidden, unitsCollapsed, seasonsCollapsed = false
    let completed = '<span class="badge badge-pill badge-success">Completed</span>'
    let incomplete = '<span class="badge badge-pill badge-danger">Incomplete</span>'
    let seasonList, unitList, variantList = []
    let variantCombinations = []
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    $(_product_edit_pricing_section_reload_worksheet)
        .on("click", function () {
            $(_pricing_strategy_types_id).val(PricingWorksheet.pricingStrategyId).trigger("change")
        })
    
    $(_product_edit_pricing_section_reset_filters)
        .on("click", function () {
            resetFilters()
        })
    
    $(_pricing_strategy_types_id)
        .on("change", function () {
            //pricingWorksheet()
        })
    
    $(_pricing_strategy_unit_id)
        .on("change", function () {
            filterUnits()
        })
    
    $(_pricing_strategy_season_id)
        .on("change", function () {
            filterSeasons()
        })
    
    $(_product_edit_pricing_section_reset_filters)
        .on("click", function () {
            resetFilters()
        })
    
    $(_button_toggle_completed_pricings)
        .on("click", function () {
            toggleCompletedPricings()
        })
    
    $(_button_toggle_completed_matrices)
        .on("click", function () {
            toggleCompletedMatrices()
        })
    
    $(_button_collapse_seasons)
        .on("click", function () {
            toggleSeasonFilter()
        })
    
    $(_button_collapse_units)
        .on("click", function () {
            toggleUnitFilter()
        })
    
    const status = function () {
        let hasIssues = false
        let status = "complete"
        let incompletePricings = Array.from(PricingWorksheet.incompletePricings.values())
        let incompleteMatrices = Array.from(PricingWorksheet.incompleteMatrices.values())
        
        if (incompletePricings.length > 0 || incompleteMatrices.length > 0) {
            hasIssues = true
        }
        
        $("<span>", {
            class: "badge rounded-pill badge-notification bg-danger tab-badge",
            alt: "Notification",
            css: { "color": "rgb(255, 255, 255) !important" },
            text: '!',
        })
        if (hasIssues === true) {
            status = "incomplete"
            $("#panel_tab_pricing")
                .html("Pricing<span class='badge rounded-pill badge-notification bg-danger tab-badge' style='color:#fff!important'>!</span>")
        } else {
            status = "complete"
            $("#panel_tab_pricing")
                .html("Pricing")
        }
        
        return status
    }
    
    const isDisabled = function (day, season_id) {
        let season, dow
        let dowIndex = -1
        let disabled_dow = []
        let product_season_detail = {}
        
        if (season_id && day) {
            season = Season.all.get(season_id)
            if (season) {
                product_season_detail = (season.product_season_detail) ? season.product_season_detail : {}
                disabled_dow = getListOfIds(product_season_detail.disabled_dow.trim())
                dow = daysOfTheWeek.indexOf(day)
                dowIndex = disabled_dow.indexOf(dow)
            }
        }
        
        return dowIndex >= 0
    }
    
    const tableDOW = function (pricing) {
        let DOWHEADINGROW = $("<tr/>")
        let DOWHEADINGACTIONCOLUMN = $("<th/>", {
            html: "&nbsp;",
        })
        
        let DOWHEADINGTITLECOLUMN = $("<th/>", {
            css: { "width": "120px" },
        })
        DOWHEADINGROW.attr("data-dowrow", "true")
        DOWHEADINGROW.append(DOWHEADINGTITLECOLUMN)
        
        if (pricing) {
            let beenSaved = false
            let matrix = Matrix.all.get(pricing.pricing_code)
            if (matrix) {
                beenSaved = !!(matrix.been_saved && matrix.been_saved === 1)
            }
            
            for (let n = 0; n < daysOfTheWeek.length; n++) {
                let disabled = ""
                let headingText = ucwords(daysOfTheWeek[n])
                let disabledDay = isDisabled(n, pricing.season_id)
                if (disabledDay) {
                    disabled = "disabled"
                    headingText = ucwords(daysOfTheWeek[n]) + " (disabled)"
                }
                
                let tableHeadRowColumn = $("<th/>", {
                    class: "" + disabled,
                    text: headingText,
                })
                
                DOWHEADINGROW.append(tableHeadRowColumn)
            }
            DOWHEADINGROW.append(DOWHEADINGACTIONCOLUMN)
        }
        
        return DOWHEADINGROW
    }
    
    const buildSeasonWrapper = function (season, matrixId, count) {
        return $("<div/>", {
            class: "accordion md-accordion",
            id: "accordionEx" + matrixId + "-" + count,
            role: "tablist",
            "aria-multiselectable": "true",
        })
            .attr("data-sectiontype", "season-" + season.season_id)
    }
    
    const buildUnitWrapper = function (unit, count) {
        let id = unit.id + "-" + count
        return $("<div/>", {
            class: "accordion md-accordion card card-body p-1 mb-2",
            id: "accordionUnit-" + id,
            role: "tablist",
            "aria-multiselectable": "true",
            
        })
            .attr("data-sectiontype", "unit-" + unit.id)
    }
    
    const buildPricingButtonRow = function (pricing) {
        let matrixCode = pricing.matrix_code
        
        let ROW = $("<div/>", {
            class: "row",
            //css: { "border-top": "solid 1px #dee2e6" },
        })
        
        let COL_6_1 = $("<div/>", {
            class: "col-12 col-md-6 mb-2 text-left",
        })
        
        let COL_6_2 = $("<div/>", {
            class: "col-12 col-md-6 mb-2 text-right",
        })
        
        let UPDATEBUTTON = $("<button/>", {
            class: "btn btn-primary btn-sm submit-pricing-matrix-form waves-effect waves-light",
            text: "Update",
            type: "button",
            id: "submitPricingMatrixForm-" + matrixCode,
            attr: { "data-targetform": "pricingMatrixForm-" + matrixCode },
        })
            .on("click", function () {
                updateMatrix(this)
            })
        
        COL_6_2.append(UPDATEBUTTON)
        
        return ROW.append(COL_6_1, COL_6_2)
    }
    
    const toggleCompletedMatrices = function (toggle) {
        let showElements = true
        if (toggle) {
            showElements = toggle
        }
        
        if (!$(_button_toggle_completed_matrices).attr("data-shown")) {
            $(_button_toggle_completed_matrices).attr("data-shown", (showElements === true) ? "true" : "false")
        }
        
        if ($(_button_toggle_completed_matrices).attr("data-shown") === "false") {
            $(_button_toggle_completed_matrices).attr("data-shown", "true")
            $(_button_toggle_completed_matrices).text("Hide Completed Matrices")
            showElements = true
        } else {
            $(_button_toggle_completed_matrices).attr("data-shown", "false")
            $(_button_toggle_completed_matrices).text("Show Completed Matrices")
            showElements = false
        }
        
        if (showElements) {
            $("[data-matrixcomplete='true']").show()
            matricesHidden = false
        } else {
            matricesHidden = true
            $("[data-matrixcomplete='true']").hide()
        }
        
    }
    
    const toggleCompletedPricings = function () {
        let showElements = true
        
        if (!$(_button_toggle_completed_pricings).attr("data-shown")) {
            $(_button_toggle_completed_pricings).attr("data-shown", (showElements === true) ? "true" : "false")
        }
        
        if ($(_button_toggle_completed_pricings).attr("data-shown") === "false") {
            $(_button_toggle_completed_pricings).attr("data-shown", "true")
            $(_button_toggle_completed_pricings).text("Hide Completed Pricings")
            showElements = true
        } else {
            $(_button_toggle_completed_pricings).attr("data-shown", "false")
            $(_button_toggle_completed_pricings).text("Show Completed Pricings")
            showElements = false
        }
        
        if (showElements) {
            $("[data-pricingcomplete='true']").show()
            pricingsHidden = false
        } else {
            $("[data-pricingcomplete='true']").hide()
            pricingsHidden = true
        }
        
    }
    
    const toggleUnitFilter = function () {
        let elements = document.querySelectorAll(`[data-type='unit']`)
        let showElements
        
        if (!$(_button_collapse_units).attr("data-shown")) {
            $(_button_collapse_units).attr("data-shown", "true")
            showElements = true
        }
        
        if ($(_button_collapse_units).attr("data-shown") === "false") {
            $(_button_collapse_units).attr("data-shown", "true")
            $(_button_collapse_units).text("Collapse Units")
            showElements = true
        } else {
            $(_button_collapse_units).attr("data-shown", "false")
            $(_button_collapse_units).text("Expand Units")
            showElements = false
        }
        
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i]
            let id = $(element).attr("id")
            $("#" + id).collapse((showElements === true) ? "show" : "hide")
            unitsCollapsed = (showElements === true)
            //pricingsHidden, matricesHidden, unitsCollapsed, seasonsCollapsed = false
        }
    }
    
    const toggleSeasonFilter = function () {
        let elements = document.querySelectorAll(`[data-type='season']`)
        let showElements = true
        
        if (!$(_button_collapse_seasons).attr("data-shown")) {
            $(_button_collapse_seasons).attr("data-shown", "true")
        }
        
        if ($(_button_collapse_seasons).attr("data-shown") === "false") {
            $(_button_collapse_seasons).attr("data-shown", "true")
            $(_button_collapse_seasons).text("Collapse Seasons")
            showElements = true
        } else {
            $(_button_collapse_seasons).attr("data-shown", "false")
            $(_button_collapse_seasons).text("Expand Seasons")
            showElements = false
        }
        
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i]
            let id = $(element).attr("id")
            $("#" + id).collapse((showElements === true) ? "show" : "hide")
            seasonsCollapsed = (showElements === true)
        }
    }
    
    const filtersReset = function (callback) {
        $("[data-matrixcomplete='true']").show()
        $(_button_toggle_completed_matrices).attr("data-shown", "true")
        $(_button_toggle_completed_matrices).text("Hide Completed Matrices")
        
        $("[data-pricingcomplete='true']").show()
        $(_button_toggle_completed_pricings).attr("data-shown", "true")
        $(_button_toggle_completed_pricings).text("Hide Completed Pricings")
        
        $(_pricing_strategy_season_id).val([]).trigger("change")
        $(_pricing_strategy_unit_id).val([]).trigger("change")
        
        $(_button_collapse_units).attr("data-shown", "false")
        $(_button_collapse_units).text("Expand Units")
        toggleUnitFilter()
        
        $(_button_collapse_seasons).attr("data-shown", "false")
        $(_button_collapse_seasons).text("Expand Seasons")
        toggleSeasonFilter()
        
        return callback(1)
    }
    
    const resetFilters = function () {
        $(_product_edit_pricing_section_reset_filters)
            .html("<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Loading...")
        filtersReset(function (data) {
            if (data) {
                $(_product_edit_pricing_section_reset_filters).html("Reset Filters")
            }
        })
    }
    
    const showAllFilterUnits = function () {
        let units = Array.from(Unit.all.values())
        $.each(units, function (i, unit) {
            let unitId = unit.id
            let dataVal = "unit-" + unitId
            let elements = document.querySelectorAll(`[data-sectiontype='${dataVal}']`)
            $.each(elements, function (i, el) {
                $(el).show()
            })
        })
    }
    
    const hideAllFilterUnits = function () {
        let units = Array.from(Unit.all.values())
        $.each(units, function (i, unit) {
            let unitId = unit.id
            let dataVal = "unit-" + unitId
            let elements = document.querySelectorAll(`[data-sectiontype='${dataVal}']`)
            $.each(elements, function (i, el) {
                $(el).hide()
            })
        })
    }
    
    const showAllFilterSeasons = function () {
        let seasons = Array.from(Season.all.values())
        $.each(seasons, function (i, season) {
            let seasonId = season.id
            let dataVal = "season-" + seasonId
            let elements = document.querySelectorAll(`[data-sectiontype='${dataVal}']`)
            $.each(elements, function (i, el) {
                $(el).show()
            })
        })
    }
    
    const hideAllFilterSeasons = function () {
        let seasons = Array.from(Season.all.values())
        $.each(seasons, function (i, season) {
            let seasonId = season.id
            let dataVal = "season-" + seasonId
            let elements = document.querySelectorAll(`[data-sectiontype='${dataVal}']`)
            $.each(elements, function (i, el) {
                $(el).hide()
            })
        })
    }
    
    const filterUnits = function () {
        hideAllFilterUnits()
        let unitIds = getListOfIds($(_pricing_strategy_unit_id).val())
        if (unitIds.length) {
            $.each(unitIds, function (i, unitId) {
                let dataVal = "unit-" + unitId
                let units = document.querySelectorAll(`[data-sectiontype='${dataVal}']`)
                $.each(units, function (i, el) {
                    $(el).show()
                })
            })
        } else {
            showAllFilterUnits()
        }
        
    }
    
    const filterSeasons = function () {
        hideAllFilterSeasons()
        let seasonIds = getListOfIds($(_pricing_strategy_season_id).val())
        if (seasonIds.length) {
            $.each(seasonIds, function (i, seasonId) {
                let dataVal = "season-" + seasonId
                let units = document.querySelectorAll(`[data-sectiontype='${dataVal}']`)
                $.each(units, function (i, el) {
                    $(el).show()
                })
            })
        } else {
            showAllFilterSeasons()
        }
        
    }
    
    const emptyPricingMatrix = function () {
        PricingWorksheet.incompletePricings = new Map()
        PricingWorksheet.incompleteMatrices = new Map()
        $(_product_edit_matrix_form).empty()
        $(_product_edit_matrix_form).html(`
                <div style="top:0;left:0;width:100%;height:500px;background:rgba(0,0,0,.25);" class="flex-center">
                    <div class="preloader-wrapper active">
                        <div class="spinner-layer spinner-blue-only">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div>
                            <div class="gap-patch">
                                <div class="circle"></div>
                            </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `)
    }
    
    const buildTableVariantHeadingBaseInputs = function (pricing) {
        let CONTAINER = $("<div/>", {
            class: "p-2",
        })
        let ROW = $("<div/>", {
            class: "row",
        })
        
        if (pricing) {
            let matrixCode = pricing.matrix_code
            let matrix = Matrix.all.get(matrixCode)
            let matrixId = ""
            let matrixName = (pricing.name) ? pricing.name : ""
            let beenSaved = false
            let cost, margin = null
            
            if (matrix) {
                matrixId = (matrix.id) ? matrix.id : null
                margin = (matrix.margin) ? matrix.margin : null
                cost = (matrix.cost) ? matrix.cost : null
                beenSaved = (pricing.been_saved === 1)
            }
            
            let COL_3_1 = $("<div/>", {
                class: "col-12 col-md-3 mb-2 px-4",
            })
            
            let COL_3_2 = $("<div/>", {
                class: "col-12 col-md-3 mb-2 px-4",
            })
            
            let COL_3_3 = $("<div/>", {
                class: "col-12 col-md-3 mb-2 px-4",
            })
            
            let COL_3_4 = $("<div/>", {
                class: "col-12 col-md-3 mb-2 px-4",
            })
            
            let LABELCOST = $("<label/>", {
                class: "",
                for: "base_cost_" + matrixCode,
                text: "Cost",
            })
            
            let LABELMARGIN = $("<label/>", {
                class: "",
                for: "base_margin_" + matrixCode,
                text: "Margin",
            })
            
            let LABELMATRIXID = $("<label/>", {
                class: "dev-element d-none",
                for: "base_matrix_id_" + matrixCode,
                text: "Matrix Id:",
            })
            
            let WRAPPERMATRIXNAME = $("<div/>", {
                class: "form-element",
            })
            
            let LABELMATRIXNAME = $("<label/>", {
                class: "dev-element d-none",
                for: "base_matrix_name_" + matrixCode,
                text: "Matrix Name:",
            })
            
            let INPUTMATRIXNAME = $("<input/>", {
                class: "form-control dev-element",
                type: "hidden",
                name: "baseMatrixName",
                readonly: "readonly",
                disabled: "disabled",
                id: "base_matrix_name_" + matrixCode,
            })
                .val(matrixName)
            
            let INPUTMATRIXID = $("<input/>", {
                class: "form-control dev-element",
                type: "hidden",
                name: "baseMatrixId",
                readonly: "readonly",
                disabled: "disabled",
                id: "base_matrix_id_" + matrixCode,
            })
                .val(matrixId)
            
            let INPUTCOST = $("<input/>", {
                class: "form-control",
                id: "base_cost_" + matrixCode,
                name: "baseCost",
                attr: {
                    "data-targetform": "pricingMatrixForm-" + matrixCode,
                },
            })
                .on("keyup", function () {
                    let form = document.getElementById($(this).attr("data-targetform"))
                    let val = this.value
                    let costInputs = form.querySelectorAll(".cost")
                    costInputs.forEach(el => {
                        if (!el.disabled) {
                            $(el).val(this.value)
                            if (this.value !== "") {
                                $(el).parent("div").find("label").addClass("active")
                            } else {
                                $(el).parent("div").find("label").removeClass("active")
                            }
                        }
                    })
                })
                .on("click", function () {
                    $(this).select()
                })
                .val(cost)
            
            let INPUTMARGIN = $("<input/>", {
                class: "form-control",
                id: "base_margin_" + matrixCode,
                name: "baseMargin",
                attr: {
                    "data-targetform": "pricingMatrixForm-" + matrixCode,
                },
            })
                .on("keyup", function () {
                    let form = document.getElementById($(this).attr("data-targetform"))
                    let costInputs = form.querySelectorAll(".margin")
                    costInputs.forEach(el => {
                        if (!el.disabled) {
                            $(el).val(this.value)
                            if (this.value !== "") {
                                $(el).parent("div").find("label").addClass("active")
                            } else {
                                $(el).parent("div").find("label").removeClass("active")
                            }
                        }
                    })
                })
                .on("click", function () {
                    $(this).select()
                })
                .val(margin)
            
            let WRAPPERCOST = $("<div/>", {
                class: "form-element",
            })
            
            let WRAPPERMATRIXID = $("<div/>", {
                class: "form-element",
            })
            
            let WRAPPERMATRIXCODE = $("<div/>", {
                class: "form-element",
            })
            
            let LABELMATRIXCODE = $("<label/>", {
                class: "dev-element d-none",
                for: "base_matrix_code_" + matrixCode,
                text: "Matrix Code:",
            })
            
            let INPUTMATRIXCODE = $("<input/>", {
                class: "form-control dev-element",
                type: "hidden",
                name: "baseMatrixCode",
                readonly: "readonly",
                disabled: "disabled",
                id: "base_matrix_code_" + matrixCode,
            })
                .val(matrixCode)
            
            let WRAPPERMARGIN = $("<div/>", {
                class: "form-element",
            })
            
            let ERRORCOST = $("<div/>", {
                class: "error w-100 text-center",
            })
            
            let ERRORMARGIN = $("<div/>", {
                class: "error w-100 text-center",
            })
            
            WRAPPERMATRIXID.append(LABELMATRIXID, INPUTMATRIXID)
            WRAPPERCOST.append(LABELCOST, INPUTCOST, ERRORCOST)
            WRAPPERMARGIN.append(LABELMARGIN, INPUTMARGIN, ERRORMARGIN)
            WRAPPERMATRIXCODE.append(LABELMATRIXCODE, INPUTMATRIXCODE)
            WRAPPERMATRIXNAME.append(LABELMATRIXNAME, INPUTMATRIXNAME)
            
            COL_3_1.append(WRAPPERCOST)
            COL_3_2.append(WRAPPERMARGIN)
            COL_3_3.append(WRAPPERMATRIXID)
            COL_3_4.append(WRAPPERMATRIXCODE, WRAPPERMATRIXNAME)
            ROW.append(COL_3_1, COL_3_2, COL_3_3, COL_3_4)
            CONTAINER.append(ROW)
        }
        
        return CONTAINER
    }
    
    const getRowValues = function (row) {
        let pricingId, variantId, pricingCode, matrixId, pricingCount = null, inputs = [],
            vals = {
                monCost: null,
                tueCost: null,
                wedCost: null,
                thuCost: null,
                friCost: null,
                satCost: null,
                sunCost: null,
                monMargin: null,
                tueMargin: null,
                wedMargin: null,
                thuMargin: null,
                friMargin: null,
                satMargin: null,
                sunMargin: null,
            }
        
        if ($(row).attr("data-dowrow") !== "true") {
            matrixId = ($(row).attr("data-matrixid")) ? (!isNaN(parseInt($(row).attr("data-matrixid")))) ? parseInt($(row).attr("data-matrixid")) : null : null
            pricingId = ($(row).attr("data-pricingid")) ? (!isNaN(parseInt($(row).attr("data-pricingid")))) ? parseInt($(row).attr("data-pricingid")) : null : null
            variantId = ($(row).attr("data-variantid")) ? (!isNaN(parseInt($(row).attr("data-variantid")))) ? parseInt($(row).attr("data-variantid")) : null : null
            pricingCode = ($(row).attr("data-pricingcode")) ? $(row).attr("data-pricingcode") : null
            pricingCount = ($(row).attr("data-pricingcount")) ? (!isNaN(parseInt($(row).attr("data-pricingcount")))) ? parseInt($(row).attr("data-pricingcount")) : null : null
            inputs = row.getElementsByTagName("input")
            
            $.each(inputs, function (k, el) {
                let name = (el.name) ? el.name : null
                let disabled = (el.disabled) ? el.disabled : false
                let value = (el.value) ? el.value : null
                if (!is_null(name) && !is_null(disabled) && !disabled) {
                    vals[name] = (!isNaN(parseInt(value))) ? parseInt(value) : null
                }
            })
            
            return remove_nulls(
                {
                    id: pricingId,
                    matrix_id: matrixId,
                    variant_id: variantId,
                    code: pricingCode,
                    count: pricingCount,
                    mon: vals.monCost,
                    tue: vals.tueCost,
                    wed: vals.wedCost,
                    thu: vals.thuCost,
                    fri: vals.friCost,
                    sat: vals.satCost,
                    sun: vals.sunCost,
                    monMargin: vals.monMargin,
                    tueMargin: vals.tueMargin,
                    wedMargin: vals.wedMargin,
                    thuMargin: vals.thuMargin,
                    friMargin: vals.friMargin,
                    satMargin: vals.satMargin,
                    sunMargin: vals.sunMargin,
                    enabled: 1,
                    note: null,
                },
            )
        }
    }
    
    const buildPricingData = function (table, matrix) {
        let pricings = []
        let productId = $(table).attr("data-productid")
        let seasonId = $(table).attr("data-seasonid")
        let unitId = $(table).attr("data-unitid")
        let matrixCode = ($(table).attr("data-matrixid"))
        
        for (let row of table.rows) {
            let rowVals = getRowValues(row)
            let pricingId, variantId, pricingCode, pricingCount = null, inputs = [],
                vals = {
                    monCost: null,
                    tueCost: null,
                    wedCost: null,
                    thuCost: null,
                    friCost: null,
                    satCost: null,
                    sunCost: null,
                    monMargin: null,
                    tueMargin: null,
                    wedMargin: null,
                    thuMargin: null,
                    friMargin: null,
                    satMargin: null,
                    sunMargin: null,
                }
            if ($(row).attr("data-dowrow") !== "true") {
                pricingId = ($(row).attr("data-pricingid")) ? (!isNaN(parseInt($(row).attr("data-pricingid")))) ? parseInt($(row).attr("data-pricingid")) : null : null
                variantId = ($(row).attr("data-variantid")) ? (!isNaN(parseInt($(row).attr("data-variantid")))) ? parseInt($(row).attr("data-variantid")) : null : null
                pricingCode = ($(row).attr("data-pricingcode")) ? $(row).attr("data-pricingcode") : null
                pricingCount = ($(row).attr("data-pricingcount")) ? (!isNaN(parseInt($(row).attr("data-pricingcount")))) ? parseInt($(row).attr("data-pricingcount")) : null : null
                inputs = row.getElementsByTagName("input")
                
                $.each(inputs, function (k, el) {
                    let name = (el.name) ? el.name : null
                    let disabled = (el.disabled) ? el.disabled : false
                    let value = (el.value) ? el.value : null
                    if (!is_null(name) && !is_null(disabled) && !disabled) {
                        vals[name] = (!isNaN(parseInt(value))) ? parseInt(value) : null
                    }
                })
                
                pricings.push(remove_nulls(
                    {
                        id: pricingId,
                        matrix_id: matrix.id,
                        variant_id: variantId,
                        code: pricingCode,
                        count: pricingCount,
                        mon: vals.monCost,
                        tue: vals.tueCost,
                        wed: vals.wedCost,
                        thu: vals.thuCost,
                        fri: vals.friCost,
                        sat: vals.satCost,
                        sun: vals.sunCost,
                        monMargin: vals.monMargin,
                        tueMargin: vals.tueMargin,
                        wedMargin: vals.wedMargin,
                        thuMargin: vals.thuMargin,
                        friMargin: vals.friMargin,
                        satMargin: vals.satMargin,
                        sunMargin: vals.sunMargin,
                        enabled: 1,
                        note: null,
                    },
                ))
            }
        }
        
        return pricings
    }
    
    const getFormValues = function (form) {
        if (!form) {
            return
        }
        let id = form.id
        let table = document.getElementById(id + "-table")
        let productId = $(table).attr("data-productid")
        let seasonId = $(table).attr("data-seasonid")
        let unitId = $(table).attr("data-unitid")
        let matrixCode = ($(table).attr("data-matrixid"))
        
        let matrix = {
            id: null,
            code: (form.elements["baseMatrixCode"].value !== "") ? form.elements["baseMatrixCode"].value : "",
            product_id: (!isNaN(parseInt(productId))) ? parseInt(productId) : null,
            season_id: (!isNaN(parseInt(seasonId))) ? parseInt(seasonId) : null,
            unit_id: (!isNaN(parseInt(unitId))) ? parseInt(unitId) : null,
            name: (form.elements["baseMatrixName"].value !== "") ? form.elements["baseMatrixName"].value : "",
            cost: (form.elements["baseCost"].value !== "") ? parseInt(form.elements["baseCost"].value) : null,
            margin: (form.elements["baseMargin"].value !== "") ? parseInt(form.elements["baseMargin"].value) : null,
            has_pricing: 1,
            been_saved: 1,
            enabled: 1,
            pricings: [],
        }
        matrix.price = null
        matrix.id = ($(table).attr("data-matrixid")) ? parseInt(($(table).attr("data-matrixid"))) : null
        matrix.pricings = buildPricingData(table, matrix)
        
        return remove_nulls(matrix)
    }
    
    const handlePricingWorksheetError = function (msg) {
        toastr.error(msg)
    }
    
    const update = function (dataToSend) {
        if (dataToSend) {
            sendUpdateRequest(dataToSend, function (data) {
                let matrix
                if (data) {
                    matrix = data
                    if (data[0]) {
                        matrix = data[0]
                    }
                    let pricings = (matrix.pricings) ? matrix.pricings : []
                    let pricingHold = new Map()
                    //Console.log("matrix", matrix)
                    //Console.log("pricings", pricings)
                    
                    Matrix.all.set(matrix.code, matrix)
                    
                    $.each(pricings, function (k, pricing) {
                        Pricing.all.set(pricing.code, pricing)
                    })
                    
                    PricingWorksheet.pricingWorksheet()
                    toastr.success(`Matrix: ${matrix.name} - has been updated`)
                }
            })
        }
    }
    
    const pricingUpdate = function (dataToSend) {
        if (dataToSend) {
            sendUpdateRequestPricing(dataToSend, function (data) {
                let pricing
                if (data) {
                    pricing = data
                    if (data[0]) {
                        pricing = data[0]
                    }
                    Pricing.all.set(pricing.code, pricing)
                    
                    PricingWorksheet.pricingWorksheet()
                    
                    Console.log("pricingsHidden", pricingsHidden)
                    Console.log("matricesHidden", matricesHidden)
                    Console.log("unitsCollapsed", unitsCollapsed)
                    Console.log("seasonsCollapsed", seasonsCollapsed)
                    
                    if (seasonsCollapsed) {
                        $(_button_collapse_seasons).attr("data-shown", "false")
                        $(_button_collapse_seasons).text("Expand Seasons")
                        toggleSeasonFilter()
                    }
                    
                    if (unitsCollapsed) {
                        $(_button_collapse_units).attr("data-shown", "false")
                        $(_button_collapse_units).text("Expand Units")
                        toggleUnitFilter()
                    }
                    
                    if (matricesHidden) {
                        $("[data-matrixcomplete='true']").show()
                        $(_button_toggle_completed_matrices).attr("data-shown", "true")
                        $(_button_toggle_completed_matrices).text("Hide Completed Matrices")
                    }
                    
                    if (pricingsHidden) {
                        $("[data-pricingcomplete='true']").show()
                        $(_button_toggle_completed_pricings).attr("data-shown", "true")
                        $(_button_toggle_completed_pricings).text("Hide Completed Pricings")
                    }
                    
                    toastr.success(`Pricing: ${pricing.name} - has been updated`)
                }
            })
        }
    }
    
    const sendUpdateRequest = function (dataToSend, callback) {
        let url = "/api/v1.0/matrices/update"
        
        if (dataToSend) {
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handlePricingWorksheetError("Oops: 1")
                    }
                })
            } catch (e) {
                Console.log("error", e)
            }
        }
    }
    
    const sendUpdateRequestPricing = function (dataToSend, callback) {
        let url = "/api/v1.0/pricings/update"
        
        if (dataToSend) {
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handlePricingWorksheetError("Oops: 1")
                    }
                })
            } catch (e) {
                Console.log("error", e)
            }
        }
    }
    
    const updateMatrix = function (_this) {
        let dataToSend = getFormValues(document.getElementById($(_this).attr("data-targetform")))
        
        confirmDialog(`Would you like to update?`, (ans) => {
            if (ans) {
                update(dataToSend)
            }
        })
    }
    
    const updatePricing = function (_this, row) {
        let dataToSend = getRowValues(row)
        
        confirmDialog(`Would you like to update?`, (ans) => {
            if (ans) {
                pricingUpdate(dataToSend)
            }
        })
    }
    
    const buildMatrixWrapper = function () {
        return $("<div/>", {})
    }
    
    const tableVariantHeading = function (pricing) {
        let matrix
        let H5 = $("<h5/>", {
            class: "card-title d-flex justify-content-between m-2",
        })
        
        if (pricing) {
            matrix = Matrix.all.get(pricing.pricing_code)
            if (!matrix) {
                matrix = Matrix.set()
            }
        }
        
        let name = (pricing.name) ? pricing.name : "Pricing"
        
        if (parseInt(_pricing_strategy_types_id.value) === 1) {
            name = "Unit Pricing"
        } else if (parseInt(_pricing_strategy_types_id.value) === 3) {
            name = "Daily Pricing"
        }
        
        let SPAN = $("<span/>", {
            class: "",
            text: (name) ? name : "Pricing Variant",
        })
        
        if (pricing && pricing.been_saved && pricing.been_saved === 1) {
            H5.append(SPAN, completed)
        } else {
            H5.append(SPAN, incomplete)
        }
        
        return H5
    }
    
    const buildPricingRow = function (pricing) {
        let productId = (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null
        let matrixCode = pricing.matrix_code
        
        let FORM = $("<form/>", {
            id: "pricingMatrixForm-" + matrixCode,
            class: "card card-body border border-dark rounded-lg mb-2 mt-2 p-0 ",
            attr: { "novalidate": "novalidate" },
        })
        
        if (pricing && pricing.been_saved && pricing.been_saved === 1) {
            FORM.attr("data-matrixcomplete", "true")
            
            if (PricingWorksheet.incompleteMatrices.get(matrixCode)) {
                PricingWorksheet.incompleteMatrices.delete(matrixCode)
            }
            
        } else {
            PricingWorksheet.incompleteMatrices.set(matrixCode, pricing)
            FORM.attr("data-matrixcomplete", "false")
        }
        
        let TABLECONTAINER = $("<div/>", {
            class: "pl-1 pr-1",
        })
        
        let TABLECONTAINERROW = $("<div/>", {
            class: "row",
        })
        
        let TABLECONTAINERCELL = $("<div/>", {
            class: "col-12",
        })
        
        let BASEELEMENTS = buildTableVariantHeadingBaseInputs(pricing)
        
        let BUTTONROW = buildPricingButtonRow(pricing)
        
        let TABLE = $("<table/>", {
            class: "table table-bordered table-sm",
            id: "pricingMatrixForm-" + matrixCode + "-table",
            attr: {
                "data-matrixcode": matrixCode,
                "data-productid": productId,
                "data-unitid": pricing.unit_id,
                "data-seasonid": pricing.season_id,
                "data-name": pricing.name,
            },
        })
        
        if (pricing.id) {
            TABLE.attr("data-matrixid", pricing.id)
        }
        
        let TBODY = $("<tbody/>", {})
        let THEAD = $("<thead/>", {})
            .append(tableDOW(pricing))
        
        for (let n = 0; n < pricing.variants.length; n++) {
            let variantPricing = pricing.variants[n]
            let BADGE = incomplete
            
            variantPricing.matrix_code = matrixCode
            
            let TR = $("<tr/>")
            let I = $("<i/>", {
                class: "far fa-edit",
            })
            
            TR.attr({
                "id": "tr-" + variantPricing.code,
                "data-variantid": (variantPricing.variant_id) ? variantPricing.variant_id : null,
                "data-pricingid": (variantPricing.id) ? variantPricing.id : null,
                "data-pricingcode": (variantPricing.code) ? variantPricing.code : null,
                "data-matrixcode": (variantPricing.matrix_code) ? variantPricing.matrix_code : null,
                "data-pricingcount": (variantPricing.count) ? variantPricing.count : null,
                "data-productid": productId,
                "data-targetform": "pricingMatrixForm-" + variantPricing.matrix_code,
                "data-seasonid": (variantPricing.season_id) ? variantPricing.season_id : null,
                "data-name": (variantPricing.name) ? variantPricing.name : null,
            })
            if (variantPricing.been_saved === 1) {
                TR.attr("data-pricingcomplete", "true")
                BADGE = completed
            } else {
                TR.attr("data-pricingcomplete", "false")
                PricingWorksheet.incompletePricings.set(variantPricing.pricing_code, variantPricing)
            }
            
            let HEADINGSPANCOLUMN = $(`
                        <td style="padding:0;">
                            <div class="d-flex flex-column">
                                <div class="p-1">
                                    ${BADGE}
                                </div>
                                <div class="p-1">
                                    <span class="table-variant-title">${pricing.name}</span>
                                </div>
                               
                            </div>
                        </td>
                    `)
            
            TR.append(HEADINGSPANCOLUMN)
            
            let UPDATEBUTTON = $("<button/>", {
                class: "btn btn-sm editRow btn-sm btn-teal waves-effect waves-light",
                type: "button",
                attr: {
                    "data-variantid": (variantPricing.variant_id) ? variantPricing.variant_id : null,
                    "data-pricingid": (variantPricing.id) ? variantPricing.id : null,
                    "data-pricingcode": (variantPricing.code) ? variantPricing.code : null,
                    "data-matrixcode": (variantPricing.matrix_code) ? variantPricing.matrix_code : null,
                    "data-pricingcount": (variantPricing.count) ? variantPricing.count : null,
                    "data-productid": productId,
                    "data-targetform": "pricingMatrixForm-" + variantPricing.matrix_code,
                    "data-seasonid": (variantPricing.season_id) ? variantPricing.season_id : null,
                    "data-name": (variantPricing.name) ? variantPricing.name : null,
                },
            })
                .append(I)
            
            if (variantPricing.matrix_id) {
                UPDATEBUTTON.attr("data-matrixid", variantPricing.matrix_id)
            }
            
            UPDATEBUTTON.on("click", function () {
                let row = document.getElementById("tr-" + variantPricing.code)
                
                if (row) {
                    updatePricing(this, row)
                }
            })
            
            for (let n = 0; n < daysOfTheWeek.length; n++) {
                let TD = $("<td/>")
                TD.append(buildCostElement(variantPricing, daysOfTheWeek[n]), buildMarginElement(variantPricing, daysOfTheWeek[n]))
                TR.append(TD)
            }
            
            let BUTTONCOLUMN = $("<td/>", {
                class: "text-center td-editor",
            })
                .append(UPDATEBUTTON)
            
            TR.append(BUTTONCOLUMN)
            
            TBODY.append(TR)
            
        }
        
        TABLE.append(THEAD, TBODY)
        TABLECONTAINER.append(TABLE)
        TABLECONTAINERCELL.append(TABLECONTAINER)
        TABLECONTAINERROW.append(TABLECONTAINERCELL)
        
        let HEADING = tableVariantHeading(pricing)
        let HR = $("<hr/>", {
            class: "ml-3 mr-3 mt-1 mb-3 color-dark",
        })
        return FORM.append(HEADING, HR, BASEELEMENTS, TABLECONTAINERROW, BUTTONROW)
    }
    
    const buildMarginElement = function (variantPricing, day) {
        let matrixCode = variantPricing.matrix_code
        let pricingCode = matrixCode + "-" + variantPricing.variant_id + "-" + variantPricing.count
        let pricing = Pricing.all.get(pricingCode)
        
        if (!pricing) {
            pricing = Pricing.set()
            pricing.note = "generated form"
        }
        
        pricing.product_id = variantPricing.product_id
        pricing.season_id = variantPricing.product_id
        pricing.unit_id = variantPricing.product_id
        pricing.variant_id = variantPricing.variant_id
        pricing.matrix_code = matrixCode
        pricing.pricing_code = pricingCode
        pricing.name = variantPricing.name
        pricing.code = pricingCode
        
        if (day) {
            let dayDisabled = isDisabled(day, variantPricing.season_id)
            let marginDay = day + "Margin"
            let margin = (pricing[marginDay]) ? pricing[marginDay] : null
            
            let INPUT = $("<input/>", {
                type: "text",
                id: "cm-" + pricingCode + "-" + day,
                name: marginDay,
                class: "form-control margin m-0",
            })
                .attr("data-element", "margin")
            
            let FORMELEMENT = $("<div/>", {
                class: "md-form md-outline form-sm input-with-post-icon mb-2 mt-3",
            })
            
            let LABEL = $("<label/>", {
                text: "Margin",
                for: "cm-" + pricingCode + "-" + day,
            })
            
            let I = $("<i/>", {
                class: "fas fa-percentage input-prefix",
            })
            
            if (isDisabled(day, variantPricing.season_id)) {
                INPUT.attr("disabled", "disabled")
                INPUT.val("")
                LABEL.removeClass("active")
                FORMELEMENT.addClass("disabled")
            } else {
                FORMELEMENT.removeClass("disabled")
                if (margin > 0) {
                    INPUT.val(margin)
                    LABEL.addClass("active")
                }
            }
            
            FORMELEMENT.append(I, INPUT, LABEL)
            
            return FORMELEMENT
        }
    }
    
    const buildCostElement = function (variantPricing, day) {
        let matrixCode = variantPricing.matrix_code
        let pricingCode = matrixCode + "-" + variantPricing.variant_id + "-" + variantPricing.count
        let pricing = Pricing.all.get(pricingCode)
        
        if (!pricing) {
            pricing = Pricing.set()
            pricing.note = "generated form"
        }
        
        pricing.product_id = variantPricing.product_id
        pricing.season_id = variantPricing.product_id
        pricing.unit_id = variantPricing.product_id
        pricing.variant_id = variantPricing.variant_id
        pricing.matrix_code = matrixCode
        pricing.pricing_code = pricingCode
        pricing.name = variantPricing.name
        pricing.code = pricingCode
        
        if (day) {
            let costDayName = day + "Cost"
            let cost = (pricing[day]) ? pricing[day] : 0
            let INPUT = $("<input/>", {
                type: "text",
                name: costDayName,
                id: "ce-" + pricingCode + "-" + day,
                class: "form-control cost m-0",
            })
                .attr("data-element", "cost")
            
            let FORMELEMENT = $("<div/>", {
                class: "md-form md-outline form-sm input-with-pre-icon mt-2 mb-3",
            })
            
            let LABEL = $("<label/>", {
                text: "Cost",
                for: "ce-" + pricingCode + "-" + day,
            })
            
            let I = $("<i/>", {
                class: "fas fa-dollar-sign input-prefix",
            })
            
            if (isDisabled(day, variantPricing.season_id)) {
                INPUT.attr("disabled", "disabled")
                INPUT.val("")
                LABEL.removeClass("active")
                FORMELEMENT.addClass("disabled")
            } else {
                FORMELEMENT.removeClass("disabled")
                if (cost > 0) {
                    INPUT.val(cost)
                    LABEL.addClass("active")
                }
            }
            
            FORMELEMENT.append(I, INPUT, LABEL)
            
            return FORMELEMENT
        }
    }
    
    const buildSeasonHeading = function (season, matrixId, count) {
        let seasonBackgroundColor, seasonTextColor, seasonBorderColor
        if (season) {
            let seasonName = (season.season_name) ? season.season_name : null
            let seasonId = (season.season_id) ? season.season_id : null
            let hasSeason = Season.all.get(seasonId)
            
            if (hasSeason) {
                seasonBackgroundColor = (hasSeason.color_scheme.background_color) ? hasSeason.color_scheme.background_color : null
                seasonTextColor = (hasSeason.color_scheme.text_color) ? hasSeason.color_scheme.text_color : null
                seasonBorderColor = (hasSeason.color_scheme.border_color) ? hasSeason.color_scheme.border_color : null
            }
            
            let SEASONHEADINGWRAPPER = $("<div/>", {
                class: "card-header p-0",
                role: "tab",
                id: "seasonHeading" + matrixId + "-" + count,
            })
            
            let I = $("<i/>", {
                class: "fas fa-angle-down rotate-icon",
            })
            
            let A = $("<a/>", {
                href: "#collapse" + matrixId + "-" + count,
                "aria-controls": "collapse" + matrixId + "-" + count,
                "data-toggle": "collapse",
                "aria-expanded": "true",
            })
            
            let SPAN = $("<span/>", {
                text: seasonName,
            })
            
            let HEADING = $("<h5/>", {
                class: "mb-0 w-100 d-flex align-items-center justify-content-between p-1",
                css: {
                    "background-color": `${seasonBackgroundColor}`,
                    "border": `solid 1px ${seasonBorderColor}`,
                    "color": `${seasonTextColor}`,
                },
            })
            
            SEASONHEADINGWRAPPER.append(A.append(HEADING.append(SPAN, I)))
            
            return SEASONHEADINGWRAPPER
        }
    }
    
    const buildUnitHeading = function (unit, count) {
        let id = unit.id + "-" + count
        let unitName = (unit.name) ? unit.name : null
        let unitId = (!isNaN(parseInt(unit.id))) ? parseInt(unit.id) : null
        let hasUnit = Unit.all.get(unitId)
        if (hasUnit) {
            let UNITHEADINGWRAPPER = $("<div/>", {
                class: "card-header p-0",
                role: "tab",
                id: "unitHeading-" + id,
            })
            
            let I = $("<i/>", {
                class: "fas fa-angle-down rotate-icon",
            })
            
            let A = $("<a/>", {
                href: "#unitCollapse-" + id,
                "aria-controls": "unitCollapse-" + id,
                "data-toggle": "collapse",
                "aria-expanded": "true",
            })
            
            let SPAN = $("<span/>", {
                text: unitName,
            })
            
            let HEADING = $("<h5/>", {
                class: "mb-0 w-100 d-flex align-items-center justify-content-between p-1",
            })
            
            UNITHEADINGWRAPPER.append(A.append(HEADING.append(SPAN, I)))
            
            return UNITHEADINGWRAPPER
        }
    }
    
    const buildPricingTables = function (matrices) {
        
        let $ACCORDIONWRAPPER = buildMatrixWrapper()
        
        if (matrices) {
            if (matrices.units) {
                let unitCount = 0
                $.each(matrices.units, function (index, unit) {
                    let seasons = unit.seasons
                    let UNITWRAPPER = buildUnitWrapper(unit, unitCount)
                    let UNITHEADING = buildUnitHeading(unit, unitCount)
                    let UNITCONTAINER = $("<div/>", {
                        class: "card border border-0",
                    })
                    let UNITCOLLAPSE = $("<div/>", {
                        class: "collapse show",
                        role: "tabpanel",
                        "data-parent": "#accordionUnit-" + unit.id + "-" + unitCount,
                        id: "unitCollapse-" + unit.id + "-" + unitCount,
                        "aria-labelledby": "unitHeading-" + unit.id + "-" + unitCount,
                    })
                        .attr("data-type", "unit")
                    
                    let UNITCARDBODY = $("<div/>", {
                        class: "card-body px-1",
                    })
                    
                    let count = 0
                    $.each(seasons, function (i, season) {
                        let seasonBackgroundColor, seasonTextColor, seasonBorderColor
                        let matrixId = _product_id.value + "-" + unit.id + "-" + season.season_id
                        let pricings = season.pricings
                        let seasonId = (season.season_id) ? season.season_id : null
                        let hasSeason = Season.all.get(seasonId)
                        
                        let SEASONWRAPPER = buildSeasonWrapper(season, matrixId, count)
                        let SEASONHEADING = buildSeasonHeading(season, matrixId, count)
                        let SEASONCONTAINER = $("<div/>", {
                            class: "card",
                        })
                        let SEASONCOLLAPSE = $("<div/>", {
                            class: "collapse show",
                            role: "tabpanel",
                            "data-parent": "#accordionEx" + matrixId + "-" + count,
                            id: "collapse" + matrixId + "-" + count,
                            "aria-labelledby": "seasonHeading" + matrixId + "-" + count,
                        })
                            .attr("data-type", "season")
                        
                        if (hasSeason) {
                            seasonBackgroundColor = hexToRgb(hasSeason.color_scheme.background_color)
                            seasonTextColor = hasSeason.color_scheme.text_color
                            seasonBorderColor = hasSeason.color_scheme.border_color
                        }
                        
                        let SEASONCARDBODY = $("<div/>", {
                            class: "card-body p-1",
                            css: {
                                "background": `rgba(${seasonBackgroundColor.join(",")}, .15)`,
                                "color": seasonTextColor,
                            },
                        })
                        
                        $.each(pricings, function (ind, pricing) {
                            
                            SEASONCARDBODY.append(buildPricingRow(pricing))
                            SEASONCOLLAPSE.append(SEASONCARDBODY)
                        })
                        
                        SEASONCONTAINER.append(SEASONHEADING, SEASONCOLLAPSE)
                        SEASONWRAPPER.append(SEASONCONTAINER)
                        UNITCARDBODY.append(SEASONWRAPPER)
                        UNITCOLLAPSE.append(UNITCARDBODY)
                        count = count + 1
                    })
                    
                    UNITCONTAINER.append(UNITHEADING, UNITCOLLAPSE)
                    UNITWRAPPER.append(UNITCONTAINER)
                    $ACCORDIONWRAPPER.append(UNITWRAPPER)
                    unitCount += 1
                })
            }
        }
        
        return $ACCORDIONWRAPPER
    }
    
    const getVariants = function () {
        let variantsUsed = []
        let pricingStrategyType = (!isNaN(parseInt(_pricing_strategy_types_id.value))) ? parseInt(_pricing_strategy_types_id.value) : null
        switch (pricingStrategyType) {
            case 1:
                variantsUsed = [36]
                break
            case 2:
                let variantList = Array.from(Variant.all.values())
                for (let n = 0; n < variantList.length; n++) {
                    if (variantList[n].used_in_pricing) {
                        variantsUsed.push(variantList[n].id)
                    }
                }
                break
            default:
                variantsUsed = [36]
                break
        }
        
        return variantsUsed
    }
    
    const getSeasons = function () {
        var seasonsUsed = []
        var seasonList = Array.from(Season.all.values())
        for (let n = 0; n < seasonList.length; n++) {
            seasonsUsed.push(seasonList[n])
        }
        
        return seasonsUsed
    }
    
    const getUnits = function () {
        var unitsUsed = []
        var unitList = Array.from(Unit.all.values())
        for (let n = 0; n < unitList.length; n++) {
            unitsUsed.push(unitList[n])
        }
        
        return unitsUsed
    }
    
    const getVariantDetails = function (variantId) {
        let name = ""
        if (parseInt(_pricing_strategy_types_id.value) === 1) {
            name = "Unit Pricing"
        } else if (parseInt(_pricing_strategy_types_id.value) === 3) {
            name = "Daily Pricing"
        }
        
        let details = {
            category_id: 1,
            code: "VA-00000000036-OTHR",
            created_by: user_id,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
            enabled: 1,
            id: 36,
            max_age: null,
            min_age: null,
            modified_by: user_id,
            name: name,
            note: null,
            used_in_pricing: 1,
        }
        let variant = Variant.all.get(variantId)
        if (variant) {
            details = Variant.set(variant)
        }
        
        return details
    }
    
    const addVariantList = function (unit, season, matrixCode, variantComboId) {
        let variants = variantComboId.trim().split("-").map(Number)
        let seasonId = parseInt(season.id)
        let unitId = parseInt(unit.id)
        let productId = (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null
        
        let tempHold = new Map()
        
        $.each(variants, function (key, variantId) {
            //let variant = Variant.all.get(variantId)
            let variant = getVariantDetails(variantId)
            
            if (variant) {
                
                let hasTempHold = tempHold.get(variantId)
                
                if (hasTempHold) {
                    let count = hasTempHold.count
                    count = count + 1
                    hasTempHold.count = count
                    hasTempHold.name = count + " " + pluralize(variant.name)
                    let pricingCode = matrixCode.toString() + "-" + variantId + "-" + count
                    let pricing = Pricing.all.get(pricingCode)
                    
                    if (!pricing) {
                        pricing = {
                            aaa: "ok here 2",
                            been_saved: 0,
                            has_pricing: 0,
                            code: matrixCode.toString() + "-" + variantId.toString() + "-" + count.toString(),
                            count: count,
                            created_by: user_id,
                            date_created: formatDateMySQL(),
                            date_modified: formatDateMySQL(),
                            enabled: 1,
                            fri: null,
                            friMargin: null,
                            id: null,
                            matrix_code: matrixCode.toString(),
                            matrix_id: null,
                            modified_by: user_id,
                            mon: null,
                            monMargin: null,
                            name: variant.name + " " + count,
                            note: "generated form",
                            pricing_code: pricingCode,
                            product_id: productId,
                            sat: null,
                            satMargin: null,
                            season_id: seasonId,
                            sun: null,
                            sunMargin: null,
                            thu: null,
                            thuMargin: null,
                            tue: null,
                            tueMargin: null,
                            unit_id: unitId,
                            variant_id: variantId,
                            wed: null,
                            wedMargin: null,
                        }
                    } else {
                        pricing.aaa = 1
                        pricing.has_pricing = 1
                        pricing.been_saved = 1
                    }
                    
                    hasTempHold.variants.push({
                        aaa: "ok here",
                        matrix_code: matrixCode.toString(),
                        been_saved: 5,
                        has_pricing: (pricing.has_pricing) ? pricing.has_pricing : 0,
                        code: matrixCode.toString() + "-" + variantId.toString() + "-" + count.toString(),
                        count: count,
                        created_by: (pricing.created_by) ? pricing.created_by : user_id,
                        date_created: formatDateMySQL(),
                        date_modified: formatDateMySQL(),
                        enabled: (pricing.enabled) ? pricing.enabled : 1,
                        fri: (pricing.fri) ? pricing.fri : null,
                        friMargin: (pricing.friMargin) ? pricing.friMargin : null,
                        id: (pricing.id) ? pricing.id : null,
                        matrix_id: (pricing.matrix_id) ? pricing.matrix_id : null,
                        modified_by: (pricing.modified_by) ? pricing.matrix_id : user_id,
                        mon: (pricing.mon) ? pricing.mon : null,
                        monMargin: (pricing.monMargin) ? pricing.monMargin : null,
                        name: variant.name + " " + count,
                        note: "generated form",
                        pricing_code: matrixCode.toString() + "-" + variantId.toString() + "-" + count.toString(),
                        product_id: (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null,
                        sat: (pricing.sat) ? pricing.sat : null,
                        satMargin: (pricing.satMargin) ? pricing.satMargin : null,
                        season_id: parseInt(season.id),
                        sun: (pricing.sun) ? pricing.sun : null,
                        sunMargin: (pricing.sunMargin) ? pricing.sunMargin : null,
                        thu: (pricing.thu) ? pricing.thu : null,
                        thuMargin: (pricing.thuMargin) ? pricing.thuMargin : null,
                        tue: (pricing.tue) ? pricing.tue : null,
                        tueMargin: (pricing.tueMargin) ? pricing.tueMargin : null,
                        unit_id: unit.id,
                        variant_id: variantId,
                        wed: (pricing.wed) ? pricing.wed : null,
                        wedMargin: (pricing.wedMargin) ? pricing.wedMargin : null,
                    })
                    
                } else {
                    let count = 1
                    let pricingCode = matrixCode.toString() + "-" + variantId + "-" + count
                    let pricing = Pricing.all.get(pricingCode)
                    
                    if (!pricing) {
                        
                        pricing = {
                            aaa: "ok here 1",
                            has_pricing: 0,
                            been_saved: 0,
                            code: pricingCode,
                            count: count,
                            created_by: user_id,
                            date_created: formatDateMySQL(),
                            date_modified: formatDateMySQL(),
                            enabled: 1,
                            fri: null,
                            friMargin: null,
                            id: null,
                            matrix_code: matrixCode,
                            pricing_code: pricingCode,
                            matrix_id: null,
                            modified_by: user_id,
                            mon: null,
                            monMargin: null,
                            name: variant.name + " " + count,
                            note: "generated form",
                            product_id: productId,
                            sat: null,
                            satMargin: null,
                            season_id: seasonId,
                            sun: null,
                            sunMargin: null,
                            thu: null,
                            thuMargin: null,
                            tue: null,
                            tueMargin: null,
                            unit_id: unitId,
                            variant_id: variant.id,
                            wed: null,
                            wedMargin: null,
                        }
                    } else {
                        pricing.aaa = "hasPricing"
                        pricing.been_saved = 1
                        pricing.has_pricing = 1
                    }
                    
                    hasTempHold = {
                        name: count + " " + variant.name,
                        variant_combo_id: variantComboId.trim(),
                        count: count,
                        variants: [
                            {
                                aaa: (pricing.aaa) ? pricing.aaa : "ghg",
                                code: pricingCode,
                                has_pricing: (pricing.has_pricing) ? pricing.has_pricing : 0,
                                variant_id: variantId,
                                name: variant.name + " " + count,
                                count: count,
                                created_by: pricing.created_by,
                                date_created: (pricing.date_created) ? pricing.date_created : formatDateMySQL(),
                                date_modified: (pricing.date_modified) ? pricing.date_modified : formatDateMySQL(),
                                enabled: (pricing.enabled) ? pricing.enabled : 1,
                                fri: null,
                                friMargin: null,
                                id: (pricing.id) ? pricing.id : null,
                                matrix_code: matrixCode,
                                matrix_id: (pricing.matrix_id) ? parseInt((pricing.matrix_id)) : null,
                                modified_by: (pricing.modified_by) ? parseInt((pricing.modified_by)) : user_id,
                                mon: (pricing.mon) ? parseInt((pricing.mon)) : null,
                                monMargin: null,
                                note: "fff",
                                pricing_code: matrixCode + "-" + variantId + "-" + count,
                                product_id: null,
                                sat: null,
                                satMargin: null,
                                season_id: null,
                                sun: null,
                                sunMargin: null,
                                thu: null,
                                thuMargin: null,
                                tue: null,
                                tueMargin: null,
                                unit_id: unit.id,
                                wed: null,
                                wedMargin: null,
                            },
                        ],
                    }
                }
                
                tempHold.set(variantId, hasTempHold)
                
            } else {
                if (parseInt(variantId) === 36) {
                    variant = {
                        category_id: 1,
                        code: "VA-00000000036-OTHR",
                        created_by: 4,
                        date_created: "2022-01-18 08:08:22",
                        date_modified: "2022-01-18 12:02:26",
                        enabled: 1,
                        id: 36,
                        max_age: null,
                        min_age: null,
                        modified_by: 4,
                        name: "Other",
                        note: null,
                        used_in_pricing: 1,
                    }
                }
            }
            
        })
        
        let beenSaved, pricingBeenSaved = 0
        let myVariants = []
        let name = []
        let pricingCode, mCode
        let matrixId, pricingId = null
        
        $.each(Array.from(tempHold.values()), function (key, variantValues) {
            name.push(variantValues.name)
            
            if (variantValues.variants) {
                $.each(variantValues.variants, function (k, v) {
                    pricingCode = matrixCode + "-" + v.variant_id + "-" + v.count
                    mCode = matrixCode
                    //let variant = Variant.all.get(v.variant_id)
                    let variant = getVariantDetails(v.variant_id)
                    let matrix = Matrix.all.get(mCode)
                    let pricing = Pricing.all.get(pricingCode)
                    let season = Season.all.get(seasonId)
                    let matrix_code = mCode
                    let sun = null
                    let mon = null
                    let tue = null
                    let wed = null
                    let thu = null
                    let fri = null
                    let sat = null
                    let sunMargin = null
                    let monMargin = null
                    let tueMargin = null
                    let wedMargin = null
                    let thuMargin = null
                    let friMargin = null
                    let satMargin = null
                    let enabled = 1
                    let note = null
                    let date_created = formatDateMySQL()
                    let date_modified = formatDateMySQL()
                    let created_by = user_id
                    let modified_by = user_id
                    
                    if (matrix) {
                        matrixId = matrix.id
                        beenSaved = 1
                    }
                    
                    if (pricing) {
                        pricingId = pricing.id
                        pricingBeenSaved = 1
                        sun = pricing.sun
                        mon = pricing.mon
                        tue = pricing.tue
                        wed = pricing.wed
                        thu = pricing.thu
                        fri = pricing.fri
                        sat = pricing.sat
                        sunMargin = pricing.sunMargin
                        monMargin = pricing.monMargin
                        tueMargin = pricing.tueMargin
                        wedMargin = pricing.wedMargin
                        thuMargin = pricing.thuMargin
                        friMargin = pricing.friMargin
                        satMargin = pricing.satMargin
                        enabled = pricing.enabled
                        note = pricing.note
                        date_created = pricing.date_created
                        date_modified = pricing.date_modified
                        created_by = pricing.created_by
                        modified_by = pricing.modified_by
                    }
                    
                    let tempV = {
                        count: v.count,
                        been_saved: pricingBeenSaved,
                        code: pricingCode,
                        pricing_code: pricingCode,
                        product_id: productId,
                        unit_id: unitId,
                        season_id: seasonId,
                        variant_id: v.variant_id,
                        matrix_id: matrixId,
                        name: variant.name + " " + v.count,
                        id: pricingId,
                        sun: sun,
                        mon: mon,
                        tue: tue,
                        wed: wed,
                        thu: thu,
                        fri: fri,
                        sat: sat,
                        sunMargin: sunMargin,
                        monMargin: monMargin,
                        tueMargin: tueMargin,
                        wedMargin: wedMargin,
                        thuMargin: thuMargin,
                        friMargin: friMargin,
                        satMargin: satMargin,
                        enable: enabled,
                        note: note,
                        date_created: date_created,
                        date_modified: date_modified,
                        created_by: created_by,
                        modified_by: modified_by,
                    }
                    
                    tempV["matrix_code"] = "H"
                    myVariants.push(tempV)
                })
            }
            
        })
        
        name = name.join(" - ")
        let been_saved = 0
        let cost = null
        let margin = null
        let m = Matrix.all.get(matrixCode)
        
        if (m) {
            been_saved = 1
            cost = m.cost
            margin = m.margin
        }
        
        return {
            name: name,
            cost: cost,
            margin: margin,
            season_id: seasonId,
            unit_id: unitId,
            product_id: productId,
            been_saved: been_saved,
            matrix_code: matrixCode,
            id: (matrixId) ? matrixId : null,
            variants: myVariants,
        }
    }
    
    const getVariantCombinations = function (depth, baseString, arrLetters) {
        for (let i = 0; i < arrLetters.length; i++) {
            if (depth === 1) {
                let variantComboId = baseString + arrLetters[i]
                
                let combos = variantComboId.split('-').map(function (item) {
                    return parseInt(item, 10)
                })
                
                combos = combos.sort().join("-")
                
                let hasVariantComboIndex = variantCombinations.indexOf(variantComboId)
                if (hasVariantComboIndex < 0) {
                    variantCombinations.push(combos)
                }
                
            } else {
                let id = arrLetters[i]
                getVariantCombinations(depth - 1, baseString + arrLetters[i] + "-", arrLetters)
            }
        }
    }
    
    /** This is a description of the buildPricingWorksheet function. */
    const buildPricingWorksheet = function () {
        let productId = (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null
        let worksheet = {
            id: null,
            units: [],
        }
        
        variantList = getVariants()
        seasonList = getSeasons()
        unitList = getUnits()
        
        //loop through units
        for (let m = 0; m < unitList.length; m++) {
            variantCombinations = []
            let unit = unitList[m]
            let unitId = parseInt(unit.id)
            let max_pax = (unit.max_pax) ? parseInt(unit.max_pax) : 5
            let min_pax = (unit.min_pax) ? parseInt(unit.min_pax) : 1
            
            let pricingStrategyType = (!isNaN(parseInt(_pricing_strategy_types_id.value))) ? parseInt(_pricing_strategy_types_id.value) : null
            switch (pricingStrategyType) {
                case 1:
                    min_pax = 1
                    max_pax = 1
                    break
                case 2:
                    if (min_pax > max_pax) {
                        let temp = max_pax
                        max_pax = min_pax
                        min_pax = temp
                    }
                    break
                default:
                    min_pax = 1
                    max_pax = 1
                    break
            }
            
            for (let n = min_pax; n <= max_pax; n++) {
                getVariantCombinations(n, "", getVariants())
            }
            
            let variantCombinationList = variantCombinations
            
            let unitSection = {
                id: unit.id,
                name: unit.name,
                seasons: [],
            }
            
            //loop through seasons
            for (let n = 0; n < seasonList.length; n++) {
                let season = seasonList[n]
                let seasonId = (!isNaN(parseInt(season.id))) ? parseInt(season.id) : null
                let matrixCode = productId + "-" + unitId + "-" + seasonId
                let matrix = Matrix.all.get(matrixCode)
                
                if (matrix) {
                    matrix.pricings = []
                } else {
                    matrix = {
                        been_saved: 0,
                        code: matrixCode,
                        cost: 0,
                        created_by: 4,
                        date_created: "2022-01-14 09:00:39",
                        date_modified: "2022-01-14 09:00:39",
                        enabled: 1,
                        has_pricing: 1,
                        id: null,
                        margin: 0,
                        modified_by: 4,
                        note: null,
                        price: 201,
                        pricings: [],
                    }
                }
                
                let seasonSection = {
                    been_saved: matrix.been_saved,
                    code: matrix.code,
                    cost: matrix.cost,
                    created_by: matrix.created_by,
                    date_created: matrix.date_created,
                    date_modified: matrix.date_modified,
                    enabled: matrix.enabled,
                    has_pricing: matrix.has_pricing,
                    id: matrix.id,
                    margin: matrix.margin,
                    modified_by: matrix.modified_by,
                    note: matrix.note,
                    price: matrix.price,
                    season_id: season.id,
                    season_name: season.name,
                    matrix_code: matrixCode,
                    pricings: [],
                }
                
                //loop through variants
                $.each(variantCombinationList, function (key, variantComboId) {
                    seasonSection.matrix_code = matrixCode + "-" + variantComboId
                    seasonSection.pricings.push(addVariantList(unit, season, matrixCode + "-" + variantComboId, variantComboId))
                })
                
                unitSection.seasons.push(seasonSection)
            }
            
            worksheet.units.push(unitSection)
        }
        
        return worksheet
    }
    
    const pricingWorksheet = function () {
        resetFilters()
        emptyPricingMatrix()
        variantCombinations = []
        $(_product_edit_matrix_form).empty().append(buildPricingTables(PricingWorksheet.buildPricingWorksheet()))
    }
    
    const init = function (settings) {
        let pricingStrategyTypesId = null
        if (settings) {
            if (settings.pricing_strategy) {
                if (settings.pricing_strategy.pricing_strategy_types_id) {
                    pricingStrategyTypesId = (!isNaN(parseInt(settings.pricing_strategy.pricing_strategy_types_id))) ? parseInt(settings.pricing_strategy.pricing_strategy_types_id) : null
                }
            }
            
        }
        
        $(document).ready(function () {
            PricingWorksheet.pricingStrategyId = pricingStrategyTypesId
            if (_pricing_strategy_types_id) {
                $(_pricing_strategy_types_id)
                    .val(PricingWorksheet.pricingStrategyId)
                    .trigger("change")
            }
        })
    }
    
    return {
        pricingStrategyId: null,
        incompleteMatrices: new Map(),
        incompletePricings: new Map(),
        init: function (settings) {
            init(settings)
        },
        pricingWorksheet: function () {
            pricingWorksheet()
        },
        buildPricingWorksheet: function () {
            return buildPricingWorksheet()
        },
        status: function () {
            return status()
        },
    }
})()
