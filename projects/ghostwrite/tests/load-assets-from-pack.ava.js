import path from 'path';
import AvaTest from './_base-ava-test';
const {test, mockPath, nodePlop} = (new AvaTest(__filename));
const packModuleName = 'skeletal-pack-fancy-comments';
const bonefilePath = path.join(mockPath, 'bonefile.js');

/////
// test the various ways to import all or part of a node module
//

test('skeletal.load should use the default include definition set by the pack', function (t) {
	const skeletal = nodePlop();
	skeletal.load(packModuleName);

	t.true(skeletal.getHelperList().includes('js-multi-line-header'));
	t.is(skeletal.getGeneratorList().length, 0);
	t.true(skeletal.getHelperList().length > 0);
	t.is(skeletal.getPartialList().length, 0);
});

test('skeletal.load should include all generators by default', function (t) {
	const skeletal = nodePlop();
	skeletal.load([packModuleName], {prefix: 'html-'});

	t.true(skeletal.getHelperList().includes('html-multi-line-header'));
	t.is(skeletal.getGeneratorList().length, 0);
	t.true(skeletal.getHelperList().length > 0);
	t.is(skeletal.getPartialList().length, 0);
});

test('skeletal.load should work with mixed types (packs and files)', function (t) {
	const skeletal = nodePlop();
	skeletal.load([packModuleName, bonefilePath]);

	t.true(skeletal.getHelperList().includes('js-multi-line-header'));
	t.is(skeletal.getGeneratorList().length, 3);
	t.true(skeletal.getHelperList().length > 0);
	t.is(skeletal.getPartialList().length, 0);
});

test('skeletal.load should allow consumer to override config', function (t) {
	const skeletal = nodePlop();
	skeletal.load([packModuleName, bonefilePath], {prefix: 'test-'});

	t.true(skeletal.getHelperList().includes('test-multi-line-header'));
	t.true(skeletal.getGeneratorList().map(g => g.name).includes('test-generator1'));
	t.is(skeletal.getGeneratorList().length, 3);
	t.true(skeletal.getHelperList().length > 0);
	t.is(skeletal.getPartialList().length, 0);
});

test('skeletal.load should allow consumer to override include definition', function (t) {
	const skeletal = nodePlop();
	skeletal.load([packModuleName, bonefilePath], null, {helpers: true});

	t.is(skeletal.getGeneratorList().length, 0);
	t.true(skeletal.getHelperList().length > 0);
	t.true(skeletal.getHelperList().includes('js-multi-line-header'));
	t.is(skeletal.getPartialList().length, 0);
});
