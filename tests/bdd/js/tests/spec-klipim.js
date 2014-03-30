/* global describe, it, ModelKlipim, chai, beforeEach, afterEach, sinon */
var expect = chai.expect;

describe( 'Add sticker images on DOM', function() {
    beforeEach(function() {
        // sinon.spy( $, 'getJSON' );
    });

    afterEach(function() {
        // $.getJSON.restore();
    });

    // --------------------------------

    it( 'Get stickers of JSON file', function( done ) {
        var stickersJSON = ModelKlipim.getJSONData();
        var exp = expect( stickersJSON ).to.be.an( 'array' );
        done();
    });
});