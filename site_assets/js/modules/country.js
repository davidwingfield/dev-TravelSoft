const Country = (function () {
    "use strict"
    
    const class_name = "form-new-country"
    const form_id = "form_new_country"
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const form_rules = {
        rules: {
            country_name: {
                required: true,
                //minlength: 3,
            },
            country_iso2: {
                //required: true,
                minlength: 2,
            },
            country_iso3: {
                //required: true,
                minlength: 3,
            },
        },
        messages: {
            country_name: {
                required: "required",
                //minlength: "too short",
            },
            country_iso2: {
                //required: "required",
                minlength: "too short",
            },
            country_iso3: {
                //required: "required",
                minlength: "too short",
            },
        },
    }
    
    const handle_country_error = function (msg) {
        toastr.error(msg)
        Console.log(msg)
    }
    
    const on_click_outside = (e) => {
        let tar = $(e.target).parents("div." + class_name)
        
        if (!tar[0] && !e.target.className.includes("select-add-option")) {
            Country.close()
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
                                  let _filterCountrySearch = x[0]
                                  
                                  $(_filterCountrySearch).attr("id", "" + dropdown_id + "_search")
                                  
                                  if (!document.getElementById("filter_country_add_icon")) {
                                      let i = document.createElement("i")
                                      i.classList = "select-add-option fas fa-plus filter_country_add"
                                      i.id = "filter_country_add_icon"
                                      i.addEventListener("click", event => {
                                          let val = _filterCountrySearch.value
                                          $(element).select2("close")
                                          Country.add(this, val)
                                          
                                      })
                                      _filterCountrySearch.after(i)
                                  }
                                  
                                  $(".filter_country_add").hide()
                                  
                                  if (_filterCountrySearch) {
                                      _filterCountrySearch.addEventListener("keyup", event => {
                                          
                                          if (_filterCountrySearch.value !== "") {
                                              $(".filter_country_add").show()
                                          } else {
                                              $(".filter_country_add").hide()
                                          }
                                          
                                      })
                                  }
                              }
                              
                          })
                          .on("change", function () {
                              let country_id = (!isNaN(parseInt($(this).val()))) ? parseInt($(this).val()) : null
                              let province_el_id = $(this)
                                .attr("id")
                                .replace("country", "province")
                              let province_element = document.getElementById(province_el_id)
                              let city_el_id = $(this)
                                .attr("id")
                                .replace("country", "city")
                              let city_element = document.getElementById(city_el_id)
                              // ----
                              if (!isNaN(parseInt($(this).val()))) {
                                  if (province_element) {
                                      Province.get(parseInt($(this).val()), province_element)
                                      //City.get(null, null, city_element)
                                  }
                              } else {
                                  Province.get(null, province_element)
                              }
                          })
                        // ----
                    }
                    
                })
            }
            
        }
        
    }
    
    const fetch_country_list = function (dataToSend, callback) {
        if (dataToSend) {
            try {
                $.ajax({
                    type: "GET",
                    url: "/api/v1.0/countries",
                    data: dataToSend,
                    async: false,
                    
                }).done(function (data) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handle_country_error("Oops: 1")
                    }
                })
                /*
                sendGetRequest("/api/v1.0/countries", dataToSend, function (data, status, xhr) {
                    //Console.log(data)
                    
                    if (data) {
                        // Country.all = data.result
                        return callback(data)
                    } else {
                        return handle_country_error("Oops: 1")
                    }
                })
                //*/
            } catch (e) {
                Console.log("error", e)
                return handle_country_error("Error Validating Country")
            }
        } else {
            return handle_country_error("Error Loading Country- Missing Data")
        }
    }
    
    const update_country_record = function ($this, dataToSend) {
        if (dataToSend) {
            try {
                sendPostRequest("/api/v1.0/countries/update", dataToSend, function (data, status, xhr) {
                    if (data && data[0]) {
                        let new_country = data[0]
                        Country.all.set(new_country.id, new_country)
                        let country_elements = $("select[data-type='country']")
                        country_elements.each(function (index, element) {
                            var newOption = new Option(new_country.name, new_country.id, false, false)
                            $(element).append(newOption).trigger("change")
                        })
                        $($this).val(new_country.id).trigger("change")
                        Country.close()
                        toastr.success("Country: " + new_country.id + " updated")
                    } else {
                        return handle_country_error("Error: 1")
                    }
                })
            } catch (e) {
                Console.log("error", e)
                handle_country_error("Error: Validating Country")
            }
            
        } else {
            Console.log("Error: Missing Data")
            handle_country_error("Error: Missing Data")
        }
    }
    
    const set_detail = function (country) {
        let detail = clear_detail()
        let id = null
        if (country) {
            id = validInt(country.id)
            detail = {
                id: validInt(country.id),
                name: (country.name) ? country.name : null,
                sort_order: (country.sort_order) ? country.sort_order : null,
                iso2: (country.iso2) ? country.iso2 : null,
                iso3: (country.iso3) ? country.iso3 : null,
                currency_id: validInt(country.currency_id),
                enabled: (country.enabled) ? country.enabled : 1,
                date_created: (country.date_created) ? country.date_created : formatDateMySQL(),
                created_by: (country.created_by) ? country.created_by : user_id,
                date_modified: (country.date_modified) ? country.date_modified : formatDateMySQL(),
                modified_by: (country.modified_by) ? country.modified_by : user_id,
                note: (country.note) ? country.note : null,
            }
        }
        Country.id = id
        Country.detail = detail
        return detail
    }
    
    const clear_detail = function () {
        return {
            id: null,
            name: null,
            sort_order: null,
            iso2: null,
            iso3: null,
            currency_id: null,
            enabled: 1,
            note: null,
            created_by: user_id,
            modified_by: user_id,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
        }
    }
    
    const build_form = function (elem, val) {
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
        
        let new_country_form = document.createElement("div")
        
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
        
        heading1.classList = "card-title"
        heading1.innerText = "Country Details"
        
        new_country_form.id = form_id
        new_country_form.classList = ["card card-body m-3 " + class_name]
        
        name_text_element.id = "country_name"
        name_text_element.name = "country_name"
        name_text_element.type = "text"
        name_text_element.classList = ["form-control "]
        name_label_element.htmlFor = "country_name"
        name_label_element.innerHTML = "Name:"
        error_element1.id = "country_name-error"
        
        iso2_text_element.id = "country_iso2"
        iso2_text_element.name = "country_iso2"
        iso2_text_element.type = "text"
        iso2_text_element.maxLength = 2
        iso2_text_element.classList = ["form-control "]
        iso2_label_element.htmlFor = "country_iso2"
        iso2_label_element.innerHTML = "ISO2:"
        error_element2.id = "country_iso2-error"
        
        iso3_text_element.id = "country_iso3"
        iso3_text_element.name = "country_iso3"
        iso3_text_element.type = "text"
        iso3_text_element.maxLength = 3
        iso3_text_element.classList = ["form-control "]
        iso3_label_element.htmlFor = "country_iso3"
        iso3_label_element.innerHTML = "ISO3:"
        error_element3.id = "country_iso3-error"
        
        save_button.classList = ["btn btn-primary btn-sm waves-effect waves-light"]
        save_button.innerText = "save"
        save_button.type = "button"
        
        save_button.addEventListener("click", event => {
            Country.save(elem)
        })
        
        cancel_button.classList = ["btn btn-outline-danger btn-sm waves-effect waves-light"]
        cancel_button.innerText = "cancel"
        cancel_button.type = "button"
        
        cancel_button.addEventListener("click", event => {
            Country.close()
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
        error_element2.classList = ["error w-100 text-center"]
        error_element3.classList = ["error w-100 text-center"]
        
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
        row1.appendChild(col4)
        
        col5.append(cancel_button)
        col5.appendChild(save_button)
        
        row2.appendChild(col5)
        
        new_country_form.appendChild(heading1)
        new_country_form.appendChild(row1)
        new_country_form.appendChild(row2)
        
        parent[0].appendChild(new_country_form)
        
        name_text_element.value = value
        name_text_element.focus({ preventScroll: false })
        
        window.addEventListener("click", on_click_outside)
    }
    
    const destroy_form = function () {
        let elem = document.getElementById(form_id)
        if (elem) {
            elem.parentNode.removeChild(elem)
            window.removeEventListener("click", on_click_outside)
        }
    }
    
    const validate_form = function () {
        let _name = document.getElementById("country_name")
        let _country_iso2 = document.getElementById("country_iso2")
        let _country_iso3 = document.getElementById("country_iso3")
        let valid = true
        // ----
        if (!_name || !_country_iso2 || !_country_iso3) {
            handle_country_error("Error Processing Data")
            return false
        }
        
        if (_name.value === "") {
            $(_name).addClass("is-invalid")
            $("#country_name-error")
              .text("Required: Field is required")
              .show()
            valid = false
        } else {
            $(_name).removeClass("is-invalid")
            $("#country_name-error")
              .text("")
              .hide()
        }
        
        if (_country_iso2.value === "") {
            $(_country_iso2).addClass("is-invalid")
            $("#country_iso2-error")
              .text("Required: Field is required")
              .show()
            valid = false
        } else {
            $(_country_iso2).removeClass("is-invalid")
            $("#country_iso2-error")
              .text("")
              .hide()
        }
        
        if (_country_iso3.value === "") {
            $(_country_iso3).addClass("is-invalid")
            $("#country_iso3-error")
              .text("Required: Field is required")
              .show()
            valid = false
        } else {
            $(_country_iso3).removeClass("is-invalid")
            $("#country_iso3-error")
              .text("")
              .hide()
        }
        
        return valid
    }
    
    const get = function (settings) {
        fetch_country_list({}, function (data) {
            if (data) {
                Country.all = data
                build_drop_downs(settings)
            }
        })
    }
    
    const add = function (elem, val) {
        if (!elem) {
            return
        }
        
        build_form(elem, val)
    }
    
    const save = function ($this) {
        let _name = document.getElementById("country_name")
        let _country_iso2 = document.getElementById("country_iso2")
        let _country_iso3 = document.getElementById("country_iso3")
        if (_name && _country_iso2 && _country_iso3) {
            
            if (validate_form()) {
                let country_detail = {}
                
                country_detail.name = (_name.value !== "") ? _name.value : null
                country_detail.iso2 = (_country_iso2.value !== "") ? _country_iso2.value : null
                country_detail.iso3 = (_country_iso3.value !== "") ? _country_iso3.value : null
                
                confirmDialog(`Would you like to update?`, (ans) => {
                    if (ans) {
                        update_country_record($this, remove_nulls(country_detail))
                    }
                })
                
            }
        } else {
            toastr.error("Error: 2")
        }
        
    }
    
    const init = function (settings) {
        build_drop_downs(settings)
    }
    
    const load_all = function (countries) {
        Country.all = new Map()
        
        if (countries) {
            $.each(countries, function (k, country) {
                let detail = set_detail(country)
                Country.all.set(detail.id, detail)
            })
        }
    }
    
    return {
        detail: {},
        all: new Map(),
        close: function () {
            destroy_form()
        },
        add: function (elem, val) {
            add(elem, val)
        },
        save: function ($this) {
            save($this)
        },
        set: function (country_id) {
            set(country_id)
        },
        set_detail: function (country) {
            set_detail(country)
        },
        load_all: function (countries) {
            load_all(countries)
        },
        get: function (settings) {
            get(settings)
        },
        init: function (settings) {
            init(settings)
        },
    }
})()
