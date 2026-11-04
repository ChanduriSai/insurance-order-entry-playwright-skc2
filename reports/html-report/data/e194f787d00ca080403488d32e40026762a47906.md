# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\dashboard.spec.js >> Agent Dashboard >> TC-DASH-V04 Draft can be resumed from dashboard with saved data @regression @dashboard @p2 @seeded
- Location: tests\ui\dashboard.spec.js:19:3

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('client-first-name-input').or(getByLabel(/first name/i)).first()
Expected: "QaGMLEQHHF"
Timeout: 8000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" getByTestId('client-first-name-input').or(getByLabel(/first name/i)).first() with timeout 8000ms
  - waiting for getByTestId('client-first-name-input').or(getByLabel(/first name/i)).first()

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
  - link "← Back":
    - /url: http://8.231.80.43:8081/applications
  - link "Application Summary":
    - /url: http://8.231.80.43:8081/applications/742
  - text: "Application #742"
  - heading "Application Summary" [level=1]
  - paragraph: Review the current application state and continue the order entry workflow.
  - heading "Snapshot" [level=2]
  - term: Client
  - definition: QaGMLEQHHF TesterGMLEQHHFFA
  - term: Product
  - definition: Pending
  - term: Sum Assured
  - definition: Pending
  - term: Total Modal Premium
  - definition: $0.00
  - term: Beneficiaries
  - definition: "0"
  - term: Documents
  - definition: "0"
  - term: Status
  - definition: DRAFT
  - heading "Continue Workflow" [level=2]
  - link "Client Information":
    - /url: http://8.231.80.43:8081/applications/742/client
  - link "Address & Contact":
    - /url: http://8.231.80.43:8081/applications/742/address-contact
  - link "KYC & Financial":
    - /url: http://8.231.80.43:8081/applications/742/kyc-financial
  - link "Product & Policy Configuration":
    - /url: http://8.231.80.43:8081/applications/742/product
  - link "Riders":
    - /url: http://8.231.80.43:8081/applications/742/riders
  - link "Beneficiaries":
    - /url: http://8.231.80.43:8081/applications/742/beneficiaries
  - link "Documents":
    - /url: http://8.231.80.43:8081/applications/742/documents
  - link "Review Application":
    - /url: http://8.231.80.43:8081/applications/742/review
- contentinfo: TalentFarm QA Automation Lab Insurance Order Entry Demo
```

# Test source

```ts
  1  | const { test, tc, expect, env } = require('../../fixtures');
  2  | const { PageManager } = require('../../pages');
  3  | const { S } = require('../../config/selectors');
  4  | const { buildClient } = require('../../utils/dataBuilder');
  5  | const { startApplication } = require('../../utils/flows');
  6  | 
  7  | test.describe('Agent Dashboard', () => {
  8  |   test.use({ agentRole: 'validAgent' });
  9  | 
  10 |   test(...tc('DASH-V01'), async ({ pages }) => {
  11 |     await pages.dashboard.goto();
  12 |     await expect(pages.dashboard.newApplicationControl).toBeVisible();
  13 |     for (const def of [S.dashboard.draftCount, S.dashboard.submittedCount]) {
  14 |       const el = pages.dashboard.$(def);
  15 |       if (await el.count()) await expect(el).toHaveText(/\d+/);
  16 |     }
  17 |   });
  18 | 
  19 |   test(...tc('DASH-V04'), async ({ pages }) => {
  20 |     const id = await startApplication(pages);
  21 |     const client = buildClient();
  22 |     await pages.client.fill(client);
  23 |     await pages.client.saveDraft();
  24 |     await pages.dashboard.goto();
  25 |     const row = pages.dashboard.rowForApplication({ name: client.lastName, id });
  26 |     await expect(row, 'saved draft should be listed on the dashboard').toBeVisible();
  27 |     await pages.dashboard.resume(row);
> 28 |     await expect(pages.client.$(S.client.firstName)).toHaveValue(client.firstName);
     |                                                      ^ Error: expect(locator).toHaveValue(expected) failed
  29 |   });
  30 | 
  31 |   test(...tc('DASH-V05'), async ({ pages }) => {
  32 |     await pages.dashboard.goto();
  33 |     for (const status of ['Draft', 'Submitted', 'Approved']) {
  34 |       await test.step(`filter = ${status}`, async () => {
  35 |         await pages.dashboard.filterByStatus(status);
  36 |         for (const s of await pages.dashboard.statuses()) {
  37 |           expect.soft(s, `row status under filter "${status}"`).toContain(status.toLowerCase());
  38 |         }
  39 |       });
  40 |     }
  41 |   });
  42 | 
  43 |   test(...tc('DASH-V07'), async ({ pages }) => {
  44 |     await pages.dashboard.goto();
  45 |     test.skip((await pages.dashboard.rows.count()) === 0, 'No applications to search for');
  46 |     const term = ((await pages.dashboard.rows.first().innerText()) || '').split(/\s+/).find((w) => /^[A-Za-z0-9-]{4,}$/.test(w));
  47 |     test.skip(!term, 'No searchable token found in the first row');
  48 |     await pages.dashboard.search(term);
  49 |     await expect(pages.dashboard.rows.first()).toBeVisible();
  50 |     const n = await pages.dashboard.rows.count();
  51 |     for (let i = 0; i < n; i += 1) await expect.soft(pages.dashboard.rows.nth(i)).toContainText(term, { ignoreCase: true });
  52 |   });
  53 | 
  54 |   test.describe('multi-agent isolation', () => {
  55 |     test.skip(!env.users.secondAgent.email, 'Set AGENT_SECOND_EMAIL to run the isolation test (Q06)');
  56 | 
  57 |     const keysOf = async (pm) => {
  58 |       await pm.dashboard.goto();
  59 |       const n = await pm.dashboard.rows.count();
  60 |       const keys = [];
  61 |       for (let i = 0; i < n; i += 1) {
  62 |         const row = pm.dashboard.rows.nth(i);
  63 |         keys.push((await pm.dashboard.rowId(row)) || (await row.innerText()).replace(/\s+/g, ' ').trim());
  64 |       }
  65 |       return keys;
  66 |     };
  67 | 
  68 |     test(...tc('DASH-V02'), async ({ pages, browser }) => {
  69 |       const ctxB = await browser.newContext({ baseURL: env.baseUrl });
  70 |       try {
  71 |         const pmB = new PageManager(await ctxB.newPage());
  72 |         await pmB.login.loginViaUi(env.users.secondAgent);
  73 |         await pmB.login.expectLoggedIn();
  74 |         const a = await keysOf(pages);
  75 |         const b = await keysOf(pmB);
  76 |         test.skip(!a.length || !b.length, 'Both agents need at least one application to compare');
  77 |         expect(a.filter((k) => b.includes(k)), 'applications visible to BOTH agents').toEqual([]);
  78 |       } finally {
  79 |         await ctxB.close();
  80 |       }
  81 |     });
  82 |   });
  83 | });
  84 | 
  85 | test.describe('Agent Dashboard - new agent', () => {
  86 |   test.use({ agentRole: 'newAgent' });
  87 |   test.skip(!env.users.newAgent.email, 'Set AGENT_NEW_EMAIL to run the empty-state test (Q06)');
  88 | 
  89 |   test(...tc('DASH-V03'), async ({ pages }) => {
  90 |     await pages.dashboard.goto();
  91 |     await expect(pages.dashboard.$(S.dashboard.emptyState)).toBeVisible();
  92 |     await expect(pages.dashboard.newApplicationControl).toBeVisible();
  93 |     await expect(pages.dashboard.rows).toHaveCount(0);
  94 |   });
  95 | });
  96 | 
```