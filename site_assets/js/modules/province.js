const Province = (function () {
	"use strict"
	
	const class_name = "form-new-province"
	const form_id = "form_new_province"
	
	let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
	
	const validate_form = function () {
		let _name = document.getElementById("province_name")
		let _province_iso2 = document.getElementById("province_iso2")
		let _province_iso3 = document.getElementById("province_iso3")
		let valid = true
		// ----
		if (!_name || !_province_iso2 || !_province_iso3) {
			handle_country_error("Error Processing Data")
			return false
		}
		
		if (_name.value === "") {
			$(_name).addClass("is-invalid")
			$("#province_name-error")
				.text("Required: Field is required")
				.show()
			valid = false
		} else {
			$(_name).removeClass("is-invalid")
			$("#province_name-error")
				.text("")
				.hide()
		}
		
		if (_province_iso2.value === "") {
			$(_province_iso2).addClass("is-invalid")
			$("#province_iso2-error")
				.text("Required: Field is required")
				.show()
			valid = false
		} else {
			$(_province_iso2).removeClass("is-invalid")
			$("#province_iso2-error")
				.text("")
				.hide()
		}
		
		if (_province_iso3.value === "") {
			$(_province_iso3).addClass("is-invalid")
			$("#province_iso3-error")
				.text("Required: Field is required")
				.show()
			valid = false
		} else {
			$(_province_iso3).removeClass("is-invalid")
			$("#province_iso3-error")
				.text("")
				.hide()
		}
		
		return valid
	}
	
	const handle_province_error = function (msg) {
		toastr.error(msg)
		//console.log(msg)
	}
	
	const on_click_outside = (e) => {
		let tar = $(e.target).parents("div." + class_name)
		
		if (!tar[0] && !e.target.className.includes("select-add-option")) {
			Province.close()
		}
	}
	
	const build_drop_downs = function (settings) {
		if (settings) {
			if (settings.dropdowns) {
				$.each(settings.dropdowns, function (i, dropdown_id) {
					let country_id = Country.id
					let province_id = Province.id
					let element = document.getElementById(dropdown_id)
					if (element) {
						
						$(element)
							.select2({
								"language": {
									"searching": function () {
									},
								},
								"escapeMarkup": function (markup) {
									return markup
								},
							})
							.on("select2:open", function (e) {
								let x = document.querySelectorAll("[aria-controls='select2-" + dropdown_id + "-results']")
								if (x[0]) {
									let _filterProvinceSearch = x[0]
									$(_filterProvinceSearch).attr("id", "" + dropdown_id + "_search")
									if (!document.getElementById("filter_province_add_icon")) {
										let i = document.createElement("i")
										i.classList = "select-add-option fas fa-plus filter_province_add"
										i.id = "filter_province_add_icon"
										i.addEventListener("click", event => {
											let val = _filterProvinceSearch.value
											$(element).select2("close")
											Province.add(this, val, dropdown_id)
										})
										_filterProvinceSearch.after(i)
									}
									$(".filter_province_add").hide()
									if (_filterProvinceSearch) {
										_filterProvinceSearch.addEventListener("keyup", event => {
											if (_filterProvinceSearch.value !== "") {
												$(".filter_province_add").show()
											} else {
												$(".filter_province_add").hide()
											}
										})
									}
								}
								
							})
							.on("change", function () {
								let city_el_id = $(this)
									.attr("id")
									.replace("province", "city")
								
								let country_el_id = $(this)
									.attr("id")
									.replace("province", "country")
								
								let city_element = document.getElementById(city_el_id)
								let country_element = document.getElementById(country_el_id)
								
								if (city_element) {
									if (country_element) {
										country_id = parseInt(country_element.value)
										if (!isNaN(parseInt(country_element.value))) {
											
											//
											
											if (!isNaN(parseInt($(this).val()))) {
												City.get(country_id, parseInt($(this).val()), city_element)
											} else {
												City.id = null
												City.get(country_id, null, city_element)
												if (City.id) {
												
												}
											}
											//
											
										} else {
											City.id = null
											City.get(null, null, city_element)
										}
									}
								}
								City.id = null
								Province.id = null
							})
						
					}
				})
			}
		}
	}
	
	const fetch_province_list = function (dataToSend, callback) {
		
		if (dataToSend) {
			try {
				
				sendGetRequest("/api/v1.0/provinces", dataToSend, function (data, status, xhr) {
					if (data) {
						
						return callback(data)
					}
				})
				
			} catch (e) {
				
				return handle_province_error("Error Validating Province")
			}
		} else {
			
			return handle_province_error("Error Loading Province- Missing Data")
		}
		
	}
	
	const set_detail = function (province) {
		console.groupCollapsed("Province.update_select")
		// ----
		
		let detail = clear_detail()
		let id = null
		if (province) {
			id = validInt(province.id)
			console.log("province", province)
			detail = {
				id: validInt(province.id),
				name: (province.name) ? province.name : null,
				sort_order: (province.sort_order) ? province.sort_order : 9999999,
				country_id: validInt(province.country_id),
				iso2: (province.iso2) ? province.iso2 : null,
				iso3: (province.iso3) ? province.iso3 : null,
				enabled: (province.enabled) ? province.enabled : 1,
				date_created: (province.date_created) ? province.date_created : formatDateMySQL(),
				created_by: (province.created_by) ? province.created_by : user_id,
				date_modified: (province.date_modified) ? province.date_modified : formatDateMySQL(),
				modified_by: (province.modified_by) ? province.modified_by : user_id,
				note: (province.note) ? province.note : null,
			}
		}
		Province.id = id
		Province.detail = detail
		
		// ----
		console.groupEnd()
		return detail
	}
	
	const clear_detail = function () {
		return {
			id: null,
			name: null,
			sort_order: 9999999,
			iso2: null,
			iso3: null,
			enabled: 1,
			note: null,
			created_by: user_id,
			modified_by: user_id,
			date_created: formatDateMySQL(),
			date_modified: formatDateMySQL(),
		}
	}
	
	const buildForm = function (elem, val, dropdown_id) {
		console.groupCollapsed("Province.buildForm")
		// ----
		
		let id = $(elem).attr("id")
		let parent = $(elem).parents("div.row")
		let value = ""
		
		if (val) {
			value = val
		}
		
		if (!id || !parent[0]) {
			return
		}
		
		if (document.getElementById(form_id)) {
			return
		}
		
		// Form
		let newProvinceForm = document.createElement("div")
		let newProvinceFormHeading = document.createElement("div")
		let newProvinceFormBody = document.createElement("div")
		let newProvinceFormFooter = document.createElement("div")
		// Heading
		let heading1 = document.createElement("h5")
		// Rows
		let row1 = document.createElement("div")
		let row2 = document.createElement("div")
		let row3 = document.createElement("div")
		let col1 = document.createElement("div")
		let col2 = document.createElement("div")
		let col3 = document.createElement("div")
		let col4 = document.createElement("div")
		let col5 = document.createElement("div")
		let col6 = document.createElement("div")
		// Form Elements
		let form_element1 = document.createElement("div")
		let form_element2 = document.createElement("div")
		let form_element3 = document.createElement("div")
		let form_element4 = document.createElement("div")
		
		let error_element1 = document.createElement("div")
		let error_element2 = document.createElement("div")
		let error_element3 = document.createElement("div")
		
		let name_text_element = document.createElement("input")
		let name_label_element = document.createElement("label")
		let iso2_text_element = document.createElement("input")
		let iso2_label_element = document.createElement("label")
		let iso3_text_element = document.createElement("input")
		let iso3_label_element = document.createElement("label")
		
		let save_button = document.createElement("button")
		let cancel_button = document.createElement("button")
		
		newProvinceForm.id = form_id
		
		newProvinceForm.classList.add("card")
		newProvinceForm.classList.add("w-100")
		newProvinceForm.classList.add("m-2")
		newProvinceForm.classList.add(class_name)
		
		newProvinceFormHeading.classList.add("card-heading")
		newProvinceFormHeading.classList.add("p-1")
		
		newProvinceFormBody.classList.add("card-body")
		newProvinceFormBody.classList.add("p-1")
		
		newProvinceFormFooter.classList.add("card-footer")
		newProvinceFormFooter.classList.add("p-1")
		
		heading1.classList.add("card-title")
		heading1.innerText = "Province Details"
		
		name_text_element.id = "province_name"
		name_text_element.name = "province_name"
		name_text_element.type = "text"
		name_text_element.classList.add("form-control")
		name_text_element.classList.add(class_name)
		
		name_label_element.htmlFor = "province_name"
		name_label_element.innerHTML = "Name:"
		error_element1.id = "province_name-error"
		
		iso2_text_element.id = "province_iso2"
		iso2_text_element.name = "province_iso2"
		iso2_text_element.type = "text"
		iso2_text_element.maxLength = 2
		iso2_text_element.classList.add("form-control")
		iso2_text_element.classList.add(class_name)
		
		iso2_label_element.htmlFor = "province_iso2"
		iso2_label_element.innerHTML = "ISO2:"
		error_element2.id = "province_iso2-error"
		
		iso3_text_element.id = "province_iso3"
		iso3_text_element.name = "province_iso3"
		iso3_text_element.type = "text"
		iso3_text_element.maxLength = 3
		iso3_text_element.classList.add("form-control")
		iso3_text_element.classList.add(class_name)
		iso3_label_element.htmlFor = "province_iso3"
		iso3_label_element.innerHTML = "ISO3:"
		error_element3.id = "province_iso3-error"
		
		save_button.classList.add("btn")
		save_button.classList.add("btn-primary")
		save_button.classList.add("btn-sm")
		save_button.classList.add("waves-effect")
		save_button.classList.add("waves-light")
		save_button.innerText = "save"
		save_button.type = "button"
		
		save_button.addEventListener("click", event => {
			Province.save(elem, dropdown_id)
		})
		
		cancel_button.classList.add("btn")
		cancel_button.classList.add("btn-outline-danger")
		cancel_button.classList.add("btn-sm")
		cancel_button.classList.add("waves-effect")
		cancel_button.classList.add("waves-light")
		cancel_button.innerText = "cancel"
		cancel_button.type = "button"
		
		cancel_button.addEventListener("click", event => {
			destroy_form()
		})
		
		row1.classList.add("row")
		row1.classList.add("mx-1")
		
		row2.classList.add("row")
		row2.classList.add("mx-1")
		
		row3.classList.add("row")
		row3.classList.add("mx-1")
		
		col1.classList.add("col-4")
		col1.classList.add("col-md-4")
		col1.classList.add("col-lg-4")
		col1.classList.add("col-xl-4")
		col1.classList.add("mb-1")
		col1.classList.add("p-1")
		
		col2.classList.add("col-4")
		col2.classList.add("col-md-4")
		col2.classList.add("col-lg-4")
		col2.classList.add("col-xl-4")
		col2.classList.add("mb-1")
		col2.classList.add("p-1")
		
		col3.classList.add("col-4")
		col3.classList.add("col-md-4")
		col3.classList.add("col-lg-4")
		col3.classList.add("col-xl-4")
		col3.classList.add("mb-1")
		col3.classList.add("p-1")
		
		col4.classList.add("col-lg-3")
		col4.classList.add("mb-1")
		col4.classList.add("p-1")
		
		col5.classList.add("col-12")
		col5.classList.add("mb-1")
		col5.classList.add("text-right")
		col5.classList.add("p-1")
		
		col6.classList.add("col-12")
		col6.classList.add("mb-1")
		col6.classList.add("p-1")
		
		let blurbWrapper = document.createElement("section")
		let blurbTitleWrapper = document.createElement("div")
		let blurbTitleHeading = document.createElement("h5")
		let blurbTitleAction = document.createElement("a")
		let blurbRow = document.createElement("div")
		let blurbCol = document.createElement("div")
		let blurbInputWrapper = document.createElement("div")
		let blurbInput = document.createElement("textarea")
		let blurbInputError = document.createElement("div")
		
		blurbWrapper.classList.add("card")
		blurbWrapper.classList.add("card-body")
		blurbWrapper.classList.add("border")
		blurbWrapper.classList.add("border-medium")
		blurbWrapper.classList.add("z-depth-0")
		blurbWrapper.classList.add("rounded-lg")
		blurbWrapper.classList.add("p-0")
		blurbWrapper.classList.add("mb-2")
		
		form_element1.classList.add("form-element")
		form_element2.classList.add("form-element")
		form_element3.classList.add("form-element")
		form_element4.classList.add("form-element")
		
		error_element1.classList.add("error")
		error_element1.classList.add("w-100")
		error_element1.classList.add("text-center")
		
		error_element2.classList.add("error")
		error_element2.classList.add("w-100")
		error_element2.classList.add("text-center")
		
		error_element3.classList.add("error")
		error_element3.classList.add("w-100")
		error_element3.classList.add("text-center")
		
		form_element1.appendChild(name_label_element)
		form_element1.appendChild(name_text_element)
		form_element1.appendChild(error_element1)
		
		col1.appendChild(form_element1)
		
		form_element2.appendChild(iso2_label_element)
		form_element2.appendChild(iso2_text_element)
		form_element2.appendChild(error_element2)
		
		col2.appendChild(form_element2)
		
		form_element3.appendChild(iso3_label_element)
		form_element3.appendChild(iso3_text_element)
		form_element3.appendChild(error_element3)
		
		col3.appendChild(form_element3)
		
		row1.appendChild(col1)
		row1.appendChild(col2)
		row1.appendChild(col3)
		
		col5.append(cancel_button)
		col5.appendChild(save_button)
		
		col6.appendChild(blurbWrapper)
		row2.appendChild(col5)
		
		row3.appendChild(col6)
		
		newProvinceFormHeading.appendChild(heading1)
		newProvinceFormBody.appendChild(row1)
		newProvinceFormBody.appendChild(row3)
		newProvinceFormFooter.appendChild(row2)
		
		newProvinceForm.appendChild(newProvinceFormHeading)
		newProvinceForm.appendChild(newProvinceFormBody)
		newProvinceForm.appendChild(newProvinceFormFooter)
		
		parent[0].appendChild(newProvinceForm)
		
		name_text_element.value = value
		name_text_element.focus({ preventScroll: false })
		
		window.addEventListener("click", on_click_outside)
		
		// ----
		console.groupEnd()
	}
	
	const destroy_form = function () {
		let elem = document.getElementById(form_id)
		if (elem) {
			elem.parentNode.removeChild(elem)
			window.removeEventListener("click", on_click_outside)
		}
	}
	
	const get = function (country_id, el) {
		Province.all = new Map()
		if (!el) {
			return
		}
		let province_id = ""
		if (Province.id !== null) {
			province_id = Province.id
		}
		
		if (!country_id) {
			$(el).BuildDropDown({
				data: Array.from(Province.all.values()),
				title: "Province",
				id_field: "id",
				text_field: "name",
				first_selectable: false,
			})
			$(el).val("").trigger("change")
			return
		}
		
		let dataToSend = {
			country_id: country_id,
		}
		
		fetch_province_list(dataToSend, function (provinces) {
			if (provinces) {
				loadAll(provinces)
				$(el).BuildDropDown({
					data: Array.from(Province.all.values()),
					title: "Province",
					id_field: "id",
					text_field: "name",
					first_selectable: false,
				})
				$(el).val(province_id).trigger("change")
				
			}
		})
		
	}
	
	const loadAll = function (provinces) {
		console.groupCollapsed("Province.loadAll")
		// ----
		
		Province.all = new Map()
		
		if (provinces) {
			$.each(provinces, function (k, province) {
				let detail = set_detail(province)
				console.log("province", province)
				console.log("detail", detail)
				Province.all.set(detail.id, detail)
			})
		}
		
		// ----
		console.groupEnd()
	}
	
	const add = function (elem, val, dropdown_id) {
		if (!elem) {
			return
		}
		
		buildForm(elem, val, dropdown_id)
	}
	
	const save = function ($this, dropdown_id) {
		let province_detail = {}
		let _name = document.getElementById("province_name")
		let _province_iso2 = document.getElementById("province_iso2")
		let _province_iso3 = document.getElementById("province_iso3")
		let _country_id = document.getElementById(dropdown_id.replace(/province_id/g, "") + "country_id")
		if (!isNaN(parseInt(_country_id.value))) {
			
			if (_name && _province_iso2 && _province_iso3 && _country_id) {
				if (validate_form()) {
					province_detail.name = _name.value
					province_detail.iso2 = _province_iso2.value
					province_detail.iso3 = _province_iso3.value
					province_detail.country_id = parseInt(_country_id.value)
					
					confirmDialog(`Would you like to update?`, (ans) => {
						if (ans) {
							update_province_record($this, remove_nulls(province_detail))
						}
					})
				}
			}
			
		}
		
	}
	
	const update_province_record = function ($this, dataToSend) {
		if (dataToSend) {
			try {
				sendPostRequest("/api/v1.0/provinces/update", dataToSend, function (data, status, xhr) {
					if (data && data[0]) {
						let new_province = data[0]
						let province_elements = $("select[data-type='province']")
						
						Province.all.set(new_province.id, new_province)
						Province.id = new_province.id
						City.id = null
						
						province_elements.each(function (index, element) {
							let newOption = new Option(new_province.name, new_province.id, false, false)
							$(element).append(newOption).trigger("change")
						})
						
						$($this).val(new_province.id).trigger("change")
						
						Province.close()
						toastr.success("Province: " + new_province.id + " updated")
						
					} else {
						return handle_province_error("Error: 1")
					}
				})
			} catch (e) {
				//console.log("error", e)
				handle_province_error("Error: Validating Province")
			}
		} else {
			//console.log("Error: Missing Data")
			handle_province_error("Error: Missing Data")
		}
	}
	
	const update_select = function (country_id, elem) {
		console.groupCollapsed("Province.update_select")
		// ----
		
		// ----
		console.groupEnd()
	}
	
	const init = function (settings) {
		console.groupCollapsed("Province.init")
		// ----
		
		build_drop_downs(settings)
		
		// ----
		console.groupEnd()
	}
	
	return {
		detail: {},
		all: new Map(),
		id: null,
		set_detail: function (province) {
			set_detail(province)
		},
		update_select: function (country_id, elem) {
			//update_select(country_id, elem)
		},
		close: function () {
			destroy_form()
		},
		save: function (country_id, dropdown_id) {
			save(country_id, dropdown_id)
		},
		get: function (country_id, el) {
			get(country_id, el)
		},
		add: function (elem, val, dropdown_id) {
			add(elem, val, dropdown_id)
		},
		init: function (settings) {
			init(settings)
		},
		loadAll: function (provinces) {
			loadAll(provinces)
		},
	}
	
})()
