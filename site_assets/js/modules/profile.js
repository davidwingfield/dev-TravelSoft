const Profile = (function () {
    "use strict"
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    const init = function (settings) {
        Console.log("Profile.init(settings)", settings)
        let profiles = []
        if (settings) {
            if (settings.profiles) {
                profiles = settings.profiles
            }
        }
        loadAll(profiles)
    }
    
    const loadAll = function (profiles) {
        Profile.all = new Map()
        if (!profiles) {
            profiles = []
        }
        $.each(profiles, function (k, profile) {
            Console.log("profile", profile)
        })
        
        Console.log("Profile.all", Profile.all)
    }
    
    const buildTable = function () {
    
    }
    
    const defaultDetail = function () {}
    
    const set = function (profile) {
    
    }
    return {
        all: new Map(),
        init: function (settings) {
            init(settings)
        },
    }
    
})()
