const
    gulp = require('gulp'),
    task = gulp.task.bind(gulp),
    del = require('del'),
    concat = require('gulp-concat'),
    rename = require("gulp-rename"),
    minify = require('gulp-minify'),
    __end__ = void 0;

task('default', ['clean'], function() {
    return gulp.start('build');
});

task('build', [
    'build-module',
    'build-cjs',
    'build-min-js',
    'rename-to-mjs',
    'rename-min-to-mjs',
], function() {});

task('build-module', function() {
    return gulp.src(['src/string-enum.js', 'src/string-enum-as-module.js'])
    .pipe(concat('string-enum-module.js'))
    .pipe(minify())
    .pipe(gulp.dest('dist/'))
});

task('build-cjs', function() {
    return gulp.src(['src/string-enum.js', 'src/string-enum-as-commonjs.js'])
    .pipe(concat('string-enum.js'))
    .pipe(gulp.dest('dist/'))
});

task('build-min-js', function() {
    return gulp.src(['src/string-enum.js'])
    .pipe(minify({noSource:true}))
    .pipe(gulp.dest('dist/'))
});

task('rename-to-mjs', ['build-module'], function() {
    return gulp.src(['dist/*-module.js'])
    .pipe(rename(function (path) {
        path.basename = path.basename.match(/(.*)\-module/)[1];
        path.extname = ".mjs";
    }))
    .pipe(gulp.dest('dist/'))
});

task('rename-min-to-mjs', ['build-module'], function() {
    return gulp.src(['dist/*-module-min.js'])
    .pipe(rename(function (path) {
        path.basename = path.basename.match(/(.*)\-module\-min/)[1];
        path.extname = "-min.mjs";
    }))
    .pipe(gulp.dest('dist/'))
});

task('clean', function() {
    return del(['dist', 'coverage', '.nyc_output']);
});
