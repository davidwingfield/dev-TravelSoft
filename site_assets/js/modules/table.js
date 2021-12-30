$.fn.table = function (settings) {
    "use strict"
    ///////////////////////////////////////////////
    let columnDefs, data = []
    let $dTable
    let table_type = "display_list"
    let table_id = $(this).attr("id")
    ///////////////////////////////////////////////
    const _table = document.getElementById(table_id)
    if ($.fn.DataTable.isDataTable("#" + table_id)) {
        return
    }
    ///////////////////////////////////////////////
    if (settings) {
        if (settings.columnDefs) {
            columnDefs = settings.columnDefs
        }
        if (settings.table_type) {
            table_type = settings.table_type
        }
        if (settings.data) {
            data = settings.data
        }
    }
    
    ///////////////////////////////////////////////
    
    const formatTable = function () {
        let _filter = $("#" + table_id + "_wrapper .dataTables_filter")
        let _length = $("#" + table_id + "_wrapper .dataTables_length")
        let _info = $("#" + table_id + "_wrapper .dataTables_info")
        let _paginate = $("#" + table_id + "_wrapper .dataTables_paginate")
        let _wrapper = $("#" + table_id + "_wrapper")
        let _wrapper_select = $("#" + table_id + "_wrapper select")
        let _wrapper_table = $("#" + table_id).parent("div")
        // ----
        _wrapper_table
          .removeClass("col-sm-12")
          .addClass("p-0 m-0 w-100 h-100")
        _wrapper
          .find("label").each(function () {
            $(this).parent().append($(this).children())
        })
        
        _wrapper
          .find("div.row")
          .removeClass("row")
          .addClass("d-flex justify-content-between")
        
        _filter
          .find("input").each(function () {
            const $this = $(this)
            $this.attr("placeholder", "Search")
            $this.removeClass("form-control-sm")
        })
        
        _filter
          .find("label").remove()
        
        _filter
          .parent("div")
          .removeClass("col-sm-12 col-md-6")
          .addClass("w-50")
        
        _info
          .parent("div")
          .removeClass("col-sm-12 col-md-5")
          .addClass("w-50 d-flex align-content-center flex-wrap px-0")
        
        _info
          .addClass("py-0")
        
        _paginate
          .parent("div")
          .removeClass("col-sm-12 col-md-7")
          .addClass("w-50 px-0")
        
        _paginate
          .addClass("py-0")
        
        _paginate
          .find("ul.pagination")
          .addClass("mb-0")
        
        _length
          .parent("div")
          .removeClass("col-sm-12 col-md-6")
          .addClass("w-50")
        
        _length
          .find("label").each(function () {
            const $this = $(this)
            $this.addClass("mb-0 pb-0 mr-3 d-inline-block")
        })
        
        _wrapper_select
          .removeClass("custom-select custom-select-sm form-control form-control-sm")
        
        _wrapper_select
          .addClass("form-control d-inline-block")
        
        if (table_type === "display_list") {
            $("#" + table_id + ">tbody>tr").css({
                "cursor": "pointer",
            })
        }
        
    }
    
    ///////////////////////////////////////////////
    const insertRow = function (row_data) {
        if (row_data) {
            try {
                $dTable.row.add(row_data).node().id = table_id + "_tr_" + row_data.id
                $dTable.draw(false)
                $dTable.page.jumpToData(row_data.id, 0)
                formatTable()
            } catch (e) {
                Console.log(e)
            }
        }
    }
    
    const updateRow = function (row_data) {
        if (row_data) {
            try {
                let rowId = "#" + table_id + "_tr_" + row_data.id
                $dTable.row(rowId).data(row_data).draw()
                loadRow(row_data.id)
            } catch (e) {
                Console.log(e)
            }
        }
        
        formatTable()
    }
    
    const loadRow = function (row_data) {
        
        if (row_data) {
            try {
                $("#" + table_id + "_tr_" + row_data.id).addClass("selected")
                $dTable.page.jumpToData(row_data.id, 0)
            } catch (e) {
                Console.log(e)
            }
            
        }
    }
    
    const deleteRow = function (row_data) {
        if (row_data) {
            try {
                let rowId = "#" + table_id + "_tr_" + row_data.id
                let rowData = row_data
                $dTable
                  .row(rowId)
                  .remove()
                  .draw()
            } catch (e) {
                Console.log(e)
            }
        }
    }
    
    const clear_selected_rows = function () {
        try {
            let table = $("#" + table_id + "> tbody  > tr")
            $.each(table, function (i, row) {
                $(row).removeClass("selected")
            })
        } catch (e) {
            Console.log("clear_selected_rows", e)
        }
    }
    ///////////////////////////////////////////////
    if (_table) {
        
        try {
            
            $dTable = $(this).DataTable({
                pageLength: 5,
                lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                data: data,
                columnDefs: columnDefs,
            })
            
            if (settings.rowClick) {
                $dTable.on("click", "tr", function () {
                    if ($(this).find("td").hasClass("dataTables_empty")) {
                    
                    } else {
                        clear_selected_rows()
                        $(this).addClass("selected")
                        let rowData = $dTable.row(this).data()
                        settings.rowClick(rowData)
                    }
                    
                })
            }
            
            formatTable()
            
        } catch (e) {
            Console.log(e)
        }
        
    }
    ///////////////////////////////////////////////
    return {
        insertRow: function (row_data) {
            insertRow(row_data)
        },
        clearSelectedRows: function () {
            clear_selected_rows()
        },
        deleteRow: function (row_data) {
            deleteRow(row_data)
        },
        loadRow: function (id) {
            loadRow(id)
        },
        updateRow (row_data) {
            updateRow(row_data)
        },
    }
    
}
