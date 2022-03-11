const PricingStrategy = (function () {
    "use strict"
    
    /**
     * Static Variable Decloration
     */
    const daysOfTheWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    const _product_id = document.getElementById("product_id")
    const _pricing_strategy_types_id = document.getElementById("pricing_strategy_types_id")
    const _pricing_strategy_unit_id = document.getElementById("pricing_strategy_unit_id")
    const _pricing_strategy_season_id = document.getElementById("pricing_strategy_season_id")
    const _pricing_container = document.getElementById("pricing_container")
    const panel_tab_pricing = document.getElementById("panel_tab_pricing")
    
    /**
     * Dynamic Variable Decloration
     */
    let variantCombinations = []
    let variant_id, variant_count, variant_name
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    /**
     * Element Event Handlers
     */
    $(_pricing_strategy_types_id)
        .on("change", function () {
            //variantCombinations = []
            //let pricingWorksheet = PricingWorksheet.init()
            //console.log(pricingWorksheet)
        })
    
    $(_pricing_strategy_season_id)
        .on("change", function () {
            //season_id = (!isNaN(parseInt(_pricing_strategy_season_id.value))) ? parseInt(_pricing_strategy_season_id.value) : null
            //emptyPricingMatrix()
            //buildPricingMatrix()
        })
    
    $(_pricing_strategy_unit_id)
        .on("change", function () {
            //unit_id = (!isNaN(parseInt(_pricing_strategy_unit_id.value))) ? parseInt(_pricing_strategy_unit_id.value) : null
            
        })
    
    /**
     * buildPricingMatrix
     */
    const buildPricingMatrix = function () {
        let pricingStrategyForm
        let pricingStrategyTypesId = (!isNaN(parseInt(_pricing_strategy_types_id.value))) ? parseInt(_pricing_strategy_types_id.value) : null
        let CONTAINER = $("<div/>")
        
        const tableDOW = function () {
            let tableHeadRow = $("<tr/>")
            let tableHeadRowColumn0 = $("<th/>", {
                class: "p-1",
            })
            let tableHeadRowColumn0Span = $("<span/>", {
                class: "p-1",
                html: '&nbsp;',
            })
            tableHeadRowColumn0.append(tableHeadRowColumn0Span)
            tableHeadRow.append(tableHeadRowColumn0)
            for (let n = 0; n < daysOfTheWeek.length; n++) {
                let tableHeadRowColumn = $("<th/>", {
                    class: "p-1",
                    text: `${ucwords(daysOfTheWeek[n])}`,
                })
                
                tableHeadRow.append(tableHeadRowColumn)
            }
            
            let tableHeadRowColumnSave = $("<th/>", {
                class: "p-1",
                html: '&nbsp;',
            })
            
            tableHeadRow.append(tableHeadRowColumnSave)
            return tableHeadRow
        }
        
        const closeAllToggles = function () {
            let els = document.getElementsByClassName("collapse-toggle")
            
            $.each(els, function (k, element) {
                collapseWindow(element)
            })
        }
        
        const openAllToggles = function () {
            let els = document.getElementsByClassName("collapse-toggle")
            
            $.each(els, function (k, element) {
                expandWindow(element)
            })
        }
        
        const seasonForm = function (unit, season) {
            
            const getMatrix = function (unit, season) {
                let pricingMatrix = [], seasonId, unitId, productId, matrixId
                
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
                
                const buildVariantListCombinations = function (unit, season) {
                    let variants = getVariantsUsed()
                    let unitId = (!isNaN(parseInt(unit.id))) ? parseInt(unit.id) : null
                    variantCombinations = []
                    
                    if (unitId) {
                        let unit = Unit.all.get(unitId)
                        if (unit) {
                            let min = (!isNaN(parseInt(unit.min_pax))) ? parseInt(unit.min_pax) : 1
                            let max = (!isNaN(parseInt(unit.max_pax))) ? parseInt(unit.max_pax) : 1
                            if (min > max) {
                                let temp = max
                                max = min
                                min = temp
                            }
                            
                            for (let n = min; n <= max; n++) {
                                getVariantCombinations(n, "", variants)
                            }
                        }
                    }
                    
                    return variantCombinations
                }
                
                const formatCombos = function (variantList) {
                    let worksheet = Array.from(variantList.values())
                    let pricingWorksheet = new Map()
                    
                    let sectionName = []
                    let myPricings = []
                    let hasWorksheet, code
                    $.each(worksheet, function (index, variantComboList) {
                        let name = variantComboList.name
                        let count = variantComboList.count
                        code = variantComboList.code
                        let pricings = variantComboList.pricings
                        hasWorksheet = pricingWorksheet.get(code)
                        
                        if (!hasWorksheet) {
                            hasWorksheet = {
                                name: null,
                                pricings: [],
                            }
                        }
                        
                        sectionName.push(count + " " + pluralize(name, count))
                        myPricings.push(pricings)
                        
                    })
                    
                    let wPricing = []
                    let pricingGroupName = sectionName.join(", ")
                    for (let m = 0; m < myPricings.length; m++) {
                        for (let n = 0; n < myPricings[m].length; n++) {
                            let priceLine = myPricings[m][n]
                            
                            let priceLineCode = priceLine.code
                            let pricing = Pricing.all.get(priceLineCode)
                            if (pricing) {
                                //console.log("pricing", pricing)
                            } else {
                                pricing = Pricing.set()
                            }
                            
                            pricing.code = priceLine.code
                            pricing.count = priceLine.count
                            pricing.name = priceLine.name
                            pricing.product_id = productId
                            pricing.season_id = seasonId
                            pricing.unit_id = unitId
                            pricing.variant_id = priceLine.variant_id
                            wPricing.push(pricing)
                        }
                    }
                    
                    let matrix = Matrix.all.get(code)
                    if (!matrix) {
                        matrix = Matrix.set()
                        matrix.code = code
                        matrix.product_id = productId
                        matrix.season_id = seasonId
                        matrix.unit_id = unitId
                    }
                    
                    pricingWorksheet.set(code, {
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
                        product_id: matrix.product_id,
                        season_id: matrix.season_id,
                        unit_id: matrix.unit_id,
                        name: pricingGroupName,
                        pricings: wPricing,
                    })
                    
                    return pricingWorksheet
                }
                
                const buildPricingMatrixCombinations = function (combos, unit, season) {
                    
                    let productId = (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null
                    let seasonId = (!isNaN(parseInt(season.id))) ? parseInt(season.id) : null
                    let unitId = (!isNaN(parseInt(unit.id))) ? parseInt(unit.id) : null
                    let matrixCode = productId + "-" + unitId + "-" + seasonId
                    
                    $.each(combos, function (k, variantComboId) {
                        let variants = variantComboId.split("-").map(Number)
                        let variantList = new Map()
                        
                        $.each(variants, function (k, variantId) {
                            let variant = Variant.all.get(variantId)
                            let hasVariant = variantList.get(variantId)
                            
                            if (hasVariant) {
                                let variantCount = parseInt(hasVariant.count) + 1
                                let count = variantCount
                                hasVariant.count = variantCount
                                hasVariant.pricings.push({
                                    code: matrixId + "-" + variantId + "-" + count,
                                    count: count,
                                    name: variant.name + " " + count,
                                    product_id: productId,
                                    season_id: seasonId,
                                    unit_id: unitId,
                                    variant_id: parseInt(variantId),
                                    mon: null,
                                    tue: null,
                                    wed: null,
                                    thu: null,
                                    fri: null,
                                    sat: null,
                                    sun: null,
                                    monMargin: null,
                                    tueMargin: null,
                                    wedMargin: null,
                                    thuMargin: null,
                                    friMargin: null,
                                    satMargin: null,
                                    sunMargin: null,
                                    enabled: 1,
                                    date_created: formatDateMySQL(),
                                    created_by: user_id,
                                    date_modified: formatDateMySQL(),
                                    modified_by: user_id,
                                    note: null,
                                })
                                variantList.set(variantId, hasVariant)
                            } else {
                                let variantCount = 0
                                let count = variantCount + 1
                                
                                variantList.set(variantId, {
                                    count: count,
                                    name: variant.name,
                                    code: matrixCode,
                                    product_id: productId,
                                    season_id: seasonId,
                                    unit_id: unitId,
                                    cost: 0,
                                    enabled: 1,
                                    has_pricing: 0,
                                    id: null,
                                    margin: 0,
                                    price: 0,
                                    modified_by: user_id,
                                    note: null,
                                    created_by: user_id,
                                    date_created: formatDateMySQL(),
                                    date_modified: formatDateMySQL(),
                                    pricings: [
                                        {
                                            code: matrixCode + "-" + variantId + "-" + count,
                                            count: count,
                                            name: variant.name + " " + count,
                                            product_id: productId,
                                            season_id: seasonId,
                                            unit_id: unitId,
                                            matrix_id: null,
                                            variant_id: parseInt(variantId),
                                            mon: 0,
                                            tue: 0,
                                            wed: 0,
                                            thu: 0,
                                            fri: 0,
                                            sat: 0,
                                            sun: 0,
                                            monMargin: 0,
                                            tueMargin: 0,
                                            wedMargin: 0,
                                            thuMargin: 0,
                                            friMargin: 0,
                                            satMargin: 0,
                                            sunMargin: 0,
                                            enabled: 1,
                                            date_created: formatDateMySQL(),
                                            created_by: user_id,
                                            date_modified: formatDateMySQL(),
                                            modified_by: user_id,
                                            note: null,
                                        },
                                    ],
                                })
                            }
                            
                        })
                        
                        let matrixLine = formatCombos(variantList)
                        
                        pricingMatrix.push(Array.from(matrixLine.values()))
                        
                    })
                    
                    return pricingMatrix
                }
                
                let comboMatrix
                
                if (unit && season) {
                    productId = (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null
                    if (productId) {
                        unitId = (!isNaN(parseInt(unit.id))) ? parseInt(unit.id) : null
                        seasonId = (!isNaN(parseInt(season.id))) ? parseInt(season.id) : null
                        
                        if (unitId && seasonId) {
                            matrixId = productId + "-" + unitId + "-" + seasonId
                            let matrix = Matrix.all.get(matrixId)
                            comboMatrix = buildPricingMatrixCombinations(buildVariantListCombinations(unit, season), unit, season)
                            
                            let variantCombinations = buildVariantListCombinations(unit, season)
                            
                            if (!matrix) {
                                matrix = Matrix.set()
                            } else {
                                if (matrix.pricings) {
                                
                                }
                            }
                        }
                    }
                }
                
                return comboMatrix
            }
            
            const seasonWrapper = function (unit, season) {
                let seasonWrapperId
                if (season) {
                    let unitId = (!isNaN(parseInt(unit.id))) ? parseInt(unit.id) : null
                    let seasonId = (!isNaN(parseInt(season.id))) ? parseInt(season.id) : null
                    if (unitId && seasonId) {
                        seasonWrapperId = "seasonForm_container_" + unitId + "_" + seasonId
                    }
                    
                    return $("<div/>", {
                        id: seasonWrapperId,
                    })
                }
                
                return null
                
            }
            
            const seasonCollapse = function (unit, season) {
                let seasonId = (!isNaN(parseInt(season.id))) ? parseInt(season.id) : null
                let unitId = (!isNaN(parseInt(unit.id))) ? parseInt(unit.id) : null
                
                return $("<section/>", {
                    id: "seasonFormContainer_" + unitId + "_" + seasonId,
                })
            }
            
            const seasonHeader = function (unit, season) {
                let TR, HEADING, SPAN, A, HEADINGWRAPPER, TD, colorScheme, backgroundColor, borderColor, textColor,
                    seasonId, seasonName
                
                if (season) {
                    colorScheme = season.color_scheme
                    backgroundColor = (colorScheme.background_color) ? colorScheme.background_color : "#fff"
                    borderColor = (colorScheme.border_color) ? colorScheme.border_color : "#fff"
                    textColor = (colorScheme.text_color) ? colorScheme.text_color : "#fff"
                    seasonName = season.name
                    seasonId = (!isNaN(parseInt(season.id))) ? parseInt(season.id) : null
                    
                    SPAN = $("<span/>", {
                        class: "",
                        text: seasonName,
                    })
                    
                    A = $("<a/>", {
                        href: "javascript:void(0)",
                        class: "panel_link",
                        css: {
                            "color": textColor,
                        },
                        html: "<i class='fas fa-angle-down'></i>",
                    })
                    
                    HEADING = $("<h6/>", {
                        class: "h6-responsive m-0 py-1 px-2",
                        css: {
                            "color": textColor,
                        },
                    })
                        .attr("aria-expanded", "true")
                        .attr("aria-target", "#seasonForm_container_" + unit.id + "_" + seasonId)
                        .on("click", function () {
                            let isExpanded = ($(this).attr("aria-expanded") === "true")
                            if (isExpanded) {
                                collapseWindow(this)
                            } else {
                                expandWindow(this)
                            }
                        })
                        .append(SPAN, A)
                    
                    HEADINGWRAPPER = $("<div/>", {
                        id: "seasonForm_" + unit.id + "_" + seasonId,
                        class: "p-0 collapse-toggle",
                        css: {
                            "background": backgroundColor,
                            "color": textColor,
                            "border": "solid 1px " + borderColor,
                            "cursor": "pointer",
                        },
                    })
                        .append(HEADING)
                }
                
                return HEADINGWRAPPER
            }
            
            const buildMatrixForm = function (unit, season) {
                let matrix = getMatrix(unit, season)
                let pricings = (matrix.pricings) ? Array.from(matrix.pricings.values()) : []
                
                let WRAPPER = []
                
                $.each(pricings, function (index, pricing) {
                    let matrixId = parseInt(pricing.matrix_id)
                    let TBODY = $("<tbody/>")
                        .attr("matrixid", matrixId)
                    
                    let TROW = matrixRow(pricing)
                    
                    TBODY.append(TROW)
                    WRAPPER.push(TBODY)
                })
                
                return WRAPPER
            }
            
            const matrixRow = function (pricing) {
                return $("<tr/>")
            }
            
            let TABLE = $("<table class='table table-bordered'/>")
            let TABLEHEAD = $("<thead/>")
            let SEASONHEADER = seasonHeader(unit, season)
            let SEASONBLOCK = seasonWrapper(unit, season)
            let DOWROW = tableDOW()
            
            let SEASONROW = buildMatrixForm(unit, season)
            let SEASONCOLLAPSE = seasonCollapse(unit, season)
            
            TABLEHEAD.append(DOWROW)
            TABLE.append(TABLEHEAD)
            
            $.each(SEASONROW, function (index, row) {
                TABLE.append(row)
            })
            
            SEASONBLOCK.append(TABLE)
            SEASONCOLLAPSE.append(SEASONHEADER, SEASONBLOCK)
            
            return SEASONCOLLAPSE
            
        }
        
        const unitForm = function (units) {
            let UNITFORM, MATRIXFORM, TABLEBODY
            
            const unitFormHiddenFields = function (unit) {
                
                if (unit) {
                    if (unit.id) {
                        let unitId = (unit && unit.id && !isNaN(parseInt(unit.id))) ? parseInt(unit.id) : null
                        
                        return $("<div/>", {
                            class: "row",
                        })
                            .append(
                                /**
                                 * columnWrapperMatrixId
                                 */
                                $("<div/>", {
                                    class: "col-3",
                                })
                                    .append(
                                        /**
                                         * inputWrapperMatrixId
                                         */
                                        $("<div/>", {
                                            class: "form-element",
                                        })
                                            .append(
                                                $("<label>", {
                                                    class: "d-none",
                                                    for: "product_edit_matrix_id_" + unitId,
                                                    text: "product_edit_matrix_id_" + unitId,
                                                }),
                                                $("<input/>", {
                                                    type: "text",
                                                    placeholder: "product_edit_matrix_id_" + unitId,
                                                    disabled: "disabled",
                                                    name: "product_edit_matrix_id_" + unitId,
                                                    class: "form-control dev-element",
                                                    id: "product_edit_matrix_id_" + unitId,
                                                }),
                                            ),
                                    ),
                            )
                    }
                }
                
                return null
            }
            
            const unitFormBaseFields = function (unit) {
                let unitId = unit.id
                
                let columnWrapperMatrixEnabled = $("<div/>",
                    {
                        class: "col-3 d-flex align-self-end justify-content-end pb-2 mb-2",
                    })
                    .append(
                        $("<div/>", { class: "custom-control custom-switch" })
                            .append(
                                $("<div/>", { class: "form-element" })
                                    .append(
                                        $("<input/>",
                                            {
                                                type: "checkbox",
                                                name: "matrix_enabled_" + unitId,
                                                class: "custom-control-input",
                                                id: "matrix_enabled_" + unitId,
                                            },
                                        ),
                                        
                                        $("<label/>",
                                            {
                                                class: "custom-control-label p-0",
                                                for: "matrix_enabled_" + unitId,
                                                text: "Enabled:",
                                            },
                                        ),
                                    ),
                            ),
                    )
                
                let columnWrapperMatrixBaseCost = $("<div/>",
                    {
                        class: "col-3",
                    })
                    .append(
                        $("<div/>", { class: "form-element" })
                            .append(
                                $("<label>",
                                    {
                                        class: "",
                                        for: "matrix_cost_" + unitId,
                                        text: "Base Cost:",
                                    },
                                ),
                                
                                $("<input/>",
                                    {
                                        type: "text",
                                        placeholder: "Base Cost",
                                        name: "matrix_cost_" + unitId,
                                        class: "form-control",
                                        id: "matrix_cost_" + unitId,
                                    },
                                )
                                    .attr("data-type", "cost")
                                    .attr("data-form", `product_edit_matrix_form_${unitId}`)
                                    .on("keyup", function (e) {
                                        let val = $(this).val()
                                        let form = document.getElementById($(this).attr("data-form"))
                                        // ----
                                        
                                        if (form) {
                                            let inputs = document.getElementById($(this).attr("data-form")).querySelectorAll("[name='cost']")
                                            for (let i = 0; i < inputs.length; i++) {
                                                if (!inputs[i].disabled) {
                                                    inputs[i].value = val
                                                    $(inputs[i]).parent("div").find("label").addClass("active")
                                                } else {
                                                    inputs[i].value = ""
                                                    $(inputs[i]).parent("div").find("label").removeClass("active")
                                                }
                                            }
                                        }
                                    }),
                            ),
                    )
                
                let columnWrapperMatrixBaseMargin = $("<div/>",
                    {
                        class: "col-3",
                    })
                    .append(
                        $("<div/>",
                            {
                                class: "form-element",
                            })
                            .append(
                                $("<label>",
                                    {
                                        class: "",
                                        for: "matrix_margin_" + unitId,
                                        text: "Base Margin:",
                                    },
                                ),
                                
                                $("<input/>",
                                    {
                                        type: "text",
                                        placeholder: "Base Margin",
                                        name: "matrix_margin_" + unitId,
                                        class: "form-control",
                                        id: "matrix_margin_" + unitId,
                                    },
                                )
                                    .attr("data-type", "margin")
                                    .attr("data-form", `product_edit_matrix_form_${unitId}`)
                                    .on("keyup", function (e) {
                                        let val = $(this).val()
                                        let form = document.getElementById($(this).attr("data-form"))
                                        // ----
                                        
                                        if (form) {
                                            let inputs = document.getElementById($(this).attr("data-form")).querySelectorAll("[name='margin']")
                                            for (let i = 0; i < inputs.length; i++) {
                                                if (!inputs[i].disabled) {
                                                    inputs[i].value = val
                                                    $(inputs[i]).parent("div").find("label").addClass("active")
                                                } else {
                                                    inputs[i].value = ""
                                                    $(inputs[i]).parent("div").find("label").removeClass("active")
                                                }
                                            }
                                        }
                                    }),
                            ),
                    )
                
                return $("<div/>", { class: "row" })
                    .append(columnWrapperMatrixBaseCost, columnWrapperMatrixBaseMargin, columnWrapperMatrixEnabled)
            }
            
            const unitFormContainer = function (unit) {
                let TABLE = $("<div class=''/>")
                const tableBody = function (unit) {
                    let TABLEBODY = $("<div/>")
                    // ----
                    
                    $.each(Array.from(Season.all.values()), function (x, season) {
                        if (unit && season) {
                            TABLEBODY.append(seasonForm(unit, season))
                        }
                    })
                    
                    return TABLEBODY
                }
                
                TABLE.append(tableBody(unit))
                
                return TABLE
            }
            
            const unitFormButtons = function (unit) {
                
                let BUTTONROW = $("<div/>", {
                    class: "w-100 text-right w-100",
                })
                let BUTTONROWCLEAR = $("<a/>", {
                    href: "javascript:void(0);",
                    class: "btn btn-flat primary-text text-center p-1 mx-0 mb-0 waves-effect waves-light",
                    text: "Reset",
                })
                let BUTTONROWSUBMIT = $("<a/>", {
                    href: "javascript:void(0);",
                    class: "btn btn-primary btn-sm waves-effect waves-light",
                    text: "Update",
                })
                
                return BUTTONROW.append(BUTTONROWCLEAR, BUTTONROWSUBMIT)
            }
            
            const unitFormHeading = function (unit) {
                let SPAN, I, A, HEADING, HEADINGWRAPPER
                
                let headingText = "Test Heading Text"
                let unitId = null
                if (unit) {
                    unitId = unit.id
                    headingText = unit.name
                }
                
                let elementId = "unitForm_" + unitId
                
                let wrapper = $("<div/>", {
                    class: "card-header mb-2 collapse-toggle",
                    css: {
                        "cursor": "pointer",
                        "background": "initial",
                    },
                    id: elementId,
                })
                    .on("click", function () {
                        let isExpanded = ($(this).attr("aria-expanded") === "true")
                        if (isExpanded) {
                            collapseWindow(this)
                        } else {
                            expandWindow(this)
                        }
                    })
                wrapper.attr("aria-expanded", "true")
                wrapper.attr("aria-target", "#unitForm_container_" + unitId)
                
                let heading = $("<h5/>", {
                    class: "mb-0 w-100 d-flex align-items-center justify-content-between p-1",
                })
                
                SPAN = $("<span/>", {
                    text: headingText,
                })
                
                I = $("<i/>", {
                    class: "fas fa-angle-down",
                })
                
                A = $("<a />", {
                    href: "javascript:void(0);",
                    class: "panel_link",
                })
                A.attr("aria-hidden", "true")
                A.append(I)
                
                wrapper.append(heading.append(SPAN, A))
                return wrapper
            }
            
            const buildUnitFormCollapse = function (unit) {
                if (unit) {
                    let HIDDENFIELDS, BUTTONS, BASEFIELDS, UNITCONTAINER
                    let unitId = (!isNaN(parseInt(unit.id))) ? parseInt(unit.id) : null
                    HIDDENFIELDS = unitFormHiddenFields(unit)
                    BUTTONS = unitFormButtons(unit)
                    BASEFIELDS = unitFormBaseFields(unit)
                    UNITCONTAINER = unitFormContainer(unit)
                    
                    return $("<div/>",
                        {
                            id: "unitForm_container_" + unitId,
                            class: "",
                        })
                        .attr("id", "unitForm_container_" + unitId)
                        .append(HIDDENFIELDS, BASEFIELDS, UNITCONTAINER, BUTTONS)
                }
                
                return null
            }
            
            const buildUnitForm = function (unit) {
                
                let UNITFORM = $("<div/>", {
                    class: "",
                })
                
                if (unit) {
                    if (unit.id) {
                        let unitId = (unit && unit.id && !isNaN(parseInt(unit.id))) ? parseInt(unit.id) : null
                        UNITFORM.attr("id", unitId)
                    }
                }
                
                if (unit) {
                    let unitId = (!isNaN(parseInt(unit.id))) ? parseInt(unit.id) : null
                    
                    let UNITHEADING = unitFormHeading(unit)
                    let UNITCOLLAPSE = buildUnitFormCollapse(unit)
                    // ----
                    if (unitId) {
                        
                        UNITFORM
                            .attr("id", "unitForm_" + unitId)
                            .append(UNITHEADING, UNITCOLLAPSE)
                    }
                    
                    return UNITFORM
                }
                
                return null
            }
            
            $.each(units, function (k, unit) {
                if (unit.id) {
                    let unitId = (!isNaN(parseInt(unit.id))) ? parseInt(unit.id) : null
                    
                    MATRIXFORM = $("<div/>", {
                        id: "product_edit_matrix_form_" + unitId,
                        class: "",
                    })
                    
                    UNITFORM = buildUnitForm(unit)
                    MATRIXFORM.append(UNITFORM)
                    CONTAINER.append(MATRIXFORM)
                }
            })
            
            return CONTAINER
        }
        
        const matrixForm = function (units) {
            unitForm(units)
            $(_pricing_container).append(unitForm(units))
        }
        
        const buildPricingMatrix = function (units) {
            matrixForm(units)
        }
        
        if (pricingStrategyTypesId !== null) {
            switch (pricingStrategyTypesId) {
                case 1:
                    //Per Unit
                    variant_id = 0
                    variant_count = 0
                    variant_name = "Other"
                    //buildPricingMatrix(Array.from(PricingStrategy.unitSeasons.values()))
                    closeAllToggles()
                    break
                case 2:
                    //Per Person
                    //console.log("Per Person")
                    
                    //buildPricingMatrix(Array.from(PricingStrategy.unitSeasons.values()))
                    break
                case 3:
                    //Per Days
                    variant_id = 0
                    variant_count = 0
                    variant_name = "Other"
                    
                    //buildPricingMatrix(Array.from(PricingStrategy.unitSeasons.values()))
                    openAllToggles()
                    break
                default:
                    return
            }
        }
    }
    
    const updatePricingStrategyTypesId = function (pricing_strategy_types_id) {
        if (pricing_strategy_types_id) {
            pricing_strategy_types_id = (!isNaN(parseInt(_pricing_strategy_types_id.value))) ? parseInt(_pricing_strategy_types_id.value) : null
            //emptyPricingMatrix()
            //buildPricingMatrix()
        }
    }
    
    const getVariantsUsed = function () {
        let results = []
        
        let variantsUsed = findObjectByKey(Array.from(Variant.all.values()), 'used_in_pricing', 1)
        $.each(variantsUsed, function (k, variant) {
            let id = (!isNaN(parseInt(variant.id))) ? parseInt(variant.id) : null
            if (!is_null(id)) {
                results.push(id)
            }
        })
        
        return results.sort()
        
    }
    
    const collapseWindow = function (_this) {
        let targetElement = $(_this).attr("aria-target")
        let icon = $(_this).find("i")
        icon.removeClass("fa-angle-down").addClass("fa-angle-up")
        $(_this).attr("aria-expanded", "false")
        $(targetElement).slideUp()
    }
    
    const expandWindow = function (_this) {
        let icon = $(_this).find("i")
        let targetElement = $(_this).attr("aria-target")
        icon.removeClass("fa-angle-up").addClass("fa-angle-down")
        $(_this).attr("aria-expanded", "true")
        $(targetElement).slideDown()
    }
    
    const buildUnitSeasonValues = function () {
        PricingStrategy.unitSeasons = new Map()
        
        $.each(Array.from(Unit.all.values()), function (k, unit) {
            PricingStrategy.unitSeasons.set(unit.id, {
                id: unit.id,
                name: unit.name,
                seasons: Season.all,
            })
        })
    }
    
    const clearUnitSelection = function () {
        $(_pricing_strategy_unit_id).val([]).trigger("change")
    }
    
    const clearSeasonSelection = function () {
        $(_pricing_strategy_season_id).val([]).trigger("change")
    }
    
    const updatePrice = function (el) {
        let costEl = document.getElementById(el)
        let marginEl = document.getElementById(el.replace('cost', 'margin'))
        let priceEl = document.getElementById(el.replace('cost', 'price'))
        // ----
        //let cost = (!isNaN(parseInt(costEl.value))) ? parseInt(costEl.value) : 0
        //let margin = ((!isNaN(parseInt(marginEl.value))) ? parseInt(marginEl.value) : 0) / 100
        
        priceEl.value = parseInt(((!isNaN(parseInt(costEl.value))) ? parseInt(costEl.value) : 0 / 100) + (!isNaN(parseInt(costEl.value))) ? parseInt(costEl.value) : 0)
        
    }
    
    const updateStatus = function () {
        let test = 4
        if (test === 0) {
            $(panel_tab_pricing).append($("<span>", {
                class: "badge rounded-pill badge-notification bg-danger tab-badge",
                alt: "Notification",
                css: { "color": "rgb(255, 255, 255) !important" },
                text: '!',
            }))
        } else {
            $(panel_tab_pricing).find("span").remove()
        }
    }
    
    const init = function (pricing_strategies) {
    
    }
    
    return {
        all: new Map(),
        unitSeasons: new Map(),
        updateStatus: function () {
            updateStatus()
        },
        init: function (pricing_strategies) {
            init(pricing_strategies)
        },
        updatePrice: function (el) {
            updatePrice(el)
        },
        clearUnitSelection: function () {
            clearUnitSelection()
        },
        clearSeasonSelection: function () {
            clearSeasonSelection()
        },
        buildUnitSeasonValues: function () {
            buildUnitSeasonValues()
        },
    }
    
})()
