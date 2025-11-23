import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import importPlugin from 'eslint-plugin-import';

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
  globalIgnores(['**/dist/**']),
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': ['off'],
      'vue/attributes-order': ['error'],
      'vue/block-order': ['error'],
      'vue/multi-word-component-names': ['off'],
      'vue/no-required-prop-with-default': ['error'],
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: false,
        },
      ],
    },
  },
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/extensions': [
        'error',
        {
          json: 'always',
          vue: 'always',
        },
      ],
    },
  },
);
