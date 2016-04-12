var gulp = require('gulp')
var cleanCSS = require('gulp-clean-css')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')

gulp.task('styles', () => {
	return gulp.src('./src/css/tabular-input.css')
	.pipe(cleanCSS({ compatibility: 'ie8' }))
	.pipe(rename((path) => {
		path.basename += '.min'
	}))
	.pipe(gulp.dest('./dist/css/'))
})

gulp.task('scripts', () => {
	return gulp.src('./dist/js/tabular-input.js')
	.pipe(uglify())
	.pipe(rename((path) => {
		path.basename += '.min'
	}))
	.pipe(gulp.dest('./dist/js/'))
})

gulp.watch('./src/css/tabular-input.css', ['styles'])
gulp.watch('./dist/js/tabular-input.js', ['scripts'])
gulp.task('default', ['styles', 'scripts'])
