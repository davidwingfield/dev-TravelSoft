$.fn.formFields = function (settings) {
    "use strict"
    let id = $(this).attr("id")
    let form = document.getElementById(id)
    let elements = form.elements
    let pre = document.createElement("pre")
    let code = document.createElement("code")
    let data = ""
    let vals = ""
    
    code.id = "constantFields"
    code.classList = [`language-javascript`]
    
    pre.appendChild(code)
    form.appendChild(pre)
    
    for (var n = 0; n < elements.length; n++) {
        let el = elements[n]
        if (el.id) {
            let id = el.id
            let constantField = `const _${id} = document.getElementById('${id}')\n`
            let constantValue = `_${id}.value = ""\n`
            data += constantField
            vals += constantValue
        }
        
    }
    
    $(code).attr("data-prismjs-copy", 'Copy the JavaScript snipp')
    code.innerHTML = data + "\n" + vals
    Prism.highlightElement(code)
}
