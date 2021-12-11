var Prism = require('prismjs');
var Normalizer = require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');
// Create a new Normalizer object
var nw = new Normalizer({
	'remove-trailing': true,
	'remove-indent': true,
	'left-trim': true,
	'right-trim': true,
	/*'break-lines': 80,
	'indent': 2,
	'remove-initial-line-feed': false,
	'tabs-to-spaces': 4,
	'spaces-to-tabs': 4*/
});

// ..or use the default object from Prism
nw = Prism.plugins.NormalizeWhitespace;

// The code snippet you want to highlight, as a string
var code = "\t\t\tvar data = 1;    ";

// Removes leading and trailing whitespace
// and then indents by 1 tab
code = nw.normalize(code, {
	// Extra settings
	indent: 1
});

// Returns a highlighted HTML string
var html = Prism.highlight(code, Prism.languages.javascript);