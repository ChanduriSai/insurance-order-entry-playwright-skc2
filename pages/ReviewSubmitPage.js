const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');
const { S } = require('../config/selectors');
const { ValidationSummary } = require('../components/ValidationSummary');
const { parseMoney } = require('../utils/parse');

/** Step 10 - Review, validation summary, submission and status. */
class ReviewSubmitPage extends BasePage {
  constructor(page) {
    super(page);
    this.validation = new ValidationSummary(page);
  }

  get submitButton() {
    return this.$(S.review.submit);
  }

  async premium() {
    const el = this.$(S.review.premium);
    if (!(await el.count())) return NaN;
    return parseMoney(await el.textContent());
  }

  /** Premium lines of the review snapshot: { base, rider, total } (NaN for a line that is not shown). */
  async premiumBreakdown() {
    const text = await this.reviewText();
    const line = (re) => {
      const m = text.match(re);
      return m ? parseMoney(m[1]) : NaN;
    };
    return {
      base: line(/Base Policy Premium\s*\$?\s*([\d,.]+)/i),
      rider: line(/Rider Premium\s*\$?\s*([\d,.]+)/i),
      total: line(/Total Modal Premium\s*\$?\s*([\d,.]+)/i),
    };
  }

  /** Calculated age of the client as shown in the review snapshot (NaN when not shown). */
  async calculatedAge() {
    const el = this.$(S.review.calculatedAge);
    if (!(await el.count())) return NaN;
    const m = ((await el.textContent()) || '').match(/\d+/);
    return m ? Number(m[0]) : NaN;
  }

  /** Full text of the review area, for "review shows what was entered" checks. */
  async reviewText() {
    return (await this.$(S.review.summary).innerText()) || '';
  }

  async submit() {
    await this.submitButton.click();
  }

  async referenceNumber() {
    const el = this.$(S.review.reference);
    await expect(el).toBeVisible();
    return ((await el.textContent()) || '').trim();
  }

  async statusText() {
    return ((await this.$(S.review.status).textContent()) || '').trim();
  }

  /** True when no editable input remains on the page (submitted applications are read-only). */
  async isReadOnly() {
    const editable = this.page.locator(
      'main input:not([type="hidden"]):not([disabled]):not([readonly]), main select:not([disabled]), main textarea:not([disabled]):not([readonly])',
    );
    return (await editable.count()) === 0;
  }
}

module.exports = { ReviewSubmitPage };
