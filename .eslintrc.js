module.exports = {
  parser: 'babel-eslint',

  env: {
    browser: true,
    node: true,
    jasmine: true
  },

  plugins: ['flowtype'],
  extends: ['plugin:flowtype/recommended', 'airbnb'],
  settings: {
    react: {
      pragma: 'React',
      version: '16.1'
    }
  },

  rules: {
    'arrow-parens': [1, 'as-needed', { requireForBlockBody: true }],
    'comma-dangle': [1, 'never'],
    'func-names': 0,
    'global-require': 0,
    'linebreak-style': 0,
    'no-mixed-operators': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': [1, { args: 'none' }],

    'jsx-a11y/href-no-hash': 0,

    'import/extensions': 0,
    'import/no-unresolved': 0
  }
};
