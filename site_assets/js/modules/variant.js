const Variant = (function () {
    "use strict"
    
    //
    const _category_id = document.getElementById("category_id")
    const _product_edit_variant_form_variant_name_filter = document.getElementById("product_edit_variant_form_variant_name_filter")
    const _product_edit_variant_form_variant_name_filter_add_new_button = document.getElementById("product_edit_variant_form_variant_name_filter_add_new_button")
    const _table_variant_product_edit = document.getElementById("table_variant_product_edit")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let $table_variant_product_edit = $(_table_variant_product_edit)
    
    //
    $(_product_edit_variant_form_variant_name_filter_add_new_button)
      .on("click", function () {
          alert()
      })
    
    const initAutoComplete = function () {
        let category_id = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
        
        $(_product_edit_variant_form_variant_name_filter)
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
              serviceUrl: "/api/v1.0/autocomplete/variants",
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
                  Console.log("suggestion.data", suggestion.data)
                  
              },
          })
    }
    
    const _default_detail = function () {
        return {
            id: null,
            category_id: null,
            name: null,
            min_age: null,
            max_age: null,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            note: null,
        }
    }
    
    const build_product_edit_table = function () {
        $table_variant_product_edit = $(_table_variant_product_edit).table({
            table_type: "display_list",
            data: Variant.all,
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
                    data: "code",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "Min Age",
                    targets: 2,
                    data: "min_age",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "Max Age",
                    targets: 3,
                    data: "max_age",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
            ],
            rowClick: Variant.edit,
        })
    }
    
    const set = function (variant) {
        let detail = _default_detail()
        if (variant) {
            detail.id = (variant.id) ? variant.id : null
            detail.category_id = (variant.category_id) ? variant.category_id : null
            detail.name = (variant.name) ? variant.name : null
            detail.code = (variant.code) ? variant.code : null
            detail.min_age = (variant.min_age) ? variant.min_age.toString() : null
            detail.max_age = (variant.max_age) ? variant.max_age : null
            detail.enabled = (variant.enabled) ? variant.enabled : 1
            detail.date_created = (variant.date_created) ? variant.date_created : formatDateMySQL()
            detail.created_by = (variant.created_by) ? variant.created_by : user_id
            detail.date_modified = (variant.date_modified) ? variant.date_modified : formatDateMySQL()
            detail.modified_by = (variant.modified_by) ? variant.modified_by : user_id
            detail.note = (variant.note) ? variant.note : null
        }
        
        Product.detail = detail
        return detail
    }
    
    const load_all = function (variants) {
        Variant.all = new Map()
        
        if (variants) {
            $.each(variants, function (k, variant) {
                let detail = set(variant)
                $table_variant_product_edit.insertRow(detail)
                Variant.all.set(detail.id, detail)
            })
        }
    }
    
    const init = function (settings) {
        let variants = []
        Console.log("Variant.init(settings)", settings)
        if (settings) {
            if (settings) {
                variants = settings
            }
        }
        Console.log("variants", variants)
        if (_table_variant_product_edit) {
            build_product_edit_table()
        }
        
        load_all(variants)
        
        if (_product_edit_variant_form_variant_name_filter) {
            initAutoComplete()
        }
        
        Console.log("init", Variant.all)
    }
    
    const edit = function (variant) {
        Console.log("variant", variant)
    }
    
    return {
        all: new Map(),
        edit: function (variant) {
            edit(variant)
        },
        init: function (settings) {
            init(settings)
        },
    }
})()
