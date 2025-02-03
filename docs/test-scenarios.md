# Test Scenarios

## Table of Contents

- [1. Dashboard](#1-dashboard)
  - [Display Freelancer List with Details](#display-freelancer-list-with-details)
  - [Search by Name](#search-by-name)
  - [Search by Finished Job Count Range](#search-by-finished-job-count-range)
  - [Search by City](#search-by-city)
  - [Combined Search Criteria](#combined-search-criteria)
  - [No Results Found Scenario](#no-results-found-scenario)
- [2. Portfolio Page](#2-portfolio-page)
  - [Navigation to Portfolio Page](#navigation-to-portfolio-page)
  - [Display Freelancer Information](#display-freelancer-information)
  - [Display Past Jobs with Comments Count](#display-past-jobs-with-comments-count)
  - [Show Comments Button](#show-comments-button)
  - [Hire Freelancer Button](#hire-freelancer-button)
- [3. Hire Freelancer Popup](#3-hire-freelancer-popup)
  - [Popup Appearance and Fields](#popup-appearance-and-fields)
  - [Simulated Submission](#simulated-submission)
  - [Popup Close Functionality](#popup-close-functionality)
- [4. Light/Dark Mode](#4-lightdark-mode)
  - [Toggle Mode Functionality](#toggle-mode-functionality)
  - [Accessibility and Contrast Check](#accessibility-and-contrast-check)
- [5. Save Freelancer Feature](#5-save-freelancer-feature)
  - [Save Freelancer Button](#save-freelancer-button)
  - [Saved Freelancer Filter](#saved-freelancer-filter)
  - [Toggle Save/Unsave](#toggle-saveunsave)

## 1. Dashboard

### Display Freelancer List with Details

- **Objective:**  
  Verify that the dashboard displays a list of freelancers with:

  - Name
  - Email
  - Phone
  - Photo
  - Finished Job Count
  - City

- **Precondition:**  
  The application is launched, and the JSONPlaceholder `/users` and `/posts` endpoints have returned data.

- **Steps:**

  1. Load the dashboard.
  2. Observe the list of freelancers.

- **Expected Results:**  
  Each freelancer item displays all required details, including a computed Finished Job Count (based on posts from `/posts`).

### Search by Name

- **Objective:**  
  Ensure that entering a name in the search field filters the displayed freelancers.

- **Precondition:**  
  The dashboard is loaded with a list of freelancers.

- **Steps:**

  1. Start typing a known freelancer's name (or partial name) in the Name search field.

- **Expected Results:**  
  The list updates immediately to show only the freelancers whose names match the entered text.

### Search by Finished Job Count Range

- **Objective:**  
  Verify that filtering by a minimum and maximum finished job count works correctly.

- **Precondition:**  
  The dashboard is loaded and job count data is available.

- **Steps:**

  1. Set lower bound (X) in the "Finished Job Count" filter.
  2. Set upper bound (Y) in the same filter.

- **Expected Results:**  
  Only freelancers whose finished job count is between X and Y are displayed.

### Search by City

- **Objective:**  
  Verify that entering a city name filters the list to show only freelancers from that city.

- **Precondition:**  
  The dashboard is loaded with freelancers from various cities.

- **Steps:**

  1. Type a city name (or part of it) in the City search field.

- **Expected Results:**  
  The list immediately filters to display only freelancers located in that city.

### Combined Search Criteria

- **Objective:**  
  Verify that applying multiple filters (e.g., Name and City) returns the correct intersection of freelancers.

- **Precondition:**  
  The dashboard is loaded.

- **Steps:**

  1. Type a partial name in the Name search field.
  2. Type a valid city in the City search field.
  3. Optionally, adjust the Finished Job Count range.

- **Expected Results:**  
  The displayed list updates to show only freelancers who meet all the applied criteria.

### No Results Found Scenario

- **Objective:**  
  Verify that an appropriate message or empty state is displayed when no freelancer matches the search criteria.

- **Precondition:**  
  The dashboard is loaded.

- **Steps:**

  1. Enter criteria that match no freelancer (e.g., an invalid name or non-existent city).

- **Expected Results:**  
  The UI displays a "No results found" message or an empty state.

## 2. Portfolio Page

### Navigation to Portfolio Page

- **Objective:**  
  Ensure that clicking on a freelancer in the dashboard navigates to their portfolio page.

- **Precondition:**  
  The dashboard is loaded with freelancers.

- **Steps:**

  1. Click on a freelancer's name or photo.

- **Expected Results:**  
  The application navigates to the selected freelancer's portfolio page, and the URL (if applicable) reflects this change.

### Display Freelancer Information

- **Objective:**  
  Verify that the portfolio page shows detailed freelancer information, including:

  - Name
  - Phone
  - Website
  - Address

- **Precondition:**  
  The portfolio page is loaded.

- **Steps:**

  1. Review the freelancer's personal information on the portfolio page.

- **Expected Results:**  
  All required details are clearly visible on the page.

### Display Past Jobs with Comments Count

- **Objective:**  
  Ensure that the portfolio page lists past jobs and shows the number of comments for each job.

- **Precondition:**  
  The portfolio page is loaded.

- **Steps:**

  1. Observe the list of past jobs.
  2. Note the displayed comments count for each job.

- **Expected Results:**  
  Each job displays a title/description along with a comments count (fetched from `/comments`).

### Show Comments Button

- **Objective:**  
  Verify that clicking the "Show Comments" button for a job reveals the associated comments.

- **Precondition:**  
  The portfolio page (with jobs loaded) is visible.

- **Steps:**

  1. Click the "Show Comments" button on a job listing.

- **Expected Results:**  
  The job expands (or a new section appears) showing the full list of comments.

### Hire Freelancer Button

- **Objective:**  
  Verify that the "Hire Freelancer" button is available and initiates the hiring process.

- **Precondition:**  
  The portfolio page is loaded.

- **Steps:**

  1. Click the "Hire Freelancer" button.

- **Expected Results:**  
  A Hire Freelancer Popup appears.

## 3. Hire Freelancer Popup

### Popup Appearance and Fields

- **Objective:**  
  Ensure that the Hire Freelancer Popup displays the required fields:

  - Name
  - Message Subject
  - Message Body

- **Precondition:**  
  The Hire Freelancer Popup has been triggered.

- **Steps:**

  1. Trigger the popup by clicking the "Hire Freelancer" button on the portfolio page.
  2. Inspect the popup for the required input fields.

- **Expected Results:**  
  The popup is visible and contains fields for Name, Message Subject, and Message Body.

### Simulated Submission

- **Objective:**  
  Verify that form submission is simulated and confirmation is provided.

- **Precondition:**  
  The Hire Freelancer Popup is open.

- **Steps:**

  1. Fill in all the fields with test data.
  2. Click the "Submit" button.

- **Expected Results:**  
  The application simulates a submission (e.g., displays a "Submission Successful" message or closes the popup) without sending data to a real endpoint.

### Popup Close Functionality

- **Objective:**  
  Verify that the popup can be closed without submitting.

- **Precondition:**  
  The Hire Freelancer Popup is open.

- **Steps:**

  1. Click the "Cancel" button or the close (X) icon.

- **Expected Results:**  
  The popup is dismissed and the user is returned to the portfolio page.

## 4. Light/Dark Mode

### Toggle Mode Functionality

- **Objective:**  
  Verify that the Light/Dark mode toggle changes the application's color scheme.

- **Precondition:**  
  The dashboard or any page is loaded.

- **Steps:**

  1. Locate and click the Light/Dark mode toggle.

- **Expected Results:**
  - The page's color scheme updates immediately to dark mode.
  - Clicking the toggle again reverts the color scheme back to light mode.

### Accessibility and Contrast Check

- **Objective:**  
  Ensure that both light and dark modes meet accessibility contrast requirements.

- **Precondition:**  
  Either mode (light or dark) is active.

- **Steps:**

  1. Visually inspect the application or use an automated tool to verify that text and UI elements have sufficient contrast.

- **Expected Results:**  
  Contrast ratios meet accessibility guidelines in both modes.

## 5. Save Freelancer Feature

### Save Freelancer Button

- **Objective:**  
  Verify that each freelancer entry on the dashboard includes a "Save Freelancer" button.

- **Precondition:**  
  The dashboard is loaded.

- **Steps:**

  1. Identify a freelancer entry.
  2. Click the "Save Freelancer" button.

- **Expected Results:**  
  The freelancer is marked as saved (e.g., the button changes state or a visual indicator appears).

### Saved Freelancer Filter

- **Objective:**  
  Verify that applying the filter for saved freelancers displays only those that have been saved.

- **Precondition:**  
  At least one freelancer has been saved.

- **Steps:**

  1. Activate the "Saved Freelancers" filter on the dashboard.

- **Expected Results:**  
  Only saved freelancers are visible; unsaved freelancers are hidden.

### Toggle Save/Unsave

- **Objective:**  
  Ensure that a freelancer can be unsaved and the UI reflects the change accordingly.

- **Precondition:**  
  A freelancer is already saved.

- **Steps:**

  1. Click the "Save Freelancer" button on an already saved freelancer (which may toggle to "Unsave").

- **Expected Results:**  
  The freelancer is removed from the saved state. If the saved filter is active, the freelancer disappears from the list.
