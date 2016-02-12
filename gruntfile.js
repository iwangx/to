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
                    jsSrc +'jscex-parser.min.js',
                    jsSrc +'jscex-jit.min.js',
                    jsSrc +'jscex-builderbase.min.js',
                    jsSrc +'jscex-async.min.js',
                    jsSrc +'jscex-async-powerpack.min.js'
                ],
                // 运行任务后生成的目标文件
                dest: 'public/js/run.js'
            }
        },
        uglify:{
            dist:{
                files:{
                    //"dist/js/run.js":["public/js/run.js"],
                    "dist/js/love.js":["public/js/love.js"],
                    "public/js/jscex-jit.min.js":["public/js/jscex-jit.js"],
                    "public/js/jscex-parser.min.js":["public/js/jscex-parser.js"]
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
    grunt.registerTask('uglify1',['uglify'])
};