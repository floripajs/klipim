;(function( window, document, undefined ) {

"use strict";

var klipim = require( './app/klipim' );

var inProduction = 'klip.im' === window.location.hostname;
var inDevMode = ( '?development' === window.location.search );
var inProductionAndNotDevMode = inProduction && ! inDevMode;

if( inProductionAndNotDevMode ) {
    window.console = console || {};
    console.assert = console.clear = console.constructor = console.count = console.debug = console.dir = console.dirxml = console.error = console.group = console.groupCollapsed = console.groupEnd = console.info = console.log = console.markTimeline = console.profile = console.profileEnd = console.table = console.time = console.timeEnd = console.timeStamp = console.timeline = console.timelineEnd = console.trace = console.warn = function() { return false; };
}

// -------------------------------------------

var app = (function() {

var $private = {};
var $public = {};

// -------------------------------------------

$public.init = function init() {
    console.log( 'Init' );
    klipim.init();
};

// -------------------------------------------

return $public;

})();

document.addEventListener( 'DOMContentLoaded', function() {
    app.init();
});

})( window, document );