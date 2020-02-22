import fs from 'fs';
import co from 'co';
import AvaTest from './_base-ava-test';
const { test, mockPath, testSrcPath, nodePlop } = new AvaTest(__filename);

const skeletal = nodePlop();

if (process.platform !== 'win32') {
	test(
		'Add action keeps the executable flag',
		co.wrap(function*(t) {
			skeletal.setGenerator('addExecutable', {
				actions: [
					{
						type: 'add',
						path: `${testSrcPath}/added.sh`,
						templateFile: `${mockPath}/bone-templates/add.sh`
					}
				]
			});

			yield skeletal.getGenerator('addExecutable').runActions();
			const destStats = fs.statSync(`${testSrcPath}/added.sh`);
			t.is(destStats.mode & fs.constants.S_IXUSR, fs.constants.S_IXUSR);
		})
	);
} else {
	test.skip(
		'[Windows] Add action keeps the executable flag',
		co.wrap(function*(t) {
			skeletal.setGenerator('addExecutable', {
				actions: [
					{
						type: 'add',
						path: `${testSrcPath}/added.sh`,
						templateFile: `${mockPath}/bone-templates/add.sh`
					}
				]
			});

			yield skeletal.getGenerator('addExecutable').runActions();
			const destStats = fs.statSync(`${testSrcPath}/added.sh`);
			// t.is(destStats.mode & fs.constants.S_IXUSR, fs.constants.S_IXUSR);
		})
	);
}
