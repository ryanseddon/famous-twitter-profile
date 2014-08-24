var gulp = require('gulp'),
    jshint = require('gulp-jshint');

gulp.task('lint', function() {
  gulp.src(['src/**/*.js', 'test/**/*.js', 'gulp/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

