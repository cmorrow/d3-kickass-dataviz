var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

gulp.task('static', function() {
    return gulp.src("./src/**/*")
        .pipe(gulp.dest("app/"));
});

gulp.task('sass', function() {
    return gulp.src("./src/scss/app.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src("./src/js/*.js")
        .pipe(gulp.dest("app/js"));
});

// Static server
gulp.task('default', ['static'], function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });

    gulp.watch("./src/scss/*.scss", ['sass']);
    gulp.watch("./src/**/*.{jpg,png,gif,html}", ['static']);
    gulp.watch("./src/js/*.js", ['js']);
    gulp.watch(["./app/*.html", "./app/js/**/*.js"]).on('change', browserSync.reload);
});