import co from 'co';
import AvaTest from './_base-ava-test';
const { test, testSrcPath, nodePlop } = new AvaTest(__filename);
import { normalizePath } from '../src/actions/_common-action-utils';

const skeletal = nodePlop();

// Make sure that props added by the action's data attr are cleaned up
// after the action executes

test(
	'Action data cleanup',
	co.wrap(function*(t) {
		const actions = ['one', 'two', 'three'].map(fName => ({
			type: 'add',
			template: '',
			path: `${testSrcPath}/{{fName}}-{{unchanged}}.txt`,
			data: { fName, unchanged: `${fName}-unchanged` }
		}));
		const g = skeletal.setGenerator('', { actions });
		const { changes, failures } = yield g.runActions({ unchanged: 'unchanged' });
		const addedFiles = changes
			.map(c =>
				normalizePath(c.path)
					.split('/')
					.slice(-1)
			)
			.join('|');
		t.is(addedFiles, 'one-unchanged.txt|two-unchanged.txt|three-unchanged.txt');
		t.is(changes.length, 3);
		t.is(failures.length, 0);
	})
);
