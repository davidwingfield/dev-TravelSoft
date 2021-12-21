const Season = (function () {
    "use strict"
    const _product_edit_season_form_season_name_filter = document.getElementById("product_edit_season_form_season_name_filter")
    const _category_id = document.getElementById("category_id")
    const _product_edit_season_form_season_id = document.getElementById("product_edit_season_form_season_id")
    const _product_edit_season_form_season_name = document.getElementById("product_edit_season_form_season_name")
    const _product_edit_season_form_season_color_scheme_id = document.getElementById("product_edit_season_form_season_color_scheme_id")
    const _product_edit_season_form_season_enabled = document.getElementById("product_edit_season_form_season_enabled")
    const _edit_season_button = document.getElementById("edit_season_button")
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let categories = new Map()
    
    const init_autocomplete = function () {
        let category_id = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
        
        $(_product_edit_season_form_season_name_filter)
          .on("click", function () {
          
          })
          .on("search", function () {
          
          })
          .on("change", function () {
              /*
              setTimeout(function () {
                  let provider_name = _provider_name.value
                  
                  if (globalSelectedProvider === false) {
                      if (provider_name === "") {
                          _provider_name.value = ""
                          _provider_company_id.value = ""
                          globalSelectedProvider = false
                          $(_vendor_name).val("").trigger("change")
                          $(_provider_company_id).val("").trigger("change")
                      } else {
                          provider_exists(provider_name)
                      }
                  }
              }, 200)
              //*/
          })
          .autocomplete({
              serviceUrl: "/api/v1.0/autocomplete/seasons",
              minChars: 2,
              cache: false,
              dataType: "json",
              triggerSelectOnValidInput: false,
              paramName: "st",
              params: { "category_id": category_id },
              onSelect: function (suggestion) {
                  if (!suggestion.data) {
                      return
                  }
                  let season = suggestion.data
                  let color_scheme = (season.color_scheme) ? season.color_scheme : {}
                  Console.log("season", season)
                  _product_edit_season_form_season_id.value = season.id
                  _product_edit_season_form_season_name.value = season.name
                  _product_edit_season_form_season_color_scheme_id.value = season.color_scheme_id
                  _product_edit_season_form_season_enabled.checked = (season.enabled === 1)
                  ColorSwatches.load(color_scheme)
              },
          })
    }
    
    const defaultDetail = function () {
        return {
            id: null,
            color_scheme_id: null,
            name: null,
            view_product_index: 1,
            view_product_index_filter: 1,
            view_product_index_search: 1,
            view_product_edit: 1,
            view_product_package_edit: 1,
            view_product_package_index: 1,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            note: null,
            category_id: null,
            color_scheme: {
                id: null,
                name: null,
                background_color: null,
                border_color: null,
                text_color: null,
                sort_order: 999,
                enabled: 1,
                date_created: formatDateMySQL(),
                created_by: user_id,
                date_modified: formatDateMySQL(),
                modified_by: user_id,
                note: null,
            },
        }
    }
    
    const formatSeasonType = function (season) {
        
        let detail = defaultDetail()
        
        // -----
        
        let category_id = (!isNaN(parseInt(season.category_id))) ? parseInt(season.category_id) : null
        
        //
        detail.id = (!isNaN(parseInt(season.id))) ? parseInt(season.id) : null
        detail.color_scheme_id = (!isNaN(parseInt(season.color_scheme_id))) ? parseInt(season.color_scheme_id) : null
        detail.name = (season.name) ? season.name : null
        detail.view_product_index = (season.view_product_index) ? season.view_product_index : 1
        detail.view_product_index_filter = (season.view_product_index_filter) ? season.view_product_index_filter : 1
        detail.view_product_index_search = (season.view_product_index_search) ? season.view_product_index_search : 1
        detail.view_product_edit = (season.view_product_edit) ? season.view_product_edit : 1
        detail.view_product_package_edit = (season.view_product_package_edit) ? season.view_product_package_edit : 1
        detail.view_product_package_index = (season.view_product_package_index) ? season.view_product_package_index : 1
        detail.enabled = (season.enabled) ? season.enabled : 1
        detail.date_created = (season.date_created) ? season.date_created : formatDateMySQL()
        detail.created_by = (!isNaN(parseInt(season.created_by))) ? parseInt(season.created_by) : user_id
        detail.date_modified = (season.date_modified) ? season.date_modified : formatDateMySQL()
        detail.modified_by = (!isNaN(parseInt(season.modified_by))) ? parseInt(season.modified_by) : user_id
        detail.note = (season.note) ? season.note : null
        detail.category_id = (!isNaN(parseInt(season.category_id))) ? parseInt(season.category_id) : null
        detail.color_scheme.id = (!isNaN(parseInt(season.color_scheme.id))) ? parseInt(season.color_scheme.id) : null
        detail.color_scheme.name = season.color_scheme.name
        detail.color_scheme.background_color = season.color_scheme.background_color
        detail.color_scheme.border_color = season.color_scheme.border_color
        detail.color_scheme.text_color = season.color_scheme.text_color
        detail.color_scheme.sort_order = (!isNaN(parseInt(season.color_scheme.sort_order))) ? parseInt(season.color_scheme.sort_order) : 999
        detail.color_scheme.enabled = season.color_scheme.enabled
        detail.color_scheme.date_created = (season.color_scheme.date_created) ? season.color_scheme.date_created : formatDateMySQL()
        detail.color_scheme.created_by = (!isNaN(parseInt(season.color_scheme.created_by))) ? parseInt(season.color_scheme.created_by) : user_id
        detail.color_scheme.date_modified = (season.color_scheme.date_modified) ? season.color_scheme.date_modified : formatDateMySQL()
        detail.color_scheme.modified_by = (!isNaN(parseInt(season.color_scheme.modified_by))) ? parseInt(season.color_scheme.modified_by) : user_id
        detail.color_scheme.note = season.color_scheme.note
        
        if (!categories.get(category_id)) {
            categories.set(category_id, {
                seasons: [],
            })
        }
        
        let category = categories.get(category_id)
        let category_seasons = (category.seasons) ? category.seasons : []
        //Console.log(categories.get(category_id).seasons)
        //Console.log("category", category)
        //Console.log(detail)
        return detail
    }
    
    const load_types = function (seasons) {
        categories = new Map()
        if (seasons) {
            
            $.each(seasons, function (i, season) {
                Season.types.set(season.id, formatSeasonType(season))
            })
        }
    }
    
    const load_all = function (seasons) {
        if (!seasons) {
            seasons = []
        }
    }
    
    const init = function (settings) {
        let seasons = []
        if (settings) {
            if (settings.seasons) {
                seasons = settings.seasons
                
            }
        }
        
        if (_product_edit_season_form_season_name_filter) {
            init_autocomplete()
            Console.log("seasons", settings)
        }
        
        load_types(seasons)
    }
    
    return {
        types: new Map(),
        loadTypes: function (seasons) {
            load_types(seasons)
        },
        init: function (settings) {
            init(settings)
        },
    }
})()
