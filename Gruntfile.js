module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),
        config: grunt.file.readJSON('./config.json'),

        /** minify js files */
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                preserveComments: require('uglify-save-license')
            },
            assets: {
                files: {
                    'dist/assets/js/main.min.js': ['src/js/**/*.js']
                }
            }
        },

        /** copy dependency files needed by the application */
        copy: {
            single: {
                files: {
                    'dist/assets/js/packages/jquery.min.js': ['./bower_components/jquery/dist/jquery.min.js'],
                    'dist/assets/js/packages/skel.min.js': ['./bower_components/skel/dist/skel.min.js'],
                    'dist/assets/js/packages/html5shiv.min.js': ['./bower_components/html5shiv/dist/html5shiv.min.js'],
                    'dist/assets/js/packages/respond.min.js': ['./bower_components/respond/dest/respond.min.js'],
                }
            },
            fontawesome: {
                expand: true,
                cwd: './bower_components/font-awesome/fonts/',
                src: ['**'],
                dest: 'dist/assets/fonts/'
            }
        },

        /** generates .css files from sass code */
        sass: {
            dist: {
                files: {
                    'build/css/theme/main.css': 'src/scss/main.scss',
                    'build/css/theme/ie8.css': 'src/scss/ie8.scss',
                    'build/css/theme/ie9.css': 'src/scss/ie9.scss'
                }
            }
        },
        /** minify css files located in given directories */
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'build/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/asset/css',
                    ext: '.min.css'
                }, {
                        'dist/assets/css/theme/main.min.css': ['build/css/theme/main.css'],
                        'dist/assets/css/theme/ie8.min.css': ['build/css/theme/ie8.css'],
                        'dist/assets/css/theme/ie9.min.css': ['build/css/theme/ie9.css']
                    }]
            }
        },
        
        /** generating static files */
        assemble: {
            options: {
                data: ['config.json'], 
                layout: 'base.hbs',
                layoutdir: './src/view/layouts',
                partials: './src/view/partials/**/*.hbs'
            },

            /** base files**/
            base: {
                options: {
                    layout: 'base.hbs'
                },
                files: [{
                    cwd: './src/view/pages/',
                    dest: 'dist/',
                    expand: true,
                    src: '**/*.hbs'
                }]
            },
            /** blog entries */
            blog:{
                options:{
                    layout:'post.hbs'
                },
                files:[{
                    cwd: './src/view/posts/',
                    dest: 'dist/posts',
                    expand: true,
                    src: '**/*.md'
                }]
            }
        },
        
        /** local running server used for development */
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './dist/',
                    keepalive: true
                }
            }
        }
    });
    
    /** load developments task needed for the task process */
    grunt.loadNpmTasks('grunt-assemble');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask("build", ["assemble"]);
    grunt.registerTask("rebuild", ["copy","uglify","sass","cssmin","assemble"]);
};