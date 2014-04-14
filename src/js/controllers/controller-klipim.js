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

            newSticker = $private.createNewSticker( stickersJSON[i], i );

            newLi.appendChild( newSticker );
            $stickers.insertBefore( newLi, $stickers.firstChild );
        }

        $stickersList.appendChild( $stickers );
    };

    // -------------------------------------------

    $private.createNewSticker = function createNewSticker( stickerInfo, stickerCounter ) {
        var doc = document;
        var newSticker;

        newSticker = doc.createElement( 'img' );
        newSticker.classList.add( 'sticker-item-image' );
        newSticker.id = 'img-' + stickerCounter;
        newSticker.src = '/stickers/' + stickerInfo.paths[0];
        newSticker.setAttribute( 'data-sticker-info', JSON.stringify( stickerInfo ).split( '"' ).join( "'" ) );

        return newSticker;
    };

    // -------------------------------------------

    $private.createStickersDownloadList = function createStickersDownloadList( paths ) {
        var doc = document;
        var $stickerDownloadList = doc.querySelector( '.sticker-download-list' );
        var $stickersList = doc.createDocumentFragment();

        for( var i = paths.length; i--; ) {
            console.log( 'Parei aqui...' );
        }
    };

    // -------------------------------------------

    $private.initEvents = function initEvents() {
        var doc = document;
        var $liStickers = doc.querySelectorAll( '.sticker-item' );
        var $stickers = doc.querySelectorAll( '.sticker-item-image' );

        [].forEach.call( $stickers, function( $sticker ) {
            $sticker.addEventListener( 'click', $private.selectSticker, false );
        });

        [].forEach.call( $liStickers, function( $liSticker ) {
            $liSticker.addEventListener( 'click', $private.selectSticker, false );
        });

        window.addEventListener( 'load', $private.addStickerOnLoad, false );
    };

    // -------------------------------------------

    $private.isStickerItem = function isStickerItem( element ) {
        return element.classList.contains( 'sticker-item' );
    };

    // -------------------------------------------

    $private.selectSticker = function selectSticker( e ) {
        e.preventDefault();
        e.stopPropagation();

        var $image = $private.isStickerItem( this ) ? this.firstChild : this;

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
        // var $btnDownload = doc.querySelector( '.btn-download' );

        $stickerTitle.textContent = stickerInfo.name;
        $stickerLink.textContent = $stickerLink.href = stickerInfo.website;
        // $btnDownload.href = '/stickers/' + stickerInfo.paths[0];

        $private.createStickersDownloadList( stickerInfo.paths );
    };

    // -------------------------------------------

    $public.addStickerOnCanvas = function addStickerOnCanvas( $image ) {
        var canvas = $private.canvas;

        var imageInstance = new fabric.Image( $image, {
            left   : ( canvas.width / 1.5 ) - ( $image.width / 2 ),
            top    : ( canvas.height / 1.5 ) - ( $image.height / 2 ),
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