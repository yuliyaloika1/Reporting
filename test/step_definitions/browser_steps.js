const {browser} = require("protractor");
const { When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('chai');
const EC = protractor.ExpectedConditions;
setDefaultTimeout(60000);

When ('I open {string} url', function(url) {
    return browser.get(url);
});

Then(/^Page title should (not )?be  "([^"]*)"$/, async function(notArg, title) {
 const pageTitle = await browser.getTitle();
 if (notArg) {
    expect(pageTitle).to.not.be.equal(title);
 } else {
    expect(pageTitle).to.be.equal(title);
 }
 
});

When ('I wait "{int}" seconds', function(timeInSeconds) {
    return browser.sleep(timeInSeconds * 1000);
});