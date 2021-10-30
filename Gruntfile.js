module.exports = function(grunt)
{
    // Configuration
    grunt.initConfig({
        watch: {
          w1: {
            files: ['development/less/*.less'],
            tasks: ['less:devLess', 'autoprefixer:devCss', 'clean:lessToCssFile']
          }
        },

        less: {
            devLess: {
              files: {
                'development/css/fromLessTo.css': 'development/less/imports.less'
              }
            }
        },

        autoprefixer: {
          devCss: {
            files: {
              'development/css/autoPreFromLessTo.css': 'development/css/fromLessTo.css'
            }
          },
        },

        clean: {
          lessToCssFile: {
            src: ['development/css/fromLessTo.css']
          },
          buildedProject: {
            src: ['build']
          }
        },

        copy: {
          images: {
            expand: true,
            cwd: 'development',
            src: 'images/*',
            dest: 'build/',
          },

          indexHtml: {
            expand: true,
            cwd: 'development',
            src: 'index.html',
            dest: 'build/',
          }
        },
        
        concat: {
            css: {
              src: ['development/css/bootstrap.css', 'development/css/autoPreFromLessTo.css'],
              dest: 'build/style.css',
            },
            js: {
                src: ['development/js/one.js'],
                dest: 'build/script.js',
              }
        },

        processhtml: {
          mergeLinks: {
            files: {
              'build/index.html': ['build/index.html']
            }
          }
        },

        browserSync: {
          dev: {
              bsFiles: {
                  src : [
                    'development/css',
                    'development/js',
                    'development/index.html',
                    'development/images'
                  ]
              },
              options: {
                  watchTask: true,
                  server: './development'
              }
          }
      },
    });



    // Load plugins
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');


    
    // Register tasks
    grunt.registerTask('default', ['browserSync:dev', 'watch:w1']);

    grunt.registerTask('b-prj', ['copy:images', 'copy:indexHtml', 'concat:css', 'concat:js', 'processhtml:mergeLinks']);

    grunt.registerTask('d-bprj', ['clean:buildedProject']);
};