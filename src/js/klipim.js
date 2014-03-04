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
                                '<img class="sticker-item-image" src="stickers/' + value[0].path + '" />' +
                                '</li>';
            });

            s.targetStickersList.html(stickersHTML);
        });
    }

};