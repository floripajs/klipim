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