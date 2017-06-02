
'use strict';

/* 1.less编译 压缩 合并（合并眉头太大必要 可以直接在less里面运用@import导入） */
/* 2.js合并 压缩混淆 */
/* 3.img的复制 */
/* 4.html的压缩 */


/*在gulpfile文件中先载入gulp的包  因为这个包提供了一些API*/
var gulp = require('gulp');
var less = require('gulp-less');//载入gulp-less包
var cssnano = require('gulp-cssnano');


/*less编译 压缩 合并*/
gulp.task('style',function(){
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])  /*用!排除_开头的文件*/
		.pipe(less()) //到这儿已经是一个css文件了
		.pipe(cssnano())
		.pipe(gulp.dest('dist/styles'))
		.pipe(browserSync.reload({ //让浏览器自动刷新
      		stream: true
    	}));
});

/* js合并 压缩混淆 */
var concat = require('gulp-concat'); /*导入gulp-concat合并包*/
var uglify = require('gulp-uglify'); /*导入gulp-concat  js压缩混淆包*/
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
		.pipe(concat('all.js')) //合并的文件名
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts'))
		.pipe(browserSync.reload({ ///让浏览器自动刷新
      		stream: true
    	}));
});

/* img的复制 */
gulp.task('image',function(){
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images'))
		.pipe(browserSync.reload({ //让浏览器自动刷新/*刷新*/
      		stream: true
    	}));
});

/*html的压缩*/
var htmlmin = require('gulp-htmlmin');
gulp.task('html',function(){
	gulp.src('src/*.html')
		.pipe(htmlmin({collapseWhitespace: true, //删除空白 必须要这个参数才能压缩
			removeComments:true})) //删除注释内容
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({  //让浏览器自动刷新
      		stream: true
    	}));
});

//监视文件自动变化
var browserSync = require('browser-sync');
gulp.task('serve',function(){
	browserSync({
		server: {
			baseDir: ['dist'] //把dist作为根目录
		},
	}, function(err, bs) {
    	console.log(bs.options.getIn(["urls", "local"]));
	});
	gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['html']);
});


