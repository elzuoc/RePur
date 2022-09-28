module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-recommended', 'airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parserOptions: {},
  rules: {
    'prettier/prettier': 'error',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/no-unresolved': [2, { commonjs: true, amd: true, ignore: ['@/'] }],
    'vue/no-irregular-whitespace': [
      'error',
      {
        skipStrings: true,
        skipComments: true,
        skipHTMLTextContents: true,
      },
    ],
    'global-require': 'off',
  },
  overrides: [],
  globals: {},
};
