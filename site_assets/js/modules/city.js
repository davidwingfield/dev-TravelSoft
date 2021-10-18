const City = (function () {
    "use strict"
    
    const class_name = "form-new-city"
    const form_id = "form_new_city"
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const form_rules = {
        rules: {
            city_name: "required",
        },
        messages: {
            address_types_list: "City Name is Required",
        },
    }
    
    //------------------------------------------------------------------
    
    const handle_city_error = function (msg) {
        toastr.error(msg)
        console.log(msg)
    }
    
    const on_click_outside = (e) => {
        let tar = $(e.target).parents("form." + class_name)
        if (!tar[0] && !e.target.className.includes("select-add-option")) {
            City.close()
        }
    }
    
    const build_drop_downs = function (settings) {
        if (settings) {
            if (settings.dropdowns) {
                
                $.each(settings.dropdowns, function (i, dropdown_id) {
                    
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
                                  let _filterCitySearch = x[0]
                                  $(_filterCitySearch).attr("id", "" + dropdown_id + "_search")
                                  if (!document.getElementById("filter_city_add_icon")) {
                                      let i = document.createElement("i")
                                      i.classList = "select-add-option fas fa-plus filter_city_add"
                                      i.id = "filter_city_add_icon"
                                      i.addEventListener("click", event => {
                                          let val = _filterCitySearch.value
                                          $(element).select2("close")
                                          City.add(this, val, dropdown_id)
                                      })
                                      _filterCitySearch.after(i)
                                  }
                                  $(".filter_city_add").hide()
                                  if (_filterCitySearch) {
                                      
                                      _filterCitySearch.addEventListener("keyup", event => {
                                          if (_filterCitySearch.value !== "") {
                                              $(".filter_city_add").show()
                                          } else {
                                              $(".filter_city_add").hide()
                                          }
                                          
                                      })
                                      
                                  }
                              }
                              
                          })
                          .on("change", function () {
                              let id = $(this)
                                .attr("id")
                                .replace("city", "city")
                              let city_element = document.getElementById(id)
                              
                              if (!isNaN(parseInt($(this).val()))) {
                                  City.id = $(this).val()
                                  if (city_element) {
                                      //City.get(parseInt($(this).val()), city_element)
                                  }
                              }
                              
                          })
                        
                    }
                    
                })
                
            }
        }
    }
    
    const fetch_city_list = function (dataToSend, callback) {
        if (dataToSend) {
            try {
                sendGetRequest("/cities/get", dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handle_city_error("Oops: 1")
                    }
                })
            } catch (e) {
                console.log(e)
                return handle_city_error("Error Validating Province")
            }
        } else {
            return handle_city_error("Error Loading Province- Missing Data")
        }
    }
    
    const update_city_record = function ($this, dataToSend) {
        if (dataToSend) {
            try {
                sendPostRequest("/cities/update", dataToSend, function (data, status, xhr) {
                    if (data && data[0]) {
                        City.all.set(data[0].city_id, data[0])
                        let city_elements = $("select[data-type='city']")
                        console.log(city_elements.length)
                        City.id = data[0].city_id
                        city_elements.each(function (index, element) {
                            var newOption = new Option(data[0].city_name, data[0].city_id, false, false)
                            $(element).append(newOption).trigger("change")
                            
                        })
                        $($this).val(data[0].city_id).trigger("change")
                        City.close()
                        toastr.success("City: " + data[0].city_id + " updated")
                        
                    } else {
                        return handle_city_error("Error: 1")
                    }
                })
            } catch (e) {
                console.log(e)
                handle_city_error("Error: Validating City")
            }
        } else {
            console.log("Error: Missing Data")
            handle_city_error("Error: Missing Data")
        }
    }
    
    //------------------------------------------------------------------
    
    const destroy_form = function () {
        let elem = document.getElementById(form_id)
        if (elem) {
            elem.parentNode.removeChild(elem)
            window.removeEventListener("click", on_click_outside)
        }
    }
    
    const build_form = function (elem, val, dropdown_id) {
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
        
        let new_city_form = document.createElement("form")
        
        let heading1 = document.createElement("h5")
        
        let row1 = document.createElement("div")
        let row2 = document.createElement("div")
        
        let col1 = document.createElement("div")
        let col2 = document.createElement("div")
        let col3 = document.createElement("div")
        let col4 = document.createElement("div")
        
        let col5 = document.createElement("div")
        
        let form_element1 = document.createElement("div")
        let form_element2 = document.createElement("div")
        let form_element3 = document.createElement("div")
        let form_element4 = document.createElement("div")
        
        let error_element1 = document.createElement("div")
        
        let name_text_element = document.createElement("input")
        let name_label_element = document.createElement("label")
        
        let save_button = document.createElement("button")
        let cancel_button = document.createElement("button")
        
        heading1.classList = "card-title"
        heading1.innerText = "City Details"
        
        new_city_form.id = form_id
        new_city_form.classList = ["card card-body m-3 " + class_name]
        
        name_text_element.id = "city_name"
        name_text_element.name = "city_name"
        name_text_element.type = "text"
        name_text_element.classList = ["form-control "]
        name_label_element.htmlFor = "city_name"
        name_label_element.innerHTML = "Name:"
        error_element1.id = "city_name-error"
        
        save_button.classList = ["btn btn-primary btn-sm waves-effect waves-light"]
        save_button.innerText = "save"
        save_button.type = "button"
        
        save_button.addEventListener("click", event => {
            City.save(elem, dropdown_id)
        })
        
        cancel_button.classList = ["btn btn-outline-danger btn-sm waves-effect waves-light"]
        cancel_button.innerText = "cancel"
        cancel_button.type = "button"
        
        cancel_button.addEventListener("click", event => {
            City.close()
        })
        
        row1.classList = ["row"]
        row2.classList = ["row"]
        
        col1.classList = ["col-lg-3 mb-1"]
        col2.classList = ["col-lg-3 mb-1"]
        col3.classList = ["col-lg-3 mb-1"]
        col4.classList = ["col-lg-3 mb-1"]
        
        col5.classList = ["col-12 mb-1 text-right"]
        
        form_element1.classList = ["form-element"]
        form_element2.classList = ["form-element"]
        form_element3.classList = ["form-element"]
        form_element4.classList = ["form-element"]
        
        error_element1.classList = ["error w-100 text-center"]
        
        form_element1.appendChild(name_label_element)
        form_element1.appendChild(name_text_element)
        form_element1.appendChild(error_element1)
        
        col1.appendChild(form_element1)
        
        row1.appendChild(col1)
        row1.appendChild(col2)
        row1.appendChild(col3)
        row1.appendChild(col4)
        
        col5.append(cancel_button)
        col5.appendChild(save_button)
        
        row2.appendChild(col5)
        
        new_city_form.appendChild(heading1)
        new_city_form.appendChild(row1)
        new_city_form.appendChild(row2)
        
        parent[0].appendChild(new_city_form)
        
        name_text_element.value = value
        name_text_element.focus({ preventScroll: false })
        
        window.addEventListener("click", on_click_outside)
    }
    
    //------------------------------------------------------------------
    
    const clear_detail = function () {
        
        return {
            id: null,
            province_id: null,
            country_id: null,
            created_by: null,
            modified_by: null,
            sort_order: null,
            name: null,
            enabled: null,
            date_created: null,
            date_modified: null,
            note: null,
        }
        
    }
    
    const set_detail = function (city) {
        let details = clear_detail()
        let id = null
        if (city) {
            id = validInt(city.city_id)
            details = {
                id: id,
                province_id: validInt(city.city_province_id),
                country_id: validInt(city.city_country_id),
                created_by: (city.city_created_by) ? city.city_created_by : user_id,
                modified_by: (city.city_created_by) ? city.city_created_by : user_id,
                sort_order: (city.city_sort_order) ? city.city_sort_order : null,
                name: (city.city_name) ? city.city_name : null,
                enabled: (city.city_enabled) ? city.city_enabled : 1,
                date_created: (city.city_date_created) ? city.city_date_created : formatDateMySQL(),
                date_modified: (city.city_date_modified) ? city.city_date_modified : formatDateMySQL(),
                note: (city.city_note) ? city.city_note : null,
            }
            
        }
        
        City.id = id
        City.detail = details
        
    }
    
    //------------------------------------------------------------------
    
    const get = function (country_id, province_id, el) {
        City.all = new Map()
        let city_id = ""
        if (City.id !== null) {
            city_id = City.id
        }
        if (!el) {
            return
        }
        
        if (!country_id || !province_id || !el) {
            
            $(el).BuildDropDown({
                data: Array.from(City.all.values()),
                title: "City",
                id_field: "city_id",
                text_field: "city_name",
                first_selectable: false,
            })
            
        } else {
            let dataToSend = {
                country_id: parseInt(country_id),
                province_id: parseInt(province_id),
            }
            
            fetch_city_list(dataToSend, function (data) {
                if (data) {
                    
                    City.all = buildMap(data, "city_id")
                    $(el).BuildDropDown({
                        data: Array.from(City.all.values()),
                        title: "City",
                        id_field: "city_id",
                        text_field: "city_name",
                        first_selectable: false,
                    })
                    
                    $(el).val(city_id).trigger("change")
                }
            })
        }
        
    }
    
    const add = function (elem, val, dropdown_id) {
        if (!elem) {
            return
        }
        
        build_form(elem, val, dropdown_id)
    }
    
    const save = function ($this, dropdown_id) {
        let city_detail = {}
        let _name = document.getElementById("city_name")
        let _province_id = document.getElementById(dropdown_id.replace(/city_id/g, "") + "province_id")
        let _country_id = document.getElementById(dropdown_id.replace(/city_id/g, "") + "country_id")
        if (!isNaN(parseInt(_country_id.value)) && !isNaN(parseInt(_province_id.value))) {
            if (_name, _province_id, _country_id) {
                city_detail.name = _name.value
                city_detail.country_id = parseInt(_country_id.value)
                city_detail.province_id = parseInt(_province_id.value)
                
                let r = confirm("Are you sure you want to edit this record?")
                if (r === true) {
                    update_city_record($this, remove_nulls(city_detail))
                }
            }
        }
    }
    
    //------------------------------------------------------------------
    
    const init = function (settings) {
        build_drop_downs(settings)
    }
    
    //------------------------------------------------------------------
    
    return {
        id: null,
        detail: {
            id: null,
            province_id: null,
            country_id: null,
            created_by: null,
            modified_by: null,
            sort_order: null,
            name: null,
            enabled: null,
            date_created: null,
            date_modified: null,
            note: null,
        },
        all: [],
        close: function () {
            destroy_form()
        },
        save: function ($this, dropdown_id) {
            save($this, dropdown_id)
        },
        get: function (country_id, province_id, el) {
            get(country_id, province_id, el)
        },
        add: function (elem, val, dropdown_id) {
            add(elem, val, dropdown_id)
        },
        set_detail: function (city) {
            set_detail(city)
        },
        init: function (settings) {
            init(settings)
        },
    }
    
})()
