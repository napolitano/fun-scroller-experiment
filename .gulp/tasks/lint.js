var gulp            = require('gulp');
var lint            = require('gulp-jslint');


gulp.task('lint', function() {
    // Be sure to return the stream
    return gulp.src([ './src/scripts/**/*.js', '!**/vendor/**'])
        .pipe(lint())
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});