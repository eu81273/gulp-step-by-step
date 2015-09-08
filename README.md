## gulp 시작하기

gulp.js을 시작하기 위해 필요한 가장 기본적인 사용 방법들을 정리했습니다.
![gulp](./gulp01.png)

#### gulp 개념
gulp 는 node.js 기반의 task runner 입니다. 반복적인 귀찮은 작업들이나 프론트엔드 빌드에 필요한 작업들을 gulp 통해 쉽게 처리해줄 수 있습니다.

![프론트엔드에서 반복적으로 하는 작업들](./gulp02.png)

Gulp 는 스스로를 Stream 기반의 Build System 이라고 소개하고 있습니다.

node.js의 event-driven, non-blocking I/O 특성을 살려 요청 후 한번에 결과를 받는 것이 아니라 이벤트로 중간중간 전달받는 방식을 stream이라고 하는데,
이 stream 을 기반으로 하고 있기 때문에 가장 node.js 의 강점을 잘 살리고 있고 실제로 작업 속도도 비교적 더 빠른 것으로 알려져 있습니다.

![gulp의 특징](./gulp03.png)

gulp 의 task 는 pipe 로 연결되는데, 작업 대상 파일들이 pipe 를 따라 흘러가며(stream) 병렬로 동시에 여러 task를 수행하게 됩니다. gulp 라는 이름과 빨대가 꽂힌 컵모양의 심볼이 gulp 의 특징을 잘 반영하고 있다고 볼 수 있습니다.


#### gulp 설치하기

gulp 를 사용하기에 앞서 node.js 와 npm 이 먼저 미리 설치되어 있어야 합니다. node.js 와 npm 이 설치되었다면, 먼저 아래와 같이 package.json 파일을 생성해줍니다.

```bash
$ npm init
```

package.json 파일이 생성되었다면, 아래와 같이 gulp 를 global 과 local 모두 설치해줍니다.

```bash
$ npm install gulp --global
$ npm install gulp --save-dev
```

--save-dev 옵션으로 설치해주는 이유는, 대부분 gulp 가 production 이 아닌 개발 과정에서만 필요하기 때문에, NODE_ENV 의 값이 production 인 경우 gulp가 설치되지 않도록 하기 위해서 입니다.

이제 이어서 gulp의 설정 파일인 gulpfile.js 을 step1부터 차근차근 따라가며 만들어가보도록 하겠습니다.
