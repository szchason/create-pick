module.exports = {
  'extends': '@szchason/eslint-config-typescript',
  settings: {
    'import/resolver': {
      alias: {
        extensions: [ '.js', '.ts' ],
      },
    },
  },
  rules: {
    'no-confusing-arrow': 0,
    'no-nested-ternary': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'import/no-unresolved': 0,
    'import/default': 0,
  },
};
