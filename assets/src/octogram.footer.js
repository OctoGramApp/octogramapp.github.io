import * as utils from "./octogram.utils.js";
import {getStringRef} from "./octogram.translations.js";
import * as privacyPolicy from "./octogram.privacy.js";
import * as changelog from "./octogram.changelog.js";
import * as dcStatus from "./octogram.dcstatus.js";
import {generateWaveGradient} from "./octogram.utils.js";

let currentExpandedCategory;

function createElement() {
	currentExpandedCategory = undefined;

	const linksContainer = document.createElement('div');
	linksContainer.classList.add('links');
	appendLinkContainer(linksContainer, 'site');
	//appendLinkContainer(linksContainer, 'github');
	appendLinkContainer(linksContainer, 'telegram');

	const footerTextFork = document.createElement('a');
	footerTextFork.href = 'https://github.com/OctoGramApp/octogramapp.github.io/fork';
	footerTextFork.target = '_blank';
	footerTextFork.textContent = getStringRef('FOOTER_TEXT_1');
	const footerText = document.createElement('div');
	footerText.classList.add('text');
	footerText.textContent = 'Octogram © 2023-' + new Date().getFullYear().toString() + ' - ';
	footerText.appendChild(footerTextFork);

	const footerContainer = document.createElement('div');
	footerContainer.classList.add('footer', 'big');
	footerContainer.appendChild(generateWaveGradient('#12062a'));
	footerContainer.appendChild(linksContainer);
	footerContainer.appendChild(footerText);

	return footerContainer;
}

function appendLinkContainer(container, id) {
	const singleLinkContainer = document.createElement('div');
	singleLinkContainer.addEventListener('click', () => {
		if (typeof currentExpandedCategory != 'undefined') {
			currentExpandedCategory.classList.remove('expanded');
		}

		singleLinkContainer.classList.add('expanded');
		currentExpandedCategory = singleLinkContainer;
	});
	singleLinkContainer.classList.add('single-link-container');

	switch (id) {
		case 'site': {
			singleLinkContainer.appendChild(generateContainerTitle(
				getStringRef('FOOTER_SITE_TITLE')
			));
			singleLinkContainer.appendChild(generateSingleLink({
				text: getStringRef('FOOTER_SITE_DC_STATUS'),
				onClick: () => {
					if (utils.currentPageId !== dcStatus.id) {
						dcStatus.init();
					}
				}
			}));
			singleLinkContainer.appendChild(generateSingleLink({
				text: getStringRef('FOOTER_SITE_CHANGELOG'),
				onClick: () => {
					if (utils.currentPageId !== changelog.id) {
						changelog.init();
					}
				}
			}));
			singleLinkContainer.appendChild(generateSingleLink({
				text: getStringRef('FOOTER_SITE_PRIVACYPOLICY'),
				onClick: () => {
					if (utils.currentPageId !== privacyPolicy.id) {
						privacyPolicy.init();
					}
				}
			}));
			singleLinkContainer.appendChild(generateSingleLink({
				text: getStringRef('FOOTER_SITE_DCSTATUS_TERMS'),
				onClick: () => {
					if (utils.currentPageId !== privacyPolicy.id) {
						privacyPolicy.init(true);
					}
				}
			}));
			break;
		}
		/*case 'github': {
			singleLinkContainer.appendChild(generateContainerTitle(
				getStringRef('FOOTER_GITHUB_TITLE')
			));
			singleLinkContainer.appendChild(generateSingleLink({
				text: getStringRef('FOOTER_GITHUB_CLIENT_SOURCE'),
				url: 'https://github.com/OctoGramApp/OctoGram',
				openOnBlank: true
			}));
			singleLinkContainer.appendChild(generateSingleLink({
				text: getStringRef('FOOTER_GITHUB_CLIENT_LICENSE'),
				url: 'https://github.com/OctoGramApp/OctoGram/blob/main/LICENSE',
				openOnBlank: true
			}));
			singleLinkContainer.appendChild(generateSingleLink({
				text: getStringRef('FOOTER_GITHUB_WEBSITE_SOURCE'),
				url: 'https://github.com/OctoGramApp/octogramapp.github.io',
				openOnBlank: true
			}));
			singleLinkContainer.appendChild(generateSingleLink({
				text: getStringRef('FOOTER_GITHUB_WEBSITE_LICENSE'),
				url: 'https://github.com/OctoGramApp/octogramapp.github.io/blob/main/LICENSE',
				openOnBlank: true
			}));
			break;
		}*/
		case 'telegram': {
			singleLinkContainer.appendChild(generateContainerTitle(
				getStringRef('FOOTER_TELEGRAM_TITLE')
			));
			singleLinkContainer.appendChild(generateSingleLink({
				text: getStringRef('FOOTER_TELEGRAM_NEWS'),
				url: 'tg://resolve?domain=OctoGramApp'
			}));
			singleLinkContainer.appendChild(generateSingleLink({
				text: getStringRef('FOOTER_TELEGRAM_APKS'),
				url: 'tg://resolve?domain=OctoGramApks'
			}));
			singleLinkContainer.appendChild(generateSingleLink({
				text: getStringRef('FOOTER_TELEGRAM_BETA_APKS'),
				url: 'tg://resolve?domain=OctoGramBeta'
			}));
			singleLinkContainer.appendChild(generateSingleLink({
				text: getStringRef('FOOTER_TELEGRAM_SUPPORT'),
				url: 'tg://resolve?domain=OctoGramChat'
			}));
			break;
		}
	}

	container.appendChild(singleLinkContainer);
}

function generateContainerTitle(text) {
	const linkTitleChevron = document.createElement('img');
	linkTitleChevron.classList.add('expand');
	linkTitleChevron.src = '/assets/icons/chevrondown.svg';
	const linkTitle = document.createElement('div');
	linkTitle.classList.add('link-title');
	linkTitle.appendChild(document.createTextNode(text));
	linkTitle.appendChild(linkTitleChevron);
	return linkTitle;
}

function generateSingleLink({
								text,
								onClick,
								url,
								openOnBlank = false
							}) {
	const linkArrowRight = document.createElement('img');
	linkArrowRight.classList.add('icon');
	linkArrowRight.src = '/assets/icons/arrowright.svg';
	const linkText = document.createElement('div');
	linkText.classList.add('text');
	linkText.textContent = text;
	const linkElement = document.createElement('a');
	linkElement.classList.add('link');
	linkElement.appendChild(linkArrowRight);
	linkElement.appendChild(linkText);

	if (onClick) {
		linkElement.addEventListener('click', onClick);
	} else if (url) {
		linkElement.href = url;
		if (openOnBlank) {
			linkElement.target = '_blank';
		}
	}

	return linkElement;
}

export {
	createElement,
};