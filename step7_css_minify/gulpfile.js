var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');

//자바스크립트 파일을 minify
gulp.task('uglify', function () {
	return gulp.src('src/**/*.js') //src 폴더 아래의 모든 js 파일을
		.pipe(concat('main.js')) //병합하고
		.pipe(uglify()) //minify 해서
		.pipe(gulp.dest('dist/js')); //dist 폴더에 저장
});

//CSS 파일을 minify
gulp.task('minifycss', function () {
	return gulp.src('src/**/*.css') //src 폴더 아래의 모든 css 파일을
		.pipe(concat('main.css')) //병합하고
		.pipe(minifycss()) //minify 해서
		.pipe(gulp.dest('dist/css')); //dist 폴더에 저장
});

//파일 변경 감지
gulp.task('watch', function () {
	gulp.watch('src/**/*.js', ['uglify']);
	gulp.watch('src/**/*.css', ['minifycss']);
});

//gulp를 실행하면 default 로 minifycss task를 실행
gulp.task('default', ['uglify', 'minifycss', 'watch']);
