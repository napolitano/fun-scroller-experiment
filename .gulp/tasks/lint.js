var gulp            = require('gulp');
var lint            = require('gulp-jslint');


gulp.task('lint', function() {
    // Be sure to return the stream
    return gulp.src([ './src/scripts/**/*.js', '!**/vendor/**', '!**/bower_components/**'])
        .pipe(lint({nomen: true}))
        .on('error', function(err) {
            throw err;
        });
});