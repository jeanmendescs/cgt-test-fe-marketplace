const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@store": path.resolve(__dirname, "src/store"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
    configure: (webpackConfig) => {
      // Find the existing rule for SVG files
      const fileLoaderRule = webpackConfig.module.rules.find(
        (rule) => rule.oneOf
      );

      if (fileLoaderRule) {
        // Add SVGR loader before other rules
        fileLoaderRule.oneOf.unshift({
          test: /\.svg$/,
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                svgoConfig: {
                  plugins: [
                    {
                      name: "removeViewBox",
                      active: false,
                    },
                  ],
                },
              },
            },
          ],
        });
      }

      return webpackConfig;
    },
  },
};
