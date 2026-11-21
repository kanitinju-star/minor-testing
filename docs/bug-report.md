# Minor Cineplex - Bug Reports

**Project:** Minor Cineplex  
**Reported by:** Kanitin Juthasompakorn  
**Last Updated:** November 2026  

---

## BUG-001: Server returns 500 instead of 404 on invalid movie ID

| Field | Detail |
|-------|--------|
| **Bug ID** | BUG-001 |
| **Severity** | Medium |
| **Priority** | High |
| **Status** | Open |
| **Found by** | Integration Test (Supertest) |
| **Date Found** | 2026-05-13 |

### Description
When requesting a movie with an ID that does not exist or is invalid, the server returns a `500 Internal Server Error` instead of a graceful `404 Not Found`.

### Steps to Reproduce
1. Ensure the backend server is running at `http://localhost:4000`.
2. Send a `GET` request to `http://localhost:4000/movies/999999` (or any non-existent ID).
3. Observe the HTTP response status code.

### Expected Result
- Status: `404 Not Found`
- Body: `{"message": "Movie not found"}`

### Actual Result
- Status: `500 Internal Server Error`
- Body: Generic server error message

### Root Cause Analysis
The error likely occurs because:
- The database query returns no rows, and the code attempts to access `result.rows[0]` without null-checking.
- Or the UUID/ID validation fails and throws an unhandled exception.

### Suggested Fix
```javascript
// Add null check before accessing result
const result = await db.query('SELECT * FROM movies WHERE id = $1', [id]);
if (result.rows.length === 0) {
  return res.status(404).json({ message: 'Movie not found' });
}
return res.json(result.rows[0]);
```

### Test Environment
- **API URL:** `http://localhost:4000`
- **Tool:** Vitest + Supertest
- **Test File:** `tests/integration/movies.test.ts`

---

## BUG-002: "Coming Soon" tab content does not visually differentiate from "Now Showing"

| Field | Detail |
|-------|--------|
| **Bug ID** | BUG-002 |
| **Severity** | Low |
| **Priority** | Low |
| **Status** | Open |
| **Found by** | E2E Test (Playwright) — Manual Observation |
| **Date Found** | 2026-11-20 |

### Description
When clicking the "Coming Soon" tab on the homepage, the tab appears to switch but there is no clear visual feedback (e.g., different styling on active tab, or a change in content) to confirm the user is now viewing upcoming movies vs. currently showing ones.

### Steps to Reproduce
1. Go to the homepage at `http://localhost:3000`.
2. Click the "Coming Soon" button/tab.
3. Observe the page content and tab styling.

### Expected Result
- The "Coming Soon" tab should have an active/selected style (e.g., different color, underline).
- Content should change to show upcoming movies (or a "No upcoming movies" message).

### Actual Result
- Tab click registers but visual distinction is unclear.
- It's hard to tell if the content actually changed.

### Suggested Fix
- Add active state CSS to the selected tab (e.g., `border-bottom: 2px solid #primary` or background color change).
- Ensure the movie list filters by release date to show only future titles under "Coming Soon".

### Test Environment
- **URL:** `http://localhost:3000`
- **Tool:** Playwright (Chromium, Firefox, WebKit)
- **Test File:** `tests/e2e/movie-browsing.spec.ts`

---

## BUG-003: Search input has no "no results" feedback

| Field | Detail |
|-------|--------|
| **Bug ID** | BUG-003 |
| **Severity** | Low |
| **Priority** | Medium |
| **Status** | Open |
| **Found by** | Manual Testing |
| **Date Found** | 2026-11-20 |

### Description
When a user searches for a movie title that does not exist (e.g., "xyzabc"), the search input clears the movie list but shows no message like "No movies found" — it just shows a blank area.

### Steps to Reproduce
1. Go to the homepage at `http://localhost:3000`.
2. Type "xyzabc" in the search box.
3. Observe the movie list area.

### Expected Result
- A message like "No movies found" or "Try a different search" should appear.

### Actual Result
- The movie list area becomes empty with no feedback message.

### Suggested Fix
- Add a conditional render: when filtered movies array is empty, show a "No movies found" placeholder.
