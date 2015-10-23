var gulp = require('gulp');

// hello 라고 콘솔에 찍는 task
gulp.task('hello', function () {
    return console.log('Hello');
});

// world 라고 콘솔에 찍는 task, hello 라는 task가 먼저 완료된 뒤에만 실행된다.
gulp.task('world', ['hello'], function () {
    return console.log('World!');
});

//gulp를 실행하면 default 로 world task를 실행 (world task는 먼저 hello task를 실행)
gulp.task('default', ['world']);
