import {
	languages,
	workspace,
	CompletionItemKind,
	CompletionList,
	ExtensionContext,
	MarkdownString,
	SnippetString
} from 'vscode';

const path = require("path");
const yaml = require('js-yaml');
const fs = require('fs');

class SqlCompletionItemProvider {
	completionItems: any[];
	completionList: any;
	timezone: string;

	constructor () {
		this.completionItems = [];
		this.timezone = (workspace.getConfiguration('visual-bigquery').get('defaultTimezone') as string);

		// Read snippets yaml and Register Snippets 
		this.pushCompletionItems('keywords/keywords.yaml', CompletionItemKind.Keyword);
		this.pushCompletionItems('keywords/subkeywords.yaml', CompletionItemKind.Property);
		
		this.pushCompletionItems('types/types.yaml', CompletionItemKind.Field);
		
		this.pushCompletionItems('functions/uuid-functions.yaml', CompletionItemKind.Function);
		this.pushCompletionItems('functions/aggregate-functions.yaml', CompletionItemKind.Function);
		this.pushCompletionItems('functions/approximate-aggregate-functions.yaml', CompletionItemKind.Function);
		this.pushCompletionItems('functions/array-functions.yaml', CompletionItemKind.Function);
		this.pushCompletionItems('functions/bit-functions.yaml', CompletionItemKind.Function);
		this.pushCompletionItems('functions/date-functions.yaml', CompletionItemKind.Function);
		this.pushCompletionItems('functions/datetime-functions.yaml', CompletionItemKind.Function);
		this.pushCompletionItems('functions/debugging-functions.yaml', CompletionItemKind.Function);
		this.pushCompletionItems('functions/geography-functions.yaml', CompletionItemKind.Function);
		this.pushCompletionItems('functions/hash-functions.yaml', CompletionItemKind.Function);
		this.pushCompletionItems('functions/hyper-log-log-functions.yaml', CompletionItemKind.Function);
		this.pushCompletionItems('functions/json-functions.yaml', CompletionItemKind.Function);
		this.pushCompletionItems('functions/mathematical-functions.yaml', CompletionItemKind.Function);
		this.pushCompletionItems('functions/navigation-functions.yaml', CompletionItemKind.Function);
		this.pushCompletionItems('functions/net-functions.yaml', CompletionItemKind.Function);
		this.pushCompletionItems('functions/numbering-functions.yaml', CompletionItemKind.Function);
		this.pushCompletionItems('functions/operator-functions.yaml', CompletionItemKind.Function);
		this.pushCompletionItems('functions/security-functions.yaml', CompletionItemKind.Function);
		this.pushCompletionItems('functions/statistical-aggregate-functions.yaml', CompletionItemKind.Function);
		this.pushCompletionItems('functions/string-functions.yaml', CompletionItemKind.Function);
		this.pushCompletionItems('functions/time-functions.yaml', CompletionItemKind.Function);
		this.pushCompletionItems('functions/timestamp-functions.yaml', CompletionItemKind.Function);
		
		this.pushCompletionItems('idioms/idioms-basic.yaml', CompletionItemKind.Snippet);
		this.pushCompletionItems('idioms/idioms-join.yaml', CompletionItemKind.Snippet);
		this.pushCompletionItems('idioms/idioms-window-functions.yaml', CompletionItemKind.Snippet);
		this.pushCompletionItems('idioms/idioms-others.yaml', CompletionItemKind.Snippet);

		this.completionList = new CompletionList(this.completionItems, false);
	}
	

    provideCompletionItems(document: any, position: any, token: any) {
        return Promise.resolve(this.completionList);
    }

	/**
	* Read snippets yaml and Register Snippets 
	*
	* @param yamlFile snippets yaml file name
	* @param kind CompletionItemKind
	*/
	private pushCompletionItems(yamlFile: string, kind: CompletionItemKind) {
		let yml: any;
		yml = yaml.safeLoad(
			fs.readFileSync(path.resolve(__dirname, '../snippets/' + yamlFile),
			'utf-8'
		));

		for (let i = 0; i < yml.data.length; i++) {
			this.completionItems.push(
				{
					label: yml.data[i].label,
					kind: kind,
					insertText: new SnippetString(yml.data[i].body.replace('{{ timezone }}', this.timezone)),
					detail: yml.data[i].label + ' -- Visual-BigQuery ' + yml.name,
					documentation: new MarkdownString(yml.data[i].documentation)
				}
			);
		}
	}
}


export function activate(context: ExtensionContext) {
	context.subscriptions.push(
		languages.registerCompletionItemProvider(
			{ scheme: 'file', language: 'sql' },
			new SqlCompletionItemProvider(),
			'.'
		)
	);
}

export function deactivate() {}
