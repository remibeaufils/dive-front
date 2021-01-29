/* eslint-disable */
const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');
const { IgnorePlugin } = require('webpack');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/styles/antd-custom.less'), 'utf8')
);

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });
    } else {
      /* aliases ant icon imports to user-defined icons folder */
      config.resolve.alias = {
        ...config.resolve.alias,
        '@ant-design/icons/lib/dist$': path.resolve(`./icons/index.js`),
      };
      /* strips out moment locales */
      // Not useful using AntdDayjsWebpackPlugin that replaces moment by dayjs.
      // config.plugins.push(new IgnorePlugin(/^\.\/locale$/, /moment$/));
    }
    config.plugins.push(new AntdDayjsWebpackPlugin());
    return config;
  },
  // https://nextjs.org/docs/advanced-features/i18n-routing#search-engine-optimization
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US'
  },
});