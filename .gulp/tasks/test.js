var gulp        = require('gulp');
var karma       = require('gulp-karma');

gulp.task('test', function() {
    return gulp.src(['./tests/**/*.spec.js', './src/scripts/**/*.js'])
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            throw err;
        });
});