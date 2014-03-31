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