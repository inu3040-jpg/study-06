const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URL = 'file:///' + path.resolve(__dirname, 'shopping-list.html').replace(/\\/g, '/');

test.beforeEach(async ({ page }) => {
  await page.goto(FILE_URL);
  // localStorage 초기화 (테스트 간 독립성 보장)
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

// ─── 아이템 추가 ───────────────────────────────────────────
test('버튼 클릭으로 아이템 추가', async ({ page }) => {
  await page.fill('#itemInput', '우유');
  await page.click('button:has-text("추가")');

  await expect(page.locator('.item-text').first()).toHaveText('우유');
  await expect(page.locator('#totalCount')).toHaveText('1');
});

test('Enter 키로 아이템 추가', async ({ page }) => {
  await page.fill('#itemInput', '달걀');
  await page.press('#itemInput', 'Enter');

  await expect(page.locator('.item-text').first()).toHaveText('달걀');
  await expect(page.locator('#totalCount')).toHaveText('1');
});