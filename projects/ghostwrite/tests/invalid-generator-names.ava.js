import AvaTest from './_base-ava-test';
const {test, nodePlop} = (new AvaTest(__filename));

const skeletal = nodePlop();

test('Invalid generator names test', function (t) {
	skeletal.setGenerator('test');
	const error = t.throws(() => skeletal.getGenerator('error'), Error);
	t.is(error.message, 'Generator "error" does not exist.');
});
