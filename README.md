## gulp 시작하기

gulp.js을 시작하기 위해 필요한 가장 기본적인 사용 방법들을 정리했습니다.


#### gulp 설치하기

gulp 를 사용하기에 앞서 node.js 와 npm 이 먼저 미리 설치되어 있어야 한다. node.js 와 npm 이 설치되었다면, 먼저 아래와 같이 package.json 파일을 생성해준다.

```bash
$ npm init
```

package.json 파일이 생성되었다면, 아래와 같이 gulp 를 global 과 local 모두 설치해준다.

```bash
$ npm install gulp --global
$ npm install gulp --save-dev
```

--save-dev 옵션으로 설치해주는 이유는, 대부분 gulp 가 production 이 아닌 개발 과정에서만 필요하기 때문에, NODE_ENV 의 값이 production 인 경우 gulp가 설치되지 않도록 하기 위함이다.

이제 이어서 gulp의 설정 파일인 gulpfile.js 을 step1부터 차근차근 따라가며 만들어가보자.
