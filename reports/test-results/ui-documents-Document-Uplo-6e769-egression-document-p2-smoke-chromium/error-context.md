# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\documents.spec.js >> Document Upload & Validation Summary >> TC-DOC-V01 Valid KYC document (PDF/JPG/PNG) uploads successfully @regression @document @p2 @smoke
- Location: tests\ui\documents.spec.js:10:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('uploaded-documents').or(locator('[data-testid^="document-uploaded-"], .uploaded-document, [data-testid^="document-status-"]')).first()
Expected: visible
Timeout: 8000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByTestId('uploaded-documents').or(locator('[data-testid^="document-uploaded-"], .uploaded-document, [data-testid^="document-status-"]')).first() with timeout 8000ms
  - waiting for getByTestId('uploaded-documents').or(locator('[data-testid^="document-uploaded-"], .uploaded-document, [data-testid^="document-status-"]')).first()

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
  - link "← Back to Beneficiaries":
    - /url: http://8.231.80.43:8081/applications/743/beneficiaries
  - link "Application Summary":
    - /url: http://8.231.80.43:8081/applications/743
  - heading "Upload Document" [level=1]
  - text: Document Type
  - combobox:
    - option "KYC_ID" [selected]
    - option "ADDRESS_PROOF"
    - option "INCOME_PROOF"
    - option "OTHER"
  - text: Upload File
  - button "Choose File"
  - text: Simulated File Name
  - textbox "simulated-upload.pdf"
  - button "Upload Document"
  - heading "Uploaded Documents" [level=2]
  - table:
    - rowgroup:
      - row "Type File Size KB Status":
        - columnheader "Type"
        - columnheader "File"
        - columnheader "Size KB"
        - columnheader "Status"
        - columnheader
    - rowgroup:
      - row "No documents uploaded.":
        - cell "No documents uploaded."
  - link "Continue to Review":
    - /url: http://8.231.80.43:8081/applications/743/review
- contentinfo: TalentFarm QA Automation Lab Insurance Order Entry Demo
```

# Test source

```ts
  1   | const { test, tc, expect, env } = require('../../fixtures');
  2   | const M = require('../../config/messages');
  3   | const { files } = require('../../utils/files');
  4   | const { progressTo } = require('../../utils/flows');
  5   | const { expectBlocked, captureEvidence } = require('../../utils/assertions');
  6   | 
  7   | test.describe('Document Upload & Validation Summary', () => {
  8   |   test.use({ agentRole: 'validAgent' });
  9   | 
  10  |   test(...tc('DOC-V01'), async ({ pages }) => {
  11  |     await progressTo(pages, 'documents');
  12  |     for (const file of [files.validPdf(), files.validJpg(), files.validPng()]) {
  13  |       await test.step(`${file.name} is accepted`, async () => {
  14  |         await pages.documents.upload(file, 0);
> 15  |         await expect(pages.documents.uploaded.first()).toBeVisible();
      |                                                        ^ Error: expect(locator).toBeVisible() failed
  16  |         await expect(pages.documents.$$({ id: 'x', css: '.field-error, .invalid-feedback, [role="alert"]' }).filter({ hasText: M.fileType })).toHaveCount(0);
  17  |       });
  18  |     }
  19  |   });
  20  | 
  21  |   test(...tc('DOC-V02'), async ({ pages }) => {
  22  |     await progressTo(pages, 'documents');
  23  |     for (const file of [files.unsupportedExe(), files.unsupportedTxt()]) {
  24  |       await test.step(`${file.name} is rejected`, async () => {
  25  |         await pages.documents.upload(file, 0);
  26  |         await pages.documents.expectErrorText(M.fileType);
  27  |         await expect(pages.documents.uploaded).toHaveCount(0);
  28  |       });
  29  |     }
  30  |   });
  31  | 
  32  |   test(...tc('DOC-V03'), async ({ pages }) => {
  33  |     const max = env.rules.maxUploadMb;
  34  |     test.skip(max === null, 'Set MAX_UPLOAD_MB to run (Q17)');
  35  |     test.skip(max >= 49, 'Playwright in-memory upload limit is 50 MB; use a smaller MAX_UPLOAD_MB on the test environment');
  36  |     await progressTo(pages, 'documents');
  37  |     await pages.documents.upload(files.oversizePdf(max), 0);
  38  |     await pages.documents.expectErrorText(M.fileSize);
  39  |   });
  40  | 
  41  |   test(...tc('DOC-V04'), async ({ pages, page }, testInfo) => {
  42  |     await progressTo(pages, 'documents', { documents: false });
  43  |     const before = await pages.documents.stepTitle();
  44  |     await pages.documents.next();
  45  |     await captureEvidence(page, testInfo, 'next-without-documents');
  46  |     const reachedReview = await pages.review.submitButton.isVisible().catch(() => false);
  47  |     if (!reachedReview) {
  48  |       await expectBlocked(pages.documents, before, M.mandatoryDocument);
  49  |       return;
  50  |     }
  51  |     // The app lets the agent reach review: submission itself must still be blocked.
  52  |     if (await pages.review.submitButton.isEnabled()) {
  53  |       await pages.review.submit();
  54  |       await expect(pages.review.$({ id: 'reference-number', css: '[data-testid="reference-number"], .reference-number' }), 'no reference number may be issued without mandatory documents').toHaveCount(0);
  55  |     } else {
  56  |       await expect(pages.review.submitButton).toBeDisabled();
  57  |     }
  58  |   });
  59  | });
  60  | 
  61  | test.describe('Validation Summary (review step with unresolved errors)', () => {
  62  |   test.use({ agentRole: 'validAgent' });
  63  | 
  64  |   /** Reaches review WITHOUT uploading documents; skips if the app refuses to show review with errors. */
  65  |   async function reviewWithMissingDocuments(pages) {
  66  |     await progressTo(pages, 'documents', { documents: false });
  67  |     await pages.documents.next();
  68  |     const onReview = await pages.review.submitButton.waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
  69  |     test.skip(!onReview, 'The app blocks reaching review while errors exist (validation summary not reachable this way)');
  70  |   }
  71  | 
  72  |   test(...tc('VAL-V01'), async ({ pages }) => {
  73  |     await reviewWithMissingDocuments(pages);
  74  |     await expect(pages.review.validation.items.first()).toBeVisible();
  75  |     const texts = await pages.review.validation.texts();
  76  |     expect(texts.some((t) => M.mandatoryDocument.test(t)), `a summary item about documents in: ${JSON.stringify(texts)}`).toBeTruthy();
  77  |   });
  78  | 
  79  |   test(...tc('VAL-V02'), async ({ pages, page }) => {
  80  |     await reviewWithMissingDocuments(pages);
  81  |     const urlBefore = page.url();
  82  |     const titleBefore = await pages.review.stepTitle();
  83  |     await pages.review.validation.clickItem(0);
  84  |     await expect.poll(async () => page.url() !== urlBefore || (await pages.review.stepTitle()) !== titleBefore, {
  85  |       message: 'clicking a validation item should navigate to the section that owns the error',
  86  |     }).toBe(true);
  87  |   });
  88  | 
  89  |   test(...tc('VAL-V03'), async ({ pages, page }, testInfo) => {
  90  |     await reviewWithMissingDocuments(pages);
  91  |     await test.step('Submit is disabled while errors exist', async () => {
  92  |       await captureEvidence(page, testInfo, 'submit-state-with-errors');
  93  |       await expect(pages.review.submitButton).toBeDisabled();
  94  |     });
  95  |     await test.step('Submit becomes enabled once the errors are resolved', async () => {
  96  |       await pages.review.back();
  97  |       await pages.documents.uploadAllRequired(files.validPdf());
  98  |       await pages.documents.next();
  99  |       await expect(pages.review.submitButton).toBeEnabled();
  100 |     });
  101 |   });
  102 | });
  103 | 
```