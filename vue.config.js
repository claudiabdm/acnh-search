module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/acnh-vue/'
    : '/',
  assetsDir: './assets',
  "transpileDependencies": [
    "vuetify"
  ]
}