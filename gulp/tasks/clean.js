var gulp = require('gulp'),
    rimraf = require('gulp-rimraf');

gulp.task('clean', function() {
  gulp.src(['dist'], { read: false })
    .pipe(rimraf());
});
