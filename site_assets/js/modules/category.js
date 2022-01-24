const Category = (function () {
    "use strict"
    
    const base_url = "/category"
    const _modal_product_category_id = document.getElementById("modal_product_category_id")
    const _modal_new_product = document.getElementById("modal_new_product")
    const _modal_product_provider_company_id = document.getElementById("modal_product_provider_company_id")
    const _modal_product_provider_location_id = document.getElementById("modal_product_provider_location_id")
    const _modal_product_location_id = document.getElementById("modal_product_location_id")
    const _modal_product_vendor_company_id = document.getElementById("modal_product_vendor_company_id")
    const _modal_product_city = document.getElementById("modal_product_city")
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const handleCategoryError = function (msg) {
        toastr.error(msg)
    }
    
    $(_modal_product_category_id)
        .on("change", function () {
            let category_id = $(this).val()
            handle_product_change(category_id)
        })
    
    const _modal_product_name = document.getElementById("modal_product_name")
    const _modal_product_sku = document.getElementById("modal_product_sku")
    const _modal_product_provider_name = document.getElementById("modal_product_provider_name")
    const _modal_product_vendor_name = document.getElementById("modal_product_vendor_name")
    const _modal_product_provider_id = document.getElementById("modal_product_provider_id")
    const _modal_product_vendor_id = document.getElementById("modal_product_vendor_id")
    const _modal_product_rating_types_id = document.getElementById("modal_product_rating_types_id")
    const _modal_product_currency_id = document.getElementById("modal_product_currency_id")
    const _modal_product_pricing_strategies_types_id = document.getElementById("modal_product_pricing_strategies_types_id")
    const _modal_product_city_id = document.getElementById("modal_product_city_id")
    
    const handle_product_change = function (category_id) {
        $("div[data-categoryid]").hide()
        if (!category_id) {
            return
        }
        
        category_id = parseInt(category_id)
        
        Product.resetNewProductDetails()
        Product.initAutoComplete(category_id)
        
        let category = Types.category.get(category_id)
        if (!category) {
            return
        }
        
        Product.attr1 = category.attribute_id
        Product.attr2 = null
        Product.attr3 = null
        Product.updateProductSKU()
        
        if (category_id && !isNaN(parseInt(category_id))) {
            
            switch (parseInt(category_id)) {
                case 1:
                    /**
                     * Hotels
                     */
                    _modal_product_pricing_strategies_types_id.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_city_id.value = ""
                    _modal_product_provider_id.value = ""
                    _modal_product_provider_company_id.value = ""
                    _modal_product_provider_location_id.value = ""
                    _modal_product_location_id.value = ""
                    _modal_product_vendor_id.value = ""
                    _modal_product_vendor_company_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_sku.value = ""
                    _modal_product_currency_id.value = ""
                    
                    //.disabled = true
                    //_modal_product_vendor_name.disabled = true
                    
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = false
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_sku.disabled = true
                    
                    $("div[data-categoryid='1']").show()
                    break
                case 2:
                    /**
                     * Flight
                     */
                    _modal_product_pricing_strategies_types_id.value = "2"
                    _modal_product_vendor_name.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_city_id.value = ""
                    _modal_product_provider_id.value = ""
                    _modal_product_provider_company_id.value = ""
                    _modal_product_provider_location_id.value = ""
                    _modal_product_location_id.value = ""
                    _modal_product_vendor_id.value = ""
                    _modal_product_vendor_company_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_sku.value = ""
                    _modal_product_currency_id.value = ""
                    
                    //_modal_product_provider_name.disabled = true
                    //_modal_product_vendor_name.disabled = true
                    
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = true
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = true
                    _modal_product_sku.disabled = true
                    
                    $("div[data-categoryid='2']").show()
                    break
                case 3:
                    /**
                     * Cars
                     */
                    _modal_product_pricing_strategies_types_id.value = "3"
                    _modal_product_vendor_name.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_city_id.value = ""
                    _modal_product_provider_id.value = ""
                    _modal_product_provider_company_id.value = ""
                    _modal_product_provider_location_id.value = ""
                    _modal_product_location_id.value = ""
                    _modal_product_vendor_id.value = ""
                    _modal_product_vendor_company_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_sku.value = ""
                    _modal_product_currency_id.value = ""
                    
                    //_modal_product_provider_name.disabled = true
                    //_modal_product_vendor_name.disabled = true
                    
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = true
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_sku.disabled = true
                    
                    $("div[data-categoryid='3']").show()
                    break
                case 4:
                    /**
                     * Rail
                     */
                    _modal_product_pricing_strategies_types_id.value = "2"
                    _modal_product_vendor_name.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_city_id.value = ""
                    _modal_product_provider_id.value = ""
                    _modal_product_provider_company_id.value = ""
                    _modal_product_provider_location_id.value = ""
                    _modal_product_location_id.value = ""
                    _modal_product_vendor_id.value = ""
                    _modal_product_vendor_company_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_sku.value = ""
                    _modal_product_currency_id.value = ""
                    
                    //_modal_product_provider_name.disabled = true
                    //_modal_product_vendor_name.disabled = true
                    
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = true
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_sku.disabled = true
                    
                    $("div[data-categoryid='4']").show()
                    break
                case 5:
                    /**
                     * Transport
                     */
                    _modal_product_pricing_strategies_types_id.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_city_id.value = ""
                    _modal_product_provider_id.value = ""
                    _modal_product_provider_company_id.value = ""
                    _modal_product_provider_location_id.value = ""
                    _modal_product_location_id.value = ""
                    _modal_product_vendor_id.value = ""
                    _modal_product_vendor_company_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_sku.value = ""
                    _modal_product_currency_id.value = ""
                    
                    //_modal_product_provider_name.disabled = true
                    //_modal_product_vendor_name.disabled = true
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = false
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_sku.disabled = true
                    
                    $("div[data-categoryid='5']").show()
                    break
                case 6:
                    /**
                     * Tours
                     */
                    _modal_product_vendor_name.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_city_id.value = ""
                    _modal_product_provider_id.value = ""
                    _modal_product_provider_company_id.value = ""
                    _modal_product_provider_location_id.value = ""
                    _modal_product_location_id.value = ""
                    _modal_product_vendor_id.value = ""
                    _modal_product_vendor_company_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_sku.value = ""
                    _modal_product_currency_id.value = ""
                    
                    //_modal_product_provider_name.disabled = true
                    //_modal_product_vendor_name.disabled = true
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = true
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_sku.disabled = true
                    
                    $("div[data-categoryid='6']").show()
                    break
                case 7:
                    /**
                     * Cruises
                     */
                    _modal_product_vendor_name.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_city_id.value = ""
                    _modal_product_provider_id.value = ""
                    _modal_product_provider_company_id.value = ""
                    _modal_product_provider_location_id.value = ""
                    _modal_product_location_id.value = ""
                    _modal_product_vendor_id.value = ""
                    _modal_product_vendor_company_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_sku.value = ""
                    _modal_product_currency_id.value = ""
                    
                    //_modal_product_provider_name.disabled = true
                    //_modal_product_vendor_name.disabled = true
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = false
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_sku.disabled = true
                    
                    $("div[data-categoryid='7']").show()
                    break
                case 8:
                    /**
                     * Packages
                     */
                    _modal_product_vendor_name.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_city_id.value = ""
                    _modal_product_provider_id.value = ""
                    _modal_product_provider_company_id.value = ""
                    _modal_product_provider_location_id.value = ""
                    _modal_product_location_id.value = ""
                    _modal_product_vendor_id.value = ""
                    _modal_product_vendor_company_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_sku.value = ""
                    _modal_product_currency_id.value = ""
                    
                    //_modal_product_provider_name.disabled = true
                    //_modal_product_vendor_name.disabled = true
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = false
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_sku.disabled = true
                    
                    $("div[data-categoryid='8']").show()
                    break
                case 9:
                    /**
                     * Other
                     */
                    _modal_product_vendor_name.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_city_id.value = ""
                    _modal_product_provider_id.value = ""
                    _modal_product_provider_company_id.value = ""
                    _modal_product_provider_location_id.value = ""
                    _modal_product_location_id.value = ""
                    _modal_product_vendor_id.value = ""
                    _modal_product_vendor_company_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_sku.value = ""
                    _modal_product_currency_id.value = ""
                    
                    //_modal_product_provider_name.disabled = true
                    //_modal_product_vendor_name.disabled = true
                    _modal_product_city.disabled = false
                    _modal_product_rating_types_id.disabled = false
                    _modal_product_name.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_sku.disabled = true
                    $("div[data-categoryid='9']").show()
                    break
                default:
                    /**
                     * default
                     */
                    _modal_product_vendor_name.value = ""
                    _modal_product_vendor_name.value = ""
                    _modal_product_city_id.value = ""
                    _modal_product_provider_id.value = ""
                    _modal_product_provider_company_id.value = ""
                    _modal_product_provider_location_id.value = ""
                    _modal_product_location_id.value = ""
                    _modal_product_vendor_id.value = ""
                    _modal_product_vendor_company_id.value = ""
                    _modal_product_rating_types_id.value = ""
                    _modal_product_sku.value = ""
                    
                    //_modal_product_provider_name.disabled = true
                    //_modal_product_vendor_name.disabled = true
                    _modal_product_city.disabled = true
                    _modal_product_rating_types_id.disabled = true
                    _modal_product_name.disabled = true
                    _modal_product_currency_id.disabled = true
                    _modal_product_pricing_strategies_types_id.disabled = true
                    _modal_product_sku.disabled = true
                    
                    _modal_product_sku.disabled = true
                    _modal_product_city.disabled = true
                    _modal_product_rating_types_id.disabled = true
                    
                    _modal_product_pricing_strategies_types_id.disabled = true
                    
                    break
            }
        }
    }
    
    const defaultDetail = function () {
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
        //Console.log("Category.init()", settings)
        let categories = []
        if (settings) {
            if (settings.categories) {
                categories = settings.categories
            }
        }
        
        load_all(categories)
    }
    
    const set = function (category) {
        //Console.log("Category.set()", category)
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
        return detail
    }
    
    const load_all = function (categories) {
        //Console.log("Category.load_all()", categories)
        Category.all = new Map()
        
        if (!categories) {
            return
        }
        
        $.each(categories, function (i, category) {
            let detail = set(category)
            //Console.log("detail", detail)
            //Console.log("detail.id", detail.id)
            Category.all.set(detail.id, detail)
        })
        
        //Console.log(" Category.all", Category.all)
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
        init: function (settings) {
            init(settings)
        },
    }
    
})()
