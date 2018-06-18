const
    gulp = require('gulp'),
    task = gulp.task.bind(gulp),
    del = require('del'),
    concat = require('gulp-concat');

task('default', ['clean'], function() {
    return gulp.start('build');
});

task('build', ['build-mjs', 'build-cjs'], function() {
});

task('build-mjs', function() {
    return gulp.src(['src/string-enum.js', 'src/string-enum-as-module.js'])
    .pipe(concat('string-enum.mjs'))
    .pipe(gulp.dest('dist/'))
});

task('build-cjs', function() {
    return gulp.src(['src/string-enum.js', 'src/string-enum-as-commonjs.js'])
    .pipe(concat('string-enum.js'))
    .pipe(gulp.dest('dist/'))
});

task('clean', function() {
    return del(['dist/**']);
});
