const Category = (function () {
    "use strict"
    
    const base_url = "/category"
    const _modal_product_category_id = document.getElementById("modal_product_category_id")
    const _input_category_name = document.getElementById("input_category_name")
    const _input_category_last_update = document.getElementById("input_category_last_update")
    const _input_category_id = document.getElementById("input_category_id")
    const _input_category_pricing_strategy_types_id = document.getElementById("input_category_pricing_strategy_types_id")
    const _input_category_color_scheme_id = document.getElementById("input_category_color_scheme_id")
    const _input_category_icon = document.getElementById("input_category_icon")
    const _input_category_view_product_index = document.getElementById("input_category_view_product_index")
    const _input_category_view_product_index_filter = document.getElementById("input_category_view_product_index_filter")
    const _input_category_view_product_index_search = document.getElementById("input_category_view_product_index_search")
    const _input_category_view_product_edit = document.getElementById("input_category_view_product_edit")
    const _input_category_view_product_package_edit = document.getElementById("input_category_view_product_package_edit")
    const _input_category_view_product_package_index = document.getElementById("input_category_view_product_package_index")
    const _input_category_all_day = document.getElementById("input_category_all_day")
    const _input_category_overlap = document.getElementById("input_category_overlap")
    const _input_category_editable = document.getElementById("input_category_editable")
    const _input_category_duration_editable = document.getElementById("input_category_duration_editable")
    const _input_category_start_editable = document.getElementById("input_category_start_editable")
    const _input_category_display = document.getElementById("input_category_display")
    const _input_category_sort_order = document.getElementById("input_category_sort_order")
    const _input_category_enabled = document.getElementById("input_category_enabled")
    const _input_category_date_created = document.getElementById("input_category_date_created")
    const _input_category_created_by = document.getElementById("input_category_created_by")
    const _input_category_date_modified = document.getElementById("input_category_date_modified")
    const _input_category_modified_by = document.getElementById("input_category_modified_by")
    const _input_category_note = document.getElementById("input_category_note")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const handle_category_error = function (msg) {
        toastr.error(msg)
    }
    
    $(_modal_product_category_id)
      .on("change", function () {
          Product.init_autocomplete()
      })
    
    const _default_detail = function () {
        return {
            category_id: 1,
            name: null,
            last_update: null,
            id: null,
            pricing_strategy_types_id: null,
            color_scheme_id: null,
            icon: null,
            view_product_index: 1,
            view_product_index_filter: 1,
            view_product_index_search: 1,
            view_product_edit: 1,
            view_product_package_edit: 1,
            view_product_package_index: 1,
            all_day: 1,
            overlap: 1,
            editable: 1,
            duration_editable: 1,
            start_editable: 1,
            display: null,
            sort_order: null,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            note: null,
        }
    }
    
    const save = function (params) {
    
    }
    
    const get = function () {
        let data_to_send = {}
        
    }
    
    const init = function (settings) {
        console.log(" -- Category -- ", {})
    }
    
    const set = function (category) {
        let detail = _default_detail()
        if (category) {
            detail.category_id = (category.category_id) ? category.category_id : 1
            detail.name = (category.name) ? category.name : null
            detail.last_update = (category.last_update) ? category.last_update : null
            detail.id = (category.id) ? category.id : null
            detail.pricing_strategy_types_id = (category.pricing_strategy_types_id) ? category.pricing_strategy_types_id : null
            detail.color_scheme_id = (category.color_scheme_id) ? category.color_scheme_id : null
            detail.name = (category.name) ? category.name : null
            detail.icon = (category.icon) ? category.icon : null
            detail.view_product_index = (category.view_product_index) ? category.view_product_index : 1
            detail.view_product_index_filter = (category.view_product_index_filter) ? category.view_product_index_filter : 1
            detail.view_product_index_search = (category.view_product_index_search) ? category.view_product_index_search : 1
            detail.view_product_edit = (category.view_product_edit) ? category.view_product_edit : 1
            detail.view_product_package_edit = (category.view_product_package_edit) ? category.view_product_package_edit : 1
            detail.view_product_package_index = (category.view_product_package_index) ? category.view_product_package_index : 1
            detail.all_day = (category.all_day) ? category.all_day : 1
            detail.overlap = (category.overlap) ? category.overlap : 1
            detail.editable = (category.editable) ? category.editable : 1
            detail.duration_editable = (category.duration_editable) ? category.duration_editable : 1
            detail.start_editable = (category.start_editable) ? category.start_editable : 1
            detail.display = (category.display) ? category.display : null
            detail.sort_order = (category.sort_order) ? category.sort_order : null
            detail.enabled = (category.enabled) ? category.enabled : 1
            detail.date_created = (category.date_created) ? category.date_created : formatDateMySQL()
            detail.created_by = (category.created_by) ? category.created_by : created_by
            detail.date_modified = (category.date_modified) ? category.date_modified : formatDateMySQL()
            detail.modified_by = (category.modified_by) ? category.modified_by : modified_by
            detail.note = (category.note) ? category.note : null
        }
        
        Category.detail = detail
        return detail
    }
    
    const load_all = function (categories) {
        Category.all = new Map()
        
        if (!categories) {
            return
        }
        $.each(categories, function (i, category) {
            let detail = set(category)
            Category.all.set(detail)
        })
        
        console.log(" Category.all", Category.all)
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        get: function (params) {
            get(params)
        },
        load_all: function (params) {
            load_all(params)
        },
        save: function (params) {
            save(params)
        },
        init: function () {
            init()
        },
    }
    
})()

//Category.init()
//end object
