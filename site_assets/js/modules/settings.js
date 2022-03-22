const mySQLDate = ""
const defaultLocationDisplayFormat = "medium" //long medium short
const populateDefaultValues = false
const defaultDateFormat = "YYYY-MM-DD"
const sideNavOptions = {
    edge: "left", // Choose the horizontal origin
    closeOnClick: false, // Closes side-nav on &lt;a&gt; clicks, useful for Angular/Meteor
    breakpoint: 1199, // Breakpoint for button collapse
    menuWidth: 240, // Width for sidenav
    timeDurationOpen: 500, // Time duration open menu
    timeDurationClose: 500, // Time duration open menu
    timeDurationOverlayOpen: 200, // Time duration open overlay
    timeDurationOverlayClose: 200, // Time duration close overlay
    easingOpen: "easeInOutQuad", // Open animation
    easingClose: "easeInOutQuad", // Close animation
    showOverlay: true, // Display overflay
    showCloseButton: false, // Append close button into siednav
    slim: false, // turn on slime mode
    onOpen: null, // callback function
    onClose: null, // callback function
    mode: "over", // change sidenav mode
}
const toastrOptions = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "md-toast-bottom-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": 300000000, //300,
    "hideDuration": 1000000000, //1000
    "timeOut": 5000000, //5000
    "extendedTimeOut": 1000000, //1000
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut",
}
const dow_short = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
]
const days = [
    {
        name: "Sunday",
        short: "Sun",
    }, {
        name: "Monday",
        short: "Mon",
    }, {
        name: "Tuesday",
        short: "Tue",
    },
    {
        name: "Wednesday",
        short: "Wed",
    },
    {
        name: "Thursday",
        short: "Thu",
    },
    {
        name: "Friday",
        short: "Fri",
    },
    {
        name: "Saturday",
        short: "Sat",
    },
]
const dowStart = 1
const short_dexcription_max = 250
const colorScheme = new Map()
const toggleAJAXResponse = false
const debugMode = true

colorScheme.set(1, {
    name: "Color - 1",
    backGround: "#bdbdbd",
    borderColor: "#686868",
    textColor: "#000",
})
colorScheme.set(2, {
    name: "Color - 2",
    backGround: "#54cbe3",
    borderColor: "#357f8e",
    textColor: "#000",
})
colorScheme.set(3, {
    name: "Color - 3",
    backGround: "#49de94",
    borderColor: "#2d895b",
    textColor: "#000",
})
colorScheme.set(4, {
    name: "Color - 4",
    backGround: "#ab8c82",
    borderColor: "#564641",
    textColor: "#000",
})
colorScheme.set(5, {
    name: "Color - 5",
    backGround: "#ffcd17",
    borderColor: "#aa890f",
    textColor: "#000",
})
colorScheme.set(6, {
    name: "Color - 6",
    backGround: "#96a3fa",
    borderColor: "#636ca5",
    textColor: "#000",
})
colorScheme.set(7, {
    name: "Color - 7",
    backGround: "#fa983c",
    borderColor: "#a56428",
    textColor: "#000",
})
colorScheme.set(8, {
    name: "Color - 8",
    backGround: "#17b3a3",
    borderColor: "#0c5e56",
    textColor: "#000",
})
colorScheme.set(9, {
    name: "Color - 9",
    backGround: "#76838f",
    borderColor: "#30353a",
    textColor: "#fff",
})
colorScheme.set(10, {
    name: "Color - 10",
    backGround: "#910112",
    borderColor: "#3c0007",
    textColor: "#fff",
})
colorScheme.set(11, {
    name: "Color - 11",
    backGround: "#ff666b",
    borderColor: "#aa4447",
    textColor: "#000",
})
colorScheme.set(12, {
    name: "Color - 12",
    backGround: "#3e8ef7",
    borderColor: "#295da2",
    textColor: "#000",
})
colorScheme.set(13, {
    name: "Color - 13",
    backGround: "#f74584",
    borderColor: "#a22d57",
    textColor: "#000",
})
colorScheme.set(14, {
    name: "Color - 14",
    backGround: "#5a9101",
    borderColor: "#253c00",
    textColor: "#fff",
})
colorScheme.set(15, {
    name: "Color - 15",
    backGround: "#9463f7",
    borderColor: "#6141a2",
    textColor: "#fff",
})
const tableCellMaxChars = 10
const defaultAddressView = "medium"//short, medium, long
const DEBUGMODE = true
const inactivityTimeout = 60000 * 60
const initialCalenderViewCount = 12
const FILE_TYPES = {
    "aac": "audio/aac",
    "abw": "application/x-abiword",
    "arc": "application/x-freearc",
    "avi": "video/x-msvideo",
    "azw": "application/vnd.amazon.ebook",
    "bin": "application/octet-stream",
    "bmp": "image/bmp",
    "bz": "application/x-bzip",
    "bz2": "application/x-bzip2",
    "csh": "application/x-csh",
    "css": "text/css",
    "csv": "text/csv",
    "doc": "application/msword",
    "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "eot": "application/vnd.ms-fontobject",
    "epub": "application/epub+zip",
    "gz": "application/gzip",
    "gif": "image/gif",
    "htm": "text/html",
    "html": "text/html",
    "ico": "image/vnd.microsoft.icon",
    "ics": "text/calendar",
    "jar": "application/java-archive",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "jsonld": "application/ld+json",
    "mid": "audio/midi audio/x-midi",
    "midi": "audio/midi audio/x-midi",
    "mjs": "text/javascript",
    "mp3": "audio/mpeg",
    "mpeg": "video/mpeg",
    "mpkg": "application/vnd.apple.installer+xml",
    "odp": "application/vnd.oasis.opendocument.presentation",
    "ods": "application/vnd.oasis.opendocument.spreadsheet",
    "odt": "application/vnd.oasis.opendocument.text",
    "oga": "audio/ogg",
    "ogv": "video/ogg",
    "ogx": "application/ogg",
    "opus": "audio/opus",
    "otf": "font/otf",
    "png": "image/png",
    "pdf": "application/pdf",
    "php": "application/x-httpd-php",
    "ppt": "application/vnd.ms-powerpoint",
    "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "rar": "application/vnd.rar",
    "rtf": "application/rtf",
    "sh": "application/x-sh",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tar": "application/x-tar",
    "tif": "image/tiff",
    "tiff": "image/tiff",
    "ts": "video/mp2t",
    "ttf": "font/ttf",
    "txt": "text/plain",
    "vsd": "application/vnd.visio",
    "wav": "audio/wav",
    "weba": "audio/webm",
    "webm": "video/webm",
    "webp": "image/webp",
    "woff": "font/woff",
    "woff2": "font/woff2",
    "xhtml": "application/xhtml+xml",
    "xls": "application/vnd.ms-excel",
    "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "xml": "text/xml",
    "xul": "application/vnd.mozilla.xul+xml",
    "zip": "application/zip",
    "7z": "application/x-7z-compressed",
}
const STANDARD_ASPECT_RATIOS = [
    [1, "1:1"],
    [4 / 3, "4:3"],
    [5 / 4, "5:4"],
    [3 / 2, "3:2"],
    [16 / 10, "16:10"],
    [16 / 9, "16:9"],
    [21 / 9, "21:9"],
    [32 / 9, "32:9"],
]
let ERROR_ALLOWED = 0.05
let RATIOS = STANDARD_ASPECT_RATIOS.map(function (tpl) {return tpl[0]}).sort()
let LOOKUP = Object()
for (let i = 0; i < STANDARD_ASPECT_RATIOS.length; i++) {
    LOOKUP[STANDARD_ASPECT_RATIOS[i][0]] = STANDARD_ASPECT_RATIOS[i][1]
}
