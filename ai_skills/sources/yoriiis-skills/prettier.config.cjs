module.exports = {
	printWidth: 100,
	useTabs: false,
	semi: true,
	trailingComma: 'none',
	singleQuote: true,
	arrowParens: 'always',
	overrides: [
		{
			files: '*.md',
			options: {
				proseWrap: 'preserve',
				tabWidth: 2,
				singleQuote: true,
				semi: true
			}
		},
		{
			files: '*.html',
			options: {
				printWidth: 500
			}
		}
	]
}
