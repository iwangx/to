/**
 * Created by wangxing on 2016/1/24.
 */
var jsSrc="public/js/";

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dev:{
                src: [
                    jsSrc +'jscex.min.js',
                    jsSrc +'jscex-parser.js',
                    jsSrc +'jscex-jit.js',
                    jsSrc +'jscex-builderbase.min.js',
                    jsSrc +'jscex-async.min.js',
                    jsSrc +'jscex-async-powerpack.min.js'
                ],
                // 运行任务后生成的目标文件
                dest: 'public/js/run.js'
            }
        },
        uglify:{
            prod:{
                options: {
                    banner: '/*!\n * <%= pkg.name %> - compressed JS\n * @licence <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n * http://blog.csdn.net/jennieji | Licence: MIT\n */\n'
                },
                files: {
                    'dist/js/run.js': [
                        jsSrc +'jscex.min.js',
                        jsSrc +'jscex-parser.js',
                        jsSrc +'jscex-jit.js',
                        jsSrc +'jscex-builderbase.min.js',
                        jsSrc +'jscex-async.min.js',
                        jsSrc +'jscex-async-powerpack.min.js',
                        jsSrc +'love.js'
                    ]
                }
            }
        },
        cssmin:{
            target: {
                files: {
                    'dist/css/main.css': ['public/css/main.css']
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default',['concat:dev','cssmin']);
    grunt.registerTask('uglify',['uglify'])
};