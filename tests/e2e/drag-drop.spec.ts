import { expect, test, type Locator, type Page } from '@playwright/test';

const TARGET_ZONES_STORAGE_KEY = 'timetraveler_zones';
const INITIAL_ZONES = ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo'];

const seedTargetZones = async (page: Page) => {
  await page.addInitScript(
    ({ storageKey, zones }) => {
      if (!window.localStorage.getItem(storageKey)) {
        window.localStorage.setItem(storageKey, JSON.stringify(zones));
      }
    },
    { storageKey: TARGET_ZONES_STORAGE_KEY, zones: INITIAL_ZONES }
  );
};

const timezoneCards = (page: Page) => page.getByTestId('timezone-card');

const getRenderedZoneOrder = async (page: Page) => {
  return timezoneCards(page).evaluateAll((cards) =>
    cards.map((card) => card.getAttribute('data-zone'))
  );
};

const expectRenderedZoneOrder = async (page: Page, expectedOrder: string[]) => {
  await expect.poll(() => getRenderedZoneOrder(page)).toEqual(expectedOrder);
};

const expectStoredZoneOrder = async (page: Page, expectedOrder: string[]) => {
  await expect
    .poll(() =>
      page.evaluate((storageKey) => {
        const storedZones = window.localStorage.getItem(storageKey);
        return storedZones ? JSON.parse(storedZones) : null;
      }, TARGET_ZONES_STORAGE_KEY)
    )
    .toEqual(expectedOrder);
};

const centerOf = async (locator: Locator) => {
  const box = await locator.boundingBox();
  if (!box) {
    throw new Error('Could not measure timezone card for drag operation.');
  }

  return {
    x: box.x + box.width / 2,
    y: box.y + box.height / 2,
  };
};

const dragWithMouse = async (page: Page, source: Locator, target: Locator) => {
  const sourceCenter = await centerOf(source);
  const targetCenter = await centerOf(target);

  await page.mouse.move(sourceCenter.x, sourceCenter.y);
  await page.mouse.down();
  await page.mouse.move(targetCenter.x, targetCenter.y, { steps: 12 });
  await page.mouse.up();
};

test.describe('timezone card drag and drop', () => {
  test.beforeEach(async ({ page }) => {
    await seedTargetZones(page);
  });

  test('reorders cards with a desktop mouse drag and persists the order', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');

    await expectRenderedZoneOrder(page, INITIAL_ZONES);

    await dragWithMouse(page, timezoneCards(page).nth(0), timezoneCards(page).nth(2));

    const expectedOrder = ['America/New_York', 'Europe/London', 'UTC', 'Asia/Tokyo'];
    await expectRenderedZoneOrder(page, expectedOrder);
    await expectStoredZoneOrder(page, expectedOrder);

    await page.reload();
    await expectRenderedZoneOrder(page, expectedOrder);
  });

  test.describe('mobile touch context', () => {
    test.use({
      hasTouch: true,
      isMobile: true,
      viewport: { width: 390, height: 844 },
    });

    test('reorders stacked cards in a mobile touch context and persists the order', async ({ page }) => {
      await page.goto('/');

      await expectRenderedZoneOrder(page, INITIAL_ZONES);

      await dragWithMouse(page, timezoneCards(page).nth(0), timezoneCards(page).nth(1));

      const expectedOrder = ['America/New_York', 'UTC', 'Europe/London', 'Asia/Tokyo'];
      await expectRenderedZoneOrder(page, expectedOrder);
      await expectStoredZoneOrder(page, expectedOrder);

      await page.reload();
      await expectRenderedZoneOrder(page, expectedOrder);
    });
  });
});
