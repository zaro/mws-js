# Load all required libraries.
gulp = require 'gulp'
gutil = require 'gulp-util'
coffee = require 'gulp-coffee'
plumber = require 'gulp-plumber'

onError = (err) ->
  gutil.beep()
  gutil.log err.stack

gulp.task 'coffee', ->
  gulp.src 'src/**/*.coffee'
    .pipe plumber({errorHandler: onError}) # Pevent pipe breaking caused by errors from gulp plugins
    .pipe coffee({bare: true})
    .pipe gulp.dest './dist/'

gulp.task 'watch', ->
  gulp.watch 'src/**/*.coffee', ['coffee']

gulp.task 'default', ['coffee', 'watch']
