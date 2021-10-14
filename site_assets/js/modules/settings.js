const mySQLDate = ""
const defaultLocationDisplayFormat = "medium" //long medium short
const sideNavOptions = {
    edge: "left", // Choose the horizontal origin
    closeOnClick: false, // Closes side-nav on &lt;a&gt; clicks, useful for Angular/Meteor
    breakpoint: 1200, // Breakpoint for button collapse
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
    "progressBar": false,
    "positionClass": "md-toast-top-center",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": 301,
    "hideDuration": 1000,
    "timeOut": 5000,
    "extendedTimeOut": 1000,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut",
}
