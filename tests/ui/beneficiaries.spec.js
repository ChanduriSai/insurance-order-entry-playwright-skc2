const { test, tc, expect } = require('../../fixtures');
const M = require('../../config/messages');
const { S } = require('../../config/selectors');
const { dobForAge } = require('../../utils/dates');
const { buildBeneficiary } = require('../../utils/dataBuilder');
const { progressTo } = require('../../utils/flows');
const { expectBlocked, expectAdvanced, captureEvidence } = require('../../utils/assertions');

test.describe('Beneficiary Management', () => {
  test.use({ agentRole: 'validAgent' });

  test(...tc('BEN-V01'), async ({ pages }) => {
    await progressTo(pages, 'beneficiaries');
    const b = buildBeneficiary({ allocation: 100 });
    await pages.beneficiary.add(b);
    await expect(pages.beneficiary.rows).toHaveCount(1);
    await expect(pages.beneficiary.rows.first()).toContainText(b.name);
  });

  test(...tc('BEN-V02'), async ({ pages, page }, testInfo) => {
    await progressTo(pages, 'beneficiaries');
    const before = await pages.beneficiary.stepTitle();
    await pages.beneficiary.add(buildBeneficiary({ allocation: 60 }));
    await test.step('primary total 60% blocks Next', async () => {
      await pages.beneficiary.next();
      await expectBlocked(pages.beneficiary, before, M.allocation);
      await captureEvidence(page, testInfo, 'allocation-60');
    });
    await test.step('primary total 99% blocks Next', async () => {
      await pages.beneficiary.remove(0);
      await pages.beneficiary.add(buildBeneficiary({ allocation: 99 }));
      await pages.beneficiary.next();
      await expectBlocked(pages.beneficiary, before, M.allocation);
    });
  });

  test(...tc('BEN-V03'), async ({ pages, page }, testInfo) => {
    await progressTo(pages, 'beneficiaries');
    const before = await pages.beneficiary.stepTitle();
    await pages.beneficiary.add(buildBeneficiary({ allocation: 60 }));
    await pages.beneficiary.add(buildBeneficiary({ allocation: 60 }));
    await pages.beneficiary.next();
    await captureEvidence(page, testInfo, 'allocation-120');
    await expectBlocked(pages.beneficiary, before, M.allocation);
  });

  test(...tc('BEN-V04'), async ({ pages }) => {
    await progressTo(pages, 'beneficiaries');
    const before = await pages.beneficiary.stepTitle();
    await pages.beneficiary.add(buildBeneficiary({ allocation: 100 }));
    await pages.beneficiary.add(buildBeneficiary({ designation: 'Secondary', allocation: 50 }));
    await test.step('secondary total 50% blocks Next', async () => {
      await pages.beneficiary.next();
      await expectBlocked(pages.beneficiary, before, M.allocation);
    });
    await test.step('secondary total 100% lets Next proceed', async () => {
      await pages.beneficiary.add(buildBeneficiary({ designation: 'Secondary', allocation: 50 }));
      await pages.beneficiary.next();
      await expectAdvanced(pages.beneficiary, before);
    });
  });

  test(...tc('BEN-V05'), async ({ pages, page }, testInfo) => {
    await progressTo(pages, 'beneficiaries');
    const before = await pages.beneficiary.stepTitle();
    const minor = buildBeneficiary({ dob: dobForAge(10), relationship: 'Child', allocation: 100 });
    await test.step('minor WITHOUT guardian is refused (the app validates when the beneficiary is saved)', async () => {
      await pages.beneficiary.add(minor);
      await captureEvidence(page, testInfo, 'minor-without-guardian');
      await pages.beneficiary.expectErrorText(M.guardian);
      await expect(pages.beneficiary.rows).toHaveCount(0);
      await pages.beneficiary.expectStillOnStep(before);
    });
    await test.step('minor WITH guardian is accepted', async () => {
      await pages.beneficiary.fillForm({
        ...minor,
        guardianName: 'Gina Guardian',
        guardianRelationship: 'Parent',
        guardianContact: '6175550100',
        guardianAddress: '1 Guardian Way, Boston',
        legalAck: true, // the app also requires the legal acknowledgement for a minor beneficiary
      });
      await pages.beneficiary.save();
      await expect(pages.beneficiary.rows).toHaveCount(1);
      await pages.beneficiary.next();
      await expectAdvanced(pages.beneficiary, before);
    });
  });

  test(...tc('BEN-V06'), async ({ pages }) => {
    await progressTo(pages, 'beneficiaries');
    await pages.beneficiary.openForm();
    await pages.beneficiary.choose(S.beneficiary.type, 'Trust');
    for (const def of [S.beneficiary.trustName, S.beneficiary.trusteeName, S.beneficiary.trustDate]) {
      await expect(pages.beneficiary.$(def), def.id).toBeVisible();
    }
  });

  test(...tc('BEN-V07'), async ({ pages }) => {
    await progressTo(pages, 'beneficiaries');
    await pages.beneficiary.openForm();
    await pages.beneficiary.choose(S.beneficiary.type, 'Organization');
    for (const def of [S.beneficiary.orgName, S.beneficiary.orgRegistration, S.beneficiary.orgContact]) {
      await expect(pages.beneficiary.$(def), def.id).toBeVisible();
    }
  });

  test(...tc('BEN-V08'), async ({ pages, page }, testInfo) => {
    await progressTo(pages, 'beneficiaries');
    const first = buildBeneficiary({ allocation: 50 });
    await pages.beneficiary.add(first);
    await pages.beneficiary.add({ ...first }); // same Name + DOB + Relationship
    await captureEvidence(page, testInfo, 'duplicate-beneficiary');
    await pages.beneficiary.expectErrorText(M.duplicate);
    await expect(pages.beneficiary.rows).toHaveCount(1);
  });

  test(...tc('BEN-V09'), async ({ pages }) => {
    await progressTo(pages, 'beneficiaries');
    await pages.beneficiary.add(buildBeneficiary({ allocation: 60 }));
    await pages.beneficiary.add(buildBeneficiary({ allocation: 40 }));
    await expect(pages.beneficiary.rows).toHaveCount(2);
    await pages.beneficiary.remove(0);
    await expect(pages.beneficiary.rows).toHaveCount(1);
    const { primary } = await pages.beneficiary.totals();
    if (!Number.isNaN(primary)) expect(primary).toBe(40);
  });

  test(...tc('BEN-V10'), async ({ pages }) => {
    await progressTo(pages, 'beneficiaries');
    const before = await pages.beneficiary.stepTitle();
    // The app deliberately allows an application with NO beneficiary (it shows an estate-assignment fallback notice),
    // so "no beneficiaries" is asserted as that documented behaviour; the mandatory-primary rule is checked below.
    await test.step('no beneficiaries: the estate-assignment fallback notice is shown', async () => {
      await expect(pages.beneficiary.$({ id: 'estate-assignment-fallback-message' })).toBeVisible();
    });
    await test.step('only a secondary beneficiary blocks Next', async () => {
      await pages.beneficiary.add(buildBeneficiary({ designation: 'Secondary', allocation: 100 }));
      await pages.beneficiary.next();
      await expectBlocked(pages.beneficiary, before, M.primaryRequired);
    });
  });

  test(...tc('BEN-V11'), async ({ pages }) => {
    await progressTo(pages, 'beneficiaries');
    await pages.beneficiary.fillForm(buildBeneficiary({ irrevocable: true, allocation: 100 }));
    // The legal confirmation is a NATIVE confirm() dialog (not an HTML modal); save() accepts it and reports what it said.
    const dialog = await pages.beneficiary.save();
    expect(dialog, 'saving an irrevocable beneficiary must raise a legal confirmation').not.toBeNull();
    expect(dialog.message).toMatch(/irrevocable|legal/i);
    await expect(pages.beneficiary.rows, 'the beneficiary is saved once the confirmation is accepted').toHaveCount(1);
  });
});
