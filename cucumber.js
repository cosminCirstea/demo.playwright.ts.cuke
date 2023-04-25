/* eslint-disable no-undef */
const cucumberReport = [
    `--publish-quiet`,
    '--require-module ts-node/register', // Load TypeScript module
    '--require ./steps/*.steps.ts', // Load step definitions
    `--require ./steps/**/*.steps.ts`,
    '--format progress', //Load custom formatter
    '--format json:./reports/cucumber_report.json',
].join(' ');

const run_features = [
    './features/', // Specify our feature files location
    cucumberReport
].join(' ');

module.exports = {
    test_runner: run_features,
};