import { RuleFunction } from './rule';

export type FailureSeverity = 'error' | 'warn' | 'hint' | 'info';

export interface Failure {
	ruleId?: string;
	message: string;
	startLine: number;
	startColumn: number;
	endLine: number;
	endColumn: number;
	severity?: FailureSeverity;
}

export function initialize (options?: { vscodeTextMate?: import('vscode-textmate') | null; rules: { [ruleName: string]: string | [string, object]; }; }): Promise<void> | never;
export function verify (sourceCode: string, options?: { fileName?: string; maxFailures?: number; }): Promise<Failure[]> | never;

export interface OptionsRules {
	[ruleName: string]: string | [FailureSeverity | 'off', Object];
}

export interface Token {
	scopes: string[];
	tmScopes: string[];
 	startLine: number;
 	startColumn: number;
	endLine: number;
	endColumn: number;
}

export interface LinterRule {
	filePath: string;
	name: string;
	severity: FailureSeverity;
	options: Object;
	exec: RuleFunction;
}
