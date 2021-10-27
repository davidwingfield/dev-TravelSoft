const Contact = (function () {
    "use strict"
    //Path
    const base_url = "/contacts"
    //Buttons
    const _button_add_contact_table = document.getElementById("button_add_contact_table")
    const _button_clear_form_edit_contact = document.getElementById("button_clear_form_edit_contact")
    const _button_close_edit_contact_form = document.getElementById("button_close_edit_contact_form")
    const _button_submit_form_edit_contact = document.getElementById("button_submit_form_edit_contact")
    //Fields
    const _contact_id = document.getElementById("contact_id")
    const _contact_name_first = document.getElementById("contact_name_first")
    const _contact_name_last = document.getElementById("contact_name_last")
    const _contact_phone = document.getElementById("contact_phone")
    const _contact_email = document.getElementById("contact_email")
    const _contact_enabled = document.getElementById("contact_enabled")
    const _contact_types_id = document.getElementById("contact_types_id")
    //Blocks
    const _card_edit_contact_form = document.getElementById("card_edit_contact_form")
    
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
    // ----
    
    /**
     * submit contact form button
     */
    $(_button_submit_form_edit_contact)
      .on("click", function () {
          save()
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
     * sets objects default values
     *
     * @returns {{note: null, country: {note: null, date_modified: *, date_created: *, name: null, modified_by: number, id: null, iso2: null, sort_order: number, created_by: number, currency_id: null, enabled: number, iso3: null}, medium_address_formatted: null, city: {note: null, date_modified: *, province_id: null, date_created: *, name: null, modified_by: number, id: null, sort_order: number, created_by: number, enabled: number}, date_created: *, created_by: number, enabled: number, short_address_formatted: null, long_address_formatted: null, street_1: null, date_modified: *, province: {note: null, date_modified: *, date_created: *, name: null, modified_by: number, id: null, iso2: null, sort_order: number, created_by: number, country_id: null, enabled: number, iso3: null}, street_3: null, street_2: null, modified_by: number, id: null, postal_code: null}}
     * @private
     */
    const _default_detail = function () {
        return {
            id: null,
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
    const handle_contact_error = function (msg) {
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
        log("Contact-PopulateForm.contact", contact)
        if (_card_edit_contact_form) {
            _contact_id.value = validInt(contact.id)
            _contact_name_first.value = (contact.name_first) ? contact.name_first : null
            _contact_name_last.value = (contact.name_last) ? contact.name_last : null
            _contact_phone.value = (contact.phone) ? contact.phone : null
            _contact_email.value = (contact.email) ? contact.email : null
            _contact_enabled.checked = (contact.enabled) ? (contact.enabled === 1) : true
            $(_contact_types_id).val((contact.contact_types_id) ? contact.contact_types_id : [])
        }
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
     * save contact
     */
    const save = function () {
        if (validate()) {
            let dataToSend = {
                id: null,
                name_first: (_contact_name_first.value !== "") ? _contact_name_first.value : null,
                name_last: (_contact_name_last.value !== "") ? _contact_name_last.value : null,
                email: (_contact_email.value !== "") ? _contact_email.value : null,
                phone: (_contact_phone.value !== "") ? _contact_phone.value : null,
                enabled: (_contact_enabled) ? 1 : 0,
                note: null,
            }
            log(dataToSend)
        }
    }
    
    /**
     * validate contact form
     *
     * @returns {boolean}
     */
    const validate = function () {
        
        return false
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
        hide_form()
    }
    
    /**
     * sets detail for contact object
     *
     * @param contact
     * @returns {{note: null, country: {note: null, date_modified: *, date_created: *, name: null, modified_by: number, id: null, iso2: null, sort_order: number, created_by: number, currency_id: null, enabled: number, iso3: null}, medium_address_formatted: null, city: {note: null, date_modified: *, province_id: null, date_created: *, name: null, modified_by: number, id: null, sort_order: number, created_by: number, enabled: number}, date_created: *, created_by: number, enabled: number, short_address_formatted: null, long_address_formatted: null, street_1: null, date_modified: *, province: {note: null, date_modified: *, date_created: *, name: null, modified_by: number, id: null, iso2: null, sort_order: number, created_by: number, country_id: null, enabled: number, iso3: null}, street_3: null, street_2: null, modified_by: number, id: null, postal_code: null}}
     */
    const set_detail = function (contact) {
        let detail = _default_detail()
        if (contact) {
            detail.id = (contact.id) ? contact.id : null
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
        
        //console.log(" Contact.all", Contact.all)
    }
    
    /**
     * load selected contact
     *
     * @param contact
     */
    const navigate = function (contact) {
        clear_form()
        populate_form(contact)
        show_form()
    }
    
    /**
     * globals
     */
    return {
        validator: null,
        detail: {},
        all: new Map(),
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
