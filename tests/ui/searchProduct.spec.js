const { test, expect } = require('@playwright/test');
const { SearchProductPage } = require('../../pages/searchProductPage');
const searchProductsData = require('../../fixtures/searchProducts.json');

test.describe("Search Product", () => {
    let searchProductPage
    test.beforeEach(async ({ page }) => {
        searchProductPage = new SearchProductPage(page);
    });
    test("Verify search functionality", async ({ page }) => {
      await page.goto("/");
      await expect(page).toHaveURL("/");
      await searchProductPage.productsLink.click();
      if (await searchProductPage.advertisementIframe.isVisible()) {
        await searchProductPage.advertisementCloseButton.click();
      }
      await expect(page).toHaveURL("/products");
      await searchProductPage.searchInput.fill(searchProductsData.searchTerm);
      await searchProductPage.searchButton.click();
      await expect(page).toHaveURL(
        `products?search=${searchProductsData.searchTerm}`,
      );
      await expect(searchProductPage.searchedProductsHeading).toBeVisible();
      // Get all matching product locators
      const products = await searchProductPage.products.all();

      // Verify each product contains the search term
      for (const product of products) {
        await expect(product).toContainText(searchProductsData.searchTerm, {
          ignoreCase: true,
        });
      }
    });
});
