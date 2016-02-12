/**
 * Created by wangxing on 2016/1/24.
 */
var jsSrc="public/js/";

module.exports = function(grunt) {
    grunt.file.defaultEncoding = 'utf-8';
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
                options: {
                    mangle: false, //不混淆变量名
                    preserveComments: false, //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                    //footer:'\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'//添加footer
                },
                files:{
                    "dist/js/run.js":["public/js/run.js"]
                    //"dist/js/love.js":["public/js/love.js"]
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