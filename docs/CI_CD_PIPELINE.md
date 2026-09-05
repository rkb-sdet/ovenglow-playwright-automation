# 🚀 OvenGlow Bakery - CI/CD Pipeline & Execution Architecture

Yeh document continuous integration (CI) pipeline setup, headless execution triggers, secret injection, aur failure triage workflows ko explain karta hai.

---

## 1. Pipeline Architecture Overview

Framework GitHub Actions use karke headless Playwright tests execute karta hai. Har code push aur pull request par automated matrix run hota hai taaki koi bhi regression bug production me na jaye.

```text
[ Developer Push / PR ]
         │
         ▼
[ GitHub Actions Runner (Ubuntu Latest) ]
         │
         ├── 1. Checkout Code (`actions/checkout@v4`)
         ├── 2. Setup Node.js LTS (`actions/setup-node@v4`)
         ├── 3. Install Dependencies (`npm ci`)
         ├── 4. Cache & Install Playwright Browsers (`npx playwright install --with-deps`)
         ├── 5. Inject Secrets (.env variables)
         ├── 6. Run Test Suites in Parallel (`npx playwright test`)
         │
         ├── [SUCCESS] ──► Deploy preview / Merge approval
         └── [FAILURE] ──► Upload Test Artifacts (`actions/upload-artifact@v4`)
                           ├── HTML Report
                           ├── Trace Viewer ZIPs
                           └── Screenshots / WebM Videos
```

---

## 2. GitHub Actions Workflow Configuration

File: `.github/workflows/playwright.yml`

```yaml
name: Playwright Regression & Quality Gate

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
  workflow_dispatch:

jobs:
  e2e-tests:
    name: Run E2E Test Suites
    timeout-minutes: 30
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install NPM Dependencies
        run: npm ci

      - name: Cache Playwright Binary Browsers
        id: playwright-cache
        uses: actions/cache@v4
        with:
          path: ~/.cache/ms-playwright
          key: ${{ runner.os }}-playwright-${{ hashFiles('**/package-lock.json') }}

      - name: Install Playwright Browsers & OS Dependencies
        if: steps.playwright-cache.outputs.cache-hit != 'true'
        run: npx playwright install --with-deps chromium

      - name: Execute Playwright Test Suite
        run: npx playwright test --project=Chromium
        env:
          BASE_URL: [https://ovenglow-bakery.vercel.app](https://ovenglow-bakery.vercel.app)
          STAFF_EMAIL: ${{ secrets.STAFF_EMAIL }}
          STAFF_PASSWORD: ${{ secrets.STAFF_PASSWORD }}
          CI: true

      - name: Publish Test Report Artifacts
        uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-execution-report
          path: |
            playwright-report/
            test-results/
          retention-days: 14
```

---

## 3. Secret & Environment Configuration

CI pipeline me sensitive credentials hardcode nahi kiye gaye hain. GitHub repository settings me following secrets configure kiye jaate hain:

1. Navigate to: **GitHub Repo > Settings > Secrets and variables > Actions**
2. Add Repository Secrets:
   * `STAFF_EMAIL`: Kitchen staff login email ID (e.g. `staff@ovenglow.com`).
   * `STAFF_PASSWORD`: Authorized staff password.
   * `BASE_URL` *(Optional)*: Target staging/production URL override.

---

## 4. Artifacts Retention & Diagnostics

Jab koi test suite CI environment me fail hota hai, tab Playwright automatically failure artifacts generate karta hai:

* **HTML Report (`playwright-report/`):** Step-by-step visual summary, call logs, duration, aur error messages.
* **Trace Viewer (`test-results/**/*.zip`):** Full DOM snapshot, execution timeline, network requests, console logs, aur action metadata.
* **Video Recordings (`.webm`):** Failure se theek pehle screen par browser interaction ka video replay.
* **Screenshots (`.png`):** Exact failure timestamp ka visual screen state.

---

## 5. Failure Triage & Debugging Guide

CI run fail hone par root cause inspect karne ke steps:

1. **Download Artifacts:**
   * GitHub Actions tab me failed run open karein.
   * Bottom me **Artifacts** section se `playwright-execution-report` zip download karein.

2. **Run Local Trace Viewer:**
   * Downloaded zip ko extract karein aur terminal me trace file inspect karein:
   ```bash
   npx playwright show-trace path/to/extracted/trace.zip
   ```

3. **Inspect Time Travel DOM:**
   * Action timeline par hover karke dekhein kis specific DOM state par locator fail hua.
   * Network tab me check karein ki Supabase API calls `200` return kar rahi thi ya `500/timeout`.