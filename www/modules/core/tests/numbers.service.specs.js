describe("Numbers service test", function(){
	beforeEach(module('LokiJS'));
	beforeEach(module('Core'));
	beforeEach(inject(function(_common_){

	}));
	var numberService;
	beforeEach(inject(function (_numberService_){
		numberService = _numberService_;
	}))

	it('can get an instance of numberService', inject(function(numberService){
		expect(numberService).toBeDefined();
	}));
})