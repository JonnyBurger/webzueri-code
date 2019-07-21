module.exports = {
	env: {
		commonjs: true,
		es6: true,
		node: true
	},
	extends: 'eslint:recommended',
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	parserOptions: {
		ecmaVersion: 8
	},
	rules: {
		'require-atomic-updates': 'off'
	}
};
