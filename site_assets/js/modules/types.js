const Types = (function () {
    "use strict"
    
    const userId = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    const baseURL = "/types"
    
    /**
     * handleTypesError
     *
     * @param msg
     * @param title
     * @param level
     */
    const handleTypesError = function (msg, title, level) {
        console.groupCollapsed("Types.handleTypesError")
        // ----
        
        if (!title) {
            title = "Types"
        }
        
        if (!level) {
            level = "error"
        }
        
        if (!msg) {
            msg = "Error"
        }
        
        toastr[level](`${msg}`, title)
        
        // ----
        console.groupEnd()
    }
    
    /**
     * setType
     *
     * @param types
     * @param types_name
     */
    const setType = function (types, types_name) {
        console.groupCollapsed("Types.setType")
        // ----
        
        $.each(types, function (k, type) {
            Types[types_name].set(type.id, type)
        })
        
        // ----
        console.groupEnd()
    }
    
    /**
     * init
     *
     * @param settings
     */
    const init = function (settings) {
        console.groupCollapsed("Types.init")
        console.log("settings", settings)
        // ----
        
        Types.address_types = new Map()
        Types.allot_by = new Map()
        Types.airport_types = new Map()
        Types.categories_ratings_types = new Map()
        Types.category = new Map()
        Types.color_scheme = new Map()
        Types.contact_types = new Map()
        Types.currency = new Map()
        Types.location_types = new Map()
        Types.message_types = new Map()
        Types.pricing_strategy_types = new Map()
        Types.rating_types = new Map()
        Types.sales_types = new Map()
        Types.status_types = new Map()
        Country.all = new Map()
        Province.all = new Map()
        City.all = new Map()
        // ----
        if (settings.address_types) {
            setType(settings.address_types, "address_types")
        }
        
        if (settings.season_types) {
            setType(settings.season_types, "season_types")
            Season.init({
                seasons: settings.season_types,
            })
        }
        
        if (settings.airport_types) {
            setType(settings.airport_types, "airport_types")
        }
        
        if (settings.category) {
            setType(settings.category, "category")
            Category.init({
                categories: settings.category,
            })
            
        }
        
        if (settings.color_scheme) {
            setType(settings.color_scheme, "color_scheme")
        }
        
        if (settings.contact_types) {
            setType(settings.contact_types, "contact_types")
        }
        
        if (settings.currency) {
            setType(settings.currency, "currency")
        }
        
        if (settings.location_types) {
            setType(settings.location_types, "location_types")
        }
        
        if (settings.message_types) {
            setType(settings.message_types, "message_types")
        }
        
        if (settings.pricing_strategy_types) {
            setType(settings.pricing_strategy_types, "pricing_strategy_types")
        }
        
        if (settings.rating_types) {
            setType(settings.rating_types, "rating_types")
        }
        
        if (settings.sales_types) {
            setType(settings.sales_types, "sales_types")
        }
        
        if (settings.status_types) {
            setType(settings.status_types, "status_types")
            StatusTypes.init({ status_types: settings.status_types })
        }
        
        if (settings.allot_by) {
            setType(settings.allot_by, "allot_by")
        }
        
        if (settings.countries) {
            Country.load_all(settings.countries)
        }
        
        if (settings.provinces) {
            Province.loadAll(settings.provinces)
        }
        
        if (settings.countries) {
            City.loadAll(settings.cities)
        }
        
        // ----
        console.groupEnd()
    }
    
    return {
        allot_by: new Map(),
        address_types: new Map(),
        season_types: new Map(),
        airport_types: new Map(),
        categories_ratings_types: new Map(),
        category: new Map(),
        color_scheme: new Map(),
        contact_types: new Map(),
        currency: new Map(),
        location_types: new Map(),
        message_types: new Map(),
        pricing_strategy_types: new Map(),
        rating_types: new Map(),
        sales_types: new Map(),
        status_types: new Map(),
        init: function (settings) {
            init(settings)
        },
    }
    
})()
