const Contact = (function () {
    "use strict"
    //Path
    const base_url = "/contacts"
    //Buttons
    const _clear_contact_table = document.getElementById("clear_contact_table")
    const _button_add_contact_table = document.getElementById("button_add_contact_table")
    const _button_clear_form_edit_contact = document.getElementById("button_clear_form_edit_contact")
    const _button_close_edit_contact_form = document.getElementById("button_close_edit_contact_form")
    const _button_submit_form_edit_contact = document.getElementById("button_submit_form_edit_contact")
    //Fields
    const _company_id = document.getElementById("company_id")
    const _contact_company_id = document.getElementById("contact_company_id")
    const _contact_id = document.getElementById("contact_id")
    const _contact_name_first = document.getElementById("contact_name_first")
    const _contact_name_last = document.getElementById("contact_name_last")
    const _contact_phone = document.getElementById("contact_phone")
    const _contact_email = document.getElementById("contact_email")
    const _contact_enabled = document.getElementById("contact_enabled")
    const _contact_types_id = document.getElementById("contact_types_id")
    //Blocks
    const _card_edit_contact_form = document.getElementById("card_edit_contact_form")
    const _form_edit_contact = document.getElementById("form_edit_contact")
    //Tables
    const _table_contact = document.getElementById("table_contact")
    //Unused
    const _contact_date_created = document.getElementById("contact_date_created")
    const _contact_created_by = document.getElementById("contact_created_by")
    const _contact_date_modified = document.getElementById("contact_date_modified")
    const _contact_modified_by = document.getElementById("contact_modified_by")
    const _contact_note = document.getElementById("contact_note")
    //Defaults
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let $contact_table = $(_table_contact)
    let form_rules = {
        rules: {
            contact_name_first: {
                required: true,
            },
            contact_name_last: {
                required: true,
            },
            contact_phone: {
                required: true,
            },
            contact_email: {
                required: true,
            },
            contact_types_id: {
                required: true,
            },
        },
        messages: {
            contact_name_first: {
                required: "Field Required",
            },
            contact_name_last: {
                required: "Field Required",
            },
            contact_phone: {
                required: "Field Required",
            },
            contact_email: {
                required: "Field Required",
            },
            contact_types_id: {
                required: "Field Required",
            },
        },
    }
    let validator
    // ----
    
    /**
     * submit contact form button
     */
    $(_button_submit_form_edit_contact)
        .on("click", function () {
            if (validate_form()) {
                confirmDialog(`Would you like to update?`, (ans) => {
                    if (ans) {
                        save()
                    }
                })
            }
        })
    
    $(_button_add_contact_table)
        .on("click", function () {
            $contact_table.clearSelectedRows()
            clear_form()
            show_form()
        })
    
    $(_button_clear_form_edit_contact)
        .on("click", function () {
            $contact_table.clearSelectedRows()
            clear_form()
        })
    
    $(_button_close_edit_contact_form)
        .on("click", function () {
            $contact_table.clearSelectedRows()
            clear_form()
            hide_form()
        })
    
    $(_clear_contact_table)
        .on("click", function () {
            Contact.clearTable()
        })
    
    /**
     * validate contact form
     *
     * @returns {boolean}
     */
    const validate_form = function () {
        return $(_form_edit_contact).valid()
    }
    
    /**
     * build contact record
     *
     * @returns {{}|*}
     */
    const build = function () {
        
        let dataToSend = {
            name_first: _contact_name_first.value,
            name_last: _contact_name_last.value,
            email: _contact_email.value,
            phone: _contact_phone.value,
            contact_types_id: toNumbers(getListOfIds($(_contact_types_id).val())),
            enabled: (_contact_enabled.checked === true) ? 1 : 0,
            company_id: (!isNaN(_contact_company_id.value)) ? parseInt(_contact_company_id.value) : null,
            id: (!isNaN(_contact_id.value)) ? parseInt(_contact_id.value) : null,
        }
        return remove_nulls(dataToSend)
        
    }
    
    /**
     * build contact table structure
     */
    const build_table = function () {
        if (_table_contact) {
            if (!$.fn.DataTable.isDataTable(_table_contact)) {
                $contact_table = $(_table_contact).table({
                    table_type: "display_list",
                    data: Contact.all,
                    columnDefs: [
                        {
                            title: "ID",
                            targets: 0,
                            data: "id",
                            render: function (data, type, row, meta) {
                                return data
                            },
                        },
                        {
                            title: "Name",
                            targets: 1,
                            data: "formatted_names",
                            render: function (data, type, row, meta) {
                                return data
                            },
                        },
                        {
                            title: "Types",
                            targets: 2,
                            data: "formatted_types",
                            render: function (data, type, row, meta) {
                                return data
                            },
                        },
                    ],
                    rowClick: Contact.navigate,
                })
            }
        }
    }
    
    /**
     * save contact
     */
    const save = function () {
        let dataToSend = build()
        if (dataToSend) {
            update_contact(dataToSend, function (data) {
                //console.log(data)
                if (data) {
                    if (data[0]) {
                        let contact = data[0]
                        let detail = set_detail(contact)
                        
                        if (Contact.all.get(detail.id)) {
                            $contact_table.updateRow(detail)
                        } else {
                            $contact_table.insertRow(detail)
                        }
                        
                        Contact.all.set(detail.id, detail)
                        
                        toastr.success("Contact Updated")
                    }
                    
                }
            })
        }
        
    }
    
    /**
     * update contact
     *
     * @param dataToSend
     * @param callback
     */
    const update_contact = function (dataToSend, callback) {
        let url = "/api/v1.0/contacts/update"
        if (dataToSend) {
            sendPostRequest(url, dataToSend, function (data, status, xhr) {
                if (data) {
                    return callback(data)
                } else {
                    return handleContactError("Oops: 1")
                }
            })
        }
    }
    
    /**
     * sets objects default values
     *
     * @returns {{note: null, country: {note: null, date_modified: *, date_created: *, name: null, modified_by: number, id: null, iso2: null, sort_order: number, created_by: number, currency_id: null, enabled: number, iso3: null}, medium_contact_formatted: null, city: {note: null, date_modified: *, province_id: null, date_created: *, name: null, modified_by: number, id: null, sort_order: number, created_by: number, enabled: number}, date_created: *, created_by: number, enabled: number, short_contact_formatted: null, long_contact_formatted: null, street_1: null, date_modified: *, province: {note: null, date_modified: *, date_created: *, name: null, modified_by: number, id: null, iso2: null, sort_order: number, created_by: number, country_id: null, enabled: number, iso3: null}, street_3: null, street_2: null, modified_by: number, id: null, postal_code: null}}
     * @private
     */
    const _default_detail = function () {
        return {
            id: null,
            company_id: null,
            name_first: null,
            name_last: null,
            formatted_types: "",
            formatted_names: "",
            phone: null,
            email: null,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            note: null,
        }
    }
    
    /**
     * handels contact errors
     *
     * @param msg
     */
    const handleContactError = function (msg) {
        toastr.error(msg)
    }
    
    /**
     * reset form fields
     */
    const clear_form = function () {
        if (_card_edit_contact_form) {
            _contact_id.value = ""
            _contact_name_first.value = ""
            _contact_name_last.value = ""
            _contact_phone.value = ""
            _contact_email.value = ""
            _contact_enabled.checked = true
            $(_contact_types_id).val([])
        }
    }
    
    /**
     * populate form fields
     *
     * @param contact
     */
    const populate_form = function (contact) {
        clear_form()
        _contact_company_id.value = _company_id.value
        if (contact) {
            //console.log("contact", contact)
            _contact_id.value = validInt(contact.id)
            _contact_name_first.value = (contact.name_first) ? contact.name_first : null
            _contact_name_last.value = (contact.name_last) ? contact.name_last : null
            _contact_phone.value = (contact.phone) ? contact.phone : null
            _contact_email.value = (contact.email) ? contact.email : null
            _contact_enabled.checked = (contact.enabled) ? (contact.enabled === 1) : true
            $(_contact_types_id).val((contact.contact_types_id) ? contact.contact_types_id : [])
        }
        show_form()
    }
    
    /**
     * show form
     */
    const show_form = function () {
        if (_card_edit_contact_form) {
            $(_card_edit_contact_form).show()
        }
    }
    
    /**
     * hide form
     */
    const hide_form = function () {
        if (_card_edit_contact_form) {
            $(_card_edit_contact_form).hide()
        }
    }
    
    /**
     * sets detail for contact object
     *
     * @param contact
     * @returns {{note: null, country: {note: null, date_modified: *, date_created: *, name: null, modified_by: number, id: null, iso2: null, sort_order: number, created_by: number, currency_id: null, enabled: number, iso3: null}, medium_contact_formatted: null, city: {note: null, date_modified: *, province_id: null, date_created: *, name: null, modified_by: number, id: null, sort_order: number, created_by: number, enabled: number}, date_created: *, created_by: number, enabled: number, short_contact_formatted: null, long_contact_formatted: null, street_1: null, date_modified: *, province: {note: null, date_modified: *, date_created: *, name: null, modified_by: number, id: null, iso2: null, sort_order: number, created_by: number, country_id: null, enabled: number, iso3: null}, street_3: null, street_2: null, modified_by: number, id: null, postal_code: null}}
     */
    const set_detail = function (contact) {
        let detail = _default_detail()
        if (contact) {
            detail.id = (contact.id) ? contact.id : null
            detail.company_id = (contact.company_id) ? contact.company_id : null
            detail.name_first = (contact.name_first) ? contact.name_first : null
            detail.name_last = (contact.name_last) ? contact.name_last : null
            detail.formatted_types = (contact.formatted_types) ? contact.formatted_types : ""
            detail.formatted_names = (contact.formatted_names) ? contact.formatted_names : ""
            detail.contact_types_id = getListOfIds(contact.contact_types_id)
            detail.phone = (contact.phone) ? contact.phone : null
            detail.email = (contact.email) ? contact.email : null
            detail.enabled = (contact.enabled) ? contact.enabled : 1
            detail.date_created = (contact.date_created) ? contact.date_created : formatDateMySQL()
            detail.created_by = (contact.created_by) ? contact.created_by : created_by
            detail.date_modified = (contact.date_modified) ? contact.date_modified : formatDateMySQL()
            detail.modified_by = (contact.modified_by) ? contact.modified_by : modified_by
            detail.note = (contact.note) ? contact.note : null
        }
        
        Contact.detail = detail
        return detail
    }
    
    /**
     * loads all contacts into object
     *
     * @param contacts
     */
    const load_all = function (contacts) {
        Contact.all = new Map()
        
        if (!contacts) {
            return
        }
        
        $.each(contacts, function (i, contact) {
            let detail = set_detail(contact)
            Contact.all.set(detail.id, detail)
            $contact_table.insertRow(detail)
        })
        
        if (contacts[0]) {
            $contact_table.loadRow(contacts[0])
        }
        
        //console.log(" Contact.all", Contact.all)
    }
    
    /**
     * load selected contact
     *
     * @param contact
     */
    const navigate = function (contact) {
        if (contact) {
            populate_form(contact)
        }
    }
    
    /**
     * initialize contact form and table
     *
     * @param contacts
     */
    const init = function (contacts) {
        if (_table_contact) {
            build_table()
        }
        if (contacts) {
            
            load_all(contacts)
        }
        if (_form_edit_contact) {
            validator_init(form_rules)
            validator = $(_form_edit_contact).validate()
        }
        hide_form()
    }
    
    /**
     * clear and empty table
     */
    const clearTable = function () {
        let contacts = Array.from(Contact.all.values())
        $.each(contacts, function (k, contact) {
            $contact_table.deleteRow(contact)
        })
        Contact.all = new Map()
    }
    
    const fetchContactsByCompanyId = function (dataToSend, callback) {
        let url = "/api/v1.0/contacts"
        
        if (dataToSend) {
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handleContactError("Oops: 1")
                    }
                })
            } catch (e) {
                //console.log("error", e)
                return handleContactError("Error Validating Company")
            }
        } else {
            return handleContactError("Error Loading Company- Missing Data")
        }
    }
    
    const populateTable = function (contacts) {
        if (_table_contact) {
            Contact.all = new Map()
            let loadContact
            let count = 0
            $.each(contacts, function (i, contact) {
                if (count === 0) {
                    loadContact = contact
                }
                contact.contact_types_id = getListOfIds(contact.contact_types_id)
                Contact.all.set(contact.id, contact)
                $contact_table.insertRow(contact)
                count++
            })
            
            if (_table_contact) {
                if (loadContact) {
                    $contact_table.loadRow(loadContact)
                }
                
                $contact_table.clearSelectedRows()
            }
        }
    }
    
    const getByCompanyId = function (company_id) {
        if (company_id) {
            fetchContactsByCompanyId({ company_id: company_id }, function (data) {
                if (data) {
                    let contacts = data
                    clearTable()
                    populateTable(contacts)
                }
            })
        }
    }
    
    /**
     * globals
     */
    return {
        validator: null,
        detail: {},
        all: new Map(),
        getByCompanyId: function (company_id) {
            getByCompanyId(company_id)
        },
        clearTable: function () {
            clearTable()
        },
        navigate: function (contact) {
            navigate(contact)
        },
        load_all: function (params) {
            load_all(params)
        },
        save: function (params) {
            save(params)
        },
        init: function (settings) {
            init(settings)
        },
    }
    
})()
