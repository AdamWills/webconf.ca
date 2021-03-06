module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }        
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass'],
        
        options: {
          livereload: true
        } 
      },

      js: {
        files: 'js/app.js',
        tasks: ['uglify'],
      },

      html: {
        files: 'index.html',
        options: {
          livereload: true
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'js/scripts.min.js': [
            'bower_components/foundation/js/foundation.min.js',
            'js/app.js',
          ]
        },
      }
    },

    copy: {
      dist: {
        files: [
          { expand: true, flatten: true, src: ['bower_components/jquery/jquery.min.js'], dest: 'js/', filter: 'isFile'},
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['sass', 'uglify', 'copy'] );
  grunt.registerTask('default', ['build','watch']);
}