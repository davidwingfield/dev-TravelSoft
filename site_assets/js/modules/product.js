const Product = (function () {
    "use strict"
    const _form_product_add = document.getElementById("form_product_add")
    const _product_edit_page = document.getElementById("product_edit_page")
    const _button_add_product_page_heading = document.getElementById("button_add_product_page_heading")
    const _modal_button_cancel_add_product = document.getElementById("modal_button_cancel_add_product")
    const _modal_button_submit_add_product = document.getElementById("modal_button_submit_add_product")
    const _modal_product_provider_name = document.getElementById("modal_product_provider_name")
    const _modal_product_vendor_name = document.getElementById("modal_product_vendor_name")
    const _modal_product_provider_id = document.getElementById("modal_product_provider_id")
    const _modal_product_vendor_id = document.getElementById("modal_product_vendor_id")
    const _modal_new_product = document.getElementById("modal_new_product")
    const _modal_product_name = document.getElementById("modal_product_name")
    const _modal_product_category_id = document.getElementById("modal_product_category_id")
    const _modal_product_sku = document.getElementById("modal_product_sku")
    const _modal_product_rating_types_id = document.getElementById("modal_product_rating_types_id")
    const _modal_product_currency_id = document.getElementById("modal_product_currency_id")
    const _modal_product_pricing_strategies_types_id = document.getElementById("modal_product_pricing_strategies_types_id")
    const _modal_product_provider_company_id = document.getElementById("modal_product_provider_company_id")
    const _modal_product_vendor_company_id = document.getElementById("modal_product_vendor_company_id")
    const _modal_product_provider_vendor_match = document.getElementById("modal_product_provider_vendor_match")
    /**
     * product search: panels - hotels
     * @type {HTMLElement}
     * @private
     */
    const _panel_hotels = document.getElementById("panel_hotels")
    const _panel_flights = document.getElementById("panel_flights")
    const _panel_cars = document.getElementById("panel_cars")
    const _panel_rails = document.getElementById("panel_rails")
    const _panel_transport = document.getElementById("panel_transport")
    const _panel_tours = document.getElementById("panel_tours")
    const _panel_cruises = document.getElementById("panel_cruises")
    const _panel_packages = document.getElementById("panel_packages")
    const _panel_other = document.getElementById("panel_other")
    const _form_product_search_panel_hotels = document.getElementById("form_product_search_panel_hotels")
    const _form_product_search_panel_flights = document.getElementById("form_product_search_panel_flights")
    const _form_product_search_panel_cars = document.getElementById("form_product_search_panel_cars")
    const _form_product_search_panel_rails = document.getElementById("form_product_search_panel_rails")
    const _form_product_search_panel_transport = document.getElementById("form_product_search_panel_transport")
    const _form_product_search_panel_tours = document.getElementById("form_product_search_panel_tours")
    const _form_product_search_panel_cruises = document.getElementById("form_product_search_panel_cruises")
    const _form_product_search_panel_packages = document.getElementById("form_product_search_panel_packages")
    const _form_product_search_panel_other = document.getElementById("form_product_search_panel_other")
    /**
     * product search: panels - hotels product_name
     *
     * @type {HTMLElement}
     * @private
     */
    const _form_product_search_hotel_product_name = document.getElementById("form_product_search_hotel_product_name")
    const _button_product_search_panel_hotels_clear = document.getElementById("button_product_search_panel_hotels_clear")
    const _button_product_search_panel_hotels_submit = document.getElementById("button_product_search_panel_hotels_submit")
    const base_url = "/products"
    const _product_index_page = document.getElementById("product_index_page")
    const _product_index_table = document.getElementById("product_index_table")
    //
    
    //
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let $index_table, new_product_validator
    //
    let add_modal_form_rules = {
        groups: {
            providerNameGroup: "modal_product_provider_id modal_product_provider_name modal_product_provider_company_id",
            vendorNameGroup: "modal_product_vendor_id modal_product_vendor_name modal_product_vendor_company_id",
        },
        rules: {
            modal_product_sku: {
                required: true,
            },
            modal_product_rating_types_id: {
                required: true,
            },
            modal_product_currency_id: {
                required: true,
            },
            modal_product_pricing_strategies_types_id: {
                required: true,
            },
            modal_product_name: {
                required: true,
            },
            modal_product_category_id: {
                required: true,
            },
            modal_product_provider_name: {
                required: true,
            },
            modal_product_provider_id: {
                required: true,
            },
            modal_product_provider_company_id: {
                required: true,
            },
            modal_product_vendor_name: {
                required: true,
            },
            modal_product_vendor_id: {
                required: true,
            },
            modal_product_vendor_company_id: {
                required: true,
            },
        },
        messages: {
            modal_product_sku: {
                required: "Field Required",
            },
            modal_product_rating_types_id: {
                required: "Field Required",
            },
            modal_product_currency_id: {
                required: "Field Required",
            },
            modal_product_pricing_strategies_types_id: {
                required: "Field Required",
            },
            modal_product_name: {
                required: "Field Required",
            },
            modal_product_provider_id: {
                required: "Field Required",
            },
            modal_product_category_id: {
                required: "Field Required",
            },
            modal_product_provider_name: {
                required: "Field Required",
            },
            modal_product_vendor_name: {
                required: "Field Required",
            },
            modal_product_provider_company_id: {
                required: "Field Required",
            },
            modal_product_vendor_id: {
                required: "Field Required",
            },
            modal_product_vendor_company_id: {
                required: "Field Required",
            },
        },
    }
    
    $(_button_add_product_page_heading)
      .on("click", function () {
          set_new_product_modal()
      })
    
    $(_modal_new_product)
      .on("hide.bs.modal", function () {
          clear_validation(_form_product_add)
      })
    
    $(_modal_button_cancel_add_product)
      .on("click", function () {
          clear_validation(_form_product_add)
          $(_modal_new_product).modal("hide")
      })
    
    $(_modal_button_submit_add_product)
      .on("click", function () {
          console.log(validate_new_form())
          save_new()
      })
    
    $(_modal_product_provider_vendor_match)
      .on("change", function () {
          let provider_company_id = (isNaN(parseInt(_modal_product_provider_company_id.value))) ? null : parseInt(_modal_product_provider_company_id.value)
          
          if (provider_company_id !== null) {
              if (_modal_product_provider_vendor_match.checked) {
                  _modal_product_vendor_company_id.value = _modal_product_provider_company_id.value
                  if (Provider.detail !== null) {
                      _modal_product_vendor_company_id.value = Provider.detail.vendor.company_id
                      _modal_product_vendor_id.value = Provider.detail.vendor.id
                      _modal_product_vendor_name.value = Provider.detail.vendor.name
                  } else {
                      _modal_product_vendor_company_id.value = ""
                      _modal_product_vendor_id.value = ""
                      _modal_product_vendor_name.value = ""
                  }
              } else {
                  _modal_product_vendor_company_id.value = ""
                  _modal_product_vendor_id.value = ""
                  _modal_product_vendor_name.value = ""
              }
          }
      })
    
    const init_new_product_autocomplete = function () {
        let category_id = (!isNaN(parseInt(_modal_product_category_id.value))) ? parseInt(_modal_product_category_id.value) : null
        
        if (category_id !== null) {
            $(_modal_product_name)
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
              .on("search", function () {
              
              })
              .on("click", function () {
                  $(this).select()
              })
              .autocomplete({
                  serviceUrl: "/api/v1.0/autocomplete/products",
                  minChars: 2,
                  params: { "category_id": category_id },
                  cache: false,
                  dataType: "json",
                  triggerSelectOnValidInput: false,
                  paramName: "st",
                  onSelect: function (suggestion) {
                      if (!suggestion || !suggestion.data) {
                          return
                      }
                      //console.log("suggestion.data", suggestion.data)
                      let product = suggestion.data
                      console.log("product", product)
                  },
              })
        }
        console.log("init_new_product_autocomplete()", category_id)
    }
    
    const validate_new_form = function () {
        console.log("validate_new_form", "")
        if (_form_product_add) {
            return $(_form_product_add).valid()
        }
        return false
    }
    
    const clear_modal_form = function () {
        _modal_product_name.value = ""
        _modal_product_category_id.value = ""
        _modal_product_sku.value = ""
        _modal_product_rating_types_id.value = ""
        _modal_product_currency_id.value = ""
        _modal_product_provider_company_id.value = ""
        _modal_product_vendor_company_id.value = ""
        _modal_product_vendor_name.disabled = true
        _modal_product_provider_name.disabled = true
        _modal_product_pricing_strategies_types_id.value = ""
        Product.attr1 = null
        Product.attr2 = null
        Product.attr3 = null
        Product.update_product_sku()
        Product.reset_new_product_details()
        clear_validation(_form_product_add)
    }
    
    const reset_new_product_details = function () {
        _modal_product_provider_id.value = ""
        _modal_product_vendor_id.value = ""
        _modal_product_provider_name.value = ""
        _modal_product_vendor_name.value = ""
        //_modal_product_provider_name.disabled = true
        //_modal_product_vendor_name.disabled = true
        _modal_product_name.value = ""
        _modal_product_sku.value = ""
        _modal_product_rating_types_id.value = ""
        _modal_product_currency_id.value = ""
        _modal_product_pricing_strategies_types_id.value = ""
        _modal_product_name.disabled = true
        _modal_product_sku.disabled = true
        _modal_product_rating_types_id.disabled = true
        _modal_product_currency_id.disabled = true
        _modal_product_pricing_strategies_types_id.disabled = true
    }
    
    const set_new_product_modal = function () {
        clear_modal_form()
        $(_modal_new_product).modal("show")
    }
    
    const save_new = function () {
    
    }
    
    const handle_product_error = function (msg) {
        toastr.error(msg)
    }
    
    const _default_detail = function () {
        return {
            id: null,
            category_id: null,
            pricing_strategy_types_id: null,
            status_types_id: null,
            product_status_types_id: null,
            currency_id: null,
            location_id: null,
            city_id: null,
            vendor_id: null,
            provider_id: null,
            name: null,
            provider_vendor_match: 1,
            description_short: null,
            description_long: null,
            rating: null,
            sku: null,
            phone: null,
            infant: null,
            child: null,
            teen: null,
            depart_from: null,
            arrive_to: null,
            depart_time: null,
            arrive_time: null,
            day_span: null,
            cover_image: null,
            api_id: null,
            from_api: 1,
            hotel_code: null,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            note: null,
            keywords: [],
            seasons: [],
            units: [],
            use_provider_location: 0,
            variants: [],
            category: {},
            location: {},
            vendor: {},
            profiles: [],
            provider: {},
        }
    }
    
    const save = function (params) {
    
    }
    
    const get = function (id) {
        let data_to_send = {}
        if (id) {
            data_to_send.id = id
        }
        
    }
    
    const set = function (product) {
        let detail = _default_detail()
        if (product) {
            detail.id = (product.id) ? product.id : null
            detail.category_id = (product.category_id) ? product.category_id : null
            detail.pricing_strategy_types_id = (product.pricing_strategy_types_id) ? product.pricing_strategy_types_id : null
            detail.status_types_id = (product.status_types_id) ? product.status_types_id : null
            detail.product_status_types_id = (product.product_status_types_id) ? product.product_status_types_id : null
            detail.currency_id = (product.currency_id) ? product.currency_id : null
            detail.location_id = (product.location_id) ? product.location_id : null
            detail.city_id = (product.city_id) ? product.city_id : null
            detail.vendor_id = (product.vendor_id) ? product.vendor_id : null
            detail.provider_id = (product.provider_id) ? product.provider_id : null
            detail.name = (product.name) ? product.name : null
            detail.provider_vendor_match = (product.provider_vendor_match) ? product.provider_vendor_match : 1
            detail.description_short = (product.description_short) ? product.description_short : null
            detail.description_long = (product.description_long) ? product.description_long : null
            detail.rating = (product.rating) ? product.rating : null
            detail.sku = (product.sku) ? product.sku : null
            detail.phone = (product.phone) ? product.phone : null
            detail.infant = (product.infant) ? product.infant : null
            detail.child = (product.child) ? product.child : null
            detail.teen = (product.teen) ? product.teen : null
            detail.depart_from = (product.depart_from) ? product.depart_from : null
            detail.arrive_to = (product.arrive_to) ? product.arrive_to : null
            detail.depart_time = (product.depart_time) ? product.depart_time : null
            detail.arrive_time = (product.arrive_time) ? product.arrive_time : null
            detail.day_span = (product.day_span) ? product.day_span : null
            detail.cover_image = (product.cover_image) ? product.cover_image : null
            detail.api_id = (product.api_id) ? product.api_id : null
            detail.from_api = (product.from_api) ? product.from_api : 1
            detail.hotel_code = (product.hotel_code) ? product.hotel_code : null
            detail.enabled = (product.enabled) ? product.enabled : 1
            detail.date_created = (product.date_created) ? product.date_created : formatDateMySQL()
            detail.created_by = (product.created_by) ? product.created_by : user_id
            detail.date_modified = (product.date_modified) ? product.date_modified : formatDateMySQL()
            detail.modified_by = (product.modified_by) ? product.modified_by : user_id
            detail.note = (product.note) ? product.note : null
            detail.category = (product.category) ? product.category : {}
            detail.keywords = (product.keywords) ? product.keywords : []
            detail.seasons = (product.seasons) ? product.seasons : []
            detail.units = (product.units) ? product.units : []
            detail.use_provider_location = (product.use_provider_location) ? product.use_provider_location : 0
            detail.variants = (product.variants) ? product.variants : []
            detail.location = (product.location) ? product.location : {}
            detail.vendor = (product.vendor) ? product.vendor : {}
            detail.provider = (product.provider) ? product.provider : {}
        }
        
        Product.detail = detail
        return detail
    }
    
    const load_all = function (products) {
        Product.all = new Map()
        
        if (!products) {
            return
        }
        
        $.each(products, function (i, product) {
            let detail = set(product)
            $index_table.insertRow(detail)
            Product.all.set("id", detail)
        })
    }
    
    const build_index_table = function () {
        
        $index_table = $(_product_index_table).table({
            table_type: "display_list",
            data: [],
            columnDefs: [
                {
                    title: "Name",
                    targets: 0,
                    data: "name",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "SKU",
                    targets: 1,
                    data: "sku",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "Provider",
                    targets: 2,
                    data: "provider",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data.name + "</span>"
                    },
                },
                {
                    title: "Vendor",
                    targets: 3,
                    data: "vendor",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data.name + "</span>"
                    },
                },
                {
                    title: "Location",
                    targets: 4,
                    data: "location",
                    render: function (data, type, row, meta) {
                        let displayLocation = ""
                        if (defaultLocationDisplayFormat === "short") {
                            displayLocation = data.display_short
                        } else if (defaultLocationDisplayFormat === "long") {
                            displayLocation = data.display_long
                        } else {
                            displayLocation = data.display_medium
                        }
                        
                        return "<span style='white-space: nowrap;'>" + displayLocation + "</span>"
                    },
                },
                {
                    title: "Category",
                    targets: 5,
                    data: "category",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data.name + "</span>"
                    },
                },
            ],
            rowClick: Product.navigate,
        })
    }
    
    const navigate = function (product) {
        if (product && product.id) {
            window.location.replace(base_url + "/" + product.id)
        }
    }
    
    const init_autocomplete = function () {
        if (_modal_product_name) {
        
        }
    }
    
    const init = function (settings) {
        console.log("Product.init()", settings)
        if (_modal_new_product) {
            Category.init()
        }
        
        if (_product_edit_page) {
            return true
        }
        
        if (_product_index_page) {
            Provider.init()
            Product.index(settings)
            if (_form_product_add) {
                validator_init(add_modal_form_rules)
                new_product_validator = $(_form_product_add).validate()
            }
            return true
        }
    }
    
    const index = function (settings) {
        
        if (_product_index_table) {
            build_index_table()
            
            if (settings) {
                load_all(settings)
            }
        }
    }
    
    const setNewFormDetails = function (category_id) {
        console.log("setNewFormDetails()", category_id)
        
    }
    
    const update_product_sku = function () {
        let att1 = Product.attr1
        let att2 = Product.attr2
        let att3 = Product.attr3
        let sku = ""
        if (!is_null(att1) && !is_null(att2) && !is_null(att3)) {
            sku = att1.replace(/-/g, "") + "-" + att2.replace(/-/g, "") + "-" + att3.replace(/-/g, "")
            _modal_product_sku.value = sku
        } else {
            _modal_product_sku.value = ""
            if (is_null(att1)) {
                console.log("att1 is null", att1)
            }
            
            if (is_null(att2)) {
                console.log("att2 is null", att2)
            }
            
            if (is_null(att3)) {
                console.log("att3 is null", att3)
            }
        }
        
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        attr1: null,
        attr2: null,
        attr3: null,
        update_product_sku: function () {
            update_product_sku()
        },
        setNewFormDetails: function (category_id) {
            console.log("Product.setNewFormDetails()", category_id)
            setNewFormDetails(category_id)
        },
        get: function (params) {
            get(params)
        },
        init_autocomplete: function () {
            init_autocomplete()
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
        index: function (settings) {
            index(settings)
        },
        navigate: function (product) {
            navigate(product)
        },
        reset_new_product_details: function () {
            reset_new_product_details()
        },
        init_new_product_autocomplete: function () {
            init_new_product_autocomplete()
        },
    }
    
})()
