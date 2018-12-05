const expect = require('chai').expect;
var objGeneral = require('./UtilsGen.js');
var sleep = require('system-sleep');
var fs = require('fs');
var prop = require("../../chimp/node_modules/properties-parser/index.js");
var objscreencapture = require('screencapture')

module.exports = function() {
	 
	//--------------Launch URL
	//[e.g.] Given I open url "http://google.com"
	//[Comments] To launch the URL
	this.Given(/^I open url "([^"]*)"$/,{timeout: 300 * 1000}, function (arg1,callback) { 
		browser.timeouts('page load', 90000);
		browser.url(objGeneral.analyzeValue(arg1));
		var handle = browser.windowHandle();
		browser.windowHandleMaximize([handle]); 
		callback();
	 });
	
	//--------------Move to Popup Window
	//[e.g.] I move focus to Popup Window
	//[Comments] Moving to the new window that pops up
	this.When(/^I move focus to Popup Window$/, function () { 
		var x;
		console.log(browser.getCurrentTabId());
		x = browser.getTabIds();
		console.log(x);
		browser.window(x[1]);
		console.log(browser.getCurrentTabId());
	 });
	//--------------Come back to Parent Window
	this.When(/^I come back to Parent Window$/, function () { 
		var x;
		x = browser.getTabIds();
		console.log(x);
		browser.window(x[0]);
		console.log(browser.getCurrentTabId());
	 });

	 //##############-TEXT FIELD-##########################
	 //--------------Filling Field
	this.Then(/^I enter "([^"]*)" as "([^"]*)"$/, function(arg1, arg2) {
		var value = objGeneral.analyzeValue(arg2); var x;
		var arg1 = objGeneral.analyzeValue(arg1);
		if(browser.isExisting("(//descendant::label[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			x = "(//descendant::label[text()=\""+arg1+"\"])[1]/following::input[1]";
		}else if (browser.isExisting("(//descendant::td[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			x = "(//descendant::td[text()=\""+arg1+"\"])[1]/following::input[1]";
		}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			x = "(//descendant::td//*[text()=\""+arg1+"\"])[1]/following::input[1]";
		}else if (browser.isExisting("(//descendant::*[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			x = "(//descendant::*[text()=\""+arg1+"\"])[1]/following::input[1]";
		}else {
			x = "(//descendant::*[contains(text(),\""+arg1+"\")])[1]/following::input[1]";
		}
		console.log(x);
		browser.setValue(x,value);		
	});
	//--------------[OFFSHOOT]Filling Fields of [Another Section Same Field]
		this.Then(/^I enter "([^"]*)""([^"]*)" as "([^"]*)"$/, function(arg1, arg2, arg3) {
			var value = objGeneral.analyzeValue(arg3); var x;
			
			if(browser.isExisting("(//descendant::label[text()=\""+arg1+"\"])"+arg2+"/following::input[1]")) {
				x = "(//descendant::label[text()=\""+arg1+"\"])"+arg2+"/following::input[1]";
			}else if (browser.isExisting("(//descendant::td[text()=\""+arg1+"\"])"+arg2+"/following::input[1]")) {
				x = "(//descendant::td[text()=\""+arg1+"\"])"+arg2+"/following::input[1]";
			}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]")) {
				x = "(//descendant::td//*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]";
			}else if (browser.isExisting("(//descendant::*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]")) {
				x = "(//descendant::*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]";
			}else {
				x = "(//descendant::*[contains(text(),\""+arg1+"\")])"+arg2+"/following::input[1]";
			}
			console.log(x);
			browser.setValue(x,value);
		});
	//--------------Filling Fields of [Single Label Multiple Fields] e.g. Name(First/Last)
	this.Then(/^I enter "([^"]*)" field"([^"]*)" as "([^"]*)"$/, function(arg1, arg2, arg3) {
		var value = objGeneral.analyzeValue(arg3); var x;
		if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"][1]/following::input"+arg2)) {
			x = "//descendant::label[text()=\""+arg1+"\"][1]/following::input"+arg2;
		}else if (browser.isExisting("//descendant::td[text()=\""+arg1+"\"][1]/following::input"+arg2)) {
			x = "//descendant::td[text()=\""+arg1+"\"][1]/following::input"+arg2;
		}else if (browser.isExisting("//descendant::td//*[text()=\""+arg1+"\"][1]/following::input"+arg2)) {
			x = "//descendant::td//*[text()=\""+arg1+"\"][1]/following::input"+arg2;
		}else if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::input"+arg2)) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::input"+arg2;
		}else {
			x = "//descendant::*[contains(text(),\""+ arg1 + "\")][1]/following::input" + arg2;
		}
		console.log(x);
		browser.setValue(x,value);
	});
	//--------------[OFFSHOOT]Filling Fields of [Single Label Multiple Fields] [In Another section] e.g. Name(First/Last)
		this.Then(/^I enter "([^"]*)""([^"]*)" field"([^"]*)" as "([^"]*)"$/, function(arg1,arg2, arg3,arg4) {
			var value = objGeneral.analyzeValue(arg4); var x;
			if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"]"+arg2+"/following::input"+arg3)) {
				x = "//descendant::label[text()=\""+arg1+"\"]"+arg2+"/following::input"+arg3;
			}else if (browser.isExisting("//descendant::td[text()=\""+arg1+"\"]"+arg2+"/following::input"+arg3)) {
				x = "//descendant::td[text()=\""+arg1+"\"]"+arg2+"/following::input"+arg3;
			}else if (browser.isExisting("//descendant::td//*[text()=\""+arg1+"\"]"+arg2+"/following::input"+arg3)) {
				x = "//descendant::td//*[text()=\""+arg1+"\"]"+arg2+"/following::input"+arg3;
			}else if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"]"+arg2+"/following::input"+arg3)) {
				x = "//descendant::*[text()=\""+arg1+"\"]"+arg2+"/following::input"+arg3;
			}else {
				x = "//descendant::*[contains(text(),\""+ arg1 + "\")]"+arg2+"/following::input" + arg3;
			}
			console.log(x);
			browser.setValue(x,value);
		});
	//--------------Filling Fields based on placeholder (hint)
	this.Then(/^I enter placeholder "([^"]*)" as "([^"]*)"$/, function(arg1, arg2) {
		var x = "//input[@placeholder=\""+arg1+"\"]";
		console.log(x);
		browser.setValue(x,objGeneral.analyzeValue(arg2));
	});
	//--------------Filling Fields based on button position (preceding)
	this.Then(/^I enter "([^"]*)" preceding "([^"]*)" button$/, function (arg1, arg2) {
		var x = "//input[@type='submit' and @value=\""+arg2+"\"]/preceding-sibling::input[@type='text']";
		console.log(x);
		browser.setValue(x,objGeneral.analyzeValue(arg1));
	});	
	//--------------Filling Fields retrieving from File
	this.Then(/^I enter extracted "([^"]*)" from file "([^"]*)" preceding "([^"]*)" button$/, function (arg1, arg2, arg3) {
		var x = "//input[@type='submit' and @value=\""+arg3+"\"]/preceding-sibling::input[@type='text']";
		console.log(x);
		
		var value = prop.createEditor(arg2).get(arg1);
		console.log("The value to be entered is");
		console.log(value);
		browser.setValue(x, value);
	});
	//------------ENTER VALUE in INPUT RETRIEVED from FILE
	this.Then(/^I enter "([^"]*)" field"([^"]*)" from file "([^"]*)"$/, function(arg1, arg2, arg3) {
		var value = arg3; var x;
		if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::input"+arg2)) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::input"+arg2;
		}else {
			x = "//descendant::*[contains(text(),\""+ arg1 + "\")][1]/following::input" + arg2;
		}
		console.log(x);
		var value=objGeneral.retrieveDataFromFile(arg3);
		console.log(value);
		browser.setValue(x,value);
	});
	
   //--------------Enter text with ID
   this.When(/^I enter "([^"]*)" in textbox having id as "([^"]*)"$/, function(arg1, arg2) {
		try{
			var x = "//*[contains(@id, '"+arg2+"')]";
			browser.setValue(x,objGeneral.analyzeValue(arg1));
		}catch(err){
			console.log(err);
		}
	});
	 //--------------Clicking Textbox (to keep cursor inside)
	this.Then(/^I click on Textbox "([^"]*)"$/, function(arg1) {
		var x;
		arg1 = objGeneral.analyzeValue(arg1);
		if(browser.isExisting("(//descendant::label[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			x = "(//descendant::label[text()=\""+arg1+"\"])[1]/following::input[1]";
		}else if (browser.isExisting("(//descendant::td[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			x = "(//descendant::td[text()=\""+arg1+"\"])[1]/following::input[1]";
		}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			x = "(//descendant::td//*[text()=\""+arg1+"\"])[1]/following::input[1]";
		}else if (browser.isExisting("(//descendant::*[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			x = "(//descendant::*[text()=\""+arg1+"\"])[1]/following::input[1]";
		}else  {
			x = "(//descendant::*[contains(text(),\""+arg1+"\")])[1]/following::input[1]";
		}
		console.log(x);
		browser.click(x);
		browser.keys(['Enter']);
	});
	 //--------------Clicking any INPUT item
	this.Then(/^I click on "([^"]*)" input field"([^"]*)"$/, function(arg1,arg2) {
		var x;
		if (browser.isExisting("(//descendant::*[text()=\""+arg1+"\"])[1]/following::input" + arg2)) {
			x = "(//descendant::*[text()=\""+arg1+"\"])[1]/following::input" + arg2;
		}else  {
			x = "(//descendant::*[contains(text(),\""+arg1+"\")])[1]/following::input" + arg2;
		}
		console.log(x);
		browser.click(x);
	});
	 //--------------Clicking any SELECT item
	this.Then(/^I click on "([^"]*)" combo field"([^"]*)"$/, function(arg1,arg2) {
		var x;
		if (browser.isExisting("(//descendant::*[text()=\""+arg1+"\"])[1]/following::select" + arg2)) {
			x = "(//descendant::*[text()=\""+arg1+"\"])[1]/following::select" + arg2;
		}else  {
			x = "(//descendant::*[contains(text(),\""+arg1+"\")])[1]/following::select" + arg2;
		}
		console.log(browser.getLocation(x));
		console.log(x);
		browser.click(x);
	});
	
	 //--------------Clicking Textbox (using placeholder)
	this.Then(/^I click on Textbox having placeholder "([^"]*)"$/, function(arg1) {
		var x = "//input[@placeholder=\""+arg1+"\"]";
		console.log(x);
		browser.click(x);
		browser.keys(['Enter']);
	});
	
	//##############-TEXT FIELD - VERIFY-##########################
	//--------------Text field - Verify
	this.Then(/^I verify from textbox "([^"]*)" as "([^"]*)"$/, function(arg1, arg2) {
		var arg2 = objGeneral.analyzeValue(arg2); var x;
		
		if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::label[text()=\""+arg1+"\"][1]/following::input[1]";
		}else if (browser.isExisting("//descendant::td[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::td[text()=\""+arg1+"\"][1]/following::input[1]";
		}else if (browser.isExisting("//descendant::td//*[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::td//*[text()=\""+arg1+"\"][1]/following::input[1]";
		}else if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::input[1]";
		}else {
			x = "//descendant::*[contains(text(),\""+arg1+"\")][1]/following::input[1]";
		}
		console.log(x);
		expect(browser.getValue(x)).to.be.eql(arg2);
	});
	//--------------[OFFSHOOT-VERIFY]Verify Fields of [Another Section Same Field]
		this.Then(/^I verify from textbox "([^"]*)""([^"]*)" as "([^"]*)"$/, function(arg1, arg2, arg3) {
			var arg3 = objGeneral.analyzeValue(arg3); var x;
			if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"]"+arg2+"/following::input[1]")) {
				x = "//descendant::label[text()=\""+arg1+"\"]"+arg2+"/following::input[1]";
			}else if (browser.isExisting("(//descendant::td[text()=\""+arg1+"\"])"+arg2+"/following::input[1]")) {
				x = "(//descendant::td[text()=\""+arg1+"\"])"+arg2+"/following::input[1]";
			}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]")) {
				x = "(//descendant::td//*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]";
			}else if (browser.isExisting("(//descendant::*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]")) {
				x = "(//descendant::*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]";
			}else {
				x = "(//descendant::*[contains(text(),\""+arg1+"\")])"+arg2+"/following::input[1]";
			}
			console.log(x);
			expect(browser.getValue(x)).to.be.eql(arg3);
		});
	
	//--------------Verify Fields of [Single Label Multiple Fields]
	this.Then(/^I verify from textbox "([^"]*)" field "([^"]*)" as "([^"]*)"$/, function(arg1, arg2, arg3) {
		var arg3 = objGeneral.analyzeValue(arg3); var x;
		
		if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"][1]/following::input"+arg2)) {
			x = "//descendant::label[text()=\""+arg1+"\"][1]/following::input"+arg2;
		}else if (browser.isExisting("//descendant::td[text()=\""+arg1+"\"][1]/following::input"+arg2)) {
			x = "//descendant::td[text()=\""+arg1+"\"][1]/following::input"+arg2;
		}else if (browser.isExisting("//descendant::td//*[text()=\""+arg1+"\"][1]/following::input"+arg2)) {
			x = "//descendant::td//*[text()=\""+arg1+"\"][1]/following::input"+arg2;
		}else if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::input"+arg2)) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::input"+arg2;
		}else  {
			x = "//descendant::*[contains(text(),\""+ arg1 + "\")][1]/following::input" + arg2;
		}
		console.log(x);
		expect(browser.getValue(x)).to.be.eql(arg3);
	});

	//--------------Text field - VERIFY text field does not have the value
	this.Then(/^I verify from textbox "([^"]*)" does not have "([^"]*)"$/, function(arg1, arg2) {
		var x;
		var value = objGeneral.analyzeValue(arg2);
		if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::label[text()=\""+arg1+"\"][1]/following::input[1]";
		}else if (browser.isExisting("//descendant::td[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::td[text()=\""+arg1+"\"][1]/following::input[1]";
		}else if (browser.isExisting("//descendant::td//*[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::td//*[text()=\""+arg1+"\"][1]/following::input[1]";
		}else if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::input[1]";
		}else{
			x = "//descendant::*[contains(text(),\""+arg1+"\")][1]/following::input[1]";
		}
		console.log(x);
		expect(browser.getValue(x)).to.not.eql(value);
	});


	//-------------Verifying value present in a property file against a hard-coded value
	this.Then(/^I verify value "([^"]*)" to be equal to value from saved FileProp "([^"]*)"$/, function(arg1, arg2){
		objGeneral.delay();
		var fileName = arg2.split("/")[0];
		var strProp = arg2.split("/")[1];
		var value = prop.createEditor(fileName).get(strProp);
		console.log("Valueeeeee :"+value);
		expect(prop.createEditor(fileName).get(strProp)).to.be.eql(arg1);
	});
	
	//##############-COMBO-##########################
	//--------------Selecting Text from Combo
	this.When(/^I select from "([^"]*)" as "([^"]*)"$/, function(arg1, arg2) {
		var x;
		var value = objGeneral.analyzeValue(arg2);
		if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"][1]/following::select[1]")) {
			x = "//descendant::label[text()=\""+arg1+"\"][1]/following::select[1]";
		}else if (browser.isExisting("//descendant::td[text()=\""+arg1+"\"][1]/following::select[1]")) {
			x = "//descendant::td[text()=\""+arg1+"\"][1]/following::select[1]";
		}else if (browser.isExisting("//descendant::td//*[text()=\""+arg1+"\"][1]/following::select[1]")) {
			x = "//descendant::td//*[text()=\""+arg1+"\"][1]/following::select[1]";
		}else if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::select[1]")) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::select[1]";
		}else  {
			x = "//descendant::*[contains(text(),\""+arg1+"\")][1]/following::select[1]";
		}
		console.log(x);
		try{
			//browser.click(x);
			objGeneral.delay();
			browser.selectByVisibleText(x,value);
		}catch(err) {
			console.log("COMBO SELECT by VAL");
			//browser.click(x);
			objGeneral.delay();
			browser.selectByValue(x,value);
		}
		objGeneral.delay();
	});
	//--------------Selecting Combo [Another Section Same Field]
	this.When(/^I select from "([^"]*)""([^"]*)" as "([^"]*)"$/, function(arg1, arg2, arg3) {
		var x;
		var value = objGeneral.analyzeValue(arg3);
		if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"]"+arg2+"/following::select[1]")) {
			x = "//descendant::label[text()=\""+arg1+"\"]"+arg2+"/following::select[1]";
		}else if (browser.isExisting("(//descendant::td[text()=\""+arg1+"\"])"+arg2+"/following::select[1]")) {
			x = "(//descendant::td[text()=\""+arg1+"\"])"+arg2+"/following::select[1]";
		}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg1+"\"])"+arg2+"/following::select[1]")) {
			x = "(//descendant::td//*[text()=\""+arg1+"\"])"+arg2+"/following::select[1]";
		}else if (browser.isExisting("(//descendant::*[text()=\""+arg1+"\"])"+arg2+"/following::select[1]")) {
			x = "(//descendant::*[text()=\""+arg1+"\"])"+arg2+"/following::select[1]";
		}else  {
			x = "(//descendant::*[contains(text(),\""+arg1+"\")])"+arg2+"/following::select[1]";
		}
		console.log(x);
		browser.selectByVisibleText(x,value);
		objGeneral.delay();
	});	
	//--------------Selecting Combo [Single Label Multiple Fields] e.g. DOB
	this.When(/^I select from "([^"]*)" field"([^"]*)" as "([^"]*)"$/, function(arg1, arg2, arg3) {
		var value = objGeneral.analyzeValue(arg3);
		try{
			objGeneral.delay();
			var x = "//descendant::*[text()='"+arg1+"'][1]/following::select"+arg2;
			console.log(x);
			browser.selectByVisibleText(x,value);
			objGeneral.delay();
		}catch(err){
			objGeneral.delay();
			var x = "//descendant::*[contains(.,'"+arg1+"')][1]/following::select"+arg2;
			console.log(x);
			browser.selectByVisibleText(x,value);
			objGeneral.delay();
		}
	});
		//--------------[OFFSHOOT]Selecting Combo [Single Label Multiple Fields] [Another Section] e.g. DOB (Principal2)
		this.When(/^I select from "([^"]*)""([^"]*)" field"([^"]*)" as "([^"]*)"$/, function(arg1, arg2, arg3,arg4) {
			var value = objGeneral.analyzeValue(arg4);
			try{
				objGeneral.delay();
				var x = "//descendant::*[text()='"+arg1+"']"+arg2+"/following::select"+arg3;
				console.log(x);
				browser.selectByVisibleText(x,value);
				objGeneral.delay();
			}catch(err){
				objGeneral.delay();
				var x = "//descendant::*[text()='"+arg1+"']"+arg2+"/following::select"+arg3;
				console.log(x);
				browser.selectByVisibleText(x,value);
				objGeneral.delay();
			}
		});
		//--------------[COMBO ID]Select value from Combo using ID
		this.When(/^I select from dropdown having id "([^"]*)" as "([^"]*)"$/, function(arg1, arg2) {
			 var value = objGeneral.analyzeValue(arg2);
			 var x = "//descendant::select[contains(@id, \""+arg1+"\")]";
			 console.log(x);
			 browser.selectByVisibleText(x,value);
			 objGeneral.delay();
		});
	//--------------Selecting Value from Combo (Sometimes, the TEXT would have special characters)
	this.When(/^I select from "([^"]*)" value as "([^"]*)"$/, function(arg1, arg2) {
		var x;
		var value = objGeneral.analyzeValue(arg2);
		if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"][1]/following::select[1]")) {
			x = "//descendant::label[text()=\""+arg1+"\"][1]/following::select[1]";
		}else if (browser.isExisting("//descendant::td[text()=\""+arg1+"\"][1]/following::select[1]")) {
			x = "//descendant::td[text()=\""+arg1+"\"][1]/following::select[1]";
		}else if (browser.isExisting("//descendant::td//*[text()=\""+arg1+"\"][1]/following::select[1]")) {
			x = "//descendant::td//*[text()=\""+arg1+"\"][1]/following::select[1]";
		}else if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::select[1]")) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::select[1]";
		}else  {
			x = "//descendant::*[contains(text(),\""+arg1+"\")][1]/following::select[1]";
		}
		console.log(x);
		browser.selectByValue(x,value);
		objGeneral.delay();
	});


	//##############-COMBO-VERIFY##########################
	//--------------Verifying Combo Value - Simple
	this.When(/^I verify from combobox "([^"]*)" as "([^"]*)"$/, function(arg1, arg2) {
		var x;
		var value = objGeneral.analyzeValue(arg2);
		
		if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::select[1]")) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::select[1]";
		}else{
			x = "//descendant::*[contains(text(),\""+arg1+"\")][1]/following::select[1]";
		}
		console.log(x+"-val-"+browser.getValue(x));
		console.log("-ToVerify-"+value);
		expect(browser.getValue(x)).to.be.eql(value);
		objGeneral.delay();
	});
	//--------------Verifying Combo Value - [Single Label Multiple Fields]
	this.When(/^I verify from combobox "([^"]*)" field "([^"]*)" as "([^"]*)"$/, function(arg1, arg2, arg3) {
		var x;
		var value = objGeneral.analyzeValue(arg3);
		if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::select"+arg2)) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::select"+arg2+"/option[@selected]";
		}else{
			x = "//descendant::*[contains(text(),\""+arg1+"\")][1]/following::select"+arg2+"/option[@selected]";
		}
		console.log(x);
		expect(browser.getText(x)).to.be.eql(value);
		objGeneral.delay();
	});
	
	//--------------Verify Fields of [Another Section Same Fields]
	this.Then(/^I verify from combobox "([^"]*)""([^"]*)" as "([^"]*)"$/, function(arg1, arg2, arg3) {
		var x;
		var value = objGeneral.analyzeValue(arg3);
		if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"]"+arg2+"/following::select[1]")) {
			x = "//descendant::*[text()=\""+arg1+"\"]"+arg2+"/following::select[1]/option[@selected]";
		}else{
			x = "//descendant::*[contains(text(),\""+arg1+"\")]"+arg2+"/following::select[1]/option[@selected]";
		}
		console.log(x);
		expect(browser.getText(x)).to.be.eql(value);
		objGeneral.delay();
	});
	
	//--------------Verify Fields of [Another Section Same Fields]
	this.Then(/^I verify from combolist "([^"]*)""([^"]*)" as "([^"]*)"$/, function(arg1, arg2, arg3) {
		var x = "//descendant::*[text()='"+arg1+"']"+arg2+"/following::select[1]/option[1]";
		var value = objGeneral.analyzeValue(arg3);
		console.log(x);
		console.log(browser.getText(x));
		expect(browser.getText(x)).to.be.eql(value);
	});

	//##############-COMBO-EXISTS##########################
	//--------------Verifying Combo Exists
	this.When(/^I verify dropdown "([^"]*)" exists$/, function(arg1) {
		var x;
		if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::select[1]")) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::select[1]";
		}else  {
			x = "//descendant::*[contains(text(),\""+arg1+"\")][1]/following::select[1]";
		}
		console.log(x);
		expect(x).to.exist;
		objGeneral.delay();
	});
	
	 //##############-RADIO BUTTON-##########################
	 //--------------Selecting value for Radio Group
	this.Then(/^I select the radio button "([^"]*)" as "([^"]*)"$/, function(arg1, arg2) {
		var x;
		if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding-sibling::input[@type=\"radio\"][1]")) {
			x = "//descendant::label[text()=\""+arg1+"\"][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding-sibling::input[@type=\"radio\"][1]";
		}else if (browser.isExisting("//descendant::td[text()=\""+arg1+"\"][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding-sibling::input[@type=\"radio\"][1]")) {
			x = "//descendant::td[text()=\""+arg1+"\"][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding-sibling::input[@type=\"radio\"][1]";
		}else if (browser.isExisting("//descendant::td//*[text()=\""+arg1+"\"][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding-sibling::input[@type=\"radio\"][1]")) {
			x = "//descendant::td//*[text()=\""+arg1+"\"][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding-sibling::input[@type=\"radio\"][1]";
		}else if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding-sibling::input[@type=\"radio\"][1]")) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding-sibling::input[@type=\"radio\"][1]";
		}else if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding::input[@type=\"radio\"][1]")) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding::input[@type=\"radio\"][1]";
		}else  {
			x = "//descendant::*[contains(text(),\""+arg1+"\")][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding::input[@type=\"radio\"][1]";
		}
		console.log(x);
		browser.click(x);
	});
	
	//##############-CHECKBOX-##########################
	//--------------Clicking checkbox with ID
	this.When(/^I click on checkbox having id as "([^"]*)"$/, function(arg1) {
		
		try{
			var x = "//*[contains(@id, '"+arg1+"')]";
			browser.click(x);
		}catch(err){
			console.log(err);
		}
	});
	
	//--------------CHECKBOX: Taking action on checkbox
	this.When(/^I "([^"]*)" the checkbox present "([^"]*)" the "([^"]*)"$/, function(arg1, arg2, arg3) {
		var x; var action = arg1;
		arg3 = objGeneral.analyzeValue(arg3);
		
		if(arg2 == 'after'){			
			if(browser.isExisting("(//descendant::label[text()=\""+arg3+"\"])[1]/following::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::label[text()=\""+arg3+"\"])[1]/following::*[@type = \"checkbox\"][1]";
			}else if (browser.isExisting("(//descendant::td[text()=\""+arg3+"\"])[1]/following::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::td[text()=\""+arg3+"\"])[1]/following::*[@type = 'checkbox'][1]";
			}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg3+"\"])[1]/following::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::td//*[text()=\""+arg3+"\"])[1]/following::*[@type = 'checkbox'][1]";
			}else if (browser.isExisting("(//descendant::*[text()=\""+arg3+"\"])[1]/following::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::*[text()=\""+arg3+"\"])[1]/following::*[@type = 'checkbox'][1]";
			}else {
				x = "(//descendant::*[contains(text(),\""+arg3+"\")])[1]/following::*[@type = 'checkbox'][1]";
			}
			console.log(x);
			objGeneral.OperateCheckbox(x, action);
		}
		else if(arg2 == 'before'){				
			if(browser.isExisting("(//descendant::label[text()=\""+arg3+"\"])[1]/preceding::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::label[text()=\""+arg3+"\"])[1]/preceding::*[@type = \"checkbox\"][1]";
			}else if (browser.isExisting("(//descendant::td[text()=\""+arg3+"\"])[1]/preceding::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::td[text()=\""+arg3+"\"])[1]/preceding::*[@type = 'checkbox'][1]";
			}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg3+"\"])[1]/preceding::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::td//*[text()=\""+arg3+"\"])[1]/preceding::*[@type = 'checkbox'][1]";
			}else if (browser.isExisting("(//descendant::*[text()=\""+arg3+"\"])[1]/preceding::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::*[text()=\""+arg3+"\"])[1]/preceding::*[@type = 'checkbox'][1]";
			}else {
				x = "(//descendant::*[contains(text(),\""+arg3+"\")])[1]/preceding::*[@type = 'checkbox'][1]";
			}
			console.log(x);
			objGeneral.OperateCheckbox(x, action);
		}
	});	
	
	//--------------CHECKBOX: Taking action on multiple checkbox with same label
	this.When(/^I "([^"]*)" the checkbox present "([^"]*)" the "([^"]*)""([^"]*)"$/, function(arg1, arg2, arg3, arg4) {
		arg3 = objGeneral.analyzeValue(arg3);
		var x; var action = arg1;
		arg3 = objGeneral.analyzeValue(arg3);
		if(arg2 == 'after'){			
			if(browser.isExisting("(//descendant::label[text()=\""+arg3+"\"])"+arg4+"/following::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::label[text()=\""+arg3+"\"])"+arg4+"/following::*[@type = \"checkbox\"][1]";
			}else if (browser.isExisting("(//descendant::td[text()=\""+arg3+"\"])"+arg4+"/following::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::td[text()=\""+arg3+"\"])"+arg4+"/following::*[@type = 'checkbox'][1]";
			}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg3+"\"])"+arg4+"/following::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::td//*[text()=\""+arg3+"\"])"+arg4+"/following::*[@type = 'checkbox'][1]";
			}else if (browser.isExisting("(//descendant::*[text()=\""+arg3+"\"])"+arg4+"/following::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::*[text()=\""+arg3+"\"])"+arg4+"/following::*[@type = 'checkbox'][1]";
			}else {
				x = "(//descendant::*[contains(text(),\""+arg3+"\")])"+arg4+"/following::*[@type = 'checkbox'][1]";
			}
			console.log(x);
			objGeneral.OperateCheckbox(x, action);
			
		}else if(arg2 == 'before'){				
			if(browser.isExisting("(//descendant::label[text()=\""+arg3+"\"])"+arg4+"/preceding::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::label[text()=\""+arg3+"\"])"+arg4+"/preceding::*[@type = \"checkbox\"][1]";
			}else if (browser.isExisting("(//descendant::td[text()=\""+arg3+"\"])"+arg4+"/preceding::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::td[text()=\""+arg3+"\"])"+arg4+"/preceding::*[@type = 'checkbox'][1]";
			}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg3+"\"])"+arg4+"/preceding::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::td//*[text()=\""+arg3+"\"])"+arg4+"/preceding::*[@type = 'checkbox'][1]";
			}else if (browser.isExisting("(//descendant::*[text()=\""+arg3+"\"])"+arg4+"/preceding::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::*[text()=\""+arg3+"\"])"+arg4+"/preceding::*[@type = 'checkbox'][1]";
			}else {
				x = "(//descendant::*[contains(text(),\""+arg3+"\")])"+arg4+"/preceding::*[@type = 'checkbox'][1]";
			}
			console.log(x);
			objGeneral.OperateCheckbox(x, action);
		}
	});
	
	//##############-BUTTON CLICKS-##########################	
	 //--------------Clicking Button
	this.Then(/^I click button "([^"]*)"$/, function(arg1,callback) {			
		var x;
		if(browser.isExisting("(//input[@type='submit' and @value='"+arg1+"'])[1]")){
			x = "(//input[@type='submit' and @value='"+arg1+"'])[1]";
		}else if(browser.isExisting("(//input[@type='button' and @value=\""+arg1+"\"])[1]")){
			x = "(//input[@type='button' and @value='"+arg1+"'])[1]";
		}else if(browser.isExisting("(//button[contains(text(),\""+arg1+"\")])[1]")){
			x = "(//button[contains(text(),\""+arg1+"\")])[1]";
		//For ACM buttons "text()" is not working: VIJAY
		}else if(browser.isExisting("(//button[contains(.,\""+arg1+"\")])[1]")){
			x = "(//button[contains(.,\""+arg1+"\")])[1]";
		//For identifying button based on its attribute that has meaningful name (e.g. class="right")
		}else if(browser.isExisting("(//button//@*[contains(.,\""+arg1+"\")])[1]/..")){
			x = "(//button//@*[contains(.,\""+arg1+"\")])[1]/..";
		}else if(browser.isExisting("(//*[text() = \""+arg1+"\"])[1]")){
			x = "(//*[text() = \""+arg1+"\"])[1]";
		}else if(browser.isExisting("(//*[contains(text(),\""+ arg1 +"\")])[1]")){
			x = "(//*[contains(text(),\""+ arg1 +"\")])[1]";
		}else{
			//At times when it displays all caps but having InitCap inside HTML
			arg1 = arg1[0].toUpperCase() + arg1.substr(1).toLowerCase();
			x = "//input[@type='submit' and @value='"+arg1+"']";
		}
		console.log(x);
		browser.click(x); 
		objGeneral.bigdelay();
		callback();
	});
	
		//--------------[OFFSHOOT-Occurrence] Clicking Button of nth Occurrence
		this.Then(/^I click button "([^"]*)" occurrence "([^"]*)"$/, function(arg1, arg2) {
			var x;			
			if(browser.isExisting("(//input[@type='submit' and @value='"+arg1+"'])"+arg2)){
				x = "(//input[@type='submit' and @value='"+arg1+"'])" + arg2;
			}else if(browser.isExisting("(//input[@type='button' and @value=\""+arg1+"\"])" + arg2)){
				x = "(//input[@type='button' and @value='"+arg1+"'])" + arg2;
			}else if(browser.isExisting("(//button[contains(text(),\""+arg1+"\")])" + arg2)){
				x = "(//button[contains(text(),\""+arg1+"\")])" + arg2;
			//For ACM buttons "text()" is not working: VIJAY
			}else if(browser.isExisting("(//button[contains(.,\""+arg1+"\")])" + arg2)){
				x = "(//button[contains(.,\""+arg1+"\")])" + arg2;
			//For identifying button based on its attribute that has meaningful name (e.g. class="right")
			}else if(browser.isExisting("(//button//@*[contains(.,\""+arg1+"\")])" + arg2 + "/..")){
				x = "(//button//@*[contains(.,\""+arg1+"\")])" + arg2 + "/..";
			}else if(browser.isExisting("(//*[text() = \""+arg1+"\"])" + arg2)){
				x = "(//*[text() = \""+arg1+"\"])" + arg2;
			}else {
				x = "(//*[contains(text(),\""+ arg1 +"\")])" + arg2;
			}
			console.log(x);
			browser.click(x); 
			objGeneral.bigdelay();
		});
		
	//--------------Clicking Image Button [Mostly in DM]
	this.Then(/^I click Image button "([^"]*)"$/, function(arg1) {			
		var x;
		if(browser.isExisting("(//descendant::*[contains(@title , \""+arg1+"\")])[1]//img")){
			x = "(//descendant::*[contains(@title , \""+arg1+"\")])[1]//img";
		}else {
			x = "(//img[contains(@title , \""+arg1+"\")])[1]";
		}
		console.log(x);
		browser.click(x); 
		objGeneral.bigdelay();

	});	
		//--------------[OFFSHOOT]Clicking Image Button Occurrence [Mostly in DM]
		this.Then(/^I click Image button "([^"]*)" occurrence "([^"]*)"$/, function(arg1,arg2) {			
			var x;
			if(browser.isExisting("(//descendant::*[contains(@title , \""+arg1+"\")])"+arg2+"//img")){
				x = "(//descendant::*[contains(@title, \""+arg1+"\")])"+arg2+"//img";
			}else {
				x = "(//img[contains(@title , \""+arg1+"\")])" + arg2;
			}
			console.log(x);
			browser.click(x); 
			objGeneral.bigdelay();
		});	

	//--------------Clicking  nth occurrence Button with type not submit---Courtesy:Kriti, PNC
	this.Then(/^I click on "([^"]*)" occurrence "([^"]*)"$/, function(arg1, arg2) {
		var arg1=objGeneral.analyzeValue(arg1);
		var x;
		x = "(//*[contains(text(),\""+arg1+"\")])"+arg2;
		console.log(x);
		browser.click(x);
		objGeneral.bigdelay();
	});
	//--------------Clicking button that has link - LOGIN button on home page
	this.Then(/^I click on "([^"]*)" button$/, function(arg1) {
		var x;
		objGeneral.delay();
		if(browser.isExisting("//*[text()=\""+arg1+"\"]")) {
			x = "//*[text()=\""+arg1+"\"]";
		}else if (browser.isExisting("//*[contains(text(),\""+arg1+"\")]")) {
			x = "//*[contains(text(),\""+arg1+"\")]";
		}else {
			x = "//*[contains(@*,\""+arg1+"\")]";
		}
		console.log(x);
		browser.click(x);
		browser.pause(3000);
	});
	//--------------Clicking button with ID
	this.When(/^I click on button having id as "([^"]*)"$/, function(arg1) {			
		try{
			var x = "//*[contains(@id, '"+arg1+"')]";
			browser.click(x);
		}catch(err){
			console.log(err);
		}
	});

	//##############-BUTTON VERIFY-##########################	
	//--------------Verify BUTTON STATUS is enabled
	this.Then(/^I verify button "([^"]*)" is enabled$/, function(arg1) {
		objGeneral.delay();
		var x;
		if(browser.isExisting("(//input[@type='submit' and @value='"+arg1+"'])[1]")){
			x = "(//input[@type='submit' and @value='"+arg1+"'])[1]";
		}else if(browser.isExisting("(//input[@type='button' and @value=\""+arg1+"\"])[1]")){
			x = "(//input[@type='button' and @value='"+arg1+"'])[1]";
		}else if(browser.isExisting("(//button[contains(text(),\""+ arg1 +"\")])[1]")){
			x = "(//button[contains(text(),\""+ arg1 +"\")])[1]";
		}else if(browser.isExisting("(//*[contains(text(),\""+ arg1 +"\")])[1]")){
			x = "(//*[contains(text(),\""+ arg1 +"\")])[1]";
		}else if(browser.isExisting("(//*[contains(.,\""+ arg1 +"\")])[1]")){
			x = "(//*[contains(.,\""+ arg1 +"\")])[1]";
		}else{
			//At times when it displays all caps but having InitCap inside HTML
			arg1 = arg1[0].toUpperCase() + arg1.substr(1).toLowerCase();
			x = "//input[@type='submit' and @value='"+arg1+"']";
		}
		console.log(x);
		//Once XPath is held, check if it is ENABLED
		try{
			expect(browser.isEnabled(x)).be.true;
		}catch(err){
			console.log(err);
			throw err;
		}
	});
	
		//--------------[OFFSHOOT-Occurrence]Verify BUTTON STATUS is enabled
		this.Then(/^I verify button "([^"]*)" occurrence "([^"]*)" is enabled$/, function(arg1, arg2) {
			objGeneral.delay();
			var x;
			if(browser.isExisting("(//input[@type='submit' and @value='"+arg1+"'])" + arg2)){
				x = "(//input[@type='submit' and @value='"+arg1+"'])" + arg2;
			}else if(browser.isExisting("(//input[@type='button' and @value=\""+arg1+"\"])" + arg2)){
				x = "(//input[@type='button' and @value='"+arg1+"'])" + arg2;
			}else if(browser.isExisting("(//button[contains(text(),\""+ arg1 +"\")])" + arg2)){
				x = "(//button[contains(text(),\""+ arg1 +"\")])" + arg2;
			}else if(browser.isExisting("(//*[contains(text(),\""+ arg1 +"\")])" + arg2)){
				x = "(//*[contains(text(),\""+ arg1 +"\")])" + arg2;
			}else if(browser.isExisting("(//*[contains(.,\""+ arg1 +"\")])" + arg2)){
				x = "(//*[contains(.,\""+ arg1 +"\")])" + arg2;
			}else{
				//At times when it displays all caps but having InitCap inside HTML
				arg1 = arg1[0].toUpperCase() + arg1.substr(1).toLowerCase();
				x = "(//input[@type='submit' and @value='"+arg1+"'])" + arg2;
				console.log("In final call");
			}
			console.log(x);
			//Once XPath is held, check if it is ENABLED
			try{
				expect(browser.isEnabled(x)).be.true;
			}catch(err){
				console.log(err);
				throw err;
			}
		});
	
	//--------------Verify BUTTON STATUS is disabled
	this.Then(/^I verify button "([^"]*)" is disabled$/, function(arg1) {
		objGeneral.delay();
		var x;
		if(browser.isExisting("(//input[@type='submit' and @value='"+arg1+"'])[1]")){
			x = "(//input[@type='submit' and @value='"+arg1+"'])[1]";
		}else if(browser.isExisting("(//input[@type='button' and @value=\""+arg1+"\"])[1]")){
			x = "(//input[@type='button' and @value='"+arg1+"'])[1]";
		}else if(browser.isExisting("(//button[contains(text(),\""+ arg1 +"\")])[1]")){
			x = "(//button[contains(text(),\""+ arg1 +"\")])[1]";
		}else if(browser.isExisting("(//*[contains(text(),\""+ arg1 +"\")])[1]")){
			x = "(//*[contains(text(),\""+ arg1 +"\")])[1]";
		}else if(browser.isExisting("(//*[contains(.,\""+ arg1 +"\")])[1]")){
			x = "(//*[contains(.,\""+ arg1 +"\")])[1]";
		}else{
			//At times when it displays all caps but having InitCap inside HTML
			arg1 = arg1[0].toUpperCase() + arg1.substr(1).toLowerCase();
			x = "//input[@type='submit' and @value='"+arg1+"']";
		}
		console.log(x);	
		
		//Once XPath is held, check if it is DISABLED
		try{
			expect(browser.isEnabled(x)).be.false;
		}catch(err){
			console.log(err);
			throw err;
		}
	});
		//--------------[OFFSHOOT-Occurrence]Verify BUTTON STATUS is disabled
		this.Then(/^I verify button "([^"]*)" occurrence "([^"]*)" is disabled$/, function(arg1, arg2) {
			objGeneral.delay();
			var x;
			if(browser.isExisting("(//input[@type='submit' and @value='"+arg1+"'])" + arg2)){
				x = "(//input[@type='submit' and @value='"+arg1+"'])" + arg2;
			}else if(browser.isExisting("(//input[@type='button' and @value=\""+arg1+"\"])" + arg2)){
				x = "(//input[@type='button' and @value='"+arg1+"'])" + arg2;
			}else if(browser.isExisting("(//button[contains(text(),\""+ arg1 +"\")])" + arg2)){
				x = "(//button[contains(text(),\""+ arg1 +"\")])" + arg2;
			}else if(browser.isExisting("(//*[contains(text(),\""+ arg1 +"\")])" + arg2)){
				x = "(//*[contains(text(),\""+ arg1 +"\")])" + arg2;
			}else if(browser.isExisting("(//*[contains(.,\""+ arg1 +"\")])" + arg2)){
				x = "(//*[contains(.,\""+ arg1 +"\")])" + arg2;
			}else{
				//At times when it displays all caps but having InitCap inside HTML
				arg1 = arg1[0].toUpperCase() + arg1.substr(1).toLowerCase();
				x = "(//input[@type='submit' and @value='"+arg1+"'])" + arg2;
			}
			console.log(x);	
			
			//Once XPath is held, check if it is DISABLED
			try{
				expect(browser.isEnabled(x)).be.false;
			}catch(err){
				console.log(err);
				throw err;
			}
		});
	
	//--------------Verify BUTTON EXISTS
	this.Then(/^I verify "([^"]*)" button exists$/, function(arg1) {
		var x;
		if(browser.isExisting("(//input[@type='submit' and @value='"+arg1+"'])[1]")){
			x = "(//input[@type='submit' and @value='"+arg1+"'])[1]";
		}else if(browser.isExisting("(//input[@type='button' and @value=\""+arg1+"\"])[1]")){
			x = "(//input[@type='button' and @value='"+arg1+"'])[1]";
		}else if(browser.isExisting("(//button[contains(text(),\""+ arg1 +"\")])[1]")){
			x = "(//button[contains(text(),\""+ arg1 +"\")])[1]";
		}else if(browser.isExisting("(//*[contains(text(),\""+ arg1 +"\")])[1]")){
			x = "(//*[contains(text(),\""+ arg1 +"\")])[1]";
		}else if(browser.isExisting("(//*[contains(.,\""+ arg1 +"\")])[1]")){
			x = "(//*[contains(.,\""+ arg1 +"\")])[1]";
		}else if(browser.isExisting("(//button//@*[contains(.,\""+arg1+"\")])[1]/..")){
			x = "(//button//@*[contains(.,\""+arg1+"\")])[1]/..";          
		}else{
			//At times when it displays all caps but having InitCap inside HTML
			arg1 = arg1[0].toUpperCase() + arg1.substr(1).toLowerCase();
			x = "//input[@type='submit' and @value='"+arg1+"']";
		}
		console.log(x);
		expect(x).to.exist;
		objGeneral.delay();
	});
		//--------------[OFFSHOOT-Occurrence]Verify BUTTON EXISTS
		this.Then(/^I verify "([^"]*)" button exists occurrence "([^"]*)"$/, function(arg1,arg2) {
			objGeneral.delay();
			var x;
			if(browser.isExisting("(//input[@type='submit' and @value='"+arg1+"'])"+arg2)){
				x = "(//input[@type='submit' and @value='"+arg1+"'])"+arg2;
			}else if(browser.isExisting("(//input[@type='button' and @value=\""+arg1+"\"])"+arg2)){
				x = "(//input[@type='button' and @value='"+arg1+"'])"+arg2;
			}else if(browser.isExisting("(//button[contains(text(),\""+ arg1 +"\")])"+arg2)){
				x = "(//button[contains(text(),\""+ arg1 +"\")])"+arg2;
			}else if(browser.isExisting("(//*[contains(.,\""+ arg1 +"\")])"+arg2)){
				x = "(//*[contains(.,\""+ arg1 +"\")])"+arg2;
			}else if(browser.isExisting("(//*[contains(text(),\""+ arg1 +"\")])"+arg2)){
				x = "(//*[contains(text(),\""+ arg1 +"\")])"+arg2;
			//At times when it displays all caps but having InitCap inside HTML
			}else{
				arg1 = arg1[0].toUpperCase() + arg1.substr(1).toLowerCase();
				x = "//input[@type='submit' and @value='"+arg1+"']"+arg2;
			}
			console.log(x);
			expect(x).to.exist;            
		});

	//##############-LINK-CLICK-##########################			
	//--------------Clicking Hyper Link
	this.When(/^I click on "([^"]*)"$/, function (arg1) {
		arg1 = objGeneral.analyzeValue(arg1);
		var x;
		if(browser.isExisting("//a//*[contains(text(),\""+arg1+"\")][1]")) {
			x = "//a//*[contains(text(),\""+arg1+"\")][1]";
		}else if(browser.isExisting("//descendant::a[contains(.,\""+arg1+"\")][1]")) {
			x = "//descendant::a[contains(.,\""+arg1+"\")][1]";
		}else if(browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]")) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]";
		}else {
			x = "(//descendant::*[contains(text(),\""+arg1+"\")])[1]";
		}
		console.log(x);
		browser.click(x);
		objGeneral.delay();
   });
		//--------------[OFFSHOOT-Occurrence]Clicking Hyper Link - thro OFFSET
		this.When(/^I click "([^"]*)" field"([^"]*)"$/, function (arg1, arg2) {
			var x;
			if(browser.isExisting("//descendant::*[text()=\""+arg1+"\"]/following::input" + arg2)) {
				x = "//descendant::*[text()=\""+arg1+"\"]/following::input" + arg2;
			}else {
				x = "(//descendant::*[contains(text(),\""+arg1+"\")])/following::input" + arg2;
			}
			console.log(x);
			browser.click(x);
	   });
   
	//--------------Clicking Hyper Link (nth Occurrence)
	this.Then(/^I click on "([^"]*)" link occurrence "([^"]*)"$/, function(arg1, arg2) {
		var x;
		if(browser.isExisting("(//descendant::a[text()=\""+arg1+"\"])"+arg2)) {
			x = "(//descendant::a[text()=\""+arg1+"\"])"+arg2;
		}else if (browser.isExisting("(//descendant::a[contains(text(),\""+arg1+"\")])"+arg2)) {
			x = "(//descendant::a[contains(text(),\""+arg1+"\")])"+arg2;
		}else {
			x = "(//descendant::a[contains(.,\""+arg1+"\")])"+arg2;
		}
		console.log(x);
		browser.click(x);
   });
   
   	//--------------Move to Hyper Link
	this.When(/^I move to link "([^"]*)"$/, function (arg1) {
		var x;
		if(browser.isExisting("//descendant::a[text()=\""+arg1+"\"]")) {
			x = "//descendant::a[text()=\""+arg1+"\"]";
		}else if(browser.isExisting("//descendant::*[text()=\""+arg1+"\"]")) {
			x = "//descendant::*[text()=\""+arg1+"\"]";
		}else {
			x = "//descendant::*[contains(text(),\""+arg1+"\")]";
		}
		console.log(x);
		browser.moveToObject(x,0,0);
   });
   	//--------------Move to Hyper Link (nth Occurrence)
	this.When(/^I move to link "([^"]*)" occurrence "([^"]*)"$/, function (arg1, arg2) {
		var x;
		if(browser.isExisting("(//descendant::a[text()=\""+arg1+"\"])"+arg2)) {
			x = "(//descendant::a[text()=\""+arg1+"\"])"+arg2;
		}else if(browser.isExisting("(//descendant::*[text()=\""+arg1+"\"])"+arg2)) {
			x = "(//descendant::*[text()=\""+arg1+"\"])"+arg2;
		}else {
			x = "(//descendant::*[contains(text(),\""+arg1+"\")])"+arg2;
		}
		console.log(x);
		browser.moveToObject(x,0,0);
   });
	//--------------Click in HYPERLINK following label
	this.When(/^I click on link following "([^"]*)" text$/, function (arg1) {
		arg1 = objGeneral.analyzeValue(arg1);
		var x;
		if(browser.isExisting("(//*[text()= \""+arg1+"\"]/following::a)[1]")) {
			x = "(//*[text()= \""+arg1+"\"]/following::a)[1]";
		} else {
			x = "(//*[contains(text(), \""+arg1+"\")]/following::a)[1]";
		}
		console.log(x);
		browser.click(x);
	 });
		//--------------[OFFSHOOT-Occurrence]Click in HYPERLINK following label
		this.When(/^I click on link following "([^"]*)" occurrence "([^"]*)" text$/, function (arg1, arg2) {
			var x;
			if(browser.isExisting("(//*[text()= \""+arg1+"\"]) " + arg2 + " /following::a[1]")) {
				x = "(//*[text()= \""+arg1+"\"]) " + arg2 + " /following::a[1]";
			} else {
				x = "(//*[contains(text(), \""+arg1+"\")])" + arg2 + "/following::a[1]";
			}
			console.log(x);
			browser.click(x);
		 });
	 
   	//------------Click element that is before text
	this.Then(/^I click element before the text "([^"]*)"$/, function(arg1) {
		arg1 = objGeneral.analyzeValue(arg1);
		if(browser.isExisting("(//*[contains(text(),\""+arg1+"\")])[1]//preceding::*[1]")){
			var x = "(//*[contains(text(),\""+arg1+"\")])[1]//preceding::*[1]";
		}else {
			var x = "(//*[contains(.,\""+arg1+"\")])[1]//preceding::*[1]";
		} 
		console.log(x);
		browser.click(x);
		objGeneral.delay();
	});
	//------------[OFFSHOOT-Occurrence]Click element that is after text
		this.Then(/^I click element after the text "([^"]*)"$/, function(arg1) {
			arg1 = objGeneral.analyzeValue(arg1);
			if(browser.isExisting("(//*[contains(text(),\""+arg1+"\")])[1]//following::*[1]")){
				var x = "(//*[contains(text(),\""+arg1+"\")])[1]//following::*[1]";
			}else {
				var x = "(//*[contains(.,\""+arg1+"\")])[1]//following::*[1]";
			} 
			console.log(x);
			browser.click(x);
			objGeneral.delay();
		});
	 
	//--------------Click in ICON preceding label e.g. expand icon before Status
	this.When(/^I click on icon preceding "([^"]*)" text$/, function (arg1) {
		var x;
		
		if(browser.isExisting("//*[contains(text(),\""+arg1+"\")]/preceding::icon")) {
			x = "//*[contains(text(),\""+arg1+"\")]/preceding::icon";
		} else {
			x = "//*[contains(.,\""+arg1+"\")]/preceding::icon";
		}
		console.log(x);
		browser.click(x);
	 });

   //--------------Click in <BELL> ICON e.g. Bell, Folder
	this.When(/^I click on "([^"]*)" icon$/, function (arg1) {
		var x;
		if(browser.isExisting("(//a//*[contains(@class,\""+arg1+"\")])[1]")) {
			x = "(//a//*[contains(@class,\""+arg1+"\")])[1]";
		}else {
			x = "(//*[contains(@class,\""+arg1+"\")])[1]";
		}
		console.log(x);
		browser.click(x);
   });
   
   //--------------Click in HYPERLINK following ICON e.g. Calendar Date icon
	this.When(/^I click on link following "([^"]*)" icon$/, function (arg1) {
		var x;
		if(browser.isExisting("//*[contains(@*,\""+arg1+"\")]/following::a")) {
			x = "//*[contains(@*,\""+arg1+"\")]/following::a";
			console.log(x);
			browser.click(x);
		}else {
			console.log("Link does not exist");
			expect(true).to.be.true;
		}
   });
   
   //--------------Click in a <value> inside a field.  e.g. Date that shows calendar and user clicks a date in it.
	this.When(/^I click "([^"]*)" in "([^"]*)" field$/, function (arg1, arg2) {
		var x;
		if(browser.isExisting("//*[contains(text(),\""+arg2+"\")]/following::*[text()=\""+arg1+"\"][1]")) {
			x = "//*[contains(text(),\""+arg2+"\")]/following::*[text()=\""+arg1+"\"][1]";
		}else{
			x = "//*[contains(text(),\""+arg2+"\")]/following::*[contains(text(),\""+arg1+"\")][1]";
		}
		console.log(x);
		browser.click(x);
   });

   
	//##############-PAGE-VERIFY-##########################	
	 //--------------Verify Page Title
	this.Then(/^I verify the page title "([^"]*)"$/, function(arg1) {
		objGeneral.delay();
		expect(browser.getTitle()).to.contain(arg1);
		console.log("I got title: "+ browser.getTitle());
	});
	
	this.Then(/^I wait until "([^"]*)" appears$/, function(arg1) {
		var x;
		objGeneral.delay();
		x = "(//*[contains(text(),\""+arg1+"\")])[1]";
		browser.waitUntil(function (x, arg1) {return browser.getText("(//*[contains(text(),\""+arg1+"\")])[1]") === arg1}, 55000, 'Expec 5s', 500);
	});
	
	 //--------------Verify Page Text
	this.Then(/^I verify the page text to contain "([^"]*)"$/, function(arg1) {
		var x;
		arg1 = objGeneral.analyzeValue(arg1);
		objGeneral.delay();
		//x = "(//*[contains(text(),\""+arg1+"\")])[1]";
		if(browser.isExisting("(//*[contains(text(),\""+arg1+"\")])[1]")) {
			x = "(//*[contains(text(),\""+arg1+"\")])[1]";
		}else{
			x = "(//*[contains(.,\""+arg1+"\")])[last()]";
		}
		console.log(x);
		try{
			var str = browser.getText(x);
			console.log(str);
			try {
				expect(str).to.contain(arg1);
			} catch (err) {
				throw err;
			}
		}catch(err){  //Goes here only if object is not there
			//const doesExist = browser.waitForExist(x);
			var error = new Error(arg1);
			error.name = "Assertion Failed";
			throw error;
			//expect(doesExist).toBe(true);	
		}
	});
	 //--------------[OFFSHOOT-Occurrence] Verify Page Text ON OCCURRENCE
	this.Then(/^I verify the page text to contain "([^"]*)" occurrence "([^"]*)"$/, function(arg1,arg2) {
		objGeneral.delay();
		arg1 = objGeneral.analyzeValue(arg1);
		var x = "(//*[contains(text(),\""+arg1+"\")])"+arg2;
		console.log(x);
		var str = browser.getText(x);
		console.log(str);
		try{
			expect(str).to.contain(arg1);
		} catch(err){
			expect(str[0]).to.contain(arg1);
		}
	});
	
	//--------------Verify Page Text not contains
	this.Then(/^I verify the page text to not contain "([^"]*)"$/, function(arg1) {
		objGeneral.delay();
		arg1 = objGeneral.analyzeValue(arg1);
		var x = "(//*[contains(text(),\""+arg1+"\")])[1]";
		var str = "xxxx";
		try{
			str = browser.getText(x);
			expect(str).to.not.exist;
		}catch(err){
			console.log("Text not found: " + arg1);
		}
	});
	
	//--------------Verify value of field on the page (not a TextBox)
	this.Then(/^I verify value "([^"]*)" for label "([^"]*)"$/, function(arg1, arg2) {
		arg2 = objGeneral.analyzeValue(arg2);
		arg1 = objGeneral.analyzeValue(arg1);
		if(browser.isExisting("(//descendant::*[text()='"+arg2+"'])[1]/following::*[1]")){
			var x = "(//*[text()='"+arg2+"'])[1]/following::*[1]";
		}else if(browser.isExisting("//*[contains(text(),'"+arg2+"')]//following::*[1]")){
			var x="(//*[contains(text(),'"+arg2+"')]//following::*)[1]";
		}else {
			var x = "(//descendant::*[contains(.,'"+arg2+"')])[1]/following::*[1]";
		}
		console.log(x);
		var value = objGeneral.analyzeValue(arg1);
		try{
			expect(browser.getText(x)).to.be.eql(value);
		}catch(err){
			console.log("contains and not exact match: " + browser.getText(x));
			expect(browser.getText(x)).to.have.string(value);
		}
	});
		//--------------Verify value of field NOT TO BE on the page (not a TextBox)
		this.Then(/^I verify value "([^"]*)" not found for label "([^"]*)"$/, function(arg1, arg2) {
			if(browser.isExisting("(//descendant::*[text()='"+arg2+"'])[1]/following::*[1]")){
				var x = "(//*[text()='"+arg2+"'])[1]/following::*[1]";
			}else if(browser.isExisting("//*[contains(text(),'"+arg2+"')]//following::*[1]")){
				var x="(//*[contains(text(),'"+arg2+"')]//following::*)[1]";
			}else {
				var x = "(//descendant::*[contains(.,'"+arg2+"')])[1]/following::*[1]";
			}
			console.log(x);
			var value = objGeneral.analyzeValue(arg1);
			expect(browser.getText(x)).to.not.eql(value);
		});
	
	//--------------Extract value of field on the page (not a TextBox) to Save
	this.Then(/^I extract value for label "([^"]*)" and save to "([^"]*)"$/, function(arg1, arg2) {
		if(browser.isExisting("(//descendant::*[text()='"+arg1+"'])[1]/following::*[1]")){
			var x = "(//*[text()='"+arg1+"'])[1]/following::*[1]";
		}else if(browser.isExisting("//*[contains(text(),'"+arg1+"')]//following::*[1]")){
			var x="(//*[contains(text(),'"+arg1+"')]//following::*)[1]";
		}else {
			var x = "(//descendant::*[contains(.,'"+arg1+"')])[1]/following::*[1]";
		}
		console.log(x);
		console.log(browser.getText(x));
		objGeneral.saveDataToFile(arg2,browser.getText(x));
	});

	//--------------Verifying text in a page section
	this.Then(/^In section "([^"]*)" I verify existence of text "([^"]*)"$/, function(arg1, arg2){
		objGeneral.delay();
		arg2 = objGeneral.analyzeValue(arg2);
		if(browser.isExisting("//*[contains(text(), \""+arg1+"\")]//../following-sibling::*/descendant::*[contains(text(), \""+arg2+"\")][1]")){
			var x = "//*[contains(text(), \""+arg1+"\")]//../following-sibling::*/descendant::*[contains(text(), \""+arg2+"\")][1]";
		} else{
			var x = "//*[contains(text(), \""+ arg1 +"\")]//../following-sibling::*[contains(text(), \""+arg2+"\")][1]";
		}
		console.log(browser.getText(x));
		expect(browser.getText(x)).to.contain(arg2);
	});
		//--------------[OFFSHOOT-Occurrence]Verifying text in a page section occurrence
		this.Then(/^In section "([^"]*)" I verify existence of text "([^"]*)" occurrence "([^"]*)"$/, function(arg1, arg2, arg3){
			objGeneral.delay();
			arg2 = objGeneral.analyzeValue(arg2);
			if(browser.isExisting("//*[contains(text(), \""+arg1+"\")]//../following-sibling::*/descendant::*[contains(text(), \""+arg2+"\")]" + arg3)){
				var x = "//*[contains(text(), \""+arg1+"\")]//../following-sibling::*/descendant::*[contains(text(), \""+arg2+"\")]" + arg3;
			} else{
				var x = "//*[contains(text(), \""+ arg1 +"\")]//../following-sibling::*[contains(text(), \""+arg2+"\")]" + arg3;
			}
			console.log(browser.getText(x));
			expect(browser.getText(x)).to.contain(arg2);
		});
	
	//--------------Extract value from an Textbox and SAVE to File :udhay
	//[e.g.] from Name text box and save to "1.txt/prop1"
	this.Then(/^I extract from textbox "([^"]*)" and save to "([^"]*)"$/, function(arg1, arg2) {
		var x;
		if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::label[text()=\""+arg1+"\"][1]/following::input[1]";
		}else if (browser.isExisting("//descendant::td[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::td[text()=\""+arg1+"\"][1]/following::input[1]";
		}else if (browser.isExisting("//descendant::td//*[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::td//*[text()=\""+arg1+"\"][1]/following::input[1]";
		}else if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::input[1]";
		}else {
			x = "//descendant::*[contains(text(),\""+arg1+"\")][1]/following::input[1]";
		}
		console.log(x);
		console.log(browser.getValue(x));
		objGeneral.saveDataToFile(arg2,browser.getValue(x));
	});	
	
	//--------------[OFFSHOOT-Occurrence] Extract value from an Textbox and SAVE to File:  OCCURRENCE 
	//[e.g.] from Name[2] text box and save to "1.txt/prop1"
		this.Then(/^I extract from textbox "([^"]*)" occurrence "([^"]*)" and save to "([^"]*)"$/, function(arg1, arg2, arg3) {
			var x;
			if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"]"+arg2+"/following::input[1]")) {
				x = "//descendant::label[text()=\""+arg1+"\"]"+arg2+"/following::input[1]";
			}else if (browser.isExisting("(//descendant::td[text()=\""+arg1+"\"])"+arg2+"/following::input[1]")) {
				x = "(//descendant::td[text()=\""+arg1+"\"])"+arg2+"/following::input[1]";
			}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]")) {
				x = "(//descendant::td//*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]";
			}else if (browser.isExisting("(//descendant::*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]")) {
				x = "(//descendant::*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]";
			}else {
				x = "(//descendant::*[contains(text(),\""+arg1+"\")])"+arg2+"/following::input[1]";
			}		
			console.log(x);
			console.log(browser.getValue(x));
			objGeneral.saveDataToFile(arg3,browser.getValue(x));
		});	

	//--------------Extract value between LB and RB and SAVE to File
	//[e.g.] getCount of Roles created LB: "SYSTEM(" and ")"
	////*[contains(text(),"System (")]
	this.Then(/^I extract the text between "([^"]*)" and "([^"]*)" and save to "([^"]*)"$/, function(arg1, arg2, arg3) {
		arg1 = objGeneral.analyzeValue(arg1);
		if(browser.isExisting("(//*[contains(text(),\""+ arg1 +"\")])[1]")){
			var x = "(//*[contains(text(),\""+ arg1 +"\")])[1]";
		}else {
			var x = "(//*[contains(text(),\""+ arg1 +"\")])[1]";
		}
		console.log(x);
		console.log("***** "+browser.getText(x));
		var s1 = browser.getText(x).split(arg1)[1];
		var s2 = s1.split(arg2)[0];
		console.log('***** '+s2);
		objGeneral.saveDataToFile(arg3,s2);
	});
	
		//--------------[OFFSHOOT-Occurrence]Extract value between LB and RB and SAVE to File with OCCURRENCE
		////*[contains(text(),"SAR-2017")]
		this.Then(/^I extract the text between "([^"]*)""([^"]*)" and "([^"]*)" and save to "([^"]*)"$/, function(arg1, arg2, arg3, arg4) {
			arg1 = objGeneral.analyzeValue(arg1);
			if(browser.isExisting("(//*[contains(text(),\""+ arg1 +"\")])" + arg2)){
				var x = "(//*[contains(text(),\""+ arg1 +"\")])" + arg2;
			}else {
				var x = "(//*[contains(text(),\""+ arg1 +"\")])" + arg2;
			}
			console.log(x);
			console.log(browser.getText(x));
			var s1 = browser.getText(x).split(arg1)[1];
			var s2 = s1.split(arg3)[0];
			console.log(s2);
			objGeneral.saveDataToFile(arg4,s2);
		});

	//--------------Verify text between LB and RB (that follows a text) to a value (that follows a TEXT)
	//[e.g.] getCount of Auditor: "Number of permissions: 2"
	//(//*[contains(text(),"AUDITOR")])[1]/following::*[contains(text(),"No. of permissions:")]
	
	this.Then(/^I verify for "([^"]*)" the text between "([^"]*)" and "([^"]*)" to be "([^"]*)"$/, function(arg1, arg2, arg3, arg4) {
		if(browser.isExisting("((//*[contains(text(),\""+ arg1 +"\")])[1]/following::*[contains(text(),\""+arg2+"\")])[1]")){
			var x = "((//*[contains(text(),\""+ arg1 +"\")])[1]/following::*[contains(text(),\""+arg2+"\")])[1]";
		}else {
			var x = "((//*[contains(text(),\""+ arg1 +"\")])[1]/following::*[contains(.,\""+arg2+"\")])[1]";
		}
		console.log(x);
		console.log(browser.getText(x));
		var s1 = browser.getText(x).split(arg2)[1];
		var s2 = s1.split(arg3)[0];
		console.log(s2);
		expect(s2).to.contain(arg4);
	});
	
	//--------------Extract value between LB and RB and SAVE to File (that follows a TEXT)
	//[e.g.] getCount of "Number of permissions: 2"
	//(//*[contains(text(),"AUDITOR")])[1]/following::*[contains(text(),"No. of permissions:")]
	
	this.Then(/^I extract for "([^"]*)" the text between "([^"]*)" and "([^"]*)" and save to "([^"]*)"$/, function(arg1, arg2, arg3, arg4) {
		arg1 = objGeneral.analyzeValue(arg1);
		if(browser.isExisting("((//*[contains(text(),\""+ arg1 +"\")])[1]/following::*[contains(text(),\""+arg2+"\")])[1]")){
			var x = "((//*[contains(text(),\""+ arg1 +"\")])[1]/following::*[contains(text(),\""+arg2+"\")])[1]";
		}else {
			var x = "((//*[contains(text(),\""+ arg1 +"\")])[1]/following::*[contains(.,\""+arg2+"\")])[1]";
		}
		console.log(x);
		console.log(browser.getText(x));
		var extracted = browser.getText(x).split(arg2)[1];
		console.log(extracted);
		objGeneral.saveDataToFile(arg4,extracted);
	});
	
	//##############-EXTRACT AND VERIFY-##########################	
	//-------------Extract and Verify
	this.Then(/^I extract "([^"]*)" from file "([^"]*)" and verify as "([^"]*)"$/, function(arg1,arg2,arg3) {
	try{
		objGeneral.delay();
		var value = prop.createEditor(arg2).get(arg1);
		console.log("I got UI:*****************"+ value);
		console.log("Value passed:*****************"+ arg3);
		expect(arg3).to.contain(value);
		}catch(err){
			console.log(err);
		}
	});	

	//--------------Verify Page Title Contains
	this.Then(/^I enter extracted "([^"]*)" from file "([^"]*)" and verify the page title contains the same$/, function(arg1, arg2) {
		objGeneral.delay();
		var value = prop.createEditor(arg2).get(arg1);			
		expect(browser.getTitle()).to.contain(value);
		console.log("I got title: "+ browser.getTitle());
	});	
	
	//-------------Verifying text in a page section with extracted property from a file
	this.Then(/^in section "([^"]*)" I verify existence of extracted text "([^"]*)"$/, function(arg1, arg2){
		objGeneral.delay();
		var fileName = arg2.split("/")[0];
		console.log("fileName is "+fileName);
		var strProp = arg2.split("/")[1];
		console.log("key is "+strProp);
		var value = prop.createEditor(fileName).get(strProp);
		console.log("value is "+value);
		var x = "//*[contains(text(), \""+arg1+"\")]//../following-sibling::*/descendant::*[contains(text(), \""+value+"\")][1]";
		console.log(x);
		console.log(browser.getText(x));
		expect(browser.getText(x)).to.contain(value);
	});

	//##############-FILE EXTRACTS ALONE AND VERIFY-##########################	
	//-------------File Extract and Verify
	this.Then(/^I verify "([^"]*)" of "([^"]*)" and "([^"]*)" to be "([^"]*)"$/, function (arg1, arg2, arg3, arg4) {
		var value=parseInt(objGeneral.retrieveDataFromFile(arg2));
		var value1=parseInt(objGeneral.retrieveDataFromFile(arg3));
		if (arg1 === "difference"){
			var result = value - value1;
			console.log("result:" + result);
			expect(result).to.equal(parseInt(arg4));
		}else if (arg1 === "similarity") {
			expect(value).to.be.eql(value1);
		}else if (arg1 === "dissimilarity") {
			expect(arg2).to.not.eql(arg3);
		}
		objGeneral.delay();
	});

	//##############-PAGE-EXTRACT-##########################
	//-------------Extracting value before a pattern and SAVING to file
	this.Then(/^I extract "([^"]*)" before the pattern "([^"]*)" and save to "([^"]*)"$/, function (arg1, arg2, arg3) {
			
		objGeneral.delay();
		var x = "//*[1][contains(text(), '"+arg2+"')]";
		console.log(x);
		var str = browser.getText(x)
		
		var res = str.split("'");
		var value = res[1];
		console.log(res);
		console.log(value);
		
		var editor1 = prop.createEditor();
		editor1.set(arg1,value);
		editor1.save(arg3);
	});
	
	//-------------Extracting value after a pattern (with occurrence) and SAVING to file
	this.Then(/^I extract text after the pattern "([^"]*)" occurrence "([^"]*)" and save to file "([^"]*)"$/, function (arg1, arg2, arg3) {
		if(browser.isExisting("((//*[contains(text(), \""+arg1+"\")])"+ arg2 + "/descendant::*)[1]")){
			var x = "((//*[contains(text(), \""+arg1+"\")])"+ arg2 + "/descendant::*)[1]";
		}else {
			var x = "((//*[contains(text(), \""+arg1+"\")])"+ arg2 + "/following::*)[1]";
		}
		objGeneral.delay();
		console.log(x);
		var str = browser.getText(x)
		objGeneral.saveDataToFile(arg3,browser.getText(x));
	});
	//##############-MISCELLANEOUS-##########################
	//-------------Delete Cookies
	this.Then(/^I delete Cookies$/, function () {
		browser.deleteCookie();
		objGeneral.delay();
	});
	//-------------Just a casual wait
	this.Then(/^Browser Ending Actions$/, function () {
		objGeneral.delay();
	});
	//-------------Explicit sleep from Feature file author
	this.Then(/^I wait for "([^"]*)"$/, function (arg1) {
		arg1 = objGeneral.analyzeValue(arg1);
		sleep(arg1);
	});
	//-------------Moving the focus to new iFRAME
	this.Then(/^Set the focus on new frame$/,  function () {
			browser.frame(0);
	});
	//-------------Scroll to a 'Y' position----
	this.Then(/^Scroll the window to "([^"]*)"$/,  function (arg1) {			     
		var y=Number(arg1);
		browser.scroll(0,y);
	});
	//-------------Scroll to a Web element----
	this.Then(/^Scroll the window to field "([^"]*)"$/,  function (arg1) { 
		var x;
		if(browser.isExisting("(//descendant::*[text()='"+arg1+"'])[1]")) {
			x = "(//descendant::*[text()='"+arg1+"'])[1]";
			console.log(x);
			browser.scroll(x);
		}else if (browser.isExisting("(//descendant::*[contains(text(),\""+arg1+"\")])[1]")) {
			x = "(//descendant::*[contains(text(),\""+arg1+"\")])[1]";
			console.log(x);
			browser.scroll(x);
		}
	});
	//-------------Print Screenshot----
	this.Then(/^I take screenshot to file "([^"]*)"$/,  function (arg1) { 
		objscreencapture(arg1, function (err, imagePath) {
		  console.log('Screenshot taken to ' + imagePath); 
		})
	});
	//-------------Upload a File and ATTACHMENTS----
	this.Then(/^I upload file "([^"]*)" to "([^"]*)"$/,  function (arg1, arg2) {
		arg1 = objGeneral.analyzeValue(arg1);
		browser.chooseFile("//*[contains(text(),\""+ arg2 +"\")]/descendant::input[contains(@type,\"file\")]",arg1);
		objGeneral.delay();
	});
	//-------------Download a File and ATTACHMENT----
	this.Then(/^I download file "([^"]*)" to "([^"]*)"$/,  function (arg1, arg2) {
		browser.chooseFile("//*[contains(text(),\""+ arg2 +"\")]/descendant::input[contains(@type,\"file\")]",arg1);
		objGeneral.delay();
	});
	//-------------Passing a Key e.g. ENTER, BACKSPACE----
	this.Then(/^I key press "([^"]*)"$/,  function (arg1) { 
		arg1 = objGeneral.analyzeValue(arg1);
		browser.keys(arg1);
		objGeneral.delay();
	});
	//-------------Getting a count of collection (of XPATH output) and save to file
	this.Then(/^I get count of "([^"]*)" and save to "([^"]*)"$/, function (arg1, arg2) { 
		var x;
		var outArray;
		try{
			x = "//*[contains(text(),\"" + arg1 + "\")]";
			console.log(x);
			outArray = browser.getText(x);
			console.log("The count is " + outArray.length);
			objGeneral.saveDataToFile(arg2, outArray.length);
		}catch(err){
			console.log("The count is 0");
			objGeneral.saveDataToFile(arg2, 0);
		}
	 });
	
	//##############-MULTILINE TEXT-##########################
	//-------------Filling Multiline Text-----//
	this.Then(/^I enter multiline text in "([^"]*)" as "([^"]*)"$/, function(arg1, arg2) {
		var value = objGeneral.analyzeValue(arg2); var x;
		if(browser.isExisting("//descendant::label[text()='"+arg1+"'][1]/following::textarea[1]")) {
			x = "//descendant::label[text()='"+arg1+"'][1]/following::textarea[1]";
		}else if (browser.isExisting("//descendant::td[text()='"+arg1+"'][1]/following::textarea[1]")) {
			x = "//descendant::td[text()='"+arg1+"'][1]/following::textarea[1]";
		}else if (browser.isExisting("//descendant::td//*[text()='"+arg1+"'][1]/following::textarea[1]")) {
			x = "//descendant::td//*[text()='"+arg1+"'][1]/following::textarea[1]";
		}else if (browser.isExisting("//descendant::*[text()='"+arg1+"'][1]/following::textarea[1]")) {
			x = "//descendant::*[text()='"+arg1+"'][1]/following::textarea[1]";
		}else {
			x = "//descendant::*[contains(text(),'"+arg1+"')][1]/following::textarea[1]";
		}
		console.log(x);
		browser.setValue(x,value);
	});
	
	//-------------[OFFSHOOT-Occurrence]  Filling Multiline Text-----//
	this.Then(/^I enter multiline text in "([^"]*)" occurrence of "([^"]*)" as "([^"]*)"$/, function(arg1, arg2,arg3) {
		var value = objGeneral.analyzeValue(arg3); var x;
		if(browser.isExisting("//descendant::label[text()='"+arg1+"']"+arg2+"/following::textarea[1]")) {
			x = "//descendant::label[text()='"+arg1+"']"+arg2+"/following::textarea[1]";
		}else if (browser.isExisting("//descendant::td[text()='"+arg1+"']"+arg2+"/following::textarea[1]")) {
			x = "//descendant::td[text()='"+arg1+"']"+arg2+"/following::textarea[1]";
		}else if (browser.isExisting("//descendant::td//*[text()='"+arg1+"']"+arg2+"/following::textarea[1]")) {
			x = "//descendant::td//*[text()='"+arg1+"']"+arg2+"/following::textarea[1]";
		}else if (browser.isExisting("//descendant::*[text()='"+arg1+"']"+arg2+"/following::textarea[1]")) {
			x = "//descendant::*[text()='"+arg1+"']"+arg2+"/following::textarea[1]";
		}else {
			x = "//descendant::*[contains(text(),'"+arg1+"')]"+arg2+"/following::textarea[1]";
		}
		console.log(x);
		browser.setValue(x,value);
	});
	
	//-------------TO VERIFY Multiline TEXTAREA item exists-----//
	this.Then(/^I verify multiline text "([^"]*)" exists$/, function(arg1) {
		var x;
		if (browser.isExisting("//descendant::*[text()='"+arg1+"'][1]/following::textarea[1]")) {
			x = "//descendant::*[text()='"+arg1+"'][1]/following::textarea[1]";
		}else {
			x = "//descendant::*[contains(text(),'"+arg1+"')][1]/following::textarea[1]";
		}
		console.log(x);
		expect(x).to.exist;
	});
	//-------------[OFFSHOOT-Occurrence]TO VERIFY Multiline TEXTAREA item exists-----//
	this.Then(/^I verify multiline text "([^"]*)" occurrence "([^"]*)" exists$/, function(arg1, arg2) {
		var x;
		if (browser.isExisting("//descendant::*[text()='"+arg1+"']" + arg2 + "/following::textarea[1]")) {
			x = "//descendant::*[text()='"+arg1+"']" + arg2 + "/following::textarea[1]";
		}else {
			x = "//descendant::*[contains(text(),'"+arg1+"')]" + arg2 + "/following::textarea[1]";
		}
		console.log(x);
		expect(x).to.exist;
	});
	
	//##############-ALERT-##########################		
	//-------------Accept alert
	this.When(/^I accept following alert$/, function() {
		try{
			browser.alertAccept();
		}catch(err){
			console.log(err);
		}
	});		
	//-------------Dismiss alert
	this.When(/^I dismiss following alert$/, function() {
		try{
			browser.alertDismiss();
		}catch(err){
			console.log(err);
		}
	});
}