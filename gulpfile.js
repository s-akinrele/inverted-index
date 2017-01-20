const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('browser-sync', function(){
  browserSync.init({
    server:{
       baseDir: "./"
    },
    files:["assets/css/*.css", "src/*.js", "*.html"]
  });
});

gulp.task('default', ['browser-sync']);