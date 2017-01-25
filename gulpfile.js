const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const jasmineBrowser = require('gulp-jasmine-browser');
const watch = require('gulp-watch');

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './'
    },
    files: ['assets/css/*.css', 'src/*.js', '*.html']
  });
});

gulp.task('jasmine', () => {
  const filesForTest = ['src/*.js', 'spec/*.js'];
  return gulp.src(filesForTest)
    .pipe(watch(filesForTest))
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({ port: 8888 }));
});

gulp.task('default', ['browser-sync', 'jasmine']);
