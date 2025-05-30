import {getStringRef} from "./octogram.translations.js";

let currentPageId;
let currentPageOnDestroyCallback;

function fixInjectionTags(text) {
	const VALID_TAGS = ['b', '/b', 'code', '/code', '/a'];
	const TAG_REPLACEMENTS = {
		'b': '<span class="bold">',
		'/b': '</span>',
		'code': '<span class="code">',
		'/code': '</span>'
	};

	if (text.indexOf('<') !== -1) {
		for(const [i, tag] of text.split('<').entries()) {
			if (i !== 0) {
				const realTag = tag.split('>')[0];
				const isLinkTag = realTag.startsWith('a href="https://') || realTag.startsWith("a href='https://");
				if (VALID_TAGS.includes(realTag.toLowerCase()) || isLinkTag) {
					const replacement = TAG_REPLACEMENTS[realTag.toLowerCase()];
					if (isLinkTag) {
						if (realTag.indexOf('target=') === -1) {
							text = text.replaceAll('<'+realTag+'>', '<'+realTag+' target="_blank">');
						}
					} else if (replacement){
						text = text.replaceAll('<'+realTag+'>', replacement);
					}
				} else {
					text = text.replaceAll('<'+realTag+'>', '');
				}
			}
		}
	}

	text = text.replaceAll('\n', '<br/>');
	text = text.replaceAll('\r', '');

	return text;
}

function parseCustomSelectMenu({
								   element,
								   availableOptions,
								   callback,
								   onOpenCallback,
								   description,
								   replyWithoutWaiting = false,
								   isBig = false,
								   useCallbackWhenForceClose = true
							   }) {
	let lastSelectedOption;
	let currentSelectedOption;

	if (isBig) {
		availableOptions.sort((a, b) => a.title[0].localeCompare(b.title[0]));
	}

	element.addEventListener('click', (e) => {
		if (typeof onOpenCallback != 'undefined') {
			try {
				onOpenCallback();
			} catch(_) {}
		}

		e.preventDefault();
		e.stopImmediatePropagation();
		let isClosing = false;
		let isOpening = true;

		function closeSelectMenu(selectedAnOption) {
			if (!isClosing && !isOpening) {
				isClosing = true;

				const sendCallback = useCallbackWhenForceClose || selectedAnOption;

				if (typeof lastSelectedOption != 'undefined' && replyWithoutWaiting && sendCallback) {
					try {
						callback(lastSelectedOption);
					} catch(_) {}
				}

				selectOverflow.classList.add('closing');
				selectOverflow.addEventListener('animationend', (e) => {
					if (e.target === selectOverflow || e.target === selectMenu) {
						selectOverflow.remove();

						if (typeof lastSelectedOption != 'undefined' && !replyWithoutWaiting && sendCallback) {
							try {
								callback(lastSelectedOption);
							} catch(_) {}
						}
					}
				});
			}
		}

		let lastInitLetter = '';
		let initLettersAssoc = {};

		const optionsFragment = document.createDocumentFragment();
		for(const [i, { id, title, description }] of Object.entries(availableOptions)) {
			if (isBig && lastInitLetter !== title[0].toUpperCase() && !initLettersAssoc[title[0].toUpperCase()]) {
				lastInitLetter = title[0].toUpperCase();

				const letterSeparator = document.createElement('div');
				letterSeparator.classList.add('letter-separator');
				letterSeparator.textContent = lastInitLetter;
				optionsFragment.append(letterSeparator);

				initLettersAssoc[lastInitLetter] = letterSeparator;
			}

			const radioOption = document.createElement('div');
			radioOption.classList.add('radio');
			radioOption.classList.toggle('selected', lastSelectedOption === id);

			const optionTitle = document.createElement('div');
			optionTitle.classList.add('optiontitle');
			optionTitle.textContent = title;

			const option = document.createElement('div');
			option.classList.add('option');
			option.addEventListener('click', () => {
				if (typeof currentSelectedOption != 'undefined') {
					currentSelectedOption.classList.remove('selected');
				}

				radioOption.classList.add('selected');
				currentSelectedOption = radioOption;
				lastSelectedOption = id;

				if (isBig) {
					closeSelectMenu(true);
				}
			});
			option.appendChild(radioOption);
			option.appendChild(optionTitle);

			if (!isBig) {
				option.style.setProperty('--id', String(parseInt(i) + 1));
			}

			if (lastSelectedOption === id) {
				radioOption.classList.add('selected');
				currentSelectedOption = radioOption;
			}

			if (description != null) {
				const optionDescription = document.createElement('div');
				optionDescription.classList.add('description');
				optionDescription.textContent = description;
				option.appendChild(optionDescription);
			}

			optionsFragment.append(option);
		}

		const selectAnimation = document.createElement('lottie-player');
		selectAnimation.classList.add('animation');
		selectAnimation.toggleAttribute('loop');
		selectAnimation.toggleAttribute('autoplay');
		selectAnimation.src = '/assets/animations/_073_GEEKBOT.json';

		const selectButton = document.createElement('div');
		selectButton.classList.add('button', 'big', 'accent');
		selectButton.addEventListener('click', () => closeSelectMenu(true));
		selectButton.textContent = 'Select';

		const hasDescription = typeof description == 'string';
		const selectMenuDescription = document.createElement('div');
		selectMenuDescription.classList.add('general-description');
		selectMenuDescription.textContent = description ?? '';

		const selectMenu = document.createElement('div');
		selectMenu.classList.add('select-menu');
		selectMenu.classList.toggle('is-big', isBig);
		selectMenu.addEventListener('click', (e) => {
			e.stopImmediatePropagation();
		});
		selectMenu.appendChild(selectAnimation);
		isBig && hasDescription && selectMenu.appendChild(selectMenuDescription);
		selectMenu.appendChild(optionsFragment);
		!isBig && selectMenu.appendChild(selectButton);
		!isBig && hasDescription && selectMenu.appendChild(selectMenuDescription);

		const selectOverflow = document.createElement('div');
		selectOverflow.classList.add('select-overflow');
		selectOverflow.addEventListener('click', () => closeSelectMenu(false));
		selectOverflow.addEventListener('animationend', () => {
			isOpening = false;
		}, { once: true });
		selectOverflow.appendChild(selectMenu);

		const page = document.querySelector('body > .page:not(.js-error)');
		if (page != null) {
			page.appendChild(selectOverflow);
			page.classList.add('has-select-overflow');
		}
	});
}

function parseApkName(name, small = false) {
	switch(name) {
		case 'OctoGram_arm32.apk':
			return small ? 'ARM32' : getStringRef('CHANGELOG_DOWNLOAD_ARM32');
		case 'OctoGram_arm64.apk':
			return small ? 'ARM64' : getStringRef('CHANGELOG_DOWNLOAD_ARM64');
		case 'OctoGram_universal.apk':
			return getStringRef('CHANGELOG_DOWNLOAD_UNIVERSAL');
		case 'OctoGram_x86.apk':
			return small ? 'X86' : getStringRef('CHANGELOG_DOWNLOAD_X86');
		case 'OctoGram_x86_64.apk':
			return small ? 'X86_64' : getStringRef('CHANGELOG_DOWNLOAD_X86_64');
		default:
			return name;
	}
}

function isAndroid() {
	return navigator.userAgent.toLowerCase().includes("android");
}

function tryToGetValidVersion(assetNames) {
	if (isAndroid()) {
		// TRY TO DETECT ABI FROM USERAGENT
		// maybe it works on some cringe browsers

		const supportsX64 = navigator.userAgent.includes("x86_64") || navigator.userAgent.includes("x64");
		const supportsX86 = navigator.userAgent.includes("x86");
		const supportsARM64 = navigator.userAgent.includes("aarch64") || navigator.userAgent.includes("arm64");
		const supportsARM32 = navigator.userAgent.includes("armv7");

		for(const name of assetNames) {
			if (name === 'OctoGram_arm32.apk' && supportsARM32) {
				return parseApkName(name, true);
			} else if (name === 'OctoGram_arm64.apk' && supportsARM64) {
				return parseApkName(name, true);
			} else if (name === 'OctoGram_x86.apk' && supportsX86) {
				return parseApkName(name, true);
			} else if (name === 'OctoGram_x86_64.apk' && supportsX64) {
				return parseApkName(name, true);
			}
		}
	}
}

function calculateSize(size, useBinaryUnits = true, addSpace = false) {
	const binaryUnits = ['B', 'KiB', 'MiB', 'GiB', 'TiB'];
	const basicUnits = ['B', 'KB', 'MB', 'GB', 'TB'];
	const units = useBinaryUnits ? binaryUnits : basicUnits;
	const divisorParam = useBinaryUnits ? 1024 : 1000;

	let divisionCounter = 0;
	let currentDivisor = size;
	while(currentDivisor >= divisorParam && divisionCounter < 4){
		divisionCounter++;
		currentDivisor /= divisorParam;
	}

	let finalString = '';
	finalString += currentDivisor.toFixed(1);
	finalString += addSpace ? ' ' : '';
	finalString += units[divisionCounter];
	return finalString;
}

function getEmojiByIso2(isoString) {
	const codePoint = [...isoString.toUpperCase()].map(char => char.charCodeAt(0) + 127397);
	return String.fromCodePoint(...codePoint);
}

function formatDate(timestamp, format) {
	const date = new Date(timestamp * 1000);

	if (!format) {
		format = 'YY-mm-dd HH:ii:ss';
		if (canUseItalianFormat()) {
			format = 'dd/mm/YY HH:ii:ss';
		}
	}

	let finalString = format;
	finalString = finalString.replace('dd', formatDateUnit(date.getDate()));
	finalString = finalString.replace('mm', formatDateUnit(date.getMonth()+1));
	finalString = finalString.replace('YY', formatDateUnit(date.getFullYear()));
	finalString = finalString.replace('HH', formatDateUnit(date.getHours()));
	finalString = finalString.replace('ii', formatDateUnit(date.getMinutes()));
	finalString = finalString.replace('ss', formatDateUnit(date.getSeconds()));

	return finalString;
}

function canUseItalianFormat() {
	return (
		typeof window.navigator?.language != 'undefined'
		&& window.navigator.language.indexOf('it') !== -1
	);
}

function formatDateUnit(unit) {
	if (unit.toString().length === 1) {
		return '0'+unit;
	} else {
		return unit;
	}
}

function clearPage(pageId, onDestroyCallback) {
	if (typeof currentPageOnDestroyCallback != 'undefined') {
		try {
			currentPageOnDestroyCallback();
		} catch(e) {}
	}

	if (document.body.querySelector('.splash')) {
		const children = document.body.childNodes;
		for (const child of children) {
			if (!child || !child.classList || !child.classList.contains('splash')) {
				child.remove();
			}
		}
	} else {
		document.body.innerHTML = '';
	}
	currentPageId = pageId;
	currentPageOnDestroyCallback = onDestroyCallback;
}

function generateRandomEncrScript(length, addTag = false) {
	const dictionary = [...'0123456789qwertyuiopasdfghjklzxcvbnm!?/\a`~+*=@#$%'];
	let finalString = '';
	for(let i = 0; i < length; i++) {
		finalString += dictionary[Math.floor(Math.random() * dictionary.length)];
	}
	if (addTag) {
		return '<span class="encry">' + finalString + '</span>';
	} else {
		return finalString;
	}
}

function generateWaveGradient(fill, useSvg2 = false) {
	const svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg1.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	svg1.setAttribute('viewBox', '0 0 1440 320');
	svg1.classList.add('btm-1');

	const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path1.setAttribute('fill', fill);
	path1.setAttribute('fill-opacity', '1');
	path1.setAttribute('d', 'M0,32L40,48C80,64,160,96,240,90.7C320,85,400,43,480,69.3C560,96,640,192,720,224C800,256,880,224,960,202.7C1040,181,1120,171,1200,186.7C1280,203,1360,245,1400,266.7L1440,288L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z');
	svg1.appendChild(path1);

	if (useSvg2) {
		path1.setAttribute('d', 'M0,224L40,234.7C80,245,160,267,240,250.7C320,235,400,181,480,149.3C560,117,640,107,720,112C800,117,880,139,960,170.7C1040,203,1120,245,1200,224C1280,203,1360,117,1400,74.7L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z');
	}

	return svg1;
}

export {
	currentPageId,
	fixInjectionTags,
	parseCustomSelectMenu,
	parseApkName,
	isAndroid,
	tryToGetValidVersion,
	calculateSize,
	getEmojiByIso2,
	formatDate,
	clearPage,
	generateRandomEncrScript,
	generateWaveGradient
};