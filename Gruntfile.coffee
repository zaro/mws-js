'use strict'

module.exports = (grunt) ->

  # Load grunt tasks automatically
  require('load-grunt-tasks')(grunt)

  # Tasks configuration
  grunt.initConfig
    clean:
      tmp:
        files: [
          dot: true,
          src: [ 'tmp/*' ]
        ]
      dist:
        files: [
          dot: true,
          src: [ 'dist/*' ]
        ]
    coffee:
      options:
        sourceMap: true
      src:
        files: [
          expand: true
          cwd: 'src'
          src: ['{,*/}*.coffee']
          dest: 'tmp'
          ext: '.js'
        ]
    watch:
      coffee:
        files: ['src/{,*/}*.coffee']
        tasks: ['build']
    copy:
      dist:
        files: [
          dot: true
          expand: true
          cwd: 'tmp'
          dest: 'dist'
          src: ['{,*/}*.js']
        ]

  # Tasks
  grunt.registerTask 'build', ->
    grunt.task.run [
      'clean'
      'coffee'
      'copy'
    ]
  grunt.registerTask 'dev', ->
    grunt.task.run [
      'build'
      'watch'
    ]