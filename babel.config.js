module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.jsx',
            '.json',
            '.ios.js',
            '.android.js',
            '.ios.ts',
            '.android.ts',
            '.ios.tsx',
            '.android.tsx',
            '.web.js',
            '.web.ts',
            '.web.tsx',
          ],
          alias: {
            '@/*': ['/*'],
          },
        },
      ],
      require.resolve('expo-router/babel')
    ],
  };
};
