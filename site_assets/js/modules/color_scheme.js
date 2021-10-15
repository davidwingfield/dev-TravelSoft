    
const ColorScheme = (function () {
    'use strict'
    
    const base_url = '/color_scheme'
    const _input_color_scheme_id = document.getElementById('input_color_scheme_id')
	const _input_color_scheme_name = document.getElementById('input_color_scheme_name')
	const _input_color_scheme_background_color = document.getElementById('input_color_scheme_background_color')
	const _input_color_scheme_border_color = document.getElementById('input_color_scheme_border_color')
	const _input_color_scheme_text_color = document.getElementById('input_color_scheme_text_color')
	const _input_color_scheme_sort_order = document.getElementById('input_color_scheme_sort_order')
	const _input_color_scheme_enabled = document.getElementById('input_color_scheme_enabled')
	const _input_color_scheme_date_created = document.getElementById('input_color_scheme_date_created')
	const _input_color_scheme_created_by = document.getElementById('input_color_scheme_created_by')
	const _input_color_scheme_date_modified = document.getElementById('input_color_scheme_date_modified')
	const _input_color_scheme_modified_by = document.getElementById('input_color_scheme_modified_by')
	const _input_color_scheme_note = document.getElementById('input_color_scheme_note')
    let user_id = (document.getElementById('user_id')) ? (!isNaN(parseInt(document.getElementById('user_id').value))) ? parseInt(document.getElementById('user_id').value) : 4 : 4
    
    
    const handle_color_scheme_error = function (msg) {
            toastr.error(msg)
        }
        
    const _default_detail = function () {
        return {
            id: null,
			name: null,
			background_color: null,
			border_color: null,
			text_color: null,
			sort_order: null,
			enabled: 1,
			date_created: formatDateMySQL(),
			created_by: user_id,
			date_modified: formatDateMySQL(),
			modified_by: user_id,
			note: null
        }
    }
    
    const save = function(params){
    
    }
    
    
            const get = function(id){
                let data_to_send = {}
                if(id){
                    data_to_send.id = id
                }
                
            }  
            
    
    const init = function(settings){
        console.log(' -- ColorScheme -- ', {})
    }
    
    const set = function (color_scheme) {
        let detail = _default_detail()
        if (color_scheme) {
            detail.id = (color_scheme.id)?color_scheme.id:null
			detail.name = (color_scheme.name)?color_scheme.name:null
			detail.background_color = (color_scheme.background_color)?color_scheme.background_color:null
			detail.border_color = (color_scheme.border_color)?color_scheme.border_color:null
			detail.text_color = (color_scheme.text_color)?color_scheme.text_color:null
			detail.sort_order = (color_scheme.sort_order)?color_scheme.sort_order:null
			detail.enabled = (color_scheme.enabled)?color_scheme.enabled:1
			detail.date_created = (color_scheme.date_created)?color_scheme.date_created:formatDateMySQL()
			detail.created_by = (color_scheme.created_by)?color_scheme.created_by:created_by
			detail.date_modified = (color_scheme.date_modified)?color_scheme.date_modified:formatDateMySQL()
			detail.modified_by = (color_scheme.modified_by)?color_scheme.modified_by:modified_by
			detail.note = (color_scheme.note)?color_scheme.note:null
        }
        
        ColorScheme.detail = detail
        return detail
    }
    
    const load_all = function (color_schemes) {
        ColorScheme.all = new Map()
    
        if (!color_schemes) {
            return
        }
        $.each(color_schemes, function (i, color_scheme) {
            let detail = set(color_scheme)
            ColorScheme.all.set('id', detail)
        })
        
        console.log(' ColorScheme.all',  ColorScheme.all);
    }
    
    return {
        validator: null,
        detail: {},
        all: new Map(),
        get:function(params){
            get(params)
        },
        load_all: function(params){
            load_all(params);
        },
        save:function(params){
           save(params); 
        },
        init: function () {
            init()
        },
    }

})()

ColorScheme.init()
//end object
