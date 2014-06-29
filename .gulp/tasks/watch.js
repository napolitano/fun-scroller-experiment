var gulp = require('gulp');

gulp.task('watch', ['setwatch', 'syncbrowser'], function() {
    gulp.watch('src/styles/**', ['compass', 'buildblocks']);
    gulp.watch('src/assets/images/**', ['images']);
    gulp.watch('src/scripts/**', ['buildblocks']);
    gulp.watch('src/*.htm', ['copy']);
});