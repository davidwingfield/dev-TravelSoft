    
const Product = (function () {
    'use strict'
    
    const base_url = '/product'
    const _input_product_id = document.getElementById('input_product_id')
	const _input_product_category_id = document.getElementById('input_product_category_id')
	const _input_product_pricing_strategy_types_id = document.getElementById('input_product_pricing_strategy_types_id')
	const _input_product_status_types_id = document.getElementById('input_product_status_types_id')
	const _input_product_product_status_types_id = document.getElementById('input_product_product_status_types_id')
	const _input_product_currency_id = document.getElementById('input_product_currency_id')
	const _input_product_location_id = document.getElementById('input_product_location_id')
	const _input_product_city_id = document.getElementById('input_product_city_id')
	const _input_product_vendor_id = document.getElementById('input_product_vendor_id')
	const _input_product_provider_id = document.getElementById('input_product_provider_id')
	const _input_product_name = document.getElementById('input_product_name')
	const _input_product_provider_vendor_match = document.getElementById('input_product_provider_vendor_match')
	const _input_product_description_short = document.getElementById('input_product_description_short')
	const _input_product_description_long = document.getElementById('input_product_description_long')
	const _input_product_rating = document.getElementById('input_product_rating')
	const _input_product_sku = document.getElementById('input_product_sku')
	const _input_product_phone = document.getElementById('input_product_phone')
	const _input_product_infant = document.getElementById('input_product_infant')
	const _input_product_child = document.getElementById('input_product_child')
	const _input_product_teen = document.getElementById('input_product_teen')
	const _input_product_depart_from = document.getElementById('input_product_depart_from')
	const _input_product_arrive_to = document.getElementById('input_product_arrive_to')
	const _input_product_depart_time = document.getElementById('input_product_depart_time')
	const _input_product_arrive_time = document.getElementById('input_product_arrive_time')
	const _input_product_day_span = document.getElementById('input_product_day_span')
	const _input_product_cover_image = document.getElementById('input_product_cover_image')
	const _input_product_api_id = document.getElementById('input_product_api_id')
	const _input_product_from_api = document.getElementById('input_product_from_api')
	const _input_product_hotel_code = document.getElementById('input_product_hotel_code')
	const _input_product_enabled = document.getElementById('input_product_enabled')
	const _input_product_date_created = document.getElementById('input_product_date_created')
	const _input_product_created_by = document.getElementById('input_product_created_by')
	const _input_product_date_modified = document.getElementById('input_product_date_modified')
	const _input_product_modified_by = document.getElementById('input_product_modified_by')
	const _input_product_note = document.getElementById('input_product_note')
    let user_id = (document.getElementById('user_id')) ? (!isNaN(parseInt(document.getElementById('user_id').value))) ? parseInt(document.getElementById('user_id').value) : 4 : 4
    
    
    const handle_product_error = function (msg) {
            toastr.error(msg)
        }
        
    const _default_detail = function () {
        return {
            id: null,
			category_id: null,
			pricing_strategy_types_id: null,
			status_types_id: null,
			product_status_types_id: null,
			currency_id: null,
			location_id: null,
			city_id: null,
			vendor_id: null,
			provider_id: null,
			name: null,
			provider_vendor_match: 1,
			description_short: null,
			description_long: null,
			rating: null,
			sku: null,
			phone: null,
			infant: null,
			child: null,
			teen: null,
			depart_from: null,
			arrive_to: null,
			depart_time: null,
			arrive_time: null,
			day_span: null,
			cover_image: null,
			api_id: null,
			from_api: 1,
			hotel_code: null,
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
            
    
    const set = function (product) {
        let detail = _default_detail()
        if (product) {
            detail.id = (product.id)?product.id:null
			detail.category_id = (product.category_id)?product.category_id:null
			detail.pricing_strategy_types_id = (product.pricing_strategy_types_id)?product.pricing_strategy_types_id:null
			detail.status_types_id = (product.status_types_id)?product.status_types_id:null
			detail.product_status_types_id = (product.product_status_types_id)?product.product_status_types_id:null
			detail.currency_id = (product.currency_id)?product.currency_id:null
			detail.location_id = (product.location_id)?product.location_id:null
			detail.city_id = (product.city_id)?product.city_id:null
			detail.vendor_id = (product.vendor_id)?product.vendor_id:null
			detail.provider_id = (product.provider_id)?product.provider_id:null
			detail.name = (product.name)?product.name:null
			detail.provider_vendor_match = (product.provider_vendor_match)?product.provider_vendor_match:1
			detail.description_short = (product.description_short)?product.description_short:null
			detail.description_long = (product.description_long)?product.description_long:null
			detail.rating = (product.rating)?product.rating:null
			detail.sku = (product.sku)?product.sku:null
			detail.phone = (product.phone)?product.phone:null
			detail.infant = (product.infant)?product.infant:null
			detail.child = (product.child)?product.child:null
			detail.teen = (product.teen)?product.teen:null
			detail.depart_from = (product.depart_from)?product.depart_from:null
			detail.arrive_to = (product.arrive_to)?product.arrive_to:null
			detail.depart_time = (product.depart_time)?product.depart_time:null
			detail.arrive_time = (product.arrive_time)?product.arrive_time:null
			detail.day_span = (product.day_span)?product.day_span:null
			detail.cover_image = (product.cover_image)?product.cover_image:null
			detail.api_id = (product.api_id)?product.api_id:null
			detail.from_api = (product.from_api)?product.from_api:1
			detail.hotel_code = (product.hotel_code)?product.hotel_code:null
			detail.enabled = (product.enabled)?product.enabled:1
			detail.date_created = (product.date_created)?product.date_created:formatDateMySQL()
			detail.created_by = (product.created_by)?product.created_by:created_by
			detail.date_modified = (product.date_modified)?product.date_modified:formatDateMySQL()
			detail.modified_by = (product.modified_by)?product.modified_by:modified_by
			detail.note = (product.note)?product.note:null
        }
        
        Product.detail = detail
        return detail
    }
    
    const load_all = function (products) {
        Product.all = new Map()
    
        if (!products) {
            return
        }
        $.each(products, function (i, product) {
            let detail = set(product)
            Product.all.set('id', detail)
        })
        
        console.log(' Product.all',  Product.all);
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
            set()
        },
    }

})()

Product.init()
//end object
