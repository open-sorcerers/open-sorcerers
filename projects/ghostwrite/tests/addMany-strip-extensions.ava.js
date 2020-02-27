import fs from 'fs';
import path from 'path';
import AvaTest from './_base-ava-test';

const { test, mockPath, testSrcPath, nodePlop } = (new AvaTest(__filename));

const skeletal = nodePlop(`${mockPath}/bonefile.js`);
const multipleAdds = skeletal.getGenerator('add-many-strip-extensions');
var multipleAddsResult;

test.before(() => {
	return multipleAdds.runActions({ name: 'John Doe' }).then(function (res) {
		multipleAddsResult = res;
	});
});

test('Check that all files generated without hbs extension', t => {
	const expectedFiles = [
		'remove-hbs/john-doe-my-view.js',
		'remove-hbs/john-doe-my-view.spec.js',
	];
	expectedFiles.map((file) => {
		const filePath = path.resolve(testSrcPath, file);
		t.true(fs.existsSync(filePath), `Can't resolve ${filePath}`);
	});
});

test('Check that all files generated with all extensions removed', t => {
	const expectedFiles = [
		'remove-all/my-view.spec',
		'remove-all/my-view.spec.js',
	];
	expectedFiles.map((file) => {
		const filePath = path.resolve(testSrcPath, file);
		t.true(fs.existsSync(filePath), `Can't resolve ${filePath}`);
	});
});
