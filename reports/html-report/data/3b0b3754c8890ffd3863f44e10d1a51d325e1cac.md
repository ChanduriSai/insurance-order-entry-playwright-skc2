# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\dashboard.spec.js >> Agent Dashboard - new agent >> TC-DASH-V03 New agent sees empty-state copy and CTA @regression @dashboard @p3
- Location: tests\ui\dashboard.spec.js:89:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('dashboard-empty-state').or(getByText(/no applications|get started|nothing here|no records/i)).first()
Expected: visible
Timeout: 8000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByTestId('dashboard-empty-state').or(getByText(/no applications|get started|nothing here|no records/i)).first() with timeout 8000ms
  - waiting for getByTestId('dashboard-empty-state').or(getByText(/no applications|get started|nothing here|no records/i)).first()

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
  - heading "Agent Dashboard" [level=1]
  - paragraph: Track drafts, submitted applications, and policy order entry work.
  - link "Start New Application":
    - /url: http://8.231.80.43:8081/applications/new
  - text: Draft 612 Submitted 79 Under Review 0 Approved 1 Requires Info 0
  - heading "Recent Applications" [level=2]
  - link "View all":
    - /url: http://8.231.80.43:8081/applications
  - table:
    - rowgroup:
      - row "Reference Client Product Status Updated":
        - columnheader "Reference"
        - columnheader "Client"
        - columnheader "Product"
        - columnheader "Status"
        - columnheader "Updated"
        - columnheader
    - rowgroup:
      - 'row "Draft #742 QaGMLEQHHF TesterGMLEQHHFFA Not selected DRAFT 04 Nov 2026 Open"':
        - 'cell "Draft #742"'
        - cell "QaGMLEQHHF TesterGMLEQHHFFA"
        - cell "Not selected"
        - cell "DRAFT"
        - cell "04 Nov 2026"
        - cell "Open":
          - link "Open":
            - /url: http://8.231.80.43:8081/applications/742
      - 'row "Draft #741 QaFICQIOBB TesterFICQIOBBGU Not selected DRAFT 04 Nov 2026 Open"':
        - 'cell "Draft #741"'
        - cell "QaFICQIOBB TesterFICQIOBBGU"
        - cell "Not selected"
        - cell "DRAFT"
        - cell "04 Nov 2026"
        - cell "Open":
          - link "Open":
            - /url: http://8.231.80.43:8081/applications/741
      - 'row "Draft #740 J0hn123 TesterYQBCMSBIRL Not selected DRAFT 04 Nov 2026 Open"':
        - 'cell "Draft #740"'
        - cell "J0hn123 TesterYQBCMSBIRL"
        - cell "Not selected"
        - cell "DRAFT"
        - cell "04 Nov 2026"
        - cell "Open":
          - link "Open":
            - /url: http://8.231.80.43:8081/applications/740
      - 'row "Draft #739 Not selected DRAFT 04 Nov 2026 Open"':
        - 'cell "Draft #739"'
        - cell
        - cell "Not selected"
        - cell "DRAFT"
        - cell "04 Nov 2026"
        - cell "Open":
          - link "Open":
            - /url: http://8.231.80.43:8081/applications/739
      - 'row "Draft #738 QaWEBWEAFR TesterWEBWEAFRKJ Not selected DRAFT 04 Nov 2026 Open"':
        - 'cell "Draft #738"'
        - cell "QaWEBWEAFR TesterWEBWEAFRKJ"
        - cell "Not selected"
        - cell "DRAFT"
        - cell "04 Nov 2026"
        - cell "Open":
          - link "Open":
            - /url: http://8.231.80.43:8081/applications/738
      - 'row "Draft #737 QaKFJAAGAB TesterKFJAAGABHC Not selected DRAFT 04 Nov 2026 Open"':
        - 'cell "Draft #737"'
        - cell "QaKFJAAGAB TesterKFJAAGABHC"
        - cell "Not selected"
        - cell "DRAFT"
        - cell "04 Nov 2026"
        - cell "Open":
          - link "Open":
            - /url: http://8.231.80.43:8081/applications/737
      - 'row "Draft #736 QaNPBCEJFB TesterNPBCEJFBCG Not selected DRAFT 04 Nov 2026 Open"':
        - 'cell "Draft #736"'
        - cell "QaNPBCEJFB TesterNPBCEJFBCG"
        - cell "Not selected"
        - cell "DRAFT"
        - cell "04 Nov 2026"
        - cell "Open":
          - link "Open":
            - /url: http://8.231.80.43:8081/applications/736
      - 'row "Draft #735 Not selected DRAFT 04 Nov 2026 Open"':
        - 'cell "Draft #735"'
        - cell
        - cell "Not selected"
        - cell "DRAFT"
        - cell "04 Nov 2026"
        - cell "Open":
          - link "Open":
            - /url: http://8.231.80.43:8081/applications/735
      - 'row "Draft #734 QaIZTBFJBI TesterIZTBFJBIPR Not selected DRAFT 04 Nov 2026 Open"':
        - 'cell "Draft #734"'
        - cell "QaIZTBFJBI TesterIZTBFJBIPR"
        - cell "Not selected"
        - cell "DRAFT"
        - cell "04 Nov 2026"
        - cell "Open":
          - link "Open":
            - /url: http://8.231.80.43:8081/applications/734
      - 'row "Draft #733 QaRIFFNNBQ TesterRIFFNNBQCE Not selected DRAFT 04 Nov 2026 Open"':
        - 'cell "Draft #733"'
        - cell "QaRIFFNNBQ TesterRIFFNNBQCE"
        - cell "Not selected"
        - cell "DRAFT"
        - cell "04 Nov 2026"
        - cell "Open":
          - link "Open":
            - /url: http://8.231.80.43:8081/applications/733
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
  28 |     await expect(pages.client.$(S.client.firstName)).toHaveValue(client.firstName);
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
> 91 |     await expect(pages.dashboard.$(S.dashboard.emptyState)).toBeVisible();
     |                                                             ^ Error: expect(locator).toBeVisible() failed
  92 |     await expect(pages.dashboard.newApplicationControl).toBeVisible();
  93 |     await expect(pages.dashboard.rows).toHaveCount(0);
  94 |   });
  95 | });
  96 | 
```