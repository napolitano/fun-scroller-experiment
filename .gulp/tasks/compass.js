var gulp         = require('gulp');
var rev          = require('gulp-rev');
var notify       = require('gulp-notify');
var compass      = require('gulp-compass');
var handleErrors = require('../utility/error_handler');

gulp.task('compass', function() {
    return gulp.src('./src/styles/*.scss')
        .pipe(compass({
            config_file: '.compass',
            css: '.temp/styles',
            sass: 'src/styles'
        }))
        .pipe(rev())
        .on('error', handleErrors);
});