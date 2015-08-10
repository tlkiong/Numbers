'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var angularFilesort = require('gulp-angular-filesort');
var inject = require('gulp-inject');
var sass = require('gulp-sass');
var bowerFiles = require('main-bower-files');

// My Modules
var karma = require('karma').server;
// End of My Modules

var paths = {
    sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});

/* ========== My tasks ========== */
gulp.task('test', function(done) {
    karma.start({
        configFile: __dirname + '\\karma.config.js',
        singleRun: true
    }, function() {
        done();
    });
});

gulp.task('inject-angular', function(done) {
    var target = gulp.src('./www/index.html');
    var sources = gulp.src(['./www/modules/**/*.js']).pipe(angularFilesort());

    return target
        .pipe(inject(sources, {
            name: 'angular',
            relative: 'true'
        }))
        .pipe(gulp.dest('./www/'));
});

gulp.task('inject-css', function() {
    var target = gulp.src('./www/index.html');
    var sources = gulp.src(['./www/modules/**/*.css']);

    return target
        .pipe(inject(sources, {
            relative: 'true'
        }))
        .pipe(gulp.dest('./www/'));
});

gulp.task('inject-bower', function() {
    var bowerOptions = {
        paths: {
            bowerDirectory: './www/lib',
            bowerrc: './.bowerrc',
            bowerJson: './bower.json'
        }
    };

    var target = gulp.src('./www/index.html');
    var sources = gulp.src(bowerFiles(bowerOptions), {
        read: false
    });

    return target
        .pipe(inject(sources, {
            name: 'bower',
            relative: 'true'
        }))
        .pipe(gulp.dest('./www/'));
});

gulp.task('inject', ['inject-angular', 'inject-css', 'inject-bower']);

gulp.task('generateIndexHtml', function() {
    // createIndexHtml stream
    var createIndexHtml = gulp.src('./www/pre-index-html/pre-index.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./www/'));
    // End of createIndexHtml stream

    return createIndexHtml;
})
