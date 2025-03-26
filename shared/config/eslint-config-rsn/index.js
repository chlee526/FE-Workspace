module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
    plugins: ['prettier', 'import'],
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
    },
    rules: {
        'no-unused-vars': 'off',
        'no-unused-components': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'prettier/prettier': 'error',
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                'newlines-between': 'always',
            },
        ],
    },
    globals: {
        AmCharts: false,

        // JEST
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
    },
};
