module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'airbnb'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 13,
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'no-unused-vars': [
			'error',
			{ vars: 'all', args: 'after-used', ignoreRestSiblings: false },
		],
		'no-console': ['error', { allow: ['warn', 'error'] }],
		'react/prop-types': 'off',
		quotes: ['error', 'single', { allowTemplateLiterals: true }],
		semi: ['error', 'always'],
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
