// Tokens with `null` value are removed. tokens which are not defined in the mapping, keep their name.
// To: The replacement string (to use captured grouped of the regexp use $0 (all), $1, $2 ... $9)
// To search for a part of the string '(?:[^>]*?\\.)?begin'
module.exports = Object.entries({
	// Non-smarty-code
	'([^>](?!smarty)>?)+': 'others',

	// Smary root
	'source.smarty': 'root',

	// SmartyComment
	'comment\\.block\\.smarty': 'comment',
	'comment\\.block\\.content\\.smarty': 'commentContent',
	'punctuation\\.definition\\.comment\\.begin\\.smarty': 'begin',
	'punctuation\\.definition\\.comment\\.end\\.smarty': 'end',

	// SmartyLiteralBlock
	'meta\\.block-literal\\.smarty': 'blockLiteral',
	'meta\\.block-literal\\.close\\.smarty': 'blockLiteralClose',
	'punctuation\\.section\\.embedded\\.block-literal\\.close\\.begin\\.smarty': 'begin',
	'invalid\\.illegal\\.block-literal\\.smarty': 'invalid',

	// LiteralBlockContent
	'string\\.block-literal\\.content\\.smarty': 'literalContent',

	// Smarty
	'meta\\.block\\.smarty': 'smartyBlock',
	'punctuation\\.section\\.embedded\\.begin\\.smarty': 'begin',
	'punctuation\\.section\\.embedded\\.end\\.smarty': 'end',
	'invalid\\.illegal\\.smarty': 'invalid',

	// SmartyBlockFor
	'meta\\.block-for\\.smarty': 'blockFor',
	'keyword\\.control\\.function\\.smarty': 'identifier',
	'meta\\.block-for\\.close\\.begin\\.smarty': 'begin',
	'punctuation\\.section\\.embedded\\.block-for\\.close\\.begin\\.smarty': 'closeBegin',
	'keyword\\.operator\\.expression\\.for\\.([^\\.>]+?)\\.smarty': '$1Keyword',
	'punctuation\\.terminator\\.block-for\\.statement\\.smarty': 'terminator',
	'punctuation\\.separator\\.block-for\\.comma\\.smarty': 'separator',
	'invalid\\.illegal\\.block-for\\.smarty': 'invalid',

	// SmartyBlockForEach
	'meta\\.block-foreach\\.smarty': 'blockForEach',
	'meta\\.block-foreach\\.close\\.begin\\.smarty': 'begin',
	'punctuation\\.section\\.embedded\\.block-foreach\\.close\\.begin\\.smarty': 'closeBegin',
	'keyword\\.operator\\.block-foreach\\.value\\.smarty': 'value',
	'keyword\\.operator\\.expression\\.block-foreach\\.as\\.smarty': 'asKeyword',
	'invalid\\.illegal\\.block-foreach\\.smarty': 'invalid',

	// SmartyBlockCondition
	'meta\\.block-([^\\.>]+?)-condition\\.smarty': 'blockCondition',

	// SmartyBlock
	'meta\\.block-([^\\.>]+?)\\.smarty': 'block',
	'meta\\.block-([^\\.>]+?)\\.close\\.smarty': 'close',
	'punctuation\\.section\\.embedded\\.block-([^\\.>]+?)\\.close\\.begin\\.smarty': 'begin',
	'invalid\\.illegal\\.block\\.smarty': 'invalid',

	// BlockContent
	'meta\\.block\\.content\\.smarty': 'blockContent',
	'punctuation\\.section\\.embedded\\.open\\.end\\.smarty': 'openEnd',

	// SmartySubBlockForElse
	'meta\\.sub-block-forelse\\.smarty': 'blockForElse',
	'invalid\\.illegal\\.sub-block-forelse\\.smarty': 'invalid',

	// SmartySubBlockForEachElse
	'meta\\.sub-block-foreachelse\\.smarty': 'blockForEachElse',
	'invalid\\.illegal\\.sub-block-foreachelse\\.smarty': 'invalid',

	// SmartySubBlockElseIf
	'meta\\.sub-block-elseif\\.smarty': 'blockElseIf',
	'invalid\\.illegal\\.sub-block-elseif\\.smarty': 'invalid',

	// SmartySubBlockElse
	'meta\\.sub-block-else\\.smarty': 'blockElse',
	'invalid\\.illegal\\.sub-block-else\\.smarty': 'invalid',

	// SmartySubBlockSectionElse
	'meta\\.sub-block-sectionelse\\.smarty': 'blockSectionElse',
	'invalid\\.illegal\\.sub-block-sectionelse\\.smarty': 'invalid',

	// NamedAttribute
	'meta\\.named-attribute\\.name-([^\\.>]+?)\\.smarty': 'namedAttribute',
	'entity\\.other\\.attribute-name\\.smarty': 'identifier',
	'invalid\\.illegal\\.named-attribute\\.smarty': 'invalid',

	// UnnamedAttribute
	'meta\\.unnamed-attribute\\.smarty': 'unnamedAttribute',
	'punctuation\\.separator\\.unnamed-attribute\\.begin\\.smarty': 'begin',
	'invalid\\.illegal\\.unnamed-attribute\\.smarty': 'invalid',

	// SmartyFunction / SmartyFunctionModifier
	'meta\\.function-call\\.name-([^\\.>]+?)\\.smarty': 'function',
	'entity\\.name\\.function\\.smarty': 'identifier',
	'invalid\\.illegal\\.function\\.smarty': 'invalid',
	'invalid\\.illegal\\.function-modifier\\.smarty': 'invalid',

	// SmartyExpression
	'meta\\.expression\\.smarty': 'expression',
	'invalid\\.illegal\\.expression\\.smarty': 'invalid',

	// ExpressionAUONMS
	'invalid\\.illegal\\.expression-auonms\\.smarty': 'invalid',

	// ExpressionAAUONMS
	'invalid\\.illegal\\.expression-aauonms\\.smarty': 'invalid',

	// ExpressionACUONMS
	'invalid\\.illegal\\.expression-acuonms\\.smarty': 'invalid',

	// EncapsulatedExpression
	'meta\\.encapsulated-expression\\.smarty': 'encapsulatedExpression',
	'meta\\.brace\\.begin\\.smarty': 'begin',
	'meta\\.brace\\.end\\.smarty': 'end',

	// Operation
	'meta\\.operation\\.smarty': 'operation',
	'keyword\\.operator\\.logical\\.smarty': 'logicalOperator',
	'keyword\\.operator\\.arithmetic\\.smarty': 'arithmeticOperator',
	'keyword\\.operator\\.logical\\.constant\\.smarty': 'logicalConstant',

	// OperationIsBy
	'meta\\.operation\\.is-by\\.smarty': 'operation',

	// OperationIs
	'meta\\.operation\\.is\\.smarty': 'operationIs',

	// Negation
	'meta\\.negation\\.smarty': 'negation',
	'keyword\\.operator\\.negation\\.smarty': 'negationOperator',

	// SingleQuotedString
	'string\\.quoted\\.single\\.smarty': 'singleQuotedString',
	'string\\.content\\.smarty': 'stringContent',
	'punctuation\\.definition\\.string\\.begin\\.smarty': 'begin',
	'punctuation\\.definition\\.string\\.end\\.smarty': 'end',
	'constant\\.character\\.escape\\.smarty': 'escapeSequence',

	// DoubleQuotedString
	'string\\.quoted\\.double\\.smarty': 'doubleQuotedString',
	'meta\\.template-expression\\.smarty': 'templateExpression',
	'punctuation\\.definition\\.template-expression\\.begin\\.smarty': 'begin',
	'punctuation\\.definition\\.template-expression\\.end\\.smarty': 'end',
	'invalid\\.illegal\\.wrapped-variable-expression\\.smarty': 'invalid',

	// UnquotedString
	'string\\.unquoted\\.smarty': 'unquotedString',

	// Number
	'constant\\.numeric\\.smarty': 'number',
	'constant\\.numeric\\.value\\.smarty': 'value',
	'constant\\.numeric\\.exponent\\.smarty': 'exponent',

	// Constant
	'constant\\.language\\.([^\\.>]+?)\\.smarty': 'constant',
	'meta\\.array\\.literal\\.smarty': 'array',
	'punctuation\\.definition\\.array\\.begin\\.smarty': 'begin',
	'punctuation\\.definition\\.array\\.end\\.smarty': 'end',
	'punctuation\\.separator\\.array\\.comma\\.smarty': 'separator',
	'invalid\\.illegal\\.array\\.literal\\.smarty': 'invalid',

	// Array
	'meta\\.array\\.item\\.value\\.smarty': 'value',
	'punctuation\\.separator\\.array\\.key-value\\.smarty': 'keyValue',

	// Variable
	'variable\\.smarty': 'variable',
	'punctuation.definition.variable.begin.smarty': 'begin',
	'entity\\.name\\.variable\\.smarty': 'identifier',
	'punctuation\\.separator\\.variable\\.property\\.smarty': 'iteratorInfoSeparator',
	'entity\\.name\\.variable\\.property\\.name-([^\\.>]+?)\\.smarty': 'iteratorInfo',
	'keyword\\.operator\\.unary\\.smarty': 'unaryOperator',

	// BasicVariable
	'variable\\.basic\\.smarty': 'variable',

	// Property
	'variable\\.other\\.property\\.smarty': 'property',
	'punctuation\\.separator\\.property\\.smarty': 'separator',
	'entity\\.name\\.property\\.smarty': 'identifier',
	'meta\\.property-expression\\.smarty': 'propertyExpression',
	'punctuation\\.definition\\.property\\.begin\\.smarty': 'begin',
	'punctuation\\.definition\\.property\\.end\\.smarty': 'end',

	// Assignment
	'meta\\.assignment\\.smarty': 'assignment',
	'keyword\\.operator\\.assignment\\.smarty': 'assignmentOperator',
	'invalid\\.illegal\\.assignment\\.smarty': 'invalid',

	// Modifier
	'meta\\.modifier\\.smarty': 'modifier',
	'punctuation\\.definition\\.modifier\\.begin\\.smarty': 'begin',
	'punctuation\\.definition\\.modifier\\.array\\.smarty': 'arrayModifier',
	'entity\\.name\\.function\\.modifier\\.smarty': 'identifier',
	'punctuation\\.separator\\.modifier\\.parameter\\.smarty': 'separator',

	// TypeCasting
	'meta\\.type-casting\\.smarty': 'typeCasting',
	'punctuation\\.definition\\.type-casting\\.begin\\.smarty': 'begin',
	'entity\\.name\\.type\\.smarty': 'type',
	'punctuation\\.definition\\.type-casting\\.end\\.smarty': 'end'
}).map(([key, value]) => ({
	from: new RegExp(`(?<=>|^)${key}(?=>|$)`, 'giu'),
	to: value || key
}));
