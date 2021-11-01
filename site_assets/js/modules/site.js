$(document).ready(function () {
    AlertBox.hide()
    //AlertBox.show("Message", "Title", "danger")
    const but_toggle = document.querySelectorAll(".but_toggle")
    
    window.addEventListener("resize", debounce(function (e) {
        resize_elements("end of resizing")
    }))
    but_toggle.forEach(el => el.addEventListener("click", event => {
        if (el.dataset.texted) {
            let editorId = el.dataset.texted
            let editor = $("#" + editorId)
            if (tinyMCE.get(editorId)) {
                editor.val(htmlDecode(editor.val()))
                tinymce.remove("#" + editorId)
            } else {
                editor.val(htmlDecode(editor.val()))
                addTinyMCE(editorId)
            }
        }
    }))
    
    if (mdbPreloader) {
        //$("#mdb-preloader").fadeOut(500)
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
    
})
