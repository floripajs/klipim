var s, 
Klipim = {

    settings: {
        numArticles: 10,
        targetStickersList: $('#stickers-list'),
        jsonURL: 'public/json/stickers.json'
    },

    init: function() {
        s = this.settings;
        this.readStickers();
    },

    readStickers: function() {
        var stickersHTML = '';
        $.getJSON(s.jsonURL, function(json) {
            
            $.each(json['stickers'], function(index, value) {
                stickersHTML += '<li class="sticker-item sticker-' + index + '">' +
                                '<img class="sticker-item-image" id="img-' + index + '" src="stickers/' + value[0].path + '" />' +
                                '</li>';
            });

            s.targetStickersList.html(stickersHTML);
        });
    },

    addImageToCanvas: function() {
        canvas.clear(); 
    }

};

var canvas = new fabric.Canvas('c');
canvas.setWidth(740);
canvas.setHeight(560);

fabric.Image.fromURL('stickers/gruntjs/gruntjs-preview.svg', function(oImg) {
    canvas.add(oImg);
});

$('.sticker-item').on('click', function() {
    console.log('Click')
});