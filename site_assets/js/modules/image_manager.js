const ImageManager = (function () {
    "use strict"
    const _button_product_images_toggle = document.getElementById("button_product_images_toggle")
    const _imageManagerCancel = document.getElementById("imageManagerCancel")
    const _imageManagerFormRemoveButton = document.getElementById("imageManagerFormRemoveButton")
    const _fileDimensions = document.getElementById("fileDimensions")
    const _fileWidth = document.getElementById("fileWidth")
    const _fileHeight = document.getElementById("fileHeight")
    const _fileRatio = document.getElementById("fileRatio")
    const _imageManagerForm = document.getElementById("imageManagerForm")
    const _imageManagerFormImagesBlock = document.getElementById("imageManagerFormImagesBlock")
    const _imageManagerFormSubmitButton = document.getElementById("imageManagerFormSubmitButton")
    const _imageManagerFormCancelButton = document.getElementById("imageManagerFormCancelButton")
    const _imageManagerFormClearButton = document.getElementById("imageManagerFormClearButton")
    const _imageManagerFormDetails = document.getElementById("imageManagerFormDetails")
    const _fileName = document.getElementById("fileName")
    const _fileType = document.getElementById("fileType")
    const _fileExtension = document.getElementById("fileExtension")
    const _fileSize = document.getElementById("fileSize")
    const _image_id = document.getElementById("image_id")
    const _image_name = document.getElementById("image_name")
    const _image_title = document.getElementById("image_title")
    const _image_alt = document.getElementById("image_alt")
    const _image_caption = document.getElementById("image_caption")
    const _fileToUpload = document.getElementById("fileToUpload")
    const _image_enabled = document.getElementById("image_enabled")
    const _image_is_cover = document.getElementById("image_is_cover")
    const _image_is_shown = document.getElementById("image_is_shown")
    const _imageManagerPreview = document.getElementById("imageManagerPreview")
    
    let userId = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let source, sourceId, img_toggle
    let imageType = new Map()
    let imageFormRules = {
        rules: {
            image_name: {
                required: true,
            },
            image_title: {
                required: true,
            },
            image_alt: {
                required: true,
            },
            image_caption: {
                required: true,
            },
        },
        messages: {
            image_name: {
                required: "Field Required",
            },
            image_title: {
                required: "Field Required",
            },
            image_alt: {
                required: "Field Required",
            },
            image_caption: {
                required: "Field Required",
            },
        },
    }
    let currentImage = null
    let currentImageCover = null
    let currentImageShown = null
    
    imageType.set("png", "image/png")
    imageType.set("jpg", "image/jpeg")
    imageType.set("gif", "image/gif")
    imageType.set("webp", "image/webp")
    
    $(_fileToUpload)
        .on("change", function (event) {
            if ($(this).val() !== "") {
                fileSelected(event)
            } else {
                resetFileInput(event)
            }
        })
    
    $(_imageManagerFormSubmitButton)
        .on("click", function (event) {
            submit(event)
        })
    
    $(_imageManagerFormClearButton)
        .on("click", function () {
            clear()
        })
    
    $(_imageManagerFormCancelButton)
        .on("click", function () {
            clear()
            hideImageForm()
        })
    
    $(_imageManagerCancel)
        .on("click", function () {
            clear()
            hideImageForm()
        })
    
    $(_imageManagerFormRemoveButton)
        .on("click", function () {
            let imageId = (!isNaN(parseInt(_image_id.value))) ? parseInt(_image_id.value) : null
            
            if (imageId !== null) {
                confirmDialog(`Would you like to delete this image?`, (ans) => {
                    if (ans) {
                        remove(imageId)
                    }
                })
            }
        })
    
    $(_image_is_shown)
        .on("change", function () {
            let imageId = (!isNaN(parseInt(_image_id.value))) ? parseInt(_image_id.value) : null
            let el = document.getElementById("image_" + imageId + "")
            currentImage = imageId
            if (!_image_is_shown.checked) {
                if (_image_is_cover.checked) {
                    currentImageCover = imageId
                    _image_is_cover.checked = false
                    $(el).removeClass("is-cover-image")
                }
                $(el).removeClass("is-shown")
                currentImageShown = true
            } else {
                currentImageShown = false
                $(el).addClass("is-shown")
            }
        })
    
    $(_image_is_cover)
        .on("change", function () {
            let imageId = (!isNaN(parseInt(_image_id.value))) ? parseInt(_image_id.value) : null
            let el = document.getElementById("image_" + imageId + "")
            
            currentImageCover = (!isNaN(parseInt($(".img-thumbnail.is-cover-image").data("id")))) ? parseInt($(".img-thumbnail.is-cover-image").data("id")) : null
            currentImageShown = (_image_is_shown) ? _image_is_shown.checked : null
            
            if (_image_is_cover.checked) {
                if (!_image_is_shown.checked) {
                    _image_is_shown.checked = true
                }
                
                $(".img-thumbnail.is-cover-image").removeClass("is-cover-image")
                $(el).addClass("is-cover-image is-shown")
            }
        })
    
    $("#button_product_images_toggle")
        .on("click", function () {
            $(_fileToUpload).trigger("click")
        })
    
    const handleImageManagerError = function (msg, title, level) {
        console.groupCollapsed("ImageManager.handleImageManagerError")
        // ----
        
        if (!title) {
            title = "Image"
        }
        
        if (!level) {
            level = "success"
        }
        
        toastr[level](`${msg}`, title)
        
        // ----
        console.groupEnd()
    }
    const remove = function (image_id) {
        console.groupCollapsed("ImageManager.remove")
        // ----
        
        if (!image_id || !ImageManager.source || !ImageManager.sourceId) {
            return
        }
        
        let dataToSend = {
            image_id: image_id,
            source: ImageManager.source,
            source_id: ImageManager.sourceId,
        }
        
        console.log("dataToSend", dataToSend)
        
        sendRemoveRequest({
            image_id: image_id,
            source: ImageManager.source,
            source_id: ImageManager.sourceId,
        }, function (data) {
            if (data) {
                console.log("data", data)
            }
        })
        
        // ----
        console.groupEnd()
    }
    const sendRemoveRequest = function (dataToSend, callback) {
        console.groupCollapsed("ImageManager.sendRemoveRequest")
        // ----
        
        if (dataToSend) {
            let url = "/api/v1.0/images/remove"
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    }
                })
            } catch (e) {
                console.log("error", e)
                return handleImageManagerError("Error Removing Image.", "Image Manager", "error")
            }
        }
        // ----
        console.groupEnd()
    }
    const submit = function (event) {
        console.groupCollapsed("ImageManager.submit")
        // ----
        
        let isValid = validate()
        if (isValid) {
            confirmDialog(`Would you like to update?`, (ans) => {
                if (ans) {
                    uploadFile(event)
                }
            })
        }
        
        // ----
        console.groupEnd()
    }
    const validate = function () {
        console.groupCollapsed("ImageManager.validate")
        // ----
        
        // ----
        console.groupEnd()
        return $(_imageManagerForm).valid()
    }
    const sendUpdateRequest = function (dataToSend, callback) {
        console.groupCollapsed("ImageManager.sendUpdateRequest")
        // ----
        
        if (dataToSend) {
            let url = "/api/v1.0/images/update"
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    }
                })
            } catch (e) {
                console.log("error", e)
                return handleImageManagerError("Error", "Image Manager", "error")
            }
        }
        // ----
        console.groupEnd()
    }
    const uploadFile = function (event) {
        console.groupCollapsed("ImageManager.uploadFile")
        // ----
        
        const _fileToUpload = document.getElementById("fileToUpload")
        let filePath, fileHeight, fileWidth, fileSize, fileExtension, fileName,
            fileType, fileRatio, ratioHeight, ratioWidth, fileDimensions, source, sourceId,
            fileTitle, fileAlt, fileCaption, fileIsShown, fileIsCover, fileEnabled, fileId,
            fileThumbsPath = null
        let formData = new FormData()
        let xhr = new XMLHttpRequest()
        
        fileId = (_image_id && !isNaN(parseInt(_image_id.value))) ? parseInt(_image_id.value) : null
        fileCaption = (_image_caption && _image_caption.value !== "") ? _image_caption.value : null
        fileTitle = (_image_title && _image_title.value !== "") ? _image_title.value : null
        fileAlt = (_image_alt && _image_alt.value !== "") ? _image_alt.value : null
        fileIsShown = (_image_is_shown && _image_is_shown.checked === true) ? 1 : 0
        fileEnabled = (_image_enabled && _image_enabled.checked === true) ? 1 : 0
        fileIsCover = (_image_is_cover && _image_is_cover.checked === true) ? 1 : 0
        
        if (fileId !== null) {
            fileName = document.getElementById("fileName").innerText
            fileExtension = (document.getElementById("fileExtension")) ? document.getElementById("fileExtension").innerText : null
            fileSize = (document.getElementById("fileSize")) ? document.getElementById("fileSize").innerText : null
            fileDimensions = (document.getElementById("fileDimensions")) ? document.getElementById("fileDimensions").innerText : null
            fileWidth = (document.getElementById("fileWidth")) ? (!isNaN(parseInt(document.getElementById("fileWidth").innerText))) ? parseInt(document.getElementById("fileWidth").innerText) : null : null
            fileHeight = (document.getElementById("fileHeight")) ? (!isNaN(parseInt(document.getElementById("fileHeight").innerText))) ? parseInt(document.getElementById("fileHeight").innerText) : null : null
            
            let dataToSend = removeNulls({
                id: fileId,
                name: fileName,
                alt: fileAlt,
                title: fileTitle,
                caption: fileCaption,
                is_cover: fileIsCover,
                path: `/public/img/${ImageManager.source}/${ImageManager.sourceId}`,
                thumbs_path: `/public/thumbs/${ImageManager.source}/${ImageManager.sourceId}`,
                extension: fileExtension,
                dimensions: fileDimensions,
                size: fileSize,
                height: fileHeight,
                width: fileWidth,
                enabled: fileEnabled,
                directory: ImageManager.source,
                directory_id: ImageManager.sourceId,
                is_shown: fileIsShown,
            })
            
            console.log("dataToSend", dataToSend)
            
            sendUpdateRequest(dataToSend, function (data) {
                if (data) {
                    let detail = set((data[0]) ? data[0] : data)
                    console.log("detail", detail)
                    let image = ImageManager.all.get(detail.id)
                    console.log("image", image)
                    if (image) {
                    
                    }
                    
                    ImageManager.all.set(detail.id, detail)
                    
                    toastr["success"](`Image Manager: ${detail.name} - has been updated`, "Image Manager")
                }
            })
            
        } else {
            buildImageObject(event, function (data) {
                console.log("data", data)
                source = data.source
                sourceId = data.source_id
                filePath = (data.path) ? data.path : null
                fileHeight = (!isNaN(parseInt(data.height))) ? parseInt(data.height) : null
                fileWidth = (!isNaN(parseInt(data.width))) ? parseInt(data.width) : null
                fileName = (data.name) ? data.name : null
                fileExtension = (data.extension) ? data.extension : null
                fileSize = (data.size) ? data.size : null
                fileRatio = (data.ratio) ? data.ratio : null
                fileType = (data.type) ? data.type : null
                fileThumbsPath = data.thumbs_path
                fileDimensions = (data.dimensions) ? data.dimensions : null
                
                formData.append("dimensions", fileDimensions)
                formData.append("extension", fileExtension)
                formData.append("file", _fileToUpload.files[0], `${fileName}.${fileExtension}`)
                formData.append("height", fileHeight)
                formData.append("name", fileName)
                formData.append("path", filePath)
                formData.append("thumbs_path", fileThumbsPath)
                formData.append("ratio", fileRatio)
                formData.append("size", fileSize)
                formData.append("type", fileType)
                formData.append("width", fileWidth)
                formData.append("directory", source)
                formData.append("directory_id", sourceId)
                formData.append("title", fileTitle)
                formData.append("enabled", fileEnabled)
                formData.append("is_shown", fileIsShown)
                formData.append("is_cover", fileIsCover)
                formData.append("alt", fileAlt)
                formData.append("caption", fileCaption)
                
                xhr.upload.addEventListener("progress", uploadProgress, false)
                xhr.addEventListener("load", uploadComplete, false)
                xhr.addEventListener("error", uploadFailed, false)
                xhr.addEventListener("abort", uploadCanceled, false)
                
                switch (source.toLowerCase()) {
                    case "product":
                        xhr.open("POST", "/api/v1.0/upload/product")
                        xhr.send(formData)
                        break
                    case "unit":
                        console.log("unit")
                        break
                    case "company":
                        console.log("company")
                        break
                    case "user":
                        console.log("user")
                        break
                    default:
                        return
                }
            })
        }
        
        // ----
        console.groupEnd()
    }
    const uploadProgress = function (event) {
        console.groupCollapsed("ImageManager.uploadProgress")
        // ----
        
        if (event.lengthComputable) {
            let percentComplete = Math.round(event.loaded * 100 / event.total)
            document.getElementById("progressNumber").innerHTML = percentComplete.toString() + "%"
        } else {
            document.getElementById("progressNumber").innerHTML = "unable to compute"
        }
        
        // ----
        console.groupEnd()
    }
    const uploadComplete = function (event) {
        console.groupCollapsed("ImageManager.uploadComplete")
        // ----
        
        let results = null
        
        if (event) {
            if (event.target) {
                if (event.target.responseText) {
                    const image = JSON.parse(event.target.responseText)
                    
                    if (image) {
                        if (image.status) {
                            if (image.status === "success" && image.result) {
                                results = image.result
                                if (image.result.length === 1) {
                                    results = image.result[0]
                                }
                                let detail = set(results)
                                let allImages = Array.from(ImageManager.all.values())
                                let counter = allImages.length
                                
                                console.log("image", detail)
                                
                                $(_imageManagerFormImagesBlock).append(buildImageThumbnail(detail))
                                
                                ImageManager.all.set(detail.id, detail)
                                
                                console.log("ImageManager.all", ImageManager.all)
                                console.log("detail", detail)
                                
                                clear()
                                hideImageForm()
                                
                                toastr["success"](`Image was added.`, "Image Manager")
                            }
                        }
                    }
                }
            }
        }
        // ----
        console.groupEnd()
    }
    const uploadFailed = function (event) {
        console.groupCollapsed("ImageManager.uploadFailed")
        // ----
        
        console.log("ImageManager.uploadFailed")
        console.log("There was an error attempting to upload this file.")
        // ----
        console.groupEnd()
    }
    const uploadCanceled = function (event) {
        console.groupCollapsed("ImageManager.uploadCanceled")
        // ----
        
        console.log("ImageManager.uploadCanceled")
        console.log("This upload has been canceled by the user or the browser dropped the connection.")
        // ----
        console.groupEnd()
    }
    const defaultDetail = function () {
        console.groupCollapsed("ImageManager.defaultDetail")
        // ----
        
        return {
            alt: null,
            caption: null,
            created_by: userId,
            date_created: formatDateMySQL(),
            date_modified: formatDateMySQL(),
            dimensions: null,
            enabled: 1,
            extension: null,
            height: null,
            id: null,
            is_cover: 0,
            is_shown: 1,
            modified_by: userId,
            name: null,
            note: null,
            path: null,
            size: null,
            thumbs_path: null,
            title: null,
            width: null,
        }
        // ----
        console.groupEnd()
    }
    const set = function (image) {
        console.groupCollapsed("ImageManager.set")
        // ----
        
        let detail = defaultDetail()
        if (image) {
            detail.alt = (image.alt) ? image.alt : null
            detail.caption = (image.caption) ? image.caption : null
            detail.created_by = (image.created_by) ? image.created_by : userId
            detail.date_created = (image.date_created) ? image.date_created : formatDateMySQL()
            detail.date_modified = (image.date_modified) ? image.date_modified : formatDateMySQL()
            detail.dimensions = (image.dimensions) ? image.dimensions : null
            detail.enabled = (!isNaN(parseInt(image.enabled))) ? parseInt(image.enabled) : 1
            detail.extension = (image.extension) ? image.extension : null
            detail.height = (image.height) ? image.height : null
            detail.id = (!isNaN(parseInt(image.id))) ? parseInt(image.id) : null
            detail.is_cover = (image.is_cover) ? image.is_cover : 0
            detail.is_shown = (image.is_shown && image.is_shown === 1) ? 1 : 0
            detail.modified_by = (image.modified_by) ? image.modified_by : userId
            detail.name = (image.name) ? image.name : null
            detail.note = (image.note) ? image.note : null
            detail.path = (image.path) ? image.path : null
            detail.size = (image.size) ? image.size : null
            detail.thumbs_path = (image.thumbs_path) ? image.thumbs_path : null
            detail.title = (image.title) ? image.title : null
            detail.width = (image.width) ? image.width : null
        }
        
        // ----
        console.groupEnd()
        ImageManager.detail = detail
        return detail
    }
    const resetFileInput = function (event) {
        console.groupCollapsed("ImageManager.resetFileInput")
        // ----
        
        let _fileToUpload = document.getElementById("fileToUpload")
        let _fileName = document.getElementById("fileName")
        let _fileSize = document.getElementById("fileSize")
        let _fileType = document.getElementById("fileType")
        let _fileExtension = document.getElementById("fileExtension")
        let _imageManagerPreview = document.getElementById("imageManagerPreview")
        let _fileToUploadDisplay = document.getElementById("fileToUploadDisplay")
        
        $(_fileName).html("&nbsp;")
        $(_fileSize).html("&nbsp;")
        $(_fileType).html("&nbsp;")
        $(_fileExtension).html("&nbsp;")
        $(_fileToUploadDisplay).html("CHOOSE FILE")
        $(_imageManagerPreview).attr("src", "/public/img/placeholder.jpg")
        _image_is_shown.checked = true
        // ----
        console.groupEnd()
    }
    const clear = function () {
        console.groupCollapsed("ImageManager.clear")
        // ----
        
        resetFileInput()
        resetImageForm()
        $("img.img-thumbnail").removeClass("selected")
        
        // ----
        console.groupEnd()
    }
    const getFileSize = function (file) {
        console.groupCollapsed("ImageManager.getFileSize")
        // ----
        
        let fileSize = null
        
        if (file.size > 1024 * 1024) {
            fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB'
        } else {
            fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB'
        }
        
        // ----
        console.groupEnd()
        return fileSize
    }
    const getFileName = function (file) {
        console.groupCollapsed("ImageManager.getFileName")
        // ----
        
        let fileName, fileExtension = null
        let fileNameTemp = []
        
        if (file) {
            if (file.name) {
                let fileNameParts = file.name.split(".")
                
                if (fileNameParts.length) {
                    fileExtension = fileNameParts[fileNameParts.length - 1]
                    for (let n = 0; n < fileNameParts.length - 1; n++) {
                        fileNameTemp.push(fileNameParts[n])
                    }
                    fileName = fileNameTemp.join(".")
                }
                
            }
        }
        
        // ----
        console.groupEnd()
        return removeNulls({
            "name": fileName,
            "extension": fileExtension,
        })
    }
    const getFileType = function (file) {
        console.groupCollapsed("ImageManager.getFileType")
        // ----
        
        let fileType = null
        
        if (file) {
            if (file.type) {
                fileType = file.type
            }
        }
        
        // ----
        console.groupEnd()
        return fileType
    }
    const buildImageObject = function (event, callback) {
        console.groupCollapsed("ImageManager.buildImageObject")
        // ----
        
        const _fileToUpload = document.getElementById("fileToUpload")
        const _imageManagerPreview = document.getElementById("imageManagerPreview")
        const _imageManagerForm = document.getElementById("imageManagerForm")
        const reader = new FileReader()
        const img = new Image()
        
        let filePath, fileHeight, fileWidth, fileSize, fileExtension, fileName,
            fileType, fileRatio, ratioHeight, ratioWidth, fileDimensions, source, sourceId,
            fileThumbsPath, filePathFull, fileThumbsPathFull = null
        
        if (event) {
            if (_imageManagerForm) {
                if (_imageManagerForm.dataset.source) {
                    source = (_imageManagerForm.dataset.source) ? _imageManagerForm.dataset.source : null
                    sourceId = (_imageManagerForm.dataset.sourceId && !isNaN(parseInt(_imageManagerForm.dataset.sourceId))) ? parseInt(_imageManagerForm.dataset.sourceId) : null
                    filePath = `/public/img/${source}/${sourceId}`
                    fileThumbsPath = `/public/thumbs/${source}/${sourceId}`
                    
                    if (_fileToUpload) {
                        let file = _fileToUpload.files[0]
                        console.log("file", file)
                        $(_imageManagerPreview).attr("src", event.result)
                        
                        if (file) {
                            let fileNameParts = getFileName(file)
                            console.log("fileNameParts", fileNameParts)
                            fileExtension = (fileNameParts.extension) ? fileNameParts.extension : null
                            fileName = (fileNameParts.name) ? fileNameParts.name : null
                            fileSize = getFileSize(file)
                            fileType = getFileType(file)
                            filePathFull = filePath + "/" + fileName + "." + fileExtension
                            fileThumbsPathFull = fileThumbsPath + "/" + fileName + "." + fileExtension
                            
                            reader.onload = function (e) {
                                img.onload = function () {
                                    fileHeight = (this.height) ? this.height : null
                                    fileWidth = (this.width) ? this.width : null
                                    if (!is_null(fileWidth) && !is_null(fileHeight)) {
                                        let ratio = gcd(fileWidth, fileHeight)
                                        fileDimensions = `${fileWidth} x ${fileHeight}`
                                        ratioHeight = fileHeight / ratio
                                        ratioWidth = fileWidth / ratio
                                        fileRatio = `${ratioWidth}:${ratioHeight}`
                                    } else {
                                        console.error("Missing Height or Width")
                                    }
                                    
                                    return callback({
                                        "file": file,
                                        "source": source,
                                        "source_id": (!isNaN(parseInt(sourceId))) ? parseInt(sourceId) : null,
                                        "name": (!is_null(fileName)) ? fileName : null,
                                        "height": (!isNaN(parseInt(fileHeight))) ? parseInt(fileHeight) : null,
                                        "width": (!isNaN(parseInt(fileWidth))) ? parseInt(fileWidth) : null,
                                        "path": (!is_null(filePath)) ? filePath : null,
                                        "full_path": (!is_null(filePathFull)) ? filePathFull : null,
                                        "full_thumbs_path": (!is_null(fileThumbsPathFull)) ? fileThumbsPathFull : null,
                                        "thumbs_path": (!is_null(fileThumbsPath)) ? fileThumbsPath : null,
                                        "size": (!is_null(fileSize)) ? fileSize : null,
                                        "extension": (!is_null(fileExtension)) ? fileExtension : null,
                                        "type": (!is_null(fileType)) ? fileType : null,
                                        "ratio": (!is_null(fileRatio)) ? fileRatio : null,
                                        "dimensions": (!is_null(fileDimensions)) ? fileDimensions : null,
                                    })
                                }
                                
                                img.src = e.target.result
                            }
                            reader.readAsDataURL(_fileToUpload.files[0])
                        }
                    }
                }
            }
        }
        
        // ----
        console.groupEnd()
    }
    const fileSelected = function (event) {
        console.groupCollapsed("ImageManager.fileSelected")
        // ----
        
        clear()
        
        let _fileToUpload = document.getElementById("fileToUpload")
        let _fileName = document.getElementById("fileName")
        let _fileSize = document.getElementById("fileSize")
        let _fileType = document.getElementById("fileType")
        let _fileExtension = document.getElementById("fileExtension")
        let _imageManagerPreview = document.getElementById("imageManagerPreview")
        let _fileToUploadDisplay = document.getElementById("fileToUploadDisplay")
        
        buildImageObject(event, function (data) {
            if (data) {
                console.log("data", data)
                let fileName = (data.name) ? data.name : null
                let fileSize = (data.size) ? data.size : null
                let fileType = (data.type) ? data.type : null
                let fileExtension = (data.extension) ? data.extension : null
                let fileRatio = (data.ratio) ? data.ratio : null
                let fileDimensions = (data.dimensions) ? data.dimensions : null
                let fileWidth = (data.width) ? data.width : null
                let fileHeight = (data.height) ? data.height : null
                let reader = new FileReader()
                
                $(_fileName).html(fileName)
                $(_fileSize).html(fileSize)
                $(_fileType).html(fileType)
                $(_fileExtension).html(fileExtension)
                $(_fileToUploadDisplay).html(fileName)
                $(_fileRatio).html(fileRatio)
                $(_fileWidth).html(fileWidth)
                $(_fileHeight).html(fileHeight)
                $(_fileDimensions).html(fileDimensions)
                
                $(_imageManagerPreview).attr("src")
                $(_image_id).val("")
                $(_image_name).val(fileName)
                
                reader.onload = function (e) {
                    $(_imageManagerPreview).attr("src", e.target.result)
                }
                reader.readAsDataURL(_fileToUpload.files[0])
                renderImageForm()
            }
        })
        
        // ----
        console.groupEnd()
    }
    const hideImageForm = function () {
        console.groupCollapsed("ImageManager.hideImageForm")
        // ----
        
        $(_fileToUpload).removeClass("disabled")
        $(_button_product_images_toggle).removeClass("disabled")
        
        _fileToUpload.disabled = false
        _button_product_images_toggle.disabled = false
        
        _imageManagerFormSubmitButton.innerText = "choose file"
        
        $(_imageManagerFormDetails).hide()
        
        // ----
        console.groupEnd()
    }
    const renderImageForm = function () {
        console.groupCollapsed("ImageManager.renderImageForm")
        // ----
        
        $(_fileToUpload).addClass("disabled")
        $(_button_product_images_toggle).addClass("disabled")
        
        _fileToUpload.disabled = true
        _button_product_images_toggle.disabled = true
        $("#imageManagerFormDetails").show()
        
        // ----
        console.groupEnd()
    }
    const populateImageForm = function (image) {
        console.groupCollapsed("ImageManager.populateImageForm")
        // ----
        
        if (image) {
            console.log(image)
            let fileType = (image.extension) ? imageType.get(image.extension) : null
            let fileAlt = (image.alt) ? image.alt : null
            let fileCaption = (image.caption) ? image.caption : null
            let fileCreatedBy = (!isNaN(parseInt(image.created_by))) ? parseInt(image.created_by) : userId
            let fileDateCreated = (image.date_created) ? image.date_created : formatDateMySQL()
            let fileDateModified = (image.date_modified) ? image.date_modified : formatDateMySQL()
            let fileDimensions = (image.dimensions) ? image.dimensions : null
            let fileEnabled = (image.enabled && image.enabled === 1)
            let fileExtension = (image.extension) ? image.extension : null
            let fileHeight = (!isNaN(parseInt(image.height))) ? parseInt(image.height) : null
            let fileId = (!isNaN(parseInt(image.id))) ? parseInt(image.id) : null
            let fileIsCoverImage = !!(image.is_cover && image.is_cover === 1)
            let fileIsShown = !!(image.is_shown && image.is_shown === 1)
            let fileModifiedBy = (!isNaN(parseInt(image.modified_by))) ? parseInt(image.modified_by) : userId
            let fileName = (image.name) ? image.name : null
            let fileNote = (image.note) ? image.note : null
            let filePath = (image.path) ? image.path : null
            let fileSize = (image.size) ? image.size : null
            let fileTitle = (image.title) ? image.title : null
            let fileWidth = (!isNaN(parseInt(image.width))) ? parseInt(image.width) : null
            let ratio = gcd(fileWidth, fileHeight)
            let ratioHeight = fileHeight / ratio
            let ratioWidth = fileWidth / ratio
            let fileRatio = `${ratioWidth}:${ratioHeight}`
            let filePreview = `${filePath}/${fileName}.${fileExtension}`
            
            _fileName.innerHTML = fileName
            _fileType.innerHTML = fileType
            _fileExtension.innerHTML = fileExtension
            _fileSize.innerHTML = fileSize
            _fileRatio.innerHTML = fileRatio
            _fileDimensions.innerHTML = fileDimensions
            _fileWidth.innerHTML = fileWidth
            _fileHeight.innerHTML = fileHeight
            _image_id.value = fileId
            _image_name.value = fileName
            _image_title.value = fileTitle
            _image_alt.value = fileAlt
            _image_caption.value = fileCaption
            
            _image_enabled.checked = fileEnabled
            _image_is_cover.checked = fileIsCoverImage
            _image_is_shown.checked = fileIsShown
            
            $(_imageManagerPreview)
                .attr("src", filePreview)
            
            renderImageForm()
        }
        
        // ----
        console.groupEnd()
    }
    const resetImageForm = function () {
        console.groupCollapsed("ImageManager.resetImageForm")
        // ----
        
        let filePreview = `/public/img/placeholder.jpg`
        
        _fileName.innerHTML = "&nbsp;"
        _fileType.innerHTML = "&nbsp;"
        _fileExtension.innerHTML = "&nbsp;"
        _fileSize.innerHTML = "&nbsp;"
        _fileRatio.innerHTML = "&nbsp;"
        _fileWidth.innerHTML = "&nbsp;"
        _fileHeight.innerHTML = "&nbsp;"
        _fileDimensions.innerHTML = "&nbsp;"
        
        _image_id.value = ""
        _image_name.value = ""
        _image_title.value = ""
        _image_alt.value = ""
        _image_caption.value = ""
        
        _image_enabled.checked = true
        _image_is_cover.checked = false
        _image_is_shown.checked = true
        
        $(_imageManagerPreview)
            .attr("src", filePreview)
        
        if (currentImage !== null) {
            let isCover = (currentImageCover !== null && currentImageCover === true) ? "is-cover-image" : ""
            let isShown = (currentImageCover !== null && currentImageCover === true) ? "is-shown" : ""
            $(".img-thumbnail.is-cover-image").removeClass("is-cover-image")
            $("#image_" + currentImage).addClass(`${isCover} ${isShown}`)
            currentImage = null
            currentImageCover = null
            currentImageShown = null
        }
        
        $("img.img-thumbnail").removeClass("selected")
        
        // ----
        console.groupEnd()
    }
    const edit = function (image) {
        console.groupCollapsed("ImageManager.edit")
        // ----
        
        if (image) {
            clear()
            let imageId = (!isNaN(parseInt(image.id))) ? image.id : null
            let elementId = (imageId) ? "image_" + imageId.toString() : null
            let imageElement = document.getElementById(elementId)
            if (imageElement) {
                $(imageElement).addClass("selected")
                populateImageForm(image)
                _imageManagerFormSubmitButton.innerText = "Save"
            }
        }
        
        // ----
        console.groupEnd()
    }
    const buildImageThumbnail = function (image) {
        console.groupCollapsed("ImageManager.buildImageThumbnail")
        // ----
        
        let isCoverClass = ""
        let isShownClass = ""
        
        if (image) {
            let src = (image.path) ? image.path : null
            let alt = (image.alt) ? image.alt : null
            let imageId = (image.id && !isNaN(parseInt(image.id))) ? parseInt(image.id) : null
            let isCover = !!(image.is_cover && image.is_cover === 1)
            let isShown = !!(image.is_shown && image.is_shown === 1)
            let thumbsPath = (image.thumbs_path) ? image.thumbs_path : null
            let path = (image.path) ? image.path : null
            let name = (image.name) ? image.name : null
            let extension = (image.extension) ? image.extension : null
            
            if (isCover) {
                isCoverClass = "is-cover-image"
            }
            
            if (isShown) {
                isShownClass = "is-shown"
            }
            
            if (thumbsPath !== null && path !== null && name !== null && extension !== null) {
                let $IMG = $("<img/>", {
                    id: "image_" + imageId,
                    attr: {
                        "data-id": imageId,
                    },
                    class: `img-thumbnail ${isCoverClass} ${isShownClass}`,
                    alt: alt,
                    src: `${thumbsPath}/${name}.${extension}`,
                })
                    .on("click", function () {
                        let el = this
                        let image_id = (el.dataset.id && !isNaN(parseInt(el.dataset.id))) ? parseInt(el.dataset.id) : null
                        
                        if (image_id) {
                            let image = ImageManager.all.get(image_id)
                            
                            if (image) {
                                edit(image)
                            } else {
                                console.log("ImageManager.all", ImageManager.all)
                            }
                            
                        } else {
                            console.log("nope")
                        }
                    })
                
                return $("<div/>", {
                    class: "col-12 col-md-4 mb-2",
                })
                    .append($IMG)
            }
            
        }
        
        // ----
        console.groupEnd()
    }
    const loadAll = function (images) {
        console.groupCollapsed("ImageManager.loadAll")
        // ----
        
        ImageManager.all = new Map()
        
        if (images) {
            let counter = 0
            $.each(images, function (k, image) {
                let detail = set(image)
                ImageManager.all.set(detail.id, detail)
                $(_imageManagerFormImagesBlock).append(buildImageThumbnail(detail))
            })
        }
        
        // ----
        console.groupEnd()
    }
    const get = function (dataToSend, callback) {
        console.groupCollapsed("ImageManager.get")
        // ----
        
        if (dataToSend) {
            let url = `/api/v1.0/images/${ImageManager.source}/${ImageManager.sourceId}`
            try {
                sendGetRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    }
                })
            } catch (e) {
                console.log("error", e)
                return handleImageManagerError("Error Retrieving Images.", "Image Manager", "error")
            }
        }
        
        // ----
        console.groupEnd()
    }
    const init = function (options) {
        console.groupCollapsed("ImageManager.init")
        // ----
        
        if (options && options.source) {
            source = (options.source) ? options.source : null
            sourceId = (options.id && !isNaN(parseInt(options.id))) ? parseInt(options.id) : null
            //let images = (options.images) ? options.images : []
            
            $(_imageManagerFormImagesBlock).empty()
            //loadAll(images)
            hideImageForm()
            
            initializeValidator(imageFormRules)
            
            ImageManager.source = source
            ImageManager.sourceId = sourceId
            ImageManager.validator = $(_imageManagerForm).validate()
            
            get({}, function (images) {
                loadAll(images)
            })
            
        }
        
        // ----
        console.groupEnd()
    }
    return {
        source: null,
        sourceId: null,
        detail: {},
        all: new Map(),
        init: function (options) {
            return init(options)
        },
    }
    
})()

