var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var minifyhtml = require('gulp-minify-html');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps  = require('gulp-sourcemaps');
var newer = require('gulp-newer');
var cached = require('gulp-cached');
var remember = require('gulp-remember');

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
		.pipe(newer('dist')) //dist에 있는 결과물보다 새로운 파일만 다음 단계로 진행
		.pipe(minifyhtml()) //minify 해서
		.pipe(gulp.dest('dist')) //dist 폴더에 저장
		.pipe(browserSync.reload({stream:true})); //browserSync 로 브라우저에 반영
});

//자바스크립트 파일을 browserify로 번들링
gulp.task('uglify', function () {
	return browserify({entries: ['src/js/main.js'], debug: true})
		.bundle() //browserify로 번들링
		.on('error', function (err) {
			//browserify bundling 과정에서 오류가 날 경우 gulp가 죽지않도록 예외처리
			console.error(err);
			this.emit('end');
		})
		.pipe(source('main.js')) //vinyl object 로 변환
		.pipe(buffer()) //buffered vinyl object 로 변환
		.pipe(sourcemaps.init({loadMaps: true, debug: true})) //소스맵 생성 준비
		.pipe(uglify()) //minify 해서
		.pipe(sourcemaps.write('./')) //생성된 소스맵을 스트림에 추가
		.pipe(gulp.dest('dist/js')) //dist 폴더에 저장
		.pipe(browserSync.reload({stream:true})); //browserSync 로 브라우저에 반영
});

//CSS 파일을 minify
gulp.task('minifycss', function () {
	return gulp.src('src/**/*.css') //src 폴더 아래의 모든 css 파일을
		.pipe(sourcemaps.init({loadMaps: true, debug: true})) //소스맵 생성 준비
		.pipe(cached('css')) //파일들을 캐시하고 캐시된 것보다 새로운 파일만 다음 단계로 진행
		.pipe(minifycss()) //새로운 파일만 minify (@import된 파일이 수정된 경우 최상위 파일은 캐시된 상태 그대로이므로 minifycss를 타지 않아 정상적으로 종속성 관리가 이루어지지 않는 점을 주의!)
		.pipe(remember('css')) //minify된 새로운 파일과 캐시된 나머지 내용들을 다시 스트림으로
		.pipe(concat('main.css')) //병합하고
		.pipe(sourcemaps.write('./')) //생성된 소스맵을 스트림에 추가
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
