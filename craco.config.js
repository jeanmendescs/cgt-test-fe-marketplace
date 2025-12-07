const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@store": path.resolve(__dirname, "src/store"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@data": path.resolve(__dirname, "src/data"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@styles": path.resolve(__dirname, "src/styles"),
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

      // Add bundle size budgets for performance monitoring
      webpackConfig.performance = {
        maxAssetSize: 300000, // 300KB
        maxEntrypointSize: 300000, // 300KB
        hints: "warning", // Show warnings when budgets are exceeded
        assetFilter: (assetFilename) => {
          // Only check JavaScript bundles, not images or CSS
          return assetFilename.endsWith(".js");
        },
      };

      return webpackConfig;
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "^@components/(.*)$": "<rootDir>/src/components/$1",
        "^@pages/(.*)$": "<rootDir>/src/pages/$1",
        "^@store/(.*)$": "<rootDir>/src/store/$1",
        "^@assets/(.*)$": "<rootDir>/src/assets/$1",
        "^@data/(.*)$": "<rootDir>/src/data/$1",
        "^@contexts/(.*)$": "<rootDir>/src/contexts/$1",
        "^@styles/(.*)$": "<rootDir>/src/styles/$1",
      },
    },
  },
};
