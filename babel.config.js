module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          extensions: [
            ".ios.ts",
            ".android.ts",
            ".ts",
            ".ios.tsx",
            ".android.tsx",
            ".tsx",
            ".jsx",
            ".js",
            ".json",
          ],
          alias: {
            "@features": "./src/features",
            "@common": "./src/common",
            "@navigation": "./src/navigation",
            "@store": "./src/store",
            "@theme": "./src/theme",
            "@app": "./src",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
