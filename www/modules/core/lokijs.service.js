(function(){
	'use strict';
	angular.module('LokiJS',[])
		.service('lokijsService', lokijsService);

		lokijsService.$inject = ['$q'];
		function lokijsService($q){
			/* jshint validthis: true */
			/* global lokiIndexedAdapter:true, loki:true */
			var db, idbAdapter;

			this.loadCollection = loadCollection;
			this.deleteDB = deleteDB;
			this.getDatabase = getDatabase;
			this.serializeDb = serializeDb;

			function init(){
				db = loadDb();
			}

			function getDatabase(){
				var deferred = $q.defer();

				if(db == undefined || db == null){
					deferred.reject("Database is undefined / null");
				} else {
					deferred.resolve(db);
				}

				return deferred.promise;
			}

			function serializeDb() {
				// rs.serialize() will return a JSON format of the entire database
				// which can be used to load into another app
	        	var allData = db.then(function(rs) {
	                console.log(rs.serialize());

	                // To load data. serializedDb is rs.serialize()
	        		// rs.loadJSON(serializedDb, options);
	            });
	        }	

	        function loadDbFromJSON(serializedDb, options){
	        	db.loadJSON(serializedDb, options);
	        }

			function loadDb(){
				var deferred = $q.defer();

				idbAdapter = new lokiIndexedAdapter('kiongkiong');//only for browser

				var lokidb = new loki('NUMBERS', {
			        autosave: true, 
			        autosaveInterval: 5000,
					adapter: idbAdapter
				});

				lokidb.loadDatabase({}, function() {
					console.log('Database loaded');
				  	deferred.resolve( lokidb );
				});

				return deferred.promise;
			}

			/*
			  deleteDB() - deletes all exisiting data
			  USE WITH CAUTION !!!
			*/
			function deleteDB(){ idbAdapter.deleteDatabase('NUMBERS'); }
			
			function loadCollection(collectionName, options){
				var collection = db.then(function(rs){
					var temp = rs.getCollection(collectionName);

					if (!temp) {
						var optionsObj = {};
						angular.copy(options, optionsObj);

						temp = rs.addCollection(collectionName, optionsObj);
 					}
					return temp;
				});
				
				return collection;
			}
			
			init();			
		}
})();