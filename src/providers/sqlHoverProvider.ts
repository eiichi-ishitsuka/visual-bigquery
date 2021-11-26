import {
	Hover
} from 'vscode';


export class SqlHoverProvider {
	hoverData: any;
	constructor (hoverData: any) {
		this.hoverData = hoverData;
		console.log(this.hoverData);
	}

    provideHover(document: any, position: any, token: any) {
        let wordRange = document.getWordRangeAtPosition(position, /[a-zA-Z0-9_]+/);
        if (wordRange === undefined) return Promise.reject("no word here");

        let currentWord = document.lineAt(position.line).text.slice(wordRange.start.character, wordRange.end.character);
		
        return Promise.resolve(new Hover(this.hoverData[currentWord]));
    }
}

