const Car = (function () {
    "use strict"
    
    const baseUrl = "/cars"
    const _category_id = document.getElementById("category_id")
    
    let categoryId, userId
    
    const init = function (settings) {
        console.log("Car.init(settings)", settings)
        // ----
        
        //$(document).ready(function () {
        categoryId = (!isNaN(parseInt(_category_id.value))) ? parseInt(_category_id.value) : null
        userId = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
        
        //})
    }
    
    return {
        id: null,
        detail: {
            id: null,
            province_id: null,
            country_id: null,
            created_by: null,
            modified_by: null,
            sort_order: null,
            name: null,
            enabled: null,
            date_created: null,
            date_modified: null,
            note: null,
        },
        all: new Map(),
        init: function (settings) {
            init(settings)
        },
    }
    
})()
