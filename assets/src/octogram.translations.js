let cachedTranslations = {};

const AVAILABLE_LANGUAGES = [
	'en', 'it', 'id', 'es', 'pl', 'ru'
];

const TRANSLATIONS_REF = {
	LOADING: 'Loading...',

	HEADER_HOME: 'Home',
	HEADER_DOWNLOAD: 'Download',
	HEADER_DC_STATUS: 'DC Status',
	HEADER_SOURCE: 'Source',

	INTRODUCTION_DISCOVER_DESCRIPTION: 'Octogram is the enhanced Telegram client: more control, more tools, zero limits.',
	FOOTER_SITE_TITLE: 'Site pages',
	FOOTER_SITE_DC_STATUS: 'DC Status',
	FOOTER_SITE_CHANGELOG: 'Changelog',
	FOOTER_SITE_PRIVACYPOLICY: 'Privacy Policy',
	FOOTER_SITE_DCSTATUS_TERMS: 'DC Status Terms',
	FOOTER_GITHUB_TITLE: 'GitHub links',
	FOOTER_GITHUB_CLIENT_SOURCE: 'Client source',
	FOOTER_GITHUB_CLIENT_LICENSE: 'Client license',
	FOOTER_GITHUB_WEBSITE_SOURCE: 'Website source',
	FOOTER_GITHUB_WEBSITE_LICENSE: 'Website license',
	FOOTER_TELEGRAM_TITLE: 'Telegram links',
	FOOTER_TELEGRAM_NEWS: '[Channel] News',
	FOOTER_TELEGRAM_APKS: '[Channel] Apks',
	FOOTER_TELEGRAM_BETA_APKS: '[Channel] Beta Apks',
	FOOTER_TELEGRAM_SUPPORT: '[Group] Support',
	FOOTER_TEXT_1: 'Fork or edit this website',

	DCSTATUS_TITLE: 'Check the Telegram\'s DataCenter status in real time.',
	DCSTATUS_TITLE_PAGE: 'DC Status',
	DCSTATUS_BUTTON: 'Reload status',
	DCSTATUS_SERVER_TITLE: 'Current status',
	DCSTATUS_SERVER_DESCRIPTION: 'Next update in',
	DCSTATUS_SERVER_ADDRESS: 'IP Address',
	DCSTATUS_SERVER_STATUS_ONLINE: 'Available',
	DCSTATUS_SERVER_STATUS_CREATINGKEYS: 'Creating keys...',
	DCSTATUS_SERVER_STATUS_EXCHANGINGKEYS: 'Exchanging keys...',
	DCSTATUS_SERVER_STATUS_CONNECTING: 'Connecting...',
	DCSTATUS_SERVER_LAST_LAG: 'Last lag',
	DCSTATUS_SERVER_LAST_DOWNTIME: 'Last downtime',
	DCSTATUS_IDENTIFY_TITLE: 'Discover your datacenter',
	DCSTATUS_IDENTIFY_SELECT: 'Select your prefix',
	DCSTATUS_IDENTIFY_RAPID: 'Rapid suggestions',
	DCSTATUS_EXPORT: 'Export this status',
	DCSTATUS_EXPORT_BUTTON: 'Download file',
	DCSTATUS_EXPORT_ALERT: 'Data that are part of the export are subject to caching. The downloaded image may have different values than what is shown here.',
	DCSTATUS_EXPORT_ERROR: 'An internal error occurred. Try reloading the page.',

	CHANGELOG_TITLE: 'All latest beta and stable client versions.',
	CHANGELOG_TITLE_PAGE: 'Changelog',
	CHANGELOG_LOADING: 'Loading versions...',
	CHANGELOG_DOWNLOAD_BETA: 'BETA',
	CHANGELOG_DOWNLOAD_STATS: '{0} files, {1} downloads',
	CHANGELOG_DOWNLOAD_ARM32: 'For ARM32 devices',
	CHANGELOG_DOWNLOAD_ARM64: 'For ARM64 devices',
	CHANGELOG_DOWNLOAD_UNIVERSAL: 'Universal',
	CHANGELOG_DOWNLOAD_X86: 'For x86 devices',
	CHANGELOG_DOWNLOAD_X86_64: 'For x86_64 devices',
	CHANGELOG_DOWNLOAD_SUBTITLE: 'If you have doubts, you can also use Universal, which is valid for all devices.',
	CHANGELOG_DOWNLOAD_SUBTITLE_SUGGESTION: 'The {0} version should be the most suitable and stable one for your device.',
	CHANGELOG_DOWNLOAD_SELECT: 'Select your option',
	CHANGELOG_DOWNLOAD_BUTTON: 'Download',

	AI_TITLE: 'Now with AI',
	AI_FEAT_1: 'So many providers. Total freedom.',
	AI_FEAT_1_DESC: 'Access the power of Gemini, ChatGPT, and OpenRouter — all in one place, ready when you need them most.',
	AI_FEAT_2: 'Chat smarter with real context.',
	AI_FEAT_2_DESC: 'Automatically use past messages to boost replies. Use Ask on Media to get instant insights from photos, videos, and more.',
	AI_FEAT_3: 'Create your own AI. Unlimited possibilities.',
	AI_FEAT_3_DESC: 'Design fully customizable models with your own prompts. Tailor OctoGram AI to your unique style and needs.',

	FT_T: 'All the\n<b>customizations</b>\nyou like.',

	DOWNLOAD_TITLE: 'The experience begins',
	DOWNLOAD_DESCRIPTION: 'Download the Direct version to get direct updates from the OctoGram team.',
	DOWNLOAD_STORES: 'Check other app stores:',
	DOWNLOAD_AVAILABLE: 'Press to open',
	DOWNLOAD_UNAVAILABLE: 'Currently unavailable',
	DOWNLOAD_DIRECTLY: 'Press for Direct version',
	DOWNLOAD_OR: 'or',

	ERROR_TITLE: 'This page doesn\'t exist.',

	PRIVACYPOLICY_TITLE: 'Find out how we save and process your personal data',
	PRIVACYPOLICY_TITLE_DCSTATUS: 'Find out how we process datacenter status results',
	PRIVACYPOLICY_TITLE_PAGE: 'Privacy Policy',
	PRIVACYPOLICY_TITLE_PAGE_DCSTATUS: 'DC Status Terms',
	PRIVACYPOLICY_LOADING: 'Loading policy...',
};

function load() {
	return new Promise((resolve) => {
		const XML = new XMLHttpRequest();
		XML.open('GET', composeUrl(), true);
		XML.send();
		XML.addEventListener('readystatechange', (e) => {
			if (e.target.readyState === 4) {
				if (e.target.status === 200) {
					cachedTranslations = JSON.parse(e.target.responseText);
				}

				resolve();
			}
		});
	});
}

function getStringRef(name, ...args) {
	let string = TRANSLATIONS_REF[name];

	if (cachedTranslations[name]) {
		string = cachedTranslations[name];
	}

	if (args.length) {
		const isSortObject = args.some((e) => typeof e == 'object');
		if (isSortObject) {
			const splittedString = string.split('{');
			let temporaryString = '';

			for (const part of splittedString) {
				if (part[1] === '}' && !isNaN(parseInt(part[0]))) {
					const isElement = args[part[0]] instanceof HTMLElement;
					const repartSet = '<smali data-id="' + part[0] + '"></smali>';
					temporaryString += isElement && repartSet || args[part[0]];
					temporaryString += part.slice(2);
				} else {
					temporaryString += part;
				}
			}

			const newGeneratedElement = document.createElement('span');
			newGeneratedElement.classList.add('dynamic-translation');
			newGeneratedElement.innerHTML = temporaryString;
			for (const element of newGeneratedElement.childNodes) {
				if (element.tagName === 'SMALI' && element.dataset.id) {
					element.replaceWith(args[element.dataset.id]);
				}
			}

			return newGeneratedElement;
		} else {
			for (const [id, arg] of args.entries()) {
				string = string.replaceAll('{' + id + '}', arg);
			}
		}
	}

	return string;
}

function getTextNodeByStringRef(name, ...args) {
	const string = getStringRef(name, ...args);
	if (typeof string != 'undefined') {
		if (string instanceof Element && string.tagName === 'SPAN' && string.classList.contains('dynamic-translation')) {
			return string;
		} else {
			return document.createTextNode(string);
		}
	} else {
		return document.createDocumentFragment();
	}
}

function getLanguageCode() {
	if (typeof window.navigator.language != 'undefined') {
		for (const lang of window.navigator.language.split('-')) {
			if (AVAILABLE_LANGUAGES.includes(lang.toLowerCase())) {
				if (lang.toLowerCase() === 'es') {
					return 'es-ES';
				} else {
					return lang.toLowerCase();
				}
			}
		}
	}

	return 'en';
}

function composeUrl() {
	let url = 'https://raw.githubusercontent.com';
	url += '/OctoGramApp/assets/lang_packs';
	url += '/LanguageWebSite/';
	url += getLanguageCode();
	url += '.json?cache=';
	url += Math.random().toString();
	return url;
}

export {
	load,
	getStringRef,
	getTextNodeByStringRef
};
