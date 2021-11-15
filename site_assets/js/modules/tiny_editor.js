const tinyEditor = (function () {
    "use strict"
    let but_toggle
    
    const init = function (settings) {
        but_toggle = document.querySelectorAll(".but_toggle")
        
        but_toggle.forEach(el => el.addEventListener("click", event => {
            
            if (el.dataset.texted) {
                let editorId = el.dataset.texted
                let editor = $("#" + editorId)
                if (tinyMCE.get(editorId)) {
                    
                    editor.val(decodeHtml(editor.val()))
                    tinymce.remove("#" + editorId)
                } else {
                    editor.val(decodeHtml(editor.val()))
                    addTinyMCE(editorId)
                }
            }
        }))
    }
    
    const addTinyMCE = function (el) {
        
        tinymce.init({
            selector: "#" + el,
            menubar: false,
            height: "400",
            plugins: "print visualblocks visualchars charmap hr pagebreak advlist lists",
            content_css: [
                "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
                "/public/css/bootstrap.min.css",
                "/public/css/style.css",
                "/public/css/variant.css",
            ],
            body_class: "p-2",
            font_formats: "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Open Sans=Open Sans;Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
            toolbar1: "undo redo | styleselect | fontselect fontsizeselect | removeformat | numlist bullist checklist | outdent indent ",
            toolbar2: "cut copy | bold italic underline strikethrough | forecolor | alignleft aligncenter alignright alignjustify | backcolor",
            
            content_style: "body { font-family:\"Open Sans\", sans-serif; font-size:14px; font-weight: 400 }",
            style_formats: [
                {
                    title: "Headers",
                    items: [
                        {
                            title: "h1",
                            block: "h1",
                        },
                        {
                            title: "h2",
                            block: "h2",
                        },
                        {
                            title: "h3",
                            block: "h3",
                        },
                        {
                            title: "h4",
                            block: "h4",
                        },
                        {
                            title: "h5",
                            block: "h5",
                        },
                        {
                            title: "h6",
                            block: "h6",
                        },
                    ],
                }, {
                    title: "Blocks",
                    items: [
                        {
                            title: "p",
                            block: "p",
                        },
                        {
                            title: "div",
                            block: "div",
                        },
                        {
                            title: "pre",
                            block: "pre",
                        },
                    ],
                },
                
                {
                    title: "Containers",
                    items: [
                        {
                            title: "section",
                            block: "section",
                            wrapper: true,
                            merge_siblings: false,
                        },
                        {
                            title: "article",
                            block: "article",
                            wrapper: true,
                            merge_siblings: false,
                        },
                        {
                            title: "blockquote",
                            block: "blockquote",
                            wrapper: true,
                        },
                        {
                            title: "hgroup",
                            block: "hgroup",
                            wrapper: true,
                        },
                        {
                            title: "aside",
                            block: "aside",
                            wrapper: true,
                        },
                        {
                            title: "figure",
                            block: "figure",
                            wrapper: true,
                        },
                    ],
                },
            ],
            branding: false,
            resize: false,
            setup: function (editor) {
                editor.on("change", function () {
                    editor.save()
                })
            },
        })
    }
    
    return {
        addTinyMCE: function (el) {
            addTinyMCE(el)
        },
        init: function () {
            init()
        },
    }
})()
$(document).ready(function () {
    tinyEditor.init()
})

