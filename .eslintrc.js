module.exports = {
  'extends': '@szchason/eslint-config-typescript',
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/extensions': [
      '.js',
      '.ts',
      '.json',
    ],
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    '@typescript-eslint/no-extra-parens': 0,
  },
};
