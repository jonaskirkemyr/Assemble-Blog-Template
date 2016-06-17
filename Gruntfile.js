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
                    'dist/assets/js/main.min.js': ['src/js/**/*.js', '!src/js/helpers/*.js'],
                    'dist/assets/js/lib.min.js': ['build/js/lib.js'],
                    'dist/assets/js/typeahead.min.js': ['build/js/typeahead.js'],
                    'dist/assets/js/templates.min.js': ['build/js/templates.js'],
                    'dist/assets/js/helpers.min.js': ['src/js/helpers/helpers.js']
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

                    'dist/assets/js/packages/handlebars.min.js': ['./node_modules/handlebars/dist/handlebars.runtime.min.js'],
                    'dist/assets/js/packages/crossroads.min.js': ['./node_modules/crossroads/dist/crossroads.min.js'],
                    'dist/assets/js/packages/signals.min.js': ['./node_modules/crossroads/node_modules/signals/dist/signals.min.js'],
                    'dist/assets/js/packages/hasher.min.js': ['./bower_components/hasher/dist/js/hasher.min.js'],
                    'dist/assets/js/packages/spa.min.js': ['./bower_components/spa/dist/spa.min.js'],

                    'dist/assets/js/packages/moment.min.js': ['./bower_components/moment/min/moment.min.js'],

                    'dist/assets/js/packages/typeahead.jquery.min.js': ['./bower_components/typeahead.js/dist/typeahead.jquery.min.js'],
                    'dist/assets/js/packages/bloodhound.min.js': ['./bower_components/typeahead.js/dist/bloodhound.min.js']
                }
            },
            fontawesome: {
                expand: true,
                cwd: './bower_components/font-awesome/fonts/',
                src: ['**'],
                dest: 'dist/assets/fonts/'
            },
            localPictures: {
                expand: true,
                cwd: './images/',
                src: ['**'],
                dest: 'dist/assets/images/'
            }
        },

        typescript: {
            modules: {
                src: ['src/ts/*.ts'],
                dest: 'build/js/lib.js',
                options: {
                    module: 'commonjs',
                    target: 'es5',
                    sourceMap: true,
                    declaration: true,
                    references: [
                        "typings/main.d.ts"
                    ]
                }
            },
            typeahead: {
                src: ['src/ts/typeahead/*.ts'],
                dest: 'build/js/typeahead.js',
                options: {
                    module: 'commonjs',
                    target: 'es5',
                    sourceMap: true,
                    declaration: true,
                    references: [
                        "typings/main.d.ts",
                        "src/ts/js.d.ts"
                    ]
                }
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
                data: ['config.json', 'dist/posts.json'],
                layout: 'base.hbs',
                layoutdir: './src/view/layouts',
                partials: './src/view/partials/**/*.hbs',
                helpers: ['./src/js/helpers/helpers.js']
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
            blog: {
                options: {
                    layout: 'post.hbs',
                    plugins: ['grunt-assemble-permalinks', 'assemble-related-pages'],
                    permalinks: {
                        structure: ':category/:basename:ext'
                    }
                },
                files: [{
                    cwd: './src/view/posts/',
                    dest: 'dist/posts',
                    expand: true,
                    flatten: true,
                    src: '**/*.md'
                }]
            }
        },

        m2j: {
            release: {
                options: {
                    minify: true,
                    width: 60
                },
                files: {
                    'dist/posts.json': ['src/view/posts/**/*.md']
                }
            }
        },

        json: {
            main: {
                options: {
                    namespace: 'Data',
                    includePath: true,
                    processName: function (filename) {
                        return filename.toLowerCase().replace(".json", "");
                    }
                },
                src: ['config.json'],
                dest: 'src/js/data.js'
            }
        },

        //compile handlebars templates to js
        handlebars: {
            compile: {
                options: {
                    namespace: "<%= config.namespace %>",
                    partialsUseNamespace: true,
                    partialsPathRegex: /\/partials\//,
                    partialRegex: /.*\.hbs/,

                    processName: function (fileName) {
                        return fileName.replace("src/view/templates/", '').replace(".hbs", '');
                    },

                    processPartialName: function (fileName) {
                        return fileName.replace("src/view/templates/partials/", '').replace("src/view/partials/post/", "").replace(".hbs", '');
                    }
                },
                files: {
                    "build/js/templates.js": ["src/view/templates/**/*.hbs", "src/view/partials/post/*.hbs"]
                }
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
    grunt.loadNpmTasks('grunt-markdown-to-json');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-json');

    grunt.registerTask("build", ["newer:m2j", "newer:assemble", "newer:handlebars", "newer:typescript", "newer:json", "newer:uglify", "newer:sass", "newer:cssmin"]);
    grunt.registerTask("rebuild", ["copy", "handlebars", "typescript", "json", "uglify", "sass", "cssmin", "m2j", "assemble"]);
};