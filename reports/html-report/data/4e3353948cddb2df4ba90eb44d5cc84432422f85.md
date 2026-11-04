# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\dashboard.spec.js >> Agent Dashboard >> TC-DASH-V07 Dashboard search returns matching applications @regression @dashboard @p3
- Location: tests\ui\dashboard.spec.js:43:3

# Error details

```
TimeoutError: locator.fill: Timeout 10000ms exceeded.
Call log:
  - waiting for getByTestId('dashboard-search').or(getByLabel(/search/i)).or(getByRole('searchbox')).or(getByPlaceholder(/search/i)).first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - link "Insurance Order Entry Demo Platform QA Automation Training App" [ref=e4] [cursor=pointer]:
        - /url: http://8.231.80.43:8081/dashboard
        - generic [aria-hidden] [ref=e5]: IO
        - generic [ref=e6]:
          - generic [ref=e7]: Insurance Order Entry Demo Platform
          - generic [ref=e8]: QA Automation Training App
      - generic [ref=e9]:
        - list [ref=e10]:
          - listitem [ref=e11]:
            - link "Dashboard" [ref=e12] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/dashboard
          - listitem [ref=e13]:
            - link "Applications" [ref=e14] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/applications
          - listitem [ref=e15]:
            - link "Products" [ref=e16] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/products
          - listitem [ref=e17]:
            - link "Support" [ref=e18] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/support
        - generic [ref=e19]:
          - link "Valid Agent" [ref=e20] [cursor=pointer]:
            - /url: http://8.231.80.43:8081/profile
          - button "Logout" [ref=e22] [cursor=pointer]
  - main [ref=e23]:
    - generic [ref=e24]:
      - generic [ref=e25]:
        - heading "Agent Dashboard" [level=1] [ref=e26]
        - paragraph [ref=e27]: Track drafts, submitted applications, and policy order entry work.
      - link "Start New Application" [ref=e28] [cursor=pointer]:
        - /url: http://8.231.80.43:8081/applications/new
    - generic [ref=e29]:
      - generic [ref=e32]:
        - generic [ref=e33]: Draft
        - generic [ref=e34]: "612"
      - generic [ref=e37]:
        - generic [ref=e38]: Submitted
        - generic [ref=e39]: "79"
      - generic [ref=e42]:
        - generic [ref=e43]: Under Review
        - generic [ref=e44]: "0"
      - generic [ref=e47]:
        - generic [ref=e48]: Approved
        - generic [ref=e49]: "1"
      - generic [ref=e52]:
        - generic [ref=e53]: Requires Info
        - generic [ref=e54]: "0"
    - generic [ref=e55]:
      - generic [ref=e56]:
        - heading "Recent Applications" [level=2] [ref=e57]
        - link "View all" [ref=e58] [cursor=pointer]:
          - /url: http://8.231.80.43:8081/applications
      - table [ref=e60]:
        - rowgroup [ref=e61]:
          - row [ref=e62]:
            - columnheader "Reference" [ref=e63]
            - columnheader "Client" [ref=e64]
            - columnheader "Product" [ref=e65]
            - columnheader "Status" [ref=e66]
            - columnheader "Updated" [ref=e67]
            - columnheader [ref=e68]
        - rowgroup [ref=e69]:
          - row [ref=e70]:
            - 'cell "Draft #742" [ref=e71]'
            - cell "QaGMLEQHHF TesterGMLEQHHFFA" [ref=e72]
            - cell "Not selected" [ref=e73]
            - cell "DRAFT" [ref=e74]
            - cell "04 Nov 2026" [ref=e76]
            - cell [ref=e77]:
              - link "Open" [ref=e78] [cursor=pointer]:
                - /url: http://8.231.80.43:8081/applications/742
          - row [ref=e79]:
            - 'cell "Draft #741" [ref=e80]'
            - cell "QaFICQIOBB TesterFICQIOBBGU" [ref=e81]
            - cell "Not selected" [ref=e82]
            - cell "DRAFT" [ref=e83]
            - cell "04 Nov 2026" [ref=e85]
            - cell [ref=e86]:
              - link "Open" [ref=e87] [cursor=pointer]:
                - /url: http://8.231.80.43:8081/applications/741
          - row [ref=e88]:
            - 'cell "Draft #740" [ref=e89]'
            - cell "J0hn123 TesterYQBCMSBIRL" [ref=e90]
            - cell "Not selected" [ref=e91]
            - cell "DRAFT" [ref=e92]
            - cell "04 Nov 2026" [ref=e94]
            - cell [ref=e95]:
              - link "Open" [ref=e96] [cursor=pointer]:
                - /url: http://8.231.80.43:8081/applications/740
          - row [ref=e97]:
            - 'cell "Draft #739" [ref=e98]'
            - cell [ref=e99]
            - cell "Not selected" [ref=e100]
            - cell "DRAFT" [ref=e101]
            - cell "04 Nov 2026" [ref=e103]
            - cell [ref=e104]:
              - link "Open" [ref=e105] [cursor=pointer]:
                - /url: http://8.231.80.43:8081/applications/739
          - row [ref=e106]:
            - 'cell "Draft #738" [ref=e107]'
            - cell "QaWEBWEAFR TesterWEBWEAFRKJ" [ref=e108]
            - cell "Not selected" [ref=e109]
            - cell "DRAFT" [ref=e110]
            - cell "04 Nov 2026" [ref=e112]
            - cell [ref=e113]:
              - link "Open" [ref=e114] [cursor=pointer]:
                - /url: http://8.231.80.43:8081/applications/738
          - row [ref=e115]:
            - 'cell "Draft #737" [ref=e116]'
            - cell "QaKFJAAGAB TesterKFJAAGABHC" [ref=e117]
            - cell "Not selected" [ref=e118]
            - cell "DRAFT" [ref=e119]
            - cell "04 Nov 2026" [ref=e121]
            - cell [ref=e122]:
              - link "Open" [ref=e123] [cursor=pointer]:
                - /url: http://8.231.80.43:8081/applications/737
          - row [ref=e124]:
            - 'cell "Draft #736" [ref=e125]'
            - cell "QaNPBCEJFB TesterNPBCEJFBCG" [ref=e126]
            - cell "Not selected" [ref=e127]
            - cell "DRAFT" [ref=e128]
            - cell "04 Nov 2026" [ref=e130]
            - cell [ref=e131]:
              - link "Open" [ref=e132] [cursor=pointer]:
                - /url: http://8.231.80.43:8081/applications/736
          - row [ref=e133]:
            - 'cell "Draft #735" [ref=e134]'
            - cell [ref=e135]
            - cell "Not selected" [ref=e136]
            - cell "DRAFT" [ref=e137]
            - cell "04 Nov 2026" [ref=e139]
            - cell [ref=e140]:
              - link "Open" [ref=e141] [cursor=pointer]:
                - /url: http://8.231.80.43:8081/applications/735
          - row [ref=e142]:
            - 'cell "Draft #734" [ref=e143]'
            - cell "QaIZTBFJBI TesterIZTBFJBIPR" [ref=e144]
            - cell "Not selected" [ref=e145]
            - cell "DRAFT" [ref=e146]
            - cell "04 Nov 2026" [ref=e148]
            - cell [ref=e149]:
              - link "Open" [ref=e150] [cursor=pointer]:
                - /url: http://8.231.80.43:8081/applications/734
          - row [ref=e151]:
            - 'cell "Draft #733" [ref=e152]'
            - cell "QaRIFFNNBQ TesterRIFFNNBQCE" [ref=e153]
            - cell "Not selected" [ref=e154]
            - cell "DRAFT" [ref=e155]
            - cell "04 Nov 2026" [ref=e157]
            - cell [ref=e158]:
              - link "Open" [ref=e159] [cursor=pointer]:
                - /url: http://8.231.80.43:8081/applications/733
  - contentinfo [ref=e160]:
    - generic [ref=e161]:
      - generic [ref=e162]: TalentFarm QA Automation Lab
      - generic [ref=e163]: Insurance Order Entry Demo
```

# Test source

```ts
  1  | const { expect } = require('@playwright/test');
  2  | const { BasePage } = require('./BasePage');
  3  | const { S } = require('../config/selectors');
  4  | const { loc } = require('../utils/locators');
  5  | const routes = require('../config/routes');
  6  | 
  7  | /** Extracts the application id from URLs like /applications/123/client or /application/ABC-1/edit. */
  8  | function applicationIdFromUrl(url) {
  9  |   const m = new URL(url).pathname.match(/applications?\/(?!new\b|create\b)([A-Za-z0-9_-]+)/i);
  10 |   return m ? m[1] : null;
  11 | }
  12 | 
  13 | class DashboardPage extends BasePage {
  14 |   async goto() {
  15 |     await this.page.goto(routes.dashboard);
  16 |     await this.expectLoaded();
  17 |   }
  18 | 
  19 |   async expectLoaded() {
  20 |     await expect(this.page).toHaveURL(/dashboard/);
  21 |     await expect(this.newApplicationControl).toBeVisible();
  22 |   }
  23 | 
  24 |   get newApplicationControl() {
  25 |     return loc(this.page, S.dashboard.newApplication).or(loc(this.page, S.dashboard.newApplicationBtn)).first();
  26 |   }
  27 | 
  28 |   /** Starts a new application and returns its id (parsed from the URL, or null if the URL has none). */
  29 |   async startNewApplication() {
  30 |     await this.newApplicationControl.click();
  31 |     const draft = this.page.getByTestId('application-create-draft-button');
  32 |     if (await draft.isVisible({ timeout: 3000 }).catch(() => false)) await draft.click();
  33 |     await expect(this.$(S.client.firstName)).toBeVisible();
  34 |     return applicationIdFromUrl(this.page.url());
  35 |   }
  36 | 
  37 |   get rows() {
  38 |     return this.$$(S.dashboard.rows);
  39 |   }
  40 | 
  41 |   rowFor(text) {
  42 |     return this.rows.filter({ hasText: text }).first();
  43 |   }
  44 | 
  45 |   /** Row for an application: matches the client name (unique per test) or, failing that, the application id. */
  46 |   rowForApplication({ name, id } = {}) {
  47 |     let rows = this.rows.filter({ hasText: name || '\u0000never' });
  48 |     if (id) rows = rows.or(this.rows.filter({ hasText: String(id) }));
  49 |     return rows.first();
  50 |   }
  51 | 
  52 |   /** Application id from a row's data-testid (application-row-<id>) or its first link href, or null. */
  53 |   async rowId(row) {
  54 |     const tid = await row.getAttribute('data-testid');
  55 |     if (tid && tid.startsWith(S.dashboard.rowPrefix)) return tid.slice(S.dashboard.rowPrefix.length);
  56 |     const href = await row.locator('a').first().getAttribute('href').catch(() => null);
  57 |     const m = href && href.match(/applications?\/([A-Za-z0-9_-]+)/i);
  58 |     return m ? m[1] : null;
  59 |   }
  60 | 
  61 |   statusOf(row) {
  62 |     return row.locator(S.dashboard.statusCell.css).first();
  63 |   }
  64 | 
  65 |   /** Lower-cased status text of every visible row. */
  66 |   async statuses() {
  67 |     const n = await this.rows.count();
  68 |     const out = [];
  69 |     for (let i = 0; i < n; i += 1) {
  70 |       out.push(((await this.statusOf(this.rows.nth(i)).textContent()) || '').trim().toLowerCase());
  71 |     }
  72 |     return out;
  73 |   }
  74 | 
  75 |   async filterByStatus(status) {
  76 |     await this.choose(S.dashboard.statusFilter, status);
  77 |     await this.page.waitForLoadState('networkidle');
  78 |   }
  79 | 
  80 |   async search(text) {
> 81 |     await this.$(S.dashboard.search).fill(text);
     |                                      ^ TimeoutError: locator.fill: Timeout 10000ms exceeded.
  82 |     await this.$(S.dashboard.search).press('Enter');
  83 |     await this.page.waitForLoadState('networkidle');
  84 |   }
  85 | 
  86 |   /** Opens a draft row (resume). */
  87 |   async resume(row) {
  88 |     const link = row.locator('a, button').filter({ hasText: /resume|continue|open|edit/i }).first();
  89 |     if (await link.count()) await link.click();
  90 |     else await row.click();
  91 |   }
  92 | 
  93 |   async logout() {
  94 |     await this.$(S.common.logout).click();
  95 |   }
  96 | }
  97 | 
  98 | module.exports = { DashboardPage, applicationIdFromUrl };
  99 | 
```