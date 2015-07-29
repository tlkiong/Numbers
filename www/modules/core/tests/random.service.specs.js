describe("Numbers service test", function(){
	beforeEach(module('LokiJS'));
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
			expect(rs.length).not.toBe(0);
			expect(rs.length).toBe(4);
			done();
		});
		timeout.flush(1000);
	});
})