$.fn.imageManager = function (options) {
    const $carouselWrapper = $(this).find("div.carousel")
    const $carouselIndicators = $(this).find("ol.carousel-indicators")
    const $carouselInner = $(this).find("div.carousel-inner")
    const _form_edit_company_images = document.getElementById("companyImageManager")
    const _image_manager_is_cover_image = document.getElementById("image_manager_is_cover_image")
    const _image_manager_title = document.getElementById("image_manager_title")
    const _image_manager_caption = document.getElementById("image_manager_caption")
    const _image_manager_upload = document.getElementById("image_manager_upload")
    const _image_manager_alt_text = document.getElementById("image_manager_alt_text")
    const _image_manager_form_data = document.getElementById("image_manager_form_data")
    const _image_manager_image_id = document.getElementById("image_manager_id")
    const $imageForm = $("#image_manager_form_data")
    const _vendor_edit = document.getElementById("vendor_edit")
    const _image_manager_cancel_upload = document.getElementById("image_manager_cancel_upload")
    let drEvent, validator
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    let counter = 0
    let carouselId = ""
    
    const form_rules = {
        rules: {
            image_manager_title: {
                required: true,
            },
            image_manager_alt_text: {
                required: true,
            },
            image_manager_caption: {
                required: true,
            },
        },
        messages: {
            image_manager_title: {
                required: "Field Required",
            },
            image_manager_alt_text: {
                required: "Field Required",
            },
            image_manager_caption: {
                required: "Field Required",
            },
        },
    }
    
    $("#image_manager_upload_button")
      .on("click", function () {
          if (_form_edit_company_images) {
              if (validate_form()) {
                  confirmDialog(`Would you like to update?`, (ans) => {
                      if (ans) {
                          save()
                      }
                  })
              }
          }
      })
    
    $("button.dropify-clear")
      .on("click", function () {
          $("input.dropify").trigger("change")
      })
    
    $(_image_manager_cancel_upload)
      .on("click", function () {
          Upload.prototype.resetForm()
          $("button.dropify-clear").trigger("click")
      })
    
    const handle_image_error = function (msg) {
        toastr.error(msg)
    }
    
    const updateImage = function (dataToSend, callback) {
        let url = "/api/v1.0/images/update"
        
        if (dataToSend) {
            Console.log("data", dataToSend)
            try {
                sendPostRequest(url, dataToSend, function (data, status, xhr) {
                    if (data) {
                        return callback(data)
                    } else {
                        return handle_image_error("Oops: 1")
                    }
                })
            } catch (e) {
                Console.log("error", e)
            }
        }
    }
    
    const validate_form = function () {
        return $(_form_edit_company_images).valid()
    }
    
    const init = function (options) {
        drEvent = $("#image_manager_upload").dropify({})
        if (options) {
            if (options.images) {
                loadAll(options.images)
            }
            if (options.id) {
                carouselId = "carousel-" + options.id
            }
        }
        if (_form_edit_company_images) {
            validator_init(form_rules)
            validator = $(_form_edit_company_images).validate()
            
        }
        
        $carouselWrapper.carousel()
    }
    
    const save = function () {
        let file = null
        if (_image_manager_image_id) {
            if (!isNaN(parseInt(_image_manager_image_id.value))) {
                let dataToSend = this.all.get(parseInt(_image_manager_image_id.value))
                
                dataToSend.alt = (_image_manager_alt_text.value !== "") ? _image_manager_alt_text.value : null
                dataToSend.caption = (_image_manager_caption.value !== "") ? _image_manager_caption.value : null
                dataToSend.is_cover_image = (_image_manager_is_cover_image.checked === true) ? 1 : 0
                dataToSend.title = (_image_manager_title.value !== "") ? _image_manager_title.value : null
                
                if (_provider_edit) {
                    dataToSend.directory_id = (parseInt(_provider_company_id.value))
                    dataToSend.directory = "company"
                }
                
                if (_vendor_edit) {
                    dataToSend.directory_id = (parseInt(_provider_company_id.value))
                    dataToSend.directory = "company"
                }
                
                updateImage(dataToSend, function (data) {
                    Console.log("data", data)
                    let image
                    
                    if (data) {
                        if (data[0]) {
                            image = data[0]
                            set(image)
                        }
                    }
                })
                
            } else {
                let $input = $(_image_manager_upload)
                
                if ($input) {
                    if ($input[0]) {
                        if ($input[0].files) {
                            if ($input[0].files[0]) {
                                file = $input[0].files[0]
                                let upload = new Upload(file)
                                upload.doUpload()
                            } else {
                                //Console.log("Missing $input[0].files[0]")
                            }
                        } else {
                            //Console.log("Missing $input[0].files")
                        }
                    } else {
                        //Console.log("Missing $input[0]")
                    }
                } else {
                    //Console.log("Missing $input")
                }
            }
        }
    }
    
    const default_detail = function () {
        return {
            id: null,
            path: null,
            type: null,
            caption: null,
            alt: null,
            is_cover_image: 0,
            enabled: 1,
            date_created: formatDateMySQL(),
            created_by: user_id,
            date_modified: formatDateMySQL(),
            modified_by: user_id,
            note: null,
        }
    }
    
    const set_detail = function (image) {
        let detail = default_detail()
        detail.alt = (image.alt) ? image.alt : ""
        detail._caption = (image.caption) ? image.caption : "This is a Test Caption 3"
        detail.id = (image.id) ? image.id : 3
        detail.is_cover_image = (image.is_cover_image) ? image.is_cover_image : 0
        detail.path = (image.path) ? image.path : "/company/1/image_3"
        detail.title = (image.title) ? image.title : "Image 3"
        detail.type = (image.type) ? image.type : "jpg"
        
        return detail
    }
    
    const formatImage = function (image, count) {
        let detail = set_detail(image)
        let image_alt = (image.alt) ? image.alt : ""
        let image_name = (image.name) ? image.name : ""
        let image_caption = (image.caption) ? image.caption : ""
        let image_id = (image.id) ? image.id : 3
        let image_is_cover_image = (image.is_cover_image) ? image.is_cover_image : 0
        let image_path = (image.path) ? image.path : ""
        let image_title = (image.title) ? image.title : ""
        let image_type = (image.extension) ? image.extension : "jpg"
        let active = (count === 0) ? "active " : ""
        let $heading = $("<H3>")
        let $image = $("<img>")
        let $carouselItem = $("<div>")
        let $carouselCaption = $("<div>")
        let $view = $("<div>")
        let $mask = $("<div>")
        let $caption = $("<p>")
        let is_cover = (image.is_cover_image === 1) ? " is_cover " : ""
        
        $carouselItem
          .addClass("carousel-item " + active + is_cover)
        
        $view
          .addClass("view")
          .appendTo($carouselItem)
        
        $image
          .addClass("d-block w-100 imageManager_edit")
          .attr("src", `${image_path}/${image_name}.${image_type}`)
          .data("imgid", image_id)
          .data("is_cover", image_is_cover_image)
          .attr("alt", image_alt)
          .appendTo($view)
        
        $mask
          .addClass("mask rgba-blue-light")
          .data("key", image)
          .css({ "cursor": "pointer" })
          .on("click", function () {
              populate_form($(this).data("key"))
          })
          .appendTo($view)
        
        $heading
          .addClass("")
          .text(image_title)
          .appendTo($carouselCaption)
          .css({ "cursor": "pointer" })
          .data("key", image)
          .on("click", function () {
              populate_form($(this).data("key"))
          })
        
        $caption
          .addClass("")
          .text(image_caption)
          .appendTo($carouselCaption)
          .data("key", image)
          .css({ "cursor": "pointer" })
          .on("click", function () {
              populate_form($(this).data("key"))
          })
        
        $carouselCaption
          .addClass("carousel-caption")
          .appendTo($carouselItem)
        
        return $carouselItem
        
    }
    
    const populate_form = function (image) {
        Upload.prototype.populateForm(image)
    }
    
    const formatIndicator = function (image, count) {
        let active = (count === 0) ? "active" : ""
        let is_cover = (image.is_cover_image === 1) ? " is_cover " : ""
        let $li = $("<li>")
        $li
          .addClass(active + " " + is_cover)
          .attr("data-slide-to", count)
          .attr("data-target", "#carousel-companyImageManager")
        return $li
    }
    
    const format_image_lightbox = function (image) {
        Console.log(image)
        
        if (image) {
            let image_alt = (image.alt) ? image.alt : ""
            let image_name = (image.name) ? image.name : ""
            let image_caption = (image.caption) ? image.caption : ""
            let image_id = (image.id) ? image.id : 3
            let image_is_cover_image = (image.is_cover_image) ? image.is_cover_image : 0
            let image_path = (image.path) ? image.path : ""
            let image_title = (image.title) ? image.title : ""
            let image_type = (image.extension) ? image.extension : "jpg"
            let data_size = image.width + "x" + image.height
            let thumbs_path = image.path.replace("public/img", "public/img/thumbs")
            let $img = $(`<img src="${thumbs_path}/${image_name}.${image_type}"  alt="${image_alt}" class="img-fluid" >`)
            $img.data("key", image)
            
            let $figure = $("<figure class='col-md-4'>")
            let $a = $(`<a href="${image_path}/${image_name}.${image_type}" data-size="${data_size}">`)
            $img.appendTo($a)
            
            let $figcaption = $("<figcaption itemprop='caption description'>")
            $figcaption.text = image_caption
            
            $a.appendTo($figure)
            $figcaption.appendTo($figure)
            return $figure
        }
        
    }
    
    const loadAll = function (images) {
        counter = 0
        $carouselIndicators.empty()
        $carouselInner.empty()
        this.all = new Map()
        
        for (let n = 0; n < images.length; n++) {
            let im = images[n]
            this.all.set(im.id, im)
            $carouselIndicators.append(formatIndicator(im, counter))
            $carouselInner.append(formatImage(im, counter))
            counter += 1
        }
        
    }
    
    const set = function (image) {
        if (image) {
            this.all.set(image.id, image)
            loadAll(Array.from(this.all.values()))
        }
    }
    
    const addImage = function (image) {
        if (image) {
            this.all.set(image.id, image)
            loadAll(Array.from(this.all.values()))
        }
    }
    
    init(options)
    
    return {
        addImage: function (image) {
            addImage(image)
        },
        reset: function () {
        
        },
        all: new Map(),
        init: function (settings) {
            init(settings)
        },
        loadAll: function (images) {
            loadAll(images)
        },
    }
}

