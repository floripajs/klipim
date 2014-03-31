/* global describe, it, ModelKlipim, chai, beforeEach, afterEach, sinon */
var expect = chai.expect;

describe( 'Add sticker images on DOM', function() {

    it( 'Get stickers of JSON file', function( done ) {
        var stickersJSON = ModelKlipim.getJSONData();
        // console.log( stickersJSON );
        expect( stickersJSON ).to.be.an( 'array' );
        done();
    });

    // --------------------------------

});