module.exports = {
  root: true,
  env: {
    browser: true,
    node: false
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [[ '@', './src' ]],
        extensions: [ '.vue', '.js', '.jsx', '.json' ]
      }
    }
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@vue/airbnb',
    'plugin:vue/recommended',
    'plugin:vue/strongly-recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'key-spacing': [
      'error',
      {
        multiLine: {
          beforeColon: false,
          afterColon: true
        },
      }
    ],
    camelcase: 'off',
    'arrow-parens': 'off',
    'keyword-spacing': [
      'error',
      { before: true, after: true },
    ],
    'comma-spacing': [
      'error',
      { before: false, after: true }
    ],
    'comma-dangle': [
      'error',
      'only-multiline'
    ],
    'lines-between-class-members': ['off'],
    semi: [
      'error',
      'always'
    ],
    quotes: [
      'error',
      'single',
      { avoidEscape: true }
    ],
    'quote-props': [
      'error',
      'as-needed'
    ],
    'no-floating-decimal': 'error',
    'require-await': 'error',
    'no-return-await': 'error',
    'class-methods-use-this': 'off',
    'arrow-spacing': [
      'error',
      { before: true, after: true }
    ],
    'array-bracket-spacing': [ 'error',
      'always',
      {
        singleValue: false,
        objectsInArrays: false,
        arraysInArrays: false
      },
    ],
    'space-infix-ops': [
      'error',
      { int32Hint: false }
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'always',
        asyncArrow: 'always'
      }
    ],
    'block-spacing': [
      'error',
      'always'
    ],
    'prefer-default-export': ['off'],
    'no-return-assign': ['off'],
  },
};
