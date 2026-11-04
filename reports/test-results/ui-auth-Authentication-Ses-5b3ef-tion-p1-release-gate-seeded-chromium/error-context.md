# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\auth.spec.js >> Authentication & Session >> TC-AUTH-V06 Locked user cannot access dashboard; lock message shown @regression @authentication @p1 @release-gate @seeded
- Location: tests\ui\auth.spec.js:53:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/login/
Received string:  "http://8.231.80.43:8081/change-password"
Timeout: 8000ms

Call log:
  - Expect "toHaveURL" with timeout 8000ms
    19 × locator resolved to <html lang="en">…</html>
       - unexpected value "http://8.231.80.43:8081/change-password"

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
  - link "Locked Agent":
    - /url: http://8.231.80.43:8081/profile
  - button "Logout"
- main:
  - alert: Please change your password before continuing.
  - heading "Change Password" [level=1]
  - paragraph: Your password must be changed before you continue.
  - text: Please change your password before continuing. Current Password
  - textbox "Current Password"
  - text: New Password
  - textbox "New Password"
  - text: Minimum 12 characters with uppercase, lowercase, digit, and special character. Confirm New Password
  - textbox "Confirm New Password"
  - button "Change Password"
  - button "Sign out"
- contentinfo: TalentFarm QA Automation Lab Insurance Order Entry Demo
```

# Test source

```ts
  1  | const { expect } = require('@playwright/test');
  2  | const { BasePage } = require('./BasePage');
  3  | const { S } = require('../config/selectors');
  4  | const routes = require('../config/routes');
  5  | 
  6  | class LoginPage extends BasePage {
  7  |   async goto() {
  8  |     await this.page.goto(routes.login);
  9  |     await expect(this.$(S.login.email)).toBeVisible();
  10 |   }
  11 | 
  12 |   async login(user) {
  13 |     await this.$(S.login.email).fill(user.email);
  14 |     await this.$(S.login.password).fill(user.password);
  15 |     await this.$(S.login.submit).click();
  16 |   }
  17 | 
  18 |   async loginViaUi(user) {
  19 |     await this.goto();
  20 |     await this.login(user);
  21 |   }
  22 | 
  23 |   async expectLoggedIn() {
  24 |     await expect(this.page).not.toHaveURL(/\/login\/?(\?.*)?$/);
  25 |     await expect(this.$(S.common.logout)).toBeVisible();
  26 |   }
  27 | 
  28 |   /** Still on the login page, with a message that matches the pattern, and no session. */
  29 |   async expectRejected(pattern) {
> 30 |     await expect(this.page).toHaveURL(/\/login/);
     |                             ^ Error: expect(page).toHaveURL(expected) failed
  31 |     const err = this.$(S.login.error);
  32 |     await expect(err).toBeVisible();
  33 |     if (pattern) await expect(err).toHaveText(pattern);
  34 |   }
  35 | 
  36 |   async fillOtp(code) {
  37 |     await this.$(S.login.otpInput).fill(code);
  38 |     await this.$(S.login.otpSubmit).click();
  39 |   }
  40 | 
  41 |   async logout() {
  42 |     await this.$(S.common.logout).click();
  43 |     await expect(this.page).toHaveURL(/login/);
  44 |   }
  45 | 
  46 |   async openForgotPassword() {
  47 |     await this.$(S.login.forgotLink).click();
  48 |   }
  49 | }
  50 | 
  51 | module.exports = { LoginPage };
  52 | 
```