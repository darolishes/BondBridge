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
            "@cards": "./src/features/conversation-cards",
            "@cards/components": "./src/features/conversation-cards/components",
            "@cards/screens": "./src/features/conversation-cards/screens",
            "@cards/hooks": "./src/features/conversation-cards/hooks",
            "@cards/services": "./src/features/conversation-cards/services",
            "@cards/types": "./src/features/conversation-cards/types",
          },
        },
      ],
      "react-native-reanimated/plugin",
      "@babel/plugin-syntax-import-meta",
    ],
  };
};
