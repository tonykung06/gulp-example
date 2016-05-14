const gulp = require('gulp');
const plumber = require('gulp-plumber');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const rename = require('gulp-rename');
const jshint = require('gulp-jshint');

gulp.task('style', () => {
	return gulp.src('css/style.css')
	    .pipe(cleanCSS({compatibility: 'ie8'}))
	    .pipe(rename({
	    	suffix: '.min'
	    }))
	    .pipe(gulp.dest('assets'));
});

gulp.task('script', () => {
	return gulp.src('js/*.js')
		.pipe(plumber())
		.pipe(jshint())
	    .pipe(uglify())
	    .pipe(rename({
	    	suffix: '.min'
	    }))
	    .pipe(gulp.dest('assets'));
});

gulp.task('del', () => {
	del(['assets/*']).then(paths => {
		console.log('Deleted files and folders:\n', paths.join('\n'));
	});
});
gulp.task('watch', () => {
	gulp.watch('css/style.css', ['style']);
	gulp.watch('js/script.js', ['script']);
});
gulp.task('default', ['del', 'style', 'script', 'watch']);