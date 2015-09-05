var gulp = require('gulp');
var concat = require("gulp-concat");

gulp.task('scripts', function(){
  return gulp.src("./source/javascripts/**/*.js")
  .pipe(concat("index.js"))
  .pipe(gulp.dest("./public/javascripts/"));
});

gulp.task("default", ['scripts']);
