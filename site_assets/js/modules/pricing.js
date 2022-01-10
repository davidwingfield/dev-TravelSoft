const Pricing = (function () {
    "use strict"
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    const _pricing_strategy_unit_id = document.getElementById("pricing_strategy_unit_id")
    const _pricing_strategy_season_id = document.getElementById("pricing_strategy_season_id")
    const _pricing_strategy_profile_id = document.getElementById("pricing_strategy_profile_id")
    const _pricing_strategy_types_id = document.getElementById("pricing_strategy_types_id")
    
    /**
     * pricing strategy types id
     */
    $(_pricing_strategy_types_id)
      .on("change", function () {
          Console.log("Pricing.pricing_strategy_types_id:change()", _pricing_strategy_types_id.value)
          // ----
          let pricing_strategy_types_id = parseInt(_pricing_strategy_types_id.value)
          if (pricing_strategy_types_id === 1) {
          
          } else if (pricing_strategy_types_id === 1) {
          
          } else {
          
          }
      })
    
    $(_pricing_strategy_season_id)
      .on("change", function () {
          Console.log("This", _pricing_strategy_season_id.value)
      })
    
    $(_pricing_strategy_unit_id)
      .on("change", function () {
          Console.log("This", _pricing_strategy_unit_id.value)
      })
    
    $(_pricing_strategy_profile_id)
      .on("change", function () {
          Console.log("This", _pricing_strategy_profile_id.value)
      })
    
    /**
     * initialize pricing object
     *
     * @param settings
     */
    const init = function (settings) {
        Console.log("Pricing.init(settings)", settings)
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
            
        }
        loadAll(pricings)
    }
    
    /**
     * load all pricing templates
     *
     * @param pricings
     */
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
    
    /**
     * load Season Dropdown
     */
    const loadSeasonDropdown = function () {
        let seasons = (Season && Season.all) ? Array.from(Season.all.values()) : []
        let options = "<option value='' disabled readonly selected>-- Seasons --</option>"
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
        $(_pricing_strategy_profile_id).empty()
        $(_pricing_strategy_profile_id).html(options)
    }
    
    /**
     * load unit dropdown
     */
    const loadUnitDropdown = function () {
        let units = (Unit && Unit.all) ? Array.from(Unit.all.values()) : []
        let options = "<option value='' disabled readonly selected>-- Units --</option>"
        $.each(units, function (k, unit) {
            let name = unit.name
            let id = unit.id
            options += `<option value="${id}">${name}</option>`
        })
        $(_pricing_strategy_unit_id).empty()
        $(_pricing_strategy_unit_id).html(options)
    }
    
    /**
     * reset form
     */
    const resetForm = function () {
        Console.log("Pricing.resetForm()", Variant.all)
        
        loadSeasonDropdown()
        loadUnitDropdown()
        loadProfileDropdown()
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
        resetForm: function () {
            resetForm()
        },
        loadProfileDropdown: function () {
            loadProfileDropdown()
        },
    }
    
})()
