# wl-code

## Steps to make the project work
- Make sure you have the right npm already installed in your host
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc
nvm install 10.24.0
nvm use 10.24.0
nvm run node -v	// v10.24.0
```
- Install the project dependecies
```sh
    npm install
```
- Run the tests
```sh
    npm run test:chrome
```

#### Support for different browsers execution
```sh
npm run test:chrome             # run the tests by using chrome browser (if installed)
npm run test:chrome:5           # run the tests by using 5 chrome instances (in parallel)
npm run test:chrome:headless    # run the tests by using chrome browser in headless mode
npm run test:chrome:headless:5  # run the tests by using 5 chrome instances in headless mode (in parallel)
npm run test:chrome:mobile      # run the tests by using chrome browser in a mobile view
npm run test:safari             # run the tests by using safari browser (if installed)
npm run test:firefox            # run the tests by using firefox browser (if installed)
npm run test:multiple           # run the tests by using multiple browsers at the same time (chrome, firefox and safari)
```
Suggested examples:
- npm run test:chrome
- npm run test:chrome:5
- npm run test:chrome:headless
- npm run test:multiple


notes:
// looks like testcafe doesn't support chaining methods yet                                
// reference: https://testcafe-discuss.devexpress.com/t/how-to-chain-pagemodel-methods/313
//            https://github.com/DevExpress/testcafe/issues/1535
//
//
// support for xpath selectors might be satisfied by following this approach:
//   https://github.com/DevExpress/testcafe-examples/tree/master/examples/use-xpath-selectors