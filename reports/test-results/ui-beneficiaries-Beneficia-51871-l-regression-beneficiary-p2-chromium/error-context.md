# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\beneficiaries.spec.js >> Beneficiary Management >> TC-BEN-V11 Irrevocable beneficiary triggers legal confirmation modal @regression @beneficiary @p2
- Location: tests\ui\beneficiaries.spec.js:135:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('irrevocable-confirmation-modal').or(getByRole('dialog')).first()
Expected: visible
Timeout: 8000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByTestId('irrevocable-confirmation-modal').or(getByRole('dialog')).first() with timeout 8000ms
  - waiting for getByTestId('irrevocable-confirmation-modal').or(getByRole('dialog')).first()

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
  - alert: Rider selection saved.
  - link "← Back to Riders":
    - /url: http://8.231.80.43:8081/applications/730/riders
  - link "Application Summary":
    - /url: http://8.231.80.43:8081/applications/730
  - text: "Application #730"
  - heading "Beneficiaries" [level=1]
  - paragraph: Add or update primary and secondary beneficiaries for the policy.
  - link "Back to Application":
    - /url: http://8.231.80.43:8081/applications/730
  - text: "Primary allocation: 0.00% | Secondary allocation: 0.00% No beneficiary has been added. Estate assignment will apply by default if no beneficiary is named."
  - strong: Existing Beneficiaries
  - table:
    - rowgroup:
      - row "Level Type Name Designation Relationship Age Allocation Email Phone Action":
        - columnheader "Level"
        - columnheader "Type"
        - columnheader "Name"
        - columnheader "Designation"
        - columnheader "Relationship"
        - columnheader "Age"
        - columnheader "Allocation"
        - columnheader "Email"
        - columnheader "Phone"
        - columnheader "Action"
    - rowgroup:
      - row "No beneficiaries added yet. Estate assignment will apply by default.":
        - cell "No beneficiaries added yet. Estate assignment will apply by default."
  - strong: Add Beneficiary
  - text: Beneficiary Level *
  - combobox:
    - option "Select"
    - option "Primary" [selected]
    - option "Secondary"
  - text: Beneficiary Type *
  - combobox:
    - option "Individual" [selected]
    - option "Trust"
    - option "Organization"
  - text: Relationship *
  - combobox:
    - option "Select"
    - option "Spouse" [selected]
    - option "Child"
    - option "Parent"
    - option "Sibling"
    - option "Trust"
    - option "Organization"
    - option "Other"
  - text: Allocation % *
  - spinbutton: "100"
  - text: Beneficiary Designation *
  - combobox:
    - option "Revocable"
    - option "Irrevocable" [selected]
  - text: Irrevocable beneficiaries cannot be changed or removed in this demo without beneficiary consent. Phone
  - textbox "(212) 555-1212"
  - text: Email
  - textbox
  - text: Country
  - textbox: US
  - strong: Individual Beneficiary Details
  - text: First Name *
  - textbox: Ben
  - text: Middle Name
  - textbox
  - text: Last Name *
  - textbox: LGEJZTFSDM
  - text: Date of Birth *
  - textbox: 1992-11-04
  - text: Gender
  - combobox:
    - option "Select"
    - option "Male"
    - option "Female" [selected]
    - option "Non-binary"
  - strong: Address Details
  - text: Address Line 1
  - textbox
  - text: City
  - textbox
  - text: State
  - textbox
  - text: Postal Code
  - textbox
  - strong: Minor Beneficiary Guardian Details
  - text: Guardian Name
  - textbox
  - text: Guardian Relationship
  - textbox
  - text: Guardian Contact
  - textbox
  - text: Guardian Address
  - textbox
  - checkbox "Legal acknowledgement completed for minor beneficiary"
  - text: Legal acknowledgement completed for minor beneficiary
  - link "Back":
    - /url: http://8.231.80.43:8081/applications/730/riders
  - button "Save Beneficiary"
  - link "Continue":
    - /url: http://8.231.80.43:8081/applications/730/documents
- contentinfo: TalentFarm QA Automation Lab Insurance Order Entry Demo
```

# Test source

```ts
  40  |     await pages.beneficiary.add(buildBeneficiary({ allocation: 60 }));
  41  |     await pages.beneficiary.add(buildBeneficiary({ allocation: 60 }));
  42  |     await pages.beneficiary.next();
  43  |     await captureEvidence(page, testInfo, 'allocation-120');
  44  |     await expectBlocked(pages.beneficiary, before, M.allocation);
  45  |   });
  46  | 
  47  |   test(...tc('BEN-V04'), async ({ pages }) => {
  48  |     await progressTo(pages, 'beneficiaries');
  49  |     const before = await pages.beneficiary.stepTitle();
  50  |     await pages.beneficiary.add(buildBeneficiary({ allocation: 100 }));
  51  |     await pages.beneficiary.add(buildBeneficiary({ designation: 'Secondary', allocation: 50 }));
  52  |     await test.step('secondary total 50% blocks Next', async () => {
  53  |       await pages.beneficiary.next();
  54  |       await expectBlocked(pages.beneficiary, before, M.allocation);
  55  |     });
  56  |     await test.step('secondary total 100% lets Next proceed', async () => {
  57  |       await pages.beneficiary.add(buildBeneficiary({ designation: 'Secondary', allocation: 50 }));
  58  |       await pages.beneficiary.next();
  59  |       await expectAdvanced(pages.beneficiary, before);
  60  |     });
  61  |   });
  62  | 
  63  |   test(...tc('BEN-V05'), async ({ pages, page }, testInfo) => {
  64  |     await progressTo(pages, 'beneficiaries');
  65  |     const before = await pages.beneficiary.stepTitle();
  66  |     const minor = buildBeneficiary({ dob: dobForAge(10), relationship: 'Child', allocation: 100 });
  67  |     await test.step('minor WITHOUT guardian is refused', async () => {
  68  |       await pages.beneficiary.add(minor);
  69  |       await pages.beneficiary.next();
  70  |       await captureEvidence(page, testInfo, 'minor-without-guardian');
  71  |       await pages.beneficiary.expectErrorText(M.guardian);
  72  |       await pages.beneficiary.expectStillOnStep(before);
  73  |     });
  74  |     await test.step('minor WITH guardian is accepted', async () => {
  75  |       await pages.beneficiary.fillForm({ ...minor, guardianName: 'Gina Guardian', guardianRelationship: 'Parent' });
  76  |       await pages.beneficiary.$(S.beneficiary.save).click();
  77  |       await pages.beneficiary.next();
  78  |       await expectAdvanced(pages.beneficiary, before);
  79  |     });
  80  |   });
  81  | 
  82  |   test(...tc('BEN-V06'), async ({ pages }) => {
  83  |     await progressTo(pages, 'beneficiaries');
  84  |     await pages.beneficiary.openForm();
  85  |     await pages.beneficiary.choose(S.beneficiary.type, 'Trust');
  86  |     for (const def of [S.beneficiary.trustName, S.beneficiary.trusteeName, S.beneficiary.trustDate]) {
  87  |       await expect(pages.beneficiary.$(def), def.id).toBeVisible();
  88  |     }
  89  |   });
  90  | 
  91  |   test(...tc('BEN-V07'), async ({ pages }) => {
  92  |     await progressTo(pages, 'beneficiaries');
  93  |     await pages.beneficiary.openForm();
  94  |     await pages.beneficiary.choose(S.beneficiary.type, 'Organization');
  95  |     for (const def of [S.beneficiary.orgName, S.beneficiary.orgRegistration, S.beneficiary.orgContact]) {
  96  |       await expect(pages.beneficiary.$(def), def.id).toBeVisible();
  97  |     }
  98  |   });
  99  | 
  100 |   test(...tc('BEN-V08'), async ({ pages, page }, testInfo) => {
  101 |     await progressTo(pages, 'beneficiaries');
  102 |     const first = buildBeneficiary({ allocation: 50 });
  103 |     await pages.beneficiary.add(first);
  104 |     await pages.beneficiary.add({ ...first }); // same Name + DOB + Relationship
  105 |     await captureEvidence(page, testInfo, 'duplicate-beneficiary');
  106 |     await pages.beneficiary.expectErrorText(M.duplicate);
  107 |     await expect(pages.beneficiary.rows).toHaveCount(1);
  108 |   });
  109 | 
  110 |   test(...tc('BEN-V09'), async ({ pages }) => {
  111 |     await progressTo(pages, 'beneficiaries');
  112 |     await pages.beneficiary.add(buildBeneficiary({ allocation: 60 }));
  113 |     await pages.beneficiary.add(buildBeneficiary({ allocation: 40 }));
  114 |     await expect(pages.beneficiary.rows).toHaveCount(2);
  115 |     await pages.beneficiary.remove(0);
  116 |     await expect(pages.beneficiary.rows).toHaveCount(1);
  117 |     const { primary } = await pages.beneficiary.totals();
  118 |     if (!Number.isNaN(primary)) expect(primary).toBe(40);
  119 |   });
  120 | 
  121 |   test(...tc('BEN-V10'), async ({ pages }) => {
  122 |     await progressTo(pages, 'beneficiaries');
  123 |     const before = await pages.beneficiary.stepTitle();
  124 |     await test.step('no beneficiaries blocks Next', async () => {
  125 |       await pages.beneficiary.next();
  126 |       await expectBlocked(pages.beneficiary, before, M.primaryRequired);
  127 |     });
  128 |     await test.step('only a secondary beneficiary blocks Next', async () => {
  129 |       await pages.beneficiary.add(buildBeneficiary({ designation: 'Secondary', allocation: 100 }));
  130 |       await pages.beneficiary.next();
  131 |       await expectBlocked(pages.beneficiary, before, M.primaryRequired);
  132 |     });
  133 |   });
  134 | 
  135 |   test(...tc('BEN-V11'), async ({ pages }) => {
  136 |     await progressTo(pages, 'beneficiaries');
  137 |     await pages.beneficiary.fillForm(buildBeneficiary({ irrevocable: true }));
  138 |     await pages.beneficiary.$(S.beneficiary.save).click();
  139 |     const modal = pages.beneficiary.$(S.beneficiary.legalModal);
> 140 |     await expect(modal).toBeVisible();
      |                         ^ Error: expect(locator).toBeVisible() failed
  141 |     await pages.beneficiary.$(S.beneficiary.legalConfirm).click();
  142 |     await expect(modal).toBeHidden();
  143 |   });
  144 | });
  145 | 
```