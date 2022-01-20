$.fn.YearCalendar = function (settings) {
    "use strict"
    let calendarType = "season"
    let selectedStart, selectedEnd = null
    let calendar_id = $(this).attr("id")
    let calContainer = document.getElementById(calendar_id)
    let calendars = []
    let seasonEvents = new Map()
    
    const _calendar_filter_ranges = document.getElementById("calendar_filter_ranges")
    const _product_id = document.getElementById("product_id")
    
    let product_id = parseInt(_product_id.value)
    
    const pad = function (d) {
        return (d < 10) ? '0' + d.toString() : d.toString()
    }
    
    // ----
    
    // ----
    const buildCalendarRow = function (calendar_id) {
        let calendarRow = document.createElement("div")
        calendarRow.classList = "row gx-1"
        return calendarRow
    }
    
    const buildCalendarColumn = function (calendar_id) {
        let calendarRow = document.createElement("div")
        calendarRow.classList = "flex-fill col-4 p-1"
        return calendarRow
    }
    
    const buildCalendarElementPanel = function (calendar_id) {
        let calendarBlock = document.createElement("div")
        calendarBlock.classList = ["card card-block p-1 z-depth-0"]
        
        return calendarBlock
    }
    
    const buildCalendarElement = function (calendar_id) {
        let calendarPanel = buildCalendarElementPanel(calendar_id)
        let calendarColumn = buildCalendarColumn(calendar_id)
        let calendarBlock = document.createElement("div")
        let calendarBlockId = "calendar_block_" + calendar_id
        //
        calendarBlock.classList = "my_calendar"
        calendarBlock.id = calendarBlockId
        //
        calendarColumn.appendChild(calendarPanel)
        calendarPanel.appendChild(calendarBlock)
        //
        calendars.push(calendarBlock)
        return calendarColumn
    }
    
    const buildCalendarContainer = function () {
        let calendarBlockContainer = document.createElement("div")
        let calendarBlockContainerId = "calendar_block_container"
        let row = buildCalendarRow()
        
        calendarBlockContainer.classList = ["calendarContainer container-fluid"]
        calendarBlockContainer.id = calendarBlockContainerId
        
        for (let n = 0; n < initialCalenderViewCount; n++) {
            let id = (n + 1)
            if (n % 3 === 0 && n > 0) {
                calendarBlockContainer.appendChild(row)
                row = buildCalendarRow(id)
            }
            
            row.appendChild(buildCalendarElement(id))
        }
        
        calendarBlockContainer.appendChild(row)
        
        return calendarBlockContainer
    }
    // ----
    
    // ----
    
    const clearDisabledDates = function () {
        let days = $("td[season='true']")
        days.each(function (index, element) {
            $(this).removeClass("disabled-day")
            $(this).attr("disabled", false)
        })
        YearCalendar.selectedDates = new Map()
    }
    
    const clearSelectedDates = function () {
        let days = $("td[season='true']")
        days.each(function (index, element) {
            $(this).removeClass("selected-day")
            $(this).attr("selected", false)
        })
        YearCalendar.selectedDates = new Map()
    }
    
    const buildSeasonEvent = function (event) {
        if (!event || (!event.season)) {
            return
        }
        
        let e = {}
        let event_id = "s-"
        
        if (event.date) {
            e.allDay = true
            e.start = event.date
            e.end = event.date
            event_id += moment(event.date).format("YYYYMMDD")
        }
        
        if (event.product_id) {
            event_id += "-" + event.product_id
        }
        
        if (event.season) {
            e.title = event.season.name
            event_id += "-" + event.season.id
            if (event.season.color_scheme) {
                e.backgroundColor = event.season.color_scheme.background_color
                e.borderColor = event.season.color_scheme.border_color
                e.textColor = event.season.color_scheme.text_color
            }
        }
        
        /**
         * @name id
         * @type {string|number|null}
         * @description Optional Uniquely identifies the given event. Different instances of repeating events should all have the same <pre><code>id</code></pre>.
         */
        e.id = event_id
        e.editable = true			//true or false. Optional. Overrides the master editable option for this single event.
        e.startEditable = false		//true or false. Optional. Overrides the master eventStartEditable option for this single event.
        e.durationEditable = false	//true or false. Optional. Overrides the master eventDurationEditable option for this single event.
        e.rendering = "background"			//Allows alternate rendering of the event, like background events. Can be empty, "background", or "inverse-background"
        e.overlap = true			//true or false. Optional. Overrides the master eventOverlap option for this single event. If false, prevents this event from being dragged/resized over other events. Also prevents other events from being dragged/resized over this event.
        
        return e
    }
    
    const buildUnitEvent = function (event, unit) {
        let e = {}
        let event_id = "u-"
        if (!event || (!unit)) {
            return
        }
        
        if (event.date) {
            e.allDay = true
            e.start = event.date
            e.end = event.date
            event_id += moment(event.date).format("YYYYMMDD")
        }
        
        if (event.product_id) {
            event_id += "-" + event.product_id
        }
        
        if (event.season) {
            event_id += "-" + event.season.id
        }
        
        if (unit) {
            e.title = unit.name
            event_id += "-" + unit.id
        }
        
        /**
         * @name id
         * @type {string|number|null}
         * @description Optional Uniquely identifies the given event. Different instances of repeating events should all have the same <pre><code>id</code></pre>.
         */
        e.id = event_id
        e.editable = true
        e.startEditable = false
        e.durationEditable = false
        e.overlap = true
        e.backgroundColor = "#11c26d"
        e.borderColor = "#11c26d"
        e.textColor = "#0a070d"
        return e
    }
    
    const formatEvent = function (event) {
        if (!event) {
            return
        }
        
        if (event.season) {
            let seasonEvent = buildSeasonEvent(event)
            seasonEvents.set(seasonEvent.id, seasonEvent)
        }
        
        if (event.units) {
            for (let n = 0; n < event.units.length; n++) {
                let unitEvent = buildUnitEvent(event, event.units[n])
                seasonEvents.set(unitEvent.id, unitEvent)
            }
        }
    }
    
    const addEventToCalendars = function (event) {
        if (!event) {
            return
        }
        
        $.each(YearCalendar.activeCalendars, function (k, el) {
            $(el).fullCalendar("renderEvent", event)
        })
    }
    
    const loadEvents = function (events) {
        seasonEvents = new Map()
        if (!events) {
            events = []
        }
        
        $.each(events, function (i, event) {
            //formatEvent(event)
        })
        
        $.each(Array.from(seasonEvents.values()), function (i, event) {
            //addEventToCalendars(event)
        })
    }
    
    const fetchCalendarEvents = function (dataToSend, callback) {
        if (dataToSend) {
            try {
                sendGetRequest("/api/v1.0/calendars", dataToSend, function (data, status, xhr) {
                    //Console.log("data", data)
                    if (data) {
                        return callback(data)
                    } else {
                        return callback([])
                    }
                })
            } catch (e) {
                Console.log("error", e)
                return callback([])
            }
        } else {
            return callback([])
        }
    }
    
    const refetchCalendarEvents = function () {
    
    }
    
    const getDate = function (startYear, monthsOut) {
        let startMonth = (0 + monthsOut) + 1
        let startDay = 1
        return moment(startYear + "-" + pad(startMonth) + "-" + pad(startDay)).format("YYYY-MM-DD")
    }
    
    const selectDay = function (_this, dateClicked) {
        if ($(_this).hasClass("selected-day")) {
            $(_this).removeClass("selected-day")
            $("td.fc-day-top[data-date='" + moment(dateClicked).format("YYYY-MM-DD") + "']").removeClass("selected-day")
            YearCalendar.selectedDates.delete(dateClicked)
        } else {
            $(_this).addClass("selected-day")
            $("td.fc-day-top[data-date='" + moment(dateClicked).format("YYYY-MM-DD") + "']").addClass("selected-day")
            YearCalendar.selectedDates.set(dateClicked, dateClicked)
            selectedStart = dateClicked
            selectedEnd = null
        }
    }
    
    const selectDates = function (_this, startDate, endDate) {
        let start = new Date(moment(startDate).format("MM/DD/YYYY"))
        let end = new Date(moment(endDate).format("MM/DD/YYYY"))
        let loop = new Date(start)
        
        $("td.fc-day[data-date='" + moment(endDate).format("YYYY-MM-DD") + "']").removeClass("selected-day")
        $("td.fc-day[data-date='" + moment(startDate).format("YYYY-MM-DD") + "']").removeClass("selected-day")
        $("td.fc-day-top[data-date='" + moment(endDate).format("YYYY-MM-DD") + "']").removeClass("selected-day")
        
        while (loop <= end) {
            selectDay($("td.fc-day[data-date='" + moment(loop).format("YYYY-MM-DD") + "']"), moment(loop).format("YYYY-MM-DD"))
            let newDate = loop.setDate(loop.getDate() + 1)
            loop = new Date(newDate)
        }
    }
    
    const buildCalendar = function (settings) {
        let dateToday = new Date()
        calContainer.appendChild(buildCalendarContainer())
        YearCalendar.start = (settings && settings.start) ? settings.start : dateToday.getFullYear()
        YearCalendar.events = (settings && settings.events) ? settings.events : []
        YearCalendar.getTitle()
        
        let activeCal = $.each(calendars, function (index, cal) {
            let displayMonth = getDate(YearCalendar.start, index)
            
            $(cal).fullCalendar({
                selectable: false,
                showNonCurrentDates: false,
                defaultDate: displayMonth,
                initialView: "dayGridMonth",
                displayEventTime: false,
                height: 361,
                contentHeight: 323,
                eventLimit: 1,
                header: {
                    left: "",
                    center: "title",
                    right: "",
                },
                views: {
                    month: {
                        titleFormat: "MMMM",
                    },
                },
                dayRender: function (date, el) {
                    let day = moment(date).format("YYYYMMDD")
                    let selectedDay = moment(date).format("YYYY-MM-DD")
                    let id = "s" + day
                    let month = moment(date).month()
                    let year = moment(date).year()
                    let dow = moment(date).day()
                    let top = $(`td.fc-day-top[data-date='${selectedDay}']`)
                    let topSpan = $(`td.fc-day-top[data-date='${selectedDay}'] > span.fc-day-number`)
                    
                    /*
                    if (topSpan.length) {
                        $(top).empty()
                        let day = topSpan.text()
                        if (!isNaN(day)) {
                            let e = "<div class='w-100 d-flex align-items-center justify-content-between' style=''>"
                              + "<span>&nbsp;</span>"
                              + "<span class='fc-day-number'>" + day + "</span>"
                              + "</div>"
                            
                            let titleContainer = document.createElement("div")
                            top.append(e)
                        }
                    }
                    //*/
                    
                    if (!$(el).hasClass("fc-disabled-day")) {
                        $(top).attr("season", "true")
                        $(el).attr("season", "true")
                        $(el).attr("data-date", selectedDay)
                        $(el).attr("id", id)
                        $(el).attr("day", day)
                        $(el).attr("month", month)
                        $(el).attr("year", year)
                        $(el).attr("dow", dow)
                        $(el).attr("data-selected", "false")
                    }
                },
                dayClick: function (event, jsEvent, view) {
                    let dateClicked = moment(event).format("YYYY-MM-DD")
                    
                    if (jsEvent.originalEvent.shiftKey) {
                        if (selectedStart !== null) {
                            selectedEnd = dateClicked
                            
                            if (moment(selectedEnd) < moment(selectedStart)) {
                                let tempEnd = moment(selectedStart).format("YYYY-MM-DD")
                                let tempStart = moment(selectedEnd).format("YYYY-MM-DD")
                                let startElement = $("td.fc-day[data-date='" + tempStart + "'][season='true']")
                                let endElement = $("td.fc-day[data-date='" + tempEnd + "'][season='true']")
                                $(startElement).removeClass("is-selected")
                                endElement.removeClass("is-selected")
                                
                                selectDates(this, tempStart, tempEnd)
                                selectedStart = tempEnd
                                selectedEnd = tempStart
                            } else {
                                selectDates(this, selectedStart, selectedEnd)
                            }
                            
                            selectedStart = null
                            selectedEnd = null
                        }
                    } else if (jsEvent.originalEvent.ctrlKey) {
                        if (this.hasClass("selected-day")) {
                            this.removeClass("selected-day")
                            YearCalendar.selectedDates.delete(dateClicked)
                            selectedStart = null
                            selectedEnd = null
                        } else {
                            YearCalendar.selectedDates.set(dateClicked, dateClicked)
                            selectedStart = dateClicked
                            selectedEnd = null
                            this.addClass("selected-day")
                        }
                    } else {
                        clearSelectedDates()
                        selectDay(this, dateClicked)
                        selectedStart = dateClicked
                        selectedEnd = dateClicked
                        this.addClass("selected-day")
                        Console.log("selected-day", this)
                    }
                },
                eventRender: function (event, element, view) {
                    $(element).attr("season", "true")
                    let day = moment(event.start).format("YYYY-MM-DD")
                    let el = $("td.fc-day[data-date='" + day + "'][season='true']")
                    let myEvent = seasonEvents.get(day)
                    let textColor = event.textColor
                    let backgroundColor = event.backgroundColor
                    let borderColor = event.borderColor
                    let bgRGBA = hexToRgb(event.backgroundColor)
                    bgRGBA.push(.6)
                    let bgColor = "rgba(" + bgRGBA.join(', ') + ")"
                    
                    // --
                    //Console.log("render event", event)
                    // --
                    if (event.rendering === "background") {
                        if ($(element).hasClass("fc-disabled-day")) {
                            return
                        }
                        //
                        var e = ""
                        let dayCell = document.querySelectorAll(`td.fc-day[season='true'][data-date='${day}']`)
                        
                        if (myEvent) {
                            $(el).addClass("has-event")
                            $(el).attr("seasons_types_id", event.seasons_types_id)
                            $(el).data("season", "true")
                        }
                        
                        $(dayCell).css({
                            "background": bgColor,
                            "color": textColor,
                            //"border-color": borderColor,
                        })
                        $(element).attr("data-date", day)
                        $(element).attr("season", "true")
                        
                        $(element).css({
                            "background": bgColor,
                            "color": textColor,
                        })
                        
                        //Console.log("background", event)
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    //alert('Event: ' + calEvent.title)
                    //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY)
                    //alert('View: ' + view.name)
                    
                    // change the border color just for fun
                    //$(this).css('border-color', 'red')
                },
                events: YearCalendar.events,
            })
        })
        
        YearCalendar.activeCalendars.push(activeCal)
    }
    
    const buildEditData = function () {
        let data = ``
        $.each(Array.from(YearCalendar.selectedDates.values), function (k, date) {
            Console.log("date", date)
        })
        return data
    }
    
    const init = function (settings) {
        calendars = []
        
        if (settings) {
            if (settings.calendarType) {
                calendarType = settings.calendarType
            }
        }
        
        let dataToSend = {
            product_id: product_id,
        }
        
        fetchCalendarEvents(dataToSend, function (events) {
            
            if (!events) {
                events = []
            }
            
            YearCalendar.start = new Date().getFullYear()
            YearCalendar.loadSeasonDropdown()
            YearCalendar.loadProfileDropdown()
            YearCalendar.loadUnitDropdown()
            
            buildCalendar({
                events: events,
                start: YearCalendar.start,
            })
            
            YearCalendar.endLoading()
        })
        
        const edit = function () {
            _calendar_filter_ranges.innerHTML = buildEditData()
            //Console.log("edit", YearCalendar.selectedDates)
        }
        
        $(function () {
            YearCalendar.init(settings)
        })
        
    }
    
    init(settings)
    
    return {
        calendars: new Map(),
        loadSeasonDropdown: function () {
            loadSeasonDropdown()
        },
    }
}

const YearCalendar = (function () {
    "use strict"
    const _calendar_loader = document.getElementById("calendar_loader")
    const _seasonCalendarModal = document.getElementById("seasonCalendarModal")
    const _calendar_display_year = document.getElementById("calendar_display_year")
    const _calendar_display_next_year = document.getElementById("calendar_display_next_year")
    const _calendar_display_prev_year = document.getElementById("calendar_display_prev_year")
    const _calendar_filter_season_id = document.getElementById("calendar_filter_season_id")
    const _product_id = document.getElementById("product_id")
    const _calendar_filter_profile_id = document.getElementById("calendar_filter_profile_id")
    const _calendar_filter_unit_id = document.getElementById("calendar_filter_unit_id")
    const _calendar_filter_profile_id_assign = document.getElementById("calendar_filter_profile_id_assign")
    const _calendar_filter_profile_id_clear = document.getElementById("calendar_filter_profile_id_clear")
    const _calendar_filter_unit_id_assign = document.getElementById("calendar_filter_unit_id_assign")
    const _calendar_filter_unit_id_clear = document.getElementById("calendar_filter_unit_id_clear")
    const _calendar_filter_season_id_assign = document.getElementById("calendar_filter_season_id_assign")
    const _calendar_filter_season_id_clear = document.getElementById("calendar_filter_season_id_clear")
    
    $(_calendar_display_next_year)
      .on("click", function () {
          //*
          $(_calendar_loader).fadeIn("slow", function () {
              YearCalendar.start = (parseInt(YearCalendar.start) + 1).toString()
              $.each(YearCalendar.activeCalendars, function (index, cal) {
                  $(cal).fullCalendar("nextYear")
              })
              getTitle()
              YearCalendar.endLoading()
          })
          //*/
      })
    
    $(_calendar_display_prev_year)
      .on("click", function () {
          //*
          $(_calendar_loader).fadeIn("slow", function () {
              YearCalendar.start = (parseInt(YearCalendar.start) - 1).toString()
              $.each(YearCalendar.activeCalendars, function (index, cal) {
                  $(cal).fullCalendar("prevYear")
              })
              YearCalendar.getTitle()
              YearCalendar.endLoading()
          })
          //*/
      })
    
    $(_calendar_filter_season_id)
      .on("change", function () {
          let season_id = (!isNaN(parseInt(_calendar_filter_season_id.value))) ? parseInt(_calendar_filter_season_id.value) : null
          if (!is_null(season_id)) {
              _calendar_filter_profile_id.value = ""
              _calendar_filter_unit_id.value = ""
          }
          let product_season_detail, season, disabled_dow
          if (!is_null(season_id)) {
              season = Season.all.get(season_id)
              if (season) {
                  if (season.product_season_detail) {
                      product_season_detail = season.product_season_detail
                  }
              }
              
              if (product_season_detail.disabled_dow) {
                  disabled_dow = getListOfIds(product_season_detail.disabled_dow)
                  //Console.log("disabled_dow", disabled_dow)
              }
              
          }
          setDisabledDOW(disabled_dow)
          //Console.log("_calendar_filter_season_id:click()", disabled_dow)
      })
    
    $(_calendar_filter_season_id_assign)
      .on("click", function () {
          buildAssignDatesRecord()
      })
    
    $(_calendar_filter_season_id_clear)
      .on("click", function () {
          setCalendarFilters()
      })
    
    $(_calendar_filter_unit_id_clear)
      .on("click", function () {
          setCalendarFilters()
      })
    
    $(_calendar_filter_profile_id_clear)
      .on("click", function () {
          setCalendarFilters()
      })
    
    $(_seasonCalendarModal)
      .on("shown.bs.modal", function () {
          setCalendarFilters()
      })
      .on("hidden.bs.modal", function () {
          resetForm()
      })
      .on("click", function () {
          YearCalendar.checkProgress()
      })
    // ----
    
    const loadSeasonDropdown = function () {
        let seasons = (Season && Season.all) ? Array.from(Season.all.values()) : []
        let options = "<option value='' disabled readonly selected>-- Seasons --</option>"
        let options2 = ""
        $.each(seasons, function (k, season) {
            let name = season.name
            let id = season.id
            options += `<option value="${id}">${name}</option>`
            options2 += `<option value="${id}">${name}</option>`
        })
        $(_calendar_filter_season_id).empty()
        $(_calendar_filter_season_id).html(options)
    }
    
    const loadProfileDropdown = function () {
        let profiles = (Profile && Profile.all) ? Array.from(Profile.all.values()) : []
        let options = "<option value='' disabled readonly selected>-- Profiles --</option>"
        $.each(profiles, function (k, profile) {
            let name = profile.name
            let id = profile.id
            options += `<option value="${id}">${name}</option>`
        })
        $(_calendar_filter_profile_id).empty()
        $(_calendar_filter_profile_id).html(options)
    }
    
    const loadUnitDropdown = function () {
        let units = (Unit && Unit.all) ? Array.from(Unit.all.values()) : []
        let options = "<option value='' disabled readonly selected>-- Units --</option>"
        $.each(units, function (k, unit) {
            let name = unit.name
            let id = unit.id
            options += `<option value="${id}">${name}</option>`
        })
        $(_calendar_filter_unit_id).empty()
        $(_calendar_filter_unit_id).html(options)
    }
    
    const setCalendarFilters = function () {
        clearSelectedDOW()
        _calendar_filter_season_id.value = ""
        $("html").css({ overflow: "hidden" })
    }
    
    const unSetCalendarFilters = function () {
        $("html").css({ overflow: "auto" })
    }
    
    const buildAssignDatesRecord = function () {
        Console.log("YearCalendar.buildAssignDatesRecord()", this)
        
        let product_id = parseInt(_product_id.value)
        let season_id = parseInt(_calendar_filter_season_id.value)
        
        let days = Array.from(YearCalendar.selectedDates.values())
        
        let dataToSend = {
            season_id: season_id,
            product_id: product_id,
            days: days,
        }
        
        Console.log("YearCalendar.buildAssignDatesRecord() - dataToSend", dataToSend)
    }
    
    const resetForm = function () {
        Console.log("Pricing.resetForm()", Season.all)
        unSetCalendarFilters()
        clearSelected()
        clearSelectedDOW()
        loadSeasonDropdown()
        loadUnitDropdown()
        loadProfileDropdown()
    }
    
    const setDisabledDOW = function (disabled_dow) {
        if (!disabled_dow) {
            disabled_dow = []
        }
        
        clearSelectedDOW()
        
        $.each(disabled_dow, function (k, dow) {
            let dataDOW = dow.toString()
            let days = $(`td[season='true'][dow='${dataDOW}']`)
            
            days.each(function (index, element) {
                $(element).removeClass("selected-day")
                $(element).addClass("disabled-dow")
                $(element).attr("selected", "false")
            })
        })
        
    }
    
    const clearSelectedDOW = function () {
        let days = $("td[season='true']")
        
        days.each(function (index, element) {
            $(this).removeClass("disabled-dow")
        })
    }
    
    const clearSelected = function () {
        let days = $("td[season='true']")
        
        days.each(function (index, element) {
            $(this).removeClass("selected-day")
            $(this).attr("selected", "false")
        })
        
        YearCalendar.selectedDates = new Map()
    }
    
    const endLoading = function () {
        $(_calendar_loader).hide()
    }
    
    const getTitle = function () {
        _calendar_display_year.innerText = YearCalendar.start
    }
    
    const init = function (settings) {
        //ContextMenu.init(settings)
    }
    
    const checkProgress = function () {
        //ContextMenu.init(settings)
    }
    
    /**
     * Global Params
     */
    return {
        calendarContextMenu: null,
        calendars: new Map(),
        events: [],
        start: new Date().getFullYear(),
        selectedDates: new Map(),
        activeCalendars: [],
        checkProgress: function () {
            checkProgress()
        },
        endLoading: function () {
            endLoading()
        },
        loadSeasonDropdown: function () {
            loadSeasonDropdown()
        },
        loadProfileDropdown: function () {
            loadProfileDropdown()
        },
        loadUnitDropdown: function () {
            loadUnitDropdown()
        },
        getTitle: function () {
            getTitle()
        },
        clearSelected: function () {
            clearSelected()
        },
        init: function (settings) {
            init(settings)
        },
        resetForm: function () {
            resetForm()
        },
    }
})()
