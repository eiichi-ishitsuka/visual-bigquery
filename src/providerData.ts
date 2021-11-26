import {
	workspace,
	CompletionItemKind,
	MarkdownString,
	SnippetString
} from 'vscode';

const path = require("path");
const yaml = require('js-yaml');
const fs = require('fs');


export class ProviderData {
	completeData: any[];
	hoverData: any;
	timezone: string;

	constructor () {
		this.completeData = [];
		this.hoverData = {};
		this.timezone = (workspace.getConfiguration('visual-bigquery').get('defaultTimezone') as string);

		// Read snippets yaml and Register Snippets 
        this.readYamlData('../snippets/keywords', CompletionItemKind.Keyword);
        this.readYamlData('../snippets/types', CompletionItemKind.Field);
        this.readYamlData('../snippets/functions', CompletionItemKind.Function);
        this.readYamlData('../snippets/idioms', CompletionItemKind.Snippet);
	}

	/**
	* read yaml in directory and Register Provider Data 
	*
	* @param dirPath yaml file directory
	* @param kind CompletionItemKind
	*/
	private readYamlData(dirPath: string, kind: CompletionItemKind){
        // Get file list in directory
		let dirList: string[] = new Array();
        dirList = fs.readdirSync(
			path.resolve(__dirname, dirPath),
			{withFileTypes: true}
		).filter((dirent: { isFile: () => any; }) => dirent.isFile())
        .map((dirent: { name: any; }) => dirent.name);
		
		// read file data
		for (let i in dirList){
			this.readData(dirPath + '/' + dirList[i], kind);
		}

	}

	/**
	* Read yaml and Register Provider Data 
	*
	* @param yamlFile snippets yaml file name
	* @param kind CompletionItemKind
	*/
	private readData(yamlFile: string, kind: CompletionItemKind) {
		let yml: any;
		yml = yaml.safeLoad(
			fs.readFileSync(
				path.resolve(__dirname, yamlFile),
				'utf-8'
			)
		);

		for (let i = 0; i < yml.data.length; i++) {
			// Auto Complete Data
			this.completeData.push(
				{
					label: yml.data[i].label,
					kind: kind,
					insertText: new SnippetString(yml.data[i].body.replace('{{ timezone }}', this.timezone)),
					detail: yml.data[i].label + ' -- Visual-BigQuery ' + yml.name,
					documentation: new MarkdownString(yml.data[i].documentation)
				}
			);
			// Hover Data
			if(kind ===  CompletionItemKind.Function){
				let key = yml.data[i].label.replace(/\(.*/, '');
				this.hoverData[key] = new MarkdownString(
					'### ' + yml.data[i].label + ' -- Visual-BigQuery ' + yml.name + '\n'
					+ yml.data[i].documentation
				);
			}
		}
	}
}
