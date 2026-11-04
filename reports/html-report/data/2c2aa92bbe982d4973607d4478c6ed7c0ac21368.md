# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\client.spec.js >> Client / Insured Information >> TC-CLI-V13 Calculated age is displayed after DOB entry @regression @client @p2
- Location: tests\ui\client.spec.js:125:3

# Error details

```
Error: calculated age display

calculated age display

expect(received).toBe(expected) // Object.is equality

Expected: 18
Received: NaN

Call Log:
- Timeout 8000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [ref=f2e1]:
  - navigation [ref=f2e2]:
    - generic [ref=f2e3]:
      - link "Insurance Order Entry Demo Platform QA Automation Training App" [ref=f2e4] [cursor=pointer]:
        - /url: http://8.231.80.43:8081/dashboard
        - generic [aria-hidden] [ref=f2e5]: IO
        - generic [ref=f2e6]:
          - generic [ref=f2e7]: Insurance Order Entry Demo Platform
          - generic [ref=f2e8]: QA Automation Training App
      - generic [ref=f2e9]:
        - list [ref=f2e10]:
          - listitem [ref=f2e11]:
            - link "Dashboard" [ref=f2e12] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/dashboard
          - listitem [ref=f2e13]:
            - link "Applications" [ref=f2e14] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/applications
          - listitem [ref=f2e15]:
            - link "Products" [ref=f2e16] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/products
          - listitem [ref=f2e17]:
            - link "Support" [ref=f2e18] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/support
        - generic [ref=f2e19]:
          - link "Valid Agent" [ref=f2e20] [cursor=pointer]:
            - /url: http://8.231.80.43:8081/profile
          - button "Logout" [ref=f2e22] [cursor=pointer]
  - main [ref=f2e23]:
    - alert [ref=f2e24]: Draft application created.
    - generic [ref=f2e26]:
      - link "← Back" [ref=f2e27] [cursor=pointer]:
        - /url: http://8.231.80.43:8081/applications
      - link "Application Summary" [ref=f2e28] [cursor=pointer]:
        - /url: http://8.231.80.43:8081/applications/739
    - generic [ref=f2e30]:
      - heading "Client / Insured Information" [level=1] [ref=f2e31]
      - generic [ref=f2e32]:
        - generic [ref=f2e33]:
          - generic [ref=f2e34]:
            - generic [ref=f2e35]: First Name
            - textbox [ref=f2e36]
          - generic [ref=f2e37]:
            - generic [ref=f2e38]: Middle Name
            - textbox [ref=f2e39]
          - generic [ref=f2e40]:
            - generic [ref=f2e41]: Last Name
            - textbox [ref=f2e42]
          - generic [ref=f2e43]:
            - generic [ref=f2e44]: Date of Birth
            - textbox [active] [ref=f2e45]: 2008-11-04
          - generic [ref=f2e46]:
            - generic [ref=f2e47]: Gender
            - combobox [ref=f2e48]:
              - option "MALE" [selected]
              - option "FEMALE"
              - option "NON_BINARY"
          - generic [ref=f2e49]:
            - generic [ref=f2e50]: Marital Status
            - combobox [ref=f2e51]:
              - option "SINGLE" [selected]
              - option "MARRIED"
              - option "DIVORCED"
              - option "WIDOWED"
          - generic [ref=f2e52]:
            - generic [ref=f2e53]: Nationality
            - textbox [ref=f2e54]: United States
          - generic [ref=f2e55]:
            - generic [ref=f2e56]: Occupation
            - textbox [ref=f2e57]
          - generic [ref=f2e58]:
            - generic [ref=f2e59]: Employer Name
            - textbox [ref=f2e60]
          - generic [ref=f2e61]:
            - generic [ref=f2e62]: Employer Address
            - textbox [ref=f2e63]
        - generic [ref=f2e64]:
          - button "Save and Continue" [ref=f2e65] [cursor=pointer]
          - link "Back" [ref=f2e66] [cursor=pointer]:
            - /url: http://8.231.80.43:8081/applications/739
  - contentinfo [ref=f2e67]:
    - generic [ref=f2e68]:
      - generic [ref=f2e69]: TalentFarm QA Automation Lab
      - generic [ref=f2e70]: Insurance Order Entry Demo
```

# Test source

```ts
  1  | const { expect } = require('@playwright/test');
  2  | const { BasePage } = require('./BasePage');
  3  | const { S } = require('../config/selectors');
  4  | 
  5  | /** Step 3 - Client / Insured Information. */
  6  | class ClientInfoPage extends BasePage {
  7  |   async fill(c) {
  8  |     await this.fillField(S.client.firstName, c.firstName);
  9  |     await this.fillField(S.client.lastName, c.lastName);
  10 |     if (c.dob) await this.setDate(S.client.dob, c.dob);
  11 |     await this.choose(S.client.gender, c.gender);
  12 |     await this.choose(S.client.maritalStatus, c.maritalStatus);
  13 |     await this.choose(S.client.nationality, c.nationality);
  14 |     await this.fillField(S.client.occupation, c.occupation);
  15 |     await this.fillField(S.client.employer, c.employer);
  16 |     await this.fillField(S.client.employerAddress, c.employerAddress);
  17 |   }
  18 | 
  19 |   async setDob(date) {
  20 |     await this.setDate(S.client.dob, date);
  21 |   }
  22 | 
  23 |   /** Displayed calculated age (text or input value), as a number, or NaN if not shown. */
  24 |   async displayedAge() {
  25 |     const el = this.$(S.client.age);
  26 |     if (!(await el.count())) return NaN;
  27 |     const tag = await el.evaluate((n) => n.tagName.toLowerCase());
  28 |     const raw = tag === 'input' ? await el.inputValue() : (await el.textContent()) || '';
  29 |     const m = raw.match(/\d+/);
  30 |     return m ? Number(m[0]) : NaN;
  31 |   }
  32 | 
  33 |   async expectAgeShown(expected) {
> 34 |     await expect.poll(() => this.displayedAge(), { message: 'calculated age display' }).toBe(expected);
     |                                                                                         ^ Error: calculated age display
  35 |   }
  36 | }
  37 | 
  38 | module.exports = { ClientInfoPage };
  39 | 
```