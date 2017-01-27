import {bindAll} from 'lodash';

export default class HashNav {
	constructor({onHashChange}) {
		bindAll(
			this,
			'getHash_',
			'onHashChange_'
		);

		this.onHashChange = onHashChange;

		window.addEventListener('hashchange', this.onHashChange_, false);

		this.onHashChange(this.getHash_(window.location.href));
	}

	getHash_(url) {
		let retVal = '';

		const parser = document.createElement('a');

		parser.href = url;

		const {hash} = parser;

		if (hash) {
			retVal = hash.substring(1);
		}

		return retVal;
	}

	onHashChange_(event) {
		this.onHashChange(this.getHash_(event.newURL));
	}

	removeListener() {
		window.removeEventListener('hashchange', this.onHashChange_, false);
	}
}