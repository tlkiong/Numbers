describe("Numbers service test", function(){
	beforeEach(module('LokiJS'));
	beforeEach(module('Menu'));
	beforeEach(module('Unlimited'));
	beforeEach(module('Core'));
	beforeEach(inject(function(_common_){

	}));

	var randomService, timeout;

	beforeEach(inject(function (_randomService_, $timeout){
		timeout = $timeout;
		randomService = _randomService_;
	}))

	it('can get an instance of randomService', function(){
		expect(randomService).toBeDefined();
	})

	it('getRandomNumberAsString returns a string with length = 4', function(done){
		randomService.getRandomNumberAsString().then(function(rs){
			expect(rs.one).not.toBe(0);
			expect(rs.two).not.toBe(0);
			expect(rs.three).not.toBe(0);
			expect(rs.four).not.toBe(0);

			expect(rs.one).not.toBe(null);
			expect(rs.two).not.toBe(null);
			expect(rs.three).not.toBe(null);
			expect(rs.four).not.toBe(null);
			done();
		});
		timeout.flush(1000);
	});


});