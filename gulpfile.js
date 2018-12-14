const gulp = require('gulp');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sitemap = require('gulp-sitemap');
const cachebust = require('gulp-cache-bust');
const humans = require('gulp-humans');
const robots = require('gulp-robots');
const browserify = require('gulp-browserify');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const pump = require('pump');

const postCSSPluings = [
    cssnano({
        ore: true,
        zindex: false,
        autoprefixer: {
            add: true,
            browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1'
        }
    })
];

gulp.task('js', () => {
    gulp.src('./src/js/**.js')
        .pipe(
            babel(
                { presets: ['@babel/env'] }
            )
        ).on('error', (e) => { console.log('error en la compilacion de babel', e) })
        .pipe(browserify()).on('error', (e) => { console.log('error en la compilacion de browserify', e) })
        .pipe(gulp.dest('./public/js'));
});


gulp.task('views', function () {
    return gulp.src('./src/views/**.pug')
        .pipe(pug(
            {
                pretty: true
            }
        )).on('error', (e) => {
            console.log('pug error', e);
        })
        .pipe(gulp.dest('./public/'))
});

gulp.task('sass', function () {
    return gulp.src("./src/sass/style.scss")
        .pipe(sass()).on('error', (e) => { console.log('error en la compilacion SASS', e) })
        .pipe(postcss(postCSSPluings)).on('error', (e) => { console.log('error en la compilacion POST CSS'), e })
        .pipe(gulp.dest("./public/css"))
        .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('sitemap', () => {
    gulp.src('./public/**/*.html', {
        read: false
    })
        .pipe(sitemap({
            siteUrl: 'https://www.alejandro-leyva.com/feedback-generator-x' // remplazar por tu dominio
        }))
        .pipe(gulp.dest('./public'))
})

gulp.task('cache', () => {
    gulp.src('./public/**/*.html')
        .pipe(cachebust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest('./public'))
})

gulp.task('humans', function () {
    gulp.src('./public/index.html')
        .pipe(humans({
            team: [{
                "Original developer": "Alejandro Leyva",
                Twitter: "@jalm_x",
                Github: "@jalmx"
            },
            {
                Maintainer: "Xizuth Inc",
                Github: "@xizuth_tech"
            }],
            thanks: [
                'Node (@nodejs on Twitter)',
                'Gulp (@gulpjs on Twitter)'
            ],
            site: [
                'Standards: HTML5, CSS, ES6',
                'Components: Pug, SASS, Google Fonts, Material Design Icons',
                'Software: Visual Studio Code'
            ],
            note: 'Built with love by Alejandro Leyva.'
        }))
        .pipe(gulp.dest('public/'));
});

gulp.task('robots', function () {
    gulp.src('./public/index.html')
        .pipe(robots({
            useragent: '*',
            allow: ['/'],
            disallow: ['cgi-bin/']
        }))
        .pipe(gulp.dest('public/'));
});

gulp.task('default', ['views', 'sass', 'js'], () => {

    browserSync.init({
        server: {
            baseDir: './public'
        }
    });

    gulp.watch('./src/js/**/**.js', ['js', browserSync.reload])
    gulp.watch('./src/views/**/**.pug', ['views', browserSync.reload])
    gulp.watch('./src/sass/**/**.scss', ['sass'])
})

gulp.task('build', ['sass', 'views', 'js', 'cache', 'robots', 'humans', 'sitemap']);