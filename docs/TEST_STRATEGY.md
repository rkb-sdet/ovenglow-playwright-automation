Toh pehla document **`docs/TEST_STRATEGY.md`** se start karte hain.

Root folder ke andar `docs/TEST_STRATEGY.md` file banayein aur neeche diya gaya complete code save karein:

```markdown
# 🥐 OvenGlow Bakery - Test Automation Strategy & Quality Engineering Blueprint

## 1. Executive Summary & Quality Vision
Is test strategy document ka purpose **OvenGlow Bakery** web application ke liye production-ready, highly reliable, aur scalable automated testing framework maintain karna hai. 
Framework ka primary objective functional workflows, checkout calculations, realtime kitchen status dispatch, PostgreSQL Row-Level Security (RLS), aur network failure conditions par 100% test coverage ensure karna hai.

---

## 2. Test Automation Pyramid & Scope

| Layer | Coverage Scope | Tooling | Execution Trigger |
| :--- | :--- | :--- | :--- |
| **E2E & UI Journeys** | Catalog filter, shopping bag, checkout flow, staff dashboard | Playwright + TypeScript | PR & Scheduled CI Runs |
| **State & Boundaries** | Cart quantity zero-elimination, free delivery thresholds (₹499) | Playwright (Zustand DOM sync) | PR & Smoke Matrix |
| **API & Database Security** | Guest data isolation, Supabase REST endpoints, RLS checks | Playwright APIRequestContext | PR & Nightly Regression |
| **Chaos & Resilience** | Mock HTTP 500 failure injection, network idle drops | Playwright Route Interception | Nightly Regression |

---

## 3. Locator & Element Resolution Strategy

Strict Mode violations aur flaky locators se bachne ke liye following best practices enforce kiye gaye hain:

* **Role-Based Primary Locators:** Accessible roles ko prefer kiya gaya hai (`getByRole('button', { name: /.../i })`).
* **Scoped Parent Locators:** Reusable components (jaise header bag trigger vs card add-to-bag buttons) me parent container scoping use ki gayi hai:
  ```typescript
  // Scoped to avoid strict-mode collisions:
  this.bagButton = page.locator('header, nav').getByRole('button', { name: /^bag/i });

```

* **Text Normalization:** Dynamic labels ya badges (e.g. dietary flags) ke liye case-insensitive regex pattern matching apply ki gayi hai (`/Eggless/i`).
* **Strict Mode Compliance:** Playwright ke 1.27+ strict-mode standards enforce hain; single element resolve hone ki guarantee di gayi hai.

---

## 4. Test Isolation & Dependency Injection

Har test suite independent aur stateless rakha gaya hai:

* **BasePage Wrapper:** Generic browser interactions (`navigateTo`, `waitForElement`) ko `BasePage` me abstract kiya gaya hai.
* **Page Object Models (POM):** Feature-specific classes (`StorefrontPage`, `CheckoutModalPage`, `KitchenConsolePage`, `CartDrawerPage`) create ki gayi hain jo raw selectors ko test layer se isolate karti hain.
* **Custom Fixtures:** Tests me direct page instantiations ki jagah custom Playwright fixture extension (`testFixtures.ts`) use kiya gaya hai jisse clean dependency injection ensure hoti hai.

---

## 5. Flakiness Mitigation & Async Stabilization

* **No Hard Sleep Dependency:** Arbitrary `sleep()` calls ko eliminate karke state-dependent auto-waiters (`toBeVisible()`, `waitForLoadState('networkidle')`) implement kiye gaye hain.
* **Drawer & Modal Transitions:** Tailwind/CSS animation delay ke liye minimum debounce waits lagaye gaye hain taaki transition ke dauran element count zero return na ho.
* **Dynamic API Data:** Supabase database response latency ko handle karne ke liye critical database calls par custom threshold timeouts (`timeout: 10000ms - 20000ms`) configured hain.

---

## 6. Security & Data Integrity Verification (RLS)

* Anonymous users ke through backend APIs par hone wale unauthorized access ko automated API assertions se verify kiya jata hai.
* Directly database tables query karke check kiya jata hai ki PostgreSQL Row Level Security (RLS) policies guest requests par zero data leak karein (`status: 401/403/404` or safe empty response `[]`).

---

## 7. Execution Profiles & Parallelism

* **Local Development:** Headed run with interactive Playwright UI mode (`npm run test:ui`).
* **CI Integration:** Headless parallel execution across multiple workers (Chromium, Firefox, Mobile Safari).
* **Diagnostic Artifacts:** Failure hone par trace files, screenshots, aur execution videos `test-results/` me automatically capture hoti hain.

```
