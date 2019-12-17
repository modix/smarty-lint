export interface TokenTreeBranch {
	name: string;
	tmName: string;
	startLine: number;
	startColumn: number;
	endLine: number;
	endColumn: number;
	raw: string;
	children: TokenTreeBranch[];
}

export type AddErrorFunction = (failure: import('./linter').Failure) => void;

export type RuleFunction = ({ tree, addError, ...additionalOptions }: { tree: TokenTreeBranch; addError: AddErrorFunction; [additonalOptions: string]: any; }) => void;
