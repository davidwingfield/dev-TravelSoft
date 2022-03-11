const Page = (function () {
    "use strict"
    
    const _modal_new_page = document.getElementById("modal_new_page")
    const _button_add_page_heading = document.getElementById("button_add_page_heading")
    const _table_pages_index = document.getElementById("table_pages_index")
    const _page_index_section = document.getElementById("page_index_section")
    const _modal_new_page_id = document.getElementById("modal_new_page_id")
    const _modal_new_page_menu_id = document.getElementById("modal_new_page_menu_id")
    const _modal_new_page_path = document.getElementById("modal_new_page_path")
    const _modal_new_page_title = document.getElementById("modal_new_page_title")
    const _modal_new_page_sub_title = document.getElementById("modal_new_page_sub_title")
    const _modal_new_page_heading = document.getElementById("modal_new_page_heading")
    const _modal_new_page_sub_heading = document.getElementById("modal_new_page_sub_heading")
    const _modal_new_page_description = document.getElementById("modal_new_page_description")
    const _modal_new_page_keywords = document.getElementById("modal_new_page_keywords")
    const _modal_new_page_enabled = document.getElementById("modal_new_page_enabled")
    const _modal_new_page_form = document.getElementById("modal_new_page_form")
    const _modal_new_page_save_button = document.getElementById("modal_new_page_save_button")
    const _modal_new_page_cancel_button = document.getElementById("modal_new_page_cancel_button")
    const _modal_new_page_clear_button = document.getElementById("modal_new_page_clear_button")
    
    const formRules = {
        rules: {
            modal_new_page_path: {
                required: true,
            },
        },
        messages: {
            modal_new_page_path: {
                required: "Fields Required",
            },
        },
    }
    
    let $table_pages_index, $page_keywords
    let user_id = (document.getElementById('user_id')) ? (!isNaN(parseInt(document.getElementById('user_id').value))) ? parseInt(document.getElementById('user_id').value) : 4 : 4
    let tempDetail = null
    
    $(_button_add_page_heading)
        .on("click", function () {
            //console.log("Page.button_add_page_heading.click()")
            clearNewProductForm()
            renderPageForm()
        })
    
    $(_modal_new_page_save_button)
        .on("click", function () {
            //console.log("Page.modal_new_page_save_button.click()")
            save()
        })
    
    $(_modal_new_page_cancel_button)
        .on("click", function () {
            //console.log("Page.modal_new_page_cancel_button.click()")
            clearNewProductForm()
            hidePageForm()
        })
    
    $(_modal_new_page_clear_button)
        .on("click", function () {
            //console.log("Page.modal_new_page_clear_button.click()")
            clearNewProductForm()
        })
    
    const addRow = function (page) {
        //console.log("Page.addRow(page)", page)
        $table_pages_index.insertRow(page)
    }
    
    const updateRow = function (page) {
        //console.log("Page.updateRow(page)", page)
        
        //$table_pages_index.insertRow(page)
    }
    
    const buildIndexTable = function () {
        //console.log("Page.buildIndexTable()")
        if (_table_pages_index) {
            $table_pages_index = $(_table_pages_index).table({
                table_type: "display_list",
                data: Array.from(Page.all.values()),
                columnDefs: [
                    {
                        title: "Id",
                        targets: 0,
                        data: "id",
                        render: function (data, type, row, meta) {
                            return "<span style='white-space: nowrap;'>" + data + "</span>"
                        },
                    }, {
                        title: "Title",
                        targets: 1,
                        data: "title",
                        render: function (data, type, row, meta) {
                            return "<span style='white-space: nowrap;'>" + data + "</span>"
                        },
                    }, {
                        title: "Path",
                        targets: 2,
                        data: "path",
                        render: function (data, type, row, meta) {
                            return "<span style='white-space: nowrap;'>" + data + "</span>"
                        },
                    },
                ],
                rowClick: Page.edit,
            })
        }
    }
    
    const handlePageError = function (msg, title) {
        //console.log("Page.handlePageError(msg, title) - msg", msg)
        //console.log("Page.handlePageError(msg, title) - title", title)
        if (!title) {
            title = "Error"
        }
        
        toastr["error"](msg, title)
    }
    
    const sendSaveRequest = function (dataToSend, callback) {
        //console.log("Page.sendSaveRequest(dataToSend, callback) - dataToSend -", dataToSend)
        //console.log("Page.sendSaveRequest(dataToSend, callback) - callback -", callback)
        let url = "/api/v1.0/pages/save"
        
        if (dataToSend) {
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handlePageError("Oops: 1", "Save Error")
                    }
                })
            } catch (e) {
                return handlePageError("Error Validating Page", "Save Error")
            }
        } else {
            return handlePageError("Error Loading Page - Missing Data", "Save Error")
        }
    }
    
    const set = function (page) {
        //console.log("Page.set(page)", page)
        let detail = defaultDetail()
        
        if (page) {
            Page.detail.id = (!isNaN(parseInt(page.id))) ? parseInt(page.id) : null
            Page.detail.menu_id = (!isNaN(parseInt(page.menu_id))) ? parseInt(page.menu_id) : null
            Page.detail.path = (page.path) ? page.path : null
            Page.detail.title = (page.title) ? page.title : null
            Page.detail.sub_title = (page.sub_title) ? page.sub_title : null
            Page.detail.heading = (page.heading) ? page.heading : null
            Page.detail.sub_heading = (page.sub_heading) ? page.sub_heading : null
            Page.detail.description = (page.description) ? page.description : null
            Page.detail.keywords = (page.keywords && page.keywords !== "") ? page.keywords.toString().replace(/,\s/g, ",").trim().split(",") : []
            Page.detail.enabled = (page.enabled && page.enabled === 1) ? 1 : 0
            Page.detail.date_created = (page.date_created) ? page.date_created : formatDateMySQL()
            Page.detail.created_by = (page.created_by) ? page.created_by : user_id
            Page.detail.date_modified = (page.date_modified) ? page.date_modified : formatDateMySQL()
            Page.detail.modified_by = (page.modified_by) ? page.modified_by : user_id
            Page.detail.note = (page.note) ? page.note : null
            
            detail.id = Page.detail.id
            detail.menu_id = Page.detail.menu_id
            detail.path = Page.detail.path
            detail.title = Page.detail.title
            detail.sub_title = Page.detail.sub_title
            detail.heading = Page.detail.heading
            detail.sub_heading = Page.detail.sub_heading
            detail.description = Page.detail.description
            detail.keywords = Page.detail.keywords
            detail.enabled = Page.detail.enabled
            detail.date_created = Page.detail.date_created
            detail.created_by = Page.detail.created_by
            detail.date_modified = Page.detail.date_modified
            detail.modified_by = Page.detail.modified_by
            detail.note = Page.detail.note
        }
        
        return detail
    }
    
    const defaultDetail = function () {
        //console.log("Page.defaultDetail(menus)")
        Page.detail.id = null
        Page.detail.menu_id = null
        Page.detail.path = null
        Page.detail.title = null
        Page.detail.sub_title = null
        Page.detail.heading = null
        Page.detail.sub_heading = null
        Page.detail.description = null
        Page.detail.keywords = []
        Page.detail.enabled = 1
        Page.detail.date_created = formatDateMySQL()
        Page.detail.created_by = user_id
        Page.detail.date_modified = formatDateMySQL()
        Page.detail.modified_by = user_id
        Page.detail.note = null
        
        return {
            id: null,
            menu_id: null,
            path: null,
            title: null,
            sub_title: null,
            heading: null,
            sub_heading: null,
            description: null,
            keywords: [],
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            note: null,
        }
    }
    
    const buildMenuDropDown = function (menus) {
        //console.log("Page.buildMenuDropDown(menus)", menus)
        if (_modal_new_page_menu_id) {
            let selectOptions = `<option value="" disabled selected>-- Menu --</option>`
            
            $(_modal_new_page_menu_id).empty()
            
            $.each(menus, function (k, menu) {
                let id = (!isNaN(parseInt(menu.id))) ? parseInt(menu.id) : null
                let label = (menu.label) ? menu.label : null
                let subMenus = menu.sub_menus
                
                selectOptions += `<option  value="${id}">${label}</option>`
                $.each(subMenus, function (k, subMenu) {
                    let idSubMenus = (!isNaN(parseInt(subMenu.id))) ? parseInt(subMenu.id) : null
                    let labelSubMenus = (subMenu.label) ? subMenu.label : null
                    selectOptions += `<option value="${idSubMenus}">${labelSubMenus}</option>`
                })
            })
            
            $(_modal_new_page_menu_id).html(selectOptions)
        }
    }
    
    const buildPageRecord = function () {
        //console.log("Page.buildPageRecord()")
        return removeNulls({
            id: (!isNaN(parseInt(_modal_new_page_id.value))) ? parseInt(_modal_new_page_id.value) : null,
            menu_id: (!isNaN(parseInt(_modal_new_page_menu_id.value))) ? parseInt(_modal_new_page_menu_id.value) : null,
            path: (_modal_new_page_path && _modal_new_page_path.value !== "") ? _modal_new_page_path.value : null,
            title: (_modal_new_page_title && _modal_new_page_title.value !== "") ? _modal_new_page_title.value : null,
            sub_title: (_modal_new_page_sub_title && _modal_new_page_sub_title.value !== "") ? _modal_new_page_sub_title.value : null,
            heading: (_modal_new_page_heading && _modal_new_page_heading.value !== "") ? _modal_new_page_heading.value : null,
            sub_heading: (_modal_new_page_sub_heading && _modal_new_page_sub_heading.value !== "") ? _modal_new_page_sub_heading.value : null,
            description: (_modal_new_page_description && _modal_new_page_description.value !== "") ? _modal_new_page_description.value : null,
            keywords: $page_keywords.build(),
            enabled: (_modal_new_page_enabled && _modal_new_page_enabled.checked === true) ? 1 : 0,
        })
    }
    
    const validatePageForm = function () {
        //console.log("Page.validatePageForm()")
        return $(_modal_new_page_form).valid()
    }
    
    const renderPageForm = function () {
        //console.log("Page.renderPageForm()")
        if (_modal_new_page) {
            $(_modal_new_page).modal("show")
        }
    }
    
    const hidePageForm = function () {
        //console.log("Page.hidePageForm()")
        if (_modal_new_page) {
            $(_modal_new_page).modal("hide")
        }
    }
    
    const populatePageForm = function (page) {
        //console.log("Page.populatePageForm(page)", page)
        if (page) {
            let parent_menu_id, sub_menu_id
            let menu = (Page.menus.get(Page.detail.menu_id)) ? Page.menus.get(Page.detail.menu_id) : ""
            
            _modal_new_page_menu_id.value = Page.detail.menu_id
            _modal_new_page_id.value = Page.detail.id
            _modal_new_page_path.value = Page.detail.path
            _modal_new_page_title.value = Page.detail.title
            _modal_new_page_sub_title.value = Page.detail.sub_title
            _modal_new_page_heading.value = Page.detail.heading
            _modal_new_page_sub_heading.value = Page.detail.sub_heading
            _modal_new_page_description.value = Page.detail.description
            $page_keywords.set(Page.detail.keywords)
            _modal_new_page_enabled.checked = (Page.detail.enabled && Page.detail.enabled === 1)
        }
    }
    
    const clearNewProductForm = function () {
        //console.log("Page.clearNewProductForm()")
        
        _modal_new_page_id.value = ""
        _modal_new_page_menu_id.value = ""
        _modal_new_page_path.value = ""
        _modal_new_page_title.value = ""
        _modal_new_page_sub_title.value = ""
        _modal_new_page_heading.value = ""
        _modal_new_page_sub_heading.value = ""
        _modal_new_page_description.value = ""
        $page_keywords.clear()
        _modal_new_page_enabled.checked = true
    }
    
    const loadPageForm = function (page) {
        //console.log("Page.loadPageForm(page)", page)
        if (page) {
            let detail = set(page)
            
            clearNewProductForm()
            populatePageForm(detail)
            renderPageForm()
            
        }
    }
    
    const loadAll = function (pages) {
        //console.log("Page.loadAll(pages)", pages)
        Page.all = new Map()
        
        if (pages && pages.length) {
            let counter = 0
            tempDetail = null
            $.each(pages, function (k, page) {
                let detail = set(page)
                
                if (counter === 0) {tempDetail = detail}
                
                if (detail.id) {
                    Page.all.set(detail.id, detail)
                    addRow(detail)
                }
                counter++
            })
        } else {
            tempDetail = null
        }
        
        if (tempDetail !== null) {
            $table_pages_index.clearSelectedRows()
            $table_pages_index.jumpToRow(tempDetail)
        }
    }
    
    const loadAllMenus = function (menus) {
        //console.log("Page.loadAllMenus(menus)", menus)
        Page.menus = new Map()
        Page.sub_menus = new Map()
        
        if (menus && menus.length) {
            $.each(menus, function (k, menu) {
                let sub_menus = (menu.sub_menus) ? menu.sub_menus : []
                $.each(sub_menus, function (k, sub_menu) {
                    Page.menus.set(sub_menu.id, sub_menu)
                })
                Page.menus.set(menu.id, menu)
            })
        }
    }
    
    const edit = function (page) {
        //console.log("Page.edit(page)", page)
        if (page) {
            loadPageForm(page)
        }
    }
    
    const save = function () {
        //console.log("Page.save()")
        if (validatePageForm()) {
            let dataToSend = buildPageRecord()
            
            if (dataToSend) {
                confirmDialog(`Page: ${dataToSend.title} does not exist. Would you like to create it?`, (ans) => {
                    if (ans) {
                        sendSaveRequest(dataToSend, function (data) {
                            let pageDetails
                            if (data) {
                                pageDetails = data
                                if (data[0]) {
                                    pageDetails = data[0]
                                }
                                let detail = set(pageDetails)
                                
                                //console.log("    detail", detail)
                            }
                            
                        })
                    }
                })
            }
        }
    }
    
    const init = function (settings) {
        //console.log("Page.init(settings)", settings)
        if (_page_index_section) {
            buildIndexTable()
            
            if (settings) {
                if (settings.pages) {
                    loadAll(settings.pages)
                }
                
                if (settings.menus) {
                    loadAllMenus(settings.menus)
                    buildMenuDropDown(settings.menus)
                }
                
                $page_keywords = $(_modal_new_page_keywords).BuildKeyword([])
                
                initializeValidator(formRules)
                Page.validator = $(_modal_new_page_form).validate()
            }
        }
    }
    
    return {
        menus: new Map(),
        sub_menus: new Map(),
        detail: {
            id: null,
            menu_id: null,
            path: null,
            title: null,
            sub_title: null,
            heading: null,
            sub_heading: null,
            description: null,
            keywords: null,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            note: null,
        },
        all: new Map(),
        buildMenuDropDown: function () {
            buildMenuDropDown()
        },
        edit: function (page) {
            edit(page)
        },
        init: function (settings) {
            init(settings)
        },
    }
    
})()
