const Contact = (function () {
    "use strict"
    
    const base_url = "/contact"
    const _input_contact_id = document.getElementById("input_contact_id")
    const _input_contact_name_first = document.getElementById("input_contact_name_first")
    const _input_contact_name_last = document.getElementById("input_contact_name_last")
    const _input_contact_phone = document.getElementById("input_contact_phone")
    const _input_contact_email = document.getElementById("input_contact_email")
    const _input_contact_enabled = document.getElementById("input_contact_enabled")
    const _input_contact_date_created = document.getElementById("input_contact_date_created")
    const _input_contact_created_by = document.getElementById("input_contact_created_by")
    const _input_contact_date_modified = document.getElementById("input_contact_date_modified")
    const _input_contact_modified_by = document.getElementById("input_contact_modified_by")
    const _input_contact_note = document.getElementById("input_contact_note")
    const _table_contact = document.getElementById("table_contact")
    // ----
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let $contact_table = $(_table_contact)
    // ----
    const build_table = function () {
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
                        title: "First Name",
                        targets: 1,
                        data: "name_first",
                        render: function (data, type, row, meta) {
                            return data
                        },
                    },
                    {
                        title: "Last Name",
                        targets: 2,
                        data: "name_last",
                        render: function (data, type, row, meta) {
                            return data
                        },
                    },
                ],
                rowClick: Contact.navigate,
            })
        }
    }
    
    const handle_contact_error = function (msg) {
        toastr.error(msg)
    }
    
    const _default_detail = function () {
        return {
            id: null,
            name_first: null,
            name_last: null,
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
    
    const save = function (params) {
    
    }
    
    const get = function (id) {
        let data_to_send = {}
        if (id) {
            data_to_send.id = id
        }
        
    }
    
    const init = function (settings) {
        console.log(" -- Contact -- ", {})
        if (_table_contact) {
            build_table()
        }
    }
    
    const set = function (contact) {
        let detail = _default_detail()
        if (contact) {
            detail.id = (contact.id) ? contact.id : null
            detail.name_first = (contact.name_first) ? contact.name_first : null
            detail.name_last = (contact.name_last) ? contact.name_last : null
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
    
    const load_all = function (contacts) {
        Contact.all = new Map()
        
        if (!contacts) {
            return
        }
        
        $.each(contacts, function (i, contact) {
            let detail = set(contact)
            
            Contact.all.set("id", detail)
        })
        
        console.log(" Contact.all", Contact.all)
    }
    
    const navigate = function (contact) {
        console.log("Contact.navigate", contact)
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        navigate: function (contact) {
            navigate(contact)
        },
        get: function (params) {
            get(params)
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

Contact.init()
//end object
