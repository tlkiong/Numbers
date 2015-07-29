describe("Numbers service test", function(){
	beforeEach(module('LokiJS'));
	beforeEach(module('Core'));
	beforeEach(inject(function(_common_){

	}));

	var numberService, timeout;

	beforeEach(inject(function (_numberService_, $timeout){
		timeout = $timeout;
		numberService = _numberService_;
	}))

	it('can get an instance of numberService', function(){
		expect(numberService).toBeDefined();
	})

	it('getRandomNumberAsString returns a string with length = 4', function(done){
		numberService.getRandomNumberAsString().then(function(rs){
			expect(rs.length).not.toBe(0);
			expect(rs.length).toBe(4);
			done();
		});
		timeout.flush(1000);
	});
})