let today = new Date()
let today_year = today.getFullYear()
let today_month = today.getMonth()
let today_date = today.getDate()
$.fn.productSearch2 = function (settings) {
    "use strict"
    
}

const ProductSearch2 = function (settings) {
    "use strict"
    
    const _form_product_search = document.getElementById("form_product_search")
    const _formProductSearch2CitySubmit = document.getElementById('formProductSearch2CitySubmit')
    const _formProductSearch2NameSubmit = document.getElementById('formProductSearch2NameSubmit')
    const _formProductSearch2GuestSubmit = document.getElementById('formProductSearch2GuestSubmit')
    const _formProductSearch2Name = document.getElementById('formProductSearch2Name')
    const _product_search_name_display = document.getElementById('product_search_name_display')
    const _form_product_search_hotel_product_name = document.getElementById('form_product_search_hotel_product_name')
    const _buttonProductSearch2Name = document.getElementById("buttonProductSearch2Name")
    const roomNumber = document.getElementById('product_search_room_quantity')
    const adultNumber = document.getElementById('product_search_adult_quantity')
    const childNumber = document.getElementById('product_search_clild_quantity')
    const _form_product_search_hotel_product_number_of_rooms = document.getElementById('form_product_search_hotel_product_number_of_rooms')
    const _form_product_search_hotel_product_number_of_adults = document.getElementById('form_product_search_hotel_product_number_of_adults')
    const _form_product_search_hotel_product_number_of_children = document.getElementById('form_product_search_hotel_product_number_of_children')
    const _buttonProductSearch2Guest = document.getElementById('buttonProductSearch2Guest')
    const roomDisplay = document.getElementById('product_search_room_quantity_display')
    const adultDisplay = document.getElementById('product_search_adult_quantity_display')
    const childDisplay = document.getElementById('product_search_children_quantity_display')
    const _buttonProductSearch2City = document.getElementById('buttonProductSearch2City')
    const _formProductSearch2City = document.getElementById("formProductSearch2City")
    const _product_search_city_display = document.getElementById('product_search_city_display')
    const _form_product_search_hotel_product_city_id = document.getElementById('form_product_search_hotel_product_city_id')
    const _formProductSearch2CityId = document.getElementById("formProductSearch2CityId")
    const _buttonProductSearch2CheckOut = document.getElementById("buttonProductSearch2CheckOut")
    const _buttonProductSearch2CheckIn = document.getElementById("buttonProductSearch2CheckIn")
    const _form_product_search_hotel_product_arrive_date = document.getElementById("form_product_search_hotel_product_arrive_date")
    const _form_product_search_hotel_product_depart_date = document.getElementById("form_product_search_hotel_product_depart_date")
    const _product_search_category_display = document.getElementById("product_search_category_display")
    const _product_search_name_icon_display = document.getElementById("product_search_name_icon_display")
    const _formProductSearch2Icon = document.getElementById("formProductSearch2Icon")
    const _formProductSearch2GuestClose = document.getElementById("formProductSearch2GuestClose")
    const _formProductSearch2CityClose = document.getElementById("formProductSearch2CityClose")
    const _formProductSearch2NameClose = document.getElementById("formProductSearch2NameClose")
    const _form_product_search_hotel_product_category_id = document.getElementById("form_product_search_hotel_product_category_id")
    const _buttonProductSearch2Category = document.getElementById("buttonProductSearch2Category")
    const _formProductSearch2NameId = document.getElementById("formProductSearch2NameId")
    const _product_search_subtitle = document.getElementById("product_search_subtitle")
    const _button_product_search_panel_hotels_clear = document.getElementById("button_product_search_panel_hotels_clear")
    const _product_search_check_in_display = document.getElementById("product_search_check_in_display")
    const _product_search_check_out_display = document.getElementById("product_search_check_out_display")
    const _form_product_search_hotel_product_product_id = document.getElementById("form_product_search_hotel_product_product_id")
    const _button_product_search_panel_hotels_submit = document.getElementById("button_product_search_panel_hotels_submit")
    const _product_search_results = document.getElementById("product_search_results")
    
    let popupGuestTitle, popupGuestContent, popupNameTitle, popupNameContent, popupCityTitle, popupCityContent, category_id, categoryItem
    let startDate = []
    
    $(_form_product_search)
        .on("change", function () {
        
        })
    
    $(_button_product_search_panel_hotels_submit)
        .on("click", function () {
            buildSearchParameters()
        })
    
    $(_button_product_search_panel_hotels_clear)
        .on("click", function () {
            resetForm()
        })
    
    $(_form_product_search_hotel_product_category_id)
        .on("change", function () {
            if (_form_product_search_hotel_product_category_id.dataset.categoryid) {
                categoryChanged()
                let categoryId = parseInt(_form_product_search_hotel_product_category_id.dataset.categoryid)
                let categoryName = _form_product_search_hotel_product_category_id.dataset.categoryname
                let categoryIcon = _form_product_search_hotel_product_category_id.dataset.categoryicon
                _form_product_search_hotel_product_category_id.value = categoryId
                _product_search_name_icon_display.classList = categoryIcon + " btn-guest-picker-icon"
                _product_search_category_display.innerText = categoryName
                switch (categoryId) {
                    case 1:
                        enableHotelFormFields()
                        //console.log("Hotels")
                        break
                    case 2:
                        enableFlightFormFields()
                        //console.log("Flights")
                        break
                    case 3:
                        //console.log("Cars")
                        break
                    case 4:
                        //console.log("Rail")
                        break
                    case 5:
                        //console.log("Transport")
                        break
                    case 6:
                        //console.log("Tours")
                        break
                    case 7:
                        //console.log("Cruises")
                        break
                    case 8:
                        //console.log("Packages")
                        break
                    case 9:
                        //console.log("Other")
                        break
                    default:
                        //console.log("Default")
                        break
                }
            }
        })
    
    $(_buttonProductSearch2Category)
        .on("click", function () {
            closeProductGuestSearch()
            closeProductNameSearch()
            closeProductCitySearch()
        })
    
    $(_buttonProductSearch2CheckIn)
        .on("click", function () {
            closeProductGuestSearch()
            closeProductNameSearch()
            closeProductCitySearch()
        })
        .datepicker({
            startDate: '-1d',
            autoclose: true,
            //numberOfMonths: 2,
            title: function () {
                return "<div class='popover-header'><span class='cPZwQ'>Select a date to continue</span></div>"
            },
            //clearBtn: true,
            todayHighlight: false,
            //todayBtn: true,
            format: "yyyy-mm-dd",
            orientation: "bottom auto",
            showOnFocus: "false",
            beforeShowDay: function (date) {
                /*
                var highlight = eventDates[date]
                if (highlight) {
                    //console.log("y")
                    return {
                        content: "This",
                        classList: [true, "test1"],
                    }
                } else {
                    return [true, 'tttt', 'Tooltip']
                }
                //*/
            },
        })
        .on("changeDate", function (selected) {
            const _buttonProductSearch2CheckIn = document.getElementById("buttonProductSearch2CheckIn")
            const roomDisplay = document.getElementById('buttonProductSearch2CheckIn')
            
            let formattedDate = $(_buttonProductSearch2CheckIn).datepicker("getFormattedDate")
            
            startDate = [getTimeStamp($(_buttonProductSearch2CheckIn).datepicker("getFormattedDate"))]
            _form_product_search_hotel_product_arrive_date.value = formattedDate
            
            if (roomDisplay) {
                $(roomDisplay).find("span#product_search_check_in_display").text((formattedDate === "") ? " — / — / — " : formattedDate)
            }
            
            $(_buttonProductSearch2CheckOut)
                .val("")
                .datepicker("setStartDate", (formattedDate !== "") ? formattedDate : null)
                .datepicker("update")
                .trigger("changeDate")
                .datepicker("update")
        })
    
    $(_buttonProductSearch2CheckOut)
        .on("click", function () {
            closeProductGuestSearch()
            closeProductNameSearch()
            closeProductCitySearch()
        })
        .datepicker({
            startDate: '-1d',
            autoclose: true,
            todayBtn: "linked",
            numberOfMonths: 2,
            title: function () {
                return "<div class='popover-header'><span class='cPZwQ'>Select a date to continue</span></div>"
            },
            clearBtn: true,
            todayHighlight: false,
            maxViewMode: 2,
            format: "yyyy-mm-dd",
            orientation: "bottom auto",
            showOnFocus: "false",
            toggleActive: true,
            autoSize: true,
            defaultViewDate: {
                year: today_year,
                month: today_month,
                day: today_date,
            },
            beforeShowDay: function (date) {
                
                //let y = date.getFullYear().toString() // get full year
                //let m = (date.getMonth() + 1).toString() // get month.
                //let d = date.getDate().toString() // get Day
                
                //if (m.length === 1) { m = '0' + m } // append zero(0) if single digit
                //if (d.length === 1) { d = '0' + d } // append zero(0) if single digit
                
                //let currDate = getTimeStamp(y + '-' + m + '-' + d)
                
                //if ($.inArray(currDate, startDate) > -1) {
                //console.log(this)
                //console.log("dates", startDate)
                //console.log("currDate", currDate)
                //console.dir(this)
                //return {
                //	content: date.getUTCDate(),
                //	dateClass: 'blue-highlight',
                //}
                //return [true, "blue-highlight"]
                //} else {
                //return [true, "red-highlight"]
                //}
            },
            beforeShowMonth: function (date) {
                //console.log(date)
            },
        })
        .on("changeDate", function (e) {
            const roomDisplay = document.getElementById('buttonProductSearch2CheckOut')
            let formattedDate = $(_buttonProductSearch2CheckOut).datepicker("getFormattedDate")
            
            _form_product_search_hotel_product_depart_date.value = formattedDate
            
            if (roomDisplay) {
                $(roomDisplay).find("span#product_search_check_out_display").text((formattedDate === "") ? " — / — / — " : formattedDate)
            }
            
        })
    
    $(_formProductSearch2NameClose)
        .on("click", function () {
            closeProductNameSearch()
        })
    
    $(_formProductSearch2CityClose)
        .on("click", function () {
            closeProductCitySearch()
        })
    
    $(_formProductSearch2GuestClose)
        .on("click", function () {
            closeProductGuestSearch()
        })
    
    $(_formProductSearch2CitySubmit)
        .on("click", function () {
            updateProductCitySearch()
            closeProductGuestSearch()
        })
    
    $(_formProductSearch2NameSubmit)
        .on("click", function () {
            updateProductNameSearch()
            closeProductNameSearch()
        })
    
    $(_formProductSearch2GuestSubmit)
        .on("click", function () {
            updateProductGuestSearch()
            closeProductGuestSearch()
        })
    
    $(_buttonProductSearch2City)
        .on("show.bs.popover", function () {
            initProductCitySearch()
            
        })
        .on("shown.bs.popover", function () {
            //_formProductSearch2City.focus()
        })
        .on("hidden.bs.popover", function () {
            window.removeEventListener("click", clickOutsideProductNameSearch)
        })
    
    $(_buttonProductSearch2Guest)
        .on("show.bs.popover", function () {
            initProductGuestSearch()
            
        })
        .on("shown.bs.popover", function () {
            //_formProductSearch2Name.focus()
        })
        .on("hidden.bs.popover", function () {
            window.removeEventListener("click", clickOutsideProductGuestSearch)
        })
    
    $(_buttonProductSearch2Name)
        .on("show.bs.popover", function () {
            initProductNameSearch()
        })
        .on("shown.bs.popover", function () {
            //_formProductSearch2Name.focus()
        })
        .on("hidden.bs.popover", function () {
            window.removeEventListener("click", clickOutsideProductNameSearch)
        })
    
    const getTimeStamp = function (selectedDate) {
        if (!isNaN(Date.parse(selectedDate))) {
            let date = new Date(selectedDate + " 00:00")
            let y = date.getFullYear().toString() // get full year
            let m = (date.getMonth() + 1).toString() // get month.
            let d = date.getDate().toString() // get Day
            
            if (m.length === 1) { m = '0' + m } // append zero(0) if single digit
            if (d.length === 1) { d = '0' + d } // append zero(0) if single digit
            
            return moment(y + '-' + m + '-' + d + ' 00:00', "YYYY-MM-DD H:mm").valueOf()
        }
        
    }
    
    const clearSearchResults = function () {
    
    }
    
    const submitHotel = function (params, callback) {
        let url = "/api/v1.0/search/hotels"
        
        if (params) {
            try {
                sendGetRequest(url, params, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    }
                })
            } catch (e) {
                //console.log("error", e)
            }
        }
    }
    
    const hotelSearch = function (data) {
        clearSearchResults()
        submitHotel(data, function (results) {
            if (results) {
                //console.log("results", results)
            }
        })
    }
    
    const buildSearchParameters = function () {
        let categoryId = (!isNaN(parseInt(_form_product_search_hotel_product_category_id.value))) ? parseInt(_form_product_search_hotel_product_category_id.value) : null
        
        if (!categoryId) {
            return
        }
        let data = {}
        
        switch (categoryId) {
            case 1:
                let adults = (!isNaN(parseInt(_form_product_search_hotel_product_number_of_adults.value))) ? parseInt(_form_product_search_hotel_product_number_of_adults.value) : 1
                let children = (!isNaN(parseInt(_form_product_search_hotel_product_number_of_children.value))) ? parseInt(_form_product_search_hotel_product_number_of_children.value) : 0
                let cityId = (!isNaN(parseInt(_form_product_search_hotel_product_city_id.value))) ? parseInt(_form_product_search_hotel_product_city_id.value) : null
                let guestCount = (adults + children)
                let fromDate = (_form_product_search_hotel_product_arrive_date.value !== "") ? _form_product_search_hotel_product_arrive_date.value : null
                let toDate = (_form_product_search_hotel_product_depart_date.value !== "") ? _form_product_search_hotel_product_depart_date.value : null
                
                if (cityId && fromDate && toDate) {
                    data.category_id = categoryId
                    data.city_id = cityId
                    data.from_date = fromDate
                    data.to_date = toDate
                    data.pax = guestCount
                    
                    hotelSearch(data)
                }
                
                break
            default:
                return
        }
    }
    
    const resetForm = function () {
        $("div[data-hotel='true'").hide()
        $("div[data-flight='true'").hide()
        
        closeProductGuestSearch()
        closeProductNameSearch()
        closeProductCitySearch()
        
        updateProductGuestSearch()
        updateProductNameSearch()
        updateProductCitySearch()
        
        _product_search_category_display.innerText = "** Select **"
        _product_search_name_display.innerText = "any"
        _product_search_city_display.innerText = "city name"
        _product_search_check_in_display.innerText = "— / — / —"
        _product_search_check_out_display.innerText = "— / — / —"
        
        roomNumber.value = 1
        adultNumber.value = 1
        childNumber.value = 0
        
        let roomCount = (!isNaN(parseInt(roomNumber.value))) ? parseInt(roomNumber.value) : 1
        let adultCount = (!isNaN(parseInt(adultNumber.value))) ? parseInt(adultNumber.value) : 1
        let childCount = (!isNaN(parseInt(childNumber.value))) ? parseInt(childNumber.value) : 0
        
        roomDisplay.innerText = (roomCount > 1) ? roomCount + ' rooms, ' : roomCount + ' room, '
        adultDisplay.innerText = (adultCount > 1) ? adultCount + ' adults, ' : adultCount + ' adult, '
        childDisplay.innerText = (childCount > 1) ? childCount + ' children' : childCount + ' child'
        
        _product_search_name_icon_display.classList = "fas fa-pencil-alt btn-guest-picker-icon"
        
        _form_product_search_hotel_product_city_id.value = ""
        _form_product_search_hotel_product_category_id.value = ""
        _form_product_search_hotel_product_product_id.value = ""
        _form_product_search_hotel_product_name.value = ""
        _form_product_search_hotel_product_arrive_date.value = ""
        _form_product_search_hotel_product_number_of_children.value = "0"
        _form_product_search_hotel_product_number_of_adults.value = "1"
        _form_product_search_hotel_product_number_of_rooms.value = "1"
        _form_product_search_hotel_product_depart_date.value = ""
        
        disableFormFields()
    }
    
    const enableHotelFormFields = function () {
        _buttonProductSearch2Name.disabled = false
        _buttonProductSearch2City.disabled = false
        _buttonProductSearch2CheckIn.disabled = false
        _buttonProductSearch2CheckOut.disabled = false
        _buttonProductSearch2Guest.disabled = false
        $("div[data-hotel='true'").show()
    }
    
    const enableFlightFormFields = function () {
        _buttonProductSearch2Name.disabled = false
        _buttonProductSearch2City.disabled = false
        _buttonProductSearch2CheckIn.disabled = false
        _buttonProductSearch2CheckOut.disabled = false
        _buttonProductSearch2Guest.disabled = false
        $("div[data-flight='true'").show()
    }
    
    const disableFormFields = function () {
        _buttonProductSearch2Name.disabled = true
        _buttonProductSearch2City.disabled = true
        _buttonProductSearch2CheckIn.disabled = true
        _buttonProductSearch2CheckOut.disabled = true
        _buttonProductSearch2Guest.disabled = true
    }
    
    const initAutocomplete = function (category_id) {
        
        $(_formProductSearch2City)
            .on("search", function () {
                _formProductSearch2City.value = ""
                _formProductSearch2CityId.value = ""
                updateProductCitySearch()
            })
            .on("click", function (e) {
                $(this).select()
            })
            .autocomplete({
                serviceUrl: "/api/v1.0/autocomplete/cities",
                minChars: 2,
                cache: false,
                dataType: "json",
                triggerSelectOnValidInput: false,
                paramName: "st",
                onSelect: function (suggestion) {
                    if (!suggestion.data) {
                        return
                    }
                    let city = suggestion.data
                    
                    _formProductSearch2CityId.value = city.id
                },
            })
        
        $(_formProductSearch2Name)
            .on("search", function () {
                _formProductSearch2Name.value = ""
                _formProductSearch2NameId.value = ""
                updateProductCitySearch()
            })
            .on("click", function (e) {
                $(this).select()
            })
            .autocomplete({
                serviceUrl: "/api/v1.0/autocomplete/products",
                minChars: 2,
                cache: false,
                dataType: "json",
                triggerSelectOnValidInput: false,
                params: { "category_id": category_id },
                paramName: "st",
                onSelect: function (suggestion) {
                    if (!suggestion.data) {
                        return
                    }
                    let product = suggestion.data
                    _form_product_search_hotel_product_product_id.value = product.id
                    _formProductSearch2NameId.value = product.id
                },
            })
    }
    
    const categoryChanged = function () {
        resetForm()
    }
    
    const updateProductNameSearch = function () {
        
        if (_formProductSearch2Name) {
            let name = (_formProductSearch2Name.value !== '') ? _formProductSearch2Name.value : 'any'
            
            _product_search_name_display.innerText = name
            _form_product_search_hotel_product_name.value = name
            
            if (_buttonProductSearch2Name) {
                $(_buttonProductSearch2Name).popover("hide")
            }
        }
    }
    
    const updateProductGuestSearch = function () {
        
        if (
            roomNumber && adultNumber && childNumber
            && _form_product_search_hotel_product_number_of_rooms && _form_product_search_hotel_product_number_of_adults && _form_product_search_hotel_product_number_of_children
            && roomDisplay && adultDisplay && childDisplay
        ) {
            let roomCount = (!isNaN(parseInt(roomNumber.value))) ? parseInt(roomNumber.value) : 1
            let adultCount = (!isNaN(parseInt(adultNumber.value))) ? parseInt(adultNumber.value) : 1
            let childCount = (!isNaN(parseInt(childNumber.value))) ? parseInt(childNumber.value) : 0
            
            roomDisplay.innerText = (roomCount > 1) ? roomCount + ' rooms, ' : roomCount + ' room, '
            adultDisplay.innerText = (adultCount > 1) ? adultCount + ' adults, ' : adultCount + ' adult, '
            childDisplay.innerText = (childCount > 1) ? childCount + ' children' : childCount + ' child'
            
            _form_product_search_hotel_product_number_of_rooms.value = (roomCount > 1) ? roomCount : 1
            _form_product_search_hotel_product_number_of_adults.value = (adultCount > 1) ? adultCount : 1
            _form_product_search_hotel_product_number_of_children.value = (childCount > 0) ? childCount : 0
            
            if (_buttonProductSearch2Guest) {
                $(_buttonProductSearch2Guest).popover("hide")
            }
        }
    }
    
    const updateProductCitySearch = function () {
        if (_formProductSearch2City) {
            _product_search_city_display.innerText = (_formProductSearch2City.value !== '') ? _formProductSearch2City.value : 'city name'
            _form_product_search_hotel_product_city_id.value = _formProductSearch2CityId.value
            $(_form_product_search_hotel_product_city_id).trigger("change")
        }
    }
    
    const closeProductNameSearch = function () {
        if (_buttonProductSearch2Name) {
            $(_buttonProductSearch2Name).popover("hide")
        }
        
        window.removeEventListener("click", clickOutsideProductNameSearch)
    }
    
    const closeProductCitySearch = function () {
        if (_buttonProductSearch2City) {
            $(_buttonProductSearch2City).popover("hide")
        }
        window.removeEventListener("click", clickOutsideProductCitySearch)
    }
    
    const closeProductGuestSearch = function () {
        if (_buttonProductSearch2Guest) {
            $(_buttonProductSearch2Guest).popover("hide")
        }
        
        window.removeEventListener("click", clickOutsideProductGuestSearch)
    }
    
    const clickOutsideProductNameSearch = (e) => {
        let class_name = "name-search"
        let tar = $(e.target).parents("div.popover")
        
        if (!tar[0] && !e.target.className.includes(class_name)) {
            updateProductNameSearch()
            closeProductNameSearch()
        }
    }
    
    const clickOutsideProductGuestSearch = (e) => {
        let class_name = "btn-guest-picker"
        let tar = $(e.target).parents("div.popover")
        
        if ((!tar[0] && !e.target.className.includes(class_name))) {
            updateProductGuestSearch()
            closeProductGuestSearch()
        }
    }
    
    const clickOutsideProductCitySearch = (e) => {
        let class_name = "btn-city-picker"
        let tar = $(e.target).parents("div.popover")
        
        if (!tar[0] && !e.target.className.includes(class_name)) {
            updateProductCitySearch()
            closeProductCitySearch()
        }
    }
    
    const initProductNameSearch = function () {
        window.addEventListener("click", clickOutsideProductNameSearch)
    }
    
    const initProductGuestSearch = function () {
        window.addEventListener("click", clickOutsideProductGuestSearch)
    }
    
    const initProductCitySearch = function () {
        window.addEventListener("click", clickOutsideProductCitySearch)
    }
    
    const init = function (settings) {
        $(function () {
            
            if (_form_product_search) {
                categoryItem = document.querySelectorAll(".category-dropdown-item")
                categoryItem.forEach(el => el.addEventListener("click", event => {
                    _formProductSearch2Icon.classList = " " + el.dataset.categoryicon + " mr-3 "
                    _product_search_name_icon_display.classList = " " + el.dataset.categoryicon + " btn-guest-picker-icon"
                    _product_search_category_display.innerText = el.dataset.categoryname
                    category_id = parseInt(el.dataset.categoryid)
                    initAutocomplete(category_id)
                    _form_product_search_hotel_product_category_id.value = category_id
                    _form_product_search_hotel_product_category_id.dataset.categoryid = category_id
                    _form_product_search_hotel_product_category_id.dataset.categoryname = el.dataset.categoryname
                    _form_product_search_hotel_product_category_id.dataset.categoryicon = el.dataset.categoryicon
                    _product_search_subtitle.innerText = el.dataset.categoryname
                    $(_form_product_search_hotel_product_category_id).trigger("change")
                    $(_buttonProductSearch2Category).trigger("change")
                }))
                
                if (_buttonProductSearch2Name) {
                    popupNameTitle = $("#popoverNameForm .popover-head h5")
                    popupNameContent = $("#popoverNameForm .popover-body form")
                    
                    $(_buttonProductSearch2Name).popover({
                        placement: "bottom",
                        title: () => popupNameTitle,
                        html: true,
                        container: "body",
                        content: () => popupNameContent,
                    })
                }
                
                if (_buttonProductSearch2City) {
                    popupCityTitle = $("#popoverCityForm .popover-head h5")
                    popupCityContent = $("#popoverCityForm .popover-body form")
                    
                    $(_buttonProductSearch2City).popover({
                        placement: "bottom",
                        title: () => popupCityTitle,
                        html: true,
                        container: "body",
                        content: () => popupCityContent,
                        
                    })
                }
                
                if (_buttonProductSearch2Guest) {
                    popupGuestTitle = $("#popoverGuestForm .popover-head h5")
                    popupGuestContent = $("#popoverGuestForm .popover-body form")
                    
                    $(_buttonProductSearch2Guest).popover({
                        placement: "bottom",
                        title: () => popupGuestTitle,
                        html: true,
                        container: "body",
                        content: () => popupGuestContent,
                        
                    })
                }
                
                if (_product_search_results) {
                    //$(_product_search_results).hide()
                    
                }
                
                resetForm()
            }
            
        })
    }
    
    init(settings)
    
    return {
        init: function (settings) {
            init(settings)
        },
        updateProductCitySearch: function () {
            updateProductCitySearch()
        },
        updateProductNameSearch: function () {
            updateProductNameSearch()
        },
        closeProductGuestSearch: function () {
            closeProductGuestSearch()
        },
    }
}

$(function () {
    //let productSearch2 = ProductSearch2()
})
