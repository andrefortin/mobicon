'use strict';
const path = require('path');
const pathExists = require('path-exists');
const pify = require('pify');
const gm = require('gm');
const mkdir = require('mkdirp');
const execa = require('execa');
const mask = require('./lib/mask');
const androidIcons = require('android-icon-list');
const bb10Icons = require('bb10-icon-list');
const chromeIcons = require('chrome-icon-list');
const iosIcons = require('ios-icon-list');
const pwaIcons = require('pwa-icon-list');

const mkdirp = pify(mkdir);

const platformIcons = {
	android: androidIcons(),
	blackberry10: bb10Icons(),
	chrome: chromeIcons(),
	ios: iosIcons(),
	pwa: pwaIcons()
};

// See https://material.io/design/platform-guidance/android-icons.html#keyline-shapes
const platformRadius = new Map([
	['android', 0.0909],
	['chrome', 0.0909],
	['pwa', 0.0909]
]);

const calculateDimension = (imgSize, iconSize, options, resizeFn) => {
	let width;
	let height;

	if (imgSize.width > imgSize.height) {
		width = iconSize * options.contentRatio;
		height = imgSize.height / imgSize.width * width;
	} else {
		height = iconSize * options.contentRatio;
		width = imgSize.width / imgSize.height * height;
	}

	if (resizeFn === 'density') {
		// Calculate the dpi (= 72 * targetSize / srcSize)
		width = 72 * width / imgSize.width;
		height = 72 * height / imgSize.height;
	}

	return {width, height};
};

module.exports = (file, options) => {
	if (typeof file !== 'string' || !pathExists.sync(file)) {
		return Promise.reject(new TypeError('Expected a file.'));
	}

	options = Object.assign({
		platform: '',
		dest: process.cwd(),
		background: 'white',
		roundedCorners: platformRadius.has(options.platform),
		borderRadius: platformRadius.get(options.platform),
		contentRatio: 1
	}, options);

	if (options.platform === '') {
		return Promise.reject(new Error('Please provide a platform'));
	}

	const isFound = Object.keys(platformIcons).includes(options.platform.toLowerCase());
	if (!isFound) {
		return Promise.reject(new Error(`Platform ${options.platform} is not supported.`));
	}

	const icons = platformIcons[options.platform.toLowerCase()];
	const resizeFn = path.extname(file) === '.svg' ? 'density' : 'resize';

	const img = gm(file);

	return pify(img.identify.bind(img))()
		.then(identity => {
			const {size} = identity;

			return Promise.all(icons.map(icon => {
				const dest = path.join(options.dest, icon.file);
				const dimension = calculateDimension(size, icon.dimension, options, resizeFn);

				const image = gm(file)[resizeFn](dimension.width, dimension.height)
					.gravity('Center')
					.background(options.background)
					.extent(icon.dimension, icon.dimension);

				return mkdirp(path.dirname(dest))
					.then(() => pify(image.write.bind(image))(dest))
					.then(() => {
						if (options.roundedCorners) {
							return mask(icon.dimension, options.borderRadius)
								.then(maskLocation => {
									// Apply the mask and overwrite the original image
									return execa('gm', ['composite', '-compose', 'in', dest, maskLocation, dest]);
								});
						}
					});
			}));
		});
};
