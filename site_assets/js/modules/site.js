$(document).ready(function () {
    let codeData = document.querySelectorAll(".panel-code")
    window.addEventListener("resize", debounce(function (e) {
        resize_elements("end of resizing")
    }))
    
    if (mdbPreloader) {
        //$("#mdb-preloader").fadeOut(500)
    } else {
        Console.log("no preloader")
    }
    
    new WOW().init()
    
    $(this).scrollTop(0)
    
    toastr.options = toastrOptions
    
    $("body").scrollTop()
    
    $.fn.dataTableExt.afnFiltering.push(
      function (oSettings, aData, iDataIndex) {
          if (oSettings.nTable.id === "dates_table") {
              var iFini = document.getElementById("min").value
              var iFfin = document.getElementById("max").value
              var iStartDateCol = 1
              var iEndDateCol = 1
              
              iFini = iFini.substring(6, 10) + iFini.substring(3, 5) + iFini.substring(0, 2)
              iFfin = iFfin.substring(6, 10) + iFfin.substring(3, 5) + iFfin.substring(0, 2)
              
              var datofini = aData[iStartDateCol].substring(6, 10) + aData[iStartDateCol].substring(3, 5) + aData[iStartDateCol].substring(0, 2)
              var datoffin = aData[iEndDateCol].substring(6, 10) + aData[iEndDateCol].substring(3, 5) + aData[iEndDateCol].substring(0, 2)
              
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
    
    const jsonPrettify = (json) => {
        if (typeof json === "object" && json !== null) {
            return JSON.stringify(json, undefined, '\t')
        }
        
        try {
            const obj = JSON.parse(json)
            return jsonPrettify(obj)
        } catch (e) {
            return json
        }
    }
    
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
})

