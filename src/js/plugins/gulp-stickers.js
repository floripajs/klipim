var gutil = require('gulp-util'),
    fs = require('fs'),
    path = require('path'),
    through = require('through2');

module.exports = generateStickers;

function generateStickers (fn, exts) {
    this.filename = fn || 'stickers.json';
    this.extensions = exts || [ 'ai', 'eps', 'png', 'svg' ];
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

        /* Parse new item. */
        var item = JSON.parse(file.contents.toString());

        /* Get all sticker file names. */
        var folder = path.dirname(file.path);
        var files = fs.readdirSync(folder);

        /* Filter accepted extensions. */
        item.paths = files.filter(function (i) {
            var ext = path.extname(i).substring(1);
            return extensions.indexOf(ext) != -1;
        });

        /* Concatenate stickers folder name. */
        var parsed = path.parse(file.path);
        var relative = path.relative(file.base, parsed.dir);

        for (var i = 0; i < item.paths.length; i++) {
            item.paths[i] = relative + '/' + item.paths[i];
        }

        /* Add sticker to the list. */
        stickers.push(item);
        cb();
    }

    /* End streaming by writing the final stickers file. */
    function endStream(cb) {
        var joinedFile = new gutil.File({
            base: __dirname,
            cwd: __dirname,
            path: path.join(__dirname, filename)
        });

        var json = JSON.stringify(stickers);
        joinedFile.contents = new Buffer(json);

        this.push(joinedFile);
        cb();
    }

    /* Return streaming object. */
    return through.obj(appendStickers, endStream);
};

function PluginError(err) {
    return gutil.PluginError('gulp-stickers', err);
}
