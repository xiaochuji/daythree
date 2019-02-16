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

//压缩html
gulp.task("minhtml",function(){
    return gulp.src("./src/*.html")
           .pipe(htmlmin({
               collapseWhitespace:true
           }))
           .pipe(gulp.dest("./list"))
})

//压缩css
gulp.task('clean',function(){
    return gulp.src("./src/css/*.css") 
          .pipe(concat("all.css"))
          .pipe(clean())
          .pipe(gulp.dest("./list/css"))
})

gulp.task("clonejs",function(){
    return gulp.src("./src/libs/*.js")
           .pipe(gulp.dest("./list/libs"))
})

//压缩img
gulp.task("imgmin",function(){
    return gulp.src("./src/img/*.{jpg,png,gif}")
           .pipe(imgmin({
                optimizationLevel: 5
           }))
           .pipe(gulp.dest("./list/img"))
})

gulp.task("over",gulp.series("minhtml","clean","imgmin","clonejs"))