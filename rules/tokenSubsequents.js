/**
 * @typedef {import('../lib/rule').TokenTreeBranch} TokenTreeBranch
 * @typedef {import('../lib/rule').AddErrorFunction} AddErrorFunction
 */

const ALLOWED_SUBSEQUENTS_GENERAL = {
	'comment': ['comment'],
	'logicalOperator': ['arithmeticOperator'],
	'modifier': ['modifier'],
	'negation': ['array', 'constant', 'doubleQuotedString', 'encapsulatedExpression', 'negation', 'number', 'operation', 'singleQuotedString', 'smartyBlock', 'typeCasting', 'unquotedString', 'variable'],
	'operation': ['array', 'constant', 'doubleQuotedString', 'encapsulatedExpression', 'negation', 'number', 'singleQuotedString', 'smartyBlock', 'typeCasting', 'unquotedString', 'variable'],
	'openEnd': ['blockContent'],
	'typeCasting': ['array', 'constant', 'doubleQuotedString', 'encapsulatedExpression', 'negation', 'number', 'singleQuotedString', 'smartyBlock', 'unquotedString', 'variable']
};

const ALLOWED_SUBSEQUENTS = {
    'array': {
        'begin': ['array', 'comment', 'doubleQuotedString', 'encapsulatedExpression', 'number', 'operation', 'singleQuotedString', 'smartyBlock', 'typeCasting', 'unquotedString', 'variable', 'end'],
		'array': ['separator', 'comment', 'end'],
		'comment': ['doubleQuotedString', 'singleQuotedString', 'unquotedString', 'end'],
		'doubleQuotedString': ['comment', 'modifier', 'keyValue', 'separator', 'end'],
		'encapsulatedExpression': ['comment', 'modifier', 'operation', 'end'],
		'keyValue': ['value'],
		'modifier': ['comment', 'keyValue', 'separator', 'end'],
        'number': ['comment', 'keyValue', 'operation', 'separator', 'end'],
		'separator': ['array', 'comment', 'doubleQuotedString', 'number', 'operation', 'singleQuotedString', 'smartyBlock', 'typeCasting', 'unquotedString', 'variable'],
		'singleQuotedString': ['comment', 'keyValue', 'separator', 'end'],
		'smartyBlock': ['comment', 'keyValue', 'modifier', 'separator', 'end'],
        'unquotedString': ['comment', 'keyValue', 'separator', 'end'],
        'value': ['separator', 'comment', 'end'],
        'variable': ['comment', 'keyValue', 'modifier', 'operation', 'separator', 'end']
    },
    'assignment': {
        'array': ['modifier'],
		'doubleQuotedString': ['modifier', 'operation', 'operationIs'],
		'encapsulatedExpression': ['modifier', 'operation', 'operationIs'],
		'modifier': ['operation', 'operationIs'],
		'number': ['modifier', 'operation', 'operationIs'],
		'assignmentOperator': ['array', 'constant', 'doubleQuotedString', 'encapsulatedExpression', 'negation', 'number', 'operation', 'singleQuotedString', 'smartyBlock', 'typeCasting', 'unquotedString', 'variable'],
		'singleQuotedString': ['modifier', 'operation', 'operationIs'],
		'smartyBlock': ['modifier', 'operation', 'operationIs'],
        'variable': ['modifier', 'operation', 'operationIs', 'smartyBlock']
    },
    'block': {
        'blockContent': ['close'],
        'identifier': ['namedAttribute', 'unnamedAttribute', 'openEnd'],
        'namedAttribute': ['namedAttribute', 'unnamedAttribute', 'openEnd'],
		'unnamedAttribute': ['namedAttribute', 'unnamedAttribute', 'openEnd'],
		'openEnd': ['close']
	},
	'blockCondition': {
		'array': ['modifier', 'operation', 'openEnd'],
		'blockContent': ['close'],
		'constant': ['operation', 'operationIs', 'openEnd'],
		'doubleQuotedString': ['modifier', 'operation', 'operationIs', 'openEnd'],
		'encapsulatedExpression': ['modifier', 'operation', 'operationIs', 'openEnd'],
		'identifier': ['array', 'constant', 'doubleQuotedString', 'encapsulatedExpression', 'negation', 'number', 'operation', 'singleQuotedString', 'smartyBlock', 'typeCasting', 'unquotedString', 'variable'],
		'modifier': ['operation', 'operationIs', 'openEnd'],
		'number': ['modifier', 'operation', 'operationIs', 'openEnd'],
		'openEnd': ['close'],
		'operationIs': ['operation', 'openEnd'],
		'singleQuotedString': ['modifier', 'operation', 'operationIs', 'openEnd'],
		'smartyBlock': ['modifier', 'operation', 'operationIs', 'openEnd'],
		'unquotedString': ['operation', 'operationIs', 'openEnd'],
		'variable': ['modifier', 'operation', 'operationIs', 'openEnd']
	},
    'blockContent': {
		'blockLiteral': ['blockElse', 'blockElseIf', 'blockForEachElse', 'blockForElse', 'blockLiteral', 'blockSectionElse', 'comment', 'others', 'smartyBlock'],
        'comment': ['blockElse', 'blockElseIf', 'blockForEachElse', 'blockForElse', 'blockLiteral', 'blockSectionElse', 'comment', 'others', 'smartyBlock'],
		'others': ['blockElse', 'blockElseIf', 'blockForEachElse', 'blockForElse', 'blockLiteral', 'blockSectionElse', 'comment', 'others', 'smartyBlock'],
        'smartyBlock': ['blockElse', 'blockElseIf', 'blockForEachElse', 'blockForElse', 'blockLiteral', 'blockSectionElse', 'comment', 'others', 'smartyBlock']
    },
    'blockElse': {
        'begin': ['identifier'],
        'identifier': ['openEnd']
	},
    'blockElseIf': {
		'begin': ['identifier'],
		'array': ['modifier'],
		'constant': ['operation', 'operationIs', 'openEnd'],
		'doubleQuotedString': ['modifier', 'operation', 'operationIs', 'openEnd'],
		'encapsulatedExpression': ['operation', 'operationIs', 'openEnd'],
		'identifier': ['array', 'constant', 'doubleQuotedString', 'encapsulatedExpression', 'negation', 'number', 'operation', 'singleQuotedString', 'smartyBlock', 'typeCasting', 'unquotedString', 'variable'],
		'modifier': ['operation', 'operationIs', 'openEnd'],
		'number': ['modifier', 'operation', 'operationIs', 'openEnd'],
		'singleQuotedString': ['modifier', 'operation', 'operationIs', 'openEnd'],
		'smartyBlock': ['modifier', 'operation', 'operationIs', 'openEnd'],
		'unquotedString': ['operation', 'operationIs', 'openEnd'],
		'variable': ['modifier', 'operation', 'operationIs', 'openEnd']
    },
    'blockFor': {
		'assignmentKeyword': ['number', 'encapsulatedExpression', 'typeCasting', 'variable'],
		'encapsulatedExpression': ['modifier', 'operation', 'toKeyword', 'openEnd'],
		'identifier': ['variable'],
		'namedAttribute': ['namedAttribute', 'openEnd'],
		'number': ['modifier', 'namedAttribute', 'operation', 'separator', 'stepKeyword', 'terminator', 'toKeyword', 'openEnd'],
		'modifier': ['operation', 'toKeyword', 'terminator', 'openEnd'],
		'separator': ['variable', 'openEnd'],
		'smartyBlock': ['namedAttribute'],
		'stepKeyword': ['typeCasting', 'variable', 'number', 'operation'],
		'terminator': ['typeCasting', 'variable'],
		'toKeyword': ['encapsulatedExpression', 'number', 'smartyBlock', 'typeCasting', 'variable'],
		'variable': ['assignmentKeyword', 'openEnd', 'modifier', 'namedAttribute', 'operation', 'operationIs', 'stepKeyword', 'terminator', 'toKeyword']
	},
    'blockForElse': {
        'begin': ['identifier'],
        'identifier': ['openEnd']
    },
    'blockForEach': {
		'asKeyword': ['unnamedAttribute'],
		'identifier': ['namedAttribute', 'unnamedAttribute'],
		'namedAttribute': ['namedAttribute', 'openEnd'],
		'unnamedAttribute': ['asKeyword', 'namedAttribute', 'openEnd']
    },
    'blockForEachElse': {
        'begin': ['identifier'],
        'identifier': ['openEnd']
	},
	'blockLiteral': {
		'begin': ['identifier'],
		'identifier': ['openEnd'],
		'literalContent': ['blockLiteralClose'],
		'openEnd': ['literalContent', 'blockLiteralClose']
	},
	'blockLiteralClose': {
		'begin'	: ['identifier'],
		'identifier': ['end']
	},
    'blockSectionElse': {
        'begin': ['identifier'],
        'identifier': ['openEnd']
    },
    'close': {
        'begin': ['identifier']
    },
    'closeBegin': {
        'begin': ['identifier']
    },
    'comment': {
        'begin': ['commentContent', 'end'],
        'commentContent': ['end']
    },
    'doubleQuotedString': {
        'begin': ['stringContent', 'end'],
        'stringContent': ['end']
    },
    'encapsulatedExpression': {
		'begin': ['array', 'constant', 'encapsulatedExpression', 'doubleQuotedString', 'negation', 'number', 'operation', 'singleQuotedString', 'smartyBlock', 'typeCasting', 'unquotedString', 'variable', 'end'],
		'array': ['modifier'],
		'constant': ['operation', 'end'],
		'doubleQuotedString': ['modifier', 'operation', 'operationIs', 'end'],
        'encapsulatedExpression': ['modifier', 'operation', 'operationIs', 'end'],
		'modifier': ['operation', 'operationIs', 'end'],
		'number': ['modifier', 'operation', 'operationIs', 'end'],
		'singleQuotedString': ['modifier', 'operation', 'operationIs', 'end'],
		'smartyBlock': ['modifier', 'operation', 'operationIs', 'end'],
		'unquotedString': ['modifier', 'operation', 'operationIs', 'end'],
        'variable': ['modifier', 'operation', 'operationIs', 'end']
    },
    'function': {
        'identifier': ['modifier', 'namedAttribute', 'unnamedAttribute'],
        'namedAttribute': ['namedAttribute', 'unnamedAttribute'],
        'unnamedAttribute': ['namedAttribute', 'unnamedAttribute']
    },
    'modifier': {
        'begin': ['arrayModifier', 'identifier'],
        'array': ['modifier', 'separator'],
        'arrayModifier': ['identifier'],
        'constant': ['modifier', 'operation', 'separator'],
		'doubleQuotedString': ['modifier', 'operation', 'separator'],
		'encapsulatedExpression': ['modifier', 'operation', 'separator'],
        'identifier': ['modifier', 'separator'],
		'number': ['modifier', 'operation', 'operationIs', 'separator'],
		'separator': ['array', 'constant', 'doubleQuotedString', 'encapsulatedExpression', 'number', 'operation', 'singleQuotedString', 'smartyBlock', 'typeCasting', 'unquotedString', 'variable'],
		'singleQuotedString': ['modifier', 'operation', 'separator'],
		'smartyBlock': ['modifier', 'separator'],
		'unquotedString': ['modifier', 'operation', 'separator'],
        'variable': ['modifier', 'operation', 'operationIs', 'separator']
    },
    'namedAttribute': {
		'array': ['modifier'],
        'doubleQuotedString': ['modifier'],
        'encapsulatedExpression': ['modifier'],
		'identifier': ['array', 'constant', 'doubleQuotedString', 'encapsulatedExpression', 'number', 'singleQuotedString', 'smartyBlock', 'typeCasting', 'unquotedString', 'variable'],
		'number': ['modifier', 'operation'],
		'singleQuotedString': ['modifier'],
		'smartyBlock': ['modifier'],
		'variable': ['modifier', 'operation', 'operationIs']
	},
	'number': {
		'value': ['exponent']
	},
	'operationIs': {
		'logicalOperator': ['logicalConstant']
	},
    'others': {
		'blockLiteral': ['blockLiteral', 'comment', 'smartyBlock'],
        'comment': ['blockLiteral', 'comment', 'smartyBlock'],
        'smartyBlock': ['blockLiteral', 'comment', 'smartyBlock']
    },
    'property': {
        'identifier': ['comment', 'separator'],
        'separator': ['identifier', 'smartyBlock', 'typeCasting', 'variable'],
        'smartyBlock': ['separator'],
        'variable': ['separator']
    },
    'propertyExpression': {
        'begin': ['doubleQuotedString', 'encapsulatedExpression', 'number', 'singleQuotedString', 'smartyBlock', 'typeCasting', 'variable', 'end'],
		'doubleQuotedString': ['modifier', 'end'],
		'encapsulatedExpression': ['modifier', 'operation', 'operationIs', 'end'],
		'modifier': ['operation', 'operationIs', 'end'],
        'number': ['modifier', 'operation', 'operationIs', 'end'],
		'singleQuotedString': ['modifier', 'operationIs', 'end'],
		'smartyBlock': ['operation', 'end'],
        'variable': ['modifier', 'operation', 'operationIs', 'end']
    },
  	'root': {
		'blockLiteral': ['blockLiteral', 'comment', 'others', 'smartyBlock'],
		'comment': ['blockLiteral', 'comment', 'others', 'smartyBlock'],
		'smartyBlock': ['blockLiteral', 'comment', 'others', 'smartyBlock'],
		'others': ['blockLiteral', 'comment', 'others', 'smartyBlock']
	},
    'singleQuotedString': {
        'begin': ['stringContent', 'end'],
        'stringContent': ['end']
    },
    'smartyBlock': {
        'begin': ['array', 'block', 'blockCondition', 'blockFor', 'blockForEach', 'doubleQuotedString', 'encapsulatedExpression', 'function', 'negation', 'number', 'operation', 'singleQuotedString', 'smartyBlock', 'typeCasting', 'variable'],
        'array': ['modifier', 'end'],
		'assignment': ['operation', 'end'],
        'block': ['end'],
        'blockFor': ['blockFor', 'end'],
		'blockForEach': ['blockForEach', 'end'],
		'blockCondition': ['end'],
		'constant': ['operation', 'end'],
        'doubleQuotedString': ['modifier', 'operation', 'operationIs', 'end'],
        'encapsulatedExpression': ['modifier', 'operation', 'operationIs', 'end'],
        'function': ['end'],
        'modifier': ['operation', 'end'],
		'number': ['modifier', 'operation', 'end'],
        'singleQuotedString': ['modifier', 'operation', 'operationIs', 'end'],
        'smartyBlock': ['modifier', 'operation', 'unquotedString', 'end'],
        'unquotedString': ['smartyBlock', 'end'],
        'variable': ['assignment', 'modifier', 'operation', 'operationIs', 'smartyBlock', 'end']
    },
    'stringContent': {
		'comment': ['comment', 'escapeSequence', 'smartyBlock', 'templateExpression', 'variable'],
		'escapeSequence': ['comment', 'escapeSequence', 'smartyBlock', 'templateExpression', 'variable'],
		'smartyBlock': ['comment', 'escapeSequence', 'smartyBlock', 'templateExpression', 'variable'],
		'templateExpression': ['comment', 'escapeSequence', 'smartyBlock', 'templateExpression', 'variable'],
        'variable': ['comment', 'escapeSequence', 'smartyBlock', 'templateExpression', 'variable']
	},
	'typeCasting': {
		'begin': ['type'],
		'type': ['end']
	},
    'templateExpression': {
		'begin': ['variable'],
		'modifier': ['end'],
		'number': ['end'],
		'variable': ['modifier', 'operation', 'operationIs', 'end'],
	},
    'unnamedAttribute': {
		'begin': ['array', 'comment', 'constant', 'singleQuotedString', 'doubleQuotedString', 'encapsulatedExpression', 'negation', 'number', 'smartyBlock', 'unquotedString', 'variable'],
		'array': ['modifier'],
		'constant': ['operation'],
		'singleQuotedString': ['modifier', 'operation', 'operationIs'],
        'doubleQuotedString': ['modifier', 'operation', 'operationIs'],
		'encapsulatedExpression': ['modifier', 'operation', 'operationIs'],
		'modifier': ['operation', 'operationIs'],
		'number': ['modifier', 'operation', 'operationIs'],
		'smartyBlock': ['modifier', 'operation', 'operationIs'],
        'unquotedString': ['typeCasting', 'variable'],
        'variable': ['modifier', 'operation', 'operationIs', 'unquotedString']
	},
	'value': {
		'array': ['comment', 'modifier'],
		'constant': ['comment'],
		'doubleQuotedString': ['comment', 'modifier'],
		'encapsulatedExpression': ['comment', 'operation', 'operationIs', 'modifier'],
		'modifier': ['operation', 'operationIs'],
		'number': ['comment', 'operation', 'operationIs', 'modifier'],
		'variable': ['comment', 'operation', 'operationIs', 'modifier'],
		'singleQuotedString': ['comment', 'modifier'],
		'smartyBlock': ['comment', 'modifier']
	},
    'variable': {
        'begin': ['identifier'],
        'identifier': ['iteratorInfoSeparator', 'property', 'propertyExpression', 'unaryOperator'],
        'iteratorInfoSeparator': ['iteratorInfo'],
        'property': ['propertyExpression', 'unaryOperator'],
        'propertyExpression': ['property', 'propertyExpression']
    }
};

/**
 * @param {object} options
 * @param {TokenTreeBranch} options.tree
 * @param {AddErrorFunction} options.addError
 * @returns {void}
 */
module.exports = function tokenSubsequents ({ tree, addError }) {
	parseChildren(tree);

	/**
	 * @param {TokenTreeBranch} parent
	 * @returns {void}
	 */
	function parseChildren (parent) {
		const parentName = parent.name;
		const children = parent.children;

		for (let i = 0; i < children.length - 1; i++) {
			if (
				!ALLOWED_SUBSEQUENTS_GENERAL[children[i].name] ||
				!ALLOWED_SUBSEQUENTS_GENERAL[children[i].name].includes(children[i + 1].name)
			) {
				/** @type {string[] | undefined} */
				const allowedSubsequent = (ALLOWED_SUBSEQUENTS[parentName] && ALLOWED_SUBSEQUENTS[parentName][children[i].name]);

				if (!allowedSubsequent || !allowedSubsequent.includes(children[i + 1].name)) {
					// Special error for unclosed blocks
					if (
						(parentName === 'block' || parentName === 'blockCondition') &&
						children[i].name === 'blockContent' &&
						children[i + 1].name !== 'close'
					) {
						const identifier = children.find((child) => child.name === 'identifier');

						addError({
							message: `Unclosed "${(identifier ? `{${identifier.raw}}` : parentName)}" block. Make sure the opening "${(identifier ? `{${identifier.raw}}` : parentName)}" and every HTML-tag inside the block is closed.`,
							startLine: parent.startLine,
							startColumn: parent.startColumn,
							endLine: parent.endLine,
							endColumn: parent.endColumn
						});
					}

					// Special message for comments
					else if (children[i + 1].name === 'comment') {
						addError({
							message: `Comments should not be placed in "${parentName}" behind "${children[i].name}".`,
							startLine: children[i].startLine,
							startColumn: children[i].startColumn,
							endLine: children[i + 1].endLine,
							endColumn: children[i + 1].endColumn
						});
					}
					else if (children[i].name === 'comment') {
						// Suppress a second warning for the same comment as above.
					}

					else {
						addError({
							message: `In "${parentName}": "${children[i].name}" cannot be followed by "${children[i + 1].name}".${allowedSubsequent ? ` Allowed is one of "${allowedSubsequent.join('", "')}".` : ''}`,
							startLine: children[i].startLine,
							startColumn: children[i].startColumn,
							endLine: children[i + 1].endLine,
							endColumn: children[i + 1].endColumn
						});
					}
				}
			}

			if (children[i].children.length > 1) {
				parseChildren(children[i]);
			}
		}

		const lastIndex = children.length - 1;
		if (children[lastIndex].children.length > 1) {
			parseChildren(children[lastIndex]);
		}
	}
};
