require('dotenv').config();
const withImages = require('next-images');

module.exports = withImages({
  devIndicators: {
    autoPrerender: false,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|vert|frag)$/,
      use: ['raw-loader'],
    });
    return config;
  },
});
