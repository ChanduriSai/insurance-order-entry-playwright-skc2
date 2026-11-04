# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\product.spec.js >> Product Selection & Policy Configuration >> face value limits >> TC-PROD-V03 Face value below minimum rejected @regression @product @p2
- Location: tests\ui\product.spec.js:32:5

# Error details

```
Error: expected a visible message matching /minimum|maximum|between|limit|face value|sum assured/i

expect(locator).toBeVisible() failed

Locator: getByTestId('field-error').or(locator('.field-error, .invalid-feedback, .text-danger, .error, [role="alert"]')).filter({ hasText: /minimum|maximum|between|limit|face value|sum assured/i }).first()
Expected: visible
Timeout: 8000ms
Error: element(s) not found

Call log:
  - expected a visible message matching /minimum|maximum|between|limit|face value|sum assured/i getByTestId('field-error').or(locator('.field-error, .invalid-feedback, .text-danger, .error, [role="alert"]')).filter({ hasText: /minimum|maximum|between|limit|face value|sum assured/i }).first() with timeout 8000ms
  - waiting for getByTestId('field-error').or(locator('.field-error, .invalid-feedback, .text-danger, .error, [role="alert"]')).filter({ hasText: /minimum|maximum|between|limit|face value|sum assured/i }).first()

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
  - alert: KYC, financial, and compliance information saved.
  - link "← Back to KYC & Financial":
    - /url: http://8.231.80.43:8081/applications/752/kyc-financial
  - link "Application Summary":
    - /url: http://8.231.80.43:8081/applications/752
  - text: "Application #752"
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
  - spinbutton "Sum Assured": "99999"
  - text: Premium Payment Frequency
  - combobox "Premium Payment Frequency":
    - option "Monthly" [selected]
    - option "Quarterly"
    - option "Semi-Annual"
    - option "Annual"
  - text: Premium Payment Term
  - combobox "Premium Payment Term":
    - option "Select term" [selected]
    - option "10 years"
    - option "15 years"
    - option "20 years"
    - option "25 years"
    - option "30 years"
  - text: Coverage Term
  - combobox "Coverage Term":
    - option "Whole Life" [selected]
    - option "To Age 100"
  - text: Estimated Total Modal Premium $39.58 Estimated premium will be saved when you continue.
  - button "Save and Continue"
- contentinfo: TalentFarm QA Automation Lab Insurance Order Entry Demo
```

# Test source

```ts
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
> 117 |     ).toBeVisible();
      |       ^ Error: expected a visible message matching /minimum|maximum|between|limit|face value|sum assured/i
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