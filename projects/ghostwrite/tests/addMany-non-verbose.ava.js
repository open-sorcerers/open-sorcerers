import fs from 'fs';
import co from 'co';
import path from 'path';
import AvaTest from './_base-ava-test';
const { test, mockPath, testSrcPath, nodePlop } = (new AvaTest(__filename));

const skeletal = nodePlop(`${mockPath}/bonefile.js`);

test('Check that all files have been created', co.wrap(function* (t) {
	const multipleAddsResult = yield (
		skeletal.getGenerator('multiple-adds').runActions({ name: 'John Doe' })
	);

	const expectedFiles = [
		'john-doe/add.txt',
		'john-doe/another-add.txt',
		'john-doe/nested-folder/a-nested-add.txt',
		'john-doe/nested-folder/another-nested-add.txt',
		'john-doe/nested-folder/my-name-is-john-doe.txt'
	];

	expectedFiles.forEach((file) => {
		const filePath = path.resolve(testSrcPath, file);
		t.true(fs.existsSync(filePath), `Can't resolve ${filePath}`);
	});

	// has the summary line
	t.true(multipleAddsResult.changes[0].path.includes('5 files added'));
	// does not have additional lines
	t.false(multipleAddsResult.changes[0].path.includes('\n'));
}));
