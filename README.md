# Cancer Research UK - QA Engineer Technical Exercise

Your task is to write an automated test for making a donation to Cancer Research UK (https://app.pws.int.cruk.org/support-us/your-donation), using the data in the provided donor.json file.

## Scenario 
Make a card donation using test data attached and verify that the donation reference displayed on the thank you page is same as that in response of the transaction API call.

# Prerequisites
To run the tests in Visual Studio, you'll need to have the following software installed on your machine:
- Visual Studio 
- Node.js 
- Git

# Getting started
From VS Code terminal we need to:
1. Clone the repository 
```
git clone https://github.com/shawnbothma/cancer-research-uk-donation
```
2. Install npm(node package manager)
```
npm install
```
# Finding the Tests

Explore the tests folder: 
INSERT PICTURE HERE 

# Description of the tests and types
   ### End to End (E2E) make a donation.test.ts
   - I have limited the test to only run on the Chromium browser. It can be configured to run across more by uncommenting the browsers under projects in the playwright.config.ts file. 
   
     When the same credit card details are used in quick succession the tests become flaky, presume it's due to security. 

     The Donation Reference and Transaction Id are printed to the console (terminal) for reference.
   
- The test runs an axe accessibility check on the donation details page. It found a moderate accessibility violation so to prevent the tests from failing, I have commented out the assertion and printed the violation results to the console and HTML report.
    ```
    Accessibility Violations: [
    {
        id: 'page-has-heading-one',
        impact: 'moderate',
        tags: [ 'cat.semantics', 'best-practice' ],
        description: 'Ensure that the page, or at least one of its frames contains a level-one heading',
        help: 'Page should contain a level-one heading',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.7/page-has-heading-one?application=playwright',
        nodes: [ [Object] ]
    }
    ]
    ```
- To show different test approaches, the test includes a reference to the Page Object Model for the fill donation details step. The donationDetails.ts page object only includes the elements and actions used in the make a donation test, it could be extended to include all of the actions and elements.

- The test data is imported from the data/donor.json file. I made the following changes to the file:
            
     - added the title
     - changed the email to a temporary one to check end to end
     - changed the first & last names, and gift aid to camel case for consistency

### Performance test on the donation details page (performance-metrics-donation-details.test.ts)
    
  - Performance test uses some of the performance API's from Google's web vitals initiative, it returns the following web metrics to the console and the HTML report:
    - Paint Timing API provides information on the first paint and the first contentful paint.
    - Largest Contentful Paint API provides information on all large paints.
    - Navigation Timing API provides navigation response time, the used protocol, document load time etc.
     
### Visual tests on the your donation details and details pages (visual.test.ts)
- The Visual tests capture and visually compare screenshots to the baseline screenshots. Baseline screenshots are stored in the visual.test.ts-snapshots folder and the actual in the test-results folder. 
- The tests are currently configured to run emulating a Chrome Desktop device for the your donation details page and a Galaxy S9+ portrait on Chrome for the your details page.

## How to run the tests
The tests are configured to retry if the first try fails.
- Run all tests from the terminal:
    ```
    npx playwright test 
    ```
- To run tests individually from the terminal:
    ```
    npx playwright test donation.test.ts
    ```
    ```
    npx playwright test performance-metrics-donation-details.test.ts
    ```
    ```
    npx playwright test visual.test.ts
    ```

## Where to find the test results
Once executed the test results can be found in the playwright-report & test-results folders, as well as in an HTML report which should open in the browser on completion and some on the console (terminal).

To complete the E2E test you can view the email sent which contains the donation reference:

```
Go to https://www.mailinator.com/ and view the public inbox for auto-pws@mailinator.com.
 ```