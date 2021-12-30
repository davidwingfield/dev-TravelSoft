const Pricing = (function () {
    "use strict"
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const init = function (settings) {
        Console.log("Pricing.init(settings)", settings)
        let pricings = []
        if (settings) {
            if (settings.pricings) {
                pricings = settings.pricings
            }
        }
        loadAll(pricings)
    }
    
    const loadAll = function (pricings) {
        Pricing.all = new Map()
        if (!pricings) {
            pricings = []
        }
        $.each(pricings, function (k, pricing) {
            Console.log("pricing", pricing)
        })
        
        Console.log("Pricing.all", Pricing.all)
    }
    
    const buildTable = function () {
    
    }
    
    const defaultDetail = function () {}
    
    const set = function (pricing) {
    
    }
    return {
        all: new Map(),
        init: function (settings) {
            init(settings)
        },
    }
    
})()
