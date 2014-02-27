// Load Gulp and your plugins
var gulp    = require('gulp');
var connect = require('gulp-connect');
var stylus  = require('gulp-stylus');
var plumber = require('gulp-plumber');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');

// Define paths
var paths = {
    dist:   './public',
    html:   '*.html',
    css:    'src/stylus/**/*',
    js:     'src/js/**/*.js'
};

// Connect task
gulp.task('connect', connect.server({
    root: [__dirname + '/'],
    port: 9001,
    livereload: true,
    open: {
        browser: 'chrome'
    }
}));

// HTML task
gulp.task('html', function () {
    gulp.src(paths.html)
        .pipe(connect.reload());
});

// JS task
gulp.task('js', function () {
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist + '/js'))
        .pipe(connect.reload());
});

// Stylus task
gulp.task('stylus', function () {
    gulp.src('src/stylus/*.styl')
        .pipe(plumber())
        .pipe(stylus({
            use: ['nib'],
            set: ['compress']
        }))
        .pipe(gulp.dest(paths.dist + '/css'))
        .pipe(connect.reload());
});

// Watch task
gulp.task('watch', function () {
    gulp.watch(paths.css, ['stylus']);
    gulp.watch(paths.html, ['html']);
    var jsWatcher = gulp.watch(paths.js, ['js']);

    jsWatcher.on('change', function (e) {
        var filename = e.path.split('/').pop();
        var bars = '\n================================================';

        console.log('%s\n \u2192 File: %s was %s, runing tasks...%s', bars, filename, e.type, bars);
    });
});

// Server task
gulp.task('server', ['connect', 'watch']);