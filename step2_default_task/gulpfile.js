var gulp = require('gulp');

// hello world 라고 콘솔에 찍는 task
gulp.task('hello', function () {
    return console.log('Hello World!');
});

//gulp를 실행하면 default 로 hello task 실행
gulp.task('default', ['hello']);
