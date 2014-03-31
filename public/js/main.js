;(function( window, document, undefined ) {

var Ajax = (function() {

    var $private = {};
    var $public = {};

    // -------------------------------------------

    $private.newAjaxInstance = function ajaxInstance() {
        return new XMLHttpRequest();
    };

    // -------------------------------------------

    $private.ajaxComplete = function ajaxComplete( ajaxInstance ) {
        if( !ajaxInstance ) {
            return false;
        }

        if( ajaxInstance.readyState === 4 && ajaxInstance.status === 200 ) {
            return JSON.parse( ajaxInstance.responseText );
        }
        else {
            return false;
        }
    };

    // -------------------------------------------

    $public.getJSON = function get( url ) {
        var ajaxGetInstance = $private.newAjaxInstance();

        ajaxGetInstance.open( 'GET', url, false );
        ajaxGetInstance.send( null );

        return $private.ajaxComplete( ajaxGetInstance );
    };

    // -------------------------------------------

    return $public;

})();

window.Ajax = Ajax;

})( window, document );
;(function( window, document, undefined ) {

var ModelKlipim = (function() {
    var $private = {};
    var $public = {};

    // -------------------------------------------

    $public.init = function init() {
        console.log( 'ModelKlipim' );
        $public.getJSONData();
    };

    // -------------------------------------------

    $public.getJSONData = function getJSONData() {
        console.log( 'getJSONData' );
        return Ajax.getJSON( '/public/json/stickers.json' );
    };

    // -------------------------------------------

    return $public;
})();

window.ModelKlipim = ModelKlipim;

})( window, document );
;(function( window, document, undefined ) {

var ControllerKlipim = (function() {

    var $private = {};
    var $public = {};

    // -------------------------------------------

    $private.modelKlipim = ModelKlipim;

    // -------------------------------------------

    $private.initEvents = function initEvents() {

    };

    // -------------------------------------------

    $private.addStickersToView = function addStickersToView() {
        console.log( 'AddStickersToView' );
        var doc = document;
        var stickersJSON = $private.modelKlipim.getJSONData();
        var $stickerTitle = doc.querySelector( '.sticker-title' );
        var $stickerLink = doc.querySelector( '.sticker-link' );
        var $stickersList = doc.querySelector( '#stickers-list' );
        var $stickers = doc.createDocumentFragment();
        var newLi;
        var newSticker;
        // console.log( stickersJSON );

        for( var i = stickersJSON.length; i--; ) {
            newLi = doc.createElement( 'li' );
            newLi.classList.add( 'sticker-item', 'sticker-' + i );

            newSticker = doc.createElement( 'img' );
            newSticker.classList.add( 'sticker-item-image' );
            newSticker.id = 'img-' + i;
            newSticker.src = '/stickers/' + stickersJSON[i].path;

            newLi.appendChild( newSticker );
            $stickers.insertBefore( newLi, $stickers.firstChild );
        }

        $stickersList.appendChild( $stickers );
    };

    // -------------------------------------------

    $public.init = function init() {
        console.log( 'Controller Klipim Init' );
        $private.addStickersToView();
    };

    // -------------------------------------------

    return $public;

})();

window.ControllerKlipim = ControllerKlipim;

})( window, document );
;(function( window, document, undefined ) {

"use strict";

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
    ControllerKlipim.init();
};

// -------------------------------------------

return $public;

})();

document.addEventListener( 'DOMContentLoaded', function() {
    app.init();
});

})( window, document );