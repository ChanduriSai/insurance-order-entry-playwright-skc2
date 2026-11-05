/**
 * CENTRAL SELECTOR MAP - the only file that knows how the UI is addressed.
 *
 * Each entry: { id: <data-testid>, label|role+name|text|css: <fallback> }.
 *
 * CONFIDENCE
 *   CONFIRMED   login.email / login.password / login.submit (Combined QA Lab Learner Guide login example)
 *               common.logout (confirmed on the sibling FinServe app built on the same lab stack)
 *   UNCONFIRMED everything else: ids follow the kebab-case convention seen on the lab apps, and every
 *               entry has an accessible-name fallback. Run `npm run discover` against the lab VM, then
 *               `npm run verify:selectors`, and correct any id that is reported missing.
 */
const t = (id, rest = {}) => ({ id, ...rest });

const S = {
  common: {
    next: t('step-next', { css: '[data-testid$="save-continue-button"], [data-testid="beneficiary-continue-button"], [data-testid="documents-continue-review-button"]', role: 'button', name: /^(next|continue|save (and|&) continue)/i }),
    back: t('workflow-back-button', { role: 'button', name: /^(← )?(back|previous)/i }),
    // this app has no separate Save Draft button: Save and Continue persists the DRAFT
    saveDraft: t('save-draft', { css: '[data-testid$="save-continue-button"]', role: 'button', name: /save (as )?draft|save for later|save (and|&) continue/i }),
    stepTitle: t('step-title', { css: 'main h1' }),
    toast: t('toast-message', { css: '.toast, .alert-success, [role="status"]' }),
    logout: t('nav-logout-button', { role: 'button', name: /log ?out|sign ?out/i }), // CONFIRMED (sibling app)
    formErrorSummary: t('form-error-summary', { css: '.alert-danger, [role="alert"]' }),
    anyError: { id: 'field-error', css: '.field-error, .invalid-feedback, .text-danger, .error, [role="alert"], [data-testid$="error-alert"], [data-testid$="error-summary"]' },
  },

  login: {
    email: t('login-email-input', { label: /e-?mail|user ?name/i }), // CONFIRMED
    password: t('login-password-input', { label: /^password/i }), // CONFIRMED
    submit: t('login-submit-button', { role: 'button', name: /log ?in|sign ?in/i }), // CONFIRMED
    error: t('validation-error-alert', { css: '.field-error, .alert-danger, [role="alert"]' }), // the app's error banner on /login
    otpInput: t('login-otp', { label: /otp|verification code|one.?time/i }),
    otpSubmit: t('login-otp-submit', { role: 'button', name: /verify|submit|continue/i }),
    forgotLink: t('forgot-password-link', { role: 'link', name: /forgot/i }),
  },

  password: {
    email: t('forgot-email', { label: /e-?mail|user ?name/i }),
    requestSubmit: t('forgot-submit', { role: 'button', name: /send|reset|request|submit|continue/i }),
    otp: t('reset-otp', { label: /otp|code/i }),
    otpSubmit: t('reset-otp-submit', { role: 'button', name: /verify|continue|submit/i }),
    newPassword: t('reset-new-password', { label: /^new password/i }),
    confirmPassword: t('reset-confirm-password', { label: /confirm/i }),
    resetSubmit: t('reset-submit', { role: 'button', name: /reset|change|update|save|submit/i }),
    message: t('reset-message', { css: '.alert, .field-error, [role="alert"], [role="status"]' }),
  },

  dashboard: {
    greeting: t('dashboard-page', { css: 'main h1, header [class*="user"], [class*="welcome"]' }),
    newApplication: t('dashboard-new-application-button', { role: 'link', name: /new application|start (new )?application|create application/i }),
    newApplicationBtn: t('dashboard-new-application-button', { role: 'button', name: /new application|start (new )?application|create application/i }),
    draftCount: t('dashboard-summary-draft'),
    submittedCount: t('dashboard-summary-submitted'),
    rowPrefix: 'application-row-',
    rows: t('application-rows', { css: '[data-testid="dashboard-applications-table"] tbody tr, [data-testid="applications-table"] tbody tr' }),
    statusCell: t('application-status', { css: '[data-testid^="application-status-"], .status, .badge' }),
    search: t('dashboard-search', { role: 'searchbox' , label: /search/i, placeholder: /search/i }),
    statusFilter: t('dashboard-status-filter', { label: /status/i }),
    emptyState: t('dashboard-empty-state', { text: /no applications|get started|nothing here|no records/i }),
    resumeLink: t('resume-application', { role: 'link', name: /resume|continue|open|edit/i }),
  },

  client: {
    firstName: t('client-first-name-input', { label: /first name/i }),
    lastName: t('client-last-name-input', { label: /last name|surname/i }),
    dob: t('client-dob-input', { label: /date of birth|dob|birth date/i }),
    age: t('client-age', { label: /^age/i, css: '[data-testid="client-age"], .calculated-age' }),
    gender: t('client-gender-select', { label: /gender|sex/i }),
    maritalStatus: t('client-marital-status-select', { label: /marital/i }),
    nationality: t('client-nationality-input', { label: /nationality|citizenship/i }),
    occupation: t('client-occupation-input', { label: /occupation/i }),
    employer: t('client-employer-name-input', { label: /employer|company/i }),
    employerAddress: t('client-employer-address-input', { label: /employer address/i }),
  },

  address: {
    resLine1: t('residential-address-line-1-input', { label: /residential.*(address|line 1|street)|address line 1|street/i }),
    resCity: t('residential-city-input', { label: /city/i }),
    resState: t('residential-state-province-select', { label: /state/i }),
    resZip: t('residential-postal-code-input', { label: /zip|postal/i }),
    sameAsResidential: t('address-same-as-residential-checkbox', { label: /same as (the )?residential/i, role: 'checkbox', name: /same as/i }),
    mailLine1: t('mailing-address-line-1-input', { label: /mailing.*(address|line 1|street)/i }),
    mailCity: t('mailing-city-input', { label: /mailing.*city/i }),
    mailState: t('mailing-state-province-select', { label: /mailing.*state/i }),
    mailZip: t('mailing-postal-code-input', { label: /mailing.*(zip|postal)/i }),
    email: t('contact-primary-email-input', { label: /e-?mail/i }),
    phone: t('contact-mobile-number-input', { label: /phone|mobile/i }),
    preferredContact: t('contact-preferred-mode-select', { label: /preferred (contact|communication)/i }),
  },

  kyc: {
    idType: t('kyc-id-type-select', { label: /id type|identification type/i }),
    idNumber: t('kyc-id-number-input', { label: /id number|identification number/i }),
    ssn: t('kyc-ssn', { label: /ssn|social security/i }),
    ssnDisplay: t('kyc-ssn-display', { css: '[data-testid="kyc-ssn-display"], .masked-ssn' }),
    income: t('financial-annual-income-input', { label: /annual income|income/i }),
    netWorth: t('financial-net-worth-input', { label: /net worth/i }),
    sourceOfFunds: t('financial-source-of-funds-select', { label: /source of funds/i }),
    riskProfile: t('financial-risk-profile-select', { label: /risk (profile|tolerance)/i }),
    pepSelect: t('compliance-pep-select', { label: /pep/i }),
    declaration: t('compliance-declaration-checkbox', { role: 'checkbox' }),
    pepDetails: t('compliance-pep-details-input', { label: /pep.*details|position|political/i }),
    uploadInput: t('kyc-document-upload', { css: 'input[type="file"]' }),
  },

  product: {
    cardPrefix: 'product-card-',
    cards: t('product-cards', { css: '[data-testid^="product-card-"]' }),
    selectButton: t('product-select', { role: 'button', name: /select|choose/i }),
    inactiveCards: t('product-cards-inactive', { css: '[data-testid^="product-card-"][data-status="inactive"], .product-card.inactive, .product-card[aria-disabled="true"]' }),
    detailsLink: t('product-details-link', { role: 'link', name: /details|learn more|view/i }),
    detailsPanel: t('product-details', { css: 'main' }),
    faceValue: t('product-sum-assured-input', { label: /face value|sum assured|coverage amount/i }),
    frequency: t('product-premium-frequency-select', { label: /premium frequency|payment frequency|frequency/i }),
    paymentTerm: t('product-payment-term-select', { label: /payment term|premium paying term/i }),
    policyTerm: t('product-coverage-term-select', { label: /policy term|coverage term/i }),
    premium: t('product-current-total-premium', { css: '[data-testid="product-premium"], .premium-amount' }),
    warning: t('product-warning', { css: '.alert-warning, [role="alert"], .warning' }),
  },

  rider: {
    cardPrefix: 'rider-row-',
    // one row per rider: rider-row-N contains rider-selected-N (checkbox) and rider-coverage-amount-N (input)
    cards: t('rider-cards', { css: '[data-testid^="rider-row-"]' }),
    checkbox: t('rider-toggle', { css: '[data-testid^="rider-selected-"]', role: 'checkbox' }),
    coverage: t('rider-coverage', { css: '[data-testid^="rider-coverage-amount-"]', label: /coverage|amount/i }),
    summaryPremium: t('rider-premium-summary', { css: '[data-testid="rider-premium-summary"], .rider-premium' }),
    totalPremium: t('total-premium', { css: '[data-testid="total-premium"], .total-premium' }),
    questionnaire: t('health-questionnaire', { css: '[data-testid="health-questionnaire"], form.health-questionnaire, [role="dialog"]' }),
    message: t('rider-message', { css: '.alert, .field-error, [role="alert"]' }),
  },

  beneficiary: {
    add: t('add-beneficiary', { role: 'button', name: /add beneficiary/i }),
    save: t('beneficiary-save-button', { role: 'button', name: /add beneficiary|save beneficiary|^save/i }), // must match neither "Add beneficiary" nor the step-level "Save draft"
    rows: t('beneficiary-rows', { css: '[data-testid="beneficiary-table"] tbody tr:not(:has([data-testid="beneficiary-empty-state"]))' }),
    type: t('beneficiary-type-select', { label: /beneficiary type|^type/i }),
    designation: t('beneficiary-level-select', { label: /primary|secondary|designation/i }),
    name: t('beneficiary-first-name-input', { label: /^first name/i }),
    lastName: t('beneficiary-last-name-input', { label: /^last name/i }),
    gender: t('beneficiary-gender-select', { label: /^gender/i }),
    dob: t('beneficiary-dob-input', { label: /date of birth|dob/i }),
    relationship: t('beneficiary-relationship-select', { label: /relationship/i }),
    allocation: t('beneficiary-allocation-input', { label: /allocation|share|percent/i }),
    guardianName: t('beneficiary-guardian-name-input', { label: /guardian.*name/i }),
    guardianRelationship: t('beneficiary-guardian-relationship-input', { label: /guardian.*relationship/i }),
    guardianContact: t('beneficiary-guardian-contact-input', { label: /guardian.*contact/i }),
    guardianAddress: t('beneficiary-guardian-address-input', { label: /guardian.*address/i }),
    legalAck: t('beneficiary-legal-acknowledgement-checkbox', { role: 'checkbox', name: /legal acknowledg/i }),
    trustName: t('beneficiary-trust-name-input', { label: /trust name/i }),
    trusteeName: t('beneficiary-trustee-name-input', { label: /trustee/i }),
    trustDate: t('beneficiary-trust-date-input', { label: /trust date/i }),
    orgName: t('beneficiary-organization-name-input', { label: /organi[sz]ation name/i }),
    orgRegistration: t('beneficiary-organization-registration-input', { label: /registration/i }),
    orgContact: t('beneficiary-organization-contact-input', { label: /contact/i }),
    irrevocable: t('beneficiary-designation-select', { label: /irrevocable/i }),
    legalModal: t('irrevocable-confirmation-modal', { role: 'dialog' }),
    legalConfirm: t('irrevocable-confirm', { role: 'button', name: /confirm|agree|accept|yes/i }),
    primaryTotal: t('beneficiary-allocation-summary'),
    secondaryTotal: t('beneficiary-allocation-summary'),
    remove: t('remove-beneficiary', { role: 'button', name: /remove|delete/i }),
    message: t('beneficiary-message', { css: '.alert, .field-error, [role="alert"]' }),
  },

  documents: {
    uploadInputs: t('document-upload-kyc', { css: 'input[type="file"]' }),
    typeSelect: t('document-type-select', { label: /document type/i }),
    uploadButton: t('document-upload-button', { role: 'button', name: /upload document/i }),
    // one <tr> per uploaded document; the empty-state row (documents-empty-state) is excluded
    uploadedItems: t('documents-rows', { css: '[data-testid="documents-table"] tbody tr:not(:has([data-testid="documents-empty-state"]))' }),
    message: t('document-message', { css: '.alert, .field-error, [role="alert"]' }),
  },

  review: {
    summary: t('review-summary', { css: 'main' }),
    premium: t('review-total-premium', { css: '[data-testid="review-premium"], .review-premium' }),
    calculatedAge: t('review-client-calculated-age'), // the app shows the calculated age on the review snapshot only
    clientName: t('review-client-name'),
    productName: t('review-product-name'),
    riders: t('review-riders'),
    beneficiaries: t('review-beneficiaries'),
    validationSummary: t('review-validation-errors', { css: '[data-testid="validation-summary"], .validation-summary' }),
    validationItems: t('validation-summary-item', { css: '[data-testid^="validation-item"], .validation-summary li, .validation-summary a' }),
    submit: t('review-submit-application-button', { role: 'button', name: /^submit/i }),
    reference: t('confirmation-reference-number', { css: '[data-testid="confirmation-reference-number"], .reference-number' }),
    status: t('application-status-badge', { css: '[data-testid="application-status-badge"], .status-badge, .badge' }),
    confirmation: t('submission-confirmation-page', { css: '[data-testid="submission-confirmation-page"], .alert-success, [role="status"]' }),
  },
};

/** Fields masked in every screenshot we attach (utils/evidence.js). Synthetic data is used anyway; this is defence in depth. */
const SENSITIVE_FIELDS = [
  S.kyc.ssn, S.kyc.ssnDisplay, S.kyc.idNumber, S.kyc.income, S.kyc.netWorth, S.kyc.pepDetails,
  S.client.dob, S.beneficiary.dob, S.login.password, S.password.newPassword, S.password.confirmPassword,
];

module.exports = { S, SENSITIVE_FIELDS };
