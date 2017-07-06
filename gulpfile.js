const gulp = require('gulp'),
      debug = require('gulp-debug'),
      watch = require('gulp-watch'),
      header = require('gulp-header'),
      connect = require("gulp-connect"),
      ejs = require("gulp-ejs"),
      less = require("gulp-less"),
      minifycss = require('gulp-minify-css'),
      postcss  = require('gulp-postcss'),
      sourcemaps = require('gulp-sourcemaps'),
      uglify = require('gulp-uglify'),
      path = require('path');
const banner =
      `/**
      * @author silkshadow
      */`;



// css 处理
gulp.task('css', function () {
    gulp.src('./branch/less/*.less')
        .pipe(debug({title: 'unicorn:'}))
        .pipe(less())
        .pipe(sourcemaps.init())
        .pipe(postcss([require('autoprefixer')]))
        .pipe(minifycss())
        .pipe(sourcemaps.write('.') )
        .pipe(header(banner))
        .pipe(gulp.dest('./test/css'))          //发布到测试环境
        // .pipe(gulp.dest('./stable/css'))        //发布到生产环境
        .pipe(connect.reload());
});

// js 处理
gulp.task('js', function () {
    gulp.src('./branch/js/*.js')
        .pipe(header(banner))
        .pipe(gulp.dest('./test/js'))          //发布到测试环境
        .pipe(debug({title: 'unicorn:'}))
        // .pipe(gulp.dest('./stable/js'));       //发布到生产环境
        .pipe(connect.reload());
});

// 解析模板
gulp.task('ejs', function () {
  return gulp.src('./branch/*.htm')
    .pipe(ejs({}))
    .pipe(gulp.dest("./test"))
    .pipe(connect.reload());
});


// 监听文件变化
gulp.task('watch', function () {
  gulp.watch('./branch/less/*.less',['css']);   // less更新  自动执行task[css]
  gulp.watch('./branch/js/*.js',['js']);        // js更新 自动执行task[js]
  gulp.watch('./branch/*.htm', ['ejs']);        // html更新 自动执行task[ejs]
});

// 启动服务器并实时刷新
gulp.task('server', function () {
  connect.server({
    port: 8000,
    livereload: true
  });
});


gulp.task('default', ['watch','server']);
