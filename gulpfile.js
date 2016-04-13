var gulp = require('gulp')
var cleanCSS = require('gulp-clean-css')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var webpack = require('webpack-stream')

gulp.task('styles', () => {
	return gulp.src('./src/css/tabular-input.css')
	.pipe(cleanCSS({ compatibility: 'ie8' }))
	.pipe(rename((path) => {
		path.basename += '.min'
	}))
	.pipe(gulp.dest('./dist/css/'))
})

gulp.task('scripts', () => {
	return gulp.src('./src/js/tabular-input.js')
	.pipe(webpack({
		entry: './src/js/tabular-input.js',
		output: {
			path: `${__dirname}/dist/js/`,
			filename: 'tabular-input.js'
		},
		module: {
			loaders: [{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: { presets: ['es2015'] }
			}]
		}
	}))
	.pipe(rename((path) => {
		path.basename = 'tabular-input'
	}))
	.pipe(gulp.dest('./dist/js/'))
})

gulp.task('scripts-minify', () => {
	return gulp.src('./dist/js/tabular-input.js')
	.pipe(uglify())
	.pipe(rename((path) => {
		path.basename += '.min'
	}))
	.pipe(gulp.dest('./dist/js/'))
})

gulp.watch('./src/css/tabular-input.css', ['styles'])
gulp.watch('./src/js/tabular-input.js', ['scripts'])
gulp.watch('./dist/js/tabular-input.js', ['scripts-minify'])
gulp.task('default', ['styles', 'scripts'])
