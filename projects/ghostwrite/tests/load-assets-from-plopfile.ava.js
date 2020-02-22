// import fs from 'fs';
// import co from 'co';
import path from 'path';
import AvaTest from './_base-ava-test';
const {test, mockPath, nodePlop} = (new AvaTest(__filename));
const bonefilePath = path.join(mockPath, 'bonefile.js');

/////
// test the various ways to import all or part of a bonefile
//
test('skeletal.load should include all generators by default', function (t) {
	const skeletal = nodePlop();
	skeletal.load(bonefilePath);

	t.is(skeletal.getGeneratorList().length, 3);
	t.is(skeletal.getHelperList().length, 0);
	t.is(skeletal.getPartialList().length, 0);
});

test('skeletal.load should be able to include a subset of generators', function (t) {
	const skeletal = nodePlop();
	skeletal.load(bonefilePath, {}, {generators: ['generator1']});

	t.is(skeletal.getGeneratorList().length, 1);
	t.is(skeletal.getGeneratorList()[0].name, 'generator1');
	t.is(skeletal.getHelperList().length, 0);
	t.is(skeletal.getPartialList().length, 0);
});

test('skeletal.load last in wins', function (t) {
	const skeletal = nodePlop();

	skeletal.setGenerator('generator1', { description: 'local' });
	t.is(skeletal.getGenerator('generator1').description, 'local');

	skeletal.load(bonefilePath, {}, {generators: ['generator1']});

	t.is(skeletal.getGeneratorList().length, 1);
	t.is(skeletal.getGeneratorList()[0].name, 'generator1');
	t.is(skeletal.getGenerator('generator1').description, undefined);
});

test('skeletal.load can rename loaded assets', function (t) {
	const skeletal = nodePlop();

	skeletal.setGenerator('generator1', { description: 'local' });
	t.is(skeletal.getGenerator('generator1').description, 'local');

	skeletal.load(bonefilePath, {}, {
		generators: {
			'generator1':'gen1',
			'generator3':'bob',
		}
	});

	const gNameList = skeletal.getGeneratorList().map(g => g.name);
	t.is(gNameList.length, 3);
	t.true(gNameList.includes('generator1'));
	t.is(skeletal.getGenerator('generator1').description, 'local');
	t.true(gNameList.includes('gen1'));
	t.is(skeletal.getGenerator('gen1').description, undefined);
	t.true(gNameList.includes('bob'));
});

test('skeletal.load passes a config object that can be used to change the bonefile output', function (t) {
	const skeletal = nodePlop();
	skeletal.load(bonefilePath, {prefix: 'test-'}, {
		generators: true,
		helpers: true,
		partials: true,
		actionTypes: true
	});

	const gNameList = skeletal.getGeneratorList().map(g => g.name);
	t.is(gNameList.length, 3);
	t.is(skeletal.getHelperList().length, 3);
	t.is(skeletal.getPartialList().length, 3);
	t.is(skeletal.getActionTypeList().length, 1);
	t.true(gNameList.includes('test-generator1'));
	t.true(skeletal.getHelperList().includes('test-helper2'));
	t.true(skeletal.getPartialList().includes('test-partial3'));
	t.true(skeletal.getActionTypeList().includes('test-actionType1'));
});

test('skeletal.load should import functioning assets', function (t) {
	const skeletal = nodePlop();
	skeletal.load(bonefilePath, {prefix: 'test-'}, {
		generators: true,
		helpers: true,
		partials: true,
		actionTypes: true
	});

	t.is(skeletal.getHelper('test-helper2')('test'), 'helper 2: test');
	t.is(skeletal.getPartial('test-partial3'), 'partial 3: {{name}}');
	t.is(skeletal.getActionType('test-actionType1')(), 'test');
});

test('skeletal.load can include only helpers', function (t) {
	const skeletal = nodePlop();
	skeletal.load(bonefilePath, null, { helpers: true });

	const gNameList = skeletal.getGeneratorList().map(g => g.name);
	t.is(gNameList.length, 0);
	t.is(skeletal.getHelperList().length, 3);
	t.is(skeletal.getPartialList().length, 0);
});

test('skeletal.load can include only certain helpers', function (t) {
	const skeletal = nodePlop();
	skeletal.load(bonefilePath, null, { helpers: ['helper1'] });
	t.is(skeletal.getHelperList().length, 1);
	t.is(skeletal.getHelperList()[0], 'helper1');
});

test('skeletal.load can include and rename helpers', function (t) {
	const skeletal = nodePlop();
	skeletal.load(bonefilePath, null, { helpers: {'helper1': 'h1'} });
	t.is(skeletal.getHelperList().length, 1);
	t.is(skeletal.getHelperList()[0], 'h1');
});

test('skeletal.load can include only partials', function (t) {
	const skeletal = nodePlop();
	skeletal.load(bonefilePath, null, { partials: true });

	const gNameList = skeletal.getGeneratorList().map(g => g.name);
	t.is(gNameList.length, 0);
	t.is(skeletal.getHelperList().length, 0);
	t.is(skeletal.getPartialList().length, 3);
});

test('skeletal.load can include only certain partials', function (t) {
	const skeletal = nodePlop();
	skeletal.load(bonefilePath, null, { partials: ['partial1'] });
	t.is(skeletal.getPartialList().length, 1);
	t.is(skeletal.getPartialList()[0], 'partial1');
});

test('skeletal.load can include and rename partials', function (t) {
	const skeletal = nodePlop();
	skeletal.load(bonefilePath, null, { partials: {'partial1': 'p1'} });
	t.is(skeletal.getPartialList().length, 1);
	t.is(skeletal.getPartialList()[0], 'p1');
});
