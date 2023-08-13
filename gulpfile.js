const { src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const uglify = require("gulp-uglify");
const buffer = require("vinyl-buffer");
const connect = require("gulp-connect");

const paths = {
    html: {
        all: "./src/templates/**/*.html",
    },

    styles: {
        all: "src/styles/**/*.scss",
        main: "src/styles/partials/main.scss",
    },

    scripts: {
        main: "./src/scripts/main.js",
        all: "./src/scripts/**/*.js",
    },

    image: {
        all: "./assets/img/*",
    }
}

function server() {
    connect.server({
        root: "dist",
        livereload: true,
        port: 3000
    });
}


function scripts() {
    return browserify(paths.scripts.main)
        .transform(
            babelify.configure({
                presets: ["@babel/preset-env"],
            })
        )
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(dest("dist"))
        .pipe(connect.reload());
}

function styles() {
    return src(paths.styles.main)
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(dest("dist"))
        .pipe(connect.reload());
}

function html(){
    return src(paths.html.all).pipe(dest("dist"))
}

function image(){
    return src(paths.image.all).pipe(dest("dist/img"))
}


function sentinel() {
    watch(paths.image.all, { ignoreInitial: false }, image);
    watch(paths.html.all, { ignoreInitial: false }, html);

    watch(paths.styles.all, { ignoreInitial: false }, styles);
    watch(paths.scripts.all, { ignoreInitial: false }, scripts);
}

exports.default = parallel(server, sentinel);
