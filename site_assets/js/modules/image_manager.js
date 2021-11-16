$.fn.imageManager = function (options) {
    const carName = $(this).attr("id")
    const $carouselWrapper = $(this).find("div.carousel")
    const $carouselIndicators = $(this).find("ol.carousel-indicators")
    const $carouselInner = $(this).find("div.carousel-inner")
    const $dropify = $(this).find("input.dropify")
    const $imageForm = $("#image_manager_form_data")
    
    let user_id = (document.getElementById("user_id")) ? (!isNaN(parseInt(document.getElementById("user_id").value))) ? parseInt(document.getElementById("user_id").value) : 4 : 4
    
    $("#image_manager_upload_button")
      .on("click", function () {
          let file = $("input.dropify")[0].files[0]
          let upload = new Upload(file)
          upload.doUpload()
      })
    
    $("button.dropify-clear")
      .on("click", function () {
          $("input.dropify").trigger("change")
      })
    
    $("input.dropify")
      .on("change", function () {
          
          if ($(this).val() !== "") {
              show_form()
          } else {
              hide_form()
          }
      })
    
    const init = function (options) {
        
        if (options) {
            console.log("options", options)
            if (options.images) {
                loadAll(options.images)
            }
            if (options.id) {
                carouselId = "carousel-" + options.id
            }
        }
        
        $carouselWrapper.carousel()
    }
    
    const show_form = function () {
        $imageForm.show()
    }
    
    const hide_form = function () {
        $imageForm.hide()
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
        
        $carouselItem
          .addClass("carousel-item " + active)
        
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
          .appendTo($view)
        
        $heading
          .addClass("")
          .text(image_title)
          .appendTo($carouselCaption)
        
        $caption
          .addClass("")
          .text(image_caption)
          .appendTo($carouselCaption)
        
        $carouselCaption
          .addClass("carousel-caption")
          .appendTo($carouselItem)
        
        return $carouselItem
        
        switch (image_type) {
            case "jpg":
            case "jpeg":
            case "gif":
            case "png":
                return `
                    <div class="carousel-item ${active}">
                        <!--Mask color-->
                        <div class="view">
                            <img class="d-block w-100 imageManager_edit" src="" data-imgid="${image_id}" data-is_cover="${image_is_cover_image}" alt="${image_alt}">
                            <div class="mask rgba-blue-light" onclick=""></div>
                        </div>
                        <div class="carousel-caption">
                            <h3 class="h3-responsive" data-imgid="${image_id}"  data-is_cover="${image_is_cover_image}" onclick="$.fn.imageManager.this(this)">${image_title}</h3>
                            <p>${image_caption}</p>
                        </div>
                    </div>
            `
            case "avi":
            case "mpeg":
            case "mp4":
                return `
                    <div class="carousel-item ${active}">
                        <!--Mask color-->
                        <div class="view">
                            <video class="video-fluid" autoplay loop muted>
                                <source src="/public/img/${image_path}.${image_type}" type="video/mp4" />
                            </video>
                            <div class="mask rgba-blue-light"></div>
                        </div>
                        <div class="carousel-caption">
                            <h3 class="h3-responsive" data-imgid="${image_id}"  data-is_cover="${image_is_cover_image}" >${image_title}</h3>
                            <p>${image_caption}</p>
                        </div>
                    </div>
            `
        }
        
    }
    
    const formatIndicator = function (image, count) {
        let active = (count === 0) ? "active" : ""
        let $li = $("<li>")
        $li
          .addClass(active)
          .attr("data-slide-to", count)
          .attr("data-target", "#carousel-companyImageManager")
        return $li
        
        return `
        <li data-target="#carousel-companyImageManager" data-slide-to="${count}" class="${active}"></li>
        `
    }
    
    let counter = 0
    let carouselId = ""
    
    const loadAll = function (images) {
        
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
        console.log("all", this.all)
    }
    
    init(options)
    
    const addImage = function (image) {
        if (image) {
            this.all.set(image.id, image)
            //$carouselIndicators.appendTo(formatIndicator(image, counter))
            //$carouselInner.appendTo(formatImage(image, counter))
            // counter += 1
        }
        
    }
    
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
    }
}

