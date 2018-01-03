const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const minify = require('gulp-uglify');
const clean = require('del');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});

gulp.task('clean', function(){
  return clean(['dist']);
});

gulp.task('copyCSS', ['clean'], function(){
  gulp.src('css/master.css')
      .pipe(gulp.dest('dist/css'));
});
gulp.task('copyHTML', ['copyCSS'], function(){
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
gulp.task('bowerJS', ['jsBrowserify'], function () {
  return gulp.src(lib.ext('js').files)
  .pipe(concat('vendor.min.js'))
  .pipe(minify())
  .pipe(gulp.dest('./dist/js'));
});
gulp.task('bowerCSS', ['bowerJS'], function () {
  return gulp.src(lib.ext('css').files)
  .pipe(concat('vendor.css'))
  .pipe(gulp.dest('./dist/css'));
});

gulp.task('minifyScripts', ['bowerCSS'], function(){
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
