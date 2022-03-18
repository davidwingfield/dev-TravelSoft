const Provider = (function () {
    "use strict"
    
    const base_url = "/providers"
    const _modal_product_category_id = document.getElementById("modal_product_category_id")
    const _button_add_provider_page_heading = document.getElementById("button_add_provider_page_heading")
    const _button_edit_provider_name = document.getElementById("button_edit_provider_name")
    const _button_save_provider = document.getElementById("button_save_provider")
    const _panel_tab_contact = document.getElementById("panel_tab_contact")
    const _panel_tab_vendor = document.getElementById("panel_tab_vendor")
    const _panel_tab_address = document.getElementById("panel_tab_address")
    const _panel_tab_provider = document.getElementById("panel_tab_provider")
    const _table_provider_index = document.getElementById("table_provider_index")
    const _location_id = document.getElementById("location_id")
    const _company_name = document.getElementById("company_name")
    const _provider_id = document.getElementById("provider_id")
    const _provider_name = document.getElementById("provider_name")
    const _provider_company_id = document.getElementById("provider_company_id")
    const _provider_enabled = document.getElementById("provider_enabled")
    const _provider_code_direct_id = document.getElementById("provider_code_direct_id")
    const _vendor_name = document.getElementById("vendor_name")
    const _vendor_company_id = document.getElementById("vendor_company_id")
    const _company_id = document.getElementById("company_id")
    const _location_name_filter_id = document.getElementById("location_name_filter_id")
    const _form_edit_provider = document.getElementById("form_edit_provider")
    const _form_product_add = document.getElementById("form_product_add")
    const _modal_product_provider_name = document.getElementById("modal_product_provider_name")
    const _modal_product_provider_id = document.getElementById("modal_product_provider_id")
    const _modal_product_vendor_id = document.getElementById("modal_product_vendor_id")
    const _modal_product_vendor_name = document.getElementById("modal_product_vendor_name")
    const _modal_product_vendor_company_id = document.getElementById("modal_product_vendor_company_id")
    const _modal_product_provider_company_id = document.getElementById("modal_product_provider_company_id")
    const _modal_product_provider_vendor_match = document.getElementById("modal_product_provider_vendor_match")
    const _modal_product_provider_location_id = document.getElementById("modal_product_provider_location_id")
    const _modal_product_location_id = document.getElementById("modal_product_location_id")
    const _product_edit_details_section_provider_form = document.getElementById("product_edit_details_section_provider_form")
    const _product_edit_details_section_provider_form_filter = document.getElementById("product_edit_details_section_provider_form_filter")
    const _product_edit_details_section_provider_form_provider_id = document.getElementById("product_edit_details_section_provider_form_provider_id")
    const _product_edit_details_section_provider_form_submit_button = document.getElementById("product_edit_details_section_provider_form_submit_button")
    const _product_edit_details_section_provider_form_provider_company_id = document.getElementById("product_edit_details_section_provider_form_provider_company_id")
    const _product_edit_details_section_provider_form_details = document.getElementById("product_edit_details_section_provider_form_details")
    const _product_edit_details_section_provider_form_provider_name = document.getElementById("product_edit_details_section_provider_form_provider_name")
    const _product_edit_details_section_provider_form_provider_phone_1 = document.getElementById("product_edit_details_section_provider_form_provider_phone_1")
    const _product_edit_details_section_provider_form_provider_phone_2 = document.getElementById("product_edit_details_section_provider_form_provider_phone_2")
    const _product_edit_details_section_provider_form_provider_fax = document.getElementById("product_edit_details_section_provider_form_provider_fax")
    const _product_edit_details_section_provider_form_provider_website = document.getElementById("product_edit_details_section_provider_form_provider_website")
    const _product_edit_details_section_provider_form_provider_email = document.getElementById("product_edit_details_section_provider_form_provider_email")
    const _product_edit_details_section_provider_form_provider_cover_image = document.getElementById("product_edit_details_section_provider_form_provider_cover_image")
    const _product_edit_details_section_provider_form_provider_enabled = document.getElementById("product_edit_details_section_provider_form_provider_enabled")
    const _product_edit_details_section_provider_form_provider_note = document.getElementById("product_edit_details_section_provider_form_provider_note")
    const _product_edit_details_section_provider_form_provider_keywords = document.getElementById("product_edit_details_section_provider_form_provider_keywords")
    const _product_edit_details_section_provider_form_provider_description_long = document.getElementById("product_edit_details_section_provider_form_provider_description_long")
    const _product_edit_details_section_provider_form_provider_description_short = document.getElementById("product_edit_details_section_provider_form_provider_description_short")
    const _product_edit_details_section_provider_form_provider_logo = document.getElementById("product_edit_details_section_provider_form_provider_logo")
    const _product_edit_details_section_provider_form_cancel_button = document.getElementById("product_edit_details_section_provider_form_cancel_button")
    const _provider_keywords = document.getElementById("provider_keywords")
    const _product_edit_details_section_provider_form_reset_button = document.getElementById("product_edit_details_section_provider_form_reset_button")
    const _product_edit_provider_panel_link_product = document.getElementById("product_edit_provider_panel_link_product")
    const _display_provider_name = document.getElementById("display_provider_name")
    const _display_provider_code_direct = document.getElementById("display_provider_code_direct")
    const _product_edit_details_section_provider_form_edit_button = document.getElementById("product_edit_details_section_provider_form_edit_button")
    
    let $provider_keywords, tempProvider, validator
    let globalSelectedProvider, isNew = false
    let $index_table = $(_table_provider_index)
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let formRules = {
        rules: {
            provider_name: {
                required: true,
            },
            provider_company_id: {
                required: true,
            },
        },
        messages: {
            provider_company_id: {
                required: "Field Required",
            },
            provider_name: {
                required: "Field Required",
            },
        },
    }
    
    $(_product_edit_details_section_provider_form_edit_button)
        .on("click", function () {
            //console.log("Provider.product_edit_details_section_provider_form_reset_button:click()")
            openProductEditProviderForm()
        })
    
    $(_product_edit_details_section_provider_form_reset_button)
        .on("click", function () {
            //console.log("Provider.product_edit_details_section_provider_form_reset_button:click()")
            let detail = set()
            
            resetProductEditProviderForm(detail)
        })
    
    $(_product_edit_details_section_provider_form_submit_button)
        .on("click", function () {
            //console.log("Provider.product_edit_details_section_provider_form_submit_button:click()")
            
        })
    
    $(_product_edit_provider_panel_link_product)
        .on("click", function () {
            //console.log("Provider.product_edit_provider_panel_link_product:click()")
            openProductEditProviderForm()
        })
    $(_product_edit_details_section_provider_form_cancel_button)
        .on("click", function () {
            //console.log("Provider.product_edit_details_section_provider_form_cancel_button:click()")
            populateProductEditProviderForm(tempProvider)
            closeProductEditProviderForm()
        })
    
    $(_button_save_provider)
        .on("click", function () {
            let tabs = $("#provider_edit_tabs > li.nav-item > a.nav-link")
            let panels = $("div.tab-pane")
            let company_detail = Company.build()
            let provider_detail = Provider.build()
            let location_detail = Location.build()
            let vendor_detail = Vendor.build()
            let addresses = Array.from(Address.all.values())
            let contacts = Array.from(Contact.all.values())
            
            if (!company_detail || !provider_detail || !location_detail || !vendor_detail || !addresses || !contacts) {
                $.each(panels, function (index, item) {
                    if ($(this).find(".is-invalid").length > 0) {
                        let nav_tab = $("body").find("[aria-controls='" + $(this).attr("id") + "']")
                        tabs.removeClass("active")
                        panels.removeClass("active")
                        $(this).addClass("active")
                        nav_tab.addClass("active")
                        return false
                    }
                })
                return
            }
            
            provider_detail.location_id = (location_detail.id) ? location_detail.id : null
            vendor_detail.is_provider = (_form_edit_provider) ? 1 : 0
            
            // ----
            
            confirmDialog(`Would you like to update?`, (ans) => {
                if (ans) {
                    save({
                        "company_detail": company_detail,
                        "provider_detail": provider_detail,
                        "location_detail": location_detail,
                        "vendor_detail": vendor_detail,
                        "addresses": addresses,
                        "contacts": contacts,
                    })
                }
                
            })
        })
    
    $("#provider_edit")
        .on("change", function () {
            setProgress()
        })
    
    $(_provider_company_id)
        .on("change", function () {
            $(_vendor_company_id).val($(this).val())
        })
    
    $(_button_add_provider_page_heading)
        .on("click", function () {
            //console.log("test")
        })
    
    $(_button_edit_provider_name)
        .on("click", function () {
            enable_form_fields()
        })
    
    $(_company_id)
        .on("change", function () {
            $(_provider_company_id).val(_company_id.value)
        })
    
    const getImages = function (dataToSend, callback) {
        //console.log("Provider.getImages(dataToSend)", dataToSend)
        if (dataToSend) {
            if (dataToSend.type && dataToSend.id) {
                let id = (!isNaN(parseInt(dataToSend.id))) ? parseInt(dataToSend.id) : null
                let type = (dataToSend.type) ? dataToSend.type : null
                if (type && id) {
                    let url = `/api/v1.0/images/src/company/${id}`
                    try {
                        sendGetRequest(url, dataToSend, function (data, status, xhr) {
                            if (data) {
                                return callback(data)
                            } else {
                                return handleProviderError("Error", "Product", "error")
                            }
                        })
                    } catch (e) {
                        //console.log("error", e)
                        return handleProviderError("Error", "Provider", "error")
                    }
                }
            }
        }
    }
    
    const regex = /[^A-Za-z0-9]/g
    
    const renderImageDropDown = function (images) {
        //console.log("Provider.renderImageDropDown(images)", images)
        let initValue = "/public/img/placeholder.jpg".replace(regex, "")
        let options = `<option value="${initValue}" readonly selected>-- Images --</options>`
        
        if (!images) {
            images = []
        }
        
        $.each(images, function (k, image) {
            //console.log("|__ image", image)
            let value = `${image.path}/${image.name}.${image.extension}`
            let newStr = value.replace(regex, "")
            let name = image.name
            //console.log("|__ value", value)
            options += `<option value="${newStr}">${name}</options>`
        })
        
        if (_product_edit_details_section_provider_form_provider_logo) {
            $(_product_edit_details_section_provider_form_provider_logo).empty().html(options)
        }
        if (_product_edit_details_section_provider_form_provider_cover_image) {
            $(_product_edit_details_section_provider_form_provider_cover_image).empty().html(options)
        }
        
    }
    
    const buildImageDropdown = function (id) {
        //console.log("Provider.buildImageDropdown(id)", id)
        
        if (id) {
            if (_product_edit_details_section_provider_form_provider_cover_image) {
                let dataToSend = {
                    type: "company",
                    id: id,
                }
                
                getImages(dataToSend, function (data) {
                    if (data) {
                        renderImageDropDown(data)
                    }
                })
                
            }
        }
    }
    
    const populateProductEditProviderForm = function (provider) {
        //console.log("Provider.populateProductEditProviderForm(provider)", provider)
        let detail = set(provider)
        let keywords = (detail.keywords) ? detail.keywords : []
        let coverImage = (detail.company.cover_image) ? detail.company.cover_image : "/public/img/placeholder.jpg"
        let logoImage = (detail.company.logo) ? detail.company.logo : "/public/img/placeholder.jpg"
        let companyName = (detail.company.name) ? detail.company.name : null
        let codeDirectId = (provider.code_direct_id) ? provider.code_direct_id : null
        
        logoImage = logoImage.replace(regex, "")
        coverImage = coverImage.replace(regex, "")
        
        //console.log("|__ coverImage", coverImage)
        //console.log("|__ logoImage", logoImage)
        //console.log("|__ Provider.detail", Provider.detail)
        
        _product_edit_details_section_provider_form_filter.value = (provider.company.name) ? provider.company.name : null
        _product_edit_details_section_provider_form_provider_id.value = (provider.id) ? provider.id : null
        _product_edit_details_section_provider_form_provider_company_id.value = (provider.company_id) ? provider.company_id : null
        _product_edit_details_section_provider_form_provider_name.value = (provider.company.name) ? provider.company.name : null
        _product_edit_details_section_provider_form_provider_phone_1.value = (provider.company.phone_1) ? provider.company.phone_1 : null
        _product_edit_details_section_provider_form_provider_phone_2.value = (provider.company.phone_2) ? provider.company.phone_2 : null
        _product_edit_details_section_provider_form_provider_fax.value = (provider.company.fax) ? provider.company.fax : null
        _product_edit_details_section_provider_form_provider_website.value = (provider.company.website) ? provider.company.website : null
        _product_edit_details_section_provider_form_provider_email.value = (provider.company.email) ? provider.company.email : null
        _product_edit_details_section_provider_form_provider_description_long.value = (provider.description_long) ? provider.description_long : null
        _product_edit_details_section_provider_form_provider_description_short.value = (provider.description_short) ? provider.description_short : null
        _product_edit_details_section_provider_form_provider_enabled.checked = (provider.enabled && provider.enabled === 1)
        
        _product_edit_details_section_provider_form_provider_cover_image.value = coverImage.toString()
        _product_edit_details_section_provider_form_provider_logo.value = logoImage.toString()
        
        $provider_keywords = $(_provider_keywords).BuildKeyword(keywords)
        
        _display_provider_name.innerText = companyName
        _display_provider_code_direct.innerText = codeDirectId
        
        Product.attr2 = codeDirectId
        
    }
    
    const enableProductEditProviderForm = function () {
        $(_product_edit_details_section_provider_form_edit_button).addClass("d-none")
        
        $(_product_edit_details_section_provider_form_reset_button).removeClass("d-none")
        $(_product_edit_details_section_provider_form_submit_button).removeClass("d-none")
        $(_product_edit_details_section_provider_form_cancel_button).removeClass("d-none")
        
    }
    
    const disableProductEditProviderForm = function () {
        $(_product_edit_details_section_provider_form_edit_button).addClass("d-none")
        
        $(_product_edit_details_section_provider_form_reset_button).addClass("d-none")
        $(_product_edit_details_section_provider_form_submit_button).addClass("d-none")
        $(_product_edit_details_section_provider_form_cancel_button).addClass("d-none")
    }
    
    const resetProductEditProviderForm = function () {
        //console.log("Provider.resetProductEditProviderForm()")
        _product_edit_details_section_provider_form_filter.value = ""
        _product_edit_details_section_provider_form_provider_id.value = ""
        _product_edit_details_section_provider_form_provider_company_id.value = ""
        _product_edit_details_section_provider_form_provider_name.value = ""
        _product_edit_details_section_provider_form_provider_phone_1.value = ""
        _product_edit_details_section_provider_form_provider_phone_2.value = ""
        _product_edit_details_section_provider_form_provider_fax.value = ""
        _product_edit_details_section_provider_form_provider_website.value = ""
        _product_edit_details_section_provider_form_provider_email.value = ""
        _product_edit_details_section_provider_form_provider_description_long.value = ""
        _product_edit_details_section_provider_form_provider_description_short.value = ""
        _product_edit_details_section_provider_form_provider_enabled.checked = true
        _product_edit_details_section_provider_form_provider_cover_image.value = "/public/img/placeholder.jpg"
    }
    
    const openProductEditProviderForm = function () {
        //console.log("Provider.openProductEditProviderForm()")
        $(_product_edit_details_section_provider_form_details).show()
        enableProductEditProviderForm()
    }
    
    const closeProductEditProviderForm = function () {
        //console.log("Provider.closeProductEditProviderForm()")
        $(_product_edit_details_section_provider_form_details).hide()
        disableProductEditProviderForm()
    }
    
    const index = function (settings) {
        build_index_table()
        
        if (settings) {
            if (settings.providers) {
                loadAll(settings.providers)
            }
        }
        
    }
    
    const build_index_table = function () {
        $index_table = $(_table_provider_index).table({
            table_type: "display_list",
            data: Provider.all,
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
                    title: "Code Direct ID",
                    targets: 1,
                    data: "code_direct_id",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data + "</span>"
                    },
                },
                {
                    title: "SKU",
                    targets: 2,
                    data: "vendor",
                    render: function (data, type, row, meta) {
                        return "<span style='white-space: nowrap;'>" + data.sku + "</span>"
                    },
                },
                {
                    title: "Location",
                    targets: 3,
                    data: "location",
                    render: function (data, type, row, meta) {
                        let displayLocation = ""
                        if (defaultLocationDisplayFormat === "short") {
                            displayLocation = data.display_short
                        } else if (defaultLocationDisplayFormat === "long") {
                            displayLocation = data.display_long
                        } else {
                            displayLocation = data.display_medium
                        }
                        
                        return "<span style='white-space: nowrap;'>" + displayLocation + "</span>"
                    },
                },
            ],
            rowClick: Provider.navigate,
        })
    }
    
    const navigate = function (provider) {
        if (provider && provider.id) {
            window.location.replace(base_url + "/" + provider.id)
        }
    }
    
    const updateProvider = function (dataToSend, callback) {
        let url = "/api/v1.0/providers/update"
        
        if (dataToSend) {
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        handleProviderError("Oops: 1", "Provider", "error")
                    }
                })
            } catch (e) {
                //console.log("error", e)
            }
        }
    }
    
    const _default_detail = function () {
        return {
            addresses: [],
            contacts: [],
            location: {},
            company: {},
            vendor: {},
            id: null,
            description_long: null,
            description_short: null,
            keywords: null,
            company_id: null,
            name: null,
            code_direct_id: null,
            provider_vendor: 1,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            note: null,
        }
    }
    
    const loadAll = function (providers) {
        Provider.all = new Map()
        if (providers) {
            $.each(providers, function (i, provider) {
                let detail = set(provider)
                $index_table.insertRow(detail)
                Provider.all.set(detail.id, detail)
            })
        }
    }
    
    const save = function (provider) {
        if (provider) {
            updateProvider(provider, function (data) {
                if (data) {
                    if (data[0]) {
                        let details = data[0]
                        if (details.id) {
                            if (_provider_id.value === "" || isNaN(parseInt(_provider_id.value))) {
                                window.location.replace(base_url + "/" + details.id)
                            } else {
                                let name = _company_name.value
                                toastr.success(`Provider ${name} has been updated.`)
                            }
                        } else {
                            //console.log("details 1", details)
                        }
                    } else {
                        //console.log("details 2", data)
                    }
                } else {
                    //console.log("details 3", provider)
                }
            })
        }
    }
    
    const add = function (provider) {
        //console.log("Provider.add(provider)", provider)
        // ----
        
        if (provider) {
            //console.log("|__ provider", provider)
            
            let dataToSend = {
                name: _modal_product_provider_name.value,
                status_id: 1,
                show_online: 1,
                show_sales: 1,
                show_ops: 1,
                is_provider: 1,
                enabled: 1,
            }
            
            Vendor.newVendor(dataToSend, function (data) {
                //console.log("|__ |__ newVendor", data)
                // ----
                
                let vendor_detail, provider_detail = {}
                let categoryId = (_modal_product_category_id && !isNaN(parseInt(_modal_product_category_id.value))) ? parseInt(_modal_product_category_id.value) : null
                
                if (data) {
                    vendor_detail = data
                    if (data[0]) {
                        vendor_detail = data[0]
                    }
                    provider.location_id = (provider.location_id) ? provider.location_id : 1
                    provider.vendor_id = vendor_detail.id
                    
                    provider_detail = {
                        provider_detail: provider,
                    }
                    
                    //console.log("|__ provider_detail", provider_detail)
                    
                    updateProvider(provider_detail, function (data) {
                        //console.log("|__ |__ updateProvider", data)
                        // ----
                        
                        if (data) {
                            
                            let provider = (data.length > 0) ? data[0] : data
                            
                            if (provider) {
                                let detail = set(provider)
                                let vendor = (detail.vendor) ? detail.vendor : {}
                                let company = (detail.company) ? detail.company : {}
                                let category = Types.category.get(categoryId)
                                
                                let attributeId = (category && category.attribute_id) ? category.attribute_id : null
                                
                                //*
                                //console.log("|__ |__ provider", provider)
                                //console.log("|__ |__ category", category)
                                //console.log("|__ |__ vendor", vendor)
                                //console.log("|__ |__ company", company)
                                //console.log("|__ |__ detail", detail)
                                
                                //console.log("|__ |__ attributeId", attributeId)
                                //*/
                                
                                let companyName = (company && company.name) ? company.name : null
                                let codeDirectId = (detail && detail.code_direct_id) ? detail.code_direct_id : null
                                let sku = (vendor && vendor.sku) ? vendor.sku : null
                                let companyId = (company && company.id && !isNaN(parseInt(company.id))) ? parseInt(company.id) : null
                                let providerId = (provider && provider.id && !isNaN(parseInt(provider.id))) ? parseInt(provider.id) : null
                                let vendorId = (vendor && vendor.id && !isNaN(parseInt(vendor.id))) ? parseInt(vendor.id) : null
                                
                                _modal_product_provider_name.value = companyName
                                _modal_product_provider_id.value = providerId
                                _modal_product_provider_company_id.value = companyId
                                _modal_product_vendor_name.value = companyName
                                _modal_product_vendor_id.value = vendorId
                                _modal_product_vendor_company_id.value = companyId
                                
                                initAutoComplete()
                                
                                Product.attr1 = attributeId
                                Product.attr2 = codeDirectId
                                Product.attr3 = sku
                                
                                Product.updateProductSKU()
                                Product.enableNewFormDetails()
                            }
                            
                        }
                    })
                    
                }
                
            })
            
        }
    }
    
    const set = function (provider) {
        let detail = _default_detail()
        
        if (provider) {
            detail.id = (provider.id) ? provider.id : null
            detail.name = (provider.name) ? provider.name : null
            detail.location_id = (provider.location_id) ? provider.location_id : null
            detail.code_direct_id = (provider.code_direct_id) ? provider.code_direct_id : null
            detail.description_long = (provider.description_long) ? provider.description_long : null
            detail.description_short = (provider.description_short) ? provider.description_short : null
            detail.keywords = (provider.keywords) ? provider.keywords : null
            detail.provider_vendor = (provider.provider_vendor) ? provider.provider_vendor : 1
            detail.enabled = (provider.enabled) ? provider.enabled : 1
            detail.date_created = (provider.date_created) ? provider.date_created : formatDateMySQL()
            detail.company_id = (provider.company_id) ? provider.company_id : null
            detail.created_by = (provider.created_by) ? provider.created_by : user_id
            detail.date_modified = (provider.date_modified) ? provider.date_modified : formatDateMySQL()
            detail.modified_by = (provider.modified_by) ? provider.modified_by : user_id
            detail.note = (provider.note) ? provider.note : null
            detail.vendor = (provider.vendor) ? provider.vendor : {}
            detail.addresses = (provider.addresses) ? provider.addresses : []
            detail.contacts = (provider.contacts) ? provider.contacts : []
            detail.location = (provider.location) ? provider.location : {}
            detail.company = (provider.company) ? provider.company : {}
        }
        
        Provider.detail = detail
        return detail
    }
    
    const build = function () {
        return remove_nulls({
            location_id: (!isNaN(parseInt(_location_id.value))) ? parseInt(_location_id.value) : null,
            company_id: (!isNaN(parseInt(_provider_company_id.value))) ? parseInt(_provider_company_id.value) : null,
            code_direct_id: (_provider_code_direct_id.value === "") ? null : _provider_code_direct_id.value,
            id: (!isNaN(parseInt(_provider_id.value))) ? parseInt(_provider_id.value) : null,
            provider_vendor: (_form_edit_provider) ? 1 : 0,
            enabled: 1,
        })
    }
    
    const edit = function (settings) {
        let provider = {}
        let addresses = []
        let contacts = []
        let location = {}
        let company = {}
        let vendor = {}
        //
        if (_form_edit_provider) {
            initAutoComplete()
            validator_init(formRules)
            validator = $(_form_edit_provider).validate()
        }
        
        if (settings) {
            
            if (settings.is_new) {
                isNew = settings.is_new
                _button_save_provider.disabled = true
                $(_panel_tab_provider).addClass("disabled")
                $(_panel_tab_vendor).addClass("disabled")
                $(_panel_tab_address).addClass("disabled")
            }
            
            if (settings.provider_detail) {
                provider = set(settings.provider_detail)
                addresses = (provider.addresses) ? provider.addresses : []
                contacts = (provider.contacts) ? provider.contacts : []
                location = (provider.location) ? provider.location : {}
                company = (provider.company) ? provider.company : {}
                vendor = (provider.vendor) ? provider.vendor : {}
            }
            
        }
        
        populate_form(provider)
        // ----
        Vendor.init(vendor)
        Location.init(location)
        Address.init(addresses)
        Contact.init(contacts)
        Company.init(company)
        // ----
        Vendor.setProvider()
        disable_form_fields()
        setProgress()
    }
    
    const validate_form = function () {
        return $(_form_edit_provider).valid()
    }
    
    const enable_form_fields = function () {
        if (_provider_id.value !== "" && _provider_company_id.value !== "") {
        
        }
    }
    
    const disable_form_fields = function () {
        $(_provider_name).attr("readonly", true)
        
        if (_form_edit_provider) {
            if (isNew) {
                //$(_provider_name).attr("readonly", false)
                //_company_cover_image.disabled = true
                //_button_edit_provider_name.disabled = true
                //$(_panel_tab_contact).addClass("disabled")
                //$(_panel_tab_address).addClass("disabled")
            } else {
                $(_company_name).attr("readonly", true)
            }
        }
        
    }
    
    const populate_form = function (provider) {
        if (provider) {
            _provider_id.value = (provider.id) ? provider.id : null
            $(_provider_name).val((provider.name) ? provider.name : null)
            $(_company_name).val($(_provider_name).val())
            _provider_company_id.value = (provider.company_id) ? provider.company_id : null
            _provider_code_direct_id.value = (provider.code_direct_id) ? provider.code_direct_id : null
            _provider_enabled.checked = (provider.enabled) ? (provider.enabled === 1) : true
        }
        
    }
    
    const resetForm = function () {
        _provider_id.value = ""
        $(_provider_name).val("").trigger("change")
        _provider_company_id.value = ""
        _provider_code_direct_id.value = ""
        _provider_enabled.checked = true
    }
    
    const setProgress = function () {
        //console.log("Provider.setProgress()")
        // ----
        
        let providerId = (!isNaN(_provider_id.value)) ? _provider_id.value : null
        let companyId = (!isNaN(_provider_company_id.value)) ? _provider_company_id.value : null
        
        if (companyId === null || companyId === "") {
            $(_panel_tab_contact).addClass("disabled")
            $(_panel_tab_address).addClass("disabled")
            $(_panel_tab_provider).addClass("disabled")
            $(_panel_tab_vendor).addClass("disabled")
        } else {
            $(_panel_tab_contact).removeClass("disabled")
            $(_panel_tab_address).removeClass("disabled")
            $(_panel_tab_provider).removeClass("disabled")
            $(_panel_tab_vendor).removeClass("disabled")
        }
        
        _button_save_provider.disabled = !(_company_id.value !== "" && _location_name_filter_id.value !== "")
        
    }
    
    //
    
    const handleProviderError = function (msg, title, level) {
        //console.log("Provider.handleProviderError(msg)", msg)
        // ----
        
        if (!title) {
            title = "Product"
        }
        
        if (!level) {
            level = "error"
        }
        
        toastr[level](`${msg}`, title)
    }
    
    const fetchProviderByName = function (dataToSend, callback) {
        //console.log("Provider.fetchProviderByName(dataToSend)", dataToSend)
        // ----
        
        let url = "/api/v1.0/providers/validate"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        handleProviderError("Oops: 1")
                    }
                })
            } catch (e) {
                //console.log("error", e)
                handleProviderError("Error Validating Company")
            }
        } else {
            handleProviderError("Error Loading Company- Missing Data")
        }
    }
    
    const providerExists = function (name) {
        //console.log("Provider.providerExists(name)", name)
        // ----
        
        if (name && name !== "") {
            let dataToSend = {
                name: name,
            }
            
            fetchProviderByName(dataToSend, function (data) {
                let provider
                
                if (!data || data.length === 0) {
                    
                    confirmDialog("This provider does not exist. Would you like to create it?", (ans) => {
                        if (ans) {
                            let companyName = (dataToSend && dataToSend.name) ? dataToSend.name : null
                            
                            if (companyName) {
                                //console.log("|__ companyName", companyName)
                                
                                let companyParams = {
                                    name: companyName,
                                    status_id: 10,
                                    enabled: 1,
                                }
                                
                                //console.log("|__ companyParams", companyParams)
                                
                                Company.add(companyParams, function (data) {
                                    //console.log("|__ |__ data", data)
                                    let company
                                    
                                    if (data) {
                                        company = (data[0]) ? data[0] : data
                                        
                                        let companyId = (company && !isNaN(parseInt(company.id))) ? parseInt(company.id) : null
                                        let companyName = (company && company.name) ? company.name : null
                                        
                                        if (companyId !== null && companyName !== null) {
                                            _modal_product_provider_company_id.value = companyId
                                            _modal_product_vendor_company_id.value = companyId
                                            _modal_product_provider_name.value = companyName
                                            _modal_product_vendor_name.value = companyName
                                            _modal_product_provider_vendor_match.checked = true
                                            
                                            add(remove_nulls({
                                                location_id: null,
                                                company_id: companyId,
                                                code_direct_id: null,
                                                id: null,
                                                provider_vendor: 1,
                                                enabled: 1,
                                            }))
                                            
                                        } else {
                                            return handleProviderError("No Data", "Error", "error")
                                        }
                                        
                                    } else {
                                        return handleProviderError("No Data", "Error", "error")
                                    }
                                    
                                })
                            }
                            
                            /*
                            Company.addProvider({
                                name: _modal_product_provider_name.value,
                                status_id: 10,
                                enabled: 1,
                            }, function (data) {
                                if (data) {
                                    if (data[0]) {
                                        let company = data[0]
                                        _modal_product_provider_company_id.value = company.id
                                        _modal_product_vendor_company_id.value = company.id
                                        _modal_product_provider_name.value = company.name
                                        _modal_product_vendor_name.value = company.name
                                        _modal_product_provider_vendor_match.checked = true
                                        
                                        add(remove_nulls({
                                            location_id: null,
                                            company_id: company.id,
                                            code_direct_id: null,
                                            id: null,
                                            provider_vendor: 1,
                                            enabled: 1,
                                        }))
                                    }
                                }
                            })
                            //*/
                        } else {
                            _modal_product_vendor_id.value = ""
                            _modal_product_provider_id.value = ""
                            _modal_product_vendor_name.value = ""
                            _modal_product_provider_name.value = ""
                            globalSelectedProvider = false
                        }
                    })
                    
                } else {
                    provider = (data[0]) ? data[0] : data
                    //console.log("|__ provider", provider)
                    
                    if (_form_product_add) {
                        setNewProductModalFields(provider)
                    }
                    
                    /*
            if (_form_product_add) {
                
                if (!data || data.length === 0) {
                    
                    confirmDialog("This provider does not exist. Would you like to create it?", (ans) => {
                        if (ans) {
                        
                            Company.addProvider({
                                name: _modal_product_provider_name.value,
                                status_id: 10,
                                enabled: 1,
                            }, function (data) {
                                if (data) {
                                    if (data[0]) {
                                        let company = data[0]
                                        _modal_product_provider_company_id.value = company.id
                                        _modal_product_vendor_company_id.value = company.id
                                        _modal_product_provider_name.value = company.name
                                        _modal_product_vendor_name.value = company.name
                                        _modal_product_provider_vendor_match.checked = true
                                        
                                        add(remove_nulls({
                                            location_id: null,
                                            company_id: company.id,
                                            code_direct_id: null,
                                            id: null,
                                            provider_vendor: 1,
                                            enabled: 1,
                                        }))
                                    }
                                }
                            })
                        
                        } else {
                            _modal_product_vendor_id.value = ""
                            _modal_product_provider_id.value = ""
                            _modal_product_vendor_name.value = ""
                            _modal_product_provider_name.value = ""
                            globalSelectedProvider = false
                        }
                    })
                } else {
                    if (data) {
                        provider = data
                        if (data.length > 0) {
                            provider = data[0]
                        }
                    }
                    
                    let vendor = provider.vendor
                    let code_direct = (provider.code_direct_id) ? provider.code_direct_id : null
                    let sku = (vendor.sku) ? vendor.sku : null
                    
                    _modal_product_vendor_id.value = parseInt(vendor.id)
                    _modal_product_provider_id.value = provider.id
                    _modal_product_vendor_name.value = provider.name
                    _modal_product_vendor_company_id.value = (!isNaN(parseInt(provider.company_id))) ? parseInt(provider.company_id) : null
                    _modal_product_provider_company_id.value = (!isNaN(parseInt(provider.company_id))) ? parseInt(provider.company_id) : null
                    _modal_product_provider_vendor_match.checked = true
                    _modal_product_vendor_name.disabled = false
                    _modal_product_provider_location_id.value = (!isNaN(parseInt(provider.location.id))) ? parseInt(provider.location.id) : null
                    _modal_product_location_id.value = (!isNaN(parseInt(provider.location.id))) ? parseInt(provider.location.id) : null
                    
                    Product.attr2 = code_direct
                    Product.attr3 = sku
                    Product.updateProductSKU()
                }
            }
            //*/
                
                }
                
                if (_form_edit_provider) {
                    if (data) {
                        if (data.length > 0) {
                            
                            provider = data[0]
                            
                            if (_form_product_add) {
                            
                            }
                            
                            confirmDialog("This provider exists. Would you like to edit it?", (ans) => {
                                if (ans) {
                                    window.location.href = "/providers/" + provider.id
                                } else {
                                    Company.reset_form()
                                    Provider.resetForm()
                                    Vendor.reset_form()
                                }
                            })
                            
                        }
                    }
                    //console.log("provider", provider)
                    $(_vendor_name).val($(_provider_name).val()).trigger("change")
                }
                
            })
            
        }
        
    }
    
    const initAutoComplete = function () {
        //console.log("Provider.initAutocomplete()")
        // ----
        
        if (_provider_name) {
            $(_provider_name)
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
                                providerExists(provider_name)
                            }
                        }
                    }, 200)
                    //*/
                })
                .on("search", function () {
                    //_provider_id.value = ""
                    //_provider_company_id.value = ""
                    
                    //$(_vendor_name).val("").trigger("change")
                    //$(_provider_company_id).val("").trigger("change")
                    Provider.resetForm()
                    Vendor.reset_form()
                })
                .on("click", function () {
                    if ($(this).attr("readonly") === "readonly") {
                        e.preventDefault()
                    } else {
                        $(this).select()
                    }
                })
                .autocomplete({
                    serviceUrl: "/api/v1.0/autocomplete/providers",
                    minChars: 2,
                    cache: false,
                    dataType: "json",
                    triggerSelectOnValidInput: false,
                    paramName: "st",
                    onSelect: function (suggestion) {
                        if (!suggestion.data) {
                            return
                        }
                        let provider = suggestion.data
                        let company = (provider.company) ? provider.company : {}
                        let addresses = (provider.addresses) ? provider.addresses : {}
                        let contacts = (provider.contacts) ? provider.contacts : {}
                        let location = (provider.location) ? provider.location : {}
                        let vendor = (provider.vendor) ? provider.vendor : {}
                        let provider_id = provider.id
                        let company_name = provider.company.name
                        let provider_company_id = provider.company.id
                        
                        if (_form_edit_provider) {
                            $(_provider_company_id).val(provider_company_id)
                            $(_provider_id).val(provider_id)
                            confirmDialog("This provider exists. Would you like to edit it?", (ans) => {
                                if (ans) {
                                    window.location.replace("/providers/" + provider_id)
                                    populate_form(provider)
                                    Company.populate_form(company)
                                    Location.populate_form(location)
                                    $(_vendor_company_id).val(provider_company_id)
                                    $(_vendor_name).val(company_name).trigger("change")
                                } else {
                                    Provider.resetForm()
                                    Vendor.reset_form()
                                }
                            })
                        }
                    },
                })
        }
        if (_product_edit_details_section_provider_form_filter) {
            $(_product_edit_details_section_provider_form_filter)
                .on("change", function () {
                    //*
                    setTimeout(function () {
                        let provider_name = _product_edit_details_section_provider_form_filter.value
                        
                        if (globalSelectedProvider === false) {
                            if (provider_name === "") {
                                _product_edit_details_section_provider_form_filter.value = ""
                                _product_edit_details_section_provider_form_provider_company_id.value = ""
                                _product_edit_details_section_provider_form_provider_id.value = ""
                                globalSelectedProvider = false
                                //$(_vendor_name).val("").trigger("change")
                                $(_product_edit_details_section_provider_form_provider_company_id).val("").trigger("change")
                                $(_product_edit_details_section_provider_form_provider_id).val("").trigger("change")
                            } else {
                                providerExists(provider_name)
                            }
                        }
                    }, 200)
                    //*/
                })
                .on("search", function () {
                    //_provider_id.value = ""
                    //_provider_company_id.value = ""
                    
                    //$(_vendor_name).val("").trigger("change")
                    //$(_provider_company_id).val("").trigger("change")
                    //Provider.resetForm()
                    //Vendor.reset_form()
                })
                .on("click", function () {
                    if ($(this).attr("readonly") === "readonly") {
                        e.preventDefault()
                    } else {
                        $(this).select()
                    }
                })
                .autocomplete({
                    serviceUrl: "/api/v1.0/autocomplete/providers",
                    minChars: 2,
                    cache: false,
                    dataType: "json",
                    triggerSelectOnValidInput: false,
                    paramName: "st",
                    onSelect: function (suggestion) {
                        if (!suggestion.data) {
                            return
                        }
                        let provider = suggestion.data
                        tempProvider = provider
                        //console.log("provider", provider)
                        
                        let company = (provider.company) ? provider.company : {}
                        let addresses = (provider.addresses) ? provider.addresses : {}
                        let contacts = (provider.contacts) ? provider.contacts : {}
                        let location = (provider.location) ? provider.location : {}
                        let vendor = (provider.vendor) ? provider.vendor : {}
                        let provider_id = provider.id
                        let company_name = provider.company.name
                        let provider_company_id = provider.company.id
                        
                        populateProductEditProviderForm(provider)
                        /*
                        if (_form_edit_provider) {
                            $(_provider_company_id).val(provider_company_id)
                            $(_provider_id).val(provider_id)
                            confirmDialog("This provider exists. Would you like to edit it?", (ans) => {
                                if (ans) {
                                    window.location.replace("/providers/" + provider_id)
                                    populate_form(provider)
                                    Company.populate_form(company)
                                    Location.populate_form(location)
                                    $(_vendor_company_id).val(provider_company_id)
                                    $(_vendor_name).val(company_name).trigger("change")
                                } else {
                                    Provider.resetForm()
                                    Vendor.reset_form()
                                }
                            })
                        }
                        //*/
                    },
                })
        }
        
        if (_modal_product_provider_name) {
            
            $(_modal_product_provider_name)
                .on("change", function () {
                    //*
                    setTimeout(function () {
                        let provider_name = _modal_product_provider_name.value
                        
                        if (globalSelectedProvider === false) {
                            
                            if (provider_name === "") {
                                clearNewProductModalFields()
                            } else {
                                providerExists(provider_name)
                            }
                        }
                        
                    }, 200)
                    //*/
                })
                .on("search", function () {
                    globalSelectedProvider = false
                    clearNewProductModalFields()
                })
                .on("keyup", function () {
                    globalSelectedProvider = false
                })
                .on("click", function (e) {
                    if ($(this).attr("readonly") === "readonly") {
                        e.preventDefault()
                    } else {
                        $(this).select()
                    }
                })
                .autocomplete({
                    serviceUrl: "/api/v1.0/autocomplete/providers",
                    minChars: 2,
                    cache: false,
                    dataType: "json",
                    triggerSelectOnValidInput: false,
                    paramName: "st",
                    onSelect: function (suggestion) {
                        if (!suggestion.data) {
                            return
                        }
                        
                        globalSelectedProvider = true
                        setNewProductModalFields(suggestion.data)
                        
                    },
                })
            
        }
        
    }
    
    const clearNewProductModalFields = function () {
        //console.log("Provider.clearNewProductModalFields()")
        // ----
        
        _modal_product_provider_location_id.value = ""
        _modal_product_provider_id.value = ""
        _modal_product_provider_company_id.value = ""
        _modal_product_vendor_id.value = ""
        _modal_product_vendor_company_id.value = ""
        _modal_product_vendor_name.value = ""
        _modal_product_provider_vendor_match.checked = false
        
        $(_form_product_add).trigger("change")
        
    }
    
    const setNewProductModalFields = function (provider) {
        //console.log("Provider.setNewModalFields(provider)", provider)
        // ----
        
        let categoryId = (_modal_product_category_id && !isNaN(parseInt(_modal_product_category_id.value))) ? parseInt(_modal_product_category_id.value) : null
        let category = Types.category.get(categoryId)
        let company = (provider && provider.company) ? provider.company : {}
        let addresses = (provider && provider.addresses) ? provider.addresses : {}
        let contacts = (provider && provider.contacts) ? provider.contacts : {}
        let location = (provider && provider.location) ? provider.location : {}
        let vendor = (provider && provider.vendor) ? provider.vendor : {}
        let companyId = (company && company.id && !isNaN(parseInt(company.id))) ? parseInt(company.id) : null
        let companyName = (company && company.name) ? company.name : null
        let vendorId = (vendor && vendor.id && !isNaN(parseInt(vendor.id))) ? parseInt(vendor.id) : null
        let providerId = (provider && provider.id && !isNaN(parseInt(provider.id))) ? parseInt(provider.id) : null
        let codeDirect = (provider && provider.code_direct_id) ? provider.code_direct_id : null
        let sku = (vendor && vendor.sku) ? vendor.sku : null
        let providerVendorMatch = true
        let locationId = (provider && provider.location_id && !isNaN(parseInt(provider.location_id))) ? parseInt(provider.location_id) : null
        let attributeId = (category && category.attribute_id) ? category.attribute_id : null
        
        clearNewProductModalFields()
        
        _modal_product_provider_location_id.value = locationId
        _modal_product_provider_name.value = companyName
        _modal_product_provider_id.value = providerId
        _modal_product_provider_company_id.value = companyId
        _modal_product_vendor_id.value = vendorId
        _modal_product_vendor_company_id.value = companyId
        _modal_product_vendor_name.value = companyName
        _modal_product_provider_vendor_match.checked = providerVendorMatch
        
        //$(_modal_product_provider_name).trigger("change")
        //$(_modal_product_vendor_name).trigger("change")
        //console.log("|__ Types.category", Array.from(Types.category.values))
        
        Product.attr1 = attributeId
        Product.attr2 = codeDirect
        Product.attr3 = sku
        
        $(_form_product_add).trigger("change")
        
        Product.updateProductSKU()
        
    }
    
    const init = function (settings) {
        //console.log("Provider.init(settings)", settings)
        // ----
        
        let detail
        
        if (settings) {
            
            if (settings.provider_detail) {
                detail = set(settings.provider_detail)
                
                if (detail) {
                    tempProvider = detail
                    
                    if (detail.company) {
                        //console.log("|__ detail.company", detail.company)
                        
                        Company.init(detail.company)
                    }
                    
                }
                
                //populateProductEditProviderForm(detail)
            }
            
        }
        
        if (_product_edit_details_section_provider_form_filter) {
            closeProductEditProviderForm()
        }
        
        initAutoComplete()
        
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        navigate: function (provider) {
            navigate(provider)
        },
        get: function (params) {
            get(params)
        },
        build: function () {
            if (validate_form()) {
                return build()
            }
        },
        load_all: function (params) {
            loadAll(params)
        },
        save: function (params) {
            save(params)
        },
        init: function (settings) {
            init(settings)
        },
        resetForm: function () {
            resetForm()
        },
        providerExists: function (name) {
            providerExists(name)
        },
        enable_form_fields: function () {
            enable_form_fields()
        },
        disable_form_fields: function () {
            disable_form_fields()
        },
        index: function (providers) {
            index(providers)
        },
        edit: function (settings) {
            edit(settings)
        },
    }
    
})()
