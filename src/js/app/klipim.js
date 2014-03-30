var Klipim = (function() {
    var $private = {};
    var $public = {};

    // -------------------------------------------

    $public.init = function init() {
        console.log( 'Init klipim!' );
    };

    // -------------------------------------------

    return $public;
})();

module.exports = Klipim;