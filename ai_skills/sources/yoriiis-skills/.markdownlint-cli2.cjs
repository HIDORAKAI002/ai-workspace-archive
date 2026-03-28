module.exports = {
	config: {
		MD013: false, // Line length
		MD024: false, // Multiple headers with the same content
		MD025: false, // Multiple top-level headings in the same document
		MD033: false // No inline HTML
	},
	ignores: ['**/node_modules/**', '.github/PULL_REQUEST_TEMPLATE.md']
}
