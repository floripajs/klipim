;(function( window, document, undefined ) {

var Ajax = (function() {

    var $private = {};
    var $public = {};

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

    $private.newAjaxInstance = function ajaxInstance() {
        return new XMLHttpRequest();
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

    $public.getStickerInfo = function getStickerInfo( $stickerImage ) {
        return JSON.parse( $stickerImage.getAttribute( 'data-sticker-info' ).split( "'" ).join( '"' ) );
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

    $private.canvas = new fabric.Canvas( 'canvas' );

    // -------------------------------------------

    $private.modelKlipim = ModelKlipim;

    // -------------------------------------------

    $private.addStickerOnLoad = function addStickerOnLoad() {
        var $image = document.querySelector( '#img-0' );
        var stickerInfo = $private.modelKlipim.getStickerInfo( $image );

        $public.addStickerOnCanvas( $image );
        $public.addStickerInfo( stickerInfo );
    };

    // -------------------------------------------

    $private.addStickersToView = function addStickersToView() {
        console.log( 'AddStickersToView' );
        var doc = document;
        var stickersJSON = $private.modelKlipim.getJSONData();
        var $stickersList = doc.querySelector( '#stickers-list' );
        var $stickers = doc.createDocumentFragment();
        var newLi;
        var newSticker;

        for( var i = stickersJSON.length; i--; ) {
            newLi = doc.createElement( 'li' );
            newLi.classList.add( 'sticker-item', 'sticker-' + i );

            newSticker = doc.createElement( 'img' );
            newSticker.classList.add( 'sticker-item-image' );
            newSticker.id = 'img-' + i;
            newSticker.src = '/stickers/' + stickersJSON[i].path;
            newSticker.setAttribute( 'data-sticker-info', JSON.stringify( stickersJSON[i] ).split( '"' ).join( "'" ) );

            newLi.appendChild( newSticker );
            $stickers.insertBefore( newLi, $stickers.firstChild );
        }

        $stickersList.appendChild( $stickers );
    };

    // -------------------------------------------

    $private.initEvents = function initEvents() {
        var doc = document;
        var $stickers = doc.querySelectorAll( '.sticker-item-image' );

        [].forEach.call( $stickers, function( $sticker ) {
            $sticker.addEventListener( 'click', $private.selectSticker, false );
        });

        window.addEventListener( 'load', $private.addStickerOnLoad, false );
    };

    // -------------------------------------------

    $private.selectSticker = function selectSticker( e ) {
        var $image = this;
        var doc = document;
        var stickerInfo = $private.modelKlipim.getStickerInfo( $image );

        $public.addStickerOnCanvas( $image );
        $public.addStickerInfo( stickerInfo );
    };

    // -------------------------------------------

    $public.addStickerInfo = function addStickerInfo( stickerInfo ) {
        var doc = document;
        var $stickerTitle = doc.querySelector( '.sticker-title' );
        var $stickerLink = doc.querySelector( '.sticker-link' );
        var $btnDownload = doc.querySelector( '.btn-download' );

        $stickerTitle.textContent = stickerInfo.name;
        $stickerLink.textContent = $stickerLink.href = stickerInfo.website;
        $btnDownload.href = '/stickers/' + stickerInfo.path;
    };

    // -------------------------------------------

    $public.addStickerOnCanvas = function addStickerOnCanvas( $image ) {
        var canvas = $private.canvas;

        var imageInstance = new fabric.Image( $image, {
            left   : canvas.width - ( $image.width * 3 ),
            top    : canvas.height - ( $image.height * 3 ),
            scaleX : 2,
            scaleY : 2
        });

        imageInstance.lockUniScaling = true;

        canvas.remove( canvas.item(0) );
        canvas.add( imageInstance );
        canvas.setActiveObject( canvas.item(0) );
    };

    // -------------------------------------------

    $public.init = function init() {
        console.log( 'Controller Klipim Init' );

        $private.addStickersToView();
        $private.initEvents();
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