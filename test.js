const path = require('path');
const fs = require('fs');
const pathExists = require('path-exists');
const tempfile = require('tempfile');
const gm = require('gm');
const pify = require('pify');
const parsePNG = require('parse-png');
const fn = require('./index');

describe('android platform', () => {
	test('android - png input', async () => {
		const tempFile = tempfile();
		await fn('fixtures/icon.png', { platform: 'android', dest: tempFile });

		const doesFileExist = await Promise.all([
			pathExists(path.join(tempFile, 'mipmap-ldpi/icon.png')),
			pathExists(path.join(tempFile, 'mipmap-mdpi/icon.png')),
			pathExists(path.join(tempFile, 'mipmap-hdpi/icon.png')),
			pathExists(path.join(tempFile, 'mipmap-xhdpi/icon.png')),
			pathExists(path.join(tempFile, 'mipmap-xxhdpi/icon.png')),
			pathExists(path.join(tempFile, 'mipmap-xxxhdpi/icon.png')),
		]);
		let doesExist = true;
		doesFileExist.map(item => {
			if (!item) {
				doesExist = false;
			}
		});

		expect(doesExist).toBe(true);
	});

	test('android - svg input', async () => {
		const tempFile = tempfile();
		await fn('fixtures/icon.svg', { platform: 'android', dest: tempFile });

		const doesFileExist = await Promise.all([
			pathExists(path.join(tempFile, 'mipmap-ldpi/icon.png')),
			pathExists(path.join(tempFile, 'mipmap-mdpi/icon.png')),
			pathExists(path.join(tempFile, 'mipmap-hdpi/icon.png')),
			pathExists(path.join(tempFile, 'mipmap-xhdpi/icon.png')),
			pathExists(path.join(tempFile, 'mipmap-xxhdpi/icon.png')),
			pathExists(path.join(tempFile, 'mipmap-xxxhdpi/icon.png')),
		]);
		let doesExist = true;
		doesFileExist.map(item => {
			if (!item) {
				doesExist = false;
			}
		});

		expect(doesExist).toBe(true);
	});
});

describe('blackberry10 platform', () => {
	test('blackberry10 - png input', async () => {
		const tempFile = tempfile();
		await fn('fixtures/icon.png', { platform: 'blackberry10', dest: tempFile });

		const doesFileExist = await Promise.all([
			pathExists(path.join(tempFile, 'icon-90.png')),
			pathExists(path.join(tempFile, 'icon-96.png')),
			pathExists(path.join(tempFile, 'icon-110.png')),
			pathExists(path.join(tempFile, 'icon-144.png')),
		]);
		let doesExist = true;
		doesFileExist.map(item => {
			if (!item) {
				doesExist = false;
			}
		});

		expect(doesExist).toBe(true);
	});

	test('blackberry10 - svg input', async () => {
		const tempFile = tempfile();
		await fn('fixtures/icon.svg', { platform: 'blackberry10', dest: tempFile });

		const doesFileExist = await Promise.all([
			pathExists(path.join(tempFile, 'icon-90.png')),
			pathExists(path.join(tempFile, 'icon-96.png')),
			pathExists(path.join(tempFile, 'icon-110.png')),
			pathExists(path.join(tempFile, 'icon-144.png')),
		]);
		let doesExist = true;
		doesFileExist.map(item => {
			if (!item) {
				doesExist = false;
			}
		});

		expect(doesExist).toBe(true);
	});
});

describe('chrome platform', () => {
	test('chrome - png input', async () => {
		const tempFile = tempfile();
		await fn('fixtures/icon.png', { platform: 'chrome', dest: tempFile });

		const doesFileExist = await Promise.all([
			pathExists(path.join(tempFile, 'icon-16.png')),
			pathExists(path.join(tempFile, 'icon-32.png')),
			pathExists(path.join(tempFile, 'icon-48.png')),
			pathExists(path.join(tempFile, 'icon-128.png')),
		]);
		let doesExist = true;
		doesFileExist.map(item => {
			if (!item) {
				doesExist = false;
			}
		});

		expect(doesExist).toBe(true);
	});

	test('chrome - svg input', async () => {
		const tempFile = tempfile();
		await fn('fixtures/icon.svg', { platform: 'chrome', dest: tempFile });

		const doesFileExist = await Promise.all([
			pathExists(path.join(tempFile, 'icon-16.png')),
			pathExists(path.join(tempFile, 'icon-32.png')),
			pathExists(path.join(tempFile, 'icon-48.png')),
			pathExists(path.join(tempFile, 'icon-128.png')),
		]);
		let doesExist = true;
		doesFileExist.map(item => {
			if (!item) {
				doesExist = false;
			}
		});

		expect(doesExist).toBe(true);
	});
});

describe('ios platform', () => {
	test('ios - png input', async () => {
		const tempFile = tempfile();
		await fn('fixtures/icon.png', { platform: 'ios', dest: tempFile });

		const doesFileExist = await Promise.all([
			pathExists(path.join(tempFile, 'icon.png')),
			pathExists(path.join(tempFile, 'icon@2x.png')),
			pathExists(path.join(tempFile, 'icon-20.png')),
			pathExists(path.join(tempFile, 'icon-40.png')),
			pathExists(path.join(tempFile, 'icon-40@2x.png')),
			pathExists(path.join(tempFile, 'icon-40@3x.png')),
			pathExists(path.join(tempFile, 'icon-1024.png')),
			pathExists(path.join(tempFile, 'icon-50.png')),
			pathExists(path.join(tempFile, 'icon-50@2x.png')),
			pathExists(path.join(tempFile, 'icon-60.png')),
			pathExists(path.join(tempFile, 'icon-60@2x.png')),
			pathExists(path.join(tempFile, 'icon-60@3x.png')),
			pathExists(path.join(tempFile, 'icon-72.png')),
			pathExists(path.join(tempFile, 'icon-72@2x.png')),
			pathExists(path.join(tempFile, 'icon-76.png')),
			pathExists(path.join(tempFile, 'icon-76@2x.png')),
			pathExists(path.join(tempFile, 'icon-83.5@2x.png')),
			pathExists(path.join(tempFile, 'icon-small.png')),
			pathExists(path.join(tempFile, 'icon-small@2x.png')),
			pathExists(path.join(tempFile, 'icon-small@3x.png')),
		]);
		let doesExist = true;
		doesFileExist.map(item => {
			if (!item) {
				doesExist = false;
			}
		});

		expect(doesExist).toBe(true);
	});

	test('ios - svg input', async () => {
		const tempFile = tempfile();
		await fn('fixtures/icon.svg', { platform: 'ios', dest: tempFile });

		const doesFileExist = await Promise.all([
			pathExists(path.join(tempFile, 'icon.png')),
			pathExists(path.join(tempFile, 'icon@2x.png')),
			pathExists(path.join(tempFile, 'icon-20.png')),
			pathExists(path.join(tempFile, 'icon-40.png')),
			pathExists(path.join(tempFile, 'icon-40@2x.png')),
			pathExists(path.join(tempFile, 'icon-40@3x.png')),
			pathExists(path.join(tempFile, 'icon-1024.png')),
			pathExists(path.join(tempFile, 'icon-50.png')),
			pathExists(path.join(tempFile, 'icon-50@2x.png')),
			pathExists(path.join(tempFile, 'icon-60.png')),
			pathExists(path.join(tempFile, 'icon-60@2x.png')),
			pathExists(path.join(tempFile, 'icon-60@3x.png')),
			pathExists(path.join(tempFile, 'icon-72.png')),
			pathExists(path.join(tempFile, 'icon-72@2x.png')),
			pathExists(path.join(tempFile, 'icon-76.png')),
			pathExists(path.join(tempFile, 'icon-76@2x.png')),
			pathExists(path.join(tempFile, 'icon-83.5@2x.png')),
			pathExists(path.join(tempFile, 'icon-small.png')),
			pathExists(path.join(tempFile, 'icon-small@2x.png')),
			pathExists(path.join(tempFile, 'icon-small@3x.png')),
		]);
		let doesExist = true;
		doesFileExist.map(item => {
			if (!item) {
				doesExist = false;
			}
		});

		expect(doesExist).toBe(true);
	});
});

describe('pwa platform', () => {
	test('pwa - png input', async () => {
		const tempFile = tempfile();
		await fn('fixtures/icon.png', { platform: 'pwa', dest: tempFile });

		const doesFileExist = await Promise.all([
			pathExists(path.join(tempFile, 'icon-72x72.png')),
			pathExists(path.join(tempFile, 'icon-96x96.png')),
			pathExists(path.join(tempFile, 'icon-128x128.png')),
			pathExists(path.join(tempFile, 'icon-144x144.png')),
			pathExists(path.join(tempFile, 'icon-152x152.png')),
			pathExists(path.join(tempFile, 'icon-192x192.png')),
			pathExists(path.join(tempFile, 'icon-384x384.png')),
			pathExists(path.join(tempFile, 'icon-512x512.png')),
		]);
		let doesExist = true;
		doesFileExist.map(item => {
			if (!item) {
				doesExist = false;
			}
		});

		expect(doesExist).toBe(true);
	});

	test('pwa - svg input', async () => {
		const tempFile = tempfile();
		await fn('fixtures/icon.svg', { platform: 'pwa', dest: tempFile });

		const doesFileExist = await Promise.all([
			pathExists(path.join(tempFile, 'icon-72x72.png')),
			pathExists(path.join(tempFile, 'icon-96x96.png')),
			pathExists(path.join(tempFile, 'icon-128x128.png')),
			pathExists(path.join(tempFile, 'icon-144x144.png')),
			pathExists(path.join(tempFile, 'icon-152x152.png')),
			pathExists(path.join(tempFile, 'icon-192x192.png')),
			pathExists(path.join(tempFile, 'icon-384x384.png')),
			pathExists(path.join(tempFile, 'icon-512x512.png')),
		]);
		let doesExist = true;
		doesFileExist.map(item => {
			if (!item) {
				doesExist = false;
			}
		});

		expect(doesExist).toBe(true);
	});
});

describe('image output size', () => {
	test('output size: 40 - ios - icon-40.png', async () => {
		const tempFile = tempfile();
		await fn('fixtures/icon.png', { platform: 'ios', dest: tempFile });

		const image = gm(path.join(tempFile, 'icon-40.png'));
		const { width, height } = await pify(image.size.bind(image))();

		expect(width).toBe(40);
		expect(height).toBe(40);
	});

	test('output size: 40 - ios - icon-40.svg', async () => {
		const tempFile = tempfile();
		await fn('fixtures/icon.png', { platform: 'ios', dest: tempFile });

		const image = gm(path.join(tempFile, 'icon-40.png'));
		const { width, height } = await pify(image.size.bind(image))();

		expect(width).toBe(40);
		expect(height).toBe(40);
	});
});

describe('transparent corners', () => {
	test('pwa - icon-72x72.png', async () => {
		const tempFile = tempfile();
		await fn('fixtures/icon.svg', { platform: 'pwa', dest: tempFile, roundedCorners: true });

		const { data } = await parsePNG(fs.readFileSync(path.join(tempFile, 'icon-72x72.png')));

		// Check the first pixel
		expect(data[0]).toBe(0); // R
		expect(data[1]).toBe(0); // G
		expect(data[2]).toBe(0); // B
		expect(data[3]).toBe(0); // A
	});
});
