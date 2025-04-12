
const envFile = process.env.ENVFILE || '.env';

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: envFile, // You can replace this with process.env.ENV_FILE if needed
        safe: false,
        allowUndefined: true,
      },
    ],
    'react-native-reanimated/plugin', // 👈 must be last
  ],
};
