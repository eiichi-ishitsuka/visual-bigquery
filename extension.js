const vscode = require('vscode');

class SqlCompletionItemProvider {
	constructor (){
		this.completionItems = []

		// Reserved Keywords
		const keywords = ['ALL','AND','ANY','ARRAY','AS','ASC','ASSERT_ROWS_MODIFIED','AT','BETWEEN','BY','CASE','CAST','COLLATE','CONTAINS','CREATE','CROSS','CUBE','CURRENT','DEFAULT','DEFINE','DESC','DISTINCT','ELSE','END','ENUM','ESCAPE','EXCEPT','EXCLUDE','EXISTS','EXTRACT','FALSE','FETCH','FOLLOWING','FOR','FROM','FULL','GROUP','GROUPING','GROUPS','HASH','HAVING','IF','IGNORE','IN','INNER','INTERSECT','INTERVAL','INTO','IS','JOIN','LATERAL','LEFT','LIKE','LIMIT','LOOKUP','MERGE','NATURAL','NEW','NO','NOT','NULL','NULLS','OF','ON','OR','ORDER','OUTER','OVER','PARTITION','PRECEDING','PROTO','RANGE','RECURSIVE','RESPECT','RIGHT','ROLLUP','ROWS','SELECT','SET','SOME','STRUCT','TABLESAMPLE','THEN','TO','TREAT','TRUE','UNBOUNDED','UNION','UNNEST','USING','WHEN','WHERE','WINDOW','WITH','WITHIN','QUALIFY'];
		for (let i = 0; i < keywords.length; i++) {
			this.completionItems.push(
				{
					label: keywords[i],
					kind: vscode.CompletionItemKind.Keyword,
					documentation: 'Visual BigQuery - Keywords'
				}
			)
		}

		// Other Keywords
		const subKeywords = ['EXTERNAL_QUERY','_PARTITIONTIME','_TABLE_SUFFIX','REVOKE','GRANT','SCHEMA','DECLARE','BEGIN','CALL'];
		for (let i = 0; i < subKeywords.length; i++) {
			this.completionItems.push(
				{
					label: subKeywords[i],
					kind: vscode.CompletionItemKind.Property,
					documentation: 'Visual BigQuery - Sub Keywords'
				}
			)
		}

		// BigQuery Types
		const types = ['INT64','NUMERIC','BIGNUMERIC','FLOAT64','BOOL','STRING','BYTES','DATE','DATETIME','TIME','TIMESTAMP','ARRAY','STRUCT'];
		for (let i = 0; i < types.length; i++) {
			this.completionItems.push(
				{
					label: types[i],
					kind: vscode.CompletionItemKind.Field,
					documentation: 'Visual BigQuery - Types'
				}
			)
		}

		this.completionList = new vscode.CompletionList(this.completionItems, false);
	}
	
    provideCompletionItems(document, position, token) {
        return Promise.resolve(this.completionList);
    }
}

function activate(context) {
	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider(
			{ scheme: 'file', language: 'sql' },
			new SqlCompletionItemProvider(),
			'.'
		)
	);

}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}