# 🥐 OvenGlow Bakery - Enterprise Playwright Automation Framework

A production-grade E2E & API test automation framework built with **Playwright** and **TypeScript** using the **Page Object Model (POM)** pattern.

Automates end-to-end user journeys, state-driven cart calculations, express checkout, PostgreSQL Row Level Security (RLS) enforcement, and realtime kitchen dispatch updates for [OvenGlow Bakery](https://ovenglow-bakery.vercel.app).

---

## 🚀 Key Framework Features

- **Language & Engine:** TypeScript + Playwright Test Runner
- **Design Pattern:** Modular Page Object Model (POM) with isolated BasePage utilities
- **Dependency Injection:** Custom fixtures (`testFixtures.ts`) for clean test setups
- **Cross-Browser & Parallel:** Pre-configured matrix runs across Chromium, WebKit & Firefox
- **Reporting & Diagnostics:** Trace Viewer, failure video captures, and step-level HTML reports
- **CI/CD:** Automated GitHub Actions pipeline executing on push and PR triggers

---

## 📁 Repository Structure

```text
├── .github/workflows/         # Continuous integration pipelines
├── docs/
│   └── TEST_CASES.md          # 20+ Detailed test cases with priorities
├── src/
│   ├── data/                  # Dynamic & static test data sets
│   ├── fixtures/              # Custom Playwright test extensions
│   └── pages/                 # Page Object Model classes (Storefront, Checkout, Kitchen)
├── tests/
│   └── e2e/                   # E2E test suites (Order flow, Staff console)
├── playwright.config.ts       # Global test runner configuration
└── tsconfig.json              # TypeScript strict paths and compiler settings
```

---

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/rkb-sdet/ovenglow-playwright-automation.git](https://github.com/rkb-sdet/ovenglow-playwright-automation.git)
   cd ovenglow-playwright-automation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   npx playwright install --with-deps
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   BASE_URL=[https://ovenglow-bakery.vercel.app](https://ovenglow-bakery.vercel.app)
   STAFF_EMAIL=staff@ovenglow.com
   STAFF_PASSWORD=OvenGlow@2026
   ```

---

## 🧪 Running Tests

```bash
# Run all tests headlessly
npm test

# Run Chromium suite in headed mode
npx playwright test --project=Chromium --headed

# Launch interactive Playwright UI Mode
npm run test:ui

# View generated HTML report
npm run report
```