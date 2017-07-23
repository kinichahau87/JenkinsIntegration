var gulp = require("gulp");
var watch = require("gulp-watch");
var beautify = require("gulp-beautify");
var eslint = require('gulp-eslint');

gulp.task("lint", function(){
	return gulp.src("server/*.js")
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task("pretty-code", function(){
	return gulp.src("server/*.js")
		.pipe(beautify({indent_size:4, indent_with_tabs:true}))
		.pipe(gulp.dest("./server/"));

});
