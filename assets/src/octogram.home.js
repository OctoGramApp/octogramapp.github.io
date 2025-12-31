import {calculateSize, clearPage, fixInjectionTags, generateWaveGradient} from "./octogram.utils.js";
import * as header from "./octogram.header.js";
import {getStringRef} from "./octogram.translations.js";
import * as footer from "./octogram.footer.js";
import * as changelog from "./octogram.changelog.js";
import * as privacyPolicy from "./octogram.privacy.js";

const id = 'homePage';

let precachedResponse;
let downloadContent;
let downloadFiles;

let particlesWorker;
let particlesCanvas;
let particlesOnResizeTimeout;

let killedStarsAnimation = false;
let downloadsViewElement;

function init() {
	clearPage(id, () => destroy());
	window.scrollTo(0, 0);
	document.title = 'OctoGram';
	history.pushState(null, document.title, '/');

	killedStarsAnimation = false;

	const pageContainer = document.createElement('div');
	pageContainer.classList.add('page');
	pageContainer.appendChild(header.createElement({
		isHomePage: true
	}));
	pageContainer.appendChild(generateIntroduction());
	pageContainer.appendChild(generateAiFeatures());
	pageContainer.appendChild(generateFeatures());
	pageContainer.appendChild(downloadsViewElement = generateDownload());
	pageContainer.appendChild(footer.createElement());

	document.body.appendChild(pageContainer);
	
	loadVersions();
	
	if (!particlesWorker) {
		particlesWorker = new Worker('/assets/lib/particles-worker.js', { type: 'module' });
	}
	
	window.addEventListener('resize', onResize);
	
	const canvasBoundingRect = particlesCanvas.getBoundingClientRect();
	particlesCanvas.width = canvasBoundingRect.width;
	particlesCanvas.height = canvasBoundingRect.height;
	
	const offscreen = particlesCanvas.transferControlToOffscreen();
	particlesWorker.postMessage({ canvas: offscreen }, [offscreen]);
}

function destroy() {
	if (particlesWorker) {
		particlesWorker.postMessage({ canvas: false });
	}
	if (particlesOnResizeTimeout) {
		clearTimeout(particlesOnResizeTimeout);
		particlesOnResizeTimeout = null;
	}
	window.removeEventListener('resize', onResize);
	particlesCanvas = undefined;
}

function onResize() {
	if (particlesWorker) {
		if (particlesOnResizeTimeout) {
			clearTimeout(particlesOnResizeTimeout);
		}

		particlesWorker.postMessage({ canvas: false });
		
		particlesOnResizeTimeout = setTimeout(() => {
			const canvasBoundingRect = particlesCanvas.getBoundingClientRect();
			particlesWorker.postMessage({ resize: true, width: canvasBoundingRect.width, height: canvasBoundingRect.height });
		}, 300);
	}
}

function generateIntroduction() {
	const appBanner = document.createElement('div');
	appBanner.classList.add('app-banner');
	const canvas = document.createElement('canvas');
	appBanner.appendChild(canvas);
	particlesCanvas = canvas;
	const appLogo = document.createElement('div');
	appLogo.classList.add('app-logo');
	const img = document.createElement('img');
	img.src = '/assets/icons/applogo.svg';
	appLogo.appendChild(img);
	appBanner.appendChild(appLogo);

	const appName = document.createElement('div');
	appName.className = 'app-name';
	appName.textContent = 'OctoGram';

	const appDescription = document.createElement('div');
	appDescription.className = 'app-description';
	appDescription.textContent = getStringRef('INTRODUCTION_DISCOVER_DESCRIPTION');

	const actions = document.createElement('div');
	actions.className = 'actions';

	const links = [
		{ id: 1, text: getStringRef('PRIVACYPOLICY_TITLE_PAGE') },
		{ id: 2, text: getStringRef('FOOTER_SITE_CHANGELOG') },
		{ id: 3, text: getStringRef('HEADER_DOWNLOAD') },
	];

	links.forEach(linkData => {
		const link = document.createElement('a');
		link.classList.add('button', 'has-background');
		link.style.setProperty('--id', linkData.id);
		link.addEventListener('click', () => {
			if (linkData.id === 1) {
				privacyPolicy.init();
			} else if (linkData.id === 2) {
				changelog.init();
			} else if (linkData.id === 3) {
				downloadsViewElement.scrollIntoView({ behavior: 'smooth' });
			}
		});
		link.textContent = linkData.text;
		actions.appendChild(link);
	});

	const background = document.createElement('div');
	background.classList.add('background');
	initBackground(background);

	const introductionContent = document.createElement('div');
	introductionContent.classList.add('content');
	introductionContent.appendChild(appBanner);
	introductionContent.appendChild(appName);
	introductionContent.appendChild(appDescription);
	introductionContent.appendChild(actions);

	const introduction = document.createElement('div');
	introduction.classList.add('introduction');
	introduction.appendChild(background);
	introduction.appendChild(introductionContent);

	return introduction;
}

function generateAiFeatures() {
	const lampIcon = document.createElement('lottie-player');
	lampIcon.toggleAttribute('loop');
	lampIcon.toggleAttribute('autoplay');
	lampIcon.src = '/assets/animations/_0-1_SPARKS.json';
	const messageTitle = document.createElement('div');
	messageTitle.classList.add('title');
	messageTitle.textContent = getStringRef('AI_TITLE');
	messageTitle.appendChild(lampIcon);
	
	const featuresList = document.createElement('div');
	featuresList.classList.add('features-list');
	featuresList.appendChild(createFeature(getStringRef('AI_FEAT_1'), getStringRef('AI_FEAT_1_DESC'), 'ManyProvidersFeat1.png'));
	featuresList.appendChild(createFeature(getStringRef('AI_FEAT_2'), getStringRef('AI_FEAT_2_DESC'), 'ChatContextFeat2.png'));
	featuresList.appendChild(createFeature(getStringRef('AI_FEAT_3'), getStringRef('AI_FEAT_3_DESC'), 'CustomModelsFeat3.png', true));
	
	const featuresContainer = document.createElement('div');
	featuresContainer.classList.add('features-container');
	featuresContainer.appendChild(messageTitle);
	featuresContainer.appendChild(featuresList);
	
	const features = document.createElement('div');
	features.classList.add('features');
	features.appendChild(featuresContainer);
	
	return features;
}

function createFeature(title, description, image, fromBottom = false) {
	const featureTitle = document.createElement('div');
	featureTitle.classList.add('feature-title');
	featureTitle.textContent = title;
	
	const featureDescription = document.createElement('div');
	featureDescription.classList.add('feature-description');
	featureDescription.textContent = description;
	
	const shadow = document.createElement('div');
	shadow.classList.add('shadow');
	const realImage = document.createElement('img');
	realImage.classList.add('real-image');
	realImage.src = '/assets/images/'+image;
	const deviceFrame = document.createElement('img');
	deviceFrame.classList.add('frame');
	deviceFrame.src = '/assets/images/DeviceFrameTelegram.Android.svg';
	const featureImage = document.createElement('div');
	featureImage.classList.add('feature-image');
	featureImage.appendChild(shadow);
	featureImage.appendChild(realImage);
	featureImage.appendChild(deviceFrame);
	
	const feature = document.createElement('div');
	feature.classList.add('feature');
	feature.classList.toggle('from-bottom', fromBottom);
	feature.appendChild(featureTitle);
	feature.appendChild(featureDescription);
	feature.appendChild(featureImage);
	
	return feature;
}

function generateFeatures() {
	const background = document.createElement('div');
	background.classList.add('background');
	
	const leftPartSticker = document.createElement('lottie-player');
	leftPartSticker.toggleAttribute('autoplay');
	leftPartSticker.toggleAttribute('loop');
	leftPartSticker.src = '/assets/animations/_027_BG_red_OUT.json';
	const leftPartTitle = document.createElement('div');
	leftPartTitle.classList.add('title');
	leftPartTitle.innerHTML = fixInjectionTags(getStringRef('FT_T'));
	const leftPart = document.createElement('div');
	leftPart.classList.add('left-part');
	leftPart.appendChild(leftPartSticker);
	leftPart.appendChild(leftPartTitle);
	
	const rightPart = document.createElement('div');
	rightPart.classList.add('right-part');
	rightPart.appendChild(createDeviceWithMockup('AppearanceGen1.png'));
	rightPart.appendChild(createDeviceWithMockup('AppearanceGen2.png'));
	rightPart.appendChild(createDeviceWithMockup('AppearanceGen3.png'));
	
	const featuresContent = document.createElement('div');
	featuresContent.classList.add('content', 'customization-style');
	featuresContent.appendChild(leftPart);
	featuresContent.appendChild(rightPart);

	const separator = document.createElement('div');
	separator.classList.add('wavy-underline');
	separator.textContent = 'octo'.repeat(15);

	const privacyContentSticker = document.createElement('lottie-player');
	privacyContentSticker.toggleAttribute('autoplay');
	privacyContentSticker.toggleAttribute('loop');
	privacyContentSticker.src = '/assets/animations/_112_CODE_OUT.json';
	const privacyContentTitleContent = document.createElement('div');
	privacyContentTitleContent.classList.add('title');
	privacyContentTitleContent.innerHTML = fixInjectionTags(getStringRef('PRIVACY_GLANCE'));
	const privacyContentTitle = document.createElement('div');
	privacyContentTitle.classList.add('top-part');
	privacyContentTitle.appendChild(privacyContentSticker);
	privacyContentTitle.appendChild(privacyContentTitleContent);
	
	const privacyContentViews = document.createElement('div');
	privacyContentViews.classList.add('privacy-views');
	privacyContentViews.appendChild(generatePrivacyContentPreviewWithGlance(
		'PrivacyView1.png',
		['PrivacyView1Glance1.png', 'PrivacyView1Glance2.png'],
		true
	));
	privacyContentViews.appendChild(generatePrivacyContentPreviewWithGlance(
		'PrivacyView2.png',
		['PrivacyView2Glance1.png', 'PrivacyView2Glance2.png', 'PrivacyView1Glance1.png', 'PrivacyView1Glance2.png'],
		false
	));

	const privacyContent = document.createElement('div');
	privacyContent.classList.add('privacy-content');
	privacyContent.appendChild(privacyContentTitle);
	privacyContent.appendChild(privacyContentViews);
	
	const upperWaves = document.createElement('div');
	upperWaves.classList.add('waves');
	initBackground(upperWaves);
	
	const features = document.createElement('div');
	features.classList.add('features-standard');
	features.appendChild(background);
	features.appendChild(featuresContent);
	features.appendChild(separator);
	features.appendChild(privacyContent);
	features.appendChild(upperWaves);
	
	return features;
}

function generatePrivacyContentPreviewWithGlance(image, glanceViewsList, mustRemoveOnSmallScreens) {
	const mainImage = document.createElement('img');
	mainImage.classList.add('main-image');
	mainImage.src = '/assets/images/'+image;
	const shadow = document.createElement('div');
	shadow.classList.add('shadow');

	const glanceViews = document.createElement('div');
	glanceViews.classList.add('glance-views');
	let i = 0;
	for (const image of glanceViewsList) {
		const glanceImage = document.createElement('img');
		glanceImage.classList.add('view');
		glanceImage.classList.toggle('on-small', i >= 2);
		glanceImage.dataset.i = i;
		glanceImage.src = '/assets/images/'+image;
		glanceViews.appendChild(glanceImage);
		i++;
	}

	const singlePrivacyPreview = document.createElement('div');
	singlePrivacyPreview.classList.add('single-privacy-preview');
	singlePrivacyPreview.classList.toggle('hide-on-small', mustRemoveOnSmallScreens);
	singlePrivacyPreview.appendChild(mainImage);
	singlePrivacyPreview.appendChild(shadow);
	singlePrivacyPreview.appendChild(glanceViews);

	return singlePrivacyPreview;
}

function createDeviceWithMockup(image) {
	const shadow = document.createElement('div');
	shadow.classList.add('shadow');
	const realImage = document.createElement('img');
	realImage.classList.add('real-image');
	realImage.src = '/assets/images/'+image;
	const featureImage = document.createElement('div');
	featureImage.classList.add('device-image');
	featureImage.appendChild(shadow);
	featureImage.appendChild(realImage);
	return featureImage;
}

function initBackground(background) {
	background.appendChild(generateWaveGradient('#0f031e', false));

	const second = generateWaveGradient('#0f031e', true);
	second.classList.remove('btm-1');
	second.classList.add('top-1');
	background.appendChild(second);
}

function generateDownload() {
	const stickerImage = document.createElement('lottie-player');
	stickerImage.toggleAttribute('loop');
	stickerImage.toggleAttribute('autoplay');
	stickerImage.src = '/assets/animations/_070_TELEMAG_OUT.json';
	const messageTitle = document.createElement('div');
	messageTitle.classList.add('title');
	messageTitle.textContent = getStringRef('DOWNLOAD_TITLE');
	const messageDescription = document.createElement('div');
	messageDescription.classList.add('description');
	messageDescription.textContent = getStringRef('DOWNLOAD_DESCRIPTION');
	const message = document.createElement('div');
	message.classList.add('message');
	message.appendChild(stickerImage);
	message.appendChild(messageTitle);
	message.appendChild(messageDescription);

	const files = document.createElement('a');
	files.classList.add('files');
	files.addEventListener('click', () => changelog.init());

	const separator = document.createElement('div');
	separator.classList.add('separator');
	separator.style.setProperty('--text', '"'+getStringRef('DOWNLOAD_OR')+'"');

	const stores = document.createElement('div');
	stores.classList.add('stores');
	appendStores(stores);

	const rightPart = document.createElement('div');
	rightPart.classList.add('right');
	rightPart.appendChild(files);
	rightPart.appendChild(separator);
	rightPart.appendChild(stores);

	const content = document.createElement('div');
	content.classList.add('content', 'unavailable-apk');
	content.appendChild(message);
	content.appendChild(rightPart);

	const downloadContainer = document.createElement('div');
	downloadContainer.classList.add('download');
	downloadContainer.appendChild(content);

	downloadContent = content;
	downloadFiles = files;

	return downloadContainer;
}

function appendStores(stores) {
	stores.appendChild(generateStore({
		iconUrl: '/assets/stores/apkpure.png',
		id: 'apkpure',
		href: '/apkpure'
	}));
	stores.appendChild(generateStore({
		iconUrl: '/assets/stores/playstore.png',
		id: 'playstore',
		href: '/playstore'
	}));
}

function generateStore({
							 iconUrl,
							 id,
							 href,
							 isUnavailable = false
						 }) {
	const storeIconElement = document.createElement('img');
	storeIconElement.src = iconUrl;
	const storeIconContainer = document.createElement('div');
	storeIconContainer.classList.add('icon', 'need-border');
	storeIconContainer.appendChild(storeIconElement);

	let store;
	if (isUnavailable) {
		store = document.createElement('div');
		store.classList.add('unavailable');

		const storeDescription = document.createElement('div');
		storeDescription.classList.add('description');
		storeDescription.textContent = getStringRef('DOWNLOAD_UNAVAILABLE');

		const container = document.createElement('div');
		container.classList.add('container');
		container.appendChild(storeDescription);

		store.appendChild(container);
	} else {
		store = document.createElement('a');
		store.href = href;
		store.target = '_blank';

		const animatedIconContainer = document.createElement('div');
		animatedIconContainer.classList.add('access-icon');
		animatedIconContainer.appendChild(storeIconContainer.cloneNode(true));

		const continueContainer = document.createElement('div');
		continueContainer.classList.add('continue');
		continueContainer.textContent = getStringRef('DOWNLOAD_AVAILABLE');

		store.appendChild(animatedIconContainer);
		store.appendChild(continueContainer);
	}

	store.classList.add('store');
	store.dataset.id = id;
	store.prepend(storeIconContainer);

	return store;
}

function loadVersions() {
	if (typeof precachedResponse != 'undefined') {
		loadVersionsWithResponse(precachedResponse);
	} else {
		const XML = new XMLHttpRequest();
		XML.open('GET', 'https://api.github.com/repos/OctoGramApp/OctoGram/releases?cache='+Math.random().toString(), true);
		XML.send();
		XML.addEventListener('readystatechange', (e) => {
			if (e.target.readyState === 4 && e.target.status === 200) {
				const response = JSON.parse(e.target.responseText);

				if (response.length > 0) {
					precachedResponse = response;
					loadVersionsWithResponse(response);
				}
			}
		});
	}
}

function loadVersionsWithResponse(response) {
	let selectedRelease = response[0];
	if (selectedRelease['prerelease']) {
		for(const release of response) {
			if (!release['prerelease']) {
				selectedRelease = release;
				break;
			}
		}
	}

	let sizeSum = 0;
	for(const asset of selectedRelease['assets']) {
		sizeSum += asset['size'];
	}
	sizeSum /= selectedRelease['assets'].length;

	const fileIcon = document.createElement('img');
	fileIcon.classList.add('icon');
	fileIcon.src = '/assets/icons/file.svg';
	const fileSize = document.createElement('div');
	fileSize.classList.add('size');
	fileSize.innerHTML = calculateSize(sizeSum, true, true).replaceAll(' ', '<br/>');
	const fileIconContainer = document.createElement('div');
	fileIconContainer.classList.add('file-icon-container');
	fileIconContainer.appendChild(fileIcon);
	fileIconContainer.appendChild(fileSize);

	const rightContainerTitle = document.createElement('div');
	rightContainerTitle.classList.add('title');
	rightContainerTitle.textContent = selectedRelease['name'];
	const rightContainerDescription = document.createElement('div');
	rightContainerDescription.classList.add('description');
	rightContainerDescription.textContent = getStringRef('DOWNLOAD_DIRECTLY');
	const rightContainer = document.createElement('div');
	rightContainer.classList.add('right-container');
	rightContainer.appendChild(rightContainerTitle);
	rightContainer.appendChild(rightContainerDescription);

	downloadContent.classList.remove('unavailable-apk');
	downloadFiles.appendChild(fileIconContainer);
	downloadFiles.appendChild(rightContainer);
}

export {
	id,
	init,
};