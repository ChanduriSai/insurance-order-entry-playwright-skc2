# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\workflow.spec.js >> Submission & Status Tracking >> TC-WF-V03 Full E2E: valid application submitted; reference number shown @regression @workflow @p1 @smoke @release-gate @e2e @api
- Location: tests\e2e\workflow.spec.js:44:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('reference-number').or(locator('[data-testid="reference-number"], .reference-number')).first()
Expected: visible
Timeout: 8000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByTestId('reference-number').or(locator('[data-testid="reference-number"], .reference-number')).first() with timeout 8000ms
  - waiting for getByTestId('reference-number').or(locator('[data-testid="reference-number"], .reference-number')).first()

```

```yaml
- navigation:
  - link "Insurance Order Entry Demo Platform QA Automation Training App":
    - /url: http://8.231.80.43:8081/dashboard
  - list:
    - listitem:
      - link "Dashboard":
        - /url: http://8.231.80.43:8081/dashboard
    - listitem:
      - link "Applications":
        - /url: http://8.231.80.43:8081/applications
    - listitem:
      - link "Products":
        - /url: http://8.231.80.43:8081/products
    - listitem:
      - link "Support":
        - /url: http://8.231.80.43:8081/support
  - link "Valid Agent":
    - /url: http://8.231.80.43:8081/profile
  - button "Logout"
- main:
  - alert: Application submitted successfully.
  - text: Application Submitted
  - paragraph: The application has been submitted for review.
  - text: WL2026110403221
  - link "View Status":
    - /url: http://8.231.80.43:8081/applications/715/status
  - link "Back to Dashboard":
    - /url: http://8.231.80.43:8081/dashboard
- contentinfo: TalentFarm QA Automation Lab Insurance Order Entry Demo
```

# Test source

```ts
  1  | const { expect } = require('@playwright/test');
  2  | const { BasePage } = require('./BasePage');
  3  | const { S } = require('../config/selectors');
  4  | const { ValidationSummary } = require('../components/ValidationSummary');
  5  | const { parseMoney } = require('../utils/parse');
  6  | 
  7  | /** Step 10 - Review, validation summary, submission and status. */
  8  | class ReviewSubmitPage extends BasePage {
  9  |   constructor(page) {
  10 |     super(page);
  11 |     this.validation = new ValidationSummary(page);
  12 |   }
  13 | 
  14 |   get submitButton() {
  15 |     return this.$(S.review.submit);
  16 |   }
  17 | 
  18 |   async premium() {
  19 |     const el = this.$(S.review.premium);
  20 |     if (!(await el.count())) return NaN;
  21 |     return parseMoney(await el.textContent());
  22 |   }
  23 | 
  24 |   /** Full text of the review area, for "review shows what was entered" checks. */
  25 |   async reviewText() {
  26 |     return (await this.$(S.review.summary).innerText()) || '';
  27 |   }
  28 | 
  29 |   async submit() {
  30 |     await this.submitButton.click();
  31 |   }
  32 | 
  33 |   async referenceNumber() {
  34 |     const el = this.$(S.review.reference);
> 35 |     await expect(el).toBeVisible();
     |                      ^ Error: expect(locator).toBeVisible() failed
  36 |     return ((await el.textContent()) || '').trim();
  37 |   }
  38 | 
  39 |   async statusText() {
  40 |     return ((await this.$(S.review.status).textContent()) || '').trim();
  41 |   }
  42 | 
  43 |   /** True when no editable input remains on the page (submitted applications are read-only). */
  44 |   async isReadOnly() {
  45 |     const editable = this.page.locator(
  46 |       'main input:not([type="hidden"]):not([disabled]):not([readonly]), main select:not([disabled]), main textarea:not([disabled]):not([readonly])',
  47 |     );
  48 |     return (await editable.count()) === 0;
  49 |   }
  50 | }
  51 | 
  52 | module.exports = { ReviewSubmitPage };
  53 | 
```