// eslint.config.js — ESLint 9 flat config for TPW
// Uses FlatCompat to adapt the legacy next/core-web-vitals config
const { FlatCompat } = require('@eslint/eslintrc')
const path = require('path')

const compat = new FlatCompat({
  baseDirectory: path.resolve(__dirname),
})

module.exports = [
  ...compat.extends('next/core-web-vitals'),
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
]
