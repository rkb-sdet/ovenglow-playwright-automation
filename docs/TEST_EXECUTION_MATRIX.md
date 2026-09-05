# 📊 OvenGlow Bakery - Requirements Traceability Matrix (RTM)

Yeh document business requirements, functional acceptance criteria, mapped automated Playwright test cases, aur execution status ko track karta hai.

---

## Traceability Mapping Table

| Requirement ID | Business Feature | Test Case ID | Test Category | Automated Spec Path | Execution Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-CAT-01** | Realtime Catalog Search | `TC_CAT_001` / `TC_SRCH_001` | Functional | `tests/e2e/catalog/catalogSearch.spec.ts` | Pass |
| **REQ-CAT-02** | Dietary Eggless Filter | `TC_CAT_003` | Functional | `tests/e2e/catalog/dietaryFilter.spec.ts` | Pass |
| **REQ-CAT-03** | Zero State Fallback | `TC_SRCH_002` | Negative | `tests/e2e/catalog/zeroStateSearch.spec.ts` | Pass |
| **REQ-PRC-01** | Free Delivery (>= ₹499) | `TC_PRIC_001` | Boundary | `tests/e2e/cart/cartPricingEdgeCases.spec.ts` | Pass |
| **REQ-PRC-02** | Standard Delivery Fee (< ₹499)| `TC_PRIC_002` | Boundary | `tests/e2e/cart/cartPricingEdgeCases.spec.ts` | Pass |
| **REQ-CRT-01** | Zero Qty Auto-Removal | `TC_CART_002` / `TC_CART_003` | State Resilience | `tests/e2e/cart/cartPricingEdgeCases.spec.ts` | Pass |
| **REQ-CRT-02** | Cart State Persistence | `TC_STATE_001` | State Resilience | `tests/e2e/checkout/networkAndState.spec.ts` | Pass |
| **REQ-CRT-03** | Mobile Drawer Slide-over | `TC_RESP_001` | Responsive | `tests/e2e/checkout/responsiveDrawer.spec.ts` | Pass |
| **REQ-CHK-01** | Express Checkout E2E | `TC_CHK_003` | Functional | `tests/e2e/checkout/orderPlacement.spec.ts` | Pass |
| **REQ-CHK-02** | Form Mandatory Validation | `TC_CHK_001` | Negative / Boundary | `tests/e2e/checkout/checkoutEdgeCases.spec.ts` | Pass |
| **REQ-CHK-03** | Delivery Slot Toggle | `TC_CHK_002` | Functional / UI | `tests/e2e/checkout/checkoutEdgeCases.spec.ts` | Pass |
| **REQ-CHK-04** | Server 500 Chaos Handling | `TC_NET_001` | Network Chaos | `tests/e2e/checkout/networkAndState.spec.ts` | Pass |
| **REQ-STF-01** | Guest Auth Barrier | `TC_STAFF_001` | Security / Gate | `tests/e2e/staff/authBarrier.spec.ts` | Pass |
| **REQ-STF-02** | Invalid Credential Rejection | `TC_STAFF_002` | Negative | `tests/e2e/staff/invalidLogin.spec.ts` | Pass |
| **REQ-STF-03** | Realtime Kitchen WebSocket | `TC_STAFF_003` / `TC_STAFF_004` | Functional | `tests/e2e/staff/liveDispatch.spec.ts` | Pass |
| **REQ-STF-04** | Order Status Progression | `TC_STAFF_004` | Lifecycle Flow | `tests/e2e/staff/orderLifecycle.spec.ts` | Pass |
| **REQ-STF-05** | Staff Session Signout | `TC_STAFF_006` | Security | `tests/e2e/staff/orderLifecycle.spec.ts` | Pass |
| **REQ-SEC-01** | Supabase PostgreSQL RLS | `TC_SEC_001` | Database Security | `tests/e2e/security/rlsPolicies.spec.ts` | Pass |

---

## Test Execution Summary

```text
Total Test Requirements:   18
Automated Test Specs:      22
Passed:                    22
Failed:                    0
Flakiness Index:           0%
CI / CD Target:            Ubuntu GitHub Actions Runner
```