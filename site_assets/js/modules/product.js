const Product = (function () {
    "use strict"
    
    const base_url = "/products"
    const regex = /[^A-Za-z0-9]/g
    const _product_edit_meta_description_long_update_button = document.getElementById("product_edit_meta_description_long_update_button")
    const _product_edit_meta_description_short_update_button = document.getElementById("product_edit_meta_description_short_update_button")
    const _product_edit_meta_product_amenities_update_button = document.getElementById("product_edit_meta_product_amenities_update_button")
    const _product_edit_meta_product_keywords_update_button = document.getElementById("product_edit_meta_product_keywords_update_button")
    const _product_edit_details_section_publish = document.getElementById("product_edit_details_section_publish")
    const _product_edit_details_section_save_draft = document.getElementById("product_edit_details_section_save_draft")
    const _form_product_add = document.getElementById("form_product_add")
    const _modal_product_depart_from_time = document.getElementById("modal_product_depart_from_time")
    const _modal_product_depart_from_date = document.getElementById("modal_product_depart_from_date")
    const _modal_product_arrive_to_time = document.getElementById("modal_product_arrive_to_time")
    const _modal_product_arrive_to_date = document.getElementById("modal_product_arrive_to_date")
    const _modal_product_depart_from_station = document.getElementById("modal_product_depart_from_station")
    const _modal_product_arrive_to_station = document.getElementById("modal_product_arrive_to_station")
    const _modal_product_depart_from_airport = document.getElementById("modal_product_depart_from_airport")
    const _modal_product_arrive_to_airport = document.getElementById("modal_product_arrive_to_airport")
    const _modal_product_depart_from_station_id = document.getElementById("modal_product_depart_from_station_id")
    const _modal_product_arrive_to_station_id = document.getElementById("modal_product_arrive_to_station_id")
    const _modal_product_depart_from_airport_id = document.getElementById("modal_product_depart_from_airport_id")
    const _modal_product_arrive_to_airport_id = document.getElementById("modal_product_arrive_to_airport_id")
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
    const _modal_product_provider_location_id = document.getElementById("modal_product_provider_location_id")
    const _modal_product_location_id = document.getElementById("modal_product_location_id")
    const _modal_product_street_1 = document.getElementById("modal_product_street_1")
    const _modal_product_street_2 = document.getElementById("modal_product_street_2")
    const _modal_product_postal_code = document.getElementById("modal_product_postal_code")
    const _modal_product_city_id = document.getElementById("modal_product_city_id")
    const _modal_product_province_id = document.getElementById("modal_product_province_id")
    const _modal_product_country_id = document.getElementById("modal_product_country_id")
    const _modal_product_city = document.getElementById("modal_product_city")
    const _modal_product_day_span = document.getElementById("modal_product_day_span")
    const _modal_button_clear_add_product = document.getElementById("modal_button_clear_add_product")
    const _modal_product_depart_from_station_date = document.getElementById("modal_product_depart_from_station_date")
    const _modal_product_arrive_to_station_date = document.getElementById("modal_product_arrive_to_station_date")
    const _modal_product_depart_from_station_time = document.getElementById("modal_product_depart_from_station_time")
    const _modal_product_arrive_to_station_time = document.getElementById("modal_product_arrive_to_station_time")
    
    const _product_edit_page = document.getElementById("product_edit_page")
    const _product_panel_link_overview = document.getElementById("product_panel_link_overview")
    const _panel_tab_product_o = document.getElementById("panel_tab_product_o")
    const _product_panel_link_product = document.getElementById("product_panel_link_product")
    const _panel_tab_product = document.getElementById("panel_tab_product")
    const _product_panel_link_season = document.getElementById("product_panel_link_season")
    const _panel_tab_season = document.getElementById("panel_tab_season")
    const _product_panel_link_unit = document.getElementById("product_panel_link_unit")
    const _panel_tab_unit = document.getElementById("panel_tab_unit")
    const _product_panel_link_variant = document.getElementById("product_panel_link_variant")
    const _panel_tab_variant = document.getElementById("panel_tab_variant")
    const _product_panel_link_inventory = document.getElementById("product_panel_link_inventory")
    const _panel_tab_inventory = document.getElementById("panel_tab_inventory")
    const _product_panel_link_pricing = document.getElementById("product_panel_link_pricing")
    const _panel_tab_pricing = document.getElementById("panel_tab_pricing")
    const _panel_tab_location = document.getElementById("panel_tab_location")
    const _panel_tab_product_location = document.getElementById("panel_tab_product_location")
    const _panel_tab_product_meta = document.getElementById("panel_tab_product_meta")
    const _panel_tab_meta = document.getElementById("panel_tab_meta")
    const _product_panel_link_meta = document.getElementById("product_panel_link_meta")
    const _product_panel_link_location = document.getElementById("product_panel_link_location")
    const _product_edit_details_currency_id = document.getElementById("product_edit_details_currency_id")
    const _product_edit_details_rating_types_id = document.getElementById("product_edit_details_rating_types_id")
    const _product_keywords = document.getElementById("product_keywords")
    const _product_edit_meta_description_long = document.getElementById("product_edit_meta_description_long")
    const _product_edit_meta_description_short = document.getElementById("product_edit_meta_description_short")
    const _product_index_page = document.getElementById("product_index_page")
    const _product_index_table = document.getElementById("product_index_table")
    const _product_amenities = document.getElementById("product_amenities")
    const _product_id = document.getElementById("product_id")
    const _product_edit_details_name = document.getElementById("product_edit_details_name")
    const _product_edit_details_enabled = document.getElementById("product_edit_details_enabled")
    const _product_edit_details_sku = document.getElementById("product_edit_details_sku")
    const _pricing_strategy_types_id = document.getElementById("pricing_strategy_types_id")
    const _product_edit_location_city_id = document.getElementById("product_edit_location_city_id")
    const _product_edit_location_id = document.getElementById("product_edit_location_id")
    const _provider_id = document.getElementById("provider_id")
    const _vendor_id = document.getElementById("vendor_id")
    const _display_product_name = document.getElementById("display_product_name")
    const _button_save_product = document.getElementById("button_save_product")
    const _button_add_product_page_heading = document.getElementById("button_add_product_page_heading")
    const _category_id = document.getElementById("category_id")
    const _product_location_departing_station_city_id = document.getElementById("product_location_departing_station_city_id")
    const _product_location_arriving_station_city_id = document.getElementById("product_location_arriving_station_city_id")
    const _product_location_departing_station_id = document.getElementById("product_location_departing_station_id")
    const _product_location_arriving_station_id = document.getElementById("product_location_arriving_station_id")
    const _product_location = document.getElementById("product_location")
    const _product_edit_details_submit_button = document.getElementById("product_edit_details_submit_button")
    const _product_description_long = document.getElementById("product_description_long")
    const _product_edit_details_section_seasons = document.getElementById("product_edit_details_section_seasons")
    const _product_edit_details_section_units = document.getElementById("product_edit_details_section_units")
    const _product_edit_details_section_variants = document.getElementById("product_edit_details_section_variants")
    const _product_edit_details_section_status = document.getElementById("product_edit_details_section_status")
    const _product_description_short = document.getElementById("product_description_short")
    const _product_edit_details_section_profiles = document.getElementById("product_edit_details_section_profiles")
    const _user_id = document.getElementById("user_id")
    const _modal_product_id = document.getElementById("modal_product_id")
    const _modal_product_description_short = document.getElementById("modal_product_description_short")
    const _modal_product_description_long = document.getElementById("modal_product_description_long")
    const _modal_product_keywords = document.getElementById("modal_product_keywords")
    const _modal_product_meta_fields = document.getElementById("modal_product_meta_fields")
    const _modal_product_detail_fields = document.getElementById("modal_product_detail_fields")
    const _modal_product_depart_from_fields = document.getElementById("modal_product_depart_from_fields")
    const _modal_product_arrive_to_fields = document.getElementById("modal_product_arrive_to_fields")
    const _modal_product_hotel_fields = document.getElementById("modal_product_hotel_fields")
    const _modal_product_flight_fields = document.getElementById("modal_product_flight_fields")
    const _modal_product_cars_fields = document.getElementById("modal_product_cars_fields")
    const _modal_product_rail_fields = document.getElementById("modal_product_rail_fields")
    const _modal_product_transport_fields = document.getElementById("modal_product_transport_fields")
    const _modal_product_tours_fields = document.getElementById("modal_product_tours_fields")
    const _modal_product_cruises_fields = document.getElementById("modal_product_cruises_fields")
    
    let radios = document.querySelectorAll('input[type=radio][name="location_to_use"]')
    let userId, categoryId, productId, $product_keywords, $product_amenities, $index_table
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    let addProductRules = {
        groups: {
            /*
            modal_product_provider_name: "modal_product_provider_name, modal_product_provider_company_id, modal_product_provider_id",
            modal_product_vendor_name: "modal_product_vendor_name, modal_product_vendor_id, modal_product_vendor_company_id",
            modal_product_depart_from_station: "modal_product_depart_from_station, modal_product_depart_from_station_id, modal_product_country_id, modal_product_province_id, modal_product_city_id",
            modal_product_arrive_to_station: "modal_product_arrive_to_station, modal_product_arrive_to_station_id",
            modal_product_city: "modal_product_city, modal_product_country_id, modal_product_province_id, modal_product_city_id",
            modal_product_country_cars: "modal_product_country_id",
            modal_product_city_tours: "modal_product_country_id, modal_product_province_id, modal_product_city_id",
            modal_product_city_transports: "modal_product_country_id, modal_product_province_id, modal_product_city_id",
            //*/
        },
        rules: {
            modal_product_sku: {
                required: true,
            },
            modal_day_span: {
                required: true,
                
            },
            modal_product_rating_types_id: {
                required: function (el) {
                    let categoryId = (_modal_product_category_id && (!isNaN(parseInt(_modal_product_category_id.value)))) ? parseInt(_modal_product_category_id.value) : null
                    
                    if (categoryId && (categoryId === 1 || categoryId === 3 || categoryId === 5 || categoryId === 6 || categoryId === 7)) {
                        return true
                    }
                },
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
            //LOCATION COUNTRY PROV CITY
            modal_product_country_id: {
                required: true,
            },
            modal_product_province_id: {
                required: function (el) {
                    let categoryId = (_modal_product_category_id && (!isNaN(parseInt(_modal_product_category_id.value)))) ? parseInt(_modal_product_category_id.value) : null
                    
                    if (categoryId && (categoryId === 1 || categoryId === 2)) {
                        return true
                    }
                },
            },
            modal_product_city_id: {
                required: function (el) {
                    let categoryId = (_modal_product_category_id && (!isNaN(parseInt(_modal_product_category_id.value)))) ? parseInt(_modal_product_category_id.value) : null
                    
                    if (categoryId && (categoryId === 1 || categoryId === 2)) {
                        return true
                    }
                },
            },
            //HOTEL
            modal_product_city: {
                required: function (el) {
                    let categoryId = (_modal_product_category_id && (!isNaN(parseInt(_modal_product_category_id.value)))) ? parseInt(_modal_product_category_id.value) : null
                    
                    if (categoryId && (categoryId === 1)) {
                        return true
                    }
                },
            },
            //CAR
            modal_product_country_cars: {
                required: function (el) {
                    let categoryId = (_modal_product_category_id && (!isNaN(parseInt(_modal_product_category_id.value)))) ? parseInt(_modal_product_category_id.value) : null
                    
                    if (categoryId && categoryId === 3) {
                        return true
                    }
                },
            },
            //TRANSPORT
            modal_product_city_transports: {
                required: function (el) {
                    let categoryId = (_modal_product_category_id && (!isNaN(parseInt(_modal_product_category_id.value)))) ? parseInt(_modal_product_category_id.value) : null
                    
                    if (categoryId && categoryId === 5) {
                        return true
                    }
                },
            },
            //TOURS
            modal_product_city_tours: {
                required: function (el) {
                    let categoryId = (_modal_product_category_id && (!isNaN(parseInt(_modal_product_category_id.value)))) ? parseInt(_modal_product_category_id.value) : null
                    
                    if (categoryId && categoryId === 6) {
                        return true
                    }
                },
            },
            //PROVIDER
            modal_product_provider_name: {
                required: true,
            },
            modal_product_provider_id: {
                required: true,
            },
            modal_product_provider_company_id: {
                required: true,
            },
            //VENDOR
            modal_product_vendor_name: {
                required: true,
            },
            modal_product_vendor_id: {
                required: true,
            },
            modal_product_vendor_company_id: {
                required: true,
            },
            //FLIGHTS
            modal_product_depart_from_airport: {
                required: function (el) {
                    if (_modal_product_category_id) {
                        let categoryId = (!isNaN(parseInt(_modal_product_category_id.value))) ? parseInt(_modal_product_category_id.value) : null
                        
                        if (categoryId === 2) {
                            return true
                        }
                    }
                },
            },
            modal_product_depart_from_airport_id: {
                required: function (el) {
                    if (_modal_product_category_id) {
                        let categoryId = (!isNaN(parseInt(_modal_product_category_id.value))) ? parseInt(_modal_product_category_id.value) : null
                        
                        if (categoryId === 2) {
                            return true
                        }
                    }
                },
            },
            modal_product_arrive_to_airport: {
                required: function (el) {
                    if (_modal_product_category_id) {
                        let categoryId = (!isNaN(parseInt(_modal_product_category_id.value))) ? parseInt(_modal_product_category_id.value) : null
                        
                        if (categoryId === 2) {
                            return true
                        }
                    }
                },
            },
            modal_product_arrive_to_airport_id: {
                required: function (el) {
                    if (_modal_product_category_id) {
                        let categoryId = (!isNaN(parseInt(_modal_product_category_id.value))) ? parseInt(_modal_product_category_id.value) : null
                        
                        if (categoryId === 2) {
                            return true
                        }
                    }
                },
            },
            //RAILS
            modal_product_depart_from_station: {
                required: function (el) {
                    if (_modal_product_category_id) {
                        let categoryId = (!isNaN(parseInt(_modal_product_category_id.value))) ? parseInt(_modal_product_category_id.value) : null
                        
                        if (categoryId === 4) {
                            return true
                        }
                    }
                },
            },
            modal_product_depart_from_station_id: {
                required: function (el) {
                    if (_modal_product_category_id) {
                        let categoryId = (!isNaN(parseInt(_modal_product_category_id.value))) ? parseInt(_modal_product_category_id.value) : null
                        
                        if (categoryId === 4) {
                            return true
                        }
                    }
                },
            },
            modal_product_arrive_to_station: {
                required: function (el) {
                    if (_modal_product_category_id) {
                        let categoryId = (!isNaN(parseInt(_modal_product_category_id.value))) ? parseInt(_modal_product_category_id.value) : null
                        
                        if (categoryId === 4) {
                            return true
                        }
                    }
                },
            },
            modal_product_arrive_to_station_id: {
                required: function (el) {
                    if (_modal_product_category_id) {
                        let categoryId = (!isNaN(parseInt(_modal_product_category_id.value))) ? parseInt(_modal_product_category_id.value) : null
                        
                        if (categoryId === 4) {
                            return true
                        }
                    }
                },
            },
        },
        messages: {
            modal_product_sku: {
                required: "Field Required",
            },
            modal_day_span: {
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
            modal_product_category_id: {
                required: "Field Required",
            },
            
            modal_product_city: {
                required: "Field Required",
            },
            
            modal_product_country_id: {
                required: "Field Required",
            },
            modal_product_province_id: {
                required: "Field Required",
            },
            modal_product_city_id: {
                required: "Field Required",
            },
            
            modal_product_country_cars: {
                required: "Field Required",
            },
            modal_product_city_transports: {
                required: "Field Required",
            },
            modal_product_city_tours: {
                required: "Field Required",
            },
            
            modal_product_provider_name: {
                required: "Field Required",
            },
            modal_product_provider_id: {
                required: "Field Required",
            },
            modal_product_provider_company_id: {
                required: "Field Required",
            },
            
            modal_product_vendor_name: {
                required: "Field Required",
            },
            modal_product_vendor_id: {
                required: "Field Required",
            },
            modal_product_vendor_company_id: {
                required: "Field Required",
            },
            // Flights
            modal_product_depart_from_airport: {
                required: "Field Required",
            },
            modal_product_depart_from_airport_id: {
                required: "Field Required",
            },
            modal_product_arrive_to_airport: {
                required: "Field Required",
            },
            modal_product_arrive_to_airport_id: {
                required: "Field Required",
            },
            
            //Rails
            modal_product_depart_from_station: {
                required: "Field Required",
            },
            modal_product_depart_from_station_id: {
                required: "Field Required",
            },
            modal_product_arrive_to_station: {
                required: "Field Required",
            },
            modal_product_arrive_to_station_id: {
                required: "Field Required",
            },
            
        },
    }
    
    $("#modal_product_day_span_station")
        .on("change", function () {
            let daySpan = (!isNaN(parseInt($(this).val()))) ? parseInt($(this).val()) : 1
            
            if (daySpan <= 0) {
                daySpan = 1
            }
            
            $(this).val(daySpan)
            _modal_product_day_span.value = daySpan
        })
    
    $("#modal_product_day_span_airport")
        .on("change", function () {
            let daySpan = (!isNaN(parseInt($(this).val()))) ? parseInt($(this).val()) : 1
            
            if (daySpan <= 0) {
                daySpan = 1
            }
            
            $(this).val(daySpan)
            _modal_product_day_span.value = daySpan
        })
    
    $("#page")
        .on("change", function () {
            updateProgress()
        })
    
    $("#button_view_calendar")
        .on("click", function () {
            $("#seasonCalendarModal").modal("show")
        })
    
    $(_product_edit_meta_description_long_update_button)
        .on("click", function () {
            //console.log("Product.product_edit_meta_description_long_update_button.click()")
            updateMeta()
        })
    
    $(_product_edit_meta_description_short_update_button)
        .on("click", function () {
            //console.log("Product.product_edit_meta_description_short_update_button.click()")
            updateMeta()
        })
    
    $(_product_edit_meta_product_amenities_update_button)
        .on("click", function () {
            //console.log("Product.product_edit_meta_product_amenities_update_button.click()")
            updateMeta()
        })
    
    $(_product_edit_meta_product_keywords_update_button)
        .on("click", function () {
            //console.log("Product.product_edit_meta_product_keywords_update_button.click()")
            updateMeta()
        })
    
    $(_product_edit_details_section_publish)
        .on("click", function () {
            //console.log("Product.product_edit_details_section_publish.click()")
        })
    
    $(_product_edit_details_section_save_draft)
        .on("click", function () {
            //console.log("Product.product_edit_details_section_save_draft.click()")
        })
    
    $(_product_edit_details_name)
        .on("change", function () {
            _display_product_name.innerText = _product_edit_details_name.value
        })
    
    $(_product_edit_details_submit_button)
        .on("click", function () {
            updateProductDetails()
        })
    
    $(_product_edit_details_rating_types_id)
        .on("change", function () {
            Product.detail.rating_types_id = (!isNaN(parseInt(_product_edit_details_rating_types_id.value))) ? parseInt(_product_edit_details_rating_types_id.value) : 1
            updateDisplay()
        })
    
    $(_button_save_product)
        .on("click", function () {
            save()
        })
    
    $(_button_add_product_page_heading)
        .on("click", function () {
            setNewProductModal()
        })
    
    $(_modal_button_cancel_add_product)
        .on("click", function () {
            clearModalForm()
            Station.resetStationForm("depart_from")
            Station.resetStationForm("arrive_to")
            Station.resetStationForm("depart_from")
            Station.resetStationForm("arrive_to")
            clearValidation(_form_product_add)
            $(_modal_new_product).modal("hide")
        })
    
    $(_modal_button_submit_add_product)
        .on("click", function () {
            console.log("Product.modal_button_submit_add_product:click()")
            // ----
            
            if (validateNewProduct()) {
                confirmDialog(`Would you like to update?`, (ans) => {
                    if (ans) {
                        saveNewProduct()
                    }
                })
            }
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
    
    $(_modal_button_clear_add_product)
        .on("click", function () {
            clearModalForm()
        })
    
    $(_product_edit_meta_description_short)
        .on("change", function () {
            Product.detail.description_short = $(this).val()
            updateDisplay()
        })
    
    $(_product_edit_meta_description_long)
        .on("change", function () {
            Product.detail.description_long = $(this).val()
            updateDisplay()
        })
    
    $(_form_product_add)
        .on("change", function () {
            Product.enableNewFormDetails()
        })
    
    const setNewProductModal = function () {
        //console.log("Product.setNewProductModal()")
        // ----
        
        clearModalForm()
        
        $(_modal_new_product).modal("show")
    }
    const clearModalForm = function () {
        //console.log("Product.clearModalForm()")
        // ----
        
        if (_modal_new_product) {
            
            clearModalFormValidation()
            
            _modal_product_arrive_to_station.value = ""
            _modal_product_arrive_to_station_id.value = ""
            
            _modal_product_city.value = ""
            _modal_product_city_id.value = ""
            
            _modal_product_day_span.value = 1
            _modal_product_depart_from_station.value = ""
            _modal_product_depart_from_station.value = ""
            
            _modal_product_id.value = ""
            
            _modal_product_name.value = ""
            _modal_product_postal_code.value = ""
            _modal_product_street_1.value = ""
            _modal_product_street_2.value = ""
            
            _modal_product_arrive_to_station.value = ""
            _modal_product_depart_from_station_id.value = ""
            _modal_product_arrive_to_station_id.value = ""
            _modal_product_depart_from_station_id.value = ""
            
            _modal_product_category_id.value = ""
            _modal_product_sku.value = ""
            
            _modal_product_country_id.value = ""
            _modal_product_province_id.value = ""
            _modal_product_country_id.value = ""
            _modal_product_rating_types_id.value = ""
            _modal_product_currency_id.value = ""
            _modal_product_provider_company_id.value = ""
            _modal_product_vendor_company_id.value = ""
            _modal_product_vendor_id.value = ""
            _modal_product_pricing_strategies_types_id.value = ""
            _modal_product_provider_location_id.value = ""
            _modal_product_location_id.value = ""
            
            _modal_product_description_short.value = ""
            _modal_product_description_long.value = ""
            
            if (Product.product_keywords) {
                Product.product_keywords.clear()
            }
            
            $(_modal_product_provider_name).val("").trigger("change")
            $(_modal_product_vendor_id).val("").trigger("change")
            
            Product.depart_from_date.value("")
            Product.arrive_to_date.value("")
            
            Product.attr1 = null
            Product.attr2 = null
            Product.attr3 = null
            
            Product.updateProductSKU()
            Product.disableNewFormDetails()
            $("[data-categoryid]").hide()
        }
        
    }
    const clearModalFormValidation = function () {
        //console.log("Product.clearNewProductValidation()")
        // ----
        
        if (Product.validator) {
            let val = $(_form_product_add).validate()
            val.resetForm()
        }
        
        clearAllValidation()
        
    }
    const validateNewProduct = function () {
        console.log("Product.validateNewProduct()")
        // ----
        
        if (!_form_product_add) {
            console.log("|__ Missing _form_product_add")
            return false
        }
        let isValid = false
        let categoryId = (_modal_product_category_id && !isNaN(parseInt(_modal_product_category_id.value))) ? parseInt(_modal_product_category_id.value) : null
        
        if ($(_form_product_add).valid()) {
            isValid = true
        } else {
            let validator = $(_form_product_add).validate()
            console.log("|__ validator", validator)
            console.log("|__ isValid", isValid)
        }
        
        return isValid
    }
    const saveNewProduct = function () {
        console.log("Product.saveNewProduct()")
        // ----
        
        let dataToSend = buildInsertData()
        let product
        
        //console.log("|__ dataToSend", dataToSend)
        newProduct(dataToSend, function (data) {
            //console.log("data", data)
            if (data) {
                product = data
                if (data.length === 1) {
                    product = data[0]
                }
                
                if (product.id) {
                    let detail = set(product)
                    //console.log("|__ detail", detail)
                    _modal_product_id.value = (!isNaN(parseInt(product.id))) ? parseInt(product.id) : ""
                    
                    $index_table.insertRow(detail)
                    $index_table.loadRow(detail)
                    $index_table.jumpToRow(detail)
                    $index_table.clearSelectedRows()
                    
                    toastr["success"](`Product - ${product.id} was created, would you like to edit?`, "Product Created")
                    //window.location.replace("/products/" + product.id)
                }
            }
        })
    }
    const newProduct = function (dataToSend, callback) {
        //console.log("Product.newProduct(dataToSend)", dataToSend)
        // ----
        
        let url = "/api/v1.0/products/add"
        
        if (dataToSend) {
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleProductError("Oops: 1")
                    }
                })
            } catch (e) {
                //console.log("error", e)
                handleProductError("Oops: 1")
            }
        }
    }
    const setNewFormDetails = function (categoryId) {
        //console.log("Product.setNewFormDetails(categoryId)", categoryId)
        // ----
        
    }
    const disableNewFormDetails = function () {
        //console.log("Product.disableNewFormDetails()")
        // ----
        
        /*
        if (Product.product_keywords) {
            Product.product_keywords.readOnly(true)
        }
        _modal_product_name.disabled = true
        _modal_product_provider_name.readOnly = true
        _modal_product_vendor_name.readOnly = true
        _modal_product_provider_vendor_match.disabled = true
        _modal_product_rating_types_id.disabled = true
        _modal_product_currency_id.disabled = true
        _modal_product_pricing_strategies_types_id.disabled = true
        _modal_product_description_long.disabled = true
        _modal_product_description_short.disabled = true
        _modal_button_submit_add_product.disabled = true
        //*/
        
        /*
        _modal_product_hotel_fields.disabled = true
        _modal_product_flight_fields.disabled = true
        _modal_product_depart_from_fields.disabled = true
        _modal_product_arrive_to_fields.disabled = true
        //_modal_product_cars_fields.disabled = true
        //_modal_product_rail_fields.disabled = true
        //_modal_product_transport_fields.disabled = true
        //_modal_product_tours_fields.disabled = true
        //_modal_product_cruises_fields.disabled = true
        //*/
        
        _modal_product_sku.disabled = true
        _modal_product_id.disabled = true
        
    }
    const enableNewFormDetails = function () {
        //console.log("Product.disableNewFormDetails()")
        // ----
        disableNewFormDetails()
        
        let categoryId = (_modal_product_category_id && !isNaN(parseInt(_modal_product_category_id.value))) ? parseInt(_modal_product_category_id.value) : null
        let productName = (_modal_product_name && _modal_product_name.value !== "") ? _modal_product_name.value : null
        let providerName = (_modal_product_provider_name && _modal_product_provider_name.value !== "") ? _modal_product_provider_name.value : null
        let vendorName = (_modal_product_vendor_name && _modal_product_vendor_name.value !== "") ? _modal_product_vendor_name.value : null
        
        if (categoryId) {
            _modal_product_name.disabled = false
            
            if (productName) {
                _modal_product_provider_name.readOnly = false
                _modal_product_vendor_name.readOnly = false
                _modal_product_provider_vendor_match.disabled = false
                
                if (providerName && vendorName) {
                    
                    _modal_product_rating_types_id.disabled = false
                    _modal_product_currency_id.disabled = false
                    _modal_product_pricing_strategies_types_id.disabled = false
                    _modal_product_description_long.disabled = false
                    _modal_product_description_short.disabled = false
                    _modal_button_submit_add_product.disabled = false
                    Product.product_keywords.readOnly(false)
                    
                    if (categoryId === 1) {
                        // Hotels
                        //_modal_product_pricing_strategies_types_id.value = ""
                        //_modal_product_rating_types_id.value = ""
                        
                        _modal_product_hotel_fields.disabled = false
                        _modal_product_pricing_strategies_types_id.disabled = false
                    }
                    
                    if (categoryId === 2) {
                        // Flights
                        _modal_product_pricing_strategies_types_id.value = 2
                        //_modal_product_rating_types_id.value = ""
                        
                        _modal_product_pricing_strategies_types_id.disabled = true
                        _modal_product_rating_types_id.disabled = true
                        
                        _modal_product_flight_fields.disabled = false
                        _modal_product_depart_from_fields.disabled = false
                        _modal_product_arrive_to_fields.disabled = false
                    }
                    
                    if (categoryId === 3) {
                        // Cars
                        _modal_product_pricing_strategies_types_id.value = 3
                        //_modal_product_rating_types_id.value = ""
                        
                        _modal_product_pricing_strategies_types_id.disabled = true
                        
                        _modal_product_cars_fields.disabled = false
                    }
                    
                    if (categoryId === 4) {
                        // Rail
                        _modal_product_pricing_strategies_types_id.value = 2
                        //_modal_product_rating_types_id.value = ""
                        
                        _modal_product_rail_fields.disabled = false
                        //_modal_product_pricing_strategies_types_id.disabled = true
                    }
                    
                    if (categoryId === 5) {
                        // Transport
                        _modal_product_pricing_strategies_types_id.value = 2
                        //_modal_product_rating_types_id.value = ""
                        
                        _modal_product_transport_fields.disabled = false
                        
                    }
                    
                    if (categoryId === 6) {
                        // Tours
                        _modal_product_pricing_strategies_types_id.value = 2
                        //_modal_product_rating_types_id.value = ""
                        
                        _modal_product_tours_fields.disabled = false
                        _modal_product_pricing_strategies_types_id.disabled = false
                        
                    }
                    
                    if (categoryId === 7) {
                        // Cruises
                        _modal_product_pricing_strategies_types_id.value = 2
                        //_modal_product_rating_types_id.value = ""
                        
                        _modal_product_cruises_fields.disabled = false
                        
                    }
                    
                }
            }
        }
        
    }
    const buildInsertData = function () {
        //console.log("Category.buildInsertData()")
        // ----
        let productId = (_modal_product_id && !isNaN(parseInt(_modal_product_id.value))) ? parseInt(_modal_product_id.value) : null
        let categoryId = (!isNaN(parseInt(_modal_product_category_id.value))) ? parseInt(_modal_product_category_id.value) : null
        let productName, productSKU, currencyId, pricingStrategyTypesId, ratingTypesId, providerId, vendorId, daySpan, productDescriptionShort, productDescriptionLong
        let depart_from, arrive_to, street1, street2, postalCode, provinceId, countryId, cityId, depart_date, depart_time, arrive_date, arrive_time
        let defaultDepartureTime, defaultArrivalTime = "12:00"
        let startDate = moment(new Date()).format("YYYY-MM-DD")
        let defaultDepartureDate = moment(startDate, "YYYY-MM-DD").add(3, "months").format("YYYY-MM-DD")
        let defaultArrivalDate = moment(defaultDepartureDate, "YYYY-MM-DD").add(1, "days").format("YYYY-MM-DD")
        let dataToSend
        let location = {
            name: null,
            street_1: null,
            street_2: null,
            zipcode: null,
            country_id: null,
            province_id: null,
            city_id: null,
        }
        let keywords = Product.product_keywords.build()
        
        productDescriptionShort = (_modal_product_description_short && _modal_product_description_short.value !== "") ? _modal_product_description_short.value : null
        productDescriptionLong = (_modal_product_description_long && _modal_product_description_long.value !== "") ? _modal_product_description_long.value : null
        daySpan = (_modal_product_day_span && !isNaN(parseInt(_modal_product_day_span.value))) ? parseInt(_modal_product_day_span.value) : 1
        countryId = (_modal_product_country_id && !isNaN(parseInt(_modal_product_country_id.value))) ? parseInt(_modal_product_country_id.value) : null
        provinceId = (_modal_product_province_id && !isNaN(parseInt(_modal_product_province_id.value))) ? parseInt(_modal_product_province_id.value) : null
        cityId = (_modal_product_city_id && !isNaN(parseInt(_modal_product_city_id.value))) ? parseInt(_modal_product_city_id.value) : null
        street1 = (_modal_product_street_1 && _modal_product_street_1.value !== "") ? _modal_product_street_1.value : null
        street2 = (_modal_product_street_2 && _modal_product_street_2.value !== "") ? _modal_product_street_2.value : null
        postalCode = (_modal_product_postal_code && _modal_product_postal_code.value !== "") ? _modal_product_postal_code.value : null
        productName = (_modal_product_name && _modal_product_name.value !== "") ? _modal_product_name.value : null
        productSKU = (_modal_product_sku && _modal_product_sku.value !== "") ? _modal_product_sku.value : null
        currencyId = (_modal_product_currency_id && !isNaN(parseInt(_modal_product_currency_id.value))) ? parseInt(_modal_product_currency_id.value) : null
        providerId = (_modal_product_provider_id && !isNaN(parseInt(_modal_product_provider_id.value))) ? parseInt(_modal_product_provider_id.value) : null
        vendorId = (_modal_product_vendor_id && !isNaN(parseInt(_modal_product_vendor_id.value))) ? parseInt(_modal_product_vendor_id.value) : null
        ratingTypesId = (_modal_product_rating_types_id && !isNaN(parseInt(_modal_product_rating_types_id.value))) ? parseInt(_modal_product_rating_types_id.value) : null
        pricingStrategyTypesId = (_modal_product_pricing_strategies_types_id && !isNaN(parseInt(_modal_product_pricing_strategies_types_id.value))) ? parseInt(_modal_product_pricing_strategies_types_id.value) : null
        defaultDepartureTime = "12:00"
        defaultArrivalTime = "12:00"
        
        if (categoryId === 1) {
            depart_from = null
            arrive_to = null
            depart_date = null
            depart_time = null
            arrive_date = null
            arrive_time = null
            
            location = {
                name: productName,
                location_types_id: 2,
                street_1: street1,
                street_2: street2,
                zipcode: postalCode,
                country_id: countryId,
                province_id: provinceId,
                city_id: cityId,
            }
            
        } else if (categoryId === 2) {
            // Flights
            depart_from = (!isNaN(parseInt(_modal_product_depart_from_airport_id.value))) ? parseInt(_modal_product_depart_from_airport_id.value) : null
            arrive_to = (!isNaN(parseInt(_modal_product_arrive_to_airport_id.value))) ? parseInt(_modal_product_arrive_to_airport_id.value) : null
            depart_date = (Product.depart_from_date && Product.depart_from_date.value() !== "" && Product.depart_from_date.value() !== null) ? Product.depart_from_date.value() : defaultDepartureDate
            depart_time = (Product.depart_from_time && Product.depart_from_time.value() !== "" && Product.depart_from_time.value() !== null) ? Product.depart_from_time.value() : defaultDepartureTime
            arrive_date = (Product.arrive_to_date && Product.arrive_to_date.value() !== "" && Product.arrive_to_date.value() !== null) ? Product.arrive_to_date.value() : defaultArrivalDate
            arrive_time = (Product.arrive_to_time && Product.arrive_to_time.value() !== "" && Product.arrive_to_time.value() !== null) ? Product.arrive_to_time.value() : defaultArrivalTime
            
            location = {
                name: productName,
                location_types_id: 3,
                street_1: street1,
                street_2: street2,
                zipcode: postalCode,
                country_id: countryId,
                province_id: provinceId,
                city_id: cityId,
            }
        } else if (categoryId === 3) {
            // Cars
            depart_from = null
            arrive_to = null
            depart_date = null
            depart_time = null
            arrive_date = null
            arrive_time = null
            
            location = {
                name: productName,
                location_types_id: 18,
                street_1: street1,
                street_2: street2,
                zipcode: postalCode,
                country_id: countryId,
                province_id: provinceId,
                city_id: cityId,
            }
        } else if (categoryId === 4) {
            // Rail
            depart_from = (!isNaN(parseInt(_modal_product_depart_from_station_id.value))) ? parseInt(_modal_product_depart_from_station_id.value) : null
            arrive_to = (!isNaN(parseInt(_modal_product_arrive_to_station_id.value))) ? parseInt(_modal_product_arrive_to_station_id.value) : null
            depart_date = (Product.depart_from_date && Product.depart_from_date.value() !== "" && Product.depart_from_date.value() !== null) ? Product.depart_from_date.value() : defaultDepartureDate
            depart_time = (Product.depart_from_time && Product.depart_from_time.value() !== "" && Product.depart_from_time.value() !== null) ? Product.depart_from_time.value() : defaultDepartureTime
            arrive_date = (Product.arrive_to_date && Product.arrive_to_date.value() !== "" && Product.arrive_to_date.value() !== null) ? Product.arrive_to_date.value() : defaultArrivalDate
            arrive_time = (Product.arrive_to_time && Product.arrive_to_time.value() !== "" && Product.arrive_to_time.value() !== null) ? Product.arrive_to_time.value() : defaultArrivalTime
            
            location = {
                name: productName,
                location_types_id: 4,
                street_1: street1,
                street_2: street2,
                zipcode: postalCode,
                country_id: countryId,
                province_id: provinceId,
                city_id: cityId,
            }
            
        } else if (categoryId === 5) {
            // Transport
            depart_from = null
            arrive_to = null
            depart_date = null
            depart_time = null
            arrive_date = null
            arrive_time = null
            
            location = {
                name: productName,
                location_types_id: 7,
                street_1: street1,
                street_2: street2,
                zipcode: postalCode,
                country_id: countryId,
                province_id: provinceId,
                city_id: cityId,
            }
            
        } else if (categoryId === 6) {
            // Tours
            depart_from = null
            arrive_to = null
            depart_date = null
            depart_time = null
            arrive_date = null
            arrive_time = null
            
            location = {
                name: productName,
                location_types_id: 17,
                street_1: street1,
                street_2: street2,
                zipcode: postalCode,
                country_id: countryId,
                province_id: provinceId,
                city_id: cityId,
            }
        } else if (categoryId === 7) {
            // Cruises
            depart_from = null
            arrive_to = null
            depart_date = null
            depart_time = null
            arrive_date = null
            arrive_time = null
            
            location = {
                name: productName,
                location_types_id: 19,
                street_1: street1,
                street_2: street2,
                zipcode: postalCode,
                country_id: countryId,
                province_id: provinceId,
                city_id: cityId,
            }
        } else if (categoryId === 8) {
            // Packages
            depart_from = null
            arrive_to = null
            depart_date = null
            depart_time = null
            arrive_date = null
            arrive_time = null
            
            location = {
                name: productName,
                location_types_id: 19,
                street_1: street1,
                street_2: street2,
                zipcode: postalCode,
                country_id: countryId,
                province_id: provinceId,
                city_id: cityId,
            }
        } else {
            // Other
            depart_from = null
            arrive_to = null
        }
        
        dataToSend = {
            id: productId,
            category_id: categoryId,
            
            depart_from: depart_from,
            depart_date: depart_date,
            depart_time: depart_time,
            arrive_to: arrive_to,
            arrive_date: arrive_date,
            arrive_time: arrive_time,
            
            street_1: street1,
            street_2: street2,
            country_id: countryId,
            province_id: provinceId,
            city_id: cityId,
            postal_code: postalCode,
            
            pricing_strategy_types_id: pricingStrategyTypesId,
            status_types_id: 1,
            currency_id: currencyId,
            day_span: daySpan,
            description_short: productDescriptionShort,
            description_long: productDescriptionLong,
            keywords: keywords,
            
            rating_types_id: ratingTypesId,
            provider_id: providerId,
            vendor_id: vendorId,
            provider_vendor_match: (((!isNaN(parseInt(_modal_product_provider_company_id.value))) ? parseInt(_modal_product_provider_company_id.value) : null) === ((!isNaN(parseInt(_modal_product_vendor_company_id.value))) ? parseInt(_modal_product_vendor_company_id.value) : null)) ? 1 : 0,
            
            name: productName,
            sku: productSKU,
            use_provider_location_id: 0,
            location: location,
        }
        
        return remove_nulls(dataToSend)
    }
    const resetNewProductDetails = function () {
        //console.log("Product.resetNewProductDetails()")
        // ----
        
        clearModalFormValidation()
        
        Product.depart_from_date.value("")
        Product.arrive_to_date.value("")
        
        Station.resetStationForm("depart_from")
        Station.resetStationForm("arrive_to")
        
        Station.resetStationForm("depart_from")
        Station.resetStationForm("arrive_to")
        
        _modal_product_depart_from_time.value = ""
        _modal_product_arrive_to_time.value = ""
        _modal_product_depart_from_station.value = ""
        _modal_product_arrive_to_station.value = ""
        _modal_product_provider_id.value = ""
        _modal_product_vendor_id.value = ""
        _modal_product_provider_name.value = ""
        _modal_product_vendor_name.value = ""
        _modal_product_city.value = ""
        _modal_product_name.value = ""
        _modal_product_sku.value = ""
        _modal_product_city_id.value = ""
        _modal_product_rating_types_id.value = ""
        _modal_product_currency_id.value = ""
        _modal_product_pricing_strategies_types_id.value = ""
        
        _modal_product_name.disabled = true
        _modal_product_sku.disabled = true
        _modal_product_id.disabled = true
        _modal_product_rating_types_id.disabled = true
        _modal_product_currency_id.disabled = true
        
        //_modal_product_depart_from_fields.disabled = true
        //_modal_product_arrive_to_fields.disabled = true
        //_modal_product_hotel_fields.disabled = true
        
        clearAllValidation(_form_product_add)
    }
    
    //
    
    const buildMetaObject = function () {
        //console.log("Product.buildMetaObject()")
        // ----
        
        let id = (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null
        let keywords = $product_keywords.build()
        let amenities = $product_amenities.build()
        let description_short = (_product_edit_meta_description_short.value !== "") ? _product_edit_meta_description_short.value : null
        let description_long = (_product_edit_meta_description_long.value !== "") ? _product_edit_meta_description_long.value : null
        
        return removeNulls({
            amenities: amenities,
            keywords: keywords,
            id: id,
            description_long: description_long,
            description_short: description_short,
        })
    }
    const updateMeta = function () {
        //console.log("Product.updateMeta()")
        let productId = (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null
        //console.log("|__ productId", productId)
        let categoryId = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
        //console.log("|__ categoryId", categoryId)
        let userId = (!isNaN(parseInt(_user_id.value))) ? parseInt(_user_id.value) : null
        //console.log("|__ userId", userId)
        let dataToSend = buildMetaObject()
        //console.log("|__ dataToSend", dataToSend)
        
        confirmDialog(`Would you like to update?`, (ans) => {
            if (ans) {
                sendRequestUpdateProductMeta(dataToSend, function (data) {
                    let product
                    if (data) {
                        product = data
                        if (data[0]) {
                            product = data[0]
                        }
                        
                        let detail = set(product)
                        
                        if (_product_edit_page) {
                            updateProgress()
                        }
                        
                        handleProductError(`Product ${product.name} was updated.`, "Product", "success")
                    }
                })
            }
        })
    }
    const sendRequestUpdateProductMeta = function (dataToSend, callback) {
        //console.log("Product.sendRequestUpdateProductMeta(dataToSend, callback)", dataToSend)
        if (dataToSend) {
            let url = "/api/v1.0/products/update_meta"
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    }
                })
            } catch (e) {
                //console.log("error", e)
                return handleProductError("Error")
            }
        }
    }
    
    //
    
    const buildProductDetailRecord = function () {
        //console.log("Product.buildProductDetailRecord()")
        let sku = updateProductSKU()
        let enabled = (_product_edit_details_enabled && _product_edit_details_enabled.checked === true) ? 1 : 0
        let rating_types_id = (!isNaN(parseInt(_product_edit_details_rating_types_id.value))) ? parseInt(_product_edit_details_rating_types_id.value) : null
        let currency_id = (!isNaN(parseInt(_product_edit_details_currency_id.value))) ? parseInt(_product_edit_details_currency_id.value) : null
        let name = (_product_edit_details_name && _product_edit_details_name.value !== "") ? _product_edit_details_name.value : null
        let productId = (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null
        let categoryId = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
        let userId = (!isNaN(parseInt(_user_id.value))) ? parseInt(_user_id.value) : null
        
        return removeNulls({
            id: (productId) ? productId : null,
            rating_types_id: (rating_types_id) ? rating_types_id : null,
            currency_id: (currency_id) ? currency_id : null,
            name: (name) ? name : null,
            sku: (sku) ? sku : null,
            enabled: enabled,
        })
    }
    
    const sendRequestUpdateProductDetail = function (dataToSend, callback) {
        //console.log("Product.sendRequestUpdateProductDetail(dataToSend)", dataToSend)
        if (dataToSend) {
            let url = "/api/v1.0/products/update_detail"
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    //console.log("|__ |__ data", data)
                    if (data) {
                        return callback(data)
                    }
                })
            } catch (e) {
                //console.log("error", e)
                return handleProductError("Error")
            }
        }
    }
    
    const validateProductRecord = function () {
        //let isValid = true
        
        return true
    }
    
    const sendUpdateRequest = function (dataToSend, callback) {
        let url = "/api/v1.0/products/update"
        
        if (dataToSend) {
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        handleProductError("Oops: 1")
                    }
                })
            } catch (e) {
                //console.log("error", e)
                handleProductError("Oops: 1")
            }
        }
    }
    
    const buildProductRecord = function () {
        if (validateProductRecord()) {
            let categoryId = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
            let arrive_to, depart_from
            
            if (categoryId === 2) {
                arrive_to = (!isNaN(parseInt(_product_location_arriving_station_id.value))) ? parseInt(_product_location_arriving_station_id.value) : null
                depart_from = (!isNaN(parseInt(_product_location_departing_station_id.value))) ? parseInt(_product_location_departing_station_id.value) : null
            } else if (categoryId === 4) {
                arrive_to = (!isNaN(parseInt(_product_location_arriving_station_city_id.value))) ? parseInt(_product_location_arriving_station_city_id.value) : null
                depart_from = (!isNaN(parseInt(_product_location_departing_station_city_id.value))) ? parseInt(_product_location_departing_station_city_id.value) : null
            } else {
                arrive_to = null
                depart_from = null
            }
            
            let detail = {
                id: (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null,
                category_id: (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null,
                description_short: (_product_edit_meta_description_short && _product_edit_meta_description_short.value !== "") ? _product_edit_meta_description_short.value : null,
                description_long: (_product_edit_meta_description_long && _product_edit_meta_description_long.value !== "") ? _product_edit_meta_description_long.value : null,
                amenities: $product_amenities.build(),
                keywords: $product_keywords.build(),
                rating_types_id: (!isNaN(parseInt(_product_edit_details_rating_types_id.value))) ? parseInt(_product_edit_details_rating_types_id.value) : null,
                currency_id: (!isNaN(parseInt(_product_edit_details_currency_id.value))) ? parseInt(_product_edit_details_currency_id.value) : null,
                name: (_product_edit_details_name.value !== "") ? _product_edit_details_name.value : null,
                pricing_strategy_types_id: (!isNaN(parseInt(_pricing_strategy_types_id.value))) ? parseInt(_pricing_strategy_types_id.value) : null,
                city_id: (!isNaN(parseInt(_product_edit_location_city_id.value))) ? parseInt(_product_edit_location_city_id.value) : null,
                location_id: (_product_edit_location_id && !isNaN(parseInt(_product_edit_location_id.value))) ? parseInt(_product_edit_location_id.value) : null,
                provider_id: (!isNaN(parseInt(_provider_id.value))) ? parseInt(_provider_id.value) : null,
                vendor_id: (!isNaN(parseInt(_vendor_id.value))) ? parseInt(_vendor_id.value) : null,
                use_provider_location_id: 0,
                provider_vendor_match: 1,
                status_types_id: 2,
                enabled: (_product_edit_details_enabled.checked) ? 1 : 0,
                sku: (_product_edit_details_sku.value !== "") ? _product_edit_details_sku.value : null,
                arrive_to: arrive_to,
                depart_from: depart_from,
                
            }
            
            return removeNulls(detail)
        }
    }
    
    const save = function () {
        
        let dataToSend = buildProductRecord()
        
        if (dataToSend) {
            confirmDialog(`Would you like to update?`, (ans) => {
                if (ans) {
                    sendUpdateRequest(dataToSend, function (data) {
                        let product
                        if (data) {
                            product = data
                            if (data[0]) {
                                product = data[0]
                            }
                        }
                        
                        if (product.id) {
                            let detail = set(product)
                            let name = (detail.name) ? detail.name : null
                            toastr["success"](`Product ${name} has been updated`, "Product Updated")
                        }
                    })
                }
            })
        }
        
    }
    
    const navigate = function (product) {
        if (product && product.id) {
            window.location.replace(base_url + "/" + product.id)
        }
    }
    
    const get = function (id) {
        let data_to_send = {}
        if (id) {
            data_to_send.id = id
        }
    }
    
    const defaultDetail = function () {
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
            amenities: "",
            keywords: "",
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
    
    const set = function (product) {
        //console.log("Product.set(product)", product)
        let detail = defaultDetail()
        
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
            detail.keywords = (product.keywords) ? product.keywords : ""
            detail.amenities = (product.amenities) ? product.amenities : ""
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
    
    const loadAll = function (products) {
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
    
    const buildIndexTable = function () {
        
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
    
    const setDefaultProductDetails = function () {
        return {
            location: {},
            provider: {},
            vendor: {},
            seasons: [],
            units: [],
            variants: [],
            profiles: [],
            matrix: [],
        }
    }
    
    const handleProductError = function (msg, title, level) {
        //console.log("Product.handleProductError(msg)", msg)
        if (!title) {
            title = "Product"
        }
        
        if (!level) {
            level = "error"
        }
        
        toastr[level](`${msg}`, title)
    }
    
    const updateProgress = function () {
        //console.log("Product.updateProgress()")
        if (_product_edit_page) {
            let variants = Array.from(Variant.all.values())
            let profiles = Array.from(InventoryProfile.all.values())
            let units = Array.from(Unit.all.values())
            let seasons = Array.from(Season.all.values())
            let calendarButtons = document.querySelectorAll("button[data-target='#seasonCalendarModal']")
            
            if (variants.length === 0 || units.length === 0 || seasons.length === 0 || profiles.length === 0) {
                $(_product_edit_details_section_publish).addClass("disabled")
                if (variants.length === 0 || units.length === 0 || seasons.length === 0) {
                    calendarButtons.forEach(el => {
                        el.disabled = true
                    })
                    $("#button_view_calendar").addClass("disabled")
                    $(_panel_tab_pricing).addClass(`disabled`)
                    $(_panel_tab_inventory).addClass(`disabled`)
                } else {
                    $(_panel_tab_inventory).removeClass(`disabled`)
                }
                
                if (profiles.length === 0) {
                    $("#button_view_calendar").addClass("disabled")
                    $(_panel_tab_pricing).addClass(`disabled`)
                } else {
                
                }
                
                $(_button_save_product).addClass("disabled")
                
                $("#panel_tab_pricing")
                    .html(`
							<span id="tab_span_pricing">Pricing</span>
							<span class="badge rounded-pill badge-notification bg-danger tab-badge" style="color:#fff!important">!</span>
						`)
            
            } else {
                $("#button_view_calendar").removeClass("disabled")
                $(_panel_tab_pricing).removeClass(`disabled`)
                $(_panel_tab_inventory).removeClass(`disabled`)
                
                let pricingWorksheet = PricingWorksheet.status()
                if (pricingWorksheet === "incomplete") {
                    $(_product_edit_details_section_publish).addClass("disabled")
                    $(_button_save_product).addClass("disabled")
                    $("#panel_tab_pricing")
                        .html("<span id='tab_span_pricing'>Pricing</span> <span class='badge rounded-pill badge-notification bg-danger tab-badge' style='color:#fff!important'>!</span>")
                } else {
                    $(_product_edit_details_section_publish).removeClass("disabled")
                    $(_button_save_product).removeClass("disabled")
                    $("#panel_tab_pricing")
                        .html("<span id='tab_span_pricing'>Pricing</span>")
                }
            }
            
            updateDisplay()
        }
    }
    
    const updateDisplay = function () {
        //console.log("Product.updateDisplay()", Product.detail)
        if (_product_edit_page) {
            //LOCATION DISPLAY UPDATE
            let provider, vendor, seasons, units, variants, profiles, product_location,
                productLocationType
            let productLocationDisplay = "Product Location"
            let productLocationIcon = "fas fa-archway"
            
            if (Product.detail.location) {
                product_location = Product.detail.location
            }
            
            if (product_location) {
                productLocationType = (product_location.type) ? product_location.type : null
                productLocationDisplay = (product_location.display_medium) ? product_location.display_medium : "Product Location"
            }
            
            if (productLocationType) {
                productLocationIcon = (productLocationType.icon) ? productLocationType.icon : "fas fa-archway"
            }
            
            if (_product_location) {
                $(_product_location)
                    .empty()
                    .html(`
						<i class="${productLocationIcon} mr-2"></i> <span class="">${productLocationDisplay}</span>
					`)
            }
            
            //RATING DISPLAY UPDATE
            let rating = (!isNaN(parseInt(_product_edit_details_rating_types_id.value))) ? parseInt(_product_edit_details_rating_types_id.value) : 1
            let ratingDisplay = ""
            for (let n = 0; n < 5; n++) {
                if (n < rating) {
                    ratingDisplay += `
						<li class="list-inline-item mr-0">
                            <i class="fas fa-star"></i>
                        </li>
					`
                } else {
                    ratingDisplay += `
						<li class="list-inline-item mr-0">
                            <i class="far fa-star"></i>
                        </li>
					`
                }
            }
            
            $("ul.rating")
                .empty()
                .html(ratingDisplay)
            
            //STATUS DISPLAY UPDATE
            let statusDisplay = ""
            if (_product_edit_details_section_status) {
                let status_types_id = (!isNaN(parseInt(Product.detail.status_types_id))) ? parseInt(Product.detail.status_types_id) : null
                if (status_types_id) {
                    let status = StatusTypes.all.get(status_types_id)
                    if (status) {
                        let statusName = (status.name) ? status.name : ""
                        let statusClass = statusName.replace(/\s+/g, '-').toLowerCase()
                        
                        statusDisplay = `
							<span class="">Status</span>
							<span id="product_edit_details_section_status_text" class="badge badge-${statusClass} badge-pill badge-status">${statusName}</span>
						`
                    }
                }
            }
            
            if (_product_edit_details_section_status) {
                $(_product_edit_details_section_status)
                    .empty()
                    .html(statusDisplay)
            }
            
            //SEASON, VARIANT, UNIT COUNTS
            let seasonCount = Array.from(Season.all.values()).length
            let seasonClass = "badge badge-success badge-pill"
            if (seasonCount === 0) {
                seasonClass = "badge badge-danger badge-pill"
            }
            
            let unitCount = Array.from(Unit.all.values()).length
            let unitClass = "badge badge-success badge-pill"
            if (unitCount === 0) {
                unitClass = "badge badge-danger badge-pill"
            }
            
            let variantCount = Array.from(Variant.all.values()).length
            let variantClass = "badge badge-success badge-pill"
            if (variantCount === 0) {
                variantClass = "badge badge-danger badge-pill"
            }
            
            let inventoryProfileCount = Array.from(InventoryProfile.all.values()).length
            let inventoryProfileClass = "badge badge-success badge-pill"
            if (inventoryProfileCount === 0) {
                inventoryProfileClass = "badge badge-danger badge-pill"
            }
            
            _product_edit_details_section_seasons.classList = seasonClass
            _product_edit_details_section_seasons.innerText = seasonCount
            
            _product_edit_details_section_units.classList = unitClass
            _product_edit_details_section_units.innerText = unitCount
            
            _product_edit_details_section_variants.classList = variantClass
            _product_edit_details_section_variants.innerText = variantCount
            
            _product_edit_details_section_profiles.classList = inventoryProfileClass
            _product_edit_details_section_profiles.innerText = inventoryProfileCount
            
            $(_product_description_short).empty().html(Product.detail.description_short)
            $(_product_description_long).empty().html(Product.detail.description_long)
            
            updateProductSKU()
        }
    }
    
    const updateProductSKU = function () {
        //console.log("Product.updateProductSKU()")
        // ----
        
        let att1 = Product.attr1
        let att2 = Product.attr2
        let att3 = Product.attr3
        let sku = ""
        
        if (!is_null(att1) && !is_null(att2) && !is_null(att3)) {
            sku = att1.replace(/-/g, "") + "-" + att2.replace(/-/g, "") + "-" + att3.replace(/-/g, "")
            
            if (_modal_product_sku) {
                _modal_product_sku.value = sku
            }
            
            if (_product_edit_details_sku) {
                _product_edit_details_sku.value = sku
            }
            
        } else {
            if (_modal_product_sku) {
                _modal_product_sku.value = ""
            }
            
            if (is_null(att1)) {
                //console.log("att1 is null", att1)
                return
            }
            
            if (is_null(att2)) {
                //console.log("att2 is null", att2)
                return
            }
            
            if (is_null(att3)) {
                //console.log("att3 is null", att3)
                return
            }
        }
        
        return sku
    }
    
    const updateProductDetails = function () {
        //console.log("Product.updateProductDetails()")
        let productId = (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null
        let categoryId = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
        let userId = (!isNaN(parseInt(_user_id.value))) ? parseInt(_user_id.value) : null
        let dataToSend = buildProductDetailRecord()
        //console.log("dataToSend", dataToSend)
        
        confirmDialog(`Would you like to update?`, (ans) => {
            if (ans) {
                sendRequestUpdateProductDetail(dataToSend, function (data) {
                    let product
                    if (data) {
                        product = data
                        if (data[0]) {
                            product = data[0]
                        }
                        //console.log("|__ |__ product", product)
                        let detail = set(product)
                        if (_product_edit_page) {
                            updateProgress()
                        }
                        handleProductError(`Product ${product.name} was updated.`, "Product", "success")
                    }
                })
            }
        })
    }
    
    const setEditFormValues = function (product) {
        //console.log("Product.setEditFormValues(product)", product)
        // ----
        
        let detail = set(product)
        let category
        let id = (!isNaN(parseInt(product.id))) ? parseInt(product.id) : null
        let sku = (product.sku) ? product.sku : ""
        let name = (product.name) ? product.name : ""
        let day_span = (product.day_span) ? product.day_span : 1
        let ratings_type_id = (product.rating_types_id) ? product.rating_types_id : ""
        let enabled = (product.enabled && product.enabled === 1)
        let currency_types_id = (product.currency_id) ? product.currency_id : ""
        let description_long = (product.description_long) ? product.description_long : ""
        let description_short = (product.description_short) ? product.description_short : ""
        let product_keywords = (product.keywords) ? product.keywords : []
        let product_amenities = (product.amenities) ? product.amenities : []
        let images = (product.images) ? product.images : []
        
        if (detail.category) {
            category = detail.category
        }
        
        Product.fileManager = $("#product_images").fileManager({
            height: 400,
            source: "product",
            sourceId: id,
            images: images,
        })
        
        $product_keywords = $(_product_keywords).BuildKeyword(product_keywords)
        $product_amenities = $(_product_amenities).BuildKeyword(product_amenities)
        
        _product_edit_details_name.value = name
        _product_edit_details_sku.value = sku
        _product_edit_details_enabled.checked = enabled
        _product_edit_meta_description_short.value = description_short
        _product_edit_meta_description_long.value = description_long
        _product_edit_details_currency_id.value = currency_types_id
        _product_edit_details_rating_types_id.value = ratings_type_id
        
        Product.attr1 = (category.attribute_id) ? category.attribute_id : null
    }
    
    const initEditForm = function (settings) {
        let product = setDefaultProductDetails()
        
        if (settings) {
            product = settings
        }
        
        Array.prototype.forEach.call(radios, function (radio) {
            //radio.addEventListener("change", changeHandler)
        })
        
        setEditFormValues(product)
    }
    
    const index = function (settings) {
        //console.log("Product.index(settings)", settings)
        // ----
        
        let categories, products, stations, airports
        
        if (_product_index_table) {
            buildIndexTable()
        }
        
        if (settings) {
            products = (settings.products) ? settings.products : []
            stations = (settings.stations) ? settings.stations : []
            airports = (settings.airports) ? settings.airports : []
            categories = (settings.category) ? settings.category : []
            /*
            console.log("|__ settings", settings)
            console.log("|__ products", products)
            console.log("|__ stations", stations)
            console.log("|__ airports", airports)
            console.log("|__ products", categories)
            //*/
        }
        
        loadAll(products)
        
        if (_modal_new_product) {
            validator_init(addProductRules)
            Product.validator = $(_form_product_add).validate()
            
            Product.attr1 = null
            Product.attr2 = null
            Product.attr3 = null
            
            $(document).ready(function () {
                Category.initProductModal(categories)
                Provider.init()
                Airport.init({ airports: airports })
                Station.init({ stations: stations })
                
                if (_modal_product_keywords) {
                    Product.product_keywords = $(_modal_product_keywords).BuildKeyword([])
                }
                
                if (_modal_product_depart_from_date) {
                    Product.depart_from_date = $(_modal_product_depart_from_date).dateSelect({
                        onStart: function () {},
                    })
                }
                
                if (_modal_product_depart_from_time) {
                    Product.depart_from_time = $(_modal_product_depart_from_time).timeSelect({
                        onStart: function () {},
                    })
                }
                
                if (_modal_product_arrive_to_date) {
                    Product.arrive_to_date = $(_modal_product_arrive_to_date).dateSelect({
                        onStart: function () {},
                    })
                }
                
                if (_modal_product_arrive_to_time) {
                    Product.arrive_to_time = $(_modal_product_arrive_to_time).timeSelect({
                        onStart: function () {},
                    })
                }
                
                if (_modal_product_arrive_to_station_date) {
                    Product.depart_from_station_date = $(_modal_product_arrive_to_station_date).dateSelect({
                        onStart: function () {},
                    })
                }
                
                if (_modal_product_depart_from_station_date) {
                    Product.depart_from_station_date = $(_modal_product_depart_from_station_date).dateSelect({
                        onStart: function () {},
                    })
                }
                
                if (_modal_product_arrive_to_station_time) {
                    Product.arrive_to_station_time = $(_modal_product_arrive_to_station_time).timeSelect({
                        onStart: function () {},
                    })
                }
                
                if (_modal_product_depart_from_station_time) {
                    Product.depart_from_station_time = $(_modal_product_depart_from_station_time).timeSelect({
                        onStart: function () {},
                    })
                }
                
                disableNewFormDetails()
            })
        }
        
    }
    
    const init = function (settings) {
        //console.log("Product.init(settings)", settings)
        // ----
        
        let product_details, variants, seasons, units, profiles, provider, vendor,
            matrices, pricings, product_location, arriving_location, departing_location,
            images
        
        if (_product_edit_page) {
            $(document).ready(function () {
                userId = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
                categoryId = (document.getElementById("category_id")) ? (!isNaN(parseInt(document.getElementById("category_id").value))) ? parseInt(document.getElementById("category_id").value) : null : null
                productId = (document.getElementById("product_id")) ? (!isNaN(parseInt(document.getElementById("product_id").value))) ? parseInt(document.getElementById("product_id").value) : null : null
                
                if (settings) {
                    if (settings.product_details) {
                        product_details = settings.product_details
                        
                        if (product_details.images) {
                            images = product_details.images
                        }
                        
                        if (product_details.provider) {
                            provider = product_details.provider
                        }
                        
                        if (product_details.vendor) {
                            vendor = product_details.vendor
                        }
                        
                        if (product_details.variants) {
                            variants = product_details.variants
                        }
                        
                        if (product_details.seasons) {
                            seasons = product_details.seasons
                        }
                        
                        if (product_details.matrices) {
                            matrices = product_details.matrices
                        }
                        
                        if (product_details.profiles) {
                            profiles = product_details.profiles
                        }
                        
                        if (product_details.units) {
                            units = product_details.units
                        }
                        
                        if (product_details.pricings) {
                            pricings = product_details.pricings
                        }
                        
                        if (product_details.location) {
                            product_location = product_details.location
                        }
                        
                        if (product_details.arriving_location) {
                            arriving_location = product_details.arriving_location
                        }
                        
                        if (product_details.departing_location) {
                            departing_location = product_details.departing_location
                        }
                        
                        let pricing_strategy = {
                            pricing_strategy_types_id: (!isNaN(parseInt(product_details.pricing_strategy_types_id))) ? parseInt(product_details.pricing_strategy_types_id) : null,
                        }
                        
                        Provider.init({
                            provider_detail: provider,
                        })
                        
                        Vendor.init({
                            vendor_detail: vendor,
                        })
                        
                        Variant.init(variants)
                        
                        Season.init(seasons)
                        
                        Season.loadAll(seasons)
                        
                        Unit.init({ units: units })
                        
                        Matrix.init({ matrices: matrices })
                        
                        Pricing.init({ pricings: pricings })
                        
                        InventoryProfile.init({
                            profiles: profiles,
                        })
                        
                        PricingWorksheet.init({
                            pricing_strategy: pricing_strategy,
                            pricings: pricings,
                        })
                        
                        Product.calendar = $("#calendar").YearCalendar({
                            displayEventTime: false,
                            calendarType: "season",
                            events: [],
                        })
                        
                        switch (categoryId) {
                            case 1:
                                ProductLocation.init({
                                    product_location: product_location,
                                    product: product_details,
                                })
                                break
                            case 2:
                                ProductLocation.init({
                                    product_location: product_location,
                                    departing_location: departing_location,
                                    arriving_location: arriving_location,
                                    product: product_details,
                                })
                                break
                            case 3:
                                ProductLocation.init({
                                    product_location: product_location,
                                    product: product_details,
                                })
                                break
                            case 4:
                                ProductLocation.init({
                                    product_location: product_location,
                                    departing_location: departing_location,
                                    arriving_location: arriving_location,
                                    product: product_details,
                                })
                                break
                            case 5:
                                ProductLocation.init({
                                    product_location: product_location,
                                    product: product_details,
                                })
                                break
                            case 6:
                                ProductLocation.init({
                                    product_location: product_location,
                                    product: product_details,
                                })
                                
                                Tour.init({
                                    route: [],
                                    
                                })
                                
                                break
                            case 7:
                                ProductLocation.init({
                                    product_location: product_location,
                                    product: product_details,
                                })
                                break
                            case 8:
                                ProductLocation.init({
                                    product_location: product_location,
                                    product: product_details,
                                })
                                break
                            case 9:
                                ProductLocation.init({
                                    product_location: product_location,
                                    product: product_details,
                                })
                                break
                        }
                        
                        $(_product_panel_link_overview)
                            .on("click", function () {
                                $(_panel_tab_product_o).tab("show")
                            })
                        $(_product_panel_link_location)
                            .on("click", function () {
                                $(_panel_tab_location).tab("show")
                            })
                        $(_product_panel_link_product)
                            .on("click", function () {
                                $(_panel_tab_product).tab("show")
                            })
                        $(_product_panel_link_season)
                            .on("click", function () {
                                $(_panel_tab_season).tab("show")
                            })
                        $(_product_panel_link_unit)
                            .on("click", function () {
                                $(_panel_tab_unit).tab("show")
                            })
                        $(_product_panel_link_variant)
                            .on("click", function () {
                                $(_panel_tab_variant).tab("show")
                            })
                        $(_product_panel_link_inventory)
                            .on("click", function () {
                                $(_panel_tab_inventory).tab("show")
                            })
                        $(_product_panel_link_pricing)
                            .on("click", function () {
                                $(_panel_tab_pricing).tab("show")
                            })
                        $(_product_panel_link_meta)
                            .on("click", function () {
                                $(_panel_tab_meta).tab("show")
                            })
                        
                        initAutoComplete()
                        initEditForm(product_details)
                        updateProgress()
                    }
                }
            })
        }
        
        if (_product_index_page) {
            Product.index(settings)
        }
    }
    
    const initAutoComplete = function (categoryId) {
        //console.log("Product.initAutoComplete()")
        // ----
        
        let category_id = (categoryId && (!isNaN(parseInt(categoryId)))) ? parseInt(categoryId) : (!isNaN(parseInt(_modal_product_category_id.value))) ? parseInt(_modal_product_category_id.value) : null
        
        if (category_id !== null) {
            $(_modal_product_name)
                .on("change", function () {
                    /*
                    setTimeout(function () {
                        let product_name = _modal_product_name.value
                        
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
                .on("click", function (e) {
                    if ($(this).attr("readonly") === "readonly") {
                        e.preventDefault()
                    } else {
                        $(this).select()
                    }
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
                        let product = suggestion.data
                        
                    },
                })
        }
        
    }
    
    return {
        validator: null,
        depart_from_date: null,
        depart_from_time: null,
        calendars: null,
        product_keywords: null,
        product_initial_location: null,
        provider_initial_location: null,
        arrive_to_station_time: null,
        depart_from_station_time: null,
        arrive_to_station_date: null,
        depart_from_station_date: null,
        detail: {},
        all: new Map(),
        attr1: null,
        attr2: null,
        attr3: null,
        newProduct_validator: null,
        enableNewFormDetails: function () {
            enableNewFormDetails()
        },
        disableNewFormDetails: function () {
            disableNewFormDetails()
        },
        updateDisplay: function () {
            updateDisplay()
        },
        updateProgress: function () {
            updateProgress()
            $("html").css({ overflow: "auto" })
        },
        updateProductSKU: function () {
            updateProductSKU()
        },
        setNewFormDetails: function (category_id) {
            setNewFormDetails(category_id)
        },
        get: function (params) {
            get(params)
        },
        loadAll: function (params) {
            loadAll(params)
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
        clearModalForm: function () {
            clearModalForm()
        },
        resetNewProductDetails: function () {
            resetNewProductDetails()
        },
        initAutoComplete: function () {
            initAutoComplete()
        },
    }
    
})()
