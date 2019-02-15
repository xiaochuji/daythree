var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var clean = require("gulp-cleancss");
var server = require("gulp-webserver");
var htmlmin = require("gulp-htmlmin");
var imgmin = require("gulp-imagemin");
var fs = require("fs");
var path = require("path");
var url = require("url");

//编译sass
gulp.task("sass",function(){
    return gulp.src("./src/scss/index.scss")
           .pipe(sass())
           .pipe(gulp.dest("./src/scss/"))
})

//压缩、合并sass
gulp.task('concat',function(){
    return gulp.src("./src/scss/*.css") 
          .pipe(concat("all.css"))
          .pipe(clean())
          .pipe(gulp.dest("./src/css/"))
})

//监听
gulp.task("watch",function(){
    gulp.watch("./src/scss/*.scss",gulp.series("sass",'concat'))
})

gulp.task("default",gulp.series("sass",'concat',"watch"))