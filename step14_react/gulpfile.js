var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps  = require('gulp-sourcemaps');

//dist 폴더를 기준으로 웹서버 실행
gulp.task('server', ['build:javascript', 'build:html'], function () {
	return browserSync.init({
		server: {
			baseDir: './dist'
		}
	});
});

//HTML 파일을 dist 로 복사
gulp.task('build:html', function () {
	return gulp.src('./src/**/*.html')
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({stream: true}));
});

//자바스크립트 파일을 browserify로 번들링
gulp.task('build:javascript', function () {

	return browserify({entries: ['src/js/main.js'], debug: true})
		.transform('babelify', {presets: ['es2015', 'react']})
		.bundle()
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
		.pipe(browserSync.reload({stream: true})); //browserSync 로 브라우저에 반영
});

//파일 변경 감지
gulp.task('watch', function () {
	gulp.watch('src/**/*.js', ['build:javascript']);
	gulp.watch('src/**/*.html', ['build:html']);
});

//gulp를 실행하면 default 로 minifycss task를 실행
gulp.task('default', ['server', 'watch']);
