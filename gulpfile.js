const gulp = require("gulp")
const {
    watch,
    series,
    parallel,
} = require("gulp")
const autoprefixer = require("gulp-autoprefixer")
const browserSync = require("browser-sync")
const concat = require("gulp-concat")
const cssmin = require("gulp-cssmin")
const minify = require("gulp-minify")
const rename = require("gulp-rename")
const cleanCss = require("gulp-clean-css")
const rev = require("gulp-rev")
const del = require("del")
const sass = require("gulp-sass")(require("sass"))
const phpConnect = require("gulp-connect-php")
const util = require("util")
// ----
const cssDestinationPath = "./public/css/"
const jsDestinationPath = "./public/js/"


function start (cb) {
    console.clear()
    cb()
}


// ----
gulp.task("css-compile-modules", (done) => {
    gulp.src("./site_assets/scss/**/modules/**/*.scss")
      .pipe(sass({
          outputStyle: "compressed",
      }).on("error", sass.logError))
      .pipe(autoprefixer())
      .pipe(rename({
          dirname: "modules",
      }))
      .pipe(gulp.dest(cssDestinationPath))
    done()
})

gulp.task("css-minify-modules", () => {
    return gulp.src(["./public/css/modules/*.css", "!./public/css/modules/*.min.css"])
      .pipe(cssmin())
      .pipe(rename({
          suffix: ".min",
      }))
      .pipe(gulp.dest(cssDestinationPath + "/modules"))
})

gulp.task("css-minify", gulp.series("css-minify-modules", () => {
    return gulp.src([cssDestinationPath + "/*.css", "!" + cssDestinationPath + "/*.min.css", "!./public/css/bootstrap.css"])
      .pipe(cssmin())
      .pipe(rename({
          suffix: ".min",
      }))
      .pipe(gulp.dest(cssDestinationPath))
}))

gulp.task("css-compile", gulp.series("css-compile-modules", () => {
    return gulp.src("./site_assets/scss/*.scss")
      .pipe(sass({
          outputStyle: "compressed",
      }).on("error", sass.logError))
      .pipe(autoprefixer())
      .pipe(gulp.dest(cssDestinationPath))
}))


// ----
function cssClean (cb) {
    del([
        cssDestinationPath + "*.css",
    ])
    cb()
}


function getSiteScripts () {
    delete require.cache[require.resolve("./site_assets/js/modules.js")]
    return require("./site_assets/js/modules")
}


function cssBundle (cb) {
    gulp.src("./site_assets/scss/*.scss")
      .pipe(sass({
          outputStyle: "compressed",
      }).on("error", sass.logError))
      .pipe(autoprefixer())
      .pipe(gulp.dest(cssDestinationPath))
    cb()
}


function cssMinify (cb) {
    gulp.src(["./public/css/*.css", "!./public/css/*.min.css", "!./public/css/bootstrap.css"])
      .pipe(cssmin())
      .pipe(rename({
          suffix: ".min",
      }))
      .pipe(gulp.dest("./public/css/"))
    cb()
}


function watchCSS (cb) {
    watch(["./site_assets/scss/**/*.scss"], series(
        cssClean,
        cssBundle,
        cssMinify,
      ),
    )
    cb()
}


function jsBundle (cb) {
    const plugins = getSiteScripts()
    gulp.src(plugins.modules)
      .pipe(concat("site.js"))
      .pipe(gulp.dest("./public/js/"))
    cb()
}


function jsClean (cb) {
    del([
        "./public/js/site.*",
    ])
    cb()
}


function jsMinify (cb) {
    try {
        const plugins = getSiteScripts()
        
        gulp.src(plugins.modules)
          .pipe(concat("site.js"))
          .pipe(minify({
              ext: {
                  min: ".min.js",
              },
              noSource: true,
          }))
          .pipe(gulp.dest("./public/js/"))
        cb()
    } catch (e) {
        cb(e)
    }
    
}


gulp.task("js-bundle-modules", (done) => {
    const plugins = getSiteScripts()
    gulp.src(plugins.modules)
      .pipe(concat("site.js"))
      .pipe(gulp.dest("./public/js/"))
    done()
})

gulp.task("dev-start", (done) => {
    
    gulp.watch("./site_assets/scss/**/*.scss", gulp.series("buildCSS", (done) => {
        //browserSync.reload();
        done()
    }))
    
    gulp.watch("./site_assets/js/**/*.js", gulp.series("buildJS", (done) => {
        //browserSync.reload();
        done()
    }))
    
    done()
})

exports.buildCSS = series(
  cssClean,
  cssBundle,
  cssMinify,
)

exports.buildJS = series(
  jsClean,
  jsBundle,
  jsMinify,
)

