import fs from 'fs';
import co from 'co';
import AvaTest from './_base-ava-test';
const {test, mockPath, testSrcPath, nodePlop} = (new AvaTest(__filename));

const skeletal = nodePlop(`${mockPath}/sub/bonefile.js`);

test('Force del outside cwd test', co.wrap(function* (t) {
	process.chdir(`${mockPath}/sub`);
	fs.mkdirSync(testSrcPath);
	fs.writeFileSync(testSrcPath + '/test.txt', 'init content');
	const testGen = skeletal.getGenerator('test');
	const {changes} = yield testGen.runActions();
	const content = fs.readFileSync(testSrcPath + '/test.txt', 'utf8');
	t.is(changes.length, 1);
	t.is(content, 'test content');
}));
