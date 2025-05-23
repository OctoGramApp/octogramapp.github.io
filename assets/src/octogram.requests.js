let doesLoadViaUserContentWork = true;

function initRequest(fileName, repoName = 'OctoGramApp/assets') {
	return new Promise((resolve, reject) => {
		tryToLoadWithUserContent(repoName, fileName).then(resolve).catch(() => {
			doesLoadViaUserContentWork = false;
			tryToLoadWithApi(repoName, fileName).then(resolve).catch(reject);
		});
	});
}

function tryToLoadWithUserContent(repoName, fileName) {
	if (!doesLoadViaUserContentWork) {
		return Promise.reject('Ignoring githubusercontent as it isnt available');
	} else {
		return new Promise((resolve, reject) => {
			const XML = new XMLHttpRequest();
			XML.timeout = 3500;
			XML.open('GET', 'https://raw.githubusercontent.com/' + repoName + '/master/' + fileName, true);
			XML.send();
			XML.addEventListener('readystatechange', (e) => {
				if (e.target.readyState === 4) {
					if (e.target.status === 200) {
						resolve(e.target.response);
					} else {
						reject('Unable to resolve domain via githubusercontent');
					}
				}
			});
		});
	}
}

function tryToLoadWithApi(repoName, fileName) {
	return new Promise((resolve, reject) => {
		const XML = new XMLHttpRequest();
		XML.open('GET', 'https://api.github.com/repos/' + repoName + '/contents/' + fileName, true);
		XML.send();
		XML.addEventListener('readystatechange', (e) => {
			if (e.target.readyState === 4) {
				if (e.target.status === 200) {
					const response = JSON.parse(e.target.responseText);
					if (typeof response['content'] === 'string' && response['content'].length > 0) {
						resolve(atob(response['content']));
					} else {
						reject('Failed to parse github api response');
					}
				} else {
					reject('Failed to get data from github api');
				}
			}
		});
	});
}

export {
	initRequest,
};