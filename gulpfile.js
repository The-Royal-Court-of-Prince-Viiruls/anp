/*******************************
            Set-up
*******************************/

var
  gulp         = require('gulp-help')(require('gulp')),

  // read user config to know what task to load
  config       = require('./public/semantic/tasks/config/user'),

  // watch changes
  watch        = require('./public/semantic/tasks/watch'),

  // build all files
  build        = require('./public/semantic/tasks/build'),
  buildJS      = require('./public/semantic/tasks/build/javascript'),
  buildCSS     = require('./public/semantic/tasks/build/css'),
  buildAssets  = require('./public/semantic/tasks/build/assets'),

  // utility
  clean        = require('./public/semantic/tasks/clean'),
  version      = require('./public/semantic/tasks/version'),

  // docs tasks
  serveDocs    = require('./public/semantic/tasks/docs/serve'),
  buildDocs    = require('./public/semantic/tasks/docs/build'),

  // rtl
  buildRTL     = require('./public/semantic/tasks/rtl/build'),
  watchRTL     = require('./public/semantic/tasks/rtl/watch')
;


/*******************************
             Tasks
*******************************/

gulp.task('default', false, [
  'watch'
]);

gulp.task('watch', 'Watch for site/theme changes', watch);

gulp.task('build', 'Builds all files from source', build);
gulp.task('build-javascript', 'Builds all javascript from source', buildJS);
gulp.task('build-css', 'Builds all css from source', buildCSS);
gulp.task('build-assets', 'Copies all assets from source', buildAssets);

gulp.task('clean', 'Clean dist folder', clean);
gulp.task('version', 'Displays current version of Semantic', version);

/*--------------
      Docs
---------------*/

/*
  Lets you serve files to a local documentation instance
  https://github.com/Semantic-Org/Semantic-UI-Docs/
*/

gulp.task('serve-docs', 'Serve file changes to SUI Docs', serveDocs);
gulp.task('build-docs', 'Build all files and add to SUI Docs', buildDocs);


/*--------------
      RTL
---------------*/

if(config.rtl) {
  gulp.task('watch-rtl', 'Build all files as RTL', watchRTL);
  gulp.task('build-rtl', 'Watch files as RTL ', buildRTL);
}
