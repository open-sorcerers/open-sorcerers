module.exports = function (skeletal) {
	skeletal.setGenerator('test', {
		actions: [{
			type: 'add',
			path: '../src/test.txt',
			template: 'test content',
			force: true
		}]
	});
};
