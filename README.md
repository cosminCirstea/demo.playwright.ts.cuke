# Demo Playwright with TypeScript and Cucumber framework on `https://www.saucedemo.com/`

## 1. Introduction

- This project is a demo example for Playwright with TypeScript and Cucumber framework.

    - When it comes to BDD, there is a draw off between how much code you write vs how detailed you describe your actions in the feature file. If you are looking for modularity, you can create very generic actions that can be used with parameters to create any business flow you can think of. However, such a business flow will be long and hard to read in the feature file, not following BDD good practices. It will look more like a `steps to reproduce` scenario. Still, that can have its advantages, based on situation.
    - Nevertheless, if you want the best of both worlds, you can have a feature file describing a business flow in a `steps to reproduce` kind of way to help people who are not familiar with the business, as well as complex feature files that contain complicated business flows using shorter descriptions.
- However, if the team building and managing the tests is purely technical, I believe that a BDD abstraction like Cucumber can add another layer of complexity to take care of, and perhaps less value.
    - Of course, everything described can also be used in a framework without a BDD abstraction. The only difference is that it only pertains to technical users to contribute to the framework.
- In the end, it is a matter of choice. What tool is used depends solely on the needs and skills of their user, and a debate is always good.

## 2. Setup

- Install [NodeJS](https://nodejs.org/en/download/)
- Install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm):
- Restart visual studio code
- Open terminal and execute command -> `npm install` - this will install all dependencies needed in the node_modules folder

- If you use Visual Studio Code
    - Please install the recommended Extensions. You can see them by accessing the Extensions tab and searching for `@recommended`. They will appear under the `Workspace Recommendations` title. Below are the extensions' names and a short description for each.
        - `ESLint` - static analysys tool for code quality
        - `Prettier - Code formatter` - code formatter. Shortcut to format code is shift+alt+f or ctrl+s which also saves your changes 
        - `Playwright test for VSCode` extension -> https://playwright.dev/docs/getting-started-vscode
        - `Playwright Snippets` - provides playwright code snippets. Write `pw` in your code to trigger the suggestions
        - `Cucumber (Gherkin) Full Support` - provides all the Cucumber functionalities like implemented steps suggestions in feature files, feature file to code navigation, etc. 
        - Troubleshooting tip: if it fails to see the implementation steps, restart visual studio code. If it still does not work, check in the bottom right corner options by hovering for `Select Language Mode` to be set to `feature` when having a feature file open.

## 3. Project structure

- On the root of project are files:
    - `.env-cmdrc`
        - properties file to store options(e.g. browser, environment) for running tests  
    - `.gitignore`
        - Folders and files which shouldn't be pushed to repository
    - `cucumber.js`
        - config file for the Cucumber framework
    - `htmlReportGenerator.js`
        - config for generating and storing reports and screenshots                  
    - `package-lock.json`
    - `package.json`
        - Project configuration with dependencies
    - `playwright.config.js`
        - Configuration for e2e tests with `Playwright` in `NodeJS`. This is needed if you want to make use of Playwright's native `pick locator` or `code generator`.
    - `README.md`
        - Documentation of the project
- On the root of project are also folders:
    - `.vscode`
        - It contains the `settings.json` for the `Cucumber (Gherkin) Full Support` extension to enable autocompletes and other extensions used in Visual Studio Code
    - `features`
        - this is where bdd scenarios should live
    - `helpers`
        - Here are files to help with solving generic problems
    - `node_modules`
        - added to git ignore
        - contains all installed dependencies
    - `reports`
        - added to git ignore
        - contains the `cucumber_report.json` to generate cucumber html reports
    - `screenshots`
        - added to git ignore
        - screenshots of failed tests are saved here
    - `steps`
        - contains the implementation steps for the feature files
    - `operations`
        - here are files to help with solving business problems    

## 4. How to run tests with NPM scripts

- You can run scripts from the `package.json` file or build your own
- To enable running scripts by `play` button on `NPM SCRIPTS` click on the three dots at the right of `EXPLORER` and toggle the `NPM Scripts`
    - `test` -> it will run all tests filtered by tags(default is @Smoke, but can be changed) on the default set browser and environment(e.g. dev and 'headlessChromium')
    - `clean:test` -> it will create the `reports` folder and the `cucumber_report.json` file if they do not already exists then do the same actions as the `test` script, then at the end it opens the cucumber reports in the default browser and removes the `reports` folder with all its content after.
    - `test:cmd:variables` -> should not be run from the `play` button, but from the terminal. The role of this script is to allow selection of any environment-browser-user combination from the .env-cmdrc file. 
        - You have 2 ways of using it:
            1. `test:cmd:variables` with a big json object from `.env-cmdrc` like `DEV` or `STG` + the part you want to overwrite.
                - e.g. `test:cmd:variables DEV,firefox,lockedOutUser` will overwrite the default `chromium` value from the `BROWSER` field with the value from the `firefox` object and the values of the `USER` and `PASSWORD` fields with the value from the `lockedOutUser` object.
            2. `test:cmd:variables` and you can provide any number of variables needed to run tests, in any order that you like, as they don't overwrite each other as long as they are of different type.
                - e.g. `test:cmd:variables firefox,devEnv,lockedOutUser`
                - possible types: BROWSER, ENV, USER & PASSWORD(these 2 should come together as values of the same key) (e.g. `devUser` in the 
                `.env-cmdrc` file)
    - `lint` -> to analyse the code and check for improvements, warnings and errors
    - `create:reports:location` -> This command can be run on its own to create the `reports` folder if it does not exists already and the `cucumber_report.json` file to store data from tests run to generate reports with the `generate:report` command.
        - Both `create:reports:location` and `generate:report` commands are integrated in the scrips that start with `clean` (e.g. `clean:test`)
    - `cleanup:reports` -> This command can be run on its own to delete the `reports` folder with all its content and is also integrated in the scripts that start with `clean` (e.g. `clean:test`)

## 5. Cucumber html report

- By default, after any run of the tests, a cucumber_report is generated and automatically opened in the browser. This can be changed from the `html-report-generator.js`. I currently don't like everything about it, because when there are Expect failures from Playwright, due to ANSI-codes used, the reporter does not display failures in a readable way.
- I have integrated Serenity as it is much better in terms of readability and features, but without using the ScreenPlay pattern which comes embedded with it, I felt that it is way too heavy and brings a lot of dependencies, thus I prefered staying with the Cucumber-html-report for the time being.
- For Java there is a third-party plugin to the html-cucumber-report that does a good job, called cluecumber. There are multiple variants as well for Cucumber-js, they just need to be investigated. Either way, if Cucumber is dropped and Playwright's test runner is used instead, their reporting won't have to deal with this issue.

## 6. How to develop new tests

- The `Cucumber (Gherkin) Full Support` extension can help you start off by creating a feature file and writing your desired scenarios. If the steps you are looking for are already implemented, suggestions are displayed.
If the steps you write are not already implemented, the message `was unable to find step` will be displayed. If the npm scripts are run using a tag which is also present in the feature file with steps without implementation, Cucumber will provide structured code snippets in the terminal which you can copy and paste into your `steps` file to get you started writing tests.

- As mentioned above, start first by writing the desired code of your actions in the steps functions. Once you are happy with the functionality and see that it runs fine, try to extract your business related code to files from the operations, and helper functions to files from the helpers folder.

- I have described below how to use Playwright's native selector support tools, but for more customisation you can also use your own, and can get inspiration from the selectors.ts class. There you can create parameterisable css and xpath selectors that can be adjusted to any of your needs. Look for patterns in the html structure, and with the help of generic selectors you can create dynamic identifiers that can be used in multiple actions. You can provide them to functions in the locators.ts class, to create readily available webElements to interact with through Playwright.

- If you want to use Playwright's code generator to help you quickly write some tests. To use it, you must create a folder in your root project called `tests` then select the `Testing` tab from the left menu of Visual Studio Code. From there, you can click on the `Record new` option from the bottom left of the screen and a browser is started, which will record all your actions and generate code for it. You can also watch a video of how to do it under the `Generating Tests` title at this link -> https://playwright.dev/docs/getting-started-vscode. You can then move the generated code into your .steps.ts file. You can also change the `testDir` option from `playwright.config.ts` to `./steps` and then you won't have to create the `tests` folder.

- Another option to help you write tests is to use the `Pick locator` option from the `Testing` tab, above the `Record new` option. A new browser is opened and you can quickly get locators for the elements you hover your cursor on, which are copied to the clipboard into the Visual Studio Code and can be easily pasted in your tests. You can also watch a screenshot example under the `Picking a locator` title at this link -> https://playwright.dev/docs/getting-started-vscode

- The `Playwright Snippets` extension can help you with the syntax and default methods provided by Playwright. You can trigger it by writing `pw`, then a list of suggestions is displayed. With `pw-page` you can access the most generic actions like clicking, dbclicking, etc.

## 7. Dependencies used

- @playwright/test

    - [APACHE LICENSE, VERSION 2.0](https://github.com/microsoft/playwright-test/blob/master/LICENSE)
    - [Home page](https://playwright.dev/)
    - [GitHub repository](https://github.com/microsoft/playwright-test)

- @cucumber/cucumber

    - [MIT LICENSE](https://github.com/cucumber/cucumber-js/blob/main/LICENSE)
    - [Home page](https://cucumber.io/)
    - [Github repository](https://github.com/cucumber/cucumber-js)

- cucumber-html-reporter

    - [MIT LICENSE](https://github.com/gkushang/cucumber-html-reporter/blob/develop/LICENSE.txt)
    - [Home page](https://cucumber.io/docs/cucumber/reporting/?lang=javascript)
    - [Github repository](https://github.com/gkushang/cucumber-html-reporter)

- dotenv

    - [BSD 2-Clause "Simplified" License](https://github.com/motdotla/dotenv/blob/master/LICENSE)
    - [Home page](https://www.dotenv.org/)
    - [Github repository](https://github.com/motdotla/dotenv)

- ts-node

    - [MIT LICENSE](https://github.com/TypeStrong/ts-node/blob/main/LICENSE)
    - [Home Page](https://typestrong.org/ts-node/)
    - [Github repository](https://github.com/TypeStrong/ts-node)

- typescript

    - [APACHE LICENSE 2.0](https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt)
    - [Home Page](https://www.typescriptlang.org/)
    - [Github repository](https://github.com/microsoft/TypeScript)

- prettier

    - [MIT LICENSE](https://github.com/prettier/prettier/blob/main/LICENSE)
    - [Home Page](https://prettier.io/)
    - [Github repository](https://github.com/prettier/prettier)

- env-cmd

    - [MIT LICENSE](https://github.com/toddbluhm/env-cmd/blob/master/LICENSE)
    - [Home Page](https://github.com/toddbluhm/env-cmd#readme)
    - [Github repository](https://github.com/toddbluhm/env-cmd)

- eslint

    - [MIT LICENSE](https://github.com/eslint/eslint/blob/main/LICENSE)
    - [Home Page](https://eslint.org/)
    - [Github repository](https://github.com/eslint/eslint)

- @typescript-eslint

    - [Copyright JS Foundation and other contributors](https://github.com/typescript-eslint/typescript-eslint/blob/main/LICENSE)
    - [Home Page](https://github.com/typescript-eslint/typescript-eslint#readme)
    - [Github repository](https://github.com/typescript-eslint/typescript-eslint)

- mkdirp 3.0.0

    -[MIT LICENSE](https://github.com/isaacs/node-mkdirp/blob/main/LICENSE)
    -[Home Page](https://github.com/isaacs/node-mkdirp#readme)
    -[Github repository](https://github.com/isaacs/node-mkdirp)

- rimraf 5.0.0
    
    -[ISC LICENSE](https://github.com/isaacs/rimraf/blob/main/LICENSE)
    -[Home Page](https://github.com/isaacs/rimraf#readme)
    -[Github repository](https://github.com/isaacs/rimraf)    
