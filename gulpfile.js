const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const _ = require('lodash');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const paths = {
	distDir: './assets',

	styles: {
		src: './resources/styles/**/*.scss',
		dist: './public/assets/css',
		watch: './resources/styles/**/*.scss'
	},

	scripts: {
		src: './resources/scripts/**/*.js',
		dist: './public/assets/js',
        watch: ['./resources/scripts/**/*.js', './v1/resources/scripts/vue/**/*.vue']
	}
}

const ASSET_PATH = process.env.ASSET_PATH || '/'

const webpackConfig = {
	output: {
        filename: "[name].js",
		publicPath: ASSET_PATH
	},
	module: {
		rules: [
            {
                test: /\.svg$/,
                use: ['babel-loader', 'vue-svg-loader'],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
			{
				test: /\.js$/,
				exclude: '/node_modules/',
                loader: 'babel-loader',
            },
		]
    },
    plugins: [
        new VueLoaderPlugin(),
		new webpack.DefinePlugin({
			'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
		})
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
}

const autoprefixerOptions = {}

const clean = (done) => del(paths.distDir, done)

const styles = () => (
    gulp
        .src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dist))
)

const watchStyles = () => gulp.watch(paths.styles.watch, styles)

const buildStyles = () => (
    gulp
        .src(paths.styles.src)
        .pipe(sass())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(paths.styles.dist))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.styles.dist))
)

const script = (input, output = '[name].js', devtool = '', mode = 'development', config = webpackConfig) => (
    gulp
        .src(input)
        .pipe(
            webpackStream({
                config: _.merge(
                    webpackConfig,
                    {
                        output: {
                            filename: output
                        },
                        devtool: devtool,
                        mode: mode,
                    }
                )
            }),
            webpack
        )
        .pipe(gulp.dest(paths.scripts.dist))
)

const scripts = () => script(paths.scripts.src, '[name].js', 'eval')

const watchScripts = () => gulp.watch(paths.scripts.watch, scripts)

const buildScripts = gulp.series(
    () => script(paths.scripts.src, '[name].js', 'source-map'),
    () => script(paths.scripts.src, '[name].min.js', '', 'production')
)

const watch = gulp.parallel(
    gulp.series(
        styles,
        watchStyles
    ),
    gulp.series(
        scripts,
        watchScripts
    )
)

exports.watch = watch

exports.clean = clean

exports.styles = styles
exports['styles:watch'] = gulp.series(styles, watchStyles)

exports.scripts = scripts
exports['scripts:watch'] = gulp.series(scripts, watchScripts)

exports['build:scripts'] = buildScripts
exports['build:styles'] = buildStyles

exports.build = gulp.series(
	clean,
    gulp.parallel(
        buildStyles,
        buildScripts
    ),
)

exports.default = gulp.series(
	clean,
	watch
)
