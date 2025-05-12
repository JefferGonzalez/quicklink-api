import eslint from '@eslint/js'
import globals from 'globals'
import url from 'node:url'
import tseslint from 'typescript-eslint'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export default tseslint.config(
  {
    plugins: {
      ['@typescript-eslint']: tseslint.plugin
    }
  },
  {
    ignores: ['**/dist/**', '**/api/**', '**/src/db/prisma/**', '**/scripts/**'],
  },

  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.es2021,
        ...globals.node
      },
      parserOptions: {
        project: ['tsconfig.json'],
        tsconfigRootDir: __dirname
      }
    },
    rules: {
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-invalid-void-type': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off'
    }
  },
  {
    files: ['**/*.mjs'],
    extends: [tseslint.configs.disableTypeChecked]
  }
)
