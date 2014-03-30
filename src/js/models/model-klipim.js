;(function() {

var ModelKlipim = (function() {
    var $private = {};
    var $public = {};

    // -------------------------------------------

    $public.init = function init() {
        $public.getJSONData();
    };

    // -------------------------------------------

    $public.getJSONData = function getJSONData() {
        console.log( 'getJSONData' );
    };

    // -------------------------------------------

    return $public;
})();

window.ModelKlipim = ModelKlipim;

})( window, document );