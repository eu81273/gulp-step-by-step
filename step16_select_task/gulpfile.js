var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var minifyhtml = require('gulp-minify-html');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var inquirer = require('inquirer');

var errorHandler = function (error) {
	console.error(error.message);
	this.emit('end');
};
var plumberOption = {
	errorHandler: errorHandler
}

gulp.task('minifyhtml', function () {
	return gulp.src('src/**/*.html')
		.pipe(plumber(plumberOption))
		.pipe(minifyhtml())
		.pipe(gulp.dest('dist'));
});

gulp.task('uglify', function () {
	return gulp.src('src/**.*.js')
		.pipe(plumber(plumberOption))
		.pipe(uglify())
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('minifycss', function () {
	return gulp.src('src/**/*.css')
		.pipe(plumber(plumberOption))
		.pipe(minifycss())
		.pipe(concat('main.css'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function () {
	gulp.watch('src/**/*.js', ['uglify']);
	gulp.watch('src/**/*.css', ['minifycss']);
	gulp.watch('src/**/*.html', ['minifyhtml']);
});

gulp.task('build', ['uglify', 'minifycss', 'minifyhtml']);

gulp.task('default', function (done) {
	inquirer.prompt([
		{
			type: 'list',
			name: 'task',
			message: '어떤 작업을 수행하시겠습니까?',
			choices: [
				{ name: 'JavaScript 빌드', value: 'uglify' },
				{ name: 'CSS 빌드', value: 'minifycss' },
				{ name: 'HTML 빌드', value: 'minifyhtml' },
				new inquirer.Separator(),
				{ name: '전체 빌드', value: 'build' }
			]
		}
	]).then(function (answers) {
		runSequence(answers.task, done);
	});
});
