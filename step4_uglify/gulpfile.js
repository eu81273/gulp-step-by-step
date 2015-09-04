var gulp = require('gulp');
var uglify = require('gulp-uglify');

//자바스크립트 파일을 minify
gulp.task('uglify', function () {
	return gulp.src('src/*.js') //src 폴더 아래의 모든 js 파일을
		.pipe(uglify()) //minify 해서
		.pipe(gulp.dest('dist')); //dist 폴더에 저장
});

//gulp를 실행하면 default 로 uglify task를 실행
gulp.task('default', ['uglify']);
