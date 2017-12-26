const gulp = require('gulp'),
      browserify = require("browserify"),
      BS_CONFIG_FILE = "bs-config.json",
      gutil = require("gulp-util"),
      sourcemaps = require('gulp-sourcemaps');
      ts = require('gulp-typescript'),
      tslint = require('gulp-tslint'),
      tsProject = ts.createProject('tsconfig.json'),
      tsify = require("tsify"),
      watchify = require("watchify");



const watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/sdk/app.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify)
    .transform('babelify', {
    presets: ['es2015'],
    extensions: ['.ts']
    }));

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build/sdk'));
}

gulp.task("typescript", bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);

gulp.task('ts-prod', function () {
	gulp.src('src/sdk/src/**/*.ts')
	.pipe(tsProject())
	.pipe(uglify())
	.pipe(gulp.dest('build/sdk'));
});

gulp.task("server", () => {
    lite.server({ argv: ["", "", "-c", BS_CONFIG_FILE]}, () =>
    {
        console.log("Lite-server running..")
    });
});