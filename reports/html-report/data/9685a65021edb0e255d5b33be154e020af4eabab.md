# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\documents.spec.js >> Validation Summary (review step with unresolved errors) >> TC-VAL-V02 Clicking a summary item navigates to the field/section @regression @validation @p3
- Location: tests\ui\documents.spec.js:79:3

# Error details

```
Test timeout of 45000ms exceeded.
```

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByTestId('validation-summary-item').or(locator('[data-testid^="validation-item"], .validation-summary li, .validation-summary a')).first()

```

# Page snapshot

```yaml
- generic [active] [ref=f10e1]:
  - navigation [ref=f10e2]:
    - generic [ref=f10e3]:
      - link "Insurance Order Entry Demo Platform QA Automation Training App" [ref=f10e4] [cursor=pointer]:
        - /url: http://8.231.80.43:8081/dashboard
        - generic [aria-hidden] [ref=f10e5]: IO
        - generic [ref=f10e6]:
          - generic [ref=f10e7]: Insurance Order Entry Demo Platform
          - generic [ref=f10e8]: QA Automation Training App
      - generic [ref=f10e9]:
        - list [ref=f10e10]:
          - listitem [ref=f10e11]:
            - link "Dashboard" [ref=f10e12] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/dashboard
          - listitem [ref=f10e13]:
            - link "Applications" [ref=f10e14] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/applications
          - listitem [ref=f10e15]:
            - link "Products" [ref=f10e16] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/products
          - listitem [ref=f10e17]:
            - link "Support" [ref=f10e18] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/support
        - generic [ref=f10e19]:
          - link "Valid Agent" [ref=f10e20] [cursor=pointer]:
            - /url: http://8.231.80.43:8081/profile
          - button "Logout" [ref=f10e22] [cursor=pointer]
  - main [ref=f10e23]:
    - generic [ref=f10e25]:
      - link "← Back to Documents" [ref=f10e26] [cursor=pointer]:
        - /url: http://8.231.80.43:8081/applications/748/documents
      - link "Application Summary" [ref=f10e27] [cursor=pointer]:
        - /url: http://8.231.80.43:8081/applications/748
    - generic [ref=f10e28]:
      - generic [ref=f10e30]:
        - generic [ref=f10e31]: "Application #748"
        - heading "Review Application" [level=1] [ref=f10e32]
        - paragraph [ref=f10e33]: Review the application details and resolve any blocking validation errors before submission.
      - generic [ref=f10e34]:
        - generic [ref=f10e37]:
          - heading "Submission Validation" [level=2] [ref=f10e38]
          - generic [ref=f10e39]: No blocking validation errors found.
          - generic [ref=f10e40]:
            - link "Back to Documents" [ref=f10e41] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/applications/748/documents
            - button "Run Validation" [ref=f10e42] [cursor=pointer]
          - button "Submit Application" [ref=f10e44] [cursor=pointer]
        - generic [ref=f10e47]:
          - heading "Application Snapshot" [level=2] [ref=f10e48]
          - generic [ref=f10e49]:
            - term [ref=f10e50]: Client
            - definition [ref=f10e51]: QaXHDMVIBC TesterXHDMVIBCBF
            - term [ref=f10e52]: Calculated Age
            - definition [ref=f10e53]: "36"
            - term [ref=f10e54]: Product
            - definition [ref=f10e55]: SecureLife Whole Life
            - term [ref=f10e56]: Sum Assured
            - definition [ref=f10e57]: $250,000.00
            - term [ref=f10e58]: Premium Payment Frequency
            - definition [ref=f10e59]: MONTHLY
            - term [ref=f10e60]: Premium Payment Term
            - definition [ref=f10e61]: 20 years
            - term [ref=f10e62]: Coverage Term
            - definition [ref=f10e63]: WHOLE_LIFE
            - term [ref=f10e64]: Base Policy Premium
            - definition [ref=f10e65]: $98.96
            - term [ref=f10e66]: Rider Premium
            - definition [ref=f10e67]: $0.00
            - term [ref=f10e68]: Total Modal Premium
            - definition [ref=f10e69]: $98.96
            - term [ref=f10e70]: Status
            - definition [ref=f10e71]: DRAFT
  - contentinfo [ref=f10e72]:
    - generic [ref=f10e73]:
      - generic [ref=f10e74]: TalentFarm QA Automation Lab
      - generic [ref=f10e75]: Insurance Order Entry Demo
```

# Test source

```ts
  1  | const { S } = require('../config/selectors');
  2  | const { loc } = require('../utils/locators');
  3  | 
  4  | /** Validation summary widget shown on the document / review screens (VAL-V01..V03). */
  5  | class ValidationSummary {
  6  |   constructor(page) {
  7  |     this.page = page;
  8  |   }
  9  |   get root() {
  10 |     return loc(this.page, S.review.validationSummary).first();
  11 |   }
  12 |   get items() {
  13 |     return loc(this.page, S.review.validationItems);
  14 |   }
  15 |   async texts() {
  16 |     const n = await this.items.count();
  17 |     const out = [];
  18 |     for (let i = 0; i < n; i += 1) out.push(((await this.items.nth(i).textContent()) || '').trim());
  19 |     return out;
  20 |   }
  21 |   async clickItem(index = 0) {
> 22 |     await this.items.nth(index).click();
     |                                 ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  23 |   }
  24 | }
  25 | 
  26 | module.exports = { ValidationSummary };
  27 | 
```