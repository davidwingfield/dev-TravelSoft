    
const PricingStrategyTypes = (function () {
    'use strict'
    
    const base_url = '/pricing_strategy_types'
    const _input_pricing_strategy_types_id = document.getElementById('input_pricing_strategy_types_id')
	const _input_pricing_strategy_types_name = document.getElementById('input_pricing_strategy_types_name')
	const _input_pricing_strategy_types_enabled = document.getElementById('input_pricing_strategy_types_enabled')
	const _input_pricing_strategy_types_date_created = document.getElementById('input_pricing_strategy_types_date_created')
	const _input_pricing_strategy_types_created_by = document.getElementById('input_pricing_strategy_types_created_by')
	const _input_pricing_strategy_types_date_modified = document.getElementById('input_pricing_strategy_types_date_modified')
	const _input_pricing_strategy_types_modified_by = document.getElementById('input_pricing_strategy_types_modified_by')
	const _input_pricing_strategy_types_note = document.getElementById('input_pricing_strategy_types_note')
    let user_id = (document.getElementById('user_id')) ? (!isNaN(parseInt(document.getElementById('user_id').value))) ? parseInt(document.getElementById('user_id').value) : 4 : 4
    
    
    const handle_pricing_strategy_types_error = function (msg) {
            toastr.error(msg)
        }
        
    const _default_detail = function () {
        return {
            id: null,
			name: null,
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
        console.log(' -- PricingStrategyTypes -- ', {})
    }
    
    const set = function (pricing_strategy_types) {
        let detail = _default_detail()
        if (pricing_strategy_types) {
            detail.id = (pricing_strategy_types.id)?pricing_strategy_types.id:null
			detail.name = (pricing_strategy_types.name)?pricing_strategy_types.name:null
			detail.enabled = (pricing_strategy_types.enabled)?pricing_strategy_types.enabled:1
			detail.date_created = (pricing_strategy_types.date_created)?pricing_strategy_types.date_created:formatDateMySQL()
			detail.created_by = (pricing_strategy_types.created_by)?pricing_strategy_types.created_by:created_by
			detail.date_modified = (pricing_strategy_types.date_modified)?pricing_strategy_types.date_modified:formatDateMySQL()
			detail.modified_by = (pricing_strategy_types.modified_by)?pricing_strategy_types.modified_by:modified_by
			detail.note = (pricing_strategy_types.note)?pricing_strategy_types.note:null
        }
        
        PricingStrategyTypes.detail = detail
        return detail
    }
    
    const load_all = function (pricing_strategy_types) {
        PricingStrategyTypes.all = new Map()
    
        if (!pricing_strategy_types) {
            return
        }
        $.each(pricing_strategy_types, function (i, pricing_strategy_types) {
            let detail = set(pricing_strategy_types)
            PricingStrategyTypes.all.set('id', detail)
        })
        
        console.log(' PricingStrategyTypes.all',  PricingStrategyTypes.all);
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

PricingStrategyTypes.init()
//end object
