import * as webpack from 'webpack'
import * as merge from 'webpack-merge'
import * as SWPrecachePlugin from 'sw-precache-webpack-plugin'
import * as VueSSRClientPlugin from 'vue-server-renderer/client-plugin'
import * as FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import base from './webpack.base.config'

const config = merge(base, {
  entry: './app/web/src/entry-client.ts',
  resolve: {
    alias: {
      'create-api': './create-api-client.js'
    }
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    new VueSSRClientPlugin(),
    new FriendlyErrorsPlugin()
  ],
  optimization: {
    splitChunks: {
      minChunks: Infinity,
      cacheGroups: {
        vendor: { test: /[\\/]node_modules[\\/]/ },
        manifest: {}
      }
    }
  }
})

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: 'vue-hn',
      filename: 'service-worker.js',
      minify: true,
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
      runtimeCaching: [
        // {
        //   urlPattern: '/',
        //   handler: 'networkFirst'
        // },
        // {
        //   urlPattern: /\/(top|new|show|ask|jobs)/,
        //   handler: 'networkFirst'
        // },
        // {
        //   urlPattern: '/item/:id',
        //   handler: 'networkFirst'
        // },
        // {
        //   urlPattern: '/user/:id',
        //   handler: 'networkFirst'
        // }
      ]
    })
  )
}

export default config
