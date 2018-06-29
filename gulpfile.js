const gulp = require('gulp');
const sass = require('gulp-sass'); // 编译sass
const autoprefixer = require('gulp-autoprefixer'); // 自动补全浏览器前缀
const changed = require('gulp-changed');

gulp.task('sass', () => {
    return gulp.src('./public/scss/**/*.scss')
    // return gulp.src('./public/scss/faultCauseRatioStatistics.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./public/css'));
});


gulp.task('watch', () => {
    // 监听文件
    gulp.watch('./public/scss/**/*.scss', ['sass']);

});

gulp.task('default', ['sass', 'watch']);

