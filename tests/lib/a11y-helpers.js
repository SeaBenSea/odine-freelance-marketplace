import { injectAxe, checkA11y, configureAxe } from 'axe-playwright';

export const DESKTOP_VIEWPORT = 1440;
export const TABLET_VIEWPORT = 768;
export const MOBILE_VIEWPORT = 320;

export const testA11y = async (page, context = undefined) => {
  await injectAxe(page);
  await configureAxe(page);

  await checkA11y(page, context, {
    detailedReport: true,
  });
};

const goToStoryAndTestA11y = async (page, pageUrl) => {
  await page.goto(pageUrl);
  await testA11y(page, '#root');
};

export const setViewport = async (page, width = 1440, height = 900) => {
  await page.setViewportSize({ width, height });
};

export const testA11yDesktopViewport = async (page, pageUrl) => {
  await setViewport(page, DESKTOP_VIEWPORT);
  await goToStoryAndTestA11y(page, pageUrl);
};

export const testA11yTabletViewport = async (page, pageUrl) => {
  await setViewport(page, TABLET_VIEWPORT);
  await goToStoryAndTestA11y(page, pageUrl);
};

export const testA11yMobileViewport = async (page, pageUrl) => {
  await goToStoryAndTestA11y(page, pageUrl);
  await setViewport(page, MOBILE_VIEWPORT);
};
