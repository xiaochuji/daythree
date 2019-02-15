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
var data = require("./src/data/data.json");

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

//起服务
gulp.task("server",function(){
    return gulp.src("src")
           .pipe(server({
               port:8080,
               open:true,
               livereload:true,
               middleware:function(req,res,next){
                   var pathname = url.parse(req.url).pathname;
                   console.log(pathname)
                   if(pathname == '/favicon.ico'){
                       res.end()
                       return
                   }else if(pathname == "/api/file"){
                       res.end(JSON.stringify({code:1,data:data}))
                   }else{
                       pathname = pathname == "/"?"index.html":pathname;
                       res.end(fs.readFileSync(path.join(__dirname,'src',pathname)))
                   }
               }
           }))
})

//监听
gulp.task("watch",function(){
    gulp.watch("./src/scss/*.scss",gulp.series("sass",'concat'))
})

gulp.task("default",gulp.series("sass",'concat',"watch"))