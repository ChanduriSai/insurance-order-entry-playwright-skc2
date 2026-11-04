# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\workflow.spec.js >> Submission & Status Tracking >> TC-WF-V08 Review page reflects the entered client, product and beneficiary data @regression @workflow @p2 @smoke
- Location: tests\e2e\workflow.spec.js:70:3

# Error details

```
Error: beneficiary on review

expect(received).toContain(expected) // indexOf

Expected substring: "Ben CWASEAEBVI"
Received string:    "← Back to Documents Application Summary
Application #719
Review Application·
Review the application details and resolve any blocking validation errors before submission.·
Submission Validation
No blocking validation errors found.
Back to Documents Run Validation
Submit Application
Application Snapshot
Client
QaFRWGABBB TesterFRWGABBBVI
Calculated Age
36
Product
SecureLife Whole Life
Sum Assured
$250,000.00
Premium Payment Frequency
MONTHLY
Premium Payment Term
20 years
Coverage Term
WHOLE_LIFE
Base Policy Premium
$98.96
Rider Premium
$0.00
Total Modal Premium
$98.96
Status
DRAFT"
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
        - /url: http://8.231.80.43:8081/applications/719/documents
      - link "Application Summary" [ref=f10e27] [cursor=pointer]:
        - /url: http://8.231.80.43:8081/applications/719
    - generic [ref=f10e28]:
      - generic [ref=f10e30]:
        - generic [ref=f10e31]: "Application #719"
        - heading "Review Application" [level=1] [ref=f10e32]
        - paragraph [ref=f10e33]: Review the application details and resolve any blocking validation errors before submission.
      - generic [ref=f10e34]:
        - generic [ref=f10e37]:
          - heading "Submission Validation" [level=2] [ref=f10e38]
          - generic [ref=f10e39]: No blocking validation errors found.
          - generic [ref=f10e40]:
            - link "Back to Documents" [ref=f10e41] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/applications/719/documents
            - button "Run Validation" [ref=f10e42] [cursor=pointer]
          - button "Submit Application" [ref=f10e44] [cursor=pointer]
        - generic [ref=f10e47]:
          - heading "Application Snapshot" [level=2] [ref=f10e48]
          - generic [ref=f10e49]:
            - term [ref=f10e50]: Client
            - definition [ref=f10e51]: QaFRWGABBB TesterFRWGABBBVI
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
  1  | const { test, tc, expect, env } = require('../../fixtures');
  2  | const M = require('../../config/messages');
  3  | const { S } = require('../../config/selectors');
  4  | const { formatDate } = require('../../utils/dates');
  5  | const { buildClient } = require('../../utils/dataBuilder');
  6  | const { startApplication, progressTo, fillStep, finishFrom, reachReview } = require('../../utils/flows');
  7  | const { captureEvidence, sameDate } = require('../../utils/assertions');
  8  | 
  9  | /** Completes the whole journey and submits. Returns { id, data, reference }. */
  10 | async function submitValidApplication(pages) {
  11 |   const { id, data } = await reachReview(pages);
  12 |   await expect(pages.review.submitButton).toBeEnabled();
  13 |   await pages.review.submit();
  14 |   const reference = await pages.review.referenceNumber();
  15 |   return { id, data, reference };
  16 | }
  17 | 
  18 | test.describe('Submission & Status Tracking', () => {
  19 |   test.use({ agentRole: 'validAgent' });
  20 | 
  21 |   test(...tc('WF-V01'), async ({ pages }) => {
  22 |     const { id, data } = await progressTo(pages, 'address');
  23 |     await pages.address.saveDraft();
  24 |     await pages.dashboard.goto();
  25 |     const row = pages.dashboard.rowForApplication({ name: data.client.lastName, id });
  26 |     await expect(row, 'the saved draft should be listed on the dashboard').toBeVisible();
  27 |     await expect(pages.dashboard.statusOf(row)).toHaveText(/draft/i);
  28 |   });
  29 | 
  30 |   test(...tc('WF-V02'), async ({ pages }) => {
  31 |     const id = await startApplication(pages);
  32 |     const client = buildClient();
  33 |     await pages.client.fill(client);
  34 |     await pages.client.saveDraft();
  35 |     await pages.dashboard.goto();
  36 |     await pages.dashboard.resume(pages.dashboard.rowForApplication({ name: client.lastName, id }));
  37 |     for (let i = 0; i < 4 && !(await pages.client.$(S.client.firstName).isVisible()); i += 1) await pages.client.back();
  38 |     await expect(pages.client.$(S.client.firstName)).toHaveValue(client.firstName);
  39 |     await expect(pages.client.$(S.client.lastName)).toHaveValue(client.lastName);
  40 |     const dob = await pages.client.getValue(S.client.dob);
  41 |     expect(sameDate(dob, formatDate(client.dob, env.dateFormat)), `DOB shown "${dob}" vs saved`).toBe(true);
  42 |   });
  43 | 
  44 |   test(...tc('WF-V03'), async ({ pages, page }, testInfo) => {
  45 |     const { reference } = await submitValidApplication(pages);
  46 |     await captureEvidence(page, testInfo, 'submission-confirmation');
  47 |     expect(reference.length, 'a reference number must be displayed').toBeGreaterThan(0);
  48 |     await testInfo.attach('reference-number.txt', { body: reference, contentType: 'text/plain' });
  49 |   });
  50 | 
  51 |   test(...tc('WF-V04'), async ({ pages }) => {
  52 |     await submitValidApplication(pages);
  53 |     expect(await pages.review.isReadOnly(), 'no editable input may remain after submission').toBe(true);
  54 |   });
  55 | 
  56 |   test(...tc('WF-V05'), async ({ pages }) => {
  57 |     await submitValidApplication(pages);
  58 |     await expect(pages.review.$(S.review.confirmation)).toHaveText(M.submitted);
  59 |   });
  60 | 
  61 |   test(...tc('WF-V06'), async ({ pages, page }, testInfo) => {
  62 |     const { id, data, reference } = await submitValidApplication(pages);
  63 |     await pages.dashboard.goto();
  64 |     const row = pages.dashboard.rowForApplication({ name: data.client.lastName, id }).or(pages.dashboard.rows.filter({ hasText: reference }).first()).first();
  65 |     await expect(row, 'submitted application should be listed').toBeVisible();
  66 |     await captureEvidence(page, testInfo, 'dashboard-after-submit');
  67 |     await expect(pages.dashboard.statusOf(row)).toHaveText(/submitted/i);
  68 |   });
  69 | 
  70 |   test(...tc('WF-V08'), async ({ pages, page }, testInfo) => {
  71 |     const { data } = await progressTo(pages, 'product');
  72 |     await fillStep(pages, 'product', data);
  73 |     const configured = await pages.product.waitForPremium();
  74 |     await pages.product.next();
  75 |     await finishFrom(pages, 'riders', data);
  76 |     await captureEvidence(page, testInfo, 'review-page');
  77 |     const text = await pages.review.reviewText();
  78 |     expect(text, 'client first name on review').toContain(data.client.firstName);
  79 |     expect(text, 'client last name on review').toContain(data.client.lastName);
> 80 |     expect(text, 'beneficiary on review').toContain(data.beneficiaries[0].name);
     |                                           ^ Error: beneficiary on review
  81 |     expect(await pages.review.premium(), 'review premium vs configured').toBeCloseTo(configured, 2);
  82 |   });
  83 | });
  84 | 
```