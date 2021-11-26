import {
	languages,
	ExtensionContext
} from 'vscode';

import {ProviderData} from './providerData';
import {SqlHoverProvider} from './providers/sqlHoverProvider';
import {SqlCompletionItemProvider} from './providers/sqlCompletionItemProvider';



export function activate(context: ExtensionContext) {
	const MODE = { scheme: 'file', language: 'sql' };

	let providerData = new ProviderData();

	// Auto Complete Provider
	context.subscriptions.push(
		languages.registerCompletionItemProvider(
			MODE,
			new SqlCompletionItemProvider(providerData.completeData),
			'.'
		)
	);
	// Hover Provider
	context.subscriptions.push(
		languages.registerHoverProvider(
			MODE,
			new SqlHoverProvider(providerData.hoverData)
		)
	);

}

export function deactivate() {}
