$.fn.YearCalendar = function (settings) {
    "use strict"
    
    const _calendar_filter_ranges = document.getElementById("calendar_filter_ranges")
    const _product_id = document.getElementById("product_id")
    const _calendar_display_select_all_days = document.getElementById("calendar_display_select_all_days")
    const _calendar_display_clear_selected_days = document.getElementById("calendar_display_clear_selected_days")
    
    let calendarType = "season"
    let selectedStart, selectedEnd = null
    let calendar_id = $(this).attr("id")
    let calContainer = document.getElementById(calendar_id)
    let calendars = []
    let seasonEvents = new Map()
    let product_id = parseInt(_product_id.value)
    
    $(_calendar_display_select_all_days)
        .on("click", function () {
            selectAllDays()
        })
    
    $(_calendar_display_clear_selected_days)
        .on("click", function () {
            clearSelectedDates()
        })
    
    const selectAllDays = function () {
        clearSelectedDates()
        const start = new Date(new Date().getFullYear(), 0, 1)
        const end = new Date(new Date().getFullYear(), 11, 31)
        
        let startDate = moment(start).format("YYYY-MM-DD")
        let endDate = moment(end).format("YYYY-MM-DD")
        
        selectDates(this, startDate, endDate)
        
    }
    
    const pad = function (d) {
        return (d < 10) ? '0' + d.toString() : d.toString()
    }
    
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
    
    const clearSelectedDates = function () {
        let days = $("td[season='true']")
        days.each(function (index, element) {
            $(this).removeClass("selected-day")
            $(this).attr("data-selected", "false")
        })
        YearCalendar.selectedDates = new Map()
    }
    
    const fetchCalendarEvents = function (dataToSend, callback) {
        if (dataToSend) {
            try {
                sendGetRequest("/api/v1.0/calendars", dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return callback([])
                    }
                })
            } catch (e) {
                console.log("error", e)
                return callback([])
            }
        } else {
            return callback([])
        }
    }
    
    const getDate = function (startYear, monthsOut) {
        let startMonth = (0 + monthsOut) + 1
        let startDay = 1
        return moment(startYear + "-" + pad(startMonth) + "-" + pad(startDay)).format("YYYY-MM-DD")
    }
    
    const selectDay = function (_this, dateClicked) {
        if ($(_this).hasClass("selected-day")) {
            $(_this).removeClass("selected-day")
            $("td.fc-day-top[data-date='" + moment(dateClicked).format("YYYY-MM-DD") + "']")
                .removeClass("selected-day")
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
    
    const getEventFromDate = function (calendar, date) {
        let allEvents = []
        allEvents = $('#calendarRoomUnavailable').fullCalendar('clientEvents')
        var event = $.grep(allEvents, function (v) {
            return +v.start === +date
        })
        if (event.length > 0) {
            return event[0]
        } else {
            return null
        }
    }
    
    const buildCalendar = function (settings) {
        let dateToday = new Date()
        calContainer.appendChild(buildCalendarContainer())
        YearCalendar.start = (settings && settings.start) ? settings.start : dateToday.getFullYear()
        YearCalendar.events = (settings && settings.events) ? settings.events : []
        YearCalendar.getTitle()
        
        $.each(calendars, function (index, cal) {
            let displayMonth = getDate(YearCalendar.start, index)
            
            let activeCal = $(cal).fullCalendar({
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
                        $(top).attr("data-date", selectedDay)
                        $(top).attr("id", id)
                        $(top).attr("day", day)
                        $(top).attr("month", month)
                        $(top).attr("year", year)
                        $(top).attr("dow", dow)
                        
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
                        let datesSelected = Array.from(YearCalendar.selectedDates.values())
                        
                        clearSelectedDates()
                        selectDay(this, dateClicked)
                        selectedStart = dateClicked
                        selectedEnd = dateClicked
                        this.addClass("selected-day")
                        
                    }
                },
                eventRender: function (event, element, view) {
                    //console.log("render event", event)
                    // --
                    
                    $(element).attr("season", "true")
                    let day = moment(event.start).format("YYYY-MM-DD")
                    let top = $("td.fc-day-top[data-date='" + day + "']")
                    
                    let el = $("td.fc-day[data-date='" + day + "'][season='true']")
                    let myEvent = seasonEvents.get(day)
                    let textColor = event.textColor
                    let backgroundColor = event.backgroundColor
                    let borderColor = event.borderColor
                    let bgRGBA = hexToRgb(event.backgroundColor)
                    bgRGBA.push(.6)
                    let bgColor = "rgba(" + bgRGBA.join(', ') + ")"
                    
                    // --
                    
                    if (event.rendering === "background") {
                        if ($(element).hasClass("fc-disabled-day")) {
                            return
                        }
                        
                        top
                            .addClass("background_event")
                            .attr("data", event)
                        
                        let e = ""
                        let dayCell = document.querySelectorAll(`td.fc-day[season='true'][data-date='${day}']`)
                        
                        if (myEvent) {
                            $(el).addClass("has-event")
                            $(el).attr("seasons_types_id", event.id)
                            $(el).data("season", "true")
                            $(el).attr("data-seasonid", event.id)
                        }
                        
                        $(dayCell)
                            .addClass("background_event")
                            .attr("data", event)
                            .css({
                                "background": bgColor,
                                "color": textColor,
                            })
                        
                        $(element).attr("data-sid", event.id)
                        $(element).attr("data-date", day)
                        $(element).attr("season", "true")
                        $(element).attr("seasonid", event.id)
                        $(element).addClass("background_event")
                        $(element).attr("data", event)
                        $(element).css({
                            "background": bgColor,
                            "color": textColor,
                        })
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    console.log('Event: ', calEvent)
                    //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY)
                    //alert('View: ' + view.name)
                    
                    // change the border color just for fun
                    //$(this).css('border-color', 'red')
                },
                events: YearCalendar.events,
            })
            
            YearCalendar.activeCalendars.push(activeCal)
        })
        
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
        
        $(function () {
            YearCalendar.init(settings)
        })
        
    }
    
    init(settings)
    
    return {
        calendars: [],
    }
}

const YearCalendar = (function () {
    "use strict"
    const _calendar_display_remove = document.getElementById("calendar_display_remove")
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
    const _calendar_display_refresh = document.getElementById("calendar_display_refresh")
    
    $(_calendar_display_remove)
        .on("click", function () {
            $(_calendar_loader).fadeIn("slow", function () {
                YearCalendar.remove()
            })
        })
    
    $(_calendar_display_refresh)
        .on("click", function () {
            $(_calendar_loader).fadeIn("slow", function () {
                YearCalendar.refresh()
            })
        })
    
    $(_calendar_display_next_year)
        .on("click", function () {
            $(_calendar_loader).fadeIn("slow", function () {
                YearCalendar.start = (parseInt(YearCalendar.start) + 1).toString()
                $.each(YearCalendar.activeCalendars, function (index, cal) {
                    $(cal).fullCalendar("nextYear")
                })
                getTitle()
                YearCalendar.endLoading()
            })
        })
    
    $(_calendar_display_prev_year)
        .on("click", function () {
            $(_calendar_loader).fadeIn("slow", function () {
                YearCalendar.start = (parseInt(YearCalendar.start) - 1).toString()
                $.each(YearCalendar.activeCalendars, function (index, cal) {
                    $(cal).fullCalendar("prevYear")
                })
                YearCalendar.getTitle()
                YearCalendar.endLoading()
            })
        })
    
    $(_calendar_filter_season_id)
        .on("change", function () {
            let season_id = (!isNaN(parseInt(_calendar_filter_season_id.value))) ? parseInt(_calendar_filter_season_id.value) : null
            if (!is_null(season_id)) {
            
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
                }
                _calendar_filter_profile_id.value = ""
                _calendar_filter_profile_id.disabled = true
                _calendar_filter_unit_id_assign.disabled = true
                _calendar_filter_season_id_assign.disabled = false
                _calendar_filter_profile_id.value = ""
                $(_calendar_filter_unit_id).val([])
            } else {
                _calendar_filter_season_id_assign.disabled = true
                _calendar_filter_profile_id.disabled = false
                _calendar_filter_unit_id_assign.disabled = true
            }
            setDisabledDOW(disabled_dow)
        })
    
    $(_calendar_filter_unit_id)
        .on("change", function () {
            let units = $(_calendar_filter_unit_id).val()
            _calendar_filter_unit_id_assign.disabled = units.length <= 0
        })
        .on("click", function () {
            let units = $(_calendar_filter_unit_id).val()
            _calendar_filter_unit_id_assign.disabled = units.length <= 0
        })
    
    $(_calendar_filter_profile_id)
        .on("change", function () {
            let profile_id = (!isNaN(parseInt(_calendar_filter_profile_id.value))) ? parseInt(_calendar_filter_profile_id.value) : null
            if (profile_id !== null) {
                _calendar_filter_unit_id.disabled = false
                _calendar_filter_season_id.disabled = true
            } else {
                $(_calendar_filter_unit_id).val([])
                _calendar_filter_unit_id.disabled = true
                _calendar_filter_season_id.disabled = false
            }
            
        })
    
    $(_calendar_filter_season_id_assign)
        .on("click", function () {
            buildAssignDatesRecord()
        })
    
    $(_calendar_filter_unit_id_assign)
        .on("click", function () {
            buildAssignProfilesRecord()
        })
    
    $(_calendar_filter_season_id_clear)
        .on("click", function () {
            $(_calendar_filter_season_id).val("").trigger("change")
            setCalendarFilters()
        })
    
    $(_calendar_filter_unit_id_clear)
        .on("click", function () {
            $(_calendar_filter_unit_id).val([]).trigger("change")
            setCalendarFilters()
        })
    
    $(_calendar_filter_profile_id_clear)
        .on("click", function () {
            $(_calendar_filter_profile_id).val("").trigger("change")
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
        let profiles = (InventoryProfile && InventoryProfile.all) ? Array.from(InventoryProfile.all.values()) : []
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
        let options = ""
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
        
        $("html").css({ overflow: "hidden" })
        
    }
    
    const unSetCalendarFilters = function () {
        $("html").css({ overflow: "auto" })
    }
    
    const buildAssignDatesRecord = function () {
        let product_id = parseInt(_product_id.value)
        let season_id = parseInt(_calendar_filter_season_id.value)
        let season = Season.all.get(season_id)
        let disabledDOW = []
        let dataToSend = {
            season_id: season_id,
            product_id: product_id,
            days: [],
        }
        let days = Array.from(YearCalendar.selectedDates.values())
        
        if (season) {
            if (season.product_season_detail) {
                disabledDOW = getListOfIds(season.product_season_detail.disabled_dow)
            }
        }
        
        $.each(days, function (i, day) {
            const date = moment(day)
            const dow = date.day()
            
            let index = disabledDOW.indexOf(dow)
            
            if (index < 0) {
                dataToSend.days.push(day)
            }
        })
        
        confirmDialog(`Would you like to assign? This change may affect your Pricing Worksheets.`, (ans) => {
            if (ans) {
                assignSeasonToProduct(dataToSend, function (data) {
                    clearSelected()
                    clearSelectedDOW()
                    refresh()
                    toastr.success(`Dates Assigned.`)
                })
            }
        })
        
    }
    
    const handleCalendarError = function (msg) {
        toastr.error(msg)
    }
    
    const buildAssignProfilesRecord = function () {
        let profile_id = (!is_null(parseInt(_calendar_filter_profile_id.value))) ? parseInt(_calendar_filter_profile_id.value) : null
        let unit_ids = $(_calendar_filter_unit_id).val().map(Number)
        console.log(unit_ids)
        let dataToSend = {}
        
    }
    
    const assignProfileToProduct = function (dataToSend, callback) {
        let url = "/api/v1.0/products/assign_profiles"
        
        if (dataToSend) {
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleCalendarError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
                return handleCalendarError("Oops: 1")
            }
        }
    }
    
    const assignSeasonToProduct = function (dataToSend, callback) {
        let url = "/api/v1.0/products/assign_seasons"
        
        if (dataToSend) {
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleCalendarError("Oops: 1")
                    }
                })
            } catch (e) {
                console.log("error", e)
                return handleCalendarError("Oops: 1")
            }
        }
    }
    
    const resetForm = function () {
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
            //let days = $(`td[season='true'][dow='${dataDOW}']`)
            let days = $(`td[season='true'][dow='${dataDOW}']`)
            days.each(function (index, element) {
                let day = $(element).attr("data-date")
                console.log(day)
                $("td[data-date='" + day + "']").addClass("disabled-dow")
                $(element).addClass("disabled-dow")
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
        _calendar_filter_unit_id.disabled = true
        _calendar_filter_season_id_assign.disabled = true
        _calendar_filter_unit_id_assign.disabled = true
        loadUnitDropdown()
        loadProfileDropdown()
        loadSeasonDropdown()
        
        ContextMenu.init(settings)
    }
    
    const checkProgress = function () {
        //ContextMenu.init(settings)
    }
    
    const reFetchCalendarEvents = function (dataToSend, callback) {
        if (dataToSend) {
            try {
                sendGetRequest("/api/v1.0/calendars", dataToSend, function (data, status, xhr) {
                    //console.log("data", data)
                    if (data) {
                        return callback(data)
                    } else {
                        return callback([])
                    }
                })
            } catch (e) {
                console.log("error", e)
                return callback([])
            }
        } else {
            return callback([])
        }
    }
    
    const removeAllEvents = function () {
        YearCalendar.events = []
        
        let bgEvents = document.querySelectorAll("td[season='true']")
        
        bgEvents.forEach(el => {
            $(el)
                .css({
                    "background": "initial",
                    "background-color": "initial",
                    "color": "initial",
                    "border-color": "#ddd",
                })
        })
        
        $.each(YearCalendar.activeCalendars, function (index, cal) {
            
            $(cal).fullCalendar("removeEvents")
        })
        
        YearCalendar.endLoading()
    }
    
    const refresh = function () {
        let product_id = (!isNaN(parseInt(_product_id.value))) ? parseInt(_product_id.value) : null
        
        if (product_id) {
            YearCalendar.events = []
            removeAllEvents()
            reFetchCalendarEvents({ product_id: product_id }, function (data) {
                YearCalendar.events = data
                
                $.each(YearCalendar.activeCalendars, function (index, cal) {
                    $(cal).fullCalendar("addEventSource", YearCalendar.events)
                    $(cal).fullCalendar("rerenderEvents")
                })
                
                YearCalendar.endLoading()
            })
        } else {
            YearCalendar.endLoading()
        }
        
    }
    
    return {
        calendarContextMenu: null,
        calendars: new Map(),
        events: [],
        start: new Date().getFullYear(),
        selectedDates: new Map(),
        activeCalendars: [],
        refresh: function () {
            clearSelected()
            clearSelectedDOW()
            refresh()
        },
        remove: function () {
            clearSelected()
            clearSelectedDOW()
            removeAllEvents()
        },
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
