const Tour = (function () {
    "use strict"
    const _tour_route = document.getElementById("tour_route")
    
    const init = function (options) {
        console.log("Tour.init(options)", options)
        // ----
        
        if (_tour_route) {
            $(_tour_route).routeManager({
                stops: [
                    {
                        id: 1,
                        location_id: 1,
                        time: "01:00",
                    },
                    {
                        id: 2,
                        location_id: 2,
                        time: "01:00",
                    },
                    {
                        id: 3,
                        location_id: 3,
                        time: "01:00",
                    },
                    {
                        id: 4,
                        location_id: 4,
                        time: "01:00",
                    },
                    {
                        id: 5,
                        location_id: 5,
                        time: "01:00",
                    },
                    {
                        id: 6,
                        location_id: 6,
                        time: "01:00",
                    },
                ],
            })
        }
        
    }
    
    return {
        all: new Map(),
        route: null,
        detail: {},
        init: function (options) {
            init(options)
        },
    }
})()
