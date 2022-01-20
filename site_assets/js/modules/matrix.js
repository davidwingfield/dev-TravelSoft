const Matrix = (function () {
    "use strict"
    
    let matrix_cost, matrix_margin, matrix_price
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const defaultDetail = function () {
        return {
            been_saved: 0,
            cost: 0,
            created_by: user_id,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
            enabled: 1,
            has_pricing: 0,
            id: null,
            margin: 0,
            code: null,
            modified_by: user_id,
            note: null,
            price: 0,
            pricings: new Map(),
            product_id: null,
            season_id: null,
            unit_id: null,
        }
    }
    
    const set = function (matrix) {
        
        let matrixPricings
        let detail = defaultDetail()
        if (matrix) {
            detail.been_saved = (matrix.been_saved) ? matrix.been_saved : 0
            detail.cost = (matrix.cost) ? matrix.cost : null
            detail.created_by = (matrix.created_by) ? matrix.created_by : user_id
            detail.date_created = (matrix.date_created) ? matrix.date_created : formatDateMySQL()
            detail.date_modified = (matrix.date_modified) ? matrix.date_modified : formatDateMySQL()
            detail.enabled = (matrix.enabled) ? matrix.enabled : 1
            detail.has_pricing = (matrix.has_pricing) ? matrix.has_pricing : null
            detail.id = (matrix.id) ? matrix.id : null
            detail.margin = (matrix.margin) ? matrix.margin : null
            detail.code = (matrix.code) ? matrix.code : null
            detail.modified_by = (matrix.modified_by) ? matrix.modified_by : user_id
            detail.note = (matrix.note) ? matrix.note : null
            detail.price = (matrix.price) ? matrix.price : null
            detail.product_id = (matrix.product_id) ? matrix.product_id : null
            detail.season_id = (matrix.season_id) ? matrix.season_id : null
            detail.unit_id = (matrix.unit_id) ? matrix.unit_id : null
            /*
            //Console.log("matrix.pricings", matrix.pricings)
            if (matrix.pricings && typeof matrix.pricings == "object") {
                let pricings = (matrix.pricings && typeof matrix.pricings == "object") ? matrix.pricings : []
                //Console.log("pricings", pricings)
                matrixPricings = new Map()
                $.each(pricings, function (k, pricing) {
                    //Console.log("pricing", pricing)
                    let formattedPricing = {
                        code: pricing.pricing_code,
                        pricing_code: pricing.pricing_code,
                        matrix_code: pricing.matrix_code,
                        product_id: pricing.product_id,
                        season_id: pricing.season_id,
                        unit_id: pricing.unit_id,
                        matrix_id: pricing.matrix_id,
                        variant_id: pricing.variant_id,
                        name: pricing.name,
                        mon: pricing.mon,
                        tue: pricing.tue,
                        wed: pricing.wed,
                        thu: pricing.thu,
                        fri: pricing.fri,
                        sat: pricing.sat,
                        sun: pricing.sun,
                        monMargin: pricing.monMargin,
                        tueMargin: pricing.tueMargin,
                        wedMargin: pricing.wedMargin,
                        thuMargin: pricing.thuMargin,
                        friMargin: pricing.friMargin,
                        satMargin: pricing.satMargin,
                        sunMargin: pricing.sunMargin,
                        count: pricing.count,
                        enabled: pricing.enabled,
                        date_created: pricing.date_created,
                        created_by: pricing.created_by,
                        date_modified: pricing.date_modified,
                        modified_by: pricing.modified_by,
                        note: pricing.note,
                    }
                    
                    let pricingDetail = Pricing.set(formattedPricing)
                    
                    matrixPricings.set(pricingDetail.pricing_code, pricingDetail)
                })
                
                detail.pricings = matrixPricings
            }
            //*/
        }
        Matrix.detail = detail
        return detail
    }
    
    const loadAll = function (matrices) {
        //Console.log("Matrix.loadAll(matrices)", matrices)
        // ----
        
        Matrix.all = new Map()
        if (!matrices) {
            matrices = []
        }
        
        //Pricing.all = new Map()
        $.each(matrices, function (k, matrix) {
            //Console.log("matrix", matrix)
            let detail = set(matrix)
            let id = matrix.code
            
            /*
            let pricingsMap = new Map()
            if (matrix.pricings) {
                let pricings = matrix.pricings
                $.each(pricings, function (k, pricing) {
                    let pricingDetail = Pricing.set(pricing)
                    let pricingCode = (pricing.pricing_code) ? pricing.pricing_code : null
                    pricingsMap.set(pricingCode, pricingDetail)
                    Pricing.all.set(pricingCode, pricingDetail)
                })
            }
            detail.pricings = pricingsMap
            //*/
            Matrix.all.set(id, detail)
        })
        
    }
    
    const init = function (settings) {
        let matrices = []
        if (settings) {
            if (settings.matrices) {
                matrices = settings.matrices
            }
        }
        loadAll(matrices)
        buildMatrixForm()
    }
    
    const buildMatrixForm = function () {
        
        matrix_cost = document.getElementsByName("matrix_cost")
        matrix_price = document.getElementsByName("matrix_price")
        matrix_margin = document.getElementsByName("matrix_margin")
        matrix_cost.forEach(el => el.addEventListener("keyup", event => {
            let matrix_id = el.dataset.matrixid
            //Console.log("matrix_cost", el.value)
            //Console.log("matrix_cost", matrix_id)
        }))
        
        matrix_price.forEach(el => el.addEventListener("keyup", event => {
            let matrix_id = el.dataset.matrixid
            //Console.log("matrix_price", el.value)
            //Console.log("matrix_price", matrix_id)
        }))
        
        matrix_margin.forEach(el => el.addEventListener("keyup", event => {
            let matrix_id = el.dataset.matrixid
            //Console.log("matrix_margin", el.value)
            //Console.log("matrix_margin", matrix_id)
        }))
        
    }
    
    const loadPerUnitForm = function () {
        //Console.log("Matrix.loadPerUnitForm()", Matrix)
        // ----
        
    }
    
    const loadPerPersonForm = function () {
        //Console.log("Matrix.loadPerPersonForm()", Matrix)
        // ----
        
    }
    
    const loadPerDayForm = function () {
        //Console.log("Matrix.loadPerDayForm()", Matrix)
        // ----
        
    }
    
    return {
        detail: {},
        all: new Map(),
        set: function (matrix) {
            return set(matrix)
        },
        init: function (settings) {
            init(settings)
        },
        buildMatrixForm: function () {
            buildMatrixForm()
        },
        loadPerUnitForm: function () {
            loadPerUnitForm()
        },
        loadPerPersonForm: function () {
            loadPerPersonForm()
        },
        loadPerDayForm: function () {
            loadPerDayForm()
        },
    }
    
})()
