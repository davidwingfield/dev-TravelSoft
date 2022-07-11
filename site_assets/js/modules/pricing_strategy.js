const PricingStrategy = (function () {
    "use strict"
    
    /**
     * Static Variable Declaration
     */
    const _pricing_strategy_types_id = document.getElementById("pricing_strategy_types_id")
    const _pricing_strategy_unit_id = document.getElementById("pricing_strategy_unit_id")
    const _pricing_strategy_season_id = document.getElementById("pricing_strategy_season_id")
    const panel_tab_pricing = document.getElementById("panel_tab_pricing")
    
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
        let priceEl = document.getElementById(el.replace('cost', 'price'))
        
        priceEl.value = ((!isNaN(parseInt(costEl.value))) ? parseInt(costEl.value) : 0 / 100) + (!isNaN(parseInt(costEl.value))) ? parseInt(costEl.value) : 0
        
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
