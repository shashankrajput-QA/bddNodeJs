const expect = require('chai').expect;
var prop = require("../../chimp/node_modules/properties-parser/index.js");
var sleep = require('system-sleep');
var objGeneral = require('./UtilsGen.js');

//--------------To Save Data to File
module.exports.saveDataToFile = function (arg1, arg2) {
	console.log('in Utils Gen');
	var fileName = arg1;
	if(arg1.split("/").length == 2){	
		fileName = arg1.split("/")[0];
		var strProp = arg1.split("/")[1];
	} else strProp = arg1;

	var editor;
	if (require("fs").existsSync(fileName))
		editor = prop.createEditor(fileName);
	else
		editor = prop.createEditor();
	editor.set(strProp,arg2.toString());
	editor.save(fileName);
};

//--------------To Retrieve Data to File
module.exports.retrieveDataFromFile = function (arg1) {
		try{
			var fileName = arg1.split("/")[0];
			var strProp = arg1.split("/")[1];
			console.log("fileName / key is "+fileName+" / "+strProp);
			var value = prop.createEditor(fileName).get(strProp);
			console.log("value is "+value);
			return value;
		}catch(err){
			throw err;
		}
};

//--------------To Retrieve Table Indices (given column and row identifier) e.g. Status, AppNo = 1234
module.exports.retrieveTableIndices = function (arg1, arg2, arg3) {
	try{
		 var columnXpath = "(//table//*[contains(text(),'"+arg1+"')])[1]/ancestor-or-self::th/preceding-sibling::th";
		 var columnIndex = Object.keys(browser.elements(columnXpath).value).length +1;
		 console.log(columnIndex+"<=="+columnXpath);
		 
		 var rowXpath = "(//table//*[contains(text(),'"+arg2+"')])[1]/ancestor-or-self::th/preceding-sibling::th" ;
		 var rowIndex = Object.keys(browser.elements(rowXpath).value).length+1;
		 console.log(rowIndex+"<=="+rowXpath);
		 
		 var rowElementValue = "(//th["+rowIndex+"]/following::tr[contains(.,'"+arg3+"')])[1]//td["+columnIndex+"]/ancestor-or-self::tr/preceding-sibling::tr";
		 var x = Object.keys(browser.elements(rowElementValue).value).length+1;
		 console.log(x+"<=="+rowElementValue);
		 
		 var matrix = [];
		 matrix.push([x,columnIndex]);
		 console.log("MATRIX ************"+matrix);
		 return matrix ; 
	}
	catch(err){
		console.log(err);
	}
};

//--------------Identify table with column name and Retrieve Table Indices (given column and row identifier) e.g. Status, AppNo = 1234
module.exports.retrieveTableIndicesWHColName = function (arg4,arg1, arg2, arg3) {
	try{		 
		 var columnXpath = "(//*[text()=\""+arg4+"\"]/ancestor::table)//*[contains(text(),\""+arg1+"\")]/ancestor-or-self::th/preceding-sibling::th";	 
		 console.log("columnXpath"+columnXpath);
		 var columnIndex = Object.keys(browser.elements(columnXpath).value).length +1;
		 var rowXpath = "(//*[text()=\""+arg4+"\"]/ancestor::table)//*[contains(text(),\""+arg2+"\")]/ancestor-or-self::th/preceding-sibling::th";
		 console.log("rowXpath"+rowXpath);
		 var rowIndex = Object.keys(browser.elements(rowXpath).value).length+1;
		 var rowElementValue = "(//*[text()=\""+arg4+"\"]/ancestor::table)//th["+rowIndex+"]/following::tr[contains(.,'"+arg3+"')][1]//td["+columnIndex+"]/ancestor-or-self::tr/preceding-sibling::tr"; 
		 console.log("rowElementValue :"+rowElementValue);
		 var x = Object.keys(browser.elements(rowElementValue).value).length;
		 var matrix = [];
		 matrix.push([x,columnIndex]);
		 console.log("MATRIX ************"+matrix);
		 return matrix ; 
	}
	catch(err){
		console.log(err);
	}
};

//---------------To Operate on the checkbox
module.exports.OperateCheckbox = function (x, action) {	
	if(action=='check'){
		console.log("To Check");
		if(!browser.isSelected(x)) browser.click(x);
	}
	else if (action=='uncheck'){
		console.log("To Uncheck");
		if(browser.isSelected(x)) browser.click(x);
	}
	else if(action == 'verify check'){
		console.log("Verify Check");
		if (browser.isSelected(x))
			expect(true).to.be.true;
		else if (!browser.isSelected(x))
			expect(true).to.be.false;
	}
	else if (action == 'verify uncheck'){
		console.log("Verify Uncheck");
		if (browser.isSelected(x))
			expect(true).to.be.false;
		else if (!browser.isSelected(x))
			expect(true).to.be.true;		
	}else if (action == 'verify enabled'){
		console.log("Verify Enabled");
		expect(browser.isEnabled(x)).be.true;
	}else if (action == 'verify disabled'){
		console.log("Verify Disabled");
		expect(browser.isEnabled(x)).be.false;
	}else{
		console.log("The invalid action provided, Please provide below valid actions");
		expect(false).to.be.false;
	}
};
//--------------to Get timestamp
module.exports.getTimeStamp = function () {
    var now = new Date();
    return ((now.getMonth() + 1) + '_' + (now.getDate()) + '_' + now.getFullYear() + '_' +
             now.getHours() + 
             ((now.getMinutes() < 10)
                 ? ("0" + now.getMinutes())
                 : (now.getMinutes())) +
             ((now.getSeconds() < 10)
                 ? ("0" + now.getSeconds())
                 : (now.getSeconds())));
};
//--------------to Get Today's Date
module.exports.getTodayDate = function () {
    var now = new Date();
    return ((now.getMonth() + 1) + "/" + (now.getDate()) + "/" + (now.getFullYear()));
};
//--------------to Get Incremented Date
module.exports.getIncrementedDate = function (arg1) {
    var now = new Date();
	now.setDate(now.getDate() + parseInt(arg1));
    return ((now.getMonth() + 1) + "/" + (now.getDate()) + "/" + (now.getFullYear()));
};
//--------------to Get Random 5-length CHAR
module.exports.getRandomString = function () {
	var strRandom = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	for (var i = 0; i < 5; i++)
		strRandom += possible.charAt(Math.floor(Math.random() * possible.length));
    return (strRandom);
};
//--------------to Analyze Value
module.exports.analyzeValue = function (arg1) {
	var value = arg1.split("-->")[0];
	
	if (value.includes("**")) {value = Math.round(new Date().getTime()/10000);}
	if (value.includes("$$rnd")) {value = objGeneral.getTimeStamp();}
	
	if (value.includes("$$sysdate")) {
		if (value.includes("$$sysdate+")){
			var incrementDays = value.split("+")[1];
			incrementDays = incrementDays.split("--")[0];
			console.log("Increment Days " + incrementDays);
			value = objGeneral.getIncrementedDate(incrementDays);
			console.log(value);
		} else {
			value = objGeneral.getTodayDate();
			console.log(value);
		}
	}
	if (value.includes("$$rndString")) {value = objGeneral.getRandomString();}
	
	if (arg1.includes("-->")) {var fileName = arg1.split("-->")[1]; console.log(fileName); objGeneral.saveDataToFile(fileName, value); }
	
	if (arg1.includes("<--")) { value = objGeneral.retrieveDataFromFile(arg1.split("<--")[1]); }
    return (value);
};

module.exports.delay = function (){
		sleep(1000);
};
module.exports.bigdelay = function (){
		sleep(1*1000);
};
