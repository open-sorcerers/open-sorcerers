import fs from 'fs';
import co from 'co';
import path from 'path';
import AvaTest from './_base-ava-test';
const {test, testSrcPath, nodePlop} = (new AvaTest(__filename));

const skeletal = nodePlop();

const baseAction = { type: 'add', template: '{{name}}', path: `${testSrcPath}/{{name}}.txt` };
const actionAdd = skeletal.setGenerator('add-action', {
	actions: [baseAction]
});
const actionAddWithSkip = skeletal.setGenerator('add-action-skip-exists-true', {
	actions: [Object.assign({}, baseAction, {skipIfExists: true})]
});

test('Check that the file is created', co.wrap(function*(t) {
	const filePath = path.resolve(testSrcPath, 'test1.txt');
	const result = yield actionAdd.runActions({name: 'test1'});
	t.is(result.changes.length, 1);
	t.is(result.failures.length, 0);
	t.true(fs.existsSync(filePath));
}));

test('If run twice, should fail due to file already exists', co.wrap(function*(t){
	const filePath = path.resolve(testSrcPath, 'test2.txt');
	// add the test file
	const result = yield actionAdd.runActions({name: 'test2'});
	t.is(result.changes.length, 1);
	t.is(result.failures.length, 0);
	t.true(fs.existsSync(filePath));
	// try to add it again
	const result2 = yield actionAdd.runActions({name: 'test2'});
	t.is(result2.changes.length, 0);
	t.is(result2.failures.length, 1);
	t.true(fs.existsSync(filePath));
}));

test('If skipIfExists is true, it should not fail', co.wrap(function*(t){
	const filePath = path.resolve(testSrcPath, 'test3.txt');
	// add the test file
	const result = yield actionAdd.runActions({name: 'test3'});
	t.is(result.changes.length, 1);
	t.is(result.failures.length, 0);
	t.true(fs.existsSync(filePath));
	// try to add it again
	const result2 = yield actionAddWithSkip.runActions({name: 'test3'});
	t.is(result2.changes.length, 1);
	t.is(result2.failures.length, 0);
	t.true(fs.existsSync(filePath));
}));
