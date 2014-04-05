/* global describe, it, ModelKlipim, chai, beforeEach, afterEach, sinon */
var expect = chai.expect;
var callback;

describe( 'Add sticker images on DOM', function() {

    beforeEach(function() {
        // callback = sinon.spy( XMLHttpRequest.prototype, 'open' );
    });

    afterEach(function() {
        // callback.restore();
    });

    it( 'Get stickers of JSON file', function( done ) {
        var stickersJSON = ModelKlipim.getJSONData();
        // console.log( stickersJSON );
        expect( stickersJSON ).to.be.an( 'array' );
        done();
    });

    // --------------------------------

});