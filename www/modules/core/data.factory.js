(function(){
	'use strict';

	angular.module('Core')
		.factory('DataFactory', DataFactory);

		DataFactory.$inject = ['lokijsService','common'];
		function DataFactory(lokijsService,common){			
			/* jshint validthis: true */
			var Service = function(collectionName, index){
				this.collection = lokijsService.loadCollection(collectionName, index);
				this.database = lokijsService.getDatabase();
			};

			Service.prototype = {
				saveObj : saveObj,
				deleteObj : deleteObj,
				deleteObjs : deleteObjs,
				getAllObjs : getAllObjs,
				findObjs : findObjs,
				findObj : findobj,
				saveDatabase: saveDatabase
			};

			return Service;

			// Callback is optional here
			/**
			 * [This saves the database]
			 * @return {[promise]} [Resolved if ok. Reject if error]
			 */
			function saveDatabase(){
				var deferred = common.$q.defer();
				this.database.then(function(rs){
					rs.saveDatabase(function(err){
						if(err){
							deferred.reject(err);
						} else {
							deferred.resolve();
						}
					});
				}, function(failedErr){
					deferred.reject(failedErr);
				});

				return deferred.promise;
			}

			/**
			 * [This will save unique or non unique objects based on
			 * the 2nd param passed in - unique key.]
			 * @param  {[object]} object       [Object that will be saved]
			 * @param  {[String]} uniqueColumn [The key that will be checked for uniqueness]
			 * @return {[promise]}              [A resolved / rejected promise. Rejected will be: 'Duplicated Key']
			 */
			function saveObj(object, uniqueColumn){
				var deferred = common.$q.defer();

				var objectForSaving = {};
				angular.copy(object, objectForSaving);

				if(objectForSaving.hasOwnProperty('$loki')) {
					objectForSaving.dateModified = Date.now();
					this.collection.then(function(rs){
						rs.update(objectForSaving);
						deferred.resolve();
					});
				} else {
					objectForSaving.dateCreated = Date.now();
					this.collection.then(function(rs){
						try{
							if(uniqueColumn === null || uniqueColumn ===undefined) {
								rs.insert(objectForSaving);
								deferred.resolve();
							} else {
								var object = {};
								object[uniqueColumn] = objectForSaving[uniqueColumn];

								var haveObjInDb = rs.findOne( object );

								if(haveObjInDb === null){
									// var abc = rs.insert(objectForSaving);
									rs.insert(objectForSaving);
									// console.log(abc);
									deferred.resolve();
								} else {
									deferred.reject('Duplicated key');
								}
							}
						} catch(err){
							deferred.reject('Error:'+err);
						}
					});
				}

				return deferred.promise;
			}
			
			function deleteObj(object){
				var deferred = common.$q.defer();
	
				this.collection.then(function(rs){
					rs.remove(object);
					deferred.resolve();
				});

				return deferred.promise;
			}

			function deleteObjs(listOfObjs){
				var deferred = common.$q.defer();
	
				this.collection.then(function(rs){
					rs.removeWhere(function(obj){
						for ( var i in listOfObjs ){
							if (obj.$loki == listOfObjs[i]) {
								return true;
							}
						}
						return false;
					});
					deferred.resolve();
				});

				return deferred.promise;
			}

			function getAllObjs(){
				var deferred = common.$q.defer();
				
				this.collection.then(function(rs){
					deferred.resolve(rs.find( {} ));
				});

				return deferred.promise;
			}

			function findObjs(query){
				var deferred = common.$q.defer();

				this.collection.then(function (rs) {
					var result = rs.find(query);

					if(result === undefined || result === null || result.length == 0){
						deferred.reject("No result found");
					} else {
						deferred.resolve(result);
					}
				});

				// Return an array
				return deferred.promise;
			}

			function findObj(query){
				var deferred = common.$q.defer();

				this.collection.then(function (rs){
					var result = rs.findOne(query);

					if(result === undefined || result === null || result.length == 0){
						deferred.reject("No result found");
					} else {
						deferred.resolve(result);
					}
				});

				return deferred.promise;
			}
		}
})();