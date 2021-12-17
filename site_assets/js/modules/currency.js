const Currency = (function () {
    "use strict"
    
    const base_url = "/currency"
    const _input_currency_id = document.getElementById("input_currency_id")
    const _input_currency_sort_order = document.getElementById("input_currency_sort_order")
    const _input_currency_name = document.getElementById("input_currency_name")
    const _input_currency_iso = document.getElementById("input_currency_iso")
    const _input_currency_minor_unit = document.getElementById("input_currency_minor_unit")
    const _input_currency_symbol = document.getElementById("input_currency_symbol")
    const _input_currency_enabled = document.getElementById("input_currency_enabled")
    const _input_currency_date_created = document.getElementById("input_currency_date_created")
    const _input_currency_created_by = document.getElementById("input_currency_created_by")
    const _input_currency_date_modified = document.getElementById("input_currency_date_modified")
    const _input_currency_modified_by = document.getElementById("input_currency_modified_by")
    const _input_currency_note = document.getElementById("input_currency_note")
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const handle_currency_error = function (msg) {
        toastr.error(msg)
    }
    
    const _default_detail = function () {
        return {
            id: null,
            sort_order: null,
            name: null,
            iso: null,
            minor_unit: null,
            symbol: null,
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
        //Console.log(' -- Currency -- ', {})
    }
    
    const set = function (currency) {
        let detail = _default_detail()
        if (currency) {
            detail.id = (currency.id) ? currency.id : null
            detail.sort_order = (currency.sort_order) ? currency.sort_order : null
            detail.name = (currency.name) ? currency.name : null
            detail.iso = (currency.iso) ? currency.iso : null
            detail.minor_unit = (currency.minor_unit) ? currency.minor_unit : null
            detail.symbol = (currency.symbol) ? currency.symbol : null
            detail.enabled = (currency.enabled) ? currency.enabled : 1
            detail.date_created = (currency.date_created) ? currency.date_created : formatDateMySQL()
            detail.created_by = (currency.created_by) ? currency.created_by : created_by
            detail.date_modified = (currency.date_modified) ? currency.date_modified : formatDateMySQL()
            detail.modified_by = (currency.modified_by) ? currency.modified_by : modified_by
            detail.note = (currency.note) ? currency.note : null
        }
        
        Currency.detail = detail
        return detail
    }
    
    const load_all = function (currencies) {
        Currency.all = new Map()
        
        if (!currencies) {
            return
        }
        $.each(currencies, function (i, currency) {
            let detail = set(currency)
            Currency.all.set("id", detail)
        })
        
        //Console.log(' Currency.all',  Currency.all);
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        get: function (params) {
            get(params)
        },
        load_all: function (params) {
            load_all(params)
        },
        save: function (params) {
            save(params)
        },
        init: function () {
            init()
        },
    }
    
})()

Currency.init()
//end object
