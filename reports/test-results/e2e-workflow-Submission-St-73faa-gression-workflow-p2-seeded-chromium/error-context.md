# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\workflow.spec.js >> Submission & Status Tracking >> TC-WF-V02 Draft resumed with previously saved data intact @regression @workflow @p2 @seeded
- Location: tests\e2e\workflow.spec.js:30:3

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByTestId('step-back').or(getByRole('button', { name: /^(back|previous)/i })).first()

```

# Page snapshot

```yaml
- generic [active] [ref=f5e1]:
  - navigation [ref=f5e2]:
    - generic [ref=f5e3]:
      - link "Insurance Order Entry Demo Platform QA Automation Training App" [ref=f5e4] [cursor=pointer]:
        - /url: http://8.231.80.43:8081/dashboard
        - generic [aria-hidden] [ref=f5e5]: IO
        - generic [ref=f5e6]:
          - generic [ref=f5e7]: Insurance Order Entry Demo Platform
          - generic [ref=f5e8]: QA Automation Training App
      - generic [ref=f5e9]:
        - list [ref=f5e10]:
          - listitem [ref=f5e11]:
            - link "Dashboard" [ref=f5e12] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/dashboard
          - listitem [ref=f5e13]:
            - link "Applications" [ref=f5e14] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/applications
          - listitem [ref=f5e15]:
            - link "Products" [ref=f5e16] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/products
          - listitem [ref=f5e17]:
            - link "Support" [ref=f5e18] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/support
        - generic [ref=f5e19]:
          - link "Valid Agent" [ref=f5e20] [cursor=pointer]:
            - /url: http://8.231.80.43:8081/profile
          - button "Logout" [ref=f5e22] [cursor=pointer]
  - main [ref=f5e23]:
    - generic [ref=f5e25]:
      - link "← Back" [ref=f5e26] [cursor=pointer]:
        - /url: http://8.231.80.43:8081/applications
      - link "Application Summary" [ref=f5e27] [cursor=pointer]:
        - /url: http://8.231.80.43:8081/applications/714
    - generic [ref=f5e28]:
      - generic [ref=f5e30]:
        - generic [ref=f5e31]: "Application #714"
        - heading "Application Summary" [level=1] [ref=f5e32]
        - paragraph [ref=f5e33]: Review the current application state and continue the order entry workflow.
      - generic [ref=f5e34]:
        - generic [ref=f5e37]:
          - heading "Snapshot" [level=2] [ref=f5e38]
          - generic [ref=f5e39]:
            - term [ref=f5e40]: Client
            - definition [ref=f5e41]: QaJQFYCLFN TesterJQFYCLFNBD
            - term [ref=f5e42]: Product
            - definition [ref=f5e43]: Pending
            - term [ref=f5e44]: Sum Assured
            - definition [ref=f5e45]: Pending
            - term [ref=f5e46]: Total Modal Premium
            - definition [ref=f5e47]: $0.00
            - term [ref=f5e48]: Beneficiaries
            - definition [ref=f5e49]: "0"
            - term [ref=f5e50]: Documents
            - definition [ref=f5e51]: "0"
            - term [ref=f5e52]: Status
            - definition [ref=f5e53]: DRAFT
        - generic [ref=f5e56]:
          - heading "Continue Workflow" [level=2] [ref=f5e57]
          - generic [ref=f5e58]:
            - link "Client Information" [ref=f5e59] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/applications/714/client
            - link "Address & Contact" [ref=f5e60] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/applications/714/address-contact
            - link "KYC & Financial" [ref=f5e61] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/applications/714/kyc-financial
            - link "Product & Policy Configuration" [ref=f5e62] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/applications/714/product
            - link "Riders" [ref=f5e63] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/applications/714/riders
            - link "Beneficiaries" [ref=f5e64] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/applications/714/beneficiaries
            - link "Documents" [ref=f5e65] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/applications/714/documents
            - link "Review Application" [ref=f5e66] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/applications/714/review
  - contentinfo [ref=f5e67]:
    - generic [ref=f5e68]:
      - generic [ref=f5e69]: TalentFarm QA Automation Lab
      - generic [ref=f5e70]: Insurance Order Entry Demo
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
  42  |     const tag = await el.evaluate((n) => n.tagName.toLowerCase());
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
> 82  |     await this.$(S.common.back).click();
      |                                 ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
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