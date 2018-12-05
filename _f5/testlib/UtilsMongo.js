var MongoClient = require("../../chimp/node_modules/mongodb/index.js").MongoClient;
  
module.exports = function() {
   this.Then(/^I flush resubmission in Mongo for lastName "([^"]*)"$/, function(arg1) {
		var query = { "suspiciousEntity.name.lastName": arg1 };
		var url = 'mongodb://10.105.39.33:27017/acm';
		console.log(query);
		
		MongoClient.connect(url, function(err, db) {
			var collection2 = db.collection('SuspiciousEntityCase');
			console.log("Connected correctly to server");
			console.log(query);
			
			collection2.update(query, {$unset: {"issues.0.resubmissionApproval":""}}, function(err, numberUpdated) {
				console.log("inside Update Unset ACM" + numberUpdated);
				db.close();
			});
		});
	});
	
	this.Then(/^I flush case in Mongo for case number "([^"]*)"$/, function(arg1) {
		var query = { "caseReferenceId": arg1 };
		var url = 'mongodb://10.105.39.33:27017/acm';
		console.log(query);
		
		MongoClient.connect(url, function(err, db) {
			var collection2 = db.collection('SuspiciousEntityCase');
			console.log("Connected correctly to server");
			console.log(query);
			
			collection2.remove(query, function(err, numberRemoved) {
				console.log("Inside delete ACM, deleted cases = " + numberRemoved);
				db.close();
			});
		});
	});
}
