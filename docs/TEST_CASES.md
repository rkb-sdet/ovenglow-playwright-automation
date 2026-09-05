# 🥐 OvenGlow Bakery - Comprehensive Automated Test Specification

Yeh document **OvenGlow Bakery** web application ke liye banaye gaye saare automated Playwright test specs ka detailed breakdown cover karta hai. Isme **Functional**, **Negative**, **Boundary**, **State Resilience**, **Responsive**, aur **Network Chaos/Resilience** saare test dimensions included hain.

---

## 📋 Test Matrix & Coverage Summary

| Suite / Module | Total Tests | Testing Categories Covered |
| :--- | :--- | :--- |
| **1. Catalog & Search** | 3 Scenarios | Functional, Negative |
| **2. Cart & Pricing Engine** | 3 Scenarios | Boundary, Functional, State Resilience |
| **3. Express Checkout** | 4 Scenarios | Functional, Boundary, Negative, Network Chaos |
| **4. Kitchen Staff Operations** | 4 Scenarios | Security, Functional, Negative |
| **5. Cross-Device & State Resilience** | 2 Scenarios | State Resilience, Responsive |
| **6. Security & Database RLS** | 1 Scenario | Security (API / Database Level) |

---

## 1. Catalog & Search Module (`tests/e2e/catalog/`)

### Test Scenario 1: Product Search Accuracy
* **Test Case ID:** `TC_CAT_001` & `TC_SRCH_001`
* **Category:** Functional
* **Test Objective:** Verify karna ki search box me query enter karne par catalog real-time filter hokar sahi product card display karta hai.
* **Test Data:**
  * Search Query: `"Truffle"`
  * Expected Product: `"Midnight Dark Chocolate Truffle Cake"`
* **Test Steps:**
  1. Storefront homepage (`/`) par navigate karein.
  2. Search input box me `"Truffle"` type karein.
  3. 500ms debounce/render settle hone ka wait karein.
  4. Menu product cards grid inspect karein.
* **Expected Result:** Catalog grid me sirf `Midnight Dark Chocolate Truffle Cake` card visible hona chahiye.

---

### Test Scenario 2: Dietary Filter (100% Eggless Only)
* **Test Case ID:** `TC_CAT_003`
* **Category:** Functional
* **Test Objective:** Verify karna ki "100% Eggless Only" toggle switch on karne par non-eggless bakes filter out ho jaate hain aur sirf eggless items render hote hain.
* **Test Data:**
  * Toggle Target: `label:has-text("100% Eggless Only")`
  * Badge Assertion: `/Eggless/i` ya `.bg-emerald-500` / `.text-emerald-500`
* **Test Steps:**
  1. Storefront homepage open karein aur initial cards load hone ka wait karein.
  2. "100% Eggless Only" toggle button par click karein.
  3. Filter transition aur React re-render hone ka wait karein.
  4. Visible cards count retrieve karein.
  5. Har visible card me dietary indicator verify karein.
* **Expected Result:** Filtered count `> 0` hona chahiye aur har card par Eggless badge visible hona chahiye.

---

### Test Scenario 3: Zero-State Search Handling
* **Test Case ID:** `TC_SRCH_002`
* **Category:** Negative
* **Test Objective:** Invalid keyword search karne par UI gracefully zero-state fallback message render kare.
* **Test Data:**
  * Invalid Search Query: `"xyzinvalidproduct999"`
  * Expected Message: `"No bakes matched your search"`
* **Test Steps:**
  1. Storefront homepage par navigate karein.
  2. Search bar me `"xyzinvalidproduct999"` fill karein.
  3. Menu DOM container observe karein.
* **Expected Result:** Zero-state placeholder text display hona chahiye aur koi product card render nahi hona chahiye.

---

## 2. Cart & Pricing Engine Module (`tests/e2e/cart/`)

### Test Scenario 4: Auto-Removal on Zero Quantity
* **Test Case ID:** `TC_CART_002` & `TC_CART_003`
* **Category:** Boundary & State Resilience
* **Test Objective:** Bag ke andar item quantity decrement karke `0` karne par item cart state se automatically remove ho jaye.
* **Test Data:**
  * Target Product: `"Midnight Dark Chocolate Truffle Cake"`
  * Action: `decrement` (`-` button click)
* **Test Steps:**
  1. Product card par "Add to Bag" click karein.
  2. Header Bag button click karke drawer open karein.
  3. Verify karein ki item count `1` hai.
  4. Item card ke `-` (decrement) button par click karein.
  5. Cart drawer ka contents inspect karein.
* **Expected Result:** Item DOM se delete ho jaye aur `"Your bag is empty"` message render ho.

---

### Test Scenario 5: Free Delivery Threshold Boundary (>= ₹499)
* **Test Case ID:** `TC_PRIC_001`
* **Category:** Boundary
* **Test Objective:** Cart value threshold (₹499) meet ya exceed karne par system automatically delivery fee waive off kare.
* **Test Data:**
  * Product: `"Midnight Dark Chocolate Truffle Cake"` (Price: ₹549)
  * Threshold: `>= ₹499`
  * Expected Delivery Fee: `"FREE"`
* **Test Steps:**
  1. ₹549 value ka product bag me add karein.
  2. Bag drawer open karein.
  3. Order summary row me `Delivery Fee` label check karein.
* **Expected Result:** Delivery charge zero calculate hokar text `"FREE"` display hona chahiye.

---

### Test Scenario 6: Standard Delivery Fee Under Threshold (< ₹499)
* **Test Case ID:** `TC_PRIC_002`
* **Category:** Boundary
* **Test Objective:** Cart value ₹499 se kam hone par flat ₹49 delivery charge auto-apply ho.
* **Test Data:**
  * Product: `"Artisan Butter Croissant"` (Price: ~₹180)
  * Expected Delivery Fee: `"₹49"`
* **Test Steps:**
  1. Catalog search karke ₹180 ka item bag me add karein.
  2. Cart drawer open karein.
  3. Total amount aur delivery line inspect karein.
* **Expected Result:** Delivery line me explicitly `"₹49"` judna chahiye.

---

## 3. Express Checkout Module (`tests/e2e/checkout/`)

### Test Scenario 7: End-to-End Order Placement & ID Generation
* **Test Case ID:** `TC_CHK_003`
* **Category:** Functional
* **Test Objective:** Complete customer checkout flow execute karke database insert aur unique Order ID (`#OG-XXXXXX`) generate karna.
* **Test Data:**
  * Customer Name: `"Rohit Quality Tester"`
  * Phone Number: `"9876543210"`
  * Address: `"Suite 404, Cypress Heights, QA Sector 62"`
  * Slot: `"instant"`
* **Test Steps:**
  1. Storefront par item bag me add karein.
  2. Bag drawer se "Proceed to Checkout" click karein.
  3. Express Checkout modal me Name, Phone, Address fill karein.
  4. "Place Order" button submit karein.
  5. Tracker modal aur Order ID badge render hone ka wait karein.
* **Expected Result:** Order successfully create hona chahiye aur `#OG-` prefix ke saath order ID visible honi chahiye.

---

### Test Scenario 8: Mandatory Input Validation (Empty Form)
* **Test Case ID:** `TC_CHK_001`
* **Category:** Negative & Boundary
* **Test Objective:** Empty details ke saath form submit hone se rokna aur HTML5 form validation enforce karna.
* **Test Data:**
  * Form Fields: All Empty (`""`)
* **Test Steps:**
  1. Item add karke Express Checkout modal open karein.
  2. Form input fields blank chhod dein.
  3. "Place Order" button par click karein.
  4. Name field ka `required` attribute aur DOM inspect karein.
* **Expected Result:** Submission block honi chahiye, browser validation trigger ho, aur success tracker modal open nahi hona chahiye.

---

### Test Scenario 9: Delivery Slot Toggle Resilience
* **Test Case ID:** `TC_CHK_002`
* **Category:** Functional & State Resilience
* **Test Objective:** Delivery slot options (`Instant 30 Min` vs `Morning 8 AM`) switch karne par UI active classes correctly toggle kare.
* **Test Data:**
  * Slot 1: `"Morning 8 AM"`
  * Slot 2: `"Instant 30 Min"`
* **Test Steps:**
  1. Checkout modal open karein.
  2. "Morning 8 AM" button par click karein.
  3. Active border/ring CSS classes check karein.
  4. Wapas "Instant 30 Min" button par click karein.
* **Expected Result:** Selected slot button par active gold border highlight ho aur unselected slot unhighlighted rahe.

---

### Test Scenario 10: Server 500 Network Chaos on Place Order
* **Test Case ID:** `TC_NET_001`
* **Category:** Network Chaos / Resilience
* **Test Objective:** Database/Server 500 error return kare to application crash na ho, balki graceful error prompt render kare.
* **Test Data:**
  * Mocked Route: `**/rest/v1/orders*`
  * Injected Response: `Status: 500 Internal Server Error`
* **Test Steps:**
  1. Checkout form fill karein.
  2. Playwright route interceptor set karein: `page.route('**/rest/v1/orders*', route => route.fulfill({ status: 500 }))`.
  3. "Place Order" button click karein.
  4. Screen state observe karein.
* **Expected Result:** Application white-screen crash na kare, success screen na dikhe, aur user ko error message ya toast prompt dikhayi de.

---

## 4. Kitchen Staff Operations Module (`tests/e2e/staff/`)

### Test Scenario 11: Guest Authentication Barrier
* **Test Case ID:** `TC_STAFF_001`
* **Category:** Security / Boundary
* **Test Objective:** Unauthenticated users ko kitchen dispatch console direct access karne se rokna.
* **Test Data:**
  * User State: Guest / Anonymous
* **Test Steps:**
  1. Homepage par "Staff Kitchen Console" button click karein.
  2. Modal screen inspect karein.
* **Expected Result:** Login credential modal prompt hona chahiye aur background me Live Kitchen Dispatch dashboard hidden rehna chahiye.

---

### Test Scenario 12: Invalid Credentials Rejection
* **Test Case ID:** `TC_STAFF_002`
* **Category:** Negative
* **Test Objective:** Wrong email ya password enter karne par authentication block ho aur error message aaye.
* **Test Data:**
  * Email: `"staff@ovenglow.com"`
  * Password: `"WrongPassword123"`
  * Expected Alert: `"Invalid login credentials"`
* **Test Steps:**
  1. Staff login modal open karein.
  2. Invalid email aur password fill karein.
  3. "Access Kitchen Console" par click karein.
* **Expected Result:** Login reject hona chahiye aur `"Invalid login credentials"` alert text render hona chahiye.

---

### Test Scenario 13: Live Dispatch Console & WebSocket Indicator
* **Test Case ID:** `TC_STAFF_003` & `TC_STAFF_004`
* **Category:** Functional
* **Test Objective:** Valid credentials ke saath login karke real-time dispatch dashboard aur active WebSocket connection status verify karna.
* **Test Data:**
  * Email: `process.env.STAFF_EMAIL`
  * Password: `process.env.STAFF_PASSWORD`
  * Target Header: `"Live Kitchen Dispatch"`
* **Test Steps:**
  1. Staff modal me authorized credentials enter karein.
  2. Login button submit karein.
  3. Dashboard header appear hone ka wait karein.
  4. Real-time socket indicator observe karein.
* **Expected Result:** Dashboard successfully open hona chahiye aur `"WebSocket Connected"` status pill green/visible hona chahiye.

---

### Test Scenario 14: Staff Session Sign-Out
* **Test Case ID:** `TC_STAFF_006`
* **Category:** Security & State Resilience
* **Test Objective:** Sign out karne par active session invalidate ho aur console redirect ho jaye.
* **Test Data:**
  * Trigger: `button:has-text("Sign Out")`
* **Test Steps:**
  1. Logged-in kitchen console par "Sign Out" button par click karein.
  2. DOM states observe karein.
* **Expected Result:** Live dashboard instantly unmount ho jaye aur login screen restore ho jaye.

---

## 5. Cross-Device & State Resilience Module (`tests/e2e/checkout/`)

### Test Scenario 15: Cart State Persistence Across Hard Reload
* **Test Case ID:** `TC_STATE_001`
* **Category:** State Resilience
* **Test Objective:** Browser refresh hone par local state/Zustand persist rahe aur items loss na hon.
* **Test Data:**
  * Item: `"Midnight Dark Chocolate Truffle Cake"`
  * Action: `page.reload()`
* **Test Steps:**
  1. Product bag me add karein aur badge counter `1` verify karein.
  2. Browser hard refresh execute karein: `page.reload()`.
  3. Network idle hone ka wait karein.
  4. Header cart badge inspect karein.
* **Expected Result:** Refresh ke baad bhi cart badge count `1` retain hona chahiye.

---

### Test Scenario 16: Mobile Viewport Drawer & Overlay
* **Test Case ID:** `TC_RESP_001`
* **Category:** Responsive
* **Test Objective:** Mobile viewport par drawer full-width render ho aur close button easily dismiss kare.
* **Test Data:**
  * Viewport: `390px x 844px` (iPhone 14 standard)
* **Test Steps:**
  1. Viewport `390x844` set karein.
  2. Header se Bag open karein.
  3. Drawer ka close (`✕`) button click karein.
* **Expected Result:** Drawer screen par properly open hona chahiye aur close click karne par slide-out ho kar disappear ho jaye.

---

## 6. Security & Database RLS Module (`tests/e2e/security/`)

### Test Scenario 17: Row Level Security (RLS) Guest Access Block
* **Test Case ID:** `TC_SEC_001`
* **Category:** Security (API / Database Level)
* **Test Objective:** Direct REST endpoint call par anonymous user unauthorized rahe aur customer orders leak na hon.
* **Test Data:**
  * Endpoint: `GET /api/orders`
  * Auth Headers: None (Anonymous Request)
* **Test Steps:**
  1. Playwright API request context se direct GET request bhejein bina session token ke.
  2. Response HTTP status aur payload verify karein.
* **Expected Result:** Status `401 / 403 / 404` ya safe empty array `[]` return hona chahiye; sensitive customer records leak nahi hone chahiye.