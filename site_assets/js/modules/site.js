$(document).ready(function () {
    
    window.addEventListener("load", function () {
        const inputs = document.getElementsByTagName("input")
        
        if (mdbPreloader) {
            $(mdbPreloader).delay(500).fadeOut(300)
        }
        
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].type === "text") {
                
                if (inputs[i].classList.contains("date-format")) {
                    //inputs[i].setAttribute("maxlength", "10")
                    //inputs[i].onkeydown = function (event) {
                    //return IsNumeric(this, event.keyCode)
                    //}
                    //inputs[i].onkeyup = function (event) {
                    //validateDateFormat(this, event.keyCode)
                    //}
                    
                }
                
                if (inputs[i].classList.contains("time-format")) {
                    
                    //inputs[i].setAttribute("maxlength", "5")
                    //inputs[i].onkeydown = function (event) {
                    //return IsNumeric(this, event.keyCode)
                    //}
                    //inputs[i].onkeyup = function (event) {
                    //validateTimeFormat(this, event.keyCode)
                    //}
                    
                }
            }
        }
    }, false)
    
    window.addEventListener("resize", debounce(function (e) {
        resize_elements("end of resizing")
    }))
    
    new WOW().init()
    
    $(this).scrollTop(0)
    
    $("body").scrollTop()
    
    $.fn.dataTableExt.afnFiltering.push(
        function (oSettings, aData, iDataIndex) {
            if (oSettings.nTable.id === "dates_table") {
                let iFini = document.getElementById("min").value
                let iFfin = document.getElementById("max").value
                let iStartDateCol = 1
                let iEndDateCol = 1
                
                iFini = iFini.substring(6, 10) + iFini.substring(3, 5) + iFini.substring(0, 2)
                iFfin = iFfin.substring(6, 10) + iFfin.substring(3, 5) + iFfin.substring(0, 2)
                
                let datofini = aData[iStartDateCol].substring(6, 10) + aData[iStartDateCol].substring(3, 5) + aData[iStartDateCol].substring(0, 2)
                let datoffin = aData[iEndDateCol].substring(6, 10) + aData[iEndDateCol].substring(3, 5) + aData[iEndDateCol].substring(0, 2)
                
                if (iFini === "" && iFfin === "") {
                    return true
                } else if (iFini <= datofini && iFfin === "") {
                    return true
                } else if (iFfin >= datoffin && iFini === "") {
                    return true
                } else if (iFini <= datofini && iFfin >= datoffin) {
                    return true
                }
                return false
            }
            if (oSettings.nTable.id === "package_index_table") {
                /*
                let iFini = document.getElementById("package_index_table_available_start_filter").value
                let iFfin = document.getElementById("package_index_table_available_end_filter").value
                let iStartDateCol = 5
                let iEndDateCol = 6
                
                iFini = iFini.substring(6, 10) + iFini.substring(3, 5) + iFini.substring(0, 2)
                iFfin = iFfin.substring(6, 10) + iFfin.substring(3, 5) + iFfin.substring(0, 2)
                
                let datofini = aData[iStartDateCol].substring(6, 10) + aData[iStartDateCol].substring(3, 5) + aData[iStartDateCol].substring(0, 2)
                let datoffin = aData[iEndDateCol].substring(6, 10) + aData[iEndDateCol].substring(3, 5) + aData[iEndDateCol].substring(0, 2)
                
                if (iFini === "" && iFfin === "") {
                    return true
                } else if (iFini <= datofini && iFfin === "") {
                    return true
                } else if (iFfin >= datoffin && iFini === "") {
                    return true
                } else if (iFini <= datofini && iFfin >= datoffin) {
                    return true
                }
                return false
                //*/
                return true
            } else {
                return true
            }
        },
    )
    
    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual"
    }
    
    $(".button-collapse").sideNav(sideNavOptions)
    
    window.scrollTo(0, 0)
    
    resize_elements()
    
    $(function () {
        $("[data-toggle=\"tooltip\"]").tooltip()
    })
    
    //toastr.info('I do not think that word means what you think it means.', 'Info!')
    //toastr.success('I do not think that word means what you think it means.', 'Success!')
    //toastr.warning('I do not think that word means what you think it means.', 'Warning!')
    //toastr.error('I do not think that word means what you think it means.', 'Error!')
    
    let codeData = document.querySelectorAll(".panel-code")
    codeData.forEach(el => {
        let html = $(el).html()
        let formattedCode = ""
        let classValue = ""
        $(el).empty()
        
        if (el.dataset.datatype === "json") {
            formattedCode = jsonPrettify(html)
            classValue = "json"
        } else if (el.dataset.datatype === "jsonp") {
            formattedCode = jsonPrettify(html)
            classValue = "jsonp"
        } else if (el.dataset.datatype === "json5") {
            formattedCode = jsonPrettify(html)
            classValue = "json5"
        }
        
        let pre = document.createElement("pre")
        let code = document.createElement("code")
        
        code.classList = [`language-${classValue}`]
        code.innerHTML = formattedCode
        
        pre.appendChild(code)
        el.appendChild(pre)
        Prism.highlightElement(code)
    })
    
    $("button.pre_display_button").show()
    $("div.pre_display_el").hide()
    
    $(function () {
        $("textarea.short-description").maxlength({
            alwaysShow: true,
            threshold: 10,
            warningClass: "badge badge-warning",
            limitReachedClass: "badge badge-danger",
            //placement: 'top',
            //preText: 'used ',
            //separator: ' of ',
            //postText: ' chars.',
        })
    })
    
    $(function () {
        toastr.options = {
            "closeButton": true,
            "debug": true,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "md-toast-bottom-right",
            "preventDuplicates": true,
            "showDuration": 300,
            "hideDuration": 1000,
            "timeOut": 5000,
            "extendedTimeOut": 1000,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut",
        }
        
        //toastr["warning"]("asd", "asd")
    })
})

