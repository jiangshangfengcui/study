var gulp = require('gulp'),
	runSequence = require('run-sequence'),
	rev = require('gulp-rev'),
	revCollector = require('gulp-rev-collector');

var cssUrl = 'static/css/*.css',
	jsUrl = 'static/js/*.js';

/*--------*/
gulp.task('revCss', function() {
	return gulp.src(cssUrl).pipe(rev())
	.pipe(rev.manifest({
		pwd_base: 'css'
	}))
	.pipe(gulp.dest('static'));
});

gulp.task('revJs', ['revCss'], function() {
	return gulp.src(jsUrl).pipe(rev())
	.pipe(rev.manifest({
		base: './',
		merge: true,
		pwd_base: 'js'
	}))
	.pipe(gulp.dest('static'));
});

gulp.task('revHtml', function() {
	return gulp.src(['static/*.json','html/*.html'])
	.pipe(revCollector())
	.pipe(gulp.dest('html_new2/html'));
});

gulp.task('dev', function(done) {
	condition = false;
	//runSequence(['revCss'], ['revJs'], ['revHtml'], done);
	runSequence(['revJs'], ['revHtml'], done);
});

gulp.task('default', ['dev']);
/*----------------*/

// gulp.task('revJs_Css', function() {
// 	return gulp.src([jsUrl, cssUrl], {base: "static"})
// 	.pipe(rev.manifest())
// 	.pipe(gulp.dest('static'));
// });

// gulp.task('revHtml_js_css', function() {
// 	return gulp.src(['static/*.json','html/*.html'])
// 	.pipe(revCollector())
// 	.pipe(gulp.dest('html'));
// });

// gulp.task('dev_js_css', function(done) {
// 	condition = false;
// 	runSequence(['revJs_Css'], ['revHtml_js_css'], done);
// });

// gulp.task('default', ['dev_js_css']);
/*-----------------*/



