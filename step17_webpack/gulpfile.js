var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var webpack = require('webpack');

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

//자바스크립트 파일을 webpack으로 번들링
gulp.task('build:javascript', function (done) {
	//웹팩 실행
	webpack({
		//기본 디렉토리
		//context: process.cwd(),

		//소스맵 생성 수준 설정
		//https://webpack.github.io/docs/configuration.html#debug
		//devtool: '#source-map',

		//엔트리 파일 리스트
		//배열이나 키밸류 형태로 지정. 키밸류의 경우 키는 해당 엔트리의 이름, 밸류는 경로를 지정.
		entry: {
			main: './src/js/main.js'
		},

		//빌드 결과물에 대한 설정
		output: {
			//빌드 결과물 경로
			path: 'dist/js',
			//모듈에 대한 정보를 담은 주석을 포함시킬 지 여부. production 에서는 반드시 false 로 설정.
			pathinfo: false,
			//빌드 결과물 파일명
			//[id] 는 해당 청크의 id 로 치환
			//[hash] 는 결과물의 해시로 치환
			//[name] 은 entry 의 key 로 치환
			filename: '[name].js',
			//웹에서 해당 asset에 접근하기 위해 필요한 경로로 로컬과 다른 경우 사용
			publicPath: '/'
		},

		//require 등으로 모듈을 로딩할 때 받은 경로를 어떻게 해석할지에 대해 설정
		resolve: {
			//모듈을 찾기 시작하는 루트 경로. 기본값은 node_modules
			//root: nodeModulesPath,
			//배열로 ['', '.js', '.jsx'] 와 같이 extensions 를 설정하면 js 확장자로 찾아보고 없으면 jsx 확장자로 로딩을 시도
			extensions: ['', '.js', '.jsx'],
		},

		//웹팩에서 사용하는 로더들을 어떻게 가져올지 설정
		resolveLoader: {
			//로더를 가져올 때 이름만 명시하면 뒤에 loader 를 붙여서 require 를 시도
			//기본값은 ["*-webpack-loader", "*-web-loader", "*-loader", "*"]
			moduleTemplates: ["*-webpack-loader", "*-web-loader", "*-loader", "*"]
		},

		//번들링에서 제외하는 모듈을 명시
		// externals: {
		// 	'jquery': '$',
		// 	'underscore': '_',
		// 	'react': 'React'
		// },

		//ESLint 로더 설정
		// eslint: {
		// 	configFile: path.join(__dirname, 'eslint.js'),
		// 	useEslintrc: false
		// },

		//각 모듈들을 로딩할 때 어떻게 다룰지를 설정
		module: {
			//다른 로더들에 앞서 수행하는 로더
			// preLoaders: [
			// 	{
			// 		//정규식 패턴에 매칭되는 모듈인 경우, 여기에서는 .js 파일인 경우.
			// 		test: /\.js$/,
			// 		//eslint 로더를 수행
			// 		loader: 'eslint',
			// 		//만족해야하는 조건. 여기에서는 경로를 지정
			// 		include: srcPath,
			// 	}
			// ],

			//적용할 로더. 배열의 마지막 로더부터 적용.
			loaders: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					loader: 'babel',
					query: {
						//production 인 경우 캐시 설정은 false 로 함
						cacheDirectory: true,
						presets: [
							'babel-preset-react',
							'babel-preset-es2015'
						].map(require.resolve),
						plugins: [
							'babel-plugin-syntax-trailing-function-commas',
							'babel-plugin-transform-class-properties',
							'babel-plugin-transform-object-rest-spread',
							'babel-plugin-transform-es3-member-expression-literals',
							'babel-plugin-transform-es3-property-literals'
						].map(require.resolve)
					}
				}
				// {
				// 	test: /\.css$/,
				// 	include: srcPath,
				// 	loader: 'style!css!postcss'
				// },
				// {
				// 	test: /\.json$/,
				// 	loader: 'json'
				// },
				// {
				// 	test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
				// 	loader: 'file',
				// },
				// {
				// 	test: /\.(mp4|webm)$/,
				// 	loader: 'url?limit=10000'
				// }
			]
		},

		//컴파일러에 대한 추가적인 플러그인 설정
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					// production으로 설정하면 리액트 라이브러리 사이즈가 작아짐
					'NODE_ENV': JSON.stringify('development')
				}
			}),
			new webpack.optimize.OccurrenceOrderPlugin(),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({
				compressor: {
					screw_ie8: true,
					warnings: false
				},
				mangle: {
					screw_ie8: true
				},
				output: {
					comments: false,
					screw_ie8: true
				}
			})
		],

		//파일 변경을 감지할지 여부
		watch: true
	}, function (err, stats) {
		if (err) {
			console.error('[웹팩 오류]', err);
		};

		console.log('[웹팩 빌드 완료]', stats.toString());
		browserSync.reload();

		typeof done === 'function' && done();
		done = null;
	});
});

//파일 변경 감지
gulp.task('watch', function () {
	gulp.watch('src/**/*.html', ['build:html']);
});

//gulp를 실행하면 default 로 minifycss task를 실행
gulp.task('default', ['server', 'watch']);
