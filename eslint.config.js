export default [
  {
    files: ["src/**/*.{js,ts,jsx,tsx}"],
    ignores: ['node_modules', 'dist', '.solid'],
    languageOptions: {
      parser: '@typescript-eslint/parser'
    },
    plugins: ['@typescript-eslint', 'prettier', 'solid'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:prettier/recommended',
      'plugin:solid/typescript',
//    'plugin:@cspell/recommended',
      'prettier'
    ],
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/indent': ['error', 2],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error'
    }
  }
]