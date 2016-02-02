
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: ['**.less'],
        tasks: ['less'],
        options: {
          spawn: false,
        },
      },
    },

    less: {
      development: {
        files: {
          "style.css": "style.less"
        }
      }
    },
  });



  grunt.registerTask('default', [
     'less',
     'watch'
  ]);
};
