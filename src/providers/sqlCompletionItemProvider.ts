import {
	CompletionList
} from 'vscode';

export class SqlCompletionItemProvider {
	
	completionList: any;

	constructor (completeData: any[]) {
		this.completionList = new CompletionList(completeData, false);
	}
	

    provideCompletionItems(document: any, position: any, token: any) {
        return Promise.resolve(this.completionList);
    }

}
