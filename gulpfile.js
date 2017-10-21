var gulp = require("gulp");
var ts = require("gulp-typescript");
var concat = require('gulp-concat');
var tsProject = ts.createProject("tsconfig.json");

gulp.task('default', function () {

    gulp.task("default", function () {
        return tsProject.src()
            .pipe(concat('scripts.ts'))
            .pipe(tsProject())

            .pipe(gulp.dest("dist"));
    });


});
gulp.task('watch', ['default'], function () {
    gulp.watch('src/*.ts', []);
});