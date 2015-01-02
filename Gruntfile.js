module.exports = function(grunt) {

  var pkg = grunt.file.readJSON('package.json');
  var banner = '/*! ' + 
      '\n    ' + pkg.name + 
      '\n    Version : ' + pkg.version + 
      '\n    Date : ' + grunt.template.today("yyyy-mm-dd") + 
      '\n    License : ' + pkg.license + 
  '\n*/\n';
  
  // Project configuration.
  grunt.initConfig({
    pkg: pkg,
    clean: ["dist", "doc"],
    jshint: {
        build: ['Gruntfile.js', 'src/**/*.js']
    },
    jsdoc : {
        build : {
            src: ['src/**/*.js'], 
            options: {
                destination: 'doc',
                template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                configure : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
            }
        }
    },
    uglify: {
      options: {
        banner: banner
      },
      build: {
        src: 'src/js/coral.js',
        dest: 'dist/js/coral.min.js'
      }
    },
    copy: {
        fonts: {
            files: [
              {expand: true, src: ['src/fonts/*'], dest: 'dist/fonts/', filter: 'isFile', flatten: true}
            ]
        },
        less: {
            files: [
              {expand: true, src: ['src/less/**/*'], dest: 'dist/less/', filter: 'isFile', flatten: true}
            ],
            options: {
              process: function (content, srcpath) { return banner + "\n" + content; }
            }
        } 
    },
    less: {
        build: {
            files: {
              "src/css/coral.default.css" : "src/less/coral.default.less"
            }
        }
    },
    cssmin: {
        build: {
            files: {
               'dist/css/coral.default.min.css' : ['src/css/coral.default.css']
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-jsdoc');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'jshint', 'jsdoc', 'uglify', 'copy', 'less', 'cssmin']);
  grunt.registerTask('dev', ['clean', 'jshint', 'uglify', 'copy', 'less', 'cssmin']);

};