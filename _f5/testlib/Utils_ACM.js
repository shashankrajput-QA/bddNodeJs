var objGeneral = require('./UtilsGen.js');
const expect = require('chai').expect;

module.exports = function() {
	
   	// ------------Click icon (plus / minus) that is before text
	this.Then(/^I click "([^"]*)" icon before the text "([^"]*)"$/, function(arg1, arg2) {
		arg2 = objGeneral.analyzeValue(arg2);
		if(browser.isExisting("//*[contains(text(),\""+arg2+"\")]//preceding::*[contains(@*,\""+arg1+"\")][1]")){
			var x = "//*[contains(text(),\""+arg2+"\")]//preceding::*[contains(@*,\""+arg1+"\")][1]";
		}else {
			var x = "//*[contains(.,\""+arg2+"\")]//preceding::*[contains(@*,\""+arg1+"\")][1]";
		} 
		console.log(x);
		browser.click(x);
		objGeneral.delay();
	});
   	// ------------[OFFSHOOT-OCCURRENCE]Click icon (plus / minus) that is before text
		this.Then(/^I click "([^"]*)" icon before the text "([^"]*)" occurrence "([^"]*)"$/, function(arg1, arg2, arg3) {
			arg2 = objGeneral.analyzeValue(arg2);
			if(browser.isExisting("((//*[contains(text(),\""+arg2+"\")])" + arg3 + "//preceding::*[contains(@class,\""+arg1+"\")])[last()]")){
				var x = "((//*[contains(text(),\""+arg2+"\")])" + arg3 + "//preceding::*[contains(@class,\""+arg1+"\")])[last()]";
			}else {
				var x = "((//*[contains(.,\""+arg2+"\")])" + arg3 + "//preceding::*[contains(@class,\""+arg1+"\")])[last()]";
			} 
			console.log(x);
			browser.click(x);
			objGeneral.delay();
		});

   	// ------------Click icon (plus / minus) following the text
	this.Then(/^I click "([^"]*)" icon after the text "([^"]*)"$/, function(arg1, arg2) {
		arg2 = objGeneral.analyzeValue(arg2);
		if(browser.isExisting("(//*[contains(text(),\""+arg2+"\")]//following::*[contains(@*,\""+arg1+"\")])[1]")){
			var x = "(//*[contains(text(),\""+arg2+"\")]//following::*[contains(@*,\""+arg1+"\")])[1]";
		}else{
			var x = "(//*[contains(.,\""+arg2+"\")]//following::*[contains(@*,\""+arg1+"\")])[1]";
		}
		console.log(x);
		browser.click(x); 
		objGeneral.delay();
	});
		// ------------[OFFSHOOT-OCCURRENCE] Click icon (plus / minus) following the text (or even 'Date')
		this.Then(/^I click "([^"]*)" icon after the text "([^"]*)""([^"]*)"$/, function(arg1, arg2, arg3) {
			arg2 = objGeneral.analyzeValue(arg2);
			if(browser.isExisting("(//*[contains(text(),\""+arg2+"\")])"+arg3+"//following::*[contains(@*,\""+arg1+"\")]")){
				var x = "(//*[contains(text(),\""+arg2+"\")])"+ arg3 +"//following::*[contains(@*,\""+arg1+"\")]";
				console.log(x);
				browser.click(x); 
				objGeneral.delay();
			}else if(browser.isExisting("(//*[contains(.,\""+arg2+"\")])"+arg3+"//following::*[contains(@*,\""+arg1+"\")]")){
				var x = "(//*[contains(.,\""+arg2+"\")])"+ arg3 +"//following::*[contains(@*,\""+arg1+"\")]";
				console.log(x);
				browser.click(x); 
				objGeneral.delay();
			}
		});

	//------------Checks the count of the search results of Enables/Disabled task templates and verifies the list. 
	this.Then(/^I verify "([^"]*)" icon list for "([^"]*)" type search results$/, function(arg1, arg2) {   
		var x = "(//*[contains(text(),\""+arg2+"\")])[2]//following::icon[contains(@title,'Enable task template')]" ;
		console.log(x);
		var enabledCount = Object.keys(browser.elements(x).value).length;
		console.log("enabledCount: "+enabledCount); 
		var y = "(//*[contains(text(),\""+arg2+"\")])[2]//following::icon[contains(@title,'Disable task template')]" ;
		console.log(y);
		var disabledCount = Object.keys(browser.elements(y).value).length;  
		console.log("disabledCount :"+disabledCount);                           
		if(arg1=='Enabled'){
			expect(enabledCount).to.be.eql(0);
		} 
		else if(arg1=='Disabled'){
			expect(disabledCount).to.equal(0);         
		}
	});
	
	//--------------Count of S-Entities on Left pane to Grid Footer of S-Entities [for ACM]          
	this.Then(/^I verify count of "([^"]*)""([^"]*)" equal to count of "([^"]*)"$/, function(arg1,arg2,arg3){
		objGeneral.delay();
		try{
			//from Left Pane
			var x = "(//*[contains(text(),\""+arg1+"\")])"+arg2+"/../span";
			console.log(x);
			var SECount_LeftPlane=browser.getText(x);
			console.log("******SECount_LeftPane*******"+SECount_LeftPlane);
			
			//from Grid Footer
			var y="//table//following::*[contains(.,\""+arg3+"\")]"
			console.log(y);
			var LeftFooterCount=browser.getText(y);
			var strIndex=LeftFooterCount[0]; //to remove multiple occurrences from display
			var res1 = strIndex.indexOf("PAGE");
			var res2 = strIndex.indexOf("of ");
			var res3=res2+3; //to remove "of "
			var res4=res1-1; //to remove "\n"
			console.log("****res1***"+res1+"****res2****"+res2+"****res3****"+res3+"****res4****"+res4);

			var strTotalRecords = strIndex.substr(res3, res4-res3);
			console.log("strTotalRecords= " + strTotalRecords);
			
			//Assertion
			expect(SECount_LeftPlane).to.be.eql(strTotalRecords);

		}catch(err){
			console.log(err);
		}
	});
	
	//--------------Records Per Page Indicator [for ACM]
	this.Then(/^I verify records per page as "([^"]*)"$/, function(arg1){
		objGeneral.delay();
		try{
			var x = "//table//following::*[contains(.,\"Showing\")]";
			console.log(x);
			
			var LeftFooterCount=browser.getText(x);
			console.log("******LeftFooterCount*******"+LeftFooterCount);
			var strIndex1=LeftFooterCount[0];
			console.log("******strIndex1*******"+strIndex1);
			
			var strIndex=strIndex1.split(" ");
			console.log("******strIndex*******"+strIndex[1]); //Will be e.g. 1-10, 11-20 etc.
			expect(arg1).to.be.eql(strIndex[1]);
		}catch(err){
			console.log(err);
		}
	});
	
	//--------------Compare 2 values (that were extracted from web page) present in the property file [for ACM] - can be true or can be false
	this.Then(/^I compare "([^"]*)" with "([^"]*)" to be "([^"]*)"$/, function(arg1,arg2,arg3){
		objGeneral.delay();
		try{
			var value=objGeneral.retrieveDataFromFile(arg1);
			var value1=objGeneral.retrieveDataFromFile(arg2);
			var compareBoolean=value==value1;
			var compareValue=compareBoolean.toString();
			console.log("*****compareBoolean***"+compareBoolean);
			expect(compareValue).to.be.eql(arg3);
		}catch(err){
			throw err;
		}
	});
	
	//--------------Verify Page Text to deal with different cases [for ACM]
	//[e.g.] I verify page text "HOME" for "Home"
	this.Then(/^I verify page text "([^"]*)" for "([^"]*)"$/, function(arg1,arg2){
		objGeneral.delay();
		var x = "(//*[contains(text(),\""+arg2+"\")])[1]";
		console.log(x);
		var str = browser.getText(x);
		console.log(str);
		try{
			expect(str).to.contain(arg1);
		} catch(err){
			expect(str[0]).to.contain(arg1);
		}
	});

	//--Click on child <tag> of a parent with ID [for ACM: SELECT ALL in Single Tasks - Contributor: Sindhu Koti]
	this.Then(/^I click child "([^"]*)" occurence "([^"]*)" of parent id "([^"]*)"$/, function(arg1,arg2,arg3) {                                           
		try{
			var x = "//*[contains(@id, '"+arg3+"')]/child::"+arg1+arg2;
			console.log(x);
			browser.click(x);
		}catch(err){
			console.log(err);
		}
	});
	
	//-------------Verifying the value of Priority of an Alert using Status of the alert
	this.Then(/^I verify the text existence for "([^"]*)""([^"]*)" as "([^"]*)"$/, function (arg1,arg2,arg3) {
		objGeneral.delay();
		var x = "(//*[contains(text(),\""+arg1+"\")])"+arg2+"//preceding::*[contains(text(),\""+arg3+"\")][1]";
		console.log(x);
		if(browser.isExisting(x)){
			expect(x).to.exist
		}
	});

	//--Verifying Priority Button doesnt exist after clicking Alert
	this.Then(/^I verify "([^"]*)" button does not exist$/, function (arg1) {
		var x = "(//button//@*[contains(.,\""+arg1+"\")])[1]/..";
		console.log(x);
		if(browser.isExisting(x)){
		expect(false).to.be.true;
		}
	});

	//--Verifying a text that follows another text
	//e.g. I verify for "FicoRole" following text "No. of permissions" as "No. of permissions: 2"
	this.Then(/^I verify for "([^"]*)" following text "([^"]*)" as "([^"]*)"$/, function (arg1, arg2, arg3) {
		arg1 = objGeneral.analyzeValue(arg1);
		var x = "((//*[contains(text(),\"" +arg1 + "\")])[1]//following::*[contains(text(),\"" + arg2 + "\")])[1]";
		console.log(x);
		var str = browser.getText(x);
		console.log(str);
		try{
			expect(str).to.contain(arg3);
		} catch(err){
			console.log("Error");
		}
	});
	this.Then(/^I extract the text after icon "([^"]*)""([^"]*)" and save to "([^"]*)"$/, function (arg1, arg2,arg3) {
		arg1 = objGeneral.analyzeValue(arg1);
		var x = "(//*[contains(@*,\"" +arg1 + "\")])"+arg2+"/../..";
		console.log(x);
		var str=browser.getText(x);
		console.log(str);
		objGeneral.saveDataToFile(arg3,str);
	});
	
	//--Verifying a icon is disbaled after some text
	//I verify icon following "SENAME""[last()]" is disabled
	this.When(/^I verify icon following "([^"]*)""([^"]*)" is "([^"]*)"$/, function (arg1,arg2,arg3) {
		arg1 = objGeneral.analyzeValue(arg1);

		var x = "(//*[contains(text(),\"" +arg1 + "\")])"+arg2+"/following::icon[1]";
		console.log(x);
		console.log(browser.getAttribute(x,"class"));
		var str=browser.getAttribute(x,"class");
		expect(str).to.be.eql(arg3)
	});
	
	//Verify link after some text is enbled/disabled
	//When I verify link following "Resubmission:""[last()]" is "disabled"
	this.When(/^I verify link following "([^"]*)""([^"]*)" is "([^"]*)"$/, function (arg1,arg2,arg3) {
	arg1 = objGeneral.analyzeValue(arg1);
	var x = "(//*[contains(text(),\"" +arg1 + "\")])"+arg2+"/following::a[1]";
	console.log(x);
	console.log(browser.getAttribute(x,"class"));
	var str=browser.getAttribute(x,"class");
	expect(str).to.contain(arg3)
	});
	
	//--------------Click in HYPERLINK following label with index(after text 2nd or 3rd link)
	//I click on link following "Role:" text with index"[2]"
	this.Then(/^I click on link following "([^"]*)" text with index"([^"]*)"$/, function (arg1,arg2) {
		arg1 = objGeneral.analyzeValue(arg1);
		var x;
		if(browser.isExisting("//*[text()= \""+arg1+"\"]/following::a"+arg2)) {
			x = "//*[text()= \""+arg1+"\"]/following::a"+arg2;
		}
		console.log(x);
		browser.click(x);
	});
	 
	 //--------------Verify BUTTON EXISTS
	 //Then I verify "fico-icon-stats-growth2" button does not exists
	this.Then(/^I verify "([^"]*)" button does not exists$/, function(arg1) {
		var x;
		if(browser.isExisting("(//*[contains(text(),\""+ arg1 +"\")])[1]")){
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
		expect(browser.isExisting(x)).to.be.false;
		objGeneral.delay();
	});
	
	//--------Verify TABLE HEADER TEXT-------
	this.Then(/^I verify table header as "([^"]*)"$/, function(arg1) {
		var x;
		if(browser.isExisting("(//th[contains(text(),\""+ arg1 +"\")])[1]")){
			x = "(//th[contains(text(),\""+ arg1 +"\")])[1]";
		}
		console.log(x);
		expect(browser.isExisting(x)).to.be.true;
		objGeneral.delay();
	});
	
	this.Then(/^I extract value for text "([^"]*)" and save to "([^"]*)"$/, function(arg1, arg2) {
		if(browser.isExisting("//*[contains(text(),'"+arg1+"')]//following::*[1]")){
		var x="(//*[contains(text(),'"+arg1+"')])[1]";
		}else {
		var x = "(//*[contains(.,'"+arg1+"')])[1]";
		}
	console.log(x);
	console.log(browser.getText(x));
	objGeneral.saveDataToFile(arg2,browser.getText(x));
	});
}
