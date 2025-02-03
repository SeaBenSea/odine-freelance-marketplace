# Non-Functional Test Scenarios

## Responsiveness

- **Objective:**  
  Verify that the application layout adjusts correctly on different devices (desktop, tablet, mobile). To be able to check in different devices and screen sizes, you can use the following tools:

  - [BrowserStack](https://www.browserstack.com/)
  - [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)

- **Steps:**

  1. Load the application on various screen sizes using responsive design tools.

- **Expected Results:**  
  The layout adapts gracefully without loss of functionality. All buttons, forms, and navigation elements remain accessible.

## Performance of Navigation and Filtering

- **Objective:**  
  Ensure that dynamic filtering and page transitions (from the dashboard to the portfolio page) are smooth. To measure the performance, you can use the following tools:

  - [Lighthouse](https://developers.google.com/web/tools/lighthouse)
  - [WebPageTest](https://www.webpagetest.org/)
  - [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)

- **Steps:**

  1. Monitor the response time for filtering as you type.
  2. Navigate between pages and observe any lag.
  3. Use performance tools to analyze the application's load time and resource usage.
  4. Log performance metrics for future comparison.

- **Expected Results:**
  - Filtering updates within a reasonable time frame (e.g., under 300ms per keystroke).
  - Navigation transitions occur smoothly without noticeable delays.
  - The application scores well on performance metrics (e.g., Lighthouse score above 90).

## Accessibility Checks

- **Objective:**  
  Validate that all interactive elements have appropriate labels and that screen readers can access the content. To check accessibility, you can use the following tools:

  - [Axe](https://www.deque.com/axe/)
  - [Storybook](https://storybook.js.org/)

- **Steps:**

  1. Use an accessibility tool to audit the pages.

- **Expected Results:**
  - All inputs, buttons, and links have clear, descriptive labels.
  - The application meets WCAG guidelines for color contrast and navigability.
