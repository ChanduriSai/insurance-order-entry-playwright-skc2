# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: unit\framework.spec.js >> Framework self-checks >> TC-FW-02 Environment: configuration is externalised and the health check classifies failures @regression @framework @p2
- Location: tests\unit\framework.spec.js:49:3

# Error details

```
Error: hard-coded environment values outside config/env.js

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "api\\ApiClient.js: hard-coded password",
+ ]
```

# Test source

```ts
  1   | /**
  2   |  * Offline framework self-checks (TC-FW-01..04). They need neither the application nor a browser, so they run anywhere
  3   |  * and double as a quick "is my setup sane" check:  npm run test:unit
  4   |  */
  5   | const fs = require('fs');
  6   | const path = require('path');
  7   | const { unitTest: test, unitTc: tc, expect } = require('../../fixtures');
  8   | const { dobForAge, calcAge, futureDate, formatDate } = require('../../utils/dates');
  9   | const { buildClient, buildBeneficiary, buildAddress, buildKyc } = require('../../utils/dataBuilder');
  10  | const { cases, byId } = require('../../test-design/testCases');
  11  | const { risks, reportedIssues } = require('../../test-design/risks');
  12  | const { classify } = require('../../scripts/healthcheck');
  13  | const { files, PNG_1X1 } = require('../../utils/files');
  14  | const { parseMoney } = require('../../utils/parse');
  15  | 
  16  | const ROOT = path.join(__dirname, '..', '..');
  17  | 
  18  | function walk(dir, out = []) {
  19  |   for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
  20  |     if (['node_modules', 'reports', '.auth', 'test-results', '.git', 'discovery'].includes(entry.name)) continue;
  21  |     const p = path.join(dir, entry.name);
  22  |     if (entry.isDirectory()) walk(p, out);
  23  |     else out.push(p);
  24  |   }
  25  |   return out;
  26  | }
  27  | 
  28  | test.describe('Framework self-checks', () => {
  29  |   test(...tc('FW-01'), async () => {
  30  |     const cfg = require('../../playwright.config.js');
  31  |     expect(cfg.use.screenshot, 'built-in screenshots cannot be masked, so they are replaced by the masked diagnostics screenshot').toBe('off');
  32  |     expect(cfg.use.video).toBe('retain-on-failure');
  33  |     expect(['on-first-retry', 'retain-on-failure', 'on']).toContain(cfg.use.trace);
  34  |     const reporters = cfg.reporter.map((r) => (Array.isArray(r) ? r[0] : r));
  35  |     expect(reporters).toEqual(expect.arrayContaining(['html', 'json', 'junit', 'list']));
  36  |     const fixtureSource = fs.readFileSync(path.join(ROOT, 'fixtures', 'index.js'), 'utf8');
  37  |     expect(fixtureSource, 'diagnostics fixture must be automatic').toMatch(/diagnostics:[\s\S]*auto: true/);
  38  |     expect(fixtureSource).toContain('diagnostics.json');
  39  |     expect(fixtureSource, 'failure screenshots must be masked').toContain('maskedScreenshot');
  40  |     if (!process.env.WORKERS) expect(cfg.workers, 'shared lab: one worker by default').toBe(1);
  41  |     const { redact } = require('../../utils/evidence');
  42  |     expect(redact({ ssn: '900-12-3456', nested: { idNumber: 'P1', token: 't', ok: 1 } })).toEqual({ ssn: '[REDACTED]', nested: { idNumber: '[REDACTED]', token: '[REDACTED]', ok: 1 } });
  43  |     const sens = cases.filter((c) => c.sensitive).map((c) => c.id);
  44  |     const clientSrc = fs.readFileSync(path.join(ROOT, 'tests', 'ui', 'client-kyc-sensitive.spec.js'), 'utf8');
  45  |     expect(clientSrc).toMatch(/trace: 'off', video: 'off'/);
  46  |     for (const id of sens) expect(clientSrc, `${id} must live in the no-trace/no-video sensitive spec file`).toContain(`tc('${id}')`);
  47  |   });
  48  | 
  49  |   test(...tc('FW-02'), async () => {
  50  |     // 1) no hard-coded IPs / URLs / passwords outside the configuration layer
  51  |     const scanDirs = ['tests', 'pages', 'components', 'fixtures', 'utils', 'api'].map((d) => path.join(ROOT, d));
  52  |     const offenders = [];
  53  |     for (const dir of scanDirs) {
  54  |       for (const file of walk(dir).filter((f) => f.endsWith('.js') && !f.includes(`${path.sep}unit${path.sep}`))) {
  55  |         const src = fs.readFileSync(file, 'utf8');
  56  |         const rel = path.relative(ROOT, file);
  57  |         if (/https?:\/\/(?!localhost)[^\s'"`]+/.test(src.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, ''))) offenders.push(`${rel}: hard-coded URL`);
  58  |         if (/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/.test(src)) offenders.push(`${rel}: hard-coded IP address`);
  59  |         if (/Password@\d+|password\s*[:=]\s*['"][^'"]{4,}['"]/i.test(src.replace(/\/\/.*$/gm, ''))) offenders.push(`${rel}: hard-coded password`);
  60  |       }
  61  |     }
> 62  |     expect(offenders, 'hard-coded environment values outside config/env.js').toEqual([]);
      |                                                                              ^ Error: hard-coded environment values outside config/env.js
  63  |     // 2) the base URL is read from INSURANCE_BASE_URL (the default may point at the lab VM, but only inside config/env.js)
  64  |     expect(fs.readFileSync(path.join(ROOT, 'config', 'env.js'), 'utf8')).toContain('INSURANCE_BASE_URL');
  65  |     // 3) the health check classifies environment vs application problems
  66  |     expect(classify({ error: new Error('connect ECONNREFUSED 10.0.0.1:8081') }).kind).toBe('ENVIRONMENT');
  67  |     expect(classify({ status: 503 }).kind).toBe('ENVIRONMENT');
  68  |     expect(classify({ status: 404 }).kind).toBe('ENVIRONMENT');
  69  |     expect(classify({ status: 200, redirectedTo: 'https://login.microsoftonline.com/x' }).kind).toBe('ENVIRONMENT');
  70  |     expect(classify({ status: 200 }).kind).toBe('OK');
  71  |   });
  72  | 
  73  |   test(...tc('FW-03'), async () => {
  74  |     // unique data per call (parallel tests must never collide)
  75  |     const names = new Set();
  76  |     for (let i = 0; i < 500; i += 1) {
  77  |       const c = buildClient();
  78  |       names.add(`${c.firstName}|${c.lastName}`);
  79  |       names.add(buildBeneficiary().name);
  80  |       expect(c.firstName, 'names must be letters only (name validation rejects digits)').toMatch(/^[A-Za-z]+$/);
  81  |     }
  82  |     expect(names.size).toBe(1000);
  83  |     expect(new Set(Array.from({ length: 200 }, () => buildAddress().email)).size).toBe(200);
  84  |     expect(new Set(Array.from({ length: 200 }, () => buildKyc().idNumber)).size).toBe(200);
  85  | 
  86  |     // boundary dates produce exactly the intended ages, including leap-day and year-end "today"
  87  |     const todays = ['2026-10-14', '2024-02-29', '2025-12-31', '2026-01-01', '2028-02-29', '2025-03-01'].map((d) => new Date(`${d}T00:00:00Z`));
  88  |     for (const today of todays) {
  89  |       for (const age of [17, 18, 35, 65, 66]) {
  90  |         expect(calcAge(dobForAge(age, { today }), today), `dobForAge(${age}) on ${today.toISOString().slice(0, 10)}`).toBe(age);
  91  |       }
  92  |       expect(calcAge(dobForAge(18, { dayOffset: 1, today }), today), 'turns 18 tomorrow => 17').toBe(17);
  93  |       expect(calcAge(dobForAge(65, { dayOffset: -1, today }), today), 'turned 65 yesterday => 65').toBe(65);
  94  |       expect(calcAge(dobForAge(66, { dayOffset: 1, today }), today), 'turns 66 tomorrow => 65').toBe(65);
  95  |     }
  96  |     expect(futureDate(1).getTime()).toBeGreaterThan(Date.now());
  97  |     expect(formatDate(new Date(Date.UTC(2026, 0, 5)), 'iso')).toBe('2026-01-05');
  98  |     expect(formatDate(new Date(Date.UTC(2026, 0, 5)), 'us')).toBe('01/05/2026');
  99  |     expect(formatDate(new Date(Date.UTC(2026, 0, 5)), 'eu')).toBe('05/01/2026');
  100 | 
  101 |     // upload fixtures and money parsing
  102 |     expect(PNG_1X1.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
  103 |     expect(files.validPdf().buffer.toString().startsWith('%PDF-')).toBe(true);
  104 |     expect(files.oversizePdf(2).buffer.length).toBeGreaterThan(3 * 1024 * 1024);
  105 |     expect(parseMoney('$1,234.50')).toBe(1234.5);
  106 |     expect(parseMoney('USD 250,000')).toBe(250000);
  107 |     expect(parseMoney('1.234,50')).toBe(1234.5);
  108 |     expect(parseMoney('n/a')).toBeNaN();
  109 |   });
  110 | 
  111 |   test(...tc('FW-04'), async () => {
  112 |     const specFiles = walk(path.join(ROOT, 'tests')).filter((f) => f.endsWith('.spec.js'));
  113 |     const declared = new Set();
  114 |     for (const f of specFiles) {
  115 |       for (const m of fs.readFileSync(f, 'utf8').matchAll(/\btc(?:\.only|\.fixme)?\(\s*'([A-Z]+-(?:V)?\d+)'/g)) declared.add(m[1]);
  116 |     }
  117 |     const unknown = [...declared].filter((id) => !byId[id]);
  118 |     expect(unknown, 'tests that reference a case missing from test-design/testCases.js').toEqual([]);
  119 | 
  120 |     const missingAutomation = cases.filter((c) => c.automation === 'Automated' && !declared.has(c.id)).map((c) => c.id);
  121 |     expect(missingAutomation, 'cases marked Automated that have no test').toEqual([]);
  122 |     const blockedButCoded = cases.filter((c) => c.automation === 'Blocked' && declared.has(c.id)).map((c) => c.id);
  123 |     expect(blockedButCoded, 'cases marked Blocked that nevertheless have a test').toEqual([]);
  124 | 
  125 |     expect(cases.filter((c) => !c.risks.length).map((c) => c.id), 'cases with no linked risk').toEqual([]);
  126 |     const linkedRisks = new Set(cases.flatMap((c) => c.risks));
  127 |     expect(risks.filter((r) => !linkedRisks.has(r.id)).map((r) => r.id), 'risks with no test case').toEqual([]);
  128 |     const linkedIssues = new Set(cases.flatMap((c) => c.defects));
  129 |     expect(reportedIssues.filter((r) => !linkedIssues.has(r.id)).map((r) => r.id), 'reported issues (seeded-defect themes) with no test case').toEqual([]);
  130 |     expect(cases.filter((c) => c.priority === 'P1').length, 'P1 = release gate, kept to about 15-20 cases').toBeLessThanOrEqual(20);
  131 |     expect(buildKyc().ssn, 'synthetic SSN only (900-series is never issued)').toMatch(/^900-/);
  132 |     expect(buildAddress().email).toMatch(/@example\.test$/);
  133 |     expect(risks.length).toBe(41);
  134 |     expect(reportedIssues.length).toBe(20);
  135 |   });
  136 | });
  137 | 
```