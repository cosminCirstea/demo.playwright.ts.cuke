/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const reporter = require('cucumber-html-reporter');
const date = new Date();
const currentDate = date.getDate() + '_' + (date.getMonth()+1) + '_' + date.getFullYear() + '_'
    + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds();

const options = {
    brandTitle: "web-automation",
    theme: 'bootstrap',
    jsonFile: 'reports/cucumber_report.json',
    output: 'reports/cucumber_report.html',
    screenshotsDirectory: './screenshots/',
    storeScreenshots: true,
    reportSuiteAsScenarios: true, 
    launchReport: false,
    ignoreBadJsonFile: true,
    metaData: {
        "App Version": "1.0.0",
        "Test Environment": "DEV",
        "Platform": "Web/Angular",
        "Sprint": "001"
    }
};

reporter.generate(options);