import {
	languages,
	CompletionItemKind,
	CompletionList,
	ExtensionContext,
} from 'vscode';

class SqlCompletionItemProvider {
	completionItems: any[];
	completionList: any;
	constructor (){
		this.completionItems = []

		// Reserved Keywords(not used snippets)
		const keywords = [
			'ALL',
			'AND',
			'ANY',
			'ARRAY',
			'AS',
			'ASC',
			'ASSERT_ROWS_MODIFIED',
			'AT',
			// 'BETWEEN',
			// 'BY',
			// 'CASE',
			// 'CAST',
			'COLLATE',
			'CONTAINS',
			// 'CREATE',
			// 'CROSS',
			'CUBE',
			'CURRENT',
			'DEFAULT',
			'DEFINE',
			'DESC',
			'DISTINCT',
			// 'ELSE',
			// 'END',
			'ENUM',
			'ESCAPE',
			'EXCEPT',
			'EXCLUDE',
			'EXISTS',
			'EXTRACT',
			'FALSE',
			'FETCH',
			'FOLLOWING',
			'FOR',
			// 'FROM',
			// 'FULL',
			// 'GROUP',
			'GROUPING',
			'GROUPS',
			'HASH',
			// 'HAVING',
			'IF',
			'IGNORE',
			'IN',
			// 'INNER',
			'INTERSECT',
			'INTERVAL',
			'INTO',
			'IS',
			// 'JOIN',
			'LATERAL',
			// 'LEFT',
			'LIKE',
			// 'LIMIT',
			'LOOKUP',
			'MERGE',
			'NATURAL',
			'NEW',
			'NO',
			'NOT',
			'NULL',
			'NULLS',
			'OF',
			// 'ON',
			'OR',
			// 'ORDER',
			// 'OUTER',
			// 'OVER',
			// 'PARTITION',
			'PRECEDING',
			'PROTO',
			'RANGE',
			'RECURSIVE',
			'RESPECT',
			// 'RIGHT',
			'ROLLUP',
			'ROWS',
			// 'SELECT',
			'SET',
			'SOME',
			'STRUCT',
			'TABLESAMPLE',
			// 'THEN',
			'TO',
			'TREAT',
			'TRUE',
			'UNBOUNDED',
			'UNION',
			'UNNEST',
			'USING',
			// 'WHEN',
			// 'WHERE',
			'WINDOW',
			// 'WITH',
			'WITHIN',
			// 'QUALIFY'
		];
		for (let i = 0; i < keywords.length; i++) {
			this.completionItems.push(
				{
					label: keywords[i],
					kind: CompletionItemKind.Keyword,
					documentation: 'Visual BigQuery - Reserved Keywords'
				}
			)
		}

		// Other Keywords
		const subKeywords = [
			'EXTERNAL_QUERY',
			'_PARTITIONTIME',
			'_TABLE_SUFFIX',
			'REVOKE','GRANT',
			'SCHEMA',
			'DECLARE',
			'BEGIN',
			'CALL'
		];
		for (let i = 0; i < subKeywords.length; i++) {
			this.completionItems.push(
				{
					label: subKeywords[i],
					kind: CompletionItemKind.Property,
					documentation: 'Visual BigQuery - Sub Keywords'
				}
			)
		}

		// BigQuery Types
		const types = [
			'INT64',
			'NUMERIC',
			'BIGNUMERIC',
			'FLOAT64',
			'BOOL',
			'STRING',
			'BYTES',
			'DATE',
			'DATETIME',
			'TIME',
			'TIMESTAMP',
			'ARRAY',
			'STRUCT'
		];
		for (let i = 0; i < types.length; i++) {
			this.completionItems.push(
				{
					label: types[i],
					kind: CompletionItemKind.Field,
					documentation: 'Visual BigQuery - Types'
				}
			)
		}

		this.completionList = new CompletionList(this.completionItems, false);
	}
	
    provideCompletionItems(document, position, token) {
        return Promise.resolve(this.completionList);
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
