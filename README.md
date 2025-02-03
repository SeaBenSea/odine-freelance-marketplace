# QA Test Plan - Odine Freelance Marketplace

## Table of Contents

- [1. Overview](#1-overview)
- [2. Explanation and Assumptions](#2-explanation-and-assumptions)
- [3. Documentation](#3-documentation)

## 1. Overview

This document outlines the test scenarios and test cases for the Odine Freelance Marketplace. It is designed to ensure that all functional and non-functional requirements are thoroughly tested.

---

## 2. Explanation and Assumptions

### 2.1 Assumptions

- **Mock Data:**  
  JSONPlaceholder endpoints (`/users`, `/posts`, `/comments`) are assumed to return consistent data. Each user has an identifier that correlates with their posts.

- **Fail Safes:**  
  The application is assumed to have built-in error handling for failed API requests or missing data. Such as displaying a generic error message or showing fallback data.

- **Finished Job Count Calculation:**  
  The "Finished Job Count" is derived by filtering data from the `/posts` endpoint using the freelancer's user ID.

- **Search-as-You-Type:**  
  Search results update immediately as input is provided (without the need for an "Enter" key or "Search" button).

- **Responsiveness and Accessibility:**  
  The application is assumed to be responsive across mobile, tablet, and desktop, and includes accessible labels following best practices.

### 2.2 Limitations

- **Backend Communication:**  
  As a mock application, real API responses are not tested. Endpoints are assumed to always return valid data or fail completely.

- **Edge Error Handling:**  
  Since the requirements do not specify behavior for failed endpoints or missing data, error-handling tests are minimal.

### 2.3 Decisions

- **Testing Areas:**  
  The testing is split into functional areas:

  - Dashboard
  - Portfolio Page
  - Hire Popup
  - Light/Dark Mode

- **Test Scenarios:**  
  Each scenario includes a clear description, the steps to execute, and the expected outcomes.

- **Non-Functional Requirements:**  
  UX, performance, and accessibility are addressed in separate test scenarios rather than within each functional test.

---

## 3. Documentation

The test plan documentation is split into several files for better organization and readability:

- [Test Environment](docs/test-environment.md) - Details about browsers, data, and tools used for testing
- [Test Framework](docs/test-framework.md) - Information about the automated testing framework and setup
- [Test Scenarios](docs/test-scenarios.md) - All test scenarios for different features
- [Non-Functional Tests](docs/non-functional-tests.md) - Non-functional and integration test scenarios
- [Detailed Tests](docs/detailed-tests.md) - In-depth test cases with step-by-step instructions
- [Improvements](docs/improvements.md) - Suggested improvements and optimizations
