const Upload = function (file) {
    this.file = file
}

const _image_manager_is_cover_image = document.getElementById("image_manager_is_cover_image")
const _image_manager_title = document.getElementById("image_manager_title")
const _image_manager_caption = document.getElementById("image_manager_caption")
const _image_manager_upload = document.getElementById("image_manager_upload")
const _image_manager_alt_text = document.getElementById("image_manager_alt_text")
const _image_manager_form_data = document.getElementById("image_manager_form_data")
const _image_manager_image_id = document.getElementById("image_manager_id")
const _provider_edit = document.getElementById("provider_edit")
const _vendor_edit = document.getElementById("vendor_edit")
const _provider_company_id = document.getElementById("provider_company_id")
const _vendor_company_id = document.getElementById("vendor_company_id")
Upload.prototype.getType = function () {
    return this.file.type
}

Upload.prototype.getSize = function () {
    return this.file.size
}

Upload.prototype.getName = function () {
    return this.file.name
}

Upload.prototype.doUpload = function () {
    let that = this
    let formData = new FormData()
    
    /**
     * add assoc key values, this will be posts values
     */
    formData.append("file", this.file, this.getName())
    formData.append("upload_file", true)
    formData.append("title", (_image_manager_title.value !== "") ? _image_manager_title.value : null)
    formData.append("caption", (_image_manager_caption.value !== "") ? _image_manager_caption.value : null)
    formData.append("is_cover_image", (_image_manager_is_cover_image.checked !== true) ? parseInt(0) : parseInt(1))
    formData.append("alt", (_image_manager_alt_text.value !== "") ? _image_manager_alt_text.value : null)
    
    /**
     * check if provider, user, unit, or product
     */
    if (_provider_edit) {
        formData.append("directory_id", parseInt(_provider_company_id.value))
        formData.append("directory", "company")
    }
    
    if (_vendor_edit) {
        formData.append("directory_id", parseInt(_vendor_company_id.value))
        formData.append("directory", "company")
    }
    
    $.ajax({
        type: "POST",
        url: "/api/v1.0/images/update",
        xhr: function () {
            var myXhr = $.ajaxSettings.xhr()
            if (myXhr.upload) {
                myXhr.upload.addEventListener("progress", that.progressHandling, false)
            }
            return myXhr
        },
        success: function (data) {
            console.log("data", data)
            let image, result = null
            if (data) {
                if (data.result) {
                    result = data.result
                    if (result[0]) {
                        image = result[0]
                    }
                }
            }
            
            if (image) {
                let imageManager
                if (_provider_edit) {
                    imageManager = $("#companyImages").imageManager()
                }
                
                if (_vendor_edit) {
                    imageManager = $("#companyImages").imageManager()
                }
                
                imageManager.addImage(image)
                toastr.success("Image Uploaded")
                Upload.prototype.resetForm()
                $("button.dropify-clear").click()
            }
            
        },
        error: function (error) {
            toastr.error("Error")
            console.log("error", error)
        },
        async: true,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        timeout: 60000,
    })
}

Upload.prototype.progressHandling = function (event) {
    var percent = 0
    var position = event.loaded || event.position
    var total = event.total
    var progress_bar_id = "#progress-wrp"
    if (event.lengthComputable) {
        percent = Math.ceil(position / total * 100)
    }
    // update progressbars classes so it fits your code
    $(progress_bar_id + " .progress-bar").css("width", +percent + "%")
    $(progress_bar_id + " .status").text(percent + "%")
}

Upload.prototype.progressReset = function () {
    let percent = 0
    let progress_bar_id = "#progress-wrp"
    $(progress_bar_id + " .progress-bar").css("width", +percent + "%")
    $(progress_bar_id + " .status").text(percent + "%")
}

Upload.prototype.resetForm = function () {
    Upload.prototype.progressReset()
    _image_manager_is_cover_image.checked = false
    _image_manager_image_id.value = ""
    _image_manager_title.value = ""
    _image_manager_upload.value = ""
    _image_manager_caption.value = ""
    _image_manager_alt_text.value = ""
    _image_manager_upload.disabled = false
    $(_image_manager_form_data).hide()
}

Upload.prototype.populateForm = function (image) {
    Upload.prototype.progressReset()
    let img = image.path + "/" + image.name + "." + image.extension
    _image_manager_is_cover_image.checked = (image.is_cover_image === 1)
    _image_manager_image_id.value = image.id
    _image_manager_title.value = image.title
    _image_manager_caption.value = image.caption
    _image_manager_alt_text.value = image.alt
    $("button.dropify-clear").click()
    _image_manager_upload.disabled = true
    $(_image_manager_form_data).show()
    
}

$("#image_manager_upload")
  .on("change", function () {
      _image_manager_is_cover_image.checked = false
      _image_manager_image_id.value = ""
      _image_manager_title.value = ""
      _image_manager_caption.value = ""
      _image_manager_alt_text.value = ""
      $(_image_manager_form_data).show()
  })

$("#image_manager_clear_button")
  .on("click", function () {
      Upload.prototype.resetForm()
  })
