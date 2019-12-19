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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RuleFunction = ({ tree, addError, ...additionalOptions }: { tree: TokenTreeBranch; addError: AddErrorFunction; [additonalOptions: string]: any; }) => void;
