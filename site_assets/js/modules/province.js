const Province = (function () {
    "use strict"
    
    const class_name = "form-new-province"
    const form_id = "form_new_province"
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const form_rules = {
        rules: {
            province_name: {
                required: true,
                //minlength: 3,
            },
            province_iso2: {
                //required: true,
                minlength: 2,
                maxlength: 2,
            },
            province_iso3: {
                //required: true,
                minlength: 1,
                maxlength: 2,
            },
        },
        messages: {
            province_name: {
                required: "required",
                //minlength: "too short",
            },
            province_iso2: {
                //required: "required",
                minlength: "too short",
                maxlength: "too long",
            },
            province_iso3: {
                //required: "required",
                minlength: "too short",
                maxlength: "too long",
            },
        },
    }
    
    //------------------------------------------------------------------
    
    const handle_province_error = function (msg) {
        toastr.error(msg)
        console.log(msg)
    }
    
    const on_click_outside = (e) => {
        let tar = $(e.target).parents("form." + class_name)
        if (!tar[0] && !e.target.className.includes("select-add-option")) {
            Province.close()
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
                                      if (!isNaN(parseInt(country_element.value))) {
                                          let country_id = parseInt(country_element.value)
                                          if (!isNaN(parseInt($(this).val()))) {
                                              City.get(country_id, parseInt($(this).val()), city_element)
                                          } else {
                                              City.id = null
                                              City.get(country_id, null, city_element)
                                          }
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
                sendGetRequest("/provinces/get", dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handle_province_error("Oops: 1")
                    }
                })
            } catch (e) {
                console.log(e)
                return handle_province_error("Error Validating Province")
            }
        } else {
            return handle_province_error("Error Loading Province- Missing Data")
        }
    }
    
    const update_province_record = function ($this, dataToSend) {
        if (dataToSend) {
            try {
                sendPostRequest("/provinces/update", dataToSend, function (data, status, xhr) {
                    if (data && data[0]) {
                        Province.all.set(data[0].province_id, data[0])
                        let province_elements = $("select[data-type='province']")
                        Province.id = data[0].province_id
                        City.id = null
                        province_elements.each(function (index, element) {
                            var newOption = new Option(data[0].province_name, data[0].province_id, false, false)
                            $(element).append(newOption).trigger("change")
                        })
                        
                        $($this).val(data[0].province_id).trigger("change")
                        
                        Province.close()
                        toastr.success("Province: " + data[0].province_id + " updated")
                        
                    } else {
                        return handle_province_error("Error: 1")
                    }
                })
            } catch (e) {
                console.log(e)
                handle_province_error("Error: Validating Province")
            }
        } else {
            console.log("Error: Missing Data")
            handle_province_error("Error: Missing Data")
        }
    }
    
    //------------------------------------------------------------------
    
    const set_detail = function (province) {
        let details = clear_detail()
        let id = null
        if (province) {
            id = validInt(province.province_id)
            details = {
                id: validInt(province.province_id),
                name: (province.province_name) ? province.province_name : null,
                sort_order: (province.province_sort_order) ? province.province_sort_order : null,
                country_id: validInt(province.province_country_id),
                iso2: (province.province_iso2) ? province.province_iso2 : null,
                iso3: (province.province_iso3) ? province.province_iso3 : null,
                enabled: (province.province_enabled) ? province.province_enabled : 1,
                date_created: (province.province_date_created) ? province.province_date_created : formatDateMySQL(),
                created_by: (province.province_created_by) ? province.province_created_by : user_id,
                date_modified: (province.province_date_modified) ? province.province_date_modified : formatDateMySQL(),
                modified_by: (province.province_modified_by) ? province.province_modified_by : user_id,
                note: (province.province_note) ? province.province_note : null,
            }
        }
        Province.id = id
        Province.detail = details
    }
    
    const clear_detail = function () {
        return {
            id: null,
            name: null,
            sort_order: null,
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
    
    //------------------------------------------------------------------
    
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
        
        let newProvinceForm = document.createElement("form")
        
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
        
        newProvinceForm.id = form_id
        newProvinceForm.classList = ["card card-body m-3 " + class_name]
        
        heading1.classList = "card-title"
        heading1.innerText = "Province Details"
        
        name_text_element.id = "province_name"
        name_text_element.name = "province_name"
        name_text_element.type = "text"
        name_text_element.classList = ["form-control"]
        name_label_element.htmlFor = "province_name"
        name_label_element.innerHTML = "Name:"
        error_element1.id = "province_name-error"
        
        iso2_text_element.id = "province_iso2"
        iso2_text_element.name = "province_iso2"
        iso2_text_element.type = "text"
        iso2_text_element.maxLength = 2
        iso2_text_element.classList = ["form-control"]
        iso2_label_element.htmlFor = "province_iso2"
        iso2_label_element.innerHTML = "ISO2:"
        error_element2.id = "province_iso2-error"
        
        iso3_text_element.id = "province_iso3"
        iso3_text_element.name = "province_iso3"
        iso3_text_element.type = "text"
        iso3_text_element.maxLength = 3
        iso3_text_element.classList = ["form-control"]
        iso3_label_element.htmlFor = "province_iso3"
        iso3_label_element.innerHTML = "ISO3:"
        error_element3.id = "province_iso3-error"
        
        save_button.classList = ["btn btn-primary btn-sm waves-effect waves-light"]
        save_button.innerText = "save"
        save_button.type = "button"
        
        save_button.addEventListener("click", event => {
            Province.save(elem, dropdown_id)
        })
        
        cancel_button.classList = ["btn btn-outline-danger btn-sm waves-effect waves-light"]
        cancel_button.innerText = "cancel"
        cancel_button.type = "button"
        
        cancel_button.addEventListener("click", event => {
            destroy_form()
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
        
        newProvinceForm.appendChild(heading1)
        newProvinceForm.appendChild(row1)
        newProvinceForm.appendChild(row2)
        
        parent[0].appendChild(newProvinceForm)
        
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
    
    //------------------------------------------------------------------
    
    const set = function (settings) {
    
    }
    
    const get = function (country_id, el) {
        Province.all = new Map()
        let province_id = ""
        if (Province.id !== null) {
            province_id = Province.id
        }
        if (!el || !country_id) {
            $(el).BuildDropDown({
                data: Array.from(Province.all.values()),
                title: "Province",
                id_field: "province_id",
                text_field: "province_name",
                first_selectable: false,
            })
            $(el).val("").trigger("change")
            return
        }
        
        let dataToSend = {
            country_id: country_id,
        }
        
        fetch_province_list(dataToSend, function (data) {
            if (data) {
                Province.all = buildMap(data, "province_id")
                $(el).BuildDropDown({
                    data: Array.from(Province.all.values()),
                    title: "Province",
                    id_field: "province_id",
                    text_field: "province_name",
                    first_selectable: false,
                })
                $(el).val(province_id).trigger("change")
            }
        })
        
    }
    
    const add = function (elem, val, dropdown_id) {
        if (!elem) {
            return
        }
        
        build_form(elem, val, dropdown_id)
    }
    
    const save = function ($this, dropdown_id) {
        let province_detail = {}
        let _name = document.getElementById("province_name")
        let _province_iso2 = document.getElementById("province_iso2")
        let _province_iso3 = document.getElementById("province_iso3")
        let _country_id = document.getElementById(dropdown_id.replace(/province_id/g, "") + "country_id")
        if (!isNaN(parseInt(_country_id.value))) {
            if (_name, _province_iso2, _province_iso3, _country_id) {
                province_detail.name = _name.value
                province_detail.iso2 = _province_iso2.value
                province_detail.iso3 = _province_iso3.value
                province_detail.country_id = parseInt(_country_id.value)
                let r = confirm("Are you sure you want to edit this record?")
                if (r === true) {
                    update_province_record($this, remove_nulls(province_detail))
                }
            }
        }
        
    }
    
    const update_select = function (country_id, elem) {
    
    }
    
    //------------------------------------------------------------------
    
    const init = function (settings) {
        build_drop_downs(settings)
    }
    
    //------------------------------------------------------------------
    
    return {
        detail: {},
        all: [],
        id: null,
        set_detail: function (province) {
            set_detail(province)
        },
        update_select: function (country_id, elem) {
            update_select(country_id, elem)
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
    }
    
})()
