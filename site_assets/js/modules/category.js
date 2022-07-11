/**
 * Category
 *
 * @type {{all: Map<any, any>, init: Category.init, get: Category.get, validator: null, save: Category.save, initProductModal: Category.initProductModal, detail: {}, load_all: Category.load_all}}
 */
const Category = (function () {
    "use strict"
    
    const _modal_product_category_id = document.getElementById("modal_product_category_id")
    const _modal_product_city = document.getElementById("modal_product_city")
    const _modal_product_name = document.getElementById("modal_product_name")
    const _modal_product_sku = document.getElementById("modal_product_sku")
    const _modal_product_rating_types_id = document.getElementById("modal_product_rating_types_id")
    const _modal_product_currency_id = document.getElementById("modal_product_currency_id")
    const _modal_product_pricing_strategies_types_id = document.getElementById("modal_product_pricing_strategies_types_id")
    const _modal_product_id = document.getElementById("modal_product_id")
    
    let userId = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    $(_modal_product_category_id)
        .on("change", function () {
            handleProductChange($(this).val())
        })
    
    const handleCategoryError = function (msg, title, type) {
        console.groupCollapsed("Category.handleCategoryError")
        // ----
        
        if (!msg) {
            msg = "There was an error."
        }
        
        if (!title) {
            title = "Category"
        }
        
        if (!type) {
            type = "error"
        }
        
        toastr[type](msg, title)
        
        // ----
        console.groupEnd()
    }
    const handleProductChange = function (id) {
        console.groupCollapsed("Category.handleProductChange")
        // ----
        
        $("[data-categoryid]").hide()
        
        let categoryId = (!isNaN(parseInt(id))) ? parseInt(id) : null
        let category = Types.category.get(parseInt(categoryId))
        let attributeId = (category && category.attribute_id) ? category.attribute_id : null
        
        if (!categoryId) {
            return
        }
        
        Product.attr1 = (attributeId) ? attributeId : null
        Product.attr2 = null
        Product.attr3 = null
        
        Product.resetNewProductDetails()
        Product.enableNewFormDetails()
        Product.updateProductSKU()
        
        if (categoryId && !isNaN(categoryId)) {
            Product.clearModalForm()
            
            _modal_product_category_id.value = categoryId
            
            Product.initAutoComplete(categoryId)
            
            $(`[data-categoryid='${categoryId}']`).show()
            
            switch (categoryId) {
                case 1:
                    /**
                     * Hotels
                     */
                    _modal_product_pricing_strategies_types_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = false
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    
                    break
                case 2:
                    /**
                     * Flight
                     */
                    _modal_product_pricing_strategies_types_id.value = 2
                    _modal_product_rating_types_id.value = ""
                    
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = true
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = true
                    _modal_product_sku.disabled = true
                    
                    Airport.departFromKeywords = $("#modal_product_depart_from_keywords_airport").BuildKeyword([])
                    Airport.arriveToKeywords = $("#modal_product_arrive_to_keywords_airport").BuildKeyword([])
                    
                    break
                case 3:
                    /**
                     * Cars
                     */
                    _modal_product_pricing_strategies_types_id.value = 3
                    _modal_product_rating_types_id.value = ""
                    
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = true
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = true
                    _modal_product_sku.disabled = true
                    
                    Country.initAutocomplete()
                    
                    break
                case 4:
                    /**
                     * Rail
                     */
                    _modal_product_pricing_strategies_types_id.value = 2
                    _modal_product_rating_types_id.value = ""
                    
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = true
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = true
                    _modal_product_sku.disabled = true
                    
                    Station.departFromKeywords = $("#modal_product_depart_from_keywords_station").BuildKeyword([])
                    Station.arriveToKeywords = $("#modal_product_arrive_to_keywords_station").BuildKeyword([])
                    
                    break
                case 5:
                    /**
                     * Transport
                     */
                    _modal_product_pricing_strategies_types_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = false
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_sku.disabled = true
                    
                    break
                case 6:
                    /**
                     * Tours
                     */
                    _modal_product_pricing_strategies_types_id.value = "2"
                    _modal_product_rating_types_id.value = ""
                    
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = true
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_sku.disabled = true
                    
                    break
                case 7:
                    /**
                     * Cruises
                     */
                    _modal_product_pricing_strategies_types_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = false
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_sku.disabled = true
                    _modal_product_id.disabled = true
                    break
                case 8:
                    /**
                     * Packages
                     */
                    _modal_product_pricing_strategies_types_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = true
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = true
                    _modal_product_sku.disabled = true
                    
                    break
                case 9:
                    /**
                     * Other
                     */
                    _modal_product_pricing_strategies_types_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = false
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_sku.disabled = true
                    
                    break
                default:
                    /**
                     * default
                     */
                    _modal_product_rating_types_id.value = ""
                    _modal_product_pricing_strategies_types_id.value = ""
                    
                    _modal_product_rating_types_id.disabled = true
                    _modal_product_name.disabled = true
                    _modal_product_currency_id.disabled = true
                    _modal_product_pricing_strategies_types_id.disabled = true
                    _modal_product_sku.disabled = true
                    _modal_product_city.disabled = true
                    break
            }
            
        } else {
            Product.disableNewFormDetails()
        }
        
        // ----
        console.groupEnd()
    }
    const defaultDetail = function () {
        console.groupCollapsed("Category.defaultDetail")
        // ----
        
        let detail = {
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
            created_by: userId,
            date_modified: formatDateMySQL(),
            modified_by: userId,
            note: null,
        }
        
        // ----
        console.groupEnd()
        return detail
    }
    const set = function (category) {
        console.groupCollapsed("Category.set")
        // ----
        
        let detail = defaultDetail()
        if (category) {
            detail.id = (category.id) ? category.id : null
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
            detail.seasons = (category.seasons) ? category.seasons : []
        }
        
        Category.detail = detail
        
        // ----
        console.groupEnd()
        return detail
    }
    const save = function (params) {
        console.groupCollapsed("Category.save")
        // ----
        
        // ----
        console.groupEnd()
    }
    const get = function () {
        console.groupCollapsed("Category.get")
        // ----
        
        let data_to_send = {}
        
        // ----
        console.groupEnd()
    }
    const init = function (settings) {
        console.groupCollapsed("Category.init")
        // ----
        
        let categories = []
        
        if (settings) {
            if (settings.categories) {
                categories = settings.categories
            }
        }
        
        loadAll(categories)
        
        // ----
        console.groupEnd()
    }
    const initProductModal = function (settings) {
        console.groupCollapsed("Category.initProductModal")
        // ----
        
        // ----
        console.groupEnd()
    }
    const loadAll = function (categories) {
        console.groupCollapsed("Category.loadAll")
        // ----
        
        Category.all = new Map()
        
        if (!categories) {
            return
        }
        
        $.each(categories, function (i, category) {
            let detail = set(category)
            Category.all.set(detail.id, detail)
        })
        
        // ----
        console.groupEnd()
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        get: function (params) {
            get(params)
        },
        load_all: function (params) {
            loadAll(params)
        },
        save: function (params) {
            save(params)
        },
        init: function (settings) {
            init(settings)
        },
        initProductModal: function (settings) {
            initProductModal(settings)
        },
    }
})()
