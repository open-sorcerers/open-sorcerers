import fs from 'fs';
import path from 'path';
import co from 'co';
import AvaTest from './_base-ava-test';
const {test, mockPath, testSrcPath, nodePlop} = new AvaTest(__filename);

const skeletal = nodePlop(`${mockPath}/bonefile.js`);
const makeList = skeletal.getGenerator('make-list');
const appendToList = skeletal.getGenerator('append-to-list');

test('Check if entry will be appended', co.wrap(function* (t) {
	yield makeList.runActions({listName: 'test'});
	yield appendToList.runActions({listName: 'test', name: 'Marco'});
	yield appendToList.runActions({listName: 'test', name: 'Polo'});
	const filePath = path.resolve(testSrcPath, 'test.txt');
	const content = fs.readFileSync(filePath).toString();

	t.is(content, 'Marco\nPolo');
}));
