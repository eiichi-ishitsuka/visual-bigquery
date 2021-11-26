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
		// check function range
        let wordRange = document.getWordRangeAtPosition(position, /(^|[^#]\s+)[a-zA-Z0-9_]+\(/);
		// get word
        let word = document.getWordRangeAtPosition(position, /[a-zA-Z0-9_]+/);
        if (wordRange === undefined) return Promise.reject("no word here");
        let currentWord = document.lineAt(position.line).text.slice(word.start.character, word.end.character);
		
        return Promise.resolve(new Hover(this.hoverData[currentWord]));
    }
}

