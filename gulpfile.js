const gulp = require('gulp');
const shell = require('gulp-shell');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

gulp.task('ts', function() {
  tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'));
});

gulp.task('client:build:watch', shell.task([ 'ng build -w' ], { cwd: 'client' }));
gulp.task('server:build:watch', function(){ gulp.watch([ 'server/**/*.ts' ], [ 'ts' ])});

gulp.task('default', [ 'ts', 'server:build:watch', 'client:build:watch' ]);
