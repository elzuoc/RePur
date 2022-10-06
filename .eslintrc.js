module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'airbnb-base',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.js', '.vue'],
      },
    },
    'import/core-modules': [
      'vite',
      '@vitejs/plugin-vue',
    ],
  },
};
