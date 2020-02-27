import co from 'co';
import AvaTest from './_base-ava-test';
const {test, mockPath, nodePlop} = (new AvaTest(__filename));

let skeletal, dynamicPrompts;

test.before(() => {
	skeletal = nodePlop(`${mockPath}/bonefile.js`);
	dynamicPrompts = skeletal.getGenerator('dynamic-prompt');
});

test('If prompt is provided as a function, runPrompts() should call it', co.wrap(function* (t) {
	const result = yield dynamicPrompts.runPrompts();
	t.true(result.promptFunctionCalled);
}));

test('If prompt is provided as a function, runPrompts() should be called with inquirer instance', co.wrap(function* (t) {
	const result = yield dynamicPrompts.runPrompts();
	t.is(result.promptArgs[0], skeletal.inquirer);
}));

test('Prompt can be a function that syncronously returns answers', co.wrap(function* (t) {
	const dynPromptSync = skeletal.setGenerator('dynamic-prompt-sync', {
		prompts: () => ({ promptFunctionCalled: true })
	});
	const result = yield dynPromptSync.runPrompts();
	t.true(result.promptFunctionCalled);
}));
