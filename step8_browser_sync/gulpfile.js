var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var minifyhtml = require('gulp-minify-html');
var browserSync = require('browser-sync').create();

//dist 폴더를 기준으로 웹서버 실행
gulp.task('server', ['uglify', 'minifycss', 'minifyhtml'], function () {
	return browserSync.init({
		server: {
			baseDir: './dist'
		}
	});
});

//HTML 파일을 minify
gulp.task('minifyhtml', function () {
	return gulp.src('src/**/*.html') //src 폴더 아래의 모든 html 파일을
		.pipe(minifyhtml()) //minify 해서
		.pipe(gulp.dest('dist')) //dist 폴더에 저장
		.pipe(browserSync.reload({stream:true})); //browserSync 로 브라우저에 반영
});

//자바스크립트 파일을 minify
gulp.task('uglify', function () {
	return gulp.src('src/**/*.js') //src 폴더 아래의 모든 js 파일을
		.pipe(concat('main.js')) //병합하고
		.pipe(uglify()) //minify 해서
		.pipe(gulp.dest('dist/js')) //dist 폴더에 저장
		.pipe(browserSync.reload({stream:true})); //browserSync 로 브라우저에 반영
});

//CSS 파일을 minify
gulp.task('minifycss', function () {
	return gulp.src('src/**/*.css') //src 폴더 아래의 모든 css 파일을
		.pipe(concat('main.css')) //병합하고
		.pipe(minifycss()) //minify 해서
		.pipe(gulp.dest('dist/css')) //dist 폴더에 저장
		.pipe(browserSync.reload({stream:true})); //browserSync 로 브라우저에 반영
});

//파일 변경 감지
gulp.task('watch', function () {
	gulp.watch('src/**/*.js', ['uglify']);
	gulp.watch('src/**/*.css', ['minifycss']);
	gulp.watch('src/**/*.html', ['minifyhtml']);
});

//gulp를 실행하면 default 로 minifycss task를 실행
gulp.task('default', ['server', 'watch']);
