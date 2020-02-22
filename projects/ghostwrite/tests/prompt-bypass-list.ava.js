import AvaTest from './_base-ava-test';
import promptBypass from '../lib/prompt-bypass';

const {test, nodePlop} = (new AvaTest(__filename));
const skeletal = nodePlop();

const prompts = [{
	type:'list',
	name:'list', message:'listMsg',
	choices: [
		'eh',
		{key: 'b', value:'bee'},
		{name: 'c', value: 'see'},
		{value: 'd'},
		{name: 'e'}
	]
}];

test('verify good bypass input', function (t) {
	const [, byValue] = promptBypass(prompts, ['eh'], skeletal);
	t.is(byValue.list, 'eh');

	const [, byKey] = promptBypass(prompts, ['b'], skeletal);
	t.is(byKey.list, 'bee');

	const [, byName] = promptBypass(prompts, ['c'], skeletal);
	t.is(byName.list, 'see');

	const [, byValueProp] = promptBypass(prompts, ['d'], skeletal);
	t.is(byValueProp.list, 'd');

	const [, byNameNoValue] = promptBypass(prompts, ['e'], skeletal);
	t.is(byNameNoValue.list, 'e');

	const [, byIndexValue] = promptBypass(prompts, ['0'], skeletal);
	t.is(byIndexValue.list, 'eh');

	const [, byIndexKey] = promptBypass(prompts, ['1'], skeletal);
	t.is(byIndexKey.list, 'bee');

	const [, byIndexName] = promptBypass(prompts, ['2'], skeletal);
	t.is(byIndexName.list, 'see');

	const [, byIndexValueProp] = promptBypass(prompts, ['3'], skeletal);
	t.is(byIndexValueProp.list, 'd');

	const [, byIndexNameNoValue] = promptBypass(prompts, ['4'], skeletal);
	t.is(byIndexNameNoValue.list, 'e');

	const [, byIndexNumber] = promptBypass(prompts, [4], skeletal);
	t.is(byIndexNumber.list, 'e');
});

test('verify bad bypass input', function (t) {
	t.throws(() => promptBypass(prompts, ['asdf'], skeletal));
	t.throws(() => promptBypass(prompts, ['5'], skeletal));
});
