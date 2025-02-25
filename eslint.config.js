import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [{
        ignores: ['dist'],
    },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            camelcase: 'off',
            'no-use-before-define': 'off',
            'no-undef': 'off',
            'no-useless-constructor': 'off',
            'no-redeclare': 'off',
            'object-shorthand': ['error', 'always'],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            'no-empty': 'off',
            'no-duplicate-imports': ['error', { includeExports: true }],
        },
    },
]