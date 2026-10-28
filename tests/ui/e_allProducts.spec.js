const { test, expect } = require('@playwright/test');
test.describe("All Products", () => {
  test("Verify All Products and product detail page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL("/");
    await page.getByRole("link", { name: " Products" }).click();
    if (await page.locator('iframe[name="aswift_3"]').isVisible()) {
      await page
        .locator('iframe[name="aswift_3"]')
        .contentFrame()
        .getByRole("button", { name: "Close ad" })
        .click();
    }
    await expect(page).toHaveURL("/products");
    await expect(
      page.getByRole("heading", { name: "All Products", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Category", exact: true }),
    ).toBeVisible();
    await page.getByRole("link", { name: "View Product" }).first().click();
    await expect(page).toHaveURL(/\/product_details\/\d+/);
    await expect(page.getByRole('heading', { name: 'CATEGORY' })).toBeVisible(); 
    await expect(page.getByRole('heading', { name: 'BRANDS' })).toBeVisible();  
    // detail is visible: product name, category, price, availability, condition, brand
    await expect(page.getByRole('heading', { name: 'Blue Top' })).toBeVisible(); 
    await expect(page.getByText('Category: Women > Tops')).toBeVisible();
    await expect(page.getByText('Rs. 500')).toBeVisible(); 
    await expect(page.getByText('Availability: In Stock')).toBeVisible(); 
    await expect(page.getByText('Condition: New')).toBeVisible(); 
    await expect(page.getByText('Brand: Polo')).toBeVisible(); 
  });
});