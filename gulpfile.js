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
var shell      = require('child_process');
var stickers   = require('./src/js/plugins/gulp-stickers');

// Define paths
var paths = {
    tests    : 'tests/bdd/js/tests/*.js',
    dist     : './public',
    html     : '**/*.html',
    css      : 'src/stylus/**/*',
    js       : 'src/js/**/*.js',
    stickers : 'stickers/*/config.json'
};

// Connect task
gulp.task('connect', function() {
    connect.server({
        root: [ __dirname + '/' ],
        port: 9001,
        livereload: true
    });
});

// HTML task
gulp.task('html', function() {
    gulp.src( paths.html )
        .pipe( connect.reload() );
});

// Stickers task
gulp.task('stickers', function() {
    gulp.src( paths.stickers )
        .pipe( stickers() )
        .pipe( gulp.dest( paths.dist + '/json' ) )
        .pipe( notify( 'Stickers OK!' ) )
        .pipe( connect.reload() );
})

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
    gulp.watch( paths.stickers, ['stickers'] );
    var jsWatcher = gulp.watch( [ paths.js, paths.tests ], ['js'] );

    jsWatcher.on('change', function(e) {
        var filename = e.path.split('/').pop();
        var bars = '\n================================================';

        console.log('%s\n \u2192 File: %s was %s, runing tasks...%s', bars, filename, e.type, bars);
    });
});

gulp.task( 'deploy', function(done) {
    console.log( 'Deploying...' );
    var ghPagesRegex = /gh-pages/;
    var actualBranchRegex = /^\*\s(\w+)/m;
    shell.exec( 'git branch', function(stdin, stdout, stderr) {
        console.log( 'Exec git branch to get actual branch' );
        var createGhPages = 'git checkout -b gh-pages';
        var actualBranch = stdout.match( actualBranchRegex )[1];
        if( ghPagesRegex.test( stdout ) )
            createGhPages = 'git checkout gh-pages';
        console.log( 'Now, deploy to gh-pages' );
        shell.exec([
            createGhPages,
            'git merge ' + actualBranch,
            'git push origin gh-pages',
            'git checkout ' + actualBranch
        ].join( '&&' ), function(stdin, stdout, stderr) {
            console.log(stdout);
            console.log( 'Done!' );
            done();
        });
    });
});

// Server task
gulp.task( 'server', ['connect', 'watch'] );
gulp.task( 'default', [ 'server' ] );
