## STEP 2. Default Task

앞서 step 1에서 `gulp hello` 로 hello task 를 실행했는데, 항상 hello task를 실행한다면 hello task를 기본값으로 설정해줄 수 있습니다.

```javascript
var gulp = require('gulp');

// hello world 라고 콘솔에 찍는 task
gulp.task('hello', function () {
	return console.log('Hello World!');
});

//gulp를 실행하면 default 로 hello task 실행
gulp.task('default', ['hello']);
```

step 1과는 다르게 'default' 라는 task가 추가되었고, 이 default task의 두번째 파라메터에 배열 형태로 'hello'가 추가되어 있는 것을 볼 수 있습니다.
이제 `gulp hello` 라고 입력할 필요없이, 아래와 같이 `gulp` 라고만 하면 hello task 를 실행할 수 있습니다.


```bash
$ gulp
```

hello 라는 task 를 실행하면 아래와 같이 'Hello world!' 라는 메시지만 출력하고 종료되는 것을 볼 수 있습니다.

![hello task 실행 결과](./step2.png)
