var gutil = require('gulp-util'),
    through = require('through2');

module.exports = generateStickers;

function generateStickers (filename) {
    this.filename = filename || 'stickers.json';
    this.stickers = [];

    /* Filename must be a string. */
    if (typeof this.filename !== 'string') {
        throw new PluginError('Invalid stickers filename!');
    }

    /* Append individual sticker files to the buffer. */
    function appendStickers(file, encoding, cb) {
        /* Ignore empty files. */
        if (file.isNull() || file.contents.length === 0) {
            cb();
            return;
        }

        /* Streaming not supported. */
        if (file.isStream()) {
            this.emit('error', new PluginError('Streaming not supported'))
        }

        /* Add sticker to the list. */
        var item = JSON.parse(file.contents.toString());
        stickers.push(item);
        cb();
    }

    /* End streaming by closing the final stickers file. */
    function endStream(cb) {
        console.log(stickers);
        cb();
    }

    /* Return streaming object. */
    return through.obj(appendStickers, endStream);
};

function PluginError(err) {
    return gutil.PluginError('gulp-stickers', err);
}
