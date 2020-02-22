import fs from 'fs';
import co from 'co';
import path from 'path';
import AvaTest from './_base-ava-test';
const {test, mockPath, testSrcPath, nodePlop} = (new AvaTest(__filename));

const skeletal = nodePlop();

/////
//
//

test('Add action does not fail on binary file', co.wrap(function* (t) {
	skeletal.setGenerator('addBinary', {
		actions: [{
			type: 'add',
			path: `${testSrcPath}/{{dashCase name}}-skeletal-logo.png`,
			templateFile: `${mockPath}/skeletal-logo.png`
		}]
	});

	const filePath = path.resolve(testSrcPath, 'test-skeletal-logo.png');
	yield skeletal.getGenerator('addBinary').runActions({name: 'test'});
	t.true(fs.existsSync(filePath));
}));
