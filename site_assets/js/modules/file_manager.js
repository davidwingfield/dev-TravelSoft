function FileManager (element, options) {
    if (!(options && options.source && element)) {
        console.log("Missing options.")
        console.log("|__ options", options)
        console.log("|__ options.source", options.source)
        console.log("|__ options.sourceId", options.sourceId)
        return
    }
    let userId = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let source = options.source
    let sourceId = options.sourceId
    let baseId = "file_manager" + "_" + source
    let defaults = {
        defaultFile: "", // - /public/img/placeholder.jpg
        maxFileSize: 0,
        minWidth: 0,
        maxWidth: 0,
        minHeight: 0,
        maxHeight: 0,
        showRemove: true,
        showLoader: true,
        showErrors: true,
        errorTimeout: 3000,
        errorsPosition: "overlay",
        imgFileExtensions: ["png", "jpg", "jpeg", "gif", "bmp", "webp"],
        maxFileSizePreview: "5M",
        allowedFormats: ["portrait", "square", "landscape"],
        allowedFileExtensions: ["*"],
        urls: {
            "remove": `/`,
            "update": `/`,
            "get": `get`,
            "upload": `/`,
        },
        messages: {
            "default": "Drag and drop a file here or click",
            "replace": "Drag and drop or click to replace",
            "remove": "Remove",
            "error": "Ooops, something wrong happended.",
        },
        error: {
            "fileSize": "The file size is too big ({{ value }} max).",
            "minWidth": "The image width is too small ({{ value }}}px min).",
            "maxWidth": "The image width is too big ({{ value }}}px max).",
            "minHeight": "The image height is too small ({{ value }}}px min).",
            "maxHeight": "The image height is too big ({{ value }}px max).",
            "imageFormat": "The image format is not allowed ({{ value }} only).",
            "fileExtension": "The file is not allowed ({{ value }} only).",
        },
        tpl: {
            gallery: {
                wrap: ``,
            },
            preview: {
                wrapper: `<section id="${baseId}_preview" class="mb-4 p-0 filemanager-preview-wrapper d-flex align-items-center justify-content-center" />`,
                error: `<img id="${baseId}_image" src="/public/img/placeholder.jpg" alt="Preview Placeholder" class="img-fluid" />`,
                container: `<div class="filemanager-preview "/>`,
                loader: "<div class='filemanager-loader'></div>",
                message: `<div class="filemanager-message w-100 text-center d-flex flex-column"><i class="fas fa-upload w-100 fa-4x mb-2"></i><p class="w-100 mt-4">Drag and drop a file here or click</p></div>`,//"<div class=\"fileManager-message\"><i class=\"fas fa-upload mr-2\"></i> <p>Drop File Here</p></div>",
                errorsContainer: "<div class=\"filemanager-errors-container\"><ul></ul></div>",
                errorLine: "<p class=\"filemanager-error\"></p>",
                clearButton: `<button type="button" class="filemanager-clear">remove</button>`,
            },
            filename: "<p class=\"fileManager-filename\"><span class=\"fileManager-filename-inner\"></span></p>",
        },
    }
    
    this.userId = userId
    this.element = element
    this.source = source
    this.sourceId = sourceId
    this.baseId = baseId
    this.isInit = false
    this.errorsEvent = $.Event("filemanager.errors")
    this.errorsEvent.errors = []
    this.isDisabled = false
    this.all = new Map()
    this.images = (options.images) ? options.images : []
    this.inputs = {
        labels: {},
        buttons: {},
        fields: {},
        displays: {},
        errors: {},
    }
    this.detail = {
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
    this.file = {
        object: null,
        name: null,
        size: null,
        width: null,
        height: null,
        type: null,
    }
    this.settings = $.extend(true, defaults, options)
    
    if (!Array.isArray(this.settings.allowedFormats)) {
        this.settings.allowedFormats = this.settings.allowedFormats.split(" ")
    }
    
    if (!Array.isArray(this.settings.allowedFileExtensions)) {
        this.settings.allowedFileExtensions = this.settings.allowedFileExtensions.split(" ")
    }
    
    this.uploadProgress = this.uploadProgress.bind(this)
    this.uploadComplete = this.uploadComplete.bind(this)
    this.uploadFailed = this.uploadFailed.bind(this)
    this.uploadCanceled = this.uploadCanceled.bind(this)
    this.validate = this.validate.bind(this)
    this.isShown = this.isShown.bind(this)
    this.isCover = this.isCover.bind(this)
    this.clearElement = this.clearElement.bind(this)
    this.formHide = this.formHide.bind(this)
    this.formShow = this.formShow.bind(this)
    this.formRemove = this.formRemove.bind(this)
    this.formCancel = this.formCancel.bind(this)
    this.onChange = this.onChange.bind(this)
    this.formClear = this.formClear.bind(this)
    this.fileSelected = this.fileSelected.bind(this)
    this.formReset = this.formReset.bind(this)
    this.open = this.open.bind(this)
    this.load = this.load.bind(this)
    this.onFileReady = this.onFileReady.bind(this)
    this.displaySet = this.displaySet.bind(this)
    this.buildImageThumbnails = this.buildImageThumbnails.bind(this)
    this.formUpload = this.formUpload.bind(this)
    this.sendUpdateRequest = this.sendUpdateRequest.bind(this)
    
    this.init(options)
    //this.translateMessages()
    this.createElements()
    this.assignEvents()
    this.loadAll()
    
    this.formReset()
}

FileManager.prototype.createPreviewElements = function () {
    console.log("FileManager.createPreviewElements()")
    // ----
    
    let messageWrapper
    
    this.previewWrapper = $(this.settings.tpl.preview.wrapper)
    this.previewLoader = $(this.settings.tpl.preview.loader)
    this.previewContainer = $(this.settings.tpl.preview.container)
    this.previewMessage = $(this.settings.tpl.preview.message)
    
    this.previewWrapper.append(this.previewContainer)
    
    messageWrapper = $(this.settings.tpl.preview.message).insertBefore(this.previewContainer)
    $(this.settings.tpl.preview.errorLine).appendTo(messageWrapper)
    
    if (this.settings.showLoader === true) {
        this.loader = $(this.settings.tpl.preview.loader)
        this.previewWrapper.append(this.loader)
        this.hideLoader()
    }
    
    if (this.settings.showErrors === true) {
        this.previewErrorsContainer = $(this.settings.tpl.preview.errorsContainer)
        
        if (this.settings.errorsPosition === "outside") {
            this.previewErrorsContainer.insertAfter(this.previewWrapper)
        } else {
            this.previewWrapper.append(this.previewErrorsContainer)
        }
    }
    
    if (this.isDisabled === false && this.settings.showRemove === true) {
        this.clearButton = $(this.settings.tpl.preview.clearButton)
        this.previewWrapper.append(this.clearButton)
        this.clearButton.on("click", this.clearElement)
    }
    
    let defaultFile = this.settings.defaultFile || ""
    if (defaultFile.trim() !== "") {
        this.file.name = this.cleanFilename(defaultFile)
        this.setPreview(this.isImage(), defaultFile)
    }
    
    this.preview = this.previewWrapper
}
FileManager.prototype.setPreview = function (previewable, src) {
    console.log("FileManager.setPreview(previewable, src)", this)
    // ----
    
    let render = this.previewContainer
    
    this.hideLoader()
    this.preview.removeClass("has-error").addClass("has-preview")
    
    if (previewable === true) {
        let imgTag = $("<img alt='File Preview' class='img-fluid' src='" + src + "'/>")
        
        if (this.settings.height) {
            imgTag.css("max-height", this.settings.height)
        }
        
        this.previewContainer.empty()
        imgTag.appendTo(render)
    } else {
        $("<i />").attr("class", "filemanager-font-file").appendTo(render)
        $("<span class=\"filemanager-extension\" />").html(this.getFileType()).appendTo(render)
    }
    
    this.formShow()
}
FileManager.prototype.resetPreview = function () {
    console.log("FileManager.resetPreview()")
    // ----
    
    let render = this.previewContainer
    this.preview.removeClass("has-error")
    this.preview.removeClass("has-preview")
    render.find(".filemanager-extension").remove()
    render.find("i").remove()
    render.find("img").remove()
    
    this.hideLoader()
}
FileManager.prototype.clearElement = function () {
    console.log("FileManager.clearElement()")
    // ----
    
    if (this.errorsEvent.errors.length === 0) {
        let eventBefore = $.Event("filemanager.beforeClear")
        this.inputs.fields.imageFile.trigger(eventBefore, [this])
        
        if (eventBefore.result !== false) {
            this.resetFile()
            this.inputs.fields.imageFile.val("")
            this.resetPreview()
            
            this.inputs.fields.imageFile.trigger($.Event("filemanager.afterClear"), [this])
            
        }
        
        this.formClear()
        this.displayClear()
        this.formHide()
    }
}
FileManager.prototype.hideLoader = function (input) {
    $(this.loader).hide()
}
FileManager.prototype.showLoader = function (input) {
    $(this.loader).show()
}
FileManager.prototype.clearErrors = function () {
    console.log("FileManager.clearErrors()")
    // ----
    
    this.preview.removeClass("has-errors")
    if (typeof this.previewErrorsContainer !== "undefined") {
        this.previewErrorsContainer.children("ul").html("")
    }
}
FileManager.prototype.pushError = function (errorKey) {
    console.log("FileManager.pushError(errorKey)", errorKey)
    // ----
    
    let e = $.Event("filemanager.error." + errorKey)
    this.errorsEvent.errors.push(e)
    this.inputs.fields.imageFile.trigger(e, [this])
    console.log("|__ this.errorsEvent.errors", this.errorsEvent.errors)
}
FileManager.prototype.showError = function (errorKey) {
    console.log("FileManager.showError(errorKey)", errorKey)
    // ----
    
    if (typeof this.previewErrorsContainer !== "undefined") {
        this.previewErrorsContainer.children("ul").append("<li>" + this.getError(errorKey) + "</li>")
    }
}
FileManager.prototype.getError = function (errorKey) {
    console.log("FileManager.getError(errorKey)", errorKey)
    // ----
    
    let error = this.settings.error[errorKey],
        value = ""
    
    if (errorKey === "fileSize") {
        value = this.settings.maxFileSize
    } else if (errorKey === "minWidth") {
        value = this.settings.minWidth
    } else if (errorKey === "maxWidth") {
        value = this.settings.maxWidth
    } else if (errorKey === "minHeight") {
        value = this.settings.minHeight
    } else if (errorKey === "maxHeight") {
        value = this.settings.maxHeight
    } else if (errorKey === "imageFormat") {
        value = this.settings.allowedFormats.join(", ")
    } else if (errorKey === "fileExtension") {
        value = this.settings.allowedFileExtensions.join(", ")
    }
    
    if (value !== "") {
        return error.replace("{{ value }}", value)
    }
    
    return error
}
FileManager.prototype.createElements = function () {
    this.isInit = true
    
    // Wrapper Elements
    
    // Button Elements
    this.inputs.buttons.close = $(`<a href="javascript:void(0);" id="${this.baseId + "_form_button_close"}" class="panel-button-close fas fa-times"/>`)
    this.inputs.buttons.upload = $(`<button type="button" id="${this.baseId + "_form_button_upload"}" name="submit" class="btn btn-primary btn-sm waves-effect waves-light" >upload</button>`)
    this.inputs.buttons.clear = $(`<button type="button" id="${this.baseId + "_form_button_clear"}" name="clear" class="btn btn-flat primary-text text-center p-1 mx-0 mb-0 waves-effect waves-light" >clear</button>`)
    this.inputs.buttons.cancel = $(`<button type="button" id="${this.baseId + "_form_button_cancel"}" name="cancel" class="btn btn-danger btn-sm waves-effect waves-light" >cancel</button>`)
    this.inputs.buttons.remove = $(`<button type="button" id="${this.baseId + "_form_button_remove"}" name="remove" class="btn btn-outline-danger btn-sm waves-effect waves-ligh" >remove</button>`)
    
    // Field Elements
    this.inputs.fields.imageFile = $(`<input type="file" id="${this.baseId + "_form_file_upload"}" name="${this.baseId + "_form_file_upload"}" />`)
    this.inputs.fields.imageId = $(`<input type="text" id="${this.baseId + "_form_id"}" name="${this.baseId + "_form_id"}" value="" placeholder="" class="form-control" readonly="readonly"/>`)
    this.inputs.fields.imageName = $(`<input type="text" id="${this.baseId + "_form_name"}" name="${this.baseId + "_form_name"}" value="" placeholder="" class="form-control" readonly="readonly"/>`)
    this.inputs.fields.imageEnabled = $(`<input type="checkbox" id="${this.baseId + "_form_enabled"}" name="${this.baseId + "_form_enabled"}" value="1" class="custom-control-input" />`)
    this.inputs.fields.imageIsShown = $(`<input type="checkbox" id="${this.baseId + "_form_is_shown"}" name="${this.baseId + "_form_is_shown"}" value="1" class="custom-control-input" />`)
    this.inputs.fields.imageIsCover = $(`<input type="checkbox" id="${this.baseId + "_form_is_cover"}" name="${this.baseId + "_form_is_cover"}" value="1" class="custom-control-input" />`)
    this.inputs.fields.imageCaption = $(`<textarea id="${this.baseId + "_form_caption"}" name="${this.baseId + "_form_caption"}" class="md-textarea short-description form-control" rows="4" maxlength="200"/>`)
    this.inputs.fields.imageAlt = $(`<input type="text" id="${this.baseId + "_form_alt"}" name="${this.baseId + "_form_alt"}" class="form-control"/>`)
    this.inputs.fields.imageTitle = $(`<input type="text" id="${this.baseId + "_form_title"}" name="${this.baseId + "_form_title"}" class="form-control"/>`)
    this.input = this.inputs.fields.imageFile
    
    // Error Elements
    this.inputs.errors.imageFile = $(`<div id="${this.baseId + '_form_enabled'}-error" class="error w-100 text-center"/>`)
    this.inputs.errors.imageId = $(`<div id="${this.baseId + '_form_id'}-error" class="error w-100 text-center"/>`)
    this.inputs.errors.imageName = $(`<div id="${this.baseId + '_form_name'}-error" class="error w-100 text-center"/>`)
    this.inputs.errors.imageEnabled = $(`<div id="${this.baseId + '_form_enabled'}-error" class="error w-100 text-center"/>`)
    this.inputs.errors.imageIsShown = $(`<div id="${this.baseId + '_form_is_shown'}-error" class="error w-100 text-center"/>`)
    this.inputs.errors.imageIsCover = $(`<div id="${this.baseId + '_form_is_cover'}-error" class="error w-100 text-center"/>`)
    this.inputs.errors.imageCaption = $(`<div id="${this.baseId + '_form_caption'}-error" class="error w-100 text-center"/>`)
    this.inputs.errors.imageAlt = $(`<div id="${this.baseId + '_form_alt'}-error" class="error w-100 text-center"/>`)
    this.inputs.errors.imageTitle = $(`<div id="${this.baseId + '_form_title'}-error" class="error w-100 text-center"/>`)
    
    // Label Elements
    this.inputs.labels.imageEnabled = $(`<label for="${this.baseId + "_form_enabled"}" class="custom-control-label p-0">Enabled</label>`)
    this.inputs.labels.imageIsShown = $(`<label for="${this.baseId + "_form_is_shown"}" class="custom-control-label p-0">Shown</label>`)
    this.inputs.labels.imageIsCover = $(`<label for="${this.baseId + "_form_is_cover"}" class="custom-control-label p-0">Cover</label>`)
    this.inputs.labels.imageId = $(`<label for="${this.baseId + '_form_enabled'}" >Id:</label>`)
    this.inputs.labels.imageTitle = $(`<label for="${this.baseId + '_form_title'}" >Title:</label>`)
    this.inputs.labels.imageAlt = $(`<label for="${this.baseId + '_form_alt'}" >Alt:</label>`)
    this.inputs.labels.imageCaption = $(`<label for="${this.baseId + '_form_caption'}" >Caption:</label>`)
    this.inputs.labels.imageNameField = $(`<label for="${this.baseId + '_form_name'}" >Name:</label>`)
    this.inputs.labels.imageNameDetail = $(`<span class="font-weight-bolder" >Name:</span>`)
    this.inputs.labels.imageRatio = $(`<span class="font-weight-bolder" >Ratio:</span>`)
    this.inputs.labels.imageSize = $(`<span class="font-weight-bolder" >Size:</span>`)
    this.inputs.labels.imageExtension = $(`<span class="font-weight-bolder" >Extension:</span>`)
    this.inputs.labels.imageDimensions = $(`<span class="font-weight-bolder" >Dimensions:</span>`)
    this.inputs.labels.imageType = $(`<span class="font-weight-bolder" >Type:</span>`)
    this.inputs.labels.imageHeight = $(`<span class="font-weight-bolder" >Height:</span>`)
    this.inputs.labels.imageWidth = $(`<span class="font-weight-bolder" >Width:</span>`)
    
    // Display Elements
    this.inputs.displays.imageRatio = $(`<span id="${this.baseId + "_form_ratio"}" />`)
    this.inputs.displays.imageHeight = $(`<span id="${this.baseId + "_form_height"}" />`)
    this.inputs.displays.imageWidth = $(`<span id="${this.baseId + "_form_width"}" />`)
    this.inputs.displays.imageSize = $(`<span id="${this.baseId + "_form_size"}" />`)
    this.inputs.displays.imageExtension = $(`<span id="${this.baseId + "_form_extension"}"/>`)
    this.inputs.displays.imageName = $(`<span id="${this.baseId + "_form_name"}" />`)
    this.inputs.displays.imageDimensions = $(`<span id="${this.baseId + "_form_dimensions"}" />`)
    this.inputs.displays.imageType = $(`<span id="${this.baseId + "_form_type"}" />`)
    
    // Preview Elements
    this.createPreviewElements()
    
    // Detail Elements
    this.detailSection = $(`<section id="${this.baseId + "_detail"}" class="card card-body grey lighten-3 p-3 mb-2"/>`)
    
    this.render()
}
FileManager.prototype.fileGallery = function () {
    let sectionName = "gallery"
    let sectionTitle = (this.source) ? this.source.ucwords() + " Images:" : "Files"
    let $WRAPPER_SUBHEADING, $WRAPPER_HEADING_SPAN, $WRAPPER_HEADING, $WRAPPER, $HR,
        $FIELD_FILE_UPLOAD, $WRAPPER_FILE_UPLOAD, $BUTTON_FILE_UPLOAD, $SPAN_FILE_UPLOAD,
        $WRAPPER_HEADING_ICON, $COL_2_1, $ROW_1, $ROW_2
    
    $WRAPPER_HEADING_ICON = $(`<i/>`, {
        class: "fas fa-sliders-h",
    })
    
    $WRAPPER_HEADING_SPAN = $(`<span/>`, {
        text: sectionTitle,
    })
    
    this.inputs.buttons.toggle = $(`<a/>`, {
        id: this.baseId + "_" + sectionName + "_" + "toggle",
    })
        .append($WRAPPER_HEADING_ICON)
    
    $HR = $(`<hr class="ml-3 mr-3 mt-1 mb-3 color-dark"/>`)
    
    $WRAPPER_HEADING = $(`<h5/>`, {
        class: "card-title label",
        id: this.baseId + "_" + sectionName + "_" + "heading",
    })
    
    $WRAPPER_HEADING.append($WRAPPER_HEADING_SPAN)
    
    $WRAPPER_SUBHEADING = $(`<div/>`, {
        class: "d-flex justify-content-between",
    })
        .append($WRAPPER_HEADING, this.inputs.buttons.toggle)
    
    this.galleryContainer = $("<div/>", {
        id: this.baseId + "_" + sectionName + "_" + "container",
        class: "row",
    })
    
    $SPAN_FILE_UPLOAD = $("<span/>", {
        text: "Choose File",
        id: this.baseId + "_" + sectionName + "_" + "file_upload_label",
    })
    
    this.inputs.fields.imageFileButton = $("<div/>", {
        class: "btn btn-secondary btn-sm waves-effect waves-light",
    })
        .append($SPAN_FILE_UPLOAD, this.inputs.fields.imageFile)
    
    $WRAPPER_FILE_UPLOAD = $("<div/>", {
        class: "d-flex justify-content-end mb-2",
    })
        .append(this.inputs.fields.imageFileButton)
    
    $FIELD_FILE_UPLOAD = $("<div/>", {
        class: "file-field",
    })
        .append($WRAPPER_FILE_UPLOAD)
    
    $COL_2_1 = $("<div/>", {
        class: "col-12",
    })
        .append($FIELD_FILE_UPLOAD)
    
    $ROW_2 = $("<div/>", {
        class: "row",
    })
        .append($COL_2_1)
    
    $WRAPPER = $(`<section/>`, {
        class: "card card-body z-depth-0 mb-2",
        id: this.baseId + "_" + sectionName,
    })
        .append($WRAPPER_SUBHEADING, $HR, this.galleryContainer, $ROW_2)
    
    return $WRAPPER
}
FileManager.prototype.fileFormFields = function () {
    let $WRAPPER, $ROW_1, $ROW_2, $ROW_3, $ROW_4, $ROW_5, $ROW_6, $CHECK_WRAPPER_ENABLED, $CHECK_WRAPPER_IS_SHOWN,
        $CHECK_WRAPPER_IS_COVER, $COL_1_1, $COL_1_2, $COL_2_1, $COL_2_2, $COL_2_3, $COL_3_1, $COL_4_1, $COL_5_1,
        $COL_6_1, $WRAPPER_ID, $WRAPPER_NAME, $WRAPPER_ENABLED, $WRAPPER_IS_SHOWN, $WRAPPER_IS_COVER,
        $WRAPPER_TITLE, $WRAPPER_ALT, $WRAPPER_CAPTION, $ROW_7, $COL_7_1, $COL_7_2, $PROGRESS_WRAPPER
    
    $WRAPPER_ID = $("<div class='form-element'/>")
    $WRAPPER_NAME = $("<div class='form-element'/>")
    $WRAPPER_ENABLED = $("<div class='form-element'/>")
    $WRAPPER_IS_SHOWN = $("<div class='form-element'/>")
    $WRAPPER_IS_COVER = $("<div class='form-element'/>")
    $WRAPPER_CAPTION = $("<div class='form-element mb-4'/>")
    $WRAPPER_ALT = $("<div class='form-element'/>")
    $WRAPPER_TITLE = $("<div class='form-element'/>")
    
    $CHECK_WRAPPER_ENABLED = $("<div/>", { class: "custom-control custom-switch" })
        .append(this.inputs.fields.imageEnabled, this.inputs.labels.imageEnabled)
    $CHECK_WRAPPER_IS_SHOWN = $("<div/>", { class: "custom-control custom-switch" })
        .append(this.inputs.fields.imageIsShown, this.inputs.labels.imageIsShown)
    $CHECK_WRAPPER_IS_COVER = $("<div/>", { class: "custom-control custom-switch" })
        .append(this.inputs.fields.imageIsCover, this.inputs.labels.imageIsCover)
    
    $WRAPPER_ID.append(this.inputs.labels.imageId, this.inputs.fields.imageId, this.inputs.errors.imageId)
    $WRAPPER_NAME.append(this.inputs.labels.imageNameField, this.inputs.fields.imageName, this.inputs.errors.imageName)
    $WRAPPER_ENABLED.append($CHECK_WRAPPER_ENABLED, this.inputs.errors.imageEnabled)
    $WRAPPER_IS_COVER.append($CHECK_WRAPPER_IS_COVER, this.inputs.errors.imageIsCover)
    $WRAPPER_IS_SHOWN.append($CHECK_WRAPPER_IS_SHOWN, this.inputs.errors.imageIsShown)
    $WRAPPER_TITLE.append(this.inputs.labels.imageTitle, this.inputs.fields.imageTitle, this.inputs.errors.imageTitle)
    $WRAPPER_ALT.append(this.inputs.labels.imageAlt, this.inputs.fields.imageAlt, this.inputs.errors.imageAlt)
    $WRAPPER_CAPTION.append(this.inputs.labels.imageCaption, this.inputs.fields.imageCaption, this.inputs.errors.imageCaption)
    
    this.inputs.fields.progress = $(`<div id="${this.baseId + "_progress"}" class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"/>`)
    $PROGRESS_WRAPPER = $("<div class='progress'/>")
        .append(this.inputs.fields.progress)
    
    $COL_1_1 = $("<div/>", { class: "col-12 col-md-6" })
        .append($WRAPPER_ID)
    $COL_1_2 = $("<div/>", { class: "col-12 col-md-6" })
        .append($WRAPPER_NAME)
    $COL_2_1 = $("<div/>", { class: "col-12 col-md-4 d-flex align-self-end justify-content-center pb-2 mb-2 mt-4" })
        .append($WRAPPER_ENABLED)
    $COL_2_2 = $("<div/>", { class: "col-12 col-md-4 d-flex align-self-end justify-content-center pb-2 mb-2 mt-4" })
        .append($WRAPPER_IS_SHOWN)
    $COL_2_3 = $("<div/>", { class: "col-12 col-md-4 d-flex align-self-end justify-content-center pb-2 mb-2 mt-4" })
        .append($WRAPPER_IS_COVER)
    $COL_3_1 = $("<div/>", { class: "col-12" })
        .append($WRAPPER_TITLE)
    $COL_4_1 = $("<div/>", { class: "col-12" })
        .append($WRAPPER_ALT)
    $COL_5_1 = $("<div/>", { class: "col-12" })
        .append($WRAPPER_CAPTION)
    $COL_6_1 = $("<div/>", { class: "col-12" })
        .append($PROGRESS_WRAPPER)
    $COL_7_1 = $("<div/>", { class: "col-12 col-md-6 text-left" })
        .append(this.inputs.buttons.cancel, this.inputs.buttons.remove)
    $COL_7_2 = $("<div/>", { class: "col-12 col-md-6 text-right" })
        .append(this.inputs.buttons.clear, this.inputs.buttons.upload)
    
    //Rows
    $ROW_1 = $("<div/>", { class: "row" })
        .append($COL_1_1, $COL_1_2)
    $ROW_2 = $("<div/>", { class: "row" })
        .append($COL_2_1, $COL_2_2, $COL_2_3)
    $ROW_3 = $("<div/>", { class: "row" })
        .append($COL_3_1)
    $ROW_4 = $("<div/>", { class: "row" })
        .append($COL_4_1)
    $ROW_5 = $("<div/>", { class: "row" })
        .append($COL_5_1)
    $ROW_6 = $("<div/>", { class: "row mt-2" })
        .append($COL_6_1)
    $ROW_7 = $("<div/>", { class: "row mt-2" })
        .append($COL_7_1, $COL_7_2)
    
    $WRAPPER = $("<section/>", {
        id: this.baseId + "_" + "form_data",
    })
        .append($ROW_1, $ROW_2, $ROW_3, $ROW_4, $ROW_5, $ROW_6, $ROW_7)
    
    return $WRAPPER
}
FileManager.prototype.fileForm = function () {
    let $WRAPPER_SUBHEADING, $WRAPPER_HEADING_SPAN, $WRAPPER_HEADING, $WRAPPER, $HR
    let sectionName = "form"
    
    this.form = $(`<form id="${this.baseId}_${sectionName}" class="card card-body z-depth-0 mb-2" novalidate="novalidate"/>`)
    
    $WRAPPER_HEADING_SPAN = $(`<span/>`, {
        text: "Image",
    })
    
    $WRAPPER_HEADING = $(`<h5/>`, {
        class: "card-title",
        id: this.baseId + "_" + sectionName + "_" + "heading",
    })
    
    $WRAPPER_SUBHEADING = $(`<h6/>`, {
        id: this.baseId + "_" + sectionName + "_" + "subheading",
    })
    
    $HR = $(`<hr class="ml-3 mr-3 mt-1 mb-3 color-dark"/>`)
    
    $WRAPPER_HEADING.append($WRAPPER_HEADING_SPAN, this.inputs.buttons.close)
    
    this.form.append($WRAPPER_HEADING, $WRAPPER_SUBHEADING, $HR, this.preview, this.fileDetail(this), this.fileFormFields(this))
    
    return this.form
}
FileManager.prototype.fileDetail = function () {
    let $ROW_1, $ROW_2, $ROW_3, $ROW_4, $COL_1_1, $COL_1_2, $COL_1_3, $COL_1_4,
        $COL_2_1, $COL_2_2, $COL_2_3, $COL_2_4, $COL_3_1, $COL_3_2, $COL_3_3, $COL_3_4,
        $COL_4_1, $COL_4_2, $COL_4_3, $COL_4_4
    
    $COL_1_1 = $(`<div class="col-12 col-md-3 p-1 text-truncate"/>`).append(this.inputs.labels.imageNameDetail)
    $COL_1_2 = $(`<div class="col-12 col-md-3 p-1 text-truncate"/>`).append(this.inputs.displays.imageName)
    $COL_1_3 = $(`<div class="col-12 col-md-3 p-1 text-truncate"/>`).append(this.inputs.labels.imageSize)
    $COL_1_4 = $(`<div class="col-12 col-md-3 p-1 text-truncate"/>`).append(this.inputs.displays.imageSize)
    $COL_2_1 = $(`<div class="col-12 col-md-3 p-1 text-truncate"/>`).append(this.inputs.labels.imageDimensions)
    $COL_2_2 = $(`<div class="col-12 col-md-3 p-1 text-truncate"/>`).append(this.inputs.displays.imageDimensions)
    $COL_2_3 = $(`<div class="col-12 col-md-3 p-1 text-truncate"/>`).append(this.inputs.labels.imageRatio)
    $COL_2_4 = $(`<div class="col-12 col-md-3 p-1 text-truncate"/>`).append(this.inputs.displays.imageRatio)
    $COL_3_1 = $(`<div class="col-12 col-md-3 p-1 text-truncate"/>`).append(this.inputs.labels.imageHeight)
    $COL_3_2 = $(`<div class="col-12 col-md-3 p-1 text-truncate"/>`).append(this.inputs.displays.imageHeight)
    $COL_3_3 = $(`<div class="col-12 col-md-3 p-1 text-truncate"/>`).append(this.inputs.labels.imageWidth)
    $COL_3_4 = $(`<div class="col-12 col-md-3 p-1 text-truncate"/>`).append(this.inputs.displays.imageWidth)
    $COL_4_1 = $(`<div class="col-12 col-md-3 p-1 text-truncate"/>`).append(this.inputs.labels.imageType)
    $COL_4_2 = $(`<div class="col-12 col-md-3 p-1 text-truncate"/>`).append(this.inputs.displays.imageType)
    $COL_4_3 = $(`<div class="col-12 col-md-3 p-1 text-truncate"/>`).append(this.inputs.labels.imageExtension)
    $COL_4_4 = $(`<div class="col-12 col-md-3 p-1 text-truncate"/>`).append(this.inputs.displays.imageExtension)
    
    $ROW_1 = $(`<div/>`, { class: "row" }).append($COL_1_1, $COL_1_2, $COL_1_3, $COL_1_4)
    $ROW_2 = $(`<div/>`, { class: "row" }).append($COL_2_1, $COL_2_2, $COL_2_3, $COL_2_4)
    $ROW_3 = $(`<div/>`, { class: "row" }).append($COL_3_1, $COL_3_2, $COL_3_3, $COL_3_4)
    $ROW_4 = $(`<div/>`, { class: "row" }).append($COL_4_1, $COL_4_2, $COL_4_3, $COL_4_4)
    
    this.detailSection.append($ROW_1, $ROW_2, $ROW_3, $ROW_4)
    
    return this.detailSection
}
FileManager.prototype.formShow = function () {
    console.log("this.formShow()")
    // ----
    let _input_file = document.getElementById(this.inputs.fields.imageFile.attr("id"))
    let _input_toggle = document.getElementById(this.inputs.buttons.toggle.attr("id"))
    
    this.form.show()
    
    _input_toggle.disabled = true
    _input_file.disabled = true
}
FileManager.prototype.formHide = function () {
    console.log("this.formHide()")
    // ----
    
    let _input_file = document.getElementById(this.inputs.fields.imageFile.attr("id"))
    let _input_toggle = document.getElementById(this.inputs.buttons.toggle.attr("id"))
    
    this.form.hide()
    
    this.inputs.buttons.upload.html("upload")
    
    _input_toggle.disabled = false
    _input_file.disabled = false
}
FileManager.prototype.formClear = function () {
    console.log("FileManager.formClear()", this.inputs)
    // ----
    
    let _progress_bar = document.getElementById(this.inputs.fields.progress.attr("id"))
    
    $(this.inputs.fields.imageId).val("")
    $(this.inputs.fields.imageName).val("")
    $(this.inputs.fields.imageAlt).val("")
    $(this.inputs.fields.imageTitle).val("")
    $(this.inputs.fields.imageCaption).val("")
    
    $(this.inputs.fields.imageIsCover).attr("checked", false)
    $(this.inputs.fields.imageEnabled).attr("checked", true)
    $(this.inputs.fields.imageIsShown).attr("checked", true)
    
    $("img.selected").removeClass("selected")
    
    $(_progress_bar).css({
        "width": "0%",
        "background-color": "#007bff",
        "color": "#fff",
    })
    
    clearValidation(this.form)
}
FileManager.prototype.formReset = function () {
    console.log("this.formReset()")
    // ----
    
    this.formClear()
    this.displayClear()
    this.resetPreview()
    this.clearSelected()
}
FileManager.prototype.formCancel = function () {
    console.log("FileManager.formCancel()")
    // ----
    
    this.formReset()
    this.formHide()
}
FileManager.prototype.formRemove = function () {
    console.log("FileManager.formRemove()")
    // ----
    const _image_id = this.inputs.fields.imageId[0]
    
    let _this = this
    
    if (_image_id) {
        let imageId = (!isNaN(parseInt(_image_id.value))) ? parseInt(_image_id.value) : null
        
        if (imageId !== null) {
            console.log("|__ imageId", imageId)
            let image = _this.all.get(imageId)
            if (image) {
                console.log("|__ image", image)
                let el = document.getElementById("image_" + imageId)
                if (el) {
                    confirmDialog(`Would you like to delete this image?`, (ans) => {
                        if (ans) {
                            this.sendRemoveRequest({
                                image_id: imageId,
                                source: _this.source,
                                source_id: _this.sourceId,
                            }, function (data) {
                                if (data && data.deleted) {
                                    
                                    if (data.deleted === true || data.deleted === "true") {
                                        _this.all.delete(imageId)
                                        $(el).parent("div").remove()
                                        _this.formReset()
                                        _this.formHide()
                                        toastr["success"]("File Removed", "File Manager")
                                    }
                                }
                            })
                        }
                    })
                }
            }
        }
    }
}
FileManager.prototype.formLoad = function (image) {
    console.log("FileManager.formLoad(image)", image)
    // ----
    
    if (image) {
        let imageId = (!isNaN(parseInt(image.id))) ? parseInt(image.id) : null
        let imageName = (image.name) ? image.name : null
        let imageTitle = (image.title) ? image.title : null
        let imageAlt = (image.alt) ? image.alt : null
        let imageCaption = (image.caption) ? image.caption : null
        let imageEnabled = (image.enabled && image.enabled === 1)
        let imageIsShown = !!(image.is_shown && image.is_shown === 1)
        let imageIsCover = !!(image.is_cover && image.is_cover === 1)
        let filePath = (image.path) ? image.path : null
        let fileName = (image.name) ? image.name : null
        let fileExtension = (image.extension) ? image.extension : null
        
        //*
        console.log("|__ imageId", imageId)
        console.log("|__ imageName", imageName)
        console.log("|__ imageTitle", imageTitle)
        console.log("|__ imageAlt", imageAlt)
        console.log("|__ imageCaption", imageCaption)
        console.log("|__ imageEnabled", imageEnabled)
        console.log("|__ imageIsShown", imageIsShown)
        console.log("|__ imageIsCover", imageIsCover)
        //*/
        
        $(this.inputs.fields.imageId).val(imageId)
        $(this.inputs.fields.imageName).val(imageName)
        $(this.inputs.fields.imageAlt).val(imageAlt)
        $(this.inputs.fields.imageTitle).val(imageTitle)
        $(this.inputs.fields.imageCaption).val(imageCaption)
        
        $(this.inputs.fields.imageIsCover).attr("checked", imageIsCover)
        $(this.inputs.fields.imageEnabled).attr("checked", imageEnabled)
        $(this.inputs.fields.imageIsShown).attr("checked", imageIsShown)
        
        let path = (!is_null(filePath) && !is_null(fileName) && !is_null(fileExtension)) ? `${filePath}/${fileName}.${fileExtension}` : (this.settings.defaultFile) ? this.settings.defaultFile : null
        console.log("|__ path", path)
        
        this.setPreview(this.isImage(), path)
        
        this.displaySet()
        
        this.form.show()
    }
}
FileManager.prototype.displayReset = function () {
    console.log("FileManager.displayReset()", this)
    // ----
    
    this.displayClear()
}
FileManager.prototype.displayClear = function () {
    console.log("FileManager.displayClear()", this)
    // ----
    
    $(this.inputs.displays.imageName).html("&nbsp;")
    $(this.inputs.displays.imageType).html("&nbsp;")
    $(this.inputs.displays.imageRatio).html("&nbsp;")
    $(this.inputs.displays.imageExtension).html("&nbsp;")
    $(this.inputs.displays.imageDimensions).html("&nbsp;")
    $(this.inputs.displays.imageSize).html("&nbsp;")
    $(this.inputs.displays.imageHeight).html("&nbsp;")
    $(this.inputs.displays.imageWidth).html("&nbsp;")
}
FileManager.prototype.displaySet = function () {
    console.log("FileManager.displaySet()", this.detail)
    // ----
    
    this.displayReset()
    
    let imageName, imageType, imageRatio, imageExtension, imageDimensions, imageSize, imageHeight, imageWidth
    
    imageName = (this.detail.name) ? this.detail.name : '&nbsp;'
    imageType = (this.detail.type) ? this.detail.type : '&nbsp;'
    imageRatio = (this.detail.ratio) ? this.detail.ratio : '&nbsp;'
    imageExtension = (this.detail.extension) ? this.detail.extension : '&nbsp;'
    imageDimensions = (this.detail.dimensions) ? this.detail.dimensions : '&nbsp;'
    imageSize = (this.detail.size) ? this.detail.size : '&nbsp;'
    imageHeight = (!isNaN(parseInt(this.detail.height))) ? this.detail.height + "px" : '&nbsp;'
    imageWidth = (!isNaN(parseInt(this.detail.width))) ? this.detail.width + "px" : '&nbsp;'
    
    //*
    $(this.inputs.displays.imageName).html(imageName)
    $(this.inputs.displays.imageType).html(imageType)
    $(this.inputs.displays.imageRatio).html(imageRatio)
    $(this.inputs.displays.imageExtension).html(imageExtension)
    $(this.inputs.displays.imageDimensions).html(imageDimensions)
    $(this.inputs.displays.imageSize).html(imageSize)
    $(this.inputs.displays.imageHeight).html(imageHeight)
    $(this.inputs.displays.imageWidth).html(imageWidth)
    //*/
}
FileManager.prototype.handleError = function (msg, title, level) {
    if (!level) {
        level = "error"
    }
    if (!title) {
        title = "File Manager"
    }
    
    toastr[level](msg, title)
}
FileManager.prototype.defaultDetail = function () {
    this.detail = {
        alt: null,
        caption: null,
        created_by: this.userId,
        date_created: formatDateMySQL(),
        date_modified: formatDateMySQL(),
        dimensions: null,
        enabled: 1,
        extension: null,
        height: null,
        id: null,
        is_cover: 0,
        is_shown: 1,
        modified_by: this.userId,
        name: null,
        note: null,
        path: null,
        size: null,
        thumbs_path: null,
        title: null,
        width: null,
    }
}
FileManager.prototype.setDetail = function (image) {
    console.log("FileManager.setDetail(image)", image)
    // ----
    
    this.defaultDetail()
    
    if (image) {
        this.detail.alt = (image.alt) ? image.alt : null
        this.detail.caption = (image.caption) ? image.caption : null
        this.detail.created_by = (!isNaN(parseInt(this.created_by))) ? parseInt(this.created_by) : this.userId
        this.detail.date_created = (image.date_created) ? image.date_created : formatDateMySQL()
        this.detail.date_modified = (image.date_modified) ? image.date_modified : formatDateMySQL()
        this.detail.dimensions = (image.dimensions) ? image.dimensions : null
        this.detail.enabled = (image.enabled && image.enabled === 1) ? 1 : 0
        this.detail.extension = (image.extension) ? image.extension : null
        this.detail.height = (!isNaN(parseInt(image.height))) ? parseInt(image.height) : null
        this.detail.id = (!isNaN(parseInt(image.id))) ? parseInt(image.id) : null
        this.detail.is_cover = (image.is_cover && image.is_cover === 1) ? 1 : 0
        this.detail.is_shown = (image.is_shown && image.is_shown === 1) ? 1 : 0
        this.detail.modified_by = (!isNaN(parseInt(this.modified_by))) ? parseInt(this.modified_by) : this.userId
        this.detail.name = (image.name) ? image.name : null
        this.detail.note = (image.note) ? image.note : null
        this.detail.path = (image.path) ? image.path : null
        this.detail.size = (image.size) ? image.size : null
        this.detail.thumbs_path = (image.thumbs_path) ? image.thumbs_path : null
        this.detail.title = (image.title) ? image.title : null
        this.detail.width = (!isNaN(parseInt(image.width))) ? parseInt(image.width) : null
        
        this.setFile(image)
        
        console.log("|__ this.detail", this.detail)
        console.log("|__ this.file", this.file)
        
        return this.detail
    }
}
FileManager.prototype.loadAll = function () {
    console.log("this.loadAll()")
    // ----
    
    if (!this.images) {
        this.images = []
    }
    
    let all = new Map()
    let _this = this
    
    $.each(this.images, function (k, image) {
        _this.setDetail(image)
        all.set(image.id, image)
        _this.galleryContainer.append(_this.buildImageThumbnails(image))
    })
    
    this.all = all
    
}
FileManager.prototype.buildImageThumbnails = function (image) {
    console.log("this.buildImageThumbnails(image)", image)
    // ----
    
    let isCoverClass = ""
    let isShownClass = ""
    
    if (image) {
        let _this = this
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
            let $IMG = $(`<img id="image_${imageId}" data-id="${imageId}" class="img-thumbnail ${isCoverClass} ${isShownClass}" alt="${alt}" src="${thumbsPath}/${name}.${extension}" />`)
            $IMG.on("click", function () {
                _this.edit(image.id)
            })
            
            return $("<div/>", {
                class: "col-12 col-md-4 mb-2",
            })
                .append($IMG)
        }
    }
}
FileManager.prototype.clearSelected = function () {
    console.log("this.clearSelected()")
    // ----
    
    $("img.selected").removeClass("selected")
}
FileManager.prototype.translateMessages = function () {
    console.log("FileManager.translateMessages()")
    // ----
    
    for (let name in this.settings.tpl) {
        console.log("|__ name", name)
        for (let key in this.settings.messages) {
            console.log("|__ |__ key", key)
            if (this.settings.tpl[name]) {
                this.settings.tpl[name] = this.settings.tpl[name].replace("{{ " + key + " }}", this.settings.messages[key])
            } else if (this.settings.tpl.preview[name]) {
                this.settings.tpl.preview[name] = this.settings.tpl.preview[name].replace("{{ " + key + " }}", this.settings.messages[key])
            }
            
        }
    }
}
FileManager.prototype.cleanFilename = function (src) {
    var filename = src.split("\\").pop()
    if (filename === src) {
        filename = src.split("/").pop()
    }
    
    return src !== "" ? filename : ""
}
FileManager.prototype.validateImage = function () {
    if (this.settings.minWidth !== 0 && this.settings.minWidth >= this.file.width) {
        this.pushError("minWidth")
    }
    
    if (this.settings.maxWidth !== 0 && this.settings.maxWidth <= this.file.width) {
        this.pushError("maxWidth")
    }
    
    if (this.settings.minHeight !== 0 && this.settings.minHeight >= this.file.height) {
        this.pushError("minHeight")
    }
    
    if (this.settings.maxHeight !== 0 && this.settings.maxHeight <= this.file.height) {
        this.pushError("maxHeight")
    }
    
    if (this.settings.allowedFormats.indexOf(this.getImageFormat()) === "-1") {
        this.pushError("imageFormat")
    }
}
FileManager.prototype.checkFileSize = function () {
    if (this.sizeToByte(this.settings.maxFileSize) !== 0 && this.file.size > this.sizeToByte(this.settings.maxFileSize)) {
        this.pushError("fileSize")
    }
}
FileManager.prototype.isFileExtensionAllowed = function () {
    console.log("FileManager.isFileExtensionAllowed")
    // ----
    
    if (this.settings.allowedFileExtensions.indexOf("*") !== "-1" ||
        this.settings.allowedFileExtensions.indexOf(this.getFileType()) !== "-1") {
        return true
    }
    
    this.pushError("fileExtension")
    
    return false
}
FileManager.prototype.isImage = function (image) {
    console.log("FileManager.isImage")
    // ----
    
    let allowedExtensions = this.settings.imgFileExtensions
    let fileType = this.getFileType()
    let index = allowedExtensions.indexOf(fileType)
    
    /*
    console.log("|__ allowedExtensions", allowedExtensions)
    console.log("|__ fileType", fileType)
    console.log("|__ index", index)
    //*/
    
    return index >= 0
}
FileManager.prototype.getFileType = function () {
    console.log("FileManager.getFileType()")
    // ----
    
    return this.file.name.split(".").pop().toLowerCase()
}
FileManager.prototype.getImageFormat = function () {
    if (this.file.width === this.file.height) {
        return "square"
    }
    
    if (this.file.width < this.file.height) {
        return "portrait"
    }
    
    if (this.file.width > this.file.height) {
        return "landscape"
    }
}
FileManager.prototype.setFileName = function (file) {
    console.log("FileManager.setFileName(file)", file)
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
    
    this.detail.name = fileName
    this.detail.extension = fileExtension
}
FileManager.prototype.setFileDetail = function (file) {
    console.log("FileManager.setFileDetail(file)", file)
    // ----
    
    this.detail.path = `/public/img/${this.source}/${this.sourceId}`
    this.detail.thumbs_path = `/public/img/${this.source}/${this.sourceId}`
    this.detail.id = null
    this.detail.title = null
    this.detail.alt = null
    this.detail.title = null
    this.detail.caption = null
    this.detail.enabled = 1
    this.detail.is_shown = 1
    this.detail.is_cover = 0
    this.detail.date_created = formatDateMySQL()
    this.detail.date_modified = formatDateMySQL()
    this.detail.created_by = this.userId
    this.detail.modified_by = this.userId
    this.detail.note = null
}
FileManager.prototype.setFileDimensions = function (width, height) {
    console.log("FileManager.setFileDimensions(width, height)", width, height)
    // ----
    
    this.file.width = null
    this.file.height = null
    this.detail.dimensions = null
    this.detail.width = null
    this.detail.height = null
    
    if (width && height) {
        this.file.width = width
        this.file.height = height
        this.detail.dimensions = `${width} x ${height}`
        this.detail.width = width
        this.detail.height = height
    }
}
FileManager.prototype.setFileSize = function (file) {
    console.log("FileManager.setFileSize(file)", file)
    // ----
    
    let fileSize = null
    
    if (file.size > 1024 * 1024) {
        fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + "MB"
    } else {
        fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + "KB"
    }
    
    this.detail.size = fileSize
}
FileManager.prototype.setFileInformation = function (file) {
    console.log("FileManager.setFileInformation(file)", file)
    // ----
    
    this.file.object = file
    this.file.name = file.name
    this.file.size = file.size
    this.file.type = file.type
    this.file.width = null
    this.file.height = null
    
    this.detail.type = file.type
}
FileManager.prototype.sizeToByte = function (size) {
    let value = 0
    
    if (size !== 0) {
        let unit = size.slice(-1).toUpperCase(),
            kb = 1024,
            mb = kb * 1024,
            gb = mb * 1024
        
        if (unit === "K") {
            value = parseFloat(size) * kb
        } else if (unit === "M") {
            value = parseFloat(size) * mb
        } else if (unit === "G") {
            value = parseFloat(size) * gb
        }
    }
    
    return value
}
FileManager.prototype.findClosest = function (arrSorted, value) {
    console.log("FileManager.findClosest(arrSorted, value)", arrSorted, value)
    // ----
    
    let closest = arrSorted[0]
    let closestDiff = Math.abs(arrSorted[0] - value)
    
    for (let i = 1; i < arrSorted.length; i++) {
        let diff = Math.abs(arrSorted[i] - value)
        if (diff < closestDiff) {
            closestDiff = diff
            closest = arrSorted[i]
        } else {
            return closest
        }
    }
    return arrSorted[arrSorted.length - 1]
}
FileManager.prototype.estimateAspectRatio = function (width, height) {
    console.log("FileManager.estimateAspectRatio(width, height)", width, height)
    // ----
    
    let ratio = Math.max(width, height) / Math.min(width, height)
    if (ratio in LOOKUP) {
        this.detail.ratio = LOOKUP[ratio]
        return
    }
    
    let closest = this.findClosest(RATIOS, ratio)
    if (Math.abs(closest - ratio) <= ERROR_ALLOWED) {
        this.detail.ratio = LOOKUP[closest]
        return
    }
    
    this.detail.ratio = Math.round(ratio * 100) / 100 + ":1"
}
FileManager.prototype.resetFile = function () {
    console.log("FileManager.resetFile()")
    // ----
    
    this.file.object = null
    
    this.file.name = null
    this.file.size = null
    this.file.type = null
    this.file.width = null
    this.file.height = null
}
FileManager.prototype.setFile = function (file) {
    console.log("FileManager.setFile(file)", file)
    // ----
    
    this.resetFile()
    
    if (file) {
        let fileName = (file.name && file.extension) ? file.name + "." + file.extension : null
        let fileType = (file.extension) ? FILE_TYPES[file.extension] : null
        let fileSize = (file.size && (!isNaN(parseInt(formatSize(file.size))))) ? parseInt(formatSize(file.size)) : null
        let fileSizeFormatted = (file.size) ? file.size : null
        let fileWidth = (file.width && (!isNaN(parseInt(file.width)))) ? parseInt(file.width) : null
        let fileHeight = (file.height && (!isNaN(parseInt(file.height)))) ? parseInt(file.height) : null
        
        /*
        console.log("|__ fileName", fileName)
        console.log("|__ fileType", fileType)
        console.log("|__ fileSize", fileSize)
        console.log("|__ fileSizeFormatted", fileSizeFormatted)
        console.log("|__ fileWidth", fileWidth)
        console.log("|__ fileHeight", fileHeight)
        //*/
        
        this.file.object = (file.object) ? file.object : null
        this.file.size = fileSize
        this.file.name = fileName
        this.file.sizeFormatted = fileSizeFormatted
        this.file.type = fileType
        this.file.width = fileWidth
        this.file.height = fileHeight
        this.detail.type = fileType
        this.detail.width = fileWidth
        this.detail.height = fileHeight
        
        this.setFileDimensions(this.file.width, this.file.height)
        this.estimateAspectRatio(this.file.width, this.file.height)
    }
}
FileManager.prototype.fileSelected = function (event) {
    console.log("FileManager.fileSelected(event)", event)
    // ----
    
    this.readFile(this.inputs.fields.imageFile[0])
}
FileManager.prototype.readFile = function (input) {
    console.log("FileManager.readFile(input)", input)
    // ----
    
    if (!input || !input.files[0]) {
        this.handleError("Missing fields", "File Manager", "error")
    }
    
    const reader = new FileReader()
    const image = new Image()
    
    let file = input.files[0]
    let srcBase64 = null
    let _this = this
    let eventFileReady = $.Event("filemanager.fileReady")
    let _remove_button = document.getElementById($(this.inputs.buttons.remove).attr("id"))
    
    this.errorsEvent.errors = []
    
    this.showLoader()
    this.setFileInformation(file)
    this.setFileDetail(file)
    this.checkFileSize()
    this.isFileExtensionAllowed()
    
    if (this.isImage() && this.file.size < this.sizeToByte(this.settings.maxFileSizePreview)) {
        this.inputs.fields.imageFile.on("filemanager.fileReady", this.onFileReady)
        reader.readAsDataURL(file)
        reader.onload = function (_file) {
            srcBase64 = _file.target.result
            image.src = _file.target.result
            image.onload = function () {
                _this.setFileDimensions(this.width, this.height)
                _this.estimateAspectRatio(this.width, this.height)
                _this.setFileSize(file)
                _this.setFileName(file)
                _this.validateImage()
                $(_this.input).trigger(eventFileReady, [true, srcBase64])
                //*
                console.log("|__ file", _this.file)
                console.log("|__ detail", _this.detail)
                //*/
                _this.displaySet()
                _remove_button.disabled = true
            }
        }.bind(this)
    } else {
        this.onFileReady(false)
    }
    
}
FileManager.prototype.onFileReady = function (event, previewable, src) {
    console.log("FileManager.onFileReady(event, previewable, src)", event)
    // ----
    
    $(this.inputs.fields.imageFile).off("fileManager.fileReady", this.onFileReady)
    //*
    console.log("|__ this.errorsEvent.errors", this.errorsEvent.errors)
    //*/
    if (this.errorsEvent.errors.length === 0) {
        this.setPreview(previewable, src)
    } else {
        this.inputs.fields.imageFile.trigger(this.errorsEvent, [this])
        for (let i = this.errorsEvent.errors.length - 1; i >= 0; i--) {
            let errorNamespace = this.errorsEvent.errors[i].namespace
            let errorKey = errorNamespace.split(".").pop()
            this.showError(errorKey)
        }
        
        if (typeof this.previewErrorsContainer !== "undefined") {
            this.previewErrorsContainer.addClass("visible")
            
            let errorsContainer = this.previewErrorsContainer
            let previewContainer = this.preview
            setTimeout(function () {
                errorsContainer.removeClass("visible")
                previewContainer.removeClass("has-error")
            }, this.settings.errorTimeout)
        }
        
        this.resetPreview()
    }
}
FileManager.prototype.onChange = function (event) {
    if ($(this.inputs.fields.imageFile).val() !== "") {
        this.formReset()
        this.fileSelected(event)
    } else {
        this.formReset(event)
    }
}
FileManager.prototype.isShown = function () {
    console.log("FileManager.isShown()")
    // ----
    const _is_shown = document.getElementById($(this.inputs.fields.imageIsShown).attr("id"))
    const _image_id = document.getElementById($(this.inputs.fields.imageId).attr("id"))
    //*
    console.log("|__ _is_shown", _is_shown)
    console.log("|__ _image_id", _image_id)
    //*/
    if (_is_shown && _image_id) {
        let imageId = (!isNaN(parseInt(_image_id.value))) ? parseInt(_image_id.value) : null
        if (imageId) {
            let _element = document.getElementById("image_" + imageId)
            if (_element) {
                if (_is_shown.checked === true) {
                    $(_element).addClass("is-shown")
                } else {
                    $(_element).removeClass("is-shown")
                }
            }
        }
    }
}
FileManager.prototype.isCover = function () {
    console.log("FileManager.isCover()")
    // ----
    const _is_cover = document.getElementById($(this.inputs.fields.imageIsCover).attr("id"))
    const _image_id = document.getElementById($(this.inputs.fields.imageId).attr("id"))
    //*
    console.log("|__ _is_cover", _is_cover)
    console.log("|__ _image_id", _image_id)
    //*/
    if (_is_cover && _image_id) {
        let imageId = (!isNaN(parseInt(_image_id.value))) ? parseInt(_image_id.value) : null
        if (imageId) {
            let _element = document.getElementById("image_" + imageId)
            if (_element) {
                if (_is_cover.checked === true) {
                    $("img.is-cover-image").removeClass("is-cover-image")
                    $(_element).addClass("is-cover-image")
                } else {
                    $(_element).removeClass("is-cover-image")
                }
            }
        }
    }
}
FileManager.prototype.formUpload = function () {
    console.log("FileManager.formUpload()")
    // ----
    const _image_id = document.getElementById($(this.inputs.fields.imageId).attr("id"))
    const _image_alt = document.getElementById($(this.inputs.fields.imageAlt).attr("id"))
    const _image_title = document.getElementById($(this.inputs.fields.imageTitle).attr("id"))
    const _image_caption = document.getElementById($(this.inputs.fields.imageCaption).attr("id"))
    const _image_is_shown = document.getElementById($(this.inputs.fields.imageIsShown).attr("id"))
    const _image_enabled = document.getElementById($(this.inputs.fields.imageEnabled).attr("id"))
    const _image_is_cover = document.getElementById($(this.inputs.fields.imageIsCover).attr("id"))
    const _image_height = document.getElementById($(this.inputs.displays.imageHeight).attr("id"))
    const _image_width = document.getElementById($(this.inputs.displays.imageWidth).attr("id"))
    const _image_extension = document.getElementById($(this.inputs.displays.imageExtension).attr("id"))
    const _image_dimensions = document.getElementById($(this.inputs.displays.imageDimensions).attr("id"))
    const _image_size = document.getElementById($(this.inputs.displays.imageSize).attr("id"))
    const _image_ratio = document.getElementById($(this.inputs.displays.imageRatio).attr("id"))
    const _image_file = document.getElementById($(this.inputs.fields.imageFile).attr("id"))
    const _image_file_type = document.getElementById($(this.inputs.displays.imageType).attr("id"))
    
    let filePath, fileHeight, fileWidth, fileSize, fileExtension, fileName,
        fileType, fileRatio, fileDimensions, source, sourceId,
        fileTitle, fileAlt, fileCaption, fileIsShown, fileIsCover, fileEnabled, fileId,
        fileThumbsPath, tempHeight, tempWidth = null
    let formData = new FormData()
    let xhr = new XMLHttpRequest()
    let _this = this
    
    tempHeight = (_image_height) ? _image_height.innerHTML : null
    tempHeight = tempHeight.replace("px", "")
    tempHeight = parseInt(tempHeight)
    
    tempWidth = (_image_width) ? _image_width.innerHTML : null
    tempWidth = tempWidth.replace("px", "")
    tempWidth = parseInt(tempWidth)
    
    fileId = (_image_id && !isNaN(parseInt(_image_id.value))) ? parseInt(_image_id.value) : null
    fileCaption = (_image_caption && _image_caption.value !== "") ? _image_caption.value : null
    fileTitle = (_image_title && _image_title.value !== "") ? _image_title.value : null
    fileType = (_image_file_type && _image_file_type.innerHTML !== "") ? _image_file_type.innerHTML : null
    fileAlt = (_image_alt && _image_alt.value !== "") ? _image_alt.value : null
    fileIsShown = (_image_is_shown && _image_is_shown.checked === true) ? 1 : 0
    fileEnabled = (_image_enabled && _image_enabled.checked === true) ? 1 : 0
    fileIsCover = (_image_is_cover && _image_is_cover.checked === true) ? 1 : 0
    fileName = (document.getElementById($(this.inputs.displays.imageName).attr("id"))) ? document.getElementById($(this.inputs.displays.imageName).attr("id")).innerText : null
    fileExtension = (_image_extension) ? _image_extension.innerText : null
    fileSize = (_image_size) ? _image_size.innerText : null
    fileDimensions = (_image_dimensions) ? _image_dimensions.innerText : null
    fileWidth = (tempWidth) ? (!isNaN(parseInt(tempWidth))) ? parseInt(tempWidth) : null : null
    fileHeight = (tempHeight) ? (!isNaN(parseInt(tempHeight))) ? parseInt(tempHeight) : null : null
    fileRatio = (_image_ratio) ? _image_ratio.innerText : null
    source = _this.source
    sourceId = _this.sourceId
    filePath = `/public/img/${source}/${sourceId}`
    fileThumbsPath = `/public/thumbs/${source}/${sourceId}`
    
    let dataToSend = {
        alt: fileAlt,
        caption: fileCaption,
        dimensions: fileDimensions,
        directory: source,
        directory_id: sourceId,
        enabled: fileEnabled,
        extension: fileExtension,
        height: fileHeight,
        id: fileId,
        is_cover: fileIsCover,
        is_shown: fileIsShown,
        name: fileName,
        path: filePath,
        ratio: fileRatio,
        size: fileSize,
        thumbs_path: fileThumbsPath,
        type: fileType,
        title: fileTitle,
        width: fileWidth,
    }
    
    if (this.validate()) {
        let imageId = (!isNaN(parseInt(_image_id.value))) ? parseInt(_image_id.value) : null
        
        if (imageId !== null) {
            confirmDialog(`Would you like to update this image?`, (ans) => {
                if (ans) {
                    this.sendUpdateRequest(removeNulls(dataToSend), function (data) {
                        if (data) {
                            console.log("|__ data", data)
                            let detail = _this.setDetail((data[0]) ? data[0] : data)
                            if (detail.id && detail.name) {
                                console.log("|__ detail", detail)
                                let image = _this.all.get(detail.id)
                                console.log("|__ image", image)
                                
                                _this.all.set(detail.id, detail)
                                
                                _this.formReset()
                                _this.formHide()
                                
                                toastr["success"](`${detail.name} - has been updated`, "File Manager")
                            } else {
                                console.log("|__ data", data)
                                toastr["error"](`${detail.name} - has not been updated`, "File Manager")
                            }
                        }
                    })
                }
            })
        } else {
            confirmDialog(`Would you like to add this image?`, (ans) => {
                if (ans) {
                    let file = _image_file.files[0]
                    if (file) {
                        dataToSend.file = file
                        
                        formData.append("dimensions", fileDimensions)
                        formData.append("extension", fileExtension)
                        formData.append("file", _image_file.files[0], `${fileName}.${fileExtension}`)
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
                        
                        xhr.upload.addEventListener("progress", this.uploadProgress, false)
                        xhr.addEventListener("load", this.uploadComplete, false)
                        xhr.addEventListener("error", this.uploadFailed, false)
                        xhr.addEventListener("abort", this.uploadCanceled, false)
                        
                        switch (source.toLowerCase()) {
                            case "product":
                                xhr.open("POST", "/api/v1.0/upload/product")
                                xhr.send(formData)
                                break
                            case "unit":
                                xhr.open("POST", "/api/v1.0/upload/unit")
                                xhr.send(formData)
                                break
                            case "company":
                                xhr.open("POST", "/api/v1.0/upload/company")
                                xhr.send(formData)
                                break
                            case "user":
                                xhr.open("POST", "/api/v1.0/upload/user")
                                xhr.send(formData)
                                break
                            default:
                                return
                        }
                    }
                }
            })
        }
    }
}
FileManager.prototype.uploadComplete = function (event) {
    console.log("FileManager.uploadComplete(event)", event)
    // ----
    
    let results = null
    
    if (event) {
        if (event.target) {
            if (event.target.responseText) {
                const image = JSON.parse(event.target.responseText)
                console.log("image", image)
                if (image) {
                    if (image.status && image.status === "success" && image.result !== undefined) {
                        
                        results = (image.result[0]) ? image.result[0] : image.result
                        
                        this.formReset()
                        this.formHide()
                        this.all.set(results.id, results)
                        this.galleryContainer.append(this.buildImageThumbnails(results))
                        
                        toastr["success"](`Image ${results.name} was added.`, "File Manager")
                        
                    } else if (image.status && image.status === "error" && image.error !== undefined) {
                        results = image.error
                        let counter = 1
                        let count = results.length
                        
                        $.each(results, function (i, err) {
                            console.log(`Error(${counter} of ${count}): `, err)
                            
                            counter++
                        })
                        
                        this.formReset()
                        this.formHide()
                        
                        toastr["warning"](`Image was added with issues.`, "File Manager")
                    }
                }
            }
        }
    }
}
FileManager.prototype.uploadProgress = function (event) {
    console.log("FileManager.uploadProgress(event)", event)
    // ----
    
    let _progress_bar = document.getElementById(this.inputs.fields.progress.attr("id"))
    
    if (event.lengthComputable) {
        let percentComplete = Math.round(event.loaded * 100 / event.total)
        
        _progress_bar.innerHTML = percentComplete.toString() + "%"
        $(_progress_bar).css({
            "width": `${percentComplete}%`,
            "background-color": "#007bff",
            "color": "#fff",
        })
    } else {
        _progress_bar.innerHTML = "unable to compute"
        $(_progress_bar).css({
            "width": "100%",
            "background-color": "#c58e34",
            "color": "#06030a",
        })
    }
}
FileManager.prototype.uploadFailed = function (event) {
    console.log("FileManager.uploadFailed(event)", event)
    // ----
    
}
FileManager.prototype.uploadCanceled = function (event) {
    console.log("FileManager.uploadFailed(event)", event)
    // ----
    
}
FileManager.prototype.sendRemoveRequest = function (dataToSend, callback) {
    console.log("FileManager.sendRemoveRequest(dataToSend, callback)", dataToSend, callback)
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
            return this.handleError("Error Removing Image.", "Image Manager", "error")
        }
    }
}
FileManager.prototype.sendUpdateRequest = function (dataToSend, callback) {
    console.log("FileManager.sendUpdateRequest(dataToSend, callback)", dataToSend, callback)
    // ----
    
    let _this = this
    let source = (this.source) ? this.source : null
    let sourceId = (!isNaN(parseInt(this.sourceId))) ? parseInt(this.sourceId) : null
    
    if (dataToSend && source !== null && sourceId !== null) {
        let url = `/api/v1.0/images/update`
        try {
            sendPostRequest(url, dataToSend, function (data, status, xhr) {
                if (data) {
                    return callback(data)
                }
            })
        } catch (e) {
            console.log("error", e)
            return _this.handleError("Error Retrieving Images.", "Image Manager", "error")
        }
    }
}
FileManager.prototype.validate = function () {
    console.log("FileManager.validate()")
    // ----
    let _form = this.form[0]
    return $(_form).valid()
}
FileManager.prototype.formRules = function () {
    console.log("FileManager.formRules()")
    // ----
    let rules = {}
    let messages = {}
    
    rules[`file_manager_${this.source}_form_title`] = {
        required: true,
    }
    rules[`file_manager_${this.source}_form_alt`] = {
        required: true,
    }
    rules[`file_manager_${this.source}_form_caption`] = {
        required: true,
    }
    
    messages[`file_manager_${this.source}_form_title`] = {
        required: "Field is required.",
    }
    messages[`file_manager_${this.source}_form_alt`] = {
        required: "Field is required.",
    }
    messages[`file_manager_${this.source}_form_caption`] = {
        required: "Field is required.",
    }
    
    return {
        rules: rules,
        messages: messages,
    }
}
FileManager.prototype.assignEvents = function () {
    console.log("FileManager.assignEvents()")
    // ----
    
    let _form = this.form[0]
    let formRules = this.formRules()
    
    initializeValidator(formRules)
    
    this.inputs.buttons.toggle.on("click", this.open)
    this.inputs.buttons.close.on("click", this.formHide)
    this.inputs.buttons.cancel.on("click", this.formCancel)
    this.inputs.buttons.remove.on("click", this.formRemove)
    this.inputs.buttons.clear.on("click", this.formClear)
    this.inputs.buttons.upload.on("click", this.formUpload)
    this.inputs.fields.imageFile.on("change", this.onChange)
    this.inputs.fields.imageIsShown.on("change", this.isShown)
    this.inputs.fields.imageIsCover.on("change", this.isCover)
    this.validator = $(_form).validate()
    
}
FileManager.prototype.edit = function (imageId) {
    console.log("FileManager.edit(imageId)", imageId)
    // ----
    
    let _remove_button = document.getElementById($(this.inputs.buttons.remove).attr("id"))
    
    this.formReset()
    this.inputs.buttons.upload.html("Update")
    
    if (imageId) {
        let image = this.all.get(imageId)
        let elementId = (imageId) ? "image_" + imageId.toString() : null
        let imageElement = document.getElementById(elementId)
        
        if (image && imageElement) {
            
            $(imageElement).addClass("selected")
            
            this.setDetail(image)
            this.formLoad(image)
            _remove_button.disabled = false
        }
    }
}
FileManager.prototype.open = function () {
    console.log("FileManager.open()")
    // ----
    
    $(this.inputs.fields.imageFile).trigger("click")
}
FileManager.prototype.render = function () {
    this.form = this.fileForm()
    this.gallery = this.fileGallery()
    
    $(this.element).append(this.form, this.gallery)
    this.input = $(this.inputs.fields.imageFile)[0]
    
    /**
     * Initialize Validation
     */
    let _form = document.getElementById($(this.form).attr("id"))
    //*
    initializeValidator()
    //*/
    //console.log("_form", _form)
    //return $(_form).valid()
    this.formHide()
}
FileManager.prototype.load = function (options) {
    console.log("FileManager.load(options)", options)
    // ----
    
    if (options && options.source && options.sourceId) {
        this.all = new Map()
        this.source = (options.source) ? options.source : null
        this.images = (options.images) ? options.images : []
        this.sourceId = (!isNaN(parseInt(options.sourceId))) ? parseInt(options.sourceId) : null
        this.formReset()
        this.formHide()
        this.galleryContainer.empty()
        this.loadAll()
    }
}
FileManager.prototype.init = function (options) {
    console.log("FileManager.init(options)", options)
    // ----
    
    /**
     * Display Elements
     */
    this.inputs.displays.imageId = null
    this.inputs.displays.imageName = null
    this.inputs.displays.imageAlt = null
    this.inputs.displays.imageTitle = null
    this.inputs.displays.imageIsCover = null
    this.inputs.displays.imagePath = null
    this.inputs.displays.imageExtension = null
    this.inputs.displays.imageDimensions = null
    this.inputs.displays.imageSize = null
    this.inputs.displays.imageHeight = null
    this.inputs.displays.imageWidth = null
    this.inputs.displays.imageEnabled = null
    this.inputs.displays.imageDateCreated = null
    this.inputs.displays.imageCreatedBy = null
    this.inputs.displays.imageDateModified = null
    this.inputs.displays.imageModifiedBy = null
    this.inputs.displays.imageNote = null
    this.inputs.displays.imageFile = null
    this.inputs.displays.imageType = null
    this.inputs.displays.imageRatio = null
    
    /**
     * Error Elements
     */
    this.inputs.errors.imageId = null
    this.inputs.errors.imageName = null
    this.inputs.errors.imageAlt = null
    this.inputs.errors.imageTitle = null
    this.inputs.errors.imageIsCover = null
    this.inputs.errors.imageEnabled = null
    this.inputs.errors.imageIsShown = null
    this.inputs.errors.imageFile = null
    
    /**
     * Label Elements
     */
    this.inputs.labels.imageId = null
    this.inputs.labels.imageNameField = null
    this.inputs.labels.imageNameDetail = null
    this.inputs.labels.imageAlt = null
    this.inputs.labels.imageTitle = null
    this.inputs.labels.imageIsCover = null
    this.inputs.labels.imageEnabled = null
    this.inputs.labels.imageIsShown = null
    
    /**
     * Input Elements
     */
    this.inputs.fields.imageId = null
    this.inputs.fields.imageName = null
    this.inputs.fields.imageAlt = null
    this.inputs.fields.imageTitle = null
    this.inputs.fields.imageIsCover = null
    this.inputs.fields.imageEnabled = null
    this.inputs.fields.imageIsShown = null
    this.inputs.fields.progress = null
    
    /**
     * Button Elements
     */
    this.inputs.buttons.toggle = null
    this.inputs.buttons.close = null
    this.inputs.buttons.cancel = null
    this.inputs.buttons.remove = null
    this.inputs.buttons.clear = null
    this.inputs.buttons.upload = null
    this.inputs.fields.imageFileButton = null
    
    /**
     * Loader Elements
     */
    this.loader = null
    this.input = null
    this.file.sizeFormatted = null
    
    /**
     * Sections
     */
    this.form = null
    this.gallery = null
    this.preview = null
    this.detailSection = null
    this.galleryContainer = null
    
    /**
     * URL's
     */
    this.settings.urls = {
        "get": `/api/v1.0/images/${this.source}/${this.sourceId}`,
        "update": `/api/v1.0/images/update`,
        "remove": `/api/v1.0/images/remove`,
    }
    
}

$.fn.fileManager = function (options) {
    "use strict"
    
    return new FileManager(document.getElementById($(this).attr("id")), options)
}
