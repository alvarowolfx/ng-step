var gulp = require('gulp');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var ghPages = require('gulp-gh-pages');
 
var paths = {
  sass: ['./src/**/*.scss'],
  js:['./src/**/*.js']
};

gulp.task('sass', function(done) {
  gulp.src('./src/scss/ng-step.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./dist/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./dist/'))
    .pipe(gulp.dest('./demo/lib/'))
    .on('end', done);
});

gulp.task('scripts',function(done){
  gulp.src(paths.js)
        .pipe(plumber())
        .pipe(concat('ng-step.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/'))
        .pipe(gulp.dest('./demo/lib/'))
        .on('end', done);
})

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['scripts']);
});

gulp.task('deploy', function() {
  return gulp.src('./demo/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['sass','scripts']);