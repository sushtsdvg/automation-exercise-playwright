const { test, expect } = require('@playwright/test');
test.describe("Verify Test Cases Page", () => {
  test("Verify Test Cases Page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL("/");
    await page.getByRole("link", { name: " Test Cases" }).click();
    await expect(page).toHaveURL("/test_cases");
    await expect(
      page.getByRole("heading", { name: "Test Cases", exact: true }),
    ).toBeVisible();
  });
});