## STEP 7. CSS Minify

앞서 gulp-uglify 플러그인을 사용해서 JavaScript 파일을 Minify 한 것처럼 CSS 파일도 운영환경을 위해 이렇게 Minify 를 수행해서 배포하게 됩니다. 이런 기능을 제공해주는 대표적인 플러그인은 gulp-minify-css 입니다. gulp-minify-css 플러그인은 단순하게 CSS 파일의 minify뿐 아니라 CSS 파일 내의 @import 도 인식해서 최적화된 형태로 병합해줍니다. gulp-sourcemaps 플러그인과도 함께 사용할 수 있기 때문에 상당히 유용하게 사용할 수 있는 플러그인입니다.

먼저 npm 을 사용해서 gulp-minify-css 플러그인을 설치해줍니다.

```bash
$ npm install gulp-minify-css --save-dev
```

```javascript
var gulp = require('gulp');
var concat = require('gulp-minify-css');

//CSS 파일을 minify
gulp.task('minifycss', function () {
    return gulp.src('src/css/main.css') //css 폴더의 main.css 파일을
        .pipe(minifycss()) //포함되어 있는 @import를 분석해서 하나의 파일로 병합하고 minify 해서
        .pipe(gulp.dest('dist/css')); //dist 폴더에 저장
});


// 파일 변경 감지
gulp.task('watch', function () {
	gulp.watch('src/**/*.css', ['minifycss']);
});

//gulp를 실행하면 default 로 minifycss, watch task를 실행
gulp.task('default', ['minifycss', 'watch']);
```

default task 로 minifycss 를 지정했기 때문에 아래와 같이 gulp 라고만 입력해도 minifycss task가 실행되게 됩니다.

```bash
$ gulp
```

gulp-minify-css 플러그인을 사용하면 main.css 파일만 지정했지만 main.css 파일에 import한 dep.css 까지 읽어서 하나의 파일로 저장되게 되는 것을 볼 수 있습니다. 중복되는 부분은 적절하게 CSS 해석 방식을 따라 최적화하기도 합니다.
