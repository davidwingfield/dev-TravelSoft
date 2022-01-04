const Matrix = (function () {
    "use strict"
    
    const base_url = "/matrix"
    let matrix_cost, matrix_margin, matrix_price
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const defaultDetail = function () {
        return {
            been_saved: 0,
            cost: null,
            created_by: user_id,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
            enabled: 1,
            flat_cost: null,
            flat_margin: null,
            flat_price: null,
            has_pricing: null,
            id: null,
            margin: null,
            modified_by: user_id,
            note: null,
            price: null,
            product_id: null,
            season_id: null,
            unit_id: null,
        }
    }
    
    const set = function (matrix) {
        let detail = defaultDetail()
        if (matrix) {
            detail.been_saved = (matrix.been_saved) ? matrix.been_saved : 0
            detail.cost = (matrix.cost) ? matrix.cost : null
            detail.created_by = (matrix.created_by) ? matrix.created_by : user_id
            detail.date_created = (matrix.date_created) ? matrix.date_created : formatDateMySQL()
            detail.date_modified = (matrix.date_modified) ? matrix.date_modified : formatDateMySQL()
            detail.enabled = (matrix.enabled) ? matrix.enabled : 1
            detail.flat_cost = (matrix.flat_cost) ? matrix.flat_cost : null
            detail.flat_margin = (matrix.flat_margin) ? matrix.flat_margin : null
            detail.flat_price = (matrix.flat_price) ? matrix.flat_price : null
            detail.has_pricing = (matrix.has_pricing) ? matrix.has_pricing : null
            detail.id = (matrix.id) ? matrix.id : null
            detail.margin = (matrix.margin) ? matrix.margin : null
            detail.modified_by = (matrix.modified_by) ? matrix.modified_by : user_id
            detail.note = (matrix.note) ? matrix.note : null
            detail.price = (matrix.price) ? matrix.price : null
            detail.product_id = (matrix.product_id) ? matrix.product_id : null
            detail.season_id = (matrix.season_id) ? matrix.season_id : null
            detail.unit_id = (matrix.unit_id) ? matrix.unit_id : null
        }
        Matrix.detail = detail
        return detail
    }
    
    const loadAll = function (matrices) {
        Matrix.all = new Map()
        if (!matrices) {
            matrices = []
        }
        
        $.each(matrices, function (k, matrix) {
            let detail = set(matrix)
            Matrix.all.set(detail.id, detail)
            
        })
        
        Console.log("Matrix.all", Matrix.all)
    }
    
    const buildMatrixForm = function () {
        
        matrix_cost = document.getElementsByName("matrix_cost")
        matrix_price = document.getElementsByName("matrix_price")
        matrix_margin = document.getElementsByName("matrix_margin")
        matrix_cost.forEach(el => el.addEventListener("keyup", event => {
            let matrix_id = el.dataset.matrixid
            Console.log("matrix_cost", el.value)
            Console.log("matrix_cost", matrix_id)
        }))
        
        matrix_price.forEach(el => el.addEventListener("keyup", event => {
            let matrix_id = el.dataset.matrixid
            Console.log("matrix_price", el.value)
            Console.log("matrix_price", matrix_id)
        }))
        
        matrix_margin.forEach(el => el.addEventListener("keyup", event => {
            let matrix_id = el.dataset.matrixid
            Console.log("matrix_margin", el.value)
            Console.log("matrix_margin", matrix_id)
        }))
        
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
    
    const loadPerUnitForm = function () {
        Console.log("Matrix.loadPerUnitForm()", Matrix)
        // ----
        
    }
    
    const loadPerPersonForm = function () {
        Console.log("Matrix.loadPerPersonForm()", Matrix)
        // ----
        
    }
    
    const loadPerDayForm = function () {
        Console.log("Matrix.loadPerDayForm()", Matrix)
        // ----
        
    }
    
    return {
        detail: {},
        all: new Map(),
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
