const { src, dest, series, parallel, watch } = require("gulp");
const concat = require('gulp-concat');
const gulp = require("gulp");


const htmlMin = require('gulp-htmlmin');
function htmlTask(){
    return src('project/*.html')
    .pipe(htmlMin({collapseWhitespace:true,removeComments:true,removeEmptyAttributes:true}))
    .pipe(dest('dist/HTML'))
}
exports.HTMLTASK = htmlTask;

const cssMin = require('gulp-clean-css');
const sassMin = require('gulp-sass');
function cssTask(){
    return src('project/css/**/*')
    .pipe(concat('style.min.css'))
    .pipe(sassMin())
    .pipe(cssMin())
    .pipe(dest('dist/CSS'))
}
exports.CSSTASK = cssTask;

const jsMin = require('gulp-terser');
function jsTask(){
    return src('project/js/*.js')
    .pipe(concat('allJs.min.js'))
    .pipe(jsMin())
    .pipe(dest('dist/JS'))
}
exports.JSTASK = jsTask;

const ImgMin = require('gulp-imagemin');
function imgTask(){
    return gulp.src('project/pics/*')
    .pipe(ImgMin())
    .pipe(gulp.dest('dist/images'))
}
exports.IMGTASK = imgTask

var browserSync = require('browser-sync');
function serve (callback){
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  });
  callback()
}

function reloadTask(ReDone) {
  browserSync.reload()
  ReDone()
}

//watch task
function watchTask() {
    watch('project/*.html',series(htmlTask, reloadTask))
    watch('project/js/*.js',series(jsTask, reloadTask))
    watch("project/css/**/*", parallel(cssTask,reloadTask));
}
exports.default = series(parallel(imgTask, jsTask, cssTask, htmlTask), serve,watchTask)


