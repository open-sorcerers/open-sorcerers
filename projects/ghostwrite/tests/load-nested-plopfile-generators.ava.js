import fs from 'fs';
import co from 'co';
import path from 'path';
import AvaTest from './_base-ava-test';
const {test, mockPath, testSrcPath, nodePlop} = (new AvaTest(__filename));

const skeletal = nodePlop(`${mockPath}/bonefile.js`);

/////
// if an action has no path, the action should fail
//

test('nested generator should add file to main directory', co.wrap(function* (t) {
	const filePath = path.resolve(testSrcPath, 'nested-nestman.txt');
	const generator = skeletal.getGenerator('basic-nested');
	t.is(typeof generator.runPrompts, 'function');
	t.is(typeof generator.runActions, 'function');
	t.is(generator.name, 'basic-nested');

	const results = yield generator.runActions({name: 'Nestman'});
	t.is(results.changes.length, 1);
	t.is(results.failures.length, 0);
	t.true(fs.existsSync(filePath));
}));

test('nested generator should not override existing helpers', co.wrap(function* (t) {
	const filePath = path.resolve(testSrcPath, 'addman.txt');
	const generator = skeletal.getGenerator('basic-add');
	t.is(typeof generator.runPrompts, 'function');
	t.is(typeof generator.runActions, 'function');
	t.is(generator.name, 'basic-add');

	const results = yield generator.runActions({name: 'Addman'}).then();
	t.is(results.changes.length, 1);
	t.is(results.failures.length, 0);
	t.true(fs.existsSync(filePath));
}));
