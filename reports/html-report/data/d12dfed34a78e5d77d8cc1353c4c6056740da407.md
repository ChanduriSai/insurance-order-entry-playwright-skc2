# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\product.spec.js >> Product Selection & Policy Configuration >> TC-PROD-V11 Product configuration persists after save draft and reload @regression @product @p2 @seeded
- Location: tests\ui\product.spec.js:130:3

# Error details

```
Error: face value after reload

expect(received).toBe(expected) // Object.is equality

Expected: 250000
Received: NaN
```

# Page snapshot

```yaml
- generic [active] [ref=f6e1]:
  - navigation [ref=f6e2]:
    - generic [ref=f6e3]:
      - link "Insurance Order Entry Demo Platform QA Automation Training App" [ref=f6e4] [cursor=pointer]:
        - /url: http://8.231.80.43:8081/dashboard
        - generic [aria-hidden] [ref=f6e5]: IO
        - generic [ref=f6e6]:
          - generic [ref=f6e7]: Insurance Order Entry Demo Platform
          - generic [ref=f6e8]: QA Automation Training App
      - generic [ref=f6e9]:
        - list [ref=f6e10]:
          - listitem [ref=f6e11]:
            - link "Dashboard" [ref=f6e12] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/dashboard
          - listitem [ref=f6e13]:
            - link "Applications" [ref=f6e14] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/applications
          - listitem [ref=f6e15]:
            - link "Products" [ref=f6e16] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/products
          - listitem [ref=f6e17]:
            - link "Support" [ref=f6e18] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/support
        - generic [ref=f6e19]:
          - link "Valid Agent" [ref=f6e20] [cursor=pointer]:
            - /url: http://8.231.80.43:8081/profile
          - button "Logout" [ref=f6e22] [cursor=pointer]
  - main [ref=f6e23]:
    - generic [ref=f6e25]:
      - link "← Back to KYC & Financial" [ref=f6e26] [cursor=pointer]:
        - /url: http://8.231.80.43:8081/applications/758/kyc-financial
      - link "Application Summary" [ref=f6e27] [cursor=pointer]:
        - /url: http://8.231.80.43:8081/applications/758
    - generic [ref=f6e28]:
      - generic [ref=f6e30]:
        - generic [ref=f6e31]: "Application #758"
        - heading "Product & Policy Configuration" [level=1] [ref=f6e32]
        - paragraph [ref=f6e33]: Select the product, sum assured, premium payment frequency, premium payment term, and coverage term.
      - generic [ref=f6e36]:
        - generic [ref=f6e37]:
          - generic [ref=f6e38]:
            - generic [ref=f6e39]: Product
            - combobox "Product" [ref=f6e40]:
              - option "Select product" [selected]
              - option "Elite Legacy Whole Life"
              - option "FlexiPay Whole Life"
              - option "SecureLife Whole Life"
              - option "WealthBuilder Whole Life"
          - generic [ref=f6e41]:
            - generic [ref=f6e42]: Sum Assured
            - spinbutton "Sum Assured" [ref=f6e43]
          - generic [ref=f6e44]:
            - generic [ref=f6e45]: Premium Payment Frequency
            - combobox "Premium Payment Frequency" [ref=f6e46]:
              - option "Monthly" [selected]
              - option "Quarterly"
              - option "Semi-Annual"
              - option "Annual"
          - generic [ref=f6e47]:
            - generic [ref=f6e48]: Premium Payment Term
            - combobox "Premium Payment Term" [ref=f6e49]:
              - option "Select term" [selected]
              - option "10 years"
              - option "15 years"
              - option "20 years"
              - option "25 years"
              - option "30 years"
          - generic [ref=f6e50]:
            - generic [ref=f6e51]: Coverage Term
            - combobox "Coverage Term" [ref=f6e52]:
              - option "Whole Life" [selected]
              - option "To Age 100"
        - generic [ref=f6e54]:
          - generic [ref=f6e55]: Estimated Total Modal Premium
          - generic [ref=f6e56]: Pending
          - generic [ref=f6e57]: Select a product to estimate premium.
        - button "Save and Continue" [ref=f6e59] [cursor=pointer]
  - contentinfo [ref=f6e60]:
    - generic [ref=f6e61]:
      - generic [ref=f6e62]: TalentFarm QA Automation Lab
      - generic [ref=f6e63]: Insurance Order Entry Demo
```

# Test source

```ts
  39  |       await expectBlocked(pages.product, before, M.faceValueLimit);
  40  |       await pages.product.setFaceValue(r.faceValueMin);
  41  |       await pages.product.next();
  42  |       await expectAdvanced(pages.product, before);
  43  |     });
  44  | 
  45  |     test(...tc('PROD-V04'), async ({ pages }) => {
  46  |       test.skip(r.faceValueMax === null, 'Set FACE_VALUE_MAX to run (Q13)');
  47  |       const { data } = await progressTo(pages, 'product');
  48  |       const before = await pages.product.stepTitle();
  49  |       await pages.product.select(data.product.namePattern);
  50  |       await pages.product.setFaceValue(r.faceValueMax + 1);
  51  |       await pages.product.next();
  52  |       await expectBlocked(pages.product, before, M.faceValueLimit);
  53  |     });
  54  |   });
  55  | 
  56  |   test(...tc('PROD-V05'), async ({ pages, page }, testInfo) => {
  57  |     const { data } = await progressTo(pages, 'product');
  58  |     await pages.product.select(data.product.namePattern);
  59  |     await pages.product.setFaceValue(data.product.faceValue);
  60  |     // Frequencies are taken from the app's own option list so the test does not depend on guessed labels.
  61  |     const options = await pages.product.optionTexts(S.product.frequency);
  62  |     expect(options.length, 'premium frequency options (Monthly/Quarterly/Semi-annual/Annual)').toBeGreaterThanOrEqual(2);
  63  |     const first = options[0];
  64  |     const last = options[options.length - 1];
  65  |     await pages.product.setFrequency(first);
  66  |     const p1 = await pages.product.waitForPremium();
  67  |     await pages.product.setFrequency(last);
  68  |     await expect.poll(() => pages.product.premium(), { message: `premium should change when frequency changes ${first} -> ${last}` }).not.toBe(p1);
  69  |     await captureEvidence(page, testInfo, `premium-${last}`);
  70  |     await pages.product.setFrequency(first);
  71  |     await expect.poll(() => pages.product.premium(), { message: 'premium returns to the original value' }).toBe(p1);
  72  |   });
  73  | 
  74  |   test(...tc('PROD-V06'), async ({ pages, page }, testInfo) => {
  75  |     const { data } = await progressTo(pages, 'product');
  76  |     await fillStep(pages, 'product', data);
  77  |     const configured = await pages.product.waitForPremium();
  78  |     await pages.product.next();
  79  |     await finishFrom(pages, 'riders', data);
  80  |     const onReview = await pages.review.premium();
  81  |     await captureEvidence(page, testInfo, 'review-premium');
  82  |     expect(onReview, 'review-page premium vs configured premium').toBeCloseTo(configured, 2);
  83  |   });
  84  | 
  85  |   test(...tc('PROD-V07'), async ({ pages }) => {
  86  |     test.skip(!r.patterns.suitabilityProduct, 'Set SUITABILITY_PRODUCT_PATTERN to run (Q13)');
  87  |     await progressTo(pages, 'product', { kyc: buildKyc({ riskProfile: 'Conservative' }) });
  88  |     await pages.product.select(r.patterns.suitabilityProduct);
  89  |     await expect(
  90  |       pages.product.$$(S.common.anyError).or(pages.product.$(S.product.warning)).filter({ hasText: M.suitability }).first(),
  91  |     ).toBeVisible();
  92  |   });
  93  | 
  94  |   test(...tc('PROD-V08'), async ({ pages }) => {
  95  |     test.skip(!r.ineligibleAge || !r.patterns.ineligibleAgeProduct, 'Set INELIGIBLE_AGE and INELIGIBLE_AGE_PRODUCT_PATTERN to run (Q13)');
  96  |     await progressTo(pages, 'product', { client: buildClient({ dob: dobForAge(r.ineligibleAge) }) });
  97  |     const before = await pages.product.stepTitle();
  98  |     const card = pages.product.cardFor(r.patterns.ineligibleAgeProduct);
  99  |     const button = card.getByRole('button', { name: S.product.selectButton.name }).first();
  100 |     if (await button.count() && (await button.isDisabled())) return; // disabled == correctly blocked
  101 |     await pages.product.select(r.patterns.ineligibleAgeProduct);
  102 |     await pages.product.next();
  103 |     await expectBlocked(pages.product, before, M.eligibility);
  104 |   });
  105 | 
  106 |   test(...tc('PROD-V09'), async ({ pages }) => {
  107 |     const { data } = await progressTo(pages, 'product');
  108 |     await pages.product.select(data.product.namePattern);
  109 |     for (const def of [S.product.paymentTerm, S.product.policyTerm]) {
  110 |       const el = pages.product.$(def);
  111 |       test.skip(!(await el.count()) || (await el.evaluate((n) => n.tagName)) !== 'SELECT', `${def.id} is not a dropdown in this build`);
  112 |       const options = await pages.product.optionTexts(def);
  113 |       expect(options.length, `${def.id} has options`).toBeGreaterThan(0);
  114 |       expect(new Set(options).size, `${def.id} has no duplicate options`).toBe(options.length);
  115 |     }
  116 |   });
  117 | 
  118 |   test(...tc('PROD-V10'), async ({ pages }) => {
  119 |     await progressTo(pages, 'product');
  120 |     const n = await pages.product.inactiveCards.count();
  121 |     test.skip(n === 0, 'No inactive product is displayed in this environment');
  122 |     for (let i = 0; i < n; i += 1) {
  123 |       const card = pages.product.inactiveCards.nth(i);
  124 |       const button = card.getByRole('button', { name: S.product.selectButton.name }).first();
  125 |       if (await button.count()) await expect(button).toBeDisabled();
  126 |       else await expect(card).toHaveAttribute('aria-disabled', 'true');
  127 |     }
  128 |   });
  129 | 
  130 |   test(...tc('PROD-V11'), async ({ pages, page }) => {
  131 |     const { data } = await progressTo(pages, 'product');
  132 |     await pages.product.select(data.product.namePattern);
  133 |     await pages.product.setFaceValue(data.product.faceValue);
  134 |     const options = await pages.product.optionTexts(S.product.frequency);
  135 |     await pages.product.setFrequency(options[options.length - 1]);
  136 |     const frequency = await pages.product.getValue(S.product.frequency);
  137 |     await pages.product.saveDraft();
  138 |     await page.reload();
> 139 |     expect(parseMoney(await pages.product.getValue(S.product.faceValue)), 'face value after reload').toBe(data.product.faceValue);
      |                                                                                                      ^ Error: face value after reload
  140 |     expect(await pages.product.getValue(S.product.frequency), 'frequency after reload').toBe(frequency);
  141 |   });
  142 | });
  143 | 
```