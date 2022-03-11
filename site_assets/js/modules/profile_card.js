$(function () {
    const _profile_card = document.getElementById("profile_card")
    const _cover_image = document.getElementById("profile_card_cover_image")
    const _profile_edit_name = document.getElementById("profile_edit_name")
    
    $(_profile_edit_name)
        .on("click", function () {
            //console.log("_profile_edit_name:click")
        })
    
    let tempName = {
        first: "",
        last: "",
    }
    const enableNameEdit = function () {
    
    }
    
    const disableNameEdit = function () {}
    
    const build = function () {
        let ht = parseInt($(_profile_card).outerHeight())
        let wd = parseInt($(_profile_card).outerWidth())
        let imageHeight, imageWidth = 0
        
        let r = ht / wd
        imageHeight = (wd / 2) + "px"
        imageWidth = wd + "px"
        
        $(_cover_image)
            .css({
                "width": "100%",
                "height": "100%",
                "max-height": imageHeight + "px",
            })
    }
    
    window.addEventListener("resize", debounce(function (e) {
        if (_profile_card) {
            build()
        }
    }))
    
    build()
})
