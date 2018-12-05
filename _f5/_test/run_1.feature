# Create Application
Feature: Create Application

@ignore
Scenario:gmail [121,131,141,151]
	Then I delete Cookies
        Given I open url "http://www.google.com"
		Then I click button "Page 1"

@watch
Scenario: Facebook [171,161,151]
	Then I delete Cookies
        Given I open url "https://www.facebook.com"

@ignore
Scenario: linkedIn
	Then I delete Cookies
        Given I open url "http://www.linkedin.com"
		Then I click button "Page 1"

@watch
Scenario: w3shchools [121,131,141]
	Then I delete Cookies
        Given I open url "http://www.w3schools.com"
