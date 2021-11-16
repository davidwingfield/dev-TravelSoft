var Upload = function (file) {
    this.file = file
}

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
    const _provider_edit = document.getElementById("provider_edit")
    const _provider_company_id = document.getElementById("provider_company_id")
    const _image_manager_caption = document.getElementById("image_manager_caption")
    const _image_manager_title = document.getElementById("image_manager_title")
    const _image_manager_alt_text = document.getElementById("image_manager_alt_text")
    const _image_manager_is_cover_image = document.getElementById("image_manager_is_cover_image")
    var that = this
    var formData = new FormData()
    
    // add assoc key values, this will be posts values
    formData.append("file", this.file, this.getName())
    formData.append("upload_file", true)
    formData.append("title", (_image_manager_title.value !== "") ? _image_manager_title.value : null)
    formData.append("caption", (_image_manager_caption.value !== "") ? _image_manager_caption.value : null)
    formData.append("is_cover_image", (_image_manager_is_cover_image.checked !== true) ? parseInt(0) : parseInt(1))
    formData.append("alt", (_image_manager_alt_text.value !== "") ? _image_manager_alt_text.value : null)
    
    if (_provider_edit) {
        formData.append("directory_id", parseInt(_provider_company_id.value))
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
            let image, result = {}
            if (data) {
                if (data.result) {
                    result = data.result
                    console.log("result", result)
                }
                
                if (result[0]) {
                    console.log("result[0]", result[0])
                    image = result[0]
                }
            }
            
            console.log("image", image)
            
            let imageManager
            if (_provider_edit) {
                imageManager = $("#companyImages").imageManager()
            }
            
            imageManager.addImage(image)
            toastr.success("Image Uploaded")
            Upload.prototype.progressReset()
        },
        error: function (error) {
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
    var percent = 0
    var progress_bar_id = "#progress-wrp"
    $(progress_bar_id + " .progress-bar").css("width", +percent + "%")
    $(progress_bar_id + " .status").text(percent + "%")
}
