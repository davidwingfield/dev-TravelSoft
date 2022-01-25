const Pricing = (function () {
    "use strict"
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    const _pricing_strategy_unit_id = document.getElementById("pricing_strategy_unit_id")
    const _pricing_strategy_season_id = document.getElementById("pricing_strategy_season_id")
    const _pricing_strategy_profile_id = document.getElementById("pricing_strategy_profile_id")
    const _pricing_strategy_types_id = document.getElementById("pricing_strategy_types_id")
    const _calendar_filter_profile_id = document.getElementById("calendar_filter_profile_id")
    
    /**
     * pricing strategy types id
     */
    $(_pricing_strategy_types_id)
        .on("change", function () {
            PricingWorksheet.pricingWorksheet()
            //console.log("Pricing.pricing_strategy_types_id:change()", _pricing_strategy_types_id.value)
        })
    
    /**
     * initialize pricing object
     *
     * @param settings
     */
    const init = function (settings) {
        resetForm()
        let pricings = []
        let pricing_detail
        if (settings) {
            pricing_detail = settings
            if (settings.pricings) {
                pricings = settings.pricings
            }
        }
        
        if (pricing_detail.pricing_strategy_types_id) {
            _pricing_strategy_types_id.value = pricing_detail.pricing_strategy_types_id
            PricingWorksheet.pricingStrategyId = parseInt(pricing_detail.pricing_strategy_types_id)
        }
        loadAll(pricings)
    }
    
    /**
     * load all pricing templates
     *
     * @param pricing_details
     */
    const loadAll = function (pricing_details) {
        //console.log("Pricing.loadAll()", pricing_details)
        Pricing.all = new Map()
        if (!pricing_details) {
            pricing_details = []
        }
        
        $.each(pricing_details, function (k, matrix) {
            //console.log("matrix", matrix)
            // ----
            let pricings = matrix.pricings
            let pricingCode = matrix.pricing_code
            let matrixCode = matrix.matrix_code
            let matrixDetails = Matrix.all.get(matrixCode)
            let detail = set(matrix)
            Pricing.all.set(pricingCode, detail)
            /*
            $.each(pricings, function (k, pricing) {
                //console.log("pricing", pricing)
                // ----
                
                let pricing_code = (pricing.code) ? pricing.code : null
                
                if (pricing_code) {
                    Pricing.all.set(pricing_code, pricing)
                    let details = set(pricing)
                    //console.log("details", details)
                    if (matrixDetails) {
                        if (!matrixDetails["pricings"]) {
                            matrixDetails["pricings"] = new Map()
                        }
                        
                        matrixDetails["pricings"].set(pricing_code, pricing)
                    }
                }
                
            })
            //*/
        })
        
        //console.log("Pricings.all", Pricing.all)
    }
    
    /**
     * load Season Dropdown
     */
    const loadSeasonDropdown = function () {
        let seasons = (Season && Season.all) ? Array.from(Season.all.values()) : []
        let options = ""
        $.each(seasons, function (k, season) {
            let name = season.name
            let id = season.id
            options += `<option value="${id}">${name}</option>`
        })
        $(_pricing_strategy_season_id).empty()
        $(_pricing_strategy_season_id).html(options)
    }
    
    /**
     * load Profile Dropdown
     */
    const loadProfileDropdown = function () {
        let profiles = (InventoryProfile && InventoryProfile.all) ? Array.from(InventoryProfile.all.values()) : []
        let options = "<option value='' disabled readonly selected>-- Profiles --</option>"
        $.each(profiles, function (k, profile) {
            let name = profile.name
            let id = profile.id
            options += `<option value="${id}">${name}</option>`
        })
        /*
        $(_pricing_strategy_profile_id).empty()
        $(_pricing_strategy_profile_id).html(options)
        //*/
        $(_calendar_filter_profile_id).empty()
        $(_calendar_filter_profile_id).html(options)
    }
    
    /**
     * load unit dropdown
     */
    const loadUnitDropdown = function () {
        let units = (Unit && Unit.all) ? Array.from(Unit.all.values()) : []
        let options = ""
        $.each(units, function (k, unit) {
            let name = unit.name
            let id = unit.id
            options += `<option value="${id}">${name}</option>`
        })
        $(_pricing_strategy_unit_id).empty()
        $(_pricing_strategy_unit_id).html(options)
    }
    
    const resetForm = function () {
        loadSeasonDropdown()
        loadUnitDropdown()
        loadProfileDropdown()
    }
    
    const defaultDetail = function () {
        //console.log("Pricing.defaultDetail()", Pricing)
        
        return {
            pricing_code: null,
            matrix_code: null,
            code: null,
            id: null,
            product_id: null,
            season_id: null,
            unit_id: null,
            matrix_id: null,
            variant_id: 0,
            name: null,
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
            count: 1,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            note: null,
        }
    }
    
    const set = function (pricing) {
        let detail = defaultDetail()
        if (pricing) {
            //console.log(pricing)
            detail.pricing_code = (pricing.pricing_code) ? pricing.pricing_code : null
            detail.matrix_code = (pricing.matrix_code) ? pricing.matrix_code : null
            detail.code = (pricing.code) ? pricing.code : null
            detail.id = (pricing.id) ? pricing.id : null
            detail.product_id = (pricing.product_id) ? pricing.id : null
            detail.season_id = (pricing.season_id) ? pricing.id : null
            detail.unit_id = (pricing.unit_id) ? pricing.id : null
            detail.matrix_id = (pricing.matrix_id) ? pricing.matrix_id : null
            detail.variant_id = (pricing.variant_id) ? pricing.variant_id : null
            detail.name = (pricing.name) ? pricing.name : null
            detail.mon = (pricing.mon) ? pricing.mon : null
            detail.tue = (pricing.tue) ? pricing.tue : null
            detail.wed = (pricing.wed) ? pricing.wed : null
            detail.thu = (pricing.thu) ? pricing.thu : null
            detail.fri = (pricing.fri) ? pricing.fri : null
            detail.sat = (pricing.sat) ? pricing.sat : null
            detail.sun = (pricing.sun) ? pricing.sun : null
            detail.monMargin = (pricing.monMargin) ? pricing.monMargin : null
            detail.tueMargin = (pricing.tueMargin) ? pricing.tueMargin : null
            detail.wedMargin = (pricing.wedMargin) ? pricing.wedMargin : null
            detail.thuMargin = (pricing.thuMargin) ? pricing.thuMargin : null
            detail.friMargin = (pricing.friMargin) ? pricing.friMargin : null
            detail.satMargin = (pricing.satMargin) ? pricing.satMargin : null
            detail.sunMargin = (pricing.sunMargin) ? pricing.sunMargin : null
            detail.count = (pricing.count) ? pricing.count : null
            detail.enabled = (pricing.enabled) ? pricing.enabled : 1
            detail.date_created = (pricing.date_created) ? pricing.date_created : formatDateMySQL()
            detail.created_by = (pricing.created_by) ? pricing.created_by : user_id
            detail.date_modified = (pricing.date_modified) ? pricing.date_modified : formatDateMySQL()
            detail.modified_by = (pricing.modified_by) ? pricing.modified_by : user_id
            detail.note = (pricing.note) ? pricing.note : null
        }
        //console.log("   detail", detail)
        Pricing.detail = detail
        return detail
    }
    
    return {
        all: new Map(),
        init: function (settings) {
            init(settings)
        },
        set: function (pricing) {
            return set(pricing)
        },
        resetForm: function () {
            resetForm()
        },
        loadProfileDropdown: function () {
            loadProfileDropdown()
        },
    }
    
})()
