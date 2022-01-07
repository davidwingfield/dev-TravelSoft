const Profile = (function () {
    "use strict"
    const _table_profile_product_edit = document.getElementById("table_profile_product_edit")
    const _product_edit_profile_form_profile_name_filter = document.getElementById("product_edit_profile_form_profile_name_filter")
    const _button_add_product_profile = document.getElementById("button_add_product_profile")
    const _product_edit_profile_form = document.getElementById("product_edit_profile_form")
    // ----
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let $table_profile_product_edit = $(_table_profile_product_edit)
    let form_rules = {
        rules: {
            product_edit_unit_form_unit_min_nights: {
                required: true,
                number: true,
                min: 1,
            },
            product_edit_unit_form_unit_max_nights: {
                required: true,
                number: true,
                min: 1,
            },
            product_edit_unit_form_unit_min_pax: {
                required: true,
                number: true,
                min: 1,
            },
            product_edit_unit_form_unit_max_pax: {
                required: true,
                number: true,
                min: 1,
            },
        },
        messages: {
            product_edit_unit_form_unit_min_nights: {
                required: "Field Required",
                number: "Field Invalid",
                min: "Field Invalid",
            },
            product_edit_unit_form_unit_max_nights: {
                required: "Field Required",
                number: "Field Invalid",
                min: "Field Invalid",
            },
            product_edit_unit_form_unit_min_pax: {
                required: "Field Required",
                number: "Field Invalid",
                min: "Field Invalid",
            },
            product_edit_unit_form_unit_max_pax: {
                required: "Field Required",
                number: "Field Invalid",
                min: "Field Invalid",
            },
        },
    }
    // ----
    
    $(_button_add_product_profile)
      .on("click", function () {
      
      })
    
    /**
     * build product edit profile table
     */
    const buildEditTable = function () {
        /*
        Console.log("Profile.buildEditTable()", Profile)
        $table_profile_product_edit = $(_table_profile_product_edit).table({
            table_type: "display_list",
            data: [],
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
                    title: "sales_types_details",
                    targets: 1,
                    data: "sales_types_details",
                    render: function (data, type, row, meta) {
                        Console.log("sales_types_details", data)
                        let nights = 1
                        if (data === null) {
                            nights = "null"
                        } else {
                            nights = data
                        }
                        
                        return "<span style='white-space: nowrap;'>" + nights + "</span>"
                    },
                },
                {
                    title: "allot_by_id",
                    targets: 2,
                    data: "allot_by_id",
                    render: function (data, type, row, meta) {
                        let nights = 1
                        if (data === null) {
                            nights = "null"
                        } else {
                            nights = data
                        }
                        return "<span style='white-space: nowrap;'>" + nights + "</span>"
                    },
                },
                {
                    title: "expires",
                    targets: 3,
                    data: "expires",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "release_amt",
                    targets: 4,
                    data: "release_amt",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
            ],
            rowClick: Profile.edit,
        })
                 */
    }
    
    const initAutoComplete = function () {
        /*
        Console.log("Profile.initAutoComplete()", Profile)
        $(_product_edit_profile_form_profile_name_filter)
          .on("click", function () {
          
          })
          .on("search", function () {
              $table_season_product_edit.clearSelectedRows()
              resetForm()
          })
          .on("change", function () {
              if (_product_edit_season_form_season_name_filter.value === "") {
                  $table_season_product_edit.clearSelectedRows()
                  resetForm()
              }
          })
          .autocomplete({
              serviceUrl: "/api/v1.0/autocomplete/profiles",
              minChars: 2,
              cache: false,
              dataType: "json",
              triggerSelectOnValidInput: false,
              paramName: "st",
              onSelect: function (suggestion) {
                  if (!suggestion.data) {
                      return
                  }
                  $table_profile_product_edit.clearSelectedRows()
                  let profile = suggestion.data
                  Console.log("profile", profile)
              },
          })
          
         */
    }
    
    /**
     * set default profile record detail
     *
     * @returns {{allot_by_details: {note: null, date_modified: *, date_created: *, modified_by: (number|number), name: null, id: null, created_by: (number|number), sort_order: number, enabled: number}, note: null, expires: null, weekday_dow: string, return_dow: string, advanced_booking_min: null, checkin_dow: string, min_duration: number, days_out: null, transfer_sales_types_details: {note: null, date_modified: *, date_created: *, modified_by: (number|number), name: null, id: null, class: null, created_by: (number|number), sort_order: number, enabled: number}, enabled: number, advanced_booking_date: null, id: null, checkout_dow: string, sales_types_details: {note: null, date_modified: *, date_created: *, modified_by: (number|number), name: null, id: null, class: null, created_by: (number|number), sort_order: number, enabled: number}, sales_types_id: null, transfer_sales_types_id: null, quantity: null, min_length_days: number, product_profile_details: {note: null, date_modified: *, date_created: *, profile_id: null, product_id: null, modified_by: (number|number), created_by: (number|number), enabled: number}, date_created: *, departure_dow: string, advanced_booking_max: null, equal_duration: null, release_amt: null, created_by: (number|number), max_duration: null, date_modified: *, modified_by: (number|number), name: null, allot_by_id: null, inc_days_dow: string}}
     */
    const defaultDetail = function () {
        return {
            advanced_booking_date: null,
            advanced_booking_max: null,
            advanced_booking_min: null,
            allot_by_details: {
                created_by: user_id,
                date_created: formatDateMySQL(),
                date_modified: formatDateMySQL(),
                enabled: 1,
                id: null,
                modified_by: user_id,
                name: null,
                note: null,
                sort_order: 999,
            },
            allot_by_id: null,
            checkin_dow: "",
            checkout_dow: "",
            created_by: user_id,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
            days_out: null,
            departure_dow: "",
            enabled: 1,
            equal_duration: null,
            expires: null,
            id: null,
            inc_days_dow: "",
            max_duration: null,
            min_duration: 1,
            min_length_days: 1,
            modified_by: user_id,
            name: null,
            note: null,
            product_profile_details: {
                created_by: user_id,
                date_created: formatDateMySQL(),
                date_modified: formatDateMySQL(),
                enabled: 1,
                modified_by: user_id,
                note: null,
                product_id: null,
                profile_id: null,
            },
            quantity: null,
            release_amt: null,
            return_dow: "",
            sales_types_details: {
                class: null,
                created_by: user_id,
                date_created: formatDateMySQL(),
                date_modified: formatDateMySQL(),
                enabled: 1,
                id: null,
                modified_by: user_id,
                name: null,
                note: null,
                sort_order: 999,
            },
            sales_types_id: null,
            transfer_sales_types_details: {
                class: null,
                created_by: user_id,
                date_created: formatDateMySQL(),
                date_modified: formatDateMySQL(),
                enabled: 1,
                id: null,
                modified_by: user_id,
                name: null,
                note: null,
                sort_order: 999,
            },
            transfer_sales_types_id: null,
            weekday_dow: "",
        }
    }
    
    /**
     * load all product profiles
     *
     * @param profiles
     */
    const loadAll = function (profiles) {
        Profile.all = new Map()
        if (!profiles) {
            profiles = []
        }
        
        $.each(profiles, function (k, profile) {
            let detail = set(profile)
            Console.log("detail", detail)
        })
        
        Console.log("Profile.all", Profile.all)
    }
    
    const set = function (profile) {
        let detail = defaultDetail()
        Console.log("Profile.set(profile)", profile)
        if (profile) {
            detail.advanced_booking_date = (profile.advanced_booking_date) ? profile.advanced_booking_date : null
            detail.advanced_booking_max = (profile.advanced_booking_max) ? profile.advanced_booking_max : null
            detail.advanced_booking_min = (profile.advanced_booking_min) ? profile.advanced_booking_min : null
            detail.allot_by_details.created_by = (profile.created_by) ? profile.created_by : null
            detail.allot_by_details.date_created = (profile.date_created) ? profile.date_created : formatDateMySQL()
            detail.allot_by_details.date_modified = (profile.date_modified) ? profile.date_modified : formatDateMySQL()
            detail.allot_by_details.enabled = (profile.enabled) ? profile.enabled : 1
            detail.allot_by_details.id = (profile.id) ? profile.id : null
            detail.allot_by_details.modified_by = (profile.modified_by) ? profile.modified_by : user_id
            detail.allot_by_details.name = (profile.name) ? profile.name : null
            detail.allot_by_details.note = (profile.note) ? profile.note : null
            detail.allot_by_details.sort_order = (profile.sort_order) ? profile.sort_order : 999
        }
        return detail
    }
    
    const init = function (settings) {
        //Console.log("Profile.init(settings)", settings)
        //let profiles = []
        /*
        if (settings) {
            if (settings.profiles) {
                profiles = settings.profiles
            }
        }
        //*/
        /*
        if (_table_profile_product_edit) {
            buildEditTable()
        }
         */
        
        /*
        if (_product_edit_profile_form_profile_name_filter) {
            initAutoComplete()
        }
        
        if (_product_edit_profile_form) {
            initAutoComplete()
            validator_init(form_rules)
            Unit.validator = $(_product_edit_profile_form).validate()
        }
        
        
        loadAll(profiles)
        
        //*/
    }
    
    const edit = function (profile) {
        Console.log("Profile.edit(profile)", profile)
    }
    
    return {
        all: new Map(),
        init: function (settings) {
            init(settings)
        },
        edit: function (profile) {
            edit(profile)
        },
    }
    
})()
