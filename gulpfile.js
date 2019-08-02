let gulp = require('gulp');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let mincss = require('gulp-minify-css');
let connect = require('gulp-connect');
let babel = require('gulp-babel');
// let sass = require('gulp-sass');

gulp.task("watchall",async ()=>{
	//html文件复制
	gulp.watch("suning/*.html",async =>{
		gulp.src('suning/*.html')
		.pipe(gulp.dest('F:\\phpStudy\\WWW\\suning_project'));
	})

	//js压缩复制
	gulp.watch('suning/js/*.js',async ()=>{
		gulp.src('suning/js/*.js')
		.pipe(babel({
			presets:['es2015']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('F:\\phpStudy\\WWW\\suning_project\\js'));
	})

	//图片复制
	gulp.watch("suning/image/**/*",async ()=>{
		gulp.src("suning/image/**/*")
		.pipe(gulp.dest('F:\\phpStudy\\WWW\\suning_project\\image'));
	})

	//css压缩复制
	gulp.watch("suning/css/*.css",async ()=>{
		gulp.src("suning/css/*.css")
		.pipe(mincss())
		.pipe(gulp.dest('F:\\phpStudy\\WWW\\suning_project\\css'));
	})

	//php复制
	gulp.watch("suning/php/*.php",async ()=>{
		gulp.src("suning/php/*.php")
		.pipe(gulp.dest('F:\\phpStudy\\WWW\\suning_project\\php'));
	})

	//font复制
	gulp.watch("suning/font/**/*",async ()=>{
		gulp.src("suning/font/**/*")
		.pipe(gulp.dest('F:\\phpStudy\\WWW\\suning_project\\font'));
	})

	//sass监听转换
	// gulp.watch("suning/sass/**/*",async ()=>{
	// 	gulp.src("suning/sass/**/*")
	// 	.pipe(sass())
	// 	.pipe(gulp.dest('F:\\phpStudy\\WWW\\suning_project\\css'));
	// })
})