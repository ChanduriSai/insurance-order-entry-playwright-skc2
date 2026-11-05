const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');
const { S } = require('../config/selectors');
const { ValidationSummary } = require('../components/ValidationSummary');

const REQUIRED_TYPES = ['KYC_ID'];

/** Step 9 - Document Upload and Validation. */
class DocumentsPage extends BasePage {
  constructor(page) {
    super(page);
    this.validation = new ValidationSummary(page);
  }

  get inputs() {
    return this.$$(S.documents.uploadInputs);
  }

  /** One row per uploaded document (the empty-state row is excluded). */
  get uploaded() {
    return this.$$(S.documents.uploadedItems);
  }

  /**
   * Uploads one file. This app needs two actions: choose the file, then press "Upload Document" (a normal form POST), so
   * the helper waits for the server's answer (accepted OR rejected) before returning.
   * @param {object} file    Playwright file payload
   * @param {string} [type]  option of the Document Type dropdown (KYC_ID, ADDRESS_PROOF, INCOME_PROOF, OTHER); app default if omitted
   */
  async upload(file, type) {
    if (type) await this.$(S.documents.typeSelect).selectOption(type);
    await this.inputs.first().setInputFiles(file);
    const answered = this.page.waitForResponse((r) => r.request().method() === 'POST' && /documents/.test(r.url()));
    await this.$(S.documents.uploadButton).click();
    await answered;
    await this.page.waitForLoadState('load');
  }

  /**
   * Satisfies the mandatory document(s). The app reports "required document validation passed" after a KYC_ID upload, so
   * KYC_ID is the only mandatory type; add to REQUIRED_TYPES if the product owner confirms more.
   */
  async uploadAllRequired(file) {
    for (const type of REQUIRED_TYPES) {
      if (!(await this.uploaded.filter({ hasText: type }).count())) await this.upload(file, type);
    }
  }

  get message() {
    return this.$(S.documents.message);
  }
}

module.exports = { DocumentsPage };
