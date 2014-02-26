// Load Gulp and your plugins
var gulp    = require('gulp'),
    connect = require('gulp-connect'),
    stylus  = require('gulp-stylus'),
    plumber = require('gulp-plumber');

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
        browser: 'chrome' // if not working OS X browser: 'Google Chrome'
    }
}));

// HTML task
gulp.task('html', function () {
    gulp.src(paths.html)
        .pipe(connect.reload());
});

// JS task
gulp.task('js', function () {
    gulp.src(paths.js)
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
    gulp.watch(paths.js, ['js']);
});

// Server task
gulp.task('server', ['connect', 'watch']);