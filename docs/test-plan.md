# Minor Cineplex Test Plan

This document outlines the specific test cases and data used for testing the Minor Cineplex application.

## 1. Requirement Analysis
The application allows users to:
- Browse movies.
- View showtimes.
- Select seats.
- Book tickets (Payment integration).

## 2. Test Cases (E2E)

### TC-001: Browse Movies
- **Objective**: Ensure movies are displayed correctly on the homepage.
- **Pre-condition**: App is running and has movie data.
- **Steps**:
    1. Navigate to homepage.
    2. Wait for movie cards to load.
- **Expected Result**: At least one movie card should be visible.

### TC-002: Select Movie and Showtime
- **Objective**: Navigate to movie details and select a time.
- **Steps**:
    1. Click on a movie card.
    2. Click on a showtime button.
- **Expected Result**: User is navigated to the Seat Selection page.

### TC-003: Seat Selection Logic
- **Objective**: Prevent booking already taken seats.
- **Test Data**: Seat "A1" (Already booked in DB).
- **Steps**:
    1. Navigate to Seat Selection for a movie.
    2. Attempt to click seat "A1".
- **Expected Result**: Seat "A1" is disabled or shows an error.

---

## 3. Test Data Strategy
- **Static Data**: Movie titles, Cinema names.
- **Dynamic Data**: User credentials, Booking IDs.
- **Mock Data**: For payment success/failure scenarios.
