# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\auth.spec.js >> Authentication & Session >> lockout (destructive) >> TC-AUTH-V07 Account locks after five failed attempts @regression @authentication @p2 @seeded @api
- Location: tests\ui\auth.spec.js:71:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('login-error').or(locator('.field-error, .alert-danger, [role="alert"]')).first()
Expected: visible
Timeout: 8000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByTestId('login-error').or(locator('.field-error, .alert-danger, [role="alert"]')).first() with timeout 8000ms
  - waiting for getByTestId('login-error').or(locator('.field-error, .alert-danger, [role="alert"]')).first()

```

```yaml
- main:
  - heading "Insurance Order Entry Demo Platform" [level=1]
  - paragraph: QA Automation Training App
  - text: Email
  - textbox "Email": AUTH-V07
  - text: Password
  - textbox "Password": WrongPassword@1
  - button "Login"
  - link "Forgot password?":
    - /url: http://8.231.80.43:8081/forgot-password
  - link "New agent? Register here":
    - /url: http://8.231.80.43:8081/register
  - text: "Demo user: agent.valid@insurance.test / Password@123"
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
  30 |     await expect(this.page).toHaveURL(/\/login/);
  31 |     const err = this.$(S.login.error);
> 32 |     await expect(err).toBeVisible();
     |                       ^ Error: expect(locator).toBeVisible() failed
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