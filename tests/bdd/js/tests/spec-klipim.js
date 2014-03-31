/* global describe, it, ModelKlipim, chai, beforeEach, afterEach, sinon */
var expect = chai.expect;

describe( 'Add sticker images on DOM', function() {
    beforeEach(function() {
        // sinon.spy( Ajax, 'get' );
    });

    afterEach(function() {
        // Ajax.get.restore();
    });

    // --------------------------------

    it( 'Get stickers of JSON file', function( done ) {
        var stickersJSON = ModelKlipim.getJSONData();
        // console.log( stickersJSON );
        expect( stickersJSON ).to.be.an( 'array' );
        done();
    });
});