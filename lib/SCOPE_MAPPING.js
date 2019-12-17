// Tokens with `null` value are removed. tokens which are not defined in the mapping, keep their name.
// To: The replacement string (to use captured grouped of the regexp use $0 (all), $1, $2 ... $9)
// To search for a part of the string '(?:[^>]*?\\.)?begin'
module.exports = Object.entries({
	// non-smarty-code
	'([^>](?!smarty)>?)+': 'others',

	// Smary root
	'source.smarty': 'root',

	// smartyComment
	'comment\\.block\\.smarty': 'comment',
	'comment\\.block\\.content\\.smarty': 'commentContent',
	'punctuation\\.definition\\.comment\\.begin\\.smarty': 'begin',
	'punctuation\\.definition\\.comment\\.end\\.smarty': 'end',

	// smartyLiteralBlock
	'meta\\.block-literal\\.smarty': 'blockLiteral',
	'meta\\.block-literal\\.close\\.smarty': 'blockLiteralClose',
	'punctuation\\.section\\.embedded\\.block-literal\\.close\\.begin\\.smarty': 'begin',
	'invalid\\.illegal\\.block-literal\\.smarty': 'invalid',

	// literalBlockContent
	'string\\.block-literal\\.content\\.smarty': 'literalContent',

	// smarty
	'meta\\.block\\.smarty': 'smartyBlock',
	'punctuation\\.section\\.embedded\\.begin\\.smarty': 'begin',
	'punctuation\\.section\\.embedded\\.end\\.smarty': 'end',
	'invalid\\.illegal\\.smarty': 'invalid',

	// smartyBlockFor
	'meta\\.block-for\\.smarty': 'blockFor',
	'keyword\\.control\\.function\\.smarty': 'identifier',
	'meta\\.block-for\\.close\\.begin\\.smarty': 'begin',
	'punctuation\\.section\\.embedded\\.block-for\\.close\\.begin\\.smarty': 'closeBegin',
	'keyword\\.operator\\.expression\\.for\\.([^\\.>]+?)\\.smarty': '$1Keyword',
	'punctuation\\.terminator\\.block-for\\.statement\\.smarty': 'terminator',
	'punctuation\\.separator\\.block-for\\.comma\\.smarty': 'separator',
	'invalid\\.illegal\\.block-for\\.smarty': 'invalid',

	// smartyBlockForEach
	'meta\\.block-foreach\\.smarty': 'blockForEach',
	'meta\\.block-foreach\\.close\\.begin\\.smarty': 'begin',
	'punctuation\\.section\\.embedded\\.block-foreach\\.close\\.begin\\.smarty': 'closeBegin',
	'keyword\\.operator\\.block-foreach\\.value\\.smarty': 'value',
	'keyword\\.operator\\.expression\\.block-foreach\\.as\\.smarty': 'asKeyword',
	'invalid\\.illegal\\.block-foreach\\.smarty': 'invalid',

	// smartyBlockCondition
	'meta\\.block-([^\\.>]+?)-condition\\.smarty': 'blockCondition',

	// smartyBlock
	'meta\\.block-([^\\.>]+?)\\.smarty': 'block',
	'meta\\.block-([^\\.>]+?)\\.close\\.smarty': 'close',
	'punctuation\\.section\\.embedded\\.block-([^\\.>]+?)\\.close\\.begin\\.smarty': 'begin',
	'invalid\\.illegal\\.block\\.smarty': 'invalid',

	// blockContent
	'meta\\.block\\.content\\.smarty': 'blockContent',
	'punctuation\\.section\\.embedded\\.open\\.end\\.smarty': 'openEnd',

	// smartySubBlockForElse
	'meta\\.sub-block-forelse\\.smarty': 'blockForElse',
	'invalid\\.illegal\\.sub-block-forelse\\.smarty': 'invalid',

	// smartySubBlockForEachElse
	'meta\\.sub-block-foreachelse\\.smarty': 'blockForEachElse',
	'invalid\\.illegal\\.sub-block-foreachelse\\.smarty': 'invalid',

	// smartySubBlockElseIf
	'meta\\.sub-block-elseif\\.smarty': 'blockElseIf',
	'invalid\\.illegal\\.sub-block-elseif\\.smarty': 'invalid',

	// smartySubBlockElse
	'meta\\.sub-block-else\\.smarty': 'blockElse',
	'invalid\\.illegal\\.sub-block-else\\.smarty': 'invalid',

	// smartySubBlockSectionElse
	'meta\\.sub-block-sectionelse\\.smarty': 'blockSectionElse',
	'invalid\\.illegal\\.sub-block-sectionelse\\.smarty': 'invalid',

	// namedAttribute
	'meta\\.named-attribute\\.name-([^\\.>]+?)\\.smarty': 'namedAttribute',
	'entity\\.other\\.attribute-name\\.smarty': 'identifier',
	'invalid\\.illegal\\.named-attribute\\.smarty': 'invalid',

	// unnamedAttribute
	'meta\\.unnamed-attribute\\.smarty': 'unnamedAttribute',
	'punctuation\\.separator\\.unnamed-attribute\\.begin\\.smarty': 'begin',
	'invalid\\.illegal\\.unnamed-attribute\\.smarty': 'invalid',

	// smartyFunction / smartyFunctionModifier
	'meta\\.function-call\\.name-([^\\.>]+?)\\.smarty': 'function',
	'entity\\.name\\.function\\.smarty': 'identifier',
	'invalid\\.illegal\\.function\\.smarty': 'invalid',
	'invalid\\.illegal\\.function-modifier\\.smarty': 'invalid',

	// smartyExpression
	'meta\\.expression\\.smarty': 'expression',
	'invalid\\.illegal\\.expression\\.smarty': 'invalid',

	// expressionAUONMS
	'invalid\\.illegal\\.expression-auonms\\.smarty': 'invalid',

	// expressionAAUONMS
	'invalid\\.illegal\\.expression-aauonms\\.smarty': 'invalid',

	// expressionACUONMS
	'invalid\\.illegal\\.expression-acuonms\\.smarty': 'invalid',

	// encapsulatedExpression
	'meta\\.encapsulated-expression\\.smarty': 'encapsulatedExpression',
	'meta\\.brace\\.begin\\.smarty': 'begin',
	'meta\\.brace\\.end\\.smarty': 'end',

	// operation
	'meta\\.operation\\.smarty': 'operation',
	'keyword\\.operator\\.logical\\.smarty': 'logicalOperator',
	'keyword\\.operator\\.arithmetic\\.smarty': 'arithmeticOperator',
	'keyword\\.operator\\.logical\\.constant\\.smarty': 'logicalConstant',

	// operationIsBy
	'meta\\.operation\\.is-by\\.smarty': 'operation',

	// operationIs
	'meta\\.operation\\.is\\.smarty': 'operationIs',

	// negation
	'meta\\.negation\\.smarty': 'negation',
	'keyword\\.operator\\.negation\\.smarty': 'negationOperator',

	// singleQuotedString
	'string\\.quoted\\.single\\.smarty': 'singleQuotedString',
	'string\\.content\\.smarty': 'stringContent',
	'punctuation\\.definition\\.string\\.begin\\.smarty': 'begin',
	'punctuation\\.definition\\.string\\.end\\.smarty': 'end',
	'constant\\.character\\.escape\\.smarty': 'escapeSequence',

	// doubleQuotedString
	'string\\.quoted\\.double\\.smarty': 'doubleQuotedString',
	'meta\\.template-expression\\.smarty': 'templateExpression',
	'punctuation\\.definition\\.template-expression\\.begin\\.smarty': 'begin',
	'punctuation\\.definition\\.template-expression\\.end\\.smarty': 'end',
	'invalid\\.illegal\\.wrapped-variable-expression\\.smarty': 'invalid',

	// unquotedString
	'string\\.unquoted\\.smarty': 'unquotedString',

	// number
	'constant\\.numeric\\.smarty': 'number',
	'constant\\.numeric\\.value\\.smarty': 'value',
	'constant\\.numeric\\.exponent\\.smarty': 'exponent',

	// constant
	'constant\\.language\\.([^\\.>]+?)\\.smarty': 'constant',
	'meta\\.array\\.literal\\.smarty': 'array',
	'punctuation\\.definition\\.array\\.begin\\.smarty': 'begin',
	'punctuation\\.definition\\.array\\.end\\.smarty': 'end',
	'punctuation\\.separator\\.array\\.comma\\.smarty': 'separator',
	'invalid\\.illegal\\.array\\.literal\\.smarty': 'invalid',

	// array
	'meta\\.array\\.item\\.value\\.smarty': 'value',
	'punctuation\\.separator\\.array\\.key-value\\.smarty': 'keyValue',

	// variable
	'variable\\.smarty': 'variable',
	'punctuation.definition.variable.begin.smarty': 'begin',
	'entity\\.name\\.variable\\.smarty': 'identifier',
	'punctuation\\.separator\\.variable\\.property\\.smarty': 'iteratorInfoSeparator',
	'entity\\.name\\.variable\\.property\\.name-([^\\.>]+?)\\.smarty': 'iteratorInfo',
	'keyword\\.operator\\.unary\\.smarty': 'unaryOperator',

	// basicVariable
	'variable\\.basic\\.smarty': 'variable',

	// property
	'variable\\.other\\.property\\.smarty': 'property',
	'punctuation\\.separator\\.property\\.smarty': 'separator',
	'entity\\.name\\.property\\.smarty': 'identifier',
	'meta\\.property-expression\\.smarty': 'propertyExpression',
	'punctuation\\.definition\\.property\\.begin\\.smarty': 'begin',
	'punctuation\\.definition\\.property\\.end\\.smarty': 'end',

	// assignment
	'meta\\.assignment\\.smarty': 'assignment',
	'keyword\\.operator\\.assignment\\.smarty': 'assignmentOperator',
	'invalid\\.illegal\\.assignment\\.smarty': 'invalid',

	// modifier
	'meta\\.modifier\\.smarty': 'modifier',
	'punctuation\\.definition\\.modifier\\.begin\\.smarty': 'begin',
	'punctuation\\.definition\\.modifier\\.array\\.smarty': 'arrayModifier',
	'entity\\.name\\.function\\.modifier\\.smarty': 'identifier',
	'punctuation\\.separator\\.modifier\\.parameter\\.smarty': 'separator',

	// typeCasting
	'meta\\.type-casting\\.smarty': 'typeCasting',
	'punctuation\\.definition\\.type-casting\\.begin\\.smarty': 'begin',
	'entity\\.name\\.type\\.smarty': 'type',
	'punctuation\\.definition\\.type-casting\\.end\\.smarty': 'end'
}).map(([key, value]) => ({
	from: new RegExp(`(?<=>|^)${key}(?=>|$)`, 'giu'),
	to: value || key
}));
