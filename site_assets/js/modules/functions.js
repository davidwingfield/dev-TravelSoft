let mdbPreloader = document.getElementById("mdb-preloader")
let isShift = false

/*
let showElements
let isShiftTime
let separator = "-"
let separatorTime = ":"

const IsNumericTime = function (input, keyCode) {
    if (!isNaN(parseInt(keyCode))) {
        keyCode = parseInt(keyCode)
    }
    
    if (keyCode === 16) {
        isShiftTime = true
    }
    
    if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || (keyCode === 8) || (keyCode === 46)) {
        if (keyCode !== 16) {
            if ((input.value.length === 2) && keyCode !== 8) {
                input.value += separatorTime
            }
            
            return true
        }
    }
    
    return false
}

const validateTimeFormat = function (input, keyCode) {
    let timeString = input.value
    let regex = /^\d{2,}:(?:[0-5]\d):(?:[0-5]\d)$/i
    
    if (keyCode === 16) {
        isShift = false
    }
    
    if (regex.test(timeString) || timeString.length === 0) {
        $(input).unSetError()
    } else {
        $(input).setError("Invalid Time. Only HH-MM format allowed.")
    }
}

$.fn.unSetError = function () {
    let errorElm = this.parents("div.form-element").find("div.error")
    
    if (this.hasClass("time-format")) {
    
    }
    
    if (this.hasClass("date-format")) {
    
    }
    
    errorElm.html("&nbsp;").hide()
    return this
}

$.fn.setError = function (msg) {
    let errorElm = this.parents("div.form-element").find("div.error")
    
    if (this.hasClass("time-format")) {
        errorElm = this.parent("div.input-group").parent().find("div.error")
    }
    
    if (this.hasClass("date-format")) {
        errorElm = this.parents("div.form-element").find("div.error")
    }
    
    errorElm.html(msg).show()
    return this
}
//*/
$.fn.BuildDropDown = function (settings) {
	if (!settings || !settings.text_field || !settings.id_field) {
		return
	}
	let _this = document.getElementById($(this).attr("id"))
	let data = (settings.data) ? settings.data : []
	let id_field = (settings.id_field) ? settings.id_field : ""
	let text_field = (settings.text_field) ? settings.text_field : ""
	let title = (settings.title) ? settings.title : "Select Option"
	let first_selectable = (settings.first_selectable) ? settings.firstSelectable : false
	let select2 = (settings.select2) ? settings.select2 : false
	let multiple = (settings.type) ? settings.type : ""
	let val = ""
	//
	$(_this).empty()
	//
	if (multiple === "multiple") {
		_this.setAttribute("multiple", "multiple")
	}
	
	if (first_selectable === false) {
		let option = $(document.createElement("option")).prop({
			value: "",
			text: "-- " + title.charAt(0).toUpperCase() + title.slice(1) + " --",
			//readonly: true,
			disabled: true,
		}).attr("readonly", "readonly")
		
		$(_this).append(option)
	}
	
	$.each(data, function (i, v) {
		let id = v[id_field]
		let text = v[text_field]
		
		$(_this).append($(document.createElement("option")).prop({
			value: id,
			text: text.charAt(0).toUpperCase() + text.slice(1),
		}))
		
	})
	
	$(_this).val(val)
	
	if (select2) {
		$(_this).select2()
	}
	
	//if ($(_this).hasClass("select2-hidden-accessible")) {
	//    $(_this).select2("destroy");
	//}
	
}

const formatCountryName = function (country) {
	let countryName, countryISO2, countryISO3 = ""
	let returnName = null
	
	if (country) {
		countryName = (country.name) ? country.name : null
		countryISO3 = (country.iso3) ? country.iso3 : null
		countryISO2 = (country.iso2) ? country.iso2 : null
		
		switch (defaultLocationDisplayFormat.toLowerCase()) {
			case "short":
				
				returnName = (countryISO3) ? countryISO3 : (countryISO2) ? countryISO2 : (countryName) ? countryName : null
				break
			
			case "medium":
				
				returnName = (countryName) ? countryName : (countryISO3) ? countryISO3 : (countryISO2) ? countryISO2 : null
				break
			
			case "long":
				
				if (countryName && countryISO3) {
					
					returnName = `${countryISO3}-${countryName}`
					
				} else if (countryName && countryISO2) {
					
					returnName = `${countryISO2}-${countryName}`
					
				} else if (countryName) {
					
					returnName = countryName
					
				} else if (countryISO3) {
					
					returnName = countryISO3
					
				} else if (countryISO2) {
					
					returnName = countryISO2
					
				} else {
					
					returnName = null
					
				}
				
				break
			default:
				returnName = null
		}
	}
	
	return returnName
}

const formatProvinceName = function (province) {
	let provinceName, provinceISO2, provinceISO3 = ""
	let returnName = null
	
	if (province) {
		
		provinceName = (province.name) ? province.name : null
		provinceISO2 = (province.iso3) ? province.iso3 : null
		provinceISO3 = (province.iso2) ? province.iso2 : null
		
		switch (defaultLocationDisplayFormat.toLowerCase()) {
			
			case "short":
				returnName = (provinceISO2) ? provinceISO2 : (provinceISO3) ? provinceISO3 : (provinceName) ? provinceName : null
				break
			case "medium":
				returnName = (provinceName) ? provinceName : (provinceISO2) ? provinceISO2 : (provinceISO3) ? provinceISO3 : null
				break
			case "long":
				
				if (provinceName && provinceISO2) {
					
					returnName = `${provinceISO2}-${provinceName}`
					
				} else if (provinceName && provinceISO3) {
					
					returnName = `${provinceISO3}-${provinceName}`
					
				} else if (provinceName) {
					
					returnName = provinceName
					
				} else if (provinceISO2) {
					
					returnName = provinceISO2
					
				} else if (provinceISO3) {
					
					returnName = provinceISO3
					
				} else {
					
					returnName = null
					
				}
				
				break
			default:
				returnName = null
		}
	}
	
	return returnName
}

const formatLocationDisplay = function (country, province, city) {
	let formattedCountryName, formattedProvinceName, formattedCityName = null
	let cityDisplay = ""
	
	if (country) {
		formattedCountryName = formatCountryName(country)
	}
	
	if (province) {
		formattedProvinceName = formatProvinceName(province)
	}
	
	if (city) {
		formattedCityName = (city.name) ? city.name : null
	}
	
	if (formattedCountryName !== null && formattedProvinceName !== null && formattedCityName !== null) { // + + +
		/*
		console.log("formattedCountryName", formattedCountryName)
		console.log("formattedProvinceName", formattedProvinceName)
		console.log("formattedCityName", formattedCityName)
		//*/
		cityDisplay = `${formattedCityName} (${formattedProvinceName}, ${formattedCountryName})`
		
	} else if (formattedCountryName && formattedProvinceName && formattedCountryName !== null && formattedProvinceName !== null && formattedCityName === null) { // + + -
		/*
		console.log("formattedCountryName", formattedCountryName)
		console.log("formattedProvinceName", formattedProvinceName)
		//*/
		cityDisplay = `(${formattedProvinceName}, ${formattedCountryName})`
	} else if (formattedCountryName && (!formattedProvinceName || formattedProvinceName === null) && (!formattedCityName || formattedCityName === null)) { // + - -
		/*
		console.log("formattedCountryName", formattedCountryName)
		//*/
		cityDisplay = `${formattedCountryName}`
	} else if (formattedCityName && formattedCountryName !== null && formattedProvinceName !== null && formattedCityName !== null) { // - - +
		/*
		console.log("formattedCityName", formattedCityName)
		//*/
		cityDisplay = `${formattedCityName}`
	} else if (formattedProvinceName && formattedCityName && formattedCountryName !== null && formattedProvinceName !== null && formattedCityName !== null) { // - + +
		/*
		console.log("formattedCountryName", formattedCountryName)
		console.log("formattedProvinceName", formattedProvinceName)
		console.log("formattedCityName", formattedCityName)
		//*/
		cityDisplay = `${formattedCityName} (${formattedProvinceName})`
	} else { // - - -
		cityDisplay = null
	}
	
	return cityDisplay
}

const formatDateRange = function (startDate, endDate) {
	console.groupCollapsed("formatDateRange")
	// ----
	
	// ----
	console.groupEnd()
}

const fetchFormErrors = (form, rules) => {
	console.log("fetchFormErrors()")
	// ----
	
	let _modal_product_category_id = document.getElementById("modal_product_category_id")
	let errors = []
	
	if (!form || !rules || !_modal_product_category_id) {
		errors.push({
			form: (form) ? form : null,
			rules: (rules) ? rules : null,
			message: "Missing Data",
		})
		
		return {
			valid: false,
			errors: errors,
		}
	}
	
	let validator = jQuery(form).validate(rules)
	
	console.log("|__ validator", validator)
	
	return {
		valid: true,
		errors: errors,
	}
}

const calculateWidth = (ratioWidth, ratioHeight, height) => {
	let aspectRatio = ratioWidth.value / ratioHeight.value
	return parseFloat((height * aspectRatio).toFixed(2))
}

const calculateHeight = (ratioWidth, ratioHeight, width) => {
	let aspectRatio = ratioWidth / ratioHeight
	return parseFloat((width / aspectRatio).toFixed(2))
}

const gcd = function (a, b) {
	return (b === 0) ? a : gcd(b, a % b)
}

const shadeColor = function (color, percent) {
	
	let R = parseInt(color.substring(1, 3), 16)
	let G = parseInt(color.substring(3, 5), 16)
	let B = parseInt(color.substring(5, 7), 16)
	
	R = parseInt(R * (100 + percent) / 100)
	G = parseInt(G * (100 + percent) / 100)
	B = parseInt(B * (100 + percent) / 100)
	
	R = (R < 255) ? R : 255
	G = (G < 255) ? G : 255
	B = (B < 255) ? B : 255
	
	let RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16))
	let GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16))
	let BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16))
	
	return "#" + RR + GG + BB
}

const clearAllValidation = function () {
	
	$("div.error").html(`&nbsp;`).hide()
	$(".is-invalid").removeClass("is-invalid")
	
}

$.fn.showError = function (msg) {
	let $element = this
	let $errorElement = $element.parents("div.form-element").find("div.error")
	
	$element.addClass("is-invalid")
	$errorElement.html(msg).show()
	
	return this
}

$.fn.hideError = function () {
	let $element = this
	let $errorElement = $element.parents("div.form-element").find("div.error")
	
	$element.removeClass("is-invalid")
	$errorElement.html(`&nbsp;`).hide()
	
	return this
}

const hexToRgb = hex =>
	hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
			, (m, r, g, b) => "#" + r + r + g + g + b + b)
		.substring(1).match(/.{2}/g)
		.map(x => parseInt(x, 16))

jQuery.fn.dataTable.Api.register("page.jumpToData()", function (data, column) {
	let pos = this.column(column, {
		order: "current",
	}).data().indexOf(data)
	
	if (pos >= 0) {
		let page = Math.floor(pos / this.page.info().length)
		this.page(page).draw(false)
	}
	
	return this
})

const isOdd = function (num) {
	return num % 2
}

const clearValidation = function (formElement) {
	$(".autocomplete-suggestions").hide()
	let validator = $(formElement).validate()
	/*
	$("[name]", formElement).each(function () {
		if (validator) {
			if (validator.successList) {
				validator.successList.push(this)
			}
			validator.showErrors()
		}
	})
	
	$(".is-invalid").each(function () {
		if (validator) {
			if (validator.successList) {
				validator.successList.push(this)
			}
			validator.showErrors()
		}
	})
	//*/
	if (validator) {
		validator.resetForm()
		validator.reset()
	}
}

const get_errors = function (validator) {
	let submitErrorsList = {}
	
}

const validator_init = function (settings) {
	
	let rules = {}
	let messages = {}
	let groups = {}
	if (settings) {
		
		if (settings.rules) {
			rules = settings.rules
		}
		
		if (settings.messages) {
			messages = settings.messages
		}
		
		if (settings.groups) {
			groups = settings.groups
		}
	}
	
	jQuery.validator.setDefaults({
		rules: rules,
		messages: messages,
		groups: groups,
		ignore: "",
		success: "valid",
		invalidHandler: function (event, validator) {
			let errors = validator.numberOfInvalids()
			let errorEl = validator.findLastActive() || validator.errorList.length && validator.errorList[0].element
			if (errorEl) {
				$(errorEl).closest(".accordion-body").collapse("show")
			}
		},
		errorElement: "span",
		highlight: function (element) {
			let id = $(element).attr("id")
			let el = $("#" + id + "")
			let error_el = $("#" + id + "-error")
			
			if (error_el.attr("data-ref")) {
				$("#" + error_el.attr("data-ref")).addClass("is-invalid")
			} else {
				el.parent().find("span.select2").addClass("is-invalid")
				el.addClass("is-invalid")
			}
			
			if (error_el) {
				error_el.css({ "display": "block" })
			}
		},
		unhighlight: function (element) {
			let id = $(element).attr("id")
			let el = $("#" + id + "")
			let error_el = $("#" + id + "-error")
			el.parents("div.form-element").find("span.select2").removeClass("is-invalid")
			el.removeClass("is-invalid")
			if (error_el) {
				error_el.css({ "display": "none" })
			}
		},
		errorPlacement: function (error, element) {
			let id = element.attr("id")
			let el = $("#" + id + "-error")
			el.html(error)
		},
		submitHandler: function (form) {
			return true
		},
		
	})
	
	jQuery.validator.addMethod("postalCode", function (value) {
		return /^((\d{5}-\d{4})|(\d{5})|([A-Z]\d[A-Z]\s\d[A-Z]\d))$/.test(value)
	}, "Please enter a valid postal code.")
	
	jQuery.validator.addMethod("phoneUS", function (phone_number, element) {
		phone_number = phone_number.replace(/\s+/g, "")
		return this.optional(element) || phone_number.length > 9 &&
			phone_number.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/)
	}, "Please specify a valid phone number")
	
	jQuery.validator.addMethod("phoneIT", function (phone_number, element) {
		phone_number = phone_number.replace(/\s+/g, "")
		return this.optional(element) || phone_number.length > 9 &&
			phone_number.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/)
	}, "Please specify a valid phone number")
	
	return jQuery.validator
}

const initializeValidator = function (settings) {
	console.groupCollapsed("Functions.initializeValidator")
	// ----
	
	let rules = {}
	let messages = {}
	let groups = {}
	
	if (settings) {
		
		if (settings.rules) {
			rules = settings.rules
		}
		
		if (settings.messages) {
			messages = settings.messages
		}
		
		if (settings.groups) {
			groups = settings.groups
		}
	}
	
	jQuery.validator.setDefaults({
		rules: rules,
		messages: messages,
		groups: groups,
		ignore: "",
		success: "valid",
		invalidHandler: function (event, validator) {
			let errors = validator.numberOfInvalids()
			let errorEl = validator.findLastActive() || validator.errorList.length && validator.errorList[0].element
			if (errorEl) {
				$(errorEl).closest(".accordion-body").collapse("show")
			}
		},
		errorElement: "span",
		highlight: function (element) {
			let id = $(element).attr("id")
			let el = $("#" + id + "")
			let error_el = $("#" + id + "-error")
			
			if (error_el.attr("data-ref")) {
				$("#" + error_el.attr("data-ref")).addClass("is-invalid")
			} else {
				el.parent().find("span.select2").addClass("is-invalid")
				el.addClass("is-invalid")
			}
			
			if (error_el) {
				error_el.css({ "display": "block" })
			}
		},
		unhighlight: function (element) {
			let id = $(element).attr("id")
			let el = $("#" + id + "")
			let error_el = $("#" + id + "-error")
			el.parents("div.form-element").find("span.select2").removeClass("is-invalid")
			el.removeClass("is-invalid")
			if (error_el) {
				error_el.css({ "display": "none" })
			}
		},
		errorPlacement: function (error, element) {
			let id = element.attr("id")
			let el = $("#" + id + "-error")
			el.html(error)
		},
		submitHandler: function (form) {
			return true
		},
	})
	
	jQuery.validator.addMethod("postalCode", function (value) {
		return /^((\d{5}-\d{4})|(\d{5})|([A-Z]\d[A-Z]\s\d[A-Z]\d))$/.test(value)
	}, "Please enter a valid postal code.")
	
	jQuery.validator.addMethod("phoneUS", function (phone_number, element) {
		phone_number = phone_number.replace(/\s+/g, "")
		return this.optional(element) || phone_number.length > 9 &&
			phone_number.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/)
	}, "Please specify a valid phone number")
	
	jQuery.validator.addMethod("phoneIT", function (phone_number, element) {
		phone_number = phone_number.replace(/\s+/g, "")
		return this.optional(element) || phone_number.length > 9 &&
			phone_number.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/)
	}, "Please specify a valid phone number")
	
	// ----
	console.groupEnd()
	return jQuery.validator
}

const jsonPrettify = (json) => {
	if (typeof json === "object" && json !== null) {
		return JSON.stringify(json, undefined, '\t')
	}
	
	try {
		const obj = JSON.parse(json)
		return jsonPrettify(obj)
	} catch (e) {
		return json
	}
}

const setError = function (element, msg) {
	//console.log("setError")
	let id = $(element).attr("id")
	let el = $("#" + id + "")
	let error_el = $("#" + id + "-error")
	
	if (error_el.attr("data-ref")) {
		$("#" + error_el.attr("data-ref")).addClass("is-invalid")
	} else {
		el.parent().find("span.select2").addClass("is-invalid")
		el.addClass("is-invalid")
	}
	
	if (error_el) {
		error_el.css({ "display": "block" })
	}
	
	$(error_el).append(`<span id="#${id}-error" class="invalid">${msg}</span>`)
}

const clearError = function (element) {
	//console.log("clearError(element)", element)
	let id = $(element).attr("id")
	let el = $("#" + id + "")
	let error_el = $("#" + id + "-error")
	
	if (error_el.attr("data-ref")) {
		$("#" + error_el.attr("data-ref")).removeClass("is-invalid")
	} else {
		el.parent().find("span.select2").removeClass("is-invalid")
		el.removeClass("is-invalid")
	}
	
	if (error_el) {
		$(error_el).empty()
		error_el.css({ "display": "none" })
		
	}
	
}

const toNumbers = arr => arr.map(Number)

const remove_nulls = function (obj) {
	let cleanedObject = {}
	$.each(obj, function (i, v) {
		if (v === null) {
		
		} else {
			cleanedObject[i] = v
		}
	})
	
	return cleanedObject
}

const removeNulls = function (obj) {
	//console.log("removeNulls()")
	let cleanedObject = {}
	$.each(obj, function (i, v) {
		if (v === null) {
		
		} else {
			cleanedObject[i] = v
		}
	})
	
	return cleanedObject
}

const buildMap = function (arr, key) {
	let temp = new Map()
	$.each(arr, function (index, value) {
		temp.set(value[key], value)
	})
	return temp
}

const getListOfIds = function (list) {
	if (list) {
		
		if (typeof list === "string") {
			let str = list.replace(/\s/g, "")
			return Array.from(str.split(","), Number)
		} else if (typeof list === "object") {
			return list
		}
		
	}
	
	return []
}

const formatListOfIds = function (list) {
	let vals = ""
	if (list && typeof list === "object") {
		vals = list.join(',')
	}
	return vals
}

const sendGetRequest = function (url, data_to_send, callback) {
	let result = []
	
	if (url && data_to_send) {
		$.getJSONRequest(url, data_to_send, function (data, status, xhr) {
			
			//*
			console.log("url", url)
			console.log("data", data)
			console.log("status", status)
			console.log("xhr", xhr)
			console.log("typeof data.result", typeof data.result)
			//*/
			
			if (status === "success" && typeof data.result !== "undefined") {
				result = data.result
				return callback(result)
			} else if (status === "failed" && typeof data.error === "undefined") {
				return handleError(data)
			} else if (status === "success" && typeof data.error !== "undefined") {
				return handleError(data.error)
			} else {
				console.log("getError:4")
			}
		})
	} else {
		let msg = []
		if (!url) {
			msg.push("url")
		}
		if (!data_to_send) {
			msg.push("data_to_send")
		}
		
		return handleError("Missing Data: " + msg.join(", "))
	}
}

const sendPostRequest = function (url, data_to_send, callback) {
	let msg, result = []
	if (url && data_to_send) {
		$.postJSON(url, data_to_send, function (data, status, xhr) {
			/*
			//console.log("data", data)
			//console.log("status", status)
			//console.log("xhr", xhr)
			//console.log("typeof data.result", typeof data.result)
			//*/
			if (status === "success" && typeof data.result !== "undefined") {
				
				if (data.result) {
					result = data.result
					return callback(result)
				} else {
					return handleError("Error Posting Data 1")
				}
			} else if (status === "failed" && typeof data.result === "undefined") {
				if (data.error) {
					return handleError(data.error)
				}
				
				return handleError("Error Posting Data")
			} else {
				
				return handleError("Error Posting Data 2")
			}
		})
	} else {
		if (!url) {
			msg.push("url")
		}
		if (!data_to_send) {
			msg.push("data_to_send")
		}
		
		return handleError("Missing Data: " + msg.join(", "))
	}
}

const getAjaxError = function (jqXHR, exception, uri) {
	let msg = ""
	let error = {
		message: "",
		status: "",
		uri: uri,
	}
	
	if (jqXHR.status === 404) {
		msg = "Requested page( " + uri + " ) not found. [404]"
	}
	
	error.message = msg
	error.status = jqXHR.status
	error.uri = uri
	error.jqXHR = jqXHR
	return error
}

const _display_ajax_error = function (jqXHR, exception, uri) {
	let msg = ""
	let error = {
		message: "",
		status: "",
		uri: uri,
	}
	
	if (jqXHR.status === 0) {
		msg = "Not connected, verify Network."
	} else if (jqXHR.status === 404) {
		msg = "Requested page( " + uri + " ) not found. [404]"
	} else if (jqXHR.status === 500) {
		if (jqXHR.responseJSON) {
			msg = jqXHR.responseJSON
		} else {
			msg = "Internal Server Error [500]."
		}
		
	} else if (exception === "parsererror") {
		msg = "Requested JSON parse failed."
	} else if (exception === "timeout") {
		msg = "Time out error."
	} else if (exception === "abort") {
		msg = "Ajax request aborted."
	} else {
		msg = "Uncaught Error." + jqXHR.responseText
	}
	
	error.message = msg
	error.status = jqXHR.status
	error.uri = uri
	error.jqXHR = jqXHR
	return error
}

const handleError = function (msg, title, level) {
	console.groupCollapsed("Functions.handleError")
	// ----
	
	if (!title) {
		title = "Request"
	}
	
	if (!level) {
		level = "error"
	}
	
	if (!msg) {
		msg = "Error processing request"
	}
	
	toastr[level](`${msg}`, title)
	
	// ----
	console.groupEnd()
}

const validInt = function (val) {
	//console.groupCollapsed("Functions.validInt")
	// ----
	
	if (val) {
		if (!isNaN(parseInt(val))) {
			console.groupEnd()
			return parseInt(val)
		}
	}
	
	// ----
	//console.groupEnd()
	return null
}

const formatDateMySQL = function (date) {
	if (!date) {
		let date = new Date()
	}
	
	return moment(date).format("YYYY-MM-DD HH:mm:ss")
}

const resize_elements = function () {
	const _page = document.getElementById("page")
	const _main = document.getElementById("main")
	const _nav = document.getElementsByClassName("double-nav")
	const _screen_width = document.getElementById("screen_width")
	const _screen_height = document.getElementById("screen_height")
	const _footer = document.getElementsByClassName("page-footer")
	const _slide_out = document.getElementById("slide-out")
	const _page_header = document.getElementById("page_header")
	const _product_location_map_container = document.getElementById("product_location_map_container")
	const _product_location_map_container_frame = document.getElementById("product_location_map_container_frame")
	////
	let window_height = 0
	let window_width = 0
	let page_height = 0
	let page_width = 0
	let nav_height = 0
	let side_nav_width = 0
	let side_nav_height = 0
	let footer_height = 0
	///////////////////////////////////////////////
	window_height = window.innerHeight
	window_width = window.innerWidth
	///////////////////////////////////////////////
	$.each(_nav, function (i, elem) {
		let temp_height = (!isNaN(parseInt($(elem).outerHeight()))) ? parseInt($(elem).outerHeight()) : 0
		nav_height = nav_height + temp_height
	})
	
	$.each(_footer, function (i, elem) {
		let temp_height = (!isNaN(parseInt($(elem).outerHeight()))) ? parseInt($(elem).outerHeight()) : 0
		footer_height = footer_height + temp_height
	})
	///////////////////////////////////////////////
	let page_ht = (window_height - footer_height - nav_height - 1) + "px"
	///////////////////////////////////////////////
	
	if (_product_location_map_container && _product_location_map_container_frame) {
		let mapWidth = parseInt($(_product_location_map_container).outerWidth())
		let mapHeight = mapWidth / 2
		
		//*
		console.log("mapWidth", mapWidth)
		console.log("mapHeight", mapHeight)
		//*/
		
		$(_product_location_map_container_frame).css({
			"height": mapHeight + "px",
			"min-height": mapHeight + "px",
			"max-height": mapHeight + "px",
		})
		
		$(_product_location_map_container).css({
			"height": mapHeight + "px",
			"min-height": mapHeight + "px",
			"max-height": mapHeight + "px",
		})
		
	}
	
	if (_slide_out) {
		side_nav_height = (!isNaN(parseInt($(_slide_out).outerHeight()))) ? parseInt($(_slide_out).outerHeight()) : 0
		side_nav_width = (!isNaN(parseInt($(_slide_out).width()))) ? parseInt($(_slide_out).width()) : 0
	}
	
	if (_page && _screen_height && _screen_width) {
		if (_main) {
			$(_main).css({
				"padding-left": side_nav_width + "px",
				"min-height": window_height - footer_height - nav_height + "px!important",
			})
		}
		
		if (_page) {
			_page.setAttribute("style", "min-height:" + page_ht + "!important")
			//_page.setAttribute("style", "min-height:" + page_ht + "!important")
		}
		
		if (_page_header) {
			_page_header.setAttribute("style", "margin-top:" + nav_height + "px;")
		}
		
		//For debugging
		_screen_height.innerText = window_height + ""
		_screen_width.innerText = window_width + ""
	}
	
}

const debounce = function (func) {
	let timer
	return function (event) {
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(func, 100, event)
	}
}

const populateMultiSelect = function (arr, elem) {
	for (let i = 0, l = elem.options.length, o; i < l; i++) {
		o = elem.options[i]
		
		if (arr.indexOf(o.value) !== -1) {
			//console.log("ggg")
			o.selected = true
		}
		
	}
}

const findObjectByKey = function (array, key, value) {
	let results = []
	for (let i = 0; i < array.length; i++) {
		if (array[i][key] === value) {
			results.push(array[i])
		}
	}
	
	return results
}

const addTinyMCE = function (el) {
	tinymce.init({
		selector: "#" + el,
		menubar: false,
		height: "400",
		plugins: "print visualblocks visualchars charmap hr pagebreak advlist lists",
		content_css: [
			"https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
			"/assets/css/bootstrap.min.css",
			"/assets/css/style.css",
		],
		body_class: "p-2",
		font_formats: "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Open Sans=Open Sans; Roboto=Roboto;Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
		toolbar1: "undo redo | styleselect | fontselect fontsizeselect | removeformat | numlist bullist checklist | outdent indent ",
		toolbar2: "cut copy | bold italic underline strikethrough | forecolor | alignleft aligncenter alignright alignjustify | backcolor",
		content_style: "body { font-family:\"Roboto\",sans-serif\", sans-serif; font-size:14px; font-weight: 400 }",
		style_formats: [
			{
				title: "Headers",
				items: [
					{
						title: "h1",
						block: "h1",
					},
					{
						title: "h2",
						block: "h2",
					},
					{
						title: "h3",
						block: "h3",
					},
					{
						title: "h4",
						block: "h4",
					},
					{
						title: "h5",
						block: "h5",
					},
					{
						title: "h6",
						block: "h6",
					},
				],
			}, {
				title: "Blocks",
				items: [
					{
						title: "p",
						block: "p",
					},
					{
						title: "div",
						block: "div",
					},
					{
						title: "pre",
						block: "pre",
					},
				],
			}, {
				title: "Containers",
				items: [
					{
						title: "section",
						block: "section",
						wrapper: true,
						merge_siblings: false,
					},
					{
						title: "article",
						block: "article",
						wrapper: true,
						merge_siblings: false,
					},
					{
						title: "blockquote",
						block: "blockquote",
						wrapper: true,
					},
					{
						title: "hgroup",
						block: "hgroup",
						wrapper: true,
					},
					{
						title: "aside",
						block: "aside",
						wrapper: true,
					},
					{
						title: "figure",
						block: "figure",
						wrapper: true,
					},
				],
			},
		],
		branding: false,
		resize: false,
		setup: function (editor) {
			editor.on("change", function () {
				editor.save()
			})
		},
	})
}

/**
 * converts HTML entities in the string to their corresponding characters.
 *
 * @param value
 * @returns {*|jQuery}
 */
const htmlDecode = function (value) {
	return $("<textarea/>").html(value).text()
}

const is_null = function (val) {
	return val === null || val === undefined
}

/**
 * converts HTML entities in the string to their corresponding characters.
 *
 * @param str
 * @returns {*}
 */
function decodeHtml (str) {
	if (!str) {
		str = ""
	}
	let map =
		{
			"&amp;": "&",
			"&lt;": "<",
			"&gt;": ">",
			"&quot;": "\"",
			"&#039;": "'",
		}
	return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function (m) {return map[m]})
}

/**
 * escape html chars
 *
 * @param text
 * @returns {string}
 */
function escapeHtml (text) {
	if (!text) {
		text = ""
	}
	let map = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#039;",
	}
	
	return text.replace(/[&<>"']/g, function (m) { return map[m] })
}

const setInt = function (val) {
	let returnVal = null
	if (val) {
		if (!isNaN(parseInt(val))) {
			returnVal = val
		}
	}
	return returnVal
}

const inactivityTime = function () {
	let time
	window.onload = resetTimer
	
	// DOM Events
	document.onmousemove = resetTimer
	document.onkeydown = resetTimer
	
	function logout () {
		location.href = "/logout"
	}
	
	function resetTimer () {
		clearTimeout(time)
		time = setTimeout(logout, inactivityTimeout)
	}
}

const htmlEncode = function (value) {
	return $("<textarea/>").text(value).html()
}

const paddy = function (num, padlen, padchar) {
	let pad_char = typeof padchar !== "undefined" ? padchar : "0"
	let pad = new Array(1 + padlen).join(pad_char)
	return (pad + num).slice(-pad.length)
}

const generateCodeDirectId = function (provider) {
	if (!provider) {
		return ""
	}
	
	return "D" + paddy(14, 11)
}

const getDate = function (element) {
	if (element.pickadate("picker")) {
		return element.pickadate("picker").get()
	}
}

jQuery.extend({
	postJSON: function (url, data, callback) {
		let request = $.ajax({
			url: url,
			type: "POST",
			data: data,
			dataType: "json",
		})
		request.done(function (msg) {
			if ($.isFunction(callback)) {
				callback(msg, "success")
				return true
			}
		})
		request.fail(function (jqXHR, textStatus, msg) {
			/*
			if (toggleAJAXResponse) {
				const link = document.createElement("a")
				link.id = 'someLink' //give it an ID!
				link.href = "javascript:void(0);"
				link.addEventListener("click", function () {
					let file = new Blob([jqXHR.responseText], { type: "text/html" })
					let fileURL = URL.createObjectURL(file)
					let win = window.open()
					win.document.write('<iframe src="' + fileURL + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>')
				})
				let pageFrame = document.getElementById("page")
				pageFrame.appendChild(link)
				document.getElementById("someLink").click()
				link.removeEventListener("click")
				pageFrame.parentNode.removeChild(link)
			}
			//*/
			/*
			//console.log("jqXHR", jqXHR)
			//console.log("jqXHR", jqXHR.responseText)
			//console.log("_display_ajax_error", _display_ajax_error(jqXHR, textStatus, url))
			//console.log("textStatus", textStatus)
			//console.log("msg", msg)
			//console.log('http://dev.travelsoft.com/error')
			//*/
			if (typeof textStatus !== "undefined") {
				//console.error("Request failed", _display_ajax_error(jqXHR, textStatus, url))
			} else {
				//console.error("Request failed", _display_ajax_error(jqXHR, textStatus, url))
			}
			
			if ($.isFunction(callback)) {
				if (jqXHR.responseJSON) {
					callback(jqXHR, "failed")
				} else {
					callback(jqXHR, "failed")
				}
			}
			return false
		})
		return request
	},
	getJSONRequest: function (url, data, callback) {
		let getRequest = $.ajax({
			url: url,
			type: "GET",
			data: data,
			dataType: "json",
			async: true,
		})
		getRequest.done(function (msg) {
			if ($.isFunction(callback)) {
				callback(msg, "success")
			}
		})
		
		getRequest.fail(function (jqXHR, textStatus, msg) {
			let errors = getAjaxError(jqXHR, textStatus, url)
			
			if (typeof textStatus !== "undefined") {
				let err = _display_ajax_error(jqXHR, textStatus, url)
				//console.log("err", getAjaxError(jqXHR, textStatus, url))
				//handleError(err.message)
			} else {
				let err = _display_ajax_error(jqXHR, textStatus, url)
				//handleError(err.message)
			}
			
			if ($.isFunction(callback)) {
				msg = errors.message
				//console.log("msg -- ", msg)
				//console.log("msg -- ", errors.message)
				
				callback(msg, "failed")
			}
		})
		
	},
	getJSON: function (url, data, callback) {
		let getRequest = $.ajax({
			url: url,
			type: "GET",
			data: data,
			dataType: "json",
			async: false,
		})
		getRequest.done(function (msg) {
			if ($.isFunction(callback)) {
				callback(msg, "success")
			}
		})
		getRequest.fail(function (jqXHR, textStatus, msg) {
			if (typeof textStatus !== "undefined") {
				//console.log("Request failed")
				//console.log(_display_ajax_error(jqXHR, textStatus, url))
			} else {
				//console.log("Request failed")
				//console.log(_display_ajax_error(jqXHR, textStatus, url))
			}
			if ($.isFunction(callback)) {
				callback(msg, "failed")
			}
		})
	},
})

const infoDialog = function (message, handler) {
	$(`
        <!--Modal: modalConfirm-->
        <div class="modal fade" id="modalConfirm" tabindex="-1" role="dialog" aria-labelledby="modalConfirmationLabel" aria-hidden="true">
	<div class="modal-dialog modal-sm modal-notify modal-info" role="document">
		<!--Content-->
		<div class="modal-content text-center">
			<!--Header-->
			<div class="modal-header d-flex justify-content-center">
				<p class="heading">${message}</p>
			</div>

			<!--Body-->
			<div class="modal-body">
				<i class="fas fa-info fa-4x animated rotateIn"></i>
			</div>

			<!--Footer-->
			<div class="modal-footer flex-center">
				<a class="btn btn-outline-info btn-yes">yes</a>
				<a type="button" class="btn btn-info waves-effect btn-no">no</a>
			</div>
		</div>
		<!--/.Content-->
	</div>
</div>
        <!--Modal: modalConfirm-->
    `).appendTo("body")
	
	const modal = document.getElementById("modalConfirm")
	
	if (modal) {
		const $modal = $(modal)
		//Trigger the modal
		$modal
			.modal({
				backdrop: "static",
				keyboard: false,
			})
		
		//Pass true to a callback function
		$(".btn-yes")
			.click(function () {
				handler(true)
				$modal
					.modal("hide")
			})
		
		//Pass false to callback function
		$(".btn-no")
			.click(function () {
				handler(false)
				$modal
					.modal("hide")
			})
		
		//Remove the modal once it is closed.
		$modal
			.on("hidden.bs.modal", function () {
				$modal
					.remove()
			})
	}
	
}

const confirmDialog = function (message, handler) {
	$(`
        <!--Modal: modalConfirm-->
        <div class="modal fade" id="modalConfirm" tabindex="-1" role="dialog" aria-labelledby="modalConfirmationLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm modal-notify modal-info" role="document">
                <!--Content-->
                <div class="modal-content text-center">
                    <!--Header-->
                    <div class="modal-header d-flex justify-content-center">
                        <p class="heading">${message}</p>
                    </div>
                    <!--/.Header-->
                    
                    <!--Body-->
                    <div class="modal-body">
                        <i class="fas fa-check fa-4x mb-3 animated rotateIn"></i>
                    </div>
                    <!--/.Body-->
                   
        
                    <!--Footer-->
                    <div class="modal-footer flex-center">
                        <a type="button" class="btn btn-outline-info btn-sm waves-effect btn-no">no</a>
                        <a class="btn btn-info btn-sm btn-yes">yes</a>
                    </div>
                    <!--/.Footer-->
                    
                </div>
                
                <!--/.Content-->
	        </div>
        </div>
        <!--Modal: modalConfirm-->
    `)
		.appendTo("body")
	
	const modal = document.getElementById("modalConfirm")
	
	if (modal) {
		
		const $modal = $(modal)
		
		$modal
			.modal({
				backdrop: "static",
				keyboard: false,
			})
		
		//Pass true to a callback function
		$(".btn-yes")
			.on("click", function () {
				handler(true)
				$modal
					.modal("hide")
			})
		
		//Pass false to callback function
		$(".btn-no")
			.click(function () {
				handler(false)
				$("#modalConfirm")
					.modal("hide")
			})
			.on("click", function () {
				handler(false)
				$modal
					.modal("hide")
			})
		
		//Remove the modal once it is closed.
		$modal
			.on("hidden.bs.modal", function () {
				$("#modalConfirm")
					.remove()
			})
	}
	
}

const deleteDialog = function (message, handler) {
	
	$(`
        <!--Modal: modalConfirm-->
        <div class="modal fade" id="modalConfirm" tabindex="-1" role="dialog" aria-labelledby="modalConfirmationLabel" aria-hidden="true">
	<div class="modal-dialog modal-sm modal-notify modal-danger" role="document">
		<!--Content-->
		<div class="modal-content text-center">
			<!--Header-->
			<div class="modal-header d-flex justify-content-center">
				<p class="heading">${message}</p>
			</div>

			<!--Body-->
			<div class="modal-body">
				<i class="fas fa-times fa-4x animated rotateIn"></i>
			</div>

			<!--Footer-->
			<div class="modal-footer flex-center">
				<a class="btn btn-outline-danger btn-yes">yes</a>
				<a type="button" class="btn btn-danger waves-effect btn-no">no</a>
			</div>
		</div>
		<!--/.Content-->
	</div>
</div>
        <!--Modal: modalConfirm-->
    `)
		.appendTo("body")
	//Trigger the modal
	$("#modalConfirm")
		.modal({
			backdrop: "static",
			keyboard: false,
		})
	
	//Pass true to a callback function
	$(".btn-yes")
		.click(function () {
			handler(true)
			$("#modalConfirm")
				.modal("hide")
		})
	
	//Pass false to callback function
	$(".btn-no")
		.click(function () {
			handler(false)
			$("#modalConfirm")
				.modal("hide")
		})
	
	//Remove the modal once it is closed.
	$("#modalConfirm")
		.on("hidden.bs.modal", function () {
			$("#modalConfirm")
				.remove()
		})
	
}

const formatURL = function (param) {
	return encodeURIComponent(param.trim())
}

const buildMapsURL = function (location) {
	//console.log("buildMapsURL(location)", location)
	let name, building_number, street_1, street_2, zipcode, city_name, province_name, country_name
	
	building_number = (location.building_number) ? location.building_number : null
	name = (location.name) ? location.name : null
	street_1 = (location.street_1) ? location.street_1 : null
	street_2 = (location.street_2) ? location.street_2 : null
	zipcode = (location.zipcode) ? location.zipcode : null
	city_name = (location.city.name) ? location.city.name : null
	province_name = (location.province.iso2) ? location.province.iso2 : (location.province.iso3) ? location.province.iso3 : (location.province.name) ? location.province.name : null
	country_name = (location.province.name) ? location.country.name : (location.country.iso2) ? location.country.iso2 : (location.country.iso3) ? location.country.iso3 : null
	
	building_number = (building_number !== null) ? building_number : null
	
	name = (name !== null) ? name : null
	street_1 = (street_1 !== null) ? street_1 : null
	street_2 = (street_2 !== null) ? street_2 : null
	zipcode = (zipcode !== null) ? zipcode : null
	city_name = (city_name !== null) ? city_name : null
	province_name = (province_name !== null) ? province_name : null
	country_name = (country_name !== null) ? country_name : null
	
	let tempURL = []
	
	if (!is_null(name)) {
		tempURL.push(name)
	}
	
	if (!is_null(building_number)) {
		tempURL.push(building_number)
	}
	
	if (!is_null(street_1)) {
		tempURL.push(street_1)
	}
	
	if (!is_null(street_2)) {
		tempURL.push(street_2)
	}
	
	if (!is_null(city_name)) {
		//tempURL.push(city_name)
	}
	
	let provinceLine = ""
	
	if (!is_null(city_name) && !is_null(province_name) && !is_null(zipcode)) {
		provinceLine = zipcode + " " + city_name + " " + province_name
	} else if (is_null(city_name) && !is_null(province_name) && !is_null(zipcode)) {
		provinceLine = zipcode + " " + province_name
	} else if (is_null(city_name) && is_null(province_name) && !is_null(zipcode)) {
		provinceLine = zipcode
	} else if (!is_null(city_name) && is_null(province_name) && !is_null(zipcode)) {
		provinceLine = zipcode + " " + city_name
	} else if (!is_null(city_name) && !is_null(province_name) && is_null(zipcode)) {
		provinceLine = city_name + " " + province_name
	} else {
	
	}
	if (provinceLine !== "") {
		tempURL.push(provinceLine)
	}
	
	if (!is_null(country_name)) {
		tempURL.push(country_name)
	}
	
	let location_formatted = tempURL.join(", ")
	location_formatted = formatURL(location_formatted)
	return `https://maps.google.com/maps?q=${location_formatted}&t=&z=7&ie=UTF8&iwloc=&output=embed`
}

const weatherUpdate = function (city) {
	const xhr = new XMLHttpRequest()
	const apiKey = "2ad550b2d7e352b38c3ca9da8396aade"
	let cityName = city
	xhr.open(
		"GET",
		`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
	
	xhr.send()
	xhr.onload = () => {
		if (xhr.status === 404) {
			//console.log(`${cityName} not found`)
		} else {
			let data = JSON.parse(xhr.response)
			let mainWeatherCityName = data.name
			let mainWeatherTemperature = `${Math.round(data.main.temp - 273.15)}°C`
			let mainWeather = data.weather[0].main
			let mainWeatherDescription = data.weather[0].description
			let mainWeatherImage = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
			//console.log("mainWeatherCityName", mainWeatherCityName)
			//console.log("mainWeatherTemperature", mainWeatherTemperature)
			//console.log("mainWeather", mainWeather)
			//console.log("mainWeatherDescription", mainWeatherDescription)
			//console.log("mainWeatherImage", mainWeatherImage)//100x100
			//console.log("data", data)
		}
	}
}

const ucwords = function (str) {
	str = str.toLowerCase()
	
	return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
		function (s) {
			return s.toUpperCase()
		})
}

const trimTrailingChars = function (s, charToTrim) {
	return s.replace(new RegExp(charToTrim + "+$"), "")
}

const formatSize = function (bytes, decimals = 2) {
	const k = 1024
	const dm = decimals < 0 ? 0 : decimals
	const units = ["BYTES", "KB", "MB"]
	let size, unit
	
	unit = bytes.toUpperCase()
	unit = trimTrailingChars(unit, "S")
	unit = unit.replace(/BYTE/g, "BYTES")
	unit = unit.replace(/MEGABYTE/g, "MB")
	unit = unit.replace(/KILOBYTE/g, "KB")
	
	if (unit.includes("BYTES")) {
		let unitType = "BYTES"
		
		return (!isNaN(parseInt(unit.replace(`/${unitType}/g`, "")))) ? parseInt(unit.replace(`/${unitType}/g`, "")) : null
	} else if (unit.includes("KB")) {
		let unitType = "KB"
		
		size = (!isNaN(parseInt((parseFloat(unit.replace(`/${unitType}/g`, "")).toFixed(dm)) * 1024))) ? parseInt((parseFloat(unit.replace(`/${unitType}/g`, "")).toFixed(dm)) * 1024) : null
		
		if (size !== null) {
			return size
		}
	} else if (unit.includes("MB")) {
		let unitType = "MB"
		
		size = (!isNaN(parseInt((parseFloat(unit.replace(`/${unitType}/g`, "")).toFixed(dm)) * 2097152))) ? parseInt((parseFloat(unit.replace(`/${unitType}/g`, "")).toFixed(dm)) * 2097152) : null
		
		if (size !== null) {
			return size
		}
	}
}

/**
 * DEBUG
 */
$(function () {
	$(".debug")
		.on("click", function () {
			showElements = true
			if (!$(this).attr("data-shown")) {
				$(this).attr("data-shown", "true")
				showElements = true
			}
			
			if ($(this).attr("data-shown") === "false") {
				$(this).attr("data-shown", "true")
				showElements = true
			} else {
				showElements = false
				$(this).attr("data-shown", "false")
			}
			
			let els = document.getElementsByClassName("dev-element")
			
			for (let i = 0; i < els.length; i++) {
				
				let element = els[i]
				let tagName = element.tagName
				
				if (tagName.toLowerCase() === "input") {
					
					if (showElements === false) {
						element.hidden = false
						element.type = "text"
					} else {
						element.hidden = true
						element.type = "hidden"
					}
				} else if (tagName.toLowerCase() === "label") {
					if (showElements === false) {
						$(element).removeClass("d-none")
					} else {
						$(element).addClass("d-none")
					}
				}
			}
		})
	
	$(".debug_demo")
		.on("click", function () {
			showElements = true
			if (!$(this).attr("data-shown")) {
				$(this).attr("data-shown", "true")
				showElements = true
			}
			
			if ($(this).attr("data-shown") === "false") {
				$(this).attr("data-shown", "true")
				showElements = true
			} else {
				showElements = false
				$(this).attr("data-shown", "false")
			}
			
			let els = document.getElementsByClassName("dev-element")
			
			for (let i = 0; i < els.length; i++) {
				
				let element = els[i]
				let tagName = element.tagName
				
				if (tagName.toLowerCase() === "input") {
					
					if (showElements === false) {
						element.hidden = false
						element.type = "text"
					} else {
						element.hidden = true
						element.type = "hidden"
					}
				} else if (tagName.toLowerCase() === "label") {
					if (showElements === false) {
						$(element).removeClass("d-none")
					} else {
						$(element).addClass("d-none")
					}
				}
			}
		})
})

const lowercaseFirstLetter = function (string) {
	return string.charAt(0).toLowerCase() + string.slice(1)
}

String.prototype.ucwords = function () {
	str = this.toLowerCase()
	return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
		function (s) {
			return s.toUpperCase()
		})
}
String.prototype.toUCWords = function () {
	let regex = /(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g
	
	return this.toLowerCase().replace(regex,
		function (s) {
			return s.toUpperCase()
		})
}
String.prototype.toSnakeCase = function () {
	const regexCleanString = /[^A-Za-z0-9]/g
	
	return this
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
		.map(x => x.toLowerCase())
		.join('_')
}
String.prototype.toCamelCase = function () {
	const regexCleanString = /[^A-Za-z0-9]/g
	const regex = /(?:^\w|[A-Z]|\b\w)/g
	
	let text = this
	let str = ""
	
	text.replace(/^\s+|\s+$/gm, '')
	
	//let str = this.replace(regexCleanString, "")
	let stringParts = text.split(" ")
	
	for (let n = 0; n < stringParts.length; n++) {
		let stringValue = stringParts[n].replace(regexCleanString, "")
		
		if (n === 0) {
			stringValue = stringValue.toLowerCase()
		} else {
			stringValue = stringValue.toUCWords()
		}
		
		str += stringValue
	}
	return str
}

const buildRow = function (attr) {
	console.log("buildRow(attr)", attr)
	// ----
	
	let el = document.createElement("div")
	let classes = (attr && attr.classes) ? attr.classes : ["row"]
	let data = (attr && attr.data) ? attr.data : []
	let id = (attr && attr.id) ? attr.id : null
	let idLine = (id !== null) ? `id="${id}"` : ""
	
	if (id !== null) {
		el.setAttribute("id", id)
	}
	
	if (!Array.isArray(classes)) {
		classes = classes.split(" ")
	}
	
	if (!Array.isArray(data)) {
		data = data.split(" ")
	}
	
	for (let n = 0; n < classes.length; n++) {
		el.classList.add(classes[n])
	}
	
	return el
}

const buildColumn = function (attr) {
	console.log("buildColumn(attr)", attr)
	// ----
	
	let el = document.createElement("div")
	let classes = (attr && attr.classes) ? attr.classes : ["col"]
	let data = (attr && attr.data) ? attr.data : []
	let id = (attr && attr.id) ? attr.id : null
	let idLine = (id !== null) ? `id="${id}"` : ""
	
	if (id !== null) {
		el.setAttribute("id", id)
	}
	
	for (let n = 0; n < classes.length; n++) {
		el.classList.add(classes[n])
	}
	
	return el
}

const isNumeric = function (input, keyCode) {
	if (!isNaN(parseInt(keyCode))) {
		keyCode = parseInt(keyCode)
	}
	
	// keyCode: 9   -   tab
	
	if (keyCode === 16) {
		isShift = true
	}
	
	if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || (keyCode === 8) || (keyCode === 46)) {
		
		if (keyCode !== 16) {
			if ((input.value.length === 4 || input.value.length === 7) && keyCode !== 8) {
				input.value += separatorDate
			}
			
			return true
		}
		
	}
	
	return false
}
