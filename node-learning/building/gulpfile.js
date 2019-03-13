const gulp = require('gulp');
const less = require('gulp-less');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');

function clean(done) {
    del('build').then(() => done());
}

function move(done) {
    gulp.src(['src/**/*'])
        .pipe(gulp.dest('build'));
    done();
}

function handleLess(done) {
    gulp.src(['src/**/*.less'])
        .pipe(less())
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(cleancss())
        .pipe(gulp.dest('build'));
    done();
}


/**
 * watch
 */
function watch(done) {
    const watcher = gulp.watch(['src/**/*.js']);
    watcher.on('change', function (path, stats) {
        console.log(`File ${path} was changed`);
    });
    watcher.on('add', function (path, stats) {
        console.log(`File ${path} was added`);
    });
    watcher.on('unlink', function (path, stats) {
        console.log(`File ${path} was removed`);
    });
    // watcher.close();
}

exports.move = move;
exports.watch = watch;
exports.default = gulp.series(clean, handleLess);
