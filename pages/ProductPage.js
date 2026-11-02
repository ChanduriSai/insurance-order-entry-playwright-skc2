const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');
const { S } = require('../config/selectors');
const { parseMoney } = require('../utils/parse');

/** Steps 6 - Product Selection and policy configuration. */
class ProductPage extends BasePage {
  /** Products are offered as <option>s of the product dropdown on this step (the /products catalogue page has the cards). */
  get cards() {
    return this.page.getByTestId('product-select').locator('option:not([value=""])');
  }

  get inactiveCards() {
    return this.$$(S.product.inactiveCards);
  }

  cardFor(pattern) {
    return this.cards.filter({ hasText: pattern }).first();
  }

  async names() {
    const n = await this.cards.count();
    const out = [];
    for (let i = 0; i < n; i += 1) out.push(((await this.cards.nth(i).innerText()) || '').trim());
    return out;
  }

  /** Selects the first product whose card text matches the pattern (or the first card if no pattern). */
  async select(pattern) {
    const dropdown = this.page.getByTestId('product-select');
    await expect(dropdown, 'the product dropdown').toBeVisible();
    const options = await this.cards.evaluateAll((os) => os.map((o) => ({ v: o.value, t: (o.textContent || '').trim() })));
    const pat = pattern ? new RegExp(pattern.source || pattern, 'i') : null;
    const hit = options.find((o) => !pat || pat.test(o.t)) || options[0];
    if (!hit) throw new Error('No product available to select');
    await dropdown.selectOption(hit.v);
  }

  async configure({ faceValue, frequency, paymentTerm, policyTerm } = {}) {
    if (faceValue !== undefined) await this.setFaceValue(faceValue);
    if (frequency) await this.setFrequency(frequency);
    if (paymentTerm === undefined) await this.choose(S.product.paymentTerm, '20');
    if (paymentTerm) await this.choose(S.product.paymentTerm, paymentTerm);
    if (policyTerm) await this.choose(S.product.policyTerm, policyTerm);
  }

  async setFaceValue(value) {
    await this.fillField(S.product.faceValue, value);
    await this.$(S.product.faceValue).press('Tab');
  }

  async setFrequency(value) {
    await this.choose(S.product.frequency, value);
  }

  /** Displayed premium as a number (NaN until shown). */
  async premium() {
    const el = this.$(S.product.premium);
    if (!(await el.count())) return NaN;
    return parseMoney(await el.textContent());
  }

  /** Waits for a premium to be displayed, then returns it. */
  async waitForPremium() {
    await expect.poll(() => this.premium(), { message: 'premium to be displayed' }).not.toBeNaN();
    return this.premium();
  }

  async optionTexts(def) {
    return this.$(def).locator('option').evaluateAll((os) => os.map((o) => (o.textContent || '').trim()).filter(Boolean));
  }
}

module.exports = { ProductPage };
