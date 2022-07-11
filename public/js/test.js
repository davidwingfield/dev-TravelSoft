const Package = (function () {
	"use strict"
	
	const userId = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
	const baseURL = "/packages"
	const _package_id = document.getElementById("package_id")
	const _package_name = document.getElementById("package_name")
	const _package_day_span = document.getElementById("package_day_span")
	const _package_city_id = document.getElementById("package_city_id")
	const _package_min_pax = document.getElementById("package_min_pax")
	const _package_max_pax = document.getElementById("package_max_pax")
	const _package_description_long = document.getElementById("package_description_long")
	const _package_description_short = document.getElementById("package_description_short")
	const _package_available_start_input = document.getElementById("package_available_start_input")
	const _package_available_start_button = document.getElementById("package_available_start_button")
	const _package_available_end_input = document.getElementById("package_available_end_input")
	const _package_available_end_button = document.getElementById("package_available_end_button")
	const _package_cost = document.getElementById("package_cost")
	const _package_price = document.getElementById("package_price")
	const _package_margin = document.getElementById("package_margin")
	const _package_enabled = document.getElementById("package_enabled")
	const _package_note = document.getElementById("package_note")
	const _package_add_modal_form = document.getElementById("package_add_modal_form")
	const _package_add_modal = document.getElementById("package_add_modal")
	const _package_day_span_inc = document.getElementById("package_day_span_inc")
	const _package_day_span_dec = document.getElementById("package_day_span_dec")
	const _package_min_pax_inc = document.getElementById("package_min_pax_inc")
	const _package_min_pax_dec = document.getElementById("package_min_pax_dec")
	const _package_max_pax_inc = document.getElementById("package_max_pax_inc")
	const _package_max_pax_dec = document.getElementById("package_max_pax_dec")
	const _package_city_name_filter = document.getElementById("package_city_name_filter")
	const _package_name_filter = document.getElementById("package_name_filter")
	const _package_add_modal_form_cancel = document.getElementById("package_add_modal_form_cancel")
	const _package_add_modal_form_clear = document.getElementById("package_add_modal_form_clear")
	const _package_add_modal_form_save = document.getElementById("package_add_modal_form_save")
	const _package_cost_icon = document.getElementById("package_cost_icon")
	const _package_margin_icon = document.getElementById("package_margin_icon")
	const _package_price_icon = document.getElementById("package_price_icon")
	const _button_add_package_page_heading = document.getElementById("button_add_package_page_heading")
	const _package_index_table = document.getElementById("package_index_table")
	const _package_index_table_country_filter = document.getElementById("package_index_table_country_filter")
	const _package_index_table_province_filter = document.getElementById("package_index_table_province_filter")
	const _package_index_table_city_filter = document.getElementById("package_index_table_city_filter")
	const _package_edit = document.getElementById("package_edit")
	const _package_edit_form = document.getElementById("package_edit_form")
	const _package_edit_products_add_button = document.getElementById("package_edit_products_add_button")
	const _package_edit_products = document.getElementById("package_edit_products")
	const _add_package_product_form = document.getElementById("add_package_product_form")
	const _add_package_product_form_category_id = document.getElementById("add_package_product_form_category_id")
	const _add_package_product_form_city_filter = document.getElementById("add_package_product_form_city_filter")
	const _add_package_product_form_close_button = document.getElementById("add_package_product_form_close_button")
	const _add_package_product_form_cancel_button = document.getElementById("add_package_product_form_cancel_button")
	const _add_package_product_form_search_button = document.getElementById("add_package_product_form_search_button")
	const _add_package_product_form_clear_button = document.getElementById("add_package_product_form_clear_button")
	const _add_package_product_form_product_filter = document.getElementById("add_package_product_form_product_filter")
	const _add_package_product_form_country_id = document.getElementById("add_package_product_form_country_id")
	const _add_package_product_form_province_id = document.getElementById("add_package_product_form_province_id")
	const _add_package_product_form_city_id = document.getElementById("add_package_product_form_city_id")
	const _add_package_product_form_product_id = document.getElementById("add_package_product_form_product_id")
	const _package_product_search_results = document.getElementById("package_product_search_results")
	const _package_product_search_results_close_button = document.getElementById("package_product_search_results_close_button")
	const _product_search_results_clear_button = document.getElementById("product_search_results_clear_button")
	const _product_search_results_reset_button = document.getElementById("product_search_results_reset_button")
	const _product_search_results_list = document.getElementById("product_search_results_list")
	const _package_product_edit_form = document.getElementById("package_product_edit_form")
	const _package_product_edit_form_close_button = document.getElementById("package_product_edit_form_close_button")
	const _package_product_edit_form_product_label = document.getElementById("package_product_edit_form_product_label")
	const _package_product_edit_form_product_name = document.getElementById("package_product_edit_form_product_name")
	const _package_product_edit_form_unit_label = document.getElementById("package_product_edit_form_unit_label")
	const _package_product_edit_form_unit_name = document.getElementById("package_product_edit_form_unit_name")
	const _package_product_edit_form_day_span = document.getElementById("package_product_edit_form_day_span")
	const _package_product_edit_form_allow_substitution = document.getElementById("package_product_edit_form_allow_substitution")
	const _package_product_edit_form_update_button = document.getElementById("package_product_edit_form_update_button")
	const _package_product_edit_form_remove_button = document.getElementById("package_product_edit_form_remove_button")
	const _package_product_edit_form_cancel_button = document.getElementById("package_product_edit_form_cancel_button")
	const _package_product_edit_form_product_id = document.getElementById("package_product_edit_form_product_id")
	const _package_product_edit_form_unit_id = document.getElementById("package_product_edit_form_unit_id")
	const _package_index_table_available_start_filter = document.getElementById("package_index_table_available_start_filter")
	const _package_index_table_available_end_filter = document.getElementById("package_index_table_available_end_filter")
	const _package_agenda = document.getElementById("package_agenda")
	const _package_edit_form_submit = document.getElementById("package_edit_form_submit")
	const _package_product_list_add = document.getElementById("package_product_list_add")
	
	const _agenda_event_modal_date = document.getElementById("agenda_event_modal_date")
	const _agenda_event_modal_time = document.getElementById("agenda_event_modal_time")
	const _agenda_event_modal = document.getElementById("agenda_event_modal")
	const _agenda_event_modal_event_id = document.getElementById("agenda_event_modal_event_id")
	const _agenda_event_modal_package_id = document.getElementById("agenda_event_modal_package_id")
	const _agenda_event_modal_product_id = document.getElementById("agenda_event_modal_product_id")
	const _agenda_event_modal_unit_id = document.getElementById("agenda_event_modal_unit_id")
	const _agenda_event_modal_title = document.getElementById("agenda_event_modal_title")
	const _agenda_event_modal_cancel_button = document.getElementById("agenda_event_modal_cancel_button")
	const _agenda_event_modal_save_button = document.getElementById("agenda_event_modal_save_button")
	const _agenda_event_modal_remove_button = document.getElementById("agenda_event_modal_remove_button")
	const _agenda_event_modal_header_close_button = document.getElementById("agenda_event_modal_header_close_button")
	
	// ----
	let globalSelectCityProductSearch = false
	let globalSelectCity = false
	let globalSelectPackage = false
	let globalSelectPackageProductSearch = false
	let startDate = null
	let endDate = null
	let $packageIndexTable
	let searchOptions = {
		valueNames: ["name", "ratingid", "ratingtext", "unitname", { data: ["id"] }, { data: ["unitid"] }],
		item: `
                <li class="list-group-item p-1" data-id="" data-unitid="">
    
                    <div class="row mx-1">
                    
                        <div class="col-2 d-flex align-items-center justify-content-start p-1">
                        
                        </div>
                        
                        <div class="col-8 p-1">
                            <p class="font-weight-bold no-wrap text-truncate text-left mb-1 name"></p>
                            <p class="font-weight-normal text-muted no-wrap text-truncate text-left mb-0 unitname"></p>
                            <span class="ratingid d-none"></span>
                            <ul class="rating m-0 text-left ratingtext"></ul>
                        </div>
                        
                        <div class="col-2 d-flex align-items-center justify-content-end p-1">
                            <button type="button" class="btn btn-search-select waves-effect waves-light" onclick="Package.add(this);">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        
                    </div>
        
                </li>`,
		page: 5,
		pagination: true,
	}
	let packageRules = {
		groups: {
			packageGroup: "package_name_filter package_name",
			packageCityGroup: "package_city_name_filter package_city_id",
			
		},
		rules: {
			package_name: {
				required: true,
			},
			package_name_filter: {
				required: true,
			},
			package_city_id: {
				required: true,
			},
			package_city_name_filter: {
				required: true,
			},
			package_available_start_input: {
				required: true,
			},
			package_available_end_input: {
				required: true,
			},
			package_available_start_button: {
				required: true,
			},
			package_available_end_button: {
				required: true,
			},
		},
		messages: {
			package_name: {
				required: "Field Required",
			},
			package_name_filter: {
				required: "Field Required",
			},
			package_city_id: {
				required: "Field Required",
			},
			package_city_name_filter: {
				required: "Field Required",
			},
			package_available_start_input: {
				required: "Field Required",
			},
			package_available_end_input: {
				required: "Field Required",
			},
			package_available_start_button: {
				required: "Field Required",
			},
			package_available_end_button: {
				required: "Field Required",
			},
		},
	}
	
	const handleDateFieldKeyDown = function (input, keyCode) {
		console.groupCollapsed("Package.handleDateFieldKeyDown")
		// ----
		
		if (!isNaN(parseInt(keyCode))) {
			keyCode = parseInt(keyCode)
		}
		
		if (keyCode === 16) {
			//isShift = true
		}
		
		if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || (keyCode === 8) || (keyCode === 46)) {
			
			if (keyCode !== 16) {
				if ((input.value.length === 4 || input.value.length === 7) && keyCode !== 8) {
					input.value += separatorDate
				}
				console.groupEnd()
				return true
			}
			
		}
		
		// ----
		console.groupEnd()
		return false
	}
	
	const handleDateFieldKeyUp = function (input, keyCode) {
		console.groupCollapsed("Package.handleDateFieldKeyDown")
		// ----
		
		// ----
		console.groupEnd()
	}
	
	const initIndexTableFilters = function () {
		console.groupCollapsed("Package.initIndexTableFilters")
		// ----
		
		$(_package_index_table_available_start_filter)
			.on("keydown", function (event) {
				console.groupCollapsed("Package.package_index_table_available_start_filter:keydown()")
				// ----
				
				// ----
				console.groupEnd()
				return handleDateFieldKeyDown(this, event.keyCode)
			})
			.on("keyup", function () {
				console.groupCollapsed("Package.package_index_table_available_start_filter:keyup()")
				// ----
				
				let table = $(_package_index_table).dataTable()
				let dateString = this.value
				let $errorElement = $(this).parents("div.form-element").find("div.error")
				if ($errorElement.length) {
					
					if (regex.test(dateString) || dateString.length === 0) {
						$errorElement.html("&nbsp;").hide()
						table.api().columns(5).search(dateString).draw()
					} else {
						table.api().columns(5).search()
						$errorElement.html("Invalid Date (YYYY-MM-DD)").show()
						
					}
					
				}
				
				/*
                table.api()
                    .columns(5)
                    .search("2022-01-01")
                    .draw()
                //*/
				
				// ----
				console.groupEnd()
			})
			.on("search", function () {
				console.groupCollapsed("Package.package_index_table_available_start_filter:search()")
				// ----
				
				$(_package_index_table_available_start_filter)
					.val("")
					.trigger("keyup")
				
				// ----
				console.groupEnd()
			})
		
		$(_package_index_table_available_end_filter)
			.on("keydown", function (event) {
				console.groupCollapsed("Package.package_index_table_available_end_filter:keydown()")
				// ----
				
				// ----
				console.groupEnd()
				return handleDateFieldKeyDown(this, event.keyCode)
			})
			.on("keyup", function () {
				console.groupCollapsed("Package.package_index_table_available_end_filter:keyup()")
				// ----
				
				let table = $(_package_index_table).dataTable()
				let dateString = this.value
				let $errorElement = $(this).parents("div.form-element").find("div.error")
				if ($errorElement.length) {
					
					if (regex.test(dateString) || dateString.length === 0) {
						$errorElement.html("&nbsp;").hide()
						table.api().columns(6).search(dateString).draw()
					} else {
						$errorElement.html("Invalid Date (YYYY-MM-DD)").show()
						table.api().columns(6).search().draw()
					}
					
				}
				
				// ----
				console.groupEnd()
			})
			.on("search", function () {
				console.groupCollapsed("Package.package_index_table_available_end_filter:search()")
				// ----
				
				$(_package_index_table_available_end_filter)
					.val("")
					.trigger("keyup")
				
				// ----
				console.groupEnd()
			})
		
		// ----
		console.groupEnd()
	}
	
	$("#demoButton")
		.on("click", function () {
			showEditEventModal()
		})
	
	$(_agenda_event_modal_cancel_button)
		.on("click", function () {
			hideEditEventModal()
		})
	
	$(_agenda_event_modal_header_close_button)
		.on("click", function () {
			hideEditEventModal()
		})
	
	const showEditEventModal = function () {
		if (_agenda_event_modal) {
			$(_agenda_event_modal).modal("show")
		}
	}
	
	const loadEditEvent = function (event) {
		console.groupCollapsed("Package.loadEditEvent")
		// ----
		
		populateEditEventModal(event)
		
		// ----
		console.groupEnd()
	}
	
	const hideEditEventModal = function () {
		if (_agenda_event_modal) {
			$(_agenda_event_modal).modal("hide")
		}
	}
	
	const initEditEventModal = function () {
		console.groupCollapsed("Package.initEditEventModal")
		// ----
		
		// ----
		console.groupEnd()
	}
	
	const clearEditEventModal = function () {
		console.groupCollapsed("Package.clearEditEventModal")
		// ----
		
		_agenda_event_modal_event_id.value = ""
		_agenda_event_modal_package_id.value = ""
		_agenda_event_modal_product_id.value = ""
		_agenda_event_modal_unit_id.value = ""
		_agenda_event_modal_title.value = ""
		_agenda_event_modal_date.value = ""
		_agenda_event_modal_time.value = ""
		// ----
		console.groupEnd()
	}
	
	const populateEditEventModal = function (event) {
		console.groupCollapsed("Package.populateEditEventModal")
		// ----
		
		clearEditEventModal()
		let allDay = (event.allDay === true) ? event.allDay : false
		let eventTime = ""
		let eventDate = (event.start) ? moment(event.start).dayOfYear() : null
		
		if (allDay === false) {
			eventTime = (event.start) ? moment(event.start).format("hh:mm") : null
		}
		
		console.log("event", event)
		_agenda_event_modal_event_id.value = (event && event._id) ? event._id : ""
		_agenda_event_modal_package_id.value = (Package.id) ? Package.id : ""
		_agenda_event_modal_product_id.value = (event && event.product_id) ? event.product_id : ""
		_agenda_event_modal_unit_id.value = (event && event.unit_id) ? event.unit_id : ""
		_agenda_event_modal_title.value = (event && event.title) ? event.title : ""
		_agenda_event_modal_date.value = eventDate
		_agenda_event_modal_time.value = eventTime
		
		showEditEventModal()
		
		// ----
		console.groupEnd()
	}
	
	$(_agenda_event_modal_remove_button)
		.on("click", function () {
			let eventId = _agenda_event_modal_event_id.value
			removePackageAgendaEvent(eventId)
		})
	
	$(_package_index_table_country_filter)
		.on("change", function () {
			console.groupCollapsed("Package.package_index_table_country_filter:change()")
			// ----
			
			handleCountryChange((this && !isNaN(parseInt(this.value))) ? parseInt(this.value) : null)
			
			// ----
			console.groupEnd()
		})
	
	$(_package_index_table_province_filter)
		.on("change", function () {
			console.groupCollapsed("Package.package_index_table_province_filter:change()")
			// ----
			
			handleProvinceChange((this && !isNaN(parseInt(this.value))) ? parseInt(this.value) : null)
			
			// ----
			console.groupEnd()
		})
	
	$(_package_index_table_city_filter)
		.on("change", function () {
			console.groupCollapsed("Package.package_index_table_city_filter:change()")
			// ----
			
			handleCityChange(((this && !isNaN(parseInt(this.value))) ? parseInt(this.value) : null))
			
			// ----
			console.groupEnd()
		})
	
	$(_product_search_results_clear_button)
		.on("click", function () {
			console.groupCollapsed("Package.product_search_results_clear_button:click()")
			// ----
			
			clearSearchResultsContainer()
			
			// ----
			console.groupEnd()
		})
	
	$(_package_edit_form_submit)
		.on("click", function () {
			console.groupCollapsed("Package.package_edit_form_submit:click()")
			// ----
			
			update()
			
			// ----
			console.groupEnd()
		})
	
	$(_product_search_results_reset_button)
		.on("click", function () {
			console.groupCollapsed("Package.product_search_results_reset_button:click()")
			// ----
			
			populateSearchResultsContainer(testProductList)
			
			// ----
			console.groupEnd()
		})
	
	$(_package_product_search_results_close_button)
		.on("click", function () {
			console.groupCollapsed("Package.package_product_search_results_close_button:click()")
			// ----
			
			hideSearchResultsContainer()
			
			// ----
			console.groupEnd()
		})
	
	$(_package_edit_products_add_button)
		.on("click", function () {
			console.groupCollapsed("Package.package_edit_products_add_button:click()")
			// ----
			
			clearAddProductForm()
			disableAddProductForm()
			showAddProductForm()
			
			// ----
			console.groupEnd()
		})
	
	$(_package_product_list_add)
		.on("click", function () {
			console.groupCollapsed("Package.package_edit_products_add_button:click()")
			// ----
			
			clearAddProductForm()
			disableAddProductForm()
			showAddProductForm()
			
			// ----
			console.groupEnd()
		})
	
	$(_add_package_product_form_category_id)
		.on("change", function () {
			console.groupCollapsed("Package.add_package_product_form_category_id")
			// ----
			
			handleAddProductFormCategoryChange()
			
			// ----
			console.groupEnd()
		})
	
	$(_add_package_product_form_close_button)
		.on("click", function () {
			console.groupCollapsed("Package.add_package_product_form_close_button:click()")
			// ----
			
			clearAddProductForm()
			disableAddProductForm()
			hideAddProductForm()
			populateSearchResultsContainer()
			hideSearchResultsContainer()
			
			// ----
			console.groupEnd()
		})
	
	$(_add_package_product_form_clear_button)
		.on("click", function () {
			console.groupCollapsed("Package.add_package_product_form_clear_button:click()")
			// ----
			
			clearAddProductForm()
			disableAddProductForm()
			populateSearchResultsContainer()
			hideSearchResultsContainer()
			
			// ----
			console.groupEnd()
		})
	
	$(_add_package_product_form_cancel_button)
		.on("click", function () {
			console.groupCollapsed("Package.add_package_product_form_cancel_button:click()")
			// ----
			
			clearAddProductForm()
			disableAddProductForm()
			hideAddProductForm()
			populateSearchResultsContainer()
			hideSearchResultsContainer()
			
			// ----
			console.groupEnd()
		})
	
	$(_add_package_product_form_search_button)
		.on("click", function () {
			console.groupCollapsed("Package.add_package_product_form_search_button:click()")
			// ----
			
			search()
			
			// ----
			console.groupEnd()
		})
	
	$(_package_add_modal_form_cancel)
		.on("click", function () {
			console.groupCollapsed("Package.package_add_modal_form_cancel:click()")
			// ----
			
			resetForm()
			
			// ----
			console.groupEnd()
		})
	
	$(_package_add_modal_form_clear)
		.on("click", function () {
			console.groupCollapsed("Package.package_add_modal_form_clear:click()")
			// ----
			
			clearForm()
			
			// ----
			console.groupEnd()
		})
	
	$(_package_add_modal_form_save)
		.on("click", function () {
			console.groupCollapsed("Package.package_add_modal_form_save:click()")
			// ----
			
			save()
			
			// ----
			console.groupEnd()
		})
	
	$(_add_package_product_form_city_filter)
		.on("click", function (e) {
			console.groupCollapsed("Package.add_package_product_form_city_filter:click()")
			// ----
			
			if ($(this).attr("readonly") === "readonly") {
				e.preventDefault()
			} else {
				$(this).select()
			}
			
			// ----
			console.groupEnd()
		})
		.on("keyup", function () {
			console.groupCollapsed("Package.add_package_product_form_city_filter:keyup()")
			// ----
			
			globalSelectCityProductSearch = false
			
			// ----
			console.groupEnd()
		})
		.on("search", function () {
			console.groupCollapsed("Package.add_package_product_form_city_filter:search()")
			// ----
			
			_add_package_product_form_country_id.value = ""
			_add_package_product_form_province_id.value = ""
			_add_package_product_form_city_id.value = ""
			globalSelectCityProductSearch = false
			
			// ----
			console.groupEnd()
		})
		.autocomplete({
			serviceUrl: "/api/v1.0/autocomplete/cities",
			minChars: 2,
			cache: false,
			dataType: "json",
			triggerSelectOnValidInput: false,
			paramName: "st",
			onSelect: function (suggestion) {
				console.groupCollapsed("Package.add_package_product_form_city_filter:autocomplete - select")
				// ----
				
				if (!suggestion || !suggestion.data) {
					return
				}
				
				let data = (suggestion.data[0]) ? suggestion.data[0] : suggestion.data
				let city = (data && data.city) ? data.city : {}
				let province = (data && data.province) ? data.province : {}
				let country = (data && data.country) ? data.country : {}
				let countryId = (country && !isNaN(parseInt(country.id))) ? parseInt(country.id) : null
				let provinceId = (province && !isNaN(parseInt(province.id))) ? parseInt(province.id) : null
				let cityId = (city && !isNaN(parseInt(city.id))) ? parseInt(city.id) : null
				
				/*
                console.log("country", country)
                console.log("province", province)
                console.log("city", city)
                console.log("countryId", countryId)
                console.log("provinceId", provinceId)
                console.log("cityId", cityId)
                //*/
				
				_add_package_product_form_country_id.value = countryId
				_add_package_product_form_province_id.value = provinceId
				_add_package_product_form_city_id.value = cityId
				
				globalSelectCityProductSearch = true
				
				// ----
				console.groupEnd()
			},
		})
	
	$(_package_city_name_filter)
		.on("click", function (e) {
			console.groupCollapsed("Package.package_city_name_filter:click()")
			// ----
			if ($(this).attr("readonly") === "readonly") {
				e.preventDefault()
			} else {
				$(this).select()
			}
			// ----
			console.groupEnd()
		})
		.on("keyup", function () {
			console.groupCollapsed("Package.package_city_name_filter:keyup()")
			// ----
			globalSelectCity = false
			// ----
			console.groupEnd()
		})
		.on("search", function () {
			console.groupCollapsed("Package.package_city_name_filter:search()")
			// ----
			// ----
			console.groupEnd()
		})
		.autocomplete({
			serviceUrl: "/api/v1.0/autocomplete/cities",
			minChars: 2,
			cache: false,
			dataType: "json",
			triggerSelectOnValidInput: false,
			paramName: "st",
			onSelect: function (suggestion) {
				console.groupCollapsed("Package.package_city_name_filter:autocomplete - select")
				// ----
				
				if (!suggestion || !suggestion.data) {
					return
				}
				
				globalSelectCity = true
				
				let city = (suggestion.data[0]) ? suggestion.data[0] : suggestion.data
				
				_package_city_id.value = (city && !isNaN(parseInt(city.id))) ? parseInt(city.id) : null
				formatCityName(city)
				
				// ----
				console.groupEnd()
			},
		})
	
	$(_package_name_filter)
		.on("click", function (e) {
			console.groupCollapsed("Package.package_name_filter:click()")
			// ----
			
			if ($(this).attr("readonly") === "readonly") {
				e.preventDefault()
			} else {
				$(this).select()
			}
			
			// ----
			console.groupEnd()
		})
		.on("keyup", function () {
			console.groupCollapsed("Package.package_name_filter:keyup()")
			// ----
			
			globalSelectPackage = false
			
			// ----
			console.groupEnd()
		})
		.on("search", function () {
			console.groupCollapsed("Package.package_name_filter:search()")
			// ----
			
			globalSelectPackage = false
			
			// ----
			console.groupEnd()
		})
		.autocomplete({
			serviceUrl: "/api/v1.0/autocomplete/packages",
			minChars: 2,
			cache: false,
			dataType: "json",
			triggerSelectOnValidInput: false,
			paramName: "st",
			onSelect: function (suggestion) {
				console.groupCollapsed("Package.package_name_filter:autocomplete - select")
				// ----
				if (!suggestion || !suggestion.data) {
					return
				}
				
				globalSelectPackage = true
				
				let _package = (suggestion.data[0]) ? suggestion.data[0] : suggestion.data
				console.log("package", _package)
				
				populateForm(_package)
				
				// ----
				console.groupEnd()
			},
		})
	
	$(_package_day_span_inc)
		.on("click", function () {
			console.groupCollapsed("Package.package_day_span_inc:click()")
			// ----
			
			let input = this.parentNode.querySelector('input[type=number]')
			input.stepUp()
			$(input).trigger("change")
			
			// ----
			console.groupEnd()
		})
	
	$(_package_day_span_dec)
		.on("click", function () {
			console.groupCollapsed("Package.package_day_span_dec:click()")
			// ----
			
			let input = this.parentNode.querySelector('input[type=number]')
			input.stepDown()
			$(input).trigger("change")
			
			// ----
			console.groupEnd()
		})
	
	$(_package_day_span)
		.on("change", function () {
			console.groupCollapsed("Package.package_day_span:change()")
			// ----
			
			let defaultYear = "2022"
			let defaultMonth = "01"
			let defaultDay = "01"
			let defaultDate = `${defaultYear}-${defaultMonth}-${defaultDay}`
			let daySpan = (!isNaN(parseInt(_package_day_span.value)) && parseInt(_package_day_span.value) > 0) ? parseInt(_package_day_span.value) : 1
			let validRangeStart = moment(defaultDate).format("YYYY-MM-DD")
			let validRangeEnd = moment(defaultDate, "YYYY-MM-DD").add(daySpan, "days").format("YYYY-MM-DD")
			let days = (!isNaN(parseInt(_package_day_span.value)) && parseInt(_package_day_span.value) > 0) ? parseInt(_package_day_span.value) : 1
			
			$(_package_agenda).fullCalendar("option", {
				validRange: {
					start: validRangeStart,
					end: validRangeEnd,
				},
			})
			console.log("days", days)
			
			// ----
			console.groupEnd()
		})
	
	$(_package_min_pax_inc)
		.on("click", function (e) {
			console.groupCollapsed("Package.package_min_pax_inc:click()")
			// ----
			
			let input = this.parentNode.querySelector('input[type=number]')
			input.stepUp()
			
			// ----
			console.groupEnd()
		})
	
	$(_package_min_pax_dec)
		.on("click", function (e) {
			console.groupCollapsed("Package.package_min_pax_dec:click()")
			// ----
			
			let input = this.parentNode.querySelector('input[type=number]')
			input.stepDown()
			
			// ----
			console.groupEnd()
		})
	
	$(_package_max_pax_inc)
		.on("click", function (e) {
			console.groupCollapsed("Package.package_max_pax_inc:click()")
			// ----
			
			let input = this.parentNode.querySelector('input[type=number]')
			input.stepUp()
			
			// ----
			console.groupEnd()
		})
	
	$(_package_max_pax_dec)
		.on("click", function (e) {
			console.groupCollapsed("Package.package_max_pax_dec:click()")
			// ----
			
			let input = this.parentNode.querySelector('input[type=number]')
			input.stepDown()
			
			// ----
			console.groupEnd()
		})
	
	$(_button_add_package_page_heading)
		.on("click", function () {
			console.groupCollapsed("Package.package_test_button:click()")
			// ----
			
			showPackageModal()
			
			// ----
			console.groupEnd()
		})
	
	$(_package_product_edit_form_close_button)
		.on("click", function () {
			console.groupCollapsed("Package.package_product_edit_form_close_button: click()")
			// ----
			
			hidePackageProductEditForm()
			
			// ----
			console.groupEnd()
		})
	
	$(_package_product_edit_form_update_button)
		.on("click", function () {
			console.groupCollapsed("Package.package_product_edit_form_update_button: click()")
			// ----
			addProductToPackage()
			// ----
			console.groupEnd()
		})
	
	$(_package_product_edit_form_remove_button)
		.on("click", function () {
			console.groupCollapsed("Package.package_product_edit_form_remove_button: click()")
			// ----
			removeProductFromPackage()
			// ----
			console.groupEnd()
		})
	
	$(_package_product_edit_form_remove_button)
		.on("click", function () {
			console.groupCollapsed("Package.package_product_edit_form_remove_button: click()")
			// ----
			// ----
			console.groupEnd()
		})
	
	$(_package_product_edit_form_cancel_button)
		.on("click", function () {
			console.groupCollapsed("Package.package_product_edit_form_cancel_button: click()")
			// ----
			// ----
			console.groupEnd()
		})
	
	// ----
	
	const init = function (options) {
		console.groupCollapsed("Package.init")
		// ----
		
		if (_package_add_modal) {
			initFormFields(options)
			initializeValidator(packageRules)
			Package.validator = $(_package_add_modal_form).validate()
		}
		
		// ----
		console.groupEnd()
	}
	
	const initIndexPage = function (settings) {
		console.groupCollapsed("Package.initIndexPage")
		console.log("settings", settings)
		// ----
		
		let packages = (settings && settings.packages) ? settings.packages : []
		buildIndexTable()
		loadAll(packages)
		
		// ----
		console.groupEnd()
	}
	
	const initEditPage = function (settings) {
		console.groupCollapsed("Package.initEditPage")
		console.log("settings", settings)
		// ----
		
		let _package = (settings && settings.package) ? settings.package : null
		Package.id = (_package && !isNaN(parseInt(_package.id))) ? parseInt(_package.id) : null
		
		let package_products = (_package && _package.products) ? _package.products : null
		
		if (_package_edit_form) {
			buildAgenda(_package)
			initFormFields((settings && settings.package) ? settings.package : null)
			initPackageProductList(_package, package_products)
			initPackageProductEditForm()
			
			$('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
				
				if (e && e.target && e.target.id) {
					if (e.target.id === "tabAgendaLink") {
						Package.agenda.calendar.fullCalendar("changeView", "agendaView")
						Package.agenda.calendar.fullCalendar("render")
					}
				}
				
			})
		}
		
		// ----
		console.groupEnd()
	}
	
	const initFormFields = function (settings) {
		console.groupCollapsed("Package.initFormFields")
		// ----
		
		$(function () {
			
			Package.availableStart = $(_package_available_start_button)
				.on("click", function (e) {
					e.preventDefault()
					e.stopPropagation()
				})
				.pickadate({
					format: "yyyy-mm-dd",
					formatSubmit: "yyyy-mm-dd",
					editable: false,
					selectYears: true,
					selectMonths: true,
					container: "#main",
				})
			
			Package.availableStartPicker = Package.availableStart.pickadate("picker")
			
			Package.availableEnd = $(_package_available_end_button)
				.on("click", function (e) {
					e.preventDefault()
					e.stopPropagation()
				})
				.pickadate({
					format: "yyyy-mm-dd",
					formatSubmit: "yyyy-mm-dd",
					editable: false,
					selectYears: true,
					selectMonths: true,
					container: "#main",
				})
			
			Package.availableEndPicker = Package.availableEnd.pickadate("picker")
			
			$(_package_available_start_input)
				.on("search", function () {
					Package.availableStartPicker.set("clear")
					unLoadDateError(this)
				})
				.on("keydown", function (event) {
					return isNumber(this, event.keyCode)
				})
				.on("change", function (event) {
					if ($(this).val() === "") {
						unLoadDateError(this)
					} else {
						isDateValid(this)
					}
				})
				.on("keyup", function (event) {
					
					if ($(this).val() === "") {
						unLoadDateError(this)
					} else {
						isDateValid(this, event.keyCode)
					}
					
				})
			
			$(_package_available_end_input)
				.on("search", function () {
					Package.availableEndPicker.set("clear")
				})
			
			if (Package.availableStartPicker) {
				Package.availableStartPicker
					.on({
						open: function (event) {
							console.groupCollapsed("Package.availableStartPicker.on - open")
							// ----
							
							if ($(_package_available_start_button).val()) {
								//console.log("Note: ", "User is making a change to js-date-from")
							}
							
							// ----
							console.groupEnd()
						},
						close: function (event) {
							console.groupCollapsed("Package.availableStartPicker.on - close")
							// ----
							
							$(document.activeElement).blur()
							
							// ----
							console.groupEnd()
						},
						set: function (event) {
							console.groupCollapsed("Package.availableStartPicker.on - set")
							// ----
							
							let fromSelect = Package.availableStartPicker.get("select")
							let toSelect = Package.availableEndPicker.get("select")
							
							if (event.update) {
								console.groupCollapsed("Package.update")
								// ----
								
								let fromDate = $(_package_available_end_input).val()
								
								formatDateRange(startDate, endDate)
								
								// ----
								console.groupEnd()
							} else if (event.select) {
								console.groupCollapsed("Package.select")
								// ----
								
								if (fromSelect) {
									let fromYear = fromSelect.year
									let fromMonth = fromSelect.month
									let fromDay = fromSelect.date
									let date = new Date(fromYear, fromMonth, fromDay)
									let fromDate = moment(date, defaultDateFormat).format(defaultDateFormat)
									let fromDatePlus1 = moment(date, defaultDateFormat).add(1, "days").format(defaultDateFormat)
									let fromDateSubtract1 = moment(date, defaultDateFormat).subtract(1, "days").format(defaultDateFormat)
									startDate = fromDate
									if (fromDay && !isNaN(parseInt(fromDay))) {
										if (parseInt(fromDay) < 10) {
											fromDay = "0" + fromDay
										}
									}
									
									if (fromMonth && !isNaN(parseInt(fromMonth))) {
										fromMonth = fromMonth + 1
										
										if (parseInt(fromMonth) < 10) {
											fromMonth = "0" + fromMonth
										}
									}
									
									if (fromDate) {
										_package_available_start_input.value = fromDate
										Package.availableStartPicker.set("min", false)
										Package.availableStartPicker.set("max", false)
										Package.availableEndPicker.set("min", fromDatePlus1)
										Package.availableEndPicker.set("max", false)
									}
									
								}
								
								formatDateRange(startDate, endDate)
								
								// ----
								console.groupEnd()
							} else if ("clear" in event) {
								console.groupCollapsed("Package.clear")
								// ----
								
								startDate = null
								_package_available_start_input.value = ""
								
								if (toSelect) {
									Package.availableStartPicker.set("min", false)
									Package.availableStartPicker.set("max", moment(toSelect).subtract(1, "day"))
								} else {
									Package.availableStartPicker.set("min", false)
									Package.availableStartPicker.set("max", false)
									Package.availableEndPicker.set("min", false)
									Package.availableEndPicker.set("max", false)
								}
								
								formatDateRange(startDate, endDate)
								
								// ----
								console.groupEnd()
							} else {
							
							}
							
							// ----
							console.groupEnd()
						},
					})
			}
			
			if (Package.availableEndPicker) {
				Package.availableEndPicker
					.on({
						open: function (event) {
							console.groupCollapsed("Package.availableEndPicker.on - open")
							// ----
							
							if ($(_package_available_end_button).val()) {
								//console.log("Note: ", "User is making a change to js-date-from")
							}
							
							// ----
							console.groupEnd()
						},
						close: function (event) {
							console.groupCollapsed("Package.availableEndPicker.on - close")
							// ----
							
							$(document.activeElement).blur()
							
							// ----
							console.groupEnd()
						},
						set: function (event) {
							console.groupCollapsed("Package.availableEndPicker.on - set")
							// ----
							let toYear, toMonth, toDay, toDate, toDatePlus1, toDateSubtract1, availableEndDate,
								fromYear, fromMonth, fromDay, fromDate, fromDatePlus1, fromDateSubtract1, availableStartDate
							let fromSelect = Package.availableStartPicker.get("select")
							let toSelect = Package.availableEndPicker.get("select")
							
							if (event.update) {
								console.groupCollapsed("Package.update")
								// ----
								
								formatDateRange(startDate, endDate)
								
								// ----
								console.groupEnd()
							} else if (event.select) {
								console.groupCollapsed("Package.select")
								// ----
								
								if (fromSelect) {
									fromYear = fromSelect.year
									fromMonth = fromSelect.month
									fromDay = fromSelect.date
									availableStartDate = new Date(fromYear, fromMonth, fromDay)
									fromDate = moment(availableStartDate, defaultDateFormat).format(defaultDateFormat)
									fromDatePlus1 = moment(availableStartDate, defaultDateFormat).add(1, "days").format(defaultDateFormat)
									fromDateSubtract1 = moment(availableStartDate, defaultDateFormat).subtract(1, "days").format(defaultDateFormat)
									endDate = fromDate
									
									//*
									console.log("fromYear", fromYear)
									console.log("fromMonth", fromMonth)
									console.log("fromDay", fromDay)
									console.log("availableStartDate", availableStartDate)
									console.log("fromDate", fromDate)
									console.log("fromDatePlus1", fromDatePlus1)
									console.log("fromDateSubtract1", fromDateSubtract1)
									console.log("startDate", startDate)
									//*/
									
								}
								
								if (toSelect) {
									
									toYear = toSelect.year
									toMonth = toSelect.month
									toDay = toSelect.date
									availableEndDate = new Date(toYear, toMonth, toDay)
									toDate = moment(availableEndDate, defaultDateFormat).format(defaultDateFormat)
									toDatePlus1 = moment(availableEndDate, defaultDateFormat).add(1, "days").format(defaultDateFormat)
									toDateSubtract1 = moment(availableEndDate, defaultDateFormat).subtract(1, "days").format(defaultDateFormat)
									endDate = toDate
									
									//*
									console.log("toYear", toYear)
									console.log("toMonth", toMonth)
									console.log("toDay", toDay)
									console.log("availableEndDate", availableEndDate)
									console.log("toDate", toDate)
									console.log("toDatePlus1", toDatePlus1)
									console.log("toDateSubtract1", toDateSubtract1)
									console.log("endDate", endDate)
									//*/
									
									if (toDay && !isNaN(parseInt(toDay))) {
										if (parseInt(toDay) < 10) {
											toDay = "0" + toDay
										}
									}
									
									if (toMonth && !isNaN(parseInt(toMonth))) {
										toMonth = toMonth + 1
										
										if (parseInt(toMonth) < 10) {
											toMonth = "0" + toMonth
										}
									}
									
									if (toDate) {
										_package_available_end_input.value = toDate
										
										if (!fromSelect) {
											Package.availableStartPicker.set("min", false)
											Package.availableStartPicker.set("max", toDateSubtract1)
											Package.availableEndPicker.set("min", false)
											Package.availableEndPicker.set("max", endDate)
										} else {
											Package.availableStartPicker.set("min", startDate)
											Package.availableStartPicker.set("max", toDateSubtract1)
											Package.availableEndPicker.set("min", startDate)
											Package.availableEndPicker.set("max", endDate)
										}
									} else {
										_package_available_end_input.value = ""
										if (!fromSelect) {
											Package.availableStartPicker.set("min", false)
											Package.availableStartPicker.set("max", false)
											Package.availableEndPicker.set("min", false)
											Package.availableEndPicker.set("max", false)
										} else {
											Package.availableStartPicker.set("min", startDate)
											Package.availableStartPicker.set("max", startDate)
											Package.availableEndPicker.set("min", startDate)
											Package.availableEndPicker.set("max", false)
										}
									}
									
									formatDateRange(startDate, endDate)
								}
								
								// ----
								console.groupEnd()
							} else if ("clear" in event) {
								console.groupCollapsed("Package.clear")
								// ----
								
								endDate = null
								_package_available_end_input.value = ""
								
								Package.availableStartPicker.set("max", false)
								Package.availableEndPicker.set("min", false)
								Package.availableEndPicker.set("max", false)
								
								formatDateRange(startDate, endDate)
								
								// ----
								console.groupEnd()
							}
							
							// ----
							console.groupEnd()
						},
					})
			}
			if (_package_edit_form) {
				Package.productList = new List("product_search_results_container", searchOptions)
				populateEditPackageForm((settings && settings.package) ? settings.package : settings)
				initAddProductForm()
				initSearchResultsContainer()
			} else {
				if (_package_add_modal) {
					clearForm()
				}
			}
			
		})
		
		// ----
		console.groupEnd()
	}
	
	// ----
	
	const showPackageModal = function () {
		console.groupCollapsed("Package.showPackageModal")
		// ----
		
		$(_package_add_modal).modal("show")
		
		// ----
		console.groupEnd()
	}
	
	const hidePackageModal = function () {
		console.groupCollapsed("Package.hidePackageModal")
		// ----
		
		$(_package_add_modal).modal("hide")
		
		// ----
		console.groupEnd()
	}
	
	const formatCityName = function (city) {
		console.groupCollapsed("Package.formatCityName")
		// ----
		
		let country = (city && city.country) ? city.country : {}
		let province = (city && city.province) ? city.province : {}
		let formattedName = ""
		let countryNameFormatted, provinceNameFormatted, cityNameFormatted = ""
		let countryName = (country && country.name) ? country.name : null
		let countryISO2 = (country && country.iso2) ? country.iso2 : null
		let countryISO3 = (country && country.iso3) ? country.iso3 : null
		let provinceName = (province && province.name) ? province.name : null
		let provinceISO2 = (province && province.iso2) ? province.iso2 : null
		let provinceISO3 = (province && province.iso3) ? province.iso3 : null
		let cityName = (city && city.name) ? city.name : null
		
		switch (defaultLocationDisplayFormat.toLowerCase()) {
			case "short":
				countryNameFormatted = (countryISO2 !== null) ? countryISO2 : (countryISO3 !== null) ? countryISO3 : (countryName !== null) ? countryName : null
				provinceNameFormatted = (provinceISO2 !== null) ? provinceISO2 : (provinceISO3 !== null) ? provinceISO3 : (provinceName !== null) ? provinceName : null
				cityNameFormatted = (cityName !== null) ? cityName : null
				
				if (countryNameFormatted !== null && provinceNameFormatted !== null && cityNameFormatted !== null) {
					formattedName = `${cityNameFormatted} (${provinceNameFormatted}, ${countryNameFormatted})`
				} else if (countryNameFormatted !== null && provinceNameFormatted !== null && cityNameFormatted === null) {
					formattedName = `(${provinceNameFormatted}, ${countryNameFormatted})`
				} else if (countryNameFormatted !== null && provinceNameFormatted === null && cityNameFormatted === null) {
					formattedName = `(${countryNameFormatted})`
				} else {
					formattedName = ``
				}
				
				break
			case "medium":
				countryNameFormatted = (countryName !== null) ? countryName : (countryISO3 !== null) ? countryISO3 : (countryISO2 !== null) ? countryISO2 : null
				provinceNameFormatted = (provinceName !== null) ? provinceName : (provinceISO3 !== null) ? provinceISO3 : (provinceISO2 !== null) ? provinceISO2 : null
				cityNameFormatted = (cityName !== null) ? cityName : null
				
				if (countryNameFormatted !== null && provinceNameFormatted !== null && cityNameFormatted !== null) {
					formattedName = `${cityNameFormatted} (${provinceNameFormatted}, ${countryNameFormatted})`
				} else if (countryNameFormatted !== null && provinceNameFormatted !== null && cityNameFormatted === null) {
					formattedName = `(${provinceNameFormatted}, ${countryNameFormatted})`
				} else if (countryNameFormatted !== null && provinceNameFormatted === null && cityNameFormatted === null) {
					formattedName = `(${countryNameFormatted})`
				} else {
					formattedName = ``
				}
				
				break
			case "long":
				
				if (countryName !== null && countryISO3 !== null && countryISO2 !== null) {
					countryNameFormatted = `${countryISO3}-${countryName}`
				} else if (countryName !== null && countryISO3 !== null && countryISO2 === null) {
					countryNameFormatted = `${countryISO3}-${countryName}`
				} else if (countryName !== null && countryISO3 === null && countryISO2 === null) {
					countryNameFormatted = `${countryName}`
				} else if (countryName === null && countryISO3 !== null && countryISO2 === null) {
					countryNameFormatted = `${countryISO3}`
				} else if (countryName === null && countryISO3 === null && countryISO2 !== null) {
					countryNameFormatted = `${countryISO2}`
				} else if (countryName !== null && countryISO3 === null && countryISO2 !== null) {
					countryNameFormatted = `${countryISO2}-${countryName}`
				} else {
					countryNameFormatted = null
				}
				
				if (provinceName !== null && provinceISO3 !== null && provinceISO2 !== null) {
					provinceNameFormatted = `${provinceISO3}-${provinceName}`
				} else if (provinceName !== null && provinceISO3 !== null && provinceISO2 === null) {
					provinceNameFormatted = `${provinceISO3}-${provinceName}`
				} else if (provinceName !== null && provinceISO3 === null && provinceISO2 === null) {
					provinceNameFormatted = `${provinceName}`
				} else if (provinceName === null && provinceISO3 !== null && provinceISO2 === null) {
					provinceNameFormatted = `${provinceISO3}`
				} else if (provinceName === null && provinceISO3 === null && provinceISO2 !== null) {
					provinceNameFormatted = `${provinceISO2}`
				} else if (provinceName !== null && provinceISO3 === null && provinceISO2 !== null) {
					provinceNameFormatted = `${provinceISO2}-${provinceName}`
				} else {
					provinceNameFormatted = null
				}
				
				if (cityName !== null) {
					cityNameFormatted = `${cityName}`
				} else {
					cityNameFormatted = null
				}
				
				if (countryNameFormatted !== null && provinceNameFormatted !== null && cityNameFormatted !== null) {
					formattedName = `${cityNameFormatted} (${provinceNameFormatted}, ${countryNameFormatted})`
				} else if (countryNameFormatted !== null && provinceNameFormatted !== null && cityNameFormatted === null) {
					formattedName = `(${provinceNameFormatted}, ${countryNameFormatted})`
				} else if (countryNameFormatted !== null && provinceNameFormatted === null && cityNameFormatted === null) {
					formattedName = `(${countryNameFormatted})`
				} else if (countryNameFormatted !== null && provinceNameFormatted === null && cityNameFormatted !== null) {
					formattedName = `${cityNameFormatted} (${countryNameFormatted})`
				} else if (countryNameFormatted === null && provinceNameFormatted !== null && cityNameFormatted !== null) {
					formattedName = `(${provinceNameFormatted}, ${countryNameFormatted})`
				} else {
					formattedName = ``
				}
				
				break
			default:
				formattedName = ``
		}
		
		/*
        console.log("city", city)
        console.log("defaultLocationDisplayFormat", defaultLocationDisplayFormat)
        console.log("formattedName", formattedName)
        //*/
		
		// ----
		console.groupEnd()
		return formattedName
	}
	
	const resetForm = function () {
		console.groupCollapsed("Package.resetForm")
		// ----
		
		clearForm()
		hidePackageModal()
		
		// ----
		console.groupEnd()
	}
	
	const clearForm = function () {
		console.groupCollapsed("Package.clearForm")
		// ----
		_package_id.value = ""
		_package_name.value = ""
		_package_day_span.value = 1
		_package_city_id.value = ""
		_package_min_pax.value = 1
		_package_max_pax.value = 1
		_package_description_long.value = ""
		_package_description_short.value = ""
		
		_package_city_name_filter.value = ""
		_package_name_filter.value = ""
		
		Package.availableStartPicker.set("clear")
		Package.availableEndPicker.set("clear")
		
		_package_cost.value = 0
		_package_price.value = 0
		_package_margin.value = 0
		_package_enabled.checked = true
		
		Package.availableStartPicker.set("select", false)
		Package.availableEndPicker.set("select", false)
		
		_package_cost_icon.innerHTML = `&dollar;`
		_package_margin_icon.innerHTML = `&dollar;`
		_package_price_icon.innerHTML = `&dollar;`
		
		if (_package_edit_form) {
		
		} else if (_package_add_modal) {
			clearValidation(_package_add_modal_form)
		}
		
		// ----
		console.groupEnd()
	}
	
	const populateForm = function (_package) {
		console.groupCollapsed("Package.populateForm")
		// ----
		
		let currency = (_package && _package.currency) ? _package.currency : {}
		let city = (_package && _package.city) ? _package.city : {}
		let symbol = (currency.symbol) ? currency.symbol : "&dollar;"
		let startDate = (_package && _package.available_start) ? _package.available_start : false
		let endDate = (_package && _package.available_end) ? _package.available_end : false
		let cityNameFilter = formatCityName(city)
		
		clearForm()
		
		_package_id.value = (_package && !isNaN(parseInt(_package.id))) ? parseInt(_package.id) : null
		_package_day_span.value = (_package && !isNaN(parseInt(_package.day_span))) ? parseInt(_package.day_span) : 1
		_package_city_id.value = (_package && !isNaN(parseInt(_package.city_id))) ? parseInt(_package.city_id) : null
		_package_min_pax.value = (_package && !isNaN(parseInt(_package.min_pax))) ? parseInt(_package.min_pax) : 1
		_package_max_pax.value = (_package && !isNaN(parseInt(_package.max_pax))) ? parseInt(_package.max_pax) : 1
		
		_package_city_name_filter.value = cityNameFilter
		_package_description_long.value = (_package && _package.description_long) ? _package.description_long : null
		_package_description_short.value = (_package && _package.description_short) ? _package.description_short : null
		
		_package_cost.value = (_package && !isNaN(parseInt(_package.cost))) ? parseInt(_package.cost) : 0
		_package_price.value = (_package && !isNaN(parseInt(_package.price))) ? parseInt(_package.price) : 0
		_package_margin.value = (_package && !isNaN(parseInt(_package.margin))) ? parseInt(_package.margin) : 0
		
		_package_name_filter.value = (_package && _package.name) ? _package.name : null
		_package_name.value = (_package && _package.name) ? _package.name : null
		
		Package.availableStartPicker.set("select", startDate)
		Package.availableEndPicker.set("select", endDate)
		
		_package_cost_icon.innerHTML = symbol
		_package_margin_icon.innerHTML = symbol
		_package_price_icon.innerHTML = symbol
		
		// ----
		console.groupEnd()
	}
	
	const handleNumberClick = function (_this) {
		console.groupCollapsed("Package.handleNumberClick")
		// ----
		
		let el = _this
		let $el = $(el)
		let $parent = $(el).parent("div.number-button")
		
		console.log("el", el)
		console.log("el.dataset", el.dataset)
		
		// ----
		console.groupEnd()
	}
	
	const handlePackageError = function (msg, title, level) {
		console.groupCollapsed("Package.handlePackageError")
		// ----
		
		if (!title) {
			title = "Package"
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
	
	const handleCountryChange = function (countryId) {
		console.groupCollapsed("Package.handleCountryChange")
		// ----
		
		let provinces = []
		let cities = []
		
		if (!isNaN(parseInt(countryId))) {
		
		}
		
		console.log("countryId", countryId)
		
		// ----
		console.groupEnd()
	}
	
	const handleProvinceChange = function (provinceId) {
		console.groupCollapsed("Package.handleProvinceChange")
		// ----
		
		console.log("provinceId", provinceId)
		
		// ----
		console.groupEnd()
	}
	
	const handleCityChange = function (cityId) {
		console.groupCollapsed("Package.handleCityChange")
		// ----
		
		console.log("cityId", cityId)
		
		// ----
		console.groupEnd()
	}
	
	const defaultDetail = function () {
		console.groupCollapsed("Package.defaultDetail")
		// ----
		
		let detail = {
			id: null,
			name: null,
			day_span: 1,
			city_id: null,
			min_pax: 1,
			max_pax: null,
			description_long: null,
			description_short: null,
			available_start: null,
			available_end: null,
			cost: null,
			price: null,
			margin: null,
			enabled: 1,
			date_created: formatDateMySQL(),
			created_by: userId,
			date_modified: formatDateMySQL(),
			modified_by: userId,
			note: null,
			city: {
				country: {},
				province: {},
			},
		}
		
		// ----
		console.groupEnd()
		return detail
	}
	
	const set = function (_package) {
		console.groupCollapsed("Package.set")
		// ----
		
		let detail = defaultDetail()
		
		detail.id = (_package && !isNaN(parseInt(_package.id))) ? parseInt(_package.id) : null
		detail.day_span = (_package && !isNaN(parseInt(_package.day_span))) ? parseInt(_package.day_span) : 1
		detail.city_id = (_package && !isNaN(parseInt(_package.city_id))) ? parseInt(_package.city_id) : null
		detail.min_pax = (_package && !isNaN(parseInt(_package.min_pax))) ? parseInt(_package.min_pax) : 1
		detail.max_pax = (_package && !isNaN(parseInt(_package.max_pax))) ? parseInt(_package.max_pax) : null
		detail.cost = (_package && !isNaN(parseInt(_package.cost))) ? parseInt(_package.cost) : 0
		detail.price = (_package && !isNaN(parseInt(_package.price))) ? parseInt(_package.price) : 0
		detail.margin = (_package && !isNaN(parseInt(_package.margin))) ? parseInt(_package.margin) : 0
		detail.created_by = (_package && !isNaN(parseInt(_package.created_by))) ? parseInt(_package.created_by) : userId
		detail.modified_by = (_package && !isNaN(parseInt(_package.modified_by))) ? parseInt(_package.modified_by) : userId
		
		detail.name = (_package && _package.name) ? _package.name : null
		detail.description_short = (_package && _package.description_short) ? _package.description_short : null
		detail.description_long = (_package && _package.description_long) ? _package.description_long : null
		detail.available_start = (_package && _package.available_start) ? _package.available_start : null
		detail.available_end = (_package && _package.available_end) ? _package.available_end : null
		detail.note = (_package && _package.note) ? _package.note : null
		
		detail.date_created = (_package && _package.date_created) ? _package.date_created : formatDateMySQL()
		detail.date_modified = (_package && _package.date_modified) ? _package.date_modified : formatDateMySQL()
		
		detail.city = (_package && _package.city) ? _package.city : {
			country: {},
			province: {},
		}
		
		// ----
		console.groupEnd()
		return detail
	}
	
	const loadAll = function (packages) {
		console.groupCollapsed("Package.loadAll")
		// ----
		
		if (!packages) {
			packages = []
		}
		Package.all = new Map()
		
		$.each(packages, function (k, p) {
			let detail = set(p)
			Package.all.set(detail.id, detail)
			$packageIndexTable.insertRow(detail)
		})
		
		// ----
		console.groupEnd()
	}
	
	const buildRecord = function () {
		console.groupCollapsed("Package.buildRecord")
		// ----
		
		let data = {
			id: (_package_id && !isNaN(parseInt(_package_id.value))) ? parseInt(_package_id.value) : null,
			name: (_package_name_filter) ? _package_name_filter.value : null,
			day_span: (_package_day_span && !isNaN(parseInt(_package_day_span.value))) ? parseInt(_package_day_span.value) : null,
			city_id: (_package_city_id && !isNaN(parseInt(_package_city_id.value))) ? parseInt(_package_city_id.value) : null,
			min_pax: (_package_min_pax && !isNaN(parseInt(_package_min_pax.value))) ? parseInt(_package_min_pax.value) : null,
			max_pax: (_package_max_pax && !isNaN(parseInt(_package_max_pax.value))) ? parseInt(_package_max_pax.value) : null,
			description_long: (_package_description_long) ? _package_description_long.value : null,
			description_short: (_package_description_short) ? _package_description_short.value : null,
			available_start: (_package_available_start_input) ? _package_available_start_input.value : null,
			available_end: (_package_available_end_input) ? _package_available_end_input.value : null,
			cost: (_package_cost && !isNaN(parseInt(_package_cost.value))) ? parseInt(_package_cost.value) : null,
			price: (_package_price && !isNaN(parseInt(_package_price.value))) ? parseInt(_package_price.value) : null,
			margin: (_package_margin && !isNaN(parseInt(_package_margin.value))) ? parseInt(_package_margin.value) : null,
			enabled: (_package_enabled.checked === false) ? 0 : 1,
			note: (_package_note) ? _package_note.value : null,
		}
		
		// ----
		console.groupEnd()
		return removeNulls(data)
	}
	
	const buildIndexTable = function () {
		console.groupCollapsed("Package.buildIndexTable")
		// ----
		
		//*
		if (_package_index_table) {
			$packageIndexTable = $(_package_index_table).table({
				table_type: "display_list",
				data: Package.all,
				columnDefs: [
					{
						title: "Name",
						targets: 0,
						data: "name",
						render: function (data, type, row, meta) {
							console.groupCollapsed("Name")
							// ----
							
							/*
                            console.log("data", data)
                            console.log("type", type)
                            console.log("row", row)
                            console.log("meta", meta)
                            //*/
							
							// ----
							console.groupEnd()
							return `<span style="white-space: nowrap;">${data}</span>`
						},
					}, {
						title: "Country",
						targets: 1,
						data: "city.country",
						render: function (data, type, row, meta) {
							console.groupCollapsed("Country")
							// ----
							
							let countryName = (data && data.name) ? data.name : ""
							let countryISO2 = (data && data.iso2) ? data.iso2 : ""
							let countryISO3 = (data && data.iso3) ? data.iso3 : ""
							
							/*
                            console.log("data", data)
                            console.log("type", type)
                            console.log("row", row)
                            console.log("meta", meta)
                            //*/
							
							// ----
							console.groupEnd()
							return `<span style="white-space: nowrap;">${countryName}</span>`
						},
					}, {
						title: "Province",
						targets: 2,
						data: "city.province",
						render: function (data, type, row, meta) {
							console.groupCollapsed("Province")
							// ----
							
							let provinceName = (data && data.name) ? data.name : ""
							let provinceISO2 = (data && data.iso2) ? data.iso2 : ""
							let provinceISO3 = (data && data.iso3) ? data.iso3 : ""
							
							/*
                            console.log("data", data)
                            console.log("type", type)
                            console.log("row", row)
                            console.log("meta", meta)
                            //*/
							
							// ----
							console.groupEnd()
							return `<span style="white-space: nowrap;">${provinceName}</span>`
						},
					}, {
						title: "City",
						targets: 3,
						data: "city",
						render: function (data, type, row, meta) {
							console.groupCollapsed("City")
							// ----
							
							let cityName = (data && data.name) ? data.name : ""
							
							/*
                            console.log("data", data)
                            console.log("type", type)
                            console.log("row", row)
                            console.log("meta", meta)
                            //*/
							
							// ----
							console.groupEnd()
							return `<span style="white-space: nowrap;">${cityName}</span>`
						},
					}, {
						title: "Day Span",
						targets: 4,
						data: "day_span",
						render: function (data, type, row, meta) {
							console.groupCollapsed("Day Span")
							// ----
							
							/*
                            console.log("data", data)
                            console.log("type", type)
                            console.log("row", row)
                            console.log("meta", meta)
                            //*/
							
							// ----
							console.groupEnd()
							return `<span style="white-space: nowrap;">${data}</span>`
						},
					}, {
						title: "Available Start",
						targets: 5,
						data: "available_start",
						render: function (data, type, row, meta) {
							console.groupCollapsed("Available Start")
							// ----
							
							/*
                            console.log("data", data)
                            console.log("type", type)
                            console.log("row", row)
                            console.log("meta", meta)
                            //*/
							
							// ----
							console.groupEnd()
							return `<span style="white-space: nowrap;">${data}</span>`
						},
					}, {
						title: "Available End",
						targets: 6,
						data: "available_end",
						render: function (data, type, row, meta) {
							console.groupCollapsed("Available End")
							// ----
							
							/*
                            console.log("data", data)
                            console.log("type", type)
                            console.log("row", row)
                            console.log("meta", meta)
                            //*/
							
							// ----
							console.groupEnd()
							return `<span style="white-space: nowrap;">${data}</span>`
						},
					},
				],
				rowClick: Package.edit,
			})
			
			initIndexTableFilters()
		}
		//*/
		
		// ----
		console.groupEnd()
	}
	
	const buildSearchCriteria = function () {
		console.groupCollapsed("Package.buildSearchCriteria")
		// ----
		
		let dataToSend = {}
		
		let productId = (_add_package_product_form_product_id && !isNaN(parseInt(_add_package_product_form_product_id.value))) ? parseInt(_add_package_product_form_product_id.value) : null
		let categoryId = (_add_package_product_form_category_id && !isNaN(parseInt(_add_package_product_form_category_id.value))) ? parseInt(_add_package_product_form_category_id.value) : null
		let countryId = (_add_package_product_form_country_id && !isNaN(parseInt(_add_package_product_form_country_id.value))) ? parseInt(_add_package_product_form_country_id.value) : null
		let provinceId = (_add_package_product_form_province_id && !isNaN(parseInt(_add_package_product_form_province_id.value))) ? parseInt(_add_package_product_form_province_id.value) : null
		let cityId = (_add_package_product_form_city_id && !isNaN(parseInt(_add_package_product_form_city_id.value))) ? parseInt(_add_package_product_form_city_id.value) : null
		
		if (categoryId === null) {
			return
		} else {
			dataToSend.category_id = categoryId
		}
		
		if (productId !== null) {
			dataToSend.product_id = productId
		}
		
		if (countryId !== null) {
			dataToSend.country_id = countryId
		}
		
		if (provinceId !== null) {
			dataToSend.province_id = provinceId
		}
		
		if (cityId !== null) {
			dataToSend.city_id = cityId
		}
		
		// ----
		console.groupEnd()
		return removeNulls(dataToSend)
	}
	
	const handleAddProductFormCategoryChange = function () {
		console.groupCollapsed("Package.handleAddProductFormCategoryChange")
		// ----
		
		let categoryId = (_add_package_product_form_category_id && !isNaN(parseInt(_add_package_product_form_category_id.value))) ? parseInt(_add_package_product_form_category_id.value) : null
		
		if (_add_package_product_form_product_filter) {
			_add_package_product_form_product_id.value = ""
			_add_package_product_form_product_filter.value = ""
			
			if (categoryId !== null) {
				enableAddProductForm()
				$(_add_package_product_form_product_filter)
					.on("click", function (e) {
						console.groupCollapsed("Package.add_package_product_form_product_filter:click()")
						// ----
						
						if ($(this).attr("readonly") === "readonly") {
							e.preventDefault()
						} else {
							$(this).select()
						}
						
						// ----
						console.groupEnd()
					})
					.on("keyup", function () {
						console.groupCollapsed("Package.add_package_product_form_product_filter:keyup()")
						// ----
						
						globalSelectPackageProductSearch = false
						
						// ----
						console.groupEnd()
					})
					.on("search", function () {
						console.groupCollapsed("Package.add_package_product_form_product_filter:search()")
						// ----
						
						globalSelectPackageProductSearch = false
						_add_package_product_form_product_id.value = ""
						_add_package_product_form_product_filter.value = ""
						
						// ----
						console.groupEnd()
					})
					.autocomplete({
						serviceUrl: "/api/v1.0/autocomplete/products",
						minChars: 2,
						cache: false,
						dataType: "json",
						triggerSelectOnValidInput: false,
						paramName: "st",
						params: { "category_id": categoryId },
						onSelect: function (suggestion) {
							console.groupCollapsed("Package.add_package_product_form_product_filter:autocomplete - select")
							// ----
							
							if (!suggestion || !suggestion.data) {
								return
							}
							
							let data = (suggestion.data[0]) ? suggestion.data[0] : suggestion.data
							let productId = (data && !isNaN(parseInt(data.id))) ? parseInt(data.id) : null
							let productName = (data && data.name) ? data.name : null
							let country = (data && data.country) ? data.country : {}
							let province = (data && data.province) ? data.province : {}
							let city = (data && data.city) ? data.city : {}
							
							let countryName = (country && country.name) ? country.name : null
							let provinceName = (province && province.name) ? province.name : null
							let cityName = (city && city.name) ? city.name : null
							
							let countryId = (country && !isNaN(parseInt(country.id))) ? parseInt(country.id) : null
							let provinceId = (province && !isNaN(parseInt(province.id))) ? parseInt(province.id) : null
							let cityId = (city && !isNaN(parseInt(city.id))) ? parseInt(city.id) : null
							
							globalSelectPackageProductSearch = true
							globalSelectCityProductSearch = true
							
							_add_package_product_form_product_id.value = productId
							_add_package_product_form_product_filter.value = productName
							_add_package_product_form_country_id.value = countryId
							_add_package_product_form_province_id.value = provinceId
							_add_package_product_form_city_id.value = cityId
							_add_package_product_form_city_filter.value = `${cityName} (${provinceName}, ${countryName})`
							
							/*
                            console.log("data", data)
                            console.log("country", country)
                            console.log("province", province)
                            console.log("city", city)
                            console.log("countryName", countryName)
                            console.log("provinceName", provinceName)
                            console.log("cityName", cityName)
                            console.log("countryId", countryId)
                            console.log("provinceId", provinceId)
                            console.log("cityId", cityId)
                            console.log("productId", productId)
                            console.log("productName", productName)
                            //*/
							
							// ----
							console.groupEnd()
						},
					})
			} else {
				disableAddProductForm()
			}
			
		}
		
		// ----
		console.groupEnd()
	}
	
	const disableAddProductForm = function () {
		console.groupCollapsed("Package.disableAddProductForm")
		// ----
		
		_add_package_product_form_city_filter.disabled = true
		_add_package_product_form_product_filter.disabled = true
		_add_package_product_form_search_button.disabled = true
		_add_package_product_form_clear_button.disabled = true
		
		$(_add_package_product_form_search_button).addClass("disabled")
		$(_add_package_product_form_clear_button).addClass("disabled")
		
		// ----
		console.groupEnd()
	}
	
	const enableAddProductForm = function () {
		console.groupCollapsed("Package.enableAddProductForm")
		// ----
		
		_add_package_product_form_city_filter.disabled = false
		_add_package_product_form_product_filter.disabled = false
		_add_package_product_form_search_button.disabled = false
		_add_package_product_form_clear_button.disabled = false
		
		$(_add_package_product_form_search_button).removeClass("disabled")
		$(_add_package_product_form_clear_button).removeClass("disabled")
		
		// ----
		console.groupEnd()
	}
	
	const clearAddProductForm = function () {
		console.groupCollapsed("Package.clearAddProductForm")
		// ----
		
		_add_package_product_form_product_id.value = ""
		_add_package_product_form_country_id.value = ""
		_add_package_product_form_province_id.value = ""
		_add_package_product_form_city_id.value = ""
		_add_package_product_form_category_id.value = ""
		_add_package_product_form_city_filter.value = ""
		_add_package_product_form_product_filter.value = ""
		
		// ----
		console.groupEnd()
	}
	
	const showAddProductForm = function () {
		console.groupCollapsed("Package.showAddProductForm")
		// ----
		
		$(_add_package_product_form).show()
		disableProductList()
		
		// ----
		console.groupEnd()
	}
	
	const hideAddProductForm = function () {
		console.groupCollapsed("Package.hideAddProductForm")
		// ----
		
		$(_add_package_product_form).hide()
		enableProductList()
		
		// ----
		console.groupEnd()
	}
	
	const initAddProductForm = function () {
		console.groupCollapsed("Package.initAddProductForm")
		// ----
		
		if (_add_package_product_form) {
			clearAddProductForm()
			disableAddProductForm()
			hideAddProductForm()
		}
		
		// ----
		console.groupEnd()
	}
	
	const edit = function (data) {
		console.groupCollapsed("Package.edit")
		// ----
		
		let packageId = (data && !isNaN(parseInt(data.id))) ? parseInt(data.id) : null
		
		if (packageId !== null) {
			window.location.replace(`${baseURL}/${packageId}`)
		}
		
		// ----
		console.groupEnd()
	}
	
	const save = function () {
		console.groupCollapsed("Package.save")
		// ----
		
		let dataToSend
		
		if ($(_package_add_modal_form).valid()) {
			dataToSend = buildRecord()
			console.log("dataToSend", dataToSend)
		}
		
		// ----
		console.groupEnd()
	}
	
	const search = function () {
		console.groupCollapsed("Package.search")
		// ----
		
		let dataToSend = buildSearchCriteria()
		
		if (typeof dataToSend === "object" && !Array.isArray(dataToSend) && dataToSend !== null && dataToSend !== {}) {
			console.log("dataToSend", dataToSend)
			// ----
			
			let data = testProductList
			if (data.length > 0) {
				populateSearchResultsContainer(data)
				showSearchResultsContainer()
			} else {
				populateSearchResultsContainer()
				hideSearchResultsContainer()
			}
			
		}
		
		// ----
		console.groupEnd()
	}
	
	const add = function (_this) {
		console.groupCollapsed("Package.add")
		// ----
		
		let $parent = $(_this).parents("li")[0]
		
		if ($parent) {
			
			let productId = (!isNaN(parseInt($(_this).parents("li")[0].dataset.id))) ? parseInt($(_this).parents("li")[0].dataset.id) : null
			let unitId = (!isNaN(parseInt($(_this).parents("li")[0].dataset.unitid))) ? parseInt($(_this).parents("li")[0].dataset.unitid) : null
			let packageId = (!isNaN(parseInt(Package.id))) ? parseInt(Package.id) : null
			let unitName = $("p.unitname").html()
			let productName = $("p.name").html()
			
			if (productId !== null && packageId !== null && unitId !== null) {
				
				let productMapId = `${productId}_${unitId}`
				let detail = Package.products.get(productMapId)
				
				if (detail) {
				
				} else {
					detail = {
						product_id: productId,
						package_id: packageId,
						unit_id: unitId,
						unit_name: unitName,
						product_name: productName,
						unit_label: "",
						product_label: "",
						allow_substitution: 1,
						day_span: 1,
					}
				}
				
				populatePackageProductEditForm(detail)
				
			}
			
		}
		
		// ----
		console.groupEnd()
	}
	
	const addProductToPackage = function () {
		console.groupCollapsed("Package.addProductToPackage")
		// ----
		
		let packageId = (Package.id && !isNaN(parseInt(Package.id))) ? parseInt(Package.id) : null
		let productId = (_package_product_edit_form_product_id && !isNaN(parseInt(_package_product_edit_form_product_id.value))) ? parseInt(_package_product_edit_form_product_id.value) : null
		let unitId = (_package_product_edit_form_unit_id && !isNaN(parseInt(_package_product_edit_form_unit_id.value))) ? parseInt(_package_product_edit_form_unit_id.value) : null
		let daySpan = (_package_product_edit_form_day_span && !isNaN(parseInt(_package_product_edit_form_day_span.value))) ? parseInt(_package_product_edit_form_day_span.value) : 1
		let allowSubstitutions = (_package_product_edit_form_allow_substitution && _package_product_edit_form_allow_substitution.checked === false) ? 0 : 1
		let productLabel = (_package_product_edit_form_product_label) ? _package_product_edit_form_product_label.value : null
		let unitLabel = (_package_product_edit_form_unit_label) ? _package_product_edit_form_unit_label.value : null
		
		confirmDialog(`Would you like to update?`, (ans) => {
			if (ans) {
				
				let dataToSend = {
					allow_substitutions: allowSubstitutions,
					day_span: daySpan,
					package_id: packageId,
					product_id: productId,
					product_label: productLabel,
					unit_id: unitId,
					unit_label: unitLabel,
				}
				
				console.log("dataToSend", dataToSend)
				
			}
		})
		
		// ----
		console.groupEnd()
	}
	
	const removeProductFromPackage = function (packageProduct) {
		console.groupCollapsed("Package.removeProductFromPackage()")
		// ----
		
		if (packageProduct) {
			console.log("packageProduct", packageProduct)
			let packageId = (Package.id && !isNaN(parseInt(Package.id))) ? parseInt(Package.id) : null
			let productId = (!isNaN(parseInt(packageProduct.product_id))) ? parseInt(packageProduct.product_id) : null
			let unitId = (!isNaN(parseInt(packageProduct.unit_id))) ? parseInt(packageProduct.unit_id) : null
			
			confirmDialog(`Would you like to remove?`, (ans) => {
				if (ans) {
					
					let dataToSend = {
						package_id: packageId,
						product_id: productId,
						unit_id: unitId,
					}
					
					removePackageProductListItem(productId, unitId)
					
				}
			})
		}
		
		// ----
		console.groupEnd()
	}
	
	const initSearchResultsContainer = function () {
		console.groupCollapsed("Package.initSearchResultsContainer")
		// ----
		
		if (_package_product_search_results) {
			clearSearchResultsContainer()
			hideSearchResultsContainer()
		}
		
		// ----
		console.groupEnd()
	}
	
	const populateSearchResultsContainer = function (products) {
		console.group("Package.populateSearchResultsContainer")
		// ----
		
		clearSearchResultsContainer()
		
		if (products) {
			$.each(products, function (k, product) {
				let productId = (product.id && !isNaN(parseInt(product.id))) ? parseInt(product.id) : null
				let unit = (product.unit) ? product.unit : null
				
				let ratingId = (product.rating_id && !isNaN(parseInt(product.rating_id))) ? parseInt(product.rating_id) : null
				let productName = (product.name) ? product.name : null
				let ratingText = (product.rating_text) ? product.rating_text : null
				
				if (productId && ratingId && productName && ratingText && unit) {
					let unitId = (unit.id && !isNaN(parseInt(unit.id))) ? parseInt(unit.id) : null
					let unitName = (unit.name) ? unit.name : null
					
					//*
					console.log("productId", productId)
					console.log("ratingId", ratingId)
					console.log("productName", productName)
					console.log("ratingText", ratingText)
					console.log("unit", unit)
					console.log("unitId", unitId)
					console.log("unitName", unitName)
					//*/
					
					Package.productList.add({
						id: productId,
						unitid: unitId,
						name: productName,
						unitname: unitName,
						productname: productName,
						ratingid: ratingId,
						ratingtext: ratingText,
					})
					
				}
				
			})
		}
		
		// ----
		console.groupEnd()
	}
	
	const clearSearchResultsContainer = function () {
		console.groupCollapsed("Package.clearSearchResultsContainer")
		// ----
		
		clearSearchResultsFields()
		Package.productList.clear()
		
		// ----
		console.groupEnd()
	}
	
	const clearSearchResultsFields = function () {
		console.groupCollapsed("Package.clearSearchResultsFields")
		// ----
		
		// ----
		console.groupEnd()
	}
	
	const showSearchResultsContainer = function () {
		console.groupCollapsed("Package.showSearchResultsContainer")
		// ----
		
		$(_package_product_search_results).show()
		
		// ----
		console.groupEnd()
	}
	
	const hideSearchResultsContainer = function () {
		console.groupCollapsed("Package.hideSearchResultsContainer")
		// ----
		
		$(_package_product_search_results).hide()
		
		// ----
		console.groupEnd()
	}
	
	const initPackageProductList = function (_package, package_products) {
		console.groupCollapsed("Package.initPackageProductList")
		// ----
		
		if (!_package) {
			return
		}
		
		let packageProducts = (package_products) ? package_products : []
		
		if (_package_edit_products) {
			clearPackageProductList()
			
			$.each(packageProducts, function (k, package_product) {
				let units = (package_product.units) ? package_product.units : []
				let productId = (!isNaN(parseInt(package_product.id))) ? parseInt(package_product.id) : null
				
				$.each(units, function (i, unit) {
					let unitId = (!isNaN(parseInt(unit.id))) ? parseInt(unit.id) : null
					
					if (productId !== null && unitId !== null) {
						let productMapId = `${productId}_${unitId}`
						let detail = setPackageProduct(package_product, unit)
						
						Package.products.set(productMapId, detail)
						
						addPackageProductListItem(package_product, unit)
						
					}
					
				})
				
			})
			
		}
		
		// ----
		console.groupEnd()
	}
	
	const defaultPackageProduct = function () {
		console.groupCollapsed("Package.defaultPackageProduct")
		// ----
		
		let details = {
			category_id: null,
			package_id: null,
			product_id: null,
			unit_id: null,
			product_label: null,
			unit_label: null,
			product_name: null,
			unit_name: null,
			day_span: 1,
			sort_order: 0,
			allow_substitution: 1,
			enabled: 1,
			date_created: formatDateMySQL(),
			created_by: userId,
			date_modified: formatDateMySQL(),
			modified_by: userId,
			note: null,
		}
		
		// ----
		console.groupEnd()
		return details
	}
	
	const setPackageProduct = function (package_product, unit) {
		console.groupCollapsed("Package.setPackageProduct")
		// ----
		
		let detail = defaultPackageProduct()
		let categoryId = (package_product && !isNaN(parseInt(package_product.category_id))) ? parseInt(package_product.category_id) : null
		let packageId = (Package.id !== null) ? Package.id : null
		let productId = (package_product && !isNaN(parseInt(package_product.id))) ? parseInt(package_product.id) : null
		let unitId = (unit && !isNaN(parseInt(unit.id))) ? parseInt(unit.id) : null
		let productLabel = (package_product && package_product.label) ? package_product.label : ""
		let unitLabel = (unit && unit.label) ? unit.label : ""
		let productName = (package_product && package_product.name) ? package_product.name : ""
		let unitName = (unit && unit.name) ? unit.name : ""
		let daySpan = (package_product && !isNaN(parseInt(package_product.day_span))) ? parseInt(package_product.day_span) : null
		let sortOrder = (package_product && !isNaN(parseInt(package_product.sort_order))) ? parseInt(package_product.sort_order) : 0
		let allowSubstitution = (unit && !isNaN(parseInt(unit.allow_substitution))) ? parseInt(unit.allow_substitution) : 1
		let enabled = (package_product && !isNaN(parseInt(package_product.enabled))) ? parseInt(package_product.enabled) : null
		let dateCreated = (package_product && package_product.date_created) ? package_product.date_created : formatDateMySQL()
		let dateModified = (package_product && package_product.date_modified) ? package_product.date_modified : formatDateMySQL()
		let createdBy = (package_product && !isNaN(parseInt(package_product.created_by))) ? parseInt(package_product.created_by) : userId
		let modifiedBy = (package_product && !isNaN(parseInt(package_product.modified_by))) ? parseInt(package_product.modified_by) : userId
		let note = (package_product && package_product.note) ? package_product.note : null
		
		/*
        console.log("packageId", packageId)
        console.log("productId", productId)
        console.log("unitId", unitId)
        console.log("productLabel", productLabel)
        console.log("unitLabel", unitLabel)
        console.log("productName", productName)
        console.log("unitName", unitName)
        console.log("daySpan", daySpan)
        console.log("allowSubstitution", allowSubstitution)
        console.log("enabled", enabled)
        console.log("dateCreated", dateCreated)
        console.log("dateModified", dateModified)
        console.log("createdBy", createdBy)
        console.log("modifiedBy", modifiedBy)
        console.log("note", note)
        console.log("package_product", package_product)
        console.log("unit", unit)
        console.log("detail", detail)
        //*/
		detail.category_id = categoryId
		detail.package_id = packageId
		detail.product_id = productId
		detail.unit_id = unitId
		detail.product_label = productLabel
		detail.unit_label = unitLabel
		detail.product_name = productName
		detail.unit_name = unitName
		detail.day_span = daySpan
		detail.sort_order = sortOrder
		detail.allow_substitution = allowSubstitution
		detail.enabled = enabled
		detail.date_created = dateCreated
		detail.created_by = createdBy
		detail.date_modified = dateModified
		detail.modified_by = modifiedBy
		detail.note = note
		
		// ----
		console.groupEnd()
		return detail
	}
	
	const clearPackageProductList = function () {
		console.groupCollapsed("Package.clearPackageProductList")
		// ----
		
		if (_package_edit_products) {
			$(_package_edit_products).empty()
		}
		
		// ----
		console.groupEnd()
	}
	
	const buildEvent = function (category, product, unit) {
		console.groupCollapsed("Package.buildEvent")
		// ----
		
		if (!category || !product || !unit) {return}
		
		let productId = (product.id && !isNaN(parseInt(product.id))) ? parseInt(product.id) : null
		let productName = (product.name) ? product.name : null
		let productLabel = (product.label) ? product.label : (product.name) ? product.name : null
		let unitId = (unit.id && !isNaN(parseInt(unit.id))) ? parseInt(unit.id) : null
		let unitName = (unit.name) ? unit.name : null
		let unitLabel = (unit.label) ? unit.label : (unit.name) ? unit.name : null
		let categoryId = (category.id && !isNaN(parseInt(category.id))) ? parseInt(category.id) : null
		let categoryName = (category.name) ? category.name : null
		if (productId !== null && unitId !== null && categoryId !== null) {
		
		}
		
		let allowSubstitution = (product.allow_substitution && !isNaN(parseInt(product.allow_substitution))) ? parseInt(product.allow_substitution) : 0
		
		let className = (categoryName !== null) ? categoryName.replace(/ /g, '_').toLowerCase() : ""
		let departDate = (product && product.depart_date) ? product.depart_date : "2022-01-01"
		let departTime = (product && product.depart_time) ? product.depart_time : "12:00"
		let arriveDate = (product && product.arrive_date) ? product.arrive_date : "2022-01-01"
		let arriveTime = (product && product.arrive_time) ? product.arrive_time : "13:00"
		
		let fromDate = moment(`${departDate} ${departTime}:00`, "YYYY-MM-DD hh:mm:ss")
		let toDate = moment(`${arriveDate} ${arriveTime}:00`, "YYYY-MM-DD hh:mm:ss")
		let end = moment(toDate)
		let startTime = moment(fromDate)
		let duration = moment.duration(end.diff(startTime))
		let hours = moment.duration(end.diff(startTime)).asHours()
		
		//*
		console.log("product", product)
		console.log("category", category)
		console.log("unit", unit)
		console.log("fromDate", fromDate)
		console.log("toDate", toDate)
		console.log("duration", duration)
		console.log("hours", hours)
		//*/
		
		let eventDetail = {
			category_id: categoryId,
			data: {
				category: category,
				product: product,
				unit: unit,
			},
			product_id: productId,
			stick: true,
			unit_id: unitId,
		}
		
		eventDetail.title = unitLabel
		eventDetail.className = className
		
		switch (categoryId) {
			case 1:
				eventDetail.allDay = true
				eventDetail.rendering = "background"
				eventDetail.backgroundColor = categoryColors.hotels.background
				eventDetail.textColor = categoryColors.hotels.color
				eventDetail.borderColor = categoryColors.hotels.border
				eventDetail.editable = false
				eventDetail.durationEditable = false
				eventDetail.startEditable = false
				eventDetail.overlap = true
				
				break
			case 2:
				eventDetail.allDay = false
				eventDetail.durationEditable = true
				eventDetail.startEditable = true
				eventDetail.overlap = true
				eventDetail.duration = "1:00"
				break
			case 3:
				eventDetail.allDay = false
				eventDetail.durationEditable = true
				eventDetail.startEditable = true
				eventDetail.overlap = true
				eventDetail.duration = "01:00"
				break
			case 4:
				eventDetail.allDay = false
				eventDetail.durationEditable = true
				eventDetail.startEditable = true
				eventDetail.overlap = true
				eventDetail.duration = "01:00"
				break
			case 5:
				eventDetail.allDay = false
				eventDetail.durationEditable = true
				eventDetail.startEditable = true
				eventDetail.overlap = true
				eventDetail.duration = "01:00"
				break
			case 6:
				eventDetail.allDay = false
				eventDetail.durationEditable = true
				eventDetail.startEditable = true
				eventDetail.overlap = true
				eventDetail.duration = "01:00"
				break
			case 7:
				eventDetail.allDay = false
				eventDetail.durationEditable = true
				eventDetail.startEditable = true
				eventDetail.overlap = true
				eventDetail.duration = "01:00"
				break
			case 8:
				eventDetail.allDay = false
				eventDetail.durationEditable = true
				eventDetail.startEditable = true
				eventDetail.overlap = true
				eventDetail.duration = "01:00"
				break
			case 9:
				eventDetail.allDay = false
				eventDetail.durationEditable = true
				eventDetail.startEditable = true
				eventDetail.overlap = true
				break
			default:
				break
		}
		
		// ----
		console.groupEnd()
		return eventDetail
	}
	
	const buildPackageProductListItem = function (package_product, unit) {
		console.groupCollapsed("Package.buildPackageProductListItem")
		if (!package_product || !unit) {
			return
		}
		// ----
		
		let product = {
			amenities: (package_product.amenities) ? package_product.amenities : [],
			arrive_date: (package_product.arrive_date) ? package_product.arrive_date : null,
			arrive_time: (package_product.arrive_time) ? package_product.arrive_time : null,
			arrive_to: (package_product.arrive_to) ? package_product.arrive_to : null,
			category_id: (package_product.category_id) ? package_product.category_id : null,
			city_id: (package_product.city_id) ? package_product.city_id : null,
			cover_image: (package_product.cover_image) ? package_product.cover_image : null,
			currency_id: (package_product.currency_id) ? package_product.currency_id : null,
			day_span: (package_product.day_span) ? package_product.day_span : null,
			depart_date: (package_product.depart_date) ? package_product.depart_date : null,
			depart_from: (package_product.depart_from) ? package_product.depart_from : null,
			depart_time: (package_product.depart_time) ? package_product.depart_time : null,
			description_long: (package_product.description_long) ? package_product.description_long : null,
			description_short: (package_product.description_short) ? package_product.description_short : null,
			enabled: (package_product.enabled) ? package_product.enabled : 1,
			id: (package_product.id) ? package_product.id : null,
			keywords: (package_product.keywords) ? package_product.keywords : [],
			label: (package_product.label) ? package_product.label : null,
			name: (package_product.name) ? package_product.name : null,
			note: (package_product.note) ? package_product.note : null,
			postal_code: (package_product.postal_code) ? package_product.postal_code : null,
			pricing_strategy_types_id: (package_product.name) ? package_product.pricing_strategy_types_id : null,
			provider_id: (package_product.provider_id) ? package_product.provider_id : null,
			rating_types_id: (package_product.rating_types_id) ? package_product.rating_types_id : null,
			sku: (package_product.sku) ? package_product.sku : null,
			street_1: (package_product.street_1) ? package_product.street_1 : null,
			street_2: (package_product.street_2) ? package_product.street_2 : null,
		}
		let category = (package_product.category) ? package_product.category : {}
		let productId = (!isNaN(parseInt(package_product.id))) ? parseInt(package_product.id) : null
		let productLabel = (package_product.label) ? package_product.label : (package_product.name) ? package_product.name : null
		let unitLabel = (unit.label) ? unit.label : (unit.name) ? unit.name : null
		let unitId = (!isNaN(parseInt(unit.id))) ? parseInt(unit.id) : null
		let categoryName = (category.name) ? category.name : null
		let categoryIcon = (category.icon) ? category.icon : "fas fa-hotel"
		let listItemId = (productId !== null && unitId !== null) ? `package_product_item_${productId}_${unitId}` : null
		let className = (categoryName !== null) ? categoryName.replace(/ /g, '_').toLowerCase() : ""
		if (listItemId === null || listItemId === "") {
			return
		}
		let $listGroupItem = $(`<li id="${listItemId}" class="list-group-item list-item ${className} px-1" data-productid="${productId}" data-unitid="${unitId}" />`)
		let $listGroupItemRow1 = $(`<div class="row"/>`)
		let $listGroupItemRow1Column1 = $(`<div class="col-12 my-2 mx-auto"/>`)
		let $listGroupItemMedia = $(`<div class="media"/>`)
		let $listGroupItemCategoryBlock = $(`<div class="d-flex mr-3"/>`)
		let $listGroupItemCategoryBlockLink = $(`<a type="button" class="btn-floating btn-sm m-0 list-item-icon waves-effect waves-light"/>`)
		let $listGroupItemCategoryBlockLinkIcon = $(`<i class="${categoryIcon}"/>`)
		let $listGroupItemMediaBody = $(`<div class="media-body"/>`)
		let $listGroupItemMediaHeading = $(`<h6 class="d-flex"/>`)
		let $listGroupItemMediaHeadingText = $(`<a href="javascript:void(0);" class="flex-grow-1"/>`)
		let $listGroupItemMediaHeadingTextProductNameDisplay = $(`<p class="font-weight-bold mb-2 text-truncate list-item-product-name-display" data-display="product-name"/>`)
		let $listGroupItemMediaHeadingTextUnitNameDisplay = $(`<p class="font-weight-bold text-muted mb-0 text-truncate list-item-unit-name-display" data-display="unit-name"/>`)
		let $listGroupItemMediaHeadingRemoveButton = $(`<button type="button" class="btn btn-flat text-center text-danger p-1 mx-1 mb-0 mt-0 list-item-remove-button waves-effect waves-light"/>`)
		let $listGroupItemMediaHeadingRemoveButtonIcon = $(`<i class="fas fa-trash-alt"/>`)
		let $listGroupItemMediaHeadingEditButton = $(`<button type="button" class="btn btn-flat text-center text-info p-1 mx-1 mb-0 mt-0 list-item-edit-button waves-effect waves-light"/>`)
		let $listGroupItemMediaHeadingEditButtonIcon = $(`<i class="fas fa-edit"/>`)
		let event = buildEvent(category, product, unit)
		
		let categoryId = (!isNaN(parseInt(category.id))) ? parseInt(category.id) : null
		let unitName = (unit.name) ? unit.name : null
		let productName = (package_product.name) ? package_product.name : null
		
		$listGroupItemMediaHeadingTextProductNameDisplay.html(`${productLabel}`)
		$listGroupItemMediaHeadingTextUnitNameDisplay.html(`${unitLabel}`)
		$listGroupItemCategoryBlockLink.append($listGroupItemCategoryBlockLinkIcon)
		$listGroupItemMediaHeadingText.append($listGroupItemMediaHeadingTextProductNameDisplay)
		$listGroupItemMediaHeadingText.append($listGroupItemMediaHeadingTextUnitNameDisplay)
		$listGroupItemMediaHeadingRemoveButton.append($listGroupItemMediaHeadingRemoveButtonIcon)
		$listGroupItemMediaHeadingEditButton.append($listGroupItemMediaHeadingEditButtonIcon)
		$listGroupItemMediaHeading.append($listGroupItemMediaHeadingText)
		$listGroupItemMediaHeading.append($listGroupItemMediaHeadingRemoveButton)
		$listGroupItemMediaHeading.append($listGroupItemMediaHeadingEditButton)
		$listGroupItemCategoryBlock.append($listGroupItemCategoryBlockLink)
		$listGroupItemMediaBody.append($listGroupItemMediaHeading)
		$listGroupItemMedia.append($listGroupItemCategoryBlock)
		$listGroupItemMedia.append($listGroupItemMediaBody)
		$listGroupItemRow1Column1.append($listGroupItemMedia)
		$listGroupItemRow1.append($listGroupItemRow1Column1)
		$listGroupItem.append($listGroupItemRow1)
		
		$listGroupItemMediaHeadingEditButton
			.on("click", function () {
				console.groupCollapsed("listGroupItemMediaHeadingEditButtonIcon: click")
				// ----
				
				let productId, unitId
				let list_item = $(this).parents("li")[0]
				let data = (list_item && list_item.dataset) ? list_item.dataset : null
				
				if (data !== null) {
					productId = (data && !isNaN(parseInt(data.productid))) ? parseInt(data.productid) : null
					unitId = (data && !isNaN(parseInt(data.unitid))) ? parseInt(data.unitid) : null
					let productMapId = `${productId}_${unitId}`
					let packageProduct = Package.products.get(productMapId)
					
					if (packageProduct) {
						populatePackageProductEditForm(packageProduct)
					}
					
				}
				
				// ----
				console.groupEnd()
			})
		
		$listGroupItemMediaHeadingRemoveButton
			.on("click", function () {
				console.groupCollapsed("listGroupItemMediaHeadingRemoveButton: click")
				// ----
				
				let productId, unitId
				let list_item = $(this).parents("li")[0]
				let data = (list_item && list_item.dataset) ? list_item.dataset : null
				
				if (data !== null) {
					productId = (data && !isNaN(parseInt(data.productid))) ? parseInt(data.productid) : null
					unitId = (data && !isNaN(parseInt(data.unitid))) ? parseInt(data.unitid) : null
					let productMapId = `${productId}_${unitId}`
					let packageProduct = Package.products.get(productMapId)
					
					if (packageProduct) {
						removeProductFromPackage(packageProduct)
					}
					
				}
				
				// ----
				console.groupEnd()
			})
		
		$listGroupItem
			.data("event", event)
			.draggable({
				zIndex: 999,
				revert: true,
				revertDuration: 0,
			})
		
		// ----
		console.groupEnd()
		return $listGroupItem
	}
	
	const addPackageProductListItem = function (package_product, unit) {
		console.groupCollapsed("Package.addPackageProductListItem")
		// ----
		
		if (_package_edit_products && package_product && unit) {
			$(_package_edit_products)
				.append(buildPackageProductListItem(package_product, unit))
		}
		
		// ----
		console.groupEnd()
	}
	
	const removePackageProductListItem = function (productId, unitId) {
		console.groupCollapsed("Package.removePackageProductListItem")
		// ----
		
		if (_package_edit_products && productId && unitId) {
			let listId = `package_product_item_${productId}_${unitId}`
			let productMapId = `${productId}_${unitId}`
			let packageProduct = Package.products.get(productMapId)
			
			console.log("Package.products", Package.products)
			console.log("Package.events", Package.events)
			console.log("Package.hotelEvents", Package.hotelEvents)
			console.log("listId", listId)
			console.log("productMapId", productMapId)
			console.log("packageProduct", packageProduct)
			console.log("productId", productId)
			console.log("unitId", unitId)
			
		}
		
		// ----
		console.groupEnd()
	}
	
	const initPackageProductEditForm = function () {
		console.groupCollapsed("Package.initPackageProductEditForm")
		// ----
		
		if (_package_product_edit_form) {
			hidePackageProductEditForm()
		}
		
		// ----
		console.groupEnd()
	}
	
	const showPackageProductEditForm = function () {
		console.groupCollapsed("Package.showPackageProductEditForm")
		// ----
		
		if (_package_product_edit_form) {
			$(_package_product_edit_form).show()
			disableProductList()
		}
		
		// ----
		console.groupEnd()
	}
	
	const hidePackageProductEditForm = function () {
		console.groupCollapsed("Package.hidePackageProductEditForm")
		// ----
		
		if (_package_product_edit_form) {
			$(_package_product_edit_form).hide()
			enableProductList()
		}
		
		// ----
		console.groupEnd()
	}
	
	const populatePackageProductEditForm = function (package_product) {
		console.groupCollapsed("Package.populatePackageProductEditForm")
		// ----
		
		if (package_product && _package_product_edit_form) {
			console.log("package_product", package_product)
			clearPackageProductEditForm()
			
			let productId = (package_product.product_id) ? package_product.product_id : ""
			let unitId = (package_product.unit_id) ? package_product.unit_id : ""
			let productName = (package_product.product_name) ? package_product.product_name : ""
			let productLabel = (package_product.product_label) ? package_product.product_label : productName
			let unitName = (package_product.unit_name) ? package_product.unit_name : ""
			let unitLabel = (package_product.unit_label) ? package_product.unit_label : unitName
			let daySpan = (package_product.day_span) ? package_product.day_span : 1
			let allowSubstitution = !!(package_product.allow_substitution && !isNaN(parseInt(package_product.allow_substitution)) && parseInt(package_product.allow_substitution) === 1)
			
			_package_product_edit_form_product_id.value = productId
			_package_product_edit_form_unit_id.value = unitId
			_package_product_edit_form_product_name.innerHTML = `${productName}`
			_package_product_edit_form_unit_name.innerHTML = `${unitName}`
			_package_product_edit_form_product_label.value = `${productLabel}`
			_package_product_edit_form_unit_label.value = `${unitLabel}`
			_package_product_edit_form_day_span.value = daySpan
			_package_product_edit_form_allow_substitution.checked = allowSubstitution
			
			showPackageProductEditForm()
		}
		
		// ----
		console.groupEnd()
	}
	
	const clearPackageProductEditForm = function () {
		console.groupCollapsed("Package.clearPackageProductEditForm")
		// ----
		
		if (_package_product_edit_form) {
			_package_product_edit_form_product_id.value = ""
			_package_product_edit_form_unit_id.value = ""
			_package_product_edit_form_product_name.innerHTML = ""
			_package_product_edit_form_unit_name.innerHTML = ""
			_package_product_edit_form_product_label.value = ""
			_package_product_edit_form_unit_label.value = ""
			_package_product_edit_form_day_span.value = ""
			_package_product_edit_form_allow_substitution.checked = true
		}
		
		// ----
		console.groupEnd()
	}
	
	const clearEditPackageForm = function () {
		console.groupCollapsed("Package.clearEditPackageForm")
		// ----
		
		_package_id.value = ""
		_package_name.value = ""
		_package_day_span.value = 1
		_package_city_id.value = ""
		_package_min_pax.value = 1
		_package_max_pax.value = 1
		_package_description_long.value = ""
		_package_description_short.value = ""
		
		_package_city_name_filter.value = ""
		_package_name_filter.value = ""
		
		Package.availableStartPicker.set("clear")
		Package.availableEndPicker.set("clear")
		
		_package_cost.value = 0
		_package_price.value = 0
		_package_margin.value = 0
		_package_enabled.checked = true
		
		Package.availableStartPicker.set("select", false)
		Package.availableEndPicker.set("select", false)
		
		_package_cost_icon.innerHTML = `&dollar;`
		_package_margin_icon.innerHTML = `&dollar;`
		_package_price_icon.innerHTML = `&dollar;`
		
		// ----
		console.groupEnd()
	}
	
	const populateEditPackageForm = function (_package) {
		console.groupCollapsed("Package.populateEditPackageForm")
		// ----
		
		let currency = (_package && _package.currency) ? _package.currency : {}
		let city = (_package && _package.city) ? _package.city : {}
		let symbol = (currency.symbol) ? currency.symbol : "&dollar;"
		let startDate = (_package && _package.available_start) ? _package.available_start : false
		let endDate = (_package && _package.available_end) ? _package.available_end : false
		let cityNameFilter = formatCityName(city)
		
		clearEditPackageForm()
		
		_package_id.value = (_package && !isNaN(parseInt(_package.id))) ? parseInt(_package.id) : null
		_package_day_span.value = (_package && !isNaN(parseInt(_package.day_span))) ? parseInt(_package.day_span) : 1
		_package_city_id.value = (_package && !isNaN(parseInt(_package.city_id))) ? parseInt(_package.city_id) : null
		_package_min_pax.value = (_package && !isNaN(parseInt(_package.min_pax))) ? parseInt(_package.min_pax) : 1
		_package_max_pax.value = (_package && !isNaN(parseInt(_package.max_pax))) ? parseInt(_package.max_pax) : 1
		
		_package_city_name_filter.value = cityNameFilter
		_package_description_long.value = (_package && _package.description_long) ? _package.description_long : null
		_package_description_short.value = (_package && _package.description_short) ? _package.description_short : null
		
		_package_cost.value = (_package && !isNaN(parseInt(_package.cost))) ? parseInt(_package.cost) : 0
		_package_price.value = (_package && !isNaN(parseInt(_package.price))) ? parseInt(_package.price) : 0
		_package_margin.value = (_package && !isNaN(parseInt(_package.margin))) ? parseInt(_package.margin) : 0
		
		_package_name_filter.value = (_package && _package.name) ? _package.name : null
		_package_name.value = (_package && _package.name) ? _package.name : null
		
		Package.availableStartPicker.set("select", startDate)
		Package.availableEndPicker.set("select", endDate)
		
		_package_cost_icon.innerHTML = symbol
		_package_margin_icon.innerHTML = symbol
		_package_price_icon.innerHTML = symbol
		
		// ----
		console.groupEnd()
	}
	
	const formatPackageAgendaEvent = function (event) {
		console.groupCollapsed("Package.formatPackageAgendaEvent")
		// ----
		
		let productId = (event && !isNaN(parseInt(event.product_id))) ? parseInt(event.product_id) : null
		let unitId = (event && !isNaN(parseInt(event.unit_id))) ? parseInt(event.unit_id) : null
		let categoryId = (event && !isNaN(parseInt(event.category_id))) ? parseInt(event.category_id) : null
		let productMapId = `${productId}_${unitId}`
		let product = Package.products.get(productMapId)
		
		//*
		console.log("event", event)
		console.log("productId", productId)
		console.log("unitId", unitId)
		console.log("productMapId", productMapId)
		console.log("categoryId", categoryId)
		console.log("Package.products", Package.products)
		//*/
		
		if (product) {
			console.log("product", product)
		}
		
		// ----
		console.groupEnd()
	}
	
	const addPackageAgendaEvent = function (event) {
		console.groupCollapsed("Package.addPackageAgendaEvent")
		// ----
		
		formatPackageAgendaEvent()
		
		let productId = (event && !isNaN(parseInt(event.product_id))) ? parseInt(event.product_id) : null
		let unitId = (event && !isNaN(parseInt(event.unit_id))) ? parseInt(event.unit_id) : null
		let categoryId = (event && !isNaN(parseInt(event.category_id))) ? parseInt(event.category_id) : null
		let productMapId = `${categoryId}-${productId}-${unitId}`
		let product = Package.products.get(productMapId)
		
		// ----
		console.groupEnd()
	}
	
	const removePackageAgendaEvent = function (eventId) {
		console.groupCollapsed("Package.removePackageAgendaEvent")
		// ----
		
		if (eventId) {
			//confirmDialog(`Would you like to remove?`, (ans) => {
			//if (ans) {
			let fetchedEvents = Package.agenda.eventFetch(eventId)
			let myEvent = (fetchedEvents && fetchedEvents[0]) ? fetchedEvents[0] : null
			
			if (myEvent) {
				
				let packageId = (!isNaN(parseInt(Package.id))) ? parseInt(Package.id) : null
				let productId = (!isNaN(parseInt(myEvent.product_id))) ? parseInt(myEvent.product_id) : null
				let categoryId = (!isNaN(parseInt(myEvent.category_id))) ? parseInt(myEvent.category_id) : null
				let unitId = (!isNaN(parseInt(myEvent.unit_id))) ? parseInt(myEvent.unit_id) : null
				let dayId = (myEvent.start) ? moment(myEvent.start).dayOfYear() : null
				let startDate = (myEvent.start) ? moment(myEvent.start).format("YYYY-MM-DD") : null
				let id = `${dayId}_${packageId}_${productId}_${unitId}`
				
				let packageProductEvent = Package.events.get(id)
				
				if (packageProductEvent) {
					Package.events.delete(id)
					Package.agenda.eventRemove(eventId)
				}
				
				if (categoryId === 1) {
					let myHotelEvent = Package.hotelEvents.get(startDate)
					console.log("Package.hotelEvents", Package.hotelEvents)
					if (myHotelEvent) {
						console.log("myHotelEvent", myHotelEvent)
						Package.hotelEvents.delete(startDate)
					}
					
				}
				console.log("Package.hotelEvents", Package.hotelEvents)
			}
			
			//}
			//})
		}
		
		// ----
		console.groupEnd()
	}
	
	const buildAgenda = function (_package) {
		console.groupCollapsed("Package.buildAgenda")
		// ----
		
		if (_package_agenda) {
			Package.agenda = $(_package_agenda).agenda({
				package: _package,
			})
		}
		
		console.log("Package.agenda", Package.agenda)
		
		// ----
		console.groupEnd()
	}
	
	const getAgenda = function () {
		console.groupCollapsed("Package.getAgenda")
		// ----
		
		let agenda = []
		let hotelEvents = (Array.from(Package.hotelEvents.values())) ? Array.from(Package.hotelEvents.values()) : []
		let events = (Array.from(Package.events.values())) ? Array.from(Package.events.values()) : []
		
		$.each(hotelEvents, function (k, event) {
			
			let detail = {
				package_id: (_package_id && !isNaN(parseInt(_package_id.value))) ? parseInt(_package_id.value) : null,
				product_id: (event && !isNaN(parseInt(event.product_id))) ? parseInt(event.product_id) : null,
				unit_id: (event && !isNaN(parseInt(event.unit_id))) ? parseInt(event.unit_id) : null,
				day: (event && event.data && !isNaN(parseInt(event.data.day))) ? parseInt(event.data.day) : null,
				start: (event && event.start) ? moment(event.start).format("hh:mm") : null,
				end: (event && event.end) ? moment(event.end).format("hh:mm") : null,
				all_day: 1,
				enabled: 1,
			}
			
			agenda.push(detail)
		})
		
		$.each(events, function (k, event) {
			console.log("events", event)
			
			let detail = {
				package_id: (_package_id && !isNaN(parseInt(_package_id.value))) ? parseInt(_package_id.value) : null,
				product_id: (event && !isNaN(parseInt(event.product_id))) ? parseInt(event.product_id) : null,
				unit_id: (event && !isNaN(parseInt(event.product_id))) ? parseInt(event.product_id) : null,
				day: (event && event.data && !isNaN(parseInt(event.data.day))) ? parseInt(event.data.day) : null,
				start: (event && event.start) ? moment(event.start).format("hh:mm") : null,
				end: (event && event.end) ? moment(event.end).format("hh:mm") : null,
				all_day: 0,
				enabled: 1,
			}
			
			agenda.push(detail)
		})
		
		// ----
		console.groupEnd()
		return agenda
	}
	
	const buildUpdateRecord = function () {
		console.groupCollapsed("Package.buildUpdateRecord")
		// ----
		
		let _products = []
		let _events = getAgenda()
		
		let detail = {
			id: 1,
			products: _products,
			events: _events,
		}
		
		// ----
		console.groupEnd()
		return detail
	}
	
	const update = function () {
		console.groupCollapsed("Package.update")
		// ----
		
		let detail = buildUpdateRecord()
		console.log("detail", detail)
		
		// ----
		console.groupEnd()
	}
	
	const disableProductList = function () {
		console.groupCollapsed("Package.disableProductList()")
		// ----
		
		let elements = (_package_edit_products) ? _package_edit_products.querySelectorAll("button[type=button]") : []
		let a = (_package_edit_products) ? _package_edit_products.querySelectorAll("a") : []
		
		_package_edit_products_add_button.disabled = true
		_package_product_list_add.disabled = true
		
		elements.forEach(el => {
			el.disabled = true
			$(el).addClass("disabled")
		})
		
		a.forEach(el => {
			el.disabled = true
			$(el).addClass("disabled")
		})
		
		$(_package_edit_products_add_button).addClass("disabled")
		$(_package_product_list_add).addClass("disabled")
		
		// ----
		console.groupEnd()
	}
	
	const enableProductList = function () {
		console.groupCollapsed("Package.enableProductList()")
		// ----
		
		let elements = (_package_edit_products) ? _package_edit_products.querySelectorAll("button[type=button]") : []
		let a = (_package_edit_products) ? _package_edit_products.querySelectorAll("a") : []
		
		_package_edit_products_add_button.disabled = false
		_package_product_list_add.disabled = false
		
		elements.forEach(el => {
			el.disabled = false
			$(el).removeClass("disabled")
		})
		
		a.forEach(el => {
			el.disabled = false
			$(el).removeClass("disabled")
		})
		
		$(_package_edit_products_add_button).removeClass("disabled")
		$(_package_product_list_add).removeClass("disabled")
		
		// ----
		console.groupEnd()
	}
	
	return {
		id: null,
		availableStart: null,
		availableEnd: null,
		productList: null,
		all: new Map(),
		products: new Map(),
		detail: {},
		availableStartPicker: null,
		availableEndPicker: null,
		validator: null,
		events: new Map(),
		hotelEvents: new Map(),
		agenda: null,
		init: function (settings) {
			init(settings)
		},
		initIndexPage: function (settings) {
			initIndexPage(settings)
		},
		initEditPage: function (settings) {
			initEditPage(settings)
		},
		edit: function (data) {
			edit(data)
		},
		add: function (_this) {
			add(_this)
		},
		editBg: function (e) {
		
		},
		addEvent: function (event) {
			addPackageAgendaEvent(event)
		},
		getAgenda: function () {
			return getAgenda()
		},
		loadEditEvent: function (event) {
			loadEditEvent(event)
		},
	}
	
})()
let testProductList = [
	{
		"street_1": "6840 Almeda Rd",
		"street_2": null,
		"postal_code": "77030",
		"description_short": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum ante eget sodales congue. Sed ligula nisi, faucibus eget ullamcorper sit amet, fringilla id enim. Pellentesque sapien nibh, aliquam nec imperdiet in, gravida sed turpis viverra.",
		"display_short": "Houston (TX, US)",
		"display_medium": "Houston (TX, USA)",
		"display_long": "Houston (Texas, United States)",
		"id": 1,
		"name": "Hilton Garden Inn Houston Medical Center",
		"rating_id": 3,
		"rating_text": "<li class=''><i class='fas fa-star'></i></li><li class=''><i class='fas fa-star'></i></li><li class=''><i class='fas fa-star'></i></li>",
		"category": {
			"id": 1,
			"pricing_strategy_types_id": null,
			"attribute_id": "HOT",
			"name": "Hotels",
			"icon": "fas fa-hotel",
			"view_product_index": 1,
			"view_product_index_filter": 1,
			"view_product_index_search": 1,
			"view_product_edit": 1,
			"view_product_package_edit": 1,
			"view_product_package_index": 1,
			"all_day": 1,
			"overlap": 1,
			"editable": 1,
			"duration_editable": 0,
			"start_editable": 0,
			"display": "block",
			"background_color": "#c2f5ff",
			"text_color": "#0bb2d4",
			"border_color": "#0099b8",
			"sort_order": 0,
			"enabled": 1,
			"date_created": "2022-04-08 13:09:21",
			"created_by": 4,
			"date_modified": "2022-04-08 13:09:21",
			"modified_by": 4,
			"note": null,
		},
		"country": {
			"id": 219,
			"currency_id": 5,
			"sort_order": 1,
			"name": "United States",
			"iso2": "US",
			"iso3": "USA",
			"blurb": null,
			"enabled": 1,
			"date_created": "2021-08-03 13:04:10",
			"created_by": 4,
			"date_modified": "2021-08-03 15:13:45",
			"modified_by": 4,
			"note": null,
		},
		"province": {
			"id": 51,
			"country_id": 219,
			"name": "Texas",
			"iso2": "TX",
			"iso3": null,
			"sort_order": 1,
			"blurb": null,
			"enabled": 1,
			"date_created": "2022-04-08 13:09:21",
			"created_by": 4,
			"date_modified": "2022-04-08 13:09:21",
			"modified_by": 4,
			"note": null,
		},
		"city": {
			"id": 428,
			"province_id": 51,
			"country_id": 219,
			"sort_order": 999,
			"name": "Houston",
			"blurb": null,
			"is_capital": null,
			"enabled": 1,
			"date_created": "2021-08-03 14:40:07",
			"created_by": 4,
			"date_modified": "2021-08-03 14:40:07",
			"modified_by": 4,
			"note": null,
		},
		"unit": {
			id: 1,
			name: "Test Unit",
			label: "Test Unit Label",
			description_short: "short Desc",
			description_long: "long Desc",
		},
	},
	{
		"street_1": "10500 Katy Freeway",
		"street_2": null,
		"postal_code": "77043",
		"description_short": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum ante eget sodales congue. Sed ligula nisi, faucibus eget ullamcorper sit amet, fringilla id enim. Pellentesque sapien nibh, aliquam nec imperdiet in, gravida sed turpis viverra.",
		"display_short": "Houston (TX, US)",
		"display_medium": "Houston (TX, USA)",
		"display_long": "Houston (Texas, United States)",
		"id": 2,
		"name": "Holiday Inn Express & Suites Houston - Memorial City Centre",
		"rating_id": 4,
		"rating_text": "<li class=''><i class='fas fa-star'></i></li><li class=''><i class='fas fa-star'></i></li><li class=''><i class='fas fa-star'></i></li><li class=''><i class='fas fa-star'></i></li>",
		"category": {
			"id": 1,
			"pricing_strategy_types_id": null,
			"attribute_id": "HOT",
			"name": "Hotels",
			"icon": "fas fa-hotel",
			"view_product_index": 1,
			"view_product_index_filter": 1,
			"view_product_index_search": 1,
			"view_product_edit": 1,
			"view_product_package_edit": 1,
			"view_product_package_index": 1,
			"all_day": 1,
			"overlap": 1,
			"editable": 1,
			"duration_editable": 0,
			"start_editable": 0,
			"display": "block",
			"background_color": "#c2f5ff",
			"text_color": "#0bb2d4",
			"border_color": "#0099b8",
			"sort_order": 0,
			"enabled": 1,
			"date_created": "2022-04-08 13:09:21",
			"created_by": 4,
			"date_modified": "2022-04-08 13:09:21",
			"modified_by": 4,
			"note": null,
		},
		"country": {
			"id": 219,
			"currency_id": 5,
			"sort_order": 1,
			"name": "United States",
			"iso2": "US",
			"iso3": "USA",
			"blurb": null,
			"enabled": 1,
			"date_created": "2021-08-03 13:04:10",
			"created_by": 4,
			"date_modified": "2021-08-03 15:13:45",
			"modified_by": 4,
			"note": null,
		},
		"province": {
			"id": 51,
			"country_id": 219,
			"name": "Texas",
			"iso2": "TX",
			"iso3": null,
			"sort_order": 1,
			"blurb": null,
			"enabled": 1,
			"date_created": "2022-04-08 13:09:21",
			"created_by": 4,
			"date_modified": "2022-04-08 13:09:21",
			"modified_by": 4,
			"note": null,
		},
		"city": {
			"id": 428,
			"province_id": 51,
			"country_id": 219,
			"sort_order": 999,
			"name": "Houston",
			"blurb": null,
			"is_capital": null,
			"enabled": 1,
			"date_created": "2021-08-03 14:40:07",
			"created_by": 4,
			"date_modified": "2021-08-03 14:40:07",
			"modified_by": 4,
			"note": null,
		},
	},
	{
		"street_1": "2222 West Loop South",
		"street_2": null,
		"postal_code": "77027",
		"description_short": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum ante eget sodales congue. Sed ligula nisi, faucibus eget ullamcorper sit amet, fringilla id enim. Pellentesque sapien nibh, aliquam nec imperdiet in, gravida sed turpis viverra.",
		"display_short": "Houston (TX, US)",
		"display_medium": "Houston (TX, USA)",
		"display_long": "Houston (Texas, United States)",
		"id": 3,
		"name": "Royal Sonesta Houston Galleria",
		"rating_id": 4,
		"rating_text": "<li class=''><i class='fas fa-star'></i></li><li class=''><i class='fas fa-star'></i></li><li class=''><i class='fas fa-star'></i></li><li class=''><i class='fas fa-star'></i></li>",
		"category": {
			"id": 1,
			"pricing_strategy_types_id": null,
			"attribute_id": "HOT",
			"name": "Hotels",
			"icon": "fas fa-hotel",
			"view_product_index": 1,
			"view_product_index_filter": 1,
			"view_product_index_search": 1,
			"view_product_edit": 1,
			"view_product_package_edit": 1,
			"view_product_package_index": 1,
			"all_day": 1,
			"overlap": 1,
			"editable": 1,
			"duration_editable": 0,
			"start_editable": 0,
			"display": "block",
			"background_color": "#c2f5ff",
			"text_color": "#0bb2d4",
			"border_color": "#0099b8",
			"sort_order": 0,
			"enabled": 1,
			"date_created": "2022-04-08 13:09:21",
			"created_by": 4,
			"date_modified": "2022-04-08 13:09:21",
			"modified_by": 4,
			"note": null,
		},
		"country": {
			"id": 219,
			"currency_id": 5,
			"sort_order": 1,
			"name": "United States",
			"iso2": "US",
			"iso3": "USA",
			"blurb": null,
			"enabled": 1,
			"date_created": "2021-08-03 13:04:10",
			"created_by": 4,
			"date_modified": "2021-08-03 15:13:45",
			"modified_by": 4,
			"note": null,
		},
		"province": {
			"id": 51,
			"country_id": 219,
			"name": "Texas",
			"iso2": "TX",
			"iso3": null,
			"sort_order": 1,
			"blurb": null,
			"enabled": 1,
			"date_created": "2022-04-08 13:09:21",
			"created_by": 4,
			"date_modified": "2022-04-08 13:09:21",
			"modified_by": 4,
			"note": null,
		},
		"city": {
			"id": 428,
			"province_id": 51,
			"country_id": 219,
			"sort_order": 999,
			"name": "Houston",
			"blurb": null,
			"is_capital": null,
			"enabled": 1,
			"date_created": "2021-08-03 14:40:07",
			"created_by": 4,
			"date_modified": "2021-08-03 14:40:07",
			"modified_by": 4,
			"note": null,
		},
	},
	{
		"street_1": "13213 East Fwy",
		"street_2": null,
		"postal_code": "77015",
		"description_short": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum ante eget sodales congue. Sed ligula nisi, faucibus eget ullamcorper sit amet, fringilla id enim. Pellentesque sapien nibh, aliquam nec imperdiet in, gravida sed turpis viverra.",
		"display_short": "Houston (TX, US)",
		"display_medium": "Houston (TX, USA)",
		"display_long": "Houston (Texas, United States)",
		"id": 4,
		"name": "Studio 6 Houston",
		"rating_id": 4,
		"rating_text": "<li class=''><i class='fas fa-star'></i></li><li class=''><i class='fas fa-star'></i></li><li class=''><i class='fas fa-star'></i></li><li class=''><i class='fas fa-star'></i></li>",
		"category": {
			"id": 1,
			"pricing_strategy_types_id": null,
			"attribute_id": "HOT",
			"name": "Hotels",
			"icon": "fas fa-hotel",
			"view_product_index": 1,
			"view_product_index_filter": 1,
			"view_product_index_search": 1,
			"view_product_edit": 1,
			"view_product_package_edit": 1,
			"view_product_package_index": 1,
			"all_day": 1,
			"overlap": 1,
			"editable": 1,
			"duration_editable": 0,
			"start_editable": 0,
			"display": "block",
			"background_color": "#c2f5ff",
			"text_color": "#0bb2d4",
			"border_color": "#0099b8",
			"sort_order": 0,
			"enabled": 1,
			"date_created": "2022-04-08 13:09:21",
			"created_by": 4,
			"date_modified": "2022-04-08 13:09:21",
			"modified_by": 4,
			"note": null,
		},
		"country": {
			"id": 219,
			"currency_id": 5,
			"sort_order": 1,
			"name": "United States",
			"iso2": "US",
			"iso3": "USA",
			"blurb": null,
			"enabled": 1,
			"date_created": "2021-08-03 13:04:10",
			"created_by": 4,
			"date_modified": "2021-08-03 15:13:45",
			"modified_by": 4,
			"note": null,
		},
		"province": {
			"id": 51,
			"country_id": 219,
			"name": "Texas",
			"iso2": "TX",
			"iso3": null,
			"sort_order": 1,
			"blurb": null,
			"enabled": 1,
			"date_created": "2022-04-08 13:09:21",
			"created_by": 4,
			"date_modified": "2022-04-08 13:09:21",
			"modified_by": 4,
			"note": null,
		},
		"city": {
			"id": 428,
			"province_id": 51,
			"country_id": 219,
			"sort_order": 999,
			"name": "Houston",
			"blurb": null,
			"is_capital": null,
			"enabled": 1,
			"date_created": "2021-08-03 14:40:07",
			"created_by": 4,
			"date_modified": "2021-08-03 14:40:07",
			"modified_by": 4,
			"note": null,
		},
	},
]

//

$.fn.documentToolbar = function (options) {
	const _document_toolbar_print = document.getElementById("document_toolbar_print")
	
	$(_document_toolbar_print)
		.on("click", function () {
			let windowWidth = screen.width
			let windowHeight = screen.height
			let ratio = .77
			let targetElement = $(this).data("target")
			let _target = (targetElement) ? document.getElementById(targetElement) : null
			let divContents = (_target) ? _target.innerHTML : null
			let keepColors = "<style>body {-webkit-print-color-adjust: exact !important; }</style>"
			let allLinks = $("head").clone().find("script").remove().end().html()
			
			if (divContents !== null) {
				let a = window.open("", "_blank", `height=${windowHeight}, width=${windowWidth}`)
				
				a.document.open()
				a.document.write('<html lang="en"><head><title>Location Detail</title>' + keepColors + allLinks + '</head><body onload="window.print()">' + divContents + '</body></html>')
				a.document.close()
				
			}
			
		})
	
	return this
}

$.fn.productLocationForm = function (options) {
	const _product_location_form = document.getElementById("product_location_form")
	
	const _product_location_form_product_id = document.getElementById("product_location_form_product_id")
	const _product_location_form_tab_overview_link = document.getElementById("product_location_form")
	const _product_location_form_tab_detail_link = document.getElementById("product_location_form")
	const _product_location_form_tab_overview = document.getElementById("product_location_form")
	const _product_location_form_tab_detail = document.getElementById("product_location_form")
	const _product_location_overview = document.getElementById("product_location_form")
	
	// Buttons
	const _product_location_form_footer_cancel_button = document.getElementById("product_location_form_footer_cancel_button")
	const _product_location_form_footer_save_button = document.getElementById("product_location_form_footer_save_button")
	
	// Address Form
	const _address_form = document.getElementById("address_form")
	
	// Search Elements
	const _product_location_search_product_id = document.getElementById("product_location_search")
	const _product_location_search = document.getElementById("product_location_search")
	const _product_location_search_category_id = document.getElementById("product_location_search_category_id")
	const _product_location_search_product_name_filter = document.getElementById("product_location_search_product_name_filter")
	const _product_location_search_search_button = document.getElementById("product_location_search_search_button")
	const _product_location_search_clear_button = document.getElementById("product_location_search_clear_button")
	
	// Display elements
	const _product_location_overview_city = document.getElementById("product_location_overview_city")
	const _product_location_overview_name = document.getElementById("product_location_overview_name")
	const _product_location_overview_address = document.getElementById("product_location_overview_address")
	const _product_location_overview_email = document.getElementById("product_location_overview_email")
	const _product_location_overview_phone = document.getElementById("product_location_overview_phone")
	const _product_location_overview_cover_image = document.getElementById("product_location_overview_cover_image")
	const _product_location_overview_product_blurb = document.getElementById("product_location_overview_product_blurb")
	const _product_location_overview_city_blurb = document.getElementById("product_location_overview_city_blurb")
	const _product_location_overview_rating = document.getElementById("product_location_overview_rating")
	const _product_location_map_container = document.getElementById("product_location_map_container")
	const _product_location_map_container_frame = document.getElementById("product_location_map_container_frame")
	
	// Form Elements
	const _product_cover_image = document.getElementById("product_cover_image")
	const _product_location_city_filter = document.getElementById("product_location_city_filter")
	const _product_location_types_id = document.getElementById("product_location_types_id")
	const _product_location_ratings_types_id = document.getElementById("product_location_ratings_types_id")
	const _product_location_product_id = document.getElementById("product_location_product_id")
	const _product_location_product_name_filter = document.getElementById("product_location_product_name_filter")
	const _product_location_category_id = document.getElementById("product_location_category_id")
	const _product_location_contact_phone = document.getElementById("product_location_contact_phone")
	const _product_location_product_contact_email = document.getElementById("product_location_product_contact_email")
	const _product_location_product_ratings_types_id = document.getElementById("product_location_product_ratings_types_id")
	
	// City Search
	const _address_form_city_blurb = document.getElementById("address_form_city_blurb")
	const _address_form_product_blurb = document.getElementById("address_form_product_blurb")
	const _location_country_id_edit = document.getElementById("location_country_id_edit")
	const _location_province_id_edit = document.getElementById("location_province_id_edit")
	const _location_city_id_edit = document.getElementById("location_city_id_edit")
	const _address_form_city_search_close_button = document.getElementById("address_form_city_search_close_button")
	const _product_location_city_edit = document.getElementById("product_location_city_edit")
	const _address_form_city_search = document.getElementById("address_form_city_search")
	const _product_location_country_id = document.getElementById("product_location_country_id")
	const _product_location_province_id = document.getElementById("product_location_province_id")
	const _product_location_city_id = document.getElementById("product_location_city_id")
	const _product_location_city_name = document.getElementById("product_location_city_name")
	const _product_location_province_name = document.getElementById("product_location_province_name")
	const _product_location_province_iso2 = document.getElementById("product_location_province_iso2")
	const _product_location_province_iso3 = document.getElementById("product_location_province_iso3")
	const _product_location_country_name = document.getElementById("product_location_country_name")
	const _product_location_country_iso2 = document.getElementById("product_location_country_iso2")
	const _product_location_country_iso3 = document.getElementById("product_location_country_iso3")
	
	const _location_country_id = document.getElementById("location_country_id")
	const _location_province_id = document.getElementById("location_province_id")
	const _location_city_id = document.getElementById("location_city_id")
	
	const _product_location_form_location_name = document.getElementById("product_location_form_location_name")
	const _product_location_house_number = document.getElementById("product_location_house_number")
	const _product_location_street_1 = document.getElementById("product_location_street_1")
	const _product_location_street_2 = document.getElementById("product_location_street_2")
	const _product_location_postal_code = document.getElementById("product_location_postal_code")
	
	// ----
	
	let globalSelectedCity = false
	let drEvent
	// ----
	
	$(_product_location_product_ratings_types_id)
		.on("change", function () {
			let displayRatings = ""
			let ratings = parseInt($(this).val())
			
			for (let n = 0; n < ratings; n++) {
				displayRatings += `<i class="fas fa-star"></i>`
			}
			
			$(_product_location_overview_rating).html(displayRatings)
		})
	$(_location_country_id_edit)
		.on("click", function () {
			if (!_location_country_id) {
				return
			}
			
			let countryId = (!isNaN(parseInt($(_location_country_id).val()))) ? parseInt($(_location_country_id).val()) : null
			let country = Country.all.get(countryId)
			
			if (country) {
				console.log("country", country)
			}
			
		})
	
	$(_location_province_id_edit)
		.on("click", function () {
			if (!_location_province_id) {
				return
			}
			
			let provinceId = (!isNaN(parseInt($(_location_province_id).val()))) ? parseInt($(_location_province_id).val()) : null
			let province = Province.all.get(provinceId)
			
			if (province) {
				console.log("province", province)
			}
			
		})
	
	$(_location_city_id_edit)
		.on("click", function () {
			if (!_location_city_id) {
				return
			}
			
			let cityId = (!isNaN(parseInt($(_location_city_id).val()))) ? parseInt($(_location_city_id).val()) : null
			let city = City.all.get(cityId)
			
			if (city) {
				console.log("city", city)
			}
			
		})
	
	$(_address_form_city_search_close_button)
		.on("click", function () {
			hideCitySearch()
		})
	
	$(_product_location_city_edit)
		.on("click", function () {
			showCitySearch()
		})
	
	$(_product_location_ratings_types_id)
		.on("change", function () {
		
		})
	
	$(_location_country_id)
		.on("change", function () {
			
			handleAddressDropdownChange()
			
		})
	
	$(_location_province_id)
		.on("change", function () {
			
			handleAddressDropdownChange()
			
		})
	
	$(_location_city_id)
		.on("change", function () {
			
			handleAddressDropdownChange()
			
		})
	
	$(_product_location_contact_phone)
		.on("change", function () {
			_product_location_overview_phone.innerText = $(this).val()
		})
	
	$(_product_location_city_filter)
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
		.on("keyup", function () {
			globalSelectedCity = false
			
		})
		.on("search", function () {
			
			clearCitySearch()
			
		})
		.on("click", function (e) {
			if ($(this).attr("readonly") === "readonly") {
				e.preventDefault()
			} else {
				$(this).select()
			}
		})
		.autocomplete({
			serviceUrl: "/api/v1.0/autocomplete/location_search",
			minChars: 2,
			cache: false,
			dataType: "json",
			triggerSelectOnValidInput: false,
			paramName: "st",
			onSelect: function (suggestion) {
				if (!suggestion || !suggestion.data) {
					return
				}
				
				globalSelectedCity = true
				populateCitySearch((suggestion.data[0]) ? suggestion.data[0] : suggestion.data)
				
			},
		})
	
	$(_product_location_category_id)
		.on("change", function () {
			handleProductLocationDetailCategoryChange()
		})
	
	$(_address_form)
		.on("change", function () {
			handleAddressFormChange()
		})
	
	$(_product_location_form_location_name)
		.on("change", function () {
			handleAddressFormChange()
		})
	
	$(_product_location_types_id)
		.on("change", function () {
			handleAddressFormChange()
		})
	
	$(_product_location_form_footer_save_button)
		.on("click", function () {
			handleSaveRecord()
		})
	
	$(_product_location_form_footer_cancel_button)
		.on("click", function () {
			searchClear()
			formClear()
			detailClear()
			formHide()
		})
	
	$(_product_location_search_clear_button)
		.on("click", function () {
			searchClear()
			formPopulate()
			formShow()
			formEnableFields()
		})
	
	$(_product_location_search_search_button)
		.on("click", function () {
		
		})
	
	$(_product_location_search_category_id)
		.on("change", function () {
			
			let categoryId = (!isNaN(parseInt(this.value))) ? parseInt(this.value) : null
			
			searchHandleCategoryChange(categoryId)
			
		})
	
	$(_product_cover_image)
		.on("change", function () {
			
			handleImageAdd()
			
		})
	
	$(_address_form_city_blurb)
		.on("change", function () {
			_product_location_overview_city_blurb.innerHTML = _address_form_city_blurb.value
		})
	
	$(_address_form_product_blurb)
		.on("change", function () {
			_product_location_overview_product_blurb.innerHTML = _address_form_product_blurb.value
		})
	
	$(_product_location_product_contact_email)
		.on("change", function () {
			
			_product_location_overview_email.innerText = _product_location_product_contact_email.value
			
		})
	
	$(_product_location_product_name_filter)
		.on("change", function () {
			
			_product_location_overview_name.innerText = _product_location_product_name_filter.value
			
		})
	
	// ----
	
	// ----
	
	const populateCitySearch = function (location) {
		console.groupCollapsed("productLocationForm.populateCitySearch")
		// ----
		
		clearCitySearch()
		
		let country = (location.country) ? location.country : {}
		let province = (location.province) ? location.province : {}
		let city = (location.city) ? location.city : {}
		let cityDisplay = formatLocationDisplay(country, province, city)
		
		let countryId = (country && (parseInt(country.id))) ? parseInt(country.id) : null
		let provinceId = (province && (parseInt(province.id))) ? parseInt(province.id) : null
		let cityId = (city && (parseInt(city.id))) ? parseInt(city.id) : null
		
		if (cityDisplay) {
			
			if (countryId !== null) {
				if (provinceId !== null) {
					Province.set_detail(province)
					Province.id = (province.id) ? province.id.toString() : null
					
					if (cityId !== null) {
						City.set_detail(city)
						City.id = (cityId) ? cityId.toString() : null
					}
					
				}
				
				Country.id = countryId
				
				$(_location_country_id)
					.val(countryId)
					.trigger("change")
			} else {
				Country.id = null
				
				$(_location_country_id)
					.val("")
					.trigger("change")
			}
			
		}
		
		if (_product_location_country_id && _product_location_country_iso3 && _product_location_country_iso2 && _product_location_country_name &&
			_product_location_province_id && _product_location_province_iso3 && _product_location_province_iso2 && _product_location_province_name &&
			_product_location_city_id && _product_location_city_name && cityDisplay !== null) {
			
			_product_location_country_id.value = countryId
			_product_location_country_name.value = (country && country.name) ? country.name : ""
			_product_location_country_iso3.value = (country && country.iso3) ? country.iso3 : ""
			_product_location_country_iso2.value = (country && country.iso2) ? country.iso2 : ""
			
			_product_location_province_id.value = provinceId
			_product_location_province_name.value = (province && province.name) ? province.name : ""
			_product_location_province_iso3.value = (province && province.iso3) ? province.iso3 : ""
			_product_location_province_iso2.value = (province && province.iso2) ? province.iso2 : ""
			
			_product_location_city_id.value = cityId
			_product_location_city_name.value = (city && city.name) ? city.name : ""
			
		}
		
		// ----
		console.groupEnd()
	}
	const clearCitySearch = function () {
		console.groupCollapsed("productLocationForm.clearCitySearch")
		// ----
		
		globalSelectedCity = false
		
		Province.id = null
		
		City.id = null
		
		if (_location_country_id) {
			$(_location_country_id)
				.val("")
				.trigger("change")
		}
		
		//*
		if (_product_location_country_id) {
			_product_location_country_id.value = ""
		}
		if (_product_location_province_id) {
			_product_location_province_id.value = ""
		}
		if (_product_location_city_id) {
			_product_location_city_id.value = ""
		}
		if (_product_location_city_name) {
			_product_location_city_name.value = ""
		}
		if (_product_location_province_name) {
			_product_location_province_name.value = ""
		}
		if (_product_location_province_iso2) {
			_product_location_province_iso2.value = ""
		}
		if (_product_location_province_iso3) {
			_product_location_province_iso3.value = ""
		}
		if (_product_location_country_name) {
			_product_location_country_name.value = ""
		}
		if (_product_location_city_name) {
			_product_location_city_name.value = ""
		}
		if (_product_location_country_iso3) {
			_product_location_country_iso3.value = ""
		}
		if (_product_location_country_iso2) {
			_product_location_country_iso2.value = ""
		}
		//*/
		
		// ----
		console.groupEnd()
	}
	const showCitySearch = function () {
		console.groupCollapsed("productLocationForm.showCitySearch")
		// ----
		
		$(_address_form_city_search).show()
		
		// ----
		console.groupEnd()
	}
	const hideCitySearch = function () {
		console.groupCollapsed("productLocationForm.hideCitySearch")
		// ----
		
		$(_address_form_city_search).hide()
		
		// ----
		console.groupEnd()
	}
	
	const handleImageAdd = function () {
		let file = _product_cover_image.files[0]
		let img = document.getElementById("product_location_overview_cover_image")
		let reader = new FileReader()
		
		if (img) {
			img.file = file
			
			reader.onload = (function (aImg) {
				return function (e) {
					aImg.src = e.target.result
				}
			})(img)
			
			reader.readAsDataURL(file)
			
			$(img).show()
		}
	}
	const handleImageRemove = function () {
		let img = document.getElementById("product_location_overview_cover_image")
		if (img) {
			img.src = ""
			$(img).hide()
		}
	}
	const handleAddressDropdownChange = function () {
		console.groupCollapsed("productLocationForm.handleAddressDropdownChange")
		// ----
		
		let country, province, city = {}
		let countryId = (!isNaN(parseInt($(_location_country_id).val()))) ? parseInt($(_location_country_id).val()) : null
		let provinceId = (!isNaN(parseInt($(_location_province_id).val()))) ? parseInt($(_location_province_id).val()) : null
		let cityId = (!isNaN(parseInt($(_location_city_id).val()))) ? parseInt($(_location_city_id).val()) : null
		
		_product_location_country_id.value = ""
		_product_location_country_name.value = ""
		_product_location_country_iso2.value = ""
		_product_location_country_iso3.value = ""
		
		_product_location_province_id.value = ""
		_product_location_province_name.value = ""
		_product_location_province_iso2.value = ""
		_product_location_province_iso3.value = ""
		
		_product_location_city_name.value = ""
		_product_location_city_id.value = ""
		
		if (countryId) {
			country = Country.all.get(countryId)
			
			if (country) {
				_product_location_country_id.value = countryId
				_product_location_country_name.value = (country.name) ? country.name : null
				_product_location_country_iso2.value = (country.iso2) ? country.iso2 : null
				_product_location_country_iso3.value = (country.iso3) ? country.iso3 : null
			} else {
				country = {}
			}
			
		}
		
		if (provinceId) {
			province = Province.all.get(provinceId)
			
			if (province) {
				_product_location_province_id.value = provinceId
				_product_location_province_name.value = (province.name) ? province.name : null
				_product_location_province_iso2.value = (province.iso2) ? province.iso2 : null
				_product_location_province_iso3.value = (province.iso3) ? province.iso3 : null
				
			} else {
				
				province = {}
				
			}
			
		}
		
		if (cityId) {
			city = City.all.get(cityId)
			
			if (city) {
				
				_product_location_city_name.value = (city.name) ? city.name : null
				_product_location_city_id.value = cityId
				
			} else {
				city = {}
			}
			
		}
		
		let cityDisplay = formatLocationDisplay(country, province, city)
		
		_product_location_city_filter.value = cityDisplay
		
		// ----
		console.groupEnd()
	}
	const handleSaveRecord = function () {
		console.groupCollapsed("productLocationForm.handleSaveRecord")
		// ----
		
		// ----
		console.groupEnd()
	}
	const handleProductLocationDetailCategoryChange = function () {
		console.groupCollapsed("productLocationForm.handleProductLocationDetailCategoryChange")
		// ----
		
		if (_product_location_category_id) {
			let categoryId = (!isNaN(parseInt(_product_location_category_id.value))) ? parseInt(_product_location_category_id.value) : null
			
			if (categoryId) {
				initProductLocationDetailAutocomplete(categoryId)
			}
			
		}
		
		// ----
		console.groupEnd()
	}
	const handleAddressFormChange = function () {
		console.groupCollapsed("productLocationForm.handleAddressFormChange")
		// ----
		
		let addressValid = true
		let address = {}
		let locationName = (_product_location_form_location_name) ? _product_location_form_location_name.value : null
		let buildingNumber = (_product_location_house_number) ? _product_location_house_number.value : null
		let street1 = (_product_location_street_1) ? _product_location_street_1.value : null
		let street2 = (_product_location_street_2) ? _product_location_street_2.value : null
		let postalCode = (_product_location_postal_code) ? _product_location_postal_code.value : null
		let cityName = (_product_location_city_name) ? _product_location_city_name.value : null
		let provinceName = (_product_location_province_name) ? _product_location_province_name.value : null
		let provinceISO3 = (_product_location_province_iso3) ? _product_location_province_iso3.value : null
		let provinceISO2 = (_product_location_province_iso2) ? _product_location_province_iso2.value : null
		let countryName = (_product_location_country_name) ? _product_location_country_name.value : null
		let countryISO3 = (_product_location_country_iso3) ? _product_location_country_iso3.value : null
		let countryISO2 = (_product_location_country_iso2) ? _product_location_country_iso2.value : null
		
		address.name = locationName
		address.building_number = buildingNumber
		address.street_1 = street1
		address.street_2 = street2
		address.zipcode = postalCode
		address.city = {}
		address.province = {}
		address.country = {}
		
		if (cityName) {
			address.city.name = cityName
		}
		
		if (provinceName) {
			address.province.name = provinceName
		}
		
		if (provinceISO3) {
			address.province.iso3 = provinceISO3
		}
		
		if (provinceISO2) {
			address.province.iso2 = provinceISO2
		}
		
		if (countryName) {
			address.country.name = countryName
		}
		
		if (countryISO3) {
			address.country.iso3 = countryISO3
		}
		
		if (countryISO2) {
			address.country.iso2 = countryISO2
		}
		
		_product_location_overview_city.innerText = _product_location_city_name.value
		
		renderMap(buildMapsURL(address))
		
		/*
		<address id="product_location_overview_address">
			<p class="p-0 m-0">Calle Larga dei Proverbi</p>
			<p class="p-0 m-0">Cannaregio, 4587</p>
			<p class="p-0 m-0">Calle Larga dei Proverbi</p>
		</address>
		 */
		
		// (provinceName) ? provinceName : (provinceISO3) ? provinceISO3 : (provinceISO2) ? provinceISO2 : null
		// (provinceISO3) ? provinceISO3 : null
		// (provinceISO2) ? provinceISO2 : null
		
		let addressLine1 = (street1 && true) ? `<p class="p-0 m-0">${street1}</p>` : null
		let addressLine2, addressLine3
		
		let displayProvince = (provinceName) ? provinceName : (provinceISO3) ? provinceISO3 : (provinceISO2) ? provinceISO2 : null
		if (displayProvince !== null && buildingNumber !== null) {
			addressLine2 = `<p class="p-0 m-0">${displayProvince}, ${buildingNumber}</p>`
		} else if (displayProvince !== null && buildingNumber === null) {
			addressLine2 = `<p class="p-0 m-0">${displayProvince}</p>`
		} else if (displayProvince === null && buildingNumber !== null) {
			addressLine2 = `<p class="p-0 m-0">${buildingNumber}</p>`
		} else {
			addressLine2 = null
		}
		
		if (cityName !== null && postalCode !== null) {
			addressLine3 = `<p class="p-0 m-0">${postalCode} ${cityName}</p>`
		} else if (cityName !== null && postalCode === null) {
			addressLine3 = `<p class="p-0 m-0">${cityName}</p>`
		} else if (cityName === null && postalCode !== null) {
			addressLine3 = `<p class="p-0 m-0">${postalCode}</p>`
		} else {
			addressLine3 = null
		}
		
		if (_product_location_overview_address) {
			let addressLine = ""
			$(_product_location_overview_address).empty()
			
			if (addressLine1 !== null) {
				addressLine = addressLine + addressLine1
			}
			
			if (addressLine2 !== null) {
				addressLine = addressLine + addressLine2
			}
			
			if (addressLine3 !== null) {
				addressLine = addressLine + addressLine3
			}
			
			$(_product_location_overview_address).html(addressLine)
		}
		
		// ----
		console.groupEnd()
	}
	
	const renderMap = function (mapURL) {
		console.groupCollapsed("productLocationForm.elementsCreate")
		// ----
		
		if (mapURL && _product_location_map_container) {
			
			let mapWidth = parseInt($(_product_location_overview).outerWidth())
			let mapHeight = mapWidth / 2
			
			//*
			console.log("mapWidth", mapWidth)
			console.log("mapHeight", mapHeight)
			//*/
			
			let $mapFrame = $("<iframe/>", {
				id: "product_location_map_container_frame",
				allowfullscreen: "allowfullscreen",
				frameborder: "0",
				src: mapURL,
			})
			
			$mapFrame.addClass("w-100 border-0")
			$mapFrame.css("height", mapHeight + "px")
			$mapFrame.css("width", mapWidth + "px")
			
			_product_location_map_container.style["max-height"] = mapHeight + "px"
			_product_location_map_container.style["min-height"] = mapHeight + "px"
			
			$(_product_location_map_container)
				.css("height", mapHeight + "px")
				.css("width", mapWidth + "px")
				.empty()
				.append($mapFrame)
			
		}
		
		// ----
		console.groupEnd()
	}
	
	const elementsCreate = function (options) {
		console.groupCollapsed("productLocationForm.elementsCreate")
		// ----
		
		/*
		console.log("options", options)
		//*/
		
		$(_location_country_id).BuildDropDown({
			data: Array.from(Country.all.values()),
			title: "Country",
			id_field: "id",
			text_field: "name",
			first_selectable: false,
		})
		
		$(_location_province_id).BuildDropDown({
			data: Array.from(Province.all.values()),
			title: "Province",
			id_field: "id",
			text_field: "name",
			first_selectable: false,
		})
		
		$(_location_city_id).BuildDropDown({
			data: Array.from(City.all.values()),
			title: "City",
			id_field: "id",
			text_field: "name",
			first_selectable: false,
		})
		
		Country.init({
			dropdowns: [
				"location_country_id",
			],
		})
		
		Province.init({
			dropdowns: [
				"location_province_id",
			],
		})
		
		City.init({
			dropdowns: [
				"location_city_id",
			],
		})
		
		$(_location_country_id)
			.val("")
			.trigger("change")
		
		if (_product_cover_image) {
			$(_product_cover_image).dropify()
		}
		
		drEvent = $(_product_cover_image).dropify()
		
		drEvent.on("dropify.afterClear", function (event, element) {
			handleImageRemove()
		})
		
		buildLocationTypesDropDown((options && options.location_types) ? options.location_types : [])
		buildCategoryDropdown((options && options.category) ? options.category : [])
		buildRatingsTypesDropDown((options && options.rating_types) ? options.rating_types : [])
		
		// ----
		console.groupEnd()
	}
	const elementsRender = function (options) {
		console.groupCollapsed("productLocationForm.elementsRender")
		// ----
		
		//*
		//console.log("options", options)
		//*/
		
		// ----
		console.groupEnd()
	}
	const elementsAssign = function (options) {
		console.groupCollapsed("productLocationForm.elementsAssign")
		// ----
		
		//*
		//console.log("options", options)
		//*/
		
		// ----
		console.groupEnd()
	}
	
	const searchInitAutocomplete = function (categoryId) {
		console.groupCollapsed("productLocationForm.searchInitAutocomplete")
		// ----
		
		if (!categoryId) {
			return
		}
		
		$(_product_location_search_product_name_filter)
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
				params: { "category_id": categoryId },
				cache: false,
				dataType: "json",
				triggerSelectOnValidInput: false,
				paramName: "st",
				onSelect: function (suggestion) {
					if (!suggestion || !suggestion.data) {
						return
					}
					
					let product = (suggestion.data[0]) ? suggestion.data[0] : suggestion.data
					
					console.log("product", product)
					
					detailPopulate(product)
					formPopulate(product)
					formShow()
					
				},
			})
		
		// ----
		console.groupEnd()
	}
	const searchInit = function () {
		console.groupCollapsed("productLocationForm.searchInit")
		// ----
		
		searchClear()
		
		// ----
		console.groupEnd()
	}
	const searchHandleCategoryChange = function (categoryId) {
		console.groupCollapsed("productLocationForm.searchHandleCategoryChange")
		// ----
		
		searchClear()
		
		if (!categoryId) {
			return
		}
		
		_product_location_search_category_id.value = categoryId
		_product_location_search_product_name_filter.readOnly = false
		_product_location_search_search_button.disabled = false
		
		searchInitAutocomplete(categoryId)
		
		// ----
		console.groupEnd()
	}
	const searchClear = function () {
		console.groupCollapsed("productLocationForm.searchClear")
		// ----
		
		_product_location_search_category_id.value = ""
		_product_location_search_product_name_filter.value = ""
		_product_location_search_product_id.value = ""
		
		_product_location_search_product_name_filter.readOnly = true
		_product_location_search_search_button.disabled = true
		
		// ----
		console.groupEnd()
	}
	const searchShow = function () {
		console.groupCollapsed("productLocationForm.searchShow")
		// ----
		
		if (_product_location_search) {
			$(_product_location_search).show()
		}
		
		// ----
		console.groupEnd()
	}
	const searchHide = function () {
		console.groupCollapsed("productLocationForm.searchHide")
		// ----
		
		if (_product_location_search) {
			$(_product_location_search).hide()
		}
		
		// ----
		console.groupEnd()
	}
	
	const formEnableFields = function () {
		console.groupCollapsed("productLocationForm.formDisableFields")
		// ----
		
		_product_location_product_name_filter.readOnly = false
		_product_location_category_id.readOnly = false
		
		// ----
		console.groupEnd()
	}
	const formDisableFields = function () {
		console.groupCollapsed("productLocationForm.formDisableFields")
		// ----
		
		_product_location_product_id.readOnly = true
		_product_location_product_name_filter.readOnly = true
		_product_location_category_id.readOnly = true
		
		// ----
		console.groupEnd()
	}
	const formClear = function () {
		console.groupCollapsed("productLocationForm.formClear")
		// ----
		
		_product_location_product_id.value = ""
		_product_location_category_id.value = ""
		
		formDisableFields()
		
		// ----
		console.groupEnd()
	}
	const formPopulate = function (product_location) {
		console.groupCollapsed("productLocationForm.formPopulate")
		// ----
		
		formClear()
		
		if (product_location) {
			console.log("product_location", product_location)
			
			_product_location_product_id.value = (!isNaN(parseInt(product_location.id))) ? parseInt(product_location.id) : null
			_product_location_category_id.value = (!isNaN(parseInt(product_location.category_id))) ? parseInt(product_location.category_id) : null
			
		}
		
		// ----
		console.groupEnd()
	}
	const formShow = function () {
		console.groupCollapsed("productLocationForm.formShow")
		// ----
		if (_product_location_form) {
			$(_product_location_form).show()
		}
		// ----
		console.groupEnd()
	}
	const formHide = function () {
		console.groupCollapsed("productLocationForm.formHide")
		// ----
		if (_product_location_form) {
			$(_product_location_form).hide()
		}
		// ----
		console.groupEnd()
	}
	
	const detailClear = function () {
		console.groupCollapsed("productLocationForm.detailClear")
		// ----
		
		_product_location_overview_city.innerHTML = ""
		_product_location_overview_name.innerHTML = ""
		_product_location_overview_address.innerHTML = ""
		_product_location_overview_email.innerHTML = ""
		_product_location_overview_phone.innerHTML = ""
		_product_location_overview_product_blurb.innerHTML = ""
		_product_location_overview_city_blurb.innerHTML = ""
		_product_location_overview_rating.innerHTML = ""
		
		_product_location_overview_cover_image.setAttribute("src", "")
		_product_location_map_container_frame.setAttribute("src", "")
		
		$(_product_location_overview_cover_image).hide()
		_product_location_form_product_id.innerHTML = ""
		
		// ----
		console.groupEnd()
	}
	const detailPopulate = function (product_location) {
		console.groupCollapsed("productLocationForm.detailPopulate")
		// ----
		
		detailClear()
		if (product_location) {
			console.log("product_location", product_location)
			
			_product_location_form_product_id.innerHTML = (!isNaN(parseInt(product_location.id))) ? parseInt(product_location.id) : null
			
			$(_product_location_overview_cover_image).show()
			
		}
		
		// ----
		console.groupEnd()
	}
	const detailShow = function () {
		console.groupCollapsed("productLocationForm.detailShow")
		// ----
		// ----
		console.groupEnd()
	}
	const detailHide = function () {
		console.groupCollapsed("productLocationForm.detailHide")
		// ----
		// ----
		console.groupEnd()
	}
	
	const buildRatingsTypesDropDown = function (ratingsTypes) {
		console.groupCollapsed("productLocationForm.buildRatingsTypesDropDown")
		// ----
		
		let optionValues = "<option value='' disabled readonly selected>-- Rating --</option>"
		let cateoryValues = (ratingsTypes) ? ratingsTypes : []
		
		console.log("ratingsTypes", ratingsTypes)
		
		$.each(cateoryValues, function (k, category) {
			let id = (!isNaN(parseInt(category.id))) ? parseInt(category.id) : null
			let name = (category.name) ? category.name : null
			
			optionValues += `<option value="${id}">${name}</option>`
		})
		
		if (_product_location_product_ratings_types_id) {
			$(_product_location_product_ratings_types_id).empty().html(optionValues)
		}
		
		// ----
		console.groupEnd()
	}
	const buildLocationTypesDropDown = function (locationTypes) {
		console.groupCollapsed("productLocationForm.buildLocationTypesDropDown")
		// ----
		
		let optionValues = "<option value='' disabled readonly selected>-- Location Types --</option>"
		let locationTypeValues = (locationTypes) ? locationTypes : []
		
		$.each(locationTypeValues, function (k, locationType) {
			let id = (!isNaN(parseInt(locationType.id))) ? parseInt(locationType.id) : null
			let name = (locationType.name) ? locationType.name : null
			
			optionValues += `<option value="${id}">${name}</option>`
		})
		
		if (_product_location_types_id) {
			$(_product_location_types_id).empty().html(optionValues)
		}
		
		// ----
		console.groupEnd()
	}
	const buildCategoryDropdown = function (categories) {
		console.groupCollapsed("productLocationForm.buildCategoryDropdown")
		// ----
		
		let optionValues = "<option value='' disabled readonly selected>-- Category --</option>"
		let cateoryValues = (categories) ? categories : []
		
		$.each(cateoryValues, function (k, category) {
			let id = (!isNaN(parseInt(category.id))) ? parseInt(category.id) : null
			let name = (category.name) ? category.name : null
			
			optionValues += `<option value="${id}">${name}</option>`
		})
		
		if (_product_location_search_category_id) {
			$(_product_location_search_category_id).empty().html(optionValues)
		}
		
		if (_product_location_category_id) {
			$(_product_location_category_id).empty().html(optionValues)
		}
		
		/*
		console.log("cateoryValues", cateoryValues)
		console.log("optionValues", optionValues)
		//*/
		
		// ----
		console.groupEnd()
	}
	
	const init = function (options) {
		console.groupCollapsed("productLocationForm.init")
		// ----
		
		/*
		console.log("options.location_types", options.location_types)
		//*/
		
		elementsCreate(options)
		elementsRender(options)
		elementsAssign(options)
		
		searchInit()
		detailClear()
		
		formClear()
		formHide()
		hideCitySearch()
		
		// ----
		console.groupEnd()
	}
	const initProductLocationDetailAutocomplete = function (categoryId) {
		console.groupCollapsed("productLocationForm.initProductLocationDetailAutocomplete")
		// ----
		
		if (!categoryId || !_product_location_category_id || !_product_location_product_name_filter) {
			return
		}
		
		$(_product_location_product_name_filter)
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
				params: { "category_id": categoryId },
				cache: false,
				dataType: "json",
				triggerSelectOnValidInput: false,
				paramName: "st",
				onSelect: function (suggestion) {
					if (!suggestion || !suggestion.data) {
						return
					}
					
					let product = (suggestion.data[0]) ? suggestion.data[0] : suggestion.data
					
					console.log("product", product)
					
				},
			})
		
		// ----
		console.groupEnd()
	}
	
	init(options)
	
	return this
}

//

$(function () {
	
	$("#product_cover_image").dropify()
	
	$(".document-toolbar").documentToolbar({})
	
	if (document.getElementById("package_add_modal")) {
		Package.init({})
	}
})
