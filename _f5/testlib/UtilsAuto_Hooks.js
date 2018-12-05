var fs = require('fs');
var filename="_qtest.csv"
var nqTestGlobalCount;

var AutoHooks = function () {
var strFeature,strScenario,strQtestNos,stResult,strFinal;
var nEndPos,nStartPos,strCount;
var nqTestPassCount, nqTestFailCount

          //this.BeforeFeature(function(feature, callback) {
			  this.BeforeAll(function(feature, callback) {
					strFeature=feature.getName()
			  
                   //console.log("Feature is " + feature.getName());
                   //console.log("Feature Desc is " + feature.getDescription());
				   fs.writeFileSync(filename,"ACM Test Report"+"\n\n");
				   nqTestPassCount = nqTestFailCount = nqTestGlobalCount = 0;
                   callback();
          });

          this.Before(function(scenario, callback) {
                   //objScenario = scenario;
				   strCount = 0;
				   strQtestNos="";
                   callback();
          });

          this.After(function(scenario, callback) {
				   strScenario = scenario.getName();
				   nStartPos=strScenario.indexOf("[");
				   nEndPos=strScenario.indexOf("]");
				   console.log("***"+strScenario);
				   if (nStartPos!=-1) {
				   
				   strScenario = strScenario.substring(0,nStartPos);
					console.log(strScenario);
				   strQtestNos=scenario.getName().substring(nStartPos+1,nEndPos);
				   strCount = strQtestNos.split(",").length;
				   console.log(strCount);
				   strQtestNos = strQtestNos.replace(/,/g,";")
				   stResult=scenario.isSuccessful();
				   if (stResult==true) { nqTestPassCount = nqTestPassCount + strCount; }
				   else {nqTestFailCount = nqTestFailCount + strCount;
				   console.log("***nqTestFailCount***"+nqTestFailCount);
				   }
				   strFinal=strFeature+","+strScenario+","+strQtestNos+","+strCount+","+stResult+"\n";
				   }
				   else{strCount=0;
				   stResult=scenario.isSuccessful();
				   }
				   console.log("***strCount***"+strCount);
				   nqTestGlobalCount = nqTestGlobalCount + strCount;
				   console.log("------"+nqTestGlobalCount);
				   strFinal=strFeature+","+strScenario+","+strQtestNos+","+strCount+","+stResult+"\n";
				   scenario.attach(strFinal);
				   fs.appendFileSync(filename,strFinal);
                   callback();
          });
          //this.AfterFeatures(function(feature, callback) {
			  this.AfterAll(function(feature, callback) {
		  //this.registerHandler('AfterFeatures', function(event, callback) {
					fs.appendFileSync(filename, "Grand Total,,,"+nqTestGlobalCount + "\n\n");
				   fs.appendFileSync(filename, ",,PASS," + nqTestPassCount + "\n");
				fs.appendFileSync(filename, ",,FAIL,"+nqTestFailCount + "\n");
                   callback();
          });		  
};


module.exports = AutoHooks;
