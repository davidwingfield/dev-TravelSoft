const Unit = (function () {
    "use strict"
    
    const _category_id = document.getElementById("category_id")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    const _product_edit_unit_form_unit_name_filter = document.getElementById("product_edit_unit_form_unit_name_filter")
    const _table_unit_product_edit = document.getElementById("table_unit_product_edit")
    let $table_unit_product_edit = $(_table_unit_product_edit)
    
    const build_product_edit_table = function () {
        $table_unit_product_edit = $(_table_unit_product_edit).table({
            table_type: "display_list",
            data: Unit.all,
            columnDefs: [
                {
                    title: "Name",
                    targets: 0,
                    data: "name",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "Code",
                    targets: 1,
                    data: "room_code",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "Min Pax",
                    targets: 2,
                    data: "min_pax",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "Max Pax",
                    targets: 3,
                    data: "max_pax",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
            ],
            rowClick: Unit.edit,
        })
    }
    
    const init_autocomplete = function () {
        let category_id = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
        
        $(_product_edit_unit_form_unit_name_filter)
          .on("click", function () {
          
          })
          .on("search", function () {
          
          })
          .on("change", function () {
              /*
              setTimeout(function () {
                  let provider_name = _provider_name.value
                  
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
          .autocomplete({
              serviceUrl: "/api/v1.0/autocomplete/units",
              minChars: 2,
              cache: false,
              dataType: "json",
              triggerSelectOnValidInput: false,
              paramName: "st",
              params: { "category_id": category_id },
              onSelect: function (suggestion) {
                  if (!suggestion.data) {
                      return
                  }
                  let unit = suggestion.data
                  
                  Console.log("unit", unit)
              },
          })
    }
    
    const _defaultDetail = function () {
        /**
         * api_id: null
         * blurb: null
         * category_id: 1
         * cover_image: null
         * created_by: 4
         * date_created: "2021-12-21 16:32:23"
         * date_modified: "2021-12-21 16:32:23"
         * description_long: "<div class=\"card-block \">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla ante eu nulla condimentum ullamcorper. Curabitur euismod, erat id facilisis accumsan, lacus nisl molestie risus, ut dapibus tellus justo id arcu.</div>"
         * description_short: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla ante eu nulla condimentum ullamcorper. Curabitur euismod, erat id facilisis accumsan, lacus nisl molestie risus, ut dapibus tellus justo id arcu."
         * enabled: 1
         * end_time: null
         * id: 204
         * max_nights: 7
         * max_pax: 4
         * meeting_point: null
         * min_nights: 1
         * min_pax: 1
         * modified_by: 4
         * name: "Suite"
         * note: null
         * room_code: "UN-00000000204-SUIT"
         * start_time: null
         * time_notes: nul
         */
        return {
            api_id: null,
            blurb: null,
            category_id: 1,
            cover_image: null,
            created_by: user_id,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
            description_long: null,
            description_short: null,
            enabled: 1,
            end_time: null,
            id: null,
            max_nights: null,
            max_pax: null,
            meeting_point: null,
            min_nights: 1,
            min_pax: 1,
            modified_by: user_id,
            name: null,
            note: null,
            room_code: null,
            start_time: null,
            time_notes: null,
        }
    }
    
    const set = function (unit) {
        let detail = _defaultDetail()
        if (unit) {
            detail.api_id = (unit.api_id) ? unit.api_id : null
            detail.blurb = (unit.blurb) ? unit.blurb : null
            detail.category_id = (unit.category_id) ? unit.category_id : null
            detail.cover_image = (unit.cover_image) ? unit.cover_image : null
            detail.created_by = (unit.created_by) ? unit.created_by : user_id
            detail.date_created = (unit.date_created) ? unit.date_created : formatDateMySQL()
            detail.date_modified = (unit.date_modified) ? unit.date_modified : formatDateMySQL()
            detail.description_long = (unit.description_long) ? unit.description_long : null
            detail.description_short = (unit.description_short) ? unit.description_short : null
            detail.enabled = (unit.enabled) ? unit.enabled : 1
            detail.end_time = (unit.end_time) ? unit.end_time : null
            detail.id = (unit.id) ? unit.id : null
            detail.max_nights = (unit.max_nights) ? unit.max_nights : null
            detail.max_pax = (unit.max_pax) ? unit.max_pax : null
            detail.meeting_point = (unit.meeting_point) ? unit.meeting_point : null
            detail.min_nights = (unit.min_nights) ? unit.min_nights : 1
            detail.min_pax = (unit.min_pax) ? unit.min_pax : 1
            detail.modified_by = (unit.modified_by) ? unit.modified_by : user_id
            detail.name = (unit.name) ? unit.name : null
            detail.note = (unit.note) ? unit.note : null
            detail.room_code = (unit.room_code) ? unit.room_code : null
            detail.start_time = (unit.start_time) ? unit.start_time : null
            detail.time_notes = (unit.time_notes) ? unit.time_notes : null
        }
        
        return detail
    }
    
    const load_all = function (units) {
        if (!units) {
            units = []
        }
        Console.log("Units", units)
        $.each(units, function (k, unit) {
            let detail = set(unit)
            Console.log("detail", detail)
        })
    }
    
    const init = function (settings) {
        let units = []
        if (settings) {
            units = settings
            if (settings.units) {
                units = settings.units
            }
        }
        
        if (_product_edit_unit_form_unit_name_filter) {
            init_autocomplete()
            Console.log("units", units)
            load_all(units)
        }
        
    }
    
    const edit = function (unit) {
        Console.log("Unit", unit)
    }
    
    return {
        all: new Map(),
        edit: function (unit) {
            edit(unit)
        },
        init: function (settings) {
            init(settings)
        },
    }
})()
