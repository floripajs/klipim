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