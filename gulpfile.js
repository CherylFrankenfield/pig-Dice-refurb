const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const minify = require('gulp-uglify');
const clean = require('del');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');

gulp.task('clean', function(){
  return clean(['dist']);
});

gulp.task('copyHTML', ['clean'], function(){
  gulp.src('index.html')
      .pipe(gulp.dest('dist'));
});
gulp.task('jsConcat', ['copyHTML'], function(){
  gulp.src(['./js/scripts.js', './js/interface.js'])
      .pipe(concat('js-concat.js'))
      .pipe(gulp.dest('./tmp'));
});
gulp.task('jsBrowserify', ['jsConcat'], function() {
  return browserify({ entries: ['tmp/js-concat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('minifyScripts', ['jsBrowserify'], function(){
  gulp.src('dist/js/app.js')
      .pipe(minify())
      .pipe(gulp.dest('dist/js'));
});

gulp.task('jshint', function() {
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['minifyScripts']);
