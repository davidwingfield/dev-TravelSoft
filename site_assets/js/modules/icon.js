const Icon = (function () {
    
    const loadAll = function (icons) {
        Icon.all = new Map()
        
    }
    
    const init = function (settings) {
        if (settings) {
            if (settings.icons) {
                loadAll(settings.icons)
            }
        }
    }
    
    return {
        all: new Map(),
        init: function (settings) {
            return init(settings)
        },
    }
})()
