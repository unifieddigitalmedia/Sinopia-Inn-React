/**
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

import path from 'path';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import del from 'del';
import runSequence from 'run-sequence';

/*import swPrecache from 'sw-precache';

import {output as pagespeed} from 'psi';
import pkg from './package.json';
import sass from 'gulp-sass';*/
import gulpLoadPlugins from 'gulp-load-plugins';
import nodemon from 'gulp-nodemon';
import webpack from 'webpack-stream';
/*import sass from 'gulp-sass';*/
import sass from 'node-sass';
import fs from 'fs';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// Lint JavaScript
gulp.task('lint', () =>
  gulp.src(['app/public/javascripts/index.js','!node_modules/**'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()))
);


// Optimize images
gulp.task('images', () =>
  gulp.src('app/public/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}))
);


// Compile and automatically prefix stylesheets
gulp.task('styles', () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    'app/public/stylesheets/main.css'
  ])
    .pipe($.newer('.tmp/styles'))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp/styles'))
    // Concatenate and minify styles
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.size({title: 'styles'}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(gulp.dest('.tmp/styles'));
});

// Scan your HTML for assets & optimize them
gulp.task('html', () => {
  return gulp.src('app/**/*.html')
    .pipe($.useref({
      searchPath: '{.tmp,app}',
      noAssets: true
    }))

    // Minify any HTML
    .pipe($.if('*.html', $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    })))
    // Output files
    .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))
    .pipe(gulp.dest('dist'));
});

/*gulp.task('sass', function() {
    return gulp.src("app/public/stylesheets/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/public/stylesheets"))
        .pipe(browserSync.stream());
});*/

gulp.task('sass', function() {

  sass.render({
  file:'app/public/stylesheets/main.scss',
}, function(err, result) { 


   if(!error){
  
      fs.writeFile('app/public/stylesheets/main.css', result.css, function(err){
        if(!err){
    
        }else{



        }
      });
    }else{

console.log(error);

    }

});


});

// Watch files for changes & reload
gulp.task('serve', ['browser-sync','webpack','sass','images','html'], () => {

/*
  browserSync({
    proxy: "http://localhost:7000",
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'WSK',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    //server: ['.tmp', 'app'],
    //port: 3000
  });

*/

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/public/stylesheets/**/*.{scss,css}'],[ 'sass',reload]);
  gulp.watch(['app/scripts/**/*.js','app/public/javascript/**/*.js'], ['lint',reload]);
  gulp.watch(['app/public/images/**/*'], reload);

});


gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:5000",
        files: ["app/**/*.*"],
        port: 3000,
  });
});

gulp.task('nodemon', function (cb) {
  
  var started = false;
  
  return nodemon({
    script: 'app/app.js'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true; 
    } 
  });
});


gulp.task('webpack', ['scripts'], function() {
 

return gulp.src([__dirname+'/app/public/javascripts/index.js',__dirname+'/app/public/javascripts/jsx/index.js'])
  .pipe(webpack({
    watch: true,
    output: {
        filename: 'main.js',
      },
    module: {
     
      loaders: [
        { loader: 'babel-loader', exclude: /node_modules/ },
      ],
    },
  }))
  .pipe(gulp.dest(__dirname+'/app/public/javascripts'));

});


gulp.task('scripts', () =>
    gulp.src([
      // Note: Since we are not using useref in the scripts build pipeline,
      //       you need to explicitly list your scripts here in the right order
      //       to be correctly concatenated
      './app/public/javascripts/index.js'
      // Other scripts
    ])
      .pipe($.newer('.tmp/scripts'))
      .pipe($.sourcemaps.init())
      .pipe($.babel({compact:true}))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest('.tmp/scripts'))
      .pipe($.concat('main.min.js'))
      .pipe($.uglify({preserveComments: 'some'}))
      // Output files
      .pipe($.size({title: 'scripts'}))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('dist/scripts'))
      .pipe(gulp.dest('.tmp/scripts'))
);



// Clean output directory
gulp.task('clean', () => del(['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

// Copy all files at the root level (app)
gulp.task('copy', () =>
  gulp.src([
    'app/*',
    '!app/*.html',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}))
);