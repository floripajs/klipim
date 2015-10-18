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
        item.paths = files.filter(function(i) {
            var ext = path.extname(i).substring(1);
            return extensions.indexOf(ext) != -1;
        });

        /* Sort preview file names to the top. */
        item.paths.sort(function(a, b) {
            var x = sortFileNames(a);
            var y = sortFileNames(b);
            return (x - y);
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

/* Sort sticker file names for the previews to come first. */
function sortFileNames(name) {
    var lower = name.toLowerCase();

    /* Only the order of SVG files matters, because they're the preview stickers. */
    if (path.extname(lower) !== '.svg') {
        return 1;
    }

    /* File names ending with '-preview.svg' comes first. */
    if (lower.indexOf('-preview.svg') != -1) {
        return -1;
    }

    return 0;
}

/* Create a new Gulp plugin error. */
function PluginError(err) {
    return gutil.PluginError('gulp-stickers', err);
}
