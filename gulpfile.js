var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	spritesmith = require('gulp.spritesmith'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	ftp = require('gulp-ftp');

//test
//gulp.task('default', function() {
//  console.log('hello GULP!!')
//});

//sync server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    });
});

//sass
gulp.task('sass', function () {
  return gulp.src('app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 15 versions','> 1%', 'ie 8', 'ie 7'],
        cascade: false
    }))
    .pipe(gulp.dest('app/css'))
});

//sprite
gulp.task('sprite', function () {
  var spriteData = gulp.src('app/img/icons/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest('app/css'));
});

//minify css
gulp.task('minify', ['sass', 'sprite'],function() {
	return gulp.src(['app/css/*.css','!app/css/*.min.css'])
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream:true}))
});

//scripts
gulp.task('scripts:base', function() {
  return gulp.src([
  	'bower_components/jquery/dist/jquery.min.js',
  	'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js'
  	])
    .pipe(concat('base.min.js'))
    .pipe(gulp.dest('app/js'));
});
gulp.task('scripts:libs', function() {
  return gulp.src([
  	'bower_components/owl.carousel/dist/owl.carousel.min.js',
  	'bower_components/bpopup/jquery.bpopup.min.js',
  	'bower_components/fancybox/source/jquery.fancybox.pack.js'
  	])
    .pipe(concat('libs.min.js'))
    .pipe(gulp.dest('app/js'));
});
gulp.task('scripts', /*['scripts:base', 'scripts:libs'],*/ function() {
  return gulp.src('app/js/main.js')
    .pipe(uglify('main.min.js'))
    .pipe(gulp.dest('app/js'))
});

//watch
gulp.task('watch', ['browser-sync', 'minify', 'scripts'], function () {
  gulp.watch('app/sass/**/*.scss', ['minify']);
  gulp.watch('app/img/icons/*.png', ['sprite']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  gulp.watch('app/js/main.js', ['scripts']);
});


//build
gulp.task('clear', ['minify', 'scripts'], function () {
	return del.sync('dist');
});
gulp.task('copy', ['clear'], function () {
	return gulp.src(['app/**/*', '!app/img/**/*'])
	.pipe(gulp.dest('dist'))
});

gulp.task('clean', ['copy'], function () {
	return del.sync([
	'dist/sass',
	'dist/css/*.css',
	'!dist/css/*.min.css',
	'dist/js/*.js',
	'!dist/js/*.min.js'
	]);
});
gulp.task('images', ['clean'], function () {
	return gulp.src(['app/img/**/*','!app/img/icons/**/*'])
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'))
});
gulp.task('build', ['images'], function () {
	return del.sync('dist/img/icons');
});

//upload
gulp.task('default', ['build'], function () {
	return gulp.src('dist/**/*')
	.pipe(ftp({
		host: '',
		user: '',
		pass: ''
	}));
});
