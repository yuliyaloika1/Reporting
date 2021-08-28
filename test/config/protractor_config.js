const path = require('path');
const yargs = require('yargs').argv;
const reporter = require('cucumber-html-reporter');
const cucumberJunitConvert = require('cucumber-junit-convert');

const reportOptions = {
    theme: 'bootstrap',
    jsonFile: path.join(__dirname, '../reports/report.json'),
    output: path.join(__dirname, '../reports/cucumber-report.html'),
    reportSuitesAsScenarios: true
};

const options = {
    inputJsonFile: path.join(__dirname, '../reports/report.json'),
    outputXmlFile: path.join(__dirname, '../reports/report.xml'),
}

exports.config = {
    allScriptsTimeout: 60000,
    getPageTimeout: 60000,
    specs: [path.resolve('./test/features/**/*.feature')],
    framework: 'custom',
    frameworkPath: require.resolve('@stroiman/protractor-cucumber-framework'),
    capabilities: {
        shardTestFiles: true,
        browserName: 'chrome',
        chromeOptions: {
            args: ['--no-sandbox', '--window-size=1920,1080']
        },
        shardTestFiles: yargs.instances > 1,
        maxInstances: yargs.instances || 1,
    },
    disableChecks: true,
    directConnection: true,
    cucumberOpts: {
        strict: false,
        require: [path.resolve('./test/step_definitions/**/*.js')],
        ignoreUncaughtExceptions: true,
        format: ['json:./test/reports/report.json', './node_modules/@cucumber/cucumber-pretty'],
        tags: yargs.tags || '@smoke'
    }
    onPrepare: () => {
        return browser.waitForAngularEnabled(false);
    },
    afterLaunch: () => {
        cucumberJunitConvert.convert(options);
        return reporter.generate(reportOptions)
    }
};