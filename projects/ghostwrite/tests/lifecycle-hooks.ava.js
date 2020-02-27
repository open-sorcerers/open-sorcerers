import co from 'co';
import AvaTest from './_base-ava-test';
const {test, testSrcPath, nodePlop} = (new AvaTest(__filename));

const errAction = () => {throw Error('');};

// onSuccess and onFailure Lifecycle hooks
test('Lifecycle hooks test (onSuccess, onFailure)', co.wrap(function* (t) {
	const skeletal = nodePlop();
	const onSuccess = () => onSuccess.called++; onSuccess.called = 0;
	const onFailure = () => onFailure.called++; onFailure.called = 0;

	yield skeletal
		.setGenerator('', {actions: [() => 'yes', errAction]})
		.runActions({}, {onSuccess, onFailure});

	t.is(onSuccess.called, 1);
	t.is(onFailure.called, 1);
}));

test('Lifecycle hooks negative scenario test (onSuccess)', co.wrap(function* (t) {
	const skeletal = nodePlop();
	const onSuccess = () => onSuccess.called++; onSuccess.called = 0;
	const onFailure = () => onFailure.called++; onFailure.called = 0;

	yield skeletal
		.setGenerator('', {actions: [errAction, errAction]})
		.runActions({}, {onSuccess, onFailure});

	t.is(onSuccess.called, 0);
	t.is(onFailure.called, 2);
}));

test('Lifecycle hooks negative scenario test (onFailure)', co.wrap(function* (t) {
	const skeletal = nodePlop();
	const onSuccess = () => onSuccess.called++; onSuccess.called = 0;
	const onFailure = () => onFailure.called++; onFailure.called = 0;

	yield skeletal
		.setGenerator('', {actions: [() => 'yes', () => 'yes']})
		.runActions({}, {onSuccess, onFailure});

	t.is(onSuccess.called, 2);
	t.is(onFailure.called, 0);
}));

test('Lifecycle hook test (onComment)', co.wrap(function* (t) {
	const skeletal = nodePlop();
	const onSuccess = () => onSuccess.called++; onSuccess.called = 0;
	const onFailure = () => onFailure.called++; onFailure.called = 0;
	const onComment = () => onComment.called++; onComment.called = 0;

	yield skeletal
		.setGenerator('', {actions: ['yes', () => 'yes', errAction, 'yes']})
		.runActions({}, {onSuccess, onFailure, onComment});

	t.is(onSuccess.called, 1);
	t.is(onFailure.called, 1);
	t.is(onComment.called, 1);
}));
