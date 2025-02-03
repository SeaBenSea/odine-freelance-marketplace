# Detailed Tests

## Table of Contents

- [Search by Name (Dashboard)](#search-by-name-dashboard)
- [Show Comments Button (Portfolio Page)](#show-comments-button-portfolio-page)
- [Simulated Submission in Hire Freelancer Popup](#simulated-submission-in-hire-freelancer-popup)

---

## Search by Name (Dashboard)

**Objective**: Verify that entering a name (or partial name) in the search field immediately filters the displayed freelancers by name.

### Preconditions

- The SPA is running and loaded on the Dashboard.
- The Dashboard has fetched freelancer data from the JSONPlaceholder `/users` endpoint.
- The freelancer list is visible with details such as Name, Email, Phone, etc.

### Test Steps

1. **Step 1: Locate the Name Search Field**

   - **Action**: Identify the text input field labeled "Search by Name" (or similar).
   - **Expected Outcome**: The field is visible and empty by default (or has a placeholder text).

2. **Step 2: Enter a Partial or Full Name**

   - **Action**: Type a known partial name (e.g., "John") into the search field.
   - **Expected Outcome**: As you type, the list of freelancers updates dynamically.

3. **Step 3: Observe the Filtered Results**

   - **Action**: Look at the freelancer list that appears after typing.
   - **Expected Outcome**: Only freelancer entries whose names include "John" (case-insensitive) are displayed. Entries not matching the search text are hidden.

4. **Step 4: Clear the Search Field**

   - **Action**: Remove the text from the search field.
   - **Expected Outcome**: The freelancer list returns to its unfiltered state showing all available freelancers.

5. **Step 5: Repeat with a Full Name**
   - **Action**: Enter a complete name (e.g., "John Doe") and observe.
   - **Expected Outcome**: The list should narrow down to exactly those freelancers whose names exactly match "John Doe".

---

## Show Comments Button (Portfolio Page)

**Objective**: Verify that clicking the "Show Comments" button for a job reveals the associated comments.

### Preconditions

- The user is on a freelancer's Portfolio Page.
- The page displays a list of past jobs (fetched via `/posts`) with each job showing a comments count.
- Each job listing includes a "Show Comments" button.

### Test Steps

1. **Step 1: Identify a Job with Comments**

   - **Action**: Scroll through the list of past jobs on the portfolio page and identify a job entry that displays a comments count greater than zero.
   - **Expected Outcome**: At least one job is visible with an indication that it has associated comments.

2. **Step 2: Locate the "Show Comments" Button**

   - **Action**: Within the chosen job entry, locate the "Show Comments" button.
   - **Expected Outcome**: The button is clearly labeled and clickable.

3. **Step 3: Click the "Show Comments" Button**

   - **Action**: Click on the "Show Comments" button.
   - **Expected Outcome**: The job entry expands or a modal/section appears, displaying a list of comments for that job.

4. **Step 4: Validate the Comments List**

   - **Action**: Verify that the displayed list contains comments data (e.g., commenter's name, comment body).
   - **Expected Outcome**: The comments list accurately reflects the number indicated in the job's comments count. Each comment is readable and correctly associated with the job.

5. **Step 5: Verify Collapse or Toggle**
   - **Action**: Click the button again.
   - **Expected Outcome**: The comments section collapses or hides, returning the job entry to its original state.

---

## Simulated Submission in Hire Freelancer Popup

**Objective**: Verify that filling out and submitting the Hire Freelancer Popup form simulates a submission and provides appropriate feedback.

### Preconditions

- The user is on a Freelancer's Portfolio Page.
- The "Hire Freelancer" button is visible and functioning.
- The Hire Freelancer Popup appears when the "Hire Freelancer" button is clicked.

### Test Steps

1. **Step 1: Trigger the Hire Freelancer Popup**

   - **Action**: Click the "Hire Freelancer" button on the portfolio page.
   - **Expected Outcome**: A popup modal appears containing the form fields: Name, Message Subject, and Message Body.

2. **Step 2: Verify Form Field Presence**

   - **Action**: Check that the popup includes:
     - A text input for the user's Name.
     - A text input for the Message Subject.
     - A text area for the Message Body.
   - **Expected Outcome**: All required fields are present, clearly labeled, and ready for input.

3. **Step 3: Fill in the Form**

   - **Action**: Enter valid sample data into each field:
     - Name: "Alice Smith"
     - Message Subject: "Project Inquiry"
     - Message Body: "I would like to discuss a potential project collaboration."
   - **Expected Outcome**: Each field accepts the input without errors.

4. **Step 4: Submit the Form**

   - **Action**: Click the "Submit" button on the popup.
   - **Expected Outcome**: The system simulates the submission by either:
     - Displaying a confirmation message (e.g., "Your request has been submitted successfully").

5. **Step 5: Validate No Actual Data Transmission**
   - **Action**: Confirm that no actual network request is sent to a backend endpoint (this may be checked via the browser's network panel).
   - **Expected Outcome**: There is no data sent to an external service, confirming that the submission is simulated.
