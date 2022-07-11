function Package2 (options) {

}

function Agenda (element, options) {
	if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
		return
	}
	
	let defaultYear = (options && options.year) ? options.year : moment().format("YYYY")
	let defaultMonth = (options && options.month) ? options.month : "01"
	let defaultDay = (options && options.day) ? options.day : "01"
	let defaultDate = `${defaultYear}-${defaultMonth}-${defaultDay}`
	let daySpan = (options && options.package && options.package.day_span && !isNaN(parseInt(options.package.day_span))) ? parseInt(options.package.day_span) : 1
	let validRangeStart = moment(defaultDate).format("YYYY-MM-DD")
	let validRangeEnd = moment(defaultDate, "YYYY-MM-DD").add(daySpan, "days").format("YYYY-MM-DD")
	
	this.calendar_options = {
		defaultDate: defaultDate,
		defaultView: "agendaView",
		editable: true,
		droppable: true,
		allDayText: "Hotels",
		showNonCurrentDates: false,
		fixedWeekCount: false,
		noEventsMessage: "No Events",
		header: {
			left: "prev,next today",
			center: "title",
			right: "agendaView,month,agendaWeek,agendaDay,basic",
		},
		views: {
			basic: {
				// options apply to basicWeek and basicDay views
				buttonText: "Basic",
				titleFormat: "DDD",
			},
			month: {
				// options apply to basicDay and agendaWeek views
				buttonText: "Month",
				
				validRange: {
					start: validRangeStart,
					end: validRangeEnd,
				},
			},
			week: {
				// options apply to basicDay and agendaWeek views
				buttonText: "Week",
				titleFormat: "DDD",
				columnHeaderHtml: function (mom) {
					return `<b>${mom.dayOfYear()}</b>`
				},
				defaultDate: defaultDate,
				validRange: {
					start: validRangeStart,
					end: validRangeEnd,
				},
			},
			day: {
				// options apply to basicDay and agendaDay views
				buttonText: "Day",
				titleFormat: "DDD",
			},
			agendaView: {
				// options apply to basicDay and agendaView views
				name: "agendaView",
				type: "agenda",
				buttonText: "Agenda",
				titleFormat: "DDD",
				duration: { days: 5 },
				columnHeaderHtml: function (mom) {
					return `<b>${mom.dayOfYear()}</b>`
				},
				validRange: {
					start: validRangeStart,
					end: validRangeEnd,
				},
				
			},
		},
		dayRender: function (date, element) {
			let day = moment(date).format("YYYYMMDD")
			let selectedDay = moment(date).format(defaultDateFormat)
			let id = "a" + day
			let month = moment(date).month()
			let year = moment(date).year()
			let dow = moment(date).day()
			let top = $(`td.fc-day-top[data-date='${selectedDay}']`)
			let classList = $(element).attr("class")
			
			//*
			console.log("  ----------  ")
			console.log("date", moment(date).format("YYYY-MM-DD"))
			console.log("element.length", element.length)
			console.log("element", element)
			console.log("classList", classList)
			console.log("element.classList", element.classList)
			console.log("day", day)
			console.log("selectedDay", selectedDay)
			console.log("id", id)
			console.log("top", top)
			console.log("  ----------  ")
			console.log("")
			//*/
			
		},
	}
	
	let defaults = {}
	
	this.calendar = null
	this.element = element
	this.$element = $(element)
	
	this.settings = $.extend(true, defaults, options, this.$element.data())
	
	this.initialize()
}

Agenda.prototype.handleDuplicateProduct = function () {
	console.groupCollapsed("Agenda.handleDuplicateProduct()")
	// ----
	
	// ----
	console.groupEnd()
}

Agenda.prototype.initialize = function () {
	console.groupCollapsed("Agenda.initialize()")
	// ----
	
	//
	
	this.elementsCreate()
	this.elementsRender()
	this.elementsAssign()
	
	this.$element.fullCalendar("changeView", "agendaView")
	
	// ----
	console.groupEnd()
}

Agenda.prototype.elementsCreate = function () {
	console.groupCollapsed("Agenda.elementsCreate()")
	// ----
	
	// ----
	console.groupEnd()
}

Agenda.prototype.elementsRender = function () {
	console.groupCollapsed("Agenda.elementsRender()")
	// ----
	
	this.calendar = this.$element.fullCalendar(this.calendar_options)
	
	// ----
	console.groupEnd()
}

Agenda.prototype.elementsAssign = function () {
	console.groupCollapsed("Agenda.elementsAssign()")
	// ----
	
	let _this = this
	let calendar = this.$element.fullCalendar("getCalendar")
	
	this.handleDuplicateProduct = this.handleDuplicateProduct.bind(this)
	this.eventRemove = this.eventRemove.bind(this)
	this.eventFetch = this.eventFetch.bind(this)
	
	calendar.on("dayClick", function (date, jsEvent, view) {
		_this.dayClick(date, jsEvent, view)
	})
	
	calendar.on("dayRender", function (date, element) {
		//_this.dayRender(date, element)
	})
	
	calendar.on("eventClick", function (event, element, view) {
		_this.eventClick(event, element, view)
	})
	
	calendar.on("eventReceive", function (event) {
		_this.eventReceive(event)
	})
	
	calendar.on("eventRender", function (event, element) {
		_this.eventRender(event, element)
	})
	
	// ----
	console.groupEnd()
}

Agenda.prototype.dayClick = function (date, jsEvent, view) {
	console.groupCollapsed("Agenda.dayClick")
	// ----
	
	//let data = {}
	//let $elementClicked
	
	//if (jsEvent.target.classList.contains("fc-bgevent")) {
	//$elementClicked = $(jsEvent.target)
	//} else {
	//$elementClicked = $(jsEvent.target).parents("td.fc-bgevent")
	//}
	
	console.log("jsEvent.target", jsEvent.target)
	
	//console.log("$elementClicked", $elementClicked)
	console.log("jsEvent.data()", jsEvent)
	console.log("date", moment(date).format("YYYY-MM-DD"))
	
	if (jsEvent.target.classList.contains("fc-bgevent") || jsEvent.target.classList.contains("fc-content-skeleton")) {
		console.log('Click Background Event Area')
	}
	
	// ----
	console.groupEnd()
}

Agenda.prototype.dayRender = function (date, element) {
	//console.groupCollapsed("Agenda.dayRender(date, element)")
	// ----
	
	let day = moment(date).format("YYYYMMDD")
	let selectedDay = moment(date).format(defaultDateFormat)
	let id = "a" + day
	let month = moment(date).month()
	let year = moment(date).year()
	let dow = moment(date).day()
	let top = $(`td.fc-day-top[data-date='${selectedDay}']`)
	
	//*
	console.log("date", moment(date).format("YYYY-MM-DD"))
	console.log("element", element)
	
	console.log("element.classList", element.classList)
	console.log("day", day)
	console.log("selectedDay", selectedDay)
	console.log("id", id)
	console.log("top", top)
	//*/
	
	if (!$(element).hasClass("fc-disabled-day")) {
		$(top).attr("agenda", "true")
		$(top).attr("data-date", selectedDay)
		$(top).attr("id", id)
		$(top).attr("day", day)
		$(top).attr("month", month)
		$(top).attr("year", year)
		$(top).attr("dow", dow)
		
		$(element).attr("agenda", "true")
		$(element).attr("data-date", selectedDay)
		$(element).attr("id", id)
		$(element).attr("day", day)
		$(element).attr("month", month)
		$(element).attr("year", year)
		$(element).attr("dow", dow)
		$(element).attr("data-selected", "false")
	}
	
	// ----
	//console.groupEnd()
}

Agenda.prototype.eventClick = function (event, element, view) {
	console.groupCollapsed("Agenda.eventClick")
	// ----
	
	/*
	console.log("event", event)
	console.log("element", element)
	console.log("view", view)
	console.log("Coordinates", element.pageX + "," + element.pageY)
	console.log("View Name: ", view.name)
	//*/
	
	this.loadEvent(event)
	
	// ----
	console.groupEnd()
}

Agenda.prototype.eventReceive = function (event) {
	console.groupCollapsed("Agenda.eventReceive(event)")
	// ----
	
	let id, dayId, packageId, productId, unitId, categoryId
	let data = (event && event.data) ? event.data : null
	let startDate = (event && event.start) ? moment(event.start).format(defaultDateFormat) : null
	let eventId = (event && event._id) ? event._id : null
	let product = (data && data.product) ? data.product : null
	let unit = (data && data.unit) ? data.unit : null
	let category = (data && data.category) ? data.category : null
	
	if (product !== null && unit !== null && category !== null) {
		
		packageId = (!isNaN(parseInt(Package.id))) ? parseInt(Package.id) : null
		productId = (!isNaN(parseInt(product.id))) ? parseInt(product.id) : null
		categoryId = (!isNaN(parseInt(category.id))) ? parseInt(category.id) : null
		unitId = (!isNaN(parseInt(unit.id))) ? parseInt(unit.id) : null
		dayId = (event.start) ? moment(event.start).dayOfYear() : null
		id = `${dayId}_${packageId}_${productId}_${unitId}`
		
		console.log("categoryId", categoryId)
		if (categoryId === 1) {
			let hasHotelEvent = Package.hotelEvents.get(startDate)
			let hasEvent = Package.events.get(eventId)
			
			if (!hasHotelEvent) {
				Package.hotelEvents.set(startDate, event)
			} else {
				this.eventRemove(eventId)
			}
			
		} else {
			if (Package.events.get(id)) {
				this.eventRemove(eventId)
			} else {
				Package.events.set(id, event)
			}
		}
		
	}
	
	// ----
	console.groupEnd()
}

Agenda.prototype.eventRemove = function (eventId) {
	console.groupCollapsed("Agenda.eventRemove")
	// ----
	
	console.log("eventId", eventId)
	
	if (!eventId) {
		return
	}
	
	this.$element.fullCalendar("removeEvents", eventId)
	
	// ----
	console.groupEnd()
}

Agenda.prototype.eventFetch = function (eventId) {
	console.groupCollapsed("Agenda.eventFetch")
	// ----
	
	let events = []
	
	if (eventId) {
		events = this.$element.fullCalendar("clientEvents", eventId)
	}
	
	// ----
	console.groupEnd()
	return events
}

Agenda.prototype.eventRender = function (event, element) {
	console.groupCollapsed("Agenda.eventRender(event, element)")
	// ----
	
	let _this = this
	
	let category, product, unit
	let textColor, className, categoryId
	let startDate = (event && event.start) ? moment(event.start).format(defaultDateFormat) : null
	let day = (event && event.start) ? moment(event.start).dayOfYear() : null
	let eventTitle = (event && event.title) ? event.title : ""
	let formattedEvent = {}
	let data = (event.data) ? event.data : null
	
	if (data && day) {
		category = (data && data.category) ? data.category : null
		product = (data && data.product) ? data.product : null
		unit = (data && data.unit) ? data.unit : null
		data.day = day
	}
	
	let productId = (product && !isNaN(parseInt(product.id))) ? parseInt(product.id) : null
	let unitId = (product && !isNaN(parseInt(unit.id))) ? parseInt(unit.id) : null
	
	if (category) {
		categoryId = (!isNaN(parseInt(category.id))) ? parseInt(category.id) : null
		textColor = (category.text_color) ? category.text_color : "black"
		
		if (categoryId) {
			switch (categoryId) {
				case 1:
					// hotels
					formattedEvent.allDay = true
					formattedEvent.textColor = categoryColors.hotels.color
					formattedEvent.borderColor = categoryColors.hotels.border
					formattedEvent.backgroundColor = categoryColors.hotels.background
					formattedEvent.className = "hotels"
					formattedEvent.rendering = "background"
					break
				case 2:
					// flights
					formattedEvent.allDay = false
					formattedEvent.textColor = categoryColors.flights.color
					formattedEvent.borderColor = categoryColors.flights.border
					formattedEvent.backgroundColor = categoryColors.flights.background
					formattedEvent.className = "flights"
					break
				case 3:
					// cars
					formattedEvent.allDay = false
					formattedEvent.textColor = categoryColors.cars.color
					formattedEvent.borderColor = categoryColors.cars.border
					formattedEvent.backgroundColor = categoryColors.cars.background
					formattedEvent.className = "cars"
					break
				case 4:
					// rails
					formattedEvent.allDay = false
					formattedEvent.textColor = categoryColors.rails.color
					formattedEvent.borderColor = categoryColors.rails.border
					formattedEvent.backgroundColor = categoryColors.rails.background
					formattedEvent.className = "rails"
					break
				case 5:
					// transports
					formattedEvent.allDay = false
					formattedEvent.textColor = categoryColors.transports.color
					formattedEvent.borderColor = categoryColors.transports.border
					formattedEvent.backgroundColor = categoryColors.transports.background
					formattedEvent.className = "transports"
					break
				case 6:
					// tours
					formattedEvent.allDay = false
					formattedEvent.textColor = categoryColors.tours.color
					formattedEvent.borderColor = categoryColors.tours.border
					formattedEvent.backgroundColor = categoryColors.tours.background
					formattedEvent.className = "tours"
					break
				case 7:
					// cruises
					formattedEvent.allDay = false
					formattedEvent.textColor = categoryColors.cruises.color
					formattedEvent.borderColor = categoryColors.cruises.border
					formattedEvent.backgroundColor = categoryColors.cruises.background
					formattedEvent.className = "cruises"
					break
				case 8:
					// packages
					formattedEvent.allDay = false
					formattedEvent.textColor = categoryColors.packages.color
					formattedEvent.borderColor = categoryColors.packages.border
					formattedEvent.backgroundColor = categoryColors.packages.background
					formattedEvent.className = "packages"
					break
				case 9:
					// other
					formattedEvent.allDay = false
					formattedEvent.textColor = categoryColors.other.color
					formattedEvent.borderColor = categoryColors.other.border
					formattedEvent.backgroundColor = categoryColors.other.background
					formattedEvent.className = "other"
					break
			}
		}
		
	}
	
	if (event.rendering === "background") {
		
		if ($(element).hasClass("fc-disabled-day")) {
			return
		}
		
		let $eventHeading = $(`<p class="text-truncate" style="text-decoration: underline;cursor:pointer;color:${textColor};height:100%;width:100%;">${eventTitle}</p>`)
		
		$eventHeading
			.data("product-id", productId)
			.data("date", startDate)
			.data("unit-id", unitId)
			.data("category-id", categoryId)
			.data("day", day)
			.data("event", event)
			.on("click", function (e) {
				let eventData = ($(this).data("event")) ? $(this).data("event") : null
				
				if (eventData) {
					_this.loadEvent(eventData)
				}
				
			})
		
		$(element)
			.empty()
			.css({
				"z-index": day + "000",
				"background-color": formattedEvent.backgroundColor,
				"color": formattedEvent.textColor,
				"opacity": 1,
				"font-weight": 500,
			})
			.data("product-id", productId)
			.data("date", startDate)
			.data("unit-id", unitId)
			.data("category-id", categoryId)
			.data("day", day)
			.data("event", event)
			.on("click", function (e) {
				let eventData = ($(this).data("event")) ? $(this).data("event") : null
				
				if (eventData) {
					_this.loadEvent(eventData)
				}
				
			})
			.html(`<p class="text-truncate" style="text-decoration: underline;cursor:pointer;color:${textColor};height:100%;width:100%;">${eventTitle}</p>`)
	}
	
	// ----
	console.groupEnd()
}

Agenda.prototype.save = function () {
	console.groupCollapsed("Agenda.save()")
	// ----
	
	// ----
	console.groupEnd()
}

Agenda.prototype.update = function () {
	console.groupCollapsed("Agenda.update()")
	// ----
	
	// ----
	console.groupEnd()
}

Agenda.prototype.get = function () {
	console.groupCollapsed("Agenda.get()")
	// ----
	
	// ----
	console.groupEnd()
}

Agenda.prototype.loadEvent = function (event) {
	console.groupCollapsed("Agenda.loadEvent")
	// ----
	console.log("event", event)
	Package.loadEditEvent(event)
	
	// ----
	console.groupEnd()
}

Agenda.prototype.buildEditEventForm = function () {
	console.groupCollapsed("Agenda.buildEditEventForm")
	// ----
	
	let _backdrop = document.createElement("div")
	_backdrop.classList.add("")
	
	// ----
	console.groupEnd()
}

$.fn.agenda = function (options) {
	"use strict"
	
	let newAgenda, elementId
	
	if ($(this).attr("id")) {
		elementId = $(this).attr("id")
		newAgenda = new Agenda(document.getElementById(elementId), options)
	}
	
	return $.data(this, "agenda", newAgenda)
}

