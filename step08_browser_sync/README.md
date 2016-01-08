## STEP 8. BrowerSync로 미니 서버를 띄워서 작업하기

로컬에서 프론트엔드 작업을 할 때 어떤 형태로든 웹서버를 띄워서 결과물을 확인하게 됩니다. 파일을 수정할 때마다 정적 리소스들을 빌드해준 뒤에 띄워놓은 웹서버에 접속해서 리프레시를 해서 결과물을 확인하는 것이 일반적인 작업 패턴인데, 앞서 하나씩 살펴본 Gulp 사용 예제들과 더불어 이번에 다루는 [BrowserSync](https://browsersync.io/) 를 사용하면 위의 과정까지 쉽게 자동화할 수 있습니다. BrowserSync는 Gulp 플러그인이 아닌 node.js 기반의 어플리케이션이지만 Gulp 와 매끄럽게 연동해서 사용할 수 있습니다. 자체적으로 다양한 옵션을 가진 미니 웹서버 기능을 지원하고, 파일 변경시에 이를 자동으로 감지해서 브라우저 리프레시를 수행할 수 있습니다. 또 여러개의 브라우저를 열었을 때 한 브라우저에서 클릭을 하면 다른 브라우저에서도 동일한 위치에 클릭 이벤트를 발생시켜 여러 브라우저에서 동시에 동일하게 수행되는지 테스트할 수 있습니다. BrowserSync 라는 이름 그대로 브라우저들간에 동작을 Sync해줍니다.

먼저 npm 을 사용해서 BrowserSync 를 설치해줍니다. 앞서 언급한대로 BrowserSync는 Gulp 플러그인이 아닌 Gulp 와 같은 node.js 기반 어플리케이션이기 때문에 BrowserSync만 사용하고 싶다면 -g 옵션으로 설치해도 됩니다. 하지만 여기에서는 Gulp 와 연동하는 것을 염두에 두고 있기 때문에 --save-dev 옵션으로 설치합니다.

```bash
$ npm install browser-sync --save-dev
```

이번 gulpfile.js 은 앞서 살펴본 Gulp 예제들을 종합해서 BrowserSync 와의 연동하는 방법까지 추가해서 다루었습니다.

```javascript
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
```

디펜던시를 require 하는 부분을 살펴보면 BrowserSync 모듈을 가져오는 `require('browser-sync').create();` 라인이 추가된 것을 볼 수 있습니다.
BrowserSync는 Create 메서드로 생성을 먼저 해주어야 하기 때문에 바로 create 메서드를 호출하는 것이 일반적입니다.

또 소스를 살펴보면, server 라는 task가 추가되었는데, 이 task를 자세히 살펴보면 먼저 각각 JavaScript, CSS, HTML 파일의 빌드 task들을 먼저 수행한 뒤 dist 폴더를 기준으로 BrowserSync 의 웹서버 옵션을 활성화해서 초기화하는 것을 볼 수 있습니다. BrowerSync 는 다양한 옵션들을 지원하고 있는데 지원되는 옵션은 [여기](https://browsersync.io/docs/options/)를 참고하면 됩니다.

각 task 들에도 이전과 달리 BrowserSync의 reload 메서드를 호출하는 `.pipe(browserSync.reload({stream:true}));` 라인이 추가된 것을 볼 수 있습니다.
`gulp.dest` 메서드로 dist 폴더에 빌드된 결과물을 저장한 뒤에, pipe 로 이어서 BrowserSync의 reload 메서드를 호출하면 자동으로 브라우저에 새로 빌드된 결과물이 반영되도록 브라우저가 리프레시됩니다. reload 메서드의 옵션으로 `stream:true`를 주었기 때문에 변경된 파일만 stream 으로 브라우저에 전송되어 리프레시 없이도 반영이 가능한 경우 리프레시 없이 반영되게 됩니다.
