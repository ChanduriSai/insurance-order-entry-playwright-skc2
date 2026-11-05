const { BasePage } = require('./BasePage');
const { S } = require('../config/selectors');
const { parseMoney } = require('../utils/parse');

/** Step 8 - Beneficiary Management. */
class BeneficiaryPage extends BasePage {
  get rows() {
    return this.$$(S.beneficiary.rows);
  }

  /** The beneficiary form is always on the page in this build (no Add button). */
  async openForm() {
    await this.page.getByTestId('beneficiary-form').waitFor();
  }

  /** Fills the add-beneficiary form without saving (so validation can be observed). */
  async fillForm(b) {
    await this.openForm();
    if (b.type) await this.choose(S.beneficiary.type, b.type);
    if (b.designation) await this.choose(S.beneficiary.designation, b.designation);
    const [first, ...rest] = String(b.name || '').split(' ');
    await this.fillField(S.beneficiary.name, b.type && /trust|organi/i.test(b.type) ? undefined : first);
    await this.fillField(S.beneficiary.lastName, b.type && /trust|organi/i.test(b.type) ? undefined : rest.join(' ') || 'Beneficiary');
    if (!b.type || !/trust|organi/i.test(b.type)) await this.choose(S.beneficiary.gender, b.gender || 'Female');
    if (b.dob) await this.setDate(S.beneficiary.dob, b.dob);
    await this.choose(S.beneficiary.relationship, b.relationship);
    await this.fillField(S.beneficiary.allocation, b.allocation);
    if (b.guardianName) await this.fillField(S.beneficiary.guardianName, b.guardianName);
    if (b.guardianRelationship) await this.choose(S.beneficiary.guardianRelationship, b.guardianRelationship);
    if (b.guardianContact) await this.fillField(S.beneficiary.guardianContact, b.guardianContact);
    if (b.guardianAddress) await this.fillField(S.beneficiary.guardianAddress, b.guardianAddress);
    if (b.legalAck) await this.setChecked(S.beneficiary.legalAck, true);
    if (b.trustName) await this.fillField(S.beneficiary.trustName, b.trustName);
    if (b.trusteeName) await this.fillField(S.beneficiary.trusteeName, b.trusteeName);
    if (b.orgName) await this.fillField(S.beneficiary.orgName, b.orgName);
    if (b.irrevocable) await this.choose(S.beneficiary.irrevocable, 'Irrevocable');
  }

  /**
   * Runs an action that may raise a native confirm()/alert() (this app asks for a legal confirmation when a beneficiary is
   * saved as irrevocable, and may confirm a removal). Playwright DISMISSES dialogs by default, which silently cancels the
   * save, so the dialog is accepted here. Returns the last dialog seen ({ type, message }) or null.
   */
  async acceptingDialogs(action) {
    let seen = null;
    const handler = async (d) => {
      seen = { type: d.type(), message: d.message() };
      await d.accept();
    };
    this.page.on('dialog', handler);
    try {
      await action();
      await this.page.waitForLoadState('load');
    } finally {
      this.page.off('dialog', handler);
    }
    return seen;
  }

  /** Presses Save Beneficiary; returns the confirm dialog it raised (accepted), or null. */
  async save() {
    return this.acceptingDialogs(() => this.$(S.beneficiary.save).click());
  }

  async add(b) {
    await this.fillForm(b);
    return this.save();
  }

  async remove(index = 0) {
    const row = this.rows.nth(index);
    await this.acceptingDialogs(() => row.locator('button, a').filter({ hasText: /remove|delete/i }).first().click());
  }

  /** Running totals from "Primary allocation: 60.00% | Secondary allocation: 0.00%" (NaN when the page does not show them). */
  async totals() {
    const el = this.$(S.beneficiary.primaryTotal);
    if (!(await el.count())) return { primary: NaN, secondary: NaN };
    const text = (await el.textContent()) || '';
    const primary = text.match(/primary[^\d-]*(-?[\d,.]+)\s*%/i);
    const secondary = text.match(/secondary[^\d-]*(-?[\d,.]+)\s*%/i);
    return { primary: primary ? parseMoney(primary[1]) : NaN, secondary: secondary ? parseMoney(secondary[1]) : NaN };
  }

  get message() {
    return this.$(S.beneficiary.message);
  }
}

module.exports = { BeneficiaryPage };
