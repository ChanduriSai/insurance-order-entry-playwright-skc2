# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\dashboard.spec.js >> Agent Dashboard >> TC-DASH-V05 Status filters (Draft/Submitted/Approved) return correct rows @regression @dashboard @p2
- Location: tests\ui\dashboard.spec.js:31:3

# Error details

```
TimeoutError: locator.evaluate: Timeout 10000ms exceeded.
Call log:
  - waiting for getByTestId('dashboard-status-filter').or(getByLabel(/status/i)).first()

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
  1   | const { expect } = require('@playwright/test');
  2   | const env = require('../config/env');
  3   | const { S } = require('../config/selectors');
  4   | const { loc, byPrefix } = require('../utils/locators');
  5   | const { formatDate } = require('../utils/dates');
  6   | const { escapeRegex } = require('../utils/parse');
  7   | 
  8   | /**
  9   |  * Shared behaviour for every screen. Page objects expose USER ACTIONS and read-only getters;
  10  |  * the test files own the assertions (small reusable state checks live here as expect* helpers).
  11  |  */
  12  | class BasePage {
  13  |   constructor(page) {
  14  |     this.page = page;
  15  |   }
  16  | 
  17  |   /** First element matching a selector definition (testid, with role/label fallbacks). */
  18  |   $(def) {
  19  |     return loc(this.page, def).first();
  20  |   }
  21  |   /** All elements matching a selector definition. */
  22  |   $$(def) {
  23  |     return loc(this.page, def);
  24  |   }
  25  |   byPrefix(prefix) {
  26  |     return byPrefix(this.page, prefix);
  27  |   }
  28  | 
  29  |   async goto(path) {
  30  |     await this.page.goto(path);
  31  |   }
  32  | 
  33  |   async fillField(def, value) {
  34  |     if (value === undefined || value === null) return;
  35  |     await this.$(def).fill(String(value));
  36  |   }
  37  | 
  38  |   /** Selects an option by label, then by value, then by partial text; falls back to the first real option. */
  39  |   async choose(def, value) {
  40  |     if (value === undefined || value === null) return;
  41  |     const el = this.$(def);
> 42  |     const tag = await el.evaluate((n) => n.tagName.toLowerCase());
      |                          ^ TimeoutError: locator.evaluate: Timeout 10000ms exceeded.
  43  |     if (tag !== 'select') {
  44  |       await el.fill(String(value));
  45  |       return;
  46  |     }
  47  |     for (const attempt of [{ label: String(value) }, String(value)]) {
  48  |       try {
  49  |         await el.selectOption(attempt, { timeout: 1500 });
  50  |         return;
  51  |       } catch {
  52  |         /* try next strategy */
  53  |       }
  54  |     }
  55  |     const options = await el.locator('option').evaluateAll((os) =>
  56  |       os.map((o) => ({ v: o.value, t: (o.textContent || '').trim() })).filter((o) => o.v),
  57  |     );
  58  |     const pattern = new RegExp(escapeRegex(value), 'i');
  59  |     const match = options.find((o) => pattern.test(o.t)) || options[0];
  60  |     if (!match) throw new Error(`No selectable option found for ${JSON.stringify(def.id)} (wanted "${value}")`);
  61  |     await el.selectOption(match.v);
  62  |   }
  63  | 
  64  |   /** Types a Date into a date input in the app's configured format, then blurs to trigger age/validation logic. */
  65  |   async setDate(def, date) {
  66  |     const el = this.$(def);
  67  |     await el.fill(formatDate(date, env.dateFormat));
  68  |     await el.press('Tab');
  69  |   }
  70  | 
  71  |   async setChecked(def, checked) {
  72  |     const el = this.$(def);
  73  |     if (checked) await el.check();
  74  |     else await el.uncheck();
  75  |   }
  76  | 
  77  |   async next() {
  78  |     await this.$(S.common.next).click();
  79  |   }
  80  | 
  81  |   async back() {
  82  |     await this.$(S.common.back).click();
  83  |   }
  84  | 
  85  |   async saveDraft() {
  86  |     await this.$(S.common.saveDraft).click();
  87  |   }
  88  | 
  89  |   async stepTitle() {
  90  |     return ((await this.$(S.common.stepTitle).textContent()) || '').trim();
  91  |   }
  92  | 
  93  |   async expectStep(pattern) {
  94  |     await expect(this.$(S.common.stepTitle)).toHaveText(pattern);
  95  |   }
  96  | 
  97  |   /** Error element belonging to a field: <testid>-error first, then an error node inside the field's wrapper. */
  98  |   fieldError(def) {
  99  |     const field = this.$(def);
  100 |     return this.page
  101 |       .getByTestId(`${def.id}-error`)
  102 |       .or(field.locator('xpath=ancestor::div[1]').locator(S.common.anyError.css))
  103 |       .first();
  104 |   }
  105 | 
  106 |   async expectFieldError(def, pattern) {
  107 |     const err = this.fieldError(def);
  108 |     await expect(err, `expected a validation error next to "${def.id}"`).toBeVisible();
  109 |     if (pattern) await expect(err).toHaveText(pattern);
  110 |   }
  111 | 
  112 |   /** Any visible validation / alert text matching the pattern, anywhere on the page. */
  113 |   async expectErrorText(pattern) {
  114 |     await expect(
  115 |       this.$$(S.common.anyError).filter({ hasText: pattern }).first(),
  116 |       `expected a visible message matching ${pattern}`,
  117 |     ).toBeVisible();
  118 |   }
  119 | 
  120 |   /** The user was NOT moved on: the step title is unchanged after a rejected Next. */
  121 |   async expectStillOnStep(titleBefore) {
  122 |     await expect(this.$(S.common.stepTitle)).toHaveText(titleBefore);
  123 |   }
  124 | 
  125 |   async getValue(def) {
  126 |     return this.$(def).inputValue();
  127 |   }
  128 | }
  129 | 
  130 | module.exports = { BasePage };
  131 | 
```