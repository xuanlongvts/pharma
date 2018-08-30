'use strict';

// Common
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var remame = require('gulp-rename');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var insert = require('gulp-insert');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// css
var sass = require('gulp-sass');
var bourbon = require('node-bourbon').includePaths;

// imagemin
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

// js
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var paths = {
    scriptLib: ['../asset/js/main.js', '!../asset/js/app.min.js'],
    scriptCode: ['../asset/js/main.js'],
    css: ['../asset/scss/**/*.scss'],
    fonts: ['../asset/fonts/**/*'],
    images: ['../asset/img/*']
};

var flagLivereLoad = false;

// SASS for deploy
gulp.task('sass', function() {
    return gulp
        .src(paths.css)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(
            sass({
                outputStyle: 'compressed',
                includePaths: bourbon
            })
        )
        .pipe(
            remame({
                basename: 'main',
                extname: '.min.css'
            })
        )
        .pipe(gulp.dest('../asset/css'));
});

// SASS for dev
gulp.task('sass:sourcemaps', function() {
    return gulp
        .src(paths.css)
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(
            sass({
                outputStyle: 'compressed',
                includePaths: bourbon.includePaths
            })
        )
        .pipe(
            remame({
                basename: 'main',
                extname: '.min.css'
            })
        )
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('../asset/css'))
        .pipe(flagLivereLoad ? livereload() : browserSync.stream());
});

// Imagemin
gulp.task('imagemin', function() {
    return gulp
        .src(paths.images)
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                use: [pngquant({ quality: '75-90', speed: 4 })]
            })
        )
        .pipe(gulp.dest('../asset/img'));
});

// jshint
gulp.task('jshint', function() {
    return gulp
        .src(paths.scriptLib, { since: gulp.lastRun('jshint') })
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

// js concat
gulp.task('concat', function() {
    return gulp
        .src(paths.scriptLib)
        .pipe(concat('app.min.js'))
        .pipe(insert.wrap('var pageMain = function(){', '}; pageMain();'))
        .pipe(gulp.dest('../asset/js'));
});

// js concat with sourcemaps
gulp.task('concat:sourcemaps', function() {
    return gulp
        .src(paths.scriptLib)
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(insert.wrap('var pageMain = function(){', '}; pageMain();'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('../asset/js'))
        .pipe(flagLivereLoad ? livereload() : browserSync.stream());
});

// fonts
// gulp.task('fonts', function () {
//     return gulp.src(paths.fonts)
//         .pipe(gulp.dest('../asset/css/fonts'))
// });

// js uglify
gulp.task('uglify', function() {
    return gulp
        .src('../asset/js/app.min.js')
        .pipe(uglify())
        .pipe(gulp.dest('../asset/js'));
});

if (flagLivereLoad) {
    gulp.task('live', function() {
        gulp.watch(paths.scriptLib, gulp.parallel(['jshint', 'concat:sourcemaps']));
        gulp.watch(paths.css, gulp.parallel(['sass:sourcemaps']));
        livereload.listen();
    });
} else {
    gulp.task('dev', function() {
        // Serve files from the root of this project
        browserSync.init({
            server: {
                baseDir: '../asset'
            }
        });

        gulp.watch(paths.css, gulp.parallel(['sass:sourcemaps']));
        gulp.watch(paths.scriptCode, gulp.parallel(['jshint', 'concat:sourcemaps']));
        gulp.watch('*.html', { cwd: '../asset' }).on('change', reload);
    });
}

gulp.task('default', gulp.series(['sass', 'concat', 'uglify', 'imagemin']));
