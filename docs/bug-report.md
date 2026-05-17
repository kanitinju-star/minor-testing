# Bug Report: Internal Server Error on Invalid Movie ID 🐛

**Bug ID**: BUG-001
**Severity**: Medium
**Priority**: High
**Status**: Open

## Description
When requesting a movie with an ID that does not exist or is invalid, the server returns a `500 Internal Server Error` instead of a graceful `404 Not Found` or an empty result.

## Steps to Reproduce
1. Ensure the backend server is running.
2. Send a `GET` request to `http://localhost:4000/movies/999999` (or any non-existent ID).
3. Observe the HTTP response status code.

## Expected Result
The server should return `404 Not Found` with a message like `{"message": "Movie not found"}` or a `200 OK` with an empty result.

## Actual Result
The server returns `500 Internal Server Error`.

## Test Environment
- **URL**: `http://localhost:4000`
- **Tool**: Vitest + Supertest
- **Date**: 2026-05-13

---

## Technical Details
The error likely occurs because the database query returns no rows, and the code attempts to access `result.rows[0]` without checking if it exists, or the UUID validation fails and throws an unhandled exception.
