# Smarty-Lint

## Installation

```
npm install @modix/smarty-lint --save-dev
```

## Run

package.json:
```json
{
  "scripts": {
    "lint": "@modix/smarty-lint"
  }
}
```

## Configuration file

By specifying a `smartylint.json` (or `smartylint.js`) file in the root of your project, you are able to configure which files shall be parsed, and which rules shall be applied.

### Example

```json
{
	"files": [
		"**/*.tpl"
	],
	"rules": {
    "allowed-function-names": ["error", {
      "allowedFunctions": [
        "assign", "ldelim", "rdelim", "break", "continue",
        "mdx_elem", "mdx_mod"
      ],
      "allowedModifiers": ["tolower", "toupper", "floor", "round", "ceil"],
      "functions": ["mdx_getlocale", "mdx_loopcount"],
      "modifiers": ["explode"]
    }],
    "deprecated-function-names": ["warn", {
      "functions": ["mdx_loopcount", "mdx_getlocale"],
      "modifiers": ["explode"]
    }],
		"empty-block": "warn",
		"empty-comment": "warn",
		"eqeqeq": ["warn", {
      "ignore": ["=="]
      }],
		"lower-case-identifier": ["warn", {
			"ignore": ["namedAttribute", "property", "variable"]
		}],
		"unnecessary-encapsulation": "warn",
		"unquoted-string": ["warn", {
      "ignore": ["array"]
    }]
	}
}
```

## Available built-in rules

## `allowed-function-names`

Allow only specific function and modifier names.

> :warning: This rule is **NOT** applied on block functions (`{if}`, `{elseif}`, `{else}`, `{foreach}`, `{strip}`, `{literal}`, `{function}`, `{section}` etc.), but it's applied on built-in functions like `{assign}`, `{ldelim}`, `{rdelim}`, `{break}`, `{continue}`.

### Options

| Name | Type | Description |
|-|-|-|
| functions | string[] | A list of function names which are allowed. |
| modifiers | string[] | A list of modifier names which are allowed. |

### Example

```
{does_not_exist}
{$a|does_not_exist}
```

## `deprecated-function-names`

Show a deprecation-warning for specific function and modifier names.

### Options

| Name | Type | Description |
|-|-|-|
| functions | string[] | A list of function names which shall produce a deprecation warning. |
| modifiers | string[] | A list of modifier names which shall produce a deprecation warning. |

### Example

```
{mdx_getlocale}
{$a|explode}
```

## `empty-block`

This rule checks if the code contains empty blocks.

### Example

```
{if true}
  ...
{else}
{/if}

{literal}{/literal}
```

## `empty-comment`

This rule checks if the code contains empty Smarty comments.

### Example

```
{* *}
```

## `eqeqeq`

It is considered good practice to use the type-safe equality operators `===` and `!==` instead of their regular counterparts `==` and `!=`.

The reason for this is that `==` and `!=` do type coercion. For instance, the following statements are all considered true:

```
[] == false
3 == "03"
0 == 'K'
```

If one of those occurs in an innocent-looking statement such as `$a == $b` the actual problem is very difficult to spot.

| If you use | it recommends |
|-|-|
| `!=` | `!==` |
| `==` | `===` |
| `and` | `&&` |
| `or` | `||` |
| `eq` | `===` |
| `neq` | `!==` |
| `ne` | `!==` |
| `gte` | `>=` |
| `gt` | `>` |
| `ge` | `>=` |
| `lte` | `<=` |
| `lt` | `<` |
| `le` | `<=` |
| `mod` | `%` |

### Options

| Name | Type | Description |
|-|-|-|
| ignore | string[] | A list of operators which shall be ignored. |

### Example

```
{if $a == $b}
  ...
{/if}
```

## `lower-case-identifier`

Make sure identifiers are written in lower case.

Identifiers are used in arithmetic operators (`mod`), logical operators (`and`, `or`, `eq` etc.), constants (`true`, `false`, `null`) and idenfiers of functions (`mdx_vadump`, `literal`, `foreach` etc.) and modifiers (`strpos`, `regex_replace` etc.)

### Options

| Name | Type | Description |
|-|-|-|
| ignore | string[] | A list of token types which shall be ignored. |

### Example

```
{mdx_varDump "TITLE"|strPos}
```

## `unnecessary-encapsulation`

Checks if the code contains encapsulations which are not required. Unnecessary encapsulation makes the code harder to read.

```
{(1)}
{"Test"}
```

## `unquoted-string`

Unquoted string are the source of errors which are hard to find. That's why it's always recommended to use double-quoted or single-quoted strings.


### Options

| Name | Type | Description |
|-|-|-|
| ignore | string[] | A list of parent token types were unquoted strings are allowed (e.g. "array"), if it should be allowed as array-key. |

### Example

```
{$a = if mod 5}
```
