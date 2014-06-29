var gulp            = require('gulp');
var gulpif          = require('gulp-if');
var useref          = require('gulp-useref');
var uglify          = require('gulp-uglify');
var notify          = require('gulp-notify');
var compass         = require('gulp-compass');
var minifyCSS       = require('gulp-minify-css');
var minifyHTML      = require('gulp-minify-html');

gulp.task('buildblocks', function () {
    return gulp.src('./src/*.html')
        .pipe(useref.assets())
        .pipe(useref.restore())
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCSS()))
        .pipe(gulpif('*.html', minifyHTML()))
        .pipe(gulp.dest('dist'));
});