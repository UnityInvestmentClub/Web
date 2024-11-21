module.exports = {
  root: true,
  env: { browser: true, es2023: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: [ 'dist' ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react/react-in-jsx-scope': 'off',
    'no-var': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { 'varsIgnorePattern': '_' }
    ]
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  }
}
