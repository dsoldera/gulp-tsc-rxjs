const gulp = require('gulp'),
      browserify = require("browserify"),
	  buffer = require('vinyl-buffer'),
      BS_CONFIG_FILE = "bs-config.json",
      gutil = require("gulp-util"),
      sourcemaps = require('gulp-sourcemaps');
      source = require('vinyl-source-stream'),
      ts = require('gulp-typescript'),
      tslint = require('gulp-tslint'),
      tsProject = ts.createProject('tsconfig.json'),
      tsify = require("tsify"),
      uglify = require('gulp-uglify'),
      watchify = require("watchify");

const watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/app.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify)
    .transform('babelify', {
        presets: ['es2015', 'stage-0'],
        extensions: ['.ts']
    }));

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist'));
}

gulp.task("typescript", bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);

gulp.task('ts-prod', function () {
	gulp.src('src/**/*.ts')
	.pipe(tsProject())
	.pipe(uglify())
	.pipe(gulp.dest('dist'));
});

gulp.task("server", () => {
    lite.server({ argv: ["", "", "-c", BS_CONFIG_FILE]}, () =>
    {
        console.log("Lite-server running..")
    });
});

gulp.task('tsc', function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/app.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .transform('babelify', {
        presets: ['es2015', 'stage-0'],
        extensions: ['.ts']
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist'));
});

// .pipe(sourcemaps.init({loadMaps: true}))
// .pipe(sourcemaps.write('./'))