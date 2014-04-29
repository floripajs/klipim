// Load Gulp and your plugins
var gulp       = require('gulp');
var connect    = require('gulp-connect');
var stylus     = require('gulp-stylus');
var plumber    = require('gulp-plumber');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var jshint     = require('gulp-jshint');
var mocha      = require('gulp-mocha');
var notify     = require('gulp-notify');

// Define paths
var paths = {
    tests : 'tests/bdd/js/tests/*.js',
    dist  : './public',
    html  : '**/*.html',
    css   : 'src/stylus/**/*',
    js    : 'src/js/**/*.js'
};

// Connect task
gulp.task('connect', connect.server({
    root: [ __dirname + '/' ],
    port: 9001,
    livereload: true
}));

// HTML task
gulp.task('html', function() {
    gulp.src( paths.html )
        .pipe( connect.reload() );
});

// JS task
gulp.task('js', function() {
    gulp.src([
        'src/js/modules/**/*.js',
        'src/js/models/**/*.js',
        'src/js/controllers/**/*.js',
        'src/js/app.js'
    ])
        .pipe( jshint() )
        .pipe( jshint.reporter( 'default' ) )
        .pipe( concat( 'main.js' ) )
        .pipe( uglify() )
        .pipe( gulp.dest( paths.dist + '/js' ) )
        .pipe( notify( 'JS OK!' ) )
        .pipe( connect.reload() );
});

// Stylus task
gulp.task('stylus', function() {
    gulp.src( 'src/stylus/*.styl' )
        .pipe( plumber() )
        .pipe(
            stylus({
                use: [ 'nib' ],
                set: [ 'compress' ]
            })
        )
        .pipe( gulp.dest( paths.dist + '/css' ) )
        .pipe( notify( 'CSS OK!' ) )
        .pipe( connect.reload() );
});

// TDD (Mocha)
gulp.task('tdd', function() {
    gulp.src( paths.tests )
    .pipe( plumber() )
    .pipe( mocha({ reporter : 'spec' }) )
    .pipe( notify( 'Tests OK!' ) );
});

// Watch task
gulp.task('watch', function() {
    // gulp.watch( paths.tests, ['tdd'] );
    gulp.watch( paths.css, ['stylus'] );
    gulp.watch( paths.html, ['html'] );
    var jsWatcher = gulp.watch( [ paths.js, paths.tests ], ['js'] );

    jsWatcher.on('change', function(e) {
        var filename = e.path.split('/').pop();
        var bars = '\n================================================';

        console.log('%s\n \u2192 File: %s was %s, runing tasks...%s', bars, filename, e.type, bars);
    });
});

// Server task
gulp.task( 'server', ['connect', 'watch'] );