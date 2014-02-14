module.exports = function (grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        undef: true,
        unused: true,
        node: true,
        browser: true
      },
      all: ['Gruntfile.js', 'src/**/*.js']
    },
    browserify: {
      build: {
        options: {
          alias: ['./src/main:dom-events-stream']
        },
        src: 'src/main.js',
        dest: 'dist/dom-events-stream.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('default', ['lint', 'browserify']);
};