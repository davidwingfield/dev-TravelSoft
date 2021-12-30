$.fn.DisabledDOW = function (settings) {
    "use strict"
    let id = this.attr("id")
    let name_prefix = id + "_"
    if (settings) {
        if (settings.name && settings.name !== "") {
            name_prefix = settings.name
        }
    }
    const _this = document.getElementById(id)
    const $this = $(_this)
    
    $this.on("change", function () {
        console.log("change")
    })
    
    const buildCheckBox = function (day) {
        let input = document.createElement("input")
        input.type = "checkbox"
        input.classList = day.class
        input.id = day.for
        input.name = day.for
        input.value = day.value
        
        input.addEventListener("click", event => {
            let id = (input.id) ? input.id : ""
            set(input, id)
        })
        
        return input
    }
    
    const buildCheckBoxWrapper = function () {
        let div = document.createElement("div")
        div.classList = "custom-control custom-checkbox custom-control-inline"
        return div
    }
    
    const buildCheckBoxLabel = function (day) {
        let label = document.createElement("label")
        label.classList = "custom-control-label"
        label.htmlFor = day.for
        label.innerText = day.label
        return label
    }
    
    const buildCheckBoxColumn = function () {
        let days = Array.from(DisabledDOW.days_of_week.values())
        let div = document.createElement("div")
        
        div.classList = "col-12 col-md-10 col-xl-9"
        
        $.each(days, function (k, day) {
            let wrapper = buildCheckBoxWrapper()
            let label = buildCheckBoxLabel(day)
            let input = buildCheckBox(day)
            wrapper.appendChild(input)
            wrapper.appendChild(label)
            div.appendChild(wrapper)
        })
        
        return div
    }
    
    const buildCheckBoxColumnLabel = function () {
        let div = document.createElement("div")
        let label = document.createElement("label")
        label.innerText = "Disabled DOW:"
        
        div.classList = "col-12 col-md-2 col-xl-3"
        
        div.appendChild(label)
        return div
    }
    
    const buildCheckBoxRow = function () {
        let div = document.createElement("div")
        div.classList = "row"
        return div
    }
    
    const buildForm = function () {
        $this.empty()
        DisabledDOW.days_of_week = new Map()
        
        DisabledDOW.days_of_week.set(
          "*", {
              label: "All",
              for: name_prefix + "dow_select_all",
              value: "*",
              class: "custom-control-input dow_select",
          })
        DisabledDOW.days_of_week.set(
          "0", {
              label: "Sun",
              for: name_prefix + "dow_select_sun",
              value: 0,
              class: "custom-control-input dow_select",
          })
        DisabledDOW.days_of_week.set(
          "1", {
              label: "Mon",
              for: name_prefix + "dow_select_mon",
              value: 1,
              class: "custom-control-input dow_select",
          })
        DisabledDOW.days_of_week.set(
          "2", {
              label: "Tue",
              for: name_prefix + "dow_select_tue",
              value: 2,
              class: "custom-control-input dow_select",
          })
        DisabledDOW.days_of_week.set(
          "3", {
              label: "Wed",
              for: name_prefix + "dow_select_wed",
              value: 3,
              class: "custom-control-input dow_select",
          })
        DisabledDOW.days_of_week.set(
          "4", {
              label: "Thu",
              for: name_prefix + "dow_select_thu",
              value: 4,
              class: "custom-control-input dow_select",
          })
        DisabledDOW.days_of_week.set(
          "5", {
              label: "Fri",
              for: name_prefix + "dow_select_fri",
              value: 5,
              class: "custom-control-input dow_select",
          })
        DisabledDOW.days_of_week.set(
          "6", {
              label: "Sat",
              for: name_prefix + "dow_select_sat",
              value: 6,
              class: "custom-control-input dow_select",
          })
        
        let row = buildCheckBoxRow()
        let leadColumn = buildCheckBoxColumnLabel()
        let column = buildCheckBoxColumn()
        row.appendChild(leadColumn)
        row.appendChild(column)
        _this.appendChild(row)
    }
    
    const clear_selected = function () {
        $.each(Array.from(DisabledDOW.days_of_week.values()), function (k, day) {
            document.getElementById(day.for).checked = false
        })
    }
    
    const updateCheckBoxes = function () {
        clear_selected()
        $.each(DisabledDOW.disabled_dows, function (k, v) {
            
            let id = (typeof v === "number") ? v.toString() : v
            let day = DisabledDOW.days_of_week.get(id)
            
            Console.log("DisabledDOW.days_of_week", DisabledDOW.days_of_week)
            if (day) {
                if (day.for) {
                    document.getElementById(day.for).checked = true
                }
            }
            
        })
        
        if (DisabledDOW.disabled_dows.length === 7) {
            document.getElementById(name_prefix + "dow_select_all").checked = true
        }
    }
    
    const set = function (el, val) {
        let indexId, index
        switch (val) {
            case name_prefix + "dow_select_all":
                
                if (el.checked === true) {
                    DisabledDOW.disabled_dows = [0, 1, 2, 3, 4, 5, 6]
                } else {
                    DisabledDOW.disabled_dows = []
                }
                DisabledDOW.disabled_dows.sort()
                Console.log("dow_select_all", DisabledDOW.disabled_dows)
                break
            case name_prefix + "dow_select_sun":
                indexId = 0
                index = DisabledDOW.disabled_dows.indexOf(indexId)
                if (el.checked === true) {
                    if (!index > -1) {
                        DisabledDOW.disabled_dows.push(indexId)
                    }
                } else {
                    if (index > -1) {
                        DisabledDOW.disabled_dows.splice(index, 1)
                    }
                }
                DisabledDOW.disabled_dows.sort()
                Console.log("dow_select_sun", DisabledDOW.disabled_dows)
                break
            case name_prefix + "dow_select_mon":
                indexId = 1
                index = DisabledDOW.disabled_dows.indexOf(indexId)
                if (el.checked === true) {
                    if (!index > -1) {
                        DisabledDOW.disabled_dows.push(indexId)
                    }
                } else {
                    if (index > -1) {
                        DisabledDOW.disabled_dows.splice(index, 1)
                    }
                }
                DisabledDOW.disabled_dows.sort()
                Console.log("dow_select_mon", DisabledDOW.disabled_dows)
                break
            case name_prefix + "dow_select_tue":
                indexId = 2
                index = DisabledDOW.disabled_dows.indexOf(indexId)
                if (el.checked === true) {
                    if (!index > -1) {
                        DisabledDOW.disabled_dows.push(indexId)
                    }
                } else {
                    if (index > -1) {
                        DisabledDOW.disabled_dows.splice(index, 1)
                    }
                }
                DisabledDOW.disabled_dows.sort()
                Console.log("dow_select_tue", DisabledDOW.disabled_dows)
                break
            case name_prefix + "dow_select_wed":
                indexId = 3
                index = DisabledDOW.disabled_dows.indexOf(indexId)
                if (el.checked === true) {
                    if (!index > -1) {
                        DisabledDOW.disabled_dows.push(indexId)
                    }
                } else {
                    if (index > -1) {
                        DisabledDOW.disabled_dows.splice(index, 1)
                    }
                }
                DisabledDOW.disabled_dows.sort()
                Console.log("dow_select_wed", DisabledDOW.disabled_dows)
                break
            case name_prefix + "dow_select_thu":
                indexId = 4
                index = DisabledDOW.disabled_dows.indexOf(indexId)
                if (el.checked === true) {
                    if (!index > -1) {
                        DisabledDOW.disabled_dows.push(indexId)
                    }
                } else {
                    if (index > -1) {
                        DisabledDOW.disabled_dows.splice(index, 1)
                    }
                }
                DisabledDOW.disabled_dows.sort()
                Console.log("dow_select_thu", DisabledDOW.disabled_dows)
                break
            case name_prefix + "dow_select_fri":
                indexId = 5
                index = DisabledDOW.disabled_dows.indexOf(indexId)
                if (el.checked === true) {
                    if (!index > -1) {
                        DisabledDOW.disabled_dows.push(indexId)
                    }
                } else {
                    if (index > -1) {
                        DisabledDOW.disabled_dows.splice(index, 1)
                    }
                }
                DisabledDOW.disabled_dows.sort()
                Console.log("dow_select_fri", DisabledDOW.disabled_dows)
                break
            case name_prefix + "dow_select_sat":
                indexId = 6
                index = DisabledDOW.disabled_dows.indexOf(indexId)
                if (el.checked === true) {
                    if (!index > -1) {
                        DisabledDOW.disabled_dows.push(indexId)
                    }
                } else {
                    if (index > -1) {
                        DisabledDOW.disabled_dows.splice(index, 1)
                    }
                }
                DisabledDOW.disabled_dows.sort()
                Console.log("dow_select_sat", DisabledDOW.disabled_dows)
                break
            default:
                break
        }
        
        updateCheckBoxes()
    }
    
    const init = function (disabled_dow) {
        let disabled_days = []
        
        if (disabled_dow) {
            if (typeof disabled_dow === "string") {
                disabled_days = getListOfIds(disabled_dow)
            } else if (typeof disabled_dow === "object") {
                disabled_days = disabled_dow
            }
            
        }
        
        DisabledDOW.disabled_dows = disabled_days
        updateCheckBoxes()
    }
    
    const DisabledDOW = {
        days_of_week: [],
        disabled_dows: [],
        els: [],
        init: function (disabled_dow) {
            init(disabled_dow)
        },
    }
    
    buildForm()
    return DisabledDOW
}
//DisabledDOW.disabled_dows
