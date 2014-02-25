var inProduction = 'klip.im' === window.location.hostname;
var inDevMode = ( '?development' === window.location.search );
var inProductionAndNotDevMode = inProduction && ! inDevMode;

if( inProductionAndNotDevMode ) {
    var console = console || {};
    console.assert = console.clear = console.constructor = console.count = console.debug = console.dir = console.dirxml = console.error = console.group = console.groupCollapsed = console.groupEnd = console.info = console.log = console.markTimeline = console.profile = console.profileEnd = console.table = console.time = console.timeEnd = console.timeStamp = console.timeline = console.timelineEnd = console.trace = console.warn = function() { return false; };
}

// ----------------------------------------------------

;(function( window, document, undefined ) {

var klipim = (function() {

return {

    init : function init() {
        console.log( 'Loaded src/js/scripts.js' );
    }

}; // return

})(); // klipim

document.addEventListener( 'DOMContentLoaded', function() {
    klipim.init();
});

})( window, document );