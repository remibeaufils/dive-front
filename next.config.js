/* eslint-disable */
const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');
const { IgnorePlugin } = require('webpack');

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
      config.plugins.push(new IgnorePlugin(/^\.\/locale$/, /moment$/));
    }
    return config;
  },
});