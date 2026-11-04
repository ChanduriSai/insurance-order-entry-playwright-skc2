# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\client-kyc-sensitive.spec.js >> Client / KYC - sensitive data >> TC-CLI-V12 Income vs premium affordability validation @regression @client @p2 @sensitive @seeded @api
- Location: tests\ui\client-kyc-sensitive.spec.js:45:3

# Error details

```
Error: a very high premium against a very low income should raise an affordability warning or block

expect(locator).toBeVisible() failed

Locator: getByTestId('field-error').or(locator('.field-error, .invalid-feedback, .text-danger, .error, [role="alert"]')).or(getByTestId('product-warning').or(locator('.alert-warning, [role="alert"], .warning')).first()).filter({ hasText: /afford|income|premium/i }).first()
Expected: visible
Timeout: 8000ms
Error: element(s) not found

Call log:
  - a very high premium against a very low income should raise an affordability warning or block getByTestId('field-error').or(locator('.field-error, .invalid-feedback, .text-danger, .error, [role="alert"]')).or(getByTestId('product-warning').or(locator('.alert-warning, [role="alert"], .warning')).first()).filter({ hasText: /afford|income|premium/i }).first() with timeout 8000ms
  - waiting for getByTestId('field-error').or(locator('.field-error, .invalid-feedback, .text-danger, .error, [role="alert"]')).or(getByTestId('product-warning').or(locator('.alert-warning, [role="alert"], .warning')).first()).filter({ hasText: /afford|income|premium/i }).first()

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
  - alert:
    - text: "Please review the following:"
    - list:
      - listitem: Sum assured exceeds the selected product maximum.
  - link "← Back to KYC & Financial":
    - /url: http://8.231.80.43:8081/applications/767/kyc-financial
  - link "Application Summary":
    - /url: http://8.231.80.43:8081/applications/767
  - text: "Application #767"
  - heading "Product & Policy Configuration" [level=1]
  - paragraph: Select the product, sum assured, premium payment frequency, premium payment term, and coverage term.
  - text: Product
  - combobox "Product":
    - option "Select product"
    - option "Elite Legacy Whole Life"
    - option "FlexiPay Whole Life"
    - option "SecureLife Whole Life" [selected]
    - option "WealthBuilder Whole Life"
  - text: "Allowed Sum Assured: $100,000.00 to $1,000,000.00 Sum Assured"
  - spinbutton "Sum Assured": "5000000"
  - text: Premium Payment Frequency
  - combobox "Premium Payment Frequency":
    - option "Monthly" [selected]
    - option "Quarterly"
    - option "Semi-Annual"
    - option "Annual"
  - text: Premium Payment Term
  - combobox "Premium Payment Term":
    - option "Select term"
    - option "10 years"
    - option "15 years"
    - option "20 years" [selected]
    - option "25 years"
    - option "30 years"
  - text: Coverage Term
  - combobox "Coverage Term":
    - option "Whole Life" [selected]
    - option "To Age 100"
  - text: Estimated Total Modal Premium $1,979.17 Estimated premium will be saved when you continue.
  - button "Save and Continue"
- contentinfo: TalentFarm QA Automation Lab Insurance Order Entry Demo
```

# Test source

```ts
  1  | /**
  2  |  * KYC / SSN / income tests. SENSITIVE-DATA RULE: Playwright traces and videos record typed values and cannot be masked,
  3  |  * so they are OFF for this whole file (test.use must be top-level for trace/video). Masked screenshots from
  4  |  * utils/evidence.js are still attached on failure. Data is synthetic (900-series SSN, example.test emails) regardless.
  5  |  */
  6  | const { test, expect } = require('../../fixtures');
  7  | const { tc } = require('../../fixtures');
  8  | const M = require('../../config/messages');
  9  | const { S } = require('../../config/selectors');
  10 | const { files } = require('../../utils/files');
  11 | const { buildKyc, buildProduct } = require('../../utils/dataBuilder');
  12 | const { progressTo } = require('../../utils/flows');
  13 | const { expectBlocked, captureEvidence } = require('../../utils/assertions');
  14 | 
  15 | test.use({ agentRole: 'validAgent', trace: 'off', video: 'off' });
  16 | 
  17 | test.describe('Client / KYC - sensitive data', () => {
  18 |   test(...tc('CLI-V08'), async ({ pages, page }, testInfo) => {
  19 |     await progressTo(pages, 'kyc');
  20 |     test.skip(!(await pages.kyc.$(S.kyc.ssn).count()), 'No SSN field on the KYC step');
  21 |     await pages.kyc.fill(buildKyc({ ssn: '900-12-3456' }));
  22 |     const visible = await pages.kyc.visibleSsn();
  23 |     await captureEvidence(page, testInfo, 'ssn-as-displayed');
  24 |     expect(visible.replace(/\D/g, ''), 'only the last four digits may be visible').not.toContain('90012');
  25 |     expect(visible).not.toContain('900-12');
  26 |     expect(visible, 'last four digits should remain visible').toMatch(/3456$/);
  27 |   });
  28 | 
  29 |   test(...tc('CLI-V09'), async ({ pages }) => {
  30 |     await progressTo(pages, 'kyc');
  31 |     test.skip(!(await pages.kyc.$(S.kyc.uploadInput).count()), 'No upload control on the KYC step (see DOC-V02 for the document step)');
  32 |     await pages.kyc.uploadKycDocument(files.unsupportedExe());
  33 |     await pages.kyc.expectErrorText(M.fileType);
  34 |   });
  35 | 
  36 |   test(...tc('CLI-V10'), async ({ pages }) => {
  37 |     await progressTo(pages, 'kyc');
  38 |     const before = await pages.kyc.stepTitle();
  39 |     await pages.kyc.fill(buildKyc({ pep: true }));
  40 |     await expect(pages.kyc.$(S.kyc.pepDetails)).toBeVisible();
  41 |     await pages.kyc.next();
  42 |     await expectBlocked(pages.kyc, before, M.required);
  43 |   });
  44 | 
  45 |   test(...tc('CLI-V12'), async ({ pages, page }, testInfo) => {
  46 |     const { data } = await progressTo(pages, 'product', {
  47 |       kyc: buildKyc({ income: 12000 }),
  48 |       product: buildProduct({ faceValue: 5_000_000 }),
  49 |     });
  50 |     await pages.product.select(data.product.namePattern);
  51 |     await pages.product.configure(data.product);
  52 |     await pages.product.next();
  53 |     await captureEvidence(page, testInfo, 'affordability-check');
  54 |     await expect(
  55 |       pages.product.$$(S.common.anyError).or(pages.product.$(S.product.warning)).filter({ hasText: M.affordability }).first(),
  56 |       'a very high premium against a very low income should raise an affordability warning or block',
> 57 |     ).toBeVisible();
     |       ^ Error: a very high premium against a very low income should raise an affordability warning or block
  58 |   });
  59 | });
  60 | 
```