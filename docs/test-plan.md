# Minor Cineplex - Test Plan

**Project:** Minor Cineplex  
**Prepared by:** Kanitin Juthasompakorn  
**Last Updated:** November 2026  
**Testing Tools:** Playwright, Vitest, Supertest  

---

## 1. Introduction & Scope

This test plan covers the QA testing scope for the Minor Cineplex web application — a movie ticket booking platform. Testing includes both **automated tests** (unit, integration, E2E) and **manual test scenarios** documented for future automation or manual execution.

### Flows Covered
| Flow | Test Type | Status |
|------|-----------|--------|
| Movie Browsing (homepage, tabs) | E2E (Playwright) | ✅ Automated |
| Movie Search | Manual | 📝 Documented |
| Showtime Selection | Manual | 📝 Documented |
| Seat Selection | Manual | 📝 Documented |
| Booking & Payment | Manual | 📝 Documented |
| Discount/Coupon Calculation | Unit (Vitest) | ✅ Automated |
| Movies API Endpoints | Integration (Supertest) | ✅ Automated |

---

## 2. Test Cases

### Unit Tests (Automated — Vitest)

| TC ID | Test Case | Input | Expected Result | Status |
|-------|-----------|-------|-----------------|--------|
| UT-001 | No coupon applied | price=1000, coupon=null | 1000 | ✅ Pass |
| UT-002 | Percentage discount (10%) | price=1000, type=discount_percentage, value=10 | 900 | ✅ Pass |
| UT-003 | Fixed amount discount (100฿) | price=1000, type=discount_amount, value=100 | 900 | ✅ Pass |
| UT-004 | Free ticket coupon | price=1000, type=free_ticket | 0 | ✅ Pass |
| UT-005 | Discount > price (no negative) | price=1000, type=discount_amount, value=1500 | 0 | ✅ Pass |
| UT-006 | Buy-one-get-one (50% off) | price=1000, type=buy_one_get_one | 500 | ✅ Pass |
| UT-007 | Fixed price coupon | price=1000, type=fixed_price, value=199 | 199 | ✅ Pass |

### Integration Tests (Automated — Supertest)

| TC ID | Test Case | Endpoint | Expected Result | Status |
|-------|-----------|----------|-----------------|--------|
| IT-001 | Get all movies | GET /movies | 200 OK, returns array with title & id | ✅ Pass |
| IT-002 | Get invalid movie ID | GET /movies/999999 | 404 or 200 (graceful) | ⚠️ Returns 500 (see BUG-001) |

### E2E Tests (Automated — Playwright)

| TC ID | Test Case | Steps | Expected Result | Status |
|-------|-----------|-------|-----------------|--------|
| E2E-001 | Homepage displays movies | 1. Go to homepage 2. Check search input 3. Check "Now Showing" tab 4. Check movie title visible | All elements visible | ✅ Pass |
| E2E-002 | Switch to Coming Soon tab | 1. Go to homepage 2. Click "Coming Soon" tab | Tab switches, content updates | ✅ Pass |

### Manual Test Cases (Documented for future automation)

| TC ID | Test Case | Pre-condition | Steps | Expected Result |
|-------|-----------|---------------|-------|-----------------|
| MT-001 | Search movie by title | App running, movies in DB | 1. Go to homepage 2. Type "Spider" in search box 3. Wait for results | Only movies matching "Spider" are shown |
| MT-002 | Select movie and view showtimes | At least 1 movie exists | 1. Click on a movie card 2. View movie detail page | Showtimes are displayed with date, time, and cinema |
| MT-003 | Select seats | Showtime selected | 1. Navigate to seat selection 2. Click available seat "A3" 3. Click already-booked seat "A1" | A3 turns selected (highlighted), A1 is disabled/greyed out |
| MT-004 | Complete booking (happy path) | Seats selected, user logged in | 1. Click "Confirm Booking" 2. Enter payment info 3. Submit | Booking confirmed, ticket summary shown |
| MT-005 | Booking with invalid coupon | On payment page | 1. Enter invalid coupon code "FAKECODE" 2. Click apply | Error message: "Invalid coupon code" |
| MT-006 | Booking with valid coupon | On payment page | 1. Enter valid coupon "DISCOUNT10" 2. Click apply | Price reduced by 10%, total updated |
| MT-007 | Cancel booking | Booking exists | 1. Go to My Bookings 2. Click cancel on a booking | Booking status changes to "Cancelled", seats released |
| MT-008 | View booking history | User has past bookings | 1. Log in 2. Go to My Bookings | List of past bookings shown with status |

---

## 3. Test Data Strategy

| Data Type | Description | Example |
|-----------|-------------|---------|
| Static Data | Movie titles, cinema names, seat layouts | "Spider-Man", "Cinema 1", Row A-H |
| Dynamic Data | User credentials, booking IDs, timestamps | Auto-generated per test run |
| Mock Data | Payment responses, coupon validation | success/failure payment stubs |
| Boundary Data | Edge cases for discount calculation | price=0, discount > price, 100% off |

---

## 4. Test Environment

| Component | Detail |
|-----------|--------|
| Frontend | React (localhost:3000) |
| Backend API | Node.js/Express (localhost:4000) |
| Database | PostgreSQL |
| Browsers (E2E) | Chromium, Firefox, WebKit |
| CI | GitHub Actions (ubuntu-latest, Node 20) |

---

## 5. Risk & Limitations

- **E2E tests depend on live server** — cannot run in CI without deployment setup
- **Integration tests depend on backend API** — need `localhost:4000` running
- **Payment flow** is not automated due to third-party payment gateway dependency
- **Coverage is limited** to `booking.ts` utility — full app coverage requires access to main project codebase
