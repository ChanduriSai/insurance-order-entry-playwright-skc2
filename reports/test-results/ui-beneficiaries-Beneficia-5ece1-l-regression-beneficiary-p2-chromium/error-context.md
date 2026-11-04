# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\beneficiaries.spec.js >> Beneficiary Management >> TC-BEN-V09 Removing a beneficiary updates running allocation total @regression @beneficiary @p2
- Location: tests\ui\beneficiaries.spec.js:110:3

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('beneficiary-rows').or(locator('[data-testid="beneficiary-table"] tbody tr:not(:has([data-testid="beneficiary-empty-state"]))'))
Expected: 1
Received: 2
Timeout:  8000ms

Call log:
  - Expect "toHaveCount" getByTestId('beneficiary-rows').or(locator('[data-testid="beneficiary-table"] tbody tr:not(:has([data-testid="beneficiary-empty-state"]))')) with timeout 8000ms
  - waiting for getByTestId('beneficiary-rows').or(locator('[data-testid="beneficiary-table"] tbody tr:not(:has([data-testid="beneficiary-empty-state"]))'))
    19 × locator resolved to 2 elements
       - unexpected value "2"

```

# Page snapshot

```yaml
- generic [ref=f9e1]:
  - navigation [ref=f9e2]:
    - generic [ref=f9e3]:
      - link "Insurance Order Entry Demo Platform QA Automation Training App" [ref=f9e4] [cursor=pointer]:
        - /url: http://8.231.80.43:8081/dashboard
        - generic [aria-hidden] [ref=f9e5]: IO
        - generic [ref=f9e6]:
          - generic [ref=f9e7]: Insurance Order Entry Demo Platform
          - generic [ref=f9e8]: QA Automation Training App
      - generic [ref=f9e9]:
        - list [ref=f9e10]:
          - listitem [ref=f9e11]:
            - link "Dashboard" [ref=f9e12] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/dashboard
          - listitem [ref=f9e13]:
            - link "Applications" [ref=f9e14] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/applications
          - listitem [ref=f9e15]:
            - link "Products" [ref=f9e16] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/products
          - listitem [ref=f9e17]:
            - link "Support" [ref=f9e18] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/support
        - generic [ref=f9e19]:
          - link "Valid Agent" [ref=f9e20] [cursor=pointer]:
            - /url: http://8.231.80.43:8081/profile
          - button "Logout" [ref=f9e22] [cursor=pointer]
  - main [ref=f9e23]:
    - alert [ref=f9e24]: Beneficiary saved.
    - generic [ref=f9e26]:
      - link "← Back to Riders" [ref=f9e27] [cursor=pointer]:
        - /url: http://8.231.80.43:8081/applications/728/riders
      - link "Application Summary" [ref=f9e28] [cursor=pointer]:
        - /url: http://8.231.80.43:8081/applications/728
    - generic [ref=f9e29]:
      - generic [ref=f9e30]:
        - generic [ref=f9e31]:
          - generic [ref=f9e32]: "Application #728"
          - heading "Beneficiaries" [level=1] [ref=f9e33]
          - paragraph [ref=f9e34]: Add or update primary and secondary beneficiaries for the policy.
        - link "Back to Application" [ref=f9e35] [cursor=pointer]:
          - /url: http://8.231.80.43:8081/applications/728
      - generic [ref=f9e36]: "Primary allocation: 100.00% | Secondary allocation: 0.00%"
      - generic [ref=f9e37]:
        - strong [ref=f9e39]: Existing Beneficiaries
        - table [ref=f9e42]:
          - rowgroup [ref=f9e43]:
            - row [ref=f9e44]:
              - columnheader "Level" [ref=f9e45]
              - columnheader "Type" [ref=f9e46]
              - columnheader "Name" [ref=f9e47]
              - columnheader "Designation" [ref=f9e48]
              - columnheader "Relationship" [ref=f9e49]
              - columnheader "Age" [ref=f9e50]
              - columnheader "Allocation" [ref=f9e51]
              - columnheader "Email" [ref=f9e52]
              - columnheader "Phone" [ref=f9e53]
              - columnheader "Action" [ref=f9e54]
          - rowgroup [ref=f9e55]:
            - row [ref=f9e56]:
              - cell "PRIMARY" [ref=f9e57]
              - cell "INDIVIDUAL" [ref=f9e58]
              - cell "Ben VVWBMEFTCH" [ref=f9e59]
              - cell "Revocable" [ref=f9e60]
              - cell "SPOUSE" [ref=f9e62]
              - cell "34" [ref=f9e63]
              - cell "60.00%" [ref=f9e64]
              - cell "-" [ref=f9e65]
              - cell "-" [ref=f9e66]
              - cell [ref=f9e67]:
                - link "Edit" [ref=f9e68] [cursor=pointer]:
                  - /url: http://8.231.80.43:8081/applications/728/beneficiaries?edit=338
                - button "Remove" [active] [ref=f9e70] [cursor=pointer]
            - row [ref=f9e71]:
              - cell "PRIMARY" [ref=f9e72]
              - cell "INDIVIDUAL" [ref=f9e73]
              - cell "Ben KKEJINGUCE" [ref=f9e74]
              - cell "Revocable" [ref=f9e75]
              - cell "SPOUSE" [ref=f9e77]
              - cell "34" [ref=f9e78]
              - cell "40.00%" [ref=f9e79]
              - cell "-" [ref=f9e80]
              - cell "-" [ref=f9e81]
              - cell [ref=f9e82]:
                - link "Edit" [ref=f9e83] [cursor=pointer]:
                  - /url: http://8.231.80.43:8081/applications/728/beneficiaries?edit=339
                - button "Remove" [ref=f9e85] [cursor=pointer]
      - generic [ref=f9e86]:
        - generic [ref=f9e87]:
          - strong [ref=f9e89]: Add Beneficiary
          - generic [ref=f9e91]:
            - generic [ref=f9e92]:
              - generic [ref=f9e93]: Beneficiary Level *
              - combobox [ref=f9e94]:
                - option "Select" [selected]
                - option "Primary"
                - option "Secondary"
            - generic [ref=f9e95]:
              - generic [ref=f9e96]: Beneficiary Type *
              - combobox [ref=f9e97]:
                - option "Individual" [selected]
                - option "Trust"
                - option "Organization"
            - generic [ref=f9e98]:
              - generic [ref=f9e99]: Relationship *
              - combobox [ref=f9e100]:
                - option "Select" [selected]
                - option "Spouse"
                - option "Child"
                - option "Parent"
                - option "Sibling"
                - option "Trust"
                - option "Organization"
                - option "Other"
            - generic [ref=f9e101]:
              - generic [ref=f9e102]: Allocation % *
              - spinbutton [ref=f9e103]: "100"
            - generic [ref=f9e104]:
              - generic [ref=f9e105]: Beneficiary Designation *
              - combobox [ref=f9e106]:
                - option "Revocable" [selected]
                - option "Irrevocable"
              - generic [ref=f9e107]: Irrevocable beneficiaries cannot be changed or removed in this demo without beneficiary consent.
            - generic [ref=f9e108]:
              - generic [ref=f9e109]: Phone
              - textbox "(212) 555-1212" [ref=f9e110]
            - generic [ref=f9e111]:
              - generic [ref=f9e112]: Email
              - textbox [ref=f9e113]
            - generic [ref=f9e114]:
              - generic [ref=f9e115]: Country
              - textbox [ref=f9e116]: US
        - generic [ref=f9e117]:
          - strong [ref=f9e119]: Individual Beneficiary Details
          - generic [ref=f9e121]:
            - generic [ref=f9e122]:
              - generic [ref=f9e123]: First Name *
              - textbox [ref=f9e124]
            - generic [ref=f9e125]:
              - generic [ref=f9e126]: Middle Name
              - textbox [ref=f9e127]
            - generic [ref=f9e128]:
              - generic [ref=f9e129]: Last Name *
              - textbox [ref=f9e130]
            - generic [ref=f9e131]:
              - generic [ref=f9e132]: Date of Birth *
              - textbox [ref=f9e133]
            - generic [ref=f9e134]:
              - generic [ref=f9e135]: Gender
              - combobox [ref=f9e136]:
                - option "Select" [selected]
                - option "Male"
                - option "Female"
                - option "Non-binary"
        - generic [ref=f9e137]:
          - strong [ref=f9e139]: Address Details
          - generic [ref=f9e141]:
            - generic [ref=f9e142]:
              - generic [ref=f9e143]: Address Line 1
              - textbox [ref=f9e144]
            - generic [ref=f9e145]:
              - generic [ref=f9e146]: City
              - textbox [ref=f9e147]
            - generic [ref=f9e148]:
              - generic [ref=f9e149]: State
              - textbox [ref=f9e150]
            - generic [ref=f9e151]:
              - generic [ref=f9e152]: Postal Code
              - textbox [ref=f9e153]
        - generic [ref=f9e154]:
          - strong [ref=f9e156]: Minor Beneficiary Guardian Details
          - generic [ref=f9e158]:
            - generic [ref=f9e159]:
              - generic [ref=f9e160]: Guardian Name
              - textbox [ref=f9e161]
            - generic [ref=f9e162]:
              - generic [ref=f9e163]: Guardian Relationship
              - textbox [ref=f9e164]
            - generic [ref=f9e165]:
              - generic [ref=f9e166]: Guardian Contact
              - textbox [ref=f9e167]
            - generic [ref=f9e168]:
              - generic [ref=f9e169]: Guardian Address
              - textbox [ref=f9e170]
            - generic [ref=f9e172]:
              - checkbox "Legal acknowledgement completed for minor beneficiary" [ref=f9e173]
              - generic [ref=f9e174]: Legal acknowledgement completed for minor beneficiary
        - generic [ref=f9e175]:
          - link "Back" [ref=f9e176] [cursor=pointer]:
            - /url: http://8.231.80.43:8081/applications/728/riders
          - generic [ref=f9e177]:
            - button "Save Beneficiary" [ref=f9e178] [cursor=pointer]
            - link "Continue" [ref=f9e179] [cursor=pointer]:
              - /url: http://8.231.80.43:8081/applications/728/documents
  - contentinfo [ref=f9e180]:
    - generic [ref=f9e181]:
      - generic [ref=f9e182]: TalentFarm QA Automation Lab
      - generic [ref=f9e183]: Insurance Order Entry Demo
```

# Test source

```ts
  16  |     await expect(pages.beneficiary.rows).toHaveCount(1);
  17  |     await expect(pages.beneficiary.rows.first()).toContainText(b.name);
  18  |   });
  19  | 
  20  |   test(...tc('BEN-V02'), async ({ pages, page }, testInfo) => {
  21  |     await progressTo(pages, 'beneficiaries');
  22  |     const before = await pages.beneficiary.stepTitle();
  23  |     await pages.beneficiary.add(buildBeneficiary({ allocation: 60 }));
  24  |     await test.step('primary total 60% blocks Next', async () => {
  25  |       await pages.beneficiary.next();
  26  |       await expectBlocked(pages.beneficiary, before, M.allocation);
  27  |       await captureEvidence(page, testInfo, 'allocation-60');
  28  |     });
  29  |     await test.step('primary total 99% blocks Next', async () => {
  30  |       await pages.beneficiary.remove(0);
  31  |       await pages.beneficiary.add(buildBeneficiary({ allocation: 99 }));
  32  |       await pages.beneficiary.next();
  33  |       await expectBlocked(pages.beneficiary, before, M.allocation);
  34  |     });
  35  |   });
  36  | 
  37  |   test(...tc('BEN-V03'), async ({ pages, page }, testInfo) => {
  38  |     await progressTo(pages, 'beneficiaries');
  39  |     const before = await pages.beneficiary.stepTitle();
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
> 116 |     await expect(pages.beneficiary.rows).toHaveCount(1);
      |                                          ^ Error: expect(locator).toHaveCount(expected) failed
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
  140 |     await expect(modal).toBeVisible();
  141 |     await pages.beneficiary.$(S.beneficiary.legalConfirm).click();
  142 |     await expect(modal).toBeHidden();
  143 |   });
  144 | });
  145 | 
```