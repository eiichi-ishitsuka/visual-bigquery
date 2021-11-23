import {
	languages,
	workspace,
	CompletionItemKind,
	CompletionList,
	ExtensionContext,
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
		this.pushCompletionItems('keywords.yaml', CompletionItemKind.Keyword);
		this.pushCompletionItems('subkeywords.yaml', CompletionItemKind.Property);
		this.pushCompletionItems('types.yaml', CompletionItemKind.Field);
		this.pushCompletionItems('functions.yaml', CompletionItemKind.Function);

		this.pushCompletionItems('idioms-basic.yaml', CompletionItemKind.Snippet);
		this.pushCompletionItems('idioms-join.yaml', CompletionItemKind.Snippet);
		this.pushCompletionItems('idioms-window-functions.yaml', CompletionItemKind.Snippet);
		this.pushCompletionItems('idioms-others.yaml', CompletionItemKind.Snippet);

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
					documentation: yml.data[i].documentation
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
