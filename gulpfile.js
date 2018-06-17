const
    gulp = require('gulp'),
    task = gulp.task.bind(gulp),
    del = require('del');

task('default', ['clean'], function() {
    return gulp.start('build');
});

task('build', function() {
    // return gulp.start('nearley');
    return gulp.src('src/string-enum.js')
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    // .pipe(concat('main.js'))
    // .pipe(gulp.dest('build/'))
    // .pipe(rename({suffix: '.min'}))
    // .pipe(uglify())
    .pipe(gulp.dest('dist/'))
    // .pipe(notify({ message: 'Scripts task complete' }))
    // ;
});

task('clean', function() {
    return del(['dist/**']);
});
